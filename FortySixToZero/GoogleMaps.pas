unit GoogleMaps;

interface

uses
  System.Types,
  System.Types.Convert,
  SmartCL.System,
  SmartCL.Components,
  SmartCL.Require,
  System.JSON,
  W3C.HTML5,
  W3C.DOM;

type
  JMap = partial Class external;

  JLatLngLiteral = record
    Property lat : Double;
    Property lng : Double;
  end;

  JMapOptions = record
    property Zoom : Integer;
    property Center : JLatLngLiteral;
  end;

  JMarkerOptions = record
    property position : JLatLngLiteral;
    property map : JMap;
    property title : String;
  end;

  JMarker = partial class external 'google.maps.Marker'
  Public
    Constructor Create(options:JMarkerOptions); external 'Marker';
  end;

 	JMap = partial class external 'google.maps.Map'
	public
    Constructor Create(mapDiv:JElement; options : JMapOptions); external 'Map';
	end;

  procedure InitMap(AAPIKey, ATitle: String; ALat, ALong: Double; AControl: TW3CustomControl);

var
 GMap : JMap;

implementation

procedure InitMap(AAPIKey, ATitle: String; ALat, ALong: Double; AControl: TW3CustomControl);
var
  LUluru : JLatLngLiteral;
  LMapOptions : JMapOptions;
  LMarkerOptions : JMarkerOptions;
  LMarker : JMarker;
  LMapElement : JElement;
begin
 Require(['https://maps.googleapis.com/maps/api/js?key=' + AAPIKey],procedure()
  begin
  LUluru.lat := ALat;
  LUluru.lng := ALong;
  LMapOptions.Zoom := 10;
  LMapOptions.Center := LUluru;
  LMapElement := Document.getElementById(AControl.Handle.id);
  GMap := JMap.Create(LMapElement,LMapOptions);
  LMarkerOptions.position := LUluru;
  LMarkerOptions.map := GMap;
  LMarkerOptions.title := ATitle;
  LMarker := JMarker.Create(LMarkerOptions);
  end);
end;

end.
