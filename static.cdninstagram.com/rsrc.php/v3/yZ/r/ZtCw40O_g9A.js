/*FB_PKG_DELIM*/

__d(
  "EventListenerImplForBlue",
  ["Event", "TimeSlice", "emptyFunction", "setImmediateAcrossTransitions"],
  function (a, b, c, d, e, f, g) {
    function h(a, b, d, e) {
      var f = c("TimeSlice").guard(d, "EventListener capture " + b);
      if (a.addEventListener) {
        a.addEventListener(b, f, e);
        return {
          remove: function () {
            a.removeEventListener(b, f, e);
          },
        };
      } else return { remove: c("emptyFunction") };
    }
    a = {
      listen: function (a, b, d) {
        return c("Event").listen(a, b, d);
      },
      capture: function (a, b, c) {
        return h(a, b, c, !0);
      },
      captureWithPassiveFlag: function (a, b, c, d) {
        return h(a, b, c, { passive: d, capture: !0 });
      },
      bubbleWithPassiveFlag: function (a, b, c, d) {
        return h(a, b, c, { passive: d, capture: !1 });
      },
      registerDefault: function (a, b) {
        var d,
          e = c("Event").listen(
            document.documentElement,
            a,
            f,
            c("Event").Priority._BUBBLE
          );
        function f() {
          g(),
            (d = c("Event").listen(document, a, b)),
            c("setImmediateAcrossTransitions")(g);
        }
        function g() {
          d && d.remove(), (d = null);
        }
        return {
          remove: function () {
            g(), e && e.remove(), (e = null);
          },
        };
      },
      suppress: function (a) {
        c("Event").kill(a);
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "BasicVector",
  [],
  function (a, b, c, d, e, f) {
    a = (function () {
      function a(a, b) {
        (this.x = a), (this.y = b);
      }
      var b = a.prototype;
      b.derive = function (b, c) {
        return new a(b, c);
      };
      b.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
      };
      b.add = function (a, b) {
        b === void 0 && ((b = a.y), (a = a.x));
        a = parseFloat(a);
        b = parseFloat(b);
        return this.derive(this.x + a, this.y + b);
      };
      b.mul = function (a, b) {
        b === void 0 && (b = a);
        return this.derive(this.x * a, this.y * b);
      };
      b.div = function (a, b) {
        b === void 0 && (b = a);
        return this.derive((this.x * 1) / a, (this.y * 1) / b);
      };
      b.sub = function (a, b) {
        if (arguments.length === 1) return this.add(a.mul(-1));
        else return this.add(-a, -b);
      };
      b.distanceTo = function (a) {
        return this.sub(a).magnitude();
      };
      b.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      };
      b.rotate = function (a) {
        return this.derive(
          this.x * Math.cos(a) - this.y * Math.sin(a),
          this.x * Math.sin(a) + this.y * Math.cos(a)
        );
      };
      return a;
    })();
    f["default"] = a;
  },
  66
);
__d(
  "getUnboundedScrollPosition",
  ["Scroll"],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      if (a === window) {
        var c;
        return {
          x:
            (c = window.pageXOffset) != null
              ? c
              : b("Scroll").getLeft(document.documentElement),
          y:
            (c = window.pageYOffset) != null
              ? c
              : b("Scroll").getTop(document.documentElement),
        };
      }
      return { x: b("Scroll").getLeft(a), y: b("Scroll").getTop(a) };
    }
    e.exports = a;
  },
  null
);
__d(
  "getViewportDimensions",
  ["UserAgent"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = (function () {
      var a = null;
      return function () {
        var b = document.body;
        if (b == null) return null;
        (a == null || !b.contains(a)) &&
          ((a = document.createElement("div")),
          (a.style.left = Number.MAX_SAFE_INTEGER + "px"),
          (a.style.width = "100%"),
          (a.style.height = "100%"),
          (a.style.position = "fixed"),
          b.appendChild(a));
        return a;
      };
    })();
    function i() {
      var a;
      document.documentElement && (a = document.documentElement.clientWidth);
      a == null && document.body && (a = document.body.clientWidth);
      return a || 0;
    }
    function j() {
      var a;
      document.documentElement && (a = document.documentElement.clientHeight);
      a == null && document.body && (a = document.body.clientHeight);
      return a || 0;
    }
    function k() {
      return {
        width: window.innerWidth || i(),
        height: window.innerHeight || j(),
      };
    }
    k.withoutScrollbars = function () {
      return c("UserAgent").isPlatform("Android")
        ? k()
        : { width: i(), height: j() };
    };
    k.layout = function () {
      var a,
        b = h();
      return {
        width: (a = b == null ? void 0 : b.clientWidth) != null ? a : i(),
        height: (a = b == null ? void 0 : b.clientHeight) != null ? a : j(),
      };
    };
    g["default"] = k;
  },
  98
);
__d(
  "DOMVector",
  [
    "BasicVector",
    "getDocumentScrollElement",
    "getElementPosition",
    "getUnboundedScrollPosition",
    "getViewportDimensions",
  ],
  function (a, b, c, d, e, f, g) {
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, c, d) {
        b = a.call(this, b, c) || this;
        b.domain = d || "pure";
        return b;
      }
      var d = b.prototype;
      d.derive = function (a, c, d) {
        return new b(a, c, d || this.domain);
      };
      d.add = function (c, d) {
        c instanceof b &&
          c.getDomain() !== "pure" &&
          (c = c.convertTo(this.domain));
        return a.prototype.add.call(this, c, d);
      };
      d.convertTo = function (a) {
        if (a != "pure" && a != "viewport" && a != "document")
          return this.derive(0, 0);
        if (a == this.domain) return this.derive(this.x, this.y, this.domain);
        if (a == "pure") return this.derive(this.x, this.y);
        if (this.domain == "pure") return this.derive(0, 0);
        var c = b.getScrollPosition("document"),
          d = this.x,
          e = this.y;
        this.domain == "document"
          ? ((d -= c.x), (e -= c.y))
          : ((d += c.x), (e += c.y));
        return this.derive(d, e, a);
      };
      d.getDomain = function () {
        return this.domain;
      };
      b.from = function (a, c, d) {
        return new b(a, c, d);
      };
      b.getScrollPosition = function (a) {
        a = a || "document";
        var b = c("getUnboundedScrollPosition")(window);
        return this.from(b.x, b.y, "document").convertTo(a);
      };
      b.getElementPosition = function (a, b) {
        b = b || "document";
        a = c("getElementPosition")(a);
        return this.from(a.x, a.y, "viewport").convertTo(b);
      };
      b.getElementDimensions = function (a) {
        return this.from(a.offsetWidth || 0, a.offsetHeight || 0);
      };
      b.getViewportDimensions = function () {
        var a = c("getViewportDimensions")();
        return this.from(a.width, a.height, "viewport");
      };
      b.getLayoutViewportDimensions = function () {
        var a = c("getViewportDimensions").layout();
        return this.from(a.width, a.height, "viewport");
      };
      b.getViewportWithoutScrollbarDimensions = function () {
        var a = c("getViewportDimensions").withoutScrollbars();
        return this.from(a.width, a.height, "viewport");
      };
      b.getDocumentDimensions = function (a) {
        a = c("getDocumentScrollElement")(a);
        return this.from(a.scrollWidth, a.scrollHeight, "document");
      };
      return b;
    })(c("BasicVector"));
    g["default"] = a;
  },
  98
);
__d(
  "Vector",
  ["DOMVector", "Event", "Scroll"],
  function (a, b, c, d, e, f, g) {
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, c, d) {
        return a.call(this, parseFloat(b), parseFloat(c), d) || this;
      }
      var e = b.prototype;
      e.derive = function (a, c, d) {
        return new b(a, c, d || this.domain);
      };
      e.setElementPosition = function (a) {
        var b = this.convertTo("document");
        a.style.left = parseInt(b.x, 10) + "px";
        a.style.top = parseInt(b.y, 10) + "px";
        return this;
      };
      e.setElementDimensions = function (a) {
        return this.setElementWidth(a).setElementHeight(a);
      };
      e.setElementWidth = function (a) {
        a.style.width = parseInt(this.x, 10) + "px";
        return this;
      };
      e.setElementHeight = function (a) {
        a.style.height = parseInt(this.y, 10) + "px";
        return this;
      };
      e.scrollElementBy = function (a) {
        if (a == document.body) window.scrollBy(this.x, this.y);
        else {
          var b;
          (b = d("Scroll")).setLeft(a, b.getLeft(a) + this.x);
          b.setTop(a, b.getTop(a) + this.y);
        }
        return this;
      };
      b.from = function (a, c, d) {
        return new b(a, c, d);
      };
      b.getEventPosition = function (a, b) {
        b === void 0 && (b = "document");
        a = c("Event").getPosition(a);
        a = this.from(a.x, a.y, "document");
        return a.convertTo(b);
      };
      b.getTouchEventPosition = function (a, b) {
        b === void 0 && (b = "document");
        a = a.touches[0];
        a = this.from(a.pageX, a.pageY, "document");
        return a.convertTo(b);
      };
      b.deserialize = function (a) {
        a = a.split(",");
        return this.from(a[0], a[1]);
      };
      return b;
    })(c("DOMVector"));
    g["default"] = a;
  },
  98
);
__d(
  "debounceCore",
  ["TimeSlice"],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d, e, f, g) {
      d === void 0 && (d = null);
      e === void 0 && (e = setTimeout);
      f === void 0 && (f = clearTimeout);
      g === void 0 && (g = !1);
      var h,
        i = !0;
      function j() {
        for (var k = arguments.length, l = new Array(k), m = 0; m < k; m++)
          l[m] = arguments[m];
        var n;
        if (g) {
          n = c("TimeSlice").guard(function () {
            (i = !0), (h = null);
          }, "debounceCore");
          if (!i) {
            f(h);
            h = e(n, b);
            return;
          }
          i = !1;
          a.apply(d, l);
        } else
          j.reset(),
            (n = c("TimeSlice").guard(function () {
              (h = null), a.apply(d, l);
            }, "debounceCore"));
        n.__SMmeta = a.__SMmeta;
        h = e(n, b);
      }
      j.reset = function () {
        f(h), (h = null), (i = !0);
      };
      j.isPending = function () {
        return h != null;
      };
      return j;
    }
    g["default"] = a;
  },
  98
);
__d(
  "debounce",
  ["clearTimeout", "debounceCore", "setTimeout"],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d, e, f) {
      b === void 0 && (b = 100);
      var g = function (a, b, d) {
        return c("setTimeout")(a, b, d, !e);
      };
      return c("debounceCore")(a, b, d, g, c("clearTimeout"), f);
    }
    g["default"] = a;
  },
  98
);
__d(
  "LogHistory",
  [],
  function (a, b, c, d, e, f) {
    var g = 500,
      h = {},
      i = [];
    function j(a, b, c, d) {
      var e = d[0];
      if (typeof e !== "string" || d.length !== 1) return;
      i.push({ date: Date.now(), level: a, category: b, event: c, args: e });
      i.length > g && i.shift();
    }
    var k = (function () {
      function a(a) {
        this.category = a;
      }
      var b = a.prototype;
      b.debug = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        j("debug", this.category, a, c);
        return this;
      };
      b.log = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        j("log", this.category, a, c);
        return this;
      };
      b.warn = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        j("warn", this.category, a, c);
        return this;
      };
      b.error = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        j("error", this.category, a, c);
        return this;
      };
      return a;
    })();
    function a(a) {
      h[a] || (h[a] = new k(a));
      return h[a];
    }
    function b() {
      return i;
    }
    function c() {
      i.length = 0;
    }
    function d(a) {
      return a
        .map(function (a) {
          var b = new Date(a.date).toISOString();
          return [b, a.level, a.category, a.event, a.args].join(" | ");
        })
        .join("\n");
    }
    f.getInstance = a;
    f.getEntries = b;
    f.clearEntries = c;
    f.formatEntries = d;
  },
  66
);
__d(
  "SchedulerFeatureFlags",
  ["gkx"],
  function (a, b, c, d, e, f, g) {
    a = !0;
    b = c("gkx")("1099893");
    d = !0;
    e = !0;
    f = 5;
    c = 10;
    var h = 10;
    g.enableSchedulerDebugging = a;
    g.enableProfiling = b;
    g.enableIsInputPending = d;
    g.enableIsInputPendingContinuous = e;
    g.frameYieldMs = f;
    g.continuousYieldMs = c;
    g.maxYieldMs = h;
  },
  98
);
__d(
  "Scheduler-dev.classic",
  ["SchedulerFeatureFlags"],
  function (a, b, c, d, e, f) {
    "use strict";
  },
  null
);
__d(
  "Scheduler-profiling.classic",
  ["SchedulerFeatureFlags"],
  function (b, c, d, e, f, g) {
    "use strict";
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var h = c("SchedulerFeatureFlags").enableProfiling;
    function i(b, c) {
      var d = b.length;
      b.push(c);
      a: for (; 0 < d; ) {
        var e = (d - 1) >>> 1,
          f = b[e];
        if (0 < l(f, c)) (b[e] = c), (b[d] = f), (d = e);
        else break a;
      }
    }
    function j(b) {
      return 0 === b.length ? null : b[0];
    }
    function k(b) {
      if (0 === b.length) return null;
      var c = b[0],
        d = b.pop();
      if (d !== c) {
        b[0] = d;
        a: for (var e = 0, f = b.length, g = f >>> 1; e < g; ) {
          var h = 2 * (e + 1) - 1,
            i = b[h],
            j = h + 1,
            k = b[j];
          if (0 > l(i, d))
            j < f && 0 > l(k, i)
              ? ((b[e] = k), (b[j] = d), (e = j))
              : ((b[e] = i), (b[h] = d), (e = h));
          else if (j < f && 0 > l(k, d)) (b[e] = k), (b[j] = d), (e = j);
          else break a;
        }
      }
      return c;
    }
    function l(b, c) {
      var d = b.sortIndex - c.sortIndex;
      return 0 !== d ? d : b.id - c.id;
    }
    var m = 0,
      n = 0,
      o = 0,
      p = null,
      q = null,
      r = 0;
    function s(b) {
      if (null !== q) {
        var c = r;
        r += b.length;
        if (r + 1 > o) {
          o *= 2;
          if (524288 < o) {
            t();
            return;
          }
          var d = new Int32Array(4 * o);
          d.set(q);
          p = d.buffer;
          q = d;
        }
        q.set(b, c);
      }
    }
    function b() {
      (o = 131072),
        (p = new ArrayBuffer(4 * o)),
        (q = new Int32Array(p)),
        (r = 0);
    }
    function t() {
      var b = p;
      o = 0;
      q = p = null;
      r = 0;
      return b;
    }
    g.unstable_now = void 0;
    if (
      "object" === typeof performance &&
      "function" === typeof performance.now
    ) {
      var u = performance;
      g.unstable_now = function () {
        return u.now();
      };
    } else {
      var v = Date,
        w = v.now();
      g.unstable_now = function () {
        return v.now() - w;
      };
    }
    var x = [],
      y = [],
      z = 1,
      A = !1,
      B = null,
      C = 3,
      D = !1,
      E = !1,
      F = !1,
      G = "function" === typeof setTimeout ? setTimeout : null,
      H = "function" === typeof clearTimeout ? clearTimeout : null,
      I = "undefined" !== typeof setImmediate ? setImmediate : null,
      J =
        "undefined" !== typeof navigator &&
        void 0 !== navigator.scheduling &&
        void 0 !== navigator.scheduling.isInputPending
          ? navigator.scheduling.isInputPending.bind(navigator.scheduling)
          : null,
      K = { includeContinuous: !0 };
    function L(b) {
      for (var c = j(y); null !== c; ) {
        if (null === c.callback) k(y);
        else if (c.startTime <= b)
          k(y),
            (c.sortIndex = c.expirationTime),
            i(x, c),
            h &&
              (h && null !== q && s([1, 1e3 * b, c.id, c.priorityLevel]),
              (c.isQueued = !0));
        else break;
        c = j(y);
      }
    }
    function M(b) {
      F = !1;
      L(b);
      if (!E)
        if (null !== j(x)) (E = !0), X();
        else {
          var c = j(y);
          null !== c && Y(M, c.startTime - b);
        }
    }
    function N(b) {
      L(b);
      for (B = j(x); !(null === B || A || (B.expirationTime > b && T())); ) {
        var c = B.callback;
        if ("function" === typeof c) {
          B.callback = null;
          C = B.priorityLevel;
          var d = B.expirationTime <= b;
          if (h) {
            var e = B;
            h && (m++, null !== q && s([5, 1e3 * b, e.id, m]));
          }
          c = c(d);
          b = g.unstable_now();
          if ("function" === typeof c)
            return (
              (B.callback = c),
              h && h && null !== q && s([6, 1e3 * b, B.id, m]),
              L(b),
              !0
            );
          h && (h && null !== q && s([2, 1e3 * b, B.id]), (B.isQueued = !1));
          B === j(x) && k(x);
          L(b);
        } else k(x);
        B = j(x);
      }
      if (null !== B) return !0;
      c = j(y);
      null !== c && Y(M, c.startTime - b);
      return !1;
    }
    var O = !1,
      P = -1,
      Q = 5,
      R = -1,
      S = !1;
    function T() {
      var b = g.unstable_now() - R;
      if (b < Q) return !1;
      if (S) return !0;
      if (10 > b) {
        if (null !== J) return J();
      } else if (10 > b && null !== J) return J(K);
      return !0;
    }
    function U() {
      if (O) {
        var b = g.unstable_now();
        R = b;
        var c = !0;
        try {
          a: {
            h && h && null !== q && s([8, 1e3 * b, n]);
            E = !1;
            F && ((F = !1), H(P), (P = -1));
            D = !0;
            var d = C;
            try {
              if (h)
                try {
                  c = N(b);
                  break a;
                } catch (b) {
                  if (null !== B) {
                    var e = g.unstable_now();
                    h && null !== q && s([3, 1e3 * e, B.id]);
                    B.isQueued = !1;
                  }
                  throw b;
                }
              else {
                c = N(b);
                break a;
              }
            } finally {
              if (((B = null), (C = d), (D = !1), h)) {
                e = g.unstable_now();
                h && (n++, null !== q && s([7, 1e3 * e, n]));
              }
            }
            c = void 0;
          }
        } finally {
          c ? V() : (O = !1);
        }
      }
      S = !1;
    }
    var V;
    if ("function" === typeof I)
      V = function () {
        I(U);
      };
    else if ("undefined" !== typeof MessageChannel) {
      d = new MessageChannel();
      var W = d.port2;
      d.port1.onmessage = U;
      V = function () {
        W.postMessage(null);
      };
    } else
      V = function () {
        G(U, 0);
      };
    function X() {
      O || ((O = !0), V());
    }
    function Y(b, c) {
      P = G(function () {
        b(g.unstable_now());
      }, c);
    }
    e = h
      ? { startLoggingProfilingEvents: b, stopLoggingProfilingEvents: t }
      : null;
    g.unstable_IdlePriority = 5;
    g.unstable_ImmediatePriority = 1;
    g.unstable_LowPriority = 4;
    g.unstable_NormalPriority = 3;
    g.unstable_Profiling = e;
    g.unstable_UserBlockingPriority = 2;
    g.unstable_cancelCallback = function (b) {
      if (h && b.isQueued) {
        var c = g.unstable_now();
        h && null !== q && s([4, 1e3 * c, b.id]);
        b.isQueued = !1;
      }
      b.callback = null;
    };
    g.unstable_continueExecution = function () {
      (A = !1), E || D || ((E = !0), X());
    };
    g.unstable_forceFrameRate = function (b) {
      0 > b || 125 < b ? !1 : (Q = 0 < b ? Math.floor(1e3 / b) : 5);
    };
    g.unstable_getCurrentPriorityLevel = function () {
      return C;
    };
    g.unstable_getFirstCallbackNode = function () {
      return j(x);
    };
    g.unstable_next = function (b) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var c = 3;
          break;
        default:
          c = C;
      }
      var d = C;
      C = c;
      try {
        return b();
      } finally {
        C = d;
      }
    };
    g.unstable_pauseExecution = function () {
      A = !0;
    };
    g.unstable_requestPaint = function () {
      void 0 !== navigator &&
        void 0 !== navigator.scheduling &&
        void 0 !== navigator.scheduling.isInputPending &&
        (S = !0);
    };
    g.unstable_runWithPriority = function (b, c) {
      switch (b) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          b = 3;
      }
      var d = C;
      C = b;
      try {
        return c();
      } finally {
        C = d;
      }
    };
    g.unstable_scheduleCallback = function (b, c, d) {
      var e = g.unstable_now();
      "object" === typeof d && null !== d
        ? ((d = d.delay), (d = "number" === typeof d && 0 < d ? e + d : e))
        : (d = e);
      switch (b) {
        case 1:
          var f = -1;
          break;
        case 2:
          f = 250;
          break;
        case 5:
          f = 1073741823;
          break;
        case 4:
          f = 1e4;
          break;
        default:
          f = 5e3;
      }
      f = d + f;
      b = {
        id: z++,
        callback: c,
        priorityLevel: b,
        startTime: d,
        expirationTime: f,
        sortIndex: -1,
      };
      h && (b.isQueued = !1);
      d > e
        ? ((b.sortIndex = d),
          i(y, b),
          null === j(x) &&
            b === j(y) &&
            (F ? (H(P), (P = -1)) : (F = !0), Y(M, d - e)))
        : ((b.sortIndex = f),
          i(x, b),
          h &&
            (h && null !== q && s([1, 1e3 * e, b.id, b.priorityLevel]),
            (b.isQueued = !0)),
          E || D || ((E = !0), X()));
      return b;
    };
    g.unstable_shouldYield = T;
    g.unstable_wrapCallback = function (b) {
      var c = C;
      return function () {
        var d = C;
        C = c;
        try {
          return b.apply(this, arguments);
        } finally {
          C = d;
        }
      };
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  },
  null
);
__d(
  "SchedulerPostTask-dev.classic",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
  },
  null
);
__d(
  "SchedulerPostTask-profiling.classic",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = window.performance;
    var g = window.setTimeout,
      h = a.scheduler,
      i = b.now.bind(b),
      j = 0,
      k = 3;
    function l(a, b, c, d) {
      j = i() + 5;
      try {
        k = a;
        d = d(!1);
        if ("function" === typeof d) {
          var e = { signal: c._controller.signal };
          a = l.bind(null, a, b, c, d);
          void 0 !== h.yield
            ? h.yield(e).then(a)["catch"](m)
            : h.postTask(a, e)["catch"](m);
        }
      } catch (a) {
        g(function () {
          throw a;
        });
      } finally {
        k = 3;
      }
    }
    function m() {}
    f.unstable_IdlePriority = 5;
    f.unstable_ImmediatePriority = 1;
    f.unstable_LowPriority = 4;
    f.unstable_NormalPriority = 3;
    f.unstable_Profiling = null;
    f.unstable_UserBlockingPriority = 2;
    f.unstable_cancelCallback = function (a) {
      a._controller.abort();
    };
    f.unstable_continueExecution = function () {};
    f.unstable_forceFrameRate = function () {};
    f.unstable_getCurrentPriorityLevel = function () {
      return k;
    };
    f.unstable_getFirstCallbackNode = function () {
      return null;
    };
    f.unstable_next = function (a) {
      switch (k) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = k;
      }
      var c = k;
      k = b;
      try {
        return a();
      } finally {
        k = c;
      }
    };
    f.unstable_now = i;
    f.unstable_pauseExecution = function () {};
    f.unstable_requestPaint = function () {};
    f.unstable_runWithPriority = function (a, b) {
      var c = k;
      k = a;
      try {
        return b();
      } finally {
        k = c;
      }
    };
    f.unstable_scheduleCallback = function (a, b, c) {
      switch (a) {
        case 1:
        case 2:
          var d = "user-blocking";
          break;
        case 4:
        case 3:
          d = "user-visible";
          break;
        case 5:
          d = "background";
          break;
        default:
          d = "user-visible";
      }
      var e = new TaskController({ priority: d });
      c = {
        delay: "object" === typeof c && null !== c ? c.delay : 0,
        signal: e.signal,
      };
      e = { _controller: e };
      h.postTask(l.bind(null, a, d, e, b), c)["catch"](m);
      return e;
    };
    f.unstable_shouldYield = function () {
      return i() >= j;
    };
    f.unstable_wrapCallback = function (a) {
      var b = k;
      return function () {
        var c = k;
        k = b;
        try {
          return a();
        } finally {
          k = c;
        }
      };
    };
  },
  null
);
__d(
  "SchedulerFb-Internals_DO_NOT_USE",
  [
    "Scheduler-dev.classic",
    "Scheduler-profiling.classic",
    "SchedulerPostTask-dev.classic",
    "SchedulerPostTask-profiling.classic",
    "ifRequireable",
    "qex",
    "requestAnimationFramePolyfill",
  ],
  function (a, b, c, d, e, f) {
    "use strict";
    c =
      a.scheduler !== void 0 &&
      a.scheduler.postTask !== void 0 &&
      b("qex")._("420");
    a.requestAnimationFrame === void 0 &&
      (a.requestAnimationFrame = b("requestAnimationFramePolyfill"));
    var g;
    c
      ? (g = b("SchedulerPostTask-profiling.classic"))
      : (g = b("Scheduler-profiling.classic"));
    e.exports = {
      unstable_ImmediatePriority: g.unstable_ImmediatePriority,
      unstable_UserBlockingPriority: g.unstable_UserBlockingPriority,
      unstable_NormalPriority: g.unstable_NormalPriority,
      unstable_LowPriority: g.unstable_LowPriority,
      unstable_IdlePriority: g.unstable_IdlePriority,
      unstable_getCurrentPriorityLevel: g.unstable_getCurrentPriorityLevel,
      unstable_runWithPriority: g.unstable_runWithPriority,
      unstable_now: g.unstable_now,
      unstable_scheduleCallback: function (a, c, d) {
        var e = b("ifRequireable")(
          "TimeSlice",
          function (a) {
            return a.guard(c, "unstable_scheduleCallback", {
              propagationType: a.PropagationType.CONTINUATION,
              registerCallStack: !0,
            });
          },
          function () {
            return c;
          }
        );
        return g.unstable_scheduleCallback(a, e, d);
      },
      unstable_cancelCallback: function (a) {
        return g.unstable_cancelCallback(a);
      },
      unstable_wrapCallback: function (a) {
        var c = b("ifRequireable")(
          "TimeSlice",
          function (b) {
            return b.guard(a, "unstable_wrapCallback", {
              propagationType: b.PropagationType.CONTINUATION,
              registerCallStack: !0,
            });
          },
          function () {
            return a;
          }
        );
        return g.unstable_wrapCallback(c);
      },
      unstable_pauseExecution: function () {
        return g.unstable_pauseExecution();
      },
      unstable_continueExecution: function () {
        return g.unstable_continueExecution();
      },
      unstable_shouldYield: g.unstable_shouldYield,
      unstable_requestPaint: g.unstable_requestPaint,
      unstable_forceFrameRate: g.unstable_forceFrameRate,
      unstable_Profiling: g.unstable_Profiling,
    };
  },
  null
);
__d(
  "JSScheduler",
  ["SchedulerFb-Internals_DO_NOT_USE"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = {
        unstable_Immediate: (c = b("SchedulerFb-Internals_DO_NOT_USE"))
          .unstable_ImmediatePriority,
        unstable_UserBlocking: c.unstable_UserBlockingPriority,
        unstable_Normal: c.unstable_NormalPriority,
        unstable_Low: c.unstable_LowPriority,
        unstable_Idle: c.unstable_IdlePriority,
      },
      h = !1,
      i = c.unstable_scheduleCallback,
      j = c.unstable_cancelCallback,
      k = {
        priorities: g,
        shouldYield: c.unstable_shouldYield,
        getCurrentPriorityLevel: c.unstable_getCurrentPriorityLevel,
        runWithPriority: c.unstable_runWithPriority,
        runWithPriority_DO_NOT_USE: c.unstable_runWithPriority,
        defer: function (a) {
          var b = k.getCurrentPriorityLevel();
          return i(b, a);
        },
        getCallbackScheduler: function () {
          var a = k.getCurrentPriorityLevel();
          return function (b) {
            return i(a, b);
          };
        },
        getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE:
          function () {
            var a = k.getCurrentPriorityLevel();
            return function (c) {
              return i(g.unstable_UserBlocking, function () {
                b("SchedulerFb-Internals_DO_NOT_USE").unstable_runWithPriority(
                  a,
                  c
                );
              });
            };
          },
        deferUserBlockingRunAtCurrentPri_DO_NOT_USE: function (a) {
          var c = k.getCurrentPriorityLevel();
          return i(g.unstable_UserBlocking, function () {
            b("SchedulerFb-Internals_DO_NOT_USE").unstable_runWithPriority(
              c,
              a
            );
          });
        },
        scheduleImmediatePriCallback: function (a) {
          return i(g.unstable_Immediate, a);
        },
        scheduleUserBlockingPriCallback: function (a) {
          return i(g.unstable_UserBlocking, a);
        },
        scheduleNormalPriCallback: function (a) {
          return i(g.unstable_Normal, a);
        },
        scheduleLoggingPriCallback: function (a) {
          return i(g.unstable_Low, a);
        },
        scheduleSpeculativeCallback: function (a) {
          return i(g.unstable_Idle, a);
        },
        cancelCallback: function (a) {
          j(a);
        },
        scheduleDelayedCallback_DO_NOT_USE: function (a, b, c) {
          a = i(a, c, { delay: b });
          return a;
        },
        cancelDelayedCallback_DO_NOT_USE: function (a) {
          a = a;
          return j(a);
        },
        startEventProfiling: function () {
          var a;
          a =
            (a = b("SchedulerFb-Internals_DO_NOT_USE").unstable_Profiling) ==
            null
              ? void 0
              : a.startLoggingProfilingEvents;
          typeof a == "function" && a();
        },
        stopEventProfiling: function () {
          var a;
          a =
            (a = b("SchedulerFb-Internals_DO_NOT_USE").unstable_Profiling) ==
            null
              ? void 0
              : a.stopLoggingProfilingEvents;
          return typeof a == "function" ? a() : null;
        },
        makeSchedulerGlobalEntry: function (c, d) {
          c === void 0 && (c = null),
            d === void 0 && (d = !1),
            c !== null &&
              c !== void 0 &&
              b("SchedulerFb-Internals_DO_NOT_USE").unstable_forceFrameRate(c),
            d && k.startEventProfiling(),
            (a.ScheduleJSWork = function (a) {
              return function () {
                for (
                  var b = arguments.length, c = new Array(b), d = 0;
                  d < b;
                  d++
                )
                  c[d] = arguments[d];
                h
                  ? a.apply(void 0, c)
                  : k.deferUserBlockingRunAtCurrentPri_DO_NOT_USE(function () {
                      h = !0;
                      try {
                        a.apply(void 0, c);
                      } finally {
                        h = !1;
                      }
                    });
              };
            });
        },
      };
    e.exports = k;
  },
  null
);
__d(
  "forEachObject",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = Object.prototype.hasOwnProperty;
    function a(a, b, c) {
      for (var d in a) {
        var e = d;
        g.call(a, e) && b.call(c, a[e], e, a);
      }
    }
    f["default"] = a;
  },
  66
);
__d(
  "joinClasses",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = a || "",
        c = arguments.length <= 1 ? 0 : arguments.length - 1;
      for (var d = 0; d < c; d++) {
        var e =
          d + 1 < 1 || arguments.length <= d + 1 ? void 0 : arguments[d + 1];
        e != null && e !== "" && (b = (b ? b + " " : "") + e);
      }
      return b;
    }
    f["default"] = a;
  },
  66
);
__d(
  "VisualCompletionConstants",
  [],
  function (a, b, c, d, e, f) {
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
      CSS_IMG: "css-img",
    };
    f["default"] = a;
  },
  66
);
__d(
  "VisualCompletionAttributes",
  ["VisualCompletionConstants"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = {
      IGNORE:
        ((a = {}),
        (a[(h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME] =
          h.IGNORE),
        a),
      IGNORE_DYNAMIC: ((b = {}), (b[h.ATTRIBUTE_NAME] = h.IGNORE_DYNAMIC), b),
      IGNORE_LATE_MUTATION:
        ((d = {}), (d[h.ATTRIBUTE_NAME] = h.IGNORE_LATE_MUTATION), d),
      LOADING_STATE: ((e = {}), (e[h.ATTRIBUTE_NAME] = h.LOADING_STATE), e),
      MEDIA_VC_IMAGE: ((f = {}), (f[h.ATTRIBUTE_NAME] = h.MEDIA_VC_IMAGE), f),
      CSS_IMG: ((c = {}), (c[h.ATTRIBUTE_NAME] = h.CSS_IMG), c),
    };
    g["default"] = a;
  },
  98
);
__d(
  "QuickMarkersSrcFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1836368");
    b = d("FalcoLoggerInternal").create("quick_markers_src", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "React",
  ["cr:1108857", "cr:1294158"],
  function (a, b, c, d, e, f) {
    a = b("cr:1294158");
    e.exports = a;
  },
  null
);
