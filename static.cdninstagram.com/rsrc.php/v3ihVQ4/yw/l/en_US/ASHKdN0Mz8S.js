/*FB_PKG_DELIM*/

__d(
  "isAdsExcelAddinURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)fbaddins\\.com$", "i"),
      h = ["https"];
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
  "isValidAsyncSignalURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp(
        "((^|\\.)instagram\\.com$)|((^|\\.)wit\\.ai$)|((^|\\.)accountkit\\.com$)",
        "i"
      ),
      h = ["https"];
    function a(a) {
      if (a.isEmpty() && a.toString() !== "#") return !1;
      return !a.getDomain() && !a.getProtocol()
        ? !1
        : h.includes(a.getProtocol()) && g.test(a.getDomain());
    }
    f["default"] = a;
  },
  66
);
__d(
  "AsyncSignal",
  [
    "ErrorGuard",
    "Promise",
    "QueryString",
    "Run",
    "TimeSlice",
    "TrackingConfig",
    "URI",
    "ZeroRewrites",
    "getAsyncParams",
    "isAdsExcelAddinURI",
    "isFacebookURI",
    "isMessengerDotComURI",
    "isValidAsyncSignalURI",
    "isWorkplaceDotComURI",
    "memoize",
    "promiseDone",
  ],
  function (a, b, c, d, e, f) {
    var g, h, i, j;
    function a(a, c) {
      (this.data = c || {}),
        (this.uri = a.toString()),
        b("TrackingConfig").domain &&
          this.uri.charAt(0) == "/" &&
          (this.uri = b("TrackingConfig").domain + this.uri);
    }
    a.prototype.setHandler = function (a) {
      this.handler = a;
      return this;
    };
    a.prototype.setTimeout = function (a) {
      this.timeout = a;
      return this;
    };
    a.prototype.send = function () {
      b("TimeSlice").guard(this._send.bind(this), "AsyncSignal send", {
        propagationType: b("TimeSlice").PropagationType.ORPHAN,
      })();
    };
    a.prototype._send = function () {
      var a = this.handler,
        c = this.data;
      c.asyncSignal = ((Math.random() * 1e4) | 0) + 1;
      var d = b("ZeroRewrites").rewriteURI(new (g || (g = b("URI")))(this.uri));
      d =
        b("isFacebookURI")(d) ||
        b("isMessengerDotComURI")(d) ||
        b("isAdsExcelAddinURI")(d) ||
        b("isWorkplaceDotComURI")(d) ||
        b("isValidAsyncSignalURI")(d);
      if (d) Object.assign(c, b("getAsyncParams")("POST"));
      else
        throw new Error(
          "'" +
            this.uri +
            "' is an external URL, you should not send async signals to offsite links."
        );
      var e = b("QueryString").appendToUrl(this.uri, c);
      j ||
        (j = new (h || (h = b("Promise")))(function (a) {
          b("Run").onAfterLoad(a);
        }));
      d = j.then(function () {
        return new (h || (h = b("Promise")))(function (a, b) {
          var c = new Image();
          c.onload = a;
          c.onerror = c.onabort = b;
          c.src = e;
        });
      });
      if (a) {
        var f = !1,
          k = b("memoize")(function () {
            (i || (i = b("ErrorGuard"))).applyWithGuard(a, null, [f]);
          });
        b("promiseDone")(
          d.then(function () {
            (f = !0), k();
          }, k)
        );
        this.timeout && setTimeout(k, this.timeout);
      }
      return this;
    };
    e.exports = a;
  },
  null
);
__d(
  "DetectBrokenProxyCache",
  ["AsyncSignal", "Cookie", "URI"],
  function (a, b, c, d, e, f, g) {
    var h;
    function a(a, b) {
      var d = c("Cookie").get(b);
      if (d != a && d != null && a != "0") {
        b = { c: "si_detect_broken_proxy_cache", m: b + " " + a + " " + d };
        a = new (h || (h = c("URI")))("/platform/scribe_endpoint.php")
          .getQualifiedURI()
          .toString();
        new (c("AsyncSignal"))(a, b).send();
      }
    }
    g.run = a;
  },
  98
);
__d(
  "EventListenerImplForCacheStorage",
  ["CometEventListener"],
  function (a, b, c, d, e, f) {
    "use strict";
    f["default"] = b("CometEventListener");
  },
  66
);
__d(
  "CacheStorage",
  [
    "ErrorGuard",
    "EventListenerImplForCacheStorage",
    "ExecutionEnvironment",
    "FBJSON",
    "WebStorage",
    "emptyFunction",
    "err",
    "killswitch",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j,
      k = "_@_",
      l = "3b",
      m = "CacheStorageVersion",
      n = {
        length: 0,
        getItem: (a = c("emptyFunction")),
        setItem: a,
        clear: a,
        removeItem: a,
        key: a,
      };
    b = (function () {
      function a(a) {
        this._store = a;
      }
      var b = a.prototype;
      b.getStore = function () {
        return this._store;
      };
      b.keys = function () {
        var a = [];
        for (var b = 0; b < this._store.length; b++) {
          var c = this._store.key(b);
          c != null && a.push(c);
        }
        return a;
      };
      b.get = function (a) {
        return this._store.getItem(a);
      };
      b.set = function (a, b) {
        this._store.setItem(a, b);
      };
      b.remove = function (a) {
        this._store.removeItem(a);
      };
      b.clear = function () {
        this._store.clear();
      };
      b.clearWithPrefix = function (a) {
        a = a || "";
        var b = this.keys();
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d != null && d.startsWith(a) && this.remove(d);
        }
      };
      return a;
    })();
    e = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b;
        return (
          a.call(
            this,
            (b = (h || (h = c("WebStorage"))).getLocalStorage()) != null ? b : n
          ) || this
        );
      }
      b.available = function () {
        return !!(h || (h = c("WebStorage"))).getLocalStorage();
      };
      return b;
    })(b);
    g = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b;
        return (
          a.call(
            this,
            (b = (h || (h = c("WebStorage"))).getSessionStorage()) != null
              ? b
              : n
          ) || this
        );
      }
      b.available = function () {
        return !!(h || (h = c("WebStorage"))).getSessionStorage();
      };
      return b;
    })(b);
    var o = (function () {
        function a() {
          this._store = {};
        }
        var b = a.prototype;
        b.getStore = function () {
          return this._store;
        };
        b.keys = function () {
          return Object.keys(this._store);
        };
        b.get = function (a) {
          return this._store[a] === void 0 ? null : this._store[a];
        };
        b.set = function (a, b) {
          this._store[a] = b;
        };
        b.remove = function (a) {
          a in this._store && delete this._store[a];
        };
        b.clear = function () {
          this._store = {};
        };
        b.clearWithPrefix = function (a) {
          a = a || "";
          var b = this.keys();
          for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.startsWith(a) && this.remove(d);
          }
        };
        a.available = function () {
          return !0;
        };
        return a;
      })(),
      p = { memory: o, localstorage: e, sessionstorage: g };
    a = (function () {
      function a(a, b) {
        this._changeCallbacks = [];
        this._key_prefix = "_cs_";
        this._exception = null;
        b && (this._key_prefix = b);
        a === "AUTO" || !a ? (b = "memory") : (b = a);
        b &&
          (!p[b] || !p[b].available()
            ? ((i || (i = c("ExecutionEnvironment"))).canUseDOM,
              (this._backend = new o()))
            : (this._backend = new p[b]()));
        a = this.useBrowserStorage();
        a &&
          c("EventListenerImplForCacheStorage").listen(
            window,
            "storage",
            this._onBrowserValueChanged.bind(this)
          );
        b = a
          ? this._backend.getStore().getItem(m)
          : this._backend.getStore()[m];
        b !== l &&
          (c("killswitch")("CACHE_STORAGE_MODULE_CLEAR_OWN_KEYS")
            ? this.clear()
            : this.clearOwnKeys());
      }
      var b = a.prototype;
      b.useBrowserStorage = function () {
        return (
          this._backend.getStore() ===
            (h || (h = c("WebStorage"))).getLocalStorage() ||
          this._backend.getStore() ===
            (h || (h = c("WebStorage"))).getSessionStorage()
        );
      };
      b.addValueChangeCallback = function (a) {
        var b = this;
        this._changeCallbacks.push(a);
        return {
          remove: function () {
            b._changeCallbacks.slice(b._changeCallbacks.indexOf(a), 1);
          },
        };
      };
      b._onBrowserValueChanged = function (a) {
        this._changeCallbacks &&
          String(a.key).startsWith(this._key_prefix) &&
          this._changeCallbacks.forEach(function (b) {
            b(a.key, a.oldValue, a.newValue);
          });
      };
      b.keys = function () {
        var a = this,
          b = [];
        (j || (j = c("ErrorGuard"))).guard(
          function () {
            if (a._backend) {
              var c = a._backend.keys(),
                d = a._key_prefix.length;
              for (var e = 0; e < c.length; e++)
                c[e].substr(0, d) == a._key_prefix && b.push(c[e].substr(d));
            }
          },
          { name: "CacheStorage" }
        )();
        return b;
      };
      b.set = function (b, e, f) {
        if (this._backend) {
          if (this.useBrowserStorage() && a._persistentWritesDisabled) {
            this._exception = c("err")("writes disabled");
            return !1;
          }
          var g;
          typeof e === "string"
            ? (g = k + e)
            : !f
            ? ((g = { __t: Date.now(), __v: e }),
              (g = d("FBJSON").stringify(g)))
            : (g = d("FBJSON").stringify(e));
          f = this._backend;
          e = this._key_prefix + b;
          b = !0;
          var h = null;
          while (b)
            try {
              (h = null), f.set(e, g), (b = !1);
            } catch (a) {
              h = a;
              var i = f.keys().length;
              this._evictCacheEntries();
              b = f.keys().length < i;
            }
          if (h !== null) {
            this._exception = h;
            return !1;
          } else {
            this._exception = null;
            return !0;
          }
        }
        this._exception = c("err")("no back end");
        return !1;
      };
      b.getLastSetExceptionMessage = function () {
        return this._exception ? this._exception.message : null;
      };
      b.getLastSetException = function () {
        return this._exception;
      };
      b.getStorageKeyCount = function () {
        var a = this._backend;
        return a ? a.keys().length : 0;
      };
      b._evictCacheEntries = function () {
        var b = [],
          c = this._backend;
        c.keys().forEach(function (e) {
          if (e === m) return;
          var g = c.get(e);
          if (g === void 0) {
            c.remove(e);
            return;
          }
          if (a._hasMagicPrefix(g)) return;
          try {
            g = d("FBJSON").parse(g, f.id);
          } catch (a) {
            c.remove(e);
            return;
          }
          g && g.__t !== void 0 && g.__v !== void 0 && b.push([e, g.__t]);
        });
        b.sort(function (a, b) {
          return a[1] - b[1];
        });
        for (var e = 0; e < Math.ceil(b.length / 2); e++) c.remove(b[e][0]);
      };
      b.get = function (b, e) {
        var g;
        if (this._backend) {
          (j || (j = c("ErrorGuard"))).applyWithGuard(
            function () {
              g = this._backend.get(this._key_prefix + b);
            },
            this,
            [],
            {
              onError: function () {
                g = null;
              },
              name: "CacheStorage:get",
            }
          );
          if (g != null)
            if (a._hasMagicPrefix(g)) g = g.substr(k.length);
            else
              try {
                (g = d("FBJSON").parse(g, f.id)),
                  g && g.__t !== void 0 && g.__v !== void 0 && (g = g.__v);
              } catch (a) {
                g = void 0;
              }
          else g = void 0;
        }
        g === void 0 && e !== void 0 && ((g = e), this.set(b, g));
        return g;
      };
      b.remove = function (a) {
        this._backend &&
          (j || (j = c("ErrorGuard"))).applyWithGuard(
            this._backend.remove,
            this._backend,
            [this._key_prefix + a],
            { name: "CacheStorage:remove" }
          );
      };
      b._setVersion = function () {
        var a = this;
        (j || (j = c("ErrorGuard"))).applyWithGuard(
          function () {
            a.useBrowserStorage()
              ? a._backend.getStore().setItem(m, l)
              : (a._backend.getStore()[m] = l);
          },
          this,
          [],
          { name: "CacheStorage:setVersion" }
        );
      };
      b.clear = function () {
        this._backend &&
          ((j || (j = c("ErrorGuard"))).applyWithGuard(
            this._backend.clear,
            this._backend,
            [],
            { name: "CacheStorage:clear" }
          ),
          this._setVersion());
      };
      b.clearOwnKeys = function () {
        this._backend &&
          ((j || (j = c("ErrorGuard"))).applyWithGuard(
            this._backend.clearWithPrefix,
            this._backend,
            [this._key_prefix],
            { name: "CacheStorage:clearOwnKeys" }
          ),
          this._setVersion());
      };
      a.getAllStorageTypes = function () {
        return Object.keys(p);
      };
      a._hasMagicPrefix = function (a) {
        return a.substr(0, k.length) === k;
      };
      a.disablePersistentWrites = function () {
        a._persistentWritesDisabled = !0;
      };
      return a;
    })();
    a._persistentWritesDisabled = !1;
    f.exports = a;
  },
  34
);
__d(
  "StringTransformations",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = {
      unicodeEscape: function (a) {
        return a.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g, function (a) {
          a = a.charCodeAt(0).toString(16);
          return "\\u" + ("0000" + a.toUpperCase()).slice(-4);
        });
      },
      unicodeUnescape: function (a) {
        return a.replace(/(\\u[0-9A-Fa-f]{4})/g, function (a) {
          return String.fromCharCode(parseInt(a.slice(2), 16));
        });
      },
    };
    f["default"] = a;
  },
  66
);
__d(
  "WebStorageCleanupReason",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = null;
    function a() {
      return g;
    }
    function b(a) {
      g = a;
    }
    f.getLastCleanupReason = a;
    f.setLastCleanupReason = b;
  },
  66
);
__d(
  "WebStorageMonster",
  [
    "AsyncRequest",
    "CacheStorage",
    "Event",
    "ExecutionEnvironment",
    "NetworkStatus",
    "StringTransformations",
    "UserActivity",
    "WebStorage",
    "WebStorageCleanupReason",
    "WebStorageMonsterLoggingURI",
    "ifRequired",
    "isEmpty",
    "killswitch",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k = 1e4,
      l = 5,
      m = !1;
    function n(a) {
      var b = {};
      for (var d in a) {
        var e = a.getItem(d),
          f = c("StringTransformations").unicodeEscape(d);
        typeof e === "string" && (b[f] = e.length);
      }
      return b;
    }
    function o(a) {
      var b = (h || (h = c("WebStorage"))).getLocalStorage();
      if (!b || a == null || !a.keys) return;
      r._getLocalStorageKeys().forEach(function (c) {
        a.keys.includes(c) && b.removeItem(c);
      });
    }
    function p(a) {
      var b = (h || (h = c("WebStorage"))).getLocalStorage();
      b &&
        r._getLocalStorageKeys().forEach(function (c) {
          a.some(function (a) {
            return new RegExp(a).test(c);
          }) || b.removeItem(c);
        });
    }
    function q(a, b) {
      a === void 0 && (a = !1);
      b === void 0 && (b = k);
      if (c("UserActivity").isActive(b)) {
        var d = Math.max(k, Math.floor(b / l));
        c("setTimeoutAcrossTransitions")(function () {
          q(a, d);
        }, d);
      } else {
        r.cleanNow(a);
        var e = !c("killswitch")("WEB_STORAGE_MONSTER_DONT_RESCHEDULE_ON_RUN");
        if (e) {
          var f = b * l;
          c("setTimeoutAcrossTransitions")(function () {
            q(a, f);
          }, f);
        }
      }
    }
    var r = {
      registerLogoutForm: function (a, b) {
        c("Event").listen(a, "submit", function (a) {
          r.cleanOnLogout(b, "WebStorageMonster.registerLogoutForm");
        });
      },
      schedule: function (a) {
        a === void 0 && (a = !1);
        if (m || !(i || (i = c("ExecutionEnvironment"))).isInBrowser) return;
        m = !0;
        q(a);
      },
      cleanNow: function (a) {
        a === void 0 && (a = !1);
        var b = Date.now(),
          d = {},
          e = (h || (h = c("WebStorage"))).getLocalStorage();
        e && (d.local_storage = n(e));
        e = h.getSessionStorage();
        e && (d.session_storage = n(e));
        e = !(j || (j = c("isEmpty")))(d);
        var f = Date.now();
        d.logtime = f - b;
        if (e) {
          var g,
            i = c("WebStorageMonsterLoggingURI").uri;
          if (i === null) return null;
          var k = function () {
            new (c("AsyncRequest"))(i)
              .setData(d)
              .setHandler(function (b) {
                b = b.getPayload();
                b &&
                  b.keys &&
                  (b.keys = b.keys.map(
                    c("StringTransformations").unicodeUnescape
                  ));
                a || o(b);
                c("NetworkStatus").reportSuccess();
              })
              .setErrorHandler(function () {
                c("NetworkStatus").reportError();
              })
              .setOption("retries", 2)
              .send();
          };
          if (c("NetworkStatus").isOnline()) k();
          else {
            f = function (a) {
              a = a.online;
              a && (k(), g.remove());
            };
            g = c("NetworkStatus").onChange(f);
          }
        }
      },
      cleanOnLogout: function (a, b) {
        d("WebStorageCleanupReason").setLastCleanupReason(b);
        c("CacheStorage").disablePersistentWrites();
        c("ifRequired")("WebAsyncStorage", function (a) {
          a.disablePersistentWrites();
        });
        a ? p(a) : p([]);
        b = (h || (h = c("WebStorage"))).getSessionStorage();
        b && b.clear();
        c("ifRequired")("WebAsyncStorage", function (a) {
          a.clear(function () {});
        });
      },
      _getLocalStorageKeys: function () {
        var a = (h || (h = c("WebStorage"))).getLocalStorage();
        return a ? Object.keys(a) : [];
      },
    };
    a = r;
    g["default"] = a;
  },
  98
);
__d(
  "InstagramODSObserver",
  ["BaseEventEmitter"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = new (c("BaseEventEmitter"))();
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "InstagramODSImpl",
  ["InstagramODSObserver", "ODS"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = "instagram",
      j = {
        addListener: function (a) {
          c("InstagramODSObserver").addListener("event", a);
        },
        incr: function (a, b) {
          b === void 0 && (b = 1),
            (h || (h = d("ODS"))).bumpEntityKey(5588, i, a, b),
            c("InstagramODSObserver").emit("event", { count: b, key: a });
        },
        incr_CAREFUL_WHEN_USE_DYNAMIC_KEY: function (a, b) {
          j.incr(a, b);
        },
      };
    a = j;
    g["default"] = a;
  },
  98
);
__d(
  "AsyncTypedRequest",
  ["AsyncRequest"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b) {
        b = a.call(this, b) || this;
        b.setReplaceTransportMarkers();
        return b;
      }
      var c = b.prototype;
      c.promisePayload = function (b) {
        return a.prototype.promisePayload.call(this, b);
      };
      c.setPayloadHandler = function (b) {
        a.prototype.setPayloadHandler.call(this, b);
        return this;
      };
      return b;
    })(c("AsyncRequest"));
    g["default"] = a;
  },
  98
);
__d(
  "ClickRefUtils",
  ["DataAttributeUtils"],
  function (a, b, c, d, e, f) {
    var g = {
      get_intern_ref: function (a) {
        if (a) {
          var b = {
            profile_minifeed: 1,
            gb_content_and_toolbar: 1,
            gb_muffin_area: 1,
            ego: 1,
            bookmarks_menu: 1,
            jewelBoxNotif: 1,
            jewelNotif: 1,
            BeeperBox: 1,
            searchBarClickRef: 1,
          };
          for (a = a; a && a != document.body; a = a.parentNode) {
            if (!a.id || typeof a.id !== "string") continue;
            if (a.id.substr(0, 8) == "pagelet_") return a.id.substr(8);
            if (a.id.substr(0, 8) == "box_app_") return a.id;
            if (b[a.id]) return a.id;
          }
        }
        return "-";
      },
      get_href: function (a) {
        a =
          (a.getAttribute &&
            (a.getAttribute("ajaxify") || a.getAttribute("data-endpoint"))) ||
          a.action ||
          a.href ||
          a.name;
        return typeof a === "string" ? a : null;
      },
      should_report: function (a, c) {
        if (c == "FORCE") return !0;
        return c == "INDIRECT"
          ? !1
          : a &&
              (g.get_href(a) ||
                (a.getAttribute && b("DataAttributeUtils").getDataFt(a)));
      },
    };
    e.exports = g;
  },
  null
);
__d(
  "ClickRefLogger",
  [
    "Arbiter",
    "Banzai",
    "ClickRefUtils",
    "ScriptPath",
    "SessionName",
    "Vector",
    "collectDataAttributes",
    "ge",
    "pageID",
  ],
  function (a, b, c, d, e, f) {
    var g = { delay: 0, retry: !0 };
    function h(a) {
      if (!b("ge")("content")) return [0, 0, 0, 0];
      a = b("Vector").getEventPosition(a);
      return [a.x, a.y, 0, 0];
    }
    function i(c, d, e, f) {
      var g = "r",
        i = [0, 0, 0, 0],
        j,
        k;
      if (e) {
        j = e.type;
        j == "click" && b("ge")("content") && (i = h(e));
        var l = 0;
        e.ctrlKey && (l += 1);
        e.shiftKey && (l += 2);
        e.altKey && (l += 4);
        e.metaKey && (l += 8);
        l && (j += l);
      }
      d && (k = b("ClickRefUtils").get_href(d));
      l = b("collectDataAttributes")(e ? e.target || e.srcElement : d, [
        "ft",
        "gt",
      ]);
      Object.assign(l.ft, f.ft);
      Object.assign(l.gt, f.gt);
      typeof l.ft.ei === "string" && delete l.ft.ei;
      e &&
        e.which &&
        (l.ft.click_type =
          e.which === 1 ? "left" : e.which === 2 ? "middle" : "right");
      return [
        c.ue_ts,
        c.ue_count,
        k || "-",
        c.context,
        j || "-",
        b("ClickRefUtils").get_intern_ref(d),
        g,
        a.URI
          ? a.URI.getRequestURI(!0, !0).getUnqualifiedURI().toString()
          : location.pathname + location.search + location.hash,
        l,
      ]
        .concat(i)
        .concat(b("pageID"))
        .concat(b("ScriptPath").getTopViewEndpoint());
    }
    b("Arbiter").subscribe("ClickRefAction/new", function (a, c) {
      if (b("ClickRefUtils").should_report(c.node, c.mode)) {
        a = i(c.cfa, c.node, c.event, c.extra_data);
        c = [b("SessionName").getName(), Date.now(), "act"];
        b("Banzai").post("click_ref_logger", Array.prototype.concat(c, a), g);
      }
    });
    b("Arbiter").subscribe("ClickRefAction/contextmenu", function (a, c) {
      if (b("ClickRefUtils").should_report(c.node, c.mode)) {
        a = i(c.cfa, c.node, c.event, c.extra_data);
        c = [b("SessionName").getName(), Date.now(), "act"];
        b("Banzai").post("click_ref_logger", Array.prototype.concat(c, a), g);
      }
    });
  },
  null
);
__d(
  "DimensionTracking",
  ["Cookie", "Event", "debounce", "getViewportDimensions", "isInIframe"],
  function (a, b, c, d, e, f, g) {
    function a() {
      var a = c("getViewportDimensions")();
      c("Cookie").set("wd", a.width + "x" + a.height);
    }
    c("isInIframe")() ||
      (setTimeout(a, 100),
      c("Event").listen(window, "resize", c("debounce")(a, 250)),
      c("Event").listen(window, "focus", a));
  },
  34
);
__d(
  "TimeSpentArray",
  [
    "Banzai",
    "TimeSlice",
    "clearTimeout",
    "pageID",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    var h = 2,
      i = h * 32,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t = {},
      u;
    function v() {
      return { timeoutDelayMap: t, nextDelay: u, timeoutInSeconds: m };
    }
    function w() {
      if (j) {
        var a = Date.now();
        a > o && (q = Math.min(i, Math.ceil(a / 1e3 - n)));
        a = B();
        a && j(a, u);
      }
      A();
    }
    function x() {
      y(),
        (l = c("setTimeoutAcrossTransitions")(
          c("TimeSlice").guard(w, "TimeSpentArray Timeout", {
            propagationType: c("TimeSlice").PropagationType.ORPHAN,
          }),
          m * 1e3
        ));
    }
    function y() {
      l && (c("clearTimeout")(l), (l = null));
    }
    function z(a) {
      n = a;
      o = n * 1e3;
      p = [1];
      for (a = 1; a < h; a++) p.push(0);
      q = 1;
      r += 1;
      s += 1;
      a = s.toString() + "_delay";
      u = t[a];
      u === void 0 && (u = t.delay);
      a = s.toString() + "_timeout";
      a = t[a];
      a === void 0 && (a = t.timeout);
      a = Math.min(a, i);
      m = a || i;
      x();
    }
    function A() {
      y(), (p = null);
    }
    function B() {
      return !p
        ? null
        : {
            tos_id: c("pageID"),
            start_time: n,
            tos_array: p.slice(0),
            tos_len: q,
            tos_seq: s,
            tos_cum: r,
          };
    }
    function C(a) {
      if (a >= o && a - o < 1e3) return;
      k && k(a);
      D(Math.floor(a / 1e3));
    }
    function D(a) {
      var b = a - n;
      (b < 0 || b >= i) && w();
      !p
        ? z(a)
        : ((p[b >> 5] |= 1 << (b & 31)), (q = b + 1), (r += 1), (o = a * 1e3));
    }
    function a(a, b, d, e) {
      (r = 0),
        (s = -1),
        (j = a),
        (k = e),
        typeof b === "object" && b !== null ? (t = b) : (t = {}),
        z(
          Math.floor(
            (d === void 0 || d === null || d === 0 ? Date.now() : d) / 1e3
          )
        ),
        c("Banzai").subscribe(c("Banzai").SHUTDOWN, w);
    }
    function b(a) {
      C(a);
    }
    function d() {
      return B();
    }
    function e() {
      w();
    }
    function f() {
      A();
    }
    function E() {
      return v();
    }
    g.init = a;
    g.update = b;
    g.get = d;
    g.ship = e;
    g.reset = f;
    g.testState = E;
  },
  98
);
__d(
  "TimeSpentImmediateActiveSecondsLogger",
  ["cr:844180"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:844180");
  },
  98
);
__d(
  "WebTimeSpentBitArrayFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1829320");
    b = d("FalcoLoggerInternal").create("web_time_spent_bit_array", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "TimeSpentBitArrayLogger",
  [
    "Arbiter",
    "Env",
    "LogHistory",
    "ODS",
    "TimeSpentArray",
    "TimeSpentConfig",
    "TimeSpentImmediateActiveSecondsLogger",
    "UserActivity",
    "WebSession",
    "WebTimeSpentBitArrayFalcoEvent",
    "cr:1187159",
    "isInIframe",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j = "";
    function k(a) {
      a = l();
      a !== j && (b("TimeSpentArray").ship(), (j = a));
    }
    function l() {
      b("WebSession").extend();
      return b("WebSession").getId();
    }
    function m(a, d) {
      (a.sid_raw = j),
        b("Arbiter").inform(
          "timespent/tosbitdataposted",
          babelHelpers["extends"]({}, a)
        ),
        c("WebTimeSpentBitArrayFalcoEvent").logImmediately(function () {
          return {
            sid_raw: a.sid_raw,
            start_time: a.start_time,
            tos_array: a.tos_array,
            tos_cum: a.tos_cum,
            tos_id: a.tos_id,
            tos_len: a.tos_len,
            tos_seq: a.tos_seq,
          };
        });
    }
    f.exports = {
      init: function (a) {
        if (b("isInIframe")() && !(h || (h = b("Env"))).isCQuick) return;
        if ((h || (h = b("Env"))).isCQuick) {
          b("cr:1187159") != null
            ? b("UserActivity").subscribe(function (a, c) {
                b("cr:1187159").sendMessage({
                  compatAction: "update_time_spent_bit_array_from_boc",
                  eventTimeInMs: c.last_inform,
                });
              })
            : (i || (i = b("ODS"))).bumpEntityKey(
                223,
                "core_metrics.time_spent.www",
                "blue_on_comet_without_compat_broker"
              );
          return;
        }
        j = l();
        b("UserActivity").subscribe(function (a, c) {
          a = c.last_inform;
          b("TimeSpentArray").update(a);
          b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);
        });
        a = Date.now();
        b("TimeSpentArray").init(m, b("TimeSpentConfig"), a, k);
        b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);
        (i || (i = b("ODS"))).bumpEntityKey(
          2966,
          "ms.time_spent.qa.www",
          "time_spent.bits.js_initialized"
        );
      },
    };
  },
  34
);
__d(
  "Chromedome",
  ["fbt"],
  function (a, b, c, d, e, f, g, h) {
    function i() {
      if (document.domain == null) return null;
      var a = document.domain,
        b = /^intern\./.test(a);
      if (b) return null;
      b = /(^|\.)facebook\.(com|sg)$/.test(a);
      if (b) return "facebook";
      b = /(^|\.)instagram\.com$/.test(a);
      if (b) return "instagram";
      b = /(^|\.)threads\.net$/.test(a);
      if (b) return "threads";
      b = /(^|\.)messenger\.com$/.test(a);
      return b ? "messenger" : null;
    }
    function j(a) {
      if (a === "instagram")
        return h._(
          'This is a browser feature intended for developers. If someone told you to copy-paste something here to enable an Instagram feature or "hack" someone\'s account, it is a scam and will give them access to your Instagram account.'
        );
      return a === "threads"
        ? h._(
            'This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Threads feature or "hack" someone\'s account, it is a scam and will give them access to your Threads account.'
          )
        : h._(
            'This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or "hack" someone\'s account, it is a scam and will give them access to your Facebook account.'
          );
    }
    function a(a) {
      if (top !== window) return;
      a = i();
      if (a == null) return;
      var b = h._("Stop!");
      a = j(a);
      var c = h._("See {url} for more information.", [
        h._param("url", "https://www.facebook.com/selfxss"),
      ]);
      if (window.chrome || window.safari) {
        var d = "font-family:helvetica; font-size:20px; ";
        [
          [
            b,
            d +
              "font-size:50px; font-weight:bold; color:red; -webkit-text-stroke:1px black;",
          ],
          [a, d],
          [c, d],
          ["", ""],
        ].map(function (a) {
          window.setTimeout(
            console.log.bind(console, "\n%c" + a[0].toString(), a[1])
          );
        });
      } else {
        b = [
          "",
          " .d8888b.  888                       888",
          "d88P  Y88b 888                       888",
          "Y88b.      888                       888",
          ' "Y888b.   888888  .d88b.  88888b.   888',
          '    "Y88b. 888    d88""88b 888 "88b  888',
          '      "888 888    888  888 888  888  Y8P',
          "Y88b  d88P Y88b.  Y88..88P 888 d88P",
          ' "Y8888P"   "Y888  "Y88P"  88888P"   888',
          "                           888",
          "                           888",
          "                           888",
        ];
        d = ("" + a.toString()).match(/.{35}.+?\s+|.+$/g);
        if (d != null) {
          a = Math.floor(Math.max(0, (b.length - d.length) / 2));
          for (var e = 0; e < b.length || e < d.length; e++) {
            var f = b[e];
            b[e] = f + new Array(45 - f.length).join(" ") + (d[e - a] || "");
          }
        }
        console.log("\n\n\n" + b.join("\n") + "\n\n" + c.toString() + "\n");
        return;
      }
    }
    g.start = a;
  },
  98
);
__d(
  "NavigationClickPointHandler",
  ["Event", "ScriptPath", "collectDataAttributes"],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      var b = null,
        d = c("collectDataAttributes")(a, ["ft"], ["href", "data-click"]),
        e = d.normal.href;
      if (!e || e === "#") return !1;
      e = d.normal["data-click"];
      b === null && e && (b = { click: e });
      e = d.ft.tn;
      b === null && e && (b = { tn: e });
      if (b === null && a.getAttribute) {
        d = a.getAttribute("class");
        d != null && (b = { class: d });
      }
      return b;
    }
    function a(a) {
      a = a.target || a.srcElement;
      a = h(a);
      typeof a != "boolean" && d("ScriptPath").setClickPointInfo(a);
    }
    document.documentElement !== null &&
      c("Event").listen(document.documentElement, { click: a });
    g.getClickPointInfo = h;
  },
  98
);
__d(
  "WebPerfDeviceInfoLogFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1871697");
    b = d("FalcoLoggerInternal").create("web_perf_device_info_log", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "XDeviceClassRealtimeController",
  ["XController"],
  function (a, b, c, d, e, f) {
    e.exports = b("XController").create("/web_perf/get_perf_level/", {});
  },
  null
);
__d(
  "WebDevicePerfInfoLogging",
  [
    "AsyncTypedRequest",
    "JSScheduler",
    "Promise",
    "WebDevicePerfInfoData",
    "WebPerfDeviceInfoLogFalcoEvent",
    "XDeviceClassRealtimeController",
    "asyncToGeneratorRuntime",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i;
    function j(a) {
      var b = document.createElement("canvas");
      b = b.getContext("webgl") || b.getContext("experimental-webgl");
      if (!b) return;
      var c = b.getExtension("WEBGL_debug_renderer_info");
      if (!c) return;
      var d = b.getParameter(c.UNMASKED_RENDERER_WEBGL);
      b = b.getParameter(c.UNMASKED_VENDOR_WEBGL);
      a.gpu_vendor = b;
      a.gpu_renderer = d;
    }
    function k() {
      var a = window.navigator,
        b = {};
      a &&
        a.hardwareConcurrency !== void 0 &&
        (b.cpu_cores = a.hardwareConcurrency);
      a && a.deviceMemory !== void 0 && (b.ram = a.deviceMemory);
      c("WebDevicePerfInfoData").needsFullUpdate && j(b);
      return b;
    }
    function l() {
      var a = k();
      c("WebPerfDeviceInfoLogFalcoEvent").log(function () {
        var b;
        return {
          cpu_cores: (b = a.cpu_cores) != null ? b : null,
          ram: (b = a.ram) != null ? b : null,
          gpu_renderer: (b = a.gpu_renderer) != null ? b : null,
          gpu_vendor: (b = a.gpu_vendor) != null ? b : null,
        };
      });
    }
    function m() {
      return n.apply(this, arguments);
    }
    function n() {
      n = b("asyncToGeneratorRuntime").asyncToGenerator(function* () {
        var a = k();
        a = yield new (c("AsyncTypedRequest"))(
          c("XDeviceClassRealtimeController").getURIBuilder().getURI()
        )
          .setData(a)
          .promisePayload();
        return a.devicePerfClassLevel;
      });
      return n.apply(this, arguments);
    }
    function a() {
      (c("WebDevicePerfInfoData").needsFullUpdate ||
        c("WebDevicePerfInfoData").needsPartialUpdate) &&
        (i || (i = d("JSScheduler"))).scheduleSpeculativeCallback(l);
    }
    function e() {
      return new (h || (h = b("Promise")))(function (a, b) {
        c("WebDevicePerfInfoData").needsFullUpdate ||
        c("WebDevicePerfInfoData").needsPartialUpdate
          ? (i || (i = d("JSScheduler"))).scheduleSpeculativeCallback(
              function () {
                m().then(a)["catch"](b);
              }
            )
          : a();
      });
    }
    g.doLog = a;
    g.doLogPromise = e;
  },
  98
);
__d(
  "ArtillerySegment",
  ["invariant", "performanceAbsoluteNow"],
  function (a, b, c, d, e, f, g, h) {
    var i,
      j = 0;
    a = (function () {
      function a(a) {
        a || h(0, 1496),
          ("category" in a && "description" in a) ||
            h(0, 3138, JSON.stringify(a)),
          (this.$1 = !1),
          (this.$2 = babelHelpers["extends"]({}, a, {
            id: (j++).toString(36),
          })),
          (this.$3 = []);
      }
      var b = a.prototype;
      b.getID = function () {
        return this.$2.id;
      };
      b.begin = function () {
        this.$2.begin = (i || (i = c("performanceAbsoluteNow")))();
        return this;
      };
      b.end = function () {
        this.$2.end = (i || (i = c("performanceAbsoluteNow")))();
        return this;
      };
      b.appendChild = function () {
        var a = this;
        this.$1 && h(0, 37302, this.$2.description);
        for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++)
          c[d] = arguments[d];
        c.forEach(function (b) {
          a.$3.push(b.getID());
        });
        return this;
      };
      b.setPosted = function () {
        this.$1 = !0;
        return this;
      };
      b.getPostData = function () {
        return babelHelpers["extends"]({}, this.$2, {
          id: this.$2.id,
          children: this.$3.slice(),
        });
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "ArtillerySequence",
  ["invariant"],
  function (a, b, c, d, e, f, g, h) {
    var i = 0;
    a = (function () {
      function a(a) {
        a || h(0, 1496),
          "description" in a || h(0, 1497, JSON.stringify(a)),
          (this.$1 = !1),
          (this.$2 = babelHelpers["extends"]({}, a, {
            id: (i++).toString(36),
          })),
          (this.$3 = []);
      }
      var b = a.prototype;
      b.getID = function () {
        return this.$2.id;
      };
      b.addSegment = function () {
        var a = this;
        this.$1 && h(0, 37342, this.$2.description);
        for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++)
          c[d] = arguments[d];
        c.forEach(function (b) {
          a.$3.push(b.getID());
        });
        return this;
      };
      b.setPosted = function () {
        this.$1 = !0;
        return this;
      };
      b.getPostData = function () {
        return babelHelpers["extends"]({}, this.$2, {
          id: this.$2.id,
          segments: this.$3.slice(),
        });
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "ArtilleryTrace",
  ["invariant", "ArtillerySegment", "ArtillerySequence"],
  function (a, b, c, d, e, f, g, h) {
    a = (function () {
      function a() {
        (this.$1 = !1),
          (this.$3 = void 0),
          (this.$4 = {}),
          (this.$5 = {}),
          (this.$6 = []),
          (this.$7 = []),
          (this.$8 = {}),
          (this.$9 = []),
          (this.$10 = null);
      }
      var b = a.prototype;
      b.createSequence = function (a) {
        this.$1 && h(0, 4917);
        a = new (c("ArtillerySequence"))(a);
        this.$6.push(a);
        return a;
      };
      b.createSegment = function (a) {
        this.$1 && h(0, 4918);
        a = new (c("ArtillerySegment"))(a);
        this.$7.push(a);
        return a;
      };
      b.markSegment = function (a, b) {
        this.$1 && h(0, 4919);
        this.$8[b] = a.getID();
        return this;
      };
      b.connectTrace = function (a, b) {
        this.$1 && h(0, 4919);
        b = b || this.$2;
        b || h(0, 4920);
        this.$9.push({ segment: a.getID(), trace: b });
        return this;
      };
      b.setID = function (a, b) {
        (!this.$2 && !this.$3) || h(0, 4921);
        this.$2 = a;
        this.$3 = b;
        return this;
      };
      b.getID = function () {
        return this.$2;
      };
      b.getArtillery2ID = function () {
        return this.$3;
      };
      b.addProperty = function (a, b) {
        this.$4[a] = b;
        return this;
      };
      b.addTagset = function (a, b) {
        this.$5[a] = b;
        return this;
      };
      b.addActivePolicies = function (a) {
        this.addTagset("active_policies", a);
        this.addTagset("policy", a);
        return this;
      };
      b.getProperty = function (a) {
        return this.$4[a];
      };
      b.getTagset = function (a) {
        return this.$5[a];
      };
      b.getActivePolicies = function () {
        return this.getTagset("active_policies");
      };
      b.post = function () {
        this.$1 && h(0, 37290, this.$2);
        this.$1 = !0;
        var a = this.$10;
        a &&
          a({
            id: this.$2,
            artillery2Id: this.$3,
            properties: this.$4,
            tagsets: this.$5,
            sequences: this.$6.map(function (a) {
              return a.setPosted().getPostData();
            }),
            segments: this.$7.map(function (a) {
              return a.setPosted().getPostData();
            }),
            marks: babelHelpers["extends"]({}, this.$8),
            connections: this.$9.slice(),
          });
      };
      b.setOnPost = function (a) {
        this.$10 && h(0, 4923);
        this.$10 = a;
        return this;
      };
      b.isPosted = function () {
        return this.$1;
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "ServiceWorkerRegistration",
  [
    "BrowserPaymentHandlerConfig",
    "ClientServiceWorkerMessage",
    "EventListener",
    "Promise",
    "Run",
    "promiseDone",
  ],
  function (a, b, c, d, e, f) {
    var g,
      h = !!navigator.serviceWorker,
      i = {},
      j = { name: "Facebook Pay", method: self.location.origin + "/pay" };
    function k(a) {
      if (!b("BrowserPaymentHandlerConfig").enabled) return;
      (a = a.paymentManager) == null
        ? void 0
        : (a = a.instruments) == null
        ? void 0
        : a.set("Facebook", j);
    }
    function l() {
      var a = navigator.serviceWorker;
      if (!h || !a)
        throw new Error("serviceWorker is not supported in this browser");
      return a;
    }
    var m = {
      isSupported: function () {
        return h;
      },
      registerWorkerIfUnregisteredAfterDD: function (a) {
        b("Run").onAfterLoad(function () {
          m.registerWorkerIfUnregistered(a);
        });
      },
      registerWorkerIfUnregistered: function (a) {
        if (i[a]) return i[a];
        var c = l(),
          d = (i[a] = new (g || (g = b("Promise")))(function (d, e) {
            b("promiseDone")(m.getWorkerRegistration(a), function (f) {
              if (!f) {
                var h = b("EventListener").listen(
                  window,
                  "message",
                  function (a) {
                    (a == null
                      ? void 0
                      : (a = a.data) == null
                      ? void 0
                      : a.command) === "ServiceWorkerInstallError" && e();
                  }
                );
                b("promiseDone")(
                  (g || (g = b("Promise"))).resolve(
                    c.register(a, { updateViaCache: "all" })
                  ),
                  function () {
                    h.remove(),
                      b("promiseDone")(
                        (g || (g = b("Promise"))).resolve(c.ready),
                        d
                      );
                  }
                );
              } else d(f);
            });
          }));
        b("promiseDone")(d, function (b) {
          (i[a] = null), k(b);
        });
        return d;
      },
      unregisterControllingWorker: function () {
        return new (g || (g = b("Promise")))(function (a, c) {
          c = new (b("ClientServiceWorkerMessage"))(
            "unregister",
            {},
            function () {
              a(!0);
            }
          );
          c.sendViaController();
        });
      },
      getWorkerRegistration: function (a) {
        var b = l();
        return b.getRegistration(a);
      },
      isAWorkerActivated: function () {
        return !navigator.serviceWorker ||
          !navigator.serviceWorker.getRegistration
          ? (g || (g = b("Promise"))).resolve(!1)
          : navigator.serviceWorker.getRegistration().then(function (a) {
              return !!(a && a.active);
            });
      },
    };
    e.exports = m;
  },
  null
);
__d(
  "Artillery",
  [
    "invariant",
    "ArtilleryTrace",
    "Banzai",
    "ClientServiceWorkerMessage",
    "Run",
    "ServiceWorkerRegistration",
    "forEachObject",
    "mixInEventEmitter",
    "performance",
  ],
  function (a, b, c, d, e, f, g, h) {
    var i,
      j = !1,
      k = !1,
      l = [],
      m,
      n,
      o,
      p = {},
      q = {},
      r = !1,
      s = !1;
    function t() {
      if (j) return;
      j = !0;
      c("Banzai").subscribe(c("Banzai").SHUTDOWN, function () {
        v._postAll();
      });
    }
    function u() {
      (n = null), (m = null), (q = {}), (p = {}), (o = null), (s = !1);
    }
    var v = {
      isEnabled: function () {
        return k;
      },
      createTrace: function () {
        t();
        var a = new (c("ArtilleryTrace"))();
        a.setOnPost(function (a) {
          v.emitAndHold("posttrace", a);
        });
        l.push(a);
        return a;
      },
      getPageTrace: function () {
        m || h(0, 4261);
        if (o) return o;
        var a = v.createTrace().setID(m, n);
        c("forEachObject")(p, function (b, c, d) {
          a.addProperty(c, b);
        });
        c("forEachObject")(q, function (b, c, d) {
          a.addTagset(c, b);
        });
        o = a;
        return a;
      },
      setPageProperties: function (a) {
        p = a;
      },
      addPageTagset: function (a, b) {
        o == null ? (q[a] = b) : o.addTagset(a, b);
      },
      setActivePolicies: function (a) {
        v.addPageTagset("active_policies", a), v.addPageTagset("policy", a);
      },
      getPageActivePolicies: function () {
        return v.getPageTagset("active_policies");
      },
      enableLogServiceWorker: function () {
        c("ServiceWorkerRegistration").isSupported() && (r = !0);
      },
      getPageProperty: function (a) {
        if (o == null) return p[a];
        else return o.getProperty(a);
      },
      getPageTagset: function (a) {
        if (o == null) return q[a];
        else return o.getTagset(a);
      },
      enable: function () {
        (k = !0), s || (d("Run").onLeave(u), (s = !0));
      },
      disable: function () {
        k = !1;
      },
      setPageTraceID: function (a, b) {
        if (m === a && n === b) return;
        (!m && !n) || h(0, 4262);
        m = a;
        n = b;
        if (
          r &&
          (i || (i = c("performance"))) &&
          (i || (i = c("performance"))).timing &&
          (i || (i = c("performance"))).timing.navigationStart
        ) {
          a = new (c("ClientServiceWorkerMessage"))(
            "asw-sendStartupData",
            {
              traceID: n,
              windowStart: (i || (i = c("performance"))).timing.navigationStart,
            },
            null
          );
          a.sendViaController();
        }
      },
      _postAll: function () {
        l.forEach(function (a) {
          return !a.isPosted() && a.post();
        });
      },
    };
    c("mixInEventEmitter")(v, { posttrace: !0 });
    a = v;
    g["default"] = a;
  },
  98
);
__d(
  "TransportSelectingClientSingletonConditional",
  ["cr:5800"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:5800");
  },
  98
);
__d(
  "JavascriptWebErrorFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1828905");
    b = d("FalcoLoggerInternal").create("javascript_web_error", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "ErrorTransport",
  ["JavascriptWebErrorFalcoEvent"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a(a) {
      c("JavascriptWebErrorFalcoEvent").log(function () {
        return a;
      });
    }
    g.log = a;
  },
  98
);
__d(
  "UserAgentDataTyped",
  ["UserAgentData"],
  function (a, b, c, d, e, f) {
    e.exports = b("UserAgentData");
  },
  null
);
__d(
  "CometSuspenseFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1828945");
    b = d("FalcoLoggerInternal").create("comet_suspense", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "WebBlueTimeSpentNavigationFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1829319");
    b = d("FalcoLoggerInternal").create("web_blue_time_spent_navigation", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "WebImmediateActiveSecondsFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1843988");
    b = d("FalcoLoggerInternal").create("web_immediate_active_seconds", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "FalcoAppUniverse",
  ["$InternalEnum"],
  function (a, b, c, d, e, f) {
    a = b("$InternalEnum")({ FACEBOOK: 1, INSTAGRAM: 2 });
    c = a;
    f["default"] = c;
  },
  66
);
__d(
  "Queue",
  [],
  function (a, b, c, d, e, f) {
    var g = {};
    a = (function () {
      function a(a) {
        (this._timeout = null),
          (this._interval = (a == null ? void 0 : a.interval) || 0),
          (this._processor = a == null ? void 0 : a.processor),
          (this._queue = []),
          (this._stopped = !0);
      }
      var b = a.prototype;
      b._dispatch = function (a) {
        var b = this;
        a === void 0;
        if (this._stopped || this._queue.length === 0) return;
        a = this._processor;
        if (a == null) {
          this._stopped = !0;
          throw new Error("No processor available");
        }
        var c = this._interval;
        if (c != null)
          a.call(this, this._queue.shift()),
            (this._timeout = setTimeout(function () {
              return b._dispatch();
            }, c));
        else while (this._queue.length) a.call(this, this._queue.shift());
      };
      b.enqueue = function (a) {
        this._processor && !this._stopped
          ? this._processor(a)
          : this._queue.push(a);
        return this;
      };
      b.start = function (a) {
        a && (this._processor = a);
        this._stopped = !1;
        this._dispatch();
        return this;
      };
      b.isStarted = function () {
        return !this._stopped;
      };
      b.dispatch = function () {
        this._dispatch(!0);
      };
      b.stop = function (a) {
        this._stopped = !0;
        a && this._timeout != null && clearTimeout(this._timeout);
        return this;
      };
      b.merge = function (a, b) {
        if (b) {
          (b = this._queue).unshift.apply(b, a._queue);
        } else {
          (b = this._queue).push.apply(b, a._queue);
        }
        a._queue = [];
        this._dispatch();
        return this;
      };
      b.getLength = function () {
        return this._queue.length;
      };
      a.get = function (b, c) {
        var d;
        b in g ? (d = g[b]) : (d = g[b] = new a(c));
        return d;
      };
      a.exists = function (a) {
        return a in g;
      };
      a.remove = function (a) {
        return delete g[a];
      };
      return a;
    })();
    f["default"] = a;
  },
  66
);
__d(
  "FalcoLoggerTransports",
  [
    "AnalyticsCoreData",
    "Banzai",
    "ExecutionEnvironment",
    "FBLogger",
    "FalcoAppUniverse",
    "FalcoUtils",
    "ODS",
    "PersistedQueue",
    "Queue",
    "WebSession",
    "performanceAbsoluteNow",
    "promiseDone",
    "requireDeferredForDisplay",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = c("requireDeferredForDisplay")(
        "TransportSelectingClientSingletonConditional"
      ).__setRef("FalcoLoggerTransports"),
      m = 5 * 1024,
      n =
        (b = (i || (i = c("AnalyticsCoreData"))).max_delay_br_queue) != null
          ? b
          : 60 * 1e3,
      o =
        (e = (i || (i = c("AnalyticsCoreData")))
          .max_delay_br_queue_immediate) != null
          ? e
          : 1e3;
    b =
      (f = (i || (i = c("AnalyticsCoreData")))
        .max_delay_br_init_not_complete) != null
        ? f
        : 1e3;
    var p = "falco:",
      q = new (c("Queue"))(),
      r = 5e3,
      s = 6e4,
      t = c("uuidv4")(),
      u = "ods_web_batch",
      v = new Map(),
      w = new Set(),
      x = new Set(),
      y =
        (e = c("FalcoAppUniverse").cast(
          (i || (i = c("AnalyticsCoreData"))).app_universe
        )) != null
          ? e
          : 1,
      z = [],
      A = 0,
      B = null,
      C = !1,
      D = !1,
      E = !1,
      F = !0,
      G = !1,
      H = Date.now() - s,
      I = 1,
      J = b > n ? b : n,
      K = b;
    Y();
    for (
      e =
        (f = (i || (i = c("AnalyticsCoreData"))).stateful_events_list_for_br) !=
        null
          ? f
          : [],
        b = Array.isArray(e),
        f = 0,
        e = b
          ? e
          : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      var L;
      if (b) {
        if (f >= e.length) break;
        L = e[f++];
      } else {
        f = e.next();
        if (f.done) break;
        L = f.value;
      }
      L = L;
      w.add(L);
    }
    for (
      f =
        (L = (i || (i = c("AnalyticsCoreData")))
          .stateless_non_fb_events_for_br) != null
          ? L
          : [],
        b = Array.isArray(f),
        e = 0,
        f = b
          ? f
          : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      if (b) {
        if (e >= f.length) break;
        L = f[e++];
      } else {
        e = f.next();
        if (e.done) break;
        L = e.value;
      }
      L = L;
      x.add(L);
    }
    function M() {
      return (
        (i || (i = c("AnalyticsCoreData"))).enable_bladerunner &&
        !(k || (k = c("ExecutionEnvironment"))).isInWorker
      );
    }
    function N(a, b) {
      T(b.item.name, "js.br.add_to_batch", 1, !0);
      var c = b.item.extra.length;
      A + c > m && (clearTimeout(B), O());
      z.push([a, b]);
      A += c;
    }
    function O() {
      B = null;
      C = !1;
      var a = z;
      R(
        "js.br.send_batch",
        a.map(function (a) {
          return a[1].item;
        })
      );
      if (!G) {
        S("js.br.init_not_complete.log", a.length);
        var b = function () {
          var b = a[c],
            d = b[0],
            e = b[1];
          T(e.item.name, "js.br.banzai_fallback_for_init_not_complete", 1, !0);
          ((b = e.item.logImmediate) != null ? b : !1)
            ? U.logImmediately([e.item], function (a) {
                return d.markItem(e, a);
              })
            : U.log([e.item], function (a) {
                return d.markItem(e, a);
              });
        };
        for (var c = 0; c < a.length; c++) b();
      } else
        q.enqueue(function (b) {
          return b.log(
            a.map(function (a) {
              return a[1].item;
            }),
            function (b) {
              if (!b) {
                S("js.br.banzai_fallback", a.length);
                var c = function () {
                  var c = a[d],
                    b = c[0],
                    e = c[1];
                  T(e.item.name, "js.br.banzai_fallback_for_failure", 1, !0);
                  ((c = e.item.logImmediate) != null ? c : !1)
                    ? U.logImmediately([e.item], function (a) {
                        return b.markItem(e, a);
                      })
                    : U.log([e.item], function (a) {
                        return b.markItem(e, a);
                      });
                };
                for (var d = 0; d < a.length; d++) c();
                return;
              }
              for (c = 0; c < a.length; c++) {
                var e = a[c],
                  f = e[0];
                e = e[1];
                T(
                  e.item.name,
                  "js.br.success_callback.batch.send_batch",
                  1,
                  !0
                );
                f.markItem(e, b);
              }
            }
          );
        });
      z = [];
      A = 0;
    }
    function aa(a) {
      return {
        events: a.map(function (a) {
          return {
            name: a.name,
            extra: a.extra,
            rate: a.policy.r,
            time: a.time / 1e3,
            tag: 0,
            tags: a.tags,
            shouldAddState: a.shouldAddState,
            identity: P(a.identity),
            expTags: a.exptTags,
          };
        }),
      };
    }
    function ba(a) {
      var b;
      a = {
        deviceId: (i || (i = c("AnalyticsCoreData"))).device_id,
        familyDeviceId: null,
        osBuildNumber: null,
        sessionId: a,
        appId: i.app_id,
        appVersion:
          (a = (i || (i = c("AnalyticsCoreData"))).app_version) != null
            ? a
            : null,
        bundleId: null,
        consentState: null,
        identity: null,
        pushPhase: i.push_phase,
      };
      ((b =
        (b = (i || (i = c("AnalyticsCoreData"))).stateful_events_list_for_br) ==
        null
          ? void 0
          : b.length) != null
        ? b
        : 0) > 0 &&
        (a.ambientState = (i || (i = c("AnalyticsCoreData"))).state_for_br);
      a.identity = P(i.identity);
      return Object.freeze(a);
    }
    function P(a) {
      try {
        if (y === 2) {
          var b = a == null ? void 0 : a.appScopedIdentity;
          if (b !== void 0)
            return { appScopedIdentity: { uid: b, identifier: b, claims: [] } };
        } else {
          b = a == null ? void 0 : a.fbIdentity;
          if (b !== void 0)
            return {
              facebookIdentity: {
                actorId: b.actorId,
                accountId: b.accountId,
                claims: [],
              },
            };
        }
      } catch (a) {
        (h || (h = d("ODS"))).bumpEntityKey(
          1344,
          "js.br.identity.propogation",
          "exception.while.generating.identity",
          1
        );
      }
      return null;
    }
    function Q(a, b) {
      for (var e = 0; e < a.length; e++) {
        var f,
          g = a[e];
        T(g.name, "js.banzai.posting_event", 1, !1);
        f =
          ((f = {}),
          (f.e = g.extra),
          (f.r = g.policy.r),
          (f.d = (i || (i = c("AnalyticsCoreData"))).device_id),
          (f.s = d("WebSession").getId()),
          (f.t = g.time),
          f);
        g.privacyContext && (f.p = g.privacyContext);
        g.tags != null && (f.b = g.tags);
        var h = g.identity;
        h && (f.id = h);
        if (g.exptTags) {
          h = g.exptTags[0].split(":");
          h.length === 3 &&
            (h[2] === "on"
              ? (f.c = "falco_js_br_stateful_migration:on")
              : h[2] === "off" && (f.c = "falco_js_br_stateful_migration:off"));
        }
        c("Banzai").post(p + g.name, f, b);
      }
      R("planes.banzai.write_to_transport", a);
    }
    function R(a, b) {
      var c = 0;
      for (var d = 0; d < b.length; d++) {
        var e = b[d];
        e.name !== u && (c += 1);
      }
      c > 0 && S(a, c);
    }
    function S(a, b) {
      var e =
        "falco.fabric.www." + (i || (i = c("AnalyticsCoreData"))).push_phase;
      (h || (h = d("ODS"))).bumpEntityKey(1344, e, a, b);
    }
    function T(a, b, c, e) {
      if (a === u) return !1;
      (h || (h = d("ODS"))).bumpEntityKey(1344, "falco.event." + a, b, c);
      e && S(b, c);
      return !0;
    }
    var U = {
      log: function (a, b) {
        R("js.banzai.post.log", a), Q(a, c("Banzai").BASIC), b(!0);
      },
      logImmediately: function (a, b) {
        R("js.banzai.post.log_immediately", a), Q(a, c("Banzai").VITAL), b(!0);
      },
      logCritical: function (a, b) {
        R("js.banzai.post.log_critical", a),
          Q(a, { signal: !0, retry: !0 }),
          b(!0);
      },
    };
    function ca(a) {
      Y();
      var b = V(a, "banzai_data_loss", "log"),
        d = V(a, "banzai_data_loss", "logImmediately"),
        e = V(a, "banzai_data_loss", "logCritical"),
        f = V(a, "bladerunner_data_loss", ""),
        g = V(a, "bladerunner_data_loss", "logCritical");
      S("js.br_data_loss.posted." + a, 1);
      if (G && F)
        try {
          q.enqueue(function (b) {
            return b.log([f], function (b) {
              if (!b) {
                S("js.br.transport_failure." + a, 1);
                U.logCritical([g], function (b) {
                  S("js.br.failure_fallback_success_callback." + a, 1);
                });
                return;
              }
              S("js.br.success_callback." + a, 1);
            });
          });
        } catch (b) {
          S("js.br.error_enqueueing." + a, 1),
            U.logCritical([g], function (b) {
              S("js.br.enqueuing_fallback_success_callback." + a, 1);
            });
        }
      else
        F || S("js.br.failed." + a, 1),
          G || S("js.br.init_not_complete." + a, 1),
          U.logCritical([g], function (b) {
            S("js.br.init_fallback_success_callback." + a, 1);
          });
      Q([b], c("Banzai").BASIC);
      Q([d], c("Banzai").VITAL);
      Q([e], { signal: !0, retry: !0 });
    }
    function V(a, b, d) {
      return {
        name: b,
        time: (j || (j = c("performanceAbsoluteNow")))(),
        policy: { r: 1 },
        extra: JSON.stringify({
          event_index: a,
          falco_js_connection_id: t,
          logging_mode: d,
          logging_flow_flag: "original_flow",
        }),
      };
    }
    function W() {
      H + r < Date.now() && (ca(I), (H = Date.now()), I++);
    }
    function X() {
      window.setTimeout(function () {
        W(), I <= 40 && X();
      }, s);
    }
    function da(a) {
      q.start(function (b) {
        return b({
          log: function (d, b) {
            R("planes.bladerunner.write_to_transport", d);
            var e = JSON.stringify(aa(d));
            a
              ? (i || (i = c("AnalyticsCoreData"))).enable_ack
                ? c("promiseDone")(
                    a.amendWithAck(e),
                    function (a) {
                      R("planes.bladerunner.ack_received" + a.toString(), d),
                        b(a);
                    },
                    function () {
                      R("planes.bladerunner.ack_failure", d), b(!1);
                    }
                  )
                : (a.amendWithoutAck(e),
                  R("planes.bladerunner.write_without_ack", d))
              : (R("planes.bladerunner.request_stream_null", d), b(!1));
          },
          logImmediately: function (b, a) {
            this.log(b, a);
          },
          logCritical: function (b, a) {
            this.log(b, a);
          },
        });
      });
    }
    function Y() {
      if (D) return;
      G = !1;
      if (!M()) return;
      l.onReady(function (a) {
        if (!a) {
          F = !1;
          q.start(function (a) {
            return a(U);
          });
          return;
        }
        a = a;
        var b = {
          onTermination: function (a) {
            a.message === "Stream closed"
              ? (q.stop(!0), (D = !1))
              : ((F = !1),
                y === 2 &&
                  ((h || (h = d("ODS"))).bumpEntityKey(
                    1344,
                    "falco.ig.br.experiment",
                    "exception.when.br.stream.is.rejected",
                    1
                  ),
                  c("FBLogger")("ig_web", "br_stream_rejected")
                    .catching(a)
                    .warn("BladeRunner stream is rejected")),
                q.start(function (a) {
                  return a(U);
                }));
          },
          onFlowStatus: function () {},
        };
        c("promiseDone")(
          a
            .requestStream(
              { method: "Falco" },
              JSON.stringify(ba(d("WebSession").getId())),
              b,
              { requestId: "" }
            )
            .then(function (b) {
              (a = b), da(a), (G = !0), (J = n), (K = o);
            })
            ["catch"](function (a) {
              q.stop(!0), (D = !1);
            })
        );
      });
      D = !0;
    }
    function Z(a) {
      var b,
        d = a.name;
      if (!M() || !F) return !1;
      if (w.has(d)) {
        a.shouldAddState = !0;
        return !0;
      }
      if (
        ((b = (i || (i = c("AnalyticsCoreData"))).br_stateful_migration_exp) !=
        null
          ? b
          : !1) &&
        a.policy.s !== 1
      ) {
        if (
          (b = (i || (i = c("AnalyticsCoreData"))).br_stateful_migration_on) !=
          null
            ? b
            : !1
        ) {
          a.exptTags = ["exp:falco_js_br_stateful_migration:on"];
          a.shouldAddState = !0;
          return !0;
        } else a.exptTags = ["exp:falco_js_br_stateful_migration:off"];
      }
      return y !== 1 &&
        (i || (i = c("AnalyticsCoreData")))
          .enable_non_fb_br_stateless_by_default !== !0 &&
        !x.has(d)
        ? !1
        : a.policy.s === 1;
    }
    function $(a) {
      if (a === "") return null;
      if (v.has(a)) return v.get(a);
      else {
        var b = { claim: "" },
          c = a.split("^#");
        if (c.length >= 4) {
          var d = c[0],
            e = c[1],
            f = c[2];
          c = c[3];
          f !== ""
            ? (b = { appScopedIdentity: f, claim: c })
            : d !== "" &&
              (b = { fbIdentity: { accountId: d, actorId: e }, claim: c });
          v.set(a, b);
        }
        return b;
      }
    }
    function a() {
      if (E) return;
      E = !0;
      c("PersistedQueue").setHandler("falco_queue_log", function (b) {
        var c,
          d = b.getQueueNameSuffix(),
          e = $(d);
        while ((c = b.dequeueItem()))
          (function (c) {
            Z(c.item)
              ? (T(c.item.name, "js.use_bladerunner.log", 1, !0),
                Y(),
                B == null && (B = setTimeout(O, J)),
                e && !a(d) && (c.item.identity = e),
                N(b, c))
              : (T(c.item.name, "js.use_banzai.log", 1, !0),
                e && (c.item.identity = e),
                U.log([c.item], function (a) {
                  return b.markItem(c, a);
                }));
          })(c);
      });
      c("PersistedQueue").setHandler("falco_queue_immediately", function (b) {
        var d,
          e = b.getQueueNameSuffix(),
          f = $(e);
        while ((d = b.dequeueItem()))
          (function (d) {
            Z(d.item)
              ? (T(d.item.name, "js.use_bladerunner.log_immediately", 1, !0),
                Y(),
                (B == null || !C) &&
                  (clearTimeout(B), (B = setTimeout(O, K)), (C = !0)),
                (d.item.logImmediate = !0),
                f && !a(e) && (d.item.identity = f),
                N(b, d),
                c("PersistedQueue").isPersistenceAllowed() ||
                  (T(
                    d.item.name,
                    "js.br.send_immediately_no_persistence",
                    1,
                    !0
                  ),
                  O()))
              : (T(d.item.name, "js.use_banzai.log_immediately", 1, !0),
                f && (d.item.identity = f),
                U.logImmediately([d.item], function (a) {
                  return b.markItem(d, a);
                }));
          })(d);
      });
      c("PersistedQueue").setHandler("falco_queue_critical", function (b) {
        var c,
          d = b.getQueueNameSuffix(),
          e = $(d);
        while ((c = b.dequeueItem()))
          (function (c) {
            var f = c.item;
            Z(f)
              ? (T(f.name, "js.use_bladerunner.log_critical", 1, !0),
                Y(),
                !G
                  ? (T(f.name, "js.br.init_not_complete.logCritical", 1, !0),
                    e && (f.identity = e),
                    U.logCritical([f], function (a) {
                      return b.markItem(c, a);
                    }))
                  : (e && !a(d) && (f.identity = e),
                    q.enqueue(function (a) {
                      return a.logCritical([f], function (a) {
                        if (!a) {
                          S("js.br.banzai_fallback.critical", 1);
                          T(
                            c.item.name,
                            "js.br.banzai_fallback_for_failure.critical",
                            1,
                            !0
                          );
                          !f.identity && e && (f.identity = e);
                          U.logCritical([f], function (a) {
                            return b.markItem(c, a);
                          });
                          return;
                        }
                        T(
                          c.item.name,
                          "js.br.success_callback.batch.critical",
                          1,
                          !0
                        );
                        b.markItem(c, a);
                      });
                    }),
                    a(d) ||
                      T(
                        c.item.name,
                        "js.bladerunner.identity.mismatch",
                        1,
                        !0
                      )))
              : (e && (f.identity = e),
                T(f.name, "js.use_banzai.log_critical", 1, !0),
                U.logCritical([f], function (a) {
                  return b.markItem(c, a);
                }));
          })(c);
      });
      (i || (i = c("AnalyticsCoreData"))).enable_dataloss_timer &&
        (Y(), W(), X());
      function a(a) {
        try {
          var b = d("FalcoUtils").identityToString(
            (i || (i = c("AnalyticsCoreData"))).identity
          );
          return a === b;
        } catch (a) {
          (h || (h = d("ODS"))).bumpEntityKey(
            1344,
            "js.br.identity.check",
            "exception.when.comparing.with.current.user.identity",
            1
          );
          return !0;
        }
      }
    }
    g.attach = a;
  },
  98
);
__d(
  "ScriptPathLogger",
  [
    "Banzai",
    "LogHistory",
    "ScriptPath",
    "URI",
    "WebBlueTimeSpentNavigationFalcoEvent",
    "WebSession",
    "isInIframe",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    f = "script_path_change";
    var i = { scriptPath: null, categoryToken: null, extraData: {} },
      j = !1,
      k = "imp_id";
    function l(a) {
      var b = (h || (h = c("URI"))).getNextURI
          ? (h || (h = c("URI"))).getNextURI()
          : new (h || (h = c("URI")))(window.location.href),
        d = b.getQueryData();
      b = b.getPath();
      b.endsWith("/") && (b = b.substr(0, b.length - 1));
      d.comment_id &&
        (a.extra_data = babelHelpers["extends"]({}, a.extra_data, {
          graphql_comment_id: d.comment_id,
        }));
      var e = m(b, d);
      if (e) {
        a.content_id = e;
        return;
      }
      e = n(b);
      if (e !== "") {
        a.dest_topic_feed = e;
        return;
      }
      if (o(b)) {
        e = d.queue_id;
        e && (a.dest_srt_queue_id = e);
        b = d.job_in_review;
        b && (a.dest_srt_reviewing_job_id = b);
        return;
      }
    }
    function m(a, b) {
      if (b.story_fbid) return b.story_fbid;
      if (b.fbid) return b.fbid;
      if (b.view === "permalink" && b.id) return b.id;
      b = /\/(posts|videos|notes|groups\/.*\/permalink)\//;
      var c = /^[0-9]+$/;
      if (b.test(a)) {
        b = a.split("/");
        a = b[b.length - 1];
        if (c.test(a)) return a;
      }
      return "";
    }
    function n(a) {
      if (!a || a.search("/feed/topics/") == -1) return "";
      a = a.split("/");
      return a[a.length - 1];
    }
    function o(a) {
      return !!a && a.search("/intern/review/") !== -1;
    }
    function p(a, b, e, f) {
      d("WebSession").extend();
      if (!j || c("isInIframe")()) return;
      var g = {
        source_path: a.scriptPath,
        source_token: a.categoryToken,
        dest_path: b.scriptPath,
        dest_token: b.categoryToken,
        impression_id: b.extraData ? b.extraData.imp_id : null,
        cause: e,
        sid_raw: d("WebSession").getId(),
      };
      e = e === "unload";
      e || l(g);
      if (f != null) {
        var h = f.snowlift_content_id;
        !e && h != null && ((g.content_id = h), delete f.snowlift_content_id);
        g.extra_data = babelHelpers["extends"]({}, g.extra_data, f);
      }
      a.scriptPath === null && (g.referrer = document.referrer);
      e = d("ScriptPath").getClickPointInfo();
      e && (g.click_point_info = e);
      if (a.extraData)
        for (h in a.extraData) h != k && (g["source_" + h] = a.extraData[h]);
      if (b.extraData)
        for (f in b.extraData) f != k && (g["dest_" + f] = b.extraData[f]);
      a.topViewEndpoint && (g.source_endpoint = a.topViewEndpoint);
      b.topViewEndpoint && (g.dest_endpoint = b.topViewEndpoint);
      a.restored && (g.source_restored = !0);
      c("WebBlueTimeSpentNavigationFalcoEvent").logImmediately(function () {
        return { json_data: JSON.stringify(g) };
      });
      d("ScriptPath").setClickPointInfo(null);
    }
    function q() {
      p(
        d("ScriptPath").getSourcePageInfo() || i,
        d("ScriptPath").getPageInfo() || i,
        "load"
      );
    }
    function r(a, b, c) {
      p(a, b, "transition", c);
    }
    function a() {
      p(d("ScriptPath").getPageInfo() || i, i, "unload"),
        d("ScriptPath").shutdown();
    }
    var s = d("ScriptPath").subscribe(function (a) {
      if (j) {
        var b = a.source,
          c = a.dest,
          d = a.cause;
        a = a.extraData;
        d ? p(b || i, c || i, d, a) : b ? r(b, c || i, a) : q();
      }
    });
    c("Banzai").subscribe(c("Banzai").SHUTDOWN, a);
    function b() {
      (j = !0), d("ScriptPath").getPageInfo() && q();
    }
    function e() {
      (j = !1), s.remove();
    }
    g.BANZAI_LOGGING_ROUTE = f;
    g.startLogging = b;
    g.stopLogging = e;
  },
  98
);
__d(
  "ServiceWorkerURLCleaner",
  [],
  function (a, b, c, d, e, f) {
    var g = /sw_fnr_id=\d+&?/,
      h = /fnr_t=\d+&?/,
      i = !1,
      j = !1;
    function a() {
      if (i) return j;
      i = !0;
      if (location.search && g.test(location.search)) {
        j = !0;
        if (history !== void 0 && typeof history.replaceState === "function") {
          var a = location
            .toString()
            .replace(g, "")
            .replace(h, "")
            .replace(/\?$/, "");
          history.replaceState({}, document.title, a);
        }
      }
      return j;
    }
    f.removeRedirectID = a;
  },
  66
);
__d(
  "TimeSpentImmediateActiveSecondsLoggerBlue",
  [
    "ImmediateActiveSecondsConfig",
    "ScriptPath",
    "WebImmediateActiveSecondsFalcoEvent",
  ],
  function (a, b, c, d, e, f, g) {
    var h = 0;
    function i(a) {
      if (c("ImmediateActiveSecondsConfig").sampling_rate <= 0) return !1;
      a = Math.floor(a / 1e3) % c("ImmediateActiveSecondsConfig").sampling_rate;
      return a === c("ImmediateActiveSecondsConfig").ias_bucket;
    }
    function a(a) {
      if (a >= h && a - h < 1e3) return;
      i(a) &&
        c("WebImmediateActiveSecondsFalcoEvent").logImmediately(function () {
          return {
            activity_time_ms: a,
            last_activity_time_ms: h,
            script_path: c("ScriptPath").getTopViewEndpoint(),
          };
        });
      h = Math.floor(a / 1e3) * 1e3;
    }
    f.exports = { maybeReportActiveSecond: a };
  },
  34
);
