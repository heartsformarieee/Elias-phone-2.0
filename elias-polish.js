// ELIAS OS — POLISH PASS
(function(){
'use strict';
function patchSettings(){
  if(!window.appContent||!window.appTitle)return;
  if(appTitle.textContent.trim()!=='Settings')return;
  const nodes=[...appContent.querySelectorAll('*')];
  for(const el of nodes){
    const txt=el.textContent.trim();
    if(txt==='VERSION 1.6') el.innerHTML='VERSION <strong>3.1 · LIVING SYSTEM</strong>';
    if(txt==='MUSIC Our Song') el.innerHTML='MUSIC <strong>OURS · 5 tracks</strong>';
  }
}
const obs=new MutationObserver(()=>patchSettings());
if(window.appContent)obs.observe(appContent,{childList:true,subtree:true,characterData:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-app="settings"]'))setTimeout(patchSettings,40)},true);
setTimeout(patchSettings,300);
})();