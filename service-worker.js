"use strict";var precacheConfig=[["/wxjet/index.html","229025a4a1e41226f4b5419503aece67"],["/wxjet/static/css/main.6ab3f302.css","07a43ea003de8b07cf635f7bd98bd771"],["/wxjet/static/js/main.21414bcb.js","e6dca8dc13e4370002bc852543f022d9"],["/wxjet/static/media/chart-icon.3860aaab.svg","3860aaab80b6c75e25634d4b70fd151f"],["/wxjet/static/media/cloud1.c0f462cf.svg","c0f462cfe85dfa7cf328258dda9b4765"],["/wxjet/static/media/cloud2.98dc3763.svg","98dc3763f188ac9fbd0bfddc46a6b463"],["/wxjet/static/media/cloud3.99796563.svg","997965636a44fa5e2a77938a4e9c2ef1"],["/wxjet/static/media/cloud4.a86df461.svg","a86df461c40a8a27e214c7be0ed23c63"],["/wxjet/static/media/cloud5.b24b8e11.svg","b24b8e11111bbd3ed819235047282187"],["/wxjet/static/media/cloud6.d3d36be0.svg","d3d36be04115de84ba736e9b435101e4"],["/wxjet/static/media/cloud7.9c87e949.svg","9c87e949cd0ef64c730123459f4f24ac"],["/wxjet/static/media/cloud8.f8f23338.svg","f8f2333851a8cd39974378b8374e34e4"],["/wxjet/static/media/cloud9.6d7727bc.svg","6d7727bc7ed50919be67785d7a11469b"],["/wxjet/static/media/home-icon.212740fa.svg","212740fa7bca5505ec155dfe7ac17f6b"],["/wxjet/static/media/logo.1eefa41b.svg","1eefa41b4a5d1f790c35d116be64dd33"],["/wxjet/static/media/more-icon.f1bf33d5.svg","f1bf33d5a4400ab1ebbd7d562155bd46"],["/wxjet/static/media/profile-icon.4835c869.svg","4835c869c84fef5a347f2d86b2ad53d0"],["/wxjet/static/media/search-icon.222f4cc6.svg","222f4cc64554c13a2c71a2487b16092f"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/wxjet/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});