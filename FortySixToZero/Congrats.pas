unit Congrats;

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
  SmartCL.Layout,
  SmartCL.Controls.Label,
  SmartCL.Controls.Image,
  SmartCL.Controls.Button;

type
  TCongrats = class(TW3Form)
    procedure HandleBtnClick(Sender: TObject);
  private
    {$I 'Congrats:intf'}
    fLayout: TLayout;
    fLabel: TW3Label;
    fImage: Tw3Image;
    fButton: TW3Button;
  protected
    procedure FormActivated;override;
    procedure FormDeactivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    property Label: TW3Label read fLabel write fLabel;
    property Image: TW3Image read fImage write fImage;
    property Button: TW3Button read fButton write fButton;
  end;

implementation

uses Mountain;

{ TCongrats }

procedure TCongrats.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TCongrats.FormActivated;
begin
  inherited;
  //
end;

procedure TCongrats.HandleBtnClick(Sender: TObject);
begin
  Application.GotoForm('Mountain', fetoLeft);
end;

procedure TCongrats.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
end;

procedure TCongrats.InitializeObject;
begin
  inherited;
  {$I 'Congrats:impl'}
  handle.addEventListener('devicemotion', @Resize, false);
  fLabel:= TW3Label.Create(self);
  fLabel.Caption:= 'Congratulations!';
  fLabel.AlignText:= taCenter;
  fLabel.Height:= 32;
  fLabel.StyleClass:= 'header';

  fImage:= Tw3Image.Create(self);
  fImage.Width:= 200; fImage.Height:= 200;

  fButton:= TW3Button.Create(self);
  fButton.Caption:= 'Ok';
  fButton.Width:= 125;
  fButton.Height:= 32;
  fButton.OnClick:= HandleBtnClick;

   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fLabel),
                           Layout.Client(Layout.Center(fImage)),
                           Layout.Bottom(Layout.Height(32), Layout.Center(fButton))
                          ]
                         );

end;
 
procedure TCongrats.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin

   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fLabel),
                           Layout.Client(Layout.Center(fImage)),
                           Layout.Bottom(Layout.Height(32), Layout.Center(fButton))
                          ]
                         );

   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TCongrats);
end.
