unit Form1;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCL.Controls.EditBox,
  SmartCL.Controls.Button, SmartCL.Controls.CheckBox, SmartCL.Controls.RadioButton;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}

    fMainLayout: TLayout;
    fLeftLayout: TLayout;
    fRightLayout: TLayout;

    fLeftLbl: TW3Label;
    fLeftEdt: TW3EditBox;
    fLeftCxBx1: TW3Checkbox;
    fLeftCxBx2: TW3Checkbox;
    fLeftCxBx3: TW3Checkbox;
    fLeftButton: TW3Button;

    fRightLbl: TW3Label;
    fRightEdt: TW3EditBox;
    fRightRdBt1: TW3RadioButton;
    fRightRdBt2: TW3RadioButton;
    fRightRdBt3: TW3RadioButton;
    fRightButton: TW3Button;

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
  fLeftLbl:= TW3Label.Create(Self);
  fLeftLbl.Caption:= 'Name';
  fLeftEdt:= TW3EditBox.Create(Self);
  fLeftCxBx1:= TW3Checkbox.Create(Self);
  fLeftCxBx1.Caption:= 'One';
  fLeftCxBx2:= TW3Checkbox.Create(Self);
  fLeftCxBx2.Caption:= 'Two';
  fLeftCxBx3:= TW3Checkbox.Create(Self);
  fLeftCxBx3.Caption:= 'Three';
  fLeftButton:= TW3Button.Create(Self);
  fLeftButton.Caption:= 'Add';

  fRightLbl:= TW3Label.Create(Self);
  fRightLbl.Caption:= 'Name';
  fRightEdt:= TW3EditBox.Create(Self);
  fRightRdBt1:= TW3RadioButton.Create(Self);
  fRightRdBt1.Caption:= 'One';
  fRightRdBt2:= TW3RadioButton.Create(Self);
  fRightRdBt2.Caption:= 'Two';
  fRightRdBt3:= TW3RadioButton.Create(Self);
  fRightRdBt3.Caption:= 'Three';
  fRightButton:= TW3Button.Create(Self);
  fRightButton.Caption:= 'Add';
end;

procedure TForm1.Resize;
begin
  inherited;
  if Handle <> nil then
  begin
   fLeftLayout:= Layout.Client(
                              Layout.Top(Layout.Spacing(5).Stretch, [fLeftLbl, fLeftEdt, fLeftCxBx1, fLeftCxBx2, fLeftCxBx3, fLeftButton])
                              );
  fRightLayout:= Layout.Client(
                              Layout.Top(Layout.Spacing(5).Stretch, [fRightLbl, fRightEdt, fRightRdBt1, fRightRdBt2, fRightRdBt3, fRightButton])
                              );

  fMainLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                              [
                              Layout.Left(Layout.Width(ClientWidth DIV 2), fLeftLayout),
                              Layout.Client(fRightLayout)
                              ]
                              );
   fMainLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.