unit UntApp;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
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

  //function window: variant; external 'window' property;

implementation

uses UntCommon;

function HandleUnload(e: variant): variant;
//for Android
begin
  JSONStr:= JSON.Stringify(variant(CompArray));
  WriteData;
  application.terminate();
 result := '';
end;


procedure TApplication.ApplicationClosing;
begin
  JSONStr:= JSON.Stringify(variant(CompArray));
  WriteData;
  inherited;
end;

procedure TApplication.ApplicationStarting;
begin
  //window.addEventListener('onbeforeunload', @onbeforeunload, false);
  BrowserAPI.Document.addEventListener('unload', @HandleUnload, false);

  JSONStr:= ReadData;
  if (JSONStr <> 'error')  then
  begin
   asm
    @CompArray = JSON.parse(@JSONStr);
   end;
  end;

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
