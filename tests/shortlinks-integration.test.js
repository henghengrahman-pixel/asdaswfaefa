'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const JsonStore=require('../src/store');
const {normalizeCode,normalizeDestination}=require('../src/shortlinks');
const root=path.join(__dirname,'..');
test('multi-link persisted: distinct aliases, edit target, disable, click counts, delete',async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'shortlinks-test-'));
  try{
    const file=path.join(dir,'db.json');const db=new JsonStore(file,()=>({shortLinks:[]}));
    for(let i=0;i<25;i++) await db.mutate(d=>d.shortLinks.push({id:String(i),code:normalizeCode(`promo-${i}`),destination:normalizeDestination(`https://example.org/${i}`),isActive:true,clicks:0}));
    assert.equal(db.read().shortLinks.length,25);
    await Promise.all(Array.from({length:20},()=>db.mutate(d=>{d.shortLinks[0].clicks++;})));
    assert.equal(db.read().shortLinks[0].clicks,20);
    await db.mutate(d=>{d.shortLinks[0].destination=normalizeDestination('https://other.example/new');d.shortLinks[1].isActive=false;});
    const restarted=new JsonStore(file,()=>({shortLinks:[]}));
    assert.equal(restarted.read().shortLinks[0].destination,'https://other.example/new');
    assert.equal(restarted.read().shortLinks[1].isActive,false);
    await restarted.mutate(d=>d.shortLinks=d.shortLinks.filter(x=>x.id!=='0'));
    assert.equal(restarted.read().shortLinks.length,24);
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('admin interface has listing, search, pagination, CRUD form and CSRF',()=>{
  const html=fs.readFileSync(path.join(root,'views/admin/shortlinks.ejs'),'utf8');
  const top=fs.readFileSync(path.join(root,'views/admin/partials/top.ejs'),'utf8');
  for(const piece of ['id="sl-create"','id="sl-search"','id="sl-prev"','id="sl-next"','id="sl-dialog"','name="destination"','name="code"','name="_csrf"','/admin/shortlinks/save','/delete','Total Klik'])assert.ok(html.includes(piece),piece);
  assert.ok(top.includes('href="/admin/shortlinks"'));
});
test('server routes have auth + 302 redirect and noindex headers',()=>{
  const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
  assert.match(server,/app\.get\('\/admin\/shortlinks',auth/);
  assert.match(server,/app\.post\('\/admin\/shortlinks\/save',auth/);
  assert.match(server,/app\.post\('\/admin\/shortlinks\/:id\/delete',auth/);
  assert.match(server,/res\.redirect\(302,redirectTarget\)/);
  assert.match(server,/X-Robots-Tag/);
});
