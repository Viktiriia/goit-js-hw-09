const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.querySelector("body");let a=null;t.addEventListener("click",(function(){a=setInterval((()=>{const a=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;d.style.background=a,t.disabled=!0,e.disabled=!1}),1e3)})),e.addEventListener("click",(function(){clearInterval(a),t.disabled=!1,e.disabled=!0}));
//# sourceMappingURL=01-color-switcher.972a4239.js.map
