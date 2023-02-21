/*! For license information please see zaf_sdk.min.js.LICENSE.txt */
!(function (e, t) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define([], t)
		: "object" == typeof exports
		? (exports.ZAFClient = t())
		: (e.ZAFClient = t());
})(self, function () {
	return (() => {
		var e = {
				547: (e, t, n) => {
					"use strict";
					var r = n(656),
						i = ["mousemove", "keydown", "wheel", "mousedown", "touchstart", "touchmove"];
					t.Z = class {
						constructor() {
							(this.hasFocus = !0),
								(this.userEventListenerAdded = !1),
								(this.observers = new r.default()),
								(this.refcount = 1),
								(this.handleVisibilityChange = this.handleVisibilityChange.bind(this)),
								(this.handleFocusChange = this.handleFocusChange.bind(this)),
								(this.handleUserEvent = this.handleUserEvent.bind(this)),
								document.addEventListener("visibilitychange", this.handleVisibilityChange, !0),
								window.addEventListener("focus", this.handleFocusChange, !0),
								window.addEventListener("blur", this.handleFocusChange, !0),
								this.handleVisibilityChange();
						}
						delete() {
							void 0 !== this.refcount &&
								0 == --this.refcount &&
								(document.removeEventListener("visibilitychange", this.handleVisibilityChange, !0),
								window.removeEventListener("focus", this.handleFocusChange, !0),
								window.removeEventListener("blur", this.handleFocusChange, !0),
								this.userEventListenerAdded &&
									i.forEach((e) => document.removeEventListener(e, this.handleUserEvent, !0)),
								delete this.observers);
						}
						markActive() {
							this.observers && this.observers.call(null);
						}
						handleUserEvent(e) {
							(!this.hasFocus && "mousemove".includes(e.type)) || this.markActive();
						}
						handleFocusChange(e) {
							e.target === window &&
								((this.hasFocus = "focus" === e.type), this.hasFocus && this.markActive());
						}
						handleVisibilityChange() {
							document.hidden
								? this.userEventListenerAdded &&
								  (i.forEach((e) => document.removeEventListener(e, this.handleUserEvent, !0)),
								  (this.userEventListenerAdded = !1))
								: this.userEventListenerAdded ||
								  (i.forEach((e) => document.addEventListener(e, this.handleUserEvent, !0)),
								  (this.userEventListenerAdded = !0));
						}
						addObserver(e) {
							return this.observers && this.observers.add(e);
						}
					};
				},
				656: (e, t) => {
					"use strict";
					Object.defineProperty(t, "__esModule", { value: !0 });
					t.default = class {
						constructor() {
							this.listeners = [];
						}
						add(e) {
							var t = (e) => this.listeners.findIndex((t) => t.fn === e),
								n = t(e);
							if (-1 === n) this.listeners.push({ fn: e, count: 1 });
							else {
								var r = this.listeners[n];
								r && r.count++;
							}
							return () => {
								var n = t(e);
								if (-1 !== n) {
									var r = this.listeners[n];
									r && r.count--, r && 0 === r.count && this.listeners.splice(n, 1);
								}
							};
						}
						call() {
							for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
							this.listeners.forEach((e) => e.fn(...t));
						}
					};
				},
				855: (e, t, n) => {
					"use strict";
					n.d(t, { default: () => L });
					const r = "2.0.37";
					var i = n(512),
						s = n.n(i),
						o = window.Promise || s();
					function a(e) {
						return decodeURIComponent((e || "").replace(/\+/g, " "));
					}
					function c(e) {
						var t,
							n,
							r,
							i,
							s = {};
						if ((0 === (e = e || "").search(/\?|#/) && (e = e.slice(1)), 0 === e.length)) return s;
						t = e.split("&");
						for (var o = 0; o < t.length; o++)
							(r = a((n = t[o].split("="))[0])), (i = a(n[1]) || ""), (s[r] = i);
						return s;
					}
					function h(e) {
						return e instanceof o || (!!e && e.then && "function" == typeof e.then);
					}
					function u(e) {
						return !1 === e || e instanceof Error || "string" == typeof e;
					}
					function d(e) {
						return "string" == typeof e;
					}
					function l(e) {
						var t, n;
						e = e || [];
						var r = new o((e, r) => {
								(t = e), (n = r);
							}),
							i = 0,
							s = [],
							a = Array.isArray(e) ? e.slice() : [e];
						return (i = a.length) <= 0
							? (t(), r)
							: (a.forEach((e, r) => {
									var a;
									if (h(e)) a = e;
									else if ("function" == typeof e) {
										var c;
										try {
											a = h((c = e())) ? c : u(c) ? o.reject(c) : o.resolve(c);
										} catch (e) {
											a = o.reject(e);
										}
									} else
										a = new o((t, n) => {
											u(e) ? n(e) : t(e);
										});
									a.then((e) => {
										!(function (e, n) {
											(s[n] = e), --i <= 0 && t(s);
										})(e, r);
									}).catch(n.bind(n));
							  }),
							  r);
					}
					var f = n(547);
					class p {
						constructor(e) {
							(this.startTime = Date.now()), (this.client = e), (this.MIN_HOVER_TIME = 200);
						}
						handleMouseEnter() {
							this.startTime = Date.now();
						}
						handleMouseLeave() {
							var e = Date.now() - this.startTime;
							e >= this.MIN_HOVER_TIME && this.client.invoke("track", { type: "hover", value: e });
						}
						handleClick() {
							this.client.invoke("track", { type: "click" });
						}
						setup() {
							var e = document.querySelector("html");
							e.addEventListener("click", this.handleClick.bind(this)),
								e.addEventListener("mouseleave", this.handleMouseLeave.bind(this)),
								e.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
						}
					}
					var v = window.Promise || s(),
						g = 3e5,
						m = ["instances.create"],
						y = /^zaf\./,
						_ = {},
						w = {};
					function b(e, t, n) {
						return setTimeout(() => {
							k(e, t, g), n(new Error("Invocation request timeout"));
						}, g);
					}
					function E(e, t) {
						return t.map((t) => "".concat(e, "-").concat(t));
					}
					function k(e, t, n) {
						var r = t.map((e) =>
								"action:".concat(
									(function (e) {
										return e.replace(
											/:\w+(,?\w+)*((\.(show|hide|enable|disable))|(\\?\.\w*))?/g,
											":arg$3"
										);
									})(e)
								)
							),
							i = "request_response_time:".concat(
								(function (e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : g;
									if (e >= t) return "".concat(t / 1e3, "-");
									var n = e - (e % 1e4);
									return "".concat(n / 1e3, "-").concat((n + 1e4) / 1e3);
								})(n)
							);
						e.postMessage("__track__", {
							event_name: "sdk_request_timeout",
							event_type: "increment",
							data: 1,
							tags: r.concat(i),
						});
					}
					function j(e) {
						return isNaN(w[e]) && (w[e] = 0), ++w[e];
					}
					function x(e, t, n) {
						e.ready || n ? e._source.postMessage(t, e._origin) : e.on("app.registered", x.bind(null, e, t));
					}
					function T(e, t) {
						var n,
							r,
							i = j("promise"),
							s = Array.isArray(t) ? t : Object.keys(t),
							o = E(e, s),
							a = this,
							c = new v((o, c) => {
								(r = window.performance.now()),
									(n = (function (e, t, n, r) {
										var i = E(n, r);
										if ("invoke" === n) {
											var s = r.filter((e) => -1 !== m.indexOf(e));
											if (s.length === r.length) return NaN;
											if (0 !== s.length)
												throw new Error(
													"Illegal bulk call - `instances.create` must be called separately."
												);
											return b(e, i, t);
										}
										return b(e, i, t);
									})(a, c, e, s)),
									(_[i] = { resolve: o, reject: c });
								var h = JSON.stringify({
									id: i,
									request: e,
									params: t,
									appGuid: a._appGuid,
									instanceGuid: a._instanceGuid,
								});
								x(a, h);
							});
						return c.then(
							C.bind(null, {
								id: i,
								timeoutId: n,
								trackTimeoutWithResolutionTime: () => {
									var e = window.performance.now() - r;
									e > 1e4 && k(a, o, e);
								},
							}),
							C.bind(null, { id: i, timeoutId: n })
						);
					}
					function A(e) {
						e.path && (e.message = '"' + e.path + '" ' + e.message);
						var t = new Error(e.message);
						return (t.name = e.name), (t.stack = e.stack), t;
					}
					function C(e, t) {
						if (
							(clearTimeout(e.timeoutId),
							delete _[e.id],
							e.trackTimeoutWithResolutionTime && e.trackTimeoutWithResolutionTime(),
							t instanceof Error)
						)
							throw t;
						return t;
					}
					function G(e, t) {
						if (
							(function (e, t) {
								return e && e._origin === t.origin && e._source === t.source;
							})(e, t)
						) {
							var n = t.data;
							if (n) {
								if ("string" == typeof n)
									try {
										n = JSON.parse(t.data);
									} catch (e) {
										return e;
									}
								var r,
									i = (function (e, t) {
										var n = e;
										if (t && t !== e._instanceGuid && !(n = e._instanceClients[t]))
											throw Error("[ZAF SDK] Could not find client for instance " + t);
										return n;
									})(e, n.instanceGuid);
								if (n.id && (r = _[n.id]))
									!(function (e, t) {
										if (t.error) {
											var n = t.error.name ? A(t.error) : t.error;
											e.reject(n);
										} else e.resolve(t.result);
									})(r, n);
								else if (y.test(n.key)) {
									var s = n.key.replace(y, ""),
										o = { appGuid: e._appGuid };
									if (n.needsReply)
										return (function (e, t, n) {
											if (!e._repliesPending[t])
												return (
													(n.key = "iframe.reply:" + t),
													(e._repliesPending[t] = !0),
													l(e._messageHandlers[t])
														.then(x.bind(null, e, n))
														.catch((t) => {
															var r = t instanceof Error ? t.message : t;
															(n.error = { msg: r }), x(e, n);
														})
														.then(() => {
															delete e._repliesPending[t];
														})
												);
										})(i, s, o);
									!(function (e, t, n) {
										if (!e._messageHandlers[t]) return !1;
										e._messageHandlers[t].forEach((e) => {
											e(n);
										});
									})(i, s, n.message);
								}
							}
						}
					}
					function N(e, t) {
						if (!("string" == typeof e)) return t;
						var n = t.errors && t.errors[e];
						if (n) throw A(n);
						return t;
					}
					window.Promise = v;
					class O {
						constructor(e) {
							if (
								((this._parent = e.parent),
								(this._origin = e.origin || (this._parent && this._parent._origin)),
								(this._source = e.source || (this._parent && this._parent._source) || window.parent),
								(this._appGuid = e.appGuid || (this._parent && this._parent._appGuid)),
								(this._instanceGuid = e.instanceGuid || this._appGuid),
								(this._messageHandlers = {}),
								(this._repliesPending = {}),
								(this._instanceClients = {}),
								(this._metadata = null),
								(this._context = e.context || null),
								(this._idleState = null),
								(this.ready = !1),
								!(function (e) {
									if (e)
										for (
											var t = [
													/^https?:\/\/127.0.0.1(:\d+)?$/,
													/^https?:\/\/localhost(:\d+)?$/,
													/^https:\/\/.+\.zendesk\.com$/,
													/^https:\/\/.+\.zd-staging\.com$/,
													/^https:\/\/.+\.zd-dev\.com$/,
													/^https:\/\/.+\.zd-master\.com$/,
													/^https:\/\/.+\.zendesk-staging\.com$/,
													/^https?:\/\/.+\.zopim\.com(:\d+)?$/,
													/^https:\/\/dashboard\.zopim\.org$/,
													/^https:\/\/.+\.futuresimple\.com$/,
													/^https:\/\/.+\.cloudhatchery\.com$/,
													/^https:\/\/.+\.idealwith\.com$/,
													/^https:\/\/.+\.ourtesco\.com$/,
												],
												n = 0;
											n < t.length;
											n++
										)
											if (t[n].test(e)) return !0;
									return !1;
								})(this._origin))
							) {
								var t = new URL(this._origin).hostname;
								this.postMessage("__track__", {
									event_name: "invalid_sdk_origin",
									event_type: "increment",
									data: 1,
									tags: ["origin:" + t],
								}),
									(function () {
										document.body = document.createElement("body");
										var e = document.head;
										e && e.remove();
									})(),
									(n = "Invalid domain ".concat(this._origin)),
									(i = document.createElement("h3")),
									(s = document.createTextNode(n)),
									i.appendChild(s),
									document.body.appendChild(i);
							}
							var n, i, s;
							if (
								(this.on(
									"app.registered",
									(e) => {
										(this.ready = !0),
											(this._metadata = e.metadata),
											(this._context = e.context),
											(this._idleState = new f.Z()),
											this._idleState.addObserver(
												(function (e, t) {
													var n,
														r = this;
													return function () {
														for (
															var i = arguments.length, s = new Array(i), o = 0;
															o < i;
															o++
														)
															s[o] = arguments[o];
														clearTimeout(n),
															(n = setTimeout(() => {
																e.apply(r, s);
															}, t));
													};
												})(() => {
													this.postMessage("session.live");
												}, 1e3)
											);
									},
									this
								),
								this.on(
									"context.updated",
									(e) => {
										this._context = e;
									},
									this
								),
								this._parent)
							)
								return (this.ready = this._parent.ready), this;
							new p(this).setup(),
								window.addEventListener("message", G.bind(null, this)),
								this.postMessage("iframe.handshake", { version: r });
						}
						postMessage(e, t) {
							x(
								this,
								JSON.stringify({
									key: e,
									message: t,
									appGuid: this._appGuid,
									instanceGuid: this._instanceGuid,
								}),
								"iframe.handshake" === e
							);
						}
						on(e, t, n) {
							"function" == typeof t &&
								((t = n ? t.bind(n) : t),
								(this._messageHandlers[e] = this._messageHandlers[e] || []),
								this._messageHandlers[e].push(t),
								"app.registered" !== e &&
									this.postMessage("iframe.on:" + e, {
										subscriberCount: this._messageHandlers[e].length,
									}));
						}
						off(e, t) {
							if (!this._messageHandlers[e]) return !1;
							var n = this._messageHandlers[e].indexOf(t);
							return (
								this.has(e, t) && this._messageHandlers[e].splice(n, 1),
								this.postMessage("iframe.off:" + e, {
									subscriberCount: this._messageHandlers[e].length,
								}),
								t
							);
						}
						has(e, t) {
							return !!this._messageHandlers[e] && -1 !== this._messageHandlers[e].indexOf(t);
						}
						trigger(e, t) {
							this.postMessage("iframe.trigger:" + e, t);
						}
						request(e) {
							if (this._parent) return this._parent.request(e);
							var t = "request:" + j("request");
							return new v((n, r) => {
								"string" == typeof e && (e = { url: e }),
									this.on(t + ".done", (e) => {
										n.apply(this, e.responseArgs);
									}),
									this.on(t + ".fail", (e) => {
										r.apply(this, e.responseArgs);
									}),
									this.postMessage(t, e);
							});
						}
						instance(e) {
							if (!e || "string" != typeof e)
								throw new Error("The instance method expects an `instanceGuid` string.");
							if (e === this._instanceGuid) return this;
							if (this._parent) return this._parent.instance(e);
							var t = this._instanceClients[e];
							return (
								t || ((t = new O({ parent: this, instanceGuid: e })), (this._instanceClients[e] = t)), t
							);
						}
						metadata() {
							return this._parent
								? this._parent.metadata()
								: new v((e) => {
										this._metadata
											? e(this._metadata)
											: this.on("app.registered", () => {
													e(this._metadata);
											  });
								  });
						}
						context() {
							if (this._context) return v.resolve(this._context);
							if (this._instanceGuid && this._instanceGuid !== this._appGuid) {
								var e = "instances." + this._instanceGuid;
								return this.get(e).then((t) => ((this._context = t[e]), this._context));
							}
							return new v((e) => {
								this.on("app.registered", (t) => {
									e(t.context);
								});
							});
						}
						get(e) {
							var t = Array.isArray(e) ? e : [e];
							if (arguments.length > 1 || t.some((e) => !d(e)))
								throw new Error("The get method accepts a string or array of strings.");
							return T.call(this, "get", t).then(N.bind(null, e));
						}
						set(e, t) {
							var n = e;
							if ("string" == typeof e) {
								if (1 === arguments.length) throw new Error("The setter requires a value");
								(n = {})[e] = t;
							}
							if (
								!(function (e) {
									return null !== e && "object" == typeof e;
								})(n) ||
								Array.isArray(n)
							)
								throw new Error(
									"The set method accepts a key and value pair, or an object of key and value pairs."
								);
							return T.call(this, "set", n).then(N.bind(null, e));
						}
						invoke(e) {
							var t = {};
							if ("string" == typeof e) t[e] = Array.prototype.slice.call(arguments, 1);
							else {
								if ("object" != typeof e)
									throw new Error(
										"Invoke supports string arguments or an object with array of strings."
									);
								Object.keys(e).forEach((t) => {
									var n = e[t];
									if (!Array.isArray(n) || n.some((e) => !d(e)))
										throw new Error(
											"Invoke supports string arguments or an object with array of strings."
										);
								}),
									(t = e);
							}
							return T.call(this, "invoke", t).then(N.bind(null, e));
						}
					}
					const L = {
						init: function (e, t) {
							var n = c((t = t || window.location).search),
								r = c(t.hash),
								i = n.origin || r.origin,
								s = n.app_guid || r.app_guid;
							if (!i || !s) return !1;
							var o = new O({ origin: i, appGuid: s });
							return "function" == typeof e && o.on("app.registered", e.bind(o)), o;
						},
					};
				},
				512: function (e, t, n) {
					var r, i, s, o;
					(i = "Promise"),
						(s = void 0 !== n.g ? n.g : this),
						(o = function () {
							"use strict";
							var e,
								t,
								n,
								r = Object.prototype.toString,
								i =
									"undefined" != typeof setImmediate
										? function (e) {
												return setImmediate(e);
										  }
										: setTimeout;
							try {
								Object.defineProperty({}, "x", {}),
									(e = function (e, t, n, r) {
										return Object.defineProperty(e, t, {
											value: n,
											writable: !0,
											configurable: !1 !== r,
										});
									});
							} catch (t) {
								e = function (e, t, n) {
									return (e[t] = n), e;
								};
							}
							function s(e, r) {
								n.add(e, r), t || (t = i(n.drain));
							}
							function o(e) {
								var t,
									n = typeof e;
								return (
									null == e || ("object" != n && "function" != n) || (t = e.then),
									"function" == typeof t && t
								);
							}
							function a() {
								for (var e = 0; e < this.chain.length; e++)
									c(
										this,
										1 === this.state ? this.chain[e].success : this.chain[e].failure,
										this.chain[e]
									);
								this.chain.length = 0;
							}
							function c(e, t, n) {
								var r, i;
								try {
									!1 === t
										? n.reject(e.msg)
										: (r = !0 === t ? e.msg : t.call(void 0, e.msg)) === n.promise
										? n.reject(TypeError("Promise-chain cycle"))
										: (i = o(r))
										? i.call(r, n.resolve, n.reject)
										: n.resolve(r);
								} catch (e) {
									n.reject(e);
								}
							}
							function h(e) {
								var t,
									n = this;
								if (!n.triggered) {
									(n.triggered = !0), n.def && (n = n.def);
									try {
										(t = o(e))
											? s(function () {
													var r = new l(n);
													try {
														t.call(
															e,
															function () {
																h.apply(r, arguments);
															},
															function () {
																u.apply(r, arguments);
															}
														);
													} catch (e) {
														u.call(r, e);
													}
											  })
											: ((n.msg = e), (n.state = 1), n.chain.length > 0 && s(a, n));
									} catch (e) {
										u.call(new l(n), e);
									}
								}
							}
							function u(e) {
								var t = this;
								t.triggered ||
									((t.triggered = !0),
									t.def && (t = t.def),
									(t.msg = e),
									(t.state = 2),
									t.chain.length > 0 && s(a, t));
							}
							function d(e, t, n, r) {
								for (var i = 0; i < t.length; i++)
									!(function (i) {
										e.resolve(t[i]).then(function (e) {
											n(i, e);
										}, r);
									})(i);
							}
							function l(e) {
								(this.def = e), (this.triggered = !1);
							}
							function f(e) {
								(this.promise = e),
									(this.state = 0),
									(this.triggered = !1),
									(this.chain = []),
									(this.msg = void 0);
							}
							function p(e) {
								if ("function" != typeof e) throw TypeError("Not a function");
								if (0 !== this.__NPO__) throw TypeError("Not a promise");
								this.__NPO__ = 1;
								var t = new f(this);
								(this.then = function (e, n) {
									var r = {
										success: "function" != typeof e || e,
										failure: "function" == typeof n && n,
									};
									return (
										(r.promise = new this.constructor(function (e, t) {
											if ("function" != typeof e || "function" != typeof t)
												throw TypeError("Not a function");
											(r.resolve = e), (r.reject = t);
										})),
										t.chain.push(r),
										0 !== t.state && s(a, t),
										r.promise
									);
								}),
									(this.catch = function (e) {
										return this.then(void 0, e);
									});
								try {
									e.call(
										void 0,
										function (e) {
											h.call(t, e);
										},
										function (e) {
											u.call(t, e);
										}
									);
								} catch (e) {
									u.call(t, e);
								}
							}
							n = (function () {
								var e, n, r;
								function i(e, t) {
									(this.fn = e), (this.self = t), (this.next = void 0);
								}
								return {
									add: function (t, s) {
										(r = new i(t, s)), n ? (n.next = r) : (e = r), (n = r), (r = void 0);
									},
									drain: function () {
										var r = e;
										for (e = n = t = void 0; r; ) r.fn.call(r.self), (r = r.next);
									},
								};
							})();
							var v = e({}, "constructor", p, !1);
							return (
								(p.prototype = v),
								e(v, "__NPO__", 0, !1),
								e(p, "resolve", function (e) {
									return e && "object" == typeof e && 1 === e.__NPO__
										? e
										: new this(function (t, n) {
												if ("function" != typeof t || "function" != typeof n)
													throw TypeError("Not a function");
												t(e);
										  });
								}),
								e(p, "reject", function (e) {
									return new this(function (t, n) {
										if ("function" != typeof t || "function" != typeof n)
											throw TypeError("Not a function");
										n(e);
									});
								}),
								e(p, "all", function (e) {
									var t = this;
									return "[object Array]" != r.call(e)
										? t.reject(TypeError("Not an array"))
										: 0 === e.length
										? t.resolve([])
										: new t(function (n, r) {
												if ("function" != typeof n || "function" != typeof r)
													throw TypeError("Not a function");
												var i = e.length,
													s = Array(i),
													o = 0;
												d(
													t,
													e,
													function (e, t) {
														(s[e] = t), ++o === i && n(s);
													},
													r
												);
										  });
								}),
								e(p, "race", function (e) {
									var t = this;
									return "[object Array]" != r.call(e)
										? t.reject(TypeError("Not an array"))
										: new t(function (n, r) {
												if ("function" != typeof n || "function" != typeof r)
													throw TypeError("Not a function");
												d(
													t,
													e,
													function (e, t) {
														n(t);
													},
													r
												);
										  });
								}),
								p
							);
						}),
						(s[i] = s[i] || o()),
						e.exports
							? (e.exports = s[i])
							: void 0 ===
									(r = function () {
										return s[i];
									}.call(t, n, t, e)) || (e.exports = r);
				},
			},
			t = {};
		function n(r) {
			var i = t[r];
			if (void 0 !== i) return i.exports;
			var s = (t[r] = { exports: {} });
			return e[r].call(s.exports, s, s.exports, n), s.exports;
		}
		(n.n = (e) => {
			var t = e && e.__esModule ? () => e.default : () => e;
			return n.d(t, { a: t }), t;
		}),
			(n.d = (e, t) => {
				for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
			}),
			(n.g = (function () {
				if ("object" == typeof globalThis) return globalThis;
				try {
					return this || new Function("return this")();
				} catch (e) {
					if ("object" == typeof window) return window;
				}
			})()),
			(n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
			n(512);
		var r = n(855);
		return (r = r.default);
	})();
});
//# sourceMappingURL=zaf_sdk.min.js.map
