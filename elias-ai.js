// ELIAS OS 5 — ONE ELIAS STATE + AI BRIDGE
(function(){
'use strict';
const KEY='elias.one.';
const read=(k,d)=>{try{const v=localStorage.getItem(KEY+k);return v===null?d:JSON.parse(v)}catch{return d}};
const write=(k,v)=>localStorage.setItem(KEY+k,JSON.stringify(v));
const moods=['calm','happy','annoyed','sleepy','affectionate','mischievous','jealous'];
const sprites={
 calm:'https://i.postimg.cc/bD4fMZMM/elias-calm.png', happy:'https://i.postimg.cc/9RsHSDSZ/elias-happy.png',
 annoyed:'https://i.postimg.cc/HcF1KrKb/elias-annoyed.png', sleepy:'https://i.postimg.cc/1nb1T8Tj/elias-sleepy.png',
 affectionate:'https://i.postimg.cc/vgCwj4jn/elias-affectionate.png', mischievous:'https://i.postimg.cc/mzKWqPqX/elias-mischievous.png',
 jealous:'https://i.postimg.cc/2b1f2QHL/elias-jealous.png'
};
const state={
 mood:read('mood',localStorage.getItem('eliasMood')||'calm'),
 affection:read('affection',Number(localStorage.getItem('eliasAffection'))||0),
 conversation:read('conversation',(()=>{try{return JSON.parse(localStorage.getItem('eliasConversation')||'[]')}catch{return[]}})()),
 calls:read('calls',[]), installedApps:read('installedApps',[])
};
function save(){state.conversation=state.conversation.slice(-30);write('mood',state.mood);write('affection',state.affection);write('conversation',state.conversation);write('calls',state.calls.slice(-40));write('installedApps',state.installedApps);localStorage.setItem('eliasMood',state.mood);localStorage.setItem('eliasAffection',String(state.affection));localStorage.setItem('eliasConversation',JSON.stringify(state.conversation));}
function setMood(mood){state.mood=moods.includes(mood)?mood:'calm';save();document.documentElement.dataset.eliasMood=state.mood;document.dispatchEvent(new CustomEvent('elias:mood',{detail:{mood:state.mood,sprite:sprites[state.mood]}}));}
async function ask(message,mode='text'){
 const text=String(message||'').trim();if(!text)throw new Error('Message is required.');
 const history=state.conversation.slice(-24);state.conversation.push({role:'user',content:text});save();
 const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history,affection:state.affection,hour:new Date().getHours(),mode})});
 const data=await res.json();if(!res.ok)throw new Error(data.error||'Elias could not answer.');
 state.conversation.push({role:'assistant',content:data.reply});state.affection+=1;setMood(data.mood);save();
 document.dispatchEvent(new CustomEvent('elias:reply',{detail:{...data,mode}}));
 if(data.wantsToCall)document.dispatchEvent(new CustomEvent('elias:wants-call',{detail:{mode:'audio'}}));
 return data;
}
function recordCall(kind,direction,duration=0){state.calls.push({id:Date.now(),kind,direction,duration,at:Date.now()});save();}
function installApp(id){if(!state.installedApps.includes(id))state.installedApps.push(id);save();}
function uninstallApp(id){state.installedApps=state.installedApps.filter(x=>x!==id);save();}
setMood(state.mood);
window.EliasAI={version:'5.0-merge',state,sprites,ask,setMood,recordCall,installApp,uninstallApp,save};
})();
