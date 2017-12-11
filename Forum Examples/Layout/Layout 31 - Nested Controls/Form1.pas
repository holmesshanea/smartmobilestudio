unit Form1;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCL.Controls.EditBox;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    fMainLayout: TLayout;
    fHeaderLayout: TLayout;
    fHeaderPanel: TW3Panel;

    fNameLbl: TW3Label;
    fNameEdt: TW3EditBox;

    fAddrLbl: TW3Label;
    fAddrEdt: TW3EditBox;

    fLocaLbl: TW3Label;
    fLocaEdt: TW3EditBox;

  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TForm1 }

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}
  fHeaderPanel:= TW3Panel.Create(Self);

  fNameLbl:= TW3Label.Create(fHeaderPanel);
  fNameLbl.Caption:= 'Name';
  fNameEdt:= TW3EditBox.Create(fHeaderPanel);

  fAddrLbl:= TW3Label.Create(fHeaderPanel);
  fAddrLbl.Caption:= 'Address';
  fAddrEdt:= TW3EditBox.Create(fHeaderPanel);

  fLocaLbl:= TW3Label.Create(fHeaderPanel);
  fLocaLbl.Caption:= 'City / State / Zip';
  fLocaEdt:= TW3EditBox.Create(fHeaderPanel);
end;

procedure TForm1.Resize;
begin
  inherited;
  if not Handle.Valid and (csReady in ComponentState) then
   exit;

   fMainLayout:= Layout.Top(Layout.Height(200), fHeaderPanel);

   fHeaderLayout:= Layout.Client(
                                  [
                                  Layout.Top(Layout.Height(32), fNameLbl),
                                  Layout.Top(Layout.Height(32), fNameEdt),
                                  Layout.Top(Layout.Height(32), fAddrLbl),
                                  Layout.Top(Layout.Height(32), fAddrEdt),
                                  Layout.Top(Layout.Height(32), fLocaLbl),
                                  Layout.Top(Layout.Height(32), fLocaEdt)
                                  ]
                                 );
  if Assigned(fMainLayout) then
  begin
   fMainLayout.Resize(self);
   fHeaderLayout.Resize(fHeaderPanel);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.