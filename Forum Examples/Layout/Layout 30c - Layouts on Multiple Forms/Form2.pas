unit Form2;

interface

uses
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Label, SmartCL.Controls.Button, SmartCL.Controls.ListBox;

type
  TForm2 = class(TW3Form)
    procedure Form2Deactivate(Sender: TObject);
  private
    {$I 'Form2:intf'}
    fLayout: TLayout;
    fLabel: TW3Label;
    fListBox1: TW3ListBox;
    fListBox2: TW3ListBox;
    fButton: TW3Button;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TForm2 }

uses Form1;

procedure TForm2.Form2Deactivate(Sender: TObject);
begin
 fLayout:= nil;
end;

procedure TForm2.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components

end;

procedure TForm2.InitializeObject;
begin
  inherited;
  {$I 'Form2:impl'}
  fLabel:= TW3Label.Create(Self);
  fLabel.Height:= 32;
  fLabel.AlignText:= taCenter;
  fLabel.Caption:= 'Form2';

  fListBox1:= TW3ListBox.Create(Self);
  fListBox2:= TW3ListBox.Create(Self);

  fButton:= TW3Button.Create(Self);
  fButton.Height:= 32;
  fButton.Caption:= 'Previous';
  fButton.OnClick:= procedure (Sender: TObject)
    begin
      Application.GotoForm('Form1', feToLeft);
    end;
end;

procedure TForm2.Resize;
begin
  inherited;
  if Handle <> nil then
  begin
      fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                            [Layout.Top(fLabel),
                             Layout.Client( Layout.Left(
                                            Layout.Spacing(5).Stretch,
                                            [fListBox1, fListBox2])
                                           ),
                            Layout.Bottom(fButton)]
                           );
  end;
  if assigned(fLayout) then
  begin
   fLayout.Resize(self);
  end;
end;

initialization
  Forms.RegisterForm({$I %FILE%}, TForm2);
end.