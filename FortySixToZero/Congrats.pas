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
  private
    {$I 'Congrats:intf'}
    fLayout: TLayout;
    fLabel: TW3Label;
    fImage: Tw3Image;
    fOkBtn: TW3Button;
    fSendBtn: TW3Button;
    procedure HandleSendBtnClick(Sender: TObject);
    procedure HandleOkBtnClick(Sender: TObject);
  protected
    procedure FormActivated;override;
    procedure FormDeactivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    property Label: TW3Label read fLabel write fLabel;
    property Image: TW3Image read fImage write fImage;
    property OkBtn: TW3Button read fOkBtn write fOkBtn;
  end;

implementation

uses Common, Mountain;

{ TCongrats }

procedure TCongrats.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TCongrats.FormActivated;
begin
  inherited;
  if CompArray.Length = 46 then
   fSendBtn.Enabled:= True;
end;

procedure TCongrats.HandleOkBtnClick(Sender: TObject);
begin
  Application.GotoForm('Mountain', fetoLeft);
end;

procedure TCongrats.HandleSendBtnClick(Sender: TObject);
begin
  //
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

  fSendBtn:= TW3Button.Create(self);
  fSendBtn.Enabled:= False;
  fSendBtn.Caption:= 'Send';
  fSendBtn.Width:= 125;
  fSendBtn.Height:= 32;
  fSendBtn.OnClick:= HandleSendBtnClick;

  fOkBtn:= TW3Button.Create(self);
  fOkBtn.Caption:= 'Ok';
  fOkBtn.Width:= 125;
  fOkBtn.Height:= 32;
  fOkBtn.OnClick:= HandleOkBtnClick;

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
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fSendBtn, fOkBtn]))
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
