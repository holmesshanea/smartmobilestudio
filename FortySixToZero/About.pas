unit About;

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
  TAbout = class(TW3Form)
  private
    {$I 'About:intf'}
    fLayout: TLayout;
    fHeader: TW3Label;
    fImage: TW3Image;
    fBackBtn: TW3Button;
    procedure HandleBackClick(sender: Tobject);
  protected
    procedure FormDeactivated;override;
    procedure FormActivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TAbout }

procedure TAbout.HandleBackClick(sender: Tobject);
begin
 Application.GotoForm('Menu', feToLeft);
end;

procedure TAbout.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TAbout.FormActivated;
begin
  inherited;
  //
end;

procedure TAbout.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
end;

procedure TAbout.InitializeObject;
begin
  inherited;
  {$I 'About:impl'}
  handle.addEventListener('devicemotion', @Resize, false);

  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'About';
  fHeader.AlignText:= taCenter;

  fImage:= TW3Image.Create(self);

  fBackBtn:= TW3Button.Create(self);
  fBackBtn.Width:= 125; fBackBtn.Height:= 32;
  fBackBtn.Caption:= 'Back';
  fBackBtn.OnClick:= HandleBackClick;

end;
 
procedure TAbout.Resize;
begin
  inherited;
   if  Handle.Valid and (csReady in ComponentState) then
  begin

  //change logo based on device orientation
   if ClientWidth > ClientHeight then
    fImage.Url:= 'res\about-horiz.png'
   else
    fImage.Url:= 'res\about-vert.png';


   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                          Layout.Top(fHeader),
                          Layout.Bottom(Layout.Center(fBackBtn)),
                          Layout.Client(fImage)]
                         );

   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TAbout);
end.
