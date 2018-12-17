var Holder = Holder || {};
!function (a, b) {
    function f(a, b) {
        var c = "complete", d = "readystatechange", e = !1, f = e, g = !0, h = a.document, i = h.documentElement,
            j = h.addEventListener ? "addEventListener" : "attachEvent",
            k = h.addEventListener ? "removeEventListener" : "detachEvent", l = h.addEventListener ? "" : "on",
            m = function (g) {
                (g.type != d || h.readyState == c) && (("load" == g.type ? a : h)[k](l + g.type, m, e), !f && (f = !0) && b.call(a, null))
            }, n = function () {
                try {
                    i.doScroll("left")
                } catch (a) {
                    return setTimeout(n, 50), void 0
                }
                m("poll")
            };
        if (h.readyState == c) b.call(a, "lazy"); else {
            if (h.createEventObject && i.doScroll) {
                try {
                    g = !a.frameElement
                } catch (o) {
                }
                g && n()
            }
            h[j](l + "DOMContentLoaded", m, e), h[j](l + d, m, e), a[j](l + "load", m, e)
        }
    }

    function g(a) {
        a = a.match(/^(\W)?(.*)/);
        var b = document["getElement" + (a[1] ? "#" == a[1] ? "ById" : "sByClassName" : "sByTagName")](a[2]), c = [];
        return null != b && (c = b.length ? b : 0 == b.length ? b : [b]), c
    }

    function h(a, b) {
        var c = {};
        for (var d in a) c[d] = a[d];
        for (var e in b) c[e] = b[e];
        return c
    }

    function k(a, b, c) {
        b = parseInt(b, 10), a = parseInt(a, 10);
        var d = Math.max(b, a), e = Math.min(b, a), f = 1 / 12, g = Math.min(.75 * e, .75 * d * f);
        return {height: Math.round(Math.max(c.size, g))}
    }

    function l(a, b, c, d) {
        var f = k(b.width, b.height, c), g = f.height, h = b.width * d, i = b.height * d,
            j = c.font ? c.font : "sans-serif";
        e.width = h, e.height = i, a.textAlign = "center", a.textBaseline = "middle", a.fillStyle = c.background, a.fillRect(0, 0, h, i), a.fillStyle = c.foreground, a.font = "bold " + g + "px " + j;
        var l = c.text ? c.text : Math.floor(b.width) + "x" + Math.floor(b.height), m = a.measureText(l).width;
        return m / h >= .75 && (g = Math.floor(.75 * g * (h / m))), a.font = "bold " + g * d + "px " + j, a.fillText(l, h / 2, i / 2, h), e.toDataURL("image/png")
    }

    function m(a, b, c, e) {
        var f = c.dimensions, g = c.theme, i = c.text ? decodeURIComponent(c.text) : c.text,
            j = f.width + "x" + f.height;
        g = i ? h(g, {text: i}) : g, g = c.font ? h(g, {font: c.font}) : g, "image" == a ? (b.setAttribute("data-src", e), b.setAttribute("alt", i ? i : g.text ? g.text + " [" + j + "]" : j), (d || !c.auto) && (b.style.width = f.width + "px", b.style.height = f.height + "px"), d ? b.style.backgroundColor = g.background : b.setAttribute("src", l(p, f, g, s))) : "background" == a ? d || (b.style.backgroundImage = "url(" + l(p, f, g, s) + ")", b.style.backgroundSize = f.width + "px " + f.height + "px") : "fluid" == a && (b.setAttribute("data-src", e), b.setAttribute("alt", i ? i : g.text ? g.text + " [" + j + "]" : j), b.style.height = "%" == f.height.substr(-1) ? f.height : f.height + "px", b.style.width = "%" == f.width.substr(-1) ? f.width : f.width + "px", ("inline" == b.style.display || "" == b.style.display) && (b.style.display = "block"), d ? b.style.backgroundColor = g.background : (b.holderData = c, t.push(b), n(b)))
    }

    function n(a) {
        var b;
        b = null == a.nodeType ? t : [a];
        for (i in b) {
            var c = b[i];
            if (c.holderData) {
                var d = c.holderData;
                c.setAttribute("src", l(p, {height: c.clientHeight, width: c.clientWidth}, d.theme, s))
            }
        }
    }

    function o(b, c) {
        var d = {theme: u.themes.gray}, e = !1;
        for (sl = b.length, j = 0; sl > j; j++) {
            var f = b[j];
            a.flags.dimensions.match(f) ? (e = !0, d.dimensions = a.flags.dimensions.output(f)) : a.flags.fluid.match(f) ? (e = !0, d.dimensions = a.flags.fluid.output(f), d.fluid = !0) : a.flags.colors.match(f) ? d.theme = a.flags.colors.output(f) : c.themes[f] ? d.theme = c.themes[f] : a.flags.text.match(f) ? d.text = a.flags.text.output(f) : a.flags.font.match(f) ? d.font = a.flags.font.output(f) : a.flags.auto.match(f) && (d.auto = !0)
        }
        return e ? d : !1
    }

    var c = !1, d = !1, e = document.createElement("canvas");
    if (document.getElementsByClassName || (document.getElementsByClassName = function (a) {
            var c, d, e, b = document, f = [];
            if (b.querySelectorAll) return b.querySelectorAll("." + a);
            if (b.evaluate) for (d = ".//*[contains(concat(' ', @class, ' '), ' " + a + " ')]", c = b.evaluate(d, b, null, 0, null); e = c.iterateNext();) f.push(e); else for (c = b.getElementsByTagName("*"), d = new RegExp("(^|\\s)" + a + "(\\s|$)"), e = 0; e < c.length; e++) d.test(c[e].className) && f.push(c[e]);
            return f
        }), window.getComputedStyle || (window.getComputedStyle = function (a) {
            return this.el = a, this.getPropertyValue = function (b) {
                var c = /(\-([a-z]){1})/g;
                return "float" == b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function () {
                    return arguments[2].toUpperCase()
                })), a.currentStyle[b] ? a.currentStyle[b] : null
            }, this
        }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function (a) {
            var b = this.__proto__ || this.constructor.prototype;
            return a in this && (!(a in b) || b[a] !== this[a])
        }), e.getContext) if (e.toDataURL("image/png").indexOf("data:image/png") < 0) d = !0; else var p = e.getContext("2d"); else d = !0;
    var q = 1, r = 1;
    d || (q = window.devicePixelRatio || 1, r = p.webkitBackingStorePixelRatio || p.mozBackingStorePixelRatio || p.msBackingStorePixelRatio || p.oBackingStorePixelRatio || p.backingStorePixelRatio || 1);
    var s = q / r, t = [], u = {
        domain: "holder.js",
        images: "img",
        bgnodes: ".holderjs",
        themes: {
            gray: {background: "#eee", foreground: "#aaa", size: 12},
            social: {background: "#3a5a97", foreground: "#fff", size: 12},
            industrial: {background: "#434A52", foreground: "#C2F200", size: 12}
        },
        stylesheet: ""
    };
    a.flags = {
        dimensions: {
            regex: /^(\d+)x(\d+)$/, output: function (a) {
                var b = this.regex.exec(a);
                return {width: +b[1], height: +b[2]}
            }
        }, fluid: {
            regex: /^([0-9%]+)x([0-9%]+)$/, output: function (a) {
                var b = this.regex.exec(a);
                return {width: b[1], height: b[2]}
            }
        }, colors: {
            regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i, output: function (a) {
                var b = this.regex.exec(a);
                return {size: u.themes.gray.size, foreground: "#" + b[2], background: "#" + b[1]}
            }
        }, text: {
            regex: /text\:(.*)/, output: function (a) {
                return this.regex.exec(a)[1]
            }
        }, font: {
            regex: /font\:(.*)/, output: function (a) {
                return this.regex.exec(a)[1]
            }
        }, auto: {regex: /^auto$/}
    };
    for (var v in a.flags) a.flags.hasOwnProperty(v) && (a.flags[v].match = function (a) {
        return a.match(this.regex)
    });
    a.add_theme = function (b, c) {
        return null != b && null != c && (u.themes[b] = c), a
    }, a.add_image = function (b, c) {
        var d = g(c);
        if (d.length) for (var e = 0, f = d.length; f > e; e++) {
            var h = document.createElement("img");
            h.setAttribute("data-src", b), d[e].appendChild(h)
        }
        return a
    }, a.run = function (b) {
        var d = h(u, b), e = [], f = [], i = [];
        for ("string" == typeof d.images ? f = g(d.images) : window.NodeList && d.images instanceof window.NodeList ? f = d.images : window.Node && d.images instanceof window.Node && (f = [d.images]), "string" == typeof d.bgnodes ? i = g(d.bgnodes) : window.NodeList && d.elements instanceof window.NodeList ? i = d.bgnodes : window.Node && d.bgnodes instanceof window.Node && (i = [d.bgnodes]), c = !0, n = 0, l = f.length; l > n; n++) e.push(f[n]);
        var j = document.getElementById("holderjs-style");
        j || (j = document.createElement("style"), j.setAttribute("id", "holderjs-style"), j.type = "text/css", document.getElementsByTagName("head")[0].appendChild(j)), d.nocss || (j.styleSheet ? j.styleSheet.cssText += d.stylesheet : j.appendChild(document.createTextNode(d.stylesheet)));
        for (var k = new RegExp(d.domain + '/(.*?)"?\\)'), l = i.length, n = 0; l > n; n++) {
            var p = window.getComputedStyle(i[n], null).getPropertyValue("background-image"), q = p.match(k),
                r = i[n].getAttribute("data-background-src");
            if (q) {
                var s = o(q[1].split("/"), d);
                s && m("background", i[n], s, p)
            } else if (null != r) {
                var s = o(r.substr(r.lastIndexOf(d.domain) + d.domain.length + 1).split("/"), d);
                s && m("background", i[n], s, p)
            }
        }
        for (l = e.length, n = 0; l > n; n++) {
            var t = attr_data_src = p = null;
            try {
                t = e[n].getAttribute("src"), attr_datasrc = e[n].getAttribute("data-src")
            } catch (v) {
            }
            if (null == attr_datasrc && t && t.indexOf(d.domain) >= 0 ? p = t : attr_datasrc && attr_datasrc.indexOf(d.domain) >= 0 && (p = attr_datasrc), p) {
                var s = o(p.substr(p.lastIndexOf(d.domain) + d.domain.length + 1).split("/"), d);
                s && (s.fluid ? m("fluid", e[n], s, p) : m("image", e[n], s, p))
            }
        }
        return a
    }, f(b, function () {
        window.addEventListener ? (window.addEventListener("resize", n, !1), window.addEventListener("orientationchange", n, !1)) : window.attachEvent("onresize", n), c || a.run()
    }), "function" == typeof define && define.amd && define("Holder", [], function () {
        return a
    })
}(Holder, window);