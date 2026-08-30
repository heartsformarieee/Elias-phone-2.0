// ELIAS OS 6 — AI MESSAGES + VOICE NOTES
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
let listening=false;
let recognition=null;
let pending=false;
const voiceNotes=new Map();
let activeAudio=null;

function showShell(){
  const home=$('#homeScreen'),status=$('#statusBar'),win=$('#appWindow'),title=$('#appTitle');
  home?.classList.add('hidden');status?.classList.add('hidden');win?.classList.remove('hidden');if(title)title.textContent='Messages';
  win?.scrollTo?.(0,0);window.scrollTo(0,0);
}
function voiceMarkup(content){const url=voiceNotes.get(content);return url?`<div class="ecom-voice-note" data-voice="${esc(content)}"><button class="ecom-voice-play" type="button" aria-label="Play Elias voice note">▶</button><div class="ecom-voice-line"></div><span class="ecom-voice-time">voice</span></div>`:''}
function bubbles(){
  const convo=window.EliasAI?.state?.conversation||[];
  if(!convo.length)return '<div class="ecom-empty"><span>♡</span><strong>Elias is here.</strong><p>Start talking. Same Elias, same memory, everywhere in the phone.</p></div>';
  return convo.slice(-30).map(item=>`<div class="ecom-row ${item.role==='user'?'me':'him'}"><div class="ecom-bubble">${esc(item.content)}${item.role==='assistant'?voiceMarkup(item.content):''}</div></div>`).join('');
}
function renderMessages(){
  showShell();const root=$('#appContent');if(!root)return;
  const mood=window.EliasAI?.state?.mood||'calm',sprite=window.EliasAI?.sprites?.[mood]||'',SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  root.innerHTML=`<div class="ecom-page"><section class="ecom-contact"><img id="ecomAvatar" src="${sprite}" alt="Elias"><div><small>ELIAS · ${esc(mood.toUpperCase())}</small><strong>Elias</strong><span id="ecomStatus">online</span></div><div class="ecom-contact-actions"><button id="ecomAudioCall" type="button">☎</button><button id="ecomVideoCall" type="button">▣</button></div></section><div id="ecomHistory" class="ecom-history">${bubbles()}</div><div id="ecomError" class="ecom-error hidden"></div><form id="ecomForm" class="ecom-compose"><button id="ecomMic" class="ecom-mic" type="button" ${SpeechRecognition?'':'disabled'}>${SpeechRecognition?'◉':'×'}</button><input id="ecomInput" autocomplete="off" maxlength="2000" placeholder="Message Elias…"><button id="ecomSend" type="submit">↑</button></form><small class="ecom-hint">${SpeechRecognition?'Tap the mic and speak to send a voice message.':'Typing works now; voice input needs browser speech recognition support.'}</small></div>`;
  bind();scrollBottom();if(pending)setBusy(true,'typing…');
}
function scrollBottom(){const h=$('#ecomHistory');if(h)requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight});}
function setBusy(on,label){pending=on;const i=$('#ecomInput'),s=$('#ecomSend'),m=$('#ecomMic'),st=$('#ecomStatus');if(i)i.disabled=on;if(s)s.disabled=on;if(m)m.disabled=on||!(window.SpeechRecognition||window.webkitSpeechRecognition);if(st)st.textContent=on?(label||'typing…'):'online';}
function error(message){const e=$('#ecomError');if(!e)return;if(!message){e.classList.add('hidden');e.textContent='';return}e.textContent=message;e.classList.remove('hidden');}
async function createVoiceNote(text,mood){
  try{const r=await fetch('/api/speak',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,mood})});if(!r.ok)return;const blob=await r.blob();const old=voiceNotes.get(text);if(old)URL.revokeObjectURL(old);voiceNotes.set(text,URL.createObjectURL(blob));}
  catch(err){console.warn('Voice note unavailable:',err)}
}
async function send(text,mode='text'){
  if(pending||!text.trim()||!window.EliasAI)return;error('');const input=$('#ecomInput');if(input)input.value='';setBusy(true,mode==='voice-message'?'listening to your voice…':'typing…');
  try{const promise=window.EliasAI.ask(text.trim(),mode);renderConversationPreview(text,mode);const data=await promise;if(data.responseType==='voice')await createVoiceNote(data.reply,data.mood);pending=false;renderMessages();const widget=$('#eliasWidgetText');if(widget&&data.reaction)widget.textContent=data.reaction;const badge=$('#messageBadge');if(badge)badge.textContent='';}
  catch(err){console.error(err);pending=false;setBusy(false);error(err.message||'Elias could not answer.');}
}
function renderConversationPreview(text,mode){const h=$('#ecomHistory');if(!h)return;$('.ecom-empty',h)?.remove();h.insertAdjacentHTML('beforeend',`<div class="ecom-row me"><div class="ecom-bubble ${mode==='voice-message'?'voice':''}">${mode==='voice-message'?'<span class="ecom-wave">▂▄▆▄▂</span> ':''}${esc(text)}</div></div><div class="ecom-row him ecom-thinking"><div class="ecom-bubble"><span></span><span></span><span></span></div></div>`);scrollBottom();}
function startVoice(){
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SpeechRecognition||pending)return;if(listening&&recognition){recognition.stop();return}
  recognition=new SpeechRecognition();recognition.lang='en-US';recognition.interimResults=true;recognition.continuous=false;let finalText='';
  recognition.onstart=()=>{listening=true;const b=$('#ecomMic');if(b){b.classList.add('recording');b.textContent='■'}const st=$('#ecomStatus');if(st)st.textContent='listening…'};
  recognition.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)finalText+=t;else interim+=t}const input=$('#ecomInput');if(input)input.value=(finalText||interim).trim()};
  recognition.onerror=e=>error(e.error==='not-allowed'?'Microphone permission was denied.':'Voice recording stopped: '+e.error);
  recognition.onend=()=>{listening=false;const b=$('#ecomMic');if(b){b.classList.remove('recording');b.textContent='◉'}const text=finalText.trim()||($('#ecomInput')?.value||'').trim();if(text)send(text,'voice-message');else{const st=$('#ecomStatus');if(st)st.textContent='online'}};
  try{recognition.start()}catch(err){error(err.message)}
}
function playVoice(button){const wrap=button.closest('[data-voice]');if(!wrap)return;const url=voiceNotes.get(wrap.dataset.voice);if(!url)return;if(activeAudio){activeAudio.pause();activeAudio=null;document.querySelectorAll('.ecom-voice-play').forEach(b=>b.textContent='▶')}const a=new Audio(url);activeAudio=a;button.textContent='Ⅱ';a.onended=()=>{button.textContent='▶';activeAudio=null};a.onerror=()=>{button.textContent='▶';activeAudio=null};a.play().catch(()=>{button.textContent='▶';activeAudio=null});}
function bind(){
  $('#ecomForm')?.addEventListener('submit',e=>{e.preventDefault();send($('#ecomInput')?.value||'','text')});
  $('#ecomMic')?.addEventListener('click',startVoice);$('#ecomAudioCall')?.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('elias:start-call',{detail:{kind:'audio',direction:'outgoing'}})));$('#ecomVideoCall')?.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('elias:start-call',{detail:{kind:'video',direction:'outgoing'}})));
  document.querySelectorAll('.ecom-voice-play').forEach(b=>b.addEventListener('click',()=>playVoice(b)));
}
function intercept(){document.addEventListener('click',e=>{const b=e.target.closest('[data-app="messages"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();renderMessages();},true)}
document.addEventListener('elias:mood',e=>{const a=$('#ecomAvatar');if(a&&e.detail?.sprite)a.src=e.detail.sprite});document.addEventListener('elias:reply',()=>{if($('#ecomHistory'))renderMessages()});intercept();window.openEliasMessages=renderMessages;
})();
