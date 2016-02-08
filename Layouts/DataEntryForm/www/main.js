var $R = [
	"Method %s in class %s threw exception [%s]",
	"Procedure %s threw exception [%s]",
	"Internal tag-object is null error",
	"Failed to create internal tag-object",
	"Invalid tag handle error",
	"Invalid attribute-name error",
	"Invalid property-name error",
	"Invalid style-name error",
	"Failed to attach element to owner",
	"Owner tag-object is NIL error",
	"invalid owner handle error",
	"Invalid component registration",
	"Failed to create attribute storage object, invalid handle error",
	"Failed to read attribute field, browser threw exception: %s",
	"Failed to write attribute field, browser threw exception: %s",
	"invalid owner handle error",
	"Failed to initialize from graphics-context: "];
function Trim$_String_Integer_Integer_(s,a,b) { if (a<0) a=0; if (b<0) b=0; return s.substr(a,s.length-a-b) }
function Trim$_String_(s) { return s.replace(/^\s\s*/, "").replace(/\s\s*$/, "") }
var TObject={
	$ClassName: "TObject",
	$Parent: null,
	ClassName: function (s) { return s.$ClassName },
	ClassType: function (s) { return s },
	ClassParent: function (s) { return s.$Parent },
	$Init: function () {},
	Create: function (s) { return s },
	Destroy: function (s) { for (var prop in s) if (s.hasOwnProperty(prop)) delete s.prop },
	Destroy$: function(s) { return s.ClassType.Destroy(s) },
	Free: function (s) { if (s!==null) s.ClassType.Destroy(s) }
}
function StrReplace(s,o,n) { return o?s.replace(new RegExp(StrRegExp(o), "g"), n):s }
function StrRegExp(s) { return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") }
function SameText(a,b) { return a.toUpperCase()==b.toUpperCase() }
function IntToHex2(v) { var r=v.toString(16); return (r.length==1)?"0"+r:r }
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
	$Init: function () { FMessage="" },
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
function WriteLn(value$5) {
   if (window.console) {
      window.console.log(value$5);
   }
};
function w3_setStyle(tagRef, aStyleName, aStyleValue) {
   tagRef.style[aStyleName] = aStyleValue;
};
function w3_setProperty(tagRef$1, aPropName, aValue) {
   tagRef$1[aPropName] = aValue;
};
function w3_setElementParentByRef(aElement, aParent) {
   aParent.appendChild(aElement);
};
function w3_setAttrib(tagRef$2, aAttribName, aValue$1) {
   tagRef$2.setAttribute(aAttribName,aValue$1);
};
function w3_RequestAnimationFrame(aMethod) {
   var Result = undefined;
   if (!vRequestAnimFrame) {
      InitAnimationFrameShim();
   }
   Result = vRequestAnimFrame(aMethod);
   return Result
};
function w3_RemoveEvent(a_tagRef, a_eventName, a_callback, a_useCapture) {
   if (a_eventName=="mousewheel") {
      a_eventName = "DOMMouseScroll";
   }
   a_tagRef.removeEventListener(a_eventName,a_callback,a_useCapture);
};
function w3_RemoveElementByRef(aElement$1, aParent$1) {
   aParent$1.removeChild(aElement$1);
};
function w3_RemoveClass(tagRef$3, aClassName) {
   var reg;
   
    reg = new RegExp("(\\s|^)" + aClassName + "(\\s|$)");
    (tagRef$3).className=(tagRef$3).className.replace(reg," ").replace('  ',' ').trim();
  };
function w3_RegisterBrowserAPI(aDriver) {
   vDriver = aDriver;
};
function w3_NameToUrlStr(aUrl) {
   var Result = "";
   Result = "url("+aUrl+")";
   return Result
};
function w3_HasClass(tagRef$4, aClassName$1) {
   var Result = false;
   
    Result = ((tagRef$4).className.match(new RegExp("(\\s|^)"+aClassName$1+"(\\s|$)")))?true:false;
  return Result
};
function w3_GetUniqueObjId() {
   var Result = "";
   ++vUniqueNumber;
   Result = "OBJ"+vUniqueNumber.toString();
   return Result
};
function w3_GetUniqueNumber() {
   var Result = 0;
   ++vUniqueNumber;
   Result = vUniqueNumber;
   return Result
};
function w3_getStyleAsStr(tagRef$5, aStyleName$1) {
   var Result = "";
   var mObj = undefined;
   var mData;
   
    mObj   = document.defaultView.getComputedStyle(tagRef$5,null);

    if (mObj)
    mData = (mObj).getPropertyValue(aStyleName$1);

    if (mData)
    {
      if (typeof(mData) === "number") {
        Result = String(mData);
      } else {
        if (typeof(mData) === "string")
        Result = mData;
      }
    }
  return Result
};
function w3_getStyleAsInt(tagRef$6, aStyleName$2) {
   var Result = 0;
   var mObj$1 = undefined;
   var mData$1;
   
    mObj$1   = document.defaultView.getComputedStyle(tagRef$6,null);

    if (mObj$1)
      mData$1 = (mObj$1).getPropertyValue(aStyleName$2);

    if (mData$1)
    {
      if (typeof(mData$1) === "number")
      {
        Result = mData$1;
      } else {
        if (typeof(mData$1) === "string")
        {
          mData$1 = parseInt(mData$1);
          if (typeof(mData$1) === "number")
          Result = mData$1;
        }
      }
    }
  return Result
};
function w3_getStyleAsFloat(tagRef$7, aStyleName$3) {
   var Result = 0;
   var mObj$2 = undefined;
   var mData$2;
   
    mObj$2   = document.defaultView.getComputedStyle(tagRef$7,null);

    if (mObj$2)
    mData$2 = (mObj$2).getPropertyValue(aStyleName$3);

    if (mData$2)
    {
      if (typeof(mData$2) === "number") {
        Result = mData$2
      } else {
        if (typeof(mData$2) === "string")
        {
          mData$2 = parseFloat(mData$2);
          if (!isNaN(mData$2))
          Result = mData$2;
        }
      }
    }
  return Result
};
function w3_getStyle(tagRef$8, aStyleName$4) {
   var Result = undefined;
   var mObj$3 = undefined;
   
    mObj$3   = document.defaultView.getComputedStyle(tagRef$8,null);
    if (mObj$3)
    Result = (mObj$3).getPropertyValue(aStyleName$4);
  return Result
};
function w3_getPropertyAsStr(tagRef$9, aPropName$1) {
   var Result = "";
   Result = String(tagRef$9[aPropName$1]);
   return Result
};
function w3_getPropertyAsInt(tagRef$10, aPropName$2) {
   var Result = 0;
   Result = parseInt(tagRef$10[aPropName$2],10);
   return Result
};
function w3_getIsSafari() {
   var Result = false;
   
    if (navigator.userAgent.match(/Safari/i)) Result=true;
  return Result
};
function w3_getIsOpera() {
   var Result = false;
   
    if (navigator.userAgent.match(/Opera/i)) Result=true;
  return Result
};
function w3_getIsIPod() {
   var Result = false;
   
    if (navigator.userAgent.match(/iPod/i)) Result=true;
  return Result
};
function w3_getIsIPhone() {
   var Result = false;
   
    if (navigator.userAgent.match(/iPhone/i)) Result=true;
  return Result
};
function w3_getIsIPad() {
   var Result = false;
   
    if (navigator.userAgent.match(/iPad/i)) Result=true;
  return Result
};
function w3_getIsInternetExplorer() {
   var Result = false;
   
    if (navigator.userAgent.match(/MSIE/i)) Result=true;
  return Result
};
function w3_getIsFirefox() {
   var Result = false;
   
    if (navigator.userAgent.match(/Firefox/i)) Result=true;
  return Result
};
function w3_getIsChrome() {
   var Result = false;
   
    if (navigator.userAgent.match(/Chrome/i)) Result=true;
  return Result
};
function w3_getIsAndroid() {
   var Result = false;
   
    if (navigator.userAgent.match(/Android/i)) Result=true;
  return Result
};
function w3_getAttribAsStr(tagRef$11, aAttribName$1) {
   var Result = "";
   Result = String(tagRef$11.getAttribute(aAttribName$1,0));
   return Result
};
function w3_getAttrib(tagRef$12, aAttribName$2) {
   var Result = undefined;
   Result = tagRef$12.getAttribute(aAttribName$2);
   return Result
};
function w3_CSSPrefixDef(aCSS) {
   var Result = "";
   Result = "-"+BrowserAPI().FCSSToken+"-"+aCSS;
   return Result
};
function w3_CSSPrefix(aCSS$1) {
   var Result = "";
   Result = BrowserAPI().FCSSToken+aCSS$1;
   return Result
};
function w3_createHtmlElement(aTypeName) {
   var Result = undefined;
   Result = document.createElement(aTypeName);
   return Result
};
function w3_bind2(obj_ref, event_name, callback) {
   obj_ref[event_name] = callback;
};
function w3_AddEvent(a_tagRef$1, a_eventName$1, a_callback$1, a_useCapture$1) {
   if (a_eventName$1=="mousewheel") {
      a_eventName$1 = "DOMMouseScroll";
   }
   a_tagRef$1.addEventListener(a_eventName$1,a_callback$1,a_useCapture$1);
};
function w3_AddClass(tagRef$13, aClassName$2) {
   
    var _qr = ((tagRef$13).className.match(new RegExp("(\\s|^)"+aClassName$2+"(\\s|$)"))) ? true : false;
    if (_qr === false)
      (tagRef$13).className += (" " + aClassName$2);
  };
/// TW3CustomBrowserAPI = class (TObject)
///  [line: 29, column: 3, file: SmartCL.System]
var TW3CustomBrowserAPI = {
   $ClassName:"TW3CustomBrowserAPI",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCSSAnimation = $.FCSSBackgroundColor = $.FCSSBackgroundImage = $.FCSSBackgroundPos = $.FCSSBackgroundSize = $.FCSSToken = $.FCSSTransform = "";
   }
   /// function TW3CustomBrowserAPI.DevicePixelRatio() : Float
   ///  [line: 510, column: 36, file: SmartCL.System]
   ,DevicePixelRatio:function() {
      var Result = 0;
      
   Result = window.devicePixelRatio || 1;
   return Result
   }
   ,Destroy:TObject.Destroy
};
/// TW3WebkitBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 77, column: 3, file: SmartCL.System]
var TW3WebkitBrowserAPI = {
   $ClassName:"TW3WebkitBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3WebkitBrowserAPI.Create()
   ///  [line: 551, column: 33, file: SmartCL.System]
   ,Create$18:function(Self) {
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
/// TW3OperaBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 88, column: 3, file: SmartCL.System]
var TW3OperaBrowserAPI = {
   $ClassName:"TW3OperaBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3OperaBrowserAPI.Create()
   ///  [line: 536, column: 32, file: SmartCL.System]
   ,Create$19:function(Self) {
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
/// TW3IEBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 93, column: 3, file: SmartCL.System]
var TW3IEBrowserAPI = {
   $ClassName:"TW3IEBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3IEBrowserAPI.Create()
   ///  [line: 521, column: 29, file: SmartCL.System]
   ,Create$20:function(Self) {
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
/// TW3FirefoxBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 83, column: 3, file: SmartCL.System]
var TW3FirefoxBrowserAPI = {
   $ClassName:"TW3FirefoxBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3FirefoxBrowserAPI.Create()
   ///  [line: 566, column: 34, file: SmartCL.System]
   ,Create$21:function(Self) {
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
/// TW3BrowserVendor enumeration
///  [line: 230, column: 3, file: SmartCL.System]
var TW3BrowserVendor = [ "bvUnknown", "bviOS", "bvAndroid", "bvChrome", "bvSafari", "bvFirefox", "bvOpera", "bvIE" ];
/// function TControlHandleHelper.Ready(const Self: TControlHandle) : Boolean
///  [line: 412, column: 32, file: SmartCL.System]
function TControlHandleHelper$Ready$1(Self$2) {
   var Result = false;
   var mRef = undefined;
   if (TControlHandleHelper$Valid(Self$2)) {
      mRef = TControlHandleHelper$Root(Self$2);
      Result = TControlHandleHelper$Valid(mRef)&&mRef.body;
   }
   return Result
}
/// procedure TControlHandleHelper.ReadyExecute(const Self: TControlHandle; OnReady: TProcedureRef)
///  [line: 473, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecute(Self$3, OnReady) {
   function DelayedDispatch(EntryPoint, Delay) {
      
      setTimeout(EntryPoint,Delay);
       };
   if (TControlHandleHelper$Valid(Self$3)) {
      if (TControlHandleHelper$Ready$1(Self$3)) {
         OnReady();
      } else {
         DelayedDispatch(function () {
            TControlHandleHelper$ReadyExecute(Self$3,OnReady);
         },100);
      }
   }
}
/// function TControlHandleHelper.Root(const Self: TControlHandle) : TControlHandle
///  [line: 430, column: 32, file: SmartCL.System]
function TControlHandleHelper$Root(Self$4) {
   var Result = undefined;
   var mAncestor = undefined;
   if (TControlHandleHelper$Valid(Self$4)) {
      mAncestor = Self$4;
      while (mAncestor.parentNode) {
         mAncestor = mAncestor.parentNode;
      }
      Result = mAncestor;
   } else {
      Result = null;
   }
   return Result
}
/// function TControlHandleHelper.Valid(const Self: TControlHandle) : Boolean
///  [line: 405, column: 32, file: SmartCL.System]
function TControlHandleHelper$Valid(Self$5) {
   var Result = false;
   
    Result = !( (Self$5 == undefined) || (Self$5 == null) );
  return Result
}
function BrowserAPI() {
   var Result = null;
   if (vDriver===null) {
      InternalInitVendorInfo();
   }
   Result = vDriver;
   return Result
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
   if (vVendor==0) {
      if (w3_getIsIPhone()||w3_getIsIPad()||w3_getIsIPod()) {
         vVendor = 1;
      }
   }
   switch (vVendor) {
      case 1 :
      case 4 :
      case 3 :
      case 2 :
         w3_RegisterBrowserAPI(TW3WebkitBrowserAPI.Create$18($New(TW3WebkitBrowserAPI)));
         break;
      case 5 :
         w3_RegisterBrowserAPI(TW3FirefoxBrowserAPI.Create$21($New(TW3FirefoxBrowserAPI)));
         break;
      case 7 :
         w3_RegisterBrowserAPI(TW3IEBrowserAPI.Create$20($New(TW3IEBrowserAPI)));
         break;
      case 6 :
         w3_RegisterBrowserAPI(TW3OperaBrowserAPI.Create$19($New(TW3OperaBrowserAPI)));
         break;
      default :
         w3_RegisterBrowserAPI(TW3FirefoxBrowserAPI.Create$21($New(TW3FirefoxBrowserAPI)));
   }
};
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
function VarIsValidRef(aRef) {
   var Result = false;
   
    Result = !((aRef == null) || (aRef == undefined));
  return Result
};
/// function TW3VariantHelper.IsArray(const Self: Variant) : Boolean
///  [line: 545, column: 27, file: System.Types]
function TW3VariantHelper$IsArray(Self$6) {
   var Result = false;
   
    Result = ((Self$6) !== undefined)
      && (typeof Self$6 !== null)
      && (typeof Self$6 === "object")
      && ((Self$6).length !== undefined);
  return Result
}
/// function TW3VariantHelper.IsBoolean(const Self: Variant) : Boolean
///  [line: 507, column: 27, file: System.Types]
function TW3VariantHelper$IsBoolean(Self$7) {
   var Result = false;
   
    Result = ((Self$7) !== undefined)
      && (typeof Self$7 !== null)
      && (typeof Self$7  === "boolean");
  return Result
}
/// function TW3VariantHelper.IsFloat(const Self: Variant) : Boolean
///  [line: 525, column: 27, file: System.Types]
function TW3VariantHelper$IsFloat(Self$8) {
   var Result = false;
   
    Result = ((Self$8) !== undefined)
      && (typeof Self$8 !== null)
      && (typeof Self$8  === "number")
      && (Math.round(Self$8) != Self$8);
  return Result
}
/// function TW3VariantHelper.IsFunction(const Self: Variant) : Boolean
///  [line: 498, column: 27, file: System.Types]
function TW3VariantHelper$IsFunction(Self$9) {
   var Result = false;
   
    Result = ((Self$9) !== undefined)
      && (typeof Self$9 !== null)
      && (typeof Self$9  === "function");
  return Result
}
/// function TW3VariantHelper.IsInteger(const Self: Variant) : Boolean
///  [line: 535, column: 27, file: System.Types]
function TW3VariantHelper$IsInteger$1(Self$10) {
   var Result = false;
   
    Result = ((Self$10) !== undefined)
      && (typeof Self$10 !== null)
      && (typeof Self$10  === "number")
      && (Math.round(Self$10) === Self$10);
  return Result
}
/// function TW3VariantHelper.IsObject(const Self: Variant) : Boolean
///  [line: 479, column: 27, file: System.Types]
function TW3VariantHelper$IsObject(Self$11) {
   var Result = false;
   
    Result = ((Self$11) !== undefined)
      && (typeof Self$11 !== null)
      && (typeof Self$11  === "object")
      && ((Self$11).length === undefined);
  return Result
}
/// function TW3VariantHelper.IsString(const Self: Variant) : Boolean
///  [line: 516, column: 27, file: System.Types]
function TW3VariantHelper$IsString$1(Self$12) {
   var Result = false;
   
    Result = ((Self$12) !== undefined)
      && (typeof Self$12 !== null)
      && (typeof Self$12  === "string");
  return Result
}
/// function TW3VariantHelper.IsSymbol(const Self: Variant) : Boolean
///  [line: 489, column: 27, file: System.Types]
function TW3VariantHelper$IsSymbol(Self$13) {
   var Result = false;
   
    Result = ((Self$13) !== undefined)
      && (typeof Self$13 !== null)
      && (typeof Self$13  === "symbol");
  return Result
}
/// TW3VariantDataType enumeration
///  [line: 331, column: 3, file: System.Types]
var TW3VariantDataType = [ "vdUnknown", "vdBoolean", "vdInteger", "vdFloat", "vdString", "vdSymbol", "vdFunction", "vdObject", "vdArray" ];
/// TW3OwnedObject = class (TObject)
///  [line: 113, column: 3, file: System.Types]
var TW3OwnedObject = {
   $ClassName:"TW3OwnedObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOwner = null;
   }
   /// function TW3OwnedObject.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 398, column: 25, file: System.Types]
   ,AcceptParent:function(Self, aObject) {
      var Result = false;
      Result = true;
      return Result
   }
   /// constructor TW3OwnedObject.Create(AOwner: TObject)
   ///  [line: 388, column: 28, file: System.Types]
   ,Create$11:function(Self, AOwner) {
      TObject.Create(Self);
      if (TW3OwnedObject.AcceptParent$(Self,AOwner)) {
         Self.FOwner = AOwner;
      } else {
         throw EW3Exception.CreateFmt($New(EW3OwnedObject),$R[0],["constructor", TObject.ClassName(Self.ClassType), "Unsuitable owner object-type error"]);
      }
      return Self
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
/// TVariant = class (TObject)
///  [line: 305, column: 3, file: System.Types]
var TVariant = {
   $ClassName:"TVariant",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TVariant.AsInteger(const aValue: Variant) : Integer
   ///  [line: 1573, column: 25, file: System.Types]
   ,AsInteger:function(aValue$2) {
      var Result = 0;
      if (aValue$2!=undefined&&aValue$2!=null) {
         Result = parseInt(aValue$2,10);
      }
      return Result
   }
   /// function TVariant.AsObject(const aValue: Variant) : TObject
   ///  [line: 1594, column: 25, file: System.Types]
   ,AsObject:function(aValue$3) {
      var Result = null;
      if (aValue$3!=undefined&&aValue$3!=null) {
         
      Result = aValue$3;
          }
      return Result
   }
   /// function TVariant.AsString(const aValue: Variant) : String
   ///  [line: 1580, column: 25, file: System.Types]
   ,AsString:function(aValue$4) {
      var Result = "";
      if (aValue$4!=undefined&&aValue$4!=null) {
         Result = String(aValue$4);
      }
      return Result
   }
   /// function TVariant.CreateObject() : Variant
   ///  [line: 1613, column: 25, file: System.Types]
   ,CreateObject:function() {
      var Result = undefined;
      
    return {};
  return Result
   }
   /// function TVariant.IsNumber(const aValue: Variant) : Boolean
   ///  [line: 1641, column: 25, file: System.Types]
   ,IsNumber:function(aValue$5) {
      var Result = false;
      
    if (aValue$5 == null) return false;
    if (aValue$5 == undefined) return false;
    if (typeof(aValue$5) === "number") return true;
  return Result
   }
   /// function TVariant.IsString(const aValue: Variant) : Boolean
   ///  [line: 1632, column: 25, file: System.Types]
   ,IsString:function(aValue$6) {
      var Result = false;
      
    if (aValue$6 == null) return false;
    if (aValue$6 == undefined) return false;
    if (typeof(aValue$6) === "string") return true;
  return Result
   }
   /// function TVariant.ValidRef(const aValue: Variant) : Boolean
   ///  [line: 1566, column: 25, file: System.Types]
   ,ValidRef:function(aValue$7) {
      var Result = false;
      
  Result = !((aValue$7 == null) || (aValue$7 == undefined));
  return Result
   }
   ,Destroy:TObject.Destroy
};
/// TRectF = record
///  [line: 238, column: 3, file: System.Types]
function Copy$TRectF(s,d) {
   d.Bottom=s.Bottom;
   d.Left=s.Left;
   d.Right=s.Right;
   d.Top=s.Top;
   return d;
}
function Clone$TRectF($) {
   return {
      Bottom:$.Bottom,
      Left:$.Left,
      Right:$.Right,
      Top:$.Top
   }
}
/// function TRectF.CreateBounded(x1: Float; y1: Float; x2: Float; y2: Float) : TRectF
///  [line: 1054, column: 23, file: System.Types]
function CreateBounded(x1$6, y1$6, x2$6, y2$6) {
   var Result = {Bottom:0,Left:0,Right:0,Top:0};
   if (x1$6<x2$6) {
      Result.Left = x1$6;
      Result.Right = x2$6;
   } else {
      Result.Left = x2$6;
      Result.Right = x1$6;
   }
   if (y1$6<y2$6) {
      Result.Top = y1$6;
      Result.Bottom = y2$6;
   } else {
      Result.Top = y2$6;
      Result.Bottom = y1$6;
   }
   return Result
}
/// function TRectF.Height(var Self: TRectF) : Float
///  [line: 1178, column: 17, file: System.Types]
function TRectF$Height(Self$14) {
   var Result = 0;
   Result = Self$14.Bottom-Self$14.Top;
   return Result
}
/// function TRectF.Width(var Self: TRectF) : Float
///  [line: 1173, column: 17, file: System.Types]
function TRectF$Width(Self$15) {
   var Result = 0;
   Result = Self$15.Right-Self$15.Left;
   return Result
}
/// TRect = record
///  [line: 202, column: 3, file: System.Types]
function Copy$TRect(s,d) {
   d.Bottom$1=s.Bottom$1;
   d.Left$1=s.Left$1;
   d.Right$1=s.Right$1;
   d.Top$1=s.Top$1;
   return d;
}
function Clone$TRect($) {
   return {
      Bottom$1:$.Bottom$1,
      Left$1:$.Left$1,
      Right$1:$.Right$1,
      Top$1:$.Top$1
   }
}
/// function TRect.ContainsPos(var Self: TRect; const aLeft: Integer; const aTop: Integer) : Boolean
///  [line: 979, column: 16, file: System.Types]
function TRect$ContainsPos$1(Self$16, aLeft, aTop) {
   var Result = false;
   Result = aLeft>=Self$16.Left$1&&aLeft<=Self$16.Right$1&&aTop>=Self$16.Top$1&&aTop<=Self$16.Bottom$1;
   return Result
}
/// function TRect.Create(const aLeft: Integer; const aTop: Integer; const aRight: Integer; const aBottom: Integer) : TRect
///  [line: 778, column: 22, file: System.Types]
function Create$14(aLeft$1, aTop$1, aRight, aBottom) {
   var Result = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
   Result.Left$1 = aLeft$1;
   Result.Top$1 = aTop$1;
   Result.Right$1 = aRight;
   Result.Bottom$1 = aBottom;
   return Result
}
/// function TRect.Height(var Self: TRect) : Integer
///  [line: 833, column: 16, file: System.Types]
function TRect$Height$1(Self$17) {
   var Result = 0;
   Result = Self$17.Bottom$1-Self$17.Top$1;
   return Result
}
/// function TRect.Width(var Self: TRect) : Integer
///  [line: 828, column: 16, file: System.Types]
function TRect$Width$1(Self$18) {
   var Result = 0;
   Result = Self$18.Right$1-Self$18.Left$1;
   return Result
}
/// TPointF = record
///  [line: 161, column: 3, file: System.Types]
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
///  [line: 126, column: 3, file: System.Types]
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
///  [line: 564, column: 23, file: System.Types]
function Create$17(aCol, aRow) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = aCol;
   Result.Y$1 = aRow;
   return Result
}
/// TPairData = record
///  [line: 359, column: 3, file: System.Types]
function Copy$TPairData(s,d) {
   return d;
}
function Clone$TPairData($) {
   return {

   }
}
/// TInteger = class (TObject)
///  [line: 272, column: 3, file: System.Types]
var TInteger = {
   $ClassName:"TInteger",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TInteger.Diff(const Primary: Integer; const Secondary: Integer) : Integer
   ///  [line: 1441, column: 25, file: System.Types]
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
   ///  [line: 1395, column: 25, file: System.Types]
   ,EnsureRange:function(aValue$8, aMin, aMax) {
      var Result = 0;
      Result = ClampInt(aValue$8,aMin,aMax);
      return Result
   }
   /// function TInteger.ToPxStr(const aValue: Integer) : String
   ///  [line: 1373, column: 25, file: System.Types]
   ,ToPxStr:function(aValue$9) {
      var Result = "";
      Result = aValue$9.toString()+"px";
      return Result
   }
   /// function TInteger.WrapRange(const aValue: Integer; const aLowRange: Integer; const aHighRange: Integer) : Integer
   ///  [line: 1409, column: 25, file: System.Types]
   ,WrapRange:function(aValue$10, aLowRange, aHighRange) {
      var Result = 0;
      if (aValue$10>aHighRange) {
         Result = aLowRange+TInteger.Diff(aHighRange,(aValue$10-1));
         if (Result>aHighRange) {
            Result = TInteger.WrapRange(Result,aLowRange,aHighRange);
         }
      } else if (aValue$10<aLowRange) {
         Result = aHighRange-TInteger.Diff(aLowRange,(aValue$10+1));
         if (Result<aLowRange) {
            Result = TInteger.WrapRange(Result,aLowRange,aHighRange);
         }
      } else {
         Result = aValue$10;
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TExposure enumeration
///  [line: 199, column: 3, file: System.Types]
var TExposure = [ "esVisible", "esPartly", "esNone" ];
function OffsetPoint(a$36, b$2) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$36.X$1+b$2.X$1;
   Result.Y$1 = a$36.Y$1+b$2.Y$1;
   return Result
};
function OffsetPoint$1(a$37, b$3) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$37.X$1+b$3;
   Result.Y$1 = a$37.Y$1+b$3;
   return Result
};
function OffsetPoint$2(a$38, b$4) {
   var Result = {X:0,Y:0};
   Result.X = a$38.X+b$4.X;
   Result.Y = a$38.Y+b$4.Y;
   return Result
};
function OffsetPoint$3(a$39, b$5) {
   var Result = {X:0,Y:0};
   Result.X = a$39.X+b$5;
   Result.Y = a$39.Y+b$5;
   return Result
};
function OffsetPoint$4(a$40, b$6) {
   var Result = {X:0,Y:0};
   Result.X = a$40.X+b$6;
   Result.Y = a$40.Y+b$6;
   return Result
};
function MinusPoint(a$41, b$7) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$41.X$1-b$7.X$1;
   Result.Y$1 = a$41.Y$1-b$7.Y$1;
   return Result
};
function MinusPoint$1(a$42, b$8) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$42.X$1-b$8;
   Result.Y$1 = a$42.Y$1-b$8;
   return Result
};
function MinusPoint$2(a$43, b$9) {
   var Result = {X:0,Y:0};
   Result.X = a$43.X-b$9.X;
   Result.Y = a$43.Y-b$9.Y;
   return Result
};
function MinusPoint$3(a$44, b$10) {
   var Result = {X:0,Y:0};
   Result.X = a$44.X-b$10;
   Result.Y = a$44.Y-b$10;
   return Result
};
function MinusPoint$4(a$45, b$11) {
   var Result = {X:0,Y:0};
   Result.X = a$45.X-b$11;
   Result.Y = a$45.Y-b$11;
   return Result
};
function ExpandPoint(a$46, b$12) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$46.X$1*b$12.X$1);
   Result.Y$1 = Math.round(a$46.Y$1*b$12.Y$1);
   return Result
};
function ExpandPoint$1(a$47, b$13) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$47.X$1*b$13);
   Result.Y$1 = Math.round(a$47.Y$1*b$13);
   return Result
};
function ExpandPoint$2(a$48, b$14) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$48.X$1*b$14);
   Result.Y$1 = Math.round(a$48.Y$1*b$14);
   return Result
};
function ExpandPoint$3(a$49, b$15) {
   var Result = {X:0,Y:0};
   Result.X = a$49.X*b$15.X;
   Result.Y = a$49.Y*b$15.Y;
   return Result
};
function ExpandPoint$4(a$50, b$16) {
   var Result = {X:0,Y:0};
   Result.X = a$50.X*b$16;
   Result.Y = a$50.Y*b$16;
   return Result
};
function ExpandPoint$5(a$51, b$17) {
   var Result = {X:0,Y:0};
   Result.X = a$51.X*b$17;
   Result.Y = a$51.Y*b$17;
   return Result
};
/// EW3Exception = class (Exception)
///  [line: 105, column: 3, file: System.Types]
var EW3Exception = {
   $ClassName:"EW3Exception",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   /// constructor EW3Exception.CreateFmt(aText: String; const aValues: array of const)
   ///  [line: 457, column: 26, file: System.Types]
   ,CreateFmt:function(Self, aText, aValues) {
      Exception.Create(Self,Format(aText,aValues.slice(0)));
      return Self
   }
   ,Destroy:Exception.Destroy
};
/// EW3OwnedObject = class (EW3Exception)
///  [line: 111, column: 3, file: System.Types]
var EW3OwnedObject = {
   $ClassName:"EW3OwnedObject",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3CustomApplication = class (TObject)
///  [line: 253, column: 3, file: SmartCL.Application]
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
   ///  [line: 954, column: 32, file: SmartCL.Application]
   ,AdjustScreen:function(Self) {
      TW3ScrollInfo.ScrollTo(TW3CustomControl.GetScrollInfo(Self.FDisplay),0,0);
      TW3MovableControl.SetBounds$2(Self.FDisplay,0,0,TDocumentBody.GetWidth$5(Self.FBody),TDocumentBody.GetHeight$5(Self.FBody));
   }
   /// procedure TW3CustomApplication.ApplicationClosing()
   ///  [line: 989, column: 32, file: SmartCL.Application]
   ,ApplicationClosing:function(Self) {
   }
   /// procedure TW3CustomApplication.ApplicationStarted()
   ///  [line: 979, column: 32, file: SmartCL.Application]
   ,ApplicationStarted:function(Self) {
   }
   /// procedure TW3CustomApplication.ApplicationStarting()
   ///  [line: 984, column: 32, file: SmartCL.Application]
   ,ApplicationStarting:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnBeforeUnload()
   ///  [line: 906, column: 32, file: SmartCL.Application]
   ,CBOnBeforeUnload:function(Self) {
      if (Self.FOnBeforeUnload) {
         Self.FOnBeforeUnload(Self);
      }
   }
   /// procedure TW3CustomApplication.CBOnOrientationChange()
   ///  [line: 928, column: 32, file: SmartCL.Application]
   ,CBOnOrientationChange:function(Self) {
      var mOrientation = 0;
      var mTemp$1 = 0;
      var mEntry = null;
      mTemp$1 = parseInt(window.orientation,10);
      switch (mTemp$1) {
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
      try {
         if (Self.FDisplay) {
            mEntry = Self.FDisplay.FOnOrient;
            if (mEntry) {
               mEntry(Self.FDisplay,mOrientation,mTemp$1);
            }
         }
      } finally {
         TW3CustomApplication.AdjustScreen(Self);
      }
   }
   /// procedure TW3CustomApplication.CBOnReSize()
   ///  [line: 923, column: 32, file: SmartCL.Application]
   ,CBOnReSize:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnUnLoad()
   ///  [line: 912, column: 32, file: SmartCL.Application]
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
   ///  [line: 684, column: 34, file: SmartCL.Application]
   ,Create$3:function(Self) {
      TObject.Create(Self);
      Self.FBody = TW3Component.Create$28$($New(TDocumentBody),null);
      Self.FDisplay = TW3Component.Create$28$($New(TW3Display),Self.FBody);
      if (!Instance) {
         Instance = Self;
      }
      return Self
   }
   /// destructor TW3CustomApplication.Destroy()
   ///  [line: 695, column: 33, file: SmartCL.Application]
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
   ///  [line: 1155, column: 32, file: SmartCL.Application]
   ,GotoFormByRef:function(Self, aForm, Effect) {
      var mIndex = 0;
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
      if (Effect==0) {
         TW3CustomForm.FormDeactivated(Self.FCurrentForm);
         TW3MovableControl.SetVisible(Self.FCurrentForm,false);
         TW3MovableControl.SetVisible(aForm,true);
         TW3Display.PositionFormInView(Self.FDisplay,aForm);
         TW3CustomForm.FormActivated(aForm);
         Self.FCurrentForm = aForm;
         return;
      }
      Self.FFormChangeActive = true;
      Self.FEntryEffect = Effect;
      TW3CustomControl.BringToFront(aForm);
      TW3CustomForm.FormDeactivated(Self.FCurrentForm);
      Self.FTransSrc = Self.FCurrentForm;
      Self.FTransDst = aForm;
      TW3MovableControl.SetVisible(aForm,true);
      TW3Display.PositionFormInView(Self.FDisplay,aForm);
      if (Self.FEnterAnim===null||Self.FLeaveAnim===null) {
         Self.FEnterAnim = TW3CustomAnimation.Create$56$($New(TW3NamedAnimation));
         TW3CustomAnimation.SetDuration(Self.FEnterAnim,0.3);
         Self.FLeaveAnim = TW3CustomAnimation.Create$56$($New(TW3NamedAnimation));
         TW3CustomAnimation.SetDuration(Self.FLeaveAnim,0.3);
      }
      switch (Effect) {
         case 1 :
            Self.FEnterAnim.FName$2 = "MOVE-LEFT";
            Self.FLeaveAnim.FName$2 = "MOVE-OUT-LEFT";
            break;
         case 2 :
            Self.FEnterAnim.FName$2 = "MOVE-RIGHT";
            Self.FLeaveAnim.FName$2 = "MOVE-OUT-RIGHT";
            break;
      }
      TW3CustomAnimation.ExecuteEx(Self.FEnterAnim,aForm,null,$Event1(Self,TW3CustomApplication.HandleEnterAnimEnds));
      TW3CustomAnimation.ExecuteEx(Self.FLeaveAnim,Self.FCurrentForm,null,$Event1(Self,TW3CustomApplication.HandleLeaveAnimEnds));
   }
   /// procedure TW3CustomApplication.HandleEnterAnimEnds(Sender: TObject)
   ///  [line: 1116, column: 32, file: SmartCL.Application]
   ,HandleEnterAnimEnds:function(Self, Sender) {
      var mAnim = null;
      mAnim = $As(Sender,TW3NamedAnimation);
      switch (Self.FEntryEffect) {
         case 1 :
            TW3MovableControl.MoveTo(Self.FTransDst,0,0);
            Self.FCurrentForm = Self.FTransDst;
            TW3CustomForm.FormActivated(Self.FCurrentForm);
            Self.FFormChangeActive = false;
            break;
         case 2 :
            TW3MovableControl.MoveTo(Self.FTransDst,0,0);
            Self.FCurrentForm = Self.FTransDst;
            TW3CustomForm.FormActivated(Self.FCurrentForm);
            TW3MovableControl.SetVisible(Self.FTransSrc,false);
            TW3Display.PositionFormInView(Self.FDisplay,Self.FTransSrc);
            Self.FFormChangeActive = false;
            break;
      }
      TObject.Free(mAnim);
      mAnim = null;
   }
   /// procedure TW3CustomApplication.HandleLeaveAnimEnds(Sender: TObject)
   ///  [line: 1107, column: 32, file: SmartCL.Application]
   ,HandleLeaveAnimEnds:function(Self, Sender$1) {
      var mAnim$1 = null;
      mAnim$1 = $As(Sender$1,TW3NamedAnimation);
      TW3MovableControl.SetVisible(Self.FTransSrc,false);
      TObject.Free(mAnim$1);
   }
   /// procedure TW3CustomApplication.HookWindowEvents()
   ///  [line: 717, column: 32, file: SmartCL.Application]
   ,HookWindowEvents:function(Self) {
      w3_bind2(document.body,"onunload",$Event0(Self,TW3CustomApplication.CBOnUnLoad));
      w3_bind2(document.body,"onbeforeunload",$Event0(Self,TW3CustomApplication.CBOnBeforeUnload));
      w3_bind2(window,"onresize",$Event0(Self,TW3CustomApplication.CBOnReSize));
      w3_bind2(window,"onorientationchange",$Event0(Self,TW3CustomApplication.CBOnOrientationChange));
   }
   /// procedure TW3CustomApplication.RegisterFormInstance(aForm: TW3CustomForm; isMainForm: Boolean = False)
   ///  [line: 1026, column: 32, file: SmartCL.Application]
   ,RegisterFormInstance:function(Self, aForm$1, isMainForm) {
      if (Self.FTerminated) {
         return;
      }
      if (aForm$1) {
         if (Self.FForms.indexOf(aForm$1)<0) {
            try {
               Self.FForms.push(aForm$1);
            } catch ($e) {
               var e$1 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), e$1.FMessage]);
            }
            w3_RequestAnimationFrame($Event0(aForm$1,TW3MovableControl.AdjustToParentBox));
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
   ///  [line: 994, column: 32, file: SmartCL.Application]
   ,RunApp:function(Self) {
      var FTemp = null;
      TW3CustomApplication.HookWindowEvents(Self);
      TW3CustomApplication.ApplicationStarting(Self);
      TApplicationFormsList.AutoCreateForms(FormsFactory(),Self.FDisplay.FView);
      if (Self.FMainForm) {
         FTemp = Self.FMainForm;
         Self.FMainForm = null;
         TW3CustomApplication.GotoFormByRef(Self,FTemp,0);
      }
      TW3CustomApplication.ApplicationStarted(Self);
   }
   /// procedure TW3CustomApplication.Terminate()
   ///  [line: 960, column: 32, file: SmartCL.Application]
   ,Terminate:function(Self) {
      var x$33 = 0;
      if (Self.FTerminated) {
         return;
      }
      Self.FTerminated = true;
      TW3CustomApplication.ApplicationClosing(Self);
      try {
         var $temp1;
         for(x$33=0,$temp1=Self.FForms.length;x$33<$temp1;x$33++) {
            TObject.Free(Self.FForms[x$33]);
            Self.FForms[x$33]=null;
         }
         Self.FForms.length=0;
      } finally {
         TObject.Free(Self);
      }
   }
   /// procedure TW3CustomApplication.UnRegisterFormInstance(aForm: TW3CustomForm)
   ///  [line: 1064, column: 32, file: SmartCL.Application]
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
                     var e$2 = $W($e);
                     throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), e$2.FMessage]);
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
///  [line: 54, column: 3, file: SmartCL.Application]
var TW3DisplayViewArangeType = [ "dvaSizeToView", "dvaVStack", "dvaHStack" ];
/// TW3TagObj = class (TObject)
///  [line: 191, column: 3, file: SmartCL.Components]
var TW3TagObj = {
   $ClassName:"TW3TagObj",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAccess = null;
      $.FComponentState = [0];
      $.FHandle = undefined;
      $.FOwner$1 = undefined;
      $.FTagId = "";
      $.FUpdating = 0;
   }
   /// procedure TW3TagObj.AddToComponentState(const Flags: TComponentState)
   ///  [line: 1103, column: 21, file: SmartCL.Components]
   ,AddToComponentState:function(Self, Flags) {
      if ($SetIn(Flags,0,0,6)) {
         $SetInc(Self.FComponentState,0,0,6);
      }
      if ($SetIn(Flags,1,0,6)) {
         $SetInc(Self.FComponentState,1,0,6);
      }
      if ($SetIn(Flags,2,0,6)) {
         $SetInc(Self.FComponentState,2,0,6);
      }
      if ($SetIn(Flags,3,0,6)) {
         $SetInc(Self.FComponentState,3,0,6);
      }
      if ($SetIn(Flags,4,0,6)) {
         $SetInc(Self.FComponentState,4,0,6);
      }
      if ($SetIn(Flags,5,0,6)) {
         $SetInc(Self.FComponentState,5,0,6);
      }
   }
   /// procedure TW3TagObj.AfterUpdate()
   ///  [line: 1143, column: 21, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
   }
   /// procedure TW3TagObj.BeginUpdate()
   ///  [line: 1128, column: 21, file: SmartCL.Components]
   ,BeginUpdate:function(Self) {
      ++Self.FUpdating;
   }
   /// constructor TW3TagObj.Create()
   ///  [line: 1023, column: 23, file: SmartCL.Components]
   ,Create$27:function(Self) {
      TObject.Create(Self);
      $SetInc(Self.FComponentState,0,0,6);
      try {
         Self.FTagId = TW3TagObj.MakeElementTagId$(Self);
         Self.FHandle = TW3TagObj.MakeElementTagObj$(Self);
      } catch ($e) {
         var e$3 = $W($e);
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.Create",Self,e$3.FMessage)      }
      $SetInc(Self.FComponentState,1,0,6);
      if (TVariant.AsObject(Self.FHandle)!==TVariant.AsObject(document.body)) {
         if (Self.FTagId.length>0) {
            w3_setAttrib(Self.FHandle,"id",Self.FTagId);
         }
      }
      TW3TagObj.StyleTagObject$(Self);
      TW3TagObj.BeginUpdate(Self);
      try {
         TW3TagObj.InitializeObject$(Self);
      } finally {
         TW3TagObj.EndUpdate(Self);
      }
      setTimeout(function () {
         $SetExc(Self.FComponentState,1,0,6);
         $SetExc(Self.FComponentState,0,0,6);
      },100);
      $SetInc(Self.FComponentState,2,0,6);
      return Self
   }
   /// destructor TW3TagObj.Destroy()
   ///  [line: 1068, column: 22, file: SmartCL.Components]
   ,Destroy:function(Self) {
      $SetInc(Self.FComponentState,5,0,6);
      if (Self.FHandle) {
         try {
            TW3TagObj.UnHookEvents(Self);
            if (Self.FOwner$1) {
               TW3TagObj.RemoveFrom(Self);
            }
         } finally {
            TW3TagObj.FinalizeObject$(Self);
            Self.FTagId = "";
            Self.FHandle = null;
         }
         TObject.Destroy(Self);
      }
      if (Self.FAccess) {
         TObject.Free(Self.FAccess);
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3TagObj.EndUpdate()
   ///  [line: 1133, column: 21, file: SmartCL.Components]
   ,EndUpdate:function(Self) {
      if (Self.FUpdating>0) {
         --Self.FUpdating;
         if (Self.FUpdating==0) {
            TW3TagObj.AfterUpdate$(Self);
         }
      }
   }
   /// procedure TW3TagObj.FinalizeObject()
   ///  [line: 1199, column: 21, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
   }
   /// function TW3TagObj.getAccess() : TW3AttrAccess
   ///  [line: 1232, column: 20, file: SmartCL.Components]
   ,getAccess:function(Self) {
      var Result = null;
      if (Self.FAccess===null) {
         Self.FAccess = TW3AttrAccess.Create$49($New(TW3AttrAccess),Self.FHandle);
      }
      Result = Self.FAccess;
      return Result
   }
   /// function TW3TagObj.GetInnerHTML() : String
   ///  [line: 1171, column: 20, file: SmartCL.Components]
   ,GetInnerHTML:function(Self) {
      var Result = "";
      if (Self.FHandle) {
         Result = String(Self.FHandle.innerHTML);
      }
      return Result
   }
   /// function TW3TagObj.GetUpdating() : Boolean
   ///  [line: 1123, column: 20, file: SmartCL.Components]
   ,GetUpdating:function(Self) {
      var Result = false;
      Result = Self.FUpdating>0;
      return Result
   }
   /// procedure TW3TagObj.InitializeObject()
   ///  [line: 1195, column: 21, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
   }
   /// procedure TW3TagObj.InsertInto(const OwnerHandle: THandle)
   ///  [line: 1247, column: 21, file: SmartCL.Components]
   ,InsertInto:function(Self, OwnerHandle) {
      if (!OwnerHandle) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.InsertInto",Self,$R[9]);
      }
      if (!Self.FHandle) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.InsertInto",Self,$R[2]);
      }
      try {
         if (Self.FOwner$1) {
            TW3TagObj.RemoveFrom(Self);
         }
         if (OwnerHandle) {
            w3_setElementParentByRef(Self.FHandle,OwnerHandle);
         }
         Self.FOwner$1 = OwnerHandle;
      } catch ($e) {
         var e$4 = $W($e);
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.InsertInto",Self,e$4.FMessage)      }
   }
   /// function TW3TagObj.MakeElementTagId() : String
   ///  [line: 1222, column: 20, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      var Result = "";
      Result = w3_GetUniqueObjId();
      return Result
   }
   /// function TW3TagObj.MakeElementTagObj() : THandle
   ///  [line: 1227, column: 20, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = w3_createHtmlElement("div");
      return Result
   }
   /// procedure TW3TagObj.RemoveFrom()
   ///  [line: 1271, column: 21, file: SmartCL.Components]
   ,RemoveFrom:function(Self) {
      if (Self.FOwner$1==undefined) {
         return;
      }
      if (!Self.FOwner$1) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.RemoveFrom",Self,$R[9]);
      }
      if (!Self.FHandle) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.RemoveFrom",Self,$R[2]);
      }
      try {
         w3_RemoveElementByRef(Self.FHandle,Self.FOwner$1);
         Self.FOwner$1 = undefined;
      } catch ($e) {
         var e$5 = $W($e);
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.RemoveFrom",Self,e$5.FMessage)      }
   }
   /// procedure TW3TagObj.RemoveFromComponentState(const Flags: TComponentState)
   ///  [line: 1113, column: 21, file: SmartCL.Components]
   ,RemoveFromComponentState:function(Self, Flags$1) {
      if ($SetIn(Flags$1,0,0,6)) {
         $SetExc(Self.FComponentState,0,0,6);
      }
      if ($SetIn(Flags$1,1,0,6)) {
         $SetExc(Self.FComponentState,1,0,6);
      }
      if ($SetIn(Flags$1,2,0,6)) {
         $SetExc(Self.FComponentState,2,0,6);
      }
      if ($SetIn(Flags$1,3,0,6)) {
         $SetExc(Self.FComponentState,3,0,6);
      }
      if ($SetIn(Flags$1,4,0,6)) {
         $SetExc(Self.FComponentState,4,0,6);
      }
      if ($SetIn(Flags$1,5,0,6)) {
         $SetExc(Self.FComponentState,5,0,6);
      }
   }
   /// procedure TW3TagObj.SetInnerHTML(aValue: String)
   ///  [line: 1177, column: 21, file: SmartCL.Components]
   ,SetInnerHTML:function(Self, aValue$11) {
      Self.FHandle.innerHTML = aValue$11;
   }
   /// function TW3TagObj.Showing() : Boolean
   ///  [line: 1096, column: 20, file: SmartCL.Components]
   ,Showing:function(Self) {
      var Result = false;
      Result = Self.FHandle!=undefined&&Self.FHandle!=null&&$SetIn(Self.FComponentState,2,0,6);
      return Result
   }
   /// procedure TW3TagObj.StyleTagObject()
   ///  [line: 1203, column: 21, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      Self.FHandle.style["visibility"] = "hidden";
      Self.FHandle.style["display"] = "none";
      Self.FHandle.style["position"] = "absolute";
      Self.FHandle.style["overflow"] = "hidden";
      Self.FHandle.style["left"] = "0px";
      Self.FHandle.style["top"] = "0px";
   }
   /// procedure TW3TagObj.UnHookEvents()
   ///  [line: 1147, column: 21, file: SmartCL.Components]
   ,UnHookEvents:function(Self) {
      Self.FHandle.onresize = null;
      Self.FHandle.onselectstart = null;
      Self.FHandle.onfocus = null;
      Self.FHandle.onblur = null;
      Self.FHandle.onchange = null;
      Self.FHandle.onmousedown = null;
      Self.FHandle.onmouseup = null;
      Self.FHandle.onmousemove = null;
      Self.FHandle.onmouseover = null;
      Self.FHandle.onmouseout = null;
      Self.FHandle.onclick = null;
      Self.FHandle.ondblclick = null;
      Self.FHandle.onkeydown = null;
      Self.FHandle.onkeyup = null;
      Self.FHandle.onkeypress = null;
      Self.FHandle.webkitAnimationStart = null;
      Self.FHandle.webkitAnimationEnd = null;
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId$:function($){return $.ClassType.MakeElementTagId($)}
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing$:function($){return $.ClassType.Showing($)}
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
};
/// TW3Component = class (TW3TagObj)
///  [line: 247, column: 3, file: SmartCL.Components]
var TW3Component = {
   $ClassName:"TW3Component",$Parent:TW3TagObj
   ,$Init:function ($) {
      TW3TagObj.$Init($);
      $.FChildren = [];
      $.FName = "";
      $.FParent = null;
   }
   /// procedure TW3Component.CBNoBehavior()
   ///  [line: 1318, column: 24, file: SmartCL.Components]
   ,CBNoBehavior:function(Self) {
      if (event) {
         event.preventDefault();
      }
   }
   /// procedure TW3Component.ChildAdded(aChild: TW3Component)
   ///  [line: 1427, column: 24, file: SmartCL.Components]
   ,ChildAdded:function(Self, aChild) {
   }
   /// function TW3Component.ChildByName(const compName: String) : TW3Component
   ///  [line: 1325, column: 23, file: SmartCL.Components]
   ,ChildByName:function(Self, compName) {
      var Result = null;
      var lcName = "",
         i = 0;
      lcName = (Trim$_String_(compName)).toLowerCase();
      var $temp2;
      for(i=0,$temp2=TW3Component.GetChildCount(Self);i<$temp2;i++) {
         Result = TW3Component.GetChildObject(Self,i);
         if ((Result.FName).toLowerCase()==lcName) {
            return Result;
         }
      }
      Result = null;
      return Result
   }
   /// procedure TW3Component.ChildRemoved(aChild: TW3Component)
   ///  [line: 1431, column: 24, file: SmartCL.Components]
   ,ChildRemoved:function(Self, aChild$1) {
   }
   /// constructor TW3Component.Create(AOwner: TW3Component)
   ///  [line: 1298, column: 26, file: SmartCL.Components]
   ,Create$28:function(Self, AOwner$1) {
      Self.FParent = AOwner$1;
      TW3TagObj.Create$27(Self);
      if (Self.FParent!==null) {
         TW3Component.RegisterChild(Self.FParent,Self);
      }
      return Self
   }
   /// procedure TW3Component.FinalizeObject()
   ///  [line: 1371, column: 24, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TW3Component.FreeChildren(Self);
      if (Self.FParent!==null) {
         TW3Component.UnRegisterChild(Self.FParent,Self);
      }
      Self.FChildren.length=0;
      TW3TagObj.FinalizeObject(Self);
   }
   /// procedure TW3Component.FreeChildren()
   ///  [line: 1401, column: 24, file: SmartCL.Components]
   ,FreeChildren:function(Self) {
      var oldCount = 0;
      try {
         while (Self.FChildren.length>0) {
            oldCount = Self.FChildren.length;
            TObject.Free(Self.FChildren[0]);
            if (oldCount==Self.FChildren.length) {
               Self.FChildren.shift();
            }
         }
      } finally {
         Self.FChildren.length=0;
      }
   }
   /// function TW3Component.GetChildCount() : Integer
   ///  [line: 1386, column: 23, file: SmartCL.Components]
   ,GetChildCount:function(Self) {
      var Result = 0;
      Result = Self.FChildren.length;
      return Result
   }
   /// function TW3Component.GetChildObject(index: Integer) : TW3Component
   ///  [line: 1391, column: 23, file: SmartCL.Components]
   ,GetChildObject:function(Self, index) {
      var Result = null;
      Result = Self.FChildren[index];
      return Result
   }
   /// procedure TW3Component.InitializeObject()
   ///  [line: 1366, column: 24, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3TagObj.InitializeObject(Self);
   }
   /// procedure TW3Component.RegisterChild(aChild: TW3Component)
   ///  [line: 1435, column: 24, file: SmartCL.Components]
   ,RegisterChild:function(Self, aChild$2) {
      if (aChild$2!==null&&Self.FChildren.indexOf(aChild$2)<0) {
         Self.FChildren.push(aChild$2);
         TW3TagObj.InsertInto(aChild$2,Self.FHandle);
         TW3Component.ChildAdded(Self,aChild$2);
      }
   }
   /// procedure TW3Component.SetName(Value: String)
   ///  [line: 1396, column: 24, file: SmartCL.Components]
   ,SetName:function(Self, Value$2) {
      Self.FName = Value$2;
   }
   /// function TW3Component.Showing() : Boolean
   ///  [line: 1312, column: 23, file: SmartCL.Components]
   ,Showing:function(Self) {
      var Result = false;
      Result = TW3TagObj.Showing(Self)&&Self.FParent!==null;
      return Result
   }
   /// procedure TW3Component.UnRegisterChild(aChild: TW3Component)
   ///  [line: 1445, column: 24, file: SmartCL.Components]
   ,UnRegisterChild:function(Self, aChild$3) {
      var mIndex$2 = 0;
      if (aChild$3!==null) {
         mIndex$2 = Self.FChildren.indexOf(aChild$3);
         if (mIndex$2>=0) {
            Self.FChildren.splice(mIndex$2,1)
            ;
            TW3Component.ChildRemoved(Self,aChild$3);
         }
         TW3TagObj.RemoveFrom(aChild$3);
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing$:function($){return $.ClassType.Showing($)}
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$28$:function($){return $.ClassType.Create$28.apply($.ClassType, arguments)}
};
/// TW3MovableControl = class (TW3Component)
///  [line: 229, column: 3, file: SmartCL.Effects]
var TW3MovableControl = {
   $ClassName:"TW3MovableControl",$Parent:TW3Component
   ,$Init:function ($) {
      TW3Component.$Init($);
      $.FAdjusted = $.FTransparent = $.FUseAlpha = false;
      $.FAlpha = $.FSyncCount = 0;
      $.FBackground = $.FBorders = $.FConstraints = null;
      $.FColor = 0;
   }
   /// procedure TW3MovableControl.AdjustToParentBox()
   ///  [line: 1862, column: 29, file: SmartCL.Components]
   ,AdjustToParentBox:function(Self) {
      var x$34 = 0;
      var dx$3 = 0;
      var dy$3 = 0;
      var mChild = null;
      var mCtrl = null;
      if (Self.FHandle) {
         if (!Self.FAdjusted) {
            Self.FAdjusted = true;
            dx$3 = TW3Borders.GetHSpace(TW3MovableControl.GetBorder(Self));
            dy$3 = TW3Borders.GetVSpace(TW3MovableControl.GetBorder(Self));
            var $temp3;
            for(x$34=0,$temp3=TW3Component.GetChildCount(Self);x$34<$temp3;x$34++) {
               mChild = TW3Component.GetChildObject(Self,x$34);
               if ($Is(mChild,TW3MovableControl)) {
                  mCtrl = $As(mChild,TW3MovableControl);
                  if (TW3MovableControl.supportAdjustment$(mCtrl.ClassType)) {
                     if (dx$3>0||dy$3>0) {
                        TW3MovableControl.SetSize(mCtrl,TW3MovableControl.GetWidth(mCtrl)-dx$3,TW3MovableControl.GetHeight(mCtrl)-dy$3);
                     }
                     setTimeout($Event0(mCtrl,TW3MovableControl.AdjustToParentBox),1);
                  }
               }
            }
         }
      }
   }
   /// procedure TW3MovableControl.AfterUpdate()
   ///  [line: 1993, column: 29, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      TW3TagObj.RemoveFromComponentState(Self,[24]);
   }
   /// function TW3MovableControl.ClientHeight() : Integer
   ///  [line: 1908, column: 28, file: SmartCL.Components]
   ,ClientHeight:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         if (Self.FHandle.clientHeight) {
            Result = TVariant.AsInteger(Self.FHandle.clientHeight);
            if (isNaN(Result)||Result==0) {
               Result = TW3MovableControl.GetWidth(Self);
            }
         } else {
            Result = TW3MovableControl.GetWidth(Self);
         }
      }
      return Result
   }
   /// function TW3MovableControl.ClientWidth() : Integer
   ///  [line: 1894, column: 28, file: SmartCL.Components]
   ,ClientWidth:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         if (Self.FHandle.clientWidth) {
            Result = TVariant.AsInteger(Self.FHandle.clientWidth);
            if (isNaN(Result)||Result==0) {
               Result = TW3MovableControl.GetWidth(Self);
            }
         } else {
            Result = TW3MovableControl.GetWidth(Self);
         }
      }
      return Result
   }
   /// function TW3MovableControl.DisplayMode() : String
   ///  [line: 2013, column: 34, file: SmartCL.Components]
   ,DisplayMode:function(Self) {
      var Result = "";
      Result = "inline-block";
      return Result
   }
   /// procedure TW3MovableControl.FinalizeObject()
   ///  [line: 1965, column: 29, file: SmartCL.Components]
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
      TW3Component.FinalizeObject(Self);
   }
   /// function TW3MovableControl.fxBusy() : Boolean
   ///  [line: 388, column: 28, file: SmartCL.Effects]
   ,fxBusy:function(Self) {
      var Result = false;
      if (TW3AttrAccess.Exists(TW3TagObj.getAccess(Self),"fxBusy")) {
         Result = TW3AttrAccess.Read(TW3TagObj.getAccess(Self),"fxBusy")=="yes";
      } else {
         Result = false;
      }
      return Result
   }
   /// procedure TW3MovableControl.fxFadeIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 1000, column: 29, file: SmartCL.Effects]
   ,fxFadeIn$1:function(Self, Duration$1, OnFinished) {
      var mEffect = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect);
         mEffect = TW3CustomAnimation.Create$56$($New(TW3FadeAnimation));
         $As(mEffect,TW3FadeAnimation).FFrom = 0;
         $As(mEffect,TW3FadeAnimation).FTo = 1;
         TW3CustomAnimation.SetDuration(mEffect,Duration$1);
         mEffect.FOnEnds = function (Sender$2) {
            setTimeout(function () {
               TObject.Free($As(Sender$2,TW3CustomAnimation));
               AfterEffect(Self,$As(Sender$2,TW3CustomAnimation));
               if (OnFinished) {
                  OnFinished();
               }
            },100);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomAnimation.Execute(mEffect,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxFadeIn$1(Self,Duration$1,OnFinished);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxFadeOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 1047, column: 29, file: SmartCL.Effects]
   ,fxFadeOut$1:function(Self, Duration$2, OnFinished$1) {
      var mEffect$1 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$1);
         mEffect$1 = TW3CustomAnimation.Create$56$($New(TW3FadeAnimation));
         $As(mEffect$1,TW3FadeAnimation).FFrom = 1;
         $As(mEffect$1,TW3FadeAnimation).FTo = 0;
         TW3CustomAnimation.SetDuration(mEffect$1,Duration$2);
         mEffect$1.FOnEnds = function (Sender$3) {
            TW3MovableControl.SetVisible(Self,false);
            setTimeout(function () {
               TObject.Free($As(Sender$3,TW3CustomAnimation));
               AfterEffect(Self,$As(Sender$3,TW3CustomAnimation));
               if (OnFinished$1) {
                  OnFinished$1();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$1,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxFadeOut$1(Self,Duration$2,OnFinished$1);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxMoveBy(const dx: Integer; const dy: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 684, column: 29, file: SmartCL.Effects]
   ,fxMoveBy$1:function(Self, dx$4, dy$4, Duration$3, OnFinished$2) {
      var mEffect$2 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$2);
         mEffect$2 = TW3CustomAnimation.Create$56$($New(TW3MoveAnimation));
         TW3CustomAnimation.SetDuration(mEffect$2,Duration$3);
         $As(mEffect$2,TW3MoveAnimation).FFromX$1 = TW3MovableControl.GetLeft(Self);
         $As(mEffect$2,TW3MoveAnimation).FFromY$1 = TW3MovableControl.GetTop(Self);
         $As(mEffect$2,TW3MoveAnimation).FToX$1 = TW3MovableControl.GetLeft(Self)+dx$4;
         $As(mEffect$2,TW3MoveAnimation).FToY$1 = TW3MovableControl.GetTop(Self)+dy$4;
         $As(mEffect$2,TW3MoveAnimation).FTiming = 4;
         mEffect$2.FOnEnds = function (sender) {
            TW3MovableControl.SetLeft(Self,$As(sender,TW3MoveAnimation).FToX$1);
            TW3MovableControl.SetTop(Self,$As(sender,TW3MoveAnimation).FToY$1);
            setTimeout(function () {
               TObject.Free($As(sender,TW3CustomAnimation));
               AfterEffect(Self,$As(sender,TW3CustomAnimation));
               if (OnFinished$2) {
                  OnFinished$2();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$2,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxMoveBy$1(Self,dx$4,dy$4,Duration$3,OnFinished$2);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxMoveDown(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 632, column: 29, file: SmartCL.Effects]
   ,fxMoveDown$1:function(Self, Duration$4, OnFinished$3) {
      var mEffect$3 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$3);
         mEffect$3 = TW3CustomAnimation.Create$56$($New(TW3MoveAnimation));
         TW3CustomAnimation.SetDuration(mEffect$3,Duration$4);
         $As(mEffect$3,TW3MoveAnimation).FFromX$1 = TW3MovableControl.GetLeft(Self);
         $As(mEffect$3,TW3MoveAnimation).FFromY$1 = TW3MovableControl.GetTop(Self);
         $As(mEffect$3,TW3MoveAnimation).FToX$1 = TW3MovableControl.GetLeft(Self);
         $As(mEffect$3,TW3MoveAnimation).FToY$1 = TW3MovableControl.GetHeight($As(Self.FParent,TW3MovableControl))-TW3MovableControl.GetHeight(Self);
         $As(mEffect$3,TW3MoveAnimation).FTiming = 4;
         mEffect$3.FOnEnds = function (sender$1) {
            TW3MovableControl.SetTop(Self,(TW3MovableControl.GetHeight($As(Self.FParent,TW3MovableControl))-TW3MovableControl.GetHeight(Self)));
            /* null */
setTimeout(function () {
               TObject.Free($As(sender$1,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$1,TW3CustomAnimation));
               if (OnFinished$3) {
                  OnFinished$3();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$3,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxMoveDown$1(Self,Duration$4,OnFinished$3);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxMoveTo(const dx: Integer; const dy: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 787, column: 29, file: SmartCL.Effects]
   ,fxMoveTo$1:function(Self, dx$5, dy$5, Duration$5, OnFinished$4) {
      var mEffect$4 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$4);
         mEffect$4 = TW3CustomAnimation.Create$56$($New(TW3MoveAnimation));
         TW3CustomAnimation.SetDuration(mEffect$4,Duration$5);
         $As(mEffect$4,TW3MoveAnimation).FFromX$1 = TW3MovableControl.GetLeft(Self);
         $As(mEffect$4,TW3MoveAnimation).FFromY$1 = TW3MovableControl.GetTop(Self);
         $As(mEffect$4,TW3MoveAnimation).FToX$1 = dx$5;
         $As(mEffect$4,TW3MoveAnimation).FToY$1 = dy$5;
         $As(mEffect$4,TW3MoveAnimation).FTiming = 1;
         mEffect$4.FOnEnds = function (sender$2) {
            TW3MovableControl.SetLeft(Self,dx$5);
            TW3MovableControl.SetTop(Self,dy$5);
            setTimeout(function () {
               TObject.Free($As(sender$2,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$2,TW3CustomAnimation));
               if (OnFinished$4) {
                  OnFinished$4();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$4,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxMoveTo$1(Self,dx$5,dy$5,Duration$5,OnFinished$4);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxMoveUp(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 591, column: 29, file: SmartCL.Effects]
   ,fxMoveUp$1:function(Self, Duration$6, OnFinished$5) {
      var mEffect$5 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$5);
         mEffect$5 = TW3CustomAnimation.Create$56$($New(TW3MoveAnimation));
         TW3CustomAnimation.SetDuration(mEffect$5,Duration$6);
         $As(mEffect$5,TW3MoveAnimation).FFromX$1 = TW3MovableControl.GetLeft(Self);
         $As(mEffect$5,TW3MoveAnimation).FFromY$1 = TW3MovableControl.GetTop(Self);
         $As(mEffect$5,TW3MoveAnimation).FToX$1 = TW3MovableControl.GetLeft(Self);
         $As(mEffect$5,TW3MoveAnimation).FToY$1 = 0;
         $As(mEffect$5,TW3MoveAnimation).FTiming = 4;
         mEffect$5.FOnEnds = function (sender$3) {
            TW3MovableControl.SetTop(Self,0);
            setTimeout(function () {
               TObject.Free($As(sender$3,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$3,TW3CustomAnimation));
               if (OnFinished$5) {
                  OnFinished$5();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$5,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxMoveUp$1(Self,Duration$6,OnFinished$5);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxScaleDown(aFactor: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 472, column: 29, file: SmartCL.Effects]
   ,fxScaleDown$1:function(Self, aFactor, Duration$7, OnFinished$6) {
      var mEffect$6 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$6);
         mEffect$6 = TW3CustomAnimation.Create$56$($New(TW3SizeAnimation));
         TW3CustomAnimation.SetDuration(mEffect$6,Duration$7);
         $As(mEffect$6,TW3SizeAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$6,TW3SizeAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$6,TW3SizeAnimation).FFromWidth = TW3MovableControl.GetWidth(Self);
         $As(mEffect$6,TW3SizeAnimation).FFromHeight = TW3MovableControl.GetHeight(Self);
         aFactor = TInteger.EnsureRange(aFactor,1,2147483647);
         $As(mEffect$6,TW3SizeAnimation).FToX = TW3MovableControl.GetLeft(Self)+aFactor;
         $As(mEffect$6,TW3SizeAnimation).FToY = TW3MovableControl.GetTop(Self)+aFactor;
         $As(mEffect$6,TW3SizeAnimation).FToWidth = TW3MovableControl.GetWidth(Self)-aFactor*2;
         $As(mEffect$6,TW3SizeAnimation).FToHeight = TW3MovableControl.GetHeight(Self)-aFactor*2;
         $As(mEffect$6,TW3SizeAnimation).FTiming = 4;
         mEffect$6.FOnEnds = function (sender$4) {
            TW3MovableControl.SetBounds$2(Self,$As(mEffect$6,TW3SizeAnimation).FToX,$As(mEffect$6,TW3SizeAnimation).FToY,$As(mEffect$6,TW3SizeAnimation).FToWidth,$As(mEffect$6,TW3SizeAnimation).FToHeight);
            setTimeout(function () {
               TObject.Free($As(sender$4,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$4,TW3CustomAnimation));
               if (OnFinished$6) {
                  OnFinished$6();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$6,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxScaleDown$1(Self,aFactor,Duration$7,OnFinished$6);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxScaleTo(const aToX: Integer; const aToY: Integer; const aToWidth: Integer; const aToHeight: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 733, column: 29, file: SmartCL.Effects]
   ,fxScaleTo$1:function(Self, aToX, aToY, aToWidth, aToHeight, Duration$8, OnFinished$7) {
      var mEffect$7 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$7);
         mEffect$7 = TW3CustomAnimation.Create$56$($New(TW3SizeAnimation));
         TW3CustomAnimation.SetDuration(mEffect$7,Duration$8);
         $As(mEffect$7,TW3SizeAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$7,TW3SizeAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$7,TW3SizeAnimation).FFromWidth = TW3MovableControl.GetWidth(Self);
         $As(mEffect$7,TW3SizeAnimation).FFromHeight = TW3MovableControl.GetHeight(Self);
         $As(mEffect$7,TW3SizeAnimation).FToX = aToX;
         $As(mEffect$7,TW3SizeAnimation).FToY = aToY;
         $As(mEffect$7,TW3SizeAnimation).FToWidth = aToWidth;
         $As(mEffect$7,TW3SizeAnimation).FToHeight = aToHeight;
         $As(mEffect$7,TW3SizeAnimation).FTiming = 4;
         mEffect$7.FOnEnds = function (sender$5) {
            TW3MovableControl.SetBounds$2(Self,aToX,aToY,aToWidth,aToHeight);
            setTimeout(function () {
               TObject.Free($As(sender$5,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$5,TW3CustomAnimation));
               if (OnFinished$7) {
                  OnFinished$7();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$7,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxScaleTo$1(Self,aToX,aToY,aToWidth,aToHeight,Duration$8,OnFinished$7);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxScaleUp(aFactor: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 409, column: 29, file: SmartCL.Effects]
   ,fxScaleUp$1:function(Self, aFactor$1, Duration$9, OnFinished$8) {
      var mEffect$8 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$8);
         mEffect$8 = TW3CustomAnimation.Create$56$($New(TW3SizeAnimation));
         TW3CustomAnimation.SetDuration(mEffect$8,Duration$9);
         aFactor$1 = TInteger.EnsureRange(aFactor$1,1,2147483647);
         $As(mEffect$8,TW3SizeAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$8,TW3SizeAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$8,TW3SizeAnimation).FFromWidth = TW3MovableControl.GetWidth(Self);
         $As(mEffect$8,TW3SizeAnimation).FFromHeight = TW3MovableControl.GetHeight(Self);
         $As(mEffect$8,TW3SizeAnimation).FToX = TW3MovableControl.GetLeft(Self)-aFactor$1;
         $As(mEffect$8,TW3SizeAnimation).FToY = TW3MovableControl.GetTop(Self)-aFactor$1;
         $As(mEffect$8,TW3SizeAnimation).FToWidth = TW3MovableControl.GetWidth(Self)+aFactor$1*2;
         $As(mEffect$8,TW3SizeAnimation).FToHeight = TW3MovableControl.GetHeight(Self)+aFactor$1*2;
         $As(mEffect$8,TW3SizeAnimation).FTiming = 4;
         mEffect$8.FOnEnds = function (sender$6) {
            TW3MovableControl.SetBounds$2(Self,$As(mEffect$8,TW3SizeAnimation).FToX,$As(mEffect$8,TW3SizeAnimation).FToY,$As(mEffect$8,TW3SizeAnimation).FToWidth,$As(mEffect$8,TW3SizeAnimation).FToHeight);
            setTimeout(function () {
               TObject.Free($As(sender$6,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$6,TW3CustomAnimation));
               if (OnFinished$8) {
                  OnFinished$8();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$8,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxScaleUp$1(Self,aFactor$1,Duration$9,OnFinished$8);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxSetBusy(const aValue: Boolean)
   ///  [line: 395, column: 29, file: SmartCL.Effects]
   ,fxSetBusy:function(Self, aValue$12) {
      if (aValue$12) {
         TW3AttrAccess.Write(TW3TagObj.getAccess(Self),"fxBusy","yes");
      } else {
         TW3AttrAccess.Write(TW3TagObj.getAccess(Self),"fxBusy","no");
      }
   }
   /// procedure TW3MovableControl.fxSizeTo(const aWidth: Integer; const aHeight: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 530, column: 29, file: SmartCL.Effects]
   ,fxSizeTo$1:function(Self, aWidth, aHeight, Duration$10, OnFinished$9) {
      var mEffect$9 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$9);
         mEffect$9 = TW3CustomAnimation.Create$56$($New(TW3SizeAnimation));
         TW3CustomAnimation.SetDuration(mEffect$9,Duration$10);
         $As(mEffect$9,TW3SizeAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$9,TW3SizeAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$9,TW3SizeAnimation).FFromWidth = TW3MovableControl.GetWidth(Self);
         $As(mEffect$9,TW3SizeAnimation).FFromHeight = TW3MovableControl.GetHeight(Self);
         $As(mEffect$9,TW3SizeAnimation).FToX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$9,TW3SizeAnimation).FToY = TW3MovableControl.GetTop(Self);
         $As(mEffect$9,TW3SizeAnimation).FToWidth = aWidth;
         $As(mEffect$9,TW3SizeAnimation).FToHeight = aHeight;
         $As(mEffect$9,TW3SizeAnimation).FTiming = 4;
         mEffect$9.FOnEnds = function (sender$7) {
            TW3MovableControl.SetBounds$2(Self,$As(mEffect$9,TW3SizeAnimation).FToX,$As(mEffect$9,TW3SizeAnimation).FToY,$As(mEffect$9,TW3SizeAnimation).FToWidth,$As(mEffect$9,TW3SizeAnimation).FToHeight);
            setTimeout(function () {
               TObject.Free($As(sender$7,TW3CustomAnimation));
               AfterEffect(Self,$As(sender$7,TW3CustomAnimation));
               if (OnFinished$9) {
                  OnFinished$9();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$9,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxSizeTo$1(Self,aWidth,aHeight,Duration$10,OnFinished$9);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxWarpIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 959, column: 29, file: SmartCL.Effects]
   ,fxWarpIn$1:function(Self, Duration$11, OnFinished$10) {
      var mEffect$10 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$10);
         mEffect$10 = TW3CustomAnimation.Create$56$($New(TW3WarpInTransition));
         TW3CustomAnimation.SetDuration(mEffect$10,Duration$11);
         mEffect$10.FOnEnds = function (Sender$4) {
            setTimeout(function () {
               TObject.Free($As(Sender$4,TW3CustomAnimation));
               AfterEffect(Self,$As(Sender$4,TW3CustomAnimation));
               if (OnFinished$10) {
                  OnFinished$10();
               }
            },100);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomAnimation.Execute(mEffect$10,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxWarpIn$1(Self,Duration$11,OnFinished$10);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxWarpOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 918, column: 29, file: SmartCL.Effects]
   ,fxWarpOut$1:function(Self, Duration$12, OnFinished$11) {
      var mEffect$11 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$11);
         mEffect$11 = TW3CustomAnimation.Create$56$($New(TW3WarpOutTransition));
         TW3CustomAnimation.SetDuration(mEffect$11,Duration$12);
         mEffect$11.FOnEnds = function (Sender$5) {
            TW3MovableControl.SetVisible(Self,false);
            setTimeout(function () {
               TObject.Free($As(Sender$5,TW3CustomAnimation));
               AfterEffect(Self,$As(Sender$5,TW3CustomAnimation));
               if (OnFinished$11) {
                  OnFinished$11();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$11,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxWarpOut$1(Self,Duration$12,OnFinished$11);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxZoomIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 836, column: 29, file: SmartCL.Effects]
   ,fxZoomIn$1:function(Self, Duration$13, OnFinished$12) {
      var mEffect$12 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$12);
         mEffect$12 = TW3CustomAnimation.Create$56$($New(TW3ZoomInTransition));
         TW3CustomAnimation.SetDuration(mEffect$12,Duration$13);
         mEffect$12.FOnEnds = function (Sender$6) {
            setTimeout(function () {
               TObject.Free($As(Sender$6,TW3CustomAnimation));
               AfterEffect(Self,$As(Sender$6,TW3CustomAnimation));
               if (OnFinished$12) {
                  OnFinished$12();
               }
            },100);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomAnimation.Execute(mEffect$12,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxZoomIn$1(Self,Duration$13,OnFinished$12);
         },50);
      }
   }
   /// procedure TW3MovableControl.fxZoomOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 877, column: 29, file: SmartCL.Effects]
   ,fxZoomOut$1:function(Self, Duration$14, OnFinished$13) {
      var mEffect$13 = null;
      if (!TW3MovableControl.fxBusy(Self)) {
         BeforeEffect(Self,mEffect$13);
         mEffect$13 = TW3CustomAnimation.Create$56$($New(TW3ZoomOutTransition));
         TW3CustomAnimation.SetDuration(mEffect$13,Duration$14);
         mEffect$13.FOnEnds = function (Sender$7) {
            TW3MovableControl.SetVisible(Self,false);
            setTimeout(function () {
               TObject.Free($As(Sender$7,TW3CustomAnimation));
               AfterEffect(Self,$As(Sender$7,TW3CustomAnimation));
               if (OnFinished$13) {
                  OnFinished$13();
               }
            },100);
         };
         TW3CustomAnimation.Execute(mEffect$13,Self);
      } else {
         setTimeout(function () {
            TW3MovableControl.fxZoomOut$1(Self,Duration$14,OnFinished$13);
         },50);
      }
   }
   /// function TW3MovableControl.GetBorder() : TW3Borders
   ///  [line: 1986, column: 28, file: SmartCL.Components]
   ,GetBorder:function(Self) {
      var Result = null;
      if (Self.FBorders===null) {
         Self.FBorders = TW3OwnedObject.Create$11$($New(TW3Borders),Self);
      }
      Result = Self.FBorders;
      return Result
   }
   /// function TW3MovableControl.GetBoundsRect() : TRect
   ///  [line: 2039, column: 28, file: SmartCL.Components]
   ,GetBoundsRect:function(Self) {
      var Result = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      Result.Left$1 = w3_getStyleAsInt(Self.FHandle,"left");
      Result.Top$1 = w3_getStyleAsInt(Self.FHandle,"top");
      if (Self.FHandle) {
         Result.Right$1 = parseInt((Result.Left$1+Self.FHandle.offsetWidth),10);
         Result.Bottom$1 = parseInt((Result.Top$1+Self.FHandle.offsetHeight),10);
      } else {
         Result.Right$1 = Result.Left$1;
         Result.Bottom$1 = Result.Top$1;
      }
      return Result
   }
   /// function TW3MovableControl.GetHeight() : Integer
   ///  [line: 2160, column: 28, file: SmartCL.Components]
   ,GetHeight:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         Result = parseInt(Self.FHandle.offsetHeight,10);
      }
      return Result
   }
   /// function TW3MovableControl.GetLeft() : Integer
   ///  [line: 2056, column: 28, file: SmartCL.Components]
   ,GetLeft:function(Self) {
      var Result = 0;
      var mObj$4 = undefined;
      var mData$3,
         tagRef$14 = undefined;
      tagRef$14 = Self.FHandle;
      
    mObj$4   = document.defaultView.getComputedStyle(tagRef$14,null);

    if (mObj$4)
      mData$3 = (mObj$4).getPropertyValue('left');

    if (mData$3)
    {
      if (typeof(mData$3) === "number")
      {
        Result = mData$3;
      } else {
        if (typeof(mData$3) === "string")
        {
          mData$3 = parseInt(mData$3);
          if (typeof(mData$3) === "number")
          Result = mData$3;
        }
      }
    }
  return Result
   }
   /// function TW3MovableControl.GetTop() : Integer
   ///  [line: 2097, column: 28, file: SmartCL.Components]
   ,GetTop:function(Self) {
      var Result = 0;
      var mObj$5 = undefined;
      var mData$4,
         tagRef$15 = undefined;
      tagRef$15 = Self.FHandle;
      
    mObj$5   = document.defaultView.getComputedStyle(tagRef$15,null);

    if (mObj$5)
      mData$4 = (mObj$5).getPropertyValue('top');

    if (mData$4)
    {
      if (typeof(mData$4) === "number")
      {
        Result = mData$4;
      } else {
        if (typeof(mData$4) === "string")
        {
          mData$4 = parseInt(mData$4);
          if (typeof(mData$4) === "number")
          Result = mData$4;
        }
      }
    }
  return Result
   }
   /// function TW3MovableControl.GetVisible() : Boolean
   ///  [line: 2005, column: 28, file: SmartCL.Components]
   ,GetVisible:function(Self) {
      var Result = false;
      var mValue = "";
      mValue = w3_getStyleAsStr(Self.FHandle,"visibility");
      Result = (mValue).toLocaleLowerCase()=="visible";
      return Result
   }
   /// function TW3MovableControl.GetWidth() : Integer
   ///  [line: 2138, column: 28, file: SmartCL.Components]
   ,GetWidth:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         Result = parseInt(Self.FHandle.offsetWidth,10);
      }
      return Result
   }
   /// procedure TW3MovableControl.InitializeObject()
   ///  [line: 1740, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3Component.InitializeObject(Self);
      Self.FAlpha = 255;
      Self.FColor = 536870911;
      Self.FTransparent = false;
      if (Self.FParent) {
         TW3MovableControl.ReadySync(Self);
      } else {
         TW3MovableControl.ObjectReady(Self);
      }
   }
   /// procedure TW3MovableControl.Moved()
   ///  [line: 2208, column: 29, file: SmartCL.Components]
   ,Moved:function(Self) {
   }
   /// procedure TW3MovableControl.MoveTo(aLeft: Integer; aTop: Integer)
   ///  [line: 2216, column: 29, file: SmartCL.Components]
   ,MoveTo:function(Self, aLeft$2, aTop$2) {
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle.style["left"] = TInteger.ToPxStr(aLeft$2);
      Self.FHandle.style["top"] = TInteger.ToPxStr(aTop$2);
      TW3TagObj.AddToComponentState(Self,[16]);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.ObjectReady()
   ///  [line: 1795, column: 29, file: SmartCL.Components]
   ,ObjectReady:function(Self) {
      TW3TagObj.AddToComponentState(Self,[4]);
      if (TW3MovableControl.GetVisible(Self)) {
         TW3MovableControl.Resize$(Self);
      }
   }
   /// procedure TW3MovableControl.ReadySync()
   ///  [line: 1771, column: 29, file: SmartCL.Components]
   ,ReadySync:function(Self) {
      if (Self.FHandle&&TControlHandleHelper$Ready$1(Self.FHandle)&&(!$SetIn(Self.FComponentState,0,0,6))&&(!$SetIn(Self.FComponentState,1,0,6))) {
         TW3MovableControl.ObjectReady(Self);
      } else {
         ++Self.FSyncCount;
         if (Self.FSyncCount>600) {
            TW3MovableControl.ObjectReady(Self);
            return;
         }
         w3_RequestAnimationFrame($Event0(Self,TW3MovableControl.ReadySync));
      }
   }
   /// procedure TW3MovableControl.Resize()
   ///  [line: 2212, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
   }
   /// function TW3MovableControl.ScreenRect() : TRect
   ///  [line: 1928, column: 28, file: SmartCL.Components]
   ,ScreenRect:function(Self) {
      var Result = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var elem = undefined;
      if (Self.FHandle) {
         elem = Self.FHandle;
         while (true) {
            Result.Left$1+=parseInt(elem.offsetLeft,10);
            Result.Top$1+=parseInt(elem.offsetTop,10);
            elem = elem.offsetParent;
            if (elem) {
               Result.Left$1-=parseInt(elem.scrollLeft,10);
               Result.Top$1-=parseInt(elem.scrollTop,10);
            } else {
               break;
            }
         }
         Result.Right$1 = parseInt((Result.Left$1+Self.FHandle.offsetWidth),10);
         Result.Bottom$1 = parseInt((Result.Top$1+Self.FHandle.offsetHeight),10);
      }
      return Result
   }
   /// procedure TW3MovableControl.SetAlpha(const aValue: Integer)
   ///  [line: 2298, column: 29, file: SmartCL.Components]
   ,SetAlpha:function(Self, aValue$13) {
      Self.FAlpha = ClampInt(aValue$13,0,255);
      if (Self.FUseAlpha) {
         Self.FHandle.style["opacity"] = Self.FAlpha*0.01;
      }
   }
   /// procedure TW3MovableControl.SetBounds(aLeft: Integer; aTop: Integer; aWidth: Integer; aHeight: Integer)
   ///  [line: 2225, column: 29, file: SmartCL.Components]
   ,SetBounds$2:function(Self, aLeft$3, aTop$3, aWidth$1, aHeight$1) {
      var mSized = false;
      var mMoved = false;
      aWidth$1 = Math.max(0,aWidth$1);
      aHeight$1 = Math.max(0,aHeight$1);
      mMoved = aLeft$3!=TW3MovableControl.GetLeft(Self)||aTop$3!=TW3MovableControl.GetTop(Self);
      mSized = aWidth$1!=Self.FHandle.offsetWidth||aHeight$1!=Self.FHandle.offsetHeight;
      if ($SetIn(Self.FComponentState,2,0,6)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle.style["left"] = aLeft$3.toString()+"px";
         Self.FHandle.style["top"] = aTop$3.toString()+"px";
         Self.FHandle.style["width"] = aWidth$1.toString()+"px";
         Self.FHandle.style["height"] = aHeight$1.toString()+"px";
         if (mMoved) {
            TW3TagObj.AddToComponentState(Self,[16]);
         }
         if (mSized) {
            TW3TagObj.AddToComponentState(Self,[8]);
         }
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle.style["left"] = aLeft$3.toString()+"px";
         Self.FHandle.style["top"] = aTop$3.toString()+"px";
         Self.FHandle.style["width"] = aWidth$1.toString()+"px";
         Self.FHandle.style["height"] = aHeight$1.toString()+"px";
      }
   }
   /// procedure TW3MovableControl.SetColor(const aValue: TColor)
   ///  [line: 2323, column: 29, file: SmartCL.Components]
   ,SetColor:function(Self, aValue$14) {
      var mText = "";
      if (aValue$14!=Self.FColor) {
         Self.FColor = aValue$14;
         mText = ColorToWebStr(Self.FColor,(Self.FTransparent)?0:255);
         Self.FHandle.style["backgroundColor"] = mText;
      }
   }
   /// procedure TW3MovableControl.SetHeight(aValue: Integer)
   ///  [line: 2166, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, aValue$15) {
      aValue$15 = Math.max(aValue$15,0);
      if (aValue$15!=TW3MovableControl.GetHeight(Self)) {
         if ($SetIn(Self.FComponentState,2,0,6)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle.style["height"] = TInteger.ToPxStr(aValue$15);
            TW3TagObj.AddToComponentState(Self,[8]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle.style["height"] = TInteger.ToPxStr(aValue$15);
         }
      }
   }
   /// procedure TW3MovableControl.SetLeft(const aValue: Integer)
   ///  [line: 2085, column: 29, file: SmartCL.Components]
   ,SetLeft:function(Self, aValue$16) {
      if ($SetIn(Self.FComponentState,2,0,6)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle.style["left"] = TInteger.ToPxStr(aValue$16);
         TW3TagObj.AddToComponentState(Self,[16]);
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle.style["left"] = TInteger.ToPxStr(aValue$16);
      }
   }
   /// procedure TW3MovableControl.SetSize(aWidth: Integer; aHeight: Integer)
   ///  [line: 2263, column: 29, file: SmartCL.Components]
   ,SetSize:function(Self, aWidth$2, aHeight$2) {
      aWidth$2 = Math.max(aWidth$2,0);
      aHeight$2 = Math.max(aHeight$2,0);
      if (aWidth$2!=Self.FHandle.offsetWidth||aHeight$2!=Self.FHandle.offsetHeight) {
         if ($SetIn(Self.FComponentState,2,0,6)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle.style["width"] = aWidth$2.toString()+"px";
            Self.FHandle.style["height"] = aHeight$2.toString()+"px";
            TW3TagObj.AddToComponentState(Self,[8]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle.style["width"] = aWidth$2.toString()+"px";
            Self.FHandle.style["height"] = aHeight$2.toString()+"px";
         }
      }
   }
   /// procedure TW3MovableControl.SetTop(const aValue: Integer)
   ///  [line: 2126, column: 29, file: SmartCL.Components]
   ,SetTop:function(Self, aValue$17) {
      if ($SetIn(Self.FComponentState,2,0,6)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle.style["top"] = TInteger.ToPxStr(aValue$17);
         TW3TagObj.AddToComponentState(Self,[16]);
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle.style["top"] = TInteger.ToPxStr(aValue$17);
      }
   }
   /// procedure TW3MovableControl.SetTransparent(const aValue: Boolean)
   ///  [line: 2308, column: 29, file: SmartCL.Components]
   ,SetTransparent:function(Self, aValue$18) {
      var mText$1 = "";
      if (aValue$18!=Self.FTransparent) {
         TW3TagObj.BeginUpdate(Self);
         Self.FTransparent = aValue$18;
         mText$1 = ColorToWebStr(Self.FColor,(aValue$18)?0:255);
         Self.FHandle.style["backgroundColor"] = mText$1;
         TW3TagObj.AddToComponentState(Self,[16]);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3MovableControl.SetUseAlpha(const aValue: Boolean)
   ///  [line: 2284, column: 29, file: SmartCL.Components]
   ,SetUseAlpha:function(Self, aValue$19) {
      var mBlend = 0;
      if (aValue$19==Self.FUseAlpha) {
         return;
      }
      Self.FUseAlpha = aValue$19;
      if (aValue$19) {
         mBlend = Self.FAlpha*0.01;
      } else {
         mBlend = 1;
      }
      Self.FHandle.style["opacity"] = mBlend;
   }
   /// procedure TW3MovableControl.SetVisible(const aValue: Boolean)
   ///  [line: 2018, column: 29, file: SmartCL.Components]
   ,SetVisible:function(Self, aValue$20) {
      TW3TagObj.BeginUpdate(Self);
      if (aValue$20) {
         Self.FHandle.style["display"] = TW3MovableControl.DisplayMode(Self.ClassType);
         Self.FHandle.style["visibility"] = "visible";
         TW3TagObj.AddToComponentState(Self,[8]);
      } else {
         Self.FHandle.style["display"] = "none";
         Self.FHandle.style["visibility"] = "hidden";
      }
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.SetWidth(aValue: Integer)
   ///  [line: 2144, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, aValue$21) {
      aValue$21 = Math.max(aValue$21,0);
      if (aValue$21!=TW3MovableControl.GetWidth(Self)) {
         if ($SetIn(Self.FComponentState,2,0,6)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle.style["width"] = TInteger.ToPxStr(aValue$21);
            TW3TagObj.AddToComponentState(Self,[8]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle.style["width"] = TInteger.ToPxStr(aValue$21);
         }
      }
   }
   /// function TW3MovableControl.Showing() : Boolean
   ///  [line: 1759, column: 28, file: SmartCL.Components]
   ,Showing:function(Self) {
      var Result = false;
      Result = TW3Component.Showing(Self)&&TW3MovableControl.GetWidth(Self)>0&&TW3MovableControl.GetHeight(Self)>0&&TW3MovableControl.GetLeft(Self)>=0&&TW3MovableControl.GetLeft(Self)<TW3MovableControl.GetWidth(Self)&&TW3MovableControl.GetTop(Self)>=0&&TW3MovableControl.GetTop(Self)<TW3MovableControl.GetHeight(Self)&&TW3MovableControl.GetVisible(Self);
      return Result
   }
   /// function TW3MovableControl.supportAdjustment() : Boolean
   ///  [line: 1857, column: 34, file: SmartCL.Components]
   ,supportAdjustment:function(Self) {
      var Result = false;
      Result = true;
      return Result
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing$:function($){return $.ClassType.Showing($)}
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$28:TW3Component.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,supportAdjustment$:function($){return $.supportAdjustment($)}
};
/// TW3CustomControl = class (TW3MovableControl)
///  [line: 474, column: 3, file: SmartCL.Components]
var TW3CustomControl = {
   $ClassName:"TW3CustomControl",$Parent:TW3MovableControl
   ,$Init:function ($) {
      TW3MovableControl.$Init($);
      $.FAngle = 0;
      $.FClassNames = $.FFont = $.FGestureData = $.FNoBehavior = $.FOnAnimationBegins = $.FOnAnimationEnds = $.FOnChanged = $.FOnClick = $.FOnContextPopup = $.FOnDblClick = $.FOnGestureChange = $.FOnGestureEnd = $.FOnGestureStart = $.FOnGotFocus = $.FOnKeyDown = $.FOnKeyPress = $.FOnKeyUp = $.FOnLostFocus = $.FOnMouseDown = $.FOnMouseEnter = $.FOnMouseExit = $.FOnMouseMove = $.FOnMouseUp = $.FOnMouseWheel = $.FOnResize = $.FOnTouchBegins = $.FOnTouchEnds = $.FOnTouchMoves = $.FScrollInfo = $.FTouchData = null;
      $.FMouseCaptured = 0;
      $.FTouchBound = false;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 31, column: 43, file: SmartCL.MouseCapture]
   ,a$2:function(Self) {
      return vCaptureControl===Self;
   }
   /// procedure TW3CustomControl.AfterUpdate()
   ///  [line: 3184, column: 28, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      if ($SetIn(Self.FComponentState,2,0,6)) {
         if ($SetIn(Self.FComponentState,3,0,6)) {
            TW3TagObj.RemoveFromComponentState(Self,[8]);
            TW3MovableControl.Resize$(Self);
            if (Self.FOnResize) {
               Self.FOnResize(Self);
            }
            if ($Is(Self,TW3GraphicControl)) {
               TW3TagObj.AddToComponentState(Self,[16]);
            }
         }
         if ($SetIn(Self.FComponentState,4,0,6)) {
            TW3TagObj.RemoveFromComponentState(Self,[16]);
            TW3MovableControl.Moved(Self);
            TW3CustomControl.Invalidate$(Self);
         }
      }
      TW3MovableControl.AfterUpdate(Self);
   }
   /// procedure TW3CustomControl.BindTouch()
   ///  [line: 2950, column: 28, file: SmartCL.Components]
   ,BindTouch:function(Self) {
      if (Self.FTouchBound) {
         return;
      }
      Self.FTouchBound = true;
      Self.FHandle.addEventListener("touchstart",$Event1(Self,TW3CustomControl.CMTouchBegins));
      Self.FHandle.addEventListener("touchmove",$Event1(Self,TW3CustomControl.CMTouchMove));
      Self.FHandle.addEventListener("touchend",$Event1(Self,TW3CustomControl.CMTouchEnds));
   }
   /// procedure TW3CustomControl.BringToFront()
   ///  [line: 2577, column: 28, file: SmartCL.Components]
   ,BringToFront:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.style.zIndex = (TW3CustomControl.GetMaxZIndex($As(Self.FParent,TW3CustomControl))+1);
      }
   }
   /// procedure TW3CustomControl.CBAnimationBegins(const eventObj: Variant)
   ///  [line: 2914, column: 28, file: SmartCL.Components]
   ,CBAnimationBegins:function(Self, eventObj) {
      if (Self.FOnAnimationBegins) {
         Self.FOnAnimationBegins(Self);
      }
   }
   /// procedure TW3CustomControl.CBAnimationEnds(const eventObj: Variant)
   ///  [line: 2929, column: 28, file: SmartCL.Components]
   ,CBAnimationEnds:function(Self, eventObj$1) {
      if (Self.FOnAnimationEnds) {
         Self.FOnAnimationEnds(Self);
      }
   }
   /// procedure TW3CustomControl.CBChanged(eventObj: JEvent)
   ///  [line: 2944, column: 28, file: SmartCL.Components]
   ,CBChanged:function(Self, eventObj$2) {
      if (Self.FOnChanged) {
         Self.FOnChanged(Self);
      }
   }
   /// procedure TW3CustomControl.CBClick(eventObj: JEvent)
   ///  [line: 2845, column: 28, file: SmartCL.Components]
   ,CBClick:function(Self, eventObj$3) {
      if (Self.FOnClick) {
         Self.FOnClick(Self);
      }
   }
   /// function TW3CustomControl.CBContextPopup(event: JMouseEvent) : Boolean
   ///  [line: 3119, column: 27, file: SmartCL.Components]
   ,CBContextPopup:function(Self, event) {
      var Result = false;
      var sr = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         mp = {X$1:0,Y$1:0};
      var handled = {v:false};
      sr = TW3MovableControl.ScreenRect(Self);
      mp.X$1 = event.clientX-sr.Left$1;
      mp.Y$1 = event.clientY-sr.Top$1;
      handled.v = false;
      TW3CustomControl.ContextPopup(Self,mp,handled);
      Result = !handled.v;
      return Result
   }
   /// procedure TW3CustomControl.CBDblClick(eventObj: JEvent)
   ///  [line: 2860, column: 28, file: SmartCL.Components]
   ,CBDblClick:function(Self, eventObj$4) {
      if (Self.FOnDblClick) {
         Self.FOnDblClick(Self);
      }
   }
   /// procedure TW3CustomControl.CBFocused()
   ///  [line: 2492, column: 28, file: SmartCL.Components]
   ,CBFocused:function(Self) {
      if (Self.FOnGotFocus) {
         Self.FOnGotFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBKeyDown(eventObj: JKeyboardEvent)
   ///  [line: 2872, column: 28, file: SmartCL.Components]
   ,CBKeyDown:function(Self, eventObj$5) {
      if (Self.FOnKeyDown) {
         Self.FOnKeyDown(Self,eventObj$5.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBKeyPress(eventObj: JKeyboardEvent)
   ///  [line: 2899, column: 28, file: SmartCL.Components]
   ,CBKeyPress:function(Self, eventObj$6) {
      if (Self.FOnKeyPress) {
         Self.FOnKeyPress(Self,eventObj$6.charCode);
      }
   }
   /// procedure TW3CustomControl.CBKeyUp(eventObj: JKeyboardEvent)
   ///  [line: 2884, column: 28, file: SmartCL.Components]
   ,CBKeyUp:function(Self, eventObj$7) {
      if (Self.FOnKeyUp) {
         Self.FOnKeyUp(Self,eventObj$7.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBLostFocus()
   ///  [line: 2498, column: 28, file: SmartCL.Components]
   ,CBLostFocus:function(Self) {
      if (Self.FOnLostFocus) {
         Self.FOnLostFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBMouseDown(eventObj: JMouseEvent)
   ///  [line: 2682, column: 28, file: SmartCL.Components]
   ,CBMouseDown:function(Self, eventObj$8) {
      var sr$1 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         shiftState = null;
      sr$1 = TW3MovableControl.ScreenRect(Self);
      shiftState = TShiftState.Current();
      shiftState.FMouseButtons = shiftState.FMouseButtons|(1<<eventObj$8.button);
      TShiftState.SetMouseEvent(shiftState,eventObj$8);
      TW3CustomControl.MouseDown(Self,parseInt(eventObj$8.button,10),shiftState,eventObj$8.clientX-sr$1.Left$1,eventObj$8.clientY-sr$1.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseEnter(eventObj: JMouseEvent)
   ///  [line: 2750, column: 28, file: SmartCL.Components]
   ,CBMouseEnter:function(Self, eventObj$9) {
      var sr$2 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         shiftState$1 = null;
      sr$2 = TW3MovableControl.ScreenRect(Self);
      shiftState$1 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$1,eventObj$9);
      TW3CustomControl.MouseEnter(Self,shiftState$1,eventObj$9.clientX-sr$2.Left$1,eventObj$9.clientY-sr$2.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseExit(eventObj: JMouseEvent)
   ///  [line: 2774, column: 28, file: SmartCL.Components]
   ,CBMouseExit:function(Self, eventObj$10) {
      var sr$3 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         shiftState$2 = null;
      sr$3 = TW3MovableControl.ScreenRect(Self);
      shiftState$2 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$2,eventObj$10);
      TW3CustomControl.MouseExit(Self,shiftState$2,eventObj$10.clientX-sr$3.Left$1,eventObj$10.clientY-sr$3.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseMove(eventObj: JMouseEvent)
   ///  [line: 2728, column: 28, file: SmartCL.Components]
   ,CBMouseMove:function(Self, eventObj$11) {
      var sr$4 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         shiftState$3 = null;
      sr$4 = TW3MovableControl.ScreenRect(Self);
      shiftState$3 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$3,eventObj$11);
      TW3CustomControl.MouseMove(Self,shiftState$3,eventObj$11.clientX-sr$4.Left$1,eventObj$11.clientY-sr$4.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseUp(eventObj: JMouseEvent)
   ///  [line: 2704, column: 28, file: SmartCL.Components]
   ,CBMouseUp:function(Self, eventObj$12) {
      var sr$5 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         shiftState$4 = null;
      sr$5 = TW3MovableControl.ScreenRect(Self);
      shiftState$4 = TShiftState.Current();
      shiftState$4.FMouseButtons = shiftState$4.FMouseButtons&(~(1<<eventObj$12.button));
      TShiftState.SetMouseEvent(shiftState$4,eventObj$12);
      TW3CustomControl.MouseUp(Self,parseInt(eventObj$12.button,10),shiftState$4,eventObj$12.clientX-sr$5.Left$1,eventObj$12.clientY-sr$5.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseWheel(eventObj: JMouseWheelEvent)
   ///  [line: 2809, column: 28, file: SmartCL.Components]
   ,CBMouseWheel:function(Self, eventObj$13) {
      var wheelDelta$1 = 0;
      var handled$1 = {};
      handled$1.v = false;
      var sr$6 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0},
         shiftState$5 = null,
         mousePos = {X$1:0,Y$1:0};
      if (Self.FOnMouseWheel) {
         if (eventObj$13.detail) {
            wheelDelta$1 = eventObj$13.detail*-40;
         } else {
            wheelDelta$1 = eventObj$13.wheelDelta;
         }
         sr$6 = TW3MovableControl.ScreenRect(Self);
         shiftState$5 = TShiftState.Current();
         TShiftState.SetMouseEvent(shiftState$5,eventObj$13);
         mousePos.X$1 = eventObj$13.clientX-sr$6.Left$1;
         mousePos.Y$1 = eventObj$13.clientY-sr$6.Top$1;
         TW3CustomControl.MouseWheel(Self,shiftState$5,wheelDelta$1,mousePos,handled$1);
         if (handled$1.v) {
            eventObj$13.preventDefault();
            eventObj$13.stopPropagation();
         }
      }
   }
   /// procedure TW3CustomControl.CMGestureChange()
   ///  [line: 3059, column: 28, file: SmartCL.Components]
   ,CMGestureChange:function(Self) {
      event.preventDefault();
      if (Self.FOnGestureChange) {
         if (!Self.FGestureData) {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         } else {
            TW3GestureData.Update$2(Self.FGestureData);
         }
         Self.FOnGestureChange(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMGestureEnd()
   ///  [line: 3087, column: 28, file: SmartCL.Components]
   ,CMGestureEnd:function(Self) {
      event.preventDefault();
      if (Self.FOnGestureEnd) {
         if (!Self.FGestureData) {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         } else {
            TW3GestureData.Update$2(Self.FGestureData);
         }
         Self.FOnGestureEnd(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMGestureStart()
   ///  [line: 3031, column: 28, file: SmartCL.Components]
   ,CMGestureStart:function(Self) {
      event.preventDefault();
      if (Self.FOnGestureStart) {
         if (!Self.FGestureData) {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         } else {
            TW3GestureData.Update$2(Self.FGestureData);
         }
         Self.FOnGestureStart(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMTouchBegins(eventObj: JTouchEvent)
   ///  [line: 2966, column: 28, file: SmartCL.Components]
   ,CMTouchBegins:function(Self, eventObj$14) {
      if (Self.FOnTouchBegins) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         } else {
            TW3TouchData.Update$1(Self.FTouchData,eventObj$14);
         }
         Self.FOnTouchBegins(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchEnds(eventObj: JTouchEvent)
   ///  [line: 3004, column: 28, file: SmartCL.Components]
   ,CMTouchEnds:function(Self, eventObj$15) {
      if (Self.FOnTouchEnds) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         } else {
            TW3TouchData.Update$1(Self.FTouchData,eventObj$15);
         }
         Self.FOnTouchEnds(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchMove(eventObj: JTouchEvent)
   ///  [line: 2985, column: 28, file: SmartCL.Components]
   ,CMTouchMove:function(Self, eventObj$16) {
      if (Self.FOnTouchMoves) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         } else {
            TW3TouchData.Update$1(Self.FTouchData,eventObj$16);
         }
         Self.FOnTouchMoves(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.ContextPopup(const mousePos: TPoint; var handled: Boolean)
   ///  [line: 3130, column: 28, file: SmartCL.Components]
   ,ContextPopup:function(Self, mousePos$1, handled$2) {
      if (Self.FOnContextPopup) {
         Self.FOnContextPopup(Self,mousePos$1,handled$2);
      }
   }
   /// constructor TW3CustomControl.Create(AOwner: TW3Component)
   ///  [line: 2395, column: 30, file: SmartCL.Components]
   ,Create$28:function(Self, AOwner$2) {
      TW3Component.Create$28(Self,AOwner$2);
      Self.FHandle["onclick"] = $Event1(Self,TW3CustomControl.CBClick$);
      return Self
   }
   /// procedure TW3CustomControl.FinalizeObject()
   ///  [line: 2417, column: 28, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FFont);
      TObject.Free(Self.FClassNames);
      TObject.Free(Self.FScrollInfo);
      TObject.Free(Self.FTouchData);
      TObject.Free(Self.FGestureData);
      TW3MovableControl.FinalizeObject(Self);
   }
   /// function TW3CustomControl.GetBorderRadius() : Integer
   ///  [line: 3164, column: 27, file: SmartCL.Components]
   ,GetBorderRadius:function(Self) {
      var Result = 0;
      Result = w3_getStyleAsInt(Self.FHandle,"bordertopleftRadius");
      return Result
   }
   /// function TW3CustomControl.GetChildrenSortedByYPos() : TW3ComponentArray
   ///  [line: 2583, column: 27, file: SmartCL.Components]
   ,GetChildrenSortedByYPos:function(Self) {
      var Result = [];
      var mCount = 0;
      var x$35 = 0;
      var mAltered = false;
      var mObj$6 = null;
      var mLast = null;
      var mCurrent = null;
      Result.length=0;
      mCount = TW3Component.GetChildCount(Self);
      if (mCount>0) {
         var $temp4;
         for(x$35=0,$temp4=mCount;x$35<$temp4;x$35++) {
            mObj$6 = TW3Component.GetChildObject(Self,x$35);
            if ($Is(mObj$6,TW3CustomControl)) {
               Result.push(mObj$6);
            }
         }
         if (Result.length>1) {
            do {
               mAltered = false;
               var $temp5;
               for(x$35=1,$temp5=mCount;x$35<$temp5;x$35++) {
                  mLast = $As(Result[x$35-1],TW3CustomControl);
                  mCurrent = $As(Result[x$35],TW3CustomControl);
                  if (TW3MovableControl.GetTop(mCurrent)<TW3MovableControl.GetTop(mLast)) {
                     $ArraySwap(Result,(x$35-1),x$35);
                     mAltered = true;
                  }
               }
            } while (!(mAltered==false));
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetEnabled() : Boolean
   ///  [line: 2476, column: 27, file: SmartCL.Components]
   ,GetEnabled:function(Self) {
      var Result = false;
      Result = Self.FHandle.disabled!=true;
      return Result
   }
   /// function TW3CustomControl.GetFont() : TW3ControlFont
   ///  [line: 2444, column: 27, file: SmartCL.Components]
   ,GetFont:function(Self) {
      var Result = null;
      if (Self.FFont===null) {
         Self.FFont = TW3ControlFont.Create$48($New(TW3ControlFont),Self);
      }
      Result = Self.FFont;
      return Result
   }
   /// function TW3CustomControl.GetHasFocus() : Boolean
   ///  [line: 2655, column: 27, file: SmartCL.Components]
   ,GetHasFocus:function(Self) {
      var Result = false;
      if (Self.FHandle) {
         Result = document.activeElement==Self.FHandle;
      }
      return Result
   }
   /// function TW3CustomControl.GetMaxZIndex() : Integer
   ///  [line: 2561, column: 27, file: SmartCL.Components]
   ,GetMaxZIndex:function(Self) {
      var Result = 0;
      var iChild = 0;
      var obj = null,
         objZIndex = 0;
      Result = 0;
      var $temp6;
      for(iChild=0,$temp6=TW3Component.GetChildCount(Self);iChild<$temp6;iChild++) {
         obj = TW3Component.GetChildObject(Self,iChild);
         if ((obj!==null)&&$Is(obj,TW3CustomControl)&&obj.FHandle) {
            objZIndex = TW3CustomControl.GetZIndexAsInt($As(obj,TW3CustomControl),0);
            if (objZIndex>Result) {
               Result = objZIndex;
            }
            objZIndex = TW3CustomControl.GetMaxZIndex($As(obj,TW3CustomControl));
            if (objZIndex>Result) {
               Result = objZIndex;
            }
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetScrollInfo() : TW3ScrollInfo
   ///  [line: 2469, column: 27, file: SmartCL.Components]
   ,GetScrollInfo:function(Self) {
      var Result = null;
      if (Self.FScrollInfo===null) {
         Self.FScrollInfo = TW3OwnedObject.Create$11$($New(TW3ScrollInfo),Self);
      }
      Result = Self.FScrollInfo;
      return Result
   }
   /// function TW3CustomControl.GetStyleClass() : String
   ///  [line: 2626, column: 27, file: SmartCL.Components]
   ,GetStyleClass:function(Self) {
      var Result = "";
      Result = w3_getAttribAsStr(Self.FHandle,"class");
      return Result
   }
   /// function TW3CustomControl.GetZIndexAsInt(default: Integer = 0) : Integer
   ///  [line: 2504, column: 27, file: SmartCL.Components]
   ,GetZIndexAsInt:function(Self, default$1) {
      var Result = 0;
      var mData$5;
      Result = default$1;
      mData$5 = Self.FHandle.style["zIndex"];
      if (Self.FHandle) {
         if (TVariant.IsNumber(mData$5)) {
            Result = parseInt(mData$5,10);
         } else if (TVariant.IsString(mData$5)) {
            Result = parseInt(mData$5,10);
            if (isNaN(Result)) {
               Result = default$1;
            }
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetZoom() : Float
   ///  [line: 2451, column: 27, file: SmartCL.Components]
   ,GetZoom:function(Self) {
      var Result = 0;
      Result = w3_getStyleAsFloat(Self.FHandle,"zoom");
      return Result
   }
   /// procedure TW3CustomControl.InitializeCapture()
   ///  [line: 36, column: 34, file: SmartCL.MouseCapture]
   ,InitializeCapture:function(Self) {
      var doc = undefined;
      doc = document;
      doc.addEventListener("mousedown",function (evt) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseDown$(vCaptureControl,evt);
            evt.stopImmediatePropagation();
         }
      },true);
      doc.addEventListener("mousemove",function (evt$1) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseMove$(vCaptureControl,evt$1);
            evt$1.stopImmediatePropagation();
         }
      },true);
      doc.addEventListener("mouseup",function (evt$2) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseUp$(vCaptureControl,evt$2);
            evt$2.stopImmediatePropagation();
         }
         vCaptureControl = null;
      },true);
      doc.addEventListener("mouseover",function (evt$3) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseEnter(vCaptureControl,evt$3);
            evt$3.stopImmediatePropagation();
         }
      },true);
      doc.addEventListener("mouseout",function (evt$4) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseExit(vCaptureControl,evt$4);
            evt$4.stopImmediatePropagation();
         }
      },true);
      doc.addEventListener("mousewheel",function (evt$5) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseWheel(vCaptureControl,evt$5);
            evt$5.stopImmediatePropagation();
         }
      },true);
      doc.addEventListener("onclick",function (evt$6) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBClick$(vCaptureControl,evt$6);
            evt$6.stopImmediatePropagation();
         }
      },true);
      doc.addEventListener("ondblclick",function (evt$7) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBDblClick(vCaptureControl,evt$7);
            evt$7.stopImmediatePropagation();
         }
      },true);
      vCaptureInitialized = true;
   }
   /// procedure TW3CustomControl.InitializeObject()
   ///  [line: 2401, column: 28, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3MovableControl.InitializeObject(Self);
      Self.FNoBehavior = $Event0(Self,TW3Component.CBNoBehavior);
      w3_bind2(Self.FHandle,"onselectstart",$Event0(Self,TW3Component.CBNoBehavior));
      w3_bind2(Self.FHandle,"onfocus",$Event0(Self,TW3CustomControl.CBFocused));
      w3_bind2(Self.FHandle,"onblur",$Event0(Self,TW3CustomControl.CBLostFocus));
   }
   /// procedure TW3CustomControl.Invalidate()
   ///  [line: 3136, column: 28, file: SmartCL.Components]
   ,Invalidate:function(Self) {
   }
   /// procedure TW3CustomControl.LayoutChildren()
   ///  [line: 3141, column: 28, file: SmartCL.Components]
   ,LayoutChildren:function(Self) {
      var x$36 = 0;
      var mChild$1 = null;
      TW3TagObj.BeginUpdate(Self);
      var $temp7;
      for(x$36=0,$temp7=TW3Component.GetChildCount(Self);x$36<$temp7;x$36++) {
         mChild$1 = TW3Component.GetChildObject(Self,x$36);
         if ($Is(mChild$1,TW3CustomControl)) {
            TW3CustomControl.LayoutChildren($As(mChild$1,TW3CustomControl));
         }
      }
      TW3TagObj.AddToComponentState(Self,[24]);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3CustomControl.MouseDown(button: TMouseButton; shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2692, column: 28, file: SmartCL.Components]
   ,MouseDown:function(Self, button$3, shiftState$6, x$37, y$32) {
      if (Self.FOnMouseDown) {
         Self.FOnMouseDown(Self,button$3,shiftState$6,x$37,y$32);
      }
   }
   /// procedure TW3CustomControl.MouseEnter(shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2758, column: 28, file: SmartCL.Components]
   ,MouseEnter:function(Self, shiftState$7, x$38, y$33) {
      if (Self.FOnMouseEnter) {
         Self.FOnMouseEnter(Self,shiftState$7,x$38,y$33);
      }
   }
   /// procedure TW3CustomControl.MouseExit(shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2782, column: 28, file: SmartCL.Components]
   ,MouseExit:function(Self, shiftState$8, x$39, y$34) {
      if (Self.FOnMouseExit) {
         Self.FOnMouseExit(Self,shiftState$8,x$39,y$34);
      }
   }
   /// procedure TW3CustomControl.MouseMove(shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2736, column: 28, file: SmartCL.Components]
   ,MouseMove:function(Self, shiftState$9, x$40, y$35) {
      if (Self.FOnMouseMove) {
         Self.FOnMouseMove(Self,shiftState$9,x$40,y$35);
      }
   }
   /// procedure TW3CustomControl.MouseUp(button: TMouseButton; shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2715, column: 28, file: SmartCL.Components]
   ,MouseUp:function(Self, button$4, shiftState$10, x$41, y$36) {
      if (Self.FOnMouseUp) {
         Self.FOnMouseUp(Self,button$4,shiftState$10,x$41,y$36);
      }
   }
   /// procedure TW3CustomControl.MouseWheel(shift: TShiftState; wheelDelta: Integer; const mousePos: TPoint; var handled: Boolean)
   ///  [line: 2833, column: 28, file: SmartCL.Components]
   ,MouseWheel:function(Self, shift, wheelDelta$2, mousePos$2, handled$3) {
      if (Self.FOnMouseWheel) {
         Self.FOnMouseWheel(Self,shift,wheelDelta$2,mousePos$2,handled$3);
      }
   }
   /// procedure TW3CustomControl.ReleaseCapture()
   ///  [line: 112, column: 28, file: SmartCL.MouseCapture]
   ,ReleaseCapture:function(Self) {
      --Self.FMouseCaptured;
      if (Self.FMouseCaptured==0) {
         if (Self.FHandle.releaseCapture) {
            Self.FHandle.releaseCapture();
         }
         vCaptureControl = null;
      } else if (Self.FMouseCaptured<0) {
         Self.FMouseCaptured = 0;
      }
   }
   /// procedure TW3CustomControl.SetAngle(aValue: Float)
   ///  [line: 2636, column: 28, file: SmartCL.Components]
   ,SetAngle:function(Self, aValue$22) {
      var mStyle = "";
      if (aValue$22!=Self.FAngle) {
         Self.FAngle = aValue$22;
         mStyle = "rotate("+FloatToStr$_Float_Integer_(aValue$22,2)+"deg)";
         Self.FHandle.style[w3_CSSPrefix("Transform")] = mStyle;
      }
   }
   /// procedure TW3CustomControl.SetBorderRadius(aNewRadius: Integer)
   ///  [line: 3175, column: 28, file: SmartCL.Components]
   ,SetBorderRadius:function(Self, aNewRadius) {
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle.style["borderRadius"] = TInteger.ToPxStr(aNewRadius);
      TW3TagObj.AddToComponentState(Self,[8]);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3CustomControl.SetCapture()
   ///  [line: 100, column: 28, file: SmartCL.MouseCapture]
   ,SetCapture:function(Self) {
      if (Self.FMouseCaptured==0) {
         if (Self.FHandle.setCapture) {
            Self.FHandle.setCapture(true);
         } else if (!vCaptureInitialized) {
            TW3CustomControl.InitializeCapture(Self.ClassType);
         }
         vCaptureControl = Self;
      }
      ++Self.FMouseCaptured;
   }
   /// procedure TW3CustomControl.SetEnabled(aValue: Boolean)
   ///  [line: 2481, column: 28, file: SmartCL.Components]
   ,SetEnabled:function(Self, aValue$23) {
      Self.FHandle.disabled = (!aValue$23);
      if (aValue$23) {
         if (w3_HasClass(Self.FHandle,"disabledState")) {
            w3_RemoveClass(Self.FHandle,"disabledState");
         }
      } else {
         w3_AddClass(Self.FHandle,"disabledState");
      }
   }
   /// procedure TW3CustomControl.SetFocus()
   ///  [line: 2649, column: 28, file: SmartCL.Components]
   ,SetFocus:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.focus();
      }
   }
   /// procedure TW3CustomControl.SetStyleClass(aStyle: String)
   ///  [line: 2631, column: 28, file: SmartCL.Components]
   ,SetStyleClass:function(Self, aStyle) {
      w3_setAttrib(Self.FHandle,"class",aStyle);
   }
   /// procedure TW3CustomControl.SetZoom(aValue: Float)
   ///  [line: 2456, column: 28, file: SmartCL.Components]
   ,SetZoom:function(Self, aValue$24) {
      Self.FHandle.style["zoom"] = aValue$24;
   }
   /// procedure TW3CustomControl.StyleTagObject()
   ///  [line: 2437, column: 28, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      TW3TagObj.StyleTagObject(Self);
      TW3CustomControl.SetStyleClass(Self,TObject.ClassName(Self.ClassType));
      TW3MovableControl.SetVisible(Self,true);
   }
   /// procedure TW3CustomControl._setAnimationBegins(const aValue: TAnimationBeginsEvent)
   ///  [line: 2905, column: 28, file: SmartCL.Components]
   ,_setAnimationBegins:function(Self, aValue$25) {
      if (aValue$25) {
         Self.FHandle[w3_CSSPrefix("AnimationStart")] = $Event1(Self,TW3CustomControl.CBAnimationBegins);
      } else {
         Self.FHandle[w3_CSSPrefix("AnimationStart")] = Self.FNoBehavior;
      }
      Self.FOnAnimationBegins = aValue$25;
   }
   /// procedure TW3CustomControl._setAnimationEnds(const aValue: TAnimationEndsEvent)
   ///  [line: 2920, column: 28, file: SmartCL.Components]
   ,_setAnimationEnds:function(Self, aValue$26) {
      if (aValue$26) {
         Self.FHandle[w3_CSSPrefix("AnimationEnd")] = $Event1(Self,TW3CustomControl.CBAnimationEnds);
      } else {
         Self.FHandle[w3_CSSPrefix("AnimationEnd")] = Self.FNoBehavior;
      }
      Self.FOnAnimationEnds = aValue$26;
   }
   /// procedure TW3CustomControl._setChanged(const aValue: TChangedEvent)
   ///  [line: 2935, column: 28, file: SmartCL.Components]
   ,_setChanged:function(Self, aValue$27) {
      if (aValue$27) {
         Self.FHandle["onchange"] = $Event1(Self,TW3CustomControl.CBChanged);
      } else {
         Self.FHandle["onchange"] = Self.FNoBehavior;
      }
      Self.FOnChanged = aValue$27;
   }
   /// procedure TW3CustomControl._setContextPopup(const aValue: TContextPopupEvent)
   ///  [line: 3109, column: 28, file: SmartCL.Components]
   ,_setContextPopup:function(Self, aValue$28) {
      var mObj$7 = undefined;
      mObj$7 = Self.FHandle;
      if (aValue$28) {
         mObj$7["oncontextmenu"] = $Event1(Self,TW3CustomControl.CBContextPopup);
      } else {
         mObj$7["oncontextmenu"] = Self.FNoBehavior;
      }
      Self.FOnContextPopup = aValue$28;
   }
   /// procedure TW3CustomControl._setGestureChange(aValue: TGestureChangeEvent)
   ///  [line: 3044, column: 28, file: SmartCL.Components]
   ,_setGestureChange:function(Self, aValue$29) {
      if (Self.FOnGestureChange) {
         w3_RemoveEvent(Self.FHandle,"gesturechange",$Event0(Self,TW3CustomControl.CMGestureChange),true);
         Self.FOnGestureChange = null;
      }
      if (aValue$29) {
         Self.FOnGestureChange = aValue$29;
         w3_AddEvent(Self.FHandle,"gesturechange",$Event0(Self,TW3CustomControl.CMGestureChange),true);
      }
   }
   /// procedure TW3CustomControl._setGestureEnd(aValue: TGestureEndEvent)
   ///  [line: 3072, column: 28, file: SmartCL.Components]
   ,_setGestureEnd:function(Self, aValue$30) {
      if (Self.FOnGestureEnd) {
         w3_RemoveEvent(Self.FHandle,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureEnd),true);
         Self.FOnGestureEnd = null;
      }
      if (aValue$30) {
         Self.FOnGestureEnd = aValue$30;
         w3_AddEvent(Self.FHandle,"gestureend",$Event0(Self,TW3CustomControl.CMGestureEnd),true);
      }
   }
   /// procedure TW3CustomControl._setGestureStart(aValue: TGestureStartEvent)
   ///  [line: 3016, column: 28, file: SmartCL.Components]
   ,_setGestureStart:function(Self, aValue$31) {
      if (Self.FOnGestureStart) {
         w3_RemoveEvent(Self.FHandle,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureStart),true);
         Self.FOnGestureStart = null;
      }
      if (aValue$31) {
         Self.FOnGestureStart = aValue$31;
         w3_AddEvent(Self.FHandle,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureStart),true);
      }
   }
   /// procedure TW3CustomControl._setGotFocus(const aValue: TGotFocusEvent)
   ///  [line: 2661, column: 28, file: SmartCL.Components]
   ,_setGotFocus:function(Self, aValue$32) {
      Self.FOnGotFocus = aValue$32;
   }
   /// procedure TW3CustomControl._setKeyDown(const aValue: TKeyDownEvent)
   ///  [line: 2866, column: 28, file: SmartCL.Components]
   ,_setKeyDown:function(Self, aValue$33) {
      Self.FHandle["onkeydown"] = $Event1(Self,TW3CustomControl.CBKeyDown$);
      Self.FOnKeyDown = aValue$33;
   }
   /// procedure TW3CustomControl._setKeyPress(const aValue: TKeyPressEvent)
   ///  [line: 2890, column: 28, file: SmartCL.Components]
   ,_setKeyPress:function(Self, aValue$34) {
      if (aValue$34) {
         Self.FHandle["onkeypress"] = $Event1(Self,TW3CustomControl.CBKeyPress);
      } else {
         Self.FHandle["onkeypress"] = Self.FNoBehavior;
      }
      Self.FOnKeyPress = aValue$34;
   }
   /// procedure TW3CustomControl._setKeyUp(const aValue: TKeyUpEvent)
   ///  [line: 2878, column: 28, file: SmartCL.Components]
   ,_setKeyUp:function(Self, aValue$35) {
      Self.FHandle["onkeyup"] = $Event1(Self,TW3CustomControl.CBKeyUp$);
      Self.FOnKeyUp = aValue$35;
   }
   /// procedure TW3CustomControl._setLostFocus(const aValue: TLostFocusEvent)
   ///  [line: 2670, column: 28, file: SmartCL.Components]
   ,_setLostFocus:function(Self, aValue$36) {
      Self.FOnLostFocus = aValue$36;
   }
   /// procedure TW3CustomControl._setMouseClick(const aValue: TMouseClickEvent)
   ///  [line: 2840, column: 28, file: SmartCL.Components]
   ,_setMouseClick:function(Self, aValue$37) {
      Self.FOnClick = aValue$37;
   }
   /// procedure TW3CustomControl._setMouseDblClick(const aValue: TMouseDblClickEvent)
   ///  [line: 2851, column: 28, file: SmartCL.Components]
   ,_setMouseDblClick:function(Self, aValue$38) {
      if (aValue$38) {
         Self.FHandle["ondblclick"] = $Event1(Self,TW3CustomControl.CBDblClick);
      } else {
         Self.FHandle["ondblclick"] = Self.FNoBehavior;
      }
      Self.FOnDblClick = aValue$38;
   }
   /// procedure TW3CustomControl._setMouseDown(const aValue: TMouseDownEvent)
   ///  [line: 2676, column: 28, file: SmartCL.Components]
   ,_setMouseDown:function(Self, aValue$39) {
      Self.FHandle["onmousedown"] = $Event1(Self,TW3CustomControl.CBMouseDown$);
      Self.FOnMouseDown = aValue$39;
   }
   /// procedure TW3CustomControl._setMouseEnter(const aValue: TMouseEnterEvent)
   ///  [line: 2742, column: 28, file: SmartCL.Components]
   ,_setMouseEnter:function(Self, aValue$40) {
      if (aValue$40) {
         Self.FHandle["onmouseover"] = $Event1(Self,TW3CustomControl.CBMouseEnter);
      } else {
         Self.FHandle["onmouseover"] = Self.FNoBehavior;
      }
      Self.FOnMouseEnter = aValue$40;
   }
   /// procedure TW3CustomControl._setMouseExit(const aValue: TMouseExitEvent)
   ///  [line: 2764, column: 28, file: SmartCL.Components]
   ,_setMouseExit:function(Self, aValue$41) {
      if (aValue$41) {
         Self.FHandle["onmouseout"] = $Event1(Self,TW3CustomControl.CBMouseExit);
      } else {
         Self.FHandle["onmouseout"] = Self.FNoBehavior;
      }
      Self.FOnMouseExit = aValue$41;
   }
   /// procedure TW3CustomControl._setMouseMove(const aValue: TMouseMoveEvent)
   ///  [line: 2722, column: 28, file: SmartCL.Components]
   ,_setMouseMove:function(Self, aValue$42) {
      Self.FHandle["onmousemove"] = $Event1(Self,TW3CustomControl.CBMouseMove$);
      Self.FOnMouseMove = aValue$42;
   }
   /// procedure TW3CustomControl._setMouseUp(const aValue: TMouseUpEvent)
   ///  [line: 2698, column: 28, file: SmartCL.Components]
   ,_setMouseUp:function(Self, aValue$43) {
      Self.FHandle["onmouseup"] = $Event1(Self,TW3CustomControl.CBMouseUp$);
      Self.FOnMouseUp = aValue$43;
   }
   /// procedure TW3CustomControl._setMouseWheel(const aValue: TMouseWheelEvent)
   ///  [line: 2788, column: 28, file: SmartCL.Components]
   ,_setMouseWheel:function(Self, aValue$44) {
      var onEventSupported = false;
      var mObj$8 = undefined;
      mObj$8 = Self.FHandle;
      
    onEventSupported = 'onmousewheel' in mObj$8;
  if (onEventSupported) {
         if (aValue$44) {
            mObj$8["onmousewheel"] = $Event1(Self,TW3CustomControl.CBMouseWheel);
         } else {
            mObj$8["onmousewheel"] = Self.FNoBehavior;
         }
      } else {
         if (aValue$44) {
            mObj$8.addEventListener("DOMMouseScroll",$Event1(Self,TW3CustomControl.CBMouseWheel),false);
         } else {
            mObj$8.removeEventListener("DOMMouseScroll",$Event1(Self,TW3CustomControl.CBMouseWheel),false);
         }
      }
      Self.FOnMouseWheel = aValue$44;
   }
   /// procedure TW3CustomControl._setResize(const aValue: TReSizeEvent)
   ///  [line: 3104, column: 28, file: SmartCL.Components]
   ,_setResize:function(Self, aValue$45) {
      Self.FOnResize = aValue$45;
   }
   /// procedure TW3CustomControl._setTouchBegins(const aValue: TTouchBeginEvent)
   ///  [line: 2959, column: 28, file: SmartCL.Components]
   ,_setTouchBegins:function(Self, aValue$46) {
      if (aValue$46) {
         TW3CustomControl.BindTouch(Self);
      }
      Self.FOnTouchBegins = aValue$46;
   }
   /// procedure TW3CustomControl._setTouchEnds(const aValue: TTouchEndEvent)
   ///  [line: 2997, column: 28, file: SmartCL.Components]
   ,_setTouchEnds:function(Self, aValue$47) {
      if (aValue$47) {
         TW3CustomControl.BindTouch(Self);
      }
      Self.FOnTouchEnds = aValue$47;
   }
   /// procedure TW3CustomControl._setTouchMoves(const aValue: TTouchMoveEvent)
   ///  [line: 2978, column: 28, file: SmartCL.Components]
   ,_setTouchMoves:function(Self, aValue$48) {
      if (aValue$48) {
         TW3CustomControl.BindTouch(Self);
      }
      Self.FOnTouchMoves = aValue$48;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$28$:function($){return $.ClassType.Create$28.apply($.ClassType, arguments)}
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyDown$:function($){return $.ClassType.CBKeyDown.apply($.ClassType, arguments)}
   ,CBKeyUp$:function($){return $.ClassType.CBKeyUp.apply($.ClassType, arguments)}
   ,CBMouseDown$:function($){return $.ClassType.CBMouseDown.apply($.ClassType, arguments)}
   ,CBMouseMove$:function($){return $.ClassType.CBMouseMove.apply($.ClassType, arguments)}
   ,CBMouseUp$:function($){return $.ClassType.CBMouseUp.apply($.ClassType, arguments)}
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
};
/// TW3DisplayView = class (TW3CustomControl)
///  [line: 59, column: 3, file: SmartCL.Application]
var TW3DisplayView = {
   $ClassName:"TW3DisplayView",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FArrange = false;
      $.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ArrangeChildren(aKind: TW3DisplayViewArangeType)
   ///  [line: 489, column: 26, file: SmartCL.Application]
   ,ArrangeChildren:function(Self, aKind) {
      var x$42 = 0;
      var dx$6 = 0;
      var dy$6 = 0;
      var mObj$9 = null;
      var mCount$1 = 0;
      var mRect = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var wd = 0;
      var hd = 0;
      mCount$1 = TW3Component.GetChildCount(Self);
      if (mCount$1>0) {
         mRect = TW3MovableControl.GetBoundsRect(Self);
         switch (aKind) {
            case 0 :
               wd = TRect$Width$1(mRect);
               hd = TRect$Height$1(mRect);
               var $temp8;
               for(x$42=0,$temp8=mCount$1;x$42<$temp8;x$42++) {
                  mObj$9 = TW3Component.GetChildObject(Self,x$42);
                  if ($Is(mObj$9,TW3CustomControl)&&(!$Is(mObj$9,TW3BlockBox))) {
                     TW3MovableControl.SetSize($As(mObj$9,TW3CustomControl),wd,hd);
                  }
               }
               break;
            case 1 :
               dy$6 = mRect.Top$1;
               wd = TRect$Width$1(mRect);
               var $temp9;
               for(x$42=0,$temp9=mCount$1;x$42<$temp9;x$42++) {
                  mObj$9 = TW3Component.GetChildObject(Self,x$42);
                  if ($Is(mObj$9,TW3CustomControl)&&(!$Is(mObj$9,TW3BlockBox))) {
                     hd = TW3MovableControl.GetHeight($As(mObj$9,TW3CustomControl));
                     TW3MovableControl.SetBounds$2($As(mObj$9,TW3CustomControl),mRect.Left$1,dy$6,wd,hd);
                     (dy$6+= hd);
                  }
               }
               break;
            case 2 :
               dx$6 = mRect.Left$1;
               hd = TRect$Height$1(mRect);
               var $temp10;
               for(x$42=0,$temp10=mCount$1;x$42<$temp10;x$42++) {
                  mObj$9 = TW3Component.GetChildObject(Self,x$42);
                  if ($Is(mObj$9,TW3CustomControl)&&(!$Is(mObj$9,TW3BlockBox))) {
                     wd = TW3MovableControl.GetWidth($As(mObj$9,TW3CustomControl));
                     TW3MovableControl.SetBounds$2($As(mObj$9,TW3CustomControl),dx$6,mRect.Top$1,wd,hd);
                     (dx$6+= wd);
                  }
               }
               break;
         }
      }
   }
   /// procedure TW3DisplayView.InitializeObject()
   ///  [line: 440, column: 26, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FArrange = true;
      Self.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ReSize()
   ///  [line: 575, column: 26, file: SmartCL.Application]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.FArrange) {
         TW3DisplayView.ArrangeChildren(Self,Self.FArrangeKind);
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3Display = class (TW3CustomControl)
///  [line: 75, column: 3, file: SmartCL.Application]
var TW3Display = {
   $ClassName:"TW3Display",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FFooter = $.FHeader = $.FOnOrient = $.FView = null;
   }
   /// procedure TW3Display.FinalizeObject()
   ///  [line: 594, column: 22, file: SmartCL.Application]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FView);
      if (Self.FHeader) {
         TObject.Free(Self.FHeader);
      }
      if (Self.FFooter) {
         TObject.Free(Self.FFooter);
      }
      TW3CustomControl.FinalizeObject(Self);
   }
   /// function TW3Display.GetHeightOfChildren() : Integer
   ///  [line: 615, column: 21, file: SmartCL.Application]
   ,GetHeightOfChildren:function(Self) {
      var Result = 0;
      var x$43 = 0;
      var mObj$10 = null;
      var $temp11;
      for(x$43=0,$temp11=TW3Component.GetChildCount(Self);x$43<$temp11;x$43++) {
         mObj$10 = TW3Component.GetChildObject(Self,x$43);
         if (mObj$10!==Self.FView&&$Is(mObj$10,TW3CustomControl)&&(!$Is(mObj$10,TW3BlockBox))) {
            (Result+= TW3MovableControl.GetHeight($As(mObj$10,TW3CustomControl)));
         }
      }
      return Result
   }
   /// procedure TW3Display.InitializeObject()
   ///  [line: 587, column: 22, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FView = TW3Component.Create$28$($New(TW3DisplayView),Self);
      TW3MovableControl.SetTop(Self.FView,5);
   }
   /// procedure TW3Display.PositionFormInView(aForm: TW3CustomForm)
   ///  [line: 659, column: 22, file: SmartCL.Application]
   ,PositionFormInView:function(Self, aForm$3) {
      var mApp = null;
      var dx$7 = 0;
      var dy$7 = 0;
      if (aForm$3) {
         mApp = Application();
         if ((mApp!==null)&&(!mApp.FTerminated)) {
            dx$7 = TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self.FView));
            dy$7 = TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self.FView));
            TW3MovableControl.SetBounds$2(aForm$3,dx$7,dy$7,TW3MovableControl.GetWidth(Self.FView),TW3MovableControl.GetHeight(Self.FView));
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Screen),$R[0],["PositionFormInView", TObject.ClassName(Self.ClassType), "Form parameter was NIL error"]);
      }
   }
   /// procedure TW3Display.ReSize()
   ///  [line: 628, column: 22, file: SmartCL.Application]
   ,Resize:function(Self) {
      var mTotal = 0;
      var mList = [],
         x$44 = 0;
      var dy$8 = 0;
      var mObj$11 = null;
      TW3MovableControl.Resize(Self);
      mTotal = TW3Display.GetHeightOfChildren(Self);
      TW3MovableControl.SetHeight$(Self.FView,TW3MovableControl.GetHeight(Self)-mTotal);
      mList = TW3CustomControl.GetChildrenSortedByYPos(Self);
      dy$8 = 0;
      var $temp12;
      for(x$44=0,$temp12=mList.length;x$44<$temp12;x$44++) {
         mObj$11 = $As(mList[x$44],TW3CustomControl);
         if (!$Is(mObj$11,TW3BlockBox)) {
            TW3MovableControl.SetBounds$2(mObj$11,0,dy$8,TW3MovableControl.GetWidth(Self),TW3MovableControl.GetHeight(mObj$11));
            (dy$8+= TW3MovableControl.GetHeight(mObj$11));
         } else {
            TW3MovableControl.SetBounds$2(mObj$11,0,0,TW3MovableControl.GetWidth(Self),TW3MovableControl.GetHeight(Self));
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3BlockBox = class (TW3CustomControl)
///  [line: 56, column: 3, file: SmartCL.Application]
var TW3BlockBox = {
   $ClassName:"TW3BlockBox",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TModalResult enumeration
///  [line: 100, column: 3, file: SmartCL.Application]
var TModalResult = [ "mrCancel", "mrOK" ];
/// TFormEntryEffect enumeration
///  [line: 30, column: 3, file: SmartCL.Application]
var TFormEntryEffect = [ "feNone", "feFromRight", "feToLeft" ];
/// TDisplayOrientation enumeration
///  [line: 32, column: 3, file: SmartCL.Application]
var TDisplayOrientation = [ "soPortrait", "soLandscapeLeft", "soLandscapeRight", "soFlipped", "soPortraitPrimary", "soPortraitSecondary", "soLandscapePrimary", "soLandscapeSecondary", "soLandscape", "soDefault" ];
/// TApplicationFormsList = class (TObject)
///  [line: 211, column: 3, file: SmartCL.Application]
var TApplicationFormsList = {
   $ClassName:"TApplicationFormsList",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FFormOwner = null;
      $.FList = [];
      $.FNextAutoCreate = 0;
   }
   /// procedure TApplicationFormsList.AutoCreateForm(aFormInfo: TApplicationFormInfo)
   ///  [line: 1245, column: 33, file: SmartCL.Application]
   ,AutoCreateForm:function(Self, aFormInfo) {
      if (!aFormInfo.Instance) {
         aFormInfo.Instance = TW3Component.Create$28$($NewDyn(aFormInfo.FormClass,""),Self.FFormOwner);
         TW3CustomApplication.RegisterFormInstance(Application(),aFormInfo.Instance,aFormInfo.IsMainForm);
      }
      aFormInfo.InitialAutoCreateDone = true;
   }
   /// procedure TApplicationFormsList.AutoCreateForms(owner: TW3Component)
   ///  [line: 1255, column: 33, file: SmartCL.Application]
   ,AutoCreateForms:function(Self, owner) {
      var a$52 = 0;
      var info = null;
      var a$53 = [];
      Self.FFormOwner = owner;
      Self.FNextAutoCreate = 0;
      a$53 = Self.FList;
      var $temp13;
      for(a$52=0,$temp13=a$53.length;a$52<$temp13;a$52++) {
         info = a$53[a$52];
         TApplicationFormsList.AutoCreateForm(Self,info);
         ++Self.FNextAutoCreate;
         if (info.IsMainForm) {
            break;
         }
      }
      setTimeout($Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
   }
   /// procedure TApplicationFormsList.AutoCreateNextForm()
   ///  [line: 1270, column: 33, file: SmartCL.Application]
   ,AutoCreateNextForm:function(Self) {
      var iForm = 0;
      var info$1 = null;
      var $temp14;
      for(iForm=Self.FNextAutoCreate,$temp14=Self.FList.length;iForm<$temp14;iForm++) {
         info$1 = Self.FList[iForm];
         if (info$1.IsAutoCreated&&(!(info$1.Instance!==null))&&(!info$1.InitialAutoCreateDone)) {
            TApplicationFormsList.AutoCreateForm(Self,info$1);
            ++Self.FNextAutoCreate;
            if (Self.FNextAutoCreate<(Self.FList.length-1)) {
               setTimeout($Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
            }
            break;
         }
      }
   }
   /// function TApplicationFormsList.IndexOfFormClass(aFormClass: TW3CustomFormClass) : Integer
   ///  [line: 1304, column: 32, file: SmartCL.Application]
   ,IndexOfFormClass:function(Self, aFormClass) {
      var Result = 0;
      var $temp15;
      for(Result=0,$temp15=Self.FList.length;Result<$temp15;Result++) {
         if (Self.FList[Result].FormClass==aFormClass) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// function TApplicationFormsList.IndexOfUnitName(aUnitName: String) : Integer
   ///  [line: 1312, column: 32, file: SmartCL.Application]
   ,IndexOfUnitName:function(Self, aUnitName) {
      var Result = 0;
      var $temp16;
      for(Result=0,$temp16=Self.FList.length;Result<$temp16;Result++) {
         if (SameText(Self.FList[Result].UnitName,aUnitName)) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// procedure TApplicationFormsList.RegisterAutoCreate(aUnitName: String; isAutoCreate: Boolean; isMainForm: Boolean)
   ///  [line: 1320, column: 33, file: SmartCL.Application]
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
   ///  [line: 1336, column: 33, file: SmartCL.Application]
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
   ///  [line: 1351, column: 33, file: SmartCL.Application]
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
   ///  [line: 1367, column: 33, file: SmartCL.Application]
   ,UnregisterFormInstance:function(Self, aFormInstance$1) {
      var i$1 = 0;
      var $temp17;
      for(i$1=0,$temp17=Self.FList.length;i$1<$temp17;i$1++) {
         if (Self.FList[i$1].Instance===aFormInstance$1) {
            Self.FList[i$1].Instance = null;
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TApplicationFormInfo = class (TObject)
///  [line: 201, column: 3, file: SmartCL.Application]
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
   var Result = null;
   Result = FormsFactory();
   return Result
};
/// EW3Screen = class (EW3Exception)
///  [line: 27, column: 3, file: SmartCL.Application]
var EW3Screen = {
   $ClassName:"EW3Screen",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3Application = class (EW3Exception)
///  [line: 28, column: 3, file: SmartCL.Application]
var EW3Application = {
   $ClassName:"EW3Application",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function Application() {
   var Result = null;
   Result = Instance;
   return Result
};
/// TModalInfo = class (TObject)
///  [line: 244, column: 3, file: SmartCL.Application]
var TModalInfo = {
   $ClassName:"TModalInfo",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnOK = null;
      $.OnCancel = null;
      $.ModalForm = $.ModalPanel = $.OwnerForm$1 = $.OpaqueMask = null;
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
/// TW3CustomForm = class (TW3CustomControl)
///  [line: 25, column: 3, file: SmartCL.Forms]
var TW3CustomForm = {
   $ClassName:"TW3CustomForm",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption = "";
      $.FInitialized = false;
      $.FOnActivate = null;
      $.FOnDeactivate = null;
   }
   /// constructor TW3CustomForm.Create(AOwner: TW3Component)
   ///  [line: 66, column: 27, file: SmartCL.Forms]
   ,Create$28:function(Self, AOwner$3) {
      TW3CustomControl.Create$28(Self,AOwner$3);
      TApplicationFormsList.RegisterFormInstance$1(Forms$2(),$AsClass(TObject.ClassType(Self.ClassType),TW3CustomForm),Self);
      return Self
   }
   /// destructor TW3CustomForm.Destroy()
   ///  [line: 72, column: 26, file: SmartCL.Forms]
   ,Destroy:function(Self) {
      TW3CustomApplication.UnRegisterFormInstance(Application(),Self);
      TApplicationFormsList.UnregisterFormInstance(Forms$2(),Self);
   }
   /// procedure TW3CustomForm.FormActivated()
   ///  [line: 96, column: 25, file: SmartCL.Forms]
   ,FormActivated:function(Self) {
      if (!Self.FInitialized) {
         Self.FInitialized = true;
         TW3CustomForm.InitializeForm$(Self);
         TW3CustomControl.LayoutChildren(Self);
      }
      if (Self.FOnActivate) {
         Self.FOnActivate(Self);
      }
   }
   /// procedure TW3CustomForm.FormDeactivated()
   ///  [line: 108, column: 25, file: SmartCL.Forms]
   ,FormDeactivated:function(Self) {
      if (Self.FOnDeactivate) {
         Self.FOnDeactivate(Self);
      }
   }
   /// procedure TW3CustomForm.InitializeForm()
   ///  [line: 86, column: 25, file: SmartCL.Forms]
   ,InitializeForm:function(Self) {
   }
   /// procedure TW3CustomForm.setCaption(Value: String)
   ///  [line: 91, column: 25, file: SmartCL.Forms]
   ,setCaption:function(Self, Value$3) {
      Self.FCaption = Value$3;
   }
   /// procedure TW3CustomForm.StyleTagObject()
   ///  [line: 78, column: 25, file: SmartCL.Forms]
   ,StyleTagObject:function(Self) {
      TW3CustomControl.StyleTagObject(Self);
      w3_setStyle(Self.FHandle,w3_CSSPrefix("Transform"),"none");
      TW3CustomControl.SetStyleClass(Self,"TW3CustomForm");
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$28$:function($){return $.ClassType.Create$28.apply($.ClassType, arguments)}
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
/// TW3Form = class (TW3CustomForm)
///  [line: 49, column: 3, file: SmartCL.Forms]
var TW3Form = {
   $ClassName:"TW3Form",$Parent:TW3CustomForm
   ,$Init:function ($) {
      TW3CustomForm.$Init($);
   }
   ,Destroy:TW3CustomForm.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomForm.StyleTagObject
   ,Create$28:TW3CustomForm.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
   ,InitializeForm:TW3CustomForm.InitializeForm
};
/// TW3ScrollInfo = class (TW3OwnedObject)
///  [line: 360, column: 3, file: SmartCL.Components]
var TW3ScrollInfo = {
   $ClassName:"TW3ScrollInfo",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// function TW3ScrollInfo.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 1564, column: 24, file: SmartCL.Components]
   ,AcceptParent:function(Self, aObject$1) {
      var Result = false;
      Result = (aObject$1!==null)&&$Is(aObject$1,TW3TagObj);
      return Result
   }
   /// function TW3ScrollInfo.GetScrollHeight() : Integer
   ///  [line: 1611, column: 24, file: SmartCL.Components]
   ,GetScrollHeight:function(Self) {
      var Result = 0;
      var mRef$1 = undefined;
      mRef$1 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$1) {
         Result = parseInt(mRef$1.scrollHeight,10);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollHeight",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollLeft() : Integer
   ///  [line: 1622, column: 24, file: SmartCL.Components]
   ,GetScrollLeft:function(Self) {
      var Result = 0;
      var mRef$2 = undefined;
      mRef$2 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$2) {
         Result = parseInt(mRef$2.scrollLeft,10);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollLeft",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollTop() : Integer
   ///  [line: 1633, column: 24, file: SmartCL.Components]
   ,GetScrollTop:function(Self) {
      var Result = 0;
      var mRef$3 = undefined;
      mRef$3 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$3) {
         Result = parseInt(mRef$3.scrollTop,10);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollTop",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollWidth() : Integer
   ///  [line: 1600, column: 24, file: SmartCL.Components]
   ,GetScrollWidth:function(Self) {
      var Result = 0;
      var mRef$4 = undefined;
      mRef$4 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$4) {
         Result = parseInt(mRef$4.scrollWidth,10);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollWidth",Self,"invalid owner handle error");
      }
      return Result
   }
   /// procedure TW3ScrollInfo.ScrollTo(aLeft: Integer; aTop: Integer)
   ///  [line: 1644, column: 25, file: SmartCL.Components]
   ,ScrollTo:function(Self, aLeft$4, aTop$4) {
      var mRef$5 = undefined;
      mRef$5 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$5) {
         mRef$5.scrollLeft = aLeft$4;
         mRef$5.scrollTop = aTop$4;
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.ScrollTo",Self,"invalid owner handle error");
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$11:TW3OwnedObject.Create$11
};
/// TW3GraphicControl = class (TW3CustomControl)
///  [line: 643, column: 3, file: SmartCL.Components]
var TW3GraphicControl = {
   $ClassName:"TW3GraphicControl",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCanvas = $.FContext$2 = $.FOnPaint = null;
      $.FDirty$1 = false;
   }
   /// procedure TW3GraphicControl.FinalizeObject()
   ///  [line: 1668, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FCanvas);
      TObject.Free(Self.FContext$2);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3GraphicControl.InitializeObject()
   ///  [line: 1661, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContext$2 = TW3ControlGraphicContext.Create$42($New(TW3ControlGraphicContext),Self.FHandle);
      Self.FCanvas = TW3Canvas.Create$44($New(TW3Canvas),Self.FContext$2);
   }
   /// procedure TW3GraphicControl.Invalidate()
   ///  [line: 1721, column: 29, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      if (!Self.FDirty$1) {
         Self.FDirty$1 = true;
         TW3AnimationFrame.ScheduleRefresh(Self);
      }
   }
   /// function TW3GraphicControl.MakeElementTagObj() : THandle
   ///  [line: 1701, column: 28, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = w3_createHtmlElement("canvas");
      return Result
   }
   /// procedure TW3GraphicControl.Paint()
   ///  [line: 1706, column: 29, file: SmartCL.Components]
   ,Paint:function(Self) {
      if (Self.FOnPaint) {
         Self.FOnPaint(Self,Self.FCanvas);
      }
   }
   /// procedure TW3GraphicControl.Refresh()
   ///  [line: 1729, column: 29, file: SmartCL.Components]
   ,Refresh:function(Self) {
      Self.FDirty$1 = false;
      if ((!TW3TagObj.GetUpdating(Self))&&Self.FCanvas!==null&&Self.FContext$2!==null&&TW3MovableControl.GetVisible(Self)) {
         TW3GraphicControl.Paint(Self);
      }
   }
   /// procedure TW3GraphicControl.Resize()
   ///  [line: 1712, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      w3_setAttrib(Self.FHandle,"width",w3_getStyle(Self.FHandle,"width"));
      w3_setAttrib(Self.FHandle,"height",w3_getStyle(Self.FHandle,"height"));
   }
   /// procedure TW3GraphicControl.SetHeight(aValue: Integer)
   ///  [line: 1692, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, aValue$49) {
      TW3MovableControl.SetHeight(Self,aValue$49);
      if (Self.FHandle) {
         w3_setAttrib(Self.FHandle,"height",TInteger.ToPxStr(aValue$49));
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3GraphicControl.SetHeight",Self,"invalid control handle error");
      }
   }
   /// procedure TW3GraphicControl.SetWidth(aValue: Integer)
   ///  [line: 1683, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, aValue$50) {
      TW3MovableControl.SetWidth(Self,aValue$50);
      if (Self.FHandle) {
         w3_setAttrib(Self.FHandle,"width",TInteger.ToPxStr(aValue$50));
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3GraphicControl.SetWidth",Self,"invalid control handle error");
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3ControlSizeInfo = record
///  [line: 177, column: 3, file: SmartCL.Components]
function Copy$TW3ControlSizeInfo(s,d) {
   return d;
}
function Clone$TW3ControlSizeInfo($) {
   return {

   }
}
/// TW3CustomFont = class (TObject)
///  [line: 25, column: 3, file: SmartCL.Fonts]
var TW3CustomFont = {
   $ClassName:"TW3CustomFont",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOnChange = null;
   }
   /// function TW3CustomFont.GetColor() : TColor
   ///  [line: 382, column: 24, file: SmartCL.Fonts]
   ,GetColor$1:function(Self) {
      var Result = {v:0};
      try {
         var mRef$6 = undefined;
         var mText$2 = "";
         mRef$6 = TW3CustomFont.GetHandle$4$(Self);
         if (mRef$6) {
            mText$2 = w3_getStyleAsStr(mRef$6,"color");
            Result.v = StrToColor(mText$2);
         } else {
            throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetColor", TObject.ClassName(Self.ClassType), $R[4]]);
         }
      } finally {return Result.v}
   }
   /// function TW3CustomFont.GetName() : String
   ///  [line: 324, column: 24, file: SmartCL.Fonts]
   ,GetName:function(Self) {
      var Result = "";
      var mHandle = undefined;
      mHandle = TW3CustomFont.GetHandle$4$(Self);
      if (mHandle) {
         Result = w3_getStyleAsStr(mHandle,"font-family");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetName", TObject.ClassName(Self.ClassType), $R[4]]);
      }
      return Result
   }
   /// function TW3CustomFont.GetSize() : Integer
   ///  [line: 353, column: 24, file: SmartCL.Fonts]
   ,GetSize:function(Self) {
      var Result = 0;
      var mRef$7 = undefined;
      mRef$7 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$7) {
         Result = w3_getStyleAsInt(mRef$7,"font-size");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetSize", TObject.ClassName(Self.ClassType), $R[4]]);
      }
      return Result
   }
   /// function TW3CustomFont.GetWeight() : String
   ///  [line: 414, column: 24, file: SmartCL.Fonts]
   ,GetWeight:function(Self) {
      var Result = "";
      var mRef$8 = undefined;
      mRef$8 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$8) {
         Result = w3_getStyleAsStr(mRef$8,"font-weight");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetWeight", TObject.ClassName(Self.ClassType), $R[4]]);
      }
      return Result
   }
   /// procedure TW3CustomFont.SetColor(aNewColor: TColor)
   ///  [line: 398, column: 25, file: SmartCL.Fonts]
   ,SetColor$2:function(Self, aNewColor) {
      var mRef$9 = undefined;
      mRef$9 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$9) {
         w3_setStyle(mRef$9,"color",ColorToWebStr(aNewColor,255));
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetColor", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   /// procedure TW3CustomFont.SetName(aNewName: String)
   ///  [line: 337, column: 25, file: SmartCL.Fonts]
   ,SetName$1:function(Self, aNewName) {
      var mHandle$1 = undefined;
      mHandle$1 = TW3CustomFont.GetHandle$4$(Self);
      if (mHandle$1) {
         w3_setStyle(mHandle$1,"font-family",aNewName);
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetName", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   /// procedure TW3CustomFont.SetSize(aNewSize: Integer)
   ///  [line: 366, column: 25, file: SmartCL.Fonts]
   ,SetSize$5:function(Self, aNewSize) {
      var mRef$10 = undefined;
      mRef$10 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$10) {
         w3_setStyle(mRef$10,"font-size",TInteger.ToPxStr(aNewSize));
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetSize", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   /// procedure TW3CustomFont.SetWeight(aNewWeight: String)
   ///  [line: 427, column: 25, file: SmartCL.Fonts]
   ,SetWeight:function(Self, aNewWeight) {
      var mRef$11 = undefined;
      mRef$11 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$11) {
         w3_setStyle(mRef$11,"font-weight",aNewWeight);
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetWeight", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   ,Destroy:TObject.Destroy
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
};
/// TW3ControlFont = class (TW3CustomFont)
///  [line: 316, column: 3, file: SmartCL.Components]
var TW3ControlFont = {
   $ClassName:"TW3ControlFont",$Parent:TW3CustomFont
   ,$Init:function ($) {
      TW3CustomFont.$Init($);
      $.FOwner$3 = null;
   }
   /// function TW3ControlFont.GetHandle() : THandle
   ///  [line: 1553, column: 25, file: SmartCL.Components]
   ,GetHandle$4:function(Self) {
      var Result = undefined;
      Result = Self.FOwner$3.FHandle;
      return Result
   }
   /// constructor TW3ControlFont.Create(AOwner: TW3CustomControl)
   ///  [line: 1544, column: 28, file: SmartCL.Components]
   ,Create$48:function(Self, AOwner$4) {
      TObject.Create(Self);
      if (AOwner$4) {
         Self.FOwner$3 = AOwner$4;
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ControlFont.Create",Self,"Owner was nil error");
      }
      return Self
   }
   ,Destroy:TObject.Destroy
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
};
/// TW3ControlBackground = class (TW3OwnedObject)
///  [line: 327, column: 3, file: SmartCL.Components]
var TW3ControlBackground = {
   $ClassName:"TW3ControlBackground",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FHandle$4 = undefined;
   }
   /// function TW3ControlBackground.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 978, column: 31, file: SmartCL.Components]
   ,AcceptParent:function(Self, aObject$2) {
      var Result = false;
      Result = aObject$2!==null&&$Is(aObject$2,TW3MovableControl);
      if (Result) {
         Self.FHandle$4 = $As(aObject$2,TW3MovableControl).FHandle;
      }
      return Result
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$11:TW3OwnedObject.Create$11
};
/// TW3Constraints = class (TW3OwnedObject)
///  [line: 340, column: 3, file: SmartCL.Components]
var TW3Constraints = {
   $ClassName:"TW3Constraints",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// function TW3Constraints.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 897, column: 26, file: SmartCL.Components]
   ,AcceptParent:function(Self, aObject$3) {
      var Result = false;
      Result = (aObject$3!==null)&&$Is(aObject$3,TW3TagObj);
      return Result
   }
   /// function TW3Constraints.GetMaxHeight() : Integer
   ///  [line: 947, column: 26, file: SmartCL.Components]
   ,GetMaxHeight:function(Self) {
      var Result = 0;
      var mRef$12 = undefined;
      mRef$12 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$12) {
         Result = w3_getStyleAsInt(mRef$12,"max-height");
      }
      return Result
   }
   /// function TW3Constraints.GetMaxWidth() : Integer
   ///  [line: 938, column: 26, file: SmartCL.Components]
   ,GetMaxWidth:function(Self) {
      var Result = 0;
      var mRef$13 = undefined;
      mRef$13 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$13) {
         Result = w3_getStyleAsInt(mRef$13,"max-width");
      }
      return Result
   }
   /// function TW3Constraints.GetMinHeight() : Integer
   ///  [line: 911, column: 26, file: SmartCL.Components]
   ,GetMinHeight:function(Self) {
      var Result = 0;
      var mRef$14 = undefined;
      mRef$14 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$14) {
         Result = w3_getStyleAsInt(mRef$14,"min-height");
      }
      return Result
   }
   /// function TW3Constraints.GetMinWidth() : Integer
   ///  [line: 902, column: 26, file: SmartCL.Components]
   ,GetMinWidth:function(Self) {
      var Result = 0;
      var mRef$15 = undefined;
      mRef$15 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$15) {
         Result = w3_getStyleAsInt(mRef$15,"min-width");
      }
      return Result
   }
   /// procedure TW3Constraints.SetMaxHeight(aValue: Integer)
   ///  [line: 965, column: 26, file: SmartCL.Components]
   ,SetMaxHeight:function(Self, aValue$51) {
      var mRef$16 = undefined;
      mRef$16 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$16) {
         mRef$16.style["max-height"] = TInteger.ToPxStr(aValue$51);
      }
   }
   /// procedure TW3Constraints.SetMaxWidth(aValue: Integer)
   ///  [line: 956, column: 26, file: SmartCL.Components]
   ,SetMaxWidth:function(Self, aValue$52) {
      var mRef$17 = undefined;
      mRef$17 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$17) {
         mRef$17.style["max-width"] = TInteger.ToPxStr(aValue$52);
      }
   }
   /// procedure TW3Constraints.SetMinHeight(aValue: Integer)
   ///  [line: 929, column: 26, file: SmartCL.Components]
   ,SetMinHeight:function(Self, aValue$53) {
      var mRef$18 = undefined;
      mRef$18 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$18) {
         mRef$18.style["min-height"] = TInteger.ToPxStr(aValue$53);
      }
   }
   /// procedure TW3Constraints.SetMinWidth(aValue: Integer)
   ///  [line: 920, column: 26, file: SmartCL.Components]
   ,SetMinWidth:function(Self, aValue$54) {
      var mRef$19 = undefined;
      mRef$19 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$19) {
         mRef$19.style["min-width"] = TInteger.ToPxStr(aValue$54);
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$11:TW3OwnedObject.Create$11
};
/// TW3AttrAccess = class (TObject)
///  [line: 121, column: 3, file: SmartCL.Components]
var TW3AttrAccess = {
   $ClassName:"TW3AttrAccess",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$5 = undefined;
   }
   /// function TW3AttrAccess.Exists(aName: String) : Boolean
   ///  [line: 740, column: 24, file: SmartCL.Components]
   ,Exists:function(Self, aName) {
      var Result = false;
      var mName = "";
      mName = ("data-"+aName).toLowerCase();
      Result = (Self.FHandle$5.hasAttribute(mName)?true:false);
      return Result
   }
   /// function TW3AttrAccess.Read(aName: String) : Variant
   ///  [line: 748, column: 24, file: SmartCL.Components]
   ,Read:function(Self, aName$1) {
      var Result = undefined;
      var mName$1 = "";
      mName$1 = ("data-"+aName$1).toLowerCase();
      try {
         if (Self.FHandle$5.hasAttribute(mName$1)) {
            Result = Self.FHandle$5.getAttribute(mName$1);
         } else {
            Result = null;
         }
      } catch ($e) {
         var e$6 = $W($e);
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[13],[e$6.FMessage]);
      }
      return Result
   }
   /// procedure TW3AttrAccess.Write(aName: String; const aValue: Variant)
   ///  [line: 764, column: 25, file: SmartCL.Components]
   ,Write:function(Self, aName$2, aValue$55) {
      var mName$2 = "";
      mName$2 = ("data-"+aName$2).toLowerCase();
      try {
         Self.FHandle$5.setAttribute(mName$2,aValue$55);
      } catch ($e) {
         var e$7 = $W($e);
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[14],[e$7.FMessage]);
      }
   }
   /// constructor TW3AttrAccess.Create(const aHandle: THandle)
   ///  [line: 731, column: 27, file: SmartCL.Components]
   ,Create$49:function(Self, aHandle) {
      TObject.Create(Self);
      if (TControlHandleHelper$Valid(aHandle)) {
         Self.FHandle$5 = aHandle;
      } else {
         throw Exception.Create($New(Exception),$R[12]);
      }
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3AnimationFrame = class (TObject)
///  [line: 676, column: 3, file: SmartCL.Components]
var TW3AnimationFrame = {
   $ClassName:"TW3AnimationFrame",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3AnimationFrame.Perform()
   ///  [line: 871, column: 35, file: SmartCL.Components]
   ,Perform:function() {
      var i$2 = 0;
      var callbacks = [],
         controls = [];
      if (vScheduledCallbacks.length>0) {
         callbacks = vScheduledCallbacks;
         vScheduledCallbacks = [];
         var $temp18;
         for(i$2=0,$temp18=callbacks.length;i$2<$temp18;i$2++) {
            callbacks[i$2]();
         }
      }
      if (vScheduledControls.length>0) {
         controls = vScheduledControls;
         vScheduledControls = [];
         var $temp19;
         for(i$2=0,$temp19=controls.length;i$2<$temp19;i$2++) {
            TW3GraphicControl.Refresh(controls[i$2]);
         }
      }
      var $temp20;
      for(i$2=0,$temp20=vOnPerform.length;i$2<$temp20;i$2++) {
         vOnPerform[i$2]();
      }
   }
   /// procedure TW3AnimationFrame.ScheduleRefresh(control: TW3GraphicControl)
   ///  [line: 857, column: 35, file: SmartCL.Components]
   ,ScheduleRefresh:function(control$1) {
      vScheduledControls.push(control$1);
      if (!vPending) {
         w3_RequestAnimationFrame(TW3AnimationFrame.Perform);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TShiftStateEnum enumeration
///  [line: 41, column: 3, file: SmartCL.Components]
var TShiftStateEnum = [ "ssShift", "ssAlt", "ssCtrl", "ssMeta", "ssLeft", "ssRight", "ssMiddle" ];
/// TShiftState = class (TObject)
///  [line: 77, column: 3, file: SmartCL.Components]
var TShiftState = {
   $ClassName:"TShiftState",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEvent = $.FMouseEvent = null;
      $.FMouseButtons = 0;
   }
   /// function TShiftState.CheckShiftStateEnum(value: TShiftStateEnum) : Boolean
   ///  [line: 804, column: 22, file: SmartCL.Components]
   ,CheckShiftStateEnum:function(Self, value$6) {
      var Result = false;
      if (Self.FEvent===null) {
         Result = false;
      } else {
         switch (value$6) {
            case 0 :
               Result = Self.FEvent.shiftKey;
               break;
            case 1 :
               Result = Self.FEvent.altKey;
               break;
            case 2 :
               Result = Self.FEvent.ctrlKey;
               break;
            case 3 :
               Result = Self.FEvent.metaKey;
               break;
            case 4 :
               Result = (Self.FMouseButtons&1)!=0;
               break;
            case 5 :
               Result = (Self.FMouseButtons&4)!=0;
               break;
            case 6 :
               Result = (Self.FMouseButtons&2)!=0;
               break;
         }
      }
      return Result
   }
   /// function TShiftState.Current() : TShiftState
   ///  [line: 832, column: 28, file: SmartCL.Components]
   ,Current:function() {
      var Result = null;
      if (vCurrent===null) {
         vCurrent = TObject.Create($New(TShiftState));
      }
      Result = vCurrent;
      return Result
   }
   /// procedure TShiftState.SetMouseEvent(evt: JMouseEvent)
   ///  [line: 826, column: 23, file: SmartCL.Components]
   ,SetMouseEvent:function(Self, evt$8) {
      Self.FEvent = evt$8;
      Self.FMouseEvent = evt$8;
   }
   ,Destroy:TObject.Destroy
};
/// TMouseButton enumeration
///  [line: 39, column: 3, file: SmartCL.Components]
var TMouseButton = [ "mbLeft", "mbMiddle", "mbRight" ];
/// TCustomAppContainer = class (TW3Component)
///  [line: 281, column: 3, file: SmartCL.Components]
var TCustomAppContainer = {
   $ClassName:"TCustomAppContainer",$Parent:TW3Component
   ,$Init:function ($) {
      TW3Component.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,FinalizeObject:TW3Component.FinalizeObject
   ,InitializeObject:TW3Component.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3Component.Showing
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$28:TW3Component.Create$28
};
/// TDocumentBody = class (TCustomAppContainer)
///  [line: 289, column: 3, file: SmartCL.Components]
var TDocumentBody = {
   $ClassName:"TDocumentBody",$Parent:TCustomAppContainer
   ,$Init:function ($) {
      TCustomAppContainer.$Init($);
   }
   /// function TDocumentBody.GetHeight() : Integer
   ///  [line: 1534, column: 24, file: SmartCL.Components]
   ,GetHeight$5:function(Self) {
      var Result = 0;
      Result = parseInt(window.innerHeight,10);
      return Result
   }
   /// function TDocumentBody.GetWidth() : Integer
   ///  [line: 1529, column: 24, file: SmartCL.Components]
   ,GetWidth$5:function(Self) {
      var Result = 0;
      Result = parseInt(window.innerWidth,10);
      return Result
   }
   /// function TDocumentBody.makeElementTagId() : String
   ///  [line: 1470, column: 24, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      var Result = "";
      Result = "";
      return Result
   }
   /// function TDocumentBody.makeElementTagObj() : THandle
   ///  [line: 1494, column: 24, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = document.body;
      return Result
   }
   /// procedure TDocumentBody.StyleTagObject()
   ///  [line: 1465, column: 25, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,FinalizeObject:TW3Component.FinalizeObject
   ,InitializeObject:TW3Component.InitializeObject
   ,MakeElementTagId$:function($){return $.ClassType.MakeElementTagId($)}
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3Component.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$28:TW3Component.Create$28
};
/// EW3TagObj = class (EW3Exception)
///  [line: 31, column: 3, file: SmartCL.Components]
var EW3TagObj = {
   $ClassName:"EW3TagObj",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   /// procedure EW3TagObj.RaiseCntErrMethod(methName: String; instance: TObject; msg: String)
   ///  [line: 794, column: 27, file: SmartCL.Components]
   ,RaiseCntErrMethod:function(methName, instance, msg) {
      throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],[methName, (instance!==null)?TObject.ClassName(instance.ClassType):"nil", msg]);
   }
   ,Destroy:Exception.Destroy
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
      if (aColorStr.v.length==0) {
         return Result.v;
      }
      if ((aColorStr.v).toLocaleLowerCase()=="transparent") {
         Result.v = 536870911;
         return Result.v;
      }
      if (aColorStr.v.charAt(0)=="#"||aColorStr.v.charAt(0)=="$") {
         Result.v = parseInt("0x"+Trim$_String_Integer_Integer_(aColorStr.v,1,0),16);
      } else {
         if ((aColorStr.v).substr(0,2)=="0x") {
            Result.v = parseInt(aColorStr.v,16);
         } else if (((aColorStr.v).substr(0,4)).toLowerCase()=="rgb(") {
            aColorStr.v = Trim$_String_Integer_Integer_(aColorStr.v,4,0);
            try {
               xpos = (aColorStr.v.indexOf(",")+1);
               if (xpos>1) {
                  mTemp = aColorStr.v.substr(0,(xpos-1));
                  Delete(aColorStr,1,xpos);
                  if (mTemp.charAt(0)=="$") {
                     mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
                  }
                  r$2 = parseInt(mTemp,10);
               }
               xpos = (aColorStr.v.indexOf(",")+1);
               if (xpos>1) {
                  mTemp = aColorStr.v.substr(0,(xpos-1));
                  Delete(aColorStr,1,xpos);
                  if (mTemp.charAt(0)=="$") {
                     mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
                  }
                  g = parseInt(mTemp,10);
               }
               xpos = (aColorStr.v.indexOf(")")+1);
               if (xpos>1) {
                  mTemp = aColorStr.v.substr(0,(xpos-1));
                  if (mTemp.charAt(0)=="$") {
                     mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
                  }
                  b$1 = parseInt(mTemp,10);
               }
               Result.v = RGBToColor(r$2,g,b$1);
            } catch ($e) {
               var e$8 = $W($e);
               return Result.v;
            }
         }
      }
   } finally {return Result.v}
};
function RGBToColor(aRed, aGreen, aBlue) {
   var Result = 0;
   Result = (aBlue|(aGreen<<8))|(aRed<<16);
   return Result
};
function ColorToWebStr(aColor, alpha) {
   var Result = "";
   Result = ColorToWebStr$1((aColor>>>16)&255,(aColor>>>8)&255,aColor&255,alpha);
   return Result
};
function ColorToWebStr$1(r$3, g$1, b$18, a$54) {
   var Result = "";
   Result = (a$54==255)?"#"+IntToHex2(r$3)+IntToHex2(g$1)+IntToHex2(b$18):"rgba("+r$3.toString()+","+g$1.toString()+","+b$18.toString()+","+FloatToStr$_Float_(a$54/255)+")";
   return Result
};
function W3FontDetector() {
   var Result = null;
   if (_FontDetect===null) {
      _FontDetect = TW3FontDetector.Create$52($New(TW3FontDetector));
   }
   Result = _FontDetect;
   return Result
};
/// TW3TextMetric = record
///  [line: 54, column: 3, file: SmartCL.Fonts]
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
/// TW3FontInfo = record
///  [line: 64, column: 3, file: SmartCL.Fonts]
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
///  [line: 77, column: 3, file: SmartCL.Fonts]
var TW3FontDetector = {
   $ClassName:"TW3FontDetector",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBaseFonts = [];
      $.FdefaultHeight = $.FdefaultWidth = undefined;
      $.Fh = undefined;
      $.Fs = undefined;
      $.FtestSize = "72px";
      $.FtestString = "mmmmmmmmmmlli";
   }
   /// constructor TW3FontDetector.Create()
   ///  [line: 150, column: 29, file: SmartCL.Fonts]
   ,Create$52:function(Self) {
      var x$45 = 0;
      TObject.Create(Self);
      Self.FBaseFonts.push("monospace");
      Self.FBaseFonts.push("sans-serif");
      Self.FBaseFonts.push("serif");
      Self.Fh = document.body;
      Self.Fs = document.createElement("span");
      Self.Fs.style.fontSize = Self.FtestSize;
      Self.Fs.innerHTML = Self.FtestString;
      Self.FdefaultWidth = TVariant.CreateObject();
      Self.FdefaultHeight = TVariant.CreateObject();
      if (Self.FBaseFonts.length>0) {
         var $temp21;
         for(x$45=0,$temp21=Self.FBaseFonts.length;x$45<$temp21;x$45++) {
            Self.Fs.style.fontFamily = Self.FBaseFonts[x$45];
            Self.Fh.appendChild(Self.Fs);
            Self.FdefaultWidth[Self.FBaseFonts[x$45]] = Self.Fs.offsetWidth;
            Self.FdefaultHeight[Self.FBaseFonts[x$45]] = Self.Fs.offsetHeight;
            Self.Fh.removeChild(Self.Fs);
         }
      }
      return Self
   }
   /// function TW3FontDetector.Detect(aFont: String) : Boolean
   ///  [line: 212, column: 26, file: SmartCL.Fonts]
   ,Detect:function(Self, aFont) {
      var Result = false;
      var x$46 = 0;
      aFont = Trim$_String_(aFont);
      if (aFont.length>0) {
         if (Self.FBaseFonts.length>0) {
            var $temp22;
            for(x$46=0,$temp22=Self.FBaseFonts.length;x$46<$temp22;x$46++) {
               Self.Fs.style.fontFamily = (aFont+","+Self.FBaseFonts[x$46]);
               Self.Fh.appendChild(Self.Fs);
               Result = Self.Fs.offsetWidth!=Self.FdefaultWidth[Self.FBaseFonts[x$46]]&&Self.Fs.offsetHeight!=Self.FdefaultHeight[Self.FBaseFonts[x$46]];
               Self.Fh.removeChild(Self.Fs);
               if (Result) {
                  break;
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.getFontInfo(const aHandle: THandle) : TW3FontInfo
   ///  [line: 178, column: 26, file: SmartCL.Fonts]
   ,getFontInfo$2:function(Self, aHandle$1) {
      var Result = {fiName:"",fiSize:0};
      var mName$3 = "";
      var mSize = 0;
      var mData$6 = [],
         x$47 = 0;
      Result.fiSize = -1;
      if (TControlHandleHelper$Valid(aHandle$1)) {
         mName$3 = w3_getStyleAsStr(aHandle$1,"font-family");
         mSize = w3_getStyleAsInt(aHandle$1,"font-size");
         if (mName$3.length>0) {
            
        mData$6 = (mName$3).split(",");
      if (mData$6.length>0) {
               var $temp23;
               for(x$47=0,$temp23=mData$6.length;x$47<$temp23;x$47++) {
                  if (TW3FontDetector.Detect(Self,mData$6[x$47])) {
                     Result.fiName = mData$6[x$47];
                     Result.fiSize = mSize;
                     break;
                  }
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontName: String; aFontSize: Integer; aFixedWidth: Integer; aContent: String) : TW3TextMetric
   ///  [line: 278, column: 26, file: SmartCL.Fonts]
   ,MeasureText$5:function(Self, aFontName, aFontSize, aFixedWidth, aContent) {
      var Result = {tmWidth:0,tmHeight:0};
      var mElement = undefined;
      if (TW3FontDetector.Detect(Self,aFontName)) {
         aContent = Trim$_String_(aContent);
         if (aContent.length>0) {
            mElement = document.createElement("p");
            if (mElement) {
               mElement.style["font-family"] = aFontName;
               mElement.style["font-size"] = TInteger.ToPxStr(aFontSize);
               mElement.style["overflow"] = "scroll";
               mElement.style.maxWidth = TInteger.ToPxStr(aFixedWidth);
               mElement.style.width = TInteger.ToPxStr(aFixedWidth);
               mElement.innerHTML = aContent;
               Self.Fh.appendChild(mElement);
               Result.tmWidth = parseInt(mElement.scrollWidth,10);
               Result.tmHeight = parseInt(mElement.scrollHeight,10);
               Self.Fh.removeChild(mElement);
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontName: String; aFontSize: Integer; aContent: String) : TW3TextMetric
   ///  [line: 246, column: 26, file: SmartCL.Fonts]
   ,MeasureText$4:function(Self, aFontName$1, aFontSize$1, aContent$1) {
      var Result = {tmWidth:0,tmHeight:0};
      var mElement$1 = undefined;
      if (TW3FontDetector.Detect(Self,aFontName$1)) {
         aContent$1 = Trim$_String_(aContent$1);
         if (aContent$1.length>0) {
            mElement$1 = document.createElement("p");
            if (mElement$1) {
               mElement$1.style["font-family"] = aFontName$1;
               mElement$1.style["font-size"] = TInteger.ToPxStr(aFontSize$1);
               mElement$1.style["overflow"] = "scroll";
               mElement$1.style["display"] = "inline-block";
               mElement$1.style["white-space"] = "nowrap";
               mElement$1.innerHTML = StrReplace(aContent$1," ","_");
               Self.Fh.appendChild(mElement$1);
               Result.tmWidth = parseInt(mElement$1.scrollWidth,10);
               Result.tmHeight = parseInt(mElement$1.scrollHeight,10);
               Self.Fh.removeChild(mElement$1);
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontInfo: TW3FontInfo; aFixedWidth: Integer; aContent: String) : TW3TextMetric
   ///  [line: 233, column: 26, file: SmartCL.Fonts]
   ,MeasureText$3:function(Self, aFontInfo, aFixedWidth$1, aContent$2) {
      var Result = {tmWidth:0,tmHeight:0};
      Result = TW3FontDetector.MeasureText$5(Self,aFontInfo.fiName,aFontInfo.fiSize,aFixedWidth$1,aContent$2);
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontInfo: TW3FontInfo; aContent: String) : TW3TextMetric
   ///  [line: 240, column: 26, file: SmartCL.Fonts]
   ,MeasureText$2:function(Self, aFontInfo$1, aContent$3) {
      var Result = {tmWidth:0,tmHeight:0};
      Result = TW3FontDetector.MeasureText$4(Self,aFontInfo$1.fiName,aFontInfo$1.fiSize,aContent$3);
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// EW3FontError = class (EW3Exception)
///  [line: 22, column: 3, file: SmartCL.Fonts]
var EW3FontError = {
   $ClassName:"EW3FontError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3TextMetrics = record
///  [line: 115, column: 3, file: SmartCL.Graphics]
function Copy$TW3TextMetrics(s,d) {
   return d;
}
function Clone$TW3TextMetrics($) {
   return {

   }
}
/// TW3ImageData = class (TObject)
///  [line: 140, column: 3, file: SmartCL.Graphics]
var TW3ImageData = {
   $ClassName:"TW3ImageData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomGraphicContext = class (TObject)
///  [line: 28, column: 3, file: SmartCL.Graphics]
var TW3CustomGraphicContext = {
   $ClassName:"TW3CustomGraphicContext",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$1$:function($){return $.ClassType.SetSize$1.apply($.ClassType, arguments)}
};
/// TW3ControlGraphicContext = class (TW3CustomGraphicContext)
///  [line: 54, column: 3, file: SmartCL.Graphics]
var TW3ControlGraphicContext = {
   $ClassName:"TW3ControlGraphicContext",$Parent:TW3CustomGraphicContext
   ,$Init:function ($) {
      TW3CustomGraphicContext.$Init($);
      $.FCtrlTag = undefined;
   }
   /// constructor TW3ControlGraphicContext.Create(const aControlHandle: THandle)
   ///  [line: 724, column: 38, file: SmartCL.Graphics]
   ,Create$42:function(Self, aControlHandle) {
      TObject.Create(Self);
      if (aControlHandle) {
         Self.FCtrlTag = aControlHandle;
      } else {
         throw Exception.Create($New(Exception),"Control handle is invalid error");
      }
      return Self
   }
   /// function TW3ControlGraphicContext.GetDC() : THandle
   ///  [line: 733, column: 35, file: SmartCL.Graphics]
   ,GetDC:function(Self) {
      var Result = undefined;
      Result = Self.FCtrlTag.getContext("2d");
      return Result
   }
   /// function TW3ControlGraphicContext.GetHandle() : THandle
   ///  [line: 738, column: 35, file: SmartCL.Graphics]
   ,GetHandle:function(Self) {
      var Result = undefined;
      Result = Self.FCtrlTag;
      return Result
   }
   /// function TW3ControlGraphicContext.GetHeight() : Integer
   ///  [line: 748, column: 35, file: SmartCL.Graphics]
   ,GetHeight$1:function(Self) {
      var Result = 0;
      Result = w3_getPropertyAsInt(Self.FCtrlTag,"height");
      return Result
   }
   /// function TW3ControlGraphicContext.GetOwnsReference() : Boolean
   ///  [line: 753, column: 35, file: SmartCL.Graphics]
   ,GetOwnsReference:function(Self) {
      var Result = false;
      Result = false;
      return Result
   }
   /// function TW3ControlGraphicContext.GetWidth() : Integer
   ///  [line: 743, column: 35, file: SmartCL.Graphics]
   ,GetWidth$1:function(Self) {
      var Result = 0;
      Result = w3_getPropertyAsInt(Self.FCtrlTag,"width");
      return Result
   }
   /// procedure TW3ControlGraphicContext.ReleaseDC()
   ///  [line: 763, column: 36, file: SmartCL.Graphics]
   ,ReleaseDC:function(Self) {
   }
   /// procedure TW3ControlGraphicContext.SetSize(aNewWidth: Integer; aNewHeight: Integer)
   ///  [line: 758, column: 36, file: SmartCL.Graphics]
   ,SetSize$1:function(Self, aNewWidth, aNewHeight) {
   }
   ,Destroy:TObject.Destroy
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$1$:function($){return $.ClassType.SetSize$1.apply($.ClassType, arguments)}
};
/// TW3CanvasPattern = class (TObject)
///  [line: 133, column: 3, file: SmartCL.Graphics]
var TW3CanvasPattern = {
   $ClassName:"TW3CanvasPattern",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TW3CanvasGradient = class (TObject)
///  [line: 119, column: 3, file: SmartCL.Graphics]
var TW3CanvasGradient = {
   $ClassName:"TW3CanvasGradient",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$3 = undefined;
   }
   /// constructor TW3CanvasGradient.Create(const aHandle: THandle)
   ///  [line: 601, column: 31, file: SmartCL.Graphics]
   ,Create$43:function(Self, aHandle$2) {
      TObject.Create(Self);
      Self.FHandle$3 = aHandle$2;
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3Canvas = class (TObject)
///  [line: 179, column: 3, file: SmartCL.Graphics]
var TW3Canvas = {
   $ClassName:"TW3Canvas",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FContext = $.FDC = null;
   }
   /// constructor TW3Canvas.Create(Context: TW3CustomGraphicContext)
   ///  [line: 894, column: 23, file: SmartCL.Graphics]
   ,Create$44:function(Self, Context$2) {
      TObject.Create(Self);
      Self.FContext = Context$2;
      if (!Self.FContext) {
         throw Exception.Create($New(Exception),"Invalid canvas context error");
      } else {
         Self.FDC = TW3CustomGraphicContext.GetDC$(Self.FContext);
      }
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// JMouseButton enumeration
///  [line: 156, column: 3, file: W3C.DOM]
var JMouseButton = [ "Left", "Middle", "Right" ];
/// TW3CSSClassStyleNames = class (TW3OwnedObject)
///  [line: 24, column: 3, file: SmartCL.CssNames]
var TW3CSSClassStyleNames = {
   $ClassName:"TW3CSSClassStyleNames",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FCache = [];
      $.FToken = "";
   }
   /// function TW3CSSClassStyleNames.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 73, column: 32, file: SmartCL.CssNames]
   ,AcceptParent:function(Self, aObject$4) {
      var Result = false;
      Result = (aObject$4!==null)&&$Is(aObject$4,TW3CustomControl);
      return Result
   }
   /// constructor TW3CSSClassStyleNames.Create(AOwner: TObject)
   ///  [line: 60, column: 35, file: SmartCL.CssNames]
   ,Create$11:function(Self, AOwner$5) {
      TW3OwnedObject.Create$11(Self,AOwner$5);
      Self.FToken = "class";
      Self.FCache = [];
      return Self
   }
   /// destructor TW3CSSClassStyleNames.Destroy()
   ///  [line: 67, column: 34, file: SmartCL.CssNames]
   ,Destroy:function(Self) {
      Self.FCache.length=0;
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
/// TW3TouchList = class (TObject)
///  [line: 58, column: 3, file: SmartCL.Touch]
var TW3TouchList = {
   $ClassName:"TW3TouchList",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FObjects = [];
   }
   /// procedure TW3TouchList.Clear()
   ///  [line: 131, column: 24, file: SmartCL.Touch]
   ,Clear$3:function(Self) {
      Self.FObjects.length=0;
   }
   /// procedure TW3TouchList.Update(refObj: JTouchList)
   ///  [line: 141, column: 24, file: SmartCL.Touch]
   ,Update:function(Self, refObj) {
      var mCount$2 = 0;
      var x$48 = 0;
      var mObj$12 = null;
      mCount$2 = refObj.length;
      if (mCount$2==Self.FObjects.length) {
         var $temp24;
         for(x$48=0,$temp24=mCount$2;x$48<$temp24;x$48++) {
            TW3Touch.Consume$1(Self.FObjects[x$48],refObj[x$48]);
         }
      } else {
         TW3TouchList.Clear$3(Self);
         var $temp25;
         for(x$48=0,$temp25=mCount$2;x$48<$temp25;x$48++) {
            mObj$12 = TObject.Create($New(TW3Touch));
            TW3Touch.Consume$1(mObj$12,refObj[x$48]);
            Self.FObjects.push(mObj$12);
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3TouchData = class (TObject)
///  [line: 70, column: 3, file: SmartCL.Touch]
var TW3TouchData = {
   $ClassName:"TW3TouchData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FChanged = $.FTouches = null;
   }
   /// procedure TW3TouchData.Update(eventObj: JTouchEvent)
   ///  [line: 172, column: 24, file: SmartCL.Touch]
   ,Update$1:function(Self, eventObj$17) {
      if (Self.FTouches) {
         TW3TouchList.Update(Self.FTouches,eventObj$17.touches);
      }
      if (Self.FChanged) {
         TW3TouchList.Update(Self.FChanged,eventObj$17.changedTouches);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3Touch = class (TObject)
///  [line: 34, column: 3, file: SmartCL.Touch]
var TW3Touch = {
   $ClassName:"TW3Touch",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FClientX = $.FClientY = $.FPageX = $.FPageY = $.FScreenX = $.FScreenY = 0;
      $.FIdent = undefined;
      $.FTarget = null;
   }
   /// procedure TW3Touch.Consume(touch: JTouch)
   ///  [line: 104, column: 20, file: SmartCL.Touch]
   ,Consume$1:function(Self, touch) {
      Self.FScreenX = touch.screenX;
      Self.FScreenY = touch.screenY;
      Self.FClientX = touch.clientX;
      Self.FClientY = touch.clientY;
      Self.FPageX = touch.pageX;
      Self.FPageY = touch.pageY;
      Self.FIdent = touch.identifier;
      Self.FTarget = TVariant.AsObject(touch.target);
   }
   ,Destroy:TObject.Destroy
};
/// TW3GestureData = class (TObject)
///  [line: 83, column: 3, file: SmartCL.Touch]
var TW3GestureData = {
   $ClassName:"TW3GestureData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FRotation = $.FScale = 0;
   }
   /// procedure TW3GestureData.Consume(refObj: THandle)
   ///  [line: 206, column: 26, file: SmartCL.Touch]
   ,Consume$2:function(Self, refObj$1) {
      Self.FRotation = Number(refObj$1.rotation);
      Self.FScale = Number(refObj$1.scale);
   }
   /// procedure TW3GestureData.Update()
   ///  [line: 213, column: 26, file: SmartCL.Touch]
   ,Update$2:function(Self) {
      TW3GestureData.Consume$2(Self,event);
   }
   ,Destroy:TObject.Destroy
};
/// TW3Borders = class (TW3OwnedObject)
///  [line: 56, column: 3, file: SmartCL.Borders]
var TW3Borders = {
   $ClassName:"TW3Borders",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FBottom = $.FLeft = $.FRight = $.FTop = null;
   }
   /// function TW3Borders.AcceptParent(AObject: TObject) : Boolean
   ///  [line: 348, column: 21, file: SmartCL.Borders]
   ,AcceptParent:function(Self, AObject) {
      var Result = false;
      Result = $Is(AObject,TW3TagObj);
      return Result
   }
   /// constructor TW3Borders.Create(AOwner: TObject)
   ///  [line: 301, column: 24, file: SmartCL.Borders]
   ,Create$11:function(Self, AOwner$6) {
      TW3OwnedObject.Create$11(Self,AOwner$6);
      Self.FLeft = TW3Border.Create$55($New(TW3Border),Self,0);
      Self.FTop = TW3Border.Create$55($New(TW3Border),Self,1);
      Self.FRight = TW3Border.Create$55($New(TW3Border),Self,2);
      Self.FBottom = TW3Border.Create$55($New(TW3Border),Self,3);
      return Self
   }
   /// destructor TW3Borders.Destroy()
   ///  [line: 310, column: 23, file: SmartCL.Borders]
   ,Destroy:function(Self) {
      TObject.Free(Self.FLeft);
      TObject.Free(Self.FTop);
      TObject.Free(Self.FRight);
      TObject.Free(Self.FBottom);
      TObject.Destroy(Self);
   }
   /// function TW3Borders.GetHSpace() : Integer
   ///  [line: 343, column: 21, file: SmartCL.Borders]
   ,GetHSpace:function(Self) {
      var Result = 0;
      Result = TW3Border.GetWidth$6(Self.FLeft)+TW3Border.GetPadding(Self.FLeft)+TW3Border.GetWidth$6(Self.FRight)+TW3Border.GetPadding(Self.FRight);
      return Result
   }
   /// function TW3Borders.GetVSpace() : Integer
   ///  [line: 338, column: 21, file: SmartCL.Borders]
   ,GetVSpace:function(Self) {
      var Result = 0;
      Result = TW3Border.GetWidth$6(Self.FTop)+TW3Border.GetPadding(Self.FTop)+TW3Border.GetWidth$6(Self.FBottom)+TW3Border.GetPadding(Self.FBottom);
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
/// TW3BorderEdgeStyle enumeration
///  [line: 23, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeStyle = [ "besNone", "besSolid", "besDotted", "besDouble", "besGroove", "besInset", "besOutset" ];
/// TW3BorderEdge enumeration
///  [line: 22, column: 3, file: SmartCL.Borders]
var TW3BorderEdge = [ "beLeft", "beTop", "beRight", "beBottom" ];
/// TW3Border = class (TObject)
///  [line: 28, column: 3, file: SmartCL.Borders]
var TW3Border = {
   $ClassName:"TW3Border",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEdge = 0;
      $.FEdgeName = "";
      $.FOwner$4 = null;
   }
   /// constructor TW3Border.Create(AOwner: TW3Borders; AEdge: TW3BorderEdge)
   ///  [line: 94, column: 23, file: SmartCL.Borders]
   ,Create$55:function(Self, AOwner$7, AEdge) {
      TObject.Create(Self);
      Self.FOwner$4 = AOwner$7;
      Self.FEdge = Self.FEdge;
      switch (AEdge) {
         case 0 :
            Self.FEdgeName = "left";
            break;
         case 1 :
            Self.FEdgeName = "top";
            break;
         case 2 :
            Self.FEdgeName = "right";
            break;
         case 3 :
            Self.FEdgeName = "bottom";
            break;
      }
      return Self
   }
   /// function TW3Border.GetPadding() : Integer
   ///  [line: 131, column: 20, file: SmartCL.Borders]
   ,GetPadding:function(Self) {
      var Result = 0;
      var mRef$20 = undefined;
      var mKey = "";
      Result = 0;
      mRef$20 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$20) {
         mKey = "padding-"+Self.FEdgeName;
         Result = w3_getStyleAsInt(mRef$20,mKey);
      }
      return Result
   }
   /// function TW3Border.GetWidth() : Integer
   ///  [line: 193, column: 20, file: SmartCL.Borders]
   ,GetWidth$6:function(Self) {
      var Result = 0;
      var mRef$21 = undefined;
      var mKey$1 = "";
      Result = 0;
      mRef$21 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$21) {
         mKey$1 = "border-"+Self.FEdgeName+"-width";
         Result = w3_getStyleAsInt(mRef$21,mKey$1);
      }
      return Result
   }
   /// procedure TW3Border.SetPadding(aValue: Integer)
   ///  [line: 146, column: 21, file: SmartCL.Borders]
   ,SetPadding:function(Self, aValue$56) {
      var mRef$22 = undefined;
      var mKey$2 = "";
      mRef$22 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$22) {
         mKey$2 = "padding-"+Self.FEdgeName;
         w3_setStyle(mRef$22,mKey$2,TInteger.ToPxStr(aValue$56));
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetPadding", TObject.ClassName(Self.ClassType), $R[15]]);
      }
   }
   /// procedure TW3Border.SetWidth(aValue: Integer)
   ///  [line: 208, column: 21, file: SmartCL.Borders]
   ,SetWidth$2:function(Self, aValue$57) {
      var mRef$23 = undefined;
      var mKey$3 = "";
      mRef$23 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$23) {
         mKey$3 = "border-"+Self.FEdgeName+"-width";
         w3_setStyle(mRef$23,mKey$3,TInteger.ToPxStr(aValue$57));
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetWidth", TObject.ClassName(Self.ClassType), $R[15]]);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomAnimation = class (TObject)
///  [line: 31, column: 3, file: SmartCL.Effects]
var TW3CustomAnimation = {
   $ClassName:"TW3CustomAnimation",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBusy = false;
      $.FDuration = 0;
      $.FInEvnCB = null;
      $.FOnBegins = null;
      $.FOnEnds = null;
      $.FTarget$1 = null;
   }
   /// procedure TW3CustomAnimation.CBBegins()
   ///  [line: 1414, column: 30, file: SmartCL.Effects]
   ,CBBegins:function(Self) {
      if (Self.FOnBegins) {
         Self.FOnBegins(Self);
      }
   }
   /// procedure TW3CustomAnimation.CBEnds()
   ///  [line: 1420, column: 30, file: SmartCL.Effects]
   ,CBEnds:function(Self) {
      TW3CustomAnimation.FinalizeTransition$(Self);
      if (Self.FOnEnds) {
         Self.FOnEnds(Self);
      }
   }
   /// constructor TW3CustomAnimation.Create()
   ///  [line: 1393, column: 32, file: SmartCL.Effects]
   ,Create$56:function(Self) {
      TObject.Create(Self);
      Self.FDuration = DefaultDuration;
      return Self
   }
   /// destructor TW3CustomAnimation.Destroy()
   ///  [line: 1399, column: 31, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      if (Self.FBusy&&(Self.FTarget$1!==null)) {
         try {
            TW3CustomAnimation.FinalizeTransition$(Self);
         } catch ($e) {
            var e$9 = $W($e);
            /* null */
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomAnimation.Execute(TargetObj: TW3TagObj)
   ///  [line: 1457, column: 30, file: SmartCL.Effects]
   ,Execute:function(Self, TargetObj) {
      if (!TargetObj) {
         throw Exception.Create($New(Exception),"Target-object was NIL error");
      }
      if (!Self.FBusy) {
         Self.FTarget$1 = TargetObj;
         TW3CustomAnimation.SetupTransition$(Self);
      } else {
         throw Exception.Create($New(Exception),"Transition is already in progress error");
      }
   }
   /// procedure TW3CustomAnimation.ExecuteEx(TargetObj: TW3TagObj; BeginHandler: TFxAnimationBeginsEvent; EndHandler: TFxAnimationEndsEvent)
   ///  [line: 1470, column: 30, file: SmartCL.Effects]
   ,ExecuteEx:function(Self, TargetObj$1, BeginHandler, EndHandler) {
      if (!TargetObj$1) {
         throw Exception.Create($New(Exception),"Target-object was NIL error");
      }
      if (!Self.FBusy) {
         Self.FTarget$1 = TargetObj$1;
         Self.FOnBegins = BeginHandler;
         Self.FOnEnds = EndHandler;
         TW3CustomAnimation.SetupTransition$(Self);
      } else {
         throw Exception.Create($New(Exception),"Transition is already in progress error");
      }
   }
   /// procedure TW3CustomAnimation.FinalizeTransition()
   ///  [line: 1449, column: 30, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      w3_RemoveEvent(Self.FTarget$1.FHandle,"animationend",Self.FInEvnCB,true);
      w3_RemoveEvent(Self.FTarget$1.FHandle,"webkitAnimationEnd",Self.FInEvnCB,true);
      Self.FBusy = false;
   }
   /// procedure TW3CustomAnimation.SetDuration(Value: Float)
   ///  [line: 1427, column: 30, file: SmartCL.Effects]
   ,SetDuration:function(Self, Value$4) {
      if (!Self.FBusy) {
         Self.FDuration = Value$4;
      } else {
         throw Exception.Create($New(Exception),"Duration cannot be altered while the transition is active error");
      }
   }
   /// procedure TW3CustomAnimation.SetupTransition()
   ///  [line: 1435, column: 30, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      Self.FBusy = true;
      Self.FInEvnCB = $Event0(Self,TW3CustomAnimation.CBEnds);
      w3_AddEvent(Self.FTarget$1.FHandle,"animationend",Self.FInEvnCB,true);
      w3_AddEvent(Self.FTarget$1.FHandle,"webkitAnimationEnd",Self.FInEvnCB,true);
      TW3CustomAnimation.CBBegins(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$56$:function($){return $.ClassType.Create$56($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3TransitionAnimation = class (TW3CustomAnimation)
///  [line: 91, column: 3, file: SmartCL.Effects]
var TW3TransitionAnimation = {
   $ClassName:"TW3TransitionAnimation",$Parent:TW3CustomAnimation
   ,$Init:function ($) {
      TW3CustomAnimation.$Init($);
      $.FAnimationCmd = "";
      $.FSticky = $.FStyleSetup = false;
      $.FStyleDOM = undefined;
      $.FTiming = 0;
   }
   /// constructor TW3TransitionAnimation.Create()
   ///  [line: 1140, column: 36, file: SmartCL.Effects]
   ,Create$56:function(Self) {
      TW3CustomAnimation.Create$56(Self);
      Self.FTiming = DefaultTiming;
      return Self
   }
   /// destructor TW3TransitionAnimation.Destroy()
   ///  [line: 1146, column: 35, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      TW3TransitionAnimation.InvalidateKeyFrames(Self);
      TW3CustomAnimation.Destroy(Self);
   }
   /// procedure TW3TransitionAnimation.FinalizeTransition()
   ///  [line: 1197, column: 34, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      var style$7;
      if (!Self.FSticky) {
         style$7 = Self.FTarget$1.FHandle.style;
         style$7.removeProperty("-webkit-animation");
         style$7.removeProperty("-webkit-animation-fill-mode");
         style$7.removeProperty("animation");
         style$7.removeProperty("animation-fill-mode");
         Self.FAnimationCmd = "";
      }
      TW3CustomAnimation.FinalizeTransition(Self);
   }
   /// procedure TW3TransitionAnimation.InvalidateKeyFrames()
   ///  [line: 1169, column: 34, file: SmartCL.Effects]
   ,InvalidateKeyFrames:function(Self) {
      if (Self.FStyleSetup) {
         Self.FStyleSetup = false;
         Self.FStyleDOM.parentNode.removeChild(Self.FStyleDOM);
         Self.FStyleDOM = null;
      }
   }
   /// function TW3TransitionAnimation.KeyFramesName() : String
   ///  [line: 1219, column: 33, file: SmartCL.Effects]
   ,KeyFramesName:function(Self) {
      var Result = "";
      Result = TObject.ClassName(Self.ClassType);
      return Result
   }
   /// procedure TW3TransitionAnimation.SetupKeyFrames()
   ///  [line: 1152, column: 34, file: SmartCL.Effects]
   ,SetupKeyFrames:function(Self) {
      var document$1 = undefined,
         css = "";
      Self.FStyleSetup = true;
      document$1 = document;
      Self.FStyleDOM = document$1.createElement("style");
      Self.FStyleDOM.type = "text\/css";
      css = "keyframes "+TW3TransitionAnimation.KeyFramesName$(Self)+" {"+TW3TransitionAnimation.KeyFramesCSS$(Self)+"}";
      Self.FStyleDOM.appendChild(document$1.createTextNode("@-webkit-"+css));
      Self.FStyleDOM.appendChild(document$1.createTextNode("@"+css));
      document$1.getElementsByTagName("head")[0].appendChild(Self.FStyleDOM);
   }
   /// procedure TW3TransitionAnimation.SetupTransition()
   ///  [line: 1179, column: 34, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var style$8;
      TW3CustomAnimation.SetupTransition(Self);
      if (!Self.FStyleSetup) {
         TW3TransitionAnimation.SetupKeyFrames(Self);
      }
      style$8 = Self.FTarget$1.FHandle.style;
      Self.FAnimationCmd = TW3TransitionAnimation.KeyFramesName$(Self)+" "+FloatToStr$_Float_(Self.FDuration)+"s "+cW3AnimationTiming[Self.FTiming];
      style$8.webkitAnimation = Self.FAnimationCmd;
      style$8.animation = Self.FAnimationCmd;
      style$8.webkitAnimationFillMode = "both";
      style$8.animationFillMode = "both";
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$56$:function($){return $.ClassType.Create$56($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName$:function($){return $.ClassType.KeyFramesName($)}
};
/// TW3ZoomOutTransition = class (TW3TransitionAnimation)
///  [line: 134, column: 4, file: SmartCL.Effects]
var TW3ZoomOutTransition = {
   $ClassName:"TW3ZoomOutTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3ZoomOutTransition.KeyFramesCSS() : String
   ///  [line: 1298, column: 31, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   -webkit-transform: scale(1.0);\r\n   -webkit-transform-origin: 50% 50%;\r\n   transform: scale(1.0);\r\n   transform-origin: 50% 50%;\r\n}\r\n50% {\r\n   opacity: 0.3;\r\n   -webkit-transform: scale(0.5);\r\n   transform: scale(0.5);\r\n}\r\n100% {\r\n   opacity: 0.0;\r\n   -webkit-transform: scale(0);\r\n   transform: scale(0);\r\n}";
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3ZoomInTransition = class (TW3TransitionAnimation)
///  [line: 129, column: 4, file: SmartCL.Effects]
var TW3ZoomInTransition = {
   $ClassName:"TW3ZoomInTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3ZoomInTransition.KeyFramesCSS() : String
   ///  [line: 1272, column: 30, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 0.0;\r\n   -webkit-transform: scale(0);\r\n   transform: scale(0);\r\n}\r\n50% {\r\n   opacity: 0.3;\r\n   -webkit-transform: scale(0.5);\r\n   transform: scale(0.5);\r\n}\r\n100% {\r\n   -webkit-transform: scale(1.0);\r\n   -webkit-transform-origin: 50% 50%;\r\n   transform: scale(1.0);\r\n   transform-origin: 50% 50%;\r\n}";
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3WarpOutTransition = class (TW3TransitionAnimation)
///  [line: 124, column: 4, file: SmartCL.Effects]
var TW3WarpOutTransition = {
   $ClassName:"TW3WarpOutTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3WarpOutTransition.KeyFramesCSS() : String
   ///  [line: 1250, column: 31, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 1.0;\r\n   -webkit-transform: scale(1);\r\n   transform: scale(1);\r\n}\r\n100% {\r\n   opacity: 0;\r\n   -webkit-transform: scale(5);\r\n   -webkit-transform-origin: 50% 50%;\r\n   transform: scale(5);\r\n   transform-origin: 50% 50%;\r\n}";
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3WarpInTransition = class (TW3TransitionAnimation)
///  [line: 119, column: 4, file: SmartCL.Effects]
var TW3WarpInTransition = {
   $ClassName:"TW3WarpInTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3WarpInTransition.KeyFramesCSS() : String
   ///  [line: 1228, column: 30, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 0;\r\n   -webkit-transform: scale(5);\r\n   -webkit-transform-origin: 50% 50%;\r\n   transform: scale(5);\r\n   transform-origin: 50% 50%;\r\n}\r\n100% {\r\n   opacity: 1.0;\r\n   -webkit-transform: scale(1);\r\n   transform: scale(1);\r\n}";
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3SizeAnimation = class (TW3TransitionAnimation)
///  [line: 184, column: 3, file: SmartCL.Effects]
var TW3SizeAnimation = {
   $ClassName:"TW3SizeAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.FFromHeight = $.FFromWidth = $.FFromX = $.FFromY = $.FToHeight = $.FToWidth = $.FToX = $.FToY = 0;
   }
   /// function TW3SizeAnimation.KeyFramesCSS() : String
   ///  [line: 1118, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = ("from {\r\n  left: "+Self.FFromX.toString()+"px;\r\n  top:  "+Self.FFromY.toString()+"px;\r\n  width: "+Self.FFromWidth.toString()+"px;\r\n  height: "+Self.FFromHeight.toString()+"px;\r\n} to {\r\n  left: "+Self.FToX.toString()+"px;\r\n  top:  "+Self.FToY.toString()+"px;\r\n  width: "+Self.FToWidth.toString()+"px;\r\n  height: "+Self.FToHeight.toString()+"px;\r\n}");
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3NamedAnimation = class (TW3CustomAnimation)
///  [line: 66, column: 3, file: SmartCL.Effects]
var TW3NamedAnimation = {
   $ClassName:"TW3NamedAnimation",$Parent:TW3CustomAnimation
   ,$Init:function ($) {
      TW3CustomAnimation.$Init($);
      $.FName$2 = "";
   }
   /// procedure TW3NamedAnimation.SetupTransition()
   ///  [line: 1324, column: 29, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var mCommand = "";
      TW3CustomAnimation.SetupTransition(Self);
      w3_setStyle(Self.FTarget$1.FHandle,w3_CSSPrefix("AnimationFillMode"),"both");
      mCommand = Self.FName$2+" "+FloatToStr$_Float_(Self.FDuration)+"s linear";
      w3_setStyle(Self.FTarget$1.FHandle,w3_CSSPrefix("Animation"),mCommand);
   }
   /// procedure TW3NamedAnimation.FinalizeTransition()
   ///  [line: 1334, column: 29, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      TW3CustomAnimation.FinalizeTransition(Self);
      if (Self.FTarget$1!==null) {
         Self.FTarget$1.FHandle.style[w3_CSSPrefix("Animation")] = "none";
         Self.FTarget$1.FHandle.style[w3_CSSPrefix("AnimationFillMode")] = "none";
      }
   }
   ,Destroy:TW3CustomAnimation.Destroy
   ,Create$56:TW3CustomAnimation.Create$56
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3MoveAnimation = class (TW3TransitionAnimation)
///  [line: 139, column: 4, file: SmartCL.Effects]
var TW3MoveAnimation = {
   $ClassName:"TW3MoveAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.FFromX$1 = $.FFromY$1 = $.FToX$1 = $.FToY$1 = 0;
   }
   /// function TW3MoveAnimation.KeyFramesCSS() : String
   ///  [line: 1089, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = ("from {\r\n  left: "+Self.FFromX$1.toString()+"px;\r\n  top:  "+Self.FFromY$1.toString()+"px;\r\n} to {\r\n  left: "+Self.FToX$1.toString()+"px;\r\n  top: "+Self.FToY$1.toString()+"px;\r\n}");
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3FadeAnimation = class (TW3TransitionAnimation)
///  [line: 154, column: 3, file: SmartCL.Effects]
var TW3FadeAnimation = {
   $ClassName:"TW3FadeAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.FFrom = $.FTo = 0;
   }
   /// function TW3FadeAnimation.KeyFramesCSS() : String
   ///  [line: 1106, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% { opacity: "+FloatToStr$_Float_(Self.FFrom)+"; }\r\n    100% { opacity: "+FloatToStr$_Float_(Self.FTo)+"; }";
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$56:TW3TransitionAnimation.Create$56
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
   ,KeyFramesName:TW3TransitionAnimation.KeyFramesName
};
/// TW3AnimationTiming enumeration
///  [line: 89, column: 3, file: SmartCL.Effects]
var TW3AnimationTiming = [ "atEase", "atLinear", "atEaseIn", "atEaseOut", "atEaseInOut" ];
var cW3AnimationTiming = ["ease","linear","ease-in","ease-out","ease-in-out"];
function AfterEffect(aControl, aEffectObj) {
   TW3MovableControl.fxSetBusy(aControl,false);
};
function BeforeEffect(aControl$1, aEffectObj$1) {
   TW3MovableControl.fxSetBusy(aControl$1,true);
};
/// TW3AlertResult enumeration
///  [line: 27, column: 3, file: SmartCL.Dialogs]
var TW3AlertResult = [ "roYes", "roNo", "roOK", "roCancel" ];
/// TW3AlertOptions enumeration
///  [line: 26, column: 3, file: SmartCL.Dialogs]
var TW3AlertOptions = [ "aoYes", "aoNo", "aoYesNo", "aoOK", "aoCancel", "aoOKCancel" ];
/// TW3AlertDialog = class (TW3CustomControl)
///  [line: 38, column: 3, file: SmartCL.Dialogs]
var TW3AlertDialog = {
   $ClassName:"TW3AlertDialog",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FNo = $.FOnSelect = $.FText = $.FTitle = $.FYes = null;
      $.FOptions = 0;
      $.FReady = false;
   }
   /// procedure TW3AlertDialog.FinalizeObject()
   ///  [line: 87, column: 26, file: SmartCL.Dialogs]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FTitle);
      TObject.Free(Self.FText);
      TObject.Free(Self.FYes);
      TObject.Free(Self.FNo);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3AlertDialog.HandleNoClick(Sender: TObject)
   ///  [line: 112, column: 26, file: SmartCL.Dialogs]
   ,HandleNoClick:function(Self, Sender$8) {
      if (Self.FOnSelect) {
         switch (Self.FOptions) {
            case 0 :
            case 2 :
            case 1 :
               Self.FOnSelect(Self,1);
               break;
            case 3 :
            case 4 :
            case 5 :
               Self.FOnSelect(Self,3);
               break;
         }
      }
   }
   /// procedure TW3AlertDialog.HandleYesClick(Sender: TObject)
   ///  [line: 101, column: 26, file: SmartCL.Dialogs]
   ,HandleYesClick:function(Self, Sender$9) {
      if (Self.FOnSelect) {
         switch (Self.FOptions) {
            case 0 :
            case 2 :
            case 1 :
               Self.FOnSelect(Self,0);
               break;
            case 3 :
            case 4 :
            case 5 :
               Self.FOnSelect(Self,2);
               break;
         }
      }
   }
   /// procedure TW3AlertDialog.InitializeObject()
   ///  [line: 68, column: 26, file: SmartCL.Dialogs]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FYes = TW3Component.Create$28$($New(TW3AlertButton),Self);
      TW3MovableControl.SetSize(Self.FYes,120,42);
      TW3Button.SetCaption(Self.FYes,"OK");
      TW3CustomControl._setMouseClick(Self.FYes,$Event1(Self,TW3AlertDialog.HandleYesClick));
      TW3MovableControl.SetVisible(Self.FYes,false);
      Self.FNo = TW3Component.Create$28$($New(TW3AlertButton),Self);
      TW3MovableControl.SetSize(Self.FNo,120,42);
      TW3Button.SetCaption(Self.FNo,"Cancel");
      TW3CustomControl._setMouseClick(Self.FNo,$Event1(Self,TW3AlertDialog.HandleNoClick));
      TW3MovableControl.SetVisible(Self.FNo,false);
      Self.FTitle = TW3Component.Create$28$($New(TW3Label),Self);
      Self.FText = TW3Component.Create$28$($New(TW3Label),Self);
   }
   /// procedure TW3AlertDialog.Resize()
   ///  [line: 193, column: 26, file: SmartCL.Dialogs]
   ,Resize:function(Self) {
      var hd$1 = 0;
      var wd$1 = 0;
      var dx$8 = 0;
      var dy$9 = 0;
      TW3MovableControl.Resize(Self);
      wd$1 = TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self));
      hd$1 = TW3ScrollInfo.GetScrollHeight(TW3CustomControl.GetScrollInfo(Self));
      TW3MovableControl.SetBounds$2(Self.FTitle,8,8,wd$1-8*2,32);
      TW3MovableControl.SetBounds$2(Self.FText,8,TW3MovableControl.GetTop(Self.FTitle)+TW3MovableControl.GetHeight(Self.FTitle)+2,wd$1-8*2,100-8);
      if ($SetIn(Self.FComponentState,2,0,6)&&Self.FReady) {
         (wd$1-= (8*2));
         if ((Self.FOptions==2||Self.FOptions==5)) {
            (wd$1-= 8);
         }
         if ((Self.FOptions==0||Self.FOptions==3||Self.FOptions==1||Self.FOptions==4)) {
            if ((Self.FOptions==0||Self.FOptions==3)) {
               dy$9 = TW3MovableControl.GetHeight(Self)-(TW3MovableControl.GetHeight(Self.FYes)+20);
               TW3MovableControl.SetBounds$2(Self.FYes,10,dy$9,wd$1,TW3MovableControl.GetHeight(Self.FYes));
            } else if ((Self.FOptions==1||Self.FOptions==4)) {
               dy$9 = TW3MovableControl.GetHeight(Self)-(TW3MovableControl.GetHeight(Self.FNo)+20);
               TW3MovableControl.SetBounds$2(Self.FNo,10,dy$9,wd$1,TW3MovableControl.GetHeight(Self.FNo));
            }
         } else if ((Self.FOptions==2||Self.FOptions==5)) {
            dy$9 = hd$1-(TW3MovableControl.GetHeight(Self.FYes)+8);
            TW3MovableControl.SetBounds$2(Self.FYes,8,dy$9,$Div(wd$1,2),TW3MovableControl.GetHeight(Self.FYes));
            dx$8 = TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self))-($Div(wd$1,2));
            (dx$8-= 8);
            TW3MovableControl.SetBounds$2(Self.FNo,dx$8,dy$9,$Div(wd$1,2),TW3MovableControl.GetHeight(Self.FNo));
         }
      }
   }
   /// procedure TW3AlertDialog.SetupDialog(aTitle: String; aText: String; aOptions: TW3AlertOptions)
   ///  [line: 123, column: 26, file: SmartCL.Dialogs]
   ,SetupDialog:function(Self, aTitle, aText$1, aOptions) {
      if (!Self.FReady) {
         TW3TagObj.BeginUpdate(Self);
         try {
            Self.FOptions = aOptions;
            TW3Label.SetCaption$1(Self.FTitle,aTitle);
            TW3Label.SetCaption$1(Self.FText,aText$1);
            switch (Self.FOptions) {
               case 0 :
               case 3 :
                  TW3MovableControl.SetVisible(Self.FYes,true);
                  TW3MovableControl.SetVisible(Self.FNo,false);
                  break;
               case 1 :
               case 4 :
                  TW3MovableControl.SetVisible(Self.FNo,true);
                  TW3MovableControl.SetVisible(Self.FYes,false);
                  break;
               case 2 :
               case 5 :
                  TW3MovableControl.SetVisible(Self.FYes,true);
                  TW3MovableControl.SetVisible(Self.FNo,true);
                  break;
            }
            switch (Self.FOptions) {
               case 0 :
                  TW3Button.SetCaption(Self.FYes,"Yes");
                  break;
               case 1 :
                  TW3Button.SetCaption(Self.FNo,"No");
                  break;
               case 3 :
                  TW3Button.SetCaption(Self.FYes,"OK");
                  break;
               case 4 :
                  TW3Button.SetCaption(Self.FNo,"Cancel");
                  break;
               case 2 :
                  TW3Button.SetCaption(Self.FYes,"Yes");
                  TW3Button.SetCaption(Self.FNo,"No");
                  break;
               case 5 :
                  TW3Button.SetCaption(Self.FYes,"OK");
                  TW3Button.SetCaption(Self.FNo,"Cancel");
                  break;
            }
            TW3CustomFont.SetName$1(TW3CustomControl.GetFont(Self.FTitle),"Helvetica, Arial, sans-serif");
            TW3CustomFont.SetWeight(TW3CustomControl.GetFont(Self.FTitle),"bold");
            TW3CustomFont.SetSize$5(TW3CustomControl.GetFont(Self.FTitle),24);
            TW3Label.SetTextAlign$1(Self.FTitle,1);
            TW3CustomFont.SetColor$2(TW3CustomControl.GetFont(Self.FTitle),16777215);
            Self.FTitle.FContainer.FHandle.style["text-shadow"] = "0 -1px 0 rgba(0,0,0,.8)";
            TW3CustomFont.SetSize$5(TW3CustomControl.GetFont(Self.FText),16);
            TW3CustomFont.SetName$1(TW3CustomControl.GetFont(Self.FText),"Helvetica, Arial, sans-serif");
            TW3Label.SetTextAlign$1(Self.FText,1);
            Self.FReady = true;
         } finally {
            TW3TagObj.AddToComponentState(Self,[24]);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3AlertDialog.StyleTagObject()
   ///  [line: 96, column: 26, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3CustomControl.StyleTagObject(Self);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$28:TW3CustomControl.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
TW3AlertDialog.$Intf={
   IW3AlertDialog:[TW3AlertDialog.SetupDialog]
}
/// TW3Button = class (TW3CustomControl)
///  [line: 18, column: 3, file: SmartCL.Controls.Button]
var TW3Button = {
   $ClassName:"TW3Button",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FIgnoreMouse = 0;
      $.FPressed = false;
      $.FTouchEnd = null;
      $.FTouchMove = null;
      $.FTouchX = $.FTouchY = 0;
   }
   /// procedure TW3Button.CBClick(eventObj: JEvent)
   ///  [line: 165, column: 21, file: SmartCL.Controls.Button]
   ,CBClick:function(Self, eventObj$18) {
      if (Self.FPressed) {
         TW3Button.ResetClick(Self);
         TW3CustomControl.CBClick(Self,eventObj$18);
      } else {
         TW3Button.ResetClick(Self);
      }
   }
   /// procedure TW3Button.CBKeyDown(eventObj: JKeyboardEvent)
   ///  [line: 173, column: 21, file: SmartCL.Controls.Button]
   ,CBKeyDown:function(Self, eventObj$19) {
      TW3CustomControl.CBKeyDown(Self,eventObj$19);
      if (TW3CustomControl.GetEnabled(Self)&&(eventObj$19.keyCode==13||eventObj$19.keyCode==32)) {
         TW3Button.SetPressed(Self,true);
      }
   }
   /// procedure TW3Button.CBKeyUp(eventObj: JKeyboardEvent)
   ///  [line: 180, column: 21, file: SmartCL.Controls.Button]
   ,CBKeyUp:function(Self, eventObj$20) {
      TW3CustomControl.CBKeyDown(Self,eventObj$20);
      switch (eventObj$20.keyCode) {
         case 13 :
         case 32 :
            if (TW3CustomControl.GetEnabled(Self)&&Self.FPressed) {
               TW3CustomControl.CBClick$(Self,eventObj$20);
            }
            break;
         case 27 :
            TW3Button.SetPressed(Self,false);
            break;
      }
   }
   /// procedure TW3Button.CBMouseDown(eventObj: JMouseEvent)
   ///  [line: 141, column: 21, file: SmartCL.Controls.Button]
   ,CBMouseDown:function(Self, eventObj$21) {
      TW3CustomControl.CBMouseDown(Self,eventObj$21);
      if (PerformanceTimer.Now$1()<Self.FIgnoreMouse) {
         return;
      }
      if (TW3CustomControl.GetEnabled(Self)&&eventObj$21.button==0) {
         TW3Button.SetPressed(Self,true);
         TW3CustomControl.SetCapture(Self);
      }
   }
   /// procedure TW3Button.CBMouseMove(eventObj: JMouseEvent)
   ///  [line: 158, column: 21, file: SmartCL.Controls.Button]
   ,CBMouseMove:function(Self, eventObj$22) {
      TW3CustomControl.CBMouseMove(Self,eventObj$22);
      if (TW3CustomControl.a$2(Self)) {
         TW3Button.SetPressed(Self,TRect$ContainsPos$1(TW3MovableControl.ScreenRect(Self),eventObj$22.clientX,eventObj$22.clientY));
      }
   }
   /// procedure TW3Button.CBMouseUp(eventObj: JMouseEvent)
   ///  [line: 151, column: 21, file: SmartCL.Controls.Button]
   ,CBMouseUp:function(Self, eventObj$23) {
      TW3CustomControl.CBMouseUp(Self,eventObj$23);
      if (TW3CustomControl.a$2(Self)&&eventObj$23.button==0) {
         TW3CustomControl.CBClick$(Self,eventObj$23);
      }
   }
   /// function TW3Button.GetCaption() : String
   ///  [line: 58, column: 20, file: SmartCL.Controls.Button]
   ,GetCaption:function(Self) {
      var Result = "";
      if (Self.FHandle) {
         Result = String(Self.FHandle.innerHTML);
      }
      return Result
   }
   /// procedure TW3Button.InitializeObject()
   ///  [line: 70, column: 21, file: SmartCL.Controls.Button]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3MovableControl.SetWidth$(Self,100);
      TW3MovableControl.SetHeight$(Self,32);
      Self.FHandle.addEventListener("touchstart",function (e$10) {
         var t = null;
         if (!TW3CustomControl.GetEnabled(Self)) {
            return;
         }
         if (Self.FPressed) {
            return;
         }
         TW3Button.SetPressed(Self,true);
         e$10.stopPropagation();
         Self.FHandle.addEventListener("touchmove",Self.FTouchMove,false);
         document.body.addEventListener("touchend",Self.FTouchEnd,false);
         t = e$10.touches[0];
         Self.FTouchX = t.clientX;
         Self.FTouchY = t.clientY;
      },false);
      Self.FTouchMove = function (e$11) {
         var t$1 = null;
         t$1 = e$11.touches[0];
         if (Math.abs(t$1.clientX-Self.FTouchX)>10||Math.abs(t$1.clientY-Self.FTouchY)>10) {
            TW3Button.ResetClick(Self);
         }
      };
      Self.FTouchEnd = function (e$12) {
         TW3CustomControl.CBClick$(Self,e$12);
         Self.FIgnoreMouse = PerformanceTimer.Now$1()+1000;
      };
      TW3CustomControl._setMouseDown(Self,null);
      TW3CustomControl._setMouseUp(Self,null);
      TW3CustomControl._setMouseMove(Self,null);
      TW3CustomControl._setKeyDown(Self,null);
      TW3CustomControl._setKeyUp(Self,null);
   }
   /// function TW3Button.MakeElementTagObj() : THandle
   ///  [line: 115, column: 20, file: SmartCL.Controls.Button]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = w3_createHtmlElement("button");
      return Result
   }
   /// procedure TW3Button.ResetClick()
   ///  [line: 130, column: 21, file: SmartCL.Controls.Button]
   ,ResetClick:function(Self) {
      TW3Button.SetPressed(Self,false);
      if (TW3CustomControl.a$2(Self)) {
         TW3CustomControl.ReleaseCapture(Self);
      } else {
         Self.FHandle.removeEventListener("touchmove",Self.FTouchMove,false);
         document.body.removeEventListener("touchend",Self.FTouchEnd,false);
      }
   }
   /// procedure TW3Button.SetCaption(Value: String)
   ///  [line: 64, column: 21, file: SmartCL.Controls.Button]
   ,SetCaption:function(Self, Value$5) {
      if (Self.FHandle) {
         Self.FHandle.innerHTML = Value$5;
      }
   }
   /// procedure TW3Button.SetPressed(value: Boolean)
   ///  [line: 120, column: 21, file: SmartCL.Controls.Button]
   ,SetPressed:function(Self, value$7) {
      if (Self.FPressed!=value$7) {
         Self.FPressed = value$7;
         if (value$7) {
            w3_AddClass(Self.FHandle,PressedCSSClass);
         } else {
            w3_RemoveClass(Self.FHandle,PressedCSSClass);
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyDown$:function($){return $.ClassType.CBKeyDown.apply($.ClassType, arguments)}
   ,CBKeyUp$:function($){return $.ClassType.CBKeyUp.apply($.ClassType, arguments)}
   ,CBMouseDown$:function($){return $.ClassType.CBMouseDown.apply($.ClassType, arguments)}
   ,CBMouseMove$:function($){return $.ClassType.CBMouseMove.apply($.ClassType, arguments)}
   ,CBMouseUp$:function($){return $.ClassType.CBMouseUp.apply($.ClassType, arguments)}
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3AlertButton = class (TW3Button)
///  [line: 31, column: 3, file: SmartCL.Dialogs]
var TW3AlertButton = {
   $ClassName:"TW3AlertButton",$Parent:TW3Button
   ,$Init:function ($) {
      TW3Button.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3Button.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3Button.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3Button.CBClick
   ,CBKeyDown:TW3Button.CBKeyDown
   ,CBKeyUp:TW3Button.CBKeyUp
   ,CBMouseDown:TW3Button.CBMouseDown
   ,CBMouseMove:TW3Button.CBMouseMove
   ,CBMouseUp:TW3Button.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3LabelText = class (TW3CustomControl)
///  [line: 19, column: 3, file: SmartCL.Controls.Label]
var TW3LabelText = {
   $ClassName:"TW3LabelText",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3Label = class (TW3CustomControl)
///  [line: 22, column: 3, file: SmartCL.Controls.Label]
var TW3Label = {
   $ClassName:"TW3Label",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption$1 = "";
      $.FContainer = null;
      $.FTextAlign = 0;
   }
   /// procedure TW3Label.FinalizeObject()
   ///  [line: 71, column: 20, file: SmartCL.Controls.Label]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FContainer);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3Label.InitializeObject()
   ///  [line: 51, column: 20, file: SmartCL.Controls.Label]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContainer = TW3Component.Create$28$($New(TW3LabelText),Self);
      w3_setStyle(Self.FContainer.FHandle,"text-overflow","ellipsis");
      w3_setStyle(Self.FContainer.FHandle,w3_CSSPrefixDef("text-overflow"),"ellipsis");
      w3_setStyle(Self.FContainer.FHandle,"white-space","nowrap");
      w3_setStyle(Self.FContainer.FHandle,"overflow","hidden");
      w3_setStyle(Self.FContainer.FHandle,w3_CSSPrefixDef("vertical-align"),"middle");
      TW3Label.SetCaption$1(Self,"Label");
      TW3MovableControl.SetHeight$(Self,12);
   }
   /// function TW3Label.MakeElementTagObj() : THandle
   ///  [line: 82, column: 19, file: SmartCL.Controls.Label]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = w3_createHtmlElement("fieldset");
      return Result
   }
   /// procedure TW3Label.Resize()
   ///  [line: 87, column: 20, file: SmartCL.Controls.Label]
   ,Resize:function(Self) {
      var dx$9 = 0;
      var dy$10 = 0;
      var wd$2 = 0;
      var hd$2 = 0;
      TW3MovableControl.Resize(Self);
      TW3TagObj.BeginUpdate(Self.FContainer);
      TW3MovableControl.SetBounds$2(Self.FContainer,0,0,2,2);
      wd$2 = ClampInt(TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self.FContainer))+2,0,TW3MovableControl.ClientWidth(Self));
      hd$2 = ClampInt(TW3ScrollInfo.GetScrollHeight(TW3CustomControl.GetScrollInfo(Self.FContainer)),0,TW3MovableControl.ClientHeight(Self));
      switch (Self.FTextAlign) {
         case 0 :
            dy$10 = ($Div(TW3MovableControl.ClientHeight(Self),2))-($Div(hd$2,2));
            TW3MovableControl.SetBounds$2(Self.FContainer,0,dy$10,wd$2,hd$2);
            break;
         case 1 :
            dx$9 = ($Div(TW3MovableControl.ClientWidth(Self),2))-($Div(wd$2,2));
            dy$10 = ($Div(TW3MovableControl.ClientHeight(Self),2))-($Div(hd$2,2));
            TW3MovableControl.SetBounds$2(Self.FContainer,dx$9,dy$10,wd$2,hd$2);
            break;
         case 2 :
            dx$9 = TW3MovableControl.ClientWidth(Self)-wd$2;
            dy$10 = ($Div(TW3MovableControl.ClientHeight(Self),2))-($Div(hd$2,2));
            TW3MovableControl.SetBounds$2(Self.FContainer,dx$9,dy$10,wd$2,hd$2);
            break;
      }
      TW3TagObj.EndUpdate(Self.FContainer);
   }
   /// procedure TW3Label.SetCaption(const aValue: String)
   ///  [line: 122, column: 20, file: SmartCL.Controls.Label]
   ,SetCaption$1:function(Self, aValue$58) {
      if (aValue$58!=Self.FCaption$1) {
         TW3TagObj.BeginUpdate(Self);
         Self.FCaption$1 = aValue$58;
         TW3TagObj.SetInnerHTML(Self.FContainer,aValue$58);
         TW3TagObj.AddToComponentState(Self,[24]);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3Label.SetEnabled(aValue: Boolean)
   ///  [line: 134, column: 20, file: SmartCL.Controls.Label]
   ,SetEnabled:function(Self, aValue$59) {
      TW3CustomControl.SetEnabled(Self,aValue$59);
      TW3CustomControl.SetEnabled$(Self.FContainer,aValue$59);
   }
   /// procedure TW3Label.SetTextAlign(aNewAlignment: TTextAlign)
   ///  [line: 140, column: 20, file: SmartCL.Controls.Label]
   ,SetTextAlign$1:function(Self, aNewAlignment) {
      var AlignmentText = "";
      TW3TagObj.BeginUpdate(Self);
      Self.FTextAlign = aNewAlignment;
      switch (aNewAlignment) {
         case 0 :
            AlignmentText = "left";
            break;
         case 1 :
            AlignmentText = "center";
            break;
         case 2 :
            AlignmentText = "right";
            break;
      }
      w3_setStyle(Self.FContainer.FHandle,"text-align",AlignmentText);
      TW3TagObj.AddToComponentState(Self,[24]);
      TW3TagObj.EndUpdate(Self);
   }
   /// function TW3Label.SupportAdjustment() : Boolean
   ///  [line: 77, column: 25, file: SmartCL.Controls.Label]
   ,supportAdjustment:function(Self) {
      var Result = false;
      Result = false;
      return Result
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment$:function($){return $.supportAdjustment($)}
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
};
/// TTextAlign enumeration
///  [line: 17, column: 3, file: SmartCL.Controls.Label]
var TTextAlign = [ "taLeft", "taCenter", "taRight" ];
/// PerformanceTimer = class (TObject)
///  [line: 15, column: 3, file: System.Diagnostics]
var PerformanceTimer = {
   $ClassName:"PerformanceTimer",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure PerformanceTimer.PrepareGetNow()
   ///  [line: 56, column: 34, file: System.Diagnostics]
   ,PrepareGetNow:function() {
      
    if (window.performance && performance.now) {
      vGetNow = performance;
      vIsHighResolution = true;
    } else {
      vIsHighResolution = false;
      if (!Date.now) { Date.now = function (){ return +(new Date) } };
      vGetNow = Date;
    }
     }
   /// function PerformanceTimer.Now() : Float
   ///  [line: 49, column: 33, file: System.Diagnostics]
   ,Now$1:function() {
      var Result = 0;
      if (!vGetNow) {
         PerformanceTimer.PrepareGetNow();
      }
      Result = Number(vGetNow.now());
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TForm1 = class (TW3Form)
///  [line: 12, column: 3, file: Form1]
var TForm1 = {
   $ClassName:"TForm1",$Parent:TW3Form
   ,$Init:function ($) {
      TW3Form.$Init($);
      $.fLayer1Footer = $.fLayer1Header = $.fLayer1Layout = $.fLayer1Main = $.fLayer2AddressLabel = $.fLayer2AddressMemo = $.fLayer2EmailEdit = $.fLayer2EmailLabel = $.fLayer2FirstEdit = $.fLayer2FirstLabel = $.fLayer2FooterLayout = $.fLayer2HeaderLayout = $.fLayer2LastEdit = $.fLayer2LastLabel = $.fLayer2MainLayout = $.fLayer2PhoneEdit = $.fLayer2PhoneLabel = null;
   }
   /// procedure TForm1.Form1Deactivate(Sender: TObject)
   ///  [line: 56, column: 18, file: Form1]
   ,Form1Deactivate:function(Self, Sender$10) {
      Self.fLayer1Layout = null;
      Self.fLayer2HeaderLayout = null;
      Self.fLayer2MainLayout = null;
      Self.fLayer2FooterLayout = null;
   }
   /// procedure TForm1.InitializeForm()
   ///  [line: 64, column: 18, file: Form1]
   ,InitializeForm:function(Self) {
      var H$1 = 0;
      TW3CustomForm.InitializeForm(Self);
      H$1 = $Div(TW3MovableControl.ClientHeight(Self),8);
      TW3MovableControl.SetHeight$(Self.fLayer1Header,H$1);
      TW3MovableControl.SetHeight$(Self.fLayer1Footer,H$1);
      Self.fLayer1Layout = Layout.Client$2(Layout,[Layout.Top$6(Layout,Layout.Height$9(Layout,H$1),Self.fLayer1Header), Layout.Client$3(Layout,Self.fLayer1Main), Layout.Bottom$4(Layout,Layout.Height$9(Layout,H$1),Self.fLayer1Footer)].slice());
      TW3MovableControl.SetWidth$(Self.fLayer2FirstLabel,30);
      TW3MovableControl.SetHeight$(Self.fLayer2FirstLabel,32);
      TW3Label.SetCaption$1(Self.fLayer2FirstLabel,"First");
      TW3MovableControl.SetWidth$(Self.fLayer2FirstEdit,75);
      TW3MovableControl.SetHeight$(Self.fLayer2FirstEdit,32);
      TW3MovableControl.SetWidth$(Self.fLayer2LastLabel,30);
      TW3MovableControl.SetHeight$(Self.fLayer2LastLabel,32);
      TW3Label.SetCaption$1(Self.fLayer2LastLabel,"Last");
      TW3MovableControl.SetWidth$(Self.fLayer2LastEdit,75);
      TW3MovableControl.SetHeight$(Self.fLayer2LastEdit,32);
      Self.fLayer2HeaderLayout = Layout.Client(Layout,TLayoutConfig.Margins$1$(TLayoutConfig.Spacing$(TLayoutConfig.Padding$2$(Layout.Stretch$1(Layout),5,0,0,0),5),5,$Div(TW3MovableControl.GetHeight(Self.fLayer1Header),3),5,$Div(TW3MovableControl.GetHeight(Self.fLayer1Header),3)),[Layout.Left$7(Layout,Self.fLayer2FirstLabel), Layout.Left$7(Layout,Self.fLayer2FirstEdit), Layout.Left$7(Layout,Self.fLayer2LastLabel), Layout.Left$7(Layout,Self.fLayer2LastEdit)].slice());
      TW3MovableControl.SetWidth$(Self.fLayer2PhoneLabel,50);
      TW3MovableControl.SetHeight$(Self.fLayer2PhoneLabel,32);
      TW3Label.SetCaption$1(Self.fLayer2PhoneLabel,"Phone");
      TW3MovableControl.SetWidth$(Self.fLayer2PhoneEdit,75);
      TW3MovableControl.SetHeight$(Self.fLayer2PhoneEdit,32);
      TW3MovableControl.SetWidth$(Self.fLayer2EmailLabel,50);
      TW3MovableControl.SetHeight$(Self.fLayer2EmailLabel,32);
      TW3Label.SetCaption$1(Self.fLayer2EmailLabel,"Email");
      TW3MovableControl.SetWidth$(Self.fLayer2EmailEdit,75);
      TW3MovableControl.SetHeight$(Self.fLayer2EmailEdit,32);
      Self.fLayer2FooterLayout = Layout.Client(Layout,TLayoutConfig.Margins$1$(TLayoutConfig.Spacing$(TLayoutConfig.Padding$2$(Layout.Stretch$1(Layout),5,0,0,0),5),5,$Div(TW3MovableControl.GetHeight(Self.fLayer1Footer),3),5,$Div(TW3MovableControl.GetHeight(Self.fLayer1Footer),3)),[Layout.Left$7(Layout,Self.fLayer2PhoneLabel), Layout.Left$7(Layout,Self.fLayer2PhoneEdit), Layout.Left$7(Layout,Self.fLayer2EmailLabel), Layout.Left$7(Layout,Self.fLayer2EmailEdit)].slice());
      TW3MovableControl.SetWidth$(Self.fLayer2AddressLabel,75);
      TW3MovableControl.SetHeight$(Self.fLayer2AddressLabel,32);
      TW3Label.SetCaption$1(Self.fLayer2AddressLabel,"Address");
      TW3MovableControl.SetWidth$(Self.fLayer2AddressMemo,100);
      TW3MovableControl.SetHeight$(Self.fLayer2AddressMemo,100);
      Self.fLayer2MainLayout = Layout.Client(Layout,TLayoutConfig.Margins$(TLayoutConfig.Spacing$(Layout.Padding$4(Layout,5,0,0,0),5),5),[Layout.Top$8(Layout,Self.fLayer2AddressLabel), Layout.Client$3(Layout,Self.fLayer2AddressMemo)].slice());
   }
   /// procedure TForm1.InitializeObject()
   ///  [line: 151, column: 18, file: Form1]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3CustomForm.setCaption(Self,"W3Form");
      TW3Component.SetName(Self,"Form1");
      Self.FOnDeactivate = $Event1(Self,TForm1.Form1Deactivate);
      Self.fLayer1Header = TW3Component.Create$28$($New(TW3Panel),Self);
      Self.fLayer1Main = TW3Component.Create$28$($New(TW3Panel),Self);
      Self.fLayer1Footer = TW3Component.Create$28$($New(TW3Panel),Self);
      Self.fLayer2FirstLabel = TW3Component.Create$28$($New(TW3Label),Self.fLayer1Header);
      Self.fLayer2LastLabel = TW3Component.Create$28$($New(TW3Label),Self.fLayer1Header);
      Self.fLayer2FirstEdit = TW3Component.Create$28$($New(TW3EditBox),Self.fLayer1Header);
      Self.fLayer2LastEdit = TW3Component.Create$28$($New(TW3EditBox),Self.fLayer1Header);
      Self.fLayer2PhoneLabel = TW3Component.Create$28$($New(TW3Label),Self.fLayer1Footer);
      Self.fLayer2EmailLabel = TW3Component.Create$28$($New(TW3Label),Self.fLayer1Footer);
      Self.fLayer2PhoneEdit = TW3Component.Create$28$($New(TW3EditBox),Self.fLayer1Footer);
      Self.fLayer2EmailEdit = TW3Component.Create$28$($New(TW3EditBox),Self.fLayer1Footer);
      Self.fLayer2AddressLabel = TW3Component.Create$28$($New(TW3Label),Self.fLayer1Main);
      Self.fLayer2AddressMemo = TW3Component.Create$28$($New(TW3Memo),Self.fLayer1Main);
   }
   /// procedure TForm1.Resize()
   ///  [line: 176, column: 18, file: Form1]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.fLayer1Layout) {
         TLayout.Resize$6$(Self.fLayer1Layout,Self);
         if (Self.fLayer2HeaderLayout) {
            TLayout.Resize$6$(Self.fLayer2HeaderLayout,Self.fLayer1Header);
         }
         if (Self.fLayer2FooterLayout) {
            TLayout.Resize$6$(Self.fLayer2FooterLayout,Self.fLayer1Footer);
         }
         if (Self.fLayer2MainLayout) {
            TLayout.Resize$6$(Self.fLayer2MainLayout,Self.fLayer1Main);
         }
      }
   }
   ,Destroy:TW3CustomForm.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomForm.StyleTagObject
   ,Create$28:TW3CustomForm.Create$28
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
/// TLayoutConfig = class (TObject)
///  [line: 24, column: 3, file: SmartCL.Layout]
var TLayoutConfig = {
   $ClassName:"TLayoutConfig",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Height$8$:function($){return $.ClassType.Height$8.apply($.ClassType, arguments)}
   ,Margins$1$:function($){return $.ClassType.Margins$1.apply($.ClassType, arguments)}
   ,Margins$:function($){return $.ClassType.Margins.apply($.ClassType, arguments)}
   ,Padding$2$:function($){return $.ClassType.Padding$2.apply($.ClassType, arguments)}
   ,Padding$1$:function($){return $.ClassType.Padding$1.apply($.ClassType, arguments)}
   ,Spacing$:function($){return $.ClassType.Spacing.apply($.ClassType, arguments)}
   ,Stretch$:function($){return $.ClassType.Stretch($)}
   ,Width$10$:function($){return $.ClassType.Width$10.apply($.ClassType, arguments)}
};
/// TLayout = class (TObject)
///  [line: 35, column: 3, file: SmartCL.Layout]
var TLayout = {
   $ClassName:"TLayout",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Resize$6$:function($){return $.ClassType.Resize$6.apply($.ClassType, arguments)}
   ,Resize$5$:function($){return $.ClassType.Resize$5.apply($.ClassType, arguments)}
   ,Config$:function($){return $.ClassType.Config($)}
};
/// Layout = class (TObject)
///  [line: 44, column: 3, file: SmartCL.Layout]
var Layout = {
   $ClassName:"Layout",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function Layout.Bottom(config: TLayoutConfig; control: TObject) : TLayout
   ///  [line: 1203, column: 23, file: SmartCL.Layout]
   ,Bottom$4:function(Self, config, control$2) {
      var Result = null;
      var objArr = [];
      $ArraySetLenC(objArr,1,function (){return null});
      objArr[0]=control$2;
      Result = Layout.Bottom$3(Self,config,objArr);
      return Result
   }
   /// function Layout.Bottom(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1188, column: 23, file: SmartCL.Layout]
   ,Bottom$3:function(Self, config$1, controls$1) {
      var Result = null;
      var iControl$1 = 0;
      var inner = [];
      if (controls$1.length<=1||NotAllComponents(controls$1)) {
         Result = TLayoutImpl.Create$62($New(TLayoutImpl),3,config$1,controls$1);
      } else {
         $ArraySetLenC(inner,controls$1.length,function (){return null});
         var $temp26;
         for(iControl$1=0,$temp26=controls$1.length;iControl$1<$temp26;iControl$1++) {
            inner[(controls$1.length-1)-iControl$1]=TLayoutImpl.Create$62($New(TLayoutImpl),3,config$1,[controls$1[iControl$1]].slice());
         }
         Result = TLayoutImpl.Create$62($New(TLayoutImpl),3,config$1,inner);
      }
      return Result
   }
   /// function Layout.Client(control: TObject) : TLayout
   ///  [line: 1245, column: 23, file: SmartCL.Layout]
   ,Client$3:function(Self, control$3) {
      var Result = null;
      var objArr$1 = [];
      $ArraySetLenC(objArr$1,1,function (){return null});
      objArr$1[0]=control$3;
      Result = Layout.Client(Self,NullConfig,objArr$1);
      return Result
   }
   /// function Layout.Client(controls: TObjectArr) : TLayout
   ///  [line: 1240, column: 23, file: SmartCL.Layout]
   ,Client$2:function(Self, controls$2) {
      var Result = null;
      Result = Layout.Client(Self,NullConfig,controls$2);
      return Result
   }
   /// function Layout.Client(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1226, column: 23, file: SmartCL.Layout]
   ,Client:function(Self, config$2, controls$3) {
      var Result = null;
      Result = TLayoutImpl.Create$62($New(TLayoutImpl),4,config$2,controls$3);
      return Result
   }
   /// function Layout.Height(aHeight: Integer) : TLayoutConfig
   ///  [line: 1303, column: 23, file: SmartCL.Layout]
   ,Height$9:function(Self, aHeight$3) {
      var Result = null;
      Result = TLayoutConfig.Height$8$(TObject.Create($New(TLayoutConfigImpl)),aHeight$3);
      return Result
   }
   /// function Layout.Left(control: TObject) : TLayout
   ///  [line: 1103, column: 23, file: SmartCL.Layout]
   ,Left$7:function(Self, control$4) {
      var Result = null;
      var objArr$2 = [];
      $ArraySetLenC(objArr$2,1,function (){return null});
      objArr$2[0]=control$4;
      Result = Layout.Left$6(Self,NullConfig,objArr$2);
      return Result
   }
   /// function Layout.Left(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1074, column: 23, file: SmartCL.Layout]
   ,Left$6:function(Self, config$3, controls$4) {
      var Result = null;
      var iControl$2 = 0;
      var inner$1 = [];
      if (controls$4.length<=1||NotAllComponents(controls$4)) {
         Result = TLayoutImpl.Create$62($New(TLayoutImpl),0,config$3,controls$4);
      } else {
         $ArraySetLenC(inner$1,controls$4.length,function (){return null});
         var $temp27;
         for(iControl$2=0,$temp27=controls$4.length;iControl$2<$temp27;iControl$2++) {
            inner$1[iControl$2]=TLayoutImpl.Create$62($New(TLayoutImpl),0,config$3,[controls$4[iControl$2]].slice());
         }
         Result = TLayoutImpl.Create$62($New(TLayoutImpl),0,config$3,inner$1);
      }
      return Result
   }
   /// function Layout.Padding(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 1283, column: 23, file: SmartCL.Layout]
   ,Padding$4:function(Self, left$2, top$3, right$2, bottom$2) {
      var Result = null;
      Result = TLayoutConfig.Padding$2$(TObject.Create($New(TLayoutConfigImpl)),left$2,top$3,right$2,bottom$2);
      return Result
   }
   /// function Layout.Stretch() : TLayoutConfig
   ///  [line: 1293, column: 23, file: SmartCL.Layout]
   ,Stretch$1:function(Self) {
      var Result = null;
      Result = TLayoutConfig.Stretch$(TObject.Create($New(TLayoutConfigImpl)));
      return Result
   }
   /// function Layout.Top(control: TObject) : TLayout
   ///  [line: 1179, column: 23, file: SmartCL.Layout]
   ,Top$8:function(Self, control$5) {
      var Result = null;
      var objArr$3 = [];
      $ArraySetLenC(objArr$3,1,function (){return null});
      objArr$3[0]=control$5;
      Result = Layout.Top$5(Self,NullConfig,objArr$3);
      return Result
   }
   /// function Layout.Top(config: TLayoutConfig; control: TObject) : TLayout
   ///  [line: 1165, column: 23, file: SmartCL.Layout]
   ,Top$6:function(Self, config$4, control$6) {
      var Result = null;
      var objArr$4 = [];
      $ArraySetLenC(objArr$4,1,function (){return null});
      objArr$4[0]=control$6;
      Result = Layout.Top$5(Self,config$4,objArr$4);
      return Result
   }
   /// function Layout.Top(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1150, column: 23, file: SmartCL.Layout]
   ,Top$5:function(Self, config$5, controls$5) {
      var Result = null;
      var iControl$3 = 0;
      var inner$2 = [];
      if (controls$5.length<=1||NotAllComponents(controls$5)) {
         Result = TLayoutImpl.Create$62($New(TLayoutImpl),1,config$5,controls$5);
      } else {
         $ArraySetLenC(inner$2,controls$5.length,function (){return null});
         var $temp28;
         for(iControl$3=0,$temp28=controls$5.length;iControl$3<$temp28;iControl$3++) {
            inner$2[iControl$3]=TLayoutImpl.Create$62($New(TLayoutImpl),1,config$5,[controls$5[iControl$3]].slice());
         }
         Result = TLayoutImpl.Create$62($New(TLayoutImpl),1,config$5,inner$2);
      }
      return Result
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
///  [line: 91, column: 3, file: SmartCL.Layout]
function Copy$TLayoutRect(s,d) {
   d.Bottom$7=s.Bottom$7;
   d.Height$10=s.Height$10;
   d.Left$9=s.Left$9;
   d.Right$7=s.Right$7;
   d.Top$9=s.Top$9;
   d.Width$12=s.Width$12;
   return d;
}
function Clone$TLayoutRect($) {
   return {
      Bottom$7:$.Bottom$7,
      Height$10:$.Height$10,
      Left$9:$.Left$9,
      Right$7:$.Right$7,
      Top$9:$.Top$9,
      Width$12:$.Width$12
   }
}
/// function TLayoutRect.IsHorizontalSet(var Self: TLayoutRect) : Boolean
///  [line: 256, column: 22, file: SmartCL.Layout]
function TLayoutRect$IsHorizontalSet(Self$19) {
   var Result = false;
   Result = Self$19.Left$9!=null&&Self$19.Width$12!=null;
   return Result
}
/// function TLayoutRect.IsVerticalSet(var Self: TLayoutRect) : Boolean
///  [line: 261, column: 22, file: SmartCL.Layout]
function TLayoutRect$IsVerticalSet(Self$20) {
   var Result = false;
   Result = Self$20.Top$9!=null&&Self$20.Height$10!=null;
   return Result
}
/// procedure TLayoutRect.Resolve(var Self: TLayoutRect)
///  [line: 266, column: 23, file: SmartCL.Layout]
function TLayoutRect$Resolve(Self$21) {
   if (Self$21.Left$9==null&&Self$21.Right$7!=null&&Self$21.Width$12!=null) {
      Self$21.Left$9 = Self$21.Right$7-Self$21.Width$12;
   } else if (Self$21.Right$7==null&&Self$21.Left$9!=null&&Self$21.Width$12!=null) {
      Self$21.Right$7 = Self$21.Left$9+Self$21.Width$12;
   } else if (Self$21.Width$12==null&&Self$21.Left$9!=null&&Self$21.Right$7!=null) {
      Self$21.Width$12 = Self$21.Right$7-Self$21.Left$9;
   }
   if (Self$21.Top$9==null&&Self$21.Bottom$7!=null&&Self$21.Height$10!=null) {
      Self$21.Top$9 = Self$21.Bottom$7-Self$21.Height$10;
   } else if (Self$21.Bottom$7==null&&Self$21.Top$9!=null&&Self$21.Height$10!=null) {
      Self$21.Bottom$7 = Self$21.Top$9+Self$21.Height$10;
   } else if (Self$21.Height$10==null&&Self$21.Top$9!=null&&Self$21.Bottom$7!=null) {
      Self$21.Height$10 = Self$21.Bottom$7-Self$21.Top$9;
   }
}
/// procedure TLayoutRect.SetBounds(var Self: TLayoutRect; aLeft: Variant; aRight: Variant; aWidth: Variant; aTop: Variant; aBottom: Variant; aHeight: Variant)
///  [line: 276, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetBounds$4(Self$22, aLeft$5, aRight$1, aWidth$3, aTop$5, aBottom$1, aHeight$4) {
   Self$22.Left$9 = aLeft$5;
   Self$22.Right$7 = aRight$1;
   Self$22.Width$12 = aWidth$3;
   Self$22.Top$9 = aTop$5;
   Self$22.Bottom$7 = aBottom$1;
   Self$22.Height$10 = aHeight$4;
   TLayoutRect$Resolve(Self$22);
}
/// procedure TLayoutRect.SetFromControl(var Self: TLayoutRect; control: TW3CustomControl)
///  [line: 287, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetFromControl(Self$23, control$7) {
   TLayoutRect$SetBounds$4(Self$23,TW3MovableControl.GetLeft(control$7),null,TW3MovableControl.ClientWidth(control$7),TW3MovableControl.GetTop(control$7),null,TW3MovableControl.ClientHeight(control$7));
}
/// procedure TLayoutRect.SetFromRect(var Self: TLayoutRect; rect: TRect)
///  [line: 292, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetFromRect(Self$24, rect$2) {
   TLayoutRect$SetBounds$4(Self$24,rect$2.Left$1,null,TRect$Width$1(rect$2),rect$2.Top$1,null,TRect$Height$1(rect$2));
}
/// procedure TLayoutRect.SetHeight(var Self: TLayoutRect; value: Integer)
///  [line: 297, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetHeight$2(Self$25, value$8) {
   Self$25.Height$10 = value$8;
   TLayoutRect$Resolve(Self$25);
}
/// procedure TLayoutRect.SetLeft(var Self: TLayoutRect; value: Integer)
///  [line: 312, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetLeft$1(Self$26, value$9) {
   Self$26.Left$9 = value$9;
   TLayoutRect$Resolve(Self$26);
}
/// procedure TLayoutRect.SetTop(var Self: TLayoutRect; value: Integer)
///  [line: 324, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetTop$1(Self$27, value$10) {
   Self$27.Top$9 = value$10;
   TLayoutRect$Resolve(Self$27);
}
/// procedure TLayoutRect.SetWidth(var Self: TLayoutRect; value: Integer)
///  [line: 345, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetWidth$3(Self$28, value$11) {
   Self$28.Width$12 = value$11;
   TLayoutRect$Resolve(Self$28);
}
/// procedure TLayoutRect.Shrink(var Self: TLayoutRect; rect: TRect)
///  [line: 351, column: 23, file: SmartCL.Layout]
function TLayoutRect$Shrink(Self$29, rect$3) {
   if (Self$29.Left$9!=null) {
      Self$29.Left$9 = Self$29.Left$9+rect$3.Left$1;
   }
   if (Self$29.Right$7!=null) {
      Self$29.Right$7 = Self$29.Right$7-rect$3.Right$1;
   }
   if (Self$29.Width$12!=null) {
      Self$29.Width$12 = Self$29.Width$12-rect$3.Left$1-rect$3.Right$1;
   }
   if (Self$29.Top$9!=null) {
      Self$29.Top$9 = Self$29.Top$9+rect$3.Top$1;
   }
   if (Self$29.Bottom$7!=null) {
      Self$29.Bottom$7 = Self$29.Bottom$7-rect$3.Bottom$1;
   }
   if (Self$29.Height$10!=null) {
      Self$29.Height$10 = Self$29.Height$10-rect$3.Top$1-rect$3.Bottom$1;
   }
}
/// TLayoutImpl = class (TLayout)
///  [line: 163, column: 3, file: SmartCL.Layout]
var TLayoutImpl = {
   $ClassName:"TLayoutImpl",$Parent:TLayout
   ,$Init:function ($) {
      TLayout.$Init($);
      $.FAlign = 0;
      $.FBounds = {Bottom$7:undefined,Height$10:undefined,Left$9:undefined,Right$7:undefined,Top$9:undefined,Width$12:undefined};
      $.FClientArea = {Bottom$7:undefined,Height$10:undefined,Left$9:undefined,Right$7:undefined,Top$9:undefined,Width$12:undefined};
      $.FConfig = null;
      $.FControls = [];
      $.FName$3 = "";
   }
   /// procedure TLayoutImpl.AlignControl(control: TObject)
   ///  [line: 616, column: 23, file: SmartCL.Layout]
   ,AlignControl:function(Self, control$8) {
      TLayoutImpl.ResolveDimensionsFrom(Self,control$8);
      TLayoutImpl.ResizeControl(Self,control$8);
      if ($Is(control$8,TLayoutImpl)) {
         TLayoutImpl.InternalResize($As(control$8,TLayoutImpl),Self);
      }
      TLayoutImpl.ResolveDimensionsFrom(Self,control$8);
      TLayoutImpl.ShrinkClientArea(Self,control$8);
   }
   /// procedure TLayoutImpl.CalculateUsableArea(container: TObject)
   ///  [line: 630, column: 23, file: SmartCL.Layout]
   ,CalculateUsableArea:function(Self, container) {
      var clientArea = {Bottom$7:undefined,Height$10:undefined,Left$9:undefined,Right$7:undefined,Top$9:undefined,Width$12:undefined};
      var p1,
         p2;
      clientArea = Dimensions.GetClientArea(Dimensions,container);
      p1 = null;
      p2 = null;
      switch (Self.FAlign) {
         case 0 :
         case 2 :
            if (Self.FAlign==0) {
               p1 = clientArea.Left$9;
            } else {
               p2 = clientArea.Right$7;
            }
            TLayoutRect$SetBounds$4(Self.FBounds,p1,p2,Self.FConfig.FWidth$1,clientArea.Top$9,clientArea.Bottom$7,clientArea.Height$10);
            break;
         case 1 :
         case 3 :
            if (Self.FAlign==1) {
               p1 = clientArea.Top$9;
            } else {
               p2 = clientArea.Bottom$7;
            }
            TLayoutRect$SetBounds$4(Self.FBounds,clientArea.Left$9,clientArea.Right$7,clientArea.Width$12,p1,p2,Self.FConfig.FHeight$1);
            break;
         case 4 :
         case 5 :
            TLayoutRect$SetBounds$4(Self.FBounds,clientArea.Left$9,clientArea.Right$7,clientArea.Width$12,clientArea.Top$9,clientArea.Bottom$7,clientArea.Height$10);
            break;
      }
      TLayoutRect$Shrink(Self.FBounds,Clone$TRect(Self.FConfig.FMargins));
      Copy$TLayoutRect(Self.FBounds,Self.FClientArea);
      TLayoutRect$Shrink(Self.FClientArea,Clone$TRect(Self.FConfig.FPadding));
      TLayoutImpl.ResizeStretchedChildren(Self);
   }
   /// function TLayoutImpl.Config() : TLayoutConfig
   ///  [line: 673, column: 22, file: SmartCL.Layout]
   ,Config:function(Self) {
      var Result = null;
      Result = Self.FConfig;
      return Result
   }
   /// constructor TLayoutImpl.Create(align: TAlign; config: TLayoutConfig; controls: TObjectArr)
   ///  [line: 607, column: 25, file: SmartCL.Layout]
   ,Create$62:function(Self, align$1, config$6, controls$6) {
      Self.FAlign = align$1;
      Self.FConfig = TLayoutConfigImpl.CreateFrom($New(TLayoutConfigImpl),$As(config$6,TLayoutConfigImpl));
      Self.FControls = controls$6;
      ++LayoutCount;
      Self.FName$3 = ("Layout "+LayoutCount.toString()+" ("+AlignToString(align$1).toString()+")");
      return Self
   }
   /// procedure TLayoutImpl.InternalResize(container: TObject)
   ///  [line: 678, column: 23, file: SmartCL.Layout]
   ,InternalResize:function(Self, container$1) {
      var gotClient = false;
      var iControl$4 = 0;
      TLayoutImpl.CalculateUsableArea(Self,container$1);
      var $temp29;
      for(iControl$4=0,$temp29=Self.FControls.length;iControl$4<$temp29;iControl$4++) {
         if ($Is(Self.FControls[iControl$4],TW3CustomControl)||$As(Self.FControls[iControl$4],TLayoutImpl).FAlign!=4) {
            TLayoutImpl.AlignControl(Self,Self.FControls[iControl$4]);
         }
      }
      gotClient = false;
      var $temp30;
      for(iControl$4=0,$temp30=Self.FControls.length;iControl$4<$temp30;iControl$4++) {
         if ($Is(Self.FControls[iControl$4],TLayoutImpl)&&$As(Self.FControls[iControl$4],TLayoutImpl).FAlign==4) {
            if (gotClient) {
               throw Exception.Create($New(Exception),"Layout can contain only one client-aligned child");
            }
            gotClient = true;
            TLayoutImpl.AlignControl(Self,Self.FControls[iControl$4]);
         }
      }
   }
   /// procedure TLayoutImpl.LoggedResize(container: TObject)
   ///  [line: 728, column: 23, file: SmartCL.Layout]
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
      }
   }
   /// procedure TLayoutImpl.Resize(rect: TRect)
   ///  [line: 757, column: 23, file: SmartCL.Layout]
   ,Resize$5:function(Self, rect$4) {
      TLayoutImpl.LoggedResize(Self,TLayoutArea.Create$63($New(TLayoutArea),Clone$TRect(rect$4)));
   }
   /// procedure TLayoutImpl.Resize(container: TW3CustomControl)
   ///  [line: 752, column: 23, file: SmartCL.Layout]
   ,Resize$6:function(Self, container$3) {
      TLayoutImpl.LoggedResize(Self,container$3);
   }
   /// procedure TLayoutImpl.ResizeControl(control: TObject)
   ///  [line: 762, column: 23, file: SmartCL.Layout]
   ,ResizeControl:function(Self, control$9) {
      if ($Is(control$9,TLayoutImpl)) {
         return;
      }
      if (Self.FClientArea.Top$9!=null) {
         if (Self.FAlign==3) {
            Dimensions.SetBottom$1(Dimensions,control$9,parseInt((Self.FClientArea.Top$9+Self.FClientArea.Height$10-Dimensions.GetOwnerTop(Dimensions,control$9)),10));
         } else if (Self.FAlign!=5) {
            Dimensions.SetTop$2(Dimensions,control$9,parseInt((Self.FClientArea.Top$9-Dimensions.GetOwnerTop(Dimensions,control$9)),10));
         } else {
            Dimensions.SetTop$2(Dimensions,control$9,parseInt((Self.FClientArea.Top$9-Dimensions.GetOwnerTop(Dimensions,control$9)+($Div(Self.FClientArea.Height$10-Dimensions.GetHeight$7(Dimensions,control$9),2))),10));
         }
      }
      if (Self.FClientArea.Left$9!=null) {
         if (Self.FAlign==2) {
            Dimensions.SetRight$1(Dimensions,control$9,parseInt((Self.FClientArea.Left$9+Self.FClientArea.Width$12-Dimensions.GetOwnerLeft(Dimensions,control$9)),10));
         } else if (Self.FAlign!=5) {
            Dimensions.SetLeft$2(Dimensions,control$9,parseInt((Self.FClientArea.Left$9-Dimensions.GetOwnerLeft(Dimensions,control$9)),10));
         } else {
            Dimensions.SetLeft$2(Dimensions,control$9,parseInt((Self.FClientArea.Left$9-Dimensions.GetOwnerLeft(Dimensions,control$9)+($Div(Self.FClientArea.Width$12-Dimensions.GetWidth$8(Dimensions,control$9),2))),10));
         }
      }
      if (Self.FAlign!=5) {
         if (Self.FClientArea.Height$10!=null) {
            Dimensions.SetHeight$3(Dimensions,control$9,parseInt(Self.FClientArea.Height$10,10));
         }
         if (Self.FClientArea.Width$12!=null) {
            Dimensions.SetWidth$4(Dimensions,control$9,parseInt(Self.FClientArea.Width$12,10));
         }
      }
   }
   /// procedure TLayoutImpl.ResizeStretchedChildren()
   ///  [line: 798, column: 23, file: SmartCL.Layout]
   ,ResizeStretchedChildren:function(Self) {
      function ResizeChildren(clientSize, align$2, dimCalc, dimSet) {
         var clientSizeInt = 0;
         var countStretched = 0;
         var dim,
            iControl$5 = 0;
         var layout = null;
         if (clientSize==null) {
            return;
         }
         countStretched = 0;
         clientSizeInt = parseInt(clientSize,10);
         var $temp31;
         for(iControl$5=0,$temp31=Self.FControls.length;iControl$5<$temp31;iControl$5++) {
            if ($Is(Self.FControls[iControl$5],TLayoutImpl)) {
               layout = $As(Self.FControls[iControl$5],TLayoutImpl);
               if (align$2.indexOf(layout.FAlign)>=0) {
                  if (layout.FConfig.FStretch) {
                     ++countStretched;
                  } else {
                     dim = dimCalc(layout);
                     if (dim!=null) {
                        clientSizeInt = clientSizeInt-parseInt(dim,10);
                     }
                  }
               }
            }
         }
         clientSizeInt = clientSizeInt-Self.FConfig.FSpacing*(Self.FControls.length-1);
         var $temp32;
         for(iControl$5=0,$temp32=Self.FControls.length;iControl$5<$temp32;iControl$5++) {
            if ($Is(Self.FControls[iControl$5],TLayoutImpl)) {
               layout = $As(Self.FControls[iControl$5],TLayoutImpl);
               if (align$2.indexOf(layout.FAlign)>=0) {
                  if (layout.FConfig.FStretch) {
                     dimSet(layout,$Div(clientSizeInt,countStretched));
                     clientSizeInt = clientSizeInt-($Div(clientSizeInt,countStretched));
                     --countStretched;
                  } else {
                     dim = dimCalc(layout);
                     if (dim!=null) {
                        clientSizeInt = clientSizeInt-parseInt(dim,10);
                     }
                  }
               }
            }
         }
      };
      ResizeChildren(Self.FClientArea.Width$12,[0, 2].slice(),function (layout$1) {
         return layout$1.FConfig.FWidth$1;
      },function (layout$2, value$12) {
         TLayoutConfig.Width$10$(layout$2.FConfig,value$12);
      });
      ResizeChildren(Self.FClientArea.Height$10,[1, 3].slice(),function (layout$3) {
         return layout$3.FConfig.FHeight$1;
      },function (layout$4, value$13) {
         TLayoutConfig.Height$8$(layout$4.FConfig,value$13);
      });
   }
   /// procedure TLayoutImpl.ResolveDimensionsFrom(control: TObject)
   ///  [line: 949, column: 23, file: SmartCL.Layout]
   ,ResolveDimensionsFrom:function(Self, control$10) {
      if ((!TLayoutRect$IsHorizontalSet(Self.FClientArea))&&Dimensions.HasWidth(Dimensions,control$10)&&(Self.FAlign==0||Self.FAlign==2||Self.FAlign==4||Self.FAlign==5)) {
         TLayoutImpl.SetHorizontal$1(Self,Dimensions.GetWidth$8(Dimensions,control$10));
      }
      if ((!TLayoutRect$IsVerticalSet(Self.FClientArea))&&Dimensions.HasHeight(Dimensions,control$10)&&(Self.FAlign==1||Self.FAlign==3||Self.FAlign==4||Self.FAlign==5)) {
         TLayoutImpl.SetVertical$1(Self,Dimensions.GetHeight$7(Dimensions,control$10));
      }
   }
   /// procedure TLayoutImpl.ResolveDimensionsFromChildren()
   ///  [line: 859, column: 23, file: SmartCL.Layout]
   ,ResolveDimensionsFromChildren:function(Self) {
      var control$11 = null;
      var controlCount = 0;
      var dim$1,
         iControl$6 = 0;
      var sum;
      var $temp33;
      for(iControl$6=0,$temp33=Self.FControls.length;iControl$6<$temp33;iControl$6++) {
         if ($Is(Self.FControls[iControl$6],TLayoutImpl)) {
            TLayoutImpl.ResolveDimensionsFromChildren($As(Self.FControls[iControl$6],TLayoutImpl));
         }
      }
      if (Self.FAlign==5&&Self.FConfig.FWidth$1!=null&&Self.FConfig.FHeight$1!=null) {
         return;
      }
      if (Self.FAlign==4||(Self.FAlign==0||Self.FAlign==2)&&Self.FConfig.FWidth$1!=null||(Self.FAlign==1||Self.FAlign==3)&&Self.FConfig.FHeight$1!=null) {
         return;
      }
      if (Self.FAlign!=5) {
         sum = 0;
         controlCount = 0;
         var $temp34;
         for(iControl$6=0,$temp34=Self.FControls.length;iControl$6<$temp34;iControl$6++) {
            control$11 = Self.FControls[iControl$6];
            switch (Self.FAlign) {
               case 0 :
               case 2 :
                  dim$1 = Dimensions.GetWidth$8(Dimensions,control$11);
                  break;
               case 1 :
               case 3 :
                  dim$1 = Dimensions.GetHeight$7(Dimensions,control$11);
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
         sum = Dimensions.GetWidth$8(Dimensions,Self.FControls[0]);
      }
      if (sum!=null&&Self.FConfig.FWidth$1==null&&(Self.FAlign==0||Self.FAlign==2||Self.FAlign==5)) {
         sum = sum+Self.FConfig.FPadding.Left$1+Self.FConfig.FPadding.Right$1+Self.FConfig.FMargins.Left$1+Self.FConfig.FMargins.Right$1;
         TLayoutConfig.Width$10$(Self.FConfig,parseInt(sum,10));
      }
      if (Self.FAlign==5) {
         sum = Dimensions.GetHeight$7(Dimensions,Self.FControls[0]);
      }
      if (sum!=null&&Self.FConfig.FHeight$1==null&&(Self.FAlign==1||Self.FAlign==3||Self.FAlign==5)) {
         sum = sum+Self.FConfig.FPadding.Top$1+Self.FConfig.FPadding.Bottom$1+Self.FConfig.FMargins.Top$1+Self.FConfig.FMargins.Bottom$1;
         TLayoutConfig.Height$8$(Self.FConfig,parseInt(sum,10));
      }
   }
   /// procedure TLayoutImpl.SetHorizontal(clientWidth: Variant)
   ///  [line: 971, column: 23, file: SmartCL.Layout]
   ,SetHorizontal$1:function(Self, clientWidth) {
      TLayoutRect$SetWidth$3(Self.FClientArea,parseInt(clientWidth,10));
      if (clientWidth!=null) {
         clientWidth = clientWidth+Self.FConfig.FPadding.Left$1+Self.FConfig.FPadding.Right$1;
      }
      TLayoutRect$SetWidth$3(Self.FBounds,parseInt(clientWidth,10));
   }
   /// procedure TLayoutImpl.SetVertical(clientHeight: Variant)
   ///  [line: 980, column: 23, file: SmartCL.Layout]
   ,SetVertical$1:function(Self, clientHeight) {
      TLayoutRect$SetHeight$2(Self.FClientArea,parseInt(clientHeight,10));
      if (clientHeight!=null) {
         clientHeight = clientHeight+Self.FConfig.FPadding.Top$1+Self.FConfig.FPadding.Bottom$1;
      }
      TLayoutRect$SetHeight$2(Self.FBounds,parseInt(clientHeight,10));
   }
   /// procedure TLayoutImpl.ShrinkClientArea(control: TObject)
   ///  [line: 989, column: 23, file: SmartCL.Layout]
   ,ShrinkClientArea:function(Self, control$12) {
      var align$3 = 0;
      var height$13,
         width$14;
      if ($Is(control$12,TLayoutImpl)) {
         align$3 = $As(control$12,TLayoutImpl).FAlign;
      } else {
         align$3 = Self.FAlign;
      }
      switch (align$3) {
         case 0 :
            width$14 = Dimensions.GetWidth$8(Dimensions,control$12);
            $Assert(width$14!=null,"width = Null","");
            $Assert(Self.FClientArea.Left$9!=null,"FClientArea.Left = Null","");
            $Assert(Dimensions.GetLeft$1(Dimensions,control$12)+Dimensions.GetOwnerLeft(Dimensions,control$12)==Self.FClientArea.Left$9,("Dimensions.GetLeft("+NameOf(control$12).toString()+")["+VarToString(Dimensions.GetLeft$1(Dimensions,control$12)).toString()+"] + Dimensions.GetOwnerLeft("+NameOf(control$12).toString()+")["+Dimensions.GetOwnerLeft(Dimensions,control$12).toString()+"] <> FClientArea.Left["+VarToString(Self.FClientArea.Left$9).toString()+"]"),"");
            Self.FClientArea.Left$9 = Self.FClientArea.Left$9+width$14+Self.FConfig.FSpacing;
            Self.FClientArea.Width$12 = Self.FClientArea.Width$12-width$14-Self.FConfig.FSpacing;
            break;
         case 1 :
            height$13 = Dimensions.GetHeight$7(Dimensions,control$12);
            $Assert(height$13!=null,"height = Null","");
            $Assert(Self.FClientArea.Top$9!=null,"FClientArea.Top = Null","");
            $Assert(Dimensions.GetTop$1(Dimensions,control$12)+Dimensions.GetOwnerTop(Dimensions,control$12)==Self.FClientArea.Top$9,("Dimensions.GetTop(["+NameOf(control$12).toString()+"])["+VarToString(Dimensions.GetTop$1(Dimensions,control$12)).toString()+"] + Dimensions.GetOwnerTop("+NameOf(control$12).toString()+")["+Dimensions.GetOwnerTop(Dimensions,control$12).toString()+"] <> FClientArea.Top["+VarToString(Self.FClientArea.Top$9).toString()+"]"),"");
            Self.FClientArea.Top$9 = Self.FClientArea.Top$9+height$13+Self.FConfig.FSpacing;
            Self.FClientArea.Height$10 = Self.FClientArea.Height$10-height$13-Self.FConfig.FSpacing;
            break;
         case 2 :
            width$14 = Dimensions.GetWidth$8(Dimensions,control$12);
            $Assert(width$14!=null,"width = Null","");
            $Assert(Self.FClientArea.Left$9!=null,"FClientArea.Left = Null","");
            $Assert(Self.FClientArea.Width$12!=null,"FClientArea.Width = Null","");
            $Assert(Dimensions.GetLeft$1(Dimensions,control$12)+Dimensions.GetOwnerLeft(Dimensions,control$12)==Self.FClientArea.Left$9+Self.FClientArea.Width$12-width$14,("Dimensions.GetLeft("+NameOf(control$12).toString()+")["+VarToString(Dimensions.GetLeft$1(Dimensions,control$12)).toString()+"] + Dimensions.GetOwnerLeft("+NameOf(control$12).toString()+")["+Dimensions.GetOwnerLeft(Dimensions,control$12).toString()+"] <> (FClientArea.Left["+VarToString(Self.FClientArea.Left$9).toString()+"] + FClientArea.Width["+VarToString(Self.FClientArea.Width$12).toString()+"] - width["+VarToString(width$14).toString()+"])"),"");
            Self.FClientArea.Right$7 = Self.FClientArea.Right$7-width$14-Self.FConfig.FSpacing;
            Self.FClientArea.Width$12 = Self.FClientArea.Width$12-width$14-Self.FConfig.FSpacing;
            break;
         case 3 :
            height$13 = Dimensions.GetHeight$7(Dimensions,control$12);
            $Assert(height$13!=null,"height = Null","");
            $Assert(Self.FClientArea.Top$9!=null,"FClientArea.Top = Null","");
            $Assert(Self.FClientArea.Height$10!=null,"FClientArea.Height = Null","");
            $Assert(Dimensions.GetTop$1(Dimensions,control$12)+Dimensions.GetOwnerTop(Dimensions,control$12)==Self.FClientArea.Top$9+Self.FClientArea.Height$10-height$13,("Dimensions.GetTop("+NameOf(control$12).toString()+")["+VarToString(Dimensions.GetTop$1(Dimensions,control$12)).toString()+"] + Dimensions.GetOwnerTop(control) <> (FClientArea.Top["+NameOf(control$12).toString()+"] + FClientArea.Height["+Dimensions.GetOwnerTop(Dimensions,control$12).toString()+"] - height["+VarToString(Self.FClientArea.Top$9).toString()+"])"),"");
            Self.FClientArea.Bottom$7 = Self.FClientArea.Bottom$7-height$13-Self.FConfig.FSpacing;
            Self.FClientArea.Height$10 = Self.FClientArea.Height$10-height$13-Self.FConfig.FSpacing;
            break;
         case 4 :
            TLayoutRect$SetBounds$4(Self.FClientArea,0,0,0,-1,-1,-1);
            break;
      }
   }
   ,Destroy:TObject.Destroy
   ,Resize$6$:function($){return $.ClassType.Resize$6.apply($.ClassType, arguments)}
   ,Resize$5$:function($){return $.ClassType.Resize$5.apply($.ClassType, arguments)}
   ,Config$:function($){return $.ClassType.Config($)}
};
/// TLayoutConfigImpl = class (TLayoutConfig)
///  [line: 137, column: 3, file: SmartCL.Layout]
var TLayoutConfigImpl = {
   $ClassName:"TLayoutConfigImpl",$Parent:TLayoutConfig
   ,$Init:function ($) {
      TLayoutConfig.$Init($);
      $.FHeight$1 = $.FWidth$1 = undefined;
      $.FMargins = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      $.FPadding = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      $.FSpacing = 0;
      $.FStretch = false;
   }
   /// constructor TLayoutConfigImpl.CreateFrom(conf: TLayoutConfigImpl)
   ///  [line: 543, column: 31, file: SmartCL.Layout]
   ,CreateFrom:function(Self, conf) {
      Self.FHeight$1 = conf.FHeight$1;
      Copy$TRect(conf.FMargins,Self.FMargins);
      Copy$TRect(conf.FPadding,Self.FPadding);
      Self.FSpacing = conf.FSpacing;
      Self.FStretch = conf.FStretch;
      Self.FWidth$1 = conf.FWidth$1;
      return Self
   }
   /// function TLayoutConfigImpl.Height(aHeight: Integer) : TLayoutConfig
   ///  [line: 599, column: 28, file: SmartCL.Layout]
   ,Height$8:function(Self, aHeight$5) {
      var Result = null;
      Self.FHeight$1 = aHeight$5;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Margins(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 564, column: 28, file: SmartCL.Layout]
   ,Margins$1:function(Self, left$3, top$4, right$3, bottom$3) {
      var Result = null;
      Self.FMargins = Create$14(left$3,top$4,right$3,bottom$3);
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Margins(value: Integer) : TLayoutConfig
   ///  [line: 559, column: 28, file: SmartCL.Layout]
   ,Margins:function(Self, value$14) {
      var Result = null;
      Result = TLayoutConfig.Margins$1$(Self,value$14,value$14,value$14,value$14);
      return Result
   }
   /// function TLayoutConfigImpl.Padding(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 575, column: 28, file: SmartCL.Layout]
   ,Padding$2:function(Self, left$4, top$5, right$4, bottom$4) {
      var Result = null;
      Self.FPadding = Create$14(left$4,top$5,right$4,bottom$4);
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Padding(value: Integer) : TLayoutConfig
   ///  [line: 570, column: 28, file: SmartCL.Layout]
   ,Padding$1:function(Self, value$15) {
      var Result = null;
      Result = TLayoutConfig.Padding$2$(Self,value$15,value$15,value$15,value$15);
      return Result
   }
   /// function TLayoutConfigImpl.Spacing(distance: Integer) : TLayoutConfig
   ///  [line: 581, column: 28, file: SmartCL.Layout]
   ,Spacing:function(Self, distance) {
      var Result = null;
      Self.FSpacing = distance;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Stretch() : TLayoutConfig
   ///  [line: 587, column: 28, file: SmartCL.Layout]
   ,Stretch:function(Self) {
      var Result = null;
      Self.FStretch = true;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Width(aWidth: Integer) : TLayoutConfig
   ///  [line: 593, column: 28, file: SmartCL.Layout]
   ,Width$10:function(Self, aWidth$4) {
      var Result = null;
      Self.FWidth$1 = aWidth$4;
      Result = Self;
      return Result
   }
   ,Destroy:TObject.Destroy
   ,Height$8$:function($){return $.ClassType.Height$8.apply($.ClassType, arguments)}
   ,Margins$1$:function($){return $.ClassType.Margins$1.apply($.ClassType, arguments)}
   ,Margins$:function($){return $.ClassType.Margins.apply($.ClassType, arguments)}
   ,Padding$2$:function($){return $.ClassType.Padding$2.apply($.ClassType, arguments)}
   ,Padding$1$:function($){return $.ClassType.Padding$1.apply($.ClassType, arguments)}
   ,Spacing$:function($){return $.ClassType.Spacing.apply($.ClassType, arguments)}
   ,Stretch$:function($){return $.ClassType.Stretch($)}
   ,Width$10$:function($){return $.ClassType.Width$10.apply($.ClassType, arguments)}
};
/// TLayoutArea = class (TObject)
///  [line: 83, column: 3, file: SmartCL.Layout]
var TLayoutArea = {
   $ClassName:"TLayoutArea",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FRect = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
   }
   /// constructor TLayoutArea.Create(rect: TRect)
   ///  [line: 232, column: 25, file: SmartCL.Layout]
   ,Create$63:function(Self, rect$5) {
      TObject.Create(Self);
      Copy$TRect(rect$5,Self.FRect);
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TAlign enumeration
///  [line: 81, column: 3, file: SmartCL.Layout]
var TAlign = [ "Left", "Top", "Right", "Bottom", "Client", "Center" ];
function NotAllComponents(controls$7) {
   var Result = false;
   var iControl = 0;
   Result = true;
   var $temp35;
   for(iControl=0,$temp35=controls$7.length;iControl<$temp35;iControl++) {
      if (!$Is(controls$7[iControl],TW3CustomControl)) {
         return Result;
      }
   }
   Result = false;
   return Result
};
function NameOf(control$13) {
   var Result = "";
   if ($Is(control$13,TLayoutImpl)) {
      Result = $As(control$13,TLayoutImpl).FName$3;
   } else {
      Result = $As(control$13,TW3CustomControl).FName;
   }
   return Result
};
/// Dimensions = class (TObject)
///  [line: 117, column: 3, file: SmartCL.Layout]
var Dimensions = {
   $ClassName:"Dimensions",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function Dimensions.GetClientArea(control: TObject) : TLayoutRect
   ///  [line: 377, column: 27, file: SmartCL.Layout]
   ,GetClientArea:function(Self, control$14) {
      var Result = {Bottom$7:undefined,Height$10:undefined,Left$9:undefined,Right$7:undefined,Top$9:undefined,Width$12:undefined};
      if ($Is(control$14,TLayoutImpl)) {
         Copy$TLayoutRect($As(control$14,TLayoutImpl).FClientArea,Result);
      } else if ($Is(control$14,TLayoutArea)) {
         TLayoutRect$SetFromRect(Result,Clone$TRect($As(control$14,TLayoutArea).FRect));
      } else {
         TLayoutRect$SetFromControl(Result,$As(control$14,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetHeight(control: TObject) : Variant
   ///  [line: 387, column: 27, file: SmartCL.Layout]
   ,GetHeight$7:function(Self, control$15) {
      var Result = undefined;
      if ($Is(control$15,TLayoutImpl)) {
         Result = $As(control$15,TLayoutImpl).FBounds.Height$10;
         if (Result==null) {
            Result = $As(control$15,TLayoutImpl).FConfig.FHeight$1;
         }
         if (Result!=null) {
            Result = Result+$As(control$15,TLayoutImpl).FConfig.FMargins.Top$1+$As(control$15,TLayoutImpl).FConfig.FMargins.Bottom$1;
         }
      } else if (TW3MovableControl.GetVisible($As(control$15,TW3CustomControl))) {
         Result = TW3MovableControl.GetHeight($As(control$15,TW3CustomControl));
      } else {
         Result = 0;
      }
      return Result
   }
   /// function Dimensions.GetLeft(control: TObject) : Variant
   ///  [line: 404, column: 27, file: SmartCL.Layout]
   ,GetLeft$1:function(Self, control$16) {
      var Result = undefined;
      if ($Is(control$16,TLayoutImpl)) {
         Result = $As(control$16,TLayoutImpl).FBounds.Left$9-$As(control$16,TLayoutImpl).FConfig.FMargins.Left$1;
      } else {
         Result = TW3MovableControl.GetLeft($As(control$16,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetOwnerLeft(control: TObject) : Variant
   ///  [line: 413, column: 27, file: SmartCL.Layout]
   ,GetOwnerLeft:function(Self, control$17) {
      var Result = undefined;
      Result = 0;
      if ($Is(control$17,TW3MovableControl)) {
         control$17 = $As(control$17,TW3MovableControl).FParent;
         if ((control$17!==null)&&$Is(control$17,TW3MovableControl)) {
            Result = TW3MovableControl.GetLeft($As(control$17,TW3MovableControl));
         }
      }
      return Result
   }
   /// function Dimensions.GetOwnerTop(control: TObject) : Variant
   ///  [line: 423, column: 27, file: SmartCL.Layout]
   ,GetOwnerTop:function(Self, control$18) {
      var Result = undefined;
      Result = 0;
      if ($Is(control$18,TW3MovableControl)) {
         control$18 = $As(control$18,TW3MovableControl).FParent;
         if ((control$18!==null)&&$Is(control$18,TW3MovableControl)) {
            Result = TW3MovableControl.GetTop($As(control$18,TW3MovableControl));
         }
      }
      return Result
   }
   /// function Dimensions.GetTop(control: TObject) : Variant
   ///  [line: 438, column: 27, file: SmartCL.Layout]
   ,GetTop$1:function(Self, control$19) {
      var Result = undefined;
      if ($Is(control$19,TLayoutImpl)) {
         Result = $As(control$19,TLayoutImpl).FBounds.Top$9-$As(control$19,TLayoutImpl).FConfig.FMargins.Top$1;
      } else {
         Result = TW3MovableControl.GetTop($As(control$19,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetWidth(control: TObject) : Variant
   ///  [line: 452, column: 27, file: SmartCL.Layout]
   ,GetWidth$8:function(Self, control$20) {
      var Result = undefined;
      if ($Is(control$20,TLayoutImpl)) {
         Result = $As(control$20,TLayoutImpl).FBounds.Width$12;
         if (Result==null) {
            Result = $As(control$20,TLayoutImpl).FConfig.FWidth$1;
         }
         if (Result!=null) {
            Result = Result+$As(control$20,TLayoutImpl).FConfig.FMargins.Left$1+$As(control$20,TLayoutImpl).FConfig.FMargins.Right$1;
         }
      } else if (TW3MovableControl.GetVisible($As(control$20,TW3CustomControl))) {
         Result = TW3MovableControl.GetWidth($As(control$20,TW3CustomControl));
      } else {
         Result = 0;
      }
      return Result
   }
   /// function Dimensions.HasHeight(control: TObject) : Boolean
   ///  [line: 469, column: 27, file: SmartCL.Layout]
   ,HasHeight:function(Self, control$21) {
      var Result = false;
      Result = true;
      if ($Is(control$21,TLayoutImpl)) {
         Result = $As(control$21,TLayoutImpl).FBounds.Height$10!=null;
      }
      return Result
   }
   /// function Dimensions.HasWidth(control: TObject) : Boolean
   ///  [line: 476, column: 27, file: SmartCL.Layout]
   ,HasWidth:function(Self, control$22) {
      var Result = false;
      Result = true;
      if ($Is(control$22,TLayoutImpl)) {
         Result = $As(control$22,TLayoutImpl).FBounds.Width$12!=null;
      }
      return Result
   }
   /// procedure Dimensions.SetBottom(control: TObject; value: Integer)
   ///  [line: 521, column: 28, file: SmartCL.Layout]
   ,SetBottom$1:function(Self, control$23, value$16) {
      if ($Is(control$23,TLayoutImpl)) {
         TLayoutRect$SetTop$1($As(control$23,TLayoutImpl).FBounds,parseInt((value$16-$As(control$23,TLayoutImpl).FConfig.FMargins.Bottom$1-$As(control$23,TLayoutImpl).FBounds.Height$10),10));
      } else {
         TW3MovableControl.SetTop($As(control$23,TW3CustomControl),(value$16-TW3MovableControl.GetHeight($As(control$23,TW3CustomControl))));
      }
   }
   /// procedure Dimensions.SetHeight(control: TObject; value: Integer)
   ///  [line: 483, column: 28, file: SmartCL.Layout]
   ,SetHeight$3:function(Self, control$24, value$17) {
      if ($Is(control$24,TLayoutImpl)) {
         TLayoutRect$SetHeight$2($As(control$24,TLayoutImpl).FBounds,value$17-$As(control$24,TLayoutImpl).FConfig.FMargins.Top$1-$As(control$24,TLayoutImpl).FConfig.FMargins.Bottom$1);
      } else {
         TW3MovableControl.SetHeight$($As(control$24,TW3CustomControl),value$17);
      }
   }
   /// procedure Dimensions.SetLeft(control: TObject; value: Integer)
   ///  [line: 493, column: 28, file: SmartCL.Layout]
   ,SetLeft$2:function(Self, control$25, value$18) {
      if ($Is(control$25,TLayoutImpl)) {
         TLayoutRect$SetLeft$1($As(control$25,TLayoutImpl).FBounds,value$18+$As(control$25,TLayoutImpl).FConfig.FMargins.Left$1);
      } else {
         TW3MovableControl.SetLeft($As(control$25,TW3CustomControl),value$18);
      }
   }
   /// procedure Dimensions.SetRight(control: TObject; value: Integer)
   ///  [line: 502, column: 28, file: SmartCL.Layout]
   ,SetRight$1:function(Self, control$26, value$19) {
      if ($Is(control$26,TLayoutImpl)) {
         TLayoutRect$SetLeft$1($As(control$26,TLayoutImpl).FBounds,parseInt((value$19-$As(control$26,TLayoutImpl).FConfig.FMargins.Right$1-$As(control$26,TLayoutImpl).FBounds.Width$12),10));
      } else {
         TW3MovableControl.SetLeft($As(control$26,TW3CustomControl),(value$19-TW3MovableControl.GetWidth($As(control$26,TW3CustomControl))));
      }
   }
   /// procedure Dimensions.SetTop(control: TObject; value: Integer)
   ///  [line: 512, column: 28, file: SmartCL.Layout]
   ,SetTop$2:function(Self, control$27, value$20) {
      if ($Is(control$27,TLayoutImpl)) {
         TLayoutRect$SetTop$1($As(control$27,TLayoutImpl).FBounds,value$20+$As(control$27,TLayoutImpl).FConfig.FMargins.Top$1);
      } else {
         TW3MovableControl.SetTop($As(control$27,TW3CustomControl),value$20);
      }
   }
   /// procedure Dimensions.SetWidth(control: TObject; value: Integer)
   ///  [line: 531, column: 28, file: SmartCL.Layout]
   ,SetWidth$4:function(Self, control$28, value$21) {
      if ($Is(control$28,TLayoutImpl)) {
         TLayoutRect$SetWidth$3($As(control$28,TLayoutImpl).FBounds,value$21-$As(control$28,TLayoutImpl).FConfig.FMargins.Left$1-$As(control$28,TLayoutImpl).FConfig.FMargins.Right$1);
      } else {
         TW3MovableControl.SetWidth$($As(control$28,TW3CustomControl),value$21);
      }
   }
   ,Destroy:TObject.Destroy
};
function AlignToString(align$4) {
   var Result = "";
   switch (align$4) {
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
///  [line: 18, column: 3, file: SmartCL.Controls.Panel]
var TW3CustomPanel = {
   $ClassName:"TW3CustomPanel",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3Panel = class (TW3CustomPanel)
///  [line: 21, column: 3, file: SmartCL.Controls.Panel]
var TW3Panel = {
   $ClassName:"TW3Panel",$Parent:TW3CustomPanel
   ,$Init:function ($) {
      TW3CustomPanel.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3InputType enumeration
///  [line: 17, column: 3, file: SmartCL.Controls.EditBox]
var TW3InputType = [ "itNone", "itColor", "itDate", "itDateTime", "itDateTimeLocal", "itEmail", "itMonth", "itNumber", "itRange", "itSearch", "itTel", "itTime", "itUrl", "itWeek", "itPassword", "itFile" ];
/// TW3EditBox = class (TW3CustomControl)
///  [line: 21, column: 3, file: SmartCL.Controls.EditBox]
var TW3EditBox = {
   $ClassName:"TW3EditBox",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// function TW3EditBox.getAutoCapitalize() : Boolean
   ///  [line: 253, column: 21, file: SmartCL.Controls.EditBox]
   ,getAutoCapitalize:function(Self) {
      var Result = false;
      var mTemp$2 = "";
      Result = false;
      mTemp$2 = w3_getAttribAsStr(Self.FHandle,"autocapitalize");
      if (mTemp$2.length>0) {
         Result = (mTemp$2).toLowerCase()=="on";
      }
      return Result
   }
   /// function TW3EditBox.getAutoCorrect() : Boolean
   ///  [line: 230, column: 21, file: SmartCL.Controls.EditBox]
   ,getAutoCorrect:function(Self) {
      var Result = false;
      var mTemp$3 = "";
      Result = false;
      mTemp$3 = w3_getAttribAsStr(Self.FHandle,"autocorrect");
      if (mTemp$3.length>0) {
         Result = (mTemp$3).toLowerCase()=="on";
      }
      return Result
   }
   /// function TW3EditBox.getPlaceHolder() : String
   ///  [line: 216, column: 21, file: SmartCL.Controls.EditBox]
   ,getPlaceHolder:function(Self) {
      var Result = "";
      Result = w3_getAttribAsStr(Self.FHandle,"placeholder");
      return Result
   }
   /// function TW3EditBox.getRange() : Variant
   ///  [line: 145, column: 21, file: SmartCL.Controls.EditBox]
   ,getRange:function(Self) {
      var Result = undefined;
      if (Self.FHandle) {
         Result = Self.FHandle.value;
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.getRange", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
      return Result
   }
   /// function TW3EditBox.getText() : String
   ///  [line: 275, column: 21, file: SmartCL.Controls.EditBox]
   ,getText$1:function(Self) {
      var Result = "";
      Result = w3_getPropertyAsStr(Self.FHandle,"value");
      return Result
   }
   /// function TW3EditBox.getTextAlign() : TTextAlign
   ///  [line: 82, column: 21, file: SmartCL.Controls.EditBox]
   ,getTextAlign:function(Self) {
      var Result = 0;
      var mText$3 = "";
      mText$3 = (w3_getStyleAsStr(Self.FHandle,"textAlign")).toLowerCase();
      if (mText$3=="left") {
         Result = 0;
      } else if (mText$3=="center") {
         Result = 1;
      } else if (mText$3=="right") {
         Result = 2;
      }
      return Result
   }
   /// function TW3EditBox.getType() : TW3InputType
   ///  [line: 163, column: 21, file: SmartCL.Controls.EditBox]
   ,getType:function(Self) {
      var Result = 0;
      var mText$4 = "";
      mText$4 = (w3_getAttribAsStr(Self.FHandle,"type")).toLowerCase();
      if (mText$4=="") {
         Result = 0;
      } else if (mText$4=="color") {
         Result = 1;
      } else if (mText$4=="date") {
         Result = 2;
      } else if (mText$4=="datetime") {
         Result = 3;
      } else if (mText$4=="datetime-local") {
         Result = 4;
      } else if (mText$4=="email") {
         Result = 5;
      } else if (mText$4=="month") {
         Result = 6;
      } else if (mText$4=="number") {
         Result = 7;
      } else if (mText$4=="range") {
         Result = 8;
      } else if (mText$4=="search") {
         Result = 9;
      } else if (mText$4=="tel") {
         Result = 10;
      } else if (mText$4=="time") {
         Result = 11;
      } else if (mText$4=="url") {
         Result = 12;
      } else if (mText$4=="week") {
         Result = 13;
      } else if (mText$4=="password") {
         Result = 14;
      }
      if (mText$4=="file") {
         Result = 15;
      }
      return Result
   }
   /// function TW3EditBox.makeElementTagObj() : THandle
   ///  [line: 65, column: 21, file: SmartCL.Controls.EditBox]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = w3_createHtmlElement("input");
      if (Result) {
         w3_setAttrib(Result,"type","text");
      }
      return Result
   }
   /// procedure TW3EditBox.setAutoCapitalize(const aValue: Boolean)
   ///  [line: 263, column: 22, file: SmartCL.Controls.EditBox]
   ,setAutoCapitalize:function(Self, aValue$60) {
      if (Self.FHandle) {
         switch (aValue$60) {
            case false :
               w3_setAttrib(Self.FHandle,"autocapitalize","off");
               break;
            case true :
               w3_setAttrib(Self.FHandle,"autocapitalize","on");
               break;
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.setAutoCapitalize", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
   }
   /// procedure TW3EditBox.setAutoCorrect(const aValue: Boolean)
   ///  [line: 240, column: 22, file: SmartCL.Controls.EditBox]
   ,setAutoCorrect:function(Self, aValue$61) {
      if (Self.FHandle) {
         switch (aValue$61) {
            case false :
               w3_setAttrib(Self.FHandle,"autocorrect","off");
               break;
            case true :
               w3_setAttrib(Self.FHandle,"autocorrect","on");
               break;
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.setAutoCorrect", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
   }
   /// procedure TW3EditBox.setPlaceHolder(const aValue: String)
   ///  [line: 221, column: 22, file: SmartCL.Controls.EditBox]
   ,setPlaceHolder:function(Self, aValue$62) {
      if (Self.FHandle) {
         w3_setAttrib(Self.FHandle,"placeholder",aValue$62);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.setPlaceHolder", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
   }
   /// procedure TW3EditBox.setRange(const aValue: Variant)
   ///  [line: 154, column: 22, file: SmartCL.Controls.EditBox]
   ,setRange:function(Self, aValue$63) {
      if (Self.FHandle) {
         Self.FHandle.value = aValue$63;
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.setRange", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
   }
   /// procedure TW3EditBox.setText(aValue: String)
   ///  [line: 280, column: 22, file: SmartCL.Controls.EditBox]
   ,setText$1:function(Self, aValue$64) {
      w3_setProperty(Self.FHandle,"value",aValue$64);
   }
   /// procedure TW3EditBox.setTextAlign(const aValue: TTextAlign)
   ///  [line: 92, column: 22, file: SmartCL.Controls.EditBox]
   ,setTextAlign:function(Self, aValue$65) {
      var mToWrite = "";
      switch (aValue$65) {
         case 0 :
            mToWrite = "left";
            break;
         case 1 :
            mToWrite = "center";
            break;
         case 2 :
            mToWrite = "right";
            break;
      }
      if (Self.FHandle) {
         w3_setStyle(Self.FHandle,"textAlign",mToWrite);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.setTextAlign", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
   }
   /// procedure TW3EditBox.setType(const aValue: TW3InputType)
   ///  [line: 186, column: 22, file: SmartCL.Controls.EditBox]
   ,setType:function(Self, aValue$66) {
      var mToWrite$1 = "";
      if (Self.FHandle) {
         switch (aValue$66) {
            case 0 :
               mToWrite$1 = "";
               break;
            case 1 :
               mToWrite$1 = "color";
               break;
            case 2 :
               mToWrite$1 = "date";
               break;
            case 3 :
               mToWrite$1 = "datetime";
               break;
            case 4 :
               mToWrite$1 = "datetime-local";
               break;
            case 5 :
               mToWrite$1 = "email";
               break;
            case 6 :
               mToWrite$1 = "month";
               break;
            case 7 :
               mToWrite$1 = "number";
               break;
            case 8 :
               mToWrite$1 = "range";
               break;
            case 9 :
               mToWrite$1 = "search";
               break;
            case 10 :
               mToWrite$1 = "tel";
               break;
            case 11 :
               mToWrite$1 = "time";
               break;
            case 12 :
               mToWrite$1 = "url";
               break;
            case 13 :
               mToWrite$1 = "week";
               break;
            case 14 :
               mToWrite$1 = "password";
               break;
            case 15 :
               mToWrite$1 = "file";
               break;
         }
         w3_setAttrib(Self.FHandle,"type",mToWrite$1);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3EditBox.setType", TObject.ClassName(Self.ClassType), "Invalid handle error"]);
      }
   }
   /// procedure TW3EditBox.StyleTagObject()
   ///  [line: 73, column: 22, file: SmartCL.Controls.EditBox]
   ,StyleTagObject:function(Self) {
      w3_setAttrib(Self.FHandle,"autocorrect","off");
      w3_setAttrib(Self.FHandle,"autocapitalize","off");
      w3_setAttrib(Self.FHandle,"placeholder","");
      w3_setStyle(Self.FHandle,"textAlign","left");
      TW3CustomControl.StyleTagObject(Self);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3MemoScrollbarOption enumeration
///  [line: 17, column: 3, file: SmartCL.Controls.Memo]
var TW3MemoScrollbarOption = [ "soNone", "soAuto", "soScroll" ];
/// TW3Memo = class (TW3CustomControl)
///  [line: 19, column: 3, file: SmartCL.Controls.Memo]
var TW3Memo = {
   $ClassName:"TW3Memo",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// function TW3Memo.getText() : String
   ///  [line: 109, column: 18, file: SmartCL.Controls.Memo]
   ,getText:function(Self) {
      var Result = "";
      if (Self.FHandle) {
         if (Self.FHandle.value) {
            Result = w3_getPropertyAsStr(Self.FHandle,"value");
         }
      }
      return Result
   }
   /// function TW3Memo.makeElementTagObj() : THandle
   ///  [line: 43, column: 18, file: SmartCL.Controls.Memo]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = w3_createHtmlElement("textarea");
      return Result
   }
   /// procedure TW3Memo.setText(aValue: String)
   ///  [line: 104, column: 19, file: SmartCL.Controls.Memo]
   ,setText:function(Self, aValue$67) {
      Self.FHandle.value = aValue$67;
   }
   /// procedure TW3Memo.StyleTagObject()
   ///  [line: 48, column: 19, file: SmartCL.Controls.Memo]
   ,StyleTagObject:function(Self) {
      TW3CustomControl.StyleTagObject(Self);
      w3_setStyle(Self.FHandle,"overflow","scroll");
      w3_setStyle(Self.FHandle,"overflow-x","scroll");
      w3_setStyle(Self.FHandle,"overflow-y","scroll");
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$28:TW3CustomControl.Create$28
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
var vColorNames = [],
   vColorNames = ["aqua", "black", "blue", "fuchsia", "green", "gray", "lime", "maroon", "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"].slice();
var vColorValues = [],
   vColorValues = ["#0ff", "#000", "#00f", "#f0f", "#008000", "#808080", "#0f0", "#800000", "#000080", "#808000", "#800080", "#f00", "#c0c0c0", "#008080", "#fff", "#ff00"].slice();
var vCurrent = null;
var vScheduledControls = [],
   vScheduledCallbacks = [],
   vOnPerform = [],
   vPending = false;
var RegisterComponentsProc = null;
var DefaultDuration = 0,
   DefaultDuration = 2;
var DefaultTiming = 0,
   DefaultTiming = 1;
var vGetNow,
   vIsHighResolution = false;
var PressedCSSClass = "",
   PressedCSSClass = "TW3Button_Pressed";
var Instance = null;
var Application$1 = null;
var NullConfig = null,
   Logger = "";
var LayoutCount = 0;
var NullConfig = TObject.Create($New(TLayoutConfigImpl));
var GForms = null;
var vCaptureControl = null;
var vCaptureInitialized = false;
var _FontDetect = null;
var vUniqueNumber = 0;
var vVendor = 0;
var vDriver = null;
var vRequestAnimFrame = null;
var vCancelAnimFrame = null;
TApplicationFormsList.RegisterForm(Forms$2(),"Form1",TForm1);
TApplicationFormsList.RegisterAutoCreate(Forms$2(),"Form1",true,true);
var $Application = function() {
   try {
      Application$1 = TW3CustomApplication.Create$3($New(TApplication));
      TW3CustomApplication.RunApp(Application$1);
   } catch ($e) {
      var e$13 = $W($e);
      alert(e$13.FMessage)   }
}
$Application();
var $Application = function() {
   if (_FontDetect) {
      TObject.Free(_FontDetect);
   }
}
$Application();

