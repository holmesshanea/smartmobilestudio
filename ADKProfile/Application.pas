unit Application;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Main, Splash, Challenge, Mountain, Info, About;

type
  TApplication  = class(TW3CustomApplication)
  private
   fMainForm: TMain;
   fSplashForm: TSplash;
   fChallengeForm: TChallenge;
   fMountainForm: TMountain;
   fInfoForm: TInfo;
   fAboutForm: TAbout;
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

  fInfoForm := TInfo.Create(Display.View);
  fInfoForm.Name := 'Info';
  RegisterFormInstance(fInfoForm, False);

  fAboutForm := TAbout.Create(Display.View);
  fAboutForm.Name := 'About';
  RegisterFormInstance(fAboutForm, False);

  fSplashForm := TSplash.Create(Display.View);
  fSplashForm.Name := 'Splash';
  RegisterFormInstance(fSplashForm, True);

  inherited;
end;

end.
