unit Mountain;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls,
  SmartCL.Controls.Header, SmartCL.Layout, SmartCL.Scroll, System.Colors;

type
  TMountain = class(TW3Form)
    procedure MountainActivate(Sender: TObject);
    procedure MountainDeactivate(Sender: TObject);
  private
    {$I 'Mountain:intf'}
    fLayout: TLayout;
    fScroll: TW3ScrollControl;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    procedure HandleBackButton(Sender: TObject);
    procedure HandleNextButton(Sender: TObject);
  public
    procedure UpdateContent;
    property Url: String read (W3Image1.Url) write (W3Image1.Url);
  end;

  function window: variant; external 'window' property;

implementation

uses common;

{ TMountain }

procedure TMountain.UpdateContent;
begin
 fScroll.Content.InnerHTML:= '<div>' +
  '<h3><center>' + gChallenges.challenges[gChallengeIdx].mountains[gMountainIdx].rank + '</center></h3>' +
  '<h2><center>' + gChallenges.challenges[gChallengeIdx].mountains[gMountainIdx].name + '</center></h2>' +
  '<h4><center>' + gChallenges.challenges[gChallengeIdx].mountains[gMountainIdx].elevation + '</center></h4>' +
  '<h4><center>' + gChallenges.challenges[gChallengeIdx].mountains[gMountainIdx].ascent + '</center></h4><br>' +
  '<p>' + gChallenges.challenges[gChallengeIdx].mountains[gMountainIdx].description + '</p><br>' +
  '<p>' + gChallenges.challenges[gChallengeIdx].mountains[gMountainIdx].trailhead + '</p>' +
  '</div>';
end;

procedure TMountain.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('Challenge', feToLeft);
end;

procedure TMountain.HandleNextButton(Sender: TObject);
begin
//
end;

procedure TMountain.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TMountain.InitializeObject;
begin
  inherited;
  {$I 'Mountain:impl'}

  window.addEventListener('devicemotion', @Resize, false);

  fScroll:= TW3ScrollControl.Create(self);
  fScroll.Handle.style.setProperty('background-color', 'white');

  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl1.BackButton.OnClick:= HandleBackButton;
  W3HeaderControl1.NextButton.Visible:= True;
  W3HeaderControl1.NextButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl1.NextButton.Caption:= 'Log';
  W3HeaderControl1.NextButton.OnClick:= HandleNextButton;

  {FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                          Layout.Client(fScroll),
                          Layout.Bottom(Layout.Height(32), W3HeaderControl1)
                              ] );}

end;

procedure TMountain.MountainActivate(Sender: TObject);
begin
 {FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                          Layout.Client(fScroll),
                          Layout.Bottom(Layout.Height(32), W3HeaderControl1)
                              ] );}
end;

procedure TMountain.MountainDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TMountain.Resize;
begin
  inherited;
  if not (Handle.Valid and (csReady in ComponentState)) then
    Exit;

  FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                          Layout.Client(fScroll),
                          Layout.Bottom(Layout.Height(32), W3HeaderControl1)
                              ] );

  if Assigned(FLayout) then
  begin
   FLayout.Resize(self);
   W3HeaderControl1.LayoutChildren;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TMountain);
end.
