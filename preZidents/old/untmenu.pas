unit untmenu;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls, SmartCL.Inet, ECMA.JSON;

type

 TfrmMenu = class(TW3Form)
  private
    {$I 'untmenu:intf'}
    FHttp: TW3HttpRequest;
    fLayout: TLayout;
    fTitle: TW3Label;
    fPrev: TW3Button;
    fNext: TW3Button;
    //fDiv: TW3DIVHtmlElement;
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
    procedure UpdateBtns;
  end;

implementation

{ TfrmMenu }

procedure TfrmMenu.UpdateBtns;
begin
 fPrev.Enabled:= fIndex > 0;
 fNext.Enabled:= fIndex < fPresidents.presidents.length-1;
end;


procedure TfrmMenu.HandlePrevBtn(Sender: TObject);
begin
 //fJSON.Text:= fPresidents.presidents[dec(fIndex)].name;
 UpdateBtns;
end;

procedure TfrmMenu.HandleNextBtn(Sender: TObject);
begin
 //fJSON.Text:= fPresidents.presidents[inc(fIndex)].name;
 UpdateBtns;
end;

procedure TfrmMenu.HandleHttpDataReady(Sender:TW3HttpRequest);
begin
  fJSONStr:= Sender.ResponseText;
  asm
   @fPresidents = JSON.parse(@fJSONStr);
   JSON.parse(@fJSONStr);
  end;
  //fJSON.Text:= fPresidents.presidents[fIndex].name;
  UpdateBtns;
end;

procedure TfrmMenu.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  FLayout:= Layout.Client([
                           Layout.Top(Layout.Margins(0,10,0,0).Height(32), fTitle),
                           Layout.Bottom(layout.margins(0,0,0,10).height(42),[Layout.Right(layout.margins(0,0,10,0), fNext), Layout.Right(layout.margins(0,0,10,0),fPrev)])
                           //Layout.Client(Layout.Margins(10,10,10,10),fDiv)
                          ]);
  FHttp.Get('res\presidents.json');
end;

procedure TfrmMenu.InitializeObject;
begin
  inherited;
  {$I 'untmenu:impl'}
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
 // fDiv:= TW3DIVHtmlElement.create(self);
  FHttp := TW3HttpRequest.Create;
  FHttp.OnDataReady:= HandleHttpDataReady;
end;
 
procedure TfrmMenu.Resize;
begin
  inherited;
   if assigned(FLayout) then
    FLayout.Resize(self);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMenu);
end.
