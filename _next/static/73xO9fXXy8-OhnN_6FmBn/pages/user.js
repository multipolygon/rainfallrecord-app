(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{Dpg8:function(e,n,a){"use strict";var t=a("TqRt");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=t(a("q1tI")),o=(0,t(a("8/g6")).default)(l.default.createElement("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");n.default=o},L6Ll:function(e,n,a){"use strict";a.r(n);var t=a("q1tI"),l=a.n(t),o=a("Z3vd"),r=a("h7RS"),s=a("e5ou"),u=a("W+MB"),i=a("3hq0"),c=l.a.createElement;function d(e){var n=e.newUser,a=Object(t.useContext)(u.a),r=a[0],s=a[1],d=Object(t.useState)(!1),p=d[0],m=d[1],f={username:{inputProps:{autocomplete:"username",autocorrect:"off",autocapitalize:"none"}},email:{type:"email",inputProps:{autocomplete:"email",autocorrect:"off",autocapitalize:"none"},helperText:"email is not required, not public and will never be used for spam - it may be used for password resets and very, very rare announcements"},password:{type:"password",inputProps:{autocomplete:"new-password",autocorrect:"off",autocapitalize:"none"},label:"".concat(n?"":"Change"," Password"),helperText:n?"please use a random password generated by your browser or password manager":"leave blank to keep current password"},password_confirmation:{type:"password",inputProps:{autocomplete:"new-password",autocorrect:"off",autocapitalize:"none"},label:"Confirm Password"}};return c(l.a.Fragment,null,c(o.a,{variant:"outlined",size:"small",onClick:function(){return m(!0)}},n?"Sign Up":"Edit Details"),c(i.a,{open:p,setOpen:m,title:n?"Sign Up":"Edit Details",description:"These private user details are never visible on the site or shared elsewhere.",fields:f,namespace:"user",method:n?"POST":"PATCH",url:"user.json",source:r,setSource:s,onSave:function(){s(null)}}))}var p=a("AesL"),m=l.a.createElement;function f(){var e=Object(t.useContext)(u.a)[1],n=Object(t.useState)(!1),a=n[0],r=n[1];return m(l.a.Fragment,null,m(o.a,{variant:"outlined",size:"small",onClick:function(){return r(!0)}},"Log In"),m(i.a,{open:a,setOpen:r,title:"Log In",fields:{username:{inputProps:{autocomplete:"username",autocorrect:"off",autocapitalize:"none"}},password:{type:"password",inputProps:{autocomplete:"current-password",autocorrect:"off",autocapitalize:"none"}}},method:"POST",url:"login.json",onSave:function(){e(null)}}))}var v=l.a.createElement;function w(){var e=Object(t.useState)(!1),n=e[0],a=e[1];return v(l.a.Fragment,null,v(o.a,{variant:"outlined",size:"small",onClick:function(){return a(!0)}},"Reset by Email"),v(i.a,{open:n,setOpen:a,title:"Reset by Email",fields:{email:{type:"email",helperText:"an email will be sent to the address on your account"}},method:"POST",url:"password_resets.json"}))}var g=l.a.createElement;function h(){return g(l.a.Fragment,null,g(s.b,null,"Welcome!"),g(s.c,null,"New Users:"),g(s.a,null,g(d,{newUser:!0})," or ",g(p.a,{component:o.a,variant:"outlined",size:"small",href:"/location",as:"/location?id=0"},"Try a Live Demo")),g(s.d,null,"Its free!"),g(s.c,null,"Existing Users:"),g(s.a,null,g(f,null)),g(s.c,null,"Forgot Username or Password?"),g(s.a,null,g(w,null)))}var b=a("ZiQX"),y=a("Dpg8"),P=a.n(y),S=a("nOHt"),_=a("SMIj"),O=a("+KH9"),T=a("p6x/"),E=a("ZFHq"),j=l.a.createElement;function z(e){var n=e.user,a=e.setUser,t=Object(S.useRouter)();return j(l.a.Fragment,null,j(s.b,null,"Hi ",n.username),j(s.a,null,j(E.a,{url:"logout.json",onSuccess:function(){return a(null)}},"Log Out")," ",j(o.a,{variant:"outlined",size:"small",onClick:function(){return a(null)}},"Refresh")),j(s.c,null,"Private Details"),j(s.a,null,j(d,{newUser:!1})," "),j(s.d,null,"Username: ",n.username),j(s.d,null,"Email: ",n.email||"[none]"),!n.email_verified&&j(b.a,{severity:"warning",action:j(E.a,{url:"password_resets.json"},n.email_verified||n.email_sent?"Re":"","Send Verification Email")},"Please verify your email address."),n.system_message&&n.system_message.length>0&&j(b.a,{severity:"info",action:j(E.a,{url:"user.json",method:"PATCH",body:{user:{system_message:""}},onSuccess:function(){return a(null)}},"Ok")},n.system_message),j(s.c,null,"Location Records"),j(s.a,null,j(O.a,{onSave:function(e){var n=e.body;a(null),t.push("/location?id=".concat(n.id))}}),0===n.locations.length&&j(l.a.Fragment,null,j("br",null),j("br",null),j(b.a,{severity:"info",icon:j(P.a,{fontSize:"inherit"})},"Click the button above to start a new record location!"))),0!==n.locations.length&&j(l.a.Fragment,null,j("br",null),j(_.a,{locations:n.locations,showTitle:!0})),j(s.c,null,"Feedback"),j(T.a,null),j(s.c,null,"API Key"),j("div",{style:{overflowX:"auto",fontSize:"12px"}},j("code",null,n.api_key)))}var k=l.a.createElement;n.default=function(){var e=Object(t.useContext)(u.a),n=e[0],a=e[1];return k(r.a,null,k(s.a,null,null===n&&k(s.b,null,"Loading..."),!1===n&&k(l.a.Fragment,null,k(s.b,null,"Temporarily Unavailable"),k(s.d,null,"There was an error when connecting to the server."),k(s.d,null,"This may happen occasionally as the server is hosted on free resources."),k(s.d,null,"Please try again soon!"),k(o.a,{variant:"outlined",size:"small",onClick:function(){return a(null)}},"Refresh")),n&&void 0===n.id&&k(h,null),n&&void 0!==n.id&&k(z,{user:n,setUser:a})))}},lgRd:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user",function(){return a("L6Ll")}])}},[["lgRd",0,2,1,3,4,5,7,6]]]);