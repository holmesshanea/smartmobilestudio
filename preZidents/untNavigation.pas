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
    fTitle: TW3Label;
    fPrev: TW3Button;
    fNext: TW3Button;
    fScrollbox: TW3ScrollBox;
    fName: TW3Label;
    fDates: TW3Label;
    fImage: TW3Image;
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
    procedure ResizeContent;
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
 fName.Caption:= fPresidents.presidents[fIndex].rank + ' - ' + fPresidents.presidents[fIndex].name;
 fDates.Caption:= fPresidents.presidents[fIndex].dates;
 fNotes.InnerText:= fPresidents.presidents[fIndex].notes;
 fImage.Url:= 'res\' + intToStr(fIndex + 1) + '.jpg';
end;

procedure TfrmNavigation.ResizeContent;
begin
 fName.SetBounds(0,0,fScrollBox.Content.clientWidth,32);
 fDates.SetBounds(0,fName.Top + fName.Height,fScrollBox.Content.clientWidth,fName.Top + fName.Height + 32);
 fImage.SetBounds((fScrollBox.Content.clientWidth div 2)-75,
                   fDates.Top + fDates.Height,
                  150,
                   150);
 fNotes.SetBounds(0, fImage.Top + fImage.Height + 10, fScrollBox.Content.clientWidth,fScrollBox.Content.clientWidth);
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
                           Layout.Client(Layout.Margins(10,10,10,10),fScrollBox)
                          ]);
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

  fScrollbox:= TW3ScrollBox.Create(self);
  fImage:= TW3Image.Create(fScrollbox.content);
  fName:= TW3Label.Create(fScrollbox.content);
  fName.AlignText:= taCenter;
  fName.Caption:= 'Unknown';
  fDates:= TW3Label.Create(fScrollbox.content);
  fDates.AlignText:= taCenter;
  fDates.Caption:= 'Dates';
  fNotes:= TW3Label.create(fScrollbox.content);

  FHttp := TW3HttpRequest.Create;
  FHttp.OnDataReady:= HandleHttpDataReady;
end;
 
procedure TfrmNavigation.Resize;
begin
  inherited;
  if assigned(FLayout) then
  begin
    FLayout.Resize(self);
    ResizeContent;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmNavigation);
end.
