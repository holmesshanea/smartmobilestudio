unit ListBoxItem;

interface

uses 
 SmartCL.Components, SmartCL.Controls.Label, SmartCL.Controls.Image,
 SmartCL.Layout, System.Colors;

type
  TListBoxItem = class(TW3CustomControl)
  private
    fLayout: TLayout;
    fLabel: TW3Label;
    fImage: TW3Image;
  protected
    procedure InitializeObject; override;
    procedure Resize; override;
  public
   property Text: string read (fLabel.Caption) write (fLabel.Caption);
   property Url: String read  (fImage.Url) write (fImage.Url);
  end;

  function window: variant; external 'window' property;

implementation

{ TListBoxItem }


procedure TListBoxItem.InitializeObject;
begin
  inherited;
   window.addEventListener('devicemotion', @Resize, false);
  fImage:= TW3Image.create(self);
  fLabel:= TW3Label.create(self);
  fLabel.Color:= clRed;
  fLabel.AlignText:= taCenter;
  fImage.Width:= 32;
  fLabel.Width:= 32;
  fLabel.Font.Color:= clYellow;
  Layout.Client(Layout.Padding(3),[layout.Left(fImage), Layout.Client(fLabel)]);
end;
 
procedure TListBoxItem.Resize;
begin
  inherited;
  if Assigned(FLayout) then
  begin
    fLayout.Resize(Self);
  end;
end;
 
end.
