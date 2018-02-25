unit Menu;

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
  SmartCL.Controls.Image;

type
  TMenu = class(TW3Form)
  private
    {$I 'Menu:intf'}
    fLayout: TLayout;
    fHeader: TW3Label;
    fRegularImg: TW3Image;
    fWinterImg: TW3Image;
    fAbout: TW3Button;
    procedure HandleAboutClick(Sender: TObject);
    procedure HandleRegularImgClick(Sender: TObject);
    procedure HandleWinterImgClick(Sender: TObject);
  protected
    procedure FormActivated;override;
    procedure FormDeactivated;override;
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

uses UntCommon;

{ TMenu }

procedure TMenu.HandleAboutClick(Sender: TObject);
begin
 Application.GotoForm('About', feFromRight);
end;

Procedure TMenu.HandleRegularImgClick(Sender: TObject);
begin
 Mode:= mdRegular;
 //load regular data from local storage
 Application.GotoForm('Main', feFromRight);
end;

Procedure TMenu.HandleWinterImgClick(Sender: TObject);
begin
 Mode:= mdWinter;
 //load winter data from local storage
 Application.GotoForm('Main', feFromRight);
end;

procedure TMenu.FormDeactivated;
begin
  FLayout:= Nil;
  inherited;
end;

procedure TMenu.FormActivated;
begin
  inherited;
  //
end;

procedure TMenu.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  Self.Color:= clWhite;
end;

procedure TMenu.InitializeObject;
begin
  inherited;
  {$I 'Menu:impl'}
  handle.addEventListener('devicemotion', @Resize, false);

  fHeader:= TW3Label.Create(self);
  fHeader.StyleClass:= 'header';
  fHeader.Height:= 32;
  fHeader.Caption:= 'Menu';
  fHeader.AlignText:= taCenter;

  fRegularImg:= TW3Image.Create(self);
  fRegularImg.url:= 'res\menuitem1.png';
  fRegularImg.OnClick:= HandleRegularImgClick;

  fWinterImg:= TW3Image.Create(self);
  fWinterImg.url:= 'res\menuitem2.png';
  fWinterImg.OnClick:= HandleWinterImgClick;

  fAbout:= TW3Button.Create(self);
  fAbout.Width:= 125; fAbout.Height:= 32;
  fAbout.Caption:= 'About';
  fAbout.OnClick:= HandleAboutClick;

  if ClientHeight > ClientWidth then
  begin
  fRegularImg.Width:= 200; fRegularImg.Height:= 200;
  fWinterImg.Width:= 200; fWinterImg.Height:= 200;
  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Center(fAbout)),
                           Layout.Client(
                                          [
                                           Layout.Top(Layout.Height((ClientHeight-74) Div 2), Layout.Center(fRegularImg)),
                                           Layout.Bottom(Layout.Height((ClientHeight-74) Div 2),Layout.Center(fWinterImg))
                                          ]
                                        )
                           ]
                         );
  end
  else
  begin
   fRegularImg.Width:= 150; fRegularImg.Height:= 150;
   fWinterImg.Width:= 150; fWinterImg.Height:= 150;
   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Center(fAbout)),
                           Layout.Client(
                                          [
                                           Layout.Left(Layout.Width(ClientWidth Div 2), Layout.Center(fRegularImg)),
                                           Layout.Right(Layout.Width(ClientWidth Div 2),Layout.Center(fWinterImg))
                                          ]
                                        )
                           ]
                         );
  end;
end;
 
procedure TMenu.Resize;
begin
  inherited;
  if  Handle.Valid and (csReady in ComponentState) then
  begin
  if ClientHeight > ClientWidth then
  begin
  fRegularImg.Width:= 200; fRegularImg.Height:= 200;
  fWinterImg.Width:= 200; fWinterImg.Height:= 200;
  fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Center(fAbout)),
                           Layout.Client(
                                          [
                                           Layout.Top(Layout.Height((ClientHeight-74) Div 2), Layout.Center(fRegularImg)),
                                           Layout.Bottom(Layout.Height((ClientHeight-74) Div 2),Layout.Center(fWinterImg))
                                          ]
                                        )
                           ]
                         );
  end
  else
  begin
   fRegularImg.Width:= 150; fRegularImg.Height:= 150;
   fWinterImg.Width:= 150; fWinterImg.Height:= 150;
   fLayout:= Layout.Client(Layout.Margins(5).Spacing(5),
                          [
                           Layout.Top(fHeader),
                           Layout.Bottom(Layout.Center(fAbout)),
                           Layout.Client(
                                          [
                                           Layout.Left(Layout.Width(ClientWidth Div 2), Layout.Center(fRegularImg)),
                                           Layout.Right(Layout.Width(ClientWidth Div 2),Layout.Center(fWinterImg))
                                          ]
                                        )
                           ]
                         );
  end;

   if Assigned(fLayout) then
   begin
    fLayout.Resize(self);
   end;
  end;

end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TMenu);
end.
