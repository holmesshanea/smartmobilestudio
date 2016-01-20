unit Form1;

interface

uses 
  System.Colors, SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms,
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Controls,
  SmartCL.Layout, Unit2;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
    FLayout: TLayout;
    FPenny: TXControl;
    FNickel: TXControl;
    FDime: TXControl;
    FQuarter: TXControl;
    FHalfDollar: TXControl;
    FDollar: TXControl;
  protected
    procedure InitializeForm; override;
    procedure InitializeObject; override;
    procedure Resize; override;
  end;

implementation
{ TForm1 }

procedure TForm1.InitializeForm;
begin
  inherited;
  // this is a good place to initialize components
end;

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}

  FPenny:= TXControl.Create(self);
  FPenny.Height:= 50;
  FPenny.ImageUrl:= 'res/penny.png';
  //FPenny.Denomination:= 'Penny';
  //FPenny.FaceValue:= 0.01;
  //FPenny.Qty:= 5;

  FLayout:= Layout.Top(Layout.Padding(5), [FPenny]);

 { FNickel:= TXControl.Create(self);
  FNickel.Height:= 50;
  FNickel.ImageUrl:= 'res/nickel.png';
  FNickel.Denomination:= 'Nickel';
  FNickel.FaceValue:= 0.05;
  FNickel.Qty:= 10;

  FDime:= TXControl.Create(self);
  FDime.Height:= 50;
  FDime.ImageUrl:= 'res/dime.png';
  FDime.Denomination:= 'Dime';
  FDime.FaceValue:= 0.10;
  FDime.Qty:= 3;

  FQuarter:= TXControl.Create(self);
  FQuarter.Height:= 50;
  FQuarter.ImageUrl:= 'res/quarter.png';
  FQuarter.Denomination:= 'Quarter';
  FQuarter.FaceValue:= 0.25;
  FQuarter.Qty:= 4;

  FHalfDollar:= TXControl.Create(self);
  FHalfDollar.Height:= 50;
  FHalfDollar.ImageUrl:= 'res/halfdollar.png';
  FHalfDollar.Denomination:= 'Half-Dollar';
  FHalfDollar.FaceValue:= 0.50;
  FHalfDollar.Qty:= 5;


  FDollar:= TXControl.Create(self);
  FDollar.Height:= 50;
  FDollar.ImageUrl:= 'res/dollar.png';
  FDollar.Denomination:= 'Dollar';
  FDollar.FaceValue:= 1.00;
  FDollar.Qty:= 10;}



  //FLayout:= Layout.Top(Layout.Padding(5), [FPenny, FNickel, FDime, FQuarter, FHalfDollar, FDollar]);
end;
 
procedure TForm1.Resize;
begin
  inherited;
  FLayout.Resize(self);
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.