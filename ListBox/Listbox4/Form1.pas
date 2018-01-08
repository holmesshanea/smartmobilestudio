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
    procedure HandleItemClick(Sender: TW3ListBox; Item: TW3ListBoxItem);
    procedure HandleShowItem(Sender: TW3ListBox; Item: TW3ListBoxItem);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

uses XListBoxItem;

{ TForm1 }

{procedure TForm1.HandleShowItem(Sender: TW3ListBox; Item: TW3ListBoxItem);
begin
 if Item.ItemObject is TXListBoxItem then
  begin
    TXListBoxItem(Item.ItemObject).Text:= Item.Caption;
    TXListBoxItem(Item.ItemObject).Url:=  'res\' + intToStr(Item.Index + 1) + '.png';
  end;
end;}

procedure TForm1.HandleItemClick(Sender: TW3ListBox; Item: TW3ListBoxItem);
begin
 ShowMessage(Item.Caption);
end;

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  W3ListBox1.beginUpdate;
  W3ListBox1.
 // W3ListBox1.AddItem('Alabama');

  W3ListBox1.endUpdate;
end;

procedure TForm1.InitializeObject;
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