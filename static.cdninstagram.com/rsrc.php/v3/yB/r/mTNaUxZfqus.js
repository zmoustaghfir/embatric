/*FB_PKG_DELIM*/

__d(
  "CometEventListener",
  ["unrecoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function h(a, b, d, e) {
      if (a.addEventListener) {
        a.addEventListener(b, d, e);
        return {
          remove: function () {
            a.removeEventListener(b, d, e);
          },
        };
      } else
        throw c("unrecoverableViolation")(
          'Attempted to listen to eventType "' +
            b +
            '" on a target that does not have addEventListener.',
          "comet_ui"
        );
    }
    a = {
      bubbleWithPassiveFlag: function (a, b, c, d) {
        return h(a, b, c, { capture: !1, passive: d });
      },
      capture: function (a, b, c) {
        return h(a, b, c, !0);
      },
      captureWithPassiveFlag: function (a, b, c, d) {
        return h(a, b, c, { capture: !0, passive: d });
      },
      listen: function (a, b, c) {
        return h(a, b, c, !1);
      },
      registerDefault: function (a, b) {
        throw c("unrecoverableViolation")(
          "EventListener.registerDefault is not implemented.",
          "comet_ui"
        );
      },
      suppress: function (a) {
        a.preventDefault(), a.stopPropagation();
      },
    };
    g["default"] = a;
  },
  98
);
__d(
  "UserActivity",
  ["cr:1634616"],
  function (a, b, c, d, e, f) {
    e.exports = b("cr:1634616");
  },
  null
);
__d(
  "DataAttributeUtils",
  ["DataStore"],
  function (a, b, c, d, e, f) {
    var g = [];
    function h(a, b) {
      a = a;
      while (a) {
        if (b(a)) return a;
        a = a.parentNode;
      }
      return null;
    }
    function i(a, b) {
      a = h(a, function (a) {
        return a instanceof Element && !!a.getAttribute(b);
      });
      return a instanceof Element ? a : null;
    }
    var j = {
        LEGACY_CLICK_TRACKING_ATTRIBUTE: "data-ft",
        CLICK_TRACKING_DATASTORE_KEY: "data-ft",
        ENABLE_STORE_CLICK_TRACKING: "data-fte",
        IMPRESSION_TRACKING_CONFIG_ATTRIBUTE: "data-xt-vimp",
        IMPRESSION_TRACKING_CONFIG_DATASTORE_KEY: "data-xt-vimp",
        REMOVE_LEGACY_TRACKING: "data-ftr",
        getDataAttribute: function (a, b) {
          return k[b] ? k[b](a) : a.getAttribute(b);
        },
        setDataAttribute: function (a, b, c) {
          return l[b] ? l[b](a, c) : a.setAttribute(b, c);
        },
        getDataFt: function (a) {
          if (a.getAttribute(j.ENABLE_STORE_CLICK_TRACKING)) {
            var c = b("DataStore").get(a, j.CLICK_TRACKING_DATASTORE_KEY);
            c ||
              (c = j.moveClickTrackingToDataStore(
                a,
                a.getAttribute(j.REMOVE_LEGACY_TRACKING)
              ));
            return c;
          }
          return a.getAttribute(j.LEGACY_CLICK_TRACKING_ATTRIBUTE);
        },
        setDataFt: function (a, c) {
          if (a.getAttribute(j.ENABLE_STORE_CLICK_TRACKING)) {
            b("DataStore").set(a, j.CLICK_TRACKING_DATASTORE_KEY, c);
            return;
          }
          a.setAttribute(j.LEGACY_CLICK_TRACKING_ATTRIBUTE, c);
        },
        moveXTVimp: function (a) {
          j.moveAttributeToDataStore(
            a,
            j.IMPRESSION_TRACKING_CONFIG_ATTRIBUTE,
            j.IMPRESSION_TRACKING_CONFIG_DATASTORE_KEY
          ),
            g.push(a.id);
        },
        getXTrackableElements: function () {
          var a = g
              .map(function (a) {
                return document.getElementById(a);
              })
              .filter(function (a) {
                return !!a;
              }),
            b = document.querySelectorAll("[data-xt-vimp]");
          for (var c = 0; c < b.length; c++) a.push(b[c]);
          return a;
        },
        getDataAttributeGeneric: function (a, c, d) {
          d = b("DataStore").get(a, d);
          return d !== void 0 ? d : a.getAttribute(c);
        },
        moveAttributeToDataStore: function (a, c, d) {
          var e = a.getAttribute(c);
          e && (b("DataStore").set(a, d, e), a.removeAttribute(c));
        },
        moveClickTrackingToDataStore: function (a, c) {
          var d = a.getAttribute(j.LEGACY_CLICK_TRACKING_ATTRIBUTE);
          d &&
            (b("DataStore").set(a, j.CLICK_TRACKING_DATASTORE_KEY, d),
            c && a.removeAttribute(j.LEGACY_CLICK_TRACKING_ATTRIBUTE));
          return d;
        },
        getClickTrackingParent: function (a) {
          a =
            i(a, j.LEGACY_CLICK_TRACKING_ATTRIBUTE) ||
            i(a, j.ENABLE_STORE_CLICK_TRACKING);
          return a;
        },
        getClickTrackingElements: function (a) {
          return a.querySelectorAll(
            "[" +
              j.LEGACY_CLICK_TRACKING_ATTRIBUTE +
              "], [" +
              j.ENABLE_STORE_CLICK_TRACKING +
              "]"
          );
        },
        getParentByAttributeOrDataStoreKey: function (a, c, d) {
          while (
            a &&
            (!a.getAttribute || !a.getAttribute(c)) &&
            b("DataStore").get(a, d) === void 0
          )
            a = a.parentNode;
          return a;
        },
      },
      k = {
        "data-ft": j.getDataFt,
        "data-xt-vimp": function (a) {
          return j.getDataAttributeGeneric(a, "data-xt-vimp", "data-xt-vimp");
        },
        "data-ad": function (a) {
          return j.getDataAttributeGeneric(a, "data-ad", "data-ad");
        },
        "data-xt": function (a) {
          return j.getDataAttributeGeneric(a, "data-xt", "data-xt");
        },
      },
      l = {
        "data-ft": j.setDataFt,
        "data-xt": function (a, c) {
          b("DataStore").set(a, "data-xt", c);
        },
      };
    e.exports = j;
  },
  null
);
__d(
  "collectDataAttributes",
  ["DataAttributeUtils", "getContextualParent"],
  function (a, b, c, d, e, f) {
    var g = "normal";
    function a(a, c, d) {
      var e = {},
        f = [],
        h = c.length,
        i;
      for (i = 0; i < h; ++i) (e[c[i]] = {}), f.push("data-" + c[i]);
      if (d) {
        e[g] = {};
        for (i = 0; i < (d || []).length; ++i) f.push(d[i]);
      }
      d = { tn: "", "tn-debug": "," };
      a = a;
      while (a) {
        if (a.getAttribute)
          for (i = 0; i < f.length; ++i) {
            var j = f[i],
              k = b("DataAttributeUtils").getDataAttribute(a, j);
            if (k) {
              if (i >= h) {
                e[g][j] === void 0 && (e[g][j] = k);
                continue;
              }
              j = JSON.parse(k);
              for (k in j)
                d[k] !== void 0
                  ? (e[c[i]][k] === void 0 && (e[c[i]][k] = []),
                    e[c[i]][k].push(j[k]))
                  : e[c[i]][k] === void 0 && (e[c[i]][k] = j[k]);
            }
          }
        a = b("getContextualParent")(a);
      }
      for (k in e)
        for (j in d) e[k][j] !== void 0 && (e[k][j] = e[k][j].join(d[j]));
      return e;
    }
    e.exports = a;
  },
  null
);
__d(
  "isTruthy",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a != null && Boolean(a);
    }
    f["default"] = a;
  },
  66
);
__d(
  "UserActivityBlue",
  ["Arbiter", "Event", "isTruthy"],
  function (a, b, c, d, e, f) {
    var g = 5e3,
      h = 500,
      i = -5,
      j = Date.now(),
      k = j,
      l = !1,
      m = Date.now(),
      n = document.hasFocus ? document.hasFocus() : !0,
      o = 0,
      p = Date.now(),
      q = -1,
      r = -1,
      s = !1,
      t = !1,
      u = {
        EVENT_INTERVAL_MS: h,
        subscribeOnce: function (a) {
          var b = u.subscribe(function (c, d) {
            u.unsubscribe(b), a(d);
          });
          return b;
        },
        subscribe: function (a) {
          return b("Arbiter").subscribe("useractivity/activity", a);
        },
        unsubscribe: function (a) {
          a.unsubscribe();
        },
        isActive: function (a) {
          return new Date().getTime() - j < (b("isTruthy")(a) ? a : g);
        },
        isOnTab: function () {
          return n;
        },
        hasBeenInactive: function () {
          return l;
        },
        resetActiveStatus: function () {
          (n = !0), (l = !1);
        },
        getLastInActiveEnds: function () {
          return m;
        },
        getLastActive: function () {
          return j;
        },
        setIdleTime: function (a) {
          o = a;
        },
        getLastLeaveTime: function () {
          return p;
        },
        getLastInformTime: function () {
          return k;
        },
        hasClicked: function () {
          return s;
        },
        hasInteractedWithKeyboard: function () {
          return t;
        },
        reset: function () {
          (j = Date.now()),
            (k = j),
            (l = !1),
            (m = Date.now()),
            (n = document.hasFocus ? document.hasFocus() : !0),
            (o = 0),
            (p = Date.now()),
            (q = -1),
            (r = -1),
            (s = !1),
            (t = !1);
        },
      };
    function v(a) {
      x(a, h);
    }
    function w(a) {
      x(a, 0);
    }
    function x(c, d) {
      d === void 0 && (d = 0);
      var e = a.KeyboardEvent,
        f = a.MouseEvent;
      if (f && c instanceof f) {
        if (
          /^mouse(enter|leave|move|out|over)$/.test(c.type) &&
          c.pageX == q &&
          c.pageY == r
        )
          return;
        q = c.pageX;
        r = c.pageY;
      } else e && c instanceof e && (t = !0);
      (c.type === "click" ||
        c.type === "dblclick" ||
        c.type === "contextmenu") &&
        (s = !0);
      j = Date.now();
      f = j - k;
      f > d
        ? ((k = j),
          n || (p = j),
          f >= (o || g) && ((l = !0), (m = j)),
          b("Arbiter").inform("useractivity/activity", {
            event: c,
            idleness: f,
            last_inform: k,
          }))
        : f < i && (k = j);
    }
    function c(a) {
      (n = !0), (m = Date.now()), w(a);
    }
    function d(a) {
      (n = !1), (l = !0), (p = Date.now());
    }
    b("Event").listen(window, "scroll", v);
    b("Event").listen(window, "focus", c);
    b("Event").listen(window, "blur", d);
    b("Event").listen(
      document.documentElement,
      { keydown: v, mouseover: v, mousemove: v, click: v },
      void 0,
      void 0,
      { passive: !0 }
    );
    b("Arbiter").subscribe("Event/stop", function (a, b) {
      v(b.event);
    });
    e.exports = u;
  },
  null
);
