; /*FB_PKG_DELIM*/

__d("ReactDOM", ["cr:4865", "err"], (function(a, b, c, d, e, f, g) {
    var h, i, j;

    function k() {
        var a = c("err")("This React API is not implemented in this environment. Use ReactDOMComet instead.");
        throw a
    }

    function l() {
        var a = c("err")("This React API is not implemented in this environment. Use ReactDOMLegacy_DEPRECATED instead.");
        throw a
    }
    d = (a = b("cr:4865").createRoot) != null ? a : function() {
        return k()
    };
    f = (e = b("cr:4865").hydrateRoot) != null ? e : function() {
        return k()
    };
    e = (a = b("cr:4865").unstable_createEventHandleInternal) != null ? a : function() {
        return k()
    };
    a = (a = b("cr:4865").findDOMNode) != null ? a : function() {
        return l()
    };
    h = (h = b("cr:4865").render) != null ? h : function() {
        return l()
    };
    i = (i = b("cr:4865").unmountComponentAtNode) != null ? i : function() {
        return l()
    };
    j = (j = b("cr:4865").unstable_renderSubtreeIntoContainer) != null ? j : function() {
        return l()
    };
    g.createRoot = d;
    g.hydrateRoot = f;
    g.unstable_createEventHandle = e;
    g.findDOMNode = a;
    g.render = h;
    g.unmountComponentAtNode = i;
    g.unstable_renderSubtreeIntoContainer = j;
    g.createPortal = b("cr:4865").createPortal;
    g.flushSync = b("cr:4865").flushSync;
    g.unstable_batchedUpdates = b("cr:4865").unstable_batchedUpdates;
    g.version = b("cr:4865").version;
    g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b("cr:4865").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
}), 98);
__d("ReactLegacyShim_DEPRECATED", ["ReactDOMCompatibilityLayer"], (function(a, b, c, d, e, f, g) {
    function a(a, b) {
        return d("ReactDOMCompatibilityLayer").render(a, b)
    }
    g.render = a
}), 98);
__d("ReactBrowserEventEmitter_DO_NOT_USE", ["ReactDOM"], (function(a, b, c, d, e, f) {
    "use strict";
    a = b("ReactDOM").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    e.exports = a.ReactBrowserEventEmitter
}), null);