unit UntModalDlg;

interface

uses
  ECMA.Date,
  System.Types,
  System.Types.Convert,
  System.Types.Graphics,
  System.Colors,
  System.JSON,

  SmartCL.Theme,
  SmartCL.FileUtils,
  SmartCL.System,
  SmartCL.Effects,
  SmartCL.Components,
  SmartCL.Layout,
  SmartCL.Controls.Panel,
  SmartCL.Controls.Label,
  SmartCL.Controls.EditBox,
  SmartCL.Controls.Button;

type

  TModalDialog = class(TW3Panel)
  private
    fLayout: TLayout;
    fCompleteLabel: TW3Label;
    fCompleteDate: TW3EditBox;
    fOkBtn: TW3Button;
    fCancelBtn: TW3Button;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure Resize; override;
  public
    property  CompleteDate: TW3EditBox read FCompleteDate;
    property  OkBtn: TW3Button read fOkBtn;
    property  CancelBtn: TW3Button read fCancelBtn;
    class function ShowDialog(ADate: string): TModalDialog;
  end;

implementation

uses SmartCL.Application;

function getDate: String;
var
 Date: JDate;
begin
 Date:=  JDate.Create;
 result:=  FloatToStr(Date.getMonth) + '/' + FloatToStr(Date.getDay) + '/' + FloatToStr(Date.getFullYear);
end;

procedure TModalDialog.InitializeObject;
begin
  inherited;
  handle.addEventListener('devicemotion', @Resize, false);
  fCompleteLabel:= TW3Label.Create(self);
  fCompleteLabel.Height:= 32;
  fCompleteLabel.Caption:= 'Complete Date:';

  fCompleteDate := TW3EditBox.Create(self);
  fCompleteDate.InputType := itDate;
  ShowMessage(getDate);
  fCompleteDate.Text:= getDate;

  fOkBtn:= TW3Button.Create(self);
  fOkBtn.Width:= 125; fOkBtn.Height:= 32;
  fOkBtn.Caption:= 'Ok';

  fCancelBtn:= TW3Button.Create(self);
  fCancelBtn.Width:= 125; fCancelBtn.Height:= 32;
  fCancelBtn.Caption:= 'Cancel';

  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [

                           Layout.Top(Layout.Center(fCompleteLabel)),
                           Layout.Top(Layout.Center(fCompleteDate)),

                          Layout.Bottom(Layout.Spacing(5), Layout.Center(fCancelBtn)),
                          Layout.Bottom(Layout.Spacing(5), Layout.Center(fOkBtn))]
                         );
end;

procedure TModalDialog.FinalizeObject;
begin
  fCompleteLabel.free;
  fCompleteDate.free;
  inherited;
end;

procedure TModalDialog.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin
   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
end;
end;

class function TModalDialog.ShowDialog(ADate: string): TModalDialog;
begin
  var Host := Application.Display;
  var Shade := TW3BlockBox.Create(Host);
  Shade.SizeToParent();

  var wd := Host.Width * 90 div 100;
  var hd := Host.Height * 80 div 100;
  var dx := (Host.Width div 2) - (wd div 2);
  var dy := (Host.Height div 2) - (hd div 2);

  var Dialog := TModalDialog.Create(Shade);
  Dialog.CompleteDate.Text:= ADate;
  Dialog.SetBounds(dx, dy, wd, hd);

  Dialog.OkBtn.OnClick := procedure (Sender: TObject)
  begin
    Dialog.fxFadeOut(0.2, procedure ()
    begin
      TW3Dispatch.Execute( procedure ()
      begin
        Dialog.free;
        Shade.free;
      end, 100);
    end);
    result := Dialog;
  end;

  Dialog.CancelBtn.OnClick := procedure (Sender: TObject)
  begin
    Dialog.fxFadeOut(0.2, procedure ()
    begin
      TW3Dispatch.Execute( procedure ()
      begin
        Dialog.free;
        Shade.free;
      end, 100);
    end);
    result := nil;
  end;
end;

{W3Button1.OnClick := procedure (Sender: TObject)
begin
  var LInfo: TAppInfoRecord;
  if FInfoDb.GetRecById('introduction', LInfo) then
    TInfoDialog.ShowDialog(LInfo.iiTitle, LInfo.iiText);
end;}

end.
