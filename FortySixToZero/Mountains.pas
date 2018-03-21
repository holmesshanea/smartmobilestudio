unit Mountains;

interface

uses 
  System.Colors,
  System.Types,
  System.Types.Convert,
  System.Objects,
  System.Time,
  SmartCL.System,
  SmartCL.Time,
  SmartCL.Graphics,
  SmartCL.Components,
  SmartCL.FileUtils,
  SmartCL.Forms,
  SmartCL.Fonts,
  SmartCL.Theme,
  SmartCL.Borders,
  SmartCL.Application,
  SmartCL.Layout,
  SmartCL.Controls.Label,
  SmartCL.Controls.Panel,
  SmartCL.Controls.ListBox,
  SmartCL.Controls.Button;

type
  TfrmMountains = class(TW3Form)
  private
    {$I 'Mountains:intf'}
    fIndex: Integer;
    fLayout: TLayout;
    fHeader: TW3Label;
    fListbox: TW3ListBox;
    fBackBtn: TW3Button;
    procedure HandleBackClick(sender: TObject);
    procedure HandleShowItem(Sender: TW3ListBox; Item: TW3ListBoxItemData);
    procedure HandleItemSelected(Sender: TObject; ItemIndex: Integer);
  protected
    procedure FormActivated;override;
    procedure FormDeactivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
    procedure UpdateListBox;
    property Idx: integer read fIndex write fIndex;
    property ListBox: TW3ListBox read fListbox write fListbox;
  end;

implementation

uses UntXListBoxItem, Main, Mountain, Common;

{ TfrmMountains }

procedure TfrmMountains.UpdateListBox;
var
 i: integer;
 item: TW3ListBoxItemData;
begin
  fListBox.beginUpdate;
  fListBox.Clear;
  for I:= Low(MtnArray) to High(MtnArray) do
  begin
   item:= fListBox.AddItem(MtnArray[I]);
   TXListBoxItemData(Item).Rank:= I;
   TXListBoxItemData(Item).Completed:= getCompleted(inttostr(I));
  end;
  fListBox.endUpdate;
  if fIndex <> -1 then fListBox.SelectedIndex:= fIndex;
end;

procedure TfrmMountains.FormActivated;
begin
  inherited;
  UpdateListBox;
end;

procedure TfrmMountains.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TfrmMountains.HandleShowItem(Sender: TW3ListBox; Item: TW3ListBoxItemData);
begin
 if Item.ItemObject is TXListBoxItem then
  begin
   TXListBoxItem(Item.ItemObject).Label.Caption:= Item.Caption;
   TXListBoxItem(Item.ItemObject).Rank.Caption:=  intToStr(TXListBoxItemData(Item).Rank);

   if TXListBoxItemData(Item).Completed then
   begin

    if Mode = mdRegular then
     TXListBoxItem(Item.ItemObject).MtnImg.Url:=  'res\mtn32C.png'
    else
     TXListBoxItem(Item.ItemObject).MtnImg.Url:=  'res\mtn-winter32C.png';

    TXListBoxItem(Item.ItemObject).Label.TextNode.style.setProperty('text-decoration', 'line-through');
    TXListBoxItem(Item.ItemObject).Rank.TextNode.style.setProperty('text-decoration', 'line-through');
   end
  else
  begin

   if Mode = mdRegular then
    TXListBoxItem(Item.ItemObject).MtnImg.Url:=  'res\mtn32.png'
   else
    TXListBoxItem(Item.ItemObject).MtnImg.Url:=  'res\mtn-winter32.png';

   TXListBoxItem(Item.ItemObject).Label.TextNode.style.setProperty('text-decoration', 'none');
   TXListBoxItem(Item.ItemObject).Rank.TextNode.style.setProperty('text-decoration', 'none');
  end;
  end;
end;

procedure TfrmMountains.HandleItemSelected(Sender: TObject; ItemIndex: Integer);
begin
 Idx:= ItemIndex;
 if getCompleted(IntToStr(ItemIndex+1)) then
 begin

   if Mode = mdRegular then
    TfrmMountain(Application.FormByName('Mountain')).Image.Url:= 'res\mtn128C.png'
   else
    TfrmMountain(Application.FormByName('Mountain')).Image.Url:= 'res\mtn-winter128C.png';

   TfrmMountain(Application.FormByName('Mountain')).Header.TextNode.style.setProperty('text-decoration', 'line-through');
 end
 else
 begin

  if Mode = mdRegular then
   TfrmMountain(Application.FormByName('Mountain')).Image.Url:= 'res\mtn128.png'
  else
   TfrmMountain(Application.FormByName('Mountain')).Image.Url:= 'res\mtn-winter128.png';

  TfrmMountain(Application.FormByName('Mountain')).Header.TextNode.style.setProperty('text-decoration', 'none');
 end;

 TfrmMountain(Application.FormByName('Mountain')).Rank:= IntToStr(ItemIndex+1);
 TfrmMountain(Application.FormByName('Mountain')).Mountain:= MtnArray[ItemIndex+1];
  TfrmMountain(Application.FormByName('Mountain')).Elevation:= ElevArray[ItemIndex+1];

 TfrmMountain(Application.FormByName('Mountain')).Source:= 'Mountains';
 Application.GotoForm('Mountain', feFromRight);
end;

procedure TfrmMountains.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
  UpdateListBox;
end;

procedure TfrmMountains.InitializeObject;
begin
  inherited;
  {$I 'Mountains:impl'}
  handle.addEventListener('devicemotion', @Resize, false);
  fIndex:= -1;
  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'Mountains';
  fHeader.AlignText:= taCenter;

  fListbox:= TW3ListBox.create(self);
  fListBox.StyleClass:= 'TW3ControlBorder';
  fListbox.RecycleControls := False;
  fListBox.ItemClass:= TXListBoxItem;
  fListBox.ItemDataClass:= TXListBoxItemData;
  fListBox.OnShowItem:= HandleShowItem;
  fListBox.OnSelected:= HandleItemSelected;

  fBackBtn:= TW3Button.Create(self);
  fBackBtn.Height:= 32; fBackBtn.Width:= 125;
  fBackBtn.Caption:= 'Back';
  fBackBtn.OnClick:= HandleBackClick;

  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                          Layout.Top(fHeader),
                          Layout.Bottom(Layout.Center(fBackBtn)),
                          Layout.Client(fListBox)]
                         );
end;

procedure TfrmMountains.Resize;
begin
  inherited;
   if  Handle.Valid and (csReady in ComponentState) then
  begin
   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                          Layout.Top(fHeader),
                          Layout.Bottom(Layout.Center(fBackBtn)),
                          Layout.Client(fListBox)]
                         );
   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;
end;

procedure TfrmMountains.HandleBackClick(sender: TObject);
begin
 Application.GotoForm('Main', feToLeft);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMountains);
end.
