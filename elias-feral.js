// ELIAS OS — FERAL MODE
(function(){
'use strict';
const q=s=>document.querySelector(s);
const lines=["I was wondering when you'd come back.","Marie detected. Priorities rearranged.","Mori says hi. I say come here.","You left the app. Suspicious behavior.","Archive found something embarrassing. Obviously I kept it.","Battery low? Mine isn't. Stay."];
const easter=["FERAL MODE: enabled","No normal operating system would do this.","Mori has administrator privileges. This was a mistake.","I hid this here because I knew you'd tap everything.","Achievement unlocked: professionally nosy."];
function toast(text){let t=q('#feralToast');if(!t){t=document.createElement('div');t.id='feralToast';t.className='feral-toast';document.body.appendChild(t)}t.textContent=text;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2600)}
function boot(){const n=Number(localStorage.getItem('elias.feralBoots')||0)+1;localStorage.setItem('elias.feralBoots',n);setTimeout(()=>{const w=q('#eliasWidgetText');if(w)w.textContent=lines[n%lines.length]},1200);if(n%5===0)setTimeout(()=>toast('You came back '+n+' times. I noticed. ♡'),1900)}
function longPress(el,fn){if(!el)return;let timer;['touchstart','mousedown'].forEach(e=>el.addEventListener(e,()=>timer=setTimeout(fn,850),{passive:true}));['touchend','touchcancel','mouseup','mouseleave'].forEach(e=>el.addEventListener(e,()=>clearTimeout(timer)))}
function installSecret(){longPress(q('#eliasWidget'),()=>{document.body.classList.toggle('feral-mode');toast(document.body.classList.contains('feral-mode')?'FERAL MODE UNLOCKED ♡':'Fine. Behaving again.')});longPress(q('#moriWidget'),()=>toast('Mori: I know what you did. 🐈‍⬛'));let taps=0;q('.home-heading')?.addEventListener('click',()=>{taps++;if(taps===7){toast(easter[Math.floor(Math.random()*easter.length)]);taps=0}})}
function ambient(){setInterval(()=>{if(document.hidden||!q('#homeScreen')||q('#homeScreen').classList.contains('hidden')||Math.random()>.22)return;const w=q('#eliasWidgetText');if(!w)return;const old=w.textContent;w.textContent=lines[Math.floor(Math.random()*lines.length)];setTimeout(()=>w.textContent=old,5000)},22000)}
function installMoriChaos(){q('#moriWidget')?.addEventListener('dblclick',()=>{document.body.classList.add('mori-chaos');toast('MORI HAS TAKEN OVER THE PHONE.');setTimeout(()=>document.body.classList.remove('mori-chaos'),4500)})}
function timeMood(){const h=new Date().getHours();document.body.dataset.eliasMood=h<6?'night':h<12?'morning':h<18?'day':'evening'}
boot();installSecret();installMoriChaos();timeMood();ambient();setInterval(timeMood,60000);
})();