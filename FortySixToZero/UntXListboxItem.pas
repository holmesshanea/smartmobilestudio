unit UntXListboxItem;

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
    fMtnImg: TW3Image;
    fRank: TW3Label;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure Resize; override;
  public
   property Label: TW3Label read fLabel write fLabel;
   property MtnImg: TW3Image read fMtnImg write fMtnImg;
   property Rank: TW3Label read fRank write fRank;
  end;

  TXListBoxItemData = class(TW3ListBoxItemData)
  private
   fCompleted: Boolean;
   fRank: integer;
  protected
    procedure RemoveSelectedStyle; override;
    procedure SetSelectedStyle; override;
  public
   property Rank: integer read fRank write fRank;
   property Completed: Boolean read fCompleted write fCompleted;
  end;

implementation

uses Common;

{ TXListBoxItem }

procedure TXListBoxItemData.RemoveSelectedStyle;
begin
  TXListBoxItem(ItemObject).Label.StyleClass:= 'XListBoxItemStyle';
  if Completed then
  begin
   if Mode = mdRegular then
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn32C.png'
   else
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn-winter32C.png';
  end
  else
  begin
   if Mode = mdRegular then
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn32.png'
   else
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn32.png'
  end;
  TXListBoxItem(ItemObject).Rank.StyleClass:= 'XListBoxItemStyle';
end;

procedure TXListBoxItemData.SetSelectedStyle;
begin
  TXListBoxItem(ItemObject).Label.StyleClass:= 'XListBoxItemSelectedStyle';

  if Completed then
  begin
   if Mode = mdRegular then
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn32SC.png'
   else
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn-winter32SC.png';
  end
  else
  begin
   if Mode = mdRegular then
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn32S.png'
   else
    TXListBoxItem(ItemObject).MtnImg.Url:= 'res\mtn-Winter32S.png';
  end;
  TXListBoxItem(ItemObject).Rank.StyleClass:= 'XListBoxItemSelectedStyle';
end;


procedure TXListBoxItem.FinalizeObject;
begin
 fLayout:= nil;
end;

procedure TXListBoxItem.InitializeObject;
begin
  inherited;
  fMtnImg:= TW3Image.create(self);
  fMtnImg.Width:= 32;
  fLabel:= TW3Label.create(self);
  fLabel.AlignText:= taCenter;
  fLabel.Handle.style.setProperty('font-size', 'large');

  fRank:= TW3Label.create(self);
  fRank.Width:= 32;
  fRank.AlignText:= taCenter;
  fRank.Caption:= '0';
  fRank.Handle.style.setProperty('font-size', 'large');
  FLayout:= Layout.Client([
                           Layout.Left(Layout.Width(32), fMtnImg),
                           Layout.Right(Layout.Width(32), fRank),
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
