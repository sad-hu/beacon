function Beacon(){this.initOption=$.extend({event:true,uv:true,pv:true},window.BEACON_INIT||{});this.initData();if(this.initOption.event){this.bindEvent()}if(this.initOption.uv){if(!this.cookie("_utrace")){this.cookie("_utrace",this.uuid(),{expires:1,domain:".daikuan.com"})}}if(this.initOption.pv){this.send("pv")}if(this.initOption.trigger){if(this[this.initOption.trigger.type]){this[this.initOption.trigger.type](this.initOption.trigger.msg)}}this.cache=[]}Beacon.prototype.version="0.2";Beacon.prototype.url=document.location.protocol+"//dt.daikuan.com/dt.gif";Beacon.prototype.errUrl=document.location.protocol+"//dt.daikuan.com/rd.gif";Beacon.prototype.initData=function(){this.data=$.extend({scr:this.GetScreenSize(),title:document.title,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),requrl:window.location.href,refurl:document.referrer||""},this.initOption.data||{})};Beacon.prototype.GetWindowsVersion=function(){var ua=navigator.userAgent.toLowerCase();var isWin81=ua.indexOf("nt 6.3")>-1;var isWin8=ua.indexOf("nt 6.2")>-1;var isWin7=ua.indexOf("nt 6.1")>-1;var isVista=ua.indexOf("nt 6.0")>-1;var isWin2003=ua.indexOf("nt 5.2")>-1;var isWinXp=ua.indexOf("nt 5.1")>-1;var isWin2000=ua.indexOf("nt 5.0")>-1;var isWindows=ua.indexOf("windows")!==-1||ua.indexOf("win32")!==-1;var isMac=ua.indexOf("macintosh")!==-1||ua.indexOf("mac os x")!==-1;var isAir=ua.indexOf("adobeair")!==-1;var isLinux=ua.indexOf("linux")!==-1;var sys="";if(isWin81){sys="Windows 8.1"}else if(isWin8){sys="Windows 8"}else if(isWin7){sys="Windows 7"}else if(isVista){sys="Windows Vista"}else if(isWinXp){sys="Windows XP"}else if(isWin2003){sys="Windows 2003"}else if(isWin2000){sys="Windows 2000"}else if(isWindows){sys="Windows"}else if(isMac){sys="Macintosh"}else if(isAir){sys="Adobeair"}else if(isLinux){sys="Linux"}else{sys="Unknow"}return sys};Beacon.prototype.GetScreenSize=function(){return screen.availWidth+"*"+screen.availHeight};Beacon.prototype.GetBrowserVersion=function(){var Sys={};var ua=navigator.userAgent.toLowerCase();var s;(s=ua.match(/rv:([\d.]+)\) like gecko/))?Sys.ie=s[1]:(s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:(s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:(s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:(s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;if(Sys.ie){return"IE: "+Sys.ie}else if(Sys.firefox){return"Firefox: "+Sys.firefox}else if(Sys.chrome){return"Chrome: "+Sys.chrome}else if(Sys.opera){return"Opera: "+Sys.opera}else if(Sys.safari){return"Safari: "+Sys.safari}else{return"Unknown"}};Beacon.prototype.formatParams=function(params){var s=[];for(var k in params){s.push(k+"="+encodeURIComponent(params[k]))}return s.join("&")};Beacon.prototype.bindEvent=function(){var that=this;$("body").on("click","*",function(){if(that.detectElement(this)){var element=$(this).closest("a")[0]||this;var tag=element.tagName.toLowerCase();var $element=$(element);var elementTrack=$element.attr("trackid")?"[trackid]"+$element.attr("trackid"):"";var elementClass=$element.attr("class")?"[class]"+$element.attr("class"):"";var elementTitle=$element.attr("title")?"[title]"+$element.attr("title"):"";var data={etype:"clk",etag:tag,eid:$element.attr("id")||"",etxt:elementTrack||$element.text().replace(/\s/g,"").substring(0,10)||elementTitle||elementClass||""};if(that.cache.indexOf(element)<0){that.send(data);that.setCache(element)}}})};Beacon.prototype.cookie=function(key,value,options){if(arguments.length>1&&String(value)!=="[object Object]"){options=options||{};if(value===null||value===undefined){options.expires=-1}if(typeof options.expires==="number"){var days=options.expires,t=options.expires=new Date;t.setDate(t.getDate()+days)}value=String(value);return document.cookie=[encodeURIComponent(key),"=",options.raw?value:encodeURIComponent(value),options.expires?";expires="+options.expires.toUTCString():"",options.path?";path="+options.path:";path=/",options.domain?";domain="+options.domain:"",options.secure?";secure":""].join("")}options=value||{};var result,decode=options.raw?function(s){return s}:decodeURIComponent;return(result=new RegExp("(?:^|; )"+encodeURIComponent(key)+"=([^;]*)").exec(document.cookie))?decode(result[1]):null};Beacon.prototype.send=function(params,msg){if(typeof params==="string"){params={etype:params}}else{params=params||{}}if(msg){params.msg=msg}(new Image).src=(params.type?this.errUrl:this.url)+"?"+this.formatParams($.extend({t:+new Date+Math.random()},this.data,params))};Beacon.prototype.detectElement=function(element){return!element.children.length&&!$(element).closest("a").length||element.tagName==="SELECT"||element.tagName==="A"};Beacon.prototype.uuid=function(){var uuid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==="x"?r:r&3|8;return v.toString(16)});if(!uuid){uuid=+new Date+"-"+Math.round(Math.random()*1e5)}return uuid};Beacon.prototype.setCache=function(element){var that=this;this.cache.push(element);setTimeout(function(){that.cache.splice(that.cache.indexOf(element),1)},3e3)};Beacon.prototype.info=function(msg){this.send({type:1},msg||"")};Beacon.prototype.error=function(msg){this.send({type:2},msg||"")};Beacon.prototype.debug=function(msg){this.send({type:3},msg||"")};window.beacon=window.bc=new Beacon;