unit Main;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls.Button,
  SmartCL.Controls.Panel, SmartCL.Controls.Label, SmartCl.Layout,
  sahMenu, SmartCL.Controls.Header;

type
  TfrmMain = class(TW3Form)
  private
    {$I 'Main:intf'}
     fLayout: TLayout;
     fMenu: TsahMenu;
     fHeader: TW3HeaderControl;
     fFooter: TW3Panel;
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
  FLayout:= Layout.Client([Layout.Top(fHeader), Layout.Bottom(fFooter), Layout.Client(fMenu)]);
end;

procedure TfrmMain.InitializeObject;
begin
  inherited;
  {$I 'Main:impl'}

   fHeader:= TW3HeaderControl.Create(self);
   fHeader.Height:= 50;
   fHeader.BackButton.Visible:= False;
   fHeader.Title.AlignText:= taCenter;
   fHeader.Title.Caption:= 'sahMenu Demo';

   fFooter:= TW3Panel.Create(self);
   fFooter.Height:= 50;

   fMenu:= TsahMenu.Create(self);
   fMenu.Columns:= 4;
   fMenu.OnMenuItemClick:= HandleMenuItemClick;

   fMenu.Add('res\facebook.png', 'Facebook');
   fMenu.Add('res\instagram.png', 'Instagram');
   fMenu.Add('res\twitter.png', 'Twitter');

   fMenu.Add('res\youtube.png', 'Youtube');
   fMenu.Add('res\google-plus.png', 'Google+');
   fMenu.Add('res\myspace.png', 'MySpace');

   fMenu.Add('res\pinterest.png', 'Pinterest');
   fMenu.Add('res\reddit.png', 'Reddit');
   fMenu.Add('res\skype.png', 'Skype');

   fMenu.Add('res\snapchat.png', 'Snapchat');
   fMenu.Add('res\tumblr.png', 'Tumblr');
   fMenu.Add('res\vimeo.png', 'Vimeo');

   fMenu.Add('res\vine.png', 'Vine');
   fMenu.Add('res\whatsapp.png', 'WhatsApp');


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
