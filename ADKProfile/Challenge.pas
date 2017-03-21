unit Challenge;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Image,
  SmartCL.Controls.Label, SmartCL.Controls.Button, SmartCL.Layout,
  SmartCL.Controls.Listbox, SmartCL.Controls.Header, System.Colors;

type
  TChallenge = class(TW3Form)
    procedure ChallengeActivate(Sender: TObject);
    procedure ChallengeDeactivate(Sender: TObject);
  private
    {$I 'Challenge:intf'}
    fLayout: TLayout;
    procedure LBItemSelected (Sender: TObject; itemIndex: integer);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    procedure HandleBackButton(Sender: TObject);
  public
   procedure AddItem(Caption: String);
   procedure ClearItems;
   property Title: String read (W3Label1.Caption) write (W3Label1.Caption);
   property Url: String read (W3Image1.Url) write (W3Image1.Url);
  end;

  function window: variant; external 'window' property;

implementation

uses ListBoxItem, Mountain, Common;

{ TChallenge }

procedure TChallenge.LBItemSelected (Sender: TObject; itemIndex: integer);
//var
 //I: integer;
begin
 if itemIndex >= 0 then
 begin
  TMountain(Application.FormByName('Mountain')).Url:= 'res\mtn64.png';
  TMountain(Application.FormByName('Mountain')).Title:= gChallenges.challenges[gChallengeIdx].mountains[itemIndex].name;
  Application.GotoForm('Mountain', feFromRight);
 end;
end;

procedure TChallenge.ClearItems;
begin
 lbxMountains.Clear;
end;

procedure TChallenge.AddItem(Caption: String);
 begin
   var lbItem := lbxMountains.Items[lbxMountains.Add] as TListBoxItem;
   lbItem.Text:= Caption;
   lbItem.Url:= 'res\mtn.png';
 end;

procedure TChallenge.ChallengeActivate(Sender: TObject);
begin
     {FLayout:= Layout.Client(Layout.Margins(5), [
                                Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                                Layout.Top(Layout.Height(32), Layout.Client(W3Label1)),
                                Layout.Client((W3ListBox1)),
                                Layout.Bottom(Layout.Height(32), W3HeaderControl1)
                              ] );}
end;

procedure TChallenge.ChallengeDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TChallenge.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('Main', feToLeft);
end;

procedure TChallenge.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TChallenge.InitializeObject;
begin
  inherited;
  {$I 'Challenge:impl'}
  window.addEventListener('devicemotion', @Resize, false);
  W3Label1.AlignText:= taCenter;
  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl1.BackButton.OnClick:= HandleBackButton;

  lbxMountains.ItemClass := TListBoxItem;
  lbxMountains.ItemHeight := 32;
  lbxMountains.Styles.SelectedColor := clSilver;
  lbxMountains.OnSelected := LBItemSelected;

       FLayout:= Layout.Client(Layout.Margins(5), [
                                Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                                Layout.Top(Layout.Height(32), Layout.Client(W3Label1)),
                                Layout.Client((lbxMountains)),
                                Layout.Bottom(Layout.Height(32), W3HeaderControl1)
                              ] );
end;
 
procedure TChallenge.Resize;
begin
  inherited;
  if Assigned(FLayout) then
  begin
    FLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TChallenge);
end.
