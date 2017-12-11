unit Form1;

interface

uses 
  System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCL.Controls.EditBox,
  SmartCL.Controls.Button;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    fMainLayout: TLayout;

    fContactLayout: TLayout;
    fContactPanel: TW3Panel;

    fNameLbl: TW3Label;
    fNameEdt: TW3EditBox;

    fAddrLbl: TW3Label;
    fAddrEdt: TW3EditBox;

    fLocaLbl: TW3Label;
    fLocaEdt: TW3EditBox;

    fButtonLayout: TLayout;
    fButtonPanel: TW3Panel;

    fButton1: TW3Button;
    fButton2: TW3Button;
    fButton3: TW3Button;
    fButton4: TW3Button;

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
  fContactPanel:= TW3Panel.Create(Self);


  fNameLbl:= TW3Label.Create(fContactPanel);
  fNameLbl.Caption:= 'Name';
  fNameEdt:= TW3EditBox.Create(fContactPanel);

  fAddrLbl:= TW3Label.Create(fContactPanel);
  fAddrLbl.Caption:= 'Address';
  fAddrEdt:= TW3EditBox.Create(fContactPanel);

  fLocaLbl:= TW3Label.Create(fContactPanel);
  fLocaLbl.Caption:= 'City / State / Zip';
  fLocaEdt:= TW3EditBox.Create(fContactPanel);

  fButtonPanel:= TW3Panel.Create(Self);

  fButton1:= TW3Button.Create(fButtonPanel);
  fButton1.Caption:= 'Add';
  fButton2:= TW3Button.Create(fButtonPanel);
  fButton2.Caption:= 'Edit';
  fButton3:= TW3Button.Create(fButtonPanel);
  fButton3.Caption:= 'Delete';
  fButton4:= TW3Button.Create(fButtonPanel);
  fButton4.Caption:= 'Clear';
end;

procedure TForm1.Resize;
begin
  inherited;
   if not Handle.Valid and (csReady in ComponentState) then
   exit;

   fContactLayout:= Layout.Client(
                                  [
                                  Layout.Top(Layout.Height(32), fNameLbl),
                                  Layout.Top(Layout.Height(32), fNameEdt),
                                  Layout.Top(Layout.Height(32), fAddrLbl),
                                  Layout.Top(Layout.Height(32), fAddrEdt),
                                  Layout.Top(Layout.Height(32), fLocaLbl),
                                  Layout.Top(Layout.Height(32), fLocaEdt)
                                  ]
                                 );

   fButtonLayout:= Layout.Client(
                            Layout.Top(Layout.Height(32).Spacing(5).Stretch, [fButton1, fButton2, fButton3, fButton4])
                           );


    if ClientHeight > ClientWidth then

    fMainLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                               [Layout.Top(Layout.Height(200), fContactPanel),
                               Layout.Client(
                                             fButtonPanel
                                             )]
                              )
    else

    fMainLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                               [Layout.Left(Layout.Width(ClientWidth DIV 2), fContactPanel),
                               Layout.Client(
                                             fButtonPanel
                                             )]
                              );


   if assigned(fMainLayout) then
   begin
    fMainLayout.Resize(self);
    fContactLayout.Resize(fContactPanel);
    fButtonLayout.Resize(fButtonPanel);
   end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.