unit untNavigation;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls, SmartCL.Scroll, SmartCL.Controls.Elements, SmartCL.Inet,
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
    fName: TW3Label;
    fDates: TW3Label;
    fImage: TW3Image;
    fNotes: TW3DIVHtmlElement;
    fScrollBox: TW3ScrollControl;
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
 fImage.Url:= 'res\' + intToStr(fIndex + 1) + '.jpg';
 fNotes.InnerText:= fPresidents.presidents[fIndex].notes;
end;

procedure TfrmNavigation.ResizeContent;
begin
 fScrollBox.Content.SetBounds(0, 0, fScrollBox.clientWidth, fScrollBox.clientHeight);
 fName.SetBounds(0,0,fScrollBox.Content.clientWidth,32);
 fDates.SetBounds(0,fName.Top + fName.Height,fScrollBox.Content.clientWidth,fName.Top + fName.Height + 32);
 fImage.SetBounds((fScrollBox.Content.clientWidth div 2)-75,
                   fDates.Top + fDates.Height,
                  150,
                   150);
 fNotes.setBounds(0,fImage.top + fImage.Height + 10, fScrollBox.clientWidth, fScrollBox.ClientHeight);
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
  Self.StyleClass:= 'none';
  Self.Color:= clWhite;
  fIndex:= 0;
  //create label for title
  fTitle:= TW3Label.Create(self);
  fTitle.Caption:= 'PreZidents';
  fTitle.AlignText:= taCenter;
  //create buttons for navigation
  fPrev:= TW3Button.Create(self);;
  fPrev.Caption:= 'Prev';
  fPrev.OnClick:= HandlePrevBtn;
  fNext:= TW3Button.Create(self);;
  fNext.Caption:= 'Next';
  fNext.Onclick:= HandleNextBtn;
  //create the scrolling area for the president data controls
  fScrollbox:= TW3ScrollControl.Create(self);
  fScrollbox.Handle.style.setProperty('background-color', 'Blue');
  //create the president data controls on scrolling area
  fName:= TW3Label.Create(fScrollbox.content);
  fName.AlignText:= taCenter;
  fName.Caption:= 'Unknown';
  fDates:= TW3Label.Create(fScrollbox.content);
  fDates.AlignText:= taCenter;
  fDates.Caption:= 'Dates';
  fImage:= TW3Image.Create(fScrollbox.content);
  fNotes:= TW3DIVHtmlElement.create(fScrollbox.content);
  fNotes.Handle.style.setProperty('overflow', 'auto');
  fNotes.Handle.style.setProperty('background-color', 'Red');
  //create HTTP request control for getting image from resources folder
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
