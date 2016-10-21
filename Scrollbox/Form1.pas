unit Form1;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Layout,
  SmartCL.Controls.ScrollBox, SmartCL.Controls.Image, SmartCL.Controls.Label;

type
  TForm1 = class(TW3Form)
    procedure Form1Click(Sender: TObject);
  private
    {$I 'Form1:intf'}
    //fLayout: TLayout;
    //fLayout2: TLayout;
    fScrollBox: TW3ScrollBox;
    fName: TW3Label;
    fDates: TW3Label;
    fImage: TW3Image;
    fNotes: TW3Label;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation

{ TForm1 }

procedure TForm1.Form1Click(Sender: TObject);
begin

end;

procedure TForm1.InitializeForm;
begin
  inherited;
  fScrollBox:= TW3ScrollBox.Create(Self);
  FScrollBox.SetBounds(0,0,self.width, self.height);
  //FScrollBox.StyleClass:='TW3CustomControl';
  fName:= TW3Label.Create(fScrollBox.Content);
  fName.SetBounds(0,550, 50, 50);
  fName.AlignText:= taCenter;
  fName.Caption:= 'Shane Holmes';

  // this is a good place to initialize components
  {fLayout:= Layout.Client(Layout.Margins(10), fScrollBox);
  fLayout2:= Layout.Client([Layout.Top(Layout.Height(50).Margins(10), fName),
                            Layout.Top(Layout.Height(50).Margins(10), fDates),
                            Layout.Bottom(Layout.Height(150).Margins(10), Layout.Center(fImage))]);}
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}

   fScrollBox:= TW3ScrollBox.Create(Self);
  FScrollBox.SetBounds(0,0,self.width, self.height);
  FScrollBox.StyleClass:='TW3CustomControl';
  fName:= TW3Label.Create(fScrollBox.Content);
  fName.SetBounds(0,550, 50, 50);
  fName.AlignText:= taCenter;
  fName.Caption:= 'Shane Holmes';

  {fDates:= TW3Label.Create(fScrollBox.Content);
  fDates.Caption:= '1965 - 2050';
  fDates.AlignText:= taCenter;
  fDates.SetBounds(0,fName.top + fName.Height, fScrollBox.Content.clientWidth, fName.top + fName.Height + 50);

  fImage:= TW3Image.Create(fScrollBox.Content);
  fImage.Width:= 150;
  fImage.Height:= 150;
//  fImage.SetBounds((fScrollBox.Content.clientWidth div 2)-75, fDates.Top + fDates.height, fScrollBox.Content.clientWidth div 2)+75, fDates.top + fDates.Height + 150);
  fImage.SetBounds(0,0,150,150);
  fImage.Url:= 'res\1.jpg';
  fNotes:= TW3Label.Create(fScrollBox.Content);}

end;
 
procedure TForm1.Resize;
begin
  inherited;
  {if  assigned(FLayout) then
  begin
    FLayout.Resize(self);
    FLayout2.Resize(fScrollbox.Content);
  end;}
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.