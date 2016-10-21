unit Form1;

interface

uses 
  SmartCL.System, SmartCL.Graphics, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Fonts, SmartCL.Borders, SmartCL.Application, SmartCL.Chart;

type
  TForm1 = class(TW3Form)
  private
    {$I 'Form1:intf'}
  protected
    procedure InitializeObject; override;
  end;

implementation

procedure TForm1.InitializeObject;
begin
  inherited;
  {$I 'Form1:impl'}
  W3Chart1.Title.Text := 'Percentage of Sessions on PPS (Sept 2014)';
  W3Chart1.Legend.Position := lpBottom;
  var bars := TBarSeries.Create;
  W3Chart1.AddSeries(bars);
  W3Chart1[0].Data.Values := [17, 9, 6, 5, 4, 3, 3, 2, 2, 2];
  W3Chart1[0].Data.Labels := ['UK', 'US','Germany', 'India', 'Brazil', 'Indonesia',
                              'Russia', 'Netherlands', 'Italy', 'France'];
end;
 
initialization
  Forms.RegisterForm({$I %FILE%}, TForm1);
end.
