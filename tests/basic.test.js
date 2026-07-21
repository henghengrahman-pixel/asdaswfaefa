const test=require('node:test');
const assert=require('node:assert/strict');
const {money,slug,stripHtml}=require('../src/helpers');
test('helper slug aman untuk URL',()=>assert.equal(slug('Cream Kaki Pecah-Pecah!'),'cream-kaki-pecah-pecah'));
test('format rupiah',()=>assert.match(money(29900),/29\.900/));
test('hapus HTML',()=>assert.equal(stripHtml('<p>Hello <b>World</b></p>'),'Hello World'));
