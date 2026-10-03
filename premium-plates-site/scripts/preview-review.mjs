import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const out = path.resolve('.impeccable/review');
await mkdir(out, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=9337',`--user-data-dir=${path.resolve('.preview-browser')}`,'about:blank'], { windowsHide: true, stdio:'ignore' });
const pause = ms => new Promise(r=>setTimeout(r,ms));
let socket;
try {
  let target;
  for(let i=0;i<30;i++){try{target=await (await fetch('http://127.0.0.1:9337/json/new?about:blank',{method:'PUT'})).json();break;}catch{await pause(300);}}
  if(!target) throw new Error('Review browser did not start');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r=>socket.addEventListener('open',r,{once:true}));
  let id=0; const pending=new Map();
  socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});socket.send(JSON.stringify({id:n,method,params}));});
  const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  const results={};
  for(const [name,width,height,mobile] of [['desktop',1440,1000,false],['mobile',390,844,true]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile});
    await send('Page.navigate',{url:'http://localhost:3000/'}); await pause(3500);
    await evaluate('document.fonts.ready');
    await evaluate('(()=>{const v=document.querySelector("video");v.pause();v.currentTime=4.2;window.scrollTo(0,0);return true})()'); await pause(400);
    const metrics=await send('Page.getLayoutMetrics');
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.ceil(metrics.cssContentSize.height),scale:1}});
    await writeFile(path.join(out,`${name}.png`),Buffer.from(shot.data,'base64'));
    results[name]=await evaluate('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,videoDuration:document.querySelector("video").duration,heading:document.querySelector("h1").innerText})');
    if(!mobile){
      results.registration=await evaluate(`(()=>{const input=document.getElementById('studio-reg');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'AB12 CDE');input.dispatchEvent(new Event('input',{bubbles:true}));return true})()`);await pause(650);
      results.livePlate=await evaluate(`document.querySelector('.vehicle-live-plate .plate-lettering').textContent`);
      results.soundEnabled=await evaluate(`(()=>{document.querySelector('.sound-control').click();return !document.querySelector('video').muted})()`);
      results.audioTrack=await evaluate(`document.querySelector('video').currentSrc.includes('night-drive-cinematic.mp4')`);
      await evaluate(`document.querySelector('.preview-command button').click()`);await pause(350);
      results.replayFit=await evaluate(`Number(document.querySelector('.fit-plate').dataset.take) > 0`);
      await evaluate(`Array.from(document.querySelectorAll('.finish-buttons button')).find(b=>b.textContent.includes('3D Gel')).click()`);await pause(450);
      results.finish=await evaluate(`document.querySelector('.vehicle-live-plate .number-plate').className`);
      await evaluate(`document.querySelector('.studio-total button').click()`);await pause(250);
      results.bag=await evaluate(`document.querySelector('[role=dialog]')?.textContent.includes('AB12 CDE')`);
      await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
      await evaluate(`document.querySelector('[data-slot=accordion-trigger]').click()`);await pause(200);
      results.faq=await evaluate(`document.querySelector('[data-slot=accordion-trigger]').getAttribute('aria-expanded')`);
    } else {
      await evaluate(`document.querySelector('.menu-trigger').click()`);await pause(200);
      results.mobileMenu=await evaluate(`!!document.querySelector('[role=dialog] nav a')`);
    }
  }
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:'http://localhost:3000/'}); await pause(1800);
  results.motion=await evaluate(`({filmPlaying:!document.querySelector('video').paused,heroAnimated:getComputedStyle(document.querySelector('.hero-title h1 span')).animationName==='hero-reveal'})`);
  await evaluate(`document.querySelector('.preview-command button').click()`); await pause(350);
  results.motion.fitAnimated=await evaluate(`document.querySelector('.fit-plate').getAnimations().length>0`);
  await writeFile(path.join(out,'interaction-results.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
  await send('Browser.close').catch(()=>{});
} finally { socket?.close(); chrome.kill(); }
