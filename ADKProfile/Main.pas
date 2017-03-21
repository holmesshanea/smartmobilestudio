unit Main;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Listbox, SmartCL.Inet, ECMA.JSON, System.Colors;

type
  TMain = class(TW3Form)
    procedure MainActivate(Sender: TObject);
    procedure MainDeactivate(Sender: TObject);
  private
    {$I 'Main:intf'}
    fLayout: TLayout;
    fHttp: TW3HttpRequest;
    fJSONStr: String;
    procedure AddItem(Caption: String);
    procedure LBItemSelected (Sender: TObject; itemIndex: integer);
  protected
    procedure HandleHttpDataReady(Sender:TW3HttpRequest);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

  function window: variant; external 'window' property;

implementation

uses ListBoxItem, Challenge, Common;

{ TForm1 }

procedure TMain.LBItemSelected (Sender: TObject; itemIndex: integer);
var
 I: integer;
begin
 if itemIndex >= 0 then
 begin
  gChallengeIdx:= itemIndex;
  TChallenge(Application.FormByName('Challenge')).Url:= 'res\challenge64.png';
  TChallenge(Application.FormByName('Challenge')).Title:= gChallenges.challenges[itemIndex].name;
   TChallenge(Application.FormByName('Challenge')).ClearItems;
  for I:= 0 to gChallenges.challenges[itemIndex].mountains.length-1 do
  begin
   TChallenge(Application.FormByName('Challenge')).AddItem(gChallenges.challenges[itemIndex].mountains[I].name);
  end;
  Application.GotoForm('Challenge', feFromRight);
 end;
end;

procedure TMain.AddItem(Caption: String);
 begin
   var lbItem := lbxChallenges.Items[lbxChallenges.Add] as TListBoxItem;
   lbItem.Text:= Caption;
   lbItem.Url:= 'res\challenge32.png';
 end;


procedure TMain.HandleHttpDataReady(Sender:TW3HttpRequest);
var
 I: integer;
begin
  fJSONStr:= Sender.ResponseText;
  asm
   @gChallenges = JSON.parse(@fJSONStr);
  end;

  for I:= 0 to gChallenges.challenges.length-1 do
  begin
   AddItem(gChallenges.challenges[I].name);
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

   fHttp := TW3HttpRequest.Create;
   fHttp.OnDataReady:= HandleHttpDataReady;

  lbxChallenges.ItemClass := TListBoxItem;
  lbxChallenges.ItemHeight := 32;
  lbxChallenges.Styles.SelectedColor := clSilver;

   lbxChallenges.OnSelected := LBItemSelected;

   FLayout:= Layout.Client(Layout.Client(lbxChallenges));

end;

procedure TMain.MainActivate(Sender: TObject);
begin
  //FLayout:= Layout.Client(Layout.Client(lbxChallenges));
end;

procedure TMain.MainDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
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
