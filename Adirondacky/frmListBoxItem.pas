unit frmListBoxItem;

interface

uses 
  System.Types, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Image,
  SmartCL.Controls.Label, SmartCL.Layout;

type
  TfrmListBoxItem = class(TW3Form)
  private
    {$I 'frmListBoxItem:intf'}
    fLayout: TLayout;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    property IMage: TW3Image read itmImage write itmImage;
    property Label: TW3Label read itmLabel write itmLabel;
  end;

implementation

{ TfrmListBoxItem }

procedure TfrmListBoxItem.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  FLayout:= Layout.Client([Layout.Left(itmImage), Layout.Client(itmLabel)]);
end;

procedure TfrmListBoxItem.InitializeObject;
begin
  inherited;
  {$I 'frmListBoxItem:impl'}
  Label.Font.Size := 18;
end;
 
procedure TfrmListBoxItem.Resize;
begin
  inherited;
  if assigned(FLayout) then
  begin
    FLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmListBoxItem);
end.
