(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{Dpg8:function(e,n,l){"use strict";var a=l("TqRt");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=a(l("q1tI")),r=(0,a(l("8/g6")).default)(t.default.createElement("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");n.default=r},L6Ll:function(e,n,l){"use strict";l.r(n);var a=l("q1tI"),t=l.n(a),r=l("Z3vd"),o=l("h7RS"),s=l("e5ou"),i=l("W+MB"),u=l("3hq0"),c=t.a.createElement,d=function(e){var n=e.newUser,l=Object(a.useContext)(i.a),o=l[0],s=l[1],d=Object(a.useState)(!1),m=d[0],p=d[1],f={username:{},email:{type:"email",helperText:"email is not required, not public and will never be used for spam - it may be used for password resets and very, very rare announcements"},password:{type:"password",label:"".concat(n?"":"Change"," Password"),helperText:!n&&"leave blank to keep current password"},password_confirmation:{type:"password",label:"Confirm Password"}};return c(t.a.Fragment,null,c(r.a,{variant:"outlined",size:"small",onClick:function(){return p(!0)}},n?"Sign Up":"Edit Details"),c(u.a,{open:m,setOpen:p,title:n?"Sign Up":"Edit Details",description:"These private user details are never visible on the site or shared elsewhere.",fields:f,namespace:"user",method:n?"POST":"PATCH",url:"user.json",source:o,setSource:s,onSave:function(){s(null)}}))},m=l("AesL"),p=t.a.createElement,f=function(){var e=Object(a.useContext)(i.a)[1],n=Object(a.useState)(!1),l=n[0],o=n[1];return p(t.a.Fragment,null,p(r.a,{variant:"outlined",size:"small",onClick:function(){return o(!0)}},"Log In"),p(u.a,{open:l,setOpen:o,title:"Log In",fields:{username:{},password:{type:"password"}},method:"POST",url:"login.json",onSave:function(){e(null)}}))},v=t.a.createElement,w=function(){var e=Object(a.useState)(!1),n=e[0],l=e[1];return v(t.a.Fragment,null,v(r.a,{variant:"outlined",size:"small",onClick:function(){return l(!0)}},"Reset by Email"),v(u.a,{open:n,setOpen:l,title:"Reset by Email",fields:{email:{type:"email",helperText:"an email will be sent to the address on your account"}},method:"POST",url:"password_resets.json"}))},b=t.a.createElement,h=function(){return b(t.a.Fragment,null,b(s.b,null,"Welcome!"),b(s.c,null,"New Users:"),b(s.a,null,b(d,{newUser:!0})," or ",b(m.a,{component:r.a,variant:"outlined",size:"small",href:"/location",as:"/location?id=0"},"Try a Live Demo")),b(s.d,null,"Its free!"),b(s.c,null,"Existing Users:"),b(s.a,null,b(f,null)),b(s.c,null,"Forgot Username or Password?"),b(s.a,null,b(w,null)))},g=l("ZiQX"),y=l("Dpg8"),S=l.n(y),E=l("nOHt"),O=l("SMIj"),T=l("+KH9"),_=l("p6x/"),j=l("ZFHq"),P=t.a.createElement,L=function(e){var n=e.user,l=e.setUser,a=Object(E.useRouter)();return P(t.a.Fragment,null,P(s.b,null,"Hi ",n.username),P(s.a,null,P(j.a,{url:"logout.json",onSuccess:function(){return l(null)}},"Log Out")," ",P(r.a,{variant:"outlined",size:"small",onClick:function(){return l(null)}},"Refresh")),P(s.c,null,"Private Details"),P(s.a,null,P(d,{newUser:!1})," "),P(s.d,null,"Username: ",n.username),P(s.d,null,"Email: ",n.email||"[none]"),!n.email_verified&&P(g.a,{severity:"warning",action:P(j.a,{url:"password_resets.json"},n.email_verified||n.email_sent?"Re":"","Send Verification Email")},"Please verify your email address."),P(s.c,null,"Location Records"),P(s.a,null,P(T.a,{onSave:function(e){var n=e.body;l(null),a.push("/location?id=".concat(n.id))}}),0===n.locations.length&&P(t.a.Fragment,null,P("br",null),P("br",null),P(g.a,{severity:"info",icon:P(S.a,{fontSize:"inherit"})},"Click the button above to start a new record location!"))),0!==n.locations.length&&P(t.a.Fragment,null,P("br",null),P(O.a,{locations:n.locations})),P(s.c,null,"Feedback"),P(_.a,null),P("br",null),P("br",null),P("br",null),P("div",{style:{overflowX:"auto"}},P("small",null,P(s.d,null,"API Key:"),P("code",null,n.api_key))))},U=t.a.createElement;n.default=function(){var e=Object(a.useContext)(i.a),n=e[0],l=e[1];return U(o.a,null,U(s.a,null,null===n&&U(s.b,null,"Loading..."),!1===n&&U(t.a.Fragment,null,U(s.b,null,"Temporarily Unavailable"),U(s.d,null,"There was an error when connecting to the server."),U(s.d,null,"This may happen occasionally as the server is hosted on free resources."),U(s.d,null,"Please try again soon!"),U(r.a,{variant:"outlined",size:"small",onClick:function(){return l(null)}},"Refresh")),n&&void 0===n.id&&U(h,null),n&&void 0!==n.id&&U(L,{user:n,setUser:l})))}},lgRd:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user",function(){return l("L6Ll")}])}},[["lgRd",0,2,1,3,4,5,6,7]]]);