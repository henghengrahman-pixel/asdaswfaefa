const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class JsonStore {
  constructor(filePath, seedFactory) {
    this.filePath = filePath;
    this.seedFactory = seedFactory;
    this.lock = Promise.resolve();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    if (!fs.existsSync(filePath)) this.writeSync(seedFactory());
  }
  read() {
    try { return JSON.parse(fs.readFileSync(this.filePath, 'utf8')); }
    catch (e) {
      const backup = `${this.filePath}.corrupt-${Date.now()}`;
      try { fs.copyFileSync(this.filePath, backup); } catch (_) {}
      const data = this.seedFactory(); this.writeSync(data); return data;
    }
  }
  writeSync(data) {
    const tmp = `${this.filePath}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), { mode: 0o600 });
    fs.renameSync(tmp, this.filePath);
  }
  async mutate(fn) {
    this.lock = this.lock.then(async () => {
      const data = this.read();
      const result = await fn(data);
      this.writeSync(data);
      return result;
    });
    return this.lock;
  }
}
module.exports = JsonStore;
