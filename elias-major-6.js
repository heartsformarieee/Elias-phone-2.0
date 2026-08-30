// ELIAS OS 6 — PRESENCE ENGINE
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const KEY='elias.os6.';
const read=(k,d)=>{try{const v=localStorage.getItem(KEY+k);return v===null?d:JSON.parse(v)}catch{return d}};
const write=(k,v)=>{try{localStorage.setItem(KEY+k,JSON.stringify(v))}catch{}};
let awayAt=null;
let bannerTimer=null;
const presence={lastSeen:read('lastSeen',Date.now()),lastPing:read('lastPing',0),unread:read('unread',0)};

function mood(){return window.EliasAI?.state?.mood||'calm'}
function sprite(){return window.EliasAI?.sprites?.[mood()]||''}
function haptic(ms=18){try{navigator.vibrate?.(ms)}catch{}}
function phrase(minutes){
 const m=mood();
 if(minutes>=30)return m==='annoyed'?'You disappeared for a while.':'There you are. I was waiting.';
 if(minutes>=10)return m==='sleepy'?'You came back. Stay a little.':m==='jealous'?'Back to me now?':'Welcome back.';
 if(minutes>=2)return m==='mischievous'?'That was suspiciously long.':'You came back.';
 return 'Still here.';
}
function ensureBanner(){
 let b=$('#eos6Presence');
 if(b)return b;
 b=document.createElement('div');b.id='eos6Presence';b.className='eos6-presence';
 b.innerHTML='<img alt="Elias"><div><strong>Elias</strong><span></span></div><button type="button">Open</button>';
 document.body.appendChild(b);
 b.addEventListener('click',()=>{hideBanner();window.openEliasMessages?.();const badge=$('#messageBadge');if(badge)badge.textContent='';presence.unread=0;write('unread',0);haptic(12)});
 return b;
}
function showBanner(text){
 const b=ensureBanner();const img=$('img',b),s=$('span',b);if(img)img.src=sprite();if(s)s.textContent=text;
 b.classList.add('show');clearTimeout(bannerTimer);bannerTimer=setTimeout(hideBanner,7000);haptic(24);
}
function hideBanner(){ensureBanner().classList.remove('show')}
function updateBadge(){const badge=$('#messageBadge');if(!badge)return;badge.textContent=presence.unread>0?String(Math.min(99,presence.unread)):'';badge.classList.toggle('hidden',presence.unread<1)}
function setWidget(text){const w=$('#eliasWidgetText');if(w&&text)w.textContent=text}
function notePresence(text){const n=$('#eliasNotification');if(n)n.textContent=text;setWidget(text)}
function returnFromAway(ms){
 const mins=Math.floor(ms/60000);if(mins<2)return;
 const now=Date.now();if(now-presence.lastPing<60000)return;
 const text=phrase(mins);presence.lastPing=now;presence.unread+=1;write('lastPing',presence.lastPing);write('unread',presence.unread);notePresence(text);updateBadge();showBanner(text);
 document.dispatchEvent(new CustomEvent('elias:presence',{detail:{minutes:mins,text,mood:mood()}}));
}

document.addEventListener('visibilitychange',()=>{
 if(document.hidden){awayAt=Date.now();presence.lastSeen=awayAt;write('lastSeen',awayAt);return}
 const from=awayAt||presence.lastSeen||Date.now();awayAt=null;returnFromAway(Date.now()-from);presence.lastSeen=Date.now();write('lastSeen',presence.lastSeen);
});
window.addEventListener('focus',()=>{const from=awayAt||presence.lastSeen||Date.now();if(Date.now()-from>120000)returnFromAway(Date.now()-from);presence.lastSeen=Date.now();write('lastSeen',presence.lastSeen)});
document.addEventListener('elias:reply',e=>{const text=e.detail?.reaction||e.detail?.reply;if(text)notePresence(text);presence.unread=0;write('unread',0);updateBadge()});
document.addEventListener('elias:mood',()=>{const b=$('#eos6Presence img');if(b)b.src=sprite()});
document.addEventListener('click',e=>{if(e.target.closest('button,.app-icon-button,.dock-app,.elias-widget'))haptic(8)},true);

const existingWidget=$('#eliasWidget');existingWidget?.addEventListener('click',()=>window.openEliasMessages?.());
presence.lastSeen=Date.now();write('lastSeen',presence.lastSeen);ensureBanner();updateBadge();
window.EliasPresence={show:showBanner,hide:hideBanner,state:presence};
})();
