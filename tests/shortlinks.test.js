const test=require('node:test');
const assert=require('node:assert/strict');
const {normalizeCode,normalizeDestination}=require('../src/shortlinks');
test('normalisasi nama short link',()=>{assert.equal(normalizeCode(' Promo-2026 '),'promo-2026');assert.equal(normalizeCode('diskon_50'),'diskon_50');});
test('tolak nama yang merusak route website',()=>{for(const name of ['admin','produk','api','artikel','go','assets','shortlinks'])assert.throws(()=>normalizeCode(name));});
test('tolak karakter, panjang, dan nama tidak valid',()=>{for(const name of ['a','halo dunia','../admin','a/b','a?b',''])assert.throws(()=>normalizeCode(name));});
test('terima URL tujuan HTTP dan HTTPS',()=>{assert.equal(normalizeDestination('https://example.com/a?x=1'),'https://example.com/a?x=1');assert.equal(normalizeDestination('http://example.com/'),'http://example.com/');});
test('blok tujuan berbahaya / malformed',()=>{for(const target of ['javascript:alert(1)','data:text/html,hi','//example.com','https://user:pass@example.com','not-a-url','https://example.com\nX:evil'])assert.throws(()=>normalizeDestination(target));});
