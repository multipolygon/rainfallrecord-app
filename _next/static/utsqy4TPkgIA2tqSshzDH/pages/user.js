(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"8/g6":function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var a=o.default.memo(o.default.forwardRef((function(t,a){return o.default.createElement(r.default,(0,l.default)({ref:a},t),e)})));0;return a.muiName=r.default.muiName,a};var l=n(a("pVnL")),o=n(a("q1tI")),r=n(a("UJJ5"))},Dpg8:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a("q1tI")),o=(0,n(a("8/g6")).default)(l.default.createElement("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");t.default=o},L6Ll:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),o=a("nOHt"),r=a("r9w1"),i=a("ZiQX"),s=a("Dpg8"),c=a.n(s),d=a("Z3vd"),u=a("h7RS"),p=a("SMIj"),m=a("e5ou"),f=a("W+MB"),g=a("+KH9"),b=a("3hq0"),v=l.a.createElement,h=function(e){var t=e.newUser,a=Object(n.useContext)(f.a),o=a[0],r=a[1],i=Object(n.useState)(!1),s=i[0],c=i[1],u={username:{},email:{type:"email",helperText:"email is not required, not public and will never be used for spam - it may be used for password resets and very, very rare announcements"},password:{type:"password",label:"".concat(t?"":"Change"," Password"),helperText:!t&&"leave blank to keep current password"},password_confirmation:{type:"password",label:"Confirm Password"}};return v(l.a.Fragment,null,v(d.a,{variant:"outlined",size:"small",onClick:function(){return c(!0)}},t?"Sign Up":"Edit Details"),v(b.a,{open:s,setOpen:c,title:"Private User Details",fields:u,namespace:"user",method:t?"POST":"PATCH",url:"user.json",source:o,setSource:r,onSave:function(){r(null)}}))},y=l.a.createElement,O=function(){var e=Object(n.useContext)(f.a)[1],t=Object(n.useState)(!1),a=t[0],o=t[1];return y(l.a.Fragment,null,y(d.a,{variant:"outlined",size:"small",onClick:function(){return o(!0)}},"Log In"),y(b.a,{open:a,setOpen:o,title:"Log In",fields:{username:{},password:{type:"password"}},method:"POST",url:"login.json",onSave:function(){e(null)}}))},w=l.a.createElement,j=function(){var e=Object(n.useState)(!1),t=e[0],a=e[1];return w(l.a.Fragment,null,w(d.a,{variant:"outlined",size:"small",onClick:function(){return a(!0)}},"Reset by Email"),w(b.a,{open:t,setOpen:a,title:"Reset by Email",fields:{email:{type:"email",helperText:"an email will be sent to the address on your account"}},method:"POST",url:"password_resets.json"}))},x=a("ZFHq"),k=a("AesL"),C=l.a.createElement;t.default=function(){var e=Object(o.useRouter)(),t=Object(n.useContext)(f.a),a=t[0],s=t[1];return C(u.a,null,C(m.a,null,C(m.b,null,"User Options"),null===a&&C(m.c,null,"Loading..."),null!==a&&void 0===a.id&&C(l.a.Fragment,null,C(m.c,null,"New Users:"),C(m.a,null,C(h,{newUser:!0})," or ",C(k.a,{component:d.a,variant:"outlined",size:"small",href:"/location",as:"/location/?id=0"},"Try a Live Demo")),C(m.d,null,"Its free!"),C(m.c,null,"Existing Users:"),C(m.a,null,C(O,null)),C(m.c,null,"Forgot Username or Password?"),C(m.a,null,C(j,null))),null!==a&&void 0!==a.id&&C(l.a.Fragment,null,C(m.a,null,C(x.a,{url:"logout",onSuccess:function(){return s(null)}},"Log Out")," ",C(d.a,{variant:"outlined",size:"small",onClick:function(){return s(null)}},"Refresh")),C(m.c,null,"Private Details"),C(m.a,null,C(h,{newUser:!1})," "),C(m.d,null,"Username: ",a.username),C(m.d,null,"Email: ",a.email||"[none]"),!a.email_verified&&C(i.a,{severity:"warning",action:C(x.a,{url:"password_resets.json"},a.email_verified||a.email_sent?"Re":"","Send Verification Email")},"Please verify your email address."),C(m.c,null,"Location Records"),C(m.a,null,C(g.a,{onSave:function(t){var a=t.body;s(null),e.push("/location?id=".concat(a.id))}}),0===a.locations.length&&C(l.a.Fragment,null,C("br",null),C("br",null),C(i.a,{severity:"info",icon:C(c.a,{fontSize:"inherit"})},"Click the button above to start a new record location!"))),0!==a.locations.length&&C(l.a.Fragment,null,C("br",null),C(p.a,{locations:a.locations})),C("br",null),C("br",null),C("br",null),C("small",null,"API key:"),C("br",null),C(r.a,{value:a.api_key,size:"small"}))))}},SMIj:function(e,t,a){"use strict";var n=a("q1tI"),l=a.n(n),o=a("Ff2n"),r=a("wx14"),i=(a("17x9"),a("iuhU")),s=a("H2TA");var c=n.createContext(),d=n.forwardRef((function(e,t){var a=e.classes,l=e.className,s=e.component,d=void 0===s?"table":s,u=e.padding,p=void 0===u?"default":u,m=e.size,f=void 0===m?"medium":m,g=e.stickyHeader,b=void 0!==g&&g,v=Object(o.a)(e,["classes","className","component","padding","size","stickyHeader"]),h=n.useMemo((function(){return{padding:p,size:f,stickyHeader:b}}),[p,f,b]);return n.createElement(c.Provider,{value:h},n.createElement(d,Object(r.a)({ref:t,className:Object(i.a)(a.root,l,b&&a.stickyHeader)},v)))})),u=Object(s.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(r.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(d);var p=n.createContext(),m={variant:"body"},f=n.forwardRef((function(e,t){var a=e.classes,l=e.className,s=e.component,c=void 0===s?"tbody":s,d=Object(o.a)(e,["classes","className","component"]);return n.createElement(p.Provider,{value:m},n.createElement(c,Object(r.a)({className:Object(i.a)(a.root,l),ref:t},d)))})),g=Object(s.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(f),b=a("NqtD"),v=a("ye/S"),h=n.forwardRef((function(e,t){var a,l=e.align,s=void 0===l?"inherit":l,d=e.classes,u=e.className,m=e.component,f=e.padding,g=e.scope,v=e.size,h=e.sortDirection,y=e.variant,O=Object(o.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),w=n.useContext(c),j=n.useContext(p);a=m||(j&&"head"===j.variant?"th":"td");var x=g;!x&&j&&"head"===j.variant&&(x="col");var k=f||(w&&w.padding?w.padding:"default"),C=v||(w&&w.size?w.size:"medium"),R=y||j&&j.variant,N=null;return h&&(N="asc"===h?"ascending":"descending"),n.createElement(a,Object(r.a)({ref:t,className:Object(i.a)(d.root,d[R],u,"inherit"!==s&&d["align".concat(Object(b.a)(s))],"default"!==k&&d["padding".concat(Object(b.a)(k))],"medium"!==C&&d["size".concat(Object(b.a)(C))],"head"===R&&w&&w.stickyHeader&&d.stickyHeader),"aria-sort":N,scope:x},O))})),y=Object(s.a)((function(e){return{root:Object(r.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(v.e)(Object(v.c)(e.palette.divider,1),.88):Object(v.a)(Object(v.c)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0px 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(h),O=n.forwardRef((function(e,t){var a=e.classes,l=e.className,s=e.component,c=void 0===s?"div":s,d=Object(o.a)(e,["classes","className","component"]);return n.createElement(c,Object(r.a)({ref:t,className:Object(i.a)(a.root,l)},d))})),w=Object(s.a)({root:{width:"100%",overflowX:"auto"}},{name:"MuiTableContainer"})(O),j={variant:"head"},x=n.forwardRef((function(e,t){var a=e.classes,l=e.className,s=e.component,c=void 0===s?"thead":s,d=Object(o.a)(e,["classes","className","component"]);return n.createElement(p.Provider,{value:j},n.createElement(c,Object(r.a)({className:Object(i.a)(a.root,l),ref:t},d)))})),k=Object(s.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(x),C=n.forwardRef((function(e,t){var a=e.classes,l=e.className,s=e.component,c=void 0===s?"tr":s,d=e.hover,u=void 0!==d&&d,m=e.selected,f=void 0!==m&&m,g=Object(o.a)(e,["classes","className","component","hover","selected"]),b=n.useContext(p);return n.createElement(c,Object(r.a)({ref:t,className:Object(i.a)(a.root,l,b&&{head:a.head,footer:a.footer}[b.variant],u&&a.hover,f&&a.selected)},g))})),R=Object(s.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(v.c)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(C),N=a("kKAo"),E=a("YFqc"),T=a.n(E),S=a("AesL"),_=l.a.createElement;t.a=function(e){var t=e.locations;return _(w,{component:N.a,size:"small",style:{backgroundColor:"transparent"}},_(u,null,_(k,null,_(R,null,_(y,null,"Title"),_(y,null,"Location"),_(y,{align:"right"},"7 Days"),_(y,{align:"right"},"30 Days"))),_(g,null,t.map((function(e){return _(T.a,{key:e.id,href:"/location",as:"/location/?id=".concat(e.id)},_(R,{style:{cursor:"pointer"}},_(y,{component:"th",scope:"row"},_(S.a,{href:"/location",as:"/location/?id=".concat(e.id),style:{fontWeight:"bold"}},e.title)),_(y,null,e.location),_(y,{align:"right"},e.total_7_days),_(y,{align:"right"},e.total_30_days)))})))))}},UJJ5:function(e,t,a){"use strict";a.r(t);var n=a("HR5l");a.d(t,"default",(function(){return n.a}))},lgRd:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user",function(){return a("L6Ll")}])},pVnL:function(e,t){function a(){return e.exports=a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},a.apply(this,arguments)}e.exports=a}},[["lgRd",0,2,1,3,4,5,6]]]);