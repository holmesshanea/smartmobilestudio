unit uApplicationLiteLite;

interface

uses FW7;

type
  TApplicationLite = partial class(TObject)
  private
    //function myThis: TObject;
  protected

  public
   class var Instance: TApplicationLite; // read access of property should be a static method
    constructor Create; virtual;
    destructor Destroy; override;
    //property mThis: TObject read myThis;
end;

{ some global functions }
function self: TApplicationLite;
function w3_getElementById(aElementName: string): Variant;

implementation

function w3_getElementById(aElementName: string): Variant;
begin
  Result := DOM7(aElementName);
end;

{
function TW3CustomApplication.myThis: TObject;
begin
  Result := Self;
end;
}

function self: TApplicationLite;
begin
  Result := TApplicationLite.Instance;
end;

{ **************************************************************************** }
{ TApplicationLite }
{ **************************************************************************** }
constructor TApplicationLite.Create;
begin
  inherited Create;
  (* set class instance variable *)
  if not Assigned(Instance) then
    Instance := Self;
end;

destructor TApplicationLite.Destroy;
begin
  Instance := nil;
  inherited;
end;

end.
