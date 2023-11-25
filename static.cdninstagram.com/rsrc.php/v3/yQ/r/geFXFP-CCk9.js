/*FB_PKG_DELIM*/

__d(
  "React.classic",
  ["cr:1292365"],
  function (a, b, c, d, e, f) {
    e.exports = b("cr:1292365");
  },
  null
);
__d(
  "ReactDOM.classic",
  ["cr:5277"],
  function (a, b, c, d, e, f) {
    e.exports = b("cr:5277");
  },
  null
);
__d(
  "ReactDOM.classic.prod-or-profiling",
  ["cr:5278"],
  function (a, b, c, d, e, f) {
    e.exports = b("cr:5278");
  },
  null
);
__d(
  "ReactDOM",
  ["cr:4865", "err"],
  function (a, b, c, d, e, f, g) {
    var h, i, j, k, l;
    function m() {
      var a = c("err")(
        "This React API is not implemented in this environment. Use ReactDOMComet instead."
      );
      throw a;
    }
    function n() {
      var a = c("err")(
        "This React API is not implemented in this environment. Use ReactDOMLegacy_DEPRECATED instead."
      );
      throw a;
    }
    d =
      (a = b("cr:4865").createRoot) != null
        ? a
        : function () {
            return m();
          };
    f =
      (e = b("cr:4865").hydrateRoot) != null
        ? e
        : function () {
            return m();
          };
    e =
      (a = b("cr:4865").unstable_createEventHandleInternal) != null
        ? a
        : function () {
            return m();
          };
    a =
      (a = b("cr:4865").findDOMNode) != null
        ? a
        : function () {
            return n();
          };
    h =
      (h = b("cr:4865").render) != null
        ? h
        : function () {
            return n();
          };
    i =
      (i = b("cr:4865").legacyRender_DEPRECATED) != null
        ? i
        : function () {
            return n();
          };
    j =
      (j = b("cr:4865").renderForAds) != null
        ? j
        : function () {
            return n();
          };
    k =
      (k = b("cr:4865").unmountComponentAtNode) != null
        ? k
        : function () {
            return n();
          };
    l =
      (l = b("cr:4865").unstable_renderSubtreeIntoContainer) != null
        ? l
        : function () {
            return n();
          };
    g.createRoot = d;
    g.hydrateRoot = f;
    g.unstable_createEventHandle = e;
    g.findDOMNode = a;
    g.render = h;
    g.legacyRender_DEPRECATED = i;
    g.renderForAds = j;
    g.unmountComponentAtNode = k;
    g.unstable_renderSubtreeIntoContainer = l;
    g.createPortal = b("cr:4865").createPortal;
    g.flushSync = b("cr:4865").flushSync;
    g.unstable_batchedUpdates = b("cr:4865").unstable_batchedUpdates;
    g.version = b("cr:4865").version;
    g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
      b("cr:4865").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  },
  98
);
__d(
  "ReactDOMComet",
  ["cr:1108857", "cr:1294159", "cr:734", "qex"],
  function (a, b, c, d, e, f, g) {
    e = b("cr:734")
      ? b("cr:734")(b("cr:1294159").createPortal)
      : b("cr:1294159").createPortal;
    function a(a, d) {
      return b("cr:1294159").createRoot(
        a,
        babelHelpers["extends"]({}, d, {
          unstable_concurrentUpdatesByDefault: c("qex")._("723")
            ? !1
            : (a =
                d == null ? void 0 : d.unstable_concurrentUpdatesByDefault) !=
              null
            ? a
            : !1,
        })
      );
    }
    function d(a, d, e) {
      return b("cr:1294159").hydrateRoot(
        a,
        d,
        babelHelpers["extends"](
          {
            onRecoverableError: function (a) {
              if (a != null && typeof a.message === "string") {
                var b = a.message;
                if (
                  b.indexOf(
                    "The server could not finish this Suspense boundary"
                  ) !== -1 ||
                  b.indexOf("Minified React error #419;") !== -1 ||
                  b.indexOf("This Suspense boundary received an update") !==
                    -1 ||
                  b.indexOf("Minified React error #421;") !== -1
                )
                  return;
              }
              typeof reportError === "function" && reportError(a);
            },
          },
          e,
          {
            unstable_concurrentUpdatesByDefault: c("qex")._("723")
              ? !1
              : (a =
                  e == null ? void 0 : e.unstable_concurrentUpdatesByDefault) !=
                null
              ? a
              : !1,
          }
        )
      );
    }
    g.createPortal = e;
    g.unstable_batchedUpdates = b("cr:1294159").unstable_batchedUpdates;
    g.flushSync = b("cr:1294159").flushSync;
    g.createRoot = a;
    g.hydrateRoot = d;
    g.unstable_createEventHandle = b("cr:1294159").unstable_createEventHandle;
    g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
      b("cr:1294159").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    g.version = b("cr:1294159").version;
  },
  98
);
__d(
  "ReactFeatureFlags",
  ["gkx", "qex"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = !1;
    b = !0;
    d = !1;
    e = !1;
    f = !0;
    var i = !1,
      j = (h = c("gkx"))("10813"),
      k = h("6361"),
      l = h("1401060"),
      m = h("2257"),
      n = h("8003"),
      o = h("8354"),
      p = !0,
      q = !h("7518");
    c = c("qex")._("644") === !0;
    var r = h("1596063");
    h = h("1840809");
    var s = !1,
      t = !1;
    g.disableInputAttributeSyncing = a;
    g.enableSyncDefaultUpdates = b;
    g.enableAsyncActions = d;
    g.alwaysThrottleRetries = e;
    g.enableDO_NOT_USE_disableStrictPassiveEffect = f;
    g.enableUseRefAccessWarning = i;
    g.enableDeferRootSchedulingToMicrotask = j;
    g.enableTrustedTypesIntegration = k;
    g.enableLegacyFBSupport = l;
    g.enableUnifiedSyncLane = m;
    g.disableIEWorkarounds = n;
    g.enableRetryLaneExpiration = o;
    g.enableCustomElementPropertySupport = p;
    g.diffInCommitPhase = q;
    g.enableLazyContextPropagation = c;
    g.enableSchedulingProfiler = r;
    g.enableProfilerNestedUpdateScheduledHook = h;
    g.enableTransitionTracing = s;
    g.disableSchedulerTimeoutInWorkLoop = t;
  },
  98
);
__d(
  "ReactDOMCompatibilityLayer",
  ["ReactDOMComet"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = typeof WeakMap === "function" ? new WeakMap() : new Map();
    function a(a, b, c) {
      var e = h.get(b);
      e == null && ((e = d("ReactDOMComet").createRoot(b)), h.set(b, e));
      c = null;
      var f = a.ref;
      d("ReactDOMComet").flushSync(function () {
        var b;
        return (b = e) == null
          ? void 0
          : b.render(
              typeof a.type === "string" ||
                ((b = a.type) == null
                  ? void 0
                  : (b = b.prototype) == null
                  ? void 0
                  : b.isReactComponent)
                ? babelHelpers["extends"]({}, a, {
                    ref: function (a) {
                      typeof f === "function"
                        ? f(a)
                        : f != null && (f.current = a),
                        (c = a);
                    },
                  })
                : a
            );
      });
      return c;
    }
    function b(a) {
      if (a == null) return !1;
      var b = h.get(a);
      if (b) {
        d("ReactDOMComet").flushSync(function () {
          b.unmount();
        });
        h["delete"](a);
        return !0;
      }
      return !1;
    }
    g.render = a;
    g.unmountComponentAtNode = b;
  },
  98
);
__d(
  "ReactLegacyShim_DEPRECATED",
  ["ReactDOMCompatibilityLayer"],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      return d("ReactDOMCompatibilityLayer").render(a, b);
    }
    g.render = a;
  },
  98
);
__d(
  "React-prod.classic",
  ["ReactFeatureFlags"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = Symbol["for"]("react.element"),
      h = Symbol["for"]("react.portal"),
      i = Symbol["for"]("react.fragment"),
      j = Symbol["for"]("react.strict_mode"),
      k = Symbol["for"]("react.profiler"),
      l = Symbol["for"]("react.provider"),
      m = Symbol["for"]("react.context"),
      n = Symbol["for"]("react.forward_ref"),
      o = Symbol["for"]("react.suspense"),
      p = Symbol["for"]("react.suspense_list"),
      q = Symbol["for"]("react.memo"),
      r = Symbol["for"]("react.lazy"),
      s = Symbol["for"]("react.scope"),
      t = Symbol["for"]("react.debug_trace_mode"),
      u = Symbol["for"]("react.offscreen"),
      v = Symbol["for"]("react.legacy_hidden"),
      w = Symbol["for"]("react.cache"),
      x = Symbol["for"]("react.tracing_marker"),
      y = typeof Symbol === "function" ? Symbol.iterator : "@@iterator";
    function z(a) {
      if (null === a || "object" !== typeof a) return null;
      a = (y && a[y]) || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var A = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      B = Object.assign,
      C = {};
    function a(a, b, c) {
      (this.props = a),
        (this.context = b),
        (this.refs = C),
        (this.updater = c || A);
    }
    a.prototype.isReactComponent = {};
    a.prototype.setState = function (a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    a.prototype.forceUpdate = function (a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function c() {}
    c.prototype = a.prototype;
    function d(a, b, c) {
      (this.props = a),
        (this.context = b),
        (this.refs = C),
        (this.updater = c || A);
    }
    c = d.prototype = new c();
    c.constructor = d;
    B(c, a.prototype);
    c.isPureReactComponent = !0;
    var D = Array.isArray,
      E = b("ReactFeatureFlags").enableTransitionTracing,
      F = Object.prototype.hasOwnProperty,
      G = { current: null },
      H = { key: !0, ref: !0, __self: !0, __source: !0 };
    function I(a, b, c) {
      var d,
        e = {},
        f = null,
        h = null;
      if (null != b)
        for (d in (void 0 !== b.ref && (h = b.ref),
        void 0 !== b.key && (f = "" + b.key),
        b))
          F.call(b, d) &&
            !Object.prototype.hasOwnProperty.call(H, d) &&
            (e[d] = b[d]);
      var i = arguments.length - 2;
      if (1 === i) e.children = c;
      else if (1 < i) {
        for (var j = Array(i), k = 0; k < i; k++) j[k] = arguments[k + 2];
        e.children = j;
      }
      if (a && a.defaultProps)
        for (d in ((i = a.defaultProps), i)) void 0 === e[d] && (e[d] = i[d]);
      return {
        $$typeof: g,
        type: a,
        key: f,
        ref: h,
        props: e,
        _owner: G.current,
      };
    }
    function J(a, b) {
      return {
        $$typeof: g,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner,
      };
    }
    function K(a) {
      return "object" === typeof a && null !== a && a.$$typeof === g;
    }
    function L(a) {
      var b = { "=": "=0", ":": "=2" };
      return (
        "$" +
        a.replace(/[=:]/g, function (a) {
          return b[a];
        })
      );
    }
    var M = /\/+/g;
    function N(a, b) {
      return "object" === typeof a && null !== a && null != a.key
        ? L("" + a.key)
        : b.toString(36);
    }
    function O(a, b, c, d, e) {
      var f = typeof a;
      ("undefined" === f || "boolean" === f) && (a = null);
      var i = !1;
      if (null === a) i = !0;
      else
        switch (f) {
          case "string":
          case "number":
            i = !0;
            break;
          case "object":
            switch (a.$$typeof) {
              case g:
              case h:
                i = !0;
            }
        }
      if (i)
        return (
          (i = a),
          (e = e(i)),
          (a = "" === d ? "." + N(i, 0) : d),
          D(e)
            ? ((c = ""),
              null != a && (c = a.replace(M, "$&/") + "/"),
              O(e, b, c, "", function (a) {
                return a;
              }))
            : null != e &&
              (K(e) &&
                (e = J(
                  e,
                  c +
                    (!e.key || (i && i.key === e.key)
                      ? ""
                      : ("" + e.key).replace(M, "$&/") + "/") +
                    a
                )),
              b.push(e)),
          1
        );
      i = 0;
      d = "" === d ? "." : d + ":";
      if (D(a))
        for (var j = 0; j < a.length; j++) {
          f = a[j];
          var k = d + N(f, j);
          i += O(f, b, c, k, e);
        }
      else if (((k = z(a)), "function" === typeof k))
        for (a = k.call(a), j = 0; !(f = a.next()).done; )
          (f = f.value), (k = d + N(f, j++)), (i += O(f, b, c, k, e));
      else if ("object" === f)
        throw (
          ((b = String(a)),
          Error(
            "Objects are not valid as a React child (found: " +
              ("[object Object]" === b
                ? "object with keys {" + Object.keys(a).join(", ") + "}"
                : b) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      return i;
    }
    function P(a, b, c) {
      if (null == a) return a;
      var d = [],
        e = 0;
      O(a, d, "", "", function (a) {
        return b.call(c, a, e++);
      });
      return d;
    }
    function Q(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(
          function (b) {
            (0 === a._status || -1 === a._status) &&
              ((a._status = 1), (a._result = b));
          },
          function (b) {
            (0 === a._status || -1 === a._status) &&
              ((a._status = 2), (a._result = b));
          }
        );
        -1 === a._status && ((a._status = 0), (a._result = b));
      }
      if (1 === a._status) return a._result["default"];
      throw a._result;
    }
    var R = { current: null };
    function S() {
      return new WeakMap();
    }
    function T() {
      return { s: 0, v: void 0, o: null, p: null };
    }
    var U = { current: null },
      V = { transition: null };
    c = {
      ReactCurrentDispatcher: U,
      ReactCurrentCache: R,
      ReactCurrentBatchConfig: V,
      ReactCurrentOwner: G,
    };
    var W = c.ReactCurrentOwner,
      X = { key: !0, ref: !0, __self: !0, __source: !0 };
    function e(a, b, c) {
      var d = {},
        e = null,
        f = null;
      void 0 !== c && (e = "" + c);
      void 0 !== b.key && (e = "" + b.key);
      void 0 !== b.ref && (f = b.ref);
      for (c in b)
        F.call(b, c) &&
          !Object.prototype.hasOwnProperty.call(X, c) &&
          (d[c] = b[c]);
      if (a && a.defaultProps)
        for (c in ((b = a.defaultProps), b)) void 0 === d[c] && (d[c] = b[c]);
      return {
        $$typeof: g,
        type: a,
        key: e,
        ref: f,
        props: d,
        _owner: W.current,
      };
    }
    f.Children = {
      map: P,
      forEach: function (a, b, c) {
        P(
          a,
          function () {
            b.apply(this, arguments);
          },
          c
        );
      },
      count: function (a) {
        var b = 0;
        P(a, function () {
          b++;
        });
        return b;
      },
      toArray: function (a) {
        return (
          P(a, function (a) {
            return a;
          }) || []
        );
      },
      only: function (a) {
        if (!K(a))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return a;
      },
    };
    f.Component = a;
    f.Fragment = i;
    f.Profiler = k;
    f.PureComponent = d;
    f.StrictMode = j;
    f.Suspense = o;
    f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = c;
    f.cache = function (a) {
      return function () {
        var b = R.current;
        if (!b) return a.apply(null, arguments);
        var c = b.getCacheForType(S);
        b = c.get(a);
        void 0 === b && ((b = T()), c.set(a, b));
        c = 0;
        for (var d = arguments.length; c < d; c++) {
          var e = arguments[c];
          if (
            "function" === typeof e ||
            ("object" === typeof e && null !== e)
          ) {
            var f = b.o;
            null === f && (b.o = f = new WeakMap());
            b = f.get(e);
            void 0 === b && ((b = T()), f.set(e, b));
          } else
            (f = b.p),
              null === f && (b.p = f = new Map()),
              (b = f.get(e)),
              void 0 === b && ((b = T()), f.set(e, b));
        }
        if (1 === b.s) return b.v;
        if (2 === b.s) throw b.v;
        try {
          var g = a.apply(null, arguments);
          c = b;
          c.s = 1;
          return (c.v = g);
        } catch (a) {
          throw ((g = b), (g.s = 2), (g.v = a), a);
        }
      };
    };
    f.cloneElement = function (a, b, c) {
      if (null === a || void 0 === a)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            a +
            "."
        );
      var d = B({}, a.props),
        e = a.key,
        f = a.ref,
        h = a._owner;
      if (null != b) {
        void 0 !== b.ref && ((f = b.ref), (h = G.current));
        void 0 !== b.key && (e = "" + b.key);
        if (a.type && a.type.defaultProps) var i = a.type.defaultProps;
        for (j in b)
          F.call(b, j) &&
            !Object.prototype.hasOwnProperty.call(H, j) &&
            (d[j] = void 0 === b[j] && void 0 !== i ? i[j] : b[j]);
      }
      var j = arguments.length - 2;
      if (1 === j) d.children = c;
      else if (1 < j) {
        i = Array(j);
        for (var k = 0; k < j; k++) i[k] = arguments[k + 2];
        d.children = i;
      }
      return { $$typeof: g, type: a.type, key: e, ref: f, props: d, _owner: h };
    };
    f.createContext = function (a) {
      a = {
        $$typeof: m,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      };
      a.Provider = { $$typeof: l, _context: a };
      return (a.Consumer = a);
    };
    f.createElement = I;
    f.createFactory = function (a) {
      var b = I.bind(null, a);
      b.type = a;
      return b;
    };
    f.createRef = function () {
      return { current: null };
    };
    f.experimental_useEffectEvent = function (a) {
      return U.current.useEffectEvent(a);
    };
    f.forwardRef = function (a) {
      return { $$typeof: n, render: a };
    };
    f.isValidElement = K;
    f.jsx = e;
    f.jsxDEV = void 0;
    f.jsxs = e;
    f.lazy = function (a) {
      return { $$typeof: r, _payload: { _status: -1, _result: a }, _init: Q };
    };
    f.memo = function (a, b) {
      return { $$typeof: q, type: a, compare: void 0 === b ? null : b };
    };
    f.startTransition = function (a, b) {
      var c = V.transition;
      V.transition = {};
      E &&
        void 0 !== b &&
        void 0 !== b.name &&
        ((V.transition.name = b.name), (V.transition.startTime = -1));
      try {
        a();
      } finally {
        V.transition = c;
      }
    };
    f.unstable_Activity = u;
    f.unstable_Cache = w;
    f.unstable_DebugTracingMode = t;
    f.unstable_LegacyHidden = v;
    f.unstable_Scope = s;
    f.unstable_SuspenseList = p;
    f.unstable_TracingMarker = x;
    f.unstable_act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    };
    f.unstable_getCacheForType = function (a) {
      var b = R.current;
      return b ? b.getCacheForType(a) : a();
    };
    f.unstable_getCacheSignal = function () {
      var a = R.current;
      return a
        ? a.getCacheSignal()
        : ((a = new AbortController()),
          a.abort(
            Error(
              "This CacheSignal was requested outside React which means that it is immediately aborted."
            )
          ),
          a.signal);
    };
    f.unstable_useCacheRefresh = function () {
      return U.current.useCacheRefresh();
    };
    f.unstable_useMemoCache = function (a) {
      return U.current.useMemoCache(a);
    };
    f.use = function (a) {
      return U.current.use(a);
    };
    f.useCallback = function (a, b) {
      return U.current.useCallback(a, b);
    };
    f.useContext = function (a) {
      return U.current.useContext(a);
    };
    f.useDebugValue = function () {};
    f.useDeferredValue = function (a, b) {
      return U.current.useDeferredValue(a, b);
    };
    f.useEffect = function (a, b) {
      return U.current.useEffect(a, b);
    };
    f.useId = function () {
      return U.current.useId();
    };
    f.useImperativeHandle = function (a, b, c) {
      return U.current.useImperativeHandle(a, b, c);
    };
    f.useInsertionEffect = function (a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    f.useLayoutEffect = function (a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    f.useMemo = function (a, b) {
      return U.current.useMemo(a, b);
    };
    f.useOptimistic = function (a, b) {
      return U.current.useOptimistic(a, b);
    };
    f.useReducer = function (a, b, c) {
      return U.current.useReducer(a, b, c);
    };
    f.useRef = function (a) {
      return U.current.useRef(a);
    };
    f.useState = function (a) {
      return U.current.useState(a);
    };
    f.useSyncExternalStore = function (a, b, c) {
      return U.current.useSyncExternalStore(a, b, c);
    };
    f.useTransition = function () {
      return U.current.useTransition();
    };
    f.version = "18.3.0-www-classic-2869b479";
  },
  null
);
