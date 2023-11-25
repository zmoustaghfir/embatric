/*FB_PKG_DELIM*/

__d(
  "IntlVariations",
  [],
  function (a, b, c, d, e, f) {
    e.exports = {
      BITMASK_NUMBER: 28,
      BITMASK_GENDER: 3,
      NUMBER_ZERO: 16,
      NUMBER_ONE: 4,
      NUMBER_TWO: 8,
      NUMBER_FEW: 20,
      NUMBER_MANY: 12,
      NUMBER_OTHER: 24,
      GENDER_MALE: 1,
      GENDER_FEMALE: 2,
      GENDER_UNKNOWN: 3,
    };
  },
  null
);
__d(
  "InlineFbtResult",
  ["cr:1183579"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:1183579");
  },
  98
);
__d(
  "FbtReactUtil",
  [],
  function (a, b, c, d, e, f) {
    a =
      (typeof Symbol === "function" &&
        Symbol["for"] &&
        Symbol["for"]("react.element")) ||
      60103;
    var g = !1;
    b = {
      REACT_ELEMENT_TYPE: a,
      injectReactShim: function (a) {
        var b = { validated: !0 };
        g
          ? Object.defineProperty(a, "_store", {
              configurable: !1,
              enumerable: !1,
              writable: !1,
              value: b,
            })
          : (a._store = b);
      },
    };
    e.exports = b;
  },
  null
);
__d(
  "FbtResultBase",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = (function () {
      function a(a, b) {
        (this.$1 = a),
          (this.__errorListener = b),
          (this.$3 = !1),
          (this.$2 = null);
      }
      var b = a.prototype;
      b.flattenToArray = function () {
        return a.flattenToArray(this.$1);
      };
      b.getContents = function () {
        return this.$1;
      };
      b.toString = function () {
        if (Object.isFrozen(this)) return this.$4();
        if (this.$3) return "<<Reentering fbt.toString() is forbidden>>";
        this.$3 = !0;
        try {
          return this.$4();
        } finally {
          this.$3 = !1;
        }
      };
      b.$4 = function () {
        if (this.$2 != null) return this.$2;
        var b = "",
          c = this.flattenToArray();
        for (var d = 0; d < c.length; ++d) {
          var e = c[d];
          if (typeof e === "string" || e instanceof a) b += e.toString();
          else {
            var f;
            (f = this.__errorListener) == null
              ? void 0
              : f.onStringSerializationError == null
              ? void 0
              : f.onStringSerializationError(e);
          }
        }
        Object.isFrozen(this) || (this.$2 = b);
        return b;
      };
      b.toJSON = function () {
        return this.toString();
      };
      a.flattenToArray = function (b) {
        var c = [];
        for (var d = 0; d < b.length; ++d) {
          var e = b[d];
          Array.isArray(e)
            ? c.push.apply(c, a.flattenToArray(e))
            : e instanceof a
            ? c.push.apply(c, e.flattenToArray())
            : c.push(e);
        }
        return c;
      };
      return a;
    })();
    [
      "anchor",
      "big",
      "blink",
      "bold",
      "charAt",
      "charCodeAt",
      "codePointAt",
      "contains",
      "endsWith",
      "fixed",
      "fontcolor",
      "fontsize",
      "includes",
      "indexOf",
      "italics",
      "lastIndexOf",
      "link",
      "localeCompare",
      "match",
      "normalize",
      "repeat",
      "replace",
      "search",
      "slice",
      "small",
      "split",
      "startsWith",
      "strike",
      "sub",
      "substr",
      "substring",
      "sup",
      "toLocaleLowerCase",
      "toLocaleUpperCase",
      "toLowerCase",
      "toUpperCase",
      "trim",
      "trimLeft",
      "trimRight",
    ].forEach(function (a) {
      g.prototype[a] = function () {
        var b;
        (b = this.__errorListener) == null
          ? void 0
          : b.onStringMethodUsed == null
          ? void 0
          : b.onStringMethodUsed(a);
        for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++)
          d[e] = arguments[e];
        return String.prototype[a].apply(this, d);
      };
    });
    a = g;
    e.exports = a;
  },
  null
);
__d(
  "FbtResult",
  ["FbtReactUtil", "FbtResultBase"],
  function (a, b, c, d, e, f) {
    var g = function (a) {
      return a.content;
    };
    a = (function (a) {
      "use strict";
      babelHelpers.inheritsLoose(c, a);
      function c(c, d) {
        d = a.call(this, c, d) || this;
        d.$$typeof = b("FbtReactUtil").REACT_ELEMENT_TYPE;
        d.key = null;
        d.ref = null;
        d.type = g;
        d.props = { content: c };
        return d;
      }
      c.get = function (a) {
        return new c(a.contents, a.errorListener);
      };
      return c;
    })(b("FbtResultBase"));
    e.exports = a;
  },
  null
);
__d(
  "TransAppInlineMode",
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      STRING_MANAGER: "STRING_MANAGER",
      TRANSLATION: "TRANSLATION",
      APPROVE: "APPROVE",
      REPORT: "REPORT",
      NO_INLINE: "NO_INLINE",
    });
    f["default"] = a;
  },
  66
);
__d(
  "getUnwrappedFbt",
  ["FbtResultGK"],
  function (a, b, c, d, e, f) {
    function a(a) {
      a = a.contents;
      var c = b("FbtResultGK").inlineMode,
        d = b("FbtResultGK").shouldReturnFbtResult;
      if (!d && c !== "REPORT")
        return (a == null ? void 0 : a.length) === 1 && typeof a[0] === "string"
          ? a[0]
          : a;
    }
    e.exports = a;
  },
  null
);
__d(
  "getFbtResult",
  [
    "FbtResult",
    "FbtResultGK",
    "InlineFbtResult",
    "getUnwrappedFbt",
    "gkx",
    "recoverableViolation",
  ],
  function (a, b, c, d, e, f, g) {
    if (c("gkx")("708253") && c("FbtResultGK").inlineMode === "TRANSLATION") {
      c("recoverableViolation")(
        "TransAppInlineMode=TRANSLATION should not happen on Comet yet. " +
          ("[inlineMode=" +
            ((b = c("FbtResultGK").inlineMode) != null ? b : "") +
            "]") +
          ("[runtime_site_is_comet=" + String(c("gkx")("708253")) + "]"),
        "internationalization"
      );
    }
    function a(a) {
      var b = c("getUnwrappedFbt")(a);
      if (b != null) return b;
      b = a.contents;
      var d = a.patternString,
        e = a.patternHash;
      return c("FbtResultGK").inlineMode != null &&
        c("FbtResultGK").inlineMode !== "NO_INLINE"
        ? new (c("InlineFbtResult"))(b, c("FbtResultGK").inlineMode, d, e)
        : c("FbtResult").get(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "getCrossOriginTransport",
  ["invariant", "ExecutionEnvironment", "err"],
  function (a, b, c, d, e, f, g) {
    var h;
    function i() {
      if (!(h || (h = b("ExecutionEnvironment"))).canUseDOM)
        throw b("err")(
          "getCrossOriginTransport: %s",
          "Cross origin transport unavailable in the server environment."
        );
      try {
        var a = new XMLHttpRequest();
        !("withCredentials" in a) &&
          typeof XDomainRequest !== "undefined" &&
          (a = new XDomainRequest());
        return a;
      } catch (a) {
        throw b("err")("getCrossOriginTransport: %s", a.message);
      }
    }
    i.withCredentials = function () {
      var a = i();
      "withCredentials" in a || g(0, 5150);
      var b = a.open;
      a.open = function () {
        b.apply(this, arguments), (this.withCredentials = !0);
      };
      return a;
    };
    e.exports = i;
  },
  null
);
__d(
  "ZeroRewrites",
  [
    "URI",
    "ZeroRewriteRules",
    "getCrossOriginTransport",
    "getSameOriginTransport",
    "isFacebookURI",
  ],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        rewriteURI: function (a) {
          if (!b("isFacebookURI")(a) || h._isWhitelisted(a)) return a;
          var c = h._getRewrittenSubdomain(a);
          c !== null && c !== void 0 && (a = a.setSubdomain(c));
          return a;
        },
        getTransportBuilderForURI: function (a) {
          return h.isRewritten(a)
            ? b("getCrossOriginTransport").withCredentials
            : b("getSameOriginTransport");
        },
        isRewriteSafe: function (a) {
          if (
            Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 ||
            !b("isFacebookURI")(a)
          )
            return !1;
          var c = h._getCurrentURI().getDomain(),
            d = new (g || (g = b("URI")))(a).qualify().getDomain();
          return c === d || h.isRewritten(a);
        },
        isRewritten: function (a) {
          a = a.getQualifiedURI();
          if (
            Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 ||
            !b("isFacebookURI")(a) ||
            h._isWhitelisted(a)
          )
            return !1;
          var c = a.getSubdomain(),
            d = h._getCurrentURI(),
            e = h._getRewrittenSubdomain(d);
          return a.getDomain() !== d.getDomain() && c === e;
        },
        _isWhitelisted: function (a) {
          a = a.getPath();
          a.endsWith("/") || (a += "/");
          return (
            b("ZeroRewriteRules").whitelist &&
            b("ZeroRewriteRules").whitelist[a] === 1
          );
        },
        _getRewrittenSubdomain: function (a) {
          a = a.getQualifiedURI().getSubdomain();
          return b("ZeroRewriteRules").rewrite_rules[a];
        },
        _getCurrentURI: function () {
          return new (g || (g = b("URI")))("/").qualify();
        },
      };
    e.exports = h;
  },
  null
);
__d(
  "FbtErrorListenerWWW",
  ["FBLogger", "killswitch"],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a) {
        (this.$1 = a.hash), (this.$2 = a.translation);
      }
      var b = a.prototype;
      b.onStringSerializationError = function (a) {
        var b = "Context not logged.";
        if (!c("killswitch")("JS_RELIABILITY_FBT_LOGGING"))
          try {
            var d = JSON.stringify(a);
            d != null && (b = d.substr(0, 250));
          } catch (a) {
            b = a.message;
          }
        d =
          (a == null
            ? void 0
            : (d = a.constructor) == null
            ? void 0
            : d.name) || "";
        c("FBLogger")("fbt")
          .blameToPreviousDirectory()
          .blameToPreviousDirectory()
          .mustfix(
            'Converting to a string will drop content data. Hash="%s" Translation="%s" Content="%s" (type=%s,%s)',
            this.$1,
            this.$2,
            b,
            typeof a,
            d
          );
      };
      b.onStringMethodUsed = function (a) {
        c("FBLogger")("fbt")
          .blameToPreviousDirectory()
          .blameToPreviousDirectory()
          .mustfix(
            "Error using fbt string. Used method %s on Fbt string. Fbt string is designed to be immutable and should not be manipulated.",
            a
          );
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "FbtPureStringResult",
  ["FbtResult"],
  function (a, b, c, d, e, f) {
    a = (function (a) {
      "use strict";
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      return b;
    })(b("FbtResult"));
    c = a;
    e.exports = c;
  },
  null
);
__d(
  "getFbsResult",
  ["FbtPureStringResult"],
  function (a, b, c, d, e, f) {
    function a(a) {
      return new (b("FbtPureStringResult"))(a.contents, a.errorListener);
    }
    e.exports = a;
  },
  null
);
__d(
  "getTranslatedInput",
  ["Env", "ExecutionEnvironment", "FBLogger", "MakeHasteTranslationsMap"],
  function (a, b, c, d, e, f, g) {
    var h, i;
    b = "JHASH";
    var j = new RegExp("__" + b + "__(.+?)__" + b + "__"),
      k = !!(h || (h = c("Env"))).use_fbt_virtual_modules;
    function a(a) {
      var b = a.table;
      if (k && (i || (i = c("ExecutionEnvironment"))).isInBrowser) {
        if (typeof b === "string") {
          var e = b.match(j);
          if (e != null)
            return babelHelpers["extends"]({}, a, {
              table: d("MakeHasteTranslationsMap").get(e[1]),
            });
        }
        c("FBLogger")("binary_transparency", "inlined_translations").warn(
          "Found inlined translated contents in client_fetch_translations experiment! Input: %s",
          JSON.stringify(b)
        );
      }
      return a;
    }
    g["default"] = a;
  },
  98
);
__d(
  "translationOverrideListener",
  ["requireDeferred"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = c("requireDeferred")("IntlQtEventFalcoEvent").__setRef(
      "translationOverrideListener"
    );
    function a(a) {
      h.onReady(function (b) {
        return b.log(function () {
          return { hash: a };
        });
      });
    }
    g["default"] = a;
  },
  98
);
__d(
  "FbtEnv",
  [
    "FbtErrorListenerWWW",
    "FbtHooks",
    "IntlViewerContext",
    "getFbsResult",
    "getFbtResult",
    "getTranslatedInput",
    "promiseDone",
    "qex",
    "requireDeferred",
    "translationOverrideListener",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = c("requireDeferred")("FbtLogging").__setRef("FbtEnv"),
      j = !1;
    function a() {
      if (j) return;
      j = !0;
      (h || (h = b("FbtHooks"))).register({
        errorListener: function (a) {
          return new (c("FbtErrorListenerWWW"))(a);
        },
        getFbsResult: c("getFbsResult"),
        getFbtResult: c("getFbtResult"),
        getTranslatedInput: c("getTranslatedInput"),
        onTranslationOverride: c("translationOverrideListener"),
        getViewerContext: function () {
          return c("IntlViewerContext");
        },
        logImpression: function (a) {
          return c("promiseDone")(
            i.load().then(function (b) {
              var d = c("qex")._("662");
              b.logImpression == null ? void 0 : b.logImpression(a, d);
            })
          );
        },
      });
    }
    g.setupOnce = a;
  },
  98
);
__d(
  "FbtHooksImpl",
  [],
  function (a, b, c, d, e, f) {
    var g = {};
    a = {
      getErrorListener: function (a) {
        return g.errorListener == null ? void 0 : g.errorListener(a);
      },
      logImpression: function (a) {
        g.logImpression == null ? void 0 : g.logImpression(a);
      },
      onTranslationOverride: function (a) {
        g.onTranslationOverride == null ? void 0 : g.onTranslationOverride(a);
      },
      getFbsResult: function (a) {
        return g.getFbsResult(a);
      },
      getFbtResult: function (a) {
        return g.getFbtResult(a);
      },
      getTranslatedInput: function (a) {
        var b;
        return (b =
          g.getTranslatedInput == null ? void 0 : g.getTranslatedInput(a)) !=
          null
          ? b
          : a;
      },
      getViewerContext: function () {
        return g.getViewerContext();
      },
      register: function (a) {
        Object.assign(g, a);
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "FbtHooks",
  ["FbtEnv", "FbtHooksImpl"],
  function (a, b, c, d, e, f) {
    (e.exports = b("FbtHooksImpl")), b("FbtEnv").setupOnce();
  },
  null
);
__d(
  "CometLruCache",
  ["recoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = (function () {
      function a(a) {
        (this.$1 = a),
          a <= 0 &&
            c("recoverableViolation")(
              "CometLruCache: Unable to create instance of cache with zero or negative capacity.",
              "CometLruCache"
            ),
          (this.$2 = new Map());
      }
      var b = a.prototype;
      b.set = function (a, b) {
        this.$2["delete"](a);
        this.$2.set(a, b);
        if (this.$2.size > this.$1) {
          a = this.$2.keys().next();
          a.done || this.$2["delete"](a.value);
        }
      };
      b.get = function (a) {
        var b = this.$2.get(a);
        b != null && (this.$2["delete"](a), this.$2.set(a, b));
        return b;
      };
      b.has = function (a) {
        return this.$2.has(a);
      };
      b["delete"] = function (a) {
        this.$2["delete"](a);
      };
      b.size = function () {
        return this.$2.size;
      };
      b.capacity = function () {
        return this.$1 - this.$2.size;
      };
      b.clear = function () {
        this.$2.clear();
      };
      return a;
    })();
    function a(a) {
      return new h(a);
    }
    g.create = a;
  },
  98
);
__d(
  "structuredClone",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = (a = window) == null ? void 0 : a.structuredClone;
    f["default"] = b;
  },
  66
);
__d(
  "ConstUriUtils",
  [
    "CometLruCache",
    "ExecutionEnvironment",
    "FBLogger",
    "PHPQuerySerializer",
    "PHPQuerySerializerNoEncoding",
    "URIRFC3986",
    "URISchemes",
    "UriNeedRawQuerySVConfig",
    "isSameOrigin",
    "recoverableViolation",
    "structuredClone",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = d("CometLruCache").create(5e3),
      m = new RegExp("(^|\\.)facebook\\.com$", "i"),
      n = new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),
      o = new RegExp(
        "[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"
      ),
      p = c("UriNeedRawQuerySVConfig").uris.map(function (a) {
        return { domain: a, valid: w(a) };
      }),
      q = [],
      r = [];
    function s(a, b) {
      var d = {};
      if (a != null)
        for (
          var a = a.entries(),
            e = Array.isArray(a),
            f = 0,
            a = e
              ? a
              : a[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var g;
          if (e) {
            if (f >= a.length) break;
            g = a[f++];
          } else {
            f = a.next();
            if (f.done) break;
            g = f.value;
          }
          g = g;
          d[g[0]] = g[1];
        }
      else
        c("FBLogger")("ConstUriUtils").warn(
          "Passed a null query map in, this means poor client side flow coverage or client/server boundary type issue."
        );
      return b.serialize(d);
    }
    function t(a, b, d) {
      var e = k || (k = c("PHPQuerySerializer"));
      if (["http", "https"].includes(b) && u(a)) {
        if (a.includes("doubleclick.net") && d != null && !d.startsWith("http"))
          return e;
        e = c("PHPQuerySerializerNoEncoding");
      }
      return e;
    }
    function u(a) {
      return (
        a != null &&
        p.some(function (b) {
          return b.valid && v(a, b.domain);
        })
      );
    }
    function v(a, b) {
      if (b === "" || a === "") return !1;
      if (a.endsWith(b)) {
        b = a.length - b.length - 1;
        if (b === -1 || a[b] === ".") return !0;
      }
      return !1;
    }
    function w(a) {
      return !o.test(a);
    }
    function x(a, b) {
      var c =
        b.protocol != null && b.protocol !== "" ? b.protocol : a.getProtocol();
      c = b.domain != null ? t(b.domain, c) : a.getSerializer();
      c = {
        domain: a.getDomain(),
        fragment: a.getFragment(),
        fragmentSeparator: a.hasFragmentSeparator(),
        isGeneric: a.isGeneric(),
        originalRawQuery: a.getOriginalRawQuery(),
        path: a.getPath(),
        port: a.getPort(),
        protocol: a.getProtocol(),
        queryParams: a.getQueryParams(),
        serializer: c,
        subdomain: a.getSubdomain(),
      };
      a = babelHelpers["extends"]({}, c, b);
      c = b.queryParams != null && b.queryParams.size !== 0;
      return C.getUribyObject(a, c);
    }
    function y(a, b, c, d) {
      c === void 0 && (c = !1);
      var e =
          a.protocol !== "" ? a.protocol + ":" + (a.isGeneric ? "" : "//") : "",
        f = a.domain !== "" ? a.domain : "",
        g = a.port !== "" ? ":" + a.port : "",
        h =
          a.path !== ""
            ? a.path
            : (e !== "" && e !== "mailto:") || f !== "" || g !== ""
            ? "/"
            : "";
      c = z(
        f,
        a.originalRawQuery,
        a.queryParams,
        b,
        c,
        (b = d) != null ? b : a.serializer
      );
      d = c.length > 0 ? "?" : "";
      b = a.fragment !== "" ? "#" + a.fragment : "";
      a = a.fragment === "" && a.fragmentSeparator ? "#" : "";
      return "" + e + f + g + h + d + c + a + b;
    }
    function z(a, b, c, d, e, f) {
      e === void 0 && (e = !1);
      if (!d && (e || u(a))) {
        return (d = b) != null ? d : "";
      }
      return s(c, f);
    }
    function A(a) {
      var b = a.trim();
      b = (h || (h = d("URIRFC3986"))).parse(b) || {
        fragment: null,
        host: null,
        isGenericURI: !1,
        query: null,
        scheme: null,
        userinfo: null,
      };
      var c = b.host || "",
        e = c.split(".");
      e = e.length >= 3 ? e[0] : "";
      var f = t(c, b.scheme || "", b.query),
        g = f.deserialize(b.query || "") || {};
      g = new Map(Object.entries(g));
      g = B(
        {
          domain: c,
          fragment: b.fragment || "",
          fragmentSeparator: b.fragment === "",
          isGeneric: b.isGenericURI,
          originalRawQuery: b.query,
          path: b.path || "",
          port: b.port != null ? String(b.port) : "",
          protocol: (b.scheme || "").toLowerCase(),
          queryParams: g,
          serializer: f,
          subdomain: e,
          userInfo: (c = b == null ? void 0 : b.userinfo) != null ? c : "",
        },
        a
      );
      return g;
    }
    function B(a, b, c, e) {
      c === void 0 &&
        (c = (j || (j = d("URISchemes"))).Options.INCLUDE_DEFAULTS);
      var f = {
          components: babelHelpers["extends"]({}, a),
          error: "",
          valid: !0,
        },
        g = f.components;
      if (!(j || (j = d("URISchemes"))).isAllowed(a.protocol, c, e)) {
        f.valid = !1;
        f.error =
          'The URI protocol "' + String(a.protocol) + '" is not allowed.';
        return f;
      }
      if (!w(a.domain || "")) {
        f.valid = !1;
        f.error = "This is an unsafe domain " + String(a.domain);
        return f;
      }
      g.port = (a.port != null && String(a.port)) || "";
      if (Boolean(a.userInfo)) {
        f.valid = !1;
        f.error =
          "Invalid URI: (userinfo is not allowed in a URI " +
          String(a.userInfo) +
          ")";
        return f;
      }
      c = b != null && b !== "" ? b : y(g, !1);
      if (g.domain === "" && g.path.indexOf("\\") !== -1) {
        f.valid = !1;
        f.error =
          "Invalid URI: (no domain but multiple back-slashes " + c + ")";
        return f;
      }
      if (!g.protocol && n.test(c)) {
        f.valid = !1;
        f.error = "Invalid URI: (unsafe protocol-relative URI " + c + ")";
        return f;
      }
      if (g.domain !== "" && g.path !== "" && !g.path.startsWith("/")) {
        f.valid = !1;
        f.error =
          "Invalid URI: (domain and pathwhere path lacks leading slash " +
          c +
          ")";
        return f;
      }
      return f;
    }
    var C = (function () {
      function a(a) {
        (this.queryParams = new Map()),
          (this.domain = a.domain),
          (this.fragment = a.fragment),
          (this.fragmentSeparator = Boolean(a.fragmentSeparator)),
          (this.isGenericProtocol = Boolean(a.isGeneric)),
          (this.path = a.path),
          (this.originalRawQuery = a.originalRawQuery),
          (this.port = a.port),
          (this.protocol = a.protocol),
          (this.queryParams = a.queryParams),
          (this.serializer = a.serializer),
          (this.subdomain = a.subdomain);
      }
      var b = a.prototype;
      b.addQueryParam = function (a, b) {
        if (Boolean(a)) {
          var c = this.getQueryParams();
          c.set(a, b);
          return x(this, { queryParams: c });
        }
        return this;
      };
      b.addQueryParams = function (a) {
        if (a.size > 0) {
          var b = this.getQueryParams();
          a.forEach(function (a, c) {
            b.set(c, a);
          });
          return x(this, { queryParams: b });
        }
        return this;
      };
      b.addQueryParamString = function (a) {
        if (Boolean(a)) {
          a = a.startsWith("?") ? a.slice(1) : a;
          var b = this.getQueryParams();
          a.split("&").map(function (a) {
            a = a.split("=");
            var c = a[0];
            a = a[1];
            b.set(c, a);
          });
          return x(this, { queryParams: b });
        }
        return this;
      };
      b.addTrailingSlash = function () {
        var a = this.getPath();
        return a.length > 0 && a[a.length - 1] !== "/"
          ? this.setPath(a + "/")
          : this;
      };
      b.getDomain = function () {
        return this.domain;
      };
      b.getFragment = function () {
        return this.fragment;
      };
      b.getOrigin = function () {
        var a = this.getPort();
        return (
          this.getProtocol() + "://" + this.getDomain() + (a ? ":" + a : "")
        );
      };
      b.getOriginalRawQuery = function () {
        return this.originalRawQuery;
      };
      b.getPath = function () {
        return this.path;
      };
      b.getPort = function () {
        return this.port;
      };
      b.getProtocol = function () {
        return this.protocol.toLowerCase();
      };
      b.getQualifiedUri = function () {
        if (!this.getDomain()) {
          var b = (typeof window !== "undefined" ? window : self).location.href;
          (i || (i = c("ExecutionEnvironment"))).isInWorker &&
            b &&
            b.startsWith("blob:") &&
            (b = b.substring(5, b.length));
          b = b.slice(0, b.indexOf("/", b.indexOf(":") + 3));
          return a.getUri(b + this.toString());
        }
        return this;
      };
      b.getQueryParam = function (a) {
        a = this.queryParams.get(a);
        if (typeof a === "string") return a;
        else {
          a = JSON.stringify(a);
          return a == null ? a : JSON.parse(a);
        }
      };
      b.getQueryData = function () {
        return Object.fromEntries(this.getQueryParams());
      };
      b.getQueryParams = function () {
        if (c("structuredClone") != null)
          return c("structuredClone")(this.queryParams);
        var a = JSON.stringify(Array.from(this.queryParams), function (a, b) {
          return Array.isArray(b)
            ? { __CUUArr: !0, value: babelHelpers["extends"]({}, b) }
            : b;
        });
        a = JSON.parse(a, function (a, b) {
          return b != null && typeof b === "object" && b.__CUUArr
            ? Object.keys(b.value).reduce(function (a, c) {
                a[c] = b.value[c];
                return a;
              }, [])
            : b;
        });
        return new Map(a);
      };
      b.getQueryString = function (a) {
        a === void 0 && (a = !1);
        return z(
          this.domain,
          this.originalRawQuery,
          this.queryParams,
          !1,
          a,
          this.serializer
        );
      };
      b.getRegisteredDomain = function () {
        if (!this.getDomain()) return "";
        if (!this.isFacebookUri()) return null;
        var a = this.getDomain().split("."),
          b = a.indexOf("facebook");
        b === -1 && (b = a.indexOf("workplace"));
        return a.slice(b).join(".");
      };
      b.getSerializer = function () {
        return this.serializer;
      };
      b.getSubdomain = function () {
        return this.subdomain;
      };
      b.getUnqualifiedUri = function () {
        if (this.getDomain()) {
          var b = this.toString();
          return a.getUri(b.slice(b.indexOf("/", b.indexOf(":") + 3)));
        }
        return this;
      };
      a.getUri = function (b) {
        b = b.trim();
        var d = l.get(b);
        if (d == null) {
          var e = A(b);
          if (e.valid) (d = new a(e.components)), l.set(b, d);
          else {
            c("FBLogger")("ConstUriUtils").blameToPreviousFrame().warn(e.error);
            return null;
          }
        }
        return d;
      };
      a.getUribyObject = function (b, d) {
        var e = y(b, d),
          f = l.get(e);
        if (f == null) {
          d && (b.originalRawQuery = s(b.queryParams, b.serializer));
          d = B(b);
          if (d.valid) (f = new a(d.components)), l.set(e, f);
          else {
            c("recoverableViolation")(d.error, "ConstUri");
            return null;
          }
        }
        return f;
      };
      b.hasFragmentSeparator = function () {
        return this.fragmentSeparator;
      };
      b.isEmpty = function () {
        return !(
          this.getPath() ||
          this.getProtocol() ||
          this.getDomain() ||
          this.getPort() ||
          this.queryParams.size > 0 ||
          this.getFragment()
        );
      };
      b.isFacebookUri = function () {
        var a = this.toString();
        if (a === "") return !1;
        return !this.getDomain() && !this.getProtocol()
          ? !0
          : ["https", "http"].indexOf(this.getProtocol()) !== -1 &&
              m.test(this.getDomain());
      };
      b.isGeneric = function () {
        return this.isGenericProtocol;
      };
      b.isSameOrigin = function (a) {
        return c("isSameOrigin")(this, a);
      };
      b.isSubdomainOfDomain = function (b) {
        var c = a.getUri(b);
        return c != null && v(this.domain, b);
      };
      b.isSecure = function () {
        return this.getProtocol() === "https";
      };
      b.removeQueryParams = function (a) {
        if (Array.isArray(a) && a.length > 0) {
          var b = this.getQueryParams();
          a.map(function (a) {
            return b["delete"](a);
          });
          return x(this, { queryParams: b });
        }
        return this;
      };
      b.removeQueryParam = function (a) {
        if (Boolean(a)) {
          var b = this.getQueryParams();
          b["delete"](a);
          return x(this, { queryParams: b });
        }
        return this;
      };
      b.replaceQueryParam = function (a, b) {
        if (Boolean(a)) {
          var c = this.getQueryParams();
          c.set(a, b);
          return x(this, { queryParams: c });
        }
        return this;
      };
      b.replaceQueryParams = function (a) {
        return x(this, { queryParams: a });
      };
      b.replaceQueryParamString = function (a) {
        if (a != null) {
          a = a.startsWith("?") ? a.slice(1) : a;
          var b = this.getQueryParams();
          a.split("&").map(function (a) {
            a = a.split("=");
            var c = a[0];
            a = a[1];
            b.set(c, a);
          });
          return x(this, { queryParams: b });
        }
        return this;
      };
      b.setDomain = function (a) {
        if (Boolean(a)) {
          var b = a.split(".");
          b = b.length >= 3 ? b[0] : "";
          return x(this, { domain: a, subdomain: b });
        }
        return this;
      };
      b.setFragment = function (a) {
        return a === "#"
          ? x(this, { fragment: "", fragmentSeparator: !0 })
          : x(this, { fragment: a, fragmentSeparator: a !== "" });
      };
      b.setPath = function (a) {
        return a != null ? x(this, { path: a }) : this;
      };
      b.setPort = function (a) {
        return Boolean(a) ? x(this, { port: a }) : this;
      };
      b.setProtocol = function (a) {
        return Boolean(a) ? x(this, { protocol: a }) : this;
      };
      b.setSecure = function (a) {
        return this.setProtocol(a ? "https" : "http");
      };
      b.setSubDomain = function (a) {
        if (Boolean(a)) {
          var b = this.domain.split(".");
          b.length >= 3 ? (b[0] = a) : b.unshift(a);
          return x(this, { domain: b.join("."), subdomain: a });
        }
        return this;
      };
      b.stripTrailingSlash = function () {
        return this.setPath(this.getPath().replace(/\/$/, ""));
      };
      a.$1 = function (a) {
        a = a;
        for (var b = 0; b < q.length; b++) {
          var c = q[b];
          a = c(a);
        }
        return a;
      };
      a.$2 = function (a, b) {
        b = b;
        for (var c = 0; c < r.length; c++) {
          var d = r[c];
          b = d(a, b);
        }
        return b;
      };
      b.$3 = function (b, c) {
        c === void 0 && (c = !1);
        return y(
          {
            domain: a.$1(this.domain),
            fragment: this.fragment,
            fragmentSeparator: this.fragmentSeparator,
            isGeneric: this.isGenericProtocol,
            originalRawQuery: this.originalRawQuery,
            path: this.path,
            port: this.port,
            protocol: this.protocol,
            queryParams: a.$2(this.domain, this.queryParams),
            serializer: b,
            subdomain: this.subdomain,
            userInfo: "",
          },
          !1,
          c
        );
      };
      b.toStringRawQuery = function () {
        this.rawStringValue == null &&
          (this.rawStringValue = this.$3(c("PHPQuerySerializerNoEncoding")));
        return this.rawStringValue;
      };
      b.toString = function () {
        this.stringValue == null &&
          (this.stringValue = this.$3(this.serializer));
        return this.stringValue;
      };
      b.toStringPreserveQuery = function () {
        return this.$3(this.serializer, !0);
      };
      a.isValidUri = function (b) {
        var c = l.get(b);
        if (c != null) return !0;
        c = A(b);
        if (c.valid) {
          l.set(b, new a(c.components));
          return !0;
        }
        return !1;
      };
      return a;
    })();
    function a(a) {
      if (a instanceof C) return a;
      else return null;
    }
    function b(a) {
      q.push(a);
    }
    function e(a) {
      r.push(a);
    }
    f = C.getUri;
    var D = C.isValidUri;
    g.isSubdomainOfDomain = v;
    g.isConstUri = a;
    g.registerDomainFilter = b;
    g.registerQueryParamsFilter = e;
    g.getUri = f;
    g.isValidUri = D;
  },
  98
);
__d(
  "EventListener",
  ["cr:1353359"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:1353359");
  },
  98
);
__d(
  "cancelIdleCallbackWWW",
  ["cr:692209"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:692209");
  },
  98
);
__d(
  "QueryString",
  [],
  function (a, b, c, d, e, f) {
    function g(a) {
      var b = [];
      Object.keys(a)
        .sort()
        .forEach(function (c) {
          var d = a[c];
          if (d === void 0) return;
          if (d === null) {
            b.push(c);
            return;
          }
          b.push(encodeURIComponent(c) + "=" + encodeURIComponent(String(d)));
        });
      return b.join("&");
    }
    function a(a, b) {
      b === void 0 && (b = !1);
      var c = {};
      if (a === "") return c;
      a = a.split("&");
      for (var d = 0; d < a.length; d++) {
        var e = a[d].split("=", 2),
          f = decodeURIComponent(e[0]);
        if (b && Object.prototype.hasOwnProperty.call(c, f))
          throw new URIError("Duplicate key: " + f);
        c[f] = e.length === 2 ? decodeURIComponent(e[1]) : null;
      }
      return c;
    }
    function b(a, b) {
      return (
        a +
        (a.indexOf("?") !== -1 ? "&" : "?") +
        (typeof b === "string" ? b : g(b))
      );
    }
    c = { encode: g, decode: a, appendToUrl: b };
    f["default"] = c;
  },
  66
);
__d(
  "IdleCallbackImplementation",
  ["performanceNow", "requestAnimationFramePolyfill"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = [],
      j = 0,
      k = 0,
      l = -1,
      m = !1,
      n = 1e3 / 60,
      o = 2;
    function p(a) {
      return a;
    }
    function q(a) {
      return a;
    }
    function b(b, c) {
      var d = k++;
      i[d] = b;
      s();
      if (c != null && c.timeout > 0) {
        var e = p(d);
        a.setTimeout(function () {
          return y(e);
        }, c.timeout);
      }
      return p(d);
    }
    function r(a) {
      a = q(a);
      i[a] = null;
    }
    function s() {
      m ||
        ((m = !0),
        c("requestAnimationFramePolyfill")(function (a) {
          (m = !1), u((h || (h = c("performanceNow")))() - a);
        }));
    }
    function t(a) {
      var b = n - o;
      if (a < b) return b - a;
      a = a % n;
      if (a > b || a < o) return 0;
      else return b - a;
    }
    function u(a) {
      var b = (h || (h = c("performanceNow")))();
      if (b > l) {
        a = t(a);
        if (a > 0) {
          b = b + a;
          x(b);
          l = b;
        }
      }
      v() && s();
    }
    function v() {
      return j < i.length;
    }
    function w() {
      while (v()) {
        var a = i[j];
        j++;
        if (a) return a;
      }
      return null;
    }
    function x(a) {
      var b;
      while ((h || (h = c("performanceNow")))() < a && (b = w())) b(new z(a));
    }
    function y(a) {
      var b = q(a);
      b = i[b];
      b && (r(a), b(new z(null)));
    }
    var z = (function () {
      function a(a) {
        (this.didTimeout = a == null), (this.$1 = a);
      }
      var b = a.prototype;
      b.timeRemaining = function () {
        var a = this.$1;
        if (a != null) {
          var b = (h || (h = c("performanceNow")))();
          if (b < a) return a - b;
        }
        return 0;
      };
      return a;
    })();
    g.requestIdleCallback = b;
    g.cancelIdleCallback = r;
  },
  98
);
__d(
  "CurrentUser",
  ["Cookie", "CurrentUserInitialData"],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        getID: function () {
          return (g || (g = b("CurrentUserInitialData"))).USER_ID;
        },
        getAccountID: function () {
          return (g || (g = b("CurrentUserInitialData"))).ACCOUNT_ID;
        },
        getPossiblyNonFacebookUserID: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData")))
            .NON_FACEBOOK_USER_ID) != null
            ? a
            : this.getID();
        },
        getEIMU: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData"))).IG_USER_EIMU) !=
            null
            ? a
            : "0";
        },
        getEmployeeWorkUserID: function () {
          return (g || (g = b("CurrentUserInitialData"))).WORK_USER_ID;
        },
        getName: function () {
          return (g || (g = b("CurrentUserInitialData"))).NAME;
        },
        getShortName: function () {
          return (g || (g = b("CurrentUserInitialData"))).SHORT_NAME;
        },
        getEPOU: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData"))).EPOU_ID) != null
            ? a
            : "0";
        },
        getEOCPU: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData"))).EOCPU_ID) != null
            ? a
            : "0";
        },
        isLoggedIn: function () {
          return h.getPossiblyNonFacebookUserID() !== "0";
        },
        isLoggedInNow: function () {
          var a;
          if (!h.isLoggedIn()) return !1;
          if ((g || (g = b("CurrentUserInitialData"))).IS_INTERN_SITE)
            return !0;
          if (
            (g || (g = b("CurrentUserInitialData"))).IS_WORK_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_WORKROOMS_USER ||
            (g || (g = b("CurrentUserInitialData")))
              .IS_WORK_MESSENGER_CALL_GUEST_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_TOGETHER_APP_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_ENTERPRISE_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_INSTAGRAM_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_META_SPARK_USER
          )
            return !0;
          if (
            (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID != null &&
            (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID != ""
          )
            return (
              (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID ===
              b("Cookie").get("c_user")
            );
          return (g || (g = b("CurrentUserInitialData"))).IS_BUSINESS_DOMAIN ===
            !0
            ? (g || (g = b("CurrentUserInitialData"))).USER_ID ==
                b("Cookie").get("c_user")
            : (g || (g = b("CurrentUserInitialData"))).USER_ID ===
                ((a = b("Cookie").get("i_user")) != null
                  ? a
                  : b("Cookie").get("c_user"));
        },
        isEmployee: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_EMPLOYEE;
        },
        isTestUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_TEST_USER;
        },
        hasWorkUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).HAS_WORK_USER;
        },
        isWorkUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_WORK_USER;
        },
        isWorkroomsUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_WORKROOMS_USER;
        },
        isGray: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_GRAY;
        },
        isUnderage: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_UNDERAGE;
        },
        isMessengerOnlyUser: function () {
          return !!(g || (g = b("CurrentUserInitialData")))
            .IS_MESSENGER_ONLY_USER;
        },
        isDeactivatedAllowedOnMessenger: function () {
          return !!(g || (g = b("CurrentUserInitialData")))
            .IS_DEACTIVATED_ALLOWED_ON_MESSENGER;
        },
        isMessengerCallGuestUser: function () {
          return !!(g || (g = b("CurrentUserInitialData")))
            .IS_MESSENGER_CALL_GUEST_USER;
        },
        isBusinessPersonAccount: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .IS_BUSINESS_PERSON_ACCOUNT;
        },
        hasSecondaryBusinessPerson: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .HAS_SECONDARY_BUSINESS_PERSON;
        },
        getAppID: function () {
          return (g || (g = b("CurrentUserInitialData"))).APP_ID;
        },
        isFacebookWorkAccount: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .IS_FACEBOOK_WORK_ACCOUNT;
        },
        getPageMessagingMailboxId: function () {
          var a;
          return String(
            (a = (g || (g = b("CurrentUserInitialData")))
              .PAGE_MESSAGING_MAILBOX_ID) != null
              ? a
              : "0"
          );
        },
      };
    e.exports = h;
  },
  null
);
__d(
  "InlineFbtResultImpl",
  ["cx", "FbtHooks", "FbtReactUtil", "FbtResultBase"],
  function (a, b, c, d, e, f, g, h) {
    var i;
    function j(a, b, c, e) {
      var f = "_4qba";
      e != null &&
        e != "" &&
        (b === "TRANSLATION"
          ? (f = "_4qbb")
          : b === "APPROVE"
          ? (f = "_4qbc")
          : b === "REPORT" && (f = "_4qbd"));
      return {
        $$typeof: d("FbtReactUtil").REACT_ELEMENT_TYPE,
        type: "em",
        key: null,
        ref: null,
        props: {
          className: f,
          "data-intl-hash": e,
          "data-intl-translation": c,
          "data-intl-trid": "",
          children: a,
          suppressHydrationWarning: !0,
        },
        _owner: null,
      };
    }
    var k = function (a) {
      return j(a.content, a.inlineMode, a.translation, a.hash);
    };
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, e, f, g) {
        var h;
        h =
          a.call(
            this,
            b,
            (i || (i = c("FbtHooks"))).getErrorListener({
              translation: f,
              hash: g,
            })
          ) || this;
        h.$$typeof = d("FbtReactUtil").REACT_ELEMENT_TYPE;
        h.key = null;
        h.ref = null;
        h.type = k;
        h.props = { content: b, inlineMode: e, translation: f, hash: g };
        return h;
      }
      return b;
    })(c("FbtResultBase"));
    g["default"] = a;
  },
  98
);
__d(
  "IntlCLDRNumberType05",
  ["IntlVariations"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = {
      getVariation: function (a) {
        if (a === 1) return c("IntlVariations").NUMBER_ONE;
        else return c("IntlVariations").NUMBER_OTHER;
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "cancelAnimationFramePolyfill",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b =
      a.__fbNativeCancelAnimationFrame ||
      a.cancelAnimationFrame ||
      a.webkitCancelAnimationFrame ||
      a.mozCancelAnimationFrame ||
      a.oCancelAnimationFrame ||
      a.msCancelAnimationFrame ||
      a.clearTimeout;
    c = b;
    f["default"] = c;
  },
  66
);
__d(
  "cancelAnimationFrame",
  ["cancelAnimationFramePolyfill"],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      c("cancelAnimationFramePolyfill")(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "cancelIdleCallback",
  ["cr:7384"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:7384");
  },
  98
);
__d(
  "cancelIdleCallbackBlue",
  ["IdleCallbackImplementation"],
  function (a, b, c, d, e, f, g) {
    var h =
      (c = a.cancelIdleCallback) != null
        ? c
        : d("IdleCallbackImplementation").cancelIdleCallback;
    function b(a) {
      h(a);
    }
    g["default"] = b;
  },
  98
);
__d(
  "requestIdleCallbackAcrossTransitions",
  ["IdleCallbackImplementation", "TimeSlice"],
  function (a, b, c, d, e, f, g) {
    var h =
      a.requestIdleCallback ||
      d("IdleCallbackImplementation").requestIdleCallback;
    function b(b, d) {
      b = c("TimeSlice").guard(b, "requestIdleCallback", {
        propagationType: c("TimeSlice").PropagationType.CONTINUATION,
        registerCallStack: !0,
      });
      return h.call(a, b, d);
    }
    g["default"] = b;
  },
  98
);
__d(
  "BanzaiConsts",
  [],
  function (a, b, c, d, e, f) {
    a = {
      SEND: "Banzai:SEND",
      OK: "Banzai:OK",
      ERROR: "Banzai:ERROR",
      SHUTDOWN: "Banzai:SHUTDOWN",
      BASIC: "basic",
      VITAL: "vital",
      BASIC_WAIT: 6e4,
      BASIC_WAIT_COMET: 2e3,
      VITAL_WAIT: 1e3,
      BATCH_SIZE_LIMIT: 64e3,
      EXPIRY: 864e5,
      BATCH_TIMEOUT: 1e4,
      LAST_STORAGE_FLUSH: "banzai:last_storage_flush",
      STORAGE_FLUSH_INTERVAL: 12 * 60 * 6e4,
      POST_READY: 0,
      POST_INFLIGHT: 1,
      POST_SENT: 2,
    };
    b = a;
    f["default"] = b;
  },
  66
);
__d(
  "once",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = g(a);
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
      return b;
    }
    function g(a) {
      var b = a,
        c;
      a = function () {
        if (b) {
          for (var a = arguments.length, d = new Array(a), e = 0; e < a; e++)
            d[e] = arguments[e];
          c = b.apply(this, d);
          b = null;
        }
        return c;
      };
      return a;
    }
    f["default"] = a;
  },
  66
);
