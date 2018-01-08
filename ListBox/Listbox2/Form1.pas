unit Form1;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application,
  SmartCL.Controls.ListBox;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    W3Listbox1: TW3ListBox;
    procedure HandleItemClick(Sender: TW3ListBox; Item: TW3ListBoxItemData);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TForm1 }


procedure TForm1.HandleItemClick(Sender: TW3ListBox; Item: TW3ListBoxItemData);
begin
 ShowMessage(Item.Caption);
end;

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  W3ListBox1.BeginUpdate;
  W3ListBox1.Add('Alabama');
  W3ListBox1.Add('Alaska');
  W3ListBox1.Add('Arizona');
  W3ListBox1.Add('Arkansas');
  W3ListBox1.Add('California');
  W3ListBox1.Add('Colorado');
  W3ListBox1.Add('Connecticut');
  W3ListBox1.Add('Delaware');
  W3ListBox1.Add('Florida');
  W3ListBox1.Add('Georgia');
  W3ListBox1.Add('Hawaii');
  W3ListBox1.Add('Idaho');
  W3ListBox1.Add('Illinois');
  W3ListBox1.Add('Indiana');
  W3ListBox1.Add('Iowa');
  W3ListBox1.Add('Kansas');
  W3ListBox1.Add('Kentucky');
  W3ListBox1.Add('Louisiana');
  W3ListBox1.Add('Maine');
  W3ListBox1.Add('Maryland');
  W3ListBox1.Add('Massachusetts');
  W3ListBox1.Add('Michigan');
  W3ListBox1.Add('Minnesota');
  W3ListBox1.Add('Mississippi');
  W3ListBox1.Add('Missouri');
  W3ListBox1.Add('Montana');
  W3ListBox1.Add('Nebraska');
  W3ListBox1.Add('Nevada');
  W3ListBox1.Add('New Hampshire');
  W3ListBox1.Add('New Jersey');
  W3ListBox1.Add('New Mexico');
  W3ListBox1.Add('New York');
  W3ListBox1.Add('North Carolina');
  W3ListBox1.Add('North Dakota');
  W3ListBox1.Add('Ohio');
  W3ListBox1.Add('Oklahoma');
  W3ListBox1.Add('Oregon');
  W3ListBox1.Add('Pennsylvania');
  W3ListBox1.Add('Rhode Island');
  W3ListBox1.Add('South Carolina');
  W3ListBox1.Add('South Dakota');
  W3ListBox1.Add('Tennessee');
  W3ListBox1.Add('Texas');
  W3ListBox1.Add('Utah');
  W3ListBox1.Add('Vermont');
  W3ListBox1.Add('Virginia');
  W3ListBox1.Add('Washington');
  W3ListBox1.Add('West Virginia');
  W3ListBox1.Add('Wisconsin');
  W3ListBox1.Add('Wyoming');
  W3ListBox1.EndUpdate;
end;

procedure TForm1.InitializeObject;
var I: Integer;
begin
  inherited;
  {$I 'Form1:impl'}
  W3Listbox1:= TW3ListBox.create(self);
  W3ListBox1.OnItemClick:= HandleItemClick;
end;
 
procedure TForm1.Resize;
begin
  inherited;
   W3Listbox1.SetBounds(0,0,width,height);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.