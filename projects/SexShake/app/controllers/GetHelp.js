function sendMailComplete(e) {
    if (e.success) {
        alert("Message sent!");
    }
    else {
        alert("Unable to send message, please try again later.");
    }
}

var emailDialog = Ti.UI.createEmailDialog();
if (emailDialog.isSupported()) {
    emailDialog.subject = "Bet On This NV: Get Help";
    emailDialog.toRecipients = ['info@izen.me'];
    emailDialog.html = false;
    emailDialog.messageBody = "<ul><li>Your Name:</li><li>Phone number:</li><li>Message:</li></ul>";
    emailDialog.addEventListener('comnplete', emailSendComplete);
}
else {
	alert("E-mail not available. Please create an e-mail account on your mobile device.");
}

$.GetHelp.open();

