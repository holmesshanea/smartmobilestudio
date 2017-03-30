unit Question;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Inet, ECMA.JSON, System.Colors, SmartCL.Controls.Label,
  SmartCL.Controls.Header, SmartCL.Controls.Listbox;

type
  TfrmQuestion = class(TW3Form)
    procedure frmQuestionActivate(Sender: TObject);
    procedure frmQuestionDeactivate(Sender: TObject);
  private
    {$I 'Question:intf'}
    fLayout: TLayout;
    fQuestion: TW3CustomControl;
    fAnswers: TW3ListBox;
    fFooter: TW3HeaderControl;
    fHttp: TW3HttpRequest;
    fJSONStr: String;
    fQuestions: variant;
    fIndex: Integer = 0;
  protected
    procedure LBItemSelected (Sender: TObject; itemIndex: integer);
    procedure HandleNextButton (Sender: TObject);
    procedure HandleBackButton (Sender: TObject);
    procedure HandleHttpDataReady(Sender:TW3HttpRequest);
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure UpdateContent;
  end;

  function window: variant; external 'window' property;

implementation

{ TForm1 }

procedure TfrmQuestion.HandleNextButton (Sender: TObject);
begin
 if fIndex <> fQuestions.questions.length-1 then
 begin
  inc(fIndex);
  UpdateContent;
 end;
end;

procedure TfrmQuestion.HandleBackButton (Sender: TObject);
begin
 if fIndex <> 0 then
 begin
  dec(fIndex);
  UpdateContent;
 end;
end;

procedure TfrmQuestion.LBItemSelected (Sender: TObject; itemIndex: integer);
begin
 if StrToInt(fQuestions.questions[fIndex].answer) = itemIndex then
  ShowMessage('Correct!')
 else
  ShowMessage('Not Correct!')
end;

procedure TfrmQuestion.UpdateContent;
begin
 //fScroll.Content
 fQuestion.InnerHTML:= '<div style="text-align: center; position: relative;' +
                            ' top: 50%; -ms-transform: translateY(-50%); ' +
                            ' -webkit-transform: translateY(-50%); ' +
                            'transform: translateY(-50%);">' +
  '<br><center><p>' + fQuestions.questions[fIndex].question + '</p></center><br>' +
  '</div>';

 fAnswers.Clear;
 fAnswers.Add(fQuestions.questions[fIndex].answers[0]);
 fAnswers.Add(fQuestions.questions[fIndex].answers[1]);
 fAnswers.Add(fQuestions.questions[fIndex].answers[2]);
 fAnswers.Add(fQuestions.questions[fIndex].answers[3]);
end;

procedure TfrmQuestion.frmQuestionActivate(Sender: TObject);
begin
  //UpdateContent;
end;

procedure TfrmQuestion.frmQuestionDeactivate(Sender: TObject);
begin
  FLayout:= Nil;
end;

procedure TfrmQuestion.HandleHttpDataReady(Sender:TW3HttpRequest);
//var
// I: integer;
begin
  fJSONStr:= Sender.ResponseText;
  asm
   @fQuestions = JSON.parse(@fJSONStr);
  end;
   UpdateContent;
end;

procedure TfrmQuestion.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  fHttp.Get('res\questions.json');
end;

procedure TfrmQuestion.InitializeObject;
begin
  inherited;
  {$I 'Question:impl'}
  window.addEventListener('devicemotion', @Resize, false);

  fHttp := TW3HttpRequest.Create;
  fHttp.OnDataReady:= HandleHttpDataReady;
  self.Handle.style.setProperty('background-color', 'black');
  self.Handle.style.setProperty('background-image', 'none');

  //fHeader:= TW3Label.Create(self);
  //fHeader.Height:= 50;
  //fHeader.Caption:= 'Question';
  //fHeader.AlignText:= taCenter;
  //fHeader.Handle.style.setProperty('background-color', 'white');

  fQuestion:= TW3CustomControl.Create(self);
  fQuestion.Handle.style.setProperty('background-color', 'white');
  fQuestion.Handle.style.setProperty('border-syle', 'solid');
  fQuestion.Handle.style.setProperty('border-width', '2px');
  fQuestion.Handle.style.setProperty('border-color', 'black');

  fAnswers:= TW3ListBox.Create(self);
  fAnswers.Height:= 150;
  fAnswers.Styles.SelectedColor := clSilver;
  fAnswers.OnSelected := LBItemSelected;


  fFooter:= TW3HeaderControl.Create(self);
  fFooter.Height:= 50;
  fFooter.Handle.style:= nil;
  fFooter.Handle.style.setProperty('background', 'none');
  fFooter.Handle.style.setProperty('background-color', 'white');
  fFooter.Handle.style.setProperty('border-bottom', '0px');
  fFooter.Handle.style.setProperty('border-top', '0px');
  fFooter.Handle.style.setProperty('box-shadow', '0');

  fFooter.BackButton.Visible:= True;
  fFooter.BackButton.OnClick:= HandleBackButton;
  fFooter.BackButton.handle.style.setProperty('background', 'none');
  fFooter.BackButton.handle.style.setProperty('background-color', 'white');
  fFooter.BackButton.handle.style.setProperty('color', 'black');

  fFooter.NextButton.Visible:= True;
  fFooter.NextButton.OnClick:= HandleNextButton;
  fFooter.NextButton.handle.style.setProperty('background', 'none');
  fFooter.NextButton.handle.style.setProperty('background-color', 'white');
  fFooter.NextButton.handle.style.setProperty('color', 'black');

end;
 
procedure TfrmQuestion.Resize;
begin
  inherited;
  if not (Handle.Valid and (csReady in ComponentState)) then
    Exit;

  FLayout:= Layout.Client(Layout.Margins(5), [
                          Layout.Client(fQuestion),
                          Layout.Bottom(fFooter),
                           Layout.Bottom(fAnswers)
                              ] );

  if Assigned(FLayout) then
  begin
    FLayout.Resize(self);
    fFooter.LayoutChildren;
    fAnswers.LayoutChildren;
    fQuestion.LayoutChildren;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmQuestion);
end.
