unit Form2;

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
  SmartCL.Application, SmartCL.Controls.Panel;

type
  TForm2 = class(TW3Form)
  private
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
  {$I 'Form2:intf'}   //NOTE move this from private section to make components public and accessible from other forms
  end;

implementation

{ TForm2 }

procedure TForm2.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TForm2.InitializeObject;
begin
  inherited;
  {$I 'Form2:impl'}
end;
 
procedure TForm2.Resize;
begin
  inherited;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm2);
end.
