unit Application;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Main, Splash;

type
  TApplication  = class(TW3CustomApplication)
  private
   fMainForm: TMain;
   fSplashForm: TSplash;
  public
    procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
begin
  fMainForm := TMain.Create(Display.View);
  fMainForm.Name := 'Main';
  RegisterFormInstance(fMainForm, False);

  fSplashForm := TSplash.Create(Display.View);
  fSplashForm.Name := 'Splash';
  RegisterFormInstance(fSplashForm, True);

  inherited;
end;

end.
