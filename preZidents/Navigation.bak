unit untNavigation;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls, SmartCL.Scroll, SmartCL.Controls.Elements, SmartCL.Inet,
  SmartCL.Scroll,
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
 fScroll.Content.InnerHTML:= '<div>' +
  '<h2><center>' + fPresidents.presidents[fIndex].rank + '</center></h2><br>' +
  '<h2><center>' + fPresidents.presidents[fIndex].name + '</center></h2><br>' +
  '<h3><center>' + fPresidents.presidents[fIndex].dates + '</center></h3><br>' +
  '<center> <img src="' + 'res\' + intToStr(fIndex + 1) + '.jpg' +
             '" alt="image" height="150" width="150" style="border:5px solid red"> </center><br>' +
  '<p>' + fPresidents.presidents[fIndex].notes + '</p>' +
  '</div>';
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
                           Layout.Client(Layout.Margins(10,10,10,10),fScroll)
                          ]);
  FHttp.Get('res\presidents.json');
  fScroll.Content.SetBounds(0,0, fScroll.clientWidth, fScroll.clientHeight + 2000);

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
  fTitle.Caption:= 'United States Presidents';
  fTitle.AlignText:= taCenter;
  fTitle.Handle.style.setProperty('font-family', 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif"');
  fTitle.Handle.style.setProperty('font-size', '22px');
  fTitle.Handle.style.setProperty('color', 'blue');
   //create buttons for navigation
  fPrev:= TW3Button.Create(self);;
  fPrev.Caption:= 'Prev';
  fPrev.OnClick:= HandlePrevBtn;
  fNext:= TW3Button.Create(self);;
  fNext.Caption:= 'Next';
  fNext.Onclick:= HandleNextBtn;
  //create a div for displaying data
  fScroll:= TW3ScrollControl.Create(self);
  fScroll.Handle.style.setProperty('background-color', 'white');
  //fData.Handle.style.setProperty('overflow', 'scroll');
  FHttp := TW3HttpRequest.Create;
  FHttp.OnDataReady:= HandleHttpDataReady;
end;
 
procedure TfrmNavigation.Resize;
begin
  inherited;
  if assigned(FLayout) then
  begin
    FLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmNavigation);
end.
