import{c as se,d as de}from"./chunk-56SFPCBH.mjs";import{b as s,c as J}from"./chunk-BW5HJEW7.mjs";import{c as G,d as ie,e as re,f as M,i as X,j as ne,l as ae,u as xt,w as e,z as le}from"./chunk-76FBOKV5.mjs";import{b as Pt,e as Zt,h as qt,i as te,l as ee,n as Q,q as Ct,r as oe,s as st,t as O}from"./chunk-TXVSOAGR.mjs";import{g as Jt}from"./chunk-2F2BAZAO.mjs";Jt();function c(t){let{slots:a,startFrom:h,direction:d,effectsOptions:R,autoPlayControl:D,dragControl:N,alignment:_,gap:u,padding:n,paddingPerSide:b,paddingTop:w,paddingRight:Z,paddingBottom:T,paddingLeft:f,itemAmount:I,fadeOptions:B,intervalControl:k,transitionControl:S,arrowOptions:H,borderRadius:Vt,progressOptions:q,style:dt}=t,{effectsOpacity:v,effectsScale:ut,effectsRotate:tt,effectsPerspective:ct,effectsHover:et}=R,{fadeContent:F,overflow:ot,fadeWidth:P,fadeInset:Ot,fadeAlpha:Mt}=B,{showMouseControls:Rt,arrowSize:V,arrowRadius:Dt,arrowFill:Nt,leftArrow:ce,rightArrow:fe,arrowShouldSpace:A=!0,arrowShouldFadeIn:Tt=!1,arrowPosition:p,arrowPadding:Y,arrowGap:pe,arrowPaddingTop:me,arrowPaddingRight:he,arrowPaddingBottom:ge,arrowPaddingLeft:ye}=H,{showProgressDots:we,dotSize:Bt,dotsInset:kt,dotsRadius:be,dotsPadding:Se,dotsGap:ve,dotsFill:Pe,dotsBackground:Ce,dotsActiveOpacity:xe,dotsOpacity:Ie,dotsBlur:Ht}=q,Ve=b?`${w}px ${Z}px ${T}px ${f}px`:`${n}px`,C=xt.current()===xt.canvas,W=Pt.count(a)>0,i=d==="left"||d==="right",it=d==="right"||d==="bottom";if(!W)return J("section",{style:Ue,children:[s("div",{style:Qe,children:"\u2B50\uFE0F"}),s("p",{style:Je,children:"Connect to Content"}),s("p",{style:Ze,children:"Add layers or components to make infinite auto-playing slideshows."})]});let K=st(null),l=oe(()=>a.map(o=>qt()),[a]),ft=st(void 0),[r,Oe]=O({parent:null,children:null,item:null,itemWidth:null,itemHeight:null}),[Me,Ft]=O(!1),[Re,At]=O(D),[De,Wt]=O(!1),[z,zt]=O(!1),pt=[],Lt=4;C&&(Lt=1);let $t=ee(()=>{ae.read(()=>{if(W&&K.current){let o=a.length-1,y=i?K.current.offsetWidth:K.current.offsetHeight,m=l[0].current?i?l[0].current.offsetLeft:l[0].current.offsetTop:0,j=(l[o].current?i?l[o].current.offsetLeft+l[o].current.offsetWidth:l[o].current.offsetTop+l[o].current.offsetHeight:0)-m+u,at=l[0].current?i?l[0].current.offsetWidth:l[0].current.offsetHeight:0,St=l[0].current?l[0].current.offsetWidth:0,vt=l[0].current?l[0].current.offsetHeight:0;Oe({parent:y,children:j,item:at,itemWidth:St,itemHeight:vt})}})},[W]);Ct(()=>{W&&$t()},[W,I]);let mt=st(!0);Q(()=>se(K.current,({contentSize:o})=>{!mt.current&&(o.width||o.height)&&($t(),zt(!0)),mt.current=!1}),[]),Q(()=>{if(z){let o=setTimeout(()=>zt(!1),500);return()=>clearTimeout(o)}},[z]);let L=a?.length,rt=C?0:r?.children,ht=r?.item+u,Ne=h*ht,[g,U]=O(h+L),[Te,Et]=O(!1),jt=de(),Gt=it?1:-1,$=re(rt),Xt=i?-h*(r?.itemWidth+u):-h*(r?.itemHeight+u),gt=()=>Gt*g*ht,yt=C?0:M($,o=>{let y=X(-rt,-rt*2,o);return isNaN(y)?0:y}),Be=X(0,L,g),ke=X(0,-L,g);Ct(()=>{r?.children!==null&&!mt.current&&z&&$.set(gt())},[r,rt,Gt,Ne,g,ht,z]);let _t=()=>{C||!W||!r.parent||Te||($.get()!==gt()&&ne($,gt(),S),D&&Re&&(ft.current=setTimeout(()=>{U(g+1),_t()},k*1e3)))},E=o=>{U(it?g-o:g+o)},He=o=>{let y=X(0,L,g),m=X(0,-L,g),x=o-y,j=o-Math.abs(m);U(it?g-j:g+x)},Fe=()=>{Et(!0)},Ae=(o,{offset:y,velocity:m})=>{Et(!1);let x=i?y.x:y.y,j=200,at=i?m.x:m.y,St=x<-r.item/2,vt=x>r.item/2,Ke=Math.abs(x),lt=Math.round(Ke/r.item),Qt=lt===0?1:lt;at>j?E(-Qt):at<-j?E(Qt):(St&&E(lt),vt&&E(-lt))};Q(()=>{if(!(!jt||z))return _t(),()=>ft.current&&clearTimeout(ft.current)},[pt,jt,z]);let We=0,Yt=`calc(${100/I}% - ${u}px + ${u/I}px)`;for(let o=0;o<Lt;o++)pt.push(...Pt.map(a,(y,m)=>{let x;return m===0&&(x=l[0]),m===a.length-1&&(x=l[1]),s(eo,{ref:l[m],slideKey:o+m+"lg",index:o,width:i&&I>1?Yt:"100%",height:i?"100%":I>1?Yt:"100%",size:r,child:y,numChildren:a?.length,wrappedValue:yt,childCounter:We++,gap:u,isCanvas:C,isHorizontal:i,effectsOpacity:v,effectsScale:ut,effectsRotate:tt,children:o+m},o+m+"lg")}));let ze=i?"to right":"to bottom",Kt=P/2,Le=100-P/2,$e=to(Ot,0,Kt),Ee=100-Ot,wt=`linear-gradient(${ze}, rgba(0, 0, 0, ${Mt}) ${$e}%, rgba(0, 0, 0, 1) ${Kt}%, rgba(0, 0, 0, 1) ${Le}%, rgba(0, 0, 0, ${Mt}) ${Ee}%)`,bt=[],nt={};if(we){for(let o=0;o<a?.length;o++)bt.push(s(oo,{dotStyle:{...ro,width:Bt,height:Bt,backgroundColor:Pe},buttonStyle:It,selectedOpacity:xe,opacity:Ie,onClick:()=>He(o),wrappedIndex:Be,wrappedIndexInverted:ke,total:L,index:o,gap:ve,padding:Se,isHorizontal:i,isInverted:it},o));Ht>0&&(nt.backdropFilter=nt.WebkitBackdropFilter=nt.MozBackdropFilter=`blur(${Ht}px)`)}let je=N?{drag:i?"x":"y",onDragStart:Fe,onDragEnd:Ae,dragDirectionLock:!0,values:{x:$,y:$},dragMomentum:!1}:{},Ge=p==="top-left"||p==="top-mid"||p==="top-right",Xe=p==="bottom-left"||p==="bottom-mid"||p==="bottom-right",_e=p==="top-left"||p==="bottom-left",Ye=p==="top-right"||p==="bottom-right",Ut=p==="top-mid"||p==="bottom-mid"||p==="auto";return J("section",{style:{...ue,padding:Ve,WebkitMaskImage:F?wt:void 0,MozMaskImage:F?wt:void 0,maskImage:F?wt:void 0,opacity:r?.item!==null?1:0,userSelect:"none"},onMouseEnter:()=>{Ft(!0),et||At(!1)},onMouseLeave:()=>{Ft(!1),et||At(!0)},onMouseDown:o=>{o.preventDefault(),Wt(!0)},onMouseUp:()=>Wt(!1),children:[s("div",{style:{width:"100%",height:"100%",margin:0,padding:"inherit",position:"absolute",inset:0,overflow:ot?"visible":"hidden",borderRadius:Vt,userSelect:"none",perspective:C?"none":ct},children:s(G.ul,{ref:K,...je,style:{...ue,gap:u,placeItems:_,x:i?C?Xt:yt:0,y:i?0:C?Xt:yt,flexDirection:i?"row":"column",transformStyle:tt!==0&&!C?"preserve-3d":void 0,cursor:N?De?"grabbing":"grab":"auto",userSelect:"none",...dt},children:pt})}),J("fieldset",{style:{...qe},"aria-label":"Slideshow pagination controls",className:"framer--slideshow-controls",children:[J(G.div,{style:{position:"absolute",display:"flex",flexDirection:i?"row":"column",justifyContent:A?"space-between":"center",gap:A?"unset":pe,opacity:Tt?0:1,alignItems:"center",inset:Y,top:A?Y:Ge?me:"unset",left:A?Y:_e?ye:Ut?0:"unset",right:A?Y:Ye?he:Ut?0:"unset",bottom:A?Y:Xe?ge:"unset"},animate:Tt&&{opacity:Me?1:0},transition:S,children:[s(G.button,{type:"button",style:{...It,backgroundColor:Nt,width:V,height:V,borderRadius:Dt,rotate:i?0:90,display:Rt?"block":"none",pointerEvents:"auto"},onClick:()=>E(-1),"aria-label":"Previous",whileTap:{scale:.9},transition:{duration:.15},children:s("img",{width:V,height:V,src:ce||"https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg",alt:"Back Arrow"})}),s(G.button,{type:"button",style:{...It,backgroundColor:Nt,width:V,height:V,borderRadius:Dt,rotate:i?0:90,display:Rt?"block":"none",pointerEvents:"auto"},onClick:()=>E(1),"aria-label":"Next",whileTap:{scale:.9},transition:{duration:.15},children:s("img",{width:V,height:V,src:fe||"https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg",alt:"Next Arrow"})})]}),bt.length>1?s("div",{style:{...io,left:i?"50%":kt,top:i?"unset":"50%",transform:i?"translateX(-50%)":"translateY(-50%)",flexDirection:i?"row":"column",bottom:i?kt:"unset",borderRadius:be,backgroundColor:Ce,userSelect:"none",...nt},children:bt}):null]})]})}c.defaultProps={direction:"left",dragControl:!1,startFrom:0,itemAmount:1,infinity:!0,gap:10,padding:10,autoPlayControl:!0,effectsOptions:{effectsOpacity:1,effectsScale:1,effectsRotate:0,effectsPerspective:1200,effectsHover:!0},transitionControl:{type:"spring",stiffness:200,damping:40},fadeOptions:{fadeContent:!1,overflow:!1,fadeWidth:25,fadeAlpha:0,fadeInset:0},arrowOptions:{showMouseControls:!0,arrowShouldFadeIn:!1,arrowShouldSpace:!0,arrowFill:"rgba(0,0,0,0.2)",arrowSize:40},progressOptions:{showProgressDots:!0}};le(c,{slots:{type:e.Array,title:"Content",control:{type:e.ComponentInstance}},direction:{type:e.Enum,title:"Direction",options:["left","right","top","bottom"],optionIcons:["direction-left","direction-right","direction-up","direction-down"],optionTitles:["Left","Right","Top","Bottom"],displaySegmentedControl:!0,defaultValue:c.defaultProps.direction},autoPlayControl:{type:e.Boolean,title:"Auto Play",defaultValue:!0},intervalControl:{type:e.Number,title:"Interval",defaultValue:1.5,min:.5,max:10,step:.1,displayStepper:!0,unit:"s",hidden:t=>!t.autoPlayControl},dragControl:{type:e.Boolean,title:"Draggable",defaultValue:!1},startFrom:{type:e.Number,title:"Current",min:0,max:10,displayStepper:!0,defaultValue:c.defaultProps.startFrom},effectsOptions:{type:e.Object,title:"Effects",controls:{effectsOpacity:{type:e.Number,title:"Opacity",defaultValue:c.defaultProps.effectsOptions.effectsOpacity,min:0,max:1,step:.01,displayStepper:!0},effectsScale:{type:e.Number,title:"Scale",defaultValue:c.defaultProps.effectsOptions.effectsScale,min:0,max:1,step:.01,displayStepper:!0},effectsPerspective:{type:e.Number,title:"Perspective",defaultValue:c.defaultProps.effectsOptions.effectsPerspective,min:200,max:2e3,step:1},effectsRotate:{type:e.Number,title:"Rotate",defaultValue:c.defaultProps.effectsOptions.effectsRotate,min:-180,max:180,step:1},effectsHover:{type:e.Boolean,title:"On Hover",enabledTitle:"Play",disabledTitle:"Pause",defaultValue:c.defaultProps.effectsOptions.effectsHover}}},alignment:{type:e.Enum,title:"Align",options:["flex-start","center","flex-end"],optionIcons:{direction:{right:["align-top","align-middle","align-bottom"],left:["align-top","align-middle","align-bottom"],top:["align-left","align-center","align-right"],bottom:["align-left","align-center","align-right"]}},defaultValue:"center",displaySegmentedControl:!0},itemAmount:{type:e.Number,title:"Items",min:1,max:10,displayStepper:!0,defaultValue:c.defaultProps.itemAmount},gap:{type:e.Number,title:"Gap",min:0},padding:{title:"Padding",type:e.FusedNumber,toggleKey:"paddingPerSide",toggleTitles:["Padding","Padding per side"],defaultValue:0,valueKeys:["paddingTop","paddingRight","paddingBottom","paddingLeft"],valueLabels:["T","R","B","L"],min:0},borderRadius:{type:e.Number,title:"Radius",min:0,max:500,displayStepper:!0,defaultValue:0},transitionControl:{type:e.Transition,defaultValue:c.defaultProps.transitionControl,title:"Transition"},fadeOptions:{type:e.Object,title:"Clipping",controls:{fadeContent:{type:e.Boolean,title:"Fade",defaultValue:!1},overflow:{type:e.Boolean,title:"Overflow",enabledTitle:"Show",disabledTitle:"Hide",defaultValue:!1,hidden(t){return t.fadeContent===!0}},fadeWidth:{type:e.Number,title:"Width",defaultValue:25,min:0,max:100,unit:"%",hidden(t){return t.fadeContent===!1}},fadeInset:{type:e.Number,title:"Inset",defaultValue:0,min:0,max:100,unit:"%",hidden(t){return t.fadeContent===!1}},fadeAlpha:{type:e.Number,title:"Opacity",defaultValue:0,min:0,max:1,step:.05,hidden(t){return t.fadeContent===!1}}}},arrowOptions:{type:e.Object,title:"Arrows",controls:{showMouseControls:{type:e.Boolean,title:"Show",defaultValue:c.defaultProps.arrowOptions.showMouseControls},arrowFill:{type:e.Color,title:"Fill",hidden:t=>!t.showMouseControls,defaultValue:c.defaultProps.arrowOptions.arrowFill},leftArrow:{type:e.Image,title:"Previous",hidden:t=>!t.showMouseControls},rightArrow:{type:e.Image,title:"Next",hidden:t=>!t.showMouseControls},arrowSize:{type:e.Number,title:"Size",min:0,max:200,displayStepper:!0,defaultValue:c.defaultProps.arrowOptions.arrowSize,hidden:t=>!t.showMouseControls},arrowRadius:{type:e.Number,title:"Radius",min:0,max:500,defaultValue:40,hidden:t=>!t.showMouseControls},arrowShouldFadeIn:{type:e.Boolean,title:"Fade In",defaultValue:!1,hidden:t=>!t.showMouseControls},arrowShouldSpace:{type:e.Boolean,title:"Distance",enabledTitle:"Space",disabledTitle:"Group",defaultValue:c.defaultProps.arrowOptions.arrowShouldSpace,hidden:t=>!t.showMouseControls},arrowPosition:{type:e.Enum,title:"Position",options:["auto","top-left","top-mid","top-right","bottom-left","bottom-mid","bottom-right"],optionTitles:["Center","Top Left","Top Middle","Top Right","Bottom Left","Bottom Middle","Bottom Right"],hidden:t=>!t.showMouseControls||t.arrowShouldSpace},arrowPadding:{type:e.Number,title:"Inset",min:-100,max:100,defaultValue:20,displayStepper:!0,hidden:t=>!t.showMouseControls||!t.arrowShouldSpace},arrowPaddingTop:{type:e.Number,title:"Top",min:-500,max:500,defaultValue:0,displayStepper:!0,hidden:t=>!t.showMouseControls||t.arrowShouldSpace||t.arrowPosition==="auto"||t.arrowPosition==="bottom-mid"||t.arrowPosition==="bottom-left"||t.arrowPosition==="bottom-right"},arrowPaddingBottom:{type:e.Number,title:"Bottom",min:-500,max:500,defaultValue:0,displayStepper:!0,hidden:t=>!t.showMouseControls||t.arrowShouldSpace||t.arrowPosition==="auto"||t.arrowPosition==="top-mid"||t.arrowPosition==="top-left"||t.arrowPosition==="top-right"},arrowPaddingRight:{type:e.Number,title:"Right",min:-500,max:500,defaultValue:0,displayStepper:!0,hidden:t=>!t.showMouseControls||t.arrowShouldSpace||t.arrowPosition==="auto"||t.arrowPosition==="top-left"||t.arrowPosition==="top-mid"||t.arrowPosition==="bottom-left"||t.arrowPosition==="bottom-mid"},arrowPaddingLeft:{type:e.Number,title:"Left",min:-500,max:500,defaultValue:0,displayStepper:!0,hidden:t=>!t.showMouseControls||t.arrowShouldSpace||t.arrowPosition==="auto"||t.arrowPosition==="top-right"||t.arrowPosition==="top-mid"||t.arrowPosition==="bottom-right"||t.arrowPosition==="bottom-mid"},arrowGap:{type:e.Number,title:"Gap",min:0,max:100,defaultValue:10,displayStepper:!0,hidden:t=>!t.showMouseControls||t.arrowShouldSpace}}},progressOptions:{type:e.Object,title:"Dots",controls:{showProgressDots:{type:e.Boolean,title:"Show",defaultValue:!1},dotSize:{type:e.Number,title:"Size",min:1,max:100,defaultValue:10,displayStepper:!0,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsInset:{type:e.Number,title:"Inset",min:-100,max:100,defaultValue:10,displayStepper:!0,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsGap:{type:e.Number,title:"Gap",min:0,max:100,defaultValue:10,displayStepper:!0,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsPadding:{type:e.Number,title:"Padding",min:0,max:100,defaultValue:10,displayStepper:!0,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsFill:{type:e.Color,title:"Fill",defaultValue:"#fff",hidden:t=>!t.showProgressDots||t.showScrollbar},dotsBackground:{type:e.Color,title:"Backdrop",defaultValue:"rgba(0,0,0,0.2)",hidden:t=>!t.showProgressDots||t.showScrollbar},dotsRadius:{type:e.Number,title:"Radius",min:0,max:200,defaultValue:50,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsOpacity:{type:e.Number,title:"Opacity",min:0,max:1,defaultValue:.5,step:.1,displayStepper:!0,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsActiveOpacity:{type:e.Number,title:"Current",min:0,max:1,defaultValue:1,step:.1,displayStepper:!0,hidden:t=>!t.showProgressDots||t.showScrollbar},dotsBlur:{type:e.Number,title:"Blur",min:0,max:50,defaultValue:0,step:1,hidden:t=>!t.showProgressDots||t.showScrollbar}}}});var ue={display:"flex",flexDirection:"row",width:"100%",height:"100%",maxWidth:"100%",maxHeight:"100%",placeItems:"center",margin:0,padding:0,listStyleType:"none",textIndent:"none"},Ue={display:"flex",width:"100%",height:"100%",placeContent:"center",placeItems:"center",flexDirection:"column",color:"#96F",background:"rgba(136, 85, 255, 0.1)",fontSize:11,overflow:"hidden",padding:"20px 20px 30px 20px"},Qe={fontSize:32,marginBottom:10},Je={margin:0,marginBottom:10,fontWeight:600,textAlign:"center"},Ze={margin:0,opacity:.7,maxWidth:180,lineHeight:1.5,textAlign:"center"},It={border:"none",display:"flex",placeContent:"center",placeItems:"center",overflow:"hidden",background:"transparent",cursor:"pointer",margin:0,padding:0},qe={display:"flex",justifyContent:"space-between",alignItems:"center",position:"absolute",pointerEvents:"none",userSelect:"none",top:0,left:0,right:0,bottom:0,border:0,padding:0,margin:0},to=(t,a,h)=>Math.min(Math.max(t,a),h),eo=te(function(a,h){var d,R;let{slideKey:D,width:N,height:_,child:u,size:n,gap:b,wrappedValue:w,numChildren:Z,childCounter:T,isCanvas:f,effects:I,effectsOpacity:B,effectsScale:k,effectsRotate:S,isHorizontal:H,isLast:Vt,index:q}=a,dt=(n?.item+b)*T,v=[-n?.item,0,n?.parent-n?.item+b,n?.parent].map(P=>P-dt),ut=!f&&M(w,v,[-S,0,0,S]),tt=!f&&M(w,v,[S,0,0,-S]),ct=!f&&M(w,v,[B,1,1,B]),et=!f&&M(w,v,[k,1,1,k]),F=!f&&M(w,v,[1,1,0,0]),ot=!f&&M(w,P=>P>=v[1]&&P<=v[2]);return Q(()=>{if(ot)return ot.onChange(P=>{h.current.setAttribute("aria-hidden",!P)})},[]),s(ie,{inherit:"id",children:s("li",{style:{display:"contents"},"aria-hidden":q!==0,children:Zt(u,{ref:h,key:D+"child",style:{...(d=u.props)===null||d===void 0?void 0:d.style,flexShrink:0,userSelect:"none",width:N,height:_,opacity:ct,scale:et,originX:H?F:.5,originY:H?.5:F,rotateY:H?ut:0,rotateX:H?0:tt},layoutId:u.props.layoutId?u.props.layoutId+"-original-"+q:void 0},(R=u.props)===null||R===void 0?void 0:R.children)})})});function oo({selectedOpacity:t,opacity:a,total:h,index:d,wrappedIndex:R,wrappedIndexInverted:D,dotStyle:N,buttonStyle:_,gap:u,padding:n,isHorizontal:b,isInverted:w,...Z}){let T=R===d;w&&(T=Math.abs(D)===d);let f=u/2,I=!b&&d>0?f:n,B=!b&&d!==h-1?f:n,k=b&&d!==h-1?f:n,S=b&&d>0?f:n;return s("button",{"aria-label":`Scroll to page ${d+1}`,type:"button",...Z,style:{..._,padding:`${I}px ${k}px ${B}px ${S}px`},children:s(G.div,{style:{...N},initial:!1,animate:{opacity:T?t:a},transition:{duration:.3}})})}var io={display:"flex",placeContent:"center",placeItems:"center",overflow:"hidden",position:"absolute",pointerEvents:"auto"},ro={borderRadius:"50%",background:"white",cursor:"pointer",border:"none",placeContent:"center",placeItems:"center",padding:0};export{c as a};
//# sourceMappingURL=chunk-JUIZFQCN.mjs.map