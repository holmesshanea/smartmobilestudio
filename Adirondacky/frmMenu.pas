unit frmMenu;

interface

uses
  System.Types, System.Colors,
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Header,
  SmartCL.Controls.Label, SmartCL.Controls.Panel, SmartCL.Controls.Listbox,
  SmartCL.Layout, SmartCL.Controls.Elements, SmartCL.Controls.Image;

type

  TLBItem = class(TW3Label)
  private
  protected
    procedure InitializeObject; override;
  end;


  TfrmMenu = class(TW3Form)
  private
    {$I 'frmMenu:intf'}
    fLayout: TLayout;
    fHeaderLayout: TLayout;
    fTitleLayout: TLayout;
    fFooterLayout: TLayout;
    fMenuLayout: TLayout;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure AddItem(ACaption: String);
  end;

implementation

{ TfrmMenu }

procedure TLBItem.InitializeObject;
begin
  inherited InitializeObject;
  StyleClass:= 'lbItem';
  AlignText:= taCenter;
end;

 procedure TfrmMenu.AddItem(ACaption: String);
 begin
   var lbItem := lbxMenu.Items[lbxMenu.Add] as TLBItem;
   lbItem.Caption := ACaption;
   //lbItem.StyleClass:= 'lbItem';
 end;


procedure TfrmMenu.InitializeForm;
begin
  inherited;
  fLayout:= Layout.Client(Layout.Margins(10),[Layout.Top(pnlHeader), Layout.Top(Layout.Padding(0,5,0,0), pnlTitle), Layout.Bottom(pnlFooter), Layout.Client(pnlContent)]);
  fHeaderLayout:= Layout.Client(Layout.Center(W3Image1));
  fTitleLayout:= Layout.Client(Layout.Client(lblTitle));
  fFooterLayout:= Layout.Client(Layout.Client(lblFooter));
  fMenuLayout:= Layout.Client(Layout.Margins(10),Layout.Client(lbxMenu));
  AddItem('People');
  AddItem('Places');
  AddItem('Locations');
  AddItem('Objects');
  AddItem('Flora & Fauna');
end;

procedure TfrmMenu.InitializeObject;
begin
  inherited;
  {$I 'frmMenu:impl'}
  lblFooter.AlignText:= taCenter;
  lbxMenu.Enabled:= True;
  lbxMenu.ItemClass:= TLBItem;
  lbxMenu.ItemHeight := 50;

  lbxMenu.Styles.Item:= 'lbItem';
  lbxMenu.Styles.Selected:= 'lbItem';
  lbxMenu.Styles.Highlighted:= 'lbItem';

  lbxMenu.Color:= TColor($616A2E);
  lbxMenu.Styles.ItemColor:= TColor($BA6F2E);
  lbxMenu.Styles.SelectedColor := TColor($9DAC10);
  lbxMenu.Styles.HighlightedColor:= TColor($BF7F30);

end;
 
procedure TfrmMenu.Resize;
begin
  inherited;
  if assigned(FLayout) then
  begin
    FLayout.Resize(self);
    fHeaderLayout.Resize(pnlHeader);
    fTitleLayout.Resize(pnlTitle);
    fFooterLayout.Resize(pnlFooter);
    fMenuLayout.Resize(pnlContent);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMenu);
end.
