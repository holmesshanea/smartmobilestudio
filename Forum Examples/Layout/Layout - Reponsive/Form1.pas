unit Form1;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Panel, SmartCL.Controls.Button;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    fLLayout: TLayout;
    fPLayout: TLayout;
    fBtnLayout: TLayout;
    fPanel: TW3Panel;
    fButton1: TW3Button;
    fButton2: TW3Button;
    fButton3: TW3Button;
    fButton4: TW3Button;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TForm1 }

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}
  fPanel:= TW3Panel.create(self);
  fButton1:= TW3Button.create(self);
  fButton2:= TW3Button.create(self);
  fButton3:= TW3Button.create(self);
  fButton4:= TW3Button.create(self);

  fBtnLayout:= Layout.Client(Layout.Top(Layout.Stretch, [fButton1, fButton2, fButton3, fButton4]));

  fLLayout:= Layout.Client([Layout.Client(fPanel),
                           Layout.Right(fBtnLayout)]);

  fPLayout:= Layout.Client([Layout.Client(fPanel),
                           Layout.Bottom(fBtnLayout)]);


end;
 
procedure TForm1.Resize;
begin
  inherited;
   if Width > Height then
   begin
    fBtnlayout.Config.Width(ClientWidth DIV 2);
    fLLayout.Resize(self);
   end
   else
   begin
    fBtnlayout.Config.Height(ClientHeight DIV 2);
    fPLayout.Resize(self);
   end;

end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.