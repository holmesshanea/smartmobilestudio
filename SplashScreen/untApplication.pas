unit untApplication;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Main, Splash;

type
  TApplication  = class(TW3CustomApplication)
  private
   FMainForm: TfrmMain;
   FSplashForm: TfrmSplash;
  public
    procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
begin
  FMainForm := TfrmMain.Create(Display.View);
  FMainForm.Name := 'Main';
  RegisterFormInstance(FMainForm, False);

  FSplashForm := TfrmSplash.Create(Display.View);
  FSplashForm.Name := 'Splash';
  RegisterFormInstance(FSplashForm, True);

  inherited;
end;

end.
