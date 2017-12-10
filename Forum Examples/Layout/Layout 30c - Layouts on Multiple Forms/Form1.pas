unit Form1;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Label, SmartCL.Controls.Button, SmartCL.Controls.Panel;

type
  TForm1 = class(TW3Form)
    procedure HandleDeactivate(Sender: TObject);
  private
    {$I 'Form1:intf'}
    fLayout: TLayout;
    fLabel: TW3Label;
    fPanel: TW3Panel;
    fButton: TW3Button;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TForm1 }

uses Form2;

procedure TForm1.HandleDeactivate(Sender: TObject);
begin
 fLayout:= nil;
end;

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components

end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}

  OnDeactivate:= HandleDeactivate;

  fLabel:= TW3Label.Create(Self);
  fLabel.Height:= 32;
  fLabel.AlignText:= taCenter;
  fLabel.Caption:= 'Form1';

  fPanel:= TW3Panel.Create(Self);

  fButton:= TW3Button.Create(Self);
  fButton.Height:= 32;
  fButton.Caption:= 'Next';
  fButton.OnClick:= procedure (Sender: TObject)
  begin
   Application.GotoForm('Form2', feFromRight);
  end;

  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                            [Layout.Top(fLabel),
                            Layout.Client(fPanel),
                            Layout.Bottom(fButton)]
                           );

end;

procedure TForm1.Resize;
begin
  inherited;
  if (assigned(fLayout)) then
   fLayout.Resize(self);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.