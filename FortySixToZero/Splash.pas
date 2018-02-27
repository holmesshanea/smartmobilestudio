unit Splash;

interface

uses 
  System.Colors,
  System.Types,
  System.Types.Convert,
  System.Objects,
  System.Time,
  SmartCL.System,
  SmartCL.Time,
  SmartCL.Graphics,
  SmartCL.Components,
  SmartCL.FileUtils,
  SmartCL.Forms,
  SmartCL.Fonts,
  SmartCL.Theme,
  SmartCL.Borders,
  SmartCL.Application,
  SmartCL.Controls.Image;

type
  TfrmSplash = class(TW3Form)
  private
    {$I 'Splash:intf'}
    fImage: TW3Image;
    fTimer: TW3Timer;
    procedure HandleTimer(Sender: TObject);
    procedure HandleImageClick(Sender: TObject);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure FormActivated; override;
  end;

implementation

{ TfrmSplash }

procedure TfrmSplash.HandleTimer(Sender: TObject);
begin
 FTimer.Enabled:= False;
 Application.GotoForm('Menu', feFromRight);
end;

procedure TfrmSplash.HandleImageClick(Sender: TObject);
begin
 FTimer.Enabled:= False;
 Application.GotoForm('Menu', feFromRight);
end;


procedure TfrmSplash.FormActivated;
begin
  inherited;
  FTimer.Enabled:= true;
end;

procedure TfrmSplash.InitializeForm;
begin
  inherited;
  Self.Color:= clWhite;
  handle.addEventListener('devicemotion', @Resize, false);
end;

procedure TfrmSplash.InitializeObject;
begin
  inherited;
  {$I 'Splash:impl'}
  handle.addEventListener('devicemotion', @Resize, false);
  fImage:= TW3Image.Create(self);
  fImage.OnClick:= HandleImageClick;
  fTimer:= TW3Timer.Create(self);
  FTimer.Delay:= 3000;
  FTimer.OnTime:= HandleTimer;
end;
 
procedure TfrmSplash.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin
   fImage.SetBounds(10,10,ClientWidth-20,ClientHeight-10);
   //change logo based on device orientation
   if ClientWidth > ClientHeight then
    fImage.Url:= 'res\logo-horiz.png'
   else
    fImage.Url:= 'res\logo-vert.png';
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmSplash);
end.
