import{j as e}from"./jsx-runtime-AgcCsxC8.js";import"./index-XiNr8FW2.js";import"./_commonjsHelpers-5-cIlDoe.js";function a({onClick:n,title:u,icon:m}){const p=()=>{document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()};return e.jsxs("div",{className:"row header",children:[e.jsx("img",{className:"header__icon",src:m,alt:""}),e.jsx("span",{className:"header__text",children:u}),e.jsx("button",{type:"button",onClick:n,className:"header__button",children:"X"}),e.jsx("button",{type:"button",onClick:p,className:"header__button",children:"O"})]})}a.defaultProps={icon:"",onClick:()=>{}};try{a.displayName="MainHeader",a.__docgenInfo={description:"",displayName:"MainHeader",props:{icon:{defaultValue:{value:""},description:"",name:"icon",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},onClick:{defaultValue:{value:"() => {}"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const x={component:a,parameters:{},tags:["autodocs"]},r={args:{title:"BugBoard",icon:"vite.svg"}},t={args:{title:"BugBoard"}};var s,o,c;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    title: 'BugBoard',
    icon: 'vite.svg'
  }
}`,...(c=(o=r.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var i,l,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: 'BugBoard'
  }
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const y=["Primary","NoIcon"];export{t as NoIcon,r as Primary,y as __namedExportsOrder,x as default};
