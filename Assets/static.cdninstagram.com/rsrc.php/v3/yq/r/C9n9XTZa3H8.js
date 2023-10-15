; /*FB_PKG_DELIM*/

__d("isContentEditable", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        a = a;
        while (a instanceof HTMLElement) {
            if (a.contentEditable === "true" || a.contentEditable === "plaintext-only") return !0;
            a = a.parentElement
        }
        return !1
    }
    f["default"] = a
}), 66);
__d("isElementInteractive", ["isContentEditable"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = new Set(["EMBED", "INPUT", "OBJECT", "SELECT", "TEXTAREA"]),
        i = new Set(["button", "checkbox", "radio", "submit"]);

    function a(a) {
        if (!a instanceof HTMLElement) return !1;
        var b = c("isContentEditable")(a),
            d = h.has(a.nodeName);
        a = a instanceof HTMLInputElement && i.has(a.type);
        return (b || d) && !a
    }
    g["default"] = a
}), 98);
__d("warning", ["WebDriverConfig", "cr:1105154", "cr:11202", "cr:2682"], (function(a, b, c, d, e, f, g) {
    a = b("cr:2682");
    c = a;
    g["default"] = c
}), 98);
__d("getOrCreateDOMID", ["uniqueID"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        a.id || (a.id = c("uniqueID")());
        return a.id
    }
    g["default"] = a
}), 98);
__d("FocusEvent", ["Event", "Run", "ge", "getOrCreateDOMID"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {},
        i = !1;

    function j(a, b) {
        if (h[a]) {
            b = h[a].indexOf(b);
            b >= 0 && h[a].splice(b, 1);
            h[a].length === 0 && delete h[a]
        }
    }

    function k(a) {
        var b = a.getTarget();
        if (h[b.id] && h[b.id].length > 0) {
            var c = a.type === "focusin" || a.type === "focus";
            h[b.id].forEach(function(a) {
                a(c)
            })
        }
    }

    function l() {
        if (i) return;
        c("Event").listen(document.documentElement, "focusout", k);
        c("Event").listen(document.documentElement, "focusin", k);
        i = !0
    }

    function a(a, b, e) {
        l();
        var f = c("getOrCreateDOMID")(a);
        h[f] || (h[f] = []);
        h[f].push(b);
        var g = !1;

        function i() {
            g || (j(f, b), k && (k.remove(), k = null), g = !0)
        }
        var k = (e == null ? void 0 : e.runtime_site_is_comet) !== !0 ? d("Run").onLeave(function() {
            c("ge")(f) || i()
        }) : null;
        return {
            remove: function() {
                i()
            }
        }
    }
    g.listen = a
}), 98);
__d("KeyStatus", ["Event", "ExecutionEnvironment"], (function(a, b, c, d, e, f, g) {
    var h, i = null,
        j = null;

    function k() {
        j || (j = c("Event").listen(window, "blur", function() {
            i = null, l()
        }))
    }

    function l() {
        j && (j.remove(), j = null)
    }

    function a(a) {
        i = c("Event").getKeyCode(a), k()
    }

    function b() {
        i = null, l()
    }
    if ((h || c("ExecutionEnvironment")).canUseDOM) {
        f = document.documentElement;
        if (f)
            if (f.addEventListener) f.addEventListener("keydown", a, !0), f.addEventListener("keyup", b, !0);
            else if (f.attachEvent) {
            f = f.attachEvent;
            f("onkeydown", a);
            f("onkeyup", b)
        }
    }

    function d() {
        return !!i
    }

    function e() {
        return i
    }
    g.isKeyDown = d;
    g.getKeyDownCode = e
}), 98);
__d("getElementText", ["isElementNode", "isTextNode"], (function(a, b, c, d, e, f, g) {
    var h = null;

    function a(a) {
        if (c("isTextNode")(a)) return a.data;
        else if (c("isElementNode")(a)) {
            if (h === null) {
                var b = document.createElement("div");
                h = b.textContent != null ? "textContent" : "innerText"
            }
            return a[h]
        } else return ""
    }
    g["default"] = a
}), 98);
__d("isStringNullOrEmpty", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a == null || a === ""
    }
    f["default"] = a
}), 66);
__d("tooltipPropsFor", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b, c) {
        if (!a) return {};
        a = {
            "data-tooltip-content": a,
            "data-hover": "tooltip"
        };
        b && (a["data-tooltip-position"] = b);
        c && (a["data-tooltip-alignh"] = c);
        return a
    }
    f["default"] = a
}), 66);
__d("TooltipData", ["DOM", "DataStore", "FBLogger", "URI", "getElementText", "ifRequired", "isStringNullOrEmpty", "isTextNode", "killswitch", "tooltipPropsFor"], (function(a, b, c, d, e, f) {
    var g;

    function h(a) {
        var c = a.getAttribute("data-tooltip-delay");
        c = c ? parseInt(c, 10) || 1e3 : 250;
        if (b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) return babelHelpers["extends"]({
            className: a.getAttribute("data-tooltip-root-class"),
            content: a.getAttribute("data-tooltip-content"),
            delay: c,
            position: a.getAttribute("data-tooltip-position") || "above",
            alignH: a.getAttribute("data-tooltip-alignh") || "left",
            offsetY: a.getAttribute("data-tooltip-offsety") || 0,
            suppress: !1,
            overflowDisplay: a.getAttribute("data-tooltip-display") === "overflow",
            persistOnClick: a.getAttribute("data-pitloot-persistonclick"),
            textDirection: a.getAttribute("data-tooltip-text-direction")
        }, b("DataStore").get(a, "tooltip"));
        else {
            var d;
            d = (d = b("DataStore").get(a, "tooltip")) != null ? d : {};
            var e = d.content;
            d = babelHelpers.objectWithoutPropertiesLoose(d, ["content"]);
            var f = a.getAttribute("data-tooltip-content");
            !b("isStringNullOrEmpty")(e) && !b("isStringNullOrEmpty")(f) && b("FBLogger")("tooltip").warn('Getting DataStore tooltip content on an element that has both a "data-tooltip-content" attribute value (set to %s) and a value coming from the DataStore', a.getAttribute("data-tooltip-content"));
            return babelHelpers["extends"]({
                className: a.getAttribute("data-tooltip-root-class"),
                delay: c,
                position: a.getAttribute("data-tooltip-position") || "above",
                alignH: a.getAttribute("data-tooltip-alignh") || "left",
                offsetY: a.getAttribute("data-tooltip-offsety") || 0,
                suppress: !1,
                overflowDisplay: a.getAttribute("data-tooltip-display") === "overflow",
                persistOnClick: a.getAttribute("data-pitloot-persistonclick"),
                textDirection: a.getAttribute("data-tooltip-text-direction"),
                content: (a = (c = f) != null ? c : e) != null ? a : null
            }, d)
        }
    }

    function i(a, c) {
        var d = h(a);
        if (b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) b("DataStore").set(a, "tooltip", {
            content: c.content || d.content,
            position: c.position || d.position,
            alignH: c.alignH || d.alignH,
            suppress: c.suppress !== void 0 ? c.suppress : d.suppress,
            overflowDisplay: c.overflowDisplay || d.overflowDisplay,
            persistOnClick: c.persistOnClick || d.persistOnClick
        });
        else {
            !b("isStringNullOrEmpty")(c.content) && !b("isStringNullOrEmpty")(a.getAttribute("data-tooltip-content")) && b("FBLogger")("tooltip").warn('Setting DataStore tooltip content on an element that already has the "data-tooltip-content" attribute (set to %s) is invalid', a.getAttribute("data-tooltip-content"));
            b("DataStore").set(a, "tooltip", {
                content: c.content || ((a = b("DataStore").get(a, "tooltip")) != null ? a : {}).content,
                position: c.position || d.position,
                alignH: c.alignH || d.alignH,
                suppress: c.suppress !== void 0 ? c.suppress : d.suppress,
                overflowDisplay: c.overflowDisplay || d.overflowDisplay,
                persistOnClick: c.persistOnClick || d.persistOnClick
            })
        }
    }

    function j(a, b) {
        i(a, b), a.setAttribute("data-hover", "tooltip")
    }

    function k(a, b) {}
    var l = {
        remove: function(a, c) {
            c = c === void 0 ? {} : c;
            c = c.onlyCleanupDataStore;
            c = c === void 0 ? !1 : c;
            b("DataStore").remove(a, "tooltip");
            c || (a.removeAttribute("data-hover"), a.removeAttribute("data-tooltip-position"), a.removeAttribute("data-tooltip-alignh"), b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.hide()
            }))
        },
        set: function(a, c, d, e) {
            k(a, c);
            if (c instanceof(g || (g = b("URI")))) a.setAttribute("data-tooltip-uri", c), b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.fetchIfNecessary(a)
            });
            else if (b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) {
                var f = l._store({
                    context: a,
                    content: c,
                    position: d,
                    alignH: e
                });
                typeof f.content !== "string" ? a.setAttribute("data-tooltip-content", b("getElementText")(f.content)) : a.setAttribute("data-tooltip-content", f.content);
                l.refreshIfActive(a)
            } else a.removeAttribute("data-tooltip-content"), l._store({
                context: a,
                content: c,
                position: d,
                alignH: e
            }), l.refreshIfActive(a)
        },
        refreshIfActive: function(a) {
            b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.show(a)
            })
        },
        _store: function(a) {
            var c = a.context,
                d = a.content,
                e = a.position;
            a = a.alignH;
            k(c, d);
            b("isTextNode")(d) && (d = b("getElementText")(d));
            var f = !1;
            typeof d !== "string" ? d = b("DOM").create("div", {}, d) : f = d === "";
            a = {
                alignH: a,
                content: d,
                position: e,
                suppress: f
            };
            j(c, a);
            return a
        },
        propsFor: b("tooltipPropsFor"),
        enableDisplayOnOverflow: function(a) {
            a.removeAttribute("data-tooltip-display"), j(a, {
                overflowDisplay: !0
            })
        },
        enablePersistOnClick: function(a) {
            a.removeAttribute("data-pitloot-persistOnClick"), j(a, {
                persistOnClick: !0
            })
        },
        suppress: function(a, b) {
            i(a, {
                suppress: b
            })
        },
        _get: h
    };
    e.exports = l
}), null);
__d("Focus", ["cx", "CSS", "Event", "FocusEvent", "KeyStatus", "TooltipData", "ifRequired"], (function(a, b, c, d, e, f, g, h) {
    function a(a, b) {
        b === void 0 && (b = !1);
        if (a) {
            var e = c("ifRequired")("VirtualCursorStatus", function(a) {
                return a.isVirtualCursorTriggered()
            }, function() {
                return !1
            });
            b || d("KeyStatus").isKeyDown() || e ? k(a) : i(a)
        }
    }

    function i(a) {
        if (a) {
            d("CSS").addClass(a, "_5f0v");
            var b = c("Event").listen(a, "blur", function() {
                a && d("CSS").removeClass(a, "_5f0v"), b.remove()
            });
            d("TooltipData").suppress(a, !0);
            k(a);
            d("TooltipData").suppress(a, !1)
        }
    }

    function b(a, b) {
        d("CSS").addClass(a, "_5f0v");
        return d("FocusEvent").listen(a, function() {
            for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
            return j.apply(void 0, [a, b].concat(d))
        })
    }

    function j(a, b, e) {
        d("CSS").addClass(a, "_5f0v");
        a = c("ifRequired")("FocusRing", function(a) {
            return a.usingKeyboardNavigation()
        }, function() {
            return !0
        });
        e = e && a;
        d("CSS").conditionClass(b, "_3oxt", e);
        d("CSS").conditionClass(b, "_16jm", e)
    }

    function k(a) {
        try {
            a.tabIndex = a.tabIndex, a.focus()
        } catch (a) {}
    }
    g.set = a;
    g.setWithoutOutline = i;
    g.relocate = b;
    g.performRelocation = j
}), 98);
__d("KeyEventController", ["Bootloader", "DOMQuery", "Event", "Run", "emptyFunction", "getElementText", "isContentEditable", "isElementInteractive", "isEmpty"], (function(a, b, c, d, e, f, g) {
    var h, i = null,
        j = {
            BACKSPACE: [8],
            TAB: [9],
            RETURN: [13],
            ALT: [18],
            ESCAPE: [27],
            LEFT: [37, 63234],
            UP: [38, 63232],
            RIGHT: [39, 63235],
            DOWN: [40, 63233],
            NUMPAD_ADD: [43],
            NUMPAD_SUBSTRACT: [45],
            DELETE: [46],
            COMMA: [188],
            PERIOD: [190],
            SLASH: [191],
            "`": [192],
            "[": [219],
            "]": [221],
            PAGE_UP: [33],
            PAGE_DOWN: [34],
            END: [35],
            HOME: [36],
            SPACE: [32],
            KP_DOT: [46, 110],
            "-": [189],
            "=": [187],
            FORWARD_SLASH: [191]
        },
        k = (a = {}, a[8] = 1, a[9] = 1, a[13] = 1, a[27] = 1, a[32] = 1, a[37] = 1, a[63234] = 1, a[38] = 1, a[63232] = 1, a[39] = 1, a[63235] = 1, a[40] = 1, a[63233] = 1, a[46] = 1, a);
    b = function() {
        function a() {
            var a = this;
            this.handlers = {};
            ["keyup", "keydown", "keypress"].forEach(function(b) {
                return document.addEventListener(b, a.onkeyevent.bind(a, "on" + b))
            })
        }
        var b = a.prototype;
        b.mapKey = function(a) {
            a = a;
            if (/^[0-9]$/.test(a + "")) {
                typeof a !== "number" && (a = a.charCodeAt(0) - 48);
                return [48 + a, 96 + a]
            }
            a += "";
            var b = j[a.toUpperCase()];
            return b ? b : [a.toUpperCase().charCodeAt(0)]
        };
        b.onkeyevent = function(a, b) {
            var d = b;
            d = c("Event").$E(d);
            b = this.handlers[d.keyCode] || this.handlers[d.which];
            if (b)
                for (var e = 0; e < b.length; e++) {
                    var f = b[e].callback,
                        g = b[e].filter;
                    try {
                        if (!g || g(d, a)) {
                            g = function() {
                                var b = f(d, a),
                                    e = d.which || d.keyCode;
                                c("Bootloader").loadModules(["KeyEventTypedLogger"], function(a) {
                                    new a().setAction("key_shortcut").setKey(d.key || "").setKeyChar(String.fromCharCode(e)).setKeyCode(e).addToExtraData("is_trusted", d.isTrusted).log()
                                }, "KeyEventController");
                                if (b === !1) return {
                                    v: c("Event").kill(d)
                                }
                            }();
                            if (typeof g === "object") return g.v
                        }
                    } catch (a) {}
                }
            return !0
        };
        b.resetHandlers = function() {
            for (var a in this.handlers)
                if (Object.prototype.hasOwnProperty.call(this.handlers, a)) {
                    var b = this.handlers[a].filter(function(a) {
                        return a.preserve()
                    });
                    b.length ? this.handlers[a] = b : delete this.handlers[a]
                }
        };
        a.getInstance = function() {
            return i || (i = new a())
        };
        a.defaultFilter = function(b, d) {
            b = c("Event").$E(b);
            return a.filterEventTypes(b, d) && a.filterEventTargets(b, d) && a.filterEventModifiers(b, d)
        };
        a.filterEventTypes = function(a, b) {
            return b === "onkeydown" ? !0 : !1
        };
        a.filterEventTargets = function(a, b) {
            b = a.getTarget();
            return !c("isElementInteractive")(b) || a.keyCode in k && (d("DOMQuery").isNodeOfType(b, ["input", "textarea"]) && b.value.length === 0 || c("isContentEditable")(b) && c("getElementText")(b).length === 0)
        };
        a.filterEventModifiers = function(a, b) {
            return a.ctrlKey || a.altKey || a.metaKey || a.repeat ? !1 : !0
        };
        a.registerKeyAcrossTransitions = function(b, d, e, f) {
            e === void 0 && (e = a.defaultFilter);
            f === void 0 && (f = !1);
            return a.registerKey(b, d, e, f, c("emptyFunction").thatReturnsTrue)
        };
        a.registerKey = function(b, e, f, g, i) {
            f === void 0 && (f = a.defaultFilter);
            g === void 0 && (g = !1);
            i === void 0 && (i = c("emptyFunction").thatReturnsFalse);
            b = b;
            var j = a.getInstance(),
                k = b == null ? [] : j.mapKey(b);
            (h || (h = c("isEmpty")))(j.handlers) && d("Run").onLeave(j.resetHandlers.bind(j));
            var l = {};
            for (var m = 0; m < k.length; m++) {
                b = "" + k[m];
                (!j.handlers[b] || g) && (j.handlers[b] = []);
                var n = {
                    callback: e,
                    filter: f,
                    preserve: i
                };
                l[b] = n;
                j.handlers[b].push(n)
            }
            return {
                remove: function() {
                    for (var a in l) {
                        if (j.handlers[a] && j.handlers[a].length) {
                            var b = j.handlers[a].indexOf(l[a]);
                            b >= 0 && j.handlers[a].splice(b, 1)
                        }
                        delete l[a]
                    }
                }
            }
        };
        a.registerKeyForButtonCallback = function(b, c) {
            return a.registerKey(b, function() {
                c.click();
                return !1
            })
        };
        return a
    }();
    g["default"] = b
}), 98);
__d("WebPixelRatio", ["SiteData"], (function(a, b, c, d, e, f, g) {
    function a() {
        return c("SiteData").pr != null && c("SiteData").pr > 0 ? c("SiteData").pr : window.devicePixelRatio || 1
    }
    g.get = a
}), 98);
__d("joinClasses", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b = a || "",
            c = arguments.length <= 1 ? 0 : arguments.length - 1;
        for (var d = 0; d < c; d++) {
            var e = d + 1 < 1 || arguments.length <= d + 1 ? void 0 : arguments[d + 1];
            e != null && e !== "" && (b = (b ? b + " " : "") + e)
        }
        return b
    }
    f["default"] = a
}), 66);
__d("VisualCompletionConstants", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        ATTRIBUTE_NAME: "data-visualcompletion",
        HERO_TRACING_HOLD: "HeroTracing",
        HERO_LATE_PLACEHOLDER_DETECTION: "HeroLatePlaceholderDetection",
        INTERACTION_TRACING_HOLD: "InteractionTracing",
        IGNORE: "ignore",
        IGNORE_DYNAMIC: "ignore-dynamic",
        IGNORE_LATE_MUTATION: "ignore-late-mutation",
        LOADING_STATE: "loading-state",
        MEDIA_VC_IMAGE: "media-vc-image",
        CSS_IMG: "css-img"
    };
    f["default"] = a
}), 66);
__d("VisualCompletionAttributes", ["VisualCompletionConstants"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = {
        IGNORE: (a = {}, a[(h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME] = h.IGNORE, a),
        IGNORE_DYNAMIC: (b = {}, b[h.ATTRIBUTE_NAME] = h.IGNORE_DYNAMIC, b),
        IGNORE_LATE_MUTATION: (d = {}, d[h.ATTRIBUTE_NAME] = h.IGNORE_LATE_MUTATION, d),
        LOADING_STATE: (e = {}, e[h.ATTRIBUTE_NAME] = h.LOADING_STATE, e),
        MEDIA_VC_IMAGE: (f = {}, f[h.ATTRIBUTE_NAME] = h.MEDIA_VC_IMAGE, f),
        CSS_IMG: (c = {}, c[h.ATTRIBUTE_NAME] = h.CSS_IMG, c)
    };
    g["default"] = a
}), 98);
__d("ActorURIConfig", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        PARAMETER_ACTOR: "av",
        ENCRYPTED_PARAMETER_ACTOR: "eav"
    });
    f["default"] = a
}), 66);
__d("cssVar", [], (function(a, b, c, d, e, f) {
    function a(a) {
        throw new Error('cssVar("' + a + '"): Unexpected class transformation.')
    }
    f["default"] = a
}), 66);
__d("CometVisualCompletionAttributes", ["VisualCompletionAttributes"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("VisualCompletionAttributes")
}), 98);