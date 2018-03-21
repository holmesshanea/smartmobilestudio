unit Main;

interface

uses 
  System.Colors,
  System.Types,
  System.JSON,
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
  TfrmMain = class(TW3Form)
  private
    {$I 'Main:intf'}
    fHeader: TW3Label;
    fRank: TW3Label;
    fBackBtn: TW3Button;
    fSendBtn: TW3Button;
    fContinueBtn: TW3Button;
    fLayout: TLayout;
  protected
    procedure HandleBackClick(sender: Tobject);
    procedure HandleSendClick(Sender: TObject);
    procedure HandleContinueClick(Sender: TObject);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    procedure FormActivated; override;
    procedure FormDeactivated;override;
  end;

implementation

uses Common, Mountains;

{ TMain }

procedure TfrmMain.HandleBackClick(sender: Tobject);
begin
 Application.GotoForm('Menu', feToLeft);
end;

procedure TfrmMain.HandleContinueClick(Sender: TObject);
begin
 //TfrmMountains(Application.FormByName('Mountains')).ListBox.SelectedIndex:= 0;
 TfrmMountains(Application.FormByName('Mountains')).ListBox.ScrollController.ScrollTo(0,0);
 Application.GotoForm('Mountains', feFromRight);
end;

procedure TfrmMain.HandleSendClick(Sender: TObject);
begin
 //mail completion to ADK46ers
end;

procedure TfrmMain.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TfrmMain.FormActivated;
begin
  inherited;
  if CompArray.Length < 46 then
  begin
   fSendBtn.Enabled:= False;
   fHeader.Caption:= 'Remaining';
   fRank.Caption:= intToStr(46 - CompArray.Length);
  end
  else
  begin
   fSendBtn.Enabled:= True;
   fHeader.Caption:= 'Congratulations!';
   fRank.Caption:= '0';
  end;

   if Mode = mdRegular then
  begin
   fHeader.Caption:= 'Remaining - [Regulars]';
   fRank.StyleClass:= 'regularrank';
  end
  else
  begin
   fHeader.Caption:= 'Remaining - [Winters]';
   fRank.StyleClass:= 'winterrank';
  end;

end;

procedure TfrmMain.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  self.Color:= clWhite;

   if Mode = mdRegular then
  begin
   fHeader.Caption:= 'Remaining - [Regulars]';
   fRank.StyleClass:= 'regularrank';
  end
  else
  begin
   fHeader.Caption:= 'Remaining - [Winters]';
   fRank.StyleClass:= 'winterrank';
  end;

end;

procedure TfrmMain.InitializeObject;
begin
  inherited;
  {$I 'Main:impl'}
  handle.addEventListener('devicemotion', @Resize, false);
  fHeader:= TW3Label.Create(self);
  fHeader.Height:= 32;
  fHeader.Caption:= 'Remaining';
  fHeader.AlignText:= taCenter;
  fHeader.StyleClass:= 'header';

  fRank:= TW3Label.Create(self);
  fRank.Width:= 150; fRank.Height:= 150;
  fRank.Caption:= '46';
  fRank.AlignText:= taCenter;

  if Mode = mdRegular then
  begin
   fHeader.Caption:= 'Remaining - [Regulars]';
   fRank.StyleClass:= 'regularrank';
  end
  else
  begin
   fHeader.Caption:= 'Remaining - [Winters]';
   fRank.StyleClass:= 'winterrank';
  end;


  fBackBtn:= TW3Button.Create(self);
  fBackBtn.Height:= 32; fBackBtn.Width:= 125;
  fBackBtn.Caption:= 'Back';
  fBackBtn.OnClick:= HandleBackClick;


  fSendBtn:= TW3Button.Create(self);
  fSendBtn.Height:= 32; fSendBtn.Width:= 125;
  fSendBtn.Caption:= 'Send';
  fSendBtn.OnClick:= HandleSendClick;
  fSendBtn.Enabled:= False;

  fContinueBtn:= TW3Button.Create(self);
  fContinueBtn.Height:= 32; fContinueBtn.Width:= 125;
  fContinueBtn.Caption:= 'Continue';
  fContinueBtn.OnClick:= HandleContinueClick;

end;
 
procedure TfrmMain.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin
   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fBackBtn, fSendBtn, fContinueBtn])),
                           Layout.Client(Layout.Center(fRank))
                          ]
                          );
   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMain);
end.
