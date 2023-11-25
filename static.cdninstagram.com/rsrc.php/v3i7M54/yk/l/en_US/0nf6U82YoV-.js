/*FB_PKG_DELIM*/

__d(
  "PageHooks",
  ["Arbiter", "ErrorUtils", "InitialJSLoader", "PageEvents"],
  function (a, b, c, d, e, f) {
    var g;
    f = { DOMREADY_HOOK: "domreadyhooks", ONLOAD_HOOK: "onloadhooks" };
    function h() {
      k(l.DOMREADY_HOOK),
        (window.domready = !0),
        b("Arbiter").inform("uipage_onload", !0, "state");
    }
    function i() {
      k(l.ONLOAD_HOOK), (window.loaded = !0);
    }
    function j(a, c) {
      return (g || (g = b("ErrorUtils"))).applyWithGuard(
        a,
        null,
        null,
        function (a) {
          (a.event_type = c), (a.category = "runhook");
        },
        "PageHooks:" + c
      );
    }
    function k(a) {
      var b = a == "onbeforeleavehooks" || a == "onbeforeunloadhooks";
      do {
        var c = window[a];
        if (!c) break;
        b || (window[a] = null);
        for (var d = 0; d < c.length; d++) {
          var e = j(c[d], a);
          if (b && e) return e;
        }
      } while (!b && window[a]);
    }
    function c() {
      window.domready || ((window.domready = !0), k("onloadhooks")),
        window.loaded || ((window.loaded = !0), k("onafterloadhooks"));
    }
    function d() {
      var a, c;
      (a = b("Arbiter")).registerCallback(h, [
        (c = b("PageEvents")).BIGPIPE_DOMREADY,
        b("InitialJSLoader").INITIAL_JS_READY,
      ]);
      a.registerCallback(i, [
        c.BIGPIPE_DOMREADY,
        c.BIGPIPE_ONLOAD,
        b("InitialJSLoader").INITIAL_JS_READY,
      ]);
      a.subscribe(
        c.NATIVE_ONBEFOREUNLOAD,
        function (a, b) {
          (b.warn = k("onbeforeleavehooks") || k("onbeforeunloadhooks")),
            b.warn || ((window.domready = !1), (window.loaded = !1));
        },
        "new"
      );
      a.subscribe(
        c.NATIVE_ONUNLOAD,
        function (a, b) {
          k("onunloadhooks"), k("onafterunloadhooks");
        },
        "new"
      );
    }
    var l = babelHelpers["extends"](
      {
        _domreadyHook: h,
        _onloadHook: i,
        runHook: j,
        runHooks: k,
        keepWindowSetAsLoaded: c,
      },
      f
    );
    d();
    a.PageHooks = e.exports = l;
  },
  null
);
__d(
  "legacy:onload-action",
  ["PageHooks"],
  function (a, b, c, d, e, f) {
    a._domreadyHook = (c = b("PageHooks"))._domreadyHook;
    a._onloadHook = c._onloadHook;
    a.runHook = c.runHook;
    a.runHooks = c.runHooks;
    a.keep_window_set_as_loaded = c.keepWindowSetAsLoaded;
  },
  3
);
__d(
  "Base64",
  [],
  function (a, b, c, d, e, f) {
    var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function h(a) {
      a = (a.charCodeAt(0) << 16) | (a.charCodeAt(1) << 8) | a.charCodeAt(2);
      return String.fromCharCode(
        g.charCodeAt(a >>> 18),
        g.charCodeAt((a >>> 12) & 63),
        g.charCodeAt((a >>> 6) & 63),
        g.charCodeAt(a & 63)
      );
    }
    var i =
      ">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";
    function j(a) {
      a =
        (i.charCodeAt(a.charCodeAt(0) - 43) << 18) |
        (i.charCodeAt(a.charCodeAt(1) - 43) << 12) |
        (i.charCodeAt(a.charCodeAt(2) - 43) << 6) |
        i.charCodeAt(a.charCodeAt(3) - 43);
      return String.fromCharCode(a >>> 16, (a >>> 8) & 255, a & 255);
    }
    var k = {
      encode: function (a) {
        a = unescape(encodeURI(a));
        var b = (a.length + 2) % 3;
        a = (a + "\0\0".slice(b)).replace(/[\s\S]{3}/g, h);
        return a.slice(0, a.length + b - 2) + "==".slice(b);
      },
      decode: function (a) {
        a = a.replace(/[^A-Za-z0-9+\/]/g, "");
        var b = (a.length + 3) & 3;
        a = (a + "AAA".slice(b)).replace(/..../g, j);
        a = a.slice(0, a.length + b - 3);
        try {
          return decodeURIComponent(escape(a));
        } catch (a) {
          throw new Error("Not valid UTF-8");
        }
      },
      encodeObject: function (a) {
        return k.encode(JSON.stringify(a));
      },
      decodeObject: function (a) {
        return JSON.parse(k.decode(a));
      },
      encodeNums: function (a) {
        return String.fromCharCode.apply(
          String,
          a.map(function (a) {
            return g.charCodeAt(
              (a | -(a > 63 ? 1 : 0)) & -(a > 0 ? 1 : 0) & 63
            );
          })
        );
      },
    };
    a = k;
    f["default"] = a;
  },
  66
);
__d(
  "AsyncDOM",
  ["CSS", "DOM", "FBLogger"],
  function (a, b, c, d, e, f) {
    a = {
      invoke: function (a, c) {
        for (var d = 0; d < a.length; ++d) {
          var e = a[d],
            f = e[0],
            g = e[1],
            h = e[2];
          e = e[3];
          h = (h && c) || null;
          g && (h = b("DOM").scry(h || document.documentElement, g)[0]);
          h ||
            b("FBLogger")("async_dom").warn(
              "Could not find relativeTo element for %s AsyncDOM operation based on selector: %s",
              f,
              g
            );
          switch (f) {
            case "hide":
              b("CSS").hide(h);
              break;
            case "show":
              b("CSS").show(h);
              break;
            case "setContent":
              b("DOM").setContent(h, e);
              break;
            case "appendContent":
              b("DOM").appendContent(h, e);
              break;
            case "prependContent":
              b("DOM").prependContent(h, e);
              break;
            case "insertAfter":
              b("DOM").insertAfter(h, e);
              break;
            case "insertBefore":
              b("DOM").insertBefore(h, e);
              break;
            case "remove":
              b("DOM").remove(h);
              break;
            case "replace":
              b("DOM").replace(h, e);
              break;
            default:
              b("FBLogger")("async_dom").warn(
                "Received invalid command %s for AsyncDOM operation",
                f
              );
          }
        }
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "AsyncResponse",
  ["invariant", "Bootloader", "FBLogger", "HTML", "WebDriverConfig"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    a = (function () {
      function a(a, b) {
        (this.error = 0),
          (this.errorSummary = null),
          (this.errorDescription = null),
          (this.onload = null),
          (this.replay = !1),
          (this.payload = b),
          (this.request = a),
          (this.silentError = !1),
          (this.transientError = !1),
          (this.blockedAction = !1),
          (this.is_last = !0),
          (this.responseHeaders = null);
      }
      var b = a.prototype;
      b.getRequest = function () {
        return this.request;
      };
      b.getPayload = function () {
        return this.payload;
      };
      b.toError = function () {
        this.error !== 0 || h(0, 5599);
        var a = this.errorSummary || "",
          b = this.getErrorDescriptionString() || "",
          c = new Error(a.toString() + ": " + b);
        Object.assign(c, {
          code: this.error,
          description: this.errorDescription || "",
          descriptionString: b,
          response: this,
          summary: a,
          isSilent: this.silentError,
          isTransient: this.transientError,
        });
        return c;
      };
      b.getError = function () {
        return this.error;
      };
      b.getErrorSummary = function () {
        return this.errorSummary;
      };
      b.setErrorSummary = function (a) {
        a = a === void 0 ? null : a;
        this.errorSummary = a;
        return this;
      };
      b.getErrorDescription = function () {
        return this.errorDescription;
      };
      b.getErrorDescriptionString = function () {
        var a = this.getErrorDescription();
        if (a == null) return null;
        if (c("HTML").isHTML(a)) {
          var b = new (c("HTML"))(a);
          return b.getRootNode().textContent;
        }
        return a.toString();
      };
      b.getErrorIsWarning = function () {
        return !!this.errorIsWarning;
      };
      b.isSilent = function () {
        return !!this.silentError;
      };
      b.isTransient = function () {
        return !!this.transientError;
      };
      b.isBlockedAction = function () {
        return !!this.blockedAction;
      };
      b.getResponseHeader = function (a) {
        var b = this.responseHeaders;
        if (!b) return null;
        b = b.replace(/^\n/, "");
        a = a.toLowerCase();
        b = b.split("\r\n");
        for (var c = 0; c < b.length; ++c) {
          var d = b[c],
            e = d.indexOf(": ");
          if (e <= 0) continue;
          var f = d.substring(0, e).toLowerCase();
          if (f === a) return d.substring(e + 2);
        }
        return null;
      };
      a.defaultErrorHandler = function (b) {
        try {
          !b.silentError
            ? a.verboseErrorHandler(b)
            : c("FBLogger")("async_response")
                .catching(b.toError())
                .warn("default error handler called");
        } catch (a) {
          alert(b);
        }
      };
      a.verboseErrorHandler = function (a, b) {
        c("Bootloader").loadModules(
          ["ExceptionDialog"],
          function (c) {
            return c.showAsyncError(a, b);
          },
          "AsyncResponse"
        );
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "FetchStreamConfig",
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({ delim: "/*<!-- fetch-stream -->*/" });
    f["default"] = a;
  },
  66
);
__d(
  "StreamBlockReader",
  ["Promise", "regeneratorRuntime"],
  function (a, b, c, d, e, f) {
    var g;
    a = (function () {
      function a(a) {
        var c = this;
        if (!a.getReader)
          throw new Error("No getReader method found on given object");
        this.$3 = a.getReader();
        this.$1 = "";
        this.$2 = null;
        this.$4 = !1;
        this.$5 = "utf-8";
        this.$6 = "";
        this.$9 = !1;
        this.$8 = function () {
          return (g || (g = b("Promise"))).reject(
            "Sorry, you are somehow using this too early."
          );
        };
        this.$7 = new (g || (g = b("Promise")))(function (a, b) {
          c.$8 = a;
        });
      }
      var c = a.prototype;
      c.changeEncoding = function (a) {
        if (this.$2)
          throw new Error("Decoder already in use, encoding cannot be changed");
        this.$5 = a;
      };
      c.$10 = function () {
        if (!self.TextDecoder)
          throw new Error("TextDecoder is not supported here");
        this.$2 || (this.$2 = new self.TextDecoder(this.$5));
        return this.$2;
      };
      c.$11 = function () {
        if (this.$9)
          throw new Error("Something else is already reading from this reader");
        this.$9 = !0;
      };
      c.$12 = function () {
        this.$9 = !1;
      };
      c.isDone = function () {
        return this.$4;
      };
      c.$13 = function () {
        var a, c, d, e;
        return b("regeneratorRuntime").async(
          function (f) {
            while (1)
              switch ((f.prev = f.next)) {
                case 0:
                  if (!(this.$6 !== "")) {
                    f.next = 4;
                    break;
                  }
                  a = this.$6;
                  this.$6 = "";
                  return f.abrupt("return", a);
                case 4:
                  if (!this.isDone()) {
                    f.next = 6;
                    break;
                  }
                  throw new Error("You cannot read from a stream that is done");
                case 6:
                  f.next = 8;
                  return b("regeneratorRuntime").awrap(this.$3.read());
                case 8:
                  c = f.sent;
                  d = c.done;
                  e = c.value;
                  this.$4 = d;
                  d && this.$8();
                  return f.abrupt(
                    "return",
                    e ? this.$10().decode(e, { stream: !d }) : ""
                  );
                case 14:
                case "end":
                  return f.stop();
              }
          },
          null,
          this
        );
      };
      c.readNextBlock = function () {
        var a;
        return b("regeneratorRuntime").async(
          function (b) {
            while (1)
              switch ((b.prev = b.next)) {
                case 0:
                  this.$11();
                  a = this.$13();
                  this.$12();
                  return b.abrupt("return", a);
                case 4:
                case "end":
                  return b.stop();
              }
          },
          null,
          this
        );
      };
      c.readUntilStringOrEnd = function (a) {
        return b("regeneratorRuntime").async(
          function (c) {
            while (1)
              switch ((c.prev = c.next)) {
                case 0:
                  c.next = 2;
                  return b("regeneratorRuntime").awrap(
                    this.readUntilOneOfStringOrEnd_DO_NOT_USE([a])
                  );
                case 2:
                  return c.abrupt("return", c.sent);
                case 3:
                case "end":
                  return c.stop();
              }
          },
          null,
          this
        );
      };
      c.readUntilStringOrThrow = function (a) {
        var c, d, e;
        return b("regeneratorRuntime").async(
          function (f) {
            while (1)
              switch ((f.prev = f.next)) {
                case 0:
                  if (a) {
                    f.next = 2;
                    break;
                  }
                  throw new Error("cannot read empty string");
                case 2:
                  this.$11(), (c = ""), (d = 0);
                case 5:
                  if (this.isDone()) {
                    f.next = 23;
                    break;
                  }
                  f.t0 = c;
                  f.next = 9;
                  return b("regeneratorRuntime").awrap(this.$13());
                case 9:
                  c = f.t0 += f.sent;
                  if (!(c.length < a.length)) {
                    f.next = 12;
                    break;
                  }
                  return f.abrupt("continue", 5);
                case 12:
                  e = c.substring(d).indexOf(a);
                  if (!(e !== -1)) {
                    f.next = 20;
                    break;
                  }
                  e += d;
                  this.$6 = c.substring(e + a.length);
                  this.$12();
                  return f.abrupt("return", c.substring(0, e));
                case 20:
                  d = c.length - a.length + 1;
                case 21:
                  f.next = 5;
                  break;
                case 23:
                  this.$6 = c;
                  this.$12();
                  throw new Error("Breakpoint not found");
                case 26:
                case "end":
                  return f.stop();
              }
          },
          null,
          this
        );
      };
      c.readUntilOneOfStringOrEnd_DO_NOT_USE = function (a) {
        var c, d, e, f;
        return b("regeneratorRuntime").async(
          function (g) {
            while (1)
              switch ((g.prev = g.next)) {
                case 0:
                  this.$11(), (c = "");
                case 2:
                  if (this.isDone()) {
                    g.next = 20;
                    break;
                  }
                  g.t0 = c;
                  g.next = 6;
                  return b("regeneratorRuntime").awrap(this.$13());
                case 6:
                  (c = g.t0 += g.sent), (d = 0);
                case 8:
                  if (!(d < a.length)) {
                    g.next = 18;
                    break;
                  }
                  e = a[d];
                  f = c.indexOf(e);
                  if (!(f !== -1)) {
                    g.next = 15;
                    break;
                  }
                  this.$6 = c.substring(f + e.length);
                  this.$12();
                  return g.abrupt("return", c.substring(0, f));
                case 15:
                  d++;
                  g.next = 8;
                  break;
                case 18:
                  g.next = 2;
                  break;
                case 20:
                  this.$12();
                  return g.abrupt("return", c);
                case 22:
                case "end":
                  return g.stop();
              }
          },
          null,
          this
        );
      };
      c.waitUntilDone = function () {
        return b("regeneratorRuntime").async(
          function (a) {
            while (1)
              switch ((a.prev = a.next)) {
                case 0:
                  return a.abrupt("return", this.$7);
                case 1:
                case "end":
                  return a.stop();
              }
          },
          null,
          this
        );
      };
      return a;
    })();
    f["default"] = a;
  },
  66
);
__d(
  "FetchStreamTransport",
  [
    "ArbiterMixin",
    "FetchStreamConfig",
    "StreamBlockReader",
    "TimeSlice",
    "URI",
    "asyncToGeneratorRuntime",
    "mixin",
    "nullthrows",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i = 0;
    a = (function (a) {
      babelHelpers.inheritsLoose(d, a);
      function d(b) {
        var c;
        if (!self.ReadableStream || !self.fetch || !Request || !TextDecoder)
          throw new Error("fetch stream transport is not supported here");
        c = a.call(this) || this;
        c.$FetchStreamTransport$p_6 = null;
        c.$FetchStreamTransport$p_1 = b;
        c.$FetchStreamTransport$p_3 = !1;
        c.$FetchStreamTransport$p_4 = !1;
        c.$FetchStreamTransport$p_5 = !1;
        c.$FetchStreamTransport$p_2 = ++i;
        return (
          babelHelpers.assertThisInitialized(c) ||
          babelHelpers.assertThisInitialized(c)
        );
      }
      var e = d.prototype;
      e.hasFinished = function () {
        return this.$FetchStreamTransport$p_5;
      };
      e.getRequestURI = function () {
        return new (h || (h = c("URI")))(
          this.$FetchStreamTransport$p_1
        ).addQueryData({
          __a: 1,
          __adt: this.$FetchStreamTransport$p_2,
          __req: "fetchstream_" + this.$FetchStreamTransport$p_2,
          ajaxpipe_fetch_stream: 1,
        });
      };
      e.send = function () {
        if (this.$FetchStreamTransport$p_3)
          throw new Error("FetchStreamTransport instances cannot be re-used.");
        this.$FetchStreamTransport$p_3 = !0;
        var a = new Request(this.getRequestURI().toString(), {
          mode: "same-origin",
          credentials: "include",
        });
        this.$FetchStreamTransport$p_6 = c("TimeSlice").getGuardedContinuation(
          "FetchStreamTransport: waiting on first response"
        );
        a = self.fetch(a, { redirect: "follow" });
        this.$FetchStreamTransport$p_7(a);
      };
      e.$FetchStreamTransport$p_7 = (function () {
        var a = b("asyncToGeneratorRuntime").asyncToGenerator(function* (a) {
          var b = this,
            d;
          try {
            d = yield a;
          } catch (a) {
            this.abort();
          }
          if (!d || !d.body || !d.ok) {
            this.abort();
            return;
          }
          var e = new (c("StreamBlockReader"))(d.body);
          a = function* () {
            var a = yield e.readUntilStringOrEnd(c("FetchStreamConfig").delim);
            if (b.$FetchStreamTransport$p_4) return "break";
            c("nullthrows")(b.$FetchStreamTransport$p_6)(function () {
              var d = JSON.parse(a);
              e.isDone() || d.finished
                ? (b.$FetchStreamTransport$p_5 = !0)
                : (b.$FetchStreamTransport$p_6 = c(
                    "TimeSlice"
                  ).getGuardedContinuation(
                    "FetchStreamTransport: waiting on next response"
                  ));
              b.inform("response", d.content);
            });
          };
          while (
            !this.$FetchStreamTransport$p_5 &&
            !this.$FetchStreamTransport$p_4
          ) {
            var f = yield* a();
            if (f === "break") break;
          }
        });
        function d(b) {
          return a.apply(this, arguments);
        }
        return d;
      })();
      e.abort = function () {
        var a = this;
        if (this.$FetchStreamTransport$p_4 || this.$FetchStreamTransport$p_5)
          return;
        this.$FetchStreamTransport$p_4 = !0;
        this.$FetchStreamTransport$p_5 = !0;
        if (this.$FetchStreamTransport$p_6) {
          var b = this.$FetchStreamTransport$p_6;
          b(function () {
            a.inform("abort");
          });
        } else this.inform("abort");
      };
      return d;
    })(c("mixin")(c("ArbiterMixin")));
    g["default"] = a;
  },
  98
);
__d(
  "HTTPErrors",
  ["emptyFunction"],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      return { summary: "HTTP Error", description: "Unknown HTTP error #" + a };
    }
    b = { get: a, getAll: c("emptyFunction").thatReturns(new Map()) };
    d = b;
    g["default"] = d;
  },
  98
);
__d(
  "JSONPTransport",
  ["ArbiterMixin", "DOM", "HTML", "TimeSlice", "URI", "mixin", "setTimeout"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = {},
      j = 2;
    function k(a) {
      delete i[a];
    }
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b) {
        var c;
        c = a.call(this) || this;
        c.$JSONPTransport$p_3 = !1;
        c.$JSONPTransport$p_7 = b;
        i[c.getID()] = babelHelpers.assertThisInitialized(c);
        return c;
      }
      var d = b.prototype;
      d.getID = function () {
        return this.$JSONPTransport$p_4 || (this.$JSONPTransport$p_4 = j++);
      };
      d.hasFinished = function () {
        return !(this.getID() in i);
      };
      d.getRequestURI = function () {
        return new (h || (h = c("URI")))(this.$JSONPTransport$p_7).addQueryData(
          { __a: 1, __adt: this.getID(), __req: "jsonp_" + this.getID() }
        );
      };
      d.getTransportFrame = function () {
        if (this.$JSONPTransport$p_5) return this.$JSONPTransport$p_5;
        var a = "transport_frame_" + this.getID();
        a = c("HTML")(
          '<iframe class="hidden_elem" name="' +
            a +
            '" src="javascript:void(0)" />'
        );
        return (this.$JSONPTransport$p_5 = c("DOM").appendContent(
          document.body,
          a
        )[0]);
      };
      d.send = function () {
        var a = this;
        this.getTransportFrame().onload = function () {
          return a.$JSONPTransport$p_8();
        };
        this.getTransportFrame().src = this.getRequestURI().toString();
        this.$JSONPTransport$p_2 = c("TimeSlice").getGuardedContinuation(
          "JSONPTransport: waiting for first response"
        );
      };
      d.handleResponse = function (a) {
        var b = this;
        this.$JSONPTransport$p_2 == null
          ? void 0
          : this.$JSONPTransport$p_2(function () {
              b.inform("response", a),
                b.hasFinished()
                  ? c("setTimeout")(function () {
                      return b.$JSONPTransport$p_9();
                    }, 0)
                  : (b.$JSONPTransport$p_2 = c(
                      "TimeSlice"
                    ).getGuardedContinuation(
                      "JSONPTransport: waiting for next response"
                    ));
            });
      };
      d.abort = function () {
        if (this.$JSONPTransport$p_1) return;
        this.$JSONPTransport$p_1 = !0;
        this.$JSONPTransport$p_9();
        k(this.getID());
        this.inform("abort");
      };
      d.$JSONPTransport$p_8 = function () {
        this.$JSONPTransport$p_3 || this.abort();
      };
      d.$JSONPTransport$p_9 = function () {
        this.$JSONPTransport$p_5 &&
          (c("DOM").remove(this.$JSONPTransport$p_5),
          (this.$JSONPTransport$p_5 = null));
      };
      return b;
    })(c("mixin")(c("ArbiterMixin")));
    a.respond = function (a, b, c) {
      var d = i[a];
      if (d) {
        d.$JSONPTransport$p_3 = !0;
        c || k(a);
        b;
        if (typeof b === "string") c = JSON.parse(b);
        else {
          c = JSON.parse((a = JSON.stringify(b)) != null ? a : "null");
        }
        d.handleResponse(c);
      }
    };
    a.respond = c("TimeSlice").guard(a.respond, "JSONPTransport.respond", {
      root: !0,
    });
    g["default"] = a;
  },
  98
);
__d(
  "SessionName",
  ["SessionNameConfig"],
  function (a, b, c, d, e, f) {
    e.exports = {
      getName: function () {
        return b("SessionNameConfig").seed;
      },
    };
  },
  null
);
__d(
  "bind",
  [],
  function (a, b, c, d, e, f) {
    function a(a, b) {
      var c = Array.prototype.slice.call(arguments, 2);
      if (typeof b !== "string")
        return Function.prototype.bind.apply(b, [a].concat(c));
      function d() {
        var d = c.concat(Array.prototype.slice.call(arguments));
        if (a[b]) return a[b].apply(a, d);
      }
      d.toString = function () {
        return "bound lazily: " + a[b];
      };
      return d;
    }
    e.exports = a;
  },
  null
);
__d(
  "executeAfter",
  [],
  function (a, b, c, d, e, f) {
    function a(a, b, c) {
      return function () {
        a.apply(c || this, arguments), b.apply(c || this, arguments);
      };
    }
    e.exports = a;
  },
  null
);
__d(
  "isSparkDotMetaDotComURI",
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)spark\\.meta\\.com$", "i"),
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
  "AsyncRequest",
  [
    "errorCode",
    "fbt",
    "invariant",
    "Arbiter",
    "AsyncDOM",
    "AsyncRequestConfig",
    "AsyncResponse",
    "Bootloader",
    "CSS",
    "DTSG",
    "DTSG_ASYNC",
    "Deferred",
    "Env",
    "ErrorGuard",
    "Event",
    "FBLogger",
    "FetchStreamTransport",
    "HTTPErrors",
    "HasteResponse",
    "PHPQuerySerializer",
    "Parent",
    "Promise",
    "ResourceTimingsStore",
    "ResourceTypes",
    "ScriptPath",
    "ServerJS",
    "SessionName",
    "TimeSlice",
    "URI",
    "UserAgent_DEPRECATED",
    "ZeroRewrites",
    "bind",
    "clearTimeout",
    "emptyFunction",
    "executeAfter",
    "fb-error",
    "ge",
    "getAsyncHeaders",
    "getAsyncParams",
    "gkx",
    "goURI",
    "isBulletinDotComURI",
    "isEmpty",
    "isFacebookURI",
    "isHorizonDotMetaDotComURI",
    "isInternalFBURI",
    "isMessengerDotComURI",
    "isSparkDotMetaDotComURI",
    "isWorkDotMetaDotComURI",
    "isWorkplaceDotComURI",
    "isWorkroomsDotComURI",
    "performanceAbsoluteNow",
    "promiseDone",
    "replaceTransportMarkers",
    "setTimeout",
    "setTimeoutAcrossTransitions",
    "unrecoverableViolation",
    "uriIsRelativePath",
  ],
  function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    var k, l, m, n, o, p, q;
    f = 19e3;
    h = 500;
    var r = 1006,
      s = 1004,
      t = 1010,
      u = new Set([h, t, s, r]);
    function v() {
      try {
        return !window.domready;
      } catch (a) {
        return !0;
      }
    }
    function w(a) {
      return "onprogress" in a;
    }
    function x(a) {
      return "upload" in a && "onprogress" in a.upload;
    }
    function y(a) {
      return "withCredentials" in a;
    }
    function z(a) {
      return a.status in { 0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1 };
    }
    function A(a) {
      a = !a || typeof a === "function";
      a ||
        c("FBLogger")("asyncresponse").mustfix(
          "AsyncRequest response handlers must be functions. Pass a function, or use bind() to build one."
        );
      return a;
    }
    var B = 2,
      C = B,
      D = !1;
    c("Arbiter").subscribe("page_transition", function (a, b) {
      !D ? (C = b.id) : (D = !1);
    });
    var E = "for (;;);",
      F = E.length,
      G = (function () {
        function a(b) {
          var e = this,
            f;
          this._allowIrrelevantRequests = !1;
          this._delayPreDisplayJS = !1;
          this._shouldReplaceTransportMarkers = !1;
          this._dispatchErrorResponse = function (a, b) {
            var d = a.getError();
            e.clearStatusIndicator();
            if (!e._isRelevant() || d === t) {
              e.abort();
              return;
            }
            if (e._isServerDialogErrorCode(d)) {
              var f = d == 1357008 || d == 1357007;
              e.interceptHandler(a);
              d == 1357041
                ? e._solveQuicksandChallenge(a)
                : d == 1357007
                ? e._displayServerDialog(a, f, !0)
                : e._displayServerDialog(a, f);
            } else if (e.initialHandler(a) !== !1) {
              c("clearTimeout")(e.timer);
              try {
                b(a);
              } catch (b) {
                e.finallyHandler(a);
                throw b;
              }
              e.finallyHandler(a);
            }
          };
          this._onStateChange = function () {
            var b = e.transport;
            if (!b) return;
            try {
              a._inflightCount--;
              d("ResourceTimingsStore").measureResponseReceived(
                c("ResourceTypes").XHR,
                e.resourceTimingStoreUID
              );
              try {
                b.getResponseHeader("X-FB-Debug") &&
                  ((e._xFbServer = b.getResponseHeader("X-FB-Debug")),
                  c("fb-error").ErrorXFBDebug.add(e._xFbServer));
              } catch (a) {}
              if (b.status >= 200 && b.status < 300)
                (a.lastSuccessTime = Date.now()), e._handleXHRResponse(b);
              else if (
                d("UserAgent_DEPRECATED").webkit() &&
                typeof b.status === "undefined"
              )
                e._invokeErrorHandler(1002);
              else if (
                c("AsyncRequestConfig").retryOnNetworkError &&
                z(b) &&
                e.remainingRetries > 0 &&
                !e._requestTimeout
              ) {
                e.remainingRetries--;
                delete e.transport;
                e.send(!0);
                return;
              } else e._invokeErrorHandler();
              e.getOption("asynchronous_DEPRECATED") !== !1 &&
                delete e.transport;
            } catch (a) {
              if (v()) return;
              delete e.transport;
              e.remainingRetries > 0
                ? (e.remainingRetries--, e.send(!0))
                : (e.getOption("suppressErrorAlerts") ||
                    c("FBLogger")("AsyncRequest")
                      .catching(a)
                      .mustfix(
                        "AsyncRequest exception when attempting to handle a state change"
                      ),
                  e._invokeErrorHandler(1007));
            }
          };
          this._handleTimeout = function () {
            e.continuation.last(function () {
              e._requestTimeout = !0;
              var a = e.timeoutHandler;
              e.abandon();
              a && a(e);
              c("setTimeout")(function () {
                c("Arbiter").inform("AsyncRequest/timeout", { request: e });
              }, 0);
            });
          };
          this.continuation =
            c("TimeSlice").getPlaceholderReusableContinuation();
          this.transport = null;
          this.method = "POST";
          this.uri = "";
          this.timeout = null;
          this.timer = null;
          this.initialHandler = f = c("emptyFunction");
          this.handler = null;
          this.uploadProgressHandler = null;
          this.errorHandler = c("AsyncResponse").defaultErrorHandler;
          this.transportErrorHandler = null;
          this.timeoutHandler = null;
          this.interceptHandler = f;
          this.finallyHandler = f;
          this.abortHandler = f;
          this.serverDialogCancelHandler = null;
          this.relativeTo = null;
          this.statusElement = null;
          this.statusClass = "";
          this.data = {};
          this.headers = {};
          this.file = null;
          this.context = {};
          this.readOnly = !1;
          this.writeRequiredParams = [];
          this.remainingRetries = 0;
          this.userActionID = "-";
          this.resourceTimingStoreUID = d("ResourceTimingsStore").getUID(
            c("ResourceTypes").XHR,
            b != null ? b.toString() : ""
          );
          this.flushedResponseTextParseIndex = 0;
          this.option = {
            asynchronous_DEPRECATED: !0,
            suppressErrorHandlerWarning: !1,
            suppressEvaluation: !1,
            suppressErrorAlerts: !1,
            retries: 0,
            bundle: !1,
            useIframeTransport: !1,
            handleErrorAfterUnload: !1,
            useFetchWithIframeFallback: !1,
          };
          this.transportErrorHandler = c("bind")(this, "errorHandler");
          b !== void 0 && this.setURI(b);
          this.setAllowCrossPageTransition(
            c("AsyncRequestConfig").asyncRequestsSurviveTransitionsDefault || !1
          );
        }
        var f = a.prototype;
        f._dispatchResponse = function (a) {
          this.clearStatusIndicator();
          if (!this._isRelevant()) {
            this._invokeErrorHandler(t);
            return;
          }
          if (this.initialHandler(a) === !1) return;
          c("clearTimeout")(this.timer);
          var b,
            d = this.getHandler();
          if (d)
            try {
              b = this._shouldSuppressJS(d(a));
            } catch (b) {
              a.is_last && this.finallyHandler(a);
              throw b;
            }
          b || this._handleJSResponse(a);
          a.is_last && this.finallyHandler(a);
        };
        f._shouldSuppressJS = function (b) {
          return b === a.suppressOnloadToken;
        };
        f._handlePreDisplayServerJS = function (a, b) {
          var d = !1,
            e = [],
            f = function () {
              if (d) {
                c("FBLogger")("AsyncResponse").warn(
                  "registerToBlockDisplayUntilDone_DONOTUSE called after AsyncResponse display started. This is a no-op."
                );
                return function () {};
              }
              var a,
                b = new (c("Deferred"))();
              e.push(b.getPromise());
              return c("TimeSlice").guard(
                function () {
                  a && c("clearTimeout")(a), b.resolve();
                },
                "AsyncRequestDisplayBlockingEvent",
                { propagationType: c("TimeSlice").PropagationType.EXECUTION }
              );
            };
          a.handle(b, {
            bigPipeContext: { registerToBlockDisplayUntilDone_DONOTUSE: f },
          });
          d = !0;
          return e;
        };
        f._hasEvalDomOp = function (a) {
          return a && a.length
            ? a.some(function (a) {
                return a[0] === "eval";
              })
            : !1;
        };
        f._handleJSResponse = function (a) {
          var b = this.getRelativeTo(),
            e = a.domops,
            f = a.dtsgToken,
            g = a.dtsgAsyncGetToken,
            h = a.jsmods,
            i = a.savedServerJSInstance;
          i && i instanceof c("ServerJS")
            ? (i = i)
            : (i = new (c("ServerJS"))());
          i.setRelativeTo(b);
          if (h) {
            var j = {
              define: h.define,
              instances: h.instances,
              markup: h.markup,
            };
            delete h.define;
            delete h.instances;
            delete h.markup;
            this._hasEvalDomOp(e) &&
              ((j.elements = h.elements), delete h.elements);
            i.handle(j);
          }
          j = new (m || (m = c("URI")))(this.uri);
          ((!j.getDomain() && !j.getProtocol()) ||
            document.location.origin === j.getOrigin()) &&
            (f && d("DTSG").setToken(f), g && d("DTSG_ASYNC").setToken(g));
          e &&
            (q || (q = c("ErrorGuard"))).applyWithGuard(
              function () {
                return d("AsyncDOM").invoke(e, b);
              },
              null,
              [],
              { errorType: "warn" }
            );
          h && i.handle(h);
          this._handleJSRegisters(a, "onload");
          this._handleJSRegisters(a, "onafterload");
        };
        f._handleJSRegisters = function (a, b) {
          a = a[b];
          if (a)
            for (b = 0; b < a.length; b++) {
              var d = null,
                e = a[b],
                f = e.match(/^\"caller:([^\"]+?)\";(.*)/);
              f != null && ((d = f[1]), (e = f[2]));
              (q || (q = c("ErrorGuard"))).applyWithGuard(
                new Function(e),
                this,
                []
              );
              c("FBLogger")("comet_infra").info(
                "Detected dynamic new Function(...) call in AsyncRequest._handleJSRegisters(...).",
                new (m || (m = c("URI")))(this.uri).getPath(),
                d
              );
            }
        };
        f.invokeResponseHandler = function (a) {
          var e = this;
          if (typeof a.redirect !== "undefined") {
            c("setTimeout")(function () {
              e.setURI(a.redirect, !0).send();
            }, 0);
            return;
          }
          if (a.bootloadOnly !== void 0) {
            var f =
                typeof a.bootloadOnly === "string"
                  ? JSON.parse(a.bootloadOnly)
                  : a.bootloadOnly,
              g = function (a) {
                c("TimeSlice").guard(
                  function () {
                    c("Bootloader").loadPredictedResourceMap(a);
                  },
                  "Bootloader.loadPredictedResourceMap",
                  { root: !0 }
                )();
              };
            for (f of f) g(f);
            return;
          }
          if (
            !this.handler &&
            !this.errorHandler &&
            !this.transportErrorHandler &&
            !this.preBootloadHandler &&
            this.initialHandler === c("emptyFunction") &&
            this.finallyHandler === c("emptyFunction")
          )
            return;
          var h = a.asyncResponse;
          if (typeof h !== "undefined") {
            if (!this._isRelevant()) {
              this._invokeErrorHandler(t);
              return;
            }
            h.updateScriptPath &&
              c("ScriptPath").set(
                h.updateScriptPath.path,
                h.updateScriptPath.token,
                h.updateScriptPath.extra_info
              );
            h.lid && ((this._responseTime = Date.now()), (this.lid = h.lid));
            d("HasteResponse").handleSRPayload((g = h.hsrp) != null ? g : {});
            var i, j;
            if (h.getError() && !h.getErrorIsWarning()) {
              f = this.getErrorHandler().bind(this);
              i = (q || (q = c("ErrorGuard"))).guard(
                this._dispatchErrorResponse,
                {
                  name:
                    "AsyncRequest#_dispatchErrorResponse for " + this.getURI(),
                }
              );
              i = i.bind(this, h, f);
              j = "error";
            } else {
              i = (q || (q = c("ErrorGuard"))).guard(
                this._dispatchResponse.bind(this),
                { name: "AsyncRequest#_dispatchResponse for " + this.getURI() }
              );
              i = i.bind(this, h);
              j = "response";
              g = h.domops;
              if (
                !this._delayPreDisplayJS &&
                h.jsmods &&
                h.jsmods.pre_display_requires &&
                !this._hasEvalDomOp(g)
              ) {
                f = h.jsmods;
                g = {
                  define: f.define,
                  instances: f.instances,
                  markup: f.markup,
                };
                delete f.define;
                delete f.instances;
                delete f.markup;
                g.pre_display_requires = f.pre_display_requires;
                delete f.pre_display_requires;
                f = new (c("ServerJS"))();
                f.setRelativeTo(this.getRelativeTo());
                h.savedServerJSInstance = f;
                var k = this._handlePreDisplayServerJS(f, g);
                if (k && k.length) {
                  var m = i;
                  i = function () {
                    c("promiseDone")((l || (l = b("Promise"))).all(k).then(m));
                  };
                }
              }
            }
            var o = (n || (n = c("performanceAbsoluteNow")))();
            i = c("executeAfter")(i, function () {
              c("Arbiter").inform("AsyncRequest/" + j, {
                request: e,
                response: h,
                ts: o,
              });
            });
            this.preBootloadHandler && this.preBootloadHandler(h);
            c("Bootloader").loadResources(
              (f = h.allResources) != null ? f : [],
              {
                onAll: c("AsyncRequestConfig").immediateDispatch
                  ? i
                  : function () {
                      c("setTimeout")(i, 0);
                    },
              }
            );
          } else
            typeof a.transportError !== "undefined"
              ? this._xFbServer
                ? this._invokeErrorHandler(1008)
                : this._invokeErrorHandler(1012)
              : this._invokeErrorHandler(1007);
        };
        f._invokeErrorHandler = function (a) {
          var b = this,
            d = this.transport;
          if (!d) return;
          var e;
          if (this.responseText === "") e = 1002;
          else if (this._requestAborted) e = 1011;
          else {
            try {
              e = a || d.status || s;
            } catch (a) {
              e = 1005;
            }
            !1 === navigator.onLine && (e = r);
          }
          var f, g;
          a = !0;
          if (e === r)
            (g = i._("No Network Connection")),
              (f = i._(
                "Your browser appears to be offline. Please check your internet connection and try again."
              ));
          else if (e >= 300 && e <= 399) {
            g = i._("Redirection");
            f = i._(
              "Your access to Facebook was redirected or blocked by a third party at this time, please contact your ISP or reload."
            );
            var h = d.getResponseHeader("Location");
            h && c("goURI")(h, !0);
            a = !0;
          } else
            (g = i._("Oops")),
              (f = i._(
                "Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again."
              ));
          var j = new (c("AsyncResponse"))(this, d);
          Object.assign(j, {
            error: e,
            errorSummary: g,
            errorDescription: f,
            silentError: a,
          });
          c("setTimeout")(function () {
            c("Arbiter").inform("AsyncRequest/error", {
              request: b,
              response: j,
            });
          }, 0);
          if (v() && !this.getOption("handleErrorAfterUnload")) return;
          if (!this.transportErrorHandler) {
            c("FBLogger")("asyncresponse").mustfix(
              "Async request to %s failed with a %d error, but there was no error handler available to deal with it.",
              this.getURI(),
              e
            );
            return;
          }
          h = this.getTransportErrorHandler().bind(this);
          !(this.getOption("suppressErrorAlerts") || u.has(e))
            ? c("FBLogger")("asyncresponse")
                .addToCategoryKey(String(e))
                .mustfix(
                  "Async request failed with error %s: %s when requesting %s",
                  e,
                  f.toString(),
                  this.getURI()
                )
            : u.has(e) &&
              c("FBLogger")("asyncresponse")
                .addToCategoryKey(String(e))
                .warn(
                  "Async request failed with error %s: %s when requesting %s",
                  e,
                  f.toString(),
                  this.getURI()
                );
          (q || (q = c("ErrorGuard"))).applyWithGuard(
            this._dispatchErrorResponse,
            this,
            [j, h]
          );
        };
        f._isServerDialogErrorCode = function (a) {
          return (
            a == 1357008 ||
            a == 1357007 ||
            a == 1357041 ||
            a == 1442002 ||
            a == 1357001
          );
        };
        f._solveQuicksandChallenge = function (a) {
          var b = this,
            d = a.getPayload();
          c("Bootloader").loadModules(
            ["QuickSandSolver"],
            function (a) {
              a.solveAndSendRequestBack(b, d);
            },
            "AsyncRequest"
          );
        };
        f._displayServerDialog = function (a, b, d) {
          var e = this;
          d === void 0 && (d = !1);
          var f = a.getPayload();
          if (f.__dialog !== void 0) {
            this._displayServerLegacyDialog(a, b);
            return;
          }
          b = f.__dialogx;
          new (c("ServerJS"))().handle(b);
          if (f.__should_use_mwa_reauth === !0) {
            c("Bootloader").loadModules(
              ["MWADeveloperReauthBarrier"],
              function (b) {
                b.registerRequest(f.__dialogID, e, a);
              },
              "AsyncRequest"
            );
            return;
          }
          c("Bootloader").loadModules(
            ["ConfirmationDialog"],
            function (b) {
              b.setupConfirmation(a, e, d);
            },
            "AsyncRequest"
          );
        };
        f._displayServerLegacyDialog = function (a, b) {
          var d = this,
            e = a.getPayload().__dialog;
          if (c("gkx")("708253")) {
            var f;
            c("FBLogger")("comet_infra")
              .addMetadata("COMET_INFRA", "ERROR_CODE", a.getError().toString())
              .addMetadata(
                "COMET_INFRA",
                "ERROR_URL",
                (f = (f = a.request) == null ? void 0 : f.getURI()) != null
                  ? f
                  : "unknown"
              )
              .mustfix(
                "AsyncRequest._displayServerLegacyDialog called in Comet"
              );
          }
          c("Bootloader").loadModules(
            ["Dialog"],
            function (c) {
              c = new c(e);
              b && c.setHandler(d._displayConfirmationHandler.bind(d, c));
              c.setCancelHandler(function () {
                var b = d.getServerDialogCancelHandler();
                try {
                  b && b(a);
                } catch (a) {
                  throw a;
                } finally {
                  d.finallyHandler(a);
                }
              })
                .setCausalElement(d.relativeTo)
                .show();
            },
            "AsyncRequest"
          );
        };
        f._displayConfirmationHandler = function (a) {
          (this.data.confirmed = 1),
            Object.assign(this.data, a.getFormData()),
            this.send();
        };
        f._setJSONPTransport = function (a) {
          a.subscribe("response", this._handleJSONPResponse.bind(this)),
            a.subscribe("abort", this._handleJSONPAbort.bind(this)),
            (this.transport = a);
        };
        f._handleJSONPResponse = function (a, b) {
          a = this.transport;
          if (!a) return;
          b.bootloadOnly || (this.is_first = this.is_first === void 0);
          b = this._interpretResponse(b);
          b.asyncResponse &&
            ((b.asyncResponse.is_first = this.is_first),
            (b.asyncResponse.is_last = a.hasFinished()));
          this.invokeResponseHandler(b);
          a.hasFinished() && delete this.transport;
        };
        f._handleJSONPAbort = function () {
          this._invokeErrorHandler(), delete this.transport;
        };
        f._handleXHRResponse = function (a) {
          var b;
          if (this.getOption("suppressEvaluation"))
            b = { asyncResponse: new (c("AsyncResponse"))(this, a) };
          else
            try {
              this._handleFlushedResponse();
              a = a.responseText;
              a = this._filterOutFlushedText(a);
              a = this._unshieldResponseText(a);
              a = JSON.parse(a);
              b = this._interpretResponse(a);
            } catch (a) {
              (b = a.message),
                c("FBLogger")("async_request")
                  .catching(a)
                  .warn("Failed to handle response");
            }
          this.invokeResponseHandler(b);
        };
        f._handleFlushedResponse = function () {
          var a = this.flushedResponseHandler,
            b = this.transport;
          if (a && b) {
            var c = b.responseText.indexOf(E);
            c = c === -1 ? b.responseText.length : c;
            a(b.responseText.substring(this.flushedResponseTextParseIndex, c));
            this.flushedResponseTextParseIndex = c;
          }
        };
        f._unshieldResponseText = function (a) {
          if (a.length <= F) throw new Error("Response too short on async");
          var b = 0;
          while (a.charAt(b) == " " || a.charAt(b) == "\n") b++;
          b && a.substring(b, b + F) == E;
          return a.substring(b + F);
        };
        f._filterOutFlushedText = function (a) {
          if (!this.flushedResponseHandler) return a;
          var b = a.indexOf(E);
          return b < 0 ? a : a.substr(b);
        };
        f._interpretResponse = function (a) {
          if (a.redirect) return { redirect: a.redirect };
          if (a.bootloadOnly) return { bootloadOnly: a.bootloadOnly };
          var b = a.error && this._isServerDialogErrorCode(a.error);
          this._shouldReplaceTransportMarkers &&
            a.payload &&
            !b &&
            c("replaceTransportMarkers")(
              { relativeTo: this.getRelativeTo(), bigPipeContext: null },
              a.payload
            );
          b = new (c("AsyncResponse"))(this);
          if (a.__ar != 1)
            c("FBLogger")("AsyncRequest").warn(
              "AsyncRequest to endpoint %s returned a JSON response, but it is not properly formatted. The endpoint needs to provide a response using the AsyncResponse class in PHP.",
              this.getURI()
            ),
              (b.payload = a);
          else {
            Object.assign(b, a);
            a = this.transport;
            a &&
              a.getAllResponseHeaders !== void 0 &&
              (b.responseHeaders = a.getAllResponseHeaders());
          }
          return { asyncResponse: b };
        };
        f._isMultiplexable = function () {
          if (
            this.getOption("useIframeTransport") ||
            this.getOption("useFetchWithIframeFallback")
          ) {
            c("FBLogger")("AsyncRequest").mustfix(
              "You cannot bundle AsyncRequest that uses iframe transport."
            );
            return !1;
          }
          if (!c("isFacebookURI")(new (m || (m = c("URI")))(this.uri))) {
            c("FBLogger")("AsyncRequest").mustfix(
              "You can not bundle AsyncRequest sent to non-facebook URIs.  Uri: %s",
              this.getURI()
            );
            return !1;
          }
          if (!this.getOption("asynchronous_DEPRECATED")) {
            c("FBLogger")("AsyncRequest").mustfix(
              "We cannot bundle synchronous AsyncRequests"
            );
            return !1;
          }
          return !0;
        };
        f.handleResponse = function (a) {
          a = this._interpretResponse(a);
          this.invokeResponseHandler(a);
        };
        f.setMethod = function (a) {
          this.method = a.toString().toUpperCase();
          return this;
        };
        f.getMethod = function () {
          return this.method;
        };
        f.setData = function (a) {
          this.data = a;
          return this;
        };
        f.setRequestHeader = function (a, b) {
          this.headers[a] = b;
          return this;
        };
        f.setRawData = function (a) {
          this.rawData = a;
          return this;
        };
        f.getData = function () {
          return this.data;
        };
        f.setContextData = function (a, b, c) {
          c = c === void 0 ? !0 : c;
          c && (this.context["_log_" + a] = b);
          return this;
        };
        f._setUserActionID = function () {
          this.userActionID = (d("SessionName").getName() || "-") + "/-";
        };
        f.setURI = function (a, b) {
          b === void 0 && (b = !1);
          typeof a === "string" &&
            a.match(/^\/?u_\d+_\d+/) &&
            c("FBLogger")("asyncrequest").warn("Invalid URI %s", a);
          var e = new (m || (m = c("URI")))(a);
          if (
            (this.getOption("useIframeTransport") ||
              this.getOption("useFetchWithIframeFallback")) &&
            !c("isFacebookURI")(e)
          ) {
            b && j(0, 45284);
            return this;
          }
          if (
            !this._allowCrossOrigin &&
            !this.getOption("useIframeTransport") &&
            !this.getOption("useFetchWithIframeFallback") &&
            !e.isSameOrigin() &&
            !c("uriIsRelativePath")(e)
          ) {
            b && j(0, 45285);
            return this;
          }
          this._setUserActionID();
          if (!a || e.isEmpty()) {
            c("FBLogger")("async_request").mustfix("URI cannot be empty");
            return this;
          }
          this.uri = d("ZeroRewrites").rewriteURI(e);
          return this;
        };
        f.getURI = function () {
          return this.uri.toString();
        };
        f.delayPreDisplayJS = function (a) {
          a === void 0 && (a = !0);
          this._delayPreDisplayJS = a;
          return this;
        };
        f.setInitialHandler = function (a) {
          this.initialHandler = a;
          return this;
        };
        f.setPayloadHandler = function (a) {
          this.setHandler(function (b) {
            a(b.payload);
          });
          return this;
        };
        f.setHandler = function (a) {
          A(a) && (this.handler = a);
          return this;
        };
        f.setFlushedResponseHandler = function (a) {
          A(a) && (this.flushedResponseHandler = a);
          return this;
        };
        f.getHandler = function () {
          return this.handler || c("emptyFunction");
        };
        f.setProgressHandler = function (a) {
          A(a) && (this.progressHandler = a);
          return this;
        };
        f.setUploadProgressHandler = function (a) {
          A(a) && (this.uploadProgressHandler = a);
          return this;
        };
        f.setErrorHandler = function (a) {
          A(a) && (this.errorHandler = a);
          return this;
        };
        f.setTransportErrorHandler = function (a) {
          this.transportErrorHandler = a;
          return this;
        };
        f.getErrorHandler = function () {
          return this.errorHandler || c("emptyFunction");
        };
        f.getTransportErrorHandler = function () {
          return this.transportErrorHandler || c("emptyFunction");
        };
        f.setTimeoutHandler = function (a, b) {
          A(b) && ((this.timeout = a), (this.timeoutHandler = b));
          return this;
        };
        f.resetTimeout = function (a) {
          if (!(this.timeoutHandler === null))
            if (a === null)
              (this.timeout = null),
                c("clearTimeout")(this.timer),
                (this.timer = null);
            else {
              var b = !this._allowCrossPageTransition;
              this.timeout = a;
              c("clearTimeout")(this.timer);
              b
                ? (this.timer = c("setTimeout")(
                    this._handleTimeout.bind(this),
                    this.timeout
                  ))
                : (this.timer = c("setTimeoutAcrossTransitions")(
                    this._handleTimeout.bind(this),
                    this.timeout
                  ));
            }
          return this;
        };
        f.setNewSerial = function () {
          this.id = ++B;
          return this;
        };
        f.setInterceptHandler = function (a) {
          this.interceptHandler = a;
          return this;
        };
        f.setFinallyHandler = function (a) {
          this.finallyHandler = a;
          return this;
        };
        f.setAbortHandler = function (a) {
          this.abortHandler = a;
          return this;
        };
        f.getServerDialogCancelHandler = function () {
          return this.serverDialogCancelHandler;
        };
        f.setServerDialogCancelHandler = function (a) {
          this.serverDialogCancelHandler = a;
          return this;
        };
        f.setPreBootloadHandler = function (a) {
          this.preBootloadHandler = a;
          return this;
        };
        f.setReadOnly = function (a) {
          typeof a !== "boolean" || (this.readOnly = a);
          return this;
        };
        f.getReadOnly = function () {
          return this.readOnly;
        };
        f.setRelativeTo = function (a) {
          this.relativeTo = a;
          return this;
        };
        f.getRelativeTo = function () {
          return this.relativeTo;
        };
        f.setStatusClass = function (a) {
          this.statusClass = a;
          return this;
        };
        f.setStatusElement = function (a) {
          this.statusElement = a;
          return this;
        };
        f.getStatusElement = function () {
          return c("ge")(this.statusElement);
        };
        f._isRelevant = function () {
          if (this._allowCrossPageTransition) return !0;
          return !this.id ? !0 : this.id > C;
        };
        f.clearStatusIndicator = function () {
          var a = this.getStatusElement();
          a &&
            (d("CSS").removeClass(a, "async_saving"),
            d("CSS").removeClass(a, this.statusClass));
        };
        f._addStatusIndicator = function () {
          var a = this.getStatusElement();
          a &&
            (d("CSS").addClass(a, "async_saving"),
            d("CSS").addClass(a, this.statusClass));
        };
        f.specifiesWriteRequiredParams = function () {
          var a = this;
          return this.writeRequiredParams.every(function (b) {
            a.data[b] =
              a.data[b] || (o || (o = c("Env")))[b] || (c("ge")(b) || {}).value;
            return a.data[b] !== void 0 ? !0 : !1;
          });
        };
        f.setOption = function (a, b) {
          typeof this.option[a] !== "undefined" && (this.option[a] = b);
          return this;
        };
        f.getOption = function (a) {
          typeof this.option[a] === "undefined";
          return this.option[a];
        };
        f.abort = function () {
          var a = this;
          this.continuation.last(function () {
            var b = a.transport;
            if (b) {
              var d = a.getTransportErrorHandler();
              a.setOption("suppressErrorAlerts", !0);
              a.setTransportErrorHandler(c("emptyFunction"));
              a._requestAborted = !0;
              b.abort();
              a.setTransportErrorHandler(d);
            }
            a.abortHandler();
            J.unschedule(a);
          });
        };
        f.abandon = function () {
          var a = this;
          this.continuation.last(function () {
            var b;
            c("clearTimeout")(a.timer);
            a.setOption("suppressErrorAlerts", !0)
              .setHandler((b = c("emptyFunction")))
              .setErrorHandler(b)
              .setTransportErrorHandler(b)
              .setProgressHandler(b)
              .setUploadProgressHandler(b);
            b = a.transport;
            b &&
              ((a._requestAborted = !0),
              w(b) && delete b.onprogress,
              x(b) && delete b.upload.onprogress,
              b.abort());
            a.abortHandler();
            J.unschedule(a);
          });
        };
        f.setNectarModuleDataSafe = function (a) {
          var b = this.setNectarModuleData;
          b && b.call(this, a);
          return this;
        };
        f.setAllowCrossPageTransition = function (a) {
          this._allowCrossPageTransition = !!a;
          this.timer && this.resetTimeout(this.timeout);
          return this;
        };
        f.getAllowIrrelevantRequests = function () {
          return this._allowIrrelevantRequests;
        };
        f.setAllowIrrelevantRequests = function (a) {
          this._allowIrrelevantRequests = a;
          return this;
        };
        f.setAllowCrossOrigin = function (a) {
          this._allowCrossOrigin = a;
          return this;
        };
        f.setAllowCredentials = function (a) {
          this._allowCredentials = a;
          return this;
        };
        f.setIsBackgroundRequest = function (a) {
          this._isBackgroundRequest = a;
          return this;
        };
        f.setReplaceTransportMarkers = function (a) {
          a === void 0 && (a = !0);
          this._shouldReplaceTransportMarkers = a;
          return this;
        };
        f.sendAndReturnAbortHandler = function () {
          var a = this;
          this.send();
          return function () {
            return a.abort();
          };
        };
        f.send = function (b) {
          var f = this;
          b = b || !1;
          if (!this.uri) return !1;
          this.errorHandler || !this.getOption("suppressErrorHandlerWarning");
          (this.getOption("useIframeTransport") ||
            this.getOption("useFetchWithIframeFallback")) &&
            this.method != "GET" &&
            this.setMethod("GET");
          this.timeoutHandler !== null &&
            (this.getOption("useIframeTransport") ||
              this.getOption("useFetchWithIframeFallback"));
          if (!this.getReadOnly()) {
            this.specifiesWriteRequiredParams();
            if (this.method != "POST") return !1;
          }
          if (document.location.search.toString().includes(this.uri.toString()))
            return !1;
          if (
            this.uri.toString().includes("/../") ||
            this.uri.toString().includes("\\../") ||
            this.uri.toString().includes("/..\\") ||
            this.uri.toString().includes("\\..\\")
          )
            return !1;
          Object.assign(this.data, c("getAsyncParams")(this.method));
          (p || (p = c("isEmpty")))(this.context) ||
            (Object.assign(this.data, this.context), (this.data.ajax_log = 1));
          (o || (o = c("Env"))).force_param &&
            Object.assign(this.data, (o || (o = c("Env"))).force_param);
          this._setUserActionID();
          if (this.getOption("bundle") && this._isMultiplexable()) {
            J.schedule(this);
            return !0;
          }
          this.setNewSerial();
          this.getOption("asynchronous_DEPRECATED") ||
            this.uri.addQueryData({ __sjax: 1 });
          c("Arbiter").inform("AsyncRequest/send", {
            request: this,
            ts: (n || (n = c("performanceAbsoluteNow")))(),
          });
          var g, h;
          this.method == "GET" &&
            this.uri.addQueryData({ fb_dtsg_ag: d("DTSG_ASYNC").getToken() });
          this.method == "GET" || this.rawData
            ? ((g = this.uri.addQueryData(this.data).toString()),
              (h = this.rawData || ""))
            : (this._allowCrossOrigin && this.uri.addQueryData({ __a: 1 }),
              (g = this.uri.toString()),
              (h = (k || (k = d("PHPQuerySerializer"))).serialize(this.data)));
          if (this.transport) return !1;
          if (this.getOption("useFetchWithIframeFallback"))
            try {
              var i = new (c("FetchStreamTransport"))(this.uri);
              this._setJSONPTransport(i);
              this._markRequestSent();
              i.send();
              this.setOption("useIframeTransport", !1);
              return !0;
            } catch (a) {
              this.setOption("useFetchWithIframeFallback", !1),
                this.setOption("useIframeTransport", !0);
            }
          if (this.getOption("useIframeTransport")) {
            e(["JSONPTransport"], function (a) {
              a = new a(f.uri);
              f._setJSONPTransport(a);
              f._markRequestSent();
              a.send();
            });
            return !0;
          }
          this.flushedResponseHandler &&
            (this.flushedResponseTextParseIndex = 0);
          var j;
          try {
            j = d("ZeroRewrites").getTransportBuilderForURI(this.uri)();
          } catch (a) {
            throw c("unrecoverableViolation")(
              a.message,
              "comet_infra",
              {},
              { blameToPreviousFrame: 1 }
            );
          }
          if (!j) return !1;
          this.schedule("AsyncRequest.send");
          j.onreadystatechange = function () {
            var a = f.transport;
            a &&
              a.readyState >= 2 &&
              a.readyState <= 3 &&
              f._handleFlushedResponse();
            j.readyState === 4 && f.continuation.last(f._onStateChange);
          };
          this.progressHandler &&
            w(j) &&
            (j.onprogress = function () {
              for (
                var a = arguments.length, b = new Array(a), c = 0;
                c < a;
                c++
              )
                b[c] = arguments[c];
              f.continuation(function () {
                f.progressHandler && f.progressHandler.apply(f, b);
              });
            });
          this.uploadProgressHandler &&
            x(j) &&
            (j.upload.onprogress = function () {
              for (
                var a = arguments.length, b = new Array(a), c = 0;
                c < a;
                c++
              )
                b[c] = arguments[c];
              f.continuation(function () {
                f.uploadProgressHandler && f.uploadProgressHandler.apply(f, b);
              });
            });
          b || (this.remainingRetries = this.getOption("retries"));
          this.transport = j;
          try {
            j.open(
              this.method,
              g,
              c("gkx")("1857581")
                ? !0
                : this.getOption("asynchronous_DEPRECATED")
            );
          } catch (a) {
            return !1;
          }
          if (
            !this.uri.isSameOrigin() &&
            !c("uriIsRelativePath")(this.uri) &&
            !this.getOption("useIframeTransport") &&
            !this.getOption("useFetchWithIframeFallback")
          ) {
            if (!y(j)) return !1;
            this._canSendCredentials() && (j.withCredentials = !0);
          }
          this.method == "POST" &&
            !this.rawData &&
            j.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );
          this._isBackgroundRequest &&
            j.setRequestHeader("X_FB_BACKGROUND_STATE", "1");
          var l = c("getAsyncHeaders")(this.uri);
          Object.keys(l).forEach(function (a) {
            j && j.setRequestHeader(a, l[a]);
          });
          c("Arbiter").inform("AsyncRequest/will_send", { request: this });
          if (j)
            for (i in this.headers)
              Object.prototype.hasOwnProperty.call(this.headers, i) &&
                j.setRequestHeader(i, this.headers[i]);
          this._addStatusIndicator();
          this._markRequestSent();
          j.send(h);
          this.timeout !== null && this.resetTimeout(this.timeout);
          a._inflightCount++;
          return !0;
        };
        f.schedule = function (a) {
          this.continuation = c("TimeSlice").getReusableContinuation(a);
        };
        f._canSendCredentials = function () {
          if (this._allowCredentials === !1) return !1;
          var a = new (m || (m = c("URI")))(this.uri);
          return (
            c("isBulletinDotComURI")(a) ||
            c("isFacebookURI")(a) ||
            c("isInternalFBURI")(a) ||
            c("isMessengerDotComURI")(a) ||
            c("isWorkplaceDotComURI")(a) ||
            c("isWorkroomsDotComURI")(a) ||
            c("isWorkDotMetaDotComURI")(a) ||
            c("isHorizonDotMetaDotComURI")(a) ||
            c("isSparkDotMetaDotComURI")(a)
          );
        };
        f._markRequestSent = function () {
          var a = new (m || (m = c("URI")))(this.getURI())
            .getQualifiedURI()
            .toString();
          d("ResourceTimingsStore").updateURI(
            c("ResourceTypes").XHR,
            this.resourceTimingStoreUID,
            a
          );
          d("ResourceTimingsStore")
            .annotate(c("ResourceTypes").XHR, this.resourceTimingStoreUID)
            .addStringAnnotation("uri", a);
          d("ResourceTimingsStore").measureRequestSent(
            c("ResourceTypes").XHR,
            this.resourceTimingStoreUID
          );
        };
        f.promisePayload = function (a) {
          return this.exec().then(
            function (a) {
              return a.payload;
            },
            function (a) {
              throw a.toError();
            }
          );
        };
        f.exec = function (a) {
          var d = this;
          if (
            this.getHandler() !== c("emptyFunction") ||
            this.getErrorHandler() !== c("AsyncResponse").defaultErrorHandler
          )
            throw new Error(
              "exec is an async function and does not allow previously set handlers"
            );
          return new (l || (l = b("Promise")))(function (b, c) {
            d.setHandler(b).setErrorHandler(c).send(a);
          });
        };
        a.bootstrap = function (b, e, f) {
          var g = "GET",
            h = !0,
            i = {};
          (f || (e && e.rel == "async-post")) &&
            ((g = "POST"),
            (h = !1),
            b &&
              ((b = new (m || (m = c("URI")))(b)),
              (i = b.getQueryData()),
              b.setQueryData({})));
          f = d("Parent").byClass(e, "stat_elem") || e;
          if (f && d("CSS").hasClass(f, "async_saving")) return !1;
          b = new a(b)
            .setReadOnly(h)
            .setMethod(g)
            .setData(i)
            .setNectarModuleDataSafe(e)
            .setRelativeTo(e);
          e &&
            (b.setHandler(function (a) {
              c("Event").fire(e, "success", { response: a });
            }),
            b.setErrorHandler(function (a) {
              c("Event").fire(e, "error", { response: a }) !== !1 &&
                c("AsyncResponse").defaultErrorHandler(a);
            }));
          if (f instanceof HTMLElement) {
            b.setStatusElement(f);
            h = f.getAttribute("data-status-class");
            h && b.setStatusClass(h);
          }
          b.send();
          return !1;
        };
        a.bootstrap_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES =
          function (b, c, d) {
            a.bootstrap(b, c, d);
          };
        a.post = function (b, c) {
          new a(b).setReadOnly(!1).setMethod("POST").setData(c).send();
          return !1;
        };
        a.post_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES =
          function (b, c) {
            a.post(b, c);
          };
        a.getLastID = function () {
          return B;
        };
        a.ignoreUpdate = function () {
          D = !0;
        };
        a.getInflightCount = function () {
          return this._inflightCount;
        };
        return a;
      })();
    G._inflightCount = 0;
    var H,
      I = [],
      J = (function () {
        function a() {
          this._requests = [];
        }
        var b = a.prototype;
        b.add = function (a) {
          this._requests.push(a);
        };
        b.remove = function (a) {
          var b = this._requests,
            c = this._requestsSent;
          for (var d = 0, e = b.length; d < e; d++)
            b[d] === a && (c ? (b[d] = null) : b.splice(d, 1));
        };
        b.send = function () {
          this._requestsSent && j(0, 4390);
          this._requestsSent = !0;
          this._wrapperRequest = null;
          var a = this._requests;
          if (!a.length) return;
          var b;
          if (a.length === 1) b = a[0];
          else {
            a = a.filter(Boolean).map(function (a) {
              return [
                a.uri.getPath(),
                (k || (k = d("PHPQuerySerializer"))).serialize(a.data),
              ];
            });
            b = this._wrapperRequest = new G("/ajax/proxy.php")
              .setAllowCrossPageTransition(!0)
              .setData({ data: a })
              .setHandler(this._handler.bind(this))
              .setTransportErrorHandler(this._transportErrorHandler.bind(this));
          }
          b && b.setOption("bundle", !1).send();
        };
        b._handler = function (a) {
          var b = this,
            c = a.getPayload().responses;
          if (c.length !== this._requests.length) return;
          a = function (a) {
            var d = b._requests[a];
            if (!d) return "continue";
            var e = d.uri.getPath();
            b._wrapperRequest && (d.id = b._wrapperRequest.id);
            if (c[a][0] !== e) {
              d.continuation.last(function () {
                d.invokeResponseHandler({
                  transportError:
                    "Wrong response order in bundled request to " + e,
                });
              });
              return "continue";
            }
            d.continuation.last(function () {
              d.handleResponse(c[a][1]);
            });
          };
          for (var d = 0; d < this._requests.length; d++) {
            var e = a(d);
            if (e === "continue") continue;
          }
          I.splice(I.indexOf(this, 1));
        };
        b._transportErrorHandler = function (a) {
          var b = this,
            c = { transportError: a.errorDescription };
          a = this._requests.filter(Boolean).map(function (a) {
            b._wrapperRequest && (a.id = b._wrapperRequest.id);
            a.invokeResponseHandler(c);
            return a.uri.getPath();
          });
        };
        a.schedule = function (b) {
          b.schedule("AsyncMultiplex.schedule");
          H ||
            ((H = new a()),
            I.push(H),
            c("TimeSlice").guard(
              function () {
                c("setTimeoutAcrossTransitions")(function () {
                  H && (H.send(), (H = null));
                }, 0);
              },
              "AsyncMultiplex.schedule",
              { propagationType: c("TimeSlice").PropagationType.ORPHAN }
            )());
          H.add(b);
          return H;
        };
        a.unschedule = function (a) {
          I.forEach(function (b) {
            b.remove(a);
          });
        };
        return a;
      })();
    G.suppressOnloadToken = {};
    a.AsyncRequest = G;
    g["default"] = G;
  },
  98
);
__d(
  "XLynxAsyncCallbackControllerRouteBuilder",
  ["jsRouteBuilder"],
  function (a, b, c, d, e, f, g) {
    a = c("jsRouteBuilder")(
      "/si/linkclick/ajax_callback/",
      Object.freeze({}),
      void 0
    );
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "FBLynxLogging",
  ["AsyncRequest", "ODS", "XLynxAsyncCallbackControllerRouteBuilder"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function a(a) {
      var b = c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});
      new (c("AsyncRequest"))(b)
        .setData({ lynx_uri: a })
        .setErrorHandler(function (a) {
          a = a.getError();
          (h || (h = d("ODS"))).bumpEntityKey(
            3861,
            "linkshim",
            "click_log.post.fail." + a
          );
        })
        .setTransportErrorHandler(function (a) {
          a = a.getError();
          (h || (h = d("ODS"))).bumpEntityKey(
            3861,
            "linkshim",
            "click_log.post.transport_fail." + a
          );
        })
        .send();
    }
    g.log = a;
  },
  98
);
__d(
  "FBLynxBase",
  ["$", "FBLynxLogging", "LinkshimHandlerConfig", "URI", "isLinkshimURI"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g;
    function h(a) {
      if (!b("isLinkshimURI")(a)) return null;
      a = a.getQueryData().u;
      return !a ? null : a;
    }
    var i = {
      logAsyncClick: function (a) {
        i.swapLinkWithUnshimmedLink(a);
        a = a.getAttribute("data-lynx-uri");
        if (!a) return;
        b("FBLynxLogging").log(a);
      },
      originReferrerPolicyClick: function (a) {
        var c = b("$")("meta_referrer");
        c.content = b("LinkshimHandlerConfig").switched_meta_referrer_policy;
        i.logAsyncClick(a);
        setTimeout(function () {
          c.content = b("LinkshimHandlerConfig").default_meta_referrer_policy;
        }, 100);
      },
      swapLinkWithUnshimmedLink: function (a) {
        var c = a.href,
          d = h(new (g || (g = b("URI")))(c));
        if (!d) return;
        a.setAttribute("data-lynx-uri", c);
        a.href = d;
      },
      revertSwapIfLynxURIPresent: function (a) {
        var b = a.getAttribute("data-lynx-uri");
        if (!b) return;
        a.removeAttribute("data-lynx-uri");
        a.href = b;
      },
    };
    e.exports = i;
  },
  null
);
__d(
  "FBLynx",
  ["Base64", "Event", "FBLynxBase", "LinkshimHandlerConfig", "Parent", "URI"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h = (g || (g = b("URI"))).goURIOnWindow,
      i = {
        alreadySetup: !1,
        setupDelegation: function (a) {
          a === void 0 && (a = !1);
          if (!document.documentElement) return;
          if (document.body == null) {
            if (a) return;
            window.setTimeout(function () {
              i.setupDelegation(!0);
            }, 100);
            return;
          }
          if (i.alreadySetup) return;
          i.alreadySetup = !0;
          var c = function (a) {
            var c = i.getMaybeLynxLink(a.target);
            if (!c) return;
            var d = c[0];
            c = c[1];
            var e = c,
              f = new (g || (g = b("URI")))(c.href),
              j;
            if (
              b("LinkshimHandlerConfig").ghl_param_link_shim &&
              d !== "hover" &&
              c.dataset &&
              c.dataset.attributes
            ) {
              j = b("Base64").decodeObject(c.dataset.attributes);
              if (j && j.open_link) {
                var k;
                for (k in j) k !== "open_link" && f.addQueryData(k, j[k]);
                k = c.cloneNode(!0);
                k.href = f.toString();
                e = k;
              }
            }
            switch (d) {
              case "async":
              case "asynclazy":
                b("FBLynxBase").logAsyncClick(e);
                break;
              case "origin":
                b("FBLynxBase").originReferrerPolicyClick(e);
                break;
              case "hover":
                i.hoverClick(e);
                break;
            }
            b("LinkshimHandlerConfig").ghl_param_link_shim &&
              d !== "hover" &&
              j &&
              j.open_link &&
              (a.preventDefault(), h(f, window.open("", e.target), !0));
          };
          b("Event").listen(document.body, "click", c);
          b("LinkshimHandlerConfig").middle_click_requires_event &&
            b("Event").listen(document.body, "mouseup", function (a) {
              a.button == 1 && c(a);
            });
          b("Event").listen(document.body, "mouseover", function (a) {
            a = i.getMaybeLynxLink(a.target);
            if (!a) return;
            var b = a[0];
            a = a[1];
            switch (b) {
              case "async":
              case "asynclazy":
              case "origin":
              case "hover":
                i.mouseover(a);
                break;
            }
          });
          b("Event").listen(document.body, "contextmenu", function (a) {
            a = i.getMaybeLynxLink(a.target);
            if (!a) return;
            var b = a[0];
            a = a[1];
            switch (b) {
              case "async":
              case "hover":
              case "origin":
                i.contextmenu(a);
                break;
              case "asynclazy":
                break;
            }
          });
        },
        getMaybeLynxLink: function (a) {
          a = b("Parent").byAttribute(a, "data-lynx-mode");
          if (a instanceof HTMLAnchorElement) {
            var c = a.getAttribute("data-lynx-mode");
            switch (c) {
              case "async":
              case "asynclazy":
              case "hover":
              case "origin":
                return [c, a];
              default:
                return null;
            }
          }
          return null;
        },
        hoverClick: function (a) {
          b("FBLynxBase").revertSwapIfLynxURIPresent(a);
        },
        mouseover: function (a) {
          b("FBLynxBase").swapLinkWithUnshimmedLink(a);
        },
        contextmenu: function (a) {
          b("FBLynxBase").revertSwapIfLynxURIPresent(a);
        },
      };
    e.exports = i;
  },
  null
);
__d(
  "FbtLogging",
  ["cr:1094907"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = b("cr:1094907") == null ? void 0 : b("cr:1094907").logImpression;
    g.logImpression = a;
  },
  98
);
__d(
  "IntlCLDRNumberType03",
  ["IntlVariations"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = {
      getVariation: function (a) {
        if (a === 0 || a === 1) return c("IntlVariations").NUMBER_ONE;
        else return c("IntlVariations").NUMBER_OTHER;
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "IntlCLDRNumberType09",
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
  "IntlQtEventFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1848815");
    b = d("FalcoLoggerInternal").create("intl_qt_event", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "ClientServiceWorkerMessage",
  [],
  function (a, b, c, d, e, f) {
    a = (function () {
      function a(a, b, c) {
        (this.$1 = a), (this.$2 = b), (this.$3 = c);
      }
      var b = a.prototype;
      b.sendViaController = function () {
        if (!navigator.serviceWorker || !navigator.serviceWorker.controller)
          return;
        var a = new self.MessageChannel();
        this.$3 && (a.port1.onmessage = this.$3);
        navigator.serviceWorker.controller.postMessage(
          { command: this.$1, data: this.$2 },
          [a.port2]
        );
      };
      return a;
    })();
    f["default"] = a;
  },
  66
);
