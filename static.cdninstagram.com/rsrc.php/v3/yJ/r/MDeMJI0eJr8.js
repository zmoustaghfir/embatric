/*FB_PKG_DELIM*/

__d(
  "PolarisEmbedConstants",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = "embed";
    f.EMBED_ANALYTICS_CONTEXT = a;
  },
  66
);
__d(
  "PolarisResponsiveBlock.react",
  ["PolarisRefUtils", "react", "resize-observer-polyfill"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    a = h;
    var j = a.useEffect,
      k = a.useRef,
      l;
    function m() {
      l == null &&
        (l = new (c("resize-observer-polyfill"))(function (a) {
          a.forEach(function (a) {
            var b = a.contentRect,
              c = b.height;
            b = b.width;
            a = a.target;
            a._onResize && a._onResize(b, c);
          });
        }));
      return l;
    }
    b = i.forwardRef(function (a, b) {
      var c = k(null);
      b = d("PolarisRefUtils").createRefHandler(c, b);
      j(
        function () {
          var b = m(),
            d = c.current;
          d && (b.observe(d), (d._onResize = a.onResize));
          return function () {
            d && (b.unobserve(d), delete d._onResize);
          };
        },
        [c, a.onResize]
      );
      return i.jsx("div", {
        className: a.className,
        "data-testid": void 0,
        ref: b,
        style: a.style,
        children: a.children,
      });
    });
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "PolarisHScrollAnimationController.react",
  [
    "cx",
    "invariant",
    "PolarisEventListener",
    "PolarisEventLoop",
    "PolarisResponsiveBlock.react",
    "PolarisUA",
    "joinClasses",
    "nullthrows",
    "polarisDebounce",
    "react",
    "shallowEqual",
  ],
  function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j,
      k = j || d("react"),
      l = 50,
      m = 300,
      n = 0.75,
      o = 30,
      p = 20,
      q = 30;
    function a(a) {
      return Math.pow(Math.abs(a), 0.75) * 10;
    }
    b = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b) {
        var d;
        d = a.call(this, b) || this;
        d.$20 = function () {
          d.setState(function (a, b) {
            b = b.onAnimationEnd;
            var c = a.futureScrollLeft;
            d.$21(b, a.currentScrollLeft, c);
            return { currentScrollLeft: c, futureScrollLeft: c };
          });
        };
        d.$28 = function (a) {
          if (d.isAnimated()) return;
          a = a;
          var b = a.deltaMode,
            e = a.deltaX;
          d.setState(function (a, f) {
            f = f.onUserScroll;
            var g = a.currentScrollLeft;
            d.$5 == null && (d.$5 = g);
            var h = d.$5;
            a = [1, 16, a.outerWidth];
            g += e * a[b];
            g = d.$17(g);
            d.$6 != null && c("PolarisEventLoop").clearTimeout(d.$6);
            d.$6 = c("PolarisEventLoop").setTimeout(d.$29, m);
            f != null && f({ scrollLeft: g, scrollRight: d.$25(g) });
            a = Math.abs(g - h);
            a > o && (d.$13 = !0);
            d.$18();
            return { currentScrollLeft: g, futureScrollLeft: g };
          });
        };
        d.$30 = function (a) {
          a.touches.length > 1 || d.isAnimated()
            ? (d.$7 = null)
            : ((d.$7 = a.touches[0].clientX),
              (d.$8 = a.touches[0].clientY),
              (d.$12 = d.state.currentScrollLeft)),
            d.$18();
        };
        d.$31 = function (a) {
          if (d.$7 == null || d.$8 == null || d.$12 == null || d.isAnimated())
            return;
          var b = d.$12,
            c = a.touches[0].clientX - d.$7;
          a = a.touches[0].clientY - d.$8;
          var e = b - c;
          e = d.$26(e);
          if (!d.$11) {
            b = Math.abs(c) > Math.abs(a);
            b && ((d.$13 = !0), (d.$10 = window.scrollY));
            d.$11 = !0;
          }
          d.$13 &&
            d.$10 === window.scrollY &&
            d.setState(function (a, b) {
              a = b.onUserScroll;
              a != null && a({ scrollLeft: e, scrollRight: d.$25(e) });
              return { currentScrollLeft: e, futureScrollLeft: e };
            });
        };
        d.$32 = function () {
          d.$7 != null && d.$29(), (d.$7 = null), (d.$8 = null), (d.$11 = !1);
        };
        d.$29 = function () {
          var a = d.props.onUserScrollEnd;
          if (a != null) {
            var b = d.state.currentScrollLeft;
            a({ scrollLeft: b, scrollRight: d.$25(b) });
          }
          d.$13 = !1;
          d.$5 = null;
        };
        d.$33 = function (a) {
          a = a;
          var b = d.state.futureScrollLeft;
          a.keyCode === 37
            ? d.props.snapPoints
              ? d.scrollTo(d.$22(b))
              : d.scrollBy(-p)
            : a.keyCode === 39 &&
              (d.props.snapPoints ? d.scrollTo(d.$23(b)) : d.scrollBy(p));
        };
        d.$34 = function (a) {
          if (d.$13 && a.cancelable) {
            a.preventDefault();
            a.stopPropagation();
            return !1;
          }
          return void 0;
        };
        d.$15 = function (a, b) {
          d.$35(d.state.innerWidth, a, b);
        };
        d.$36 = function (a, b) {
          d.$35(a, d.state.outerWidth, b);
        };
        d.$15 = c("polarisDebounce")(
          d.$15,
          l,
          babelHelpers.assertThisInitialized(d)
        );
        d.state = {
          currentScrollLeft: 0,
          futureScrollLeft: 0,
          height: 0,
          innerWidth: 0,
          outerWidth: 0,
        };
        return d;
      }
      var e = b.prototype;
      e.getScrollableElement = function () {
        return this.$4;
      };
      e.isAnimated = function (a) {
        a = a || this.state;
        return a.currentScrollLeft !== a.futureScrollLeft;
      };
      e.scrollTo = function (a, b) {
        b === void 0 && (b = {}),
          this.scrollBy(a - this.state.futureScrollLeft, b);
      };
      e.scrollBy = function (a, b) {
        var d = this;
        b = b === void 0 ? {} : b;
        var e = b.animated,
          f = e === void 0 ? !0 : e;
        e = b.snap;
        var g = e === void 0 ? !0 : e;
        this.setState(function (b, e) {
          g = g && e.snapPoints != null;
          b = b.futureScrollLeft + a;
          g && (b = d.$16(b));
          b = d.$17(b);
          d.$18();
          d.$9 != null && (d.$9.remove(), (d.$9 = null));
          if (!f) return { currentScrollLeft: b, futureScrollLeft: b };
          var h = d.$19();
          d.$4 || i(0, 51628);
          d.$9 = c("PolarisEventListener").add(d.$4, "transitionend", d.$20);
          d.$21(e.onAnimationStart, h, b);
          return { currentScrollLeft: h, futureScrollLeft: b };
        });
      };
      e.$22 = function (a) {
        var b = this.props.snapPoints;
        return this.$16(
          a,
          b &&
            b.filter(function (b) {
              return b < a;
            }),
          [0]
        );
      };
      e.$23 = function (a) {
        var b = this.props.snapPoints;
        return this.$16(
          a,
          b &&
            b.filter(function (b) {
              return b > a;
            }),
          [this.state.innerWidth - this.state.outerWidth]
        );
      };
      e.$24 = function (a) {
        return Math.abs(a) >= q;
      };
      e.$16 = function (a, b, c) {
        b = b || this.props.snapPoints;
        b != null || i(0, 51629);
        c = c || [0, this.state.innerWidth - this.state.outerWidth];
        var d = function (b) {
            return Math.abs(b - a);
          },
          e = this.$12 || 0,
          f = this.$24(d(e)),
          g = e < a && f;
        f = e > a && f;
        var h = Infinity;
        b = b.concat(c);
        for (
          var c = b,
            b = Array.isArray(c),
            j = 0,
            c = b
              ? c
              : c[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var k;
          if (b) {
            if (j >= c.length) break;
            k = c[j++];
          } else {
            j = c.next();
            if (j.done) break;
            k = j.value;
          }
          k = k;
          if (g && k <= e) continue;
          if (f && k >= e) continue;
          d(k) < d(h) && (h = k);
        }
        return h === Infinity ? e : h;
      };
      e.$19 = function () {
        if (!this.$4) return this.state.currentScrollLeft;
        var a = window.getComputedStyle(this.$4);
        a = a.transform || a.webkitTransform;
        if (!a) return this.state.currentScrollLeft;
        var b = window.WebKitCSSMatrix || window.MSCSSMatrix;
        if (b) {
          b = new b(a);
          return -b.m41;
        }
        return this.state.currentScrollLeft;
      };
      e.$21 = function (a, b, c) {
        if (a == null) return;
        a({
          from: { scrollLeft: b, scrollRight: this.$25(b) },
          to: { scrollLeft: c, scrollRight: this.$25(c) },
        });
      };
      e.$25 = function (a, b, c) {
        c = c || this.state.outerWidth;
        b = Math.max(c, b || this.state.innerWidth);
        return b - c - a;
      };
      e.$17 = function (a, b, c) {
        c = c || this.state.outerWidth;
        b = Math.max(c, b || this.state.innerWidth);
        return Math.min(b - c, Math.max(0, a));
      };
      e.$26 = function (a) {
        var b = this.$25(a);
        if (a < 0) return -Math.pow(-a, n);
        else if (b < 0) {
          var c = -Math.pow(-b, n);
          return a - (c - b);
        }
        return a;
      };
      e.$27 = function (a) {
        var b = Math.min(a.currentScrollLeft, a.futureScrollLeft),
          c = Math.max(a.currentScrollLeft, a.futureScrollLeft) + a.outerWidth;
        return {
          bottom: a.height,
          height: a.height,
          left: b,
          right: c,
          top: 0,
          width: c - b,
        };
      };
      e.$35 = function (a, b, c) {
        var d = this;
        if (!this.$1) return;
        this.setState(function (e, f) {
          f = f.onResize;
          e = d.$17(e.futureScrollLeft, a, b);
          var g = d.$25(e, a, b);
          f && f({ scrollLeft: e, scrollRight: g });
          return {
            currentScrollLeft: e,
            futureScrollLeft: e,
            height: c,
            innerWidth: a,
            outerWidth: b,
          };
        });
      };
      e.$37 = function (a, b) {
        a = a.onVisibilityChange;
        if (a != null) {
          b = this.$27(b);
          c("shallowEqual")(this.$14, b) || (a(b), (this.$14 = b));
        }
      };
      e.$18 = function () {
        var a = this.$3;
        a && (a.scrollLeft = 0);
      };
      e.render = function () {
        var a = this,
          b = this.props,
          d = b.children;
        b = b.className;
        return k.jsx(c("PolarisResponsiveBlock.react"), {
          className: c("joinClasses")(b, "_adc-"),
          onResize: this.$15,
          ref: function (b) {
            return (a.$3 = b);
          },
          children: k.jsx("div", {
            className: "_adc_",
            onTouchEnd: this.$32,
            onTouchMove: this.$31,
            onTouchStart: this.$30,
            ref: function (b) {
              return (a.$4 = b);
            },
            tabIndex: 0,
            children: k.jsx(c("PolarisResponsiveBlock.react"), {
              className: "_add0",
              onResize: this.$36,
              children: d,
            }),
          }),
        });
      };
      e.componentDidUpdate = function (a, b) {
        var d = this;
        this.$37(this.props, this.state);
        var e = c("nullthrows")(this.$4);
        a = this.state;
        var f = a.currentScrollLeft;
        a = a.futureScrollLeft;
        a = a - f;
        f = this.props.getAnimationDuration(a);
        f = Math.max(f, 1);
        e.style.transitionDuration = (this.isAnimated() ? f / 1e3 : 0) + "s";
        if (this.isAnimated() === this.isAnimated(b)) {
          a = "translateX(" + -this.state.futureScrollLeft + "px)";
          e.style.webkitTransform = a;
          e.style.transform = a;
          return;
        }
        window.requestAnimationFrame(function () {
          void e.offsetHeight;
          var a = "translateX(" + -d.state.futureScrollLeft + "px)";
          e.style.webkitTransform = a;
          e.style.transform = a;
        });
      };
      e.componentDidMount = function () {
        var a = c("nullthrows")(this.$4);
        this.$1 = !0;
        this.$37(this.props, this.state);
        d("PolarisUA").isDesktop() &&
          (a.addEventListener("wheel", this.$28),
          document.addEventListener("wheel", this.$34));
        document.addEventListener("touchmove", this.$34);
        a.addEventListener("keydown", this.$33);
        a.addEventListener("touchforcechange", this.$34);
      };
      e.componentWillUnmount = function () {
        var a = c("nullthrows")(this.$4);
        this.$1 = !1;
        d("PolarisUA").isDesktop() &&
          (a.removeEventListener("wheel", this.$28),
          document.removeEventListener("wheel", this.$34));
        document.removeEventListener("touchmove", this.$34);
        a.removeEventListener("keydown", this.$33);
        a.removeEventListener("touchforcechange", this.$34);
        this.$6 && c("PolarisEventLoop").clearTimeout(this.$6);
        this.$9 != null && (this.$9.remove(), (this.$9 = null));
        this.$2 && this.$2();
      };
      return b;
    })(k.PureComponent);
    b.defaultProps = { getAnimationDuration: a };
    g["default"] = b;
  },
  98
);
__d(
  "PolarisPagerButton.react",
  [
    "cx",
    "Locale",
    "PolarisGenericStrings",
    "PolarisIGTheme.react",
    "PolarisSponsoredPostContext.react",
    "PolarisUA",
    "keyMirror",
    "react",
  ],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || (i = d("react")),
      k = i.useContext,
      l = c("keyMirror")({ next: null, previous: null }),
      m = c("keyMirror")({
        creation: null,
        default: null,
        guides: null,
        pdp: null,
        sidecar: null,
        stories: null,
        stories_v2: null,
      });
    function a(a) {
      var b = a.direction,
        e = a.enabled,
        f = a.onClick;
      a = a.variant;
      a = a === void 0 ? m["default"] : a;
      var g = d("PolarisIGTheme.react").useTheme(),
        h = k(
          d("PolarisSponsoredPostContext.react").PolarisSponsoredPostContext
        );
      h = h.carouselImagesAsCta;
      g = g.getTheme() === d("PolarisIGTheme.react").IGTheme.Dark;
      var i = b === l.previous;
      b = b === l.next;
      var n = a === m.creation,
        o = a === m["default"],
        p = a === m.sidecar,
        q = a === m.stories || a === m.stories_v2,
        r = a === m.guides,
        s = a === m.pdp;
      a = a === m.stories_v2;
      var t = function (a) {
        return a.stopPropagation();
      };
      n = q || n || (o && g);
      var u = c("Locale").isRTL(),
        v = (i && !u) || (b && u);
      u = (b && !u) || (i && u);
      q = e
        ? j.jsx("button", {
            "aria-label": i
              ? d("PolarisGenericStrings").GO_BACK
              : d("PolarisGenericStrings").NEXT,
            className:
              (o ? "_a9_u" : "") +
              (i ? " _afxv" : "") +
              (b ? " _afxw" : "") +
              (i || b ? " _al46" : "") +
              (n && !a ? " _aahj" : "") +
              (r && d("PolarisUA").isMobile() ? " _aahk" : "") +
              (r && d("PolarisUA").isDesktop() ? " _aahl" : "") +
              (q && d("PolarisUA").isDesktop() ? " _aahm" : "") +
              (a && d("PolarisUA").isDesktop() ? " _akl_" : "") +
              (h ? "" : " _al47"),
            "data-testid": void 0,
            onClick: f,
            onDoubleClick: t,
            tabIndex: -1,
            children: j.jsx("div", {
              className:
                (o && v && !g ? "_afxx" : "") +
                (o && u && !g ? " _afxy" : "") +
                (o && !g ? " _9zs0" : "") +
                ((p || r || s) && v ? " _9zm0" : "") +
                ((p || r || s) && u ? " _9zm2" : "") +
                (n && v ? " _9zs1" : "") +
                (n && u ? " _9zs2" : ""),
            }),
          })
        : null;
      if (h)
        return j.jsx("div", {
          className:
            (o ? "_a9_u" : "") +
            (i ? " _afxv" : "") +
            (b ? " _afxw" : "") +
            " _al48" +
            (i && e ? " _al49" : "") +
            (b && e ? " _al4a" : "") +
            (e ? "" : " _al4b") +
            " _al47",
          children: q,
        });
      else return q;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g.PAGER_BUTTON_DIRECTIONS = l;
    g.PAGER_BUTTON_VARIANTS = m;
    g.PagerButton = a;
  },
  98
);
__d(
  "PolarisHScrollContainer.react",
  [
    "cx",
    "invariant",
    "ExecutionEnvironment",
    "PolarisHScrollAnimationController.react",
    "PolarisPagerButton.react",
    "joinClasses",
    "react",
  ],
  function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j,
      k,
      l = k || d("react");
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b) {
        var c;
        c = a.call(this, b) || this;
        c.$1 = l.createRef();
        c.$4 = function () {
          c.$3(!1);
        };
        c.$5 = function () {
          c.$3(!0);
        };
        c.$6 = function (a) {
          c.$7(a), c.props.onResize && c.props.onResize(a);
        };
        c.$8 = function (a) {
          c.props.onLogEvent != null &&
            c.props.onLogEvent({ source: "hscroll", type: "scroll" }),
            c.$7(a);
        };
        c.$9 = function (a) {
          c.$2 != null && c.props.snapPoints != null && c.$2.scrollBy(0);
        };
        c.$10 = function (a) {
          c.$7(a.to);
        };
        c.state = { leftPagerEnabled: !1, rightPagerEnabled: !1 };
        return c;
      }
      var e = b.prototype;
      e.getClickScrollIncrement = function () {
        this.$2 != null || i(0, 63797);
        if (this.props.clickScrollIncrement != null)
          return this.props.clickScrollIncrement;
        var a = this.$2.getScrollableElement();
        a != null || i(0, 63798);
        return a.offsetWidth;
      };
      e.getContainerElement = function () {
        return this.$1.current;
      };
      e.$3 = function (a) {
        this.props.onLogEvent != null &&
          this.props.onLogEvent({ source: "hscroll", type: "click" });
        var b = this.getClickScrollIncrement();
        this.$2 != null && this.$2.scrollBy(a ? b : -b);
      };
      e.scrollToNext = function () {
        this.$5();
      };
      e.$7 = function (a) {
        var b = a.scrollLeft;
        a = a.scrollRight;
        this.setState({ leftPagerEnabled: b > 0, rightPagerEnabled: a > 0 });
      };
      e.render = function () {
        var a = this,
          b = this.props,
          e = b.children,
          f = b.className,
          g = b.disablePagerButtons,
          h = b.getAnimationDuration,
          i = b.onVisibilityChange;
        b = b.snapPoints;
        return !(j || (j = c("ExecutionEnvironment"))).canUseDOM
          ? l.jsx("div", {
              className: c("joinClasses")(f, "_adl5"),
              ref: this.$1,
              children: e,
            })
          : l.jsxs("div", {
              className: c("joinClasses")(f, "_adl6"),
              ref: this.$1,
              children: [
                l.jsx(c("PolarisHScrollAnimationController.react"), {
                  getAnimationDuration: h,
                  onAnimationStart: this.$10,
                  onResize: this.$6,
                  onUserScroll: this.$8,
                  onUserScrollEnd: this.$9,
                  onVisibilityChange: i,
                  ref: function (b) {
                    return (a.$2 = b);
                  },
                  snapPoints: b,
                  children: e,
                }),
                l.jsx(d("PolarisPagerButton.react").PagerButton, {
                  direction: d("PolarisPagerButton.react")
                    .PAGER_BUTTON_DIRECTIONS.previous,
                  enabled: this.state.leftPagerEnabled && !g,
                  onClick: this.$4,
                  variant: this.props.pagerVariant,
                }),
                l.jsx(d("PolarisPagerButton.react").PagerButton, {
                  direction: d("PolarisPagerButton.react")
                    .PAGER_BUTTON_DIRECTIONS.next,
                  enabled: this.state.rightPagerEnabled && !g,
                  onClick: this.$5,
                  variant: this.props.pagerVariant,
                }),
              ],
            });
      };
      return b;
    })(l.PureComponent);
    g["default"] = a;
  },
  98
);
__d(
  "PolarisTransition.react",
  ["keyMirror", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react"),
      j = c("keyMirror")({
        ENTERED: null,
        ENTERING: null,
        EXITED: null,
        EXITING: null,
      });
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b, c;
        for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++)
          e[f] = arguments[f];
        return (
          ((b = c = a.call.apply(a, [this].concat(e)) || this),
          (c.state = {
            status: c.props["in"] && !c.props.appear ? j.ENTERED : j.EXITED,
          }),
          (c.$6 = function () {
            (c.$1 = null), c.$3(j.ENTERED);
          }),
          (c.$8 = function () {
            (c.$2 = null), c.$3(j.EXITED);
          }),
          b) || babelHelpers.assertThisInitialized(c)
        );
      }
      var c = b.prototype;
      c.componentDidMount = function () {
        this.props["in"] && this.props.appear && this.$3(j.ENTERING);
      };
      c.componentDidUpdate = function (a, b) {
        b = this.$4(this.state.status, a["in"], this.props["in"]);
        this.state.status !== b && this.$3(b);
      };
      c.componentWillUnmount = function () {
        this.$1 != null && window.clearTimeout(this.$1),
          this.$2 != null && window.clearTimeout(this.$2);
      };
      c.$4 = function (a, b, c) {
        if (b && !c && (a === j.ENTERING || a === j.ENTERED)) return j.EXITING;
        return !b && c && (a === j.EXITING || a === j.EXITED) ? j.ENTERING : a;
      };
      c.$5 = function () {
        if (this.$1 != null) return;
        this.$1 = window.setTimeout(this.$6, this.props.timeout);
        this.$2 != null && (window.clearTimeout(this.$2), (this.$2 = null));
      };
      c.$7 = function () {
        if (this.$2 != null) return;
        this.$2 = window.setTimeout(this.$8, this.props.timeout);
        this.$1 != null && (window.clearTimeout(this.$1), (this.$1 = null));
      };
      c.$3 = function (a) {
        var b = this;
        this.state.status !== a &&
          this.setState({ status: a }, function () {
            switch (a) {
              case j.ENTERING:
                b.$5();
                b.props.onEntering();
                break;
              case j.ENTERED:
                b.props.onEntered();
                break;
              case j.EXITING:
                b.$7();
                b.props.onExiting();
                break;
              case j.EXITED:
                b.props.onExited();
                break;
              default:
                break;
            }
          });
      };
      c.render = function () {
        var a = this.props.children;
        return typeof a === "function"
          ? a(this.state.status)
          : i.Children.only(a);
      };
      return b;
    })(i.Component);
    a.defaultProps = {
      appear: !1,
      in: !0,
      onEntered: function () {},
      onEntering: function () {},
      onExited: function () {},
      onExiting: function () {},
      timeout: 300,
    };
    g.TRANSITION_STATUS = j;
    g.Transition = a;
  },
  98
);
__d(
  "PolarisTransitionUtils",
  ["differenceSets", "memoize", "nullthrows"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = (function () {
      function a(a) {
        var b = this;
        this.$1 = [];
        this.$2 = new Map();
        this.getTransitions = c("memoize")(function () {
          return b.$1.map(function (a) {
            return c("nullthrows")(b.$2.get(a));
          });
        });
        a != null && ((this.$1 = [].concat(a.$1)), (this.$2 = new Map(a.$2)));
      }
      var b = a.prototype;
      b.$3 = function (a) {
        var b = this;
        a.forEach(function (a) {
          b.$2.has(a) || b.$2.set(a, { appear: !1, in: !0, key: a });
        });
      };
      b.$4 = function (a) {
        this.$2.set(
          a,
          babelHelpers["extends"]({}, this.$2.get(a), { appear: !0, in: !0 })
        );
      };
      b.$5 = function (a) {
        this.$2.set(a, babelHelpers["extends"]({}, this.$2.get(a), { in: !1 }));
      };
      b.$6 = function (a) {
        this.$3(a), (this.$1 = [].concat(a));
      };
      b.$7 = function (a) {
        var b = this;
        this.$3(a);
        var d = this.$1,
          e = new Set(d),
          f = new Set(a),
          g = c("differenceSets")(f, e);
        e = c("differenceSets")(e, f);
        f = [].concat(a);
        if (e.size > 0) {
          a = d.reduce(function (b, c, a) {
            return babelHelpers["extends"]({}, b, ((b = {}), (b[c] = a), b));
          }, {});
          d = 0;
          for (
            var h = e,
              i = Array.isArray(h),
              j = 0,
              h = i
                ? h
                : h[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var k;
            if (i) {
              if (j >= h.length) break;
              k = h[j++];
            } else {
              j = h.next();
              if (j.done) break;
              k = j.value;
            }
            k = k;
            var l = a[k];
            f.splice(l + d, 0, k);
            d++;
          }
        }
        g.forEach(function (a) {
          return b.$4(a);
        });
        e.forEach(function (a) {
          return b.$5(a);
        });
        this.$1 = f;
      };
      b.$8 = function (a) {
        this.$2["delete"](a),
          (this.$1 = this.$1.filter(function (b) {
            return b !== a;
          }));
      };
      a.create = function (b) {
        var c = new a();
        c.$6(b);
        return c;
      };
      b.update = function (b) {
        var c = new a(this);
        c.$7(b);
        return c;
      };
      b["delete"] = function (b) {
        var c = new a(this);
        c.$8(b);
        return c;
      };
      return a;
    })();
    g.TransitionManager = a;
  },
  98
);
__d(
  "PolarisTransitionGroup.react",
  [
    "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE",
    "PolarisTransitionUtils",
    "nullthrows",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function i(a) {
      a = j(a, "string");
      return typeof a === "symbol" ? a : String(a);
    }
    function j(a, b) {
      if (typeof a !== "object" || a === null) return a;
      var c =
        a[typeof Symbol === "function" ? Symbol.toPrimitive : "@@toPrimitive"];
      if (c !== void 0) {
        c = c.call(a, b || "default");
        if (typeof c !== "object") return c;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (b === "string" ? String : Number)(a);
    }
    var k = h || d("react");
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b, e;
        for (var f = arguments.length, g = new Array(f), h = 0; h < f; h++)
          g[h] = arguments[h];
        return (
          ((b = e = a.call.apply(a, [this].concat(g)) || this),
          (e.state = {
            transitionManager: d(
              "PolarisTransitionUtils"
            ).TransitionManager.create(
              e.props.children != null
                ? k.Children.map(
                    e.props.children,
                    function (a) {
                      return c("nullthrows")(
                        c(
                          "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                        )(a).key
                      );
                    },
                    babelHelpers.assertThisInitialized(e)
                  )
                : []
            ),
            transitions: Object.freeze({}),
          }),
          b) || babelHelpers.assertThisInitialized(e)
        );
      }
      b.getDerivedStateFromProps = function (a, b) {
        a = (a = a.children) != null ? a : [];
        var d = babelHelpers["extends"]({}, b.transitions);
        k.Children.forEach(a, function (a) {
          return (d[
            c("nullthrows")(
              c(
                "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
              )(a).key
            )
          ] = a);
        });
        a = k.Children.map(a, function (a) {
          return c("nullthrows")(
            c("DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE")(
              a
            ).key
          );
        });
        b = b.transitionManager.update(a);
        return { transitionManager: b, transitions: d };
      };
      var e = b.prototype;
      e.$1 = function (a) {
        var b = this.state.transitions[a];
        this.setState(function (b) {
          var c = b.transitions;
          c[a];
          c = babelHelpers.objectWithoutPropertiesLoose(c, [a].map(i));
          return {
            transitionManager: b.transitionManager["delete"](a),
            transitions: c,
          };
        });
        (b = c("DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE")(
          b
        ).props) == null
          ? void 0
          : b.onExited();
      };
      e.render = function () {
        var a = this,
          b = this.state.transitionManager.getTransitions();
        return b.map(function (b) {
          var c = b.key;
          b = babelHelpers.objectWithoutPropertiesLoose(b, ["key"]);
          var d = a.state.transitions[c];
          return k.cloneElement(
            d,
            babelHelpers["extends"]({}, b, {
              onExited: function () {
                return a.$1(c);
              },
            })
          );
        });
      };
      return b;
    })(k.PureComponent);
    g["default"] = a;
  },
  98
);
__d(
  "PolarisHScrollCardContainer.react",
  [
    "cx",
    "ExecutionEnvironment",
    "PolarisHScrollContainer.react",
    "PolarisTransition.react",
    "PolarisTransitionGroup.react",
    "joinClasses",
    "react",
  ],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j,
      k = j || d("react"),
      l = 100;
    a = 3;
    var m = 0.3 * 1e3;
    b = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b) {
        var d;
        d = a.call(this, b) || this;
        d.$3 = k.createRef();
        d.$4 = function () {
          var a = d.$3.current;
          if (a != null) {
            a = (a = a.getContainerElement()) == null ? void 0 : a.offsetWidth;
            a != null && d.setState({ containerWidth: a });
          }
        };
        d.$5 = function (a) {
          if (a.width === 0) return;
          var b = d.props,
            c = b.cardWidth,
            e = b.children,
            f = b.gapWidth;
          b = b.onVisibilityChange;
          d.setState({
            firstRendered: Math.floor((a.left - l) / (c + f)),
            lastRendered: Math.floor((a.right + l) / (c + f)),
            lastRenderedPercentage: (a.right + l) / (c + f),
          });
          if (b) {
            e = k.Children.count(e);
            var g = Math.floor(Math.floor(a.left) / Math.floor(c + f));
            a = Math.floor(Math.floor(a.right) / Math.floor(c + f));
            g = Math.max(0, Math.min(e, g));
            a = Math.max(0, Math.min(e, a));
            (d.$1 !== g || d.$2 !== a) && (b(g, a), (d.$1 = g), (d.$2 = a));
          }
        };
        d.state = {
          containerWidth: 0,
          firstRendered: 0,
          lastRendered: (i || (i = c("ExecutionEnvironment"))).canUseDOM
            ? d.props.initialRenderedCount - 1
            : Infinity,
          lastRenderedPercentage: (i || (i = c("ExecutionEnvironment")))
            .canUseDOM
            ? d.props.initialRenderedCount - 1
            : Infinity,
        };
        return d;
      }
      var e = b.prototype;
      e.getSnapPoints = function () {
        var a = this.props,
          b = a.cardWidth,
          c = a.children;
        a = a.gapWidth;
        c = k.Children.count(c);
        var d = [];
        for (var e = 1; e < c; e++) d.push(e * (b + a));
        return d;
      };
      e.getClickScrollIncrement = function () {
        var a = this.props,
          b = a.cardWidth;
        a = a.gapWidth;
        var c = this.state.containerWidth;
        c = Math.floor(c / (b + a));
        c = Math.max(1, c);
        return c * (b + a);
      };
      e.scrollToNext = function () {
        this.$3.current && this.$3.current.scrollToNext();
      };
      e.render = function () {
        var a = this.props,
          b = a.cardClassName,
          e = a.cardWidth,
          f = a.children,
          g = a.className,
          h = a.collapsibleCardClassName,
          i = a.disablePagerBelowRenderedPercentage,
          j = a.disablePagerButtons,
          l = a.gapWidth,
          o = a.getAnimationDuration;
        a = a.gutterWidth;
        var p = this.state,
          q = p.firstRendered,
          r = p.lastRendered;
        p =
          k.Children.count(this.props.children) === r &&
          this.state.lastRenderedPercentage - this.state.lastRendered >= i;
        return k.jsx(c("PolarisHScrollContainer.react"), {
          className: g,
          clickScrollIncrement: this.getClickScrollIncrement(),
          disablePagerButtons: j || p,
          getAnimationDuration: o,
          onLogEvent: this.props.onLogEvent,
          onResize: this.$4,
          onVisibilityChange: this.$5,
          pagerVariant: this.props.pagerVariant,
          ref: this.$3,
          snapPoints: this.getSnapPoints(),
          children: k.jsx("ul", {
            className: "_adxh",
            style: { paddingLeft: a - l, paddingRight: a },
            children:
              f != null
                ? k.jsx(c("PolarisTransitionGroup.react"), {
                    children: k.Children.map(f, function (a, c) {
                      return k.jsx(
                        d("PolarisTransition.react").Transition,
                        {
                          timeout: m,
                          children: function (f) {
                            return k.jsx(n, {
                              cardClassName: b,
                              cardWidth: e,
                              collapsed:
                                f ===
                                  d("PolarisTransition.react").TRANSITION_STATUS
                                    .EXITING ||
                                f ===
                                  d("PolarisTransition.react").TRANSITION_STATUS
                                    .EXITED,
                              collapsibleCardClassName: h,
                              gapWidth: l,
                              unrendered: c < q || c > r,
                              children: a,
                            });
                          },
                        },
                        a.key
                      );
                    }),
                  })
                : null,
          }),
        });
      };
      return b;
    })(k.PureComponent);
    b.defaultProps = {
      disablePagerBelowRenderedPercentage: 1,
      initialRenderedCount: a,
    };
    function n(a) {
      var b = a.cardClassName,
        d = a.cardWidth,
        e = a.children,
        f = a.collapsed,
        g = a.collapsibleCardClassName,
        h = a.gapWidth;
      a = a.unrendered;
      return k.jsx("li", {
        className: c("joinClasses")("_adxi", g),
        style: { opacity: f ? 0 : 1, width: f ? 0 : d + h },
        children:
          !a &&
          k.jsx("div", {
            className: c("joinClasses")("_adxj", b),
            style: { marginLeft: h, width: d },
            children: e,
          }),
      });
    }
    n.displayName = n.name + " [from " + f.id + "]";
    g["default"] = b;
  },
  98
);
__d(
  "polarisGetDisplayName",
  ["isStringNullOrEmpty"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a(a) {
      var b;
      return c("isStringNullOrEmpty")(a.displayName)
        ? (b = a.name) != null
          ? b
          : "Component"
        : a.displayName;
    }
    g["default"] = a;
  },
  98
);
__d(
  "polarisWithRemountOnChange",
  ["polarisGetDisplayName", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      return function (b) {
        var d, e;
        return (
          (e = d =
            (function (c) {
              babelHelpers.inheritsLoose(d, c);
              function d() {
                var a, b;
                for (
                  var d = arguments.length, e = new Array(d), f = 0;
                  f < d;
                  f++
                )
                  e[f] = arguments[f];
                return (
                  ((a = b = c.call.apply(c, [this].concat(e)) || this),
                  (b.state = { keyId: 0 }),
                  a) || babelHelpers.assertThisInitialized(b)
                );
              }
              var e = d.prototype;
              e.getPassedProps = function (a) {
                a.innerRef;
                a = babelHelpers.objectWithoutPropertiesLoose(a, ["innerRef"]);
                return a;
              };
              e.componentDidUpdate = function (b, c) {
                c.keyId === this.state.keyId &&
                  a(this.getPassedProps(this.props), this.getPassedProps(b)) &&
                  this.setState(function (a) {
                    a = a.keyId;
                    return { keyId: a + 1 };
                  });
              };
              e.render = function () {
                var a = this.props.innerRef,
                  c = this.getPassedProps(this.props);
                return i.jsx(
                  b,
                  babelHelpers["extends"]({ ref: a }, c),
                  this.state.keyId
                );
              };
              return d;
            })(i.Component)),
          (d.displayName =
            "withRemountOnChange(" + c("polarisGetDisplayName")(b) + ")"),
          e
        );
      };
    }
    g["default"] = a;
  },
  98
);
__d(
  "PolarisResponsiveImage.react",
  [
    "PolarisBatchDOM",
    "PolarisUA",
    "gkx",
    "memoize",
    "nullthrows",
    "one-trace",
    "performanceNow",
    "polarisGetCrossOriginAttribute",
    "polarisWithRemountOnChange",
    "react",
    "vc-tracker",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || d("react"),
      k = c("memoize")(function () {
        return "srcset" in document.createElement("img");
      }),
      l = c("memoize")(function () {
        return d("PolarisUA").isFirefox();
      }),
      m = 0,
      n = 1080;
    b = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b, c;
        for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++)
          e[f] = arguments[f];
        return (
          ((b = c = a.call.apply(a, [this].concat(e)) || this),
          (c.$2 = !1),
          (c.$3 = m++),
          (c.$4 = null),
          (c.$5 = null),
          (c.$11 = function (a) {
            c.$4 !== c.$5 && c.props.onLoad && c.props.onLoad(a, !1),
              (c.$4 = c.$5);
          }),
          (c.$12 = function (a) {
            (c.$1 = a), c.props.imgRef && c.props.imgRef(a);
          }),
          b) || babelHelpers.assertThisInitialized(c)
        );
      }
      var e = b.prototype;
      e.$6 = function () {
        return c("nullthrows")(this.$1).getBoundingClientRect().width;
      };
      e.$7 = function () {
        var a = this.$6(),
          b = window.devicePixelRatio || 1;
        return a * b;
      };
      e.$8 = function () {
        var a = this.props.src,
          b = this.$7(),
          c = this.props.srcSet;
        c = c.filter(function (a) {
          return a.configWidth <= n;
        });
        if (b)
          for (
            var c = c,
              d = Array.isArray(c),
              e = 0,
              c = d
                ? c
                : c[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var f;
            if (d) {
              if (e >= c.length) break;
              f = c[e++];
            } else {
              e = c.next();
              if (e.done) break;
              f = e.value;
            }
            f = f;
            a = f.src;
            if (f.configWidth >= b) break;
          }
        return a;
      };
      e.$9 = function () {
        var a = this.props.srcSet;
        a = a.filter(function (a) {
          return a.configWidth <= n;
        });
        return a
          .map(function (a) {
            return a.src + " " + a.configWidth + "w";
          })
          .join(",");
      };
      e.componentDidMount = function () {
        (this.$2 = !0), this.componentDidUpdate();
      };
      e.componentWillUnmount = function () {
        var a = this;
        this.$2 = !1;
        c("vc-tracker")
          .getCurrentVCTraces()
          .forEach(function (b) {
            b.unlock("ResponsiveImageHold_" + a.$3);
          });
      };
      e.$10 = function () {
        this.$4 !== this.$5 && this.props.onLoad && this.props.onLoad(null, !0),
          (this.$4 = this.$5);
      };
      e.componentDidUpdate = function () {
        var a = this,
          b = c("nullthrows")(this.$1);
        k()
          ? d("PolarisBatchDOM").measure(function () {
              if (!a.$2) return;
              var c = a.$6();
              d("PolarisBatchDOM").mutate(function () {
                if (!a.$2) return;
                var e = a.$9();
                a.$5 = e;
                b.sizes = c + "px";
                b.srcset = e;
                o(b, a.props.src, a.$3);
                d("PolarisBatchDOM").measure(function () {
                  !l() && b.complete && a.$10();
                });
              });
            })
          : d("PolarisBatchDOM").measure(function () {
              if (!a.$2) return;
              var c = a.$8();
              d("PolarisBatchDOM").mutate(function () {
                if (!a.$2) return;
                a.$5 = c;
                o(b, c, a.$3);
                b.complete && a.$10();
              });
            });
      };
      e.render = function () {
        var a,
          b = this,
          d = c("gkx")("4955") ? "ResponsiveImage" : void 0;
        ((a = this.$1) == null ? void 0 : a.src) == null &&
          c("vc-tracker")
            .getCurrentVCTraces()
            .forEach(function (a) {
              a.lock("ResponsiveImageHold_" + b.$3);
            });
        return j.jsx("img", {
          alt: this.props.alt,
          className: this.props.className,
          crossOrigin: c("polarisGetCrossOriginAttribute")(),
          "data-imgperflogname": d,
          decoding: this.props.decoding,
          elementtiming: d,
          onError: this.props.onError,
          onLoad: this.$11,
          ref: this.$12,
          style: this.props.style,
        });
      };
      return b;
    })(j.PureComponent);
    b.defaultProps = { decoding: "auto" };
    function o(a, b, d) {
      var e = a.src;
      a.src = b;
      c("gkx")("4955") &&
        (e == null || e === "") &&
        b !== "" &&
        c("one-trace").trackImagePerf(
          a,
          (h || (h = c("performanceNow")))(),
          b,
          {}
        );
      c("vc-tracker")
        .getCurrentVCTraces()
        .forEach(function (b) {
          b.trackImage(b.mutationSeq++, a, "mutationImageAttribute"),
            b.unlock("ResponsiveImageHold_" + d);
        });
    }
    function a(a, b) {
      return a.src !== b.src;
    }
    e = c("polarisWithRemountOnChange")(a)(b);
    g["default"] = e;
  },
  98
);
__d(
  "PolarisPhoto.react",
  [
    "cx",
    "invariant",
    "InstagramSEOCrawlBot",
    "PolarisMonitorErrors",
    "PolarisResponsiveImage.react",
    "PolarisSizing",
    "PolarisTimer",
    "err",
    "isStringNullOrEmpty",
    "joinClasses",
    "polarisGetCrossOriginAttribute",
    "qex",
    "react",
    "stylex",
  ],
  function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j,
      k,
      l = k || d("react"),
      m = {
        image: {
          height: "x5yr21d",
          left: "xu96u03",
          start: null,
          end: null,
          position: "x10l6tqk",
          top: "x13vifvy",
          userSelect: "x87ps6o",
          width: "xh8yej3",
          $$css: !0,
        },
      };
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b) {
        var e;
        e = a.call(this, b) || this;
        e.$2 = !1;
        e.$3 = !1;
        e.$4 = !1;
        e.$5 = 0;
        e.$6 = function () {
          if (e.$2) return;
          e.$4 = !0;
          var a = e.$1;
          if (a == null) {
            !e.$3
              ? (e.$3 = !0)
              : d("PolarisMonitorErrors").logError(
                  c("err")(
                    "image element ref in PolarisPhoto was unexpectedly nullish"
                  )
                );
            return;
          }
          a.style.visibility = "";
          var b = e.props.onPhotoRendered;
          b && b(a.currentSrc || a.src, d("PolarisTimer").now() - e.$5);
        };
        e.$8 = function (a) {
          e.$1 = a;
        };
        b.onPhotoRendered && (e.$5 = d("PolarisTimer").now());
        b.srcSet != null || b.src != null || i(0, 71691);
        return e;
      }
      var e = b.prototype;
      e.$7 = function (a) {
        var b = 1 / (a.crop_right - a.crop_left),
          c = 0.5 - 0.5 / b,
          d = (c - a.crop_left) * 100;
        c = (c - a.crop_top) * 100;
        return {
          height: "auto",
          objectFit: "contain",
          transform:
            "scale(" + b + ") translateX(" + d + "%) translateY(" + c + "%)",
        };
      };
      e.componentWillUnmount = function () {
        this.$2 = !0;
      };
      e.componentDidMount = function () {
        var a = this.props.srcSet;
        if (a == null || !a.length) {
          (((a = this.$1) == null ? void 0 : a.complete) === !0 || this.$3) &&
            this.$6();
        }
      };
      e.$9 = function (a) {
        if (a == null) return !0;
        a = new Set(Object.values(a));
        return a.size === 1 && a.has(0);
      };
      e.renderImage = function () {
        var a = this,
          b = this.props.rich !== !0 || this.$4,
          d = this.props,
          e = d.ignoreSrcSet,
          f = d.imgXstyle,
          g = d.profileGridCrop;
        d = d.setCrossOriginToUndefinedDONOTUSE;
        b = { objectFit: "cover", visibility: b ? null : "hidden" };
        g != null &&
          !this.$9(g) &&
          (b = babelHelpers["extends"]({}, b, this.$7(g)));
        var h = null;
        if (
          c("InstagramSEOCrawlBot").is_allowlisted_crawl_bot &&
          this.props.postId != null
        ) {
          var i = c("qex")._("754") === !0;
          i &&
            (h =
              "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=" +
              String(this.props.postId));
        }
        i = {
          className: (j || (j = c("stylex")))(m.image, f),
          onError: this.$6,
          onLoad: this.$6,
          style: b,
        };
        f =
          this.props.accessibilityCaption != null
            ? this.props.accessibilityCaption
            : this.props.caption;
        b = e === !0 && g != null;
        e = this.props.srcSet;
        return e != null && e.length > 0 && !b
          ? l.jsx(
              c("PolarisResponsiveImage.react"),
              babelHelpers["extends"](
                {
                  alt: f,
                  imgRef: this.$8,
                  src: h !== null ? h : this.props.src,
                  srcSet: e,
                },
                i
              )
            )
          : l.jsx(
              "img",
              babelHelpers["extends"](
                {
                  alt: f,
                  crossOrigin:
                    d === !0 ? void 0 : c("polarisGetCrossOriginAttribute")(),
                  ref: function (b) {
                    return (a.$1 = b);
                  },
                  src: h !== null ? h : this.props.src,
                },
                i
              )
            );
      };
      e.render = function () {
        var a = this.props,
          b = a.className,
          e = a.customHeightPercent,
          f = a.dimensions,
          g = a.onClick;
        a = a.placeholderClassName;
        var h = {};
        g && (h = { onClick: g, role: "button", tabIndex: "-1" });
        g = {};
        f &&
          (g.style = {
            paddingBottom: d("PolarisSizing").getHeightPercent(f) + "%",
          });
        c("isStringNullOrEmpty")(e) || (g.style = { paddingBottom: e });
        return l.jsxs(
          "div",
          babelHelpers["extends"](
            { className: c("joinClasses")("_aagu", b) },
            h,
            {
              children: [
                l.jsx(
                  "div",
                  babelHelpers["extends"]({}, g, {
                    className: c("joinClasses")("_aagv", a),
                    children: this.renderImage(),
                  })
                ),
                l.jsx("div", { className: "_aagw" }),
              ],
            }
          )
        );
      };
      return b;
    })(l.PureComponent);
    a.defaultProps = { rich: !1, setCrossOriginToUndefinedDONOTUSE: !1 };
    g["default"] = a;
  },
  98
);
__d(
  "PolarisStepIndicator.react",
  ["cx", "joinClasses", "react"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || d("react"),
      k = "horizontal",
      l = "vertical",
      m = "default",
      n = "immersiveViewer",
      o = "overlay",
      p = "overlayShadow";
    function a(a) {
      var b = a.className,
        d = a.direction;
      d = d === void 0 ? k : d;
      var e = a.numSteps,
        f = a.selectedStep;
      a = a.style;
      a = a === void 0 ? m : a;
      var g = d === l;
      d = d === k;
      var h = a === m,
        i = a === o,
        q = a === p;
      return j.jsx("div", {
        className: c("joinClasses")(
          b,
          "_acvz" +
            (g ? " _acnd" : "") +
            (d ? " _acnc" : "") +
            (h ? " _acne" : "") +
            (i ? " _acng" : "") +
            (q ? " _acnh" : "") +
            (a === n ? " _any_" : "")
        ),
        children: new Array(e).fill(0).map(function (a, b) {
          return j.jsx(
            "div",
            { className: "_acnb" + (b === f ? " _acnf" : "") },
            "step" + b
          );
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);
__d(
  "PolarisErrorBoundary.react",
  ["ErrorBoundary.react", "PolarisMonitorErrors", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.children,
        d = a.errorRenderer;
      a = a.onError;
      return i.jsx(c("ErrorBoundary.react"), {
        augmentError: j,
        fallback: d,
        onError: a,
        children: b,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    function j(a) {
      a.metadata = d("PolarisMonitorErrors").createErrorMetadata(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "PolarisSuspenseWithErrorBoundary.react",
  [
    "CometPlaceholder.react",
    "PolarisErrorBoundary.react",
    "emptyFunction",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.children,
        d = a.errorRenderer,
        e = a.loadingRenderer;
      a = a.onError;
      e = (e = e) != null ? e : i.jsx("div", {});
      return i.jsx(c("PolarisErrorBoundary.react"), {
        errorRenderer: (d = d) != null ? d : c("emptyFunction").thatReturnsNull,
        onError: a,
        children: i.jsx(c("CometPlaceholder.react"), {
          fallback: e,
          children: b,
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);
__d(
  "polarisGetPostFromMedia",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = a.accessibilityCaption,
        c = a.dimensions,
        d = a.id,
        e = a.isVideo,
        f = a.owner,
        g = a.shortcode,
        h = a.src;
      a = a.videoUrl;
      return {
        accessibilityCaption: b,
        attribution: null,
        caption: null,
        captionIsEdited: !1,
        code: g,
        dimensions: c,
        hasRankedComments: !1,
        id: d,
        isSponsored: !1,
        isVideo: e,
        owner: f,
        relatedMedia: [],
        relatedVideoMedia: [],
        src: h,
        videoUrl: a,
      };
    }
    f["default"] = a;
  },
  66
);
__d(
  "PolarisEmbedSidecar.react",
  [
    "cx",
    "JSResourceForInteraction",
    "PolarisEmbedConstants",
    "PolarisEmbedLogger",
    "PolarisHScrollCardContainer.react",
    "PolarisPagerButton.react",
    "PolarisPhoto.react",
    "PolarisResponsiveBlock.react",
    "PolarisSizing",
    "PolarisStepIndicator.react",
    "PolarisSuspenseWithErrorBoundary.react",
    "polarisGetPostFromMedia",
    "react",
    "xigRequireInterop",
  ],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || (i = d("react")),
      k = i.useState,
      l = 1,
      m = j.lazy(function () {
        return c("JSResourceForInteraction")("PolarisEmbedVideoWrapper")
          .__setRef("PolarisEmbedSidecar.react")
          .load()
          .then(function (a) {
            return c("xigRequireInterop")(a);
          });
      });
    function n(a) {
      return Math.pow(Math.abs(a), 0.75) * 3;
    }
    function o(a) {
      a = a.sidecarChildren;
      if (a.length === 0) return null;
      a = a
        .map(function (a) {
          a = a.dimensions;
          return a;
        })
        .filter(Boolean)
        .sort(function (a, b) {
          a = a.width / a.height;
          b = b.width / b.height;
          return a - b;
        })[0];
      if (!a) return null;
      a = d("PolarisSizing").getHeightPercent(a);
      a = { paddingBottom: a + "%" };
      return j.jsx("div", { className: "_ae35", style: a });
    }
    o.displayName = o.name + " [from " + f.id + "]";
    function p(a) {
      var b = a.index,
        e = a.media;
      a = a.sidecarChildIndex;
      var f = e.accessibilityCaption,
        g = e.dimensions,
        h = e.displayResources,
        i = e.isVideo,
        k = e.src;
      if (i) {
        i = c("polarisGetPostFromMedia")(e);
        return j.jsx(c("PolarisSuspenseWithErrorBoundary.react"), {
          children: j.jsx(m, { isVisible: a === b, post: i }),
        });
      }
      return j.jsx(c("PolarisPhoto.react"), {
        accessibilityCaption: f,
        analyticsContext: d("PolarisEmbedConstants").EMBED_ANALYTICS_CONTEXT,
        dimensions: g,
        src: k,
        srcSet: h,
      });
    }
    p.displayName = p.name + " [from " + f.id + "]";
    function a(a) {
      var b = k(0),
        e = b[0],
        f = b[1];
      b = k(0);
      var g = b[0],
        h = b[1],
        i = a.onChildIndexChange,
        m = a.post,
        q = a.sidecarChildren;
      b = function (a, b) {
        b = g;
        a = a;
        if (a !== b && a >= 0 && a < q.length) {
          h(a);
          i && i(b, a, q.length);
          b = a === q.length - 1;
          if (b) {
            d("PolarisEmbedLogger").logEmbedAction({
              actionName: "reachSidecarEnd",
              mediaId: m.id,
              mediaType: "sidecar",
              ownerId: ((a = m.owner) == null ? void 0 : a.id) || "",
            });
          }
        }
      };
      a = function (a) {
        f(a);
      };
      return j.jsx("div", {
        className: "_ae36",
        children: j.jsxs(c("PolarisResponsiveBlock.react"), {
          className: "_ae37",
          onResize: a,
          children: [
            q.length && j.jsx(o, { sidecarChildren: q }),
            j.jsx(c("PolarisHScrollCardContainer.react"), {
              cardWidth: e,
              className: "_ae38",
              gapWidth: 0,
              getAnimationDuration: n,
              gutterWidth: 0,
              initialRenderedCount: l,
              onVisibilityChange: b,
              pagerVariant: d("PolarisPagerButton.react").PAGER_BUTTON_VARIANTS
                .sidecar,
              children:
                e === 0
                  ? null
                  : q.map(function (a, b) {
                      return j.jsx(
                        p,
                        { index: b, media: a, sidecarChildIndex: g },
                        a.id
                      );
                    }),
            }),
            j.jsx(c("PolarisStepIndicator.react"), {
              className: "_ae39",
              numSteps: q.length,
              selectedStep: g,
              style: "overlay",
            }),
          ],
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);
__d(
  "polarisGetEmbedSidecarChildFromMedia",
  [
    "nullthrows",
    "polarisGetImageResourceFromGraphImageResource",
    "polarisGetUserFromGraphUser",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a(a) {
      var b = a.dimensions,
        d = a.display_resources,
        e = a.display_url,
        f = a.id,
        g = a.is_video,
        h = a.owner,
        i = a.shortcode;
      return {
        accessibilityCaption:
          a.accessibility_caption != null && a.accessibility_caption !== ""
            ? a.accessibility_caption
            : void 0,
        dimensions: babelHelpers["extends"]({}, c("nullthrows")(b)),
        displayResources:
          d &&
          d.map(function (a) {
            return c("polarisGetImageResourceFromGraphImageResource")(a);
          }),
        id: c("nullthrows")(f),
        isVideo: c("nullthrows")(g),
        owner: h && c("polarisGetUserFromGraphUser")(h),
        shortcode: c("nullthrows")(i),
        src: c("nullthrows")(e),
        videoUrl:
          a.video_url != null && a.video_url !== "" ? a.video_url : void 0,
      };
    }
    g["default"] = a;
  },
  98
);
__d(
  "PolarisEmbedSidecarEntrypoint",
  [
    "cx",
    "PolarisEmbedSidecar.react",
    "polarisGetEmbedSidecarChildFromMedia",
    "polarisGetPostFromGraphMediaInterface",
    "polarisRenderAboveImage",
    "react",
  ],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || c("react");
    function a(a) {
      a = a == null ? void 0 : a.shortcode_media;
      if (a) {
        var b = d(
          "polarisGetPostFromGraphMediaInterface"
        ).getPostFromGraphMediaInterface(a);
        a =
          a.edge_sidecar_to_children && a.edge_sidecar_to_children.edges
            ? a.edge_sidecar_to_children.edges.map(function (a) {
                a = a.node;
                return c("polarisGetEmbedSidecarChildFromMedia")(a);
              })
            : [];
        c("polarisRenderAboveImage")(
          "EmbedSidecar",
          j.jsx(c("PolarisEmbedSidecar.react"), { post: b, sidecarChildren: a })
        );
      }
    }
    g["default"] = a;
  },
  98
);
