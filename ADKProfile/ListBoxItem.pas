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
    procedure FinalizeObject; override;
    procedure Resize; override;
  public
   property Text: string read (fLabel.Caption) write (fLabel.Caption);
   property Url: String read  (fImage.Url) write (fImage.Url);
  end;

implementation

{ TListBoxItem }

procedure TListBoxItem.FinalizeObject;
begin
 fLayout:= nil;
end;

procedure TListBoxItem.InitializeObject;
begin
  inherited;
  fImage:= TW3Image.create(self);
  fImage.Width:= 32;
  fLabel:= TW3Label.create(self);
  fLabel.AlignText:= taCenter;

  FLayout:= Layout.Client([
                           Layout.Left(Layout.Width(32), fImage),
                           Layout.Client(fLabel)
                          ]);


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
