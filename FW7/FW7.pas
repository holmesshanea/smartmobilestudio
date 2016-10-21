{ created by warleyalex }
unit FW7;

interface

uses
  SmartCL.System.Lite;

type
  JRactiveOptions = class(JObject)
    el: string;
    template: string;
    data: variant;
  end;

  TProcedure = procedure;
  aCallBack =  procedure(page: Variant);
  ajaxCallBack =  procedure(xhr: Variant);
  prerouteCallBack = procedure(view, options: variant);
  preprocessCallBack = procedure(content, url, next: variant);
  pageCallBack = procedure(app, page: variant);
  eachCallBack = procedure(index, value: variant);

  JRactive = class external 'Ractive'
    constructor Create(aOptions: JRactiveOptions);
    procedure update;
    procedure &set(aName: string; aValue: Variant);
    procedure animate(aName: string; aValue: Variant);
    function  get(aName: string): Variant;
    procedure &on(aEvent: string; aCallback: TProcedure);
  end;

  TJAjaxSettings_headers_object = class external
    public
     function  GetItems(key: string): variant; external array;
     procedure SetItems(key: string; value: variant); external array;
     property Items[key: string]: variant read GetItems write SetItems; default;
  end;

  TJAjaxSettings_statusCode_object = class external
    public
      function  GetItems(key: string): variant; external array;
      procedure SetItems(key: string; value: variant); external array;
      property Items[key: string]: variant read GetItems write SetItems; default;
  end;

  TJAjaxSettings_xhrFields_object = class external
    public
      function  GetItems(key: string): variant; external array;
      procedure SetItems(key: string; value: variant); external array;
      property Items[key: string]: variant read GetItems write SetItems; default;
    end;

  JAjaxSettings = class external "Object"
    //---------- Parameters ----------//
    property async: boolean;
    property &method: string;
    property cache: boolean;
    property contentType: string;
    property crossDomain: boolean;
    property data: variant;
    property processData: boolean;
    property dataType: string;
    property headers: TJAjaxSettings_headers_object;
    property xhrFields: TJAjaxSettings_xhrFields_object;
    property username: string;
    property password: string;
    property timeout: integer;
    //---------- Callbacks ----------//
    procedure beforeSend(xhr: variant; settings: JAjaxSettings);
    function error(xhr: variant; textStatus: string; errorThrow: string): variant;
    procedure success(data: variant; textStatus: string; jqXHR: variant);
    procedure complete(xhr: variant; textStatus: string);
    property statusCode: TJAjaxSettings_statusCode_object;
    //----------  ----------//

/*
    property accepts: variant;
    property async: boolean;
    //procedure beforeSend(jqXHR: JJQueryXHR; settings: JJQueryAjaxSettings);
    property cache: boolean;
    //procedure complete(jqXHR: JJQueryXHR; textStatus: string);
    //property contents: TJQueryAjaxSettings_contents_object_;
    property contentType: string;
    property context: variant;
    //property converters: TJQueryAjaxSettings_converters_object_;
    property crossDomain: boolean;
    property data: variant;
    function dataFilter(data: variant; ty: variant): variant;
    property dataType: string;
    //function error(jqXHR: JJQueryXHR; textStatus: string; errorThrow: string): variant;
    property global: boolean;
    //property headers: TJQueryAjaxSettings_headers_object_;
    property ifModified: boolean;
    property isLocal: boolean;
    property jsonp: string;
    property jsonpCallback: variant;
    property mimeType: string;
    property password: string;
    property processData: boolean;
    property scriptCharset: string;
    //property statusCode: TJQueryAjaxSettings_statusCode_object_;
    //procedure success(data: variant; textStatus: string; jqXHR: JJQueryXHR);
    property timeout: integer;
    property traditional: boolean;
    property &type: string;
    property url: string;
    property username: string;
    property xhr: variant;
    //property xhrFields: TJQueryAjaxSettings_xhrFields_object_;
*/
  end;

//--------------------------------------------------
type
  JEvent = class external;
  JBaseFramework7EventObject = class external "Object"(JEvent);
  JFramework7EventObject = class external "Object"(JBaseFramework7EventObject);
  TFramework7_on_handler = function (eventObject: JFramework7EventObject): variant;


type
  JDom7 = class external 'Dom7'
    //class var vDocument external "document" : THandle;
    class var vDom external "Dom7" : JDom7;
    //-------- Classes --------//
    function addClass(className : string): JDom7; overload;
    function removeClass(className : string): JDom7; overload;
    function hasClass(className : string): JDom7; overload;
    function toggleClass(className : string): JDom7; overload;

    //-------- Attributes and properties --------//
    function prop(propName : string): JDom7; overload;
    function prop(propName : string; propValue: boolean): JDom7; overload;
    function prop(propertiesObject : variant): JDom7; overload;

    function attr(attrName : string): JDom7; overload;
    function attr(attrName, attrValue : string): JDom7; overload;
    function attr(attributesObject : variant): JDom7; overload;

    function removeAttr(attrName : string): JDom7; overload;
    function val(): JDom7; overload;
    function val(newValue : string): JDom7; overload;

    //-------- Data storage --------//
    function data(key : string; value: variant): JDom7; overload;
    function data(key : string): JDom7; overload;
    function removeData(key : string): JDom7; overload;

    //-------- Data Set --------//
    function dataset(): JDom7; overload;

    //-------- CSS transform, transitions --------//
    function transform(CSSTransformString : string): JDom7; overload;
    function transition(transitionDuration : integer): JDom7; overload;

    //-------- Events --------//
    function &on(objParams: JObject): JDom7; overload;
    function &on(eventName: string; handler: TFramework7_on_handler = nil): JDom7; overload;
    function &on(eventName: variant; delegatedTarget: variant = undefined; handler: TFramework7_on_handler = nil): JDom7; overload;

    function once(eventName: string; handler: TFramework7_on_handler = nil): JDom7;
    function once(eventName: variant; delegatedTarget: variant = undefined; handler: TFramework7_on_handler = nil): JDom7; overload;

    function off(eventName: string): JDom7; overload;
    function off(eventName: string; handler: TProcedure): JDom7; overload;
    function off(eventName: variant; delegatedTarget: variant = undefined; handler: TProcedure = nil): JDom7; overload;
    //function &off(eventName: string; delegatedTarget: variant = undefined; handler: TProcedure = nil): JDom7; overload;

    function trigger(eventName: string; eventData: variant): JDom7; overload;

    function transitionEnd(callback: TProcedure): JDom7; overload;
    function animationEnd(callback: TProcedure): JDom7; overload;

    //-------- Styles --------//
    function width(): JDom7; overload;
    function outerWidth(includeMargin: boolean): JDom7; overload;
    function height(): JDom7; overload;
    function outerHeight(includeMargin: boolean): JDom7; overload;
    function offset(): JDom7; overload;
    function hide(): JDom7; overload;
    function show(): JDom7; overload;
    function css(prop: string): JDom7; overload;
    function css(prop, value: string): JDom7; overload;
    function css(propertiesObject: variant): JDom7; overload;

    //-------- Scroll --------//
    function scrollTop(): JDom7; overload;
    function scrollTop(position: integer; duration: integer; callback: TProcedure): JDom7; overload;
    function scrollLeft(): JDom7; overload;
    function scrollLeft(position: integer; duration: integer; callback: TProcedure): JDom7; overload;
    function scrollTo(left, top, duration: integer; callback: TProcedure): JDom7; overload;

    //-------- Dom Manipulation --------//
    function add(elements: variant): JDom7; overload;

    /* Dom7.each(object/array, callback) - iterate through object or array
       object/array - object or array - to iterate over. Required.
       callback - function - callback function that will be executed on every object property, or on every array element. Required.*/
    function each(obj: variant; callback: eachCallBack): JDom7; overload;
    function each(callback: TProcedure): JDom7; overload;

    function html(): JDom7; overload;
    function html(newInnerHTML: variant): JDom7; overload;

    function text(): JDom7; overload;
    function text(newTextContent: variant): JDom7; overload;

    function &is(CSSSelector: string): JDom7; overload;
    function &is(HTMLElement: variant): JDom7; overload;

    /* Dom7.isArray(obj) - Determine whether the argument is an array
       obj - object - Object to test whether or not it is an array
       returns a Boolean indicating whether the object is a JavaScript array*/
    function isArray(obj: variant): JDom7; overload;


    function index(): JDom7; overload;

    /* Dom7.dataset(el) - Get element's data set (set of data- attributes) as plain Object
       el - HTMLElement or string (with CSS selector) - element with data- attributes to get dataset from
       returns a new plain object with dataset  */
    function dataset(el: variant): JDom7; overload;

    function eq(index: variant): JDom7; overload;

    function append(HTMLString: string): JDom7; overload;
    function append(HTMLElement: variant): JDom7; overload;

    /* Dom7.parseUrlQuery(url) - parse url query get parameters
       url - string - url with GET parameters. Required.
       Method returns object with query parameters */
    function parseUrlQuery(url: string): JDom7; overload;

    function prepend(HTMLString: string): JDom7; overload;
    function prepend(HTMLElement: variant): JDom7; overload;

    function insertBefore(target: variant): JDom7; overload;
    function insertAfter(target: variant): JDom7; overload;


    function next(selector: variant): JDom7; overload;
    function nextAll(selector: variant): JDom7; overload;

    function prev(selector: variant): JDom7; overload;
    function prevAll(selector: variant): JDom7; overload;
    function parent(selector: variant): JDom7; overload;
    function parents(selector: variant): JDom7; overload;
    function find(selector: variant): JDom7; overload;
    function children(selector: variant): JDom7; overload;

    function filter(callback: TProcedure): JDom7; overload;
    function remove(): JDom7; overload;

    /* Dom7.requestAnimationFrame(callback) - Cross-browser implementation on requestAnimationFrame
       callback - function - A parameter specifying a function to call when it's time to update your animation for the next repaint
       returns animation request id, that uniquely identifies the entry in the callback list  */
    function requestAnimationFrame(callback: TProcedure): JDom7; overload;

    /* Dom7.cancelAnimationFrame(requestID) - Cancels an animation frame request
       requestID - number - The ID value returned by the call to $$.requestAnimationFrame() that requested the callback  */
    function cancelAnimationFrame(requestID: integer): JDom7; overload;

    /* Dom7.serializeObject(object) - Create a serialized representation of a plain object suitable for use in a URL query string
       object - object - Object to serialize
       returns a new unique array  */
    function serializeObject(obj: variant): JDom7; overload;

    /* Dom7.toCamelCase(string) - Convert hypens-case string to camelCase string
       string - string - hypens-case string
       returns a new camelCase string */
    function toCamelCase(str: string): JDom7; overload;

    /* Dom7.unique(array) - Remove duplicates in passed array
       obj - array - Array to remove duplicates
       returns a new unique array */
    function unique(arr: variant): JDom7; overload;


    //-------- Shortcuts --------//
    function click(): JDom7; overload;
    function click(handler: TProcedure): JDom7; overload;

    function blur(): JDom7; overload;
    function blur(handler: TProcedure): JDom7; overload;
    function focus(): JDom7; overload;
    function focus(handler: TProcedure): JDom7; overload;
    function focusin(): JDom7; overload;
    function focusin(handler: TProcedure): JDom7; overload;
    function focusout(): JDom7; overload;
    function focusout(handler: TProcedure): JDom7; overload;
    function keyup(): JDom7; overload;
    function keyup(handler: TProcedure): JDom7; overload;
    function keydown(): JDom7; overload;
    function keydown(handler: TProcedure): JDom7; overload;
    function keypress(): JDom7; overload;
    function keypress(handler: TProcedure): JDom7; overload;
    function submit(): JDom7; overload;
    function submit(handler: TProcedure): JDom7; overload;
    function change(): JDom7; overload;
    function change(handler: TProcedure): JDom7; overload;
    function mousedown(): JDom7; overload;
    function mousedown(handler: TProcedure): JDom7; overload;
    function mousemove(): JDom7; overload;
    function mousemove(handler: TProcedure): JDom7; overload;
    function mouseup(): JDom7; overload;
    function mouseup(handler: TProcedure): JDom7; overload;

    function mouseenter(): JDom7; overload;
    function mouseenter(handler: TProcedure): JDom7; overload;
    function mouseleave(): JDom7; overload;
    function mouseleave(handler: TProcedure): JDom7; overload;
    function mouseout(): JDom7; overload;
    function mouseout(handler: TProcedure): JDom7; overload;
    function mouseover(): JDom7; overload;
    function mouseover(handler: TProcedure): JDom7; overload;
    function touchstart(): JDom7; overload;
    function touchstart(handler: TProcedure): JDom7; overload;
    function touchend(): JDom7; overload;
    function touchend(handler: TProcedure): JDom7; overload;
    function touchmove(): JDom7; overload;
    function touchmove(handler: TProcedure): JDom7; overload;
    function resize(handler: TProcedure): JDom7; overload;
    function scroll(handler: TProcedure): JDom7; overload;

    //-------- Ajax --------//
    /*  $$.ajax(parameters) - Load data from the server
        parameters - object - Request parameters
        returns plain XHR object */
    function ajax(parameters: JAjaxSettings): JDom7; overload;

    /* $$.get(url, data, success) - Load data from the server using a HTTP GET request
       url - string - Request url
       data - object - A plain object or string that is sent to the server with the request. Optional
       success - function (data, status, xhr) - A callback function that is executed if the request succeeds. Optional
       returns plain XHR object  */
    function get(url: string; data: variant; success: aCallBack): JDom7; overload;

    /* $$.post(url, data, success) - Load data from the server using a HTTP POST request
       url - string - Request url
       data - object - A plain object or FormData or string that is sent to the server with the request. Optional
       success - function (data, status, xhr) - A callback function that is executed if the request succeeds. Optional
       returns plain XHR object
    */
    function post(url: string; data: variant; success: aCallBack): JDom7; overload;

    /*
      $$.getJSON(url, data, success) - Load JSON-encoded data from the server using a GET HTTP request
      url - string - Request url
      data - object - A plain object or FormData or string that is sent to the server with the request. Optional
      success - function (data, status, xhr) - A callback function that is executed if the request succeeds. Optional
      returns plain XHR object
    */
    function getJSON(url: string; data: variant=undefined; success: variant=undefined): JDom7; overload;


end;

  //function DOM7(): THandle; overload;
//  function DOM7(): JDom7; overload;
  function DOM7(params: variant) : variant; overload;
  //function Template7() : variant; overload;






type
JFramework7 = class;

  JAppF7Options = class(JObject)
    //--------- Caching ---------//
    cache: boolean = true;
    cacheDuration: integer = 1000*60*10;
    cacheIgnore: variant;
    cacheIgnoreGetParameters: boolean = false;


    //--------- Fast clicks library ---------//
    fastClicks: boolean = true;
    fastClicksDelayBetweenClicks: integer = 50;
    fastClicksDistanceThreshold: integer = 0;
    activeState: boolean = true;
    activeStateElemets: string = 'a, button, label, span';
    tapHold: boolean = false;
    tapHoldDelay: integer = 750;
    tapHoldPreventClicks: boolean = true;

    //--------- Navigation / Router ---------//
    router: boolean = true;
    ajaxLinks: string;
    dynamicPageUrl: string = 'content-{{index}}';
    uniqueHistory: boolean = false;
    uniqueHistoryIgnoreGetParameters: boolean = false;
    externalLinks: string = '.external';
    allowDuplicateUrls: boolean = false;
    animateNavBackIcon: boolean = false;
    animatePages: boolean = true;
    preloadPreviousPage: boolean = true;
    preroute: prerouteCallBack;
    preprocess: preprocessCallBack;


    //--------- Push State ---------//
    pushState: boolean = false;
    pushStateSeparator: string = '#!/';
    pushStateRoot: string;
    pushStateNoAnimation: boolean = false;
    pushStatePreventOnLoad: boolean = true;

    //--------- Swipe back ---------//
    swipeBackPage: boolean = true;
    swipeBackPageThreshold: integer = 0;
    swipeBackPageActiveArea: integer = 30;
    swipeBackPageAnimateShadow: boolean = true;
    swipeBackPageAnimateOpacity: boolean = true;

    //--------- Sortable Lists ---------//
    sortable: boolean = true;

    //--------- Swipeout ---------//
    swipeout: boolean = true;
    swipeoutNoFollow: boolean = false;

    //--------- Side Panels ---------//
    swipePanel: string;
    swipePanelCloseOpposite: boolean = true;
    swipePanelOnlyClose: boolean = false;
    swipePanelActiveArea: boolean = false;
    swipePanelNoFollow: boolean = false;
    swipePanelThreshold: integer = 0;
    panelsCloseByOutside: boolean = true;
    panelsVisibleZIndex: integer = 6000;

    //--------- Modals ---------//
    modalTitle: string = 'Framework7';
    modalButtonOk: string = 'OK';
    modalButtonCancel: string = 'Cancel';
    modalPreloaderTitle: string = 'Loading... ';
    modalCloseByOutside: boolean = false;
    actionsCloseByOutside: boolean = true;
    popupCloseByOutside: boolean = true;
    modalTemplate: string;
    modalActionsTemplate: string;
    modalActionsToPopoverTemplate: string;
    modalUsernamePlaceholder: string = 'Username';
    modalPasswordPlaceholder: string = 'Password';
    modalStack: boolean = true;

    //--------- Smart Select ---------//
    smartSelectInPopup: boolean = false;
    smartSelectBackTemplate: string = '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>';
    smartSelectPopupCloseTemplate: string = '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i><span>{{closeText}}</span></a></div>';
    smartSelectBackText: string = 'Back';
    smartSelectPopupCloseText: string = 'Close';
    smartSelectSearchbar: boolean = false;
    smartSelectBackOnSelect: boolean = false;
    smartSelectFormTheme: string;
    smartSelectNavbarTheme: string;

    //--------- Navbars / Toolbars ---------//
    hideNavbarOnPageScroll: boolean = false;
    hideToolbarOnPageScroll: boolean = false;
    hideTabbarOnPageScroll: boolean = false;
    showBarsOnPageScrollEnd: boolean = true;
    showBarsOnPageScrollTop: boolean = true;
    scrollTopOnNavbarClick: boolean = false;

    //--------- Images Lazy Load ---------//
    imagesLazyLoadThreshold: integer = 0;
    imagesLazyLoadSequential: boolean = true;
    imagesLazyLoadPlaceholder: string;

    //--------- Notifications ---------//
    notificationTitle: string;
    notificationSubtitle: string;
    notificationMedia: string;
    notificationHold: integer;
    notificationCloseOnClick: boolean = false;
    notificationCloseIcon: boolean = true;

    //--------- Status Bar ---------//
    statusbarOverlay: boolean;
    scrollTopOnStatusbarClick: boolean = false;

    //--------- Template7 ---------//
    template7Pages: boolean = false;
    template7Data: variant;
    precompileTemplates: boolean = false;
    templates: variant;

    //------  Ajax Callbacks  ----------//
    /* Callback function that will be executed in the beginning of Ajax request. This function accepts xhr data as an argument. */
    onAjaxStart: ajaxCallBack;
    /* Callback function that will be executed after Ajax request. This function accepts xhr data as an argument.*/
    onAjaxComplete: ajaxCallBack;

    //--------- NameSpace ---------//
    viewClass: string = 'view';  //Class name for your View element
    viewMainClass: string = 'view-main';  //Class name for your Main View element
    viewsClass: string = 'views';  //Class name for your Views element

    //--------- Init ---------//
    /* By default Framework7 will be initialized automatically when you call new Framework7(). If you want to prevent this behavior you can disable it with this option and then initialize it manually with myApp.init() when you need it. */
    init: boolean = true;

    //--------- Page Callbacks ---------// ??? --> same as DOM7
    onPageBeforeInit: pageCallBack;
    onPageInit: pageCallBack;
    onPageBeforeAnimation: pageCallBack;
    onPageAfterAnimation: pageCallBack;
    onPageBeforeRemove: pageCallBack;
    onPageBack: pageCallBack;
    onPageAfterBack: pageCallBack;


  end;

//-- INTERFACES ------------------------------------------------

type
  IFramework7View = interface
    ['{7A01E475-D870-4283-9523-EF247A8DA601}']
  end;

type
  IFramework7ViewOptions = interface
    //['{7A01E475-D870-4283-9523-EF247A8DA603}']
    //dynamicNavbar: boolean;
    //domCache: boolean;
  end;

type
  IFramework7App = interface
    ['{7A01E475-D870-4283-9523-EF247A8DA602}']
    //procedure sayHello;
    //function getGreeting: string;
    function addView2(view:String; callback: IFramework7ViewOptions): IFramework7View;
    //function addView(selector: Variant; parameters: Variant) : variant; overload;
  end;


//----------------------------------------------------------
  JFramework7 = class external 'Framework7'
    //onAjaxStart : variant;
    addViewx: IFramework7App;

    constructor Create(); overload;
    constructor Create(aOptions: JObject); overload;
    //------ Initialize View ---------//
    {
      myApp.addView(selector, parameters) - initialize View.

      container - string or HTMLElement. If string - CSS selector of View element
      parameters - object. Object with View parameters
      This method returns object with just created View instance.
    }
    function addView(selector: Variant; parameters: Variant) : variant; overload;
    function addView(selector: Variant) : variant; overload;

    //------ CallBack methods -------//
    {
      myApp.onPageBeforeInit(pageName, callback(page)) - "callback" function will be executed when Framework7 just inserts new page (with "pageName" data-page attribute) to DOM

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageBeforeInit(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageInit(pageName, callback(page)) - "callback" function will be executed after Framework7 initialize required page's (with "pageName" data-page attribute) components and navbar

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageInit(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageReinit(pageName, callback(page)) - "callback" function will be executed for specified cached page (with "pageName" data-page attribute) that becomes visible. It is only applicaple for Inline Pages (DOM cached pages)

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageReinit(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageBeforeAnimation(pageName, callback(page)) - "callback" function will be executed when everything initialized and page (with "pageName" data-page attribute) is ready to be animated

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageBeforeAnimation(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageAfterAnimation(pageName, callback(page)) - "callback" function will be executed after page (with "pageName" data-page attribute) animation

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageAfterAnimation(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageBeforeRemove(pageName, callback(page)) - "callback" function will be executed right before page (with "pageName" data-page attribute) will be removed from DOM

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageBeforeRemove(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageBack(pageName, callback(page)) - "callback" function will be executed right before page (with "pageName" data-page attribute) "back" transition. Difference with "onPageBeforeAnimation" is that this callback will be triggered for the "old" page - page that slides from center to right

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageBack(pageName: string; callback: aCallBack) : variant;

    {
      myApp.onPageAfterBack(pageName, callback(page)) - "callback" function will be executed right after page (with "pageName" data-page attribute) "back" transition. Difference with "onPageAfterAnimation" is that this callback will be triggered for the "old" page - page that slides from center to right

      pageName - string - expected page's "data-page" attribute
      callback(page) - function - callback function that will be executed. As an argument it receives Page Data object
    }
    function onPageAfterBack(pageName: string; callback: aCallBack) : variant;

    //function onAjaxStart(xhr: variant): JFramework7;
   // function onAjaxComplete(xhr: variant): JFramework7;
/*

    constructor Create(aOptions: JRactiveOptions);

    procedure update;
    procedure &set(aName: string; aValue: Variant);
    procedure animate(aName: string; aValue: Variant);
    function  get(aName: string): Variant;
    procedure &on(aEvent: string; aCallback: TProcedure);
*/

   { some important methods }
    procedure loginScreen;
    procedure closeModal;
    procedure showIndicator;
    procedure hideIndicator;
    //procedure (text, title, callbackOk)
    procedure alert(text: Variant);
    procedure confirm (text: variant; callbackOk: TProcedure; callbackCancel: TProcedure);
  end;

type
    JAddViewParam = class external 'Object'
      dynamicNavbar : boolean;

    end;

//--------------------------------------------------------------------
JHelpers7 = class external 'Object'
/*
  function _partial(partialName, options: variant): JHelpers7;
  function escape(context, options: variant): JHelpers7;
  function &if(context, options: variant): JHelpers7;
  function unless(context, options: variant): JHelpers7;
  function each(context, options: variant): JHelpers7;
  function &with(context, options: variant): JHelpers7;
  function join(context, options: variant): JHelpers7;
  function js(expression, options: variant): JHelpers7;
  function js_compare(expression, options: variant): JHelpers7;
  */
end;

JOptions7 = class external 'Object'

end;

JPartials7 = class external 'Object'

end;

type TMyTemp = function(p: variant) : THandle;

JTemplate7 = class external 'Object'

 // source: TMyTemp;
  helpers: JHelpers7;
  options: JOptions7;
  partials: JPartials7;
  global: THandle;
  templates : THandle;
  function registerHelper(name, fn: variant): JTemplate7;
  function unregisterHelper(name: variant): JTemplate7;
  function registerPartial(name, template: variant): JTemplate7;
  function unregisterPartial(name, template: variant): JTemplate7;
  function compile(template, options: variant): JTemplate7; overload;
  function compile(template: variant) : variant; overload;
  //function source(template: variant) : variant; overload;
  //property source : TMyTemp; overload;
end;

//------------------------------------------------------------------------------
var vdocument external "document" : THandle;
var this external "this" : THandle;
var AjaxUtil external "Dom7" : JDom7;
var Template7 external "Template7" : JTemplate7;


/*
Template7.helpers._partial(partialName, options)
Template7.helpers.escape(context, options)
Template7.helpers.if(context, options)
Template7.helpers.unless(context, options)
Template7.helpers.each(context, options)
Template7.helpers.with(context, options)
Template7.helpers.join(context, options)
Template7.helpers.js(expression, options)
Template7.helpers.js_compare(expression, options)

Template7.registerHelper(name, fn)
Template7.unregisterHelper(name)
Template7.registerPartial(name, template)
Template7.unregisterPartial(name, template)
Template7.compile(template, options)

Template7.options
Template7.helpers
Template7.partials

options: {}
partials: {}
helpers: {}
*/

type TMyProc = function : THandle;

type
  TFramework7 = record
    s: string;
    i : integer;
    p: TMyProc;
    AjaxUtils: TMyProc;
    function DOM7 : JDom7; overload;
    function DOM7(params: variant) : variant; overload;
    function D7 : JDom7; overload;
    function D7(params: variant) : variant; overload;
end;

implementation

{ TFramework7 }
function TFramework7.D7(): JDom7;
begin
 asm @Result = Dom7; end;
end;

function TFramework7.DOM7(): JDom7;
begin
 asm @Result = Dom7; end;
end;

function TFramework7.DOM7(params: Variant): Variant;
begin
  asm
  if (typeof @params === 'undefined' || @params === null) return @TFramework7.DOM7();
                  else return Dom7(@params) ;
  end;
  //  Result := BrowserAPI.Window.Dom7(params);
end;

function TFramework7.D7(params: Variant): Variant;
begin
 if params.valid then Result := Dom7(params);
end;


/*
function DOM7(): JDom7;
begin
  asm @Result = Dom7(); end;
end;
*/

/*
function DOM7(): THandle;
begin
  Result := JDom7.vDom;
end;
*/

function DOM7(params: variant) : variant;
begin
 //Result := BrowserAPI.Window.Dom7(params);
 asm
 return window.Dom7(@params);
 end;
end;

end.

/*

Ractive.prototype
==================
add: function ( keypath, d )
animate: function ( keypath, to, options )
bind: function ( adaptor )
cancelFullscreen: function ()
find: function ( selector )
findAll: function ( selector )
fire: function ( eventName )
get: function ( keypath, dontNormalise )
link: function ( keypath )
observe: function ( keypath, callback, options )
off: function ( eventName, callback )
on: function ( eventName, callback )
renderHTML: function ()
requestFullscreen: function ()
set: function ( keypath, value, complete )
subtract: function ( keypath, d )
teardown: function ( complete )
toggle: function ( keypath )
toggleFullscreen: function ()
unbind: function ( adaptor )
update: function ( keypath, complete )

*/
