//--------------------------------------------------------------------------------------
//************************** Don't change these properties *****************************
//--------------------------------------------------------------------------------------
var DWObject;            // The DWT Object
var DW_InIE;               // If it is in IE
var DW_InWindows;          // If it is in Windows OS
var DW_InWindowsX86;       // If it is in X86 platform
var DW_Seed;               // The seed used to detect the control.
var DW_Timeout;            // Used for the timer.

//--------------------------------------------------------------------------------------
//****************** Default value provided. User can change it accordingly ************
//--------------------------------------------------------------------------------------

var DW_ProductName = "Dynamic Web TWAIN";
var DW_ObjectName = "DynamicWebTWAINObject";
var DW_IsTrial = true;     // Whether it is using the trial version. User can change it.
var DW_VersionCode = "9,0"; // The version of DWT. ActiveX will use this to determin if it is necessary to upgrade the client. Use ',' to separate the numbers. 
var DW_Version = "9.0";
var DW_Width = 580;        // The width of the main control. User can change it.
var DW_Height = 600;       // The width of the main control. User can change it.
//var DW_LPKPath = "Resources/DynamicWebTwain.lpk";     // The relative path of the LPK file. User can change it. Only Useful in version 8.* or earlier
var DW_PKGPath = "Resources/DynamicWebTWAINMacEditionTrial.pkg";     //The relative path of the PKG file. User need to change it.
var DW_MSIPath = "Resources/DynamicWebTWAINPlugIn.msi";         //The relative path of the MSI file. User need to change it.
var DW_CABX86Path = "Resources/DynamicWebTWAIN.cab";         //The relative path of the x86 cab file. User need to change it.
var DW_CABX64Path = "Resources/DynamicWebTWAINx64.cab";      //The relative path of the x64 cab file. User need to change it.
var DW_MIMETYPE = "Application/DynamicWebTwain-Plugin";
var DW_PROCLASSID = "5220cb21-c88d-11cf-b347-00aa00a28331";  //Only Useful in version 8.* or earlier
var DW_FULLCLASSID = "E7DA7F8D-27AB-4EE9-8FC0-3FEC9ECFE758";
var DW_TRAILCLASSID = "FFC6F181-A5CF-4ec4-A441-093D7134FBF2";

var DW_ProductNameAbbreviated = "DWT";

//Upload
var DW_ServerName = location.hostname; //Demo: "www.dynamsoft.com";
var DW_strPort = location.port == "" ? 80 : location.port; //Demo: 80;

var vShowNoControl;
//--------------------------------------------------------------------------------------
//****************** User must specify it before using DWT *****************************
//--------------------------------------------------------------------------------------
var DW_DWTContainerID = "DWTContainerID"; // The ID of the container (Usually a DIV) which is used to contain DWT object. User must specify it.
var DW_DWTNonInstallContainerID = "DWTNonInstallContainerID" // The ID of the container (Usually a DIV) which is used to show a message if DWT is not installed. User must specify it.

//--------------------------------------------------------------------------------------
//************************* The Actual Initialization **********************************
//--------------------------------------------------------------------------------------
window.onload = DW_Pageonload;
function DW_PageonloadInner() {//Detect Environment
    // Get User Agent Value
    ua = (navigator.userAgent.toLowerCase());

    // Set the Explorer Type
    if (ua.indexOf("msie") != -1)
        DW_InIE = true;
    else
        DW_InIE = false;

    // Set the Operating System Type
    if (ua.indexOf("macintosh") != -1)
        DW_InWindows = false;
    else
        DW_InWindows = true;

    // Set the x86 and x64 type
    if (ua.indexOf("win64") != -1 && ua.indexOf("x64") != -1)
        DW_InWindowsX86 = false;
    else
        DW_InWindowsX86 = true;
}

function DW_CreateControl() {
    var objString = "";
    var DWTContainer;

    // For IE, render the ActiveX Object
    if (DW_InIE) {
        /*Only useful in version 8.* or earlier
        ///////////////////////////////////////
        objString = "<object classid='clsid:" + DW_PROCLASSID + "' style='display:none;'><param name='LPKPath' value='" + DW_LPKPath + "'/></object>";
        ///////////////////////////////////////
        */
        objString += "<object id='" + DW_ObjectName + "' style='width:" + DW_Width + "px;height:" + DW_Height + "px'";

        if (DW_InWindowsX86)
            objString += "codebase='" + DW_CABX86Path + "#version=" + DW_VersionCode + "' ";
        else
            objString += "codebase='" + DW_CABX64Path + "#version=" + DW_VersionCode + "' ";

        var temp = DW_IsTrial ? DW_TRAILCLASSID : DW_FULLCLASSID;
        objString += " classid='clsid:" + temp + "' viewastext>";
        objString += " <param name='Manufacturer' value='DynamSoft Corporation' />";
        objString += " <param name='ProductFamily' value='" + DW_ProductName + "' />";
        objString += " <param name='ProductName' value='" + DW_ProductName + "' />";
        //objString += " <param name='wmode' value='transparent'/>  ";
        objString += " </object>";
    }
    // For non-IE, render the embed object
    else {
        objString = " <embed id='" + DW_ObjectName + "'style='display: inline; width:" + DW_Width + "px;height:" + DW_Height + "px' id='" + DW_ObjectName + "' type='" + DW_MIMETYPE + "'";
        objString += " OnPostTransfer='Dynamsoft_OnPostTransfer' OnPostAllTransfers='Dynamsoft_OnPostAllTransfers'";
        objString += " OnMouseClick='Dynamsoft_OnMouseClick'  OnPostLoad='Dynamsoft_OnPostLoadfunction'";
        objString += " OnImageAreaSelected = 'Dynamsoft_OnImageAreaSelected'";
        objString += " OnImageAreaDeSelected = 'Dynamsoft_OnImageAreaDeselected'";
        objString += " OnMouseDoubleClick = 'Dynamsoft_OnMouseDoubleClick'";
        objString += " OnMouseRightClick = 'Dynamsoft_OnMouseRightClick'";
        objString += " OnTopImageInTheViewChanged = 'Dynamsoft_OnTopImageInTheViewChanged'";
        objString += " OnGetFilePath='Dynamsoft_OnGetFilePath'";
        if (DW_InWindows)
            objString += " pluginspage='" + DW_MSIPath + "'></embed>";
        else
            objString += " pluginspage='" + DW_PKGPath + "'></embed>";
    }

    DWTContainer = document.getElementById(DW_DWTContainerID);
    DWTContainer.innerHTML = objString;
    DWObject = document.getElementById(DW_ObjectName);
}

function DW_Pageonload() {
    DW_PageonloadInner();  //Detect environment
    if (document.getElementById("IfInitInfo").value != 0) {
        InitInfo();            //Add guide info
    }
    DW_CreateControl(); //Create an instance of the component in the DIV assigned by DW_DWTContainerID

    vShowNoControl = false; //By default, we assume the control is not loaded
    //Set interval to check if the control is fully loaded.
    DW_Seed = setInterval(DW_ControlDetect, 500);
}

// Check if the control is fully loaded.

function DW_ControlDetect() {
    // If the ErrorCode is 0, it means everything is fine for the control. It is fully loaded.
    if (DWObject.ErrorCode == 0) {
        /*Only useful in version 9.0 or later*/
        /////////////////////////////////////// Please put your product key below
        DWObject.ProductKey = "70F4CADED309A9DB4F69EEC76614A9BC269804BC2979452DC0AB8916A19CC65D269804BC2979452D7C60AB1E15A985D6269804BC2979452DAD45077DB702740F30000000";
        ///////////////////////////////////////
        
        DW_Pause();
        // For IE, attach events
        if (DW_InIE) {
            DWObject.attachEvent('OnPostTransfer', Dynamsoft_OnPostTransfer);
            DWObject.attachEvent('OnPostAllTransfers', Dynamsoft_OnPostAllTransfers);
            DWObject.attachEvent('OnMouseClick', Dynamsoft_OnMouseClick);
            DWObject.attachEvent('OnPostLoad', Dynamsoft_OnPostLoadfunction);
            DWObject.attachEvent('OnImageAreaSelected', Dynamsoft_OnImageAreaSelected);
            DWObject.attachEvent('OnMouseDoubleClick', Dynamsoft_OnMouseDoubleClick);
            DWObject.attachEvent('OnMouseRightClick', Dynamsoft_OnMouseRightClick);
            DWObject.attachEvent('OnTopImageInTheViewChanged', Dynamsoft_OnTopImageInTheViewChanged);
            DWObject.attachEvent('OnImageAreaDeSelected', Dynamsoft_OnImageAreaDeselected);
            DWObject.attachEvent('OnGetFilePath', Dynamsoft_OnGetFilePath);
        }
    }
    else {
        if (vShowNoControl == false) {
            DW_NoControl();
            vShowNoControl = true;
        }
    }
    DW_Timeout = setTimeout(function () { }, 10);
}
function DW_Pause() {
    clearInterval(DW_Seed);
}

function DW_NoControl() {
    // Display the message and hide the main control
    DW_CreateNonInstallDivPlugin();
    document.getElementById(DW_DWTNonInstallContainerID).style.display = "inline";
    document.getElementById(DW_DWTContainerID).style.display = "none";
}
function DW_CreateNonInstallDivPlugin() {

    var varHref = "";
    if (DW_InIE) {
        var ObjString = "<div style='display: block; border:solid black 1px; text-align:center; width:" + DW_Width + "px;height:" + DW_Height + "px'>";
        ObjString += "<ul style='padding-top:100px;'>";
        ObjString += "<li>The Component is not installed</li>";
        ObjString += "<li>You need to download and install the ActiveX to use this sample.</li>";
        ObjString += "<li>Please follow the instructions in the information bar.</li>";
        ObjString += "</ul></div>";
    }
    else {
        if (DW_InWindows) {
            if (location.hostname != "")
                varHref = "http://" + location.host + location.pathname.substring(0, location.pathname.lastIndexOf('/')) + "/" + DW_MSIPath;
            else
                varHref = DW_MSIPath;
        }
        else {
            if (location.hostname != "")
                varHref = "http://" + location.host + location.pathname.substring(0, location.pathname.lastIndexOf('/')) + "/" + DW_PKGPath;
            else
                varHref = DW_PKGPath;
        }
        var ObjString = "<div style='display: block; border:solid black 1px; text-align:center; width:" + DW_Width + "px;height:" + DW_Height + "px'>";
        ObjString += "<ul style='padding-top:100px;'>";
        ObjString += "<li>The Component is not installed</li>";
        ObjString += "<li>You need to download and install the plug-in to use this sample.</li>";
        ObjString += "<li>Please click the below link to download it.</li>";
        ObjString += "<li>After the installation, please RESTART your browser.</li>";
        ObjString += "<li><a href='" + varHref + "'>Download</a></li>";
        ObjString += "</ul></div>";
    }
    document.getElementById(DW_DWTNonInstallContainerID).innerHTML = ObjString;
}
