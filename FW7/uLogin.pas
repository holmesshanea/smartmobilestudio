unit uLogin;

interface

uses
  SmartCL.System.Lite,
  uApplicationLite,
  SynCrossPlatformREST,
  mORMotClient,
  FW7;

type
TLogin = class
  public
    class function InitializeObject: TObject;
  end;

var Client : TSQLRestClientURI;

implementation

uses uMain;

Const
  CHANGEDIT    = 'input[type="text"]';
  NAVBTN       = 'button[name="nav_btn"]';
  BUTTON1CLICK = '#btn1';
  BUTTON2CLICK = '#btn2';
  BTN1         = '#div1 [name="btn1"]';
  user         = 'input[name="username"]';
  pass         = 'input[name="password"]';
  BtnSign      = '.sign-login-screen';
  BtnClose     = '.close-login-screen';

procedure onLogout;
begin
DOM7('.logout-button').on('click',function(e: variant): variant
begin
  //DOM7(".toolbar .link").eq(0).attr('style', 'display:block'); // show login
  DOM7(".toolbar .link").eq(0).removeAttr('style');

    TApplication(self).myApp.confirm('Are you sure Logout?',
      procedure()
      begin
           TApplication(self).myApp.closeModal();
           w3_SetTimeout( procedure ()
           begin
            // Load page from about.html file to main View:
            TApplication(self).mainView.router.loadPage('index.html');
           end,500);
      end,
      procedure()
      begin
        w3_SetTimeout( procedure ()
        begin
         TApplication(self).mainView.router.back;
        end,1000);
      end);
  WriteLn('Logout');
end);

end;

procedure checkLogin;
var
  wrongLogin = false;
  modalText := if wrongLogin then 'Wrong username or password' else 'Login with username and password';

begin
  //if TApplication(application).Client=nil then
  TApplication(self).myApp.showIndicator;
  if Client = nil then
    GetClient('127.0.0.1', DOM7(user).val(), DOM7(pass).val(),
      lambda(aClient: TSQLRestClientURI)
      DOM7(".toolbar .link").eq(0).hide(); // hide btn login
      for var j:= 1 to 3 do
        DOM7(".toolbar .link").eq(j).removeAttr('style'); // show all buttons except login
      TApplication(self).myApp.closeModal;
      TApplication(self).myApp.hideIndicator;
      TApplication(self).mainView.router.loadPage('pages/protected.html');

      Client := aClient;
      end,
      lambda
        TApplication(self).myApp.alert(modalText);
        TApplication(self).myApp.hideIndicator;
      end)
      else
        begin
          TApplication(self).myApp.hideIndicator;
          Client.Free;
          Client := nil;
        end;

end; // END LOGIN

class function TLogin.InitializeObject: TObject;
begin
  DOM7(BtnSign).on('click', procedure()
  begin // if click on class "login-modal" (our button)...
    checkLogin; // trigger onCreate event
    onLogout    // trigger onLogout event
  end);
  WriteLn('login was fired');
end;

end.
