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
 ShowMessage('Index = ' +
             IntToStr(Item.Index) + #10#13 +
             'Caption = ' + Item.Caption);
end;

procedure TForm1.InitializeForm;
var I: Integer;
begin
  inherited;
  // this is a good place to initialize components
  W3ListBox1.BeginUpdate;
   for I:= 1 to 100 do
      W3ListBox1.Add(IntToStr(I));
  W3ListBox1.EndUpdate;
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