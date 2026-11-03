'use strict';
const RESERVED = new Set(['admin','api','assets','uploads','health','cari','kategori','produk','go','artikel','tentang','kebijakan-privasi','disclaimer','robots.txt','sitemap.xml','rss.xml','favicon.ico','shortlinks']);
function normalizeCode(input) {
  const code = String(input ?? '').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]{1,59}$/.test(code)) throw new Error('Nama short link harus 2–60 karakter: huruf kecil, angka, tanda - atau _.');
  if (RESERVED.has(code)) throw new Error('Nama short link dipakai oleh halaman website. Pilih nama lain.');
  return code;
}
function normalizeDestination(input) {
  const value = String(input ?? '').trim();
  if (!value || value.length > 2048 || /[\u0000-\u001f\u007f]/.test(value)) throw new Error('URL tujuan tidak valid atau terlalu panjang.');
  let url;
  try { url = new URL(value); } catch { throw new Error('URL tujuan harus lengkap, diawali https:// atau http://.'); }
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error('URL tujuan hanya mendukung HTTP/HTTPS tanpa username/password.');
  return url.href;
}
module.exports = {normalizeCode,normalizeDestination,RESERVED};
