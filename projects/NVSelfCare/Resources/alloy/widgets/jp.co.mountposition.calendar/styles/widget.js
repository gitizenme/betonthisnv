function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "jp.co.mountposition.calendar/" + s : s.substring(0, index) + "/jp.co.mountposition.calendar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0002,
    key: "View",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "container",
    style: {
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "days",
    style: {
        backgroundImage: WPATH("/images/bg.png"),
        backgroundRepeat: true,
        layout: "horizontal",
        top: 0,
        height: "22dp"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "dates",
    style: {
        layout: "vertical",
        top: "22dp",
        height: Ti.UI.FILL
    }
} ];