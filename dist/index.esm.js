import{useRef as t,useState as e,useEffect as r,useCallback as n,useMemo as o}from"react";import*as i from"d3";import{jsx as a}from"react/jsx-runtime";function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function u(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=y(t))||e){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}function s(t,e,r){return(e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e);if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:e+""}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){s(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,s=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){s=!0,o=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return c}}(t,e)||y(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||y(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){if(t){if("string"==typeof t)return c(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(t,e):void 0}}var m={WIDTH:1e3,HEIGHT:150,DIFFICULTY_HEIGHT:100,MARGIN:{TOP:10,RIGHT:30,BOTTOM:30,LEFT:50}},v={BACKGROUND_COLOR:"#222",BORDER:"1px solid #ddd",BORDER_RADIUS:"4px",PADDING:"10px",FONT_SIZE:"12px",BOX_SHADOW:"0 2px 4px rgba(0,0,0,0.1)"},h={HEIGHT_DIVISOR:4,HEIGHT_INTERVALS:[0,.25,.5,.75,1]},b={TOP:-10,LEFT:10},g={IGNORE:"silencePolicyIgnore",DISTRIBUTE:"silencePolicyDistribute",STACK_FROM_START:"silencePolicyStackFromStart"};function O(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var T,x={exports:{}},S={exports:{}},w={};var E,R,I,P,j,M,A,$,_,D,C,N,k,F,V,H={};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function L(){return R||(R=1,"production"===process.env.NODE_ENV?S.exports=function(){if(T)return w;T=1;var t="function"==typeof Symbol&&Symbol.for,e=t?Symbol.for("react.element"):60103,r=t?Symbol.for("react.portal"):60106,n=t?Symbol.for("react.fragment"):60107,o=t?Symbol.for("react.strict_mode"):60108,i=t?Symbol.for("react.profiler"):60114,a=t?Symbol.for("react.provider"):60109,c=t?Symbol.for("react.context"):60110,u=t?Symbol.for("react.async_mode"):60111,s=t?Symbol.for("react.concurrent_mode"):60111,f=t?Symbol.for("react.forward_ref"):60112,l=t?Symbol.for("react.suspense"):60113,p=t?Symbol.for("react.suspense_list"):60120,d=t?Symbol.for("react.memo"):60115,y=t?Symbol.for("react.lazy"):60116,m=t?Symbol.for("react.block"):60121,v=t?Symbol.for("react.fundamental"):60117,h=t?Symbol.for("react.responder"):60118,b=t?Symbol.for("react.scope"):60119;function g(t){if("object"==typeof t&&null!==t){var p=t.$$typeof;switch(p){case e:switch(t=t.type){case u:case s:case n:case i:case o:case l:return t;default:switch(t=t&&t.$$typeof){case c:case f:case y:case d:case a:return t;default:return p}}case r:return p}}}function O(t){return g(t)===s}return w.AsyncMode=u,w.ConcurrentMode=s,w.ContextConsumer=c,w.ContextProvider=a,w.Element=e,w.ForwardRef=f,w.Fragment=n,w.Lazy=y,w.Memo=d,w.Portal=r,w.Profiler=i,w.StrictMode=o,w.Suspense=l,w.isAsyncMode=function(t){return O(t)||g(t)===u},w.isConcurrentMode=O,w.isContextConsumer=function(t){return g(t)===c},w.isContextProvider=function(t){return g(t)===a},w.isElement=function(t){return"object"==typeof t&&null!==t&&t.$$typeof===e},w.isForwardRef=function(t){return g(t)===f},w.isFragment=function(t){return g(t)===n},w.isLazy=function(t){return g(t)===y},w.isMemo=function(t){return g(t)===d},w.isPortal=function(t){return g(t)===r},w.isProfiler=function(t){return g(t)===i},w.isStrictMode=function(t){return g(t)===o},w.isSuspense=function(t){return g(t)===l},w.isValidElementType=function(t){return"string"==typeof t||"function"==typeof t||t===n||t===s||t===i||t===o||t===l||t===p||"object"==typeof t&&null!==t&&(t.$$typeof===y||t.$$typeof===d||t.$$typeof===a||t.$$typeof===c||t.$$typeof===f||t.$$typeof===v||t.$$typeof===h||t.$$typeof===b||t.$$typeof===m)},w.typeOf=g,w}():S.exports=(E||(E=1,"production"!==process.env.NODE_ENV&&function(){var t="function"==typeof Symbol&&Symbol.for,e=t?Symbol.for("react.element"):60103,r=t?Symbol.for("react.portal"):60106,n=t?Symbol.for("react.fragment"):60107,o=t?Symbol.for("react.strict_mode"):60108,i=t?Symbol.for("react.profiler"):60114,a=t?Symbol.for("react.provider"):60109,c=t?Symbol.for("react.context"):60110,u=t?Symbol.for("react.async_mode"):60111,s=t?Symbol.for("react.concurrent_mode"):60111,f=t?Symbol.for("react.forward_ref"):60112,l=t?Symbol.for("react.suspense"):60113,p=t?Symbol.for("react.suspense_list"):60120,d=t?Symbol.for("react.memo"):60115,y=t?Symbol.for("react.lazy"):60116,m=t?Symbol.for("react.block"):60121,v=t?Symbol.for("react.fundamental"):60117,h=t?Symbol.for("react.responder"):60118,b=t?Symbol.for("react.scope"):60119;function g(t){if("object"==typeof t&&null!==t){var p=t.$$typeof;switch(p){case e:var m=t.type;switch(m){case u:case s:case n:case i:case o:case l:return m;default:var v=m&&m.$$typeof;switch(v){case c:case f:case y:case d:case a:return v;default:return p}}case r:return p}}}var O=u,T=s,x=c,S=a,w=e,E=f,R=n,I=y,P=d,j=r,M=i,A=o,$=l,_=!1;function D(t){return g(t)===s}H.AsyncMode=O,H.ConcurrentMode=T,H.ContextConsumer=x,H.ContextProvider=S,H.Element=w,H.ForwardRef=E,H.Fragment=R,H.Lazy=I,H.Memo=P,H.Portal=j,H.Profiler=M,H.StrictMode=A,H.Suspense=$,H.isAsyncMode=function(t){return _||(_=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),D(t)||g(t)===u},H.isConcurrentMode=D,H.isContextConsumer=function(t){return g(t)===c},H.isContextProvider=function(t){return g(t)===a},H.isElement=function(t){return"object"==typeof t&&null!==t&&t.$$typeof===e},H.isForwardRef=function(t){return g(t)===f},H.isFragment=function(t){return g(t)===n},H.isLazy=function(t){return g(t)===y},H.isMemo=function(t){return g(t)===d},H.isPortal=function(t){return g(t)===r},H.isProfiler=function(t){return g(t)===i},H.isStrictMode=function(t){return g(t)===o},H.isSuspense=function(t){return g(t)===l},H.isValidElementType=function(t){return"string"==typeof t||"function"==typeof t||t===n||t===s||t===i||t===o||t===l||t===p||"object"==typeof t&&null!==t&&(t.$$typeof===y||t.$$typeof===d||t.$$typeof===a||t.$$typeof===c||t.$$typeof===f||t.$$typeof===v||t.$$typeof===h||t.$$typeof===b||t.$$typeof===m)},H.typeOf=g}()),H)),S.exports}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/function B(){if(P)return I;P=1;var t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;return I=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(t){n[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(n,o){for(var i,a,c=function(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(n),u=1;u<arguments.length;u++){for(var s in i=Object(arguments[u]))e.call(i,s)&&(c[s]=i[s]);if(t){a=t(i);for(var f=0;f<a.length;f++)r.call(i,a[f])&&(c[a[f]]=i[a[f]])}}return c},I}function G(){if(M)return j;M=1;return j="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}function q(){return $?A:($=1,A=Function.call.bind(Object.prototype.hasOwnProperty))}function U(){if(D)return _;D=1;var t=function(){};if("production"!==process.env.NODE_ENV){var e=G(),r={},n=q();t=function(t){var e="Warning: "+t;"undefined"!=typeof console&&console.error(e);try{throw new Error(e)}catch(t){}}}function o(o,i,a,c,u){if("production"!==process.env.NODE_ENV)for(var s in o)if(n(o,s)){var f;try{if("function"!=typeof o[s]){var l=Error((c||"React class")+": "+a+" type `"+s+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof o[s]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw l.name="Invariant Violation",l}f=o[s](i,s,c,a,null,e)}catch(t){f=t}if(!f||f instanceof Error||t((c||"React class")+": type specification of "+a+" `"+s+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in r)){r[f.message]=!0;var p=u?u():"";t("Failed "+a+" type: "+f.message+(null!=p?p:""))}}}return o.resetWarningCache=function(){"production"!==process.env.NODE_ENV&&(r={})},_=o}function z(){if(N)return C;N=1;var t=L(),e=B(),r=G(),n=q(),o=U(),i=function(){};function a(){return null}return"production"!==process.env.NODE_ENV&&(i=function(t){var e="Warning: "+t;"undefined"!=typeof console&&console.error(e);try{throw new Error(e)}catch(t){}}),C=function(c,u){var s="function"==typeof Symbol&&Symbol.iterator;var f="<<anonymous>>",l={array:m("array"),bigint:m("bigint"),bool:m("boolean"),func:m("function"),number:m("number"),object:m("object"),string:m("string"),symbol:m("symbol"),any:y(a),arrayOf:function(t){return y((function(e,n,o,i,a){if("function"!=typeof t)return new d("Property `"+a+"` of component `"+o+"` has invalid PropType notation inside arrayOf.");var c=e[n];if(!Array.isArray(c))return new d("Invalid "+i+" `"+a+"` of type `"+b(c)+"` supplied to `"+o+"`, expected an array.");for(var u=0;u<c.length;u++){var s=t(c,u,o,i,a+"["+u+"]",r);if(s instanceof Error)return s}return null}))},element:y((function(t,e,r,n,o){var i=t[e];return c(i)?null:new d("Invalid "+n+" `"+o+"` of type `"+b(i)+"` supplied to `"+r+"`, expected a single ReactElement.")})),elementType:y((function(e,r,n,o,i){var a=e[r];return t.isValidElementType(a)?null:new d("Invalid "+o+" `"+i+"` of type `"+b(a)+"` supplied to `"+n+"`, expected a single ReactElement type.")})),instanceOf:function(t){return y((function(e,r,n,o,i){if(!(e[r]instanceof t)){var a=t.name||f;return new d("Invalid "+o+" `"+i+"` of type `"+(((c=e[r]).constructor&&c.constructor.name?c.constructor.name:f)+"` supplied to `")+n+"`, expected instance of `"+a+"`.")}var c;return null}))},node:y((function(t,e,r,n,o){return h(t[e])?null:new d("Invalid "+n+" `"+o+"` supplied to `"+r+"`, expected a ReactNode.")})),objectOf:function(t){return y((function(e,o,i,a,c){if("function"!=typeof t)return new d("Property `"+c+"` of component `"+i+"` has invalid PropType notation inside objectOf.");var u=e[o],s=b(u);if("object"!==s)return new d("Invalid "+a+" `"+c+"` of type `"+s+"` supplied to `"+i+"`, expected an object.");for(var f in u)if(n(u,f)){var l=t(u,f,i,a,c+"."+f,r);if(l instanceof Error)return l}return null}))},oneOf:function(t){if(!Array.isArray(t))return"production"!==process.env.NODE_ENV&&i(arguments.length>1?"Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).":"Invalid argument supplied to oneOf, expected an array."),a;return y((function(e,r,n,o,i){for(var a=e[r],c=0;c<t.length;c++)if(p(a,t[c]))return null;var u=JSON.stringify(t,(function(t,e){return"symbol"===g(e)?String(e):e}));return new d("Invalid "+o+" `"+i+"` of value `"+String(a)+"` supplied to `"+n+"`, expected one of "+u+".")}))},oneOfType:function(t){if(!Array.isArray(t))return"production"!==process.env.NODE_ENV&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var e=0;e<t.length;e++){var o=t[e];if("function"!=typeof o)return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+O(o)+" at index "+e+"."),a}return y((function(e,o,i,a,c){for(var u=[],s=0;s<t.length;s++){var f=(0,t[s])(e,o,i,a,c,r);if(null==f)return null;f.data&&n(f.data,"expectedType")&&u.push(f.data.expectedType)}return new d("Invalid "+a+" `"+c+"` supplied to `"+i+"`"+(u.length>0?", expected one of type ["+u.join(", ")+"]":"")+".")}))},shape:function(t){return y((function(e,n,o,i,a){var c=e[n],u=b(c);if("object"!==u)return new d("Invalid "+i+" `"+a+"` of type `"+u+"` supplied to `"+o+"`, expected `object`.");for(var s in t){var f=t[s];if("function"!=typeof f)return v(o,i,a,s,g(f));var l=f(c,s,o,i,a+"."+s,r);if(l)return l}return null}))},exact:function(t){return y((function(o,i,a,c,u){var s=o[i],f=b(s);if("object"!==f)return new d("Invalid "+c+" `"+u+"` of type `"+f+"` supplied to `"+a+"`, expected `object`.");var l=e({},o[i],t);for(var p in l){var y=t[p];if(n(t,p)&&"function"!=typeof y)return v(a,c,u,p,g(y));if(!y)return new d("Invalid "+c+" `"+u+"` key `"+p+"` supplied to `"+a+"`.\nBad object: "+JSON.stringify(o[i],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(t),null,"  "));var m=y(s,p,a,c,u+"."+p,r);if(m)return m}return null}))}};function p(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}function d(t,e){this.message=t,this.data=e&&"object"==typeof e?e:{},this.stack=""}function y(t){if("production"!==process.env.NODE_ENV)var e={},n=0;function o(o,a,c,s,l,p,y){if(s=s||f,p=p||c,y!==r){if(u){var m=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw m.name="Invariant Violation",m}if("production"!==process.env.NODE_ENV&&"undefined"!=typeof console){var v=s+":"+c;!e[v]&&n<3&&(i("You are manually calling a React.PropTypes validation function for the `"+p+"` prop on `"+s+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),e[v]=!0,n++)}}return null==a[c]?o?null===a[c]?new d("The "+l+" `"+p+"` is marked as required in `"+s+"`, but its value is `null`."):new d("The "+l+" `"+p+"` is marked as required in `"+s+"`, but its value is `undefined`."):null:t(a,c,s,l,p)}var a=o.bind(null,!1);return a.isRequired=o.bind(null,!0),a}function m(t){return y((function(e,r,n,o,i,a){var c=e[r];return b(c)!==t?new d("Invalid "+o+" `"+i+"` of type `"+g(c)+"` supplied to `"+n+"`, expected `"+t+"`.",{expectedType:t}):null}))}function v(t,e,r,n,o){return new d((t||"React class")+": "+e+" type `"+r+"."+n+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+o+"`.")}function h(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(h);if(null===t||c(t))return!0;var e=function(t){var e=t&&(s&&t[s]||t["@@iterator"]);if("function"==typeof e)return e}(t);if(!e)return!1;var r,n=e.call(t);if(e!==t.entries){for(;!(r=n.next()).done;)if(!h(r.value))return!1}else for(;!(r=n.next()).done;){var o=r.value;if(o&&!h(o[1]))return!1}return!0;default:return!1}}function b(t){var e=typeof t;return Array.isArray(t)?"array":t instanceof RegExp?"object":function(t,e){return"symbol"===t||!!e&&("Symbol"===e["@@toStringTag"]||"function"==typeof Symbol&&e instanceof Symbol)}(e,t)?"symbol":e}function g(t){if(null==t)return""+t;var e=b(t);if("object"===e){if(t instanceof Date)return"date";if(t instanceof RegExp)return"regexp"}return e}function O(t){var e=g(t);switch(e){case"array":case"object":return"an "+e;case"boolean":case"date":case"regexp":return"a "+e;default:return e}}return d.prototype=Error.prototype,l.checkPropTypes=o,l.resetWarningCache=o.resetWarningCache,l.PropTypes=l,l},C}function W(){if(F)return k;F=1;var t=G();function e(){}function r(){}return r.resetWarningCache=e,k=function(){function n(e,r,n,o,i,a){if(a!==t){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function o(){return n}n.isRequired=n;var i={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:e};return i.PropTypes=i,i}}function Y(){if(V)return x.exports;if(V=1,"production"!==process.env.NODE_ENV){var t=L();x.exports=z()(t.isElement,true)}else x.exports=W()();return x.exports}var K=O(Y()),X=function(t,e){if("timecode"===e){var r=Math.floor(t/3600),n=Math.floor(t%3600/60),o=Math.floor(t%60);return"".concat(r.toString().padStart(2,"0"),":").concat(n.toString().padStart(2,"0"),":").concat(o.toString().padStart(2,"0"))}return t.toFixed(2)},J=function(t,e){var r=parseInt(t)/60,n=parseFloat(e);return isNaN(r)||isNaN(n)||0===r?null:parseFloat((n/r).toFixed(2))};function Z(o){var c=o.totalDuration,s=o.values,f=o.setValues,l=o.splineColor,d=void 0===l?"#888":l,y=o.controlPointColor,v=void 0===y?"#f00":y,h=o.controlPointRadius,b=void 0===h?5:h,g=o.editable,O=void 0===g||g,T=o.axisColor,x=void 0===T?"#90caf9":T,S=o.labelColor,w=void 0===S?"#90caf9":S,E=o.showTicks,R=void 0===E||E,I=o.timeUnit,P=void 0===I?"timecode":I,j=t(),M=t(),A=p(e({width:0,height:m.DIFFICULTY_HEIGHT}),2),$=A[0],_=A[1];r((function(){var t=new ResizeObserver((function(t){var e,r=u(t);try{for(r.s();!(e=r.n()).done;){var n=e.value.contentRect,o=n.width,i=n.height;_({width:o,height:i})}}catch(t){r.e(t)}finally{r.f()}}));return M.current&&t.observe(M.current),function(){return t.disconnect()}}),[]);var D=n((function(){var t=m.MARGIN,e=$.width-t.LEFT-t.RIGHT,r=$.height-t.TOP-t.BOTTOM,n=i.scaleLinear().domain([0,c]).range([0,e]),o=i.scaleLinear().domain([0,1]).range([r,0]),a=s.map((function(t,e){return{x:n(e*c/(s.length-1)),y:o(t),id:e}})),u=i.line().x((function(t){return t.x})).y((function(t){return t.y})).curve(i.curveMonotoneX),l=i.select(j.current);l.selectAll("*").remove();var p=l.append("g").attr("transform","translate(".concat(t.LEFT,",").concat(t.TOP,")"));p.append("text").attr("transform","translate(-".concat(t.LEFT-15,", ").concat(r/2+25,") rotate(-90)")).attr("fill",w).attr("font-size","12px").text("Difficulty"),p.append("text").attr("transform","translate(".concat(e/2,", ").concat(r+t.BOTTOM-10,")")).attr("text-anchor","middle").attr("fill",w).attr("font-size","12px"),p.append("g").attr("transform","translate(0,".concat(r,")")).call(i.axisBottom(n).tickFormat(R?function(t){return X(t,P)}:"")).attr("color",x),p.append("g").call(i.axisLeft(o).tickValues([0,.5,1])).attr("color",x),p.append("path").datum(a).attr("class","spline").attr("fill","none").attr("stroke",d).attr("stroke-width",2).attr("d",u),O&&p.selectAll("circle").data(a).join("circle").attr("cx",(function(t){return t.x})).attr("cy",(function(t){return t.y})).attr("r",b).attr("fill",v).call(i.drag().on("drag",(function(t,e){var r=Math.min(o(.2),Math.max(o(1),t.y));e.y=r,i.select(this).attr("cy",r),l.select(".spline").attr("d",u)})).on("end",(function(){var t=a.map((function(t){return o.invert(t.y)}));f(t)})))}),[c,s,f,$.width,$.height,P,b,v,d,O,x,w,R]);return r((function(){j.current&&D()}),[D]),a("div",{ref:M,style:{width:"100%",height:"100%"},children:a("svg",{ref:j,width:$.width,height:$.height,style:{display:"block"}})})}function Q(o){var c=o.songDistribution,s=o.totalDuration,f=o.axisColor,l=o.labelColor,y=o.timeUnit,g=void 0===y?"timecode":y,O=o.showTicks,T=void 0===O||O,x=t(),S=t(),w=p(e({width:0,height:m.HEIGHT}),2),E=w[0],R=w[1],I=Math.max.apply(Math,d(c.map((function(t){return t.pricePerMin}))));r((function(){var t=new ResizeObserver((function(t){var e,r=u(t);try{for(r.s();!(e=r.n()).done;){var n=e.value.contentRect,o=n.width,i=n.height;R({width:o,height:i})}}catch(t){r.e(t)}finally{r.f()}}));return S.current&&t.observe(S.current),function(){return t.disconnect()}}),[]);var P=n((function(){if(E.width&&E.height){var t=m.MARGIN,e=Math.max(0,E.width-t.LEFT-t.RIGHT),r=Math.max(0,E.height-t.TOP-t.BOTTOM);if(!(e<=0||r<=0)){var n=i.scaleLinear().domain([0,s]).range([0,e]),o=Math.ceil(I/h.HEIGHT_DIVISOR)*h.HEIGHT_DIVISOR,a=h.HEIGHT_INTERVALS.map((function(t){return o*t})),u=i.scaleLinear().domain([0,o]).range([r,0]),p=i.scaleLinear().domain([0,o]).range([0,r]),d=i.select(x.current);d.selectAll("*").remove();var y=d.append("g").attr("transform","translate(".concat(t.LEFT,",").concat(t.TOP,")"));y.append("text").attr("transform","translate(-".concat(t.LEFT-15,", ").concat(r/2+10,") rotate(-90)")).attr("fill",l).attr("font-size","12px").text("$/min"),y.append("text").attr("transform","translate(".concat(e/2-10,", ").concat(r+t.BOTTOM,")")).attr("fill",l).attr("font-size","12px"),y.append("g").attr("transform","translate(0,".concat(r,")")).call(i.axisBottom(n).tickFormat(T?function(t){return X(t,g)}:"")).attr("color",f),y.append("g").call(i.axisLeft(u).tickValues(a)).attr("color",f);var O=i.select("body").append("div").attr("class","tooltip").style("position","absolute").style("visibility","hidden").style("background-color",v.BACKGROUND_COLOR).style("border",v.BORDER).style("border-radius",v.BORDER_RADIUS).style("padding",v.PADDING).style("font-size",v.FONT_SIZE).style("box-shadow",v.BOX_SHADOW);y.selectAll("rect").data(c).enter().append("rect").attr("x",(function(t){return n(t.startTime)})).attr("width",(function(t){return n(t.duration)})).attr("y",(function(t){return u(t.pricePerMin)})).attr("height",(function(t){return p(t.pricePerMin)})).attr("fill",(function(t){return t.color})).on("mouseover",(function(t,e){O.style("visibility","visible").html("\n            <strong>".concat(e.title,"</strong><br/>\n            <hr/>\n            Artist: ").concat(e.artist,"<br/>\n            Duration: ").concat(X(e.duration,g),"<br/>\n            Price: $").concat(e.price.toFixed(2),"<br/>\n            Price/min: $").concat(e.pricePerMin.toFixed(2),"\n          "))})).on("mousemove",(function(t){O.style("top",t.pageY+b.TOP+"px").style("left",t.pageX+b.LEFT+"px")})).on("mouseout",(function(){O.style("visibility","hidden")}))}}}),[c,s,I,E.width,E.height,f,l,T,X,g]);return r((function(){x.current&&P()}),[P]),r((function(){return function(){i.select(".tooltip").remove()}}),[]),a("div",{ref:S,style:{width:"100%",height:"100%"},children:a("svg",{ref:x,width:E.width,height:E.height,style:{display:"block"}})})}function tt(t){if(void 0===t){var e=new Date;t="time-".concat(e.getTime(),"-").concat(e.getMilliseconds())}var r=p(function(t){for(var e,r=1779033703,n=3144134277,o=1013904242,i=2773480762,a=0;a<t.length;a++)e=t.charCodeAt(a),r=n^Math.imul(r^e,597399067),n=o^Math.imul(n^e,2869860233),o=i^Math.imul(o^e,951274213),i=r^Math.imul(i^e,2716044179);return r=Math.imul(o^r>>>18,597399067),[(r^=(n=Math.imul(i^n>>>22,2869860233))^(o=Math.imul(r^o>>>17,951274213))^(i=Math.imul(n^i>>>19,2716044179)))>>>0,(n^=r)>>>0,(o^=r)>>>0,(i^=r)>>>0]}(t),4),n=r[0];r[1],r[2],r[3];var o=function(t){return function(){var e=(t=2654435769+(t|=0)|0)^t>>>16;return e=Math.imul(e,569420461),e^=e>>>15,e=Math.imul(e,1935289751),((e^=e>>>15)>>>0)/4294967296}}(n);return{inRange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.min,r=void 0===e?0:e,n=t.max,i=void 0===n?1:n;return 0===r&&1===i?o():r+o()*(i-r)},intInRange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.min,r=void 0===e?0:e,n=t.max,o=void 0===n?100:n;return Math.floor(this.inRange({min:r,max:o+.999999}))},colorHex:function(){var t,e,r,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.minHue,i=void 0===o?0:o,a=n.maxHue,c=void 0===a?360:a,u=n.minValue,s=void 0===u?0:u,f=n.maxValue,l=void 0===f?1:f,p=n.minSaturation,d=void 0===p?0:p,y=n.maxSaturation,m=void 0===y?1:y,v=this.inRange({min:i,max:c}),h=this.inRange({min:d,max:m}),b=this.inRange({min:s,max:l}),g=b*h,O=g*(1-Math.abs(v/60%2-1)),T=b-g;v<60?(t=g,e=O,r=0):v<120?(t=O,e=g,r=0):v<180?(t=0,e=g,r=O):v<240?(t=0,e=O,r=g):v<300?(t=O,e=0,r=g):(t=g,e=0,r=O);var x=function(t){return Math.round(255*(t+T)).toString(16).padStart(2,"0")};return"#".concat(x(t)).concat(x(e)).concat(x(r))}}}Z.propTypes={totalDuration:K.number.isRequired,values:K.arrayOf(K.number).isRequired,setValues:K.func.isRequired,splineColor:K.string,controlPointColor:K.string,controlPointRadius:K.number,editable:K.bool,axisColor:K.string,labelColor:K.string,showTicks:K.bool,timeUnit:K.oneOf(["sec","timecode"])},Q.propTypes={songDistribution:K.arrayOf(K.shape({title:K.string.isRequired,artist:K.string.isRequired,duration:K.number.isRequired,price:K.number.isRequired,pricePerMin:K.number.isRequired,color:K.string.isRequired,startTime:K.number.isRequired})).isRequired,totalDuration:K.number.isRequired,axisColor:K.string,labelColor:K.string,timeUnit:K.oneOf(["sec","timecode"]),showTicks:K.bool},"undefined"!=typeof module&&void 0!==module.exports&&(module.exports={default:tt});var et=function(t,e,r,n){var o=t/(e.length-1),i=function(t){var r=Math.floor(t/o);if(r>=e.length-1)return e[e.length-1];if(r<0)return e[0];var n=e[r];return n+(e[r+1]-n)*((t-r*o)/o)},a=function(t,r){var n=r.filter((function(e){return e.end-e.start>=t.duration}));if(0===n.length)return null;var a={x:0,y:-1};return n.forEach((function(r){var n=function(t,r){var n=t.duration/2,a=r.start+n,c=r.end-n,u=Math.max(0,Math.floor(a/o)),s=Math.min(e.length-1,Math.ceil(c/o)),f=[{x:a,y:i(a)}].concat(d(Array.from({length:s-u+1},(function(t,r){var n=(u+r)*o;return n>=a&&n<=c?{x:n,y:e[u+r]}:null})).filter(Boolean)),[{x:c,y:i(c)}]);return f.reduce((function(t,e){return e.y>t.y?e:t}),f[0])}(t,r);n.y>a.y&&(a=n)})),-1===a.y?null:l(l({},t),{},{startTime:a.x-t.duration/2})},c=function(e){var n=e.reduce((function(t,e){return t+e.duration}),0),o=(t-n)/(e.length-1),i=0;switch(r){case g.DISTRIBUTE:return e.map((function(t){var e=i;return i+=t.duration+o,l(l({},t),{},{startTime:e})}));case g.STACK_FROM_START:return e.map((function(t){var e=i;return i+=t.duration,l(l({},t),{},{startTime:e})}));default:return e}};return{pack:function(r){var o=e.every((function(t,e,r){return t===r[0]})),i=[];if(o){var u=tt(n),s=d(r).sort((function(){return u.inRange()-.5}));return s.forEach((function(t,e){t.startTime=0===e?0:s[e-1].startTime+s[e-1].duration})),c(s)}var f=[{start:0,end:t}];return r.forEach((function(t){var e=a(t,f);e&&(i.push(e),f=function(t,e){var r=t.startTime,n=r+t.duration;return e.reduce((function(t,e){return n<=e.start||r>=e.end?(t.push(e),t):r===e.start&&n===e.end?t:r>e.start&&n<e.end?(t.push({start:e.start,end:r},{start:n,end:e.end}),t):r<=e.start&&n<e.end?(t.push({start:n,end:e.end}),t):r>e.start&&n>=e.end?(t.push({start:e.start,end:r}),t):t}),[])}(e,f))})),i.sort((function(t,e){return t.startTime-e.startTime})),c(i)}}},rt=function(t,e,r,n,i){return o((function(){if(null==t||!t.length||!e)return[];var o=t.map((function(t,e){return l(l({},t),{},{originalIndex:e})})).sort((function(t,e){return e.pricePerMin-t.pricePerMin}));return et(e,n,i,r).pack(o)}),[t,e,r,n,i])};export{m as CHART_DIMENSIONS,h as CHART_SCALE,Z as DifficultyChart,tt as RandomNumber,g as SILENCE_POLICIES,Q as SongDistributionChart,b as TOOLTIP_OFFSET,v as TOOLTIP_STYLES,J as calculatePricePerMin,X as formatTime,rt as useSongDistribution};
//# sourceMappingURL=index.esm.js.map
