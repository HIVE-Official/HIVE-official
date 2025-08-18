import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as d}from"./index-BMjrbHXN.js";import{H as t,c as l,B as r,a as f,b as w,d as ve}from"./button-CuCpvKae.js";import{I as F}from"./input-CXuKwzfo.js";import{L as z}from"./label-CGegogBt.js";import{B as j}from"./badge-CebFJquh.js";import{A as U,a as D,b as H}from"./avatar-DPA-6xOy.js";import{H as fe}from"./hive-progress-DZ1m0jQ4.js";import{c as we}from"./utils-CytzSlOG.js";import{A as Z,b as ee,a as se}from"./alert-PC6ua8Li.js";import{T as Ce,a as Se,b as C,c as S}from"./tabs-Dc_2Y3yi.js";import{L as ae}from"./loader-circle-C0fUCed1.js";import{W as k}from"./wifi-off-D7b6UPZc.js";import{S as re}from"./server-BKTlVePw.js";import{S as N}from"./search-kw2io5mN.js";import{M as te}from"./message-circle-CnQJGxxu.js";import{U as E}from"./users-B5XgMSov.js";import{T as le}from"./triangle-alert-Cs-Y0lD5.js";import{C as ie}from"./circle-check-big-fUBFJcwM.js";import{G as ce}from"./graduation-cap-CjRbfMsL.js";import{H as L}from"./house-Bg02DBcS.js";import{R as T}from"./refresh-cw-SbqVByDa.js";import{C as ne}from"./chevron-right-CIwutkFF.js";import{P as de}from"./plus-BTyRuzWD.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-DUdIJl-L.js";import"./button-enhanced-5mvuuZ4M.js";import"./input-enhanced-QtmCFtkG.js";import"./filter-props-D0Yg0xnz.js";import"./circle-alert-D27CINV1.js";import"./createLucideIcon-DtX30ipI.js";function i({className:a,...s}){return e.jsx("div",{className:we("animate-pulse rounded-md bg-hive-background-muted",a),...s})}i.__docgenInfo={description:"",methods:[],displayName:"Skeleton"};const os={title:"12-Live Frontend/Error & Loading States System",parameters:{layout:"fullscreen",docs:{description:{component:`# HIVE Error & Loading States System

Comprehensive error handling and loading state management for the HIVE platform.
Provides consistent, user-friendly feedback for all possible application states including network issues, server errors, and loading processes.

## Key Features:
- **Loading States**: Skeletons, spinners, and progress indicators for different content types
- **Error States**: Network errors, server errors, validation errors, and 404 pages
- **Empty States**: Content discovery, onboarding guidance, and action prompts
- **Offline States**: Campus WiFi issues, data saving, and sync status
- **Success States**: Confirmation messages and completion feedback
- **Campus Context**: UB-specific error messages and recovery suggestions
- **Mobile Optimization**: Touch-friendly error recovery and loading indicators`,story:"Complete error handling and loading state system for production-ready UX"}}}},ke=()=>{const[a,s]=d.useState("loading"),[c,b]=d.useState(0),[u,n]=d.useState(0),[be,ue]=d.useState(!0),P=(v=3e3)=>{s("loading"),n(0);const o=setInterval(()=>{n(A=>A>=100?(clearInterval(o),s("success"),100):A+100/(v/100))},100);return()=>clearInterval(o)};return{currentState:a,setCurrentState:s,retryAttempts:c,progress:u,isOnline:be,setIsOnline:ue,simulateLoading:P,simulateError:(v="network")=>{s(v),b(o=>o+1)},retry:()=>{P(2e3)}}},oe=()=>e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-6",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(i,{className:"w-16 h-16 rounded-full bg-gray-800"}),e.jsxs("div",{className:"space-y-2 flex-1",children:[e.jsx(i,{className:"h-5 w-32 bg-gray-800"}),e.jsx(i,{className:"h-4 w-24 bg-gray-800"}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(i,{className:"h-6 w-16 bg-gray-800"}),e.jsx(i,{className:"h-6 w-20 bg-gray-800"})]})]})]})})}),me=()=>e.jsx("div",{className:"space-y-4",children:Array.from({length:3}).map((a,s)=>e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-4",children:e.jsxs("div",{className:"flex items-start space-x-3",children:[e.jsx(i,{className:"w-10 h-10 rounded-full bg-gray-800"}),e.jsxs("div",{className:"space-y-2 flex-1",children:[e.jsx(i,{className:"h-4 w-24 bg-gray-800"}),e.jsx(i,{className:"h-4 w-full bg-gray-800"}),e.jsx(i,{className:"h-4 w-3/4 bg-gray-800"}),e.jsx(i,{className:"h-32 w-full bg-gray-800 rounded-lg"}),e.jsxs("div",{className:"flex space-x-4 pt-2",children:[e.jsx(i,{className:"h-8 w-16 bg-gray-800"}),e.jsx(i,{className:"h-8 w-16 bg-gray-800"}),e.jsx(i,{className:"h-8 w-16 bg-gray-800"})]})]})]})})},s))}),Ee=()=>e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:6}).map((a,s)=>e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(i,{className:"w-8 h-8 rounded bg-gray-800"}),e.jsx(i,{className:"h-5 w-24 bg-gray-800"})]}),e.jsx(i,{className:"h-4 w-full bg-gray-800"}),e.jsx(i,{className:"h-4 w-2/3 bg-gray-800"}),e.jsxs("div",{className:"flex justify-between items-center pt-2",children:[e.jsx(i,{className:"h-4 w-16 bg-gray-800"}),e.jsx(i,{className:"h-6 w-12 bg-gray-800 rounded-full"})]})]})})},s))}),y=({size:a="default",message:s})=>{const c={small:"w-4 h-4",default:"w-8 h-8",large:"w-12 h-12"};return e.jsxs("div",{className:"flex flex-col items-center justify-center space-y-3",children:[e.jsx(ae,{className:`${c[a]} animate-spin text-yellow-500`}),s&&e.jsx("p",{className:"text-gray-400 text-sm",children:s})]})},xe=({progress:a,message:s})=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(y,{size:"large"}),e.jsx("p",{className:"text-white font-medium mt-4",children:s})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(fe,{value:a,className:"w-full"}),e.jsxs("p",{className:"text-center text-gray-400 text-sm",children:[Math.round(a),"% complete"]})]})]}),ge=({onRetry:a,retryAttempts:s})=>e.jsxs("div",{className:"text-center space-y-6 p-8",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 border-2 border-red-800",children:e.jsx(k,{className:"w-8 h-8 text-red-400"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-xl font-bold text-white",children:"No Internet Connection"}),e.jsx("p",{className:"text-gray-400 max-w-md mx-auto",children:"Can't connect to HIVE. Check your WiFi connection or try switching to mobile data."}),s>0&&e.jsxs("p",{className:"text-gray-500 text-sm",children:["Retry attempts: ",s]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs(r,{onClick:a,className:"bg-yellow-500 hover:bg-yellow-600 text-black",children:[e.jsx(T,{className:"mr-2 h-4 w-4"}),"Try Again"]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-gray-500 text-sm",children:"UB Network Troubleshooting:"}),e.jsxs("div",{className:"text-gray-400 text-xs space-y-1",children:[e.jsx("p",{children:"• Connect to UB WiFi or eduroam"}),e.jsx("p",{children:"• Try moving closer to a WiFi access point"}),e.jsx("p",{children:"• Check if campus WiFi is experiencing issues"})]})]})]})]}),he=({onRetry:a})=>e.jsxs("div",{className:"text-center space-y-6 p-8",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-900/20 border-2 border-orange-800",children:e.jsx(re,{className:"w-8 h-8 text-orange-400"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-xl font-bold text-white",children:"Server Error"}),e.jsx("p",{className:"text-gray-400 max-w-md mx-auto",children:"Something went wrong on our end. We're working to fix this issue."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs(r,{onClick:a,variant:"outline",className:"border-gray-700 text-gray-300",children:[e.jsx(T,{className:"mr-2 h-4 w-4"}),"Refresh"]}),e.jsx("p",{className:"text-gray-500 text-sm",children:"If the problem persists, contact HIVE support"})]})]}),pe=()=>e.jsxs("div",{className:"text-center space-y-6 p-8",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700",children:e.jsx(N,{className:"w-8 h-8 text-gray-400"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-xl font-bold text-white",children:"Page Not Found"}),e.jsx("p",{className:"text-gray-400 max-w-md mx-auto",children:"The page you're looking for doesn't exist or has been moved."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs(r,{className:"bg-yellow-500 hover:bg-yellow-600 text-black",children:[e.jsx(L,{className:"mr-2 h-4 w-4"}),"Go Home"]}),e.jsxs(r,{variant:"outline",className:"border-gray-700 text-gray-300",children:[e.jsx(ne,{className:"mr-2 h-4 w-4"}),"Browse Spaces"]})]})]}),Le=({errors:a})=>e.jsxs(Z,{className:"border-red-800 bg-red-900/20",children:[e.jsx(le,{className:"h-4 w-4 text-red-400"}),e.jsx(ee,{className:"text-red-200",children:"Please fix the following errors:"}),e.jsx(se,{className:"text-red-300",children:e.jsx("ul",{className:"mt-2 space-y-1",children:a.map((s,c)=>e.jsxs("li",{className:"text-sm",children:["• ",s]},c))})})]}),je=()=>e.jsxs("div",{className:"text-center space-y-6 p-8",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800",children:e.jsx(te,{className:"w-8 h-8 text-gray-400"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-xl font-bold text-white",children:"Your feed is quiet"}),e.jsx("p",{className:"text-gray-400 max-w-md mx-auto",children:"Join some spaces or follow more students to see posts in your feed."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs(r,{className:"bg-yellow-500 hover:bg-yellow-600 text-black",children:[e.jsx(E,{className:"mr-2 h-4 w-4"}),"Explore Spaces"]}),e.jsxs(r,{variant:"outline",className:"border-gray-700 text-gray-300",children:[e.jsx(de,{className:"mr-2 h-4 w-4"}),"Create Post"]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 max-w-sm mx-auto text-left",children:[e.jsxs(t,{className:"bg-gray-800 border-gray-700 p-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(ce,{className:"h-5 w-5 text-yellow-500"}),e.jsx("span",{className:"text-white text-sm font-medium",children:"Academic Spaces"})]}),e.jsx("p",{className:"text-gray-400 text-xs mt-1",children:"Join spaces for your classes"})]}),e.jsxs(t,{className:"bg-gray-800 border-gray-700 p-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(L,{className:"h-5 w-5 text-blue-400"}),e.jsx("span",{className:"text-white text-sm font-medium",children:"Dorm Communities"})]}),e.jsx("p",{className:"text-gray-400 text-xs mt-1",children:"Connect with floor mates"})]})]})]}),ye=()=>e.jsxs("div",{className:"text-center space-y-6 p-8",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800",children:e.jsx(E,{className:"w-8 h-8 text-gray-400"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-xl font-bold text-white",children:"No spaces yet"}),e.jsx("p",{className:"text-gray-400 max-w-md mx-auto",children:"Spaces help you connect with classmates, dorm mates, and students with similar interests."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs(r,{className:"bg-yellow-500 hover:bg-yellow-600 text-black",children:[e.jsx(N,{className:"mr-2 h-4 w-4"}),"Find Spaces"]}),e.jsxs(r,{variant:"outline",className:"border-gray-700 text-gray-300",children:[e.jsx(de,{className:"mr-2 h-4 w-4"}),"Create Space"]})]}),e.jsxs("div",{className:"text-gray-500 text-sm space-y-1",children:[e.jsx("p",{children:"Popular UB spaces to join:"}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-2 mt-2",children:[e.jsx(j,{variant:"outline",className:"border-gray-700 text-gray-300",children:"CS Study Group"}),e.jsx(j,{variant:"outline",className:"border-gray-700 text-gray-300",children:"Ellicott Complex"}),e.jsx(j,{variant:"outline",className:"border-gray-700 text-gray-300",children:"UB Gaming"})]})]})]}),Te=({query:a})=>e.jsxs("div",{className:"text-center space-y-6 p-8",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800",children:e.jsx(N,{className:"w-8 h-8 text-gray-400"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"text-xl font-bold text-white",children:['No results for "',a,'"']}),e.jsx("p",{className:"text-gray-400 max-w-md mx-auto",children:"Try different keywords or browse popular spaces and students."})]}),e.jsx("div",{className:"space-y-3",children:e.jsxs(r,{variant:"outline",className:"border-gray-700 text-gray-300",children:[e.jsx(T,{className:"mr-2 h-4 w-4"}),"Clear Search"]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-gray-500 text-sm",children:"Suggestions:"}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-2",children:[e.jsx(r,{variant:"ghost",size:"sm",className:"text-gray-400 hover:text-white",children:"Computer Science"}),e.jsx(r,{variant:"ghost",size:"sm",className:"text-gray-400 hover:text-white",children:"Study Groups"}),e.jsx(r,{variant:"ghost",size:"sm",className:"text-gray-400 hover:text-white",children:"Dorm Activities"})]})]})]}),I=({title:a,message:s,action:c})=>e.jsxs(Z,{className:"border-green-800 bg-green-900/20",children:[e.jsx(ie,{className:"h-4 w-4 text-green-400"}),e.jsx(ee,{className:"text-green-200",children:a}),e.jsxs(se,{className:"text-green-300",children:[s,c&&e.jsxs(r,{variant:"ghost",size:"sm",className:"mt-2 text-green-300 hover:text-green-200 p-0",onClick:c,children:["View Details",e.jsx(ne,{className:"ml-1 h-3 w-3"})]})]})]}),Pe=()=>e.jsx("div",{className:"bg-gray-800 border border-gray-700 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(k,{className:"h-5 w-5 text-orange-400"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-white font-medium text-sm",children:"You're offline"}),e.jsx("p",{className:"text-gray-400 text-sm",children:"Some features may not work until you reconnect"})]}),e.jsx(j,{variant:"outline",className:"border-orange-700 text-orange-400",children:"Offline"})]})}),Ne=()=>{const a=ke(),{currentState:s,setCurrentState:c,progress:b,retryAttempts:u,retry:n}=a;return e.jsxs("div",{className:"min-h-screen bg-black",children:[e.jsx("div",{className:"bg-gray-900 border-b border-gray-800 p-4",children:e.jsx("div",{className:"max-w-4xl mx-auto",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("div",{className:"flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-black font-bold",children:"H"}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-white",children:"Error & Loading States"}),e.jsx("p",{className:"text-gray-400 text-sm",children:"Production-ready UX feedback system"})]})]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(r,{size:"sm",variant:"outline",className:"border-gray-700 text-gray-300",onClick:()=>c("online"),children:"Online"}),e.jsx(r,{size:"sm",variant:"outline",className:"border-gray-700 text-gray-300",onClick:()=>c("offline"),children:"Offline"})]})]})})}),e.jsxs("div",{className:"max-w-4xl mx-auto p-4",children:[e.jsxs(t,{className:"bg-gray-900 border-gray-800 mb-6",children:[e.jsxs(f,{children:[e.jsx(w,{className:"text-white",children:"State Controls"}),e.jsx(ve,{className:"text-gray-400",children:"Test different loading and error states"})]}),e.jsx(l,{children:e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[e.jsxs(r,{onClick:()=>a.simulateLoading(),className:"bg-blue-600 hover:bg-blue-700 text-white",children:[e.jsx(ae,{className:"mr-2 h-4 w-4"}),"Loading"]}),e.jsxs(r,{onClick:()=>a.simulateError("network"),className:"bg-red-600 hover:bg-red-700 text-white",children:[e.jsx(k,{className:"mr-2 h-4 w-4"}),"Network Error"]}),e.jsxs(r,{onClick:()=>a.simulateError("server"),className:"bg-orange-600 hover:bg-orange-700 text-white",children:[e.jsx(re,{className:"mr-2 h-4 w-4"}),"Server Error"]}),e.jsxs(r,{onClick:()=>c("404"),className:"bg-gray-600 hover:bg-gray-700 text-white",children:[e.jsx(N,{className:"mr-2 h-4 w-4"}),"404 Error"]}),e.jsxs(r,{onClick:()=>c("empty-feed"),className:"bg-purple-600 hover:bg-purple-700 text-white",children:[e.jsx(te,{className:"mr-2 h-4 w-4"}),"Empty Feed"]}),e.jsxs(r,{onClick:()=>c("empty-spaces"),className:"bg-indigo-600 hover:bg-indigo-700 text-white",children:[e.jsx(E,{className:"mr-2 h-4 w-4"}),"Empty Spaces"]}),e.jsxs(r,{onClick:()=>c("validation"),className:"bg-yellow-600 hover:bg-yellow-700 text-white",children:[e.jsx(le,{className:"mr-2 h-4 w-4"}),"Validation"]}),e.jsxs(r,{onClick:()=>c("success"),className:"bg-green-600 hover:bg-green-700 text-white",children:[e.jsx(ie,{className:"mr-2 h-4 w-4"}),"Success"]})]})})]}),s==="offline"&&e.jsx("div",{className:"mb-6",children:e.jsx(Pe,{})}),e.jsxs("div",{className:"space-y-6",children:[s==="loading"&&e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-8",children:e.jsx(xe,{progress:b,message:"Loading your feed..."})})}),s==="network"&&e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(ge,{onRetry:n,retryAttempts:u})})}),s==="server"&&e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(he,{onRetry:n})})}),s==="404"&&e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(pe,{})})}),s==="empty-feed"&&e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(je,{})})}),s==="empty-spaces"&&e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(ye,{})})}),s==="validation"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx(Le,{errors:["Email address is required","Password must be at least 8 characters","Please agree to the terms of service"]}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(z,{className:"text-white",children:"Email"}),e.jsx(F,{className:"bg-gray-800 border-red-700 text-white",placeholder:"your.name@buffalo.edu"})]}),e.jsxs("div",{children:[e.jsx(z,{className:"text-white",children:"Password"}),e.jsx(F,{type:"password",className:"bg-gray-800 border-red-700 text-white",placeholder:"Password"})]}),e.jsx(r,{className:"w-full bg-yellow-500 hover:bg-yellow-600 text-black",children:"Sign Up"})]})})})]}),s==="success"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx(I,{title:"Profile Updated!",message:"Your changes have been saved successfully."}),e.jsx(I,{title:"Space Created!",message:"CS 115 Study Group is now live. Students can start joining.",action:()=>{}})]}),s==="skeletons"&&e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-4",children:"Profile Loading"}),e.jsx(oe,{})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-4",children:"Feed Loading"}),e.jsx(me,{})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-4",children:"Spaces Loading"}),e.jsx(Ee,{})]})]}),(s==="success"||s==="online")&&e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs(t,{className:"bg-gray-900 border-gray-800",children:[e.jsx(f,{children:e.jsx(w,{className:"text-white",children:"Recent Activity"})}),e.jsx(l,{children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs(U,{className:"w-8 h-8",children:[e.jsx(D,{src:"/api/placeholder/32/32"}),e.jsx(H,{children:"MJ"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm",children:"Mike joined CS Study Group"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"2 minutes ago"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs(U,{className:"w-8 h-8",children:[e.jsx(D,{src:"/api/placeholder/32/32"}),e.jsx(H,{children:"SJ"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm",children:"Sarah posted in Ellicott Complex"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"5 minutes ago"})]})]})]})})]}),e.jsxs(t,{className:"bg-gray-900 border-gray-800",children:[e.jsx(f,{children:e.jsx(w,{className:"text-white",children:"Popular Spaces"})}),e.jsx(l,{children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-blue-600 rounded flex items-center justify-center",children:e.jsx(ce,{className:"w-4 h-4 text-white"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm font-medium",children:"CS 115 Study Group"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"124 members"})]})]}),e.jsx(r,{size:"sm",variant:"outline",className:"border-gray-700 text-gray-300",children:"Join"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-green-600 rounded flex items-center justify-center",children:e.jsx(L,{className:"w-4 h-4 text-white"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm font-medium",children:"Ellicott Complex"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"89 members"})]})]}),e.jsx(r,{size:"sm",variant:"outline",className:"border-gray-700 text-gray-300",children:"Join"})]})]})})]})]})]})]})]})},m={render:()=>e.jsx(Ne,{}),parameters:{docs:{description:{story:"Complete error handling and loading state system with network errors, server errors, empty states, and loading indicators"}}}},x={render:()=>{const[a,s]=d.useState("skeletons");return e.jsx("div",{className:"min-h-screen bg-black p-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto space-y-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Loading States"}),e.jsx("p",{className:"text-gray-400",children:"Different loading indicators for various content types"})]}),e.jsxs(Ce,{value:a,onValueChange:s,children:[e.jsxs(Se,{className:"grid grid-cols-3 w-full bg-gray-900",children:[e.jsx(C,{value:"skeletons",children:"Skeletons"}),e.jsx(C,{value:"spinners",children:"Spinners"}),e.jsx(C,{value:"progress",children:"Progress"})]}),e.jsxs(S,{value:"skeletons",className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-4",children:"Profile Loading"}),e.jsx(oe,{})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-4",children:"Feed Loading"}),e.jsx(me,{})]})]}),e.jsx(S,{value:"spinners",className:"space-y-6",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-6",children:e.jsx(y,{size:"small",message:"Loading..."})})}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-6",children:e.jsx(y,{size:"default",message:"Processing..."})})}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-6",children:e.jsx(y,{size:"large",message:"Uploading..."})})})]})}),e.jsx(S,{value:"progress",className:"space-y-6",children:e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{className:"p-8",children:e.jsx(xe,{progress:65,message:"Uploading tool data..."})})})})]})]})})},parameters:{docs:{description:{story:"Different loading state patterns including skeletons, spinners, and progress indicators"}}}},g={render:()=>e.jsx("div",{className:"min-h-screen bg-black p-4",children:e.jsxs("div",{className:"max-w-2xl mx-auto space-y-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Error States"}),e.jsx("p",{className:"text-gray-400",children:"User-friendly error handling with recovery actions"})]}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(ge,{onRetry:()=>{},retryAttempts:2})})}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(he,{onRetry:()=>{}})})}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(pe,{})})})]})}),parameters:{docs:{description:{story:"Error states including network errors, server errors, and 404 pages with UB-specific guidance"}}}},h={render:()=>e.jsx("div",{className:"min-h-screen bg-black p-4",children:e.jsxs("div",{className:"max-w-2xl mx-auto space-y-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Empty States"}),e.jsx("p",{className:"text-gray-400",children:"Onboarding and discovery for empty content areas"})]}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(je,{})})}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(ye,{})})}),e.jsx(t,{className:"bg-gray-900 border-gray-800",children:e.jsx(l,{children:e.jsx(Te,{query:"advanced calculus"})})})]})}),parameters:{docs:{description:{story:"Empty states that guide users toward content discovery and creation"}}}},p={render:()=>e.jsx(Ne,{}),parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Mobile-optimized error and loading states with touch-friendly recovery actions"}}}};var R,B,O;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <ErrorLoadingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete error handling and loading state system with network errors, server errors, empty states, and loading indicators'
      }
    }
  }
}`,...(O=(B=m.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var M,V,G;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const [activeDemo, setActiveDemo] = useState('skeletons');
    return <div className="min-h-screen bg-black p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Loading States</h1>
            <p className="text-gray-400">Different loading indicators for various content types</p>
          </div>
          
          <Tabs value={activeDemo} onValueChange={setActiveDemo}>
            <TabsList className="grid grid-cols-3 w-full bg-gray-900">
              <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
              <TabsTrigger value="spinners">Spinners</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skeletons" className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Profile Loading</h3>
                <ProfileSkeleton />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Feed Loading</h3>
                <FeedSkeleton />
              </div>
            </TabsContent>
            
            <TabsContent value="spinners" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner size="small" message="Loading..." />
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner size="default" message="Processing..." />
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner size="large" message="Uploading..." />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-8">
                  <ProgressLoader progress={65} message="Uploading tool data..." />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Different loading state patterns including skeletons, spinners, and progress indicators'
      }
    }
  }
}`,...(G=(V=x.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var W,J,_;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Error States</h1>
          <p className="text-gray-400">User-friendly error handling with recovery actions</p>
        </div>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <NetworkError onRetry={() => {}} retryAttempts={2} />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <ServerError onRetry={() => {}} />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <NotFoundError />
          </CardContent>
        </Card>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Error states including network errors, server errors, and 404 pages with UB-specific guidance'
      }
    }
  }
}`,...(_=(J=g.parameters)==null?void 0:J.docs)==null?void 0:_.source}}};var q,Y,X;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Empty States</h1>
          <p className="text-gray-400">Onboarding and discovery for empty content areas</p>
        </div>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <EmptyFeed />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <EmptySpaces />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <EmptySearch query="advanced calculus" />
          </CardContent>
        </Card>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Empty states that guide users toward content discovery and creation'
      }
    }
  }
}`,...(X=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:X.source}}};var K,$,Q;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <ErrorLoadingDemo />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized error and loading states with touch-friendly recovery actions'
      }
    }
  }
}`,...(Q=($=p.parameters)==null?void 0:$.docs)==null?void 0:Q.source}}};const ms=["CompleteErrorLoadingSystem","LoadingStates","ErrorStates","EmptyStates","MobileErrorStates"];export{m as CompleteErrorLoadingSystem,h as EmptyStates,g as ErrorStates,x as LoadingStates,p as MobileErrorStates,ms as __namedExportsOrder,os as default};
