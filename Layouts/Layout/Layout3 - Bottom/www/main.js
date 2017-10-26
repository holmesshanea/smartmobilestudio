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
	"Structure %s error, method %s.%s threw exception [%s] error",
	"Structure storage failed, structure contains function reference error",
	"Structure storage failed, structure contains symbol reference error",
	"Structure storage failed, structure contains uknown datatype error",
	"Failed to read structure, method %s.%s threw exception [%s] error",
	"Failed to write structure, method %s.%s threw exception [%s] error",
	"Structure data contains invalid or damaged data signature error",
	"Handle reference is null error",
	"Failed to create html element",
	"Invalid html element handle error",
	"Invalid html element attributename error",
	"Invalid html element propertyname error",
	"Invalid html element stylename error",
	"Failed to attach html element to owner",
	"Owner element handle is null error",
	"invalid owner handle error",
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
	"Read failed, invalid offset [%d], expected %d..%d",
	"Write operation failed, target stream is nil error",
	"Read operation failed, source stream is nil error",
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
function $Event2(i,f) {
	var li=i,lf=f;
	return function(a,b) {
		return lf.call(li,li,a,b)
	}
}
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
function $Event(i,f) {
	var li=i,lf=f;
	return function(){
		var arg=Array.prototype.slice.call(arguments);
		arg.unshift(li);
		return lf.apply(li,arg)
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
function WriteLnF(Text$3, Values$7) {
   var FormText = "";
   try {
      FormText = Format(Text$3,Values$7.slice(0));
      console.log(FormText);
   } catch ($e) {
      var e$1 = $W($e);
      /* null */
   }
};
function WriteLn(value$16) {
   var items$1 = [],
      a$168 = 0;
   var litem = "";
   if (window.console) {
      if (TW3VariantHelper$Isstring(value$16)) {
         if (((String(value$16)).indexOf("\r")+1)>0) {
            items$1 = TString.Explode(TString,(String(value$16)),"\r");
            var $temp1;
            for(a$168=0,$temp1=items$1.length;a$168<$temp1;a$168++) {
               litem = items$1[a$168];
               window.console.log(litem);
            }
            return;
         }
      }
      window.console.log(value$16);
   }
};
function w3_SetStyle(tagRef, aStyleName, aStyleValue) {
   tagRef.style[aStyleName] = aStyleValue;
};
function w3_setElementParentByRef(aElement, aParent) {
   aParent.appendChild(aElement);
};
function w3_setAttrib(tagRef$1, aAttribName, aValue) {
   tagRef$1.setAttribute(aAttribName,aValue);
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
function w3_RegisterBrowserAPI(BrowserAPIDriver) {
   vDriver = BrowserAPIDriver;
};
function w3_NameToUrlStr(aUrl) {
   return "url("+aUrl+")";
};
function w3_GetStyleAsStr(tagRef$2, aStyleName$1) {
   var Result = "";
   var mObj = undefined;
   var mData;
   mObj   = document.defaultView.getComputedStyle(tagRef$2, null);

    if (mObj)
      mData = (mObj).getPropertyValue(aStyleName$1);

    if (mData == null) {
      mData = (tagRef$2).style[aStyleName$1];
    }

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
function w3_GetStyleAsInt(tagRef$3, aStyleName$2) {
   var Result = 0;
   var mObj$1 = undefined;
   var mData$1;
   mObj$1 = document.defaultView.getComputedStyle(tagRef$3,null);

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
function w3_GetStyleAsFloat(tagRef$4, aStyleName$3) {
   var Result = 0;
   var mObj$2 = undefined;
   var mData$2;
   mObj$2 = document.defaultView.getComputedStyle(tagRef$4,null);

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
function w3_GetStyle(tagRef$5, aStyleName$4) {
   var Result = undefined;
   var mObj$3 = undefined;
   mObj$3   = document.defaultView.getComputedStyle(tagRef$5,null);
    if (mObj$3)
    Result = (mObj$3).getPropertyValue(aStyleName$4);
   return Result
};
function w3_getPropertyAsInt(tagRef$6, aPropName) {
   return parseInt(tagRef$6[aPropName],10);
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
function w3_getAttribAsStr(tagRef$7, aAttribName$1) {
   return String(tagRef$7.getAttribute(aAttribName$1,0));
};
function w3_createHtmlElement(aTypeName) {
   return document.createElement(aTypeName);
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
///  [line: 180, column: 3, file: SmartCL.System]
var TW3CustomBrowserAPI = {
   $ClassName:"TW3CustomBrowserAPI",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCSSAnimation = $.FCSSBackgroundColor = $.FCSSBackgroundImage = $.FCSSBackgroundPos = $.FCSSBackgroundSize = $.FCSSToken = $.FCSSTransform = "";
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 215, column: 46, file: SmartCL.System]
   ,a$34:function(Self) {
      return event;
   }
   /// function TW3CustomBrowserAPI.DevicePixelRatio() : Float
   ///  [line: 944, column: 36, file: SmartCL.System]
   ,DevicePixelRatio:function() {
      var Result = 0;
      Result = window.devicePixelRatio || 1;
      return Result
   }
   /// function TW3CustomBrowserAPI.Prefix(const aCSS: String) : String
   ///  [line: 951, column: 30, file: SmartCL.System]
   ,Prefix:function(Self, aCSS) {
      return Self.FCSSToken+aCSS;
   }
   /// function TW3CustomBrowserAPI.PrefixDef(const aCss: String) : String
   ///  [line: 956, column: 30, file: SmartCL.System]
   ,PrefixDef:function(Self, aCss) {
      return "-"+Self.FCSSToken+"-"+aCss;
   }
   ,Destroy:TObject.Destroy
};
/// TW3WebkitBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 233, column: 3, file: SmartCL.System]
var TW3WebkitBrowserAPI = {
   $ClassName:"TW3WebkitBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3WebkitBrowserAPI.Create()
   ///  [line: 995, column: 33, file: SmartCL.System]
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
///  [line: 84, column: 3, file: SmartCL.System]
var TW3URLObject = {
   $ClassName:"TW3URLObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3URLObject.RevokeObjectURL(const ObjectUrl: String)
   ///  [line: 635, column: 30, file: SmartCL.System]
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
///  [line: 244, column: 3, file: SmartCL.System]
var TW3OperaBrowserAPI = {
   $ClassName:"TW3OperaBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3OperaBrowserAPI.Create()
   ///  [line: 980, column: 32, file: SmartCL.System]
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
///  [line: 137, column: 3, file: SmartCL.System]
var TW3MouseCursor = {
   $ClassName:"TW3MouseCursor",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3MouseCursor.CursorByName(const CursorName: String) : TCursor
   ///  [line: 831, column: 31, file: SmartCL.System]
   ,CursorByName:function(Self, CursorName) {
      return TVariant.AsInteger(__CURSOR_NAME_LUT[(Trim$_String_(CursorName)).toLocaleLowerCase()]);
   }
   /// function TW3MouseCursor.NameByCursor(const Cursor: TCursor) : String
   ///  [line: 836, column: 31, file: SmartCL.System]
   ,NameByCursor:function(Self, Cursor$1) {
      return TVariant.AsString(__CURSOR_DATA_LUT[Cursor$1]);
   }
   /// function TW3MouseCursor.GetCursorFromElement(const Handle: TControlHandle) : TCursor
   ///  [line: 841, column: 31, file: SmartCL.System]
   ,GetCursorFromElement:function(Self, Handle$14) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Handle$14)) {
         if (Handle$14.style["cursor"]) {
            Result = TW3MouseCursor.CursorByName(Self,(String(Handle$14.style["cursor"])));
         } else {
            Result = 1;
         }
      }
      return Result
   }
   /// procedure TW3MouseCursor.SetCursorForElement(const Handle: TControlHandle; const Cursor: TCursor)
   ///  [line: 852, column: 32, file: SmartCL.System]
   ,SetCursorForElement:function(Self, Handle$15, Cursor$2) {
      if (TControlHandleHelper$Valid$2(Handle$15)) {
         Handle$15.style["cursor"] = TW3MouseCursor.NameByCursor(Self,Cursor$2);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3IEBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 249, column: 3, file: SmartCL.System]
var TW3IEBrowserAPI = {
   $ClassName:"TW3IEBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3IEBrowserAPI.Create()
   ///  [line: 965, column: 29, file: SmartCL.System]
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
/// TW3FirefoxBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 239, column: 3, file: SmartCL.System]
var TW3FirefoxBrowserAPI = {
   $ClassName:"TW3FirefoxBrowserAPI",$Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3FirefoxBrowserAPI.Create()
   ///  [line: 1010, column: 34, file: SmartCL.System]
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
///  [line: 147, column: 3, file: SmartCL.System]
var TW3EventManagerTypes = { 1:"ekMouseDown", 2:"ekMouseMove", 3:"ekMouseUp", 4:"ekTouchBegin", 5:"ekTouchMove", 6:"ekTouchEnd", 7:"ekClick", 8:"ekMouseEnter", 9:"ekMouseExit", 10:"ekMouseWheel", 11:"ekDoubleClick" };
/// TW3DOMEventMode enumeration
///  [line: 98, column: 3, file: SmartCL.System]
var TW3DOMEventMode = [ "dmCapture", "dmBubble" ];
/// TW3DOMEventAPI = class (TObject)
///  [line: 102, column: 3, file: SmartCL.System]
var TW3DOMEventAPI = {
   $ClassName:"TW3DOMEventAPI",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3DOMEventAPI.EventObject(const e: Variant) : JEvent
   ///  [line: 384, column: 31, file: SmartCL.System]
   ,EventObject$1:function(e$2) {
      var Result = null;
      Result = e$2 || window.event;
      return Result
   }
   /// procedure TW3DOMEventAPI.RegisterEvent(Handle: TControlHandle; EventName: String; EventHandler: TW3JSEventHandler; Mode: TW3DOMEventMode)
   ///  [line: 391, column: 32, file: SmartCL.System]
   ,RegisterEvent:function(Handle$16, EventName$1, EventHandler, Mode$1) {
      if (Handle$16) {
         if (Handle$16.addEventListener) {
            Handle$16.addEventListener(EventName$1,EventHandler,(Mode$1==0));
         } else {
            Handle$16.attachEvent("on"+EventName$1,EventHandler,(Mode$1==0));
         }
      } else {
         throw Exception.Create($New(Exception),"Register event failed, invalid handle error");
      }
   }
   /// procedure TW3DOMEventAPI.UnRegisterEvent(Handle: TControlHandle; EventName: String; EventHandler: TW3JSEventHandler; Mode: TW3DOMEventMode)
   ///  [line: 418, column: 32, file: SmartCL.System]
   ,UnRegisterEvent:function(Handle$17, EventName$2, EventHandler$1, Mode$2) {
      if (Handle$17) {
         if (Handle$17.removeEventListener) {
            Handle$17.removeEventListener(EventName$2,EventHandler$1,(Mode$2==0));
         } else {
            Handle$17.detachEvent("on"+EventName$2,EventHandler$1,(Mode$2==0));
         }
      } else {
         throw Exception.Create($New(Exception),"Unregister event failed, invalid handle error");
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomDeviceCapabilities = class (TObject)
///  [line: 261, column: 3, file: System.Types]
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
///  [line: 166, column: 3, file: SmartCL.System]
var TW3DOMDeviceCapabilities = {
   $ClassName:"TW3DOMDeviceCapabilities",$Parent:TW3CustomDeviceCapabilities
   ,$Init:function ($) {
      TW3CustomDeviceCapabilities.$Init($);
   }
   /// function TW3DOMDeviceCapabilities.GetGamePadSupport() : Boolean
   ///  [line: 803, column: 35, file: SmartCL.System]
   ,GetGamePadSupport:function(Self) {
      var Result = false;
      var LNavigator = undefined;
      LNavigator = navigator;
      Result = ((LNavigator.getGamepads||LNavigator.webkitGetGamepads||LNavigator.mozGetGamepads||LNavigator.msGetGamepads)?true:false);
      return Result
   }
   /// function TW3DOMDeviceCapabilities.GetKeyboardSupported() : Boolean
   ///  [line: 812, column: 35, file: SmartCL.System]
   ,GetKeyboardSupported:function(Self) {
      return true;
   }
   /// function TW3DOMDeviceCapabilities.GetMouseSupport() : Boolean
   ///  [line: 753, column: 35, file: SmartCL.System]
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
   ///  [line: 770, column: 35, file: SmartCL.System]
   ,GetTouchSupport:function(Self) {
      var Result = false;
      try {
         document.createEvent("TouchEvent");
         Result = true;
      } catch ($e) {
         var e$3 = $W($e);
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
///  [line: 337, column: 3, file: SmartCL.System]
var TW3BrowserVendor = [ "bvUnknown", "bviOS", "bvAndroid", "bvChrome", "bvSafari", "bvFirefox", "bvOpera", "bvIE" ];
/// TPixelsPerInch = record
///  [line: 161, column: 3, file: SmartCL.System]
function Copy$TPixelsPerInch(s,d) {
   return d;
}
function Clone$TPixelsPerInch($) {
   return {

   }
}
/// TCursor enumeration
///  [line: 114, column: 3, file: SmartCL.System]
var TCursor = [ "crAuto", "crDefault", "crInherited", "crURL", "crCrossHair", "crHelp", "crMove", "crPointer", "crProgress", "crText", "crWait", "crNResize", "crSResize", "crEResize", "crWResize", "crNEResize", "crNWResize", "crNSResize", "crSEResize", "crSWResize", "crEWResize" ];
/// function TControlHandleHelper.Equals(const Self: TControlHandle; const Source: TControlHandle) : Boolean
///  [line: 1666, column: 31, file: SmartCL.System]
function TControlHandleHelper$Equals$3(Self$2, Source) {
   var Result = false;
   Result = (Self$2 == Source);
   return Result
}
/// function TControlHandleHelper.GetChildren(const Self: TControlHandle) : TControlHandleArray
///  [line: 1499, column: 31, file: SmartCL.System]
function TControlHandleHelper$GetChildren(Self$3) {
   var Result = [];
   var x$34 = 0;
   var LCount = 0;
   var LLongs = 0;
   var LSingles = 0;
   Result.length=0;
   x$34 = 0;
   LCount = parseInt(Self$3.children.length,10);
   if (LCount<1) {
      return Result;
   }
   LLongs = LCount>>>3;
   LSingles = LCount%8;
   while (LLongs>0) {
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      Result.push(Self$3.children[x$34]);
      ++x$34;
      --LLongs;
   }
   switch (LSingles) {
      case 1 :
         Result.push(Self$3.children[x$34]);
         break;
      case 2 :
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         break;
      case 3 :
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         break;
      case 4 :
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         break;
      case 5 :
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         break;
      case 6 :
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         break;
      case 7 :
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         ++x$34;
         Result.push(Self$3.children[x$34]);
         break;
   }
   return Result
}
/// function TControlHandleHelper.Ready(const Self: TControlHandle) : Boolean
///  [line: 1594, column: 31, file: SmartCL.System]
function TControlHandleHelper$Ready$2(Self$4) {
   var Result = false;
   Result = document.body.contains(Self$4);
   return Result
}
/// procedure TControlHandleHelper.ReadyExecute(const Self: TControlHandle; const OnReady: TProcedureRef)
///  [line: 1650, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecute(Self$5, OnReady) {
   var LExists = false;
   LExists = document.body.contains(Self$5);
   if (LExists) {
      OnReady();
   } else {
      TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
         TControlHandleHelper$ReadyExecute(Self$5,OnReady);
      },100);
   }
}
/// procedure TControlHandleHelper.ReadyExecuteAnimFrame(const Self: TControlHandle; const OnReady: TProcedureRef)
///  [line: 1616, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecuteAnimFrame(Self$6, OnReady$1) {
   var LExists$1 = false;
   LExists$1 = document.body.contains(Self$6);
   if (LExists$1) {
      TW3Dispatch.RequestAnimationFrame(TW3Dispatch,OnReady$1);
   } else {
      TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
         TControlHandleHelper$ReadyExecuteAnimFrame(Self$6,OnReady$1);
      },100);
   }
}
/// procedure TControlHandleHelper.ReadyExecuteEx(const Self: TControlHandle; const Tag: TObject; const OnReady: TProcedureRefO)
///  [line: 1634, column: 32, file: SmartCL.System]
function TControlHandleHelper$ReadyExecuteEx(Self$7, Tag, OnReady$2) {
   var LExists$2 = false;
   LExists$2 = document.body.contains(Self$7);
   if (LExists$2) {
      OnReady$2(Tag);
   } else {
      TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
         TControlHandleHelper$ReadyExecuteEx(Self$7,Tag,OnReady$2);
      },100);
   }
}
/// function TControlHandleHelper.Valid(const Self: TControlHandle) : Boolean
///  [line: 1458, column: 32, file: SmartCL.System]
function TControlHandleHelper$Valid$2(Self$8) {
   return (Self$8?true:false);
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
///  [line: 1406, column: 27, file: System.Types]
function TW3VariantHelper$DataType(Self$9) {
   var Result = 1;
   var LType = "";
   if (TW3VariantHelper$Valid$3(Self$9)) {
      LType = typeof(Self$9);
      {var $temp2 = (LType).toLocaleLowerCase();
         if ($temp2=="object") {
            if (!Self$9.length) {
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
            if (Math.round(Number(Self$9))!=Self$9) {
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
   } else if (Self$9==null) {
      Result = 10;
   } else {
      Result = 1;
   }
   return Result
}
/// function TW3VariantHelper.Defined(const Self: Variant) : Boolean
///  [line: 1375, column: 27, file: System.Types]
function TW3VariantHelper$Defined(Self$10) {
   var Result = false;
   Result = !(Self$10 == undefined);
   return Result
}
/// function TW3VariantHelper.IsObject(const Self: Variant) : Boolean
///  [line: 1453, column: 27, file: System.Types]
function TW3VariantHelper$IsObject(Self$11) {
   var Result = false;
   Result = ((Self$11) !== undefined)
      && (Self$11 !== null)
      && (typeof Self$11  === "object")
      && ((Self$11).length === undefined);
   return Result
}
/// function TW3VariantHelper.Isstring(const Self: Variant) : Boolean
///  [line: 1490, column: 27, file: System.Types]
function TW3VariantHelper$Isstring(Self$12) {
   var Result = false;
   Result = (Self$12 !== undefined)
      && (Self$12 !== null)
      && (typeof Self$12  === "string");
   return Result
}
/// function TW3VariantHelper.Valid(const Self: Variant) : Boolean
///  [line: 1361, column: 27, file: System.Types]
function TW3VariantHelper$Valid$3(Self$13) {
   var Result = false;
   Result = !( (Self$13 == undefined) || (Self$13 == null) );
   return Result
}
/// TW3VariantDataType enumeration
///  [line: 401, column: 3, file: System.Types]
var TW3VariantDataType = { 1:"vdUnknown", 2:"vdBoolean", 3:"vdinteger", 4:"vdfloat", 5:"vdstring", 6:"vdSymbol", 7:"vdFunction", 8:"vdObject", 9:"vdArray", 10:"vdVariant" };
/// TW3OwnedObject = class (TObject)
///  [line: 247, column: 3, file: System.Types]
var TW3OwnedObject = {
   $ClassName:"TW3OwnedObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOwner = null;
   }
   /// function TW3OwnedObject.GetOwner() : TObject
   ///  [line: 758, column: 26, file: System.Types]
   ,GetOwner:function(Self) {
      return Self.FOwner;
   }
   /// procedure TW3OwnedObject.SetOwner(const NewOwner: TObject)
   ///  [line: 768, column: 26, file: System.Types]
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
   ///  [line: 763, column: 25, file: System.Types]
   ,AcceptOwner:function(Self, CandidateObject) {
      return true;
   }
   /// constructor TW3OwnedObject.Create(const AOwner: TObject)
   ///  [line: 752, column: 28, file: System.Types]
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
///  [line: 170, column: 3, file: System.Types]
var TW3Identifiers = {
   $ClassName:"TW3Identifiers",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3Identifiers.GenerateUniqueComponentName() : String
   ///  [line: 1295, column: 31, file: System.Types]
   ,GenerateUniqueComponentName$1:function(Self) {
      var Result = "";
      ++__UNIQUE;
      Result = "Component"+__UNIQUE.toString();
      return Result
   }
   /// function TW3Identifiers.GenerateUniqueObjectId() : String
   ///  [line: 1289, column: 31, file: System.Types]
   ,GenerateUniqueObjectId:function(Self) {
      var Result = "";
      ++__UNIQUE;
      Result = "OBJ"+__UNIQUE.toString();
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TVariant = class (TObject)
///  [line: 353, column: 3, file: System.Types]
var TVariant = {
   $ClassName:"TVariant",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TVariant.AsBool(const aValue: Variant) : Boolean
   ///  [line: 1807, column: 25, file: System.Types]
   ,AsBool:function(aValue$1) {
      var Result = false;
      if (aValue$1!=undefined&&aValue$1!=null) {
         Result = (aValue$1?true:false);
      }
      return Result
   }
   /// function TVariant.AsFloat(const aValue: Variant) : Float
   ///  [line: 1790, column: 25, file: System.Types]
   ,AsFloat:function(aValue$2) {
      var Result = 0;
      if (aValue$2!=undefined&&aValue$2!=null) {
         Result = Number(aValue$2);
      }
      return Result
   }
   /// function TVariant.AsInteger(const aValue: Variant) : Integer
   ///  [line: 1776, column: 25, file: System.Types]
   ,AsInteger:function(aValue$3) {
      var Result = 0;
      if (aValue$3!=undefined&&aValue$3!=null) {
         Result = parseInt(aValue$3,10);
      }
      return Result
   }
   /// function TVariant.AsObject(const aValue: Variant) : TObject
   ///  [line: 1797, column: 25, file: System.Types]
   ,AsObject:function(aValue$4) {
      var Result = null;
      if (aValue$4!=undefined&&aValue$4!=null) {
         Result = aValue$4;
      }
      return Result
   }
   /// function TVariant.AsString(const aValue: Variant) : String
   ///  [line: 1783, column: 25, file: System.Types]
   ,AsString:function(aValue$5) {
      var Result = "";
      if (aValue$5!=undefined&&aValue$5!=null) {
         Result = String(aValue$5);
      }
      return Result
   }
   /// function TVariant.CreateObject() : Variant
   ///  [line: 1814, column: 25, file: System.Types]
   ,CreateObject:function() {
      var Result = undefined;
      Result = new Object();
      return Result
   }
   /// procedure TVariant.ForEachProperty(const Data: Variant; const CallBack: TW3ObjectKeyCallback)
   ///  [line: 1898, column: 26, file: System.Types]
   ,ForEachProperty:function(Data$2, CallBack$1) {
      var LObj = {};
      var Keys$1 = [],
         a$169 = 0;
      var LName = "";
      if (CallBack$1) {
         Keys$1 = TVariant.Properties(Data$2);
         var $temp3;
         for(a$169=0,$temp3=Keys$1.length;a$169<$temp3;a$169++) {
            LName = Keys$1[a$169];
            LObj = Keys$1[LName];
            if (CallBack$1(LName,LObj)==1) {
               Data$2[LName] = LObj.v;
            } else {
               break;
            }
         }
      }
   }
   /// function TVariant.IsNAN(const aValue: Variant) : Boolean
   ///  [line: 1862, column: 25, file: System.Types]
   ,IsNAN:function(aValue$6) {
      return isNaN(Number(aValue$6));
   }
   /// function TVariant.IsNumber(const aValue: Variant) : Boolean
   ///  [line: 1843, column: 25, file: System.Types]
   ,IsNumber:function(aValue$7) {
      return typeof(aValue$7)==__TYPE_MAP.Number$1;
   }
   /// function TVariant.IsString(const aValue: Variant) : Boolean
   ///  [line: 1838, column: 25, file: System.Types]
   ,IsString:function(aValue$8) {
      return typeof(aValue$8)==__TYPE_MAP.String$1;
   }
   /// function TVariant.Properties(const Data: Variant) : TStrArray
   ///  [line: 1922, column: 25, file: System.Types]
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
   ///  [line: 1771, column: 25, file: System.Types]
   ,ValidRef:function(aValue$9) {
      return aValue$9!=undefined&&aValue$9!=null;
   }
   ,Destroy:TObject.Destroy
};
/// TTextFormation enumeration
///  [line: 139, column: 3, file: System.Types]
var TTextFormation = { 256:"tfHex", 257:"tfOrdinal", 258:"tfFloat", 259:"tfQuote" };
/// function TStringHelper.ContainsHex(const Self: String) : Boolean
///  [line: 1232, column: 24, file: System.Types]
function TStringHelper$ContainsHex(Self$14) {
   var Result = false;
   var x$35 = 0;
   var LStart = 0;
   var LItem = "";
   var LLen = 0;
   Result = false;
   LLen = Self$14.length;
   if (LLen>=1) {
      LStart = 1;
      if (Self$14.charAt(0)=="$") {
         ++LStart;
         --LLen;
      } else {
         LItem = (Self$14.substr(0,1)).toLocaleUpperCase();
         Result = ("0123456789ABCDEF".indexOf(LItem)+1)>0;
         if (!Result) {
            return Result;
         }
      }
      if (LLen>=1) {
         var $temp4;
         for(x$35=LStart,$temp4=Self$14.length;x$35<=$temp4;x$35++) {
            LItem = (Self$14.charAt(x$35-1)).toLocaleUpperCase();
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
///  [line: 1210, column: 24, file: System.Types]
function TStringHelper$ContainsOrdinal(Self$15) {
   var Result = false;
   var x$36 = 0;
   var LItem$1 = "";
   var LLen$1 = 0;
   Result = false;
   LLen$1 = Self$15.length;
   if (LLen$1>=1) {
      var $temp5;
      for(x$36=1,$temp5=LLen$1;x$36<=$temp5;x$36++) {
         LItem$1 = Self$15.charAt(x$36-1);
         Result = ("0123456789".indexOf(LItem$1)+1)>0;
         if (!Result) {
            break;
         }
      }
   }
   return Result
}
/// function TStringHelper.ContainsFloat(const Self: String) : Boolean
///  [line: 1155, column: 24, file: System.Types]
function TStringHelper$ContainsFloat(Self$16) {
   var Result = false;
   var x$37 = 0;
   var LItem$2 = "";
   var LLen$2 = 0;
   var LLine = false;
   Result = false;
   LLen$2 = Self$16.length;
   if (LLen$2>=1) {
      LLine = false;
      var $temp6;
      for(x$37=1,$temp6=LLen$2;x$37<=$temp6;x$37++) {
         LItem$2 = Self$16.charAt(x$37-1);
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
///  [line: 1074, column: 24, file: System.Types]
function TStringHelper$ContainsQuote(Self$17) {
   var Result = false;
   var LLen$3 = 0;
   var LStart$1 = 0;
   var LFound = false;
   var LQuote = ["",""];
   Result = false;
   LLen$3 = Self$17.length;
   if (LLen$3>=2) {
      LStart$1 = 1;
      while (LStart$1<=LLen$3) {
         if (Self$17.charAt(LStart$1-1)==" ") {
            ++LStart$1;
            continue;
         } else {
            break;
         }
      }
      LQuote[false?1:0] = "'";
      LQuote[true?1:0] = "\"";
      if (Self$17.charAt(LStart$1-1)!=LQuote[true?1:0]||Self$17.charAt(LStart$1-1)!=LQuote[false?1:0]) {
         return Result;
      }
      if (LStart$1>=LLen$3) {
         return Result;
      }
      ++LStart$1;
      LFound = false;
      while (LStart$1<=LLen$3) {
         if (Self$17.charAt(LStart$1-1)!=LQuote[true?1:0]||Self$17.charAt(LStart$1-1)!=LQuote[false?1:0]) {
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
         if (Self$17.charAt(LStart$1-1)!=" ") {
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
///  [line: 447, column: 3, file: System.Types]
var TString = {
   $ClassName:"TString",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TString.CharCodeFor(const Character: Char) : Integer
   ///  [line: 806, column: 24, file: System.Types]
   ,CharCodeFor:function(Self, Character) {
      var Result = 0;
      Result = (Character).charCodeAt(0);
      return Result
   }
   /// function TString.DecodeBase64(TextToDecode: String) : String
   ///  [line: 1048, column: 24, file: System.Types]
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
   ///  [line: 989, column: 24, file: System.Types]
   ,DecodeURI:function(Self, Text$4) {
      var Result = "";
      Result = (Text$4).replace(new RegExp('\\+','g'),' ');
    Result = unescape(Result);
      return Result
   }
   /// function TString.DecodeUTF8(const BytesToDecode: TByteArray) : String
   ///  [line: 944, column: 24, file: System.Types]
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
   ///  [line: 1036, column: 24, file: System.Types]
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
   ///  [line: 973, column: 24, file: System.Types]
   ,EncodeURI:function(Self, Text$5) {
      var Result = "";
      Result = escape(Text);
    Result = (Result).replace(new RegExp('\\+','g'),'%2B');
    Result = (Result).replace(new RegExp('%20','g'),'+');
      return Result
   }
   /// function TString.EncodeUTF8(TextToEncode: String) : TByteArray
   ///  [line: 915, column: 24, file: System.Types]
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
   ///  [line: 785, column: 24, file: System.Types]
   ,Explode:function(Self, Value, Delimiter) {
      var Result = [];
      Result = (Value).split(Delimiter);
      return Result
   }
   /// function TString.ForEach(const Text: String; const Callback: TW3StringEvaluationProc) : String
   ///  [line: 1018, column: 24, file: System.Types]
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
   ///  [line: 824, column: 24, file: System.Types]
   ,FromCharCode:function(Self, CharCode$1) {
      var Result = "";
      Result = String.fromCharCode(CharCode$1);
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TInteger = class (TObject)
///  [line: 303, column: 3, file: System.Types]
var TInteger = {
   $ClassName:"TInteger",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TInteger.Diff(const Primary: Integer; const Secondary: Integer) : Integer
   ///  [line: 1660, column: 25, file: System.Types]
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
   ///  [line: 1614, column: 25, file: System.Types]
   ,EnsureRange:function(aValue$10, aMin, aMax) {
      return ClampInt(aValue$10,aMin,aMax);
   }
   /// function TInteger.FromPxStr(const aValue: String) : Integer
   ///  [line: 1554, column: 25, file: System.Types]
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
   ///  [line: 1586, column: 25, file: System.Types]
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
   ///  [line: 1645, column: 25, file: System.Types]
   ,ToNearest:function(Value$1, Factor) {
      var Result = 0;
      var FTemp = 0;
      Result = Value$1;
      FTemp = Value$1%Factor;
      if (FTemp>0) {
         (Result+= (Factor-FTemp));
      }
      return Result
   }
   /// function TInteger.ToPxStr(const aValue: Integer) : String
   ///  [line: 1564, column: 25, file: System.Types]
   ,ToPxStr:function(aValue$12) {
      return aValue$12.toString()+"px";
   }
   /// function TInteger.WrapRange(const aValue: Integer; const aLowRange: Integer; const aHighRange: Integer) : Integer
   ///  [line: 1628, column: 25, file: System.Types]
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
///  [line: 1311, column: 24, file: System.Types]
function THandleHelper$Valid$4(Self$18) {
   var Result = false;
   Result = !( (Self$18 == undefined) || (Self$18 == null) );
   return Result
}
/// TFileAccessMode enumeration
///  [line: 79, column: 3, file: System.Types]
var TFileAccessMode = [ "fmOpenRead", "fmOpenWrite", "fmOpenReadWrite" ];
/// TEnumState enumeration
///  [line: 73, column: 3, file: System.Types]
var TEnumState = { 1:"esContinue", 0:"esAbort" };
/// TEnumResult enumeration
///  [line: 57, column: 3, file: System.Types]
var TEnumResult = { 160:"erContinue", 16:"erBreak" };
/// TDataTypeMap = record
///  [line: 343, column: 3, file: System.Types]
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
/// EW3Exception = class (Exception)
///  [line: 163, column: 3, file: System.Types]
var EW3Exception = {
   $ClassName:"EW3Exception",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   /// constructor EW3Exception.CreateFmt(aText: String; const aValues: array of const)
   ///  [line: 1343, column: 26, file: System.Types]
   ,CreateFmt:function(Self, aText, aValues) {
      Exception.Create(Self,Format(aText,aValues.slice(0)));
      return Self
   }
   /// constructor EW3Exception.Create(const MethodName: String; const Instance: TObject; const ErrorText: String)
   ///  [line: 1348, column: 26, file: System.Types]
   ,Create$17:function(Self, MethodName, Instance$3, ErrorText) {
      var LCallerName = "";
      LCallerName = (Instance$3)?TObject.ClassName(Instance$3.ClassType):"Anonymous";
      EW3Exception.CreateFmt(Self,$R[0],[MethodName, LCallerName, ErrorText]);
      return Self
   }
   ,Destroy:Exception.Destroy
};
/// EW3OwnedObject = class (EW3Exception)
///  [line: 238, column: 3, file: System.Types]
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
/// TW3Dispatch = class (TObject)
///  [line: 1201, column: 3, file: SmartCL.Components]
var TW3Dispatch = {
   $ClassName:"TW3Dispatch",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3Dispatch.Execute(const EntryPoint: TProcedureRef; const WaitForInMs: Integer) : TW3DispatchHandle
   ///  [line: 242, column: 28, file: System.Time]
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
   ///  [line: 250, column: 29, file: System.Time]
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
   /// function TW3Dispatch.SetTimeOut(const Entrypoint: TProcedureRef; const WaitForInMs: Integer) : TW3DispatchHandle
   ///  [line: 189, column: 28, file: System.Time]
   ,SetTimeOut:function(Self, Entrypoint$3, WaitForInMs$1) {
      var Result = undefined;
      Result = setTimeout(Entrypoint$3,WaitForInMs$1);
      return Result
   }
   /// procedure TW3Dispatch.WaitFor(const Controls: array of TW3MovableControl; const CB: TProcedureRef)
   ///  [line: 1245, column: 29, file: SmartCL.Components]
   ,WaitFor:function(Self, Controls, CB) {
      var LReady = 0,
         a$170 = 0;
      var LChild = null,
         LElement = undefined,
         style$8;
      if (Controls.length>0) {
         if (CB) {
            LReady = 0;
            var $temp9;
            for(a$170=0,$temp9=Controls.length;a$170<$temp9;a$170++) {
               LChild = Controls[a$170];
               if (!LChild) {
                  continue;
               }
               LElement = LChild.FHandle$3;
               if (TControlHandleHelper$Ready$2(LElement)) {
                  if ($SetIn(LChild.FComponentState,3,0,9)) {
                     style$8 = window.getComputedStyle(LElement);
                     if (style$8&&style$8.display&&style$8.display!="none") {
                        ++LReady;
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
   ///  [line: 589, column: 26, file: System.Types.Convert]
   ,BooleanToBytes:function(Self, Value$2) {
      var Result = [];
      if (Value$2) {
         Result.push(1);
      } else {
         Result.push(0);
      }
      return Result
   }
   /// function TDatatype.BytesToBase64(const Bytes: TByteArray) : String
   ///  [line: 299, column: 26, file: System.Types.Convert]
   ,BytesToBase64:function(Self, Bytes$1) {
      var Result = "";
      var binary = '';
    var bytes = new Uint8Array( Bytes$1 );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    Result = btoa( binary );
      return Result
   }
   /// function TDatatype.BytesToBoolean(const Data: TByteArray) : Boolean
   ///  [line: 801, column: 26, file: System.Types.Convert]
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
   ///  [line: 769, column: 26, file: System.Types.Convert]
   ,BytesToFloat32:function(Self, Data$5) {
      var Result = 0;
      if (Data$5.length>=4) {
         __CONV_VIEW.setUint8(0,Data$5[0]);
         __CONV_VIEW.setUint8(1,Data$5[1]);
         __CONV_VIEW.setUint8(2,Data$5[2]);
         __CONV_VIEW.setUint8(3,Data$5[3]);
         Result = __CONV_VIEW.getFloat32(0,a$13);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [float32] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToFloat64(const Data: TByteArray) : Float
   ///  [line: 783, column: 26, file: System.Types.Convert]
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
         Result = __CONV_VIEW.getFloat64(0,a$13);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [float32] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToInt16(const Data: TByteArray) : Integer
   ///  [line: 757, column: 26, file: System.Types.Convert]
   ,BytesToInt16:function(Self, Data$7) {
      var Result = 0;
      if (Data$7.length>=2) {
         __CONV_VIEW.setUint8(0,Data$7[0]);
         __CONV_VIEW.setUint8(1,Data$7[1]);
         Result = __CONV_VIEW.getInt16(0,a$13);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [int16] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToInt32(const Data: TByteArray) : Integer
   ///  [line: 743, column: 26, file: System.Types.Convert]
   ,BytesToInt32:function(Self, Data$8) {
      var Result = 0;
      if (Data$8.length>=4) {
         __CONV_VIEW.setUint8(0,Data$8[0]);
         __CONV_VIEW.setUint8(1,Data$8[1]);
         __CONV_VIEW.setUint8(2,Data$8[2]);
         __CONV_VIEW.setUint8(3,Data$8[3]);
         Result = __CONV_VIEW.getUint32(0,a$13);
      } else {
         throw Exception.Create($New(EDatatype),"Byte conversion [int32] failed, insufficient source");
      }
      return Result
   }
   /// function TDatatype.BytesToString(const Data: TByteArray) : String
   ///  [line: 574, column: 26, file: System.Types.Convert]
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
   ///  [line: 327, column: 26, file: System.Types.Convert]
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
   ///  [line: 625, column: 26, file: System.Types.Convert]
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
               var e$4 = $W($e);
               throw Exception.Create($New(EW3Exception),e$4.FMessage);
            }
            break;
         default :
            throw Exception.Create($New(EDatatype),"Failed to convert bytes[] to intrinsic type, unknown identifier error");
      }
      return Result
   }
   /// function TDatatype.ByteToChar(const Value: Byte) : Char
   ///  [line: 525, column: 26, file: System.Types.Convert]
   ,ByteToChar:function(Self, Value$3) {
      var Result = "";
      Result = String.fromCharCode(Value$3);
      return Result
   }
   /// function TDatatype.CharToByte(const Value: Char) : Word
   ///  [line: 532, column: 26, file: System.Types.Convert]
   ,CharToByte:function(Self, Value$4) {
      var Result = 0;
      Result = (Value$4).charCodeAt(0);
      return Result
   }
   /// function TDatatype.CreateGUID() : String
   ///  [line: 282, column: 26, file: System.Types.Convert]
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
   ///  [line: 596, column: 26, file: System.Types.Convert]
   ,Float32ToBytes:function(Self, Value$5) {
      var Result = [];
      __CONV_VIEW.setFloat32(0,Value$5,a$13);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      Result.push(__CONV_VIEW.getUint8(2));
      Result.push(__CONV_VIEW.getUint8(3));
      return Result
   }
   /// function TDatatype.Float64ToBytes(Value: float64) : TByteArray
   ///  [line: 605, column: 26, file: System.Types.Convert]
   ,Float64ToBytes:function(Self, Value$6) {
      var Result = [];
      __CONV_VIEW.setFloat64(0,Number(Value$6),a$13);
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
   ///  [line: 618, column: 26, file: System.Types.Convert]
   ,Int16ToBytes:function(Self, Value$7) {
      var Result = [];
      __CONV_VIEW.setInt16(0,Value$7,a$13);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      return Result
   }
   /// function TDatatype.Int32ToBytes(Value: Integer) : TByteArray
   ///  [line: 734, column: 26, file: System.Types.Convert]
   ,Int32ToBytes:function(Self, Value$8) {
      var Result = [];
      __CONV_VIEW.setUint32(0,Value$8,a$13);
      Result.push(__CONV_VIEW.getUint8(0));
      Result.push(__CONV_VIEW.getUint8(1));
      Result.push(__CONV_VIEW.getUint8(2));
      Result.push(__CONV_VIEW.getUint8(3));
      return Result
   }
   /// function TDatatype.SizeOfType(const Kind: TRTLDatatype) : Integer
   ///  [line: 276, column: 26, file: System.Types.Convert]
   ,SizeOfType:function(Self, Kind) {
      return __SIZES[Kind];
   }
   /// function TDatatype.StringToBytes(const Value: String) : TByteArray
   ///  [line: 555, column: 27, file: System.Types.Convert]
   ,StringToBytes:function(Self, Value$9) {
      var Result = [];
      var x$40 = 0;
      var LCode = 0;
      var LLen$4 = 0;
      LLen$4 = Value$9.length;
      if (LLen$4>0) {
         var $temp11;
         for(x$40=0,$temp11=LLen$4;x$40<$temp11;x$40++) {
            LCode = (Value$9).charCodeAt(x$40);
            Result.push(LCode);
         }
      }
      return Result
   }
   /// function TDatatype.TypedArrayToBytes(const Value: TDefaultBufferType) : TByteArray
   ///  [line: 343, column: 27, file: System.Types.Convert]
   ,TypedArrayToBytes:function(Self, Value$10) {
      var Result = [];
      if (TVariant.ValidRef(Value$10)) {
         Result = Array.prototype.slice.call(Value$10);
      }
      return Result
   }
   /// function TDatatype.TypedArrayToStr(const Value: TDefaultBufferType) : String
   ///  [line: 392, column: 26, file: System.Types.Convert]
   ,TypedArrayToStr:function(Self, Value$11) {
      var Result = "";
      var x$41 = 0;
      if (TVariant.ValidRef(Value$11)) {
         if (Value$11.length>0) {
            var $temp12;
            for(x$41=0,$temp12=Value$11.length;x$41<$temp12;x$41++) {
               Result += String.fromCharCode((Value$11)[x$41]);
            }
         }
      }
      return Result
   }
   /// function TDatatype.TypedArrayToUInt32(const Value: TDefaultBufferType) : Integer
   ///  [line: 382, column: 26, file: System.Types.Convert]
   ,TypedArrayToUInt32:function(Self, Value$12) {
      var Result = 0;
      var mTemp$1 = null;
      mTemp$1 = new Uint32Array((Value$12).buffer);
      Result = mTemp$1[0];
      return Result
   }
   /// function TDatatype.VariantToBytes(Value: Variant) : TByteArray
   ///  [line: 676, column: 26, file: System.Types.Convert]
   ,VariantToBytes:function(Self, Value$13) {
      var Result = [];
      var chunk = [];
      function IsFloat32(x$42) {
         var Result = false;
         Result = isFinite(x$42) && x$42 == Math.fround(x$42);
         return Result
      };
      switch (TW3VariantHelper$DataType(Value$13)) {
         case 2 :
            Result = TDatatype.Int32ToBytes(Self,4027514882);
            Result.pusha(TDatatype.BooleanToBytes(Self,(Value$13?true:false)));
            break;
         case 3 :
            if (Value$13>=0&&Value$13<=255) {
               Result = TDatatype.Int32ToBytes(Self,4027514883);
               Result.push(parseInt(Value$13,10));
            } else if (Value$13>=0&&Value$13<65536) {
               Result = TDatatype.Int32ToBytes(Self,4027514884);
               Result.pusha(TDatatype.Int16ToBytes(Self,parseInt(Value$13,10)));
            } else {
               Result = TDatatype.Int32ToBytes(Self,4027514885);
               Result.pusha(TDatatype.Int32ToBytes(Self,parseInt(Value$13,10)));
            }
            break;
         case 4 :
            if (IsFloat32(Value$13)) {
               Result = TDatatype.Int32ToBytes(Self,4027514886);
               Result.pusha(TDatatype.Float32ToBytes(Self,Number(Value$13)));
            } else {
               Result = TDatatype.Int32ToBytes(Self,4027514887);
               Result.pusha(TDatatype.Float64ToBytes(Self,Number(Value$13)));
            }
            break;
         case 5 :
            Result = TDatatype.Int32ToBytes(Self,4027514888);
            chunk = TString.EncodeUTF8(TString,String(Value$13));
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
      var e$5 = $W($e);
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
function TMemoryHandleHelper$Valid$5(Self$19) {
   var Result = false;
   Result = !( (Self$19 == undefined) || (Self$19 == null) );
   return Result
}
/// function TMemoryHandleHelper.Defined(const Self: TMemoryHandle) : Boolean
///  [line: 215, column: 30, file: System.Memory]
function TMemoryHandleHelper$Defined$1(Self$20) {
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
   ,Move$1:function(Self, Source$1, SourceStart, Target$1, TargetStart, Size$11) {
      var mRef = null;
      if (TMemoryHandleHelper$Valid$5(Source$1)&&SourceStart>=0&&TMemoryHandleHelper$Valid$5(Target$1)&&TargetStart>=0&&Size$11>0) {
         mRef = Source$1.subarray(SourceStart,SourceStart+Size$11);
         Target$1.set(mRef,TargetStart);
      }
   }
   /// procedure TMarshal.Move(const Source: TAddress; const Target: TAddress; const Size: Integer)
   ///  [line: 580, column: 26, file: System.Memory]
   ,Move:function(Self, Source$2, Target$2, Size$12) {
      if (Source$2!==null) {
         if (Target$2!==null) {
            if (Size$12>0) {
               TMarshal.Move$1(Self,Source$2.FBuffer,Source$2.FOffset,Target$2.FBuffer,Target$2.FOffset,Size$12);
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
   ///  [line: 220, column: 22, file: System.Memory.Buffer]
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
   ,CopyFrom:function(Self, Source$3, Count$10) {
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
   ,DataWrite:function(Self, Offset$8, Bytes$2) {
      TStream.WriteBuffer$(Self,Bytes$2,Offset$8);
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
   ,Read:function(Self, Count$11) {
      return TStream.ReadBuffer$(Self,TStream.GetPosition$(Self),Count$11);
   }
   /// function TStream.ReadBuffer(Offset: Integer; Count: Integer) : TByteArray
   ///  [line: 502, column: 18, file: System.Streams]
   ,ReadBuffer:function(Self, Offset$9, Count$12) {
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
   ,CopyFrom:function(Self, Source$4, Count$13) {
      var Result = 0;
      var LData = [];
      LData = TStream.ReadBuffer$(Source$4,TStream.GetPosition$(Source$4),Count$13);
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
   ,ReadBuffer:function(Self, Offset$12, Count$14) {
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
            LBytesToMove = Count$14;
            if (LBytesToMove>mLen$1) {
               LBytesToMove = mLen$1;
            }
            mTemp$3 = new Uint8Array(LBytesToMove);
            TMarshal.Move$1(TMarshal,TAllocation.GetHandle(Self.FBuffer$1),Offset$12,mTemp$3,0,LBytesToMove);
            Result = TDatatype.TypedArrayToBytes(TDatatype,mTemp$3);
            TStream.SetPosition$(Self,Offset$12+Result.length);
         } catch ($e) {
            var e$6 = $W($e);
            throw EW3Exception.CreateFmt($New(EStreamReadError),$R[8],[e$6.FMessage]);
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
      var mData$3 = undefined;
      try {
         if (TAllocation.a$20(Self.FBuffer$1)&&Offset$14<1) {
            TAllocation.Allocate(Self.FBuffer$1,Buffer$3.length);
            mData$3 = TDatatype.BytesToTypedArray(TDatatype,Buffer$3);
            TMarshal.Move$1(TMarshal,mData$3,0,TAllocation.GetHandle(Self.FBuffer$1),0,Buffer$3.length);
            TMarshal.Move$1(TMarshal,mData$3,0,TAllocation.GetHandle(Self.FBuffer$1),0,Buffer$3.length);
         } else {
            if (TStream.GetPosition$(Self)==TStream.GetSize$1$(Self)) {
               TAllocation.Grow(Self.FBuffer$1,Buffer$3.length);
               mData$3 = TDatatype.BytesToTypedArray(TDatatype,Buffer$3);
               TMarshal.Move$1(TMarshal,mData$3,0,TAllocation.GetHandle(Self.FBuffer$1),Offset$14,Buffer$3.length);
            } else {
               TMarshal.Move$1(TMarshal,TDatatype.BytesToTypedArray(TDatatype,Buffer$3),0,TAllocation.GetHandle(Self.FBuffer$1),Offset$14,Buffer$3.length);
            }
         }
         TStream.SetPosition$(Self,Offset$14+Buffer$3.length);
      } catch ($e) {
         var e$7 = $W($e);
         throw EW3Exception.CreateFmt($New(EStreamWriteError),$R[7],[e$7.FMessage]);
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
   ,a$19:function(Self) {
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
         Result = parseInt((Self.FCacheSize-(TAllocation.GetHandle(TAllocationOptions.a$19(Self)).length-TAllocation.GetSize$3(TAllocationOptions.a$19(Self)))),10);
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
   ,a$20:function(Self) {
      return ((!Self.FHandle)?true:false);
   }
   /// procedure TAllocation.Allocate(Bytes: Integer)
   ///  [line: 244, column: 23, file: System.Memory.Allocation]
   ,Allocate:function(Self, Bytes$3) {
      var LSize$1 = 0;
      if (Self.FHandle) {
         TAllocation.Release(Self);
      }
      if (Bytes$3>0) {
         LSize$1 = TInteger.ToNearest(Bytes$3,16);
         if (Self.FOptions$1.FUseCache) {
            LSize$1 = TInteger.ToNearest(LSize$1,Self.FOptions$1.FCacheSize);
         }
         Self.FHandle = TUnManaged.AllocMemA(TUnManaged,LSize$1);
         Self.FSize = Bytes$3;
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
   ,DataWrite$1:function(Self, Offset$16, Bytes$4) {
      TUnManaged.WriteMemoryA(TUnManaged,TAllocation.GetHandle(Self),Offset$16,TDatatype.BytesToTypedArray(TDatatype,Bytes$4));
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
   ,Shrink:function(Self, Bytes$5) {
      var mSize$3 = 0;
      if (Self.FHandle) {
         if (Self.FOptions$1.FUseCache) {
            mSize$3 = TInteger.EnsureRange((TAllocation.GetSize$3(Self)-Bytes$5),0,2147483647);
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
         mSize$3 = TInteger.EnsureRange((TAllocation.GetSize$3(Self)-Bytes$5),0,2147483647);
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
         if (!TAllocation.a$20(Self)) {
            try {
               Data$12 = TDatatype.TypedArrayToBytes(TDatatype,TAllocation.GetHandle(Self));
               Target$3[3](Target$3[0](),Data$12);
            } catch ($e) {
               var e$8 = $W($e);
               throw EW3Exception.CreateFmt($New(EAllocation),"Data transport failed, mechanism threw exception %s with error [%s]",[TObject.ClassName(e$8.ClassType), e$8.FMessage]);
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
   IBinaryTransport:[TAllocation.DataOffset$1,TAllocation.DataGetSize$1,TAllocation.DataRead$1,TAllocation.DataWrite$1]
   ,IAllocation:[TAllocation.GetHandle,TAllocation.GetTotalSize$1,TAllocation.GetSize$3,TAllocation.GetTransport,TAllocation.Allocate,TAllocation.Release,TAllocation.Grow,TAllocation.Shrink,TAllocation.ReAllocate,TAllocation.Transport]
}
function a$171(Self) {
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
   ,WriteInteger:function(Self, Value$14) {
      var LBytesToWrite$1 = 0;
      LBytesToWrite$1 = TDatatype.SizeOfType(TDatatype,7);
      if (TW3CustomWriter.QueryBreachOfBoundary(Self,LBytesToWrite$1)) {
         throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.WriteInteger",Self,Format($R[10],[LBytesToWrite$1]));
      } else {
         TW3CustomWriter.Write(Self,TDatatype.Int32ToBytes(TDatatype,Value$14));
      }
   }
   /// procedure TW3CustomWriter.WriteString(const Value: String)
   ///  [line: 330, column: 27, file: System.Writer]
   ,WriteString:function(Self, Value$15) {
      var LBytes = [],
         LTotal = 0;
      (LTotal+= TDatatype.SizeOfType(TDatatype,7));
      (LTotal+= TDatatype.SizeOfType(TDatatype,7));
      LBytes = TDatatype.StringToBytes(TDatatype,Value$15);
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
            var e$9 = $W($e);
            throw EW3Exception.Create$17($New(EW3WriteError),"TW3CustomWriter.WriteString",Self,e$9.FMessage);
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
   ,a$24:function(Self) {
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
///  [line: 317, column: 3, file: SmartCL.Application]
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
   ///  [line: 1133, column: 32, file: SmartCL.Application]
   ,AdjustScreen:function(Self) {
      if (Self.FDisplay!==null) {
         TW3ScrollInfo.ScrollTo(TW3CustomControl.GetScrollInfo(Self.FDisplay),0,0);
         TW3MovableControl.Invalidate$(Self.FDisplay);
      }
   }
   /// procedure TW3CustomApplication.ApplicationClosing()
   ///  [line: 1171, column: 32, file: SmartCL.Application]
   ,ApplicationClosing:function(Self) {
      /* null */
   }
   /// procedure TW3CustomApplication.ApplicationStarted()
   ///  [line: 1161, column: 32, file: SmartCL.Application]
   ,ApplicationStarted:function(Self) {
      /* null */
   }
   /// procedure TW3CustomApplication.ApplicationStarting()
   ///  [line: 1166, column: 32, file: SmartCL.Application]
   ,ApplicationStarting:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnBeforeUnload()
   ///  [line: 1089, column: 32, file: SmartCL.Application]
   ,CBOnBeforeUnload:function(Self) {
      if (Self.FOnBeforeUnload) {
         Self.FOnBeforeUnload(Self);
      }
   }
   /// procedure TW3CustomApplication.CBOnOrientationChange()
   ///  [line: 1111, column: 32, file: SmartCL.Application]
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
         mEntry = Self.FDisplay.FOnOrient;
         if (mEntry) {
            mEntry(Self.FDisplay,mOrientation,mTemp$4);
         }
      }
   }
   /// procedure TW3CustomApplication.CBOnReSize()
   ///  [line: 1106, column: 32, file: SmartCL.Application]
   ,CBOnReSize:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnUnLoad()
   ///  [line: 1095, column: 32, file: SmartCL.Application]
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
   ///  [line: 842, column: 34, file: SmartCL.Application]
   ,Create$3:function(Self) {
      TObject.Create(Self);
      Self.FBody = TW3TagContainer.Create$85$($New(TDocumentBody),null);
      Self.FDisplay = TW3TagContainer.Create$85$($New(TW3Display),Self.FBody);
      if (!Instance) {
         Instance = Self;
      }
      return Self
   }
   /// destructor TW3CustomApplication.Destroy()
   ///  [line: 860, column: 33, file: SmartCL.Application]
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
   ///  [line: 1448, column: 32, file: SmartCL.Application]
   ,GotoFormByRef:function(Self, aForm, Effect) {
      var mIndex = 0;
      if (Self.FTerminated) {
         return;
      }
      if (Self.FFormChangeActive) {
         throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "A form transition is already active error"]);
      }
      if (aForm===null) {
         throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
      }
      mIndex = Self.FForms.indexOf(aForm);
      if (mIndex<0) {
         throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "Form not registered error"]);
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
      Self.FFormChangeActive = true;
      Self.FEntryEffect = Effect;
      TW3TagContainer.BringToFront(aForm);
      TW3CustomForm.FormDeactivated(Self.FCurrentForm);
      Self.FTransSrc = Self.FCurrentForm;
      Self.FTransDst = aForm;
      TW3MovableControl.SetVisible(aForm,true);
      TW3Display.PositionFormInView(Self.FDisplay,aForm);
      if (Self.FEnterAnim===null||Self.FLeaveAnim===null) {
         Self.FEnterAnim = TW3CustomAnimation.Create$133$($New(TW3NamedAnimation));
         TW3CustomAnimation.SetDuration(Self.FEnterAnim,0.3);
         Self.FLeaveAnim = TW3CustomAnimation.Create$133$($New(TW3NamedAnimation));
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
   ///  [line: 1408, column: 32, file: SmartCL.Application]
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
      if (mAnim===Self.FEnterAnim) {
         Self.FEnterAnim = null;
      }
      TObject.Free(mAnim);
      mAnim = null;
   }
   /// procedure TW3CustomApplication.HandleLeaveAnimEnds(Sender: TObject)
   ///  [line: 1398, column: 32, file: SmartCL.Application]
   ,HandleLeaveAnimEnds:function(Self, Sender$1) {
      var mAnim$1 = null;
      mAnim$1 = $As(Sender$1,TW3NamedAnimation);
      TW3MovableControl.SetVisible(Self.FTransSrc,false);
      if (mAnim$1===Self.FLeaveAnim) {
         Self.FLeaveAnim = null;
      }
      TObject.Free(mAnim$1);
   }
   /// procedure TW3CustomApplication.HookWindowEvents()
   ///  [line: 891, column: 32, file: SmartCL.Application]
   ,HookWindowEvents:function(Self) {
      document.body.onunload = $Event0(Self,TW3CustomApplication.CBOnUnLoad);
      document.body.onbeforeunload = $Event0(Self,TW3CustomApplication.CBOnBeforeUnload);
      window.onresize = $Event0(Self,TW3CustomApplication.CBOnReSize);
      window.onorientationchange = $Event0(Self,TW3CustomApplication.CBOnOrientationChange);
   }
   /// procedure TW3CustomApplication.ReadySync()
   ///  [line: 1176, column: 32, file: SmartCL.Application]
   ,ReadySync:function(Self) {
      var Temp$1 = null;
      if ($SetIn(Self.FDisplay.FComponentState,3,0,9)) {
         if ($SetIn(Self.FDisplay.FView.FComponentState,3,0,9)) {
            if (Self.FMainForm) {
               if ($SetIn(Self.FMainForm.FComponentState,3,0,9)) {
                  TW3MovableControl.Invalidate$(Self.FDisplay);
                  TW3MovableControl.Invalidate$(Self.FDisplay.FView);
                  Temp$1 = Self.FMainForm;
                  Self.FMainForm = null;
                  TW3CustomApplication.GotoFormByRef(Self,Temp$1,0);
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
   ///  [line: 1315, column: 32, file: SmartCL.Application]
   ,RegisterFormInstance:function(Self, aForm$1, isMainForm) {
      if (Self.FTerminated) {
         return;
      }
      if (aForm$1) {
         if (Self.FForms.indexOf(aForm$1)<0) {
            try {
               Self.FForms.push(aForm$1);
            } catch ($e) {
               var e$10 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), e$10.FMessage]);
            }
            TW3Dispatch.RequestAnimationFrame(TW3Dispatch,$Event0(aForm$1,TW3MovableControl.AdjustToParentBox));
            if (isMainForm) {
               Self.FMainForm = aForm$1;
            } else {
               TW3MovableControl.SetVisible(aForm$1,false);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), "Form already registered"]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
      }
   }
   /// procedure TW3CustomApplication.RunApp()
   ///  [line: 1246, column: 32, file: SmartCL.Application]
   ,RunApp:function(Self) {
      TW3CustomApplication.HookWindowEvents(Self);
      TW3CustomApplication.ApplicationStarting(Self);
      TApplicationFormsList.AutoCreateForms(FormsFactory(),Self.FDisplay.FView);
      TW3CustomApplication.StartApp(Self);
   }
   /// procedure TW3CustomApplication.StartApp()
   ///  [line: 1294, column: 32, file: SmartCL.Application]
   ,StartApp:function(Self) {
      TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3CustomApplication.ReadySync),100);
   }
   /// procedure TW3CustomApplication.Terminate()
   ///  [line: 1142, column: 32, file: SmartCL.Application]
   ,Terminate:function(Self) {
      var x$43 = 0;
      if (Self.FTerminated) {
         return;
      }
      Self.FTerminated = true;
      TW3CustomApplication.ApplicationClosing(Self);
      try {
         var $temp13;
         for(x$43=0,$temp13=Self.FForms.length;x$43<$temp13;x$43++) {
            TObject.Free(Self.FForms[x$43]);
            Self.FForms[x$43]=null;
         }
         Self.FForms.length=0;
      } finally {
         TObject.Free(Self);
      }
   }
   /// procedure TW3CustomApplication.UnRegisterFormInstance(aForm: TW3CustomForm)
   ///  [line: 1355, column: 32, file: SmartCL.Application]
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
                     var e$11 = $W($e);
                     throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), e$11.FMessage]);
                  }
               } else {
                  throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Main form cannot be removed error"]);
               }
            } else {
               throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Form is not registered"]);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3Application$1),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
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
///  [line: 64, column: 3, file: SmartCL.Application]
var TW3DisplayViewArangeType = [ "dvaSizeToView", "dvaVStack", "dvaHStack" ];
/// TW3TagObj = class (TW3Component)
///  [line: 274, column: 3, file: SmartCL.Components]
var TW3TagObj = {
   $ClassName:"TW3TagObj",$Parent:TW3Component
   ,$Init:function ($) {
      TW3Component.$Init($);
      $.FAttributes = null;
      $.FComponentState = [0];
      $.FDisplayMode = 0;
      $.FHandle$3 = undefined;
      $.FOwner$1 = undefined;
      $.FPositionMode = 23;
      $.FTagId = "";
      $.FUpdating = $.FZIndexCounter = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 487, column: 13, file: SmartCL.Components]
   ,a$51:function(Self, Value$16) {
      TW3MouseCursor.SetCursorForElement(TW3MouseCursor,Self.FHandle$3,Value$16);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 486, column: 13, file: SmartCL.Components]
   ,a$50:function(Self) {
      return TW3MouseCursor.GetCursorFromElement(TW3MouseCursor,Self.FHandle$3);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 477, column: 38, file: SmartCL.Components]
   ,a$49:function(Self) {
      return $SetIn(Self.FComponentState,2,0,9);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 473, column: 38, file: SmartCL.Components]
   ,a$48:function(Self) {
      return (Self.FOwner$1?true:false);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 449, column: 64, file: SmartCL.Components]
   ,a$45:function(Self, Value$17) {
      Self.FHandle$3.innerHTML = Value$17;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 449, column: 38, file: SmartCL.Components]
   ,a$44:function(Self) {
      return String(Self.FHandle$3.innerHTML);
   }
   /// procedure TW3TagObj.AddToComponentState(const Flags: TComponentState)
   ///  [line: 2178, column: 21, file: SmartCL.Components]
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
   ///  [line: 2221, column: 21, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      /* null */
   }
   /// function TW3TagObj.AllocateZIndex() : Integer
   ///  [line: 2234, column: 21, file: SmartCL.Components]
   ,AllocateZIndex:function(Self) {
      var Result = 0;
      ++Self.FZIndexCounter;
      Result = Self.FZIndexCounter;
      return Result
   }
   /// procedure TW3TagObj.BeginUpdate()
   ///  [line: 2202, column: 21, file: SmartCL.Components]
   ,BeginUpdate:function(Self) {
      ++Self.FUpdating;
      $SetInc(Self.FComponentState,2,0,9);
   }
   /// constructor TW3TagObj.Create(const AOwner: TObject)
   ///  [line: 1870, column: 23, file: SmartCL.Components]
   ,Create$11:function(Self, AOwner$5) {
      var LRegName = "";
      TW3CustomComponent.CreateEx(Self,AOwner$5);
      $SetInc(Self.FComponentState,0,0,9);
      try {
         Self.FTagId = TW3TagObj.MakeElementTagId$(Self);
         Self.FHandle$3 = TW3TagObj.MakeElementTagObj$(Self);
      } catch ($e) {
         var e$12 = $W($e);
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.Create",Self,e$12.FMessage);
      }
      $SetInc(Self.FComponentState,1,0,9);
      if (!TControlHandleHelper$Equals$3(Self.FHandle$3,document.body)) {
         Self.FHandle$3.setAttribute("id",Self.FTagId);
      }
      if (AOwner$5!==null) {
         TW3TagObj.SetZIndex(Self,TW3TagObj.AllocateZIndex($As(AOwner$5,TW3TagObj)));
      }
      TW3TagObj.StyleTagObject$(Self);
      TW3CustomComponent.InitializeObject$(Self);
      LRegName = Trim$_String_(Self.FTagId);
      if (LRegName.length>0) {
         TW3ControlTracker.RegisterControl(TW3ControlTracker,Self);
      }
      $SetExc(Self.FComponentState,0,0,9);
      $SetExc(Self.FComponentState,1,0,9);
      return Self
   }
   /// function TW3TagObj.CreationFlags() : TW3CreationFlags
   ///  [line: 2160, column: 20, file: SmartCL.Components]
   ,CreationFlags:function(Self) {
      return [62];
   }
   /// destructor TW3TagObj.Destroy()
   ///  [line: 1936, column: 22, file: SmartCL.Components]
   ,Destroy:function(Self) {
      var LRegName$1 = "";
      $SetInc(Self.FComponentState,8,0,9);
      if (Self.FHandle$3) {
         try {
            TW3TagObj.UnHookEvents$(Self);
            if (TControlHandleHelper$Valid$2(Self.FOwner$1)) {
               TW3TagObj.RemoveFrom(Self);
            }
         } finally {
            TW3CustomComponent.FinalizeObject$(Self);
            LRegName$1 = Trim$_String_(Self.FTagId);
            if (LRegName$1.length>0) {
               TW3ControlTracker.UnRegisterControl(TW3ControlTracker,Self);
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
   ///  [line: 2208, column: 21, file: SmartCL.Components]
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
   ///  [line: 2329, column: 20, file: SmartCL.Components]
   ,GetAttributes:function(Self) {
      var Result = null;
      if (Self.FAttributes===null) {
         Self.FAttributes = TW3ElementAttributes.Create$129($New(TW3ElementAttributes),Self.FHandle$3);
      }
      Result = Self.FAttributes;
      return Result
   }
   /// function TW3TagObj.GetDisplayModeText() : String
   ///  [line: 2001, column: 20, file: SmartCL.Components]
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
   ///  [line: 2226, column: 21, file: SmartCL.Components]
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
   ///  [line: 2287, column: 21, file: SmartCL.Components]
   ,HandleControlBlured:function(Self) {
      /* null */
   }
   /// procedure TW3TagObj.HandleControlFocused()
   ///  [line: 2282, column: 21, file: SmartCL.Components]
   ,HandleControlFocused:function(Self) {
      TW3ControlTracker.SetFocusedControl(TW3ControlTracker,Self);
   }
   /// procedure TW3TagObj.HookEvents()
   ///  [line: 2292, column: 21, file: SmartCL.Components]
   ,HookEvents:function(Self) {
      Self.FHandle$3.addEventListener("focus",$Event0(Self,TW3TagObj.HandleControlFocused));
      Self.FHandle$3.addEventListener("blur",$Event0(Self,TW3TagObj.HandleControlBlured));
   }
   /// procedure TW3TagObj.InsertInto(const OwnerHandle: THandle)
   ///  [line: 2336, column: 21, file: SmartCL.Components]
   ,InsertInto:function(Self, OwnerHandle) {
      if (THandleHelper$Valid$4(OwnerHandle)) {
         if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
            if (TControlHandleHelper$Valid$2(Self.FOwner$1)) {
               try {
                  TW3TagObj.RemoveFrom(Self);
               } catch ($e) {
                  var e$13 = $W($e);
                  throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,e$13.FMessage);
               }
            }
            try {
               w3_setElementParentByRef(Self.FHandle$3,OwnerHandle);
            } catch ($e) {
               var e$14 = $W($e);
               throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,e$14.FMessage);
            }
            Self.FOwner$1 = OwnerHandle;
         } else {
            throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,$R[22]);
         }
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3TagObj.InsertInto",Self,$R[29]);
      }
   }
   /// function TW3TagObj.MakeElementTagId() : String
   ///  [line: 2269, column: 20, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      return TW3Identifiers.GenerateUniqueComponentName$1(TW3Identifiers);
   }
   /// function TW3TagObj.MakeElementTagObj() : TControlHandle
   ///  [line: 2274, column: 20, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = document.createElement("div");
      return Result
   }
   /// procedure TW3TagObj.RemoveFrom()
   ///  [line: 2373, column: 21, file: SmartCL.Components]
   ,RemoveFrom:function(Self) {
      if (TControlHandleHelper$Valid$2(Self.FOwner$1)) {
         if (TControlHandleHelper$Valid$2(Self.FHandle$3)) {
            try {
               try {
                  w3_RemoveElementByRef(Self.FHandle$3,Self.FOwner$1);
               } catch ($e) {
                  var e$15 = $W($e);
                  /* null */
               }
            } finally {
               Self.FOwner$1 = undefined;
            }
         }
      }
   }
   /// procedure TW3TagObj.RemoveFromComponentState(const Flags: TComponentState)
   ///  [line: 2190, column: 21, file: SmartCL.Components]
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
   /// procedure TW3TagObj.SetZIndex(const NewZIndex: Integer)
   ///  [line: 2240, column: 21, file: SmartCL.Components]
   ,SetZIndex:function(Self, NewZIndex) {
      if (Self.FHandle$3) {
         Self.FHandle$3.style.zIndex = NewZIndex;
      }
   }
   /// function TW3TagObj.Showing() : Boolean
   ///  [line: 2171, column: 20, file: SmartCL.Components]
   ,Showing:function(Self) {
      return Self.FHandle$3&&TControlHandleHelper$Ready$2(Self.FHandle$3)&&$SetIn(Self.FComponentState,3,0,9);
   }
   /// procedure TW3TagObj.StyleTagObject()
   ///  [line: 2247, column: 21, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      (Self.FHandle$3).style.visibility = 'hidden';
    (Self.FHandle$3).style.display = 'none';
    (Self.FHandle$3).style.overflow = 'hidden';
    (Self.FHandle$3).style.left = "0px";
    (Self.FHandle$3).style.top = "0px";
      switch (Self.FPositionMode) {
         case 23 :
            Self.FHandle$3.style.position = "absolute";
            break;
         case 22 :
            Self.FHandle$3.style.position = "relative";
            break;
      }
   }
   /// procedure TW3TagObj.UnHookEvents()
   ///  [line: 2300, column: 21, file: SmartCL.Components]
   ,UnHookEvents:function(Self) {
      Self.FHandle$3.onresize = null;
      Self.FHandle$3.onselectstart = null;
      Self.FHandle$3.onfocus = null;
      Self.FHandle$3.onblur = null;
      Self.FHandle$3.onchange = null;
      Self.FHandle$3.onmousedown = null;
      Self.FHandle$3.onmouseup = null;
      Self.FHandle$3.onmousemove = null;
      Self.FHandle$3.onmouseover = null;
      Self.FHandle$3.onmouseout = null;
      Self.FHandle$3.onclick = null;
      Self.FHandle$3.ondblclick = null;
      Self.FHandle$3.onkeydown = null;
      Self.FHandle$3.onkeyup = null;
      Self.FHandle$3.onkeypress = null;
      Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"animationstart")] = null;
      Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"animationend")] = null;
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
///  [line: 499, column: 3, file: SmartCL.Components]
var TW3TagContainer = {
   $ClassName:"TW3TagContainer",$Parent:TW3TagObj
   ,$Init:function ($) {
      TW3TagObj.$Init($);
      $.FChildren = [];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 567, column: 44, file: SmartCL.Components]
   ,a$52:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3TagContainer);
   }
   /// procedure TW3TagContainer.BringToFront()
   ///  [line: 2525, column: 27, file: SmartCL.Components]
   ,BringToFront:function(Self) {
      var LStack = {olTags:[],olZIndex:[]},
         LIndex = 0;
      if ($SetIn(Self.FComponentState,3,0,9)) {
         if (!TW3TagContainer.TopMost(Self)) {
            LStack = TW3TagContainer.GetZOrderList(TW3TagContainer.a$52(Self),false,null);
            LIndex = TW3StackingOrderList$IndexOfHandle(LStack,Self.FHandle$3);
            if (LIndex>=0) {
               TW3StackingOrderList$Swap$1(LStack,LIndex,(LStack.olTags.length-1));
               TW3StackingOrderList$Remap(LStack);
            }
         }
      } else {
         /* null */
      }
   }
   /// procedure TW3TagContainer.CBNoBehavior()
   ///  [line: 2588, column: 27, file: SmartCL.Components]
   ,CBNoBehavior:function(Self) {
      if (event) {
         event.preventDefault();
      }
   }
   /// procedure TW3TagContainer.ChildAdded(const NewChild: TW3TagContainer)
   ///  [line: 2823, column: 27, file: SmartCL.Components]
   ,ChildAdded:function(Self, NewChild) {
      /* null */
   }
   /// function TW3TagContainer.ChildByHandle(const ControlHandle: TControlHandle) : TW3TagContainer
   ///  [line: 2663, column: 26, file: SmartCL.Components]
   ,ChildByHandle:function(Self, ControlHandle) {
      var Result = null;
      var a$172 = 0;
      var LItem$3 = null;
      var a$173 = [];
      a$173 = Self.FChildren;
      var $temp14;
      for(a$172=0,$temp14=a$173.length;a$172<$temp14;a$172++) {
         LItem$3 = a$173[a$172];
         if (LItem$3.FHandle$3==ControlHandle) {
            Result = LItem$3;
            break;
         }
      }
      return Result
   }
   /// function TW3TagContainer.ChildByName(ComponentName: String) : TW3TagContainer
   ///  [line: 2650, column: 26, file: SmartCL.Components]
   ,ChildByName:function(Self, ComponentName) {
      var Result = null;
      var a$174 = 0;
      var LItem$4 = null;
      var a$175 = [];
      ComponentName = (Trim$_String_(ComponentName)).toLocaleLowerCase();
      a$175 = Self.FChildren;
      var $temp15;
      for(a$174=0,$temp15=a$175.length;a$174<$temp15;a$174++) {
         LItem$4 = a$175[a$174];
         if ((TW3TagContainer.GetComponentName(LItem$4)).toLocaleLowerCase()==ComponentName) {
            Result = LItem$4;
            break;
         }
      }
      return Result
   }
   /// procedure TW3TagContainer.ChildRemoved(const OldChild: TW3TagContainer)
   ///  [line: 2827, column: 27, file: SmartCL.Components]
   ,ChildRemoved:function(Self, OldChild) {
      /* null */
   }
   /// constructor TW3TagContainer.Create(AOwner: TW3TagContainer)
   ///  [line: 2402, column: 29, file: SmartCL.Components]
   ,Create$85:function(Self, AOwner$6) {
      TW3TagObj.Create$11(Self,AOwner$6);
      if (TW3TagContainer.a$52(Self)!==null) {
         TW3TagContainer.RegisterChild(TW3TagContainer.a$52(Self),Self);
      }
      return Self
   }
   /// function TW3TagContainer.FilterZOrderListItem(const Item: TObject) : TW3ZOrderFilterResult
   ///  [line: 2413, column: 26, file: SmartCL.Components]
   ,FilterZOrderListItem:function(Self, Item) {
      return (Item!==null)?0:1;
   }
   /// procedure TW3TagContainer.FinalizeObject()
   ///  [line: 2749, column: 27, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TW3TagContainer.FreeChildren(Self);
      if (TW3TagContainer.a$52(Self)!==null) {
         TW3TagContainer.UnRegisterChild(TW3TagContainer.a$52(Self),Self);
      }
      TW3CustomComponent.FinalizeObject(Self);
   }
   /// procedure TW3TagContainer.ForEach(const Process: TW3TagContainerChildEnumProc)
   ///  [line: 2718, column: 27, file: SmartCL.Components]
   ,ForEach$1:function(Self, Process) {
      var a$176 = 0;
      var LChild$1 = null;
      if (Process) {
         var a$177 = [];
         a$177 = Self.FChildren;
         var $temp16;
         for(a$176=0,$temp16=a$177.length;a$176<$temp16;a$176++) {
            LChild$1 = a$177[a$176];
            if (Process(LChild$1)==16) {
               break;
            }
         }
      }
   }
   /// procedure TW3TagContainer.FreeChildren()
   ///  [line: 2796, column: 27, file: SmartCL.Components]
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
   ///  [line: 2767, column: 26, file: SmartCL.Components]
   ,GetChildCount:function(Self) {
      return Self.FChildren.length;
   }
   /// function TW3TagContainer.GetChildHasFocus(var Child: TW3TagContainer) : Boolean
   ///  [line: 2630, column: 26, file: SmartCL.Components]
   ,GetChildHasFocus:function(Self, Child) {
      var Result = false;
      var a$178 = 0;
      var LItem$5 = null;
      var a$179 = [];
      Result = false;
      Child.v = null;
      a$179 = Self.FChildren;
      var $temp17;
      for(a$178=0,$temp17=a$179.length;a$178<$temp17;a$178++) {
         LItem$5 = a$179[a$178];
         if (TW3TagContainer.GetHasFocus(LItem$5)) {
            Child.v = LItem$5;
            break;
         } else {
            Result = TW3TagContainer.GetChildHasFocus(LItem$5,Child);
            if (Result) {
               break;
            }
         }
      }
      return Result
   }
   /// function TW3TagContainer.GetChildObject(const Index: Integer) : TW3TagContainer
   ///  [line: 2781, column: 26, file: SmartCL.Components]
   ,GetChildObject:function(Self, Index) {
      return Self.FChildren[Index];
   }
   /// function TW3TagContainer.GetComponentName() : String
   ///  [line: 2786, column: 26, file: SmartCL.Components]
   ,GetComponentName:function(Self) {
      return Self.Name;
   }
   /// function TW3TagContainer.GetHasFocus() : Boolean
   ///  [line: 2594, column: 26, file: SmartCL.Components]
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
   ///  [line: 2570, column: 26, file: SmartCL.Components]
   ,GetMaxZIndex:function(Self) {
      var Result = 0;
      var a$180 = 0;
      var LChild$2 = null,
         LChildZIndex = 0;
      var a$181 = [];
      a$181 = Self.FChildren;
      var $temp18;
      for(a$180=0,$temp18=a$181.length;a$180<$temp18;a$180++) {
         LChild$2 = a$181[a$180];
         LChildZIndex = TW3TagObj.GetZIndex(LChild$2);
         if (LChildZIndex>Result) {
            Result = LChildZIndex;
         }
      }
      return Result
   }
   /// function TW3TagContainer.GetZOrderList(const Sort: Boolean; const Filter: TW3ZOrderFilterFunction) : TW3StackingOrderList
   ///  [line: 2418, column: 26, file: SmartCL.Components]
   ,GetZOrderList:function(Self, Sort$3, Filter) {
      var Result = {olTags:[],olZIndex:[]};
      var LFilter = null;
      var LHandles = [],
         x$44 = 0;
      var LHandle = undefined,
         LChild$3 = null;
      if (Filter) {
         LFilter = Filter;
      } else {
         LFilter = $Event1(Self,TW3TagContainer.FilterZOrderListItem);
      }
      LHandles = TControlHandleHelper$GetChildren(Self.FHandle$3);
      var $temp19;
      for(x$44=0,$temp19=LHandles.length;x$44<$temp19;x$44++) {
         LHandle = LHandles[x$44];
         if (LHandle) {
            LChild$3 = TW3TagContainer.ChildByHandle(Self,LHandle);
            if (LChild$3!==null) {
               if (!LFilter(LChild$3)) {
                  Result.olTags.push(LHandle);
                  Result.olZIndex.push(TVariant.AsInteger(LHandle.style.zIndex));
               }
            }
         }
      }
      TW3StackingOrderList$Sort$1(Result,Sort$3);
      return Result
   }
   /// procedure TW3TagContainer.RegisterChild(const Child: TW3TagContainer)
   ///  [line: 2831, column: 27, file: SmartCL.Components]
   ,RegisterChild:function(Self, Child$1) {
      if (Child$1!==null&&Child$1!==Self&&Self.FChildren.indexOf(Child$1)<0) {
         if (TW3TagObj.a$48(Child$1)) {
            TW3TagObj.RemoveFrom(Child$1);
         }
         Self.FChildren.push(Child$1);
         TW3TagObj.InsertInto(Child$1,Self.FHandle$3);
         if ($SetIn(TW3TagObj.CreationFlags$(Self),2,0,8)) {
            TW3TagObj.BeginUpdate(Self);
            TW3TagObj.AddToComponentState(Self,[64]);
            TW3TagObj.EndUpdate(Self);
            TW3TagContainer.ChildAdded(Self,Child$1);
         }
      }
   }
   /// procedure TW3TagContainer.SetComponentName(const NewComponentName: String)
   ///  [line: 2791, column: 27, file: SmartCL.Components]
   ,SetComponentName:function(Self, NewComponentName) {
      Self.Name = NewComponentName;
   }
   /// function TW3TagContainer.Showing() : Boolean
   ///  [line: 2583, column: 26, file: SmartCL.Components]
   ,Showing:function(Self) {
      return TW3TagObj.Showing(Self)&&TW3TagContainer.a$52(Self)!==null;
   }
   /// function TW3TagContainer.TopMost() : Boolean
   ///  [line: 2553, column: 26, file: SmartCL.Components]
   ,TopMost:function(Self) {
      var Result = false;
      var LParent = null,
         LStack$1 = {olTags:[],olZIndex:[]};
      if (TW3TagContainer.a$52(Self)!==null) {
         LParent = TW3TagContainer.a$52(Self);
         LStack$1 = TW3TagContainer.GetZOrderList(LParent,true,null);
         if (LStack$1.olZIndex.length>0) {
            if (LStack$1.olTags[0]==Self.FHandle$3) {
               Result = LStack$1.olZIndex[0]==TW3TagObj.GetZIndex(Self);
            }
         }
      }
      return Result
   }
   /// procedure TW3TagContainer.UnRegisterChild(const Child: TW3TagContainer)
   ///  [line: 2853, column: 27, file: SmartCL.Components]
   ,UnRegisterChild:function(Self, Child$2) {
      var LIndex$1 = 0;
      if (Child$2!==null&&Child$2!==Self) {
         LIndex$1 = Self.FChildren.indexOf(Child$2);
         if (LIndex$1>=0) {
            Self.FChildren.splice(LIndex$1,1)
            ;
            if ($SetIn(TW3TagObj.CreationFlags$(Self),3,0,8)) {
               TW3TagContainer.ChildRemoved(Self,Child$2);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3TagContainer),"Failed to remove child component [%s], child is not connected to this component error",[TW3TagContainer.GetComponentName(Child$2)]);
         }
         if (!$SetIn(Child$2.FComponentState,8,0,9)) {
            TW3TagObj.RemoveFrom(Child$2);
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
   ,Create$85$:function($){return $.ClassType.Create$85.apply($.ClassType, arguments)}
};
TW3TagContainer.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3MovableControl = class (TW3TagContainer)
///  [line: 774, column: 3, file: SmartCL.Components]
var TW3MovableControl = {
   $ClassName:"TW3MovableControl",$Parent:TW3TagContainer
   ,$Init:function ($) {
      TW3TagContainer.$Init($);
      $.FAdjusted = $.FTransparent = $.FUseAlpha = false;
      $.FAlpha = $.FSyncCount = 0;
      $.FBackground = $.FBorders = $.FEdgeRadius = $.FFont = $.FOnMoved = $.FOnResize = $.FOnVisible = $.FTextShadow = null;
      $.FColor = 0;
   }
   /// procedure TW3MovableControl.AdjustToParentBox()
   ///  [line: 3321, column: 29, file: SmartCL.Components]
   ,AdjustToParentBox:function(Self) {
      var dx$3 = 0,
         dy$3 = 0,
         x$45 = 0;
      var LChild$4 = null,
         LCtrl = null;
      if (Self.FHandle$3) {
         if (!Self.FAdjusted) {
            if (!$SetIn(Self.FComponentState,3,0,9)) {
               TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.AdjustToParentBox),30);
               return;
            }
            Self.FAdjusted = true;
            dx$3 = TW3Borders.GetHSpace(TW3MovableControl.GetBorder(Self));
            dy$3 = TW3Borders.GetVSpace(TW3MovableControl.GetBorder(Self));
            if (dx$3>0||dy$3>0) {
               var $temp20;
               for(x$45=0,$temp20=TW3TagContainer.GetChildCount(Self);x$45<$temp20;x$45++) {
                  LChild$4 = TW3TagContainer.GetChildObject(Self,x$45);
                  if ($Is(LChild$4,TW3MovableControl)) {
                     LCtrl = $As(LChild$4,TW3MovableControl);
                     if ($SetIn(TW3TagObj.CreationFlags$(LCtrl),1,0,8)) {
                        TW3MovableControl.SetSize$2(LCtrl,(TW3MovableControl.GetWidth(LCtrl)-dx$3),(TW3MovableControl.GetHeight(LCtrl)-dy$3));
                        TW3MovableControl.AdjustToParentBox(LCtrl);
                     }
                  }
               }
            }
         }
      }
   }
   /// procedure TW3MovableControl.AfterUpdate()
   ///  [line: 3505, column: 29, file: SmartCL.Components]
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
   ///  [line: 3386, column: 28, file: SmartCL.Components]
   ,ClientHeight:function(Self) {
      var Result = 0;
      if (Self.FHandle$3) {
         if (Self.FHandle$3.clientHeight) {
            Result = TVariant.AsInteger(Self.FHandle$3.clientHeight);
            if (TVariant.IsNAN(Result)||(Result==0)) {
               Result = TW3MovableControl.GetHeight(Self);
            }
         } else {
            Result = TW3MovableControl.GetHeight(Self);
         }
      }
      return Result
   }
   /// function TW3MovableControl.ClientRect() : TRect
   ///  [line: 3400, column: 28, file: SmartCL.Components]
   ,ClientRect:function(Self) {
      var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      Result.Left$3 = TW3Border.GetWidth$6(TW3MovableControl.GetBorder(Self).FLeft)+TW3Border.GetPadding(TW3MovableControl.GetBorder(Self).FLeft);
      Result.Top$3 = TW3Border.GetWidth$6(TW3MovableControl.GetBorder(Self).FTop)+TW3Border.GetPadding(TW3MovableControl.GetBorder(Self).FTop);
      Result.Right$1 = Result.Left$3+TW3MovableControl.ClientWidth(Self);
      Result.Bottom$1 = Result.Top$3+TW3MovableControl.ClientHeight(Self);
      return Result
   }
   /// function TW3MovableControl.ClientWidth() : Integer
   ///  [line: 3372, column: 28, file: SmartCL.Components]
   ,ClientWidth:function(Self) {
      var Result = 0;
      if (Self.FHandle$3) {
         if (Self.FHandle$3.clientWidth) {
            Result = TVariant.AsInteger(Self.FHandle$3.clientWidth);
            if (TVariant.IsNAN(Result)||(Result==0)) {
               Result = TW3MovableControl.GetWidth(Self);
            }
         } else {
            Result = TW3MovableControl.GetWidth(Self);
         }
      }
      return Result
   }
   /// procedure TW3MovableControl.FinalizeObject()
   ///  [line: 3453, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      if (Self.FBackground) {
         TObject.Free(Self.FBackground);
      }
      if (Self.FBorders) {
         TObject.Free(Self.FBorders);
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
   ///  [line: 332, column: 28, file: SmartCL.Effects]
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
   ///  [line: 1008, column: 29, file: SmartCL.Effects]
   ,fxFadeIn$1:function(Self, Duration$1, OnFinished$1) {
      var mEffect = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxFadeIn$1(Self,Duration$1,OnFinished$1);
         },50);
      } else {
         mEffect = TW3CustomAnimation.Create$133$($New(TW3FadeAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect,TW3FadeAnimation).FFrom$1 = 0;
         $As(mEffect,TW3FadeAnimation).FTo$1 = 1;
         TW3CustomAnimation.SetDuration(mEffect,Duration$1);
         mEffect.OnAnimationEnds = function (Sender$2) {
            TW3MovableControl.SetVisible(Self,true);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$1) {
               OnFinished$1();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$2,TW3CustomAnimation));
            },1000);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomAnimation.Execute$1(mEffect,Self);
      }
   }
   /// procedure TW3MovableControl.fxFadeOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 1061, column: 29, file: SmartCL.Effects]
   ,fxFadeOut$1:function(Self, Duration$2, OnFinished$2) {
      var mEffect$1 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxFadeOut$1(Self,Duration$2,OnFinished$2);
         },50);
      } else {
         mEffect$1 = TW3CustomAnimation.Create$133$($New(TW3FadeAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect$1,TW3FadeAnimation).FFrom$1 = 1;
         $As(mEffect$1,TW3FadeAnimation).FTo$1 = 0;
         TW3CustomAnimation.SetDuration(mEffect$1,Duration$2);
         mEffect$1.OnAnimationEnds = function (Sender$3) {
            TW3MovableControl.SetVisible(Self,false);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$2) {
               OnFinished$2();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$3,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$1,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveBy(const dx: Integer; const dy: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 639, column: 29, file: SmartCL.Effects]
   ,fxMoveBy$1:function(Self, dx$4, dy$4, Duration$3, OnFinished$3) {
      var mEffect$2 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveBy$1(Self,dx$4,dy$4,Duration$3,OnFinished$3);
         },50);
      } else {
         mEffect$2 = TW3CustomAnimation.Create$133$($New(TW3MoveAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$2,Duration$3);
         $As(mEffect$2,TW3MoveAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$2,TW3MoveAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$2,TW3MoveAnimation).FToX = TW3MovableControl.GetLeft(Self)+dx$4;
         $As(mEffect$2,TW3MoveAnimation).FToY = TW3MovableControl.GetTop(Self)+dy$4;
         $As(mEffect$2,TW3MoveAnimation).FTiming = 4;
         mEffect$2.OnAnimationEnds = function (sender) {
            TW3MovableControl.MoveTo(Self,$As(sender,TW3MoveAnimation).FToX,$As(sender,TW3MoveAnimation).FToY);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$3) {
               OnFinished$3();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$2,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveDown(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 586, column: 29, file: SmartCL.Effects]
   ,fxMoveDown$1:function(Self, Duration$4, OnFinished$4) {
      var mEffect$3 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveDown$1(Self,Duration$4,OnFinished$4);
         },50);
      } else {
         mEffect$3 = TW3CustomAnimation.Create$133$($New(TW3MoveAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$3,Duration$4);
         $As(mEffect$3,TW3MoveAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$3,TW3MoveAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$3,TW3MoveAnimation).FToX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$3,TW3MoveAnimation).FToY = TW3MovableControl.GetHeight($As(TW3TagContainer.a$52(Self),TW3MovableControl))-TW3MovableControl.GetHeight(Self);
         $As(mEffect$3,TW3MoveAnimation).FTiming = 4;
         mEffect$3.OnAnimationEnds = function (sender$1) {
            TW3MovableControl.SetTop(Self,(TW3MovableControl.GetHeight($As(TW3TagContainer.a$52(Self),TW3MovableControl))-TW3MovableControl.GetHeight(Self)));
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$4) {
               OnFinished$4();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$1,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$3,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveTo(const dx: Integer; const dy: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 762, column: 29, file: SmartCL.Effects]
   ,fxMoveTo$1:function(Self, dx$5, dy$5, Duration$5, OnFinished$5) {
      var mEffect$4 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveTo$1(Self,dx$5,dy$5,Duration$5,OnFinished$5);
         },50);
      } else {
         mEffect$4 = TW3CustomAnimation.Create$133$($New(TW3MoveAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$4,Duration$5);
         mEffect$4.FFromX = TW3MovableControl.GetLeft(Self);
         mEffect$4.FFromY = TW3MovableControl.GetTop(Self);
         mEffect$4.FToX = dx$5;
         mEffect$4.FToY = dy$5;
         mEffect$4.FTiming = 4;
         mEffect$4.OnAnimationEnds = function (sender$2) {
            TW3MovableControl.MoveTo(Self,dx$5,dy$5);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$5) {
               OnFinished$5();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$2,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$4,Self);
      }
   }
   /// procedure TW3MovableControl.fxMoveUp(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 534, column: 29, file: SmartCL.Effects]
   ,fxMoveUp$1:function(Self, Duration$6, OnFinished$6) {
      var mEffect$5 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxMoveUp$1(Self,Duration$6,OnFinished$6);
         },50);
      } else {
         mEffect$5 = TW3CustomAnimation.Create$133$($New(TW3MoveAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$5,Duration$6);
         $As(mEffect$5,TW3MoveAnimation).FFromX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$5,TW3MoveAnimation).FFromY = TW3MovableControl.GetTop(Self);
         $As(mEffect$5,TW3MoveAnimation).FToX = TW3MovableControl.GetLeft(Self);
         $As(mEffect$5,TW3MoveAnimation).FToY = 0;
         $As(mEffect$5,TW3MoveAnimation).FTiming = 4;
         mEffect$5.OnAnimationEnds = function (sender$3) {
            TW3MovableControl.SetTop(Self,0);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$6) {
               OnFinished$6();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$3,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$5,Self);
      }
   }
   /// procedure TW3MovableControl.fxScaleDown(FromScale: Float; ToScale: Float; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 413, column: 29, file: SmartCL.Effects]
   ,fxScaleDown$1:function(Self, FromScale$1, ToScale$1, Duration$7, OnFinished$7) {
      var mEffect$6 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxScaleDown$1(Self,FromScale$1,ToScale$1,Duration$7,OnFinished$7);
         },50);
      } else {
         mEffect$6 = TW3CustomAnimation.Create$133$($New(TW3ScaleAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect$6,TW3ScaleAnimation).FFrom = FromScale$1;
         $As(mEffect$6,TW3ScaleAnimation).FTo = ToScale$1;
         $As(mEffect$6,TW3ScaleAnimation).FTiming = 4;
         TW3CustomAnimation.SetDuration($As(mEffect$6,TW3ScaleAnimation),Duration$7);
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
               TObject.Free($As(sender$4,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$6,Self);
      }
   }
   /// procedure TW3MovableControl.fxScaleTo(const aToX: Integer; const aToY: Integer; const aToWidth: Integer; const aToHeight: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 697, column: 29, file: SmartCL.Effects]
   ,fxScaleTo$1:function(Self, aToX, aToY, aToWidth, aToHeight, Duration$8, OnFinished$8) {
      var mEffect$7 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxScaleTo$1(Self,aToX,aToY,aToWidth,aToHeight,Duration$8,OnFinished$8);
         },50);
      } else {
         mEffect$7 = TW3CustomAnimation.Create$133$($New(TW3SizeAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$7,Duration$8);
         $As(mEffect$7,TW3SizeAnimation).FromLeft = TW3MovableControl.GetLeft(Self);
         $As(mEffect$7,TW3SizeAnimation).FromTop = TW3MovableControl.GetTop(Self);
         $As(mEffect$7,TW3SizeAnimation).FromWidth = TW3MovableControl.GetWidth(Self);
         $As(mEffect$7,TW3SizeAnimation).FromHeight = TW3MovableControl.GetHeight(Self);
         $As(mEffect$7,TW3SizeAnimation).ToLeft = aToX;
         $As(mEffect$7,TW3SizeAnimation).ToTop = aToY;
         $As(mEffect$7,TW3SizeAnimation).ToWidth = aToWidth;
         $As(mEffect$7,TW3SizeAnimation).ToHeight = aToHeight;
         $As(mEffect$7,TW3SizeAnimation).FTiming = 4;
         mEffect$7.OnAnimationEnds = function (sender$5) {
            TW3MovableControl.SetBounds(Self,aToX,aToY,aToWidth,aToHeight);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$8) {
               OnFinished$8();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$5,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$7,Self);
      }
   }
   /// procedure TW3MovableControl.fxScaleUp(FromScale: Float; ToScale: Float; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 360, column: 29, file: SmartCL.Effects]
   ,fxScaleUp$1:function(Self, FromScale$2, ToScale$2, Duration$9, OnFinished$9) {
      var mEffect$8 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxScaleUp$1(Self,FromScale$2,ToScale$2,Duration$9,OnFinished$9);
         },50);
      } else {
         mEffect$8 = TW3CustomAnimation.Create$133$($New(TW3ScaleAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         $As(mEffect$8,TW3ScaleAnimation).FFrom = FromScale$2;
         $As(mEffect$8,TW3ScaleAnimation).FTo = ToScale$2;
         $As(mEffect$8,TW3ScaleAnimation).FTiming = 4;
         TW3CustomAnimation.SetDuration($As(mEffect$8,TW3ScaleAnimation),Duration$9);
         mEffect$8.OnAnimationEnds = function (sender$6) {
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
               TObject.Free($As(sender$6,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$8,Self);
      }
   }
   /// procedure TW3MovableControl.fxSizeTo(const aWidth: Integer; const aHeight: Integer; const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 468, column: 29, file: SmartCL.Effects]
   ,fxSizeTo$1:function(Self, aWidth, aHeight, Duration$10, OnFinished$10) {
      var mEffect$9 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxSizeTo$1(Self,aWidth,aHeight,Duration$10,OnFinished$10);
         },50);
      } else {
         mEffect$9 = TW3CustomAnimation.Create$133$($New(TW3SizeAnimation));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$9,Duration$10);
         $As(mEffect$9,TW3SizeAnimation).FromLeft = TW3MovableControl.GetLeft(Self);
         $As(mEffect$9,TW3SizeAnimation).FromTop = TW3MovableControl.GetTop(Self);
         $As(mEffect$9,TW3SizeAnimation).FromWidth = TW3MovableControl.GetWidth(Self);
         $As(mEffect$9,TW3SizeAnimation).FromHeight = TW3MovableControl.GetHeight(Self);
         $As(mEffect$9,TW3SizeAnimation).ToLeft = TW3MovableControl.GetLeft(Self);
         $As(mEffect$9,TW3SizeAnimation).ToTop = TW3MovableControl.GetTop(Self);
         $As(mEffect$9,TW3SizeAnimation).ToWidth = aWidth;
         $As(mEffect$9,TW3SizeAnimation).ToHeight = aHeight;
         $As(mEffect$9,TW3SizeAnimation).FTiming = 4;
         mEffect$9.OnAnimationEnds = function (sender$7) {
            TW3MovableControl.SetBounds(Self,$As(mEffect$9,TW3SizeAnimation).ToLeft,$As(mEffect$9,TW3SizeAnimation).ToTop,$As(mEffect$9,TW3SizeAnimation).ToWidth,$As(mEffect$9,TW3SizeAnimation).ToHeight);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$10) {
               OnFinished$10();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(sender$7,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$9,Self);
      }
   }
   /// procedure TW3MovableControl.fxWarpIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 959, column: 29, file: SmartCL.Effects]
   ,fxWarpIn$1:function(Self, Duration$11, OnFinished$11) {
      var mEffect$10 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxWarpIn$1(Self,Duration$11,OnFinished$11);
         },50);
      } else {
         mEffect$10 = TW3CustomAnimation.Create$133$($New(TW3WarpInTransition));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$10,Duration$11);
         mEffect$10.OnAnimationEnds = function (Sender$4) {
            TW3MovableControl.SetVisible(Self,true);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$11) {
               OnFinished$11();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$4,TW3CustomAnimation));
            },1000);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomAnimation.Execute$1(mEffect$10,Self);
      }
   }
   /// procedure TW3MovableControl.fxWarpOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 911, column: 29, file: SmartCL.Effects]
   ,fxWarpOut$1:function(Self, Duration$12, OnFinished$12) {
      var mEffect$11 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxWarpOut$1(Self,Duration$12,OnFinished$12);
         },50);
      } else {
         mEffect$11 = TW3CustomAnimation.Create$133$($New(TW3WarpOutTransition));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$11,Duration$12);
         mEffect$11.OnAnimationEnds = function (Sender$5) {
            TW3MovableControl.SetVisible(Self,false);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$12) {
               OnFinished$12();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$5,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$11,Self);
      }
   }
   /// procedure TW3MovableControl.fxZoomIn(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 815, column: 29, file: SmartCL.Effects]
   ,fxZoomIn$1:function(Self, Duration$13, OnFinished$13) {
      var mEffect$12 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxZoomIn$1(Self,Duration$13,OnFinished$13);
         },50);
      } else {
         mEffect$12 = TW3CustomAnimation.Create$133$($New(TW3ZoomInTransition));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$12,Duration$13);
         mEffect$12.OnAnimationEnds = function (Sender$6) {
            TW3MovableControl.SetVisible(Self,true);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$13) {
               OnFinished$13();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$6,TW3CustomAnimation));
            },1000);
         };
         TW3MovableControl.SetVisible(Self,true);
         TW3CustomAnimation.Execute$1(mEffect$12,Self);
      }
   }
   /// procedure TW3MovableControl.fxZoomOut(const Duration: Float; const OnFinished: TProcedureRef)
   ///  [line: 864, column: 29, file: SmartCL.Effects]
   ,fxZoomOut$1:function(Self, Duration$14, OnFinished$14) {
      var mEffect$13 = null;
      if (TW3MovableControl.fxBusy(Self)) {
         TW3Dispatch.SetTimeOut(TW3Dispatch,function () {
            TW3MovableControl.fxZoomOut$1(Self,Duration$14,OnFinished$14);
         },50);
      } else {
         mEffect$13 = TW3CustomAnimation.Create$133$($New(TW3ZoomOutTransition));
         TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[true?1:0]);
         TW3CustomAnimation.SetDuration(mEffect$13,Duration$14);
         mEffect$13.OnAnimationEnds = function (Sender$7) {
            TW3MovableControl.SetVisible(Self,false);
            TW3ElementAttributes.Write$9(TW3TagObj.GetAttributes(Self),"fxBusy",cYesNoLUT[false?1:0]);
            if (OnFinished$14) {
               OnFinished$14();
            }
            TW3Dispatch.Execute(TW3Dispatch,function () {
               TObject.Free($As(Sender$7,TW3CustomAnimation));
            },1000);
         };
         TW3CustomAnimation.Execute$1(mEffect$13,Self);
      }
   }
   /// function TW3MovableControl.GetBorder() : TW3Borders
   ///  [line: 3498, column: 28, file: SmartCL.Components]
   ,GetBorder:function(Self) {
      var Result = null;
      if (Self.FBorders===null) {
         Self.FBorders = TW3OwnedObject.Create$11$($New(TW3Borders),Self);
      }
      Result = Self.FBorders;
      return Result
   }
   /// function TW3MovableControl.GetBoundsRect() : TRect
   ///  [line: 3609, column: 28, file: SmartCL.Components]
   ,GetBoundsRect:function(Self) {
      var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      Result.Left$3 = w3_GetStyleAsInt(Self.FHandle$3,"left");
      Result.Top$3 = w3_GetStyleAsInt(Self.FHandle$3,"top");
      if (Self.FHandle$3) {
         Result.Right$1 = parseInt((Result.Left$3+Self.FHandle$3.offsetWidth),10);
         Result.Bottom$1 = parseInt((Result.Top$3+Self.FHandle$3.offsetHeight),10);
      } else {
         Result.Right$1 = Result.Left$3;
         Result.Bottom$1 = Result.Top$3;
      }
      return Result
   }
   /// function TW3MovableControl.GetFont() : TW3CustomFont
   ///  [line: 3103, column: 28, file: SmartCL.Components]
   ,GetFont:function(Self) {
      var Result = null;
      if (Self.FFont===null) {
         Self.FFont = TW3ControlFont.Create$120($New(TW3ControlFont),Self);
      }
      Result = Self.FFont;
      return Result
   }
   /// function TW3MovableControl.GetHeight() : Integer
   ///  [line: 3734, column: 28, file: SmartCL.Components]
   ,GetHeight:function(Self) {
      var Result = 0;
      var LHandle$1 = undefined;
      LHandle$1 = Self.FHandle$3;
      if (LHandle$1)
      Result = (LHandle$1).offsetHeight;
      return Result
   }
   /// function TW3MovableControl.GetLeft() : Integer
   ///  [line: 3625, column: 28, file: SmartCL.Components]
   ,GetLeft:function(Self) {
      var Result = 0;
      var LRef$1 = undefined;
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
      return Result
   }
   /// function TW3MovableControl.GetStyleClass() : String
   ///  [line: 3124, column: 28, file: SmartCL.Components]
   ,GetStyleClass:function(Self) {
      return w3_getAttribAsStr(Self.FHandle$3,"class");
   }
   /// function TW3MovableControl.GetTop() : Integer
   ///  [line: 3670, column: 28, file: SmartCL.Components]
   ,GetTop:function(Self) {
      var Result = 0;
      var LRef$2 = undefined;
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
      return Result
   }
   /// function TW3MovableControl.GetVisible() : Boolean
   ///  [line: 3564, column: 28, file: SmartCL.Components]
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
   ///  [line: 3704, column: 28, file: SmartCL.Components]
   ,GetWidth:function(Self) {
      var Result = 0;
      var LHandle$2 = undefined;
      LHandle$2 = Self.FHandle$3;
      if (LHandle$2)
      Result = (LHandle$2).offsetWidth;
      return Result
   }
   /// procedure TW3MovableControl.InitializeObject()
   ///  [line: 3074, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3CustomComponent.InitializeObject(Self);
      Self.FAlpha = 255;
      Self.FColor = 536870911;
      Self.FTransparent = false;
      if (TW3TagContainer.a$52(Self)) {
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
   ///  [line: 3647, column: 29, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      if ((!$SetIn(Self.FComponentState,7,0,9))&&(!$SetIn(Self.FComponentState,8,0,9))) {
         if (TW3MovableControl.GetVisible(Self)) {
            TW3TagObj.AddToComponentState(Self,[128]);
            TW3Dispatch.Execute(TW3Dispatch,$Event0(Self,TW3MovableControl.ResizeWhenReady),10);
         }
      }
   }
   /// procedure TW3MovableControl.Moved()
   ///  [line: 3763, column: 29, file: SmartCL.Components]
   ,Moved:function(Self) {
      /* null */
   }
   /// procedure TW3MovableControl.MoveTo(const NewLeft: Integer; const NewTop: Integer)
   ///  [line: 3829, column: 29, file: SmartCL.Components]
   ,MoveTo:function(Self, NewLeft, NewTop) {
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle$3.style.left = TInteger.ToPxStr(NewLeft);
      Self.FHandle$3.style.top = TInteger.ToPxStr(NewTop);
      TW3TagObj.AddToComponentState(Self,[32]);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.ObjectReady()
   ///  [line: 3255, column: 29, file: SmartCL.Components]
   ,ObjectReady:function(Self) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (Self.FHandle$3) {
            TW3TagObj.AddToComponentState(Self,[8]);
            TW3TagObj.HookEvents$(Self);
            if ((TW3TagContainer.a$52(Self)!==null)&&((TW3MovableControl.GetWidth(Self)!=0)||(TW3MovableControl.GetHeight(Self)!=0))) {
               TW3MovableControl.ResizeWhenReady(Self);
            }
         }
      }
   }
   /// function TW3MovableControl.QueryChildrenReady() : Boolean
   ///  [line: 3167, column: 28, file: SmartCL.Components]
   ,QueryChildrenReady:function(Self) {
      var Result = false;
      var LCount$1 = 0,
         x$46 = 0;
      var LItem$6 = null;
      if (!$SetIn(Self.FComponentState,0,0,9)) {
         if (!$SetIn(Self.FComponentState,1,0,9)) {
            LCount$1 = TW3TagContainer.GetChildCount(Self);
            if (LCount$1>0) {
               var $temp21;
               for(x$46=0,$temp21=LCount$1;x$46<$temp21;x$46++) {
                  LItem$6 = TW3TagContainer.GetChildObject(Self,x$46);
                  Result = $SetIn(LItem$6.FComponentState,3,0,9);
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
   /// procedure TW3MovableControl.ReadySync()
   ///  [line: 3198, column: 29, file: SmartCL.Components]
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
         if (TControlHandleHelper$Ready$2(Self.FHandle$3)) {
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
                  if (TW3MovableControl.QueryChildrenReady(Self)) {
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
   ///  [line: 3767, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      var wd = 0,
         xwidth = 0,
         fbase = 0,
         fSize = 0;
      if (Self.FFont!==null) {
         if (Self.FFont.FAuto) {
            wd = TW3MovableControl.GetWidth(Self);
            if (wd>0) {
               xwidth = (wd>9999)?9999:(wd<1)?1:wd;
               fbase = Math.round(xwidth/6.3);
               fSize = (fbase>9999)?9999:(fbase<1)?1:fbase;
               Self.FHandle$3.style.fontSize = TInteger.ToPxStr(fSize);
            }
         }
      }
      if ($SetIn(TW3TagObj.CreationFlags$(Self),5,0,8)) {
         if (Self.FOnResize) {
            Self.FOnResize(Self);
         }
      }
   }
   /// procedure TW3MovableControl.ResizeWhenReady()
   ///  [line: 3798, column: 29, file: SmartCL.Components]
   ,ResizeWhenReady:function(Self) {
      if ($SetIn(Self.FComponentState,6,0,9)) {
         if (TW3MovableControl.QueryChildrenReady(Self)) {
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
      }
   }
   /// function TW3MovableControl.ScreenRect() : TRect
   ///  [line: 3408, column: 28, file: SmartCL.Components]
   ,ScreenRect:function(Self) {
      var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      var LElement$1 = undefined;
      if (Self.FHandle$3) {
         LElement$1 = Self.FHandle$3;
         while (LElement$1) {
            Result.Left$3+=parseInt(LElement$1.offsetLeft,10);
            Result.Top$3+=parseInt(LElement$1.offsetTop,10);
            LElement$1 = LElement$1.offsetParent;
            if (LElement$1) {
               Result.Left$3-=parseInt(LElement$1.scrollLeft,10);
               Result.Top$3-=parseInt(LElement$1.scrollTop,10);
            } else {
               break;
            }
         }
         Result.Right$1 = parseInt((Result.Left$3+Self.FHandle$3.offsetWidth),10);
         Result.Bottom$1 = parseInt((Result.Top$3+Self.FHandle$3.offsetHeight),10);
      }
      return Result
   }
   /// procedure TW3MovableControl.SetAlpha(const NewAlphaValue: Integer)
   ///  [line: 3923, column: 29, file: SmartCL.Components]
   ,SetAlpha:function(Self, NewAlphaValue) {
      Self.FAlpha = TInteger.EnsureRange(NewAlphaValue,0,255);
      if (Self.FUseAlpha) {
         Self.FHandle$3.style["opacity"] = Self.FAlpha*0.01;
      }
   }
   /// procedure TW3MovableControl.SetBounds(const NewLeft: Integer; const NewTop: Integer; const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 3838, column: 29, file: SmartCL.Components]
   ,SetBounds:function(Self, NewLeft$1, NewTop$1, NewWidth, NewHeight) {
      var LWidth = 0,
         LHeight = 0,
         LMoved = false,
         LSized = false;
      LWidth = Math.max(NewWidth,0);
      LHeight = Math.max(NewHeight,0);
      LMoved = NewLeft$1!=TW3MovableControl.GetLeft(Self)||NewTop$1!=TW3MovableControl.GetTop(Self);
      LSized = LWidth!=TW3MovableControl.GetWidth(Self)||LHeight!=TW3MovableControl.GetHeight(Self);
      if (LMoved||LSized) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.left = TInteger.ToPxStr(NewLeft$1);
            Self.FHandle$3.style.top = TInteger.ToPxStr(NewTop$1);
            Self.FHandle$3.style.width = TInteger.ToPxStr(LWidth);
            Self.FHandle$3.style.height = TInteger.ToPxStr(LHeight);
            if (LMoved) {
               TW3TagObj.AddToComponentState(Self,[32]);
            }
            if (LSized) {
               TW3TagObj.AddToComponentState(Self,[16]);
            }
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.left = TInteger.ToPxStr(NewLeft$1);
            Self.FHandle$3.style.top = TInteger.ToPxStr(NewTop$1);
            Self.FHandle$3.style.width = TInteger.ToPxStr(LWidth);
            Self.FHandle$3.style.height = TInteger.ToPxStr(LHeight);
         }
      }
   }
   /// procedure TW3MovableControl.SetColor(const NewColor: TColor)
   ///  [line: 3955, column: 29, file: SmartCL.Components]
   ,SetColor:function(Self, NewColor) {
      var LAlpha = 0,
         LHandle$3 = undefined,
         LTransparent = false,
         r$4 = 0,
         g$2 = 0,
         b$3 = 0;
      if (NewColor!=Self.FColor) {
         Self.FColor = NewColor;
         LAlpha = Self.FAlpha;
         LHandle$3 = Self.FHandle$3;
         LTransparent = Self.FTransparent;
         r$4 = (NewColor>>>16)&255;
         g$2 = (NewColor>>>8)&255;
         b$3 = NewColor&255;
         if (Self.FTransparent) {
            Self.FHandle$3.style.backgroundColor = ("rgba("+__StrByteLUT[r$4]+","+__StrByteLUT[g$2]+","+__StrByteLUT[b$3]+","+__StrByteLUT[$Div(Self.FAlpha,255)]+")");
         } else {
            Self.FHandle$3.style.backgroundColor = ("#"+__ByteToHexLUT[r$4]+__ByteToHexLUT[g$2]+__ByteToHexLUT[b$3]);
         }
      }
   }
   /// procedure TW3MovableControl.SetHeight(const NewHeight: Integer)
   ///  [line: 3743, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, NewHeight$1) {
      var LValue = 0;
      LValue = Math.max(NewHeight$1,0);
      if (LValue!=TW3MovableControl.GetHeight(Self)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.height = TInteger.ToPxStr(LValue);
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.height = TInteger.ToPxStr(LValue);
         }
      }
   }
   /// procedure TW3MovableControl.SetLeft(const NewLeft: Integer)
   ///  [line: 3658, column: 29, file: SmartCL.Components]
   ,SetLeft:function(Self, NewLeft$2) {
      if ($SetIn(Self.FComponentState,3,0,9)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle$3.style.left = TInteger.ToPxStr(NewLeft$2);
         TW3TagObj.AddToComponentState(Self,[32]);
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle$3.style.left = TInteger.ToPxStr(NewLeft$2);
      }
   }
   /// procedure TW3MovableControl.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 3883, column: 29, file: SmartCL.Components]
   ,SetSize$2:function(Self, NewWidth$1, NewHeight$2) {
      var LWidth$1 = 0,
         LHeight$1 = 0;
      LWidth$1 = Math.max(NewWidth$1,0);
      LHeight$1 = Math.max(NewHeight$2,0);
      if (LWidth$1!=w3_GetStyleAsInt(Self.FHandle$3,"width")||LHeight$1!=w3_GetStyleAsInt(Self.FHandle$3,"height")) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.width = TInteger.ToPxStr(LWidth$1);
            Self.FHandle$3.style.height = TInteger.ToPxStr(LHeight$1);
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.width = TInteger.ToPxStr(LWidth$1);
            Self.FHandle$3.style.height = TInteger.ToPxStr(LHeight$1);
         }
      }
   }
   /// procedure TW3MovableControl.SetStyleClass(const NewStyleClass: String)
   ///  [line: 3129, column: 29, file: SmartCL.Components]
   ,SetStyleClass:function(Self, NewStyleClass) {
      w3_setAttrib(Self.FHandle$3,"class",NewStyleClass);
   }
   /// procedure TW3MovableControl.SetTop(const NewTop: Integer)
   ///  [line: 3692, column: 29, file: SmartCL.Components]
   ,SetTop:function(Self, NewTop$2) {
      if ($SetIn(Self.FComponentState,3,0,9)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle$3.style.top = TInteger.ToPxStr(NewTop$2);
         TW3TagObj.AddToComponentState(Self,[32]);
         TW3TagObj.EndUpdate(Self);
      } else {
         Self.FHandle$3.style.top = TInteger.ToPxStr(NewTop$2);
      }
   }
   /// procedure TW3MovableControl.SetTransparent(const Transparency: Boolean)
   ///  [line: 3933, column: 29, file: SmartCL.Components]
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
   ///  [line: 3914, column: 29, file: SmartCL.Components]
   ,SetUseAlpha:function(Self, NewUseAlpha) {
      if (Self.FUseAlpha!=NewUseAlpha) {
         Self.FUseAlpha = NewUseAlpha;
         Self.FHandle$3.style["opacity"] = (NewUseAlpha)?Self.FAlpha*0.01:1;
      }
   }
   /// procedure TW3MovableControl.SetVisible(const NewVisibility: Boolean)
   ///  [line: 3582, column: 29, file: SmartCL.Components]
   ,SetVisible:function(Self, NewVisibility) {
      TW3TagObj.BeginUpdate(Self);
      try {
         if (NewVisibility) {
            if (Self.FHandle$3.style["visibility"]!="visible") {
               Self.FHandle$3.style["display"] = TW3TagObj.GetDisplayModeText(Self);
               Self.FHandle$3.style["visibility"] = "visible";
               TW3TagObj.AddToComponentState(Self,[16]);
            }
         } else {
            Self.FHandle$3.style["display"] = "none";
            Self.FHandle$3.style["visibility"] = "hidden";
         }
      } finally {
         TW3TagObj.EndUpdate(Self);
         if (!$SetIn(Self.FComponentState,8,0,9)) {
            if (Self.FOnVisible) {
               Self.FOnVisible(Self);
            }
         }
      }
   }
   /// procedure TW3MovableControl.SetWidth(const NewWidth: Integer)
   ///  [line: 3713, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, NewWidth$2) {
      var LValue$1 = 0;
      LValue$1 = Math.max(NewWidth$2,0);
      if (LValue$1!=TW3MovableControl.GetWidth(Self)) {
         if ($SetIn(Self.FComponentState,3,0,9)) {
            TW3TagObj.BeginUpdate(Self);
            Self.FHandle$3.style.width = TInteger.ToPxStr(LValue$1);
            TW3TagObj.AddToComponentState(Self,[16]);
            TW3TagObj.EndUpdate(Self);
         } else {
            Self.FHandle$3.style.width = TInteger.ToPxStr(LValue$1);
         }
      }
   }
   /// function TW3MovableControl.Showing() : Boolean
   ///  [line: 3149, column: 28, file: SmartCL.Components]
   ,Showing:function(Self) {
      return TW3TagContainer.Showing(Self)&&TW3MovableControl.GetWidth(Self)>0&&TW3MovableControl.GetHeight(Self)>0&&TW3MovableControl.GetLeft(Self)>=0&&TW3MovableControl.GetLeft(Self)<TW3MovableControl.GetWidth(Self)&&TW3MovableControl.GetTop(Self)>=0&&TW3MovableControl.GetTop(Self)<TW3MovableControl.GetHeight(Self)&&TW3MovableControl.GetVisible(Self);
   }
   /// procedure TW3MovableControl.StyleTagObject()
   ///  [line: 3112, column: 29, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      TW3TagObj.StyleTagObject(Self);
      if ($SetIn(TW3TagObj.CreationFlags$(Self),7,0,8)) {
         w3_setAttrib(Self.FHandle$3,"tabindex",0);
      }
      TW3MovableControl.SetStyleClass(Self,TObject.ClassName(Self.ClassType));
      TW3MovableControl.SetVisible(Self,true);
   }
   /// procedure TW3MovableControl._SetOnMoved(const EventHandler: TMovedEvent)
   ///  [line: 3144, column: 29, file: SmartCL.Components]
   ,_SetOnMoved:function(Self, EventHandler$2) {
      Self.FOnMoved = EventHandler$2;
   }
   /// procedure TW3MovableControl._SetOnResized(const EventHandler: TReSizeEvent)
   ///  [line: 3139, column: 29, file: SmartCL.Components]
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
};
TW3MovableControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3CustomControl = class (TW3MovableControl)
///  [line: 939, column: 3, file: SmartCL.Components]
var TW3CustomControl = {
   $ClassName:"TW3CustomControl",$Parent:TW3MovableControl
   ,$Init:function ($) {
      TW3MovableControl.$Init($);
      $.SimulateMouseEvents = $.FTransparentEvents = false;
      $.FAngle = 0;
      $.FGestureData = $.FOnAllMovement = $.FOnAnimationBegins = $.FOnAnimationEnds = $.FOnBeginMovement = $.FOnChanged = $.FOnClick = $.FOnContextPopup = $.FOnDblClick = $.FOnEndMovement = $.FOnGestureChange = $.FOnGestureEnd = $.FOnGestureStart = $.FOnGotFocus = $.FOnHorizontalMovement = $.FOnKeyDown = $.FOnKeyPress = $.FOnKeyUp = $.FOnLostFocus = $.FOnMouseDown = $.FOnMouseEnter = $.FOnMouseExit = $.FOnMouseMove = $.FOnMouseUp = $.FOnMouseWheel = $.FOnSelectionEnds = $.FOnSelectionStarts = $.FOnTouchBegins = $.FOnTouchEnds = $.FOnTouchMoves = $.FOnVerticalMovement = $.FScrollInfo = $.FTagStyle = $.FTouchData = null;
      $.FMouseTouchEventsCount = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 1123, column: 40, file: SmartCL.Components]
   ,a$55:function(Self) {
      return $As(TW3MovableControl.GetFont(Self),TW3ControlFont);
   }
   /// procedure TW3CustomControl.CBAnimationBegins(const EventObj: Variant)
   ///  [line: 4972, column: 28, file: SmartCL.Components]
   ,CBAnimationBegins:function(Self, EventObj) {
      if (Self.FOnAnimationBegins) {
         Self.FOnAnimationBegins(Self);
      }
   }
   /// procedure TW3CustomControl.CBAnimationEnds(const EventObj: Variant)
   ///  [line: 5011, column: 28, file: SmartCL.Components]
   ,CBAnimationEnds:function(Self, EventObj$1) {
      if (Self.FOnAnimationEnds) {
         Self.FOnAnimationEnds(Self);
      }
   }
   /// procedure TW3CustomControl.CBChanged(eventObj: JEvent)
   ///  [line: 5026, column: 28, file: SmartCL.Components]
   ,CBChanged:function(Self, eventObj) {
      if (Self.FOnChanged) {
         Self.FOnChanged(Self);
      }
   }
   /// procedure TW3CustomControl.CBClick(eventObj: JEvent)
   ///  [line: 4883, column: 28, file: SmartCL.Components]
   ,CBClick:function(Self, eventObj$1) {
      if (Self.FOnClick) {
         Self.FOnClick(Self);
      }
   }
   /// function TW3CustomControl.CBContextPopup(Event: JMouseEvent) : Boolean
   ///  [line: 5041, column: 27, file: SmartCL.Components]
   ,CBContextPopup:function(Self, Event$2) {
      var Result = false;
      var Lsr = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         LMP = {X$1:0,Y$1:0},
         LHandled = {v:false};
      Lsr = TW3MovableControl.ScreenRect(Self);
      LMP = Create$108((Event$2.clientX-Lsr.Left$3),(Event$2.clientY-Lsr.Top$3));
      LHandled.v = false;
      TW3CustomControl.ContextPopup(Self,LMP,LHandled);
      Result = !LHandled.v;
      return Result
   }
   /// procedure TW3CustomControl.CBDblClick(eventObj: JEvent)
   ///  [line: 4901, column: 28, file: SmartCL.Components]
   ,CBDblClick:function(Self, eventObj$2) {
      if (Self.FOnDblClick) {
         Self.FOnDblClick(Self);
      }
   }
   /// procedure TW3CustomControl.CBFocused()
   ///  [line: 4505, column: 28, file: SmartCL.Components]
   ,CBFocused:function(Self) {
      if (Self.FOnGotFocus) {
         Self.FOnGotFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBKeyDown(eventObj: JKeyboardEvent)
   ///  [line: 4918, column: 28, file: SmartCL.Components]
   ,CBKeyDown:function(Self, eventObj$3) {
      if (Self.FOnKeyDown) {
         Self.FOnKeyDown(Self,eventObj$3.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBKeyPress(eventObj: JKeyboardEvent)
   ///  [line: 4948, column: 28, file: SmartCL.Components]
   ,CBKeyPress:function(Self, eventObj$4) {
      var LChar$1 = "";
      if (Self.FOnKeyPress) {
         if (eventObj$4.keyCode) {
            try {
               LChar$1 = TDatatype.ByteToChar(TDatatype,eventObj$4.keyCode);
               Self.FOnKeyPress(Self,LChar$1);
            } catch ($e) {
               /* null */
            }
         }
      }
   }
   /// procedure TW3CustomControl.CBKeyUp(eventObj: JKeyboardEvent)
   ///  [line: 4933, column: 28, file: SmartCL.Components]
   ,CBKeyUp:function(Self, eventObj$5) {
      if (Self.FOnKeyUp) {
         Self.FOnKeyUp(Self,eventObj$5.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBLostFocus()
   ///  [line: 4511, column: 28, file: SmartCL.Components]
   ,CBLostFocus:function(Self) {
      if (Self.FOnLostFocus) {
         Self.FOnLostFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBMouseDown(eventObj: JMouseEvent)
   ///  [line: 4692, column: 28, file: SmartCL.Components]
   ,CBMouseDown:function(Self, eventObj$6) {
      var sr = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState = null,
         dx$6 = 0,
         dy$6 = 0;
      sr = TW3MovableControl.ScreenRect(Self);
      shiftState = TShiftState.Current();
      shiftState.FMouseButtons = shiftState.FMouseButtons|(1<<eventObj$6.button);
      TShiftState.SetMouseEvent(shiftState,eventObj$6);
      dx$6 = eventObj$6.clientX;
      (dx$6-= sr.Left$3);
      (dx$6+= TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self)));
      dy$6 = eventObj$6.clientY;
      (dy$6-= sr.Top$3);
      (dy$6+= TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self)));
      TW3CustomControl.MouseDown(Self,parseInt(eventObj$6.button,10),shiftState,dx$6,dy$6);
   }
   /// procedure TW3CustomControl.CBMouseEnter(eventObj: JMouseEvent)
   ///  [line: 4794, column: 28, file: SmartCL.Components]
   ,CBMouseEnter:function(Self, eventObj$7) {
      var sr$1 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$1 = null;
      sr$1 = TW3MovableControl.ScreenRect(Self);
      shiftState$1 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$1,eventObj$7);
      TW3CustomControl.MouseEnter(Self,shiftState$1,eventObj$7.clientX-sr$1.Left$3,eventObj$7.clientY-sr$1.Top$3);
   }
   /// procedure TW3CustomControl.CBMouseExit(eventObj: JMouseEvent)
   ///  [line: 4820, column: 28, file: SmartCL.Components]
   ,CBMouseExit:function(Self, eventObj$8) {
      var sr$2 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$2 = null;
      sr$2 = TW3MovableControl.ScreenRect(Self);
      shiftState$2 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$2,eventObj$8);
      TW3CustomControl.MouseExit(Self,shiftState$2,eventObj$8.clientX-sr$2.Left$3,eventObj$8.clientY-sr$2.Top$3);
   }
   /// procedure TW3CustomControl.CBMouseMove(eventObj: JMouseEvent)
   ///  [line: 4750, column: 28, file: SmartCL.Components]
   ,CBMouseMove:function(Self, eventObj$9) {
      var sr$3 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$3 = null,
         dx$7 = 0,
         dy$7 = 0;
      sr$3 = TW3MovableControl.ScreenRect(Self);
      shiftState$3 = TShiftState.Current();
      TShiftState.SetMouseEvent(shiftState$3,eventObj$9);
      dx$7 = eventObj$9.clientX;
      (dx$7-= sr$3.Left$3);
      (dx$7+= TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self)));
      dy$7 = eventObj$9.clientY;
      (dy$7-= sr$3.Top$3);
      (dy$7+= TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self)));
      TW3CustomControl.MouseMove(Self,shiftState$3,dx$7,dy$7);
   }
   /// procedure TW3CustomControl.CBMouseUp(eventObj: JMouseEvent)
   ///  [line: 4716, column: 28, file: SmartCL.Components]
   ,CBMouseUp:function(Self, eventObj$10) {
      var sr$4 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$4 = null,
         dx$8 = 0,
         dy$8 = 0;
      sr$4 = TW3MovableControl.ScreenRect(Self);
      shiftState$4 = TShiftState.Current();
      shiftState$4.FMouseButtons = shiftState$4.FMouseButtons&(~(1<<eventObj$10.button));
      TShiftState.SetMouseEvent(shiftState$4,eventObj$10);
      dx$8 = eventObj$10.clientX;
      (dx$8-= sr$4.Left$3);
      (dx$8+= TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self)));
      dy$8 = eventObj$10.clientY;
      (dy$8-= sr$4.Top$3);
      (dy$8+= TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self)));
      TW3CustomControl.MouseUp(Self,parseInt(eventObj$10.button,10),shiftState$4,dx$8,dy$8);
   }
   /// procedure TW3CustomControl.CBMouseWheel(eventObj: JMouseWheelEvent)
   ///  [line: 4839, column: 28, file: SmartCL.Components]
   ,CBMouseWheel:function(Self, eventObj$11) {
      var wheelDelta$1 = 0;
      var sr$5 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         shiftState$5 = null,
         mousePos = {X$1:0,Y$1:0};
      var Handled = {v:false};
      if (Self.FOnMouseWheel) {
         if (eventObj$11.detail) {
            wheelDelta$1 = eventObj$11.detail*-40;
         } else {
            wheelDelta$1 = eventObj$11.wheelDelta;
         }
         sr$5 = TW3MovableControl.ScreenRect(Self);
         shiftState$5 = TShiftState.Current();
         TShiftState.SetMouseEvent(shiftState$5,eventObj$11);
         mousePos.X$1 = eventObj$11.clientX-sr$5.Left$3;
         mousePos.Y$1 = eventObj$11.clientY-sr$5.Top$3;
         Handled.v = false;
         TW3CustomControl.MouseWheel(Self,shiftState$5,wheelDelta$1,mousePos,Handled);
         if (Handled.v) {
            eventObj$11.preventDefault();
            eventObj$11.stopPropagation();
         }
      }
   }
   /// procedure TW3CustomControl.CBSelectionStarts(EventObj: JEvent)
   ///  [line: 4978, column: 28, file: SmartCL.Components]
   ,CBSelectionStarts:function(Self, EventObj$2) {
      if (Self.FOnSelectionStarts) {
         Self.FOnSelectionStarts(Self);
      }
   }
   /// procedure TW3CustomControl.CMGestureChange()
   ///  [line: 4428, column: 28, file: SmartCL.Components]
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
   ///  [line: 4454, column: 28, file: SmartCL.Components]
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
   ///  [line: 4402, column: 28, file: SmartCL.Components]
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
   ///  [line: 4331, column: 28, file: SmartCL.Components]
   ,CMTouchBegins:function(Self, eventObj$12) {
      eventObj$12.preventDefault();
      if (Self.FOnTouchBegins) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         TW3TouchData.Update$1(Self.FTouchData,eventObj$12);
         Self.FOnTouchBegins(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchEnds(eventObj: JTouchEvent)
   ///  [line: 4376, column: 28, file: SmartCL.Components]
   ,CMTouchEnds:function(Self, eventObj$13) {
      if (Self.FOnTouchEnds) {
         if (!Self.FTouchData) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         TW3TouchData.Update$1(Self.FTouchData,eventObj$13);
         Self.FOnTouchEnds(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchMove(eventObj: JTouchEvent)
   ///  [line: 4356, column: 28, file: SmartCL.Components]
   ,CMTouchMove:function(Self, eventObj$14) {
      if (Self.FOnTouchMoves) {
         TW3CustomBrowserAPI.a$34(BrowserAPI().ClassType).stopImmediatePropagation();
         if (Self.FTouchData===null) {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         TW3TouchData.Update$1(Self.FTouchData,eventObj$14);
         Self.FOnTouchMoves(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.ContextPopup(const MousePos: TPoint; var Handled: Boolean)
   ///  [line: 5056, column: 28, file: SmartCL.Components]
   ,ContextPopup:function(Self, MousePos, Handled$1) {
      if (Self.FOnContextPopup) {
         Self.FOnContextPopup(Self,MousePos,Handled$1);
      }
   }
   /// procedure TW3CustomControl.Dispatch(Kind: TW3EventManagerTypes; eventObj: JEvent)
   ///  [line: 4299, column: 28, file: SmartCL.Components]
   ,Dispatch:function(Self, Kind$1, eventObj$15) {
      try {
         switch (Kind$1) {
            case 1 :
               TW3CustomControl.CBMouseDown(Self,eventObj$15);
               break;
            case 2 :
               TW3CustomControl.CBMouseMove(Self,eventObj$15);
               break;
            case 3 :
               TW3CustomControl.CBMouseUp(Self,eventObj$15);
               break;
            case 4 :
               TW3CustomControl.CMTouchBegins(Self,eventObj$15);
               break;
            case 5 :
               TW3CustomControl.CMTouchMove(Self,eventObj$15);
               break;
            case 6 :
               TW3CustomControl.CMTouchEnds(Self,eventObj$15);
               break;
            case 7 :
               TW3CustomControl.CBClick(Self,eventObj$15);
               break;
            case 8 :
               TW3CustomControl.CBMouseEnter(Self,eventObj$15);
               break;
            case 9 :
               TW3CustomControl.CBMouseExit(Self,eventObj$15);
               break;
            case 10 :
               TW3CustomControl.CBMouseWheel(Self,eventObj$15);
               break;
            case 11 :
               TW3CustomControl.CBDblClick(Self,eventObj$15);
               break;
         }
      } catch ($e) {
         /* null */
      }
   }
   /// procedure TW3CustomControl.FinalizeObject()
   ///  [line: 4127, column: 28, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FTagStyle);
      TObject.Free(Self.FScrollInfo);
      TObject.Free(Self.FTouchData);
      TObject.Free(Self.FGestureData);
      TW3MovableControl.FinalizeObject(Self);
   }
   /// function TW3CustomControl.GetBorderRadius() : Integer
   ///  [line: 5096, column: 27, file: SmartCL.Components]
   ,GetBorderRadius:function(Self) {
      return w3_GetStyleAsInt(Self.FHandle$3,"bordertopleftRadius");
   }
   /// function TW3CustomControl.GetChildrenSortedByYPos() : TW3TagContainerArray
   ///  [line: 4558, column: 27, file: SmartCL.Components]
   ,GetChildrenSortedByYPos:function(Self) {
      var Result = [];
      var mCount = 0,
         x$47 = 0;
      var mObj$4 = null,
         mAltered = false,
         x$48 = 0;
      var mLast = null,
         mCurrent = null;
      mCount = TW3TagContainer.GetChildCount(Self);
      if (mCount>0) {
         var $temp22;
         for(x$47=0,$temp22=mCount;x$47<$temp22;x$47++) {
            mObj$4 = TW3TagContainer.GetChildObject(Self,x$47);
            if ($Is(mObj$4,TW3CustomControl)) {
               Result.push(mObj$4);
            }
         }
         if (Result.length>1) {
            mAltered = false;
            do {
               mAltered = false;
               var $temp23;
               for(x$48=1,$temp23=mCount;x$48<$temp23;x$48++) {
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
   ///  [line: 4491, column: 27, file: SmartCL.Components]
   ,GetEnabled$1:function(Self) {
      return Self.FHandle$3.disabled!=true;
   }
   /// function TW3CustomControl.GetScrollInfo() : TW3ScrollInfo
   ///  [line: 4475, column: 27, file: SmartCL.Components]
   ,GetScrollInfo:function(Self) {
      var Result = null;
      if (Self.FScrollInfo===null) {
         Self.FScrollInfo = TW3ScrollInfo.Create$119($New(TW3ScrollInfo),Self);
      }
      Result = Self.FScrollInfo;
      return Result
   }
   /// function TW3CustomControl.GetTagStyle() : TW3TagStyle
   ///  [line: 4136, column: 27, file: SmartCL.Components]
   ,GetTagStyle:function(Self) {
      var Result = null;
      if (Self.FTagStyle===null) {
         Self.FTagStyle = TW3OwnedObject.Create$11$($New(TW3TagStyle),Self);
      }
      Result = Self.FTagStyle;
      return Result
   }
   /// function TW3CustomControl.GetTransparentEvents() : Boolean
   ///  [line: 4289, column: 27, file: SmartCL.Components]
   ,GetTransparentEvents:function(Self) {
      var Result = false;
      Result = Self.FTransparentEvents;
      if (Result) {
         if (Self.FMouseTouchEventsCount>0) {
            Result = false;
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetZoom() : Float
   ///  [line: 4482, column: 27, file: SmartCL.Components]
   ,GetZoom:function(Self) {
      return w3_GetStyleAsFloat(Self.FHandle$3,"zoom");
   }
   /// procedure TW3CustomControl.HookEvents()
   ///  [line: 4228, column: 28, file: SmartCL.Components]
   ,HookEvents:function(Self) {
      TW3TagObj.HookEvents(Self);
      Self.FHandle$3.onfocus = $Event0(Self,TW3CustomControl.CBFocused);
      Self.FHandle$3.onblur = $Event0(Self,TW3CustomControl.CBLostFocus);
   }
   /// procedure TW3CustomControl.InitializeObject()
   ///  [line: 4221, column: 28, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3MovableControl.InitializeObject(Self);
      if (Self.FHandle$3.nodeName=="DIV"||Self.FHandle$3.nodeName=="IMG") {
         Self.FTransparentEvents = true;
      }
   }
   /// procedure TW3CustomControl.LayoutChildren()
   ///  [line: 5062, column: 28, file: SmartCL.Components]
   ,LayoutChildren:function(Self) {
      if (TW3TagObj.Showing$(Self)) {
         TW3TagObj.BeginUpdate(Self);
         try {
            TW3TagContainer.ForEach$1(Self,function (Child$3) {
               var Result = 160;
               if ($Is(Child$3,TW3CustomControl)) {
                  TW3CustomControl.LayoutChildren($As(Child$3,TW3CustomControl));
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
   /// function TW3CustomControl.MouseCaptured() : Boolean
   ///  [line: 5121, column: 27, file: SmartCL.Components]
   ,MouseCaptured:function(Self) {
      return EventManager.FMouseCaptureControl===Self;
   }
   /// procedure TW3CustomControl.MouseDown(Button: TMouseButton; ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 4710, column: 28, file: SmartCL.Components]
   ,MouseDown:function(Self, Button$1, ShiftState, X$2, Y$2) {
      if (Self.FOnMouseDown) {
         Self.FOnMouseDown(Self,Button$1,ShiftState,X$2,Y$2);
      }
   }
   /// procedure TW3CustomControl.MouseEnter(ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 4802, column: 28, file: SmartCL.Components]
   ,MouseEnter:function(Self, ShiftState$1, X$3, Y$3) {
      if (Self.FOnMouseEnter) {
         Self.FOnMouseEnter(Self,ShiftState$1,X$3,Y$3);
      }
   }
   /// procedure TW3CustomControl.MouseExit(ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 4828, column: 28, file: SmartCL.Components]
   ,MouseExit:function(Self, ShiftState$2, X$4, Y$4) {
      if (Self.FOnMouseExit) {
         Self.FOnMouseExit(Self,ShiftState$2,X$4,Y$4);
      }
   }
   /// procedure TW3CustomControl.MouseMove(ShiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 4776, column: 28, file: SmartCL.Components]
   ,MouseMove:function(Self, ShiftState$3, X$5, Y$5) {
      if (Self.FOnMouseMove) {
         Self.FOnMouseMove(Self,ShiftState$3,X$5,Y$5);
      }
   }
   /// procedure TW3CustomControl.MouseUp(Button: TMouseButton; shiftState: TShiftState; X: Integer; Y: Integer)
   ///  [line: 4743, column: 28, file: SmartCL.Components]
   ,MouseUp:function(Self, Button$2, shiftState$6, X$6, Y$6) {
      if (Self.FOnMouseUp) {
         Self.FOnMouseUp(Self,Button$2,shiftState$6,X$6,Y$6);
      }
   }
   /// procedure TW3CustomControl.MouseWheel(Shift: TShiftState; wheelDelta: Integer; const MousePos: TPoint; var Handled: Boolean)
   ///  [line: 4868, column: 28, file: SmartCL.Components]
   ,MouseWheel:function(Self, Shift, wheelDelta$2, MousePos$1, Handled$2) {
      if (Self.FOnMouseWheel) {
         Self.FOnMouseWheel(Self,Shift,wheelDelta$2,MousePos$1,Handled$2);
      }
   }
   /// procedure TW3CustomControl.ReleaseCapture()
   ///  [line: 5131, column: 28, file: SmartCL.Components]
   ,ReleaseCapture:function(Self) {
      TW3EventManager.ReleaseCapture$1(EventManager,Self);
   }
   /// procedure TW3CustomControl.SetAngle(const NewAngle: Float)
   ///  [line: 4600, column: 28, file: SmartCL.Components]
   ,SetAngle:function(Self, NewAngle) {
      if (NewAngle!=Self.FAngle) {
         Self.FAngle = NewAngle;
         Self.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Transform")] = "rotate("+FloatToStr$_Float_Integer_(NewAngle,2)+"deg)";
      }
   }
   /// procedure TW3CustomControl.SetBorderRadius(aNewRadius: Integer)
   ///  [line: 5107, column: 28, file: SmartCL.Components]
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
   /// procedure TW3CustomControl.SetEnabled(const EnabledValue: Boolean)
   ///  [line: 4496, column: 28, file: SmartCL.Components]
   ,SetEnabled$1:function(Self, EnabledValue) {
      Self.FHandle$3.disabled = (!EnabledValue);
      if (EnabledValue) {
         TW3TagStyle.RemoveByName(TW3CustomControl.GetTagStyle(Self),"DisabledState");
      } else {
         TW3TagStyle.Add$2(TW3CustomControl.GetTagStyle(Self),"DisabledState");
      }
   }
   /// procedure TW3CustomControl.SetFocus()
   ///  [line: 4625, column: 28, file: SmartCL.Components]
   ,SetFocus:function(Self) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (Self.FHandle$3) {
            try {
               if (window.event) {
          if (window.event.type == "mousedown")
            event.preventDefault();
        }
            } catch ($e) {
               var e$16 = $W($e);
               /* null */
            }
            try {
               Self.FHandle$3.focus();
            } catch ($e) {
               var e$17 = $W($e);
               throw EW3Exception.Create$17($New(EW3CustomControl),"TW3CustomControl.SetFocus",Self,e$17.FMessage);
            }
            TW3ControlTracker.SetFocusedControl(TW3ControlTracker,Self);
         }
      }
   }
   /// procedure TW3CustomControl.SetZoom(const ZoomValue: Float)
   ///  [line: 4486, column: 28, file: SmartCL.Components]
   ,SetZoom:function(Self, ZoomValue) {
      Self.FHandle$3.style.zoom = ZoomValue;
   }
   /// procedure TW3CustomControl.UnHookEvents()
   ///  [line: 4239, column: 28, file: SmartCL.Components]
   ,UnHookEvents:function(Self) {
      Self.FHandle$3.onfocus = null;
      Self.FHandle$3.onblur = null;
      if (!$SetIn(TW3TagObj.CreationFlags$(Self),6,0,8)) {
         Self.FHandle$3.onselectstart = null;
      }
   }
   /// procedure TW3CustomControl._SetAllMovement(const aValue: TMovementEvent)
   ///  [line: 4281, column: 28, file: SmartCL.Components]
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
   ///  [line: 4963, column: 28, file: SmartCL.Components]
   ,_setAnimationBegins:function(Self, aValue$15) {
      if (aValue$15) {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationStart")] = $Event1(Self,TW3CustomControl.CBAnimationBegins);
      } else {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationStart")] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnAnimationBegins = aValue$15;
   }
   /// procedure TW3CustomControl._setAnimationEnds(const aValue: TAnimationEndsEvent)
   ///  [line: 5002, column: 28, file: SmartCL.Components]
   ,_setAnimationEnds:function(Self, aValue$16) {
      if (aValue$16) {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationEnd")] = $Event1(Self,TW3CustomControl.CBAnimationEnds);
      } else {
         Self.FHandle$3[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationEnd")] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnAnimationEnds = aValue$16;
   }
   /// procedure TW3CustomControl._SetBeginMovement(const aValue: TNotifyEvent)
   ///  [line: 4249, column: 28, file: SmartCL.Components]
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
   ///  [line: 5017, column: 28, file: SmartCL.Components]
   ,_setChanged:function(Self, aValue$18) {
      if (aValue$18) {
         Self.FHandle$3["onchange"] = $Event1(Self,TW3CustomControl.CBChanged);
      } else {
         Self.FHandle$3["onchange"] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnChanged = aValue$18;
   }
   /// procedure TW3CustomControl._setContextPopup(const aValue: TContextPopupEvent)
   ///  [line: 5032, column: 28, file: SmartCL.Components]
   ,_setContextPopup:function(Self, aValue$19) {
      if (aValue$19) {
         Self.FHandle$3["oncontextmenu"] = $Event1(Self,TW3CustomControl.CBContextPopup);
      } else {
         Self.FHandle$3["oncontextmenu"] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnContextPopup = aValue$19;
   }
   /// procedure TW3CustomControl._SetEndMovement(const aValue: TNotifyEvent)
   ///  [line: 4257, column: 28, file: SmartCL.Components]
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
   ///  [line: 4413, column: 28, file: SmartCL.Components]
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
   ///  [line: 4439, column: 28, file: SmartCL.Components]
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
   ///  [line: 4387, column: 28, file: SmartCL.Components]
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
   ///  [line: 4668, column: 28, file: SmartCL.Components]
   ,_setGotFocus:function(Self, aValue$24) {
      Self.FOnGotFocus = aValue$24;
   }
   /// procedure TW3CustomControl._SetHorizontalMovement(const aValue: TMovementEvent)
   ///  [line: 4265, column: 28, file: SmartCL.Components]
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
   /// procedure TW3CustomControl._setKeyDown(const aValue: TKeyDownEvent)
   ///  [line: 4909, column: 28, file: SmartCL.Components]
   ,_setKeyDown:function(Self, aValue$26) {
      if (aValue$26) {
         Self.FHandle$3["onkeydown"] = $Event1(Self,TW3CustomControl.CBKeyDown);
      } else {
         Self.FHandle$3["onkeydown"] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnKeyDown = aValue$26;
   }
   /// procedure TW3CustomControl._setKeyPress(const aValue: TKeyPressEvent)
   ///  [line: 4939, column: 28, file: SmartCL.Components]
   ,_setKeyPress:function(Self, aValue$27) {
      if (aValue$27) {
         Self.FHandle$3["onkeypress"] = $Event1(Self,TW3CustomControl.CBKeyPress);
      } else {
         Self.FHandle$3["onkeypress"] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnKeyPress = aValue$27;
   }
   /// procedure TW3CustomControl._setKeyUp(const aValue: TKeyUpEvent)
   ///  [line: 4924, column: 28, file: SmartCL.Components]
   ,_setKeyUp:function(Self, aValue$28) {
      if (aValue$28) {
         Self.FHandle$3["onkeyup"] = $Event1(Self,TW3CustomControl.CBKeyUp);
      } else {
         Self.FHandle$3["onkeyup"] = $Event0(Self,TW3TagContainer.CBNoBehavior);
      }
      Self.FOnKeyUp = aValue$28;
   }
   /// procedure TW3CustomControl._setLostFocus(const aValue: TLostFocusEvent)
   ///  [line: 4677, column: 28, file: SmartCL.Components]
   ,_setLostFocus:function(Self, aValue$29) {
      Self.FOnLostFocus = aValue$29;
   }
   /// procedure TW3CustomControl._setMouseClick(const aValue: TMouseClickEvent)
   ///  [line: 4875, column: 28, file: SmartCL.Components]
   ,_setMouseClick:function(Self, aValue$30) {
      if (aValue$30) {
         if (!Self.FOnClick) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnClick) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnClick = aValue$30;
   }
   /// procedure TW3CustomControl._setMouseDblClick(const aValue: TMouseDblClickEvent)
   ///  [line: 4889, column: 28, file: SmartCL.Components]
   ,_setMouseDblClick:function(Self, aValue$31) {
      if (aValue$31) {
         if (!Self.FOnDblClick) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnDblClick) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnDblClick = aValue$31;
   }
   /// procedure TW3CustomControl._setMouseDown(const aValue: TMouseDownEvent)
   ///  [line: 4683, column: 28, file: SmartCL.Components]
   ,_setMouseDown:function(Self, aValue$32) {
      if (aValue$32) {
         if (!Self.FOnMouseDown) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseDown) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseDown = aValue$32;
   }
   /// procedure TW3CustomControl._setMouseEnter(const aValue: TMouseEnterEvent)
   ///  [line: 4782, column: 28, file: SmartCL.Components]
   ,_setMouseEnter:function(Self, aValue$33) {
      if (aValue$33) {
         if (!Self.FOnMouseEnter) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseEnter) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseEnter = aValue$33;
   }
   /// procedure TW3CustomControl._setMouseExit(const aValue: TMouseExitEvent)
   ///  [line: 4808, column: 28, file: SmartCL.Components]
   ,_setMouseExit:function(Self, aValue$34) {
      if (aValue$34) {
         if (!Self.FOnMouseExit) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseExit) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseExit = aValue$34;
   }
   /// procedure TW3CustomControl._setMouseMove(const aValue: TMouseMoveEvent)
   ///  [line: 4767, column: 28, file: SmartCL.Components]
   ,_setMouseMove:function(Self, aValue$35) {
      if (aValue$35) {
         if (!Self.FOnMouseMove) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseMove) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseMove = aValue$35;
   }
   /// procedure TW3CustomControl._setMouseUp(const aValue: TMouseUpEvent)
   ///  [line: 4734, column: 28, file: SmartCL.Components]
   ,_setMouseUp:function(Self, aValue$36) {
      if (aValue$36) {
         if (!Self.FOnMouseUp) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnMouseUp) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnMouseUp = aValue$36;
   }
   /// procedure TW3CustomControl._setMouseWheel(const aValue: TMouseWheelEvent)
   ///  [line: 4834, column: 28, file: SmartCL.Components]
   ,_setMouseWheel:function(Self, aValue$37) {
      Self.FOnMouseWheel = aValue$37;
   }
   /// procedure TW3CustomControl._setSelectionEnds(const Handler: TSelectionEndsEvent)
   ///  [line: 4996, column: 28, file: SmartCL.Components]
   ,_setSelectionEnds:function(Self, Handler) {
      Self.FHandle$3["onselect"] = $Event1(Self,TW3CustomControl.CBSelectionStarts);
      Self.FOnSelectionStarts = Handler;
   }
   /// procedure TW3CustomControl._setSelectionStarts(const Handler: TSelectionStartsEvent)
   ///  [line: 4990, column: 28, file: SmartCL.Components]
   ,_setSelectionStarts:function(Self, Handler$1) {
      Self.FHandle$3["onselectstart"] = $Event1(Self,TW3CustomControl.CBSelectionStarts);
      Self.FOnSelectionStarts = Handler$1;
   }
   /// procedure TW3CustomControl._setTouchBegins(const aValue: TTouchBeginEvent)
   ///  [line: 4323, column: 28, file: SmartCL.Components]
   ,_setTouchBegins:function(Self, aValue$38) {
      if (aValue$38) {
         if (!Self.FOnTouchBegins) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnTouchBegins) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnTouchBegins = aValue$38;
   }
   /// procedure TW3CustomControl._setTouchEnds(const aValue: TTouchEndEvent)
   ///  [line: 4368, column: 28, file: SmartCL.Components]
   ,_setTouchEnds:function(Self, aValue$39) {
      if (aValue$39) {
         if (!Self.FOnTouchEnds) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnTouchEnds) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnTouchEnds = aValue$39;
   }
   /// procedure TW3CustomControl._setTouchMoves(const aValue: TTouchMoveEvent)
   ///  [line: 4348, column: 28, file: SmartCL.Components]
   ,_setTouchMoves:function(Self, aValue$40) {
      if (aValue$40) {
         if (!Self.FOnTouchMoves) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnTouchMoves) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnTouchMoves = aValue$40;
   }
   /// procedure TW3CustomControl._SetVerticalMovement(const aValue: TMovementEvent)
   ///  [line: 4273, column: 28, file: SmartCL.Components]
   ,_SetVerticalMovement:function(Self, aValue$41) {
      if (aValue$41) {
         if (!Self.FOnVerticalMovement) {
            ++Self.FMouseTouchEventsCount;
         }
      } else if (Self.FOnVerticalMovement) {
         --Self.FMouseTouchEventsCount;
      }
      Self.FOnVerticalMovement = aValue$41;
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3CustomControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3DisplayView = class (TW3CustomControl)
///  [line: 75, column: 3, file: SmartCL.Application]
var TW3DisplayView = {
   $ClassName:"TW3DisplayView",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FArrange = false;
      $.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ArrangeChildren(aKind: TW3DisplayViewArangeType)
   ///  [line: 616, column: 26, file: SmartCL.Application]
   ,ArrangeChildren:function(Self, aKind) {
      var x$49 = 0;
      var dx$9 = 0;
      var dy$9 = 0;
      var mObj$5 = null;
      var mCount$1 = 0;
      var mRect = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
      var wd$1 = 0;
      var hd = 0;
      mCount$1 = TW3TagContainer.GetChildCount(Self);
      if (mCount$1>0) {
         mRect = TW3MovableControl.GetBoundsRect(Self);
         switch (aKind) {
            case 0 :
               wd$1 = TRect$Width$6(mRect);
               hd = TRect$Height$5(mRect);
               var $temp24;
               for(x$49=0,$temp24=mCount$1;x$49<$temp24;x$49++) {
                  mObj$5 = TW3TagContainer.GetChildObject(Self,x$49);
                  if ($Is(mObj$5,TW3CustomControl)&&(!$Is(mObj$5,TW3BlockBox))) {
                     TW3MovableControl.SetSize$2($As(mObj$5,TW3CustomControl),wd$1,hd);
                  }
               }
               break;
            case 1 :
               dy$9 = mRect.Top$3;
               wd$1 = TRect$Width$6(mRect);
               var $temp25;
               for(x$49=0,$temp25=mCount$1;x$49<$temp25;x$49++) {
                  mObj$5 = TW3TagContainer.GetChildObject(Self,x$49);
                  if ($Is(mObj$5,TW3CustomControl)&&(!$Is(mObj$5,TW3BlockBox))) {
                     hd = TW3MovableControl.GetHeight($As(mObj$5,TW3CustomControl));
                     TW3MovableControl.SetBounds($As(mObj$5,TW3CustomControl),mRect.Left$3,dy$9,wd$1,hd);
                     (dy$9+= hd);
                  }
               }
               break;
            case 2 :
               dx$9 = mRect.Left$3;
               hd = TRect$Height$5(mRect);
               var $temp26;
               for(x$49=0,$temp26=mCount$1;x$49<$temp26;x$49++) {
                  mObj$5 = TW3TagContainer.GetChildObject(Self,x$49);
                  if ($Is(mObj$5,TW3CustomControl)&&(!$Is(mObj$5,TW3BlockBox))) {
                     wd$1 = TW3MovableControl.GetWidth($As(mObj$5,TW3CustomControl));
                     TW3MovableControl.SetBounds($As(mObj$5,TW3CustomControl),dx$9,mRect.Top$3,wd$1,hd);
                     (dx$9+= wd$1);
                  }
               }
               break;
         }
      }
   }
   /// procedure TW3DisplayView.InitializeObject()
   ///  [line: 560, column: 26, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FArrange = true;
      Self.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ReSize()
   ///  [line: 702, column: 26, file: SmartCL.Application]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (TW3MovableControl.GetWidth(Self)>0&&TW3MovableControl.GetHeight(Self)>0) {
         if (Self.FArrange) {
            TW3DisplayView.ArrangeChildren(Self,Self.FArrangeKind);
         } else if (Self.FOnResize) {
            Self.FOnResize(Self);
         }
      }
   }
   /// procedure TW3DisplayView.StyleTagObject()
   ///  [line: 567, column: 26, file: SmartCL.Application]
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3DisplayView.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Display = class (TW3CustomControl)
///  [line: 92, column: 3, file: SmartCL.Application]
var TW3Display = {
   $ClassName:"TW3Display",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FFooter = $.FHeader = $.FOnOrient = $.FView = null;
   }
   /// procedure TW3Display.FinalizeObject()
   ///  [line: 738, column: 22, file: SmartCL.Application]
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
   ///  [line: 775, column: 21, file: SmartCL.Application]
   ,GetHeightOfChildren:function(Self) {
      var Result = 0;
      var x$50 = 0;
      var mObj$6 = null;
      var $temp27;
      for(x$50=0,$temp27=TW3TagContainer.GetChildCount(Self);x$50<$temp27;x$50++) {
         mObj$6 = TW3TagContainer.GetChildObject(Self,x$50);
         if (mObj$6!==Self.FView&&$Is(mObj$6,TW3CustomControl)&&(!$Is(mObj$6,TW3BlockBox))) {
            (Result+= TW3MovableControl.GetHeight($As(mObj$6,TW3CustomControl)));
         }
      }
      return Result
   }
   /// procedure TW3Display.InitializeObject()
   ///  [line: 717, column: 22, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FView = TW3TagContainer.Create$85$($New(TW3DisplayView),Self);
      TW3MovableControl.SetTop(Self.FView,5);
      EventManager = TObject.Create($New(TW3EventManager));
      w3_SetStyle(Self.FHandle$3,"min-width","100%");
      w3_SetStyle(Self.FHandle$3,"min-height","100%");
   }
   /// procedure TW3Display.Invalidate()
   ///  [line: 727, column: 22, file: SmartCL.Application]
   ,Invalidate:function(Self) {
      TW3MovableControl.Resize$(Self);
   }
   /// procedure TW3Display.ObjectReady()
   ///  [line: 732, column: 22, file: SmartCL.Application]
   ,ObjectReady:function(Self) {
      TW3MovableControl.ObjectReady(Self);
      TW3EventManager.BindInteractionEvents(EventManager,Self.FHandle$3);
   }
   /// procedure TW3Display.PositionFormInView(aForm: TW3CustomForm)
   ///  [line: 816, column: 22, file: SmartCL.Application]
   ,PositionFormInView:function(Self, aForm$3) {
      var mApp = null;
      var dx$10 = 0;
      var dy$10 = 0;
      if (aForm$3) {
         mApp = Application();
         if ((mApp!==null)&&(!mApp.FTerminated)) {
            dx$10 = TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self.FView));
            dy$10 = TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self.FView));
            TW3MovableControl.SetBounds(aForm$3,dx$10,dy$10,TW3MovableControl.GetWidth(Self.FView),TW3MovableControl.GetHeight(Self.FView));
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Screen),$R[0],["TW3Display.PositionFormInView", TObject.ClassName(Self.ClassType), "Form parameter was NIL error"]);
      }
   }
   /// procedure TW3Display.ReSize()
   ///  [line: 788, column: 22, file: SmartCL.Application]
   ,Resize:function(Self) {
      var mTotal$3 = 0;
      var mList = [],
         x$51 = 0;
      var dy$11 = 0;
      var h = 0;
      var mObj$7 = null;
      TW3MovableControl.Resize(Self);
      mTotal$3 = TW3Display.GetHeightOfChildren(Self);
      mList = TW3CustomControl.GetChildrenSortedByYPos(Self);
      dy$11 = 0;
      var $temp28;
      for(x$51=0,$temp28=mList.length;x$51<$temp28;x$51++) {
         mObj$7 = $As(mList[x$51],TW3CustomControl);
         if ($Is(mObj$7,TW3BlockBox)) {
            TW3MovableControl.SetBounds(mObj$7,0,0,TW3MovableControl.GetWidth(Self),TW3MovableControl.GetHeight(Self));
         } else {
            if (mObj$7===Self.FView) {
               h = TW3MovableControl.GetHeight(Self)-mTotal$3;
            } else {
               h = TW3MovableControl.GetHeight(mObj$7);
            }
            TW3MovableControl.SetBounds(mObj$7,0,dy$11,TW3MovableControl.GetWidth(Self),h);
            (dy$11+= h);
         }
      }
   }
   /// procedure TW3Display.StyleTagObject()
   ///  [line: 757, column: 22, file: SmartCL.Application]
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3Display.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BlockBox = class (TW3CustomControl)
///  [line: 70, column: 3, file: SmartCL.Application]
var TW3BlockBox = {
   $ClassName:"TW3BlockBox",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   /// procedure TW3BlockBox.InitializeObject()
   ///  [line: 1669, column: 23, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FTransparentEvents = false;
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3BlockBox.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TModalResult enumeration
///  [line: 120, column: 3, file: SmartCL.Application]
var TModalResult = [ "mrCancel", "mrOK" ];
/// TFormEntryEffect enumeration
///  [line: 36, column: 3, file: SmartCL.Application]
var TFormEntryEffect = [ "feNone", "feFromRight", "feToLeft" ];
/// TDisplayOrientation enumeration
///  [line: 38, column: 3, file: SmartCL.Application]
var TDisplayOrientation = [ "soPortrait", "soLandscapeLeft", "soLandscapeRight", "soFlipped", "soPortraitPrimary", "soPortraitSecondary", "soLandscapePrimary", "soLandscapeSecondary", "soLandscape", "soDefault" ];
/// TApplicationFormsList = class (TObject)
///  [line: 274, column: 3, file: SmartCL.Application]
var TApplicationFormsList = {
   $ClassName:"TApplicationFormsList",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FFormOwner = null;
      $.FList = [];
      $.FNextAutoCreate = 0;
   }
   /// procedure TApplicationFormsList.AutoCreateForm(aFormInfo: TApplicationFormInfo)
   ///  [line: 1539, column: 33, file: SmartCL.Application]
   ,AutoCreateForm:function(Self, aFormInfo) {
      if (!aFormInfo.Instance) {
         aFormInfo.Instance = TW3TagContainer.Create$85$($NewDyn(aFormInfo.FormClass,""),Self.FFormOwner);
         TW3CustomApplication.RegisterFormInstance(Application(),aFormInfo.Instance,aFormInfo.IsMainForm);
      }
      aFormInfo.InitialAutoCreateDone = true;
   }
   /// procedure TApplicationFormsList.AutoCreateForms(owner: TW3TagContainer)
   ///  [line: 1549, column: 33, file: SmartCL.Application]
   ,AutoCreateForms:function(Self, owner) {
      var a$182 = 0;
      var info = null;
      var a$183 = [];
      Self.FFormOwner = owner;
      Self.FNextAutoCreate = 0;
      a$183 = Self.FList;
      var $temp29;
      for(a$182=0,$temp29=a$183.length;a$182<$temp29;a$182++) {
         info = a$183[a$182];
         TApplicationFormsList.AutoCreateForm(Self,info);
         ++Self.FNextAutoCreate;
         if (info.IsMainForm) {
            break;
         }
      }
      TW3Dispatch.SetTimeOut(TW3Dispatch,$Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
   }
   /// procedure TApplicationFormsList.AutoCreateNextForm()
   ///  [line: 1565, column: 33, file: SmartCL.Application]
   ,AutoCreateNextForm:function(Self) {
      var iForm = 0;
      var info$1 = null;
      var $temp30;
      for(iForm=Self.FNextAutoCreate,$temp30=Self.FList.length;iForm<$temp30;iForm++) {
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
   ///  [line: 1599, column: 32, file: SmartCL.Application]
   ,IndexOfFormClass:function(Self, aFormClass) {
      var Result = 0;
      var $temp31;
      for(Result=0,$temp31=Self.FList.length;Result<$temp31;Result++) {
         if (Self.FList[Result].FormClass==aFormClass) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// function TApplicationFormsList.IndexOfUnitName(aUnitName: String) : Integer
   ///  [line: 1607, column: 32, file: SmartCL.Application]
   ,IndexOfUnitName:function(Self, aUnitName) {
      var Result = 0;
      var $temp32;
      for(Result=0,$temp32=Self.FList.length;Result<$temp32;Result++) {
         if (SameText(Self.FList[Result].UnitName,aUnitName)) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// procedure TApplicationFormsList.RegisterAutoCreate(aUnitName: String; isAutoCreate: Boolean; isMainForm: Boolean)
   ///  [line: 1615, column: 33, file: SmartCL.Application]
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
   ///  [line: 1631, column: 33, file: SmartCL.Application]
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
   ///  [line: 1646, column: 33, file: SmartCL.Application]
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
   ///  [line: 1662, column: 33, file: SmartCL.Application]
   ,UnregisterFormInstance:function(Self, aFormInstance$1) {
      var i$1 = 0;
      var $temp33;
      for(i$1=0,$temp33=Self.FList.length;i$1<$temp33;i$1++) {
         if (Self.FList[i$1].Instance===aFormInstance$1) {
            Self.FList[i$1].Instance = null;
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TApplicationFormInfo = class (TObject)
///  [line: 264, column: 3, file: SmartCL.Application]
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
///  [line: 32, column: 3, file: SmartCL.Application]
var EW3Screen = {
   $ClassName:"EW3Screen",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3Application = class (EW3Exception)
///  [line: 33, column: 3, file: SmartCL.Application]
var EW3Application$1 = {
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
///  [line: 308, column: 3, file: SmartCL.Application]
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
function TRectF$Height$4(Self$21) {
   return Self$21.Bottom-Self$21.Top$2;
}
/// function TRectF.Width(var Self: TRectF) : Float
///  [line: 845, column: 17, file: System.Types.Graphics]
function TRectF$Width$5(Self$22) {
   return Self$22.Right-Self$22.Left$2;
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
/// function TRect.ContainsPos(var Self: TRect; const aLeft: Integer; const aTop: Integer) : Boolean
///  [line: 631, column: 16, file: System.Types.Graphics]
function TRect$ContainsPos$1(Self$23, aLeft, aTop) {
   return aLeft>=Self$23.Left$3&&aLeft<=Self$23.Right$1&&aTop>=Self$23.Top$3&&aTop<=Self$23.Bottom$1;
}
/// function TRect.Create(const aLeft: Integer; const aTop: Integer; const aRight: Integer; const aBottom: Integer) : TRect
///  [line: 407, column: 22, file: System.Types.Graphics]
function Create$105(aLeft$1, aTop$1, aRight, aBottom) {
   var Result = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0};
   Result.Left$3 = aLeft$1;
   Result.Top$3 = aTop$1;
   Result.Right$1 = aRight;
   Result.Bottom$1 = aBottom;
   return Result
}
/// function TRect.Height(var Self: TRect) : Integer
///  [line: 462, column: 16, file: System.Types.Graphics]
function TRect$Height$5(Self$24) {
   return Self$24.Bottom$1-Self$24.Top$3;
}
/// function TRect.Width(var Self: TRect) : Integer
///  [line: 457, column: 16, file: System.Types.Graphics]
function TRect$Width$6(Self$25) {
   return Self$25.Right$1-Self$25.Left$3;
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
function Create$108(aCol, aRow) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = aCol;
   Result.Y$1 = aRow;
   return Result
}
/// TExposure enumeration
///  [line: 23, column: 3, file: System.Types.Graphics]
var TExposure = [ "esVisible", "esPartly", "esNone" ];
function OffsetPoint(a$184, b$4) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$184.X$1+b$4.X$1;
   Result.Y$1 = a$184.Y$1+b$4.Y$1;
   return Result
};
function OffsetPoint$1(a$185, b$5) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$185.X$1+b$5;
   Result.Y$1 = a$185.Y$1+b$5;
   return Result
};
function OffsetPoint$2(a$186, b$6) {
   var Result = {X:0,Y:0};
   Result.X = a$186.X+b$6.X;
   Result.Y = a$186.Y+b$6.Y;
   return Result
};
function OffsetPoint$3(a$187, b$7) {
   var Result = {X:0,Y:0};
   Result.X = a$187.X+b$7;
   Result.Y = a$187.Y+b$7;
   return Result
};
function OffsetPoint$4(a$188, b$8) {
   var Result = {X:0,Y:0};
   Result.X = a$188.X+b$8;
   Result.Y = a$188.Y+b$8;
   return Result
};
function MinusPoint(a$189, b$9) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$189.X$1-b$9.X$1;
   Result.Y$1 = a$189.Y$1-b$9.Y$1;
   return Result
};
function MinusPoint$1(a$190, b$10) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$190.X$1-b$10;
   Result.Y$1 = a$190.Y$1-b$10;
   return Result
};
function MinusPoint$2(a$191, b$11) {
   var Result = {X:0,Y:0};
   Result.X = a$191.X-b$11.X;
   Result.Y = a$191.Y-b$11.Y;
   return Result
};
function MinusPoint$3(a$192, b$12) {
   var Result = {X:0,Y:0};
   Result.X = a$192.X-b$12;
   Result.Y = a$192.Y-b$12;
   return Result
};
function MinusPoint$4(a$193, b$13) {
   var Result = {X:0,Y:0};
   Result.X = a$193.X-b$13;
   Result.Y = a$193.Y-b$13;
   return Result
};
function ExpandPoint(a$194, b$14) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$194.X$1*b$14.X$1);
   Result.Y$1 = Math.round(a$194.Y$1*b$14.Y$1);
   return Result
};
function ExpandPoint$1(a$195, b$15) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$195.X$1*b$15);
   Result.Y$1 = Math.round(a$195.Y$1*b$15);
   return Result
};
function ExpandPoint$2(a$196, b$16) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$196.X$1*b$16);
   Result.Y$1 = Math.round(a$196.Y$1*b$16);
   return Result
};
function ExpandPoint$3(a$197, b$17) {
   var Result = {X:0,Y:0};
   Result.X = a$197.X*b$17.X;
   Result.Y = a$197.Y*b$17.Y;
   return Result
};
function ExpandPoint$4(a$198, b$18) {
   var Result = {X:0,Y:0};
   Result.X = a$198.X*b$18;
   Result.Y = a$198.Y*b$18;
   return Result
};
function ExpandPoint$5(a$199, b$19) {
   var Result = {X:0,Y:0};
   Result.X = a$199.X*b$19;
   Result.Y = a$199.Y*b$19;
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
            var e$18 = $W($e);
            return Result.v;
         }
      }
   } finally {return Result.v}
};
function RGBToColor(Red, Green, Blue) {
   return (Red*65536)+(Green*256)+Blue;
};
function ColorToWebStr(aColor, alpha) {
   var Result = "";
   var r$3 = 0,
      g$1 = 0,
      b$2 = 0;
   r$3 = (aColor>>>16)&255;
   g$1 = (aColor>>>8)&255;
   b$2 = aColor&255;
   if (alpha==255) {
      Result = "#"+__ByteToHexLUT[r$3]+__ByteToHexLUT[g$1]+__ByteToHexLUT[b$2];
   } else {
      Result = "rgba("+__StrByteLUT[r$3]+","+__StrByteLUT[g$1]+","+__StrByteLUT[b$2]+","+__StrByteLUT[$Div(alpha,255)]+")";
   }
   return Result
};
function ColorToWebStr$1(r$5, g$3, b$20, a$200) {
   var Result = "";
   if (a$200==255) {
      Result = "#"+__ByteToHexLUT[r$5]+__ByteToHexLUT[g$3]+__ByteToHexLUT[b$20];
   } else {
      Result = "rgba("+__StrByteLUT[r$5]+","+__StrByteLUT[g$3]+","+__StrByteLUT[b$20]+","+__StrByteLUT[a$200]+")";
   }
   return Result
};
function ColorToStr(aColor$1) {
   var Result = "";
   var rgb = 0;
   rgb = (((aColor$1>>>16)&255)|(aColor$1&65280))|((aColor$1&255)<<16);
   Result = "0x"+IntToHex(rgb,6);
   return Result
};
/// TBinaryData = class (TAllocation)
///  [line: 126, column: 3, file: System.Memory.Buffer]
var TBinaryData = {
   $ClassName:"TBinaryData",$Parent:TAllocation
   ,$Init:function ($) {
      TAllocation.$Init($);
      $.FDataView = null;
   }
   /// procedure TBinaryData.AppendBuffer(const Raw: TMemoryHandle)
   ///  [line: 957, column: 23, file: System.Memory.Buffer]
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
   ///  [line: 1026, column: 23, file: System.Memory.Buffer]
   ,AppendBytes:function(Self, Bytes$6) {
      var mLen$2 = 0;
      var mOffset$1 = 0;
      mLen$2 = Bytes$6.length;
      if (mLen$2>0) {
         mOffset$1 = TAllocation.GetSize$3(Self);
         TAllocation.Grow(Self,mLen$2);
         TAllocation.GetHandle(Self).set(Bytes$6,mOffset$1);
      }
   }
   /// procedure TBinaryData.AppendFloat32(const Value: float32)
   ///  [line: 938, column: 23, file: System.Memory.Buffer]
   ,AppendFloat32:function(Self, Value$18) {
      var mOffset$2 = 0;
      mOffset$2 = TAllocation.GetSize$3(Self);
      TAllocation.Grow(Self,TDatatype.SizeOfType(TDatatype,8));
      TBinaryData.WriteFloat32(Self,mOffset$2,Value$18);
   }
   /// procedure TBinaryData.AppendFloat64(const Value: float64)
   ///  [line: 947, column: 23, file: System.Memory.Buffer]
   ,AppendFloat64:function(Self, Value$19) {
      var mOffset$3 = 0;
      mOffset$3 = TAllocation.GetSize$3(Self);
      TAllocation.Grow(Self,TDatatype.SizeOfType(TDatatype,9));
      TBinaryData.WriteFloat64(Self,mOffset$3,Value$19);
   }
   /// procedure TBinaryData.AppendMemory(const Buffer: TBinaryData; const ReleaseBufferOnExit: Boolean)
   ///  [line: 974, column: 23, file: System.Memory.Buffer]
   ,AppendMemory:function(Self, Buffer$4, ReleaseBufferOnExit) {
      var mOffset$4 = 0;
      if (Buffer$4!==null) {
         try {
            if (TAllocation.GetSize$3(Buffer$4)>0) {
               mOffset$4 = TAllocation.GetSize$3(Self);
               TAllocation.Grow(Self,TAllocation.GetSize$3(Buffer$4));
               TBinaryData.Write$3(Self,mOffset$4,Buffer$4);
            }
         } finally {
            if (ReleaseBufferOnExit) {
               TObject.Free(Buffer$4);
            }
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Append failed, Invalid source buffer error");
      }
   }
   /// procedure TBinaryData.AppendStr(const Text: String)
   ///  [line: 997, column: 23, file: System.Memory.Buffer]
   ,AppendStr:function(Self, Text$7) {
      var mLen$3 = 0;
      var x$52 = 0;
      var mOffset$5 = 0;
      var LTemp = [];
      mLen$3 = Text$7.length;
      if (mLen$3>0) {
         mOffset$5 = TAllocation.GetSize$3(Self);
         LTemp = TString.EncodeUTF8(TString,Text$7);
         TAllocation.Grow(Self,LTemp.length);
         var $temp34;
         for(x$52=0,$temp34=LTemp.length;x$52<$temp34;x$52++) {
            Self.FDataView.setInt8(mOffset$5,LTemp[x$52]);
            ++mOffset$5;
            console.log( LTemp[x$52] );
         }
      }
   }
   /// function TBinaryData.Clone() : TBinaryData
   ///  [line: 904, column: 22, file: System.Memory.Buffer]
   ,Clone:function(Self) {
      return TBinaryData.Create$31($New(TBinaryData),TBinaryData.ToTypedArray(Self));
   }
   /// procedure TBinaryData.CopyFrom(const Buffer: TBinaryData; const Offset: Integer; const ByteLen: Integer)
   ///  [line: 909, column: 23, file: System.Memory.Buffer]
   ,CopyFrom$2:function(Self, Buffer$5, Offset$17, ByteLen) {
      if (Buffer$5!==null) {
         TBinaryData.CopyFromMemory(Self,TAllocation.GetHandle(Buffer$5),Offset$17,ByteLen);
      } else {
         throw Exception.Create($New(EBinaryData),"CopyFrom failed, source instance was NIL error");
      }
   }
   /// procedure TBinaryData.CopyFromMemory(const Raw: TMemoryHandle; Offset: Integer; ByteLen: Integer)
   ///  [line: 920, column: 23, file: System.Memory.Buffer]
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
   ///  [line: 239, column: 25, file: System.Memory.Buffer]
   ,Create$31:function(Self, aHandle) {
      var mSignature = "";
      TAllocation.Create$26(Self);
      if (TMemoryHandleHelper$Defined$1(aHandle)&&TMemoryHandleHelper$Valid$5(aHandle)) {
         if (aHandle.toString) {
            mSignature = String(aHandle.toString());
            if (SameText(mSignature,"[object Uint8Array]")||SameText(mSignature,"[object Uint8ClampedArray]")) {
               TAllocation.Allocate(Self,parseInt(aHandle.length,10));
               TMarshal.Move$1(TMarshal,aHandle,0,TAllocation.GetHandle(Self),0,parseInt(aHandle.length,10));
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
   ///  [line: 885, column: 22, file: System.Memory.Buffer]
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
   ///  [line: 858, column: 22, file: System.Memory.Buffer]
   ,CutStream:function(Self, Offset$20, ByteLen$3) {
      return TBinaryData.ToStream(TBinaryData.CutBinaryData(Self,Offset$20,ByteLen$3));
   }
   /// function TBinaryData.CutTypedArray(Offset: Integer; ByteLen: Integer) : TMemoryHandle
   ///  [line: 864, column: 22, file: System.Memory.Buffer]
   ,CutTypedArray:function(Self, Offset$21, ByteLen$4) {
      var Result = undefined;
      var mTemp$5 = null;
      Result = null;
      if (ByteLen$4>0) {
         if (TBinaryData.OffsetInRange(Self,Offset$21)) {
            if (TAllocation.GetSize$3(Self)-Offset$21>0) {
               mTemp$5 = Self.FDataView.buffer.slice(Offset$21,Offset$21+ByteLen$4);
               Result = new Uint8ClampedArray(mTemp$5);
            }
         }
      }
      return Result
   }
   /// procedure TBinaryData.FromBase64(FileData: String)
   ///  [line: 474, column: 23, file: System.Memory.Buffer]
   ,FromBase64:function(Self, FileData) {
      var mRaw$2 = "";
      var x$53 = 0;
      TAllocation.Release(Self);
      if (FileData.length>0) {
         mRaw$2 = atob(FileData);
         if (mRaw$2.length>0) {
            TAllocation.Allocate(Self,mRaw$2.length);
            var $temp35;
            for(x$53=0,$temp35=mRaw$2.length;x$53<$temp35;x$53++) {
               TBinaryData.SetByte(Self,x$53,TDatatype.CharToByte(TDatatype,mRaw$2.charAt(x$53-1)));
            }
         }
      }
   }
   /// function TBinaryData.GetBit(const bitIndex: Integer) : Boolean
   ///  [line: 322, column: 22, file: System.Memory.Buffer]
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
   ///  [line: 279, column: 22, file: System.Memory.Buffer]
   ,GetBitCount:function(Self) {
      return TAllocation.GetSize$3(Self)<<3;
   }
   /// function TBinaryData.GetByte(const Index: Integer) : Byte
   ///  [line: 546, column: 22, file: System.Memory.Buffer]
   ,GetByte:function(Self, Index$1) {
      var Result = 0;
      if (TAllocation.GetHandle(Self)) {
         if (TBinaryData.OffsetInRange(Self,Index$1)) {
            Result = Self.FDataView.getUint8(Index$1);
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"invalid byte index, expected %d..%d, not %d",[0, TAllocation.GetHandle(Self).length-1, Index$1]);
         }
      }
      return Result
   }
   /// procedure TBinaryData.HandleAllocated()
   ///  [line: 269, column: 23, file: System.Memory.Buffer]
   ,HandleAllocated:function(Self) {
      var mRef$2 = undefined;
      mRef$2 = TAllocation.GetBufferHandle(Self);
      (Self.FDataView) = new DataView(mRef$2);
   }
   /// procedure TBinaryData.HandleReleased()
   ///  [line: 284, column: 23, file: System.Memory.Buffer]
   ,HandleReleased:function(Self) {
      Self.FDataView = null;
   }
   /// function TBinaryData.OffsetInRange(Offset: Integer) : Boolean
   ///  [line: 663, column: 22, file: System.Memory.Buffer]
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
   ///  [line: 655, column: 22, file: System.Memory.Buffer]
   ,ReadBool:function(Self, Offset$23) {
      var Result = false;
      if (TBinaryData.OffsetInRange(Self,Offset$23)) {
         Result = Self.FDataView.getUint8(Offset$23)>0;
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[45],[Offset$23, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadBytes(Offset: Integer; ByteLen: Integer) : TByteArray
   ///  [line: 637, column: 22, file: System.Memory.Buffer]
   ,ReadBytes:function(Self, Offset$24, ByteLen$5) {
      var Result = [];
      var x$54 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$24)) {
         if (Offset$24+ByteLen$5<=TAllocation.GetSize$3(Self)) {
            var $temp36;
            for(x$54=0,$temp36=ByteLen$5;x$54<$temp36;x$54++) {
               Result.push(Self.FDataView.getUint8(Offset$24+x$54));
            }
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[45],[Offset$24, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadFloat32(Offset: Integer) : Float
   ///  [line: 584, column: 22, file: System.Memory.Buffer]
   ,ReadFloat32:function(Self, Offset$25) {
      var Result = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$25)) {
         if (Offset$25+TDatatype.SizeOfType(TDatatype,8)<=TAllocation.GetSize$3(Self)) {
            Result = Self.FDataView.getFloat32(Offset$25,a$13);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[45],[Offset$25, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadFloat64(Offset: Integer) : Float
   ///  [line: 570, column: 22, file: System.Memory.Buffer]
   ,ReadFloat64:function(Self, Offset$26) {
      var Result = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$26)) {
         if (Offset$26+TDatatype.SizeOfType(TDatatype,9)<=TAllocation.GetSize$3(Self)) {
            Result = Self.FDataView.getFloat64(Offset$26,a$13);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[45],[Offset$26, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadInt(Offset: Integer) : Integer
   ///  [line: 598, column: 22, file: System.Memory.Buffer]
   ,ReadInt:function(Self, Offset$27) {
      var Result = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$27)) {
         if (Offset$27+TDatatype.SizeOfType(TDatatype,7)<=TAllocation.GetSize$3(Self)) {
            Result = Self.FDataView.getUint32(Offset$27,a$13);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[45],[Offset$27, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// function TBinaryData.ReadStr(Offset: Integer; ByteLen: Integer) : String
   ///  [line: 612, column: 22, file: System.Memory.Buffer]
   ,ReadStr$1:function(Self, Offset$28, ByteLen$6) {
      var Result = "";
      var x$55 = 0;
      var LFetch = [];
      Result = "";
      if (TBinaryData.OffsetInRange(Self,Offset$28)) {
         if (Offset$28+ByteLen$6<=TAllocation.GetSize$3(Self)) {
            var $temp37;
            for(x$55=0,$temp37=ByteLen$6;x$55<$temp37;x$55++) {
               LFetch.push(TBinaryData.GetByte(Self,(Offset$28+x$55)));
            }
            Result = TString.DecodeUTF8(TString,LFetch);
         } else {
            throw Exception.Create($New(EBinaryData),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),$R[45],[Offset$28, 0, TAllocation.GetSize$3(Self)-1]);
      }
      return Result
   }
   /// procedure TBinaryData.SetBit(const bitIndex: Integer; const value: Boolean)
   ///  [line: 316, column: 23, file: System.Memory.Buffer]
   ,SetBit$1:function(Self, bitIndex$1, value$19) {
      TBinaryData.SetByte(Self,(bitIndex$1>>>3),TBitAccess.Set$3(TBitAccess,(bitIndex$1%8),TBinaryData.GetByte(Self,(bitIndex$1>>>3)),value$19));
   }
   /// procedure TBinaryData.SetByte(const Index: Integer; const Value: Byte)
   ///  [line: 558, column: 23, file: System.Memory.Buffer]
   ,SetByte:function(Self, Index$2, Value$20) {
      if (TAllocation.GetHandle(Self)) {
         if (TBinaryData.OffsetInRange(Self,Index$2)) {
            Self.FDataView.setUint8(Index$2,Value$20);
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"Invalid byte index, expected %d..%d, not %d",[0, TAllocation.GetHandle(Self).length-1, Index$2]);
         }
      }
   }
   /// function TBinaryData.ToBase64() : String
   ///  [line: 503, column: 22, file: System.Memory.Buffer]
   ,ToBase64:function(Self) {
      var Result = "";
      var mText = "";
      var mRef$3 = undefined;
      var CHUNK_SIZE = 32768;
      var index$1 = 0;
      var mLength = 0;
      var slice$4;
      if (TAllocation.GetHandle(Self)) {
         mRef$3 = TAllocation.GetHandle(Self);
         mLength = (mRef$3).length;
      while (index$1 < mLength)
      {
        slice$4 = (mRef$3).subarray(index$1, Math.min(index$1 + CHUNK_SIZE, mLength));
        mText += String.fromCharCode.apply(null, slice$4);
        index$1 += CHUNK_SIZE;
      }
      Result = btoa(mText);
      }
      return Result
   }
   /// function TBinaryData.ToBytes() : TByteArray
   ///  [line: 399, column: 22, file: System.Memory.Buffer]
   ,ToBytes:function(Self) {
      var Result = [];
      var x$56 = 0;
      if (TAllocation.GetSize$3(Self)>0) {
         var $temp38;
         for(x$56=0,$temp38=TAllocation.GetSize$3(Self);x$56<$temp38;x$56++) {
            Result.push(TBinaryData.GetByte(Self,x$56));
         }
      } else {
         Result = [];
      }
      return Result
   }
   /// function TBinaryData.ToHexDump(BytesPerRow: Integer; Options: TBufferHexDumpOptions) : String
   ///  [line: 331, column: 22, file: System.Memory.Buffer]
   ,ToHexDump:function(Self, BytesPerRow, Options$3) {
      var Result = "";
      var x$57 = 0;
      var y$32 = 0;
      var mCount$2 = 0;
      var mPad = 0;
      var mDump = [];
      if (TAllocation.GetHandle(Self)) {
         BytesPerRow = TInteger.EnsureRange(BytesPerRow,2,64);
         mCount$2 = 0;
         Result = "";
         var $temp39;
         for(x$57=0,$temp39=TAllocation.GetSize$3(Self);x$57<$temp39;x$57++) {
            mDump.push(TBinaryData.GetByte(Self,x$57));
            if ($SetIn(Options$3,0,0,2)) {
               Result+="$"+IntToHex2(TBinaryData.GetByte(Self,x$57));
            } else {
               Result+=IntToHex2(TBinaryData.GetByte(Self,x$57));
            }
            ++mCount$2;
            if (mCount$2>=BytesPerRow) {
               if (mDump.length>0) {
                  Result+=" ";
                  var $temp40;
                  for(y$32=0,$temp40=mDump.length;y$32<$temp40;y$32++) {
                     if (function(v$){return (((v$>="A")&&(v$<="Z"))||((v$>="a")&&(v$<="z"))||((v$>="0")&&(v$<="9"))||(v$==",")||(v$==";")||(v$=="<")||(v$==">")||(v$=="{")||(v$=="}")||(v$=="[")||(v$=="]")||(v$=="-")||(v$=="_")||(v$=="#")||(v$=="$")||(v$=="%")||(v$=="&")||(v$=="\/")||(v$=="(")||(v$==")")||(v$=="!")||(v$=="§")||(v$=="^")||(v$==":")||(v$==",")||(v$=="?"))}(TDatatype.ByteToChar(TDatatype,mDump[y$32]))) {
                        Result+=TDatatype.ByteToChar(TDatatype,mDump[y$32]);
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
         if ($SetIn(Options$3,1,0,2)&&mCount$2>0) {
            mPad = BytesPerRow-mCount$2;
            var $temp41;
            for(x$57=1,$temp41=mPad;x$57<=$temp41;x$57++) {
               Result+="--";
               if ($SetIn(Options$3,0,0,2)) {
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
   ///  [line: 439, column: 22, file: System.Memory.Buffer]
   ,ToStream:function(Self) {
      var Result = null;
      Result = TMemoryStream.Create$23($New(TMemoryStream));
      try {
         TStream.Write$1(Result,TBinaryData.ToBytes(Self));
         TStream.SetPosition$(Result,0);
      } catch ($e) {
         var e$19 = $W($e);
         TObject.Free(Result);
         Result = null;
         throw $e;
      }
      return Result
   }
   /// function TBinaryData.ToString() : String
   ///  [line: 528, column: 22, file: System.Memory.Buffer]
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
   ///  [line: 455, column: 22, file: System.Memory.Buffer]
   ,ToTypedArray:function(Self) {
      var Result = undefined;
      var mLen$4 = 0;
      var mTemp$6 = null;
      Result = null;
      mLen$4 = TAllocation.GetSize$3(Self);
      if (mLen$4>0) {
         mTemp$6 = Self.FDataView.buffer.slice(0,mLen$4);
         Result = new Uint8ClampedArray(mTemp$6);
      }
      return Result
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: String)
   ///  [line: 747, column: 23, file: System.Memory.Buffer]
   ,Write$5:function(Self, Offset$29, Data$16) {
      var mGrowth = 0;
      var x$58 = 0;
      var LTemp$1 = [];
      if (Data$16.length>0) {
         if (TBinaryData.OffsetInRange(Self,Offset$29)) {
            LTemp$1 = TString.EncodeUTF8(TString,Data$16);
            if (Offset$29+LTemp$1.length>TAllocation.GetSize$3(Self)-1) {
               mGrowth = Offset$29+LTemp$1.length-TAllocation.GetSize$3(Self);
            }
            if (mGrowth>0) {
               TAllocation.Grow(Self,mGrowth);
            }
            var $temp42;
            for(x$58=0,$temp42=LTemp$1.length;x$58<$temp42;x$58++) {
               Self.FDataView.setUint8(Offset$29+x$58,LTemp$1[x$58]);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EBinaryData),"Write string failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$29]);
         }
      }
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: TMemoryHandle)
   ///  [line: 722, column: 23, file: System.Memory.Buffer]
   ,Write$4:function(Self, Offset$30, Data$17) {
      var mGrowth$1 = 0;
      if (Data$17) {
         if (Data$17.length>0) {
            if (TBinaryData.OffsetInRange(Self,Offset$30)) {
               if (Offset$30+Data$17.length>TAllocation.GetSize$3(Self)-1) {
                  mGrowth$1 = Offset$30+Data$17.length-TAllocation.GetSize$3(Self);
               }
               if (mGrowth$1>0) {
                  TAllocation.Grow(Self,mGrowth$1);
               }
               TMarshal.Move$1(TMarshal,Data$17,0,TAllocation.GetHandle(Self),Offset$30,parseInt(TAllocation.GetHandle(Self).length,10));
            } else {
               throw EW3Exception.CreateFmt($New(EBinaryData),"Write typed-handle failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$30]);
            }
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Write failed, invalid source handle error");
      }
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: TBinaryData)
   ///  [line: 695, column: 23, file: System.Memory.Buffer]
   ,Write$3:function(Self, Offset$31, Data$18) {
      var mGrowth$2 = 0;
      if (Data$18!==null) {
         if (TAllocation.GetSize$3(Data$18)>0) {
            if (TBinaryData.OffsetInRange(Self,Offset$31)) {
               if (Offset$31+TAllocation.GetSize$3(Data$18)>TAllocation.GetSize$3(Self)-1) {
                  mGrowth$2 = Offset$31+TAllocation.GetSize$3(Data$18)-TAllocation.GetSize$3(Self);
               }
               if (mGrowth$2>0) {
                  TAllocation.Grow(Self,mGrowth$2);
               }
               TMarshal.Move$1(TMarshal,TAllocation.GetHandle(Data$18),0,TAllocation.GetHandle(Self),0,TAllocation.GetSize$3(Data$18));
            } else {
               throw EW3Exception.CreateFmt($New(EBinaryData),"Write string failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$31]);
            }
         }
      } else {
         throw Exception.Create($New(EBinaryData),"Write failed, invalid source buffer [nil] error");
      }
   }
   /// procedure TBinaryData.Write(const Offset: Integer; const Data: TByteArray)
   ///  [line: 675, column: 23, file: System.Memory.Buffer]
   ,Write$2:function(Self, Offset$32, Data$19) {
      var mGrowth$3 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$32)) {
         if (Data$19.length>0) {
            if (Offset$32+Data$19.length>TAllocation.GetSize$3(Self)-1) {
               mGrowth$3 = Offset$32+Data$19.length-TAllocation.GetSize$3(Self);
            }
            if (mGrowth$3>0) {
               TAllocation.Grow(Self,mGrowth$3);
            }
            TAllocation.GetHandle(Self).set(Data$19,Offset$32);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),"Write bytearray failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$32]);
      }
   }
   /// procedure TBinaryData.WriteFloat32(const Offset: Integer; const Data: float32)
   ///  [line: 805, column: 23, file: System.Memory.Buffer]
   ,WriteFloat32:function(Self, Offset$33, Data$20) {
      var mGrowth$4 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$33)) {
         if (Offset$33+TDatatype.SizeOfType(TDatatype,8)>TAllocation.GetSize$3(Self)-1) {
            mGrowth$4 = Offset$33+TDatatype.SizeOfType(TDatatype,8)-TAllocation.GetSize$3(Self);
         }
         if (mGrowth$4>0) {
            TAllocation.Grow(Self,mGrowth$4);
         }
         Self.FDataView.setFloat32(Offset$33,Data$20,a$13);
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),"Write float failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$33]);
      }
   }
   /// procedure TBinaryData.WriteFloat64(const Offset: Integer; const Data: float64)
   ///  [line: 823, column: 23, file: System.Memory.Buffer]
   ,WriteFloat64:function(Self, Offset$34, Data$21) {
      var mGrowth$5 = 0;
      if (TBinaryData.OffsetInRange(Self,Offset$34)) {
         if (Offset$34+TDatatype.SizeOfType(TDatatype,9)>TAllocation.GetSize$3(Self)-1) {
            mGrowth$5 = Offset$34+TDatatype.SizeOfType(TDatatype,9)-TAllocation.GetSize$3(Self);
         }
         if (mGrowth$5>0) {
            TAllocation.Grow(Self,mGrowth$5);
         }
         Self.FDataView.setFloat64(Offset$34,Number(Data$21),a$13);
      } else {
         throw EW3Exception.CreateFmt($New(EBinaryData),"Write float failed, invalid offset. Expected %d..%d not %d",[0, TAllocation.GetSize$3(Self)-1, Offset$34]);
      }
   }
   ,Destroy:TAllocation.Destroy
   ,HandleAllocated$:function($){return $.ClassType.HandleAllocated($)}
   ,HandleReleased$:function($){return $.ClassType.HandleReleased($)}
};
TBinaryData.$Intf={
   IBinaryDataWriteAccess:[TBinaryData.AppendBytes,TBinaryData.AppendStr,TBinaryData.AppendMemory,TBinaryData.AppendBuffer,TBinaryData.AppendFloat32,TBinaryData.AppendFloat64,TBinaryData.Write$2,TBinaryData.WriteFloat32,TBinaryData.WriteFloat64,TBinaryData.CopyFrom$2,TBinaryData.CopyFromMemory,TBinaryData.CutBinaryData,TBinaryData.CutStream,TBinaryData.CutTypedArray]
   ,IBinaryDataBitAccess:[TBinaryData.GetBitCount,TBinaryData.GetBit$1,TBinaryData.SetBit$1]
   ,IBinaryDataExport:[TBinaryData.ToBase64,TBinaryData.ToString,TBinaryData.ToTypedArray,TBinaryData.ToBytes,TBinaryData.ToHexDump,TBinaryData.ToStream,TBinaryData.Clone]
   ,IBinaryDataImport:[TBinaryData.FromBase64]
   ,IBinaryDataReadWriteAccess:[TBinaryData.ReadFloat32,TBinaryData.ReadFloat64,TBinaryData.ReadBool,TBinaryData.ReadInt,TBinaryData.ReadStr$1,TBinaryData.ReadBytes,TBinaryData.AppendBytes,TBinaryData.AppendStr,TBinaryData.AppendMemory,TBinaryData.AppendBuffer,TBinaryData.AppendFloat32,TBinaryData.AppendFloat64,TBinaryData.Write$2,TBinaryData.WriteFloat32,TBinaryData.WriteFloat64,TBinaryData.CopyFrom$2,TBinaryData.CopyFromMemory,TBinaryData.CutBinaryData,TBinaryData.CutStream,TBinaryData.CutTypedArray]
   ,IBinaryDataReadAccess:[TBinaryData.ReadFloat32,TBinaryData.ReadFloat64,TBinaryData.ReadBool,TBinaryData.ReadInt,TBinaryData.ReadStr$1,TBinaryData.ReadBytes]
   ,IBinaryTransport:[TAllocation.DataOffset$1,TAllocation.DataGetSize$1,TAllocation.DataRead$1,TAllocation.DataWrite$1]
   ,IAllocation:[TAllocation.GetHandle,TAllocation.GetTotalSize$1,TAllocation.GetSize$3,TAllocation.GetTransport,TAllocation.Allocate,TAllocation.Release,TAllocation.Grow,TAllocation.Shrink,TAllocation.ReAllocate,TAllocation.Transport]
}
/// EBinaryData = class (EW3Exception)
///  [line: 125, column: 3, file: System.Memory.Buffer]
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
   ,Get:function(Self, index$2, Value$21) {
      var Result = false;
      var mMask = 0;
      if (index$2>=0&&index$2<8) {
         mMask = 1<<index$2;
         Result = ((Value$21&mMask)!=0);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),"Invalid bit index, expected 0..7 not %d",[index$2]);
      }
      return Result
   }
   /// function TBitAccess.Set(const Index: Integer; const Value: Byte; const Data: Boolean) : Byte
   ///  [line: 127, column: 27, file: System.Types.Bits]
   ,Set$3:function(Self, Index$3, Value$22, Data$22) {
      var Result = 0;
      var mSet = false;
      var mMask$1 = 0;
      Result = Value$22;
      if (Index$3>=0&&Index$3<8) {
         mMask$1 = 1<<Index$3;
         mSet = ((Value$22&mMask$1)!=0);
         if (mSet!=Data$22) {
            if (Data$22) {
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
/// TW3ApplicationVersionInfo = class (TW3OwnedObject)
///  [line: 52, column: 1, file: System.Application.version]
var TW3ApplicationVersionInfo = {
   $ClassName:"TW3ApplicationVersionInfo",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// constructor TW3ApplicationVersionInfo.Create(const AOwner: TW3ApplicationInfo)
   ///  [line: 84, column: 39, file: System.Application.version]
   ,Create$131:function(Self, AOwner$7) {
      TW3OwnedObject.Create$11(Self,AOwner$7);
      return Self
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3OwnedObject.Create$11
};
TW3ApplicationVersionInfo.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ApplicationInfo = class (TW3OwnedObject)
///  [line: 33, column: 1, file: System.Application.version]
var TW3ApplicationInfo = {
   $ClassName:"TW3ApplicationInfo",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FInfo = null;
   }
   /// constructor TW3ApplicationInfo.Create(const AOwner: TObject)
   ///  [line: 162, column: 32, file: System.Application.version]
   ,Create$11:function(Self, AOwner$8) {
      TW3OwnedObject.Create$11(Self,AOwner$8);
      Self.FInfo = TW3ApplicationVersionInfo.Create$131($NewDyn(TW3ApplicationInfo.GetVersionInfoClass(Self),""),Self);
      return Self
   }
   /// function TW3ApplicationInfo.GetVersionInfoClass() : TW3ApplicationVersionInfoClass
   ///  [line: 169, column: 30, file: System.Application.version]
   ,GetVersionInfoClass:function(Self) {
      return TW3ApplicationVersionInfo;
   }
   ,Destroy:TObject.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3ApplicationInfo.$Intf={
   IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Structure = class (TObject)
///  [line: 92, column: 3, file: system.structure]
var TW3Structure = {
   $ClassName:"TW3Structure",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3Structure.ReadBool(const Name: String) : Boolean
   ///  [line: 200, column: 23, file: system.structure]
   ,ReadBool$1:function(Self, Name$9) {
      return (TW3Structure.Read$4(Self,Name$9)?true:false);
   }
   /// function TW3Structure.ReadBytes(const Name: String) : TByteArray
   ///  [line: 154, column: 23, file: system.structure]
   ,ReadBytes$1:function(Self, Name$10) {
      return TW3Structure.Read$4(Self,Name$10);
   }
   /// function TW3Structure.ReadDateTime(const Name: String) : TDateTime
   ///  [line: 210, column: 23, file: system.structure]
   ,ReadDateTime$2:function(Self, Name$11) {
      return Number(TW3Structure.Read$4(Self,Name$11));
   }
   /// function TW3Structure.ReadFloat(const Name: String) : Float
   ///  [line: 205, column: 23, file: system.structure]
   ,ReadFloat$1:function(Self, Name$12) {
      return Number(TW3Structure.Read$4(Self,Name$12));
   }
   /// function TW3Structure.ReadInt(const Name: String) : Integer
   ///  [line: 195, column: 23, file: system.structure]
   ,ReadInt$1:function(Self, Name$13) {
      return parseInt(TW3Structure.Read$4(Self,Name$13),10);
   }
   /// function TW3Structure.ReadString(const Name: String) : String
   ///  [line: 190, column: 23, file: system.structure]
   ,ReadString$3:function(Self, Name$14) {
      return String(TW3Structure.Read$4(Self,Name$14));
   }
   /// procedure TW3Structure.WriteBool(const Name: String; value: Boolean)
   ///  [line: 175, column: 24, file: system.structure]
   ,WriteBool:function(Self, Name$15, value$20) {
      TW3Structure.Write$10(Self,Name$15,value$20);
   }
   /// procedure TW3Structure.WriteBytes(const Name: String; const Value: TByteArray)
   ///  [line: 126, column: 24, file: system.structure]
   ,WriteBytes:function(Self, Name$16, Value$23) {
      try {
         TW3Structure.Write$10(Self,Name$16,TDatatype.BytesToBase64(TDatatype,Value$23));
      } catch ($e) {
         var e$20 = $W($e);
         throw EW3Exception.CreateFmt($New(EW3Structure),"Failed to write bytes to structure, system threw exception [%s] with message [%s]",[TObject.ClassName(e$20.ClassType), e$20.FMessage]);
      }
   }
   /// procedure TW3Structure.WriteDateTime(const Name: String; value: TDateTime)
   ///  [line: 185, column: 24, file: system.structure]
   ,WriteDateTime$1:function(Self, Name$17, value$21) {
      TW3Structure.Write$10(Self,Name$17,value$21);
   }
   /// procedure TW3Structure.WriteFloat(const Name: String; value: Float)
   ///  [line: 180, column: 24, file: system.structure]
   ,WriteFloat:function(Self, Name$18, value$22) {
      TW3Structure.Write$10(Self,Name$18,value$22);
   }
   /// procedure TW3Structure.WriteInt(const Name: String; value: Integer)
   ///  [line: 170, column: 24, file: system.structure]
   ,WriteInt:function(Self, Name$19, value$23) {
      TW3Structure.Write$10(Self,Name$19,value$23);
   }
   /// procedure TW3Structure.WriteStream(const Name: String; const Value: TStream)
   ///  [line: 138, column: 24, file: system.structure]
   ,WriteStream:function(Self, Name$20, Value$24) {
      var LBytes$1 = [];
      if (Value$24!==null) {
         if (TStream.GetSize$1$(Value$24)>0) {
            TStream.SetPosition$(Value$24,0);
            LBytes$1 = TStream.Read(Value$24,TStream.GetSize$1$(Value$24));
         }
         TW3Structure.WriteBytes(Self,Name$20,LBytes$1);
      } else {
         throw Exception.Create($New(EW3Structure),"Failed to write stream to structure, stream was nil error");
      }
   }
   /// procedure TW3Structure.WriteString(Name: String; Value: String; const Encode: Boolean)
   ///  [line: 159, column: 24, file: system.structure]
   ,WriteString$2:function(Self, Name$21, Value$25, Encode$7) {
      if (Encode$7) {
         Value$25 = TString.EncodeBase64(TString,Value$25);
      }
      TW3Structure.Write$10(Self,Name$21,Value$25);
   }
   ,Destroy:TObject.Destroy
};
TW3Structure.$Intf={
   IW3StructureReadAccess:[TW3Structure.Exists$2,TW3Structure.ReadString$3,TW3Structure.ReadInt$1,TW3Structure.ReadBool$1,TW3Structure.ReadFloat$1,TW3Structure.ReadDateTime$2,TW3Structure.Read$4,TW3Structure.ReadBytes$1]
   ,IW3Structure:[TW3Structure.WriteString$2,TW3Structure.WriteInt,TW3Structure.WriteBool,TW3Structure.WriteFloat,TW3Structure.WriteDateTime$1,TW3Structure.ReadString$3,TW3Structure.ReadInt$1,TW3Structure.ReadBool$1,TW3Structure.ReadFloat$1,TW3Structure.ReadDateTime$2,TW3Structure.Read$4,TW3Structure.Write$10]
   ,IW3StructureWriteAccess:[TW3Structure.WriteString$2,TW3Structure.WriteInt,TW3Structure.WriteBool,TW3Structure.WriteFloat,TW3Structure.WriteDateTime$1,TW3Structure.Write$10,TW3Structure.WriteBytes,TW3Structure.WriteStream]
}
/// EW3Structure = class (EW3Exception)
///  [line: 91, column: 3, file: system.structure]
var EW3Structure = {
   $ClassName:"EW3Structure",$Parent:EW3Exception
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
      $.FEnteredControl = $.FMouseCaptureControl = $.FMovementControl = null;
      $.FLastX = $.FLastY = $.FMoveTreshold = 0;
      $.FPrevClick = {Buttons:0,ClickSent:false,DownCtrl:null,DownTime:0,EndX:0,EndY:0,Moved$1:false,StartX:0,StartY:0,UpCtrl:null,UpTime:0};
   }
   /// procedure TW3EventManager.BindInteractionEvents(const Container: THandle)
   ///  [line: 100, column: 27, file: SmartCL.EventManager]
   ,BindInteractionEvents:function(Self, Container) {
      Container.addEventListener("touchstart",$Event1(Self,TW3EventManager.DocTouchBegins));
      Container.addEventListener("touchmove",$Event1(Self,TW3EventManager.DocTouchMove));
      Container.addEventListener("touchend",$Event1(Self,TW3EventManager.DocTouchEnds));
      Container.addEventListener("mousedown",$Event1(Self,TW3EventManager.DocMouseDown));
      Container.addEventListener("mousemove",$Event1(Self,TW3EventManager.DocMouseMove));
      Container.addEventListener("mouseup",$Event1(Self,TW3EventManager.DocMouseUp));
      Container.addEventListener("mousewheel",$Event1(Self,TW3EventManager.DocMouseWheel));
      try {
         Container.addEventListener("DOMMouseScroll",$Event1(Self,TW3EventManager.DocMouseWheel),false);
      } catch ($e) {
         /* null */
      }
      Self.FMoveTreshold = 10;
   }
   /// procedure TW3EventManager.CaptureMovement(Ctrl: TW3CustomControl; const MoveDirection: TMovementDirection)
   ///  [line: 500, column: 27, file: SmartCL.EventManager]
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
         {var $temp43 = MoveDirection;
            if ($temp43==1) {
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
             else if ($temp43==0) {
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
         if (TW3TagContainer.a$52(Ctrl)!==null&&$Is(TW3TagContainer.a$52(Ctrl),TW3CustomControl)) {
            Ctrl = $As(TW3TagContainer.a$52(Ctrl),TW3CustomControl);
         } else {
            break;
         }
      }
   }
   /// procedure TW3EventManager.DocMouseDown(eventObj: JMouseEvent)
   ///  [line: 173, column: 27, file: SmartCL.EventManager]
   ,DocMouseDown:function(Self, eventObj$16) {
      var e$21,
         x$59,
         y$33,
         Ctrl$1 = null;
      e$21 = eventObj$16;
      x$59 = e$21.clientX;
      y$33 = e$21.clientY;
      Ctrl$1 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$59,10),parseInt(y$33,10));
      if (Ctrl$1!==null) {
         TW3EventManager.StartClick(Self,Ctrl$1,parseInt(x$59,10),parseInt(y$33,10),parseInt(e$21.buttons,10));
         if (Ctrl$1.FOnMouseDown) {
            eventObj$16.preventDefault();
            eventObj$16.stopPropagation();
            TW3CustomControl.Dispatch(Ctrl$1,1,eventObj$16);
         }
         TW3EventManager.Entered(Self,Ctrl$1,eventObj$16);
         Self.FLastX = parseInt(x$59,10);
         Self.FLastY = parseInt(y$33,10);
         Self.FDirection = 3;
      }
   }
   /// procedure TW3EventManager.DocMouseMove(eventObj: JMouseEvent)
   ///  [line: 199, column: 27, file: SmartCL.EventManager]
   ,DocMouseMove:function(Self, eventObj$17) {
      var e$22,
         x$60,
         y$34,
         Ctrl$2 = null;
      e$22 = eventObj$17;
      if (Self.FCurrentClick.DownTime>0&&(Self.FCurrentClick.UpTime==0)&&Self.FCurrentClick.Buttons!=e$22.buttons) {
         TW3EventManager.DocMouseUp(Self,eventObj$17);
         return;
      }
      x$60 = e$22.clientX;
      y$34 = e$22.clientY;
      Ctrl$2 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$60,10),parseInt(y$34,10));
      if (Ctrl$2!==null) {
         if (Ctrl$2.FOnMouseMove) {
            eventObj$17.preventDefault();
            eventObj$17.stopPropagation();
            TW3CustomControl.Dispatch(Ctrl$2,2,eventObj$17);
         }
         if (Self.FCurrentClick.DownTime>0&&(Self.FCurrentClick.UpTime==0)&&Self.FCurrentClick.Buttons==1) {
            TW3EventManager.HandleMovement(Self,Ctrl$2,parseInt(x$60,10),parseInt(y$34,10));
         } else {
            TW3EventManager.Entered(Self,Ctrl$2,eventObj$17);
         }
      }
      Self.FLastX = parseInt(x$60,10);
      Self.FLastY = parseInt(y$34,10);
   }
   /// procedure TW3EventManager.DocMouseUp(eventObj: JMouseEvent)
   ///  [line: 238, column: 27, file: SmartCL.EventManager]
   ,DocMouseUp:function(Self, eventObj$18) {
      var e$23,
         x$61,
         y$35,
         Ctrl$3 = null;
      e$23 = eventObj$18;
      x$61 = e$23.clientX;
      y$35 = e$23.clientY;
      Ctrl$3 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$61,10),parseInt(y$35,10));
      if (Ctrl$3!==null) {
         TW3EventManager.EndClick(Self,Ctrl$3,parseInt(x$61,10),parseInt(y$35,10));
         if (Ctrl$3.FOnMouseUp) {
            eventObj$18.preventDefault();
            eventObj$18.stopPropagation();
            TW3CustomControl.Dispatch(Ctrl$3,3,eventObj$18);
         }
         TW3EventManager.SendClickOrDoubleClick(Self);
         TW3EventManager.Entered(Self,Ctrl$3,eventObj$18);
      }
      TW3EventManager.HandleMoveEnd(Self);
   }
   /// procedure TW3EventManager.DocMouseWheel(eventObj: JMouseWheelEvent)
   ///  [line: 261, column: 27, file: SmartCL.EventManager]
   ,DocMouseWheel:function(Self, eventObj$19) {
      var WheelDelta = 0;
      var Handled$3 = {};
      Handled$3.v = false;
      var e$24,
         x$62,
         y$36,
         Ctrl$4 = null,
         sr$6 = {Bottom$1:0,Left$3:0,Right$1:0,Top$3:0},
         MousePos$2 = {X$1:0,Y$1:0},
         shiftState$7 = null;
      e$24 = eventObj$19;
      if (e$24.detail) {
         WheelDelta = parseInt((e$24.detail*-40),10);
      } else {
         WheelDelta = parseInt(e$24.wheelDelta,10);
      }
      x$62 = e$24.clientX;
      y$36 = e$24.clientY;
      Ctrl$4 = TW3EventManager.FindControlAtPoint(Self,parseInt(x$62,10),parseInt(y$36,10));
      while (Ctrl$4!==null) {
         if (Ctrl$4.FOnMouseWheel) {
            try {
               sr$6 = TW3MovableControl.ScreenRect(Ctrl$4);
               MousePos$2 = Create$108(sr$6.Left$3,sr$6.Top$3);
               shiftState$7 = TShiftState.Current();
               TShiftState.SetMouseEvent(shiftState$7,eventObj$19);
               Ctrl$4.FOnMouseWheel(Ctrl$4,shiftState$7,WheelDelta,MousePos$2,Handled$3);
               if (Handled$3.v) {
                  eventObj$19.preventDefault();
                  eventObj$19.stopPropagation();
                  return;
               }
            } catch ($e) {
               /* null */
            }
         }
         if (TW3TagContainer.a$52(Ctrl$4)!==null&&$Is(TW3TagContainer.a$52(Ctrl$4),TW3CustomControl)) {
            Ctrl$4 = $As(TW3TagContainer.a$52(Ctrl$4),TW3CustomControl);
         } else {
            Ctrl$4 = null;
         }
      }
   }
   /// procedure TW3EventManager.DocTouchBegins(eventObj: JTouchEvent)
   ///  [line: 317, column: 27, file: SmartCL.EventManager]
   ,DocTouchBegins:function(Self, eventObj$20) {
      var x$63 = {};
      x$63.v = 0;
      var y$37 = {};
      y$37.v = 0;
      var e$25,
         Ctrl$5 = null,
         ShiftState$4 = null,
         cx$3 = 0,
         cy$3 = 0;
      e$25 = eventObj$20;
      if (TW3EventManager.GetTouchCoordinates(Self,eventObj$20,x$63,y$37)) {
         Ctrl$5 = TW3EventManager.FindControlAtPoint(Self,x$63.v,y$37.v);
         if (Ctrl$5!==null) {
            if (Ctrl$5.FOnTouchBegins) {
               eventObj$20.preventDefault();
               eventObj$20.stopPropagation();
               TW3CustomControl.Dispatch(Ctrl$5,4,eventObj$20);
            } else if (Ctrl$5.SimulateMouseEvents&&(Ctrl$5.FOnMouseDown!==null)) {
               try {
                  ShiftState$4 = TShiftState.Current();
                  cx$3 = x$63.v-TW3MovableControl.ScreenRect(Ctrl$5).Left$3;
                  cy$3 = y$37.v-TW3MovableControl.ScreenRect(Ctrl$5).Top$3;
                  Ctrl$5.FOnMouseDown(Ctrl$5,0,ShiftState$4,cx$3,cy$3);
                  eventObj$20.preventDefault();
                  eventObj$20.stopPropagation();
               } catch ($e) {
                  /* null */
               }
            }
            TW3EventManager.StartClick(Self,Ctrl$5,x$63.v,y$37.v,1);
            Self.FLastX = x$63.v;
            Self.FLastY = y$37.v;
            Self.FDirection = 3;
         }
      }
   }
   /// procedure TW3EventManager.DocTouchEnds(eventObj: JTouchEvent)
   ///  [line: 392, column: 27, file: SmartCL.EventManager]
   ,DocTouchEnds:function(Self, eventObj$21) {
      var x$64 = {};
      x$64.v = 0;
      var y$38 = {};
      y$38.v = 0;
      var e$26,
         Ctrl$6 = null,
         ShiftState$5 = null,
         cx$4 = 0,
         cy$4 = 0;
      e$26 = eventObj$21;
      if (!TW3EventManager.GetTouchCoordinates(Self,eventObj$21,x$64,y$38)) {
         x$64.v = Self.FLastX;
         y$38.v = Self.FLastY;
      }
      Ctrl$6 = TW3EventManager.FindControlAtPoint(Self,x$64.v,y$38.v);
      if (Ctrl$6!==null) {
         TW3EventManager.EndClick(Self,Ctrl$6,x$64.v,y$38.v);
         if (Ctrl$6.FOnTouchEnds) {
            eventObj$21.preventDefault();
            eventObj$21.stopPropagation();
            TW3CustomControl.Dispatch(Ctrl$6,6,eventObj$21);
         } else if (Ctrl$6.SimulateMouseEvents&&(Ctrl$6.FOnMouseUp!==null)) {
            try {
               ShiftState$5 = TShiftState.Current();
               cx$4 = x$64.v-TW3MovableControl.ScreenRect(Ctrl$6).Left$3;
               cy$4 = y$38.v-TW3MovableControl.ScreenRect(Ctrl$6).Top$3;
               Ctrl$6.FOnMouseUp(Ctrl$6,0,ShiftState$5,cx$4,cy$4);
               eventObj$21.preventDefault();
               eventObj$21.stopPropagation();
            } catch ($e) {
               /* null */
            }
         }
         TW3EventManager.SendClickOrDoubleClick(Self);
      }
      TW3EventManager.HandleMoveEnd(Self);
   }
   /// procedure TW3EventManager.DocTouchMove(eventObj: JTouchEvent)
   ///  [line: 355, column: 27, file: SmartCL.EventManager]
   ,DocTouchMove:function(Self, eventObj$22) {
      var x$65 = {};
      x$65.v = 0;
      var y$39 = {};
      y$39.v = 0;
      var e$27,
         Ctrl$7 = null,
         ShiftState$6 = null,
         cx$5 = 0,
         cy$5 = 0;
      e$27 = eventObj$22;
      if (TW3EventManager.GetTouchCoordinates(Self,eventObj$22,x$65,y$39)) {
         Ctrl$7 = TW3EventManager.FindControlAtPoint(Self,x$65.v,y$39.v);
         if (Ctrl$7!==null) {
            if (Ctrl$7.FOnTouchMoves) {
               eventObj$22.preventDefault();
               eventObj$22.stopPropagation();
               TW3CustomControl.Dispatch(Ctrl$7,5,eventObj$22);
            } else if (Ctrl$7.SimulateMouseEvents&&(Ctrl$7.FOnMouseMove!==null)) {
               try {
                  ShiftState$6 = TShiftState.Current();
                  cx$5 = x$65.v-TW3MovableControl.ScreenRect(Ctrl$7).Left$3;
                  cy$5 = y$39.v-TW3MovableControl.ScreenRect(Ctrl$7).Top$3;
                  Ctrl$7.FOnMouseMove(Ctrl$7,ShiftState$6,cx$5,cy$5);
                  eventObj$22.preventDefault();
                  eventObj$22.stopPropagation();
               } catch ($e) {
                  /* null */
               }
            }
            TW3EventManager.HandleMovement(Self,Ctrl$7,x$65.v,y$39.v);
         }
         Self.FLastX = x$65.v;
         Self.FLastY = y$39.v;
      }
   }
   /// procedure TW3EventManager.EndClick(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer)
   ///  [line: 590, column: 27, file: SmartCL.EventManager]
   ,EndClick:function(Self, Ctrl$8, x$66, y$40) {
      Self.FCurrentClick.EndX = x$66;
      Self.FCurrentClick.EndY = y$40;
      Self.FCurrentClick.UpTime = GetMilliseconds();
      Self.FCurrentClick.UpCtrl = Ctrl$8;
   }
   /// procedure TW3EventManager.Entered(Ctrl: TW3CustomControl; EventObj: JMouseEvent)
   ///  [line: 119, column: 27, file: SmartCL.EventManager]
   ,Entered:function(Self, Ctrl$9, EventObj$3) {
      if (Ctrl$9!==Self.FEnteredControl) {
         try {
            if (Self.FEnteredControl!==null&&(Self.FEnteredControl.FOnMouseExit!==null)) {
               TW3CustomControl.Dispatch(Self.FEnteredControl,9,EventObj$3);
            }
         } catch ($e) {
            /* null */
         }
         Self.FEnteredControl = Ctrl$9;
         if (Self.FEnteredControl!==null&&(Self.FEnteredControl.FOnMouseEnter!==null)) {
            TW3CustomControl.Dispatch(Self.FEnteredControl,8,EventObj$3);
         }
      }
   }
   /// function TW3EventManager.FindControlAtPoint(x: Integer; y: Integer) : TW3CustomControl
   ///  [line: 139, column: 26, file: SmartCL.EventManager]
   ,FindControlAtPoint:function(Self, x$67, y$41) {
      var Result = null;
      var LPos = {X$1:0,Y$1:0};
      var LTarget = undefined;
      var Tag$1 = null;
      Self.DetectedHandles.length=0;
      Result = Self.FMouseCaptureControl;
      if (Result!==null) {
         return Result;
      }
      LPos = Create$108(x$67,y$41);
      LTarget = document.elementFromPoint(LPos.X$1,LPos.Y$1);
      while (LTarget) {
         Self.DetectedHandles.push(LTarget);
         Tag$1 = TW3ControlTracker.GetControlByHandle(TW3ControlTracker,LTarget);
         if (Tag$1!==null&&$Is(Tag$1,TW3CustomControl)) {
            Result = $As(Tag$1,TW3CustomControl);
            while (Result!==null&&TW3CustomControl.GetTransparentEvents(Result)&&TW3TagContainer.a$52(Result)!==null&&$Is(TW3TagContainer.a$52(Result),TW3CustomControl)) {
               Result = $As(TW3TagContainer.a$52(Result),TW3CustomControl);
            }
            return Result;
         } else {
            LTarget = LTarget.parentElement;
         }
      }
      return Result
   }
   /// function TW3EventManager.GetTouchCoordinates(eventObj: JTouchEvent; var x: Integer; var y: Integer) : Boolean
   ///  [line: 304, column: 26, file: SmartCL.EventManager]
   ,GetTouchCoordinates:function(Self, eventObj$23, x$68, y$42) {
      var Result = false;
      var e$28;
      e$28 = eventObj$23;
      if (e$28.targetTouches&&e$28.targetTouches.length>0) {
         x$68.v = parseInt(e$28.targetTouches[0].pageX,10);
         y$42.v = parseInt(e$28.targetTouches[0].pageY,10);
         Result = true;
      }
      return Result
   }
   /// procedure TW3EventManager.HandleMoveEnd()
   ///  [line: 483, column: 27, file: SmartCL.EventManager]
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
   ///  [line: 435, column: 27, file: SmartCL.EventManager]
   ,HandleMovement:function(Self, Ctrl$10, x$69, y$43) {
      var dx$11 = 0,
         dy$12 = 0;
      if (Self.FMouseCaptureControl===null) {
         dx$11 = x$69-Self.FCurrentClick.StartX;
         dy$12 = y$43-Self.FCurrentClick.StartY;
         if (Math.abs(dx$11)>Self.FMoveTreshold||Math.abs(dy$12)>Self.FMoveTreshold) {
            if (Self.FCurrentClick.Moved$1) {
               if (Self.FMovementControl!==null) {
                  dx$11 = x$69-Self.FLastX;
                  dy$12 = y$43-Self.FLastY;
                  try {
                     if ((Self.FMovementControl.FOnHorizontalMovement!==null)&&((1<<Self.FDirection&6)!=0)) {
                        Self.FMovementControl.FOnHorizontalMovement(Self,dx$11,0);
                     }
                     if ((Self.FMovementControl.FOnVerticalMovement!==null)&&((1<<Self.FDirection&5)!=0)) {
                        Self.FMovementControl.FOnVerticalMovement(Self,0,dy$12);
                     }
                     if ((Self.FMovementControl.FOnAllMovement!==null)&&((1<<Self.FDirection&7)!=0)) {
                        Self.FMovementControl.FOnAllMovement(Self,dx$11,dy$12);
                     }
                  } catch ($e) {
                     /* null */
                  }
               }
            } else {
               Self.FCurrentClick.Moved$1 = true;
               if (Self.FDirection==3) {
                  if (Math.abs(dx$11)>Math.abs(dy$12)) {
                     TW3EventManager.CaptureMovement(Self,Ctrl$10,1);
                  } else {
                     TW3EventManager.CaptureMovement(Self,Ctrl$10,0);
                  }
               }
            }
         }
      }
   }
   /// procedure TW3EventManager.PreventOnClick()
   ///  [line: 665, column: 27, file: SmartCL.EventManager]
   ,PreventOnClick:function(Self) {
      Self.FCurrentClick.ClickSent = true;
   }
   /// procedure TW3EventManager.ReleaseCapture(const Target: TW3CustomControl)
   ///  [line: 567, column: 27, file: SmartCL.EventManager]
   ,ReleaseCapture$1:function(Self, Target$4) {
      Self.FMouseCaptureControl = null;
   }
   /// procedure TW3EventManager.SendClickOrDoubleClick()
   ///  [line: 598, column: 27, file: SmartCL.EventManager]
   ,SendClickOrDoubleClick:function(Self) {
      var SameCtrl = false;
      try {
         if (Self.FCurrentClick.Buttons!=1||Self.FCurrentClick.Moved$1||Self.FCurrentClick.DownCtrl!==Self.FCurrentClick.UpCtrl) {
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
               TW3CustomControl.Dispatch(Self.FCurrentClick.UpCtrl,7,null);
            }
         }
      } catch ($e) {
         /* null */
      }
   }
   /// procedure TW3EventManager.SendDelayedClick()
   ///  [line: 651, column: 27, file: SmartCL.EventManager]
   ,SendDelayedClick:function(Self) {
      if ((!Self.FCurrentClick.ClickSent)&&(!Self.FCurrentClick.Moved$1)&&GetMilliseconds()-Self.FCurrentClick.UpTime<600) {
         Self.FCurrentClick.ClickSent = true;
         try {
            TW3CustomControl.Dispatch(Self.FCurrentClick.UpCtrl,7,null);
         } catch ($e) {
            /* null */
         }
      }
   }
   /// procedure TW3EventManager.SetCapture(const Target: TW3CustomControl)
   ///  [line: 559, column: 27, file: SmartCL.EventManager]
   ,SetCapture$1:function(Self, Target$5) {
      Self.FMouseCaptureControl = Target$5;
   }
   /// procedure TW3EventManager.StartClick(const Ctrl: TW3CustomControl; const x: Integer; const y: Integer; const Buttons: Integer)
   ///  [line: 575, column: 27, file: SmartCL.EventManager]
   ,StartClick:function(Self, Ctrl$11, x$70, y$44, Buttons$1) {
      Copy$TW3EventManagerClickInfo(Self.FCurrentClick,Self.FPrevClick);
      Self.FCurrentClick.StartX = x$70;
      Self.FCurrentClick.StartY = y$44;
      Self.FCurrentClick.Buttons = Buttons$1;
      Self.FCurrentClick.DownTime = GetMilliseconds();
      Self.FCurrentClick.DownCtrl = Ctrl$11;
      Self.FCurrentClick.UpTime = 0;
      Self.FCurrentClick.UpCtrl = null;
      Self.FCurrentClick.ClickSent = false;
      Self.FCurrentClick.Moved$1 = false;
   }
   ,Destroy:TObject.Destroy
};
/// TW3ZOrderFilterResult enumeration
///  [line: 247, column: 3, file: SmartCL.Components]
var TW3ZOrderFilterResult = [ "zfInclude", "zfExclude" ];
/// TW3TextShadow = class (TW3OwnedObject)
///  [line: 653, column: 3, file: SmartCL.Components]
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
///  [line: 256, column: 3, file: SmartCL.Components]
var TW3TagPositionMode = { 22:"pmRelative", 23:"pmAbsolute" };
/// TW3TagDisplayMode enumeration
///  [line: 261, column: 3, file: SmartCL.Components]
var TW3TagDisplayMode = [ "dmInlineBlock", "dmBlock", "dmFlex", "dmTable", "dmTableCaption", "dmTableCell", "dmTableRow", "dmTableColumn", "dmRunIn", "dmListItem" ];
/// TW3StackingOrderList = record
///  [line: 238, column: 3, file: SmartCL.Components]
function Copy$TW3StackingOrderList(s,d) {
   d.olTags=s.olTags;
   d.olZIndex=s.olZIndex;
   return d;
}
function Clone$TW3StackingOrderList($) {
   return {
      olTags:$.olTags,
      olZIndex:$.olZIndex
   }
}
/// procedure TW3StackingOrderList.Sort(var Self: TW3StackingOrderList; const HighestFirst: Boolean)
///  [line: 1454, column: 32, file: SmartCL.Components]
function TW3StackingOrderList$Sort$1(Self$26, HighestFirst) {
   var mCount$3 = 0,
      mAltered$1 = false,
      x$71 = 0;
   var mAltered$2 = false,
      x$72 = 0;
   mCount$3 = Self$26.olZIndex.length;
   if (mCount$3>1) {
      if (HighestFirst) {
         mAltered$1 = false;
         do {
            mAltered$1 = false;
            var $temp44;
            for(x$71=1,$temp44=mCount$3;x$71<$temp44;x$71++) {
               if (Self$26.olZIndex[x$71]>Self$26.olZIndex[x$71-1]) {
                  $ArraySwap(Self$26.olZIndex,(x$71-1),x$71);
                  $ArraySwap(Self$26.olTags,(x$71-1),x$71);
                  mAltered$1 = true;
               }
            }
         } while (!(!mAltered$1));
      } else {
         mAltered$2 = false;
         do {
            mAltered$2 = false;
            var $temp45;
            for(x$72=1,$temp45=mCount$3;x$72<$temp45;x$72++) {
               if (Self$26.olZIndex[x$72]<Self$26.olZIndex[x$72-1]) {
                  $ArraySwap(Self$26.olZIndex,(x$72-1),x$72);
                  $ArraySwap(Self$26.olTags,(x$72-1),x$72);
                  mAltered$2 = true;
               }
            }
         } while (!(!mAltered$2));
      }
   }
}
/// procedure TW3StackingOrderList.Swap(var Self: TW3StackingOrderList; const AIndex: Integer; const BIndex: Integer)
///  [line: 1447, column: 32, file: SmartCL.Components]
function TW3StackingOrderList$Swap$1(Self$27, AIndex, BIndex) {
   var LTemp$2 = 0;
   LTemp$2 = Self$27.olZIndex[AIndex];
   Self$27.olZIndex[AIndex]=Self$27.olZIndex[BIndex];
   Self$27.olZIndex[BIndex]=LTemp$2;
}
/// procedure TW3StackingOrderList.Remap(var Self: TW3StackingOrderList)
///  [line: 1435, column: 32, file: SmartCL.Components]
function TW3StackingOrderList$Remap(Self$28) {
   var x$73 = 0;
   var LHandle$4 = undefined;
   var $temp46;
   for(x$73=0,$temp46=Self$28.olZIndex.length;x$73<$temp46;x$73++) {
      LHandle$4 = Self$28.olTags[x$73];
      LHandle$4.style.zIndex = Self$28.olZIndex[x$73];
   }
}
/// function TW3StackingOrderList.IndexOfHandle(var Self: TW3StackingOrderList; const Handle: THandle) : Integer
///  [line: 1421, column: 31, file: SmartCL.Components]
function TW3StackingOrderList$IndexOfHandle(Self$29, Handle$18) {
   var Result = 0;
   var LCount$2 = 0,
      x$74 = 0;
   --Result;
   LCount$2 = Self$29.olTags.length;
   var $temp47;
   for(x$74=0,$temp47=LCount$2;x$74<$temp47;x$74++) {
      if (Self$29.olTags[x$74]==Handle$18) {
         Result = x$74;
         break;
      }
   }
   return Result
}
/// TW3ScrollInfo = class (TW3OwnedObject)
///  [line: 751, column: 3, file: SmartCL.Components]
var TW3ScrollInfo = {
   $ClassName:"TW3ScrollInfo",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FHandle$8 = undefined;
   }
   /// constructor TW3ScrollInfo.Create(const AOwner: TW3TagObj)
   ///  [line: 2990, column: 27, file: SmartCL.Components]
   ,Create$119:function(Self, AOwner$9) {
      TW3OwnedObject.Create$11(Self,AOwner$9);
      Self.FHandle$8 = AOwner$9.FHandle$3;
      return Self
   }
   /// function TW3ScrollInfo.GetScrollHeight() : Integer
   ///  [line: 3033, column: 24, file: SmartCL.Components]
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
   ///  [line: 3042, column: 24, file: SmartCL.Components]
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
   ///  [line: 3051, column: 24, file: SmartCL.Components]
   ,GetScrollTop:function(Self) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$8)) {
         Result = parseInt(Self.FHandle$8.scrollTop,10);
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ScrollInfo.GetScrollTop",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollWidth() : Integer
   ///  [line: 3024, column: 24, file: SmartCL.Components]
   ,GetScrollWidth:function(Self) {
      var Result = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$8)) {
         Result = parseInt(Self.FHandle$8.scrollWidth,10);
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ScrollInfo.GetScrollWidth",Self,"invalid owner handle error");
      }
      return Result
   }
   /// procedure TW3ScrollInfo.ScrollTo(const NewLeft: Integer; const NewTop: Integer)
   ///  [line: 3060, column: 25, file: SmartCL.Components]
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
///  [line: 1173, column: 3, file: SmartCL.Components]
var TW3GraphicControl = {
   $ClassName:"TW3GraphicControl",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCanvas = $.FContext$2 = $.FOnPaint = null;
   }
   /// procedure TW3GraphicControl.FinalizeObject()
   ///  [line: 4042, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FCanvas);
      TObject.Free(Self.FContext$2);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3GraphicControl.InitializeObject()
   ///  [line: 4035, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContext$2 = TW3ControlGraphicContext.Create$98($New(TW3ControlGraphicContext),Self.FHandle$3);
      Self.FCanvas = TW3Canvas.Create$101($New(TW3Canvas),Self.FContext$2);
   }
   /// procedure TW3GraphicControl.Invalidate()
   ///  [line: 4100, column: 29, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      if (Self.FHandle$3) {
         TW3GraphicControl.Refresh(Self);
      }
   }
   /// function TW3GraphicControl.MakeElementTagObj() : THandle
   ///  [line: 4079, column: 28, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      var Result = undefined;
      Result = document.createElement("canvas");
      return Result
   }
   /// procedure TW3GraphicControl.Paint()
   ///  [line: 4086, column: 29, file: SmartCL.Components]
   ,Paint:function(Self) {
      if (Self.FOnPaint) {
         Self.FOnPaint(Self,Self.FCanvas);
      }
   }
   /// procedure TW3GraphicControl.Refresh()
   ///  [line: 4107, column: 29, file: SmartCL.Components]
   ,Refresh:function(Self) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!TW3TagObj.a$49(Self)) {
            if ($SetIn(Self.FComponentState,3,0,9)) {
               TW3GraphicControl.Paint(Self);
            }
         }
      }
   }
   /// procedure TW3GraphicControl.Resize()
   ///  [line: 4092, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      w3_setAttrib(Self.FHandle$3,"width",w3_GetStyle(Self.FHandle$3,"width"));
      w3_setAttrib(Self.FHandle$3,"height",w3_GetStyle(Self.FHandle$3,"height"));
   }
   /// procedure TW3GraphicControl.SetHeight(const NewHeight: Integer)
   ///  [line: 4068, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, NewHeight$3) {
      TW3MovableControl.SetHeight(Self,NewHeight$3);
      if (Self.FHandle$3) {
         if (NewHeight$3!=TW3MovableControl.GetHeight(Self)) {
            w3_setAttrib(Self.FHandle$3,"height",TInteger.ToPxStr(NewHeight$3));
         }
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3GraphicControl.SetHeight",Self,"invalid control handle error");
      }
   }
   /// procedure TW3GraphicControl.SetWidth(const NewWidth: Integer)
   ///  [line: 4057, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, NewWidth$3) {
      TW3MovableControl.SetWidth(Self,NewWidth$3);
      if (Self.FHandle$3) {
         if (NewWidth$3!=TW3MovableControl.GetWidth(Self)) {
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
};
TW3GraphicControl.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ControlTracker = class (TObject)
///  [line: 1208, column: 3, file: SmartCL.Components]
var TW3ControlTracker = {
   $ClassName:"TW3ControlTracker",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TW3ControlTracker.GetControlByHandle(const ThisHandle: THandle) : TW3TagObj
   ///  [line: 1355, column: 34, file: SmartCL.Components]
   ,GetControlByHandle:function(Self, ThisHandle) {
      var Result = null;
      var LGenKey;
      if (FLUT===null) {
         FLUT = TW3CustomDictionary.Create$122($New(TW3ObjDictionary));
      }
      if (FOLUT===null) {
         FOLUT = TW3CustomDictionary.Create$122($New(TW3ObjDictionary));
      }
      if (ThisHandle) {
         LGenKey = ThisHandle.getAttribute("data-okey");
         if (LGenKey) {
            if (TW3CustomDictionary.KeyExists(FOLUT,(String(LGenKey)))) {
               Result = $As(TW3ObjDictionary.a$76(FOLUT,(String(LGenKey))),TW3TagObj);
            }
         }
      }
      return Result
   }
   /// procedure TW3ControlTracker.RegisterControl(const Instance: TW3TagObj)
   ///  [line: 1297, column: 35, file: SmartCL.Components]
   ,RegisterControl:function(Self, Instance$4) {
      var LId = "",
         LGenKey$1 = "";
      if (Instance$4!==null) {
         if (FLUT===null) {
            FLUT = TW3CustomDictionary.Create$122($New(TW3ObjDictionary));
         }
         if (FOLUT===null) {
            FOLUT = TW3CustomDictionary.Create$122($New(TW3ObjDictionary));
         }
         LId = Trim$_String_(Instance$4.FTagId);
         if (LId.length>0) {
            TW3ObjDictionary.a$75(FLUT,LId,Instance$4);
         }
         LGenKey$1 = TW3Identifiers.GenerateUniqueObjectId(TW3Identifiers);
         Instance$4.FHandle$3.setAttribute("data-okey",LGenKey$1);
         TW3ObjDictionary.a$75(FOLUT,LGenKey$1,Instance$4);
      }
   }
   /// procedure TW3ControlTracker.SetFocusedControl(const NewItem: TW3TagObj)
   ///  [line: 1381, column: 35, file: SmartCL.Components]
   ,SetFocusedControl:function(Self, NewItem) {
      FFocused = NewItem;
   }
   /// procedure TW3ControlTracker.UnRegisterControl(const Instance: TW3TagObj)
   ///  [line: 1322, column: 35, file: SmartCL.Components]
   ,UnRegisterControl:function(Self, Instance$5) {
      var LId$1 = "",
         LGenKey$2;
      if (Instance$5!==null) {
         if (FLUT===null) {
            FLUT = TW3CustomDictionary.Create$122($New(TW3ObjDictionary));
         }
         if (FOLUT===null) {
            FOLUT = TW3CustomDictionary.Create$122($New(TW3ObjDictionary));
         }
         LId$1 = Trim$_String_(Instance$5.FTagId);
         if (LId$1.length>0) {
            if (TW3CustomDictionary.KeyExists(FLUT,LId$1)) {
               if (FFocused===Instance$5) {
                  FFocused = null;
               }
               TW3CustomDictionary.Delete$1(FLUT,LId$1);
            }
         }
         LGenKey$2 = Instance$5.FHandle$3.getAttribute("data-okey");
         if (TW3CustomDictionary.KeyExists(FOLUT,(String(LGenKey$2)))) {
            TW3CustomDictionary.Delete$1(FOLUT,(String(LGenKey$2)));
            Instance$5.FHandle$3.removeAttribute("data-okey");
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3ControlSizeInfo = record
///  [line: 225, column: 3, file: SmartCL.Components]
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
   ,Create$118:function(Self, ControlHandle$1) {
      TObject.Create(Self);
      Self.FHandle$7 = ControlHandle$1;
      return Self
   }
   /// function TW3DOMFont.GetColor() : TColor
   ///  [line: 237, column: 21, file: SmartCL.Fonts]
   ,GetColor$1:function(Self) {
      var Result = {v:0};
      try {
         var LHandle$5 = undefined;
         LHandle$5 = TW3CustomFont.GetHandle$4$(Self);
         if (LHandle$5) {
            Result.v = StrToColor(w3_GetStyleAsStr(LHandle$5,"color"));
         } else {
            throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetColor", TObject.ClassName(Self.ClassType), $R[24]]);
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
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetName", TObject.ClassName(Self.ClassType), $R[24]]);
      }
      return Result
   }
   /// function TW3DOMFont.GetSize() : Integer
   ///  [line: 214, column: 21, file: SmartCL.Fonts]
   ,GetSize$4:function(Self) {
      var Result = 0;
      var LHandle$6 = undefined;
      LHandle$6 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$6) {
         Result = w3_GetStyleAsInt(LHandle$6,"font-size");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetSize", TObject.ClassName(Self.ClassType), $R[24]]);
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
      var LHandle$7 = undefined;
      LHandle$7 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$7) {
         Result = w3_GetStyleAsStr(LHandle$7,"font-weight");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.GetWeight", TObject.ClassName(Self.ClassType), $R[24]]);
      }
      return Result
   }
   /// procedure TW3DOMFont.SetColor(aNewColor: TColor)
   ///  [line: 248, column: 22, file: SmartCL.Fonts]
   ,SetColor$2:function(Self, aNewColor) {
      var LHandle$8 = undefined;
      LHandle$8 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$8) {
         LHandle$8.style["color"] = ColorToWebStr(aNewColor,255);
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetColor", TObject.ClassName(Self.ClassType), $R[24]]);
      }
   }
   /// procedure TW3DOMFont.SetName(aNewName: String)
   ///  [line: 201, column: 22, file: SmartCL.Fonts]
   ,SetName$1:function(Self, aNewName) {
      var LHandle$9 = undefined;
      LHandle$9 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$9) {
         LHandle$9.style["font-family"] = aNewName;
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetName", TObject.ClassName(Self.ClassType), $R[24]]);
      }
   }
   /// procedure TW3DOMFont.SetSize(aNewSize: Integer)
   ///  [line: 224, column: 22, file: SmartCL.Fonts]
   ,SetSize$6:function(Self, aNewSize) {
      var LHandle$10 = undefined;
      LHandle$10 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$10) {
         LHandle$10.style["font-size"] = TInteger.ToPxStr(aNewSize);
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetSize", TObject.ClassName(Self.ClassType), $R[24]]);
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
      var LHandle$11 = undefined;
      LHandle$11 = TW3CustomFont.GetHandle$4$(Self);
      if (LHandle$11) {
         LHandle$11.style["font-weight"] = aNewWeight;
         if (Self.OnChanged) {
            Self.OnChanged(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3DOMFont.SetWeight", TObject.ClassName(Self.ClassType), $R[24]]);
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
///  [line: 608, column: 3, file: SmartCL.Components]
var TW3ControlFont = {
   $ClassName:"TW3ControlFont",$Parent:TW3DOMFont
   ,$Init:function ($) {
      TW3DOMFont.$Init($);
      $.FAuto = false;
      $.FOwner$3 = null;
   }
   /// constructor TW3ControlFont.Create(const AOwner: TW3MovableControl)
   ///  [line: 2962, column: 28, file: SmartCL.Components]
   ,Create$120:function(Self, AOwner$10) {
      TW3DOMFont.Create$118(Self,AOwner$10.FHandle$3);
      if (AOwner$10) {
         Self.FOwner$3 = AOwner$10;
      } else {
         throw EW3Exception.Create$17($New(EW3TagObj),"TW3ControlFont.Create",Self,"Owner was nil error");
      }
      return Self
   }
   /// function TW3ControlFont.GetHandle() : THandle
   ///  [line: 2972, column: 25, file: SmartCL.Components]
   ,GetHandle$4:function(Self) {
      return Self.FOwner$3.FHandle$3;
   }
   /// procedure TW3ControlFont.SetAuto(const NewValue: Boolean)
   ///  [line: 2977, column: 26, file: SmartCL.Components]
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
///  [line: 621, column: 3, file: SmartCL.Components]
var TW3ControlBackgroundSizeMode = [ "smAuto", "smLength", "smPercent", "smCover", "smContain" ];
/// TW3ControlBackgroundSize = class (TW3OwnedObject)
///  [line: 631, column: 3, file: SmartCL.Components]
var TW3ControlBackgroundSize = {
   $ClassName:"TW3ControlBackgroundSize",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FHeight$1 = $.FWidth$1 = 0;
      $.FMode = 3;
   }
   /// function TW3ControlBackgroundSize.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 5140, column: 35, file: SmartCL.Components]
   ,AcceptOwner:function(Self, CandidateObject$1) {
      return (CandidateObject$1!==null)&&$Is(CandidateObject$1,TW3ControlBackground);
   }
   /// procedure TW3ControlBackgroundSize.Apply()
   ///  [line: 5197, column: 36, file: SmartCL.Components]
   ,Apply:function(Self) {
      var LHandle$12 = undefined;
      LHandle$12 = TW3ControlBackgroundSize.GetOwnerHandle(Self);
      if (TControlHandleHelper$Valid$2(LHandle$12)) {
         switch (Self.FMode) {
            case 0 :
               LHandle$12.style["background-size"] = "auto auto";
               break;
            case 3 :
               LHandle$12.style["background-size"] = "cover";
               break;
            case 4 :
               LHandle$12.style["background-size"] = "contain";
               break;
            case 1 :
               LHandle$12.style["background-size"] = (Self.FWidth$1.toString()+"px "+Self.FHeight$1.toString()+"px");
               break;
            case 2 :
               Self.FWidth$1 = TInteger.EnsureRange(Self.FWidth$1,0,100);
               Self.FHeight$1 = TInteger.EnsureRange(Self.FHeight$1,0,100);
               LHandle$12.style["background-size"] = Self.FWidth$1.toString()+"% "+Self.FHeight$1.toString()+"%";
               break;
         }
      } else {
         throw EW3Exception.Create$17($New(EW3ControlBackgroundSize),"TW3ControlBackgroundSize.Apply",Self,"Invalid control handle error");
      }
   }
   /// function TW3ControlBackgroundSize.GetOwner() : TW3ControlBackground
   ///  [line: 5145, column: 35, file: SmartCL.Components]
   ,GetOwner$2:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3ControlBackground);
   }
   /// function TW3ControlBackgroundSize.GetOwnerHandle() : TControlHandle
   ///  [line: 5150, column: 35, file: SmartCL.Components]
   ,GetOwnerHandle:function(Self) {
      var Result = undefined;
      var LBack = null;
      var LCtrl$1 = null;
      LBack = TW3ControlBackgroundSize.GetOwner$2(Self);
      if (LBack!==null) {
         if (TW3ControlBackground.GetOwner$3(LBack)!==null) {
            LCtrl$1 = TW3ControlBackground.GetOwner$3(LBack);
            if (LCtrl$1!==null) {
               Result = LCtrl$1.FHandle$3;
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
   ///  [line: 5233, column: 36, file: SmartCL.Components]
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
   ///  [line: 5188, column: 36, file: SmartCL.Components]
   ,SetMode:function(Self, NewMode) {
      if (NewMode!=Self.FMode) {
         Self.FMode = NewMode;
         TW3ControlBackgroundSize.Apply(Self);
      }
   }
   /// procedure TW3ControlBackgroundSize.SetWidth(NewWidth: Integer)
   ///  [line: 5221, column: 36, file: SmartCL.Components]
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
///  [line: 696, column: 3, file: SmartCL.Components]
var TW3ControlBackground = {
   $ClassName:"TW3ControlBackground",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FSize$2 = null;
   }
   /// function TW3ControlBackground.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 1728, column: 31, file: SmartCL.Components]
   ,AcceptOwner:function(Self, CandidateObject$2) {
      return CandidateObject$2!==null&&$Is(CandidateObject$2,TW3MovableControl);
   }
   /// constructor TW3ControlBackground.Create(const AOwner: TObject)
   ///  [line: 1668, column: 34, file: SmartCL.Components]
   ,Create$11:function(Self, AOwner$11) {
      TW3OwnedObject.Create$11(Self,AOwner$11);
      Self.FSize$2 = TW3OwnedObject.Create$11$($New(TW3ControlBackgroundSize),Self);
      return Self
   }
   /// destructor TW3ControlBackground.Destroy()
   ///  [line: 1674, column: 33, file: SmartCL.Components]
   ,Destroy:function(Self) {
      TObject.Free(Self.FSize$2);
      TObject.Destroy(Self);
   }
   /// function TW3ControlBackground.GetOwner() : TW3MovableControl
   ///  [line: 1716, column: 31, file: SmartCL.Components]
   ,GetOwner$3:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3MovableControl);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3ControlBackground.$Intf={
   IW3OwnedObjectAccess:[TW3ControlBackground.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3ContentSelectionMode enumeration
///  [line: 110, column: 3, file: SmartCL.Components]
var TW3ContentSelectionMode = [ "tsmNone", "tsmAuto", "tsmText", "tsmAll", "tsmElement" ];
/// TW3BackgroundRepeat enumeration
///  [line: 680, column: 3, file: SmartCL.Components]
var TW3BackgroundRepeat = [ "brInitial", "brInherited", "brRepeat", "brRepeatX", "brRepeatY", "brNoRepeat" ];
/// TShiftStateEnum enumeration
///  [line: 100, column: 3, file: SmartCL.Components]
var TShiftStateEnum = [ "ssShift", "ssAlt", "ssCtrl", "ssMeta", "ssLeft", "ssRight", "ssMiddle" ];
/// TShiftState = class (TObject)
///  [line: 171, column: 3, file: SmartCL.Components]
var TShiftState = {
   $ClassName:"TShiftState",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEvent$1 = $.FMouseEvent = null;
      $.FMouseButtons = 0;
   }
   /// function TShiftState.CheckShiftStateEnum(value: TShiftStateEnum) : Boolean
   ///  [line: 1501, column: 22, file: SmartCL.Components]
   ,CheckShiftStateEnum:function(Self, value$24) {
      var Result = false;
      if (Self.FEvent$1===null) {
         Result = false;
      } else {
         switch (value$24) {
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
   ///  [line: 1529, column: 28, file: SmartCL.Components]
   ,Current:function() {
      var Result = null;
      if (vCurrent===null) {
         vCurrent = TObject.Create($New(TShiftState));
      }
      Result = vCurrent;
      return Result
   }
   /// procedure TShiftState.SetMouseEvent(evt: JMouseEvent)
   ///  [line: 1523, column: 23, file: SmartCL.Components]
   ,SetMouseEvent:function(Self, evt) {
      Self.FEvent$1 = evt;
      Self.FMouseEvent = evt;
   }
   ,Destroy:TObject.Destroy
};
/// TMovementDirection enumeration
///  [line: 218, column: 3, file: SmartCL.Components]
var TMovementDirection = [ "mdVertical", "mdHorizontal", "mdAll", "mdNone" ];
/// TMouseButton enumeration
///  [line: 94, column: 3, file: SmartCL.Components]
var TMouseButton = [ "mbLeft", "mbMiddle", "mbRight" ];
/// TCustomAppContainer = class (TW3TagContainer)
///  [line: 573, column: 3, file: SmartCL.Components]
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
   ,Create$85:TW3TagContainer.Create$85
};
TCustomAppContainer.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TDocumentBody = class (TCustomAppContainer)
///  [line: 581, column: 3, file: SmartCL.Components]
var TDocumentBody = {
   $ClassName:"TDocumentBody",$Parent:TCustomAppContainer
   ,$Init:function ($) {
      TCustomAppContainer.$Init($);
   }
   /// function TDocumentBody.makeElementTagId() : String
   ///  [line: 2884, column: 24, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      return "";
   }
   /// function TDocumentBody.makeElementTagObj() : THandle
   ///  [line: 2901, column: 24, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      return document.body;
   }
   /// procedure TDocumentBody.StyleTagObject()
   ///  [line: 2879, column: 25, file: SmartCL.Components]
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
   ,Create$85:TW3TagContainer.Create$85
};
TDocumentBody.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// EW3TagObj = class (EW3Exception)
///  [line: 73, column: 3, file: SmartCL.Components]
var EW3TagObj = {
   $ClassName:"EW3TagObj",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3TagContainer = class (EW3Exception)
///  [line: 74, column: 3, file: SmartCL.Components]
var EW3TagContainer = {
   $ClassName:"EW3TagContainer",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3CustomControl = class (EW3Exception)
///  [line: 76, column: 3, file: SmartCL.Components]
var EW3CustomControl = {
   $ClassName:"EW3CustomControl",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3ControlBackgroundSize = class (EW3Exception)
///  [line: 629, column: 3, file: SmartCL.Components]
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
   ///  [line: 97, column: 31, file: System.Dictionaries]
   ,Clear$4:function(Self) {
      Self.FLUT$1 = TVariant.CreateObject();
   }
   /// constructor TW3CustomDictionary.Create()
   ///  [line: 84, column: 33, file: System.Dictionaries]
   ,Create$122:function(Self) {
      TObject.Create(Self);
      Self.FLUT$1 = TVariant.CreateObject();
      return Self
   }
   /// procedure TW3CustomDictionary.Delete(const ItemKey: String)
   ///  [line: 193, column: 31, file: System.Dictionaries]
   ,Delete$1:function(Self, ItemKey) {
      if (ItemKey.length>0) {
         try {
            delete (Self.FLUT$1[ItemKey]);
         } catch ($e) {
            var e$29 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.Delete", TObject.ClassName(Self.ClassType), e$29.FMessage]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.Delete", TObject.ClassName(Self.ClassType), "Invalid dictionary key"]);
      }
   }
   /// destructor TW3CustomDictionary.Destroy()
   ///  [line: 90, column: 32, file: System.Dictionaries]
   ,Destroy:function(Self) {
      TW3CustomDictionary.Clear$4(Self);
      Self.FLUT$1 = undefined;
      TObject.Destroy(Self);
   }
   /// function TW3CustomDictionary.GetItem(const ItemKey: String) : Variant
   ///  [line: 157, column: 30, file: System.Dictionaries]
   ,GetItem$12:function(Self, ItemKey$1) {
      var Result = undefined;
      if (ItemKey$1.length>0) {
         try {
            Result = Self.FLUT$1[ItemKey$1]
         } catch ($e) {
            var e$30 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.GetItem", TObject.ClassName(Self.ClassType), e$30.FMessage]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.GetItem", TObject.ClassName(Self.ClassType), "Invalid dictionary key"]);
      }
      return Result
   }
   /// function TW3CustomDictionary.KeyExists(const ItemKey: String) : Boolean
   ///  [line: 145, column: 30, file: System.Dictionaries]
   ,KeyExists:function(Self, ItemKey$2) {
      var Result = false;
      if (ItemKey$2.length>0) {
         Result = (Self.FLUT$1).hasOwnProperty(ItemKey$2);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.KeyExists", TObject.ClassName(Self.ClassType), "Invalid dictionary key"]);
      }
      return Result
   }
   /// procedure TW3CustomDictionary.SetItem(const ItemKey: String; const KeyValue: Variant)
   ///  [line: 175, column: 31, file: System.Dictionaries]
   ,SetItem$3:function(Self, ItemKey$3, KeyValue) {
      if (ItemKey$3.length>0) {
         try {
            Self.FLUT$1[ItemKey$3] = KeyValue;
         } catch ($e) {
            var e$31 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.SetItem", TObject.ClassName(Self.ClassType), e$31.FMessage]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomDictionary.SetItem", TObject.ClassName(Self.ClassType), "Invalid dictionary key"]);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TW3ObjDictionary = class (TW3CustomDictionary)
///  [line: 41, column: 3, file: System.Dictionaries]
var TW3ObjDictionary = {
   $ClassName:"TW3ObjDictionary",$Parent:TW3CustomDictionary
   ,$Init:function ($) {
      TW3CustomDictionary.$Init($);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 44, column: 13, file: System.Dictionaries]
   ,a$76:function(Self, ItemKey$4) {
      return TVariant.AsObject(TW3CustomDictionary.GetItem$12(Self,ItemKey$4));
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 45, column: 13, file: System.Dictionaries]
   ,a$75:function(Self, ItemKey$5, Value$26) {
      TW3CustomDictionary.SetItem$3(Self,ItemKey$5,Value$26);
   }
   ,Destroy:TW3CustomDictionary.Destroy
};
function W3FontDetector() {
   var Result = null;
   if (_FontDetect===null) {
      _FontDetect = TW3FontDetector.Create$117($New(TW3FontDetector));
   }
   Result = _FontDetect;
   return Result
};
/// TW3TextMetric = record
///  [line: 18, column: 3, file: SmartCL.Fonts.Detector]
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
///  [line: 31, column: 3, file: SmartCL.Fonts.Detector]
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
///  [line: 44, column: 3, file: SmartCL.Fonts.Detector]
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
   ///  [line: 119, column: 29, file: SmartCL.Fonts.Detector]
   ,Create$117:function(Self) {
      var x$75 = 0;
      TObject.Create(Self);
      Self.FBaseFonts.push("arial");
      Self.FBaseFonts.push("verdana");
      Self.FBaseFonts.push("times new roman");
      Self.FBaseFonts.push("courier new");
      Self.FBaseFonts.push("ubuntu");
      Self.FBaseFonts.push("monospace");
      Self.FBaseFonts.push("sans-serif");
      Self.FBaseFonts.push("serif");
      Self.Fh = document.body;
      Self.Fs = document.createElement("span");
      Self.Fs.style.fontSize = Self.FtestSize;
      Self.Fs.innerHTML = Self.FTestString;
      Self.FdefaultWidth = TVariant.CreateObject();
      Self.FdefaultHeight = TVariant.CreateObject();
      if (Self.FBaseFonts.length>0) {
         var $temp48;
         for(x$75=0,$temp48=Self.FBaseFonts.length;x$75<$temp48;x$75++) {
            Self.Fs.style.fontFamily = Self.FBaseFonts[x$75];
            Self.Fh.appendChild(Self.Fs);
            Self.FdefaultWidth[Self.FBaseFonts[x$75]] = Self.Fs.offsetWidth;
            Self.FdefaultHeight[Self.FBaseFonts[x$75]] = Self.Fs.offsetHeight;
            Self.Fh.removeChild(Self.Fs);
         }
      }
      return Self
   }
   /// function TW3FontDetector.Detect(const FontName: String) : Boolean
   ///  [line: 184, column: 26, file: SmartCL.Fonts.Detector]
   ,Detect:function(Self, FontName) {
      var Result = false;
      var LFontName = "",
         x$76 = 0;
      LFontName = Trim$_String_(FontName);
      if (LFontName.length>0) {
         if (Self.FBaseFonts.length>0) {
            var $temp49;
            for(x$76=0,$temp49=Self.FBaseFonts.length;x$76<$temp49;x$76++) {
               Self.Fs.style.fontFamily = (LFontName+","+Self.FBaseFonts[x$76]);
               Self.Fh.appendChild(Self.Fs);
               Result = Self.Fs.offsetWidth!=Self.FdefaultWidth[Self.FBaseFonts[x$76]]&&Self.Fs.offsetHeight!=Self.FdefaultHeight[Self.FBaseFonts[x$76]];
               Self.Fh.removeChild(Self.Fs);
               if (Result) {
                  break;
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.GetFontInfo(const Handle: TControlHandle) : TW3FontInfo
   ///  [line: 156, column: 26, file: SmartCL.Fonts.Detector]
   ,GetFontInfo$2:function(Self, Handle$19) {
      var Result = {fiName:"",fiSize:0};
      var LName$1 = "",
         LSize$2 = 0,
         LData$3 = [],
         x$77 = 0;
      Result.fiSize = -1;
      if (Handle$19) {
         LName$1 = w3_GetStyleAsStr(Handle$19,"font-family");
         LSize$2 = w3_GetStyleAsInt(Handle$19,"font-size");
         if (LName$1.length>0) {
            LData$3 = TString.Explode(TString,LName$1,",");
            if (LData$3.length>0) {
               var $temp50;
               for(x$77=0,$temp50=LData$3.length;x$77<$temp50;x$77++) {
                  if (TW3FontDetector.Detect(Self,LData$3[x$77])) {
                     Result.fiName = LData$3[x$77];
                     Result.fiSize = LSize$2;
                     break;
                  }
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(const FontInfo: TW3FontInfo; const FixedWidth: Integer; const Text: String) : TW3TextMetric
   ///  [line: 275, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$5:function(Self, FontInfo, FixedWidth, Text$8) {
      return TW3FontDetector.MeasureText$4(Self,FontInfo.fiName,FontInfo.fiSize,FixedWidth,Text$8);
   }
   /// function TW3FontDetector.MeasureText(const FontName: String; const FontSize: Integer; const FixedWidth: Integer; const Text: String) : TW3TextMetric
   ///  [line: 244, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$4:function(Self, FontName$1, FontSize, FixedWidth$1, Text$9) {
      var Result = {tmWidth:0,tmHeight:0};
      var LText$1 = "",
         LElement$2;
      if (TW3FontDetector.Detect(Self,FontName$1)) {
         LText$1 = Trim$_String_(Text$9);
         if (LText$1.length>0) {
            LElement$2 = document.createElement("p");
            LElement$2.style["font-family"] = FontName$1;
            LElement$2.style["font-size"] = TInteger.ToPxStr(FontSize);
            LElement$2.style["white-space"] = "nowrap";
            LElement$2.style["display"] = "inline-block";
            LElement$2.style["overflow"] = "scroll";
            LElement$2.style["margin"] = "0px";
            LElement$2.style["padding"] = "0px";
            LElement$2.style["border-style"] = "none";
            LElement$2.style["border-width"] = "0px";
            LElement$2.style["max-width"] = TInteger.ToPxStr(FixedWidth$1);
            LElement$2.style["width"] = TInteger.ToPxStr(FixedWidth$1);
            LElement$2.innerHTML = Text$9;
            Self.Fh.appendChild(LElement$2);
            Result.tmWidth = parseInt(LElement$2.scrollWidth,10);
            Result.tmHeight = parseInt(LElement$2.scrollHeight,10);
            Self.Fh.removeChild(LElement$2);
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(const FontName: String; const FontSize: Integer; const Text: String) : TW3TextMetric
   ///  [line: 207, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$3:function(Self, FontName$2, FontSize$1, Text$10) {
      var Result = {tmWidth:0,tmHeight:0};
      var mElement;
      if (TW3FontDetector.Detect(Self,FontName$2)) {
         if (Text$10.length>0) {
            mElement = document.createElement("p");
            mElement.style["font-family"] = FontName$2;
            mElement.style["font-size"] = TInteger.ToPxStr(FontSize$1);
            mElement.style["white-space"] = "nowrap";
            mElement.style["display"] = "inline-block";
            mElement.style["overflow"] = "scroll";
            mElement.style["margin"] = "0px";
            mElement.style["padding"] = "0px";
            mElement.style["border-style"] = "none";
            mElement.style["border-width"] = "0px";
            mElement.style.width = "1px";
            mElement.style.height = "1px";
            mElement.innerHTML = StrReplace(Text$10," ","_");
            Self.Fh.appendChild(mElement);
            Result.tmWidth = parseInt((mElement.scrollWidth+1),10);
            Result.tmHeight = parseInt((mElement.scrollHeight+1),10);
            Self.Fh.removeChild(mElement);
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(const FontInfo: TW3FontInfo; const Text: String) : TW3TextMetric
   ///  [line: 281, column: 26, file: SmartCL.Fonts.Detector]
   ,MeasureText$2:function(Self, FontInfo$1, Text$11) {
      return TW3FontDetector.MeasureText$3(Self,FontInfo$1.fiName,FontInfo$1.fiSize,Text$11);
   }
   ,Destroy:TObject.Destroy
};
/// TW3TextMetrics = record
///  [line: 125, column: 3, file: SmartCL.Graphics]
function Copy$TW3TextMetrics(s,d) {
   return d;
}
function Clone$TW3TextMetrics($) {
   return {

   }
}
/// TW3ImageData = class (TObject)
///  [line: 186, column: 3, file: SmartCL.Graphics]
var TW3ImageData = {
   $ClassName:"TW3ImageData",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomGraphicContext = class (TObject)
///  [line: 37, column: 3, file: SmartCL.Graphics]
var TW3CustomGraphicContext = {
   $ClassName:"TW3CustomGraphicContext",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
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
/// TW3ControlGraphicContext = class (TW3CustomGraphicContext)
///  [line: 63, column: 3, file: SmartCL.Graphics]
var TW3ControlGraphicContext = {
   $ClassName:"TW3ControlGraphicContext",$Parent:TW3CustomGraphicContext
   ,$Init:function ($) {
      TW3CustomGraphicContext.$Init($);
      $.FCtrlTag = undefined;
   }
   /// constructor TW3ControlGraphicContext.Create(const aControlHandle: THandle)
   ///  [line: 984, column: 38, file: SmartCL.Graphics]
   ,Create$98:function(Self, aControlHandle) {
      TObject.Create(Self);
      if (aControlHandle) {
         Self.FCtrlTag = aControlHandle;
      } else {
         throw Exception.Create($New(Exception),"Control handle is invalid error");
      }
      return Self
   }
   /// function TW3ControlGraphicContext.GetDC() : THandle
   ///  [line: 993, column: 35, file: SmartCL.Graphics]
   ,GetDC:function(Self) {
      return Self.FCtrlTag.getContext("2d");
   }
   /// function TW3ControlGraphicContext.GetHandle() : THandle
   ///  [line: 998, column: 35, file: SmartCL.Graphics]
   ,GetHandle$1:function(Self) {
      return Self.FCtrlTag;
   }
   /// function TW3ControlGraphicContext.GetHeight() : Integer
   ///  [line: 1008, column: 35, file: SmartCL.Graphics]
   ,GetHeight$1:function(Self) {
      return w3_getPropertyAsInt(Self.FCtrlTag,"height");
   }
   /// function TW3ControlGraphicContext.GetOwnsReference() : Boolean
   ///  [line: 1013, column: 35, file: SmartCL.Graphics]
   ,GetOwnsReference:function(Self) {
      return false;
   }
   /// function TW3ControlGraphicContext.GetWidth() : Integer
   ///  [line: 1003, column: 35, file: SmartCL.Graphics]
   ,GetWidth$1:function(Self) {
      return w3_getPropertyAsInt(Self.FCtrlTag,"width");
   }
   /// procedure TW3ControlGraphicContext.ReleaseDC()
   ///  [line: 1023, column: 36, file: SmartCL.Graphics]
   ,ReleaseDC:function(Self) {
      /* null */
   }
   /// procedure TW3ControlGraphicContext.SetSize(const NewWidth: Integer; const NewHeight: Integer)
   ///  [line: 1018, column: 36, file: SmartCL.Graphics]
   ,SetSize$3:function(Self, NewWidth$5, NewHeight$5) {
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
///  [line: 171, column: 3, file: SmartCL.Graphics]
var TW3CanvasPattern = {
   $ClassName:"TW3CanvasPattern",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TW3CanvasGradient = class (TObject)
///  [line: 157, column: 3, file: SmartCL.Graphics]
var TW3CanvasGradient = {
   $ClassName:"TW3CanvasGradient",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$6 = undefined;
   }
   /// constructor TW3CanvasGradient.Create(const aHandle: THandle)
   ///  [line: 859, column: 31, file: SmartCL.Graphics]
   ,Create$99:function(Self, aHandle$1) {
      TObject.Create(Self);
      Self.FHandle$6 = aHandle$1;
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3CanvasFont = class (TW3CustomFont)
///  [line: 129, column: 3, file: SmartCL.Graphics]
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
   ///  [line: 449, column: 27, file: SmartCL.Graphics]
   ,Create$100:function(Self, Canvas$1) {
      TObject.Create(Self);
      Self.FParent = Canvas$1;
      if (Self.FParent) {
         TW3CanvasFont.ReadFontInfo(Self);
      } else {
         throw Exception.Create($New(Exception),"Canvas was NIL or unassigned error");
      }
      return Self
   }
   /// function TW3CanvasFont.GetColor() : TColor
   ///  [line: 590, column: 24, file: SmartCL.Graphics]
   ,GetColor$1:function(Self) {
      return Self.FColor$1;
   }
   /// function TW3CanvasFont.GetHandle() : THandle
   ///  [line: 595, column: 24, file: SmartCL.Graphics]
   ,GetHandle$4:function(Self) {
      return null;
   }
   /// function TW3CanvasFont.GetName() : String
   ///  [line: 601, column: 24, file: SmartCL.Graphics]
   ,GetName:function(Self) {
      return Self.FName;
   }
   /// function TW3CanvasFont.GetSize() : Integer
   ///  [line: 606, column: 24, file: SmartCL.Graphics]
   ,GetSize$4:function(Self) {
      return Self.FSize$1;
   }
   /// function TW3CanvasFont.GetStyle() : TW3FontStyle
   ///  [line: 460, column: 24, file: SmartCL.Graphics]
   ,GetStyle:function(Self) {
      return Self.FStyle.slice(0);
   }
   /// function TW3CanvasFont.GetWeight() : String
   ///  [line: 611, column: 24, file: SmartCL.Graphics]
   ,GetWeight:function(Self) {
      return Self.FWeight;
   }
   /// procedure TW3CanvasFont.ReadFontInfo()
   ///  [line: 544, column: 25, file: SmartCL.Graphics]
   ,ReadFontInfo:function(Self) {
      /* null */
   }
   /// procedure TW3CanvasFont.SetColor(aNewColor: TColor)
   ///  [line: 616, column: 25, file: SmartCL.Graphics]
   ,SetColor$2:function(Self, aNewColor$1) {
      Self.FColor$1 = aNewColor$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.SetName(aNewName: String)
   ///  [line: 622, column: 25, file: SmartCL.Graphics]
   ,SetName$1:function(Self, aNewName$1) {
      Self.FName = aNewName$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.SetSize(aNewSize: Integer)
   ///  [line: 628, column: 25, file: SmartCL.Graphics]
   ,SetSize$6:function(Self, aNewSize$1) {
      Self.FSize$1 = aNewSize$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.SetStyle(const NewStyle: TW3FontStyle)
   ///  [line: 465, column: 25, file: SmartCL.Graphics]
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
   ///  [line: 634, column: 25, file: SmartCL.Graphics]
   ,SetWeight:function(Self, aNewWeight$1) {
      Self.FWeight = aNewWeight$1;
      TW3CanvasFont.WriteFontInfo(Self);
   }
   /// procedure TW3CanvasFont.WriteFontInfo()
   ///  [line: 548, column: 25, file: SmartCL.Graphics]
   ,WriteFontInfo:function(Self) {
      var LItems = [],
         a$201 = 0;
      var LItem$7 = "";
      LItems = TString.Explode(TString,TW3Canvas.GetFontStyle(Self.FParent)," ");
      var $temp51;
      for(a$201=0,$temp51=LItems.length;a$201<$temp51;a$201++) {
         LItem$7 = LItems[a$201];
         if (function(v$){return ((v$=="bold")||(v$=="normal")||(v$=="bolder")||(v$=="lighter"))}((LItem$7).toLocaleLowerCase())) {
            Self.FWeight = (LItem$7).toLocaleLowerCase();
         } else if (function(v$){return ((v$=="italic")||(v$=="oblique"))}((LItem$7).toLocaleLowerCase())) {
            /* null */
         } else if (((LItem$7).toLocaleLowerCase().charAt(0)=="#")||((LItem$7).toLocaleLowerCase().substr(0,3)=="rgb")) {
            Self.FColor$1 = StrToColor(LItem$7);
         } else if (StrEndsWith((LItem$7).toLocaleLowerCase(),"px")) {
            Self.FSize$1 = TInteger.FromPxStr(LItem$7);
         } else {
            if (TW3FontDetector.Detect(W3FontDetector(),LItem$7)) {
               Self.FName = LItem$7;
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
///  [line: 227, column: 3, file: SmartCL.Graphics]
var TW3Canvas = {
   $ClassName:"TW3Canvas",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FContext = $.FDC = null;
   }
   /// constructor TW3Canvas.Create(Context: TW3CustomGraphicContext)
   ///  [line: 1155, column: 23, file: SmartCL.Graphics]
   ,Create$101:function(Self, Context$2) {
      TObject.Create(Self);
      Self.FContext = Context$2;
      if (Self.FContext!==null) {
         Self.FDC = TW3CustomGraphicContext.GetDC$(Self.FContext);
      } else {
         throw EW3Exception.CreateFmt($New(EW3Canvas),"%s failed to create canvas, invalid graphics context error",["TW3Canvas.Create"]);
      }
      return Self
   }
   /// function TW3Canvas.GetFontStyle() : String
   ///  [line: 1757, column: 20, file: SmartCL.Graphics]
   ,GetFontStyle:function(Self) {
      return Self.FDC.font;
   }
   /// procedure TW3Canvas.SetFontStyle(const NewFontStyle: String)
   ///  [line: 1762, column: 21, file: SmartCL.Graphics]
   ,SetFontStyle:function(Self, NewFontStyle) {
      Self.FDC.font = NewFontStyle;
   }
   ,Destroy:TObject.Destroy
};
/// EW3Canvas = class (EW3Exception)
///  [line: 226, column: 3, file: SmartCL.Graphics]
var EW3Canvas = {
   $ClassName:"EW3Canvas",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3TagStyle = class (TW3OwnedObject)
///  [line: 24, column: 3, file: SmartCL.Css.Classes]
var TW3TagStyle = {
   $ClassName:"TW3TagStyle",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FCache$1 = [];
      $.FHandle$9 = undefined;
   }
   /// function TW3TagStyle.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 82, column: 22, file: SmartCL.Css.Classes]
   ,AcceptOwner:function(Self, CandidateObject$3) {
      return (CandidateObject$3!==null)&&$Is(CandidateObject$3,TW3CustomControl);
   }
   /// function TW3TagStyle.Add(CssClassName: String) : Integer
   ///  [line: 284, column: 22, file: SmartCL.Css.Classes]
   ,Add$2:function(Self, CssClassName) {
      var Result = 0;
      var LIndex$2 = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$9)) {
         CssClassName = Trim$_String_(CssClassName);
         if (CssClassName.length>0) {
            LIndex$2 = TW3TagStyle.IndexOf$2(Self,CssClassName);
            if (LIndex$2<0) {
               TW3TagStyle.AddClassToControl(Self.ClassType,Self.FHandle$9,CssClassName);
               Self.FCache$1.push(CssClassName);
               Result = Self.FCache$1.length-1;
            } else {
               Result = LIndex$2;
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
   ///  [line: 99, column: 29, file: SmartCL.Css.Classes]
   ,AddClassToControl:function(Self, Handle$20, CssClassName$1) {
      var _qr = ((Handle$20).className.match(new RegExp("(\\s|^)"+CssClassName$1+"(\\s|$)"))) ? true : false;
    if (_qr === false)
      (Handle$20).className += (" " + CssClassName$1);
   }
   /// constructor TW3TagStyle.Create(AOwner: TObject)
   ///  [line: 70, column: 25, file: SmartCL.Css.Classes]
   ,Create$11:function(Self, AOwner$12) {
      TW3OwnedObject.Create$11(Self,AOwner$12);
      Self.FHandle$9 = $As(AOwner$12,TW3CustomControl).FHandle$3;
      return Self
   }
   /// destructor TW3TagStyle.Destroy()
   ///  [line: 76, column: 24, file: SmartCL.Css.Classes]
   ,Destroy:function(Self) {
      Self.FCache$1.length=0;
      TObject.Destroy(Self);
   }
   /// function TW3TagStyle.IndexOf(CssClassName: String) : Integer
   ///  [line: 226, column: 22, file: SmartCL.Css.Classes]
   ,IndexOf$2:function(Self, CssClassName$2) {
      var Result = 0;
      var x$78 = 0;
      Result = -1;
      if (TControlHandleHelper$Valid$2(Self.FHandle$9)) {
         CssClassName$2 = Trim$_String_((CssClassName$2).toLocaleLowerCase());
         if (CssClassName$2.length>0) {
            var $temp52;
            for(x$78=0,$temp52=Self.FCache$1.length;x$78<$temp52;x$78++) {
               if ((Self.FCache$1[x$78]).toLocaleLowerCase()==CssClassName$2) {
                  Result = x$78;
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
   ///  [line: 326, column: 22, file: SmartCL.Css.Classes]
   ,RemoveByName:function(Self, CssClassName$3) {
      var Result = "";
      var LIndex$3 = 0;
      if (TControlHandleHelper$Valid$2(Self.FHandle$9)) {
         CssClassName$3 = Trim$_String_(CssClassName$3);
         if (CssClassName$3.length>0) {
            TW3TagStyle.RemoveClassFromControl(Self.ClassType,Self.FHandle$9,CssClassName$3);
            LIndex$3 = TW3TagStyle.IndexOf$2(Self,CssClassName$3);
            if (LIndex$3>=0) {
               Self.FCache$1.splice(LIndex$3,1)
               ;
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3TagStyle.RemoveByName", TObject.ClassName(Self.ClassType), "style-class was empty error"]);
         }
         Result = CssClassName$3;
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3TagStyle.RemoveByName", TObject.ClassName(Self.ClassType), "invalid owner handle error"]);
      }
      return Result
   }
   /// procedure TW3TagStyle.RemoveClassFromControl(const Handle: TControlHandle; CssClassName: String)
   ///  [line: 115, column: 29, file: SmartCL.Css.Classes]
   ,RemoveClassFromControl:function(Self, Handle$21, CssClassName$4) {
      var reg$1;
      reg$1 = new RegExp("(\\s|^)" + CssClassName$4 + "(\\s|$)");
    (Handle$21).className=(Handle$21).className.replace(reg$1," ").replace('  ',' ').trim();
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3TagStyle.$Intf={
   IW3OwnedObjectAccess:[TW3TagStyle.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// EW3TagStyle = class (EW3Exception)
///  [line: 22, column: 3, file: SmartCL.Css.Classes]
var EW3TagStyle = {
   $ClassName:"EW3TagStyle",$Parent:EW3Exception
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
   ,Update$1:function(Self, EventObject$2) {
      var LProxy = null;
      if (EventObject$2!==null) {
         LProxy = TW3TouchData.GetTouches(Self);
         TW3TouchList.Update(LProxy,EventObject$2.touches);
         LProxy = TW3TouchData.GetChanged(Self);
         TW3TouchList.Update(LProxy,EventObject$2.changedTouches);
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
///  [line: 135, column: 3, file: SmartCL.Borders]
var TW3Borders = {
   $ClassName:"TW3Borders",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FBottom = $.FLeft = $.FRight = $.FTop = null;
   }
   /// function TW3Borders.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 490, column: 21, file: SmartCL.Borders]
   ,AcceptOwner:function(Self, CandidateObject$4) {
      return $Is(CandidateObject$4,TW3TagObj);
   }
   /// constructor TW3Borders.Create(const AOwner: TObject)
   ///  [line: 472, column: 24, file: SmartCL.Borders]
   ,Create$11:function(Self, AOwner$13) {
      TW3OwnedObject.Create$11(Self,AOwner$13);
      Self.FLeft = TW3Border.Create$128($New(TW3Border),Self,0);
      Self.FTop = TW3Border.Create$128($New(TW3Border),Self,1);
      Self.FRight = TW3Border.Create$128($New(TW3Border),Self,2);
      Self.FBottom = TW3Border.Create$128($New(TW3Border),Self,3);
      return Self
   }
   /// destructor TW3Borders.Destroy()
   ///  [line: 481, column: 23, file: SmartCL.Borders]
   ,Destroy:function(Self) {
      TObject.Free(Self.FLeft);
      TObject.Free(Self.FTop);
      TObject.Free(Self.FRight);
      TObject.Free(Self.FBottom);
      TObject.Destroy(Self);
   }
   /// function TW3Borders.GetHSpace() : Integer
   ///  [line: 551, column: 21, file: SmartCL.Borders]
   ,GetHSpace:function(Self) {
      return TW3Border.GetWidth$6(Self.FLeft)+TW3Border.GetPadding(Self.FLeft)+TW3Border.GetWidth$6(Self.FRight)+TW3Border.GetPadding(Self.FRight);
   }
   /// function TW3Borders.GetVSpace() : Integer
   ///  [line: 546, column: 21, file: SmartCL.Borders]
   ,GetVSpace:function(Self) {
      return TW3Border.GetWidth$6(Self.FTop)+TW3Border.GetPadding(Self.FTop)+TW3Border.GetWidth$6(Self.FBottom)+TW3Border.GetPadding(Self.FBottom);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptOwner$:function($){return $.ClassType.AcceptOwner.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
};
TW3Borders.$Intf={
   IW3OwnedObjectAccess:[TW3Borders.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3BorderRadius = class (TW3OwnedObject)
///  [line: 93, column: 3, file: SmartCL.Borders]
var TW3BorderRadius = {
   $ClassName:"TW3BorderRadius",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FBottom$1 = $.FTop$1 = null;
   }
   /// function TW3BorderRadius.AcceptOwner(const CandidateObject: TObject) : Boolean
   ///  [line: 314, column: 26, file: SmartCL.Borders]
   ,AcceptOwner:function(Self, CandidateObject$5) {
      return (CandidateObject$5!==null)&&$Is(CandidateObject$5,TW3TagObj);
   }
   /// constructor TW3BorderRadius.Create(const AOwner: TObject)
   ///  [line: 300, column: 29, file: SmartCL.Borders]
   ,Create$11:function(Self, AOwner$14) {
      TW3OwnedObject.Create$11(Self,AOwner$14);
      Self.FTop$1 = TW3BorderEdgeRadius.Create$127($New(TW3BorderEdgeTopRadius),Self);
      Self.FBottom$1 = TW3BorderEdgeRadius.Create$127($New(TW3BorderEdgeBottomRadius),Self);
      return Self
   }
   /// destructor TW3BorderRadius.Destroy()
   ///  [line: 307, column: 28, file: SmartCL.Borders]
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
///  [line: 57, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeRadius = {
   $ClassName:"TW3BorderEdgeRadius",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// constructor TW3BorderEdgeRadius.Create(const AOwner: TW3BorderRadius)
   ///  [line: 286, column: 33, file: SmartCL.Borders]
   ,Create$127:function(Self, AOwner$15) {
      TW3OwnedObject.Create$11(Self,AOwner$15);
      return Self
   }
   /// function TW3BorderEdgeRadius.GetOwner() : TW3BorderRadius
   ///  [line: 291, column: 30, file: SmartCL.Borders]
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
///  [line: 71, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeTopRadius = {
   $ClassName:"TW3BorderEdgeTopRadius",$Parent:TW3BorderEdgeRadius
   ,$Init:function ($) {
      TW3BorderEdgeRadius.$Init($);
      $.FLeft$1 = $.FRight$1 = 0;
   }
   /// function TW3BorderEdgeTopRadius.GetLeft() : Integer
   ///  [line: 272, column: 33, file: SmartCL.Borders]
   ,GetLeft$1:function(Self) {
      return Self.FLeft$1;
   }
   /// function TW3BorderEdgeTopRadius.GetRight() : Integer
   ///  [line: 277, column: 33, file: SmartCL.Borders]
   ,GetRight:function(Self) {
      return Self.FRight$1;
   }
   /// procedure TW3BorderEdgeTopRadius.SetLeft(const NewRadius: Integer)
   ///  [line: 242, column: 34, file: SmartCL.Borders]
   ,SetLeft$1:function(Self, NewRadius) {
      var LHandle$13 = undefined;
      if (NewRadius!=Self.FLeft$1) {
         Self.FLeft$1 = NewRadius;
         LHandle$13 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$13)) {
            LHandle$13.style["border-top-left-radius"] = TInteger.ToPxStr(NewRadius);
         }
      }
   }
   /// procedure TW3BorderEdgeTopRadius.SetRight(const NewRadius: Integer)
   ///  [line: 257, column: 34, file: SmartCL.Borders]
   ,SetRight:function(Self, NewRadius$1) {
      var LHandle$14 = undefined;
      if (NewRadius$1!=Self.FRight$1) {
         Self.FRight$1 = NewRadius$1;
         LHandle$14 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$14)) {
            LHandle$14.style["border-top-right-radius"] = TInteger.ToPxStr(NewRadius$1);
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
///  [line: 40, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeStyle = [ "besNone", "besSolid", "besDotted", "besDouble", "besGroove", "besInset", "besOutset" ];
/// TW3BorderEdgeBottomRadius = class (TW3BorderEdgeRadius)
///  [line: 82, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeBottomRadius = {
   $ClassName:"TW3BorderEdgeBottomRadius",$Parent:TW3BorderEdgeRadius
   ,$Init:function ($) {
      TW3BorderEdgeRadius.$Init($);
      $.FLeft$2 = $.FRight$2 = 0;
   }
   /// function TW3BorderEdgeBottomRadius.GetLeft() : Integer
   ///  [line: 228, column: 36, file: SmartCL.Borders]
   ,GetLeft$1:function(Self) {
      return Self.FLeft$2;
   }
   /// function TW3BorderEdgeBottomRadius.GetRight() : Integer
   ///  [line: 233, column: 36, file: SmartCL.Borders]
   ,GetRight:function(Self) {
      return Self.FRight$2;
   }
   /// procedure TW3BorderEdgeBottomRadius.SetLeft(const NewRadius: Integer)
   ///  [line: 198, column: 37, file: SmartCL.Borders]
   ,SetLeft$1:function(Self, NewRadius$2) {
      var LHandle$15 = undefined;
      if (NewRadius$2!=Self.FLeft$2) {
         Self.FLeft$2 = NewRadius$2;
         LHandle$15 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$15)) {
            LHandle$15.style["border-bottom-left-radius"] = TInteger.ToPxStr(NewRadius$2);
         }
      }
   }
   /// procedure TW3BorderEdgeBottomRadius.SetRight(const NewRadius: Integer)
   ///  [line: 213, column: 37, file: SmartCL.Borders]
   ,SetRight:function(Self, NewRadius$3) {
      var LHandle$16 = undefined;
      if (NewRadius$3!=Self.FRight$2) {
         Self.FRight$2 = NewRadius$3;
         LHandle$16 = $As(TW3OwnedObject.GetOwner(TW3BorderEdgeRadius.GetOwner$4(Self)),TW3TagObj).FHandle$3;
         if (TControlHandleHelper$Valid$2(LHandle$16)) {
            LHandle$16.style["border-bottom-right-radius"] = TInteger.ToPxStr(NewRadius$3);
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
///  [line: 21, column: 3, file: SmartCL.Borders]
var TW3BorderEdge = [ "beLeft", "beTop", "beRight", "beBottom" ];
/// TW3Border = class (TObject)
///  [line: 106, column: 3, file: SmartCL.Borders]
var TW3Border = {
   $ClassName:"TW3Border",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEdge = 0;
      $.FEdgeName = "";
      $.FOwner$4 = null;
   }
   /// constructor TW3Border.Create(AOwner: TW3Borders; AEdge: TW3BorderEdge)
   ///  [line: 324, column: 23, file: SmartCL.Borders]
   ,Create$128:function(Self, AOwner$16, AEdge) {
      TObject.Create(Self);
      Self.FOwner$4 = AOwner$16;
      Self.FEdge = Self.FEdge;
      Self.FEdgeName = _EdgeNameLUT[AEdge];
      return Self
   }
   /// function TW3Border.GetPadding() : Integer
   ///  [line: 353, column: 20, file: SmartCL.Borders]
   ,GetPadding:function(Self) {
      var Result = 0;
      var LHandle$17 = undefined;
      LHandle$17 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$17)) {
         Result = w3_GetStyleAsInt(LHandle$17,("padding-"+Self.FEdgeName));
      }
      return Result
   }
   /// function TW3Border.GetWidth() : Integer
   ///  [line: 393, column: 20, file: SmartCL.Borders]
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
   /// procedure TW3Border.SetPadding(aValue: Integer)
   ///  [line: 362, column: 21, file: SmartCL.Borders]
   ,SetPadding$1:function(Self, aValue$42) {
      var LHandle$19 = undefined;
      LHandle$19 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (TControlHandleHelper$Valid$2(LHandle$19)) {
         LHandle$19.style["padding-"+Self.FEdgeName] = TInteger.ToPxStr(aValue$42);
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetPadding", TObject.ClassName(Self.ClassType), $R[43]]);
      }
   }
   /// procedure TW3Border.SetWidth(aValue: Integer)
   ///  [line: 403, column: 21, file: SmartCL.Borders]
   ,SetWidth$3:function(Self, aValue$43) {
      var LHandle$20 = undefined;
      LHandle$20 = $As(TW3OwnedObject.GetOwner(Self.FOwner$4),TW3TagObj).FHandle$3;
      if (LHandle$20) {
         LHandle$20.style["border-"+Self.FEdgeName+"-width"] = TInteger.ToPxStr(aValue$43);
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetWidth", TObject.ClassName(Self.ClassType), $R[43]]);
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
      $.FHandle$10 = undefined;
   }
   /// constructor TW3ElementAttributes.Create(const aHandle: TControlHandle)
   ///  [line: 61, column: 34, file: SmartCL.Attributes]
   ,Create$129:function(Self, aHandle$2) {
      TObject.Create(Self);
      if (!TControlHandleHelper$Valid$2(aHandle$2)) {
         throw Exception.Create($New(EW3AttributeError),$R[37]);
      }
      Self.FHandle$10 = aHandle$2;
      return Self
   }
   /// function TW3ElementAttributes.Exists(const Attribute: String) : Boolean
   ///  [line: 70, column: 31, file: SmartCL.Attributes]
   ,Exists$1:function(Self, Attribute) {
      var Result = false;
      var LName$2 = "";
      LName$2 = (Trim$_String_(Attribute)).toLocaleLowerCase();
      if (LName$2.length>0) {
         LName$2 = $R[42]+LName$2;
         try {
            Result = (Self.FHandle$10.hasAttribute(LName$2)?true:false);
         } catch ($e) {
            var e$32 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3AttributeError),$R[40],[e$32.FMessage]);
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
         LName$3 = $R[42]+LName$3;
         if (Self.FHandle$10.hasAttribute(LName$3)) {
            try {
               Result = Self.FHandle$10.getAttribute(LName$3);
            } catch ($e) {
               var e$33 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3AttributeError),$R[38],[e$33.FMessage]);
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
   ,Write$9:function(Self, Attribute$2, Value$27) {
      var LName$4 = "";
      LName$4 = (Trim$_String_(Attribute$2)).toLocaleLowerCase();
      if (LName$4.length>0) {
         LName$4 = $R[42]+LName$4;
         try {
            Self.FHandle$10.setAttribute(LName$4,Value$27);
         } catch ($e) {
            var e$34 = $W($e);
            throw EW3Exception.CreateFmt($New(EW3AttributeError),$R[39],[e$34.FMessage]);
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
/// TW3CustomAsset = class (TW3OwnedObject)
///  [line: 58, column: 3, file: SmartCL.Assets]
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
      $.FState = 0;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 79, column: 43, file: SmartCL.Assets]
   ,a$135:function(Self) {
      return $As(TW3OwnedObject.GetOwner(Self),TW3AssetManager);
   }
   /// procedure TW3CustomAsset.AfterAssetIO()
   ///  [line: 341, column: 26, file: SmartCL.Assets]
   ,AfterAssetIO:function(Self) {
      switch (Self.FState) {
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
   ///  [line: 332, column: 26, file: SmartCL.Assets]
   ,BeforeAssetIO:function(Self) {
      if (Self.OnBeforeIO) {
         Self.OnBeforeIO(Self);
      }
   }
   /// procedure TW3CustomAsset.Cancel()
   ///  [line: 378, column: 26, file: SmartCL.Assets]
   ,Cancel:function(Self) {
      if (Self.FState==1) {
         Self.FCanceled = true;
      }
   }
   /// constructor TW3CustomAsset.Create(const AOwner: TW3AssetManager)
   ///  [line: 207, column: 28, file: SmartCL.Assets]
   ,Create$143:function(Self, AOwner$17) {
      TW3OwnedObject.Create$11(Self,AOwner$17);
      Self.FIdentifier = TDatatype.CreateGUID(TDatatype);
      Self.FState = 0;
      Self.FCanceled = false;
      return Self
   }
   /// destructor TW3CustomAsset.Destroy()
   ///  [line: 215, column: 27, file: SmartCL.Assets]
   ,Destroy:function(Self) {
      TW3CustomAsset.ResetData(Self);
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomAsset.Execute()
   ///  [line: 251, column: 26, file: SmartCL.Assets]
   ,Execute$3:function(Self) {
      if ((1<<Self.FState&9)!=0) {
         if (Self.FState==3) {
            TW3CustomAsset.ResetData(Self);
         }
         TW3CustomAsset.SetState(Self,1);
         TW3CustomAsset.BeforeAssetIO(Self);
         TW3CustomAsset.PerformIO$(Self,Self.URI,function (Asset, Buffer$6) {
            var LAccess = null;
            TW3CustomAsset.SetState(Self,2);
            if (Self.FCanceled) {
               TW3CustomAsset.ResetData(Self);
               Self.FCanceled = false;
               return;
            }
            Self.Data = Buffer$6;
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
   ///  [line: 363, column: 26, file: SmartCL.Assets]
   ,FailedAssetIO:function(Self) {
      /* null */
   }
   /// function TW3CustomAsset.ManagerAccess() : IW3AssetManagerAccess
   ///  [line: 234, column: 25, file: SmartCL.Assets]
   ,ManagerAccess:function(Self) {
      var Result = null;
      if (TW3CustomAsset.a$135(Self)) {
         try {
            Result = $AsIntf(TW3CustomAsset.a$135(Self),"IW3AssetManagerAccess");
         } catch ($e) {
            var e$35 = $W($e);
            /* null */
         }
      }
      return Result
   }
   /// procedure TW3CustomAsset.PerformIO(const ThisURI: String; OnReady: TW3AssetReadyEvent; OnFailed: TW3AssetIOFailureEvent)
   ///  [line: 407, column: 26, file: SmartCL.Assets]
   ,PerformIO:function(Self, ThisURI, OnReady$4, OnFailed) {
      if (Trim$_String_(ThisURI).length>0) {
         Self.URI = ThisURI;
      }
   }
   /// procedure TW3CustomAsset.ResetData()
   ///  [line: 389, column: 26, file: SmartCL.Assets]
   ,ResetData:function(Self) {
      if (Self.FState==1) {
         TW3CustomAsset.Cancel(Self);
      }
      try {
         TW3CustomAsset.SetState(Self,0);
      } finally {
         Self.Data = null;
      }
   }
   /// procedure TW3CustomAsset.SetIdentifier(const NewIdentifier: String)
   ///  [line: 226, column: 26, file: SmartCL.Assets]
   ,SetIdentifier:function(Self, NewIdentifier) {
      Self.FIdentifier = NewIdentifier;
   }
   /// procedure TW3CustomAsset.SetState(const NewState: TW3AssetState)
   ///  [line: 370, column: 26, file: SmartCL.Assets]
   ,SetState:function(Self, NewState) {
      Self.FState = NewState;
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
///  [line: 111, column: 3, file: SmartCL.Assets]
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
///  [line: 105, column: 3, file: SmartCL.Assets]
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
///  [line: 98, column: 3, file: SmartCL.Assets]
var TW3GraphicAsset = {
   $ClassName:"TW3GraphicAsset",$Parent:TW3CustomAsset
   ,$Init:function ($) {
      TW3CustomAsset.$Init($);
   }
   /// procedure TW3GraphicAsset.PerformIO(const ThisURI: String; OnReady: TW3AssetReadyEvent; OnFailed: TW3AssetIOFailureEvent)
   ///  [line: 170, column: 27, file: SmartCL.Assets]
   ,PerformIO:function(Self, ThisURI$1, OnReady$5, OnFailed$1) {
      TW3CustomAsset.PerformIO(Self,ThisURI$1,OnReady$5,OnFailed$1);
      WriteLnF("%s.%s called for %s",[TObject.ClassName(Self.ClassType), "TW3GraphicAsset.PerformIO", ThisURI$1]);
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
///  [line: 114, column: 3, file: SmartCL.Assets]
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
///  [line: 108, column: 3, file: SmartCL.Assets]
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
///  [line: 41, column: 3, file: SmartCL.Assets]
var TW3AssetState = [ "asIdle", "asLoading", "asReady", "asError" ];
/// TW3AssetManagerState enumeration
///  [line: 42, column: 3, file: SmartCL.Assets]
var TW3AssetManagerState = [ "msIdle", "msLoading", "msReady", "msError" ];
/// TW3AssetManager = class (TObject)
///  [line: 117, column: 3, file: SmartCL.Assets]
var TW3AssetManager = {
   $ClassName:"TW3AssetManager",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnAssetReady = null;
      $.OnFinished = null;
      $.FAssets = [];
      $.FDone = $.FFailed = 0;
      $.FStack = [];
      $.FState$1 = 0;
   }
   /// procedure TW3AssetManager.AssetFailed(const Asset: TW3CustomAsset)
   ///  [line: 471, column: 27, file: SmartCL.Assets]
   ,AssetFailed:function(Self, Asset$2) {
      ++Self.FDone;
      ++Self.FFailed;
      if (Self.FDone>=Self.FAssets.length) {
         if (Self.FState$1==1) {
            Self.FState$1 = 3;
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
   /// procedure TW3AssetManager.AssetReady(const Asset: TW3CustomAsset)
   ///  [line: 436, column: 27, file: SmartCL.Assets]
   ,AssetReady:function(Self, Asset$3) {
      if (Self.OnAssetReady) {
         Self.OnAssetReady(Self,Asset$3);
      }
      ++Self.FDone;
      if (Self.FDone>=Self.FAssets.length) {
         if (Self.FState$1==1) {
            Self.FState$1 = 2;
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
            var LItem$9 = null;
            LItem$9 = Self.FStack.pop();
            WriteLn(("Loading .. "+LItem$9.URI));
            TW3CustomAsset.ResetData(LItem$9);
            TW3CustomAsset.Execute$3(LItem$9);
         },50);
      }
   }
   /// procedure TW3AssetManager.Cancel()
   ///  [line: 555, column: 27, file: SmartCL.Assets]
   ,Cancel$1:function(Self) {
      var a$202 = 0;
      var LItem$10 = null;
      if ((1<<Self.FState$1&10)!=0) {
         var a$203 = [];
         a$203 = Self.FAssets;
         var $temp53;
         for(a$202=0,$temp53=a$203.length;a$202<$temp53;a$202++) {
            LItem$10 = a$203[a$202];
            if (LItem$10.FState==1) {
               TW3CustomAsset.Cancel(LItem$10);
            }
         }
      }
   }
   /// constructor TW3AssetManager.Create()
   ///  [line: 423, column: 29, file: SmartCL.Assets]
   ,Create$144:function(Self) {
      TObject.Create(Self);
      Self.FState$1 = 0;
      return Self
   }
   /// destructor TW3AssetManager.Destroy()
   ///  [line: 429, column: 28, file: SmartCL.Assets]
   ,Destroy:function(Self) {
      if (!((1<<Self.FState$1&5)!=0)) {
         TW3AssetManager.Cancel$1(Self);
      }
      TObject.Destroy(Self);
   }
   /// function TW3AssetManager.GetAssetById(const AssetId: String) : TW3CustomAsset
   ///  [line: 663, column: 26, file: SmartCL.Assets]
   ,GetAssetById:function(Self, AssetId) {
      var Result = null;
      var a$204 = 0;
      var LAsset = null;
      var a$205 = [];
      a$205 = Self.FAssets;
      var $temp54;
      for(a$204=0,$temp54=a$205.length;a$204<$temp54;a$204++) {
         LAsset = a$205[a$204];
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
/// TW3CustomAnimation = class (TObject)
///  [line: 31, column: 3, file: SmartCL.Effects]
var TW3CustomAnimation = {
   $ClassName:"TW3CustomAnimation",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnAnimationEnds = null;
      $.OnAnimationBegins = null;
      $.FBusy = false;
      $.FDuration = 0;
      $.FIdent = $.FInnerName = "";
      $.FInnerHandle = undefined;
      $.FTarget = null;
   }
   /// procedure TW3CustomAnimation.CBBegins()
   ///  [line: 1447, column: 30, file: SmartCL.Effects]
   ,CBBegins:function(Self) {
      if (Self.OnAnimationBegins) {
         Self.OnAnimationBegins(Self);
      }
   }
   /// procedure TW3CustomAnimation.CBEnds(const EventObject: Variant)
   ///  [line: 1453, column: 30, file: SmartCL.Effects]
   ,CBEnds:function(Self, EventObject$3) {
      if (Self!==null) {
         if (EventObject$3.target==Self.FInnerHandle) {
            if (Self.FBusy) {
               try {
                  EventObject$3.stopPropagation();
                  TW3CustomAnimation.FinalizeTransition$(Self);
                  if (Self.OnAnimationEnds) {
                     Self.OnAnimationEnds(Self);
                  }
               } catch ($e) {
                  var e$36 = $W($e);
                  /* null */
               }
            } else {
               EventObject$3.stopPropagation();
            }
         }
      }
   }
   /// constructor TW3CustomAnimation.Create()
   ///  [line: 1419, column: 32, file: SmartCL.Effects]
   ,Create$133:function(Self) {
      TObject.Create(Self);
      Self.FDuration = DefaultDuration;
      Self.FIdent = TW3CustomAnimation.MakeUniqueInstanceId(Self.ClassType);
      return Self
   }
   /// destructor TW3CustomAnimation.Destroy()
   ///  [line: 1426, column: 31, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      if (Self.FBusy&&(Self.FTarget!==null)) {
         try {
            TW3CustomAnimation.FinalizeTransition$(Self);
         } catch ($e) {
            var e$37 = $W($e);
            /* null */
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomAnimation.Execute(TargetObj: TW3TagObj)
   ///  [line: 1517, column: 30, file: SmartCL.Effects]
   ,Execute$1:function(Self, TargetObj) {
      if (!TargetObj) {
         throw Exception.Create($New(Exception),"Target-object was NIL error");
      }
      if (Self.FBusy) {
         throw Exception.Create($New(Exception),"Transition is already in progress error");
      } else {
         Self.FTarget = TargetObj;
         TW3CustomAnimation.SetupTransition$(Self);
      }
   }
   /// procedure TW3CustomAnimation.ExecuteEx(TargetObj: TW3TagObj; BeginHandler: TFxAnimationBeginsEvent; EndHandler: TFxAnimationEndsEvent)
   ///  [line: 1530, column: 30, file: SmartCL.Effects]
   ,ExecuteEx:function(Self, TargetObj$1, BeginHandler, EndHandler) {
      if (!TargetObj$1) {
         throw Exception.Create($New(Exception),"Target-object was NIL error");
      }
      if (Self.FBusy) {
         throw Exception.Create($New(Exception),"Transition is already in progress error");
      } else {
         Self.FTarget = TargetObj$1;
         Self.OnAnimationBegins = BeginHandler;
         Self.OnAnimationEnds = EndHandler;
         TW3CustomAnimation.SetupTransition$(Self);
      }
   }
   /// procedure TW3CustomAnimation.FinalizeTransition()
   ///  [line: 1508, column: 30, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      TW3DOMEventAPI.UnRegisterEvent(Self.FInnerHandle,Self.FInnerName,$Event1(Self,TW3CustomAnimation.CBEnds),0);
      Self.FBusy = false;
   }
   /// function TW3CustomAnimation.MakeUniqueInstanceId() : String
   ///  [line: 1441, column: 35, file: SmartCL.Effects]
   ,MakeUniqueInstanceId:function(Self) {
      var Result = "";
      ++__AnimID;
      Result = "Anim_no"+__AnimID.toString();
      return Result
   }
   /// procedure TW3CustomAnimation.SetDuration(Value: Float)
   ///  [line: 1477, column: 30, file: SmartCL.Effects]
   ,SetDuration:function(Self, Value$28) {
      if (Self.FBusy) {
         throw Exception.Create($New(Exception),"Duration cannot be altered while the transition is active error");
      } else {
         Self.FDuration = Value$28;
      }
   }
   /// procedure TW3CustomAnimation.SetupTransition()
   ///  [line: 1484, column: 30, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      Self.FBusy = true;
      if ($Is(BrowserAPI(),TW3FirefoxBrowserAPI)) {
         Self.FTarget.FHandle$3.style["animation-iteration-count"] = 1;
         Self.FInnerName = "animationend";
      } else {
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"animation-iteration-count")] = 1;
         Self.FInnerName = TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationEnd");
      }
      Self.FInnerHandle = Self.FTarget.FHandle$3;
      TW3DOMEventAPI.RegisterEvent(Self.FInnerHandle,Self.FInnerName,$Event1(Self,TW3CustomAnimation.CBEnds),0);
      TW3CustomAnimation.CBBegins(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$133$:function($){return $.ClassType.Create$133($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3TransitionAnimation = class (TW3CustomAnimation)
///  [line: 99, column: 3, file: SmartCL.Effects]
var TW3TransitionAnimation = {
   $ClassName:"TW3TransitionAnimation",$Parent:TW3CustomAnimation
   ,$Init:function ($) {
      TW3CustomAnimation.$Init($);
      $.Sticky = $.Alternate = $.FStyleSetup = false;
      $.FAnimationCmd = "";
      $.FStyleDOM = undefined;
      $.FTiming = 0;
   }
   /// constructor TW3TransitionAnimation.Create()
   ///  [line: 1172, column: 36, file: SmartCL.Effects]
   ,Create$133:function(Self) {
      TW3CustomAnimation.Create$133(Self);
      Self.FTiming = DefaultTiming;
      Self.Sticky = false;
      return Self
   }
   /// destructor TW3TransitionAnimation.Destroy()
   ///  [line: 1179, column: 35, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      TW3TransitionAnimation.InvalidateKeyFrames(Self);
      TW3CustomAnimation.Destroy(Self);
   }
   /// procedure TW3TransitionAnimation.FinalizeTransition()
   ///  [line: 1229, column: 34, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      var style$9;
      style$9 = Self.FTarget.FHandle$3.style;
      style$9[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = "none";
      style$9[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "";
      if (!Self.Sticky) {
         style$9.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation"));
         style$9.removeProperty(TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode"));
         Self.FAnimationCmd = "";
      }
      TW3CustomAnimation.FinalizeTransition(Self);
   }
   /// procedure TW3TransitionAnimation.InvalidateKeyFrames()
   ///  [line: 1202, column: 34, file: SmartCL.Effects]
   ,InvalidateKeyFrames:function(Self) {
      if (Self.FStyleSetup) {
         Self.FStyleDOM.parentNode.removeChild(Self.FStyleDOM);
         Self.FStyleDOM = null;
         Self.FStyleSetup = false;
      }
   }
   /// function TW3TransitionAnimation.KeyFramesName() : String
   ///  [line: 1244, column: 33, file: SmartCL.Effects]
   ,KeyFramesName:function(Self) {
      return Self.FIdent;
   }
   /// procedure TW3TransitionAnimation.SetupKeyFrames()
   ///  [line: 1185, column: 34, file: SmartCL.Effects]
   ,SetupKeyFrames:function(Self) {
      var document$2 = undefined,
         css = "";
      Self.FStyleSetup = true;
      document$2 = document;
      Self.FStyleDOM = document$2.createElement("style");
      Self.FStyleDOM.type = "text\/css";
      css = "keyframes "+TW3TransitionAnimation.KeyFramesName(Self)+" {"+TW3TransitionAnimation.KeyFramesCSS$(Self)+"}";
      Self.FStyleDOM.appendChild(document$2.createTextNode("@"+TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"")+css));
      Self.FStyleDOM.appendChild(document$2.createTextNode("@"+css));
      document$2.getElementsByTagName("head")[0].appendChild(Self.FStyleDOM);
   }
   /// procedure TW3TransitionAnimation.SetupTransition()
   ///  [line: 1212, column: 34, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var style$10;
      TW3CustomAnimation.SetupTransition(Self);
      if (!Self.FStyleSetup) {
         TW3TransitionAnimation.SetupKeyFrames(Self);
      }
      style$10 = Self.FTarget.FHandle$3.style;
      Self.FAnimationCmd = TW3TransitionAnimation.KeyFramesName(Self)+" "+FloatToStr$_Float_(Self.FDuration)+"s "+cW3AnimationTiming[Self.FTiming];
      if (Self.Alternate) {
         Self.FAnimationCmd+=" alternate";
      }
      style$10[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = Self.FAnimationCmd;
      style$10[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "both";
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$133$:function($){return $.ClassType.Create$133($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3ZoomOutTransition = class (TW3TransitionAnimation)
///  [line: 138, column: 4, file: SmartCL.Effects]
var TW3ZoomOutTransition = {
   $ClassName:"TW3ZoomOutTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3ZoomOutTransition.KeyFramesCSS() : String
   ///  [line: 1324, column: 31, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   $1: scale(1.0);\r\n   $2: 50% 50%;\r\n}\r\n50% {\r\n   opacity: 0.3;\r\n   $3: scale(0.5);\r\n}\r\n100% {\r\n   opacity: 0.0;\r\n   $5: scale(0);\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$4",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3ZoomInTransition = class (TW3TransitionAnimation)
///  [line: 133, column: 4, file: SmartCL.Effects]
var TW3ZoomInTransition = {
   $ClassName:"TW3ZoomInTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3ZoomInTransition.KeyFramesCSS() : String
   ///  [line: 1298, column: 30, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 0.0;\r\n   $1: scale(0);\r\n}\r\n50% {\r\n   opacity: 0.3;\r\n   $2: scale(0.5);\r\n}\r\n100% {\r\n   $3: scale(1.0);\r\n   $4: 50% 50%;\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$4",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3WarpOutTransition = class (TW3TransitionAnimation)
///  [line: 128, column: 4, file: SmartCL.Effects]
var TW3WarpOutTransition = {
   $ClassName:"TW3WarpOutTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3WarpOutTransition.KeyFramesCSS() : String
   ///  [line: 1276, column: 31, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 1.0;\r\n   $1: scale(1);\r\n}\r\n100% {\r\n   opacity: 0;\r\n   $2: scale(5);\r\n   $3: 50% 50%;\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3WarpInTransition = class (TW3TransitionAnimation)
///  [line: 123, column: 4, file: SmartCL.Effects]
var TW3WarpInTransition = {
   $ClassName:"TW3WarpInTransition",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
   }
   /// function TW3WarpInTransition.KeyFramesCSS() : String
   ///  [line: 1253, column: 30, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      var Result = "";
      Result = "0% {\r\n   opacity: 0;\r\n   $1: scale(5);\r\n   $2: 50% 50%;\r\n}\r\n100% {\r\n   opacity: 1.0;\r\n   $3: scale(1);\r\n}";
      Result = StrReplace(Result,"$1",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      Result = StrReplace(Result,"$2",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform-origin"));
      Result = StrReplace(Result,"$3",TW3CustomBrowserAPI.PrefixDef(BrowserAPI(),"transform"));
      return Result
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3SizeAnimation = class (TW3TransitionAnimation)
///  [line: 184, column: 3, file: SmartCL.Effects]
var TW3SizeAnimation = {
   $ClassName:"TW3SizeAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.ToTop = $.ToLeft = $.ToHeight = $.ToWidth = $.FromHeight = $.FromLeft = $.FromTop = $.FromWidth = 0;
   }
   /// function TW3SizeAnimation.KeyFramesCSS() : String
   ///  [line: 1150, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return ("from {\r\n  left: "+Self.FromLeft.toString()+"px;\r\n  top:  "+Self.FromTop.toString()+"px;\r\n  width: "+Self.FromWidth.toString()+"px;\r\n  height: "+Self.FromHeight.toString()+"px;\r\n} to {\r\n  left: "+Self.ToLeft.toString()+"px;\r\n  top:  "+Self.ToTop.toString()+"px;\r\n  width: "+Self.ToWidth.toString()+"px;\r\n  height: "+Self.ToHeight.toString()+"px;\r\n}");
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3ScaleAnimation = class (TW3TransitionAnimation)
///  [line: 198, column: 3, file: SmartCL.Effects]
var TW3ScaleAnimation = {
   $ClassName:"TW3ScaleAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.FFrom = undefined;
      $.FTo = undefined;
   }
   /// function TW3ScaleAnimation.KeyFramesCSS() : String
   ///  [line: 1140, column: 28, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return "0% { transform: scale("+FloatToStr$_Float_(Number(Self.FFrom))+"); }"+"100% { transform: scale("+FloatToStr$_Float_(Number(Self.FTo))+"); }";
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3NamedAnimation = class (TW3CustomAnimation)
///  [line: 74, column: 3, file: SmartCL.Effects]
var TW3NamedAnimation = {
   $ClassName:"TW3NamedAnimation",$Parent:TW3CustomAnimation
   ,$Init:function ($) {
      TW3CustomAnimation.$Init($);
      $.FName$2 = "";
   }
   /// procedure TW3NamedAnimation.SetupTransition()
   ///  [line: 1350, column: 29, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var mCommand = "";
      TW3CustomAnimation.SetupTransition(Self);
      w3_SetStyle(Self.FTarget.FHandle$3,TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode"),"both");
      mCommand = Self.FName$2+" "+FloatToStr$_Float_(Self.FDuration)+"s linear";
      w3_SetStyle(Self.FTarget.FHandle$3,TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation"),mCommand);
   }
   /// procedure TW3NamedAnimation.FinalizeTransition()
   ///  [line: 1360, column: 29, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      TW3CustomAnimation.FinalizeTransition(Self);
      if (Self.FTarget!==null) {
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Animation")] = "none";
         Self.FTarget.FHandle$3.style[TW3CustomBrowserAPI.Prefix(BrowserAPI(),"AnimationFillMode")] = "none";
      }
   }
   ,Destroy:TW3CustomAnimation.Destroy
   ,Create$133:TW3CustomAnimation.Create$133
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3MoveAnimation = class (TW3TransitionAnimation)
///  [line: 143, column: 4, file: SmartCL.Effects]
var TW3MoveAnimation = {
   $ClassName:"TW3MoveAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.FFromX = $.FFromY = $.FToX = $.FToY = 0;
   }
   /// function TW3MoveAnimation.KeyFramesCSS() : String
   ///  [line: 1110, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return ("from {\r\n  left: "+Self.FFromX.toString()+"px;\r\n  top:  "+Self.FFromY.toString()+"px;\r\n} to {\r\n  left: "+Self.FToX.toString()+"px;\r\n  top: "+Self.FToY.toString()+"px;\r\n}");
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3FadeAnimation = class (TW3TransitionAnimation)
///  [line: 157, column: 3, file: SmartCL.Effects]
var TW3FadeAnimation = {
   $ClassName:"TW3FadeAnimation",$Parent:TW3TransitionAnimation
   ,$Init:function ($) {
      TW3TransitionAnimation.$Init($);
      $.FFrom$1 = $.FTo$1 = 0;
   }
   /// function TW3FadeAnimation.KeyFramesCSS() : String
   ///  [line: 1127, column: 27, file: SmartCL.Effects]
   ,KeyFramesCSS:function(Self) {
      return "0% { opacity: "+FloatToStr$_Float_(Self.FFrom$1)+"; }"+"100% { opacity: "+FloatToStr$_Float_(Self.FTo$1)+"; }";
   }
   ,Destroy:TW3TransitionAnimation.Destroy
   ,Create$133:TW3TransitionAnimation.Create$133
   ,FinalizeTransition:TW3TransitionAnimation.FinalizeTransition
   ,SetupTransition:TW3TransitionAnimation.SetupTransition
   ,KeyFramesCSS$:function($){return $.ClassType.KeyFramesCSS($)}
};
/// TW3AnimationTiming enumeration
///  [line: 97, column: 3, file: SmartCL.Effects]
var TW3AnimationTiming = [ "atEase", "atLinear", "atEaseIn", "atEaseOut", "atEaseInOut" ];
/// TW3SystemEventHandler = class (TW3OwnedObject)
///  [line: 39, column: 3, file: system.events]
var TW3SystemEventHandler = {
   $ClassName:"TW3SystemEventHandler",$Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.OnEvent = null;
      $.FAttached = false;
      $.FEventName = "";
   }
   /// procedure TW3SystemEventHandler.Attach(NameOfEvent: String)
   ///  [line: 78, column: 33, file: system.events]
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
            var e$38 = $W($e);
            Self.FEventName = "";
            throw EW3Exception.CreateFmt($New(EW3SystemEventError),"Failed to detach event, system threw exception %s with message [%s] error",[TObject.ClassName(e$38.ClassType), e$38.FMessage]);
         }
      } else {
         throw Exception.Create($New(Exception),"Failed to attach event, invalid event-name error");
      }
   }
   /// destructor TW3SystemEventHandler.Destroy()
   ///  [line: 65, column: 34, file: system.events]
   ,Destroy:function(Self) {
      if (Self.FAttached) {
         try {
            TW3SystemEventHandler.Detach(Self);
         } catch ($e) {
            var e$39 = $W($e);
            /* null */
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3SystemEventHandler.Detach()
   ///  [line: 108, column: 33, file: system.events]
   ,Detach:function(Self) {
      if (Self.FAttached) {
         try {
            try {
               TW3SystemEventHandler.DoDetach$(Self);
            } catch ($e) {
               var e$40 = $W($e);
               throw EW3Exception.CreateFmt($New(EW3SystemEventError),"Failed to detach event, system threw exception %s with message [%s] error",[TObject.ClassName(e$40.ClassType), e$40.FMessage]);
            }
         } finally {
            Self.FEventName = "";
         }
      } else {
         throw Exception.Create($New(EW3SystemEventError),"Failed to detach event, not attached error");
      }
   }
   /// procedure TW3SystemEventHandler.DoHandleEvent(const EventObj: Variant)
   ///  [line: 133, column: 33, file: system.events]
   ,DoHandleEvent:function(Self, EventObj$4) {
      if (Self.OnEvent) {
         Self.OnEvent(Self,EventObj$4);
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
///  [line: 37, column: 3, file: system.events]
var EW3SystemEventError = {
   $ClassName:"EW3SystemEventError",$Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3CustomForm = class (TW3CustomControl)
///  [line: 20, column: 3, file: SmartCL.Forms]
var TW3CustomForm = {
   $ClassName:"TW3CustomForm",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption = "";
      $.FInitialized$1 = false;
   }
   /// constructor TW3CustomForm.Create(AOwner: TW3TagContainer)
   ///  [line: 57, column: 27, file: SmartCL.Forms]
   ,Create$85:function(Self, AOwner$18) {
      TW3TagContainer.Create$85(Self,AOwner$18);
      TApplicationFormsList.RegisterFormInstance$1(Forms$2(),$AsClass(TObject.ClassType(Self.ClassType),TW3CustomForm),Self);
      return Self
   }
   /// destructor TW3CustomForm.Destroy()
   ///  [line: 63, column: 26, file: SmartCL.Forms]
   ,Destroy:function(Self) {
      TW3CustomApplication.UnRegisterFormInstance(Application(),Self);
      TApplicationFormsList.UnregisterFormInstance(Forms$2(),Self);
   }
   /// procedure TW3CustomForm.FormActivated()
   ///  [line: 126, column: 25, file: SmartCL.Forms]
   ,FormActivated:function(Self) {
      if (!Self.FInitialized$1) {
         Self.FInitialized$1 = true;
         TW3CustomForm.InitializeForm$(Self);
         TW3CustomControl.LayoutChildren(Self);
      }
   }
   /// procedure TW3CustomForm.FormDeactivated()
   ///  [line: 158, column: 25, file: SmartCL.Forms]
   ,FormDeactivated:function(Self) {
      /* null */
   }
   /// function TW3CustomForm.GetCaption() : String
   ///  [line: 121, column: 24, file: SmartCL.Forms]
   ,GetCaption:function(Self) {
      return Self.FCaption;
   }
   /// procedure TW3CustomForm.InitializeForm()
   ///  [line: 112, column: 25, file: SmartCL.Forms]
   ,InitializeForm:function(Self) {
      /* null */
   }
   /// procedure TW3CustomForm.InitializeObject()
   ///  [line: 101, column: 25, file: SmartCL.Forms]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FTransparentEvents = false;
      Self.FHandle$3.style.width = "0px";
      Self.FHandle$3.style.height = "0px";
      Self.FHandle$3.style.left = "0px";
      Self.FHandle$3.style.top = "0px";
   }
   /// procedure TW3CustomForm.SetCaption(const NewCaption: String)
   ///  [line: 116, column: 25, file: SmartCL.Forms]
   ,SetCaption:function(Self, NewCaption) {
      Self.FCaption = NewCaption;
   }
   /// procedure TW3CustomForm.StyleTagObject()
   ///  [line: 69, column: 25, file: SmartCL.Forms]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
      w3_SetStyle(Self.FHandle$3,TW3CustomBrowserAPI.Prefix(BrowserAPI(),"Transform"),"none");
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
   ,Create$85$:function($){return $.ClassType.Create$85.apply($.ClassType, arguments)}
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
TW3CustomForm.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Form = class (TW3CustomForm)
///  [line: 44, column: 3, file: SmartCL.Forms]
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
   ,Create$85:TW3CustomForm.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,InitializeForm:TW3CustomForm.InitializeForm
};
TW3Form.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3AlertResult enumeration
///  [line: 22, column: 3, file: SmartCL.Dialogs]
var TW3AlertResult = [ "roYes", "roNo", "roOK", "roCancel" ];
/// TW3AlertOptions enumeration
///  [line: 21, column: 3, file: SmartCL.Dialogs]
var TW3AlertOptions = [ "aoYes", "aoNo", "aoYesNo", "aoOK", "aoCancel", "aoOKCancel" ];
/// TW3AlertDialog = class (TW3CustomControl)
///  [line: 33, column: 3, file: SmartCL.Dialogs]
var TW3AlertDialog = {
   $ClassName:"TW3AlertDialog",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FNo = $.FOnSelect = $.FText = $.FTitle = $.FYes = null;
      $.FOptions$6 = 0;
      $.FReady = false;
   }
   /// procedure TW3AlertDialog.FinalizeObject()
   ///  [line: 82, column: 26, file: SmartCL.Dialogs]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FTitle);
      TObject.Free(Self.FText);
      TObject.Free(Self.FYes);
      TObject.Free(Self.FNo);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3AlertDialog.HandleNoClick(Sender: TObject)
   ///  [line: 107, column: 26, file: SmartCL.Dialogs]
   ,HandleNoClick:function(Self, Sender$8) {
      if (Self.FOnSelect) {
         switch (Self.FOptions$6) {
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
   ///  [line: 96, column: 26, file: SmartCL.Dialogs]
   ,HandleYesClick:function(Self, Sender$9) {
      if (Self.FOnSelect) {
         switch (Self.FOptions$6) {
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
   ///  [line: 63, column: 26, file: SmartCL.Dialogs]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FYes = TW3TagContainer.Create$85$($New(TW3AlertButton),Self);
      TW3MovableControl.SetSize$2(Self.FYes,120,42);
      TW3Button.SetCaption$1(Self.FYes,"OK");
      TW3CustomControl._setMouseClick(Self.FYes,$Event1(Self,TW3AlertDialog.HandleYesClick));
      TW3MovableControl.SetVisible(Self.FYes,false);
      Self.FNo = TW3TagContainer.Create$85$($New(TW3AlertButton),Self);
      TW3MovableControl.SetSize$2(Self.FNo,120,42);
      TW3Button.SetCaption$1(Self.FNo,"Cancel");
      TW3CustomControl._setMouseClick(Self.FNo,$Event1(Self,TW3AlertDialog.HandleNoClick));
      TW3MovableControl.SetVisible(Self.FNo,false);
      Self.FTitle = TW3TagContainer.Create$85$($New(TW3Label),Self);
      Self.FText = TW3TagContainer.Create$85$($New(TW3Label),Self);
   }
   /// procedure TW3AlertDialog.Resize()
   ///  [line: 189, column: 26, file: SmartCL.Dialogs]
   ,Resize:function(Self) {
      var hd$1 = 0;
      var wd$2 = 0;
      var dx$12 = 0;
      var dy$13 = 0;
      TW3MovableControl.Resize(Self);
      wd$2 = TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self));
      hd$1 = TW3ScrollInfo.GetScrollHeight(TW3CustomControl.GetScrollInfo(Self));
      TW3MovableControl.SetBounds(Self.FTitle,8,8,(wd$2-16),32);
      TW3MovableControl.SetBounds(Self.FText,8,(TW3MovableControl.GetTop(Self.FTitle)+TW3MovableControl.GetHeight(Self.FTitle)+2),(wd$2-16),92);
      if ($SetIn(Self.FComponentState,3,0,9)&&Self.FReady) {
         (wd$2-= 16);
         if ((1<<Self.FOptions$6&36)!=0) {
            (wd$2-= 8);
         }
         if ((1<<Self.FOptions$6&27)!=0) {
            if ((1<<Self.FOptions$6&9)!=0) {
               dy$13 = TW3MovableControl.GetHeight(Self)-(TW3MovableControl.GetHeight(Self.FYes)+20);
               TW3MovableControl.SetBounds(Self.FYes,10,dy$13,wd$2,TW3MovableControl.GetHeight(Self.FYes));
            } else if ((1<<Self.FOptions$6&18)!=0) {
               dy$13 = TW3MovableControl.GetHeight(Self)-(TW3MovableControl.GetHeight(Self.FNo)+20);
               TW3MovableControl.SetBounds(Self.FNo,10,dy$13,wd$2,TW3MovableControl.GetHeight(Self.FNo));
            }
         } else if ((1<<Self.FOptions$6&36)!=0) {
            dy$13 = hd$1-(TW3MovableControl.GetHeight(Self.FYes)+8);
            TW3MovableControl.SetBounds(Self.FYes,8,dy$13,($Div(wd$2,2)),TW3MovableControl.GetHeight(Self.FYes));
            dx$12 = TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self))-($Div(wd$2,2));
            (dx$12-= 8);
            TW3MovableControl.SetBounds(Self.FNo,dx$12,dy$13,($Div(wd$2,2)),TW3MovableControl.GetHeight(Self.FNo));
         }
      }
   }
   /// procedure TW3AlertDialog.SetupDialog(aTitle: String; aText: String; aOptions: TW3AlertOptions)
   ///  [line: 118, column: 26, file: SmartCL.Dialogs]
   ,SetupDialog:function(Self, aTitle, aText$1, aOptions) {
      if (!Self.FReady) {
         TW3TagObj.BeginUpdate(Self);
         try {
            Self.FOptions$6 = aOptions;
            TW3Label.SetCaption$2(Self.FTitle,aTitle);
            TW3Label.SetCaption$2(Self.FText,aText$1);
            switch (Self.FOptions$6) {
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
            switch (Self.FOptions$6) {
               case 0 :
                  TW3Button.SetCaption$1(Self.FYes,"Yes");
                  break;
               case 1 :
                  TW3Button.SetCaption$1(Self.FNo,"No");
                  break;
               case 3 :
                  TW3Button.SetCaption$1(Self.FYes,"OK");
                  break;
               case 4 :
                  TW3Button.SetCaption$1(Self.FNo,"Cancel");
                  break;
               case 2 :
                  TW3Button.SetCaption$1(Self.FYes,"Yes");
                  TW3Button.SetCaption$1(Self.FNo,"No");
                  break;
               case 5 :
                  TW3Button.SetCaption$1(Self.FYes,"OK");
                  TW3Button.SetCaption$1(Self.FNo,"Cancel");
                  break;
            }
            TW3CustomFont.SetName$1$(TW3CustomControl.a$55(Self.FTitle),"Helvetica, Arial, sans-serif");
            TW3CustomFont.SetWeight$(TW3CustomControl.a$55(Self.FTitle),"bold");
            TW3CustomFont.SetSize$6$(TW3CustomControl.a$55(Self.FTitle),24);
            TW3Label.SetHAlign(Self.FTitle,1);
            TW3CustomFont.SetColor$2$(TW3CustomControl.a$55(Self.FTitle),16777215);
            Self.FTitle.FHandle$3.style["text-shadow"] = "0 -1px 0 rgba(0,0,0,.8)";
            TW3CustomFont.SetSize$6$(TW3CustomControl.a$55(Self.FText),16);
            TW3CustomFont.SetName$1$(TW3CustomControl.a$55(Self.FText),"Helvetica, Arial, sans-serif");
            TW3Label.SetHAlign(Self.FText,1);
            Self.FReady = true;
         } finally {
            TW3TagObj.AddToComponentState(Self,[48]);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3AlertDialog.StyleTagObject()
   ///  [line: 91, column: 26, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3MovableControl.StyleTagObject(Self);
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3AlertDialog.$Intf={
   IW3AlertDialog:[TW3AlertDialog.SetupDialog]
   ,IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Button = class (TW3CustomControl)
///  [line: 20, column: 3, file: SmartCL.Controls.Button]
var TW3Button = {
   $ClassName:"TW3Button",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption$1 = "";
      $.FPressed = false;
   }
   /// function TW3Button.GetCaption() : String
   ///  [line: 59, column: 20, file: SmartCL.Controls.Button]
   ,GetCaption$1:function(Self) {
      return Self.FCaption$1;
   }
   /// procedure TW3Button.HandleKeyDown(Sender: TObject; const KeyCode: Integer)
   ///  [line: 117, column: 21, file: SmartCL.Controls.Button]
   ,HandleKeyDown:function(Self, Sender$10, KeyCode$2) {
      if (TW3CustomControl.GetEnabled$1(Self)&&(KeyCode$2==13||KeyCode$2==32)) {
         TW3Button.SetPressed(Self,true);
      }
   }
   /// procedure TW3Button.HandleKeyUp(Sender: TObject; const KeyCode: Integer)
   ///  [line: 123, column: 21, file: SmartCL.Controls.Button]
   ,HandleKeyUp:function(Self, Sender$11, KeyCode$3) {
      switch (KeyCode$3) {
         case 13 :
         case 32 :
            if (TW3CustomControl.GetEnabled$1(Self)&&Self.FPressed&&(Self.FOnClick!==null)) {
               Self.FOnClick(Self);
            }
            break;
         case 27 :
            TW3Button.SetPressed(Self,false);
            break;
      }
   }
   /// procedure TW3Button.HandleMouseDown(Sender: TObject; Button: TMouseButton; Shift: TShiftState; X: Integer; Y: Integer)
   ///  [line: 134, column: 21, file: SmartCL.Controls.Button]
   ,HandleMouseDown:function(Self, Sender$12, Button$3, Shift$1, X$7, Y$7) {
      if (!Button$3) {
         TW3Button.SetPressed(Self,true);
      }
   }
   /// procedure TW3Button.HandleMouseUp(Sender: TObject; Button: TMouseButton; Shift: TShiftState; X: Integer; Y: Integer)
   ///  [line: 141, column: 21, file: SmartCL.Controls.Button]
   ,HandleMouseUp:function(Self, Sender$13, Button$4, Shift$2, X$8, Y$8) {
      if (Self.FPressed) {
         TW3Button.SetPressed(Self,false);
         if ((Button$4==0)&&(!(Self.FOnDblClick!==null))&&TRect$ContainsPos$1(TW3MovableControl.ClientRect(Self),X$8,Y$8)&&(Self.FOnClick!==null)) {
            TW3EventManager.PreventOnClick(EventManager);
            Self.FOnClick(Self);
         }
      }
   }
   /// procedure TW3Button.InitializeObject()
   ///  [line: 80, column: 21, file: SmartCL.Controls.Button]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.SimulateMouseEvents = true;
      TW3MovableControl.SetWidth$(Self,100);
      TW3MovableControl.SetHeight$(Self,32);
      TW3CustomControl._setMouseDown(Self,$Event(Self,TW3Button.HandleMouseDown));
      TW3CustomControl._setMouseUp(Self,$Event(Self,TW3Button.HandleMouseUp));
      TW3CustomControl._setKeyDown(Self,$Event2(Self,TW3Button.HandleKeyDown));
      TW3CustomControl._setKeyUp(Self,$Event2(Self,TW3Button.HandleKeyUp));
   }
   /// function TW3Button.MakeElementTagObj() : THandle
   ///  [line: 94, column: 20, file: SmartCL.Controls.Button]
   ,MakeElementTagObj:function(Self) {
      return w3_createHtmlElement("button");
   }
   /// procedure TW3Button.ObjectReady()
   ///  [line: 64, column: 21, file: SmartCL.Controls.Button]
   ,ObjectReady:function(Self) {
      TW3MovableControl.ObjectReady(Self);
      TW3Button.SetCaption$1(Self,Self.FCaption$1);
   }
   /// procedure TW3Button.SetCaption(NewCaption: String)
   ///  [line: 70, column: 21, file: SmartCL.Controls.Button]
   ,SetCaption$1:function(Self, NewCaption$1) {
      if ($SetIn(Self.FComponentState,3,0,9)) {
         Self.FCaption$1 = NewCaption$1;
         TW3TagObj.a$45(Self,Self.FCaption$1);
      } else {
         Self.FCaption$1 = NewCaption$1;
      }
   }
   /// procedure TW3Button.SetPressed(DownState: Boolean)
   ///  [line: 99, column: 21, file: SmartCL.Controls.Button]
   ,SetPressed:function(Self, DownState) {
      if (Self.FPressed!=DownState) {
         Self.FPressed = DownState;
         if (DownState) {
            TW3TagStyle.Add$2(TW3CustomControl.GetTagStyle(Self),PressedCSSClass);
         } else {
            TW3TagStyle.RemoveByName(TW3CustomControl.GetTagStyle(Self),PressedCSSClass);
         }
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3Button.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3AlertButton = class (TW3Button)
///  [line: 26, column: 3, file: SmartCL.Dialogs]
var TW3AlertButton = {
   $ClassName:"TW3AlertButton",$Parent:TW3Button
   ,$Init:function ($) {
      TW3Button.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AcceptOwner:TW3OwnedObject.AcceptOwner
   ,Create$11:TW3TagObj.Create$11
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3Button.InitializeObject
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,CreationFlags:TW3TagObj.CreationFlags
   ,HookEvents:TW3CustomControl.HookEvents
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3Button.MakeElementTagObj
   ,Showing:TW3MovableControl.Showing
   ,StyleTagObject:TW3MovableControl.StyleTagObject
   ,UnHookEvents:TW3CustomControl.UnHookEvents
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3Button.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3AlertButton.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3LabelMemory = record
///  [line: 23, column: 3, file: SmartCL.Controls.Label]
function Copy$TW3LabelMemory(s,d) {
   d.Flow=s.Flow;
   d.WordWrap=s.WordWrap;
   d.VAlign=s.VAlign;
   d.HAlign=s.HAlign;
   d.width$28=s.width$28;
   d.height$23=s.height$23;
   return d;
}
function Clone$TW3LabelMemory($) {
   return {
      Flow:$.Flow,
      WordWrap:$.WordWrap,
      VAlign:$.VAlign,
      HAlign:$.HAlign,
      width$28:$.width$28,
      height$23:$.height$23
   }
}
/// TW3Label = class (TW3CustomControl)
///  [line: 32, column: 3, file: SmartCL.Controls.Label]
var TW3Label = {
   $ClassName:"TW3Label",$Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FAuto$1 = $.FEllipsis = false;
      $.FContent = undefined;
      $.FHAlign = 0;
      $.FMemory = {Flow:false,WordWrap:false,VAlign:0,HAlign:0,width$28:0,height$23:0};
      $.FVAlign = 0;
   }
   /// procedure TW3Label.AdjustToAutoSize()
   ///  [line: 179, column: 20, file: SmartCL.Controls.Label]
   ,AdjustToAutoSize:function(Self) {
      Self.FHandle$3.style.width = TInteger.ToPxStr(parseInt((Self.FContent.offsetWidth+TW3Borders.GetHSpace(TW3MovableControl.GetBorder(Self))),10));
      Self.FHandle$3.style.height = TInteger.ToPxStr(parseInt((Self.FContent.offsetHeight+TW3Borders.GetVSpace(TW3MovableControl.GetBorder(Self))),10));
   }
   /// function TW3Label.CreationFlags() : TW3CreationFlags
   ///  [line: 168, column: 19, file: SmartCL.Controls.Label]
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
   ///  [line: 160, column: 20, file: SmartCL.Controls.Label]
   ,FinalizeObject:function(Self) {
      Self.FContent.parentNode.removeChild(Self.FContent);
      Self.FContent = null;
      TW3CustomControl.FinalizeObject(Self);
   }
   /// function TW3Label.GetCaption() : String
   ///  [line: 292, column: 19, file: SmartCL.Controls.Label]
   ,GetCaption$2:function(Self) {
      var Result = "";
      if (Self.FContent) {
         Result = String(Self.FContent.innerHTML);
      }
      return Result
   }
   /// function TW3Label.GetWordWrap() : Boolean
   ///  [line: 308, column: 19, file: SmartCL.Controls.Label]
   ,GetWordWrap:function(Self) {
      var Result = false;
      if (Self.FContent) {
         Result = (Self.FContent.classList.contains("lbxenableBreak")?true:false);
      }
      return Result
   }
   /// procedure TW3Label.InitializeObject()
   ///  [line: 134, column: 20, file: SmartCL.Controls.Label]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContent = document.createElement("p");
      w3_setAttrib(Self.FContent,"class","lbxcontent");
      Self.FHandle$3.appendChild(Self.FContent);
      Self.FContent.innerHTML = TObject.ClassName(Self.ClassType);
      Self.FHAlign = 0;
      Self.FContent.classList.add("lbxcontent_h_left");
      Self.FVAlign = 1;
      Self.FContent.classList.add("lbxcontent_v_center");
      Self.FContent.classList.add("lbxdisableBreak");
   }
   /// procedure TW3Label.Resize()
   ///  [line: 214, column: 20, file: SmartCL.Controls.Label]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.FAuto$1) {
         if (Self.FHandle$3) {
            TW3Label.AdjustToAutoSize(Self);
         }
      }
   }
   /// procedure TW3Label.SetAuto(const NewAuto: Boolean)
   ///  [line: 224, column: 20, file: SmartCL.Controls.Label]
   ,SetAuto$1:function(Self, NewAuto) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (NewAuto!=Self.FAuto$1) {
            if (NewAuto) {
               Self.FMemory.Flow = Self.FEllipsis;
               Self.FMemory.WordWrap = TW3Label.GetWordWrap(Self);
               Self.FMemory.VAlign = Self.FVAlign;
               Self.FMemory.HAlign = Self.FHAlign;
               Self.FMemory.width$28 = parseInt(Self.FContent.offsetWidth,10);
               Self.FMemory.height$23 = parseInt(Self.FContent.offsetHeight,10);
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
               Self.FEllipsis = Self.FMemory.Flow;
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
   ///  [line: 298, column: 20, file: SmartCL.Controls.Label]
   ,SetCaption$2:function(Self, NewCaption$2) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         Self.FContent.innerHTML = NewCaption$2;
         if (Self.FAuto$1) {
            TW3Label.AdjustToAutoSize(Self);
         }
      }
   }
   /// procedure TW3Label.SetEllipsis(const NewEllipsis: Boolean)
   ///  [line: 274, column: 20, file: SmartCL.Controls.Label]
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
   ///  [line: 339, column: 20, file: SmartCL.Controls.Label]
   ,SetHAlign:function(Self, NewAlign) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewAlign!=Self.FHAlign) {
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
               Self.FHAlign = NewAlign;
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
   ///  [line: 208, column: 20, file: SmartCL.Controls.Label]
   ,SetHeight:function(Self, NewHeight$6) {
      if (!Self.FAuto$1) {
         TW3MovableControl.SetHeight(Self,NewHeight$6);
      }
   }
   /// procedure TW3Label.SetVAlign(const NewAlign: TTextVAlign)
   ///  [line: 368, column: 20, file: SmartCL.Controls.Label]
   ,SetVAlign:function(Self, NewAlign$1) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewAlign$1!=Self.FVAlign) {
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
               Self.FVAlign = NewAlign$1;
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
   ///  [line: 202, column: 20, file: SmartCL.Controls.Label]
   ,SetWidth:function(Self, NewWidth$6) {
      if (!Self.FAuto$1) {
         TW3MovableControl.SetWidth(Self,NewWidth$6);
      }
   }
   /// procedure TW3Label.SetWordWrap(const NewWrap: Boolean)
   ///  [line: 314, column: 20, file: SmartCL.Controls.Label]
   ,SetWordWrap:function(Self, NewWrap) {
      if (!$SetIn(Self.FComponentState,8,0,9)) {
         if (!Self.FAuto$1) {
            if (NewWrap!=Self.FContent.classList.contains("lbxenableBreak")) {
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
};
TW3Label.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TTextVAlign enumeration
///  [line: 21, column: 3, file: SmartCL.Controls.Label]
var TTextVAlign = [ "tvTop", "tvCenter", "tvBottom" ];
/// TTextAlign enumeration
///  [line: 20, column: 3, file: SmartCL.Controls.Label]
var TTextAlign = [ "taLeft", "taCenter", "taRight" ];
function SetupTextBehaviorStyles() {
   if (__LabelStyles===null) {
      __LabelStyles = TW3StyleSheet.Create$141($New(TW3StyleSheet));
      __LabelStyles.FHandle$11.innerHTML = ".lbxenableBreak  { white-space: normal; }\r\n      .lbxdisableBreak { white-space: nowrap; }\r\n      .lbxcontent {\r\n        display: block;\r\n        position: absolute;\r\n        margin: 0px !important;\r\n        padding: 0px !important;\r\n        font-family: inherit;\r\n        color: inherit;\r\n        overflow: hidden;\r\n      }\r\n\r\n\r\n      @import url('https:\/\/fonts.googleapis.com\/css?family=Ubuntu');\r\n\r\n      .lbxcontent_ellipsis { width: 100%; text-overflow: ellipsis; }\r\n      .lbxcontent_v_top    { top: 0%; transform: translate(0, 0); }\r\n      .lbxcontent_v_center { top: 50%; transform: translate(0, -50%); }\r\n      .lbxcontent_v_bottom { top: 100%; transform: translate(0, -100%); }\r\n      .lbxcontent_h_left   { text-align: left; }\r\n      .lbxcontent_h_center { width: 100%; text-align: center; }\r\n      .lbxcontent_h_right  { width: 100%; text-align: right; }";
   }
};
/// TW3StyleSheet = class (TObject)
///  [line: 12, column: 3, file: SmartCL.Css.Stylesheet]
var TW3StyleSheet = {
   $ClassName:"TW3StyleSheet",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$11 = undefined;
   }
   /// constructor TW3StyleSheet.Create()
   ///  [line: 635, column: 27, file: SmartCL.Css.Stylesheet]
   ,Create$141:function(Self) {
      var mDocument = undefined;
      TObject.Create(Self);
      mDocument = document;
      Self.FHandle$11 = mDocument.createElement("style");
      Self.FHandle$11.type = "text\/css";
      mDocument.getElementsByTagName("head")[0].appendChild(Self.FHandle$11);
      return Self
   }
   /// destructor TW3StyleSheet.Destroy()
   ///  [line: 646, column: 26, file: SmartCL.Css.Stylesheet]
   ,Destroy:function(Self) {
      if (Self.FHandle$11) {
         Self.FHandle$11.parentNode.removeChild(Self.FHandle$11);
      }
      Self.FHandle$11 = null;
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TForm1 = class (TW3Form)
///  [line: 11, column: 3, file: Form1]
var TForm1 = {
   $ClassName:"TForm1",$Parent:TW3Form
   ,$Init:function ($) {
      TW3Form.$Init($);
      $.fLayout = $.fPanel = null;
   }
   /// procedure TForm1.InitializeForm()
   ///  [line: 26, column: 18, file: Form1]
   ,InitializeForm:function(Self) {
      TW3CustomForm.InitializeForm(Self);
   }
   /// procedure TForm1.InitializeObject()
   ///  [line: 32, column: 18, file: Form1]
   ,InitializeObject:function(Self) {
      TW3CustomForm.InitializeObject(Self);
      TW3CustomForm.SetCaption(Self,"W3Form");
      TW3TagContainer.SetComponentName(Self,"Form1");
      Self.fPanel = TW3TagContainer.Create$85$($New(TW3Panel),Self);
      Self.fLayout = Layout.Bottom$5(Layout,Layout.Height$10(Layout,50),Self.fPanel);
   }
   /// procedure TForm1.Resize()
   ///  [line: 40, column: 18, file: Form1]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.fLayout) {
         TLayout.Resize$6$(Self.fLayout,Self);
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
   ,Create$85:TW3CustomForm.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
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
   ,Height$9$:function($){return $.ClassType.Height$9.apply($.ClassType, arguments)}
   ,Margins$1$:function($){return $.ClassType.Margins$1.apply($.ClassType, arguments)}
   ,Margins$:function($){return $.ClassType.Margins.apply($.ClassType, arguments)}
   ,Padding$3$:function($){return $.ClassType.Padding$3.apply($.ClassType, arguments)}
   ,Padding$2$:function($){return $.ClassType.Padding$2.apply($.ClassType, arguments)}
   ,Spacing$:function($){return $.ClassType.Spacing.apply($.ClassType, arguments)}
   ,Stretch$:function($){return $.ClassType.Stretch($)}
   ,Width$11$:function($){return $.ClassType.Width$11.apply($.ClassType, arguments)}
};
/// TLayout = class (TObject)
///  [line: 36, column: 3, file: SmartCL.Layout]
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
///  [line: 45, column: 3, file: SmartCL.Layout]
var Layout = {
   $ClassName:"Layout",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function Layout.Bottom(config: TLayoutConfig; control: TObject) : TLayout
   ///  [line: 1204, column: 23, file: SmartCL.Layout]
   ,Bottom$5:function(Self, config, control$2) {
      var Result = null;
      var objArr = [];
      $ArraySetLenC(objArr,1,function (){return null});
      objArr[0]=control$2;
      Result = Layout.Bottom$4(Self,config,objArr);
      return Result
   }
   /// function Layout.Bottom(config: TLayoutConfig; controls: TObjectArr) : TLayout
   ///  [line: 1189, column: 23, file: SmartCL.Layout]
   ,Bottom$4:function(Self, config$1, controls$1) {
      var Result = null;
      var iControl$1 = 0;
      var inner = [];
      if (controls$1.length<=1||NotAllComponents(controls$1)) {
         Result = TLayoutImpl.Create$150($New(TLayoutImpl),3,config$1,controls$1);
      } else {
         $ArraySetLenC(inner,controls$1.length,function (){return null});
         var $temp55;
         for(iControl$1=0,$temp55=controls$1.length;iControl$1<$temp55;iControl$1++) {
            inner[(controls$1.length-1)-iControl$1]=TLayoutImpl.Create$150($New(TLayoutImpl),3,config$1,[controls$1[iControl$1]].slice());
         }
         Result = TLayoutImpl.Create$150($New(TLayoutImpl),3,config$1,inner);
      }
      return Result
   }
   /// function Layout.Height(aHeight: Integer) : TLayoutConfig
   ///  [line: 1304, column: 23, file: SmartCL.Layout]
   ,Height$10:function(Self, aHeight$1) {
      return TLayoutConfig.Height$9$(TObject.Create($New(TLayoutConfigImpl)),aHeight$1);
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
   d.Height$11=s.Height$11;
   d.Left$10=s.Left$10;
   d.Right$8=s.Right$8;
   d.Top$10=s.Top$10;
   d.Width$13=s.Width$13;
   return d;
}
function Clone$TLayoutRect($) {
   return {
      Bottom$8:$.Bottom$8,
      Height$11:$.Height$11,
      Left$10:$.Left$10,
      Right$8:$.Right$8,
      Top$10:$.Top$10,
      Width$13:$.Width$13
   }
}
/// function TLayoutRect.IsHorizontalSet(var Self: TLayoutRect) : Boolean
///  [line: 257, column: 22, file: SmartCL.Layout]
function TLayoutRect$IsHorizontalSet(Self$30) {
   return Self$30.Left$10!=null&&Self$30.Width$13!=null;
}
/// function TLayoutRect.IsVerticalSet(var Self: TLayoutRect) : Boolean
///  [line: 262, column: 22, file: SmartCL.Layout]
function TLayoutRect$IsVerticalSet(Self$31) {
   return Self$31.Top$10!=null&&Self$31.Height$11!=null;
}
/// procedure TLayoutRect.Resolve(var Self: TLayoutRect)
///  [line: 267, column: 23, file: SmartCL.Layout]
function TLayoutRect$Resolve(Self$32) {
   if (Self$32.Left$10==null&&Self$32.Right$8!=null&&Self$32.Width$13!=null) {
      Self$32.Left$10 = Self$32.Right$8-Self$32.Width$13;
   } else if (Self$32.Right$8==null&&Self$32.Left$10!=null&&Self$32.Width$13!=null) {
      Self$32.Right$8 = Self$32.Left$10+Self$32.Width$13;
   } else if (Self$32.Width$13==null&&Self$32.Left$10!=null&&Self$32.Right$8!=null) {
      Self$32.Width$13 = Self$32.Right$8-Self$32.Left$10;
   }
   if (Self$32.Top$10==null&&Self$32.Bottom$8!=null&&Self$32.Height$11!=null) {
      Self$32.Top$10 = Self$32.Bottom$8-Self$32.Height$11;
   } else if (Self$32.Bottom$8==null&&Self$32.Top$10!=null&&Self$32.Height$11!=null) {
      Self$32.Bottom$8 = Self$32.Top$10+Self$32.Height$11;
   } else if (Self$32.Height$11==null&&Self$32.Top$10!=null&&Self$32.Bottom$8!=null) {
      Self$32.Height$11 = Self$32.Bottom$8-Self$32.Top$10;
   }
}
/// procedure TLayoutRect.SetBounds(var Self: TLayoutRect; aLeft: Variant; aRight: Variant; aWidth: Variant; aTop: Variant; aBottom: Variant; aHeight: Variant)
///  [line: 277, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetBounds$4(Self$33, aLeft$2, aRight$1, aWidth$1, aTop$2, aBottom$1, aHeight$2) {
   Self$33.Left$10 = aLeft$2;
   Self$33.Right$8 = aRight$1;
   Self$33.Width$13 = aWidth$1;
   Self$33.Top$10 = aTop$2;
   Self$33.Bottom$8 = aBottom$1;
   Self$33.Height$11 = aHeight$2;
   TLayoutRect$Resolve(Self$33);
}
/// procedure TLayoutRect.SetFromControl(var Self: TLayoutRect; control: TW3CustomControl)
///  [line: 288, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetFromControl(Self$34, control$3) {
   TLayoutRect$SetBounds$4(Self$34,TW3MovableControl.GetLeft(control$3),null,TW3MovableControl.ClientWidth(control$3),TW3MovableControl.GetTop(control$3),null,TW3MovableControl.ClientHeight(control$3));
}
/// procedure TLayoutRect.SetFromRect(var Self: TLayoutRect; rect: TRect)
///  [line: 293, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetFromRect(Self$35, rect$2) {
   TLayoutRect$SetBounds$4(Self$35,rect$2.Left$3,null,TRect$Width$6(rect$2),rect$2.Top$3,null,TRect$Height$5(rect$2));
}
/// procedure TLayoutRect.SetHeight(var Self: TLayoutRect; value: Integer)
///  [line: 298, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetHeight$4(Self$36, value$25) {
   Self$36.Height$11 = value$25;
   TLayoutRect$Resolve(Self$36);
}
/// procedure TLayoutRect.SetLeft(var Self: TLayoutRect; value: Integer)
///  [line: 313, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetLeft$4(Self$37, value$26) {
   Self$37.Left$10 = value$26;
   TLayoutRect$Resolve(Self$37);
}
/// procedure TLayoutRect.SetTop(var Self: TLayoutRect; value: Integer)
///  [line: 325, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetTop$1(Self$38, value$27) {
   Self$38.Top$10 = value$27;
   TLayoutRect$Resolve(Self$38);
}
/// procedure TLayoutRect.SetWidth(var Self: TLayoutRect; value: Integer)
///  [line: 346, column: 23, file: SmartCL.Layout]
function TLayoutRect$SetWidth$5(Self$39, value$28) {
   Self$39.Width$13 = value$28;
   TLayoutRect$Resolve(Self$39);
}
/// procedure TLayoutRect.Shrink(var Self: TLayoutRect; rect: TRect)
///  [line: 352, column: 23, file: SmartCL.Layout]
function TLayoutRect$Shrink$1(Self$40, rect$3) {
   if (Self$40.Left$10!=null) {
      Self$40.Left$10 = Self$40.Left$10+rect$3.Left$3;
   }
   if (Self$40.Right$8!=null) {
      Self$40.Right$8 = Self$40.Right$8-rect$3.Right$1;
   }
   if (Self$40.Width$13!=null) {
      Self$40.Width$13 = Self$40.Width$13-rect$3.Left$3-rect$3.Right$1;
   }
   if (Self$40.Top$10!=null) {
      Self$40.Top$10 = Self$40.Top$10+rect$3.Top$3;
   }
   if (Self$40.Bottom$8!=null) {
      Self$40.Bottom$8 = Self$40.Bottom$8-rect$3.Bottom$1;
   }
   if (Self$40.Height$11!=null) {
      Self$40.Height$11 = Self$40.Height$11-rect$3.Top$3-rect$3.Bottom$1;
   }
}
/// TLayoutImpl = class (TLayout)
///  [line: 164, column: 3, file: SmartCL.Layout]
var TLayoutImpl = {
   $ClassName:"TLayoutImpl",$Parent:TLayout
   ,$Init:function ($) {
      TLayout.$Init($);
      $.FAlign = 0;
      $.FBounds = {Bottom$8:undefined,Height$11:undefined,Left$10:undefined,Right$8:undefined,Top$10:undefined,Width$13:undefined};
      $.FClientArea = {Bottom$8:undefined,Height$11:undefined,Left$10:undefined,Right$8:undefined,Top$10:undefined,Width$13:undefined};
      $.FConfig = null;
      $.FControls = [];
      $.FName$3 = "";
   }
   /// procedure TLayoutImpl.AlignControl(control: TObject)
   ///  [line: 617, column: 23, file: SmartCL.Layout]
   ,AlignControl:function(Self, control$4) {
      TLayoutImpl.ResolveDimensionsFrom(Self,control$4);
      TLayoutImpl.ResizeControl(Self,control$4);
      if ($Is(control$4,TLayoutImpl)) {
         TLayoutImpl.InternalResize($As(control$4,TLayoutImpl),Self);
      }
      TLayoutImpl.ResolveDimensionsFrom(Self,control$4);
      TLayoutImpl.ShrinkClientArea(Self,control$4);
   }
   /// procedure TLayoutImpl.CalculateUsableArea(container: TObject)
   ///  [line: 631, column: 23, file: SmartCL.Layout]
   ,CalculateUsableArea:function(Self, container) {
      var clientArea = {Bottom$8:undefined,Height$11:undefined,Left$10:undefined,Right$8:undefined,Top$10:undefined,Width$13:undefined};
      var p1,
         p2;
      clientArea = Dimensions.GetClientArea(Dimensions,container);
      p1 = null;
      p2 = null;
      switch (Self.FAlign) {
         case 0 :
         case 2 :
            if (!Self.FAlign) {
               p1 = clientArea.Left$10;
            } else {
               p2 = clientArea.Right$8;
            }
            TLayoutRect$SetBounds$4(Self.FBounds,p1,p2,Self.FConfig.FWidth$2,clientArea.Top$10,clientArea.Bottom$8,clientArea.Height$11);
            break;
         case 1 :
         case 3 :
            if (Self.FAlign==1) {
               p1 = clientArea.Top$10;
            } else {
               p2 = clientArea.Bottom$8;
            }
            TLayoutRect$SetBounds$4(Self.FBounds,clientArea.Left$10,clientArea.Right$8,clientArea.Width$13,p1,p2,Self.FConfig.FHeight$2);
            break;
         case 4 :
         case 5 :
            TLayoutRect$SetBounds$4(Self.FBounds,clientArea.Left$10,clientArea.Right$8,clientArea.Width$13,clientArea.Top$10,clientArea.Bottom$8,clientArea.Height$11);
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
   ,Create$150:function(Self, align$18, config$2, controls$2) {
      Self.FAlign = align$18;
      Self.FConfig = TLayoutConfigImpl.CreateFrom($New(TLayoutConfigImpl),$As(config$2,TLayoutConfigImpl));
      Self.FControls = controls$2;
      ++LayoutCount;
      Self.FName$3 = ("Layout "+LayoutCount.toString()+" ("+AlignToString(align$18).toString()+")");
      return Self
   }
   /// procedure TLayoutImpl.InternalResize(container: TObject)
   ///  [line: 679, column: 23, file: SmartCL.Layout]
   ,InternalResize:function(Self, container$1) {
      var gotClient = false;
      var iControl$2 = 0;
      TLayoutImpl.CalculateUsableArea(Self,container$1);
      var $temp56;
      for(iControl$2=0,$temp56=Self.FControls.length;iControl$2<$temp56;iControl$2++) {
         if ($Is(Self.FControls[iControl$2],TW3CustomControl)||$As(Self.FControls[iControl$2],TLayoutImpl).FAlign!=4) {
            TLayoutImpl.AlignControl(Self,Self.FControls[iControl$2]);
         }
      }
      gotClient = false;
      var $temp57;
      for(iControl$2=0,$temp57=Self.FControls.length;iControl$2<$temp57;iControl$2++) {
         if ($Is(Self.FControls[iControl$2],TLayoutImpl)&&$As(Self.FControls[iControl$2],TLayoutImpl).FAlign==4) {
            if (gotClient) {
               throw Exception.Create($New(Exception),"Layout can contain only one client-aligned child");
            }
            gotClient = true;
            TLayoutImpl.AlignControl(Self,Self.FControls[iControl$2]);
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
   ,Resize$5:function(Self, rect$4) {
      TLayoutImpl.LoggedResize(Self,TLayoutArea.Create$151($New(TLayoutArea),Clone$TRect(rect$4)));
   }
   /// procedure TLayoutImpl.Resize(container: TW3CustomControl)
   ///  [line: 753, column: 23, file: SmartCL.Layout]
   ,Resize$6:function(Self, container$3) {
      TLayoutImpl.LoggedResize(Self,container$3);
   }
   /// procedure TLayoutImpl.ResizeControl(control: TObject)
   ///  [line: 763, column: 23, file: SmartCL.Layout]
   ,ResizeControl:function(Self, control$5) {
      if ($Is(control$5,TLayoutImpl)) {
         return;
      }
      if (Self.FClientArea.Top$10!=null) {
         if (Self.FAlign==3) {
            Dimensions.SetBottom$1(Dimensions,control$5,parseInt((Self.FClientArea.Top$10+Self.FClientArea.Height$11-Dimensions.GetOwnerTop(Dimensions,control$5)),10));
         } else if (Self.FAlign!=5) {
            Dimensions.SetTop$2(Dimensions,control$5,parseInt((Self.FClientArea.Top$10-Dimensions.GetOwnerTop(Dimensions,control$5)),10));
         } else {
            Dimensions.SetTop$2(Dimensions,control$5,parseInt((Self.FClientArea.Top$10-Dimensions.GetOwnerTop(Dimensions,control$5)+($Div(Self.FClientArea.Height$11-Dimensions.GetHeight$7(Dimensions,control$5),2))),10));
         }
      }
      if (Self.FClientArea.Left$10!=null) {
         if (Self.FAlign==2) {
            Dimensions.SetRight$4(Dimensions,control$5,parseInt((Self.FClientArea.Left$10+Self.FClientArea.Width$13-Dimensions.GetOwnerLeft(Dimensions,control$5)),10));
         } else if (Self.FAlign!=5) {
            Dimensions.SetLeft$5(Dimensions,control$5,parseInt((Self.FClientArea.Left$10-Dimensions.GetOwnerLeft(Dimensions,control$5)),10));
         } else {
            Dimensions.SetLeft$5(Dimensions,control$5,parseInt((Self.FClientArea.Left$10-Dimensions.GetOwnerLeft(Dimensions,control$5)+($Div(Self.FClientArea.Width$13-Dimensions.GetWidth$8(Dimensions,control$5),2))),10));
         }
      }
      if (Self.FAlign!=5) {
         if (Self.FClientArea.Height$11!=null) {
            Dimensions.SetHeight$5(Dimensions,control$5,parseInt(Self.FClientArea.Height$11,10));
         }
         if (Self.FClientArea.Width$13!=null) {
            Dimensions.SetWidth$6(Dimensions,control$5,parseInt(Self.FClientArea.Width$13,10));
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
            iControl$3 = 0;
         var layout = null;
         if (clientSize==null) {
            return;
         }
         countStretched = 0;
         clientSizeInt = parseInt(clientSize,10);
         var $temp58;
         for(iControl$3=0,$temp58=Self.FControls.length;iControl$3<$temp58;iControl$3++) {
            if ($Is(Self.FControls[iControl$3],TLayoutImpl)) {
               layout = $As(Self.FControls[iControl$3],TLayoutImpl);
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
         var $temp59;
         for(iControl$3=0,$temp59=Self.FControls.length;iControl$3<$temp59;iControl$3++) {
            if ($Is(Self.FControls[iControl$3],TLayoutImpl)) {
               layout = $As(Self.FControls[iControl$3],TLayoutImpl);
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
      ResizeChildren(Self.FClientArea.Width$13,[0, 2].slice(),function (layout$1) {
         return layout$1.FConfig.FWidth$2;
      },function (layout$2, value$29) {
         TLayoutConfig.Width$11$(layout$2.FConfig,value$29);
      });
      ResizeChildren(Self.FClientArea.Height$11,[1, 3].slice(),function (layout$3) {
         return layout$3.FConfig.FHeight$2;
      },function (layout$4, value$30) {
         TLayoutConfig.Height$9$(layout$4.FConfig,value$30);
      });
   }
   /// procedure TLayoutImpl.ResolveDimensionsFrom(control: TObject)
   ///  [line: 950, column: 23, file: SmartCL.Layout]
   ,ResolveDimensionsFrom:function(Self, control$6) {
      if ((!TLayoutRect$IsHorizontalSet(Self.FClientArea))&&Dimensions.HasWidth(Dimensions,control$6)&&((1<<Self.FAlign&53)!=0)) {
         TLayoutImpl.SetHorizontal$1(Self,Dimensions.GetWidth$8(Dimensions,control$6));
      }
      if ((!TLayoutRect$IsVerticalSet(Self.FClientArea))&&Dimensions.HasHeight(Dimensions,control$6)&&((1<<Self.FAlign&58)!=0)) {
         TLayoutImpl.SetVertical$1(Self,Dimensions.GetHeight$7(Dimensions,control$6));
      }
   }
   /// procedure TLayoutImpl.ResolveDimensionsFromChildren()
   ///  [line: 860, column: 23, file: SmartCL.Layout]
   ,ResolveDimensionsFromChildren:function(Self) {
      var control$7 = null;
      var controlCount = 0;
      var dim$1,
         iControl$4 = 0;
      var sum;
      var $temp60;
      for(iControl$4=0,$temp60=Self.FControls.length;iControl$4<$temp60;iControl$4++) {
         if ($Is(Self.FControls[iControl$4],TLayoutImpl)) {
            TLayoutImpl.ResolveDimensionsFromChildren($As(Self.FControls[iControl$4],TLayoutImpl));
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
         var $temp61;
         for(iControl$4=0,$temp61=Self.FControls.length;iControl$4<$temp61;iControl$4++) {
            control$7 = Self.FControls[iControl$4];
            switch (Self.FAlign) {
               case 0 :
               case 2 :
                  dim$1 = Dimensions.GetWidth$8(Dimensions,control$7);
                  break;
               case 1 :
               case 3 :
                  dim$1 = Dimensions.GetHeight$7(Dimensions,control$7);
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
      if (sum!=null&&Self.FConfig.FWidth$2==null&&((1<<Self.FAlign&37)!=0)) {
         sum = sum+Self.FConfig.FPadding.Left$3+Self.FConfig.FPadding.Right$1+Self.FConfig.FMargins.Left$3+Self.FConfig.FMargins.Right$1;
         TLayoutConfig.Width$11$(Self.FConfig,parseInt(sum,10));
      }
      if (Self.FAlign==5) {
         sum = Dimensions.GetHeight$7(Dimensions,Self.FControls[0]);
      }
      if (sum!=null&&Self.FConfig.FHeight$2==null&&((1<<Self.FAlign&42)!=0)) {
         sum = sum+Self.FConfig.FPadding.Top$3+Self.FConfig.FPadding.Bottom$1+Self.FConfig.FMargins.Top$3+Self.FConfig.FMargins.Bottom$1;
         TLayoutConfig.Height$9$(Self.FConfig,parseInt(sum,10));
      }
   }
   /// procedure TLayoutImpl.SetHorizontal(clientWidth: Variant)
   ///  [line: 972, column: 23, file: SmartCL.Layout]
   ,SetHorizontal$1:function(Self, clientWidth) {
      TLayoutRect$SetWidth$5(Self.FClientArea,parseInt(clientWidth,10));
      if (clientWidth!=null) {
         clientWidth = clientWidth+Self.FConfig.FPadding.Left$3+Self.FConfig.FPadding.Right$1;
      }
      TLayoutRect$SetWidth$5(Self.FBounds,parseInt(clientWidth,10));
   }
   /// procedure TLayoutImpl.SetVertical(clientHeight: Variant)
   ///  [line: 981, column: 23, file: SmartCL.Layout]
   ,SetVertical$1:function(Self, clientHeight) {
      TLayoutRect$SetHeight$4(Self.FClientArea,parseInt(clientHeight,10));
      if (clientHeight!=null) {
         clientHeight = clientHeight+Self.FConfig.FPadding.Top$3+Self.FConfig.FPadding.Bottom$1;
      }
      TLayoutRect$SetHeight$4(Self.FBounds,parseInt(clientHeight,10));
   }
   /// procedure TLayoutImpl.ShrinkClientArea(control: TObject)
   ///  [line: 990, column: 23, file: SmartCL.Layout]
   ,ShrinkClientArea:function(Self, control$8) {
      var align$20 = 0;
      var height$24,
         width$29;
      if ($Is(control$8,TLayoutImpl)) {
         align$20 = $As(control$8,TLayoutImpl).FAlign;
      } else {
         align$20 = Self.FAlign;
      }
      switch (align$20) {
         case 0 :
            width$29 = Dimensions.GetWidth$8(Dimensions,control$8);
            $Assert(width$29!=null,"width = Null","");
            $Assert(Self.FClientArea.Left$10!=null,"FClientArea.Left = Null","");
            $Assert(Dimensions.GetLeft$4(Dimensions,control$8)+Dimensions.GetOwnerLeft(Dimensions,control$8)==Self.FClientArea.Left$10,("Dimensions.GetLeft("+NameOf(control$8).toString()+")["+VarToString(Dimensions.GetLeft$4(Dimensions,control$8)).toString()+"] + Dimensions.GetOwnerLeft("+NameOf(control$8).toString()+")["+Dimensions.GetOwnerLeft(Dimensions,control$8).toString()+"] <> FClientArea.Left["+VarToString(Self.FClientArea.Left$10).toString()+"]"),"");
            Self.FClientArea.Left$10 = Self.FClientArea.Left$10+width$29+Self.FConfig.FSpacing;
            Self.FClientArea.Width$13 = Self.FClientArea.Width$13-width$29-Self.FConfig.FSpacing;
            break;
         case 1 :
            height$24 = Dimensions.GetHeight$7(Dimensions,control$8);
            $Assert(height$24!=null,"height = Null","");
            $Assert(Self.FClientArea.Top$10!=null,"FClientArea.Top = Null","");
            $Assert(Dimensions.GetTop$1(Dimensions,control$8)+Dimensions.GetOwnerTop(Dimensions,control$8)==Self.FClientArea.Top$10,("Dimensions.GetTop(["+NameOf(control$8).toString()+"])["+VarToString(Dimensions.GetTop$1(Dimensions,control$8)).toString()+"] + Dimensions.GetOwnerTop("+NameOf(control$8).toString()+")["+Dimensions.GetOwnerTop(Dimensions,control$8).toString()+"] <> FClientArea.Top["+VarToString(Self.FClientArea.Top$10).toString()+"]"),"");
            Self.FClientArea.Top$10 = Self.FClientArea.Top$10+height$24+Self.FConfig.FSpacing;
            Self.FClientArea.Height$11 = Self.FClientArea.Height$11-height$24-Self.FConfig.FSpacing;
            break;
         case 2 :
            width$29 = Dimensions.GetWidth$8(Dimensions,control$8);
            $Assert(width$29!=null,"width = Null","");
            $Assert(Self.FClientArea.Left$10!=null,"FClientArea.Left = Null","");
            $Assert(Self.FClientArea.Width$13!=null,"FClientArea.Width = Null","");
            $Assert(Dimensions.GetLeft$4(Dimensions,control$8)+Dimensions.GetOwnerLeft(Dimensions,control$8)==Self.FClientArea.Left$10+Self.FClientArea.Width$13-width$29,("Dimensions.GetLeft("+NameOf(control$8).toString()+")["+VarToString(Dimensions.GetLeft$4(Dimensions,control$8)).toString()+"] + Dimensions.GetOwnerLeft("+NameOf(control$8).toString()+")["+Dimensions.GetOwnerLeft(Dimensions,control$8).toString()+"] <> (FClientArea.Left["+VarToString(Self.FClientArea.Left$10).toString()+"] + FClientArea.Width["+VarToString(Self.FClientArea.Width$13).toString()+"] - width["+VarToString(width$29).toString()+"])"),"");
            Self.FClientArea.Right$8 = Self.FClientArea.Right$8-width$29-Self.FConfig.FSpacing;
            Self.FClientArea.Width$13 = Self.FClientArea.Width$13-width$29-Self.FConfig.FSpacing;
            break;
         case 3 :
            height$24 = Dimensions.GetHeight$7(Dimensions,control$8);
            $Assert(height$24!=null,"height = Null","");
            $Assert(Self.FClientArea.Top$10!=null,"FClientArea.Top = Null","");
            $Assert(Self.FClientArea.Height$11!=null,"FClientArea.Height = Null","");
            $Assert(Dimensions.GetTop$1(Dimensions,control$8)+Dimensions.GetOwnerTop(Dimensions,control$8)==Self.FClientArea.Top$10+Self.FClientArea.Height$11-height$24,("Dimensions.GetTop("+NameOf(control$8).toString()+")["+VarToString(Dimensions.GetTop$1(Dimensions,control$8)).toString()+"] + Dimensions.GetOwnerTop(control) <> (FClientArea.Top["+NameOf(control$8).toString()+"] + FClientArea.Height["+Dimensions.GetOwnerTop(Dimensions,control$8).toString()+"] - height["+VarToString(Self.FClientArea.Top$10).toString()+"])"),"");
            Self.FClientArea.Bottom$8 = Self.FClientArea.Bottom$8-height$24-Self.FConfig.FSpacing;
            Self.FClientArea.Height$11 = Self.FClientArea.Height$11-height$24-Self.FConfig.FSpacing;
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
   ,Height$9:function(Self, aHeight$3) {
      var Result = null;
      Self.FHeight$2 = aHeight$3;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Margins(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 565, column: 28, file: SmartCL.Layout]
   ,Margins$1:function(Self, left$2, top$4, right$2, bottom$2) {
      var Result = null;
      Self.FMargins = Create$105(left$2,top$4,right$2,bottom$2);
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Margins(value: Integer) : TLayoutConfig
   ///  [line: 560, column: 28, file: SmartCL.Layout]
   ,Margins:function(Self, value$31) {
      return TLayoutConfig.Margins$1$(Self,value$31,value$31,value$31,value$31);
   }
   /// function TLayoutConfigImpl.Padding(left: Integer; top: Integer; right: Integer; bottom: Integer) : TLayoutConfig
   ///  [line: 576, column: 28, file: SmartCL.Layout]
   ,Padding$3:function(Self, left$3, top$5, right$3, bottom$3) {
      var Result = null;
      Self.FPadding = Create$105(left$3,top$5,right$3,bottom$3);
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Padding(value: Integer) : TLayoutConfig
   ///  [line: 571, column: 28, file: SmartCL.Layout]
   ,Padding$2:function(Self, value$32) {
      return TLayoutConfig.Padding$3$(Self,value$32,value$32,value$32,value$32);
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
   ,Stretch:function(Self) {
      var Result = null;
      Self.FStretch = true;
      Result = Self;
      return Result
   }
   /// function TLayoutConfigImpl.Width(aWidth: Integer) : TLayoutConfig
   ///  [line: 594, column: 28, file: SmartCL.Layout]
   ,Width$11:function(Self, aWidth$2) {
      var Result = null;
      Self.FWidth$2 = aWidth$2;
      Result = Self;
      return Result
   }
   ,Destroy:TObject.Destroy
   ,Height$9$:function($){return $.ClassType.Height$9.apply($.ClassType, arguments)}
   ,Margins$1$:function($){return $.ClassType.Margins$1.apply($.ClassType, arguments)}
   ,Margins$:function($){return $.ClassType.Margins.apply($.ClassType, arguments)}
   ,Padding$3$:function($){return $.ClassType.Padding$3.apply($.ClassType, arguments)}
   ,Padding$2$:function($){return $.ClassType.Padding$2.apply($.ClassType, arguments)}
   ,Spacing$:function($){return $.ClassType.Spacing.apply($.ClassType, arguments)}
   ,Stretch$:function($){return $.ClassType.Stretch($)}
   ,Width$11$:function($){return $.ClassType.Width$11.apply($.ClassType, arguments)}
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
   ,Create$151:function(Self, rect$5) {
      TObject.Create(Self);
      Copy$TRect(rect$5,Self.FRect);
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TAlign enumeration
///  [line: 82, column: 3, file: SmartCL.Layout]
var TAlign = [ "Left", "Top", "Right", "Bottom", "Client", "Center" ];
function NotAllComponents(controls$3) {
   var Result = false;
   var iControl = 0;
   Result = true;
   var $temp62;
   for(iControl=0,$temp62=controls$3.length;iControl<$temp62;iControl++) {
      if (!$Is(controls$3[iControl],TW3CustomControl)) {
         return Result;
      }
   }
   Result = false;
   return Result
};
function NameOf(control$9) {
   var Result = "";
   if ($Is(control$9,TLayoutImpl)) {
      Result = $As(control$9,TLayoutImpl).FName$3;
   } else {
      Result = TW3TagContainer.GetComponentName($As(control$9,TW3CustomControl));
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
   ,GetClientArea:function(Self, control$10) {
      var Result = {Bottom$8:undefined,Height$11:undefined,Left$10:undefined,Right$8:undefined,Top$10:undefined,Width$13:undefined};
      if ($Is(control$10,TLayoutImpl)) {
         Copy$TLayoutRect($As(control$10,TLayoutImpl).FClientArea,Result);
      } else if ($Is(control$10,TLayoutArea)) {
         TLayoutRect$SetFromRect(Result,Clone$TRect($As(control$10,TLayoutArea).FRect));
      } else {
         TLayoutRect$SetFromControl(Result,$As(control$10,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetHeight(control: TObject) : Variant
   ///  [line: 388, column: 27, file: SmartCL.Layout]
   ,GetHeight$7:function(Self, control$11) {
      var Result = undefined;
      if ($Is(control$11,TLayoutImpl)) {
         Result = $As(control$11,TLayoutImpl).FBounds.Height$11;
         if (Result==null) {
            Result = $As(control$11,TLayoutImpl).FConfig.FHeight$2;
         }
         if (Result!=null) {
            Result = Result+$As(control$11,TLayoutImpl).FConfig.FMargins.Top$3+$As(control$11,TLayoutImpl).FConfig.FMargins.Bottom$1;
         }
      } else if (TW3MovableControl.GetVisible($As(control$11,TW3CustomControl))) {
         Result = TW3MovableControl.GetHeight($As(control$11,TW3CustomControl));
      } else {
         Result = 0;
      }
      return Result
   }
   /// function Dimensions.GetLeft(control: TObject) : Variant
   ///  [line: 405, column: 27, file: SmartCL.Layout]
   ,GetLeft$4:function(Self, control$12) {
      var Result = undefined;
      if ($Is(control$12,TLayoutImpl)) {
         Result = $As(control$12,TLayoutImpl).FBounds.Left$10-$As(control$12,TLayoutImpl).FConfig.FMargins.Left$3;
      } else {
         Result = TW3MovableControl.GetLeft($As(control$12,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetOwnerLeft(control: TObject) : Variant
   ///  [line: 414, column: 27, file: SmartCL.Layout]
   ,GetOwnerLeft:function(Self, control$13) {
      var Result = undefined;
      Result = 0;
      if ($Is(control$13,TW3MovableControl)) {
         control$13 = TW3TagContainer.a$52($As(control$13,TW3MovableControl));
         if ((control$13!==null)&&$Is(control$13,TW3MovableControl)) {
            Result = TW3MovableControl.GetLeft($As(control$13,TW3MovableControl));
         }
      }
      return Result
   }
   /// function Dimensions.GetOwnerTop(control: TObject) : Variant
   ///  [line: 424, column: 27, file: SmartCL.Layout]
   ,GetOwnerTop:function(Self, control$14) {
      var Result = undefined;
      Result = 0;
      if ($Is(control$14,TW3MovableControl)) {
         control$14 = TW3TagContainer.a$52($As(control$14,TW3MovableControl));
         if ((control$14!==null)&&$Is(control$14,TW3MovableControl)) {
            Result = TW3MovableControl.GetTop($As(control$14,TW3MovableControl));
         }
      }
      return Result
   }
   /// function Dimensions.GetTop(control: TObject) : Variant
   ///  [line: 439, column: 27, file: SmartCL.Layout]
   ,GetTop$1:function(Self, control$15) {
      var Result = undefined;
      if ($Is(control$15,TLayoutImpl)) {
         Result = $As(control$15,TLayoutImpl).FBounds.Top$10-$As(control$15,TLayoutImpl).FConfig.FMargins.Top$3;
      } else {
         Result = TW3MovableControl.GetTop($As(control$15,TW3CustomControl));
      }
      return Result
   }
   /// function Dimensions.GetWidth(control: TObject) : Variant
   ///  [line: 453, column: 27, file: SmartCL.Layout]
   ,GetWidth$8:function(Self, control$16) {
      var Result = undefined;
      if ($Is(control$16,TLayoutImpl)) {
         Result = $As(control$16,TLayoutImpl).FBounds.Width$13;
         if (Result==null) {
            Result = $As(control$16,TLayoutImpl).FConfig.FWidth$2;
         }
         if (Result!=null) {
            Result = Result+$As(control$16,TLayoutImpl).FConfig.FMargins.Left$3+$As(control$16,TLayoutImpl).FConfig.FMargins.Right$1;
         }
      } else if (TW3MovableControl.GetVisible($As(control$16,TW3CustomControl))) {
         Result = TW3MovableControl.GetWidth($As(control$16,TW3CustomControl));
      } else {
         Result = 0;
      }
      return Result
   }
   /// function Dimensions.HasHeight(control: TObject) : Boolean
   ///  [line: 470, column: 27, file: SmartCL.Layout]
   ,HasHeight:function(Self, control$17) {
      var Result = false;
      Result = true;
      if ($Is(control$17,TLayoutImpl)) {
         Result = $As(control$17,TLayoutImpl).FBounds.Height$11!=null;
      }
      return Result
   }
   /// function Dimensions.HasWidth(control: TObject) : Boolean
   ///  [line: 477, column: 27, file: SmartCL.Layout]
   ,HasWidth:function(Self, control$18) {
      var Result = false;
      Result = true;
      if ($Is(control$18,TLayoutImpl)) {
         Result = $As(control$18,TLayoutImpl).FBounds.Width$13!=null;
      }
      return Result
   }
   /// procedure Dimensions.SetBottom(control: TObject; value: Integer)
   ///  [line: 522, column: 28, file: SmartCL.Layout]
   ,SetBottom$1:function(Self, control$19, value$33) {
      if ($Is(control$19,TLayoutImpl)) {
         TLayoutRect$SetTop$1($As(control$19,TLayoutImpl).FBounds,parseInt((value$33-$As(control$19,TLayoutImpl).FConfig.FMargins.Bottom$1-$As(control$19,TLayoutImpl).FBounds.Height$11),10));
      } else {
         TW3MovableControl.SetTop($As(control$19,TW3CustomControl),(value$33-TW3MovableControl.GetHeight($As(control$19,TW3CustomControl))));
      }
   }
   /// procedure Dimensions.SetHeight(control: TObject; value: Integer)
   ///  [line: 484, column: 28, file: SmartCL.Layout]
   ,SetHeight$5:function(Self, control$20, value$34) {
      if ($Is(control$20,TLayoutImpl)) {
         TLayoutRect$SetHeight$4($As(control$20,TLayoutImpl).FBounds,value$34-$As(control$20,TLayoutImpl).FConfig.FMargins.Top$3-$As(control$20,TLayoutImpl).FConfig.FMargins.Bottom$1);
      } else {
         TW3MovableControl.SetHeight$($As(control$20,TW3CustomControl),value$34);
      }
   }
   /// procedure Dimensions.SetLeft(control: TObject; value: Integer)
   ///  [line: 494, column: 28, file: SmartCL.Layout]
   ,SetLeft$5:function(Self, control$21, value$35) {
      if ($Is(control$21,TLayoutImpl)) {
         TLayoutRect$SetLeft$4($As(control$21,TLayoutImpl).FBounds,value$35+$As(control$21,TLayoutImpl).FConfig.FMargins.Left$3);
      } else {
         TW3MovableControl.SetLeft($As(control$21,TW3CustomControl),value$35);
      }
   }
   /// procedure Dimensions.SetRight(control: TObject; value: Integer)
   ///  [line: 503, column: 28, file: SmartCL.Layout]
   ,SetRight$4:function(Self, control$22, value$36) {
      if ($Is(control$22,TLayoutImpl)) {
         TLayoutRect$SetLeft$4($As(control$22,TLayoutImpl).FBounds,parseInt((value$36-$As(control$22,TLayoutImpl).FConfig.FMargins.Right$1-$As(control$22,TLayoutImpl).FBounds.Width$13),10));
      } else {
         TW3MovableControl.SetLeft($As(control$22,TW3CustomControl),(value$36-TW3MovableControl.GetWidth($As(control$22,TW3CustomControl))));
      }
   }
   /// procedure Dimensions.SetTop(control: TObject; value: Integer)
   ///  [line: 513, column: 28, file: SmartCL.Layout]
   ,SetTop$2:function(Self, control$23, value$37) {
      if ($Is(control$23,TLayoutImpl)) {
         TLayoutRect$SetTop$1($As(control$23,TLayoutImpl).FBounds,value$37+$As(control$23,TLayoutImpl).FConfig.FMargins.Top$3);
      } else {
         TW3MovableControl.SetTop($As(control$23,TW3CustomControl),value$37);
      }
   }
   /// procedure Dimensions.SetWidth(control: TObject; value: Integer)
   ///  [line: 532, column: 28, file: SmartCL.Layout]
   ,SetWidth$6:function(Self, control$24, value$38) {
      if ($Is(control$24,TLayoutImpl)) {
         TLayoutRect$SetWidth$5($As(control$24,TLayoutImpl).FBounds,value$38-$As(control$24,TLayoutImpl).FConfig.FMargins.Left$3-$As(control$24,TLayoutImpl).FConfig.FMargins.Right$1);
      } else {
         TW3MovableControl.SetWidth$($As(control$24,TW3CustomControl),value$38);
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
///  [line: 18, column: 3, file: SmartCL.Controls.Panel]
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
};
TW3CustomPanel.$Intf={
   IW3ComponentState:[TW3TagObj.AddToComponentState,TW3TagObj.RemoveFromComponentState]
   ,IW3OwnedObjectAccess:[TW3OwnedObject.AcceptOwner,TW3OwnedObject.SetOwner,TW3OwnedObject.GetOwner]
}
/// TW3Panel = class (TW3CustomPanel)
///  [line: 21, column: 3, file: SmartCL.Controls.Panel]
var TW3Panel = {
   $ClassName:"TW3Panel",$Parent:TW3CustomPanel
   ,$Init:function ($) {
      TW3CustomPanel.$Init($);
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
   ,Create$85:TW3TagContainer.Create$85
   ,Invalidate:TW3MovableControl.Invalidate
   ,ObjectReady:TW3MovableControl.ObjectReady
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
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
         var LHandle$21 = undefined;
         try {
            LHandle$21 = new Image();
         } catch ($e) {
            var e$41 = $W($e);
            if (OnComplete) {
               OnComplete(FromUrl$1,null,false);
            }
            return Result.v;
         }
         if (LHandle$21) {
            if (OnComplete) {
               LHandle$21.onload = function () {
                  OnComplete(FromUrl$1,LHandle$21,true);
               };
               LHandle$21.onerror = function () {
                  OnComplete(FromUrl$1,LHandle$21,false);
               };
            }
            LHandle$21.src = FromUrl$1;
            Result.v = LHandle$21;
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
   ,a$152:function(Self) {
      return String(TW3HttpRequest.a$150(Self).responseXML);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 89, column: 40, file: SmartCL.net.http]
   ,a$151:function(Self) {
      return Self.FReqObj.responseText;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 86, column: 35, file: SmartCL.net.http]
   ,a$150:function(Self) {
      return Self.FReqObj;
   }
   /// constructor TW3HttpRequest.Create()
   ///  [line: 118, column: 28, file: SmartCL.net.http]
   ,Create$146:function(Self) {
      TObject.Create(Self);
      Self.FReqObj = new XMLHttpRequest();
      Self.FReqObj.onreadystatechange = $Event0(Self,TW3HttpRequest.HandleReadyStateChange);
      Self.FReqObj.onerror = $Event0(Self,TW3HttpRequest.HandleOnError);
      Self.FReqObj.onload = $Event0(Self,TW3HttpRequest.HandleOnLoad);
      Self.FReqObj.ontimeout = $Event0(Self,TW3HttpRequest.HandleOnTimeout);
      Self.FheaderCache = THttpHeaders.Create$148($New(THttpHeaders));
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
      var mTemp$7 = null;
      mTemp$7 = TW3HttpRequest.ResponseAsBinaryData(Self);
      if (mTemp$7!==null) {
         Result = TBinaryData.ToStream(mTemp$7);
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
      var x$79 = 0;
      var LName$5 = "",
         LData$4 = "";
      if (THttpHeaders.Count$8(Self.FheaderCache)>0) {
         try {
            var $temp63;
            for(x$79=0,$temp63=THttpHeaders.Count$8(Self.FheaderCache);x$79<$temp63;x$79++) {
               LName$5 = THttpHeaders.a$165(Self.FheaderCache,x$79);
               LData$4 = THttpHeaders.a$166(Self.FheaderCache,x$79);
               Self.FReqObj.setRequestHeader(LName$5,LData$4);
            }
         } finally {
            THttpHeaders.Clear$13(Self.FheaderCache);
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
   ,a$167:function(Self, idx$3, Value$29) {
      Self.FValues[idx$3]=Value$29;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 59, column: 53, file: SmartCL.net.http]
   ,a$166:function(Self, idx$4) {
      return Self.FValues[idx$4];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 57, column: 47, file: SmartCL.net.http]
   ,a$165:function(Self, idx$5) {
      return Self.FNames[idx$5];
   }
   /// procedure THttpHeaders.Add(Header: String)
   ///  [line: 287, column: 24, file: SmartCL.net.http]
   ,Add$7:function(Self, Header) {
      var kv = [];
      kv = (Header).split(":");
      if (kv.length>0) {
         THttpHeaders.SetValue(Self,kv[0],(kv.length>1)?kv[1]:"");
      }
   }
   /// procedure THttpHeaders.Assign(Headers: THttpHeaders)
   ///  [line: 300, column: 24, file: SmartCL.net.http]
   ,Assign$5:function(Self, Headers$1) {
      var i$2 = 0;
      var name$29 = "";
      var $temp64;
      for(i$2=0,$temp64=THttpHeaders.Count$8(Headers$1);i$2<$temp64;i$2++) {
         name$29 = THttpHeaders.a$165(Headers$1,i$2);
         THttpHeaders.SetValue(Self,name$29,THttpHeaders.GetValue(Headers$1,name$29));
      }
   }
   /// procedure THttpHeaders.Assign(Headers: array of String)
   ///  [line: 294, column: 24, file: SmartCL.net.http]
   ,Assign$4:function(Self, Headers$2) {
      var a$206 = 0;
      var header = "";
      var $temp65;
      for(a$206=0,$temp65=Headers$2.length;a$206<$temp65;a$206++) {
         header = Headers$2[a$206];
         THttpHeaders.Add$7(Self,header);
      }
   }
   /// procedure THttpHeaders.Clear()
   ///  [line: 276, column: 24, file: SmartCL.net.http]
   ,Clear$13:function(Self) {
      Self.FNames.length=0;
      Self.FValues.length=0;
   }
   /// function THttpHeaders.Count() : Integer
   ///  [line: 308, column: 23, file: SmartCL.net.http]
   ,Count$8:function(Self) {
      return Self.FNames.length;
   }
   /// constructor THttpHeaders.Create(headers: THttpHeaders)
   ///  [line: 270, column: 26, file: SmartCL.net.http]
   ,Create$149:function(Self, headers$1) {
      THttpHeaders.Create$148(Self);
      THttpHeaders.Assign$5(Self,headers$1);
      return Self
   }
   /// constructor THttpHeaders.Create()
   ///  [line: 259, column: 26, file: SmartCL.net.http]
   ,Create$148:function(Self) {
      TObject.Create(Self);
      return Self
   }
   /// constructor THttpHeaders.Create(headers: array of String)
   ///  [line: 264, column: 26, file: SmartCL.net.http]
   ,Create$147:function(Self, headers$2) {
      THttpHeaders.Create$148(Self);
      THttpHeaders.Assign$4(Self,headers$2);
      return Self
   }
   /// function THttpHeaders.GetValue(name: String) : String
   ///  [line: 326, column: 23, file: SmartCL.net.http]
   ,GetValue:function(Self, name$30) {
      var Result = "";
      var idx$6 = 0;
      idx$6 = THttpHeaders.IndexOf$3(Self,name$30);
      Result = (idx$6>=0)?THttpHeaders.a$166(Self,idx$6):"";
      return Result
   }
   /// function THttpHeaders.IndexOf(Name: String) : Integer
   ///  [line: 332, column: 23, file: SmartCL.net.http]
   ,IndexOf$3:function(Self, Name$22) {
      var Result = 0;
      var ucName = "";
      ucName = (Name$22).toLocaleUpperCase();
      var $temp66;
      for(Result=0,$temp66=THttpHeaders.Count$8(Self);Result<$temp66;Result++) {
         if ((THttpHeaders.a$165(Self,Result)).toLocaleUpperCase()==ucName) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// procedure THttpHeaders.SetValue(name: String; value: String)
   ///  [line: 341, column: 24, file: SmartCL.net.http]
   ,SetValue:function(Self, name$31, value$39) {
      var idx$7 = 0;
      idx$7 = THttpHeaders.IndexOf$3(Self,name$31);
      if (idx$7>=0) {
         THttpHeaders.a$167(Self,idx$7,value$39);
      } else {
         Self.FNames.push(name$31);
         Self.FValues.push(value$39);
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
      var LIndex$4 = 0;
      LIndex$4 = Self.FBindings.indexOf(Binding$1);
      if (LIndex$4>=0) {
         Self.FBindings.splice(LIndex$4,1)
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
   ICodecProcess:[TCustomCodec.Encode,TCustomCodec.Decode]
   ,ICodecBinding:[TCustomCodec.RegisterBinding,TCustomCodec.UnRegisterBinding]
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
   ,Encode:function(Self, Source$5, Target$6) {
      var LReader = null;
      var LWriter = null;
      var LChar$2 = "";
      var LTemp$3 = "";
      var LEncoded = "";
      LReader = TW3CustomReader.Create$29($New(TStreamReader),Source$5);
      try {
         LWriter = TW3CustomWriter.Create$22($New(TStreamWriter),Target$6);
         try {
            do {
               LChar$2 = TW3CustomReader.ReadChar(LReader);
               LTemp$3 = TString.EncodeURI(TString,LChar$2);
               LEncoded+=LTemp$3;
            } while (!TW3CustomReader.a$24(LReader));
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
   ,Decode:function(Self, Source$6, Target$7) {
      var LReader$1 = null;
      var LWriter$1 = null;
      var LChar$3 = "";
      var LTemp$4 = "";
      var LDecoded = "";
      LReader$1 = TW3CustomReader.Create$29($New(TReader),Source$6);
      try {
         LWriter$1 = TW3CustomWriter.Create$22($New(TWriter),Target$7);
         try {
            while (!TW3CustomReader.a$24(LReader$1)) {
               LChar$3 = TW3CustomReader.ReadChar(LReader$1);
               LTemp$4 = TString.DecodeURI(TString,LChar$3);
               LDecoded+=LTemp$4;
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
      var LAccess$2 = null;
      var LVersion = {viMajor:0,viMinor:0,viRevision:0};
      Result = TObject.Create($New(TCodecInfo));
      LVersion.viMajor = 0;
      LVersion.viMinor = 1;
      LVersion.viRevision = 0;
      LAccess$2 = $AsIntf(Result,"ICodecInfo");
      LAccess$2[0]("Base64Codec");
      LAccess$2[1]("text\/base64");
      LAccess$2[2](LVersion);
      LAccess$2[3]([6]);
      return Result
   }
   /// function TBase64Codec.Encode(TextToEncode: String) : String
   ///  [line: 105, column: 29, file: System.Codec.Base64]
   ,Encode$5:function(Self, TextToEncode$2) {
      var Result = "";
      var LBytes$2 = [],
         chr1 = 0;
      var chr2 = 0;
      var chr3 = 0;
      var enc1 = 0;
      var enc2 = 0;
      var enc3 = 0;
      var enc4 = 0;
      var i$3 = 0;
      LBytes$2 = TString.EncodeUTF8(TString,TextToEncode$2);
      if (LBytes$2.length>0) {
         i$3 = 0;
         while (i$3<LBytes$2.length) {
            chr1 = LBytes$2[i$3];
            ++i$3;
            chr2 = LBytes$2[i$3];
            ++i$3;
            chr3 = LBytes$2[i$3];
            ++i$3;
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
      var x$80 = 0;
      TextToDecode$1 = TString.ForEach(TString,TextToDecode$1,function (Sample) {
         return (((Sample>="A")&&(Sample<="Z"))||((Sample>="a")&&(Sample<="z"))||((Sample>="0")&&(Sample<="9"))||(Sample=="+")||(Sample=="\/")||(Sample=="="));
      });
      x$80 = 1;
      while (x$80<TextToDecode$1.length) {
         enc1$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$80-1))+1);
         ++x$80;
         enc2$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$80-1))+1);
         ++x$80;
         enc3$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$80-1))+1);
         ++x$80;
         enc4$1 = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/=".indexOf(TextToDecode$1.charAt(x$80-1))+1);
         ++x$80;
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
      var a$207 = 0;
      var LItem$11 = null;
      var a$208 = [];
      Result = null;
      a$208 = Self.FCodecs;
      var $temp67;
      for(a$207=0,$temp67=a$208.length;a$207<$temp67;a$207++) {
         LItem$11 = a$208[a$207];
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
      var a$209 = 0;
      var LItem$12 = null;
      try {
         var a$210 = [];
         a$210 = Self.FCodecs;
         var $temp68;
         for(a$209=0,$temp68=a$210.length;a$209<$temp68;a$209++) {
            LItem$12 = a$210[a$209];
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
function TCodecDataFlowHelper$Ordinal(Self$41) {
   var Result = 0;
   Result = 0;
   if ($SetIn(Self$41,1,0,3)) {
      ++Result;
   }
   if ($SetIn(Self$41,2,0,3)) {
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
      var LAccess$3 = null;
      TObject.Create(Self);
      if (EndPoint) {
         Self.FCodec = EndPoint;
         LAccess$3 = $AsIntf(Self.FCodec,"ICodecBinding");
         LAccess$3[0](Self);
      } else {
         throw Exception.Create($New(Exception),"Binding failed, invalid endpoint error");
      }
      return Self
   }
   /// destructor TCodecBinding.Destroy()
   ///  [line: 376, column: 26, file: system.codec]
   ,Destroy:function(Self) {
      var LAccess$4 = null;
      LAccess$4 = $AsIntf(Self.FCodec,"ICodecBinding");
      LAccess$4[1](Self);
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
   ,Encode:function(Self, Source$7, Target$8) {
      var LReader$2 = null;
      var LWriter$2 = null;
      var LChar$4 = "";
      var LTemp$5 = "";
      var LEncoded$1 = "";
      LReader$2 = TW3CustomReader.Create$29($New(TStreamReader),Source$7);
      try {
         LWriter$2 = TW3CustomWriter.Create$22($New(TStreamWriter),Target$8);
         try {
            do {
               LChar$4 = TW3CustomReader.ReadChar(LReader$2);
               LTemp$5 = TURLCodec.Encode$1(TURLCodec,LChar$4);
               LEncoded$1+=LTemp$5;
            } while (!TW3CustomReader.a$24(LReader$2));
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
   ,Decode:function(Self, Source$8, Target$9) {
      var LReader$3 = null;
      var LWriter$3 = null;
      var LChar$5 = "";
      var LTemp$6 = "";
      var LDecoded$1 = "";
      LReader$3 = TW3CustomReader.Create$29($New(TReader),Source$8);
      try {
         LWriter$3 = TW3CustomWriter.Create$22($New(TWriter),Target$9);
         try {
            while (!TW3CustomReader.a$24(LReader$3)) {
               LChar$5 = TW3CustomReader.ReadChar(LReader$3);
               LTemp$6 = TURLCodec.Decode$1(TURLCodec,LChar$5);
               LDecoded$1+=LTemp$6;
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
      var LAccess$5 = null;
      var LVersion$1 = {viMajor:0,viMinor:0,viRevision:0};
      Result = TObject.Create($New(TCodecInfo));
      LVersion$1.viMajor = 0;
      LVersion$1.viMinor = 1;
      LVersion$1.viRevision = 0;
      LAccess$5 = $AsIntf(Result,"ICodecInfo");
      LAccess$5[0]("URLCodec");
      LAccess$5[1]("text\/url-encoded");
      LAccess$5[2](LVersion$1);
      LAccess$5[3]([6]);
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
var a$2 = 0;
var a$5 = 0;
var a$4 = 0;
var a$3 = 0;
var a$6 = 0;
var a$7 = 0;
var CRC_Table_Ready = false;
var CRC_Table = function () {
      for (var r=[],i=0; i<513; i++) r.push(0);
      return r
   }();
var a$14 = null;
var a$13 = false;
var vColorNames = [],
   vColorNames = ["aqua", "black", "blue", "fuchsia", "green", "gray", "lime", "maroon", "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"].slice();
var vColorValues = [],
   vColorValues = ["#0ff", "#000", "#00f", "#f0f", "#008000", "#808080", "#0f0", "#800000", "#000080", "#808000", "#800080", "#f00", "#c0c0c0", "#008080", "#fff", "#ff00"].slice();
var __ByteToHexLUT = function () {
      for (var r=[],i=0; i<256; i++) r.push("");
      return r
   }(),
   __HexToByteLUT,
   __StrByteLUT;
var __ByteToHexLUT = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
var __HexToByteLUT = JSON.parse("{\"00\":0,\"01\":1,\"02\":2,\"03\":3,\"04\":4,\"05\":5,\"06\":6,\"07\":7,\"08\":8,\"09\":9,\r\n\"0a\":10,\"0b\":11,\"0c\":12,\"0d\":13,\"0e\":14,\"0f\":15,\"10\":16,\"11\":17,\"12\":18,\r\n\"13\":19,\"14\":20,\"15\":21,\"16\":22,\"17\":23,\"18\":24,\"19\":25,\"1a\":26,\"1b\":27,\r\n\"1c\":28,\"1d\":29,\"1e\":30,\"1f\":31,\"20\":32,\"21\":33,\"22\":34,\"23\":35,\"24\":36,\r\n\"25\":37,\"26\":38,\"27\":39,\"28\":40,\"29\":41,\"2a\":42,\"2b\":43,\"2c\":44,\"2d\":45,\r\n\"2e\":46,\"2f\":47,\"30\":48,\"31\":49,\"32\":50,\"33\":51,\"34\":52,\"35\":53,\"36\":54,\r\n\"37\":55,\"38\":56,\"39\":57,\"3a\":58,\"3b\":59,\"3c\":60,\"3d\":61,\"3e\":62,\"3f\":63,\r\n\"40\":64,\"41\":65,\"42\":66,\"43\":67,\"44\":68,\"45\":69,\"46\":70,\"47\":71,\"48\":72,\r\n\"49\":73,\"4a\":74,\"4b\":75,\"4c\":76,\"4d\":77,\"4e\":78,\"4f\":79,\"50\":80,\"51\":81,\r\n\"52\":82,\"53\":83,\"54\":84,\"55\":85,\"56\":86,\"57\":87,\"58\":88,\"59\":89,\"5a\":90,\r\n\"5b\":91,\"5c\":92,\"5d\":93,\"5e\":94,\"5f\":95,\"60\":96,\"61\":97,\"62\":98,\"63\":99,\r\n\"64\":100,\"65\":101,\"66\":102,\"67\":103,\"68\":104,\"69\":105,\"6a\":106,\"6b\":107,\r\n\"6c\":108,\"6d\":109,\"6e\":110,\"6f\":111,\"70\":112,\"71\":113,\"72\":114,\"73\":115,\r\n\"74\":116,\"75\":117,\"76\":118,\"77\":119,\"78\":120,\"79\":121,\"7a\":122,\"7b\":123,\r\n\"7c\":124,\"7d\":125,\"7e\":126,\"7f\":127,\"80\":128,\"81\":129,\"82\":130,\"83\":131,\r\n\"84\":132,\"85\":133,\"86\":134,\"87\":135,\"88\":136,\"89\":137,\"8a\":138,\"8b\":139,\r\n\"8c\":140,\"8d\":141,\"8e\":142,\"8f\":143,\"90\":144,\"91\":145,\"92\":146,\"93\":147,\r\n\"94\":148,\"95\":149,\"96\":150,\"97\":151,\"98\":152,\"99\":153,\"9a\":154,\"9b\":155,\r\n\"9c\":156,\"9d\":157,\"9e\":158,\"9f\":159,\"a0\":160,\"a1\":161,\"a2\":162,\"a3\":163,\r\n\"a4\":164,\"a5\":165,\"a6\":166,\"a7\":167,\"a8\":168,\"a9\":169,\"aa\":170,\"ab\":171,\r\n\"ac\":172,\"ad\":173,\"ae\":174,\"af\":175,\"b0\":176,\"b1\":177,\"b2\":178,\"b3\":179,\r\n\"b4\":180,\"b5\":181,\"b6\":182,\"b7\":183,\"b8\":184,\"b9\":185,\"ba\":186,\"bb\":187,\r\n\"bc\":188,\"bd\":189,\"be\":190,\"bf\":191,\"c0\":192,\"c1\":193,\"c2\":194,\"c3\":195,\r\n\"c4\":196,\"c5\":197,\"c6\":198,\"c7\":199,\"c8\":200,\"c9\":201,\"ca\":202,\"cb\":203,\r\n\"cc\":204,\"cd\":205,\"ce\":206,\"cf\":207,\"d0\":208,\"d1\":209,\"d2\":210,\"d3\":211,\r\n\"d4\":212,\"d5\":213,\"d6\":214,\"d7\":215,\"d8\":216,\"d9\":217,\"da\":218,\"db\":219,\r\n\"dc\":220,\"dd\":221,\"de\":222,\"df\":223,\"e0\":224,\"e1\":225,\"e2\":226,\"e3\":227,\r\n\"e4\":228,\"e5\":229,\"e6\":230,\"e7\":231,\"e8\":232,\"e9\":233,\"ea\":234,\"eb\":235,\r\n\"ec\":236,\"ed\":237,\"ee\":238,\"ef\":239,\"f0\":240,\"f1\":241,\"f2\":242,\"f3\":243,\r\n\"f4\":244,\"f5\":245,\"f6\":246,\"f7\":247,\"f8\":248,\"f9\":249,\"fa\":250,\"fb\":251,\r\n\"fc\":252,\"fd\":253,\"fe\":254,\"ff\":255}");
var __StrByteLUT = JSON.parse("{\"0\":0,\"1\":1,\"2\":2,\"3\":3,\"4\":4,\"5\":5,\"6\":6,\"7\":7,\"8\":8,\"9\":9,\"10\":10,\"11\":11,\r\n\"12\":12,\"13\":13,\"14\":14,\"15\":15,\"16\":16,\"17\":17,\"18\":18,\"19\":19,\"20\":20,\r\n\"21\":21,\"22\":22,\"23\":23,\"24\":24,\"25\":25,\"26\":26,\"27\":27,\"28\":28,\"29\":29,\r\n\"30\":30,\"31\":31,\"32\":32,\"33\":33,\"34\":34,\"35\":35,\"36\":36,\"37\":37,\"38\":38,\r\n\"39\":39,\"40\":40,\"41\":41,\"42\":42,\"43\":43,\"44\":44,\"45\":45,\"46\":46,\"47\":47,\r\n\"48\":48,\"49\":49,\"50\":50,\"51\":51,\"52\":52,\"53\":53,\"54\":54,\"55\":55,\"56\":56,\r\n\"57\":57,\"58\":58,\"59\":59,\"60\":60,\"61\":61,\"62\":62,\"63\":63,\"64\":64,\"65\":65,\r\n\"66\":66,\"67\":67,\"68\":68,\"69\":69,\"70\":70,\"71\":71,\"72\":72,\"73\":73,\"74\":74,\r\n\"75\":75,\"76\":76,\"77\":77,\"78\":78,\"79\":79,\"80\":80,\"81\":81,\"82\":82,\"83\":83,\r\n\"84\":84,\"85\":85,\"86\":86,\"87\":87,\"88\":88,\"89\":89,\"90\":90,\"91\":91,\"92\":92,\r\n\"93\":93,\"94\":94,\"95\":95,\"96\":96,\"97\":97,\"98\":98,\"99\":99,\"100\":100,\"101\":101,\r\n\"102\":102,\"103\":103,\"104\":104,\"105\":105,\"106\":106,\"107\":107,\"108\":108,\r\n\"109\":109,\"110\":110,\"111\":111,\"112\":112,\"113\":113,\"114\":114,\"115\":115,\r\n\"116\":116,\"117\":117,\"118\":118,\"119\":119,\"120\":120,\"121\":121,\"122\":122,\r\n\"123\":123,\"124\":124,\"125\":125,\"126\":126,\"127\":127,\"128\":128,\"129\":129,\r\n\"130\":130,\"131\":131,\"132\":132,\"133\":133,\"134\":134,\"135\":135,\"136\":136,\r\n\"137\":137,\"138\":138,\"139\":139,\"140\":140,\"141\":141,\"142\":142,\"143\":143,\r\n\"144\":144,\"145\":145,\"146\":146,\"147\":147,\"148\":148,\"149\":149,\"150\":150,\r\n\"151\":151,\"152\":152,\"153\":153,\"154\":154,\"155\":155,\"156\":156,\"157\":157,\r\n\"158\":158,\"159\":159,\"160\":160,\"161\":161,\"162\":162,\"163\":163,\"164\":164,\r\n\"165\":165,\"166\":166,\"167\":167,\"168\":168,\"169\":169,\"170\":170,\"171\":171,\r\n\"172\":172,\"173\":173,\"174\":174,\"175\":175,\"176\":176,\"177\":177,\"178\":178,\r\n\"179\":179,\"180\":180,\"181\":181,\"182\":182,\"183\":183,\"184\":184,\"185\":185,\r\n\"186\":186,\"187\":187,\"188\":188,\"189\":189,\"190\":190,\"191\":191,\"192\":192,\r\n\"193\":193,\"194\":194,\"195\":195,\"196\":196,\"197\":197,\"198\":198,\"199\":199,\r\n\"200\":200,\"201\":201,\"202\":202,\"203\":203,\"204\":204,\"205\":205,\"206\":206,\r\n\"207\":207,\"208\":208,\"209\":209,\"210\":210,\"211\":211,\"212\":212,\"213\":213,\r\n\"214\":214,\"215\":215,\"216\":216,\"217\":217,\"218\":218,\"219\":219,\"220\":220,\r\n\"221\":221,\"222\":222,\"223\":223,\"224\":224,\"225\":225,\"226\":226,\"227\":227,\r\n\"228\":228,\"229\":229,\"230\":230,\"231\":231,\"232\":232,\"233\":233,\"234\":234,\r\n\"235\":235,\"236\":236,\"237\":237,\"238\":238,\"239\":239,\"240\":240,\"241\":241,\r\n\"242\":242,\"243\":243,\"244\":244,\"245\":245,\"246\":246,\"247\":247,\"248\":248,\r\n\"249\":249,\"250\":250,\"251\":251,\"252\":252,\"253\":253,\"254\":254,\"255\":255}");
var vCurrent = null;
var FFocused = null;
var FLUT = null;
var FOLUT = null;
var RegisterComponentsProc = null;
var EventManager = null;
var __AnimID = 0;
var DefaultDuration = 2;
var DefaultTiming = 1;
var FGlobalSheet = null;
var vGetNow,
   vIsHighResolution = false;
var PressedCSSClass = "TW3Button_Pressed";
var Instance = null;
var Application$1 = null,
   NullConfig = null,
   Logger = "";
var LayoutCount = 0;
var NullConfig = TObject.Create($New(TLayoutConfigImpl));
var GForms = null;
var __LabelStyles = null;
var cYesNoLUT = ["",""],
   cW3AnimationTiming = ["","","","",""];
var cYesNoLUT = ["no", "yes"];
var cW3AnimationTiming = ["ease", "linear", "ease-in", "ease-out", "ease-in-out"];
var _BatchLoadImages = [],
   vRequestAnimFrame = null;
var vCancelAnimFrame = null;
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
var GlobalRepeaterList = [],
   __CONV_BUFFER = null;
var __CONV_VIEW = null;
var __CONV_ARRAY = null;
var __SIZES = [0,0,0,0,0,0,0,0,0,0,0],
   _NAMES = ["","","","","","","","","","",""];
var __SIZES = [0, 1, 1, 2, 2, 4, 2, 4, 4, 8, 8];
var _NAMES = ["Unknown", "Boolean", "Byte", "Char", "Word", "Longword", "Smallint", "Integer", "Single", "Double", "String"];
var __UniqueNumber = 0;
var __TYPE_MAP = {Boolean:undefined,Number$1:undefined,String$1:undefined,Object$2:undefined,Undefined:undefined,Function$1:undefined};
var __Manager = null;
SetupTypeLUT();
SetupConversionLUT();
TCodecManager.RegisterCodec(CodecManager(),TURLCodec);
TCodecManager.RegisterCodec(CodecManager(),TBase64Codec);
SetupMouseCursorTable();
InitAnimationFrameShim();
TApplicationFormsList.RegisterAutoCreate(Forms$2(),"Form1",true,true);
SetupTextBehaviorStyles();
TApplicationFormsList.RegisterForm(Forms$2(),"Form1",TForm1);
var $Application = function() {
   try {
      Application$1 = TW3CustomApplication.Create$3($New(TApplication));
      TW3CustomApplication.RunApp(Application$1);
   } catch ($e) {
      var e$42 = $W($e);
      alert(e$42.FMessage)   }
}
$Application();
var $Application = function() {
   if (_FontDetect) {
      TObject.Free(_FontDetect);
   }
}
$Application();

