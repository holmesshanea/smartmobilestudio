unit Form1;

interface

uses
  SmartCL.System, System.Types, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Inet,w3c.dom,
  //myList,
  qtx.runtime, System.Colors,
  qtx.visual.scroll,
  SmartCL.Layout,
  SmartCL.Application, SmartCL.Controls.ListMenu, SmartCL.Controls.Header,
  SmartCL.Controls.ToolButton, SmartCL.Controls.ToolBar,
  SmartCL.Controls.ScrollBox, SmartCL.Controls.Button;

type
  TMyBookList = Class(TQTXScrollWindow)
  protected
    procedure InitializeObject;Override;
  End;

type
  TMyItem = class(TW3CustomControl)
  End;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    FLayout: TLayout;
    FList:    TMyBookList;
    fListMenu : TW3ListMenu;
    fHeader : TW3HeaderControl;
    fScrollBox: TW3Scrollbox;
    Procedure PopulateMyScrollList;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

uses SmartCL.MouseTouch;


//############################################################################
// TMyBookList
//############################################################################

Procedure TMyBookList.InitializeObject;
Begin
  inherited;
  TQTXRuntime.ExecuteDocumentReady(procedure ()
  Begin
    Resize;
  end);
end;

{ TForm1 }

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
    Handle.readyExecute( procedure ()
    begin
      TQTXRuntime.DelayedDispatch( procedure ()
        Begin
           PopulateMyScrollList;
        end,
        250);
    end);
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}
   FList:=TMyBookList.Create(self);

   fHeader:= TW3HeaderControl.Create(self);
   fHeader.Height:= 50;
   fHeader.Title.Caption := 'Mountains';
   //fHeader.Title.AlignText:= taCenter;
   fHeader.BackButton.Visible:= False;
   fHeader.StyleClass:= 'TW3Header';

   FLayout :=
    Layout{1}.Client(Layout{2}.Margins(5).Spacing(5), [
    Layout{3}.Top(fHeader),
    Layout{4}.Client(FList)]);
  //Layout{5}.Bottom(fBackButton)]);
end;

procedure TForm1.Resize;
begin
  inherited;
  FLayout.Resize(Self);
end;

Procedure TForm1.PopulateMyScrollList;
var
  x,dy: Integer;
  mItem : TMyItem;

  procedure AddMenuItem(caption: string);
  var
    li: TW3ListItem;
  begin
    li := fListMenu.Items.Add;
    li.Width := mItem.Width;
    li.Text := 'MyScrollList'+caption;
    li.OnClick := procedure(Sender: TObject)
    begin
      ShowMessage('You clicked: ' + (Sender as TW3ListItem).Text);
    end;
    inc(dy, mItem.Height);
  end;

Begin
  dy := 1;
  for x:=1 to 100 do
  Begin
    mItem := TMyItem.Create(FList.Content);
    mItem.setBounds(0, dy, FList.Content.ClientWidth - 4, 45);
    fListMenu := TW3ListMenu.Create(mItem);
    AddMenuItem(IntToStr(x));
  end;
  FList.Content.Height:=dy; //Size content to all lists
  FList.ScrollAPI.Refresh; //Update IScroll
end;

initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.