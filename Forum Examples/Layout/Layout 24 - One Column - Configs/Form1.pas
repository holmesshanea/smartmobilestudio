unit Form1;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Panel;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    fLayout: TLayout;
    fHeader: TW3Panel;
    fColumn: TW3Panel;
    fFooter: TW3Panel;
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
  fHeader:= TW3Panel.create(self);
  fColumn:= TW3Panel.create(self);
  fFooter:= TW3Panel.create(self);
  fLayout:= Layout.Client(Layout.Margins(10).Spacing(10),
                         [Layout.Top(Layout.Height(50), fHeader),
                         Layout.Client(fColumn),
                         Layout.Bottom(Layout.Height(50),fFooter)]
                         );
end;
 
procedure TForm1.Resize;
begin
  inherited;
  if not Handle.Valid and (csReady in ComponentState) then
   exit;
  fLayout:= Layout.Client(Layout.Margins(10).Spacing(10),
                         [Layout.Top(Layout.Height(50), fHeader),
                         Layout.Client(fColumn),
                         Layout.Bottom(Layout.Height(50),fFooter)]
                         );

  if Assigned(fLayout) then
  begin
   fLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.