unit Main;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Listbox, SmartCL.Inet, ECMA.JSON, System.Colors;

type
  TMain = class(TW3Form)
  private
    {$I 'Main:intf'}
    fLayout: TLayout;
    fHttp: TW3HttpRequest;
    fJSONStr: String;
    fChallenges: Variant;
    procedure AddItem(Caption: String);
  protected
    procedure HandleHttpDataReady(Sender:TW3HttpRequest);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

  function window: variant; external 'window' property;

implementation

uses ListBoxItem;

{ TForm1 }

procedure TMain.AddItem(Caption: String);
 begin
   var lbItem := lbxChallenges.Items[lbxChallenges.Add] as TListBoxItem;
   lbItem.Text:= Caption;
   lbItem.Url:= 'res\mtn.png';
 end;


procedure TMain.HandleHttpDataReady(Sender:TW3HttpRequest);
var
 I: integer;
begin
  fJSONStr:= Sender.ResponseText;
  asm
   @fChallenges = JSON.parse(@fJSONStr);
  end;

  for I:= 0 to fChallenges.challenges.length-1 do
  begin
   AddItem(fChallenges.challenges[I].name);
  end;
end;

procedure TMain.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  fHttp.Get('res\challenges.json');
end;

procedure TMain.InitializeObject;
begin
  inherited;
  {$I 'Main:impl'}
   window.addEventListener('devicemotion', @Resize, false);
   FLayout:= Layout.Client(Layout.Client(lbxChallenges));
   fHttp := TW3HttpRequest.Create;
   fHttp.OnDataReady:= HandleHttpDataReady;

  lbxChallenges.ItemClass := TListBoxItem;
  lbxChallenges.ItemHeight := 32;
  lbxChallenges.Styles.SelectedColor := clSilver;
end;
 
procedure TMain.Resize;
begin
  inherited;
   if Assigned(FLayout) then
  begin
    FLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TMain);
end.
