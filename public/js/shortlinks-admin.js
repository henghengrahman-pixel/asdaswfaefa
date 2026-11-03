(()=>{'use strict';
const dialog=document.getElementById('sl-dialog');if(!dialog)return;
const data=JSON.parse(document.getElementById('sl-data').textContent);
const fields={id:document.getElementById('sl-id'),code:document.getElementById('sl-code'),destination:document.getElementById('sl-destination'),active:document.getElementById('sl-active')};
const title=document.getElementById('sl-dialog-title');
function open(item){fields.id.value=item?.id||'';fields.code.value=item?.code||'';fields.destination.value=item?.destination||'';fields.active.checked=item?Boolean(item.isActive):true;title.textContent=item?'Edit Short Link':'Buat Short Link';dialog.showModal();fields.code.focus();}
document.getElementById('sl-create').addEventListener('click',()=>open(null));
document.getElementById('sl-close').addEventListener('click',()=>dialog.close());
document.getElementById('sl-cancel').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.querySelectorAll('[data-edit]').forEach(el=>el.addEventListener('click',()=>open(data.find(l=>l.id===el.dataset.edit))));
document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(el.dataset.copy);const original=el.textContent;el.textContent='✓';setTimeout(()=>el.textContent=original,1200);}catch{window.prompt('Salin URL ini:',el.dataset.copy);}}));
const all=[...document.querySelectorAll('.sl-row')],search=document.getElementById('sl-search'),count=document.getElementById('sl-count'),prev=document.getElementById('sl-prev'),next=document.getElementById('sl-next'),pageEl=document.getElementById('sl-page'),empty=document.getElementById('sl-empty');
let page=1;const size=10;
function render(){const query=search.value.trim().toLocaleLowerCase('id-ID');const matches=all.filter(row=>row.dataset.search.includes(query));const pages=Math.max(1,Math.ceil(matches.length/size));page=Math.min(page,pages);all.forEach(row=>row.hidden=true);matches.slice((page-1)*size,page*size).forEach(row=>row.hidden=false);empty.hidden=matches.length!==0;empty.textContent=all.length?'Tidak ada short link yang sesuai pencarian.':'Belum ada short link. Klik “Buat Short Link” untuk membuat yang pertama.';count.textContent=`Menampilkan ${matches.length?(page-1)*size+1:0}–${Math.min(page*size,matches.length)} dari ${matches.length} data`;pageEl.textContent=`${page} / ${pages}`;prev.disabled=page<=1;next.disabled=page>=pages;}
search.addEventListener('input',()=>{page=1;render();});prev.addEventListener('click',()=>{page--;render();});next.addEventListener('click',()=>{page++;render();});render();
})();
