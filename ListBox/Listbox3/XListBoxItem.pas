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
   property Text: string read (fLabel.Caption) write (fLabel.Caption);
   property Url: String read  (fImage.Url) write (fImage.Url);
  end;

implementation

{ TXListBoxItem }


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

