unit untNavigation;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls, SmartCL.Controls.Elements, SmartCL.Inet, ECMA.JSON;

type
  TfrmNavigation = class(TW3Form)
  private
    {$I 'untNavigation:intf'}
    FHttp: TW3HttpRequest;
    fLayout: TLayout;
    fLayout2: TLayout;
    fTitle: TW3Label;
    fPrev: TW3Button;
    fNext: TW3Button;
    fContent: TW3Panel;
    fImage: TW3Image;
    fName: TW3Label;
    fDates: TW3Label;
    fNotes: TW3Label;
    fPresidents: Variant;
    fJSONStr: String;
    fIndex: integer;
  protected
    procedure HandlePrevBtn(Sender: TObject);
    procedure HandleNextBtn(Sender: TObject);
    procedure HandleHttpDataReady(Sender:TW3HttpRequest);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure UpdateContent;
    procedure UpdateBtns;
  end;

implementation

{ TfrmNavigation }

procedure TfrmNavigation.UpdateBtns;
begin
 fPrev.Enabled:= fIndex > 0;
 fNext.Enabled:= fIndex < fPresidents.presidents.length-1;
end;

procedure TfrmNavigation.UpdateContent;
begin
 fName.Caption:= fPresidents.presidents[fIndex].name;
 fDates.Caption:= fPresidents.presidents[fIndex].dates;
 fNotes.InnerText:= fPresidents.presidents[fIndex].notes;
 fImage.Url:= 'res\' + intToStr(fIndex + 1) + '.jpg';
end;

procedure TfrmNavigation.HandlePrevBtn(Sender: TObject);
begin
 dec(fIndex);
 UpdateContent;
 UpdateBtns;
end;

procedure TfrmNavigation.HandleNextBtn(Sender: TObject);
begin
 inc(fIndex);
 UpdateContent;
 UpdateBtns;
end;

procedure TfrmNavigation.HandleHttpDataReady(Sender:TW3HttpRequest);
begin
  fJSONStr:= Sender.ResponseText;
  asm
   @fPresidents = JSON.parse(@fJSONStr);
   JSON.parse(@fJSONStr);
  end;
  UpdateContent;
  UpdateBtns;
end;

procedure TfrmNavigation.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
   FLayout:= Layout.Client([
                           Layout.Top(Layout.Margins(0,10,0,0).Height(32), fTitle),
                           Layout.Bottom(layout.margins(0,0,0,10).height(42),[Layout.Right(layout.margins(0,0,10,0), fNext), Layout.Right(layout.margins(0,0,10,0),fPrev)]),
                           Layout.Client(Layout.Margins(10,10,10,10),fcontent)
                          ]);

   fLayout2:= Layout.Client(
                           [
                             Layout.Top(Layout.height(50).Margins(10,10,10,0), fName),
                             Layout.Top(Layout.height(50).Margins(10,0,10,0), fDates),
                             Layout.Top(Layout.height(150), Layout.center(fImage)),
                             Layout.Client(Layout.Margins(10,10,10,10), fNotes)
                           ]
                           );

  FHttp.Get('res\presidents.json');
end;

procedure TfrmNavigation.InitializeObject;
begin
  inherited;
  {$I 'untNavigation:impl'}
  fIndex:= 0;
  fTitle:= TW3Label.Create(self);
  fTitle.Caption:= 'PreZidents';
  fTitle.AlignText:= taCenter;
  fPrev:= TW3Button.Create(self);;
  fPrev.Caption:= 'Prev';
  fPrev.OnClick:= HandlePrevBtn;
  fNext:= TW3Button.Create(self);;
  fNext.Caption:= 'Next';
  fNext.Onclick:= HandleNextBtn;
  fContent:= TW3Panel.create(self);

  fImage:= TW3Image.Create(self);
  fImage.Width:= 150; fImage.Height:= 150;
  fName:= TW3Label.Create(Self);
  fName.AlignText:= taCenter;
  fName.Caption:= 'Unknown';
  fDates:= TW3Label.Create(Self);
  fDates.AlignText:= taCenter;
  fDates.Caption:= 'Dates';

  fNotes:= TW3Label.create(self);
  FHttp := TW3HttpRequest.Create;
  FHttp.OnDataReady:= HandleHttpDataReady;
end;
 
procedure TfrmNavigation.Resize;
begin
  inherited;
  if assigned(FLayout) then
  begin
    FLayout.Resize(self);
    FLayout2.Resize(fContent);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmNavigation);
end.
