/*FB_PKG_DELIM*/

__d(
  "ImageDownloadTracker",
  ["NetworkStatus", "Promise", "setTimeout"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = 2,
      j = 250;
    function a(a, d) {
      var e = 0,
        f;
      return new (h || (h = b("Promise")))(function (b, g) {
        function h() {
          var f = new Image();
          f.onload = function () {
            c("NetworkStatus").reportSuccess(), b();
          };
          f.onerror = function () {
            var a = e <= i;
            a ? c("setTimeout")(h, j) : (c("NetworkStatus").reportError(), g());
          };
          e++;
          d();
          f.src = a;
        }
        c("NetworkStatus").isOnline()
          ? h()
          : (f = c("NetworkStatus").onChange(function (a) {
              a = a.online;
              a && (h(), f.remove());
            }));
      });
    }
    g["default"] = a;
  },
  98
);
__d(
  "setTimeoutCometInternals",
  ["JSScheduler"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = new Map(),
      j = 0;
    function a(a) {
      if (a != null) {
        var b = i.get(a);
        b !== void 0 &&
          (i["delete"](a),
          (h || (h = d("JSScheduler"))).cancelDelayedCallback_DO_NOT_USE(b));
      }
    }
    function b(a) {
      if (a != null) {
        var b = i.get(a);
        b !== void 0 &&
          (i["delete"](a),
          (h || (h = d("JSScheduler"))).cancelDelayedCallback_DO_NOT_USE(b));
      }
    }
    function c(a, b, c) {
      for (
        var e = arguments.length, f = new Array(e > 3 ? e - 3 : 0), g = 3;
        g < e;
        g++
      )
        f[g - 3] = arguments[g];
      var k = j;
      j += 1;
      if (typeof b !== "function") return k;
      var l = function e() {
          var g = (
            h || (h = d("JSScheduler"))
          ).scheduleDelayedCallback_DO_NOT_USE(a, c, e);
          i.set(k, g);
          b.apply(void 0, f);
        },
        m = (h || (h = d("JSScheduler"))).scheduleDelayedCallback_DO_NOT_USE(
          a,
          c,
          l
        );
      i.set(k, m);
      return k;
    }
    function e(a, b, c) {
      for (
        var e = arguments.length, f = new Array(e > 3 ? e - 3 : 0), g = 3;
        g < e;
        g++
      )
        f[g - 3] = arguments[g];
      var k = j;
      j += 1;
      if (typeof b !== "function") return k;
      var l = (h || (h = d("JSScheduler"))).scheduleDelayedCallback_DO_NOT_USE(
        a,
        c,
        function () {
          i["delete"](k), b.apply(void 0, f);
        }
      );
      i.set(k, l);
      return k;
    }
    g.clearInterval_DO_NOT_USE = a;
    g.clearTimeout_DO_NOT_USE = b;
    g.setIntervalAtPriority_DO_NOT_USE = c;
    g.setTimeoutAtPriority_DO_NOT_USE = e;
  },
  98
);
__d(
  "setTimeoutCometLoggingPri",
  ["JSScheduler", "setTimeoutCometInternals"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function a(a, b) {
      for (
        var c = arguments.length, e = new Array(c > 2 ? c - 2 : 0), f = 2;
        f < c;
        f++
      )
        e[f - 2] = arguments[f];
      return d(
        "setTimeoutCometInternals"
      ).setTimeoutAtPriority_DO_NOT_USE.apply(
        d("setTimeoutCometInternals"),
        [(h || (h = d("JSScheduler"))).priorities.unstable_Low, a, b].concat(e)
      );
    }
    g["default"] = a;
  },
  98
);
__d(
  "OneTraceCore",
  ["addAnnotations"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = null,
      i = null,
      j = new Map(),
      k = {
        "trace-start": new Set(),
        "trace-end": new Set(),
        "trace-end-before-logging": new Set(),
      },
      l = 1,
      m = null;
    function a(a, b, c, d) {
      var e = l++,
        f = {
          traceID: a,
          tracePolicy: b,
          traceType: c,
          instanceKey: e,
          status: "START",
          startTime: d,
          endTime: null,
          annotations: {
            string: {},
            int: {},
            double: {},
            bool: {},
            string_array: {},
            int_array: {},
            double_array: {},
            bool_array: {},
          },
          markerPoints: {},
        };
      j.set(a, f);
      k["trace-start"].forEach(function (a) {
        return a(f);
      });
      c === "INITIAL_LOAD" || c === "NAVIGATION"
        ? (h = f)
        : c === "INTERACTION" && (i = f);
      return f;
    }
    function b(a, b) {
      a = j.get(a);
      a && (a.tracePolicy = b);
    }
    function d(a) {
      m = a;
    }
    function e(a, b, d) {
      var e = j.get(a);
      if (e) {
        var f = n(),
          g = o();
        c("addAnnotations")(e.annotations, {
          string: {
            tracePolicy: e.tracePolicy,
            currentRouteTracePolicy: f == null ? void 0 : f.tracePolicy,
            recentInteractionTracePolicy: g == null ? void 0 : g.tracePolicy,
            lastNavigationTracePolicy: m,
          },
        });
        e.endTime = b;
        e.status = d;
        j["delete"](a);
        k["trace-end-before-logging"].forEach(function (a) {
          return a(e);
        });
        k["trace-end"].forEach(function (a) {
          return a(e);
        });
      }
      return e;
    }
    function f(a, b) {
      k[a].add(b);
      return function () {
        k[a]["delete"](b);
      };
    }
    function n() {
      return h;
    }
    function o() {
      return i;
    }
    e = {
      currentTraces: j,
      endTrace: e,
      subscribe: f,
      getLastNavigation: n,
      setLastNavigationTracePolicy: d,
      setTracePolicy: b,
      startTrace: a,
    };
    g["default"] = e;
  },
  98
);
__d(
  "VisibilityAPI",
  ["performanceNowSinceAppStart"],
  function (a, b, c, d, e, f, g) {
    var h =
      ((d = self.document) == null ? void 0 : d.visibilityState) !== void 0 ||
      ((e = self.document) == null ? void 0 : e.hidden) !== void 0;
    function a() {
      if (h)
        return document.visibilityState !== void 0
          ? document.visibilityState === "hidden"
          : document.hidden;
      else return !1;
    }
    function b(a) {
      document.addEventListener("visibilitychange", function (b) {
        b =
          (b = b == null ? void 0 : b.timeStamp) != null
            ? b
            : c("performanceNowSinceAppStart")();
        a(b);
      });
    }
    g.canUseVisibilityAPI = h;
    g.isVisibilityHidden = a;
    g.onVisibilityChange = b;
  },
  98
);
__d(
  "VisibilityState",
  ["VisibilityAPI", "performanceNowSinceAppStart"],
  function (a, b, c, d, e, f, g) {
    var h = 1e3,
      i = [],
      j = null,
      k = !1,
      l = new Set();
    k || (d("VisibilityAPI").isVisibilityHidden() && (j = 0), (k = !0));
    d("VisibilityAPI").canUseVisibilityAPI &&
      d("VisibilityAPI").onVisibilityChange(function (a) {
        m(a, d("VisibilityAPI").isVisibilityHidden()),
          l.forEach(function (b) {
            b(a, d("VisibilityAPI").isVisibilityHidden());
          });
      });
    function m(a, b) {
      b
        ? (j = a)
        : j != null &&
          (i.push({ end: a, start: j }), i.length > h && i.shift(), (j = null));
    }
    function a(a) {
      l.add(a);
      return function () {
        l["delete"](a);
      };
    }
    function b(a) {
      l["delete"](a);
    }
    function n(a, b) {
      var d = [],
        e = Array.from(i);
      if (j != null) {
        var f = j;
        e.push({ end: c("performanceNowSinceAppStart")(), start: f });
      }
      e.forEach(function (c) {
        c.start <= a && c.end > a
          ? c.end <= b
            ? d.push({ end: c.end, start: a })
            : d.push({ end: b, start: a })
          : c.start > a &&
            c.start <= b &&
            (c.end <= b
              ? d.push({ end: c.end, start: c.start })
              : d.push({ end: b, start: c.start }));
      });
      return d;
    }
    function e(a, b) {
      var c = 0;
      a = n(a, b);
      if (a.length > 0) {
        b = a[0];
        c += b.end - b.start;
      }
      return c;
    }
    function o(a, b) {
      var c = 0;
      a = n(a, b);
      a.forEach(function (a) {
        c += a.end - a.start;
      });
      return c;
    }
    function f(a, b) {
      a = o(a, b);
      return a > 0;
    }
    g.subscribe = a;
    g.unsubscribe = b;
    g.getHiddenSpans = n;
    g.firstHiddenTime = e;
    g.totalHiddenTime = o;
    g.wasHidden = f;
  },
  98
);
__d(
  "ImagePerfLogger",
  [
    "OneTraceCore",
    "VisibilityState",
    "addAnnotations",
    "performance",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function i(a) {
      a =
        (h || (h = c("performance"))) &&
        (h || (h = c("performance"))).getEntriesByName &&
        (h || (h = c("performance"))).getEntriesByName(a);
      return a && a[0];
    }
    function j(a) {
      a = a.match(/\.(\w+)(\?|$)/);
      if (a && a.length > 1) return a[1];
      else return "";
    }
    function a(a) {
      var b,
        e = a.elementTiming;
      if (!e) return;
      var f = e.url,
        g = a.commitTime,
        h = e.renderTime,
        k = f != null ? i(f) : null;
      typeof (k == null ? void 0 : k.startTime) === "number" &&
        (g = Math.min(g, k.startTime));
      typeof (k == null ? void 0 : k.responseEnd) === "number" &&
        (h = Math.max(h, k.responseEnd));
      var l = c("uuidv4")(),
        m = c("OneTraceCore").startTrace(
          l,
          (b =
            (b = c("OneTraceCore").getLastNavigation()) == null
              ? void 0
              : b.tracePolicy) != null
            ? b
            : "",
          "IMAGE",
          g
        );
      if (
        typeof ((b = a.element) == null ? void 0 : b.getAttribute) ===
        "function"
      ) {
        b = a.element.getAttribute("data-imgperflogname");
        b != null && b !== "" && a.annotationString.set("imageName", b);
      }
      if (e.loadTime != null) {
        b = e.loadTime;
        a.points.set("loadTime", b);
        h = Math.max(h, b);
      }
      if (e.renderTime != null) {
        b = e.renderTime;
        a.points.set("paintTime", b);
        h = Math.max(h, b);
      }
      b = f != null ? j(f) : null;
      b != null && b !== "" && a.annotationString.set("fileExt", b);
      a.annotationInt.set(
        "hidden",
        Number(d("VisibilityState").wasHidden(g, h))
      );
      e.intersectionRect != null &&
        (a.annotationInt.set("naturalHeight", e.naturalHeight),
        a.annotationInt.set("naturalWidth", e.naturalWidth),
        a.annotationInt.set("height", e.intersectionRect.height),
        a.annotationInt.set("width", e.intersectionRect.width));
      a.element != null &&
        (a.annotationInt.set("viewWidth", a.element.clientWidth),
        a.annotationInt.set("viewHeight", a.element.clientHeight));
      a.annotationString.set("identifier", e.identifier);
      k != null &&
        ([
          "connectEnd",
          "connectStart",
          "domainLookupEnd",
          "domainLookupStart",
          "fetchStart",
          "redirectEnd",
          "redirectStart",
          "requestStart",
          "responseEnd",
          "responseStart",
          "secureConnectionStart",
          "startTime",
          "workerStart",
        ].forEach(function (a) {
          k != null &&
            typeof k[a] === "number" &&
            k[a] >= g &&
            (m.markerPoints[a] = { timeSinceStart: k[a] });
        }),
        ["decodedBodySize", "encodedBodySize", "transferSize"].forEach(
          function (b) {
            k != null &&
              typeof k[b] === "number" &&
              a.annotationInt.set(b, k[b]);
          }
        ),
        k != null &&
          typeof k.nextHopProtocol === "string" &&
          a.annotationString.set("nextHopProtocol", k.nextHopProtocol));
      b = f != null ? f.match(/[?&]cb=([^&]+).*$/) : null;
      b && b.length > 1 && a.annotationString.set("cbParameter", b[1]);
      c("addAnnotations")(m.annotations, {
        string: Object.fromEntries(a.annotationString),
        int: Object.fromEntries(a.annotationInt),
      });
      a.points.forEach(function (a, b) {
        m.markerPoints[b] = { timeSinceStart: a };
      });
      c("OneTraceCore").endTrace(l, h, "SUCCESS");
    }
    g.logImagePerf = a;
  },
  98
);
__d(
  "ImagePerfTracker",
  ["ImagePerfLogger", "OneTraceCore", "setTimeoutAcrossTransitions"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = 6e4,
      i = new Map(),
      j =
        typeof ((e = window.PerformanceObserver) == null
          ? void 0
          : (f = e.supportedEntryTypes) == null
          ? void 0
          : f.includes) === "function" &&
        window.PerformanceObserver.supportedEntryTypes.includes("element"),
      k = !1,
      l = null;
    function a() {
      if (k) return;
      k = !0;
      if (!j) return;
      typeof WeakSet === "function" &&
        c("OneTraceCore").subscribe("trace-start", function (a) {
          (a.traceType === "INITIAL_LOAD" || a.traceType === "NAVIGATION") &&
            (l = new WeakSet());
        });
      var a = new window.PerformanceObserver(function (a) {
        a = a.getEntries();
        a.forEach(function (a) {
          var b = a.element;
          if (b) {
            b = i.get(b);
            b && ((b.elementTiming = a), n(b));
          }
        });
      });
      a.observe({ buffered: !0, type: "element" });
    }
    function b(a, b, d, e) {
      a = a;
      if (!j || !k) return;
      if (!a.hasAttribute("elementtiming")) return;
      var f = i.get(a);
      if (f && f.url === d) return;
      if ((f = l) == null ? void 0 : f.has(a)) return;
      var g = {
        annotationInt: new Map(),
        annotationString: new Map(),
        setTimeoutID: null,
        commitTime: b,
        element: a,
        points: new Map(),
        url: d,
      };
      Object.keys(e).forEach(function (a) {
        var b = e[a];
        typeof b === "string"
          ? g.annotationString.set(a, b)
          : typeof b === "number" && g.annotationInt.set(a, b);
      });
      g.points.set("commitTime", b);
      g.annotationString.set(
        "tracePolicy",
        (d =
          (f = c("OneTraceCore").getLastNavigation()) == null
            ? void 0
            : f.tracePolicy) != null
          ? d
          : ""
      );
      i.set(a, g);
      g.setTimeoutID = c("setTimeoutAcrossTransitions")(function () {
        m(g);
      }, h);
    }
    function m(a) {
      a.setTimeoutID != null &&
        (clearTimeout(a.setTimeoutID), (a.setTimeoutID = null)),
        i["delete"](a.element);
    }
    function n(a) {
      if (a.elementTiming != null && a.elementTiming.loadTime >= a.commitTime) {
        var b;
        (b = l) == null ? void 0 : b.add(a.element);
        d("ImagePerfLogger").logImagePerf(a);
        m(a);
      }
    }
    g.init = a;
    g.trackImagePerf = b;
  },
  98
);
__d(
  "LongtaskObserver",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g =
        typeof ((c = window.PerformanceObserver) == null
          ? void 0
          : (d = c.supportedEntryTypes) == null
          ? void 0
          : d.includes) === "function" &&
        window.PerformanceObserver.supportedEntryTypes.includes("longtask"),
      h = new Set(),
      i = !1;
    function a() {
      if (!i) {
        if (g) {
          var a = new window.PerformanceObserver(function (a) {
            a = a.getEntries();
            a.forEach(function (a) {
              h.forEach(function (b) {
                b(a);
              });
            });
          });
          a.observe({ buffered: !0, type: "longtask" });
        }
        i = !0;
      }
    }
    function b(a) {
      if (g) {
        h.add(a);
        return function () {
          h["delete"](a);
        };
      } else return function () {};
    }
    f.canUseLongTasksAPI = g;
    f.init = a;
    f.subscribe = b;
  },
  66
);
__d(
  "WebAPIs",
  ["VisibilityAPI"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    c = [];
    e =
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
        ? window.IntersectionObserver
        : null;
    function a(a) {
      return a.isIntersecting != null
        ? a.isIntersecting
        : a.intersectionRatio > 0 ||
            (a.intersectionRect &&
              (a.intersectionRect.height > 0 || a.intersectionRect.width > 0));
    }
    e == null && c.push("IntersectionObserver");
    f = window.MutationObserver || window.WebKitMutationObserver;
    f == null && c.push("MutationObserver");
    d("VisibilityAPI").canUseVisibilityAPI || c.push("VisibilityAPI");
    d = window.requestAnimationFrame;
    d == null && c.push("requestAnimationFrame");
    var h = window.cancelAnimationFrame;
    d == null && c.push("cancelAnimationFrame");
    function b(a) {
      window.addEventListener("beforeunload", a);
      return {
        remove: function () {
          try {
            window.removeEventListener("beforeunload", a);
          } catch (a) {
            if (a.message !== "can't access dead object") throw a;
          }
        },
      };
    }
    g.unavailableAPIs = c;
    g.IntersectionObserver = e;
    g.intersectionObserverEntryIsIntersecting = a;
    g.MutationObserver = f;
    g.requestAnimationFrame = d;
    g.cancelAnimationFrame = h;
    g.onBeforeUnload = b;
  },
  98
);
__d(
  "ResponsivenessTracker",
  [
    "LongtaskObserver",
    "OneTraceCore",
    "VisibilityState",
    "WebAPIs",
    "addAnnotations",
    "performanceNowSinceAppStart",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = 100,
      i = 3,
      j = ["click", "keyup"],
      k = !1,
      l = 1,
      m =
        typeof ((b = window.PerformanceObserver) == null
          ? void 0
          : (e = b.supportedEntryTypes) == null
          ? void 0
          : e.includes) === "function" &&
        window.PerformanceObserver.supportedEntryTypes.includes("event");
    function n(a) {
      var b = new Set();
      c("OneTraceCore").currentTraces.forEach(function (c) {
        c.traceID !== a.traceID &&
          c.traceType !== "RESPONSIVENESS" &&
          b.add(c.traceType);
      });
      b.size > 0 &&
        c("addAnnotations")(a.annotations, {
          string_array: { currentTraceTypes: Array.from(b).sort() },
        });
    }
    var o = null;
    function p(a, b) {
      if (o) {
        var d = o,
          e = d.metrics.annotations;
        d.navigationMetrics.endTime != null &&
          (d.metrics.markerPoints.navigationEnd = {
            timeSinceStart: d.navigationMetrics.endTime,
          });
        for (var f in d.longtaskStat) {
          var g,
            h = d.longtaskStat[f];
          c("addAnnotations")(e, {
            int:
              ((g = {}),
              (g[f + "Count"] = h.count),
              (g[f + "Total"] = h.total),
              (g[f + "Max"] = h.max),
              (g[f + "Avg"] = h.count > 0 ? h.total / h.count : 0),
              g),
          });
        }
        c("addAnnotations")(e, {
          int: { ST200: d.ST200, ST500: d.ST500, ST1000: d.ST1000 },
          string: { exitAction: a },
        });
        d.metrics.tracePolicy = d.navigationMetrics.tracePolicy;
        c("OneTraceCore").endTrace(d.metrics.traceID, b, "SUCCESS");
      }
    }
    function q(a, b, c, d) {
      if (o) {
        var e = o,
          f = e.longtaskStat[a];
        f.count++;
        f.total += c;
        f.max = Math.max(f.max, c);
        var g = null;
        f.count === d
          ? (g = a + "_{n}")
          : f.count < d && (g = a + "_" + f.count);
        g != null &&
          ((e.metrics.markerPoints[g + "_start"] = { timeSinceStart: b }),
          (e.metrics.markerPoints[g + "_end"] = { timeSinceStart: b + c }));
      }
    }
    var r = null;
    function s(a, b) {
      if (r) {
        var d = r;
        d &&
          (o = {
            metrics: c("OneTraceCore").startTrace(
              c("uuidv4")(),
              a,
              "RESPONSIVENESS",
              b
            ),
            navigationMetrics: d,
            longtaskStat: {
              inputDelay: { count: 0, total: 0, max: 0 },
              longtask: { count: 0, total: 0, max: 0 },
            },
            ST200: 0,
            ST500: 0,
            ST1000: 0,
          });
      }
    }
    function a(a) {
      if (!k) {
        var b;
        k = !0;
        if (!m || !d("LongtaskObserver").canUseLongTasksAPI) return;
        var e = (b = a.Responsiveness.overrideDelayThreshold) != null ? b : h,
          f = (b = a.Responsiveness.overrideMaxSubspans) != null ? b : i;
        d("LongtaskObserver").subscribe(function (b) {
          var d;
          if (b.duration < e) return;
          q("longtask", b.startTime, b.duration, f);
          if (l > a.Responsiveness.INSTANCE_COUNT_LIMIT) return;
          d = c("OneTraceCore").startTrace(
            c("uuidv4")(),
            (d = c("OneTraceCore").getLastNavigation()) == null
              ? void 0
              : d.tracePolicy,
            "LONGTASK",
            b.startTime
          );
          c("addAnnotations")(d.annotations, { int: { instanceNum: l++ } });
          n(d);
          c("OneTraceCore").endTrace(
            d.traceID,
            b.startTime + b.duration,
            "SUCCESS"
          );
        });
        if (m) {
          var g = new Set(
            (b = a.Responsiveness.overrideDelayedEventTypeFilter) != null
              ? b
              : j
          );
          b = new window.PerformanceObserver(function (b) {
            b.getEntries().forEach(function (b) {
              if (!g.has(b.name)) return;
              var h = b.processingStart - b.startTime;
              if (h >= e) {
                h = c("OneTraceCore").startTrace(
                  c("uuidv4")(),
                  (h = c("OneTraceCore").getLastNavigation()) == null
                    ? void 0
                    : h.tracePolicy,
                  "INPUT_DELAY",
                  b.startTime
                );
                var i = b.processingStart - b.startTime;
                c("addAnnotations")(h.annotations, {
                  int: {
                    hidden: Number(
                      d("VisibilityState").wasHidden(
                        b.startTime,
                        b.processingStart
                      )
                    ),
                  },
                  string: { inputEventType: b.name },
                });
                n(h);
                if (
                  a.Responsiveness.getReactComponentStackFromDOMElement !=
                    null &&
                  b.target != null
                ) {
                  var j = a.Responsiveness.getReactComponentStackFromDOMElement,
                    k = b.target;
                  j = j(k);
                  if (j != null) {
                    k = j.indexOf("HeroPagelet");
                    k >= 0 && j.splice(k);
                    c("addAnnotations")(h.annotations, {
                      string_array: { reactStack: j },
                    });
                  }
                }
                c("OneTraceCore").endTrace(
                  h.traceID,
                  b.processingStart,
                  "SUCCESS"
                );
                q("inputDelay", b.startTime, i, f);
                o != null &&
                  i >= 200 &&
                  ((o.ST200 += i),
                  i >= 500 && ((o.ST500 += i), i >= 1e3 && (o.ST1000 += i)));
              }
            });
          });
          b.observe({ buffered: !0, type: "event" });
        }
        c("OneTraceCore").currentTraces.forEach(function (a) {
          a.traceType === "INITIAL_LOAD" &&
            ((r = a), s(a.tracePolicy, a.startTime));
        });
        c("OneTraceCore").subscribe("trace-start", function (a) {
          (a.traceType === "INITIAL_LOAD" || a.traceType === "NAVIGATION") &&
            (o != null && p("navigation", a.startTime),
            (r = a),
            s(a.tracePolicy, a.startTime));
        });
        d("VisibilityState").subscribe(function (a, b) {
          if (b) p("VisibilityState", a);
          else {
            b =
              (b = c("OneTraceCore").getLastNavigation()) == null
                ? void 0
                : b.tracePolicy;
            a = a;
            s(b, a);
          }
        });
        d("WebAPIs").onBeforeUnload(function () {
          p("unload", c("performanceNowSinceAppStart")());
        });
      }
    }
    g.init = a;
  },
  98
);
__d(
  "ScrollPerfTracker",
  [
    "LongtaskObserver",
    "OneTraceCore",
    "addAnnotations",
    "clearTimeout",
    "performanceNowSinceAppStart",
    "setTimeoutCometLoggingPri",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = new Map(),
      i = "data-scrolltracepolicy",
      j = 200,
      k = 500,
      l = !1;
    function a(a) {
      if (!l) {
        a = function (a) {
          var b = h.get(a.target);
          b ||
            ((a.target === window.document ||
              (a.target instanceof Element &&
                typeof a.target.getAttribute === "function" &&
                a.target.getAttribute(i) != null)) &&
              (b = m(a)));
          b &&
            ((b.metrics.markerPoints.lastScrollEvent = {
              timeSinceStart: a.timeStamp,
            }),
            b.scrollEventCount++,
            b.debounceTimeoutID != null &&
              c("clearTimeout")(b.debounceTimeoutID),
            (b.debounceTimeoutID = c("setTimeoutCometLoggingPri")(
              n,
              k,
              b,
              a.target
            )));
        };
        d("LongtaskObserver").canUseLongTasksAPI &&
          window.addEventListener("scroll", a, { capture: !0, passive: !0 });
        l = !0;
      }
    }
    function m(a) {
      var b = c("OneTraceCore").getLastNavigation(),
        e = a.timeStamp,
        f = c("uuidv4")(),
        g = b == null ? void 0 : b.tracePolicy,
        j =
          a.target instanceof Element &&
          typeof a.target.getAttribute === "function"
            ? a.target.getAttribute(i)
            : null;
      j = c("OneTraceCore").startTrace(f, (f = j) != null ? f : g, "SCROLL", e);
      var k = {
        longtasks: [],
        scrollEventCount: 0,
        metrics: j,
        unsubscribeLongtaskObserver: d("LongtaskObserver").subscribe(function (
          a
        ) {
          k.longtasks.push(a);
        }),
      };
      c("addAnnotations")(j.annotations, {
        int: { isNavigationPending: Number(!b || b.endTime == null) },
        string: { traceType: "SCROLL" },
      });
      j.markerPoints.firstScrollEvent = { timeSinceStart: e };
      j.markerPoints.handlerStart = {
        timeSinceStart: c("performanceNowSinceAppStart")(),
      };
      (b == null ? void 0 : b.endTime) != null &&
        c("addAnnotations")(j.annotations, {
          int: { timeSinceLastNavigation: e - b.endTime },
        });
      h.set(a.target, k);
      return k;
    }
    function n(a, b) {
      var d = c("performanceNowSinceAppStart")(),
        e = a.metrics;
      e.endTime = d;
      c("addAnnotations")(e.annotations, {
        int: {
          scrollDuration: d - e.startTime,
          scrollEventCount: a.scrollEventCount,
          longtaskCount: a.longtasks.length,
        },
      });
      var f = 0;
      if (a.longtasks.length > 0) {
        var g = 0,
          i = 0;
        a.longtasks.forEach(function (a) {
          a.duration >= j && i++,
            a.startTime < e.startTime
              ? (f += a.duration - e.startTime + a.startTime)
              : (f += a.duration),
            a.duration > g && (g = a.duration);
        });
        c("addAnnotations")(e.annotations, {
          int: {
            largeLongtaskCount: i,
            maxLongtaskDuration: g,
            avgLongtaskDuration: f / a.longtasks.length,
          },
        });
      }
      c("addAnnotations")(e.annotations, { int: { totalLongtaskDuration: f } });
      a.unsubscribeLongtaskObserver();
      h["delete"](b);
      c("OneTraceCore").endTrace(e.traceID, d, "SUCCESS");
    }
    function b(a, b) {
      b === void 0 && (b = c("performanceNowSinceAppStart")());
      var e = c("OneTraceCore").getLastNavigation();
      if (!e || e.endTime == null) return function () {};
      var f = [],
        g = c("OneTraceCore").startTrace(c("uuidv4")(), a, "SCROLL", b);
      c("addAnnotations")(g.annotations, {
        int: { isNavigationPending: 0 },
        string: { traceType: "SCROLL" },
      });
      var h = d("LongtaskObserver").subscribe(function (a) {
        f.push(a);
      });
      return function () {
        var a = c("performanceNowSinceAppStart")();
        h();
        g.endTime = a;
        c("addAnnotations")(g.annotations, {
          int: { scrollDuration: a - g.startTime, longtaskCount: f.length },
        });
        if (f.length > 0) {
          var b = 0,
            d = 0,
            e = 0;
          f.forEach(function (a) {
            a.duration >= j && e++,
              a.startTime < g.startTime
                ? (b += a.duration - g.startTime + a.startTime)
                : (b += a.duration),
              a.duration > d && (d = a.duration);
          });
          c("addAnnotations")(g.annotations, {
            int: {
              largeLongtaskCount: e,
              maxLongtaskDuration: d,
              avgLongtaskDuration: b / f.length,
              totalLongtaskDuration: b,
            },
          });
        }
        c("OneTraceCore").endTrace(g.traceID, a, "SUCCESS");
      };
    }
    g.SCROLL_PERF_ATTRIBUTE_NAME = i;
    g.init = a;
    g.customScrollTracker = b;
  },
  98
);
__d(
  "TypingPerfMetric",
  [
    "WebAPIs",
    "clearTimeout",
    "performanceNowSinceAppStart",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = 2e3;
    function i(a) {
      if (a.code === "Space" && a.ctrlKey && a.metaKey) return !0;
      return a.code === "Period" && a.getModifierState("OS") ? !0 : !1;
    }
    function a(a, b, d) {
      var e = null,
        f = 0,
        g = 0,
        i = 0,
        j = 0,
        l = [],
        m = null,
        n = function () {
          f !== 0 &&
            d({
              allTimes: l,
              averageTimeToRender: g,
              keypresses: f,
              max: i,
              min: j,
            }),
            (f = 0),
            (g = 0),
            (i = 0),
            (j = 0),
            (l = []);
        },
        o = function () {
          (e = null), n();
        },
        p = k(a, function (d) {
          d = d.timestamps;
          e == null
            ? ((e = a), b && b())
            : e !== a &&
              (n(),
              m != null && (c("clearTimeout")(m), (m = null)),
              (e = a),
              b && b());
          d = d.finalRAF - d.keydown;
          d > 0 &&
            (f++,
            l.push(d),
            (g = (g * (f - 1) + d) / f),
            d > i && (i = d),
            (d < j || j === 0) && (j = d));
          m != null && c("clearTimeout")(m);
          m = c("setTimeoutAcrossTransitions")(o, h);
        });
      return function () {
        p(), n(), m != null && (c("clearTimeout")(m), (m = null)), (e = null);
      };
    }
    var j = { lastRequestedAnimationFrame: null };
    function k(a, b) {
      var e = 20,
        f = new Float64Array(e),
        g = new Float64Array(e),
        h = new Float64Array(e),
        k = -1,
        l = -1,
        m = 0,
        n = !1,
        o = function (a) {
          (k = a.timeStamp),
            (l = c("performanceNowSinceAppStart")()),
            (n = i(a));
        },
        p = function () {
          n = !0;
        },
        q = function () {
          n = !0;
        };
      a.addEventListener("keydown", o);
      a.addEventListener("paste", p);
      a.addEventListener("cut", q);
      var r = !1,
        s = new MutationObserver(function (i) {
          if (n) {
            n = !1;
            k = -1;
            l = -1;
            return;
          }
          if (m >= e) {
            k = -1;
            l = -1;
            return;
          }
          var o = c("performanceNowSinceAppStart")(),
            p = !1;
          for (
            var i = i,
              q = Array.isArray(i),
              s = 0,
              i = q
                ? i
                : i[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var t;
            if (q) {
              if (s >= i.length) break;
              t = i[s++];
            } else {
              s = i.next();
              if (s.done) break;
              t = s.value;
            }
            t = t;
            t =
              t.type === "characterData" ||
              (t.type === "childList" && t.addedNodes.length !== 0) ||
              (t.type === "attributes" &&
                t.target.nodeName === "INPUT" &&
                t.attributeName === "value");
            if (!t || k === -1 || p) continue;
            f[m] = k;
            g[m] = l;
            h[m] = o;
            k = -1;
            l = -1;
            m++;
            p = !0;
            if (r) return;
            j.lastRequestedAnimationFrame = d("WebAPIs").requestAnimationFrame(
              function (c) {
                r = !1;
                var e = h[0];
                if (c - e < 0)
                  j.lastRequestedAnimationFrame = d(
                    "WebAPIs"
                  ).requestAnimationFrame(function (e) {
                    for (var i = 0; i < m; i++) {
                      var c = f[i],
                        d = h[i];
                      b({
                        delta: e - c,
                        element: a,
                        firedOnSecondRAF: !0,
                        mutations: m,
                        timestamps: { finalRAF: e, keydown: c, mutation: d },
                      });
                      f[i] = 0;
                      g[i] = 0;
                      h[i] = 0;
                    }
                    m = 0;
                  });
                else {
                  for (e = 0; e < m; e++) {
                    var i = f[e],
                      k = h[e];
                    b({
                      delta: c - i,
                      element: a,
                      firedOnSecondRAF: !0,
                      mutations: m,
                      timestamps: { finalRAF: c, keydown: i, mutation: k },
                    });
                    f[e] = 0;
                    g[e] = 0;
                    h[e] = 0;
                  }
                  m = 0;
                }
              }
            );
            r = !0;
          }
        });
      s.observe(a, {
        attributeFilter: ["value"],
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0,
      });
      return function () {
        s.disconnect();
        a.removeEventListener("keydown", o);
        a.removeEventListener("paste", p);
        a.removeEventListener("cut", q);
        var b = j.lastRequestedAnimationFrame;
        b != null && d("WebAPIs").cancelAnimationFrame(b);
      };
    }
    g.measureAverageTypingPerformance = a;
  },
  98
);
__d(
  "TypingPerfMetric.experimental",
  [
    "clearTimeout",
    "performanceNowSinceAppStart",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = 2e3,
      i = new Set([
        "insertText",
        "insertCompositionText",
        "insertFromComposition",
        "insertLineBreak",
        "insertParagraph",
        "deleteCompositionText",
        "deleteContentBackward",
        "deleteByComposition",
        "deleteContent",
        "deleteContentForward",
        "deleteWordBackward",
        "deleteWordForward",
        "deleteHardLineBackward",
        "deleteSoftLineBackward",
        "deleteHardLineForward",
        "deleteSoftLineForward",
      ]);
    function a(a, b, d) {
      var e = null,
        f = 0,
        g = 0,
        i = 0,
        j = 0,
        l = [],
        m = null,
        n = function () {
          f !== 0 &&
            d({
              allTimes: l,
              averageTimeToRender: g,
              keypresses: f,
              max: i,
              min: j,
            }),
            (f = 0),
            (g = 0),
            (i = 0),
            (j = 0),
            (l = []);
        },
        o = function () {
          (e = null), n();
        },
        p = k(a, function (d) {
          e == null
            ? ((e = a), b && b())
            : e !== a &&
              (n(),
              m != null && (c("clearTimeout")(m), (m = null)),
              (e = a),
              b && b()),
            d > 0 &&
              (f++,
              l.push(d),
              (g = (g * (f - 1) + d) / f),
              d > i && (i = d),
              (d < j || j === 0) && (j = d)),
            m != null && c("clearTimeout")(m),
            (m = c("setTimeoutAcrossTransitions")(o, h));
        });
      return function () {
        p(), n(), m != null && (c("clearTimeout")(m), (m = null)), (e = null);
      };
    }
    var j = { lastSetTimeout: null };
    function k(a, b) {
      var d = !1,
        e = function () {
          var a = c("performanceNowSinceAppStart")();
          j.lastSetTimeout = window.setTimeout(function () {
            if (d) {
              d = !1;
              return;
            }
            var e = c("performanceNowSinceAppStart")();
            b(e - a);
          }, 0);
        },
        f = function (a) {
          if (!i.has(a.inputType) || d) {
            d = !1;
            return;
          }
          e();
        },
        g = function (a) {
          a = a.keyCode;
          (a === 8 || a === 13) && e();
        },
        h = function () {
          d = !0;
        },
        k = function () {
          d = !0;
        };
      a.addEventListener("keydown", g, !0);
      a.addEventListener("beforeinput", f, !0);
      a.addEventListener("paste", h, !0);
      a.addEventListener("cut", k, !0);
      return function () {
        a.removeEventListener("keydown", g, !0);
        a.removeEventListener("beforeinput", f, !0);
        a.removeEventListener("paste", h, !0);
        a.removeEventListener("cut", k, !0);
        var b = j.lastSetTimeout;
        b != null && c("clearTimeout")(b);
      };
    }
    g.measureAverageTypingPerformance = a;
  },
  98
);
__d(
  "TypingPerfTracker",
  [
    "OneTraceCore",
    "TypingPerfMetric",
    "TypingPerfMetric.experimental",
    "WebAPIs",
    "addAnnotations",
    "performanceNowSinceAppStart",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = null;
    function i(a) {
      var b;
      return (b = (b = h) == null ? void 0 : b.has(a)) != null ? b : !1;
    }
    var j = !1,
      k =
        d("WebAPIs").requestAnimationFrame != null &&
        d("WebAPIs").cancelAnimationFrame != null;
    function a() {
      j || (typeof WeakMap === "function" && (h = new WeakMap()), (j = !0));
    }
    function b(a, b, e, f, g) {
      g =
        g === !0
          ? d("TypingPerfMetric").measureAverageTypingPerformance
          : d("TypingPerfMetric.experimental").measureAverageTypingPerformance;
      if (h == null || !j || !k) return function () {};
      a !== e && e != null && i(e) && l(e);
      if (i(a)) return function () {};
      var m = null,
        n = g(
          a,
          function () {
            var a = c("uuidv4")();
            m = c("OneTraceCore").startTrace(
              a,
              b,
              "TYPING",
              c("performanceNowSinceAppStart")()
            );
            a =
              (a = c("OneTraceCore").getLastNavigation()) == null
                ? void 0
                : a.tracePolicy;
            c("addAnnotations")(m.annotations, {
              string: { routeTracePolicy: a, identifier: b },
            });
          },
          function (a) {
            var b = a.allTimes,
              d = a.averageTimeToRender,
              e = a.keypresses,
              g = a.max;
            a = a.min;
            if (m) {
              var h = m,
                i = 0;
              b.forEach(function (a) {
                a < 50 && i++;
              });
              if (f)
                for (b in f)
                  if (typeof f[b] === "string") {
                    var j;
                    c("addAnnotations")(h.annotations, {
                      string: ((j = {}), (j[b] = f[b]), j),
                    });
                  } else if (typeof f[b] === "number") {
                    c("addAnnotations")(h.annotations, {
                      int: ((j = {}), (j[b] = f[b]), j),
                    });
                  }
              c("addAnnotations")(h.annotations, {
                double: {
                  averageTimeToRender: d,
                  keypresses: e,
                  keypressesBelow50ms: i,
                  max: g,
                  min: a,
                },
              });
              c("OneTraceCore").endTrace(
                h.traceID,
                c("performanceNowSinceAppStart")(),
                "SUCCESS"
              );
            }
          }
        );
      e = function () {
        var b;
        n();
        (b = h) == null ? void 0 : b["delete"](a);
      };
      (g = h) == null ? void 0 : g.set(a, e);
      return e;
    }
    function l(a) {
      if (h == null) return;
      a = h.get(a);
      a && a();
    }
    g.init = a;
    g.trackTypingPerf = b;
    g.unregisterTypingPerf = l;
  },
  98
);
__d(
  "OneTraceSetup",
  [
    "ImagePerfTracker",
    "LongtaskObserver",
    "ResponsivenessTracker",
    "ScrollPerfTracker",
    "TypingPerfTracker",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = null;
    function a(a) {
      h == null &&
        ((h = Object.freeze(a)),
        (h.Scroll.enableTracking || h.Responsiveness.enableTracking) &&
          d("LongtaskObserver").init(),
        h.Scroll.enableTracking && d("ScrollPerfTracker").init(h),
        h.Responsiveness.enableTracking && d("ResponsivenessTracker").init(h),
        h.Image.enableTracking && d("ImagePerfTracker").init(),
        h.Typing.enableTracking && d("TypingPerfTracker").init());
    }
    g.setup = a;
  },
  98
);
__d(
  "one-trace",
  [
    "ImagePerfTracker",
    "OneTraceCore",
    "OneTraceSetup",
    "ScrollPerfTracker",
    "TypingPerfTracker",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = babelHelpers["extends"]({}, c("OneTraceCore"), {
      setup: d("OneTraceSetup").setup,
      trackImagePerf: d("ImagePerfTracker").trackImagePerf,
      customScrollTracker: d("ScrollPerfTracker").customScrollTracker,
      unregisterTypingPerf: d("TypingPerfTracker").unregisterTypingPerf,
      trackTypingPerf: d("TypingPerfTracker").trackTypingPerf,
      SCROLL_PERF_ATTRIBUTE_NAME:
        d("ScrollPerfTracker").SCROLL_PERF_ATTRIBUTE_NAME,
    });
    g["default"] = a;
  },
  98
);
__d(
  "ResourceTimingStore",
  ["performance"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = 4e3,
      j = 3e3,
      k = new Map(),
      l = !1;
    function m() {
      var a = Array.from(k.entries());
      k = new Map(a.slice(-j));
    }
    function n(a) {
      var b = a.indexOf("#");
      return b === -1 ? a : a.slice(0, b);
    }
    function o(a) {
      for (
        var a = a,
          b = Array.isArray(a),
          c = 0,
          a = b
            ? a
            : a[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        var d;
        if (b) {
          if (c >= a.length) break;
          d = a[c++];
        } else {
          c = a.next();
          if (c.done) break;
          d = c.value;
        }
        d = d;
        if (!(d instanceof PerformanceResourceTiming)) continue;
        var e = "";
        try {
          e = new URL(d.name).pathname;
        } catch (a) {}
        if (!/\.(css|js)$/.test(e)) continue;
        e = d;
        if (
          !(
            e != null &&
            typeof e === "object" &&
            typeof e.encodedBodySize === "number" &&
            typeof e.decodedBodySize === "number" &&
            typeof e.transferSize === "number"
          )
        )
          continue;
        k.set(n(d.name), e);
      }
      k.size > i && m();
    }
    function p(a) {
      o(a.getEntries());
    }
    function q() {
      if (l) return;
      l = !0;
      var a;
      if (typeof PerformanceObserver !== "undefined") {
        a = new PerformanceObserver(p);
        try {
          a.observe({ buffered: !0, type: "resource" });
        } catch (a) {}
      }
      typeof (h || (h = c("performance"))).getEntriesByType === "function" &&
        o((h || (h = c("performance"))).getEntriesByType("resource"));
    }
    function a(a) {
      q();
      return k.get(n(a));
    }
    g.init = q;
    g.getEntryForURL = a;
  },
  98
);
__d(
  "objectEntries",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return Object.entries(a);
    }
    f["default"] = a;
  },
  66
);
__d(
  "foregroundRequestAnimationFrame",
  [
    "Visibility",
    "cancelAnimationFrame",
    "clearTimeout",
    "requestAnimationFrame",
    "setTimeout",
  ],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      if (c("Visibility").isHidden()) {
        var b = c("setTimeout")(a, 0);
        return function () {
          c("clearTimeout")(b);
        };
      } else {
        var d = c("requestAnimationFrame")(a);
        return function () {
          c("cancelAnimationFrame")(d);
        };
      }
    }
    g.foregroundRequestAnimationFrame = a;
  },
  98
);
__d(
  "timeSinceAppStart",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "CLS",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g =
      typeof ((b = window.PerformanceObserver) == null
        ? void 0
        : (c = b.supportedEntryTypes) == null
        ? void 0
        : c.includes) === "function" &&
      window.PerformanceObserver.supportedEntryTypes.includes("layout-shift");
    function a() {
      if (!g) return null;
      var a = 0,
        b = 0,
        c = [],
        d = new window.PerformanceObserver(function (d) {
          for (
            var d = d.getEntries(),
              e = Array.isArray(d),
              f = 0,
              d = e
                ? d
                : d[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var g;
            if (e) {
              if (f >= d.length) break;
              g = d[f++];
            } else {
              f = d.next();
              if (f.done) break;
              g = f.value;
            }
            g = g;
            if (!g.hadRecentInput) {
              var h = c[0],
                i = c[c.length - 1];
              b &&
              g.startTime - i.startTime < 1e3 &&
              g.startTime - h.startTime < 5e3
                ? ((b += g.value), c.push(g))
                : ((b = g.value), (c = [g]));
              b > a && (a = b);
            }
          }
        });
      d.observe({ buffered: !0, type: "layout-shift" });
      return function () {
        d.disconnect();
        return a;
      };
    }
    f.getCLSCallback = a;
  },
  66
);
__d(
  "LCP",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g =
      typeof ((b = window.PerformanceObserver) == null
        ? void 0
        : (c = b.supportedEntryTypes) == null
        ? void 0
        : c.includes) === "function" &&
      window.PerformanceObserver.supportedEntryTypes.includes(
        "largest-contentful-paint"
      );
    function a() {
      if (!g) return null;
      var a = null,
        b = new window.PerformanceObserver(function (b) {
          for (
            var b = b.getEntries(),
              c = Array.isArray(b),
              d = 0,
              b = c
                ? b
                : b[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var e;
            if (c) {
              if (d >= b.length) break;
              e = b[d++];
            } else {
              d = b.next();
              if (d.done) break;
              e = d.value;
            }
            e = e;
            a = e;
          }
        });
      b.observe({ buffered: !0, type: "largest-contentful-paint" });
      return function () {
        b.disconnect();
        return a == null ? null : { timestamp: a.startTime };
      };
    }
    f.getLCPCallback = a;
  },
  66
);
__d(
  "ResourceDownloadLogger",
  ["performance"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = { JS: "js", CSS: "css", IMG: "img", TRANSLATIONS: "translations" };
    function j(a) {
      var b = a.indexOf("?");
      return b === -1 ? a : a.substring(0, b);
    }
    function k(a, b) {
      var c = b.substring(b.lastIndexOf(".") + 1);
      if (c === "js")
        return b.includes("rsrc-translations.php") ? i.TRANSLATIONS : i.JS;
      else if (c === "css") return i.CSS;
      return a;
    }
    function l() {
      return Object.keys(i).reduce(function (a, b) {
        b = i[b];
        a[b] = {
          cacheCount: 0,
          cacheRate: 0,
          encodedBodySize: 0,
          decodedBodySize: 0,
          totalCount: 0,
          transferSize: 0,
        };
        return a;
      }, {});
    }
    function a(a, b) {
      if (typeof (h || (h = c("performance"))).getEntriesByType !== "function")
        return new Map();
      var d = l(),
        e = (h || (h = c("performance")))
          .getEntriesByType("resource")
          .filter(function (c) {
            return c.startTime >= a && c.startTime <= b;
          })
          .map(function (a) {
            return {
              encodedBodySize: a.encodedBodySize,
              decodedBodySize: a.decodedBodySize,
              transferSize: a.transferSize,
              type: k(a.initiatorType, j(a.name)),
            };
          })
          .filter(function (a) {
            return d[a.type];
          });
      e.forEach(function (a) {
        var b = d[a.type];
        b.encodedBodySize += a.encodedBodySize;
        b.decodedBodySize += a.decodedBodySize;
        b.transferSize += a.transferSize;
        b.totalCount++;
        a.transferSize === 0 && b.cacheCount++;
      });
      e = new Map();
      for (var f in d) {
        var g = d[f];
        g.totalCount > 0 &&
          (g.cacheRate = Math.round((g.cacheCount / g.totalCount) * 100));
        for (var i in g) e.set(f + "_" + i, g[i]);
      }
      return e;
    }
    g["default"] = a;
  },
  98
);
__d(
  "ResourceTimingAPI",
  ["performance"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = !1,
      j = !1;
    function a() {
      i ||
        (typeof ((h || (h = c("performance"))) == null
          ? void 0
          : (h || (h = c("performance"))).getEntriesByName) !== "function" ||
        typeof ((h || (h = c("performance"))) == null
          ? void 0
          : (h || (h = c("performance"))).getEntriesByType) !== "function"
          ? ((j = !1), (i = !0))
          : (h || (h = c("performance"))).getEntriesByType("resource").length >
              0 && ((j = !0), (i = !0)));
      return j;
    }
    function b(a) {
      if (typeof (h || (h = c("performance"))).getEntriesByName !== "function")
        return null;
      var b = (h || (h = c("performance"))).getEntriesByName(a);
      b.length === 0 &&
        a.indexOf("#") >= 0 &&
        (b = (h || (h = c("performance"))).getEntriesByName(a.split("#")[0]));
      return b && b[0];
    }
    g.canUseResourceTimingAPI = a;
    g.getResourceTiming = b;
  },
  98
);
__d(
  "VisualCompletionTraceObserver",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = [],
      h = [];
    a = {
      subscribe: function (a) {
        g.push(a);
      },
      subscribeStart: function (a) {
        h.push(a);
      },
      unsubscribe: function (a) {
        g = g.filter(function (b) {
          return b !== a;
        });
      },
      unsubscribeStart: function (a) {
        h = h.filter(function (b) {
          return b !== a;
        });
      },
      emit: function (a) {
        g.forEach(function (b) {
          return b(a);
        });
      },
      emitStart: function (a) {
        h.forEach(function (b) {
          return b(a);
        });
      },
    };
    f["default"] = a;
  },
  66
);
__d(
  "currentVCTraces",
  [],
  function (a, b, c, d, e, f) {
    var g = null,
      h = null,
      i = new Map();
    function a() {
      return new Map(i);
    }
    function b(a, b) {
      i.set(a, b);
    }
    function c(a) {
      i["delete"](a);
    }
    function d() {
      return g;
    }
    function e(a) {
      g = a;
    }
    function j() {
      return h;
    }
    function k(a) {
      h = a;
    }
    f.getCurrentVCTraces = a;
    f.addVCTrace = b;
    f.removeVCTrace = c;
    f.getCurrentNavigationVCTrace = d;
    f.setCurrentNavigationVCTrace = e;
    f.getLastNavigationVCReport = j;
    f.setLastNavigationVCReport = k;
  },
  66
);
__d(
  "VisualCompletionUtil",
  [
    "ImageDownloadTracker",
    "ResourceTimingAPI",
    "VisualCompletionConstants",
    "addAnnotations",
    "currentVCTraces",
    "performance",
    "performanceNavigationStart",
    "performanceNowSinceAppStart",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = /url\(.*(http.*)\)/gi;
    function k(a) {
      return (a.right - a.left) * (a.bottom - a.top);
    }
    function l(a, b) {
      return {
        bottom: Math.max(Math.min(a.bottom, b.bottom), b.top),
        left: Math.min(Math.max(a.left, b.left), b.right),
        right: Math.max(Math.min(a.right, b.right), b.left),
        top: Math.min(Math.max(a.top, b.top), b.bottom),
      };
    }
    function m(a) {
      return { height: window.innerHeight, width: window.innerWidth };
    }
    function a(a, b) {
      if (typeof a.getBoundingClientRect !== "function") return !1;
      var c = m(b);
      a = a.getBoundingClientRect();
      var d = a.bottom,
        e = a.left,
        f = a.right;
      a = a.top;
      d = k(
        l(
          { bottom: d, left: e, right: f, top: a },
          { bottom: c.height, left: 0, right: c.width, top: -n(b).scrollY }
        )
      );
      return d > 0;
    }
    function n(a) {
      var b;
      a = (a = window.scrollX) != null ? a : 0;
      b = (b = window.scrollY) != null ? b : 0;
      return { scrollX: a, scrollY: b };
    }
    function b(a, b) {
      var c = 0;
      a = a;
      while (a && a.offsetParent && typeof a.offsetTop === "number")
        (c += a.offsetTop), (a = a.offsetParent);
      if (
        a &&
        a.offsetParent == null &&
        typeof a.getBoundingClientRect === "function"
      ) {
        var d = a.getBoundingClientRect();
        d = d.top;
        d >= 0 ? (c += d) : a === document.body && (c -= b.initialScrollY);
      }
      return c;
    }
    function e(a) {
      return a.split("#")[0];
    }
    function o(a) {
      if (a == null || a === "") return !1;
      a = a.replace(/ /g, "");
      return (
        a.indexOf("display:none") >= 0 ||
        a.indexOf("visibility:hidden") >= 0 ||
        a.indexOf("content-visibility:hidden") >= 0
      );
    }
    function p(a) {
      a = a;
      while (a) {
        if (
          (typeof a.getAttribute === "function" &&
            o(a.getAttribute("style"))) ||
          (typeof a.hasAttribute === "function" && a.hasAttribute("hidden"))
        )
          return !0;
        a = a.parentElement;
      }
      return !1;
    }
    function q(a, b) {
      if (p(a)) return !0;
      var d = a;
      while (d) {
        if (b.mutationRoots.has(d)) return !1;
        if (typeof d.getAttribute === "function") {
          var e = d.getAttribute(
            (h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME
          );
          if (e === (h || (h = c("VisualCompletionConstants"))).IGNORE)
            return !0;
          if (
            d !== a &&
            e === (h || (h = c("VisualCompletionConstants"))).IGNORE_DYNAMIC
          ) {
            b.excludeElement(a);
            return !0;
          }
        }
        d = d.parentElement;
      }
      return !1;
    }
    function r(a, b, c) {
      if (
        I(b) &&
        !q(b, a) &&
        b.textContent != null &&
        b.parentElement != null
      ) {
        a = b.parentElement;
        if (H(a) && a.tagName !== "SCRIPT" && a.tagName !== "STYLE") {
          b = b.textContent;
          typeof b === "string" && (b = b.trim());
          if (b !== "")
            if (c != null && c.trim() === b) return null;
            else return a;
        }
      }
      return null;
    }
    function f(a, b) {
      var c = [];
      Array.from(a).forEach(function (a) {
        if (
          a.target.nodeType !== Node.ELEMENT_NODE &&
          a.target.nodeType !== Node.TEXT_NODE
        )
          return;
        var d = a.target;
        if (a.type === "childList" && a.addedNodes && a.addedNodes.length)
          Array.from(a.addedNodes).forEach(function (a) {
            a = a;
            if (q(a, b)) return;
            if (s(a)) {
              z(b.mutationSeq, a, "imgLoad", b);
              return;
            } else typeof a.querySelectorAll === "function" && y(b.mutationSeq, a, b);
            if (a.nodeType === Node.ELEMENT_NODE) c.push([a, "mutationAdd"]);
            else if (
              b.config.observeTextMutation &&
              a.nodeType === Node.TEXT_NODE
            ) {
              a = r(b, a);
              a != null && c.push([a, "mutationTextAdd"]);
            }
          });
        else if (a.type === "attributes" && !q(d, b))
          if (a.attributeName === "hidden")
            d.hasAttribute("hidden") || c.push([d, "mutationHiddenAttribute"]);
          else if (a.attributeName === "style") {
            var e = d.getAttribute("style"),
              f = a.oldValue;
            o(f) && !o(e) && c.push([d, "mutationStyleAttribute"]);
          } else
            ((G(d) === "image" && a.attributeName === "href") ||
              (G(d) === "IMG" && a.attributeName === "src")) &&
              z(b.mutationSeq, d, "mutationImageAttribute", b);
        else if (
          b.config.observeTextMutation &&
          a.type === "characterData" &&
          d.nodeType === Node.TEXT_NODE
        ) {
          f = r(b, d, a.oldValue);
          f != null && c.push([f, "mutationTextUpdate"]);
        }
      });
      return c;
    }
    function s(a) {
      return G(a) === "IMG" || G(a) === "image";
    }
    function t(a) {
      return G(a) === "picture";
    }
    function u(a) {
      return s(a) || t(a);
    }
    function v(a) {
      if (typeof window.getComputedStyle !== "function") return null;
      a = window.getComputedStyle(a);
      var b = a["background-image"];
      if (a.visibility !== "hidden" && b && b !== "none") {
        j.lastIndex = 0;
        a = j.exec(b);
        if (a && a.length > 1) return a[1].replace('"', "");
      }
      return null;
    }
    function w(a) {
      if (a.reported) return;
      var b = c("performanceNowSinceAppStart")();
      a.checkViewport();
      a.mutationRoots.forEach(function (b) {
        if (b && typeof b.querySelectorAll === "function") {
          b = b.querySelectorAll("div,i,span,li");
          Array.prototype.forEach.call(b, function (b) {
            if (
              b.textContent ||
              b.children.length ||
              a.cssBgElements.has(b) ||
              q(b, a) ||
              !a.inViewport(b)
            )
              return;
            var c = v(b);
            a.bgCheckCount++;
            if (c == null) return;
            c = {
              element: b,
              url: c,
              resourceTiming: d("ResourceTimingAPI").getResourceTiming(c),
            };
            a.cssBgElements.set(b, c);
          });
        }
      });
      a.cssBgScanOverhead = c("performanceNowSinceAppStart")() - b;
    }
    function x(a, b) {
      if (
        typeof a.getAttribute === "function" &&
        a.getAttribute(
          (h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME
        ) === (h || (h = c("VisualCompletionConstants"))).LOADING_STATE
      )
        b.waitLoadingState(a);
      else if (typeof a.querySelectorAll === "function") {
        a = a.querySelectorAll(
          "[" +
            (h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME +
            "=" +
            h.LOADING_STATE +
            "]"
        );
        Array.from(a).forEach(function (a) {
          b.waitLoadingState(a);
        });
      }
    }
    function y(a, b, c) {
      b = b.querySelectorAll("img, image");
      Array.from(b).forEach(function (b) {
        if (q(b, c)) return;
        z(a, b, "imgLoad", c);
      });
    }
    function z(a, b, d, e) {
      if (b.complete) {
        b.getAttribute(
          (h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME
        ) === (h || (h = c("VisualCompletionConstants"))).MEDIA_VC_IMAGE &&
          e.scheduleIntersectionObserver(
            a,
            b,
            d,
            c("performanceNowSinceAppStart")()
          );
        return;
      }
      var f = b.currentSrc || b.src;
      if (G(b) === "image" && typeof b.getAttribute === "function") {
        var g = b.getAttribute("xlink:href");
        g != null && (f = g);
      }
      if (f == null || f === "" || f.indexOf("http") !== 0) return;
      var i = function () {
          e.imageDone(b);
        },
        j = function () {
          e.imageWait(b);
        };
      if (b.getAttribute("loading") === "lazy") {
        g = A(a, b, d, i, e);
        var k = g.loadHandler,
          l = g.errorHandler;
        e.scheduleElementVisibleObserver(
          b,
          function () {
            if (e.reported || b.complete) return;
            j();
            b.addEventListener("load", k);
            b.addEventListener("error", l);
          },
          { executeOnce: !0, cleanAfterReport: !0 }
        );
      } else if (e.config.use_image_download_tracker === !0)
        c("ImageDownloadTracker")(f, j)
          .then(function () {
            var f = c("performanceNowSinceAppStart")();
            e.scheduleIntersectionObserver(a, b, d, f);
            i();
          })
          ["catch"](function () {
            return i();
          });
      else {
        g = A(a, b, d, i, e);
        f = g.loadHandler;
        g = g.errorHandler;
        j();
        b.addEventListener("load", f);
        b.addEventListener("error", g);
      }
    }
    function A(a, b, d, e, f) {
      var g = function g() {
          var i = c("performanceNowSinceAppStart")();
          f.scheduleIntersectionObserver(a, b, d, i);
          e();
          b.removeEventListener("load", g);
          b.removeEventListener("error", h);
        },
        h = function a() {
          e(),
            b.removeEventListener("load", g),
            b.removeEventListener("error", a);
        };
      return { loadHandler: g, errorHandler: h };
    }
    function B(a, b) {
      return (
        typeof a.getAttribute === "function" &&
        a.getAttribute(
          (h || (h = c("VisualCompletionConstants"))).ATTRIBUTE_NAME
        ) === b
      );
    }
    function C(a) {
      var b = function () {
        (a.scrolled = !0),
          a.markerPoints.has("scroll_start") ||
            a.addMarkerPoint(
              "scroll_start",
              c("performanceNowSinceAppStart")()
            );
      };
      try {
        window.addEventListener("scroll", b, { passive: !0 }),
          a.onComplete(function () {
            window.removeEventListener("scroll", b);
          });
      } catch (a) {
        if (a.message !== "can't access dead object") throw a;
      }
    }
    function D(a, b) {
      a instanceof HTMLImageElement &&
        ((b.naturalWidth = a.naturalWidth),
        (b.naturalHeight = a.naturalHeight));
    }
    function E(a, b) {
      typeof window.devicePixelRatio === "number" &&
        c("addAnnotations")(a.annotations, {
          double: { devicePixelRatio: window.devicePixelRatio },
        });
      a.navSequence === 1 &&
        (i || (i = c("performance"))) &&
        (i || (i = c("performance"))).timing &&
        (i || (i = c("performance"))).timing.responseStart &&
        a.markerPoints.set("TTFB", {
          timestamp:
            (i || (i = c("performance"))).timing.responseStart -
            c("performanceNavigationStart")(),
        });
      if (b.interactionType === "INITIAL_LOAD") {
        a =
          (i || (i = c("performance"))) == null
            ? void 0
            : (i || (i = c("performance"))).getEntriesByType == null
            ? void 0
            : (i || (i = c("performance"))).getEntriesByType("paint");
        a &&
          a.forEach(function (a) {
            a.name === "first-contentful-paint" &&
              b.addFirstMarkerPoint("FCP", a.startTime);
          });
      }
    }
    var F = {
      attributeFilter: ["hidden", "style", "href", "src"],
      attributeOldValue: !0,
      attributes: !0,
      characterData: !0,
      childList: !0,
      subtree: !0,
    };
    function G(a) {
      return (a = a.tagName) != null ? a : "";
    }
    function H(a) {
      return a.nodeType === Node.ELEMENT_NODE;
    }
    function I(a) {
      return a.nodeType === Node.TEXT_NODE;
    }
    function J(a) {
      var b = [],
        c = d("currentVCTraces").getCurrentVCTraces();
      c.forEach(function (c) {
        var d = a;
        while (d != null) {
          if (d instanceof HTMLElement && c.mutationRoots.has(d)) {
            b.push(c);
            break;
          }
          d = d.parentElement;
        }
      });
      return b;
    }
    function K(a) {
      var b = [];
      J(a).forEach(function (c) {
        b.push(c.waitLoadingState(a));
      });
      return b;
    }
    function L(a) {
      return {
        onError: function () {},
        onLoad: function () {},
        unmountCallback: function () {},
      };
    }
    function M(a) {
      J(a).forEach(function (b) {
        b.excludeElement(a);
      });
    }
    g.getPixels = k;
    g.getRectIntersection = l;
    g.getViewportSize = m;
    g.isInAboveTheFold = a;
    g.getScrollPosition = n;
    g.offsetTop = b;
    g.trimHash = e;
    g.checkInvisibleStyle = o;
    g.checkInvisibleStyleElement = p;
    g.shouldIgnoreMutation = q;
    g.getParentElementForTextNodeChange = r;
    g.extractMutationElements = f;
    g.isImage = s;
    g.isPicture = t;
    g.useCustomTracking = u;
    g.getStyleBackground = v;
    g.scanCssBgElements = w;
    g.checkLoadingStates = x;
    g.trackAllChildImages = y;
    g.trackImage = z;
    g.getImageLoadHandlers = A;
    g.checkDOMElementAttributeValue = B;
    g.setupScrollHandler = C;
    g.getImageNaturalSize = D;
    g.addPlatformMetaData = E;
    g.mutationObserverConfig = F;
    g.getTagName = G;
    g.isElementNode = H;
    g.isTextNode = I;
    g.findVCTraces = J;
    g.trackLoadingState = K;
    g.trackImageLoad = L;
    g.ignoreElement = M;
  },
  98
);
__d(
  "VisualCompletionLogger",
  [
    "CLS",
    "LCP",
    "ResourceDownloadLogger",
    "ResourceTimingAPI",
    "VisibilityState",
    "VisualCompletionConstants",
    "VisualCompletionTraceObserver",
    "VisualCompletionUtil",
    "WebAPIs",
    "addAnnotations",
    "performanceNowSinceAppStart",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = 4,
      j = "manualVCPointCandidate",
      k = 1;
    function l() {
      return { bottom: 0, left: 0, right: 0, top: 0 };
    }
    function m(a) {
      return { bottom: a.bottom, left: a.left, right: a.right, top: a.top };
    }
    a = (function () {
      function a(a, b, e, f, g) {
        (this.bgCheckCount = 0),
          (this.$6 = 0),
          (this.$7 = 0),
          (this.cssBgScanOverhead = 0),
          (this.initialScrollY = 0),
          (this.scrolledVC = 0),
          (this.reported = !1),
          (this.measureOriginalViewport = !0),
          (this.mutationRoots = new Set()),
          (this.mutatedElementCount = 0),
          (this.config = g),
          (this.$3 = new Map()),
          (this.$4 = new Map()),
          (this.$1 = []),
          (this.$2 = []),
          (this.cssBgElements = new Map()),
          (this.$8 = []),
          (this.$9 = new Set()),
          (this.startTime = a),
          (this.$5 = { height: 0, width: 0 }),
          (this.initialScrollY =
            f === "INITIAL_LOAD"
              ? 0
              : d("VisualCompletionUtil").getScrollPosition(this).scrollY),
          (this.$10 = this.initialScrollY),
          (this.currentScrollY = this.initialScrollY),
          (this.navSequence = b),
          (this.traceID = e),
          (this.markerPoints = new Map()),
          (this.stateLog = new Map()),
          (this.annotations = {
            string: {},
            int: {},
            double: {},
            bool: {},
            string_array: {},
            int_array: {},
            double_array: {},
            bool_array: {},
          }),
          (this.tagSet = new Map()),
          (this.navDone = !1),
          (this.interactionType = f),
          (this.scrolled = !1),
          (this.$11 = d("CLS").getCLSCallback()),
          f === "INITIAL_LOAD" && (this.$12 = d("LCP").getLCPCallback()),
          c("VisualCompletionTraceObserver").emitStart(f);
      }
      var b = a.prototype;
      b.addAnnotation = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          string: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationInt = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          int: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationDouble = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          double: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationBoolean = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          bool: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationIntArray = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          int_array: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationDoubleArray = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          double_array: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationStringArray = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          string_array: ((d = {}), (d[a] = b), d),
        });
      };
      b.addAnnotationBooleanArray = function (a, b) {
        var d;
        c("addAnnotations")(this.annotations, {
          bool_array: ((d = {}), (d[a] = b), d),
        });
      };
      b.addFirstMarkerPoint = function (a, b, c) {
        c === void 0 && (c = {});
        var d = this.markerPoints.get(a);
        b >= this.startTime &&
          (!d || d.timestamp > b) &&
          this.markerPoints.set(a, { data: c, timestamp: b });
      };
      b.addMarkerPoint = function (a, b, c) {
        c === void 0 && (c = {}),
          b >= this.startTime &&
            this.markerPoints.set(a, { data: c, timestamp: b });
      };
      b.addVCPointCandidate = function (a, b) {
        b === void 0 && (b = {}), this.addMarkerPoint(j, a, b);
      };
      b.addVisualElement = function (a, b, c, e, f) {
        this.scrolled &&
          ((this.currentScrollY = d("VisualCompletionUtil").getScrollPosition(
            this
          ).scrollY),
          (this.scrolled = !1));
        a = {
          mutationSeq: a,
          element: b,
          timestamp: e,
          mutationType: c,
          scrollY: this.currentScrollY,
          visible: f,
        };
        d("VisualCompletionUtil").getImageNaturalSize(b, a);
        this.$8.push(a);
      };
      b.trackPagelet = function (a, b, c, d, e) {
        this.$4.set(a, {
          data: {},
          element: a,
          mutationSeq: 0,
          name: b,
          pageletTypeName: e,
          points: { hydration: c - this.startTime },
          vcCallback: d,
        });
      };
      b.addTag = function (a, b) {
        this.tagSet.has(a) || this.tagSet.set(a, new Set());
        a = this.tagSet.get(a);
        a && a.add(b);
      };
      b.checkViewport = function () {
        this.$5 = d("VisualCompletionUtil").getViewportSize(this);
      };
      b.calculate = function (a) {
        var b = this;
        a === void 0 && (a = !1);
        this.checkViewport();
        var e = c("performanceNowSinceAppStart")();
        this.$7 = 0;
        this.initTree();
        !a &&
          d("ResourceTimingAPI").canUseResourceTimingAPI() &&
          this.getBackgroundImages();
        this.calculatePaintedPixels();
        var f = {
          annotations: this.annotations,
          cssBgScanOverhead: this.cssBgScanOverhead,
          bgChecked: this.bgCheckCount,
          bgNum: 0,
          bgPixels: 0,
          vcCalculationOverhead: 0,
          compNum: 0,
          compPixels: 0,
          cssBgElements: Array.from(this.cssBgElements.values()),
          elements: this.$2,
          finalScrollY: this.$10,
          imgNum: 0,
          imgPixels: 0,
          initialScrollY: this.initialScrollY,
          interactionType: this.interactionType,
          markerPoints: this.markerPoints,
          navComplete: c("performanceNowSinceAppStart")(),
          navSequence: this.navSequence,
          pagelets: Array.from(this.$4.values()),
          paintedPixels: this.$7,
          scrollY: d("VisualCompletionUtil").getScrollPosition(this).scrollY,
          scrolledVC: this.scrolledVC,
          speedIndex: 0,
          startTime: this.startTime,
          tagSet: this.tagSet,
          totalPixels: this.$6,
          traceId: this.traceID,
          tracePolicy: this.tracePolicy,
          stateLog: this.stateLog,
          vcWithoutImage: 0,
          viewport: this.$5,
          visuallyComplete: 0,
        };
        c("addAnnotations")(this.annotations, {
          int: {
            mutationRootCount: this.mutationRoots.size,
            mutatedElementCount: this.mutatedElementCount,
            visualChangeRecordCount: this.$8.length,
            paintedElementCount: this.$2.length,
          },
        });
        this.$2.length &&
          d("WebAPIs").unavailableAPIs.length === 0 &&
          (this.addMarkerPoint("FP", this.$2[this.$2.length - 1].timestamp),
          this.$2.forEach(function (a) {
            var c = a.element;
            if (!c) return;
            var e = a.pagelet;
            if (f.vcWithoutImage === 0 && a.type === "component") {
              var g = {
                height: Math.floor(a.rectangle.bottom - a.rectangle.top),
                mutationType: a.mutationType,
                tagName: d("VisualCompletionUtil").getTagName(c),
                type: a.type,
                width: Math.floor(a.rectangle.right - a.rectangle.left),
                x: Math.floor(a.rectangle.left),
                y: Math.floor(a.rectangle.top),
              };
              e && (g.pagelet = e.name);
              f.vcWithoutImage = a.latency;
              f.markerPoints.set("vcWithoutImage", {
                data: g,
                element: c,
                timestamp: a.latency + b.startTime,
              });
            }
            if (f.visuallyComplete === 0) {
              g = {
                height: Math.floor(a.rectangle.bottom - a.rectangle.top),
                mutationType: a.mutationType,
                tagName: d("VisualCompletionUtil").getTagName(c),
                type: a.type,
                width: Math.floor(a.rectangle.right - a.rectangle.left),
                x: Math.floor(a.rectangle.left),
                y: Math.floor(a.rectangle.top),
              };
              e && (g.pagelet = e.name);
              f.visuallyComplete = a.latency;
              f.markerPoints.set("visuallyComplete", {
                data: g,
                element: c,
                timestamp: a.latency + b.startTime,
              });
              f.scrollY = a.scrollY;
            }
            f.speedIndex += (a.pixels / b.$7) * a.latency;
            switch (a.type) {
              case "component":
                f.compNum++;
                f.compPixels += a.pixels;
                break;
              case "img":
                f.imgNum++;
                f.imgPixels += a.pixels;
                break;
              case "bg":
                f.bgNum++;
                f.bgPixels += a.pixels;
                break;
            }
          }));
        this.logPagelets();
        this.logPixelProgress();
        a &&
          ((f.visuallyComplete = f.vcWithoutImage =
            c("performanceNowSinceAppStart")() - this.startTime),
          f.markerPoints.set("visuallyComplete", {
            data: {},
            timestamp: f.visuallyComplete + this.startTime,
          }),
          f.markerPoints.set("vcWithoutImage", {
            data: {},
            timestamp: f.vcWithoutImage + this.startTime,
          }));
        a = c("performanceNowSinceAppStart")();
        f.vcCalculationOverhead = a - e;
        this.setupMetaData(f);
        this.logCssBgElementsMetaData();
        this.reported = !0;
        e = c("performanceNowSinceAppStart")() - a;
        c("addAnnotations")(f.annotations, {
          double: {
            vcMetaDataLoggingLatency: e,
            vcTotalLoggingOverhead:
              e + f.cssBgScanOverhead + f.vcCalculationOverhead,
          },
        });
        return f;
      };
      b.cleanupPaintedElements = function () {
        var a = new Set(),
          b = [].concat(this.$2);
        while (b.length > 0) {
          var c = b.pop();
          if (a.has(c)) continue;
          a.add(c);
          delete c.element;
          b.push.apply(b, c.children);
        }
      };
      b.tearDown = function () {
        this.$3.clear(),
          (this.$1 = []),
          (this.$8 = []),
          this.$9.clear(),
          this.mutationRoots.clear(),
          this.config.retain_element_reference ||
            (this.cleanupPaintedElements(),
            this.cssBgElements.forEach(function (a) {
              delete a.element;
            }),
            this.$4.forEach(function (a) {
              delete a.element;
            })),
          this.$4.clear(),
          this.markerPoints.forEach(function (a) {
            delete a.element;
          }),
          this.cssBgElements.clear();
      };
      b.findPagelet = function (a) {
        a = a;
        while (a) {
          if (this.$4.has(a)) return this.$4.get(a);
          a = a.parentElement;
        }
        return null;
      };
      b.findParent = function (a) {
        a = a.parentElement;
        while (a) {
          if (this.$3.has(a)) return this.$3.get(a);
          a = a.parentElement;
        }
        return null;
      };
      b.checkExcluded = function (a) {
        a = a;
        while (a) {
          if (this.$9.has(a)) return !0;
          else if (this.$3.has(a) || this.mutationRoots.has(a)) return !1;
          else if (
            d("VisualCompletionUtil").checkDOMElementAttributeValue(
              a,
              (h || (h = c("VisualCompletionConstants"))).IGNORE
            )
          )
            return !0;
          a = a.parentElement;
        }
        return !1;
      };
      b.getBackgroundImages = function () {
        var a = this;
        this.cssBgElements.forEach(function (b) {
          if (b.element) {
            var c,
              e = b.element,
              f = a.findParent(e);
            if (!f) return;
            var g = d("VisualCompletionUtil").offsetTop(e, a),
              h = a.getRelativeBoundingClientRect(
                e,
                a.measureOriginalViewport ? g : void 0
              );
            h = d("VisualCompletionUtil").getRectIntersection(h, f.rectangle);
            var i = d("VisualCompletionUtil").getPixels(h);
            if (i === 0 || (a.measureOriginalViewport && g > a.$5.height))
              return;
            ((c = b.resourceTiming) == null ? void 0 : c.responseEnd) == null &&
              (b.resourceTiming = d("ResourceTimingAPI").getResourceTiming(
                b.url
              ));
            if (
              ((c = b.resourceTiming) == null ? void 0 : c.responseEnd) != null
            ) {
              c = b.resourceTiming;
              b = c.responseEnd;
              var j = a.findPagelet(e);
              if (c.startTime >= a.startTime && b > f.timestamp) {
                c = {
                  children: [],
                  element: e,
                  hadLateMutationExpected: !1,
                  hadLateMutationUnexpected: !1,
                  latency: b - a.startTime,
                  mutationSeq: f.mutationSeq,
                  mutationType: "bg",
                  offsetTop: g,
                  pagelet: j,
                  parent: f,
                  pixels: i,
                  rectangle: h,
                  scrollY: f.scrollY,
                  timestamp: b,
                  type: "bg",
                  veid: String(k++),
                };
                f.children.push(c);
                a.$3.set(e, c);
                a.$2.push(c);
              }
            }
          }
        });
      };
      b.getRelativeBoundingClientRect = function (a, b) {
        var c = l();
        if (typeof a.getBoundingClientRect !== "function") return c;
        c = m(a.getBoundingClientRect());
        return {
          bottom: b != null ? b + (c.bottom - c.top) : c.bottom,
          left: c.left,
          right: c.right,
          top: b != null ? b : c.top,
        };
      };
      b.findFirstVisibleChild = function (a) {
        var b = this,
          c = [a];
        a = function () {
          var a = [],
            e = 0,
            f = void 0;
          c.forEach(function (c) {
            if (typeof c.getBoundingClientRect !== "function") return;
            var g = m(c.getBoundingClientRect()),
              h = d("VisualCompletionUtil").getPixels(g);
            if (
              h > 0 &&
              (g.bottom <= 0 ||
                g.right <= 0 ||
                g.left >= b.$5.width ||
                g.top >= b.$5.height)
            )
              return;
            h > e && !b.checkExcluded(c) && ((e = h), (f = c));
            c.children != null && (a = a.concat(Array.from(c.children)));
          });
          if (e > 0 && f) return { v: f };
          c = a;
        };
        while (c && c.length) {
          var e = a();
          if (typeof e === "object") return e.v;
        }
        return null;
      };
      b.getRectangle = function (a, b) {
        a = this.findFirstVisibleChild(a);
        if (a == null) return l();
        a = this.getRelativeBoundingClientRect(a);
        var c = a.bottom,
          e = a.left,
          f = a.right;
        a = a.top;
        c = { bottom: c, left: e, right: f, top: a };
        return d("VisualCompletionUtil").getRectIntersection(c, b);
      };
      b.excludeElement = function (a) {
        this.$9.add(a);
      };
      b.initTree = function () {
        var a = this,
          b = {
            bottom: this.$5.height,
            left: 0,
            right: this.$5.width,
            top: -this.initialScrollY,
          };
        this.$8 = this.$8.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        var e = 0,
          f = 0;
        this.$8.forEach(function (g) {
          var j = g.element,
            l = g.mutationSeq,
            m = g.mutationType,
            n = g.naturalHeight,
            o = g.naturalWidth,
            p = g.scrollY,
            q = g.timestamp;
          g = g.visible;
          if (
            d("VisualCompletionUtil").checkDOMElementAttributeValue(
              j,
              (h || (h = c("VisualCompletionConstants"))).MEDIA_VC_IMAGE
            ) &&
            g === !0 &&
            n != null &&
            o != null
          ) {
            g = n * o;
            var r = Number(g < e * i);
            o = {
              ignored: r,
              resolution: g,
              mutationType: m,
              naturalWidth: o,
              naturalHeight: n,
            };
            e > 0 && (o.ratio = g / e);
            a.addMarkerPoint("mediaVCImage_" + f++, q, o);
            if (r) return;
            else a.addMarkerPoint("ImageMediaVC", q), (e = g);
          }
          n = a.findFirstVisibleChild(j);
          if (n == null) return;
          o = d("VisualCompletionUtil").offsetTop(n, a);
          r = a.getRelativeBoundingClientRect(
            n,
            a.measureOriginalViewport ? o : void 0
          );
          g = d("VisualCompletionUtil").getRectIntersection(r, b);
          if (a.inAboveTheFold(n)) {
            q - a.startTime > a.scrolledVC &&
              ((a.scrolledVC = q - a.startTime), (a.$10 = p));
            if (a.measureOriginalViewport && o > a.$5.height) return;
            j = a.findPagelet(n);
            r = {
              children: [],
              element: n,
              hadLateMutationExpected: !1,
              hadLateMutationUnexpected: !1,
              latency: q - a.startTime,
              mutationSeq: l,
              mutationType: m,
              offsetTop: o,
              pagelet: j,
              parent: null,
              pixels: d("VisualCompletionUtil").getPixels(g),
              rectangle: g,
              scrollY: p,
              timestamp: q,
              type:
                m === "imgLoad" || m === "mutationImageAttribute"
                  ? "img"
                  : "component",
              veid: String(k++),
            };
            a.$3.set(n, r);
          }
        });
        this.$3.forEach(function (b) {
          var c = b.element;
          if (c) {
            c = a.findParent(c);
            c
              ? (b.type !== "component" && (b.scrollY = c.scrollY),
                c.children.push(b),
                (b.parent = c))
              : a.$1.push(b);
          }
        });
        this.$3.forEach(function (b, c) {
          var d = b.parent;
          while (d) {
            if (b.timestamp < d.timestamp) {
              a.$3["delete"](c);
              return;
            }
            d = d.parent;
          }
          a.$2.push(b);
        });
      };
      b.logPixelProgress = function () {
        var a = this,
          b = new Map([
            ["vc98", 0.02],
            ["vc95", 0.05],
          ]),
          c = 0,
          d = 0,
          e = function (e) {
            var f = a.$2[e];
            c += f.pixels;
            if (b.size === 0) return "break";
            b.forEach(function (b, d) {
              !a.markerPoints.has(d) &&
                c / a.$7 >= b &&
                a.addMarkerPoint(d, f.latency + a.startTime);
            });
            f.type === "component" &&
              ((d += f.pixels),
              f.children.forEach(function (a) {
                a.type !== "component" && (d += a.pixels);
              }),
              b.forEach(function (c, e) {
                !a.markerPoints.has(e + "WithoutImage") &&
                  d / a.$7 >= c &&
                  (a.addMarkerPoint(
                    e + "WithoutImage",
                    f.latency + a.startTime
                  ),
                  b["delete"](e));
              }));
          };
        for (var f = 0; f < this.$2.length; f++) {
          var g = e(f);
          if (g === "break") break;
        }
      };
      b.logPagelets = function () {
        var a = this;
        this.$4.forEach(function (b, c) {
          if (!a.inViewport(c)) {
            b.vcCallback != null && b.vcCallback(null, null, b.data);
            a.$4["delete"](c);
            return;
          }
          c = a.$3.has(c) ? a.$3.get(c) : a.findParent(c);
          if (c) {
            var d = c.latency + a.startTime;
            b.points.firstPaint = d;
            b.points.visuallyComplete = d;
            b.points.vcWithoutImage = d;
            b.mutationSeq = c.mutationSeq;
          }
        });
        this.$2.forEach(function (b) {
          var c = b.pagelet;
          while (c != null) {
            var d,
              e = b.latency + a.startTime;
            c.points.visuallyComplete = Math.max(
              (d = c.points.visuallyComplete) != null ? d : 0,
              e
            );
            if (b.type === "component") {
              c.points.vcWithoutImage = Math.max(
                (d = c.points.vcWithoutImage) != null ? d : 0,
                e
              );
            }
            c =
              ((d = c.element) == null ? void 0 : d.parentElement) != null
                ? a.findPagelet(c.element.parentElement)
                : null;
          }
        });
        this.$4.forEach(function (b) {
          b.points.visuallyComplete != null &&
            b.pageletTypeName != null &&
            b.pageletTypeName !== "" &&
            a.markerPoints.set(b.pageletTypeName + "VC", {
              timestamp: b.points.visuallyComplete,
            }),
            b.points.vcWithoutImage != null &&
              a.markerPoints.set("VC_" + b.name, {
                data: b.data,
                timestamp: b.points.vcWithoutImage,
              }),
            b.vcCallback != null &&
              b.points.visuallyComplete != null &&
              b.points.vcWithoutImage != null &&
              b.vcCallback(
                b.points.visuallyComplete,
                b.points.vcWithoutImage,
                b.data
              ),
            a.config.retain_element_reference || delete b.element;
        });
      };
      b.calculatePaintedPixels = function () {
        var a = this;
        this.$2 = this.$2.sort(function (a, b) {
          return b.latency - a.latency;
        });
        this.$2.forEach(function (b) {
          var c = b.pixels,
            e = b.parent;
          while (e)
            (b.rectangle = d("VisualCompletionUtil").getRectIntersection(
              b.rectangle,
              e.rectangle
            )),
              (b.pixels = d("VisualCompletionUtil").getPixels(b.rectangle)),
              (c = Math.min(c, b.pixels, e.pixels)),
              (e = e.parent);
          b.pixels = c;
          e = b.parent;
          while (e) (e.pixels -= c), (e = e.parent);
          a.$7 += c;
        });
        this.$6 = this.$7;
      };
      b.inAboveTheFold = function (a) {
        var b = d("VisualCompletionUtil").getViewportSize(this);
        a = d("VisualCompletionUtil").getPixels(
          this.getRectangle(a, {
            bottom: b.height,
            left: 0,
            right: b.width,
            top: -d("VisualCompletionUtil").getScrollPosition(this).scrollY,
          })
        );
        return a > 0;
      };
      b.inOriginalViewport = function (a) {
        return (
          this.inAboveTheFold(a) &&
          d("VisualCompletionUtil").offsetTop(a, this) <= this.$5.height
        );
      };
      b.inViewport = function (a) {
        return this.measureOriginalViewport
          ? this.inOriginalViewport(a)
          : this.inAboveTheFold(a);
      };
      b.setInitialScrollY = function (a) {
        (this.initialScrollY = a), (this.currentScrollY = a);
      };
      b.setTracePolicy = function (a) {
        this.tracePolicy = a;
      };
      b.setupMetaData = function (a) {
        var b = this,
          e = this.markerPoints.get(j);
        e &&
          e.timestamp > a.visuallyComplete + a.startTime &&
          ((a.visuallyComplete = e.timestamp - a.startTime),
          this.markerPoints.set("visuallyComplete", e),
          c("addAnnotations")(a.annotations, { int: { isVCOverriden: 1 } }));
        a.tracePolicy != null &&
          a.tracePolicy !== "" &&
          c("addAnnotations")(a.annotations, {
            string: { tracePolicy: a.tracePolicy },
          });
        c("addAnnotations")(a.annotations, {
          string: { interactionId: a.traceId },
          int: {
            height: a.viewport.height,
            width: a.viewport.width,
            scrollY: a.scrollY,
          },
        });
        d("VisualCompletionUtil").addPlatformMetaData(a, this);
        c("addAnnotations")(a.annotations, {
          double: {
            vcCalculationOverhead: a.vcCalculationOverhead,
            cssBgScanOverhead: a.cssBgScanOverhead,
          },
          int: {
            finalScrollY: a.finalScrollY,
            initialScrollY: a.initialScrollY,
          },
        });
        a.markerPoints.set("logVC", { timestamp: a.navComplete });
        a.speedIndex > 0 &&
          a.markerPoints.set("speedIndex", {
            timestamp: a.speedIndex + a.startTime,
          });
        a.elements.length &&
          this.measureOriginalViewport &&
          a.scrolledVC > 0 &&
          a.markerPoints.set("scrolledVC", {
            timestamp: a.scrolledVC + a.startTime,
          });
        e = d("VisibilityState").getHiddenSpans(
          a.startTime,
          a.visuallyComplete + a.startTime
        );
        e.length > 0 && this.addMarkerPoint("backgrounded", e[0].start);
        c("addAnnotations")(a.annotations, {
          int: {
            hidden: Number(
              d("VisibilityState").wasHidden(
                a.startTime,
                a.visuallyComplete + a.startTime
              )
            ),
          },
        });
        e = c("ResourceDownloadLogger")(
          a.startTime,
          a.startTime + a.visuallyComplete
        );
        e.forEach(function (b, d) {
          var e;
          c("addAnnotations")(a.annotations, {
            int: ((e = {}), (e[d] = b), e),
          });
        });
        d("WebAPIs").unavailableAPIs.forEach(function (a) {
          b.addTag("unavailableAPIs", a);
        });
        if (this.$11) {
          e = this.$11();
          c("addAnnotations")(a.annotations, { double: { CLS: e } });
        }
        if (this.$12) {
          e = this.$12();
          e && this.addMarkerPoint("LCP", e.timestamp);
        }
      };
      b.logCssBgElementsMetaData = function () {
        var a = 0;
        this.cssBgElements.forEach(function (b) {
          ((b = b.resourceTiming) == null ? void 0 : b.responseEnd) != null &&
            a++;
        });
        c("addAnnotations")(this.annotations, {
          int: {
            cssBgElementCount: this.cssBgElements.size,
            cssBgTimingCount: a,
          },
        });
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "VisualCompletionTracing",
  [
    "ResourceTimingAPI",
    "VisibilityAPI",
    "VisibilityState",
    "VisualCompletionLogger",
    "VisualCompletionTraceObserver",
    "VisualCompletionUtil",
    "WebAPIs",
    "addAnnotations",
    "currentVCTraces",
    "foregroundRequestAnimationFrame",
    "performanceNowSinceAppStart",
    "setTimeoutAcrossTransitions",
    "timeSinceAppStart",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = new Set();
    a = !1;
    !a &&
      d("VisibilityAPI").canUseVisibilityAPI &&
      d("VisibilityState").subscribe(function (a, b) {
        b &&
          d("currentVCTraces")
            .getCurrentVCTraces()
            .forEach(function (a) {
              a.pendingMutations.forEach(function (b, c) {
                a.addVisualElement(
                  b.mutationSeq,
                  c,
                  b.mutationType,
                  b.displayTimestamp
                ),
                  a.intersectionObserver && a.intersectionObserver.unobserve(c),
                  a.unlock(b.lockId);
              }),
                a.pendingMutations.clear();
            });
      });
    b = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, e, f, g, i) {
        var j;
        j = a.call(this, b, e, f, g, i) || this;
        j.pendingLocks = new Map();
        j.pendingImages = new Map();
        j.$VisualCompletionTracing1 = new Map();
        j.$VisualCompletionTracing2 = null;
        j.loadingStateObserver = null;
        j.$VisualCompletionTracing3 = [];
        j.pendingLoadingElements = new Map();
        j.$VisualCompletionTracing4 = 0;
        j.$VisualCompletionTracing5 = 0;
        j.$VisualCompletionTracing6 = [];
        j.$VisualCompletionTracing7 = [];
        j.mutationSeq = 0;
        j.mutationObserver = null;
        j.intersectionObserver = null;
        j.pendingMutations = new Map();
        j.loggingScheduled = !1;
        j.$VisualCompletionTracing8 = new Map();
        j.intersectionObserverCallback = function (a) {
          Array.prototype.forEach.call(a, function (a) {
            var b = j.pendingMutations.get(a.target);
            b &&
              (j.addVisualElement(
                b.mutationSeq,
                a.target,
                b.mutationType,
                c("timeSinceAppStart")(a.time),
                d("WebAPIs").intersectionObserverEntryIsIntersecting(a)
              ),
              j.intersectionObserver != null &&
                j.intersectionObserver.unobserve(a.target),
              j.unlock(b.lockId),
              j.pendingMutations["delete"](a.target));
          });
        };
        j.mutationRecordHandler = function (a) {
          j.mutationSeq++;
          a = d("VisualCompletionUtil").extractMutationElements(
            a,
            babelHelpers.assertThisInitialized(j)
          );
          j.trackElements(a, j.mutationSeq);
        };
        j.loadingStateObserverCallback = function (a) {
          Array.from(a).forEach(function (a) {
            d("WebAPIs").intersectionObserverEntryIsIntersecting(a)
              ? j.loadingElementAdded(a.target, c("timeSinceAppStart")(a.time))
              : j.loadingElementRemoved(
                  a.target,
                  c("timeSinceAppStart")(a.time)
                );
          });
        };
        j.elementVisibilityCallback = function (a) {
          Array.from(a).forEach(function (a) {
            if (!d("WebAPIs").intersectionObserverEntryIsIntersecting(a))
              return;
            a = a.target;
            var b = j.$VisualCompletionTracing8.get(a);
            if (b == null) return;
            b.callback();
            b.executeOnce && j.$VisualCompletionTracing8["delete"](a);
          });
        };
        d("WebAPIs").MutationObserver &&
          (j.mutationObserver = new (d("WebAPIs").MutationObserver)(
            j.mutationRecordHandler
          ));
        d("WebAPIs").IntersectionObserver &&
          ((j.loadingStateObserver = new (d("WebAPIs").IntersectionObserver)(
            j.loadingStateObserverCallback
          )),
          (j.intersectionObserver = new (d("WebAPIs").IntersectionObserver)(
            j.intersectionObserverCallback
          )),
          (j.$VisualCompletionTracing2 = new (d(
            "WebAPIs"
          ).IntersectionObserver)(j.elementVisibilityCallback)));
        d("currentVCTraces").addVCTrace(
          f,
          babelHelpers.assertThisInitialized(j)
        );
        g === "INTERACTION"
          ? (j.measureOriginalViewport = !1)
          : (d("currentVCTraces").setCurrentNavigationVCTrace(
              babelHelpers.assertThisInitialized(j)
            ),
            (j.measureOriginalViewport = !0),
            i.measureOriginalViewportOnNavigation != null &&
              (j.measureOriginalViewport =
                i.measureOriginalViewportOnNavigation),
            h.forEach(function (a) {
              j.observeMutation(a);
            }));
        d("VisualCompletionUtil").setupScrollHandler(
          babelHelpers.assertThisInitialized(j)
        );
        return j;
      }
      var e = b.prototype;
      e.addMutationRoot = function (a) {
        if (this.reported || this.checkDuplicatedMutationRoot(a))
          return function () {};
        this.mutationSeq++;
        this.trackElements([[a, "mutationRoot"]], this.mutationSeq);
        return this.observeMutation(a);
      };
      e.dumpLocks = function () {
        return [
          this.pendingLocks,
          this.pendingLoadingElements,
          this.pendingImages,
        ];
      };
      e.lock = function (a) {
        var b = this;
        this.pendingLocks.set(a, c("performanceNowSinceAppStart")());
        return function () {
          b.unlock(a);
        };
      };
      e.imageDone = function (a) {
        var b = this.pendingImages.get(a);
        if (b == null) return;
        this.stateLog.set("imgLoad_" + this.$VisualCompletionTracing4++, [
          b,
          c("performanceNowSinceAppStart")(),
        ]);
        this.pendingImages["delete"](a);
        this.attemptMeasurement();
      };
      e.imageWait = function (a) {
        if (this.reported) return;
        this.pendingImages.set(a, c("performanceNowSinceAppStart")());
      };
      e.loadingElementRemoved = function (a, b) {
        var d = this.pendingLoadingElements.get(a);
        d != null &&
          (this.stateLog.set(
            "loadingState_" + this.$VisualCompletionTracing4++,
            [d, c("performanceNowSinceAppStart")()]
          ),
          this.pendingLoadingElements["delete"](a),
          this.addMarkerPoint("loadingState_end", b),
          this.attemptMeasurement());
      };
      e.loadingElementAdded = function (a, b) {
        if (this.reported) return;
        this.addFirstMarkerPoint("loadingState_start", b);
        this.pendingLoadingElements.set(a, c("performanceNowSinceAppStart")());
      };
      e.waitLoadingState = function (a) {
        var b = this;
        if (this.reported) return function () {};
        var e = this.$VisualCompletionTracing1.get(a);
        if (e)
          return function () {
            e(), b.loadingElementRemoved(a, c("performanceNowSinceAppStart")());
          };
        if (d("VisualCompletionUtil").shouldIgnoreMutation(a, this))
          return function () {};
        this.loadingStateObserver && this.loadingStateObserver.observe(a);
        ((!this.config.bypass_detached_element &&
          d("VisibilityAPI").canUseVisibilityAPI &&
          !d("VisibilityAPI").isVisibilityHidden()) ||
          d("VisualCompletionUtil").isInAboveTheFold(a, this)) &&
          this.loadingElementAdded(a, c("performanceNowSinceAppStart")());
        var f = function () {
          b.loadingStateObserver && b.loadingStateObserver.unobserve(a),
            b.$VisualCompletionTracing1["delete"](a);
        };
        this.$VisualCompletionTracing1.set(a, f);
        return function () {
          f(), b.loadingElementRemoved(a, c("performanceNowSinceAppStart")());
        };
      };
      e.trackImage = function (a, b, c) {
        d("VisualCompletionUtil").trackImage(a, b, c, this);
      };
      e.unlock = function (a, b) {
        var d = this.pendingLocks.get(a);
        if (d == null) return;
        this.pendingLocks["delete"](a);
        b = b != null ? b + "_" + a : a;
        this.stateLog.set("Lock(" + b + ")", [
          d,
          c("performanceNowSinceAppStart")(),
        ]);
        this.attemptMeasurement();
      };
      e.checkDuplicatedMutationRoot = function (a) {
        a = a;
        while (a != null) {
          if (this.mutationRoots.has(a)) return !0;
          a = a.parentElement;
        }
        return !1;
      };
      e.observeMutation = function (a) {
        var b = this;
        if (this.reported || this.checkDuplicatedMutationRoot(a))
          return function () {};
        d("VisualCompletionUtil").isElementNode(a) &&
          this.mutationObserver &&
          this.mutationObserver.observe(
            a,
            d("VisualCompletionUtil").mutationObserverConfig
          );
        this.mutationRoots.add(a);
        return function () {
          b.mutationRoots["delete"](a);
        };
      };
      e.registerNavigationMutationRoot = function (a) {
        if (this.reported || this.checkDuplicatedMutationRoot(a))
          return function () {};
        h.add(a);
        return function () {
          h["delete"](a);
        };
      };
      e.scheduleIntersectionObserver = function (a, b, e, f) {
        var g = this;
        if (this.reported) return;
        if (this.$VisualCompletionTracing1.has(b)) return;
        if (this.config.bypass_detached_element && b.isConnected === !1) return;
        this.mutatedElementCount++;
        if (
          d("VisibilityAPI").canUseVisibilityAPI &&
          d("VisibilityAPI").isVisibilityHidden()
        )
          this.addVisualElement(a, b, e, f);
        else if (d("WebAPIs").IntersectionObserver) {
          var h = this.pendingMutations.get(b);
          h &&
            (this.intersectionObserver &&
              this.intersectionObserver.unobserve(b),
            this.pendingMutations["delete"](b),
            this.pendingLocks["delete"](h.lockId));
          var i = e + "_paint_" + this.$VisualCompletionTracing4++;
          this.intersectionObserver && this.intersectionObserver.observe(b);
          this.lock(i);
          this.pendingMutations.set(b, {
            displayTimestamp: f,
            lockId: i,
            mutationType: e,
            mutationSeq: a,
          });
          this.config.intersection_observer_timeout != null &&
            c("setTimeoutAcrossTransitions")(function () {
              if (g.pendingMutations.has(b)) {
                var d;
                b.isConnected !== !1 &&
                  g.addVisualElement(
                    a,
                    b,
                    "mutationTimeout",
                    c("performanceNowSinceAppStart")()
                  );
                (d = g.intersectionObserver) == null ? void 0 : d.unobserve(b);
                g.addAnnotationInt(
                  "intersection_observer_timeout_count",
                  ++g.$VisualCompletionTracing5
                );
                g.pendingMutations["delete"](b);
                g.unlock(i, "timeout");
              }
            }, this.config.intersection_observer_timeout);
        } else {
          var j = e + "_paint_" + this.$VisualCompletionTracing4++;
          this.lock(j);
          d("foregroundRequestAnimationFrame").foregroundRequestAnimationFrame(
            function () {
              g.addVisualElement(a, b, e, c("performanceNowSinceAppStart")()),
                g.unlock(j);
            }
          );
        }
      };
      e.scheduleElementVisibleObserver = function (a, b, c) {
        var e = c.executeOnce;
        e = e === void 0 ? !0 : e;
        c = c.cleanAfterReport;
        c = c === void 0 ? !0 : c;
        if (this.reported) return;
        if (d("WebAPIs").IntersectionObserver) {
          var f = this.$VisualCompletionTracing8.get(a);
          f &&
            this.$VisualCompletionTracing2 &&
            this.$VisualCompletionTracing2.unobserve(a);
          this.$VisualCompletionTracing8.set(a, {
            executeOnce: e,
            callback: b,
            cleanAfterReport: c,
          });
          this.$VisualCompletionTracing2 &&
            this.$VisualCompletionTracing2.observe(a);
        } else return;
      };
      e.trackElements = function (a, b) {
        var e = this;
        if (this.reported) return;
        var f = [];
        a.forEach(function (a) {
          var b = a[0];
          d("VisualCompletionUtil").isElementNode(b) &&
            !d("VisualCompletionUtil").useCustomTracking(b) &&
            f.push(a);
        });
        var g = c("performanceNowSinceAppStart")();
        f.forEach(function (a) {
          var c = a[0];
          a = a[1];
          d("VisualCompletionUtil").checkLoadingStates(c, e);
          e.scheduleIntersectionObserver(b, c, a, g);
        });
        var h = d("currentVCTraces").getCurrentNavigationVCTrace();
        this.interactionType === "INTERACTION" &&
          h != null &&
          !h.reported &&
          a.forEach(function (a) {
            a = a[0];
            h == null ? void 0 : h.excludeElement(a);
          });
      };
      e.onBeforeComplete = function (a) {
        if (this.reported) return;
        this.$VisualCompletionTracing6.push(a);
      };
      e.onComplete = function (a) {
        if (this.reported) return;
        this.$VisualCompletionTracing7.push(a);
      };
      e.attemptMeasurement = function (a) {
        var b = this;
        a === void 0 && (a = !1);
        if (
          !a &&
          (this.loggingScheduled ||
            this.reported ||
            this.pendingLocks.size > 0 ||
            this.pendingLoadingElements.size > 0 ||
            this.pendingImages.size > 0)
        )
          return;
        this.loggingScheduled = !0;
        var e = function () {
            b.mutationObserver && b.mutationObserver.disconnect();
            b.$VisualCompletionTracing1.forEach(function (a) {
              a();
            });
            b.loadingStateObserver && b.loadingStateObserver.disconnect();
            b.$VisualCompletionTracing1.clear();
            b.$VisualCompletionTracing3.forEach(function (a) {
              a && a.disconnect();
            });
            d("currentVCTraces").removeVCTrace(b.traceID);
            b.intersectionObserver && b.intersectionObserver.disconnect();
            b.pendingMutations.clear();
            !a &&
              d("ResourceTimingAPI").canUseResourceTimingAPI() &&
              d("VisualCompletionUtil").scanCssBgElements(b);
            var e = b.calculate(a);
            b.$VisualCompletionTracing6.forEach(function (a) {
              a(e);
            });
            b.$VisualCompletionTracing6 = [];
            c("VisualCompletionTraceObserver").emit(e);
            b.$VisualCompletionTracing7.forEach(function (a) {
              a(e);
            });
            b.$VisualCompletionTracing7 = [];
            b.$VisualCompletionTracing2 &&
              b.$VisualCompletionTracing2.disconnect();
            b.$VisualCompletionTracing8.clear();
            b.tearDown();
          },
          f =
            this.config.defer_expensive_calculation && !a
              ? this.config.defer_expensive_calculation
              : function (a) {
                  return a();
                };
        f(e);
      };
      e.forceMeasurement = function () {
        var a = this;
        if (this.reported) return;
        this.pendingLocks.size > 0 &&
          (c("addAnnotations")(this.annotations, {
            int: { incompleteLockCount: this.pendingLocks.size },
          }),
          this.pendingLocks.forEach(function (b, d) {
            a.addTag("incompleteLocks", d),
              a.stateLog.set("incomplete_" + d, [
                b,
                c("performanceNowSinceAppStart")(),
              ]);
          }));
        this.pendingLoadingElements.size > 0 &&
          (c("addAnnotations")(this.annotations, {
            int: {
              incompleteLoadingElementsCount: this.pendingLoadingElements.size,
            },
          }),
          this.pendingLoadingElements.forEach(function (b) {
            a.stateLog.set(
              "incomplete_loadingState_" + a.$VisualCompletionTracing4++,
              [b, c("performanceNowSinceAppStart")()]
            );
          }));
        this.pendingImages.size > 0 &&
          (c("addAnnotations")(this.annotations, {
            int: { incompleteImageCount: this.pendingImages.size },
          }),
          this.pendingImages.forEach(function (b) {
            a.stateLog.set(
              "incomplete_imgLoad_" + a.$VisualCompletionTracing4++,
              [b, c("performanceNowSinceAppStart")()]
            );
          }));
        this.pendingLocks.clear();
        this.pendingLoadingElements.clear();
        this.pendingImages.clear();
        this.attemptMeasurement(!0);
      };
      e.tearDown = function () {
        a.prototype.tearDown.call(this);
        for (
          var b = this.$VisualCompletionTracing8.entries(),
            c = Array.isArray(b),
            d = 0,
            b = c
              ? b
              : b[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          if (c) {
            if (d >= b.length) break;
            e = b[d++];
          } else {
            d = b.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          var f = e[0];
          e = e[1];
          e.cleanAfterReport && this.$VisualCompletionTracing8["delete"](f);
        }
      };
      return b;
    })(c("VisualCompletionLogger"));
    g["default"] = b;
  },
  98
);
__d(
  "vc-tracker",
  [
    "VisibilityAPI",
    "VisibilityState",
    "VisualCompletionAttributes",
    "VisualCompletionConstants",
    "VisualCompletionTraceObserver",
    "VisualCompletionTracing",
    "VisualCompletionUtil",
    "currentVCTraces",
    "performanceAbsoluteNow",
    "performanceNavigationStart",
    "performanceNowSinceAppStart",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i;
    e = {
      findVCTraces: (a = d("VisualCompletionUtil")).findVCTraces,
      getCurrentVCTraces: (b = d("currentVCTraces")).getCurrentVCTraces,
      getCurrentNavigationVCTrace: b.getCurrentNavigationVCTrace,
      getLastNavigationVCReport: b.getLastNavigationVCReport,
      ignoreElement: a.ignoreElement,
      setCurrentNavigationVCTrace: b.setCurrentNavigationVCTrace,
      setLastNavigationVCReport: b.setLastNavigationVCReport,
      performanceAbsoluteNow: h || (h = c("performanceAbsoluteNow")),
      performanceNavigationStart: c("performanceNavigationStart"),
      performanceNow: c("performanceNowSinceAppStart"),
      trimHash: d("VisualCompletionUtil").trimHash,
      trackLoadingState: d("VisualCompletionUtil").trackLoadingState,
      trackImageLoad: d("VisualCompletionUtil").trackImageLoad,
      VisibilityState: {
        canUseVisibilityAPI: d("VisibilityAPI").canUseVisibilityAPI,
        firstHiddenTime: d("VisibilityState").firstHiddenTime,
        subscribe: d("VisibilityState").subscribe,
        wasHidden: d("VisibilityState").wasHidden,
        totalHiddenTime: d("VisibilityState").totalHiddenTime,
      },
      VisualCompletionAttributes: c("VisualCompletionAttributes"),
      VisualCompletionConstants: i || (i = c("VisualCompletionConstants")),
      VisualCompletionTracing: c("VisualCompletionTracing"),
      VisualCompletionTraceObserver: c("VisualCompletionTraceObserver"),
    };
    g["default"] = e;
  },
  98
);
__d(
  "MemoryUtils",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function g() {
      return window.performance && window.performance.memory;
    }
    function a() {
      return (
        window.performance &&
        typeof window.performance.measureUserAgentSpecificMemory === "function"
      );
    }
    function b() {
      if (g()) {
        typeof window.gc === "function" && window.gc();
        var a = window.performance.memory;
        return { usedJSHeapSize: a.usedJSHeapSize };
      }
      return { usedJSHeapSize: null };
    }
    f.isMemoryAPISupported = g;
    f.isMeasureMemoryOriginTrialSupported = a;
    f.getCurrentMemory = b;
  },
  66
);
__d(
  "ErrorMetadata",
  ["fb-error"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      b.addGlobalMetadata = function (b, c, d) {
        a.addGlobalMetadata.call(this, b, c, d);
      };
      return b;
    })(c("fb-error").ErrorMetadata);
    g["default"] = a;
  },
  98
);
