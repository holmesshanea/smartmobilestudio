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
    procedure LBItemSelected (Sender: TObject);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    procedure HandleBackButton(Sender: TObject);
    procedure HandleNextButton(Sender: TObject);
  public
   procedure AddItem(Caption: String; Value: Integer);
   procedure ClearItems;
   property Title: String read (W3Label1.Caption) write (W3Label1.Caption);
   property Url: String read (W3Image1.Url) write (W3Image1.Url);
  end;

  function window: variant; external 'window' property;

implementation

uses ListBoxItem, Mountain, Common;

{ TChallenge }

procedure TChallenge.LBItemSelected (Sender: TObject);
begin
  gMountainIdx:= TListBoxItem(Sender).TagValue;
  TMountain(Application.FormByName('Mountain')).Url:= 'res\mtn64.png';
  TMountain(Application.FormByName('Mountain')).UpdateContent;
  Application.GotoForm('Mountain', feFromRight);
end;

procedure TChallenge.ClearItems;
begin
 lbxMountains.Clear;
end;

procedure TChallenge.AddItem(Caption: String; Value: Integer);
 begin
   var lbItem := lbxMountains.Items[lbxMountains.Add] as TListBoxItem;
   lbItem.Text:= Caption;
   lbItem.TagValue:= Value;
   lbItem.Url:= 'res\mtn.png';
   lbItem.OnClick := LBItemSelected;
 end;

procedure TChallenge.ChallengeActivate(Sender: TObject);
begin

end;

procedure TChallenge.ChallengeDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TChallenge.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('Main', feToLeft);
end;

procedure TChallenge.HandleNextButton(Sender: TObject);
begin
  Application.GotoForm('Info', feFromRight);
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
  W3Label1.Handle.style.setProperty('font-size', 'large');
  W3Label1.Handle.style.setProperty('font-weight', 'bold');

  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.Visible:= False;
  W3HeaderControl1.NextButton.Visible:= False;
  W3HeaderControl1.Title.StyleClass:= 'TW3Label2';
  W3HeaderControl1.Title.Caption:='Mountains';
  W3HeaderControl1.Title.AlignText:= taCenter;

  lbxMountains.ItemClass := TListBoxItem;
  lbxMountains.ItemHeight := 50;
  lbxMountains.Styles.SelectedColor := clSilver;

  W3HeaderControl2.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl2.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl2.BackButton.OnClick:= HandleBackButton;
  W3HeaderControl2.NextButton.Visible:= True;
  W3HeaderControl2.NextButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl2.NextButton.Caption:= 'Info';
  W3HeaderControl2.NextButton.OnClick:= HandleNextButton;


end;
 
procedure TChallenge.Resize;
begin
  inherited;
  if not (Handle.Valid and (csReady in ComponentState)) then
    Exit;

  FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                          Layout.Top(Layout.Height(50), Layout.Client(W3Label1)),
                          Layout.Top(Layout.Height(50), W3HeaderControl1),
                          Layout.Client((lbxMountains)),
                          Layout.Bottom(Layout.Height(50), W3HeaderControl2)
                              ] );

  if Assigned(FLayout) then
  begin
    FLayout.Resize(ClientRect);
    W3Label1.LayoutChildren;
    W3HeaderControl1.LayoutChildren;
    lbxMountains.LayoutChildren;
    W3HeaderControl2.LayoutChildren;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TChallenge);
end.
