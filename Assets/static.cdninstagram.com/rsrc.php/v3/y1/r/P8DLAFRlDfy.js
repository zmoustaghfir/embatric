; /*FB_PKG_DELIM*/

__d("EventListenerImplForBlue", ["Event", "TimeSlice", "emptyFunction", "setImmediateAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    function h(a, b, d, e) {
        var f = c("TimeSlice").guard(d, "EventListener capture " + b);
        if (a.addEventListener) {
            a.addEventListener(b, f, e);
            return {
                remove: function() {
                    a.removeEventListener(b, f, e)
                }
            }
        } else return {
            remove: c("emptyFunction")
        }
    }
    a = {
        listen: function(a, b, d) {
            return c("Event").listen(a, b, d)
        },
        capture: function(a, b, c) {
            return h(a, b, c, !0)
        },
        captureWithPassiveFlag: function(a, b, c, d) {
            return h(a, b, c, {
                passive: d,
                capture: !0
            })
        },
        bubbleWithPassiveFlag: function(a, b, c, d) {
            return h(a, b, c, {
                passive: d,
                capture: !1
            })
        },
        registerDefault: function(a, b) {
            var d, e = c("Event").listen(document.documentElement, a, f, c("Event").Priority._BUBBLE);

            function f() {
                g(), d = c("Event").listen(document, a, b), c("setImmediateAcrossTransitions")(g)
            }

            function g() {
                d && d.remove(), d = null
            }
            return {
                remove: function() {
                    g(), e && e.remove(), e = null
                }
            }
        },
        suppress: function(a) {
            c("Event").kill(a)
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("BasicVector", [], (function(a, b, c, d, e, f) {
    a = function() {
        function a(a, b) {
            this.x = a, this.y = b
        }
        var b = a.prototype;
        b.derive = function(b, c) {
            return new a(b, c)
        };
        b.toString = function() {
            return "(" + this.x + ", " + this.y + ")"
        };
        b.add = function(a, b) {
            b === void 0 && (b = a.y, a = a.x);
            a = parseFloat(a);
            b = parseFloat(b);
            return this.derive(this.x + a, this.y + b)
        };
        b.mul = function(a, b) {
            b === void 0 && (b = a);
            return this.derive(this.x * a, this.y * b)
        };
        b.div = function(a, b) {
            b === void 0 && (b = a);
            return this.derive(this.x * 1 / a, this.y * 1 / b)
        };
        b.sub = function(a, b) {
            if (arguments.length === 1) return this.add(a.mul(-1));
            else return this.add(-a, -b)
        };
        b.distanceTo = function(a) {
            return this.sub(a).magnitude()
        };
        b.magnitude = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        };
        b.rotate = function(a) {
            return this.derive(this.x * Math.cos(a) - this.y * Math.sin(a), this.x * Math.sin(a) + this.y * Math.cos(a))
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("getUnboundedScrollPosition", ["Scroll"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a === window) {
            var c;
            return {
                x: (c = window.pageXOffset) != null ? c : b("Scroll").getLeft(document.documentElement),
                y: (c = window.pageYOffset) != null ? c : b("Scroll").getTop(document.documentElement)
            }
        }
        return {
            x: b("Scroll").getLeft(a),
            y: b("Scroll").getTop(a)
        }
    }
    e.exports = a
}), null);
__d("getViewportDimensions", ["UserAgent"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = function() {
        var a = null;
        return function() {
            var b = document.body;
            if (b == null) return null;
            (a == null || !b.contains(a)) && (a = document.createElement("div"), a.style.left = Number.MAX_SAFE_INTEGER + "px", a.style.width = "100%", a.style.height = "100%", a.style.position = "fixed", b.appendChild(a));
            return a
        }
    }();

    function i() {
        var a;
        document.documentElement && (a = document.documentElement.clientWidth);
        a == null && document.body && (a = document.body.clientWidth);
        return a || 0
    }

    function j() {
        var a;
        document.documentElement && (a = document.documentElement.clientHeight);
        a == null && document.body && (a = document.body.clientHeight);
        return a || 0
    }

    function k() {
        return {
            width: window.innerWidth || i(),
            height: window.innerHeight || j()
        }
    }
    k.withoutScrollbars = function() {
        return c("UserAgent").isPlatform("Android") ? k() : {
            width: i(),
            height: j()
        }
    };
    k.layout = function() {
        var a, b = h();
        return {
            width: (a = b == null ? void 0 : b.clientWidth) != null ? a : i(),
            height: (a = b == null ? void 0 : b.clientHeight) != null ? a : j()
        }
    };
    g["default"] = k
}), 98);
__d("DOMVector", ["BasicVector", "getDocumentScrollElement", "getElementPosition", "getUnboundedScrollPosition", "getViewportDimensions"], (function(a, b, c, d, e, f, g) {
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b, c, d) {
            b = a.call(this, b, c) || this;
            b.domain = d || "pure";
            return b
        }
        var d = b.prototype;
        d.derive = function(a, c, d) {
            return new b(a, c, d || this.domain)
        };
        d.add = function(c, d) {
            c instanceof b && c.getDomain() !== "pure" && (c = c.convertTo(this.domain));
            return a.prototype.add.call(this, c, d)
        };
        d.convertTo = function(a) {
            if (a != "pure" && a != "viewport" && a != "document") return this.derive(0, 0);
            if (a == this.domain) return this.derive(this.x, this.y, this.domain);
            if (a == "pure") return this.derive(this.x, this.y);
            if (this.domain == "pure") return this.derive(0, 0);
            var c = b.getScrollPosition("document"),
                d = this.x,
                e = this.y;
            this.domain == "document" ? (d -= c.x, e -= c.y) : (d += c.x, e += c.y);
            return this.derive(d, e, a)
        };
        d.getDomain = function() {
            return this.domain
        };
        b.from = function(a, c, d) {
            return new b(a, c, d)
        };
        b.getScrollPosition = function(a) {
            a = a || "document";
            var b = c("getUnboundedScrollPosition")(window);
            return this.from(b.x, b.y, "document").convertTo(a)
        };
        b.getElementPosition = function(a, b) {
            b = b || "document";
            a = c("getElementPosition")(a);
            return this.from(a.x, a.y, "viewport").convertTo(b)
        };
        b.getElementDimensions = function(a) {
            return this.from(a.offsetWidth || 0, a.offsetHeight || 0)
        };
        b.getViewportDimensions = function() {
            var a = c("getViewportDimensions")();
            return this.from(a.width, a.height, "viewport")
        };
        b.getLayoutViewportDimensions = function() {
            var a = c("getViewportDimensions").layout();
            return this.from(a.width, a.height, "viewport")
        };
        b.getViewportWithoutScrollbarDimensions = function() {
            var a = c("getViewportDimensions").withoutScrollbars();
            return this.from(a.width, a.height, "viewport")
        };
        b.getDocumentDimensions = function(a) {
            a = c("getDocumentScrollElement")(a);
            return this.from(a.scrollWidth, a.scrollHeight, "document")
        };
        return b
    }(c("BasicVector"));
    g["default"] = a
}), 98);
__d("Vector", ["DOMVector", "Event", "Scroll"], (function(a, b, c, d, e, f, g) {
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b, c, d) {
            return a.call(this, parseFloat(b), parseFloat(c), d) || this
        }
        var e = b.prototype;
        e.derive = function(a, c, d) {
            return new b(a, c, d || this.domain)
        };
        e.setElementPosition = function(a) {
            var b = this.convertTo("document");
            a.style.left = parseInt(b.x, 10) + "px";
            a.style.top = parseInt(b.y, 10) + "px";
            return this
        };
        e.setElementDimensions = function(a) {
            return this.setElementWidth(a).setElementHeight(a)
        };
        e.setElementWidth = function(a) {
            a.style.width = parseInt(this.x, 10) + "px";
            return this
        };
        e.setElementHeight = function(a) {
            a.style.height = parseInt(this.y, 10) + "px";
            return this
        };
        e.scrollElementBy = function(a) {
            if (a == document.body) window.scrollBy(this.x, this.y);
            else {
                var b;
                (b = d("Scroll")).setLeft(a, b.getLeft(a) + this.x);
                b.setTop(a, b.getTop(a) + this.y)
            }
            return this
        };
        b.from = function(a, c, d) {
            return new b(a, c, d)
        };
        b.getEventPosition = function(a, b) {
            b === void 0 && (b = "document");
            a = c("Event").getPosition(a);
            a = this.from(a.x, a.y, "document");
            return a.convertTo(b)
        };
        b.getTouchEventPosition = function(a, b) {
            b === void 0 && (b = "document");
            a = a.touches[0];
            a = this.from(a.pageX, a.pageY, "document");
            return a.convertTo(b)
        };
        b.deserialize = function(a) {
            a = a.split(",");
            return this.from(a[0], a[1])
        };
        return b
    }(c("DOMVector"));
    g["default"] = a
}), 98);
__d("uuidv4", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a() {
        var a;
        a = (a = self) == null ? void 0 : (a = a.crypto) == null ? void 0 : a.randomUUID;
        return typeof a === "function" ? self.crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = Math.random() * 16 | 0;
            a = a === "x" ? b : b & 3 | 8;
            return a.toString(16)
        })
    }
    f["default"] = a
}), 66);