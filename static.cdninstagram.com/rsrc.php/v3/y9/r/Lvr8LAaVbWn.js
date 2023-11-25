/*FB_PKG_DELIM*/

__d(
  "HeroInteractionContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = function () {};
    c = {
      consumeBootload: b,
      hold: function () {
        return "";
      },
      logHeroRender: b,
      logMetadata: b,
      logPageletVC: b,
      logReactCommit: b,
      logReactPostCommit: b,
      logReactRender: b,
      pageletStack: [],
      registerPlaceholder: b,
      removePlaceholder: b,
      suspenseCallback: b,
      unhold: b,
    };
    e = a.createContext(c);
    g.DEFAULT_CONTEXT_VALUE = c;
    g.Context = e;
  },
  98
);
__d(
  "HeroInteractionIDContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext(null);
    g["default"] = b;
  },
  98
);
__d(
  "HeroComponent.react",
  ["HeroInteractionContext", "HeroInteractionIDContext", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || (h = d("react"));
    e = h;
    var i = e.useContext,
      j = e.useLayoutEffect;
    function a(a) {
      var b = a.description,
        e = i(d("HeroInteractionContext").Context),
        f = i(c("HeroInteractionIDContext"));
      j(
        function () {
          f != null && e.logHeroRender(f, b, e.pageletStack);
        },
        [b, e, f]
      );
      return null;
    }
    a.displayName = "HeroComponent";
    f = b.memo(a);
    g["default"] = f;
  },
  98
);
__d(
  "HeroCurrentInteractionForLoggingContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({ current: null });
    g["default"] = b;
  },
  98
);
__d(
  "HeroHoldTrigger.react",
  ["HeroInteractionContext", "HeroInteractionIDContext", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    h || (h = d("react"));
    b = h;
    var i = b.useContext,
      j = b.useLayoutEffect;
    function a(a) {
      var b = a.description,
        e = a.hold,
        f = i(d("HeroInteractionContext").Context),
        g = i(c("HeroInteractionIDContext"));
      j(
        function () {
          if (e && g != null) {
            var a = f.hold(g, f.pageletStack, b);
            return function () {
              f.unhold(g, a);
            };
          }
        },
        [b, f, g, e]
      );
      return null;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    a.displayName = "HeroHoldTrigger";
    g["default"] = a;
  },
  98
);
__d(
  "react-relay/relay-hooks/ProfilerContext",
  ["react"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g;
    a = g || b("react");
    c = a.createContext({
      wrapPrepareQueryResource: function (a) {
        return a();
      },
    });
    e.exports = c;
  },
  null
);
__d(
  "RelayProfilerContext",
  ["react-relay/relay-hooks/ProfilerContext"],
  function (a, b, c, d, e, f, g) {
    g["default"] = c("react-relay/relay-hooks/ProfilerContext");
  },
  98
);
__d(
  "HeroInteractionContextPassthrough.react",
  [
    "HeroCurrentInteractionForLoggingContext",
    "HeroInteractionContext",
    "HeroInteractionIDContext",
    "RelayProfilerContext",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react"),
      j = { current: null },
      k = {
        consumeBootload: function () {},
        retainQuery: function () {},
        wrapPrepareQueryResource: function (a) {
          return a();
        },
      };
    function a(a) {
      var b = a.children;
      a = a.clear;
      a = a === void 0 ? !0 : a;
      return !a
        ? b
        : i.jsx(d("HeroInteractionContext").Context.Provider, {
            value: d("HeroInteractionContext").DEFAULT_CONTEXT_VALUE,
            children: i.jsx(
              c("HeroCurrentInteractionForLoggingContext").Provider,
              {
                value: j,
                children: i.jsx(c("HeroInteractionIDContext").Provider, {
                  value: null,
                  children: i.jsx(c("RelayProfilerContext").Provider, {
                    value: k,
                    children: b,
                  }),
                }),
              }
            ),
          });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    a.displayName = "HeroInteractionContextPassthrough";
    g["default"] = a;
  },
  98
);
__d(
  "HeroPendingPlaceholderTracker",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = new Map();
    function a(a) {
      g.has(a) || g.set(a, new Map());
    }
    function b(a, b, c, d, e) {
      a = g.get(a);
      a && a.set(b, { description: c, startTime: d, pageletStack: e });
    }
    function c(a) {
      a = g.get(a);
      return a ? Array.from(a.values()) : [];
    }
    function d(a) {
      g["delete"](a);
    }
    function e(a, b) {
      a = g.get(a);
      a && a["delete"](b);
    }
    function h(a) {
      return g.has(a);
    }
    f.addInteraction = a;
    f.addPlaceholder = b;
    f.dump = c;
    f.removeInteraction = d;
    f.removePlaceholder = e;
    f.isInteractionActive = h;
  },
  66
);
__d(
  "HeroFallbackTracker.react",
  ["HeroInteractionContext", "HeroInteractionIDContext", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || d("react");
    var i = b.useContext,
      j = b.useLayoutEffect;
    function a(a) {
      var b = a.uuid,
        e = i(d("HeroInteractionContext").Context),
        f = i(c("HeroInteractionIDContext"));
      j(
        function () {
          if (f != null) {
            e.registerPlaceholder(f, b, e.pageletStack);
            return function () {
              e.removePlaceholder(f, b);
            };
          }
        },
        [e, f, b]
      );
      return null;
    }
    a.displayName = "HeroFallbackTracker";
    g["default"] = a;
  },
  98
);
__d(
  "HeroPlaceholderUtils",
  ["PromiseAnnotate"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = 0;
    function a() {
      return String(i++);
    }
    function b(a) {
      if (a != null && a.size > 0)
        return Array.from(a)
          .map(function (a) {
            a = (h || (h = d("PromiseAnnotate"))).getDisplayName(a);
            if (a != null) return a;
            else return "Promise";
          })
          .join(",");
      else return null;
    }
    g.getSimpleUUID = a;
    g.createThenableDescription = b;
  },
  98
);
__d(
  "useStable",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = (h || d("react")).useRef;
    function a(a) {
      var b = i(null),
        c = b.current;
      if (c === null) {
        a = a();
        b.current = { value: a };
        return a;
      } else return c.value;
    }
    g["default"] = a;
  },
  98
);
__d(
  "HeroPlaceholder.react",
  [
    "HeroFallbackTracker.react",
    "HeroInteractionContext",
    "HeroInteractionIDContext",
    "HeroPlaceholderUtils",
    "react",
    "useStable",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    b = h;
    var j = b.useCallback,
      k = b.useContext,
      l = b.useLayoutEffect,
      m = b.useRef;
    e = function (a) {
      a = a.children;
      return a;
    };
    function n(a) {
      var b = a.cb,
        c = m(!1);
      l(function () {
        c.current || (b(), (c.current = !0));
      });
      return null;
    }
    function a(a) {
      var b = a.children,
        e = a.fallback,
        f = a.name,
        g = a.unstable_avoidThisFallback,
        h = a.unstable_onSuspense,
        o = k(d("HeroInteractionContext").Context),
        p = k(c("HeroInteractionIDContext")),
        q = c("useStable")(d("HeroPlaceholderUtils").getSimpleUUID),
        r = c("useStable")(d("HeroPlaceholderUtils").getSimpleUUID),
        s = m(!1);
      a = b;
      b = j(
        function (a) {
          if (p != null) {
            var b;
            o.suspenseCallback(
              p,
              q,
              o.pageletStack,
              a,
              (b = f) != null ? b : "Unnamed Suspense"
            );
          }
          if (h) {
            a =
              (b = d("HeroPlaceholderUtils").createThenableDescription(a)) !=
              null
                ? b
                : "";
            h(a);
          }
        },
        [o, p, f, q, h]
      );
      l(
        function () {
          if (s.current === !1 && p != null && p != null) {
            o.hold(p, o.pageletStack, "Hydration", r, f);
            return function () {
              return o.unhold(p, r);
            };
          }
        },
        [o, p, f, r]
      );
      var t = function () {
        (s.current = !0), p != null && o.unhold(p, r);
      };
      return i.jsxs(i.Suspense, {
        fallback: i.jsxs(i.Fragment, {
          children: [
            e,
            i.jsx(n, { cb: t }),
            i.jsx(c("HeroFallbackTracker.react"), { uuid: q }),
          ],
        }),
        suspenseCallback: b,
        unstable_avoidThisFallback: g,
        children: [i.jsx(n, { cb: t }), a],
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    a.displayName = "HeroPlaceholder";
    g["default"] = a;
  },
  98
);
__d(
  "hero-tracing-placeholder",
  [
    "HeroComponent.react",
    "HeroCurrentInteractionForLoggingContext",
    "HeroHoldTrigger.react",
    "HeroInteractionContext",
    "HeroInteractionContextPassthrough.react",
    "HeroInteractionIDContext",
    "HeroPendingPlaceholderTracker",
    "HeroPlaceholder.react",
    "HeroPlaceholderUtils",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    (g.HeroComponent = c("HeroComponent.react")),
      (g.HeroHoldTrigger = c("HeroHoldTrigger.react")),
      (g.HeroInteractionContext = d("HeroInteractionContext")),
      (g.HeroInteractionContextPassthrough = c(
        "HeroInteractionContextPassthrough.react"
      )),
      (g.HeroInteractionIDContext = c("HeroInteractionIDContext")),
      (g.HeroCurrentInteractionForLoggingContext = c(
        "HeroCurrentInteractionForLoggingContext"
      )),
      (g.HeroPendingPlaceholderTracker = d("HeroPendingPlaceholderTracker")),
      (g.HeroPlaceholder = c("HeroPlaceholder.react")),
      (g.HeroPlaceholderUtils = d("HeroPlaceholderUtils"));
  },
  98
);
__d(
  "CometHeroInteractionContext",
  ["hero-tracing-placeholder"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = d("hero-tracing-placeholder").HeroInteractionContext;
  },
  98
);
__d(
  "useHeroBootloadedComponent",
  ["CometHeroInteractionContext", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || d("react");
    var i = b.useContext,
      j = b.useEffect;
    function a(a) {
      var b = i(c("CometHeroInteractionContext").Context);
      j(
        function () {
          b.consumeBootload(a.getModuleId());
        },
        [b, a]
      );
    }
    g["default"] = a;
  },
  98
);
__d(
  "IGDWebUtils",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a != null
        ? a === 1217981644879628 ||
            a === 936619743392459 ||
            a === 487152425211411 ||
            a === 1035956773910536
        : !1;
    }
    f.isInstagramWebSupportedApp = a;
  },
  66
);
__d(
  "warning",
  ["WebDriverConfig", "cr:1105154", "cr:11202", "cr:2682"],
  function (a, b, c, d, e, f, g) {
    a = b("cr:2682");
    c = a;
    g["default"] = c;
  },
  98
);
__d(
  "ARIA",
  ["DOM", "emptyFunction", "ge", "getOrCreateDOMID", "joinClasses"],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j = function () {
        (h = c("ge")("ariaAssertiveAlert")),
          h ||
            ((h = c("DOM").create("div", {
              id: "ariaAssertiveAlert",
              className: c("joinClasses")(
                "accessible_elem",
                "accessible_elem_offset"
              ),
              "aria-live": "assertive",
            })),
            c("DOM").appendContent(document.body, h)),
          (i = c("ge")("ariaPoliteAlert")),
          i ||
            ((i = h.cloneNode(!1)),
            i.setAttribute("id", "ariaPoliteAlert"),
            i.setAttribute("aria-live", "polite"),
            c("DOM").appendContent(document.body, i)),
          (j = c("emptyFunction"));
      };
    function k(a, b) {
      j();
      b = b ? h : i;
      c("DOM").setContent(b, a);
    }
    function a(a) {
      for (
        var b = arguments.length, d = new Array(b > 1 ? b - 1 : 0), e = 1;
        e < b;
        e++
      )
        d[e - 1] = arguments[e];
      var f = d
        .map(function (a) {
          return c("getOrCreateDOMID")(a);
        })
        .join(" ");
      a.setAttribute("aria-controls", f);
    }
    function b(a) {
      for (
        var b = arguments.length, d = new Array(b > 1 ? b - 1 : 0), e = 1;
        e < b;
        e++
      )
        d[e - 1] = arguments[e];
      var f = d
        .map(function (a) {
          return c("getOrCreateDOMID")(a);
        })
        .join(" ");
      a.setAttribute("aria-describedby", f);
    }
    function d(a, b) {
      a.setAttribute("aria-owns", c("getOrCreateDOMID")(b));
    }
    function e(a, b) {
      b = c("getOrCreateDOMID")(b);
      a.setAttribute("aria-controls", b);
      a.setAttribute("aria-haspopup", "true");
      b = a.getAttribute("role") || "";
      b && a.setAttribute("role", b);
    }
    function f(a) {
      k(a, !0);
    }
    function l(a) {
      k(a, !1);
    }
    g.controls = a;
    g.describedBy = b;
    g.owns = d;
    g.setPopup = e;
    g.announce = f;
    g.notify = l;
  },
  98
);
__d(
  "nl2br",
  ["DOM"],
  function (a, b, c, d, e, f, g) {
    var h = /(\r\n|[\r\n])/;
    function a(a) {
      return a.split(h).map(function (a) {
        return h.test(a) ? c("DOM").create("br") : a;
      });
    }
    g["default"] = a;
  },
  98
);
__d(
  "requestIdleCallbackWWW",
  ["cr:694370"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:694370");
  },
  98
);
__d(
  "CometSSRClientRender",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = "CometSSRClientRenderError",
      h = function (a) {
        (this.message = g + ": " + a),
          (this.name = "CometSSRClientRenderError");
      };
    function a(a) {
      throw new h(a);
    }
    f.CometSSRClientRenderError = g;
    f.ClientRenderSentinel = h;
    f.CometSSRClientRender = a;
  },
  66
);
__d(
  "suspendOrThrowIfUsedInSSR",
  ["CometSSRClientRender", "ExecutionEnvironment"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function a(a) {
      if (!(h || (h = c("ExecutionEnvironment"))).isInBrowser)
        throw d("CometSSRClientRender").CometSSRClientRender(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "BootloaderResource",
  ["ExecutionEnvironment", "suspendOrThrowIfUsedInSSR"],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j = {};
    function a(a) {
      a.load();
    }
    function b(b) {
      var a = b.getModuleIfRequireable();
      if (a == null) {
        !(h || (h = c("ExecutionEnvironment"))).isInBrowser &&
          !b.isAvailableInSSR_DO_NOT_USE() &&
          (i || (i = c("suspendOrThrowIfUsedInSSR")))(
            "Loading of bootloaded and T3 components is disabled during SSR"
          );
        var d = b.getModuleId();
        if (!j[d]) {
          b = j[d] = b.load();
          b["finally"](function () {
            delete j[d];
          });
        }
        throw j[d];
      }
      return a;
    }
    g.preload = a;
    g.read = b;
  },
  98
);
__d(
  "clamp",
  [],
  function (a, b, c, d, e, f) {
    function a(a, b, c) {
      if (a < b) return b;
      return a > c ? c : a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "coerceImageishSprited",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      if (!a || typeof a !== "object" || !a.sprited) return null;
      return a.sprited === 1
        ? {
            type: "css",
            className: a.spriteMapCssClass + " " + a.spriteCssClass,
            identifier: a.loggingID,
          }
        : {
            type: "cssless",
            style: {
              backgroundImage: "url('" + a.spi + "')",
              backgroundPosition: a.p,
              backgroundSize: a.sz,
              width: a.w + "px",
              height: a.h + "px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            },
            identifier: a.loggingID,
          };
    }
    f["default"] = a;
  },
  66
);
__d(
  "coerceImageishURL",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      if (
        a &&
        typeof a === "object" &&
        !a.sprited &&
        typeof a.uri === "string" &&
        a.width !== void 0 &&
        a.height !== void 0
      )
        return a;
      else return null;
    }
    f["default"] = a;
  },
  66
);
__d(
  "emptyObject",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = {};
    b = a;
    f["default"] = b;
  },
  66
);
__d(
  "memoizeWithArgs",
  [],
  function (a, b, c, d, e, f) {
    var g = Object.prototype.hasOwnProperty;
    function a(a, b, c) {
      var d;
      c = function () {
        d || (d = {});
        var c = b.apply(void 0, arguments);
        g.call(d, c) || (d[c] = a.apply(void 0, arguments));
        return d[c];
      };
      return c;
    }
    f["default"] = a;
  },
  66
);
__d(
  "padNumber",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b) {
      a = a.toString();
      return a.length >= b ? a : "0".repeat(b - a.length) + a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "LegacyHidden",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react"),
      j = i.unstable_LegacyHidden;
    function a(a, b) {
      var c = a.children,
        d = a.htmlAttributes,
        e = a.mode;
      a = a.suppressHydrationWarning;
      return i.jsx(
        "div",
        babelHelpers["extends"]({}, d, {
          hidden: e === "hidden" ? !0 : void 0,
          ref: b,
          suppressHydrationWarning: a,
          children: i.jsx(j, {
            mode: e === "hidden" ? "unstable-defer-without-hiding" : e,
            children: c,
          }),
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    a.displayName = "LegacyHidden";
    b = i.forwardRef(a);
    g["default"] = b;
  },
  98
);
__d(
  "isBarcelonaURI",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      var b = a.getProtocol();
      a = a.getDomain();
      return (
        (b === "http" || b === "https") &&
        (a === "threads.net" || a.endsWith(".threads.net"))
      );
    }
    f["default"] = a;
  },
  66
);
__d(
  "isClickIDBlacklistSVDomainURI",
  ["ClickIDDomainBlacklistSVConfig"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = ["http", "https"];
    function a(a) {
      return !g.includes(a.getProtocol())
        ? !1
        : b("ClickIDDomainBlacklistSVConfig").domains.some(function (b) {
            if (a.isSubdomainOfDomain(b)) return !0;
            if (!b.includes(".")) {
              var c = a.getDomain().split(".");
              return c.includes(b);
            }
            return !1;
          });
    }
    e.exports = a;
  },
  null
);
__d(
  "isEnterpriseURI",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      if (a.isEmpty() && a.toString() !== "#") return !1;
      if (!a.getDomain() && !a.getProtocol()) return !1;
      return a.getProtocol() !== "https"
        ? !1
        : a.getDomain().includes("facebookenterprise.com") ||
            a.getDomain().includes("metaenterprise.com");
    }
    f["default"] = a;
  },
  66
);
__d(
  "isFacebookSVDomainURI",
  ["FBDomainsSVConfig"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = ["http", "https"];
    function a(a) {
      if (g.indexOf(a.getProtocol()) === -1) return !1;
      a = b("FBDomainsSVConfig").domains.get(a.getDomain());
      return a != null;
    }
    e.exports = a;
  },
  null
);
__d(
  "isFbDotComURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)fb\\.com?$", "i"),
      h = ["http", "https"];
    function a(a) {
      if (a.isEmpty() && a.toString() !== "#") return !1;
      return !a.getDomain() && !a.getProtocol()
        ? !1
        : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain());
    }
    f["default"] = a;
  },
  66
);
__d(
  "isRoomsURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)msngr\\.com$", "i"),
      h = new RegExp("(^|\\.)fbaud\\.io$", "i"),
      i = new RegExp("(^|\\.)fb\\.audio$", "i"),
      j = ["https"];
    function a(a) {
      if (a.isEmpty() && a.toString() !== "#") return !1;
      return !a.getDomain() && !a.getProtocol()
        ? !1
        : j.indexOf(a.getProtocol()) !== -1 &&
            (g.test(a.getDomain()) ||
              h.test(a.getDomain()) ||
              i.test(a.getDomain()));
    }
    f["default"] = a;
  },
  66
);
__d(
  "isSecureOculusDotComURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)secure\\.oculus\\.com$", "i"),
      h = new RegExp("(^|\\.)work\\.meta\\.com$", "i"),
      i = ["https"];
    function a(a) {
      if (a.isEmpty() && a.toString() !== "#") return !1;
      return !a.getDomain() && !a.getProtocol()
        ? !1
        : i.indexOf(a.getProtocol()) !== -1 &&
            (g.test(a.getDomain()) || h.test(a.getDomain()));
    }
    f["default"] = a;
  },
  66
);
__d(
  "isTrustedCMSContentURI",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return !0;
    }
    f["default"] = a;
  },
  66
);
__d(
  "isWhatsAppURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)whatsapp\\.com$", "i");
    function a(a) {
      if (a.isEmpty() && a.toString() !== "#") return !1;
      if (!a.getDomain() && !a.getProtocol()) return !1;
      return a.getProtocol() !== "https" ? !1 : g.test(a.getDomain());
    }
    f["default"] = a;
  },
  66
);
__d(
  "isTrustedDestination",
  [
    "LinkshimHandlerConfig",
    "gkx",
    "isBarcelonaURI",
    "isBulletinDotComURI",
    "isEnterpriseURI",
    "isFacebookURI",
    "isInstagramURI",
    "isInternalFBURI",
    "isMetaDotComURI",
    "isOculusDotComURI",
    "isRoomsURI",
    "isSecureOculusDotComURI",
    "isTrustedCMSContentURI",
    "isWhatsAppURI",
    "isWorkplaceDotComURI",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function h() {
      return /(^|\.)oculus\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function i() {
      return h() && c("gkx")("6479");
    }
    function j() {
      return /(^|\.)workplace\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function k() {
      return /(^|\.)\.workrooms\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function l() {
      return /(^|\.)accountscenter\.meta\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function m() {
      return /(^|\.)(facebook|meta)enterprise\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function n() {
      return /(^|\.)bulletin\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function o() {
      return /(^|\.)www\.meta\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function p() {
      return /^store(\..+)?\.facebook\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function q() {
      return /(^|\.)about\.meta\.com$|^about(\..+)?\.facebook\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function r() {
      return /(^|\.)internalfb\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function s() {
      return /(^|\.)threads\.net$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function t() {
      return /(^|\.)instagram\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function u() {
      return /(^|\.)whatsapp\.com$/.test(
        c("LinkshimHandlerConfig").current_domain
      );
    }
    function v() {
      return /(^|\.)meta\.com$/.test(c("LinkshimHandlerConfig").current_domain);
    }
    function w(a) {
      return c("isFacebookURI")(a);
    }
    function x(a) {
      return c("isWorkplaceDotComURI")(a);
    }
    function a(a) {
      if (
        c("isRoomsURI")(a) &&
        c("LinkshimHandlerConfig").is_mobile_device === !0
      )
        return !0;
      if (j()) return x(a) || c("isMetaDotComURI")(a);
      if (k()) return c("isMetaDotComURI")(a);
      if (r()) return c("isInternalFBURI")(a) || w(a);
      if (i()) return c("isSecureOculusDotComURI")(a);
      if (h()) return c("isOculusDotComURI")(a);
      if (s()) return c("isBarcelonaURI")(a);
      if (t()) return c("isBarcelonaURI")(a) || c("isInstagramURI")(a);
      if (u()) return c("isWhatsAppURI")(a);
      if (l()) return w(a) || c("isInstagramURI")(a);
      if (m()) return c("isEnterpriseURI")(a);
      if (n()) return c("isBulletinDotComURI")(a);
      if (p() || o() || q()) return c("isTrustedCMSContentURI")(a);
      return v() ? c("isMetaDotComURI")(a) : w(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "compactArray",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = [];
      for (var c = 0; c < a.length; ++c) {
        var d = a[c];
        d != null && b.push(d);
      }
      return b;
    }
    f["default"] = a;
  },
  66
);
__d(
  "filterObject",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = Object.prototype.hasOwnProperty;
    function a(a, b, c) {
      if (!a) return null;
      var d = {};
      for (var e in a) g.call(a, e) && b.call(c, a[e], e, a) && (d[e] = a[e]);
      return d;
    }
    f["default"] = a;
  },
  66
);
__d(
  "mapObject",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function g(a, b, c) {
      if (!a) return null;
      var d = {};
      Object.keys(a).forEach(function (e) {
        d[e] = b.call(c, a[e], e, a);
      });
      return d;
    }
    function a(a, b, c) {
      return g(a, b, c);
    }
    function b(a, b, c) {
      return g(a, b, c);
    }
    function c(a, b, c) {
      return g(a, b, c);
    }
    g.untyped = a;
    g.shape = b;
    g.self = c;
    f["default"] = g;
  },
  66
);
__d(
  "keyMirror",
  ["unrecoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a(a) {
      var b = {};
      if (!(a instanceof Object && !Array.isArray(a)))
        throw c("unrecoverableViolation")(
          "keyMirror(...): Argument must be an object.",
          "comet_infra"
        );
      for (var d in a) {
        if (!Object.prototype.hasOwnProperty.call(a, d)) continue;
        b[d] = d;
      }
      return b;
    }
    g["default"] = a;
  },
  98
);
__d(
  "addAnnotations",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b) {
      Object.keys(b).forEach(function (c) {
        var d;
        a[c] = Object.assign((d = a[c]) != null ? d : {}, b[c]);
      });
    }
    f["default"] = a;
  },
  66
);
__d(
  "InteractionTracingMetricsCore",
  ["addAnnotations", "hero-tracing-placeholder", "performanceNowSinceAppStart"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = new Map(),
      i = new Map(),
      j = new Map(),
      k = {
        string: {},
        int: {},
        double: {},
        bool: {},
        string_array: {},
        int_array: {},
        double_array: {},
        bool_array: {},
      },
      l = { interactionCount: 0 };
    a = function () {
      var a = new Map(j),
        b = function (b) {
          a.forEach(function (a) {
            b(a);
          });
        },
        d = {
          addGlobalMetadata: function (a, b) {
            if (typeof b === "number") {
              var e;
              c("addAnnotations")(k, { int: ((e = {}), (e[a] = b), e) });
            } else if (typeof b === "string") {
              c("addAnnotations")(k, { string: ((e = {}), (e[a] = b), e) });
            } else if (typeof b === "boolean") {
              c("addAnnotations")(k, { bool: ((e = {}), (e[a] = b), e) });
            }
            d.addMetadata(a, b);
          },
          addMetadata: function (a, d) {
            b(function (b) {
              if (typeof d === "number") {
                var e;
                c("addAnnotations")(b.annotations, {
                  int: ((e = {}), (e[a] = d), e),
                });
              } else if (typeof d === "string") {
                c("addAnnotations")(b.annotations, {
                  string: ((e = {}), (e[a] = d), e),
                });
              } else if (typeof d === "boolean") {
                c("addAnnotations")(b.annotations, {
                  bool: ((e = {}), (e[a] = d), e),
                });
              }
            });
          },
          addRequireDeferred: function (a, c) {
            var d = [];
            b(function (b) {
              if (b.requireDeferreds[a] != null) return;
              b = b.requireDeferreds[a] = { start: c };
              d.push(b);
            });
            return function (a, b) {
              d.forEach(function (d) {
                (d.end = a),
                  (d.duration = a - c),
                  b && (d.alreadyRequired = !0);
              });
            };
          },
          forEach: function (a) {
            b(function (b) {
              a(b);
            });
          },
        };
      return d;
    };
    var m = {
      addFactoryTiming: function (a, b) {
        a = i.get(a);
        if (!a) return;
        a.factoryTimings.push(b);
      },
      addGlobalMetadata: function (a, b, d) {
        if (typeof d === "number") {
          var e;
          c("addAnnotations")(k, { int: ((e = {}), (e[b] = d), e) });
          m.addAnnotationInt(a, b, d);
        } else if (typeof d === "string") {
          c("addAnnotations")(k, { string: ((e = {}), (e[b] = d), e) });
          m.addAnnotation(a, b, d);
        } else if (typeof d === "boolean") {
          c("addAnnotations")(k, { bool: ((e = {}), (e[b] = d), e) });
          m.addAnnotationBoolean(a, b, d);
        }
      },
      addHeroBootload: function (a, b) {
        a = i.get(a);
        if (!a) return;
        a.heroBootloads.push(b);
      },
      addHeroRelay: function (a, b) {
        a = i.get(a);
        if (!a) return;
        a.heroRelay.push(b);
      },
      addHeroPendingPlaceholders: function (a, b) {
        a = i.get(a);
        if (!a) return;
        a.pendingPlaceholders = a.pendingPlaceholders.concat(b);
      },
      addHiddenTiming: function (a, b) {
        a = i.get(a);
        if (!a) return;
        a.hiddenTimings = b;
      },
      addImagePreloader: function (a, b, c) {
        a = i.get(a);
        if (!a) return;
        a.imagePreloaderTimings[b] = c;
      },
      addMarkerPoint: function (a, b, d, e, f) {
        e === void 0 && (e = c("performanceNowSinceAppStart")());
        a = i.get(a);
        if (!a) return;
        e >= a.start &&
          ((a.markerPoints[b] = { timestamp: e, type: d }),
          f && (a.markerPoints[b].data = f));
      },
      addFirstMarkerPoint: function (a, b, c, d, e) {
        e === void 0 && (e = {});
        a = i.get(a);
        if (!a) return;
        var f = a.markerPoints[b];
        d >= a.start &&
          (!f || f.timestamp > d) &&
          ((a.markerPoints[b] = { timestamp: d, type: c }),
          e && (a.markerPoints[b].data = e));
      },
      addMetadata: function (a, b, d) {
        a = i.get(a);
        if (!a) return;
        if (typeof d === "number") {
          var e;
          c("addAnnotations")(a.annotations, {
            int: ((e = {}), (e[b] = d), e),
          });
        } else if (typeof d === "string") {
          c("addAnnotations")(a.annotations, {
            string: ((e = {}), (e[b] = d), e),
          });
        } else if (typeof d === "boolean") {
          c("addAnnotations")(a.annotations, {
            bool: ((e = {}), (e[b] = d), e),
          });
        }
      },
      addAnnotation: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            string: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationInt: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            int: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationDouble: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            double: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationBoolean: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            bool: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationStringArray: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            string_array: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationIntArray: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            int_array: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationDoubleArray: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            double_array: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addAnnotationBooleanArray: function (a, b, d) {
        a = i.get(a);
        if (a) {
          c("addAnnotations")(a.annotations, {
            bool_array: ((a = {}), (a[b] = d), a),
          });
        }
      },
      addOfflineTiming: function (a, b) {
        a = i.get(a);
        if (!a) return;
        a.offlineTimings = b;
      },
      addPayloadResource: function (a, b, c) {
        a = i.get(a);
        if (!a) return;
        a.payloadResources[b] = c;
      },
      addPayloadTiming: function (a, b, c) {
        a = i.get(a);
        if (!a) return;
        a.payloadTimings[b] = c;
      },
      addReactRender: function (a, b, c, d, e, f, g) {
        a = i.get(a);
        if (!a) return;
        e = {
          actualDuration: e,
          baseDuration: f,
          duration: d - c,
          end: d,
          phase: g,
          start: c,
        };
        a.reactRender[b] ? a.reactRender[b].push(e) : (a.reactRender[b] = [e]);
        a.commitSet.add(d);
      },
      addSubspan: function (a, b, c, d, e, f) {
        a = i.get(a);
        if (!a) return;
        f = { data: f, end: e, start: d, type: c };
        a.subSpans[b] ? a.subSpans[b].push(f) : (a.subSpans[b] = [f]);
      },
      addMountPoint: function (a, b, c) {
        c = "Mount_" + c;
        m.addFirstMarkerPoint(a, c, "VisualCompletion", b);
      },
      addMountPointMetadata: function (a, b, c) {
        a = m.get(a);
        b = "Mount_" + b;
        a = a == null ? void 0 : a.markerPoints[b];
        if (a) {
          var d = a.data || {};
          a.data = d;
          Object.keys(c).forEach(function (a) {
            d[a] = c[a];
          });
        }
      },
      addTag: function (a, b, c) {
        a = i.get(a);
        if (!a) return;
        a.tagSet[b] || (a.tagSet[b] = new Set());
        a.tagSet[b].add(c);
      },
      addTracedInteraction: function (a, b, c) {
        b = {
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
          commitSet: new Set(),
          factoryTimings: [],
          hasVcReport: !1,
          heroBootloads: [],
          heroRelay: [],
          hiddenTimings: [],
          imagePreloaderTimings: {},
          lateMutationIgnoreElements: new Set(),
          markerPoints: {},
          navigationTiming: {},
          offlineTimings: [],
          payloadResources: {},
          payloadTimings: {},
          pendingPlaceholders: [],
          reactRender: {},
          requireDeferreds: {},
          start: b,
          subSpans: {},
          tagSet: {},
          traceId: a,
          vcStateLog: null,
          wasCanceled: !1,
          wasOffline: !1,
        };
        for (var d in k) for (var e in k[d]) b.annotations[d][e] = k[d][e];
        i.set(a, b);
        j.set(a, b);
        h.set(a, c);
        l.interactionCount++;
        return b;
      },
      complete: function (a) {
        var b = i.get(a);
        if (b && b.completed == null) {
          c("addAnnotations")(b.annotations, {
            int: { endedByHeroComplete: 1 },
          });
          b.completed = c("performanceNowSinceAppStart")();
          var d = h.get(a);
          d && d(b);
          h["delete"](a);
          j["delete"](a);
        }
      },
      currentInteractionLogger: a,
      dump: function () {
        var a = {},
          b = Array.from(i.values());
        b.sort(function (a, b) {
          return a.start - b.start;
        }).forEach(function (b) {
          var c = b.traceId,
            e = d(
              "hero-tracing-placeholder"
            ).HeroPendingPlaceholderTracker.dump(b.traceId);
          a[c] = babelHelpers["extends"]({}, b, {
            pendingPlaceholders: e,
            e2e:
              b.completed != null
                ? ((b.completed - b.start) / 1e3).toFixed(2)
                : "?",
          });
        });
        return a;
      },
      get: function (a) {
        return i.get(a);
      },
      removeMarkerPoint: function (a, b) {
        a = i.get(a);
        a && delete a.markerPoints[b];
      },
      setInteractionClass: function (a, b) {
        a = i.get(a);
        a && (a.interactionClass = b);
      },
      setInteractionType: function (a, b, c, d) {
        a = i.get(a);
        a && ((a.interactionClass = b), (a.type = c), (a.qplEvent = d));
      },
      delete: function (a) {
        i["delete"](a);
      },
      getInteractionStat: function () {
        return l;
      },
    };
    b = m;
    g["default"] = b;
  },
  98
);
__d(
  "interaction-tracing-metrics",
  ["InteractionTracingMetricsCore"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g.InteractionTracingMetricsCore = c("InteractionTracingMetricsCore");
  },
  98
);
__d(
  "InteractionTracingMetrics",
  ["interaction-tracing-metrics"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = d(
      "interaction-tracing-metrics"
    ).InteractionTracingMetricsCore;
  },
  98
);
__d(
  "asset",
  [],
  function (a, b, c, d, e, f) {
    function a() {
      for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++)
        b[c] = arguments[c];
      throw new Error("asset(" + b.join(",") + "): Unexpected asset reference");
    }
    e.exports = a;
  },
  null
);
__d(
  "intersectionObserverEntryIsIntersecting",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a.isIntersecting != null
        ? a.isIntersecting
        : a.intersectionRatio > 0 ||
            (a.intersectionRect &&
              (a.intersectionRect.height > 0 || a.intersectionRect.width > 0));
    }
    f["default"] = a;
  },
  66
);
__d(
  "Qe2JsExposureFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1837559");
    b = d("FalcoLoggerInternal").create("qe2_js_exposure", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "expectationViolation",
  [
    "ErrorNormalizeUtils",
    "ExecutionEnvironment",
    "FBLogger",
    "cr:840411",
    "emptyFunction",
    "sprintf",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    d = c("emptyFunction");
    function a(a) {
      var b;
      for (
        var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1;
        f < d;
        f++
      )
        e[f - 1] = arguments[f];
      (b = c("FBLogger")(
        "expectation_violation"
      ).blameToPreviousFrame()).warn.apply(b, [a].concat(e));
    }
    a.setHandler = b;
    function b(a) {
      d = a;
    }
    g["default"] = a;
  },
  98
);
__d(
  "JSResource",
  ["JSResourceReferenceImpl"],
  function (a, b, c, d, e, f, g) {
    var h = {};
    function i(a, b) {
      h[a] = b;
    }
    function j(a) {
      return h[a];
    }
    function a(a) {
      a = a;
      var b = j(a);
      if (b) return b;
      b = new (c("JSResourceReferenceImpl"))(a);
      i(a, b);
      return b;
    }
    a.loadAll = c("JSResourceReferenceImpl").loadAll;
    g["default"] = a;
  },
  98
);
__d(
  "Log",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = -1;
    b = { DEBUG: 3, INFO: 2, WARNING: 1, ERROR: 0 };
    c = function (a, b, c) {
      for (
        var d = arguments.length, e = new Array(d > 3 ? d - 3 : 0), f = 3;
        f < d;
        f++
      )
        e[f - 3] = arguments[f];
      var h = 0,
        i = c.replace(/%s/g, function () {
          return String(e[h++]);
        }),
        j = window.console;
      j && g >= b && j[a in j ? a : "log"](i);
    };
    function a(a) {
      g = a;
    }
    d = c.bind(null, "debug", b.DEBUG);
    e = c.bind(null, "info", b.INFO);
    var h = c.bind(null, "warn", b.WARNING),
      i = c.bind(null, "error", b.ERROR);
    f.Level = b;
    f.log = c;
    f.setLevel = a;
    f.debug = d;
    f.info = e;
    f.warn = h;
    f.error = i;
  },
  66
);
__d(
  "generateLiteTypedLogger",
  ["Banzai", "JstlMigrationFalcoEvent", "getDataWithLoggerOptions"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function h(a, b, d) {
      var e = a.split(":")[0],
        f = a.split(":")[1];
      e == "logger"
        ? c("JstlMigrationFalcoEvent").log(function () {
            return { logger_config_name: f, payload: b };
          })
        : c("Banzai").post(a, b, d);
    }
    function a(a) {
      return {
        log: function (b, d) {
          h(a, c("getDataWithLoggerOptions")(b, d), c("Banzai").BASIC);
        },
        logVital: function (b, d) {
          h(a, c("getDataWithLoggerOptions")(b, d), c("Banzai").VITAL);
        },
        logImmediately: function (b, d) {
          h(a, c("getDataWithLoggerOptions")(b, d), { signal: !0 });
        },
      };
    }
    g["default"] = a;
  },
  98
);
__d(
  "requestIdleCallback",
  ["cr:7387"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:7387");
  },
  98
);
__d(
  "requestIdleCallbackBlue",
  ["TimeSlice", "TimerStorage", "requestIdleCallbackAcrossTransitions"],
  function (a, b, c, d, e, f, g) {
    function b(b, d) {
      var e;
      function f(a) {
        c("TimerStorage").unset(c("TimerStorage").IDLE_CALLBACK, e), b(a);
      }
      c("TimeSlice").copyGuardForWrapper(b, f);
      e = c("requestIdleCallbackAcrossTransitions").call(a, f, d);
      c("TimerStorage").set(c("TimerStorage").IDLE_CALLBACK, e);
      return e;
    }
    g["default"] = b;
  },
  98
);
__d(
  "QE2Logger",
  ["Qe2JsExposureFalcoEvent"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = {};
    function a(a, b) {
      B(a, (a = b) != null ? a : "", 9);
    }
    function b(a, b) {
      B(a, (a = b) != null ? a : "", 9, !0);
    }
    function d(a) {
      B(a, "", 4);
    }
    function e(a) {
      B(a, "", 32);
    }
    function f(a) {
      B(a, "", 32, !0);
    }
    function i(a) {
      B(a, "", 54);
    }
    function j(a, b) {
      B(a, b, 3);
    }
    function k(a) {
      B(a, "", 5);
    }
    function l(a) {
      B(a, "", 5, !0);
    }
    function m(a) {
      B(a, "", 31);
    }
    function n(a) {
      B(a, "", 98);
    }
    function o(a, b) {
      B(a, b, 7);
    }
    function p(a, b) {
      B(a, b, 55);
    }
    function q(a, b) {
      B(a, b, 17);
    }
    function r(a, b) {
      B(a, b, 25);
    }
    function s(a, b) {
      B(a, b, 8);
    }
    function t(a, b) {
      B(a, b, 22);
    }
    function u(a, b) {
      B(a, b, 27);
    }
    function v(a, b) {
      B(a, b, 0);
    }
    function w(a, b) {
      B(a, (a = b) != null ? a : "", 89);
    }
    function x(a, b) {
      B(a, b, 60);
    }
    function y(a, b) {
      B(a, b, 90);
    }
    function z(a, b, c) {
      B(a, b, c);
    }
    function A(a, b, c) {
      B(a, b, c, !0);
    }
    function B(a, b, d, e) {
      var f = a + "|" + b;
      if (h[f]) return;
      e === !0
        ? c("Qe2JsExposureFalcoEvent").logImmediately(function () {
            return { universe: a, unit_id: b, unit_type: d };
          })
        : c("Qe2JsExposureFalcoEvent").log(function () {
            return { universe: a, unit_id: b, unit_type: d };
          });
      h[f] = !0;
    }
    g.logExposureForUser = a;
    g.logExposureForUserImmediately = b;
    g.logExposureForIGDjangoUser = d;
    g.logExposureForIGUser = e;
    g.logExposureForIGUserImmediately = f;
    g.logExposureForIGWebCookie = i;
    g.logExposureForEmail = j;
    g.logExposureForDatr = k;
    g.logExposureForDatrImmediately = l;
    g.logExposureForOculusLoggedOut = m;
    g.logExposureForOculusLoggedOutCookieID = n;
    g.logExposureForPage = o;
    g.logExposureForPaymentAccountID = p;
    g.logExposureForBusiness = q;
    g.logExposureForGroup = r;
    g.logExposureForPhoneNumber = s;
    g.logExposureForScimCompanyID = t;
    g.logExposureForAnalyticsEntityID = u;
    g.logExposureForAdAccountID = v;
    g.logExposureForActingAccount = w;
    g.logExposureForMixedUserAndPage = x;
    g.logExposureForCommerceMerchantSettings = y;
    g.logExposure = z;
    g.logExposureImmediately = A;
  },
  98
);
__d(
  "XHRHttpError",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = "HTTP_CLIENT_ERROR",
      h = "HTTP_PROXY_ERROR",
      i = "HTTP_SERVER_ERROR",
      j = "HTTP_TRANSPORT_ERROR",
      k = "HTTP_UNKNOWN_ERROR";
    function a(a, b) {
      if (b === 0) {
        a = a.getProtocol();
        return a === "file" || a === "ftp" ? null : j;
      } else if (b >= 100 && b < 200) return h;
      else if (b >= 200 && b < 300) return null;
      else if (b >= 400 && b < 500) return g;
      else if (b >= 500 && b < 600) return i;
      else if (b >= 12001 && b < 12156) return j;
      else return k;
    }
    f.HTTP_CLIENT_ERROR = g;
    f.HTTP_PROXY_ERROR = h;
    f.HTTP_SERVER_ERROR = i;
    f.HTTP_TRANSPORT_ERROR = j;
    f.HTTP_UNKNOWN_ERROR = k;
    f.getErrorCode = a;
  },
  66
);
__d(
  "xhrSimpleDataSerializer",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = [];
      for (var c in a)
        b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
      return b.join("&");
    }
    f["default"] = a;
  },
  66
);
__d(
  "XHRRequest",
  [
    "invariant",
    "DTSG",
    "DTSGUtils",
    "DTSG_ASYNC",
    "Env",
    "ErrorGuard",
    "FBLogger",
    "LSD",
    "Log",
    "NetworkStatus",
    "ResourceTimingsStore",
    "ResourceTypes",
    "SprinkleConfig",
    "TimeSlice",
    "URI",
    "XHRHttpError",
    "ZeroRewrites",
    "fb-error",
    "getAsyncHeaders",
    "xhrSimpleDataSerializer",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j,
      k = b("fb-error").ErrorXFBDebug,
      l = !1,
      m = { loadedBytes: 0, totalBytes: 0 };
    function n(a) {
      return b("ZeroRewrites").rewriteURI(new (h || (h = b("URI")))(a));
    }
    a = (function () {
      "use strict";
      function a(a) {
        (this.$3 = function () {
          return null;
        }),
          (this.$19 = n(a)),
          (this.$7 = "POST"),
          (this.$6 = {}),
          this.setResponseType(null),
          this.setTransportBuilder(
            b("ZeroRewrites").getTransportBuilderForURI(this.getURI())
          ),
          this.setDataSerializer(b("xhrSimpleDataSerializer")),
          (this.$11 = b("ResourceTimingsStore").getUID(
            b("ResourceTypes").XHR,
            a != null ? a.toString() : ""
          ));
      }
      var c = a.prototype;
      c.setURI = function (a) {
        this.$19 = n(a);
        return this;
      };
      c.getURI = function () {
        return this.$19;
      };
      c.setResponseType = function (a) {
        this.$13 = a;
        return this;
      };
      c.setMethod = function (a) {
        this.$7 = a;
        return this;
      };
      c.getMethod = function () {
        return this.$7;
      };
      c.setData = function (a) {
        this.$2 = a;
        return this;
      };
      c.getData = function () {
        return this.$2;
      };
      c.setRawData = function (a) {
        this.$10 = a;
        return this;
      };
      c.setRequestHeader = function (a, b) {
        this.$6[a] = b;
        return this;
      };
      c.setTimeout = function (a) {
        this.$14 = a;
        return this;
      };
      c.getTimeout = function () {
        return this.$14;
      };
      c.setResponseHandler = function (a) {
        this.$12 = a;
        return this;
      };
      c.getResponseHandler = function () {
        return this.$12;
      };
      c.setErrorHandler = function (a) {
        this.$5 = a;
        return this;
      };
      c.getErrorHandler = function () {
        return this.$5;
      };
      c.setNetworkFailureHandler = function (a) {
        this.$8 = a;
        return this;
      };
      c.getNetworkFailureHandler = function () {
        return this.$8;
      };
      c.getResponseHeader = function (a) {
        var b = this.$9;
        return b ? b.getResponseHeader(a) : null;
      };
      c.setAbortHandler = function (a) {
        this.$1 = a;
        return this;
      };
      c.getAbortHandler = function () {
        return this.$1;
      };
      c.setTimeoutHandler = function (a) {
        this.$15 = a;
        return this;
      };
      c.getTimeoutHandler = function () {
        return this.$15;
      };
      c.setUploadProgressHandler = function (a) {
        this.$18 = a;
        return this;
      };
      c.setDownloadProgressHandler = function (a) {
        this.$4 = a;
        return this;
      };
      c.setTransportBuilder = function (a) {
        !this.$17 || !b("ZeroRewrites").isRewritten(this.$19)
          ? (this.$17 = a)
          : b("FBLogger")("iorg-FOS")
              .blameToPreviousFile()
              .mustfix(
                "can not set new TransportBuilder for the request %s",
                String(this.getURI())
              );
        return this;
      };
      c.setDataSerializer = function (a) {
        this.$3 = a;
        return this;
      };
      c.setWithCredentials = function (a) {
        this.$20 = a;
        return this;
      };
      c.send = function () {
        var a = this.$14,
          c = this.$17;
        if (!c) return;
        var d = c();
        c = this.getURI();
        if (
          c.toString().includes("/../") ||
          c.toString().includes("/..\\") ||
          c.toString().includes("\\../") ||
          c.toString().includes("\\..\\")
        ) {
          b("Log").error("XHRRequest.send(): path traversal is not allowed.");
          return !1;
        }
        if (l === !0) return;
        var e = new (h || (h = b("URI")))(c).getQualifiedURI().toString(),
          f = this.$11;
        b("ResourceTimingsStore").updateURI(b("ResourceTypes").XHR, f, e);
        b("ResourceTimingsStore").measureRequestSent(b("ResourceTypes").XHR, f);
        this.$9 = d;
        this.$7 === "POST" || !this.$10 || g(0, 2346, this.$10, c);
        e = (i || (i = b("Env"))).force_param;
        e && (this.$2 = babelHelpers["extends"]({}, this.getData() || {}, e));
        if (this.$7 === "GET" && b("DTSGUtils").shouldAppendToken(c)) {
          e = b("DTSG_ASYNC").getCachedToken
            ? b("DTSG_ASYNC").getCachedToken()
            : b("DTSG_ASYNC").getToken();
          e &&
            (this.$2 ? (this.$2.fb_dtsg_ag = e) : (this.$2 = { fb_dtsg_ag: e }),
            b("SprinkleConfig").param_name &&
              (this.$2[b("SprinkleConfig").param_name] =
                b("DTSGUtils").getNumericValue(e)));
        }
        if (this.$7 === "POST" && b("DTSGUtils").shouldAppendToken(c)) {
          e = b("DTSG").getCachedToken
            ? b("DTSG").getCachedToken()
            : b("DTSG").getToken();
          e &&
            (this.$2 ? (this.$2.fb_dtsg = e) : (this.$2 = { fb_dtsg: e }),
            b("SprinkleConfig").param_name &&
              (this.$2[b("SprinkleConfig").param_name] =
                b("DTSGUtils").getNumericValue(e)));
          b("LSD").token &&
            (this.$2
              ? (this.$2.lsd = b("LSD").token)
              : (this.$2 = { lsd: b("LSD").token }),
            b("SprinkleConfig").param_name &&
              !e &&
              (this.$2[b("SprinkleConfig").param_name] = b(
                "DTSGUtils"
              ).getNumericValue(b("LSD").token)));
        }
        this.$7 === "GET" || this.$10
          ? (c.addQueryData(this.$2), (e = this.$10))
          : (e = this.$3(this.$2));
        function j(a) {
          b("ResourceTimingsStore").measureResponseReceived(
            b("ResourceTypes").XHR,
            f
          );
          for (
            var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1;
            e < c;
            e++
          )
            d[e - 1] = arguments[e];
          a.apply(this, d);
        }
        j = b("TimeSlice").guard(j, "XHRRequest response received", {
          propagationType: b("TimeSlice").PropagationType.CONTINUATION,
        });
        d.onreadystatechange = this.$21(j);
        d.onerror = this.$22(j);
        d.upload && this.$18 && (d.upload.onprogress = this.$23.bind(this));
        this.$4 && (d.onprogress = this.$24.bind(this));
        a && (this.$16 = setTimeout(this.$25.bind(this), a));
        this.$20 != null && (d.withCredentials = this.$20);
        d.open(this.$7, c.toString(), !0);
        j = !1;
        if (this.$6)
          for (a in this.$6)
            a.toLowerCase() === "content-type" && (j = !0),
              d.setRequestHeader(a, this.$6[a]);
        this.$7 == "POST" &&
          !this.$10 &&
          !j &&
          d.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        var k = b("getAsyncHeaders")(c);
        Object.keys(k).forEach(function (a) {
          d.setRequestHeader(a, k[a]);
        });
        this.$13 === "arraybuffer" &&
          ("responseType" in d
            ? (d.responseType = "arraybuffer")
            : "overrideMimeType" in d
            ? d.overrideMimeType("text/plain; charset=x-user-defined")
            : "setRequestHeader" in d &&
              d.setRequestHeader("Accept-Charset", "x-user-defined"));
        this.$13 === "blob" && (d.responseType = this.$13);
        d.send(e);
      };
      c.abort = function (a) {
        this.$26(),
          this.$1 &&
            (j || (j = b("ErrorGuard"))).applyWithGuard(this.$1, null, [a], {
              name: "XHRRequest:_abortHandler",
            });
      };
      c.$26 = function () {
        var a = this.$9;
        a && ((a.onreadystatechange = null), a.abort());
        this.$27();
      };
      c.$25 = function () {
        this.$26(),
          this.$15 &&
            (j || (j = b("ErrorGuard"))).applyWithGuard(this.$15, null, [], {
              name: "XHRRequest:_abortHandler",
            });
      };
      c.$28 = function (a) {
        if (this.$13)
          if ("response" in a) return a.response;
          else if (this.$13 === "arraybuffer" && window.VBArray)
            return window.VBArray(a.responseBody).toArray();
        return a.responseText;
      };
      c.$22 = function (a) {
        var c = this,
          d = this.$9;
        return function () {
          var e;
          e = {
            errorCode: b("XHRHttpError").HTTP_TRANSPORT_ERROR,
            errorMsg: "Network Failure.",
            errorType: "Network",
            errorRawResponseHeaders: null,
            errorRawTransport:
              d == null
                ? void 0
                : (e = d.constructor) == null
                ? void 0
                : e.name,
            errorRawTransportStatus: 0,
          };
          c.$8
            ? (j || (j = b("ErrorGuard"))).applyWithGuard(
                a.bind(void 0, c.$8),
                null,
                [e],
                { name: "XHRRequest:_networkFailureHandler" }
              )
            : a(function () {});
          b("NetworkStatus").reportError();
        };
      };
      c.$21 = function (a) {
        var c = this,
          d = b("TimeSlice").guard(
            function (a) {
              for (
                var b = arguments.length,
                  c = new Array(b > 1 ? b - 1 : 0),
                  d = 1;
                d < b;
                d++
              )
                c[d - 1] = arguments[d];
              return a.apply(this, c);
            },
            "XHRRequest onreadystatechange",
            { propagationType: b("TimeSlice").PropagationType.EXECUTION }
          );
        return function () {
          var e = c.$9;
          if (e == null) return;
          var f = e.readyState;
          if (f >= 2) {
            var g = f === 4;
            g && k.addFromXHR(e);
            var h = c.getURI();
            h = b("XHRHttpError").getErrorCode(h, e.status);
            var i = c.$12;
            if (h != null) {
              if (g) {
                var l = {
                  errorCode: h,
                  errorMsg: c.$28(e),
                  errorRawTransport: e.constructor.name,
                  errorRawTransportStatus: e.status,
                  errorRawResponseHeaders:
                    i && i.includeHeaders ? e.getAllResponseHeaders() : null,
                  errorType: e.status ? "HTTP " + e.status : "HTTP",
                };
                c.$5
                  ? (j || (j = b("ErrorGuard"))).applyWithGuard(
                      a.bind(void 0, c.$5),
                      null,
                      [l],
                      { name: "XHRRequest:_errorHandler" }
                    )
                  : a(function () {});
              }
            } else if (i) {
              if (g || (i.parseStreaming && f === 3)) {
                l = g ? a : d;
                f = (i == null ? void 0 : i.includeHeaders)
                  ? e.getAllResponseHeaders()
                  : null;
                (j || (j = b("ErrorGuard"))).applyWithGuard(
                  l.bind(void 0, i),
                  null,
                  [c.$28(e), f, g],
                  { name: "XHRRequest:handler" }
                );
              }
            } else g && a(function () {});
            g &&
              (h != "HTTP_TRANSPORT_ERROR" &&
                b("NetworkStatus").reportSuccess(),
              c.$27());
          }
        };
      };
      c.$23 = function (a) {
        (m.loadedBytes = a.loaded),
          (m.totalBytes = a.total),
          this.$18 &&
            (j || (j = b("ErrorGuard"))).applyWithGuard(this.$18, null, [m], {
              name: "XHRRequest:_uploadProgressHandler",
            });
      };
      c.$24 = function (a) {
        a = { loadedBytes: a.loaded, totalBytes: a.total };
        this.$4 &&
          (j || (j = b("ErrorGuard"))).applyWithGuard(this.$4, null, [a], {
            name: "XHRRequest:_downloadProgressHandler",
          });
      };
      c.$27 = function () {
        clearTimeout(this.$16), delete this.$9;
      };
      a.disable = function () {
        l = !0;
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  "SecurePostMessage",
  ["invariant"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = "*";
    a = {
      sendMessageToSpecificOrigin: function (a, b, c, d) {
        c !== h || g(0, 21157), a.postMessage(b, c, d);
      },
      sendMessageForCurrentOrigin: function (a, b) {
        a.postMessage(b);
      },
      sendMessageAllowAnyOrigin_UNSAFE: function (a, b, c) {
        a.postMessage(b, h, c);
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "StyleXSheet",
  ["invariant", "ExecutionEnvironment", "Locale", "gkx"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = "__fb-light-mode",
      k = "__fb-dark-mode";
    function l(a, b) {
      var c = [];
      c.push(a + " {");
      for (a in b) {
        var d = b[a];
        c.push("  --" + a + ": " + d + ";");
      }
      c.push("}");
      return c.join("\n");
    }
    function m() {
      var a = document.createElement("style");
      a.setAttribute("type", "text/css");
      a.setAttribute("data-styled", "true");
      var b = document.head || document.getElementsByTagName("head")[0];
      b || h(0, 2655);
      b.appendChild(a);
      return a;
    }
    function n() {
      return (
        window.CSS != null &&
        window.CSS.supports != null &&
        window.CSS.supports("--fake-var:0")
      );
    }
    var o = /var\(--(.*?)\)/g;
    a = (function () {
      function a(a) {
        var b;
        this.tag = null;
        this.injected = !1;
        this.ruleForPriority = new Map();
        this.rules = [];
        this.rootTheme = a.rootTheme;
        this.rootDarkTheme = a.rootDarkTheme;
        this.isSlow =
          (b = a.isSlow) != null
            ? b
            : typeof location === "object" &&
              typeof location.search === "string"
            ? location.search.includes("stylex-slow")
            : !1;
        this.supportsVariables = (b = a.supportsVariables) != null ? b : n();
        this.$1 = d("Locale").isRTL();
        this.externalRules = new Set();
      }
      var b = a.prototype;
      b.getVariableMatch = function () {
        return o;
      };
      b.isHeadless = function () {
        return (
          this.tag == null || !(i || (i = c("ExecutionEnvironment"))).canUseDOM
        );
      };
      b.getTag = function () {
        var a = this.tag;
        a != null || h(0, 11103);
        return a;
      };
      b.getCSS = function () {
        return this.rules.join("\n");
      };
      b.getRulePosition = function (a) {
        return this.rules.indexOf(a);
      };
      b.getRuleCount = function () {
        return this.rules.length;
      };
      b.inject = function () {
        if (this.injected) return;
        this.injected = !0;
        if (!(i || (i = c("ExecutionEnvironment"))).canUseDOM) {
          this.injectTheme();
          return;
        }
        this.tag = m();
        this.injectTheme();
      };
      b.injectTheme = function () {
        if (c("gkx")("1861546")) return;
        this.rootTheme != null &&
          this.insert(l(":root, ." + j, this.rootTheme), 0);
        this.rootDarkTheme != null &&
          this.insert(l("." + k + ":root, ." + k, this.rootDarkTheme), 0);
      };
      b.__injectCustomThemeForTesting = function (a, b) {
        b != null && this.insert(l(a, b), 0);
      };
      b["delete"] = function (a) {
        var b = this.rules.indexOf(a);
        b >= 0 || h(0, 2656, a);
        this.rules.splice(b, 1);
        if (this.isHeadless()) return;
        a = this.getTag();
        if (this.isSlow) a.removeChild(a.childNodes[b + 1]);
        else {
          a = a.sheet;
          a || h(0, 2657);
          a.deleteRule(b);
        }
      };
      b.normalizeRule = function (a) {
        var b = this.rootTheme;
        return this.supportsVariables || b == null
          ? a
          : a.replace(o, function (a, c) {
              return b[c];
            });
      };
      b.getInsertPositionForPriority = function (a) {
        var b = this.ruleForPriority.get(a);
        if (b != null) return this.rules.indexOf(b) + 1;
        b = Array.from(this.ruleForPriority.keys())
          .sort(function (a, b) {
            return b - a;
          })
          .filter(function (b) {
            return b > a ? 1 : 0;
          });
        if (b.length === 0) return this.getRuleCount();
        b = b.pop();
        return this.rules.indexOf(this.ruleForPriority.get(b));
      };
      b.insert = function (a, b, c) {
        this.injected === !1 && this.inject();
        c = this.$1 && c != null ? c : a;
        if (this.externalRules.has(c.slice(0, c.indexOf("{")).trim())) return;
        if (this.rules.includes(c)) return;
        a = this.normalizeRule(c);
        if (this.externalRules.has(a.slice(0, a.indexOf("{")).trim())) return;
        c = this.getInsertPositionForPriority(b);
        this.rules.splice(c, 0, a);
        this.ruleForPriority.set(b, a);
        if (this.isHeadless()) return;
        b = this.getTag();
        if (this.isSlow) {
          var d = document.createTextNode(a);
          b.insertBefore(d, b.childNodes[c]);
        } else {
          d = b.sheet;
          if (d != null)
            try {
              d.insertRule(a, c);
            } catch (a) {}
        }
      };
      return a;
    })();
    a.LIGHT_MODE_CLASS_NAME = j;
    a.DARK_MODE_CLASS_NAME = k;
    g["default"] = a;
  },
  98
);
__d(
  "lazyLoadComponent",
  ["BootloaderResource", "react", "useHeroBootloadedComponent"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = h || d("react"),
      j = new Map();
    function k(a, b) {
      j.set(a, b);
    }
    function l(a) {
      return j.get(a);
    }
    function a(a) {
      var b = l(a);
      if (b) return b;
      function e(b, e) {
        e === void 0 && (e = void 0);
        var f = d("BootloaderResource").read(a);
        c("useHeroBootloadedComponent")(a);
        return i.jsx(f, babelHelpers["extends"]({}, b, { ref: e }));
      }
      e.displayName = e.name + " [from " + f.id + "]";
      e.displayName = "lazyLoadComponent(" + a.getModuleId() + ")";
      b = i.forwardRef(e);
      k(a, b);
      return b;
    }
    g["default"] = a;
  },
  98
);
__d(
  "UnicodeUtils",
  ["invariant"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = 55296,
      j = 56319,
      k = 56320,
      l = 57343,
      m = /[\uD800-\uDFFF]/;
    function n(a) {
      return i <= a && a <= l;
    }
    function a(a, b) {
      (0 <= b && b < a.length) || h(0, 1346, b, a.length);
      if (b + 1 === a.length) return !1;
      var c = a.charCodeAt(b);
      a = a.charCodeAt(b + 1);
      return i <= c && c <= j && k <= a && a <= l;
    }
    function o(a) {
      return m.test(a);
    }
    function p(a, b) {
      return 1 + n(a.charCodeAt(b));
    }
    function b(a) {
      if (!o(a)) return a.length;
      var b = 0;
      for (var c = 0; c < a.length; c += p(a, c)) b++;
      return b;
    }
    function c(a, b) {
      return r(a, b, b + 1);
    }
    function q(a, b, c) {
      var d = b || 0;
      c = c === void 0 ? Infinity : c || 0;
      if (!o(a)) return a.substr(d, c);
      var e = a.length;
      if (e <= 0 || d > e || c <= 0) return "";
      var f = 0;
      if (d > 0) {
        for (; d > 0 && f < e; d--) f += p(a, f);
        if (f >= e) return "";
      } else if (b < 0) {
        for (f = e; d < 0 && 0 < f; d++) f -= p(a, f - 1);
        f < 0 && (f = 0);
      }
      b = e;
      if (c < e) for (b = f; c > 0 && b < e; c--) b += p(a, b);
      return a.substring(f, b);
    }
    function r(a, b, c) {
      b = b || 0;
      c = c === void 0 ? Infinity : c || 0;
      b < 0 && (b = 0);
      c < 0 && (c = 0);
      var d = Math.abs(c - b);
      b = b < c ? b : c;
      return q(a, b, d);
    }
    function d(a) {
      var b = [];
      for (var c = 0; c < a.length; c += p(a, c)) b.push(a.codePointAt(c));
      return b;
    }
    g.isCodeUnitInSurrogateRange = n;
    g.isSurrogatePair = a;
    g.hasSurrogateUnit = o;
    g.getUTF16Length = p;
    g.strlen = b;
    g.charAt = c;
    g.substr = q;
    g.substring = r;
    g.getCodePoints = d;
  },
  98
);
__d(
  "BanzaiLogger",
  ["Banzai"],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      return {
        log: function (b, d) {
          c("Banzai").post("logger:" + b, d, a);
        },
        create: h,
      };
    }
    a = h();
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "ManagedError",
  [],
  function (a, b, c, d, e, f) {
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, c) {
        var d;
        d = a.call(this, b !== null && b !== void 0 ? b : "") || this;
        b !== null && b !== void 0 ? (d.message = b) : (d.message = "");
        d.innerError = c;
        return d;
      }
      return b;
    })(babelHelpers.wrapNativeSuper(Error));
    f["default"] = a;
  },
  66
);
__d(
  "HiddenSubtreePassiveContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({
      getCurrentState: function () {
        return {
          backgrounded: !1,
          hidden: !1,
          hiddenOrBackgrounded: !1,
          hiddenOrBackgrounded_FIXME: !1,
        };
      },
      subscribeToChanges: function (a) {
        return { remove: function () {} };
      },
    });
    g["default"] = b;
  },
  98
);
__d(
  "getReactComponentDisplayName",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = a.displayName;
      if (b != null) return b;
      return a.name != null ? a.name : "ReactComponent";
    }
    f["default"] = a;
  },
  66
);
__d(
  "getReactElementDisplayName",
  ["getReactComponentDisplayName", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    h || d("react");
    function a(a) {
      if (a == null) return "#empty";
      if (
        typeof a === "string" ||
        typeof a === "number" ||
        typeof a === "boolean"
      )
        return "#text";
      a = a.type;
      if (a == null) return "ReactComponent";
      return typeof a === "string" ? a : c("getReactComponentDisplayName")(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "ErrorBoundary.react",
  [
    "ErrorPubSub",
    "ErrorSerializer",
    "cr:1645510",
    "getErrorSafe",
    "getReactElementDisplayName",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || d("react");
    a = (function (a) {
      babelHelpers.inheritsLoose(d, a);
      function d() {
        var b, c;
        for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++)
          e[f] = arguments[f];
        return (
          ((b = c = a.call.apply(a, [this].concat(e)) || this),
          (c.state = { error: null, moduleName: k(c.props.children) }),
          (c.suppressReactDefaultErrorLogging = !0),
          b) || babelHelpers.assertThisInitialized(c)
        );
      }
      d.getDerivedStateFromError = function (a) {
        return { error: c("getErrorSafe")(a) };
      };
      var e = d.prototype;
      e.componentDidUpdate = function (a) {
        if (
          this.state.error &&
          this.props.forceResetErrorCount != null &&
          this.props.forceResetErrorCount !== a.forceResetErrorCount
        ) {
          this.setState({ error: null });
          return;
        }
      };
      e.componentDidCatch = function (a, b) {
        a = b.componentStack;
        b = this.props;
        var d = b.augmentError,
          e = b.context;
        e = e === void 0 ? {} : e;
        var f = b.description;
        f = f === void 0 ? "base" : f;
        b = b.onError;
        e.messageFormat == null &&
          ((e.messageFormat = "caught error in module %s (%s)"),
          (e.messageParams = [this.state.moduleName, f]));
        f = this.state;
        var g = f.error;
        f = f.moduleName;
        g != null &&
          (c("ErrorSerializer").aggregateError(g, {
            componentStack: a,
            loggingSource: "ERROR_BOUNDARY",
          }),
          c("ErrorSerializer").aggregateError(g, e),
          typeof d === "function" && d(g),
          (h || (h = c("ErrorPubSub"))).reportError(g),
          typeof b === "function" && b(g, f));
      };
      e.render = function () {
        var a = this.state,
          c = a.error;
        a = a.moduleName;
        if (c) {
          var d = this.props.fallback;
          return d != null ? d(c, a) : null;
        }
        return b("cr:1645510") != null
          ? j.jsxs(j.Fragment, {
              children: [j.jsx(b("cr:1645510"), {}), this.props.children],
            })
          : (d = this.props.children) != null
          ? d
          : null;
      };
      return d;
    })(j.PureComponent);
    a.defaultProps = { forceResetErrorCount: 0 };
    function k(a) {
      a = j.Children.count(a) > 1 ? j.Children.toArray(a)[0] : a;
      return c("getReactElementDisplayName")(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "bs_caml",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b) {
      if (a < b) return -1;
      else if (a === b) return 0;
      else return 1;
    }
    function b(a, b) {
      if (a)
        if (b) return 0;
        else return 1;
      else if (b) return -1;
      else return 0;
    }
    function c(a, b) {
      if (a === b) return 0;
      else if (a < b) return -1;
      else if (a > b || a === a) return 1;
      else if (b === b) return -1;
      else return 0;
    }
    function d(a, b) {
      if (a === b) return 0;
      else if (a < b) return -1;
      else return 1;
    }
    function e(a, b) {
      if (a) return b;
      else return a;
    }
    function g(a, b) {
      if (a < b) return a;
      else return b;
    }
    function h(a, b) {
      if (a < b) return a;
      else return b;
    }
    function i(a, b) {
      if (a < b) return a;
      else return b;
    }
    function j(a, b) {
      if (a < b) return a;
      else return b;
    }
    function k(a, b) {
      if (a) return a;
      else return b;
    }
    function l(a, b) {
      if (a > b) return a;
      else return b;
    }
    function m(a, b) {
      if (a > b) return a;
      else return b;
    }
    function n(a, b) {
      if (a > b) return a;
      else return b;
    }
    function o(a, b) {
      if (a > b) return a;
      else return b;
    }
    function p(a, b) {
      if (a[1] === b[1]) return a[0] === b[0];
      else return !1;
    }
    function q(a, b) {
      var c = b[0],
        d = a[0];
      if (d > c) return !0;
      else if (d < c) return !1;
      else return a[1] >= b[1];
    }
    function r(a, b) {
      return !p(a, b);
    }
    function s(a, b) {
      return !q(a, b);
    }
    function t(a, b) {
      if (a[0] > b[0]) return !0;
      else if (a[0] < b[0]) return !1;
      else return a[1] > b[1];
    }
    function u(a, b) {
      return !t(a, b);
    }
    function v(a, b) {
      if (q(a, b)) return b;
      else return a;
    }
    function w(a, b) {
      if (t(a, b)) return a;
      else return b;
    }
    f.caml_int_compare = a;
    f.caml_bool_compare = b;
    f.caml_float_compare = c;
    f.caml_string_compare = d;
    f.caml_bool_min = e;
    f.caml_int_min = g;
    f.caml_float_min = h;
    f.caml_string_min = i;
    f.caml_int32_min = j;
    f.caml_bool_max = k;
    f.caml_int_max = l;
    f.caml_float_max = m;
    f.caml_string_max = n;
    f.caml_int32_max = o;
    f.i64_eq = p;
    f.i64_neq = r;
    f.i64_lt = s;
    f.i64_gt = t;
    f.i64_le = u;
    f.i64_ge = q;
    f.i64_min = v;
    f.i64_max = w;
  },
  null
);
__d(
  "bs_caml_int64",
  ["bs_caml"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g;
    function a(a, b) {
      return [b, a >>> 0];
    }
    var h = [-2147483648, 0],
      i = [2147483647, 4294967295],
      j = [0, 1],
      k = [0, 0],
      l = [-1, 4294967295];
    function m(a) {
      return (a & -2147483648) !== 0;
    }
    function n(a) {
      return (a & -2147483648) === 0;
    }
    function c(a) {
      var b = a[1];
      a = a[0];
      b = (b + 1) | 0;
      return [(a + (b === 0 ? 1 : 0)) | 0, b >>> 0];
    }
    function o(a) {
      var b = ((a[1] ^ -1) + 1) | 0;
      return [((a[0] ^ -1) + (b === 0 ? 1 : 0)) | 0, b >>> 0];
    }
    function p(a, b, c) {
      var d = a[1],
        e = (d + b) | 0;
      d = (m(d) && (m(b) || n(e))) || (m(b) && n(e)) ? 1 : 0;
      return [(a[0] + c + d) | 0, e >>> 0];
    }
    function q(a, b) {
      return p(a, b[1], b[0]);
    }
    function d(a, c) {
      if (c !== null) return (g || (g = b("bs_caml"))).i64_eq(a, c);
      else return !1;
    }
    function e(a, c) {
      if (c !== void 0) return (g || (g = b("bs_caml"))).i64_eq(a, c);
      else return !1;
    }
    function r(a, c) {
      if (c == null) return !1;
      else return (g || (g = b("bs_caml"))).i64_eq(a, c);
    }
    function s(a, b, c) {
      b = ((b ^ -1) + 1) >>> 0;
      c = ((c ^ -1) + (b === 0 ? 1 : 0)) | 0;
      return p(a, b, c);
    }
    function t(a, b) {
      return s(a, b[1], b[0]);
    }
    function u(a, b) {
      if (b === 0) return a;
      var c = a[1];
      if (b >= 32) return [c << ((b - 32) | 0), 0];
      else return [(c >>> ((32 - b) | 0)) | (a[0] << b), (c << b) >>> 0];
    }
    function v(a, b) {
      if (b === 0) return a;
      var c = a[0],
        d = (b - 32) | 0;
      if (d === 0) return [0, c >>> 0];
      else if (d > 0) return [0, c >>> d];
      else return [c >>> b, ((c << (-d | 0)) | (a[1] >>> b)) >>> 0];
    }
    function w(a, b) {
      if (b === 0) return a;
      var c = a[0];
      if (b < 32) return [c >> b, ((c << ((32 - b) | 0)) | (a[1] >>> b)) >>> 0];
      else return [c >= 0 ? 0 : -1, (c >> ((b - 32) | 0)) >>> 0];
    }
    function x(a) {
      if (a[0] !== 0) return !1;
      else return a[1] === 0;
    }
    function y(a, b) {
      while (!0) {
        var c = b,
          d = a,
          e,
          f = d[0],
          g = 0,
          i = 0,
          j;
        if (f !== 0) j = 4;
        else {
          if (d[1] === 0) return k;
          j = 4;
        }
        if (j === 4)
          if (c[0] !== 0) i = 3;
          else {
            if (c[1] === 0) return k;
            i = 3;
          }
        i === 3 && (f !== -2147483648 || d[1] !== 0 ? (g = 2) : (e = c[1]));
        if (g === 2) {
          j = c[0];
          i = d[1];
          g = 0;
          j !== -2147483648 || c[1] !== 0 ? (g = 3) : (e = i);
          if (g === 3) {
            g = c[1];
            if (f < 0) {
              if (j >= 0) return o(y(o(d), c));
              b = o(c);
              a = o(d);
              continue;
            }
            if (j < 0) return o(y(d, o(c)));
            d = f >>> 16;
            c = f & 65535;
            f = i >>> 16;
            i = i & 65535;
            var l = j >>> 16;
            j = j & 65535;
            var m = g >>> 16;
            g = g & 65535;
            var n,
              p,
              q,
              r = i * g;
            q = (r >>> 16) + f * g;
            p = q >>> 16;
            q = (q & 65535) + i * m;
            p = p + (q >>> 16) + c * g;
            n = p >>> 16;
            p = (p & 65535) + f * m;
            n = n + (p >>> 16);
            p = (p & 65535) + i * j;
            n = n + (p >>> 16);
            p = p & 65535;
            n = (n + (d * g + c * m + f * j + i * l)) & 65535;
            return [p | (n << 16), ((r & 65535) | ((q & 65535) << 16)) >>> 0];
          }
        }
        if ((e & 1) === 0) return k;
        else return h;
      }
    }
    function z(a, b) {
      return [a[0] ^ b[0], (a[1] ^ b[1]) >>> 0];
    }
    function A(a, b) {
      return [a[0] | b[0], (a[1] | b[1]) >>> 0];
    }
    function B(a, b) {
      return [a[0] & b[0], (a[1] & b[1]) >>> 0];
    }
    function C(a) {
      return a[0] * 4294967296 + a[1];
    }
    function D(a) {
      if (isNaN(a) || !isFinite(a)) return k;
      if (a <= -9223372036854776e3) return h;
      if (a + 1 >= 9223372036854776e3) return i;
      if (a < 0) return o(D(-a));
      var b = (a / 4294967296) | 0;
      a = a % 4294967296 | 0;
      return [b, a >>> 0];
    }
    function E(a) {
      var b = a[0],
        c = b >> 21;
      if (c === 0) return !0;
      else if (c === -1) return !(a[1] === 0 && b === -2097152);
      else return !1;
    }
    function F(a) {
      if (E(a)) return String(C(a));
      if (a[0] < 0)
        if ((g || (g = b("bs_caml"))).i64_eq(a, h))
          return "-9223372036854775808";
        else return "-" + F(o(a));
      var c = D(Math.floor(C(a) / 10)),
        d = c[1],
        e = c[0];
      a = s(s(a, d << 3, (d >>> 29) | (e << 3)), d << 1, (d >>> 31) | (e << 1));
      d = a[1];
      e = a[0];
      if (d === 0 && e === 0) return F(c) + "0";
      if (e < 0) {
        a = ((d ^ -1) + 1) >>> 0;
        e = Math.ceil(a / 10);
        a = 10 * e - a;
        return F(s(c, e | 0, 0)) + String(a | 0);
      }
      e = Math.floor(d / 10);
      a = d - 10 * e;
      return F(p(c, e | 0, 0)) + String(a | 0);
    }
    function G(a, c) {
      while (!0) {
        var d = c,
          e = a,
          f = e[0],
          i = 0,
          m;
        if (d[0] !== 0 || d[1] !== 0) m = 2;
        else throw { RE_EXN_ID: "Division_by_zero", Error: new Error() };
        if (m === 2)
          if (f !== -2147483648)
            if (f !== 0) i = 1;
            else {
              if (e[1] === 0) return k;
              i = 1;
            }
          else if (e[1] !== 0) i = 1;
          else {
            if (
              (g || (g = b("bs_caml"))).i64_eq(d, j) ||
              (g || (g = b("bs_caml"))).i64_eq(d, l)
            )
              return e;
            if ((g || (g = b("bs_caml"))).i64_eq(d, h)) return j;
            m = w(e, 1);
            m = u(G(m, d), 1);
            var n;
            if (m[0] !== 0) n = 3;
            else {
              if (m[1] === 0)
                if (d[0] < 0) return j;
                else return o(j);
              n = 3;
            }
            if (n === 3) {
              n = t(e, y(d, m));
              return q(m, G(n, d));
            }
          }
        if (i === 1) {
          m = d[0];
          if (m !== -2147483648) n = 2;
          else {
            if (d[1] === 0) return k;
            n = 2;
          }
          if (n === 2) {
            if (f < 0) {
              if (m >= 0) return o(G(o(e), d));
              c = o(d);
              a = o(e);
              continue;
            }
            if (m < 0) return o(G(e, o(d)));
            i = k;
            n = e;
            while ((g || (g = b("bs_caml"))).i64_ge(n, d)) {
              f = Math.floor(C(n) / C(d));
              m = 1 > f ? 1 : f;
              e = Math.ceil(Math.log(m) / Math.LN2);
              f = e <= 48 ? 1 : Math.pow(2, e - 48);
              e = D(m);
              var p = y(e, d);
              while (p[0] < 0 || (g || (g = b("bs_caml"))).i64_gt(p, n))
                (m = m - f), (e = D(m)), (p = y(e, d));
              x(e) && (e = j);
              i = q(i, e);
              n = t(n, p);
            }
            return i;
          }
        }
      }
    }
    function H(a, b) {
      return t(a, y(G(a, b), b));
    }
    function I(a, b) {
      var c = G(a, b);
      return [c, t(a, y(c, b))];
    }
    function J(a, b) {
      var c = b[0],
        d = a[0];
      d = d < c ? -1 : d === c ? 0 : 1;
      if (d !== 0) return d;
      c = b[1];
      d = a[1];
      if (d < c) return -1;
      else if (d === c) return 0;
      else return 1;
    }
    function K(a) {
      return [a < 0 ? -1 : 0, a >>> 0];
    }
    function L(a) {
      return a[1] | 0;
    }
    function M(a) {
      var b = a[1];
      a = a[0];
      var c = function (a) {
        return (a >>> 0).toString(16);
      };
      if (a === 0 && b === 0) return "0";
      if (b === 0) return c(a) + "00000000";
      if (a === 0) return c(b);
      b = c(b);
      var d = (8 - b.length) | 0;
      if (d <= 0) return c(a) + b;
      else return c(a) + ("0".repeat(d) + b);
    }
    function N(a) {
      return [2147483647 & a[0], a[1]];
    }
    function O(a) {
      return (function (a, b) {
        return new Float64Array(new Int32Array([a, b]).buffer)[0];
      })(a[1], a[0]);
    }
    function P(a) {
      a = (function (a) {
        return new Int32Array(new Float64Array([a]).buffer);
      })(a);
      return [a[1], a[0] >>> 0];
    }
    f.mk = a;
    f.succ = c;
    f.min_int = h;
    f.max_int = i;
    f.one = j;
    f.zero = k;
    f.neg_one = l;
    f.of_int32 = K;
    f.to_int32 = L;
    f.add = q;
    f.neg = o;
    f.sub = t;
    f.lsl_ = u;
    f.lsr_ = v;
    f.asr_ = w;
    f.is_zero = x;
    f.mul = y;
    f.xor = z;
    f.or_ = A;
    f.and_ = B;
    f.equal_null = d;
    f.equal_undefined = e;
    f.equal_nullable = r;
    f.to_float = C;
    f.of_float = D;
    f.div = G;
    f.mod_ = H;
    f.compare = J;
    f.float_of_bits = O;
    f.bits_of_float = P;
    f.div_mod = I;
    f.to_hex = M;
    f.discard_sign = N;
    f.to_string = F;
  },
  null
);
__d(
  "bs_caml_format",
  ["bs_caml", "bs_caml_int64"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g, h;
    function i(a) {
      if (a >= 65)
        if (a >= 97)
          if (a >= 123) return -1;
          else return (a - 87) | 0;
        else if (a >= 91) return -1;
        else return (a - 55) | 0;
      else if (a > 57 || a < 48) return -1;
      else return (a - 48) | 0;
    }
    function j(a) {
      switch (a) {
        case 0:
          return 8;
        case 1:
          return 16;
        case 2:
          return 10;
        case 3:
          return 2;
      }
    }
    function k(a) {
      var b = 1,
        c = 2,
        d = 0,
        e = a.charCodeAt(d);
      switch (e) {
        case 43:
          d = (d + 1) | 0;
          break;
        case 44:
          break;
        case 45:
          b = -1;
          d = (d + 1) | 0;
          break;
        default:
      }
      if (a[d] === "0") {
        e = a.charCodeAt((d + 1) | 0);
        if (e >= 89)
          if (e >= 111) {
            if (e < 121)
              switch (e) {
                case 111:
                  c = 0;
                  d = (d + 2) | 0;
                  break;
                case 117:
                  d = (d + 2) | 0;
                  break;
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 118:
                case 119:
                  break;
                case 120:
                  c = 1;
                  d = (d + 2) | 0;
                  break;
              }
          } else e === 98 && ((c = 3), (d = (d + 2) | 0));
        else if (e !== 66) {
          if (e >= 79)
            switch (e) {
              case 79:
                c = 0;
                d = (d + 2) | 0;
                break;
              case 85:
                d = (d + 2) | 0;
                break;
              case 80:
              case 81:
              case 82:
              case 83:
              case 84:
              case 86:
              case 87:
                break;
              case 88:
                c = 1;
                d = (d + 2) | 0;
                break;
            }
        } else (c = 3), (d = (d + 2) | 0);
      }
      return [d, b, c];
    }
    function a(a) {
      var b = k(a),
        c = b[0],
        d = j(b[2]),
        e = 4294967295,
        f = a.length,
        g = c < f ? a.charCodeAt(c) : 0;
      g = i(g);
      if (g < 0 || g >= d)
        throw { RE_EXN_ID: "Failure", _1: "int_of_string", Error: new Error() };
      var h = function (b, c) {
        while (!0) {
          var g = c,
            h = b;
          if (g === f) return h;
          var j = a.charCodeAt(g);
          if (j === 95) {
            c = (g + 1) | 0;
            continue;
          }
          j = i(j);
          if (j < 0 || j >= d)
            throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error(),
            };
          h = d * h + j;
          if (h > e)
            throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error(),
            };
          c = (g + 1) | 0;
          b = h;
          continue;
        }
      };
      b = b[1] * h(g, (c + 1) | 0);
      h = b | 0;
      if (d === 10 && b !== h)
        throw { RE_EXN_ID: "Failure", _1: "int_of_string", Error: new Error() };
      return h;
    }
    function c(a) {
      var c = k(a),
        d = c[2],
        e = c[0],
        f = (g || (g = b("bs_caml_int64"))).of_int32(j(d));
      c = g.of_int32(c[1]);
      var l;
      switch (d) {
        case 0:
          l = [536870911, 4294967295];
          break;
        case 1:
          l = [268435455, 4294967295];
          break;
        case 2:
          l = [429496729, 2576980377];
          break;
        case 3:
          l = (g || (g = b("bs_caml_int64"))).max_int;
          break;
      }
      var m = a.length;
      d = e < m ? a.charCodeAt(e) : 0;
      d = g.of_int32(i(d));
      if (
        (h || (h = b("bs_caml"))).i64_lt(
          d,
          (g || (g = b("bs_caml_int64"))).zero
        ) ||
        (h || (h = b("bs_caml"))).i64_ge(d, f)
      )
        throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error(),
        };
      var n = function (c, d) {
        while (!0) {
          var e = d,
            j = c;
          if (e === m) return j;
          var k = a.charCodeAt(e);
          if (k === 95) {
            d = (e + 1) | 0;
            continue;
          }
          k = (g || (g = b("bs_caml_int64"))).of_int32(i(k));
          if (
            (h || (h = b("bs_caml"))).i64_lt(
              k,
              (g || (g = b("bs_caml_int64"))).zero
            ) ||
            (h || (h = b("bs_caml"))).i64_ge(k, f) ||
            (h || (h = b("bs_caml"))).i64_gt(j, l)
          )
            throw {
              RE_EXN_ID: "Failure",
              _1: "int64_of_string",
              Error: new Error(),
            };
          j = g.add(g.mul(f, j), k);
          d = (e + 1) | 0;
          c = j;
          continue;
        }
      };
      c = g.mul(c, n(d, (e + 1) | 0));
      n = g.or_(c, g.zero);
      if (
        (h || (h = b("bs_caml"))).i64_eq(f, [0, 10]) &&
        (h || (h = b("bs_caml"))).i64_neq(c, n)
      )
        throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error(),
        };
      return n;
    }
    function l(a) {
      switch (a) {
        case 0:
          return 8;
        case 1:
          return 16;
        case 2:
          return 10;
      }
    }
    function m(a) {
      if (
        (a >= 65 && a <= 90) ||
        (a >= 192 && a <= 214) ||
        (a >= 216 && a <= 222)
      )
        return (a + 32) | 0;
      else return a;
    }
    function n(a) {
      var b = a.length;
      if (b > 31)
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "format_int: format too long",
          Error: new Error(),
        };
      var c = {
          justify: "+",
          signstyle: "-",
          filter: " ",
          alternate: !1,
          base: 2,
          signedconv: !1,
          width: 0,
          uppercase: !1,
          sign: 1,
          prec: -1,
          conv: "f",
        },
        d = 0;
      while (!0) {
        var e = d;
        if (e >= b) return c;
        var f = a.charCodeAt(e),
          g = 0;
        if (f >= 69)
          if (f >= 88)
            if (f >= 121) g = 1;
            else
              switch (f) {
                case 88:
                  c.base = 1;
                  c.uppercase = !0;
                  d = (e + 1) | 0;
                  continue;
                case 101:
                case 102:
                case 103:
                  g = 5;
                  break;
                case 100:
                case 105:
                  g = 4;
                  break;
                case 111:
                  c.base = 0;
                  d = (e + 1) | 0;
                  continue;
                case 117:
                  c.base = 2;
                  d = (e + 1) | 0;
                  continue;
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                case 98:
                case 99:
                case 104:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 118:
                case 119:
                  g = 1;
                  break;
                case 120:
                  c.base = 1;
                  d = (e + 1) | 0;
                  continue;
              }
          else if (f >= 72) g = 1;
          else {
            c.signedconv = !0;
            c.uppercase = !0;
            c.conv = String.fromCharCode(m(f));
            d = (e + 1) | 0;
            continue;
          }
        else
          switch (f) {
            case 35:
              c.alternate = !0;
              d = (e + 1) | 0;
              continue;
            case 32:
            case 43:
              g = 2;
              break;
            case 45:
              c.justify = "-";
              d = (e + 1) | 0;
              continue;
            case 46:
              c.prec = 0;
              var h = (e + 1) | 0;
              while (
                (function (b) {
                  return function () {
                    var c = (a.charCodeAt(b) - 48) | 0;
                    return c >= 0 && c <= 9;
                  };
                })(h)()
              )
                (c.prec =
                  (((Math.imul(c.prec, 10) + a.charCodeAt(h)) | 0) - 48) | 0),
                  (h = (h + 1) | 0);
              d = h;
              continue;
            case 33:
            case 34:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 44:
            case 47:
              g = 1;
              break;
            case 48:
              c.filter = "0";
              d = (e + 1) | 0;
              continue;
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              g = 3;
              break;
            default:
              g = 1;
          }
        switch (g) {
          case 1:
            d = (e + 1) | 0;
            continue;
          case 2:
            c.signstyle = String.fromCharCode(f);
            d = (e + 1) | 0;
            continue;
          case 3:
            c.width = 0;
            h = e;
            while (
              (function (b) {
                return function () {
                  var c = (a.charCodeAt(b) - 48) | 0;
                  return c >= 0 && c <= 9;
                };
              })(h)()
            )
              (c.width =
                (((Math.imul(c.width, 10) + a.charCodeAt(h)) | 0) - 48) | 0),
                (h = (h + 1) | 0);
            d = h;
            continue;
          case 4:
            c.signedconv = !0;
            c.base = 2;
            d = (e + 1) | 0;
            continue;
          case 5:
            c.signedconv = !0;
            c.conv = String.fromCharCode(f);
            d = (e + 1) | 0;
            continue;
        }
      }
    }
    function o(a, b) {
      var c = a.justify,
        d = a.signstyle,
        e = a.filter,
        f = a.alternate,
        g = a.base,
        h = a.signedconv,
        i = a.width,
        j = a.uppercase;
      a = a.sign;
      var k = b.length;
      h && (a < 0 || d !== "-") && (k = (k + 1) | 0);
      f && (g === 0 ? (k = (k + 1) | 0) : g === 1 && (k = (k + 2) | 0));
      var l = "";
      if (c === "+" && e === " ") for (var m = k; m < i; ++m) l = l + e;
      h && (a < 0 ? (l = l + "-") : d !== "-" && (l = l + d));
      f && g === 0 && (l = l + "0");
      f && g === 1 && (l = l + "0x");
      if (c === "+" && e === "0") for (m = k; m < i; ++m) l = l + e;
      l = j ? l + b.toUpperCase() : l + b;
      if (c === "-") for (h = k; h < i; ++h) l = l + " ";
      return l;
    }
    function d(a, b) {
      if (a === "%d") return String(b);
      a = n(a);
      b = b < 0 ? (a.signedconv ? ((a.sign = -1), -b >>> 0) : b >>> 0) : b;
      b = b.toString(l(a.base));
      if (a.prec >= 0) {
        a.filter = " ";
        var c = (a.prec - b.length) | 0;
        c > 0 && (b = "0".repeat(c) + b);
      }
      return o(a, b);
    }
    function p(a) {
      if (
        !(h || (h = b("bs_caml"))).i64_lt(
          a,
          (g || (g = b("bs_caml_int64"))).zero
        )
      )
        return (g || (g = b("bs_caml_int64"))).to_string(a);
      var c = [0, 10];
      a = (g || (g = b("bs_caml_int64"))).discard_sign(a);
      a = g.div_mod(a, c);
      c = g.div_mod(g.add([0, 8], a[1]), c);
      a = g.add(g.add([214748364, 3435973836], a[0]), c[0]);
      return g.to_string(a) + "0123456789"[g.to_int32(c[1])];
    }
    function q(a) {
      var c = "",
        d = [0, 8],
        e = "01234567";
      if (
        (h || (h = b("bs_caml"))).i64_lt(
          a,
          (g || (g = b("bs_caml_int64"))).zero
        )
      ) {
        var f = (g || (g = b("bs_caml_int64"))).discard_sign(a);
        f = g.div_mod(f, d);
        var i = g.add([268435456, 0], f[0]);
        f = f[1];
        c = e[g.to_int32(f)] + c;
        while (
          (h || (h = b("bs_caml"))).i64_neq(
            i,
            (g || (g = b("bs_caml_int64"))).zero
          )
        ) {
          var j = (g || (g = b("bs_caml_int64"))).div_mod(i, d);
          i = j[0];
          f = j[1];
          c = e[g.to_int32(f)] + c;
        }
      } else {
        j = (g || (g = b("bs_caml_int64"))).div_mod(a, d);
        f = j[0];
        i = j[1];
        c = e[g.to_int32(i)] + c;
        while (
          (h || (h = b("bs_caml"))).i64_neq(
            f,
            (g || (g = b("bs_caml_int64"))).zero
          )
        ) {
          a = (g || (g = b("bs_caml_int64"))).div_mod(f, d);
          f = a[0];
          i = a[1];
          c = e[g.to_int32(i)] + c;
        }
      }
      return c;
    }
    function e(a, c) {
      if (a === "%d") return (g || (g = b("bs_caml_int64"))).to_string(c);
      a = n(a);
      c =
        a.signedconv &&
        (h || (h = b("bs_caml"))).i64_lt(
          c,
          (g || (g = b("bs_caml_int64"))).zero
        )
          ? ((a.sign = -1), (g || (g = b("bs_caml_int64"))).neg(c))
          : c;
      var d = a.base,
        e;
      switch (d) {
        case 0:
          e = q(c);
          break;
        case 1:
          e = (g || (g = b("bs_caml_int64"))).to_hex(c);
          break;
        case 2:
          e = p(c);
          break;
      }
      if (a.prec >= 0) {
        a.filter = " ";
        d = (a.prec - e.length) | 0;
        c = d > 0 ? "0".repeat(d) + e : e;
      } else c = e;
      return o(a, c);
    }
    function r(a, b) {
      a = n(a);
      var c = a.prec < 0 ? 6 : a.prec,
        d = b < 0 ? ((a.sign = -1), -b) : b;
      b = "";
      if (isNaN(d)) (b = "nan"), (a.filter = " ");
      else if (isFinite(d)) {
        var e = a.conv;
        switch (e) {
          case "e":
            b = d.toExponential(c);
            e = b.length;
            b[(e - 3) | 0] === "e" &&
              (b = b.slice(0, (e - 1) | 0) + ("0" + b.slice((e - 1) | 0)));
            break;
          case "f":
            b = d.toFixed(c);
            break;
          case "g":
            var f = c !== 0 ? c : 1;
            b = d.toExponential((f - 1) | 0);
            e = b.indexOf("e");
            c = Number(b.slice((e + 1) | 0)) | 0;
            if (c < -4 || d >= 1e21 || d.toFixed().length > f) {
              var g = (e - 1) | 0;
              while (b[g] === "0") g = (g - 1) | 0;
              b[g] === "." && (g = (g - 1) | 0);
              b = b.slice(0, (g + 1) | 0) + b.slice(e);
              g = b.length;
              b[(g - 3) | 0] === "e" &&
                (b = b.slice(0, (g - 1) | 0) + ("0" + b.slice((g - 1) | 0)));
            } else {
              var h = f;
              if (c < 0) (h = (h - ((c + 1) | 0)) | 0), (b = d.toFixed(h));
              else
                while (
                  (function () {
                    b = d.toFixed(h);
                    return b.length > ((f + 1) | 0);
                  })()
                )
                  h = (h - 1) | 0;
              if (h !== 0) {
                e = (b.length - 1) | 0;
                while (b[e] === "0") e = (e - 1) | 0;
                b[e] === "." && (e = (e - 1) | 0);
                b = b.slice(0, (e + 1) | 0);
              }
            }
            break;
          default:
        }
      } else (b = "inf"), (a.filter = " ");
      return o(a, b);
    }
    var s = function (a, b, c) {
        if (!isFinite(a))
          return isNaN(a) ? "nan" : a > 0 ? "infinity" : "-infinity";
        var d = a == 0 && 1 / a == -Infinity ? 1 : a >= 0 ? 0 : 1;
        d && (a = -a);
        var e = 0;
        if (!(a == 0))
          if (a < 1) while (a < 1 && e > -1022) (a *= 2), e--;
          else while (a >= 2) (a /= 2), e++;
        var f = e < 0 ? "" : "+",
          g = "";
        if (d) g = "-";
        else
          switch (c) {
            case 43:
              g = "+";
              break;
            case 32:
              g = " ";
              break;
            default:
              break;
          }
        if (b >= 0 && b < 13) {
          d = Math.pow(2, b * 4);
          a = Math.round(a * d) / d;
        }
        c = a.toString(16);
        if (b >= 0) {
          d = c.indexOf(".");
          if (d < 0) c += "." + "0".repeat(b);
          else {
            a = d + 1 + b;
            c.length < a
              ? (c += "0".repeat(a - c.length))
              : (c = c.substr(0, a));
          }
        }
        return g + "0x" + c + "p" + f + e.toString(10);
      },
      t = function (a, b) {
        var c = +a;
        if (a.length > 0 && c === c) return c;
        a = a.replace(/_/g, "");
        c = +a;
        if ((a.length > 0 && c === c) || /^[+-]?nan$/i.test(a)) return c;
        var d = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(a);
        if (d) {
          var e = d[3].replace(/0+$/, ""),
            f = parseInt(d[1] + d[2] + e, 16);
          d = (d[4] | 0) - 4 * e.length;
          c = f * Math.pow(2, d);
          return c;
        }
        if (/^\+?inf(inity)?$/i.test(a)) return Infinity;
        if (/^-inf(inity)?$/i.test(a)) return -Infinity;
        throw b;
      };
    function u(a) {
      return t(a, { RE_EXN_ID: "Failure", _1: "float_of_string" });
    }
    var v = d,
      w = d,
      x = a,
      y = a;
    f.caml_format_float = r;
    f.caml_hexstring_of_float = s;
    f.caml_format_int = d;
    f.caml_nativeint_format = v;
    f.caml_int32_format = w;
    f.caml_float_of_string = u;
    f.caml_int64_format = e;
    f.caml_int_of_string = a;
    f.caml_int32_of_string = x;
    f.caml_int64_of_string = c;
    f.caml_nativeint_of_string = y;
  },
  null
);
__d(
  "bs_caml_exceptions",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = { contents: 0 };
    function a(a) {
      g.contents = (g.contents + 1) | 0;
      return a + ("/" + g.contents);
    }
    function b(a) {
      if (a == null) return !1;
      else return typeof a.RE_EXN_ID === "string";
    }
    function c(a) {
      return a.RE_EXN_ID;
    }
    f.id = g;
    f.create = a;
    f.caml_is_extension = b;
    f.caml_exn_slot_name = c;
  },
  null
);
__d(
  "bs_caml_option",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
    }
    function g(a) {
      if (a === void 0) return { BS_PRIVATE_NESTED_SOME_NONE: 0 };
      else if (a !== null && a.BS_PRIVATE_NESTED_SOME_NONE !== void 0)
        return {
          BS_PRIVATE_NESTED_SOME_NONE: (a.BS_PRIVATE_NESTED_SOME_NONE + 1) | 0,
        };
      else return a;
    }
    function b(a) {
      if (a == null) return;
      else return g(a);
    }
    function c(a) {
      if (a === void 0) return;
      else return g(a);
    }
    function d(a) {
      if (a === null) return;
      else return g(a);
    }
    function h(a) {
      if (!(a !== null && a.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) return a;
      a = a.BS_PRIVATE_NESTED_SOME_NONE;
      if (a === 0) return;
      else return { BS_PRIVATE_NESTED_SOME_NONE: (a - 1) | 0 };
    }
    function e(a) {
      if (a === void 0) return;
      else return h(a);
    }
    function i(a) {
      if (a !== void 0) return a.VAL;
      else return a;
    }
    f.nullable_to_opt = b;
    f.undefined_to_opt = c;
    f.null_to_opt = d;
    f.valFromOption = h;
    f.some = g;
    f.isNested = a;
    f.option_get = e;
    f.option_unwrap = i;
  },
  null
);
__d(
  "bs_caml_js_exceptions",
  ["bs_caml_exceptions", "bs_caml_option"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = b("bs_caml_exceptions").create("Caml_js_exceptions.Error");
    function a(a) {
      if (b("bs_caml_exceptions").caml_is_extension(a)) return a;
      else return { RE_EXN_ID: g, _1: a };
    }
    function c(a) {
      if (a.RE_EXN_ID === g) return b("bs_caml_option").some(a._1);
    }
    f.$$Error = g;
    f.internalToOCamlException = a;
    f.caml_as_js_exn = c;
  },
  null
);
__d(
  "bs_int64",
  ["bs_caml", "bs_caml_format", "bs_caml_int64", "bs_caml_js_exceptions"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g, h;
    function a(a) {
      return (g || (g = b("bs_caml_int64"))).sub(a, g.one);
    }
    function c(a) {
      if (
        (h || (h = b("bs_caml"))).i64_ge(
          a,
          (g || (g = b("bs_caml_int64"))).zero
        )
      )
        return a;
      else return (g || (g = b("bs_caml_int64"))).neg(a);
    }
    function d(a) {
      return (g || (g = b("bs_caml_int64"))).xor(a, g.neg_one);
    }
    function e(a) {
      try {
        return b("bs_caml_format").caml_int64_of_string(a);
      } catch (c) {
        a = b("bs_caml_js_exceptions").internalToOCamlException(c);
        if (a.RE_EXN_ID === "Failure") return;
        throw a;
      }
    }
    var i = (g || (g = b("bs_caml_int64"))).compare;
    function j(a, c) {
      return (g || (g = b("bs_caml_int64"))).compare(a, c) === 0;
    }
    var k = g.zero,
      l = g.one,
      m = g.neg_one,
      n = g.succ,
      o = g.max_int,
      p = g.min_int,
      q = g.to_string;
    f.zero = k;
    f.one = l;
    f.minus_one = m;
    f.succ = n;
    f.pred = a;
    f.abs = c;
    f.max_int = o;
    f.min_int = p;
    f.lognot = d;
    f.of_string_opt = e;
    f.to_string = q;
    f.compare = i;
    f.equal = j;
  },
  null
);
__d(
  "I64",
  ["bs_caml", "bs_caml_format", "bs_caml_int64", "bs_int64"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i;
    function a(a) {
      return function () {
        var b = a.apply(void 0, arguments);
        b._tag = "i64";
        return b;
      };
    }
    function b(a) {
      return function () {
        var b = a.apply(void 0, arguments);
        b != null && (b._tag = "i64");
        return b;
      };
    }
    f = a((h || (h = c("bs_caml_int64"))).mk);
    var j = a(h.succ),
      k = a(function () {
        return (h || (h = c("bs_caml_int64"))).min_int;
      })(),
      l = a(function () {
        return (h || (h = c("bs_caml_int64"))).max_int;
      })(),
      m = a(function () {
        return (h || (h = c("bs_caml_int64"))).one;
      })(),
      n = a(function () {
        return (h || (h = c("bs_caml_int64"))).zero;
      })(),
      o = a(function () {
        return (h || (h = c("bs_caml_int64"))).neg_one;
      })(),
      p = a(h.of_int32),
      q = a(h.add),
      r = a(h.neg),
      s = a(h.sub),
      t = a(h.lsl_),
      u = a(h.lsr_),
      v = a(h.asr_),
      w = a(h.mul),
      x = a(h.xor),
      y = a(h.or_),
      z = a(h.and_),
      A = a(h.of_float),
      B = a(h.div),
      C = a(h.mod_),
      D = a(function () {
        return c("bs_int64").minus_one;
      })(),
      E = a(c("bs_int64").abs),
      F = a(c("bs_int64").lognot);
    b = b(c("bs_int64").of_string_opt);
    var G, H;
    if (typeof BigInt === "function") {
      var I = BigInt(32),
        J = BigInt(4294967295);
      G = function (a) {
        return BigInt.asIntN(64, (BigInt(a[0]) << I) + BigInt(a[1])).toString();
      };
      H = function (a) {
        a = BigInt.asIntN(64, BigInt(a));
        a = [Number(a >> I), Number(a & J)];
        a._tag = "i64";
        return a;
      };
    } else
      (G = (h || (h = c("bs_caml_int64"))).to_string),
        (H = a(c("bs_caml_format").caml_int64_of_string));
    G = G;
    H = H;
    var K = a((i || (i = c("bs_caml"))).i64_max);
    a = a(i.i64_min);
    function d(a) {
      if (Array.isArray(a) && a.length === 2) {
        var b = a[0];
        a = a[1];
        if (
          typeof b === "number" &&
          Number.isInteger(b) &&
          typeof a === "number" &&
          Number.isInteger(a)
        ) {
          b = [b, a];
          b._tag = "i64";
          return b;
        }
      }
      return void 0;
    }
    function e(a) {
      return (a == null ? void 0 : a._tag) === "i64";
    }
    g.mk = f;
    g.succ = j;
    g.min_int = k;
    g.max_int = l;
    g.one = m;
    g.zero = n;
    g.neg_one = o;
    g.of_int32 = p;
    g.to_int32 = h.to_int32;
    g.add = q;
    g.neg = r;
    g.sub = s;
    g.lsl_ = t;
    g.lsr_ = u;
    g.asr_ = v;
    g.is_zero = h.is_zero;
    g.mul = w;
    g.xor = x;
    g.or_ = y;
    g.and_ = z;
    g.to_float = h.to_float;
    g.of_float = A;
    g.div = B;
    g.mod_ = C;
    g.compare = h.compare;
    g.minus_one = D;
    g.abs = E;
    g.lognot = F;
    g.of_string_opt = b;
    g.equal = c("bs_int64").equal;
    g.to_string = G;
    g.of_string = H;
    g.gt = i.i64_gt;
    g.ge = i.i64_ge;
    g.lt = i.i64_lt;
    g.le = i.i64_le;
    g.max = K;
    g.min = a;
    g.cast = d;
    g.isI64 = e;
  },
  98
);
__d(
  "LSIntEnum",
  ["I64"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = new Map();
    function a(a) {
      var b = i.get(a);
      if (b != null) return b;
      b = (h || (h = d("I64"))).of_float(a);
      i.set(a, b);
      return b;
    }
    function b(a) {
      return (h || (h = d("I64"))).to_float(a);
    }
    function c(a) {
      return (h || (h = d("I64"))).to_float(a);
    }
    g.ofNumber = a;
    g.toNumber = b;
    g.unwrapIntEnum = c;
  },
  98
);
__d(
  "isPromise",
  ["Promise"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g;
    function a(a) {
      return (
        a instanceof (g || (g = b("Promise"))) ||
        typeof (a == null ? void 0 : a.then) === "function"
      );
    }
    f["default"] = a;
  },
  66
);
__d(
  "mergeRefs",
  ["recoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a() {
      for (var a = arguments.length, b = new Array(a), d = 0; d < a; d++)
        b[d] = arguments[d];
      return function (a) {
        b.forEach(function (b) {
          if (b == null) return;
          if (typeof b === "function") {
            b(a);
            return;
          }
          if (typeof b === "object") {
            b.current = a;
            return;
          }
          c("recoverableViolation")(
            "mergeRefs cannot handle Refs of type boolean, number or string, received ref " +
              String(b),
            "comet_ui"
          );
        });
      };
    }
    g["default"] = a;
  },
  98
);
__d(
  "useMergeRefs",
  ["mergeRefs", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = (h || d("react")).useMemo;
    function a() {
      for (var a = arguments.length, b = new Array(a), d = 0; d < a; d++)
        b[d] = arguments[d];
      return i(function () {
        return c("mergeRefs").apply(void 0, b);
      }, [].concat(b));
    }
    g["default"] = a;
  },
  98
);
__d(
  "useUnsafeRef_DEPRECATED",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = (h || d("react")).useMemo;
    function a(a) {
      return i(function () {
        return { current: a };
      }, []);
    }
    g["default"] = a;
  },
  98
);
__d(
  "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "CometVisualCompletionAttributes",
  ["VisualCompletionAttributes"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("VisualCompletionAttributes");
  },
  98
);
__d(
  "ChannelClientID",
  ["MqttWebDeviceID", "gkx", "uuidv4"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = c("gkx")("3400")
      ? c("uuidv4")()
      : (a =
          c("MqttWebDeviceID") == null
            ? void 0
            : c("MqttWebDeviceID").clientID) != null
      ? a
      : c("uuidv4")();
    b = {
      getID: function () {
        return h;
      },
    };
    f.exports = b;
  },
  34
);
__d(
  "shallowEqual",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = Object.prototype.hasOwnProperty;
    function h(a, b) {
      if (a === b) return a !== 0 || b !== 0 || 1 / a === 1 / b;
      else return a !== a && b !== b;
    }
    function a(a, b) {
      if (h(a, b)) return !0;
      if (
        typeof a !== "object" ||
        a === null ||
        typeof b !== "object" ||
        b === null
      )
        return !1;
      var c = Object.keys(a),
        d = Object.keys(b);
      if (c.length !== d.length) return !1;
      for (d = 0; d < c.length; d++)
        if (!g.call(b, c[d]) || !h(a[c[d]], b[c[d]])) return !1;
      return !0;
    }
    f["default"] = a;
  },
  66
);
__d(
  "flipObject",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return Object.entries(a).reduce(function (b, c) {
        var d = c[0];
        c = c[1];
        Object.prototype.hasOwnProperty.call(a, d) &&
          typeof c !== "object" &&
          typeof c !== "function" &&
          c != null &&
          (b[String(c)] = d);
        return b;
      }, {});
    }
    f["default"] = a;
  },
  66
);
