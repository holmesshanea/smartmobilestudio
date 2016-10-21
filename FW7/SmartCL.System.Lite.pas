{ **************************************************************************** }
{ }
{ Smart Mobile Studio - Runtime Library }
{ }
{ Copyright © 2012-2014 Optimale Systemer AS. }
{ }
{ **************************************************************************** }

unit SmartCL.System.Lite;

{ ------------------------------------------------------------------------------ }
{ Author:    Jon Lennart Aasenden }
{ Updated:   2012.04.24 (YYYY.MM.DD) }
{ ------------------------------------------------------------------------------ }

{$I 'SmartCL.inc'}

interface

// uses  System.Types;

const
  sHtmlLineBreak = '<br>';

type

  TDate = float;
  TTime = float;
  Float32 = float;
  Float64 = Variant;

  Real = float;
  Double = Float64;
  Single = Float32;
  Extended = float;
  TColor = Integer;
  Byte = Integer;
  Char = String;

  THandle = Variant;
  THandleArray = array of THandle;
  TControlHandle = Variant;
  TProcedureRef = procedure;
  TDateTime = float;

  TNotifyEvent = procedure(Sender: TObject);

  TObjArray = array of TObject;
  TIntArray = array of Integer;
  TStrArray = array of String;
  TFloatArray = array of float;
  TByteArray = array of Byte;
  TProcedureRefArray = array of TProcedureRef;

  // ------------

  (* A memory handle is a reference to a Typed-ARRAY, *NOT* an
    Array-buffer. This is a crucial distinction to make since helper
    methods for testing reference validity must be able to consume
    the type properly *)
  TMemoryHandle = Variant;

  (* This handle is for Array-Buffers. These buffers cannot be accessed
    directly. You must create an untyped-array to access them.
    NOTE: This handle is very different from TMemoryHandle (!!!) *)
  TBufferHandle = THandle;

type
  JR = class
    external procedure WriteLn(str: Variant);
  end;

type
  { TVariant }
  TVariant = class
  public
    class function AsInteger(const aValue: Variant): Integer; static;
    class function AsString(const aValue: Variant): String; static;
    class function AsFloat(const aValue: Variant): float; static;
    class function AsObject(const aValue: Variant): TObject; static;
    class function AsBool(const aValue: Variant): Boolean; static;
    class function IsNull(const aValue: Variant): Boolean; static;
    class function IsString(const aValue: Variant): Boolean; static;
    class function IsNumber(const aValue: Variant): Boolean; static;
    class function IsInteger(const aValue: Variant): Boolean; static;
    class function IsBool(const aValue: Variant): Boolean; static;
    class function IsNAN(const aValue: Variant): Boolean; static;
    class function Properties(const aValue: Variant): TStrArray; static;
    class function OwnProperties(const aValue: Variant): TStrArray; static;
    class function CreateObject: Variant; static;
    class function CreateArray: Variant; static;
    (* This is a helper class for the buffer handle *)
    function Valid: Boolean;
    function Equals(const Source: TBufferHandle): Boolean;
  end;

  {
    (* This is a helper class for memory-handles *)
    TMemoryHandleHelper = helper
    for TMemoryHandle function Valid: Boolean;
    Function Defined: Boolean;
    function UnDefined: Boolean;
    function Equals(const Source: TMemoryHandle): Boolean;
    end;
  }

  { EW3Exception }
  EW3Exception = class(Exception)
  public
    constructor CreateFmt(aText: String; const aValues: array of const);
  end;

  { EW3OwnedObject }
  EW3OwnedObject = class(EW3Exception);

  { TW3OwnedObject }
  TW3OwnedObject = class(TObject)
  private
    FOwner: TObject;
  protected
    function AcceptParent(aObject: TObject): Boolean; virtual;
  public
    property Owner: TObject read FOwner;
    constructor Create(AOwner: TObject); virtual;
  end;

  JJSON = class
    external " JSON " public function Parse(jsonData: String): Variant;
    external 'parse';
    function Stringify(const v: Variant): String; external 'stringify';
  end;
  { TControlHandleHelper = helper
    for TControlHandle function Valid: Boolean;
    function Ready: Boolean;
    function Parent: TControlHandle;
    function Root: TControlHandle;
    procedure ReadyExecute(OnReady: TProcedureRef);
    // Procedure ReadyExecuteAnimFrame(OnReady:TProcedureRef);
    function Equals(const Source: TControlHandle): Boolean;
    end;
  }

var
  JSON external 'JSON': JJSON;

  { Browser detection }
type
  TW3BrowserVendor = (bvUnknown, bviOS, bvAndroid, bvChrome, bvSafari,
    bvFirefox, bvOpera, bvIE);

  { Object management }
  // procedure w3_bind(obj_id: String; event_name: String; callback: TProcedureRef);
procedure w3_bind2(obj_ref: THandle; event_name: String;
  callback: TProcedureRef);
procedure w3_unbind(obj_ref: THandle; event_name: String);
procedure w3_AddEvent(a_tagRef: THandle; a_eventName: String;
  a_callback: TProcedureRef; a_useCapture: Boolean = true);
procedure w3_RemoveEvent(a_tagRef: THandle; a_eventName: String;
  a_callback: TProcedureRef; a_useCapture: Boolean = true);
procedure w3_setElementParentByRef(const aElement: TControlHandle;
  const aParent: TControlHandle);
procedure w3_RemoveElementByRef(const aElement: TControlHandle;
  const aParent: TControlHandle);
// function w3_createHtmlElement(aTypeName: String): THandle;
// function w3_getElementsByName(aElementName: String): array of TControlHandle;

{ property management }
function w3_getProperty(const tagRef: THandle; const aPropName: String)
  : Variant;
procedure w3_setProperty(const tagRef: THandle; const aPropName: String;
  const aValue: Variant);
function w3_getPropertyAsStr(const tagRef: THandle;
  const aPropName: String): String;
function w3_getPropertyAsInt(const tagRef: THandle;
  const aPropName: String): Integer;
function w3_getPropertyAsBool(const tagRef: THandle;
  const aPropName: String): Boolean;
function w3_getPropertyAsFloat(const tagRef: THandle;
  const aPropName: String): float;

{ Attribute management }
function w3_getAttrib(const tagRef: THandle; const aAttribName: String)
  : Variant;

procedure w3_setAttrib(const tagRef: THandle; const aAttribName: String;
  const aValue: Variant);

function w3_getAttribAsStr(const tagRef: THandle;
  const aAttribName: String): String;

function w3_getAttribAsInt(const tagRef: THandle;
  const aAttribName: String): Integer;

{ Style management }
function w3_getCalcStyleFor(const tagRef: THandle): Variant; deprecated;
function w3_getStyle(const tagRef: THandle; const aStyleName: String): Variant;
function w3_getStyleAsStr(const tagRef: THandle;
  const aStyleName: String): String;
function w3_getStyleAsInt(const tagRef: THandle;
  const aStyleName: String): Integer;
function w3_getStyleAsFloat(const tagRef: THandle;
  const aStyleName: String): float;
procedure w3_setStyle(const tagRef: THandle; const aStyleName: String;
  const aStyleValue: Variant);

// function w3_getCssStyle(tagRef: THandle; aStyleName: String): Variant;
// function w3_getCssStyleAsString(tagRef: THandle; aStyleName: String): String;
// function w3_getCssStyleAsInteger(tagRef: THandle; aStyleName: String): Integer;
// function w3_getCssStyleAsFloat(tagRef: THandle; aStyleName: String): Float;
// procedure w3_setCssStyle(tagRef: THandle; aStyleName: String; aStyleValue: String);

{ CSS management }
function w3_HasClass(tagRef: THandle; aClassName: String): Boolean;
procedure w3_AddClass(tagRef: THandle; aClassName: String);
procedure w3_RemoveClass(tagRef: THandle; aClassName: String);

{ DOM object references and helper functions }
// function  w3_Event: THandle; deprecated "Use BrowserAPI.Event";
function w3_GetInnerHtml(aRef: THandle): String;
procedure w3_SetInnerHtml(aRef: THandle; aValue: String);

{ Unique identifier functions }
{ function w3_GetUniqueObjId: String;
  function w3_GetUniqueNumber: Integer;
}

{ String functions }
function w3_StrLikeInArray(aLike: String; aArray: TStrArray): Integer;
function w3_StrToArray(aText: String; aDelimiter: String): TStrArray;
  deprecated " Use StrSplit or .Split ";
function w3_StringReplace(aValue: String; aToReplace: String; aNewValue: String)
  : String; deprecated " Use StrReplace or .Replace ";
function w3_NameToUrlStr(aUrl: String): String;

{ Misc utility functions }
// procedure WriteLn(const value: Variant);
procedure w3_ShowMessage(aText: String); deprecated " Use ShowMessage ";
function w3_Prompt(aText: String; aDefault: String = ''): String;

{ Device detection }
function w3_getIsIPad: Boolean;
function w3_getIsIPhone: Boolean;
function w3_getIsIPod: Boolean;
function w3_getIsAndroid: Boolean;
function w3_getIsSafari: Boolean;
function w3_getIsFirefox: Boolean;
function w3_getIsChrome: Boolean;
function w3_getIsInternetExplorer: Boolean;
function w3_getIsOpera: Boolean;
function w3_getIsMobile: Boolean;

{ Base 64 }
 function w3_base64encode(aValue: Variant): String;
 //function w3_base64decode(aValue: String): Variant;

{ System utility functions }
procedure w3_Callback(const aMethod: TProcedureRef; const aDelay: float);
  deprecated " Use w3_SetTimeout ";

// function  w3_DOMReady: Boolean;
// function  w3_GetBrowserName: String;
// function  w3_BrowserVendor: TW3BrowserVendor;
// function  w3_CSSPrefix(const aCSS: String): String; overload;
// function  w3_CSSPrefixDef(const aCSS: String): String;
// procedure InitVendorInfo; deprecated "Not needed anymore";
{ procedure w3_RegisterBrowserAPI
  (aDriver: TW3CustomBrowserAPI);
  function BrowserAPI
  : TW3CustomBrowserAPI;
  procedure InternalInitVendorInfo;
}
// procedure InitAnimationFrameShim;
function VarIsValidRef(const aRef: Variant): Boolean;

// -------------------------------------------------------------------------
{ Misc utility functions }
procedure Print(const value: Variant); external 'document.write';
procedure PrintLn(const value: Variant); external 'document.writeln';

{ URI functions }
function EncodeURIComponent(str: String): String; external 'encodeURIComponent';
function DecodeURIComponent(str: String): String; external 'decodeURIComponent';
function EncodeURI(str: String): String; external 'encodeURI';
function DecodeURI(str: String): String; external 'decodeURI';
procedure ShowMessage(aText: String); external 'alert';
function Prompt(aText: String; aDefault: String = ''): Variant;
  external 'prompt';
function Confirm(aText: String): Variant; external 'confirm';
function w3_SetInterval(const aMethod: TProcedureRef; const aDelay: float)
  : THandle; external " setInterval ";
procedure w3_ClearInterval(intervalHandle: THandle); external " clearInterval ";

function w3_SetTimeout(const aMethod: TProcedureRef; const aDelay: float)
  : THandle; external " setTimeout ";
procedure w3_ClearTimeout(timeoutHandle: THandle); external " clearTimeout ";

procedure WriteLn(const value: Variant);
procedure time(const value: Variant);
procedure timeEnd(const value: Variant);


Type
  THelper = Helper For TObject Procedure proc;
empty;
{ Procedure proc;
  Begin
  PrintLn('TObject.Proc!');
  End;
}
End;

Type
  THelper1 = Helper For TObject Class Function ClassName: String;
End;

Type
  THelper2 = Helper For TObject Class Function ClassName: String;
  // Class procedure WriteLn(const value: Variant);
End;

type
  TMyApp = partial class(TObject)private public
  // class var Instance: TW3CustomApplication;
    procedure WriteLn3(str: Variant);
empty;

constructor Create; virtual;
  destructor Destroy; override;
  end;

// var vUniqueNumber: Integer;

implementation

uses SmartCL.Consts;

constructor TMyApp.Create;
begin
  inherited Create;
end;

destructor TMyApp.Destroy;
begin

  inherited;
end;

Class Function THelper1.ClassName: String;
Begin
  Result := 'Helper1.' + ClassName;
End;

Class Function THelper2.ClassName: String;
Begin
  Result := 'Helper2.' + ClassName;
End;

{ function w3_DOMReady: Boolean;
  begin
  Result := (BrowserAPI.Document.readyState = 'complete');
  end;
}

{ **************************************************************************** }
{ Unique identifier functions }
{ **************************************************************************** }
{

  var
  vUniqueNumber: Integer;

  function w3_GetUniqueObjId: String;
  begin
  Inc(vUniqueNumber);
  Result := 'OBJ' + IntToStr(vUniqueNumber);
  end;

  function w3_GetUniqueNumber: Integer;
  begin
  Inc(vUniqueNumber);
  Result := vUniqueNumber;
  end;
}

// ############################################################################
// TControlHandleHelper
// ############################################################################
{
  function  TControlHandleHelper.Valid:Boolean;
  Begin
  asm
  @Result = !( (@self == undefined) || (@self == null) );
  end;
  end;

  function  TControlHandleHelper.Ready:Boolean;
  var
  mRef: TControlHandle;
  begin
  if valid then
  begin
  mRef:=root;
  result:=mRef.valid and (mRef.body);
  end;
  end;

  function  TControlHandleHelper.Parent:TControlHandle;
  begin
  if self.valid then
  result:=self.parentNode else
  result:=null;
  end;

  function  TControlHandleHelper.Root:TControlHandle;
  var
  mAncestor:  TControlHandle;
  Begin
  if valid then
  Begin
  mAncestor:=self;
  while (mAncestor.parentNode) do
  mAncestor:=mAncestor.parentNode;
  result:=mAncestor;
  end else
  result:=null;
  end;
}

{ Procedure TControlHandleHelper.ReadyExecuteAnimFrame
  (OnReady: TProcedureRef);

  procedure DelayedDispatch(EntryPoint: TProcedureRef; const Delay: Integer);
  Begin
  asm
  setTimeout(@EntryPoint,@Delay);
  end;
  end;

  Begin
  if Valid then
  begin

  (* Element already in DOM? Execute now *)
  if Ready then
  OnReady()
  else

  (* Try again ASAP *)
  DelayedDispatch(procedure()
  begin
  w3_RequestAnimationFrame(procedure()
  begin
  self.ReadyExecute(OnReady);
  end);
  end, 100);
  end;
  end;
}

{
  procedure TControlHandleHelper.ReadyExecute(OnReady:TProcedureRef);

  procedure DelayedDispatch(EntryPoint:TProcedureRef;
  const Delay:Integer);
  Begin
  asm
  setTimeout(@EntryPoint,@Delay);
  end;
  end;

  Begin
  if Valid then
  begin
  (* Element already in DOM? Execute now *)
  if Ready then
  OnReady() else

  (* Try again ASAP *)
  DelayedDispatch( procedure ()
  begin
  self.ReadyExecute(OnReady);
  end,100);
  end;
  end;

  function  TControlHandleHelper.Equals(const Source:TControlHandle):Boolean;
  begin
  asm
  @result = (@self == @Source);
  end;
  end;
}

{ System utility functions }

procedure w3_Callback(const aMethod: TProcedureRef; const aDelay: float);
begin
  w3_SetTimeout(aMethod, aDelay);
end;

// var vRequestAnimFrame: function (const meth: TProcedureRef): THandle;
// var vCancelAnimFrame : procedure (handle: THandle);

{ **************************************************************************** }
{ Base 64 }
{ **************************************************************************** }
 function w3_base64encode(aValue: Variant): String;
  begin
  //if VarIsValidRef(aValue) then
  asm return String(window.btoa(@aValue)); end;
  end;
/*
  function w3_base64decode(aValue: String): Variant;
  begin
  if aValue <> '' then
  Result := BrowserAPI.Window.atob(aValue)
  else
  Result := UnDefined;
  end;
*/

{ **************************************************************************** }
{ Device detection }
{ **************************************************************************** }

function w3_getIsIPad: Boolean;
begin
  asm
    if (navigator.userAgent.match(/iPad/i)) @Result=true;
  end;
end;

function w3_getIsIPhone: Boolean;
begin
  asm
    if (navigator.userAgent.match(/iPhone/i)) @Result=true;
  end;
end;

function w3_getIsIPod: Boolean;
begin
  asm
    if (navigator.userAgent.match(/iPod/i)) @Result=true;
  end;
end;

function w3_getIsAndroid: Boolean;
begin
  asm
    if (navigator.userAgent.match(/Android/i)) @Result=true;
  end;
end;

function w3_getIsSafari: Boolean;
begin
  asm
    if (navigator.userAgent.match(/Safari/i)) @Result=true;
  end;
end;

function w3_getIsFirefox: Boolean;
begin
  asm
    if (navigator.userAgent.match(/Firefox/i)) @Result=true;
  end;
end;

function w3_getIsChrome: Boolean;
begin
  asm
    if (navigator.userAgent.match(/Chrome/i)) @Result=true;
  end;
end;

function w3_getIsInternetExplorer: Boolean;
begin
  asm
    if (navigator.userAgent.match(/MSIE/i)) @Result=true;
  end;
end;

function w3_getIsOpera: Boolean;
begin
  asm
    if (navigator.userAgent.match(/Opera/i)) @Result=true;
  end;
end;

function w3_getIsMobile: Boolean;
begin
  asm
    if (navigator.userAgent.match(/mobi/i)) @Result=true;
  end;
end;

{ **************************************************************************** }
{ String functions }
{ **************************************************************************** }

function w3_StrLikeInArray(aLike: String; aArray: TStrArray): Integer;
var
  x: Integer;
  mLen1: Integer;
  mLen2: Integer;
begin
  Result := -1;
  mLen1 := Length(aLike);
  if (mLen1 > 0) and (aArray.Length > 0) then
  begin
    for x := 0 to aArray.Length - 1 do
    begin
      mLen2 := Length(aArray[x]);
      if mLen2 >= mLen1 then
      begin
        if Copy(aArray[x], 1, mLen1) = aLike then
        begin
          Result := x;
          break;
        end;
      end;
    end;
  end;
end;

function w3_StrToArray(aText: String; aDelimiter: String): TStrArray;
begin
  Result := aText.Split(aDelimiter);
end;

function w3_StringReplace(aValue: String; aToReplace: String;
  aNewValue: String): String;
begin
  Result := aValue.Replace(aToReplace, aNewValue);
end;

function w3_NameToUrlStr(aUrl: String): String;
begin
  Result := 'url(' + aUrl + ')';
end;

{ **************************************************************************** }
{ CSS management }
{ **************************************************************************** }

function w3_HasClass(tagRef: THandle; aClassName: String): Boolean;
begin
  asm
  @Result = ((@tagRef).className.match(new RegExp("(\\s|^)"+@aClassName+"(\\s|$)")))?true:false;
  end;
end;

procedure w3_AddClass(tagRef: THandle; aClassName: String);
begin
  asm
    var _qr = ((@tagRef).className.match(new RegExp("(\\s|^)"+@aClassName+"(\\s|$)"))) ? true : false;
    if (_qr === false)
    (@tagRef).className += (" " + @aClassName);
  end;
end;

procedure w3_RemoveClass(tagRef: THandle; aClassName: String);
var
  reg: Variant;
begin
  asm
  @reg = new RegExp("(\\s|^)" + @aClassName + "(\\s|$)");
    (@tagRef).className=(@tagRef).className.replace(@reg," ").replace('  ',' ').trim();
  end;
end;

{ **************************************************************************** }
{ TW3OwnedObject }
{ **************************************************************************** }

constructor TW3OwnedObject.Create(AOwner: TObject);
begin
  inherited Create;

  if AcceptParent(AOwner) then
    FOwner := AOwner
  else
    raise EW3OwnedObject.CreateFmt(CNT_ERR_METHOD, ['constructor', ClassName,
      'Unsuitable owner object-type error']);
end;

function TW3OwnedObject.AcceptParent(aObject: TObject): Boolean;
begin
  Result := true;
end;

{ **************************************************************************** }
{ Style management }
{ **************************************************************************** }

function w3_getCalcStyleFor(const tagRef: THandle): Variant;
begin
  asm
  @result = document.defaultView.getComputedStyle(@tagRef,null);
  end;
end;

function w3_getStyle(const tagRef: THandle; const aStyleName: String): Variant;
var
  mObj: THandle;
begin
  asm
  @mObj   = document.defaultView.getComputedStyle(@tagRef,null);
    if (@mObj)
  @result = (@mObj).getPropertyValue(@aStyleName);
  end;
end;

function w3_getStyleAsStr(const tagRef: Variant;
  const aStyleName: String): String;
var
  mObj: THandle;
  mData: Variant;
begin
  asm
  @mObj   = document.defaultView.getComputedStyle(@tagRef,null);

    if (@mObj)
  @mData = (@mObj).getPropertyValue(@aStyleName);

    if (@mData)
    {
    if (typeof(@mData) === "number") {
    @result = String(@mData);
     } else {
    if (typeof(@mData) === "string")
    @result = @mData;
     }
    }
  end;
end;

function w3_getStyleAsInt(const tagRef: Variant;
  const aStyleName: String): Integer;
var
  mObj: THandle;
  mData: Variant;
begin
  asm
  @mObj   = document.defaultView.getComputedStyle(@tagRef,null);

    if (@mObj)
  @mData = (@mObj).getPropertyValue(@aStyleName);

    if (@mData)
    {
    if (typeof(@mData) === "number")
    {
    @result = @mData;
     } else {
    if (typeof(@mData) === "string")
    {
    @mData = parseInt(@mData);
    if (typeof(@mData) === "number")
    @result = @mData;
     }
    }
    }
  end;
end;

function w3_getStyleAsFloat(const tagRef: Variant;
  const aStyleName: String): float;
var
  mObj: THandle;
  mData: Variant;
begin
  asm
  @mObj   = document.defaultView.getComputedStyle(@tagRef,null);

    if (@mObj)
  @mData = (@mObj).getPropertyValue(@aStyleName);

    if (@mData)
    {
    if (typeof(@mdata) === "number") {
    @result = @mData
     } else {
    if (typeof(@mdata) === "string")
    {
    @mData = parseFloat(@mData);
    if (!isNaN(@mData))
    @result = @mData;
     }
    }
    }
  end;
end;

procedure w3_setStyle(const tagRef: THandle; const aStyleName: String;
  const aStyleValue: Variant);
begin
  tagRef.style[aStyleName] := aStyleValue;
end;

{ **************************************************************************** }
{ Attribute management }
{ **************************************************************************** }

function w3_getAttrib(const tagRef: THandle; const aAttribName: String)
  : Variant;
begin
  Result := tagRef.getAttribute(aAttribName);
end;

procedure w3_setAttrib(const tagRef: THandle; const aAttribName: String;
  const aValue: Variant);
begin
  tagRef.setAttribute(aAttribName, aValue);
end;

function w3_getAttribAsStr(const tagRef: THandle;
  const aAttribName: String): String;
begin
  Result := tagRef.getAttribute(aAttribName, 0);
end;

function w3_getAttribAsInt(const tagRef: THandle;
  const aAttribName: String): Integer;
begin
  Result := tagRef.getAttribute(aAttribName, 0);
end;

{ **************************************************************************** }
{ property management }
{ **************************************************************************** }

function w3_getProperty(const tagRef: THandle; const aPropName: String)
  : Variant;
begin
  Result := tagRef[aPropName];
end;

procedure w3_setProperty(const tagRef: THandle; const aPropName: String;
  const aValue: Variant);
begin
  tagRef[aPropName] := aValue;
end;

function w3_getPropertyAsStr(const tagRef: THandle;
  const aPropName: String): String;
begin
  Result := tagRef[aPropName];
end;

function w3_getPropertyAsInt(const tagRef: THandle;
  const aPropName: String): Integer;
begin
  Result := tagRef[aPropName];
end;

function w3_getPropertyAsBool(const tagRef: THandle;
  const aPropName: String): Boolean;
begin
  Result := tagRef[aPropName];
end;

function w3_getPropertyAsFloat(const tagRef: THandle;
  const aPropName: String): float;
begin
  Result := tagRef[aPropName];
end;

{ **************************************************************************** }
{ DOM object references and helper functions }
{ **************************************************************************** }
{ function w3_Event: Variant;
  begin
  Result := BrowserAPI.Event;
  end;
}

function w3_GetInnerHtml(aRef: THandle): String;
begin
  Result := aRef.innerHTML;
end;

procedure w3_SetInnerHtml(aRef: THandle; aValue: String);
begin
  aRef.innerHTML := aValue;
end;

{ **************************************************************************** }
{ TBufferHandleHelper }
{ **************************************************************************** }

function TVariant.Valid: Boolean;
begin
  asm
  @Result = !( (@self == undefined) || (@self == null) );
  end;
end;

function TVariant.Equals(const Source: TBufferHandle): Boolean;
begin
  asm
  @result = (@self == @Source);
  end;
end;

{ **************************************************************************** }
{ TMemoryHandleHelper }
{ **************************************************************************** }
{ function TMemoryHandleHelper.Valid: Boolean;
  begin
  asm
  @Result = !( (@self == undefined) || (@self == null) );
  end;
  end;

  Function TMemoryHandleHelper.Defined: Boolean;
  begin
  asm
  @result = !(self == undefined);
  end;
  end;

  function TMemoryHandleHelper.UnDefined: Boolean;
  begin
  asm
  @result = (self == undefined);
  end;
  end;

  function TMemoryHandleHelper.Equals(const Source: TMemoryHandle): Boolean;
  begin
  asm
  @result = (@self == @Source);
  end;
  end;
}
{ **************************************************************************** }
{ Misc utility functions }
{ **************************************************************************** }
{ GLOBAL FUNCTION }

procedure WriteLn(const value: Variant);
begin
  asm if (window.console) { window.console.log(@value); } end;
end;

procedure time(const value: string);
begin
  asm if (window.console) { window.console.time(@value); } end;
end;

procedure timeEnd(const value: string);
begin
  asm if (window.console) { window.console.timeEnd(@value); } end;
end;

procedure w3_ShowMessage(aText: String);
begin
  ShowMessage(aText);
end;

function w3_Prompt(aText: String; aDefault: String = ''): String;
begin
  Result := Prompt(aText, aDefault);
end;

{ **************************************************************************** }
{ Object management }
{ **************************************************************************** }
{ procedure w3_bind(obj_id: String; event_name: String;
  callback: TProcedureRef); // deprecated;
  begin
  BrowserAPI.Document.getElementById(obj_id)[event_name] := @callback;
  end;
} procedure w3_bind2(obj_ref: THandle; event_name: String;
  callback: TProcedureRef);
begin
  obj_ref[event_name] := @callback;
end;

procedure w3_unbind(obj_ref: THandle; event_name: String);
begin
  obj_ref[event_name] := nil;
end;

procedure w3_AddEvent(a_tagRef: THandle; a_eventName: String;
  a_callback: TProcedureRef; a_useCapture: Boolean);

{ mousewheel handling: http: // www.switchonthecode.com/tutorials/
  javascript - tutorial - the - scroll - wheel }
begin
  if a_eventName = 'mousewheel' then
    a_eventName := 'DOMMouseScroll';
  a_tagRef.addEventListener(a_eventName, @a_callback, a_useCapture);
end;

procedure w3_RemoveEvent(a_tagRef: THandle; a_eventName: String;
  a_callback: TProcedureRef; a_useCapture: Boolean);
{ mousewheel handling: http: // www.switchonthecode.com/tutorials/
  javascript - tutorial - the - scroll - wheel }
begin
  if a_eventName = 'mousewheel' then
    a_eventName := 'DOMMouseScroll';
  a_tagRef.removeEventListener(a_eventName, @a_callback, a_useCapture);
end;

procedure w3_setElementParentByRef(const aElement: TControlHandle;
  const aParent: TControlHandle);
begin
  aParent.appendChild(aElement);
end;

procedure w3_RemoveElementByRef(const aElement: TControlHandle;
  const aParent: TControlHandle);
begin
  aParent.removeChild(aElement);
end;

{ function w3_createHtmlElement(aTypeName: String): THandle;
  begin
  Result := BrowserAPI.Document.createElement(aTypeName);
  end;

  function w3_getElementsByName(aElementName: String): array of TControlHandle;
  begin
  Result := THandleArray(BrowserAPI.Document.getElementsByName(aElementName));
  end;
}

function VarIsValidRef(const aRef: Variant): Boolean;
begin
  asm
  @Result = !((@aRef == null) || (@aRef == undefined));
  end;
end;

{ TVariant }
class function TVariant.AsInteger(const aValue: Variant): Integer;
begin
  if (aValue <> unassigned) and (aValue <> null) then
    Result := aValue;
end;

class function TVariant.AsString(const aValue: Variant): String;
begin
  if (aValue <> unassigned) and (aValue <> null) then
    Result := aValue;
end;

class function TVariant.AsFloat(const aValue: Variant): float;
begin
  if (aValue <> unassigned) and (aValue <> null) then
    Result := aValue;
end;

class function TVariant.AsObject(const aValue: Variant): TObject;
begin
  if (aValue <> unassigned) and (aValue <> null) then
  begin
    asm
    @result = @aValue;
    end;
  end;
end;

class function TVariant.AsBool(const aValue: Variant): Boolean;
begin
  if (aValue <> unassigned) and (aValue <> null) then
    Result := aValue;
end;

{$HINTS OFF}

class function TVariant.CreateObject: Variant;
begin
  asm
    return { };
  end;
end;

class function TVariant.CreateArray: Variant;
begin
  asm
    return [];
  end;
end;

class function TVariant.IsNull(const aValue: Variant): Boolean;
begin
  Result := (aValue = null);
  // Result := VarIsNull(aValue);
end;

class function TVariant.IsString(const aValue: Variant): Boolean;
begin
  asm
    if (@aValue == null) return false;
    if (@aValue == undefined) return false;
    if (typeof(@aValue) === "string") return true;
  end;
end;

class function TVariant.IsNumber(const aValue: Variant): Boolean;
begin
  asm
    if (@aValue == null) return false;
    if (@aValue == undefined) return false;
    if (typeof(@aValue) === "number") return true;
  end;
end;

class function TVariant.IsInteger(const aValue: Variant): Boolean;
begin
  asm
    if (@aValue == null) return false;
    if (@aValue == undefined) return false;
    if (typeof(@aValue) === "number") if (parseInt(@aValue) === @aValue) return true;
  end;
end;

class function TVariant.IsBool(const aValue: Variant): Boolean;
begin
  asm
    if (@aValue == null) return false;
    if (@aValue == undefined) return false;
    if (typeof(@aValue) === "boolean") return true;
  end;
end;

class function TVariant.IsNAN(const aValue: Variant): Boolean;
begin
  Result := Internal.IsNAN(aValue);
end;

class function TVariant.Properties(const aValue: Variant): TStrArray;
begin
  var
    buf: Variant;
    asm
      for (@buf in @aValue) (@result).push(@buf);
    end;
end;

class function TVariant.OwnProperties(const aValue: Variant): TStrArray;
begin
  var
    buf: Variant;
    asm
      for (@buf in @aValue) if ((@aValue).hasOwnProperty(@buf)) (@result).push(@buf);
    end;
end;
{$HINTS ON}
{ **************************************************************************** }
{ EW3Exception }
{ **************************************************************************** }

constructor EW3Exception.CreateFmt(aText: String;
  const aValues: array of const);
begin
  inherited Create(Format(aText, aValues));
end;

{$IFDEF SMART_INTERNAL_AUTO_REFRESH}

uses SmartCL.AutoRefresh;

initialization

TW3AutoRefresh.Create.Start;

{$ENDIF}

end.
