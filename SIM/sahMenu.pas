unit sahMenu;

interface

uses 
  System.Lists,
  SmartCL.System,  SmartCL.Components, SmartCL.Controls, SmartCL.Layout,
  SmartCL.Scroll;

const

 IMAGEMARGIN = 10;
 ITEMSMARGIN = 10;

type

TsahMenu = class;

TsahMenuItem = class(TW3CustomControl)
private
 fImage: TW3Image;
protected
 procedure StyleTagObject; override;
 procedure InitializeObject; override;
 procedure FinalizeObject; override;
 procedure Resize; override;
public
 constructor Create(AOwner: TW3Component); override;
 property Image: TW3Image read fImage write fImage;
end;

TsahMenuItems = class(TObjectList)
private
 fOwner: TsahMenu;
 function getItem(Index: Integer): TsahMenuItem;
 procedure setItem(Index: Integer; MenuItem: TsahMenuItem);
protected
public
 function Add(MenuItem: TsahMenuItem): integer;
 procedure Remove(Index: Integer);
 property Items [Index: Integer]: TsahMenuItem read getItem write SetItem; default;
 property Owner: TsahMenu read fOwner write fOwner;
end;


TsahMenu = class(TW3ScrollControl)
private
 fMenuItemSize: Integer;
 fColumns: Integer;
 fOnMenuItemClick: TMouseClickEvent;
 fMenuItems: TsahMenuItems;
 procedure ResizeMenuItems;
 function getCount: Integer;
protected
 procedure StyleTagObject; override;
 procedure InitializeObject; override;
 procedure FinalizeObject; override;
 procedure Resize; override;
public
 function Add(ImageUrl: String): integer;
 procedure Delete(Index: Integer);
 procedure Clear;
 constructor Create(AOwner: TW3Component); override;
 property MenuItems: TsahMenuItems read fMenuItems write fMenuItems;
 property Count: integer read getCount;
 property OnMenuItemClick: TMouseClickEvent read fOnMenuItemClick write fOnMenuItemClick;
 property Columns: Integer read fColumns write fColumns;
end;

implementation


{TsahMenuItem}

procedure  TsahMenuItem.StyleTagObject;
begin
  inherited;
  Handle.style.setProperty('background-color', 'white');
  Handle.style.setProperty('border-color', 'black');
  Handle.style.setProperty('border-style', 'solid');
  Handle.style.setProperty('border-width', '1px');
  Handle.style.setProperty('border-radius', '5px');
end;

procedure TsahMenuItem.InitializeObject;
begin
  inherited;
  fImage:= TW3Image.Create(Self);
end;

procedure TsahMenuItem.FinalizeObject;
begin
  fImage.Free;
  inherited;
end;

procedure TsahMenuItem.Resize;
begin
  inherited;
  fImage.SetBounds(IMAGEMARGIN, IMAGEMARGIN, clientWidth - IMAGEMARGIN * 2, clientHeight - IMAGEMARGIN * 2);
end;

constructor TsahMenuItem.Create(AOwner: TW3Component);
begin
 inherited(AOwner);
 //
end;

{TsahMenuItems}

function TsahMenuItems.getItem(Index: Integer): TsahMenuItem;
begin
 result:= TsahMenuItem(inherited Items[Index]);
end;

function  TsahMenuItems.Add(MenuItem: TsahMenuItem): integer;
begin
 result:= inherited Add(MenuItem);
end;

procedure TsahMenuItems.setItem(Index: Integer; MenuItem: TsahMenuItem);
begin
  inherited setItem(Index, MenuItem);
end;


procedure TsahMenuItems.Remove(Index: Integer);
begin
  inherited Remove(Index);
end;

{TsahMenu}

function TsahMenu.getCount: Integer;
begin
 result:= fMenuItems.Count;
end;

procedure TsahMenu.ResizeMenuItems;
var
 I, Idx: Integer;
 xPos, yPos: Integer;
begin
  Idx:= 0;
  xPos:= ITEMSMARGIN;
  yPos:= ITEMSMARGIN;

  fmenuItemSize:= ((clientWidth DIV Columns) - (Columns + 1 * ITEMSMARGIN));

 for I:= 0 to MenuItems.Count-1 do
 begin
  TsahMenuItem(MenuItems[I]).SetBounds(xPos, yPos, fMenuItemSize, fMenuItemSize);
  if Idx = Columns-1 then
  begin
   yPos:= yPos + fMenuItemSize + ITEMSMARGIN;
   xPos:= ITEMSMARGIN;
   Idx:= 0;
  end
  else
  begin
   xPos:= xPos + fMenuItemSize + ITEMSMARGIN;
   inc(Idx);
  end;
 end;
end;

procedure TsahMenu.StyleTagObject;
begin
  inherited;
  Handle.style.setProperty('background-color', 'white');
  Handle.style.setProperty('border-color', 'black');
  Handle.style.setProperty('border-style', 'solid');
  Handle.style.setProperty('border-width', '1px');

end;

procedure TsahMenu.InitializeObject;
begin
  inherited;
  //
end;

procedure TsahMenu.FinalizeObject;
begin
 fMenuItems.Clear;
 fMenuItems.Free;
 inherited;
end;

procedure TsahMenu.Resize;
var
 Rows: Integer;
begin
  inherited;
  Rows:= (fMenuItems.Count Div Columns);
  if (fMenuItems.Count Mod Columns) > 0 then Rows:= Rows + 1;
  Content.SetBounds(0,0, clientWidth, (Rows * fMenuItemSize) + (((Rows + 1) * ITEMSMARGIN)) );
  ResizeMenuItems;
end;

function  TsahMenu.Add(ImageUrl: String): integer;
var
 MenuItem: TsahMenuItem;
begin
 MenuItem:= TsahMenuItem.Create(self.Content);
 MenuItem.OnClick:= OnMenuItemClick;
 MenuItem.Image.Url:= ImageUrl;
 result:= fMenuItems.Add(MenuItem);
 MenuItem.TagValue:= fMenuItems.Count;
end;

procedure TsahMenu.Delete(Index: Integer);
begin
 fMenuItems.Remove(Index);
end;

procedure TsahMenu.Clear;
begin
 fMenuItems.Clear;
end;

constructor TsahMenu.Create(AOwner: TW3Component);
begin
 inherited (AOwner);
 fColumns:= 3;
 fMenuItems:= TsahMenuItems.Create;
end;


end.
