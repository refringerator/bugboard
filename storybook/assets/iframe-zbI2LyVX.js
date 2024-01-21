import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m="modulepreload",f=function(_){return"/bugboard/storybook/"+_},E={},r=function(i,s,a){let e=Promise.resolve();if(s&&s.length>0){const t=document.getElementsByTagName("link");e=Promise.all(s.map(o=>{if(o=f(o),o in E)return;E[o]=!0;const c=o.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(!!a)for(let l=t.length-1;l>=0;l--){const d=t[l];if(d.href===o&&(!c||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${u}`))return;const n=document.createElement("link");if(n.rel=c?"stylesheet":m,c||(n.as="script",n.crossOrigin=""),n.href=o,document.head.appendChild(n),c)return new Promise((l,d)=>{n.addEventListener("load",l),n.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})}))}return e.then(()=>i()).catch(t=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=t,window.dispatchEvent(o),!o.defaultPrevented)throw t})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:p}=__STORYBOOK_MODULE_PREVIEW_API__,O=R({page:"preview"});p.setChannel(O);window.__STORYBOOK_ADDONS_CHANNEL__=O;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=O);const w={"./src/components/MainWindow/MainHeader/MainHeader.stories.ts":async()=>r(()=>import("./MainHeader.stories-RBal5Bez.js"),__vite__mapDeps([0,1,2,3,4])),"./src/components/MainWindow/MainMenu/MainMenu.stories.ts":async()=>r(()=>import("./MainMenu.stories-eE1yLnBm.js"),__vite__mapDeps([5,1,2,3,6])),"./src/components/MainWindow/WindowsControlPanel/WindowsControlPanel.stories.ts":async()=>r(()=>import("./WindowsControlPanel.stories-TMxns9HS.js"),__vite__mapDeps([7,1,2,3,8])),"./src/stories/Configure.mdx":async()=>r(()=>import("./Configure-OM9OffFI.js"),__vite__mapDeps([9,1,2,3,10,11,12,13,14,15]))};async function P(_){return w[_]()}const{composeConfigs:T,PreviewWeb:L,ClientApi:I}=__STORYBOOK_MODULE_PREVIEW_API__,v=async()=>{const _=await Promise.all([r(()=>import("./entry-preview-PSo23f1w.js"),__vite__mapDeps([16,2,3,17,11])),r(()=>import("./entry-preview-docs-JZpfVWBz.js"),__vite__mapDeps([18,13,3,14,2])),r(()=>import("./preview-VI2eoWmp.js"),__vite__mapDeps([19,12])),r(()=>import("./preview-cbujG1lO.js"),__vite__mapDeps([])),r(()=>import("./preview-OnO0tzRj.js"),__vite__mapDeps([20,14])),r(()=>import("./preview-FekBEZxm.js"),__vite__mapDeps([21,14])),r(()=>import("./preview-TkXSQy1x.js"),__vite__mapDeps([])),r(()=>import("./preview-u8M_OEO2.js"),__vite__mapDeps([22,14])),r(()=>import("./preview-bEa2SesL.js"),__vite__mapDeps([])),r(()=>import("./preview-37XjEtlT.js"),__vite__mapDeps([23,3])),r(()=>import("./preview-mEb2NEJf.js"),__vite__mapDeps([]))]);return T(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new L;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new I({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:P,getProjectAnnotations:v});export{r as _};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainHeader.stories-RBal5Bez.js","assets/jsx-runtime-AgcCsxC8.js","assets/index-XiNr8FW2.js","assets/_commonjsHelpers-5-cIlDoe.js","assets/MainHeader-LG2p0ptK.css","assets/MainMenu.stories-eE1yLnBm.js","assets/MainMenu-wGf6epKJ.css","assets/WindowsControlPanel.stories-TMxns9HS.js","assets/WindowsControlPanel-1JcoOZvH.css","assets/Configure-OM9OffFI.js","assets/index-gbrncx1C.js","assets/index-9vG4XYWr.js","assets/index-ogXoivrg.js","assets/index-mLPG47JP.js","assets/index-PPLHz8o0.js","assets/index-7MmEg4M7.js","assets/entry-preview-PSo23f1w.js","assets/react-18-sFOusbzT.js","assets/entry-preview-docs-JZpfVWBz.js","assets/preview-VI2eoWmp.js","assets/preview-OnO0tzRj.js","assets/preview-FekBEZxm.js","assets/preview-u8M_OEO2.js","assets/preview-37XjEtlT.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}