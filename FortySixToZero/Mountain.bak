unit Mountain;

interface

uses 
  ECMA.Date,
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
  SmartCL.Controls.Button,
  SmartCL.Controls.Elements;

type
  TfrmMountain = class(TW3Form)
  private
    fLayout: TLayout;
    fHeader: TW3Label;
    fImage: TW3Image;
    fBackBtn: TW3Button;
    fMapBtn: TW3Button;
    fCompleteBtn: TW3Button;
    fDiv: TW3DivHTMLElement;
    fRank: String;
    fMountain: String;
    fElevation: String;
    fProminence: String;
    fRange: String;
    fLatLon: String;
    fSource: String;
  protected
    procedure HandleMapClick(sender: TObject);
    procedure HandleBackClick(sender: TObject);
    procedure HandleCompleteClick(sender: TObject);
    procedure HandleJournalClick(sender: TObject);
    procedure FormDeactivated;override;
    procedure FormActivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
   {$I 'Mountain:intf'}
    property Header: TW3Label read fHeader write fHeader;
    property Image: TW3Image read fImage write fImage;
    property Source: String read fSource write fSource;
    property Rank: String read fRank write fRank;
    property Mountain: String read fMountain write fMountain;
    property Elevation: String read fElevation write fElevation;
    property Prominence: String read fProminence write fProminence;
    property MtnRange: String read fRange write fRange;
    property LatLon: String read fLatLon write fLatLon;
  end;

implementation

uses UntCommon, Mountains, Complete, Journal, Map;

{ TMountain }


procedure TfrmMountain.HandleMapClick(sender: TObject);
begin
 TfrmMap(Application.FormByName('Map')).Mountain:= MtnArray[StrToInt(Rank)];
 TfrmMap(Application.FormByName('Map')).Latitude:= LatArray[StrToInt(Rank)];
 TfrmMap(Application.FormByName('Map')).Longitude:= LonArray[StrToInt(Rank)];
 Application.GotoForm('Map', feFromRight);
end;

procedure TfrmMountain.HandleJournalClick(sender: TObject);
begin
 TfrmJournal(Application.FormByName('Journal')).Rank:= Rank;
 TfrmJournal(Application.FormByName('Journal')).MtnLbl.Caption:= MtnArray[StrToInt(Rank)];
 TfrmJournal(Application.FormByName('Journal')).RankLbl.Caption:= Rank;
 Application.GotoForm('Journal', feFromRight);
end;

procedure TfrmMountain.HandleCompleteClick(sender: TObject);
begin
 TfrmComplete(Application.FormByName('Complete')).Mountain:= MtnArray[StrToInt(Rank)];
 TfrmComplete(Application.FormByName('Complete')).Mode:= cmNone;
 TfrmComplete(Application.FormByName('Complete')).Rank:= Rank;
 TfrmComplete(Application.FormByName('Complete')).CompleteDate.Text:= FormatDateTime('yyyy-mm-dd',Now);
 TfrmComplete(Application.FormByName('Complete')).Notes.Text:= '<None>';
 Application.GotoForm('Complete', feFromRight);
end;

procedure TfrmMountain.HandleBackClick(sender: TObject);
begin
 if fSource = 'Mountains' then
  Application.GotoForm('Mountains', feToLeft)
 else
  Application.GotoForm('Journals', feToLeft);
end;

procedure TfrmMountain.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TfrmMountain.FormActivated;
begin
  inherited;
  fHeader.Caption:=  Mountain;
  if getCompleted(Rank) then
  begin
   fHeader.TextNode.style.setProperty('text-decoration', 'line-through');
   fImage.Url:= 'res\mtn128C.png';
  end
  else
  begin
   fHeader.TextNode.style.setProperty('text-decoration', 'none');
   fImage.Url:= 'res\mtn128.png';
  end;
  fDiv.InnerHTML:=

  '<div style="overflow: hidden; overflow-y: auto; height: 100%;">' +
  '<table style="width:100%; height:100%">' +
   '<tr>' +
     '<td><Strong>RANK:</Strong></td>' +
     '<td>' + Rank + '</td>' +
   '</tr>' +
   '<tr>' +
     '<td><Strong>RANGE:</Strong></td>' +
     '<td>' + MtnRange + '</td>' +
   '</tr>' +
   '<tr>' +
     '<td><Strong>ELEVATION:</Strong></td>' +
     '<td>' + Elevation + '</td>' +
   '</tr>' +
   '<tr>' +
     '<td><Strong>PROMINENCE:</Strong></td>' +
     '<td>' + Prominence + '</td>' +
   '</tr>' +
   '<tr>' +
     '<td><Strong>LONG / LAT:</Strong></td>' +
     '<td>' + LatLon + '</td>' +
   '</tr>' +
  '</table>' +
'</div>';

if recExists(Rank) then
begin
  fCompleteBtn.Caption:= 'Journal';
  fCompleteBtn.OnClick:= HandleJournalClick;
end
else
begin
 fCompleteBtn.Caption:= 'Complete';
 fCompleteBtn.OnClick:= HandleCompleteClick;
end;
end;

procedure TfrmMountain.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
end;

procedure TfrmMountain.InitializeObject;
begin
  inherited;
  {$I 'Mountain:impl'}
  handle.addEventListener('devicemotion', @Resize, false);
  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'Mountain';
  fHeader.AlignText:= taCenter;

  fImage:= TW3Image.Create(self);
  fImage.Height:= 100; fImage.Width:= 100;
  fImage.Url:= 'res\mtn128.png';

  fBackBtn:= TW3Button.Create(self);
  fBackBtn.Height:= 32; fBackBtn.Width:= 125;
  fBackBtn.Caption:= 'Back';
  fBackBtn.OnClick:= HandleBackClick;

  fMapBtn:= TW3Button.Create(self);
  fMapBtn.Height:= 32; fMapBtn.Width:= 125;
  fMapBtn.Caption:= 'Map';
  fMapBtn.OnClick:= HandleMapClick;

  fCompleteBtn:= TW3Button.Create(self);
  fCompleteBtn.OnClick:= HandleCompleteClick;
  fCompleteBtn.Height:= 32; fCompleteBtn.Width:= 125;
  //if not completed then
  fCompleteBtn.Caption:= 'Complete';
  //else
  //fCompleteBtn.Caption:= 'Journal';

  fDiv:= TW3DivHTMLElement.Create(self);
  fDiv.Color:= clWhite;
  FDiv.StyleClass:= 'TW3ControlBorder';


     fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Top(Layout.Center(fImage)),
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fBackBtn, fMapBtn, fCompleteBtn])),
                          Layout.Client(fDiv)]
                         );

end;
 
procedure TfrmMountain.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin

     fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Top(Layout.Center(fImage)),
                           Layout.Bottom(Layout.Height(32), Layout.Left(Layout.Spacing(5).Stretch, [fBackBtn, fMapBtn, fCompleteBtn])),
                          Layout.Client(fDiv)]
                         );

   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMountain);
end.
