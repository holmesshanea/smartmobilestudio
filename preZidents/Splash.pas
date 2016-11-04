unit Splash;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCl.Controls.Image, SmartCL.Time;

type
  TfrmSplash = class(TW3Form)
  private
    {$I 'Splash:intf'}
    fLayout: TLayout;
    fLogo: TW3Image;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure FormActivated; override;
  end;

implementation

{ TfrmSplash }

procedure TfrmSplash.FormActivated;
begin
 inherited;
 TW3EventRepeater.After(3000, lambda Application.GoToForm('Navigation', feFromRight) end);
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
