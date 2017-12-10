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
    fTopRow: TW3Panel;
    fBottomRow: TW3Panel;
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
  fTopRow:= TW3Panel.create(self);
  fBottomRow:= TW3Panel.create(self);
end;
 
procedure TForm1.Resize;
begin
  inherited;
  fLayout:= Layout.Client(Layout.Margins(10),
                          [Layout.Top(Layout.Height((ClientHeight DIV 2)-15), fTopRow),
                          Layout.Bottom(Layout.Height((ClientHeight DIV 2)-15), fBottomRow)]);


  if Assigned(fLayout) then
  begin
   fLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.