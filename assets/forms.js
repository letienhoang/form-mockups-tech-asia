
(()=>{const t=document.createElement('div');t.className='toast';document.body.appendChild(t);let timer;
function toast(m){clearTimeout(timer);t.textContent=m;t.classList.add('show');timer=setTimeout(()=>t.classList.remove('show'),2200)}
function status(label,kind){document.querySelectorAll('[data-status]').forEach(b=>{b.textContent=label;b.className='badge '+kind})}
document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.action==='print'){window.print();return}if(b.dataset.label)status(b.dataset.label,b.dataset.kind||'pending');toast(b.dataset.message||('Đã thực hiện: '+b.textContent.trim()))}))})();
