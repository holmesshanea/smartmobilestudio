unit Map;

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
  SmartCL.Controls.Button,
  SmartCL.Controls.Elements;

type
  TfrmMap = class(TW3Form)
  private
    {$I 'Map:intf'}
    fMountain: String;
    fLat: Double;
    fLong: Double;
    fLayout: TLayout;
    fHeader: TW3Label;
    fBackBtn: TW3Button;
    fMap: TW3DivHtmlElement;
    procedure HandleBackClick(sender: TObject);
  protected
    procedure FormDeactivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
   property Mountain: String read fMountain write fMountain;
   property Latitude: Double read fLat write fLat;
   property Longitude: Double read fLong write fLong;
  end;

implementation

uses GoogleMaps;

{ TMap }

procedure TfrmMap.HandleBackClick(sender: TObject);
begin
 Application.GotoForm('Mountain', feToLeft);
end;

procedure TfrmMap.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TfrmMap.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  self.Color:= clWhite;
end;

procedure TfrmMap.InitializeObject;
begin
  inherited;
  {$I 'Map:impl'}

  handle.addEventListener('devicemotion', @Resize, false);

  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'Map';
  fHeader.AlignText:= taCenter;

  fBackBtn:= TW3Button.Create(self);
  fBackBtn.Height:= 32; fBackBtn.Width:= 125;
  fBackBtn.Caption:= 'Back';
  fBackBtn.OnClick:= HandleBackClick;

  FMap := TW3DIVHtmlElement.Create(Self);

  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Height(32), Layout.Center(fBackBtn)),
                           Layout.Client(fMap)
                          ]
                          );
end;
 
procedure TfrmMap.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin

   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Height(32), Layout.Center(fBackBtn)),
                           Layout.Client(fMap)
                          ]
                          );
   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
    InitMap('AIzaSyCU7roAAjLtFT2ItaMLcS6WNWeuFkG8LJQ', Mountain, Latitude, Longitude,  FMap);
   end;
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMap);
end.
