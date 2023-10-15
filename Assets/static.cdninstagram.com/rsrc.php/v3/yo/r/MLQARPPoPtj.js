; /*FB_PKG_DELIM*/

__d("HiddenSubtreeContext", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({
        backgrounded: !1,
        hidden: !1,
        hiddenOrBackgrounded: !1,
        hiddenOrBackgrounded_FIXME: !1
    });
    g["default"] = b
}), 98);
__d("HiddenSubtreePassiveContext", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({
        getCurrentState: function() {
            return {
                backgrounded: !1,
                hidden: !1,
                hiddenOrBackgrounded: !1,
                hiddenOrBackgrounded_FIXME: !1
            }
        },
        subscribeToChanges: function(a) {
            return {
                remove: function() {}
            }
        }
    });
    g["default"] = b
}), 98);
__d("getReactComponentDisplayName", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b = a.displayName;
        if (b != null) return b;
        return a.name != null ? a.name : "ReactComponent"
    }
    f["default"] = a
}), 66);
__d("getReactElementDisplayName", ["getReactComponentDisplayName", "react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    h || d("react");

    function a(a) {
        if (a == null) return "#empty";
        if (typeof a === "string" || typeof a === "number" || typeof a === "boolean") return "#text";
        a = a.type;
        if (a == null) return "ReactComponent";
        return typeof a === "string" ? a : c("getReactComponentDisplayName")(a)
    }
    g["default"] = a
}), 98);
__d("ErrorBoundary.react", ["ErrorPubSub", "ErrorSerializer", "cr:1645510", "getErrorSafe", "getReactElementDisplayName", "react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i, j = i || d("react");
    a = function(a) {
        babelHelpers.inheritsLoose(d, a);

        function d() {
            var b, c;
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            return (b = c = a.call.apply(a, [this].concat(e)) || this, c.state = {
                error: null,
                moduleName: k(c.props.children)
            }, c.suppressReactDefaultErrorLogging = !0, b) || babelHelpers.assertThisInitialized(c)
        }
        d.getDerivedStateFromError = function(a) {
            return {
                error: c("getErrorSafe")(a)
            }
        };
        var e = d.prototype;
        e.componentDidUpdate = function(a) {
            if (this.state.error && (this.props.forceResetErrorCount != null && this.props.forceResetErrorCount !== a.forceResetErrorCount)) {
                this.setState({
                    error: null
                });
                return
            }
        };
        e.componentDidCatch = function(a, b) {
            a = b.componentStack;
            b = this.props;
            var d = b.augmentError,
                e = b.context;
            e = e === void 0 ? {} : e;
            var f = b.description;
            f = f === void 0 ? "base" : f;
            b = b.onError;
            e.messageFormat == null && (e.messageFormat = "caught error in module %s (%s)", e.messageParams = [this.state.moduleName, f]);
            f = this.state;
            var g = f.error;
            f = f.moduleName;
            g != null && (c("ErrorSerializer").aggregateError(g, {
                componentStack: a,
                loggingSource: "ERROR_BOUNDARY"
            }), c("ErrorSerializer").aggregateError(g, e), typeof d === "function" && d(g), (h || (h = c("ErrorPubSub"))).reportError(g), typeof b === "function" && b(g, f))
        };
        e.render = function() {
            var a = this.state,
                c = a.error;
            a = a.moduleName;
            if (c) {
                var d = this.props.fallback;
                return d != null ? d(c, a) : null
            }
            return b("cr:1645510") != null ? j.jsxs(j.Fragment, {
                children: [j.jsx(b("cr:1645510"), {}), this.props.children]
            }) : (d = this.props.children) != null ? d : null
        };
        return d
    }(j.PureComponent);
    a.defaultProps = {
        forceResetErrorCount: 0
    };

    function k(a) {
        a = j.Children.count(a) > 1 ? j.Children.toArray(a)[0] : a;
        return c("getReactElementDisplayName")(a)
    }
    g["default"] = a
}), 98);
__d("useUnsafeRef_DEPRECATED", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = (h || d("react")).useMemo;

    function a(a) {
        return i(function() {
            return {
                current: a
            }
        }, [])
    }
    g["default"] = a
}), 98);