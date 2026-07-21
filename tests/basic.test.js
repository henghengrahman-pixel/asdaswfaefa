const test=require('node:test');
const assert=require('node:assert/strict');
const {money,slug,stripHtml}=require('../src/helpers');
test('helper slug aman untuk URL',()=>assert.equal(slug('Cream Kaki Pecah-Pecah!'),'cream-kaki-pecah-pecah'));
test('format rupiah',()=>assert.match(money(29900),/29\.900/));
test('hapus HTML',()=>assert.equal(stripHtml('<p>Hello <b>World</b></p>'),'Hello World'));

const fs=require('node:fs');
const path=require('node:path');
test('kartu produk menampilkan nama sebagai teks HTML',()=>{const v=fs.readFileSync(path.join(__dirname,'../views/partials/product-card.ejs'),'utf8');assert.match(v,/product-title/);assert.match(v,/<%= p\.name %>/);});
test('admin mendukung beberapa link foto',()=>{const v=fs.readFileSync(path.join(__dirname,'../views/admin/product-form.ejs'),'utf8');assert.match(v,/name="imageUrls"/);assert.match(v,/Satu link foto per baris/);});
