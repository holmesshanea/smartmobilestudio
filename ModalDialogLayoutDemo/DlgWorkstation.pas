unit DlgWorkstation;

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
  SmartCL.Layout,
  SmartCL.Controls.Panel,
  SmartCL.Controls.Button,
  SmartCL.Controls.EditBox;

type
  TDlgWorkstation = class(TW3Form)
    procedure btnCancelClick(Sender: TObject);
    procedure btnOkClick(Sender: TObject);
    procedure HandlePanelResize(Sender: TObject);
  private
    {$I 'DlgWorkstation:intf'}
    fLayout: TLayout;
    function getWorkstation: String;
    procedure setWorkstation(Value: String);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    property Workstation: String read getWorkstation write setWorkstation;
    property Panel: TW3Panel read pnlWorkstation write pnlWorkstation;
  end;

implementation

{ TDlgWorkstation }

procedure TDlgWorkstation.HandlePanelResize;
begin
  if Assigned(fLayout) then
    fLayout.Resize(pnlWorkstation);
    //pnlWorkstation.LayoutChildren;
end;

procedure TDlgWorkstation.btnOkClick(Sender: TObject);
begin
  Application.HideModal(mrOk);
end;

procedure TDlgWorkstation.btnCancelClick(Sender: TObject);
begin
  Application.HideModal(mrCancel);
end;

function TDlgWorkstation.getWorkstation: String;
begin
 result:= edtWorkstation.Text;
end;

procedure TDlgWorkstation.setWorkstation(Value: String);
begin
 edtWorkstation.Text:= Value;
end;

procedure TDlgWorkstation.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TDlgWorkstation.InitializeObject;
begin
  inherited;
  {$I 'DlgWorkstation:impl'}
  fLayout:= Layout.Client(Layout.Margins(5), [Layout.Top(edtWorkstation),
                            Layout.Bottom(
                                          Layout.Left(Layout.Stretch.Spacing(5), [btnOK, btnCancel]))]
                          );
  pnlWorkStation.OnResize:= HandlePanelResize;
end;
 
procedure TDlgWorkstation.Resize;
begin
  inherited;
  {if assigned(fLayout) then
   fLayout.Resize(pnlWorkstation);}
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TDlgWorkstation);
end.
