unit Splash;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application,  SmartCL.Time,
  SmartCL.Controls.Label, SmartCL.Layout;

type
  TSplash = class(TW3Form)
    procedure SplashActivate(Sender: TObject);
    procedure SplashDeactivate(Sender: TObject);
    procedure lblADKProfileClick(Sender: TObject);
  private
    {$I 'Splash:intf'}
     fLayout: TLayout;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure FormActivated; override;
  end;

  function window: variant; external 'window' property;

implementation

{ TSplash }

procedure TSplash.FormActivated;
begin
  inherited;
  TW3EventRepeater.After(3000, lambda Application.GotoForm('Main', feFromRight) end);
end;



procedure TSplash.lblADKProfileClick(Sender: TObject);
begin

end;
procedure TSplash.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TSplash.InitializeObject;
begin
  inherited;
  {$I 'Splash:impl'}
   window.addEventListener('devicemotion', @Resize, false);

  lblADKProfile.InnerHTML:= '<div style="text-align: center; position: relative;' +
                            ' top: 50%; -ms-transform: translateY(-50%); ' +
                            ' -webkit-transform: translateY(-50%); ' +
                            'transform: translateY(-50%);"> ' +
                            'ADK Profile <br> by Cold River Labs<br>(c) 2017 </div>';
  lblADKProfile.AlignText:= taCenter;

   FLayout:= Layout.Client(Layout.Client(lblADKProfile));
end;
 
procedure TSplash.Resize;
begin
  inherited;
  if Assigned(FLayout) then
  begin
    FLayout.Resize(self);
  end;
end;



procedure TSplash.SplashActivate(Sender: TObject);
begin
 // FLayout:= Layout.Client(Layout.Client(lblADKProfile));
end;

procedure TSplash.SplashDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;
initialization
  Forms.RegisterForm({$I %FILE%}, TSplash);
end.
