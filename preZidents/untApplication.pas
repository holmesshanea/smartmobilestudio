unit untApplication;

interface

uses
  Pseudo.CreateForms, // auto-generated unit that creates forms during startup
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Forms, 
  SmartCL.Application, Splash, Navigation;

type
  TApplication  = class(TW3CustomApplication)
  private
   fSplash: TfrmSplash;
   fNavigation: TfrmNavigation;
  public
   procedure ApplicationStarting; override;
  end;

implementation

procedure TApplication.ApplicationStarting;
begin

 fNavigation:= TfrmNavigation.Create(Display.View);
 fNavigation.Name:= 'Navigation';
 RegisterFormInstance(fNavigation, False);

 fSplash:= TfrmSplash.Create(Display.View);
 fSplash.Name:= 'Splash';
 RegisterFormInstance(fSplash, True);

 inherited;
end;


end.
