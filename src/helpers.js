const crypto = require('crypto');
const slugify = require('slugify');
function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function money(v){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v)||0)}
function slug(v){return slugify(String(v||''),{lower:true,strict:true,locale:'id'})}
function uid(){return crypto.randomBytes(12).toString('hex')}
function absolute(base,p){return `${String(base).replace(/\/$/,'')}${p.startsWith('/')?p:`/${p}`}`}
function stripHtml(v=''){return String(v).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()}
module.exports={escapeHtml,money,slug,uid,absolute,stripHtml};
