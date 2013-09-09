function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "me.izen.Reels/" + s : s.substring(0, index) + "/me.izen.Reels/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0019,
    key: "Label",
    style: {
        color: "#000",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "getHelpView",
    style: {
        width: "100%",
        height: "auto",
        backgroundColor: "darkgrey"
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "infoButtonView",
    style: {
        borderRadius: "7dp",
        borderColor: "black",
        backgroundColor: "darkgray",
        top: "5dp",
        height: "30%",
        width: "auto"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "infoButton",
    style: {
        width: "200dp"
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "infoWidget",
    style: {
        icon: "images/airplane.png",
        text: "BetOnThisNV"
    }
}, {
    isId: true,
    priority: 100000.0001,
    key: "shakeItTab",
    style: {
        icon: "images/airplane.png"
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "infoTab",
    style: {
        icon: "images/airplane.png"
    }
} ];