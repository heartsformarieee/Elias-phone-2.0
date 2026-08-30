// ELIAS OS 4.0.1 — SYSTEM CORE HOTFIX
(function(){
'use strict';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const KEY='elias40.';
const read=(k,d)=>{try{const v=localStorage.getItem(KEY+k);return v===null?d:JSON.parse(v)}catch{return d}};
const write=(k,v)=>localStorage.setItem(KEY+k,JSON.stringify(v));
const esc=s=>String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));

const settings=Object.assign({notifications:true,reducedMotion:false,accent:'#d78ca3'},read('settings',{}));
let recents=read('recents',[]);
let notifications=read('notifications',[]);

const registry=[
 {id:'messages',name:'Messages',icon:'💬',hint:'Conversations'},
 {id:'photos',name:'Photos',icon:'🌸',hint:'Photo library'},
 {id:'notes',name:'Notes',icon:'📝',hint:'Notes with Elias'},
 {id:'mori',name:'Mori Cam',icon:'🐈‍⬛',hint:'Mori activity'},
 {id:'calendar',name:'Calendar',icon:'📅',hint:'Plans and reminders'},
 {id:'music',name:'Music',icon:'♪',hint:'OURS playlist'},
 {id:'favorites',name:'Us',icon:'♡',hint:'Our favorites'},
 {id:'settings',name:'Settings',icon:'⚙︎',hint:'EliasOS settings'},
 {id:'presence',name:'Presence',icon:'♡',hint:'Elias is here'},
 {id:'archive',name:'Archive',icon:'✦',hint:'Shared memories'},
 {id:'afterdark',name:'After Dark',icon:'☾',hint:'Private EliasOS layer'}
];

function el(id){return document.getElementById(id)}
function saveSettings(){write('settings',settings);applySettings()}
function applySettings(){
 document.documentElement.style.setProperty('--eos-accent',settings.accent);
 document.body.classList.toggle('eos-reduced-motion',!!settings.reducedMotion);
}

function ensureLayer(id){
 let layer=el(id);
 if(layer)return layer;
 layer=document.createElement('div');
 layer.id=id;
 layer.className='eos-layer hidden';
 document.body.appendChild(layer);
 layer.addEventListener('click',e=>{if(e.target===layer)closeLayer(layer)});
 return layer;
}
function closeLayer(layer){if(!layer)return;layer.classList.add('hidden');layer.innerHTML=''}
function closeAll(){['eosSearchLayer','eosNotificationsLayer','eosRecentsLayer'].forEach(id=>closeLayer(el(id)))}

function addRecent(id){
 if(!registry.some(x=>x.id===id))return;
 recents=[id,...recents.filter(x=>x!==id)].slice(0,6);
 write('recents',recents);
}

function showAppShell(title){
 const home=el('homeScreen'),status=el('statusBar'),win=el('appWindow'),titleNode=el('appTitle');
 if(home)home.classList.add('hidden');
 if(status)status.classList.add('hidden');
 if(win)win.classList.remove('hidden');
 if(titleNode)titleNode.textContent=title;
 window.scrollTo(0,0);
}

function launch(id){
 addRecent(id); closeAll();
 if(id==='settings'){openSettings();return}
 if(id==='presence'&&typeof window.openPresence==='function'){window.openPresence();return}
 if(id==='archive'&&typeof window.openArchive==='function'){window.openArchive();return}
 if(id==='afterdark'&&typeof window.openAfterDark==='function'){window.openAfterDark();return}
 const btn=$(`[data-app="${id}"]`);
 if(btn){btn.click();}
}

function notify(title,message,icon='E'){
 if(!settings.notifications)return;
 notifications.unshift({id:Date.now()+Math.random(),title,message,icon,at:Date.now(),read:false});
 notifications=notifications.slice(0,40);
 write('notifications',notifications);
 updateNotificationButton();
}
function timeAgo(ts){const d=Date.now()-ts,m=Math.floor(d/60000),h=Math.floor(d/3600000),day=Math.floor(d/86400000);if(m<1)return'now';if(m<60)return m+'m';if(h<24)return h+'h';return day+'d'}

function injectTools(){
 const heading=$('.home-heading');
 if(!heading)return;
 let bar=el('eosSystemTools');
 if(!bar){
  bar=document.createElement('div');
  bar.id='eosSystemTools';
  bar.className='eos-system-tools';
  bar.innerHTML='<button id="eosSearch" type="button"><b>⌕</b> Search</button><button id="eosNotify" type="button"><b>◉</b> Alerts <span id="eosAlertCount"></span></button><button id="eosRecent" type="button"><b>▱</b> Recent</button>';
  heading.insertAdjacentElement('afterend',bar);
 }
 const s=el('eosSearch'),n=el('eosNotify'),r=el('eosRecent');
 if(s)s.onclick=openSearch;if(n)n.onclick=openNotifications;if(r)r.onclick=openRecents;
 updateNotificationButton();
}

function injectSystemApp(){
 const grid=$('.apps-grid');
 if(!grid||el('eosSystemApp'))return;
 const b=document.createElement('button');
 b.id='eosSystemApp';b.className='app-icon-button';b.type='button';
 b.innerHTML='<div class="app-icon settings-icon">◎</div><span>System</span>';
 b.addEventListener('click',openSettings);
 grid.appendChild(b);
}

function updateNotificationButton(){
 const n=el('eosAlertCount');if(!n)return;
 const unread=notifications.filter(x=>!x.read).length;
 n.innerHTML=unread?`<span class="eos-badge-dot">${Math.min(unread,99)}</span>`:'';
}

function searchableExtras(){
 const extras=[];
 try{(JSON.parse(localStorage.getItem('elias32.notes')||'[]')||[]).forEach(n=>extras.push({type:'Note',name:n.title||'Untitled note',hint:(n.body||'').slice(0,70),icon:'📝',id:'notes'}))}catch{}
 try{(JSON.parse(localStorage.getItem('elias32.plans')||'[]')||[]).forEach(p=>extras.push({type:'Plan',name:p.title||'Untitled plan',hint:[p.date,p.time].filter(Boolean).join(' · '),icon:'📅',id:'calendar'}))}catch{}
 return extras;
}

function openSearch(){
 const layer=ensureLayer('eosSearchLayer');layer.classList.remove('hidden');
 layer.innerHTML='<div class="eos-sheet"><div class="eos-sheet-head"><div><small>ELIAS OS · SPOTLIGHT</small><h3>Search everything.</h3></div><button class="eos-close" type="button">×</button></div><input id="eosSearchInput" class="eos-search" placeholder="Apps, notes, plans…" autocomplete="off"><div id="eosSearchResults" class="eos-results"></div></div>';
 $('.eos-close',layer).onclick=()=>closeLayer(layer);
 const input=el('eosSearchInput');input.oninput=()=>renderSearch(input.value);renderSearch('');setTimeout(()=>input.focus(),50);
}
function renderSearch(q){
 const root=el('eosSearchResults');if(!root)return;
 const term=q.trim().toLowerCase();
 const apps=registry.map(a=>({type:'App',name:a.name,hint:a.hint,icon:a.icon,id:a.id}));
 const all=[...apps,...searchableExtras()];
 const hits=(term?all.filter(x=>(x.name+' '+x.hint+' '+x.type).toLowerCase().includes(term)):apps.slice(0,8)).slice(0,18);
 root.innerHTML=hits.length?hits.map((x,i)=>`<button class="eos-result" data-eos-result="${i}" type="button"><span class="eos-result-icon">${x.icon}</span><span><strong>${esc(x.name)}</strong><small>${esc(x.type+' · '+(x.hint||''))}</small></span></button>`).join(''):'<div class="eos-empty">Nothing found. Even I checked twice.</div>';
 $$('[data-eos-result]',root).forEach((b,i)=>b.onclick=()=>launch(hits[i].id));
}

function openNotifications(){
 notifications=notifications.map(x=>({...x,read:true}));write('notifications',notifications);updateNotificationButton();
 const layer=ensureLayer('eosNotificationsLayer');layer.classList.remove('hidden');
 layer.innerHTML=`<div class="eos-sheet"><div class="eos-sheet-head"><div><small>ELIAS OS · NOTIFICATION CENTER</small><h3>What happened.</h3></div><button class="eos-close" type="button">×</button></div><div class="eos-notification-list">${notifications.length?notifications.map(n=>`<div class="eos-notification"><b>${esc(n.icon||'E')}</b><div><strong>${esc(n.title)}</strong><small> · ${timeAgo(n.at)}</small><p>${esc(n.message)}</p></div></div>`).join(''):'<div class="eos-empty">Quiet. Suspiciously quiet.</div>'}</div><div class="eos-sheet-actions"><button id="eosClearAlerts" type="button">Clear all</button></div></div>`;
 $('.eos-close',layer).onclick=()=>closeLayer(layer);
 const clear=el('eosClearAlerts');if(clear)clear.onclick=()=>{notifications=[];write('notifications',notifications);openNotifications()};
}

function openRecents(){
 const items=recents.map(id=>registry.find(x=>x.id===id)).filter(Boolean);
 const layer=ensureLayer('eosRecentsLayer');layer.classList.remove('hidden');
 layer.innerHTML=`<div class="eos-sheet"><div class="eos-sheet-head"><div><small>ELIAS OS · APP SWITCHER</small><h3>Recent apps.</h3></div><button class="eos-close" type="button">×</button></div><div class="eos-recent-list">${items.length?items.map(a=>`<button class="eos-recent" data-recent="${a.id}" type="button"><span class="eos-recent-icon">${a.icon}</span><span><strong>${esc(a.name)}</strong><small>${esc(a.hint)}</small></span></button>`).join(''):'<div class="eos-empty">Open something first, menace.</div>'}</div></div>`;
 $('.eos-close',layer).onclick=()=>closeLayer(layer);
 $$('[data-recent]',layer).forEach(b=>b.onclick=()=>launch(b.dataset.recent));
}

function toggleButton(label,key,sub){return `<div class="eos-toggle-row"><span><strong>${label}</strong><small>${sub}</small></span><button class="eos-toggle ${settings[key]?'on':''}" data-toggle="${key}" type="button" aria-label="${label}"></button></div>`}
function openSettings(){
 addRecent('settings');showAppShell('Settings');
 const content=el('appContent');if(!content)return;
 content.innerHTML=`<div class="planner-page"><section class="planner-hero"><small>ELIAS OS · SYSTEM CORE</small><h3>Make it yours.</h3><p>System Core is active and these settings survive refreshes.</p></section><div class="eos-settings"><section class="eos-settings-card"><h4>System behavior</h4>${toggleButton('Notifications','notifications','Save EliasOS alerts in Notification Center')}${toggleButton('Reduced motion','reducedMotion','Calmer transitions and effects')}</section><section class="eos-settings-card"><h4>Accent color</h4><div class="eos-accent-row">${['#d78ca3','#b995d6','#8eb7d4','#9dbb9f'].map(c=>`<button class="eos-accent ${settings.accent===c?'active':''}" data-accent="${c}" style="background:${c}" type="button"></button>`).join('')}</div></section><section class="eos-settings-card eos-about"><strong>VERSION 4.0.1</strong><br>EliasOS 4.0 — System Core<br><br>Unified search, notifications, app switching and persistent system preferences.</section></div></div>`;
 $$('[data-toggle]',content).forEach(b=>b.onclick=()=>{settings[b.dataset.toggle]=!settings[b.dataset.toggle];saveSettings();openSettings()});
 $$('[data-accent]',content).forEach(b=>b.onclick=()=>{settings.accent=b.dataset.accent;saveSettings();openSettings()});
}

function seedNotifications(){
 if(read('seeded401',false))return;
 notifications.unshift({id:Date.now()+1,title:'Elias',message:'System Core 4.0.1 is online.',icon:'E',at:Date.now(),read:false});
 notifications.unshift({id:Date.now()+2,title:'System',message:'Search, alerts and recent apps are ready.',icon:'◎',at:Date.now(),read:false});
 write('notifications',notifications.slice(0,40));write('seeded401',true);updateNotificationButton();
}

function installCaptureRouter(){
 if(document.documentElement.dataset.eosCapture==='1')return;
 document.documentElement.dataset.eosCapture='1';
 document.addEventListener('click',e=>{
  const settingsButton=e.target.closest('[data-app="settings"],#eosSystemApp');
  if(settingsButton){e.preventDefault();e.stopImmediatePropagation();openSettings();return}
  const app=e.target.closest('[data-app]');if(app)addRecent(app.dataset.app);
  if(e.target.closest('#presenceAppButton'))addRecent('presence');
  if(e.target.closest('#archiveAppButton,#homeMemoryPeek'))addRecent('archive');
  if(e.target.closest('#e3App'))addRecent('afterdark');
 },true);
}

function api(){window.EliasOSSystem={version:'4.0.1',notify,launch,openSearch,openNotifications,openRecents,openSettings,get settings(){return {...settings}},get recents(){return [...recents]}}}

function boot(){
 try{
  applySettings();injectTools();injectSystemApp();installCaptureRouter();seedNotifications();api();
  document.documentElement.dataset.eliasOsCore='4.0.1';
  const status=el('statusBar');
  if(status&&!status.dataset.eos){status.dataset.eos='1';status.style.cursor='pointer';status.addEventListener('click',openNotifications)}
 }catch(err){console.error('EliasOS 4.0.1 boot failed',err)}
}

boot();
setTimeout(boot,100);
setTimeout(boot,700);
window.addEventListener('pageshow',boot);
document.addEventListener('DOMContentLoaded',boot,{once:true});
})();
