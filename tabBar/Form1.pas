unit Form1;

interface

uses
  SmartCL.System, SmartCL.Components, SmartCL.Forms, SmartCL.Application,
  SmartCL.Controls.Button, SmartCL.Controls.Panel, tabBar,
  SmartCL.Controls.Label, SmartCL.Controls.Elements;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
    Button1, Button2 : TW3Button;
    Panel1, Panel2 : TW3Panel;
    Label1, Label2: TW3Label;
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
  tabBar1.TabWidth := 100;      //default 100

  tabBar1.AddPage('TabPanel1');    //tab 1
  tabBar1.AddPage('TabPanel2');    //tab 2
  tabBar1.AddPage('TabPanel3');    //tab 3
  tabBar1.StyleClass := 'x-panel x-tabbar x-tabbar-dark x-docked x-docked-top';

  { 1st tabBar }
  Button1 := TW3Button.Create(tabBar1.Pages[0].Page);
  Button1.SetBounds(40,40,500,50);
  Button1.Caption := '---';
  Button1.OnClick := procedure(Sender: TObject)
    begin
      ShowMessage('this is a test');
    end;

// populate page 2 with a panel and a button
  { 2nd tabBar }
  Panel1 := TW3Panel.Create(tabBar1.Pages[1].Page);
  Panel1.SetBounds(20,20,600,300);
  Panel1.StyleClass := 'buttons-row';

  Label1 := TW3Label.Create(Panel1);
  Label1.Height := 170;
  Label1.Name := 'W3Label1';
  Label1.StyleClass := 'tabs';
  Label1.InnerHTML := '<p>Phasellus iaculis porttitor magna, id malesuada lectus auctor ac. Maecenas fermentum venenatis pellentesque. Sed id ante eu lorem faucibus tristique. Vestibulum vitae tincidunt diam. Aliquam erat volutpat. Sed est quam, pharetra sit amet pretium in, tristique non enim.</p>';

  { 3rd tabBar }
  Panel2 := TW3Panel.Create(tabBar1.Pages[2].Page);
  Panel2.SetBounds(20,20,600,300);
  Panel2.StyleClass := 'buttons-row';
  Label2 := TW3Label.Create(Panel2);
  Label2.Height := 170;
  Label2.Name := 'W3Label2';
  Label2.StyleClass := 'tabs';
  Label2.InnerHTML := '<p>Suspendisse ultrices auctor consequat. Curabitur molestie diam eu tortor sollicitudin accumsan. Suspendisse finibus blandit leo, et volutpat ligula tempor quis. Vivamus vel velit et urna maximus porttitor ac eu diam. Morbi faucibus tincidunt tortor. Sed tempus purus vitae rutrum auctor. </p>';

// set active page to page 2
  tabBar1.SetActivePage(2);
  //tabBar1.Tabs[1].StyleClass := 'x-tab x-tab-normal x-tab-active';
end;

procedure TForm1.Resize;
begin
  inherited;
// optionally resize component and all child-controls
  tabBar1.SetBounds(0,0,application.display.width,application.display.height);

  Panel1.SetBounds(20,20,tabBar1.Width-40, tabBar1.Height-tabBar1.TabHeight-40);
  Panel2.SetBounds(20,20,tabBar1.Width-40, tabBar1.Height-tabBar1.TabHeight-40);
  //Button2.SetBounds(20,20,Panel1.Width-40, 40);

  Button1.SetBounds(100,tabBar1.TabHeight+40,tabBar1.Width-200,40);
end;

initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.
