unit App;

interface

uses
  Pseudo.CreateForms,
  System.Types, System.JSON,
  SmartCL.System, SmartCL.Components, SmartCL.Forms,
  SmartCL.Application,
  Mountains, Mountain, Menu, Main, Complete, Journal, Splash, Map, About, Congrats;

type
  TApplication  = class(TW3CustomApplication)
  private
   FMainForm: TfrmMain;
   FMenuForm: TMenu;
   FMtnsForm: TfrmMountains;
   FMtnForm: TfrmMountain;
   FCompleteForm: TfrmComplete;
   FJournalForm: TfrmJournal;
   FSplashForm: TfrmSplash;
   FCongratsForm: TCongrats;
   FMapForm: TfrmMap;
   FAboutForm: TAbout;
  protected
  public
    procedure ApplicationStarting; override;
    procedure ApplicationClosing; override;
  end;

implementation

uses Common;


procedure TApplication.ApplicationClosing;
begin
  //
  inherited;
end;

procedure TApplication.ApplicationStarting;
begin
  FMainForm := TfrmMain.Create(Display.View);
  FMainForm.Name := 'Main';
  RegisterFormInstance(FMainForm, False);

  FMenuForm := TMenu.Create(Display.View);
  FMenuForm.Name := 'Menu';
  RegisterFormInstance(FMenuForm, False);

  FMtnsForm := TfrmMountains.Create(Display.View);
  FMtnsForm.Name := 'Mountains';
  RegisterFormInstance(FMtnsForm, False);

  FMtnForm := TfrmMountain.Create(Display.View);
  FMtnForm.Name := 'Mountain';
  RegisterFormInstance(FMtnForm, False);

  FCompleteForm := TfrmComplete.Create(Display.View);
  FCompleteForm.Name := 'Complete';
  RegisterFormInstance(FCompleteForm, False);

  FJournalForm := TfrmJournal.Create(Display.View);
  FJournalForm.Name := 'Journal';
  RegisterFormInstance(FJournalForm, False);

  FMapForm := TfrmMap.Create(Display.View);
  FMapForm.Name := 'Map';
  RegisterFormInstance(FMapForm, False);

  FAboutForm := TAbout.Create(Display.View);
  FAboutForm.Name := 'About';
  RegisterFormInstance(FAboutForm, False);

  FCongratsForm := TCongrats.Create(Display.View);
  FCongratsForm.Name := 'Congrats';
  RegisterFormInstance(FCongratsForm, False);

  FSplashForm := TfrmSplash.Create(Display.View);
  FSplashForm.Name := 'Splash';
  RegisterFormInstance(FSplashForm, True);

  inherited;
end;

end.
