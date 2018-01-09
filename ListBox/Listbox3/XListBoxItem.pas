unit XListBoxItem;

interface

uses
  System.Lists, System.Types, System.Colors, System.Time,
  SmartCL.System, SmartCL.Components, SmartCL.Controls.CheckBox,
  SmartCL.Controls.Label, SmartCL.Controls.Image,
  SmartCL.Scroll, SmartCL.Controls.ListBox, SmartCL.Layout;

type

 TXListBoxItem = class(TW3CustomControl)
  private
    fLayout: TLayout;
    fLabel: TW3Label;
    fImage: TW3Image;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure Resize; override;
  public
   property Label: TW3Label read fLabel write fLabel;
   property Image: TW3Image read fImage write fImage;
  end;

  TXListBoxItemData = class(TW3ListBoxItemData)
  protected
    procedure RemoveSelectedStyle; override;
    procedure SetSelectedStyle; override;
  end;

implementation

{ TXListBoxItem }

procedure TXListBoxItemData.RemoveSelectedStyle;
begin
  //TXListBoxItem(ItemObject).StyleClass:= 'XListBoxItemStyle';
  //TXListBoxItem(ItemObject).Label.StyleClass:= 'XListBoxItemStyle';
  TXListBoxItem(ItemObject).Label.Color:= clWhite;
  TXListBoxItem(ItemObject).Label.Font.Color:= clBlack;
end;

procedure TXListBoxItemData.SetSelectedStyle;
begin
  //TXListBoxItem(ItemObject).StyleClass:= 'XListBoxItemSelectedStyle';
  //TXListBoxItem(ItemObject).Label.StyleClass:= 'XListBoxItemSelectedStyle';
  TXListBoxItem(ItemObject).Label.Color:= clBlack;
  TXListBoxItem(ItemObject).Label.Font.Color:= clWhite;
end;


procedure TXListBoxItem.FinalizeObject;
begin
 fLayout:= nil;
end;

procedure TXListBoxItem.InitializeObject;
begin
  inherited;
  fImage:= TW3Image.create(self);
  fImage.Width:= 32;
  fLabel:= TW3Label.create(self);
  fLabel.AlignText:= taCenter;
  fLabel.Handle.style.setProperty('font-size', 'large');
  FLayout:= Layout.Client([
                           Layout.Left(Layout.Width(32), fImage),
                           Layout.Client(fLabel)
                          ]);


end;

procedure TXListBoxItem.Resize;
begin
  inherited;
  if not (Handle.Valid and (csReady in ComponentState)) then
    Exit;
  if Assigned(FLayout) then
  begin
    fLayout.Resize(Self);
  end;
end;

end.

