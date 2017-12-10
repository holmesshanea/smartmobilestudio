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
    fNav: TW3Panel;
    fLeftBar: TW3Panel;
    fBody: TW3Panel;
    fRightBar: TW3Panel;
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
  fNav:= TW3Panel.create(self);
  fLeftBar:= TW3Panel.create(self);
  fBody:= TW3Panel.create(self);
  fRightBar:= TW3Panel.create(self);
  fFooter:= TW3Panel.create(self);

end;
 
procedure TForm1.Resize;
begin
  inherited;
  if self.Handle<> nil then
  begin
   fLayout:= Layout.Client(Layout.Margins(10).Spacing(10),
                         [Layout.Top(Layout.Height(ClientHeight DIV 4), fHeader),
                          Layout.Top(Layout.Height(ClientHeight DIV 6), fNav),
                         Layout.Client(Layout.Spacing(10), [Layout.Left(Layout.Width(ClientWidth DIV 4), fLeftBar),
                                        Layout.Right(Layout.Width(ClientWidth DIV 4), fRightBar),
                                        Layout.Client(fBody)]),
                         Layout.Bottom(Layout.Height(ClientHeight DIV 4),fFooter)]
                         );

   fLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.