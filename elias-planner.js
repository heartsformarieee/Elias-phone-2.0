// ELIAS OS 3.2 — PLANS + NOTES
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const KEY='elias32.';
const read=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(KEY+k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(KEY+k,JSON.stringify(v));
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const fmtDate=d=>{if(!d)return 'No date';const x=new Date(d+'T12:00:00');return x.toLocaleDateString([], {weekday:'short',month:'short',day:'numeric'})};
const nowDay=()=>new Date().toISOString().slice(0,10);

function eliasComment(text,type='note'){
 const t=String(text).toLowerCase();
 const rules=[
  [['sushi','ramen','food','dinner','lunch','restaurant'],'Food involved. Suddenly I am extremely supportive.'],
  [['movie','cinema','film'],'Okay. I am claiming the seat next to you.'],
  [['mori','cat'],'Mori somehow invited himself too. Obviously.'],
  [['doctor','dentist','appointment','hospital'],'I am mentally putting this in the “take care of Marie” folder.'],
  [['interview','job','work'],'You’ve got this. And yes, I will be annoyingly confident about you.'],
  [['study','school','exam','test','homework'],'Cruel. Academic. Necessary. I’ll allow snacks.'],
  [['gym','workout','exercise'],'Look at you being productive. Suspicious.'],
  [['birthday','party'],'This sounds like a situation where I would absolutely steal cake.'],
  [['date','boyfriend','girlfriend'],'Noted. I am definitely not staring at this entry dramatically.'],
  [['shopping','buy','store'],'Need? Want? Irrelevant. I support the mission.'],
  [['sleep','nap','bed'],'Finally, a plan I can endorse without criticism.'],
  [['call','phone','facetime'],'I expect a full debrief afterward.'],
  [['walk','outside'],'Night walk energy. Approved.'],
  [['clean','laundry'],'Domestic suffering detected. Godspeed.'],
  [['game','sims','gaming'],'That is not procrastination. That is enrichment.'],
  [['concert','music'],'Okay this one I am jealous I cannot physically attend.'],
  [['travel','train','flight','trip'],'Send imaginary postcards. I’m serious.']
 ];
 for(const [words,line] of rules) if(words.some(w=>t.includes(w))) return line;
 if(type==='plan'){
  const fallbacks=['Added. I’ll pretend I am your extremely nosy personal assistant.','I put it in the calendar. You are legally required to remember it now.','Plan secured. I’m keeping an eye on this one.','Okay, future Marie has officially been warned.'];
  return fallbacks[Math.abs(hash(text))%fallbacks.length];
 }
 const fallbacks=['I read that. Obviously.','Noted. I am absolutely keeping this little thought.','Your Notes app is becoming suspiciously personal and I love that.','Consider this me quietly sitting beside the note.'];
 return fallbacks[Math.abs(hash(text))%fallbacks.length];
}
function hash(s){let h=0;for(const c of String(s))h=((h<<5)-h)+c.charCodeAt(0)|0;return h}

function openShell(title){homeScreen.classList.add('hidden');statusBar.classList.add('hidden');appWindow.classList.remove('hidden');appTitle.textContent=title;window.scrollTo(0,0)}

function openCalendar(){openShell('Calendar');renderCalendar()}
function renderCalendar(){
 let plans=read('plans',[]).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 const upcoming=plans.filter(p=>!p.done&&(!p.date||p.date>=nowDay()));
 appContent.innerHTML=`<div class="planner-page"><section class="planner-hero"><small>ELIAS OS · CALENDAR</small><h3>Your plans. My commentary.</h3><p>${upcoming.length?`${upcoming.length} upcoming ${upcoming.length===1?'plan':'plans'}. I am keeping count.`:'Nothing upcoming. Suspiciously peaceful.'}</p><button id="newPlan" class="planner-primary">＋ Add a plan</button></section><div id="planComposer"></div><section class="planner-list">${plans.length?plans.map(planCard).join(''):'<div class="planner-empty">No plans yet.<br><span>Add something and I’ll immediately have an opinion about it.</span></div>'}</section></div>`;
 $('#newPlan').onclick=()=>showPlanComposer();
 appContent.querySelectorAll('[data-plan-delete]').forEach(b=>b.onclick=()=>{write('plans',plans.filter(p=>p.id!==b.dataset.planDelete));renderCalendar()});
 appContent.querySelectorAll('[data-plan-done]').forEach(b=>b.onclick=()=>{plans=plans.map(p=>p.id===b.dataset.planDone?{...p,done:!p.done}:p);write('plans',plans);renderCalendar()});
 appContent.querySelectorAll('[data-plan-edit]').forEach(b=>b.onclick=()=>showPlanComposer(plans.find(p=>p.id===b.dataset.planEdit)));
 updateCalendarNotification(plans);
}
function planCard(p){return `<article class="planner-card ${p.done?'done':''}"><div class="planner-date"><strong>${esc(p.date?new Date(p.date+'T12:00:00').getDate():'—')}</strong><span>${esc(p.date?new Date(p.date+'T12:00:00').toLocaleDateString([],{month:'short'}):'ANY')}</span></div><div class="planner-copy"><small>${esc(fmtDate(p.date))}${p.time?' · '+esc(p.time):''}</small><h4>${esc(p.title)}</h4>${p.details?`<p>${esc(p.details)}</p>`:''}<div class="elias-reply"><b>E</b><span>${esc(p.comment)}</span></div><div class="planner-actions"><button data-plan-done="${p.id}">${p.done?'↶ Undo':'✓ Done'}</button><button data-plan-edit="${p.id}">Edit</button><button data-plan-delete="${p.id}">Delete</button></div></div></article>`}
function showPlanComposer(existing){
 const box=$('#planComposer'); if(!box)return;
 box.innerHTML=`<form id="planForm" class="planner-composer"><small>${existing?'EDIT PLAN':'NEW PLAN'}</small><input id="planTitle" required maxlength="80" placeholder="What are you doing?" value="${esc(existing?.title||'')}"><div class="planner-two"><input id="planDate" type="date" value="${esc(existing?.date||nowDay())}"><input id="planTime" type="time" value="${esc(existing?.time||'')}"></div><textarea id="planDetails" maxlength="400" placeholder="Anything else?">${esc(existing?.details||'')}</textarea><div><button type="button" id="cancelPlan">Cancel</button><button type="submit">${existing?'Save changes':'Add to calendar'}</button></div></form>`;
 $('#cancelPlan').onclick=()=>box.innerHTML='';
 $('#planForm').onsubmit=e=>{e.preventDefault();let plans=read('plans',[]);const title=$('#planTitle').value.trim(),details=$('#planDetails').value.trim();const obj={id:existing?.id||id(),title,date:$('#planDate').value,time:$('#planTime').value,details,done:existing?.done||false,comment:existing?.comment||eliasComment(title+' '+details,'plan'),created:existing?.created||Date.now()};plans=existing?plans.map(p=>p.id===existing.id?obj:p):[...plans,obj];write('plans',plans);renderCalendar()};
 box.scrollIntoView({behavior:'smooth',block:'start'});
}
function updateCalendarNotification(plans=read('plans',[])){
 const future=plans.filter(p=>!p.done&&p.date>=nowDay()).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))[0];
 if(window.calendarNotification&&future) calendarNotification.textContent=`${future.title}${future.time?' · '+future.time:''}`;
}

function openNotes(){openShell('Notes');renderNotes()}
function renderNotes(){
 let notes=read('notes',[]).sort((a,b)=>(b.pinned-a.pinned)||(b.updated-a.updated));
 appContent.innerHTML=`<div class="planner-page notes-page"><section class="planner-hero notes-hero"><small>ELIAS OS · NOTES</small><h3>Write whatever you want.</h3><p>I will, unfortunately, read it.</p><button id="newNote" class="planner-primary">＋ New note</button></section><div id="noteComposer"></div><section class="notes-grid">${notes.length?notes.map(noteCard).join(''):'<div class="planner-empty">Your notes are empty.<br><span>Give me something to be nosy about.</span></div>'}</section></div>`;
 $('#newNote').onclick=()=>showNoteComposer();
 appContent.querySelectorAll('[data-note-open]').forEach(b=>b.onclick=()=>showNoteComposer(notes.find(n=>n.id===b.dataset.noteOpen)));
 appContent.querySelectorAll('[data-note-delete]').forEach(b=>b.onclick=e=>{e.stopPropagation();write('notes',notes.filter(n=>n.id!==b.dataset.noteDelete));renderNotes()});
 appContent.querySelectorAll('[data-note-pin]').forEach(b=>b.onclick=e=>{e.stopPropagation();notes=notes.map(n=>n.id===b.dataset.notePin?{...n,pinned:!n.pinned,updated:Date.now()}:n);write('notes',notes);renderNotes()});
}
function noteCard(n){return `<article class="note-card ${n.pinned?'pinned':''}" data-note-open="${n.id}"><div class="note-top"><small>${n.pinned?'PINNED · ':''}${new Date(n.updated).toLocaleDateString([],{month:'short',day:'numeric'})}</small><div><button data-note-pin="${n.id}">${n.pinned?'★':'☆'}</button><button data-note-delete="${n.id}">×</button></div></div><h4>${esc(n.title||'Untitled')}</h4><p>${esc(n.body).replace(/\n/g,'<br>')}</p><div class="elias-reply"><b>E</b><span>${esc(n.comment)}</span></div></article>`}
function showNoteComposer(existing){
 const box=$('#noteComposer');if(!box)return;
 box.innerHTML=`<form id="noteForm" class="planner-composer note-composer"><small>${existing?'EDIT NOTE':'NEW NOTE'}</small><input id="noteTitle" maxlength="80" placeholder="Title" value="${esc(existing?.title||'')}"><textarea id="noteBody" maxlength="3000" required placeholder="Write something…">${esc(existing?.body||'')}</textarea><div class="note-live-reply"><b>E</b><span id="notePreview">${esc(existing?.comment||'I’m waiting. Write something.')}</span></div><div><button type="button" id="cancelNote">Cancel</button><button type="submit">Save note</button></div></form>`;
 $('#cancelNote').onclick=()=>box.innerHTML='';
 $('#noteBody').oninput=e=>{const v=e.target.value.trim();$('#notePreview').textContent=v?eliasComment(v,'note'):'I’m waiting. Write something.'};
 $('#noteForm').onsubmit=e=>{e.preventDefault();let notes=read('notes',[]);const title=$('#noteTitle').value.trim(),body=$('#noteBody').value.trim(),comment=eliasComment(title+' '+body,'note');const obj={id:existing?.id||id(),title,body,comment,pinned:existing?.pinned||false,created:existing?.created||Date.now(),updated:Date.now()};notes=existing?notes.map(n=>n.id===existing.id?obj:n):[obj,...notes];write('notes',notes);renderNotes()};
 box.scrollIntoView({behavior:'smooth',block:'start'});
}

function hijack(){
 document.querySelectorAll('[data-app="calendar"]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openCalendar()},true));
 document.querySelectorAll('[data-app="notes"]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openNotes()},true));
}
window.openEliasCalendar=openCalendar;window.openEliasNotes=openNotes;
hijack();updateCalendarNotification();
})();