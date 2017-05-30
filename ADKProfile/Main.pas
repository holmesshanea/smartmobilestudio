unit Main;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls, SmartCL.INet, ECMA.JSON, System.Colors,
  SmartCL.Touch, SmartCL.Controls.Elements;

type
  TMain = class(TW3Form)
    procedure lbxChallengesClick(Sender: TObject);
    procedure lbxChallengesSelected(Sender: TObject; itemIndex: Integer);
    procedure lbxChallengesTouchBegin(Sender: TObject; Info: TW3TouchData);
    procedure MainActivate(Sender: TObject);
    procedure MainDeactivate(Sender: TObject);
  private
    {$I 'Main:intf'}
    fLayout: TLayout;
    fHttp: TW3HttpRequest;
    fJSONStr: String;
    procedure AddItem(Caption: String; Index: Integer);
    //procedure LBItemSelected (Sender: TObject; itemIndex: integer);
    procedure LBItemSelected (Sender: TObject);
  protected
    procedure HandleBackButton(Sender: TObject);
    procedure HandleNextButton(Sender: TObject);
    procedure HandleHttpDataReady(Sender:TW3HttpRequest);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

  function window: variant; external 'window' property;

implementation

uses ListBoxItem, Challenge, Common;

{ TForm1 }

procedure TMain.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('About', feFromRight);
end;

procedure TMain.HandleNextButton(Sender: TObject);
begin
 //Application.GotoForm('Help', feFromRight);
end;

{procedure TMain.LBItemSelected (Sender: TObject; itemIndex: integer);
var
 I: integer;
begin
 if itemIndex >= 0 then
 begin
  gChallengeIdx:= itemIndex;
  TChallenge(Application.FormByName('Challenge')).Url:= 'res\challenge64.png';
  TChallenge(Application.FormByName('Challenge')).Title:= gChallenges.challenges[gChallengeIdx].name;
  TChallenge(Application.FormByName('Challenge')).ClearItems;
  for I:= 0 to gChallenges.challenges[gChallengeIdx].mountains.length-1 do
  begin
   TChallenge(Application.FormByName('Challenge')).AddItem(gChallenges.challenges[gChallengeIdx].mountains[I].name);
  end;
  Application.GotoForm('Challenge', feFromRight);
 end;
end;}

procedure TMain.LBItemSelected (Sender: TObject);
var
 I: integer;
begin
  gChallengeIdx:= TListBoxItem(Sender).TagValue;
  ShowMessage(inttostr(gChallengeIdx));
  TChallenge(Application.FormByName('Challenge')).Url:= 'res\challenge64.png';
  TChallenge(Application.FormByName('Challenge')).Title:= gChallenges.challenges[gChallengeIdx].name;
  TChallenge(Application.FormByName('Challenge')).ClearItems;
  for I:= 0 to gChallenges.challenges[gChallengeIdx].mountains.length-1 do
  begin
   TChallenge(Application.FormByName('Challenge')).AddItem(gChallenges.challenges[gChallengeIdx].mountains[I].name, I);
  end;
  Application.GotoForm('Challenge', feFromRight);

end;

procedure TMain.AddItem(Caption: String; Index: Integer);
 begin
   var lbItem := lbxChallenges.Items[lbxChallenges.Add] as TListBoxItem;
   lbItem.Text:= Caption;
   lbItem.TagValue:= Index;
   lbItem.Url:= 'res\challenge32.png';
   lbItem.OnClick:= LBItemSelected;
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
   AddItem(gChallenges.challenges[I].name, I);
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
  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.Visible:= False;
  W3HeaderControl1.NextButton.Visible:= False;
  W3HeaderControl1.Title.StyleClass:= 'TW3Label2';
  W3HeaderControl1.Title.Caption:='Challenges';
  W3HeaderControl1.Title.AlignText:= taCenter;


  lbxChallenges.ItemClass := TListBoxItem;
  lbxChallenges.ItemHeight := 50;
  lbxChallenges.Styles.SelectedColor := clSilver;
  //lbxChallenges.OnSelected := LBItemSelected;


  W3HeaderControl2.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl2.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl2.BackButton.OnClick:= HandleBackButton;
  W3HeaderControl2.BackButton.Visible:= True;
  W3HeaderControl2.BackButton.Caption:= 'About';

 // W3HeaderControl2.NextButton.StyleClass:= 'TW3ButtonBack';
  //W3HeaderControl2.NextButton.OnClick:= HandleNextButton;
  //W3HeaderControl2.NextButton.Visible:= True;
  //W3HeaderControl2.NextButton.Caption:= 'Help';

end;

procedure TMain.lbxChallengesTouchBegin(Sender: TObject; Info: TW3TouchData);
begin

end;

procedure TMain.lbxChallengesSelected(Sender: TObject; itemIndex: Integer);
begin

end;

procedure TMain.lbxChallengesClick(Sender: TObject);
begin

end;

procedure TMain.MainActivate(Sender: TObject);
begin
//
end;

procedure TMain.MainDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TMain.Resize;
begin
  inherited;
  if not (Handle.Valid and (csReady in ComponentState)) then
    Exit;

  FLayout:= Layout.Client([Layout.Top(Layout.Height(50), W3HeaderControl1),
                            Layout.Client(lbxChallenges),
                            Layout.Bottom(Layout.Height(50), W3HeaderControl2)
                            ]);

   if Assigned(FLayout) then
  begin
    FLayout.Resize(ClientRect);
    W3HeaderControl1.LayoutChildren;
    lbxChallenges.LayoutChildren;
    W3HeaderControl2.LayoutChildren;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TMain);
end.
