/*FB_PKG_DELIM*/

/**
 * License: https://www.facebook.com/legal/license/MDzNl_j9yvg/
 */
__d(
  "has-flag-3.0.0",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = {};
    var g = { exports: b };
    function h() {
      g.exports = function (a, b) {
        b = b || process.argv;
        var c = a.startsWith("-") ? "" : a.length === 1 ? "-" : "--";
        c = b.indexOf(c + a);
        a = b.indexOf("--");
        return c !== -1 && (a === -1 ? !0 : c < a);
      };
    }
    var i = !1;
    function j() {
      i || ((i = !0), h());
      return g.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return j();
      }
    }
    e.exports = a;
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/MDzNl_j9yvg/
 */
__d(
  "supports-color-5.5.0",
  ["has-flag-3.0.0"],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a && typeof a === "object" && "default" in a ? a["default"] : a;
    }
    var g = a(b("has-flag-3.0.0"));
    d = {};
    var h = { exports: d };
    function i() {
      var a = {},
        b = g(),
        c = process.env,
        d;
      b("no-color") || b("no-colors") || b("color=false")
        ? (d = !1)
        : (b("color") || b("colors") || b("color=true") || b("color=always")) &&
          (d = !0);
      "FORCE_COLOR" in c &&
        (d = c.FORCE_COLOR.length === 0 || parseInt(c.FORCE_COLOR, 10) !== 0);
      function e(a) {
        return a === 0
          ? !1
          : { level: a, hasBasic: !0, has256: a >= 2, has16m: a >= 3 };
      }
      function f(e) {
        if (d === !1) return 0;
        if (b("color=16m") || b("color=full") || b("color=truecolor")) return 3;
        if (b("color=256")) return 2;
        if (e && !e.isTTY && d !== !0) return 0;
        e = d ? 1 : 0;
        if (process.platform === "win32") {
          var f = a.release().split(".");
          return Number(process.versions.node.split(".")[0]) >= 8 &&
            Number(f[0]) >= 10 &&
            Number(f[2]) >= 10586
            ? Number(f[2]) >= 14931
              ? 3
              : 2
            : 1;
        }
        if ("CI" in c)
          return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function (
            a
          ) {
            return a in c;
          }) || c.CI_NAME === "codeship"
            ? 1
            : e;
        if ("TEAMCITY_VERSION" in c)
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(c.TEAMCITY_VERSION)
            ? 1
            : 0;
        if (c.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in c) {
          f = parseInt((c.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (c.TERM_PROGRAM) {
            case "iTerm.app":
              return f >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        if (/-256(color)?$/i.test(c.TERM)) return 2;
        if (
          /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
            c.TERM
          )
        )
          return 1;
        if ("COLORTERM" in c) return 1;
        return c.TERM === "dumb" ? e : e;
      }
      function i(a) {
        a = f(a);
        return e(a);
      }
      h.exports = {
        supportsColor: i,
        stdout: i(process.stdout),
        stderr: i(process.stderr),
      };
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return h.exports;
    }
    function c(a) {
      switch (a) {
        case void 0:
          return k();
      }
    }
    e.exports = c;
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/cr2jmG-CdKo/
 */
__d(
  "debug-0.0.0",
  ["DebugStub"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = b("DebugStub");
    c = {};
    var h = { exports: c };
    function i() {
      h.exports = g;
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return h.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return k();
      }
    }
    e.exports = a;
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d(
  "component-cookie-1.1.3",
  ["debug-0.0.0"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = b("debug-0.0.0");
    c = {};
    var h = { exports: c };
    function i() {
      var a = g()("cookie");
      h.exports = function (a, e, f) {
        switch (arguments.length) {
          case 3:
          case 2:
            return b(a, e, f);
          case 1:
            return d(a);
          default:
            return c();
        }
      };
      function b(a, b, c) {
        c = c || {};
        a = f(a) + "=" + f(b);
        null == b && (c.maxage = -1);
        c.maxage && (c.expires = new Date(+new Date() + c.maxage));
        c.path && (a += "; path=" + c.path);
        c.domain && (a += "; domain=" + c.domain);
        c.expires && (a += "; expires=" + c.expires.toUTCString());
        c.secure && (a += "; secure");
        document.cookie = a;
      }
      function c() {
        var a;
        try {
          a = document.cookie || "";
        } catch (a) {
          typeof console !== "undefined" && typeof emptyFunction === "function";
          return {};
        }
        return e(a);
      }
      function d(a) {
        return c()[a];
      }
      function e(a) {
        var b = {};
        a = a.split(/ *; */);
        var c;
        if ("" == a[0]) return b;
        for (var d = 0; d < a.length; ++d)
          (c = a[d].split("=")), (b[i(c[0])] = i(c[1]));
        return b;
      }
      function f(b) {
        try {
          return encodeURIComponent(b);
        } catch (c) {
          a("error `encode(%o)` - %o", b, c);
        }
      }
      function i(b) {
        try {
          return decodeURIComponent(b);
        } catch (c) {
          a("error `decode(%o)` - %o", b, c);
        }
      }
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return h.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return k();
      }
    }
    e.exports = a;
  },
  null
);
__d(
  "component-cookie",
  ["component-cookie-1.1.3"],
  function (a, b, c, d, e, f) {
    e.exports = b("component-cookie-1.1.3")();
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d(
  "jquery-param-0.1.2",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = {};
    var g = { exports: b },
      h;
    function i() {
      (function (b) {
        var c = function (a) {
          var b = function (a, b, c) {
              (c =
                typeof c === "function"
                  ? c()
                  : c === null
                  ? ""
                  : c === void 0
                  ? ""
                  : c),
                (a[a.length] =
                  encodeURIComponent(b) + "=" + encodeURIComponent(c));
            },
            c = function (a, d, e) {
              var f, g;
              if (Object.prototype.toString.call(d) === "[object Array]")
                for (f = 0, g = d.length; f < g; f++)
                  c(
                    a + "[" + (typeof d[f] === "object" ? f : "") + "]",
                    d[f],
                    e
                  );
              else if (d && d.toString() === "[object Object]")
                for (f in d)
                  d.hasOwnProperty(f) &&
                    (a ? c(a + "[" + f + "]", d[f], e, b) : c(f, d[f], e, b));
              else if (a) b(e, a, d);
              else for (f in d) b(e, f, d[f]);
              return e;
            };
          return c("", a, []).join("&").replace(/%20/g, "+");
        };
        typeof g === "object" && typeof g.exports === "object"
          ? (g.exports = c)
          : typeof h === "function" && h.amd
          ? h([], function () {
              return c;
            })
          : (b.param = c);
      })(this);
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return g.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return k();
      }
    }
    e.exports = a;
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/cr2jmG-CdKo/
 */
__d(
  "pinkyswear-2.2.3",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = {};
    var g = { exports: b },
      h;
    function i() {
      (function (a, b) {
        typeof h === "function" && h.amd
          ? h([], b)
          : typeof g === "object" && g.exports
          ? (g.exports = b())
          : (a.pinkySwear = b());
      })(this, function () {
        var a;
        function b(a) {
          return typeof a == "function";
        }
        function c(a) {
          return typeof a == "object";
        }
        function d(a) {
          typeof setImmediate != "undefined"
            ? setImmediate(a)
            : typeof process != "undefined" && process.nextTick
            ? process.nextTick(a)
            : setTimeout(a, 0);
        }
        return function e(f) {
          var g,
            h = [],
            i = [],
            j = function (a, b) {
              g == null &&
                a != null &&
                ((g = a),
                (h = b),
                i.length &&
                  d(function () {
                    for (var a = 0; a < i.length; a++) i[a]();
                  }));
              return g;
            };
          j.then = function (j, k) {
            var l = e(f),
              m = function () {
                try {
                  var d = g ? j : k;
                  if (b(d)) {
                    function e(d) {
                      var f,
                        g = 0;
                      try {
                        if (d && (c(d) || b(d)) && b((f = d.then))) {
                          if (d === l) throw new TypeError();
                          f.call(
                            d,
                            function () {
                              g++ || e.apply(a, arguments);
                            },
                            function (a) {
                              g++ || l(!1, [a]);
                            }
                          );
                        } else l(!0, arguments);
                      } catch (a) {
                        g++ || l(!1, [a]);
                      }
                    }
                    e(d.apply(a, h || []));
                  } else l(g, h);
                } catch (a) {
                  l(!1, [a]);
                }
              };
            g != null ? d(m) : i.push(m);
            return l;
          };
          f && (j = f(j));
          return j;
        };
      });
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return g.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return k();
      }
    }
    e.exports = a;
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d(
  "qwest-4.4.5",
  ["pinkyswear-2.2.3", "jquery-param-0.1.2"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = b("pinkyswear-2.2.3"),
      h = b("jquery-param-0.1.2");
    c = {};
    var i = { exports: c };
    function j() {
      i.exports = (function () {
        var b = typeof window != "undefined" ? window : self,
          c = g(),
          d = h(),
          e = {},
          f = "json",
          i = "post",
          j = null,
          k = 0,
          l = [],
          m = b.XMLHttpRequest
            ? function () {
                return new b.XMLHttpRequest();
              }
            : function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
              },
          n = m().responseType === "",
          o = function (a, g, h, o, p) {
            a = a.toUpperCase();
            h = h || null;
            o = o || {};
            for (var q in e)
              if (!(q in o))
                if (typeof e[q] == "object" && typeof o[q] == "object")
                  for (var r in e[q]) o[q][r] = e[q][r];
                else o[q] = e[q];
            var s = !1,
              t,
              u,
              v = !1,
              w,
              x = !1,
              y = 0,
              z = {},
              A = {
                text: "*/*",
                xml: "text/xml",
                json: "application/json",
                post: "application/x-www-form-urlencoded",
                document: "text/html",
              };
            r = {
              text: "*/*",
              xml: "application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",
              json: "application/json; q=1.0, text/*; q=0.8, */*; q=0.1",
            };
            var B,
              C = !1,
              D = c(function (c) {
                c.abort = function () {
                  x ||
                    (u && u.readyState != 4 && u.abort(),
                    C && (--k, (C = !1)),
                    (x = !0));
                };
                c.send = function () {
                  if (C) return;
                  if (k == j) {
                    l.push(c);
                    return;
                  }
                  if (x) {
                    l.length && l.shift().send();
                    return;
                  }
                  ++k;
                  C = !0;
                  u = m();
                  t &&
                    !("withCredentials" in u) &&
                    b.XDomainRequest &&
                    ((u = new XDomainRequest()),
                    (v = !0),
                    a != "GET" && a != "POST" && (a = "POST"));
                  v
                    ? u.open(a, g)
                    : (u.open(a, g, o.async, o.user, o.password),
                      n && o.async && (u.withCredentials = o.withCredentials));
                  if (!v) for (var d in z) z[d] && u.setRequestHeader(d, z[d]);
                  if (n && o.responseType != "auto")
                    try {
                      (u.responseType = o.responseType),
                        (s = u.responseType == o.responseType);
                    } catch (a) {}
                  n || v
                    ? ((u.onload = E),
                      (u.onerror = F),
                      v && (u.onprogress = function () {}))
                    : (u.onreadystatechange = function () {
                        u.readyState == 4 && E();
                      });
                  o.async
                    ? "timeout" in u
                      ? ((u.timeout = o.timeout), (u.ontimeout = G))
                      : (w = setTimeout(G, o.timeout))
                    : v && (u.ontimeout = function () {});
                  o.responseType != "auto" &&
                    "overrideMimeType" in u &&
                    u.overrideMimeType(A[o.responseType]);
                  p && p(u);
                  v
                    ? setTimeout(function () {
                        u.send(a != "GET" ? h : null);
                      }, 0)
                    : u.send(a != "GET" ? h : null);
                };
                return c;
              }),
              E = function () {
                var a;
                C = !1;
                clearTimeout(w);
                l.length && l.shift().send();
                if (x) return;
                --k;
                try {
                  if (s) {
                    if ("response" in u && u.response === null)
                      throw "The request response is empty";
                    B = u.response;
                  } else {
                    a = o.responseType;
                    if (a == "auto")
                      if (v) a = f;
                      else {
                        var c = u.getResponseHeader("Content-Type") || "";
                        c.indexOf(A.json) > -1
                          ? (a = "json")
                          : c.indexOf(A.xml) > -1
                          ? (a = "xml")
                          : (a = "text");
                      }
                    switch (a) {
                      case "json":
                        if (u.responseText.length)
                          try {
                            "JSON" in b
                              ? (B = JSON.parse(u.responseText))
                              : (B = new Function(
                                  "return (" + u.responseText + ")"
                                )());
                          } catch (a) {
                            throw "Error while parsing JSON body : " + a;
                          }
                        break;
                      case "xml":
                        try {
                          b.DOMParser
                            ? (B = new DOMParser().parseFromString(
                                u.responseText,
                                "text/xml"
                              ))
                            : ((B = new ActiveXObject("Microsoft.XMLDOM")),
                              (B.async = "false"),
                              B.loadXML(u.responseText));
                        } catch (a) {
                          B = void 0;
                        }
                        if (
                          !B ||
                          !B.documentElement ||
                          B.getElementsByTagName("parsererror").length
                        )
                          throw "Invalid XML";
                        break;
                      default:
                        B = u.responseText;
                    }
                  }
                  if ("status" in u && !/^2|1223/.test(u.status))
                    throw u.status + " (" + u.statusText + ")";
                  D(!0, [u, B]);
                } catch (a) {
                  D(!1, [a, u, B]);
                }
              },
              F = function (a) {
                x ||
                  ((a = typeof a == "string" ? a : "Connection aborted"),
                  D.abort(),
                  D(!1, [new Error(a), u, null]));
              },
              G = function () {
                x ||
                  (!o.attempts || ++y != o.attempts
                    ? (u.abort(), (C = !1), D.send())
                    : F("Timeout (" + g + ")"));
              };
            o.async = "async" in o ? !!o.async : !0;
            o.cache = "cache" in o ? !!o.cache : !1;
            o.dataType = "dataType" in o ? o.dataType.toLowerCase() : i;
            o.responseType =
              "responseType" in o ? o.responseType.toLowerCase() : "auto";
            o.user = o.user || "";
            o.password = o.password || "";
            o.withCredentials = !!o.withCredentials;
            o.timeout = "timeout" in o ? parseInt(o.timeout, 10) : 3e4;
            o.attempts = "attempts" in o ? parseInt(o.attempts, 10) : 1;
            q = g.match(/\/\/(.+?)\//);
            t = q && (q[1] ? q[1] != location.host : !1);
            "ArrayBuffer" in b && h instanceof ArrayBuffer
              ? (o.dataType = "arraybuffer")
              : "Blob" in b && h instanceof Blob
              ? (o.dataType = "blob")
              : "Document" in b && h instanceof Document
              ? (o.dataType = "document")
              : "FormData" in b &&
                h instanceof FormData &&
                (o.dataType = "formdata");
            if (h !== null)
              switch (o.dataType) {
                case "json":
                  h = JSON.stringify(h);
                  break;
                case "post":
                  h = d(h);
              }
            if (o.headers) {
              var H = function (a, b, c) {
                return b + c.toUpperCase();
              };
              for (q in o.headers)
                z[q.replace(/(^|-)([^-])/g, H)] = o.headers[q];
            }
            !("Content-Type" in z) &&
              a != "GET" &&
              o.dataType in A &&
              A[o.dataType] &&
              (z["Content-Type"] = A[o.dataType]);
            z.Accept ||
              (z.Accept = o.responseType in r ? r[o.responseType] : "*/*");
            !t &&
              !("X-Requested-With" in z) &&
              (z["X-Requested-With"] = "XMLHttpRequest");
            !o.cache &&
              !("Cache-Control" in z) &&
              (z["Cache-Control"] = "no-cache");
            a == "GET" &&
              h &&
              typeof h == "string" &&
              (g += (/\?/.test(g) ? "&" : "?") + h);
            o.async && D.send();
            return D;
          },
          p = function (a) {
            var b = [],
              d = 0,
              e = [];
            return c(function (c) {
              var f = -1,
                g = function (a) {
                  return function (g, h, i, j) {
                    var k = ++f;
                    ++d;
                    b.push(
                      o(a, c.base + g, h, i, j).then(
                        function (a, b) {
                          (e[k] = arguments),
                            --d || c(!0, e.length == 1 ? e[0] : [e]);
                        },
                        function () {
                          c(!1, arguments);
                        }
                      )
                    );
                    return c;
                  };
                };
              c.get = g("GET");
              c.post = g("POST");
              c.put = g("PUT");
              c["delete"] = g("DELETE");
              c["catch"] = function (a) {
                return c.then(null, a);
              };
              c.complete = function (a) {
                var b = function () {
                  a();
                };
                return c.then(b, b);
              };
              c.map = function (a, b, c, d, e) {
                return g(a.toUpperCase()).call(this, b, c, d, e);
              };
              for (var h in a) h in c || (c[h] = a[h]);
              c.send = function () {
                for (var a = 0, d = b.length; a < d; ++a) b[a].send();
                return c;
              };
              c.abort = function () {
                for (var a = 0, d = b.length; a < d; ++a) b[a].abort();
                return c;
              };
              return c;
            });
          },
          q = {
            base: "",
            get: function () {
              return p(q).get.apply(this, arguments);
            },
            post: function () {
              return p(q).post.apply(this, arguments);
            },
            put: function () {
              return p(q).put.apply(this, arguments);
            },
            delete: function () {
              return p(q)["delete"].apply(this, arguments);
            },
            map: function () {
              return p(q).map.apply(this, arguments);
            },
            xhr2: n,
            limit: function (a) {
              j = a;
              return q;
            },
            setDefaultOptions: function (a) {
              e = a;
              return q;
            },
            setDefaultXdrResponseType: function (a) {
              f = a.toLowerCase();
              return q;
            },
            setDefaultDataType: function (a) {
              i = a.toLowerCase();
              return q;
            },
            getOpenRequests: function () {
              return k;
            },
          };
        return q;
      })();
    }
    var k = !1;
    function l() {
      k || ((k = !0), j());
      return i.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return l();
      }
    }
    e.exports = a;
  },
  null
);
__d(
  "qwest",
  ["qwest-4.4.5"],
  function (a, b, c, d, e, f) {
    e.exports = b("qwest-4.4.5")();
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d(
  "resize-observer-polyfill-1.5.1",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = {},
      h = { exports: g };
    function i() {
      (function (b, c) {
        typeof g === "object" && typeof h !== "undefined"
          ? (h.exports = c())
          : (b.ResizeObserver = c());
      })(this, function () {
        var b = (function () {
            if (typeof Map !== "undefined") return Map;
            function a(a, b) {
              var c = -1;
              a.some(function (d, a) {
                if (d[0] === b) {
                  c = a;
                  return !0;
                }
                return !1;
              });
              return c;
            }
            return (function () {
              function b() {
                this.__entries__ = [];
              }
              Object.defineProperty(b.prototype, "size", {
                get: function () {
                  return this.__entries__.length;
                },
                enumerable: !0,
                configurable: !0,
              });
              b.prototype.get = function (b) {
                b = a(this.__entries__, b);
                b = this.__entries__[b];
                return b && b[1];
              };
              b.prototype.set = function (c, d) {
                var b = a(this.__entries__, c);
                ~b
                  ? (this.__entries__[b][1] = d)
                  : this.__entries__.push([c, d]);
              };
              b.prototype["delete"] = function (b) {
                var c = this.__entries__;
                b = a(c, b);
                ~b && c.splice(b, 1);
              };
              b.prototype.has = function (b) {
                return !!~a(this.__entries__, b);
              };
              b.prototype.clear = function () {
                this.__entries__.splice(0);
              };
              b.prototype.forEach = function (a, b) {
                b === void 0 && (b = null);
                for (var c = 0, d = this.__entries__; c < d.length; c++) {
                  var e = d[c];
                  a.call(b, e[1], e[0]);
                }
              };
              return b;
            })();
          })(),
          c =
            typeof window !== "undefined" &&
            typeof document !== "undefined" &&
            window.document === document,
          d = (function () {
            if (typeof a !== "undefined" && a.Math === Math) return a;
            if (typeof self !== "undefined" && self.Math === Math) return self;
            return typeof window !== "undefined" && window.Math === Math
              ? window
              : Function("return this")();
          })(),
          e = (function () {
            return typeof requestAnimationFrame === "function"
              ? requestAnimationFrame.bind(d)
              : function (a) {
                  return setTimeout(function () {
                    return a(Date.now());
                  }, 1e3 / 60);
                };
          })(),
          f = 2;
        function g(a, b) {
          var c = !1,
            d = !1,
            g = 0;
          function h() {
            c && ((c = !1), a()), d && j();
          }
          function i() {
            e(h);
          }
          function j() {
            var a = Date.now();
            if (c) {
              if (a - g < f) return;
              d = !0;
            } else (c = !0), (d = !1), setTimeout(i, b);
            g = a;
          }
          return j;
        }
        var h = 20,
          i = [
            "top",
            "right",
            "bottom",
            "left",
            "width",
            "height",
            "size",
            "weight",
          ],
          j = typeof MutationObserver !== "undefined",
          k = (function () {
            function a() {
              (this.connected_ = !1),
                (this.mutationEventsAdded_ = !1),
                (this.mutationsObserver_ = null),
                (this.observers_ = []),
                (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
                (this.refresh = g(this.refresh.bind(this), h));
            }
            a.prototype.addObserver = function (a) {
              ~this.observers_.indexOf(a) || this.observers_.push(a),
                this.connected_ || this.connect_();
            };
            a.prototype.removeObserver = function (b) {
              var a = this.observers_;
              b = a.indexOf(b);
              ~b && a.splice(b, 1);
              !a.length && this.connected_ && this.disconnect_();
            };
            a.prototype.refresh = function () {
              var a = this.updateObservers_();
              a && this.refresh();
            };
            a.prototype.updateObservers_ = function () {
              var a = this.observers_.filter(function (a) {
                return a.gatherActive(), a.hasActive();
              });
              a.forEach(function (a) {
                return a.broadcastActive();
              });
              return a.length > 0;
            };
            a.prototype.connect_ = function () {
              if (!c || this.connected_) return;
              document.addEventListener("transitionend", this.onTransitionEnd_);
              window.addEventListener("resize", this.refresh);
              j
                ? ((this.mutationsObserver_ = new MutationObserver(
                    this.refresh
                  )),
                  this.mutationsObserver_.observe(document, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0,
                  }))
                : (document.addEventListener(
                    "DOMSubtreeModified",
                    this.refresh
                  ),
                  (this.mutationEventsAdded_ = !0));
              this.connected_ = !0;
            };
            a.prototype.disconnect_ = function () {
              if (!c || !this.connected_) return;
              document.removeEventListener(
                "transitionend",
                this.onTransitionEnd_
              );
              window.removeEventListener("resize", this.refresh);
              this.mutationsObserver_ && this.mutationsObserver_.disconnect();
              this.mutationEventsAdded_ &&
                document.removeEventListener(
                  "DOMSubtreeModified",
                  this.refresh
                );
              this.mutationsObserver_ = null;
              this.mutationEventsAdded_ = !1;
              this.connected_ = !1;
            };
            a.prototype.onTransitionEnd_ = function (a) {
              a = a.propertyName;
              var b = a === void 0 ? "" : a;
              a = i.some(function (a) {
                return !!~b.indexOf(a);
              });
              a && this.refresh();
            };
            a.getInstance = function () {
              this.instance_ || (this.instance_ = new a());
              return this.instance_;
            };
            a.instance_ = null;
            return a;
          })(),
          l = function (a, b) {
            for (var c = 0, d = Object.keys(b); c < d.length; c++) {
              var e = d[c];
              Object.defineProperty(a, e, {
                value: b[e],
                enumerable: !1,
                writable: !1,
                configurable: !0,
              });
            }
            return a;
          },
          m = function (a) {
            a = a && a.ownerDocument && a.ownerDocument.defaultView;
            return a || d;
          },
          n = x(0, 0, 0, 0);
        function o(a) {
          return parseFloat(a) || 0;
        }
        function p(a) {
          var b = [];
          for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
          return b.reduce(function (b, c) {
            c = a["border-" + c + "-width"];
            return b + o(c);
          }, 0);
        }
        function q(a) {
          var b = ["top", "right", "bottom", "left"],
            c = {};
          for (var d = 0, b = b; d < b.length; d++) {
            var e = b[d],
              f = a["padding-" + e];
            c[e] = o(f);
          }
          return c;
        }
        function r(a) {
          a = a.getBBox();
          return x(0, 0, a.width, a.height);
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
          d.boxSizing === "border-box" &&
            (Math.round(h + f) !== b && (h -= p(d, "left", "right") + f),
            Math.round(i + g) !== c && (i -= p(d, "top", "bottom") + g));
          if (!u(a)) {
            d = Math.round(h + f) - b;
            a = Math.round(i + g) - c;
            Math.abs(d) !== 1 && (h -= d);
            Math.abs(a) !== 1 && (i -= a);
          }
          return x(e.left, e.top, h, i);
        }
        var t = (function () {
          return typeof SVGGraphicsElement !== "undefined"
            ? function (a) {
                return a instanceof m(a).SVGGraphicsElement;
              }
            : function (a) {
                return (
                  a instanceof m(a).SVGElement &&
                  typeof a.getBBox === "function"
                );
              };
        })();
        function u(a) {
          return a === m(a).document.documentElement;
        }
        function v(a) {
          if (!c) return n;
          return t(a) ? r(a) : s(a);
        }
        function w(a) {
          var b = a.x,
            c = a.y,
            d = a.width;
          a = a.height;
          var e =
            typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
          e = Object.create(e.prototype);
          l(e, {
            x: b,
            y: c,
            width: d,
            height: a,
            top: c,
            right: b + d,
            bottom: a + c,
            left: b,
          });
          return e;
        }
        function x(a, b, c, d) {
          return { x: a, y: b, width: c, height: d };
        }
        var y = (function () {
            function a(a) {
              (this.broadcastWidth = 0),
                (this.broadcastHeight = 0),
                (this.contentRect_ = x(0, 0, 0, 0)),
                (this.target = a);
            }
            a.prototype.isActive = function () {
              var a = v(this.target);
              this.contentRect_ = a;
              return (
                a.width !== this.broadcastWidth ||
                a.height !== this.broadcastHeight
              );
            };
            a.prototype.broadcastRect = function () {
              var a = this.contentRect_;
              this.broadcastWidth = a.width;
              this.broadcastHeight = a.height;
              return a;
            };
            return a;
          })(),
          z = (function () {
            function a(a, b) {
              b = w(b);
              l(this, { target: a, contentRect: b });
            }
            return a;
          })(),
          A = (function () {
            function a(a, c, d) {
              this.activeObservations_ = [];
              this.observations_ = new b();
              if (typeof a !== "function")
                throw new TypeError(
                  "The callback provided as parameter 1 is not a function."
                );
              this.callback_ = a;
              this.controller_ = c;
              this.callbackCtx_ = d;
            }
            a.prototype.observe = function (a) {
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              if (
                typeof Element === "undefined" ||
                !(Element instanceof Object)
              )
                return;
              if (!(a instanceof m(a).Element))
                throw new TypeError('parameter 1 is not of type "Element".');
              var b = this.observations_;
              if (b.has(a)) return;
              b.set(a, new y(a));
              this.controller_.addObserver(this);
              this.controller_.refresh();
            };
            a.prototype.unobserve = function (a) {
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              if (
                typeof Element === "undefined" ||
                !(Element instanceof Object)
              )
                return;
              if (!(a instanceof m(a).Element))
                throw new TypeError('parameter 1 is not of type "Element".');
              var b = this.observations_;
              if (!b.has(a)) return;
              b["delete"](a);
              b.size || this.controller_.removeObserver(this);
            };
            a.prototype.disconnect = function () {
              this.clearActive(),
                this.observations_.clear(),
                this.controller_.removeObserver(this);
            };
            a.prototype.gatherActive = function () {
              var a = this;
              this.clearActive();
              this.observations_.forEach(function (b) {
                b.isActive() && a.activeObservations_.push(b);
              });
            };
            a.prototype.broadcastActive = function () {
              if (!this.hasActive()) return;
              var a = this.callbackCtx_,
                b = this.activeObservations_.map(function (a) {
                  return new z(a.target, a.broadcastRect());
                });
              this.callback_.call(a, b, a);
              this.clearActive();
            };
            a.prototype.clearActive = function () {
              this.activeObservations_.splice(0);
            };
            a.prototype.hasActive = function () {
              return this.activeObservations_.length > 0;
            };
            return a;
          })(),
          B = typeof WeakMap !== "undefined" ? new WeakMap() : new b(),
          C = (function () {
            function a(b) {
              if (!(this instanceof a))
                throw new TypeError("Cannot call a class as a function.");
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              var c = k.getInstance(),
                d = new A(b, c, this);
              B.set(this, d);
            }
            return a;
          })();
        ["observe", "unobserve", "disconnect"].forEach(function (a) {
          C.prototype[a] = function () {
            var b;
            return (b = B.get(this))[a].apply(b, arguments);
          };
        });
        var D = (function () {
          return typeof d.ResizeObserver !== "undefined" ? d.ResizeObserver : C;
        })();
        return D;
      });
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return h.exports;
    }
    function b(a) {
      switch (a) {
        case void 0:
          return k();
      }
    }
    e.exports = b;
  },
  null
);
__d(
  "resize-observer-polyfill",
  ["resize-observer-polyfill-1.5.1"],
  function (a, b, c, d, e, f) {
    e.exports = b("resize-observer-polyfill-1.5.1")();
  },
  null
);
/**
 * License: https://www.facebook.com/legal/license/t3hOLs8wlXy/
 */
__d(
  "styleq-0.1.3",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = {},
      h = { exports: g };
    function i() {
      Object.defineProperty(g, "__esModule", { value: !0 });
      g.styleq = void 0;
      var a = new WeakMap(),
        b = "$$css";
      function c(c) {
        var d, e, f;
        c != null &&
          ((d = c.disableCache === !0),
          (e = c.disableMix === !0),
          (f = c.transform));
        return function () {
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
              continue;
            }
            var n = f != null ? f(l) : l;
            if (n.$$css) {
              var o = "";
              if (i != null && i.has(n)) {
                var p = i.get(n);
                p != null && ((o = p[0]), c.push.apply(c, p[1]), (i = p[2]));
              } else {
                var q = [];
                for (var r in n) {
                  var s = n[r];
                  if (r === b) continue;
                  (typeof s === "string" || s === null) &&
                    (c.includes(r) ||
                      (c.push(r),
                      i != null && q.push(r),
                      typeof s === "string" && (o += o ? " " + s : s)));
                }
                if (i != null) {
                  var t = new WeakMap();
                  i.set(n, [o, q, t]);
                  i = t;
                }
              }
              o && (g = g ? o + " " + g : o);
            } else if (e) h == null && (h = {}), (h = Object.assign({}, n, h));
            else {
              var u = null;
              for (var v in n) {
                var w = n[v];
                w !== void 0 &&
                  (c.includes(v) ||
                    (w != null &&
                      (h == null && (h = {}),
                      u == null && (u = {}),
                      (u[v] = w)),
                    c.push(v),
                    (i = null)));
              }
              u != null && (h = Object.assign(u, h));
            }
          }
          var x = [g, h];
          return x;
        };
      }
      var d = c();
      g.styleq = d;
      d.factory = c;
    }
    var j = !1;
    function k() {
      j || ((j = !0), i());
      return h.exports;
    }
    b = {};
    var l = { exports: b };
    function m() {
      l.exports = k();
    }
    var n = !1;
    function o() {
      n || ((n = !0), m());
      return l.exports;
    }
    function a(a) {
      switch (a) {
        case void 0:
          return o();
      }
    }
    e.exports = a;
  },
  null
);
__d(
  "styleq",
  ["styleq-0.1.3"],
  function (a, b, c, d, e, f) {
    e.exports = b("styleq-0.1.3")();
  },
  null
);
