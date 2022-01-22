var e$1,n$1,t$1,r$1="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:global,o=e$1={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function c(e){if(n$1===setTimeout)return setTimeout(e,0);if((n$1===i||!n$1)&&setTimeout)return n$1=setTimeout,setTimeout(e,0);try{return n$1(e,0)}catch(t){try{return n$1.call(null,e,0)}catch(t){return n$1.call(this||r$1,e,0)}}}!function(){try{n$1="function"==typeof setTimeout?setTimeout:i;}catch(e){n$1=i;}try{t$1="function"==typeof clearTimeout?clearTimeout:u;}catch(e){t$1=u;}}();var s,l=[],a=!1,f=-1;function h(){a&&s&&(a=!1,s.length?l=s.concat(l):f=-1,l.length&&d());}function d(){if(!a){var e=c(h);a=!0;for(var n=l.length;n;){for(s=l,l=[];++f<n;)s&&s[f].run();f=-1,n=l.length;}s=null,a=!1,function(e){if(t$1===clearTimeout)return clearTimeout(e);if((t$1===u||!t$1)&&clearTimeout)return t$1=clearTimeout,clearTimeout(e);try{t$1(e);}catch(n){try{return t$1.call(null,e)}catch(n){return t$1.call(this||r$1,e)}}}(e);}}function m(e,n){(this||r$1).fun=e,(this||r$1).array=n;}function p(){}o.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];l.push(new m(e,n)),1!==l.length||a||c(d);},m.prototype.run=function(){(this||r$1).fun.apply(null,(this||r$1).array);},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=p,o.addListener=p,o.once=p,o.off=p,o.removeListener=p,o.removeAllListeners=p,o.emit=p,o.prependListener=p,o.prependOnceListener=p,o.listeners=function(e){return []},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return "/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0};var T=e$1;T.addListener;T.argv;T.binding;T.browser;T.chdir;T.cwd;T.emit;T.env;T.listeners;T.nextTick;T.off;T.on;T.once;T.prependListener;T.prependOnceListener;T.removeAllListeners;T.removeListener;T.title;T.umask;T.version;T.versions;

var e={},t=false;var n="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;function dew(){if(t)return e;t=true;var r=e={};var o;var i;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{o="function"===typeof setTimeout?setTimeout:defaultSetTimout;}catch(e){o=defaultSetTimout;}try{i="function"===typeof clearTimeout?clearTimeout:defaultClearTimeout;}catch(e){i=defaultClearTimeout;}})();function runTimeout(e){if(o===setTimeout)return setTimeout(e,0);if((o===defaultSetTimout||!o)&&setTimeout){o=setTimeout;return setTimeout(e,0)}try{return o(e,0)}catch(t){try{return o.call(null,e,0)}catch(t){return o.call(this||n,e,0)}}}function runClearTimeout(e){if(i===clearTimeout)return clearTimeout(e);if((i===defaultClearTimeout||!i)&&clearTimeout){i=clearTimeout;return clearTimeout(e)}try{return i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this||n,e)}}}var u=[];var a=false;var l;var c=-1;function cleanUpNextTick(){if(a&&l){a=false;l.length?u=l.concat(u):c=-1;u.length&&drainQueue();}}function drainQueue(){if(!a){var e=runTimeout(cleanUpNextTick);a=true;var t=u.length;while(t){l=u;u=[];while(++c<t)l&&l[c].run();c=-1;t=u.length;}l=null;a=false;runClearTimeout(e);}}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new Item(e,t));1!==u.length||a||runTimeout(drainQueue);};function Item(e,t){(this||n).fun=e;(this||n).array=t;}Item.prototype.run=function(){(this||n).fun.apply(null,(this||n).array);};r.title="browser";r.browser=true;r.env={};r.argv=[];r.version="";r.versions={};function noop(){}r.on=noop;r.addListener=noop;r.once=noop;r.off=noop;r.removeListener=noop;r.removeAllListeners=noop;r.emit=noop;r.prependListener=noop;r.prependOnceListener=noop;r.listeners=function(e){return []};r.binding=function(e){throw new Error("process.binding is not supported")};r.cwd=function(){return "/"};r.chdir=function(e){throw new Error("process.chdir is not supported")};r.umask=function(){return 0};return e}var r=dew();r.platform="browser";r.addListener;r.argv;r.binding;r.browser;r.chdir;r.cwd;r.emit;r.env;r.listeners;r.nextTick;r.off;r.on;r.once;r.prependListener;r.prependOnceListener;r.removeAllListeners;r.removeListener;r.title;r.umask;r.version;r.versions;

export { T, r };