unit Journal;

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
  SmartCL.Controls.Elements,
  SmartCL.Controls.Button;

type
  TfrmJournal = class(TW3Form)
  private
    {$I 'Journal:intf'}
    fLayout: TLayout;
    fHeader: TW3Label;
    fMtnLbl: TW3Label;
    fImage: TW3Image;
    fRankLbl: TW3Label;
    fDiv: TW3DivHTMLElement;
    fBackBtn: TW3Button;
    fEditBtn: TW3Button;
    fUndoBtn: TW3Button;
    fRank: String;
    fMountain: String;
    fCompleted: String;
  protected
    procedure HandleEditClick(sender: Tobject);
    procedure HandleUndoClick(sender: Tobject);
    procedure HandleBackClick(sender: Tobject);
    procedure FormDeactivated;override;
    procedure FormActivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    property MtnLbl: TW3Label read fMtnLbl write fMtnLbl;
    property Image: TW3Image read fImage write fImage;
    property RankLbl: TW3Label read fRankLbl write fRankLbl;
    property Rank: String read fRank write fRank;
    property Mountain: String read fMountain write fMountain;
    property Completed: String read fCompleted write fCompleted;
  end;

implementation

uses Complete, UntCommon;

{ TJournal }

procedure TfrmJournal.HandleUndoClick(sender: Tobject);
begin
 RemoveRec(Rank);
 Application.GotoForm('Mountain', feToLeft);
end;

procedure TfrmJournal.HandleEditClick(sender: Tobject);
begin
  TfrmComplete(Application.FormByName('Complete')).Mode:= cmEdit;
  TfrmComplete(Application.FormByName('Complete')).Rank:= Rank;
  TfrmComplete(Application.FormByName('Complete')).CompleteDate.Text:= getCompDate(Rank);
  TfrmComplete(Application.FormByName('Complete')).Notes.Text:= getNotes(Rank);
  Application.GotoForm('Complete', feToLeft);
end;

procedure TfrmJournal.HandleBackClick(sender: Tobject);
begin
 Application.GotoForm('Mountain', feToLeft);
end;

procedure TfrmJournal.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TfrmJournal.FormActivated;
begin
  inherited;
  if getCompleted(Rank) then
   fImage.Url:= 'res\mtn128C.png'
  else
   fImage.Url:= 'res\mtn128.png';

  fDiv.InnerHTML:=
  '<div>' +
  '<table style="width:100%; height:100%">' +
   '<tr>' +
     '<td><Strong>Completed:</Strong></td>' +
     '<td>' +  getCompDate(Rank) + '</td>' +
   '</tr>' +
   '<tr>' +
     '<td><Strong>Notes:</Strong></td>' +
     '<td>' + getNotes(Rank) + '</td>' +
   '</tr>' +
  '</table>' +
'</div>';
 end;

procedure TfrmJournal.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
end;

procedure TfrmJournal.InitializeObject;
begin
  inherited;
  {$I 'Journal:impl'}
  handle.addEventListener('devicemotion', @Resize, false);

  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'Journal';
  fHeader.AlignText:= taCenter;

  fMtnLbl:= TW3Label.Create(self);
  fMtnLbl.AlignText:= taCenter;
  fMtnLbl.Height:= 32;
  fMtnLbl.Caption:= 'Unknown';

  fImage:= TW3Image.Create(self);
  fImage.Height:= 100; fImage.Width:= 100;
  fImage.Url:= 'res\mtn128.png';

  fRankLbl:= TW3Label.Create(self);
  fRankLbl.AlignText:= taCenter;
  fRankLbl.Height:= 32;
  fRankLbl.Caption:= '0';

  fDiv:= TW3DivHTMLElement.Create(self);
  fDiv.StyleClass:= 'TW3ControlBorder';

  fBackBtn:= TW3Button.Create(self);
  fBackBtn.Width:= 125; fBackBtn.Height:= 32;
  fBackBtn.Caption:= 'Back';
  fBackBtn.OnClick:= HandleBackClick;

  fEditBtn:= TW3Button.Create(self);
  fEditBtn.Width:= 125; fEditBtn.Height:= 32;
  fEditBtn.Caption:= 'Edit';
  fEditBtn.OnClick:= HandleEditClick;

  fUndoBtn:= TW3Button.Create(self);
  fUndoBtn.Width:= 125; fUndoBtn.Height:= 32;
  fUndoBtn.Caption:= 'Undo';
  fUndoBtn.OnClick:= HandleUndoClick;

   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Top(Layout.Height(100), Layout.Left(Layout.Spacing(5).Stretch, [fMtnLbl, fImage, fRankLbl])),
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fBackBtn, fEditBtn, fUndoBtn])),
                           Layout.Client(fDiv)]
                         );
end;
 
procedure TfrmJournal.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin
   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                          Layout.Top(fHeader),
                          Layout.Top(Layout.Height(100), Layout.Left(Layout.Spacing(5).Stretch, [fMtnLbl, fImage, fRankLbl])),
                          Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fBackBtn, fEditBtn, fUndoBtn])),
                          Layout.Client(fDiv)]
                         );

   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmJournal);
end.
