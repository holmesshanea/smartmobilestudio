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
  SmartCL.Layout,
  SmartCL.Controls.Button,
  SmartCL.Controls.Panel;

type
  TForm1 = class(TW3Form)
    procedure W3Button1Click(Sender: TObject);
  private
    {$I 'Form1:intf'}
    fLayout: TLayout;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
   property Panel: TW3Panel read W3Panel1 write W3Panel1;
  end;

implementation

uses DlgWorkstation;

{ TForm1 }

procedure TForm1.W3Button1Click(Sender: TObject);
begin
  Application.ShowModal('dlgWorkstation', 'pnlWorkstation', 'edtWorkstation',
     lambda (dialog)
     TDlgWorkstation(Dialog).Panel.SetBounds(Self.Panel.BoundsRect);
      TDlgWorkstation(dialog).Workstation := '';
    end,
    lambda (dialog)
      ShowMessage(TDlgWorkstation(dialog).Workstation);
    end,
    lambda (dialog)
      ShowMessage('Cancelled!');
    end);
end;

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [Layout.Top(Layout.Height(32), W3Button1),
                          Layout.Client(W3Panel1)]
                         );
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}
end;
 
procedure TForm1.Resize;
begin
  inherited;
  if assigned(fLayout) then
   fLayout.Resize(self);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.