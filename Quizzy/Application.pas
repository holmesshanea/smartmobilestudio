unit Application;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Question;

type
  TApplication  = class(TW3CustomApplication)
   ffrmQuestion: TfrmQuestion;
  public
    procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
begin
 ffrmQuestion := TfrmQuestion.Create(Display.View);
 ffrmQuestion.Name := 'Question';
 RegisterFormInstance(ffrmQuestion, True);
 inherited;
end;

end.
