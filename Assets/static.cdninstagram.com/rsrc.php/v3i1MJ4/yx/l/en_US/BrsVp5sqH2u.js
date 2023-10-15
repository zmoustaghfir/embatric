; /*FB_PKG_DELIM*/

__d("CometErrorCodeExtraHandlers", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = [];

    function a(a) {
        g.push(a)
    }

    function b(a) {
        a = g.indexOf(a);
        a > -1 && g.splice(a, 1)
    }

    function c(a) {
        try {
            g.forEach(function(b) {
                return b(a)
            })
        } catch (a) {}
    }
    f.addHandler = a;
    f.removeHandler = b;
    f.executeHandlers = c
}), 66);
__d("CometAsyncFetchResponse", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = function() {
        function a(a, b) {
            this.$1 = a, this.$2 = this.$3(b)
        }
        var b = a.prototype;
        b.getFullResponsePayload = function() {
            return this.$1
        };
        b.getResponsePayload = function() {
            var a;
            return (a = this.$1) == null ? void 0 : a.payload
        };
        b.getResponseHeader = function(a) {
            var b;
            return (b = this.$2) == null ? void 0 : b.get(a.toLowerCase())
        };
        b.getAllResponseHeadersMap = function() {
            return new Map(this.$2)
        };
        b.$3 = function(a) {
            if (a == null || a.length === 0) return null;
            var b = new Map();
            a = a.split("\r\n");
            for (var a = a, c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e;
                if (c) {
                    if (d >= a.length) break;
                    e = a[d++]
                } else {
                    d = a.next();
                    if (d.done) break;
                    e = d.value
                }
                e = e;
                var f = e.indexOf(": ");
                if (f <= 0) continue;
                var g = e.substring(0, f).toLowerCase();
                e = e.substring(f + 2);
                f = b.get(g);
                f = f != null ? f + ", " + e : e;
                b.set(g, f)
            }
            return b
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("BaseHeadingContext", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext(1);
    g["default"] = b
}), 98);
__d("BaseTextContext", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = h || (h = d("react"));
    c = h;
    var j = c.useContext,
        k = c.useMemo,
        l = i.createContext(null);

    function a(a) {
        var b = a.children,
            c = a.nested;
        a = k(function() {
            return {
                nested: c
            }
        }, [c]);
        return i.jsx(l.Provider, {
            value: a,
            children: b
        })
    }
    a.displayName = a.name + " [from " + f.id + "]";

    function b() {
        return j(l)
    }
    g.BaseTextContextProvider = a;
    g.useBaseTextContext = b
}), 98);
__d("CSSUserAgentSupports", ["UserAgent"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        webkitLineClamp: function() {
            return !(c("UserAgent").isBrowser("IE") || c("UserAgent").isBrowser("Edge < 17") || c("UserAgent").isBrowser("Firefox < 68"))
        }
    };
    b = a;
    g["default"] = b
}), 98);
/**
 * License: https://www.facebook.com/legal/license/2v2plzJQoTQ/
 */
__d("IntersectionObserverFallback", ["FBLogger", "TimeSlice", "containsNode", "getElementRect", "performanceNow", "setInterval", "throttle"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = document.documentElement,
        i = [];

    function j(a, b) {
        var c = Math.max(a.top, b.top),
            d = Math.min(a.bottom, b.bottom),
            e = Math.max(a.left, b.left);
        a = Math.min(a.right, b.right);
        b = a - e;
        var f = d - c;
        return b >= 0 && f >= 0 ? {
            top: c,
            bottom: d,
            left: e,
            right: a,
            width: b,
            height: f
        } : void 0
    }

    function k() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }
    }
    var l = function(a) {
        this.time = a.time;
        this.target = a.target;
        this.rootBounds = a.rootBounds;
        this.boundingClientRect = a.boundingClientRect;
        this.intersectionRect = a.intersectionRect || k();
        this.isIntersecting = !!a.intersectionRect;
        a = this.boundingClientRect;
        a = a.width * a.height;
        var b = this.intersectionRect.width * this.intersectionRect.height;
        a ? this.intersectionRatio = Number((b / a).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0
    };
    a = function() {
        function a(a, c) {
            var d = this;
            this.THROTTLE_TIMEOUT = 100;
            this.POLL_INTERVAL = null;
            this.$12 = b("TimeSlice").guard(b("throttle")(function() {
                var a = d.$14(),
                    c = a ? d.$15() : k();
                d.$6.forEach(function(e) {
                    var f = e.element,
                        h = b("getElementRect")(f),
                        i = d.$16(f),
                        j = e.entry,
                        k = a && i && !d.$2 && d.$17(f, c);
                    e.entry = new l({
                        intersectionRect: k,
                        target: f,
                        time: (g || (g = b("performanceNow")))(),
                        boundingClientRect: h,
                        rootBounds: c
                    });
                    k = e.entry;
                    !j ? d.$7.push(k) : a && i ? d.$18(j, k) && d.$7.push(k) : j && j.isIntersecting && d.$7.push(k)
                });
                d.$7.length && d.$1(d.takeRecords(), d)
            }, this.THROTTLE_TIMEOUT), "IntersectionObserverFallback: checkForIntersections");
            this.$2 = !1;
            try {} catch (a) {
                this.$2 = !0
            }
            c = (c = c) != null ? c : {};
            this.$1 = a;
            this.$4 = !1;
            this.$6 = [];
            this.$7 = [];
            this.$8 = this.$9(c.rootMargin);
            this.thresholds = this.$10(c.threshold);
            this.root = (a = c.root) != null ? a : null;
            this.rootMargin = this.$8.map(function(a) {
                return a.value + a.unit
            }).join(" ")
        }
        var c = a.prototype;
        c.$10 = function(a) {
            a = (a = a) != null ? a : [0];
            Array.isArray(a) || (a = [a]);
            return a.sort().filter(function(a, b, c) {
                return a !== c[b - 1]
            })
        };
        c.$9 = function(a) {
            a = a || "0px";
            a = a.split(/\s+/).map(function(a) {
                a = /^(-?\d*\.?\d+)(px|%)$/.exec(a);
                return {
                    value: parseFloat(a[1]),
                    unit: a[2]
                }
            });
            a[1] = a[1] || a[0];
            a[2] = a[2] || a[0];
            a[3] = a[3] || a[1];
            return a
        };
        c.$11 = function() {
            this.$4 || (this.$4 = !0, this.$12(), this.POLL_INTERVAL ? this.$5 = b("setInterval")(this.$12, this.POLL_INTERVAL) : (window.addEventListener("resize", this.$12, !0), document.addEventListener("scroll", this.$12, !0), "MutationObserver" in window && (this.$3 = new MutationObserver(this.$12), this.$3.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            }))))
        };
        c.$13 = function() {
            this.$4 && (this.$4 = !1, this.$5 && (clearInterval(this.$5), this.$5 = void 0), window.removeEventListener("resize", this.$12, !0), document.removeEventListener("scroll", this.$12, !0), this.$3 && (this.$3.disconnect(), this.$3 = void 0))
        };
        c.$17 = function(a, c) {
            var d = window.getComputedStyle(a);
            if (!d || d.display == "none") return void 0;
            d = b("getElementRect")(a);
            d = d;
            a = a.parentElement;
            var e = !1;
            while (!e) {
                var f, g = null;
                f = ((f = a) == null ? void 0 : f.nodeType) == 1 ? window.getComputedStyle(a) : {};
                if (f.display == "none") return void 0;
                a == this.root || a == document ? (e = !0, g = c) : a != document.body && a != document.documentElement && f.overflow != "visible" && (g = b("getElementRect")(a));
                if (g) {
                    d = j(g, d);
                    if (!d) break
                }
                a = a && a.parentElement
            }
            return d
        };
        c.$15 = function() {
            var a;
            if (this.root) a = b("getElementRect")(this.root);
            else {
                var c = document.documentElement,
                    d = document.body,
                    e = (c == null ? void 0 : c.clientWidth) || (d == null ? void 0 : d.clientWidth);
                c = (c == null ? void 0 : c.clientHeight) || (d == null ? void 0 : d.clientHeight);
                a = {
                    top: 0,
                    left: 0,
                    right: e,
                    width: e,
                    bottom: c,
                    height: c
                }
            }
            return this.$19(a)
        };
        c.$19 = function(a) {
            var b = this.$8.map(function(b, c) {
                return b.unit == "px" ? b.value : b.value * (c % 2 ? a.width : a.height) / 100
            });
            b = {
                top: a.top - b[0],
                right: a.right + b[1],
                bottom: a.bottom + b[2],
                left: a.left - b[3],
                width: 0,
                height: 0
            };
            b.width = b.right - b.left;
            b.height = b.bottom - b.top;
            return b
        };
        c.$18 = function(a, b) {
            a = a && a.isIntersecting ? a.intersectionRatio || 0 : -1;
            b = b.isIntersecting ? b.intersectionRatio || 0 : -1;
            if (a === b) return !1;
            for (var c = 0; c < this.thresholds.length; c++) {
                var d = this.thresholds[c];
                if (d == a || d == b || d < a !== d < b) return !0
            }
            return !1
        };
        c.$14 = function() {
            return !this.root || b("containsNode")(h, this.root)
        };
        c.$16 = function(a) {
            var c = this.root || h;
            return b("containsNode")(c, a)
        };
        c.$20 = function() {
            i.indexOf(this) < 0 && i.push(this)
        };
        c.$21 = function() {
            var a = i.indexOf(this);
            a != -1 && i.splice(a, 1)
        };
        c.observe = function(a) {
            if (!a) {
                b("FBLogger")("io").warn("IntersectionObserverFallback target does not exist");
                return
            }
            if (this.$6.some(function(b) {
                    return b.element == a
                })) return;
            this.$20();
            this.$6.push({
                element: a,
                entry: null
            });
            this.$11();
            this.$12()
        };
        c.unobserve = function(a) {
            this.$6 = this.$6.filter(function(b) {
                return b.element != a
            }), this.$6.length || (this.$13(), this.$21())
        };
        c.disconnect = function() {
            this.$6 = [], this.$13(), this.$21()
        };
        c.takeRecords = function() {
            var a = this.$7.slice();
            this.$7 = [];
            return a
        };
        return a
    }();
    e.exports = a
}), null);
__d("IntersectionObserver", ["IntersectionObserverFallback"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;
    b = a ? window.IntersectionObserver : c("IntersectionObserverFallback");
    g["default"] = b
}), 98);
__d("intersectionObserverEntryIsIntersecting", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a.isIntersecting != null ? a.isIntersecting : a.intersectionRatio > 0 || a.intersectionRect && (a.intersectionRect.height > 0 || a.intersectionRect.width > 0)
    }
    f["default"] = a
}), 66);
__d("objectEntries", [], (function(a, b, c, d, e, f) {
    function a(a) {
        return Object.entries(a)
    }
    f["default"] = a
}), 66);
__d("MemoryUtils", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g() {
        return window.performance && window.performance.memory
    }

    function a() {
        return window.performance && typeof window.performance.measureUserAgentSpecificMemory === "function"
    }

    function b() {
        if (g()) {
            typeof window.gc === "function" && window.gc();
            var a = window.performance.memory;
            return {
                usedJSHeapSize: a.usedJSHeapSize
            }
        }
        return {
            usedJSHeapSize: null
        }
    }
    f.isMemoryAPISupported = g;
    f.isMeasureMemoryOriginTrialSupported = a;
    f.getCurrentMemory = b
}), 66);
__d("getCometAsyncFetchResponse", ["CSRFGuard", "CometAsyncFetchError", "CometAsyncFetchResponse", "ConstUriUtils", "DTSG", "DTSG_ASYNC", "NetworkStatus", "PHPQuerySerializer", "Promise", "XHRRequest", "cometAsyncRequestHeaders", "getAsyncParams", "handleCometErrorCodeSideEffects", "isFacebookURI", "isHorizonDotMetaDotComURI", "isInternalFBURI", "isMessengerDotComURI", "isWorkDotMetaDotComURI", "isWorkplaceDotComURI", "isWorkroomsDotComURI", "recoverableViolation", "setTimeout"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i, j = 250;

    function a(a, e) {
        var f = 0,
            g;
        return new(i || (i = b("Promise")))(function(b, i) {
            var m, n = function(f, g) {
                if (e.ignoreResponse === !0) return b();
                var h;
                f = f.trim();
                try {
                    d("CSRFGuard").exists(f) && (f = d("CSRFGuard").clean(f)), h = JSON.parse(f)
                } catch (b) {
                    c("recoverableViolation")('Unable to parse uri "' + a.toString() + '" response. Error: ' + (b == null ? void 0 : b.message) + ", response: " + f.substring(0, 1e3), "comet_infra");
                    i(b);
                    return
                }
                if (l(a)) {
                    var j;
                    f = (f = h) == null ? void 0 : f.dtsgToken;
                    j = (j = h) == null ? void 0 : j.dtsgAsyncGetToken;
                    f && d("DTSG").setToken(f);
                    j && d("DTSG_ASYNC").setToken(j)
                }
                if (h.error) {
                    c("handleCometErrorCodeSideEffects")(h.error, h.errorSummary, h.errorDescription, h.redirectTo, e.shouldShowErrorDialog);
                    i({
                        error: h.error,
                        errorMsg: h.errorDescription,
                        errorType: h.errorSummary,
                        redirectTo: h.redirectTo
                    });
                    return
                }
                return b(new(c("CometAsyncFetchResponse"))(h, g))
            };
            n.includeHeaders = !0;

            function o(a) {
                var b = e.retryCount != null && e.retryCount > 0 && f <= e.retryCount;
                if (b) c("setTimeout")(q, j);
                else {
                    b = new(c("CometAsyncFetchError"))(a.errorMsg, a.errorCode, a.errorRawResponseHeaders, a.errorRawTransport, a.errorType);
                    return i(b)
                }
            }

            function p() {
                var b = new(c("CometAsyncFetchError"))("Request to " + a + " was aborted", null, null, null, "Abort");
                return i(b)
            }

            function q() {
                var a;
                if (((a = e.abortSignal) == null ? void 0 : a.aborted) === !0) return p();
                r();
                s()
            }

            function r() {
                m != null && (m.abort(), m = null)
            }

            function s() {
                var b, g = (b = e.requestHeaders) != null ? b : {};
                Object.assign(g, d("cometAsyncRequestHeaders").getHeaders());
                b = Object.keys(g).reduce(function(a, b) {
                    return a.setRequestHeader(b, g[b])
                }, new(c("XHRRequest"))(a)).setMethod(e.method).setData(babelHelpers["extends"]({}, e.data, c("getAsyncParams")(e.method, (b = e.skipSRState) != null ? b : !1))).setRawData(e.formData).setResponseHandler(n).setErrorHandler(o).setAbortHandler(p).setUploadProgressHandler(e.onUploadProgress).setDataSerializer((h || (h = c("PHPQuerySerializer"))).serialize);
                m = b;
                e.withCredentials === !0 && k(a) && b.setWithCredentials(!0);
                b.send();
                f++
            }
            e.abortSignal && (e.abortSignal.onabort = function() {
                r()
            });
            c("NetworkStatus").isOnline() ? q() : g = c("NetworkStatus").onChange(function(a) {
                a = a.online;
                a && (q(), g.remove())
            })
        })
    }

    function k(a) {
        a = d("ConstUriUtils").getUri(a);
        return a == null ? !1 : c("isFacebookURI")(a) || c("isInternalFBURI")(a) || c("isMessengerDotComURI")(a) || c("isWorkplaceDotComURI")(a) || c("isWorkroomsDotComURI")(a) || c("isWorkDotMetaDotComURI")(a) || c("isHorizonDotMetaDotComURI")(a)
    }

    function l(a) {
        a = d("ConstUriUtils").getUri(a);
        if (a == null) return !1;
        return !a.getProtocol() && !a.getDomain() ? !0 : document.location.origin === a.getOrigin()
    }
    g["default"] = a
}), 98);
__d("formatDurationSeconds", ["fbt", "padNumber"], (function(a, b, c, d, e, f, g, h) {
    function a(a) {
        var b = Math.floor(a / 3600),
            d = Math.floor(a / 60 % 60);
        a = Math.floor(a % 60);
        if (b) return h._("{hours}:{minutes}:{seconds}", [h._param("hours", b), h._param("minutes", c("padNumber")(d, 2)), h._param("seconds", c("padNumber")(a, 2))]);
        else return h._("{minutes}:{seconds}", [h._param("minutes", d), h._param("seconds", c("padNumber")(a, 2))])
    }
    g["default"] = a
}), 98);
__d("ResourceTimingStore", ["performance"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = 4e3,
        j = 3e3,
        k = new Map(),
        l = !1;

    function m() {
        var a = Array.from(k.entries());
        k = new Map(a.slice(-j))
    }

    function n(a) {
        var b = a.indexOf("#");
        return b === -1 ? a : a.slice(0, b)
    }

    function o(a) {
        for (var a = a, b = Array.isArray(a), c = 0, a = b ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var d;
            if (b) {
                if (c >= a.length) break;
                d = a[c++]
            } else {
                c = a.next();
                if (c.done) break;
                d = c.value
            }
            d = d;
            if (!(d instanceof PerformanceResourceTiming)) continue;
            var e = "";
            try {
                e = new URL(d.name).pathname
            } catch (a) {}
            if (!/\.(css|js)$/.test(e)) continue;
            e = d;
            if (!(e != null && typeof e === "object" && typeof e.encodedBodySize === "number" && typeof e.decodedBodySize === "number" && typeof e.transferSize === "number")) continue;
            k.set(n(d.name), e)
        }
        k.size > i && m()
    }

    function p(a) {
        o(a.getEntries())
    }

    function q() {
        if (l) return;
        l = !0;
        var a;
        if (typeof PerformanceObserver !== "undefined") {
            a = new PerformanceObserver(p);
            try {
                a.observe({
                    buffered: !0,
                    type: "resource"
                })
            } catch (a) {}
        }
        typeof(h || (h = c("performance"))).getEntriesByType === "function" && o((h || (h = c("performance"))).getEntriesByType("resource"))
    }

    function a(a) {
        q();
        return k.get(n(a))
    }
    g.init = q;
    g.getEntryForURL = a
}), 98);
__d("useOnUpdateEffectImplNew", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || d("react");
    var i = b.useEffect,
        j = b.useRef;

    function a(a, b) {
        var c = j(!1);
        i(function() {
            c.current = !0;
            return function() {
                c.current = !1
            }
        }, []);
        i(function() {
            var b = !c.current;
            c.current = !1;
            if (b) return a()
        }, b)
    }
    g["default"] = a
}), 98);
__d("usePrevious", ["react"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || d("react");
    var i = b.useEffect,
        j = b.useRef;

    function a(a) {
        var b = j(null);
        i(function() {
            b.current = a
        });
        return b.current
    }
    g["default"] = a
}), 98);
__d("filterMap", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b) {
        var c = new Map();
        for (var a = a, d = Array.isArray(a), e = 0, a = d ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var f;
            if (d) {
                if (e >= a.length) break;
                f = a[e++]
            } else {
                e = a.next();
                if (e.done) break;
                f = e.value
            }
            f = f;
            var g = f[0];
            f = f[1];
            b(f, g) && c.set(g, f)
        }
        return c
    }
    f["default"] = a
}), 66);