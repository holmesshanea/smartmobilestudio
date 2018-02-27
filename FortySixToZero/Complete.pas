unit Complete;

interface

uses 
  System.Colors,
  System.Types,
  System.Types.Convert,
  System.Objects,
  System.Time,
  System.JSON,
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
  SmartCL.Controls.EditBox,
  SmartCL.Controls.Memo,
  SmartCL.Controls.Button,

  Common, SmartCL.Controls.Panel, SmartCL.Controls.Image;

type

  TfrmComplete = class(TW3Form)
  private
    {$I 'Complete:intf'}
    fMountain: String;
    fMode: TCompleteMode;
    fRank: String;
    fLayout: TLayout;
    fHeader: TW3Label;
    fCompleteDate: TW3EditBox;
    fMemo: TW3Memo;
    fOkBtn: TW3Button;
    fCancelBtn: TW3Button;
  protected
    procedure HandleGotFocus(Sender: TObject);
    procedure HandleCancelClick(Sender: TObject);
    procedure HandleOkClick(Sender: TObject);
    procedure FormActivated;override;
    procedure FormDeactivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    property  Mountain: String read fMountain write fMountain;
    property  Mode: TCompleteMode read fMode write fMode;
    property  Rank: String read fRank write fRank;
    property  CompleteDate: TW3EditBox read fCompleteDate write fCompleteDate;
    property  Notes: TW3Memo read fMemo write fMemo;
    property  OkBtn: TW3Button read fOkBtn;
    property  CancelBtn: TW3Button read fCancelBtn;
  end;

implementation

uses Congrats;

{ TForm1 }

procedure TfrmComplete.HandleGotFocus(Sender: TObject);
begin
 Handle.ReadyExecute( procedure ()
 begin
    fMemo.handle.select();
    fMemo.handle.focus();
 end);
end;

procedure TfrmComplete.HandleCancelClick(Sender: TObject);
begin
 Application.GotoForm('Mountain', fetoLeft);
end;

procedure TfrmComplete.HandleOkClick(Sender: TObject);
begin
 //validate date and notes text
 if (CompleteDate.Text <> '') AND (Notes.Text <> '') then
 begin
  if fMode = cmNone then
  begin
  if not recExists(Rank) then
  begin
   AddRec(Rank, CompleteDate.Text, Notes.Text);
  end
  else
  ShowMessage('You have already completed this mountain!');
  end
  else
  begin
   //edit CompArray item here with new changes
    EditRec(Rank, CompleteDate.Text, Notes.Text);
  end;

  if CompArray.Length <> 46 then
   TCongrats(Application.FormByName('Congrats')).Image.Url:= 'res\patch' + rank + '.jpg'
  else
   TCongrats(Application.FormByName('Congrats')).Image.Url:= 'res\adk46erlogo.png';
  Application.GotoForm('Congrats', fetoLeft);
 end;
end;

procedure TfrmComplete.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TfrmComplete.FormActivated;
begin
  inherited;
  fHeader.Caption:=  'Complete' + ' -[' + Mountain + ']';
  fMemo.Handle.ReadyExecute(procedure ()
  begin
  fMemo.handle.select();
  fMemo.handle.focus();
  end);
end;

procedure TfrmComplete.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
end;

procedure TfrmComplete.InitializeObject;
begin
  inherited;
  {$I 'Complete:impl'}
   handle.addEventListener('devicemotion', @Resize, false);

  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'Complete';
  fHeader.AlignText:= taCenter;

  fCompleteDate := TW3EditBox.Create(self);
  fCompleteDate.InputType := itDate;
  fCompleteDate.Text:= FormatDateTime('yyyy-mm-dd', Now);

  fMemo:= TW3Memo.Create(self);
  fMemo.TagId:= 'memo';
  fMemo.Text:= '<None>';
  fMemo.OnGotFocus:= HandleGotFocus;

  fOkBtn:= TW3Button.Create(self);
  fOkBtn.Width:= 125; fOkBtn.Height:= 32;
  fOkBtn.Caption:= 'Ok';
  fOkBtn.OnClick:= HandleOkClick;

  fCancelBtn:= TW3Button.Create(self);
  fCancelBtn.Width:= 125; fCancelBtn.Height:= 32;
  fCancelBtn.Caption:= 'Cancel';
  fCancelBtn.OnCLick:= HandleCancelClick;

  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                            Layout.Top(fHeader),
                           Layout.Top(Layout.Center(fCompleteDate)),
                           Layout.Client(fMemo),
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fCancelBtn, fOkBtn]))
                           ]
                         );
end;
 
procedure TfrmComplete.Resize;
begin
  inherited;
   if  Handle.Valid and (csReady in ComponentState) then
  begin
   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Top(Layout.Margins(5).Spacing(5), Layout.Center(fCompleteDate)),
                           Layout.Client(Layout.Margins(5).Spacing(5), fMemo),
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fCancelBtn, fOkBtn]))
                           ]
                         );
   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmComplete);
end.
