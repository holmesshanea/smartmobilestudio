unit untApplication;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Main;

type
  TApplication  = class(TW3CustomApplication)
  private
   FMainForm: TfrmMain;
  public
    procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
begin
  FMainForm := TfrmMain.Create(Display.View);
  FMainForm.Name := 'Main';
  RegisterFormInstance(FMainForm, True);
  inherited;
end;

end.
