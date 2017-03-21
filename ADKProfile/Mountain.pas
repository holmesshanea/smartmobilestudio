unit Mountain;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Image,
  SmartCL.Controls.Label, SmartCL.Controls.Header, SmartCL.Layout, System.Colors;

type
  TMountain = class(TW3Form)
    procedure MountainDeactivate(Sender: TObject);
  private
    {$I 'Mountain:intf'}
    fLayout: TLayout;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    procedure HandleBackButton(Sender: TObject);
  public
    property Title: String read (W3Label1.Caption) write (W3Label1.Caption);
    property Url: String read (W3Image1.Url) write (W3Image1.Url);
  end;

  function window: variant; external 'window' property;

implementation

{ TMountain }

procedure TMountain.HandleBackButton(Sender: TObject);
begin
 Application.GotoForm('Challenge', feToLeft);
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

  W3Label1.AlignText:= taCenter;
  W3HeaderControl1.StyleClass:= 'TW3HeaderControl2';
  W3HeaderControl1.BackButton.StyleClass:= 'TW3ButtonBack';
  W3HeaderControl1.BackButton.OnClick:= HandleBackButton;

  FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Top(Layout.Height(64), Layout.Center(W3Image1)),
                          Layout.Top(Layout.Height(32), Layout.Client(W3Label1)),
                          Layout.Bottom(Layout.Height(32), W3HeaderControl1)
                              ] );

end;

procedure TMountain.MountainDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TMountain.Resize;
begin
  inherited;
  if Assigned(FLayout) then
  begin
   FLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TMountain);
end.
