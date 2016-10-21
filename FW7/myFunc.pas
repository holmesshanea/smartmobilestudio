unit myFunc;

interface

uses
  SmartCL.System.Lite;

type
TMyFunctions = class(TObject)
  public
    class function InitializeObject: TObject;
  end;

implementation

uses uMain;

class function TMyFunctions.InitializeObject: TObject;
begin
  //
end;


end.
