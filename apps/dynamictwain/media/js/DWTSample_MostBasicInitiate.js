function InitInfo() {
    var MessageBody = document.getElementById("divInfo");
    if (MessageBody) {
        var ObjString = "<div>";
        ObjString += "This is a simple demonstrator of the initiation of Dynamic Web TWAIN.<br />";
        
        ObjString += "<br />";
        ObjString += "Now you can check the JavaScript behind this page to see how this is done!<br />";
        ObjString += "<br />";
        ObjString += "<a href='SampleSource/DWTSample_MostBasicInitiate.zip' alt = 'DWTSample_MostBasicInitiate Sample'>Download Sample Source</a><br />";
        ObjString += "<br />";
        ObjString += "Any questions? <a target='blank' href='mailto:support@dynamsoft.com'>Let us know</a> !!";
        ObjString += "<br />";
        ObjString += "</div>";

        MessageBody.innerHTML = ObjString;
    }
    setTimeout(function () {
        ShowDWT();
    }, 2000);
}
function ShowDWT() {
    DWObject.style.border = "solid";
    setTimeout(function () {
        DWObject.style.border = "none";
    }, 2000);
}