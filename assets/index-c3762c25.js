(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const ot="modulepreload",it=function(e,t){return new URL(e,t).href},Ce={},lt=function(t,n,r){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=it(o,r),o in Ce)return;Ce[o]=!0;const l=o.endsWith(".css"),i=l?'[rel="stylesheet"]':"";if(!!r)for(let a=s.length-1;a>=0;a--){const d=s[a];if(d.href===o&&(!l||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${i}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":ot,l||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),l)return new Promise((a,d)=>{u.addEventListener("load",a),u.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())},A={};function G(e){A.context=e}const ct=(e,t)=>e===t,re=Symbol("solid-proxy"),se={equals:ct};let Te=Ue;const N=1,oe=2,je={owned:null,cleanups:null,context:null,owner:null},de={};var w=null;let B=null,m=null,P=null,O=null,ve=0;function ke(e,t){const n=m,r=w,s=e.length===0,o=s?je:{owned:null,cleanups:null,context:null,owner:t===void 0?r:t},l=s?e:()=>e(()=>S(()=>ue(o)));w=o,m=null;try{return R(l,!0)}finally{m=n,w=r}}function $(e,t){t=t?Object.assign({},se,t):se;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),He(n,s));return[Me.bind(n),r]}function Le(e,t,n){const r=ce(e,t,!0,N);W(r)}function L(e,t,n){const r=ce(e,t,!1,N);W(r)}function ut(e,t,n){Te=pt;const r=ce(e,t,!1,N);r.user=!0,O?O.push(r):W(r)}function v(e,t,n){n=n?Object.assign({},se,n):se;const r=ce(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,W(r),Me.bind(r)}function at(e,t,n){let r,s,o;arguments.length===2&&typeof t=="object"||arguments.length===1?(r=!0,s=e,o=t||{}):(r=e,s=t,o=n||{});let l=null,i=de,c=null,u=!1,a="initialValue"in o,d=typeof r=="function"&&v(r);const g=new Set,[b,x]=(o.storage||$)(o.initialValue),[p,H]=$(void 0),[T,U]=$(void 0,{equals:!1}),[q,j]=$(a?"ready":"unresolved");if(A.context){c=`${A.context.id}${A.context.count++}`;let f;o.ssrLoadFrom==="initial"?i=o.initialValue:A.load&&(f=A.load(c))&&(i=f[0])}function C(f,h,y,_){return l===f&&(l=null,a=!0,(f===i||h===i)&&o.onHydrated&&queueMicrotask(()=>o.onHydrated(_,{value:h})),i=de,Y(h,y)),h}function Y(f,h){R(()=>{h===void 0&&x(()=>f),j(h!==void 0?"errored":"ready"),H(h);for(const y of g.keys())y.decrement();g.clear()},!1)}function D(){const f=gt,h=b(),y=p();if(y!==void 0&&!l)throw y;return m&&!m.user&&f&&Le(()=>{T(),l&&(f.resolved||g.has(f)||(f.increment(),g.add(f)))}),h}function X(f=!0){if(f!==!1&&u)return;u=!1;const h=d?d():r;if(h==null||h===!1){C(l,S(b));return}const y=i!==de?i:S(()=>s(h,{value:b(),refetching:f}));return typeof y!="object"||!(y&&"then"in y)?(C(l,y,void 0,h),y):(l=y,u=!0,queueMicrotask(()=>u=!1),R(()=>{j(a?"refreshing":"pending"),U()},!1),y.then(_=>C(y,_,void 0,h),_=>C(y,void 0,Fe(_),h)))}return Object.defineProperties(D,{state:{get:()=>q()},error:{get:()=>p()},loading:{get(){const f=q();return f==="pending"||f==="refreshing"}},latest:{get(){if(!a)return D();const f=p();if(f&&!l)throw f;return b()}}}),d?Le(()=>X(!1)):X(!1),[D,{refetch:X,mutate:x}]}function S(e){if(m===null)return e();const t=m;m=null;try{return e()}finally{m=t}}function Ie(e,t,n){const r=Array.isArray(e);let s,o=n&&n.defer;return l=>{let i;if(r){i=Array(e.length);for(let u=0;u<e.length;u++)i[u]=e[u]()}else i=e();if(o){o=!1;return}const c=S(()=>t(i,s,l));return s=i,c}}function Cn(e){ut(()=>S(e))}function qe(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}function ft(){return w}function ht(e,t){const n=w,r=m;w=e,m=null;try{return R(t,!0)}catch(s){Ee(s)}finally{w=n,m=r}}function dt(e){const t=m,n=w;return Promise.resolve().then(()=>{m=t,w=n;let r;return R(e,!1),m=w=null,r?r.done:void 0})}function Be(e,t){const n=Symbol("context");return{id:n,Provider:wt(n),defaultValue:e}}function Ae(e){let t;return(t=Ke(w,e.id))!==void 0?t:e.defaultValue}function Pe(e){const t=v(e),n=v(()=>pe(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let gt;function Me(){const e=B;if(this.sources&&(this.state||e))if(this.state===N||e)W(this);else{const t=P;P=null,R(()=>le(this),!1),P=t}if(m){const t=this.observers?this.observers.length:0;m.sources?(m.sources.push(this),m.sourceSlots.push(t)):(m.sources=[this],m.sourceSlots=[t]),this.observers?(this.observers.push(m),this.observerSlots.push(m.sources.length-1)):(this.observers=[m],this.observerSlots=[m.sources.length-1])}return this.value}function He(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&R(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],l=B&&B.running;l&&B.disposed.has(o),(l&&!o.tState||!l&&!o.state)&&(o.pure?P.push(o):O.push(o),o.observers&&De(o)),l||(o.state=N)}if(P.length>1e6)throw P=[],new Error},!1)),t}function W(e){if(!e.fn)return;ue(e);const t=w,n=m,r=ve;m=w=e,yt(e,e.value,r),m=n,w=t}function yt(e,t,n){let r;try{r=e.fn(t)}catch(s){e.pure&&(e.state=N,e.owned&&e.owned.forEach(ue),e.owned=null),Ee(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?He(e,r):e.value=r,e.updatedAt=n)}function ce(e,t,n,r=N,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:null,pure:n};return w===null||w!==je&&(w.owned?w.owned.push(o):w.owned=[o]),o}function ie(e){const t=B;if(e.state===0||t)return;if(e.state===oe||t)return le(e);if(e.suspense&&S(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ve);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===N||t)W(e);else if(e.state===oe||t){const s=P;P=null,R(()=>le(e,n[0]),!1),P=s}}function R(e,t){if(P)return e();let n=!1;t||(P=[]),O?n=!0:O=[],ve++;try{const r=e();return mt(n),r}catch(r){n||(O=null),P=null,Ee(r)}}function mt(e){if(P&&(Ue(P),P=null),e)return;const t=O;O=null,t.length&&R(()=>Te(t),!1)}function Ue(e){for(let t=0;t<e.length;t++)ie(e[t])}function pt(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:ie(r)}for(A.context&&G(),t=0;t<n;t++)ie(e[t])}function le(e,t){const n=B;e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(s.state===N||n?s!==t&&ie(s):(s.state===oe||n)&&le(s,t))}}function De(e){const t=B;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=oe,r.pure?P.push(r):O.push(r),r.observers&&De(r))}}function ue(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),l=n.observerSlots.pop();r<s.length&&(o.sourceSlots[l]=r,s[r]=o,n.observerSlots[r]=l)}}if(e.owned){for(t=0;t<e.owned.length;t++)ue(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Fe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Ee(e){throw e=Fe(e),e}function Ke(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:Ke(e.owner,t):void 0}function pe(e){if(typeof e=="function"&&!e.length)return pe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=pe(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function wt(e,t){return function(r){let s;return L(()=>s=S(()=>(w.context={[e]:r.value},Pe(()=>r.children))),void 0),s}}function E(e,t){return S(()=>e(t||{}))}function ee(){return!0}const we={get(e,t,n){return t===re?n:e.get(t)},has(e,t){return t===re?!0:e.has(t)},set:ee,deleteProperty:ee,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:ee,deleteProperty:ee}},ownKeys(e){return e.keys()}};function ge(e){return(e=typeof e=="function"?e():e)?e:{}}function be(...e){let t=!1;for(let r=0;r<e.length;r++){const s=e[r];t=t||!!s&&re in s,e[r]=typeof s=="function"?(t=!0,v(s)):s}if(t)return new Proxy({get(r){for(let s=e.length-1;s>=0;s--){const o=ge(e[s])[r];if(o!==void 0)return o}},has(r){for(let s=e.length-1;s>=0;s--)if(r in ge(e[s]))return!0;return!1},keys(){const r=[];for(let s=0;s<e.length;s++)r.push(...Object.keys(ge(e[s])));return[...new Set(r)]}},we);const n={};for(let r=e.length-1;r>=0;r--)if(e[r]){const s=Object.getOwnPropertyDescriptors(e[r]);for(const o in s)o in n||Object.defineProperty(n,o,{enumerable:!0,get(){for(let l=e.length-1;l>=0;l--){const i=(e[l]||{})[o];if(i!==void 0)return i}}})}return n}function bt(e,...t){const n=new Set(t.flat());if(re in e){const s=t.map(o=>new Proxy({get(l){return o.includes(l)?e[l]:void 0},has(l){return o.includes(l)&&l in e},keys(){return o.filter(l=>l in e)}},we));return s.push(new Proxy({get(o){return n.has(o)?void 0:e[o]},has(o){return n.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!n.has(o))}},we)),s}const r=Object.getOwnPropertyDescriptors(e);return t.push(Object.keys(r).filter(s=>!n.has(s))),t.map(s=>{const o={};for(let l=0;l<s.length;l++){const i=s[l];i in e&&Object.defineProperty(o,i,r[i]?r[i]:{get(){return e[i]},set(){return!0},enumerable:!0})}return o})}function xt(e){let t,n;const r=s=>{const o=A.context;if(o){const[i,c]=$();(n||(n=e())).then(u=>{G(o),c(()=>u.default),G()}),t=i}else if(!t){const[i]=at(()=>(n||(n=e())).then(c=>c.default));t=i}let l;return v(()=>(l=t())&&S(()=>{if(!o)return l(s);const i=A.context;G(o);const c=l(s);return G(i),c}))};return r.preload=()=>n||((n=e()).then(s=>t=()=>s.default),n),r}function Ve(e){let t=!1;const n=e.keyed,r=v(()=>e.when,void 0,{equals:(s,o)=>t?s===o:!s==!o});return v(()=>{const s=r();if(s){const o=e.children,l=typeof o=="function"&&o.length>0;return t=n||l,l?S(()=>o(s)):o}return e.fallback},void 0,void 0)}const vt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],At=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...vt]),Pt=new Set(["innerHTML","textContent","innerText","children"]),Et=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),_e=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),St=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Ct={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Lt(e,t,n){let r=n.length,s=t.length,o=r,l=0,i=0,c=t[s-1].nextSibling,u=null;for(;l<s||i<o;){if(t[l]===n[i]){l++,i++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===l){const a=o<r?i?n[i-1].nextSibling:n[o-i]:c;for(;i<o;)e.insertBefore(n[i++],a)}else if(o===i)for(;l<s;)(!u||!u.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[o-1]&&n[i]===t[s-1]){const a=t[--s].nextSibling;e.insertBefore(n[i++],t[l++].nextSibling),e.insertBefore(n[--o],a),t[s]=n[o]}else{if(!u){u=new Map;let d=i;for(;d<o;)u.set(n[d],d++)}const a=u.get(t[l]);if(a!=null)if(i<a&&a<o){let d=l,g=1,b;for(;++d<s&&d<o&&!((b=u.get(t[d]))==null||b!==a+g);)g++;if(g>a-i){const x=t[l];for(;i<a;)e.insertBefore(n[i++],x)}else e.replaceChild(n[i++],t[l++])}else l++;else t[l++].remove()}}}const $e="_$DX_DELEGATE";function _t(e,t,n,r={}){let s;return ke(o=>{s=o,t===document?e():Je(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function ae(e,t,n){const r=document.createElement("template");r.innerHTML=e;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function We(e,t=window.document){const n=t[$e]||(t[$e]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,It))}}function Xe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function $t(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function K(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ot(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=o=>s.call(e,n[1],o))}else e.addEventListener(t,n)}function Rt(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let o,l;for(o=0,l=s.length;o<l;o++){const i=s[o];!i||i==="undefined"||t[i]||(Oe(e,i,!1),delete n[i])}for(o=0,l=r.length;o<l;o++){const i=r[o],c=!!t[i];!i||i==="undefined"||n[i]===c||!c||(Oe(e,i,!0),n[i]=c)}return n}function Nt(e,t,n){if(!t)return n?Xe(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,o;for(o in n)t[o]==null&&r.removeProperty(o),delete n[o];for(o in t)s=t[o],s!==n[o]&&(r.setProperty(o,s),n[o]=s);return n}function Tt(e,t={},n,r){const s={};return r||L(()=>s.children=V(e,t.children,s.children)),L(()=>t.ref&&t.ref(e)),L(()=>jt(e,t,n,!0,s,!0)),s}function Ln(e,t,n){return S(()=>e(t,n))}function Je(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return V(e,t,r,n);L(s=>V(e,t(),s,n),r)}function jt(e,t,n,r,s={},o=!1){t||(t={});for(const l in s)if(!(l in t)){if(l==="children")continue;s[l]=Re(e,l,null,s[l],n,o)}for(const l in t){if(l==="children"){r||V(e,t.children);continue}const i=t[l];s[l]=Re(e,l,i,s[l],n,o)}}function kt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Oe(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,o=r.length;s<o;s++)e.classList.toggle(r[s],n)}function Re(e,t,n,r,s,o){let l,i,c;if(t==="style")return Nt(e,n,r);if(t==="classList")return Rt(e,n,r);if(n===r)return r;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const u=t.slice(3);r&&e.removeEventListener(u,r),n&&e.addEventListener(u,n)}else if(t.slice(0,10)==="oncapture:"){const u=t.slice(10);r&&e.removeEventListener(u,r,!0),n&&e.addEventListener(u,n,!0)}else if(t.slice(0,2)==="on"){const u=t.slice(2).toLowerCase(),a=St.has(u);if(!a&&r){const d=Array.isArray(r)?r[0]:r;e.removeEventListener(u,d)}(a||n)&&(Ot(e,u,n,a),a&&We([u]))}else if((c=Pt.has(t))||!s&&(_e[t]||(i=At.has(t)))||(l=e.nodeName.includes("-")))t==="class"||t==="className"?K(e,n):l&&!i&&!c?e[kt(t)]=n:e[_e[t]||t]=n;else{const u=s&&t.indexOf(":")>-1&&Ct[t.split(":")[0]];u?$t(e,u,t,n):Xe(e,Et[t]||t,n)}return n}function It(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),A.registry&&!A.done&&(A.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>{for(;r&&r.nodeType!==8&&r.nodeValue!=="pl-"+e;){let s=r.nextSibling;r.remove(),r=s}r&&r.remove()}));n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function V(e,t,n,r,s){for(A.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,l=r!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(A.context)return n;if(o==="number"&&(t=t.toString()),l){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=F(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(A.context)return n;n=F(e,n,r)}else{if(o==="function")return L(()=>{let i=t();for(;typeof i=="function";)i=i();n=V(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],c=n&&Array.isArray(n);if(xe(i,t,n,s))return L(()=>n=V(e,i,n,r,!0)),()=>n;if(A.context){if(!i.length)return n;for(let u=0;u<i.length;u++)if(i[u].parentNode)return n=i}if(i.length===0){if(n=F(e,n,r),l)return n}else c?n.length===0?Ne(e,i,r):Lt(e,n,i):(n&&F(e),Ne(e,i));n=i}else if(t instanceof Node){if(A.context&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=F(e,n,r,t);F(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function xe(e,t,n,r){let s=!1;for(let o=0,l=t.length;o<l;o++){let i=t[o],c=n&&n[o];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))s=xe(e,i,c)||s;else if(typeof i=="function")if(r){for(;typeof i=="function";)i=i();s=xe(e,Array.isArray(i)?i:[i],Array.isArray(c)?c:[c])||s}else e.push(i),s=!0;else{const u=String(i);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return s}function Ne(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function F(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let l=t.length-1;l>=0;l--){const i=t[l];if(s!==i){const c=i.parentNode===e;!o&&!l?c?e.replaceChild(s,i):e.insertBefore(s,n):c&&i.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}const qt=!1;function ze(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Bt([e,t],n,r){return[n?()=>n(e()):e,r?s=>t(r(s)):t]}function Mt(e){try{return document.querySelector(e)}catch{return null}}function Ge(e,t){const n=Mt(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}function Qe(e,t,n,r){let s=!1;const o=i=>typeof i=="string"?{value:i}:i,l=Bt($(o(e()),{equals:(i,c)=>i.value===c.value}),void 0,i=>(!s&&t(i),i));return n&&qe(n((i=e())=>{s=!0,l[1](o(i)),s=!1})),{signal:l,utils:r}}function Ht(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:$({value:""})};return e}function Ut(){return Qe(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:n,state:r})=>{t?window.history.replaceState(r,"",e):window.history.pushState(r,"",e),Ge(window.location.hash.slice(1),n)},e=>ze(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}function Dt(){return Qe(()=>window.location.hash.slice(1),({value:e,replace:t,scroll:n,state:r})=>{t?window.history.replaceState(r,"","#"+e):window.location.hash=e;const s=e.indexOf("#"),o=s>=0?e.slice(s+1):"";Ge(o,n)},e=>ze(window,"hashchange",()=>e()),{go:e=>window.history.go(e),renderPath:e=>`#${e}`,parsePath:e=>{const t=e.replace(/^.*?#/,"");if(!t.startsWith("/")){const[,n="/"]=window.location.hash.split("#",2);return`${n}#${t}`}return t}})}function Ft(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,o){if(n)return!(n=!1);const l={to:s,options:o,defaultPrevented:!1,preventDefault:()=>l.defaultPrevented=!0};for(const i of e)i.listener({...l,from:i.location,retry:c=>{c&&(n=!0),i.navigate(s,o)}});return!l.defaultPrevented}return{subscribe:t,confirm:r}}const Kt=/^(?:[a-z0-9]+:)?\/\//i,Vt=/^\/+|\/+$/g;function M(e,t=!1){const n=e.replace(Vt,"");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function ne(e,t,n){if(Kt.test(t))return;const r=M(e),s=n&&M(n);let o="";return!s||t.startsWith("/")?o=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?o=r+s:o=s,(o||"/")+M(t,!o)}function Wt(e,t){if(e==null)throw new Error(t);return e}function Ye(e,t){return M(e).replace(/\/*(\*.*)?$/g,"")+M(t)}function Xt(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function Jt(e,t,n){const[r,s]=e.split("/*",2),o=r.split("/").filter(Boolean),l=o.length;return i=>{const c=i.split("/").filter(Boolean),u=c.length-l;if(u<0||u>0&&s===void 0&&!t)return null;const a={path:l?"":"/",params:{}},d=g=>n===void 0?void 0:n[g];for(let g=0;g<l;g++){const b=o[g],x=c[g],p=b[0]===":"?b.slice(1):b;if(b[0]===":"&&ye(x,d(p)))a.params[p]=x;else if(!ye(x,b))return null;a.path+=`/${x}`}if(s){const g=u?c.slice(-u).join("/"):"";if(ye(g,d(s)))a.params[s]=g;else return null}return a}}function ye(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function zt(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,o)=>s+(o.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function Ze(e){const t=new Map,n=ft();return new Proxy({},{get(r,s){return t.has(s)||ht(n,()=>t.set(s,v(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function et(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return et(r).reduce((o,l)=>[...o,...s.map(i=>i+l)],[])}const Gt=100,tt=Be(),fe=Be(),he=()=>Wt(Ae(tt),"Make sure your app is wrapped in a <Router />");let Q;const Se=()=>Q||Ae(fe)||he().base,Qt=e=>{const t=Se();return v(()=>t.resolvePath(e()))},Yt=e=>{const t=he();return v(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},Zt=()=>he().location;function en(e,t="",n){const{component:r,data:s,children:o}=e,l=!o||Array.isArray(o)&&!o.length,i={key:e,element:r?()=>E(r,{}):()=>{const{element:c}=e;return c===void 0&&n?E(n,{}):c},preload:e.component?r.preload:e.preload,data:s};return nt(e.path).reduce((c,u)=>{for(const a of et(u)){const d=Ye(t,a),g=l?d:d.split("/*",1)[0];c.push({...i,originalPath:a,pattern:g,matcher:Jt(g,!l,e.matchFilters)})}return c},[])}function tn(e,t=0){return{routes:e,score:zt(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const o=e[s],l=o.matcher(n);if(!l)return null;r.unshift({...l,route:o})}return r}}}function nt(e){return Array.isArray(e)?e:[e]}function rt(e,t="",n,r=[],s=[]){const o=nt(e);for(let l=0,i=o.length;l<i;l++){const c=o[l];if(c&&typeof c=="object"&&c.hasOwnProperty("path")){const u=en(c,t,n);for(const a of u){r.push(a);const d=Array.isArray(c.children)&&c.children.length===0;if(c.children&&!d)rt(c.children,a.pattern,n,r,s);else{const g=tn([...r],s.length);s.push(g)}r.pop()}}}return r.length?s:s.sort((l,i)=>i.score-l.score)}function nn(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function rn(e,t){const n=new URL("http://sar"),r=v(c=>{const u=e();try{return new URL(u,n)}catch{return console.error(`Invalid path ${u}`),c}},n,{equals:(c,u)=>c.href===u.href}),s=v(()=>r().pathname),o=v(()=>r().search,!0),l=v(()=>r().hash),i=v(()=>"");return{get pathname(){return s()},get search(){return o()},get hash(){return l()},get state(){return t()},get key(){return i()},query:Ze(Ie(o,()=>Xt(r())))}}function sn(e,t="",n,r){const{signal:[s,o],utils:l={}}=Ht(e),i=l.parsePath||(f=>f),c=l.renderPath||(f=>f),u=l.beforeLeave||Ft(),a=ne("",t),d=void 0;if(a===void 0)throw new Error(`${a} is not a valid base path`);a&&!s().value&&o({value:a,replace:!0,scroll:!1});const[g,b]=$(!1),x=async f=>{b(!0);try{await dt(f)}finally{b(!1)}},[p,H]=$(s().value),[T,U]=$(s().state),q=rn(p,T),j=[],C={pattern:a,params:{},path:()=>a,outlet:()=>null,resolvePath(f){return ne(a,f)}};if(n)try{Q=C,C.data=n({data:void 0,params:{},location:q,navigate:D(C)})}finally{Q=void 0}function Y(f,h,y){S(()=>{if(typeof h=="number"){h&&(l.go?u.confirm(h,y)&&l.go(h):console.warn("Router integration does not support relative routing"));return}const{replace:_,resolve:Z,scroll:k,state:J}={replace:!1,resolve:!0,scroll:!0,...y},I=Z?f.resolvePath(h):ne("",h);if(I===void 0)throw new Error(`Path '${h}' is not a routable path`);if(j.length>=Gt)throw new Error("Too many redirects");const z=p();if((I!==z||J!==T())&&!qt){if(u.confirm(I,y)){const st=j.push({value:z,replace:_,scroll:k,state:T()});x(()=>{H(I),U(J)}).then(()=>{j.length===st&&X({value:I,state:J})})}}})}function D(f){return f=f||Ae(fe)||C,(h,y)=>Y(f,h,y)}function X(f){const h=j[0];h&&((f.value!==h.value||f.state!==h.state)&&o({...f,replace:h.replace,scroll:h.scroll}),j.length=0)}L(()=>{const{value:f,state:h}=s();S(()=>{f!==p()&&x(()=>{H(f),U(h)})})});{let f=function(h){if(h.defaultPrevented||h.button!==0||h.metaKey||h.altKey||h.ctrlKey||h.shiftKey)return;const y=h.composedPath().find(z=>z instanceof Node&&z.nodeName.toUpperCase()==="A");if(!y||!y.hasAttribute("link"))return;const _=y.href;if(y.target||!_&&!y.hasAttribute("state"))return;const Z=(y.getAttribute("rel")||"").split(/\s+/);if(y.hasAttribute("download")||Z&&Z.includes("external"))return;const k=new URL(_);if(k.origin!==window.location.origin||a&&k.pathname&&!k.pathname.toLowerCase().startsWith(a.toLowerCase()))return;const J=i(k.pathname+k.search+k.hash),I=y.getAttribute("state");h.preventDefault(),Y(C,J,{resolve:!1,replace:y.hasAttribute("replace"),scroll:!y.hasAttribute("noscroll"),state:I&&JSON.parse(I)})};We(["click"]),document.addEventListener("click",f),qe(()=>document.removeEventListener("click",f))}return{base:C,out:d,location:q,isRouting:g,renderPath:c,parsePath:i,navigatorFactory:D,beforeLeave:u}}function on(e,t,n,r,s){const{base:o,location:l,navigatorFactory:i}=e,{pattern:c,element:u,preload:a,data:d}=r().route,g=v(()=>r().path);a&&a();const b={parent:t,pattern:c,get child(){return n()},path:g,params:s,data:t.data,outlet:u,resolvePath(x){return ne(o.path(),x,g())}};if(d)try{Q=b,b.data=d({data:t.data,params:s,location:l,navigate:i(b)})}finally{Q=void 0}return b}const ln=ae("<a link></a>"),cn=e=>{const{source:t,url:n,base:r,data:s,out:o}=e,l=t||Ut(),i=sn(l,r,s);return E(tt.Provider,{value:i,get children(){return e.children}})},un=e=>{const t=he(),n=Se(),r=Pe(()=>e.children),s=v(()=>rt(r(),Ye(n.pattern,e.base||""),an)),o=v(()=>nn(s(),t.location.pathname)),l=Ze(()=>{const a=o(),d={};for(let g=0;g<a.length;g++)Object.assign(d,a[g].params);return d});t.out&&t.out.matches.push(o().map(({route:a,path:d,params:g})=>({originalPath:a.originalPath,pattern:a.pattern,path:d,params:g})));const i=[];let c;const u=v(Ie(o,(a,d,g)=>{let b=d&&a.length===d.length;const x=[];for(let p=0,H=a.length;p<H;p++){const T=d&&d[p],U=a[p];g&&T&&U.route.key===T.route.key?x[p]=g[p]:(b=!1,i[p]&&i[p](),ke(q=>{i[p]=q,x[p]=on(t,x[p-1]||n,()=>u()[p+1],()=>o()[p],l)}))}return i.splice(a.length).forEach(p=>p()),g&&b?g:(c=x[0],x)}));return E(Ve,{get when(){return u()&&c},children:a=>E(fe.Provider,{value:a,get children(){return a.outlet()}})})},me=e=>{const t=Pe(()=>e.children);return be(e,{get children(){return t()}})},an=()=>{const e=Se();return E(Ve,{get when(){return e.child},children:t=>E(fe.Provider,{value:t,get children(){return t.outlet()}})})};function fn(e){e=be({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=bt(e,["href","state","class","activeClass","inactiveClass","end"]),n=Qt(()=>e.href),r=Yt(n),s=Zt(),o=v(()=>{const l=n();if(l===void 0)return!1;const i=M(l.split(/[?#]/,1)[0]).toLowerCase(),c=M(s.pathname).toLowerCase();return e.end?i===c:c.startsWith(i)});return(()=>{const l=ln.cloneNode(!0);return Tt(l,be(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!o(),[e.activeClass]:o(),...t.classList}},get["aria-current"](){return o()?"page":void 0}}),!1,!1),l})()}const hn="_home_1phtx_4",dn="_title_1phtx_29",gn="_subtitle_1phtx_29",yn="_button_1phtx_45",te={home:hn,title:dn,subtitle:gn,button:yn},mn=ae("<button>Start App</button>"),pn=ae("<div><h1>Phixer</h1><p>Click below to get started</p></div>"),wn=()=>(()=>{const e=pn.cloneNode(!0),t=e.firstChild,n=t.nextSibling;return Je(e,E(fn,{href:"/app",get children(){const r=mn.cloneNode(!0);return L(()=>K(r,te.button)),r}}),null),L(r=>{const s=te.home,o=te.title,l=te.subtitle;return s!==r._v$&&K(e,r._v$=s),o!==r._v$2&&K(t,r._v$2=o),l!==r._v$3&&K(n,r._v$3=l),r},{_v$:void 0,_v$2:void 0,_v$3:void 0}),e})(),bn=()=>{HTMLCanvasElement.prototype._PHIXER_getContext=HTMLCanvasElement.prototype.getContext,HTMLCanvasElement.prototype.getContext=function(e,t){return this._PHIXER_getContext(e,{...t,willReadFrequently:!0})}};const xn="_mapping_qs8ij_1",vn={mapping:xn},An=ae("<div>Mapping</div>"),Pn=()=>(()=>{const e=An.cloneNode(!0);return L(()=>K(e,vn.mapping)),e})();bn();const En=xt(()=>lt(()=>import("./App-72ee2cc1.js"),["./App-72ee2cc1.js","./App-65baa440.css"],import.meta.url)),Sn=document.getElementById("root");_t(()=>E(cn,{get source(){return Dt()},get children(){return E(un,{get children(){return[E(me,{path:"/",component:wn}),E(me,{path:"/app",component:En}),E(me,{path:"/mapping",component:Pn})]}})}}),Sn);export{ut as a,qe as b,$ as c,We as d,E as e,L as f,K as g,Je as i,Cn as o,Xe as s,ae as t,Ln as u};