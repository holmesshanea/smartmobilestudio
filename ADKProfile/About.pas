unit About;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout, SmartCL.Scroll,
  SmartCL.Controls;

type
  TAbout = class(TW3Form)
    procedure AboutDeactivate(Sender: TObject);
  private
    {$I 'About:intf'}
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

{ TAbout }

procedure TAbout.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('Main', feToLeft);
end;

procedure TAbout.UpdateContent;
begin
 fScroll.Content.InnerHTML:= '<div>' +
  '<center><img src="res\mtn128.png"></center>' +
  '<p>' +  'ADK Profile provides an excellent way to keep track of ' +
                'Adirondack Mountain hiking challenge date completions. It ' +
                'even allows tracking by season. In addition, track individual ' +
                'mountains by completion date and season too. Enjoy the ' +
                'convenience of having all of the challenges and mountains centrally located ' +
                'in one place.' + '</p> <br>' +
  '</div>';
end;

procedure TAbout.AboutDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TAbout.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  UpdateContent;
end;

procedure TAbout.InitializeObject;
begin
  inherited;
  {$I 'About:impl'}
  window.addEventListener('devicemotion', @Resize, false);

  fScroll:= TW3ScrollControl.Create(self);
  fScroll.Handle.style.setProperty('background-color', 'white');

  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.Visible:= False;
  W3HeaderControl1.Title.StyleClass:= 'TW3Label2';
  W3HeaderControl1.Title.Caption:='About';
  W3HeaderControl1.Title.AlignText:= taCenter;

  W3HeaderControl2.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl2.BackButton.Visible:= True;
  W3HeaderControl2.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl2.BackButton.OnClick:= HandleBackButton;

end;
 
procedure TAbout.Resize;
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
   FLayout.Resize(ClientRect);
   W3HeaderControl1.LayoutChildren;
   W3HeaderControl2.LayoutChildren;

  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TAbout);
end.
