unit frmMain;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Panel,
  SmartCL.Controls.Label, SmartCL.Layout, SmartCL.Controls.Image;

type
  TForm1 = class(TW3Form)
  private
    {$I 'frmMain:intf'}
    //layer 1 layout
     fLayer1Layout: TLayout;
    //layer 1 layout controls (header, footer, & content panels)
    fLayer1LayoutHeaderPanel: TW3Panel;
    fLayer1LayoutContentPanel: TW3Panel;
    fLayer1LayoutFooterPanel: TW3Panel;

    {//layer 2 - header layout
    fLayer2HeaderLayout: TLayout;
    //layer 2 - header controls
    fLayer2HeaderLogo: Tw3Image;
    //layer 2 main layout
    fLayer2MainLayout: TLayout;
    //layer 2 - footer layout
    fLayer2FooterLayout: TLayout;
    //layer 2 - footer controls
    fLayer2FooterLogo: TW3Image;}
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    procedure Form1Deactivate(Sender: TObject);
  end;

implementation

{ TForm1 }

procedure TForm1.Form1Deactivate(Sender: TObject);
begin
    fLayer1Layout:= Nil;
    {fLayer2HeaderLayout:= nil;
    fLayer2MainLayout:= nil;
    fLayer2FooterLayout:= nil;}
end;

procedure TForm1.InitializeForm;
begin
  inherited;

  //initializw layer 1 controls
  fLayer1LayoutHeaderPanel.Height:= 200;
  fLayer1LayoutHeaderPanel.StyleClass:= 'pnlHeader';

  fLayer1LayoutFooterPanel.Height:= 58;
  fLayer1LayoutFooterPanel.StyleClass:= 'pnlFooter';

  fLayer1LayoutContentPanel.StyleClass:= 'pnlMain';
  //layout layer 1 controls

  fLayer1Layout:= Layout.Client(
                           [Layout.Top(Layout.Height(200), fLayer1LayoutHeaderPanel),
                           Layout.Client(fLayer1LayoutContentPanel),
                           Layout.Bottom(Layout.Height(58), fLayer1LayoutFooterPanel)]
                          );



 { //initialize layer 2 controls for footer panel

  fLayer2FooterLayout:= Layout.Client(
                           Layout.Center(fLayer2FooterLogo)
                          );}
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'frmMain:impl'}

   //create the first layer panels

  fLayer1LayoutHeaderPanel:= TW3Panel.Create(self);
  fLayer1LayoutHeaderPanel.Height:= 200;

  fLayer1LayoutContentPanel:= TW3Panel.Create(self);

  fLayer1LayoutFooterPanel:= TW3Panel.Create(self);
  fLayer1LayoutFooterPanel.Height:= 38;

  {//create the second layer controls on the header panel
  fLayer2HeaderLogo:= TW3Image.Create(fLayer1Header);
  fLayer2HeaderLogo.Left:= 4; fLayer2HeaderLogo.Top:= 4;
  fLayer2HeaderLogo.Width:= 142; fLayer2HeaderLogo.Height:= 191;
  fLayer2HeaderLogo.LoadFromURL('res/nav_logo.gif');

  //create the second layer controls on the footer panel
  fLayer2FooterLogo:= TW3Image.Create(fLayer1Footer);
  fLayer2FooterLogo.Width:= 145; fLayer2FooterLogo.Height:= 50;
  fLayer2FooterLogo.LoadFromURL('res/footer_logo.gif');}

end;
 
procedure TForm1.Resize;
begin
  inherited;
  if Assigned(fLayer1Layout) then
  begin
   //resize layer 1
   fLayer1Layout.Resize(self);
   {//resize layer 2 header panel
   if Assigned(fLayer2HeaderLayout) then
    fLayer2HeaderLayout.Resize(fLayer1Header);
   //resize layer 2 footer panel
   if Assigned(fLayer2FooterLayout) then
    fLayer2FooterLayout.Resize(fLayer1Footer);
   //resize layer 2 conent panel
   if Assigned(fLayer2ContentLayout) then
    fLayer2ContentLayout.Resize(fLayer1Content); }
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.
