var $R = [
	"Method %s in class %s threw exception [%s]",
	"Procedure %s threw exception [%s]",
	"Host classtype was rejected as unsuitable",
	"Invalid handle for operation, reference was null error",
	"Invalid stream style for operation, expected memorystream",
	"Method not implemented",
	"stream operation failed, system threw exception: %s",
	"write failed, system threw exception: %s",
	"read failed, system threw exception: %s",
	"operation failed, invalid handle error",
	"Invalid length, %s bytes exceeds storage boundaries error",
	"Write failed, invalid signature error [%s]",
	"Write failed, invalid datasize [%d] error",
	"Invalid length, %s bytes exceeds storage medium error",
	"Read failed, invalid signature error [%s]",
	"Handle reference is null error",
	"Failed to create html element",
	"Invalid html element handle error",
	"Invalid html element attributename error",
	"Invalid html element propertyname error",
	"Invalid html element stylename error",
	"Failed to attach html element to owner",
	"Owner element handle is null error",
	"class [%s] does not allow augmentation error",
	"invalid owner handle error",
	"Read failed, invalid offset [%d], expected %d..%d",
	"Write operation failed, target stream is nil error",
	"Read operation failed, source stream is nil error",
	"Failed to load script-file <%s> error",
	"Failed to load image.file <%s> error",
	"Failed to load CSS file <%s> error",
	"Failed to load binary file <%s> error",
	"Failed to load XML <%s> error",
	"Invalid component registration",
	"Failed to create attribute storage object, invalid handle error",
	"Failed to read element attribute, system threw exception: %s",
	"Failed to write element attribute, system threw exception: %s",
	"Failed to examine element attribute, system threw exception: %s",
	"Failed to delete element-attribute [%s], system threw exception: %s",
	"data-",
	"invalid owner handle error",
	"%s failed to initialize from graphics-context: %s ",
	"Invalid dictionary key",
	"Invalid array of dictionary keys",
	"'Invalid handle for object (%s), reference rejected error"];
function Trim$_String_Integer_Integer_(s,a,b) { if (a<0) a=0; if (b<0) b=0; return s.substr(a,s.length-a-b) }
function Trim$_String_(s) { return s.replace(/^\s\s*/, "").replace(/\s\s*$/, "") }
var TObject={
	$ClassName: "TObject",
	$Parent: null,
	ClassName: function (s) { return s.$ClassName },
	ClassType: function (s) { return s },
	ClassParent: function (s) { return s.$Parent },
	$Init: function (s) {},
	Create: function (s) { return s },
	Destroy: function (s) { for (var prop in s) if (s.hasOwnProperty(prop)) delete s[prop] },
	Destroy$: function(s) { return s.ClassType.Destroy(s) },
	Free: function (s) { if (s!==null) s.ClassType.Destroy(s) }
}
function StrReplace(s,o,n) { return o?s.replace(new RegExp(StrRegExp(o), "g"), n):s }
function StrRegExp(s) { return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") }
function StrEndsWith(s,e) { return s.substr(s.length-e.length)==e }
function SameText(a,b) { return a.toUpperCase()==b.toUpperCase() }
function RandomInt(i) { return Math.floor(Random()*i) }
/*

Copyright (C) 2010 by Johannes Baag�e <baagoe@baagoe.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

From http://baagoe.com/en/RandomMusings/javascript/
*/
function $alea() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = function() {
       var n = 0xefc8249d;
    
       var mash = function(data) {
         data = data.toString();
         for (var i = 0; i < data.length; i++) {
           n += data.charCodeAt(i);
           var h = 0.02519603282416938 * n;
           n = h >>> 0;
           h -= n;
           h *= n;
           n = h >>> 0;
           h -= n;
           n += h * 0x100000000; // 2^32
         }
         return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
       };
    
       //mash.version = 'Mash 0.9';
       return mash;
    }();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    /*random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };*/
    //random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};var Random = $alea();
function IntToHex2(v) { var r=v.toString(16); return (r.length==1)?"0"+r:r }
function IntToHex(v,d) { var r=v.toString(16); return "00000000".substr(0, d-r.length)+r }
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = String(parseInt(arg, 10)); if (match[7]) { arg = str_repeat('0', match[7]-arg.length)+arg } break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();
function Format(f,a) { a.unshift(f); return sprintf.apply(null,a) }
function FloatToStr$_Float_(i) { return i.toString() }
function FloatToStr$_Float_Integer_(i,p) { return (p==99)?i.toString():i.toFixed(p) }
var Exception={
	$ClassName: "Exception",
	$Parent: TObject,
	$Init: function (s) { FMessage="" },
	Create: function (s,Msg) { s.FMessage=Msg; return s }
}
var EAssertionFailed={
	$ClassName: "EAssertionFailed",
	$Parent: Exception,
	$Init: Exception.$Init
}
function Delete(s,i,n) { var v=s.v; if ((i<=0)||(i>v.length)||(n<=0)) return; s.v=v.substr(0,i-1)+v.substr(i+n-1); }
function ClampInt(v,mi,ma) { return v<mi ? mi : v>ma ? ma : v }
function $W(e) { return e.ClassType?e:Exception.Create($New(Exception),e.constructor.name+", "+e.message) }
function $SetInc(s,v,m,n) { v-=m; if (v>=0 && v<n) s[v>>5]|=1<<(v&31) }
function $SetIn(s,v,m,n) { v-=m; return (v<0 && v>=n)?false:(s[v>>5]&(1<<(v&31)))!=0 }
function $SetExc(s,v,m,n) { v-=m; if (v>=0 && v<n) s[v>>5]&=~(1<<(v&31)) }
Array.prototype.pusha = function (e) { this.push.apply(this, e); return this }
function $Peek(a,z) {
	var n=a.length;
	if (n>0) return a[n-1];
	throw Exception.Create($New(Exception),"Upper bound exceeded! Index 0"+z);
}
function $NewDyn(c,z) {
	if (c==null) throw Exception.Create($New(Exception),"ClassType is nil"+z);
	var i={ClassType:c};
	c.$Init(i);
	return i
}
function $New(c) { var i={ClassType:c}; c.$Init(i); return i }
function $Is(o,c) {
	if (o===null) return false;
	return $Inh(o.ClassType,c);
}
;
function $Inh(s,c) {
	if (s===null) return false;
	while ((s)&&(s!==c)) s=s.$Parent;
	return (s)?true:false;
}
;
function $Event1(i,f) {
	var li=i,lf=f;
	return function(a) {
		return lf.call(li,li,a)
	}
}
function $Event0(i,f) {
	var li=i,lf=f;
	return function() {
		return lf.call(li,li)
	}
}
function $Div(a,b) { var r=a/b; return (r>=0)?Math.floor(r):Math.ceil(r) }
function $Assert(b,m,z) { if (!b) throw Exception.Create($New(EAssertionFailed),"Assertion failed"+z+((m=="")?"":" : ")+m); }
function $AsIntf(o,i) {
	if (o===null) return null;
	var r = o.ClassType.$Intf[i].map(function (e) {
		return function () {
			var arg=Array.prototype.slice.call(arguments);
			arg.splice(0,0,o);
			return e.apply(o, arg);
		}
	});
	r.O = o;
	return r;
}
;
function $AsClass(s,c) {
	if ((s===null)||$Inh(s,c)) return s;
	throw Exception.Create($New(Exception),"Cannot cast class \""+s.$ClassName+"\" to class \""+c.$ClassName+"\"");
}
function $As(o,c) {
	if ((o===null)||$Is(o,c)) return o;
	throw Exception.Create($New(Exception),"Cannot cast instance of type \""+o.ClassType.$ClassName+"\" to class \""+c.$ClassName+"\"");
}
function $ArraySwap(a,i1,i2) { var t=a[i1]; a[i1]=a[i2]; a[i2]=t }
function $ArraySetLenC(a,n,d) {
	var o=a.length;
	if (o==n) return;
	if (o>n) a.length=n; else for (;o<n;o++) a.push(d());
}
function WriteLn(value$16) {
   var items$2 = [],
      a$307 = 0;
   var litem = "";
   if (window.console) {
      if (TW3VariantHelper$Isstring(value$16)) {
         if (((String(value$16)).indexOf("\r")+1)>0) {
            items$2 = TString.Explode(TString,(String(value$16)),"\r");
            var $temp1;
            for(a$307=0,$temp1=items$2.length;a$307<$temp1;a$307++) {
               litem = items$2[a$307];
               window.console.log(litem);
            }
            return;
         }
      }
      window.console.log(value$16);
   }
};
function w3_SetStyle(tagRef, StyleName, StyleValue) {
   tagRef.style[StyleName] = StyleValue;
};
function w3_SetElementParentByRef(Element$2, Parent$3) {
   Parent$3.appendChild(Element$2);
};
function w3_setAttrib(tagRef$1, AttribName, Value) {
   if (tagRef$1) {
      tagRef$1.setAttribute(AttribName,Value);
   }
};
function w3_RemoveEvent(a_tagRef, a_eventName, a_callback, a_useCapture) {
   if (a_eventName=="mousewheel") {
      a_eventName = "DOMMouseScroll";
   }
   a_tagRef.removeEventListener(a_eventName,a_callback,a_useCapture);
};
function w3_RemoveElementByRef(Element$3, Parent$4) {
   Parent$4.removeChild(Element$3);
};
function w3_RemoveAttrib(tagRef$2, AttribName$1) {
   if (tagRef$2) {
      tagRef$2.removeAttribute(AttribName$1);
   }
};
function w3_RegisterBrowserAPI(BrowserAPIDriver) {
   vDriver = BrowserAPIDriver;
};
function w3_NameToUrlStr(aUrl) {
   return "url("+aUrl+")";
};
function w3_HasAttrib(tagRef$3, AttribName$2) {
   var Result = false;
   if (tagRef$3) {
      Result = (tagRef$3.hasAttribute(AttribName$2)?true:false);
   }
   return Result
};
function w3_GetStyleAsStr(tagRef$4, StyleName$1) {
   var Result = "";
   var data = null;
    var temp = document.defaultView.getComputedStyle(tagRef$4, null);

    if (temp) {
      data = (temp).getPropertyValue(StyleName$1);
    } else {
      data = (tagRef$4).style[StyleName$1];
    }

    if (data) {
      if (typeof(data) === "number") {
        Result = String(data);
      } else {
        if (typeof(data) === "string")
          Result = data;
      }
    }
   return Result
};
function w3_GetStyleAsInt(tagRef$5, StyleName$2) {
   var Result = 0;
   var data = null;
    var temp = document.defaultView.getComputedStyle(tagRef$5, null);

    if (temp) {
      data = (temp).getPropertyValue(StyleName$2);
    } else {
      data = (tagRef$5).style[StyleName$2];
    }

    if (data) {
      if (typeof(data) === "number") {
        Result = data;
      } else {
        if (typeof(data) === "string") {
          data = parseInt(data);
          if (typeof(data) === "number")
            Result = data;
        }
      }
    }
   return Result
};
function w3_GetStyleAsFloat(tagRef$6, StyleName$3) {
   var Result = 0;
   var data = null;
    var temp = document.defaultView.getComputedStyle(tagRef$6, null);

    if (temp) {
      data = (temp).getPropertyValue(StyleName$3);
    } else {
      data = (tagRef$6).style[StyleName$3];
    }

    if (data) {
      if (typeof(data) === "number") {
        Result = data;
      } else {
        if (typeof(data) === "string") {
          data = parseFloat(data);
          if (!isNaN(data))
            Result = data;
        }
      }
    }
   return Result
};
function w3_GetStyle(tagRef$7, StyleName$4) {
   var Result = undefined;
   var temp   = document.defaultView.getComputedStyle(tagRef$7, null);
    if (temp) {
      Result = (temp).getPropertyValue(StyleName$4);
    } else {
      Result = (tagRef$7).style[StyleName$4];
    }
   return Result
};
function w3_getPropertyAsInt(tagRef$8, PropName) {
   return parseInt(tagRef$8[PropName],10);
};
function w3_getIsSafari() {
   var Result = false;
   var LUserAgent = "";
   LUserAgent = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   Result = ((LUserAgent).indexOf("safari")>=0)&&(!((LUserAgent).indexOf("chrome")>=0));
   return Result
};
function w3_getIsOpera() {
   return (window.opera)?true:false;
};
function w3_getIsIPod() {
   var Result = false;
   var LUserAgent$2 = "";
   LUserAgent$2 = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   Result = ((LUserAgent$2).indexOf("ipod")>=0)&&((LUserAgent$2).indexOf("apple")>=0);
   return Result
};
function w3_getIsIPhone() {
   var Result = false;
   var LUserAgent$3 = "";
   LUserAgent$3 = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   Result = ((LUserAgent$3).indexOf("iphone")>=0)&&((LUserAgent$3).indexOf("apple")>=0);
   return Result
};
function w3_getIsIPad() {
   var Result = false;
   var LUserAgent$4 = "";
   LUserAgent$4 = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   Result = ((LUserAgent$4).indexOf("ipad")>=0)&&((LUserAgent$4).indexOf("apple")>=0);
   return Result
};
function w3_getIsInternetExplorer() {
   var Result = false;
   var ua;
   function IE_Edge() {
      var Result = false;
      var edge;
      edge = (ua).indexOf('Edge/');
      Result = (edge > 0);
      return Result
   };
   function IE_11() {
      var Result = false;
      var trident;
      trident = (ua).indexOf('Trident/');
      Result = (trident > 0);
      return Result
   };
   function IE_10_Or_Older() {
      var Result = false;
      var msie;
      msie = (ua).indexOf('MSIE ');
      Result = (msie > 0);
      return Result
   };
   ua = window.navigator.userAgent;
   Result = IE_Edge()||IE_11()||IE_10_Or_Older();
   return Result
};
function w3_getIsFirefox() {
   var Result = false;
   var LUserAgent$5 = "";
   LUserAgent$5 = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   Result = ((LUserAgent$5).indexOf("firefox")>=0);
   return Result
};
function w3_getIsChrome() {
   var Result = false;
   var LUserAgent$6 = "";
   LUserAgent$6 = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   if (((LUserAgent$6).indexOf("chrome")>=0)) {
      Result = (window.chrome)?true:false;
   }
   return Result
};
function w3_getIsAndroid() {
   var Result = false;
   var LUserAgent$7 = "";
   LUserAgent$7 = (TVariant.AsString(navigator.userAgent)).toLocaleLowerCase();
   Result = ((LUserAgent$7).indexOf("android")>=0);
   return Result
};
function w3_getAttribAsStr(tagRef$9, AttribName$3) {
   var Result = "";
   var Temp$1;
   if (tagRef$9) {
      if (tagRef$9.hasAttribute(AttribName$3)) {
         Temp$1 = tagRef$9.getAttribute(AttribName$3);
         if (Temp$1) {
            if (TVariant.IsString(Temp$1)) {
               Result = String(Temp$1);
            } else {
               Result = TVariant.AsString(Temp$1);
            }
         }
      }
   }
   return Result
};
function w3_CreateHtmlElement(TypeName) {
   return document.createElement(TypeName);
};
function w3_BrowserVendor() {
   var Result = 0;
   if (vDriver===null) {
      BrowserAPI();
   }
   Result = vVendor;
   return Result
};
function w3_AddEvent(a_tagRef$1, a_eventName$1, a_callback$1, a_useCapture$1) {
   if (a_eventName$1=="mousewheel") {
      a_eventName$1 = "DOMMouseScroll";
   }
   a_tagRef$1.addEventListener(a_eventName$1,a_callback$1,a_useCapture$1);
};
/// TW3CustomBrowserAPI = class (TObject)
///  [line: 214, column: 3, file: SmartCL.System]
var TW3CustomBrowserAPI = {
   $ClassName:"TW3CustomBrowserAPI",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCSSAnimation = $.FCSSBackgroundColor = $.FCSSBackgroundImage = $.FCSSBackgroundPos = $.FCSSBackgroundSize = $.FCSSToken = $.FCSSTransform = "";
   }
   /// function TW3CustomBrowserAPI.DevicePixelRatio() : Float
   ///  [line: 987, column: 36, file: SmartCL.System]
   ,DevicePixelRatio:function() {
      var Result = 0;
      Result = window.devicePixelRatio || 1;
      return Result
   }
   /// function TW3CustomBrowserAPI.GetComputedStylesFor(const Handle: TControlHandle) : THandle
   ///  [line: 979, column: 36, file: SmartCL.System]
   ,GetComputedStylesFor:function(Self, Handle$15) {
      var Result = undefined;
      Result = window.getComputedStyle(Handle$15);
      return Result
   }
   /// function TW3CustomBrowserAPI.Prefix(const aCSS: String) : String
   ///  [line: 994, column: 30, file: SmartCL.System]
   ,Prefix:function(Self, aCSS) {
      return Self.FCSSToken+aCSS;
   }
   /// function TW3CustomBrowserAPI.PrefixDef(const aCss: String) : String
   ///  [line: 999, column: 30, file: SmartCL.System]
   ,PrefixDef:function(Self, aCss) {
      return "-"+Self.FCSSToken+"-"+aCss;
   }
   ,Destroy:TObject.Destroy
};
/// TW3WebkitBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 271, column: 3, file: SmartCL.System]
var TW3WebkitBrowserAPI = {
   $ClassName:"TW3WebkitBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3WebkitBrowserAPI.Create()
   ///  [line: 1038, column: 33, file: SmartCL.System]
   ,Create$75:function(Self) {
      Self.FCSSToken = "webkit";
      Self.FCSSBackgroundImage = "background-image";
      Self.FCSSBackgroundSize = "webkitbackgroundSize";
      Self.FCSSBackgroundPos = "webkitbackgroundPosition";
      Self.FCSSBackgroundColor = "webkitbackgroundColor";
      Self.FCSSTransform = "webkitTransform";
      Self.FCSSAnimation = "webkitAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3URLObject = class (TObject)
///  [line: 118, column: 3, file: SmartCL.System]
var TW3URLObject = {
   $ClassName:"TW3URLObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3URLObject.RevokeObjectURL(const ObjectUrl: String)
   ///  [line: 670, column: 30, file: SmartCL.System]
   ,RevokeObjectURL:function(Self, ObjectUrl) {
      if (ObjectUrl.length>0) {
         var encdec = window.URL || window.webkitURL || window.mozURL || window.msURL;
      if (encdec) {
        encdec.revokeObjectURL(ObjectUrl);
      } else
        throw "window URL-object could not be obtained error";
      } else {
         throw Exception.Create($New(EAllocation),"Failed to revoke object URL, reference string was empty error");
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3OperaBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 282, column: 3, file: SmartCL.System]
var TW3OperaBrowserAPI = {
   $ClassName:"TW3OperaBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3OperaBrowserAPI.Create()
   ///  [line: 1023, column: 32, file: SmartCL.System]
   ,Create$76:function(Self) {
      Self.FCSSToken = "O";
      Self.FCSSBackgroundImage = "OBackgroundImage";
      Self.FCSSBackgroundSize = "OBackgroundSize";
      Self.FCSSBackgroundPos = "OBackgroundPosition";
      Self.FCSSBackgroundColor = "backgroundColor";
      Self.FCSSTransform = "OTransform";
      Self.FCSSAnimation = "OAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3MouseCursor = class (TObject)
///  [line: 171, column: 3, file: SmartCL.System]
var TW3MouseCursor = {
   $ClassName:"TW3MouseCursor",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3MouseCursor.CursorByName(const CursorName: String) : TCursor
   ///  [line: 866, column: 31, file: SmartCL.System]
   ,CursorByName:function(Self, CursorName) {
      return TVariant.AsInteger(__CURSOR_NAME_LUT[(Trim$_String_(CursorName)).toLocaleLowerCase()]);
   }
   /// function TW3MouseCursor.NameByCursor(const Cursor: TCursor) : String
   ///  [line: 871, column: 31, file: SmartCL.System]
   ,NameByCursor:function(Self, Cursor$1) {
      return TVariant.AsString(__CURSOR_DATA_LUT[Cursor$1]);
   }
   /// function TW3MouseCursor.GetCursorFromElement(const Handle: TControlHandle) : TCursor
   ///  [line: 876, column: 31, file: SmartCL.System]
   ,GetCursorFromElement:function(Self, Handle$16) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Handle$16)) {
         if (Handle$16.style["cursor"]) {
            Result = TW3MouseCursor.CursorByName(Self,(String(Handle$16.style["cursor"])));
         } else {
            Result = 1;
         }
      }
      return Result
   }
   /// procedure TW3MouseCursor.SetCursorForElement(const Handle: TControlHandle; const Cursor: TCursor)
   ///  [line: 887, column: 32, file: SmartCL.System]
   ,SetCursorForElement:function(Self, Handle$17, Cursor$2) {
      if (TControlHandleHelper$Valid$2(Handle$17)) {
         Handle$17.style["cursor"] = TW3MouseCursor.NameByCursor(Self,Cursor$2);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3IEBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 287, column: 3, file: SmartCL.System]
var TW3IEBrowserAPI = {
   $ClassName:"TW3IEBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3IEBrowserAPI.Create()
   ///  [line: 1008, column: 29, file: SmartCL.System]
   ,Create$77:function(Self) {
      Self.FCSSToken = "ms";
      Self.FCSSBackgroundImage = "msBackgroundImage";
      Self.FCSSBackgroundSize = "msBackgroundSize";
      Self.FCSSBackgroundPos = "msBackgroundPosition";
      Self.FCSSBackgroundColor = "backgroundColor";
      Self.FCSSTransform = "msTransform";
      Self.FCSSAnimation = "msAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3GlyphLayout enumeration
///  [line: 48, column: 3, file: SmartCL.System]
var TW3GlyphLayout = [ "glGlyphTop", "glGlyphLeft", "glGlyphRight", "glGlyphBottom" ];
/// TW3FirefoxBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 277, column: 3, file: SmartCL.System]
var TW3FirefoxBrowserAPI = {
   $ClassName:"TW3FirefoxBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3FirefoxBrowserAPI.Create()
   ///  [line: 1053, column: 34, file: SmartCL.System]
   ,Create$78:function(Self) {
      Self.FCSSToken = "Moz";
      Self.FCSSBackgroundImage = "backgroundImage";
      Self.FCSSBackgroundSize = "backgroundSize";
      Self.FCSSBackgroundPos = "backgroundPosition";
      Self.FCSSBackgroundColor = "backgroundColor";
      Self.FCSSTransform = "MozTransform";
      Self.FCSSAnimation = "MozAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3EventManagerTypes enumeration
///  [line: 181, column: 3, file: SmartCL.System]
var TW3EventManagerTypes = { 1:"ekMouseDown", 2:"ekMouseMove", 3:"ekMouseUp", 4:"ekTouchBegin", 5:"ekTouchMove", 6:"ekTouchEnd", 7:"ekClick", 8:"ekMouseEnter", 9:"ekMouseExit", 10:"ekMouseWheel", 11:"ekDoubleClick" };
/// TW3DOMEventMode enumeration
///  [line: 132, column: 3, file: SmartCL.System]
var TW3DOMEventMode = [ "dmCapture", "dmBubble" ];
/// TW3DOMEventAPI = class (TObject)
///  [line: 136, column: 3, file: SmartCL.System]
var TW3DOMEventAPI = {
   $ClassName:"TW3DOMEventAPI",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3DOMEventAPI.EventObject(const e: Variant) : JEvent
   ///  [line: 419, column: 31, file: SmartCL.System]
   ,EventObject$1:function(e$1) {
      var Result = null;
      Result = e$1 || window.event;
      return Result
   }
   /// procedure TW3DOMEventAPI.RegisterEvent(Handle: TControlHandle; EventName: String; EventHandler: TW3JSEventHandler; Mode: TW3DOMEventMode)
   ///  [line: 426, column: 32, file: SmartCL.System]
   ,RegisterEvent:function(Handle$18, EventName$1, EventHandler, Mode$1) {
      if (Handle$18) {
         if (Handle$18.addEventListener) {
            Handle$18.addEventListener(EventName$1,EventHandler,(Mode$1==0));
         } else {
            Handle$18.attachEvent("on"+EventName$1,EventHandler,(Mode$1==0));
         }
      } else {
         throw Exception.Create($New(Exception),"Register event failed, invalid handle error");
      }
   }
   /// procedure TW3DOMEventAPI.UnRegisterEvent(Handle: TControlHandle; EventName: String; EventHandler: TW3JSEventHandler; Mode: TW3DOMEventMode)
   ///  [line: 453, column: 32, file: SmartCL.System]
   ,UnRegisterEvent:function(Handle$19, EventName$2, EventHandler$1, Mode$2) {
      if (Handle$19) {
         if (Handle$19.removeEventListener) {
            Handle$19.removeEventListener(EventName$2,EventHandler$1,(Mode$2==0));
         } else {
            Handle$19.detachEvent("on"+EventName$2,EventHandler$1,(Mode$2==0));
         }
      } else {
         throw Exception.Create($New(Exception),"Unregister event failed, invalid handle error");
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomDeviceCapabilities = class (TObject)
///  [line: 266, column: 3, file: System.Types]
var TW3CustomDeviceCapabilities = {
   $ClassName:"TW3CustomDeviceCapabilities",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,GetGamePadSupport$:function($){return $.ClassType.GetGamePadSupport($)}
   ,GetKeyboardSupported$:function($){return $.ClassType.GetKeyboardSupported($)}
   ,GetMouseSupport$:function($){return $.ClassType.GetMouseSupport($)}
   ,GetTouchSupport$:function($){return $.ClassType.GetTouchSupport($)}
};
/// TW3DOMDeviceCapabilities = class (TW3CustomDeviceCapabilities)
///  [line: 200, column: 3, file: SmartCL.System]
var TW3DOMDeviceCapabilities = {
   $ClassName:"TW3DOMDeviceCapabilities",$Parent:TW3CustomDeviceCapabilities
   ,$Init:function ($) {
      TW3CustomDeviceCapabilities.$Init($);
   }
   /// function TW3DOMDeviceCapabilities.GetGamePadSupport() : Boolean
   ///  [line: 838, column: 35, file: SmartCL.System]
   ,GetGamePadSupport:function(Self) {
      var Result = false;
      var LNavigator = undefined;
      LNavigator = navigator;
      Result = ((LNavigator.getGamepads||LNavigator.webkitGetGamepads||LNavigator.mozGetGamepads||LNavigator.msGetGamepads)?true:false);
      return Result
   }
   /// function TW3DOMDeviceCapabilities.GetKeyboardSupported() : Boolean
   ///  [line: 847, column: 35, file: SmartCL.System]
   ,GetKeyboardSupported:function(Self) {
      return true;
   }
   /// function TW3DOMDeviceCapabilities.GetMouseSupport() : Boolean
   ///  [line: 788, column: 35, file: SmartCL.System]
   ,GetMouseSupport:function(Self) {
      var Result = false;
      Result = (
      ('onmousedown' in window) &&
      ('onmouseup' in window) &&
      ('onmousemove' in window) &&
      ('onclick' in window) &&
      ('ondblclick' in window) &&
      ('onmousemove' in window) &&
      ('onmouseover' in window) &&
      ('onmouseout' in window) &&
      ('oncontextmenu' in window)
    );
      return Result
   }
   /// function TW3DOMDeviceCapabilities.GetTouchSupport() : Boolean
   ///  [line: 805, column: 35, file: SmartCL.System]
   ,GetTouchSupport:function(Self) {
      var Result = false;
      try {
         document.createEvent("TouchEvent");
         Result = true;
      } catch ($e) {
         var e$2 = $W($e);
         /* null */
      }
      Result = (
      ("ontouchstart" in window) ||
      (navigator.maxTouchPoints) ||
      (navigator.maxTouchPoints > 0)
      );
      if (!Result) {
         Result = ("onmsgesturechange" in window);
      }
      return Result
   }
   ,Destroy:TObject.Destroy
   ,GetGamePadSupport$:function($){return $.ClassType.GetGamePadSupport($)}
   ,GetKeyboardSupported$:function($){return $.ClassType.GetKeyboardSupported($)}
   ,GetMouseSupport$:function($){return $.ClassType.GetMouseSupport($)}
   ,GetTouchSupport$:function($){return $.ClassType.GetTouchSupport($)}
};
/// TW3BrowserVendor enumeration
///  [line: 55, column: 3, file: SmartCL.System]
var TW3BrowserVendor = [ "bvUnknown", "bviOS", "bvAndroid", "bvChrome", "bvSafari", "bvFirefox", "bvOpera", "bvIE" ];
/// TTextVAlign enumeration
///  [line: 42, column: 3, file: SmartCL.System]
var TTextVAlign = [ "tvTop", "tvCenter", "tvBottom" ];
/// TTextAlign enumeration
///  [line: 37, column: 3, file: SmartCL.System]
var TTextAlign = [ "taLeft", "taCenter", "taRight" ];
/// TPixelsPerInch = record
///  [line: 195, column: 3, file: SmartCL.System]
function Copy$TPixelsPerInch(s,d) {
   return d;
}
function Clone$TPixelsPerInch($) {
   return {

   }
}
/// TModalResult enumeration
///  [line: 73, column: 3, file: SmartCL.System]
var TModalResult = [ "mrCancel", "mrOK" ];
/// TCursor enumeration
///  [line: 148, column: 3, file: SmartCL.System]
var TCursor = [ "crAuto", "crDefault", "crInherited", "crURL", "crCrossHair", "crHelp", "crMove", "crPointer", "crProgress", "crText", "crWait", "crNResize", "crSResize", "crEResize", "crWResize", "crNEResize", "crNWResize", "crNSResize", "crSEResize", "crSWResize", "crEWResize" ];
/// function TControlHandleHelper.Contains(const Self: TControlHandle; const Child: TControlHandle) : Boolean
///  [line: 1553, column: 31, file: SmartCL.System]
function TControlHandleHelper$Contains$3(Self$2, Child) {
   return TControlHandleHelper$Contains$3(Self$2,Child);
}
/// function TControlHandleHelper.GetChildById(const Self: TControlHandle; TagId: String) : TControlHandle
///  [line: 1558, column: 31, file: SmartCL.System]
function TControlHandleHelper$GetChildById(Self$3, TagId$1) {
   return document.getElementById(TagId$1);
}
/// function TControlHandleHelper.GetChildCount(const Self: TControlHandle) : Integer
///  [line: 1563, column: 31, file: SmartCL.System]
function TControlHandleHelper$GetChildCount$1(Self$4) {
   var Result = 0;
   if (Self$4.children) {
      Result = parseInt(Self$4.children.length,10);
   }
   return Result
}
/// function TControlHandleHelper.GetChildren(const Self: TControlHandle) : TControlHandleArray
///  [line: 1569, column: 31, file: SmartCL.System]
function TControlHandleHelper$GetChildren$1(Self$5) {
   var Result = [];
   var x$34 = 0,
      LCount = 0,
      LLongs = 0,
      LSingles = 0;
   x$34 = 0;
   LCount = TControlHandleHelper$GetChildCount$1(Self$5);
   if (LCount<1) {
      return Result;
   }
   LLongs = LCount>>>3;
   LSingles = LCount%8;
   while (LLongs>0) {
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      Result.push(Self$5.children[x$34]);
      ++x$34;
      --LLongs;
   }
   switch (LSingles) {
      case 1 :
         Result.push(Self$5.children[x$34]);
         break;
      case 2 :
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         break;
      case 3 :
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         break;
      case 4 :
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         break;
      case 5 :
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         break;
      case 6 :
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         break;
      case 7 :
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         ++x$34;
         Result.push(Self$5.children[x$34]);
         break;
   }
   return Result
}
/// function TControlHandleHelper.Ready(const Self: TControlHandle) : Boolean
///  [line: 1653, column: 31, file: SmartCL.System]
function TControlHandleHelper$Ready$4(Self$6) {
   return (document.body.contains(Self$6)?true:false);
}
/// procedure TControlHandleHelper.ReadyExecute(const Self: TControlHandle; const OnReady: TProcedureRef)
///  [line: 1700, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecute(Self$7, OnReady) {
   var LExists;
   LExists = document.body.contains(Self$7);
   if (LExists) {
      OnReady();
   } else {
      TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
         TControlHandleHelper$ReadyExecute(Self$7,OnReady);
      },100);
   }
}
/// procedure TControlHandleHelper.ReadyExecuteAnimFrame(const Self: TControlHandle; const OnReady: TProcedureRef)
///  [line: 1673, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecuteAnimFrame(Self$8, OnReady$1) {
   var LExists$1;
   LExists$1 = document.body.contains(Self$8);
   if (LExists$1) {
      TW3Dispatch.RequestAnimationFrame(TW3Dispatch,OnReady$1);
   } else {
      TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
         TControlHandleHelper$ReadyExecuteAnimFrame(Self$8,OnReady$1);
      },100);
   }
}
/// procedure TControlHandleHelper.ReadyExecuteEx(const Self: TControlHandle; const Tag: TObject; const OnReady: TProcedureRefO)
///  [line: 1688, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecuteEx(Self$9, Tag, OnReady$2) {
   var LExists$2;
   LExists$2 = document.body.contains(Self$9);
   if (LExists$2) {
      OnReady$2(Tag);
   } else {
      TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
         TControlHandleHelper$ReadyExecuteEx(Self$9,Tag,OnReady$2);
      },100);
   }
}
/// function TControlHandleHelper.Valid(const Self: TControlHandle) : Boolean
///  [line: 1548, column: 32, file: SmartCL.System]
function TControlHandleHelper$Valid$2(Self$10) {
   return (Self$10?true:false);
}
function BrowserAPI() {
   var Result = null;
   if (vDriver===null) {
      InternalInitVendorInfo();
   }
   Result = vDriver;
   return Result
};
function SetupMouseCursorTable() {
   __CURSOR_NAME_LUT = TVariant.CreateObject();
   __CURSOR_NAME_LUT["default"] = 1;
   __CURSOR_NAME_LUT["auto"] = 0;
   __CURSOR_NAME_LUT["inherited"] = 2;
   __CURSOR_NAME_LUT["url"] = 3;
   __CURSOR_NAME_LUT["crosshair"] = 4;
   __CURSOR_NAME_LUT["help"] = 5;
   __CURSOR_NAME_LUT["move"] = 6;
   __CURSOR_NAME_LUT["pointer"] = 7;
   __CURSOR_NAME_LUT["progress"] = 8;
   __CURSOR_NAME_LUT["text"] = 9;
   __CURSOR_NAME_LUT["wait"] = 10;
   __CURSOR_NAME_LUT["n-resize"] = 11;
   __CURSOR_NAME_LUT["s-resize"] = 12;
   __CURSOR_NAME_LUT["e-resize"] = 13;
   __CURSOR_NAME_LUT["w-resize"] = 14;
   __CURSOR_NAME_LUT["ne-resize"] = 15;
   __CURSOR_NAME_LUT["nw-resize"] = 16;
   __CURSOR_NAME_LUT["se-resize"] = 18;
   __CURSOR_NAME_LUT["sw-resize"] = 19;
   __CURSOR_NAME_LUT["ew-resize"] = 20;
   __CURSOR_NAME_LUT["ns-resize"] = 17;
   __CURSOR_DATA_LUT = TVariant.CreateObject();
   __CURSOR_DATA_LUT[1] = "default";
   __CURSOR_DATA_LUT[0] = "auto";
   __CURSOR_DATA_LUT[2] = "inherited";
   __CURSOR_DATA_LUT[3] = "url";
   __CURSOR_DATA_LUT[4] = "crosshair";
   __CURSOR_DATA_LUT[5] = "help";
   __CURSOR_DATA_LUT[6] = "move";
   __CURSOR_DATA_LUT[7] = "pointer";
   __CURSOR_DATA_LUT[8] = "progress";
   __CURSOR_DATA_LUT[9] = "text";
   __CURSOR_DATA_LUT[10] = "wait";
   __CURSOR_DATA_LUT[11] = "n-resize";
   __CURSOR_DATA_LUT[12] = "s-resize";
   __CURSOR_DATA_LUT[13] = "e-resize";
   __CURSOR_DATA_LUT[14] = "w-resize";
   __CURSOR_DATA_LUT[15] = "ne-resize";
   __CURSOR_DATA_LUT[16] = "nw-resize";
   __CURSOR_DATA_LUT[18] = "se-resize";
   __CURSOR_DATA_LUT[19] = "sw-resize";
   __CURSOR_DATA_LUT[20] = "ew-resize";
   __CURSOR_NAME_LUT[17] = "ns-resize";
};
function InternalInitVendorInfo() {
   if (w3_getIsAndroid()) {
      vVendor = 2;
   } else if (w3_getIsSafari()) {
      vVendor = 4;
   } else if (w3_getIsFirefox()) {
      vVendor = 5;
   } else if (w3_getIsChrome()) {
      vVendor = 3;
   } else if (w3_getIsInternetExplorer()) {
      vVendor = 7;
   } else if (w3_getIsOpera()) {
      vVendor = 6;
   }
   if (!vVendor) {
      if (w3_getIsIPhone()||w3_getIsIPad()||w3_getIsIPod()) {
         vVendor = 1;
      }
   }
   switch (vVendor) {
      case 1 :
      case 4 :
      case 3 :
      case 2 :
         w3_RegisterBrowserAPI(TW3WebkitBrowserAPI.Create$75($New(TW3WebkitBrowserAPI)));
         break;
      case 5 :
         w3_RegisterBrowserAPI(TW3FirefoxBrowserAPI.Create$78($New(TW3FirefoxBrowserAPI)));
         break;
      case 7 :
         w3_RegisterBrowserAPI(TW3IEBrowserAPI.Create$77($New(TW3IEBrowserAPI)));
         break;
      case 6 :
         w3_RegisterBrowserAPI(TW3OperaBrowserAPI.Create$76($New(TW3OperaBrowserAPI)));
         break;
      default :
         w3_RegisterBrowserAPI(TW3FirefoxBrowserAPI.Create$78($New(TW3FirefoxBrowserAPI)))   }
};
/// JMouseButton enumeration
///  [line: 160, column: 3, file: W3C.DOM]
var JMouseButton = [ "Left", "Middle", "Right" ];
/// function TW3VariantHelper.DataType(const Self: Variant) : TW3VariantDataType
///  [line: 1460, column: 27, file: System.Types]
function TW3VariantHelper$DataType(Self$11) {
   var Result = 1;
   var LType = "";
   if (TW3VariantHelper$Valid$3(Self$11)) {
      LType = typeof(Self$11);
      {var $temp2 = (LType).toLocaleLowerCase();
         if ($temp2=="object") {
            if (!Self$11.length) {
               Result = 8;
            } else {
               Result = 9;
            }
         }
          else if ($temp2=="function") {
            Result = 7;
         }
          else if ($temp2=="symbol") {
            Result = 6;
         }
          else if ($temp2=="boolean") {
            Result = 2;
         }
          else if ($temp2=="string") {
            Result = 5;
         }
          else if ($temp2=="number") {
            if (Math.round(Number(Self$11))!=Self$11) {
               Result = 4;
            } else {
               Result = 3;
            }
         }
          else if ($temp2=="array") {
            Result = 9;
         }
          else {
            Result = 1;
         }
      }
   } else if (Self$11==null) {
      Result = 10;
   } else {
      Result = 1;
   }
   return Result
}
/// function TW3VariantHelper.Defined(const Self: Variant) : Boolean
///  [line: 1429, column: 27, file: System.Types]
function TW3VariantHelper$Defined(Self$12) {
   var Result = false;
   Result = !(Self$12 == undefined);
   return Result
}
/// function TW3VariantHelper.IsObject(const Self: Variant) : Boolean
///  [line: 1507, column: 27, file: System.Types]
function TW3VariantHelper$IsObject(Self$13) {
   var Result = false;
   Result = ((Self$13) !== undefined)
      && (Self$13 !== null)
      && (typeof Self$13  === "object")
      && ((Self$13).length === undefined);
   return Result
}
/// function TW3VariantHelper.Isstring(const Self: Variant) : Boolean
///  [line: 1544, column: 27, file: System.Types]
function TW3VariantHelper$Isstring(Self$14) {
   var Result = false;
   Result = (Self$14 !== undefined)
      && (Self$14 !== null)
      && (typeof Self$14  === "string");
   return Result
}
/// function TW3VariantHelper.Valid(const Self: Variant) : Boolean
///  [line: 1415, column: 27, file: System.Types]
function TW3VariantHelper$Valid$3(Self$15) {
   var Result = false;
   Result = !( (Self$15 == undefined) || (Self$15 == null) );
   return Result
}
/// TW3VariantDataType enumeration
///  [line: 416, column: 3, file: System.Types]
var TW3VariantDataType = { 1:"vdUnknown", 2:"vdBoolean", 3:"vdinteger", 4:"vdfloat", 5:"vdstring", 6:"vdSymbol", 7:"vdFunction", 8:"vdObject", 9:"vdArray", 10:"vdVariant" };
/// TW3OwnedObject = class (TObject)
///  [line: 252, column: 3, file: System.Types]
var TW3OwnedObject = {
   $ClassName:"TW3OwnedObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOwner = null;
   }
   /// function TW3OwnedObject.GetOwner() : TObject
   ///  [line: 810, column: 26, file: System.Types]
   ,GetOwner:function(Self) {
      return Self.FOwner;
   }
   /// procedure TW3OwnedObject.SetOwner(const NewOwner: TObject)
   ///  [line: 820, column: 26, file: System.Types]
   ,SetOwner:function(Self, NewOwner) {
      if (NewOwner!==Self.FOwner) {
         if (TW3OwnedObject.AcceptOwner$(Self,NewOwner)) {
            Self.FOwner = NewOwner;
         } else {
            throw EW3Exception.CreateFmt($New(EW3OwnedObject),$R[0],["TW3OwnedObject.SetOwner", TObject.ClassName(Self.ClassType), $R[2]]);
         }
      }
   }
   /// function TW3OwnedObject.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 815, column: 25, file: System.Types]
   ,AcceptOwner:function(Self, CandidateObject) {
      return true;
   }
   /// constructor TW3OwnedObject.Create(const AOwner: TObject)
   ///  [line: 804, column: 28, file: System.Types]
   ,Create$11:function(Self, AOwner) {
      TObject.Create(Self);
      TW3OwnedObject.SetOwner(Self,AOwner);
      return Self
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3OwnedObject.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Identifiers = class (TObject)
///  [line: 174, column: 3, file: System.Types]
var TW3Identifiers = {
   $ClassName:"TW3Identifiers",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3Identifiers.GenerateUniqueComponentName() : String
   ///  [line: 1349, column: 31, file: System.Types]
   ,GenerateUniqueComponentName$1:function(Self) {
      var Result = "";
      ++__UNIQUE;
      Result = "Component"+__UNIQUE.toString();
      return Result
   }
   /// function TW3Identifiers.GenerateUniqueAnimationName() : String
   ///  [line: 1337, column: 31, file: System.Types]
   ,GenerateUniqueAnimationName:function(Self) {
      var Result = "";
      ++__UNIQUE;
      Result = "SmartAnim"+__UNIQUE.toString();
      return Result
   }
   /// function TW3Identifiers.GenerateUniqueObjectId() : String
   ///  [line: 1343, column: 31, file: System.Types]
   ,GenerateUniqueObjectId:function(Self) {
      var Result = "";
      ++__UNIQUE;
      Result = "OBJ"+__UNIQUE.toString();
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TVariant = class (TObject)
///  [line: 368, column: 3, file: System.Types]
var TVariant = {
   $ClassName:"TVariant",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TVariant.AsBool(const aValue: Variant) : Boolean
   ///  [line: 1866, column: 25, file: System.Types]
   ,AsBool:function(aValue) {
      var Result = false;
      if (aValue!=undefined&&aValue!=null) {
         Result = (aValue?true:false);
      }
      return Result
   }
   /// function TVariant.AsFloat(const aValue: Variant) : Float
   ///  [line: 1849, column: 25, file: System.Types]
   ,AsFloat:function(aValue$1) {
      var Result = 0;
      if (aValue$1!=undefined&&aValue$1!=null) {
         Result = Number(aValue$1);
      }
      return Result
   }
   /// function TVariant.AsInteger(const aValue: Variant) : Integer
   ///  [line: 1835, column: 25, file: System.Types]
   ,AsInteger:function(aValue$2) {
      var Result = 0;
      if (aValue$2!=undefined&&aValue$2!=null) {
         Result = parseInt(aValue$2,10);
      }
      return Result
   }
   /// function TVariant.AsObject(const aValue: Variant) : TObject
   ///  [line: 1856, column: 25, file: System.Types]
   ,AsObject:function(aValue$3) {
      var Result = null;
      if (aValue$3!=undefined&&aValue$3!=null) {
         Result = aValue$3;
      }
      return Result
   }
   /// function TVariant.AsString(const aValue: Variant) : String
   ///  [line: 1842, column: 25, file: System.Types]
   ,AsString:function(aValue$4) {
      var Result = "";
      if (aValue$4!=undefined&&aValue$4!=null) {
         Result = String(aValue$4);
      }
      return Result
   }
   /// function TVariant.CreateObject() : Variant
   ///  [line: 1873, column: 25, file: System.Types]
   ,CreateObject:function() {
      var Result = undefined;
      Result = new Object();
      return Result
   }
   /// procedure TVariant.ForEachProperty(const Data: Variant; const CallBack: TW3ObjectKeyCallback)
   ///  [line: 1957, column: 26, file: System.Types]
   ,ForEachProperty:function(Data$2, CallBack) {
      var LObj = {};
      var Keys$1 = [],
         a$308 = 0;
      var LName = "";
      if (CallBack) {
         Keys$1 = TVariant.Properties(Data$2);
         var $temp3;
         for(a$308=0,$temp3=Keys$1.length;a$308<$temp3;a$308++) {
            LName = Keys$1[a$308];
            LObj = Keys$1[LName];
            if (CallBack(LName,LObj)==1) {
               Data$2[LName] = LObj.v;
            } else {
               break;
            }
         }
      }
   }
   /// function TVariant.IsInteger(const aValue: Variant) : Boolean
   ///  [line: 1907, column: 25, file: System.Types]
   ,IsInteger:function(aValue$5) {
      var Result = false;
      if (aValue$5 == null) return false;
    if (aValue$5 == undefined) return false;
    if (typeof(aValue$5) === "number") if (parseInt(aValue$5) === aValue$5) return true;
      return Result
   }
   /// function TVariant.IsNAN(const aValue: Variant) : Boolean
   ///  [line: 1921, column: 25, file: System.Types]
   ,IsNAN:function(aValue$6) {
      return isNaN(Number(aValue$6));
   }
   /// function TVariant.IsNumber(const aValue: Variant) : Boolean
   ///  [line: 1902, column: 25, file: System.Types]
   ,IsNumber:function(aValue$7) {
      return typeof(aValue$7)==__TYPE_MAP.Number$1;
   }
   /// function TVariant.IsString(const aValue: Variant) : Boolean
   ///  [line: 1897, column: 25, file: System.Types]
   ,IsString:function(aValue$8) {
      return typeof(aValue$8)==__TYPE_MAP.String$1;
   }
   /// function TVariant.Properties(const Data: Variant) : TStrArray
   ///  [line: 1981, column: 25, file: System.Types]
   ,Properties:function(Data$3) {
      var Result = [];
      if (Data$3) {
         if (Object.keys !== undefined) {
        Result = Object.keys(Data$3);
        return Result;
      }
         if ( Object.getOwnPropertyNames !== undefined) {
          Result = Object.getOwnPropertyNames(Data$3);
          return Result;
      }
         for (var qtxenum in Data$3) {
        if ( (Data$3).hasOwnProperty(qtxenum) == true )
          (Result).push(qtxenum);
      }
      return Result;
      }
      return Result
   }
   /// function TVariant.ValidRef(const aValue: Variant) : Boolean
   ///  [line: 1830, column: 25, file: System.Types]
   ,ValidRef:function(aValue$9) {
      return aValue$9!=undefined&&aValue$9!=null;
   }
   ,Destroy:TObject.Destroy
};
/// TTextFormation enumeration
///  [line: 143, column: 3, file: System.Types]
var TTextFormation = { 256:"tfHex", 257:"tfOrdinal", 258:"tfFloat", 259:"tfQuote" };
/// function TStringHelper.ContainsHex(const Self: String) : Boolean
///  [line: 1280, column: 24, file: System.Types]
function TStringHelper$ContainsHex(Self$16) {
   var Result = false;
   var x$35 = 0;
   var LStart = 0;
   var LItem = "";
   var LLen = 0;
   Result = false;
   LLen = Self$16.length;
   if (LLen>=1) {
      LStart = 1;
      if (Self$16.charAt(0)=="$") {
         ++LStart;
         --LLen;
      } else {
         LItem = (Self$16.substr(0,1)).toLocaleUpperCase();
         Result = ("0123456789ABCDEF".indexOf(LItem)+1)>0;
         if (!Result) {
            return Result;
         }
      }
      if (LLen>=1) {
         var $temp4;
         for(x$35=LStart,$temp4=Self$16.length;x$35<=$temp4;x$35++) {
            LItem = (Self$16.charAt(x$35-1)).toLocaleUpperCase();
            Result = ("0123456789ABCDEF".indexOf(LItem)+1)>0;
            if (!Result) {
               break;
            }
         }
      }
   }
   return Result
}
/// function TStringHelper.ContainsOrdinal(const Self: String) : Boolean
///  [line: 1262, column: 24, file: System.Types]
function TStringHelper$ContainsOrdinal(Self$17) {
   var Result = false;
   var LLen$1 = 0,
      x$36 = 0;
   var LItem$1 = "";
   Result = false;
   LLen$1 = Self$17.length;
   if (LLen$1>=1) {
      var $temp5;
      for(x$36=1,$temp5=LLen$1;x$36<=$temp5;x$36++) {
         LItem$1 = Self$17.charAt(x$36-1);
         Result = ("0123456789".indexOf(LItem$1)+1)>0;
         if (!Result) {
            break;
         }
      }
   }
   return Result
}
/// function TStringHelper.ContainsFloat(const Self: String) : Boolean
///  [line: 1207, column: 24, file: System.Types]
function TStringHelper$ContainsFloat(Self$18) {
   var Result = false;
   var x$37 = 0;
   var LItem$2 = "";
   var LLen$2 = 0;
   var LLine = false;
   Result = false;
   LLen$2 = Self$18.length;
   if (LLen$2>=1) {
      LLine = false;
      var $temp6;
      for(x$37=1,$temp6=LLen$2;x$37<=$temp6;x$37++) {
         LItem$2 = Self$18.charAt(x$37-1);
         if (LItem$2==".") {
            if (x$37==1&&LLen$2==1) {
               break;
            }
            if (x$37==1&&LLen$2>1) {
               LLine = true;
               continue;
            }
            if (x$37>1&&x$37<LLen$2) {
               if (LLine) {
                  break;
               } else {
                  LLine = true;
                  continue;
               }
            } else {
               break;
            }
         }
         Result = ("0123456789".indexOf(LItem$2)+1)>0;
         if (!Result) {
            break;
         }
      }
   }
   return Result
}
/// function TStringHelper.ContainsQuote(const Self: String) : Boolean
///  [line: 1126, column: 24, file: System.Types]
function TStringHelper$ContainsQuote(Self$19) {
   var Result = false;
   var LLen$3 = 0;
   var LStart$1 = 0;
   var LFound = false;
   var LQuote = ["",""];
   Result = false;
   LLen$3 = Self$19.length;
   if (LLen$3>=2) {
      LStart$1 = 1;
      while (LStart$1<=LLen$3) {
         if (Self$19.charAt(LStart$1-1)==" ") {
            ++LStart$1;
            continue;
         } else {
            break;
         }
      }
      LQuote[false?1:0] = "'";
      LQuote[true?1:0] = "\"";
      if (Self$19.charAt(LStart$1-1)!=LQuote[true?1:0]||Self$19.charAt(LStart$1-1)!=LQuote[false?1:0]) {
         return Result;
      }
      if (LStart$1>=LLen$3) {
         return Result;
      }
      ++LStart$1;
      LFound = false;
      while (LStart$1<=LLen$3) {
         if (Self$19.charAt(LStart$1-1)!=LQuote[true?1:0]||Self$19.charAt(LStart$1-1)!=LQuote[false?1:0]) {
            LFound = true;
         }
         ++LStart$1;
      }
      if (!LFound) {
         return Result;
      }
      if (LStart$1==LLen$3) {
         Result = true;
         return Result;
      }
      while (LStart$1<=LLen$3) {
         if (Self$19.charAt(LStart$1-1)!=" ") {
            LFound = false;
            break;
         } else {
            ++LStart$1;
         }
      }
      Result = LFound;
   }
   return Result
}
/// TString = class (TObject)
///  [line: 462, column: 3, file: System.Types]
var TString = {
   $ClassName:"TString",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TString.CharCodeFor(const Character: Char) : Integer
   ///  [line: 858, column: 24, file: System.Types]
   ,CharCodeFor:function(Self, Character) {
      var Result = 0;
      Result = (Character).charCodeAt(0);
      return Result
   }
   /// function TString.DecodeBase64(TextToDecode: String) : String
   ///  [line: 1100, column: 24, file: System.Types]
   ,DecodeBase64:function(Self, TextToDecode) {
      var Result = "";
      var LCodec = null;
      LCodec = TCustomCodec.Create$21($New(TBase64Codec));
      try {
         Result = TBase64Codec.Decode$5(LCodec.ClassType,TextToDecode);
      } finally {
         TObject.Free(LCodec);
      }
      return Result
   }
   /// function TString.DecodeURI(const Text: String) : String
   ///  [line: 1041, column: 24, file: System.Types]
   ,DecodeURI:function(Self, Text$4) {
      var Result = "";
      Result = (Text$4).replace(new RegExp('\\+','g'),' ');
    Result = unescape(Result);
      return Result
   }
   /// function TString.DecodeUTF8(const BytesToDecode: TByteArray) : String
   ///  [line: 996, column: 24, file: System.Types]
   ,DecodeUTF8:function(Self, BytesToDecode) {
      var Result = "";
      var i = 0;
      var c$1 = 0;
      var c2 = 0;
      var c3 = 0;
      i = 0;
      while (i<BytesToDecode.length) {
         c$1 = BytesToDecode[i];
         if (c$1<128) {
            Result+=TString.FromCharCode(TString,c$1);
            ++i;
         } else if (c$1>191&&c$1<224) {
            c2 = BytesToDecode[i+1];
            Result+=TString.FromCharCode(TString,(((c$1&31)<<6)|(c2&63)));
            (i+= 2);
         } else {
            c2 = BytesToDecode[i+1];
            c3 = BytesToDecode[i+2];
            Result+=TString.FromCharCode(TString,(((c$1&15)<<12)|(((c2&63)<<6)|(c3&63))));
            (i+= 3);
         }
      }
      return Result
   }
   /// function TString.EncodeBase64(TextToEncode: String) : String
   ///  [line: 1088, column: 24, file: System.Types]
   ,EncodeBase64:function(Self, TextToEncode) {
      var Result = "";
      var LCodec$1 = null;
      LCodec$1 = TCustomCodec.Create$21($New(TBase64Codec));
      try {
         Result = TBase64Codec.Encode$5(LCodec$1.ClassType,TextToEncode);
      } finally {
         TObject.Free(LCodec$1);
      }
      return Result
   }
   /// function TString.EncodeURI(const Text: String) : String
   ///  [line: 1025, column: 24, file: System.Types]
   ,EncodeURI:function(Self, Text$5) {
      var Result = "";
      Result = escape(Text);
    Result = (Result).replace(new RegExp('\\+','g'),'%2B');
    Result = (Result).replace(new RegExp('%20','g'),'+');
      return Result
   }
   /// function TString.EncodeUTF8(TextToEncode: String) : TByteArray
   ///  [line: 967, column: 24, file: System.Types]
   ,EncodeUTF8:function(Self, TextToEncode$1) {
      var Result = [];
      var n = 0;
      var c$2 = 0;
      TextToEncode$1 = StrReplace(TextToEncode$1,"\r\n","\r");
      if (TextToEncode$1.length>0) {
         var $temp7;
         for(n=1,$temp7=TextToEncode$1.length;n<=$temp7;n++) {
            c$2 = TString.CharCodeFor(TString,TextToEncode$1.charAt(n-1));
            if (c$2<128) {
               Result.push(c$2);
            } else if (c$2>127&&c$2<2048) {
               Result.push(((c$2>>>6)|192));
               Result.push(((c$2&63)|128));
            } else {
               Result.push(((c$2>>>12)|224));
               Result.push((((c$2>>>6)&63)|128));
               Result.push(((c$2&63)|128));
            }
         }
      }
      return Result
   }
   /// function TString.Explode(const Value: String; const Delimiter: String) : TStrArray
   ///  [line: 837, column: 24, file: System.Types]
   ,Explode:function(Self, Value$1, Delimiter) {
      var Result = [];
      Result = (Value$1).split(Delimiter);
      return Result
   }
   /// function TString.ForEach(const Text: String; const Callback: TW3StringEvaluationProc) : String
   ///  [line: 1070, column: 24, file: System.Types]
   ,ForEach:function(Self, Text$6, Callback$1) {
      var Result = "";
      var x$38 = 0;
      var LSample = "";
      if (Callback$1) {
         var $temp8;
         for(x$38=1,$temp8=Text$6.length;x$38<=$temp8;x$38++) {
            LSample = Text$6.charAt(x$38-1);
            if (Callback$1(LSample)) {
               Result+=LSample;
            }
         }
      } else {
         Result = Text$6;
      }
      return Result
   }
   /// function TString.FromCharCode(const CharCode: Byte) : Char
   ///  [line: 876, column: 24, file: System.Types]
   ,FromCharCode:function(Self, CharCode$1) {
      var Result = "";
      Result = String.fromCharCode(CharCode$1);
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TInteger = class (TObject)
///  [line: 317, column: 3, file: System.Types]
var TInteger = {
   $ClassName:"TInteger",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TInteger.Diff(const Primary: Integer; const Secondary: Integer) : Integer
   ///  [line: 1719, column: 25, file: System.Types]
   ,Diff:function(Primary, Secondary) {
      var Result = 0;
      if (Primary!=Secondary) {
         if (Primary>Secondary) {
            Result = Primary-Secondary;
         } else {
            Result = Secondary-Primary;
         }
         if (Result<0) {
            Result = (Result-1)^(-1);
         }
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TInteger.EnsureRange(const aValue: Integer; const aMin: Integer; const aMax: Integer) : Integer
   ///  [line: 1673, column: 25, file: System.Types]
   ,EnsureRange:function(aValue$10, aMin, aMax) {
      return ClampInt(aValue$10,aMin,aMax);
   }
   /// function TInteger.FromPxStr(const aValue: String) : Integer
   ///  [line: 1608, column: 25, file: System.Types]
   ,FromPxStr:function(aValue$11) {
      var Result = 0;
      var LText = "";
      if (StrEndsWith((aValue$11).toLocaleLowerCase(),"px")) {
         LText = aValue$11.substr(0,(aValue$11.length-2));
         if (TVariant.IsNumber(LText)) {
            Result = parseInt(LText,10);
         }
      }
      return Result
   }
   /// function TInteger.SubtractSmallest(const First: Integer; const Second: Integer) : Integer
   ///  [line: 1645, column: 25, file: System.Types]
   ,SubtractSmallest:function(First, Second) {
      var Result = 0;
      if (First<Second) {
         Result = Second-First;
      } else {
         Result = First-Second;
      }
      return Result
   }
   /// function TInteger.ToNearest(const Value: Integer; const Factor: Integer) : Integer
   ///  [line: 1704, column: 25, file: System.Types]
   ,ToNearest:function(Value$2, Factor) {
      var Result = 0;
      var FTemp = 0;
      Result = Value$2;
      FTemp = Value$2%Factor;
      if (FTemp>0) {
         (Result+= (Factor-FTemp));
      }
      return Result
   }
   /// function TInteger.ToPxStr(const aValue: Integer) : String
   ///  [line: 1623, column: 25, file: System.Types]
   ,ToPxStr:function(aValue$12) {
      return aValue$12.toString()+"px";
   }
   /// function TInteger.WrapRange(const aValue: Integer; const aLowRange: Integer; const aHighRange: Integer) : Integer
   ///  [line: 1687, column: 25, file: System.Types]
   ,WrapRange:function(aValue$13, aLowRange, aHighRange) {
      var Result = 0;
      if (aValue$13>aHighRange) {
         Result = aLowRange+TInteger.Diff(aHighRange,(aValue$13-1));
         if (Result>aHighRange) {
            Result = TInteger.WrapRange(Result,aLowRange,aHighRange);
         }
      } else if (aValue$13<aLowRange) {
         Result = aHighRange-TInteger.Diff(aLowRange,(aValue$13+1));
         if (Result<aLowRange) {
            Result = TInteger.WrapRange(Result,aLowRange,aHighRange);
         }
      } else {
         Result = aValue$13;
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// function THandleHelper.Valid(const Self: THandle) : Boolean
///  [line: 1365, column: 24, file: System.Types]
function THandleHelper$Valid$4(Self$20) {
   var Result = false;
   Result = !( (Self$20 == undefined) || (Self$20 == null) );
   return Result
}
/// TFileAccessMode enumeration
///  [line: 83, column: 3, file: System.Types]
var TFileAccessMode = [ "fmOpenRead", "fmOpenWrite", "fmOpenReadWrite" ];
/// TEnumState enumeration
///  [line: 77, column: 3, file: System.Types]
var TEnumState = { 1:"esContinue", 0:"esAbort" };
/// TEnumResult enumeration
///  [line: 61, column: 3, file: System.Types]
var TEnumResult = { 160:"erContinue", 16:"erBreak" };
/// TDataTypeMap = record
///  [line: 358, column: 3, file: System.Types]
function Copy$TDataTypeMap(s,d) {
   d.Boolean=s.Boolean;
   d.Number$1=s.Number$1;
   d.String$1=s.String$1;
   d.Object$2=s.Object$2;
   d.Undefined=s.Undefined;
   d.Function$1=s.Function$1;
   return d;
}
function Clone$TDataTypeMap($) {
   return {
      Boolean:$.Boolean,
      Number$1:$.Number$1,
      String$1:$.String$1,
      Object$2:$.Object$2,
      Undefined:$.Undefined,
      Function$1:$.Function$1
   }
}
/// TBoolean = class (TObject)
///  [line: 307, column: 3, file: System.Types]
var TBoolean = {
   $ClassName:"TBoolean",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TBoolean.Binary(const Value: Boolean) : Integer
   ///  [line: 533, column: 25, file: System.Types]
   ,Binary:function(Value$3) {
      return pre_binary[Value$3?1:0];
   }
   ,Destroy:TObject.Destroy
};
/// EW3Exception = class (Exception)
///  [line: 167, column: 3, file: System.Types]
var EW3Exception = {
   $ClassName:"EW3Exception",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   /// constructor EW3Exception.CreateFmt(aText: String; const aValues: array of const)
   ///  [line: 1397, column: 26, file: System.Types]
   ,CreateFmt:function(Self, aText, aValues) {
      Exception.Create(Self,Format(aText,aValues.slice(0)));
      return Self
   }
   /// constructor EW3Exception.Create(const MethodName: String; const Instance: TObject; const ErrorText: String)
   ///  [line: 1402, column: 26, file: System.Types]
   ,Create$17:function(Self, MethodName, Instance$3, ErrorText) {
      var LCallerName = "";
      LCallerName = (Instance$3)?TObject.ClassName(Instance$3.ClassType):"Anonymous";
      EW3Exception.CreateFmt(Self,$R[0],[MethodName, LCallerName, ErrorText]);
      return Self
   }
   ,Destroy:Exception.Destroy
};
/// EW3OwnedObject = class (EW3Exception)
///  [line: 243, column: 3, file: System.Types]
var EW3OwnedObject = {
   $ClassName:"EW3OwnedObject",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function SetupTypeLUT() {
   __TYPE_MAP.Boolean = typeof(true);
   __TYPE_MAP.Number$1 = typeof(0);
   __TYPE_MAP.String$1 = typeof("");
   __TYPE_MAP.Object$2 = typeof(TVariant.CreateObject());
   __TYPE_MAP.Undefined = typeof(undefined);
   __TYPE_MAP.Function$1 = typeof(function () {
      /* null */
   });
};
/// TW3OwnedErrorObject = class (TW3OwnedObject)
///  [line: 63, column: 3, file: system.objects]
var TW3OwnedErrorObject = {
   $ClassName:"TW3OwnedErrorObject",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FOptions$3 = null;
   }
   /// constructor TW3OwnedErrorObject.Create(const AOwner: TObject)
   ///  [line: 144, column: 33, file: system.objects]
   ,Create$11:function(Self, AOwner$1) {
      TW3OwnedObject.Create$11(Self,AOwner$1);
      Self.FOptions$3 = TObject.Create($New(TW3ErrorObjectOptions));
      return Self
   }
   /// destructor TW3OwnedErrorObject.Destroy()
   ///  [line: 150, column: 32, file: system.objects]
   ,Destroy:function(Self) {
      TObject.Free(Self.FOptions$3);
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3OwnedErrorObject.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3CustomComponent = class (TW3OwnedErrorObject)
///  [line: 19, column: 3, file: System.Widget]
var TW3CustomComponent = {
   $ClassName:"TW3CustomComponent",$Parent:TW3OwnedErrorObject
   ,$Init:function ($) {
      TW3OwnedErrorObject.$Init($);
      $.TagValue = 0;
      $.Name = "";
      $.FInitialized = false;
   }
   /// constructor TW3CustomComponent.Create(const AOwner: TObject)
   ///  [line: 73, column: 32, file: System.Widget]
   ,Create$11:function(Self, AOwner$2) {
      TW3OwnedErrorObject.Create$11(Self,AOwner$2);
      Self.FInitialized = true;
      TW3CustomComponent.InitializeObject$(Self);
      return Self
   }
   /// constructor TW3CustomComponent.CreateEx(const AOwner: TObject)
   ///  [line: 86, column: 32, file: System.Widget]
   ,CreateEx:function(Self, AOwner$3) {
      TW3OwnedErrorObject.Create$11(Self,AOwner$3);
      Self.FInitialized = false;
      return Self
   }
   /// destructor TW3CustomComponent.Destroy()
   ///  [line: 95, column: 31, file: System.Widget]
   ,Destroy:function(Self) {
      if (Self.FInitialized) {
         TW3CustomComponent.FinalizeObject$(Self);
      }
      TW3OwnedErrorObject.Destroy(Self);
   }
   /// procedure TW3CustomComponent.FinalizeObject()
   ///  [line: 110, column: 30, file: System.Widget]
   ,FinalizeObject:function(Self) {
      /* null */
   }
   /// procedure TW3CustomComponent.InitializeObject()
   ///  [line: 102, column: 30, file: System.Widget]
   ,InitializeObject:function(Self) {
      /* null */
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
};
TW3CustomComponent.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Component = class (TW3CustomComponent)
///  [line: 57, column: 3, file: System.Widget]
var TW3Component = {
   $ClassName:"TW3Component",$Parent:TW3CustomComponent
   ,$Init:function ($) {
      TW3CustomComponent.$Init($);
   }
   ,Destroy:TW3CustomComponent.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3CustomComponent.Create$11
   ,FinalizeObject:TW3CustomComponent.FinalizeObject
   ,InitializeObject:TW3CustomComponent.InitializeObject
};
TW3Component.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3RepeatResult enumeration
///  [line: 55, column: 3, file: System.Time]
var TW3RepeatResult = { 241:"rrContinue", 242:"rrStop", 243:"rrDispose" };
/// TW3CustomRepeater = class (TObject)
///  [line: 71, column: 3, file: System.Time]
var TW3CustomRepeater = {
   $ClassName:"TW3CustomRepeater",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FActive = false;
      $.FDelay$1 = 0;
      $.FHandle$1 = undefined;
   }
   /// procedure TW3CustomRepeater.AllocTimer()
   ///  [line: 446, column: 29, file: System.Time]
   ,AllocTimer:function(Self) {
      if (Self.FHandle$1) {
         TW3CustomRepeater.FreeTimer(Self);
      }
      Self.FHandle$1 = TW3Dispatch.SetInterval(TW3Dispatch,$Event0(Self,TW3CustomRepeater.CBExecute$),Self.FDelay$1);
   }
   /// destructor TW3CustomRepeater.Destroy()
   ///  [line: 400, column: 30, file: System.Time]
   ,Destroy:function(Self) {
      if (Self.FActive) {
         TW3CustomRepeater.SetActive(Self,false);
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomRepeater.FreeTimer()
   ///  [line: 455, column: 29, file: System.Time]
   ,FreeTimer:function(Self) {
      if (Self.FHandle$1) {
         TW3Dispatch.ClearInterval(TW3Dispatch,Self.FHandle$1);
         Self.FHandle$1 = undefined;
      }
   }
   /// procedure TW3CustomRepeater.SetActive(const NewActive: Boolean)
   ///  [line: 414, column: 29, file: System.Time]
   ,SetActive:function(Self, NewActive) {
      if (NewActive!=Self.FActive) {
         try {
            if (Self.FActive) {
               TW3CustomRepeater.FreeTimer(Self);
            } else {
               TW3CustomRepeater.AllocTimer(Self);
            }
         } finally {
            Self.FActive = NewActive;
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,CBExecute$:function($){return $.ClassType.CBExecute($)}
};
/// TW3Dispatch = class (TObject)
///  [line: 1296, column: 3, file: SmartCL.Components]
var TW3Dispatch = {
   $ClassName:"TW3Dispatch",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3Dispatch.ClearInterval(const Handle: TW3DispatchHandle)
   ///  [line: 234, column: 29, file: System.Time]
   ,ClearInterval:function(Self, Handle$20) {
      clearInterval(Handle$20);
   }
   /// function TW3Dispatch.Execute(const EntryPoint: TProcedureRef; const WaitForInMs: Integer) : TW3DispatchHandle
   ///  [line: 264, column: 28, file: System.Time]
   ,Execute:function(Self, EntryPoint, WaitForInMs) {
      var Result = undefined;
      Result = setTimeout(EntryPoint,WaitForInMs);
      return Result
   }
   /// procedure TW3Dispatch.ExecuteDocumentReady(const OnReady: TProcedureRef)
   ///  [line: 101, column: 29, file: SmartCL.Time]
   ,ExecuteDocumentReady:function(Self, OnReady$3) {
      if (TW3Dispatch.Ready(TW3Dispatch)) {
         OnReady$3();
      } else {
         TW3Dispatch.Execute(TW3Dispatch,function () {
            if (TW3Dispatch.Ready(TW3Dispatch)) {
               OnReady$3();
            } else {
               TW3Dispatch.ExecuteDocumentReady(Self,OnReady$3);
            }
         },10);
      }
   }
   /// function TW3Dispatch.Ready() : Boolean
   ///  [line: 120, column: 28, file: SmartCL.Time]
   ,Ready:function(Self) {
      var Result = false;
      Result = (document.readyState == "complete");
      return Result
   }
   /// procedure TW3Dispatch.RepeatExecute(const Entrypoint: TProcedureRef; const RepeatCount: Integer; const IntervalInMs: Integer)
   ///  [line: 272, column: 29, file: System.Time]
   ,RepeatExecute:function(Self, Entrypoint$1, RepeatCount, IntervalInMs) {
      if (Entrypoint$1) {
         if (RepeatCount>0) {
            Entrypoint$1();
            if (RepeatCount>1) {
               TW3Dispatch.Execute(Self,function () {
                  TW3Dispatch.RepeatExecute(Self,Entrypoint$1,(RepeatCount-1),IntervalInMs);
               },IntervalInMs);
            }
         } else {
            Entrypoint$1();
            TW3Dispatch.Execute(Self,function () {
               TW3Dispatch.RepeatExecute(Self,Entrypoint$1,(-1),IntervalInMs);
            },IntervalInMs);
         }
      }
   }
   /// function TW3Dispatch.RequestAnimationFrame(const Entrypoint: TProcedureRef) : TW3DispatchHandle
   ///  [line: 84, column: 28, file: SmartCL.Time]
   ,RequestAnimationFrame:function(Self, Entrypoint$2) {
      var Result = undefined;
      if (!vRequestAnimFrame) {
         InitAnimationFrameShim();
      }
      Result = vRequestAnimFrame(Entrypoint$2);
      return Result
   }
   /// function TW3Dispatch.SetInterval(const Entrypoint: TProcedureRef; const IntervalDelayInMS: Integer) : TW3DispatchHandle
   ///  [line: 226, column: 28, file: System.Time]
   ,SetInterval:function(Self, Entrypoint$3, IntervalDelayInMS) {
      var Result = undefined;
      Result = setInterval(Entrypoint$3,IntervalDelayInMS);
      return Result
   }
   /// function TW3Dispatch.SetTimeOut(const Entrypoint: TProcedureRef; const WaitForInMs: Integer) : TW3DispatchHandle
   ///  [line: 211, column: 28, file: System.Time]
   ,SetTimeOut:function(Self, Entrypoint$4, WaitForInMs$1) {
      var Result = undefined;
      Result = setTimeout(Entrypoint$4,WaitForInMs$1);
      return Result
   }
   /// procedure TW3Dispatch.WaitFor(const Controls: array of TW3MovableControl; const CB: TProcedureRef)
   ///  [line: 1376, column: 29, file: SmartCL.Components]
   ,WaitFor:function(Self, Controls, CB) {
      var LReady = 0,
         a$309 = 0;
      var LChild = null,
         LElement = undefined,
         Style$5 = undefined,
         xdisp = "",
         xvisible = "";
      if (Controls.length>0) {
         if (CB) {
            LReady = 0;
            var $temp9;
            for(a$309=0,$temp9=Controls.length;a$309<$temp9;a$309++) {
               LChild = Controls[a$309];
               if (!LChild) {
                  ++LReady;
                  continue;
               }
               LElement = LChild.FHandle$3;
               Style$5 = TW3CustomBrowserAPI.GetComputedStylesFor(BrowserAPI().ClassType,LElement);
               if (Style$5) {
                  xdisp = w3_GetStyleAsStr(LElement,"display");
                  xvisible = w3_GetStyleAsStr(LElement,"visibility");
                  if (xdisp!="") {
                     if (xvisible=="visible") {
                        if (TW3TagObj.Showing$(LChild)) {
                           ++LReady;
                        } else {
                           break;
                        }
                     } else {
                        break;
                     }
                  } else {
                     break;
                  }
               } else {
                  break;
               }
            }
            if (LReady==Controls.length) {
               TW3Dispatch.RequestAnimationFrame(TW3Dispatch,CB);
            } else {
               TW3Dispatch.Execute(TW3Dispatch,function () {
                  TW3Dispatch.WaitFor(TW3Dispatch,Controls,CB);
               },50);
            }
         }
      }
   }
   ,Destroy:TObject.Destroy
};
function GetMilliseconds() {
   var Result = 0;
   Result = Date.now();
   return Result
};
/// TW3ErrorObjectOptions = class (TObject)
///  [line: 31, column: 3, file: system.objects]
var TW3ErrorObjectOptions = {
   $ClassName:"TW3ErrorObjectOptions",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TRTLDatatype enumeration
///  [line: 23, column: 3, file: System.Types.Convert]
var TRTLDatatype = [ "itUnknown", "itBoolean", "itByte", "itChar", "itWord", "itLong", "itInt16", "itInt32", "itFloat32", "itFloat64", "itString" ];
/// TDatatype = class (TObject)
///  [line: 45, column: 3, file: System.Types.Convert]
var TDatatype = {
   $ClassName:"TDatatype",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TDatatype.BooleanToBytes(Value: Boolean) : TByteArray
   ///  [line: 616, column: 26, file: System.Types.Convert]
   ,BooleanToBytes:function(Self, Value$4) {
      var Result = [];
      if (Value$4) {
         Result.push(1);
      } else {
         Result.push(0);
      }
      return Result
   }
   /// function TDatatype.BytesToBoolean(const Data: TByteArray) : Boolean
   ///  [line: 828, column: 26, file: System.Types.Convert]
   ,BytesToBoolean:function(Self, Data$4) {
      var Result = false;
      if (Data$4.length>=1) {
         Result = Data$4[0]>0;
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [Bool] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToFloat32(const Data: TByteArray) : Float
   ///  [line: 796, column: 26, file: System.Types.Convert]
   ,BytesToFloat32:function(Self, Data$5) {
      var Result = 0;
      if (Data$5.length>=4) {
         __CONV_VIEW.setUint8(0,Data$5[0]);
         __CONV_VIEW.setUint8(1,Data$5[1]);
         __CONV_VIEW.setUint8(2,Data$5[2]);
         __CONV_VIEW.setUint8(3,Data$5[3]);
         Result = __CONV_VIEW.getFloat32(0,a$14);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [float32] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToFloat64(const Data: TByteArray) : Float
   ///  [line: 810, column: 26, file: System.Types.Convert]
   ,BytesToFloat64:function(Self, Data$6) {
      var Result = 0;
      if (Data$6.length>=8) {
         __CONV_VIEW.setUint8(0,Data$6[0]);
         __CONV_VIEW.setUint8(1,Data$6[1]);
         __CONV_VIEW.setUint8(2,Data$6[2]);
         __CONV_VIEW.setUint8(3,Data$6[3]);
         __CONV_VIEW.setUint8(4,Data$6[4]);
         __CONV_VIEW.setUint8(5,Data$6[5]);
         __CONV_VIEW.setUint8(6,Data$6[6]);
         __CONV_VIEW.setUint8(7,Data$6[7]);
         Result = __CONV_VIEW.getFloat64(0,a$14);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [float32] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToInt16(const Data: TByteArray) : Integer
   ///  [line: 784, column: 26, file: System.Types.Convert]
   ,BytesToInt16:function(Self, Data$7) {
      var Result = 0;
      if (Data$7.length>=2) {
         __CONV_VIEW.setUint8(0,Data$7[0]);
         __CONV_VIEW.setUint8(1,Data$7[1]);
         Result = __CONV_VIEW.getInt16(0,a$14);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [int16] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToInt32(const Data: TByteArray) : Integer
   ///  [line: 770, column: 26, file: System.Types.Convert]
   ,BytesToInt32:function(Self, Data$8) {
      var Result = 0;
      if (Data$8.length>=4) {
         __CONV_VIEW.setUint8(0,Data$8[0]);
         __CONV_VIEW.setUint8(1,Data$8[1]);
         __CONV_VIEW.setUint8(2,Data$8[2]);
         __CONV_VIEW.setUint8(3,Data$8[3]);
         Result = __CONV_VIEW.getUint32(0,a$14);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [int32] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToString(const Data: TByteArray) : String
   ///  [line: 601, column: 26, file: System.Types.Convert]
   ,BytesToString:function(Self, Data$9) {
      var Result = "";
      var x$39 = 0;
      var LChar = "";
      if (Data$9.length>0) {
         var $temp10;
         for(x$39=0,$temp10=Data$9.length;x$39<$temp10;x$39++) {
            LChar = TString.FromCharCode(TString,Data$9[x$39]);
            Result+=LChar;
         }
      }
      return Result
   }
   /// function TDatatype.BytesToTypedArray(const Values: TByteArray) : TMemoryHandle
   ///  [line: 354, column: 26, file: System.Types.Convert]
   ,BytesToTypedArray:function(Self, Values$8) {
      var Result = undefined;
      var mLen = 0;
      mLen = Values$8.length;
      if (mLen>0) {
         Result = new Uint8Array(mLen);
         (Result).set(Values$8,0);
      } else {
         Result = null;
      }
      return Result
   }
   /// function TDatatype.BytesToVariant(Data: TByteArray) : Variant
   ///  [line: 652, column: 26, file: System.Types.Convert]
   ,BytesToVariant:function(Self, Data$10) {
      var Result = undefined;
      switch (TDatatype.BytesToInt32(Self,Data$10)) {
         case 4027514882 :
            Data$10.splice(0,4)
            ;
            Result = TDatatype.BytesToBoolean(Self,Data$10);
            break;
         case 4027514883 :
            Data$10.splice(0,4)
            ;
            Result = Data$10[0];
            break;
         case 4027514884 :
            Data$10.splice(0,4)
            ;
            Result = TDatatype.BytesToInt16(Self,Data$10);
            break;
         case 4027514885 :
            Data$10.splice(0,4)
            ;
            Result = TDatatype.BytesToInt32(Self,Data$10);
            break;
         case 4027514886 :
            Data$10.splice(0,4)
            ;
            Result = TDatatype.BytesToFloat32(Self,Data$10);
            break;
         case 4027514887 :
            Data$10.splice(0,4)
            ;
            Result = TDatatype.BytesToFloat64(Self,Data$10);
            break;
         case 4027514888 :
            Data$10.splice(0,4)
            ;
            try {
               Result = TString.DecodeUTF8(TString,Data$10);
            } catch ($e) {
               var e$3 = $W($e);
               throw Exception.Create($New(EW3Exception),e$3.FMessage);
            }
            break;
         default :
            throw Exception.Create($New(EDatatype),"Failed to convert bytes[] to intrinsic type, unknown identifier error");
      }
      return Result
   }
   /// function TDatatype.ByteToChar(const Value: Byte) : Char
   ///  [line: 552, column: 26, file: System.Types.Convert]
   ,ByteToChar:function(Self, Value$5) {
      var Result = "";
      Result = String.fromCharCode(Value$5);
      return Result
   }
   /// function TDatatype.CharToByte(const Value: Char) : Word
   ///  [line: 559, column: 26, file: System.Types.Convert]
   ,CharToByte:function(Self, Value$6) {
      var Result = 0;
      Result = (Value$6).charCodeAt(0);
      return Result
   }
   /// function TDatatype.CreateGUID() : String
   ///  [line: 309, column: 26, file: System.Types.Convert]
   ,CreateGUID:function(Self) {
      var Result = "";
      var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    Result = s.join("");
      Result = (Result).toUpperCase();
      return Result
   }
   /// function TDatatype.Float32ToBytes(Value: float32) : TByteArray
   ///  [line: 623, column: 26, file: System.Types.Convert]
   ,Float32ToBytes:function(Self, Value$7) {
      var Result = [];
      __CONV_VIEW.setFloat32(0,Value$7,a$14);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      Result.push(__CONV_VIEW.getUint8(2));
      Result.push(__CONV_VIEW.getUint8(3));
      return Result
   }
   /// function TDatatype.Float64ToBytes(Value: float64) : TByteArray
   ///  [line: 632, column: 26, file: System.Types.Convert]
   ,Float64ToBytes:function(Self, Value$8) {
      var Result = [];
      __CONV_VIEW.setFloat64(0,Number(Value$8),a$14);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      Result.push(__CONV_VIEW.getUint8(2));
      Result.push(__CONV_VIEW.getUint8(3));
      Result.push(__CONV_VIEW.getUint8(4));
      Result.push(__CONV_VIEW.getUint8(5));
      Result.push(__CONV_VIEW.getUint8(6));
      Result.push(__CONV_VIEW.getUint8(7));
      return Result
   }
   /// function TDatatype.Int16ToBytes(Value: Integer) : TByteArray
   ///  [line: 645, column: 26, file: System.Types.Convert]
   ,Int16ToBytes:function(Self, Value$9) {
      var Result = [];
      __CONV_VIEW.setInt16(0,Value$9,a$14);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      return Result
   }
   /// function TDatatype.Int32ToBytes(Value: Integer) : TByteArray
   ///  [line: 761, column: 26, file: System.Types.Convert]
   ,Int32ToBytes:function(Self, Value$10) {
      var Result = [];
      __CONV_VIEW.setUint32(0,Value$10,a$14);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      Result.push(__CONV_VIEW.getUint8(2));
      Result.push(__CONV_VIEW.getUint8(3));
      return Result
   }
   /// function TDatatype.NameOfType(const Kind: TRTLDatatype) : String
   ///  [line: 284, column: 26, file: System.Types.Convert]
   ,NameOfType:function(Self, Kind) {
      return _NAMES[Kind];
   }
   /// function TDatatype.SizeOfType(const Kind: TRTLDatatype) : Integer
   ///  [line: 279, column: 26, file: System.Types.Convert]
   ,SizeOfType:function(Self, Kind$1) {
      return __SIZES[Kind$1];
   }
   /// function TDatatype.StringToBytes(const Value: String) : TByteArray
   ///  [line: 582, column: 27, file: System.Types.Convert]
   ,StringToBytes:function(Self, Value$11) {
      var Result = [];
      var x$40 = 0;
      var LCode = 0;
      var LLen$4 = 0;
      LLen$4 = Value$11.length;
      if (LLen$4>0) {
         var $temp11;
         for(x$40=0,$temp11=LLen$4;x$40<$temp11;x$40++) {
            LCode = (Value$11).charCodeAt(x$40);
            Result.push(LCode);
         }
      }
      return Result
   }
   /// function TDatatype.TypeByName(TypeName: String) : TRTLDatatype
   ///  [line: 289, column: 26, file: System.Types.Convert]
   ,TypeByName:function(Self, TypeName$1) {
      var Result = 0;
      var x$41 = 0,
         a$310 = 0;
      var Name$10 = "";
      TypeName$1 = Trim$_String_((TypeName$1).toLocaleLowerCase());
      if (TypeName$1.length>0) {
         x$41 = 0;
         for(a$310=0;a$310<=10;a$310++) {
            Name$10 = _NAMES[a$310];
            if ((Name$10).toLocaleLowerCase()==TypeName$1) {
               Result = x$41;
               break;
            }
            ++x$41;
         }
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TDatatype.TypedArrayToBytes(const Value: TDefaultBufferType) : TByteArray
   ///  [line: 370, column: 27, file: System.Types.Convert]
   ,TypedArrayToBytes:function(Self, Value$12) {
      var Result = [];
      if (TVariant.ValidRef(Value$12)) {
         Result = Array.prototype.slice.call(Value$12);
      }
      return Result
   }
   /// function TDatatype.TypedArrayToStr(const Value: TDefaultBufferType) : String
   ///  [line: 419, column: 26, file: System.Types.Convert]
   ,TypedArrayToStr:function(Self, Value$13) {
      var Result = "";
      var x$42 = 0;
      if (TVariant.ValidRef(Value$13)) {
         if (Value$13.length>0) {
            var $temp12;
            for(x$42=0,$temp12=Value$13.length;x$42<$temp12;x$42++) {
               Result += String.fromCharCode((Value$13)[x$42]);
            }
         }
      }
      return Result
   }
   /// function TDatatype.TypedArrayToUInt32(const Value: TDefaultBufferType) : Integer
   ///  [line: 409, column: 26, file: System.Types.Convert]
   ,TypedArrayToUInt32:function(Self, Value$14) {
      var Result = 0;
      var mTemp$1 = null;
      mTemp$1 = new Uint32Array((Value$14).buffer);
      Result = mTemp$1[0];
      return Result
   }
   /// function TDatatype.VariantToBytes(Value: Variant) : TByteArray
   ///  [line: 703, column: 26, file: System.Types.Convert]
   ,VariantToBytes:function(Self, Value$15) {
      var Result = [];
      var chunk = [];
      function IsFloat32(x$43) {
         var Result = false;
         Result = isFinite(x$43) && x$43 == Math.fround(x$43);
         return Result
      };
      switch (TW3VariantHelper$DataType(Value$15)) {
         case 2 :
            Result = TDatatype.Int32ToBytes(Self,4027514882);
            Result.pusha(TDatatype.BooleanToBytes(Self,(Value$15?true:false)));
            break;
         case 3 :
            if (Value$15>=0&&Value$15<=255) {
               Result = TDatatype.Int32ToBytes(Self,4027514883);
               Result.push(parseInt(Value$15,10));
            } else if (Value$15>=0&&Value$15<65536) {
               Result = TDatatype.Int32ToBytes(Self,4027514884);
               Result.pusha(TDatatype.Int16ToBytes(Self,parseInt(Value$15,10)));
            } else {
               Result = TDatatype.Int32ToBytes(Self,4027514885);
               Result.pusha(TDatatype.Int32ToBytes(Self,parseInt(Value$15,10)));
            }
            break;
         case 4 :
            if (IsFloat32(Value$15)) {
               Result = TDatatype.Int32ToBytes(Self,4027514886);
               Result.pusha(TDatatype.Float32ToBytes(Self,Number(Value$15)));
            } else {
               Result = TDatatype.Int32ToBytes(Self,4027514887);
               Result.pusha(TDatatype.Float64ToBytes(Self,Number(Value$15)));
            }
            break;
         case 5 :
            Result = TDatatype.Int32ToBytes(Self,4027514888);
            chunk = TString.EncodeUTF8(TString,String(Value$15));
            Result.pusha(chunk);
            break;
         default :
            throw Exception.Create($New(EDatatype),"Invalid datatype, byte conversion failed error");
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// EDatatype = class (EW3Exception)
///  [line: 42, column: 3, file: System.Types.Convert]
var EDatatype = {
   $ClassName:"EDatatype",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function SetupConversionLUT() {
   try {
      __CONV_BUFFER = new ArrayBuffer(16);
      __CONV_VIEW   = new DataView(__CONV_BUFFER);
      __CONV_ARRAY = new Uint8Array(__CONV_BUFFER,0,15);
   } catch ($e) {
      var e$4 = $W($e);
      /* null */
   }
};
/// TUnManaged = class (TObject)
///  [line: 102, column: 3, file: System.Memory]
var TUnManaged = {
   $ClassName:"TUnManaged",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TUnManaged.AllocMemA(const Size: Integer) : TMemoryHandle
   ///  [line: 241, column: 27, file: System.Memory]
   ,AllocMemA:function(Self, Size$8) {
      var Result = undefined;
      if (Size$8>0) {
         Result = new Uint8Array(Size$8);
      } else {
         Result = null;
      }
      return Result
   }
   /// function TUnManaged.ReAllocMemA(Memory: TMemoryHandle; Size: Integer) : TMemoryHandle
   ///  [line: 259, column: 27, file: System.Memory]
   ,ReAllocMemA:function(Self, Memory$1, Size$9) {
      var Result = undefined;
      if (Memory$1) {
         if (Size$9>0) {
            Result = new Uint8Array(Size$9);
            TMarshal.Move$1(TMarshal,Memory$1,0,Result,0,Size$9);
         }
      } else {
         Result = TUnManaged.AllocMemA(Self,Size$9);
      }
      return Result
   }
   /// function TUnManaged.ReadMemoryA(const Memory: TMemoryHandle; const Offset: Integer; Size: Integer) : TMemoryHandle
   ///  [line: 346, column: 27, file: System.Memory]
   ,ReadMemoryA:function(Self, Memory$2, Offset$4, Size$10) {
      var Result = undefined;
      var mTotal = 0;
      if (Memory$2) {
         if (Offset$4>=0) {
            mTotal = Offset$4+Size$10;
            if (mTotal>Memory$2.length) {
               Size$10 = parseInt((Memory$2.length-mTotal),10);
            }
            if (Size$10>0) {
               Result = new Uint8Array(Memory$2.buffer.slice(Offset$4,Size$10));
            }
         }
      }
      return Result
   }
   /// function TUnManaged.WriteMemoryA(const Memory: TMemoryHandle; const Offset: Integer; const Data: TMemoryHandle) : Integer
   ///  [line: 312, column: 27, file: System.Memory]
   ,WriteMemoryA:function(Self, Memory$3, Offset$5, Data$11) {
      var Result = 0;
      var mTotal$1 = 0;
      var mChunk = null,
         mTemp$2 = null;
      if (Memory$3) {
         if (Data$11) {
            mTotal$1 = parseInt((Offset$5+Data$11.length),10);
            if (mTotal$1>Memory$3.length) {
               Result = parseInt((Memory$3.length-mTotal$1),10);
            } else {
               Result = parseInt(Data$11.length,10);
            }
            if (Result>0) {
               if (Offset$5+Data$11.length<=Memory$3.length) {
                  Memory$3.set(Data$11,Offset$5);
               } else {
                  mChunk = Data$11.buffer.slice(0,Result-1);
                  mTemp$2 = new Uint8Array(mChunk);
                  Memory$3.set(mTemp$2,Offset$5);
               }
            }
         }
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// function TMemoryHandleHelper.Valid(const Self: TMemoryHandle) : Boolean
///  [line: 208, column: 30, file: System.Memory]
function TMemoryHandleHelper$Valid$5(Self$21) {
   var Result = false;
   Result = !( (Self$21 == undefined) || (Self$21 == null) );
   return Result
}
/// function TMemoryHandleHelper.Defined(const Self: TMemoryHandle) : Boolean
///  [line: 215, column: 30, file: System.Memory]
function TMemoryHandleHelper$Defined$1(Self$22) {
   var Result = false;
   Result = !(self == undefined);
   return Result
}
/// TMarshal = class (TObject)
///  [line: 129, column: 3, file: System.Memory]
var TMarshal = {
   $ClassName:"TMarshal",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TMarshal.Move(const Source: TMemoryHandle; const SourceStart: Integer; const Target: TMemoryHandle; const TargetStart: Integer; const Size: Integer)
   ///  [line: 558, column: 26, file: System.Memory]
   ,Move$1:function(Self, Source, SourceStart, Target$1, TargetStart, Size$11) {
      var mRef = null;
      if (TMemoryHandleHelper$Valid$5(Source)&&SourceStart>=0&&TMemoryHandleHelper$Valid$5(Target$1)&&TargetStart>=0&&Size$11>0) {
         mRef = Source.subarray(SourceStart,SourceStart+Size$11);
         Target$1.set(mRef,TargetStart);
      }
   }
   /// procedure TMarshal.Move(const Source: TAddress; const Target: TAddress; const Size: Integer)
   ///  [line: 580, column: 26, file: System.Memory]
   ,Move:function(Self, Source$1, Target$2, Size$12) {
      if (Source$1!==null) {
         if (Target$2!==null) {
            if (Size$12>0) {
               TMarshal.Move$1(Self,Source$1.FBuffer,Source$1.FOffset,Target$2.FBuffer,Target$2.FOffset,Size$12);
            }
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TAddress = class (TObject)
///  [line: 71, column: 3, file: System.Streams]
var TAddress = {
   $ClassName:"TAddress",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBuffer = undefined;
      $.FOffset = 0;
   }
   /// constructor TAddress.Create(const Memory: TBinaryData)
   ///  [line: 220, column: 22, file: system.memory.buffer]
   ,Create$20:function(Self, Memory$4) {
      if (Memory$4!==null&&TAllocation.GetSize$3(Memory$4)>0) {
         TAddress.Create$18(Self,TAllocation.GetHandle(Memory$4),0);
      } else {
         throw Exception.Create($New(Exception),"Invalid memory object error");
      }
      return Self
   }
   /// constructor TAddress.Create(const Stream: TStream)
   ///  [line: 216, column: 22, file: System.Streams]
   ,Create$19:function(Self, Stream) {
      var mRef$1 = undefined;
      if ($Is(Stream,TMemoryStream)) {
         mRef$1 = TAllocation.GetHandle($As(Stream,TMemoryStream).FBuffer$1);
         if (mRef$1) {
            TAddress.Create$18(Self,mRef$1,0);
         } else {
            throw Exception.Create($New(EAddress),$R[3]);
         }
      } else {
         throw Exception.Create($New(EAddress),$R[4]);
      }
      return Self
   }
   /// constructor TAddress.Create(const Segment: TMemoryHandle; const Offset: Integer)
   ///  [line: 643, column: 22, file: System.Memory]
   ,Create$18:function(Self, Segment$1, Offset$6) {
      TObject.Create(Self);
      if (TMemoryHandleHelper$Defined$1(Segment$1)&&TMemoryHandleHelper$Valid$5(Segment$1)) {
         Self.FBuffer = Segment$1;
      } else {
         throw Exception.Create($New(EAddress),"Failed to derive address, invalid segment error");
      }
      if (Offset$6>=0) {
         Self.FOffset = Offset$6;
      } else {
         throw Exception.Create($New(EAddress),"Failed to derive address, invalid offset error");
      }
      return Self
   }
   /// destructor TAddress.Destroy()
   ///  [line: 655, column: 21, file: System.Memory]
   ,Destroy:function(Self) {
      Self.FBuffer = null;
      Self.FOffset = 0;
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// EAddress = class (EW3Exception)
///  [line: 82, column: 3, file: System.Memory]
var EAddress = {
   $ClassName:"EAddress",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TStream = class (TObject)
///  [line: 80, column: 3, file: System.Streams]
var TStream = {
   $ClassName:"TStream",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TStream.CopyFrom(const Source: TStream; Count: Integer) : Integer
   ///  [line: 462, column: 18, file: System.Streams]
   ,CopyFrom:function(Self, Source$2, Count$13) {
      var Result = 0;
      Result = 0;
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
      return Result
   }
   /// function TStream.DataGetSize() : Integer
   ///  [line: 428, column: 18, file: System.Streams]
   ,DataGetSize:function(Self) {
      return TStream.GetSize$1$(Self);
   }
   /// function TStream.DataOffset() : Integer
   ///  [line: 422, column: 18, file: System.Streams]
   ,DataOffset:function(Self) {
      return TStream.GetPosition$(Self);
   }
   /// function TStream.DataRead(const Offset: Integer; const ByteCount: Integer) : TByteArray
   ///  [line: 434, column: 19, file: System.Streams]
   ,DataRead:function(Self, Offset$7, ByteCount) {
      return TStream.ReadBuffer$(Self,Offset$7,ByteCount);
   }
   /// procedure TStream.DataWrite(const Offset: Integer; const Bytes: TByteArray)
   ///  [line: 440, column: 19, file: System.Streams]
   ,DataWrite:function(Self, Offset$8, Bytes$1) {
      TStream.WriteBuffer$(Self,Bytes$1,Offset$8);
   }
   /// function TStream.GetPosition() : Integer
   ///  [line: 468, column: 18, file: System.Streams]
   ,GetPosition:function(Self) {
      var Result = 0;
      Result = 0;
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
      return Result
   }
   /// function TStream.GetSize() : Integer
   ///  [line: 490, column: 18, file: System.Streams]
   ,GetSize$1:function(Self) {
      var Result = 0;
      Result = 0;
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
      return Result
   }
   /// function TStream.Read(const Count: Integer) : TByteArray
   ///  [line: 445, column: 18, file: System.Streams]
   ,Read:function(Self, Count$14) {
      return TStream.ReadBuffer$(Self,TStream.GetPosition$(Self),Count$14);
   }
   /// function TStream.ReadBuffer(Offset: Integer; Count: Integer) : TByteArray
   ///  [line: 502, column: 18, file: System.Streams]
   ,ReadBuffer:function(Self, Offset$9, Count$15) {
      var Result = [];
      Result.length=0;
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
      return Result
   }
   /// function TStream.Seek(const Offset: Integer; Origin: TStreamSeekOrigin) : Integer
   ///  [line: 484, column: 18, file: System.Streams]
   ,Seek:function(Self, Offset$10, Origin) {
      var Result = 0;
      Result = 0;
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
      return Result
   }
   /// procedure TStream.SetPosition(NewPosition: Integer)
   ///  [line: 474, column: 19, file: System.Streams]
   ,SetPosition:function(Self, NewPosition) {
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
   }
   /// procedure TStream.SetSize(NewSize: Integer)
   ///  [line: 479, column: 19, file: System.Streams]
   ,SetSize:function(Self, NewSize) {
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
   }
   /// function TStream.Skip(Amount: Integer) : Integer
   ///  [line: 496, column: 18, file: System.Streams]
   ,Skip:function(Self, Amount) {
      var Result = 0;
      Result = 0;
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
      return Result
   }
   /// function TStream.Write(const Buffer: TByteArray) : Integer
   ///  [line: 450, column: 18, file: System.Streams]
   ,Write$1:function(Self, Buffer$1) {
      var Result = 0;
      TStream.WriteBuffer$(Self,Buffer$1,TStream.GetPosition$(Self));
      Result = Buffer$1.length;
      return Result
   }
   /// procedure TStream.WriteBuffer(const Buffer: TByteArray; Offset: Integer)
   ///  [line: 508, column: 19, file: System.Streams]
   ,WriteBuffer:function(Self, Buffer$2, Offset$11) {
      throw Exception.Create($New(EStreamNotImplemented),$R[5]);
   }
   ,Destroy:TObject.Destroy
   ,CopyFrom$:function($){return $.ClassType.CopyFrom.apply($.ClassType, arguments)}
   ,GetPosition$:function($){return $.ClassType.GetPosition($)}
   ,GetSize$1$:function($){return $.ClassType.GetSize$1($)}
   ,ReadBuffer$:function($){return $.ClassType.ReadBuffer.apply($.ClassType, arguments)}
   ,Seek$:function($){return $.ClassType.Seek.apply($.ClassType, arguments)}
   ,SetPosition$:function($){return $.ClassType.SetPosition.apply($.ClassType, arguments)}
   ,SetSize$:function($){return $.ClassType.SetSize.apply($.ClassType, arguments)}
   ,Skip$:function($){return $.ClassType.Skip.apply($.ClassType, arguments)}
   ,WriteBuffer$:function($){return $.ClassType.WriteBuffer.apply($.ClassType, arguments)}
};
TStream.$Intf={
   IBinaryTransport:[TStream.DataOffset,TStream.DataGetSize,TStream.DataRead,TStream.DataWrite]
}
/// TMemoryStream = class (TStream)
///  [line: 117, column: 3, file: System.Streams]
var TMemoryStream = {
   $ClassName:"TMemoryStream",$Parent:TStream
   ,$Init:function ($) {
      TStream.$Init($);
      $.FBuffer$1 = null;
      $.FPos = 0;
   }
   /// function TMemoryStream.CopyFrom(const Source: TStream; Count: Integer) : Integer
   ///  [line: 250, column: 24, file: System.Streams]
   ,CopyFrom:function(Self, Source$3, Count$16) {
      var Result = 0;
      var LData = [];
      LData = TStream.ReadBuffer$(Source$3,TStream.GetPosition$(Source$3),Count$16);
      TStream.WriteBuffer$(Self,LData,TStream.GetPosition$(Self));
      Result = LData.length;
      return Result
   }
   /// constructor TMemoryStream.Create()
   ///  [line: 238, column: 27, file: System.Streams]
   ,Create$23:function(Self) {
      TObject.Create(Self);
      Self.FBuffer$1 = TAllocation.Create$26($New(TAllocation));
      return Self
   }
   /// destructor TMemoryStream.Destroy()
   ///  [line: 244, column: 26, file: System.Streams]
   ,Destroy:function(Self) {
      TObject.Free(Self.FBuffer$1);
      TObject.Destroy(Self);
   }
   /// function TMemoryStream.GetPosition() : Integer
   ///  [line: 257, column: 24, file: System.Streams]
   ,GetPosition:function(Self) {
      return Self.FPos;
   }
   /// function TMemoryStream.GetSize() : Integer
   ///  [line: 332, column: 24, file: System.Streams]
   ,GetSize$1:function(Self) {
      return TAllocation.GetSize$3(Self.FBuffer$1);
   }
   /// function TMemoryStream.ReadBuffer(Offset: Integer; Count: Integer) : TByteArray
   ///  [line: 353, column: 24, file: System.Streams]
   ,ReadBuffer:function(Self, Offset$12, Count$17) {
      var Result = [];
      var mTemp$3 = undefined;
      var mLen$1 = 0;
      var LBytesToMove = 0;
      if (TStream.GetPosition$(Self)<TStream.GetSize$1$(Self)) {
         mLen$1 = TStream.GetSize$1$(Self)-TStream.GetPosition$(Self);
      } else {
         mLen$1 = 0;
      }
      if (mLen$1>0) {
         try {
            LBytesToMove = Count$17;
            if (LBytesToMove>mLen$1) {
               LBytesToMove = mLen$1;
            }
            mTemp$3 = new Uint8Array(LBytesToMove);
            TMarshal.Move$1(TMarshal,TAllocation.GetHandle(Self.FBuffer$1),Offset$12,mTemp$3,0,LBytesToMove);
            Result = TDatatype.TypedArrayToBytes(TDatatype,mTemp$3);
            TStream.SetPosition$(Self,Offset$12+Result.length);
         } catch ($e) {
            var e$5 = $W($e);
            throw EW3Exception.CreateFmt($New(EStreamReadError),$R[8],[e$5.FMessage]);
         }
      }
      return Result
   }
   /// function TMemoryStream.Seek(const Offset: Integer; Origin: TStreamSeekOrigin) : Integer
   ///  [line: 302, column: 24, file: System.Streams]
   ,Seek:function(Self, Offset$13, Origin$1) {
      var Result = 0;
      var mSize = 0;
      mSize = TStream.GetSize$1$(Self);
      if (mSize>0) {
         switch (Origin$1) {
            case 0 :
               if (Offset$13>-1) {
                  TStream.SetPosition$(Self,Offset$13);
                  Result = Offset$13;
               }
               break;
            case 1 :
               Result = TInteger.EnsureRange((TStream.GetPosition$(Self)+Offset$13),0,mSize);
               TStream.SetPosition$(Self,Result);
               break;
            case 2 :
               Result = TInteger.EnsureRange((TStream.GetSize$1$(Self)-Math.abs(Offset$13)),0,mSize);
               TStream.SetPosition$(Self,Result);
               break;
         }
      }
      return Result
   }
   /// procedure TMemoryStream.SetPosition(NewPosition: Integer)
   ///  [line: 262, column: 25, file: System.Streams]
   ,SetPosition:function(Self, NewPosition$1) {
      var LSize = 0;
      LSize = TStream.GetSize$1$(Self);
      if (LSize>0) {
         Self.FPos = TInteger.EnsureRange(NewPosition$1,0,LSize);
      }
   }
   /// procedure TMemoryStream.SetSize(NewSize: Integer)
   ///  [line: 269, column: 25, file: System.Streams]
   ,SetSize:function(Self, NewSize$1) {
      var mSize$1 = 0;
      var mDiff = 0;
      mSize$1 = TStream.GetSize$1$(Self);
      if (NewSize$1>0) {
         if (NewSize$1>mSize$1) {
            mDiff = NewSize$1-mSize$1;
            if (TAllocation.GetSize$3(Self.FBuffer$1)+mDiff>0) {
               TAllocation.Grow(Self.FBuffer$1,mDiff);
            } else {
               TAllocation.Release(Self.FBuffer$1);
            }
         } else {
            mDiff = mSize$1-NewSize$1;
            if (TAllocation.GetSize$3(Self.FBuffer$1)-mDiff>0) {
               TAllocation.Shrink(Self.FBuffer$1,mDiff);
            } else {
               TAllocation.Release(Self.FBuffer$1);
            }
         }
      } else {
         TAllocation.Release(Self.FBuffer$1);
      }
      Self.FPos = TInteger.EnsureRange(Self.FPos,0,TStream.GetSize$1$(Self));
   }
   /// function TMemoryStream.Skip(Amount: Integer) : Integer
   ///  [line: 337, column: 24, file: System.Streams]
   ,Skip:function(Self, Amount$1) {
      var Result = 0;
      var mTotal$2 = 0;
      var mSize$2 = 0;
      mSize$2 = TStream.GetSize$1$(Self);
      if (mSize$2>0) {
         mTotal$2 = TStream.GetPosition$(Self)+Amount$1;
         if (mTotal$2>mSize$2) {
            mTotal$2 = mSize$2-mTotal$2;
         }
         (Self.FPos+= mTotal$2);
         Result = mTotal$2;
      }
      return Result
   }
   /// procedure TMemoryStream.WriteBuffer(const Buffer: TByteArray; Offset: Integer)
   ///  [line: 385, column: 25, file: System.Streams]
   ,WriteBuffer:function(Self, Buffer$3, Offset$14) {
      var mData = undefined;
      try {
         if (TAllocation.a$21(Self.FBuffer$1)&&Offset$14<1) {
            TAllocation.Allocate(Self.FBuffer$1,Buffer$3.length);
            mData = TDatatype.BytesToTypedArray(TDatatype,Buffer$3);
            TMarshal.Move$1(TMarshal,mData,0,TAllocation.GetHandle(Self.FBuffer$1),0,Buffer$3.length);
            TMarshal.Move$1(TMarshal,mData,0,TAllocation.GetHandle(Self.FBuffer$1),0,Buffer$3.length);
         } else {
            if (TStream.GetPosition$(Self)==TStream.GetSize$1$(Self)) {
               TAllocation.Grow(Self.FBuffer$1,Buffer$3.length);
               mData = TDatatype.BytesToTypedArray(TDatatype,Buffer$3);
               TMarshal.Move$1(TMarshal,mData,0,TAllocation.GetHandle(Self.FBuffer$1),Offset$14,Buffer$3.length);
            } else {
               TMarshal.Move$1(TMarshal,TDatatype.BytesToTypedArray(TDatatype,Buffer$3),0,TAllocation.GetHandle(Self.FBuffer$1),Offset$14,Buffer$3.length);
            }
         }
         TStream.SetPosition$(Self,Offset$14+Buffer$3.length);
      } catch ($e) {
         var e$6 = $W($e);
         throw EW3Exception.CreateFmt($New(EStreamWriteError),$R[7],[e$6.FMessage]);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,CopyFrom$:function($){return $.ClassType.CopyFrom.apply($.ClassType, arguments)}
   ,GetPosition$:function($){return $.ClassType.GetPosition($)}
   ,GetSize$1$:function($){return $.ClassType.GetSize$1($)}
   ,ReadBuffer$:function($){return $.ClassType.ReadBuffer.apply($.ClassType, arguments)}
   ,Seek$:function($){return $.ClassType.Seek.apply($.ClassType, arguments)}
   ,SetPosition$:function($){return $.ClassType.SetPosition.apply($.ClassType, arguments)}
   ,SetSize$:function($){return $.ClassType.SetSize.apply($.ClassType, arguments)}
   ,Skip$:function($){return $.ClassType.Skip.apply($.ClassType, arguments)}
   ,WriteBuffer$:function($){return $.ClassType.WriteBuffer.apply($.ClassType, arguments)}
};
TMemoryStream.$Intf={
   IBinaryTransport:[TStream.DataOffset,TStream.DataGetSize,TStream.DataRead,TStream.DataWrite]
}
/// TStreamSeekOrigin enumeration
///  [line: 48, column: 3, file: System.Streams]
var TStreamSeekOrigin = [ "soFromBeginning", "soFromCurrent", "soFromEnd" ];
/// EStream = class (EW3Exception)
///  [line: 56, column: 3, file: System.Streams]
var EStream = {
   $ClassName:"EStream",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EStreamWriteError = class (EStream)
///  [line: 58, column: 3, file: System.Streams]
var EStreamWriteError = {
   $ClassName:"EStreamWriteError",$Parent:EStream
   ,$Init:function ($) {
      EStream.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EStreamReadError = class (EStream)
///  [line: 57, column: 3, file: System.Streams]
var EStreamReadError = {
   $ClassName:"EStreamReadError",$Parent:EStream
   ,$Init:function ($) {
      EStream.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EStreamNotImplemented = class (EStream)
///  [line: 59, column: 3, file: System.Streams]
var EStreamNotImplemented = {
   $ClassName:"EStreamNotImplemented",$Parent:EStream
   ,$Init:function ($) {
      EStream.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TAllocationOptions = class (TW3OwnedObject)
///  [line: 98, column: 3, file: System.Memory.Allocation]
var TAllocationOptions = {
   $ClassName:"TAllocationOptions",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FCacheSize = 0;
      $.FUseCache = false;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 108, column: 41, file: System.Memory.Allocation]
   ,a$20:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TAllocation);
   }
   /// constructor TAllocationOptions.Create(const AOwner: TAllocation)
   ///  [line: 123, column: 32, file: System.Memory.Allocation]
   ,Create$25:function(Self, AOwner$4) {
      TW3OwnedObject.Create$11(Self,AOwner$4);
      Self.FCacheSize = 4096;
      Self.FUseCache = true;
      return Self
   }
   /// function TAllocationOptions.GetCacheFree() : Integer
   ///  [line: 130, column: 29, file: System.Memory.Allocation]
   ,GetCacheFree:function(Self) {
      return Self.FCacheSize-TAllocationOptions.GetCacheUsed(Self);
   }
   /// function TAllocationOptions.GetCacheUsed() : Integer
   ///  [line: 135, column: 29, file: System.Memory.Allocation]
   ,GetCacheUsed:function(Self) {
      var Result = 0;
      if (Self.FUseCache) {
         Result = parseInt((Self.FCacheSize-(TAllocation.GetHandle(TAllocationOptions.a$20(Self)).length-TAllocation.GetSize$3(TAllocationOptions.a$20(Self)))),10);
      } else {
         Result = 0;
      }
      return Result
   }
   /// procedure TAllocationOptions.SetCacheSize(const value: Integer)
   ///  [line: 147, column: 30, file: System.Memory.Allocation]
   ,SetCacheSize:function(Self, value$17) {
      Self.FCacheSize = TInteger.EnsureRange(value$17,1024,1048576);
   }
   /// procedure TAllocationOptions.SetUseCache(const value: Boolean)
   ///  [line: 142, column: 30, file: System.Memory.Allocation]
   ,SetUseCache:function(Self, value$18) {
      Self.FUseCache = value$18;
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
};
TAllocationOptions.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TAllocation = class (TObject)
///  [line: 51, column: 3, file: System.Memory.Allocation]
var TAllocation = {
   $ClassName:"TAllocation",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle = undefined;
      $.FOptions$1 = null;
      $.FSize = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 71, column: 37, file: System.Memory.Allocation]
   ,a$21:function(Self) {
      return ((!Self.FHandle)?true:false);
   }
   /// procedure TAllocation.Allocate(Bytes: Integer)
   ///  [line: 244, column: 23, file: System.Memory.Allocation]
   ,Allocate:function(Self, Bytes$2) {
      var LSize$1 = 0;
      if (Self.FHandle) {
         TAllocation.Release(Self);
      }
      if (Bytes$2>0) {
         LSize$1 = TInteger.ToNearest(Bytes$2,16);
         if (Self.FOptions$1.FUseCache) {
            LSize$1 = TInteger.ToNearest(LSize$1,Self.FOptions$1.FCacheSize);
         }
         Self.FHandle = TUnManaged.AllocMemA(TUnManaged,LSize$1);
         Self.FSize = Bytes$2;
         TAllocation.HandleAllocated$(Self);
      }
   }
   /// constructor TAllocation.Create(ByteSize: Integer)
   ///  [line: 162, column: 25, file: System.Memory.Allocation]
   ,Create$27:function(Self, ByteSize) {
      TAllocation.Create$26(Self);
      if (ByteSize>0) {
         TAllocation.Allocate(Self,ByteSize);
      }
      return Self
   }
   /// constructor TAllocation.Create()
   ///  [line: 156, column: 25, file: System.Memory.Allocation]
   ,Create$26:function(Self) {
      TObject.Create(Self);
      Self.FOptions$1 = TAllocationOptions.Create$25($New(TAllocationOptions),Self);
      return Self
   }
   /// function TAllocation.DataGetSize() : Integer
   ///  [line: 213, column: 22, file: System.Memory.Allocation]
   ,DataGetSize$1:function(Self) {
      return TAllocation.GetSize$3(Self);
   }
   /// function TAllocation.DataOffset() : Integer
   ///  [line: 207, column: 22, file: System.Memory.Allocation]
   ,DataOffset$1:function(Self) {
      return 0;
   }
   /// function TAllocation.DataRead(const Offset: Integer; const ByteCount: Integer) : TByteArray
   ///  [line: 219, column: 22, file: System.Memory.Allocation]
   ,DataRead$1:function(Self, Offset$15, ByteCount$1) {
      var Result = [];
      var LRef = undefined;
      LRef = TUnManaged.ReadMemoryA(TUnManaged,TAllocation.GetHandle(Self),Offset$15,ByteCount$1);
      Result = TDatatype.TypedArrayToBytes(TDatatype,LRef);
      return Result
   }
   /// procedure TAllocation.DataWrite(const Offset: Integer; const Bytes: TByteArray)
   ///  [line: 229, column: 23, file: System.Memory.Allocation]
   ,DataWrite$1:function(Self, Offset$16, Bytes$3) {
      TUnManaged.WriteMemoryA(TUnManaged,TAllocation.GetHandle(Self),Offset$16,TDatatype.BytesToTypedArray(TDatatype,Bytes$3));
   }
   /// destructor TAllocation.Destroy()
   ///  [line: 169, column: 24, file: System.Memory.Allocation]
   ,Destroy:function(Self) {
      if (Self.FHandle) {
         TAllocation.Release(Self);
      }
      TObject.Free(Self.FOptions$1);
      TObject.Destroy(Self);
   }
   /// function TAllocation.GetBufferHandle() : TBufferHandle
   ///  [line: 418, column: 22, file: System.Memory.Allocation]
   ,GetBufferHandle:function(Self) {
      var Result = undefined;
      if (Self.FHandle) {
         Result = Self.FHandle.buffer;
      } else {
         Result = null;
      }
      return Result
   }
   /// function TAllocation.GetHandle() : TMemoryHandle
   ///  [line: 413, column: 22, file: System.Memory.Allocation]
   ,GetHandle:function(Self) {
      return Self.FHandle;
   }
   /// function TAllocation.GetSize() : Integer
   ///  [line: 408, column: 22, file: System.Memory.Allocation]
   ,GetSize$3:function(Self) {
      return Self.FSize;
   }
   /// function TAllocation.GetTotalSize() : Integer
   ///  [line: 402, column: 22, file: System.Memory.Allocation]
   ,GetTotalSize$1:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         Result = parseInt(Self.FHandle.length,10);
      }
      return Result
   }
   /// function TAllocation.GetTransport() : IBinaryTransport
   ///  [line: 177, column: 22, file: System.Memory.Allocation]
   ,GetTransport:function(Self) {
      return $AsIntf(Self,"IBinaryTransport");
   }
   /// procedure TAllocation.Grow(const NumberOfBytes: Integer)
   ///  [line: 282, column: 23, file: System.Memory.Allocation]
   ,Grow:function(Self, NumberOfBytes) {
      var LNewSize = 0;
      if (Self.FHandle) {
         if (Self.FOptions$1.FUseCache) {
            if (NumberOfBytes<TAllocationOptions.GetCacheFree(Self.FOptions$1)) {
               (Self.FSize+= NumberOfBytes);
            } else {
               LNewSize = TInteger.ToNearest((Self.FSize+NumberOfBytes),Self.FOptions$1.FCacheSize);
               TAllocation.ReAllocate(Self,LNewSize);
            }
            return;
         }
         LNewSize = TInteger.ToNearest((Self.FSize+NumberOfBytes),16);
         TAllocation.ReAllocate(Self,LNewSize);
      } else {
         TAllocation.Allocate(Self,NumberOfBytes);
      }
   }
   /// procedure TAllocation.HandleAllocated()
   ///  [line: 234, column: 23, file: System.Memory.Allocation]
   ,HandleAllocated:function(Self) {
      /* null */
   }
   /// procedure TAllocation.HandleReleased()
   ///  [line: 239, column: 23, file: System.Memory.Allocation]
   ,HandleReleased:function(Self) {
      /* null */
   }
   /// procedure TAllocation.ReAllocate(NewSize: Integer)
   ///  [line: 316, column: 23, file: System.Memory.Allocation]
   ,ReAllocate:function(Self, NewSize$2) {
      var LSizeToSet = 0;
      if (Self.FHandle) {
         if (NewSize$2!=TAllocation.GetSize$3(Self)) {
            NewSize$2 = TInteger.EnsureRange(NewSize$2,0,2147483647);
            if (NewSize$2<1) {
               TAllocation.Release(Self);
               return;
            }
            TAllocation.HandleReleased$(Self);
            LSizeToSet = TInteger.ToNearest(NewSize$2,16);
            if (Self.FOptions$1.FUseCache) {
               LSizeToSet = TInteger.ToNearest(NewSize$2,Self.FOptions$1.FCacheSize);
            }
            Self.FHandle = TUnManaged.ReAllocMemA(TUnManaged,Self.FHandle,LSizeToSet);
            Self.FSize = NewSize$2;
         }
      } else {
         TAllocation.Allocate(Self,NewSize$2);
      }
      TAllocation.HandleAllocated$(Self);
   }
   /// procedure TAllocation.Release()
   ///  [line: 271, column: 23, file: System.Memory.Allocation]
   ,Release:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.buffer = null;
         Self.FHandle = null;
         Self.FSize = 0;
         TAllocation.HandleReleased$(Self);
      }
   }
   /// procedure TAllocation.Shrink(const Bytes: Integer)
   ///  [line: 362, column: 23, file: System.Memory.Allocation]
   ,Shrink:function(Self, Bytes$4) {
      var mSize$3 = 0;
      if (Self.FHandle) {
         if (Self.FOptions$1.FUseCache) {
            mSize$3 = TInteger.EnsureRange((TAllocation.GetSize$3(Self)-Bytes$4),0,2147483647);
            if (mSize$3>0) {
               if (mSize$3>Self.FSize+Self.FOptions$1.FCacheSize) {
                  TAllocation.ReAllocate(Self,mSize$3);
               } else {
                  Self.FSize = mSize$3;
               }
            } else {
               TAllocation.Release(Self);
            }
            return;
         }
         mSize$3 = TInteger.EnsureRange((TAllocation.GetSize$3(Self)-Bytes$4),0,2147483647);
         if (mSize$3>0) {
            TAllocation.ReAllocate(Self,mSize$3);
         } else {
            TAllocation.Release(Self);
         }
      }
   }
   /// procedure TAllocation.Transport(const Target: IBinaryTransport)
   ///  [line: 182, column: 23, file: System.Memory.Allocation]
   ,Transport:function(Self, Target$3) {
      var Data$12 = [];
      if (Target$3) {
         if (!TAllocation.a$21(Self)) {
            try {
               Data$12 = TDatatype.TypedArrayToBytes(TDatatype,TAllocation.GetHandle(Self));
               Target$3[3](Target$3[0](),Data$12);
            } catch ($e) {
               var e$7 = $W($e);
               throw EW3Exception.CreateFmt($New(EAllocation),"Data transport failed, mechanism threw exception %s with error [%s]",[TObject.ClassName(e$7.ClassType), e$7.FMessage]);
            }
         }
      } else {
         throw Exception.Create($New(EAllocation),"Invalid transport interface, reference was NIL error");
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,HandleAllocated$:function($){return $.ClassType.HandleAllocated($)}
   ,HandleReleased$:function($){return $.ClassType.HandleReleased($)}
};
TAllocation.$Intf={
   IAllocation:[TAllocation.GetHandle,TAllocation.GetTotalSize$1,TAllocation.GetSize$3,TAllocation.GetTransport,TAllocation.Allocate,TAllocation.Release,TAllocation.Grow,TAllocation.Shrink,TAllocation.ReAllocate,TAllocation.Transport]
   ,IBinaryTransport:[TAllocation.DataOffset$1,TAllocation.DataGetSize$1,TAllocation.DataRead$1,TAllocation.DataWrite$1]
}
function a$311(Self) {
   return ((!Self[0]())?true:false);
}/// EAllocation = class (EW3Exception)
///  [line: 22, column: 3, file: System.Memory.Allocation]
var EAllocation = {
   $ClassName:"EAllocation",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3CustomWriter = class (TObject)
///  [line: 38, column: 3, file: System.Writer]
var TW3CustomWriter = {
   $ClassName:"TW3CustomWriter",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAccess = null;
      $.FOffset$1 = $.FTotalSize = 0;
      $.FOptions = [0];
   }
   /// constructor TW3CustomWriter.Create(const Access: IBinaryTransport)
   ///  [line: 86, column: 29, file: System.Writer]
   ,Create$22:function(Self, Access) {
      TObject.Create(Self);
      Self.FAccess = Access;
      Self.FOffset$1 = Self.FAccess[0]();
      Self.FTotalSize = Self.FAccess[1]();
      Self.FOptions = [3];
      return Self
   }
   /// function TW3CustomWriter.GetOffset() : Integer
   ///  [line: 109, column: 26, file: System.Writer]
   ,GetOffset:function(Self) {
      var Result = 0;
      if ($SetIn(Self.FOptions,0,0,2)) {
         Result = Self.FOffset$1;
      } else {
         Result = Self.FAccess[0]();
      }
      return Result
   }
   /// function TW3CustomWriter.GetTotalFree() : Integer
   ///  [line: 137, column: 26, file: System.Writer]
   ,GetTotalFree:function(Self) {
      return Self.FAccess[1]()-TW3CustomWriter.GetOffset(Self);
   }
   /// function TW3CustomWriter.GetTotalSize() : Integer
   ///  [line: 100, column: 26, file: System.Writer]
   ,GetTotalSize:function(Self) {
      var Result = 0;
      if ($SetIn(Self.FOptions,0,0,2)) {
         Result = 2147483647;
      } else {
         Result = Self.FAccess[1]();
      }
      return Result
   }
   /// function TW3CustomWriter.QueryBreachOfBoundary(const BytesToFit: Integer) : Boolean
   ///  [line: 117, column: 26, file: System.Writer]
   ,QueryBreachOfBoundary:function(Self, BytesToFit) {
      var Result = false;
      if (BytesToFit>=1) {
         if ($SetIn(Self.FOptions,1,0,2)) {
            Result = false;
         } else {
            Result = TW3CustomWriter.GetTotalFree(Self)<BytesToFit;
         }
      }
      return Result
   }
   /// procedure TW3CustomWriter.SetAccessOptions(const NewOptions: TW3WriterOptions)
   ///  [line: 95, column: 27, file: System.Writer]
   ,SetAccessOptions:function(Self, NewOptions) {
      Self.FOptions = NewOptions.slice(0);
   }
   /// function TW3CustomWriter.Write(Data: TByteArray) : Integer
   ///  [line: 142, column: 26, file: System.Writer]
   ,Write:function(Self, Data$13) {
      var Result = 0;
      var LBytesToWrite = 0;
      var LBytesLeft = 0,
         LBytesMissing = 0;
      LBytesToWrite = Data$13.length;
      if (LBytesToWrite>0) {
         if ($SetIn(Self.FOptions,1,0,2)) {
            Self.FAccess[3](TW3CustomWriter.GetOffset(Self),Data$13);
            if ($SetIn(Self.FOptions,0,0,2)) {
               (Self.FOffset$1+= Data$13.length);
            }
         } else {
            if (TW3CustomWriter.QueryBreachOfBoundary(Self,LBytesToWrite)) {
               LBytesLeft = TW3CustomWriter.GetTotalSize(Self)-TW3CustomWriter.GetOffset(Self);
               LBytesMissing = Math.abs(LBytesLeft-LBytesToWrite);
               (LBytesToWrite-= LBytesMissing);
               $ArraySetLenC(Data$13,LBytesToWrite,function (){return 0});
            }
            if (LBytesToWrite>1) {
               Self.FAccess[3](TW3CustomWriter.GetOffset(Self),Data$13);
               if ($SetIn(Self.FOptions,0,0,2)) {
                  (Self.FOffset$1+= Data$13.length);
               }
            } else {
               throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.Write",Self,Format($R[10],[Data$13.length]));
            }
         }
         Result = Data$13.length;
      } else {
         throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.Write",Self,Format($R[12],[LBytesToWrite]));
      }
      return Result
   }
   /// procedure TW3CustomWriter.WriteInteger(const Value: Integer)
   ///  [line: 297, column: 27, file: System.Writer]
   ,WriteInteger:function(Self, Value$16) {
      var LBytesToWrite$1 = 0;
      LBytesToWrite$1 = TDatatype.SizeOfType(TDatatype,7);
      if (TW3CustomWriter.QueryBreachOfBoundary(Self,LBytesToWrite$1)) {
         throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.WriteInteger",Self,Format($R[10],[LBytesToWrite$1]));
      } else {
         TW3CustomWriter.Write(Self,TDatatype.Int32ToBytes(TDatatype,Value$16));
      }
   }
   /// procedure TW3CustomWriter.WriteString(const Value: String)
   ///  [line: 330, column: 27, file: System.Writer]
   ,WriteString:function(Self, Value$17) {
      var LBytes = [],
         LTotal = 0;
      (LTotal+= TDatatype.SizeOfType(TDatatype,7));
      (LTotal+= TDatatype.SizeOfType(TDatatype,7));
      LBytes = TDatatype.StringToBytes(TDatatype,Value$17);
      (LTotal+= LBytes.length);
      if (TW3CustomWriter.QueryBreachOfBoundary(Self,LTotal)) {
         throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.WriteString",Self,Format($R[10],[LTotal]));
      } else {
         try {
            TW3CustomWriter.WriteInteger(Self,3131756270);
            TW3CustomWriter.WriteInteger(Self,LBytes.length);
            if (LBytes.length>0) {
               TW3CustomWriter.Write(Self,LBytes);
            }
         } catch ($e) {
            var e$8 = $W($e);
            throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.WriteString",Self,e$8.FMessage);
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TStreamWriter = class (TW3CustomWriter)
///  [line: 23, column: 3, file: System.Stream.Writer]
var TStreamWriter = {
   $ClassName:"TStreamWriter",$Parent:TW3CustomWriter
   ,$Init:function ($) {
      TW3CustomWriter.$Init($);
   }
   /// constructor TStreamWriter.Create(const Stream: TStream)
   ///  [line: 35, column: 27, file: System.Stream.Writer]
   ,Create$28:function(Self, Stream$1) {
      TW3CustomWriter.Create$22(Self,$AsIntf(Stream$1,"IBinaryTransport"));
      TW3CustomWriter.SetAccessOptions(Self,[3]);
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TWriter = class (TW3CustomWriter)
///  [line: 76, column: 3, file: System.Writer]
var TWriter = {
   $ClassName:"TWriter",$Parent:TW3CustomWriter
   ,$Init:function ($) {
      TW3CustomWriter.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// EW3WriteError = class (EW3Exception)
///  [line: 30, column: 3, file: System.Writer]
var EW3WriteError = {
   $ClassName:"EW3WriteError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3CustomReader = class (TObject)
///  [line: 37, column: 3, file: System.Reader]
var TW3CustomReader = {
   $ClassName:"TW3CustomReader",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAccess$2 = null;
      $.FOffset$2 = $.FTotalSize$1 = 0;
      $.FOptions$2 = [0];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 53, column: 33, file: System.Reader]
   ,a$25:function(Self) {
      return TW3CustomReader.GetReadOffset(Self)>=TW3CustomReader.GetTotalSize$2(Self);
   }
   /// constructor TW3CustomReader.Create(const Access: IBinaryTransport)
   ///  [line: 83, column: 29, file: System.Reader]
   ,Create$29:function(Self, Access$1) {
      TObject.Create(Self);
      Self.FAccess$2 = Access$1;
      Self.FOffset$2 = Self.FAccess$2[0]();
      Self.FTotalSize$1 = Self.FAccess$2[1]();
      Self.FOptions$2 = [1];
      return Self
   }
   /// function TW3CustomReader.GetReadOffset() : Integer
   ///  [line: 104, column: 26, file: System.Reader]
   ,GetReadOffset:function(Self) {
      var Result = 0;
      if ($SetIn(Self.FOptions$2,0,0,1)) {
         Result = Self.FOffset$2;
      } else {
         Result = Self.FAccess$2[0]();
      }
      return Result
   }
   /// function TW3CustomReader.GetTotalSize() : Integer
   ///  [line: 97, column: 26, file: System.Reader]
   ,GetTotalSize$2:function(Self) {
      var Result = 0;
      if ($SetIn(Self.FOptions$2,0,0,1)) {
         Result = Self.FTotalSize$1;
      } else {
         Result = Self.FAccess$2[1]();
      }
      return Result
   }
   /// function TW3CustomReader.QueryBreachOfBoundary(const NumberOfBytes: Integer) : Boolean
   ///  [line: 111, column: 26, file: System.Reader]
   ,QueryBreachOfBoundary$1:function(Self, NumberOfBytes$1) {
      return TW3CustomReader.GetTotalSize$2(Self)-TW3CustomReader.GetReadOffset(Self)<NumberOfBytes$1;
   }
   /// function TW3CustomReader.Read(const BytesToRead: Integer) : TByteArray
   ///  [line: 116, column: 26, file: System.Reader]
   ,Read$1:function(Self, BytesToRead) {
      var Result = [];
      if (BytesToRead>0) {
         Result = Self.FAccess$2[2](TW3CustomReader.GetReadOffset(Self),BytesToRead);
         if ($SetIn(Self.FOptions$2,0,0,1)) {
            (Self.FOffset$2+= Result.length);
         }
      } else {
         throw EW3Exception.Create$17($New(EW3ReadError),"TW3CustomReader.Read",Self,("Invalid read length ("+BytesToRead.toString()+")"));
      }
      return Result
   }
   /// function TW3CustomReader.ReadChar() : Char
   ///  [line: 149, column: 26, file: System.Reader]
   ,ReadChar:function(Self) {
      var Result = "";
      var LBytesToRead = 0,
         Data$14 = [];
      LBytesToRead = TDatatype.SizeOfType(TDatatype,3);
      if (TW3CustomReader.QueryBreachOfBoundary$1(Self,LBytesToRead)) {
         throw EW3Exception.Create$17($New(EW3ReadError),"TW3CustomReader.ReadChar",Self,Format($R[13],[LBytesToRead]));
      } else {
         Data$14 = TW3CustomReader.Read$1(Self,LBytesToRead);
         Result = TString.DecodeUTF8(TString,Data$14);
      }
      return Result
   }
   /// function TW3CustomReader.ReadInteger() : Integer
   ///  [line: 246, column: 26, file: System.Reader]
   ,ReadInteger:function(Self) {
      var Result = 0;
      var LBytesToRead$1 = 0,
         Data$15 = [];
      LBytesToRead$1 = TDatatype.SizeOfType(TDatatype,7);
      if (TW3CustomReader.QueryBreachOfBoundary$1(Self,LBytesToRead$1)) {
         throw EW3Exception.Create$17($New(EW3ReadError),"TW3CustomReader.ReadInteger",Self,Format($R[13],[LBytesToRead$1]));
      } else {
         Data$15 = TW3CustomReader.Read$1(Self,LBytesToRead$1);
         Result = TDatatype.BytesToInt32(TDatatype,Data$15);
      }
      return Result
   }
   /// function TW3CustomReader.ReadStr(const BytesToRead: Integer) : String
   ///  [line: 258, column: 26, file: System.Reader]
   ,ReadStr:function(Self, BytesToRead$1) {
      var Result = "";
      var LData$1 = [];
      if (TW3CustomReader.QueryBreachOfBoundary$1(Self,BytesToRead$1)) {
         throw EW3Exception.Create$17($New(EW3ReadError),"TW3CustomReader.ReadStr",Self,Format($R[13],[BytesToRead$1]));
      } else {
         if (BytesToRead$1>0) {
            LData$1 = TW3CustomReader.Read$1(Self,BytesToRead$1);
            Result = TDatatype.BytesToString(TDatatype,LData$1);
         }
      }
      return Result
   }
   /// function TW3CustomReader.ReadString() : String
   ///  [line: 276, column: 26, file: System.Reader]
   ,ReadString$1:function(Self) {
      var Result = "";
      var LSignature = 0;
      var LLength = 0;
      LSignature = TW3CustomReader.ReadInteger(Self);
      if (LSignature==3131756270) {
         LLength = TW3CustomReader.ReadInteger(Self);
         if (LLength>0) {
            Result = TW3CustomReader.ReadStr(Self,LLength);
         }
      } else {
         throw EW3Exception.Create$17($New(EW3ReadError),"TW3CustomReader.ReadString",Self,Format($R[14],["string"]));
      }
      return Result
   }
   /// procedure TW3CustomReader.SetUpdateOption(const NewUpdateMode: TW3ReaderOption)
   ///  [line: 92, column: 27, file: System.Reader]
   ,SetUpdateOption:function(Self, NewUpdateMode) {
      Self.FOptions$2 = NewUpdateMode.slice(0);
   }
   ,Destroy:TObject.Destroy
};
/// TStreamReader = class (TW3CustomReader)
///  [line: 21, column: 3, file: System.Stream.Reader]
var TStreamReader = {
   $ClassName:"TStreamReader",$Parent:TW3CustomReader
   ,$Init:function ($) {
      TW3CustomReader.$Init($);
   }
   /// constructor TStreamReader.Create(const Stream: TStream)
   ///  [line: 32, column: 27, file: System.Stream.Reader]
   ,Create$30:function(Self, Stream$2) {
      TW3CustomReader.Create$29(Self,$AsIntf(Stream$2,"IBinaryTransport"));
      TW3CustomReader.SetUpdateOption(Self,[1]);
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TReader = class (TW3CustomReader)
///  [line: 73, column: 3, file: System.Reader]
var TReader = {
   $ClassName:"TReader",$Parent:TW3CustomReader
   ,$Init:function ($) {
      TW3CustomReader.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// EW3ReadError = class (EW3Exception)
///  [line: 33, column: 3, file: System.Reader]
var EW3ReadError = {
   $ClassName:"EW3ReadError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function DateTimeToJDate(Present) {
   var Result = null;
   Result = new Date();
   Result.setTime(Math.round((Present-25569)*86400000));
   return Result
};
var CNT_DaysInMonthData = [[31,28,31,30,31,30,31,31,30,31,30,31],[31,29,31,30,31,30,31,31,30,31,30,31]];
/// TW3CustomApplication = class (TObject)
///  [line: 251, column: 3, file: SmartCL.Dialogs]
var TW3CustomApplication = {
   $ClassName:"TW3CustomApplication",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBody = $.FCurrentForm = $.FDisplay = $.FEnterAnim = $.FLeaveAnim = $.FMainForm = $.FOnBeforeUnload = $.FOnUnload = $.FTransDst = $.FTransSrc = null;
      $.FEntryEffect = 0;
      $.FFormChangeActive = $.FTerminated = false;
      $.FForms = [];
   }
   /// procedure TW3CustomApplication.AdjustScreen()
   ///  [line: 1072, column: 32, file: SmartCL.Application]
   ,AdjustScreen:function(Self) {
      if (Self.FDisplay!==null) {
         TW3ScrollInfo.ScrollTo(TW3CustomControl.GetScrollInfo(Self.FDisplay),0,0);
         TW3MovableControl.Invalidate$(Self.FDisplay);
      }
   }
   /// procedure TW3CustomApplication.ApplicationClosing()
   ///  [line: 1117, column: 32, file: SmartCL.Application]
   ,ApplicationClosing:function(Self) {
      /* null */
   }
   /// procedure TW3CustomApplication.ApplicationStarted()
   ///  [line: 1107, column: 32, file: SmartCL.Application]
   ,ApplicationStarted:function(Self) {
      /* null */
   }
   /// procedure TW3CustomApplication.ApplicationStarting()
   ///  [line: 1112, column: 32, file: SmartCL.Application]
   ,ApplicationStarting:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnBeforeUnload()
   ///  [line: 1028, column: 32, file: SmartCL.Application]
   ,CBOnBeforeUnload:function(Self) {
      if (Self.FOnBeforeUnload) {
         Self.FOnBeforeUnload(Self);
      }
   }
   /// procedure TW3CustomApplication.CBOnOrientationChange()
   ///  [line: 1050, column: 32, file: SmartCL.Application]
   ,CBOnOrientationChange:function(Self) {
      var mOrientation = 0;
      var mTemp$4 = 0;
      var mEntry = null;
      mTemp$4 = parseInt(window.orientation,10);
      switch (mTemp$4) {
         case 0 :
            mOrientation = 0;
            break;
         case 90 :
            mOrientation = 1;
            break;
         case (-90) :
            mOrientation = 2;
            break;
         case 180 :
            mOrientation = 3;
            break;
      }
      if (Self.FDisplay) {
         mEntry = Self.FDisplay.OnOrientationChanged;
         if (mEntry) {
            mEntry(Self.FDisplay,mOrientation,mTemp$4);
         }
      }
   }
   /// procedure TW3CustomApplication.CBOnReSize()
   ///  [line: 1045, column: 32, file: SmartCL.Application]
   ,CBOnReSize:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnUnLoad()
   ///  [line: 1034, column: 32, file: SmartCL.Application]
   ,CBOnUnLoad:function(Self) {
      try {
         if (Self.FOnUnload) {
            Self.FOnUnload(Self);
         }
      } finally {
         if (!Self.FTerminated) {
            TW3CustomApplication.Terminate(Self);
         }
      }
   }
   /// constructor TW3CustomApplication.Create()
   ///  [line: 845, column: 34, file: SmartCL.Application]
   ,Create$3:function(Self) {
      TObject.Create(Self);
      Self.FBody = TW3TagContainer.Create$86$($New(TDocumentBody),null);
      Self.FDisplay = TW3TagContainer.Create$86$($New(TW3Display),Self.FBody);
      if (!Instance) {
         Instance = Self;
      }
      return Self
   }
   /// destructor TW3CustomApplication.Destroy()
   ///  [line: 863, column: 33, file: SmartCL.Application]
   ,Destroy:function(Self) {
      if (!Self.FTerminated) {
         TW3CustomApplication.Terminate(Self);
      }
      TObject.Free(Self.FDisplay);
      TObject.Free(Self.FBody);
      Instance = null;
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomApplication.GotoFormByRef(aForm: TW3CustomForm; Effect: TFormEntryEffect = 0)
   ///  [line: 1391, column: 32, file: SmartCL.Application]
   ,GotoFormByRef:function(Self, aForm, Effect) {
      var FormResizeEvent = null;
      var mIndex = 0,
         LBounds = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         wd = 0,
         hd = 0;
      if (Self.FTerminated) {
         return;
      }
      if (Self.FFormChangeActive) {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "A form transition is already active error"]);
      }
      if (aForm===null) {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
      }
      mIndex = Self.FForms.indexOf(aForm);
      if (mIndex<0) {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "Form not registered error"]);
      }
      if (aForm===Self.FCurrentForm) {
         return;
      }
      if (Self.FCurrentForm===null) {
         Self.FCurrentForm = aForm;
         TW3Display.PositionFormInView(Self.FDisplay,aForm);
         TW3MovableControl.SetVisible(aForm,true);
         TW3CustomForm.FormActivated(aForm);
         return;
      }
      if (!Effect) {
         TW3CustomForm.FormDeactivated(Self.FCurrentForm);
         TW3MovableControl.SetVisible(Self.FCurrentForm,false);
         TW3MovableControl.SetVisible(aForm,true);
         TW3Display.PositionFormInView(Self.FDisplay,aForm);
         TW3CustomForm.FormActivated(aForm);
         Self.FCurrentForm = aForm;
         return;
      }
      LBounds = TW3MovableControl.GetBoundsRect(Self.FDisplay);
      wd = TRect$Width$6(LBounds);
      hd = TRect$Height$5(LBounds);
      if (Effect==1) {
         TW3MovableControl.SetBounds$(aForm,wd,LBounds.Top$3,wd,hd);
      } else {
         TW3MovableControl.SetBounds$(aForm,(-wd),LBounds.Top$3,wd,hd);
      }
      TW3CustomForm.BuildForm(aForm);
      FormResizeEvent = aForm.FOnResize;
      TW3MovableControl._SetOnResized(aForm,function (Sender) {
         TW3MovableControl._SetOnResized(aForm,FormResizeEvent);
         Self.FFormChangeActive = true;
         Self.FEntryEffect = Effect;
         TW3CustomForm.FormDeactivated(Self.FCurrentForm);
         Self.FTransSrc = Self.FCurrentForm;
         Self.FTransDst = aForm;
         if (Self.FEnterAnim===null) {
            Self.FEnterAnim = TW3CustomCSSAnimation.Create$135$($New(TW3NamedCSSAnimation));
            TW3CustomCSSAnimation.SetDuration(Self.FEnterAnim,0.3);
         }
         if (Self.FLeaveAnim===null) {
            Self.FLeaveAnim = TW3CustomCSSAnimation.Create$135$($New(TW3NamedCSSAnimation));
            TW3CustomCSSAnimation.SetDuration(Self.FLeaveAnim,0.3);
         }
         switch (Effect) {
            case 1 :
               TW3NamedCSSAnimation.SetName$4(Self.FEnterAnim,"MOVE-LEFT");
               TW3NamedCSSAnimation.SetName$4(Self.FLeaveAnim,"MOVE-OUT-LEFT");
               break;
            case 2 :
               TW3NamedCSSAnimation.SetName$4(Self.FEnterAnim,"MOVE-RIGHT");
               TW3NamedCSSAnimation.SetName$4(Self.FLeaveAnim,"MOVE-OUT-RIGHT");
               break;
         }
         TW3Dispatch.RequestAnimationFrame(TW3Dispatch,function () {
            TW3Display.PositionFormInView(Self.FDisplay,aForm);
            TW3MovableControl.SetVisible(aForm,true);
            TW3CustomCSSAnimation.ExecuteEx(Self.FEnterAnim,aForm,null,$Event1(Self,TW3CustomApplication.HandleEnterAnimEnds));
            TW3CustomCSSAnimation.ExecuteEx(Self.FLeaveAnim,Self.FCurrentForm,null,$Event1(Self,TW3CustomApplication.HandleLeaveAnimEnds));
         });
      });
      TW3MovableControl.SetVisible(aForm,true);
   }
   /// procedure TW3CustomApplication.HandleEnterAnimEnds(Sender: TObject)
   ///  [line: 1349, column: 32, file: SmartCL.Application]
   ,HandleEnterAnimEnds:function(Self, Sender$1) {
      var AnimObject = null;
      TW3TagObj.WillChange(Self.FTransDst,"auto");
      AnimObject = $As(Sender$1,TW3NamedCSSAnimation);
      switch (Self.FEntryEffect) {
         case 1 :
            TW3MovableControl.MoveTo$(Self.FTransDst,0,0);
            Self.FCurrentForm = Self.FTransDst;
            TW3CustomForm.FormActivated(Self.FCurrentForm);
            Self.FFormChangeActive = false;
            break;
         case 2 :
            TW3MovableControl.MoveTo$(Self.FTransDst,0,0);
            Self.FCurrentForm = Self.FTransDst;
            TW3CustomForm.FormActivated(Self.FCurrentForm);
            TW3MovableControl.SetVisible(Self.FTransSrc,false);
            TW3Display.PositionFormInView(Self.FDisplay,Self.FTransSrc);
            Self.FFormChangeActive = false;
            break;
      }
      if (AnimObject===Self.FEnterAnim) {
         Self.FEnterAnim = null;
      }
      TObject.Free(AnimObject);
      AnimObject = null;
   }
   /// procedure TW3CustomApplication.HandleLeaveAnimEnds(Sender: TObject)
   ///  [line: 1338, column: 32, file: SmartCL.Application]
   ,HandleLeaveAnimEnds:function(Self, Sender$2) {
      var AnimObject$1 = null;
      TW3TagObj.WillChange(Self.FTransSrc,"transform");
      TW3MovableControl.SetVisible(Self.FTransSrc,false);
      AnimObject$1 = $As(Sender$2,TW3NamedCSSAnimation);
      if (AnimObject$1===Self.FLeaveAnim) {
         Self.FLeaveAnim = null;
      }
      TObject.Free(AnimObject$1);
      AnimObject$1 = null;
   }
   /// procedure TW3CustomApplication.HookWindowEvents()
   ///  [line: 894, column: 32, file: SmartCL.Application]
   ,HookWindowEvents:function(Self) {
      document.body.onunload = $Event0(Self,TW3CustomApplication.CBOnUnLoad);
      document.body.onbeforeunload = $Event0(Self,TW3CustomApplication.CBOnBeforeUnload);
      window.onresize = $Event0(Self,TW3CustomApplication.CBOnReSize);
      window.onorientationchange = $Event0(Self,TW3CustomApplication.CBOnOrientationChange);
   }
   /// procedure TW3CustomApplication.ReadySync()
   ///  [line: 1122, column: 32, file: SmartCL.Application]
   ,ReadySync:function(Self) {
      var Temp$2 = null;
      if ($SetIn(Self.FDisplay.FComponentState,3,0,9)) {
         if ($SetIn(Self.FDisplay.FView.FComponentState,3,0,9)) {
            if (Self.FMainForm) {
               if ($SetIn(Self.FMainForm.FComponentState,3,0,9)) {
                  TW3MovableControl.Invalidate$(Self.FDisplay);
                  TW3MovableControl.Invalidate$(Self.FDisplay.FView);
                  Temp$2 = Self.FMainForm;
                  Self.FMainForm = null;
                  TW3CustomApplication.GotoFormByRef(Self,Temp$2,0);
                  TW3CustomApplication.ApplicationStarted(Self);
               } else {
                  TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3CustomApplication.ReadySync),100);
               }
            } else {
               TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3CustomApplication.ReadySync),100);
            }
         } else {
            TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3CustomApplication.ReadySync),100);
         }
      } else {
         TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3CustomApplication.ReadySync),100);
      }
   }
   /// procedure TW3CustomApplication.RegisterFormInstance(aForm: TW3CustomForm; isMainForm: Boolean = False)
   ///  [line: 1262, column: 32, file: SmartCL.Application]
   ,RegisterFormInstance:function(Self, aForm$1, isMainForm) {
      if (Self.FTerminated) {
         return;
      }
      if (aForm$1) {
         if (Self.FForms.indexOf(aForm$1)<0) {
            try {
               Self.FForms.push(aForm$1);
            } catch ($e) {
               var e$9 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), e$9.FMessage]);
            }
            if (isMainForm) {
               Self.FMainForm = aForm$1;
            } else {
               TW3MovableControl.SetVisible(aForm$1,false);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), "Form already registered"]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
      }
   }
   /// procedure TW3CustomApplication.RunApp()
   ///  [line: 1192, column: 32, file: SmartCL.Application]
   ,RunApp:function(Self) {
      TW3CustomApplication.HookWindowEvents(Self);
      TW3CustomApplication.ApplicationStarting(Self);
      TApplicationFormsList.AutoCreateForms(FormsFactory(),Self.FDisplay.FView);
      TW3CustomApplication.StartApp(Self);
   }
   /// procedure TW3CustomApplication.StartApp()
   ///  [line: 1241, column: 32, file: SmartCL.Application]
   ,StartApp:function(Self) {
      TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3CustomApplication.ReadySync),100);
   }
   /// procedure TW3CustomApplication.Terminate()
   ///  [line: 1081, column: 32, file: SmartCL.Application]
   ,Terminate:function(Self) {
      var x$44 = 0;
      if (Self.FTerminated) {
         return;
      }
      Self.FTerminated = true;
      TW3CustomApplication.ApplicationClosing(Self);
      try {
         var $temp13;
         for(x$44=0,$temp13=Self.FForms.length;x$44<$temp13;x$44++) {
            TObject.Free(Self.FForms[x$44]);
            Self.FForms[x$44]=null;
         }
         Self.FForms.length=0;
      } finally {
         TObject.Free(Self);
      }
   }
   /// procedure TW3CustomApplication.UnRegisterFormInstance(aForm: TW3CustomForm)
   ///  [line: 1295, column: 32, file: SmartCL.Application]
   ,UnRegisterFormInstance:function(Self, aForm$2) {
      var mIndex$1 = 0;
      if (!Self.FTerminated) {
         if (aForm$2) {
            mIndex$1 = Self.FForms.indexOf(aForm$2);
            if (mIndex$1>=0) {
               if (Self.FMainForm!==aForm$2) {
                  if (Self.FCurrentForm===aForm$2) {
                     TW3CustomApplication.GotoFormByRef(Self,Self.FMainForm,0);
                  }
                  Self.FForms.splice(mIndex$1,1)
                  ;
                  try {
                     TObject.Free(aForm$2);
                  } catch ($e) {
                     var e$10 = $W($e);
                     throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), e$10.FMessage]);
                  }
               } else {
                  throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Main form cannot be removed error"]);
               }
            } else {
               throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Form is not registered"]);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TApplication = class (TW3CustomApplication)
///  [line: 11, column: 3, file: Unit1]
var TApplication = {
   $ClassName:"TApplication",$Parent:TW3CustomApplication
   ,$Init:function ($) {
      TW3CustomApplication.$Init($);
   }
   ,Destroy:TW3CustomApplication.Destroy
};
/// TW3DisplayViewArangeType enumeration
///  [line: 66, column: 3, file: SmartCL.Application]
var TW3DisplayViewArangeType = [ "dvaSizeToView", "dvaVStack", "dvaHStack" ];
/// TW3TagObj = class (TW3Component)
///  [line: 314, column: 3, file: SmartCL.Components]
var TW3TagObj = {
   $ClassName:"TW3TagObj",$Parent:TW3Component
   ,$Init:function ($) {
      TW3Component.$Init($);
      $.FAttributes = null;
      $.FComponentState = [0];
      $.FDisplayMode = 0;
      $.FHandle$3 = undefined;
      $.FOwner$1 = undefined;
      $.FPositionMode = 24;
      $.FTagId = "";
      $.FUpdating = $.FZIndexCounter = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 528, column: 13, file: SmartCL.Components]
   ,a$52:function(Self, Value$18) {
      TW3MouseCursor.SetCursorForElement(TW3MouseCursor,Self.FHandle$3,Value$18);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 527, column: 13, file: SmartCL.Components]
   ,a$51:function(Self) {
      return TW3MouseCursor.GetCursorFromElement(TW3MouseCursor,Self.FHandle$3);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 518, column: 38, file: SmartCL.Components]
   ,a$50:function(Self) {
      return $SetIn(Self.FComponentState,2,0,9);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 514, column: 38, file: SmartCL.Components]
   ,a$49:function(Self) {
      return (Self.FOwner$1?true:false);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 490, column: 64, file: SmartCL.Components]
   ,a$46:function(Self, Value$19) {
      Self.FHandle$3.innerHTML = Value$19;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 490, column: 38, file: SmartCL.Components]
   ,a$45:function(Self) {
      return String(Self.FHandle$3.innerHTML);
   }
   /// procedure TW3TagObj.AddToComponentState(const Flags: TComponentState)
   ///  [line: 2324, column: 21, file: SmartCL.Components]
   ,AddToComponentState:function(Self, Flags) {
      if ($SetIn(Flags,0,0,9)) {
         $SetInc(Self.FComponentState,0,0,9);
      }
      if ($SetIn(Flags,1,0,9)) {
         $SetInc(Self.FComponentState,1,0,9);
      }
      if ($SetIn(Flags,3,0,9)) {
         $SetInc(Self.FComponentState,3,0,9);
      }
      if ($SetIn(Flags,4,0,9)) {
         $SetInc(Self.FComponentState,4,0,9);
      }
      if ($SetIn(Flags,5,0,9)) {
         $SetInc(Self.FComponentState,5,0,9);
      }
      if ($SetIn(Flags,6,0,9)) {
         $SetInc(Self.FComponentState,6,0,9);
      }
      if ($SetIn(Flags,7,0,9)) {
         $SetInc(Self.FComponentState,7,0,9);
      }
      if ($SetIn(Flags,8,0,9)) {
         $SetInc(Self.FComponentState,8,0,9);
      }
   }
   /// procedure TW3TagObj.AfterUpdate()
   ///  [line: 2367, column: 21, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      /* null */
   }
   /// function TW3TagObj.AllocateZIndex() : Integer
   ///  [line: 2387, column: 21, file: SmartCL.Components]
   ,AllocateZIndex:function(Self) {
      var Result = 0;
      ++Self.FZIndexCounter;
      Result = Self.FZIndexCounter;
      return Result
   }
   /// procedure TW3TagObj.BeginUpdate()
   ///  [line: 2348, column: 21, file: SmartCL.Components]
   ,BeginUpdate:function(Self) {
      ++Self.FUpdating;
      $SetInc(Self.FComponentState,2,0,9);
   }
   /// constructor TW3TagObj.Create(const AOwner: TObject)
   ///  [line: 1997, column: 23, file: SmartCL.Components]
   ,Create$11:function(Self, AOwner$5) {
      var LRegName = "";
      TW3CustomComponent.CreateEx(Self,AOwner$5);
      $SetInc(Self.FComponentState,0,0,9);
      try {
         Self.FTagId = TW3TagObj.MakeElementTagId$(Self);
         Self.FHandle$3 = TW3TagObj.MakeElementTagObj$(Self);
      } catch ($e) {
         var e$11 = $W($e);
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.Create",Self,e$11.FMessage);
      }
      $SetInc(Self.FComponentState,1,0,9);
      if (!((Self.FHandle$3==window)||(Self.FHandle$3==document)||(Self.FHandle$3==document.body))) {
         Self.FHandle$3.setAttribute("id",Self.FTagId);
      }
      if (AOwner$5!==null) {
         if (!((Self.FHandle$3==window)||(Self.FHandle$3==document)||(Self.FHandle$3==document.body))) {
            TW3TagObj.SetZIndex(Self,TW3TagObj.AllocateZIndex($As(AOwner$5,TW3TagObj)));
         }
      }
      TW3TagObj.StyleTagObject$(Self);
      TW3TagObj.BeginUpdate(Self);
      try {
         TW3CustomComponent.InitializeObject$(Self);
      } finally {
         TW3TagObj.EndUpdate(Self);
      }
      if (!((Self.FHandle$3==window)||(Self.FHandle$3==document)||(Self.FHandle$3==document.body))) {
         LRegName = Trim$_String_(Self.FTagId);
         if (LRegName.length>0) {
            TW3ControlTracker.RegisterControl(TW3ControlTracker,Self);
         }
      }
      $SetExc(Self.FComponentState,0,0,9);
      $SetExc(Self.FComponentState,1,0,9);
      return Self
   }
   /// function TW3TagObj.CreationFlags() : TW3CreationFlags
   ///  [line: 2299, column: 20, file: SmartCL.Components]
   ,CreationFlags:function(Self) {
      return [62];
   }
   /// destructor TW3TagObj.Destroy()
   ///  [line: 2075, column: 22, file: SmartCL.Components]
   ,Destroy:function(Self) {
      var LRegName$1 = "";
      $SetInc(Self.FComponentState,8,0,9);
      if (Self.FHandle$3) {
         try {
            TW3TagObj.UnHookEvents$(Self);
            if (TControlHandleHelper$Valid$2(Self.FOwner$1)) {
               if (!((Self.FHandle$3==window)||(Self.FHandle$3==document)||(Self.FHandle$3==document.body))) {
                  TW3TagObj.RemoveFrom(Self);
               }
            }
         } finally {
            TW3CustomComponent.FinalizeObject$(Self);
            if (!((Self.FHandle$3==window)||(Self.FHandle$3==document)||(Self.FHandle$3==document.body))) {
               LRegName$1 = Trim$_String_(Self.FTagId);
               if (LRegName$1.length>0) {
                  TW3ControlTracker.UnRegisterControl(TW3ControlTracker,Self);
               }
            }
            Self.FTagId = "";
            Self.FHandle$3 = undefined;
         }
      }
      if (Self.FAttributes) {
         TObject.Free(Self.FAttributes);
      }
      TW3CustomComponent.Destroy(Self);
   }
   /// procedure TW3TagObj.EndUpdate()
   ///  [line: 2354, column: 21, file: SmartCL.Components]
   ,EndUpdate:function(Self) {
      if (Self.FUpdating>0) {
         --Self.FUpdating;
         if (!Self.FUpdating) {
            $SetExc(Self.FComponentState,2,0,9);
            TW3TagObj.AfterUpdate$(Self);
         }
      }
   }
   /// function TW3TagObj.GetAttributes() : TW3ElementAttributes
   ///  [line: 2476, column: 20, file: SmartCL.Components]
   ,GetAttributes:function(Self) {
      var Result = null;
      if (Self.FAttributes===null) {
         Self.FAttributes = TW3ElementAttributes.Create$134($New(TW3ElementAttributes),Self.FHandle$3);
      }
      Result = Self.FAttributes;
      return Result
   }
   /// function TW3TagObj.GetDisplayModeText() : String
   ///  [line: 2139, column: 20, file: SmartCL.Components]
   ,GetDisplayModeText:function(Self) {
      var Result = "";
      switch (Self.FDisplayMode) {
         case 0 :
            Result = "inline-block";
            break;
         case 1 :
            Result = "block";
            break;
         case 2 :
            if (w3_BrowserVendor()==4) {
               Result = TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"flex");
            } else {
               Result = "flex";
            }
            break;
         case 3 :
            Result = "table";
            break;
         case 4 :
            Result = "table-caption";
            break;
         case 5 :
            Result = "table-cell";
            break;
         case 6 :
            Result = "table-row";
            break;
         case 7 :
            Result = "table-column";
            break;
         case 8 :
            Result = "run-in";
            break;
         case 9 :
            Result = "list-item";
            break;
      }
      return Result
   }
   /// function TW3TagObj.GetZIndex() : Integer
   ///  [line: 2372, column: 21, file: SmartCL.Components]
   ,GetZIndex:function(Self) {
      var Result = 0;
      if (Self.FHandle$3) {
         Result = TVariant.AsInteger(Self.FHandle$3.style.zIndex);
      } else {
         Result = -1;
      }
      return Result
   }
   /// procedure TW3TagObj.HandleControlBlured()
   ///  [line: 2434, column: 21, file: SmartCL.Components]
   ,HandleControlBlured:function(Self) {
      /* null */
   }
   /// procedure TW3TagObj.HandleControlFocused()
   ///  [line: 2429, column: 21, file: SmartCL.Components]
   ,HandleControlFocused:function(Self) {
      TW3ControlTracker.SetFocusedControl(TW3ControlTracker,Self);
   }
   /// procedure TW3TagObj.HookEvents()
   ///  [line: 2439, column: 21, file: SmartCL.Components]
   ,HookEvents:function(Self) {
      Self.FHandle$3.addEventListener("focus",$Event0(Self,TW3TagObj.HandleControlFocused));
      Self.FHandle$3.addEventListener("blur",$Event0(Self,TW3TagObj.HandleControlBlured));
   }
   /// procedure TW3TagObj.InsertInto(const OwnerHandle: THandle)
   ///  [line: 2483, column: 21, file: SmartCL.Components]
   ,InsertInto:function(Self, OwnerHandle) {
      if (THandleHelper$Valid$4(OwnerHandle)) {
         if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
            if (TControlHandleHelper$Valid$2(Self.FOwner$1)) {
               try {
                  TW3TagObj.RemoveFrom(Self);
               } catch ($e) {
                  var e$12 = $W($e);
                  throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,e$12.FMessage);
               }
            }
            try {
               w3_SetElementParentByRef(Self.FHandle$3,OwnerHandle);
            } catch ($e) {
               var e$13 = $W($e);
               throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,e$13.FMessage);
            }
            Self.FOwner$1 = OwnerHandle;
         } else {
            throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,$R[15]);
         }
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,$R[22]);
      }
   }
   /// function TW3TagObj.MakeElementTagId() : String
   ///  [line: 2416, column: 20, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      return TW3Identifiers.GenerateUniqueComponentName$1(TW3Identifiers);
   }
   /// function TW3TagObj.MakeElementTagObj() : TControlHandle
   ///  [line: 2421, column: 20, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = document.createElement("div");
      return Result
   }
   /// procedure TW3TagObj.RemoveFrom()
   ///  [line: 2520, column: 21, file: SmartCL.Components]
   ,RemoveFrom:function(Self) {
      if (TControlHandleHelper$Valid$2(Self.FOwner$1)) {
         if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
            try {
               try {
                  w3_RemoveElementByRef(Self.FHandle$3,Self.FOwner$1);
               } catch ($e) {
                  var e$14 = $W($e);
                  /* null */
               }
            } finally {
               Self.FOwner$1 = undefined;
            }
         }
      }
   }
   /// procedure TW3TagObj.RemoveFromComponentState(const Flags: TComponentState)
   ///  [line: 2336, column: 21, file: SmartCL.Components]
   ,RemoveFromComponentState:function(Self, Flags$1) {
      if ($SetIn(Flags$1,0,0,9)) {
         $SetExc(Self.FComponentState,0,0,9);
      }
      if ($SetIn(Flags$1,1,0,9)) {
         $SetExc(Self.FComponentState,1,0,9);
      }
      if ($SetIn(Flags$1,3,0,9)) {
         $SetExc(Self.FComponentState,3,0,9);
      }
      if ($SetIn(Flags$1,4,0,9)) {
         $SetExc(Self.FComponentState,4,0,9);
      }
      if ($SetIn(Flags$1,5,0,9)) {
         $SetExc(Self.FComponentState,5,0,9);
      }
      if ($SetIn(Flags$1,6,0,9)) {
         $SetExc(Self.FComponentState,6,0,9);
      }
      if ($SetIn(Flags$1,7,0,9)) {
         $SetExc(Self.FComponentState,7,0,9);
      }
      if ($SetIn(Flags$1,8,0,9)) {
         $SetExc(Self.FComponentState,8,0,9);
      }
   }
   /// procedure TW3TagObj.SetDisplayMode(const NewMode: TW3TagDisplayMode)
   ///  [line: 2161, column: 21, file: SmartCL.Components]
   ,SetDisplayMode:function(Self, NewMode) {
      if (NewMode!=Self.FDisplayMode) {
         if (!$SetIn(Self.FComponentState,8,0,9)) {
            Self.FDisplayMode = NewMode;
            if (Self.FHandle$3.style.visibility) {
               if (Self.FHandle$3.style.visibility=="hidden") {
                  return;
               }
            }
            Self.FHandle$3.style.display = TW3TagObj.GetDisplayModeText(Self);
         }
      }
   }
   /// procedure TW3TagObj.SetInitialTransformationStyles()
   ///  [line: 2190, column: 21, file: SmartCL.Components]
   ,SetInitialTransformationStyles:function(Self) {
      if (Self.FHandle$3) {
         Self.FHandle$3.style["will-change"] = "transform";
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"will-change")] = "transform";
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"transformStyle")] = "preserve-3d";
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Perspective")] = 800;
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"transformOrigin")] = "50% 50%";
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Transform")] = "translateZ(0px)";
      }
   }
   /// procedure TW3TagObj.SetPositionMode(const NewMode: TW3TagPositionMode)
   ///  [line: 2124, column: 21, file: SmartCL.Components]
   ,SetPositionMode:function(Self, NewMode$1) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewMode$1!=Self.FPositionMode) {
            Self.FPositionMode = NewMode$1;
            switch (Self.FPositionMode) {
               case 23 :
               case 24 :
                  Self.FHandle$3.style.position = "absolute";
                  break;
               case 22 :
                  Self.FHandle$3.style.position = "relative";
                  break;
            }
         }
      }
   }
   /// procedure TW3TagObj.SetZIndex(const NewZIndex: Integer)
   ///  [line: 2380, column: 21, file: SmartCL.Components]
   ,SetZIndex:function(Self, NewZIndex) {
      if (Self.FHandle$3) {
         Self.FHandle$3.style.zIndex = NewZIndex;
      }
   }
   /// function TW3TagObj.Showing() : Boolean
   ///  [line: 2310, column: 20, file: SmartCL.Components]
   ,Showing:function(Self) {
      var Result = false;
      if (Self.FHandle$3) {
         if (TControlHandleHelper$Ready$4(Self.FHandle$3)) {
            if ($SetIn(Self.FComponentState,3,0,9)) {
               Result = true;
            }
         }
      }
      return Result
   }
   /// procedure TW3TagObj.StyleTagObject()
   ///  [line: 2394, column: 21, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      (Self.FHandle$3).style.visibility = 'hidden';
    (Self.FHandle$3).style.display = 'none';
    (Self.FHandle$3).style.overflow = 'hidden';
    (Self.FHandle$3).style.left = "0px";
    (Self.FHandle$3).style.top = "0px";
      switch (Self.FPositionMode) {
         case 23 :
         case 24 :
            Self.FHandle$3.style.position = "absolute";
            break;
         case 22 :
            Self.FHandle$3.style.position = "relative";
            break;
      }
   }
   /// procedure TW3TagObj.UnHookEvents()
   ///  [line: 2447, column: 21, file: SmartCL.Components]
   ,UnHookEvents:function(Self) {
      Self.FHandle$3.style["pointer-events"] = "none";
      Self.FHandle$3.disabled = true;
   }
   /// procedure TW3TagObj.WillChange(const Value: String)
   ///  [line: 2203, column: 21, file: SmartCL.Components]
   ,WillChange:function(Self, Value$20) {
      if (Self.FHandle$3) {
         Self.FHandle$3.style["will-change"] = Value$20;
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"will-change")] = Value$20;
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
   ,FinalizeObject:TW3CustomComponent.FinalizeObject
   ,InitializeObject:TW3CustomComponent.InitializeObject
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents$:function($){return $.ClassType.HookEvents($)}
   ,MakeElementTagId$:function($){return $.ClassType.MakeElementTagId($)}
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing$:function($){return $.ClassType.Showing($)}
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents$:function($){return $.ClassType.UnHookEvents($)}
};
TW3TagObj.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3TagContainer = class (TW3TagObj)
///  [line: 540, column: 3, file: SmartCL.Components]
var TW3TagContainer = {
   $ClassName:"TW3TagContainer",$Parent:TW3TagObj
   ,$Init:function ($) {
      TW3TagObj.$Init($);
      $.FChildren = [];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 616, column: 44, file: SmartCL.Components]
   ,a$53:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3TagContainer);
   }
   /// procedure TW3TagContainer.CBNoBehavior(eventObj: JEvent)
   ///  [line: 2771, column: 27, file: SmartCL.Components]
   ,CBNoBehavior:function(Self, eventObj) {
      if (eventObj!==null) {
         eventObj.stopPropagation();
      }
   }
   /// procedure TW3TagContainer.ChildAdded(const NewChild: TW3TagContainer)
   ///  [line: 3000, column: 27, file: SmartCL.Components]
   ,ChildAdded:function(Self, NewChild) {
      /* null */
   }
   /// function TW3TagContainer.ChildByName(ComponentName: String) : TW3TagContainer
   ///  [line: 2833, column: 26, file: SmartCL.Components]
   ,ChildByName:function(Self, ComponentName) {
      var Result = null;
      var a$312 = 0;
      var LItem$3 = null;
      var a$313 = [];
      ComponentName = (Trim$_String_(ComponentName)).toLocaleLowerCase();
      a$313 = Self.FChildren;
      var $temp14;
      for(a$312=0,$temp14=a$313.length;a$312<$temp14;a$312++) {
         LItem$3 = a$313[a$312];
         if ((TW3TagContainer.GetComponentName(LItem$3)).toLocaleLowerCase()==ComponentName) {
            Result = LItem$3;
            break;
         }
      }
      return Result
   }
   /// procedure TW3TagContainer.ChildRemoved(const OldChild: TW3TagContainer)
   ///  [line: 3004, column: 27, file: SmartCL.Components]
   ,ChildRemoved:function(Self, OldChild) {
      /* null */
   }
   /// constructor TW3TagContainer.Create(AOwner: TW3TagContainer)
   ///  [line: 2548, column: 29, file: SmartCL.Components]
   ,Create$86:function(Self, AOwner$6) {
      TW3TagObj.Create$11(Self,AOwner$6);
      if (TW3TagContainer.a$53(Self)!==null) {
         TW3TagContainer.RegisterChild(TW3TagContainer.a$53(Self),Self);
      }
      return Self
   }
   /// procedure TW3TagContainer.FinalizeObject()
   ///  [line: 2932, column: 27, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TW3TagContainer.FreeChildren(Self);
      if (TW3TagContainer.a$53(Self)!==null) {
         TW3TagContainer.UnRegisterChild(TW3TagContainer.a$53(Self),Self);
      }
      TW3CustomComponent.FinalizeObject(Self);
   }
   /// procedure TW3TagContainer.ForEach(const Process: TW3TagContainerChildEnumProc)
   ///  [line: 2901, column: 27, file: SmartCL.Components]
   ,ForEach$1:function(Self, Process) {
      var a$314 = 0;
      var LChild$1 = null;
      if (Process) {
         var a$315 = [];
         a$315 = Self.FChildren;
         var $temp15;
         for(a$314=0,$temp15=a$315.length;a$314<$temp15;a$314++) {
            LChild$1 = a$315[a$314];
            if (Process(LChild$1)==16) {
               break;
            }
         }
      }
   }
   /// procedure TW3TagContainer.FreeChildren()
   ///  [line: 2973, column: 27, file: SmartCL.Components]
   ,FreeChildren:function(Self) {
      var LOldCount = 0;
      try {
         while (Self.FChildren.length>0) {
            LOldCount = Self.FChildren.length;
            TObject.Free(Self.FChildren[0]);
            if (LOldCount==Self.FChildren.length) {
               Self.FChildren.shift();
            }
         }
      } finally {
         Self.FChildren.length=0;
      }
   }
   /// function TW3TagContainer.GetChildCount() : Integer
   ///  [line: 2944, column: 26, file: SmartCL.Components]
   ,GetChildCount:function(Self) {
      return Self.FChildren.length;
   }
   /// function TW3TagContainer.GetChildHasFocus(var Child: TW3TagContainer) : Boolean
   ///  [line: 2813, column: 26, file: SmartCL.Components]
   ,GetChildHasFocus:function(Self, Child$1) {
      var Result = false;
      var a$316 = 0;
      var LItem$4 = null;
      var a$317 = [];
      Result = false;
      Child$1.v = null;
      a$317 = Self.FChildren;
      var $temp16;
      for(a$316=0,$temp16=a$317.length;a$316<$temp16;a$316++) {
         LItem$4 = a$317[a$316];
         if (TW3TagContainer.GetHasFocus(LItem$4)) {
            Child$1.v = LItem$4;
            break;
         } else {
            Result = TW3TagContainer.GetChildHasFocus(LItem$4,Child$1);
            if (Result) {
               break;
            }
         }
      }
      return Result
   }
   /// function TW3TagContainer.GetChildObject(const Index: Integer) : TW3TagContainer
   ///  [line: 2958, column: 26, file: SmartCL.Components]
   ,GetChildObject:function(Self, Index$1) {
      return Self.FChildren[Index$1];
   }
   /// function TW3TagContainer.GetChildren() : TW3TagContainerArray
   ///  [line: 2597, column: 26, file: SmartCL.Components]
   ,GetChildren:function(Self) {
      return Self.FChildren;
   }
   /// function TW3TagContainer.GetComponentName() : String
   ///  [line: 2963, column: 26, file: SmartCL.Components]
   ,GetComponentName:function(Self) {
      return Self.Name;
   }
   /// function TW3TagContainer.GetHasFocus() : Boolean
   ///  [line: 2776, column: 26, file: SmartCL.Components]
   ,GetHasFocus:function(Self) {
      var Result = false;
      var LFocus;
      if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
         LFocus = document.activeElement;
      if (!LFocus || LFocus == document.body)
        LFocus = null;
      else if (document.querySelector)
        LFocus = document.querySelector(":focus");
         if (LFocus) {
            Result = LFocus==Self.FHandle$3;
         } else {
            Result = false;
         }
      }
      return Result
   }
   /// function TW3TagContainer.GetMaxZIndex() : Integer
   ///  [line: 2755, column: 26, file: SmartCL.Components]
   ,GetMaxZIndex:function(Self) {
      var Result = 0;
      var a$318 = 0;
      var LChild$2 = null;
      var a$319 = [];
      a$319 = Self.FChildren;
      var $temp17;
      for(a$318=0,$temp17=a$319.length;a$318<$temp17;a$318++) {
         LChild$2 = a$319[a$318];
         if (TW3TagObj.GetZIndex(LChild$2)>Result) {
            Result = TW3TagObj.GetZIndex(LChild$2);
         }
      }
      return Result
   }
   /// function TW3TagContainer.IndexOfChild(const Child: TW3CustomControl) : Integer
   ///  [line: 2642, column: 26, file: SmartCL.Components]
   ,IndexOfChild:function(Self, Child$2) {
      var Result = 0;
      var LCount$1 = 0,
         x$45 = 0;
      Result = -1;
      if (Child$2!==null) {
         LCount$1 = TW3TagContainer.GetChildCount(Self);
         var $temp18;
         for(x$45=0,$temp18=LCount$1;x$45<$temp18;x$45++) {
            if (TW3TagContainer.GetChildObject(Self,x$45)===Child$2) {
               Result = x$45;
               break;
            }
         }
      }
      return Result
   }
   /// function TW3TagContainer.QueryChildrenReady() : Boolean
   ///  [line: 2566, column: 26, file: SmartCL.Components]
   ,QueryChildrenReady:function(Self) {
      var Result = false;
      var LCount$2 = 0,
         x$46 = 0;
      var LItem$5 = null;
      if (!$SetIn(Self.FComponentState,0,0,9)) {
         if (!$SetIn(Self.FComponentState,1,0,9)) {
            LCount$2 = TW3TagContainer.GetChildCount(Self);
            if (LCount$2>0) {
               var $temp19;
               for(x$46=0,$temp19=LCount$2;x$46<$temp19;x$46++) {
                  LItem$5 = TW3TagContainer.GetChildObject(Self,x$46);
                  Result = $SetIn(LItem$5.FComponentState,3,0,9);
                  if (!Result) {
                     break;
                  }
               }
            } else {
               Result = true;
            }
         }
      }
      return Result
   }
   /// procedure TW3TagContainer.RegisterChild(const Child: TW3TagContainer)
   ///  [line: 3008, column: 27, file: SmartCL.Components]
   ,RegisterChild:function(Self, Child$3) {
      if (Child$3!==null&&Child$3!==Self&&Self.FChildren.indexOf(Child$3)<0) {
         if (TW3TagObj.a$49(Child$3)) {
            TW3TagObj.RemoveFrom(Child$3);
         }
         TW3TagObj.BeginUpdate(Self);
         Self.FChildren.push(Child$3);
         TW3TagObj.InsertInto(Child$3,Self.FHandle$3);
         if (TW3TagContainer.a$53(Child$3)!==Self) {
            TW3OwnedObject.SetOwner(Child$3,Self);
         }
         TW3TagObj.AddToComponentState(Self,[64]);
         TW3TagObj.EndUpdate(Self);
         if ($SetIn(TW3TagObj.CreationFlags$(Self),2,0,8)) {
            TW3TagContainer.ChildAdded$(Self,Child$3);
         }
      }
   }
   /// procedure TW3TagContainer.SetComponentName(const NewComponentName: String)
   ///  [line: 2968, column: 27, file: SmartCL.Components]
   ,SetComponentName:function(Self, NewComponentName) {
      Self.Name = NewComponentName;
   }
   /// function TW3TagContainer.Showing() : Boolean
   ///  [line: 2765, column: 26, file: SmartCL.Components]
   ,Showing:function(Self) {
      var Result = false;
      if (TW3TagObj.Showing(Self)) {
         Result = TW3TagContainer.QueryChildrenReady(Self);
      }
      return Result
   }
   /// procedure TW3TagContainer.UnRegisterChild(const Child: TW3TagContainer)
   ///  [line: 3036, column: 27, file: SmartCL.Components]
   ,UnRegisterChild:function(Self, Child$4) {
      var LIndex = 0;
      if (Child$4!==null&&Child$4!==Self) {
         LIndex = Self.FChildren.indexOf(Child$4);
         if (LIndex>=0) {
            Self.FChildren.splice(LIndex,1)
            ;
            if (!Self.FChildren.length) {
               if ($SetIn(Self.FComponentState,6,0,9)) {
                  TW3TagObj.RemoveFromComponentState(Self,[64]);
               }
            }
            if ($SetIn(TW3TagObj.CreationFlags$(Self),3,0,8)) {
               TW3TagContainer.ChildRemoved$(Self,Child$4);
            }
            if (!$SetIn(Child$4.FComponentState,8,0,9)) {
               TW3TagObj.RemoveFrom(Child$4);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3TagContainer),"Failed to remove child component [%s], component not a child of this container error",[TW3TagContainer.GetComponentName(Child$4)]);
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject:TW3CustomComponent.InitializeObject
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3TagObj.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing$:function($){return $.ClassType.Showing($)}
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,UnHookEvents:TW3TagObj.UnHookEvents
   ,ChildAdded$:function($){return $.ClassType.ChildAdded.apply($.ClassType, arguments)}
   ,ChildRemoved$:function($){return $.ClassType.ChildRemoved.apply($.ClassType, arguments)}
   ,Create$86$:function($){return $.ClassType.Create$86.apply($.ClassType, arguments)}
};
TW3TagContainer.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3MovableControl = class (TW3TagContainer)
///  [line: 853, column: 3, file: SmartCL.Components]
var TW3MovableControl = {
   $ClassName:"TW3MovableControl",$Parent:TW3TagContainer
   ,$Init:function ($) {
      TW3TagContainer.$Init($);
      $.FAlpha = $.FSyncCount = 0;
      $.FBackground = $.FBorders = $.FConstraints = $.FEdgeRadius = $.FFont = $.FOnMoved = $.FOnResize = $.FOnVisible = $.FTextShadow = null;
      $.FColor = 0;
      $.FTransparent = $.FUseAlpha = false;
   }
   /// procedure TW3MovableControl.AfterUpdate()
   ///  [line: 3626, column: 29, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      if ($SetIn(Self.FComponentState,4,0,9)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3MovableControl.ResizeWhenReady(Self);
         }
         if ($Is(Self,TW3GraphicControl)) {
            TW3TagObj.AddToComponentState(Self,[32]);
         }
      }
      if ($SetIn(Self.FComponentState,5,0,9)) {
         if ($SetIn(TW3TagObj.CreationFlags$(Self),4,0,8)) {
            if ($SetIn(Self.FComponentState,3,0,9)) {
               TW3MovableControl.Moved(Self);
               if (Self.FOnMoved) {
                  Self.FOnMoved(Self);
               }
            }
         }
         if ($SetIn(Self.FComponentState,3,0,9)) {
            if ($Is(Self,TW3GraphicControl)) {
               TW3MovableControl.Invalidate$($As(Self,TW3GraphicControl));
            }
         }
      }
      TW3TagObj.RemoveFromComponentState(Self,[48]);
   }
   /// function TW3MovableControl.ClientHeight() : Integer
   ///  [line: 3501, column: 28, file: SmartCL.Components]
   ,ClientHeight:function(Self) {
      var Result = 0;
      var CSHandle = undefined;
      if (Self.FHandle$3) {
         Result = w3_getPropertyAsInt(Self.FHandle$3,"clientHeight");
         if (Self.FPositionMode==24) {
            CSHandle = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,Self.FHandle$3);
            if (CSHandle) {
               Result-=w3_getPropertyAsInt(CSHandle,"paddingTop")+w3_getPropertyAsInt(CSHandle,"paddingBottom");
            }
         }
      }
      return Result
   }
   /// function TW3MovableControl.ClientRect() : TRect
   ///  [line: 3520, column: 28, file: SmartCL.Components]
   ,ClientRect:function(Self) {
      return Create$107(0,0,TW3MovableControl.ClientWidth(Self),TW3MovableControl.ClientHeight(Self));
   }
   /// function TW3MovableControl.ClientWidth() : Integer
   ///  [line: 3487, column: 28, file: SmartCL.Components]
   ,ClientWidth:function(Self) {
      var Result = 0;
      var CSHandle$1 = undefined;
      if (Self.FHandle$3) {
         Result = w3_getPropertyAsInt(Self.FHandle$3,"clientWidth");
         if (Self.FPositionMode==24) {
            CSHandle$1 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,Self.FHandle$3);
            if (CSHandle$1) {
               Result-=w3_getPropertyAsInt(CSHandle$1,"paddingLeft")+w3_getPropertyAsInt(CSHandle$1,"paddingRight");
            }
         }
      }
      return Result
   }
   /// procedure TW3MovableControl.FinalizeObject()
   ///  [line: 3574, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      if (Self.FBackground) {
         TObject.Free(Self.FBackground);
      }
      if (Self.FBorders) {
         TObject.Free(Self.FBorders);
      }
      if (Self.FConstraints) {
         TObject.Free(Self.FConstraints);
      }
      if (Self.FTextShadow) {
         TObject.Free(Self.FTextShadow);
      }
      if (Self.FEdgeRadius) {
         TObject.Free(Self.FEdgeRadius);
      }
      TW3TagContainer.FinalizeObject(Self);
   }
   /// function TW3MovableControl.fxBusy() : Boolean
   ///  [line: 378, column: 28, file: SmartCL.Effects]
   ,fxBusy:function(Self) {
      var Result = false;
      if (TW3ElementAttributes.Exists$1(TW3TagObj.GetAttributes(Self),"fxBusy")) {
         Result = TW3ElementAttributes.Read$3(TW3TagObj.GetAttributes(Self),"fxBusy")=="yes";
      } else {
         Result = false;
      }
      return Result
   }
   /// procedure TW3MovableControl.fxFadeIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 1040, column: 29, file: SmartCL.Effects]
   ,fxFadeIn$1:function(Self, Duration$1, OnFinished$1) {
      var mEffect = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxFadeIn$1(Self,Duration$1,OnFinished$1);
         },50);
      } else {
         mEffect = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectFade));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect,TW3CssEffectFade).FFrom$1 = 0;
         $As(mEffect,TW3CssEffectFade).FTo$1 = 1;
         TW3CustomCSSAnimation.SetDuration(mEffect,Duration$1);
         mEffect.OnAnimationEnds = function (Sender$3) {
            TW3MovableControl.SetVisible(Self,true);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$1) {
               OnFinished$1();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$3,TW3CustomCSSAnimation));
            },1000);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomCSSAnimation.Execute$1(mEffect,Self);
      }
   }
   /// procedure TW3MovableControl.fxFadeOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 1093, column: 29, file: SmartCL.Effects]
   ,fxFadeOut$1:function(Self, Duration$2, OnFinished$2) {
      var mEffect$1 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxFadeOut$1(Self,Duration$2,OnFinished$2);
         },50);
      } else {
         mEffect$1 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectFade));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect$1,TW3CssEffectFade).FFrom$1 = 1;
         $As(mEffect$1,TW3CssEffectFade).FTo$1 = 0;
         TW3CustomCSSAnimation.SetDuration(mEffect$1,Duration$2);
         mEffect$1.OnAnimationEnds = function (Sender$4) {
            TW3MovableControl.SetVisible(Self,false);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$2) {
               OnFinished$2();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$4,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$1,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveBy(const dx: Integer; const dy: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 675, column: 29, file: SmartCL.Effects]
   ,fxMoveBy$1:function(Self, dx$3, dy$3, Duration$3, OnFinished$3) {
      var mEffect$2 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveBy$1(Self,dx$3,dy$3,Duration$3,OnFinished$3);
         },50);
      } else {
         mEffect$2 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectMove));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$2,Duration$3);
         $As(mEffect$2,TW3CssEffectMove).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$2,TW3CssEffectMove).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$2,TW3CssEffectMove).FToX = TW3MovableControl.GetLeft(Self)+dx$3;
         $As(mEffect$2,TW3CssEffectMove).FToY = TW3MovableControl.GetTop(Self)+dy$3;
         TW3CustomCSSAnimation.SetEasing($As(mEffect$2,TW3CssEffectMove),5);
         mEffect$2.OnAnimationEnds = function (sender) {
            TW3MovableControl.MoveTo$(Self,$As(sender,TW3CssEffectMove).FToX,$As(sender,TW3CssEffectMove).FToY);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$3) {
               OnFinished$3();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$2,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveDown(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 622, column: 29, file: SmartCL.Effects]
   ,fxMoveDown$1:function(Self, Duration$4, OnFinished$4) {
      var mEffect$3 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveDown$1(Self,Duration$4,OnFinished$4);
         },50);
      } else {
         mEffect$3 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectMove));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$3,Duration$4);
         $As(mEffect$3,TW3CssEffectMove).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$3,TW3CssEffectMove).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$3,TW3CssEffectMove).FToX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$3,TW3CssEffectMove).FToY = TW3MovableControl.GetHeight$($As(TW3TagContainer.a$53(Self),TW3MovableControl))-TW3MovableControl.GetHeight$(Self);
         TW3CustomCSSAnimation.SetEasing($As(mEffect$3,TW3CssEffectMove),5);
         mEffect$3.OnAnimationEnds = function (sender$1) {
            TW3MovableControl.SetTop$(Self,(TW3MovableControl.GetHeight$($As(TW3TagContainer.a$53(Self),TW3MovableControl))-TW3MovableControl.GetHeight$(Self)));
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$4) {
               OnFinished$4();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$1,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$3,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveTo(const dx: Integer; const dy: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 798, column: 29, file: SmartCL.Effects]
   ,fxMoveTo$1:function(Self, dx$4, dy$4, Duration$5, OnFinished$5) {
      var mEffect$4 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveTo$1(Self,dx$4,dy$4,Duration$5,OnFinished$5);
         },50);
      } else {
         mEffect$4 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectMove));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$4,Duration$5);
         mEffect$4.FFromX = TW3MovableControl.GetLeft(Self);
         mEffect$4.FFromY = TW3MovableControl.GetTop(Self);
         mEffect$4.FToX = dx$4;
         mEffect$4.FToY = dy$4;
         TW3CustomCSSAnimation.SetEasing(mEffect$4,5);
         mEffect$4.OnAnimationEnds = function (sender$2) {
            TW3MovableControl.MoveTo$(Self,dx$4,dy$4);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$5) {
               OnFinished$5();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$2,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$4,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveUp(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 570, column: 29, file: SmartCL.Effects]
   ,fxMoveUp$1:function(Self, Duration$6, OnFinished$6) {
      var mEffect$5 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveUp$1(Self,Duration$6,OnFinished$6);
         },50);
      } else {
         mEffect$5 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectMove));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$5,Duration$6);
         $As(mEffect$5,TW3CssEffectMove).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$5,TW3CssEffectMove).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$5,TW3CssEffectMove).FToX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$5,TW3CssEffectMove).FToY = 0;
         TW3CustomCSSAnimation.SetEasing($As(mEffect$5,TW3CssEffectMove),5);
         mEffect$5.OnAnimationEnds = function (sender$3) {
            TW3MovableControl.SetTop$(Self,0);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$6) {
               OnFinished$6();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$3,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$5,Self);
      }
   }
   /// procedure TW3MovableControl.fxScaleDown(FromScale: Float; ToScale: Float; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 449, column: 29, file: SmartCL.Effects]
   ,fxScaleDown$1:function(Self, FromScale$1, ToScale$1, Duration$7, OnFinished$7) {
      var mEffect$6 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxScaleDown$1(Self,FromScale$1,ToScale$1,Duration$7,OnFinished$7);
         },50);
      } else {
         mEffect$6 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectScale));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect$6,TW3CssEffectScale).FFrom = FromScale$1;
         $As(mEffect$6,TW3CssEffectScale).FTo = ToScale$1;
         TW3CustomCSSAnimation.SetEasing($As(mEffect$6,TW3CssEffectScale),5);
         TW3CustomCSSAnimation.SetDuration($As(mEffect$6,TW3CssEffectScale),Duration$7);
         mEffect$6.OnAnimationEnds = function (sender$4) {
            if (ToScale$1==1) {
               Self.FHandle$3.style["-webkit-transform"] = "";
            } else {
               Self.FHandle$3.style["-webkit-transform"] = "scale("+FloatToStr$_Float_(ToScale$1)+")";
            }
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$7) {
               OnFinished$7();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$4,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$6,Self);
      }
   }
   /// procedure TW3MovableControl.fxScaleTo(const aToX: Integer; const aToY: Integer; const aToWidth: Integer; const aToHeight: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 733, column: 29, file: SmartCL.Effects]
   ,fxScaleTo$1:function(Self, aToX, aToY, aToWidth, aToHeight, Duration$8, OnFinished$8) {
      var mEffect$7 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxScaleTo$1(Self,aToX,aToY,aToWidth,aToHeight,Duration$8,OnFinished$8);
         },50);
      } else {
         mEffect$7 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectSize));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$7,Duration$8);
         $As(mEffect$7,TW3CssEffectSize).FromLeft = TW3MovableControl.GetLeft(Self);
         $As(mEffect$7,TW3CssEffectSize).FromTop = TW3MovableControl.GetTop(Self);
         $As(mEffect$7,TW3CssEffectSize).FromWidth = TW3MovableControl.GetWidth$(Self);
         $As(mEffect$7,TW3CssEffectSize).FromHeight = TW3MovableControl.GetHeight$(Self);
         $As(mEffect$7,TW3CssEffectSize).ToLeft = aToX;
         $As(mEffect$7,TW3CssEffectSize).ToTop = aToY;
         $As(mEffect$7,TW3CssEffectSize).ToWidth = aToWidth;
         $As(mEffect$7,TW3CssEffectSize).ToHeight = aToHeight;
         TW3CustomCSSAnimation.SetEasing($As(mEffect$7,TW3CssEffectSize),5);
         mEffect$7.OnAnimationEnds = function (sender$5) {
            TW3MovableControl.SetBounds$(Self,aToX,aToY,aToWidth,aToHeight);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$8) {
               OnFinished$8();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$5,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$7,Self);
      }
   }
   /// procedure TW3MovableControl.fxScaleUp(FromScale: Float; ToScale: Float; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 398, column: 29, file: SmartCL.Effects]
   ,fxScaleUp$1:function(Self, FromScale$2, ToScale$2, Duration$9, OnFinished$9) {
      var Effect$1 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxScaleUp$1(Self,FromScale$2,ToScale$2,Duration$9,OnFinished$9);
         },50);
      } else {
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         Effect$1 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectScale));
         Effect$1.FFrom = FromScale$2;
         Effect$1.FTo = ToScale$2;
         TW3CustomCSSAnimation.SetEasing(Effect$1,5);
         TW3CustomCSSAnimation.SetDuration(Effect$1,Duration$9);
         Effect$1.OnAnimationEnds = function (sender$6) {
            if (ToScale$2==1) {
               Self.FHandle$3.style["-webkit-transform"] = "";
            } else {
               Self.FHandle$3.style["-webkit-transform"] = "scale("+FloatToStr$_Float_(ToScale$2)+")";
            }
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$9) {
               OnFinished$9();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$6,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(Effect$1,Self);
      }
   }
   /// procedure TW3MovableControl.fxSizeTo(const aWidth: Integer; const aHeight: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 504, column: 29, file: SmartCL.Effects]
   ,fxSizeTo$1:function(Self, aWidth, aHeight, Duration$10, OnFinished$10) {
      var mEffect$8 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxSizeTo$1(Self,aWidth,aHeight,Duration$10,OnFinished$10);
         },50);
      } else {
         mEffect$8 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectSize));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$8,Duration$10);
         $As(mEffect$8,TW3CssEffectSize).FromLeft = TW3MovableControl.GetLeft(Self);
         $As(mEffect$8,TW3CssEffectSize).FromTop = TW3MovableControl.GetTop(Self);
         $As(mEffect$8,TW3CssEffectSize).FromWidth = TW3MovableControl.GetWidth$(Self);
         $As(mEffect$8,TW3CssEffectSize).FromHeight = TW3MovableControl.GetHeight$(Self);
         $As(mEffect$8,TW3CssEffectSize).ToLeft = TW3MovableControl.GetLeft(Self);
         $As(mEffect$8,TW3CssEffectSize).ToTop = TW3MovableControl.GetTop(Self);
         $As(mEffect$8,TW3CssEffectSize).ToWidth = aWidth;
         $As(mEffect$8,TW3CssEffectSize).ToHeight = aHeight;
         TW3CustomCSSAnimation.SetEasing($As(mEffect$8,TW3CssEffectSize),5);
         mEffect$8.OnAnimationEnds = function (sender$7) {
            TW3MovableControl.SetBounds$(Self,$As(mEffect$8,TW3CssEffectSize).ToLeft,$As(mEffect$8,TW3CssEffectSize).ToTop,$As(mEffect$8,TW3CssEffectSize).ToWidth,$As(mEffect$8,TW3CssEffectSize).ToHeight);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$10) {
               OnFinished$10();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$7,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$8,Self);
      }
   }
   /// procedure TW3MovableControl.fxWarpIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 991, column: 29, file: SmartCL.Effects]
   ,fxWarpIn$1:function(Self, Duration$11, OnFinished$11) {
      var mEffect$9 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxWarpIn$1(Self,Duration$11,OnFinished$11);
         },50);
      } else {
         mEffect$9 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectWarpIn));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$9,Duration$11);
         mEffect$9.OnAnimationEnds = function (Sender$5) {
            TW3MovableControl.SetVisible(Self,true);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$11) {
               OnFinished$11();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$5,TW3CustomCSSAnimation));
            },1000);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomCSSAnimation.Execute$1(mEffect$9,Self);
      }
   }
   /// procedure TW3MovableControl.fxWarpOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 943, column: 29, file: SmartCL.Effects]
   ,fxWarpOut$1:function(Self, Duration$12, OnFinished$12) {
      var mEffect$10 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxWarpOut$1(Self,Duration$12,OnFinished$12);
         },50);
      } else {
         mEffect$10 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectWarpOut));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$10,Duration$12);
         mEffect$10.OnAnimationEnds = function (Sender$6) {
            TW3MovableControl.SetVisible(Self,false);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$12) {
               OnFinished$12();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$6,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$10,Self);
      }
   }
   /// procedure TW3MovableControl.fxZoomIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 851, column: 29, file: SmartCL.Effects]
   ,fxZoomIn$1:function(Self, Duration$13, OnFinished$13) {
      var Effect$2 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxZoomIn$1(Self,Duration$13,OnFinished$13);
         },50);
      } else {
         Effect$2 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectZoomIn));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(Effect$2,Duration$13);
         Effect$2.OnAnimationEnds = function (Sender$7) {
            TW3MovableControl.SetVisible(Self,true);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$13) {
               OnFinished$13();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$7,TW3CssEffectZoomIn));
            },1000);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomCSSAnimation.Execute$1(Effect$2,Self);
      }
   }
   /// procedure TW3MovableControl.fxZoomOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 896, column: 29, file: SmartCL.Effects]
   ,fxZoomOut$1:function(Self, Duration$14, OnFinished$14) {
      var mEffect$11 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxZoomOut$1(Self,Duration$14,OnFinished$14);
         },50);
      } else {
         mEffect$11 = TW3CustomCSSAnimation.Create$135$($New(TW3CssEffectZoomOut));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomCSSAnimation.SetDuration(mEffect$11,Duration$14);
         mEffect$11.OnAnimationEnds = function (Sender$8) {
            TW3MovableControl.SetVisible(Self,false);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$14) {
               OnFinished$14();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$8,TW3CustomCSSAnimation));
            },1000);
         };
         TW3CustomCSSAnimation.Execute$1(mEffect$11,Self);
      }
   }
   /// function TW3MovableControl.GetBackGround() : TW3ControlBackground
   ///  [line: 3674, column: 28, file: SmartCL.Components]
   ,GetBackGround:function(Self) {
      var Result = null;
      if (Self.FBackground===null) {
         Self.FBackground = TW3OwnedObject.Create$11$($New(TW3ControlBackground),Self);
      }
      Result = Self.FBackground;
      return Result
   }
   /// function TW3MovableControl.GetBorder() : TW3Borders
   ///  [line: 3619, column: 28, file: SmartCL.Components]
   ,GetBorder:function(Self) {
      var Result = null;
      if (Self.FBorders===null) {
         Self.FBorders = TW3OwnedObject.Create$11$($New(TW3Borders),Self);
      }
      Result = Self.FBorders;
      return Result
   }
   /// function TW3MovableControl.GetBoundsRect() : TRect
   ///  [line: 3729, column: 28, file: SmartCL.Components]
   ,GetBoundsRect:function(Self) {
      var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      if (Self.FHandle$3) {
         Result.Left$3 = w3_GetStyleAsInt(Self.FHandle$3,"left");
         Result.Top$3 = w3_GetStyleAsInt(Self.FHandle$3,"top");
         Result.Right$1 = Result.Left$3+w3_GetStyleAsInt(Self.FHandle$3,"width");
         Result.Bottom$1 = Result.Top$3+w3_GetStyleAsInt(Self.FHandle$3,"height");
      }
      return Result
   }
   /// function TW3MovableControl.GetConstraints() : TW3Constraints
   ///  [line: 3597, column: 28, file: SmartCL.Components]
   ,GetConstraints:function(Self) {
      var Result = null;
      if (Self.FConstraints===null) {
         Self.FConstraints = TW3Constraints.Create$126($New(TW3Constraints),Self);
      }
      Result = Self.FConstraints;
      return Result
   }
   /// function TW3MovableControl.GetFont() : TW3CustomFont
   ///  [line: 3297, column: 28, file: SmartCL.Components]
   ,GetFont:function(Self) {
      var Result = null;
      if (Self.FFont===null) {
         Self.FFont = TW3ControlFont.Create$124($New(TW3ControlFont),Self);
      }
      Result = Self.FFont;
      return Result
   }
   /// function TW3MovableControl.GetHeight() : Integer
   ///  [line: 3911, column: 28, file: SmartCL.Components]
   ,GetHeight:function(Self) {
      var Result = 0;
      if (Self.FHandle$3) {
         Result = parseInt(Self.FHandle$3.offsetHeight,10);
         if (Self.FPositionMode==24) {
            Result+=w3_GetStyleAsInt(Self.FHandle$3,"margin-top")+w3_GetStyleAsInt(Self.FHandle$3,"margin-bottom");
         }
      }
      return Result
   }
   /// function TW3MovableControl.GetLeft() : Integer
   ///  [line: 3740, column: 28, file: SmartCL.Components]
   ,GetLeft:function(Self) {
      var Result = 0;
      var LRef$1 = undefined,
         CSHandle$2 = undefined;
      LRef$1 = Self.FHandle$3;
      if (LRef$1) {
         var mObj = document.defaultView.getComputedStyle(LRef$1, null);
      var mData = mObj.getPropertyValue("left");
      if (typeof(mData) === "number") {
        Result = mData;
      } else {
        if (typeof(mData) === "string") {
          mData = parseInt(mData.trim());

          if (typeof(mData) === "number")
            Result = mData;
        }
      }
      }
      if (Self.FPositionMode==24) {
         CSHandle$2 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,TW3TagContainer.a$53(Self).FHandle$3);
         if (CSHandle$2) {
            Result-=w3_getPropertyAsInt(CSHandle$2,"paddingLeft");
         }
      }
      return Result
   }
   /// function TW3MovableControl.GetStyleClass() : String
   ///  [line: 3317, column: 28, file: SmartCL.Components]
   ,GetStyleClass:function(Self) {
      return w3_getAttribAsStr(Self.FHandle$3,"class");
   }
   /// function TW3MovableControl.GetTop() : Integer
   ///  [line: 3788, column: 28, file: SmartCL.Components]
   ,GetTop:function(Self) {
      var Result = 0;
      var LRef$2 = undefined,
         CSHandle$3 = undefined;
      LRef$2 = Self.FHandle$3;
      if (LRef$2) {
         var mObj = document.defaultView.getComputedStyle(LRef$2, null);
      var mData = mObj.getPropertyValue("top");
      if (typeof(mData) === "number") {
        Result = mData;
      } else {
        if (typeof(mData) === "string") {
          mData = parseInt(mData.trim());

          if (typeof(mData) === "number")
            Result = mData;
        }
      }
      }
      if (Self.FPositionMode==24) {
         CSHandle$3 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,TW3TagContainer.a$53(Self).FHandle$3);
         if (CSHandle$3) {
            Result-=w3_getPropertyAsInt(CSHandle$3,"paddingTop");
         }
      }
      return Result
   }
   /// function TW3MovableControl.GetVisible() : Boolean
   ///  [line: 3681, column: 28, file: SmartCL.Components]
   ,GetVisible:function(Self) {
      var Result = false;
      var LObj$1,
         LData$2;
      if (Self.FHandle$3) {
         LObj$1 = document.defaultView.getComputedStyle(Self.FHandle$3,null);
         if (LObj$1) {
            LData$2 = LObj$1.getPropertyValue("visibility");
         } else {
            LData$2 = Self.FHandle$3.style.visibility;
         }
         if (LData$2) {
            Result = LData$2=="visible";
         }
      }
      return Result
   }
   /// function TW3MovableControl.GetWidth() : Integer
   ///  [line: 3835, column: 28, file: SmartCL.Components]
   ,GetWidth:function(Self) {
      var Result = 0;
      if (Self.FHandle$3) {
         Result = parseInt(Self.FHandle$3.offsetWidth,10);
         if (Self.FPositionMode==24) {
            Result+=w3_GetStyleAsInt(Self.FHandle$3,"margin-left")+w3_GetStyleAsInt(Self.FHandle$3,"margin-right");
         }
      }
      return Result
   }
   /// procedure TW3MovableControl.InitializeObject()
   ///  [line: 3268, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3CustomComponent.InitializeObject(Self);
      Self.FAlpha = 255;
      Self.FColor = 536870911;
      Self.FTransparent = false;
      if (TW3TagContainer.a$53(Self)) {
         if ($SetIn(TW3TagObj.CreationFlags$(Self),0,0,8)) {
            TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ObjectReady$),16);
         } else {
            TW3MovableControl.ReadySync$1(Self);
         }
      } else {
         TW3MovableControl.ObjectReady$(Self);
      }
   }
   /// procedure TW3MovableControl.Invalidate()
   ///  [line: 3986, column: 29, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      if ((!$SetIn(Self.FComponentState,7,0,9))&&(!$SetIn(Self.FComponentState,8,0,9))) {
         if (TW3MovableControl.GetVisible(Self)) {
            TW3TagObj.AddToComponentState(Self,[128]);
            TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ResizeWhenReady),10);
         }
      }
   }
   /// function TW3MovableControl.MeasureText(const TextContent: String) : TW3TextMetric
   ///  [line: 4325, column: 28, file: SmartCL.Components]
   ,MeasureText:function(Self, TextContent) {
      return TW3FontDetector.MeasureText$2(W3FontDetector(),TW3FontDetector.GetFontInfo$2(W3FontDetector(),Self.FHandle$3),TextContent);
   }
   /// procedure TW3MovableControl.Moved()
   ///  [line: 3999, column: 29, file: SmartCL.Components]
   ,Moved:function(Self) {
      /* null */
   }
   /// procedure TW3MovableControl.MoveTo(const NewLeft: Integer; const NewTop: Integer)
   ///  [line: 4068, column: 29, file: SmartCL.Components]
   ,MoveTo:function(Self, NewLeft, NewTop) {
      var LLeft = 0,
         LTop = 0,
         CSHandle$4 = undefined;
      LLeft = NewLeft;
      LTop = NewTop;
      TW3TagObj.BeginUpdate(Self);
      if (Self.FPositionMode==24) {
         CSHandle$4 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,TW3TagContainer.a$53(Self).FHandle$3);
         if (CSHandle$4) {
            LLeft+=w3_getPropertyAsInt(CSHandle$4,"paddingLeft");
            LTop+=w3_getPropertyAsInt(CSHandle$4,"paddingTop");
         }
      }
      Self.FHandle$3.style.left = TInteger.ToPxStr(LLeft);
      Self.FHandle$3.style.top = TInteger.ToPxStr(LTop);
      TW3TagObj.AddToComponentState(Self,[32]);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.ObjectReady()
   ///  [line: 3412, column: 29, file: SmartCL.Components]
   ,ObjectReady:function(Self) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (Self.FHandle$3) {
            TW3TagObj.AddToComponentState(Self,[8]);
            TW3TagObj.HookEvents$(Self);
            if ((TW3TagContainer.a$53(Self)!==null)&&((TW3MovableControl.GetWidth$(Self)!=0)||(TW3MovableControl.GetHeight$(Self)!=0))) {
               TW3MovableControl.ResizeWhenReady(Self);
            }
         }
      }
   }
   /// procedure TW3MovableControl.ReadySync()
   ///  [line: 3355, column: 29, file: SmartCL.Components]
   ,ReadySync$1:function(Self) {
      function ReSync() {
         ++Self.FSyncCount;
         if (Self.FSyncCount>300) {
            TW3MovableControl.ObjectReady$(Self);
            Self.FSyncCount = 0;
            return;
         }
         TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ReadySync$1),40);
      };
      if (Self.FHandle$3) {
         if (TControlHandleHelper$Ready$4(Self.FHandle$3)) {
            if ($SetIn(Self.FComponentState,0,0,9)) {
               ReSync();
            } else {
               if ($SetIn(Self.FComponentState,1,0,9)) {
                  ReSync();
               } else {
                  if (!TW3MovableControl.GetVisible(Self)) {
                     if (Self.FSyncCount>0) {
                        TW3MovableControl.ObjectReady$(Self);
                     } else {
                        TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ObjectReady$),10);
                     }
                     return;
                  }
                  if (TW3TagContainer.QueryChildrenReady(Self)) {
                     if (Self.FSyncCount>0) {
                        TW3MovableControl.ObjectReady$(Self);
                     } else {
                        TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ObjectReady$),10);
                     }
                  } else {
                     ReSync();
                  }
               }
            }
         } else {
            ReSync();
         }
      } else {
         ReSync();
      }
   }
   /// procedure TW3MovableControl.Resize()
   ///  [line: 4003, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      var wd$1 = 0,
         xwidth = 0,
         fbase = 0,
         fSize = 0;
      if (Self.FFont!==null) {
         if (Self.FFont.FAuto) {
            wd$1 = TW3MovableControl.GetWidth$(Self);
            if (wd$1>0) {
               xwidth = (wd$1>9999)?9999:(wd$1<1)?1:wd$1;
               fbase = Math.round(xwidth/6.3);
               fSize = (fbase>9999)?9999:(fbase<1)?1:fbase;
               Self.FHandle$3.style.fontSize = TInteger.ToPxStr(fSize);
            }
         }
      }
   }
   /// procedure TW3MovableControl.ResizeWhenReady()
   ///  [line: 4028, column: 29, file: SmartCL.Components]
   ,ResizeWhenReady:function(Self) {
      if ($SetIn(Self.FComponentState,6,0,9)) {
         if (TW3TagContainer.QueryChildrenReady(Self)) {
            TW3TagObj.RemoveFromComponentState(Self,[64]);
         } else {
            ++Self.FSyncCount;
            if (Self.FSyncCount<300) {
               TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ResizeWhenReady),10);
               return;
            } else {
               Self.FSyncCount = 0;
            }
         }
      }
      if ($SetIn(Self.FComponentState,7,0,9)) {
         TW3TagObj.RemoveFromComponentState(Self,[128]);
      }
      if ($SetIn(Self.FComponentState,3,0,9)&&TW3MovableControl.GetVisible(Self)) {
         TW3MovableControl.Resize$(Self);
         if ($SetIn(TW3TagObj.CreationFlags$(Self),5,0,8)) {
            if (Self.FOnResize) {
               Self.FOnResize(Self);
            }
         }
      }
   }
   /// function TW3MovableControl.ScreenRect() : TRect
   ///  [line: 3525, column: 28, file: SmartCL.Components]
   ,ScreenRect:function(Self) {
      var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      var dx$5 = 0;
      var dy$5 = 0;
      var Element$4 = null;
      var LElement$1 = undefined;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Element$4 = Self;
         while (Element$4!==null) {
            LElement$1 = Element$4.FHandle$3;
            dx$5+=parseInt(LElement$1.offsetLeft,10);
            dy$5+=parseInt(LElement$1.offsetTop,10);
            if ($Is(TW3TagContainer.a$53(Element$4),TW3MovableControl)) {
               Element$4 = $As(TW3TagContainer.a$53(Element$4),TW3MovableControl);
            } else {
               break;
            }
            LElement$1 = Element$4.FHandle$3;
            if (LElement$1) {
               dx$5-=parseInt(LElement$1.scrollLeft,10);
               dx$5+=TW3Border.GetWidth$6(TW3MovableControl.GetBorder(Element$4).FLeft);
               dy$5-=parseInt(LElement$1.scrollTop,10);
               dy$5+=TW3Border.GetWidth$6(TW3MovableControl.GetBorder(Element$4).FTop);
            } else {
               break;
            }
         }
         Result.Left$3 = dx$5;
         Result.Top$3 = dy$5;
         Result.Right$1 = parseInt((dx$5+Self.FHandle$3.offsetWidth),10);
         Result.Bottom$1 = parseInt((dy$5+Self.FHandle$3.offsetHeight),10);
      }
      return Result
   }
   /// procedure TW3MovableControl.SetAlpha(const NewAlphaValue: Integer)
   ///  [line: 4251, column: 29, file: SmartCL.Components]
   ,SetAlpha:function(Self, NewAlphaValue) {
      Self.FAlpha = TInteger.EnsureRange(NewAlphaValue,0,255);
      if (Self.FUseAlpha) {
         Self.FHandle$3.style["opacity"] = Self.FAlpha*0.01;
      }
   }
   /// procedure TW3MovableControl.SetBounds(const NewBounds: TRect)
   ///  [line: 4176, column: 29, file: SmartCL.Components]
   ,SetBounds$1:function(Self, NewBounds) {
      TW3MovableControl.SetBounds$(Self,NewBounds.Left$3,NewBounds.Top$3,TRect$Width$6(NewBounds),TRect$Height$5(NewBounds));
   }
   /// procedure TW3MovableControl.SetBounds(const NewLeft: Integer; const NewTop: Integer; const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 4088, column: 29, file: SmartCL.Components]
   ,SetBounds:function(Self, NewLeft$1, NewTop$1, NewWidth, NewHeight) {
      var LHeight = 0,
         LWidth = 0,
         LLeft$1 = 0,
         LTop$1 = 0,
         CSHandle$5 = undefined,
         LMoved = false,
         LSized = false;
      LHeight = NewHeight;
      LWidth = NewWidth;
      if (TW3MovableControl.GetConstraints(Self).FEnabled) {
         if (TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewHeight<TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self))) {
               LHeight = TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewHeight>TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self))) {
               LHeight = TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewWidth<TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self))) {
               LWidth = TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewWidth>TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self))) {
               LWidth = TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self));
            }
         }
      }
      LLeft$1 = NewLeft$1;
      LTop$1 = NewTop$1;
      if (Self.FPositionMode==24) {
         LWidth-=w3_GetStyleAsInt(Self.FHandle$3,"margin-left")+w3_GetStyleAsInt(Self.FHandle$3,"margin-right");
         LHeight-=w3_GetStyleAsInt(Self.FHandle$3,"margin-top")+w3_GetStyleAsInt(Self.FHandle$3,"margin-bottom");
         CSHandle$5 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,TW3TagContainer.a$53(Self).FHandle$3);
         if (CSHandle$5) {
            LLeft$1+=w3_getPropertyAsInt(CSHandle$5,"paddingLeft");
            LTop$1+=w3_getPropertyAsInt(CSHandle$5,"paddingTop");
         }
      }
      LMoved = LLeft$1!=w3_GetStyleAsInt(Self.FHandle$3,"left")||LTop$1!=w3_GetStyleAsInt(Self.FHandle$3,"top");
      LSized = LWidth!=w3_GetStyleAsInt(Self.FHandle$3,"width")||LHeight!=w3_GetStyleAsInt(Self.FHandle$3,"height");
      if (LMoved||LSized) {
         TW3TagObj.BeginUpdate(Self);
      }
      if (LMoved) {
         Self.FHandle$3.style.left = (LLeft$1.toString()+"px");
         Self.FHandle$3.style.top = (LTop$1.toString()+"px");
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.AddToComponentState(Self,[32]);
         }
      }
      if (LSized) {
         Self.FHandle$3.style.width = (LWidth.toString()+"px");
         Self.FHandle$3.style.height = (LHeight.toString()+"px");
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.AddToComponentState(Self,[16]);
         }
      }
      if (LMoved||LSized) {
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3MovableControl.SetColor(const NewColor: TColor)
   ///  [line: 4283, column: 29, file: SmartCL.Components]
   ,SetColor:function(Self, NewColor) {
      var LAlpha = 0,
         LHandle = undefined,
         LTransparent = false,
         r$3 = 0,
         g$1 = 0,
         b$2 = 0;
      if (NewColor!=Self.FColor) {
         Self.FColor = NewColor;
         LAlpha = Self.FAlpha;
         LHandle = Self.FHandle$3;
         LTransparent = Self.FTransparent;
         r$3 = (NewColor>>>16)&255;
         g$1 = (NewColor>>>8)&255;
         b$2 = NewColor&255;
         if (Self.FTransparent) {
            Self.FHandle$3.style.backgroundColor = ("rgba("+__StrByteLUT[r$3]+","+__StrByteLUT[g$1]+","+__StrByteLUT[b$2]+","+__StrByteLUT[$Div(Self.FAlpha,255)]+")");
         } else {
            Self.FHandle$3.style.backgroundColor = ("#"+__ByteToHexLUT[r$3]+__ByteToHexLUT[g$1]+__ByteToHexLUT[b$2]);
         }
      }
   }
   /// procedure TW3MovableControl.SetHeight(const NewHeight: Integer)
   ///  [line: 3945, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, NewHeight$1) {
      var LHeight$1 = 0;
      LHeight$1 = NewHeight$1;
      if (TW3MovableControl.GetConstraints(Self).FEnabled) {
         if (TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewHeight$1<TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self))) {
               LHeight$1 = TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewHeight$1>TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self))) {
               LHeight$1 = TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self));
            }
         }
      }
      if (Self.FPositionMode==24) {
         LHeight$1-=w3_GetStyleAsInt(Self.FHandle$3,"margin-top")+w3_GetStyleAsInt(Self.FHandle$3,"margin-bottom");
      }
      if (LHeight$1!=TW3MovableControl.GetHeight$(Self)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.height = (LHeight$1.toString()+"px");
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.height = (LHeight$1.toString()+"px");
         }
      }
   }
   /// procedure TW3MovableControl.SetLeft(const NewLeft: Integer)
   ///  [line: 3768, column: 29, file: SmartCL.Components]
   ,SetLeft:function(Self, NewLeft$2) {
      var LLeft$2 = 0,
         CSHandle$6 = undefined;
      LLeft$2 = NewLeft$2;
      if ($SetIn(Self.FComponentState,3,0,9)) {
         if (Self.FPositionMode==24) {
            CSHandle$6 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,TW3TagContainer.a$53(Self).FHandle$3);
            if (CSHandle$6) {
               LLeft$2+=w3_getPropertyAsInt(CSHandle$6,"paddingLeft");
            }
         }
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle$3.style.left = TInteger.ToPxStr(LLeft$2);
         TW3TagObj.AddToComponentState(Self,[32]);
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle$3.style.left = TInteger.ToPxStr(LLeft$2);
      }
   }
   /// procedure TW3MovableControl.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 4181, column: 29, file: SmartCL.Components]
   ,SetSize$2:function(Self, NewWidth$1, NewHeight$2) {
      var LHeight$2 = 0,
         LWidth$1 = 0;
      LHeight$2 = NewHeight$2;
      LWidth$1 = NewWidth$1;
      if (TW3MovableControl.GetConstraints(Self).FEnabled) {
         if (TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewHeight$2<TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self))) {
               LHeight$2 = TW3Constraints.GetMinHeight(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewHeight$2>TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self))) {
               LHeight$2 = TW3Constraints.GetMaxHeight(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewWidth$1<TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self))) {
               LWidth$1 = TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewWidth$1>TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self))) {
               LWidth$1 = TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self));
            }
         }
      }
      if (Self.FPositionMode==24) {
         LWidth$1-=w3_GetStyleAsInt(Self.FHandle$3,"margin-left")+w3_GetStyleAsInt(Self.FHandle$3,"margin-right");
         LHeight$2-=w3_GetStyleAsInt(Self.FHandle$3,"margin-top")+w3_GetStyleAsInt(Self.FHandle$3,"margin-bottom");
      }
      if (LWidth$1!=TW3MovableControl.GetWidth$(Self)||LHeight$2!=TW3MovableControl.GetHeight$(Self)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.width = (LWidth$1.toString()+"px");
            Self.FHandle$3.style.height = (LHeight$2.toString()+"px");
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.width = (LWidth$1.toString()+"px");
            Self.FHandle$3.style.height = (LHeight$2.toString()+"px");
         }
      }
   }
   /// procedure TW3MovableControl.SetStyleClass(const NewStyleClass: String)
   ///  [line: 3322, column: 29, file: SmartCL.Components]
   ,SetStyleClass:function(Self, NewStyleClass) {
      w3_setAttrib(Self.FHandle$3,"class",NewStyleClass);
   }
   /// procedure TW3MovableControl.SetTop(const NewTop: Integer)
   ///  [line: 3816, column: 29, file: SmartCL.Components]
   ,SetTop:function(Self, NewTop$2) {
      var LTop$2 = 0,
         CSHandle$7 = undefined;
      LTop$2 = NewTop$2;
      if ($SetIn(Self.FComponentState,3,0,9)) {
         TW3TagObj.BeginUpdate(Self);
         if (Self.FPositionMode==24) {
            CSHandle$7 = TW3CustomBrowserAPI.GetComputedStylesFor(TW3CustomBrowserAPI,TW3TagContainer.a$53(Self).FHandle$3);
            if (CSHandle$7) {
               LTop$2+=w3_getPropertyAsInt(CSHandle$7,"paddingTop");
            }
         }
         Self.FHandle$3.style.top = TInteger.ToPxStr(LTop$2);
         TW3TagObj.AddToComponentState(Self,[32]);
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle$3.style.top = TInteger.ToPxStr(LTop$2);
      }
   }
   /// procedure TW3MovableControl.SetTransparent(const Transparency: Boolean)
   ///  [line: 4261, column: 29, file: SmartCL.Components]
   ,SetTransparent:function(Self, Transparency) {
      var LWebColor = "";
      if (Transparency!=Self.FTransparent) {
         LWebColor = ColorToWebStr(Self.FColor,(Transparency)?0:255);
         Self.FHandle$3.style["backgroundColor"] = LWebColor;
         Self.FTransparent = Transparency;
         if ($Is(Self,TW3GraphicControl)) {
            if ((!$SetIn(Self.FComponentState,8,0,9))&&TW3TagObj.Showing$(Self)) {
               TW3TagObj.BeginUpdate(Self);
               TW3TagObj.AddToComponentState(Self,[16]);
               TW3TagObj.EndUpdate(Self);
            }
         }
      }
   }
   /// procedure TW3MovableControl.SetUseAlpha(const NewUseAlpha: Boolean)
   ///  [line: 4242, column: 29, file: SmartCL.Components]
   ,SetUseAlpha:function(Self, NewUseAlpha) {
      if (Self.FUseAlpha!=NewUseAlpha) {
         Self.FUseAlpha = NewUseAlpha;
         Self.FHandle$3.style["opacity"] = (NewUseAlpha)?Self.FAlpha*0.01:1;
      }
   }
   /// procedure TW3MovableControl.SetVisible(const NewVisibility: Boolean)
   ///  [line: 3698, column: 29, file: SmartCL.Components]
   ,SetVisible:function(Self, NewVisibility) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewVisibility) {
            if (Self.FHandle$3.style["visibility"]!="visible") {
               TW3TagObj.BeginUpdate(Self);
               Self.FHandle$3.style["display"] = TW3TagObj.GetDisplayModeText(Self);
               Self.FHandle$3.style["visibility"] = "visible";
               TW3TagObj.AddToComponentState(Self,[16]);
               TW3TagObj.EndUpdate(Self);
            }
         } else {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style["display"] = "none";
            Self.FHandle$3.style["visibility"] = "hidden";
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         }
         if (Self.FOnVisible) {
            Self.FOnVisible(Self);
         }
      }
   }
   /// procedure TW3MovableControl.SetWidth(const NewWidth: Integer)
   ///  [line: 3869, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, NewWidth$2) {
      var LWidth$2 = 0;
      LWidth$2 = NewWidth$2;
      if (TW3MovableControl.GetConstraints(Self).FEnabled) {
         if (TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewWidth$2<TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self))) {
               LWidth$2 = TW3Constraints.GetMinWidth(TW3MovableControl.GetConstraints(Self));
            }
         }
         if (TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self))>0) {
            if (NewWidth$2>TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self))) {
               LWidth$2 = TW3Constraints.GetMaxWidth(TW3MovableControl.GetConstraints(Self));
            }
         }
      }
      if (Self.FPositionMode==24) {
         LWidth$2-=w3_GetStyleAsInt(Self.FHandle$3,"margin-left")+w3_GetStyleAsInt(Self.FHandle$3,"margin-right");
      }
      if (LWidth$2!=TW3MovableControl.GetWidth$(Self)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.width = (LWidth$2.toString()+"px");
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.width = (LWidth$2.toString()+"px");
         }
      }
   }
   /// function TW3MovableControl.Showing() : Boolean
   ///  [line: 3341, column: 28, file: SmartCL.Components]
   ,Showing:function(Self) {
      var Result = false;
      if (TW3TagContainer.Showing(Self)) {
         if (TW3MovableControl.GetWidth$(Self)>0) {
            if (TW3MovableControl.GetHeight$(Self)>0) {
               Result = $SetIn(Self.FComponentState,3,0,9);
            }
         }
      }
      return Result
   }
   /// procedure TW3MovableControl.StyleTagObject()
   ///  [line: 3306, column: 29, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      TW3TagObj.StyleTagObject(Self);
      if ($SetIn(TW3TagObj.CreationFlags$(Self),7,0,8)) {
         w3_setAttrib(Self.FHandle$3,"tabindex",0);
      }
      TW3MovableControl.SetStyleClass(Self,TObject.ClassName(Self.ClassType));
      TW3MovableControl.SetVisible(Self,true);
   }
   /// procedure TW3MovableControl._SetOnMoved(const EventHandler: TMovedEvent)
   ///  [line: 3336, column: 29, file: SmartCL.Components]
   ,_SetOnMoved:function(Self, EventHandler$2) {
      Self.FOnMoved = EventHandler$2;
   }
   /// procedure TW3MovableControl._SetOnResized(const EventHandler: TReSizeEvent)
   ///  [line: 3331, column: 29, file: SmartCL.Components]
   ,_SetOnResized:function(Self, EventHandler$3) {
      Self.FOnResize = EventHandler$3;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3TagObj.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing$:function($){return $.ClassType.Showing($)}
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3TagObj.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight$:function($){return $.ClassType.GetHeight($)}
   ,GetWidth$:function($){return $.ClassType.GetWidth($)}
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,MoveTo$:function($){return $.ClassType.MoveTo.apply($.ClassType, arguments)}
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1$:function($){return $.ClassType.SetBounds$1.apply($.ClassType, arguments)}
   ,SetBounds$:function($){return $.ClassType.SetBounds.apply($.ClassType, arguments)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetLeft$:function($){return $.ClassType.SetLeft.apply($.ClassType, arguments)}
   ,SetSize$2$:function($){return $.ClassType.SetSize$2.apply($.ClassType, arguments)}
   ,SetTop$:function($){return $.ClassType.SetTop.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
};
TW3MovableControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3CustomControl = class (TW3MovableControl)
///  [line: 1011, column: 3, file: SmartCL.Components]
var TW3CustomControl = {
   $ClassName:"TW3CustomControl",$Parent:TW3MovableControl
   ,$Init:function ($) {
      TW3MovableControl.$Init($);
      $.TouchPreventDefault = $.SimulateMouseEvents = $.FKeyPressSent = $.FTransparentEvents = false;
      $.FAngle = 0;
      $.FBackgroundType = 0;
      $.FBorderType = 0;
      $.FGestureData = $.FOnAllMovement = $.FOnAnimationBegins = $.FOnAnimationEnds = $.FOnBeginMovement = $.FOnChanged = $.FOnClick = $.FOnContextPopup = $.FOnDblClick = $.FOnEndMovement = $.FOnGestureChange = $.FOnGestureEnd = $.FOnGestureStart = $.FOnGotFocus = $.FOnHorizontalMovement = $.FOnInput = $.FOnKeyDown = $.FOnKeyPress = $.FOnKeyUp = $.FOnLostFocus = $.FOnMouseDown = $.FOnMouseEnter = $.FOnMouseExit = $.FOnMouseMove = $.FOnMouseUp = $.FOnMouseWheel = $.FOnScroll = $.FOnSelectionEnds = $.FOnSelectionStarts = $.FOnTouchBegins = $.FOnTouchEnds = $.FOnTouchMoves = $.FOnVerticalMovement = $.FScrollInfo = $.FTagStyle = $.FTouchData = null;
      $.FMouseTouchEventsCount = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 1217, column: 40, file: SmartCL.Components]
   ,a$57:function(Self) {
      return $As(TW3MovableControl.GetFont(Self),TW3ControlFont);
   }
   /// procedure TW3CustomControl.CBAnimationBegins(const EventObj: Variant)
   ///  [line: 5365, column: 28, file: SmartCL.Components]
   ,CBAnimationBegins:function(Self, EventObj) {
      if (Self.FOnAnimationBegins) {
         Self.FOnAnimationBegins(Self);
      }
   }
   /// procedure TW3CustomControl.CBAnimationEnds(const EventObj: Variant)
   ///  [line: 5417, column: 28, file: SmartCL.Components]
   ,CBAnimationEnds:function(Self, EventObj$1) {
      if (Self.FOnAnimationEnds) {
         Self.FOnAnimationEnds(Self);
      }
   }
   /// procedure TW3CustomControl.CBChanged(eventObj: JEvent)
   ///  [line: 5432, column: 28, file: SmartCL.Components]
   ,CBChanged:function(Self, eventObj$1) {
      if (Self.FOnChanged) {
         Self.FOnChanged(Self);
      }
   }
   /// procedure TW3CustomControl.CBClick(eventObj: JEvent)
   ///  [line: 5240, column: 28, file: SmartCL.Components]
   ,CBClick:function(Self, eventObj$2) {
      if (Self.FOnClick) {
         Self.FOnClick(Self);
      }
   }
   /// function TW3CustomControl.CBContextPopup(Event: JMouseEvent) : Boolean
   ///  [line: 5447, column: 27, file: SmartCL.Components]
   ,CBContextPopup:function(Self, Event$2) {
      var Result = false;
      var Lsr = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         LMP = {X$1:0,Y$1:0},
         LHandled = {v:false};
      Lsr = TW3MovableControl.ScreenRect(Self);
      LMP = Create$110((Event$2.clientX-Lsr.Left$3),(Event$2.clientY-Lsr.Top$3));
      LHandled.v = false;
      TW3CustomControl.ContextPopup(Self,LMP,LHandled);
      Result = !LHandled.v;
      return Result
   }
   /// procedure TW3CustomControl.CBDblClick(eventObj: JEvent)
   ///  [line: 5258, column: 28, file: SmartCL.Components]
   ,CBDblClick:function(Self, eventObj$3) {
      if (Self.FOnDblClick) {
         Self.FOnDblClick(Self);
      }
   }
   /// procedure TW3CustomControl.CBFocused()
   ///  [line: 4876, column: 28, file: SmartCL.Components]
   ,CBFocused:function(Self) {
      if (Self.FOnGotFocus) {
         Self.FOnGotFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBInput(eventObj: JInputEvent)
   ///  [line: 5338, column: 28, file: SmartCL.Components]
   ,CBInput:function(Self, eventObj$4) {
      var LChar$1 = "";
      try {
         if ((Self.FOnKeyPress!==null)&&(!Self.FKeyPressSent)) {
            if (eventObj$4.data) {
               LChar$1 = eventObj$4.data;
               Self.FOnKeyPress(Self,LChar$1);
            }
         }
      } finally {
         Self.FKeyPressSent = false;
      }
      if (Self.FOnInput) {
         Self.FOnInput(Self);
      }
   }
   /// procedure TW3CustomControl.CBKeyDown(eventObj: JKeyboardEvent)
   ///  [line: 5273, column: 28, file: SmartCL.Components]
   ,CBKeyDown:function(Self, eventObj$5) {
      if (Self.FOnKeyDown) {
         Self.FOnKeyDown(Self,eventObj$5.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBKeyPress(eventObj: JKeyboardEvent)
   ///  [line: 5306, column: 28, file: SmartCL.Components]
   ,CBKeyPress:function(Self, eventObj$6) {
      var LChar$2 = "",
         LChar$3 = "";
      Self.FKeyPressSent = false;
      if (Self.FOnKeyPress) {
         try {
            if (eventObj$6.keyCode) {
               LChar$2 = TDatatype.ByteToChar(TDatatype,eventObj$6.keyCode);
               Self.FKeyPressSent = true;
               Self.FOnKeyPress(Self,LChar$2);
            } else if (eventObj$6.key) {
               LChar$3 = eventObj$6.key;
               if (LChar$3=="Enter") {
                  LChar$3 = "\r";
               }
               Self.FKeyPressSent = true;
               Self.FOnKeyPress(Self,LChar$3);
            }
         } catch ($e) {
            /* null */
         }
      }
   }
   /// procedure TW3CustomControl.CBKeyUp(eventObj: JKeyboardEvent)
   ///  [line: 5288, column: 28, file: SmartCL.Components]
   ,CBKeyUp:function(Self, eventObj$7) {
      if (Self.FOnKeyUp) {
         Self.FOnKeyUp(Self,eventObj$7.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBLostFocus()
   ///  [line: 4882, column: 28, file: SmartCL.Components]
   ,CBLostFocus:function(Self) {
      if (Self.FOnLostFocus) {
         Self.FOnLostFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBMouseDown(eventObj: JMouseEvent)
   ///  [line: 5053, column: 28, file: SmartCL.Components]
   ,CBMouseDown:function(Self, eventObj$8) {
      var sr = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState = null,
         dx$6 = 0,
         dy$6 = 0;
      sr = TW3MovableControl.ScreenRect(Self);
      shiftState = TShiftState.Current();
      shiftState.FMouseButtons = shiftState.FMouseButtons|(1<<eventObj$8.button);
      TShiftState.SetMouseEvent(shiftState,eventObj$8);
      dx$6 = eventObj$8.clientX;
      (dx$6-= sr.Left$3);
      (dx$6+= TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self)));
      dy$6 = eventObj$8.clientY;
      (dy$6-= sr.Top$3);
      (dy$6+= TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self)));
      TW3CustomControl.MouseDown(Self,parseInt(eventObj$8.button,10),shiftState,dx$6,dy$6);
   }
   /// procedure TW3CustomControl.CBMouseEnter(eventObj: JMouseEvent)
   ///  [line: 5151, column: 28, file: SmartCL.Components]
   ,CBMouseEnter:function(Self, eventObj$9) {
      var sr$1 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$1 = null;
      sr$1 = TW3MovableControl.ScreenRect(Self);
      shiftState$1 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$1,eventObj$9);
      TW3CustomControl.MouseEnter(Self,shiftState$1,eventObj$9.clientX-sr$1.Left$3,eventObj$9.clientY-sr$1.Top$3);
   }
   /// procedure TW3CustomControl.CBMouseExit(eventObj: JMouseEvent)
   ///  [line: 5173, column: 28, file: SmartCL.Components]
   ,CBMouseExit:function(Self, eventObj$10) {
      var sr$2 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$2 = null;
      sr$2 = TW3MovableControl.ScreenRect(Self);
      shiftState$2 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$2,eventObj$10);
      TW3CustomControl.MouseExit(Self,shiftState$2,eventObj$10.clientX-sr$2.Left$3,eventObj$10.clientY-sr$2.Top$3);
   }
   /// procedure TW3CustomControl.CBMouseMove(eventObj: JMouseEvent)
   ///  [line: 5111, column: 28, file: SmartCL.Components]
   ,CBMouseMove:function(Self, eventObj$11) {
      var sr$3 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$3 = null,
         dx$7 = 0,
         dy$7 = 0;
      sr$3 = TW3MovableControl.ScreenRect(Self);
      shiftState$3 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$3,eventObj$11);
      dx$7 = eventObj$11.clientX;
      (dx$7-= sr$3.Left$3);
      (dx$7+= TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self)));
      dy$7 = eventObj$11.clientY;
      (dy$7-= sr$3.Top$3);
      (dy$7+= TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self)));
      TW3CustomControl.MouseMove(Self,shiftState$3,dx$7,dy$7);
   }
   /// procedure TW3CustomControl.CBMouseUp(eventObj: JMouseEvent)
   ///  [line: 5077, column: 28, file: SmartCL.Components]
   ,CBMouseUp:function(Self, eventObj$12) {
      var sr$4 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$4 = null,
         dx$8 = 0,
         dy$8 = 0;
      sr$4 = TW3MovableControl.ScreenRect(Self);
      shiftState$4 = TShiftState.Current();
      shiftState$4.FMouseButtons = shiftState$4.FMouseButtons&(~(1<<eventObj$12.button));
      TShiftState.SetMouseEvent(shiftState$4,eventObj$12);
      dx$8 = eventObj$12.clientX;
      (dx$8-= sr$4.Left$3);
      (dx$8+= TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self)));
      dy$8 = eventObj$12.clientY;
      (dy$8-= sr$4.Top$3);
      (dy$8+= TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self)));
      TW3CustomControl.MouseUp(Self,parseInt(eventObj$12.button,10),shiftState$4,dx$8,dy$8);
   }
   /// procedure TW3CustomControl.CBMouseWheel(eventObj: JMouseWheelEvent)
   ///  [line: 5192, column: 28, file: SmartCL.Components]
   ,CBMouseWheel:function(Self, eventObj$13) {
      var wheelDelta$1 = 0;
      var sr$5 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$5 = null,
         mousePos = {X$1:0,Y$1:0};
      var Handled = {v:false};
      if (Self.FOnMouseWheel) {
         if (eventObj$13.detail) {
            wheelDelta$1 = eventObj$13.detail*-40;
         } else {
            wheelDelta$1 = eventObj$13.wheelDelta;
         }
         sr$5 = TW3MovableControl.ScreenRect(Self);
         shiftState$5 = TShiftState.Current();
         TShiftState.SetMouseEvent(shiftState$5,eventObj$13);
         mousePos.X$1 = eventObj$13.clientX-sr$5.Left$3;
         mousePos.Y$1 = eventObj$13.clientY-sr$5.Top$3;
         Handled.v = false;
         TW3CustomControl.MouseWheel(Self,shiftState$5,wheelDelta$1,mousePos,Handled);
         if (Handled.v) {
            eventObj$13.preventDefault();
            eventObj$13.stopPropagation();
         }
      }
   }
   /// procedure TW3CustomControl.CBScroll(EventObj: JEvent)
   ///  [line: 5371, column: 28, file: SmartCL.Components]
   ,CBScroll:function(Self, EventObj$2) {
      if (Self.FOnScroll) {
         Self.FOnScroll(Self);
      }
   }
   /// procedure TW3CustomControl.CBSelectionStarts(EventObj: JEvent)
   ///  [line: 5377, column: 28, file: SmartCL.Components]
   ,CBSelectionStarts:function(Self, EventObj$3) {
      if (Self.FOnSelectionStarts) {
         Self.FOnSelectionStarts(Self);
      }
   }
   /// procedure TW3CustomControl.CMGestureChange()
   ///  [line: 4778, column: 28, file: SmartCL.Components]
   ,CMGestureChange:function(Self) {
      if (Self.FOnGestureChange) {
         if (!Self.FGestureData) {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         }
         TW3GestureData.Update$3(Self.FGestureData);
         Self.FOnGestureChange(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMGestureEnd()
   ///  [line: 4804, column: 28, file: SmartCL.Components]
   ,CMGestureEnd:function(Self) {
      if (Self.FOnGestureEnd) {
         if (!Self.FGestureData) {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         }
         TW3GestureData.Update$3(Self.FGestureData);
         Self.FOnGestureEnd(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMGestureStart()
   ///  [line: 4752, column: 28, file: SmartCL.Components]
   ,CMGestureStart:function(Self) {
      if (Self.FOnGestureStart) {
         if (!Self.FGestureData) {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         }
         TW3GestureData.Update$3(Self.FGestureData);
         Self.FOnGestureStart(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMTouchBegins(eventObj: JTouchEvent)
   ///  [line: 4673, column: 28, file: SmartCL.Components]
   ,CMTouchBegins:function(Self, eventObj$14) {
      if (Self.FOnTouchBegins) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         TW3TouchData.Update$1(Self.FTouchData,eventObj$14);
         Self.FOnTouchBegins(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchEnds(eventObj: JTouchEvent)
   ///  [line: 4726, column: 28, file: SmartCL.Components]
   ,CMTouchEnds:function(Self, eventObj$15) {
      if (Self.FOnTouchEnds) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         TW3TouchData.Update$1(Self.FTouchData,eventObj$15);
         Self.FOnTouchEnds(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchMove(eventObj: JTouchEvent)
   ///  [line: 4702, column: 28, file: SmartCL.Components]
   ,CMTouchMove:function(Self, eventObj$16) {
      if (Self.FOnTouchMoves) {
         if (Self.FTouchData===null) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         TW3TouchData.Update$1(Self.FTouchData,eventObj$16);
         Self.FOnTouchMoves(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.ContextPopup(const MousePos: TPoint; var Handled: Boolean)
   ///  [line: 5462, column: 28, file: SmartCL.Components]
   ,ContextPopup:function(Self, MousePos, Handled$1) {
      if (Self.FOnContextPopup) {
         Self.FOnContextPopup(Self,MousePos,Handled$1);
      }
   }
   /// procedure TW3CustomControl.Dispatch(Kind: TW3EventManagerTypes; eventObj: JEvent)
   ///  [line: 4639, column: 28, file: SmartCL.Components]
   ,Dispatch:function(Self, Kind$2, eventObj$17) {
      try {
         switch (Kind$2) {
            case 1 :
               TW3CustomControl.CBMouseDown(Self,eventObj$17);
               break;
            case 2 :
               TW3CustomControl.CBMouseMove(Self,eventObj$17);
               break;
            case 3 :
               TW3CustomControl.CBMouseUp(Self,eventObj$17);
               break;
            case 4 :
               TW3CustomControl.CMTouchBegins(Self,eventObj$17);
               break;
            case 5 :
               TW3CustomControl.CMTouchMove(Self,eventObj$17);
               break;
            case 6 :
               TW3CustomControl.CMTouchEnds(Self,eventObj$17);
               break;
            case 7 :
               TW3CustomControl.CBClick$(Self,eventObj$17);
               break;
            case 8 :
               TW3CustomControl.CBMouseEnter(Self,eventObj$17);
               break;
            case 9 :
               TW3CustomControl.CBMouseExit(Self,eventObj$17);
               break;
            case 10 :
               TW3CustomControl.CBMouseWheel(Self,eventObj$17);
               break;
            case 11 :
               TW3CustomControl.CBDblClick(Self,eventObj$17);
               break;
         }
      } catch ($e) {
         /* null */
      }
   }
   /// procedure TW3CustomControl.FinalizeObject()
   ///  [line: 4446, column: 28, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FTagStyle);
      TObject.Free(Self.FScrollInfo);
      TObject.Free(Self.FTouchData);
      TObject.Free(Self.FGestureData);
      TW3MovableControl.FinalizeObject(Self);
   }
   /// function TW3CustomControl.GetBorderRadius() : Integer
   ///  [line: 5504, column: 27, file: SmartCL.Components]
   ,GetBorderRadius:function(Self) {
      return w3_GetStyleAsInt(Self.FHandle$3,"bordertopleftRadius");
   }
   /// function TW3CustomControl.GetChildrenSortedByYPos() : TW3TagContainerArray
   ///  [line: 4922, column: 27, file: SmartCL.Components]
   ,GetChildrenSortedByYPos:function(Self) {
      var Result = [];
      var mCount = 0,
         x$47 = 0;
      var mObj = null,
         mAltered = false,
         x$48 = 0;
      var mLast = null,
         mCurrent = null;
      mCount = TW3TagContainer.GetChildCount(Self);
      if (mCount>0) {
         var $temp20;
         for(x$47=0,$temp20=mCount;x$47<$temp20;x$47++) {
            mObj = TW3TagContainer.GetChildObject(Self,x$47);
            if ($Is(mObj,TW3CustomControl)) {
               Result.push(mObj);
            }
         }
         if (Result.length>1) {
            mAltered = false;
            do {
               mAltered = false;
               var $temp21;
               for(x$48=1,$temp21=mCount;x$48<$temp21;x$48++) {
                  mLast = $As(Result[x$48-1],TW3CustomControl);
                  mCurrent = $As(Result[x$48],TW3CustomControl);
                  if (TW3MovableControl.GetTop(mCurrent)<TW3MovableControl.GetTop(mLast)) {
                     $ArraySwap(Result,(x$48-1),x$48);
                     mAltered = true;
                  }
               }
            } while (!(mAltered==false));
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetEnabled() : Boolean
   ///  [line: 4844, column: 27, file: SmartCL.Components]
   ,GetEnabled$1:function(Self) {
      var Result = false;
      if (Self.FHandle$3) {
         Result = w3_HasAttrib(Self.FHandle$3,"disabled")==false;
      }
      return Result
   }
   /// function TW3CustomControl.GetNativeScrolling() : Boolean
   ///  [line: 4621, column: 27, file: SmartCL.Components]
   ,GetNativeScrolling:function(Self) {
      var Result = false;
      var oflow;
      if (Self.FHandle$3) {
         oflow = Self.FHandle$3.style["overflow"];
         Result = oflow=="auto"||oflow=="scroll"||Self.FHandle$3.style["-webkit-overflow-scrolling"]=="touch";
      } else {
         Result = false;
      }
      return Result
   }
   /// function TW3CustomControl.GetScrollInfo() : TW3ScrollInfo
   ///  [line: 4825, column: 27, file: SmartCL.Components]
   ,GetScrollInfo:function(Self) {
      var Result = null;
      if (Self.FScrollInfo===null) {
         Self.FScrollInfo = TW3ScrollInfo.Create$123($New(TW3ScrollInfo),Self);
      }
      Result = Self.FScrollInfo;
      return Result
   }
   /// function TW3CustomControl.GetTagStyle() : TW3TagStyle
   ///  [line: 4455, column: 27, file: SmartCL.Components]
   ,GetTagStyle:function(Self) {
      var Result = null;
      if (Self.FTagStyle===null) {
         Self.FTagStyle = TW3OwnedObject.Create$11$($New(TW3TagStyle),Self);
      }
      Result = Self.FTagStyle;
      return Result
   }
   /// function TW3CustomControl.GetTransparentEvents() : Boolean
   ///  [line: 4610, column: 27, file: SmartCL.Components]
   ,GetTransparentEvents:function(Self) {
      return (Self.FMouseTouchEventsCount>0)?false:Self.FTransparentEvents;
   }
   /// function TW3CustomControl.GetZoom() : Float
   ///  [line: 4832, column: 27, file: SmartCL.Components]
   ,GetZoom:function(Self) {
      var Result = 0;
      if (Self.FHandle$3) {
         Result = w3_GetStyleAsFloat(Self.FHandle$3,"zoom");
      }
      return Result
   }
   /// procedure TW3CustomControl.HookEvents()
   ///  [line: 4548, column: 28, file: SmartCL.Components]
   ,HookEvents:function(Self) {
      TW3TagObj.HookEvents(Self);
      Self.FHandle$3.onfocus = $Event0(Self,TW3CustomControl.CBFocused);
      Self.FHandle$3.onblur = $Event0(Self,TW3CustomControl.CBLostFocus);
   }
   /// procedure TW3CustomControl.InitializeObject()
   ///  [line: 4536, column: 28, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3MovableControl.InitializeObject(Self);
      if (function(v$){return ((v$=="DIV")||(v$=="IMG"))}(Self.FHandle$3.nodeName)) {
         Self.FTransparentEvents = true;
         Self.TouchPreventDefault = true;
      }
      if (Self.FHandle$3.nodeName=="BUTTON") {
         Self.TouchPreventDefault = true;
      }
   }
   /// procedure TW3CustomControl.LayoutChildren()
   ///  [line: 5469, column: 28, file: SmartCL.Components]
   ,LayoutChildren:function(Self) {
      if (TW3TagObj.Showing$(Self)) {
         TW3TagObj.BeginUpdate(Self);
         try {
            TW3TagContainer.ForEach$1(Self,function (Child$5) {
               var Result = 160;
               if ($Is(Child$5,TW3CustomControl)) {
                  TW3CustomControl.LayoutChildren($As(Child$5,TW3CustomControl));
               }
               Result = 160;
               return Result
            });
         } finally {
            TW3TagObj.AddToComponentState(Self,[48]);
            TW3TagObj.EndUpdate(Self);
         }
      } else {
         TW3TagObj.BeginUpdate(Self);
         TW3TagObj.AddToComponentState(Self,[48]);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3CustomControl.MouseDown(Button: TMouseButton; ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 5071, column: 28, file: SmartCL.Components]
   ,MouseDown:function(Self, Button$1, ShiftState, X$2, Y$2) {
      if (Self.FOnMouseDown) {
         Self.FOnMouseDown(Self,Button$1,ShiftState,X$2,Y$2);
      }
   }
   /// procedure TW3CustomControl.MouseEnter(ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 5159, column: 28, file: SmartCL.Components]
   ,MouseEnter:function(Self, ShiftState$1, X$3, Y$3) {
      if (Self.FOnMouseEnter) {
         Self.FOnMouseEnter(Self,ShiftState$1,X$3,Y$3);
      }
   }
   /// procedure TW3CustomControl.MouseExit(ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 5181, column: 28, file: SmartCL.Components]
   ,MouseExit:function(Self, ShiftState$2, X$4, Y$4) {
      if (Self.FOnMouseExit) {
         Self.FOnMouseExit(Self,ShiftState$2,X$4,Y$4);
      }
   }
   /// procedure TW3CustomControl.MouseMove(ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 5137, column: 28, file: SmartCL.Components]
   ,MouseMove:function(Self, ShiftState$3, X$5, Y$5) {
      if (Self.FOnMouseMove) {
         Self.FOnMouseMove(Self,ShiftState$3,X$5,Y$5);
      }
   }
   /// procedure TW3CustomControl.MouseUp(Button: TMouseButton; shiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 5104, column: 28, file: SmartCL.Components]
   ,MouseUp:function(Self, Button$2, shiftState$6, X$6, Y$6) {
      if (Self.FOnMouseUp) {
         Self.FOnMouseUp(Self,Button$2,shiftState$6,X$6,Y$6);
      }
   }
   /// procedure TW3CustomControl.MouseWheel(Shift: TShiftState; wheelDelta: Integer; const MousePos: TPoint; var Handled: Boolean)
   ///  [line: 5221, column: 28, file: SmartCL.Components]
   ,MouseWheel:function(Self, Shift, wheelDelta$2, MousePos$1, Handled$2) {
      if (Self.FOnMouseWheel) {
         Self.FOnMouseWheel(Self,Shift,wheelDelta$2,MousePos$1,Handled$2);
      }
   }
   /// procedure TW3CustomControl.SetAngle(const NewAngle: Float)
   ///  [line: 4957, column: 28, file: SmartCL.Components]
   ,SetAngle:function(Self, NewAngle) {
      if (NewAngle!=Self.FAngle) {
         Self.FAngle = NewAngle;
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Transform")] = "rotate("+FloatToStr$_Float_Integer_(NewAngle,2)+"deg)";
      }
   }
   /// procedure TW3CustomControl.SetBackgroundType(const NewBackground: TW3ThemeBackground)
   ///  [line: 327, column: 28, file: SmartCL.Theme]
   ,SetBackgroundType:function(Self, NewBackground) {
      if (NewBackground!=Self.FBackgroundType) {
         if (Self.FBackgroundType) {
            TW3TagStyle.RemoveClassFromControl(TW3CustomControl.GetTagStyle(Self).ClassType,Self.FHandle$3,_BGTypeToName[Self.FBackgroundType]);
         }
         Self.FBackgroundType = NewBackground;
         if (NewBackground) {
            TW3TagStyle.AddClassToControl(TW3CustomControl.GetTagStyle(Self).ClassType,Self.FHandle$3,_BGTypeToName[NewBackground]);
         }
      }
   }
   /// procedure TW3CustomControl.SetBorderRadius(aNewRadius: Integer)
   ///  [line: 5515, column: 28, file: SmartCL.Components]
   ,SetBorderRadius:function(Self, aNewRadius) {
      if ($SetIn(Self.FComponentState,0,0,9)) {
         Self.FHandle$3.style["borderRadius"] = TInteger.ToPxStr(aNewRadius);
      } else {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle$3.style["borderRadius"] = TInteger.ToPxStr(aNewRadius);
         TW3TagObj.AddToComponentState(Self,[16]);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3CustomControl.SetBorderType(const NewBorder: TW3ThemeBorder)
   ///  [line: 354, column: 28, file: SmartCL.Theme]
   ,SetBorderType:function(Self, NewBorder) {
      if (NewBorder!=Self.FBorderType) {
         if (Self.FBorderType) {
            TW3TagStyle.RemoveClassFromControl(TW3CustomControl.GetTagStyle(Self).ClassType,Self.FHandle$3,_BRTypeToName[Self.FBorderType]);
         }
         Self.FBorderType = NewBorder;
         if (NewBorder) {
            TW3TagStyle.AddClassToControl(TW3CustomControl.GetTagStyle(Self).ClassType,Self.FHandle$3,_BRTypeToName[NewBorder]);
         }
      }
   }
   /// procedure TW3CustomControl.SetEnabled(const EnabledValue: Boolean)
   ///  [line: 4850, column: 28, file: SmartCL.Components]
   ,SetEnabled$1:function(Self, EnabledValue) {
      if (EnabledValue) {
         if (w3_HasAttrib(Self.FHandle$3,"disabled")) {
            w3_RemoveAttrib(Self.FHandle$3,"disabled");
         }
         if (TW3TagStyle.ControlContainsClass(TW3TagStyle,Self.FHandle$3,"DisabledState")) {
            TW3TagStyle.RemoveClassFromControl(TW3TagStyle,Self.FHandle$3,"DisabledState");
         }
      } else {
         if (!w3_HasAttrib(Self.FHandle$3,"disabled")) {
            w3_setAttrib(Self.FHandle$3,"disabled","true");
         }
         if (!TW3TagStyle.ControlContainsClass(TW3TagStyle,Self.FHandle$3,"DisabledState")) {
            TW3TagStyle.AddClassToControl(TW3TagStyle,Self.FHandle$3,"DisabledState");
         }
      }
   }
   /// procedure TW3CustomControl.SetFocus()
   ///  [line: 4982, column: 28, file: SmartCL.Components]
   ,SetFocus:function(Self) {
      var eventType;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (Self.FHandle$3) {
            try {
               if (event) {
                  try {
                     eventType = TVariant.AsString(event.type);
                     if (((eventType=="mouseup")||(eventType=="touchend"))) {
                        event.preventDefault();
                     }
                  } catch ($e) {
                     /* null */
                  }
               }
            } catch ($e) {
               /* null */
            }
            try {
               Self.FHandle$3.focus();
            } catch ($e) {
               var e$15 = $W($e);
               throw EW3Exception.Create$17($New(EW3CustomControl),"TW3CustomControl.SetFocus",Self,e$15.FMessage);
            }
            TW3ControlTracker.SetFocusedControl(TW3ControlTracker,Self);
         }
      }
   }
   /// procedure TW3CustomControl.SetNativeScrolling(const Value: Boolean)
   ///  [line: 4630, column: 28, file: SmartCL.Components]
   ,SetNativeScrolling:function(Self, Value$21) {
      if (Self.FHandle$3) {
         Self.FHandle$3.style["overflow"] = "auto";
         if (w3_getIsIPhone()||w3_getIsIPad()||w3_getIsIPod()) {
            Self.FHandle$3.style["-webkit-overflow-scrolling"] = "touch";
         }
      }
   }
   /// procedure TW3CustomControl.SetZoom(const ZoomValue: Float)
   ///  [line: 4838, column: 28, file: SmartCL.Components]
   ,SetZoom:function(Self, ZoomValue) {
      if (Self.FHandle$3) {
         Self.FHandle$3.style.zoom = ZoomValue;
      }
   }
   /// procedure TW3CustomControl.UnHookEvents()
   ///  [line: 4555, column: 28, file: SmartCL.Components]
   ,UnHookEvents:function(Self) {
      Self.FHandle$3.onfocus = null;
      Self.FHandle$3.onblur = null;
      if (!$SetIn(TW3TagObj.CreationFlags$(Self),6,0,8)) {
         Self.FHandle$3.onselectstart = null;
      }
   }
   /// procedure TW3CustomControl._SetAllMovement(const aValue: TMovementEvent)
   ///  [line: 4596, column: 28, file: SmartCL.Components]
   ,_SetAllMovement:function(Self, aValue$14) {
      if (aValue$14) {
         if (!Self.FOnAllMovement) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnAllMovement) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnAllMovement = aValue$14;
   }
   /// procedure TW3CustomControl._setAnimationBegins(const aValue: TAnimationBeginsEvent)
   ///  [line: 5356, column: 28, file: SmartCL.Components]
   ,_setAnimationBegins:function(Self, aValue$15) {
      if (aValue$15) {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationStart")] = $Event1(Self,TW3CustomControl.CBAnimationBegins);
      } else {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationStart")] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnAnimationBegins = aValue$15;
   }
   /// procedure TW3CustomControl._setAnimationEnds(const aValue: TAnimationEndsEvent)
   ///  [line: 5408, column: 28, file: SmartCL.Components]
   ,_setAnimationEnds:function(Self, aValue$16) {
      if (aValue$16) {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationEnd")] = $Event1(Self,TW3CustomControl.CBAnimationEnds);
      } else {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationEnd")] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnAnimationEnds = aValue$16;
   }
   /// procedure TW3CustomControl._SetBeginMovement(const aValue: TNotifyEvent)
   ///  [line: 4564, column: 28, file: SmartCL.Components]
   ,_SetBeginMovement:function(Self, aValue$17) {
      if (aValue$17) {
         if (!Self.FOnBeginMovement) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnBeginMovement) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnBeginMovement = aValue$17;
   }
   /// procedure TW3CustomControl._setChanged(const aValue: TChangedEvent)
   ///  [line: 5423, column: 28, file: SmartCL.Components]
   ,_setChanged:function(Self, aValue$18) {
      if (aValue$18) {
         Self.FHandle$3["onchange"] = $Event1(Self,TW3CustomControl.CBChanged);
      } else {
         Self.FHandle$3["onchange"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnChanged = aValue$18;
   }
   /// procedure TW3CustomControl._setContextPopup(const aValue: TContextPopupEvent)
   ///  [line: 5438, column: 28, file: SmartCL.Components]
   ,_setContextPopup:function(Self, aValue$19) {
      if (aValue$19) {
         Self.FHandle$3["oncontextmenu"] = $Event1(Self,TW3CustomControl.CBContextPopup);
      } else {
         Self.FHandle$3["oncontextmenu"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnContextPopup = aValue$19;
   }
   /// procedure TW3CustomControl._SetEndMovement(const aValue: TNotifyEvent)
   ///  [line: 4572, column: 28, file: SmartCL.Components]
   ,_SetEndMovement:function(Self, aValue$20) {
      if (aValue$20) {
         if (!Self.FOnEndMovement) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnEndMovement) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnEndMovement = aValue$20;
   }
   /// procedure TW3CustomControl._setGestureChange(aValue: TGestureChangeEvent)
   ///  [line: 4763, column: 28, file: SmartCL.Components]
   ,_setGestureChange:function(Self, aValue$21) {
      if (Self.FOnGestureChange) {
         w3_RemoveEvent(Self.FHandle$3,"gesturechange",$Event0(Self,TW3CustomControl.CMGestureChange),true);
         Self.FOnGestureChange = null;
      }
      if (aValue$21) {
         Self.FOnGestureChange = aValue$21;
         w3_AddEvent(Self.FHandle$3,"gesturechange",$Event0(Self,TW3CustomControl.CMGestureChange),true);
      }
   }
   /// procedure TW3CustomControl._setGestureEnd(aValue: TGestureEndEvent)
   ///  [line: 4789, column: 28, file: SmartCL.Components]
   ,_setGestureEnd:function(Self, aValue$22) {
      if (Self.FOnGestureEnd) {
         w3_RemoveEvent(Self.FHandle$3,"gestureend",$Event0(Self,TW3CustomControl.CMGestureEnd),true);
         Self.FOnGestureEnd = null;
      }
      if (aValue$22) {
         Self.FOnGestureEnd = aValue$22;
         w3_AddEvent(Self.FHandle$3,"gestureend",$Event0(Self,TW3CustomControl.CMGestureEnd),true);
      }
   }
   /// procedure TW3CustomControl._setGestureStart(aValue: TGestureStartEvent)
   ///  [line: 4737, column: 28, file: SmartCL.Components]
   ,_setGestureStart:function(Self, aValue$23) {
      if (Self.FOnGestureStart) {
         w3_RemoveEvent(Self.FHandle$3,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureStart),true);
         Self.FOnGestureStart = null;
      }
      if (aValue$23) {
         Self.FOnGestureStart = aValue$23;
         w3_AddEvent(Self.FHandle$3,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureStart),true);
      }
   }
   /// procedure TW3CustomControl._setGotFocus(const aValue: TGotFocusEvent)
   ///  [line: 5029, column: 28, file: SmartCL.Components]
   ,_setGotFocus:function(Self, aValue$24) {
      Self.FOnGotFocus = aValue$24;
   }
   /// procedure TW3CustomControl._SetHorizontalMovement(const aValue: TMovementEvent)
   ///  [line: 4580, column: 28, file: SmartCL.Components]
   ,_SetHorizontalMovement:function(Self, aValue$25) {
      if (aValue$25) {
         if (!Self.FOnHorizontalMovement) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnHorizontalMovement) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnHorizontalMovement = aValue$25;
   }
   /// procedure TW3CustomControl._setInput(const aValue: TNotifyEvent)
   ///  [line: 5329, column: 28, file: SmartCL.Components]
   ,_setInput:function(Self, aValue$26) {
      if (aValue$26) {
         Self.FHandle$3["oninput"] = $Event1(Self,TW3CustomControl.CBInput);
      } else {
         Self.FHandle$3["oninput"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnInput = aValue$26;
   }
   /// procedure TW3CustomControl._setKeyDown(const aValue: TKeyDownEvent)
   ///  [line: 5264, column: 28, file: SmartCL.Components]
   ,_setKeyDown:function(Self, aValue$27) {
      if (aValue$27) {
         Self.FHandle$3["onkeydown"] = $Event1(Self,TW3CustomControl.CBKeyDown);
      } else {
         Self.FHandle$3["onkeydown"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnKeyDown = aValue$27;
   }
   /// procedure TW3CustomControl._setKeyPress(const aValue: TKeyPressEvent)
   ///  [line: 5294, column: 28, file: SmartCL.Components]
   ,_setKeyPress:function(Self, aValue$28) {
      if (aValue$28) {
         Self.FHandle$3["onkeypress"] = $Event1(Self,TW3CustomControl.CBKeyPress);
         if (!Self.FOnInput) {
            Self.FHandle$3["oninput"] = $Event1(Self,TW3CustomControl.CBInput);
         }
      } else {
         Self.FHandle$3["onkeypress"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
         if (!Self.FOnInput) {
            Self.FHandle$3["oninput"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
         }
      }
      Self.FOnKeyPress = aValue$28;
   }
   /// procedure TW3CustomControl._setKeyUp(const aValue: TKeyUpEvent)
   ///  [line: 5279, column: 28, file: SmartCL.Components]
   ,_setKeyUp:function(Self, aValue$29) {
      if (aValue$29) {
         Self.FHandle$3["onkeyup"] = $Event1(Self,TW3CustomControl.CBKeyUp$);
      } else {
         Self.FHandle$3["onkeyup"] = $Event1(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnKeyUp = aValue$29;
   }
   /// procedure TW3CustomControl._setLostFocus(const aValue: TLostFocusEvent)
   ///  [line: 5038, column: 28, file: SmartCL.Components]
   ,_setLostFocus:function(Self, aValue$30) {
      Self.FOnLostFocus = aValue$30;
   }
   /// procedure TW3CustomControl._setMouseClick(const aValue: TMouseClickEvent)
   ///  [line: 5228, column: 28, file: SmartCL.Components]
   ,_setMouseClick:function(Self, aValue$31) {
      if (aValue$31) {
         if (!Self.FOnClick) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnClick) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnClick = aValue$31;
   }
   /// procedure TW3CustomControl._setMouseDblClick(const aValue: TMouseDblClickEvent)
   ///  [line: 5246, column: 28, file: SmartCL.Components]
   ,_setMouseDblClick:function(Self, aValue$32) {
      if (aValue$32) {
         if (!Self.FOnDblClick) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnDblClick) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnDblClick = aValue$32;
   }
   /// procedure TW3CustomControl._setMouseDown(const aValue: TMouseDownEvent)
   ///  [line: 5044, column: 28, file: SmartCL.Components]
   ,_setMouseDown:function(Self, aValue$33) {
      if (aValue$33) {
         if (!Self.FOnMouseDown) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseDown) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseDown = aValue$33;
   }
   /// procedure TW3CustomControl._setMouseEnter(const aValue: TMouseEnterEvent)
   ///  [line: 5143, column: 28, file: SmartCL.Components]
   ,_setMouseEnter:function(Self, aValue$34) {
      if (aValue$34) {
         if (!Self.FOnMouseEnter) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseEnter) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseEnter = aValue$34;
   }
   /// procedure TW3CustomControl._setMouseExit(const aValue: TMouseExitEvent)
   ///  [line: 5165, column: 28, file: SmartCL.Components]
   ,_setMouseExit:function(Self, aValue$35) {
      if (aValue$35) {
         if (!Self.FOnMouseExit) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseExit) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseExit = aValue$35;
   }
   /// procedure TW3CustomControl._setMouseMove(const aValue: TMouseMoveEvent)
   ///  [line: 5128, column: 28, file: SmartCL.Components]
   ,_setMouseMove:function(Self, aValue$36) {
      if (aValue$36) {
         if (!Self.FOnMouseMove) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseMove) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseMove = aValue$36;
   }
   /// procedure TW3CustomControl._setMouseUp(const aValue: TMouseUpEvent)
   ///  [line: 5095, column: 28, file: SmartCL.Components]
   ,_setMouseUp:function(Self, aValue$37) {
      if (aValue$37) {
         if (!Self.FOnMouseUp) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseUp) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseUp = aValue$37;
   }
   /// procedure TW3CustomControl._setMouseWheel(const aValue: TMouseWheelEvent)
   ///  [line: 5187, column: 28, file: SmartCL.Components]
   ,_setMouseWheel:function(Self, aValue$38) {
      Self.FOnMouseWheel = aValue$38;
   }
   /// procedure TW3CustomControl._setScroll(const Handler: TNotifyEvent)
   ///  [line: 5401, column: 28, file: SmartCL.Components]
   ,_setScroll:function(Self, Handler) {
      Self.FHandle$3["onscroll"] = $Event1(Self,TW3CustomControl.CBScroll);
      Self.FOnScroll = Handler;
   }
   /// procedure TW3CustomControl._setSelectionEnds(const Handler: TSelectionEndsEvent)
   ///  [line: 5395, column: 28, file: SmartCL.Components]
   ,_setSelectionEnds:function(Self, Handler$1) {
      Self.FHandle$3["onselect"] = $Event1(Self,TW3CustomControl.CBSelectionStarts);
      Self.FOnSelectionStarts = Handler$1;
   }
   /// procedure TW3CustomControl._setSelectionStarts(const Handler: TSelectionStartsEvent)
   ///  [line: 5389, column: 28, file: SmartCL.Components]
   ,_setSelectionStarts:function(Self, Handler$2) {
      Self.FHandle$3["onselectstart"] = $Event1(Self,TW3CustomControl.CBSelectionStarts);
      Self.FOnSelectionStarts = Handler$2;
   }
   /// procedure TW3CustomControl._setTouchBegins(const aValue: TTouchBeginEvent)
   ///  [line: 4661, column: 28, file: SmartCL.Components]
   ,_setTouchBegins:function(Self, aValue$39) {
      if (aValue$39) {
         if (!Self.FOnTouchBegins) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnTouchBegins) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnTouchBegins = aValue$39;
   }
   /// procedure TW3CustomControl._setTouchEnds(const aValue: TTouchEndEvent)
   ///  [line: 4714, column: 28, file: SmartCL.Components]
   ,_setTouchEnds:function(Self, aValue$40) {
      if (aValue$40) {
         if (!Self.FOnTouchEnds) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnTouchEnds) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnTouchEnds = aValue$40;
   }
   /// procedure TW3CustomControl._setTouchMoves(const aValue: TTouchMoveEvent)
   ///  [line: 4690, column: 28, file: SmartCL.Components]
   ,_setTouchMoves:function(Self, aValue$41) {
      if (aValue$41) {
         if (!Self.FOnTouchMoves) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnTouchMoves) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnTouchMoves = aValue$41;
   }
   /// procedure TW3CustomControl._SetVerticalMovement(const aValue: TMovementEvent)
   ///  [line: 4588, column: 28, file: SmartCL.Components]
   ,_SetVerticalMovement:function(Self, aValue$42) {
      if (aValue$42) {
         if (!Self.FOnVerticalMovement) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnVerticalMovement) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnVerticalMovement = aValue$42;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents$:function($){return $.ClassType.HookEvents($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents$:function($){return $.ClassType.UnHookEvents($)}
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyUp$:function($){return $.ClassType.CBKeyUp.apply($.ClassType, arguments)}
   ,Dispatch$:function($){return $.ClassType.Dispatch.apply($.ClassType, arguments)}
   ,GetEnabled$1$:function($){return $.ClassType.GetEnabled$1($)}
};
TW3CustomControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DisplayView = class (TW3CustomControl)
///  [line: 79, column: 3, file: SmartCL.Application]
var TW3DisplayView = {
   $ClassName:"TW3DisplayView",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FArrange = false;
      $.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ArrangeChildren(aKind: TW3DisplayViewArangeType)
   ///  [line: 618, column: 26, file: SmartCL.Application]
   ,ArrangeChildren:function(Self, aKind) {
      var x$49 = 0;
      var dx$9 = 0;
      var dy$9 = 0;
      var mObj$1 = null;
      var mCount$1 = 0;
      var mRect = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      var wd$2 = 0;
      var hd$1 = 0;
      mCount$1 = TW3TagContainer.GetChildCount(Self);
      if (mCount$1>0) {
         mRect = TW3MovableControl.GetBoundsRect(Self);
         switch (aKind) {
            case 0 :
               wd$2 = TRect$Width$6(mRect);
               hd$1 = TRect$Height$5(mRect);
               var $temp22;
               for(x$49=0,$temp22=mCount$1;x$49<$temp22;x$49++) {
                  mObj$1 = TW3TagContainer.GetChildObject(Self,x$49);
                  if ($Is(mObj$1,TW3CustomControl)&&(!$Is(mObj$1,TW3BlockBox))) {
                     TW3MovableControl.SetSize$2$($As(mObj$1,TW3CustomControl),wd$2,hd$1);
                  }
               }
               break;
            case 1 :
               dy$9 = mRect.Top$3;
               wd$2 = TRect$Width$6(mRect);
               var $temp23;
               for(x$49=0,$temp23=mCount$1;x$49<$temp23;x$49++) {
                  mObj$1 = TW3TagContainer.GetChildObject(Self,x$49);
                  if ($Is(mObj$1,TW3CustomControl)&&(!$Is(mObj$1,TW3BlockBox))) {
                     hd$1 = TW3MovableControl.GetHeight$($As(mObj$1,TW3CustomControl));
                     TW3MovableControl.SetBounds$($As(mObj$1,TW3CustomControl),mRect.Left$3,dy$9,wd$2,hd$1);
                     (dy$9+= hd$1);
                  }
               }
               break;
            case 2 :
               dx$9 = mRect.Left$3;
               hd$1 = TRect$Height$5(mRect);
               var $temp24;
               for(x$49=0,$temp24=mCount$1;x$49<$temp24;x$49++) {
                  mObj$1 = TW3TagContainer.GetChildObject(Self,x$49);
                  if ($Is(mObj$1,TW3CustomControl)&&(!$Is(mObj$1,TW3BlockBox))) {
                     wd$2 = TW3MovableControl.GetWidth$($As(mObj$1,TW3CustomControl));
                     TW3MovableControl.SetBounds$($As(mObj$1,TW3CustomControl),dx$9,mRect.Top$3,wd$2,hd$1);
                     (dx$9+= wd$2);
                  }
               }
               break;
         }
      }
   }
   /// procedure TW3DisplayView.InitializeObject()
   ///  [line: 566, column: 26, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FArrange = true;
      Self.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ReSize()
   ///  [line: 702, column: 26, file: SmartCL.Application]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (TW3MovableControl.GetWidth$(Self)>0&&TW3MovableControl.GetHeight$(Self)>0) {
         if (Self.FArrange) {
            TW3DisplayView.ArrangeChildren(Self,Self.FArrangeKind);
         } else if (Self.FOnResize) {
            Self.FOnResize(Self);
         }
      }
   }
   /// procedure TW3DisplayView.StyleTagObject()
   ///  [line: 573, column: 26, file: SmartCL.Application]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      w3_setAttrib(Self.FHandle$3,"tabindex",1);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DisplayView.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Display = class (TW3CustomControl)
///  [line: 96, column: 3, file: SmartCL.Application]
var TW3Display = {
   $ClassName:"TW3Display",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.OnOrientationChanged = null;
      $.FFooter = $.FHeader = $.FView = null;
   }
   /// procedure TW3Display.FinalizeObject()
   ///  [line: 741, column: 22, file: SmartCL.Application]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FView);
      if (Self.FHeader) {
         TObject.Free(Self.FHeader);
         Self.FHeader = null;
      }
      if (Self.FFooter) {
         TObject.Free(Self.FFooter);
         Self.FFooter = null;
      }
      TW3CustomControl.FinalizeObject(Self);
   }
   /// function TW3Display.GetHeightOfChildren() : Integer
   ///  [line: 778, column: 21, file: SmartCL.Application]
   ,GetHeightOfChildren:function(Self) {
      var Result = 0;
      var x$50 = 0;
      var mObj$2 = null;
      var $temp25;
      for(x$50=0,$temp25=TW3TagContainer.GetChildCount(Self);x$50<$temp25;x$50++) {
         mObj$2 = TW3TagContainer.GetChildObject(Self,x$50);
         if (mObj$2!==Self.FView&&$Is(mObj$2,TW3CustomControl)&&(!$Is(mObj$2,TW3BlockBox))) {
            (Result+= TW3MovableControl.GetHeight$($As(mObj$2,TW3CustomControl)));
         }
      }
      return Result
   }
   /// procedure TW3Display.InitializeObject()
   ///  [line: 720, column: 22, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FView = TW3TagContainer.Create$86$($New(TW3DisplayView),Self);
      TW3MovableControl.SetTop$(Self.FView,5);
      EventManager = TObject.Create($New(TW3EventManager));
      w3_SetStyle(Self.FHandle$3,"min-width","100%");
      w3_SetStyle(Self.FHandle$3,"min-height","100%");
   }
   /// procedure TW3Display.Invalidate()
   ///  [line: 730, column: 22, file: SmartCL.Application]
   ,Invalidate:function(Self) {
      TW3MovableControl.Resize$(Self);
   }
   /// procedure TW3Display.ObjectReady()
   ///  [line: 735, column: 22, file: SmartCL.Application]
   ,ObjectReady:function(Self) {
      TW3MovableControl.ObjectReady(Self);
      TW3EventManager.BindInteractionEvents(EventManager,Self.FHandle$3);
   }
   /// procedure TW3Display.PositionFormInView(aForm: TW3CustomForm)
   ///  [line: 819, column: 22, file: SmartCL.Application]
   ,PositionFormInView:function(Self, aForm$3) {
      var mApp = null;
      var dx$10 = 0;
      var dy$10 = 0;
      if (aForm$3) {
         mApp = Application();
         if ((mApp!==null)&&(!mApp.FTerminated)) {
            dx$10 = TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self.FView));
            dy$10 = TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self.FView));
            TW3MovableControl.SetBounds$(aForm$3,dx$10,dy$10,TW3MovableControl.GetWidth$(Self.FView),TW3MovableControl.GetHeight$(Self.FView));
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Screen),$R[0],["TW3Display.PositionFormInView", TObject.ClassName(Self.ClassType), "Form parameter was NIL error"]);
      }
   }
   /// procedure TW3Display.ReSize()
   ///  [line: 791, column: 22, file: SmartCL.Application]
   ,Resize:function(Self) {
      var mTotal$3 = 0;
      var mList = [],
         x$51 = 0;
      var dy$11 = 0;
      var h = 0;
      var mObj$3 = null;
      TW3MovableControl.Resize(Self);
      mTotal$3 = TW3Display.GetHeightOfChildren(Self);
      mList = TW3CustomControl.GetChildrenSortedByYPos(Self);
      dy$11 = 0;
      var $temp26;
      for(x$51=0,$temp26=mList.length;x$51<$temp26;x$51++) {
         mObj$3 = $As(mList[x$51],TW3CustomControl);
         if ($Is(mObj$3,TW3BlockBox)) {
            TW3MovableControl.SetBounds$(mObj$3,0,0,TW3MovableControl.GetWidth$(Self),TW3MovableControl.GetHeight$(Self));
         } else {
            if (mObj$3===Self.FView) {
               h = TW3MovableControl.GetHeight$(Self)-mTotal$3;
            } else {
               h = TW3MovableControl.GetHeight$(mObj$3);
            }
            TW3MovableControl.SetBounds$(mObj$3,0,dy$11,TW3MovableControl.GetWidth$(Self),h);
            (dy$11+= h);
         }
      }
   }
   /// procedure TW3Display.StyleTagObject()
   ///  [line: 760, column: 22, file: SmartCL.Application]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      w3_setAttrib(Self.FHandle$3,"tabindex",1);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3Display.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BlockBox = class (TW3CustomControl)
///  [line: 72, column: 3, file: SmartCL.Application]
var TW3BlockBox = {
   $ClassName:"TW3BlockBox",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// procedure TW3BlockBox.InitializeObject()
   ///  [line: 1678, column: 23, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FTransparentEvents = false;
   }
   /// procedure TW3BlockBox.SizeToParent()
   ///  [line: 1667, column: 23, file: SmartCL.Application]
   ,SizeToParent:function(Self) {
      if (TW3TagContainer.a$53(Self)!==null) {
         if ((TW3MovableControl.GetLeft(Self)!=0)||(TW3MovableControl.GetTop(Self)!=0)) {
            TW3MovableControl.MoveTo$(Self,0,0);
         }
         Self.FHandle$3.style["width"] = "100%";
         Self.FHandle$3.style["height"] = "100%";
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3BlockBox.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TFormEntryEffect enumeration
///  [line: 39, column: 3, file: SmartCL.Application]
var TFormEntryEffect = [ "feNone", "feFromRight", "feToLeft" ];
/// TDisplayOrientation enumeration
///  [line: 41, column: 3, file: SmartCL.Application]
var TDisplayOrientation = [ "soPortrait", "soLandscapeLeft", "soLandscapeRight", "soFlipped", "soPortraitPrimary", "soPortraitSecondary", "soLandscapePrimary", "soLandscapeSecondary", "soLandscape", "soDefault" ];
/// TApplicationFormsList = class (TObject)
///  [line: 282, column: 3, file: SmartCL.Application]
var TApplicationFormsList = {
   $ClassName:"TApplicationFormsList",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FFormOwner = null;
      $.FList = [];
      $.FNextAutoCreate = 0;
   }
   /// procedure TApplicationFormsList.AutoCreateForm(aFormInfo: TApplicationFormInfo)
   ///  [line: 1527, column: 33, file: SmartCL.Application]
   ,AutoCreateForm:function(Self, aFormInfo) {
      if (!aFormInfo.Instance) {
         aFormInfo.Instance = TW3TagContainer.Create$86$($NewDyn(aFormInfo.FormClass,""),Self.FFormOwner);
         TW3CustomApplication.RegisterFormInstance(Application(),aFormInfo.Instance,aFormInfo.IsMainForm);
      }
      aFormInfo.InitialAutoCreateDone = true;
   }
   /// procedure TApplicationFormsList.AutoCreateForms(owner: TW3TagContainer)
   ///  [line: 1537, column: 33, file: SmartCL.Application]
   ,AutoCreateForms:function(Self, owner) {
      var a$320 = 0;
      var info = null;
      var a$321 = [];
      Self.FFormOwner = owner;
      Self.FNextAutoCreate = 0;
      a$321 = Self.FList;
      var $temp27;
      for(a$320=0,$temp27=a$321.length;a$320<$temp27;a$320++) {
         info = a$321[a$320];
         TApplicationFormsList.AutoCreateForm(Self,info);
         ++Self.FNextAutoCreate;
         if (info.IsMainForm) {
            break;
         }
      }
      TW3Dispatch.SetTimeOut(TW3Dispatch,$Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
   }
   /// procedure TApplicationFormsList.AutoCreateNextForm()
   ///  [line: 1553, column: 33, file: SmartCL.Application]
   ,AutoCreateNextForm:function(Self) {
      var iForm = 0;
      var info$1 = null;
      var $temp28;
      for(iForm=Self.FNextAutoCreate,$temp28=Self.FList.length;iForm<$temp28;iForm++) {
         info$1 = Self.FList[iForm];
         if (info$1.IsAutoCreated&&(!(info$1.Instance!==null))&&(!info$1.InitialAutoCreateDone)) {
            TApplicationFormsList.AutoCreateForm(Self,info$1);
            ++Self.FNextAutoCreate;
            if (Self.FNextAutoCreate<=(Self.FList.length-1)) {
               TW3Dispatch.SetTimeOut(TW3Dispatch,$Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
            }
            break;
         }
      }
   }
   /// function TApplicationFormsList.IndexOfFormClass(aFormClass: TW3CustomFormClass) : Integer
   ///  [line: 1593, column: 32, file: SmartCL.Application]
   ,IndexOfFormClass:function(Self, aFormClass) {
      var Result = 0;
      var $temp29;
      for(Result=0,$temp29=Self.FList.length;Result<$temp29;Result++) {
         if (Self.FList[Result].FormClass==aFormClass) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// function TApplicationFormsList.IndexOfUnitName(aUnitName: String) : Integer
   ///  [line: 1601, column: 32, file: SmartCL.Application]
   ,IndexOfUnitName:function(Self, aUnitName) {
      var Result = 0;
      var $temp30;
      for(Result=0,$temp30=Self.FList.length;Result<$temp30;Result++) {
         if (SameText(Self.FList[Result].UnitName,aUnitName)) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// procedure TApplicationFormsList.RegisterAutoCreate(aUnitName: String; isAutoCreate: Boolean; isMainForm: Boolean)
   ///  [line: 1609, column: 33, file: SmartCL.Application]
   ,RegisterAutoCreate:function(Self, aUnitName$1, isAutoCreate, isMainForm$1) {
      var formInfo = null;
      var idx = 0;
      idx = TApplicationFormsList.IndexOfUnitName(Self,aUnitName$1);
      if (idx>=0) {
         formInfo = Self.FList[idx];
      } else {
         formInfo = TObject.Create($New(TApplicationFormInfo));
         formInfo.UnitName = aUnitName$1;
         Self.FList.push(formInfo);
      }
      formInfo.IsMainForm = isMainForm$1;
      formInfo.IsAutoCreated = isAutoCreate;
   }
   /// procedure TApplicationFormsList.RegisterForm(aUnitName: String; aFormClass: TW3CustomFormClass)
   ///  [line: 1625, column: 33, file: SmartCL.Application]
   ,RegisterForm:function(Self, aUnitName$2, aFormClass$1) {
      var formInfo$1 = null;
      var idx$1 = 0;
      idx$1 = TApplicationFormsList.IndexOfUnitName(Self,aUnitName$2);
      if (idx$1>=0) {
         formInfo$1 = Self.FList[idx$1];
      } else {
         formInfo$1 = TObject.Create($New(TApplicationFormInfo));
         formInfo$1.UnitName = aUnitName$2;
         Self.FList.push(formInfo$1);
      }
      formInfo$1.FormClass = aFormClass$1;
   }
   /// procedure TApplicationFormsList.RegisterFormInstance(aFormClass: TW3CustomFormClass; aFormInstance: TW3CustomForm)
   ///  [line: 1640, column: 33, file: SmartCL.Application]
   ,RegisterFormInstance$1:function(Self, aFormClass$2, aFormInstance) {
      var formInfo$2 = null;
      var idx$2 = 0;
      idx$2 = TApplicationFormsList.IndexOfFormClass(Self,aFormClass$2);
      if (idx$2>=0) {
         formInfo$2 = Self.FList[idx$2];
      } else {
         formInfo$2 = TObject.Create($New(TApplicationFormInfo));
         formInfo$2.FormClass = aFormClass$2;
         Self.FList.push(formInfo$2);
      }
      formInfo$2.Instance = aFormInstance;
      formInfo$2.InitialAutoCreateDone = true;
   }
   /// procedure TApplicationFormsList.UnregisterFormInstance(aFormInstance: TW3CustomForm)
   ///  [line: 1656, column: 33, file: SmartCL.Application]
   ,UnregisterFormInstance:function(Self, aFormInstance$1) {
      var i$1 = 0;
      var $temp31;
      for(i$1=0,$temp31=Self.FList.length;i$1<$temp31;i$1++) {
         if (Self.FList[i$1].Instance===aFormInstance$1) {
            Self.FList[i$1].Instance = null;
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TApplicationFormInfo = class (TObject)
///  [line: 272, column: 3, file: SmartCL.Application]
var TApplicationFormInfo = {
   $ClassName:"TApplicationFormInfo",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.InitialAutoCreateDone = $.IsMainForm = $.IsAutoCreated = false;
      $.UnitName = "";
      $.Instance = null;
      $.FormClass = null;
   }
   ,Destroy:TObject.Destroy
};
function Forms$2() {
   return FormsFactory();
};
/// EW3Screen = class (EW3Exception)
///  [line: 35, column: 3, file: SmartCL.Application]
var EW3Screen = {
   $ClassName:"EW3Screen",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3Application = class (EW3Exception)
///  [line: 36, column: 3, file: SmartCL.Application]
var EW3Application = {
   $ClassName:"EW3Application",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function Application() {
   return Instance;
};
/// TModalInfo = class (TObject)
///  [line: 316, column: 3, file: SmartCL.Application]
var TModalInfo = {
   $ClassName:"TModalInfo",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnOK = null;
      $.OnCancel = null;
      $.ModalForm = $.ModalPanel = $.OwnerForm = $.OpaqueMask = null;
   }
   ,Destroy:TObject.Destroy
};
function FormsFactory() {
   var Result = null;
   if (!GForms) {
      GForms = TObject.Create($New(TApplicationFormsList));
   }
   Result = GForms;
   return Result
};
/// TRectF = record
///  [line: 139, column: 3, file: System.Types.Graphics]
function Copy$TRectF(s,d) {
   d.Bottom=s.Bottom;
   d.Left$2=s.Left$2;
   d.Right=s.Right;
   d.Top$2=s.Top$2;
   return d;
}
function Clone$TRectF($) {
   return {
      Bottom:$.Bottom,
      Left$2:$.Left$2,
      Right:$.Right,
      Top$2:$.Top$2
   }
}
/// function TRectF.CreateBounded(x1: Float; y1: Float; x2: Float; y2: Float) : TRectF
///  [line: 719, column: 23, file: System.Types.Graphics]
function CreateBounded(x1$6, y1$6, x2$6, y2$6) {
   var Result = {Bottom:0,Left$2:0,Right:0,Top$2:0};
   if (x1$6<x2$6) {
      Result.Left$2 = x1$6;
      Result.Right = x2$6;
   } else {
      Result.Left$2 = x2$6;
      Result.Right = x1$6;
   }
   if (y1$6<y2$6) {
      Result.Top$2 = y1$6;
      Result.Bottom = y2$6;
   } else {
      Result.Top$2 = y2$6;
      Result.Bottom = y1$6;
   }
   return Result
}
/// function TRectF.Height(var Self: TRectF) : Float
///  [line: 850, column: 17, file: System.Types.Graphics]
function TRectF$Height$4(Self$23) {
   return Self$23.Bottom-Self$23.Top$2;
}
/// function TRectF.Width(var Self: TRectF) : Float
///  [line: 845, column: 17, file: System.Types.Graphics]
function TRectF$Width$5(Self$24) {
   return Self$24.Right-Self$24.Left$2;
}
/// TRect = record
///  [line: 102, column: 3, file: System.Types.Graphics]
function Copy$TRect(s,d) {
   d.Bottom$1=s.Bottom$1;
   d.Left$3=s.Left$3;
   d.Right$1=s.Right$1;
   d.Top$3=s.Top$3;
   return d;
}
function Clone$TRect($) {
   return {
      Bottom$1:$.Bottom$1,
      Left$3:$.Left$3,
      Right$1:$.Right$1,
      Top$3:$.Top$3
   }
}
/// function TRect.Create(const aLeft: Integer; const aTop: Integer; const aRight: Integer; const aBottom: Integer) : TRect
///  [line: 407, column: 22, file: System.Types.Graphics]
function Create$107(aLeft, aTop, aRight, aBottom) {
   var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
   Result.Left$3 = aLeft;
   Result.Top$3 = aTop;
   Result.Right$1 = aRight;
   Result.Bottom$1 = aBottom;
   return Result
}
/// function TRect.Height(var Self: TRect) : Integer
///  [line: 462, column: 16, file: System.Types.Graphics]
function TRect$Height$5(Self$25) {
   return Self$25.Bottom$1-Self$25.Top$3;
}
/// function TRect.Width(var Self: TRect) : Integer
///  [line: 457, column: 16, file: System.Types.Graphics]
function TRect$Width$6(Self$26) {
   return Self$26.Right$1-Self$26.Left$3;
}
/// TPointF = record
///  [line: 62, column: 3, file: System.Types.Graphics]
function Copy$TPointF(s,d) {
   d.X=s.X;
   d.Y=s.Y;
   return d;
}
function Clone$TPointF($) {
   return {
      X:$.X,
      Y:$.Y
   }
}
/// TPoint = record
///  [line: 25, column: 3, file: System.Types.Graphics]
function Copy$TPoint(s,d) {
   d.X$1=s.X$1;
   d.Y$1=s.Y$1;
   return d;
}
function Clone$TPoint($) {
   return {
      X$1:$.X$1,
      Y$1:$.Y$1
   }
}
/// function TPoint.Create(const aCol: Integer; const aRow: Integer) : TPoint
///  [line: 180, column: 23, file: System.Types.Graphics]
function Create$110(aCol, aRow) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = aCol;
   Result.Y$1 = aRow;
   return Result
}
/// TExposure enumeration
///  [line: 23, column: 3, file: System.Types.Graphics]
var TExposure = [ "esVisible", "esPartly", "esNone" ];
function OffsetPoint(a$322, b$3) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$322.X$1+b$3.X$1;
   Result.Y$1 = a$322.Y$1+b$3.Y$1;
   return Result
};
function OffsetPoint$1(a$323, b$4) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$323.X$1+b$4;
   Result.Y$1 = a$323.Y$1+b$4;
   return Result
};
function OffsetPoint$2(a$324, b$5) {
   var Result = {X:0,Y:0};
   Result.X = a$324.X+b$5.X;
   Result.Y = a$324.Y+b$5.Y;
   return Result
};
function OffsetPoint$3(a$325, b$6) {
   var Result = {X:0,Y:0};
   Result.X = a$325.X+b$6;
   Result.Y = a$325.Y+b$6;
   return Result
};
function OffsetPoint$4(a$326, b$7) {
   var Result = {X:0,Y:0};
   Result.X = a$326.X+b$7;
   Result.Y = a$326.Y+b$7;
   return Result
};
function MinusPoint(a$327, b$8) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$327.X$1-b$8.X$1;
   Result.Y$1 = a$327.Y$1-b$8.Y$1;
   return Result
};
function MinusPoint$1(a$328, b$9) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$328.X$1-b$9;
   Result.Y$1 = a$328.Y$1-b$9;
   return Result
};
function MinusPoint$2(a$329, b$10) {
   var Result = {X:0,Y:0};
   Result.X = a$329.X-b$10.X;
   Result.Y = a$329.Y-b$10.Y;
   return Result
};
function MinusPoint$3(a$330, b$11) {
   var Result = {X:0,Y:0};
   Result.X = a$330.X-b$11;
   Result.Y = a$330.Y-b$11;
   return Result
};
function MinusPoint$4(a$331, b$12) {
   var Result = {X:0,Y:0};
   Result.X = a$331.X-b$12;
   Result.Y = a$331.Y-b$12;
   return Result
};
function ExpandPoint(a$332, b$13) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$332.X$1*b$13.X$1);
   Result.Y$1 = Math.round(a$332.Y$1*b$13.Y$1);
   return Result
};
function ExpandPoint$1(a$333, b$14) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$333.X$1*b$14);
   Result.Y$1 = Math.round(a$333.Y$1*b$14);
   return Result
};
function ExpandPoint$2(a$334, b$15) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$334.X$1*b$15);
   Result.Y$1 = Math.round(a$334.Y$1*b$15);
   return Result
};
function ExpandPoint$3(a$335, b$16) {
   var Result = {X:0,Y:0};
   Result.X = a$335.X*b$16.X;
   Result.Y = a$335.Y*b$16.Y;
   return Result
};
function ExpandPoint$4(a$336, b$17) {
   var Result = {X:0,Y:0};
   Result.X = a$336.X*b$17;
   Result.Y = a$336.Y*b$17;
   return Result
};
function ExpandPoint$5(a$337, b$18) {
   var Result = {X:0,Y:0};
   Result.X = a$337.X*b$18;
   Result.Y = a$337.Y*b$18;
   return Result
};
/// TW3RGBA = record
///  [line: 175, column: 3, file: System.Colors]
function Copy$TW3RGBA(s,d) {
   d.A$2=s.A$2;
   d.B$1=s.B$1;
   d.G$1=s.G$1;
   d.R$1=s.R$1;
   return d;
}
function Clone$TW3RGBA($) {
   return {
      A$2:$.A$2,
      B$1:$.B$1,
      G$1:$.G$1,
      R$1:$.R$1
   }
}
function StrToColor(aColorStr) {
   aColorStr={v:aColorStr};
   var Result = {v:0};
   try {
      var mTemp = "";
      var xpos = 0;
      var r$2 = 0;
      var g = 0;
      var b$1 = 0;
      aColorStr.v = Trim$_String_(aColorStr.v);
      if (!aColorStr.v.length) {
         return Result.v;
      }
      if ((aColorStr.v).toLocaleLowerCase()=="transparent") {
         Result.v = 536870911;
         return Result.v;
      }
      if (aColorStr.v.charAt(0)=="#"||aColorStr.v.charAt(0)=="$") {
         Result.v = parseInt("0x"+Trim$_String_Integer_Integer_(aColorStr.v,1,0),16);
         return Result.v;
      }
      if ((aColorStr.v).substr(0,2)=="0x") {
         Result.v = parseInt(aColorStr.v,16);
         return Result.v;
      }
      if (((aColorStr.v).substr(0,4)).toLowerCase()=="rgb(") {
         aColorStr.v = Trim$_String_Integer_Integer_(aColorStr.v,4,0);
         try {
            xpos = (aColorStr.v.indexOf(",")+1);
            if (xpos>1) {
               mTemp = Trim$_String_(aColorStr.v.substr(0,(xpos-1)));
               Delete(aColorStr,1,xpos);
               if (mTemp.charAt(0)=="$") {
                  mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
               }
               r$2 = parseInt(mTemp,10);
            }
            xpos = (aColorStr.v.indexOf(",")+1);
            if (xpos>1) {
               mTemp = Trim$_String_(aColorStr.v.substr(0,(xpos-1)));
               Delete(aColorStr,1,xpos);
               if (mTemp.charAt(0)=="$") {
                  mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
               }
               g = parseInt(mTemp,10);
            }
            xpos = (aColorStr.v.indexOf(")")+1);
            if (xpos>1) {
               mTemp = Trim$_String_(aColorStr.v.substr(0,(xpos-1)));
               if (mTemp.charAt(0)=="$") {
                  mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
               }
               b$1 = parseInt(mTemp,10);
            }
            Result.v = (r$2*65536)+(g*256)+b$1;
         } catch ($e) {
            var e$16 = $W($e);
            return Result.v;
         }
      }
   } finally {return Result.v}
};
function RGBToColor(Red, Green, Blue) {
   return (Red*65536)+(Green*256)+Blue;
};
function ColorToWebStr(Color$8, Alpha$1) {
   var Result = "";
   var R$5 = 0,
      G$5 = 0,
      B$5 = 0;
   R$5 = ClampInt((Color$8>>>16)&255,0,255);
   G$5 = ClampInt((Color$8>>>8)&255,0,255);
   B$5 = ClampInt(Color$8&255,0,255);
   if (ClampInt(Alpha$1,0,255)==255) {
      Result = "#"+__ByteToHexLUT[R$5]+__ByteToHexLUT[G$5]+__ByteToHexLUT[B$5];
   } else {
      Result = "rgba("+__StrByteLUT[R$5]+","+__StrByteLUT[G$5]+","+__StrByteLUT[B$5]+","+__StrByteLUT[$Div(ClampInt(Alpha$1,0,255),255)]+")";
   }
   return Result
};
function ColorToWebStr$1(r$4, g$2, b$19, Alpha$2) {
   var Result = "";
   if (ClampInt(Alpha$2,0,255)==255) {
      Result = "#"+__ByteToHexLUT[r$4]+__ByteToHexLUT[g$2]+__ByteToHexLUT[b$19];
   } else {
      Result = "rgba("+__StrByteLUT[r$4]+","+__StrByteLUT[g$2]+","+__StrByteLUT[b$19]+","+__StrByteLUT[ClampInt(Alpha$2,0,255)]+")";
   }
   return Result
};
function ColorToStr(Color$9) {
   var Result = "";
   var rgb = 0;
   rgb = (((Color$9>>>16)&255)|(Color$9&65280))|((Color$9&255)<<16);
   Result = "0x"+IntToHex(rgb,6);
   return Result
};
/// TJSONObject = class (TObject)
///  [line: 39, column: 3, file: System.JSON]
var TJSONObject = {
   $ClassName:"TJSONObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FInstance = undefined;
      $.FOptions$5 = [0];
   }
   /// function TJSONObject.AddOrSet(const PropertyName: String; const Data: Variant) : TJSONObject
   ///  [line: 406, column: 22, file: System.JSON]
   ,AddOrSet:function(Self, PropertyName, Data$16) {
      var Result = null;
      Result = Self;
      if (TJSONObject.Exists(Self,PropertyName)) {
         if ($SetIn(Self.FOptions$5,3,0,4)) {
            Self.FInstance[PropertyName] = Data$16;
         } else {
            throw EW3Exception.CreateFmt($New(EJSONObject),"Failed to set value[%s], instance does not allow alteration",[PropertyName]);
         }
      } else if ($SetIn(Self.FOptions$5,1,0,4)) {
         Self.FInstance[PropertyName] = Data$16;
      } else {
         throw EW3Exception.CreateFmt($New(EJSONObject),"Failed to add value [%s], instance does not allow new properties",[PropertyName]);
      }
      return Result
   }
   /// constructor TJSONObject.Create(const Instance: TJsInstance; const Options: TJSONObjectOptions; Clone: Boolean)
   ///  [line: 179, column: 25, file: System.JSON]
   ,Create$120:function(Self, Instance$4, Options$2, Clone$2) {
      TObject.Create(Self);
      Self.FOptions$5 = Options$2.slice(0);
      if (TW3VariantHelper$Valid$3(Instance$4)) {
         if (TW3VariantHelper$IsObject(Instance$4)) {
            if (Clone$2) {
               Self.FInstance = TVariant.CreateObject();
               TVariant.ForEachProperty(Instance$4,function (Name$11, Data$17) {
                  var Result = 1;
                  TJSONObject.AddOrSet(Self,Name$11,Data$17.v);
                  Result = 1;
                  return Result
               });
            } else {
               Self.FInstance = Instance$4;
            }
         } else {
            throw Exception.Create($New(EJSONObject),"Failed to clone instance, reference is not an object");
         }
      } else {
         if ($SetIn(Self.FOptions$5,0,0,4)) {
            Self.FInstance = TVariant.CreateObject();
         } else {
            throw Exception.Create($New(EJSONObject),"Instance was nil, provided options does not allow initialization error");
         }
      }
      return Self
   }
   /// constructor TJSONObject.Create(const Instance: TJsInstance; const Options: TJSONObjectOptions)
   ///  [line: 155, column: 25, file: System.JSON]
   ,Create$119:function(Self, Instance$5, Options$3) {
      TObject.Create(Self);
      Self.FOptions$5 = Options$3.slice(0);
      if (TW3VariantHelper$Valid$3(Instance$5)&&TW3VariantHelper$IsObject(Instance$5)) {
         Self.FInstance = Instance$5;
      } else {
         if ($SetIn(Self.FOptions$5,0,0,4)) {
            Self.FInstance = TVariant.CreateObject();
         } else {
            throw Exception.Create($New(EJSONObject),"Instance was nil, provided options does not allow initialization error");
         }
      }
      return Self
   }
   /// constructor TJSONObject.Create(const Instance: TJsInstance)
   ///  [line: 135, column: 25, file: System.JSON]
   ,Create$118:function(Self, Instance$6) {
      TObject.Create(Self);
      Self.FOptions$5 = [15];
      if (TW3VariantHelper$Valid$3(Instance$6)) {
         if (TW3VariantHelper$IsObject(Instance$6)) {
            Self.FInstance = Instance$6;
         } else {
            throw Exception.Create($New(EJSONObject),"Failed to inspect instance, reference is not an object");
         }
      } else {
         Self.FInstance = TVariant.CreateObject();
      }
      return Self
   }
   /// constructor TJSONObject.Create()
   ///  [line: 128, column: 25, file: System.JSON]
   ,Create$117:function(Self) {
      TObject.Create(Self);
      Self.FOptions$5 = [15];
      Self.FInstance = TVariant.CreateObject();
      return Self
   }
   /// destructor TJSONObject.Destroy()
   ,Destroy$17:function(Self) {
      Self.FInstance = null;
      TObject.Destroy(Self);
   }
   /// function TJSONObject.Exists(const PropertyName: String) : Boolean
   ///  [line: 425, column: 22, file: System.JSON]
   ,Exists:function(Self, PropertyName$1) {
      return (Object.hasOwnProperty.call(Self.FInstance,PropertyName$1)?true:false);
   }
   /// function TJSONObject.ForEach(const Callback: TTJSONObjectEnumProc) : TJSONObject
   ///  [line: 274, column: 22, file: System.JSON]
   ,ForEach$4:function(Self, Callback$2) {
      var Result = null;
      var LData$3 = {};
      var NameList = [],
         a$338 = 0;
      var xName = "";
      Result = Self;
      if (Callback$2) {
         NameList = TJSONObject.Keys(Self);
         var $temp32;
         for(a$338=0,$temp32=NameList.length;a$338<$temp32;a$338++) {
            xName = NameList[a$338];
            TJSONObject.Read$2(Self,xName,LData$3);
            if (Callback$2(xName,LData$3)==1) {
               TJSONObject.Write$8(Self,xName,LData$3.v);
            } else {
               break;
            }
         }
      }
      return Result
   }
   /// procedure TJSONObject.FromJSON(const Text: String)
   ///  [line: 303, column: 23, file: System.JSON]
   ,FromJSON:function(Self, Text$7) {
      Self.FInstance = JSON.parse(Text$7);
   }
   /// function TJSONObject.GetPropertyCount() : Integer
   ///  [line: 266, column: 22, file: System.JSON]
   ,GetPropertyCount:function(Self) {
      var Result = 0;
      var LRef$3 = undefined;
      LRef$3 = Self.FInstance;
      Result = Object.keys(LRef$3).length;
      return Result
   }
   /// function TJSONObject.Keys() : TStrArray
   ///  [line: 332, column: 22, file: System.JSON]
   ,Keys:function(Self) {
      return TVariant.Properties(Self.FInstance);
   }
   /// function TJSONObject.Read(const PropertyName: String; var Data: Variant) : TJSONObject
   ///  [line: 382, column: 22, file: System.JSON]
   ,Read$2:function(Self, PropertyName$2, Data$18) {
      var Result = null;
      Result = Self;
      if (TJSONObject.Exists(Self,PropertyName$2)) {
         Data$18.v = Self.FInstance[PropertyName$2];
      } else {
         throw EW3Exception.CreateFmt($New(EJSONObject),"Failed to read value, property [%s] not found error",[PropertyName$2]);
      }
      return Result
   }
   /// function TJSONObject.ToJSON() : String
   ///  [line: 298, column: 22, file: System.JSON]
   ,ToJSON:function(Self) {
      return JSON.stringify(Self.FInstance);
   }
   /// function TJSONObject.Write(const PropertyName: String; const Data: Variant) : TJSONObject
   ///  [line: 392, column: 22, file: System.JSON]
   ,Write$8:function(Self, PropertyName$3, Data$19) {
      var Result = null;
      Result = Self;
      if (TJSONObject.Exists(Self,PropertyName$3)) {
         if ($SetIn(Self.FOptions$5,3,0,4)) {
            Self.FInstance[PropertyName$3] = Data$19;
         } else {
            throw EW3Exception.CreateFmt($New(EJSONObject),"Failed to set value[%s], instance does not allow alteration",[PropertyName$3]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EJSONObject),"Failed to write value, property [%s] not found error",[PropertyName$3]);
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// EJSONObject = class (EW3Exception)
///  [line: 37, column: 3, file: System.JSON]
var EJSONObject = {
   $ClassName:"EJSONObject",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3CustomCSSAnimation = class (TObject)
///  [line: 58, column: 3, file: SmartCL.Effects]
var TW3CustomCSSAnimation = {
   $ClassName:"TW3CustomCSSAnimation",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnAnimationEnds = null;
      $.OnAnimationBegins = null;
      $.FDuration = 0;
      $.FEasingMode = 6;
      $.FIdent = $.FInnerName = "";
      $.FInnerHandle = undefined;
      $.FIterations = 1;
      $.FState = 0;
      $.FTarget = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 104, column: 38, file: SmartCL.Effects]
   ,a$94:function(Self) {
      return (Self.FState!=0);
   }
   /// procedure TW3CustomCSSAnimation.CBBegins()
   ///  [line: 1588, column: 33, file: SmartCL.Effects]
   ,CBBegins:function(Self) {
      if (Self.OnAnimationBegins) {
         Self.OnAnimationBegins(Self);
      }
   }
   /// procedure TW3CustomCSSAnimation.CBEnds(const EventObject: Variant)
   ///  [line: 1594, column: 33, file: SmartCL.Effects]
   ,CBEnds:function(Self, EventObject$2) {
      if (Self!==null) {
         if (EventObject$2.target==Self.FInnerHandle) {
            if (TW3CustomCSSAnimation.a$94(Self)) {
               try {
                  EventObject$2.stopPropagation();
                  TW3CustomCSSAnimation.FinalizeTransition$(Self);
                  if (Self.OnAnimationEnds) {
                     Self.OnAnimationEnds(Self);
                  }
               } catch ($e) {
                  var e$17 = $W($e);
                  /* null */
               }
            } else {
               EventObject$2.stopPropagation();
            }
         }
      }
   }
   /// constructor TW3CustomCSSAnimation.Create()
   ///  [line: 1466, column: 35, file: SmartCL.Effects]
   ,Create$135:function(Self) {
      TObject.Create(Self);
      Self.FIdent = TW3Identifiers.GenerateUniqueAnimationName(TW3Identifiers);
      return Self
   }
   /// destructor TW3CustomCSSAnimation.Destroy()
   ///  [line: 1475, column: 34, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      if (TW3CustomCSSAnimation.a$94(Self)&&(Self.FTarget!==null)) {
         try {
            TW3CustomCSSAnimation.FinalizeTransition$(Self);
         } catch ($e) {
            var e$18 = $W($e);
            /* null */
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomCSSAnimation.Execute(const Control: TW3TagObj)
   ///  [line: 1725, column: 33, file: SmartCL.Effects]
   ,Execute$1:function(Self, Control) {
      if (TW3CustomCSSAnimation.a$94(Self)) {
         throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.Execute", TObject.ClassName(Self.ClassType), "Transition is already running error"]);
      } else {
         if (Control!==null) {
            Self.FTarget = Control;
            TW3CustomCSSAnimation.SetupTransition$(Self);
         } else {
            throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.Execute", TObject.ClassName(Self.ClassType), "target control was nil error"]);
         }
      }
   }
   /// procedure TW3CustomCSSAnimation.ExecuteEx(const Control: TW3TagObj; const BeginHandler: TFxEffectBeginsEvent; const EndHandler: TFxEffectEndsEvent)
   ///  [line: 1743, column: 33, file: SmartCL.Effects]
   ,ExecuteEx:function(Self, Control$1, BeginHandler, EndHandler) {
      if (TW3CustomCSSAnimation.a$94(Self)) {
         throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.ExecuteEx", TObject.ClassName(Self.ClassType), "Transition is already running error"]);
      } else {
         if (Control$1!==null) {
            Self.FTarget = Control$1;
            Self.OnAnimationBegins = BeginHandler;
            Self.OnAnimationEnds = EndHandler;
            TW3CustomCSSAnimation.SetupTransition$(Self);
         } else {
            throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.ExecuteEx", TObject.ClassName(Self.ClassType), "target control was nil error"]);
         }
      }
   }
   /// procedure TW3CustomCSSAnimation.FinalizeTransition()
   ///  [line: 1694, column: 33, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      TW3DOMEventAPI.UnRegisterEvent(Self.FInnerHandle,Self.FInnerName,$Event1(Self,TW3CustomCSSAnimation.CBEnds),0);
      if ($Is(BrowserAPI(),TW3FirefoxBrowserAPI)) {
         Self.FTarget.FHandle$3.style["animation-iteration-count"] = "initial";
      } else {
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationIterationCount")] = "initial";
      }
      Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationTimingFunction")] = "initial";
      Self.FTarget.FHandle$3.style.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation"));
      Self.FTarget.FHandle$3.style.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode"));
      Self.FTarget.FHandle$3.style.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationTimingFunction"));
      Self.FTarget.FHandle$3.style.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationIterationCount"));
      Self.FTarget.FHandle$3.style.removeProperty("animation-iteration-count");
      Self.FState = 0;
   }
   /// procedure TW3CustomCSSAnimation.SetDuration(const NewDuration: Float)
   ///  [line: 1507, column: 33, file: SmartCL.Effects]
   ,SetDuration:function(Self, NewDuration) {
      if (TW3CustomCSSAnimation.a$94(Self)) {
         throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.SetDuration", TObject.ClassName(Self.ClassType), "Duration cannot be altered while active error"]);
      } else {
         Self.FDuration = NewDuration;
      }
   }
   /// procedure TW3CustomCSSAnimation.SetEasing(const NewEasing: TW3CSSEffectEasingMode)
   ///  [line: 1489, column: 33, file: SmartCL.Effects]
   ,SetEasing:function(Self, NewEasing) {
      if (TW3CustomCSSAnimation.a$94(Self)) {
         throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.SetEasing", TObject.ClassName(Self.ClassType), "Easing cannot be changed while active"]);
      } else {
         Self.FEasingMode = NewEasing;
      }
   }
   /// procedure TW3CustomCSSAnimation.SetIterations(const NewIterations: Integer)
   ///  [line: 1498, column: 33, file: SmartCL.Effects]
   ,SetIterations:function(Self, NewIterations) {
      if (TW3CustomCSSAnimation.a$94(Self)) {
         throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3CustomCSSAnimation.SetIterations", TObject.ClassName(Self.ClassType), "Iterations cannot be changed while active"]);
      } else {
         Self.FIterations = NewIterations;
      }
   }
   /// procedure TW3CustomCSSAnimation.SetupTransition()
   ///  [line: 1633, column: 33, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var LTimes = "";
      Self.FState = 1;
      if (Self.FIterations>=0) {
         LTimes = Self.FIterations.toString();
      } else {
         LTimes = "infinite";
      }
      if ($Is(BrowserAPI(),TW3FirefoxBrowserAPI)) {
         Self.FTarget.FHandle$3.style["animation-iteration-count"] = LTimes;
         Self.FInnerName = "animationend";
      } else {
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationIterationCount")] = LTimes;
         Self.FInnerName = TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationEnd");
      }
      Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationTimingFunction")] = cW3AnimationTiming[Self.FEasingMode];
      Self.FTarget.FHandle$3.style["animation-play-state"] = "running";
      Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"animation-play-state")] = "running";
      Self.FInnerHandle = Self.FTarget.FHandle$3;
      TW3DOMEventAPI.RegisterEvent(Self.FInnerHandle,Self.FInnerName,$Event1(Self,TW3CustomCSSAnimation.CBEnds),0);
      TW3CustomCSSAnimation.CBBegins(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$135$:function($){return $.ClassType.Create$135($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3NamedCSSAnimation = class (TW3CustomCSSAnimation)
///  [line: 116, column: 3, file: SmartCL.Effects]
var TW3NamedCSSAnimation = {
   $ClassName:"TW3NamedCSSAnimation",$Parent:TW3CustomCSSAnimation
   ,$Init:function ($) {
      TW3CustomCSSAnimation.$Init($);
      $.FName$2 = "";
   }
   /// procedure TW3NamedCSSAnimation.SetName(NewName: String)
   ///  [line: 1381, column: 32, file: SmartCL.Effects]
   ,SetName$4:function(Self, NewName) {
      if (TW3CustomCSSAnimation.a$94(Self)) {
         throw EW3Exception.CreateFmt($New(EW3EffectException),$R[0],["TW3NamedCSSAnimation.SetName", TObject.ClassName(Self.ClassType), "Name cannot be altered while active"]);
      } else {
         Self.FName$2 = Trim$_String_(NewName);
      }
   }
   /// procedure TW3NamedCSSAnimation.SetupTransition()
   ///  [line: 1390, column: 32, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      TW3CustomCSSAnimation.SetupTransition(Self);
      Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "both";
      Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = Self.FName$2+" "+FloatToStr$_Float_(Self.FDuration)+"s linear";
   }
   /// procedure TW3NamedCSSAnimation.FinalizeTransition()
   ///  [line: 1397, column: 32, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      TW3CustomCSSAnimation.FinalizeTransition(Self);
      if (Self.FTarget!==null) {
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "initial";
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = "initial";
      }
   }
   ,Destroy:TW3CustomCSSAnimation.Destroy
   ,Create$135:TW3CustomCSSAnimation.Create$135
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3CSSTransitionEffect = class (TW3CustomCSSAnimation)
///  [line: 140, column: 3, file: SmartCL.Effects]
var TW3CSSTransitionEffect = {
   $ClassName:"TW3CSSTransitionEffect",$Parent:TW3CustomCSSAnimation
   ,$Init:function ($) {
      TW3CustomCSSAnimation.$Init($);
      $.Sticky = $.Alternate = $.FStyleSetup = false;
      $.FAnimationCmd = "";
      $.FStyleDOM = undefined;
   }
   /// constructor TW3CSSTransitionEffect.Create()
   ///  [line: 1204, column: 36, file: SmartCL.Effects]
   ,Create$135:function(Self) {
      TW3CustomCSSAnimation.Create$135(Self);
      Self.Sticky = false;
      return Self
   }
   /// destructor TW3CSSTransitionEffect.Destroy()
   ///  [line: 1210, column: 35, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      TW3CSSTransitionEffect.InvalidateKeyFrames(Self);
      TW3CustomCSSAnimation.Destroy(Self);
   }
   /// procedure TW3CSSTransitionEffect.FinalizeTransition()
   ///  [line: 1260, column: 34, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      var style$8;
      style$8 = Self.FTarget.FHandle$3.style;
      style$8[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = "none";
      style$8[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "";
      if (!Self.Sticky) {
         style$8.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation"));
         style$8.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode"));
         Self.FAnimationCmd = "";
      }
      TW3CustomCSSAnimation.FinalizeTransition(Self);
   }
   /// procedure TW3CSSTransitionEffect.InvalidateKeyFrames()
   ///  [line: 1233, column: 34, file: SmartCL.Effects]
   ,InvalidateKeyFrames:function(Self) {
      if (Self.FStyleSetup) {
         Self.FStyleDOM.parentNode.removeChild(Self.FStyleDOM);
         Self.FStyleDOM = null;
         Self.FStyleSetup = false;
      }
   }
   /// function TW3CSSTransitionEffect.KeyFramesName() : String
   ///  [line: 1275, column: 33, file: SmartCL.Effects]
   ,KeyFramesName:function(Self) {
      return Self.FIdent;
   }
   /// procedure TW3CSSTransitionEffect.SetupKeyFrames()
   ///  [line: 1216, column: 34, file: SmartCL.Effects]
   ,SetupKeyFrames:function(Self) {
      var document$2 = undefined,
         css = "";
      Self.FStyleSetup = true;
      document$2 = document;
      Self.FStyleDOM = document$2.createElement("style");
      Self.FStyleDOM.type = "text\/css";
      css = "keyframes "+TW3CSSTransitionEffect.KeyFramesName(Self)+" {"+TW3CSSTransitionEffect.KeyFramesCSS$(Self)+"}";
      Self.FStyleDOM.appendChild(document$2.createTextNode("@"+TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"")+css));
      Self.FStyleDOM.appendChild(document$2.createTextNode("@"+css));
      document$2.getElementsByTagName("head")[0].appendChild(Self.FStyleDOM);
   }
   /// procedure TW3CSSTransitionEffect.SetupTransition()
   ///  [line: 1243, column: 34, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var style$9;
      TW3CustomCSSAnimation.SetupTransition(Self);
      if (!Self.FStyleSetup) {
         TW3CSSTransitionEffect.SetupKeyFrames(Self);
      }
      style$9 = Self.FTarget.FHandle$3.style;
      Self.FAnimationCmd = TW3CSSTransitionEffect.KeyFramesName(Self)+" "+FloatToStr$_Float_(Self.FDuration)+"s "+cW3AnimationTiming[Self.FEasingMode];
      if (Self.Alternate) {
         Self.FAnimationCmd+=" alternate";
      }
      style$9[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = Self.FAnimationCmd;
      style$9[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "both";
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$135$:function($){return $.ClassType.Create$135($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectZoomOut = class (TW3CSSTransitionEffect)
///  [line: 175, column: 4, file: SmartCL.Effects]
var TW3CssEffectZoomOut = {
   $ClassName:"TW3CssEffectZoomOut",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
   }
   /// function TW3CssEffectZoomOut.KeyFramesCSS() : String
   ///  [line: 1355, column: 30, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   $1: scale(1.0);\r\n   $2: 50% 50%;\r\n}\r\n50% {\r\n   opacity: 0.3;\r\n   $3: scale(0.5);\r\n}\r\n100% {\r\n   opacity: 0.0;\r\n   $5: scale(0);\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$4",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      return Result
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectZoomIn = class (TW3CSSTransitionEffect)
///  [line: 170, column: 4, file: SmartCL.Effects]
var TW3CssEffectZoomIn = {
   $ClassName:"TW3CssEffectZoomIn",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
   }
   /// function TW3CssEffectZoomIn.KeyFramesCSS() : String
   ///  [line: 1329, column: 29, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 0.0;\r\n   $1: scale(0);\r\n}\r\n50% {\r\n   opacity: 0.3;\r\n   $2: scale(0.5);\r\n}\r\n100% {\r\n   $3: scale(1.0);\r\n   $4: 50% 50%;\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$4",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      return Result
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectWarpOut = class (TW3CSSTransitionEffect)
///  [line: 165, column: 4, file: SmartCL.Effects]
var TW3CssEffectWarpOut = {
   $ClassName:"TW3CssEffectWarpOut",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
   }
   /// function TW3CssEffectWarpOut.KeyFramesCSS() : String
   ///  [line: 1307, column: 30, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 1.0;\r\n   $1: scale(1);\r\n}\r\n100% {\r\n   opacity: 0;\r\n   $2: scale(5);\r\n   $3: 50% 50%;\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      return Result
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectWarpIn = class (TW3CSSTransitionEffect)
///  [line: 160, column: 4, file: SmartCL.Effects]
var TW3CssEffectWarpIn = {
   $ClassName:"TW3CssEffectWarpIn",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
   }
   /// function TW3CssEffectWarpIn.KeyFramesCSS() : String
   ///  [line: 1284, column: 29, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 0;\r\n   $1: scale(5);\r\n   $2: 50% 50%;\r\n}\r\n100% {\r\n   opacity: 1.0;\r\n   $3: scale(1);\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      return Result
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CSSEffectState enumeration
///  [line: 46, column: 3, file: SmartCL.Effects]
var TW3CSSEffectState = [ "esIdle", "esRunning", "esPaused" ];
/// TW3CssEffectSize = class (TW3CSSTransitionEffect)
///  [line: 221, column: 3, file: SmartCL.Effects]
var TW3CssEffectSize = {
   $ClassName:"TW3CssEffectSize",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
      $.ToTop = $.ToLeft = $.ToHeight = $.ToWidth = $.FromHeight = $.FromLeft = $.FromTop = $.FromWidth = 0;
   }
   /// function TW3CssEffectSize.KeyFramesCSS() : String
   ///  [line: 1182, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return ("from {\r\n  left: "+Self.FromLeft.toString()+"px;\r\n  top:  "+Self.FromTop.toString()+"px;\r\n  width: "+Self.FromWidth.toString()+"px;\r\n  height: "+Self.FromHeight.toString()+"px;\r\n} to {\r\n  left: "+Self.ToLeft.toString()+"px;\r\n  top:  "+Self.ToTop.toString()+"px;\r\n  width: "+Self.ToWidth.toString()+"px;\r\n  height: "+Self.ToHeight.toString()+"px;\r\n}");
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectScale = class (TW3CSSTransitionEffect)
///  [line: 235, column: 3, file: SmartCL.Effects]
var TW3CssEffectScale = {
   $ClassName:"TW3CssEffectScale",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
      $.FFrom = undefined;
      $.FTo = undefined;
   }
   /// function TW3CssEffectScale.KeyFramesCSS() : String
   ///  [line: 1172, column: 28, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return "0% { transform: scale("+FloatToStr$_Float_(Number(Self.FFrom))+"); }"+"100% { transform: scale("+FloatToStr$_Float_(Number(Self.FTo))+"); }";
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectMove = class (TW3CSSTransitionEffect)
///  [line: 180, column: 4, file: SmartCL.Effects]
var TW3CssEffectMove = {
   $ClassName:"TW3CssEffectMove",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
      $.FFromX = $.FFromY = $.FToX = $.FToY = 0;
   }
   /// function TW3CssEffectMove.KeyFramesCSS() : String
   ///  [line: 1142, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return ("from {\r\n  left: "+Self.FFromX.toString()+"px;\r\n  top:  "+Self.FFromY.toString()+"px;\r\n} to {\r\n  left: "+Self.FToX.toString()+"px;\r\n  top: "+Self.FToY.toString()+"px;\r\n}");
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CssEffectFade = class (TW3CSSTransitionEffect)
///  [line: 194, column: 3, file: SmartCL.Effects]
var TW3CssEffectFade = {
   $ClassName:"TW3CssEffectFade",$Parent:TW3CSSTransitionEffect
   ,$Init:function ($) {
      TW3CSSTransitionEffect.$Init($);
      $.FFrom$1 = $.FTo$1 = 0;
   }
   /// function TW3CssEffectFade.KeyFramesCSS() : String
   ///  [line: 1159, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return "0% { opacity: "+FloatToStr$_Float_(Self.FFrom$1)+"; }"+"100% { opacity: "+FloatToStr$_Float_(Self.FTo$1)+"; }";
   }
   ,Destroy:TW3CSSTransitionEffect.Destroy
   ,Create$135:TW3CSSTransitionEffect.Create$135
   ,FinalizeTransition:TW3CSSTransitionEffect.FinalizeTransition
   ,SetupTransition:TW3CSSTransitionEffect.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3CSSEffectEasingMode enumeration
///  [line: 36, column: 3, file: SmartCL.Effects]
var TW3CSSEffectEasingMode = [ "atInherit", "atInitial", "atEase", "atEaseIn", "atEaseOut", "atEaseInOut", "atLinear" ];
/// EW3EffectException = class (EW3Exception)
///  [line: 31, column: 3, file: SmartCL.Effects]
var EW3EffectException = {
   $ClassName:"EW3EffectException",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3TagStyle = class (TW3OwnedObject)
///  [line: 26, column: 3, file: SmartCL.Css.Classes]
var TW3TagStyle = {
   $ClassName:"TW3TagStyle",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FCache$1 = [];
      $.FHandle$10 = undefined;
   }
   /// function TW3TagStyle.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 84, column: 22, file: SmartCL.Css.Classes]
   ,AcceptOwner:function(Self, CandidateObject$1) {
      return (CandidateObject$1!==null)&&$Is(CandidateObject$1,TW3CustomControl);
   }
   /// function TW3TagStyle.Add(CssClassName: String) : Integer
   ///  [line: 281, column: 22, file: SmartCL.Css.Classes]
   ,Add$2:function(Self, CssClassName) {
      var Result = 0;
      var LIndex$1 = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$10)) {
         CssClassName = Trim$_String_(CssClassName);
         if (CssClassName.length>0) {
            LIndex$1 = TW3TagStyle.IndexOf$2(Self,CssClassName);
            if (LIndex$1<0) {
               TW3TagStyle.AddClassToControl(Self.ClassType,Self.FHandle$10,CssClassName);
               Self.FCache$1.push(CssClassName);
               Result = Self.FCache$1.length-1;
            } else {
               Result = LIndex$1;
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3TagStyle.Add", TObject.ClassName(Self.ClassType), "invalid style-name error"]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3TagStyle.Add", TObject.ClassName(Self.ClassType), "invalid owner handle error"]);
      }
      return Result
   }
   /// procedure TW3TagStyle.AddClassToControl(const Handle: TControlHandle; CssClassName: String)
   ///  [line: 101, column: 29, file: SmartCL.Css.Classes]
   ,AddClassToControl:function(Self, Handle$21, CssClassName$1) {
      var _qr = ((Handle$21).className.match(new RegExp("(\\s|^)"+CssClassName$1+"(\\s|$)"))) ? true : false;
    if (_qr === false)
      (Handle$21).className += (" " + CssClassName$1);
   }
   /// function TW3TagStyle.Contains(const CssClassName: String) : Boolean
   ///  [line: 218, column: 22, file: SmartCL.Css.Classes]
   ,Contains$2:function(Self, CssClassName$2) {
      return TW3TagStyle.ControlContainsClass(Self.ClassType,Self.FHandle$10,CssClassName$2);
   }
   /// function TW3TagStyle.ControlContainsClass(const Handle: TControlHandle; CssClassName: String) : Boolean
   ///  [line: 110, column: 28, file: SmartCL.Css.Classes]
   ,ControlContainsClass:function(Self, Handle$22, CssClassName$3) {
      var Result = false;
      Result = ((Handle$22).className.match(new RegExp("(\\s|^)" + CssClassName$3 +"(\\s|$)"))) ? true : false;
      return Result
   }
   /// constructor TW3TagStyle.Create(AOwner: TObject)
   ///  [line: 72, column: 25, file: SmartCL.Css.Classes]
   ,Create$11:function(Self, AOwner$7) {
      TW3OwnedObject.Create$11(Self,AOwner$7);
      Self.FHandle$10 = $As(AOwner$7,TW3CustomControl).FHandle$3;
      return Self
   }
   /// destructor TW3TagStyle.Destroy()
   ///  [line: 78, column: 24, file: SmartCL.Css.Classes]
   ,Destroy:function(Self) {
      Self.FCache$1.length=0;
      TObject.Destroy(Self);
   }
   /// function TW3TagStyle.IndexOf(CssClassName: String) : Integer
   ///  [line: 223, column: 22, file: SmartCL.Css.Classes]
   ,IndexOf$2:function(Self, CssClassName$4) {
      var Result = 0;
      var x$52 = 0;
      Result = -1;
      if (TControlHandleHelper$Valid$2(Self.FHandle$10)) {
         CssClassName$4 = Trim$_String_((CssClassName$4).toLocaleLowerCase());
         if (CssClassName$4.length>0) {
            var $temp33;
            for(x$52=0,$temp33=Self.FCache$1.length;x$52<$temp33;x$52++) {
               if ((Self.FCache$1[x$52]).toLocaleLowerCase()==CssClassName$4) {
                  Result = x$52;
                  break;
               }
            }
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagStyle),$R[0],["TW3TagStyle.IndexOf", TObject.ClassName(Self.ClassType), "invalid owner handle error"]);
      }
      return Result
   }
   /// function TW3TagStyle.RemoveByName(CssClassName: String) : String
   ///  [line: 323, column: 22, file: SmartCL.Css.Classes]
   ,RemoveByName:function(Self, CssClassName$5) {
      var Result = "";
      var LIndex$2 = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$10)) {
         CssClassName$5 = Trim$_String_(CssClassName$5);
         if (CssClassName$5.length>0) {
            TW3TagStyle.RemoveClassFromControl(Self.ClassType,Self.FHandle$10,CssClassName$5);
            LIndex$2 = TW3TagStyle.IndexOf$2(Self,CssClassName$5);
            if (LIndex$2>=0) {
               Self.FCache$1.splice(LIndex$2,1)
               ;
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3TagStyle.RemoveByName", TObject.ClassName(Self.ClassType), "style-class was empty error"]);
         }
         Result = CssClassName$5;
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3TagStyle.RemoveByName", TObject.ClassName(Self.ClassType), "invalid owner handle error"]);
      }
      return Result
   }
   /// procedure TW3TagStyle.RemoveClassFromControl(const Handle: TControlHandle; CssClassName: String)
   ///  [line: 117, column: 29, file: SmartCL.Css.Classes]
   ,RemoveClassFromControl:function(Self, Handle$23, CssClassName$6) {
      var reg$1;
      reg$1 = new RegExp("(\\s|^)" + CssClassName$6 + "(\\s|$)");
    (Handle$23).className=(Handle$23).className.replace(reg$1," ").replace('  ',' ').trim();
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3TagStyle.$Intf={
   IW3OwnedObjectAccess:[TW3TagStyle.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// EW3TagStyle = class (EW3Exception)
///  [line: 24, column: 3, file: SmartCL.Css.Classes]
var EW3TagStyle = {
   $ClassName:"EW3TagStyle",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3StyleSheet = class (TObject)
///  [line: 12, column: 3, file: SmartCL.CSS.Stylesheet]
var TW3StyleSheet = {
   $ClassName:"TW3StyleSheet",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$12 = undefined;
   }
   /// procedure TW3StyleSheet.Append(const CSSFileText: String)
   ///  [line: 830, column: 25, file: SmartCL.CSS.Stylesheet]
   ,Append$2:function(Self, CSSFileText) {
      var Current$1;
      if (Self.FHandle$12) {
         Current$1 = Self.FHandle$12.innerHTML;
         Current$1+="\r";
         Current$1+=CSSFileText;
         Self.FHandle$12.innerHTML = Current$1;
      }
   }
   /// constructor TW3StyleSheet.Create(const StyleSheet: THandle)
   ///  [line: 656, column: 27, file: SmartCL.CSS.Stylesheet]
   ,Create$141:function(Self, StyleSheet$1) {
      TObject.Create(Self);
      Self.FHandle$12 = StyleSheet$1;
      return Self
   }
   /// constructor TW3StyleSheet.Create()
   ///  [line: 662, column: 27, file: SmartCL.CSS.Stylesheet]
   ,Create$140:function(Self) {
      TObject.Create(Self);
      Self.FHandle$12 = document.createElement("style");
      Self.FHandle$12.type = "text\/css";
      if ($Is(BrowserAPI(),TW3WebkitBrowserAPI)) {
         if (!Self.FHandle$12.styleSheet) {
            Self.FHandle$12.appendChild(document.createTextNode(""));
         }
      }
      window.document.head.appendChild(Self.FHandle$12);
      return Self
   }
   /// destructor TW3StyleSheet.Destroy()
   ///  [line: 682, column: 26, file: SmartCL.CSS.Stylesheet]
   ,Destroy:function(Self) {
      if (Self.FHandle$12) {
         window.document.head.removeChild(Self.FHandle$12);
      }
      Self.FHandle$12 = null;
      TObject.Destroy(Self);
   }
   /// function TW3StyleSheet.GlobalStyleSheet() : TW3StyleSheet
   ///  [line: 740, column: 30, file: SmartCL.CSS.Stylesheet]
   ,GlobalStyleSheet:function(Self) {
      var Result = null;
      if (FGlobalSheet===null) {
         FGlobalSheet = TW3StyleSheet.Create$140($New(TW3StyleSheet));
      }
      Result = FGlobalSheet;
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TW3ZOrderFilterResult enumeration
///  [line: 285, column: 3, file: SmartCL.Components]
var TW3ZOrderFilterResult = [ "zfInclude", "zfExclude" ];
/// TW3TextShadow = class (TW3OwnedObject)
///  [line: 722, column: 3, file: SmartCL.Components]
var TW3TextShadow = {
   $ClassName:"TW3TextShadow",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
};
TW3TextShadow.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3TagPositionMode enumeration
///  [line: 294, column: 3, file: SmartCL.Components]
var TW3TagPositionMode = { 22:"pmRelative", 23:"pmAbsolute", 24:"pmSmart" };
/// TW3TagDisplayMode enumeration
///  [line: 300, column: 3, file: SmartCL.Components]
var TW3TagDisplayMode = [ "dmInlineBlock", "dmBlock", "dmFlex", "dmTable", "dmTableCaption", "dmTableCell", "dmTableRow", "dmTableColumn", "dmRunIn", "dmListItem" ];
/// TW3StackingOrderList = record
///  [line: 276, column: 3, file: SmartCL.Components]
function Copy$TW3StackingOrderList(s,d) {
   return d;
}
function Clone$TW3StackingOrderList($) {
   return {

   }
}
/// TW3ScrollInfo = class (TW3OwnedObject)
///  [line: 830, column: 3, file: SmartCL.Components]
var TW3ScrollInfo = {
   $ClassName:"TW3ScrollInfo",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FHandle$8 = undefined;
   }
   /// constructor TW3ScrollInfo.Create(const AOwner: TW3TagObj)
   ///  [line: 3184, column: 27, file: SmartCL.Components]
   ,Create$123:function(Self, AOwner$8) {
      TW3OwnedObject.Create$11(Self,AOwner$8);
      Self.FHandle$8 = AOwner$8.FHandle$3;
      return Self
   }
   /// function TW3ScrollInfo.GetScrollHeight() : Integer
   ///  [line: 3227, column: 24, file: SmartCL.Components]
   ,GetScrollHeight:function(Self) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$8)) {
         Result = parseInt(Self.FHandle$8.scrollHeight,10);
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ScrollInfo.GetScrollHeight",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollLeft() : Integer
   ///  [line: 3236, column: 24, file: SmartCL.Components]
   ,GetScrollLeft:function(Self) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$8)) {
         Result = parseInt(Self.FHandle$8.scrollLeft,10);
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ScrollInfo.GetScrollLeft",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollTop() : Integer
   ///  [line: 3245, column: 24, file: SmartCL.Components]
   ,GetScrollTop:function(Self) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$8)) {
         Result = parseInt(Self.FHandle$8.scrollTop,10);
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ScrollInfo.GetScrollTop",Self,"invalid owner handle error");
      }
      return Result
   }
   /// procedure TW3ScrollInfo.ScrollTo(const NewLeft: Integer; const NewTop: Integer)
   ///  [line: 3254, column: 25, file: SmartCL.Components]
   ,ScrollTo:function(Self, NewLeft$3, NewTop$3) {
      if (TControlHandleHelper$Valid$2(Self.FHandle$8)) {
         Self.FHandle$8.scrollLeft = NewLeft$3;
         Self.FHandle$8.scrollTop = NewTop$3;
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ScrollInfo.ScrollTo",Self,"invalid owner handle error");
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
};
TW3ScrollInfo.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3GraphicControl = class (TW3CustomControl)
///  [line: 1268, column: 3, file: SmartCL.Components]
var TW3GraphicControl = {
   $ClassName:"TW3GraphicControl",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCanvas = $.FContext$2 = $.FOnPaint = null;
   }
   /// procedure TW3GraphicControl.FinalizeObject()
   ///  [line: 4361, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FCanvas);
      TObject.Free(Self.FContext$2);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3GraphicControl.InitializeObject()
   ///  [line: 4354, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContext$2 = TW3ControlGraphicContext.Create$100($New(TW3ControlGraphicContext),Self.FHandle$3);
      Self.FCanvas = TW3Canvas.Create$103($New(TW3Canvas),Self.FContext$2);
   }
   /// procedure TW3GraphicControl.Invalidate()
   ///  [line: 4419, column: 29, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      if (Self.FHandle$3) {
         TW3GraphicControl.Refresh(Self);
      }
   }
   /// function TW3GraphicControl.MakeElementTagObj() : THandle
   ///  [line: 4398, column: 28, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = document.createElement("canvas");
      return Result
   }
   /// procedure TW3GraphicControl.Paint()
   ///  [line: 4405, column: 29, file: SmartCL.Components]
   ,Paint:function(Self) {
      if (Self.FOnPaint) {
         Self.FOnPaint(Self,Self.FCanvas);
      }
   }
   /// procedure TW3GraphicControl.Refresh()
   ///  [line: 4426, column: 29, file: SmartCL.Components]
   ,Refresh:function(Self) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!TW3TagObj.a$50(Self)) {
            if ($SetIn(Self.FComponentState,3,0,9)) {
               TW3GraphicControl.Paint(Self);
            }
         }
      }
   }
   /// procedure TW3GraphicControl.Resize()
   ///  [line: 4411, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      w3_setAttrib(Self.FHandle$3,"width",w3_GetStyle(Self.FHandle$3,"width"));
      w3_setAttrib(Self.FHandle$3,"height",w3_GetStyle(Self.FHandle$3,"height"));
   }
   /// procedure TW3GraphicControl.SetHeight(const NewHeight: Integer)
   ///  [line: 4387, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, NewHeight$3) {
      TW3MovableControl.SetHeight(Self,NewHeight$3);
      if (Self.FHandle$3) {
         if (NewHeight$3!=TW3MovableControl.GetHeight$(Self)) {
            w3_setAttrib(Self.FHandle$3,"height",TInteger.ToPxStr(NewHeight$3));
         }
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3GraphicControl.SetHeight",Self,"invalid control handle error");
      }
   }
   /// procedure TW3GraphicControl.SetWidth(const NewWidth: Integer)
   ///  [line: 4376, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, NewWidth$3) {
      TW3MovableControl.SetWidth(Self,NewWidth$3);
      if (Self.FHandle$3) {
         if (NewWidth$3!=TW3MovableControl.GetWidth$(Self)) {
            w3_setAttrib(Self.FHandle$3,"width",TInteger.ToPxStr(NewWidth$3));
         }
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3GraphicControl.SetWidth",Self,"invalid control handle error");
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3GraphicControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ControlTracker = class (TObject)
///  [line: 1303, column: 3, file: SmartCL.Components]
var TW3ControlTracker = {
   $ClassName:"TW3ControlTracker",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3ControlTracker.GetControlByHandle(const ThisHandle: THandle) : TW3TagObj
   ///  [line: 1498, column: 34, file: SmartCL.Components]
   ,GetControlByHandle:function(Self, ThisHandle) {
      var Result = null;
      var LGenKey;
      if (FLUT===null) {
         FLUT = TW3CustomDictionary.Create$127($New(TW3ObjDictionary));
      }
      if (FOLUT===null) {
         FOLUT = TW3CustomDictionary.Create$127($New(TW3ObjDictionary));
      }
      if (ThisHandle) {
         LGenKey = ThisHandle.getAttribute("data-okey");
         if (LGenKey) {
            if (TW3CustomDictionary.Contains(FOLUT,(String(LGenKey)))) {
               Result = $As(TW3ObjDictionary.a$79(FOLUT,(String(LGenKey))),TW3TagObj);
            }
         }
      }
      return Result
   }
   /// procedure TW3ControlTracker.RegisterControl(const Instance: TW3TagObj)
   ///  [line: 1440, column: 35, file: SmartCL.Components]
   ,RegisterControl:function(Self, Instance$7) {
      var LId = "",
         LGenKey$1 = "";
      if (Instance$7!==null) {
         if (FLUT===null) {
            FLUT = TW3CustomDictionary.Create$127($New(TW3ObjDictionary));
         }
         if (FOLUT===null) {
            FOLUT = TW3CustomDictionary.Create$127($New(TW3ObjDictionary));
         }
         LId = Trim$_String_(Instance$7.FTagId);
         if (LId.length>0) {
            TW3ObjDictionary.a$78(FLUT,LId,Instance$7);
         }
         LGenKey$1 = TW3Identifiers.GenerateUniqueObjectId(TW3Identifiers);
         Instance$7.FHandle$3.setAttribute("data-okey",LGenKey$1);
         TW3ObjDictionary.a$78(FOLUT,LGenKey$1,Instance$7);
      }
   }
   /// procedure TW3ControlTracker.SetFocusedControl(const NewItem: TW3TagObj)
   ///  [line: 1524, column: 35, file: SmartCL.Components]
   ,SetFocusedControl:function(Self, NewItem) {
      FFocused = NewItem;
   }
   /// procedure TW3ControlTracker.UnRegisterControl(const Instance: TW3TagObj)
   ///  [line: 1465, column: 35, file: SmartCL.Components]
   ,UnRegisterControl:function(Self, Instance$8) {
      var LId$1 = "",
         LGenKey$2;
      if (Instance$8!==null) {
         if (FLUT===null) {
            FLUT = TW3CustomDictionary.Create$127($New(TW3ObjDictionary));
         }
         if (FOLUT===null) {
            FOLUT = TW3CustomDictionary.Create$127($New(TW3ObjDictionary));
         }
         LId$1 = Trim$_String_(Instance$8.FTagId);
         if (LId$1.length>0) {
            if (TW3CustomDictionary.Contains(FLUT,LId$1)) {
               if (FFocused===Instance$8) {
                  FFocused = null;
               }
               TW3CustomDictionary.Delete$1(FLUT,LId$1);
            }
         }
         LGenKey$2 = Instance$8.FHandle$3.getAttribute("data-okey");
         if (TW3CustomDictionary.Contains(FOLUT,(String(LGenKey$2)))) {
            TW3CustomDictionary.Delete$1(FOLUT,(String(LGenKey$2)));
            Instance$8.FHandle$3.removeAttribute("data-okey");
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3ControlSizeInfo = record
///  [line: 263, column: 3, file: SmartCL.Components]
function Copy$TW3ControlSizeInfo(s,d) {
   return d;
}
function Clone$TW3ControlSizeInfo($) {
   return {

   }
}
/// TW3CustomFont = class (TObject)
///  [line: 21, column: 3, file: System.Fonts]
var TW3CustomFont = {
   $ClassName:"TW3CustomFont",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnChanged = null;
   }
   ,Destroy:TObject.Destroy
   ,GetColor$1$:function($){return $.ClassType.GetColor$1($)}
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
   ,GetName$:function($){return $.ClassType.GetName($)}
   ,GetSize$4$:function($){return $.ClassType.GetSize$4($)}
   ,GetStyle$:function($){return $.ClassType.GetStyle($)}
   ,GetWeight$:function($){return $.ClassType.GetWeight($)}
   ,SetColor$2$:function($){return $.ClassType.SetColor$2.apply($.ClassType, arguments)}
   ,SetName$1$:function($){return $.ClassType.SetName$1.apply($.ClassType, arguments)}
   ,SetSize$6$:function($){return $.ClassType.SetSize$6.apply($.ClassType, arguments)}
   ,SetStyle$:function($){return $.ClassType.SetStyle.apply($.ClassType, arguments)}
   ,SetWeight$:function($){return $.ClassType.SetWeight.apply($.ClassType, arguments)}
};
/// TW3DOMFont = class (TW3CustomFont)
///  [line: 27, column: 3, file: SmartCL.Fonts]
var TW3DOMFont = {
   $ClassName:"TW3DOMFont",$Parent:TW3CustomFont
   ,$Init:function ($) {
      TW3CustomFont.$Init($);
      $.FHandle$7 = undefined;
      $.FStyle$1 = [0];
   }
   /// constructor TW3DOMFont.Create(const ControlHandle: TControlHandle)
   ///  [line: 64, column: 24, file: SmartCL.Fonts]
   ,Create$122:function(Self, ControlHandle) {
      TObject.Create(Self);
      Self.FHandle$7 = ControlHandle;
      return Self
   }
   /// function TW3DOMFont.GetColor() : TColor
   ///  [line: 237, column: 21, file: SmartCL.Fonts]
   ,GetColor$1:function(Self) {
      var Result = {v:0};
      try {
         var LHandle$1 = undefined;
         LHandle$1 = TW3CustomFont.GetHandle$4$(Self);
         if (LHandle$1) {
            Result.v = StrToColor(w3_GetStyleAsStr(LHandle$1,"color"));
         } else {
            throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetColor", TObject.ClassName(Self.ClassType), $R[17]]);
         }
      } finally {return Result.v}
   }
   /// function TW3DOMFont.GetHandle() : THandle
   ///  [line: 174, column: 21, file: SmartCL.Fonts]
   ,GetHandle$4:function(Self) {
      return Self.FHandle$7;
   }
   /// function TW3DOMFont.GetName() : String
   ///  [line: 189, column: 21, file: SmartCL.Fonts]
   ,GetName:function(Self) {
      var Result = "";
      var mHandle = undefined;
      mHandle = TW3CustomFont.GetHandle$4$(Self);
      if (mHandle) {
         Result = w3_GetStyleAsStr(mHandle,"font-family");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetName", TObject.ClassName(Self.ClassType), $R[17]]);
      }
      return Result
   }
   /// function TW3DOMFont.GetSize() : Integer
   ///  [line: 214, column: 21, file: SmartCL.Fonts]
   ,GetSize$4:function(Self) {
      var Result = 0;
      var LHandle$2 = undefined;
      LHandle$2 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$2) {
         Result = w3_GetStyleAsInt(LHandle$2,"font-size");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetSize", TObject.ClassName(Self.ClassType), $R[17]]);
      }
      return Result
   }
   /// function TW3DOMFont.GetStyle() : TW3FontStyle
   ///  [line: 70, column: 22, file: SmartCL.Fonts]
   ,GetStyle:function(Self) {
      return Self.FStyle$1.slice(0);
   }
   /// function TW3DOMFont.GetWeight() : String
   ///  [line: 261, column: 21, file: SmartCL.Fonts]
   ,GetWeight:function(Self) {
      var Result = "";
      var LHandle$3 = undefined;
      LHandle$3 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$3) {
         Result = w3_GetStyleAsStr(LHandle$3,"font-weight");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetWeight", TObject.ClassName(Self.ClassType), $R[17]]);
      }
      return Result
   }
   /// procedure TW3DOMFont.SetColor(aNewColor: TColor)
   ///  [line: 248, column: 22, file: SmartCL.Fonts]
   ,SetColor$2:function(Self, aNewColor) {
      var LHandle$4 = undefined;
      LHandle$4 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$4) {
         LHandle$4.style["color"] = ColorToWebStr(aNewColor,255);
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetColor", TObject.ClassName(Self.ClassType), $R[17]]);
      }
   }
   /// procedure TW3DOMFont.SetName(aNewName: String)
   ///  [line: 201, column: 22, file: SmartCL.Fonts]
   ,SetName$1:function(Self, aNewName) {
      var LHandle$5 = undefined;
      LHandle$5 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$5) {
         LHandle$5.style["font-family"] = aNewName;
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetName", TObject.ClassName(Self.ClassType), $R[17]]);
      }
   }
   /// procedure TW3DOMFont.SetSize(aNewSize: Integer)
   ///  [line: 224, column: 22, file: SmartCL.Fonts]
   ,SetSize$6:function(Self, aNewSize) {
      var LHandle$6 = undefined;
      LHandle$6 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$6) {
         LHandle$6.style["font-size"] = TInteger.ToPxStr(aNewSize);
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetSize", TObject.ClassName(Self.ClassType), $R[17]]);
      }
   }
   /// procedure TW3DOMFont.SetStyle(const NewStyle: TW3FontStyle)
   ///  [line: 101, column: 22, file: SmartCL.Fonts]
   ,SetStyle:function(Self, NewStyle) {
      var LChange = 0;
      if ($SetIn(NewStyle,22,0,26)) {
         if (!$SetIn(Self.FStyle$1,22,0,26)) {
            $SetInc(Self.FStyle$1,22,0,26);
            ++LChange;
         }
      } else if ($SetIn(Self.FStyle$1,22,0,26)) {
         $SetExc(Self.FStyle$1,22,0,26);
         ++LChange;
      }
      if ($SetIn(NewStyle,24,0,26)) {
         if (!$SetIn(Self.FStyle$1,24,0,26)) {
            $SetInc(Self.FStyle$1,24,0,26);
            ++LChange;
         }
      } else if ($SetIn(Self.FStyle$1,24,0,26)) {
         $SetExc(Self.FStyle$1,24,0,26);
         ++LChange;
      }
      if ($SetIn(NewStyle,23,0,26)) {
         if (!$SetIn(Self.FStyle$1,23,0,26)) {
            $SetInc(Self.FStyle$1,23,0,26);
            ++LChange;
         }
      } else if ($SetIn(Self.FStyle$1,23,0,26)) {
         $SetExc(Self.FStyle$1,23,0,26);
         ++LChange;
      }
      if ($SetIn(NewStyle,25,0,26)) {
         if (!$SetIn(Self.FStyle$1,25,0,26)) {
            $SetInc(Self.FStyle$1,25,0,26);
            ++LChange;
         }
      } else if ($SetIn(Self.FStyle$1,25,0,26)) {
         $SetExc(Self.FStyle$1,25,0,26);
         ++LChange;
      }
      if (LChange>0) {
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      }
   }
   /// procedure TW3DOMFont.SetWeight(aNewWeight: String)
   ///  [line: 272, column: 22, file: SmartCL.Fonts]
   ,SetWeight:function(Self, aNewWeight) {
      var LHandle$7 = undefined;
      LHandle$7 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$7) {
         LHandle$7.style["font-weight"] = aNewWeight;
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetWeight", TObject.ClassName(Self.ClassType), $R[17]]);
      }
   }
   ,Destroy:TObject.Destroy
   ,GetColor$1$:function($){return $.ClassType.GetColor$1($)}
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
   ,GetName$:function($){return $.ClassType.GetName($)}
   ,GetSize$4$:function($){return $.ClassType.GetSize$4($)}
   ,GetStyle$:function($){return $.ClassType.GetStyle($)}
   ,GetWeight$:function($){return $.ClassType.GetWeight($)}
   ,SetColor$2$:function($){return $.ClassType.SetColor$2.apply($.ClassType, arguments)}
   ,SetName$1$:function($){return $.ClassType.SetName$1.apply($.ClassType, arguments)}
   ,SetSize$6$:function($){return $.ClassType.SetSize$6.apply($.ClassType, arguments)}
   ,SetStyle$:function($){return $.ClassType.SetStyle.apply($.ClassType, arguments)}
   ,SetWeight$:function($){return $.ClassType.SetWeight.apply($.ClassType, arguments)}
};
/// TW3ControlFont = class (TW3DOMFont)
///  [line: 677, column: 3, file: SmartCL.Components]
var TW3ControlFont = {
   $ClassName:"TW3ControlFont",$Parent:TW3DOMFont
   ,$Init:function ($) {
      TW3DOMFont.$Init($);
      $.FAuto = false;
      $.FOwner$3 = null;
   }
   /// constructor TW3ControlFont.Create(const AOwner: TW3MovableControl)
   ///  [line: 3156, column: 28, file: SmartCL.Components]
   ,Create$124:function(Self, AOwner$9) {
      TW3DOMFont.Create$122(Self,AOwner$9.FHandle$3);
      if (AOwner$9) {
         Self.FOwner$3 = AOwner$9;
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ControlFont.Create",Self,"Owner was nil error");
      }
      return Self
   }
   /// function TW3ControlFont.GetHandle() : THandle
   ///  [line: 3166, column: 25, file: SmartCL.Components]
   ,GetHandle$4:function(Self) {
      return Self.FOwner$3.FHandle$3;
   }
   /// procedure TW3ControlFont.SetAuto(const NewValue: Boolean)
   ///  [line: 3171, column: 26, file: SmartCL.Components]
   ,SetAuto:function(Self, NewValue) {
      if (NewValue!=Self.FAuto) {
         Self.FAuto = NewValue;
         TW3MovableControl.Resize$(Self.FOwner$3);
      }
   }
   ,Destroy:TObject.Destroy
   ,GetColor$1:TW3DOMFont.GetColor$1
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
   ,GetName:TW3DOMFont.GetName
   ,GetSize$4:TW3DOMFont.GetSize$4
   ,GetStyle:TW3DOMFont.GetStyle
   ,GetWeight:TW3DOMFont.GetWeight
   ,SetColor$2:TW3DOMFont.SetColor$2
   ,SetName$1:TW3DOMFont.SetName$1
   ,SetSize$6:TW3DOMFont.SetSize$6
   ,SetStyle:TW3DOMFont.SetStyle
   ,SetWeight:TW3DOMFont.SetWeight
};
/// TW3ControlBackgroundSizeMode enumeration
///  [line: 690, column: 3, file: SmartCL.Components]
var TW3ControlBackgroundSizeMode = [ "smAuto", "smLength", "smPercent", "smCover", "smContain" ];
/// TW3ControlBackgroundSize = class (TW3OwnedObject)
///  [line: 700, column: 3, file: SmartCL.Components]
var TW3ControlBackgroundSize = {
   $ClassName:"TW3ControlBackgroundSize",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FHeight$1 = $.FWidth$1 = 0;
      $.FMode = 3;
   }
   /// function TW3ControlBackgroundSize.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 5548, column: 35, file: SmartCL.Components]
   ,AcceptOwner:function(Self, CandidateObject$2) {
      return (CandidateObject$2!==null)&&$Is(CandidateObject$2,TW3ControlBackground);
   }
   /// procedure TW3ControlBackgroundSize.Apply()
   ///  [line: 5605, column: 36, file: SmartCL.Components]
   ,Apply:function(Self) {
      var LHandle$8 = undefined;
      LHandle$8 = TW3ControlBackgroundSize.GetOwnerHandle(Self);
      if (TControlHandleHelper$Valid$2(LHandle$8)) {
         switch (Self.FMode) {
            case 0 :
               LHandle$8.style["background-size"] = "auto auto";
               break;
            case 3 :
               LHandle$8.style["background-size"] = "cover";
               break;
            case 4 :
               LHandle$8.style["background-size"] = "contain";
               break;
            case 1 :
               LHandle$8.style["background-size"] = (Self.FWidth$1.toString()+"px "+Self.FHeight$1.toString()+"px");
               break;
            case 2 :
               Self.FWidth$1 = TInteger.EnsureRange(Self.FWidth$1,0,100);
               Self.FHeight$1 = TInteger.EnsureRange(Self.FHeight$1,0,100);
               LHandle$8.style["background-size"] = Self.FWidth$1.toString()+"% "+Self.FHeight$1.toString()+"%";
               break;
         }
      } else {
         throw EW3Exception.Create$17($New(EW3ControlBackgroundSize),"TW3ControlBackgroundSize.Apply",Self,"Invalid control handle error");
      }
   }
   /// function TW3ControlBackgroundSize.GetOwner() : TW3ControlBackground
   ///  [line: 5553, column: 35, file: SmartCL.Components]
   ,GetOwner$2:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3ControlBackground);
   }
   /// function TW3ControlBackgroundSize.GetOwnerHandle() : TControlHandle
   ///  [line: 5558, column: 35, file: SmartCL.Components]
   ,GetOwnerHandle:function(Self) {
      var Result = undefined;
      var LBack = null;
      var LCtrl = null;
      LBack = TW3ControlBackgroundSize.GetOwner$2(Self);
      if (LBack!==null) {
         if (TW3ControlBackground.GetOwner$3(LBack)!==null) {
            LCtrl = TW3ControlBackground.GetOwner$3(LBack);
            if (LCtrl!==null) {
               Result = LCtrl.FHandle$3;
            } else {
               Result = null;
            }
         } else {
            Result = null;
         }
      } else {
         Result = null;
      }
      return Result
   }
   /// procedure TW3ControlBackgroundSize.SetHeight(NewHeight: Integer)
   ///  [line: 5641, column: 36, file: SmartCL.Components]
   ,SetHeight$2:function(Self, NewHeight$4) {
      if (NewHeight$4!=Self.FHeight$1) {
         switch (Self.FMode) {
            case 2 :
               Self.FHeight$1 = TInteger.EnsureRange(NewHeight$4,0,100);
               break;
            default :
               Self.FHeight$1 = TInteger.EnsureRange(NewHeight$4,0,2147483647);
         }
         TW3ControlBackgroundSize.Apply(Self);
      }
   }
   /// procedure TW3ControlBackgroundSize.SetMode(const NewMode: TW3ControlBackgroundSizeMode)
   ///  [line: 5596, column: 36, file: SmartCL.Components]
   ,SetMode:function(Self, NewMode$2) {
      if (NewMode$2!=Self.FMode) {
         Self.FMode = NewMode$2;
         TW3ControlBackgroundSize.Apply(Self);
      }
   }
   /// procedure TW3ControlBackgroundSize.SetWidth(NewWidth: Integer)
   ///  [line: 5629, column: 36, file: SmartCL.Components]
   ,SetWidth$2:function(Self, NewWidth$4) {
      if (NewWidth$4!=Self.FWidth$1) {
         switch (Self.FMode) {
            case 2 :
               Self.FWidth$1 = TInteger.EnsureRange(NewWidth$4,0,100);
               break;
            default :
               Self.FWidth$1 = TInteger.EnsureRange(NewWidth$4,0,2147483647);
         }
         TW3ControlBackgroundSize.Apply(Self);
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11:TW3OwnedObject.Create$11
};
TW3ControlBackgroundSize.$Intf={
   IW3OwnedObjectAccess:[TW3ControlBackgroundSize.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ControlBackground = class (TW3OwnedObject)
///  [line: 765, column: 3, file: SmartCL.Components]
var TW3ControlBackground = {
   $ClassName:"TW3ControlBackground",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FSize$2 = null;
   }
   /// function TW3ControlBackground.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 1879, column: 31, file: SmartCL.Components]
   ,AcceptOwner:function(Self, CandidateObject$3) {
      return CandidateObject$3!==null&&$Is(CandidateObject$3,TW3MovableControl);
   }
   /// constructor TW3ControlBackground.Create(const AOwner: TObject)
   ///  [line: 1829, column: 34, file: SmartCL.Components]
   ,Create$11:function(Self, AOwner$10) {
      TW3OwnedObject.Create$11(Self,AOwner$10);
      Self.FSize$2 = TW3OwnedObject.Create$11$($New(TW3ControlBackgroundSize),Self);
      return Self
   }
   /// destructor TW3ControlBackground.Destroy()
   ///  [line: 1835, column: 33, file: SmartCL.Components]
   ,Destroy:function(Self) {
      TObject.Free(Self.FSize$2);
      TObject.Destroy(Self);
   }
   /// procedure TW3ControlBackground.FromColor(const aValue: TColor)
   ///  [line: 1896, column: 32, file: SmartCL.Components]
   ,FromColor:function(Self, aValue$43) {
      var LHandle$9 = undefined;
      LHandle$9 = TW3ControlBackground.GetOwnerHandle$1(Self);
      if (aValue$43!=536870911) {
         LHandle$9.style.backgroundColor = ColorToWebStr(aValue$43,255);
      } else {
         LHandle$9.style.backgroundColor = "inherited";
      }
   }
   /// function TW3ControlBackground.GetOwner() : TW3MovableControl
   ///  [line: 1868, column: 31, file: SmartCL.Components]
   ,GetOwner$3:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3MovableControl);
   }
   /// function TW3ControlBackground.GetOwnerHandle() : TControlHandle
   ///  [line: 1873, column: 31, file: SmartCL.Components]
   ,GetOwnerHandle$1:function(Self) {
      var Result = undefined;
      if (TW3ControlBackground.GetOwner$3(Self)) {
         Result = TW3ControlBackground.GetOwner$3(Self).FHandle$3;
      }
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3ControlBackground.$Intf={
   IW3OwnedObjectAccess:[TW3ControlBackground.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ContentSelectionMode enumeration
///  [line: 148, column: 3, file: SmartCL.Components]
var TW3ContentSelectionMode = [ "tsmNone", "tsmAuto", "tsmText", "tsmAll", "tsmElement" ];
/// TW3Constraints = class (TW3OwnedObject)
///  [line: 790, column: 3, file: SmartCL.Components]
var TW3Constraints = {
   $ClassName:"TW3Constraints",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.OnEnabledChanged = null;
      $.FEnabled = false;
      $.FHandle$9 = undefined;
      $.FMaxHeight = $.FMaxWidth = $.FMinHeight = $.FMinWidth = 0;
   }
   /// function TW3Constraints.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 1753, column: 25, file: SmartCL.Components]
   ,AcceptOwner:function(Self, CandidateObject$4) {
      return (CandidateObject$4!==null)&&$Is(CandidateObject$4,TW3TagObj);
   }
   /// constructor TW3Constraints.Create(const AOwner: TW3MovableControl)
   ///  [line: 1694, column: 28, file: SmartCL.Components]
   ,Create$126:function(Self, AOwner$11) {
      TW3OwnedObject.Create$11(Self,AOwner$11);
      Self.FHandle$9 = AOwner$11.FHandle$3;
      return Self
   }
   /// function TW3Constraints.GetMaxHeight() : Integer
   ///  [line: 1782, column: 26, file: SmartCL.Components]
   ,GetMaxHeight:function(Self) {
      var Result = 0;
      if (Self.FEnabled) {
         Result = w3_GetStyleAsInt(Self.FHandle$9,"max-height");
      } else {
         Result = Self.FMaxHeight;
      }
      return Result
   }
   /// function TW3Constraints.GetMaxWidth() : Integer
   ///  [line: 1766, column: 26, file: SmartCL.Components]
   ,GetMaxWidth:function(Self) {
      var Result = 0;
      if (Self.FEnabled) {
         Result = w3_GetStyleAsInt(Self.FHandle$9,"max-width");
      } else {
         Result = Self.FMaxWidth;
      }
      return Result
   }
   /// function TW3Constraints.GetMinHeight() : Integer
   ///  [line: 1774, column: 25, file: SmartCL.Components]
   ,GetMinHeight:function(Self) {
      var Result = 0;
      if (Self.FEnabled) {
         Result = w3_GetStyleAsInt(Self.FHandle$9,"min-height");
      } else {
         Result = Self.FMinHeight;
      }
      return Result
   }
   /// function TW3Constraints.GetMinWidth() : Integer
   ///  [line: 1758, column: 25, file: SmartCL.Components]
   ,GetMinWidth:function(Self) {
      var Result = 0;
      if (Self.FEnabled) {
         Result = w3_GetStyleAsInt(Self.FHandle$9,"min-width");
      } else {
         Result = Self.FMinWidth;
      }
      return Result
   }
   /// procedure TW3Constraints.Reset()
   ///  [line: 1700, column: 26, file: SmartCL.Components]
   ,Reset$5:function(Self) {
      if (Self.FHandle$9) {
         Self.FHandle$9.style["min-width"] = "initial";
         Self.FHandle$9.style["max-width"] = "initial";
         Self.FHandle$9.style["min-height"] = "initial";
         Self.FHandle$9.style["max-height"] = "initial";
      }
   }
   /// procedure TW3Constraints.SetEnabled(const NewValue: Boolean)
   ///  [line: 1712, column: 26, file: SmartCL.Components]
   ,SetEnabled$2:function(Self, NewValue$1) {
      var temp = 0;
      if (NewValue$1!=Self.FEnabled) {
         if (Self.FEnabled) {
            temp = Self.FMinWidth;
            if (temp<1) {
               Self.FHandle$9.style["min-width"] = "initial";
            } else {
               Self.FHandle$9.style["min-width"] = TInteger.ToPxStr(temp);
            }
            temp = Self.FMaxWidth;
            if (temp<1) {
               Self.FHandle$9.style["max-width"] = "initial";
            } else {
               Self.FHandle$9.style["max-width"] = TInteger.ToPxStr(temp);
            }
            temp = Self.FMinHeight;
            if (temp<1) {
               Self.FHandle$9.style["min-height"] = "initial";
            } else {
               Self.FHandle$9.style["min-height"] = TInteger.ToPxStr(temp);
            }
            temp = Self.FMaxHeight;
            if (temp<1) {
               Self.FHandle$9.style["max-height"] = "initial";
            } else {
               Self.FHandle$9.style["max-height"] = TInteger.ToPxStr(temp);
            }
         } else {
            TW3Constraints.Reset$5(Self);
         }
         Self.FEnabled = NewValue$1;
         if (Self.OnEnabledChanged) {
            Self.OnEnabledChanged(Self);
         }
      }
   }
   /// procedure TW3Constraints.SetMaxHeight(const NewMaxHeight: Integer)
   ///  [line: 1798, column: 26, file: SmartCL.Components]
   ,SetMaxHeight:function(Self, NewMaxHeight) {
      if (Self.FEnabled) {
         Self.FHandle$9.style["max-height"] = TInteger.ToPxStr(NewMaxHeight);
      } else {
         Self.FMaxHeight = (NewMaxHeight<0)?0:NewMaxHeight;
      }
   }
   /// procedure TW3Constraints.SetMaxWidth(const NewMaxWidth: Integer)
   ///  [line: 1814, column: 26, file: SmartCL.Components]
   ,SetMaxWidth:function(Self, NewMaxWidth) {
      if (Self.FEnabled) {
         Self.FHandle$9.style["max-width"] = TInteger.ToPxStr(NewMaxWidth);
      } else {
         Self.FMaxWidth = (NewMaxWidth<0)?0:NewMaxWidth;
      }
   }
   /// procedure TW3Constraints.SetMinHeight(aValue: Integer)
   ///  [line: 1790, column: 26, file: SmartCL.Components]
   ,SetMinHeight:function(Self, aValue$44) {
      if (Self.FEnabled) {
         Self.FHandle$9.style["min-height"] = TInteger.ToPxStr(aValue$44);
      } else {
         Self.FMinHeight = (aValue$44<0)?0:aValue$44;
      }
   }
   /// procedure TW3Constraints.SetMinWidth(aValue: Integer)
   ///  [line: 1806, column: 26, file: SmartCL.Components]
   ,SetMinWidth:function(Self, aValue$45) {
      if (Self.FEnabled) {
         Self.FHandle$9.style["min-width"] = TInteger.ToPxStr(aValue$45);
      } else {
         Self.FMinWidth = (aValue$45<0)?0:aValue$45;
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11:TW3OwnedObject.Create$11
};
TW3Constraints.$Intf={
   IW3OwnedObjectAccess:[TW3Constraints.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BackgroundRepeat enumeration
///  [line: 749, column: 3, file: SmartCL.Components]
var TW3BackgroundRepeat = [ "brInitial", "brInherited", "brRepeat", "brRepeatX", "brRepeatY", "brNoRepeat" ];
/// TShiftStateEnum enumeration
///  [line: 138, column: 3, file: SmartCL.Components]
var TShiftStateEnum = [ "ssShift", "ssAlt", "ssCtrl", "ssMeta", "ssLeft", "ssRight", "ssMiddle" ];
/// TShiftState = class (TObject)
///  [line: 209, column: 3, file: SmartCL.Components]
var TShiftState = {
   $ClassName:"TShiftState",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEvent$1 = $.FMouseEvent = null;
      $.FMouseButtons = 0;
   }
   /// function TShiftState.CheckShiftStateEnum(value: TShiftStateEnum) : Boolean
   ///  [line: 1640, column: 22, file: SmartCL.Components]
   ,CheckShiftStateEnum:function(Self, value$19) {
      var Result = false;
      if (Self.FEvent$1===null) {
         Result = false;
      } else {
         switch (value$19) {
            case 0 :
               Result = Self.FEvent$1.shiftKey;
               break;
            case 1 :
               Result = Self.FEvent$1.altKey;
               break;
            case 2 :
               Result = Self.FEvent$1.ctrlKey;
               break;
            case 3 :
               Result = Self.FEvent$1.metaKey;
               break;
            case 4 :
               Result = ((Self.FMouseButtons&1)!=0);
               break;
            case 5 :
               Result = ((Self.FMouseButtons&4)!=0);
               break;
            case 6 :
               Result = ((Self.FMouseButtons&2)!=0);
               break;
         }
      }
      return Result
   }
   /// function TShiftState.Current() : TShiftState
   ///  [line: 1668, column: 28, file: SmartCL.Components]
   ,Current:function() {
      var Result = null;
      if (vCurrent===null) {
         vCurrent = TObject.Create($New(TShiftState));
      }
      Result = vCurrent;
      return Result
   }
   /// procedure TShiftState.SetMouseEvent(evt: JMouseEvent)
   ///  [line: 1662, column: 23, file: SmartCL.Components]
   ,SetMouseEvent:function(Self, evt) {
      Self.FEvent$1 = evt;
      Self.FMouseEvent = evt;
   }
   ,Destroy:TObject.Destroy
};
/// TMovementDirection enumeration
///  [line: 256, column: 3, file: SmartCL.Components]
var TMovementDirection = [ "mdVertical", "mdHorizontal", "mdAll", "mdNone" ];
/// TMouseButton enumeration
///  [line: 132, column: 3, file: SmartCL.Components]
var TMouseButton = [ "mbLeft", "mbMiddle", "mbRight" ];
/// TCustomAppContainer = class (TW3TagContainer)
///  [line: 642, column: 3, file: SmartCL.Components]
var TCustomAppContainer = {
   $ClassName:"TCustomAppContainer",$Parent:TW3TagContainer
   ,$Init:function ($) {
      TW3TagContainer.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3TagContainer.FinalizeObject
   ,InitializeObject:TW3CustomComponent.InitializeObject
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3TagObj.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3TagContainer.Showing
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,UnHookEvents:TW3TagObj.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
};
TCustomAppContainer.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TDocumentBody = class (TCustomAppContainer)
///  [line: 650, column: 3, file: SmartCL.Components]
var TDocumentBody = {
   $ClassName:"TDocumentBody",$Parent:TCustomAppContainer
   ,$Init:function ($) {
      TCustomAppContainer.$Init($);
   }
   /// function TDocumentBody.makeElementTagId() : String
   ///  [line: 3078, column: 24, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      return "";
   }
   /// function TDocumentBody.makeElementTagObj() : THandle
   ///  [line: 3095, column: 24, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      return document.body;
   }
   /// procedure TDocumentBody.StyleTagObject()
   ///  [line: 3073, column: 25, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      /* null */
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3TagContainer.FinalizeObject
   ,InitializeObject:TW3CustomComponent.InitializeObject
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3TagObj.HookEvents
   ,MakeElementTagId$:function($){return $.ClassType.MakeElementTagId($)}
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3TagContainer.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3TagObj.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
};
TDocumentBody.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// EW3TagObj = class (EW3Exception)
///  [line: 111, column: 3, file: SmartCL.Components]
var EW3TagObj = {
   $ClassName:"EW3TagObj",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3TagContainer = class (EW3Exception)
///  [line: 112, column: 3, file: SmartCL.Components]
var EW3TagContainer = {
   $ClassName:"EW3TagContainer",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3CustomControl = class (EW3Exception)
///  [line: 114, column: 3, file: SmartCL.Components]
var EW3CustomControl = {
   $ClassName:"EW3CustomControl",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3ControlBackgroundSize = class (EW3Exception)
///  [line: 698, column: 3, file: SmartCL.Components]
var EW3ControlBackgroundSize = {
   $ClassName:"EW3ControlBackgroundSize",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3FontStyleTypes enumeration
///  [line: 12, column: 3, file: System.Fonts]
var TW3FontStyleTypes = { 22:"fsBold", 23:"fsItalic", 24:"fsUnderline", 25:"fsStrikeThrough" };
/// EW3FontError = class (EW3Exception)
///  [line: 10, column: 3, file: System.Fonts]
var EW3FontError = {
   $ClassName:"EW3FontError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3CustomDictionary = class (TObject)
///  [line: 23, column: 3, file: System.Dictionaries]
var TW3CustomDictionary = {
   $ClassName:"TW3CustomDictionary",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FLUT$1 = undefined;
   }
   /// procedure TW3CustomDictionary.Clear()
   ///  [line: 102, column: 31, file: System.Dictionaries]
   ,Clear$4:function(Self) {
      Self.FLUT$1 = TVariant.CreateObject();
   }
   /// function TW3CustomDictionary.Contains(const ItemKey: String) : Boolean
   ///  [line: 151, column: 30, file: System.Dictionaries]
   ,Contains:function(Self, ItemKey) {
      var Result = false;
      if (ItemKey.length>0) {
         Result = (Self.FLUT$1.hasOwnProperty(ItemKey)?true:false);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.Contains", TObject.ClassName(Self.ClassType), $R[42]]);
      }
      return Result
   }
   /// constructor TW3CustomDictionary.Create()
   ///  [line: 89, column: 33, file: System.Dictionaries]
   ,Create$127:function(Self) {
      TObject.Create(Self);
      Self.FLUT$1 = TVariant.CreateObject();
      return Self
   }
   /// procedure TW3CustomDictionary.Delete(const ItemKey: String)
   ///  [line: 226, column: 31, file: System.Dictionaries]
   ,Delete$1:function(Self, ItemKey$1) {
      if (ItemKey$1.length>0) {
         try {
            delete (Self.FLUT$1[ItemKey$1]);
         } catch ($e) {
            var e$19 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.Delete", TObject.ClassName(Self.ClassType), e$19.FMessage]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.Delete", TObject.ClassName(Self.ClassType), $R[42]]);
      }
   }
   /// destructor TW3CustomDictionary.Destroy()
   ///  [line: 95, column: 32, file: System.Dictionaries]
   ,Destroy:function(Self) {
      TW3CustomDictionary.Clear$4(Self);
      Self.FLUT$1 = undefined;
      TObject.Destroy(Self);
   }
   /// function TW3CustomDictionary.GetItem(const ItemKey: String) : Variant
   ///  [line: 188, column: 30, file: System.Dictionaries]
   ,GetItem$12:function(Self, ItemKey$2) {
      var Result = undefined;
      if (ItemKey$2.length>0) {
         try {
            Result = Self.FLUT$1[ItemKey$2];
         } catch ($e) {
            var e$20 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.GetItem", TObject.ClassName(Self.ClassType), e$20.FMessage]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.GetItem", TObject.ClassName(Self.ClassType), $R[42]]);
      }
      return Result
   }
   /// procedure TW3CustomDictionary.SetItem(const ItemKey: String; const KeyValue: Variant)
   ///  [line: 207, column: 31, file: System.Dictionaries]
   ,SetItem$3:function(Self, ItemKey$3, KeyValue) {
      if (ItemKey$3.length>0) {
         try {
            Self.FLUT$1[ItemKey$3] = KeyValue;
         } catch ($e) {
            var e$21 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.SetItem", TObject.ClassName(Self.ClassType), e$21.FMessage]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.SetItem", TObject.ClassName(Self.ClassType), $R[42]]);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TW3ObjDictionary = class (TW3CustomDictionary)
///  [line: 43, column: 3, file: System.Dictionaries]
var TW3ObjDictionary = {
   $ClassName:"TW3ObjDictionary",$Parent:TW3CustomDictionary
   ,$Init:function ($) {
      TW3CustomDictionary.$Init($);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 46, column: 13, file: System.Dictionaries]
   ,a$79:function(Self, ItemKey$4) {
      return TVariant.AsObject(TW3CustomDictionary.GetItem$12(Self,ItemKey$4));
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 47, column: 13, file: System.Dictionaries]
   ,a$78:function(Self, ItemKey$5, Value$22) {
      TW3CustomDictionary.SetItem$3(Self,ItemKey$5,Value$22);
   }
   ,Destroy:TW3CustomDictionary.Destroy
};
/// TW3IntDictionary = class (TW3CustomDictionary)
///  [line: 57, column: 3, file: System.Dictionaries]
var TW3IntDictionary = {
   $ClassName:"TW3IntDictionary",$Parent:TW3CustomDictionary
   ,$Init:function ($) {
      TW3CustomDictionary.$Init($);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 60, column: 12, file: System.Dictionaries]
   ,a$81:function(Self, ItemKey$6) {
      return TVariant.AsInteger(TW3CustomDictionary.GetItem$12(Self,ItemKey$6));
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 61, column: 13, file: System.Dictionaries]
   ,a$80:function(Self, ItemKey$7, Value$23) {
      TW3CustomDictionary.SetItem$3(Self,ItemKey$7,Value$23);
   }
   ,Destroy:TW3CustomDictionary.Destroy
};
function W3FontDetector() {
   var Result = null;
   if (_FontDetect===null) {
      _FontDetect = TW3FontDetector.Create$121($New(TW3FontDetector));
   }
   Result = _FontDetect;
   return Result
};
/// TW3TextMetric = record
///  [line: 27, column: 3, file: SmartCL.Fonts.Detector]
function Copy$TW3TextMetric(s,d) {
   d.tmWidth=s.tmWidth;
   d.tmHeight=s.tmHeight;
   return d;
}
function Clone$TW3TextMetric($) {
   return {
      tmWidth:$.tmWidth,
      tmHeight:$.tmHeight
   }
}
/// function TW3TextMetric.Empty(var Self: TW3TextMetric) : Boolean
///  [line: 100, column: 24, file: SmartCL.Fonts.Detector]
function TW3TextMetric$Empty$3(Self$27) {
   return Self$27.tmWidth<1&&Self$27.tmHeight<1;
}
/// TW3FontInfo = record
///  [line: 40, column: 3, file: SmartCL.Fonts.Detector]
function Copy$TW3FontInfo(s,d) {
   d.fiName=s.fiName;
   d.fiSize=s.fiSize;
   return d;
}
function Clone$TW3FontInfo($) {
   return {
      fiName:$.fiName,
      fiSize:$.fiSize
   }
}
/// TW3FontDetector = class (TObject)
///  [line: 53, column: 3, file: SmartCL.Fonts.Detector]
var TW3FontDetector = {
   $ClassName:"TW3FontDetector",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBaseFonts = [];
      $.FdefaultHeight = $.FdefaultWidth = undefined;
      $.Fh = undefined;
      $.Fs = undefined;
      $.FtestSize = "72px";
      $.FTestString = "mmmmmmmmmmllij";
   }
   /// constructor TW3FontDetector.Create()
   ///  [line: 128, column: 29, file: SmartCL.Fonts.Detector]
   ,Create$121:function(Self) {
      var x$53 = 0;
      TObject.Create(Self);
      Self.FBaseFonts.push("arial");
      Self.FBaseFonts.push("verdana");
      Self.FBaseFonts.push("helvetica");
      Self.FBaseFonts.push("times new roman");
      Self.FBaseFonts.push("courier new");
      Self.FBaseFonts.push("ubuntu");
      Self.FBaseFonts.push("monospace");
      Self.FBaseFonts.push("sans-serif");
      Self.FBaseFonts.push("serif");
      Self.Fh = document.body;
      Self.Fs = document.createElement("div");
      Self.Fs.style.fontSize = Self.FtestSize;
      Self.Fs.innerHTML = Self.FTestString;
      Self.FdefaultWidth = TVariant.CreateObject();
      Self.FdefaultHeight = TVariant.CreateObject();
      if (Self.FBaseFonts.length>0) {
         var $temp34;
         for(x$53=0,$temp34=Self.FBaseFonts.length;x$53<$temp34;x$53++) {
            Self.Fs.style.fontFamily = Self.FBaseFonts[x$53];
            Self.Fh.appendChild(Self.Fs);
            Self.FdefaultWidth[Self.FBaseFonts[x$53]] = Self.Fs.offsetWidth;
            Self.FdefaultHeight[Self.FBaseFonts[x$53]] = Self.Fs.offsetHeight;
            Self.Fh.removeChild(Self.Fs);
         }
      }
      return Self
   }
   /// function TW3FontDetector.Detect(const FontName: String) : Boolean
   ///  [line: 207, column: 26, file: SmartCL.Fonts.Detector]
   ,Detect:function(Self, FontName) {
      var Result = false;
      var LFontName = "",
         x$54 = 0;
      LFontName = Trim$_String_(FontName);
      if (LFontName.length>0) {
         Self.Fh.appendChild(Self.Fs);
         var $temp35;
         for(x$54=0,$temp35=Self.FBaseFonts.length;x$54<$temp35;x$54++) {
            Self.Fs.style.fontFamily = (LFontName+","+Self.FBaseFonts[x$54]);
            Result = Self.Fs.offsetWidth!=Self.FdefaultWidth[Self.FBaseFonts[x$54]]&&Self.Fs.offsetHeight!=Self.FdefaultHeight[Self.FBaseFonts[x$54]];
            if (Result) {
               break;
            }
         }
         Self.Fh.removeChild(Self.Fs);
         if (!Result) {
            Result = Self.FBaseFonts.indexOf(FontName)>=0;
         }
      }
      return Result
   }
   /// function TW3FontDetector.GetFontInfo(const Handle: TControlHandle) : TW3FontInfo
   ///  [line: 166, column: 26, file: SmartCL.Fonts.Detector]
   ,GetFontInfo$2:function(Self, Handle$24) {
      var Result = {fiName:"",fiSize:0};
      var LFound$1 = false,
         LName$1 = "",
         LSize$2 = 0,
         LData$4 = [],
         x$55 = 0;
      Result.fiSize = -1;
      if (Handle$24) {
         LFound$1 = false;
         LName$1 = w3_GetStyleAsStr(Handle$24,"font-family");
         LSize$2 = w3_GetStyleAsInt(Handle$24,"font-size");
         if (LName$1.length>0) {
            LData$4 = (LName$1).split(",");
            if (LData$4.length>0) {
               var $temp36;
               for(x$55=0,$temp36=LData$4.length;x$55<$temp36;x$55++) {
                  LData$4[x$55]=(Trim$_String_(LData$4[x$55])).toLocaleLowerCase();
                  if (TW3FontDetector.Detect(Self,LData$4[x$55])) {
                     Result.fiName = LData$4[x$55];
                     Result.fiSize = LSize$2;
                     LFound$1 = true;
                     break;
                  }
               }
            }
            if (!LFound$1) {
               Result.fiName = "verdana";
               if (Result.fiSize<0) {
                  Result.fiSize = 14;
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(const FontInfo: TW3FontInfo; const FixedWidth: Integer; const Text: String) : TW3TextMetric
   ///  [line: 308, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$5:function(Self, FontInfo, FixedWidth, Text$8) {
      return TW3FontDetector.MeasureText$4(Self,FontInfo.fiName,FontInfo.fiSize,FixedWidth,Text$8);
   }
   /// function TW3FontDetector.MeasureText(const FontName: String; const FontSize: Integer; const FixedWidth: Integer; const Text: String) : TW3TextMetric
   ///  [line: 276, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$4:function(Self, FontName$1, FontSize, FixedWidth$1, Text$9) {
      var Result = {tmWidth:0,tmHeight:0};
      var LText$1 = "",
         Element$5;
      if (TW3FontDetector.Detect(Self,FontName$1)) {
         LText$1 = Trim$_String_(Text$9);
         if (LText$1.length>0) {
            Element$5 = document.createElement("div");
            Element$5.style["font-family"] = FontName$1;
            Element$5.style["font-size"] = TInteger.ToPxStr(FontSize);
            Element$5.style["white-space"] = "nowrap !important";
            Element$5.style["display"] = "inline-block";
            Element$5.style["margin"] = "0px !important";
            Element$5.style["padding"] = "0px !important";
            Element$5.style["border-style"] = "none !important";
            Element$5.style["border-width"] = "0px !important";
            Element$5.style["max-width"] = TInteger.ToPxStr(FixedWidth$1);
            Element$5.style["width"] = TInteger.ToPxStr(FixedWidth$1);
            Element$5.innerHTML = Text$9;
            Self.Fh.appendChild(Element$5);
            Result.tmWidth = parseInt(Element$5.width,10);
            Result.tmHeight = parseInt(Element$5.height,10);
            Self.Fh.removeChild(Element$5);
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(const FontName: String; const FontSize: Integer; const Text: String) : TW3TextMetric
   ///  [line: 236, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$3:function(Self, FontName$2, FontSize$1, Text$10) {
      var Result = {tmWidth:0,tmHeight:0};
      var Element$6;
      if (TW3FontDetector.Detect(Self,FontName$2)) {
         if (Text$10.length>0) {
            Element$6 = document.createElement("span");
            Element$6.style["font-family"] = FontName$2;
            Element$6.style["font-size"] = TInteger.ToPxStr(FontSize$1);
            Element$6.style["white-space"] = "nowrap !important";
            Element$6.style["display"] = "block";
            Element$6.style["overflow"] = "scroll !important";
            Element$6.style["margin"] = "0px !important";
            Element$6.style["padding"] = "0px !important";
            Element$6.style["border-style"] = "none !important";
            Element$6.style["border-width"] = "0px !important";
            Element$6.style.width = "1px !important";
            Element$6.style.height = "1px !important";
            Element$6.innerHTML = StrReplace(Text$10," ","_");
            Self.Fh.appendChild(Element$6);
            Result.tmWidth = parseInt(Element$6.scrollWidth,10);
            Result.tmHeight = parseInt(Element$6.scrollHeight,10);
            Self.Fh.removeChild(Element$6);
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(const FontInfo: TW3FontInfo; const Text: String) : TW3TextMetric
   ///  [line: 314, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$2:function(Self, FontInfo$1, Text$11) {
      return TW3FontDetector.MeasureText$3(Self,FontInfo$1.fiName,FontInfo$1.fiSize,Text$11);
   }
   ,Destroy:TObject.Destroy
};
/// TW3TextMetrics = record
///  [line: 147, column: 3, file: SmartCL.Graphics]
function Copy$TW3TextMetrics(s,d) {
   return d;
}
function Clone$TW3TextMetrics($) {
   return {

   }
}
/// TW3ImageData = class (TObject)
///  [line: 208, column: 3, file: SmartCL.Graphics]
var TW3ImageData = {
   $ClassName:"TW3ImageData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$4 = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 238, column: 35, file: SmartCL.Graphics]
   ,a$59:function(Self) {
      return Self.FHandle$4.height;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 237, column: 34, file: SmartCL.Graphics]
   ,a$58:function(Self) {
      return Self.FHandle$4.width;
   }
   /// procedure TW3ImageData.FromImageData(const ImageData: JImageData)
   ///  [line: 751, column: 24, file: SmartCL.Graphics]
   ,FromImageData:function(Self, ImageData) {
      if (ImageData!==null) {
         Self.FHandle$4 = ImageData;
      } else {
         throw EW3Exception.CreateFmt($New(EW3ImageData),$R[41],["TW3ImageData.FromImageData", "reference was nil"]);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomGraphicContext = class (TObject)
///  [line: 59, column: 3, file: SmartCL.Graphics]
var TW3CustomGraphicContext = {
   $ClassName:"TW3CustomGraphicContext",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3CustomGraphicContext.Allocate(const aWidth: Integer; const aHeight: Integer)
   ///  [line: 1069, column: 35, file: SmartCL.Graphics]
   ,Allocate$1:function(Self, aWidth$1, aHeight$1) {
      if (TW3CustomGraphicContext.GetOwnsReference$(Self)) {
         if (THandleHelper$Valid$4(TW3CustomGraphicContext.GetDC$(Self))) {
            TW3CustomGraphicContext.Release$1(Self);
         }
         TW3CustomGraphicContext.SetSize$3$(Self,aWidth$1,aHeight$1);
      } else {
         throw Exception.Create($New(Exception),"Cannot modify current graphics context");
      }
   }
   /// procedure TW3CustomGraphicContext.Release()
   ///  [line: 1081, column: 35, file: SmartCL.Graphics]
   ,Release$1:function(Self) {
      if (TW3CustomGraphicContext.GetOwnsReference$(Self)) {
         if (THandleHelper$Valid$4(TW3CustomGraphicContext.GetDC$(Self))) {
            TW3CustomGraphicContext.ReleaseDC$(Self);
         }
      } else {
         throw Exception.Create($New(Exception),"Cannot modify current graphics context");
      }
   }
   ,Destroy:TObject.Destroy
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$1$:function($){return $.ClassType.GetHandle$1($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$3$:function($){return $.ClassType.SetSize$3.apply($.ClassType, arguments)}
};
/// TW3GraphicContext = class (TW3CustomGraphicContext)
///  [line: 126, column: 3, file: SmartCL.Graphics]
var TW3GraphicContext = {
   $ClassName:"TW3GraphicContext",$Parent:TW3CustomGraphicContext
   ,$Init:function ($) {
      TW3CustomGraphicContext.$Init($);
      $.FObjId = "";
      $.FObjRef = undefined;
      $.FOwner$2 = undefined;
   }
   /// constructor TW3GraphicContext.Create(const AOwner: THandle)
   ///  [line: 1109, column: 31, file: SmartCL.Graphics]
   ,Create$99:function(Self, AOwner$12) {
      TObject.Create(Self);
      Self.FObjRef = w3_CreateHtmlElement("canvas");
      Self.FObjId = TW3Identifiers.GenerateUniqueObjectId(TW3Identifiers);
      Self.FObjRef.id = Self.FObjId;
      Self.FOwner$2 = AOwner$12;
      if (Self.FOwner$2) {
         w3_SetElementParentByRef(Self.FObjRef,Self.FOwner$2);
      }
      return Self
   }
   /// destructor TW3GraphicContext.Destroy()
   ///  [line: 1128, column: 30, file: SmartCL.Graphics]
   ,Destroy:function(Self) {
      if (THandleHelper$Valid$4(Self.FOwner$2)) {
         w3_RemoveElementByRef(Self.FObjRef,Self.FOwner$2);
      }
      Self.FOwner$2 = null;
      Self.FObjRef = null;
      TObject.Destroy(Self);
   }
   /// function TW3GraphicContext.GetDC() : THandle
   ///  [line: 1150, column: 28, file: SmartCL.Graphics]
   ,GetDC:function(Self) {
      var Result = undefined;
      if (Self.FObjRef) {
         Result = Self.FObjRef.getContext("2d");
      } else {
         Result = null;
      }
      return Result
   }
   /// function TW3GraphicContext.GetHandle() : THandle
   ///  [line: 1140, column: 28, file: SmartCL.Graphics]
   ,GetHandle$1:function(Self) {
      return Self.FObjRef;
   }
   /// function TW3GraphicContext.GetHeight() : Integer
   ///  [line: 1173, column: 28, file: SmartCL.Graphics]
   ,GetHeight$1:function(Self) {
      var Result = 0;
      if (Self.FObjRef) {
         Result = parseInt(Self.FObjRef.height,10);
      }
      return Result
   }
   /// function TW3GraphicContext.GetOwnsReference() : Boolean
   ///  [line: 1145, column: 28, file: SmartCL.Graphics]
   ,GetOwnsReference:function(Self) {
      return true;
   }
   /// function TW3GraphicContext.GetWidth() : Integer
   ///  [line: 1167, column: 28, file: SmartCL.Graphics]
   ,GetWidth$1:function(Self) {
      var Result = 0;
      if (Self.FObjRef) {
         Result = parseInt(Self.FObjRef.width,10);
      }
      return Result
   }
   /// procedure TW3GraphicContext.ReleaseDC()
   ///  [line: 1179, column: 29, file: SmartCL.Graphics]
   ,ReleaseDC:function(Self) {
      if (Self.FObjRef) {
         Self.FObjRef.width = 0;
         Self.FObjRef.height = 0;
      }
   }
   /// procedure TW3GraphicContext.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 1158, column: 29, file: SmartCL.Graphics]
   ,SetSize$3:function(Self, NewWidth$5, NewHeight$5) {
      if (Self.FObjRef) {
         Self.FObjRef.width = NewWidth$5;
         Self.FObjRef.height = NewHeight$5;
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$1$:function($){return $.ClassType.GetHandle$1($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$3$:function($){return $.ClassType.SetSize$3.apply($.ClassType, arguments)}
};
/// TW3ControlGraphicContext = class (TW3CustomGraphicContext)
///  [line: 85, column: 3, file: SmartCL.Graphics]
var TW3ControlGraphicContext = {
   $ClassName:"TW3ControlGraphicContext",$Parent:TW3CustomGraphicContext
   ,$Init:function ($) {
      TW3CustomGraphicContext.$Init($);
      $.FCtrlTag = undefined;
   }
   /// constructor TW3ControlGraphicContext.Create(const aControlHandle: THandle)
   ///  [line: 1021, column: 38, file: SmartCL.Graphics]
   ,Create$100:function(Self, aControlHandle) {
      TObject.Create(Self);
      if (aControlHandle) {
         Self.FCtrlTag = aControlHandle;
      } else {
         throw Exception.Create($New(Exception),"Control handle is invalid error");
      }
      return Self
   }
   /// function TW3ControlGraphicContext.GetDC() : THandle
   ///  [line: 1030, column: 35, file: SmartCL.Graphics]
   ,GetDC:function(Self) {
      return Self.FCtrlTag.getContext("2d");
   }
   /// function TW3ControlGraphicContext.GetHandle() : THandle
   ///  [line: 1035, column: 35, file: SmartCL.Graphics]
   ,GetHandle$1:function(Self) {
      return Self.FCtrlTag;
   }
   /// function TW3ControlGraphicContext.GetHeight() : Integer
   ///  [line: 1045, column: 35, file: SmartCL.Graphics]
   ,GetHeight$1:function(Self) {
      return w3_getPropertyAsInt(Self.FCtrlTag,"height");
   }
   /// function TW3ControlGraphicContext.GetOwnsReference() : Boolean
   ///  [line: 1050, column: 35, file: SmartCL.Graphics]
   ,GetOwnsReference:function(Self) {
      return false;
   }
   /// function TW3ControlGraphicContext.GetWidth() : Integer
   ///  [line: 1040, column: 35, file: SmartCL.Graphics]
   ,GetWidth$1:function(Self) {
      return w3_getPropertyAsInt(Self.FCtrlTag,"width");
   }
   /// procedure TW3ControlGraphicContext.ReleaseDC()
   ///  [line: 1060, column: 36, file: SmartCL.Graphics]
   ,ReleaseDC:function(Self) {
      /* null */
   }
   /// procedure TW3ControlGraphicContext.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 1055, column: 36, file: SmartCL.Graphics]
   ,SetSize$3:function(Self, NewWidth$6, NewHeight$6) {
      /* null */
   }
   ,Destroy:TObject.Destroy
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$1$:function($){return $.ClassType.GetHandle$1($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$3$:function($){return $.ClassType.SetSize$3.apply($.ClassType, arguments)}
};
/// TW3CanvasPattern = class (TObject)
///  [line: 193, column: 3, file: SmartCL.Graphics]
var TW3CanvasPattern = {
   $ClassName:"TW3CanvasPattern",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TW3CanvasGradient = class (TObject)
///  [line: 179, column: 3, file: SmartCL.Graphics]
var TW3CanvasGradient = {
   $ClassName:"TW3CanvasGradient",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$6 = undefined;
   }
   /// constructor TW3CanvasGradient.Create(const aHandle: THandle)
   ///  [line: 896, column: 31, file: SmartCL.Graphics]
   ,Create$101:function(Self, aHandle) {
      TObject.Create(Self);
      Self.FHandle$6 = aHandle;
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3CanvasFont = class (TW3CustomFont)
///  [line: 151, column: 3, file: SmartCL.Graphics]
var TW3CanvasFont = {
   $ClassName:"TW3CanvasFont",$Parent:TW3CustomFont
   ,$Init:function ($) {
      TW3CustomFont.$Init($);
      $.FColor$1 = 0;
      $.FName = $.FWeight = "";
      $.FParent = null;
      $.FSize$1 = 0;
      $.FStyle = [0];
   }
   /// constructor TW3CanvasFont.Create(const Canvas: TW3Canvas)
   ///  [line: 521, column: 27, file: SmartCL.Graphics]
   ,Create$102:function(Self, Canvas$1) {
      TObject.Create(Self);
      Self.FParent = Canvas$1;
      if (Self.FParent) {
         TW3CanvasFont.ReadFontInfo(Self);
      } else {
         throw Exception.Create($New(EW3Exception),"Canvas was NIL or unassigned error");
      }
      return Self
   }
   /// function TW3CanvasFont.GetColor() : TColor
   ///  [line: 655, column: 24, file: SmartCL.Graphics]
   ,GetColor$1:function(Self) {
      return Self.FColor$1;
   }
   /// function TW3CanvasFont.GetHandle() : THandle
   ///  [line: 660, column: 24, file: SmartCL.Graphics]
   ,GetHandle$4:function(Self) {
      return null;
   }
   /// function TW3CanvasFont.GetName() : String
   ///  [line: 666, column: 24, file: SmartCL.Graphics]
   ,GetName:function(Self) {
      return Self.FName;
   }
   /// function TW3CanvasFont.GetSize() : Integer
   ///  [line: 671, column: 24, file: SmartCL.Graphics]
   ,GetSize$4:function(Self) {
      return Self.FSize$1;
   }
   /// function TW3CanvasFont.GetStyle() : TW3FontStyle
   ///  [line: 531, column: 24, file: SmartCL.Graphics]
   ,GetStyle:function(Self) {
      return Self.FStyle.slice(0);
   }
   /// function TW3CanvasFont.GetWeight() : String
   ///  [line: 676, column: 24, file: SmartCL.Graphics]
   ,GetWeight:function(Self) {
      return Self.FWeight;
   }
   /// procedure TW3CanvasFont.ReadFontInfo()
   ///  [line: 609, column: 25, file: SmartCL.Graphics]
   ,ReadFontInfo:function(Self) {
      /* null */
   }
   /// procedure TW3CanvasFont.SetColor(aNewColor: TColor)
   ///  [line: 681, column: 25, file: SmartCL.Graphics]
   ,SetColor$2:function(Self, aNewColor$1) {
      Self.FColor$1 = aNewColor$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.SetName(aNewName: String)
   ///  [line: 687, column: 25, file: SmartCL.Graphics]
   ,SetName$1:function(Self, aNewName$1) {
      Self.FName = aNewName$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.SetSize(aNewSize: Integer)
   ///  [line: 693, column: 25, file: SmartCL.Graphics]
   ,SetSize$6:function(Self, aNewSize$1) {
      Self.FSize$1 = aNewSize$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.SetStyle(const NewStyle: TW3FontStyle)
   ///  [line: 536, column: 25, file: SmartCL.Graphics]
   ,SetStyle:function(Self, NewStyle$1) {
      var LChange$1 = 0;
      LChange$1 = 0;
      if ($SetIn(NewStyle$1,22,0,26)) {
         if (!$SetIn(Self.FStyle,22,0,26)) {
            $SetInc(Self.FStyle,22,0,26);
            ++LChange$1;
         }
      } else if ($SetIn(Self.FStyle,22,0,26)) {
         $SetExc(Self.FStyle,22,0,26);
         ++LChange$1;
      }
      if ($SetIn(NewStyle$1,24,0,26)) {
         if (!$SetIn(Self.FStyle,24,0,26)) {
            $SetInc(Self.FStyle,24,0,26);
            ++LChange$1;
         }
      } else if ($SetIn(Self.FStyle,24,0,26)) {
         $SetExc(Self.FStyle,24,0,26);
         ++LChange$1;
      }
      if ($SetIn(NewStyle$1,23,0,26)) {
         if (!$SetIn(Self.FStyle,23,0,26)) {
            $SetInc(Self.FStyle,23,0,26);
            ++LChange$1;
         }
      } else if ($SetIn(Self.FStyle,23,0,26)) {
         $SetExc(Self.FStyle,23,0,26);
         ++LChange$1;
      }
      if ($SetIn(NewStyle$1,25,0,26)) {
         if (!$SetIn(Self.FStyle,25,0,26)) {
            $SetInc(Self.FStyle,25,0,26);
            ++LChange$1;
         }
      } else if ($SetIn(Self.FStyle,25,0,26)) {
         $SetExc(Self.FStyle,25,0,26);
         ++LChange$1;
      }
      if (LChange$1>0) {
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      }
   }
   /// procedure TW3CanvasFont.SetWeight(aNewWeight: String)
   ///  [line: 699, column: 25, file: SmartCL.Graphics]
   ,SetWeight:function(Self, aNewWeight$1) {
      Self.FWeight = aNewWeight$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.WriteFontInfo()
   ///  [line: 613, column: 25, file: SmartCL.Graphics]
   ,WriteFontInfo:function(Self) {
      var LItems = [],
         a$339 = 0;
      var LItem$6 = "";
      LItems = TString.Explode(TString,TW3Canvas.GetFontStyle(Self.FParent)," ");
      var $temp37;
      for(a$339=0,$temp37=LItems.length;a$339<$temp37;a$339++) {
         LItem$6 = LItems[a$339];
         if (function(v$){return ((v$=="bold")||(v$=="normal")||(v$=="bolder")||(v$=="lighter"))}((LItem$6).toLocaleLowerCase())) {
            Self.FWeight = (LItem$6).toLocaleLowerCase();
         } else if (function(v$){return ((v$=="italic")||(v$=="oblique"))}((LItem$6).toLocaleLowerCase())) {
            /* null */
         } else if (((LItem$6).toLocaleLowerCase().charAt(0)=="#")||((LItem$6).toLocaleLowerCase().substr(0,3)=="rgb")) {
            Self.FColor$1 = StrToColor(LItem$6);
         } else if (StrEndsWith((LItem$6).toLocaleLowerCase(),"px")) {
            Self.FSize$1 = TInteger.FromPxStr(LItem$6);
         } else {
            if (TW3FontDetector.Detect(W3FontDetector(),LItem$6)) {
               Self.FName = LItem$6;
            }
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,GetColor$1$:function($){return $.ClassType.GetColor$1($)}
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
   ,GetName$:function($){return $.ClassType.GetName($)}
   ,GetSize$4$:function($){return $.ClassType.GetSize$4($)}
   ,GetStyle$:function($){return $.ClassType.GetStyle($)}
   ,GetWeight$:function($){return $.ClassType.GetWeight($)}
   ,SetColor$2$:function($){return $.ClassType.SetColor$2.apply($.ClassType, arguments)}
   ,SetName$1$:function($){return $.ClassType.SetName$1.apply($.ClassType, arguments)}
   ,SetSize$6$:function($){return $.ClassType.SetSize$6.apply($.ClassType, arguments)}
   ,SetStyle$:function($){return $.ClassType.SetStyle.apply($.ClassType, arguments)}
   ,SetWeight$:function($){return $.ClassType.SetWeight.apply($.ClassType, arguments)}
};
/// TW3Canvas = class (TObject)
///  [line: 250, column: 3, file: SmartCL.Graphics]
var TW3Canvas = {
   $ClassName:"TW3Canvas",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FContext = $.FDC = null;
   }
   /// constructor TW3Canvas.Create(Context: TW3CustomGraphicContext)
   ///  [line: 1192, column: 23, file: SmartCL.Graphics]
   ,Create$103:function(Self, Context$2) {
      TObject.Create(Self);
      Self.FContext = Context$2;
      if (Self.FContext!==null) {
         Self.FDC = TW3CustomGraphicContext.GetDC$(Self.FContext);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Canvas),"%s failed to create canvas, invalid graphics context error",["TW3Canvas.Create"]);
      }
      return Self
   }
   /// procedure TW3Canvas.DrawImageF(imageHandle: THandle; x: Float; y: Float)
   ///  [line: 1495, column: 21, file: SmartCL.Graphics]
   ,DrawImageF:function(Self, imageHandle, x$56, y$32) {
      Self.FDC.drawImage(imageHandle,x$56,y$32);
   }
   /// function TW3Canvas.GetFontStyle() : String
   ///  [line: 1776, column: 20, file: SmartCL.Graphics]
   ,GetFontStyle:function(Self) {
      return Self.FDC.font;
   }
   /// procedure TW3Canvas.PutImageData(const ImageData: TW3ImageData; const x: Float; const y: Float; const dx: Float; const dy: Float; const dw: Float; const dh: Float)
   ///  [line: 1669, column: 21, file: SmartCL.Graphics]
   ,PutImageData$1:function(Self, ImageData$1, x$57, y$33, dx$11, dy$12, dw, dh) {
      if (ImageData$1!==null) {
         Self.FDC.putImageData(ImageData$1.FHandle$4,x$57,y$33,dx$11,dy$12,dw,dh);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Canvas),"%s failed, imagedata was nil error",["TW3Canvas.PutImageData"]);
      }
   }
   /// procedure TW3Canvas.PutImageData(const ImageData: TW3ImageData; const x: Float; const y: Float)
   ///  [line: 1661, column: 21, file: SmartCL.Graphics]
   ,PutImageData:function(Self, ImageData$2, x$58, y$34) {
      if (ImageData$2!==null) {
         Self.FDC.putImageData(ImageData$2.FHandle$4,x$58,y$34);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Canvas),"%s failed, imagedata was nil error",["TW3Canvas.PutImageData"]);
      }
   }
   /// procedure TW3Canvas.SetFontStyle(const NewFontStyle: String)
   ///  [line: 1781, column: 21, file: SmartCL.Graphics]
   ,SetFontStyle:function(Self, NewFontStyle) {
      Self.FDC.font = NewFontStyle;
   }
   /// function TW3Canvas.ToDataURL(aMimeType: String) : String
   ///  [line: 1627, column: 20, file: SmartCL.Graphics]
   ,ToDataURL:function(Self, aMimeType) {
      return Self.FDC.canvas.toDataURL(aMimeType);
   }
   /// function TW3Canvas.ToImageData() : TW3ImageData
   ///  [line: 1632, column: 20, file: SmartCL.Graphics]
   ,ToImageData:function(Self) {
      var Result = null;
      var wd$3 = 0,
         hd$2 = 0,
         mTemp$5 = null;
      wd$3 = Self.FDC.canvas.width;
      hd$2 = Self.FDC.canvas.height;
      mTemp$5 = Self.FDC.getImageData(0,0,wd$3,hd$2);
      Result = TObject.Create($New(TW3ImageData));
      TW3ImageData.FromImageData(Result,mTemp$5);
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// EW3ImageData = class (EW3Exception)
///  [line: 207, column: 3, file: SmartCL.Graphics]
var EW3ImageData = {
   $ClassName:"EW3ImageData",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3Canvas = class (EW3Exception)
///  [line: 249, column: 3, file: SmartCL.Graphics]
var EW3Canvas = {
   $ClassName:"EW3Canvas",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3TouchList = class (TObject)
///  [line: 34, column: 3, file: SmartCL.Touch]
var TW3TouchList = {
   $ClassName:"TW3TouchList",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FObjects = null;
   }
   /// procedure TW3TouchList.Clear()
   ///  [line: 83, column: 24, file: SmartCL.Touch]
   ,Clear$5:function(Self) {
      Self.FObjects = null;
   }
   /// procedure TW3TouchList.Update(const Reference: JTouchList)
   ///  [line: 88, column: 24, file: SmartCL.Touch]
   ,Update:function(Self, Reference) {
      if (Reference) {
         Self.FObjects = Reference;
      } else {
         TW3TouchList.Clear$5(Self);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3TouchData = class (TObject)
///  [line: 47, column: 3, file: SmartCL.Touch]
var TW3TouchData = {
   $ClassName:"TW3TouchData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FChanged = $.FTouches = null;
   }
   /// procedure TW3TouchData.Clear()
   ///  [line: 101, column: 24, file: SmartCL.Touch]
   ,Clear$6:function(Self) {
      if (Self.FTouches!==null) {
         TW3TouchList.Clear$5(Self.FTouches);
      }
      if (Self.FChanged!==null) {
         TW3TouchList.Clear$5(Self.FChanged);
      }
   }
   /// function TW3TouchData.GetChanged() : TW3TouchList
   ///  [line: 140, column: 23, file: SmartCL.Touch]
   ,GetChanged:function(Self) {
      var Result = null;
      if (Self.FChanged===null) {
         Self.FChanged = TObject.Create($New(TW3TouchList));
      }
      Result = Self.FChanged;
      return Result
   }
   /// function TW3TouchData.GetTouches() : TW3TouchList
   ///  [line: 133, column: 23, file: SmartCL.Touch]
   ,GetTouches:function(Self) {
      var Result = null;
      if (Self.FTouches===null) {
         Self.FTouches = TObject.Create($New(TW3TouchList));
      }
      Result = Self.FTouches;
      return Result
   }
   /// procedure TW3TouchData.Update(const EventObject: JTouchEvent)
   ///  [line: 110, column: 24, file: SmartCL.Touch]
   ,Update$1:function(Self, EventObject$3) {
      var LProxy = null;
      if (EventObject$3!==null) {
         LProxy = TW3TouchData.GetTouches(Self);
         TW3TouchList.Update(LProxy,EventObject$3.touches);
         LProxy = TW3TouchData.GetChanged(Self);
         TW3TouchList.Update(LProxy,EventObject$3.changedTouches);
      } else {
         TW3TouchData.Clear$6(Self);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3GestureData = class (TObject)
///  [line: 64, column: 3, file: SmartCL.Touch]
var TW3GestureData = {
   $ClassName:"TW3GestureData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FRotation = $.FScale = 0;
   }
   /// procedure TW3GestureData.Consume(refObj: THandle)
   ///  [line: 151, column: 26, file: SmartCL.Touch]
   ,Consume:function(Self, refObj) {
      Self.FRotation = Number(refObj.rotation);
      Self.FScale = Number(refObj.scale);
   }
   /// procedure TW3GestureData.Update()
   ///  [line: 158, column: 26, file: SmartCL.Touch]
   ,Update$3:function(Self) {
      TW3GestureData.Consume(Self,event);
   }
   ,Destroy:TObject.Destroy
};
/// TW3Borders = class (TW3OwnedObject)
///  [line: 137, column: 3, file: SmartCL.Borders]
var TW3Borders = {
   $ClassName:"TW3Borders",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FBottom = $.FLeft = $.FRight = $.FTop = null;
   }
   /// function TW3Borders.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 482, column: 21, file: SmartCL.Borders]
   ,AcceptOwner:function(Self, CandidateObject$5) {
      return $Is(CandidateObject$5,TW3TagObj);
   }
   /// function TW3Borders.AdjustClientRect(const ThisRect: TRect) : TRect
   ///  [line: 538, column: 21, file: SmartCL.Borders]
   ,AdjustClientRect$1:function(Self, ThisRect) {
      var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      Copy$TRect(ThisRect,Result);
      Result.Left$3+=TW3Border.GetPadding(Self.FLeft);
      Result.Top$3+=TW3Border.GetPadding(Self.FTop);
      Result.Right$1-=TW3Border.GetPadding(Self.FRight);
      Result.Bottom$1-=TW3Border.GetPadding(Self.FBottom);
      return Result
   }
   /// constructor TW3Borders.Create(const AOwner: TObject)
   ///  [line: 464, column: 24, file: SmartCL.Borders]
   ,Create$11:function(Self, AOwner$13) {
      TW3OwnedObject.Create$11(Self,AOwner$13);
      Self.FLeft = TW3Border.Create$133($New(TW3Border),Self,0);
      Self.FTop = TW3Border.Create$133($New(TW3Border),Self,1);
      Self.FRight = TW3Border.Create$133($New(TW3Border),Self,2);
      Self.FBottom = TW3Border.Create$133($New(TW3Border),Self,3);
      return Self
   }
   /// destructor TW3Borders.Destroy()
   ///  [line: 473, column: 23, file: SmartCL.Borders]
   ,Destroy:function(Self) {
      TObject.Free(Self.FLeft);
      TObject.Free(Self.FTop);
      TObject.Free(Self.FRight);
      TObject.Free(Self.FBottom);
      TObject.Destroy(Self);
   }
   /// function TW3Borders.GetHSpace() : Integer
   ///  [line: 553, column: 21, file: SmartCL.Borders]
   ,GetHSpace:function(Self) {
      var Result = 0;
      (Result+= TW3Border.GetPadding(Self.FLeft));
      (Result+= TW3Border.GetPadding(Self.FRight));
      return Result
   }
   /// function TW3Borders.GetVSpace() : Integer
   ///  [line: 547, column: 21, file: SmartCL.Borders]
   ,GetVSpace:function(Self) {
      var Result = 0;
      (Result+= TW3Border.GetPadding(Self.FTop));
      (Result+= TW3Border.GetPadding(Self.FBottom));
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3Borders.$Intf={
   IW3OwnedObjectAccess:[TW3Borders.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BorderRadius = class (TW3OwnedObject)
///  [line: 96, column: 3, file: SmartCL.Borders]
var TW3BorderRadius = {
   $ClassName:"TW3BorderRadius",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FBottom$1 = $.FTop$1 = null;
   }
   /// function TW3BorderRadius.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 320, column: 26, file: SmartCL.Borders]
   ,AcceptOwner:function(Self, CandidateObject$6) {
      return (CandidateObject$6!==null)&&$Is(CandidateObject$6,TW3TagObj);
   }
   /// constructor TW3BorderRadius.Create(const AOwner: TObject)
   ///  [line: 306, column: 29, file: SmartCL.Borders]
   ,Create$11:function(Self, AOwner$14) {
      TW3OwnedObject.Create$11(Self,AOwner$14);
      Self.FTop$1 = TW3BorderEdgeRadius.Create$132($New(TW3BorderEdgeTopRadius),Self);
      Self.FBottom$1 = TW3BorderEdgeRadius.Create$132($New(TW3BorderEdgeBottomRadius),Self);
      return Self
   }
   /// destructor TW3BorderRadius.Destroy()
   ///  [line: 313, column: 28, file: SmartCL.Borders]
   ,Destroy:function(Self) {
      TObject.Free(Self.FTop$1);
      TObject.Free(Self.FBottom$1);
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3BorderRadius.$Intf={
   IW3OwnedObjectAccess:[TW3BorderRadius.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BorderEdgeRadius = class (TW3OwnedObject)
///  [line: 60, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeRadius = {
   $ClassName:"TW3BorderEdgeRadius",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// constructor TW3BorderEdgeRadius.Create(const AOwner: TW3BorderRadius)
   ///  [line: 292, column: 33, file: SmartCL.Borders]
   ,Create$132:function(Self, AOwner$15) {
      TW3OwnedObject.Create$11(Self,AOwner$15);
      return Self
   }
   /// function TW3BorderEdgeRadius.GetOwner() : TW3BorderRadius
   ///  [line: 297, column: 30, file: SmartCL.Borders]
   ,GetOwner$4:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3BorderRadius);
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,GetLeft$1$:function($){return $.ClassType.GetLeft$1($)}
   ,GetRight$:function($){return $.ClassType.GetRight($)}
   ,SetLeft$1$:function($){return $.ClassType.SetLeft$1.apply($.ClassType, arguments)}
   ,SetRight$:function($){return $.ClassType.SetRight.apply($.ClassType, arguments)}
};
TW3BorderEdgeRadius.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BorderEdgeTopRadius = class (TW3BorderEdgeRadius)
///  [line: 74, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeTopRadius = {
   $ClassName:"TW3BorderEdgeTopRadius",$Parent:TW3BorderEdgeRadius
   ,$Init:function ($) {
      TW3BorderEdgeRadius.$Init($);
      $.FLeft$1 = $.FRight$1 = 0;
   }
   /// function TW3BorderEdgeTopRadius.GetLeft() : Integer
   ///  [line: 278, column: 33, file: SmartCL.Borders]
   ,GetLeft$1:function(Self) {
      return Self.FLeft$1;
   }
   /// function TW3BorderEdgeTopRadius.GetRight() : Integer
   ///  [line: 283, column: 33, file: SmartCL.Borders]
   ,GetRight:function(Self) {
      return Self.FRight$1;
   }
   /// procedure TW3BorderEdgeTopRadius.SetLeft(const NewRadius: Integer)
   ///  [line: 248, column: 34, file: SmartCL.Borders]
   ,SetLeft$1:function(Self, NewRadius) {
      var LHandle$10 = undefined;
      if (NewRadius!=Self.FLeft$1) {
         Self.FLeft$1 = NewRadius;
         LHandle$10 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$10)) {
            LHandle$10.style["border-top-left-radius"] = TInteger.ToPxStr(NewRadius);
         }
      }
   }
   /// procedure TW3BorderEdgeTopRadius.SetRight(const NewRadius: Integer)
   ///  [line: 263, column: 34, file: SmartCL.Borders]
   ,SetRight:function(Self, NewRadius$1) {
      var LHandle$11 = undefined;
      if (NewRadius$1!=Self.FRight$1) {
         Self.FRight$1 = NewRadius$1;
         LHandle$11 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$11)) {
            LHandle$11.style["border-top-right-radius"] = TInteger.ToPxStr(NewRadius$1);
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,GetLeft$1$:function($){return $.ClassType.GetLeft$1($)}
   ,GetRight$:function($){return $.ClassType.GetRight($)}
   ,SetLeft$1$:function($){return $.ClassType.SetLeft$1.apply($.ClassType, arguments)}
   ,SetRight$:function($){return $.ClassType.SetRight.apply($.ClassType, arguments)}
};
TW3BorderEdgeTopRadius.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BorderEdgeStyle enumeration
///  [line: 43, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeStyle = [ "besNone", "besSolid", "besDotted", "besDouble", "besGroove", "besInset", "besOutset" ];
/// TW3BorderEdgeBottomRadius = class (TW3BorderEdgeRadius)
///  [line: 85, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeBottomRadius = {
   $ClassName:"TW3BorderEdgeBottomRadius",$Parent:TW3BorderEdgeRadius
   ,$Init:function ($) {
      TW3BorderEdgeRadius.$Init($);
      $.FLeft$2 = $.FRight$2 = 0;
   }
   /// function TW3BorderEdgeBottomRadius.GetLeft() : Integer
   ///  [line: 234, column: 36, file: SmartCL.Borders]
   ,GetLeft$1:function(Self) {
      return Self.FLeft$2;
   }
   /// function TW3BorderEdgeBottomRadius.GetRight() : Integer
   ///  [line: 239, column: 36, file: SmartCL.Borders]
   ,GetRight:function(Self) {
      return Self.FRight$2;
   }
   /// procedure TW3BorderEdgeBottomRadius.SetLeft(const NewRadius: Integer)
   ///  [line: 204, column: 37, file: SmartCL.Borders]
   ,SetLeft$1:function(Self, NewRadius$2) {
      var LHandle$12 = undefined;
      if (NewRadius$2!=Self.FLeft$2) {
         Self.FLeft$2 = NewRadius$2;
         LHandle$12 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$12)) {
            LHandle$12.style["border-bottom-left-radius"] = TInteger.ToPxStr(NewRadius$2);
         }
      }
   }
   /// procedure TW3BorderEdgeBottomRadius.SetRight(const NewRadius: Integer)
   ///  [line: 219, column: 37, file: SmartCL.Borders]
   ,SetRight:function(Self, NewRadius$3) {
      var LHandle$13 = undefined;
      if (NewRadius$3!=Self.FRight$2) {
         Self.FRight$2 = NewRadius$3;
         LHandle$13 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$13)) {
            LHandle$13.style["border-bottom-right-radius"] = TInteger.ToPxStr(NewRadius$3);
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,GetLeft$1$:function($){return $.ClassType.GetLeft$1($)}
   ,GetRight$:function($){return $.ClassType.GetRight($)}
   ,SetLeft$1$:function($){return $.ClassType.SetLeft$1.apply($.ClassType, arguments)}
   ,SetRight$:function($){return $.ClassType.SetRight.apply($.ClassType, arguments)}
};
TW3BorderEdgeBottomRadius.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BorderEdge enumeration
///  [line: 24, column: 3, file: SmartCL.Borders]
var TW3BorderEdge = [ "beLeft", "beTop", "beRight", "beBottom" ];
/// TW3Border = class (TObject)
///  [line: 109, column: 3, file: SmartCL.Borders]
var TW3Border = {
   $ClassName:"TW3Border",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEdge = 0;
      $.FEdgeName = "";
      $.FOwner$4 = null;
   }
   /// constructor TW3Border.Create(AOwner: TW3Borders; AEdge: TW3BorderEdge)
   ///  [line: 330, column: 23, file: SmartCL.Borders]
   ,Create$133:function(Self, AOwner$16, AEdge) {
      TObject.Create(Self);
      Self.FOwner$4 = AOwner$16;
      Self.FEdge = Self.FEdge;
      Self.FEdgeName = _EdgeNameLUT[AEdge];
      return Self
   }
   /// function TW3Border.GetColor() : TColor
   ///  [line: 441, column: 20, file: SmartCL.Borders]
   ,GetColor$4:function(Self) {
      var Result = 0;
      var LHandle$14 = undefined;
      LHandle$14 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      Result = StrToColor(String(LHandle$14.style["border-"+Self.FEdgeName+"-color"]));
      return Result
   }
   /// function TW3Border.GetMargin() : Integer
   ///  [line: 369, column: 20, file: SmartCL.Borders]
   ,GetMargin:function(Self) {
      var Result = 0;
      var LHandle$15 = undefined;
      LHandle$15 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$15)) {
         Result = w3_GetStyleAsInt(LHandle$15,("margin-"+Self.FEdgeName));
      }
      return Result
   }
   /// function TW3Border.GetPadding() : Integer
   ///  [line: 349, column: 20, file: SmartCL.Borders]
   ,GetPadding:function(Self) {
      var Result = 0;
      var LHandle$16 = undefined;
      LHandle$16 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$16)) {
         Result = w3_GetStyleAsInt(LHandle$16,("padding-"+Self.FEdgeName));
      }
      return Result
   }
   /// function TW3Border.GetStyle() : TW3BorderEdgeStyle
   ///  [line: 410, column: 20, file: SmartCL.Borders]
   ,GetStyle$3:function(Self) {
      var Result = 0;
      var LHandle$17 = undefined,
         LValue = "";
      Result = 0;
      LHandle$17 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (LHandle$17) {
         LValue = w3_GetStyleAsStr(LHandle$17,("border-"+Self.FEdgeName+"-style"));
         {var $temp38 = (Trim$_String_(LValue)).toLocaleLowerCase();
            if ($temp38=="solid") {
               Result = 1;
            }
             else if ($temp38=="dotted") {
               Result = 2;
            }
             else if ($temp38=="double") {
               Result = 3;
            }
             else if ($temp38=="groove") {
               Result = 4;
            }
             else if ($temp38=="inset") {
               Result = 5;
            }
             else if ($temp38=="outset") {
               Result = 6;
            }
         }
      }
      return Result
   }
   /// function TW3Border.GetWidth() : Integer
   ///  [line: 389, column: 20, file: SmartCL.Borders]
   ,GetWidth$6:function(Self) {
      var Result = 0;
      var LHandle$18 = undefined;
      Result = 0;
      LHandle$18 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$18)) {
         Result = w3_GetStyleAsInt(LHandle$18,("border-"+Self.FEdgeName+"-width"));
      }
      return Result
   }
   /// procedure TW3Border.SetColor(aValue: TColor)
   ///  [line: 449, column: 21, file: SmartCL.Borders]
   ,SetColor$8:function(Self, aValue$46) {
      var LHandle$19 = undefined;
      LHandle$19 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$19)) {
         LHandle$19.style["border-"+Self.FEdgeName+"-color"] = ColorToWebStr(aValue$46,255);
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetColor", TObject.ClassName(Self.ClassType), $R[40]]);
      }
   }
   /// procedure TW3Border.SetMargin(const aValue: Integer)
   ///  [line: 378, column: 21, file: SmartCL.Borders]
   ,SetMargin$1:function(Self, aValue$47) {
      var LHandle$20 = undefined;
      LHandle$20 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$20)) {
         LHandle$20.style["margin-"+Self.FEdgeName] = TInteger.ToPxStr(aValue$47);
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetMargin", TObject.ClassName(Self.ClassType), $R[40]]);
      }
   }
   /// procedure TW3Border.SetPadding(aValue: Integer)
   ///  [line: 358, column: 21, file: SmartCL.Borders]
   ,SetPadding$1:function(Self, aValue$48) {
      var LHandle$21 = undefined;
      LHandle$21 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$21)) {
         LHandle$21.style["padding-"+Self.FEdgeName] = TInteger.ToPxStr(aValue$48);
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetPadding", TObject.ClassName(Self.ClassType), $R[40]]);
      }
   }
   /// procedure TW3Border.SetStyle(aValue: TW3BorderEdgeStyle)
   ///  [line: 430, column: 21, file: SmartCL.Borders]
   ,SetStyle$4:function(Self, aValue$49) {
      var LHandle$22 = undefined;
      LHandle$22 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$22)) {
         LHandle$22.style["border-"+Self.FEdgeName+"-style"] = _StyleNameLUT[aValue$49];
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetStyle", TObject.ClassName(Self.ClassType), $R[40]]);
      }
   }
   /// procedure TW3Border.SetWidth(aValue: Integer)
   ///  [line: 399, column: 21, file: SmartCL.Borders]
   ,SetWidth$3:function(Self, aValue$50) {
      var LHandle$23 = undefined;
      LHandle$23 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (LHandle$23) {
         LHandle$23.style["border-"+Self.FEdgeName+"-width"] = TInteger.ToPxStr(aValue$50);
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetWidth", TObject.ClassName(Self.ClassType), $R[40]]);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3ElementAttributes = class (TObject)
///  [line: 22, column: 3, file: SmartCL.Attributes]
var TW3ElementAttributes = {
   $ClassName:"TW3ElementAttributes",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$11 = undefined;
   }
   /// constructor TW3ElementAttributes.Create(const aHandle: TControlHandle)
   ///  [line: 61, column: 34, file: SmartCL.Attributes]
   ,Create$134:function(Self, aHandle$1) {
      TObject.Create(Self);
      if (!TControlHandleHelper$Valid$2(aHandle$1)) {
         throw Exception.Create($New(EW3AttributeError),$R[34]);
      }
      Self.FHandle$11 = aHandle$1;
      return Self
   }
   /// function TW3ElementAttributes.Exists(const Attribute: String) : Boolean
   ///  [line: 70, column: 31, file: SmartCL.Attributes]
   ,Exists$1:function(Self, Attribute) {
      var Result = false;
      var LName$2 = "";
      LName$2 = (Trim$_String_(Attribute)).toLocaleLowerCase();
      if (LName$2.length>0) {
         LName$2 = $R[39]+LName$2;
         try {
            Result = (Self.FHandle$11.hasAttribute(LName$2)?true:false);
         } catch ($e) {
            var e$22 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3AttributeError),$R[37],[e$22.FMessage]);
         }
      } else {
         throw Exception.Create($New(EW3AttributeError),"Failed to access attribute, identifier was empty");
      }
      return Result
   }
   /// function TW3ElementAttributes.Read(const Attribute: String) : Variant
   ///  [line: 88, column: 31, file: SmartCL.Attributes]
   ,Read$3:function(Self, Attribute$1) {
      var Result = undefined;
      var LName$3 = "";
      LName$3 = (Trim$_String_(Attribute$1)).toLocaleLowerCase();
      if (LName$3.length>0) {
         LName$3 = $R[39]+LName$3;
         if (Self.FHandle$11.hasAttribute(LName$3)) {
            try {
               Result = Self.FHandle$11.getAttribute(LName$3);
            } catch ($e) {
               var e$23 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3AttributeError),$R[35],[e$23.FMessage]);
            }
         } else {
            Result = null;
         }
      } else {
         throw Exception.Create($New(EW3AttributeError),"Failed to access attribute, identifier was empty");
      }
      return Result
   }
   /// procedure TW3ElementAttributes.Write(const Attribute: String; const Value: Variant)
   ///  [line: 129, column: 32, file: SmartCL.Attributes]
   ,Write$9:function(Self, Attribute$2, Value$24) {
      var LName$4 = "";
      LName$4 = (Trim$_String_(Attribute$2)).toLocaleLowerCase();
      if (LName$4.length>0) {
         LName$4 = $R[39]+LName$4;
         try {
            Self.FHandle$11.setAttribute(LName$4,Value$24);
         } catch ($e) {
            var e$24 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3AttributeError),$R[36],[e$24.FMessage]);
         }
      } else {
         throw Exception.Create($New(EW3AttributeError),"Failed to access attribute, identifier was empty");
      }
   }
   ,Destroy:TObject.Destroy
};
/// EW3AttributeError = class (EW3Exception)
///  [line: 20, column: 3, file: SmartCL.Attributes]
var EW3AttributeError = {
   $ClassName:"EW3AttributeError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3EventManagerClickInfo = record
///  [line: 28, column: 3, file: SmartCL.EventManager]
function Copy$TW3EventManagerClickInfo(s,d) {
   d.Buttons=s.Buttons;
   d.ClickSent=s.ClickSent;
   d.DownCtrl=s.DownCtrl;
   d.DownTime=s.DownTime;
   d.EndX=s.EndX;
   d.EndY=s.EndY;
   d.Moved$1=s.Moved$1;
   d.StartX=s.StartX;
   d.StartY=s.StartY;
   d.UpCtrl=s.UpCtrl;
   d.UpTime=s.UpTime;
   return d;
}
function Clone$TW3EventManagerClickInfo($) {
   return {
      Buttons:$.Buttons,
      ClickSent:$.ClickSent,
      DownCtrl:$.DownCtrl,
      DownTime:$.DownTime,
      EndX:$.EndX,
      EndY:$.EndY,
      Moved$1:$.Moved$1,
      StartX:$.StartX,
      StartY:$.StartY,
      UpCtrl:$.UpCtrl,
      UpTime:$.UpTime
   }
}
/// TW3EventManager = class (TObject)
///  [line: 42, column: 3, file: SmartCL.EventManager]
var TW3EventManager = {
   $ClassName:"TW3EventManager",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.DetectedHandles = [];
      $.FCurrentClick = {Buttons:0,ClickSent:false,DownCtrl:null,DownTime:0,EndX:0,EndY:0,Moved$1:false,StartX:0,StartY:0,UpCtrl:null,UpTime:0};
      $.FDirection = 0;
      $.FDocTouchStartX = $.FDocTouchStartY = $.FLastX = $.FLastY = $.FMoveTreshold = 0;
      $.FEnteredControl = $.FMouseCaptureControl = $.FMovementControl = null;
      $.FPrevClick = {Buttons:0,ClickSent:false,DownCtrl:null,DownTime:0,EndX:0,EndY:0,Moved$1:false,StartX:0,StartY:0,UpCtrl:null,UpTime:0};
      $.FPreventMouseEvent = {Buttons:0,ClickSent:false,DownCtrl:null,DownTime:0,EndX:0,EndY:0,Moved$1:false,StartX:0,StartY:0,UpCtrl:null,UpTime:0};
   }
   /// procedure TW3EventManager.BindInteractionEvents(const Container: THandle)
   ///  [line: 108, column: 27, file: SmartCL.EventManager]
   ,BindInteractionEvents:function(Self, Container) {
      Application().FBody.FHandle$3["ontouchstart"] = $Event1(Self,TW3EventManager.DocTouchStart);
      Application().FBody.FHandle$3["ontouchmove"] = $Event1(Self,TW3EventManager.DocTouchMove);
      Container.addEventListener("touchstart",$Event1(Self,TW3EventManager.TouchBegins));
      Container.addEventListener("touchmove",$Event1(Self,TW3EventManager.TouchMove));
      Container.addEventListener("touchend",$Event1(Self,TW3EventManager.TouchEnds));
      Container.addEventListener("mousedown",$Event1(Self,TW3EventManager.MouseDown$1));
      Container.addEventListener("mousemove",$Event1(Self,TW3EventManager.MouseMove$1));
      Container.addEventListener("mouseup",$Event1(Self,TW3EventManager.MouseUp$1));
      Container.addEventListener("mousewheel",$Event1(Self,TW3EventManager.MouseWheel$1));
      try {
         Container.addEventListener("DOMMouseScroll",$Event1(Self,TW3EventManager.MouseWheel$1),false);
      } catch ($e) {
         /* null */
      }
      Self.FMoveTreshold = 10;
   }
   /// procedure TW3EventManager.CaptureMovement(Ctrl: TW3CustomControl; const MoveDirection: TMovementDirection)
   ///  [line: 524, column: 27, file: SmartCL.EventManager]
   ,CaptureMovement:function(Self, Ctrl, MoveDirection) {
      while (Ctrl!==null) {
         if (Ctrl.FOnAllMovement) {
            Self.FMovementControl = Ctrl;
            Self.FDirection = 2;
            try {
               if (Ctrl.FOnBeginMovement) {
                  Ctrl.FOnBeginMovement(Ctrl);
               }
            } catch ($e) {
               /* null */
            }
            break;
         }
         {var $temp39 = MoveDirection;
            if ($temp39==1) {
               if (Ctrl.FOnHorizontalMovement) {
                  Self.FMovementControl = Ctrl;
                  Self.FDirection = 1;
                  try {
                     if (Ctrl.FOnBeginMovement) {
                        Ctrl.FOnBeginMovement(Ctrl);
                     }
                  } catch ($e) {
                     /* null */
                  }
                  break;
               }
            }
             else if ($temp39==0) {
               if (Ctrl.FOnVerticalMovement) {
                  Self.FMovementControl = Ctrl;
                  Self.FDirection = 0;
                  try {
                     if (Ctrl.FOnBeginMovement) {
                        Ctrl.FOnBeginMovement(Ctrl);
                     }
                  } catch ($e) {
                     /* null */
                  }
                  break;
               }
            }
         }
         if (TW3TagContainer.a$53(Ctrl)!==null&&$Is(TW3TagContainer.a$53(Ctrl),TW3CustomControl)) {
            Ctrl = $As(TW3TagContainer.a$53(Ctrl),TW3CustomControl);
         } else {
            break;
         }
      }
   }
   /// function TW3EventManager.CheckPrevent(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer) : Boolean
   ///  [line: 638, column: 26, file: SmartCL.EventManager]
   ,CheckPrevent:function(Self, Ctrl$1, x$59, y$35) {
      return Ctrl$1===Self.FPreventMouseEvent.DownCtrl&&Math.abs(x$59-Self.FPreventMouseEvent.StartX)<10&&Math.abs(y$35-Self.FPreventMouseEvent.StartY)<10&&GetMilliseconds()-Self.FPreventMouseEvent.DownTime<=700;
   }
   /// procedure TW3EventManager.DocTouchMove(eventObj: JTouchEvent)
   ///  [line: 727, column: 27, file: SmartCL.EventManager]
   ,DocTouchMove:function(Self, eventObj$18) {
      var x$60 = {};
      x$60.v = 0;
      var y$36 = {};
      y$36.v = 0;
      var dx$12 = 0;
      var dy$13 = 0;
      var Tag$1 = null;
      var cc = null;
      if (!TW3EventManager.GetTouchCoordinates(Self,eventObj$18,x$60,y$36)) {
         eventObj$18.preventDefault();
         return;
      }
      dx$12 = Self.FDocTouchStartX-x$60.v;
      dy$13 = Self.FDocTouchStartY-y$36.v;
      Tag$1 = TW3ControlTracker.GetControlByHandle(TW3ControlTracker,eventObj$18.target);
      if (Tag$1!==null&&$Is(Tag$1,TW3CustomControl)) {
         cc = $As(Tag$1,TW3CustomControl);
         while (cc!==null) {
            if (TW3CustomControl.GetNativeScrolling(cc)) {
               if (cc.FHandle$3.style["-webkit-overflow-scrolling"]=="touch") {
                  if (TW3EventManager.PreventTouchScroll(Self,cc,dx$12,dy$13)) {
                     eventObj$18.preventDefault();
                  } else {
                     return;
                  }
               } else {
                  return;
               }
            }
            if (TW3TagContainer.a$53(cc)!==null&&$Is(TW3TagContainer.a$53(cc),TW3CustomControl)) {
               cc = $As(TW3TagContainer.a$53(cc),TW3CustomControl);
            } else {
               cc = null;
            }
         }
      }
      eventObj$18.preventDefault();
   }
   /// procedure TW3EventManager.DocTouchStart(eventObj: JTouchEvent)
   ///  [line: 719, column: 27, file: SmartCL.EventManager]
   ,DocTouchStart:function(Self, eventObj$19) {
      var x$61 = {};
      x$61.v = 0;
      var y$37 = {};
      y$37.v = 0;
      TW3EventManager.GetTouchCoordinates(Self,eventObj$19,x$61,y$37);
      Self.FDocTouchStartX = x$61.v;
      Self.FDocTouchStartY = y$37.v;
   }
   /// procedure TW3EventManager.EndClick(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer)
   ///  [line: 614, column: 27, file: SmartCL.EventManager]
   ,EndClick:function(Self, Ctrl$2, x$62, y$38) {
      Self.FCurrentClick.EndX = x$62;
      Self.FCurrentClick.EndY = y$38;
      Self.FCurrentClick.UpTime = GetMilliseconds();
      Self.FCurrentClick.UpCtrl = Ctrl$2;
   }
   /// procedure TW3EventManager.Entered(Ctrl: TW3CustomControl; EventObj: JMouseEvent)
   ///  [line: 130, column: 27, file: SmartCL.EventManager]
   ,Entered:function(Self, Ctrl$3, EventObj$4) {
      if (Ctrl$3!==Self.FEnteredControl) {
         try {
            if (Self.FEnteredControl!==null&&(Self.FEnteredControl.FOnMouseExit!==null)) {
               TW3CustomControl.Dispatch$(Self.FEnteredControl,9,EventObj$4);
            }
         } catch ($e) {
            /* null */
         }
         Self.FEnteredControl = Ctrl$3;
         if (Self.FEnteredControl!==null&&(Self.FEnteredControl.FOnMouseEnter!==null)) {
            TW3CustomControl.Dispatch$(Self.FEnteredControl,8,EventObj$4);
         }
      }
   }
   /// function TW3EventManager.FindControlAtPoint(x: Integer; y: Integer) : TW3CustomControl
   ///  [line: 150, column: 26, file: SmartCL.EventManager]
   ,FindControlAtPoint:function(Self, x$63, y$39) {
      var Result = null;
      var LPos = {X$1:0,Y$1:0},
         LTarget,
         Tag$2 = null;
      Self.DetectedHandles.length=0;
      Result = Self.FMouseCaptureControl;
      if (Result===null) {
         LPos = Create$110(x$63,y$39);
         LTarget = document.elementFromPoint(x$63,y$39);
         while (LTarget) {
            Self.DetectedHandles.push(LTarget);
            Tag$2 = TW3ControlTracker.GetControlByHandle(TW3ControlTracker,LTarget);
            if (Tag$2!==null&&$Is(Tag$2,TW3CustomControl)) {
               Result = $As(Tag$2,TW3CustomControl);
               while (Result!==null&&TW3CustomControl.GetTransparentEvents(Result)&&TW3TagContainer.a$53(Result)!==null&&$Is(TW3TagContainer.a$53(Result),TW3CustomControl)) {
                  Result = $As(TW3TagContainer.a$53(Result),TW3CustomControl);
               }
               return Result;
            } else {
               LTarget = LTarget.parentElement;
            }
         }
      }
      return Result
   }
   /// function TW3EventManager.GetTouchCoordinates(eventObj: JTouchEvent; var x: Integer; var y: Integer) : Boolean
   ///  [line: 333, column: 26, file: SmartCL.EventManager]
   ,GetTouchCoordinates:function(Self, eventObj$20, x$64, y$40) {
      var Result = false;
      var e$25;
      e$25 = eventObj$20;
      if (e$25.targetTouches&&e$25.targetTouches.length>0) {
         x$64.v = parseInt(e$25.targetTouches[0].pageX,10);
         y$40.v = parseInt(e$25.targetTouches[0].pageY,10);
         Result = true;
      }
      return Result
   }
   /// procedure TW3EventManager.HandleMoveEnd()
   ///  [line: 507, column: 27, file: SmartCL.EventManager]
   ,HandleMoveEnd:function(Self) {
      if (Self.FMovementControl!==null) {
         try {
            if (Self.FMovementControl.FOnEndMovement) {
               Self.FMovementControl.FOnEndMovement(Self.FMovementControl);
            }
         } catch ($e) {
            /* null */
         }
         Self.FMovementControl = null;
      }
   }
   /// procedure TW3EventManager.HandleMovement(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer)
   ///  [line: 459, column: 27, file: SmartCL.EventManager]
   ,HandleMovement:function(Self, Ctrl$4, x$65, y$41) {
      var dx$13 = 0,
         dy$14 = 0;
      if (Self.FMouseCaptureControl===null) {
         dx$13 = x$65-Self.FCurrentClick.StartX;
         dy$14 = y$41-Self.FCurrentClick.StartY;
         if (Math.abs(dx$13)>Self.FMoveTreshold||Math.abs(dy$14)>Self.FMoveTreshold) {
            if (Self.FCurrentClick.Moved$1) {
               if (Self.FMovementControl!==null) {
                  dx$13 = x$65-Self.FLastX;
                  dy$14 = y$41-Self.FLastY;
                  try {
                     if ((Self.FMovementControl.FOnHorizontalMovement!==null)&&((1<<Self.FDirection&6)!=0)) {
                        Self.FMovementControl.FOnHorizontalMovement(Self,dx$13,0);
                     }
                     if ((Self.FMovementControl.FOnVerticalMovement!==null)&&((1<<Self.FDirection&5)!=0)) {
                        Self.FMovementControl.FOnVerticalMovement(Self,0,dy$14);
                     }
                     if ((Self.FMovementControl.FOnAllMovement!==null)&&((1<<Self.FDirection&7)!=0)) {
                        Self.FMovementControl.FOnAllMovement(Self,dx$13,dy$14);
                     }
                  } catch ($e) {
                     /* null */
                  }
               }
            } else {
               Self.FCurrentClick.Moved$1 = true;
               if (Self.FDirection==3) {
                  if (Math.abs(dx$13)>Math.abs(dy$14)) {
                     TW3EventManager.CaptureMovement(Self,Ctrl$4,1);
                  } else {
                     TW3EventManager.CaptureMovement(Self,Ctrl$4,0);
                  }
               }
            }
         }
      }
   }
   /// procedure TW3EventManager.HandleTouchEvent(const Ctrl: TW3CustomControl; eventObj: JTouchEvent)
   ///  [line: 622, column: 27, file: SmartCL.EventManager]
   ,HandleTouchEvent:function(Self, Ctrl$5, eventObj$21) {
      if (Ctrl$5.TouchPreventDefault) {
         eventObj$21.stopPropagation();
         eventObj$21.preventDefault();
      }
   }
   /// procedure TW3EventManager.MouseDown(eventObj: JMouseEvent)
   ///  [line: 190, column: 27, file: SmartCL.EventManager]
   ,MouseDown$1:function(Self, eventObj$22) {
      var e$26,
         x$66,
         y$42,
         Ctrl$6 = null;
      e$26 = eventObj$22;
      x$66 = e$26.clientX;
      y$42 = e$26.clientY;
      Ctrl$6 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$66,10),parseInt(y$42,10));
      if (Ctrl$6!==null) {
         if (TW3EventManager.CheckPrevent(Self,Ctrl$6,parseInt(x$66,10),parseInt(y$42,10))) {
            eventObj$22.stopPropagation();
            return;
         }
         TW3EventManager.StartClick(Self,Ctrl$6,parseInt(x$66,10),parseInt(y$42,10),parseInt(e$26.buttons,10));
         if (Ctrl$6.FOnMouseDown) {
            eventObj$22.stopPropagation();
            TW3CustomControl.Dispatch$(Ctrl$6,1,eventObj$22);
         }
         TW3EventManager.Entered(Self,Ctrl$6,eventObj$22);
         Self.FLastX = parseInt(x$66,10);
         Self.FLastY = parseInt(y$42,10);
         Self.FDirection = 3;
      }
   }
   /// procedure TW3EventManager.MouseMove(eventObj: JMouseEvent)
   ///  [line: 220, column: 27, file: SmartCL.EventManager]
   ,MouseMove$1:function(Self, eventObj$23) {
      var e$27,
         x$67,
         y$43,
         Ctrl$7 = null;
      e$27 = eventObj$23;
      if (Self.FCurrentClick.DownTime>0&&(Self.FCurrentClick.UpTime==0)&&Self.FCurrentClick.Buttons!=e$27.buttons) {
         TW3EventManager.MouseUp$1(Self,eventObj$23);
         return;
      }
      x$67 = e$27.clientX;
      y$43 = e$27.clientY;
      Ctrl$7 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$67,10),parseInt(y$43,10));
      if (Ctrl$7!==null) {
         if (TW3EventManager.CheckPrevent(Self,Ctrl$7,parseInt(x$67,10),parseInt(y$43,10))) {
            eventObj$23.stopPropagation();
            return;
         }
         if (Ctrl$7.FOnMouseMove) {
            eventObj$23.stopPropagation();
            TW3CustomControl.Dispatch$(Ctrl$7,2,eventObj$23);
         }
         if (Self.FCurrentClick.DownTime>0&&(Self.FCurrentClick.UpTime==0)&&Self.FCurrentClick.Buttons==1) {
            TW3EventManager.HandleMovement(Self,Ctrl$7,parseInt(x$67,10),parseInt(y$43,10));
         } else {
            TW3EventManager.Entered(Self,Ctrl$7,eventObj$23);
         }
      }
      Self.FLastX = parseInt(x$67,10);
      Self.FLastY = parseInt(y$43,10);
   }
   /// procedure TW3EventManager.MouseUp(eventObj: JMouseEvent)
   ///  [line: 263, column: 27, file: SmartCL.EventManager]
   ,MouseUp$1:function(Self, eventObj$24) {
      var e$28,
         x$68,
         y$44,
         Ctrl$8 = null;
      e$28 = eventObj$24;
      x$68 = e$28.clientX;
      y$44 = e$28.clientY;
      Ctrl$8 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$68,10),parseInt(y$44,10));
      if (Ctrl$8!==null) {
         if (TW3EventManager.CheckPrevent(Self,Ctrl$8,parseInt(x$68,10),parseInt(y$44,10))) {
            eventObj$24.stopPropagation();
            return;
         }
         TW3EventManager.EndClick(Self,Ctrl$8,parseInt(x$68,10),parseInt(y$44,10));
         if (Ctrl$8.FOnMouseUp) {
            eventObj$24.stopPropagation();
            TW3CustomControl.Dispatch$(Ctrl$8,3,eventObj$24);
         }
         TW3EventManager.SendClickOrDoubleClick(Self);
         TW3EventManager.Entered(Self,Ctrl$8,eventObj$24);
      }
      TW3EventManager.HandleMoveEnd(Self);
   }
   /// procedure TW3EventManager.MouseWheel(eventObj: JMouseWheelEvent)
   ///  [line: 290, column: 27, file: SmartCL.EventManager]
   ,MouseWheel$1:function(Self, eventObj$25) {
      var WheelDelta = 0;
      var Handled$3 = {};
      Handled$3.v = false;
      var e$29,
         x$69,
         y$45,
         Ctrl$9 = null,
         sr$6 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         MousePos$2 = {X$1:0,Y$1:0},
         shiftState$7 = null;
      e$29 = eventObj$25;
      if (e$29.detail) {
         WheelDelta = parseInt((e$29.detail*-40),10);
      } else {
         WheelDelta = parseInt(e$29.wheelDelta,10);
      }
      x$69 = e$29.clientX;
      y$45 = e$29.clientY;
      Ctrl$9 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$69,10),parseInt(y$45,10));
      while (Ctrl$9!==null) {
         if (Ctrl$9.FOnMouseWheel) {
            try {
               sr$6 = TW3MovableControl.ScreenRect(Ctrl$9);
               MousePos$2 = Create$110(sr$6.Left$3,sr$6.Top$3);
               shiftState$7 = TShiftState.Current();
               TShiftState.SetMouseEvent(shiftState$7,eventObj$25);
               Ctrl$9.FOnMouseWheel(Ctrl$9,shiftState$7,WheelDelta,MousePos$2,Handled$3);
               if (Handled$3.v) {
                  eventObj$25.preventDefault();
                  eventObj$25.stopPropagation();
                  return;
               }
            } catch ($e) {
               /* null */
            }
         }
         if (TW3TagContainer.a$53(Ctrl$9)!==null&&$Is(TW3TagContainer.a$53(Ctrl$9),TW3CustomControl)) {
            Ctrl$9 = $As(TW3TagContainer.a$53(Ctrl$9),TW3CustomControl);
         } else {
            Ctrl$9 = null;
         }
      }
   }
   /// procedure TW3EventManager.PreventMouseEvents(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer)
   ///  [line: 630, column: 27, file: SmartCL.EventManager]
   ,PreventMouseEvents:function(Self, Ctrl$10, x$70, y$46) {
      Self.FPreventMouseEvent.DownCtrl = Ctrl$10;
      Self.FPreventMouseEvent.StartX = x$70;
      Self.FPreventMouseEvent.StartY = y$46;
      Self.FPreventMouseEvent.DownTime = GetMilliseconds();
   }
   /// procedure TW3EventManager.PreventOnClick()
   ///  [line: 713, column: 27, file: SmartCL.EventManager]
   ,PreventOnClick:function(Self) {
      Self.FCurrentClick.ClickSent = true;
   }
   /// function TW3EventManager.PreventTouchScroll(const Ctrl: TW3CustomControl; const dx: Integer; const dy: Integer) : Boolean
   ///  [line: 757, column: 26, file: SmartCL.EventManager]
   ,PreventTouchScroll:function(Self, Ctrl$11, dx$14, dy$15) {
      var Result = false;
      var MaxScroll = 0;
      MaxScroll = TW3ScrollInfo.GetScrollHeight(TW3CustomControl.GetScrollInfo(Ctrl$11))-TW3MovableControl.GetHeight$(Ctrl$11);
      if ((TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Ctrl$11))==0)&&dy$15<0) {
         Result = true;
      } else if (MaxScroll<0||TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Ctrl$11))>=MaxScroll&&dy$15>0) {
         Result = true;
      }
      return Result
   }
   /// procedure TW3EventManager.ReleaseCapture(const Target: TW3CustomControl)
   ///  [line: 591, column: 27, file: SmartCL.EventManager]
   ,ReleaseCapture$1:function(Self, Target$4) {
      Self.FMouseCaptureControl = null;
   }
   /// procedure TW3EventManager.SendClickOrDoubleClick()
   ///  [line: 646, column: 27, file: SmartCL.EventManager]
   ,SendClickOrDoubleClick:function(Self) {
      var SameCtrl = false;
      try {
         if (Self.FCurrentClick.Buttons>=2||Self.FCurrentClick.Moved$1||Self.FCurrentClick.DownCtrl!==Self.FCurrentClick.UpCtrl) {
            return;
         }
         if (Self.FCurrentClick.UpCtrl.FOnDblClick) {
            SameCtrl = Self.FCurrentClick.UpCtrl===Self.FPrevClick.UpCtrl&&Self.FCurrentClick.DownCtrl===Self.FPrevClick.DownCtrl;
            if (SameCtrl&&(Self.FCurrentClick.DownTime!=0)&&Self.FCurrentClick.UpTime-Self.FPrevClick.DownTime<=400&&Math.abs(Self.FCurrentClick.StartX-Self.FPrevClick.StartX)<10&&Math.abs(Self.FCurrentClick.StartY-Self.FPrevClick.StartY)<10&&Math.abs(Self.FCurrentClick.EndX-Self.FPrevClick.EndX)<10&&Math.abs(Self.FCurrentClick.EndY-Self.FPrevClick.EndY)<10) {
               Self.FCurrentClick.ClickSent = true;
               Self.FCurrentClick.UpCtrl.FOnDblClick(Self.FCurrentClick.UpCtrl);
            } else if (Self.FCurrentClick.UpCtrl.FOnClick) {
               TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3EventManager.SendDelayedClick),450);
            }
         } else {
            if ((Self.FCurrentClick.UpCtrl.FOnClick!==null)&&(!Self.FCurrentClick.ClickSent)) {
               Self.FCurrentClick.ClickSent = true;
               TW3CustomControl.Dispatch$(Self.FCurrentClick.UpCtrl,7,null);
            }
         }
      } catch ($e) {
         /* null */
      }
   }
   /// procedure TW3EventManager.SendDelayedClick()
   ///  [line: 699, column: 27, file: SmartCL.EventManager]
   ,SendDelayedClick:function(Self) {
      if ((!Self.FCurrentClick.ClickSent)&&(!Self.FCurrentClick.Moved$1)&&GetMilliseconds()-Self.FCurrentClick.UpTime<600) {
         Self.FCurrentClick.ClickSent = true;
         try {
            TW3CustomControl.Dispatch$(Self.FCurrentClick.UpCtrl,7,null);
         } catch ($e) {
            /* null */
         }
      }
   }
   /// procedure TW3EventManager.SetCapture(const Target: TW3CustomControl)
   ///  [line: 583, column: 27, file: SmartCL.EventManager]
   ,SetCapture$1:function(Self, Target$5) {
      Self.FMouseCaptureControl = Target$5;
   }
   /// procedure TW3EventManager.StartClick(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer; const Buttons: Integer)
   ///  [line: 599, column: 27, file: SmartCL.EventManager]
   ,StartClick:function(Self, Ctrl$12, x$71, y$47, Buttons$1) {
      Copy$TW3EventManagerClickInfo(Self.FCurrentClick,Self.FPrevClick);
      Self.FCurrentClick.StartX = x$71;
      Self.FCurrentClick.StartY = y$47;
      Self.FCurrentClick.Buttons = Buttons$1;
      Self.FCurrentClick.DownTime = GetMilliseconds();
      Self.FCurrentClick.DownCtrl = Ctrl$12;
      Self.FCurrentClick.UpTime = 0;
      Self.FCurrentClick.UpCtrl = null;
      Self.FCurrentClick.ClickSent = false;
      Self.FCurrentClick.Moved$1 = false;
   }
   /// procedure TW3EventManager.TouchBegins(eventObj: JTouchEvent)
   ///  [line: 346, column: 27, file: SmartCL.EventManager]
   ,TouchBegins:function(Self, eventObj$26) {
      var x$72 = {};
      x$72.v = 0;
      var y$48 = {};
      y$48.v = 0;
      var e$30,
         Ctrl$13 = null,
         ShiftState$4 = null,
         cx$3 = 0,
         cy$3 = 0;
      e$30 = eventObj$26;
      if (TW3EventManager.GetTouchCoordinates(Self,eventObj$26,x$72,y$48)) {
         Ctrl$13 = TW3EventManager.FindControlAtPoint(Self,x$72.v,y$48.v);
         if (Ctrl$13!==null) {
            TW3EventManager.PreventMouseEvents(Self,Ctrl$13,x$72.v,y$48.v);
            if (Ctrl$13.FOnTouchBegins) {
               TW3EventManager.HandleTouchEvent(Self,Ctrl$13,eventObj$26);
               TW3CustomControl.Dispatch$(Ctrl$13,4,eventObj$26);
            } else if (Ctrl$13.SimulateMouseEvents&&(Ctrl$13.FOnMouseDown!==null)) {
               try {
                  ShiftState$4 = TShiftState.Current();
                  cx$3 = x$72.v-TW3MovableControl.ScreenRect(Ctrl$13).Left$3;
                  cy$3 = y$48.v-TW3MovableControl.ScreenRect(Ctrl$13).Top$3;
                  Ctrl$13.FOnMouseDown(Ctrl$13,0,ShiftState$4,cx$3,cy$3);
               } catch ($e) {
                  /* null */
               }
            }
            TW3EventManager.StartClick(Self,Ctrl$13,x$72.v,y$48.v,1);
            Self.FLastX = x$72.v;
            Self.FLastY = y$48.v;
            Self.FDirection = 3;
         }
      }
   }
   /// procedure TW3EventManager.TouchEnds(eventObj: JTouchEvent)
   ///  [line: 420, column: 27, file: SmartCL.EventManager]
   ,TouchEnds:function(Self, eventObj$27) {
      var x$73 = {};
      x$73.v = 0;
      var y$49 = {};
      y$49.v = 0;
      var e$31,
         Ctrl$14 = null,
         ShiftState$5 = null,
         cx$4 = 0,
         cy$4 = 0;
      e$31 = eventObj$27;
      if (!TW3EventManager.GetTouchCoordinates(Self,eventObj$27,x$73,y$49)) {
         x$73.v = Self.FLastX;
         y$49.v = Self.FLastY;
      }
      Ctrl$14 = TW3EventManager.FindControlAtPoint(Self,x$73.v,y$49.v);
      if (Ctrl$14!==null) {
         TW3EventManager.PreventMouseEvents(Self,Ctrl$14,x$73.v,y$49.v);
         TW3EventManager.EndClick(Self,Ctrl$14,x$73.v,y$49.v);
         if (Ctrl$14.FOnTouchEnds) {
            TW3EventManager.HandleTouchEvent(Self,Ctrl$14,eventObj$27);
            TW3CustomControl.Dispatch$(Ctrl$14,6,eventObj$27);
         } else if (Ctrl$14.SimulateMouseEvents&&(Ctrl$14.FOnMouseUp!==null)) {
            try {
               ShiftState$5 = TShiftState.Current();
               cx$4 = x$73.v-TW3MovableControl.ScreenRect(Ctrl$14).Left$3;
               cy$4 = y$49.v-TW3MovableControl.ScreenRect(Ctrl$14).Top$3;
               Ctrl$14.FOnMouseUp(Ctrl$14,0,ShiftState$5,cx$4,cy$4);
            } catch ($e) {
               /* null */
            }
         }
         TW3EventManager.SendClickOrDoubleClick(Self);
      }
      TW3EventManager.HandleMoveEnd(Self);
   }
   /// procedure TW3EventManager.TouchMove(eventObj: JTouchEvent)
   ///  [line: 382, column: 27, file: SmartCL.EventManager]
   ,TouchMove:function(Self, eventObj$28) {
      var x$74 = {};
      x$74.v = 0;
      var y$50 = {};
      y$50.v = 0;
      var e$32,
         Ctrl$15 = null,
         ShiftState$6 = null,
         cx$5 = 0,
         cy$5 = 0;
      e$32 = eventObj$28;
      if (TW3EventManager.GetTouchCoordinates(Self,eventObj$28,x$74,y$50)) {
         Ctrl$15 = TW3EventManager.FindControlAtPoint(Self,x$74.v,y$50.v);
         if (Ctrl$15!==null) {
            TW3EventManager.PreventMouseEvents(Self,Ctrl$15,x$74.v,y$50.v);
            if (Ctrl$15.FOnTouchMoves) {
               TW3EventManager.HandleTouchEvent(Self,Ctrl$15,eventObj$28);
               TW3CustomControl.Dispatch$(Ctrl$15,5,eventObj$28);
            } else if (Ctrl$15.SimulateMouseEvents&&(Ctrl$15.FOnMouseMove!==null)) {
               try {
                  ShiftState$6 = TShiftState.Current();
                  cx$5 = x$74.v-TW3MovableControl.ScreenRect(Ctrl$15).Left$3;
                  cy$5 = y$50.v-TW3MovableControl.ScreenRect(Ctrl$15).Top$3;
                  Ctrl$15.FOnMouseMove(Ctrl$15,ShiftState$6,cx$5,cy$5);
               } catch ($e) {
                  /* null */
               }
            }
            TW3EventManager.HandleMovement(Self,Ctrl$15,x$74.v,y$50.v);
            if ((!Ctrl$15.TouchPreventDefault)&&TW3EventManager.PreventTouchScroll(Self,Ctrl$15,(Self.FCurrentClick.StartX-x$74.v),(Self.FCurrentClick.StartY-y$50.v))) {
               eventObj$28.preventDefault();
            }
         }
         Self.FLastX = x$74.v;
         Self.FLastY = y$50.v;
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomAsset = class (TW3OwnedObject)
///  [line: 68, column: 3, file: SmartCL.Assets]
var TW3CustomAsset = {
   $ClassName:"TW3CustomAsset",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.OnAssetFailed = null;
      $.OnAssetReady = null;
      $.OnBeforeIO = null;
      $.Data = undefined;
      $.URI = $.FIdentifier = "";
      $.FCanceled = false;
      $.FState$1 = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 89, column: 43, file: SmartCL.Assets]
   ,a$274:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3AssetManager);
   }
   /// procedure TW3CustomAsset.AfterAssetIO()
   ///  [line: 351, column: 26, file: SmartCL.Assets]
   ,AfterAssetIO:function(Self) {
      switch (Self.FState$1) {
         case 2 :
            if (Self.OnAssetReady) {
               Self.OnAssetReady(Self,Self.Data);
            }
            break;
         case 3 :
            if (Self.OnAssetFailed) {
               Self.OnAssetFailed(Self);
            }
            break;
      }
   }
   /// procedure TW3CustomAsset.BeforeAssetIO()
   ///  [line: 342, column: 26, file: SmartCL.Assets]
   ,BeforeAssetIO:function(Self) {
      if (Self.OnBeforeIO) {
         Self.OnBeforeIO(Self);
      }
   }
   /// procedure TW3CustomAsset.Cancel()
   ///  [line: 388, column: 26, file: SmartCL.Assets]
   ,Cancel:function(Self) {
      if (Self.FState$1==1) {
         Self.FCanceled = true;
      }
   }
   /// constructor TW3CustomAsset.Create(const AOwner: TW3AssetManager)
   ///  [line: 217, column: 28, file: SmartCL.Assets]
   ,Create$150:function(Self, AOwner$17) {
      TW3OwnedObject.Create$11(Self,AOwner$17);
      Self.FIdentifier = TDatatype.CreateGUID(TDatatype);
      Self.FState$1 = 0;
      Self.FCanceled = false;
      return Self
   }
   /// destructor TW3CustomAsset.Destroy()
   ///  [line: 225, column: 27, file: SmartCL.Assets]
   ,Destroy:function(Self) {
      TW3CustomAsset.ResetData(Self);
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomAsset.Execute()
   ///  [line: 261, column: 26, file: SmartCL.Assets]
   ,Execute$3:function(Self) {
      if ((1<<Self.FState$1&9)!=0) {
         if (Self.FState$1==3) {
            TW3CustomAsset.ResetData(Self);
         }
         TW3CustomAsset.SetState(Self,1);
         TW3CustomAsset.BeforeAssetIO(Self);
         TW3CustomAsset.PerformIO$(Self,Self.URI,function (Asset, Buffer$4) {
            var LAccess = null;
            TW3CustomAsset.SetState(Self,2);
            if (Self.FCanceled) {
               TW3CustomAsset.ResetData(Self);
               Self.FCanceled = false;
               return;
            }
            Self.Data = Buffer$4;
            try {
               LAccess = TW3CustomAsset.ManagerAccess(Self);
               if (LAccess) {
                  LAccess[0](Self);
               }
            } finally {
               TW3CustomAsset.AfterAssetIO(Self);
            }
         },function (Asset$1) {
            var LAccess$1 = null;
            TW3CustomAsset.SetState(Self,3);
            if (Self.FCanceled) {
               TW3CustomAsset.ResetData(Self);
               Self.FCanceled = false;
               return;
            }
            TW3CustomAsset.FailedAssetIO(Self);
            try {
               LAccess$1 = TW3CustomAsset.ManagerAccess(Self);
               if (LAccess$1) {
                  LAccess$1[1](Self);
               }
            } finally {
               TW3CustomAsset.AfterAssetIO(Self);
            }
         });
      }
   }
   /// procedure TW3CustomAsset.FailedAssetIO()
   ///  [line: 373, column: 26, file: SmartCL.Assets]
   ,FailedAssetIO:function(Self) {
      /* null */
   }
   /// function TW3CustomAsset.ManagerAccess() : IW3AssetManagerAccess
   ///  [line: 244, column: 25, file: SmartCL.Assets]
   ,ManagerAccess:function(Self) {
      var Result = null;
      if (TW3CustomAsset.a$274(Self)) {
         try {
            Result = $AsIntf(TW3CustomAsset.a$274(Self),"IW3AssetManagerAccess");
         } catch ($e) {
            var e$33 = $W($e);
            /* null */
         }
      }
      return Result
   }
   /// procedure TW3CustomAsset.PerformIO(const ThisURI: String; OnReady: TW3AssetReadyEvent; OnFailed: TW3AssetIOFailureEvent)
   ///  [line: 417, column: 26, file: SmartCL.Assets]
   ,PerformIO:function(Self, ThisURI, OnReady$4, OnFailed) {
      if (Trim$_String_(ThisURI).length>0) {
         Self.URI = ThisURI;
      }
   }
   /// procedure TW3CustomAsset.ResetData()
   ///  [line: 399, column: 26, file: SmartCL.Assets]
   ,ResetData:function(Self) {
      if (Self.FState$1==1) {
         TW3CustomAsset.Cancel(Self);
      }
      try {
         TW3CustomAsset.SetState(Self,0);
      } finally {
         Self.Data = null;
      }
   }
   /// procedure TW3CustomAsset.SetIdentifier(const NewIdentifier: String)
   ///  [line: 236, column: 26, file: SmartCL.Assets]
   ,SetIdentifier:function(Self, NewIdentifier) {
      Self.FIdentifier = NewIdentifier;
   }
   /// procedure TW3CustomAsset.SetState(const NewState: TW3AssetState)
   ///  [line: 380, column: 26, file: SmartCL.Assets]
   ,SetState:function(Self, NewState) {
      Self.FState$1 = NewState;
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,PerformIO$:function($){return $.ClassType.PerformIO.apply($.ClassType, arguments)}
};
TW3CustomAsset.$Intf={
   IW3AssetAccess:[TW3CustomAsset.ResetData,TW3CustomAsset.SetState,TW3CustomAsset.SetIdentifier]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3SoundAsset = class (TW3CustomAsset)
///  [line: 121, column: 3, file: SmartCL.Assets]
var TW3SoundAsset = {
   $ClassName:"TW3SoundAsset",$Parent:TW3CustomAsset
   ,$Init:function ($) {
      TW3CustomAsset.$Init($);
   }
   ,Destroy:TW3CustomAsset.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,PerformIO:TW3CustomAsset.PerformIO
};
TW3SoundAsset.$Intf={
   IW3AssetAccess:[TW3CustomAsset.ResetData,TW3CustomAsset.SetState,TW3CustomAsset.SetIdentifier]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ScriptAsset = class (TW3CustomAsset)
///  [line: 115, column: 3, file: SmartCL.Assets]
var TW3ScriptAsset = {
   $ClassName:"TW3ScriptAsset",$Parent:TW3CustomAsset
   ,$Init:function ($) {
      TW3CustomAsset.$Init($);
   }
   ,Destroy:TW3CustomAsset.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,PerformIO:TW3CustomAsset.PerformIO
};
TW3ScriptAsset.$Intf={
   IW3AssetAccess:[TW3CustomAsset.ResetData,TW3CustomAsset.SetState,TW3CustomAsset.SetIdentifier]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3GraphicAsset = class (TW3CustomAsset)
///  [line: 108, column: 3, file: SmartCL.Assets]
var TW3GraphicAsset = {
   $ClassName:"TW3GraphicAsset",$Parent:TW3CustomAsset
   ,$Init:function ($) {
      TW3CustomAsset.$Init($);
   }
   /// procedure TW3GraphicAsset.PerformIO(const ThisURI: String; OnReady: TW3AssetReadyEvent; OnFailed: TW3AssetIOFailureEvent)
   ///  [line: 180, column: 27, file: SmartCL.Assets]
   ,PerformIO:function(Self, ThisURI$1, OnReady$5, OnFailed$1) {
      TW3CustomAsset.PerformIO(Self,ThisURI$1,OnReady$5,OnFailed$1);
      TW3Storage.LoadImage(TW3Storage,ThisURI$1,function (FromUrl, ObjectHandle, Success$1) {
         if (Success$1) {
            WriteLn(("Successfully loaded "+FromUrl));
            if (OnReady$5) {
               OnReady$5(Self,ObjectHandle);
            }
         } else {
            WriteLn(("Failed to load "+FromUrl));
            if (OnFailed$1) {
               OnFailed$1(Self);
            }
         }
      });
   }
   ,Destroy:TW3CustomAsset.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,PerformIO$:function($){return $.ClassType.PerformIO.apply($.ClassType, arguments)}
};
TW3GraphicAsset.$Intf={
   IW3AssetAccess:[TW3CustomAsset.ResetData,TW3CustomAsset.SetState,TW3CustomAsset.SetIdentifier]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DataAsset = class (TW3CustomAsset)
///  [line: 124, column: 3, file: SmartCL.Assets]
var TW3DataAsset = {
   $ClassName:"TW3DataAsset",$Parent:TW3CustomAsset
   ,$Init:function ($) {
      TW3CustomAsset.$Init($);
   }
   ,Destroy:TW3CustomAsset.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,PerformIO:TW3CustomAsset.PerformIO
};
TW3DataAsset.$Intf={
   IW3AssetAccess:[TW3CustomAsset.ResetData,TW3CustomAsset.SetState,TW3CustomAsset.SetIdentifier]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3CSSAsset = class (TW3CustomAsset)
///  [line: 118, column: 3, file: SmartCL.Assets]
var TW3CSSAsset = {
   $ClassName:"TW3CSSAsset",$Parent:TW3CustomAsset
   ,$Init:function ($) {
      TW3CustomAsset.$Init($);
   }
   ,Destroy:TW3CustomAsset.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,PerformIO:TW3CustomAsset.PerformIO
};
TW3CSSAsset.$Intf={
   IW3AssetAccess:[TW3CustomAsset.ResetData,TW3CustomAsset.SetState,TW3CustomAsset.SetIdentifier]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3AssetState enumeration
///  [line: 40, column: 3, file: SmartCL.Assets]
var TW3AssetState = [ "asIdle", "asLoading", "asReady", "asError" ];
/// TW3AssetManagerState enumeration
///  [line: 47, column: 3, file: SmartCL.Assets]
var TW3AssetManagerState = [ "msIdle", "msLoading", "msReady", "msError" ];
/// TW3AssetManager = class (TObject)
///  [line: 127, column: 3, file: SmartCL.Assets]
var TW3AssetManager = {
   $ClassName:"TW3AssetManager",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnAssetReady = null;
      $.OnFinished = null;
      $.FAssets = [];
      $.FDone = $.FFailed = 0;
      $.FStack = [];
      $.FState$2 = 0;
   }
   /// procedure TW3AssetManager.AssetFailed(const Asset: TW3CustomAsset)
   ///  [line: 481, column: 27, file: SmartCL.Assets]
   ,AssetFailed:function(Self, Asset$2) {
      ++Self.FDone;
      ++Self.FFailed;
      if (Self.FDone>=Self.FAssets.length) {
         if (Self.FState$2==1) {
            Self.FState$2 = 3;
         }
         TW3Dispatch.Execute(TW3Dispatch,function () {
            if (Self.OnFinished) {
               Self.OnFinished(Self);
            }
         },100);
         return;
      }
      if (Self.FStack.length>0) {
         TW3Dispatch.Execute(TW3Dispatch,function () {
            var LItem$7 = null;
            LItem$7 = Self.FStack.pop();
            WriteLn(("Loading .. "+LItem$7.URI));
            TW3CustomAsset.ResetData(LItem$7);
            TW3CustomAsset.Execute$3(LItem$7);
         },50);
      }
   }
   /// procedure TW3AssetManager.AssetReady(const Asset: TW3CustomAsset)
   ///  [line: 446, column: 27, file: SmartCL.Assets]
   ,AssetReady:function(Self, Asset$3) {
      if (Self.OnAssetReady) {
         Self.OnAssetReady(Self,Asset$3);
      }
      ++Self.FDone;
      if (Self.FDone>=Self.FAssets.length) {
         if (Self.FState$2==1) {
            Self.FState$2 = 2;
         }
         TW3Dispatch.Execute(TW3Dispatch,function () {
            if (Self.OnFinished) {
               Self.OnFinished(Self);
            }
         },100);
         return;
      }
      if (Self.FStack.length>0) {
         TW3Dispatch.Execute(TW3Dispatch,function () {
            var LItem$8 = null;
            LItem$8 = Self.FStack.pop();
            WriteLn(("Loading .. "+LItem$8.URI));
            TW3CustomAsset.ResetData(LItem$8);
            TW3CustomAsset.Execute$3(LItem$8);
         },50);
      }
   }
   /// procedure TW3AssetManager.Cancel()
   ///  [line: 565, column: 27, file: SmartCL.Assets]
   ,Cancel$1:function(Self) {
      var a$340 = 0;
      var LItem$9 = null;
      if ((1<<Self.FState$2&10)!=0) {
         var a$341 = [];
         a$341 = Self.FAssets;
         var $temp40;
         for(a$340=0,$temp40=a$341.length;a$340<$temp40;a$340++) {
            LItem$9 = a$341[a$340];
            if (LItem$9.FState$1==1) {
               TW3CustomAsset.Cancel(LItem$9);
            }
         }
      }
   }
   /// constructor TW3AssetManager.Create()
   ///  [line: 433, column: 29, file: SmartCL.Assets]
   ,Create$151:function(Self) {
      TObject.Create(Self);
      Self.FState$2 = 0;
      return Self
   }
   /// destructor TW3AssetManager.Destroy()
   ///  [line: 439, column: 28, file: SmartCL.Assets]
   ,Destroy:function(Self) {
      if (!((1<<Self.FState$2&5)!=0)) {
         TW3AssetManager.Cancel$1(Self);
      }
      TObject.Destroy(Self);
   }
   /// function TW3AssetManager.GetAssetById(const AssetId: String) : TW3CustomAsset
   ///  [line: 673, column: 26, file: SmartCL.Assets]
   ,GetAssetById:function(Self, AssetId) {
      var Result = null;
      var a$342 = 0;
      var LAsset = null;
      var a$343 = [];
      a$343 = Self.FAssets;
      var $temp41;
      for(a$342=0,$temp41=a$343.length;a$342<$temp41;a$342++) {
         LAsset = a$343[a$342];
         if (LAsset.FIdentifier==AssetId) {
            Result = LAsset;
            break;
         }
      }
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
TW3AssetManager.$Intf={
   IW3AssetManagerAccess:[TW3AssetManager.AssetReady,TW3AssetManager.AssetFailed,TW3AssetManager.GetAssetById]
}
function InitAnimationFrameShim() {
   vRequestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                return window.setTimeout(callback, 1000 / 60);
              };
    })();
    vCancelAnimFrame = (function(){
      return  window.cancelAnimationFrame       ||
              window.webkitCancelAnimationFrame ||
              window.mozCancelAnimationFrame    ||
              window.msCancelAnimationFrame     ||
              function( handle ){
                window.clearTimeout(handle);
              };
    })();
};
/// TW3CustomForm = class (TW3CustomControl)
///  [line: 20, column: 3, file: SmartCL.Forms]
var TW3CustomForm = {
   $ClassName:"TW3CustomForm",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption = "";
      $.FInitialized$1 = false;
      $.FOnActivate = null;
      $.FOnDeactivate = null;
   }
   /// procedure TW3CustomForm.BuildForm()
   ///  [line: 116, column: 25, file: SmartCL.Forms]
   ,BuildForm:function(Self) {
      if (!Self.FInitialized$1) {
         Self.FInitialized$1 = true;
         TW3CustomForm.InitializeForm$(Self);
         TW3CustomControl.LayoutChildren(Self);
      }
   }
   /// constructor TW3CustomForm.Create(AOwner: TW3TagContainer)
   ///  [line: 64, column: 27, file: SmartCL.Forms]
   ,Create$86:function(Self, AOwner$18) {
      TW3TagContainer.Create$86(Self,AOwner$18);
      TApplicationFormsList.RegisterFormInstance$1(Forms$2(),$AsClass(TObject.ClassType(Self.ClassType),TW3CustomForm),Self);
      return Self
   }
   /// destructor TW3CustomForm.Destroy()
   ///  [line: 70, column: 26, file: SmartCL.Forms]
   ,Destroy:function(Self) {
      TW3CustomApplication.UnRegisterFormInstance(Application(),Self);
      TApplicationFormsList.UnregisterFormInstance(Forms$2(),Self);
   }
   /// procedure TW3CustomForm.FormActivated()
   ///  [line: 143, column: 25, file: SmartCL.Forms]
   ,FormActivated:function(Self) {
      TW3CustomForm.BuildForm(Self);
      if (Self.FOnActivate) {
         Self.FOnActivate(Self);
      }
   }
   /// procedure TW3CustomForm.FormDeactivated()
   ///  [line: 161, column: 25, file: SmartCL.Forms]
   ,FormDeactivated:function(Self) {
      if (Self.FOnDeactivate) {
         Self.FOnDeactivate(Self);
      }
   }
   /// function TW3CustomForm.GetCaption() : String
   ///  [line: 111, column: 24, file: SmartCL.Forms]
   ,GetCaption:function(Self) {
      return Self.FCaption;
   }
   /// procedure TW3CustomForm.InitializeForm()
   ///  [line: 102, column: 25, file: SmartCL.Forms]
   ,InitializeForm:function(Self) {
      /* null */
   }
   /// procedure TW3CustomForm.InitializeObject()
   ///  [line: 89, column: 25, file: SmartCL.Forms]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FTransparentEvents = false;
      Self.FHandle$3.style.width = "0px";
      Self.FHandle$3.style.height = "0px";
      Self.FHandle$3.style.left = "0px";
      Self.FHandle$3.style.top = "0px";
      TW3TagObj.SetInitialTransformationStyles(Self);
   }
   /// procedure TW3CustomForm.SetCaption(const NewCaption: String)
   ///  [line: 106, column: 25, file: SmartCL.Forms]
   ,SetCaption:function(Self, NewCaption) {
      Self.FCaption = NewCaption;
   }
   /// procedure TW3CustomForm.StyleTagObject()
   ///  [line: 76, column: 25, file: SmartCL.Forms]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3MovableControl.SetStyleClass(Self,"TW3CustomForm");
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86$:function($){return $.ClassType.Create$86.apply($.ClassType, arguments)}
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
TW3CustomForm.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Form = class (TW3CustomForm)
///  [line: 48, column: 3, file: SmartCL.Forms]
var TW3Form = {
   $ClassName:"TW3Form",$Parent:TW3CustomForm
   ,$Init:function ($) {
      TW3CustomForm.$Init($);
   }
   ,Destroy:TW3CustomForm.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomForm.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomForm.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3CustomForm.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
   ,InitializeForm:TW3CustomForm.InitializeForm
};
TW3Form.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3FlexControl = class (TW3CustomControl)
///  [line: 68, column: 3, file: SmartCL.Flexbox]
var TW3FlexControl = {
   $ClassName:"TW3FlexControl",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// function TW3FlexControl.CreationFlags() : TW3CreationFlags
   ///  [line: 372, column: 25, file: SmartCL.Flexbox]
   ,CreationFlags:function(Self) {
      return [60];
   }
   /// function TW3FlexControl.GetOrder() : Integer
   ///  [line: 357, column: 25, file: SmartCL.Flexbox]
   ,GetOrder:function(Self) {
      return w3_GetStyleAsInt(Self.FHandle$3,"order");
   }
   /// procedure TW3FlexControl.MoveTo(const NewLeft: Integer; const NewTop: Integer)
   ///  [line: 391, column: 26, file: SmartCL.Flexbox]
   ,MoveTo:function(Self, NewLeft$4, NewTop$4) {
      /* null */
   }
   /// procedure TW3FlexControl.SetBounds(const NewBounds: TRect)
   ///  [line: 399, column: 26, file: SmartCL.Flexbox]
   ,SetBounds$1:function(Self, NewBounds$1) {
      /* null */
   }
   /// procedure TW3FlexControl.SetBounds(const NewLeft: Integer; const NewTop: Integer; const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 395, column: 26, file: SmartCL.Flexbox]
   ,SetBounds:function(Self, NewLeft$5, NewTop$5, NewWidth$7, NewHeight$7) {
      /* null */
   }
   /// procedure TW3FlexControl.SetLeft(const NewLeft: Integer)
   ///  [line: 383, column: 26, file: SmartCL.Flexbox]
   ,SetLeft:function(Self, NewLeft$6) {
      /* null */
   }
   /// procedure TW3FlexControl.SetOrder(const NewOrder: Integer)
   ///  [line: 362, column: 26, file: SmartCL.Flexbox]
   ,SetOrder:function(Self, NewOrder) {
      if (TW3TagContainer.a$53(Self)!==null) {
         if (!$SetIn(TW3TagContainer.a$53(Self).FComponentState,8,0,9)) {
            Self.FHandle$3.style["order"] = NewOrder;
         }
      }
   }
   /// procedure TW3FlexControl.SetStretch(const NewValue: Boolean)
   ///  [line: 346, column: 26, file: SmartCL.Flexbox]
   ,SetStretch:function(Self, NewValue$2) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewValue$2) {
            w3_SetStyle(Self.FHandle$3,"flex",TBoolean.Binary(NewValue$2));
         } else {
            Self.FHandle$3.style.removeProperty("flex");
         }
      }
   }
   /// procedure TW3FlexControl.SetTop(const NewTop: Integer)
   ///  [line: 387, column: 26, file: SmartCL.Flexbox]
   ,SetTop:function(Self, NewTop$6) {
      /* null */
   }
   /// procedure TW3FlexControl.StyleTagObject()
   ///  [line: 328, column: 26, file: SmartCL.Flexbox]
   ,StyleTagObject:function(Self) {
      var BgColor = 0;
      TW3MovableControl.StyleTagObject(Self);
      TW3TagObj.SetDisplayMode(Self,1);
      TW3TagObj.SetPositionMode(Self,22);
      BgColor = RGBToColor(RandomInt(255),RandomInt(255),RandomInt(255));
      TW3ControlBackground.FromColor(TW3MovableControl.GetBackGround(Self),BgColor);
      Self.FHandle$3.style["order"] = 1;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo$:function($){return $.ClassType.MoveTo.apply($.ClassType, arguments)}
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1$:function($){return $.ClassType.SetBounds$1.apply($.ClassType, arguments)}
   ,SetBounds$:function($){return $.ClassType.SetBounds.apply($.ClassType, arguments)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft$:function($){return $.ClassType.SetLeft.apply($.ClassType, arguments)}
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop$:function($){return $.ClassType.SetTop.apply($.ClassType, arguments)}
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3FlexControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogControl = class (TW3FlexControl)
///  [line: 90, column: 3, file: SmartCL.Dialogs]
var TW3DialogControl = {
   $ClassName:"TW3DialogControl",$Parent:TW3FlexControl
   ,$Init:function ($) {
      TW3FlexControl.$Init($);
      $.FGroupIndex = -1;
   }
   /// function TW3DialogControl.GetContainer(var Container: TW3DialogButtonPanel) : Boolean
   ///  [line: 538, column: 27, file: SmartCL.Dialogs]
   ,GetContainer:function(Self, Container$1) {
      var Result = false;
      Container$1.v = null;
      if (TW3TagContainer.a$53(Self)!==null) {
         if ($Is(TW3TagContainer.a$53(Self),TW3DialogButtonPanel)) {
            Container$1.v = $As(TW3TagContainer.a$53(Self),TW3DialogButtonPanel);
            Result = true;
         }
      }
      return Result
   }
   /// function TW3DialogControl.GetDialogControlHost(var Handler: IW3DialogElementContainer) : Boolean
   ///  [line: 563, column: 27, file: SmartCL.Dialogs]
   ,GetDialogControlHost:function(Self, Handler$3) {
      var Result = false;
      var Container$2 = {};
      Container$2.v = null;
      Handler$3.v = null;
      if (TW3DialogControl.GetContainer(Self,Container$2)) {
         try {
            Handler$3.v = $AsIntf(Container$2.v,"IW3DialogElementContainer");
            Result = Handler$3.v!==null;
         } catch ($e) {
            /* null */
         }
      }
      return Result
   }
   /// function TW3DialogControl.GetDownStateControl(var Handler: IW3DownStateControl) : Boolean
   ///  [line: 551, column: 27, file: SmartCL.Dialogs]
   ,GetDownStateControl:function(Self, Handler$4) {
      var Result = false;
      Handler$4.v = null;
      try {
         Handler$4.v = $AsIntf(Self,"IW3DownStateControl");
         Result = Handler$4.v!==null;
      } catch ($e) {
         /* null */
      }
      return Result
   }
   /// procedure TW3DialogControl.InternalSetGroupIndex(const NewIndex: Integer)
   ///  [line: 513, column: 28, file: SmartCL.Dialogs]
   ,InternalSetGroupIndex:function(Self, NewIndex) {
      Self.FGroupIndex = NewIndex;
   }
   /// procedure TW3DialogControl.SetGroupIndex(const NewIndex: Integer)
   ///  [line: 518, column: 28, file: SmartCL.Dialogs]
   ,SetGroupIndex:function(Self, NewIndex$1) {
      var Handler$5 = {};
      Handler$5.v = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            if (TW3DialogControl.GetDownStateControl(Self,Handler$5)) {
               TW3DialogControl.InternalSetGroupIndex(Self,TInteger.EnsureRange(NewIndex$1,0,32767));
            } else {
               throw EW3Exception.CreateFmt($New(EW3DialogControl),"Method \"%s\" failed: Control doesnt implement IW3DownStateControl, cannot include in group error",["TW3DialogControl.SetGroupIndex"]);
            }
         } else {
            TW3DialogControl.InternalSetGroupIndex(Self,TInteger.EnsureRange(NewIndex$1,0,32767));
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3FlexControl.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3FlexControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3FlexControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3FlexControl.SetBounds$1
   ,SetBounds:TW3FlexControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3FlexControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3FlexControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogSeparator = class (TW3DialogControl)
///  [line: 107, column: 3, file: SmartCL.Dialogs]
var TW3DialogSeparator = {
   $ClassName:"TW3DialogSeparator",$Parent:TW3DialogControl
   ,$Init:function ($) {
      TW3DialogControl.$Init($);
   }
   /// procedure TW3DialogSeparator.StyleTagObject()
   ///  [line: 960, column: 30, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3FlexControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,15);
      TW3CustomControl.SetBorderType(Self,12);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3FlexControl.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3FlexControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3FlexControl.SetBounds$1
   ,SetBounds:TW3FlexControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3FlexControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3FlexControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogSeparator.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogResult enumeration
///  [line: 56, column: 3, file: SmartCL.Dialogs]
var TW3DialogResult = [ "roYes", "roNo", "roOK", "roCancel" ];
/// TW3DialogOption enumeration
///  [line: 46, column: 3, file: SmartCL.Dialogs]
var TW3DialogOption = [ "aoYes", "aoNo", "aoYesNo", "aoOK", "aoCancel", "aoOKCancel", "aoYesNoCancel" ];
/// TW3DialogManager = class (TW3OwnedObject)
///  [line: 220, column: 3, file: SmartCL.Dialogs]
var TW3DialogManager = {
   $ClassName:"TW3DialogManager",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.OnDialogClosedByForce = null;
      $.FDialogStack = [];
   }
   /// procedure TW3DialogManager.Clear()
   ///  [line: 333, column: 28, file: SmartCL.Dialogs]
   ,Clear$11:function(Self) {
      if (Self.FDialogStack.length>0) {
         try {
            while (Self.FDialogStack.length>0) {
               try {
                  TW3DialogManager.CloseCurrent(Self);
               } catch ($e) {
                  /* null */
               }
            }
         } finally {
            Self.FDialogStack.length=0;
         }
      }
   }
   /// procedure TW3DialogManager.CloseCurrent()
   ///  [line: 296, column: 28, file: SmartCL.Dialogs]
   ,CloseCurrent:function(Self) {
      var LDialog = null;
      var LBlockBox = null;
      if (Self.FDialogStack.length>0) {
         LDialog = TW3DialogManager.GetCurrentDialog(Self);
         if (LDialog!==null) {
            if (TW3TagContainer.a$53(LDialog)!==null) {
               if ($Is(TW3TagContainer.a$53(LDialog),TW3BlockBox)) {
                  LBlockBox = $As(TW3TagContainer.a$53(LDialog),TW3BlockBox);
                  TW3DialogManager.PopDialog(Self);
                  if (Self.OnDialogClosedByForce) {
                     Self.OnDialogClosedByForce(Self,LDialog);
                  }
                  TObject.Free(LDialog);
                  LDialog = null;
                  TObject.Free(LBlockBox);
                  LBlockBox = null;
               } else {
                  throw Exception.Create($New(EW3Exception),"Failed to close dialog, parent is not of correct type error");
               }
            } else {
               throw Exception.Create($New(EW3Exception),"Failed to close dialog, parent was nil error");
            }
         } else {
            throw Exception.Create($New(EW3Exception),"Failed to close dialog, no dialog is active error");
         }
      } else {
         throw Exception.Create($New(EW3Exception),"Failed to close dialog, no dialog is active error");
      }
   }
   /// constructor TW3DialogManager.Create(const Application: TW3CustomApplication)
   ///  [line: 278, column: 30, file: SmartCL.Dialogs]
   ,Create$142:function(Self, Application$1) {
      TW3OwnedObject.Create$11(Self,Application$1);
      return Self
   }
   /// destructor TW3DialogManager.Destroy()
   ///  [line: 283, column: 30, file: SmartCL.Dialogs]
   ,Destroy:function(Self) {
      if (Self.FDialogStack.length>0) {
         TW3DialogManager.Clear$11(Self);
      }
      TObject.Destroy(Self);
   }
   /// function TW3DialogManager.GetCurrentDialog() : TW3Dialog
   ///  [line: 290, column: 27, file: SmartCL.Dialogs]
   ,GetCurrentDialog:function(Self) {
      var Result = null;
      if (Self.FDialogStack.length>0) {
         Result = $Peek(Self.FDialogStack,"");
      }
      return Result
   }
   /// function TW3DialogManager.PopDialog() : TW3Dialog
   ///  [line: 367, column: 27, file: SmartCL.Dialogs]
   ,PopDialog:function(Self) {
      var Result = null;
      if (Self.FDialogStack.length>0) {
         Result = Self.FDialogStack.pop();
      }
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
};
TW3DialogManager.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3HeaderControl = class (TW3CustomControl)
///  [line: 48, column: 3, file: SmartCL.Controls.Header]
var TW3HeaderControl = {
   $ClassName:"TW3HeaderControl",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FBackBtn = $.FNextBtn = $.FTitle = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 67, column: 59, file: SmartCL.Controls.Header]
   ,a$124:function(Self, Value$25) {
      TW3HeaderTitle.SetCaption$4(Self.FTitle,Value$25);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 67, column: 36, file: SmartCL.Controls.Header]
   ,a$123:function(Self) {
      return TW3HeaderTitle.GetCaption$2(Self.FTitle);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 66, column: 62, file: SmartCL.Controls.Header]
   ,a$122:function(Self, Value$26) {
      TW3ToolButton.SetCaption$5(Self.FNextBtn,Value$26);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 66, column: 37, file: SmartCL.Controls.Header]
   ,a$121:function(Self) {
      return TW3ToolButton.GetCaption$3(Self.FNextBtn);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 65, column: 62, file: SmartCL.Controls.Header]
   ,a$120:function(Self, Value$27) {
      TW3ToolButton.SetCaption$5(Self.FBackBtn,Value$27);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 65, column: 37, file: SmartCL.Controls.Header]
   ,a$119:function(Self) {
      return TW3ToolButton.GetCaption$3(Self.FBackBtn);
   }
   /// function TW3HeaderControl.CreationFlags() : TW3CreationFlags
   ///  [line: 166, column: 27, file: SmartCL.Controls.Header]
   ,CreationFlags:function(Self) {
      var Result = [0];
      Result = TW3TagObj.CreationFlags(Self);
      $SetExc(Result,1,0,8);
      $SetExc(Result,2,0,8);
      $SetExc(Result,3,0,8);
      $SetExc(Result,6,0,8);
      return Result
   }
   /// procedure TW3HeaderControl.FinalizeObject()
   ///  [line: 175, column: 28, file: SmartCL.Controls.Header]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FTitle);
      TObject.Free(Self.FBackBtn);
      TObject.Free(Self.FNextBtn);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3HeaderControl.InitializeObject()
   ///  [line: 147, column: 28, file: SmartCL.Controls.Header]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3TagObj.SetDisplayMode(Self,2);
      Self.FBackBtn = TW3TagContainer.Create$86$($New(TW3HeaderButton),Self);
      TW3ToolButton.SetCaption$5(Self.FBackBtn,"Back");
      TW3MovableControl.SetSize$2$(Self.FBackBtn,84,34);
      Self.FTitle = TW3TagContainer.Create$86$($New(TW3HeaderTitle),Self);
      TW3HeaderTitle.SetCaption$4(Self.FTitle,TObject.ClassName(Self.ClassType));
      Self.FNextBtn = TW3TagContainer.Create$86$($New(TW3HeaderButton),Self);
      TW3ToolButton.SetCaption$5(Self.FNextBtn,"Next");
      TW3MovableControl.SetSize$2$(Self.FNextBtn,84,34);
   }
   /// procedure TW3HeaderControl.StyleTagObject()
   ///  [line: 183, column: 28, file: SmartCL.Controls.Header]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,13);
      TW3CustomControl.SetBorderType(Self,9);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3HeaderControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogHeader = class (TW3HeaderControl)
///  [line: 181, column: 3, file: SmartCL.Dialogs]
var TW3DialogHeader = {
   $ClassName:"TW3DialogHeader",$Parent:TW3HeaderControl
   ,$Init:function ($) {
      TW3HeaderControl.$Init($);
   }
   /// procedure TW3DialogHeader.StyleTagObject()
   ///  [line: 608, column: 27, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3HeaderControl.StyleTagObject(Self);
      TW3TagStyle.AddClassToControl(TW3CustomControl.GetTagStyle(Self).ClassType,Self.FHandle$3,"TW3HeaderControl");
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3HeaderControl.FinalizeObject
   ,InitializeObject:TW3HeaderControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3HeaderControl.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogHeader.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3GlyphContainer = class (TW3CustomControl)
///  [line: 33, column: 3, file: SmartCL.GlyphContainer]
var TW3GlyphContainer = {
   $ClassName:"TW3GlyphContainer",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.OnLoad = null;
      $.FAwesome = $.FAwesomeId = "";
      $.FColor$4 = 0;
      $.FGlyphType = 0;
      $.FImage = null;
   }
   /// procedure TW3GlyphContainer.FinalizeObject()
   ///  [line: 75, column: 29, file: SmartCL.GlyphContainer]
   ,FinalizeObject:function(Self) {
      if (Self.FImage!==null) {
         TObject.Free(Self.FImage);
         Self.FImage = null;
      }
      TW3TagObj.a$46(Self,"");
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3GlyphContainer.HandleImageReady(Sender: TObject)
   ///  [line: 86, column: 29, file: SmartCL.GlyphContainer]
   ,HandleImageReady:function(Self, Sender$9) {
      if (Self.OnLoad) {
         Self.OnLoad(Sender$9);
      }
   }
   /// procedure TW3GlyphContainer.InitializeObject()
   ///  [line: 66, column: 29, file: SmartCL.GlyphContainer]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FColor$4 = 11119017;
      Self.FGlyphType = 1;
      Self.FAwesome = "fa-bars";
      Self.FImage = null;
   }
   /// procedure TW3GlyphContainer.ObjectReady()
   ///  [line: 102, column: 29, file: SmartCL.GlyphContainer]
   ,ObjectReady:function(Self) {
      TW3MovableControl.ObjectReady(Self);
      TW3GlyphContainer.SetFAGlyph(Self,Self.FAwesome);
   }
   /// procedure TW3GlyphContainer.Resize()
   ///  [line: 108, column: 29, file: SmartCL.GlyphContainer]
   ,Resize:function(Self) {
      var FWrapper = null;
      var LBounds$1 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         wd$4 = 0,
         hd$3 = 0,
         dx$15 = 0,
         dy$16 = 0;
      TW3MovableControl.Resize(Self);
      if ($SetIn(Self.FComponentState,3,0,9)) {
         LBounds$1 = TW3MovableControl.ClientRect(Self);
         switch (Self.FGlyphType) {
            case 0 :
               if (Self.FImage!==null) {
                  TW3Image.SetFit(Self.FImage,2);
                  TW3MovableControl.SetBounds$1$(Self.FImage,LBounds$1);
               }
               break;
            case 1 :
               Self.FAwesomeId = Trim$_String_(Self.FAwesomeId);
               if (Self.FAwesomeId.length>0) {
                  if (TControlHandleHelper$Valid$2(TW3HtmlElement.QuerySelector(TW3HtmlElement,Self.FAwesomeId))) {
                     FWrapper = TW3HtmlElement.Create$143($New(TW3HtmlElement),Self.FAwesomeId);
                     wd$4 = (TW3HtmlElement.a$218(FWrapper)>0)?TW3HtmlElement.a$218(FWrapper):TW3HtmlElement.a$238(FWrapper);
                     hd$3 = (TW3HtmlElement.a$220(FWrapper)>0)?TW3HtmlElement.a$220(FWrapper):TW3HtmlElement.a$240(FWrapper);
                     if (wd$4>0&&hd$3>0) {
                        dx$15 = ($Div(TRect$Width$6(LBounds$1),2))-($Div(wd$4,2));
                        dy$16 = ($Div(TRect$Height$5(LBounds$1),2))-($Div(hd$3,2));
                        TW3HtmlElement.MoveTo$3(FWrapper,dx$15,dy$16);
                     }
                     TObject.Free(FWrapper);
                  }
               }
               break;
         }
      }
   }
   /// procedure TW3GlyphContainer.SetAwesome(const NewAwesome: String)
   ///  [line: 229, column: 29, file: SmartCL.GlyphContainer]
   ,SetAwesome:function(Self, NewAwesome) {
      if (NewAwesome!=Self.FAwesome) {
         Self.FAwesome = NewAwesome;
         if (Self.FGlyphType==1) {
            TW3GlyphContainer.SetFAGlyph(Self,Self.FAwesome);
         }
      }
   }
   /// procedure TW3GlyphContainer.SetFAGlyph(AwesomeStyle: String)
   ///  [line: 173, column: 29, file: SmartCL.GlyphContainer]
   ,SetFAGlyph:function(Self, AwesomeStyle) {
      var Template = "",
         GlyphColor$1 = "";
      AwesomeStyle = Trim$_String_(AwesomeStyle);
      if (AwesomeStyle.length>0) {
         Self.FAwesomeId = TW3Identifiers.GenerateUniqueObjectId(TW3Identifiers);
         Template = "<i id=\"%s\" style=\"%s\" class=\"fa %s\" aria-hidden=\"true\"><\/i>";
         GlyphColor$1 = ColorToWebStr(Self.FColor$4,255);
         Template = Format(Template,[Self.FAwesomeId, "position: absolute; color: "+GlyphColor$1+";", Self.FAwesome]);
         TW3TagObj.a$46(Self,Template);
         TW3MovableControl.Invalidate$(Self);
      } else {
         Self.FAwesomeId = "";
         TW3TagObj.a$46(Self,"");
         TW3MovableControl.Invalidate$(Self);
      }
   }
   /// procedure TW3GlyphContainer.SetGlyphType(const NewKind: TW3GlyphType)
   ///  [line: 200, column: 29, file: SmartCL.GlyphContainer]
   ,SetGlyphType:function(Self, NewKind) {
      if (NewKind!=Self.FGlyphType) {
         Self.FGlyphType = NewKind;
         switch (NewKind) {
            case 1 :
               if (Self.FImage!==null) {
                  TObject.Free(Self.FImage);
                  Self.FImage = null;
               }
               if (Self.FAwesome.length>0) {
                  TW3GlyphContainer.SetFAGlyph(Self,Self.FAwesome);
               }
               break;
            case 0 :
               Self.FAwesomeId = "";
               TW3TagObj.a$46(Self,"");
               Self.FImage = TW3TagContainer.Create$86$($New(TW3Image),Self);
               TW3Image.SetOnLoad(Self.FImage,$Event1(Self,TW3GlyphContainer.HandleImageReady));
               break;
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3GlyphContainer.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogGlyph = class (TW3GlyphContainer)
///  [line: 186, column: 3, file: SmartCL.Dialogs]
var TW3DialogGlyph = {
   $ClassName:"TW3DialogGlyph",$Parent:TW3GlyphContainer
   ,$Init:function ($) {
      TW3GlyphContainer.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3GlyphContainer.FinalizeObject
   ,InitializeObject:TW3GlyphContainer.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3GlyphContainer.ObjectReady
   ,Resize:TW3GlyphContainer.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogGlyph.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogCommonButton = class (TW3DialogControl)
///  [line: 113, column: 3, file: SmartCL.Dialogs]
var TW3DialogCommonButton = {
   $ClassName:"TW3DialogCommonButton",$Parent:TW3DialogControl
   ,$Init:function ($) {
      TW3DialogControl.$Init($);
      $.FCaption$1 = "";
   }
   /// procedure TW3DialogCommonButton.CBClick(EventObj: JEvent)
   ///  [line: 993, column: 33, file: SmartCL.Dialogs]
   ,CBClick:function(Self, EventObj$5) {
      var Handler$6 = {};
      Handler$6.v = null;
      if (TW3DialogControl.GetDialogControlHost(Self,Handler$6)) {
         Handler$6.v[2](Self);
      }
      TW3CustomControl.CBClick(Self,EventObj$5);
   }
   /// procedure TW3DialogCommonButton.InitializeObject()
   ///  [line: 973, column: 33, file: SmartCL.Dialogs]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3DialogControl.InternalSetGroupIndex(Self,0);
   }
   /// procedure TW3DialogCommonButton.InternalSetCaption(const NewCaption: String)
   ///  [line: 1003, column: 33, file: SmartCL.Dialogs]
   ,InternalSetCaption:function(Self, NewCaption$1) {
      TW3TagObj.BeginUpdate(Self);
      Self.FCaption$1 = NewCaption$1;
      TW3TagObj.a$46(Self,NewCaption$1);
      TW3TagObj.EndUpdate(Self);
   }
   /// function TW3DialogCommonButton.MakeElementTagObj() : TControlHandle
   ///  [line: 979, column: 32, file: SmartCL.Dialogs]
   ,MakeElementTagObj:function(Self) {
      return w3_CreateHtmlElement("button");
   }
   /// procedure TW3DialogCommonButton.SetCaption(const NewCaption: String)
   ///  [line: 1011, column: 33, file: SmartCL.Dialogs]
   ,SetCaption$1:function(Self, NewCaption$2) {
      var Temp$3 = "";
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Temp$3 = Trim$_String_(NewCaption$2);
         if (Temp$3!=Self.FCaption$1) {
            TW3DialogCommonButton.InternalSetCaption(Self,Temp$3);
         }
      }
   }
   /// procedure TW3DialogCommonButton.StyleTagObject()
   ///  [line: 984, column: 33, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3FlexControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,9);
      TW3CustomControl.SetBorderType(Self,5);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3FlexControl.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3FlexControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3FlexControl.SetBounds$1
   ,SetBounds:TW3FlexControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3FlexControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3FlexControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogCommonButton.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3FlexContainer = class (TW3CustomControl)
///  [line: 104, column: 3, file: SmartCL.Flexbox]
var TW3FlexContainer = {
   $ClassName:"TW3FlexContainer",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FFlexAlignContent = 1;
      $.FFlexAlignItems = 0;
      $.FOrder = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 134, column: 35, file: SmartCL.Flexbox]
   ,a$127:function(Self) {
      return TW3TagContainer.GetChildCount(Self);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 133, column: 20, file: SmartCL.Flexbox]
   ,a$126:function(Self, index$1) {
      return $As(TW3TagContainer.GetChildObject(Self,index$1),TW3FlexControl);
   }
   /// procedure TW3FlexContainer.ChildAdded(const NewChild: TW3TagContainer)
   ///  [line: 313, column: 28, file: SmartCL.Flexbox]
   ,ChildAdded:function(Self, NewChild$1) {
      if ($Is(NewChild$1,TW3FlexControl)) {
         ++Self.FOrder;
         TW3FlexControl.SetOrder($As(NewChild$1,TW3FlexControl),Self.FOrder);
      } else {
         throw Exception.Create($New(EW3Exception),"Only TW3FlexControl based elements can be hosted by this control");
      }
   }
   /// procedure TW3FlexContainer.Clear()
   ///  [line: 198, column: 28, file: SmartCL.Flexbox]
   ,Clear$12:function(Self) {
      var items$3 = [],
         x$75 = 0;
      TW3TagObj.BeginUpdate(Self);
      try {
         items$3 = TW3TagContainer.GetChildren(Self);
         var $temp42;
         for(x$75=0,$temp42=items$3.length;x$75<$temp42;x$75++) {
            TObject.Free(items$3[x$75]);
         }
      } finally {
         Self.FOrder = 0;
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3FlexContainer.SetFlexAlignContent(const NewAlign: TW3FlexAlignContent)
   ///  [line: 286, column: 28, file: SmartCL.Flexbox]
   ,SetFlexAlignContent:function(Self, NewAlign) {
      var token = "",
         value$20 = "";
      if (NewAlign!=Self.FFlexAlignContent) {
         Self.FFlexAlignContent = NewAlign;
         token = TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"justify-content");
         value$20 = AlignContentLUT[NewAlign];
         Self.FHandle$3.style[token] = value$20;
         Self.FHandle$3.style["justify-content"] = value$20;
      }
   }
   /// procedure TW3FlexContainer.SetFlexAlignItems(const NewAlign: TW3FlexAlignItems)
   ///  [line: 259, column: 28, file: SmartCL.Flexbox]
   ,SetFlexAlignItems:function(Self, NewAlign$1) {
      var token$1 = "",
         value$21 = "";
      if (NewAlign$1!=Self.FFlexAlignItems) {
         Self.FFlexAlignItems = NewAlign$1;
         token$1 = TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"align-items");
         value$21 = AlignItemsLUT[NewAlign$1];
         Self.FHandle$3.style[token$1] = value$21;
         Self.FHandle$3.style["align-items"] = value$21;
      }
   }
   /// procedure TW3FlexContainer.StyleTagObject()
   ///  [line: 183, column: 28, file: SmartCL.Flexbox]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3TagObj.SetDisplayMode(Self,2);
      Self.FHandle$3.style["justify-content"] = "flex-start";
      Self.FHandle$3.style[TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"justify-content")] = "flex-start";
      Self.FHandle$3.style["flex-direction"] = "row";
      Self.FHandle$3.style[TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"flex-direction")] = "row";
      Self.FHandle$3.style["flex-wrap"] = "nowrap";
      Self.FHandle$3.style[TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"flex-wrap")] = "nowrap";
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded$:function($){return $.ClassType.ChildAdded.apply($.ClassType, arguments)}
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3FlexContainer.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogButtonPanel = class (TW3FlexContainer)
///  [line: 147, column: 3, file: SmartCL.Dialogs]
var TW3DialogButtonPanel = {
   $ClassName:"TW3DialogButtonPanel",$Parent:TW3FlexContainer
   ,$Init:function ($) {
      TW3FlexContainer.$Init($);
      $.OnControlDown = null;
      $.OnControlClicked = null;
      $.UseDefaultSizes = false;
      $.FButtonSize = 89;
      $.FSeperatorSize = 32;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 166, column: 22, file: SmartCL.Dialogs]
   ,a$128:function(Self, index$2) {
      return $As(TW3FlexContainer.a$126(Self,index$2),TW3DialogButton);
   }
   /// procedure TW3DialogButtonPanel.ChildAdded(const NewChild: TW3TagContainer)
   ///  [line: 655, column: 32, file: SmartCL.Dialogs]
   ,ChildAdded:function(Self, NewChild$2) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if ($Is(NewChild$2,TW3DialogControl)) {
            if (Self.UseDefaultSizes) {
               if ($Is(NewChild$2,TW3DialogButton)) {
                  if (Self.FButtonSize>0) {
                     TW3MovableControl.SetWidth$($As(NewChild$2,TW3DialogButton),Self.FButtonSize);
                  }
               } else if ($Is(NewChild$2,TW3DialogSeparator)) {
                  if (Self.FSeperatorSize>0) {
                     TW3MovableControl.SetWidth$($As(NewChild$2,TW3DialogSeparator),Self.FSeperatorSize);
                  }
               }
            }
            if ($SetIn(Self.FComponentState,3,0,9)) {
               TW3MovableControl.Invalidate$(Self);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3DialogContainer),"Method %s failed, only TW3DialogControl based controls can be hosted by %s",["TW3DialogButtonPanel.ChildAdded", TObject.ClassName(Self.ClassType)]);
         }
      }
      TW3FlexContainer.ChildAdded(Self,NewChild$2);
   }
   /// procedure TW3DialogButtonPanel.ChildElementClicked(const Child: TW3DialogControl)
   ///  [line: 817, column: 32, file: SmartCL.Dialogs]
   ,ChildElementClicked:function(Self, Child$6) {
      if (Self.OnControlClicked) {
         Self.OnControlClicked(Self,Child$6);
      }
   }
   /// procedure TW3DialogButtonPanel.ChildElementDown(const Child: TW3DialogControl)
   ///  [line: 811, column: 32, file: SmartCL.Dialogs]
   ,ChildElementDown:function(Self, Child$7) {
      if (Self.OnControlDown) {
         Self.OnControlDown(Self,Child$7);
      }
   }
   /// procedure TW3DialogButtonPanel.ChildRemoved(const OldChild: TW3TagContainer)
   ///  [line: 691, column: 32, file: SmartCL.Dialogs]
   ,ChildRemoved:function(Self, OldChild$1) {
      var GroupIndex$2 = 0,
         button$3 = null,
         Others = [],
         index$3 = 0,
         NextButton$1 = null;
      var LAccess$2 = {};
      LAccess$2.v = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if ($Is(OldChild$1,TW3DialogControl)) {
            GroupIndex$2 = $As(OldChild$1,TW3DialogControl).FGroupIndex;
            if (GroupIndex$2>0) {
               if ($Is(OldChild$1,TW3DialogButton)) {
                  button$3 = $As(OldChild$1,TW3DialogButton);
                  if (button$3.FDown) {
                     if (!button$3.AllowAllUp) {
                        Others = TW3DialogButtonPanel.GetGroupMembers(Self,GroupIndex$2);
                        if (Others.length>0) {
                           index$3 = Others.indexOf(button$3);
                           if (!index$3) {
                              NextButton$1 = Others[1];
                           } else if (index$3==(Others.length-1)) {
                              NextButton$1 = Others[(Others.length-1)-1];
                           } else {
                              NextButton$1 = Others[index$3+1];
                           }
                           if (NextButton$1!==null) {
                              try {
                                 if (TW3DialogControl.GetDownStateControl(NextButton$1,LAccess$2)) {
                                    LAccess$2.v[1](true);
                                 }
                              } catch ($e) {
                                 /* null */
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
      TW3TagContainer.ChildRemoved(Self,OldChild$1);
   }
   /// procedure TW3DialogButtonPanel.ClearSelectedInGroup(const GroupIndex: Integer)
   ///  [line: 787, column: 32, file: SmartCL.Dialogs]
   ,ClearSelectedInGroup:function(Self, GroupIndex$3) {
      var Access$2 = {};
      Access$2.v = null;
      var Children$1 = [],
         a$344 = 0;
      var obj = null,
         item$7 = null;
      Children$1 = TW3TagContainer.GetChildren(Self);
      var $temp43;
      for(a$344=0,$temp43=Children$1.length;a$344<$temp43;a$344++) {
         obj = Children$1[a$344];
         if ($Is(obj,TW3DialogControl)) {
            item$7 = $As(obj,TW3DialogControl);
            if (item$7.FGroupIndex==GroupIndex$3) {
               if (TW3DialogControl.GetDownStateControl(item$7,Access$2)) {
                  if (Access$2.v[0]()) {
                     Access$2.v[1](false);
                  }
               }
            }
         }
      }
   }
   /// function TW3DialogButtonPanel.GetGroupMembers(const GroupIndex: Integer) : TW3DialogControlList
   ///  [line: 758, column: 31, file: SmartCL.Dialogs]
   ,GetGroupMembers:function(Self, GroupIndex$4) {
      var Result = [];
      var x$76 = 0;
      var obj$1 = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         var $temp44;
         for(x$76=0,$temp44=TW3FlexContainer.a$127(Self);x$76<$temp44;x$76++) {
            obj$1 = TW3DialogButtonPanel.a$128(Self,x$76);
            if (obj$1.FGroupIndex==GroupIndex$4) {
               if (Result.indexOf(obj$1)<0) {
                  Result.push(obj$1);
               }
            }
         }
      }
      return Result
   }
   /// procedure TW3DialogButtonPanel.SetDefaultButtonSize(const NewSize: Integer)
   ///  [line: 641, column: 32, file: SmartCL.Dialogs]
   ,SetDefaultButtonSize:function(Self, NewSize$3) {
      var Temp$4 = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Temp$4 = TInteger.EnsureRange(NewSize$3,0,32767);
         if (Temp$4!=Self.FButtonSize) {
            TW3TagObj.BeginUpdate(Self);
            Self.FButtonSize = Temp$4;
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3DialogButtonPanel.SetDefaultSeperatorSize(const NewSize: Integer)
   ///  [line: 627, column: 32, file: SmartCL.Dialogs]
   ,SetDefaultSeperatorSize:function(Self, NewSize$4) {
      var Temp$5 = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Temp$5 = TInteger.EnsureRange(NewSize$4,0,32767);
         if (Temp$5!=Self.FSeperatorSize) {
            TW3TagObj.BeginUpdate(Self);
            Self.FSeperatorSize = Temp$5;
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3DialogButtonPanel.StyleTagObject()
   ///  [line: 618, column: 32, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3FlexContainer.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,13);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded$:function($){return $.ClassType.ChildAdded.apply($.ClassType, arguments)}
   ,ChildRemoved$:function($){return $.ClassType.ChildRemoved.apply($.ClassType, arguments)}
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogButtonPanel.$Intf={
   IW3DialogElementContainer:[TW3DialogButtonPanel.ClearSelectedInGroup,TW3DialogButtonPanel.ChildElementDown,TW3DialogButtonPanel.ChildElementClicked]
   ,IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DialogButton = class (TW3DialogCommonButton)
///  [line: 131, column: 3, file: SmartCL.Dialogs]
var TW3DialogButton = {
   $ClassName:"TW3DialogButton",$Parent:TW3DialogCommonButton
   ,$Init:function ($) {
      TW3DialogCommonButton.$Init($);
      $.AllowAllUp = $.FDown = false;
   }
   /// procedure TW3DialogButton.CBClick(EventObj: JEvent)
   ///  [line: 1025, column: 27, file: SmartCL.Dialogs]
   ,CBClick:function(Self, EventObj$6) {
      var LState = false;
      if (Self.FGroupIndex>0) {
         LState = TW3DialogButton.GetDownState(Self);
         if (LState) {
            return;
         } else {
            TW3DialogButton.SetDownState(Self,(!LState));
         }
      }
      TW3DialogCommonButton.CBClick(Self,EventObj$6);
   }
   /// function TW3DialogButton.GetDownState() : Boolean
   ///  [line: 1039, column: 26, file: SmartCL.Dialogs]
   ,GetDownState:function(Self) {
      return Self.FDown;
   }
   /// procedure TW3DialogButton.SetDownState(const NewDownState: Boolean)
   ///  [line: 1044, column: 27, file: SmartCL.Dialogs]
   ,SetDownState:function(Self, NewDownState) {
      var Handler$7 = {};
      Handler$7.v = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewDownState!=Self.FDown) {
            if (Self.FGroupIndex>0) {
               if (Self.FDown) {
                  if (Self.AllowAllUp) {
                     Self.FDown = false;
                  }
               } else if (TW3DialogControl.GetDialogControlHost(Self,Handler$7)) {
                  Handler$7.v[0](Self.FGroupIndex);
               }
            }
            if (Self.FDown) {
               TW3CustomControl.SetBackgroundType(Self,14);
               TW3CustomControl.SetBorderType(Self,10);
               Self.FDown = false;
            } else {
               TW3CustomControl.SetBackgroundType(Self,10);
               TW3CustomControl.SetBorderType(Self,6);
               Self.FDown = true;
            }
            if (TW3DialogControl.GetDialogControlHost(Self,Handler$7)) {
               Handler$7.v[1](Self);
            }
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3DialogCommonButton.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3FlexControl.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3DialogCommonButton.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3DialogCommonButton.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3FlexControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3FlexControl.SetBounds$1
   ,SetBounds:TW3FlexControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3FlexControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3FlexControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3DialogButton.$Intf={
   IW3DownStateControl:[TW3DialogButton.GetDownState,TW3DialogButton.SetDownState]
   ,IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Dialog = class (TW3CustomControl)
///  [line: 191, column: 3, file: SmartCL.Dialogs]
var TW3Dialog = {
   $ClassName:"TW3Dialog",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.OnOptionSelected = null;
      $.FButtonRow = $.FGlyph = $.Fheader = $.FText$1 = null;
      $.FOptions$6 = 0;
   }
   /// function TW3Dialog.AddButton(Caption: String; ResultValue: TW3DialogResult) : TW3DialogButton
   ///  [line: 900, column: 20, file: SmartCL.Dialogs]
   ,AddButton:function(Self, Caption$8, ResultValue) {
      var Result = null;
      Result = TW3TagContainer.Create$86$($New(TW3DialogButton),Self.FButtonRow);
      Result.TagValue = ResultValue;
      TW3DialogCommonButton.SetCaption$1(Result,Caption$8);
      TW3FlexControl.SetStretch(Result,true);
      TW3CustomControl._setMouseClick(Result,function (Sender$10) {
         if (Self.OnOptionSelected) {
            Self.OnOptionSelected(Self,Result.TagValue);
         }
      });
      return Result
   }
   /// procedure TW3Dialog.FinalizeObject()
   ///  [line: 853, column: 21, file: SmartCL.Dialogs]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FButtonRow);
      TObject.Free(Self.Fheader);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3Dialog.InitializeObject()
   ///  [line: 827, column: 21, file: SmartCL.Dialogs]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.Fheader = TW3TagContainer.Create$86$($New(TW3DialogHeader),Self);
      TW3MovableControl.SetVisible(Self.Fheader.FBackBtn,false);
      TW3MovableControl.SetVisible(Self.Fheader.FNextBtn,false);
      Self.FButtonRow = TW3TagContainer.Create$86$($New(TW3DialogButtonPanel),Self);
      TW3FlexContainer.SetFlexAlignContent(Self.FButtonRow,4);
      TW3FlexContainer.SetFlexAlignItems(Self.FButtonRow,1);
      Self.FGlyph = TW3TagContainer.Create$86$($New(TW3DialogGlyph),Self);
      TW3GlyphContainer.SetGlyphType(Self.FGlyph,1);
      TW3GlyphContainer.SetAwesome(Self.FGlyph,"fa-5x fa-exclamation-triangle");
      Self.FText$1 = TW3TagContainer.Create$86$($New(TW3Label),Self);
      TW3Label.SetVAlign(Self.FText$1,1);
      TW3Label.SetHAlign(Self.FText$1,1);
      TW3Label.SetWordWrap(Self.FText$1,true);
      TW3CustomFont.SetColor$2$(TW3CustomControl.a$57(Self.FText$1),16777215);
      TW3Label.SetCaption$2(Self.FText$1,"<u><b>Dear Customer<\/b><\/u><br><br>\r\n  You are about to delete the internet.<br>\r\n  Are you sure you wish to destroy civilization?");
   }
   /// procedure TW3Dialog.Resize()
   ///  [line: 922, column: 21, file: SmartCL.Dialogs]
   ,Resize:function(Self) {
      var LBounds$2 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         hd$4 = 0,
         wd$5 = 0,
         dy$17 = 0,
         dx$16 = 0;
      TW3MovableControl.Resize(Self);
      if (Self.FButtonRow!==null) {
         if (Self.Fheader!==null) {
            if (Self.FGlyph!==null) {
               LBounds$2 = TW3MovableControl.ClientRect(Self);
               hd$4 = TRect$Height$5(LBounds$2);
               wd$5 = LBounds$2.Bottom$1-TW3MovableControl.GetHeight$(Self.FButtonRow);
               TW3MovableControl.SetBounds$(Self.FButtonRow,LBounds$2.Left$3,wd$5,TRect$Width$6(LBounds$2),TW3MovableControl.GetHeight$(Self.FButtonRow));
               (hd$4-= TW3MovableControl.GetHeight$(Self.FButtonRow));
               TW3MovableControl.SetBounds$(Self.Fheader,LBounds$2.Left$3,LBounds$2.Top$3,TRect$Width$6(LBounds$2),TW3MovableControl.GetHeight$(Self.Fheader));
               (hd$4-= TW3MovableControl.GetHeight$(Self.Fheader));
               dy$17 = LBounds$2.Top$3+TW3MovableControl.GetHeight$(Self.Fheader)+4;
               (hd$4-= 8);
               TW3MovableControl.SetBounds$(Self.FGlyph,(LBounds$2.Left$3+4),dy$17,88,hd$4);
               dx$16 = LBounds$2.Left$3+TW3MovableControl.GetWidth$(Self.FGlyph)+8;
               TW3MovableControl.SetBounds$(Self.FText$1,dx$16,dy$17,(TRect$Width$6(LBounds$2)-dx$16-4),hd$4);
            }
         }
      }
   }
   /// procedure TW3Dialog.SetOptions(const NewOptions: TW3DialogOption)
   ///  [line: 860, column: 21, file: SmartCL.Dialogs]
   ,SetOptions:function(Self, NewOptions$1) {
      TW3FlexContainer.Clear$12(Self.FButtonRow);
      switch (NewOptions$1) {
         case 0 :
            TW3Dialog.AddButton(Self,"Yes",0);
            break;
         case 1 :
            TW3Dialog.AddButton(Self,"No",1);
            break;
         case 2 :
            TW3Dialog.AddButton(Self,"Yes",0);
            TW3Dialog.AddButton(Self,"No",1);
            break;
         case 4 :
            TW3Dialog.AddButton(Self,"Cancel",2);
            break;
         case 3 :
            TW3Dialog.AddButton(Self,"OK",2);
            break;
         case 5 :
            TW3Dialog.AddButton(Self,"OK",2);
            TW3Dialog.AddButton(Self,"Cancel",3);
            break;
         case 6 :
            TW3Dialog.AddButton(Self,"Yes",0);
            TW3Dialog.AddButton(Self,"No",1);
            TW3Dialog.AddButton(Self,"Cancel",3);
            break;
      }
   }
   /// procedure TW3Dialog.StyleTagObject()
   ///  [line: 913, column: 21, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,1);
      TW3CustomControl.SetBorderType(Self,12);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3Dialog.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// EW3DialogControl = class (EW3Exception)
///  [line: 35, column: 3, file: SmartCL.Dialogs]
var EW3DialogControl = {
   $ClassName:"EW3DialogControl",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3DialogContainer = class (EW3Exception)
///  [line: 34, column: 3, file: SmartCL.Dialogs]
var EW3DialogContainer = {
   $ClassName:"EW3DialogContainer",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3ThemeBorder enumeration
///  [line: 45, column: 3, file: SmartCL.Theme]
var TW3ThemeBorder = [ "btNone", "btFlatBorder", "btControlBorder", "btContainerBorder", "btButtonBorder", "btDialogButtonBorder", "btDecorativeBorder", "btEditBorder", "btListBorder", "btToolContainerBorder", "btToolButtonBorder", "btToolControlBorder", "btToolControlFlatBorder", "btListMenuBorder" ];
/// TW3ThemeBackground enumeration
///  [line: 26, column: 3, file: SmartCL.Theme]
var TW3ThemeBackground = [ "bsNone", "bsDisplayBackground", "bsControlBackground", "bsContainerBackground", "bsListBackground", "bsListItemBackground", "bsListItemSelectedBackground", "bsEditBackground", "bsButtonBackground", "bsDialogButtonBackground", "bsDecorativeBackground", "bsDecorativeInvertBackground", "bsDecorativeDarkBackground", "bsToolContainerBackground", "bsToolButtonBackground", "bsToolControlBackground" ];
function SetupThemeLookupTables() {
   BackgroundNameLUT = TW3CustomDictionary.Create$127($New(TW3IntDictionary));
   BorderNameLUT = TW3CustomDictionary.Create$127($New(TW3IntDictionary));
   TW3IntDictionary.a$80(BackgroundNameLUT,"none",0);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3DisplayBackground",1);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ControlBackground",2);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ContainerBackground",3);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ListBackground",4);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ListItemBackground",5);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ListItemSelectedBackground",6);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3EditBackground",7);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ButtonBackground",8);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3DialogButtonBackground",9);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3DecorativeBackground",10);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3DecorativeBackgroundInvert",11);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3DecorativeDarkBackground",12);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ToolContainerBackground",13);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ToolButtonBackground",14);
   TW3IntDictionary.a$80(BackgroundNameLUT,"TW3ToolControlBackground",15);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3FlatBorder",1);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ControlBorder",2);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ContainerBorder",3);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ButtonBorder",4);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3DialogButtonBorder",5);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3DecorativeBorder",6);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3EditBorder",7);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ListBorder",8);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ToolContainerBorder",9);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ToolButtonBorder",10);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ToolControlBorder",11);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ToolFlatBorder",12);
   TW3IntDictionary.a$80(BorderNameLUT,"TW3ListMenuBorder",13);
};
/// TW3FlexWrap enumeration
///  [line: 57, column: 3, file: SmartCL.Flexbox]
var TW3FlexWrap = [ "fwNoWrap", "fwWrap" ];
/// TW3FlexDirection enumeration
///  [line: 49, column: 3, file: SmartCL.Flexbox]
var TW3FlexDirection = [ "fdRow", "fdColumn" ];
/// TW3FlexAlignItems enumeration
///  [line: 39, column: 3, file: SmartCL.Flexbox]
var TW3FlexAlignItems = [ "faiNone", "faiStretch", "faiCenter", "faiFlexStart", "faiFlexEnd", "faiBaseline" ];
/// TW3FlexAlignContent enumeration
///  [line: 30, column: 3, file: SmartCL.Flexbox]
var TW3FlexAlignContent = [ "facNone", "facLeft", "facCenter", "facRight", "facSpaceBetween", "facSpaceAround" ];
/// TW3SystemEventHandler = class (TW3OwnedObject)
///  [line: 39, column: 3, file: System.Events]
var TW3SystemEventHandler = {
   $ClassName:"TW3SystemEventHandler",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.OnEvent = null;
      $.FAttached = false;
      $.FEventName = "";
   }
   /// procedure TW3SystemEventHandler.Attach(NameOfEvent: String)
   ///  [line: 78, column: 33, file: System.Events]
   ,Attach:function(Self, NameOfEvent) {
      if (Self.FAttached) {
         TW3SystemEventHandler.Detach(Self);
      }
      NameOfEvent = Trim$_String_(NameOfEvent);
      if (NameOfEvent.length>0) {
         Self.FEventName = NameOfEvent;
         try {
            TW3SystemEventHandler.DoAttach$(Self);
         } catch ($e) {
            var e$34 = $W($e);
            Self.FEventName = "";
            throw EW3Exception.CreateFmt($New(EW3SystemEventError),"Failed to detach event, system threw exception %s with message [%s] error",[TObject.ClassName(e$34.ClassType), e$34.FMessage]);
         }
      } else {
         throw Exception.Create($New(Exception),"Failed to attach event, invalid event-name error");
      }
   }
   /// destructor TW3SystemEventHandler.Destroy()
   ///  [line: 65, column: 34, file: System.Events]
   ,Destroy:function(Self) {
      if (Self.FAttached) {
         try {
            TW3SystemEventHandler.Detach(Self);
         } catch ($e) {
            var e$35 = $W($e);
            /* null */
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3SystemEventHandler.Detach()
   ///  [line: 108, column: 33, file: System.Events]
   ,Detach:function(Self) {
      if (Self.FAttached) {
         try {
            try {
               TW3SystemEventHandler.DoDetach$(Self);
            } catch ($e) {
               var e$36 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3SystemEventError),"Failed to detach event, system threw exception %s with message [%s] error",[TObject.ClassName(e$36.ClassType), e$36.FMessage]);
            }
         } finally {
            Self.FEventName = "";
         }
      } else {
         throw Exception.Create($New(EW3SystemEventError),"Failed to detach event, not attached error");
      }
   }
   /// procedure TW3SystemEventHandler.DoHandleEvent(const EventObj: Variant)
   ///  [line: 133, column: 33, file: System.Events]
   ,DoHandleEvent:function(Self, EventObj$7) {
      if (Self.OnEvent) {
         Self.OnEvent(Self,EventObj$7);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
   ,DoAttach$:function($){return $.ClassType.DoAttach($)}
   ,DoDetach$:function($){return $.ClassType.DoDetach($)}
   ,DoHandleEvent$:function($){return $.ClassType.DoHandleEvent.apply($.ClassType, arguments)}
};
TW3SystemEventHandler.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// EW3SystemEventError = class (EW3Exception)
///  [line: 37, column: 3, file: System.Events]
var EW3SystemEventError = {
   $ClassName:"EW3SystemEventError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3GlyphType enumeration
///  [line: 28, column: 3, file: SmartCL.GlyphContainer]
var TW3GlyphType = [ "lgtPicture", "lgtFontAwesome" ];
/// TW3HtmlElement = class (TObject)
///  [line: 266, column: 3, file: SmartCL.ControlWrapper]
var TW3HtmlElement = {
   $ClassName:"TW3HtmlElement",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$13 = undefined;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 333, column: 21, file: SmartCL.ControlWrapper]
   ,a$241:function(Self, Value$28) {
      Self.FHandle$13.scrollHeight = TW3HtmlElement.IntToPixels(Self,Value$28);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 332, column: 21, file: SmartCL.ControlWrapper]
   ,a$240:function(Self) {
      return TW3HtmlElement.ValueToInt(Self,Self.FHandle$13.scrollHeight);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 329, column: 21, file: SmartCL.ControlWrapper]
   ,a$239:function(Self, Value$29) {
      Self.FHandle$13.scrollWidth = TW3HtmlElement.IntToPixels(Self,Value$29);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 328, column: 21, file: SmartCL.ControlWrapper]
   ,a$238:function(Self) {
      return TW3HtmlElement.ValueToInt(Self,Self.FHandle$13.scrollWidth);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 291, column: 21, file: SmartCL.ControlWrapper]
   ,a$221:function(Self, Value$30) {
      Self.FHandle$13.height = TW3HtmlElement.IntToPixels(Self,Value$30);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 290, column: 20, file: SmartCL.ControlWrapper]
   ,a$220:function(Self) {
      return TW3HtmlElement.ValueToInt(Self,Self.FHandle$13.height);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 287, column: 21, file: SmartCL.ControlWrapper]
   ,a$219:function(Self, Value$31) {
      Self.FHandle$13.width = TW3HtmlElement.IntToPixels(Self,Value$31);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 286, column: 20, file: SmartCL.ControlWrapper]
   ,a$218:function(Self) {
      return TW3HtmlElement.ValueToInt(Self,Self.FHandle$13.width);
   }
   /// constructor TW3HtmlElement.Create(TagHandle: TControlHandle)
   ///  [line: 423, column: 28, file: SmartCL.ControlWrapper]
   ,Create$145:function(Self, TagHandle) {
      TObject.Create(Self);
      Self.FHandle$13 = TagHandle;
      return Self
   }
   /// constructor TW3HtmlElement.Create(Parent: TControlHandle; TagId: String)
   ///  [line: 429, column: 28, file: SmartCL.ControlWrapper]
   ,Create$144:function(Self, Parent$5, TagId$2) {
      TObject.Create(Self);
      Self.FHandle$13 = TControlHandleHelper$GetChildById(Parent$5,TagId$2);
      return Self
   }
   /// constructor TW3HtmlElement.Create(TagId: String)
   ///  [line: 415, column: 28, file: SmartCL.ControlWrapper]
   ,Create$143:function(Self, TagId$3) {
      TObject.Create(Self);
      Self.FHandle$13 = document.body.querySelector("#"+Trim$_String_(TagId$3));
      if (!TControlHandleHelper$Valid$2(Self.FHandle$13)) {
         throw EW3Exception.CreateFmt($New(EW3Exception),"Failed to locate selector [%s] error",[TagId$3]);
      }
      return Self
   }
   /// function TW3HtmlElement.IntToPixels(const Value: Integer) : String
   ///  [line: 462, column: 25, file: SmartCL.ControlWrapper]
   ,IntToPixels:function(Self, Value$32) {
      return Value$32.toString()+"px";
   }
   /// procedure TW3HtmlElement.MoveTo(const NewLeft: Integer; const NewTop: Integer)
   ///  [line: 488, column: 26, file: SmartCL.ControlWrapper]
   ,MoveTo$3:function(Self, NewLeft$7, NewTop$7) {
      Self.FHandle$13.style["left"] = TW3HtmlElement.IntToPixels(Self,NewLeft$7);
      Self.FHandle$13.style["top"] = TW3HtmlElement.IntToPixels(Self,NewTop$7);
   }
   /// function TW3HtmlElement.QuerySelector(const Id: String) : TControlHandle
   ///  [line: 527, column: 31, file: SmartCL.ControlWrapper]
   ,QuerySelector:function(Self, Id$2) {
      return document.body.querySelector("#"+Trim$_String_(Id$2));
   }
   /// function TW3HtmlElement.ValueToInt(const Value: Variant) : Integer
   ///  [line: 467, column: 25, file: SmartCL.ControlWrapper]
   ,ValueToInt:function(Self, Value$33) {
      var Result = 0;
      if (Value$33)
    {
      if (typeof(Value$33) === "number") {
        Result = Value$33
      } else {
        if (typeof(Value$33) === "string")
        {
          Value$33 = parseInt(Value$33);
          if (!isNaN(Value$33))
            Result = Value$33;
        }
      }
    } else {
      Result = 0;
    }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TW3ImageFittingStyle enumeration
///  [line: 22, column: 3, file: SmartCL.Controls.Image]
var TW3ImageFittingStyle = [ "fsNone", "fsFill", "fsContain", "fsCover", "fsScaleDown" ];
/// TW3Image = class (TW3CustomControl)
///  [line: 30, column: 3, file: SmartCL.Controls.Image]
var TW3Image = {
   $ClassName:"TW3Image",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCallbacks = [];
      $.FOnLoad = null;
   }
   /// procedure TW3Image.CBOnLoad()
   ///  [line: 105, column: 20, file: SmartCL.Controls.Image]
   ,CBOnLoad:function(Self) {
      var x$77 = 0;
      if (Self.FCallbacks.length>0) {
         try {
            var $temp45;
            for(x$77=0,$temp45=Self.FCallbacks.length;x$77<$temp45;x$77++) {
               try {
                  Self.FCallbacks[x$77](true);
               } catch ($e) {
                  /* null */
               }
            }
         } finally {
            Self.FCallbacks.length=0;
         }
      }
      if (Self.FOnLoad) {
         Self.FOnLoad(Self);
      }
   }
   /// function TW3Image.GetComplete() : Boolean
   ///  [line: 199, column: 19, file: SmartCL.Controls.Image]
   ,GetComplete:function(Self) {
      var Result = false;
      Result = false;
      if (Self.FHandle$3) {
         if (Self.FHandle$3.complete) {
            Result = (Self.FHandle$3.complete?true:false);
         }
      }
      return Result
   }
   /// function TW3Image.GetEnabled() : Boolean
   ///  [line: 226, column: 19, file: SmartCL.Controls.Image]
   ,GetEnabled$1:function(Self) {
      return true;
   }
   /// function TW3Image.GetFit() : TW3ImageFittingStyle
   ///  [line: 158, column: 19, file: SmartCL.Controls.Image]
   ,GetFit:function(Self) {
      var Result = 0;
      var LValue$1;
      Result = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
         LValue$1 = Self.FHandle$3.style["object-fit"];
         if (TW3VariantHelper$Valid$3(LValue$1)) {
            if (TVariant.IsString(LValue$1)) {
               {var $temp46 = (String(LValue$1)).toLocaleLowerCase();
                  if ($temp46=="none") {
                     return Result;
                  }
                   else if ($temp46=="") {
                     return Result;
                  }
                   else if ($temp46=="fill") {
                     Result = 1;
                  }
                   else if ($temp46=="contain") {
                     Result = 2;
                  }
                   else if ($temp46=="cover") {
                     Result = 3;
                  }
                   else if ($temp46=="scale-down") {
                     Result = 4;
                  }
               }
            }
         }
      }
      return Result
   }
   /// function TW3Image.GetHeight() : Integer
   ///  [line: 263, column: 19, file: SmartCL.Controls.Image]
   ,GetHeight:function(Self) {
      var Result = 0;
      Result = TW3MovableControl.GetHeight(Self);
      if (!Result) {
         if (Self.FHandle$3) {
            Result = parseInt(Self.FHandle$3.height,10);
         }
      }
      return Result
   }
   /// function TW3Image.GetPixelheight() : Integer
   ///  [line: 240, column: 20, file: SmartCL.Controls.Image]
   ,GetPixelheight:function(Self) {
      var Result = 0;
      if (TW3Image.GetReady(Self)) {
         Result = parseInt(Self.FHandle$3.naturalHeight,10);
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TW3Image.GetPixelWidth() : Integer
   ///  [line: 233, column: 19, file: SmartCL.Controls.Image]
   ,GetPixelWidth:function(Self) {
      var Result = 0;
      if (TW3Image.GetReady(Self)) {
         Result = parseInt(Self.FHandle$3.naturalWidth,10);
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TW3Image.GetReady() : Boolean
   ///  [line: 209, column: 19, file: SmartCL.Controls.Image]
   ,GetReady:function(Self) {
      var Result = false;
      Result = false;
      if (Self.FHandle$3) {
         Result = TW3Image.GetComplete(Self)&&Self.FHandle$3.naturalWidth>0&&Self.FHandle$3.naturalHeight>0;
      }
      return Result
   }
   /// function TW3Image.GetSrc() : String
   ///  [line: 220, column: 19, file: SmartCL.Controls.Image]
   ,GetSrc:function(Self) {
      var Result = "";
      if (Self.FHandle$3) {
         Result = String(Self.FHandle$3.src);
      }
      return Result
   }
   /// function TW3Image.GetWidth() : Integer
   ///  [line: 247, column: 19, file: SmartCL.Controls.Image]
   ,GetWidth:function(Self) {
      var Result = 0;
      Result = TW3MovableControl.GetWidth(Self);
      if (Result<1) {
         if (Self.FHandle$3) {
            Result = parseInt(Self.FHandle$3.width,10);
         }
      }
      return Result
   }
   /// procedure TW3Image.InitializeObject()
   ///  [line: 99, column: 20, file: SmartCL.Controls.Image]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FHandle$3.onload = $Event0(Self,TW3Image.CBOnLoad);
   }
   /// function TW3Image.makeElementTagObj() : THandle
   ///  [line: 153, column: 19, file: SmartCL.Controls.Image]
   ,MakeElementTagObj:function(Self) {
      return w3_CreateHtmlElement("img");
   }
   /// procedure TW3Image.SetFit(const Value: TW3ImageFittingStyle)
   ///  [line: 182, column: 20, file: SmartCL.Controls.Image]
   ,SetFit:function(Self, Value$34) {
      var LData$5 = "";
      if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
         LData$5 = "none";
         switch (Value$34) {
            case 1 :
               LData$5 = "fill";
               break;
            case 2 :
               LData$5 = "contain";
               break;
            case 3 :
               LData$5 = "cover";
               break;
            case 4 :
               LData$5 = "scale-down";
               break;
         }
         Self.FHandle$3.style["object-fit"] = LData$5;
      }
   }
   /// procedure TW3Image.SetOnLoad(aValue: TNotifyEvent)
   ///  [line: 141, column: 20, file: SmartCL.Controls.Image]
   ,SetOnLoad:function(Self, aValue$51) {
      Self.FOnLoad = aValue$51;
   }
   /// procedure TW3Image.SetSrc(Value: String)
   ///  [line: 333, column: 20, file: SmartCL.Controls.Image]
   ,SetSrc:function(Self, Value$35) {
      if (Value$35!=TW3Image.GetSrc(Self)) {
         w3_setAttrib(Self.FHandle$3,"src",Value$35);
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight$:function($){return $.ClassType.GetHeight($)}
   ,GetWidth$:function($){return $.ClassType.GetWidth($)}
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1$:function($){return $.ClassType.GetEnabled$1($)}
};
TW3Image.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TBinaryData = class (TAllocation)
///  [line: 126, column: 3, file: system.memory.buffer]
var TBinaryData = {
   $ClassName:"TBinaryData",$Parent:TAllocation
   ,$Init:function ($) {
      TAllocation.$Init($);
      $.FDataView = null;
   }
   /// procedure TBinaryData.AppendBuffer(const Raw: TMemoryHandle)
   ///  [line: 957, column: 23, file: system.memory.buffer]
   ,AppendBuffer:function(Self, Raw) {
      var mOffset = 0;
      if (Raw) {
         if (Raw.length>0) {
            mOffset = TAllocation.GetSize$3(Self);
            TAllocation.Grow(Self,Raw.length);
            TBinaryData.Write$4(Self,mOffset,Raw);
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Append failed, invalid source handle error");
      }
   }
   /// procedure TBinaryData.AppendBytes(const Bytes: TByteArray)
   ///  [line: 1026, column: 23, file: system.memory.buffer]
   ,AppendBytes:function(Self, Bytes$5) {
      var mLen$2 = 0;
      var mOffset$1 = 0;
      mLen$2 = Bytes$5.length;
      if (mLen$2>0) {
         mOffset$1 = TAllocation.GetSize$3(Self);
         TAllocation.Grow(Self,mLen$2);
         TAllocation.GetHandle(Self).set(Bytes$5,mOffset$1);
      }
   }
   /// procedure TBinaryData.AppendFloat32(const Value: float32)
   ///  [line: 938, column: 23, file: system.memory.buffer]
   ,AppendFloat32:function(Self, Value$36) {
      var mOffset$2 = 0;
      mOffset$2 = TAllocation.GetSize$3(Self);
      TAllocation.Grow(Self,TDatatype.SizeOfType(TDatatype,8));
      TBinaryData.WriteFloat32(Self,mOffset$2,Value$36);
   }
   /// procedure TBinaryData.AppendFloat64(const Value: float64)
   ///  [line: 947, column: 23, file: system.memory.buffer]
   ,AppendFloat64:function(Self, Value$37) {
      var mOffset$3 = 0;
      mOffset$3 = TAllocation.GetSize$3(Self);
      TAllocation.Grow(Self,TDatatype.SizeOfType(TDatatype,9));
      TBinaryData.WriteFloat64(Self,mOffset$3,Value$37);
   }
   /// procedure TBinaryData.AppendMemory(const Buffer: TBinaryData; const ReleaseBufferOnExit: Boolean)
   ///  [line: 974, column: 23, file: system.memory.buffer]
   ,AppendMemory:function(Self, Buffer$5, ReleaseBufferOnExit) {
      var mOffset$4 = 0;
      if (Buffer$5!==null) {
         try {
            if (TAllocation.GetSize$3(Buffer$5)>0) {
               mOffset$4 = TAllocation.GetSize$3(Self);
               TAllocation.Grow(Self,TAllocation.GetSize$3(Buffer$5));
               TBinaryData.Write$3(Self,mOffset$4,Buffer$5);
            }
         } finally {
            if (ReleaseBufferOnExit) {
               TObject.Free(Buffer$5);
            }
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Append failed, Invalid source buffer error");
      }
   }
   /// procedure TBinaryData.AppendStr(const Text: String)
   ///  [line: 997, column: 23, file: system.memory.buffer]
   ,AppendStr:function(Self, Text$12) {
      var mLen$3 = 0;
      var x$78 = 0;
      var mOffset$5 = 0;
      var LTemp = [];
      mLen$3 = Text$12.length;
      if (mLen$3>0) {
         mOffset$5 = TAllocation.GetSize$3(Self);
         LTemp = TString.EncodeUTF8(TString,Text$12);
         TAllocation.Grow(Self,LTemp.length);
         var $temp47;
         for(x$78=0,$temp47=LTemp.length;x$78<$temp47;x$78++) {
            Self.FDataView.setInt8(mOffset$5,LTemp[x$78]);
            ++mOffset$5;
            console.log( LTemp[x$78] );
         }
      }
   }
   /// function TBinaryData.Clone() : TBinaryData
   ///  [line: 904, column: 22, file: system.memory.buffer]
   ,Clone:function(Self) {
      return TBinaryData.Create$31($New(TBinaryData),TBinaryData.ToTypedArray(Self));
   }
   /// procedure TBinaryData.CopyFrom(const Buffer: TBinaryData; const Offset: Integer; const ByteLen: Integer)
   ///  [line: 909, column: 23, file: system.memory.buffer]
   ,CopyFrom$2:function(Self, Buffer$6, Offset$17, ByteLen) {
      if (Buffer$6!==null) {
         TBinaryData.CopyFromMemory(Self,TAllocation.GetHandle(Buffer$6),Offset$17,ByteLen);
      } else {
         throw Exception.Create($New(EBinaryData),"CopyFrom failed, source instance was NIL error");
      }
   }
   /// procedure TBinaryData.CopyFromMemory(const Raw: TMemoryHandle; Offset: Integer; ByteLen: Integer)
   ///  [line: 920, column: 23, file: system.memory.buffer]
   ,CopyFromMemory:function(Self, Raw$1, Offset$18, ByteLen$1) {
      if (TMemoryHandleHelper$Valid$5(Raw$1)) {
         if (TBinaryData.OffsetInRange(Self,Offset$18)) {
            if (ByteLen$1>0) {
               TMarshal.Move$1(TMarshal,Raw$1,0,TAllocation.GetHandle(Self),Offset$18,ByteLen$1);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"Cut memory failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$18]);
         }
      } else {
         throw Exception.Create($New(EBinaryData),"CopyFrom failed, invalid source handle error");
      }
   }
   /// constructor TBinaryData.Create(aHandle: TMemoryHandle)
   ///  [line: 239, column: 25, file: system.memory.buffer]
   ,Create$31:function(Self, aHandle$2) {
      var mSignature = "";
      TAllocation.Create$26(Self);
      if (TMemoryHandleHelper$Defined$1(aHandle$2)&&TMemoryHandleHelper$Valid$5(aHandle$2)) {
         if (aHandle$2.toString) {
            mSignature = String(aHandle$2.toString());
            if (SameText(mSignature,"[object Uint8Array]")||SameText(mSignature,"[object Uint8ClampedArray]")) {
               TAllocation.Allocate(Self,parseInt(aHandle$2.length,10));
               TMarshal.Move$1(TMarshal,aHandle$2,0,TAllocation.GetHandle(Self),0,parseInt(aHandle$2.length,10));
            } else {
               throw Exception.Create($New(EBinaryData),"Invalid buffer type, expected handle of type Uint8[clamped]Array");
            }
         } else {
            throw Exception.Create($New(EBinaryData),"Invalid buffer type, expected handle of type Uint8[clamped]Array");
         }
      }
      return Self
   }
   /// function TBinaryData.CutBinaryData(Offset: Integer; ByteLen: Integer) : TBinaryData
   ///  [line: 885, column: 22, file: system.memory.buffer]
   ,CutBinaryData:function(Self, Offset$19, ByteLen$2) {
      var Result = null;
      var mNewBuffer = undefined;
      if (ByteLen$2>0) {
         if (TBinaryData.OffsetInRange(Self,Offset$19)) {
            mNewBuffer = TAllocation.GetHandle(Self).subarray(Offset$19,Offset$19+ByteLen$2-1);
            Result = TBinaryData.Create$31($New(TBinaryData),mNewBuffer);
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"Cut memory failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$19]);
         }
      } else {
         Result = TBinaryData.Create$31($New(TBinaryData),null);
      }
      return Result
   }
   /// function TBinaryData.CutStream(const Offset: Integer; const ByteLen: Integer) : TStream
   ///  [line: 858, column: 22, file: system.memory.buffer]
   ,CutStream:function(Self, Offset$20, ByteLen$3) {
      return TBinaryData.ToStream(TBinaryData.CutBinaryData(Self,Offset$20,ByteLen$3));
   }
   /// function TBinaryData.CutTypedArray(Offset: Integer; ByteLen: Integer) : TMemoryHandle
   ///  [line: 864, column: 22, file: system.memory.buffer]
   ,CutTypedArray:function(Self, Offset$21, ByteLen$4) {
      var Result = undefined;
      var mTemp$6 = null;
      Result = null;
      if (ByteLen$4>0) {
         if (TBinaryData.OffsetInRange(Self,Offset$21)) {
            if (TAllocation.GetSize$3(Self)-Offset$21>0) {
               mTemp$6 = Self.FDataView.buffer.slice(Offset$21,Offset$21+ByteLen$4);
               Result = new Uint8ClampedArray(mTemp$6);
            }
         }
      }
      return Result
   }
   /// procedure TBinaryData.FromBase64(FileData: String)
   ///  [line: 474, column: 23, file: system.memory.buffer]
   ,FromBase64:function(Self, FileData) {
      var mRaw$2 = "";
      var x$79 = 0;
      TAllocation.Release(Self);
      if (FileData.length>0) {
         mRaw$2 = atob(FileData);
         if (mRaw$2.length>0) {
            TAllocation.Allocate(Self,mRaw$2.length);
            var $temp48;
            for(x$79=0,$temp48=mRaw$2.length;x$79<$temp48;x$79++) {
               TBinaryData.SetByte(Self,x$79,TDatatype.CharToByte(TDatatype,mRaw$2.charAt(x$79-1)));
            }
         }
      }
   }
   /// function TBinaryData.GetBit(const bitIndex: Integer) : Boolean
   ///  [line: 322, column: 22, file: system.memory.buffer]
   ,GetBit$1:function(Self, bitIndex) {
      var Result = false;
      var mOffset$6 = 0;
      mOffset$6 = bitIndex>>>3;
      if (TBinaryData.OffsetInRange(Self,mOffset$6)) {
         Result = TBitAccess.Get(TBitAccess,(bitIndex%8),TBinaryData.GetByte(Self,mOffset$6));
      }
      return Result
   }
   /// function TBinaryData.GetBitCount() : Integer
   ///  [line: 279, column: 22, file: system.memory.buffer]
   ,GetBitCount:function(Self) {
      return TAllocation.GetSize$3(Self)<<3;
   }
   /// function TBinaryData.GetByte(const Index: Integer) : Byte
   ///  [line: 546, column: 22, file: system.memory.buffer]
   ,GetByte:function(Self, Index$2) {
      var Result = 0;
      if (TAllocation.GetHandle(Self)) {
         if (TBinaryData.OffsetInRange(Self,Index$2)) {
            Result = Self.FDataView.getUint8(Index$2);
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"invalid byte index, expected %d..%d, not %d",[0, TAllocation.GetHandle(Self).length-1, Index$2]);
         }
      }
      return Result
   }
   /// procedure TBinaryData.HandleAllocated()
   ///  [line: 269, column: 23, file: system.memory.buffer]
   ,HandleAllocated:function(Self) {
      var mRef$2 = undefined;
      mRef$2 = TAllocation.GetBufferHandle(Self);
      (Self.FDataView) = new DataView(mRef$2);
   }
   /// procedure TBinaryData.HandleReleased()
   ///  [line: 284, column: 23, file: system.memory.buffer]
   ,HandleReleased:function(Self) {
      Self.FDataView = null;
   }
   /// function TBinaryData.OffsetInRange(Offset: Integer) : Boolean
   ///  [line: 663, column: 22, file: system.memory.buffer]
   ,OffsetInRange:function(Self, Offset$22) {
      var Result = false;
      var mSize$4 = 0;
      mSize$4 = TAllocation.GetSize$3(Self);
      if (mSize$4>0) {
         Result = Offset$22>=0&&Offset$22<=mSize$4;
      } else {
         Result = (Offset$22==0);
      }
      return Result
   }
   /// function TBinaryData.ReadBool(Offset: Integer) : Boolean
   ///  [line: 655, column: 22, file: system.memory.buffer]
   ,ReadBool:function(Self, Offset$23) {
      var Result = false;
      if (TBinaryData.OffsetInRange(Self,Offset$23)) {
         Result = Self.FDataView.getUint8(Offset$23)>0;
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[25],[Offset$23, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadBytes(Offset: Integer; ByteLen: Integer) : TByteArray
   ///  [line: 637, column: 22, file: system.memory.buffer]
   ,ReadBytes:function(Self, Offset$24, ByteLen$5) {
      var Result = [];
      var x$80 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$24)) {
         if (Offset$24+ByteLen$5<=TAllocation.GetSize$3(Self)) {
            var $temp49;
            for(x$80=0,$temp49=ByteLen$5;x$80<$temp49;x$80++) {
               Result.push(Self.FDataView.getUint8(Offset$24+x$80));
            }
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[25],[Offset$24, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadFloat32(Offset: Integer) : Float
   ///  [line: 584, column: 22, file: system.memory.buffer]
   ,ReadFloat32:function(Self, Offset$25) {
      var Result = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$25)) {
         if (Offset$25+TDatatype.SizeOfType(TDatatype,8)<=TAllocation.GetSize$3(Self)) {
            Result = Self.FDataView.getFloat32(Offset$25,a$14);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[25],[Offset$25, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadFloat64(Offset: Integer) : Float
   ///  [line: 570, column: 22, file: system.memory.buffer]
   ,ReadFloat64:function(Self, Offset$26) {
      var Result = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$26)) {
         if (Offset$26+TDatatype.SizeOfType(TDatatype,9)<=TAllocation.GetSize$3(Self)) {
            Result = Self.FDataView.getFloat64(Offset$26,a$14);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[25],[Offset$26, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadInt(Offset: Integer) : Integer
   ///  [line: 598, column: 22, file: system.memory.buffer]
   ,ReadInt:function(Self, Offset$27) {
      var Result = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$27)) {
         if (Offset$27+TDatatype.SizeOfType(TDatatype,7)<=TAllocation.GetSize$3(Self)) {
            Result = Self.FDataView.getUint32(Offset$27,a$14);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[25],[Offset$27, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadStr(Offset: Integer; ByteLen: Integer) : String
   ///  [line: 612, column: 22, file: system.memory.buffer]
   ,ReadStr$1:function(Self, Offset$28, ByteLen$6) {
      var Result = "";
      var x$81 = 0;
      var LFetch = [];
      Result = "";
      if (TBinaryData.OffsetInRange(Self,Offset$28)) {
         if (Offset$28+ByteLen$6<=TAllocation.GetSize$3(Self)) {
            var $temp50;
            for(x$81=0,$temp50=ByteLen$6;x$81<$temp50;x$81++) {
               LFetch.push(TBinaryData.GetByte(Self,(Offset$28+x$81)));
            }
            Result = TString.DecodeUTF8(TString,LFetch);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[25],[Offset$28, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// procedure TBinaryData.SetBit(const bitIndex: Integer; const value: Boolean)
   ///  [line: 316, column: 23, file: system.memory.buffer]
   ,SetBit$1:function(Self, bitIndex$1, value$22) {
      TBinaryData.SetByte(Self,(bitIndex$1>>>3),TBitAccess.Set$3(TBitAccess,(bitIndex$1%8),TBinaryData.GetByte(Self,(bitIndex$1>>>3)),value$22));
   }
   /// procedure TBinaryData.SetByte(const Index: Integer; const Value: Byte)
   ///  [line: 558, column: 23, file: system.memory.buffer]
   ,SetByte:function(Self, Index$3, Value$38) {
      if (TAllocation.GetHandle(Self)) {
         if (TBinaryData.OffsetInRange(Self,Index$3)) {
            Self.FDataView.setUint8(Index$3,Value$38);
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"Invalid byte index, expected %d..%d, not %d",[0, TAllocation.GetHandle(Self).length-1, Index$3]);
         }
      }
   }
   /// function TBinaryData.ToBase64() : String
   ///  [line: 503, column: 22, file: system.memory.buffer]
   ,ToBase64:function(Self) {
      var Result = "";
      var mText = "";
      var mRef$3 = undefined;
      var CHUNK_SIZE = 32768;
      var index$4 = 0;
      var mLength = 0;
      var slice$4;
      if (TAllocation.GetHandle(Self)) {
         mRef$3 = TAllocation.GetHandle(Self);
         mLength = (mRef$3).length;
      while (index$4 < mLength)
      {
        slice$4 = (mRef$3).subarray(index$4, Math.min(index$4 + CHUNK_SIZE, mLength));
        mText += String.fromCharCode.apply(null, slice$4);
        index$4 += CHUNK_SIZE;
      }
      Result = btoa(mText);
      }
      return Result
   }
   /// function TBinaryData.ToBytes() : TByteArray
   ///  [line: 399, column: 22, file: system.memory.buffer]
   ,ToBytes:function(Self) {
      var Result = [];
      var x$82 = 0;
      if (TAllocation.GetSize$3(Self)>0) {
         var $temp51;
         for(x$82=0,$temp51=TAllocation.GetSize$3(Self);x$82<$temp51;x$82++) {
            Result.push(TBinaryData.GetByte(Self,x$82));
         }
      } else {
         Result = [];
      }
      return Result
   }
   /// function TBinaryData.ToHexDump(BytesPerRow: Integer; Options: TBufferHexDumpOptions) : String
   ///  [line: 331, column: 22, file: system.memory.buffer]
   ,ToHexDump:function(Self, BytesPerRow, Options$4) {
      var Result = "";
      var x$83 = 0;
      var y$51 = 0;
      var mCount$2 = 0;
      var mPad = 0;
      var mDump = [];
      if (TAllocation.GetHandle(Self)) {
         BytesPerRow = TInteger.EnsureRange(BytesPerRow,2,64);
         mCount$2 = 0;
         Result = "";
         var $temp52;
         for(x$83=0,$temp52=TAllocation.GetSize$3(Self);x$83<$temp52;x$83++) {
            mDump.push(TBinaryData.GetByte(Self,x$83));
            if ($SetIn(Options$4,0,0,2)) {
               Result+="$"+IntToHex2(TBinaryData.GetByte(Self,x$83));
            } else {
               Result+=IntToHex2(TBinaryData.GetByte(Self,x$83));
            }
            ++mCount$2;
            if (mCount$2>=BytesPerRow) {
               if (mDump.length>0) {
                  Result+=" ";
                  var $temp53;
                  for(y$51=0,$temp53=mDump.length;y$51<$temp53;y$51++) {
                     if (function(v$){return (((v$>="A")&&(v$<="Z"))||((v$>="a")&&(v$<="z"))||((v$>="0")&&(v$<="9"))||(v$==",")||(v$==";")||(v$=="<")||(v$==">")||(v$=="{")||(v$=="}")||(v$=="[")||(v$=="]")||(v$=="-")||(v$=="_")||(v$=="#")||(v$=="$")||(v$=="%")||(v$=="&")||(v$=="\/")||(v$=="(")||(v$==")")||(v$=="!")||(v$=="§")||(v$=="^")||(v$==":")||(v$==",")||(v$=="?"))}(TDatatype.ByteToChar(TDatatype,mDump[y$51]))) {
                        Result+=TDatatype.ByteToChar(TDatatype,mDump[y$51]);
                     } else {
                        Result+="_";
                     }
                  }
               }
               mDump.length=0;
               Result+="\r\n";
               mCount$2 = 0;
            } else {
               Result+=" ";
            }
         }
         if ($SetIn(Options$4,1,0,2)&&mCount$2>0) {
            mPad = BytesPerRow-mCount$2;
            var $temp54;
            for(x$83=1,$temp54=mPad;x$83<=$temp54;x$83++) {
               Result+="--";
               if ($SetIn(Options$4,0,0,2)) {
                  Result+="-";
               }
               ++mCount$2;
               if (mCount$2>=BytesPerRow) {
                  Result+="\r\n";
                  mCount$2 = 0;
               } else {
                  Result+=" ";
               }
            }
         }
      }
      return Result
   }
   /// function TBinaryData.ToStream() : TStream
   ///  [line: 439, column: 22, file: system.memory.buffer]
   ,ToStream:function(Self) {
      var Result = null;
      Result = TMemoryStream.Create$23($New(TMemoryStream));
      try {
         TStream.Write$1(Result,TBinaryData.ToBytes(Self));
         TStream.SetPosition$(Result,0);
      } catch ($e) {
         var e$37 = $W($e);
         TObject.Free(Result);
         Result = null;
         throw $e;
      }
      return Result
   }
   /// function TBinaryData.ToString() : String
   ///  [line: 528, column: 22, file: system.memory.buffer]
   ,ToString:function(Self) {
      var Result = "";
      var mRef$4 = undefined;
      var CHUNK_SIZE$1 = 32768;
      if (TAllocation.GetHandle(Self)) {
         mRef$4 = TAllocation.GetHandle(Self);
         var c = [];
    for (var i=0; i < (mRef$4).length; i += CHUNK_SIZE$1) {
      c.push(String.fromCharCode.apply(null, (mRef$4).subarray(i, i + CHUNK_SIZE$1)));
    }
    Result = c.join("");
      }
      return Result
   }
   /// function TBinaryData.ToTypedArray() : TMemoryHandle
   ///  [line: 455, column: 22, file: system.memory.buffer]
   ,ToTypedArray:function(Self) {
      var Result = undefined;
      var mLen$4 = 0;
      var mTemp$7 = null;
      Result = null;
      mLen$4 = TAllocation.GetSize$3(Self);
      if (mLen$4>0) {
         mTemp$7 = Self.FDataView.buffer.slice(0,mLen$4);
         Result = new Uint8ClampedArray(mTemp$7);
      }
      return Result
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: String)
   ///  [line: 747, column: 23, file: system.memory.buffer]
   ,Write$5:function(Self, Offset$29, Data$20) {
      var mGrowth = 0;
      var x$84 = 0;
      var LTemp$1 = [];
      if (Data$20.length>0) {
         if (TBinaryData.OffsetInRange(Self,Offset$29)) {
            LTemp$1 = TString.EncodeUTF8(TString,Data$20);
            if (Offset$29+LTemp$1.length>TAllocation.GetSize$3(Self)-1) {
               mGrowth = Offset$29+LTemp$1.length-TAllocation.GetSize$3(Self);
            }
            if (mGrowth>0) {
               TAllocation.Grow(Self,mGrowth);
            }
            var $temp55;
            for(x$84=0,$temp55=LTemp$1.length;x$84<$temp55;x$84++) {
               Self.FDataView.setUint8(Offset$29+x$84,LTemp$1[x$84]);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"Write string failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$29]);
         }
      }
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: TMemoryHandle)
   ///  [line: 722, column: 23, file: system.memory.buffer]
   ,Write$4:function(Self, Offset$30, Data$21) {
      var mGrowth$1 = 0;
      if (Data$21) {
         if (Data$21.length>0) {
            if (TBinaryData.OffsetInRange(Self,Offset$30)) {
               if (Offset$30+Data$21.length>TAllocation.GetSize$3(Self)-1) {
                  mGrowth$1 = Offset$30+Data$21.length-TAllocation.GetSize$3(Self);
               }
               if (mGrowth$1>0) {
                  TAllocation.Grow(Self,mGrowth$1);
               }
               TMarshal.Move$1(TMarshal,Data$21,0,TAllocation.GetHandle(Self),Offset$30,parseInt(TAllocation.GetHandle(Self).length,10));
            } else {
               throw EW3Exception.CreateFmt($New(EBinaryData),"Write typed-handle failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$30]);
            }
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Write failed, invalid source handle error");
      }
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: TBinaryData)
   ///  [line: 695, column: 23, file: system.memory.buffer]
   ,Write$3:function(Self, Offset$31, Data$22) {
      var mGrowth$2 = 0;
      if (Data$22!==null) {
         if (TAllocation.GetSize$3(Data$22)>0) {
            if (TBinaryData.OffsetInRange(Self,Offset$31)) {
               if (Offset$31+TAllocation.GetSize$3(Data$22)>TAllocation.GetSize$3(Self)-1) {
                  mGrowth$2 = Offset$31+TAllocation.GetSize$3(Data$22)-TAllocation.GetSize$3(Self);
               }
               if (mGrowth$2>0) {
                  TAllocation.Grow(Self,mGrowth$2);
               }
               TMarshal.Move$1(TMarshal,TAllocation.GetHandle(Data$22),0,TAllocation.GetHandle(Self),0,TAllocation.GetSize$3(Data$22));
            } else {
               throw EW3Exception.CreateFmt($New(EBinaryData),"Write string failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$31]);
            }
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Write failed, invalid source buffer [nil] error");
      }
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: TByteArray)
   ///  [line: 675, column: 23, file: system.memory.buffer]
   ,Write$2:function(Self, Offset$32, Data$23) {
      var mGrowth$3 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$32)) {
         if (Data$23.length>0) {
            if (Offset$32+Data$23.length>TAllocation.GetSize$3(Self)-1) {
               mGrowth$3 = Offset$32+Data$23.length-TAllocation.GetSize$3(Self);
            }
            if (mGrowth$3>0) {
               TAllocation.Grow(Self,mGrowth$3);
            }
            TAllocation.GetHandle(Self).set(Data$23,Offset$32);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),"Write bytearray failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$32]);
      }
   }
   /// procedure TBinaryData.WriteFloat32(const Offset: Integer; const Data: float32)
   ///  [line: 805, column: 23, file: system.memory.buffer]
   ,WriteFloat32:function(Self, Offset$33, Data$24) {
      var mGrowth$4 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$33)) {
         if (Offset$33+TDatatype.SizeOfType(TDatatype,8)>TAllocation.GetSize$3(Self)-1) {
            mGrowth$4 = Offset$33+TDatatype.SizeOfType(TDatatype,8)-TAllocation.GetSize$3(Self);
         }
         if (mGrowth$4>0) {
            TAllocation.Grow(Self,mGrowth$4);
         }
         Self.FDataView.setFloat32(Offset$33,Data$24,a$14);
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),"Write float failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$33]);
      }
   }
   /// procedure TBinaryData.WriteFloat64(const Offset: Integer; const Data: float64)
   ///  [line: 823, column: 23, file: system.memory.buffer]
   ,WriteFloat64:function(Self, Offset$34, Data$25) {
      var mGrowth$5 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$34)) {
         if (Offset$34+TDatatype.SizeOfType(TDatatype,9)>TAllocation.GetSize$3(Self)-1) {
            mGrowth$5 = Offset$34+TDatatype.SizeOfType(TDatatype,9)-TAllocation.GetSize$3(Self);
         }
         if (mGrowth$5>0) {
            TAllocation.Grow(Self,mGrowth$5);
         }
         Self.FDataView.setFloat64(Offset$34,Number(Data$25),a$14);
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),"Write float failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$34]);
      }
   }
   ,Destroy:TAllocation.Destroy
   ,HandleAllocated$:function($){return $.ClassType.HandleAllocated($)}
   ,HandleReleased$:function($){return $.ClassType.HandleReleased($)}
};
TBinaryData.$Intf={
   IBinaryDataReadAccess:[TBinaryData.ReadFloat32,TBinaryData.ReadFloat64,TBinaryData.ReadBool,TBinaryData.ReadInt,TBinaryData.ReadStr$1,TBinaryData.ReadBytes]
   ,IBinaryDataImport:[TBinaryData.FromBase64]
   ,IBinaryDataWriteAccess:[TBinaryData.AppendBytes,TBinaryData.AppendStr,TBinaryData.AppendMemory,TBinaryData.AppendBuffer,TBinaryData.AppendFloat32,TBinaryData.AppendFloat64,TBinaryData.Write$2,TBinaryData.WriteFloat32,TBinaryData.WriteFloat64,TBinaryData.CopyFrom$2,TBinaryData.CopyFromMemory,TBinaryData.CutBinaryData,TBinaryData.CutStream,TBinaryData.CutTypedArray]
   ,IBinaryDataReadWriteAccess:[TBinaryData.ReadFloat32,TBinaryData.ReadFloat64,TBinaryData.ReadBool,TBinaryData.ReadInt,TBinaryData.ReadStr$1,TBinaryData.ReadBytes,TBinaryData.AppendBytes,TBinaryData.AppendStr,TBinaryData.AppendMemory,TBinaryData.AppendBuffer,TBinaryData.AppendFloat32,TBinaryData.AppendFloat64,TBinaryData.Write$2,TBinaryData.WriteFloat32,TBinaryData.WriteFloat64,TBinaryData.CopyFrom$2,TBinaryData.CopyFromMemory,TBinaryData.CutBinaryData,TBinaryData.CutStream,TBinaryData.CutTypedArray]
   ,IBinaryDataBitAccess:[TBinaryData.GetBitCount,TBinaryData.GetBit$1,TBinaryData.SetBit$1]
   ,IBinaryDataExport:[TBinaryData.ToBase64,TBinaryData.ToString,TBinaryData.ToTypedArray,TBinaryData.ToBytes,TBinaryData.ToHexDump,TBinaryData.ToStream,TBinaryData.Clone]
   ,IAllocation:[TAllocation.GetHandle,TAllocation.GetTotalSize$1,TAllocation.GetSize$3,TAllocation.GetTransport,TAllocation.Allocate,TAllocation.Release,TAllocation.Grow,TAllocation.Shrink,TAllocation.ReAllocate,TAllocation.Transport]
   ,IBinaryTransport:[TAllocation.DataOffset$1,TAllocation.DataGetSize$1,TAllocation.DataRead$1,TAllocation.DataWrite$1]
}
/// EBinaryData = class (EW3Exception)
///  [line: 125, column: 3, file: system.memory.buffer]
var EBinaryData = {
   $ClassName:"EBinaryData",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TBitAccess = class (TObject)
///  [line: 20, column: 3, file: System.Types.Bits]
var TBitAccess = {
   $ClassName:"TBitAccess",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TBitAccess.Get(const index: Integer; const Value: Byte) : Boolean
   ///  [line: 114, column: 27, file: System.Types.Bits]
   ,Get:function(Self, index$5, Value$39) {
      var Result = false;
      var mMask = 0;
      if (index$5>=0&&index$5<8) {
         mMask = 1<<index$5;
         Result = ((Value$39&mMask)!=0);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),"Invalid bit index, expected 0..7 not %d",[index$5]);
      }
      return Result
   }
   /// function TBitAccess.Set(const Index: Integer; const Value: Byte; const Data: Boolean) : Byte
   ///  [line: 127, column: 27, file: System.Types.Bits]
   ,Set$3:function(Self, Index$4, Value$40, Data$26) {
      var Result = 0;
      var mSet = false;
      var mMask$1 = 0;
      Result = Value$40;
      if (Index$4>=0&&Index$4<8) {
         mMask$1 = 1<<Index$4;
         mSet = ((Value$40&mMask$1)!=0);
         if (mSet!=Data$26) {
            if (Data$26) {
               Result = Result|mMask$1;
            } else {
               Result = (Result&(~mMask$1));
            }
         }
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
var CNT_BitBuffer_ByteTable = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8];
/// TW3LabelMemory = record
///  [line: 26, column: 3, file: SmartCL.Controls.Label]
function Copy$TW3LabelMemory(s,d) {
   d.Ellipsis=s.Ellipsis;
   d.WordWrap=s.WordWrap;
   d.HAlign=s.HAlign;
   d.VAlign=s.VAlign;
   d.width$28=s.width$28;
   d.height$23=s.height$23;
   return d;
}
function Clone$TW3LabelMemory($) {
   return {
      Ellipsis:$.Ellipsis,
      WordWrap:$.WordWrap,
      HAlign:$.HAlign,
      VAlign:$.VAlign,
      width$28:$.width$28,
      height$23:$.height$23
   }
}
/// TW3Label = class (TW3CustomControl)
///  [line: 35, column: 3, file: SmartCL.Controls.Label]
var TW3Label = {
   $ClassName:"TW3Label",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FAuto$1 = $.FEllipsis = $.FWrap$1 = false;
      $.FContent = undefined;
      $.FHAlign = 0;
      $.FMemory = {Ellipsis:false,WordWrap:false,HAlign:0,VAlign:0,width$28:0,height$23:0};
      $.FVAlign = 0;
   }
   /// procedure TW3Label.AdjustToAutoSize()
   ///  [line: 197, column: 20, file: SmartCL.Controls.Label]
   ,AdjustToAutoSize:function(Self) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Self.FHandle$3.style.width = TInteger.ToPxStr(parseInt((Self.FContent.offsetWidth+TW3Borders.GetHSpace(TW3MovableControl.GetBorder(Self))),10));
         Self.FHandle$3.style.height = TInteger.ToPxStr(parseInt((Self.FContent.offsetHeight+TW3Borders.GetVSpace(TW3MovableControl.GetBorder(Self))),10));
      }
   }
   /// function TW3Label.CreationFlags() : TW3CreationFlags
   ///  [line: 170, column: 19, file: SmartCL.Controls.Label]
   ,CreationFlags:function(Self) {
      var Result = [0];
      Result = TW3TagObj.CreationFlags(Self);
      $SetExc(Result,6,0,8);
      $SetExc(Result,2,0,8);
      $SetExc(Result,3,0,8);
      $SetExc(Result,4,0,8);
      $SetInc(Result,5,0,8);
      $SetInc(Result,7,0,8);
      return Result
   }
   /// procedure TW3Label.FinalizeObject()
   ///  [line: 162, column: 20, file: SmartCL.Controls.Label]
   ,FinalizeObject:function(Self) {
      Self.FContent.parentNode.removeChild(Self.FContent);
      Self.FContent = null;
      TW3CustomControl.FinalizeObject(Self);
   }
   /// function TW3Label.GetCaption() : String
   ///  [line: 303, column: 19, file: SmartCL.Controls.Label]
   ,GetCaption$1:function(Self) {
      var Result = "";
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (Self.FContent) {
            Result = String(Self.FContent.innerHTML);
         }
      }
      return Result
   }
   /// function TW3Label.GetWordWrap() : Boolean
   ///  [line: 322, column: 19, file: SmartCL.Controls.Label]
   ,GetWordWrap:function(Self) {
      var Result = false;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Result = Self.FWrap$1;
      }
      return Result
   }
   /// procedure TW3Label.InitializeObject()
   ///  [line: 139, column: 20, file: SmartCL.Controls.Label]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContent = document.createElement("div");
      w3_setAttrib(Self.FContent,"class","lbxcontent");
      Self.FHandle$3.appendChild(Self.FContent);
      Self.FHAlign = 0;
      Self.FContent.classList.add("lbxcontent_h_left");
      Self.FVAlign = 1;
      Self.FContent.classList.add("lbxcontent_v_center");
      Self.FContent.classList.add("lbxdisableBreak");
   }
   /// procedure TW3Label.Resize()
   ///  [line: 225, column: 20, file: SmartCL.Controls.Label]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.FAuto$1) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3Label.AdjustToAutoSize(Self);
         }
      }
   }
   /// procedure TW3Label.SetAuto(const NewAuto: Boolean)
   ///  [line: 235, column: 20, file: SmartCL.Controls.Label]
   ,SetAuto$1:function(Self, NewAuto) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewAuto!=Self.FAuto$1) {
            if (NewAuto) {
               Self.FMemory.Ellipsis = Self.FEllipsis;
               Self.FMemory.WordWrap = TW3Label.GetWordWrap(Self);
               Self.FMemory.VAlign = Self.FVAlign;
               Self.FMemory.HAlign = Self.FHAlign;
               Self.FMemory.width$28 = TW3MovableControl.GetWidth$(Self);
               Self.FMemory.height$23 = TW3MovableControl.GetHeight$(Self);
               if (Self.FEllipsis) {
                  TW3Label.SetEllipsis(Self,false);
               }
               if (TW3Label.GetWordWrap(Self)) {
                  TW3Label.SetWordWrap(Self,false);
               }
               if (Self.FVAlign) {
                  TW3Label.SetVAlign(Self,0);
               }
               if (Self.FHAlign) {
                  TW3Label.SetHAlign(Self,0);
               }
               TW3Label.AdjustToAutoSize(Self);
            } else {
               Self.FAuto$1 = false;
               Self.FEllipsis = Self.FMemory.Ellipsis;
               TW3Label.SetWordWrap(Self,Self.FMemory.WordWrap);
               Self.FVAlign = Self.FMemory.VAlign;
               Self.FHAlign = Self.FMemory.HAlign;
               TW3MovableControl.SetWidth$(Self,Self.FMemory.width$28);
               TW3MovableControl.SetHeight$(Self,Self.FMemory.height$23);
            }
            Self.FAuto$1 = NewAuto;
         }
      }
   }
   /// procedure TW3Label.SetCaption(const NewCaption: String)
   ///  [line: 312, column: 20, file: SmartCL.Controls.Label]
   ,SetCaption$2:function(Self, NewCaption$3) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Self.FContent.innerHTML = NewCaption$3;
         if (Self.FAuto$1) {
            TW3Label.AdjustToAutoSize(Self);
         }
      }
   }
   /// procedure TW3Label.SetEllipsis(const NewEllipsis: Boolean)
   ///  [line: 285, column: 20, file: SmartCL.Controls.Label]
   ,SetEllipsis:function(Self, NewEllipsis) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewEllipsis!=Self.FEllipsis) {
               if (NewEllipsis) {
                  Self.FContent.classList.add("lbxcontent_ellipsis");
               } else {
                  Self.FContent.classList.remove("lbxcontent_ellipsis");
               }
               Self.FEllipsis = NewEllipsis;
            }
         }
      }
   }
   /// procedure TW3Label.SetHAlign(const NewAlign: TTextAlign)
   ///  [line: 356, column: 20, file: SmartCL.Controls.Label]
   ,SetHAlign:function(Self, NewAlign$2) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewAlign$2!=Self.FHAlign) {
               switch (Self.FHAlign) {
                  case 0 :
                     Self.FContent.classList.remove("lbxcontent_h_left");
                     break;
                  case 1 :
                     Self.FContent.classList.remove("lbxcontent_h_center");
                     break;
                  case 2 :
                     Self.FContent.classList.remove("lbxcontent_h_right");
                     break;
               }
               Self.FHAlign = NewAlign$2;
               switch (Self.FHAlign) {
                  case 0 :
                     Self.FContent.classList.add("lbxcontent_h_left");
                     break;
                  case 1 :
                     Self.FContent.classList.add("lbxcontent_h_center");
                     break;
                  case 2 :
                     Self.FContent.classList.add("lbxcontent_h_right");
                     break;
               }
            }
         }
      }
   }
   /// procedure TW3Label.SetHeight(const NewHeight: Integer)
   ///  [line: 216, column: 20, file: SmartCL.Controls.Label]
   ,SetHeight:function(Self, NewHeight$8) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            TW3MovableControl.SetHeight(Self,NewHeight$8);
         }
      }
   }
   /// procedure TW3Label.SetVAlign(const NewAlign: TTextVAlign)
   ///  [line: 385, column: 20, file: SmartCL.Controls.Label]
   ,SetVAlign:function(Self, NewAlign$3) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewAlign$3!=Self.FVAlign) {
               switch (Self.FVAlign) {
                  case 0 :
                     Self.FContent.classList.remove("lbxcontent_v_top");
                     break;
                  case 1 :
                     Self.FContent.classList.remove("lbxcontent_v_center");
                     break;
                  case 2 :
                     Self.FContent.classList.remove("lbxcontent_v_bottom");
                     break;
               }
               Self.FVAlign = NewAlign$3;
               switch (Self.FVAlign) {
                  case 0 :
                     Self.FContent.classList.add("lbxcontent_v_top");
                     break;
                  case 1 :
                     Self.FContent.classList.add("lbxcontent_v_center");
                     break;
                  case 2 :
                     Self.FContent.classList.add("lbxcontent_v_bottom");
                     break;
               }
            }
         }
      }
   }
   /// procedure TW3Label.SetWidth(const NewWidth: Integer)
   ///  [line: 207, column: 20, file: SmartCL.Controls.Label]
   ,SetWidth:function(Self, NewWidth$8) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            TW3MovableControl.SetWidth(Self,NewWidth$8);
         }
      }
   }
   /// procedure TW3Label.SetWordWrap(const NewWrap: Boolean)
   ///  [line: 330, column: 20, file: SmartCL.Controls.Label]
   ,SetWordWrap:function(Self, NewWrap) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewWrap!=Self.FWrap$1) {
               Self.FWrap$1 = NewWrap;
               if (NewWrap) {
                  Self.FContent.classList.remove("lbxdisableBreak");
                  Self.FContent.classList.add("lbxenableBreak");
               } else {
                  Self.FContent.classList.remove("lbxenableBreak");
                  Self.FContent.classList.add("lbxdisableBreak");
               }
            }
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3Label.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
function SetupTextBehaviorStyles() {
   if (__LabelStyles===null) {
      __LabelStyles = TW3StyleSheet.Create$140($New(TW3StyleSheet));
      __LabelStyles.FHandle$12.innerHTML = ".lbxenableBreak  { white-space: normal; }\r\n      .lbxdisableBreak { white-space: nowrap; }\r\n      .lbxcontent {\r\n        display: block;\r\n        position: absolute;\r\n        box-sizing: border-box;\r\n        font-family: inherit;\r\n        font-size: inherit;\r\n        color: inherit;\r\n        overflow: hidden;\r\n        margin: 1px !important;\r\n        padding: 1px !important;\r\n      }\r\n\r\n      .lbxcontent_ellipsis { width: 100%; text-overflow: ellipsis; }\r\n      .lbxcontent_v_top    { top: 0%; transform: translate(0%, 0%); }\r\n      .lbxcontent_v_center { top: 50%; transform: translate(0%, -50%); }\r\n      .lbxcontent_v_bottom { top: 100%; transform: translate(0%, -100%); }\r\n      .lbxcontent_h_left   { text-align: left; }\r\n      .lbxcontent_h_center { width: 100%; text-align: center; }\r\n      .lbxcontent_h_right  { width: 100%; text-align: right; }";
   }
};
/// TW3ToolbarElement = class (TW3CustomControl)
///  [line: 42, column: 3, file: SmartCL.Controls.ToolBar]
var TW3ToolbarElement = {
   $ClassName:"TW3ToolbarElement",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// function TW3ToolbarElement.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 165, column: 28, file: SmartCL.Controls.ToolBar]
   ,AcceptOwner:function(Self, CandidateObject$7) {
      return CandidateObject$7!==null&&$Is(CandidateObject$7,TW3Toolbar);
   }
   /// procedure TW3ToolbarElement.CBClick(EventObj: JEvent)
   ///  [line: 177, column: 29, file: SmartCL.Controls.ToolBar]
   ,CBClick:function(Self, EventObj$8) {
      var Temp$6 = null;
      TW3CustomControl.CBClick(Self,EventObj$8);
      Temp$6 = TW3ToolbarElement.GetToolbar(Self);
      if (Temp$6!==null) {
         TW3Toolbar.ChildElementClicked$1(Temp$6,Self);
      }
   }
   /// function TW3ToolbarElement.GetToolbar() : TW3Toolbar
   ///  [line: 171, column: 28, file: SmartCL.Controls.ToolBar]
   ,GetToolbar:function(Self) {
      var Result = null;
      if (TW3TagContainer.a$53(Self)!==null) {
         Result = $As(TW3TagContainer.a$53(Self),TW3Toolbar);
      }
      return Result
   }
   /// procedure TW3ToolbarElement.InitializeObject()
   ///  [line: 149, column: 29, file: SmartCL.Controls.ToolBar]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3TagObj.SetPositionMode(Self,22);
      TW3TagObj.SetDisplayMode(Self,1);
   }
   /// procedure TW3ToolbarElement.SetBounds(const NewLeft: Integer; const NewTop: Integer; const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 199, column: 29, file: SmartCL.Controls.ToolBar]
   ,SetBounds:function(Self, NewLeft$8, NewTop$8, NewWidth$9, NewHeight$9) {
      TW3MovableControl.SetBounds(Self,NewLeft$8,NewTop$8,NewWidth$9,NewHeight$9);
      Self.FHandle$3.style["flex-basis"] = TInteger.ToPxStr(NewWidth$9);
   }
   /// procedure TW3ToolbarElement.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 193, column: 29, file: SmartCL.Controls.ToolBar]
   ,SetSize$2:function(Self, NewWidth$10, NewHeight$10) {
      TW3MovableControl.SetSize$2(Self,NewWidth$10,NewHeight$10);
      Self.FHandle$3.style["flex-basis"] = TInteger.ToPxStr(NewWidth$10);
   }
   /// procedure TW3ToolbarElement.SetWidth(const NewWidth: Integer)
   ///  [line: 187, column: 29, file: SmartCL.Controls.ToolBar]
   ,SetWidth:function(Self, NewWidth$11) {
      TW3MovableControl.SetWidth(Self,NewWidth$11);
      Self.FHandle$3.style["flex-basis"] = TInteger.ToPxStr(NewWidth$11);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds$:function($){return $.ClassType.SetBounds.apply($.ClassType, arguments)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2$:function($){return $.ClassType.SetSize$2.apply($.ClassType, arguments)}
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3ToolbarElement.$Intf={
   IW3OwnedObjectAccess:[TW3ToolbarElement.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
   ,IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
}
/// TW3ToolbarSeparator = class (TW3ToolbarElement)
///  [line: 60, column: 3, file: SmartCL.Controls.ToolBar]
var TW3ToolbarSeparator = {
   $ClassName:"TW3ToolbarSeparator",$Parent:TW3ToolbarElement
   ,$Init:function ($) {
      TW3ToolbarElement.$Init($);
   }
   /// procedure TW3ToolbarSeparator.StyleTagObject()
   ///  [line: 209, column: 31, file: SmartCL.Controls.ToolBar]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,0);
      TW3CustomControl.SetBorderType(Self,0);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3ToolbarElement.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3ToolbarElement.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3ToolbarElement.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3ToolbarElement.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3ToolbarElement.SetWidth
   ,CBClick:TW3ToolbarElement.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3ToolbarSeparator.$Intf={
   IW3OwnedObjectAccess:[TW3ToolbarElement.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
   ,IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
}
/// TW3ToolbarJustification enumeration
///  [line: 37, column: 3, file: SmartCL.Controls.ToolBar]
var TW3ToolbarJustification = [ "tjPacked", "tjSpaceEvenly" ];
/// TW3ToolbarElementAlignment enumeration
///  [line: 32, column: 3, file: SmartCL.Controls.ToolBar]
var TW3ToolbarElementAlignment = [ "elAlignLeft", "elAlignRight" ];
/// TW3ToolbarButton = class (TW3ToolbarElement)
///  [line: 65, column: 3, file: SmartCL.Controls.ToolBar]
var TW3ToolbarButton = {
   $ClassName:"TW3ToolbarButton",$Parent:TW3ToolbarElement
   ,$Init:function ($) {
      TW3ToolbarElement.$Init($);
      $.GroupIndex = 0;
      $.AllowAllUp = $.FDown$1 = false;
      $.FCaption$2 = "";
      $.FGlyph$1 = null;
      $.FLayout = 0;
   }
   /// procedure TW3ToolbarButton.CBClick(EventObj: JEvent)
   ///  [line: 246, column: 28, file: SmartCL.Controls.ToolBar]
   ,CBClick:function(Self, EventObj$9) {
      TW3ToolbarElement.CBClick(Self,EventObj$9);
      if (Self.GroupIndex>0) {
         if (Self.FDown$1) {
            return;
         } else {
            TW3ToolbarButton.SetDownState$1(Self,!Self.FDown$1);
         }
      }
   }
   /// procedure TW3ToolbarButton.FinalizeObject()
   ///  [line: 230, column: 28, file: SmartCL.Controls.ToolBar]
   ,FinalizeObject:function(Self) {
      TW3Image.SetOnLoad(Self.FGlyph$1,null);
      TObject.Free(Self.FGlyph$1);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3ToolbarButton.HandleGlyphReady(Sender: TObject)
   ///  [line: 399, column: 28, file: SmartCL.Controls.ToolBar]
   ,HandleGlyphReady:function(Self, Sender$11) {
      TW3ToolbarButton.InternalSetCaption$1(Self,Self.FCaption$2);
   }
   /// procedure TW3ToolbarButton.InitializeObject()
   ///  [line: 222, column: 28, file: SmartCL.Controls.ToolBar]
   ,InitializeObject:function(Self) {
      TW3ToolbarElement.InitializeObject(Self);
      Self.FGlyph$1 = TW3TagContainer.Create$86$($New(TW3Image),null);
      TW3Image.SetOnLoad(Self.FGlyph$1,$Event1(Self,TW3ToolbarButton.HandleGlyphReady));
      Self.FDown$1 = false;
   }
   /// procedure TW3ToolbarButton.InternalSetCaption(const NewCaption: String)
   ///  [line: 328, column: 28, file: SmartCL.Controls.ToolBar]
   ,InternalSetCaption$1:function(Self, NewCaption$4) {
      var Html = "",
         wd$6 = 0,
         hd$5 = 0;
      function MakeImgTag(src$10, w, h$1) {
         return "<img src=\""+src$10+"\" "+"width="+TInteger.ToPxStr(w)+" "+"height="+TInteger.ToPxStr(h$1)+">";
      };
      Html = "";
      if (TW3Image.GetReady(Self.FGlyph$1)) {
         wd$6 = TW3Image.GetPixelWidth(Self.FGlyph$1);
         hd$5 = TW3Image.GetPixelheight(Self.FGlyph$1);
         Html = "<table border=\"0\">";
         switch (Self.FLayout) {
            case 0 :
               Html+="<tr>";
               Html+="<td>";
               Html+=MakeImgTag(TW3Image.GetSrc(Self.FGlyph$1),wd$6,hd$5);
               Html+="<\/td>";
               Html+="<\/tr>";
               Html+="<tr>";
               Html+="<td><center>"+NewCaption$4+"<\/td>";
               Html+="<\/tr>";
               break;
            case 1 :
               Html+="<tr>";
               Html+="<td>";
               Html+=MakeImgTag(TW3Image.GetSrc(Self.FGlyph$1),wd$6,hd$5);
               Html+="<\/td>";
               Html+="<td>";
               Html+="<center>"+NewCaption$4;
               Html+="<\/td>";
               Html+="<\/tr>";
               break;
            case 2 :
               Html+="<tr>";
               Html+="<td>";
               Html+="<center>"+NewCaption$4;
               Html+="<\/td>";
               Html+="<td>";
               Html+=MakeImgTag(TW3Image.GetSrc(Self.FGlyph$1),wd$6,hd$5);
               Html+="<\/td>";
               Html+="<\/tr>";
               break;
            case 3 :
               Html+="<tr>";
               Html+="<td><center>"+NewCaption$4+"<\/td>";
               Html+="<\/tr>";
               Html+="<tr>";
               Html+="<td>";
               Html+=MakeImgTag(TW3Image.GetSrc(Self.FGlyph$1),wd$6,hd$5);
               Html+="<\/td>";
               Html+="<\/tr>";
               break;
         }
         Html+="<\/table>";
      } else {
         Html = NewCaption$4;
      }
      TW3TagObj.a$46(Self,Html);
   }
   /// function TW3ToolbarButton.MakeElementTagObj() : THandle
   ///  [line: 300, column: 27, file: SmartCL.Controls.ToolBar]
   ,MakeElementTagObj:function(Self) {
      return w3_CreateHtmlElement("button");
   }
   /// procedure TW3ToolbarButton.SetCaption(NewCaption: String)
   ///  [line: 315, column: 28, file: SmartCL.Controls.ToolBar]
   ,SetCaption$3:function(Self, NewCaption$5) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         NewCaption$5 = Trim$_String_(NewCaption$5);
         if (NewCaption$5!=Self.FCaption$2) {
            Self.FCaption$2 = NewCaption$5;
            TW3ToolbarButton.InternalSetCaption$1(Self,NewCaption$5);
         }
      }
   }
   /// procedure TW3ToolbarButton.SetDownState(NewDownState: Boolean)
   ///  [line: 259, column: 28, file: SmartCL.Controls.ToolBar]
   ,SetDownState$1:function(Self, NewDownState$1) {
      var tb = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewDownState$1!=Self.FDown$1) {
            tb = TW3ToolbarElement.GetToolbar(Self);
            if (Self.GroupIndex>0) {
               if (Self.FDown$1) {
                  if (Self.AllowAllUp) {
                     Self.FDown$1 = false;
                  }
               } else if (tb!==null) {
                  TW3Toolbar.ClearGroupSelected(tb,Self.GroupIndex);
               }
            }
            if (Self.FDown$1) {
               TW3CustomControl.SetBackgroundType(Self,14);
               TW3CustomControl.SetBorderType(Self,10);
               Self.FDown$1 = false;
            } else {
               TW3CustomControl.SetBackgroundType(Self,10);
               TW3CustomControl.SetBorderType(Self,6);
               Self.FDown$1 = true;
            }
            if (tb!==null) {
               TW3Toolbar.ChildElementDown$1(tb,Self);
            }
         }
      }
   }
   /// procedure TW3ToolbarButton.SetLayout(const NewLayout: TW3GlyphLayout)
   ///  [line: 305, column: 28, file: SmartCL.Controls.ToolBar]
   ,SetLayout:function(Self, NewLayout) {
      if (NewLayout!=Self.FLayout) {
         Self.FLayout = NewLayout;
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3ToolbarButton.InternalSetCaption$1(Self,Self.FCaption$2);
         }
      }
   }
   /// procedure TW3ToolbarButton.StyleTagObject()
   ///  [line: 237, column: 28, file: SmartCL.Controls.ToolBar]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,14);
      TW3CustomControl.SetBorderType(Self,10);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3ToolbarElement.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3ToolbarElement.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3ToolbarElement.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3ToolbarElement.SetWidth
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3ToolbarButton.$Intf={
   IW3OwnedObjectAccess:[TW3ToolbarElement.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
   ,IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
}
/// TW3Toolbar = class (TW3CustomControl)
///  [line: 97, column: 3, file: SmartCL.Controls.ToolBar]
var TW3Toolbar = {
   $ClassName:"TW3Toolbar",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FAlignment = 0;
      $.FButtonHeight = 36;
      $.FButtonWidth = 89;
      $.FGCollection = [];
      $.FJustify = 0;
      $.FOnClicked = null;
      $.FSeperatorSize$1 = 32;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 125, column: 23, file: SmartCL.Controls.ToolBar]
   ,a$272:function(Self, Index$5) {
      return $As(TW3TagContainer.GetChildObject(Self,Index$5),TW3ToolbarElement);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 123, column: 37, file: SmartCL.Controls.ToolBar]
   ,a$271:function(Self) {
      return TW3TagContainer.GetChildCount(Self);
   }
   /// procedure TW3Toolbar.ChildAdded(const NewChild: TW3TagContainer)
   ///  [line: 692, column: 22, file: SmartCL.Controls.ToolBar]
   ,ChildAdded:function(Self, NewChild$3) {
      var GCIndex = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if ($Is(NewChild$3,TW3ToolbarElement)) {
            GCIndex = Self.FGCollection.indexOf($As(NewChild$3,TW3ToolbarElement));
            if (GCIndex>=0) {
               Self.FGCollection.splice(GCIndex,1)
               ;
            } else if ($SetIn(Self.FComponentState,3,0,9)) {
               TW3MovableControl.Invalidate$(Self);
            }
         }
      }
      TW3TagContainer.ChildAdded(Self,NewChild$3);
   }
   /// procedure TW3Toolbar.ChildElementClicked(const Child: TW3ToolbarElement)
   ///  [line: 467, column: 22, file: SmartCL.Controls.ToolBar]
   ,ChildElementClicked$1:function(Self, Child$8) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (Child$8!==null) {
            if (Self.FOnClicked) {
               Self.FOnClicked(Child$8);
            }
         }
      }
   }
   /// procedure TW3Toolbar.ChildElementDown(const Child: TW3CustomControl)
   ///  [line: 463, column: 22, file: SmartCL.Controls.ToolBar]
   ,ChildElementDown$1:function(Self, Child$9) {
      /* null */
   }
   /// procedure TW3Toolbar.ChildRemoved(const OldChild: TW3TagContainer)
   ///  [line: 718, column: 22, file: SmartCL.Controls.ToolBar]
   ,ChildRemoved:function(Self, OldChild$2) {
      var GCIndex$1 = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if ($Is(OldChild$2,TW3ToolbarElement)) {
            GCIndex$1 = Self.FGCollection.indexOf($As(OldChild$2,TW3ToolbarElement));
            if (GCIndex$1>=0) {
               Self.FGCollection.splice(GCIndex$1,1)
               ;
            } else if ($SetIn(Self.FComponentState,3,0,9)) {
               TW3MovableControl.Invalidate$(Self);
            }
         }
      }
      TW3TagContainer.ChildRemoved(Self,OldChild$2);
   }
   /// procedure TW3Toolbar.ClearGroupSelected(const GroupIndex: Integer)
   ///  [line: 438, column: 22, file: SmartCL.Controls.ToolBar]
   ,ClearGroupSelected:function(Self, GroupIndex$5) {
      var i$2 = 0;
      var LButton = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         TW3TagObj.BeginUpdate(Self);
         try {
            var $temp56;
            for(i$2=0,$temp56=TW3Toolbar.a$271(Self);i$2<$temp56;i$2++) {
               if ($Is(TW3Toolbar.a$272(Self,i$2),TW3ToolbarButton)) {
                  LButton = $As(TW3Toolbar.a$272(Self,i$2),TW3ToolbarButton);
                  if (LButton.GroupIndex==GroupIndex$5) {
                     if (LButton.FDown$1) {
                        TW3ToolbarButton.SetDownState$1(LButton,false);
                     }
                  }
               }
            }
         } finally {
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// function TW3Toolbar.CreationFlags() : TW3CreationFlags
   ///  [line: 427, column: 21, file: SmartCL.Controls.ToolBar]
   ,CreationFlags:function(Self) {
      var Result = [0];
      Result = TW3TagObj.CreationFlags(Self);
      $SetInc(Result,1,0,8);
      $SetInc(Result,2,0,8);
      $SetInc(Result,3,0,8);
      $SetInc(Result,5,0,8);
      $SetExc(Result,4,0,8);
      return Result
   }
   /// procedure TW3Toolbar.InitializeObject()
   ///  [line: 408, column: 22, file: SmartCL.Controls.ToolBar]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3TagObj.SetDisplayMode(Self,2);
      Self.FButtonWidth = 100;
      Self.FButtonHeight = 30;
      Self.SimulateMouseEvents = true;
      Self.FTransparentEvents = true;
   }
   /// procedure TW3Toolbar.Resize()
   ///  [line: 589, column: 22, file: SmartCL.Controls.ToolBar]
   ,Resize:function(Self) {
      var x$85 = 0;
      var LItem$10 = null;
      TW3MovableControl.Resize(Self);
      var $temp57;
      for(x$85=0,$temp57=TW3Toolbar.a$271(Self);x$85<$temp57;x$85++) {
         LItem$10 = TW3Toolbar.a$272(Self,x$85);
         if ($Is(LItem$10,TW3ToolbarSeparator)) {
            if (TW3MovableControl.GetWidth$(LItem$10)!=Self.FSeperatorSize$1) {
               TW3MovableControl.SetWidth$(LItem$10,Self.FSeperatorSize$1);
            }
            if (w3_GetStyleAsStr(LItem$10.FHandle$3,"height")!="100%") {
               LItem$10.FHandle$3.style.height = "100%";
            }
         } else if ($Is(LItem$10,TW3ToolbarButton)) {
            if (TW3MovableControl.GetHeight$(LItem$10)!=Self.FButtonHeight) {
               TW3MovableControl.SetSize$2$(LItem$10,Self.FButtonWidth,Self.FButtonHeight);
            }
         }
      }
   }
   /// procedure TW3Toolbar.SetAlignment(const NewAlignment: TW3ToolbarElementAlignment)
   ///  [line: 502, column: 22, file: SmartCL.Controls.ToolBar]
   ,SetAlignment:function(Self, NewAlignment) {
      var x$86 = 0;
      var Item = null;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewAlignment!=Self.FAlignment) {
            TW3TagObj.BeginUpdate(Self);
            Self.FAlignment = NewAlignment;
            var $temp58;
            for(x$86=0,$temp58=TW3Toolbar.a$271(Self);x$86<$temp58;x$86++) {
               Item = TW3Toolbar.a$272(Self,x$86);
               if ($Is(Item,TW3ToolbarButton)) {
                  switch (NewAlignment) {
                     case 0 :
                        if (TW3TagStyle.Contains$2(TW3CustomControl.GetTagStyle(Item),"TW3ToolElementAlignRight")) {
                           TW3TagStyle.RemoveByName(TW3CustomControl.GetTagStyle(Item),"TW3ToolElementAlignRight");
                        }
                        TW3TagStyle.Add$2(TW3CustomControl.GetTagStyle(Item),"TW3ToolElementAlignLeft");
                        break;
                     case 1 :
                        if (TW3TagStyle.Contains$2(TW3CustomControl.GetTagStyle(Item),"TW3ToolElementAlignLeft")) {
                           TW3TagStyle.RemoveByName(TW3CustomControl.GetTagStyle(Item),"TW3ToolElementAlignLeft");
                        }
                        TW3TagStyle.Add$2(TW3CustomControl.GetTagStyle(Item),"TW3ToolElementAlignRight");
                        break;
                  }
               }
            }
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3Toolbar.SetButtonHeight(const NewHeight: Integer)
   ///  [line: 572, column: 22, file: SmartCL.Controls.ToolBar]
   ,SetButtonHeight:function(Self, NewHeight$11) {
      var Temp$7 = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Temp$7 = (NewHeight$11>16)?NewHeight$11:16;
         if (Temp$7!=Self.FButtonHeight) {
            TW3TagObj.BeginUpdate(Self);
            Self.FButtonHeight = Temp$7;
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3Toolbar.SetButtonWidth(const NewWidth: Integer)
   ///  [line: 557, column: 22, file: SmartCL.Controls.ToolBar]
   ,SetButtonWidth:function(Self, NewWidth$12) {
      var Temp$8 = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Temp$8 = (NewWidth$12>16)?NewWidth$12:16;
         if (Temp$8!=Self.FButtonWidth) {
            TW3TagObj.BeginUpdate(Self);
            Self.FButtonWidth = Temp$8;
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3Toolbar.SetJustify(const NewJustify: TW3ToolbarJustification)
   ///  [line: 479, column: 22, file: SmartCL.Controls.ToolBar]
   ,SetJustify:function(Self, NewJustify) {
      var LData$6 = "";
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewJustify!=Self.FJustify) {
            TW3TagObj.BeginUpdate(Self);
            try {
               Self.FJustify = NewJustify;
               switch (NewJustify) {
                  case 0 :
                     LData$6 = "flex-start";
                     break;
                  case 1 :
                     LData$6 = "space-around";
                     break;
               }
               Self.FHandle$3.style["justify-content"] = LData$6;
            } finally {
               TW3TagObj.EndUpdate(Self);
            }
         }
      }
   }
   /// procedure TW3Toolbar.SetSeperatorSize(const NewSeperatorSize: Integer)
   ///  [line: 542, column: 22, file: SmartCL.Controls.ToolBar]
   ,SetSeperatorSize:function(Self, NewSeperatorSize) {
      var Temp$9 = 0;
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Temp$9 = (NewSeperatorSize>16)?NewSeperatorSize:16;
         if (Temp$9!=Self.FSeperatorSize$1) {
            TW3TagObj.BeginUpdate(Self);
            Self.FSeperatorSize$1 = Temp$9;
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3Toolbar.StyleTagObject()
   ///  [line: 418, column: 22, file: SmartCL.Controls.ToolBar]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,13);
      TW3CustomControl.SetBorderType(Self,9);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded$:function($){return $.ClassType.ChildAdded.apply($.ClassType, arguments)}
   ,ChildRemoved$:function($){return $.ClassType.ChildRemoved.apply($.ClassType, arguments)}
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3Toolbar.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3HeaderTitle = class (TW3CustomControl)
///  [line: 27, column: 3, file: SmartCL.Controls.Header]
var TW3HeaderTitle = {
   $ClassName:"TW3HeaderTitle",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// function TW3HeaderTitle.GetCaption() : String
   ///  [line: 131, column: 25, file: SmartCL.Controls.Header]
   ,GetCaption$2:function(Self) {
      var Result = "";
      if (Self.FHandle$3) {
         Result = TW3TagObj.a$45(Self);
      }
      return Result
   }
   /// procedure TW3HeaderTitle.SetCaption(const NewCaption: String)
   ///  [line: 137, column: 26, file: SmartCL.Controls.Header]
   ,SetCaption$4:function(Self, NewCaption$6) {
      if (Self.FHandle$3) {
         TW3TagObj.a$46(Self,NewCaption$6);
      }
   }
   /// procedure TW3HeaderTitle.InitializeObject()
   ///  [line: 114, column: 26, file: SmartCL.Controls.Header]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3TagObj.SetPositionMode(Self,22);
      TW3TagObj.SetDisplayMode(Self,1);
      TW3HeaderTitle.SetCaption$4(Self,"Header title");
   }
   /// function TW3HeaderTitle.CreationFlags() : TW3CreationFlags
   ///  [line: 122, column: 25, file: SmartCL.Controls.Header]
   ,CreationFlags:function(Self) {
      var Result = [0];
      Result = TW3TagObj.CreationFlags(Self);
      $SetExc(Result,1,0,8);
      $SetExc(Result,2,0,8);
      $SetExc(Result,3,0,8);
      $SetExc(Result,6,0,8);
      return Result
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3HeaderTitle.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ToolButton = class (TW3CustomControl)
///  [line: 25, column: 3, file: SmartCL.Controls.ToolButton]
var TW3ToolButton = {
   $ClassName:"TW3ToolButton",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// function TW3ToolButton.GetCaption() : String
   ///  [line: 66, column: 24, file: SmartCL.Controls.ToolButton]
   ,GetCaption$3:function(Self) {
      var Result = "";
      if (Self.FHandle$3) {
         Result = String(Self.FHandle$3.innerHTML);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3ToolButton.GetCaption", TObject.ClassName(Self.ClassType), "invalid handle error"]);
      }
      return Result
   }
   /// procedure TW3ToolButton.SetCaption(const NewCaption: String)
   ///  [line: 75, column: 25, file: SmartCL.Controls.ToolButton]
   ,SetCaption$5:function(Self, NewCaption$7) {
      if (Self.FHandle$3) {
         Self.FHandle$3.innerHTML = NewCaption$7;
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3ToolButton.SetCaption", TObject.ClassName(Self.ClassType), "invalid handle error"]);
      }
   }
   /// procedure TW3ToolButton.InitializeObject()
   ///  [line: 46, column: 25, file: SmartCL.Controls.ToolButton]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3MovableControl.SetSize$2$(Self,70,30);
   }
   /// function TW3ToolButton.MakeElementTagObj() : THandle
   ///  [line: 52, column: 24, file: SmartCL.Controls.ToolButton]
   ,MakeElementTagObj:function(Self) {
      return w3_CreateHtmlElement("button");
   }
   /// procedure TW3ToolButton.StyleTagObject()
   ///  [line: 57, column: 25, file: SmartCL.Controls.ToolButton]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBackgroundType(Self,14);
      TW3CustomControl.SetBorderType(Self,10);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3ToolButton.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3HeaderButton = class (TW3ToolButton)
///  [line: 38, column: 3, file: SmartCL.Controls.Header]
var TW3HeaderButton = {
   $ClassName:"TW3HeaderButton",$Parent:TW3ToolButton
   ,$Init:function ($) {
      TW3ToolButton.$Init($);
   }
   /// procedure TW3HeaderButton.SetWidth(const NewWidth: Integer)
   ///  [line: 92, column: 27, file: SmartCL.Controls.Header]
   ,SetWidth:function(Self, NewWidth$13) {
      TW3MovableControl.SetWidth(Self,NewWidth$13);
      Self.FHandle$3.style["flex-basis"] = TInteger.ToPxStr(NewWidth$13);
   }
   /// procedure TW3HeaderButton.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 98, column: 27, file: SmartCL.Controls.Header]
   ,SetSize$2:function(Self, NewWidth$14, NewHeight$12) {
      TW3MovableControl.SetSize$2(Self,NewWidth$14,NewHeight$12);
      Self.FHandle$3.style["flex-basis"] = TInteger.ToPxStr(NewWidth$14);
   }
   /// procedure TW3HeaderButton.SetBounds(const NewLeft: Integer; const NewTop: Integer; const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 104, column: 27, file: SmartCL.Controls.Header]
   ,SetBounds:function(Self, NewLeft$9, NewTop$9, NewWidth$15, NewHeight$13) {
      TW3MovableControl.SetBounds(Self,NewLeft$9,NewTop$9,NewWidth$15,NewHeight$13);
      Self.FHandle$3.style["flex-basis"] = TInteger.ToPxStr(NewWidth$15);
   }
   /// procedure TW3HeaderButton.InitializeObject()
   ///  [line: 76, column: 27, file: SmartCL.Controls.Header]
   ,InitializeObject:function(Self) {
      TW3ToolButton.InitializeObject(Self);
      TW3TagObj.SetPositionMode(Self,22);
      TW3TagObj.SetDisplayMode(Self,1);
   }
   /// function TW3HeaderButton.CreationFlags() : TW3CreationFlags
   ///  [line: 83, column: 26, file: SmartCL.Controls.Header]
   ,CreationFlags:function(Self) {
      var Result = [0];
      Result = TW3TagObj.CreationFlags(Self);
      $SetExc(Result,1,0,8);
      $SetExc(Result,2,0,8);
      $SetExc(Result,3,0,8);
      $SetExc(Result,6,0,8);
      return Result
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags$:function($){return $.ClassType.CreationFlags($)}
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3ToolButton.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3ToolButton.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds$:function($){return $.ClassType.SetBounds.apply($.ClassType, arguments)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2$:function($){return $.ClassType.SetSize$2.apply($.ClassType, arguments)}
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3HeaderButton.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TForm1 = class (TW3Form)
///  [line: 11, column: 3, file: Form1]
var TForm1 = {
   $ClassName:"TForm1",$Parent:TW3Form
   ,$Init:function ($) {
      TW3Form.$Init($);
      $.fLayout = $.fLeftBar = $.fRightBar = null;
   }
   /// procedure TForm1.InitializeForm()
   ///  [line: 27, column: 18, file: Form1]
   ,InitializeForm:function(Self) {
      TW3CustomForm.InitializeForm(Self);
   }
   /// procedure TForm1.InitializeObject()
   ///  [line: 33, column: 18, file: Form1]
   ,InitializeObject:function(Self) {
      TW3CustomForm.InitializeObject(Self);
      TW3CustomForm.SetCaption(Self,"W3Form");
      TW3TagContainer.SetComponentName(Self,"Form1");
      Self.fLeftBar = TW3TagContainer.Create$86$($New(TW3Panel),Self);
      Self.fRightBar = TW3TagContainer.Create$86$($New(TW3Panel),Self);
      Self.fLayout = Layout$1.Client(Layout$1,Layout$1.Margins$2(Layout$1,10),[Layout$1.Left$7(Layout$1,Layout$1.Width$13(Layout$1,100),Self.fLeftBar), Layout$1.Right$5(Layout$1,Layout$1.Width$13(Layout$1,100),Self.fRightBar)].slice());
   }
   /// procedure TForm1.Resize()
   ///  [line: 46, column: 18, file: Form1]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.fLayout) {
         TLayout.Resize$8$(Self.fLayout,Self);
      }
   }
   ,Destroy:TW3CustomForm.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomForm.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3CustomForm.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
TForm1.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TLayoutConfig = class (TObject)
///  [line: 25, column: 3, file: SmartCL.Layout]
var TLayoutConfig = {
   $ClassName:"TLayoutConfig",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Height$10$:function($){return $.ClassType.Height$10.apply($.ClassType, arguments)}
   ,Margins$1$:function($){return $.ClassType.Margins$1.apply($.ClassType, arguments)}
   ,Margins$:function($){return $.ClassType.Margins.apply($.ClassType, arguments)}
   ,Padding$3$:function($){return $.ClassType.Padding$3.apply($.ClassType, arguments)}
   ,Padding$2$:function($){return $.ClassType.Padding$2.apply($.ClassType, arguments)}
   ,Spacing$:function($){return $.ClassType.Spacing.apply($.ClassType, arguments)}
   ,Stretch$2$:function($){return $.ClassType.Stretch$2($)}
   ,Width$12$:function($){return $.ClassType.Width$12.apply($.ClassType, arguments)}
};
/// TLayout = class (TObject)
///  [line: 36, column: 3, file: SmartCL.Layout]
var TLayout = {
   $ClassName:"TLayout",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Resize$8$:function($){return $.ClassType.Resize$8.apply($.ClassType, arguments)}
   ,Resize$7$:function($){return $.ClassType.Resize$7.apply($.ClassType, arguments)}
   ,Config$:function($){return $.ClassType.Config($)}
};
/// Layout = class (TObject)
///  [line: 45, column: 3, file: SmartCL.Layout]
var Layout$1 = {
   $ClassName:"Layout",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function Layout.Client(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1227, column: 23, file: SmartCL.Layout]
   ,Client:function(Self, config, controls$1) {
      return TLayoutImpl.Create$157($New(TLayoutImpl),4,config,controls$1);
   }
   /// function Layout.Left(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1075, column: 23, file: SmartCL.Layout]
   ,Left$8:function(Self, config$1, controls$2) {
      var Result = null;
      var iControl$1 = 0;
      var inner = [];
      if (controls$2.length<=1||NotAllComponents(controls$2)) {
         Result = TLayoutImpl.Create$157($New(TLayoutImpl),0,config$1,controls$2);
      } else {
         $ArraySetLenC(inner,controls$2.length,function (){return null});
         var $temp59;
         for(iControl$1=0,$temp59=controls$2.length;iControl$1<$temp59;iControl$1++) {
            inner[iControl$1]=TLayoutImpl.Create$157($New(TLayoutImpl),0,config$1,[controls$2[iControl$1]].slice());
         }
         Result = TLayoutImpl.Create$157($New(TLayoutImpl),0,config$1,inner);
      }
      return Result
   }
   /// function Layout.Left(config: TLayoutConfig; control: TObject) : TLayout
   ///  [line: 1090, column: 23, file: SmartCL.Layout]
   ,Left$7:function(Self, config$2, control$2) {
      var Result = null;
      var objArr = [];
      $ArraySetLenC(objArr,1,function (){return null});
      objArr[0]=control$2;
      Result = Layout$1.Left$8(Self,config$2,objArr);
      return Result
   }
   /// function Layout.Margins(value: Integer) : TLayoutConfig
   ///  [line: 1269, column: 23, file: SmartCL.Layout]
   ,Margins$2:function(Self, value$23) {
      return TLayoutConfig.Margins$(TObject.Create($New(TLayoutConfigImpl)),value$23);
   }
   /// function Layout.Right(config: TLayoutConfig; control: TObject) : TLayout
   ///  [line: 1128, column: 23, file: SmartCL.Layout]
   ,Right$5:function(Self, config$3, control$3) {
      var Result = null;
      var objArr$1 = [];
      $ArraySetLenC(objArr$1,1,function (){return null});
      objArr$1[0]=control$3;
      Result = Layout$1.Right$4(Self,config$3,objArr$1);
      return Result
   }
   /// function Layout.Right(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1113, column: 23, file: SmartCL.Layout]
   ,Right$4:function(Self, config$4, controls$3) {
      var Result = null;
      var iControl$2 = 0;
      var inner$1 = [];
      if (controls$3.length<=1||NotAllComponents(controls$3)) {
         Result = TLayoutImpl.Create$157($New(TLayoutImpl),2,config$4,controls$3);
      } else {
         $ArraySetLenC(inner$1,controls$3.length,function (){return null});
         var $temp60;
         for(iControl$2=0,$temp60=controls$3.length;iControl$2<$temp60;iControl$2++) {
            inner$1[(controls$3.length-1)-iControl$2]=TLayoutImpl.Create$157($New(TLayoutImpl),2,config$4,[controls$3[iControl$2]].slice());
         }
         Result = TLayoutImpl.Create$157($New(TLayoutImpl),2,config$4,inner$1);
      }
      return Result
   }
   /// function Layout.Width(aWidth: Integer) : TLayoutConfig
   ///  [line: 1299, column: 23, file: SmartCL.Layout]
   ,Width$13:function(Self, aWidth$2) {
      return TLayoutConfig.Width$12$(TObject.Create($New(TLayoutConfigImpl)),aWidth$2);
   }
   ,Destroy:TObject.Destroy
};
function VarToString(v) {
   var Result = "";
   if (v==null) {
      Result = "N";
   } else {
      Result = (parseInt(v,10)).toString();
   }
   return Result
};
/// TLayoutRect = record
///  [line: 92, column: 3, file: SmartCL.Layout]
function Copy$TLayoutRect(s,d) {
   d.Bottom$8=s.Bottom$8;
   d.Height$12=s.Height$12;
   d.Left$11=s.Left$11;
   d.Right$8=s.Right$8;
   d.Top$11=s.Top$11;
   d.Width$14=s.Width$14;
   return d;
}
function Clone$TLayoutRect($) {
   return {
      Bottom$8:$.Bottom$8,
      Height$12:$.Height$12,
      Left$11:$.Left$11,
      Right$8:$.Right$8,
      Top$11:$.Top$11,
      Width$14:$.Width$14
   }
}
/// function TLayoutRect.IsHorizontalSet(var Self: TLayoutRect) : Boolean
///  [line: 257, column: 22, file: SmartCL.Layout]
function TLayoutRect$IsHorizontalSet(Self$28) {
   return Self$28.Left$11!=null&&Self$28.Width$14!=null;
}
/// function TLayoutRect.IsVerticalSet(var Self: TLayoutRect) : Boolean
///  [line: 262, column: 22, file: SmartCL.Layout]
function TLayoutRect$IsVerticalSet(Self$29) {
   return Self$29.Top$11!=null&&Self$29.Height$12!=null;
}
/// procedure TLayoutRect.Resolve(var Self: TLayoutRect)
///  [line: 267, column: 23, file: SmartCL.Layout]
function TLayoutRect$Resolve(Self$30) {
   if (Self$30.Left$11==null&&Self$30.Right$8!=null&&Self$30.Width$14!=null) {
      Self$30.Left$11 = Self$30.Right$8-Self$30.Width$14;
   } else if (Self$30.Right$8==null&&Self$30.Left$11!=null&&Self$30.Width$14!=null) {
      Self$30.Right$8 = Self$30.Left$11+Self$30.Width$14;
   } else if (Self$30.Width$14==null&&Self$30.Left$11!=null&&Self$30.Right$8!=null) {
      Self$30.Width$14 = Self$30.Right$8-Self$30.Left$11;
   }
   if (Self$30.Top$11==null&&Self$30.Bottom$8!=null&&Self$30.Height$12!=null) {
      Self$30.Top$11 = Self$30.Bottom$8-Self$30.Height$12;
   } else if (Self$30.Bottom$8==null&&Self$30.Top$11!=null&&Self$30.Height$12!=null) {
      Self$30.Bottom$8 = Self$30.Top$11+Self$30.Height$12;
   } else if (Self$30.Height$12==null&&Self$30.Top$11!=null&&Self$30.Bottom$8!=null) {
      Self$30.Height$12 = Self$30.Bottom$8-Self$30.Top$11;
   }
}
/// procedure TLayoutRect.SetBounds(var Self: TLayoutRect; aLeft: Variant; aRight: Variant; aWidth: Variant; aTop: Variant; aBottom: Variant; aHeight: Variant)
///  [line: 277, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetBounds$10(Self$31, aLeft$1, aRight$1, aWidth$3, aTop$1, aBottom$1, aHeight$2) {
   Self$31.Left$11 = aLeft$1;
   Self$31.Right$8 = aRight$1;
   Self$31.Width$14 = aWidth$3;
   Self$31.Top$11 = aTop$1;
   Self$31.Bottom$8 = aBottom$1;
   Self$31.Height$12 = aHeight$2;
   TLayoutRect$Resolve(Self$31);
}
/// procedure TLayoutRect.SetFromControl(var Self: TLayoutRect; control: TW3CustomControl)
///  [line: 288, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetFromControl(Self$32, control$4) {
   TLayoutRect$SetBounds$10(Self$32,TW3MovableControl.GetLeft(control$4),null,TW3MovableControl.ClientWidth(control$4),TW3MovableControl.GetTop(control$4),null,TW3MovableControl.ClientHeight(control$4));
}
/// procedure TLayoutRect.SetFromRect(var Self: TLayoutRect; rect: TRect)
///  [line: 293, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetFromRect(Self$33, rect$2) {
   TLayoutRect$SetBounds$10(Self$33,rect$2.Left$3,null,TRect$Width$6(rect$2),rect$2.Top$3,null,TRect$Height$5(rect$2));
}
/// procedure TLayoutRect.SetHeight(var Self: TLayoutRect; value: Integer)
///  [line: 298, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetHeight$4(Self$34, value$24) {
   Self$34.Height$12 = value$24;
   TLayoutRect$Resolve(Self$34);
}
/// procedure TLayoutRect.SetLeft(var Self: TLayoutRect; value: Integer)
///  [line: 313, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetLeft$5(Self$35, value$25) {
   Self$35.Left$11 = value$25;
   TLayoutRect$Resolve(Self$35);
}
/// procedure TLayoutRect.SetTop(var Self: TLayoutRect; value: Integer)
///  [line: 325, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetTop$2(Self$36, value$26) {
   Self$36.Top$11 = value$26;
   TLayoutRect$Resolve(Self$36);
}
/// procedure TLayoutRect.SetWidth(var Self: TLayoutRect; value: Integer)
///  [line: 346, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetWidth$7(Self$37, value$27) {
   Self$37.Width$14 = value$27;
   TLayoutRect$Resolve(Self$37);
}
/// procedure TLayoutRect.Shrink(var Self: TLayoutRect; rect: TRect)
///  [line: 352, column: 23, file: SmartCL.Layout]
function TLayoutRect$Shrink$1(Self$38, rect$3) {
   if (Self$38.Left$11!=null) {
      Self$38.Left$11 = Self$38.Left$11+rect$3.Left$3;
   }
   if (Self$38.Right$8!=null) {
      Self$38.Right$8 = Self$38.Right$8-rect$3.Right$1;
   }
   if (Self$38.Width$14!=null) {
      Self$38.Width$14 = Self$38.Width$14-rect$3.Left$3-rect$3.Right$1;
   }
   if (Self$38.Top$11!=null) {
      Self$38.Top$11 = Self$38.Top$11+rect$3.Top$3;
   }
   if (Self$38.Bottom$8!=null) {
      Self$38.Bottom$8 = Self$38.Bottom$8-rect$3.Bottom$1;
   }
   if (Self$38.Height$12!=null) {
      Self$38.Height$12 = Self$38.Height$12-rect$3.Top$3-rect$3.Bottom$1;
   }
}
/// TLayoutImpl = class (TLayout)
///  [line: 164, column: 3, file: SmartCL.Layout]
var TLayoutImpl = {
   $ClassName:"TLayoutImpl",$Parent:TLayout
   ,$Init:function ($) {
      TLayout.$Init($);
      $.FAlign = 0;
      $.FBounds = {Bottom$8:undefined,Height$12:undefined,Left$11:undefined,Right$8:undefined,Top$11:undefined,Width$14:undefined};
      $.FClientArea = {Bottom$8:undefined,Height$12:undefined,Left$11:undefined,Right$8:undefined,Top$11:undefined,Width$14:undefined};
      $.FConfig = null;
      $.FControls = [];
      $.FName$4 = "";
   }
   /// procedure TLayoutImpl.AlignControl(control: TObject)
   ///  [line: 617, column: 23, file: SmartCL.Layout]
   ,AlignControl:function(Self, control$5) {
      TLayoutImpl.ResolveDimensionsFrom(Self,control$5);
      TLayoutImpl.ResizeControl(Self,control$5);
      if ($Is(control$5,TLayoutImpl)) {
         TLayoutImpl.InternalResize($As(control$5,TLayoutImpl),Self);
      }
      TLayoutImpl.ResolveDimensionsFrom(Self,control$5);
      TLayoutImpl.ShrinkClientArea(Self,control$5);
   }
   /// procedure TLayoutImpl.CalculateUsableArea(container: TObject)
   ///  [line: 631, column: 23, file: SmartCL.Layout]
   ,CalculateUsableArea:function(Self, container) {
      var clientArea = {Bottom$8:undefined,Height$12:undefined,Left$11:undefined,Right$8:undefined,Top$11:undefined,Width$14:undefined};
      var p1,
         p2;
      clientArea = Dimensions.GetClientArea(Dimensions,container);
      p1 = null;
      p2 = null;
      switch (Self.FAlign) {
         case 0 :
         case 2 :
            if (!Self.FAlign) {
               p1 = clientArea.Left$11;
            } else {
               p2 = clientArea.Right$8;
            }
            TLayoutRect$SetBounds$10(Self.FBounds,p1,p2,Self.FConfig.FWidth$2,clientArea.Top$11,clientArea.Bottom$8,clientArea.Height$12);
            break;
         case 1 :
         case 3 :
            if (Self.FAlign==1) {
               p1 = clientArea.Top$11;
            } else {
               p2 = clientArea.Bottom$8;
            }
            TLayoutRect$SetBounds$10(Self.FBounds,clientArea.Left$11,clientArea.Right$8,clientArea.Width$14,p1,p2,Self.FConfig.FHeight$2);
            break;
         case 4 :
         case 5 :
            TLayoutRect$SetBounds$10(Self.FBounds,clientArea.Left$11,clientArea.Right$8,clientArea.Width$14,clientArea.Top$11,clientArea.Bottom$8,clientArea.Height$12);
            break;
      }
      TLayoutRect$Shrink$1(Self.FBounds,Clone$TRect(Self.FConfig.FMargins));
      Copy$TLayoutRect(Self.FBounds,Self.FClientArea);
      TLayoutRect$Shrink$1(Self.FClientArea,Clone$TRect(Self.FConfig.FPadding));
      TLayoutImpl.ResizeStretchedChildren(Self);
   }
   /// function TLayoutImpl.Config() : TLayoutConfig
   ///  [line: 674, column: 22, file: SmartCL.Layout]
   ,Config:function(Self) {
      return Self.FConfig;
   }
   /// constructor TLayoutImpl.Create(align: TAlign; config: TLayoutConfig; controls: TObjectArr)
   ///  [line: 608, column: 25, file: SmartCL.Layout]
   ,Create$157:function(Self, align$18, config$5, controls$4) {
      Self.FAlign = align$18;
      Self.FConfig = TLayoutConfigImpl.CreateFrom($New(TLayoutConfigImpl),$As(config$5,TLayoutConfigImpl));
      Self.FControls = controls$4;
      ++LayoutCount;
      Self.FName$4 = ("Layout "+LayoutCount.toString()+" ("+AlignToString(align$18).toString()+")");
      return Self
   }
   /// procedure TLayoutImpl.InternalResize(container: TObject)
   ///  [line: 679, column: 23, file: SmartCL.Layout]
   ,InternalResize:function(Self, container$1) {
      var gotClient = false;
      var iControl$3 = 0;
      TLayoutImpl.CalculateUsableArea(Self,container$1);
      var $temp61;
      for(iControl$3=0,$temp61=Self.FControls.length;iControl$3<$temp61;iControl$3++) {
         if ($Is(Self.FControls[iControl$3],TW3CustomControl)||$As(Self.FControls[iControl$3],TLayoutImpl).FAlign!=4) {
            TLayoutImpl.AlignControl(Self,Self.FControls[iControl$3]);
         }
      }
      gotClient = false;
      var $temp62;
      for(iControl$3=0,$temp62=Self.FControls.length;iControl$3<$temp62;iControl$3++) {
         if ($Is(Self.FControls[iControl$3],TLayoutImpl)&&$As(Self.FControls[iControl$3],TLayoutImpl).FAlign==4) {
            if (gotClient) {
               throw Exception.Create($New(Exception),"Layout can contain only one client-aligned child");
            }
            gotClient = true;
            TLayoutImpl.AlignControl(Self,Self.FControls[iControl$3]);
         }
      }
   }
   /// procedure TLayoutImpl.LoggedResize(container: TObject)
   ///  [line: 729, column: 23, file: SmartCL.Layout]
   ,LoggedResize:function(Self, container$2) {
      Logger = "";
      try {
         try {
            TLayoutImpl.ResolveDimensionsFromChildren(Self);
            TLayoutImpl.InternalResize(Self,container$2);
         } catch ($e) {
            var E = $W($e);
            throw $e;
         }
      } finally {
         /* null */
      }
   }
   /// procedure TLayoutImpl.Resize(rect: TRect)
   ///  [line: 758, column: 23, file: SmartCL.Layout]
   ,Resize$7:function(Self, rect$4) {
      TLayoutImpl.LoggedResize(Self,TLayoutArea.Create$158($New(TLayoutArea),Clone$TRect(rect$4)));
   }
   /// procedure TLayoutImpl.Resize(container: TW3CustomControl)
   ///  [line: 753, column: 23, file: SmartCL.Layout]
   ,Resize$8:function(Self, container$3) {
      TLayoutImpl.LoggedResize(Self,container$3);
   }
   /// procedure TLayoutImpl.ResizeControl(control: TObject)
   ///  [line: 763, column: 23, file: SmartCL.Layout]
   ,ResizeControl:function(Self, control$6) {
      if ($Is(control$6,TLayoutImpl)) {
         return;
      }
      if (Self.FClientArea.Top$11!=null) {
         if (Self.FAlign==3) {
            Dimensions.SetBottom$1(Dimensions,control$6,parseInt((Self.FClientArea.Top$11+Self.FClientArea.Height$12-Dimensions.GetOwnerTop(Dimensions,control$6)),10));
         } else if (Self.FAlign!=5) {
            Dimensions.SetTop$3(Dimensions,control$6,parseInt((Self.FClientArea.Top$11-Dimensions.GetOwnerTop(Dimensions,control$6)),10));
         } else {
            Dimensions.SetTop$3(Dimensions,control$6,parseInt((Self.FClientArea.Top$11-Dimensions.GetOwnerTop(Dimensions,control$6)+($Div(Self.FClientArea.Height$12-Dimensions.GetHeight$8(Dimensions,control$6),2))),10));
         }
      }
      if (Self.FClientArea.Left$11!=null) {
         if (Self.FAlign==2) {
            Dimensions.SetRight$4(Dimensions,control$6,parseInt((Self.FClientArea.Left$11+Self.FClientArea.Width$14-Dimensions.GetOwnerLeft(Dimensions,control$6)),10));
         } else if (Self.FAlign!=5) {
            Dimensions.SetLeft$6(Dimensions,control$6,parseInt((Self.FClientArea.Left$11-Dimensions.GetOwnerLeft(Dimensions,control$6)),10));
         } else {
            Dimensions.SetLeft$6(Dimensions,control$6,parseInt((Self.FClientArea.Left$11-Dimensions.GetOwnerLeft(Dimensions,control$6)+($Div(Self.FClientArea.Width$14-Dimensions.GetWidth$9(Dimensions,control$6),2))),10));
         }
      }
      if (Self.FAlign!=5) {
         if (Self.FClientArea.Height$12!=null) {
            Dimensions.SetHeight$5(Dimensions,control$6,parseInt(Self.FClientArea.Height$12,10));
         }
         if (Self.FClientArea.Width$14!=null) {
            Dimensions.SetWidth$8(Dimensions,control$6,parseInt(Self.FClientArea.Width$14,10));
         }
      }
   }
   /// procedure TLayoutImpl.ResizeStretchedChildren()
   ///  [line: 799, column: 23, file: SmartCL.Layout]
   ,ResizeStretchedChildren:function(Self) {
      function ResizeChildren(clientSize, align$19, dimCalc, dimSet) {
         var clientSizeInt = 0;
         var countStretched = 0;
         var dim,
            iControl$4 = 0;
         var layout = null;
         if (clientSize==null) {
            return;
         }
         countStretched = 0;
         clientSizeInt = parseInt(clientSize,10);
         var $temp63;
         for(iControl$4=0,$temp63=Self.FControls.length;iControl$4<$temp63;iControl$4++) {
            if ($Is(Self.FControls[iControl$4],TLayoutImpl)) {
               layout = $As(Self.FControls[iControl$4],TLayoutImpl);
               if (align$19.indexOf(layout.FAlign)>=0) {
                  if (layout.FConfig.FStretch) {
                     ++countStretched;
                  } else {
                     dim = dimCalc(layout);
                     if (dim!=null) {
                        clientSizeInt-=parseInt(dim,10);
                     }
                  }
               }
            }
         }
         clientSizeInt-=Self.FConfig.FSpacing*(Self.FControls.length-1);
         var $temp64;
         for(iControl$4=0,$temp64=Self.FControls.length;iControl$4<$temp64;iControl$4++) {
            if ($Is(Self.FControls[iControl$4],TLayoutImpl)) {
               layout = $As(Self.FControls[iControl$4],TLayoutImpl);
               if (align$19.indexOf(layout.FAlign)>=0) {
                  if (layout.FConfig.FStretch) {
                     dimSet(layout,$Div(clientSizeInt,countStretched));
                     clientSizeInt-=$Div(clientSizeInt,countStretched);
                     --countStretched;
                  } else {
                     dim = dimCalc(layout);
                     if (dim!=null) {
                        clientSizeInt-=parseInt(dim,10);
                     }
                  }
               }
            }
         }
      };
      ResizeChildren(Self.FClientArea.Width$14,[0, 2].slice(),function (layout$1) {
         return layout$1.FConfig.FWidth$2;
      },function (layout$2, value$28) {
         TLayoutConfig.Width$12$(layout$2.FConfig,value$28);
      });
      ResizeChildren(Self.FClientArea.Height$12,[1, 3].slice(),function (layout$3) {
         return layout$3.FConfig.FHeight$2;
      },function (layout$4, value$29) {
         TLayoutConfig.Height$10$(layout$4.FConfig,value$29);
      });
   }
   /// procedure TLayoutImpl.ResolveDimensionsFrom(control: TObject)
   ///  [line: 950, column: 23, file: SmartCL.Layout]
   ,ResolveDimensionsFrom:function(Self, control$7) {
      if ((!TLayoutRect$IsHorizontalSet(Self.FClientArea))&&Dimensions.HasWidth(Dimensions,control$7)&&((1<<Self.FAlign&53)!=0)) {
         TLayoutImpl.SetHorizontal$1(Self,Dimensions.GetWidth$9(Dimensions,control$7));
      }
      if ((!TLayoutRect$IsVerticalSet(Self.FClientArea))&&Dimensions.HasHeight(Dimensions,control$7)&&((1<<Self.FAlign&58)!=0)) {
         TLayoutImpl.SetVertical$1(Self,Dimensions.GetHeight$8(Dimensions,control$7));
      }
   }
   /// procedure TLayoutImpl.ResolveDimensionsFromChildren()
   ///  [line: 860, column: 23, file: SmartCL.Layout]
   ,ResolveDimensionsFromChildren:function(Self) {
      var control$8 = null;
      var controlCount = 0;
      var dim$1,
         iControl$5 = 0;
      var sum;
      var $temp65;
      for(iControl$5=0,$temp65=Self.FControls.length;iControl$5<$temp65;iControl$5++) {
         if ($Is(Self.FControls[iControl$5],TLayoutImpl)) {
            TLayoutImpl.ResolveDimensionsFromChildren($As(Self.FControls[iControl$5],TLayoutImpl));
         }
      }
      if (Self.FAlign==5&&Self.FConfig.FWidth$2!=null&&Self.FConfig.FHeight$2!=null) {
         return;
      }
      if (Self.FAlign==4||((1<<Self.FAlign&5)!=0)&&Self.FConfig.FWidth$2!=null||((1<<Self.FAlign&10)!=0)&&Self.FConfig.FHeight$2!=null) {
         return;
      }
      if (Self.FAlign==5) {
         /* null */
      } else {
         sum = 0;
         controlCount = 0;
         var $temp66;
         for(iControl$5=0,$temp66=Self.FControls.length;iControl$5<$temp66;iControl$5++) {
            control$8 = Self.FControls[iControl$5];
            switch (Self.FAlign) {
               case 0 :
               case 2 :
                  dim$1 = Dimensions.GetWidth$9(Dimensions,control$8);
                  break;
               case 1 :
               case 3 :
                  dim$1 = Dimensions.GetHeight$8(Dimensions,control$8);
                  break;
            }
            if (dim$1==null) {
               sum = null;
               break;
            } else {
               if (controlCount>0) {
                  sum = sum+Self.FConfig.FSpacing;
               }
               ++controlCount;
               sum = sum+dim$1;
            }
         }
      }
      if (Self.FAlign==5) {
         sum = Dimensions.GetWidth$9(Dimensions,Self.FControls[0]);
      }
      if (sum!=null&&Self.FConfig.FWidth$2==null&&((1<<Self.FAlign&37)!=0)) {
         sum = sum+Self.FConfig.FPadding.Left$3+Self.FConfig.FPadding.Right$1+Self.FConfig.FMargins.Left$3+Self.FConfig.FMargins.Right$1;
         TLayoutConfig.Width$12$(Self.FConfig,parseInt(sum,10));
      }
      if (Self.FAlign==5) {
         sum = Dimensions.GetHeight$8(Dimensions,Self.FControls[0]);
      }
      if (sum!=null&&Self.FConfig.FHeight$2==null&&((1<<Self.FAlign&42)!=0)) {
         sum = sum+Self.FConfig.FPadding.Top$3+Self.FConfig.FPadding.Bottom$1+Self.FConfig.FMargins.Top$3+Self.FConfig.FMargins.Bottom$1;
         TLayoutConfig.Height$10$(Self.FConfig,parseInt(sum,10));
      }
   }
   /// procedure TLayoutImpl.SetHorizontal(clientWidth: Variant)
   ///  [line: 972, column: 23, file: SmartCL.Layout]
   ,SetHorizontal$1:function(Self, clientWidth$1) {
      TLayoutRect$SetWidth$7(Self.FClientArea,parseInt(clientWidth$1,10));
      if (clientWidth$1!=null) {
         clientWidth$1 = clientWidth$1+Self.FConfig.FPadding.Left$3+Self.FConfig.FPadding.Right$1;
      }
      TLayoutRect$SetWidth$7(Self.FBounds,parseInt(clientWidth$1,10));
   }
   /// procedure TLayoutImpl.SetVertical(clientHeight: Variant)
   ///  [line: 981, column: 23, file: SmartCL.Layout]
   ,SetVertical$1:function(Self, clientHeight$1) {
      TLayoutRect$SetHeight$4(Self.FClientArea,parseInt(clientHeight$1,10));
      if (clientHeight$1!=null) {
         clientHeight$1 = clientHeight$1+Self.FConfig.FPadding.Top$3+Self.FConfig.FPadding.Bottom$1;
      }
      TLayoutRect$SetHeight$4(Self.FBounds,parseInt(clientHeight$1,10));
   }
   /// procedure TLayoutImpl.ShrinkClientArea(control: TObject)
   ///  [line: 990, column: 23, file: SmartCL.Layout]
   ,ShrinkClientArea:function(Self, control$9) {
      var align$20 = 0;
      var height$24,
         width$29;
      if ($Is(control$9,TLayoutImpl)) {
         align$20 = $As(control$9,TLayoutImpl).FAlign;
      } else {
         align$20 = Self.FAlign;
      }
      switch (align$20) {
         case 0 :
            width$29 = Dimensions.GetWidth$9(Dimensions,control$9);
            $Assert(width$29!=null,"width = Null","");
            $Assert(Self.FClientArea.Left$11!=null,"FClientArea.Left = Null","");
            $Assert(Dimensions.GetLeft$4(Dimensions,control$9)+Dimensions.GetOwnerLeft(Dimensions,control$9)==Self.FClientArea.Left$11,("Dimensions.GetLeft("+NameOf(control$9).toString()+")["+VarToString(Dimensions.GetLeft$4(Dimensions,control$9)).toString()+"] + Dimensions.GetOwnerLeft("+NameOf(control$9).toString()+")["+Dimensions.GetOwnerLeft(Dimensions,control$9).toString()+"] <> FClientArea.Left["+VarToString(Self.FClientArea.Left$11).toString()+"]"),"");
            Self.FClientArea.Left$11 = Self.FClientArea.Left$11+width$29+Self.FConfig.FSpacing;
            Self.FClientArea.Width$14 = Self.FClientArea.Width$14-width$29-Self.FConfig.FSpacing;
            break;
         case 1 :
            height$24 = Dimensions.GetHeight$8(Dimensions,control$9);
            $Assert(height$24!=null,"height = Null","");
            $Assert(Self.FClientArea.Top$11!=null,"FClientArea.Top = Null","");
            $Assert(Dimensions.GetTop$1(Dimensions,control$9)+Dimensions.GetOwnerTop(Dimensions,control$9)==Self.FClientArea.Top$11,("Dimensions.GetTop(["+NameOf(control$9).toString()+"])["+VarToString(Dimensions.GetTop$1(Dimensions,control$9)).toString()+"] + Dimensions.GetOwnerTop("+NameOf(control$9).toString()+")["+Dimensions.GetOwnerTop(Dimensions,control$9).toString()+"] <> FClientArea.Top["+VarToString(Self.FClientArea.Top$11).toString()+"]"),"");
            Self.FClientArea.Top$11 = Self.FClientArea.Top$11+height$24+Self.FConfig.FSpacing;
            Self.FClientArea.Height$12 = Self.FClientArea.Height$12-height$24-Self.FConfig.FSpacing;
            break;
         case 2 :
            width$29 = Dimensions.GetWidth$9(Dimensions,control$9);
            $Assert(width$29!=null,"width = Null","");
            $Assert(Self.FClientArea.Left$11!=null,"FClientArea.Left = Null","");
            $Assert(Self.FClientArea.Width$14!=null,"FClientArea.Width = Null","");
            $Assert(Dimensions.GetLeft$4(Dimensions,control$9)+Dimensions.GetOwnerLeft(Dimensions,control$9)==Self.FClientArea.Left$11+Self.FClientArea.Width$14-width$29,("Dimensions.GetLeft("+NameOf(control$9).toString()+")["+VarToString(Dimensions.GetLeft$4(Dimensions,control$9)).toString()+"] + Dimensions.GetOwnerLeft("+NameOf(control$9).toString()+")["+Dimensions.GetOwnerLeft(Dimensions,control$9).toString()+"] <> (FClientArea.Left["+VarToString(Self.FClientArea.Left$11).toString()+"] + FClientArea.Width["+VarToString(Self.FClientArea.Width$14).toString()+"] - width["+VarToString(width$29).toString()+"])"),"");
            Self.FClientArea.Right$8 = Self.FClientArea.Right$8-width$29-Self.FConfig.FSpacing;
            Self.FClientArea.Width$14 = Self.FClientArea.Width$14-width$29-Self.FConfig.FSpacing;
            break;
         case 3 :
            height$24 = Dimensions.GetHeight$8(Dimensions,control$9);
            $Assert(height$24!=null,"height = Null","");
            $Assert(Self.FClientArea.Top$11!=null,"FClientArea.Top = Null","");
            $Assert(Self.FClientArea.Height$12!=null,"FClientArea.Height = Null","");
            $Assert(Dimensions.GetTop$1(Dimensions,control$9)+Dimensions.GetOwnerTop(Dimensions,control$9)==Self.FClientArea.Top$11+Self.FClientArea.Height$12-height$24,("Dimensions.GetTop("+NameOf(control$9).toString()+")["+VarToString(Dimensions.GetTop$1(Dimensions,control$9)).toString()+"] + Dimensions.GetOwnerTop(control) <> (FClientArea.Top["+NameOf(control$9).toString()+"] + FClientArea.Height["+Dimensions.GetOwnerTop(Dimensions,control$9).toString()+"] - height["+VarToString(Self.FClientArea.Top$11).toString()+"])"),"");
            Self.FClientArea.Bottom$8 = Self.FClientArea.Bottom$8-height$24-Self.FConfig.FSpacing;
            Self.FClientArea.Height$12 = Self.FClientArea.Height$12-height$24-Self.FConfig.FSpacing;
            break;
         case 4 :
            TLayoutRect$SetBounds$10(Self.FClientArea,0,0,0,-1,-1,-1);
            break;
      }
   }
   ,Destroy:TObject.Destroy
   ,Resize$8$:function($){return $.ClassType.Resize$8.apply($.ClassType, arguments)}
   ,Resize$7$:function($){return $.ClassType.Resize$7.apply($.ClassType, arguments)}
   ,Config$:function($){return $.ClassType.Config($)}
};
/// TLayoutConfigImpl = class (TLayoutConfig)
///  [line: 138, column: 3, file: SmartCL.Layout]
var TLayoutConfigImpl = {
   $ClassName:"TLayoutConfigImpl",$Parent:TLayoutConfig
   ,$Init:function ($) {
      TLayoutConfig.$Init($);
      $.FHeight$2 = $.FWidth$2 = undefined;
      $.FMargins = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      $.FPadding = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      $.FSpacing = 0;
      $.FStretch = false;
   }
   /// constructor TLayoutConfigImpl.CreateFrom(conf: TLayoutConfigImpl)
   ///  [line: 544, column: 31, file: SmartCL.Layout]
   ,CreateFrom:function(Self, conf) {
      Self.FHeight$2 = conf.FHeight$2;
      Copy$TRect(conf.FMargins,Self.FMargins);
      Copy$TRect(conf.FPadding,Self.FPadding);
      Self.FSpacing = conf.FSpacing;
      Self.FStretch = conf.FStretch;
      Self.FWidth$2 = conf.FWidth$2;
      return Self
   }
   /// function TLayoutConfigImpl.Height(aHeight: Integer) : TLayoutConfig
   ///  [line: 600, column: 28, file: SmartCL.Layout]
   ,Height$10:function(Self, aHeight$3) {
      var Result = null;
      Self.FHeight$2 = aHeight$3;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Margins(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 565, column: 28, file: SmartCL.Layout]
   ,Margins$1:function(Self, left$2, top$4, right$2, bottom$3) {
      var Result = null;
      Self.FMargins = Create$107(left$2,top$4,right$2,bottom$3);
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Margins(value: Integer) : TLayoutConfig
   ///  [line: 560, column: 28, file: SmartCL.Layout]
   ,Margins:function(Self, value$30) {
      return TLayoutConfig.Margins$1$(Self,value$30,value$30,value$30,value$30);
   }
   /// function TLayoutConfigImpl.Padding(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 576, column: 28, file: SmartCL.Layout]
   ,Padding$3:function(Self, left$3, top$5, right$3, bottom$4) {
      var Result = null;
      Self.FPadding = Create$107(left$3,top$5,right$3,bottom$4);
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Padding(value: Integer) : TLayoutConfig
   ///  [line: 571, column: 28, file: SmartCL.Layout]
   ,Padding$2:function(Self, value$31) {
      return TLayoutConfig.Padding$3$(Self,value$31,value$31,value$31,value$31);
   }
   /// function TLayoutConfigImpl.Spacing(distance: Integer) : TLayoutConfig
   ///  [line: 582, column: 28, file: SmartCL.Layout]
   ,Spacing:function(Self, distance) {
      var Result = null;
      Self.FSpacing = distance;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Stretch() : TLayoutConfig
   ///  [line: 588, column: 28, file: SmartCL.Layout]
   ,Stretch$2:function(Self) {
      var Result = null;
      Self.FStretch = true;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Width(aWidth: Integer) : TLayoutConfig
   ///  [line: 594, column: 28, file: SmartCL.Layout]
   ,Width$12:function(Self, aWidth$4) {
      var Result = null;
      Self.FWidth$2 = aWidth$4;
      Result = Self;
      return Result
   }
   ,Destroy:TObject.Destroy
   ,Height$10$:function($){return $.ClassType.Height$10.apply($.ClassType, arguments)}
   ,Margins$1$:function($){return $.ClassType.Margins$1.apply($.ClassType, arguments)}
   ,Margins$:function($){return $.ClassType.Margins.apply($.ClassType, arguments)}
   ,Padding$3$:function($){return $.ClassType.Padding$3.apply($.ClassType, arguments)}
   ,Padding$2$:function($){return $.ClassType.Padding$2.apply($.ClassType, arguments)}
   ,Spacing$:function($){return $.ClassType.Spacing.apply($.ClassType, arguments)}
   ,Stretch$2$:function($){return $.ClassType.Stretch$2($)}
   ,Width$12$:function($){return $.ClassType.Width$12.apply($.ClassType, arguments)}
};
/// TLayoutArea = class (TObject)
///  [line: 84, column: 3, file: SmartCL.Layout]
var TLayoutArea = {
   $ClassName:"TLayoutArea",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FRect = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
   }
   /// constructor TLayoutArea.Create(rect: TRect)
   ///  [line: 233, column: 25, file: SmartCL.Layout]
   ,Create$158:function(Self, rect$5) {
      TObject.Create(Self);
      Copy$TRect(rect$5,Self.FRect);
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TAlign enumeration
///  [line: 82, column: 3, file: SmartCL.Layout]
var TAlign = [ "Left", "Top", "Right", "Bottom", "Client", "Center" ];
function NotAllComponents(controls$5) {
   var Result = false;
   var iControl = 0;
   Result = true;
   var $temp67;
   for(iControl=0,$temp67=controls$5.length;iControl<$temp67;iControl++) {
      if (!$Is(controls$5[iControl],TW3CustomControl)) {
         return Result;
      }
   }
   Result = false;
   return Result
};
function NameOf(control$10) {
   var Result = "";
   if ($Is(control$10,TLayoutImpl)) {
      Result = $As(control$10,TLayoutImpl).FName$4;
   } else {
      Result = TW3TagContainer.GetComponentName($As(control$10,TW3CustomControl));
   }
   return Result
};
/// Dimensions = class (TObject)
///  [line: 118, column: 3, file: SmartCL.Layout]
var Dimensions = {
   $ClassName:"Dimensions",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function Dimensions.GetClientArea(control: TObject) : TLayoutRect
   ///  [line: 378, column: 27, file: SmartCL.Layout]
   ,GetClientArea:function(Self, control$11) {
      var Result = {Bottom$8:undefined,Height$12:undefined,Left$11:undefined,Right$8:undefined,Top$11:undefined,Width$14:undefined};
      if ($Is(control$11,TLayoutImpl)) {
         Copy$TLayoutRect($As(control$11,TLayoutImpl).FClientArea,Result);
      } else if ($Is(control$11,TLayoutArea)) {
         TLayoutRect$SetFromRect(Result,Clone$TRect($As(control$11,TLayoutArea).FRect));
      } else {
         TLayoutRect$SetFromControl(Result,$As(control$11,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetHeight(control: TObject) : Variant
   ///  [line: 388, column: 27, file: SmartCL.Layout]
   ,GetHeight$8:function(Self, control$12) {
      var Result = undefined;
      if ($Is(control$12,TLayoutImpl)) {
         Result = $As(control$12,TLayoutImpl).FBounds.Height$12;
         if (Result==null) {
            Result = $As(control$12,TLayoutImpl).FConfig.FHeight$2;
         }
         if (Result!=null) {
            Result = Result+$As(control$12,TLayoutImpl).FConfig.FMargins.Top$3+$As(control$12,TLayoutImpl).FConfig.FMargins.Bottom$1;
         }
      } else if (TW3MovableControl.GetVisible($As(control$12,TW3CustomControl))) {
         Result = TW3MovableControl.GetHeight$($As(control$12,TW3CustomControl));
      } else {
         Result = 0;
      }
      return Result
   }
   /// function Dimensions.GetLeft(control: TObject) : Variant
   ///  [line: 405, column: 27, file: SmartCL.Layout]
   ,GetLeft$4:function(Self, control$13) {
      var Result = undefined;
      if ($Is(control$13,TLayoutImpl)) {
         Result = $As(control$13,TLayoutImpl).FBounds.Left$11-$As(control$13,TLayoutImpl).FConfig.FMargins.Left$3;
      } else {
         Result = TW3MovableControl.GetLeft($As(control$13,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetOwnerLeft(control: TObject) : Variant
   ///  [line: 414, column: 27, file: SmartCL.Layout]
   ,GetOwnerLeft:function(Self, control$14) {
      var Result = undefined;
      Result = 0;
      if ($Is(control$14,TW3MovableControl)) {
         control$14 = TW3TagContainer.a$53($As(control$14,TW3MovableControl));
         if ((control$14!==null)&&$Is(control$14,TW3MovableControl)) {
            Result = TW3MovableControl.GetLeft($As(control$14,TW3MovableControl));
         }
      }
      return Result
   }
   /// function Dimensions.GetOwnerTop(control: TObject) : Variant
   ///  [line: 424, column: 27, file: SmartCL.Layout]
   ,GetOwnerTop:function(Self, control$15) {
      var Result = undefined;
      Result = 0;
      if ($Is(control$15,TW3MovableControl)) {
         control$15 = TW3TagContainer.a$53($As(control$15,TW3MovableControl));
         if ((control$15!==null)&&$Is(control$15,TW3MovableControl)) {
            Result = TW3MovableControl.GetTop($As(control$15,TW3MovableControl));
         }
      }
      return Result
   }
   /// function Dimensions.GetTop(control: TObject) : Variant
   ///  [line: 439, column: 27, file: SmartCL.Layout]
   ,GetTop$1:function(Self, control$16) {
      var Result = undefined;
      if ($Is(control$16,TLayoutImpl)) {
         Result = $As(control$16,TLayoutImpl).FBounds.Top$11-$As(control$16,TLayoutImpl).FConfig.FMargins.Top$3;
      } else {
         Result = TW3MovableControl.GetTop($As(control$16,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetWidth(control: TObject) : Variant
   ///  [line: 453, column: 27, file: SmartCL.Layout]
   ,GetWidth$9:function(Self, control$17) {
      var Result = undefined;
      if ($Is(control$17,TLayoutImpl)) {
         Result = $As(control$17,TLayoutImpl).FBounds.Width$14;
         if (Result==null) {
            Result = $As(control$17,TLayoutImpl).FConfig.FWidth$2;
         }
         if (Result!=null) {
            Result = Result+$As(control$17,TLayoutImpl).FConfig.FMargins.Left$3+$As(control$17,TLayoutImpl).FConfig.FMargins.Right$1;
         }
      } else if (TW3MovableControl.GetVisible($As(control$17,TW3CustomControl))) {
         Result = TW3MovableControl.GetWidth$($As(control$17,TW3CustomControl));
      } else {
         Result = 0;
      }
      return Result
   }
   /// function Dimensions.HasHeight(control: TObject) : Boolean
   ///  [line: 470, column: 27, file: SmartCL.Layout]
   ,HasHeight:function(Self, control$18) {
      var Result = false;
      Result = true;
      if ($Is(control$18,TLayoutImpl)) {
         Result = $As(control$18,TLayoutImpl).FBounds.Height$12!=null;
      }
      return Result
   }
   /// function Dimensions.HasWidth(control: TObject) : Boolean
   ///  [line: 477, column: 27, file: SmartCL.Layout]
   ,HasWidth:function(Self, control$19) {
      var Result = false;
      Result = true;
      if ($Is(control$19,TLayoutImpl)) {
         Result = $As(control$19,TLayoutImpl).FBounds.Width$14!=null;
      }
      return Result
   }
   /// procedure Dimensions.SetBottom(control: TObject; value: Integer)
   ///  [line: 522, column: 28, file: SmartCL.Layout]
   ,SetBottom$1:function(Self, control$20, value$32) {
      if ($Is(control$20,TLayoutImpl)) {
         TLayoutRect$SetTop$2($As(control$20,TLayoutImpl).FBounds,parseInt((value$32-$As(control$20,TLayoutImpl).FConfig.FMargins.Bottom$1-$As(control$20,TLayoutImpl).FBounds.Height$12),10));
      } else {
         TW3MovableControl.SetTop$($As(control$20,TW3CustomControl),(value$32-TW3MovableControl.GetHeight$($As(control$20,TW3CustomControl))));
      }
   }
   /// procedure Dimensions.SetHeight(control: TObject; value: Integer)
   ///  [line: 484, column: 28, file: SmartCL.Layout]
   ,SetHeight$5:function(Self, control$21, value$33) {
      if ($Is(control$21,TLayoutImpl)) {
         TLayoutRect$SetHeight$4($As(control$21,TLayoutImpl).FBounds,value$33-$As(control$21,TLayoutImpl).FConfig.FMargins.Top$3-$As(control$21,TLayoutImpl).FConfig.FMargins.Bottom$1);
      } else {
         TW3MovableControl.SetHeight$($As(control$21,TW3CustomControl),value$33);
      }
   }
   /// procedure Dimensions.SetLeft(control: TObject; value: Integer)
   ///  [line: 494, column: 28, file: SmartCL.Layout]
   ,SetLeft$6:function(Self, control$22, value$34) {
      if ($Is(control$22,TLayoutImpl)) {
         TLayoutRect$SetLeft$5($As(control$22,TLayoutImpl).FBounds,value$34+$As(control$22,TLayoutImpl).FConfig.FMargins.Left$3);
      } else {
         TW3MovableControl.SetLeft$($As(control$22,TW3CustomControl),value$34);
      }
   }
   /// procedure Dimensions.SetRight(control: TObject; value: Integer)
   ///  [line: 503, column: 28, file: SmartCL.Layout]
   ,SetRight$4:function(Self, control$23, value$35) {
      if ($Is(control$23,TLayoutImpl)) {
         TLayoutRect$SetLeft$5($As(control$23,TLayoutImpl).FBounds,parseInt((value$35-$As(control$23,TLayoutImpl).FConfig.FMargins.Right$1-$As(control$23,TLayoutImpl).FBounds.Width$14),10));
      } else {
         TW3MovableControl.SetLeft$($As(control$23,TW3CustomControl),(value$35-TW3MovableControl.GetWidth$($As(control$23,TW3CustomControl))));
      }
   }
   /// procedure Dimensions.SetTop(control: TObject; value: Integer)
   ///  [line: 513, column: 28, file: SmartCL.Layout]
   ,SetTop$3:function(Self, control$24, value$36) {
      if ($Is(control$24,TLayoutImpl)) {
         TLayoutRect$SetTop$2($As(control$24,TLayoutImpl).FBounds,value$36+$As(control$24,TLayoutImpl).FConfig.FMargins.Top$3);
      } else {
         TW3MovableControl.SetTop$($As(control$24,TW3CustomControl),value$36);
      }
   }
   /// procedure Dimensions.SetWidth(control: TObject; value: Integer)
   ///  [line: 532, column: 28, file: SmartCL.Layout]
   ,SetWidth$8:function(Self, control$25, value$37) {
      if ($Is(control$25,TLayoutImpl)) {
         TLayoutRect$SetWidth$7($As(control$25,TLayoutImpl).FBounds,value$37-$As(control$25,TLayoutImpl).FConfig.FMargins.Left$3-$As(control$25,TLayoutImpl).FConfig.FMargins.Right$1);
      } else {
         TW3MovableControl.SetWidth$($As(control$25,TW3CustomControl),value$37);
      }
   }
   ,Destroy:TObject.Destroy
};
function AlignToString(align$21) {
   var Result = "";
   switch (align$21) {
      case 0 :
         Result = "left";
         break;
      case 1 :
         Result = "top";
         break;
      case 2 :
         Result = "right";
         break;
      case 3 :
         Result = "bottom";
         break;
      case 4 :
         Result = "client";
         break;
   }
   return Result
};
/// TW3CustomPanel = class (TW3CustomControl)
///  [line: 25, column: 3, file: SmartCL.Controls.Panel]
var TW3CustomPanel = {
   $ClassName:"TW3CustomPanel",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3CustomPanel.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Panel = class (TW3CustomPanel)
///  [line: 28, column: 3, file: SmartCL.Controls.Panel]
var TW3Panel = {
   $ClassName:"TW3Panel",$Parent:TW3CustomPanel
   ,$Init:function ($) {
      TW3CustomPanel.$Init($);
   }
   /// procedure TW3Panel.StyleTagObject()
   ///  [line: 42, column: 20, file: SmartCL.Controls.Panel]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      TW3CustomControl.SetBorderType(Self,3);
      TW3CustomControl.SetBackgroundType(Self,3);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,ChildAdded:TW3TagContainer.ChildAdded
   ,ChildRemoved:TW3TagContainer.ChildRemoved
   ,Create$86:TW3TagContainer.Create$86
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Invalidate:TW3MovableControl.Invalidate
   ,MoveTo:TW3MovableControl.MoveTo
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetBounds$1:TW3MovableControl.SetBounds$1
   ,SetBounds:TW3MovableControl.SetBounds
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetLeft:TW3MovableControl.SetLeft
   ,SetSize$2:TW3MovableControl.SetSize$2
   ,SetTop:TW3MovableControl.SetTop
   ,SetWidth:TW3MovableControl.SetWidth
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,Dispatch:TW3CustomControl.Dispatch
   ,GetEnabled$1:TW3CustomControl.GetEnabled$1
};
TW3Panel.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Storage = class (TObject)
///  [line: 39, column: 3, file: SmartCL.FileUtils]
var TW3Storage = {
   $ClassName:"TW3Storage",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3Storage.LoadImage(FromUrl: String; const OnComplete: TW3HandleObjectLoadEvent) : THandle
   ///  [line: 185, column: 27, file: SmartCL.FileUtils]
   ,LoadImage:function(Self, FromUrl$1, OnComplete) {
      var Result = {v:undefined};
      try {
         var LHandle$24 = undefined;
         try {
            LHandle$24 = new Image();
         } catch ($e) {
            var e$38 = $W($e);
            if (OnComplete) {
               OnComplete(FromUrl$1,null,false);
            }
            return Result.v;
         }
         if (LHandle$24) {
            if (OnComplete) {
               LHandle$24.onload = function () {
                  OnComplete(FromUrl$1,LHandle$24,true);
               };
               LHandle$24.onerror = function () {
                  OnComplete(FromUrl$1,LHandle$24,false);
               };
            }
            LHandle$24.src = FromUrl$1;
            Result.v = LHandle$24;
         } else if (OnComplete) {
            OnComplete(FromUrl$1,null,false);
         }
      } finally {return Result.v}
   }
   ,Destroy:TObject.Destroy
};
/// TW3PreLoadBatch = record
///  [line: 63, column: 1, file: SmartCL.FileUtils]
function Copy$TW3PreLoadBatch(s,d) {
   return d;
}
function Clone$TW3PreLoadBatch($) {
   return {

   }
}
/// TW3HttpRequest = class (TObject)
///  [line: 64, column: 3, file: SmartCL.net.http]
var TW3HttpRequest = {
   $ClassName:"TW3HttpRequest",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnTimeout = null;
      $.OnError = null;
      $.OnLoad = null;
      $.OnReadyStateChange = null;
      $.OnDataReady = null;
      $.FheaderCache = $.FReqObj = null;
      $.FMethod = $.FURL = "";
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 90, column: 39, file: SmartCL.net.http]
   ,a$291:function(Self) {
      return String(TW3HttpRequest.a$289(Self).responseXML);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 89, column: 40, file: SmartCL.net.http]
   ,a$290:function(Self) {
      return Self.FReqObj.responseText;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 86, column: 35, file: SmartCL.net.http]
   ,a$289:function(Self) {
      return Self.FReqObj;
   }
   /// constructor TW3HttpRequest.Create()
   ///  [line: 118, column: 28, file: SmartCL.net.http]
   ,Create$153:function(Self) {
      TObject.Create(Self);
      Self.FReqObj = new XMLHttpRequest();
      Self.FReqObj.onreadystatechange = $Event0(Self,TW3HttpRequest.HandleReadyStateChange);
      Self.FReqObj.onerror = $Event0(Self,TW3HttpRequest.HandleOnError);
      Self.FReqObj.onload = $Event0(Self,TW3HttpRequest.HandleOnLoad);
      Self.FReqObj.ontimeout = $Event0(Self,TW3HttpRequest.HandleOnTimeout);
      Self.FheaderCache = THttpHeaders.Create$155($New(THttpHeaders));
      return Self
   }
   /// destructor TW3HttpRequest.Destroy()
   ///  [line: 130, column: 27, file: SmartCL.net.http]
   ,Destroy:function(Self) {
      if (Self.FReqObj) {
         Self.FReqObj.onreadystatechange = null;
         Self.FReqObj = null;
      }
      TObject.Free(Self.FheaderCache);
      TObject.Destroy(Self);
   }
   /// procedure TW3HttpRequest.Get(aURL: String)
   ///  [line: 191, column: 26, file: SmartCL.net.http]
   ,Get$1:function(Self, aURL) {
      TW3HttpRequest.Open(Self,"GET",aURL);
      TW3HttpRequest.WriteHeaderCache(Self);
      TW3HttpRequest.Send(Self);
   }
   /// procedure TW3HttpRequest.HandleOnError()
   ///  [line: 154, column: 26, file: SmartCL.net.http]
   ,HandleOnError:function(Self) {
      if (Self.OnError) {
         Self.OnError(Self);
      }
   }
   /// procedure TW3HttpRequest.HandleOnLoad()
   ///  [line: 160, column: 26, file: SmartCL.net.http]
   ,HandleOnLoad:function(Self) {
      if (Self.OnLoad) {
         Self.OnLoad(Self);
      }
   }
   /// procedure TW3HttpRequest.HandleOnTimeout()
   ///  [line: 166, column: 26, file: SmartCL.net.http]
   ,HandleOnTimeout:function(Self) {
      if (Self.OnTimeout) {
         Self.OnTimeout(Self);
      }
   }
   /// procedure TW3HttpRequest.HandleReadyStateChange()
   ///  [line: 144, column: 26, file: SmartCL.net.http]
   ,HandleReadyStateChange:function(Self) {
      if (Self.FReqObj.readyState==4&&(Self.OnDataReady!==null)) {
         Self.OnDataReady(Self);
      }
      if (Self.OnReadyStateChange) {
         Self.OnReadyStateChange(Self);
      }
   }
   /// procedure TW3HttpRequest.Open(aMeth: String; aURL: String)
   ///  [line: 198, column: 26, file: SmartCL.net.http]
   ,Open:function(Self, aMeth, aURL$1) {
      Self.FMethod = aMeth;
      Self.FURL = aURL$1;
      Self.FReqObj.open(aMeth,aURL$1);
   }
   /// function TW3HttpRequest.ResponseAsBinaryData() : TBinaryData
   ///  [line: 225, column: 25, file: SmartCL.net.http]
   ,ResponseAsBinaryData:function(Self) {
      var Result = null;
      var mView = null;
      var mRef$5 = undefined;
      Result = null;
      if (Self.FReqObj.readyState==4&&Self.FReqObj.response) {
         mRef$5 = Self.FReqObj.response;
         if (TVariant.IsString(mRef$5)) {
            Result = TBinaryData.Create$31($New(TBinaryData),null);
            TBinaryData.Write$5(Result,0,(String(mRef$5)));
         } else {
            mView = new Uint8Array(mRef$5);
            Result = TBinaryData.Create$31($New(TBinaryData),new Uint8Array(mView));
         }
      }
      return Result
   }
   /// function TW3HttpRequest.ResponseAsStream() : TStream
   ///  [line: 216, column: 25, file: SmartCL.net.http]
   ,ResponseAsStream:function(Self) {
      var Result = null;
      var mTemp$8 = null;
      mTemp$8 = TW3HttpRequest.ResponseAsBinaryData(Self);
      if (mTemp$8!==null) {
         Result = TBinaryData.ToStream(mTemp$8);
      }
      return Result
   }
   /// procedure TW3HttpRequest.Send()
   ///  [line: 205, column: 26, file: SmartCL.net.http]
   ,Send:function(Self) {
      Self.FReqObj.send();
   }
   /// procedure TW3HttpRequest.WriteHeaderCache()
   ///  [line: 172, column: 26, file: SmartCL.net.http]
   ,WriteHeaderCache:function(Self) {
      var x$87 = 0;
      var LName$5 = "",
         LData$7 = "";
      if (THttpHeaders.Count$11(Self.FheaderCache)>0) {
         try {
            var $temp68;
            for(x$87=0,$temp68=THttpHeaders.Count$11(Self.FheaderCache);x$87<$temp68;x$87++) {
               LName$5 = THttpHeaders.a$304(Self.FheaderCache,x$87);
               LData$7 = THttpHeaders.a$305(Self.FheaderCache,x$87);
               Self.FReqObj.setRequestHeader(LName$5,LData$7);
            }
         } finally {
            THttpHeaders.Clear$15(Self.FheaderCache);
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// THttpHeaders = class (TObject)
///  [line: 31, column: 3, file: SmartCL.net.http]
var THttpHeaders = {
   $ClassName:"THttpHeaders",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FNames = [];
      $.FValues = [];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 59, column: 74, file: SmartCL.net.http]
   ,a$306:function(Self, idx$3, Value$41) {
      Self.FValues[idx$3]=Value$41;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 59, column: 53, file: SmartCL.net.http]
   ,a$305:function(Self, idx$4) {
      return Self.FValues[idx$4];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 57, column: 47, file: SmartCL.net.http]
   ,a$304:function(Self, idx$5) {
      return Self.FNames[idx$5];
   }
   /// procedure THttpHeaders.Add(Header: String)
   ///  [line: 287, column: 24, file: SmartCL.net.http]
   ,Add$8:function(Self, Header$1) {
      var kv = [];
      kv = (Header$1).split(":");
      if (kv.length>0) {
         THttpHeaders.SetValue(Self,kv[0],(kv.length>1)?kv[1]:"");
      }
   }
   /// procedure THttpHeaders.Assign(Headers: THttpHeaders)
   ///  [line: 300, column: 24, file: SmartCL.net.http]
   ,Assign$5:function(Self, Headers$1) {
      var i$3 = 0;
      var name$29 = "";
      var $temp69;
      for(i$3=0,$temp69=THttpHeaders.Count$11(Headers$1);i$3<$temp69;i$3++) {
         name$29 = THttpHeaders.a$304(Headers$1,i$3);
         THttpHeaders.SetValue(Self,name$29,THttpHeaders.GetValue(Headers$1,name$29));
      }
   }
   /// procedure THttpHeaders.Assign(Headers: array of String)
   ///  [line: 294, column: 24, file: SmartCL.net.http]
   ,Assign$4:function(Self, Headers$2) {
      var a$345 = 0;
      var header = "";
      var $temp70;
      for(a$345=0,$temp70=Headers$2.length;a$345<$temp70;a$345++) {
         header = Headers$2[a$345];
         THttpHeaders.Add$8(Self,header);
      }
   }
   /// procedure THttpHeaders.Clear()
   ///  [line: 276, column: 24, file: SmartCL.net.http]
   ,Clear$15:function(Self) {
      Self.FNames.length=0;
      Self.FValues.length=0;
   }
   /// function THttpHeaders.Count() : Integer
   ///  [line: 308, column: 23, file: SmartCL.net.http]
   ,Count$11:function(Self) {
      return Self.FNames.length;
   }
   /// constructor THttpHeaders.Create(headers: THttpHeaders)
   ///  [line: 270, column: 26, file: SmartCL.net.http]
   ,Create$156:function(Self, headers$1) {
      THttpHeaders.Create$155(Self);
      THttpHeaders.Assign$5(Self,headers$1);
      return Self
   }
   /// constructor THttpHeaders.Create()
   ///  [line: 259, column: 26, file: SmartCL.net.http]
   ,Create$155:function(Self) {
      TObject.Create(Self);
      return Self
   }
   /// constructor THttpHeaders.Create(headers: array of String)
   ///  [line: 264, column: 26, file: SmartCL.net.http]
   ,Create$154:function(Self, headers$2) {
      THttpHeaders.Create$155(Self);
      THttpHeaders.Assign$4(Self,headers$2);
      return Self
   }
   /// function THttpHeaders.GetValue(name: String) : String
   ///  [line: 326, column: 23, file: SmartCL.net.http]
   ,GetValue:function(Self, name$30) {
      var Result = "";
      var idx$6 = 0;
      idx$6 = THttpHeaders.IndexOf$4(Self,name$30);
      Result = (idx$6>=0)?THttpHeaders.a$305(Self,idx$6):"";
      return Result
   }
   /// function THttpHeaders.IndexOf(Name: String) : Integer
   ///  [line: 332, column: 23, file: SmartCL.net.http]
   ,IndexOf$4:function(Self, Name$12) {
      var Result = 0;
      var ucName = "";
      ucName = (Name$12).toLocaleUpperCase();
      var $temp71;
      for(Result=0,$temp71=THttpHeaders.Count$11(Self);Result<$temp71;Result++) {
         if ((THttpHeaders.a$304(Self,Result)).toLocaleUpperCase()==ucName) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// procedure THttpHeaders.SetValue(name: String; value: String)
   ///  [line: 341, column: 24, file: SmartCL.net.http]
   ,SetValue:function(Self, name$31, value$38) {
      var idx$7 = 0;
      idx$7 = THttpHeaders.IndexOf$4(Self,name$31);
      if (idx$7>=0) {
         THttpHeaders.a$306(Self,idx$7,value$38);
      } else {
         Self.FNames.push(name$31);
         Self.FValues.push(value$38);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TCustomCodec = class (TObject)
///  [line: 129, column: 3, file: system.codec]
var TCustomCodec = {
   $ClassName:"TCustomCodec",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBindings = [];
      $.FCodecInfo = null;
   }
   /// constructor TCustomCodec.Create()
   ///  [line: 300, column: 26, file: system.codec]
   ,Create$21:function(Self) {
      TObject.Create(Self);
      Self.FCodecInfo = TCustomCodec.MakeCodecInfo$(Self);
      if (Self.FCodecInfo===null) {
         throw Exception.Create($New(Exception),"Internal codec error, failed to obtain registration info error");
      }
      return Self
   }
   /// destructor TCustomCodec.Destroy()
   ///  [line: 308, column: 25, file: system.codec]
   ,Destroy:function(Self) {
      TObject.Free(Self.FCodecInfo);
      TObject.Destroy(Self);
   }
   /// function TCustomCodec.MakeCodecInfo() : TCodecInfo
   ///  [line: 314, column: 23, file: system.codec]
   ,MakeCodecInfo:function(Self) {
      return null;
   }
   /// procedure TCustomCodec.RegisterBinding(const Binding: TCodecBinding)
   ///  [line: 319, column: 24, file: system.codec]
   ,RegisterBinding:function(Self, Binding) {
      if (Self.FBindings.indexOf(Binding)<0) {
         Self.FBindings.push(Binding);
      } else {
         throw Exception.Create($New(Exception),"Binding already bound to codec error");
      }
   }
   /// procedure TCustomCodec.UnRegisterBinding(const Binding: TCodecBinding)
   ///  [line: 327, column: 24, file: system.codec]
   ,UnRegisterBinding:function(Self, Binding$1) {
      var LIndex$3 = 0;
      LIndex$3 = Self.FBindings.indexOf(Binding$1);
      if (LIndex$3>=0) {
         Self.FBindings.splice(LIndex$3,1)
         ;
      } else {
         throw Exception.Create($New(Exception),"Binding not bound to this codec error");
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Decode$:function($){return $.ClassType.Decode.apply($.ClassType, arguments)}
   ,Encode$:function($){return $.ClassType.Encode.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TCustomCodec.$Intf={
   ICodecBinding:[TCustomCodec.RegisterBinding,TCustomCodec.UnRegisterBinding]
   ,ICodecProcess:[TCustomCodec.Encode,TCustomCodec.Decode]
}
/// TBase64Codec = class (TCustomCodec)
///  [line: 32, column: 3, file: System.Codec.Base64]
var TBase64Codec = {
   $ClassName:"TBase64Codec",$Parent:TCustomCodec
   ,$Init:function ($) {
      TCustomCodec.$Init($);
   }
   /// procedure TBase64Codec.Encode(const Source: IBinaryTransport; const Target: IBinaryTransport)
   ///  [line: 179, column: 24, file: System.Codec.Base64]
   ,Encode:function(Self, Source$4, Target$6) {
      var LReader = null;
      var LWriter = null;
      var LChar$4 = "";
      var LTemp$2 = "";
      var LEncoded = "";
      LReader = TW3CustomReader.Create$29($New(TStreamReader),Source$4);
      try {
         LWriter = TW3CustomWriter.Create$22($New(TStreamWriter),Target$6);
         try {
            do {
               LChar$4 = TW3CustomReader.ReadChar(LReader);
               LTemp$2 = TString.EncodeURI(TString,LChar$4);
               LEncoded+=LTemp$2;
            } while (!TW3CustomReader.a$25(LReader));
            TW3CustomWriter.Write(LWriter,TDatatype.StringToBytes(TDatatype,LEncoded));
         } finally {
            TObject.Free(LWriter);
         }
      } finally {
         TObject.Free(LReader);
      }
   }
   /// procedure TBase64Codec.Decode(const Source: IBinaryTransport; const Target: IBinaryTransport)
   ///  [line: 209, column: 24, file: System.Codec.Base64]
   ,Decode:function(Self, Source$5, Target$7) {
      var LReader$1 = null;
      var LWriter$1 = null;
      var LChar$5 = "";
      var LTemp$3 = "";
      var LDecoded = "";
      LReader$1 = TW3CustomReader.Create$29($New(TReader),Source$5);
      try {
         LWriter$1 = TW3CustomWriter.Create$22($New(TWriter),Target$7);
         try {
            while (!TW3CustomReader.a$25(LReader$1)) {
               LChar$5 = TW3CustomReader.ReadChar(LReader$1);
               LTemp$3 = TString.DecodeURI(TString,LChar$5);
               LDecoded+=LTemp$3;
            }
            TW3CustomWriter.Write(LWriter$1,TDatatype.StringToBytes(TDatatype,LDecoded));
         } finally {
            TObject.Free(LWriter$1);
         }
      } finally {
         TObject.Free(LReader$1);
      }
   }
   /// function TBase64Codec.MakeCodecInfo() : TCodecInfo
   ///  [line: 87, column: 23, file: System.Codec.Base64]
   ,MakeCodecInfo:function(Self) {
      var Result = null;
      var LAccess$3 = null;
      var LVersion = {viMajor:0,viMinor:0,viRevision:0};
      Result = TObject.Create($New(TCodecInfo));
      LVersion.viMajor = 0;
      LVersion.viMinor = 1;
      LVersion.viRevision = 0;
      LAccess$3 = $AsIntf(Result,"ICodecInfo");
      LAccess$3[0]("Base64Codec");
      LAccess$3[1]("text\/base64");
      LAccess$3[2](LVersion);
      LAccess$3[3]([6]);
      return Result
   }
   /// function TBase64Codec.Encode(TextToEncode: String) : String
   ///  [line: 105, column: 29, file: System.Codec.Base64]
   ,Encode$5:function(Self, TextToEncode$2) {
      var Result = "";
      var LBytes$1 = [],
         chr1 = 0;
      var chr2 = 0;
      var chr3 = 0;
      var enc1 = 0;
      var enc2 = 0;
      var enc3 = 0;
      var enc4 = 0;
      var i$4 = 0;
      LBytes$1 = TString.EncodeUTF8(TString,TextToEncode$2);
      if (LBytes$1.length>0) {
         i$4 = 0;
         while (i$4<LBytes$1.length) {
            chr1 = LBytes$1[i$4];
            ++i$4;
            chr2 = LBytes$1[i$4];
            ++i$4;
            chr3 = LBytes$1[i$4];
            ++i$4;
            enc1 = chr1>>>2;
            enc2 = ((chr1&3)<<4)|(chr2>>>4);
            enc3 = ((chr2&15)<<2)|(chr3>>>6);
            enc4 = chr3&63;
            if (TVariant.IsNAN(chr2)) {
               enc3 = 64;
               enc4 = 64;
            } else if (TVariant.IsNAN(chr3)) {
               enc4 = 64;
            }
            Result+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".charAt(enc1-1)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".charAt(enc2-1)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".charAt(enc3-1)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".charAt(enc4-1);
         }
      }
      return Result
   }
   /// function TBase64Codec.Decode(TextToDecode: String) : String
   ///  [line: 146, column: 29, file: System.Codec.Base64]
   ,Decode$5:function(Self, TextToDecode$1) {
      var Result = "";
      var chr1$1 = 0;
      var chr2$1 = 0;
      var chr3$1 = 0;
      var enc1$1 = 0;
      var enc2$1 = 0;
      var enc3$1 = 0;
      var enc4$1 = 0;
      var x$88 = 0;
      TextToDecode$1 = TString.ForEach(TString,TextToDecode$1,function (Sample) {
         return (((Sample>="A")&&(Sample<="Z"))||((Sample>="a")&&(Sample<="z"))||((Sample>="0")&&(Sample<="9"))||(Sample=="+")||(Sample=="\/")||(Sample=="="));
      });
      x$88 = 1;
      while (x$88<TextToDecode$1.length) {
         enc1$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$88-1))+1);
         ++x$88;
         enc2$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$88-1))+1);
         ++x$88;
         enc3$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$88-1))+1);
         ++x$88;
         enc4$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$88-1))+1);
         ++x$88;
         chr1$1 = (enc1$1<<2)|(enc2$1>>>4);
         chr2$1 = ((enc2$1&15)<<4)|(enc3$1>>>2);
         chr3$1 = ((enc3$1&3)<<6)|enc4$1;
         Result+=TString.FromCharCode(TString,chr1$1);
         if (enc3$1!=64) {
            Result+=TString.FromCharCode(TString,chr2$1);
         }
         if (enc4$1!=64) {
            Result+=TString.FromCharCode(TString,chr3$1);
         }
      }
      return Result
   }
   ,Destroy:TCustomCodec.Destroy
   ,Decode$:function($){return $.ClassType.Decode.apply($.ClassType, arguments)}
   ,Encode$:function($){return $.ClassType.Encode.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TBase64Codec.$Intf={
   ICodecProcess:[TBase64Codec.Encode,TBase64Codec.Decode]
   ,ICodecBinding:[TCustomCodec.RegisterBinding,TCustomCodec.UnRegisterBinding]
}
var DecTable = [85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,62,85,85,85,63,52,53,54,55,56,57,58,59,60,61,85,85,85,255,85,85,85,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,85,85,85,85,85,85,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85];
/// TCodecVersionInfo = record
///  [line: 33, column: 3, file: system.codec]
function Copy$TCodecVersionInfo(s,d) {
   d.viMajor=s.viMajor;
   d.viMinor=s.viMinor;
   d.viRevision=s.viRevision;
   return d;
}
function Clone$TCodecVersionInfo($) {
   return {
      viMajor:$.viMajor,
      viMinor:$.viMinor,
      viRevision:$.viRevision
   }
}
/// TCodecManager = class (TObject)
///  [line: 153, column: 3, file: system.codec]
var TCodecManager = {
   $ClassName:"TCodecManager",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCodecs = [];
   }
   /// function TCodecManager.CodecByClass(const ClsType: TCodecClass) : TCustomCodec
   ///  [line: 231, column: 24, file: system.codec]
   ,CodecByClass:function(Self, ClsType) {
      var Result = null;
      var a$346 = 0;
      var LItem$11 = null;
      var a$347 = [];
      Result = null;
      a$347 = Self.FCodecs;
      var $temp72;
      for(a$346=0,$temp72=a$347.length;a$346<$temp72;a$346++) {
         LItem$11 = a$347[a$346];
         if (TObject.ClassType(LItem$11.ClassType)==ClsType) {
            Result = LItem$11;
            break;
         }
      }
      return Result
   }
   /// destructor TCodecManager.Destroy()
   ///  [line: 186, column: 26, file: system.codec]
   ,Destroy:function(Self) {
      var a$348 = 0;
      var LItem$12 = null;
      try {
         var a$349 = [];
         a$349 = Self.FCodecs;
         var $temp73;
         for(a$348=0,$temp73=a$349.length;a$348<$temp73;a$348++) {
            LItem$12 = a$349[a$348];
            TObject.Free(LItem$12);
         }
      } finally {
         Self.FCodecs.length=0;
      }
      TObject.Destroy(Self);
   }
   /// procedure TCodecManager.RegisterCodec(const CodecClass: TCodecClass)
   ///  [line: 244, column: 25, file: system.codec]
   ,RegisterCodec:function(Self, CodecClass) {
      var LItem$13 = null;
      LItem$13 = TCodecManager.CodecByClass(Self,CodecClass);
      if (LItem$13===null) {
         LItem$13 = TCustomCodec.Create$21($NewDyn(CodecClass,""));
         Self.FCodecs.push(LItem$13);
      } else {
         throw Exception.Create($New(Exception),"Codec already registered error");
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TCodecInfo = class (TObject)
///  [line: 73, column: 3, file: system.codec]
var TCodecInfo = {
   $ClassName:"TCodecInfo",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.ciAbout = $.ciMime = $.ciName = "";
      $.ciDataFlow = [0];
      $.ciVersion = {viMajor:0,viMinor:0,viRevision:0};
   }
   /// procedure TCodecInfo.SetDataFlow(const coFlow: TCodecDataFlow)
   ///  [line: 512, column: 22, file: system.codec]
   ,SetDataFlow:function(Self, coFlow) {
      Self.ciDataFlow = coFlow.slice(0);
   }
   /// procedure TCodecInfo.SetDescription(const coInfo: String)
   ///  [line: 507, column: 22, file: system.codec]
   ,SetDescription:function(Self, coInfo) {
      Self.ciAbout = coInfo;
   }
   /// procedure TCodecInfo.SetMime(const coMime: String)
   ///  [line: 495, column: 22, file: system.codec]
   ,SetMime:function(Self, coMime) {
      Self.ciMime = coMime;
   }
   /// procedure TCodecInfo.SetName(const coName: String)
   ///  [line: 490, column: 22, file: system.codec]
   ,SetName:function(Self, coName) {
      Self.ciName = coName;
   }
   /// procedure TCodecInfo.SetVersion(const coVersion: TCodecVersionInfo)
   ///  [line: 500, column: 22, file: system.codec]
   ,SetVersion:function(Self, coVersion) {
      Self.ciVersion.viMajor = coVersion.viMajor;
      Self.ciVersion.viMinor = coVersion.viMinor;
      Self.ciVersion.viRevision = coVersion.viRevision;
   }
   ,Destroy:TObject.Destroy
};
TCodecInfo.$Intf={
   ICodecInfo:[TCodecInfo.SetName,TCodecInfo.SetMime,TCodecInfo.SetVersion,TCodecInfo.SetDataFlow,TCodecInfo.SetDescription]
}
/// TCodecDataType enumeration
///  [line: 45, column: 3, file: system.codec]
var TCodecDataType = { 10:"dtString", 11:"dtBuffer", 12:"dtStream" };
/// function TCodecDataFlowHelper.Ordinal(const Self: TCodecDataFlow) : Integer
///  [line: 450, column: 31, file: system.codec]
function TCodecDataFlowHelper$Ordinal(Self$39) {
   var Result = 0;
   Result = 0;
   if ($SetIn(Self$39,1,0,3)) {
      ++Result;
   }
   if ($SetIn(Self$39,2,0,3)) {
      (Result+= 2);
   }
   return Result
}
/// TCodecDataDirection enumeration
///  [line: 41, column: 3, file: system.codec]
var TCodecDataDirection = { 1:"cdRead", 2:"cdWrite" };
/// TCodecBinding = class (TObject)
///  [line: 97, column: 3, file: system.codec]
var TCodecBinding = {
   $ClassName:"TCodecBinding",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCodec = null;
   }
   /// constructor TCodecBinding.Create(EndPoint: TCustomCodec)
   ///  [line: 362, column: 27, file: system.codec]
   ,Create$32:function(Self, EndPoint) {
      var LAccess$4 = null;
      TObject.Create(Self);
      if (EndPoint) {
         Self.FCodec = EndPoint;
         LAccess$4 = $AsIntf(Self.FCodec,"ICodecBinding");
         LAccess$4[0](Self);
      } else {
         throw Exception.Create($New(Exception),"Binding failed, invalid endpoint error");
      }
      return Self
   }
   /// destructor TCodecBinding.Destroy()
   ///  [line: 376, column: 26, file: system.codec]
   ,Destroy:function(Self) {
      var LAccess$5 = null;
      LAccess$5 = $AsIntf(Self.FCodec,"ICodecBinding");
      LAccess$5[1](Self);
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
function CodecManager() {
   var Result = null;
   if (!__Manager) {
      __Manager = TObject.Create($New(TCodecManager));
   }
   Result = __Manager;
   return Result
};
/// TURLCodec = class (TCustomCodec)
///  [line: 32, column: 3, file: System.Codec.Url]
var TURLCodec = {
   $ClassName:"TURLCodec",$Parent:TCustomCodec
   ,$Init:function ($) {
      TCustomCodec.$Init($);
   }
   /// procedure TURLCodec.Encode(const Source: IBinaryTransport; const Target: IBinaryTransport)
   ///  [line: 85, column: 21, file: System.Codec.Url]
   ,Encode:function(Self, Source$6, Target$8) {
      var LReader$2 = null;
      var LWriter$2 = null;
      var LChar$6 = "";
      var LTemp$4 = "";
      var LEncoded$1 = "";
      LReader$2 = TW3CustomReader.Create$29($New(TStreamReader),Source$6);
      try {
         LWriter$2 = TW3CustomWriter.Create$22($New(TStreamWriter),Target$8);
         try {
            do {
               LChar$6 = TW3CustomReader.ReadChar(LReader$2);
               LTemp$4 = TURLCodec.Encode$1(TURLCodec,LChar$6);
               LEncoded$1+=LTemp$4;
            } while (!TW3CustomReader.a$25(LReader$2));
            TW3CustomWriter.Write(LWriter$2,TDatatype.StringToBytes(TDatatype,LEncoded$1));
         } finally {
            TObject.Free(LWriter$2);
         }
      } finally {
         TObject.Free(LReader$2);
      }
   }
   /// procedure TURLCodec.Decode(const Source: IBinaryTransport; const Target: IBinaryTransport)
   ///  [line: 114, column: 21, file: System.Codec.Url]
   ,Decode:function(Self, Source$7, Target$9) {
      var LReader$3 = null;
      var LWriter$3 = null;
      var LChar$7 = "";
      var LTemp$5 = "";
      var LDecoded$1 = "";
      LReader$3 = TW3CustomReader.Create$29($New(TReader),Source$7);
      try {
         LWriter$3 = TW3CustomWriter.Create$22($New(TWriter),Target$9);
         try {
            while (!TW3CustomReader.a$25(LReader$3)) {
               LChar$7 = TW3CustomReader.ReadChar(LReader$3);
               LTemp$5 = TURLCodec.Decode$1(TURLCodec,LChar$7);
               LDecoded$1+=LTemp$5;
            }
            TW3CustomWriter.Write(LWriter$3,TDatatype.StringToBytes(TDatatype,LDecoded$1));
         } finally {
            TObject.Free(LWriter$3);
         }
      } finally {
         TObject.Free(LReader$3);
      }
   }
   /// function TURLCodec.MakeCodecInfo() : TCodecInfo
   ///  [line: 53, column: 20, file: System.Codec.Url]
   ,MakeCodecInfo:function(Self) {
      var Result = null;
      var LAccess$6 = null;
      var LVersion$1 = {viMajor:0,viMinor:0,viRevision:0};
      Result = TObject.Create($New(TCodecInfo));
      LVersion$1.viMajor = 0;
      LVersion$1.viMinor = 1;
      LVersion$1.viRevision = 0;
      LAccess$6 = $AsIntf(Result,"ICodecInfo");
      LAccess$6[0]("URLCodec");
      LAccess$6[1]("text\/url-encoded");
      LAccess$6[2](LVersion$1);
      LAccess$6[3]([6]);
      return Result
   }
   /// function TURLCodec.Encode(TextToEncode: String) : String
   ///  [line: 71, column: 26, file: System.Codec.Url]
   ,Encode$1:function(Self, TextToEncode$3) {
      var Result = "";
      Result = encodeURI(TextToEncode$3);
      return Result
   }
   /// function TURLCodec.Decode(TextToDecode: String) : String
   ///  [line: 78, column: 26, file: System.Codec.Url]
   ,Decode$1:function(Self, TextToDecode$2) {
      var Result = "";
      Result = decodeURI(TextToDecode$2);
      return Result
   }
   ,Destroy:TCustomCodec.Destroy
   ,Decode$:function($){return $.ClassType.Decode.apply($.ClassType, arguments)}
   ,Encode$:function($){return $.ClassType.Encode.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TURLCodec.$Intf={
   ICodecProcess:[TURLCodec.Encode,TURLCodec.Decode]
   ,ICodecBinding:[TCustomCodec.RegisterBinding,TCustomCodec.UnRegisterBinding]
}
var __UNIQUE = 0;
var a$3 = 0;
var a$6 = 0;
var a$5 = 0;
var a$4 = 0;
var a$7 = 0;
var a$8 = 0;
var CRC_Table_Ready = false;
var CRC_Table = function () {
      for (var r=[],i=0; i<513; i++) r.push(0);
      return r
   }();
var a$15 = null;
var a$14 = false;
var __ByteToHexLUT = function () {
      for (var r=[],i=0; i<256; i++) r.push("");
      return r
   }(),
   __HexToByteLUT,
   __StrByteLUT;
var __ByteToHexLUT = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
var __HexToByteLUT = JSON.parse("{\"00\":0,\"01\":1,\"02\":2,\"03\":3,\"04\":4,\"05\":5,\"06\":6,\"07\":7,\"08\":8,\"09\":9,\r\n\"0a\":10,\"0b\":11,\"0c\":12,\"0d\":13,\"0e\":14,\"0f\":15,\"10\":16,\"11\":17,\"12\":18,\r\n\"13\":19,\"14\":20,\"15\":21,\"16\":22,\"17\":23,\"18\":24,\"19\":25,\"1a\":26,\"1b\":27,\r\n\"1c\":28,\"1d\":29,\"1e\":30,\"1f\":31,\"20\":32,\"21\":33,\"22\":34,\"23\":35,\"24\":36,\r\n\"25\":37,\"26\":38,\"27\":39,\"28\":40,\"29\":41,\"2a\":42,\"2b\":43,\"2c\":44,\"2d\":45,\r\n\"2e\":46,\"2f\":47,\"30\":48,\"31\":49,\"32\":50,\"33\":51,\"34\":52,\"35\":53,\"36\":54,\r\n\"37\":55,\"38\":56,\"39\":57,\"3a\":58,\"3b\":59,\"3c\":60,\"3d\":61,\"3e\":62,\"3f\":63,\r\n\"40\":64,\"41\":65,\"42\":66,\"43\":67,\"44\":68,\"45\":69,\"46\":70,\"47\":71,\"48\":72,\r\n\"49\":73,\"4a\":74,\"4b\":75,\"4c\":76,\"4d\":77,\"4e\":78,\"4f\":79,\"50\":80,\"51\":81,\r\n\"52\":82,\"53\":83,\"54\":84,\"55\":85,\"56\":86,\"57\":87,\"58\":88,\"59\":89,\"5a\":90,\r\n\"5b\":91,\"5c\":92,\"5d\":93,\"5e\":94,\"5f\":95,\"60\":96,\"61\":97,\"62\":98,\"63\":99,\r\n\"64\":100,\"65\":101,\"66\":102,\"67\":103,\"68\":104,\"69\":105,\"6a\":106,\"6b\":107,\r\n\"6c\":108,\"6d\":109,\"6e\":110,\"6f\":111,\"70\":112,\"71\":113,\"72\":114,\"73\":115,\r\n\"74\":116,\"75\":117,\"76\":118,\"77\":119,\"78\":120,\"79\":121,\"7a\":122,\"7b\":123,\r\n\"7c\":124,\"7d\":125,\"7e\":126,\"7f\":127,\"80\":128,\"81\":129,\"82\":130,\"83\":131,\r\n\"84\":132,\"85\":133,\"86\":134,\"87\":135,\"88\":136,\"89\":137,\"8a\":138,\"8b\":139,\r\n\"8c\":140,\"8d\":141,\"8e\":142,\"8f\":143,\"90\":144,\"91\":145,\"92\":146,\"93\":147,\r\n\"94\":148,\"95\":149,\"96\":150,\"97\":151,\"98\":152,\"99\":153,\"9a\":154,\"9b\":155,\r\n\"9c\":156,\"9d\":157,\"9e\":158,\"9f\":159,\"a0\":160,\"a1\":161,\"a2\":162,\"a3\":163,\r\n\"a4\":164,\"a5\":165,\"a6\":166,\"a7\":167,\"a8\":168,\"a9\":169,\"aa\":170,\"ab\":171,\r\n\"ac\":172,\"ad\":173,\"ae\":174,\"af\":175,\"b0\":176,\"b1\":177,\"b2\":178,\"b3\":179,\r\n\"b4\":180,\"b5\":181,\"b6\":182,\"b7\":183,\"b8\":184,\"b9\":185,\"ba\":186,\"bb\":187,\r\n\"bc\":188,\"bd\":189,\"be\":190,\"bf\":191,\"c0\":192,\"c1\":193,\"c2\":194,\"c3\":195,\r\n\"c4\":196,\"c5\":197,\"c6\":198,\"c7\":199,\"c8\":200,\"c9\":201,\"ca\":202,\"cb\":203,\r\n\"cc\":204,\"cd\":205,\"ce\":206,\"cf\":207,\"d0\":208,\"d1\":209,\"d2\":210,\"d3\":211,\r\n\"d4\":212,\"d5\":213,\"d6\":214,\"d7\":215,\"d8\":216,\"d9\":217,\"da\":218,\"db\":219,\r\n\"dc\":220,\"dd\":221,\"de\":222,\"df\":223,\"e0\":224,\"e1\":225,\"e2\":226,\"e3\":227,\r\n\"e4\":228,\"e5\":229,\"e6\":230,\"e7\":231,\"e8\":232,\"e9\":233,\"ea\":234,\"eb\":235,\r\n\"ec\":236,\"ed\":237,\"ee\":238,\"ef\":239,\"f0\":240,\"f1\":241,\"f2\":242,\"f3\":243,\r\n\"f4\":244,\"f5\":245,\"f6\":246,\"f7\":247,\"f8\":248,\"f9\":249,\"fa\":250,\"fb\":251,\r\n\"fc\":252,\"fd\":253,\"fe\":254,\"ff\":255}");
var __StrByteLUT = JSON.parse("{\"0\":0,\"1\":1,\"2\":2,\"3\":3,\"4\":4,\"5\":5,\"6\":6,\"7\":7,\"8\":8,\"9\":9,\"10\":10,\"11\":11,\r\n\"12\":12,\"13\":13,\"14\":14,\"15\":15,\"16\":16,\"17\":17,\"18\":18,\"19\":19,\"20\":20,\r\n\"21\":21,\"22\":22,\"23\":23,\"24\":24,\"25\":25,\"26\":26,\"27\":27,\"28\":28,\"29\":29,\r\n\"30\":30,\"31\":31,\"32\":32,\"33\":33,\"34\":34,\"35\":35,\"36\":36,\"37\":37,\"38\":38,\r\n\"39\":39,\"40\":40,\"41\":41,\"42\":42,\"43\":43,\"44\":44,\"45\":45,\"46\":46,\"47\":47,\r\n\"48\":48,\"49\":49,\"50\":50,\"51\":51,\"52\":52,\"53\":53,\"54\":54,\"55\":55,\"56\":56,\r\n\"57\":57,\"58\":58,\"59\":59,\"60\":60,\"61\":61,\"62\":62,\"63\":63,\"64\":64,\"65\":65,\r\n\"66\":66,\"67\":67,\"68\":68,\"69\":69,\"70\":70,\"71\":71,\"72\":72,\"73\":73,\"74\":74,\r\n\"75\":75,\"76\":76,\"77\":77,\"78\":78,\"79\":79,\"80\":80,\"81\":81,\"82\":82,\"83\":83,\r\n\"84\":84,\"85\":85,\"86\":86,\"87\":87,\"88\":88,\"89\":89,\"90\":90,\"91\":91,\"92\":92,\r\n\"93\":93,\"94\":94,\"95\":95,\"96\":96,\"97\":97,\"98\":98,\"99\":99,\"100\":100,\"101\":101,\r\n\"102\":102,\"103\":103,\"104\":104,\"105\":105,\"106\":106,\"107\":107,\"108\":108,\r\n\"109\":109,\"110\":110,\"111\":111,\"112\":112,\"113\":113,\"114\":114,\"115\":115,\r\n\"116\":116,\"117\":117,\"118\":118,\"119\":119,\"120\":120,\"121\":121,\"122\":122,\r\n\"123\":123,\"124\":124,\"125\":125,\"126\":126,\"127\":127,\"128\":128,\"129\":129,\r\n\"130\":130,\"131\":131,\"132\":132,\"133\":133,\"134\":134,\"135\":135,\"136\":136,\r\n\"137\":137,\"138\":138,\"139\":139,\"140\":140,\"141\":141,\"142\":142,\"143\":143,\r\n\"144\":144,\"145\":145,\"146\":146,\"147\":147,\"148\":148,\"149\":149,\"150\":150,\r\n\"151\":151,\"152\":152,\"153\":153,\"154\":154,\"155\":155,\"156\":156,\"157\":157,\r\n\"158\":158,\"159\":159,\"160\":160,\"161\":161,\"162\":162,\"163\":163,\"164\":164,\r\n\"165\":165,\"166\":166,\"167\":167,\"168\":168,\"169\":169,\"170\":170,\"171\":171,\r\n\"172\":172,\"173\":173,\"174\":174,\"175\":175,\"176\":176,\"177\":177,\"178\":178,\r\n\"179\":179,\"180\":180,\"181\":181,\"182\":182,\"183\":183,\"184\":184,\"185\":185,\r\n\"186\":186,\"187\":187,\"188\":188,\"189\":189,\"190\":190,\"191\":191,\"192\":192,\r\n\"193\":193,\"194\":194,\"195\":195,\"196\":196,\"197\":197,\"198\":198,\"199\":199,\r\n\"200\":200,\"201\":201,\"202\":202,\"203\":203,\"204\":204,\"205\":205,\"206\":206,\r\n\"207\":207,\"208\":208,\"209\":209,\"210\":210,\"211\":211,\"212\":212,\"213\":213,\r\n\"214\":214,\"215\":215,\"216\":216,\"217\":217,\"218\":218,\"219\":219,\"220\":220,\r\n\"221\":221,\"222\":222,\"223\":223,\"224\":224,\"225\":225,\"226\":226,\"227\":227,\r\n\"228\":228,\"229\":229,\"230\":230,\"231\":231,\"232\":232,\"233\":233,\"234\":234,\r\n\"235\":235,\"236\":236,\"237\":237,\"238\":238,\"239\":239,\"240\":240,\"241\":241,\r\n\"242\":242,\"243\":243,\"244\":244,\"245\":245,\"246\":246,\"247\":247,\"248\":248,\r\n\"249\":249,\"250\":250,\"251\":251,\"252\":252,\"253\":253,\"254\":254,\"255\":255}");
var FGlobalSheet = null;
var vCurrent = null;
var FFocused = null;
var FLUT = null;
var FOLUT = null;
var RegisterComponentsProc = null;
var DefaultDuration = 2;
var DefaultTiming = 6;
var EventManager = null;
var Instance = null;
var Application$2 = null,
   NullConfig = null,
   Logger = "";
var LayoutCount = 0;
var NullConfig = TObject.Create($New(TLayoutConfigImpl));
var GForms = null;
var __LabelStyles = null;
var FlexWrapLUT = ["",""],
   FlexDirectionLUT = ["",""],
   AlignItemsLUT = ["","","","","",""],
   AlignContentLUT = ["","","","","",""];
var FlexWrapLUT = ["nowrap", "wrap"];
var FlexDirectionLUT = ["row", "column"];
var AlignItemsLUT = ["initial", "stretch", "center", "flex-start", "flex-end", "baseline"];
var AlignContentLUT = ["initial", "flex-start", "center", "flex-end", "space-between", "space-around"];
var BackgroundNameLUT = null;
var BorderNameLUT = null;
var _BGTypeToName = ["","","","","","","","","","","","","","","",""],
   _BackgroundTypeName = ["","","","","","","","","","","","","","","",""],
   _BRTypeToName = ["","","","","","","","","","","","","",""],
   _BorderTypeName = ["","","","","","","","","","","","","",""];
var _BGTypeToName = ["", "TW3DisplayBackground", "TW3ControlBackground", "TW3ContainerBackground", "TW3ListBackground", "TW3ListItemBackground", "TW3ListItemSelectedBackground", "TW3EditBackground", "TW3ButtonBackground", "TW3DialogButtonBackground", "TW3DecorativeBackground", "TW3DecorativeBackgroundInvert", "TW3DecorativeDarkBackground", "TW3ToolContainerBackground", "TW3ToolButtonBackground", "TW3ToolControlBackground"];
var _BackgroundTypeName = ["bsNone", "bsDisplayBackground", "bsControlBackground", "bsContainerBackground", "bsListBackground", "bsListItemBackground", "bsListItemSelectedBackground", "bsEditBackground", "bsButtonBackground", "bsDialogButtonBackground", "bsDecorativeBackground", "bsDecorativeInvertBackground", "bsDecorativeDarkBackground", "bsToolContainerBackground", "bsToolButtonBackground", "bsToolControlBackground"];
var _BRTypeToName = ["", "TW3FlatBorder", "TW3ControlBorder", "TW3ContainerBorder", "TW3ButtonBorder", "TW3DialogButtonBorder", "TW3DecorativeBorder", "TW3EditBorder", "TW3ListBorder", "TW3ToolContainerBorder", "TW3ToolButtonBorder", "TW3ToolControlBorder", "TW3ToolControlFlatBorder", "TW3ListMenuBorder"];
var _BorderTypeName = ["btNone", "btFlatBorder", "btControlBorder", "btContainerBorder", "btButtonBorder", "btDialogButtonBorder", "btDecorativeBorder", "btEditBorder", "btListBorder", "btToolContainerBorder", "btToolButtonBorder", "btToolControlBorder", "btToolControlFlatBorder", "btListMenuBorder"];
var _BatchLoadImages = [],
   vRequestAnimFrame = null;
var vCancelAnimFrame = null;
var cYesNoLUT = ["",""],
   cW3AnimationTiming = ["","","","","","",""];
var cYesNoLUT = ["no", "yes"];
var cW3AnimationTiming = ["inherit", "initial", "ease", "ease-in", "ease-out", "ease-in-out", "linear"];
var _Selection_Mode_LUT,
   _Selection_Mode_Names = ["","","","",""];
var _Selection_Mode_Names = ["none", "auto", "text", "all", "element"];
var _EdgeNameLUT = ["","","",""],
   _StyleNameLUT = ["","","","","","",""];
var _EdgeNameLUT = ["left", "top", "right", "bottom"];
var _StyleNameLUT = ["none", "solid", "dotted", "double", "groove", "inset", "outset"];
var _FontDetect = null;
var __StyleEnterLUT = ["","","",""],
   __StyleExitLUT = ["","","",""];
var __StyleEnterLUT = ["<b>", "<i>", "<u>", "<strike>"];
var __StyleExitLUT = ["<\/b>", "<\/i>", "<\/u>", "<\/strike>"];
var __RESERVED = [];
var __RESERVED = ["$ClassName", "$Parent", "$Init", "toString", "toLocaleString", "valueOf", "indexOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor", "destructor"].slice();
var __CURSOR_NAME_LUT,
   __CURSOR_DATA_LUT,
   vVendor = 0;
var vDriver = null;
var __CURSOR_NAME_LUT = TVariant.CreateObject();
var __CURSOR_DATA_LUT = TVariant.CreateObject();
var __CONV_BUFFER = null;
var __CONV_VIEW = null;
var __CONV_ARRAY = null;
var __SIZES = [0,0,0,0,0,0,0,0,0,0,0],
   _NAMES = ["","","","","","","","","","",""];
var __SIZES = [0, 1, 1, 2, 2, 4, 2, 4, 4, 8, 8];
var _NAMES = ["Unknown", "Boolean", "Byte", "Char", "Word", "Longword", "Smallint", "Integer", "Single", "Double", "String"];
var __UniqueNumber = 0;
var __TYPE_MAP = {Boolean:undefined,Number$1:undefined,String$1:undefined,Object$2:undefined,Undefined:undefined,Function$1:undefined};
var pre_binary = [0,0],
   pre_OnOff = ["",""],
   pre_YesNo = ["",""],
   pre_StartStop = ["",""],
   pre_RunPause = ["",""];
var pre_binary = [0, 1];
var pre_OnOff = ["off", "on"];
var pre_YesNo = ["no", "yes"];
var pre_StartStop = ["stop", "start"];
var pre_RunPause = ["paused", "running"];
var __Manager = null;
SetupTypeLUT();
SetupConversionLUT();
TCodecManager.RegisterCodec(CodecManager(),TURLCodec);
var _Selection_Mode_LUT = TVariant.CreateObject();
_Selection_Mode_LUT["none"] = 0;
_Selection_Mode_LUT["auto"] = 1;
_Selection_Mode_LUT["text"] = 2;
_Selection_Mode_LUT["all"] = 3;
_Selection_Mode_LUT["element"] = 4;
TCodecManager.RegisterCodec(CodecManager(),TBase64Codec);
SetupMouseCursorTable();
SetupThemeLookupTables();
InitAnimationFrameShim();
SetupTextBehaviorStyles();
TApplicationFormsList.RegisterForm(Forms$2(),"Form1",TForm1);
TW3StyleSheet.Append$2(TW3StyleSheet.GlobalStyleSheet(TW3StyleSheet),"\r\n.TW3NoAnimation {\r\n  -webkit-animation: none !important;\r\n  -moz-animation: none !important;\r\n  -ms-animation: none !important;\r\n  -o-animation: none !important;\r\n}\r\n\r\n\/* =============================================\r\n * Page Animation: BACKSCROLL\r\n * ============================================= *\/\r\n\r\n@-webkit-keyframes BACKSCROLL {\r\n  0%   { -webkit-transform: translateZ(0);\r\n\t       background-position: 0% 0%;       }\r\n  100% { background-position: -557px 0%;\r\n         -webkit-transform: translateZ(0); }\r\n}\r\n\r\n@-moz-keyframes BACKSCROLL {\r\n  0%   { -webkit-transform: translateZ(0);\r\n\t       background-position: 0% 0%;       }\r\n  100% { background-position: -557px 0%;\r\n\t       -webkit-transform: translateZ(0); }\r\n}\r\n\r\n@-ms-keyframes BACKSCROLL {\r\n  0%   { -ms-transform: translateZ(0);\r\n\t       background-position: 0% 0%;       }\r\n  100% { background-position: -557px 0%;\r\n\t       -ms-transform: translateZ(0); }\r\n}\r\n\r\n@keyframes BACKSCROLL {\r\n  0%   { transform: translateZ(0);\r\n\t       background-position: 0% 0%;       }\r\n  100% { background-position: -557px 0%;\r\n\t       transform: translateZ(0); }\r\n}\r\n\r\n\/* =============================================\r\n * Page Animation: MOVE-LEFT\r\n * ============================================= *\/\r\n\r\n@-webkit-keyframes MOVE-LEFT {\r\n\t0%   { -webkit-transform: translateX(100%); }\r\n\t100% { -webkit-transform: translateX(0);    }\r\n}\r\n\r\n@-webkit-keyframes MOVE-OUT-LEFT {\r\n\t0%   { -webkit-transform: translateX(0%); }\r\n\t100% { -webkit-transform: translateX(-100%); }\r\n}\r\n\r\n@-moz-keyframes MOVE-LEFT {\r\n\t0%   { -moz-transform: translateX(100%); }\r\n\t100% { -moz-transform: translateX(0);    }\r\n}\r\n\r\n@-moz-keyframes MOVE-OUT-LEFT {\r\n\t0%   { -moz-transform: translateX(0%);    }\r\n\t100% { -moz-transform: translateX(-100%); }\r\n}\r\n\r\n@-ms-keyframes MOVE-LEFT {\r\n\t0%   { -ms-transform: translateX(100%); }\r\n\t100% { -ms-transform: translateX(0);    }\r\n}\r\n\r\n@-ms-keyframes MOVE-OUT-LEFT {\r\n\t0%   { -ms-transform: translateX(0%);    }\r\n\t100% { -ms-transform: translateX(-100%); }\r\n}\r\n\r\n@keyframes MOVE-LEFT {\r\n\t0%   { transform: translateX(100%); }\r\n\t100% { transform: translateX(0);    }\r\n}\r\n\r\n@keyframes MOVE-OUT-LEFT {\r\n\t0%   { transform: translateX(0%);    }\r\n\t100% { transform: translateX(-100%); }\r\n}\r\n\r\n\/* =============================================\r\n * Page Animation: MOVE-RIGHT\r\n * ============================================= *\/\r\n\r\n@-webkit-keyframes MOVE-RIGHT {\r\n\t0%   { -webkit-transform: translateX(-100%); }\r\n\t100% { -webkit-transform: translateX(0%);    }\r\n}\r\n\r\n@-webkit-keyframes MOVE-OUT-RIGHT {\r\n\t0%   { -webkit-transform: translateX(0%);    }\r\n\t100% { -webkit-transform: translateX(100%);  }\r\n}\r\n\r\n@-moz-keyframes MOVE-RIGHT {\r\n\t0%   { -moz-transform: translateX(-100%);  }\r\n\t100% { -moz-transform: translateX(0%);     }\r\n}\r\n\r\n@-moz-keyframes MOVE-OUT-RIGHT {\r\n\t0%   { -moz-transform: translateX(0%);     }\r\n\t100% { -moz-transform: translateX(100%);   }\r\n}\r\n\r\n@-ms-keyframes MOVE-RIGHT {\r\n\t0%   { -ms-transform: translateX(-100%);  }\r\n\t100% { -ms-transform: translateX(0%);     }\r\n}\r\n\r\n@-ms-keyframes MOVE-OUT-RIGHT {\r\n\t0%   { -ms-transform: translateX(0%);     }\r\n\t100% { -ms-transform: translateX(100%);   }\r\n}\r\n\r\n@keyframes MOVE-RIGHT {\r\n\t0%   { transform: translateX(-100%);  }\r\n\t100% { transform: translateX(0%);     }\r\n}\r\n\r\n@keyframes MOVE-OUT-RIGHT {\r\n\t0%   { transform: translateX(0%);     }\r\n\t100% { transform: translateX(100%);   }\r\n}\r\n\r\n\/* =============================================\r\n * Page Animation: ROTATE-FOREVER\r\n * ============================================= *\/\r\n\r\n@-webkit-keyframes ROTATE-FOREVER {\r\n  from { -webkit-transform: none; }\r\n  to   { -webkit-transform: rotate(360deg); }\r\n}\r\n\r\n@-moz-keyframes ROTATE-FOREVER {\r\n  from { -moz-transform: none; }\r\n  to   { -moz-transform: rotate(360deg); }\r\n}\r\n\r\n@-ms-keyframes ROTATE-FOREVER {\r\n  from { -ms-transform: none; }\r\n  to   { -ms-transform: rotate(360deg); }\r\n}\r\n\r\n@keyframes ROTATE-FOREVER {\r\n  from { transform: none; }\r\n  to   { transform: rotate(360deg); }\r\n}\r\n\r\n\/* =============================================\r\n * Control Animation: ROTATE-CLOCKWISE\r\n * ============================================= *\/\r\n\r\n@-webkit-keyframes ROTATE-CLOCKWISE {\r\n  from { -webkit-transform: none; }\r\n  to   { -webkit-transform: rotate(360deg); }\r\n}\r\n\r\n@-moz-keyframes ROTATE-CLOCKWISE {\r\n  from { -moz-transform: none; }\r\n  to   { -moz-transform: rotate(360deg); }\r\n}\r\n\r\n@-ms-keyframes ROTATE-CLOCKWISE {\r\n  from { -ms-transform: none; }\r\n  to   { -ms-transform: rotate(360deg); }\r\n}\r\n\r\n@keyframes ROTATE-CLOCKWISE {\r\n  from { transform: none; }\r\n  to   { transform: rotate(360deg); }\r\n}\r\n\r\n\/* =============================================\r\n * Control Animation: ROTATE-CLOCKWISE\r\n * ============================================= *\/\r\n\r\n@-webkit-keyframes ROTATE-ANTI-CLOCKWISE {\r\n  from { -webkit-transform: none; }\r\n  to   { -webkit-transform: rotate(-360deg); }\r\n}\r\n\r\n@-moz-keyframes ROTATE-ANTI-CLOCKWISE {\r\n  from { -moz-transform: none; }\r\n  to   { -moz-transform: rotate(-360deg); }\r\n}\r\n\r\n@-ms-keyframes ROTATE-ANTI-CLOCKWISE {\r\n  from { -ms-transform: none; }\r\n  to   { -ms-transform: rotate(-360deg); }\r\n}\r\n\r\n@keyframes ROTATE-ANTI-CLOCKWISE {\r\n  from { transform: none; }\r\n  to   { transform: rotate(-360deg); }\r\n}\r\n");
TApplicationFormsList.RegisterAutoCreate(Forms$2(),"Form1",true,true);
var $Application = function() {
   try {
      Application$2 = TW3CustomApplication.Create$3($New(TApplication));
      TW3CustomApplication.RunApp(Application$2);
   } catch ($e) {
      var e$39 = $W($e);
      alert(e$39.FMessage)   }
}
$Application();
var $Application = function() {
   if (_FontDetect) {
      TObject.Free(_FontDetect);
   }
}
$Application();

