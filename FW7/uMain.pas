{ This is an experimental SmartMobileStudio + Framework7 + Delphi mORMot
  We can have remote access to a mORMot server using SmartMobileStudio
  Compiled with Smart Mobile Studio BASIC version (v.2.1.2.3592
  by warleyalex
}
unit uMain;

interface

uses SmartCL.System.Lite, uApplicationLite, FW7, uLogin, uProtected;

type
  TApplication = class(TApplicationLite)
  private
    FmyApp : JFramework7;
    FmainView: variant;
    function myThis: TApplication;
  protected
    procedure InitApp;
  public
    procedure RunApp; //empty;
    property  mainView: variant read FmainView write FmainView;
    property  myApp: JFramework7 read FmyApp write FmyApp;
    property  This: TApplication read myThis;
  end;

type
  TBase = class external 'Object'
    public class const cPublic = '{"name":"John Doe","age":32,"position":"CEO","company":"Google","interests":["swimming","music","JavaScript","iMac","iOS apps","sport"]}';
    public class const cTemp = '{"page:about2":{"tel":"+1 (222) 333-44-55","email":"john@doe.com","country":"USA","city":"San Francisco","zip":"12345","street":"Awesome st"},"page:about":{"name":"John Doe","age":32,"position":"CEO","company":"Google","interests":["swimming","music","JavaScript","iMac","iOS apps","sport"]}}';
  end;

type
  JJSON = class external "JSON"
    public
      function Parse(jsonData: String): Variant; external 'parse';
      function Stringify(const v: Variant): String; external 'stringify';
  end;

type
  JOptParams = class external 'Object'
    // Default title for modals
    modalTitle: string = 'My App';
    animateNavBackIcon: boolean = true;
    // Enable templates auto precompilation
    precompileTemplates: boolean = true;
    // Enabled pages rendering using Template7
    template7Pages: boolean = true;
    template7Data : variant;
    onPageInit : variant;
  end;

type
  JAddViewParam = class external 'Object'
  dynamicNavbar : boolean;
   //template7Data : variant;
end;


implementation

function TApplication.myThis: TApplication;
begin
  Result := Self;
end;

procedure TApplication.InitApp;
var
  optParams:  JOptParams;
  addViewParams:  JAddViewParam;

begin
/*##################### CUSTOM FRAMEWORK7 INITIALIZATION ####################
We can customize F7 on initialization by passing object with parameters.
In the example above we use myApp variable where we store Framework7 initialized
instance for easy access in future. It is not necessary to name it "myApp",
it could be any name you like.
############################################################################## */
  // Initialize params
  optParams := new JOptParams();
  optParams.modalTitle := 'My App';
  optParams.animateNavBackIcon := true;
  // Enable templates auto precompilation
  optParams.precompileTemplates := true;
  // Enabled pages rendering using Template7
  optParams.template7Pages := true;
  // template7Data object
  optParams.template7Data := JSON.Parse(TBase.cTemp);
  {--------------------------------------------------}
  // Add view
  addViewParams := new JAddViewParam();
  // Because we want to use dynamic navbar, we need to enable it for this view:
  addViewParams.dynamicNavbar := true;
  {--------------------------------------------------}
  // Initialize app
  myApp := JFramework7.Create(optParams);
  mainView := myApp.addView('.view-main', addViewParams);

/*################## REINIT THE HOME PAGE MANUALLY #############################
Sometimes we may need to init the app manually, for example for initial page
(that are already in index.html file on app load).
But there could be a problem because when we add our onPage callbacks the App is
already initialized and our callback will not be triggered.
It could be solved using trigger method.
############################################################################## */

TApplication(self).myApp.onPageBeforeInit('index', procedure (page: variant)
begin
  WriteLn('Index page beforeInit');
  for var j:= 1 to 3 do begin
     DOM7('.toolbar .link').eq(j).hide();
  end;

  (* I'm going to refresh the animation in 600ms *)
  w3_SetTimeout( procedure ()
    begin
      DOM7('#cover').addClass('go');
      w3_SetTimeout( procedure ()
      Begin
        DOM7('#cover').removeClass('go');
      end,3300);
    end,600);

  DOM7('#cover').mouseout( procedure()
  	begin
  		DOM7(this).toggleClass('go');
  	end);
//-------------------------
  TLogin.InitializeObject;
end).trigger();

/*######################## ADD PAGE EVENTS HANDLER ############################
pageBeforeInit: Event will be triggered when Framework7 just inserts new page to DOM
pageInit: Event will be triggered after Framework7 initialize required page's components and navbar
##############################################################################*/
// Let's see how we can use these events.
// how we can using one event handler write code for different pages

DOM7(vdocument).on('pageBeforeInit', function(e: variant) : variant
begin
    var page = e.detail.page;  // // Page Data contains all required information about loaded and initialized page

    case (page.name) of
    'index':
       begin
        WriteLn('index page initialized');
         for var j:= 1 to 3 do begin
           DOM7(".toolbar .link").eq(j).removeAttr('style'); // show all buttons except login
         end;
       end;
    'protected': 
       begin
         //WriteLn('protected page initialized');
         TProtected.InitializeObject;
       end;
    'features':
       begin
         WriteLn('features page initialized');
       end;
    'gallery':
       begin
         WriteLn('gallery page initialized');
          // The swipebox plugin requires Jquery
          asm
        	  $(".swipebox").swipebox();
        	  $(".videocontainer").fitVids();
          end;
       end;
    'blog':
       begin
         WriteLn('blog page initialized');
        	var i : integer = 0;
        	DOM7("#loadmore").click( procedure()
          begin
        		Inc(i);
        		if(i<5) then begin
        			var html = '';
        			html += '<div class="card post-card"><div class="card-header"><div class="post-avatar"><img src="res/images/photos/avatar.jpg" width="34" height="34"></div><div class="post-name">John Doe</div><div class="post-date">Monday at 2:15 PM</div></div><div class="card-content"><div class="card-content-inner"><h4 class="title-post"><a href="single.html">The eye should learn to listen before it looks.</a></h4><img src="res/images/photos/5.jpg" width="100%" class="img"><p>What a nice photo i took yesterday! Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin et augue nec ex facilisis pulvinar.</p><p class="color-gray infos">Likes: 112  -  Comments: 43</p></div></div><div class="card-footer no-border"><a href="#" class="link">Like</a><a href="#" class="link">Comment</a><a href="#" class="link">Share</a></div></div>';
        			DOM7('#blog-page').append(html);
        		end else
        			DOM7("#loadmore").hide();
        	end);
       end;
    'about':
       begin
         WriteLn('about page initialized');
       end;
    'tabs':
       begin
         WriteLn('tabs page initialized');
       end;
    'toggle':
       begin
         WriteLn('toggle page initialized');
       end;
    'contact':
       begin
         WriteLn('contact page initialized');
       end;
    'videos':
       begin
         WriteLn('videos page initialized');
       end;
    'socials':
       begin
         WriteLn('socials page initialized');
       end;
    end; // END DO CASE
end);

end;

procedure TApplication.RunApp;
begin
  InitApp;

end;

end.

