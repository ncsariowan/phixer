import{c as V,d as A,o as j,a as F,b as H,i as E,s as B,t as O,u as T,e as z,f as W,g as S}from"./index-c3762c25.js";const[Y,J]=V([]),q=()=>[Y,J],K=""+new URL("Bass-a4ff7e49.mp3",import.meta.url).href,Q=""+new URL("Drums-42ca18a8.mp3",import.meta.url).href,Z=""+new URL("Guitar-8b97ccdd.mp3",import.meta.url).href,tt=""+new URL("Joey-febc1322.mp3",import.meta.url).href,et=""+new URL("Marie-e10613a2.mp3",import.meta.url).href,_=new AudioContext;class ot{constructor(t){this.loadBuffer(t),this.gainNode=new GainNode(_),this.panNode=new StereoPannerNode(_),this.gainNode.connect(this.panNode),this.panNode.connect(_.destination),this.setGain(0)}async loadBuffer(t){const h=await(await fetch(t)).arrayBuffer();this.buffer=await _.decodeAudioData(h)}play(t){this.sourceNode=_.createBufferSource(),this.sourceNode.connect(this.gainNode),this.sourceNode.buffer=this.buffer,this.sourceNode.start(t)}stop(){this.sourceNode.stop()}setGain(t){this.gainNode.gain.setValueAtTime(t,_.currentTime)}setPan(t){this.panNode.pan.setValueAtTime(t,_.currentTime)}}const nt=[Z,et,tt,K,Q];let G=[];for(const e of nt)G.push(new ot(e));const L=()=>({stems:G}),[st,ct]=V(!1),C=document.createElement("video");C.autoplay=!0;C.playsInline=!0;const N=document.body.getBoundingClientRect().width/2,U=.75*N;C.height=U;C.width=N;const I=()=>({video:C,streaming:st,setStreaming:ct,height:U,width:N}),at=(e,t,c,h,r)=>{const u=new cv.VideoCapture(t),i=new cv.Mat(t.height,t.width,cv.CV_8UC4);u.read(i);const v=h().map(({x:a,y:f,w,h:g})=>{let m=new cv.Rect(a,f,w,g);const d=i.roi(m),o=new cv.Mat;cv.cvtColor(d,o,cv.COLOR_RGBA2RGB),cv.cvtColor(o,o,cv.COLOR_RGB2HSV);const b=new cv.Mat,D=new cv.Scalar(30,30,0),X=new cv.Scalar(180,180,180),M=new cv.Mat(o.rows,o.cols,o.type(),D),P=new cv.Mat(o.rows,o.cols,o.type(),X);cv.inRange(o,M,P,b);const $=new cv.Mat,x=new cv.MatVector;return x.push_back(o),cv.calcHist(x,[0],b,$,[180],[0,180]),cv.normalize($,$,0,255,cv.NORM_MINMAX),d.delete(),o.delete(),b.delete(),M.delete(),P.delete(),x.delete(),{roiHist:$,trackWindow:m}}),R=new cv.TermCriteria(cv.TERM_CRITERIA_EPS|cv.TERM_CRITERIA_COUNT,100,1),n=new cv.Mat(t.height,t.width,cv.CV_8UC3),p=new cv.MatVector;p.push_back(n);const y=new cv.Mat,l=30,s=()=>{try{if(!c()){i.delete(),y.delete(),p.delete(),v.forEach(({roiHist:f})=>f.delete()),n.delete();return}const a=Date.now();u.read(i),cv.cvtColor(i,n,cv.COLOR_RGBA2RGB),cv.cvtColor(n,n,cv.COLOR_RGB2HSV),v.forEach(({trackWindow:f,roiHist:w},g)=>{cv.calcBackProject(p,[0],w,y,[0,180],1);const[m,d]=cv.CamShift(y,f,R);v[g].trackWindow=d;const o=cv.rotatedRectPoints(m);r(g,o),cv.line(i,o[0],o[1],[255,0,0,255],3),cv.line(i,o[1],o[2],[255,0,0,255],3),cv.line(i,o[2],o[3],[255,0,0,255],3),cv.line(i,o[3],o[0],[255,0,0,255],3)}),cv.imshow(e,i),setTimeout(s,1e3/l-(Date.now()-a))}catch(a){console.error(a)}};setTimeout(s,0)},rt=(e,t)=>{e.srcObject?.getTracks().forEach(c=>c.stop()),t(!1)},it=e=>navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:!1}).then(t=>{e.srcObject=t,e.play()}).catch(t=>console.error(`An error occurred: ${t}`)),lt=O("<div><canvas></canvas><canvas></canvas></div>"),dt=()=>{let e,t;const[c,h]=q(),{video:r,streaming:u,setStreaming:i,height:v,width:R}=I(),{stems:n}=L();r.style.position="absolute",r.style["z-index"]="-10",j(()=>it(r));let p=(l,s)=>{if(l<n.length){let a=n[l],f=(s[0].x+s[1].x+s[2].x+s[3].x)/4;(s[0].y+s[1].y+s[2].y+s[3].y)/4;let g=ht(s)/(r.width*r.height),m=parseFloat(f/r.width*-2+1);isFinite(m)&&a.setPan(-m),isFinite(g)&&a.setGain(10*g)}};F(()=>{u()&&(at(e,r,u,c,p),t.getContext("2d").clearRect(0,0,t.width,t.height),t.style.display="none")}),H(()=>rt(r,i));const y=l=>{const{left:s,top:a,width:f}=t.getBoundingClientRect(),w=l.clientX-s,g=l.clientY-a,m=t.getContext("2d");m.strokeStyle="red",m.lineWidth=3;const d=69;h([...c(),{x:w-d/2,y:g-d/2,w:d,h:d*2}]),m.strokeRect(w-d/2,g-d/2,d,d*2)};return(()=>{const l=lt.cloneNode(!0),s=l.firstChild,a=s.nextSibling;l.style.setProperty("position","relative"),l.style.setProperty("height",`${v}px`),l.style.setProperty("width",`${R}px`),E(l,r,s);const f=e;typeof f=="function"?T(f,s):e=s,s.style.setProperty("position","absolute"),a.$$click=y;const w=t;return typeof w=="function"?T(w,a):t=a,a.style.setProperty("position","absolute"),a.style.setProperty("z-index","10"),B(a,"width",R),B(a,"height",v),l})()};function ht(e){let t=0;for(let c=0,h=e.length;c<h;c++){let r=e[c].x,u=e[c===e.length-1?0:c+1].y,i=e[c===e.length-1?0:c+1].x,v=e[c].y;t+=r*u*.5,t-=i*v*.5}return Math.abs(t)}A(["click"]);const ut="_root_sgflk_1",vt="_wrap_sgflk_36",ft="_video_sgflk_44",k={root:ut,wrap:vt,video:ft},mt=O("<div><div></div><div><button>Start</button><button>Play</button></div></div>"),wt=()=>{const e=new AudioContext,{setStreaming:t}=I(),{stems:c}=L();let h=!1;return(()=>{const r=mt.cloneNode(!0),u=r.firstChild,i=u.nextSibling,v=i.firstChild,R=v.nextSibling;return E(u,z(dt,{})),v.$$click=()=>{t(!0)},R.$$click=()=>{if(h){for(const n of c)n.stop();h=!1}else{const n=e.currentTime+.5;for(const p of c)p.play(n);h=!0}},W(n=>{const p=k.app,y=k.video,l=k.wrap;return p!==n._v$&&S(r,n._v$=p),y!==n._v$2&&S(u,n._v$2=y),l!==n._v$3&&S(i,n._v$3=l),n},{_v$:void 0,_v$2:void 0,_v$3:void 0}),r})()};A(["click"]);export{wt as default};
