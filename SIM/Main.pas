unit Main;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Button,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCl.Layout,
  sahMenu;

type
  TfrmMain = class(TW3Form)
  private
    {$I 'Main:intf'}
     fLayout: TLayout;
     fMenu: TsahMenu;
     procedure HandleMenuItemClick(Sender: TObject);
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  public
  end;

implementation

{ TForm1 }

procedure TfrmMain.HandleMenuItemClick(Sender: TObject);
begin
 ShowMessage('Index = ' + intToStr(TsahMenuItem(Sender).TagValue));
 {case TsahMenuItem(Sender).TagValue of
  1: begin ShowMessage('1'); end;
  2: begin ShowMessage('2'); end;
  3: begin ShowMessage('3'); end;
 end;}
end;

procedure TfrmMain.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
  FLayout:= Layout.Client(fMenu);
end;

procedure TfrmMain.InitializeObject;
begin
  inherited;
  {$I 'Main:impl'}
   fMenu:= TsahMenu.Create(self);
   fMenu.Columns:= 2;
   fMenu.OnMenuItemClick:= HandleMenuItemClick;

   fMenu.Add('res\facebook.png');
   fMenu.Add('res\instagram.png');
   fMenu.Add('res\twitter.png');

   fMenu.Add('res\youtube.png');
   fMenu.Add('res\google-plus.png');
   fMenu.Add('res\myspace.png');

   fMenu.Add('res\pinterest.png');
   fMenu.Add('res\reddit.png');
   fMenu.Add('res\skype.png');

   fMenu.Add('res\snapchat.png');
   fMenu.Add('res\tumblr.png');
   fMenu.Add('res\vimeo.png');

   fMenu.Add('res\vine.png');
   fMenu.Add('res\whatsapp.png');


end;
 
procedure TfrmMain.Resize;
begin
  inherited;
  if Assigned(FLayout) then
  begin
    FLayout.Resize(self);
  end;
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TfrmMain);
end.
