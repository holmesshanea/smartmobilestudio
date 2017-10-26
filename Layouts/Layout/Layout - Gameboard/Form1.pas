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
    fPanel1: TW3Panel;
    fPanel2: TW3Panel;
    fPanel3: TW3Panel;
    fPanel4: TW3Panel;
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
  fPanel1:= TW3Panel.create(self);
  fPanel2:= TW3Panel.create(self);
  fPanel3:= TW3Panel.create(self);
  fPanel4:= TW3Panel.create(self);

  fLayout:= Layout.Client([
                          Layout.Top(Layout.Height(ClientHeight Div 2),[Layout.Left(Layout.margins(5).Width(ClientWidth Div 2),fPanel1), Layout.Right(Layout.margins(5).Width(ClientWidth Div 2),fPanel2)]),
                          Layout.Bottom(Layout.Height(ClientHeight Div 2),[Layout.Left(Layout.margins(5).Width(ClientWidth Div 2),fPanel3), Layout.Right(Layout.margins(5).Width(ClientWidth Div 2),fPanel4)])
  ]);
end;

procedure TForm1.Resize;
begin
  inherited;
  if Assigned(fLayout) then
  begin
  fLayout:= Layout.Client([
                          Layout.Top(Layout.Height(ClientHeight Div 2),[Layout.Left(Layout.margins(5).Width(ClientWidth Div 2),fPanel1), Layout.Left(Layout.margins(5).Width(ClientWidth Div 2),fPanel2)]),
                          Layout.Bottom(Layout.Height(ClientHeight Div 2),[Layout.Left(Layout.margins(5).Width(ClientWidth Div 2),fPanel3), Layout.Left(Layout.margins(5).Width(ClientWidth Div 2),fPanel4)])
  ]);
   fLayout.Resize(self);
  end;

  //fPanel.SetBounds((width div 2)-25, (height div 2)- 25, 50, 50);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.