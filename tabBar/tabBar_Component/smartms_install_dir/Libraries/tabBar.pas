unit tabBar;

interface

uses
  System.Types, SmartCL.System, SmartCL.Components, SmartCL.Controls.Panel,
  System.Colors, SmartCL.Application, SmartCL.Controls.Label, SmartCL.Effects;

type

  TW3tabBarContent = class (TW3CustomControl);

  TTab = class(TW3CustomControl)
  private
    Tab       : Tw3Panel;
    TabIndex  : Integer;
    TabText   : TW3Label;
//    FGlyph:   TW3CustomControl;
  protected
    procedure InitializeObject; override;
	Procedure FinalizeObject; override;
  public
//    Property  Glyph:TW3CustomControl read FGlyph;	
  end;

  TPage = class(TW3CustomControl)
  protected
    procedure InitializeObject; override;
  public
    Page      : TW3Panel;
  end;

  TtabBar = class(TW3CustomControl)
   private
    FContent : TW3tabBarContent;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure Resize; override;
    procedure MyReSize(ActiveIndex : integer);
    procedure HandleEffectClick(activepage:integer);
	procedure SetTabHeight(h : Integer);
  public
    Pages     : Array of TPage;
    Tabs      : Array of TTab;
    FTabHeight : Integer;
    TabWidth  : Integer;
    ActivePageIndex : Integer;
    procedure SetActivePage(activepage : integer);
    procedure AddPage(TabText : String);
	property TabHeight : Integer read FTabHeight write SetTabHeight;
  end;

procedure Register;

implementation

{ Tab }

procedure TTab.InitializeObject;
begin
  inherited;

  Tab := TW3Panel.Create(self);
  //Tab.Container.StyleClass := 'TW3Panel2';
  //Tab.Color := $EDEDED;
  //Tab.BorderRadius := 0;
  Tab.StyleClass := 'x-tab x-tab-normal';
  //w3_setAttrib(Tab.Handle,'style','');
  
  
  TabText := TW3Label.Create(self);
  //TabText.Container.Font.Size := 14;
  TabText.Container.StyleClass := 'x-button-label';

/*  
  FGlyph:=TW3CustomControl.Create(self);
  FGlyph.setSize(16,16);
  FGlyph.handle.style['background']:='transparent';
  FGlyph.Handle.style['text-align']:='center';
*/
//  Handle.style['border-style']:='solid';
//  Handle.style['border-width']:='1px';
//  Handle.style['border-color']:='#CECECE';

//  FGlyph.handle.style['color']:='#AFAFAF';
end;

Procedure TTab.FinalizeObject;
Begin
  Tab.free;
  TabText.free;
//  FGlyph.free;  
  
  inherited;
end;

{ Page }

procedure TPage.InitializeObject;
begin
  inherited;

  Page := TW3Panel.Create(self);
  Page.BorderRadius := 0;
  //Page.StyleClass := 'b';
  
  //w3_setAttrib(Page.Handle,'style','height:48px');
  //w3_setStyle(Page.Handle,'height','48px');
end;

{ tabBar }

procedure TtabBar.InitializeObject;
begin
  inherited;
  FContent := TW3tabBarContent.Create(Self);
  w3_setAttrib(FContent.Handle,'style','');
  
  FContent.StyleClass := 'x-layout-box-inner';
  Tabs.Clear;
  Pages.Clear;
  FTabHeight := 48;
  //FTabHeight := FTabs.Height;
  TabWidth  := 100;
  ActivePageIndex := 999;
end;

procedure TtabBar.FinalizeObject;
begin

  inherited;
end;

procedure TtabBar.Resize;
begin
  inherited;

  For var i := 0 to Tabs.Count - 1  do begin
    MyReSize(i);
  end;

end;

procedure TtabBar.SetActivePage(ActivePage: Integer);
begin
  ActivePageIndex := ActivePage - 1;

  For var i := 0 to Tabs.Count - 1  do begin
    //Tabs[i].Tab.Color := $EDEDED;
    //w3_setStyle(Tabs[i].Tab.Handle,'border-bottom-style','solid');
    //Tabs[i].Tab.StyleClass := 'x-panel x-tabbar x-tabbar-dark x-docked x-docked-top';
	
	Tabs[i].Tab.StyleClass := 'a'; //'x-tab x-tab-normal';
	Tabs[i].StyleClass := 'x-tab x-tab-normal';

//	w3_setAttrib(Tabs[i].Tab.Handle,'style','');
	w3_setAttrib(Tabs[i].Handle,'style','');

	
	//Tabs[i].handle.style['visibility']:='visible';
 
  //w3_setStyle(Tabs[i].Tab.Handle,'background-image','linear-gradient(#000000,#030507 10%,#0c1118 65%,#0c121a)');

 
	//w3_setStyle(Tabs[i].Tab.Handle,'color','white');
    //w3_setStyle(Pages[i].Page.Handle,'border-top-style','solid');
  end;

  //w3_setStyle(Tabs[ActivePageIndex].Tab.Handle,'border-bottom-style','none');
  //w3_setStyle(Pages[ActivePageIndex].Page.Handle,'border-top-style','none');
  //Tabs[ActivePageIndex].Tab.Color := clWhite;

  Pages[ActivePageIndex].BringToFront;
  HandleEffectClick(ActivePageIndex);
  
	Tabs[ActivePageIndex].Tab.StyleClass := 'a'; //'x-tab x-tab-normal x-tab-active';
	Tabs[ActivePageIndex].StyleClass := 'x-tab x-tab-normal x-tab-active';

	w3_setAttrib(Tabs[ActivePageIndex].Handle,'style','');
    w3_setAttrib(Tabs[ActivePageIndex].Tab.Handle,'style','');

	  
end;

procedure TtabBar.AddPage(TabText : String);
begin
  If ActivePageIndex >= 999
    then ActivePageIndex := 0
    else ActivePageIndex := ActivePageIndex + 1;

  Tabs[ActivePageIndex]  := TTab.Create(FContent);
  Pages[ActivePageIndex] := TPage.Create(FContent);
  Tabs[ActivePageIndex].TabText.Caption := TabText;

end;

procedure TtabBar.SetTabHeight(h: Integer);
begin
  FTabHeight := h;
  Resize;
end;

procedure TtabBar.MyReSize(ActiveIndex : integer);
begin

//FContent.SetBounds(0, FTabHeight, Width, Height-FTabHeight);
//  FContent.EnumChildren(
//    lambda (child)
//      TW3MovableControl(child).SetBounds(0, 0, FContent.Width, FContent.Height);
//    end);
	
  FContent.SetBounds(0, 0, Width, FTabHeight);	
  //w3_setAttrib(FContent.Handle,'style',' ');
	
Tabs[ActiveIndex].SetBounds(0,0,95,35);
	
  //Tabs[ActiveIndex].SetBounds(0,0,width,FTabHeight);
  
  Pages[ActiveIndex].SetBounds(0,FTabHeight,width,height-FTabHeight);
  Tabs[ActiveIndex].TabIndex := ActiveIndex;

  Tabs[ActiveIndex].Tab.SetBounds((ActiveIndex*TabWidth)-(ActiveIndex*3)-1,-1,TabWidth,FTabHeight+2);
  
  Tabs[ActiveIndex].TabText.SetBounds((ActiveIndex*TabWidth)+15,trunc(FTabHeight/2)-14,TabWidth,trunc(FTabHeight/2)+7);

  Tabs[ActiveIndex].Tab.BringToFront;
  Tabs[ActiveIndex].TabText.BringToFront;
  Tabs[ActiveIndex].Tab.Onclick := procedure(Sender:TObject)
    begin
      SetActivePage(ActiveIndex+1);
    end;
  Tabs[ActiveIndex].TabText.Onclick := Tabs[ActiveIndex].Tab.Onclick;

  Pages[ActiveIndex].Page.SetBounds(-1,-2,self.width,self.height - FTabHeight);
  
end;

procedure TtabBar.HandleEffectClick(activepage:integer);
var
  FFade:  TW3FadeSlideTransition;
begin
  FFade := TW3FadeSlideTransition.Create;
  try
    FFade.Duration := 0.2;
    FFade.FromOpacity := 0;
    FFade.ToOpacity := 255;
    FFade.Execute(Pages[ActivePageIndex]);
  except
    on e: Exception do ShowMessage(e.Message);
  end;
end;

procedure Register;
begin
//   might not be needed / replaced by IDE dialog
//  RegisterComponentsProcHandler('Samples', [TtabBar]);
end;

end.

