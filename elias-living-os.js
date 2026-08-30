// ELIAS OS 5.2 — LIVING OS + PHONE + APP STORE
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const externalApps={
 youtube:{name:'YouTube',icon:'▶',url:'https://www.youtube.com/'},
 netflix:{name:'Netflix',icon:'N',url:'https://www.netflix.com/'},
 spotify:{name:'Spotify',icon:'◉',url:'https://open.spotify.com/'}
};

function state(){return window.EliasAI?.state||{mood:'calm',affection:0,calls:[],installedApps:[]}}
function sprite(){const s=state();return window.EliasAI?.sprites?.[s.mood]||''}
function showShell(title){
 const home=$('#homeScreen'),status=$('#statusBar'),win=$('#appWindow'),t=$('#appTitle');
 home?.classList.add('hidden');status?.classList.add('hidden');win?.classList.remove('hidden');if(t)t.textContent=title;window.scrollTo(0,0);
}
function formatDuration(n){n=Math.max(0,Number(n)||0);return n<1?'—':`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`}
function callLabel(c){if(c.direction==='missed')return 'Missed';if(c.direction==='incoming')return 'Incoming';return 'Outgoing'}
function callIcon(c){return c.kind==='video'?'▣':'☎'}

function applyMood(){
 const s=state();document.documentElement.dataset.eliasMood=s.mood||'calm';
 const phone=$('#phone');if(phone)phone.dataset.eliasMood=s.mood||'calm';
 const widget=$('#eliasWidget');if(widget){widget.dataset.mood=s.mood||'calm';widget.style.setProperty('--elias-sprite',`url("${sprite()}")`)}
 const avatar=$('.elias-avatar');if(avatar&&sprite()){avatar.textContent='';avatar.style.backgroundImage=`url("${sprite()}")`;avatar.style.backgroundSize='cover';avatar.style.backgroundPosition='center top'}
 const note=$('#eliasNotification');if(note&&s.mood)note.dataset.mood=s.mood;
 let pill=$('#eliasMoodPill');
 if(!pill){pill=document.createElement('div');pill.id='eliasMoodPill';pill.className='elias-mood-pill';$('#homeScreen')?.appendChild(pill)}
 if(pill)pill.innerHTML=`<span></span>${esc(s.mood||'calm')} · ♡ ${Math.max(0,Number(s.affection)||0)}`;
}

function renderPhone(){
 showShell('Phone');const root=$('#appContent');if(!root)return;const calls=[...(state().calls||[])].reverse();
 root.innerHTML=`<div class="eos-page"><header class="eos-hero"><div><small>PHONE</small><h1>Recents</h1></div><img src="${sprite()}" alt="Elias"></header><div class="eos-call-actions"><button id="eosCallAudio" type="button">☎<span>Audio</span></button><button id="eosCallVideo" type="button">▣<span>Video</span></button></div><section class="eos-list">${calls.length?calls.map(c=>`<article class="eos-call ${c.direction==='missed'?'missed':''}"><div class="eos-call-icon">${callIcon(c)}</div><div><strong>Elias</strong><span>${callLabel(c)} · ${new Date(c.at||Date.now()).toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</span></div><small>${formatDuration(c.duration)}</small></article>`).join(''):'<div class="eos-empty"><b>No calls yet.</b><span>The suspicious peace will not last.</span></div>'}</section></div>`;
 $('#eosCallAudio')?.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('elias:start-call',{detail:{kind:'audio',direction:'outgoing'}})));
 $('#eosCallVideo')?.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('elias:start-call',{detail:{kind:'video',direction:'outgoing'}})));
}

function renderStore(){
 showShell('App Store');const root=$('#appContent');if(!root)return;const installed=state().installedApps||[];
 root.innerHTML=`<div class="eos-page"><header class="eos-store-head"><small>ELIAS APP STORE</small><h1>His phone, his apps.</h1><p>Internal Elias OS apps stay inside the phone. External services open normally instead of being embedded.</p></header><section class="eos-store-list">${Object.entries(externalApps).map(([id,a])=>{const on=installed.includes(id);return `<article class="eos-store-row"><div class="eos-app-logo ${id}">${a.icon}</div><div><strong>${a.name}</strong><span>External service</span></div><button data-install="${id}" type="button">${on?'REMOVE':'GET'}</button></article>`}).join('')}</section><div class="eos-store-note">Installed external apps appear on Elias's home screen. Tapping one opens the real service.</div></div>`;
 root.querySelectorAll('[data-install]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.install;if((state().installedApps||[]).includes(id))window.EliasAI?.uninstallApp(id);else window.EliasAI?.installApp(id);renderStore();syncExternalApps()}));
}

function syncExternalApps(){
 const grid=$('.apps-grid');if(!grid)return;grid.querySelectorAll('[data-elias-external]').forEach(n=>n.remove());
 (state().installedApps||[]).forEach(id=>{const a=externalApps[id];if(!a)return;const b=document.createElement('button');b.type='button';b.className='app-icon-button eos-external-home';b.dataset.eliasExternal=id;b.innerHTML=`<div class="app-icon eos-external-icon ${id}">${a.icon}</div><span>${esc(a.name)}</span>`;grid.appendChild(b)});
}
function openExternal(id){const a=externalApps[id];if(!a)return;window.open(a.url,'_blank','noopener,noreferrer')}

function intercept(){
 document.addEventListener('click',e=>{
   const external=e.target.closest('[data-elias-external]');if(external){e.preventDefault();e.stopImmediatePropagation();openExternal(external.dataset.eliasExternal);return}
   const b=e.target.closest('[data-app]');if(!b)return;
   if(b.dataset.app==='phone'){e.preventDefault();e.stopImmediatePropagation();renderPhone()}
   if(b.dataset.app==='appstore'){e.preventDefault();e.stopImmediatePropagation();renderStore()}
 },true);
}

document.addEventListener('elias:mood',applyMood);
document.addEventListener('elias:reply',e=>{applyMood();const note=$('#eliasNotification');if(note&&e.detail?.reaction)note.textContent=e.detail.reaction});
document.addEventListener('elias:call-ended',()=>{if($('#appTitle')?.textContent==='Phone')renderPhone();applyMood()});
window.addEventListener('storage',()=>{applyMood();syncExternalApps()});
intercept();applyMood();syncExternalApps();
window.EliasLivingOS={applyMood,renderPhone,renderStore,syncExternalApps};
})();
