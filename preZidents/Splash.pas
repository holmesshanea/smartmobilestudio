unit Splash;

interface

uses 
  System.Types, System.Time, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCl.Controls.Image, SmartCL.Time;

type
  TfrmSplash = class(TW3Form)
  private
    {$I 'Splash:intf'}
    fLayout: TLayout;
    fLogo: TW3Image;
    Timer: TW3Timer;
    procedure HandleOnTime(Sender: TObject);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure FormActivated; override;
  end;

implementation

{ TfrmSplash }

procedure TfrmSplash.HandleOnTime(Sender: TObject);
begin
 Application.GoToForm('Navigation', feFromRight);
end;

procedure TfrmSplash.FormActivated;
begin
 inherited;
 //TW3EventRepeater.After(3000, lambda Application.GoToForm('Navigation', feFromRight) end);
  Timer:= TW3Timer.Create(self);
  Timer.Delay:= 3000;
  Timer.Enabled:= True;
  Timer.OnTime:= HandleOnTime;

end;

procedure TfrmSplash.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  fLayout:= Layout.Client(fLogo);
  if self.Height > self.Width then
    fLogo.url:= 'res\splash_vert.png'
   else
    fLogo.URL:= 'res\splash_horz.png';
end;

procedure TfrmSplash.InitializeObject;
begin
  inherited;
  {$I 'Splash:impl'}
  handle.addEventListener('devicemotion', @Resize, false);
  fLogo:= TW3Image.Create(self);
  fLogo.SetBounds(0,0, self.ClientWidth, self.ClientHeight);
end;
 
procedure TfrmSplash.Resize;
begin
  inherited;
  if assigned(fLayout) then
  begin
   fLayout.Resize(self);
    if self.Height > self.Width then
     fLogo.url:= 'res\splash_vert.png'
    else
     fLogo.URL:= 'res\splash_horz.png';
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmSplash);
end.
