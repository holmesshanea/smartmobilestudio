unit Application;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Main, Splash, Challenge, Mountain;

type
  TApplication  = class(TW3CustomApplication)
  private
   fMainForm: TMain;
   fSplashForm: TSplash;
   fChallengeForm: TChallenge;
   fMountainForm: TMountain;
  public
    procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
begin
  fMainForm := TMain.Create(Display.View);
  fMainForm.Name := 'Main';
  RegisterFormInstance(fMainForm, False);

  fChallengeForm := TChallenge.Create(Display.View);
  fChallengeForm.Name := 'Challenge';
  RegisterFormInstance(fChallengeForm, False);

  fMountainForm := TMountain.Create(Display.View);
  fMountainForm.Name := 'Mountain';
  RegisterFormInstance(fMountainForm, False);

  fSplashForm := TSplash.Create(Display.View);
  fSplashForm.Name := 'Splash';
  RegisterFormInstance(fSplashForm, True);

  inherited;
end;

end.
