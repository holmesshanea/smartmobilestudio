unit Form1;

interface

uses 
  System.Types,
  System.Types.Convert,
  System.Objects,
  System.Time,
  SmartCL.System,
  SmartCL.Time,
  SmartCL.Graphics,
  SmartCL.Components,
  SmartCL.FileUtils,
  SmartCL.Forms,
  SmartCL.Fonts,
  SmartCL.Theme,
  SmartCL.Borders,
  SmartCL.Application,
  SmartCL.Controls.Button,
  SmartCL.Controls.Panel;

type
  TForm1 = class(TW3Form)
    procedure W3Button1Click(Sender: TObject);
  private
   {$I 'Form1:intf'}
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
   public
  end;

implementation

uses Form2;

{ TForm1 }

procedure TForm1.W3Button1Click(Sender: TObject);
begin
 TForm2(Application.FormByName('Form2')).W3Panel1.SetBounds(W3Panel1.ClientRect);
 Application.GotoForm('Form2');

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
end;
 
procedure TForm1.Resize;
begin
  inherited;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.