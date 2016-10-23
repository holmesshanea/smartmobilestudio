unit untNavigation;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls, SmartCL.Controls.Elements, SmartCL.Scroll, SmartCL.Inet,
  ECMA.JSON;

type

  TfrmNavigation = class(TW3Form)
    procedure frmNavigationActivate(Sender: TObject);
  private
    {$I 'untNavigation:intf'}
    FHttp: TW3HttpRequest;
    fLayout: TLayout;
    fTitle: TW3Label;
    fPrev: TW3Button;
    fNext: TW3Button;
    fScroll: TW3ScrollControl;
    fName: TW3Label;
    fDates: TW3Label;
    fImage: TW3Image;
    fNotes: TW3Memo;
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
 fNotes.Text:= fPresidents.presidents[fIndex].notes;
 fImage.Url:= 'res\' + intToStr(fIndex + 1) + '.jpg';
end;

procedure TfrmNavigation.ResizeContent;
begin
 fScroll.Content.SetBounds(0,0, fScroll.width, fScroll.Height + 300);
 fName.SetBounds(0,0,fScroll.Content.clientWidth,32);
 fDates.SetBounds(0,fName.Top + fName.Height,fScroll.Content.clientWidth,fName.Top + fName.Height + 32);
 fImage.SetBounds((fScroll.Content.clientWidth div 2)-75,
                   fDates.Top + fDates.Height,
                  150,
                   150);
 fNotes.SetBounds(0, fImage.Top + fImage.Height + 10, fScroll.Content.clientWidth, fScroll.content.clientHeight + 1000);
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

procedure TfrmNavigation.frmNavigationActivate(Sender: TObject);
begin

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
   w3_setStyle(fTitle.Handle, 'border', '2px');
   w3_setStyle(fTitle.Handle, 'background-color', 'blue');
   w3_setStyle(fTitle.Handle, 'color', 'white');
    w3_setStyle(fNotes.Handle, 'background-color', 'red');
   w3_setStyle(fNotes.Handle, 'color', 'white');
   FLayout:= Layout.Client([
                           Layout.Top(Layout.Margins(0,10,0,0).Height(32), fTitle),
                           Layout.Bottom(layout.margins(0,0,0,10).height(42),[Layout.Right(layout.margins(0,0,10,0), fNext), Layout.Right(layout.margins(0,0,10,0),fPrev)]),
                           Layout.Client(Layout.Margins(10,10,10,10),fScroll)
                          ]);
  FHttp.Get('res\presidents.json');
end;

procedure TfrmNavigation.InitializeObject;
begin
  inherited;
  {$I 'untNavigation:impl'}
  Self.StyleClass:= 'none';
  Self.Color:= clWhite;
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

  fScroll:= TW3ScrollControl.Create(self);
  fImage:= TW3Image.Create(fScroll.content);
  fName:= TW3Label.Create(fScroll.content);
  fName.AlignText:= taCenter;
  fName.Caption:= 'Unknown';
  fDates:= TW3Label.Create(fScroll.content);
  fDates.AlignText:= taCenter;
  fDates.Caption:= 'Dates';
  fNotes:= TW3Memo.create(fScroll.content);
  fNotes.Enabled:= False;
  w3_setStyle(fNotes.Handle, 'background-color', 'white');
  w3_setStyle(fNotes.Handle, 'border', 'none');
  fNotes.Text:= 'Description';
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
