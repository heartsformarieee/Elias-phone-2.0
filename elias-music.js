// ELIAS OS — OURS MUSIC PLAYER
(function(){
'use strict';
const tracks=[
 {title:'505',artist:'Arctic Monkeys',src:'505.mp3',art:'mirror pic.PNG',note:'This one gets special treatment. Obviously.',mood:'come-back-to-me energy'},
 {title:'I Wanna Be Yours',artist:'Arctic Monkeys',src:'wanna be yours.mp3',art:'couple.PNG',note:'Subtle? No. Effective? Unfortunately yes.',mood:'ridiculously us'},
 {title:'Little Dark Age',artist:'MGMT',src:'Little Dark Age.mp3',art:'movie.PNG',note:'For when we need to look dramatically haunted together.',mood:'dark little universe'},
 {title:'Our Song',artist:'Elias OS',src:'our song.mp3',art:'flowers.PNG',note:'The original resident of this app. I am not evicting it.',mood:'ours, permanently'},
 {title:'Y-3',artist:'Elias OS',src:'Y-3.mp3',art:'holding hands.PNG',note:'A tiny artifact from before the playlist became a whole problem.',mood:'archive track'}
];
const K='elias.music.';
const FALLBACK='couple.PNG';
let idx=Number(localStorage.getItem(K+'index')||0); if(idx<0||idx>=tracks.length) idx=0;
let shuffle=localStorage.getItem(K+'shuffle')==='1';
let repeat=localStorage.getItem(K+'repeat')||'off';
let audio=window.eliasPlaylistAudio||new Audio(); window.eliasPlaylistAudio=audio;
audio.preload='metadata';
function $(s,r=document){return r.querySelector(s)}
function fmt(s){if(!isFinite(s))return '0:00';s=Math.max(0,Math.floor(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function save(){localStorage.setItem(K+'index',idx);localStorage.setItem(K+'shuffle',shuffle?'1':'0');localStorage.setItem(K+'repeat',repeat)}
function current(){return tracks[idx]}
function safeImg(img,src){if(!img)return;img.onerror=()=>{img.onerror=null;img.src=FALLBACK};img.src=src}
function media(){if(!('mediaSession' in navigator))return;const t=current();try{navigator.mediaSession.metadata=new MediaMetadata({title:t.title,artist:t.artist,album:'OURS · Elias OS',artwork:[{src:t.art,sizes:'512x512'}]});navigator.mediaSession.setActionHandler('play',()=>audio.play());navigator.mediaSession.setActionHandler('pause',()=>audio.pause());navigator.mediaSession.setActionHandler('previoustrack',prev);navigator.mediaSession.setActionHandler('nexttrack',next)}catch(e){}}
function load(autoplay=false){const t=current();if(!audio.src.endsWith(encodeURI(t.src))&&!audio.src.endsWith(t.src.replace(/ /g,'%20'))){audio.src=t.src;audio.currentTime=Number(localStorage.getItem(K+'time.'+idx)||0)||0}save();media();renderMini();if($('#musicPlayerPage'))renderPlayer();if(autoplay)audio.play().catch(()=>{})}
function next(){if(shuffle){let n=idx;while(n===idx&&tracks.length>1)n=Math.floor(Math.random()*tracks.length);idx=n}else idx=(idx+1)%tracks.length;load(true)}
function prev(){if(audio.currentTime>4){audio.currentTime=0;return}idx=(idx-1+tracks.length)%tracks.length;load(true)}
function toggle(){if(audio.paused)audio.play().catch(()=>{});else audio.pause()}
function cycleRepeat(){repeat=repeat==='off'?'all':repeat==='all'?'one':'off';save();renderPlayer();renderMini()}
function toggleShuffle(){shuffle=!shuffle;save();renderPlayer()}
audio.addEventListener('ended',()=>{if(repeat==='one'){audio.currentTime=0;audio.play()}else if(repeat==='all'||idx<tracks.length-1)next()});
audio.addEventListener('timeupdate',()=>{localStorage.setItem(K+'time.'+idx,String(audio.currentTime));updateProgress()});audio.addEventListener('play',()=>{renderMini();updatePlayButtons()});audio.addEventListener('pause',()=>{renderMini();updatePlayButtons()});
function injectMini(){if($('#eliasMiniPlayer'))return;const m=document.createElement('button');m.id='eliasMiniPlayer';m.className='elias-mini-player';m.type='button';m.innerHTML='<img><span><small>NOW PLAYING</small><strong></strong></span><b>▶</b>';m.onclick=e=>{if(e.target.closest('b')){e.stopPropagation();toggle()}else openMusic()};document.body.appendChild(m)}
function syncMiniVisibility(){const m=$('#eliasMiniPlayer'),lock=$('#lockScreen');if(!m||!lock)return;m.classList.toggle('lock-only-hidden',lock.classList.contains('hidden'))}
function renderMini(){injectMini();const m=$('#eliasMiniPlayer'),t=current();safeImg($('img',m),t.art);$('strong',m).textContent=t.title;$('b',m).textContent=audio.paused?'▶':'Ⅱ';m.classList.toggle('playing',!audio.paused);syncMiniVisibility()}
function observeLockScreen(){const lock=$('#lockScreen');if(!lock)return;new MutationObserver(syncMiniVisibility).observe(lock,{attributes:true,attributeFilter:['class']});syncMiniVisibility()}
function updatePlayButtons(){document.querySelectorAll('[data-music-play]').forEach(b=>b.textContent=audio.paused?'▶':'Ⅱ')}
function updateProgress(){const p=$('#musicProgress');if(p){p.max=isFinite(audio.duration)?audio.duration:100;p.value=audio.currentTime||0}const a=$('#musicNow'),b=$('#musicDur');if(a)a.textContent=fmt(audio.currentTime);if(b)b.textContent=fmt(audio.duration)}
function openMusic(){if(window.homeScreen)homeScreen.classList.add('hidden');if(window.statusBar)statusBar.classList.add('hidden');if(window.appWindow)appWindow.classList.remove('hidden');renderPlayer();syncMiniVisibility();window.scrollTo(0,0)}
function renderPlayer(){if(!window.appContent||!window.appTitle)return;appTitle.textContent='Music';const t=current();appContent.innerHTML=`<div id="musicPlayerPage" class="music-player-page"><section class="music-cover"><img src="${t.art}" alt=""><div class="music-cover-grad"></div><span>OURS</span></section><section class="music-meta"><small>${t.artist}</small><h3>${t.title}</h3><p>${t.note}</p><em>${t.mood}</em></section><section class="music-progress-wrap"><input id="musicProgress" type="range" min="0" value="0"><div><span id="musicNow">0:00</span><span id="musicDur">0:00</span></div></section><section class="music-main-controls"><button id="musicPrev">‹‹</button><button id="musicPlay" data-music-play>▶</button><button id="musicNext">››</button></section><section class="music-sub-controls"><button id="musicShuffle" class="${shuffle?'on':''}">↝ Shuffle</button><button id="musicRepeat" class="${repeat!=='off'?'on':''}">↻ ${repeat==='one'?'One':repeat==='all'?'All':'Repeat'}</button></section><section class="music-queue"><small>OUR PLAYLIST</small>${tracks.map((x,i)=>`<button data-track="${i}" class="${i===idx?'active':''}"><img src="${x.art}"><span><strong>${x.title}</strong><em>${x.artist}</em></span><b>${i===idx&&!audio.paused?'♪':''}</b></button>`).join('')}</section></div>`;appContent.querySelectorAll('img').forEach(img=>{img.onerror=()=>{img.onerror=null;img.src=FALLBACK}});$('#musicPlay').onclick=toggle;$('#musicPrev').onclick=prev;$('#musicNext').onclick=next;$('#musicShuffle').onclick=toggleShuffle;$('#musicRepeat').onclick=cycleRepeat;$('#musicProgress').oninput=e=>{audio.currentTime=Number(e.target.value)||0};appContent.querySelectorAll('[data-track]').forEach(b=>b.onclick=()=>{idx=Number(b.dataset.track);load(true)});updateProgress();updatePlayButtons()}
function hijackExistingMusic(){document.querySelectorAll('[data-app="music"]').forEach(b=>{b.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault();openMusic()},true)});window.toggleMusic=async()=>{toggle();return !audio.paused}}
window.openMusic=openMusic;window.eliasTracks=tracks;injectMini();renderMini();observeLockScreen();hijackExistingMusic();load(false);
})();