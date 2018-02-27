unit Common;

interface

uses 
  ECMA.Date,
  System.Types,
  System.Types.Convert,
  SmartCL.System,
  SmartCL.Storage.Local;


  type

   TMode = (mdRegular, mdWinter);

   TCompleteMode = (cmNone, cmEdit);

   TCompletion = record
    Rank: string; external "Rank";
    Date: string; external "Date";
    Notes: string; external "Notes";
   end;

var
 JSONStr: String;
 Mode: TMode = mdRegular;
 CompArray: array of TCompletion;
 MtnArray : array  [1..46] of string = (
                      'Marcy',          //01
                      'Algonquin',      //02
                      'Haystack',       //03
                      'Skylight',       //04
                      'Whiteface',      //05
                      'Dix',            //06
                      'Gray',           //07
                      'Iroquois',       //08
                      'Basin',          //09
                      'Gothics',        //10
                      'Colden',         //11
                      'Giant',          //12
                      'Nippletop',      //13
                      'Santanoni',      //14
                      'Redfield',       //15
                      'Wright',         //16
                      'Saddleback',     //17
                      'Panther',        //18
                      'Table Top',      //19
                      'Rocky',          //20
                      'Macomb',         //21
                      'Armstrong',      //22
                      'Hough',          //23
                      'Seward',         //24
                      'Marshall',       //25
                      'Allen',          //26
                      'Big Slide',      //27
                      'Esther',         //28
                      'Upper Wolf Jaw', //29
                      'Lower Wolf Jaw', //30
                      'Street',         //31
                      'Phelps',         //32
                      'Donaldson',      //33
                      'Seymour',        //34
                      'Sawteeth',       //35
                      'Cascade',        //36
                      'South Dix',      //37
                      'Porter',         //38
                      'Colvin',         //39
                      'Emmons',         //40
                      'Dial',           //41
                      'Grace',          //42
                      'Blake',          //43
                      'Cliff',          //44
                      'Nye',            //45
                      'Couchsachraga'   //46
                      );


 ElevArray : array [1..46] of String = (
                    '5344', // 1
                    '5114', //2
                    '4960', //3
                    '4926', //4
                    '4867', //5
                    '4857', //6
                    '4840', //7
                    '4840', //8
                    '4827', //9
                    '4736', //10
                    '4714', //11
                    '4627', //12
                    '4620', //13
                    '4607', //14
                    '4606', //15
                    '4580', //16
                    '4515', //17
                    '4442', //18
                    '4427', //19
                    '4420', //20
                    '4405', //21
                    '4400', //22
                    '4400', //23
                    '4361', //24
                    '4360', //25
                    '4340', //26
                    '4240', //27
                    '4240', //28
                    '4185', //29
                    '4175', //30
                    '4166', //31
                    '4161', //32
                    '4140', //33
                    '4120', //34
                    '4100', //35
                    '4098', //36
                    '4060', //37
                    '4059', //38
                    '4057', //39
                    '4040', //40
                    '4020', //41
                    '4012', //42
                    '3960', //43
                    '3960', //44
                    '3895', //45
                    '3820'  //46
                    );


 LatArray : array [1..46] of Double = (
                    44.112734, // 1
                    44.143611, // 2
                    44.105556, // 3
                    44.099444, // 4
                    44.365833, // 5
                    44.082222, // 6
                    44.111443, // 7
                    44.136997, // 8
                    44.121164, // 9
                    44.128108, //10
                    44.126998, //11
                    44.161143, //12
                    44.089167, //13
                    44.082500, //14
                    44.094777, //15
                    44.151667, //16
                    44.126667, //17
                    44.098392, //18
                    44.140667, //19
                    44.154444, //20
                    44.051721, //21
                    44.134774, //22
                    44.069498, //23
                    44.159667, //24
                    44.127554, //25
                    44.070833, //26
                    44.182272, //27
                    44.386992, //28
                    44.140500, //29
                    44.148385, //30
                    44.179333, //31
                    44.157000, //32
                    44.153947, //33
                    44.158167, //34
                    44.113333, //35
                    44.218611, //36
                    44.060054, //37
                    44.215278, //38
                    44.093889, //39
                    44.143670, //40
                    44.105886, //41
                    44.065331, //42
                    44.081443, //43
                    44.103110, //44
                    44.187260, //45
                    44.095615  //46
                    );

LonArray : array [1..46] of Double = (
                    -73.923726,  //01
                    -73.986667,  //02
                    -73.900556,  //03
                    -73.930833,  //04
                    -73.902778,  //05
                    -73.786389,  //06
                    -73.934866,  //07
                    -73.998203,  //08
                    -73.886253,  //09
                    -73.857085,  //10
                    -73.959867,  //11
                    -73.720209,  //12
                    -73.816333,  //13
                    -74.131167,  //14
                    -73.949866,  //15
                    -73.980278,  //16
                    -73.875167,  //17
                    -74.132097,  //18
                    -73.916333,  //19
                    -73.705556,  //20
                    -73.780135,  //21
                    -73.849029,  //22
                    -73.777635,  //23
                    -74.199667,  //24
                    -74.011814,  //25
                    -73.939722,  //26
                    -73.870420,  //27
                    -73.889867,  //28
                    -73.845333,  //29
                    -73.832640,  //30
                    -74.027167,  //31
                    -73.921500,  //32
                    -74.210991,  //33
                    -74.172667,  //34
                    -73.850667,  //35
                    -73.860556,  //36
                    -73.774301,  //37
                    -73.843611,  //38
                    -73.834444,  //39
                    -74.214046,  //40
                    -73.795970,  //41
                    -73.757356,  //42
                    -73.844583,  //43
                    -73.975145,  //44
                    -74.023820,  //45
                    -74.160154   //46
                    );


function getCompDate(ARank: String): String;
function getNotes(ARank: String): String;
function getCompleted(ARank: String): Boolean;

function recExists(ARank: String): Boolean;
procedure AddRec(ARank, ADate, ANotes: String);
procedure RemoveRec(ARank: String);
procedure EditRec(ARank, ADate, ANotes: String);

function ReadData(Mode: TMode): String;
procedure WriteData(Mode: TMode);

function getLat(AValue: String): Double;
function getLong(AValue: String): Double;

implementation

function getLat(AValue: String): String;
begin
 result:= copy(AValue, 1, length(AValue) - pos(',', AValue)-1);
end;

function getLong(AValue: String): String;
begin
 result:= copy(AValue, pos(',', AValue)+1, length(AValue));
end;

procedure RemoveRec(ARank: String);
var i: integer;
begin
 for i:= 0 to CompArray.Length-1 do
  if CompArray[i].Rank = ARank then
  begin
   CompArray.Delete(i);
   exit;
  end;
end;

function getCompDate(ARank: String): String;
var i: integer;
begin
 for i:= 0 to CompArray.Length-1 do
  if CompArray[i].Rank = ARank then
  begin
   result:= CompArray[i].Date;
   exit;
  end;
end;

function getNotes(ARank: String): String;
var i: integer;
begin
 for i:= 0 to CompArray.Length-1 do
  if CompArray[i].Rank = ARank then
  begin
   result:= CompArray[i].Notes;
   exit;
  end;
end;

function getCompleted(ARank: String): Boolean;
var i: integer;
begin
 result:= False;
 for i:= 0 to CompArray.Length-1 do
  if CompArray[i].Rank = ARank then
  begin
   result:= True;
   exit;
  end;
end;

function recExists(ARank: String): Boolean;
var i: integer;
begin
 result:= false;
 for i:= 0 to CompArray.Length-1 do
  if CompArray[i].Rank = ARank then
  begin
   result:= true;
   exit;
  end;
end;

procedure AddRec(ARank, ADate, ANotes: String);
var
 Comp: TCompletion;
begin
 Comp.Rank:= ARank;
 Comp.Date:= ADate;
 Comp.Notes:= ANotes;
 CompArray.Add(Comp);
end;

procedure EditRec(ARank, ADate, ANotes: String);
var i: integer;
begin
 for i:= 0 to CompArray.Length-1 do
  if CompArray[i].Rank = ARank then
  begin
   CompArray[i].Date:= ADate;
   CompArray[i].Notes:= ANotes;
   exit;
  end;
end;

procedure WriteData(Mode: TMode);
var Storage: TW3LocalStorage;
begin
 Storage := TW3LocalStorage.Create;
 Storage.Open('46To0');
 if Mode = mdRegular then
  Storage.setKeyStr('RegularData', JSONStr)
 else
  Storage.setKeyStr('WinterData', JSONStr);
 Storage.Close;
 Storage.Free;
end;

function ReadData(Mode: TMode): String;
var Storage: TW3LocalStorage;
begin
 Storage := TW3LocalStorage.Create;
 Storage.Open('46To0');
 if Mode = mdRegular then
  result := Storage.getKeyStr('RegularData', 'error')
 else
  result := Storage.getKeyStr('WinterData', 'error');
 Storage.Close;
 Storage.Free;
end;

end.
