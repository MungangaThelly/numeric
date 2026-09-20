let installPrompt=null;
const installButton=document.querySelector('#installApp');
function appLanguage(){return localStorage.getItem('mbokaLang')==='en'?'en':'fr'}
function connectionNotice(message,online=false){const old=document.querySelector('.connection-banner');if(old)old.remove();const banner=document.createElement('div');banner.className=`connection-banner${online?' online':''}`;banner.textContent=message;document.body.appendChild(banner);setTimeout(()=>banner.remove(),3200)}
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>connectionNotice(appLanguage()==='en'?'Offline mode could not be prepared.':'Le mode hors connexion n’a pas pu être préparé.'));
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;installButton.textContent=appLanguage()==='en'?'Install':'Installer'});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
window.addEventListener('appinstalled',()=>connectionNotice(appLanguage()==='en'?'Mboka is installed!':'Mboka est installé !',true));
window.addEventListener('offline',()=>connectionNotice(appLanguage()==='en'?'Offline — Mboka remains available.':'Hors connexion — Mboka reste disponible.'));
window.addEventListener('online',()=>connectionNotice(appLanguage()==='en'?'Connection restored.':'Connexion rétablie.',true));
