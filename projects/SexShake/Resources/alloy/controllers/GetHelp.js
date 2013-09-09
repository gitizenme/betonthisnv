function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "GetHelp";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.GetHelp = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#fff",
        title: "Get Help",
        id: "GetHelp"
    });
    $.__views.GetHelp && $.addTopLevelView($.__views.GetHelp);
    $.__views.emailDialog = Ti.UI.createEmailDialog({
        id: "emailDialog"
    });
    $.__views.GetHelp.add($.__views.emailDialog);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var emailDialog = Ti.UI.createEmailDialog();
    if (emailDialog.isSupported()) {
        emailDialog.subject = "Bet On This NV: Get Help";
        emailDialog.toRecipients = [ "info@izen.me" ];
        emailDialog.html = false;
        emailDialog.messageBody = "<ul><li>Your Name:</li><li>Phone number:</li><li>Message:</li></ul>";
        emailDialog.addEventListener("comnplete", emailSendComplete);
    } else alert("E-mail not available. Please create an e-mail account on your mobile device.");
    $.GetHelp.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;