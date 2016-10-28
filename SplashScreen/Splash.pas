unit Splash;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Time,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCL.Controls.Image,
  SmartCL.Layout;

type
  TfrmSplash = class(TW3Form)
  private
    {$I 'Splash:intf'}
    fLayout: TLayout;
    fLayout2: TLayout;
    fImage: TW3Image;
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
  TW3EventRepeater.After(3000, lambda Application.GotoForm('Main', feFromRight) end);
end;

procedure TfrmSplash.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  FLayout:= Layout.Client(SplashPanel);
  FLayout2:= Layout.Client(W3Image1);
end;

procedure TfrmSplash.InitializeObject;
begin
  inherited;
  {$I 'Splash:impl'}
end;
 
procedure TfrmSplash.Resize;
begin
  inherited;
  if Assigned(FLayout) then
  begin
    FLayout.Resize(self);
    FLayout2.Resize(SplashPanel);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmSplash);
end.
