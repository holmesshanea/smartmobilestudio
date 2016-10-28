unit Main;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Button,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCl.Layout;

type
  TfrmMain = class(TW3Form)
  private
    {$I 'Main:intf'}
    //fLayout: TLayout;
    //fLayout2: TLayout;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
  end;

implementation

{ TForm1 }

procedure TfrmMain.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
   //if Assigned(FLayout) then
  //begin
  //  FLayout.Resize(self);
  //  FLayout2.Resize(MainPanel);
  //end;
  //W3Label1.SetBounds(0,0,Self.ClientWidth, 50);
  MainPanel.SetBounds(0,0,self.ClientWidth, self.ClientHeight);
  W3Label1.SetBounds(0,0, MainPanel.ClientWidth, 50);
end;

procedure TfrmMain.InitializeObject;
begin
  inherited;
  {$I 'Main:impl'}
   W3Label1.AlignText:= taCenter;
  //MainPanel.SetBounds(0,0,self.ClientWidth, self.ClientHeight);
  //W3Label1.SetBounds(0,0, MainPanel.ClientWidth, 50);
   //FLayout:= Layout.Client(MainPanel);
   //FLayout2:= Layout.Client(Layout.Top(W3Label1));
end;
 
procedure TfrmMain.Resize;
begin
  inherited;
  //if Assigned(FLayout) then
  //begin
  //  FLayout.Resize(self);
  //  FLayout2.Resize(MainPanel);
   // W3Label1.SetBounds(0,0,Self.ClientWidth, 50);
  //end;
 MainPanel.SetBounds(0,0,self.ClientWidth, self.ClientHeight);
 W3Label1.SetBounds(0,0, MainPanel.ClientWidth, 50);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMain);
end.
