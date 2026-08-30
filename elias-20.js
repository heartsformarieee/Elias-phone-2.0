// ========================================
// ELIAS OS 2.0 — LIVING SYSTEM
// ========================================

(function(){
  "use strict";

  const K={hearts:"elias17.hearts",attention:"elias17.attention",visits:"elias17.visits",daily:"elias20.daily",dailyDate:"elias20.dailyDate",activity:"elias20.activity",activityAt:"elias20.activityAt",mori:"elias20.mori"};
  const activities={
    morning:["pretending to be awake","looking for breakfast","arguing with Mori over my seat","scrolling through our photos"],
    afternoon:["thinking about sushi","looking through our photos","hanging around","waiting for you","listening to music"],
    evening:["planning movie night","stealing the blanket","listening to our song","waiting for you to come back","watching Mori patrol the apartment"],
    late:["lying awake","listening to our song","watching Mori commit crimes","thinking too much","waiting for you"]
  };
  const thoughts=[
    "You make this tiny fake phone feel weirdly important.",
    "Reminder to steal your attention before Mori does.",
    "I still vote sushi.",
    "I like when you come back without needing a reason.",
    "Mori is not getting ownership of this operating system.",
    "I am absolutely keeping track of the hearts.",
    "If this were a real phone, I'd still somehow be in every app.",
    "You looked suspiciously cute the last time I checked.",
    "Current plan: music, food, zero responsibilities.",
    "I wonder how many times you're going to open this today."
  ];
  const ambient=[
    "Mori just walked across something he absolutely should not be on.",
    "I changed my mind. We need sushi.",
    "Still here, by the way.",
    "You know you can tap my status, right?",
    "Mori is staring at me. I don't trust him.",
    "Our song is stuck in my head again.",
    "Tiny Elias OS status update: I require snacks.",
    "I was literally just looking through our photos.",
    "No notification. Just me bothering you."
  ];
  const moriLines=["Mori stole my status.","Mori is sitting on the keyboard.","Mori Cam has seized control.","Mori says feed him.","Mori has occupied Elias OS."];

  function n(k){return Number(localStorage.getItem(k)||0)}
  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function period(){const h=new Date().getHours();if(h<5)return"late";if(h<12)return"morning";if(h<18)return"afternoon";return"evening"}
  function today(){return new Date().toISOString().slice(0,10)}
  function getDaily(){if(localStorage.getItem(K.dailyDate)!==today()){localStorage.setItem(K.dailyDate,today());localStorage.setItem(K.daily,pick(thoughts))}return localStorage.getItem(K.daily)||thoughts[0]}

  function currentActivity(){
    const age=Date.now()-Number(localStorage.getItem(K.activityAt)||0);
    let value=localStorage.getItem(K.activity);
    if(!value||age>75000){value=pick(activities[period()]);localStorage.setItem(K.activity,value);localStorage.setItem(K.activityAt,String(Date.now()))}
    return value;
  }

  function setTimeMood(){document.body.classList.toggle("elias-night-mode",period()==="evening"||period()==="late");document.body.classList.toggle("elias-late-mode",period()==="late")}

  function updateStrip(){
    const strip=document.getElementById("eliasPresenceStrip"); if(!strip)return;
    const mood=strip.querySelector(".presence-mood"); if(!mood)return;
    const hijack=Math.random()<0.12;
    if(hijack){strip.classList.add("mori-hijack");mood.innerHTML='<span class="mori-status-paw">🐾</span>'+pick(moriLines);localStorage.setItem(K.mori,String(Date.now()))}
    else{strip.classList.remove("mori-hijack");mood.textContent="Elias · "+currentActivity()}
  }

  function ambientBubble(text){
    let b=document.querySelector(".elias-ambient-bubble");
    if(!b){b=document.createElement("div");b.className="elias-ambient-bubble";document.body.appendChild(b)}
    b.textContent=text;b.classList.remove("show");void b.offsetWidth;b.classList.add("show");clearTimeout(ambientBubble.t);ambientBubble.t=setTimeout(()=>b.classList.remove("show"),3000)
  }

  function nowSheet(){
    let s=document.querySelector(".elias-now-sheet");
    if(!s){s=document.createElement("div");s.className="elias-now-sheet";document.body.appendChild(s)}
    const hearts=n(K.hearts),attention=n(K.attention),visits=n(K.visits),act=currentActivity();
    s.innerHTML=`<div class="elias-now-card"><div class="elias-now-top"><span class="elias-now-kicker">ELIAS OS · NOW</span><button class="elias-now-close" type="button">×</button></div><h3 class="elias-now-title">I'm ${act}.</h3><p class="elias-now-sub">You tapped the live status, so yes, now you get the unnecessary details.</p><div class="elias-now-grid"><div class="elias-now-box"><small>HEARTS</small><strong>${hearts}</strong></div><div class="elias-now-box"><small>ATTENTION</small><strong>${attention}</strong></div><div class="elias-now-box"><small>VISITS</small><strong>${visits}</strong></div><div class="elias-now-box"><small>MORI STATUS</small><strong>${Date.now()-Number(localStorage.getItem(K.mori)||0)<180000?"recently interfered":"suspiciously quiet"}</strong></div></div><div class="elias-daily-thought"><small>TODAY'S THOUGHT</small><p>${getDaily()}</p></div><div class="elias-now-actions"><button class="elias-now-action" data-a="heart"><b>♡</b>Heart</button><button class="elias-now-action" data-a="music"><b>♪</b>Music</button><button class="elias-now-action" data-a="call"><b>☎</b>Call</button></div></div>`;
    s.classList.add("show");
    const close=()=>s.classList.remove("show");
    s.querySelector(".elias-now-close").onclick=close;
    s.onclick=e=>{if(e.target===s)close()};
    s.querySelector('[data-a="heart"]').onclick=()=>{localStorage.setItem(K.hearts,String(hearts+1));ambientBubble("Heart received. Obviously. ♡");nowSheet()};
    s.querySelector('[data-a="music"]').onclick=async()=>{if(typeof toggleMusic==="function"){await toggleMusic();ambientBubble("Our song. Good choice.")}};
    s.querySelector('[data-a="call"]').onclick=()=>{close();if(typeof createIncomingCall==="function")createIncomingCall()};
  }

  function bind(){
    const strip=document.getElementById("eliasPresenceStrip");if(strip&&!strip.dataset.living){strip.dataset.living="1";strip.addEventListener("click",nowSheet)}
    const widget=document.getElementById("eliasWidget");if(widget&&!widget.dataset.secret){widget.dataset.secret="1";let taps=[];widget.addEventListener("click",()=>{const now=Date.now();taps=taps.filter(t=>now-t<1500);taps.push(now);if(taps.length>=3){widget.classList.remove("secret-pop");void widget.offsetWidth;widget.classList.add("secret-pop");ambientBubble("Okay okay, I get it. You wanted my attention 😭");taps=[]}})}
  }

  function cycle(){setTimeMood();bind();updateStrip()}
  setTimeout(cycle,400);
  setInterval(cycle,70000);
  setInterval(()=>{if(!document.hidden&&Math.random()<0.32)ambientBubble(pick(ambient))},90000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden){cycle();if(Math.random()<0.4)ambientBubble("You're back.")}});
  window.addEventListener("pageshow",cycle);
})();
