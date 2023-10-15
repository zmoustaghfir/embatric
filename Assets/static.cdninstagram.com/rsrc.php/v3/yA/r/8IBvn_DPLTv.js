; /*FB_PKG_DELIM*/

/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d("body-scroll-lock-3.1.5", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {},
        h = {
            exports: g
        };

    function i() {
        ! function(a, b) {
            if ("undefined" != typeof g) b(g);
            else {
                var c = {};
                b(c), a.bodyScrollLock = c
            }
        }(this, function(a) {
            Object.defineProperty(a, "__esModule", {
                value: !0
            });
            var b = !1;
            if ("undefined" != typeof window) {
                var c = {
                    get passive() {
                        b = !0
                    }
                };
                window.addEventListener("testPassive", null, c), window.removeEventListener("testPassive", null, c)
            }

            function d(a) {
                return i.some(function(b) {
                    return !(!b.options.allowTouchMove || !b.options.allowTouchMove(a))
                })
            }

            function e(a) {
                a = a || window.event;
                return !!d(a.target) || 1 < a.touches.length || (a.preventDefault && a.preventDefault(), !1)
            }

            function g() {
                void 0 !== m && (document.body.style.paddingRight = m, m = void 0), void 0 !== l && (document.body.style.overflow = l, l = void 0)
            }
            var h = "undefined" != typeof window && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || "MacIntel" === window.navigator.platform && 1 < window.navigator.maxTouchPoints),
                i = [],
                j = !1,
                k = -1,
                l = void 0,
                m = void 0;
            a.disableBodyScroll = function(c, a) {
                if (c) {
                    if (!i.some(function(a) {
                            return a.targetElement === c
                        })) {
                        var f = {
                            targetElement: c,
                            options: a || {}
                        };
                        i = [].concat(function(b) {
                            if (Array.isArray(b)) {
                                for (var c = 0, a = Array(b.length); c < b.length; c++) a[c] = b[c];
                                return a
                            }
                            return Array.from(b)
                        }(i), [f]), h ? (c.ontouchstart = function(a) {
                            1 === a.targetTouches.length && (k = a.targetTouches[0].clientY)
                        }, c.ontouchmove = function(b) {
                            var a, f;
                            1 === b.targetTouches.length && (a = c, f = (b = b).targetTouches[0].clientY - k, d(b.target) || (a && 0 === a.scrollTop && 0 < f || (a = a) && a.scrollHeight - a.scrollTop <= a.clientHeight && f < 0 ? e(b) : b.stopPropagation()))
                        }, j || (document.addEventListener("touchmove", e, b ? {
                            passive: !1
                        } : void 0), j = !0)) : (function(b) {
                            if (void 0 === m) {
                                b = !!b && !0 === b.reserveScrollBarGap;
                                var a = window.innerWidth - document.documentElement.clientWidth;
                                b && 0 < a && (m = document.body.style.paddingRight, document.body.style.paddingRight = a + "px")
                            }
                            void 0 === l && (l = document.body.style.overflow, document.body.style.overflow = "hidden")
                        })(a)
                    }
                } else !1
            }, a.clearAllBodyScrollLocks = function() {
                h ? (i.forEach(function(a) {
                    a.targetElement.ontouchstart = null, a.targetElement.ontouchmove = null
                }), j && (document.removeEventListener("touchmove", e, b ? {
                    passive: !1
                } : void 0), j = !1), k = -1) : g(), i = []
            }, a.enableBodyScroll = function(a) {
                a ? (i = i.filter(function(b) {
                    return b.targetElement !== a
                }), h ? (a.ontouchstart = null, a.ontouchmove = null, j && 0 === i.length && (document.removeEventListener("touchmove", e, b ? {
                    passive: !1
                } : void 0), j = !1)) : i.length || g()) : !1
            }
        })
    }
    var j = !1;

    function k() {
        j || (j = !0, i());
        return h.exports
    }

    function a(a) {
        switch (a) {
            case void 0:
                return k()
        }
    }
    e.exports = a
}), null);
__d("body-scroll-lock", ["body-scroll-lock-3.1.5"], (function(a, b, c, d, e, f) {
    e.exports = b("body-scroll-lock-3.1.5")()
}), null);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d("resize-observer-polyfill-1.5.1", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {},
        h = {
            exports: g
        };

    function i() {
        (function(b, c) {
            typeof g === "object" && typeof h !== "undefined" ? h.exports = c() : b.ResizeObserver = c()
        })(this, function() {
            var b = function() {
                    if (typeof Map !== "undefined") return Map;

                    function a(a, b) {
                        var c = -1;
                        a.some(function(d, a) {
                            if (d[0] === b) {
                                c = a;
                                return !0
                            }
                            return !1
                        });
                        return c
                    }
                    return function() {
                        function b() {
                            this.__entries__ = []
                        }
                        Object.defineProperty(b.prototype, "size", {
                            get: function() {
                                return this.__entries__.length
                            },
                            enumerable: !0,
                            configurable: !0
                        });
                        b.prototype.get = function(b) {
                            b = a(this.__entries__, b);
                            b = this.__entries__[b];
                            return b && b[1]
                        };
                        b.prototype.set = function(c, d) {
                            var b = a(this.__entries__, c);
                            ~b ? this.__entries__[b][1] = d : this.__entries__.push([c, d])
                        };
                        b.prototype["delete"] = function(b) {
                            var c = this.__entries__;
                            b = a(c, b);
                            ~b && c.splice(b, 1)
                        };
                        b.prototype.has = function(b) {
                            return !!~a(this.__entries__, b)
                        };
                        b.prototype.clear = function() {
                            this.__entries__.splice(0)
                        };
                        b.prototype.forEach = function(a, b) {
                            b === void 0 && (b = null);
                            for (var c = 0, d = this.__entries__; c < d.length; c++) {
                                var e = d[c];
                                a.call(b, e[1], e[0])
                            }
                        };
                        return b
                    }()
                }(),
                c = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document,
                d = function() {
                    if (typeof a !== "undefined" && a.Math === Math) return a;
                    if (typeof self !== "undefined" && self.Math === Math) return self;
                    return typeof window !== "undefined" && window.Math === Math ? window : Function("return this")()
                }(),
                e = function() {
                    return typeof requestAnimationFrame === "function" ? requestAnimationFrame.bind(d) : function(a) {
                        return setTimeout(function() {
                            return a(Date.now())
                        }, 1e3 / 60)
                    }
                }(),
                f = 2;

            function g(a, b) {
                var c = !1,
                    d = !1,
                    g = 0;

                function h() {
                    c && (c = !1, a()), d && j()
                }

                function i() {
                    e(h)
                }

                function j() {
                    var a = Date.now();
                    if (c) {
                        if (a - g < f) return;
                        d = !0
                    } else c = !0, d = !1, setTimeout(i, b);
                    g = a
                }
                return j
            }
            var h = 20,
                i = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
                j = typeof MutationObserver !== "undefined",
                k = function() {
                    function a() {
                        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = g(this.refresh.bind(this), h)
                    }
                    a.prototype.addObserver = function(a) {
                        ~this.observers_.indexOf(a) || this.observers_.push(a), this.connected_ || this.connect_()
                    };
                    a.prototype.removeObserver = function(b) {
                        var a = this.observers_;
                        b = a.indexOf(b);
                        ~b && a.splice(b, 1);
                        !a.length && this.connected_ && this.disconnect_()
                    };
                    a.prototype.refresh = function() {
                        var a = this.updateObservers_();
                        a && this.refresh()
                    };
                    a.prototype.updateObservers_ = function() {
                        var a = this.observers_.filter(function(a) {
                            return a.gatherActive(), a.hasActive()
                        });
                        a.forEach(function(a) {
                            return a.broadcastActive()
                        });
                        return a.length > 0
                    };
                    a.prototype.connect_ = function() {
                        if (!c || this.connected_) return;
                        document.addEventListener("transitionend", this.onTransitionEnd_);
                        window.addEventListener("resize", this.refresh);
                        j ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0);
                        this.connected_ = !0
                    };
                    a.prototype.disconnect_ = function() {
                        if (!c || !this.connected_) return;
                        document.removeEventListener("transitionend", this.onTransitionEnd_);
                        window.removeEventListener("resize", this.refresh);
                        this.mutationsObserver_ && this.mutationsObserver_.disconnect();
                        this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh);
                        this.mutationsObserver_ = null;
                        this.mutationEventsAdded_ = !1;
                        this.connected_ = !1
                    };
                    a.prototype.onTransitionEnd_ = function(a) {
                        a = a.propertyName;
                        var b = a === void 0 ? "" : a;
                        a = i.some(function(a) {
                            return !!~b.indexOf(a)
                        });
                        a && this.refresh()
                    };
                    a.getInstance = function() {
                        this.instance_ || (this.instance_ = new a());
                        return this.instance_
                    };
                    a.instance_ = null;
                    return a
                }(),
                l = function(a, b) {
                    for (var c = 0, d = Object.keys(b); c < d.length; c++) {
                        var e = d[c];
                        Object.defineProperty(a, e, {
                            value: b[e],
                            enumerable: !1,
                            writable: !1,
                            configurable: !0
                        })
                    }
                    return a
                },
                m = function(a) {
                    a = a && a.ownerDocument && a.ownerDocument.defaultView;
                    return a || d
                },
                n = x(0, 0, 0, 0);

            function o(a) {
                return parseFloat(a) || 0
            }

            function p(a) {
                var b = [];
                for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
                return b.reduce(function(b, c) {
                    c = a["border-" + c + "-width"];
                    return b + o(c)
                }, 0)
            }

            function q(a) {
                var b = ["top", "right", "bottom", "left"],
                    c = {};
                for (var d = 0, b = b; d < b.length; d++) {
                    var e = b[d],
                        f = a["padding-" + e];
                    c[e] = o(f)
                }
                return c
            }

            function r(a) {
                a = a.getBBox();
                return x(0, 0, a.width, a.height)
            }

            function s(a) {
                var b = a.clientWidth,
                    c = a.clientHeight;
                if (!b && !c) return n;
                var d = m(a).getComputedStyle(a),
                    e = q(d),
                    f = e.left + e.right,
                    g = e.top + e.bottom,
                    h = o(d.width),
                    i = o(d.height);
                d.boxSizing === "border-box" && (Math.round(h + f) !== b && (h -= p(d, "left", "right") + f), Math.round(i + g) !== c && (i -= p(d, "top", "bottom") + g));
                if (!u(a)) {
                    d = Math.round(h + f) - b;
                    a = Math.round(i + g) - c;
                    Math.abs(d) !== 1 && (h -= d);
                    Math.abs(a) !== 1 && (i -= a)
                }
                return x(e.left, e.top, h, i)
            }
            var t = function() {
                return typeof SVGGraphicsElement !== "undefined" ? function(a) {
                    return a instanceof m(a).SVGGraphicsElement
                } : function(a) {
                    return a instanceof m(a).SVGElement && typeof a.getBBox === "function"
                }
            }();

            function u(a) {
                return a === m(a).document.documentElement
            }

            function v(a) {
                if (!c) return n;
                return t(a) ? r(a) : s(a)
            }

            function w(a) {
                var b = a.x,
                    c = a.y,
                    d = a.width;
                a = a.height;
                var e = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
                e = Object.create(e.prototype);
                l(e, {
                    x: b,
                    y: c,
                    width: d,
                    height: a,
                    top: c,
                    right: b + d,
                    bottom: a + c,
                    left: b
                });
                return e
            }

            function x(a, b, c, d) {
                return {
                    x: a,
                    y: b,
                    width: c,
                    height: d
                }
            }
            var y = function() {
                    function a(a) {
                        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = x(0, 0, 0, 0), this.target = a
                    }
                    a.prototype.isActive = function() {
                        var a = v(this.target);
                        this.contentRect_ = a;
                        return a.width !== this.broadcastWidth || a.height !== this.broadcastHeight
                    };
                    a.prototype.broadcastRect = function() {
                        var a = this.contentRect_;
                        this.broadcastWidth = a.width;
                        this.broadcastHeight = a.height;
                        return a
                    };
                    return a
                }(),
                z = function() {
                    function a(a, b) {
                        b = w(b);
                        l(this, {
                            target: a,
                            contentRect: b
                        })
                    }
                    return a
                }(),
                A = function() {
                    function a(a, c, d) {
                        this.activeObservations_ = [];
                        this.observations_ = new b();
                        if (typeof a !== "function") throw new TypeError("The callback provided as parameter 1 is not a function.");
                        this.callback_ = a;
                        this.controller_ = c;
                        this.callbackCtx_ = d
                    }
                    a.prototype.observe = function(a) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if (typeof Element === "undefined" || !(Element instanceof Object)) return;
                        if (!(a instanceof m(a).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                        var b = this.observations_;
                        if (b.has(a)) return;
                        b.set(a, new y(a));
                        this.controller_.addObserver(this);
                        this.controller_.refresh()
                    };
                    a.prototype.unobserve = function(a) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if (typeof Element === "undefined" || !(Element instanceof Object)) return;
                        if (!(a instanceof m(a).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                        var b = this.observations_;
                        if (!b.has(a)) return;
                        b["delete"](a);
                        b.size || this.controller_.removeObserver(this)
                    };
                    a.prototype.disconnect = function() {
                        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
                    };
                    a.prototype.gatherActive = function() {
                        var a = this;
                        this.clearActive();
                        this.observations_.forEach(function(b) {
                            b.isActive() && a.activeObservations_.push(b)
                        })
                    };
                    a.prototype.broadcastActive = function() {
                        if (!this.hasActive()) return;
                        var a = this.callbackCtx_,
                            b = this.activeObservations_.map(function(a) {
                                return new z(a.target, a.broadcastRect())
                            });
                        this.callback_.call(a, b, a);
                        this.clearActive()
                    };
                    a.prototype.clearActive = function() {
                        this.activeObservations_.splice(0)
                    };
                    a.prototype.hasActive = function() {
                        return this.activeObservations_.length > 0
                    };
                    return a
                }(),
                B = typeof WeakMap !== "undefined" ? new WeakMap() : new b(),
                C = function() {
                    function a(b) {
                        if (!(this instanceof a)) throw new TypeError("Cannot call a class as a function.");
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        var c = k.getInstance(),
                            d = new A(b, c, this);
                        B.set(this, d)
                    }
                    return a
                }();
            ["observe", "unobserve", "disconnect"].forEach(function(a) {
                C.prototype[a] = function() {
                    var b;
                    return (b = B.get(this))[a].apply(b, arguments)
                }
            });
            var D = function() {
                return typeof d.ResizeObserver !== "undefined" ? d.ResizeObserver : C
            }();
            return D
        })
    }
    var j = !1;

    function k() {
        j || (j = !0, i());
        return h.exports
    }

    function b(a) {
        switch (a) {
            case void 0:
                return k()
        }
    }
    e.exports = b
}), null);
__d("resize-observer-polyfill", ["resize-observer-polyfill-1.5.1"], (function(a, b, c, d, e, f) {
    e.exports = b("resize-observer-polyfill-1.5.1")()
}), null);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d("styleq-0.1.3", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {},
        h = {
            exports: g
        };

    function i() {
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        g.styleq = void 0;
        var a = new WeakMap(),
            b = "$$css";

        function c(c) {
            var d, e, f;
            c != null && (d = c.disableCache === !0, e = c.disableMix === !0, f = c.transform);
            return function() {
                var c = [],
                    g = "",
                    h = null,
                    i = d ? null : a,
                    j = new Array(arguments.length);
                for (var k = 0; k < arguments.length; k++) j[k] = arguments[k];
                while (j.length > 0) {
                    var l = j.pop();
                    if (l == null || l === !1) continue;
                    if (Array.isArray(l)) {
                        for (var m = 0; m < l.length; m++) j.push(l[m]);
                        continue
                    }
                    var n = f != null ? f(l) : l;
                    if (n.$$css) {
                        var o = "";
                        if (i != null && i.has(n)) {
                            var p = i.get(n);
                            p != null && (o = p[0], c.push.apply(c, p[1]), i = p[2])
                        } else {
                            var q = [];
                            for (var r in n) {
                                var s = n[r];
                                if (r === b) continue;
                                (typeof s === "string" || s === null) && (c.includes(r) || (c.push(r), i != null && q.push(r), typeof s === "string" && (o += o ? " " + s : s)))
                            }
                            if (i != null) {
                                var t = new WeakMap();
                                i.set(n, [o, q, t]);
                                i = t
                            }
                        }
                        o && (g = g ? o + " " + g : o)
                    } else if (e) h == null && (h = {}), h = Object.assign({}, n, h);
                    else {
                        var u = null;
                        for (var v in n) {
                            var w = n[v];
                            w !== void 0 && (c.includes(v) || (w != null && (h == null && (h = {}), u == null && (u = {}), u[v] = w), c.push(v), i = null))
                        }
                        u != null && (h = Object.assign(u, h))
                    }
                }
                var x = [g, h];
                return x
            }
        }
        var d = c();
        g.styleq = d;
        d.factory = c
    }
    var j = !1;

    function k() {
        j || (j = !0, i());
        return h.exports
    }
    b = {};
    var l = {
        exports: b
    };

    function m() {
        l.exports = k()
    }
    var n = !1;

    function o() {
        n || (n = !0, m());
        return l.exports
    }

    function a(a) {
        switch (a) {
            case void 0:
                return o()
        }
    }
    e.exports = a
}), null);
__d("styleq", ["styleq-0.1.3"], (function(a, b, c, d, e, f) {
    e.exports = b("styleq-0.1.3")()
}), null);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d("tabbable-5.1.5", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {},
        h = {
            exports: g
        };

    function i() {
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var a = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"],
            b = a.join(","),
            c = typeof Element === "undefined" ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
            d = function(a, d, e) {
                var f = Array.prototype.slice.apply(a.querySelectorAll(b));
                d && c.call(a, b) && f.unshift(a);
                f = f.filter(e);
                return f
            },
            e = function(a) {
                return a.contentEditable === "true"
            },
            f = function(a) {
                var b = parseInt(a.getAttribute("tabindex"), 10);
                if (!isNaN(b)) return b;
                if (e(a)) return 0;
                return (a.nodeName === "AUDIO" || a.nodeName === "VIDEO" || a.nodeName === "DETAILS") && a.getAttribute("tabindex") === null ? 0 : a.tabIndex
            },
            h = function(a, b) {
                return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex
            },
            i = function(a) {
                return a.tagName === "INPUT"
            },
            j = function(a) {
                return i(a) && a.type === "hidden"
            },
            k = function(a) {
                a = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(a) {
                    return a.tagName === "SUMMARY"
                });
                return a
            },
            l = function(a, b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c].checked && a[c].form === b) return a[c]
            },
            m = function(a) {
                if (!a.name) return !0;
                var b = a.form || a.ownerDocument,
                    c = function(a) {
                        return b.querySelectorAll('input[type="radio"][name="' + a + '"]')
                    },
                    d;
                if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") d = c(window.CSS.escape(a.name));
                else try {
                    d = c(a.name)
                } catch (a) {
                    console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", a.message);
                    return !1
                }
                c = l(d, a.form);
                return !c || c === a
            },
            n = function(a) {
                return i(a) && a.type === "radio"
            },
            o = function(a) {
                return n(a) && !m(a)
            },
            p = function(a) {
                if (getComputedStyle(a).visibility === "hidden") return !0;
                var b = c.call(a, "details>summary:first-of-type");
                b = b ? a.parentElement : a;
                if (c.call(b, "details:not([open]) *")) return !0;
                while (a) {
                    if (getComputedStyle(a).display === "none") return !0;
                    a = a.parentElement
                }
                return !1
            },
            q = function(a) {
                return a.disabled || j(a) || p(a) || k(a) ? !1 : !0
            },
            r = function(a) {
                return !q(a) || o(a) || f(a) < 0 ? !1 : !0
            },
            s = function(a, b) {
                b = b || {};
                var c = [],
                    e = [];
                a = d(a, b.includeContainer, r);
                a.forEach(function(a, b) {
                    var d = f(a);
                    d === 0 ? c.push(a) : e.push({
                        documentOrder: b,
                        tabIndex: d,
                        node: a
                    })
                });
                b = e.sort(h).map(function(a) {
                    return a.node
                }).concat(c);
                return b
            },
            t = function(a, b) {
                b = b || {};
                a = d(a, b.includeContainer, q);
                return a
            },
            u = function(a) {
                if (!a) throw new Error("No node provided");
                return c.call(a, b) === !1 ? !1 : r(a)
            },
            v = a.concat("iframe").join(",");
        a = function(a) {
            if (!a) throw new Error("No node provided");
            return c.call(a, v) === !1 ? !1 : q(a)
        };
        g.focusable = t;
        g.isFocusable = a;
        g.isTabbable = u;
        g.tabbable = s
    }
    var j = !1;

    function k() {
        j || (j = !0, i());
        return h.exports
    }

    function a(a) {
        switch (a) {
            case void 0:
                return k()
        }
    }
    e.exports = a
}), null);
__d("tabbable", ["tabbable-5.1.5"], (function(a, b, c, d, e, f) {
    e.exports = b("tabbable-5.1.5")()
}), null);