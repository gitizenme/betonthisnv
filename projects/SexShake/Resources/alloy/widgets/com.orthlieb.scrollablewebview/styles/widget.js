function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.scrollablewebview/" + s : s.substring(0, index) + "/com.orthlieb.scrollablewebview/" + s.substring(index + 1);
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
}, {
    isId: true,
    priority: 100000.0009,
    key: "scrollableView",
    style: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        currentPage: 0,
        pagingControlColor: "#fff",
        backgroundColor: "white"
    }
}, {
    isId: true,
    queries: {
        formFactor: "isHandheld"
    },
    priority: 100011.001,
    key: "toolbar",
    style: {
        left: 0,
        right: 0,
        bottom: 0,
        height: "30 dp",
        backgroundColor: "transparent"
    }
}, {
    isId: true,
    queries: {
        formFactor: "isHandheld"
    },
    priority: 100011.0011,
    key: "prevButton",
    style: {
        left: 0,
        bottom: 0,
        width: "30 dp",
        height: "30 dp",
        backgroundImage: WPATH("images/arrow_left.png"),
        backgroundDisabledImage: WPATH("images/arrow_left_disabled.png"),
        enabled: false
    }
}, {
    isId: true,
    queries: {
        formFactor: "isHandheld"
    },
    priority: 100011.0012,
    key: "label",
    style: {
        font: {
            fontSize: "12 dp"
        },
        center: {
            x: "50%",
            y: "50%"
        },
        color: "#888888"
    }
}, {
    isId: true,
    queries: {
        formFactor: "isHandheld"
    },
    priority: 100011.0013,
    key: "nextButton",
    style: {
        right: 0,
        bottom: 0,
        width: "30 dp",
        height: "30 dp",
        backgroundImage: WPATH("images/arrow_right.png"),
        backgroundDisabledImage: WPATH("images/arrow_right_disabled.png"),
        enabled: false
    }
}, {
    isId: true,
    queries: {
        formFactor: "isTablet"
    },
    priority: 100011.0014,
    key: "toolbar",
    style: {
        left: 0,
        right: 0,
        bottom: 0,
        height: "60 dp",
        backgroundColor: "transparent"
    }
}, {
    isId: true,
    queries: {
        formFactor: "isTablet"
    },
    priority: 100011.0015,
    key: "prevButton",
    style: {
        left: 0,
        bottom: 0,
        width: "60 dp",
        height: "60 dp",
        backgroundImage: WPATH("images/arrow_left.png"),
        backgroundDisabledImage: WPATH("images/arrow_left_disabled.png"),
        enabled: false
    }
}, {
    isId: true,
    queries: {
        formFactor: "isTablet"
    },
    priority: 100011.0016,
    key: "label",
    style: {
        font: {
            fontSize: "24 dp"
        },
        center: {
            x: "50%",
            y: "50%"
        },
        color: "#888888"
    }
}, {
    isId: true,
    queries: {
        formFactor: "isTablet"
    },
    priority: 100011.0017,
    key: "nextButton",
    style: {
        right: 0,
        bottom: 0,
        width: "60 dp",
        height: "60 dp",
        backgroundImage: WPATH("images/arrow_right.png"),
        backgroundDisabledImage: WPATH("images/arrow_right_disabled.png"),
        enabled: false
    }
} ];