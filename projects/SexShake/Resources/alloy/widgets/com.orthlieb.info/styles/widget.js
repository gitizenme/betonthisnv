function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.info/" + s : s.substring(0, index) + "/com.orthlieb.info/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
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
        borderRadius: "7 dp",
        borderColor: "black",
        backgroundColor: "darkgray",
        top: "5 dp",
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