unit Info;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout, SmartCL.Scroll,
  SmartCL.Controls;

type
  TInfo = class(TW3Form)
    procedure InfoDeactivate(Sender: TObject);
  private
    {$I 'Info:intf'}
    fLayout: TLayout;
    fScroll: TW3ScrollControl;
  protected
    procedure HandleBackButton(Sender: TObject);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure UpdateContent;
  end;

  function window: variant; external 'window' property;

implementation

uses common;

{ TInfo }

procedure TInfo.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('Challenge', feToLeft);
end;

procedure TInfo.UpdateContent;
begin
 fScroll.Content.InnerHTML:= '<div>' +
 '<center><img src="res\challenge128.png"></center>' +
  '<p>' +  gChallenges.challenges[gChallengeIdx].description + '</p> <br>' +
  '</div>';
end;

procedure TInfo.InfoDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TInfo.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  UpdateContent;
end;

procedure TInfo.InitializeObject;
begin
  inherited;
  {$I 'Info:impl'}
  window.addEventListener('devicemotion', @Resize, false);

  fScroll:= TW3ScrollControl.Create(self);
  fScroll.Handle.style.setProperty('background-color', 'white');

  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.Visible:= False;
  W3HeaderControl1.Title.StyleClass:= 'TW3Label2';
  W3HeaderControl1.Title.Caption:='Info';
  W3HeaderControl1.Title.AlignText:= taCenter;

  W3HeaderControl2.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl2.BackButton.Visible:= True;
  W3HeaderControl2.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl2.BackButton.OnClick:= HandleBackButton;

end;
 
procedure TInfo.Resize;
begin
  inherited;
   if not (Handle.Valid and (csReady in ComponentState)) then
    Exit;

    FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Top(Layout.Height(50), W3HeaderControl1),
                          Layout.Client(fScroll),
                          Layout.Bottom(Layout.Height(50), W3HeaderControl2)
                              ] );

  if Assigned(FLayout) then
  begin
   FLayout.Resize(self);
   W3HeaderControl1.LayoutChildren;
   W3HeaderControl2.LayoutChildren;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TInfo);
end.
