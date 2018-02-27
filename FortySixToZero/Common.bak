unit UntCommon;

interface

uses 
  ECMA.Date,
  System.Types,
  System.Types.Convert,
  SmartCL.System,
  SmartCL.Storage.Local;

  Const
  Elements = 46;

  type

   TMode = (mdRegular, mdWinter);

   TCompleteMode = (cmNone, cmEdit);

   TCompletion = record
    Rank: string; external "Rank";
    Date: string; external "Date";
    Notes: string; external "Notes";
   end;

var

 CompArray: Array of TCompletion;
 Mode: TMode = mdRegular;

 {MtnArray  : array  [1..Elements] of string = (

'Marcy,Mount Marcy,5344,4914,Marcy Group,44.112734,-73.923726',
'Algonquin,Algonquin Peak,5114,2100,MacIntyre Range,44.143611,-73.986667',
'Haystack,Mount Haystack,4961,840,Unknown,44.105556,-73.900556',
'Skylight,Mount Skylight,4925,578,Unknown,44.099444,-73.930833',
'Whiteface,Whiteface Mountain,4867,3110,Unknown,44.365833,-73.902778',
'Dix,Dix Mountain,4857,2830,Dix Range,44.082222,-73.786389',
'Gray,Gray Peak,4840,102,Unknown,44.111443,-73.934866',
Iroquois,4840,
Basin,4827,
Gothics,4736,
Colden,4714,
Giant,4627,
Nippletop,4620,
Santanoni,4607,
Redfield,4606,
Wright,4580,
Saddleback.4515,
Panther,4442,
Table Top,4427,
Rocky Peak,4420,
Macomb,4405,
Armstrong,4400,
Hough,4400,
Seward,4361,
Marshall,4360,
Allen,4340,
Big Slide,4240,
Esther,4240,
Upper Wolf Jaw,4185,
Lower Wolf Jaw,4175,
Street,4166,
Phelps,4161,
Donaldson,4140,
Seymour,4120,
Sawteeth,4100,
Cascade,4098,
South Dix,4060,
Porter,4059,
Colvin,4057,
Emmons,4040,
Dial,4020,
Grace,4012,
Blake,3960,
Cliff,3960,
Nye,3895,
Couchsachraga,3820,


                      );}

 MtnArray  : array  [1..Elements] of string = (
                      'Marcy',         //1
                      'Algonquin',      //2
                      'Haystack',      //3
                      'Skylight',      //4
                      'Whiteface',  //5
                      'Dix',            //6
                      'Gray',           //7
                      'Iroquois',       //8
                      'Basin',               //9
                      'Gothics',             //10
                      'Colden',        //11
                      'Giant',      //12
                      'Nippletop',  //13
                      'Santanoni',      //14
                      'Redfield',           //15
                      'Wright',         //16
                      'Saddleback', //17
                      'Panther',        //18
                      'Table Top',  //19
                      'Rocky Peak',  //20
                      'Macomb',          //21
                      'Armstrong',    //22
                      'Hough',     //23
                      'Seward',      //24
                      'Marshall',      //25
                      'Allen',     //26
                      'Big Slide',     //27
                      'Esther', //28
                      'Upper Wolf Jaw',     //29
                      'Lower Wolf Jaw', //30
                      'Street',        //31
                      'Phelps',        //32
                      'Donaldson',               //33
                      'Seymour',     //34
                      'Sawteeth',       //35
                      'Cascade',       //36
                      'South Dix',        //37
                      'Porter',              //38
                      'Colvin',           //39
                      'Emmons',           //40
                      'Dial',      //41
                      'Grace',          //42
                      'Blake',             //43
                      'Cliff Mountain',         //44
                      'Nye Mountain',           //45
                      'Couchsachraga Peak'      //46
                      );


 ElevArray : array [1..Elements] of String = (
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

 PromArray : array [1..Elements] of String = (

                      '4914', //1
                      '2097', //2
                      '827',  //3
                      '578',  //4
                      '3093', //5
                      '151',  //6
                      '725',  //7
                      '102',  //8
                      '2789', //9
                      '699',  //10
                      '876',  //11
                      '2953', //12
                      '2408', //13
                      '242',  //14
                      '1345', //15
                      '256',  //16
                      '361',  //17
                      '275',  //18
                      '98',   //19
                      '410',  //20
                      '374',  //21
                      '617',  //22
                      '564',  //23
                      '493',  //24
                      '640',  //25
                      '2021', //26
                      '302',  //27
                      '266',  //28
                      '1049', //29
                      '663',  //30
                      '190',  //31
                      '1247', //32
                      '459',  //33
                      '138',  //34
                      '1178', //35
                      '1007', //36
                      '295',  //37
                      '164',  //38
                      '102',  //39
                      '689',  //40
                      '319',  //41
                      '164',  //42
                      '558',  //43
                      '466',  //44
                      '66',   //45
                      '250'   //46
                      );

 RangeArray : array [1..Elements] of String = (
                    'Marcy Group',             // 1
                    'McIntyre Mountains',      // 2
                    'Marcy Group',             // 3
                    'Marcy Group',             // 4
                    'Whiteface Mountain Area', // 5
                    'McIntyre Mountains',      // 6
                    'Great Range',             // 7
                    'Marcy Group',             // 8
                    'Dix Range',               // 9
                    'Great Range',             //10
                    'Marcy Group',             //11
                    'Giant Mountain Area',     //12
                    'Santanoni Range',         //13
                    'Marcy Group',             //14
                    'Colvin Range',            //15
                    'McIntyre Mountains',      //16
                    'Great Range',             //17
                    'Santanoni Range',         //18
                    'Great Range',             //19
                    'Northern High Peaks',     //20
                    'Dix Range',               //21
                    'Giant Mountain Area',     //22
                    'Dix Range',               //23
                    'McIntyre Mountains',      //24
                    'Marcy Group',             //25
                    'Seward Mountains',        //26
                    'Whiteface Mountain Area', //27
                    'Great Range',             //28
                    'Northern High Peaks',     //29
                    'Great Range',             //30
                    'Northern High Peaks',     //31
                    'Street Range',            //32
                    'Great Range',             //33
                    'Seward Mountains',        //34
                    'Northern High Peaks',     //35
                    'Seward Mountains',        //36
                    'Northern High Peaks',     //37
                    'Dix Range',               //38
                    'Seward Mountains',        //39
                    'Colvin Range',            //40
                    'Dix Range',               //41
                    'Colvin Range',            //42
                    'Colvin Range',            //43
                    'Marcy Group',             //44
                    'Street Range',            //45
                    'Santanoni Range'          //46
                     );

 LatArray : array [1..Elements] of Double = (
                    44.112857, // 1
                    44.143624,  // 2
                    44.105796,  // 3
                    44.099543,    // 4
                    44.365795,  // 5
                    44.136881,  // 6
                    44.121392,   // 7
                    44.111683,   // 8
                    44.082417,  // 9
                    44.127528,  //10
                    44.126996,  //11
                    44.161243,  //12
                    44.082445,  //13
                    44.094817,  //14
                    44.089104,  //15
                    44.151768,  //16
                    44.126584,  //17
                    44.098438,  //18
                    44.134718,  //19
                    44.140661,  //20
                    44.069622,  //21
                    44.154363,  //22
                    44.05176,   //23
                    44.127744,   //24
                    44.071037,  //25
                    44.159861,   //26
                    44.387191,  //27
                    44.140504,  //28
                    44.182303,  //29
                    44.148407,  //30
                    44.157024,  //31
                    44.179393,  //32
                    44.1134,    //33
                    44.154118,  //34
                    44.21855,   //35
                    44.158107,  //36
                    44.212416,  //37
                    44.060073,  //38
                    44.143807,  //39
                    44.094202,  //40
                    44.06534,   //41
                    44.105941,  //42
                    44.081398,  //43
                    44.103354,  //44
                    44.187291,  //45
                    44.095561   //46
                    );

LonArray : array [1..Elements] of Double = (
                     -73.923784, // 1
                    -73.986721,  // 2
                    -73.900787,  // 3
                    -73.9312,    // 4
                    -73.903219,  // 5
                    -73.998263,  // 6
                    -73.88656,   // 7
                    -73.93537,   // 8
                    -73.786588,  // 9
                    -73.858031,  //10
                    -73.960092,  //11
                    -73.720261,  //12
                    -74.131163,  //13
                    -73.950006,  //14
                    -73.816293,  //15
                    -73.979762,  //16
                    -73.875073,  //17
                    -74.132291,  //18
                    -73.849824,  //19
                    -73.916373,  //20
                    -73.777727,  //21
                    -73.705445,  //22
                    -73.780276,   //23
                    -74.01232,   //24
                    -73.939912,  //25
                    -74.19967,   //26
                    -73.889839,  //27
                    -73.845274,  //28
                    -73.870842,  //29
                    -73.832884,  //30
                    -73.921508,  //31
                    -74.027066,  //32
                    -73.850664,  //33
                    -74.211587,  //34
                    -73.860169,   //35
                    -74.172565,  //36
                    -73.853665,  //37
                    -73.774443,  //38
                    -74.214392,  //39
                    -73.834472,  //40
                    -73.757444,  //41
                    -73.796421,  //42
                    -73.844691,  //43
                    -73.975278,  //44
                    -74.024109,  //45
                    -74.160136   //46
                    );

 LatLonArray : array [1..Elements] of String = (
                     '44.112857,-73.923784', // 1
                    '44.143624,-73.986721',  // 2
                    '44.105796,-73.900787',  // 3
                    '44.099543,-73.9312',    // 4
                    '44.365795,-73.903219',  // 5
                    '44.136881,-73.998263',  // 6
                    '44.121392,-73.88656',   // 7
                    '44.111683,-73.93537',   // 8
                    '44.082417,-73.786588',  // 9
                    '44.127528,-73.858031',  //10
                    '44.126996,-73.960092',  //11
                    '44.161243,-73.720261',  //12
                    '44.082445,-74.131163',  //13
                    '44.094817,-73.950006',  //14
                    '44.089104,-73.816293',  //15
                    '44.151768,-73.979762',  //16
                    '44.126584,-73.875073',  //17
                    '44.098438,-74.132291',  //18
                    '44.134718,-73.849824',  //19
                    '44.140661,-73.916373',  //20
                    '44.069622,-73.777727',  //21
                    '44.154363,-73.705445',  //22
                    '44.05176, 73.780276',   //23
                    '44.127744,-74.01232',   //24
                    '44.071037,-73.939912',  //25
                    '44.159861,-74.19967',   //26
                    '44.387191,-73.889839',  //27
                    '44.140504,-73.845274',  //28
                    '44.182303,-73.870842',  //29
                    '44.148407,-73.832884',  //30
                    '44.157024,-73.921508',  //31
                    '44.179393,-74.027066',  //32
                    '44.1134,-73.850664',    //33
                    '44.154118,-74.211587',  //34
                    '44.21855, -73.860169',  //35
                    '44.158107,-74.172565',  //36
                    '44.212416,-73.853665',  //37
                    '44.060073,-73.774443',  //38
                    '44.143807,-74.214392',  //39
                    '44.094202,-73.834472',  //40
                    '44.06534,-73.757444',   //41
                    '44.105941,-73.796421',  //42
                    '44.081398,-73.844691',  //43
                    '44.103354,-73.975278',  //44
                    '44.187291,-74.024109',  //45
                    '44.095561,-74.160136'   //46
                    );

 JSONStr: String;

function getCompDate(ARank: String): String;
function getNotes(ARank: String): String;
function getCompleted(ARank: String): Boolean;

function recExists(ARank: String): Boolean;
procedure AddRec(ARank, ADate, ANotes: String);
procedure RemoveRec(ARank: String);
procedure EditRec(ARank, ADate, ANotes: String);

function ReadData: String;
procedure WriteData;

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

procedure WriteData;
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

function ReadData: String;
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
