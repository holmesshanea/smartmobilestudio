uses uMain;
//{$R 'lib\js\framework7.min.js'}
//{$R 'lib\js\jquery-1.10.1.min.js'}
//{$R 'lib\js\jquery.swipebox.js'}
//{$R 'lib\js\jquery.fitvids.js'}


{$IFDEF SMART_INTERNAL_HANDLE_EXCEPTIONS}
uses SmartCL.System;
{$ENDIF}

{$IFDEF SMART_INTERNAL_AUTO_REFRESH}
uses SmartCL.AutoRefresh;
TW3AutoRefresh.Create.Start;
{$ENDIF}

var Application: TApplication;

{$IFDEF SMART_INTERNAL_HANDLE_EXCEPTIONS}
try
{$ENDIF}

  Application := TApplication.Create;
  Application.RunApp;

{$IFDEF SMART_INTERNAL_HANDLE_EXCEPTIONS}
except
  on e: Exception do
    ShowMessage(e.Message);
end;
{$ENDIF}
