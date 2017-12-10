unit Unit1;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Form1, Form2;

type
  TApplication  = class(TW3CustomApplication)
   public
    procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
var
  mForm: TW3CustomForm;
begin

  mForm := TForm1.Create(display.view);
  mForm.name := 'Form1';
  RegisterFormInstance(mForm, true);

  mForm := TForm2.Create(display.view);
  mForm.name := 'Form2';
  RegisterFormInstance(mForm, false);

  inherited;
end;

end.