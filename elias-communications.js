// ELIAS OS 5 — AI MESSAGES + VOICE MESSAGE FOUNDATION
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
let listening=false;
let recognition=null;
let pending=false;

function showShell(){
  const home=$('#homeScreen'),status=$('#statusBar'),win=$('#appWindow'),title=$('#appTitle');
  if(home)home.classList.add('hidden');
  if(status)status.classList.add('hidden');
  if(win)win.classList.remove('hidden');
  if(title)title.textContent='Messages';
  window.scrollTo(0,0);
}

function bubbles(){
  const convo=window.EliasAI?.state?.conversation||[];
  if(!convo.length)return '<div class="ecom-empty"><span>♡</span><strong>Elias is here.</strong><p>Start talking. Same Elias, same memory, everywhere in the phone.</p></div>';
  return convo.slice(-30).map(item=>`<div class="ecom-row ${item.role==='user'?'me':'him'}"><div class="ecom-bubble">${esc(item.content)}</div></div>`).join('');
}

function renderMessages(){
  showShell();
  const root=$('#appContent');if(!root)return;
  const mood=window.EliasAI?.state?.mood||'calm';
  const sprite=window.EliasAI?.sprites?.[mood]||'';
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  root.innerHTML=`<div class="ecom-page">
    <section class="ecom-contact"><img id="ecomAvatar" src="${sprite}" alt="Elias"><div><small>ELIAS · ${esc(mood.toUpperCase())}</small><strong>Elias</strong><span id="ecomStatus">online</span></div><div class="ecom-contact-actions"><button id="ecomAudioCall" type="button" aria-label="Audio call">☎</button><button id="ecomVideoCall" type="button" aria-label="Video call">▣</button></div></section>
    <div id="ecomHistory" class="ecom-history">${bubbles()}</div>
    <div id="ecomError" class="ecom-error hidden"></div>
    <form id="ecomForm" class="ecom-compose"><button id="ecomMic" class="ecom-mic" type="button" ${SpeechRecognition?'':'disabled'} title="${SpeechRecognition?'Voice message':'Voice recognition unavailable in this browser'}">${SpeechRecognition?'◉':'×'}</button><input id="ecomInput" autocomplete="off" maxlength="2000" placeholder="Message Elias…"><button id="ecomSend" type="submit">↑</button></form>
    <small class="ecom-hint">${SpeechRecognition?'Tap the mic and speak to send a voice message.':'Typing works now; voice input needs browser speech recognition support.'}</small>
  </div>`;
  bind();scrollBottom();
}

function scrollBottom(){const h=$('#ecomHistory');if(h)requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight});}
function setBusy(on,label){pending=on;const i=$('#ecomInput'),s=$('#ecomSend'),m=$('#ecomMic'),st=$('#ecomStatus');if(i)i.disabled=on;if(s)s.disabled=on;if(m)m.disabled=on||!(window.SpeechRecognition||window.webkitSpeechRecognition);if(st)st.textContent=on?(label||'typing…'):'online';}
function error(message){const e=$('#ecomError');if(!e)return;if(!message){e.classList.add('hidden');e.textContent='';return}e.textContent=message;e.classList.remove('hidden');}

async function send(text,mode='text'){
  if(pending||!text.trim()||!window.EliasAI)return;
  error('');
  const input=$('#ecomInput');if(input)input.value='';
  // Show the outgoing message immediately; EliasAI persists it.
  setBusy(true,mode==='voice-message'?'listening to your voice…':'typing…');
  try{
    const promise=window.EliasAI.ask(text.trim(),mode);
    renderConversationPreview(text,mode);
    const data=await promise;
    renderMessages();
    const widget=$('#eliasWidgetText');if(widget&&data.reaction)widget.textContent=data.reaction;
    const badge=$('#messageBadge');if(badge)badge.textContent='';
  }catch(err){
    console.error(err);setBusy(false);error(err.message||'Elias could not answer.');
  }
}

function renderConversationPreview(text,mode){
  const h=$('#ecomHistory');if(!h)return;
  const empty=$('.ecom-empty',h);if(empty)empty.remove();
  h.insertAdjacentHTML('beforeend',`<div class="ecom-row me"><div class="ecom-bubble ${mode==='voice-message'?'voice':''}">${mode==='voice-message'?'<span class="ecom-wave">▂▄▆▄▂</span> ':''}${esc(text)}</div></div><div class="ecom-row him ecom-thinking"><div class="ecom-bubble"><span></span><span></span><span></span></div></div>`);scrollBottom();
}

function startVoice(){
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRecognition||pending)return;
  if(listening&&recognition){recognition.stop();return}
  recognition=new SpeechRecognition();recognition.lang='en-US';recognition.interimResults=true;recognition.continuous=false;
  let finalText='';
  recognition.onstart=()=>{listening=true;const b=$('#ecomMic');if(b){b.classList.add('recording');b.textContent='■'}const st=$('#ecomStatus');if(st)st.textContent='listening…'};
  recognition.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)finalText+=t;else interim+=t}const input=$('#ecomInput');if(input)input.value=(finalText||interim).trim()};
  recognition.onerror=e=>{error(e.error==='not-allowed'?'Microphone permission was denied.':'Voice recording stopped: '+e.error)};
  recognition.onend=()=>{listening=false;const b=$('#ecomMic');if(b){b.classList.remove('recording');b.textContent='◉'}const text=finalText.trim()||($('#ecomInput')?.value||'').trim();if(text)send(text,'voice-message');else{const st=$('#ecomStatus');if(st)st.textContent='online'}};
  try{recognition.start()}catch(err){error(err.message)}
}

function bind(){
  const form=$('#ecomForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();send($('#ecomInput')?.value||'','text')});
  const mic=$('#ecomMic');if(mic)mic.addEventListener('click',startVoice);
  const audio=$('#ecomAudioCall');if(audio)audio.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('elias:start-call',{detail:{kind:'audio',direction:'outgoing'}})));
  const video=$('#ecomVideoCall');if(video)video.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('elias:start-call',{detail:{kind:'video',direction:'outgoing'}})));
}

function intercept(){
  document.addEventListener('click',e=>{const b=e.target.closest('[data-app="messages"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();renderMessages();},true);
}

document.addEventListener('elias:mood',e=>{const a=$('#ecomAvatar');if(a&&e.detail?.sprite)a.src=e.detail.sprite});
document.addEventListener('elias:reply',()=>{if($('#ecomHistory'))renderMessages()});
intercept();
window.openEliasMessages=renderMessages;
})();
