import { r as registerInstance, h, d as createEvent, H as Host, e as getElement, f as readTask, i as forceUpdate, w as writeTask, j as getAssetPath } from './index-3f617e20.js';
import { g as getIonMode$1, a as isPlatform } from './ionic-global-18a7529f.js';
import { G as GESTURE_CONTROLLER } from './gesture-controller-e2fdd40a.js';
import { h as hasShadowDom, i as inheritAriaAttributes, c as componentOnReady, r as raf, a as renderHiddenInput, g as getElementRoot, b as inheritAttributes$1, d as addEventListener, e as hasLazyBuild } from './helpers-2dda394b.js';
import { p as printIonWarning, a as printIonError } from './index-05b398c2.js';
import { o as openURL, c as createColorClasses$1, h as hostContext, g as getClassMap } from './theme-7ef00c83.js';
import { i as isRTL$1 } from './dir-03012648.js';
import { c as chevronBack, a as chevronForward, b as chevronDown, d as caretUpSharp, e as caretDownSharp } from './index-b2ca4ea8.js';
import { startFocusVisible } from './focus-visible-d6fbccc2.js';
import { g as generateDayAriaLabel, a as getDay, i as isBefore, b as isAfter, c as isSameDay, d as getPreviousMonth, e as getNextMonth, v as validateParts, f as getPartsFromCalendarDay, h as getEndOfWeek, j as getStartOfWeek, k as getPreviousDay, l as getNextDay, m as getPreviousWeek, n as getNextWeek, p as parseMinParts, o as parseMaxParts, q as parseDate, w as warnIfValueOutOfBounds, r as convertToArrayOfNumbers, s as convertDataToISO, t as getToday, u as getClosestValidDate, x as getNumDaysInMonth, y as getCombinedDateColumnData, z as getMonthColumnData, A as getDayColumnData, B as getYearColumnData, C as isMonthFirstLocale, D as getTimeColumnsData, E as isLocaleDayPeriodRTL, F as getDaysOfWeek, G as getMonthAndYear, H as getDaysOfMonth, I as generateMonths, J as is24Hour, K as getLocalizedTime, L as getMonthAndDay, M as formatValue, N as getNextYear, O as getPreviousYear, P as clampDate, Q as parseAmPm, R as calculateHourFromAMPM } from './data-8b5bf6cd.js';
import { h as hapticSelectionStart, a as hapticSelectionChanged, b as hapticSelectionEnd } from './haptic-8b427683.js';
import { C as CoreDelegate, a as attachComponent, d as detachComponent } from './framework-delegate-f76db84a.js';
import { B as BACKDROP, p as prepareOverlay, s as setOverlayId, a as present, f as focusFirstDescendant, d as dismiss, e as eventMethod, b as popoverController } from './overlays-61e5dbac.js';
import { d as deepReady, w as waitForMount } from './index-62762a82.js';
import { c as createAnimation } from './animation-dbf27bca.js';
import './hardware-back-button-fa04d6e9.js';
import './index-6e17926c.js';

const descriptionComponentCss = ":host{display:block}.description-container{background:#e8f1f1;border:1px solid #2b7371;border-radius:2px;padding:0.5625em;margin-top:1.25em}.fade-in.top{transition:0.5s all ease-in-out;transform:translate3d(0, -50px, 0);opacity:0}";

const DescriptionComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.sessionName = undefined;
    this.showContent = false;
  }
  setData(newValue) {
    this.showContent = false;
    if (newValue) {
      if (newValue.title) {
        this.title = newValue.title;
      }
      else {
        this.title = newValue.label;
      }
    }
    this.data = newValue;
    setTimeout(() => {
      this.showContent = true;
    }, 100);
    console.log("desc,setData");
  }
  render() {
    var _a, _b;
    return (h("div", { class: `fade-in top ${this.showContent ? 'show' : ''}` }, ((_a = this.data) === null || _a === void 0 ? void 0 : _a.metadata.description) && (h("div", { class: "description-container", innerHTML: (_b = this.data) === null || _b === void 0 ? void 0 : _b.metadata.description }))));
  }
  static get watchers() { return {
    "data": ["setData"]
  }; }
};
DescriptionComponent.style = descriptionComponentCss;

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    const _super = (instance) => {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    const ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

const UnsubscriptionError = createErrorClass((_super) => function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors
        ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}`
        : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
});

function arrRemove(arr, item) {
    if (arr) {
        const index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

class Subscription {
    constructor(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    unsubscribe() {
        let errors;
        if (!this.closed) {
            this.closed = true;
            const { _parentage } = this;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    for (const parent of _parentage) {
                        parent.remove(this);
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            const { initialTeardown: initialFinalizer } = this;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            const { _finalizers } = this;
            if (_finalizers) {
                this._finalizers = null;
                for (const finalizer of _finalizers) {
                    try {
                        execFinalizer(finalizer);
                    }
                    catch (err) {
                        errors = errors !== null && errors !== void 0 ? errors : [];
                        if (err instanceof UnsubscriptionError) {
                            errors = [...errors, ...err.errors];
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    }
    add(teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    }
    _hasParent(parent) {
        const { _parentage } = this;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    }
    _addParent(parent) {
        const { _parentage } = this;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    }
    _removeParent(parent) {
        const { _parentage } = this;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    }
    remove(teardown) {
        const { _finalizers } = this;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    }
}
Subscription.EMPTY = (() => {
    const empty = new Subscription();
    empty.closed = true;
    return empty;
})();
const EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

const config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

const timeoutProvider = {
    setTimeout(handler, timeout, ...args) {
        const { delegate } = timeoutProvider;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout(handler, timeout, ...args);
        }
        return setTimeout(handler, timeout, ...args);
    },
    clearTimeout(handle) {
        const { delegate } = timeoutProvider;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(() => {
        const { onUnhandledError } = config;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}

function noop() { }

const COMPLETE_NOTIFICATION = (() => createNotification('C', undefined, undefined))();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind,
        value,
        error,
    };
}

function errorContext(cb) {
    {
        cb();
    }
}

class Subscriber extends Subscription {
    constructor(destination) {
        super();
        this.isStopped = false;
        if (destination) {
            this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(this);
            }
        }
        else {
            this.destination = EMPTY_OBSERVER;
        }
    }
    static create(next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    }
    next(value) {
        if (this.isStopped) {
            handleStoppedNotification(nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    }
    error(err) {
        if (this.isStopped) {
            handleStoppedNotification(errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    }
    complete() {
        if (this.isStopped) {
            handleStoppedNotification(COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    }
    unsubscribe() {
        if (!this.closed) {
            this.isStopped = true;
            super.unsubscribe();
            this.destination = null;
        }
    }
    _next(value) {
        this.destination.next(value);
    }
    _error(err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    }
    _complete() {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    }
}
const _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
class ConsumerObserver {
    constructor(partialObserver) {
        this.partialObserver = partialObserver;
    }
    next(value) {
        const { partialObserver } = this;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    }
    error(err) {
        const { partialObserver } = this;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    }
    complete() {
        const { partialObserver } = this;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    }
}
class SafeSubscriber extends Subscriber {
    constructor(observerOrNext, error, complete) {
        super();
        let partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            let context;
            if (this && config.useDeprecatedNextContext) {
                context = Object.create(observerOrNext);
                context.unsubscribe = () => this.unsubscribe();
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context),
                    error: observerOrNext.error && bind(observerOrNext.error, context),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        this.destination = new ConsumerObserver(partialObserver);
    }
}
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    const { onStoppedNotification } = config;
    onStoppedNotification && timeoutProvider.setTimeout(() => onStoppedNotification(notification, subscriber));
}
const EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

const observable = (() => (typeof Symbol === 'function' && Symbol.observable) || '@@observable')();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
    };
}

class Observable {
    constructor(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    lift(operator) {
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
    subscribe(observerOrNext, error, complete) {
        const subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(() => {
            const { operator, source } = this;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        this._subscribe(subscriber)
                    :
                        this._trySubscribe(subscriber));
        });
        return subscriber;
    }
    _trySubscribe(sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    }
    forEach(next, promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            const subscriber = new SafeSubscriber({
                next: (value) => {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            this.subscribe(subscriber);
        });
    }
    _subscribe(subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    }
    [observable]() {
        return this;
    }
    pipe(...operations) {
        return pipeFromArray(operations)(this);
    }
    toPromise(promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            let value;
            this.subscribe((x) => (value = x), (err) => reject(err), () => resolve(value));
        });
    }
}
Observable.create = (subscribe) => {
    return new Observable(subscribe);
};
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return (source) => {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
class OperatorSubscriber extends Subscriber {
    constructor(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        super(destination);
        this.onFinalize = onFinalize;
        this.shouldUnsubscribe = shouldUnsubscribe;
        this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : super._next;
        this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : super._error;
        this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : super._complete;
    }
    unsubscribe() {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed } = this;
            super.unsubscribe();
            !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    }
}

const ObjectUnsubscribedError = createErrorClass((_super) => function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = 'ObjectUnsubscribedError';
    this.message = 'object unsubscribed';
});

class Subject extends Observable {
    constructor() {
        super();
        this.closed = false;
        this.currentObservers = null;
        this.observers = [];
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    lift(operator) {
        const subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    }
    _throwIfClosed() {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    }
    next(value) {
        errorContext(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                if (!this.currentObservers) {
                    this.currentObservers = Array.from(this.observers);
                }
                for (const observer of this.currentObservers) {
                    observer.next(value);
                }
            }
        });
    }
    error(err) {
        errorContext(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                this.hasError = this.isStopped = true;
                this.thrownError = err;
                const { observers } = this;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    }
    complete() {
        errorContext(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                this.isStopped = true;
                const { observers } = this;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    }
    unsubscribe() {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    }
    get observed() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }
    _trySubscribe(subscriber) {
        this._throwIfClosed();
        return super._trySubscribe(subscriber);
    }
    _subscribe(subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    }
    _innerSubscribe(subscriber) {
        const { hasError, isStopped, observers } = this;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(() => {
            this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    }
    _checkFinalizedStatuses(subscriber) {
        const { hasError, thrownError, isStopped } = this;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    }
    asObservable() {
        const observable = new Observable();
        observable.source = this;
        return observable;
    }
}
Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
};
class AnonymousSubject extends Subject {
    constructor(destination, source) {
        super();
        this.destination = destination;
        this.source = source;
    }
    next(value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }
    error(err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    }
    complete() {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    _subscribe(subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    }
}

function isScheduler(value) {
    return value && isFunction(value.schedule);
}

function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction(last(args)) ? args.pop() : undefined;
}
function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : undefined;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

const isArrayLike = ((x) => x && typeof x.length === 'number' && typeof x !== 'function');

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError(`You provided ${input !== null && typeof input === 'object' ? 'an invalid object' : `'${input}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`);
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
const iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function* readableStreamLikeToAsyncGenerator_1() {
        const reader = readableStream.getReader();
        try {
            while (true) {
                const { value, done } = yield __await(reader.read());
                if (done) {
                    return yield __await(void 0);
                }
                yield yield __await(value);
            }
        }
        finally {
            reader.releaseLock();
        }
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable((subscriber) => {
        const obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable((subscriber) => {
        for (let i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable((subscriber) => {
        promise
            .then((value) => {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, (err) => subscriber.error(err))
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable((subscriber) => {
        for (const value of iterable) {
            subscriber.next(value);
            if (subscriber.closed) {
                return;
            }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable((subscriber) => {
        process(asyncIterable, subscriber).catch((err) => subscriber.error(err));
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (asyncIterable_1 = __asyncValues(asyncIterable); asyncIterable_1_1 = yield asyncIterable_1.next(), !asyncIterable_1_1.done;) {
                const value = asyncIterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)) yield _a.call(asyncIterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}

function executeSchedule(parentSubscription, scheduler, work, delay = 0, repeat = false) {
    const scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}

function observeOn(scheduler, delay = 0) {
    return operate((source, subscriber) => {
        source.subscribe(createOperatorSubscriber(subscriber, (value) => executeSchedule(subscriber, scheduler, () => subscriber.next(value), delay), () => executeSchedule(subscriber, scheduler, () => subscriber.complete(), delay), (err) => executeSchedule(subscriber, scheduler, () => subscriber.error(err), delay)));
    });
}

function subscribeOn(scheduler, delay = 0) {
    return operate((source, subscriber) => {
        subscriber.add(scheduler.schedule(() => source.subscribe(subscriber), delay));
    });
}

function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function scheduleArray(input, scheduler) {
    return new Observable((subscriber) => {
        let i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

function scheduleIterable(input, scheduler) {
    return new Observable((subscriber) => {
        let iterator$1;
        executeSchedule(subscriber, scheduler, () => {
            iterator$1 = input[iterator]();
            executeSchedule(subscriber, scheduler, () => {
                let value;
                let done;
                try {
                    ({ value, done } = iterator$1.next());
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return () => isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    });
}

function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable((subscriber) => {
        executeSchedule(subscriber, scheduler, () => {
            const iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, () => {
                iterator.next().then((result) => {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}

function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}

function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

function map(project, thisArg) {
    return operate((source, subscriber) => {
        let index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, (value) => {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

const { isArray: isArray$1 } = Array;
function callOrApply(fn, args) {
    return isArray$1(args) ? fn(...args) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map(args => callOrApply(fn, args));
}

const { isArray } = Array;
const { getPrototypeOf, prototype: objectProto, keys: getKeys } = Object;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        const first = args[0];
        if (isArray(first)) {
            return { args: first, keys: null };
        }
        if (isPOJO(first)) {
            const keys = getKeys(first);
            return {
                args: keys.map((key) => first[key]),
                keys,
            };
        }
    }
    return { args: args, keys: null };
}
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}

function createObject(keys, values) {
    return keys.reduce((result, key, i) => ((result[key] = values[i]), result), {});
}

function combineLatest(...args) {
    const scheduler = popScheduler(args);
    const resultSelector = popResultSelector(args);
    const { args: observables, keys } = argsArgArrayOrObject(args);
    if (observables.length === 0) {
        return from([], scheduler);
    }
    const result = new Observable(combineLatestInit(observables, scheduler, keys
        ?
            (values) => createObject(keys, values)
        :
            identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
function combineLatestInit(observables, scheduler, valueTransform = identity) {
    return (subscriber) => {
        maybeSchedule(scheduler, () => {
            const { length } = observables;
            const values = new Array(length);
            let active = length;
            let remainingFirstValues = length;
            for (let i = 0; i < length; i++) {
                maybeSchedule(scheduler, () => {
                    const source = from(observables[i], scheduler);
                    let hasFirstValue = false;
                    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, () => {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            }
        }, subscriber);
    };
}
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        executeSchedule(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}

class User {
  constructor(region, player_id, sex, education, birthyear, email) {
    this.region = region;
    this.player_id = player_id;
    this.sex = sex;
    this.education = education;
    this.birthyear = birthyear;
    this.email = email;
  }
}

const serverUrl = "https://emdir-web-devel.multilogic.hu";
const host_domain = "multilogic.hu";

class DialogAsyncService {
  constructor() {
    this.serviceUrl = `${serverUrl}/emerald/rest/api/v1/product-finder`;
  }
  startWithIri(iri, lang, answers, stored) {
    const data$ = fetch(`${this.serviceUrl}?stored=${stored}`, {
      method: 'POST',
      body: JSON.stringify({ iri, lang, answers }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
    const metadata$ = fetch(`${this.serviceUrl}/dialogByIri?iri=${iri}&lang=${lang}`)
      .then(response => response.json());
    return combineLatest([data$, metadata$]).pipe(map(([data, metadata]) => ({ data, metadata })));
  }
  startWithCaseId(caseId, date, lang, answers, stored) {
    const data$ = fetch(`${this.serviceUrl}?stored=${stored}`, {
      method: 'POST',
      body: JSON.stringify({ caseId, date, lang, answers }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
    const metadata$ = fetch(`${this.serviceUrl}/dialog?caseId=${caseId}&date=${date}`)
      .then(response => response.json());
    return combineLatest([data$, metadata$]).pipe(map(([data, metadata]) => ({ data, metadata })));
  }
  getSession() {
    return from(fetch(`${this.serviceUrl}/${this.sessionId}`).then(response => response.json()));
  }
  answer(body) {
    return from(fetch(`${this.serviceUrl}/${this.sessionId}/answers`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));
  }
  revokeAnswer(body) {
    return from(fetch(`${this.serviceUrl}/${this.sessionId}/answers`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));
  }
  getDialogMetadata(iri, lang) {
    return from(fetch(`${this.serviceUrl}/dialogByIri?iri=${iri}&lang=${lang}`).then(response => response.json()));
  }
}

class ElasticService {
  constructor() {
    this.serviceUrl = `${serverUrl}/emerald/rest/api/v1/analytics/`;
  }
  sendConsultationData(consultationObj) {
    return from(fetch(`${this.serviceUrl}/consultation`, {
      method: 'POST',
      body: JSON.stringify(consultationObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));
  }
}

class HelperService {
  constructor(user) {
    this.host_domain = host_domain;
    //console.log("helperservice", user)
    this.player_id = user.player_id || 12;
    this.region = user.region || 0;
    this.age = new Date().getFullYear() - user.birthyear || 26;
    this.sex = user.sex || 1;
    this.education = user.education || 'higher';
    this.email = user.email || 'tesztelek@ml.hu';
  }
  getBodyWithUsers(body) {
    body.player_id = this.player_id;
    body.host_domain = this.host_domain;
    body.mail = this.email;
    var score;
    var scr = body.goal.expert.substring(body.goal.expert.lastIndexOf("Elért pontszám: ") + 15, body.goal.expert.lastIndexOf("Elért pontszám: ") + 25);
    if (scr.includes('.')) {
      score = parseInt(scr.substring(0, scr.indexOf('.')));
    }
    else {
      score = parseInt(scr);
    }
    body.score = score;
    body.region = this.region;
    body.sex = this.sex;
    body.age = this.age;
    body.education = this.education;
    //console.log("getBodyWithUsers", body);
    return body;
  }
}

const dialogComponentCss = ".dialog-body{background:#fafafa;min-height:100vh;padding-right:0.9375em;padding-left:0.9375em;color:#4a5468;display:flex}.dialog-root{display:flex;flex-direction:column;background:#fafafa}.content{flex:1 1 auto;overflow-y:auto}.steps{margin-bottom:2.5em;overflow:hidden}";

const DialogComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.answer$ = new Subject();
    this.revoke$ = new Subject();
    this.startDate = Date.now();
    this.locale = 'hu';
    this.caseId = '';
    this.iri = '';
    this.date = '';
    this.player_id = undefined;
    this.education = undefined;
    this.sex = undefined;
    this.birthyear = undefined;
    this.region = undefined;
    this.email = undefined;
    this.params = new Map();
    this.dialogData = undefined;
    this.dialogMetadata = undefined;
    this.fragmentData = [];
    this.result = undefined;
    this.user = new User(this.region, this.player_id, this.sex, this.education, this.birthyear, this.email);
  }
  async componentDidLoad() {
    this.initSubscriptions();
    this.user = new User(this.region, this.player_id, this.sex, this.education, this.birthyear, this.email);
    this.dialogAsyncService = new DialogAsyncService();
    this.elasticService = new ElasticService();
    this.helperService = new HelperService(this.user);
    console.log('caseid:', this.caseId);
    console.log('user:', this.user);
    await this.startWithCaseId(this.caseId, this.date);
    await this.startWithIri(this.iri);
    //await this.startWithCaseId('YY0013', null);
    //await this.startWithCaseId('CSA0005', null);
    //await this.startWithCaseId('YY0011', '2022-06-09')
    //await this.startWithIri('xtext://resource/27fb08d0-f1e9-4599-8714-62b469c81143/2021-01-01');
    //await this.startWithIri('xtext://resource/2e5ea4aa-e046-40da-8b75-504c761bc2e9/2022-09-12/draft')
  }
  answersFromParams() {
    let answers = [];
    console.log("params", this.params);
    let ids = Object.keys(this.params).filter((p) => {
      return /^q_/.test(p) || /^qq_/.test(p);
    });
    ids.forEach((id) => {
      answers.push({ iri: id, answer: this.params[id] });
    });
    if (this.helperService.region !== null && this.helperService.region !== undefined) {
      answers.push({ iri: 'qq_region', answer: this.helperService.region + '' });
    }
    console.log("answers", answers);
    return answers;
  }
  async startWithCaseId(caseId, date) {
    if (caseId) {
      if (!date) {
        const d = new Date();
        date = d.toLocaleDateString('hu-HU').replace(/\./g, '').replace(/ /g, '-');
      }
      console.log('locale', this.locale);
      this.dialogAsyncService.startWithCaseId(caseId, date, this.locale, this.answersFromParams(), true).subscribe({
        next: res => {
          this.dialogData = res.data;
          console.log("in call", this.dialogData);
          this.dialogMetadata = res.metadata;
          this.fragmentData = [...res.data.step.fragments];
          this.dialogAsyncService.sessionId = this.dialogData.sessionId;
          this.dialogAsyncService.dialogIri = this.dialogMetadata.iri;
          this.dialogAsyncService.endpointId = this.dialogData.endpointId;
          this.dialogAsyncService.getSession().subscribe(res2 => {
            res2.fragments.forEach(fr => {
              if (!res.data.step.fragments.map(fr => fr.iri).includes(fr.iri)) {
                fr.isPre = true;
              }
            });
            res2.fragments = res2.fragments.filter(fr => {
              if (fr.isPre) {
                const str = fr.iri;
                const n = str.lastIndexOf('/');
                const shortId = str.substring(n + 1);
                return !/^qq_/.test(shortId);
              }
              return true;
            });
            this.fragmentData = [...res2.fragments];
          });
        },
        error: error => console.error(error)
      });
    }
  }
  async startWithIri(iri) {
    if (iri) {
      this.dialogAsyncService.startWithIri(iri, this.locale, [], true).subscribe({
        next: res => {
          this.dialogData = res.data;
          console.log("in call", this.dialogData);
          this.dialogMetadata = res.metadata;
          this.fragmentData = [...res.data.step.fragments];
          this.dialogAsyncService.sessionId = this.dialogData.sessionId;
          this.dialogAsyncService.dialogIri = this.dialogMetadata.iri;
          this.dialogAsyncService.endpointId = this.dialogData.endpointId;
          this.dialogAsyncService.getSession().subscribe(res2 => {
            res2.fragments.forEach(fr => {
              if (!res.data.step.fragments.map(fr => fr.iri).includes(fr.iri)) {
                fr.isPre = true;
              }
            });
            res2.fragments = res2.fragments.filter(fr => {
              if (fr.isPre) {
                const str = fr.iri;
                const n = str.lastIndexOf('/');
                const shortId = str.substring(n + 1);
                return !/^qq_/.test(shortId);
              }
              return true;
            });
            this.fragmentData = [...res2.fragments];
          });
        },
        error: error => console.error(error)
      });
    }
  }
  initSubscriptions() {
    this.answer$.subscribe((d) => this.processNextQuestion(d));
    this.revoke$.subscribe((d) => this.processRevoke(d));
  }
  processNextQuestion(q) {
    if (q.fragments[q.fragments.length - 1].type === 'Goal') {
      this.result = q.fragments[q.fragments.length - 1];
      this.endDate = Date.now();
    }
    this.fragmentData = [...this.fragmentData, ...q.fragments];
    this.fragmentData = [...new Set(this.fragmentData)];
    if ((this.helperService.player_id) && q.fragments[q.fragments.length - 1].type === 'Goal') {
      this.saveAuto();
    }
    this.scrollToLast();
  }
  processRevoke(r) {
    this.result = null;
    let end = this.fragmentData.findIndex(v => v.iri === r.revokeAnswerIri);
    console.log("before");
    this.fragmentData.forEach(v => console.log(v));
    this.fragmentData = [...this.fragmentData.slice(0, end + 1), ...r.fragments];
    console.log("after");
    this.fragmentData.forEach(v => console.log(v));
    if (r.fragments[r.fragments.length - 1].type === 'Goal') {
      this.result = Object.assign({}, r.fragments[r.fragments.length - 1]);
      this.endDate = Date.now();
      if (this.helperService.player_id) {
        this.saveAuto();
      }
    }
    this.scrollToLast();
  }
  scrollToLast() {
    let steps = document.getElementsByClassName('step');
    if (steps.length > 0) {
      let resultContainer = document.getElementsByClassName('result-container');
      if (resultContainer.length > 0) {
        setTimeout(() => {
          resultContainer[resultContainer.length - 1].scrollIntoView();
        }, 1000);
      }
      else {
        setTimeout(() => {
          steps[steps.length - 1].scrollIntoView();
        }, 50);
      }
    }
  }
  handleAnswer({ detail: answer }) {
    console.log("handle answer", answer);
    this.dialogAsyncService.answer(answer).subscribe({
      next: res => {
        console.log("res", res);
        this.answer$.next(res);
      },
      error: err => {
        this.answer$.next(err);
      }
    });
  }
  handleRevoke({ detail: answer }) {
    this.dialogAsyncService.revokeAnswer(answer).subscribe({
      next: res => {
        res.revokeAnswerIri = answer.iri;
        this.revoke$.next(res);
      },
      error: err => {
        this.revoke$.next(err);
      }
    });
  }
  saveAuto() {
    console.log("saveAuto");
    let body = this.saveDialog();
    body = this.helperService.getBodyWithUsers(body);
    console.log("beforesenddata");
    this.sendData(body);
  }
  saveDialog() {
    var _a, _b;
    let body = {};
    body.lang = this.locale;
    if (this.dialogMetadata.metadata.title) {
      body.title = this.dialogMetadata.metadata.title;
    }
    else {
      body.title = this.dialogMetadata.label;
    }
    if ((_a = this.dialogMetadata.metadata) === null || _a === void 0 ? void 0 : _a.description) {
      body.description = (_b = this.dialogMetadata.metadata) === null || _b === void 0 ? void 0 : _b.description;
    }
    body.startDate = this.startDate;
    body.endDate = this.endDate;
    body.goal = { "expert": this.result.labelExpert, "layman": this.result.labelLayman };
    body.session = this.dialogData.sessionId;
    body.model_id = new RegExp("xtext://resource/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})").exec(this.dialogMetadata.iri)[0];
    let localPairs = new Array();
    for (let i = 0; i < this.fragmentData.length - 1; ++i) {
      let frag = this.fragmentData[i];
      let questionLayman = frag.labelLayman;
      let questionLabel = frag.label;
      let iri = frag.iri;
      //let questionExpert = frag.labelExpert;
      //let answerExpert;
      let answerLayman;
      if (frag.type === 'QuestionMenu') {
        answerLayman = frag.optionsLayman[frag.answer];
        //answerExpert = frag.optionsExpert[frag.answer]
      }
      else if (frag.type === 'QuestionYesNo') {
        if (this.locale === 'en') {
          answerLayman /*= answerExpert*/ = JSON.parse(frag.answer) ? "Yes" : "No";
        }
        else {
          answerLayman /*= answerExpert */ = JSON.parse(frag.answer) ? "Igen" : "Nem";
        }
      }
      else {
        answerLayman /*= answerExpert*/ = frag.answer;
      }
      localPairs.push({
        "question": { /*"expert": questionExpert,*/ "layman": questionLayman, "label": questionLabel, "iri": iri },
        "answer": { /*"expert": answerExpert,*/ "layman": answerLayman }
      });
    }
    body.pairs = localPairs;
    return body;
  }
  async sendData(body) {
    console.log("sendData", body);
    this.elasticService.sendConsultationData(body).subscribe({
      next: () => { },
      error: error => {
        console.log(error);
      }
    });
  }
  render() {
    var _a;
    return (h("div", { class: "dialog-body" }, h("div", { class: "dialog-root content" }, h("description-component", { data: this.dialogMetadata, sessionName: (_a = this.dialogData) === null || _a === void 0 ? void 0 : _a.sessionName }), h("div", { class: "steps" }, this.fragmentData.map((fragment) => (h("step-component", { key: `${this.locale}-${fragment}`, locale: this.locale, fragment: fragment, answerValue: fragment === null || fragment === void 0 ? void 0 : fragment.answer, controlDisabled: fragment.isPre, onAnswer: (event) => this.handleAnswer(event), onRevokeAnswer: (event) => this.handleRevoke(event) })))), this.result && (h("result-component", { key: `${this.locale}-${this.result}`, locale: this.locale, resultData: this.result })))));
  }
};
DialogComponent.style = dialogComponentCss;

const backdropIosCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";

const backdropMdCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";

const Backdrop = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionBackdropTap = createEvent(this, "ionBackdropTap", 7);
    this.blocker = GESTURE_CONTROLLER.createBlocker({
      disableScroll: true,
    });
    this.visible = true;
    this.tappable = true;
    this.stopPropagation = true;
  }
  connectedCallback() {
    if (this.stopPropagation) {
      this.blocker.block();
    }
  }
  disconnectedCallback() {
    this.blocker.unblock();
  }
  onMouseDown(ev) {
    this.emitTap(ev);
  }
  emitTap(ev) {
    if (this.stopPropagation) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (this.tappable) {
      this.ionBackdropTap.emit();
    }
  }
  render() {
    const mode = getIonMode$1(this);
    return (h(Host, { tabindex: "-1", "aria-hidden": "true", class: {
        [mode]: true,
        'backdrop-hide': !this.visible,
        'backdrop-no-tappable': !this.tappable,
      } }));
  }
};
Backdrop.style = {
  ios: backdropIosCss,
  md: backdropMdCss
};

const buttonIosCss = ":host{--overflow:hidden;--ripple-color:currentColor;--border-width:initial;--border-color:initial;--border-style:initial;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--box-shadow:none;display:inline-block;width:auto;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;font-kerning:none}:host(.button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.button-solid){--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff)}:host(.button-outline){--border-color:var(--ion-color-primary, #3880ff);--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-clear){--border-width:0;--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content}:host(.button-full:not(.button-round)) .button-native{border-radius:0;border-right-width:0;border-left-width:0}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);line-height:1;box-shadow:var(--box-shadow);contain:layout style;cursor:pointer;opacity:var(--opacity);overflow:var(--overflow);z-index:0;box-sizing:border-box;appearance:none}.button-native::-moz-focus-inner{border:0}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}::slotted(ion-icon){font-size:1.4em;pointer-events:none}::slotted(ion-icon[slot=start]){-webkit-margin-start:-0.3em;margin-inline-start:-0.3em;-webkit-margin-end:0.3em;margin-inline-end:0.3em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=end]){-webkit-margin-start:0.3em;margin-inline-start:0.3em;-webkit-margin-end:-0.2em;margin-inline-end:-0.2em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=icon-only]){font-size:1.8em}ion-ripple-effect{color:var(--ripple-color)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}@media (any-hover: hover){:host(:hover){color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-activated){color:var(--color-activated)}:host(.ion-activated) .button-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.button-solid.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-outline.ion-color) .button-native{border-color:var(--ion-color-base);background:transparent;color:var(--ion-color-base)}:host(.button-clear.ion-color) .button-native{background:transparent;color:var(--ion-color-base)}:host(.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{color:var(--ion-toolbar-color, var(--color))}:host(.button-outline.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{border-color:var(--ion-toolbar-color, var(--color, var(--border-color)))}:host(.button-solid.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--background));color:var(--ion-toolbar-background, var(--color))}:host(.button-outline.ion-activated.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--color));color:var(--ion-toolbar-background, var(--background), var(--ion-color-primary-contrast, #fff))}:host{--border-radius:14px;--padding-top:0;--padding-bottom:0;--padding-start:1em;--padding-end:1em;--transition:background-color, opacity 100ms linear;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:4px;margin-bottom:4px;height:3.1em;font-size:16px;font-weight:500;letter-spacing:0}:host(.in-buttons){font-size:17px;font-weight:400}:host(.button-solid){--background-activated:var(--ion-color-primary-shade, #3171e0);--background-focused:var(--ion-color-primary-shade, #3171e0);--background-hover:var(--ion-color-primary-tint, #4c8dff);--background-activated-opacity:1;--background-focused-opacity:1;--background-hover-opacity:1}:host(.button-outline){--border-radius:14px;--border-width:1px;--border-style:solid;--background-activated:var(--ion-color-primary, #3880ff);--background-focused:var(--ion-color-primary, #3880ff);--background-hover:transparent;--background-focused-opacity:.1;--color-activated:var(--ion-color-primary-contrast, #fff)}:host(.button-clear){--background-activated:transparent;--background-activated-opacity:0;--background-focused:var(--ion-color-primary, #3880ff);--background-hover:transparent;--background-focused-opacity:.1;font-size:17px;font-weight:normal}:host(.button-large){--border-radius:16px;--padding-top:0;--padding-start:1em;--padding-end:1em;--padding-bottom:0;height:3.1em;font-size:20px}:host(.button-small){--border-radius:6px;--padding-top:0;--padding-start:0.9em;--padding-end:0.9em;--padding-bottom:0;height:2.1em;font-size:13px}:host(.button-round){--border-radius:64px;--padding-top:0;--padding-start:26px;--padding-end:26px;--padding-bottom:0}:host(.button-strong){font-weight:600}:host(.button-outline.ion-focused.ion-color) .button-native,:host(.button-clear.ion-focused.ion-color) .button-native{color:var(--ion-color-base)}:host(.button-outline.ion-focused.ion-color) .button-native::after,:host(.button-clear.ion-focused.ion-color) .button-native::after{background:var(--ion-color-base)}:host(.button-solid.ion-color.ion-focused) .button-native::after{background:var(--ion-color-shade)}@media (any-hover: hover){:host(.button-clear:not(.ion-activated):hover),:host(.button-outline:not(.ion-activated):hover){opacity:0.6}:host(.button-clear.ion-color:hover) .button-native,:host(.button-outline.ion-color:hover) .button-native{color:var(--ion-color-base)}:host(.button-clear.ion-color:hover) .button-native::after,:host(.button-outline.ion-color:hover) .button-native::after{background:transparent}:host(.button-solid.ion-color:hover) .button-native::after{background:var(--ion-color-tint)}:host(:hover.button-solid.in-toolbar:not(.ion-color):not(.in-toolbar-color):not(.ion-activated)) .button-native::after{background:#fff;opacity:0.1}}:host(.button-clear.ion-activated){opacity:0.4}:host(.button-outline.ion-activated.ion-color) .button-native{color:var(--ion-color-contrast)}:host(.button-outline.ion-activated.ion-color) .button-native::after{background:var(--ion-color-base)}:host(.button-solid.ion-color.ion-activated) .button-native::after{background:var(--ion-color-shade)}";

const buttonMdCss = ":host{--overflow:hidden;--ripple-color:currentColor;--border-width:initial;--border-color:initial;--border-style:initial;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--box-shadow:none;display:inline-block;width:auto;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;font-kerning:none}:host(.button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.button-solid){--background:var(--ion-color-primary, #3880ff);--color:var(--ion-color-primary-contrast, #fff)}:host(.button-outline){--border-color:var(--ion-color-primary, #3880ff);--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-clear){--border-width:0;--background:transparent;--color:var(--ion-color-primary, #3880ff)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content}:host(.button-full:not(.button-round)) .button-native{border-radius:0;border-right-width:0;border-left-width:0}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);line-height:1;box-shadow:var(--box-shadow);contain:layout style;cursor:pointer;opacity:var(--opacity);overflow:var(--overflow);z-index:0;box-sizing:border-box;appearance:none}.button-native::-moz-focus-inner{border:0}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}::slotted(ion-icon){font-size:1.4em;pointer-events:none}::slotted(ion-icon[slot=start]){-webkit-margin-start:-0.3em;margin-inline-start:-0.3em;-webkit-margin-end:0.3em;margin-inline-end:0.3em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=end]){-webkit-margin-start:0.3em;margin-inline-start:0.3em;-webkit-margin-end:-0.2em;margin-inline-end:-0.2em;margin-top:0;margin-bottom:0}::slotted(ion-icon[slot=icon-only]){font-size:1.8em}ion-ripple-effect{color:var(--ripple-color)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}@media (any-hover: hover){:host(:hover){color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-activated){color:var(--color-activated)}:host(.ion-activated) .button-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.button-solid.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-outline.ion-color) .button-native{border-color:var(--ion-color-base);background:transparent;color:var(--ion-color-base)}:host(.button-clear.ion-color) .button-native{background:transparent;color:var(--ion-color-base)}:host(.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{color:var(--ion-toolbar-color, var(--color))}:host(.button-outline.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{border-color:var(--ion-toolbar-color, var(--color, var(--border-color)))}:host(.button-solid.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--background));color:var(--ion-toolbar-background, var(--color))}:host(.button-outline.ion-activated.in-toolbar:not(.ion-color):not(.in-toolbar-color)) .button-native{background:var(--ion-toolbar-color, var(--color));color:var(--ion-toolbar-background, var(--background), var(--ion-color-primary-contrast, #fff))}:host{--border-radius:4px;--padding-top:0;--padding-bottom:0;--padding-start:1.1em;--padding-end:1.1em;--transition:box-shadow 280ms cubic-bezier(.4, 0, .2, 1),\n                background-color 15ms linear,\n                color 15ms linear;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:4px;margin-bottom:4px;height:36px;font-size:14px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase}:host(.button-solid){--background-activated:transparent;--background-hover:var(--ion-color-primary-contrast, #fff);--background-focused:var(--ion-color-primary-contrast, #fff);--background-activated-opacity:0;--background-focused-opacity:.24;--background-hover-opacity:.08;--box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)}:host(.button-solid.ion-activated){--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)}:host(.button-outline){--border-width:2px;--border-style:solid;--box-shadow:none;--background-activated:transparent;--background-focused:var(--ion-color-primary, #3880ff);--background-hover:var(--ion-color-primary, #3880ff);--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04}:host(.button-outline.ion-activated.ion-color) .button-native{background:transparent}:host(.button-clear){--background-activated:transparent;--background-focused:var(--ion-color-primary, #3880ff);--background-hover:var(--ion-color-primary, #3880ff);--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04}:host(.button-round){--border-radius:64px;--padding-top:0;--padding-start:26px;--padding-end:26px;--padding-bottom:0}:host(.button-large){--padding-top:0;--padding-start:1em;--padding-end:1em;--padding-bottom:0;height:2.8em;font-size:20px}:host(.button-small){--padding-top:0;--padding-start:0.9em;--padding-end:0.9em;--padding-bottom:0;height:2.1em;font-size:13px}:host(.button-strong){font-weight:bold}::slotted(ion-icon[slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}:host(.button-solid.ion-color.ion-focused) .button-native::after{background:var(--ion-color-contrast)}:host(.button-clear.ion-color.ion-focused) .button-native::after,:host(.button-outline.ion-color.ion-focused) .button-native::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.button-solid.ion-color:hover) .button-native::after{background:var(--ion-color-contrast)}:host(.button-clear.ion-color:hover) .button-native::after,:host(.button-outline.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}";

const Button = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionFocus = createEvent(this, "ionFocus", 7);
    this.ionBlur = createEvent(this, "ionBlur", 7);
    this.inItem = false;
    this.inListHeader = false;
    this.inToolbar = false;
    this.inheritedAttributes = {};
    this.handleClick = (ev) => {
      const { el } = this;
      if (this.type === 'button') {
        openURL(this.href, ev, this.routerDirection, this.routerAnimation);
      }
      else if (hasShadowDom(el)) {
        // this button wants to specifically submit a form
        // climb up the dom to see if we're in a <form>
        // and if so, then use JS to submit it
        let formEl = this.findForm();
        const { form } = this;
        if (!formEl && form !== undefined) {
          /**
           * The developer specified a form selector for
           * the button to submit, but it was not found.
           */
          if (typeof form === 'string') {
            printIonWarning(`Form with selector: "#${form}" could not be found. Verify that the id is correct and the form is rendered in the DOM.`, el);
          }
          else {
            printIonWarning(`The provided "form" element is invalid. Verify that the form is a HTMLFormElement and rendered in the DOM.`, el);
          }
          return;
        }
        if (!formEl) {
          /**
           * If the form element is not set, the button may be inside
           * of a form element. Query the closest form element to the button.
           */
          formEl = el.closest('form');
        }
        if (formEl) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          formEl.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.color = undefined;
    this.buttonType = 'button';
    this.disabled = false;
    this.expand = undefined;
    this.fill = undefined;
    this.routerDirection = 'forward';
    this.routerAnimation = undefined;
    this.download = undefined;
    this.href = undefined;
    this.rel = undefined;
    this.shape = undefined;
    this.size = undefined;
    this.strong = false;
    this.target = undefined;
    this.type = 'button';
    this.form = undefined;
  }
  componentWillLoad() {
    this.inToolbar = !!this.el.closest('ion-buttons');
    this.inListHeader = !!this.el.closest('ion-list-header');
    this.inItem = !!this.el.closest('ion-item') || !!this.el.closest('ion-item-divider');
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }
  get hasIconOnly() {
    return !!this.el.querySelector('[slot="icon-only"]');
  }
  get rippleType() {
    const hasClearFill = this.fill === undefined || this.fill === 'clear';
    // If the button is in a toolbar, has a clear fill (which is the default)
    // and only has an icon we use the unbounded "circular" ripple effect
    if (hasClearFill && this.hasIconOnly && this.inToolbar) {
      return 'unbounded';
    }
    return 'bounded';
  }
  /**
   * Finds the form element based on the provided `form` selector
   * or element reference provided.
   */
  findForm() {
    const { form } = this;
    if (form instanceof HTMLFormElement) {
      return form;
    }
    if (typeof form === 'string') {
      const el = document.getElementById(form);
      if (el instanceof HTMLFormElement) {
        return el;
      }
    }
    return null;
  }
  render() {
    const mode = getIonMode$1(this);
    const { buttonType, type, disabled, rel, target, size, href, color, expand, hasIconOnly, shape, strong, inheritedAttributes, } = this;
    const finalSize = size === undefined && this.inItem ? 'small' : size;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        download: this.download,
        href,
        rel,
        target,
      };
    let fill = this.fill;
    /**
     * We check both undefined and null to
     * work around https://github.com/ionic-team/stencil/issues/3586.
     */
    if (fill == null) {
      fill = this.inToolbar || this.inListHeader ? 'clear' : 'solid';
    }
    return (h(Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: createColorClasses$1(color, {
        [mode]: true,
        [buttonType]: true,
        [`${buttonType}-${expand}`]: expand !== undefined,
        [`${buttonType}-${finalSize}`]: finalSize !== undefined,
        [`${buttonType}-${shape}`]: shape !== undefined,
        [`${buttonType}-${fill}`]: true,
        [`${buttonType}-strong`]: strong,
        'in-toolbar': hostContext('ion-toolbar', this.el),
        'in-toolbar-color': hostContext('ion-toolbar[color]', this.el),
        'in-buttons': hostContext('ion-buttons', this.el),
        'button-has-icon-only': hasIconOnly,
        'button-disabled': disabled,
        'ion-activatable': true,
        'ion-focusable': true,
      }) }, h(TagType, Object.assign({}, attrs, { class: "button-native", part: "native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }, inheritedAttributes), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })), mode === 'md' && h("ion-ripple-effect", { type: this.rippleType }))));
  }
  get el() { return getElement(this); }
};
Button.style = {
  ios: buttonIosCss,
  md: buttonMdCss
};

const buttonsIosCss = ".sc-ion-buttons-ios-h{display:flex;align-items:center;transform:translateZ(0);z-index:99}.sc-ion-buttons-ios-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-ios-s ion-button{--padding-start:5px;--padding-end:5px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;height:32px}.sc-ion-buttons-ios-s ion-button:not(.button-round){--border-radius:4px}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button{--color:initial;--border-color:initial;--background-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-solid,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-solid{--background:var(--ion-color-contrast);--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12;--background-hover:var(--ion-color-base);--background-hover-opacity:0.45;--color:var(--ion-color-base);--color-focused:var(--ion-color-base)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-clear,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-clear{--color-activated:var(--ion-color-contrast);--color-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-outline,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-outline{--color-activated:var(--ion-color-base);--color-focused:var(--ion-color-contrast);--background-activated:var(--ion-color-contrast)}.sc-ion-buttons-ios-s .button-clear,.sc-ion-buttons-ios-s .button-outline{--background-activated:transparent;--background-focused:currentColor;--background-hover:transparent}.sc-ion-buttons-ios-s .button-solid:not(.ion-color){--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12}.sc-ion-buttons-ios-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:24px;line-height:0.67}.sc-ion-buttons-ios-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-start:0.4em;margin-inline-start:0.4em;font-size:24px;line-height:0.67}.sc-ion-buttons-ios-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:28px;line-height:0.67}";

const buttonsMdCss = ".sc-ion-buttons-md-h{display:flex;align-items:center;transform:translateZ(0);z-index:99}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;--padding-start:8px;--padding-end:8px;--box-shadow:none;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;height:32px}.sc-ion-buttons-md-s ion-button:not(.button-round){--border-radius:2px}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button{--color:initial;--color-focused:var(--ion-color-contrast);--color-hover:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-contrast);--background-hover:var(--ion-color-contrast)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-solid,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-solid{--background:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-shade);--background-hover:var(--ion-color-base);--color:var(--ion-color-base);--color-focused:var(--ion-color-base);--color-hover:var(--ion-color-base)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-outline,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-outline{--border-color:var(--ion-color-contrast)}.sc-ion-buttons-md-s .button-has-icon-only.button-clear{--padding-top:12px;--padding-end:12px;--padding-bottom:12px;--padding-start:12px;--border-radius:50%;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:48px;height:48px}.sc-ion-buttons-md-s .button{--background-hover:currentColor}.sc-ion-buttons-md-s .button-solid{--color:var(--ion-toolbar-background, var(--ion-background-color, #fff));--background:var(--ion-toolbar-color, var(--ion-text-color, #424242));--background-activated:transparent;--background-focused:currentColor}.sc-ion-buttons-md-s .button-outline{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--border-color:currentColor}.sc-ion-buttons-md-s .button-clear{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor}.sc-ion-buttons-md-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:1.4em}.sc-ion-buttons-md-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-start:0.4em;margin-inline-start:0.4em;font-size:1.4em}.sc-ion-buttons-md-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.8em}";

const Buttons = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.collapse = false;
  }
  render() {
    const mode = getIonMode$1(this);
    return (h(Host, { class: {
        [mode]: true,
        ['buttons-collapse']: this.collapse,
      } }));
  }
};
Buttons.style = {
  ios: buttonsIosCss,
  md: buttonsMdCss
};

const contentCss = ":host{--background:var(--ion-background-color, #fff);--color:var(--ion-text-color, #000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;flex:1;width:100%;height:100%;margin:0 !important;padding:0 !important;font-family:var(--ion-font-family, inherit);contain:size style}:host(.ion-color) .inner-scroll{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.outer-content){--background:var(--ion-color-step-50, #f2f2f2)}#background-content{left:0px;right:0px;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);position:absolute;background:var(--background)}.inner-scroll{left:0px;right:0px;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:calc(var(--padding-top) + var(--offset-top));padding-bottom:calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom));position:absolute;color:var(--color);box-sizing:border-box;overflow:hidden;touch-action:pan-x pan-y pinch-zoom}.scroll-y,.scroll-x{-webkit-overflow-scrolling:touch;z-index:0;will-change:scroll-position}.scroll-y{overflow-y:var(--overflow);overscroll-behavior-y:contain}.scroll-x{overflow-x:var(--overflow);overscroll-behavior-x:contain}.overscroll::before,.overscroll::after{position:absolute;width:1px;height:1px;content:\"\"}.overscroll::before{bottom:-1px}.overscroll::after{top:-1px}:host(.content-sizing){display:flex;flex-direction:column;min-height:0;contain:none}:host(.content-sizing) .inner-scroll{position:relative;top:0;bottom:0;margin-top:calc(var(--offset-top) * -1);margin-bottom:calc(var(--offset-bottom) * -1)}.transition-effect{display:none;position:absolute;width:100%;height:100vh;opacity:0;pointer-events:none}:host(.content-ltr) .transition-effect{left:-100%;}:host(.content-rtl) .transition-effect{right:-100%;}.transition-cover{position:absolute;right:0;width:100%;height:100%;background:black;opacity:0.1}.transition-shadow{display:block;position:absolute;width:100%;height:100%;box-shadow:inset -9px 0 9px 0 rgba(0, 0, 100, 0.03)}:host(.content-ltr) .transition-shadow{right:0;}:host(.content-rtl) .transition-shadow{left:0;transform:scaleX(-1)}::slotted([slot=fixed]){position:absolute;transform:translateZ(0)}";

const Content = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionScrollStart = createEvent(this, "ionScrollStart", 7);
    this.ionScroll = createEvent(this, "ionScroll", 7);
    this.ionScrollEnd = createEvent(this, "ionScrollEnd", 7);
    this.watchDog = null;
    this.isScrolling = false;
    this.lastScroll = 0;
    this.queued = false;
    this.cTop = -1;
    this.cBottom = -1;
    this.isMainContent = true;
    this.resizeTimeout = null;
    // Detail is used in a hot loop in the scroll event, by allocating it here
    // V8 will be able to inline any read/write to it since it's a monomorphic class.
    // https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
    this.detail = {
      scrollTop: 0,
      scrollLeft: 0,
      type: 'scroll',
      event: undefined,
      startX: 0,
      startY: 0,
      startTime: 0,
      currentX: 0,
      currentY: 0,
      velocityX: 0,
      velocityY: 0,
      deltaX: 0,
      deltaY: 0,
      currentTime: 0,
      data: undefined,
      isScrolling: true,
    };
    this.color = undefined;
    this.fullscreen = false;
    this.forceOverscroll = undefined;
    this.scrollX = false;
    this.scrollY = true;
    this.scrollEvents = false;
  }
  connectedCallback() {
    this.isMainContent = this.el.closest('ion-menu, ion-popover, ion-modal') === null;
  }
  disconnectedCallback() {
    this.onScrollEnd();
  }
  onAppLoad() {
    this.resize();
  }
  /**
   * Rotating certain devices can update
   * the safe area insets. As a result,
   * the fullscreen feature on ion-content
   * needs to be recalculated.
   *
   * We listen for "resize" because we
   * do not care what the orientation of
   * the device is. Other APIs
   * such as ScreenOrientation or
   * the deviceorientation event must have
   * permission from the user first whereas
   * the "resize" event does not.
   *
   * We also throttle the callback to minimize
   * thrashing when quickly resizing a window.
   */
  onResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
    this.resizeTimeout = setTimeout(() => {
      /**
       * Resize should only happen
       * if the content is visible.
       * When the content is hidden
       * then offsetParent will be null.
       */
      if (this.el.offsetParent === null) {
        return;
      }
      this.resize();
    }, 100);
  }
  shouldForceOverscroll() {
    const { forceOverscroll } = this;
    const mode = getIonMode$1(this);
    return forceOverscroll === undefined ? mode === 'ios' && isPlatform('ios') : forceOverscroll;
  }
  resize() {
    /**
     * Only force update if the component is rendered in a browser context.
     * Using `forceUpdate` in a server context with pre-rendering can lead to an infinite loop.
     * The `hydrateDocument` function in `@stencil/core` will render the `ion-content`, but
     * `forceUpdate` will trigger another render, locking up the server.
     *
     * TODO: Remove if STENCIL-834 determines Stencil will account for this.
     */
    {
      if (this.fullscreen) {
        readTask(() => this.readDimensions());
      }
      else if (this.cTop !== 0 || this.cBottom !== 0) {
        this.cTop = this.cBottom = 0;
        forceUpdate(this);
      }
    }
  }
  readDimensions() {
    const page = getPageElement(this.el);
    const top = Math.max(this.el.offsetTop, 0);
    const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
    const dirty = top !== this.cTop || bottom !== this.cBottom;
    if (dirty) {
      this.cTop = top;
      this.cBottom = bottom;
      forceUpdate(this);
    }
  }
  onScroll(ev) {
    const timeStamp = Date.now();
    const shouldStart = !this.isScrolling;
    this.lastScroll = timeStamp;
    if (shouldStart) {
      this.onScrollStart();
    }
    if (!this.queued && this.scrollEvents) {
      this.queued = true;
      readTask((ts) => {
        this.queued = false;
        this.detail.event = ev;
        updateScrollDetail(this.detail, this.scrollEl, ts, shouldStart);
        this.ionScroll.emit(this.detail);
      });
    }
  }
  /**
   * Get the element where the actual scrolling takes place.
   * This element can be used to subscribe to `scroll` events or manually modify
   * `scrollTop`. However, it's recommended to use the API provided by `ion-content`:
   *
   * i.e. Using `ionScroll`, `ionScrollStart`, `ionScrollEnd` for scrolling events
   * and `scrollToPoint()` to scroll the content into a certain point.
   */
  async getScrollElement() {
    /**
     * If this gets called in certain early lifecycle hooks (ex: Vue onMounted),
     * scrollEl won't be defined yet with the custom elements build, so wait for it to load in.
     */
    if (!this.scrollEl) {
      await new Promise((resolve) => componentOnReady(this.el, resolve));
    }
    return Promise.resolve(this.scrollEl);
  }
  /**
   * Returns the background content element.
   * @internal
   */
  async getBackgroundElement() {
    if (!this.backgroundContentEl) {
      await new Promise((resolve) => componentOnReady(this.el, resolve));
    }
    return Promise.resolve(this.backgroundContentEl);
  }
  /**
   * Scroll to the top of the component.
   *
   * @param duration The amount of time to take scrolling to the top. Defaults to `0`.
   */
  scrollToTop(duration = 0) {
    return this.scrollToPoint(undefined, 0, duration);
  }
  /**
   * Scroll to the bottom of the component.
   *
   * @param duration The amount of time to take scrolling to the bottom. Defaults to `0`.
   */
  async scrollToBottom(duration = 0) {
    const scrollEl = await this.getScrollElement();
    const y = scrollEl.scrollHeight - scrollEl.clientHeight;
    return this.scrollToPoint(undefined, y, duration);
  }
  /**
   * Scroll by a specified X/Y distance in the component.
   *
   * @param x The amount to scroll by on the horizontal axis.
   * @param y The amount to scroll by on the vertical axis.
   * @param duration The amount of time to take scrolling by that amount.
   */
  async scrollByPoint(x, y, duration) {
    const scrollEl = await this.getScrollElement();
    return this.scrollToPoint(x + scrollEl.scrollLeft, y + scrollEl.scrollTop, duration);
  }
  /**
   * Scroll to a specified X/Y location in the component.
   *
   * @param x The point to scroll to on the horizontal axis.
   * @param y The point to scroll to on the vertical axis.
   * @param duration The amount of time to take scrolling to that point. Defaults to `0`.
   */
  async scrollToPoint(x, y, duration = 0) {
    const el = await this.getScrollElement();
    if (duration < 32) {
      if (y != null) {
        el.scrollTop = y;
      }
      if (x != null) {
        el.scrollLeft = x;
      }
      return;
    }
    let resolve;
    let startTime = 0;
    const promise = new Promise((r) => (resolve = r));
    const fromY = el.scrollTop;
    const fromX = el.scrollLeft;
    const deltaY = y != null ? y - fromY : 0;
    const deltaX = x != null ? x - fromX : 0;
    // scroll loop
    const step = (timeStamp) => {
      const linearTime = Math.min(1, (timeStamp - startTime) / duration) - 1;
      const easedT = Math.pow(linearTime, 3) + 1;
      if (deltaY !== 0) {
        el.scrollTop = Math.floor(easedT * deltaY + fromY);
      }
      if (deltaX !== 0) {
        el.scrollLeft = Math.floor(easedT * deltaX + fromX);
      }
      if (easedT < 1) {
        // do not use DomController here
        // must use nativeRaf in order to fire in the next frame
        requestAnimationFrame(step);
      }
      else {
        resolve();
      }
    };
    // chill out for a frame first
    requestAnimationFrame((ts) => {
      startTime = ts;
      step(ts);
    });
    return promise;
  }
  onScrollStart() {
    this.isScrolling = true;
    this.ionScrollStart.emit({
      isScrolling: true,
    });
    if (this.watchDog) {
      clearInterval(this.watchDog);
    }
    // watchdog
    this.watchDog = setInterval(() => {
      if (this.lastScroll < Date.now() - 120) {
        this.onScrollEnd();
      }
    }, 100);
  }
  onScrollEnd() {
    if (this.watchDog)
      clearInterval(this.watchDog);
    this.watchDog = null;
    if (this.isScrolling) {
      this.isScrolling = false;
      this.ionScrollEnd.emit({
        isScrolling: false,
      });
    }
  }
  render() {
    const { isMainContent, scrollX, scrollY, el } = this;
    const rtl = isRTL$1(el) ? 'rtl' : 'ltr';
    const mode = getIonMode$1(this);
    const forceOverscroll = this.shouldForceOverscroll();
    const transitionShadow = mode === 'ios';
    const TagType = isMainContent ? 'main' : 'div';
    this.resize();
    return (h(Host, { class: createColorClasses$1(this.color, {
        [mode]: true,
        'content-sizing': hostContext('ion-popover', this.el),
        overscroll: forceOverscroll,
        [`content-${rtl}`]: true,
      }), style: {
        '--offset-top': `${this.cTop}px`,
        '--offset-bottom': `${this.cBottom}px`,
      } }, h("div", { ref: (el) => (this.backgroundContentEl = el), id: "background-content", part: "background" }), h(TagType, { class: {
        'inner-scroll': true,
        'scroll-x': scrollX,
        'scroll-y': scrollY,
        overscroll: (scrollX || scrollY) && forceOverscroll,
      }, ref: (scrollEl) => (this.scrollEl = scrollEl), onScroll: this.scrollEvents ? (ev) => this.onScroll(ev) : undefined, part: "scroll" }, h("slot", null)), transitionShadow ? (h("div", { class: "transition-effect" }, h("div", { class: "transition-cover" }), h("div", { class: "transition-shadow" }))) : null, h("slot", { name: "fixed" })));
  }
  get el() { return getElement(this); }
};
const getParentElement = (el) => {
  var _a;
  if (el.parentElement) {
    // normal element with a parent element
    return el.parentElement;
  }
  if ((_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.host) {
    // shadow dom's document fragment
    return el.parentNode.host;
  }
  return null;
};
const getPageElement = (el) => {
  const tabs = el.closest('ion-tabs');
  if (tabs) {
    return tabs;
  }
  /**
   * If we're in a popover, we need to use its wrapper so we can account for space
   * between the popover and the edges of the screen. But if the popover contains
   * its own page element, we should use that instead.
   */
  const page = el.closest('ion-app, ion-page, .ion-page, page-inner, .popover-content');
  if (page) {
    return page;
  }
  return getParentElement(el);
};
// ******** DOM READ ****************
const updateScrollDetail = (detail, el, timestamp, shouldStart) => {
  const prevX = detail.currentX;
  const prevY = detail.currentY;
  const prevT = detail.currentTime;
  const currentX = el.scrollLeft;
  const currentY = el.scrollTop;
  const timeDelta = timestamp - prevT;
  if (shouldStart) {
    // remember the start positions
    detail.startTime = timestamp;
    detail.startX = currentX;
    detail.startY = currentY;
    detail.velocityX = detail.velocityY = 0;
  }
  detail.currentTime = timestamp;
  detail.currentX = detail.scrollLeft = currentX;
  detail.currentY = detail.scrollTop = currentY;
  detail.deltaX = currentX - detail.startX;
  detail.deltaY = currentY - detail.startY;
  if (timeDelta > 0 && timeDelta < 100) {
    const velocityX = (currentX - prevX) / timeDelta;
    const velocityY = (currentY - prevY) / timeDelta;
    detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
    detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
  }
};
Content.style = contentCss;

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const isYearDisabled = (refYear, minParts, maxParts) => {
  if (minParts && minParts.year > refYear) {
    return true;
  }
  if (maxParts && maxParts.year < refYear) {
    return true;
  }
  return false;
};
/**
 * Returns true if a given day should
 * not be interactive according to its value,
 * or the max/min dates.
 */
const isDayDisabled = (refParts, minParts, maxParts, dayValues) => {
  /**
   * If this is a filler date (i.e. padding)
   * then the date is disabled.
   */
  if (refParts.day === null) {
    return true;
  }
  /**
   * If user passed in a list of acceptable day values
   * check to make sure that the date we are looking
   * at is in this array.
   */
  if (dayValues !== undefined && !dayValues.includes(refParts.day)) {
    return true;
  }
  /**
   * Given a min date, perform the following
   * checks. If any of them are true, then the
   * day should be disabled:
   * 1. Is the current year < the min allowed year?
   * 2. Is the current year === min allowed year,
   * but the current month < the min allowed month?
   * 3. Is the current year === min allowed year, the
   * current month === min allow month, but the current
   * day < the min allowed day?
   */
  if (minParts && isBefore(refParts, minParts)) {
    return true;
  }
  /**
   * Given a max date, perform the following
   * checks. If any of them are true, then the
   * day should be disabled:
   * 1. Is the current year > the max allowed year?
   * 2. Is the current year === max allowed year,
   * but the current month > the max allowed month?
   * 3. Is the current year === max allowed year, the
   * current month === max allow month, but the current
   * day > the max allowed day?
   */
  if (maxParts && isAfter(refParts, maxParts)) {
    return true;
  }
  /**
   * If none of these checks
   * passed then the date should
   * be interactive.
   */
  return false;
};
/**
 * Given a locale, a date, the selected date(s), and today's date,
 * generate the state for a given calendar day button.
 */
const getCalendarDayState = (locale, refParts, activeParts, todayParts, minParts, maxParts, dayValues) => {
  /**
   * activeParts signals what day(s) are currently selected in the datetime.
   * If multiple="true", this will be an array, but the logic in this util
   * is the same whether we have one selected day or many because we're only
   * calculating the state for one button. So, we treat a single activeParts value
   * the same as an array of length one.
   */
  const activePartsArray = Array.isArray(activeParts) ? activeParts : [activeParts];
  /**
   * The day button is active if it is selected, or in other words, if refParts
   * matches at least one selected date.
   */
  const isActive = activePartsArray.find((parts) => isSameDay(refParts, parts)) !== undefined;
  const isToday = isSameDay(refParts, todayParts);
  const disabled = isDayDisabled(refParts, minParts, maxParts, dayValues);
  /**
   * Note that we always return one object regardless of whether activeParts
   * was an array, since we pare down to one value for isActive.
   */
  return {
    disabled,
    isActive,
    isToday,
    ariaSelected: isActive ? 'true' : null,
    ariaLabel: generateDayAriaLabel(locale, isToday, refParts),
    text: refParts.day != null ? getDay(locale, refParts) : null,
  };
};
/**
 * Returns `true` if the month is disabled given the
 * current date value and min/max date constraints.
 */
const isMonthDisabled = (refParts, { minParts, maxParts, }) => {
  // If the year is disabled then the month is disabled.
  if (isYearDisabled(refParts.year, minParts, maxParts)) {
    return true;
  }
  // If the date value is before the min date, then the month is disabled.
  // If the date value is after the max date, then the month is disabled.
  if ((minParts && isBefore(refParts, minParts)) || (maxParts && isAfter(refParts, maxParts))) {
    return true;
  }
  return false;
};
/**
 * Given a working date, an optional minimum date range,
 * and an optional maximum date range; determine if the
 * previous navigation button is disabled.
 */
const isPrevMonthDisabled = (refParts, minParts, maxParts) => {
  const prevMonth = Object.assign(Object.assign({}, getPreviousMonth(refParts)), { day: null });
  return isMonthDisabled(prevMonth, {
    minParts,
    maxParts,
  });
};
/**
 * Given a working date and a maximum date range,
 * determine if the next navigation button is disabled.
 */
const isNextMonthDisabled = (refParts, maxParts) => {
  const nextMonth = Object.assign(Object.assign({}, getNextMonth(refParts)), { day: null });
  return isMonthDisabled(nextMonth, {
    maxParts,
  });
};
/**
 * Given the value of the highlightedDates property
 * and an ISO string, return the styles to use for
 * that date, or undefined if none are found.
 */
const getHighlightStyles = (highlightedDates, dateIsoString, el) => {
  if (Array.isArray(highlightedDates)) {
    const dateStringWithoutTime = dateIsoString.split('T')[0];
    const matchingHighlight = highlightedDates.find((hd) => hd.date === dateStringWithoutTime);
    if (matchingHighlight) {
      return {
        textColor: matchingHighlight.textColor,
        backgroundColor: matchingHighlight.backgroundColor,
      };
    }
  }
  else {
    /**
     * Wrap in a try-catch to prevent exceptions in the user's function
     * from interrupting the calendar's rendering.
     */
    try {
      return highlightedDates(dateIsoString);
    }
    catch (e) {
      printIonError('Exception thrown from provided `highlightedDates` callback. Please check your function and try again.', el, e);
    }
  }
  return undefined;
};

const datetimeIosCss = ":host{display:flex;flex-flow:column;background:var(--background);overflow:hidden}ion-picker-column-internal{min-width:26px}:host(.datetime-size-fixed){width:auto;height:auto}:host(.datetime-size-fixed:not(.datetime-prefer-wheel)){max-width:350px}:host(.datetime-size-fixed.datetime-prefer-wheel){min-width:350px;max-width:max-content}:host(.datetime-size-cover){width:100%}:host .calendar-body,:host .datetime-year{opacity:0}:host(:not(.datetime-ready)) .datetime-year{position:absolute;pointer-events:none}:host(.datetime-ready) .calendar-body{opacity:1}:host(.datetime-ready) .datetime-year{display:none;opacity:1}:host .wheel-order-year-first .day-column{order:3;text-align:end}:host .wheel-order-year-first .month-column{order:2;text-align:end}:host .wheel-order-year-first .year-column{order:1;text-align:start}:host .datetime-calendar,:host .datetime-year{display:flex;flex:1 1 auto;flex-flow:column}:host(.show-month-and-year) .datetime-year{display:flex}@supports (background: -webkit-named-image(apple-pay-logo-black)) and (not (aspect-ratio: 1/1)){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{position:absolute;visibility:hidden;pointer-events:none}@supports (inset-inline-start: 0){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{inset-inline-start:-99999px}}@supports not (inset-inline-start: 0){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{left:-99999px}:host-context([dir=rtl]):host(.show-month-and-year) .calendar-next-prev,:host-context([dir=rtl]).show-month-and-year .calendar-next-prev,:host-context([dir=rtl]):host(.show-month-and-year) .calendar-days-of-week,:host-context([dir=rtl]).show-month-and-year .calendar-days-of-week,:host-context([dir=rtl]):host(.show-month-and-year) .calendar-body,:host-context([dir=rtl]).show-month-and-year .calendar-body,:host-context([dir=rtl]):host(.show-month-and-year) .datetime-time,:host-context([dir=rtl]).show-month-and-year .datetime-time{left:unset;right:unset;right:-99999px}@supports selector(:dir(rtl)){:host(.show-month-and-year) .calendar-next-prev:dir(rtl),:host(.show-month-and-year) .calendar-days-of-week:dir(rtl),:host(.show-month-and-year) .calendar-body:dir(rtl),:host(.show-month-and-year) .datetime-time:dir(rtl){left:unset;right:unset;right:-99999px}}}}@supports (not (background: -webkit-named-image(apple-pay-logo-black))) or ((background: -webkit-named-image(apple-pay-logo-black)) and (aspect-ratio: 1/1)){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{display:none}}:host(.month-year-picker-open) .datetime-footer{display:none}:host(.datetime-readonly),:host(.datetime-disabled){pointer-events:none}:host(.datetime-disabled){opacity:0.4}:host .datetime-header .datetime-title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host .datetime-action-buttons.has-clear-button{width:100%}:host .datetime-action-buttons ion-buttons{display:flex;justify-content:space-between}:host .calendar-action-buttons{display:flex;justify-content:space-between}:host .calendar-action-buttons ion-item,:host .calendar-action-buttons ion-button{--background:translucent}:host .calendar-action-buttons ion-item ion-label{display:flex;align-items:center}:host .calendar-action-buttons ion-item ion-icon{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:0;padding-inline-end:0;padding-top:0;padding-bottom:0}:host .calendar-days-of-week{display:grid;grid-template-columns:repeat(7, 1fr);text-align:center}:host .calendar-body{display:flex;flex-grow:1;scroll-snap-type:x mandatory;overflow-x:scroll;overflow-y:hidden;scrollbar-width:none;outline:none}:host .calendar-body .calendar-month{scroll-snap-align:start;scroll-snap-stop:always;flex-shrink:0;width:100%}:host .calendar-body .calendar-month-disabled{scroll-snap-align:none}:host .calendar-body::-webkit-scrollbar{display:none}:host .calendar-body .calendar-month-grid{display:grid;grid-template-columns:repeat(7, 1fr)}:host .calendar-day{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:0px;padding-bottom:0px;-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:0px;margin-bottom:0px;display:flex;position:relative;align-items:center;justify-content:center;border:none;outline:none;background:none;color:currentColor;font-family:var(--ion-font-family, inherit);cursor:pointer;appearance:none;z-index:0}:host .calendar-day[disabled]{pointer-events:none;opacity:0.4}.calendar-day-highlight{border-radius:32px;-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:32px;height:32px;z-index:-1}:host .datetime-time{display:flex;justify-content:space-between}:host(.datetime-presentation-time) .datetime-time{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}:host ion-popover{--height:200px}:host .time-header{display:flex;align-items:center}:host .time-body{border-radius:8px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px;display:flex;border:none;background:var(--ion-color-step-300, #edeef0);color:var(--ion-text-color, #000);font-family:inherit;font-size:inherit;cursor:pointer;appearance:none}:host .time-body-active{color:var(--ion-color-base)}:host(.in-item){position:static}:host(.show-month-and-year) .calendar-action-buttons ion-item{--color:var(--ion-color-base)}:host{--background:var(--ion-color-light, #ffffff);--background-rgb:var(--ion-color-light-rgb);--title-color:var(--ion-color-step-600, #666666)}:host(.datetime-presentation-date-time:not(.datetime-prefer-wheel)),:host(.datetime-presentation-time-date:not(.datetime-prefer-wheel)),:host(.datetime-presentation-date:not(.datetime-prefer-wheel)){min-height:350px}:host .datetime-header{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:16px;padding-bottom:16px;border-bottom:0.55px solid var(--ion-color-step-200, #cccccc);font-size:14px}:host .datetime-header .datetime-title{color:var(--title-color)}:host .datetime-header .datetime-selected-date{margin-top:10px}:host .calendar-action-buttons ion-item{--padding-start:16px;--background-hover:transparent;--background-activated:transparent;font-size:16px;font-weight:600}:host .calendar-action-buttons ion-item ion-icon,:host .calendar-action-buttons ion-buttons ion-button{color:var(--ion-color-base)}:host .calendar-action-buttons ion-buttons{padding-left:0;padding-right:0;padding-top:8px;padding-bottom:0}:host .calendar-action-buttons ion-buttons ion-button{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}:host .calendar-days-of-week{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:0;padding-bottom:0;color:var(--ion-color-step-300, #b3b3b3);font-size:12px;font-weight:600;line-height:24px;text-transform:uppercase}:host .calendar-body .calendar-month .calendar-month-grid{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;height:calc(100% - 16px)}:host .calendar-day{font-size:20px}.calendar-day:focus .calendar-day-highlight,.calendar-day.calendar-day-active .calendar-day-highlight{opacity:0.2}.calendar-day.calendar-day-active .calendar-day-highlight{background:var(--ion-color-base)}.calendar-day:focus .calendar-day-highlight{background:var(--ion-color-base) !important}:host .calendar-day.calendar-day-today{color:var(--ion-color-base)}:host .calendar-day.calendar-day-active{color:var(--ion-color-base);font-weight:600}:host .calendar-day.calendar-day-today.calendar-day-active{color:var(--ion-color-contrast)}.calendar-day.calendar-day-today.calendar-day-active .calendar-day-highlight{background:var(--ion-color-base);opacity:1}:host .datetime-time{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:8px;padding-bottom:16px;font-size:16px}:host .datetime-time .time-header{font-weight:600}:host .datetime-buttons{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;border-top:0.55px solid var(--ion-color-step-200, #cccccc)}:host .datetime-buttons ::slotted(ion-buttons),:host .datetime-buttons ion-buttons{display:flex;align-items:center;justify-content:space-between}:host .datetime-action-buttons{width:100%}";

const datetimeMdCss = ":host{display:flex;flex-flow:column;background:var(--background);overflow:hidden}ion-picker-column-internal{min-width:26px}:host(.datetime-size-fixed){width:auto;height:auto}:host(.datetime-size-fixed:not(.datetime-prefer-wheel)){max-width:350px}:host(.datetime-size-fixed.datetime-prefer-wheel){min-width:350px;max-width:max-content}:host(.datetime-size-cover){width:100%}:host .calendar-body,:host .datetime-year{opacity:0}:host(:not(.datetime-ready)) .datetime-year{position:absolute;pointer-events:none}:host(.datetime-ready) .calendar-body{opacity:1}:host(.datetime-ready) .datetime-year{display:none;opacity:1}:host .wheel-order-year-first .day-column{order:3;text-align:end}:host .wheel-order-year-first .month-column{order:2;text-align:end}:host .wheel-order-year-first .year-column{order:1;text-align:start}:host .datetime-calendar,:host .datetime-year{display:flex;flex:1 1 auto;flex-flow:column}:host(.show-month-and-year) .datetime-year{display:flex}@supports (background: -webkit-named-image(apple-pay-logo-black)) and (not (aspect-ratio: 1/1)){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{position:absolute;visibility:hidden;pointer-events:none}@supports (inset-inline-start: 0){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{inset-inline-start:-99999px}}@supports not (inset-inline-start: 0){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{left:-99999px}:host-context([dir=rtl]):host(.show-month-and-year) .calendar-next-prev,:host-context([dir=rtl]).show-month-and-year .calendar-next-prev,:host-context([dir=rtl]):host(.show-month-and-year) .calendar-days-of-week,:host-context([dir=rtl]).show-month-and-year .calendar-days-of-week,:host-context([dir=rtl]):host(.show-month-and-year) .calendar-body,:host-context([dir=rtl]).show-month-and-year .calendar-body,:host-context([dir=rtl]):host(.show-month-and-year) .datetime-time,:host-context([dir=rtl]).show-month-and-year .datetime-time{left:unset;right:unset;right:-99999px}@supports selector(:dir(rtl)){:host(.show-month-and-year) .calendar-next-prev:dir(rtl),:host(.show-month-and-year) .calendar-days-of-week:dir(rtl),:host(.show-month-and-year) .calendar-body:dir(rtl),:host(.show-month-and-year) .datetime-time:dir(rtl){left:unset;right:unset;right:-99999px}}}}@supports (not (background: -webkit-named-image(apple-pay-logo-black))) or ((background: -webkit-named-image(apple-pay-logo-black)) and (aspect-ratio: 1/1)){:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{display:none}}:host(.month-year-picker-open) .datetime-footer{display:none}:host(.datetime-readonly),:host(.datetime-disabled){pointer-events:none}:host(.datetime-disabled){opacity:0.4}:host .datetime-header .datetime-title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host .datetime-action-buttons.has-clear-button{width:100%}:host .datetime-action-buttons ion-buttons{display:flex;justify-content:space-between}:host .calendar-action-buttons{display:flex;justify-content:space-between}:host .calendar-action-buttons ion-item,:host .calendar-action-buttons ion-button{--background:translucent}:host .calendar-action-buttons ion-item ion-label{display:flex;align-items:center}:host .calendar-action-buttons ion-item ion-icon{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:0;padding-inline-end:0;padding-top:0;padding-bottom:0}:host .calendar-days-of-week{display:grid;grid-template-columns:repeat(7, 1fr);text-align:center}:host .calendar-body{display:flex;flex-grow:1;scroll-snap-type:x mandatory;overflow-x:scroll;overflow-y:hidden;scrollbar-width:none;outline:none}:host .calendar-body .calendar-month{scroll-snap-align:start;scroll-snap-stop:always;flex-shrink:0;width:100%}:host .calendar-body .calendar-month-disabled{scroll-snap-align:none}:host .calendar-body::-webkit-scrollbar{display:none}:host .calendar-body .calendar-month-grid{display:grid;grid-template-columns:repeat(7, 1fr)}:host .calendar-day{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:0px;padding-bottom:0px;-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:0px;margin-bottom:0px;display:flex;position:relative;align-items:center;justify-content:center;border:none;outline:none;background:none;color:currentColor;font-family:var(--ion-font-family, inherit);cursor:pointer;appearance:none;z-index:0}:host .calendar-day[disabled]{pointer-events:none;opacity:0.4}.calendar-day-highlight{border-radius:32px;-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:32px;height:32px;z-index:-1}:host .datetime-time{display:flex;justify-content:space-between}:host(.datetime-presentation-time) .datetime-time{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}:host ion-popover{--height:200px}:host .time-header{display:flex;align-items:center}:host .time-body{border-radius:8px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px;display:flex;border:none;background:var(--ion-color-step-300, #edeef0);color:var(--ion-text-color, #000);font-family:inherit;font-size:inherit;cursor:pointer;appearance:none}:host .time-body-active{color:var(--ion-color-base)}:host(.in-item){position:static}:host(.show-month-and-year) .calendar-action-buttons ion-item{--color:var(--ion-color-base)}:host{--background:var(--ion-color-step-100, #ffffff);--title-color:var(--ion-color-contrast)}:host .datetime-header{-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px;padding-top:20px;padding-bottom:20px;background:var(--ion-color-base);color:var(--title-color)}:host .datetime-header .datetime-title{font-size:12px;text-transform:uppercase}:host .datetime-header .datetime-selected-date{margin-top:30px;font-size:34px}:host .datetime-calendar .calendar-action-buttons ion-item{--padding-start:20px}:host .calendar-action-buttons ion-item,:host .calendar-action-buttons ion-button{color:var(--ion-color-step-650, #595959)}:host .calendar-days-of-week{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:0px;padding-bottom:0px;color:var(--ion-color-step-500, gray);font-size:14px;line-height:36px}:host .calendar-body .calendar-month .calendar-month-grid{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:4px;padding-bottom:4px;grid-template-rows:repeat(6, 1fr)}:host .calendar-day{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0;padding-inline-end:0;padding-top:13px;padding-bottom:13px;font-size:14px}.calendar-day:focus .calendar-day-highlight{background:rgba(var(--ion-color-base-rgb), 0.2);box-shadow:0px 0px 0px 4px rgba(var(--ion-color-base-rgb), 0.2)}:host .calendar-day.calendar-day-today{color:var(--ion-color-base)}.calendar-day.calendar-day-today .calendar-day-highlight{border:1px solid var(--ion-color-base)}:host .calendar-day.calendar-day-active{color:var(--ion-color-contrast)}.calendar-day.calendar-day-active .calendar-day-highlight{border:1px solid var(--ion-color-base);background:var(--ion-color-base)}:host .datetime-time{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:8px;padding-bottom:8px}:host .time-header{color:var(--ion-color-step-650, #595959)}:host(.datetime-presentation-month) .datetime-year,:host(.datetime-presentation-year) .datetime-year,:host(.datetime-presentation-month-year) .datetime-year{margin-top:20px;margin-bottom:20px}:host .datetime-buttons{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:10px;padding-bottom:10px;display:flex;align-items:center;justify-content:flex-end}:host .datetime-view-buttons ion-button{color:var(--ion-color-step-800, #333333)}";

const Datetime = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionCancel = createEvent(this, "ionCancel", 7);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.ionValueChange = createEvent(this, "ionValueChange", 7);
    this.ionFocus = createEvent(this, "ionFocus", 7);
    this.ionBlur = createEvent(this, "ionBlur", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.ionRender = createEvent(this, "ionRender", 7);
    this.inputId = `ion-dt-${datetimeIds++}`;
    this.prevPresentation = null;
    /**
     * Duplicate reference to `activeParts` that does not trigger a re-render of the component.
     * Allows caching an instance of the `activeParts` in between render cycles.
     */
    this.activePartsClone = [];
    this.warnIfIncorrectValueUsage = () => {
      const { multiple, value } = this;
      if (!multiple && Array.isArray(value)) {
        /**
         * We do some processing on the `value` array so
         * that it looks more like an array when logged to
         * the console.
         * Example given ['a', 'b']
         * Default toString() behavior: a,b
         * Custom behavior: ['a', 'b']
         */
        printIonWarning(`ion-datetime was passed an array of values, but multiple="false". This is incorrect usage and may result in unexpected behaviors. To dismiss this warning, pass a string to the "value" property when multiple="false".

  Value Passed: [${value.map((v) => `'${v}'`).join(', ')}]
`, this.el);
      }
    };
    this.setValue = (value) => {
      this.value = value;
      this.ionChange.emit({ value });
    };
    /**
     * Returns the DatetimePart interface
     * to use when rendering an initial set of
     * data. This should be used when rendering an
     * interface in an environment where the `value`
     * may not be set. This function works
     * by returning the first selected date in
     * "activePartsClone" and then falling back to
     * defaultParts if no active date is selected.
     */
    this.getActivePartsWithFallback = () => {
      var _a;
      const { defaultParts } = this;
      return (_a = this.getActivePart()) !== null && _a !== void 0 ? _a : defaultParts;
    };
    this.getActivePart = () => {
      const { activePartsClone } = this;
      return Array.isArray(activePartsClone) ? activePartsClone[0] : activePartsClone;
    };
    this.closeParentOverlay = () => {
      const popoverOrModal = this.el.closest('ion-modal, ion-popover');
      if (popoverOrModal) {
        popoverOrModal.dismiss();
      }
    };
    this.setWorkingParts = (parts) => {
      this.workingParts = Object.assign({}, parts);
    };
    this.setActiveParts = (parts, removeDate = false) => {
      const { multiple, minParts, maxParts, activePartsClone } = this;
      /**
       * When setting the active parts, it is possible
       * to set invalid data. For example,
       * when updating January 31 to February,
       * February 31 does not exist. As a result
       * we need to validate the active parts and
       * ensure that we are only setting valid dates.
       * Additionally, we need to update the working parts
       * too in the event that the validated parts are different.
       */
      const validatedParts = validateParts(parts, minParts, maxParts);
      this.setWorkingParts(validatedParts);
      if (multiple) {
        /**
         * We read from activePartsClone here because valueChanged() only updates that,
         * so it's the more reliable source of truth. If we read from activeParts, then
         * if you click July 1, manually set the value to July 2, and then click July 3,
         * the new value would be [July 1, July 3], ignoring the value set.
         *
         * We can then pass the new value to activeParts (rather than activePartsClone)
         * since the clone will be updated automatically by activePartsChanged().
         */
        const activePartsArray = Array.isArray(activePartsClone) ? activePartsClone : [activePartsClone];
        if (removeDate) {
          this.activeParts = activePartsArray.filter((p) => !isSameDay(p, validatedParts));
        }
        else {
          this.activeParts = [...activePartsArray, validatedParts];
        }
      }
      else {
        this.activeParts = Object.assign({}, validatedParts);
      }
      const hasSlottedButtons = this.el.querySelector('[slot="buttons"]') !== null;
      if (hasSlottedButtons || this.showDefaultButtons) {
        return;
      }
      this.confirm();
    };
    this.initializeKeyboardListeners = () => {
      const calendarBodyRef = this.calendarBodyRef;
      if (!calendarBodyRef) {
        return;
      }
      const root = this.el.shadowRoot;
      /**
       * Get a reference to the month
       * element we are currently viewing.
       */
      const currentMonth = calendarBodyRef.querySelector('.calendar-month:nth-of-type(2)');
      /**
       * When focusing the calendar body, we want to pass focus
       * to the working day, but other days should
       * only be accessible using the arrow keys. Pressing
       * Tab should jump between bodies of selectable content.
       */
      const checkCalendarBodyFocus = (ev) => {
        var _a;
        const record = ev[0];
        /**
         * If calendar body was already focused
         * when this fired or if the calendar body
         * if not currently focused, we should not re-focus
         * the inner day.
         */
        if (((_a = record.oldValue) === null || _a === void 0 ? void 0 : _a.includes('ion-focused')) || !calendarBodyRef.classList.contains('ion-focused')) {
          return;
        }
        this.focusWorkingDay(currentMonth);
      };
      const mo = new MutationObserver(checkCalendarBodyFocus);
      mo.observe(calendarBodyRef, { attributeFilter: ['class'], attributeOldValue: true });
      this.destroyKeyboardMO = () => {
        mo === null || mo === void 0 ? void 0 : mo.disconnect();
      };
      /**
       * We must use keydown not keyup as we want
       * to prevent scrolling when using the arrow keys.
       */
      calendarBodyRef.addEventListener('keydown', (ev) => {
        const activeElement = root.activeElement;
        if (!activeElement || !activeElement.classList.contains('calendar-day')) {
          return;
        }
        const parts = getPartsFromCalendarDay(activeElement);
        let partsToFocus;
        switch (ev.key) {
          case 'ArrowDown':
            ev.preventDefault();
            partsToFocus = getNextWeek(parts);
            break;
          case 'ArrowUp':
            ev.preventDefault();
            partsToFocus = getPreviousWeek(parts);
            break;
          case 'ArrowRight':
            ev.preventDefault();
            partsToFocus = getNextDay(parts);
            break;
          case 'ArrowLeft':
            ev.preventDefault();
            partsToFocus = getPreviousDay(parts);
            break;
          case 'Home':
            ev.preventDefault();
            partsToFocus = getStartOfWeek(parts);
            break;
          case 'End':
            ev.preventDefault();
            partsToFocus = getEndOfWeek(parts);
            break;
          case 'PageUp':
            ev.preventDefault();
            partsToFocus = ev.shiftKey ? getPreviousYear(parts) : getPreviousMonth(parts);
            break;
          case 'PageDown':
            ev.preventDefault();
            partsToFocus = ev.shiftKey ? getNextYear(parts) : getNextMonth(parts);
            break;
          /**
           * Do not preventDefault here
           * as we do not want to override other
           * browser defaults such as pressing Enter/Space
           * to select a day.
           */
          default:
            return;
        }
        /**
         * If the day we want to move focus to is
         * disabled, do not do anything.
         */
        if (isDayDisabled(partsToFocus, this.minParts, this.maxParts)) {
          return;
        }
        this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), partsToFocus));
        /**
         * Give view a chance to re-render
         * then move focus to the new working day
         */
        requestAnimationFrame(() => this.focusWorkingDay(currentMonth));
      });
    };
    this.focusWorkingDay = (currentMonth) => {
      /**
       * Get the number of padding days so
       * we know how much to offset our next selector by
       * to grab the correct calenday-day element.
       */
      const padding = currentMonth.querySelectorAll('.calendar-day-padding');
      const { day } = this.workingParts;
      if (day === null) {
        return;
      }
      /**
       * Get the calendar day element
       * and focus it.
       */
      const dayEl = currentMonth.querySelector(`.calendar-day:nth-of-type(${padding.length + day})`);
      if (dayEl) {
        dayEl.focus();
      }
    };
    this.processMinParts = () => {
      const { min, defaultParts } = this;
      if (min === undefined) {
        this.minParts = undefined;
        return;
      }
      this.minParts = parseMinParts(min, defaultParts);
    };
    this.processMaxParts = () => {
      const { max, defaultParts } = this;
      if (max === undefined) {
        this.maxParts = undefined;
        return;
      }
      this.maxParts = parseMaxParts(max, defaultParts);
    };
    this.initializeCalendarListener = () => {
      const calendarBodyRef = this.calendarBodyRef;
      if (!calendarBodyRef) {
        return;
      }
      /**
       * For performance reasons, we only render 3
       * months at a time: The current month, the previous
       * month, and the next month. We have a scroll listener
       * on the calendar body to append/prepend new months.
       *
       * We can do this because Stencil is smart enough to not
       * re-create the .calendar-month containers, but rather
       * update the content within those containers.
       *
       * As an added bonus, WebKit has some troubles with
       * scroll-snap-stop: always, so not rendering all of
       * the months in a row allows us to mostly sidestep
       * that issue.
       */
      const months = calendarBodyRef.querySelectorAll('.calendar-month');
      const startMonth = months[0];
      const workingMonth = months[1];
      const endMonth = months[2];
      const mode = getIonMode$1(this);
      const needsiOSRubberBandFix = mode === 'ios' && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1;
      /**
       * Before setting up the scroll listener,
       * scroll the middle month into view.
       * scrollIntoView() will scroll entire page
       * if element is not in viewport. Use scrollLeft instead.
       */
      writeTask(() => {
        calendarBodyRef.scrollLeft = startMonth.clientWidth * (isRTL$1(this.el) ? -1 : 1);
        const getChangedMonth = (parts) => {
          const box = calendarBodyRef.getBoundingClientRect();
          const root = this.el.shadowRoot;
          /**
           * Get the element that is in the center of the calendar body.
           * This will be an element inside of the active month.
           */
          const elementAtCenter = root.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
          /**
           * If there is no element then the
           * component may be re-rendering on a slow device.
           */
          if (!elementAtCenter)
            return;
          const month = elementAtCenter.closest('.calendar-month');
          if (!month)
            return;
          /**
           * The edge of the month must be lined up with
           * the edge of the calendar body in order for
           * the component to update. Otherwise, it
           * may be the case that the user has paused their
           * swipe or the browser has not finished snapping yet.
           * Rather than check if the x values are equal,
           * we give it a tolerance of 2px to account for
           * sub pixel rendering.
           */
          const monthBox = month.getBoundingClientRect();
          if (Math.abs(monthBox.x - box.x) > 2)
            return;
          /**
           * From here, we can determine if the start
           * month or the end month was scrolled into view.
           * If no month was changed, then we can return from
           * the scroll callback early.
           */
          if (month === startMonth) {
            return getPreviousMonth(parts);
          }
          else if (month === endMonth) {
            return getNextMonth(parts);
          }
          else {
            return;
          }
        };
        const updateActiveMonth = () => {
          if (needsiOSRubberBandFix) {
            calendarBodyRef.style.removeProperty('pointer-events');
            appliediOSRubberBandFix = false;
          }
          /**
           * If the month did not change
           * then we can return early.
           */
          const newDate = getChangedMonth(this.workingParts);
          if (!newDate)
            return;
          const { month, day, year } = newDate;
          if (isMonthDisabled({ month, year, day: null }, {
            minParts: Object.assign(Object.assign({}, this.minParts), { day: null }),
            maxParts: Object.assign(Object.assign({}, this.maxParts), { day: null }),
          })) {
            return;
          }
          /**
           * Prevent scrolling for other browsers
           * to give the DOM time to update and the container
           * time to properly snap.
           */
          calendarBodyRef.style.setProperty('overflow', 'hidden');
          /**
           * Use a writeTask here to ensure
           * that the state is updated and the
           * correct month is scrolled into view
           * in the same frame. This is not
           * typically a problem on newer devices
           * but older/slower device may have a flicker
           * if we did not do this.
           */
          writeTask(() => {
            this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), { month, day: day, year }));
            calendarBodyRef.scrollLeft = workingMonth.clientWidth * (isRTL$1(this.el) ? -1 : 1);
            calendarBodyRef.style.removeProperty('overflow');
          });
        };
        /**
         * When the container finishes scrolling we
         * need to update the DOM with the selected month.
         */
        let scrollTimeout;
        /**
         * We do not want to attempt to set pointer-events
         * multiple times within a single swipe gesture as
         * that adds unnecessary work to the main thread.
         */
        let appliediOSRubberBandFix = false;
        const scrollCallback = () => {
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          /**
           * On iOS it is possible to quickly rubber band
           * the scroll area before the scroll timeout has fired.
           * This results in users reaching the end of the scrollable
           * container before the DOM has updated.
           * By setting `pointer-events: none` we can ensure that
           * subsequent swipes do not happen while the container
           * is snapping.
           */
          if (!appliediOSRubberBandFix && needsiOSRubberBandFix) {
            calendarBodyRef.style.setProperty('pointer-events', 'none');
            appliediOSRubberBandFix = true;
          }
          // Wait ~3 frames
          scrollTimeout = setTimeout(updateActiveMonth, 50);
        };
        calendarBodyRef.addEventListener('scroll', scrollCallback);
        this.destroyCalendarListener = () => {
          calendarBodyRef.removeEventListener('scroll', scrollCallback);
        };
      });
    };
    /**
     * Clean up all listeners except for the overlay
     * listener. This is so that we can re-create the listeners
     * if the datetime has been hidden/presented by a modal or popover.
     */
    this.destroyInteractionListeners = () => {
      const { destroyCalendarListener, destroyKeyboardMO } = this;
      if (destroyCalendarListener !== undefined) {
        destroyCalendarListener();
      }
      if (destroyKeyboardMO !== undefined) {
        destroyKeyboardMO();
      }
    };
    this.processValue = (value) => {
      const hasValue = value !== null && value !== undefined;
      const valueToProcess = hasValue ? parseDate(value) : this.defaultParts;
      const { minParts, maxParts } = this;
      this.warnIfIncorrectValueUsage();
      /**
       * Datetime should only warn of out of bounds values
       * if set by the user. If the `value` is undefined,
       * we will default to today's date which may be out
       * of bounds. In this case, the warning makes it look
       * like the developer did something wrong which is
       * not true.
       */
      if (hasValue) {
        warnIfValueOutOfBounds(valueToProcess, minParts, maxParts);
      }
      /**
       * If there are multiple values, pick an arbitrary one to clamp to. This way,
       * if the values are across months, we always show at least one of them. Note
       * that the values don't necessarily have to be in order.
       */
      const singleValue = Array.isArray(valueToProcess) ? valueToProcess[0] : valueToProcess;
      const { month, day, year, hour, minute } = clampDate(singleValue, minParts, maxParts);
      const ampm = parseAmPm(hour);
      this.setWorkingParts({
        month,
        day,
        year,
        hour,
        minute,
        ampm,
      });
      /**
       * Since `activeParts` indicates a value that
       * been explicitly selected either by the
       * user or the app, only update `activeParts`
       * if the `value` property is set.
       */
      if (hasValue) {
        if (Array.isArray(valueToProcess)) {
          this.activeParts = [...valueToProcess];
        }
        else {
          this.activeParts = {
            month,
            day,
            year,
            hour,
            minute,
            ampm,
          };
        }
      }
      else {
        /**
         * Reset the active parts if the value is not set.
         * This will clear the selected calendar day when
         * performing a clear action or using the reset() method.
         */
        this.activeParts = [];
      }
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.hasValue = () => {
      return this.value != null;
    };
    this.nextMonth = () => {
      const calendarBodyRef = this.calendarBodyRef;
      if (!calendarBodyRef) {
        return;
      }
      const nextMonth = calendarBodyRef.querySelector('.calendar-month:last-of-type');
      if (!nextMonth) {
        return;
      }
      const left = nextMonth.offsetWidth * 2;
      calendarBodyRef.scrollTo({
        top: 0,
        left: left * (isRTL$1(this.el) ? -1 : 1),
        behavior: 'smooth',
      });
    };
    this.prevMonth = () => {
      const calendarBodyRef = this.calendarBodyRef;
      if (!calendarBodyRef) {
        return;
      }
      const prevMonth = calendarBodyRef.querySelector('.calendar-month:first-of-type');
      if (!prevMonth) {
        return;
      }
      calendarBodyRef.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
    this.toggleMonthAndYearView = () => {
      this.showMonthAndYear = !this.showMonthAndYear;
    };
    this.showMonthAndYear = false;
    this.activeParts = [];
    this.workingParts = {
      month: 5,
      day: 28,
      year: 2021,
      hour: 13,
      minute: 52,
      ampm: 'pm',
    };
    this.isPresented = false;
    this.isTimePopoverOpen = false;
    this.color = 'primary';
    this.name = this.inputId;
    this.disabled = false;
    this.readonly = false;
    this.isDateEnabled = undefined;
    this.min = undefined;
    this.max = undefined;
    this.presentation = 'date-time';
    this.cancelText = 'Cancel';
    this.doneText = 'Done';
    this.clearText = 'Clear';
    this.yearValues = undefined;
    this.monthValues = undefined;
    this.dayValues = undefined;
    this.hourValues = undefined;
    this.minuteValues = undefined;
    this.locale = 'default';
    this.firstDayOfWeek = 0;
    this.titleSelectedDatesFormatter = undefined;
    this.multiple = false;
    this.highlightedDates = undefined;
    this.value = undefined;
    this.showDefaultTitle = false;
    this.showDefaultButtons = false;
    this.showClearButton = false;
    this.showDefaultTimeLabel = true;
    this.hourCycle = undefined;
    this.size = 'fixed';
    this.preferWheel = false;
  }
  disabledChanged() {
    this.emitStyle();
  }
  minChanged() {
    this.processMinParts();
  }
  maxChanged() {
    this.processMaxParts();
  }
  yearValuesChanged() {
    this.parsedYearValues = convertToArrayOfNumbers(this.yearValues);
  }
  monthValuesChanged() {
    this.parsedMonthValues = convertToArrayOfNumbers(this.monthValues);
  }
  dayValuesChanged() {
    this.parsedDayValues = convertToArrayOfNumbers(this.dayValues);
  }
  hourValuesChanged() {
    this.parsedHourValues = convertToArrayOfNumbers(this.hourValues);
  }
  minuteValuesChanged() {
    this.parsedMinuteValues = convertToArrayOfNumbers(this.minuteValues);
  }
  activePartsChanged() {
    this.activePartsClone = this.activeParts;
  }
  /**
   * Update the datetime value when the value changes
   */
  valueChanged() {
    const { value, minParts, maxParts, workingParts } = this;
    if (this.hasValue()) {
      this.warnIfIncorrectValueUsage();
      /**
       * Clones the value of the `activeParts` to the private clone, to update
       * the date display on the current render cycle without causing another render.
       *
       * This allows us to update the current value's date/time display without
       * refocusing or shifting the user's display (leaves the user in place).
       */
      const valueDateParts = parseDate(value);
      if (valueDateParts) {
        warnIfValueOutOfBounds(valueDateParts, minParts, maxParts);
        if (Array.isArray(valueDateParts)) {
          this.activePartsClone = [...valueDateParts];
        }
        else {
          const { month, day, year, hour, minute } = valueDateParts;
          const ampm = hour != null ? (hour >= 12 ? 'pm' : 'am') : undefined;
          this.activePartsClone = Object.assign(Object.assign({}, this.activeParts), { month,
            day,
            year,
            hour,
            minute,
            ampm });
          /**
           * The working parts am/pm value must be updated when the value changes, to
           * ensure the time picker hour column values are generated correctly.
           *
           * Note that we don't need to do this if valueDateParts is an array, since
           * multiple="true" does not apply to time pickers.
           */
          this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { ampm }));
        }
      }
      else {
        printIonWarning(`Unable to parse date string: ${value}. Please provide a valid ISO 8601 datetime string.`);
      }
    }
    this.emitStyle();
    this.ionValueChange.emit({ value });
  }
  /**
   * Confirms the selected datetime value, updates the
   * `value` property, and optionally closes the popover
   * or modal that the datetime was presented in.
   */
  async confirm(closeOverlay = false) {
    const { isCalendarPicker, activeParts } = this;
    /**
     * We only update the value if the presentation is not a calendar picker.
     */
    if (activeParts !== undefined || !isCalendarPicker) {
      const activePartsIsArray = Array.isArray(activeParts);
      if (activePartsIsArray && activeParts.length === 0) {
        this.setValue(undefined);
      }
      else {
        this.setValue(convertDataToISO(activeParts));
      }
    }
    if (closeOverlay) {
      this.closeParentOverlay();
    }
  }
  /**
   * Resets the internal state of the datetime but does not update the value.
   * Passing a valid ISO-8601 string will reset the state of the component to the provided date.
   * If no value is provided, the internal state will be reset to the clamped value of the min, max and today.
   */
  async reset(startDate) {
    this.processValue(startDate);
  }
  /**
   * Emits the ionCancel event and
   * optionally closes the popover
   * or modal that the datetime was
   * presented in.
   */
  async cancel(closeOverlay = false) {
    this.ionCancel.emit();
    if (closeOverlay) {
      this.closeParentOverlay();
    }
  }
  get isCalendarPicker() {
    const { presentation } = this;
    return presentation === 'date' || presentation === 'date-time' || presentation === 'time-date';
  }
  connectedCallback() {
    this.clearFocusVisible = startFocusVisible(this.el).destroy;
  }
  disconnectedCallback() {
    if (this.clearFocusVisible) {
      this.clearFocusVisible();
      this.clearFocusVisible = undefined;
    }
  }
  initializeListeners() {
    this.initializeCalendarListener();
    this.initializeKeyboardListeners();
  }
  componentDidLoad() {
    /**
     * If a scrollable element is hidden using `display: none`,
     * it will not have a scroll height meaning we cannot scroll elements
     * into view. As a result, we will need to wait for the datetime to become
     * visible if used inside of a modal or a popover otherwise the scrollable
     * areas will not have the correct values snapped into place.
     */
    const visibleCallback = (entries) => {
      const ev = entries[0];
      if (!ev.isIntersecting) {
        return;
      }
      this.initializeListeners();
      /**
       * TODO FW-2793: Datetime needs a frame to ensure that it
       * can properly scroll contents into view. As a result
       * we hide the scrollable content until after that frame
       * so users do not see the content quickly shifting. The downside
       * is that the content will pop into view a frame after. Maybe there
       * is a better way to handle this?
       */
      writeTask(() => {
        this.el.classList.add('datetime-ready');
      });
    };
    const visibleIO = new IntersectionObserver(visibleCallback, { threshold: 0.01 });
    /**
     * Use raf to avoid a race condition between the component loading and
     * its display animation starting (such as when shown in a modal). This
     * could cause the datetime to start at a visibility of 0, erroneously
     * triggering the `hiddenIO` observer below.
     */
    raf(() => visibleIO === null || visibleIO === void 0 ? void 0 : visibleIO.observe(this.el));
    /**
     * We need to clean up listeners when the datetime is hidden
     * in a popover/modal so that we can properly scroll containers
     * back into view if they are re-presented. When the datetime is hidden
     * the scroll areas have scroll widths/heights of 0px, so any snapping
     * we did originally has been lost.
     */
    const hiddenCallback = (entries) => {
      const ev = entries[0];
      if (ev.isIntersecting) {
        return;
      }
      this.destroyInteractionListeners();
      /**
       * When datetime is hidden, we need to make sure that
       * the month/year picker is closed. Otherwise,
       * it will be open when the datetime re-appears
       * and the scroll area of the calendar grid will be 0.
       * As a result, the wrong month will be shown.
       */
      this.showMonthAndYear = false;
      writeTask(() => {
        this.el.classList.remove('datetime-ready');
      });
    };
    const hiddenIO = new IntersectionObserver(hiddenCallback, { threshold: 0 });
    raf(() => hiddenIO === null || hiddenIO === void 0 ? void 0 : hiddenIO.observe(this.el));
    /**
     * Datetime uses Ionic components that emit
     * ionFocus and ionBlur. These events are
     * composed meaning they will cross
     * the shadow dom boundary. We need to
     * stop propagation on these events otherwise
     * developers will see 2 ionFocus or 2 ionBlur
     * events at a time.
     */
    const root = getElementRoot(this.el);
    root.addEventListener('ionFocus', (ev) => ev.stopPropagation());
    root.addEventListener('ionBlur', (ev) => ev.stopPropagation());
  }
  /**
   * When the presentation is changed, all calendar content is recreated,
   * so we need to re-init behavior with the new elements.
   */
  componentDidRender() {
    const { presentation, prevPresentation, calendarBodyRef, minParts, preferWheel } = this;
    /**
     * TODO(FW-2165)
     * Remove this when https://bugs.webkit.org/show_bug.cgi?id=235960 is fixed.
     * When using `min`, we add `scroll-snap-align: none`
     * to the disabled month so that users cannot scroll to it.
     * This triggers a bug in WebKit where the scroll position is reset.
     * Since the month change logic is handled by a scroll listener,
     * this causes the month to change leading to `scroll-snap-align`
     * changing again, thus changing the scroll position again and causing
     * an infinite loop.
     * This issue only applies to the calendar grid, so we can disable
     * it if the calendar grid is not being used.
     */
    const hasCalendarGrid = !preferWheel && ['date-time', 'time-date', 'date'].includes(presentation);
    if (minParts !== undefined && hasCalendarGrid && calendarBodyRef) {
      const workingMonth = calendarBodyRef.querySelector('.calendar-month:nth-of-type(1)');
      if (workingMonth) {
        calendarBodyRef.scrollLeft = workingMonth.clientWidth * (isRTL$1(this.el) ? -1 : 1);
      }
    }
    if (prevPresentation === null) {
      this.prevPresentation = presentation;
      return;
    }
    if (presentation === prevPresentation) {
      return;
    }
    this.prevPresentation = presentation;
    this.destroyInteractionListeners();
    this.initializeListeners();
    /**
     * The month/year picker from the date interface
     * should be closed as it is not available in non-date
     * interfaces.
     */
    this.showMonthAndYear = false;
    raf(() => {
      this.ionRender.emit();
    });
  }
  componentWillLoad() {
    const { el, highlightedDates, multiple, presentation, preferWheel } = this;
    if (multiple) {
      if (presentation !== 'date') {
        printIonWarning('Multiple date selection is only supported for presentation="date".', el);
      }
      if (preferWheel) {
        printIonWarning('Multiple date selection is not supported with preferWheel="true".', el);
      }
    }
    if (highlightedDates !== undefined) {
      if (presentation !== 'date' && presentation !== 'date-time' && presentation !== 'time-date') {
        printIonWarning('The highlightedDates property is only supported with the date, date-time, and time-date presentations.', el);
      }
      if (preferWheel) {
        printIonWarning('The highlightedDates property is not supported with preferWheel="true".', el);
      }
    }
    this.processMinParts();
    this.processMaxParts();
    const hourValues = (this.parsedHourValues = convertToArrayOfNumbers(this.hourValues));
    const minuteValues = (this.parsedMinuteValues = convertToArrayOfNumbers(this.minuteValues));
    const monthValues = (this.parsedMonthValues = convertToArrayOfNumbers(this.monthValues));
    const yearValues = (this.parsedYearValues = convertToArrayOfNumbers(this.yearValues));
    const dayValues = (this.parsedDayValues = convertToArrayOfNumbers(this.dayValues));
    const todayParts = (this.todayParts = parseDate(getToday()));
    this.defaultParts = getClosestValidDate(todayParts, monthValues, dayValues, yearValues, hourValues, minuteValues);
    this.processValue(this.value);
    this.emitStyle();
  }
  emitStyle() {
    this.ionStyle.emit({
      interactive: true,
      datetime: true,
      'interactive-disabled': this.disabled,
    });
  }
  /**
   * Universal render methods
   * These are pieces of datetime that
   * are rendered independently of presentation.
   */
  renderFooter() {
    const { showDefaultButtons, showClearButton } = this;
    const hasSlottedButtons = this.el.querySelector('[slot="buttons"]') !== null;
    if (!hasSlottedButtons && !showDefaultButtons && !showClearButton) {
      return;
    }
    const clearButtonClick = () => {
      this.reset();
      this.setValue(undefined);
    };
    /**
     * By default we render two buttons:
     * Cancel - Dismisses the datetime and
     * does not update the `value` prop.
     * OK - Dismisses the datetime and
     * updates the `value` prop.
     */
    return (h("div", { class: "datetime-footer" }, h("div", { class: "datetime-buttons" }, h("div", { class: {
        ['datetime-action-buttons']: true,
        ['has-clear-button']: this.showClearButton,
      } }, h("slot", { name: "buttons" }, h("ion-buttons", null, showDefaultButtons && (h("ion-button", { id: "cancel-button", color: this.color, onClick: () => this.cancel(true) }, this.cancelText)), h("div", null, showClearButton && (h("ion-button", { id: "clear-button", color: this.color, onClick: () => clearButtonClick() }, this.clearText)), showDefaultButtons && (h("ion-button", { id: "confirm-button", color: this.color, onClick: () => this.confirm(true) }, this.doneText)))))))));
  }
  /**
   * Wheel picker render methods
   */
  renderWheelPicker(forcePresentation = this.presentation) {
    /**
     * If presentation="time-date" we switch the
     * order of the render array here instead of
     * manually reordering each date/time picker
     * column with CSS. This allows for additional
     * flexibility if we need to render subsets
     * of the date/time data or do additional ordering
     * within the child render functions.
     */
    const renderArray = forcePresentation === 'time-date'
      ? [this.renderTimePickerColumns(forcePresentation), this.renderDatePickerColumns(forcePresentation)]
      : [this.renderDatePickerColumns(forcePresentation), this.renderTimePickerColumns(forcePresentation)];
    return h("ion-picker-internal", null, renderArray);
  }
  renderDatePickerColumns(forcePresentation) {
    return forcePresentation === 'date-time' || forcePresentation === 'time-date'
      ? this.renderCombinedDatePickerColumn()
      : this.renderIndividualDatePickerColumns(forcePresentation);
  }
  renderCombinedDatePickerColumn() {
    const { defaultParts, workingParts, locale, minParts, maxParts, todayParts, isDateEnabled } = this;
    const activePart = this.getActivePartsWithFallback();
    /**
     * By default, generate a range of 3 months:
     * Previous month, current month, and next month
     */
    const monthsToRender = generateMonths(workingParts);
    const lastMonth = monthsToRender[monthsToRender.length - 1];
    /**
     * Ensure that users can select the entire window of dates.
     */
    monthsToRender[0].day = 1;
    lastMonth.day = getNumDaysInMonth(lastMonth.month, lastMonth.year);
    /**
     * Narrow the dates rendered based on min/max dates (if any).
     * The `min` date is used if the min is after the generated min month.
     * The `max` date is used if the max is before the generated max month.
     * This ensures that the sliding window always stays at 3 months
     * but still allows future dates to be lazily rendered based on any min/max
     * constraints.
     */
    const min = minParts !== undefined && isAfter(minParts, monthsToRender[0]) ? minParts : monthsToRender[0];
    const max = maxParts !== undefined && isBefore(maxParts, lastMonth) ? maxParts : lastMonth;
    const result = getCombinedDateColumnData(locale, todayParts, min, max, this.parsedDayValues, this.parsedMonthValues);
    let items = result.items;
    const parts = result.parts;
    if (isDateEnabled) {
      items = items.map((itemObject, index) => {
        const referenceParts = parts[index];
        let disabled;
        try {
          /**
           * The `isDateEnabled` implementation is try-catch wrapped
           * to prevent exceptions in the user's function from
           * interrupting the calendar rendering.
           */
          disabled = !isDateEnabled(convertDataToISO(referenceParts));
        }
        catch (e) {
          printIonError('Exception thrown from provided `isDateEnabled` function. Please check your function and try again.', e);
        }
        return Object.assign(Object.assign({}, itemObject), { disabled });
      });
    }
    /**
     * If we have selected a day already, then default the column
     * to that value. Otherwise, set it to the default date.
     */
    const todayString = workingParts.day !== null
      ? `${workingParts.year}-${workingParts.month}-${workingParts.day}`
      : `${defaultParts.year}-${defaultParts.month}-${defaultParts.day}`;
    return (h("ion-picker-column-internal", { class: "date-column", color: this.color, items: items, value: todayString, onIonChange: (ev) => {
        // TODO(FW-1823) Remove this when iOS 14 support is dropped.
        // Due to a Safari 14 issue we need to destroy
        // the scroll listener before we update state
        // and trigger a re-render.
        if (this.destroyCalendarListener) {
          this.destroyCalendarListener();
        }
        const { value } = ev.detail;
        const findPart = parts.find(({ month, day, year }) => value === `${year}-${month}-${day}`);
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), findPart));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), findPart));
        // We can re-attach the scroll listener after
        // the working parts have been updated.
        this.initializeCalendarListener();
        ev.stopPropagation();
      } }));
  }
  renderIndividualDatePickerColumns(forcePresentation) {
    const { workingParts, isDateEnabled } = this;
    const shouldRenderMonths = forcePresentation !== 'year' && forcePresentation !== 'time';
    const months = shouldRenderMonths
      ? getMonthColumnData(this.locale, workingParts, this.minParts, this.maxParts, this.parsedMonthValues)
      : [];
    const shouldRenderDays = forcePresentation === 'date';
    let days = shouldRenderDays
      ? getDayColumnData(this.locale, workingParts, this.minParts, this.maxParts, this.parsedDayValues)
      : [];
    if (isDateEnabled) {
      days = days.map((dayObject) => {
        const { value } = dayObject;
        const valueNum = typeof value === 'string' ? parseInt(value) : value;
        const referenceParts = {
          month: workingParts.month,
          day: valueNum,
          year: workingParts.year,
        };
        let disabled;
        try {
          /**
           * The `isDateEnabled` implementation is try-catch wrapped
           * to prevent exceptions in the user's function from
           * interrupting the calendar rendering.
           */
          disabled = !isDateEnabled(convertDataToISO(referenceParts));
        }
        catch (e) {
          printIonError('Exception thrown from provided `isDateEnabled` function. Please check your function and try again.', e);
        }
        return Object.assign(Object.assign({}, dayObject), { disabled });
      });
    }
    const shouldRenderYears = forcePresentation !== 'month' && forcePresentation !== 'time';
    const years = shouldRenderYears
      ? getYearColumnData(this.locale, this.defaultParts, this.minParts, this.maxParts, this.parsedYearValues)
      : [];
    /**
     * Certain locales show the day before the month.
     */
    const showMonthFirst = isMonthFirstLocale(this.locale, { month: 'numeric', day: 'numeric' });
    let renderArray = [];
    if (showMonthFirst) {
      renderArray = [
        this.renderMonthPickerColumn(months),
        this.renderDayPickerColumn(days),
        this.renderYearPickerColumn(years),
      ];
    }
    else {
      renderArray = [
        this.renderDayPickerColumn(days),
        this.renderMonthPickerColumn(months),
        this.renderYearPickerColumn(years),
      ];
    }
    return renderArray;
  }
  renderDayPickerColumn(days) {
    var _a;
    if (days.length === 0) {
      return [];
    }
    const { workingParts } = this;
    const activePart = this.getActivePartsWithFallback();
    return (h("ion-picker-column-internal", { class: "day-column", color: this.color, items: days, value: (_a = (workingParts.day !== null ? workingParts.day : this.defaultParts.day)) !== null && _a !== void 0 ? _a : undefined, onIonChange: (ev) => {
        // TODO(FW-1823) Remove this when iOS 14 support is dropped.
        // Due to a Safari 14 issue we need to destroy
        // the scroll listener before we update state
        // and trigger a re-render.
        if (this.destroyCalendarListener) {
          this.destroyCalendarListener();
        }
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { day: ev.detail.value }));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), { day: ev.detail.value }));
        // We can re-attach the scroll listener after
        // the working parts have been updated.
        this.initializeCalendarListener();
        ev.stopPropagation();
      } }));
  }
  renderMonthPickerColumn(months) {
    if (months.length === 0) {
      return [];
    }
    const { workingParts } = this;
    const activePart = this.getActivePartsWithFallback();
    return (h("ion-picker-column-internal", { class: "month-column", color: this.color, items: months, value: workingParts.month, onIonChange: (ev) => {
        // TODO(FW-1823) Remove this when iOS 14 support is dropped.
        // Due to a Safari 14 issue we need to destroy
        // the scroll listener before we update state
        // and trigger a re-render.
        if (this.destroyCalendarListener) {
          this.destroyCalendarListener();
        }
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { month: ev.detail.value }));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), { month: ev.detail.value }));
        // We can re-attach the scroll listener after
        // the working parts have been updated.
        this.initializeCalendarListener();
        ev.stopPropagation();
      } }));
  }
  renderYearPickerColumn(years) {
    if (years.length === 0) {
      return [];
    }
    const { workingParts } = this;
    const activePart = this.getActivePartsWithFallback();
    return (h("ion-picker-column-internal", { class: "year-column", color: this.color, items: years, value: workingParts.year, onIonChange: (ev) => {
        // TODO(FW-1823) Remove this when iOS 14 support is dropped.
        // Due to a Safari 14 issue we need to destroy
        // the scroll listener before we update state
        // and trigger a re-render.
        if (this.destroyCalendarListener) {
          this.destroyCalendarListener();
        }
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { year: ev.detail.value }));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), { year: ev.detail.value }));
        // We can re-attach the scroll listener after
        // the working parts have been updated.
        this.initializeCalendarListener();
        ev.stopPropagation();
      } }));
  }
  renderTimePickerColumns(forcePresentation) {
    if (['date', 'month', 'month-year', 'year'].includes(forcePresentation)) {
      return [];
    }
    /**
     * If a user has not selected a date,
     * then we should show all times. If the
     * user has selected a date (even if it has
     * not been confirmed yet), we should apply
     * the max and min restrictions so that the
     * time picker shows values that are
     * appropriate for the selected date.
     */
    const activePart = this.getActivePart();
    const userHasSelectedDate = activePart !== undefined;
    const { hoursData, minutesData, dayPeriodData } = getTimeColumnsData(this.locale, this.workingParts, this.hourCycle, userHasSelectedDate ? this.minParts : undefined, userHasSelectedDate ? this.maxParts : undefined, this.parsedHourValues, this.parsedMinuteValues);
    return [
      this.renderHourPickerColumn(hoursData),
      this.renderMinutePickerColumn(minutesData),
      this.renderDayPeriodPickerColumn(dayPeriodData),
    ];
  }
  renderHourPickerColumn(hoursData) {
    const { workingParts } = this;
    if (hoursData.length === 0)
      return [];
    const activePart = this.getActivePartsWithFallback();
    return (h("ion-picker-column-internal", { color: this.color, value: activePart.hour, items: hoursData, numericInput: true, onIonChange: (ev) => {
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { hour: ev.detail.value }));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), { hour: ev.detail.value }));
        ev.stopPropagation();
      } }));
  }
  renderMinutePickerColumn(minutesData) {
    const { workingParts } = this;
    if (minutesData.length === 0)
      return [];
    const activePart = this.getActivePartsWithFallback();
    return (h("ion-picker-column-internal", { color: this.color, value: activePart.minute, items: minutesData, numericInput: true, onIonChange: (ev) => {
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { minute: ev.detail.value }));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), { minute: ev.detail.value }));
        ev.stopPropagation();
      } }));
  }
  renderDayPeriodPickerColumn(dayPeriodData) {
    const { workingParts } = this;
    if (dayPeriodData.length === 0) {
      return [];
    }
    const activePart = this.getActivePartsWithFallback();
    const isDayPeriodRTL = isLocaleDayPeriodRTL(this.locale);
    return (h("ion-picker-column-internal", { style: isDayPeriodRTL ? { order: '-1' } : {}, color: this.color, value: activePart.ampm, items: dayPeriodData, onIonChange: (ev) => {
        const hour = calculateHourFromAMPM(workingParts, ev.detail.value);
        this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { ampm: ev.detail.value, hour }));
        this.setActiveParts(Object.assign(Object.assign({}, activePart), { ampm: ev.detail.value, hour }));
        ev.stopPropagation();
      } }));
  }
  renderWheelView(forcePresentation) {
    const { locale } = this;
    const showMonthFirst = isMonthFirstLocale(locale);
    const columnOrder = showMonthFirst ? 'month-first' : 'year-first';
    return (h("div", { class: {
        [`wheel-order-${columnOrder}`]: true,
      } }, this.renderWheelPicker(forcePresentation)));
  }
  /**
   * Grid Render Methods
   */
  renderCalendarHeader(mode) {
    const expandedIcon = mode === 'ios' ? chevronDown : caretUpSharp;
    const collapsedIcon = mode === 'ios' ? chevronForward : caretDownSharp;
    const prevMonthDisabled = isPrevMonthDisabled(this.workingParts, this.minParts, this.maxParts);
    const nextMonthDisabled = isNextMonthDisabled(this.workingParts, this.maxParts);
    // don't use the inheritAttributes util because it removes dir from the host, and we still need that
    const hostDir = this.el.getAttribute('dir') || undefined;
    return (h("div", { class: "calendar-header" }, h("div", { class: "calendar-action-buttons" }, h("div", { class: "calendar-month-year" }, h("ion-item", { ref: (el) => (this.monthYearToggleItemRef = el), button: true, "aria-label": "Show year picker", detail: false, lines: "none", onClick: () => {
        var _a;
        this.toggleMonthAndYearView();
        /**
         * TODO: FW-3547
         *
         * Currently there is not a way to set the aria-label on the inner button
         * on the `ion-item` and have it be reactive to changes. This is a workaround
         * until we either refactor `ion-item` to a button or Stencil adds a way to
         * have reactive props for built-in properties, such as `aria-label`.
         */
        const { monthYearToggleItemRef } = this;
        if (monthYearToggleItemRef) {
          const btn = (_a = monthYearToggleItemRef.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.item-native');
          if (btn) {
            const monthYearAriaLabel = this.showMonthAndYear ? 'Hide year picker' : 'Show year picker';
            btn.setAttribute('aria-label', monthYearAriaLabel);
          }
        }
      } }, h("ion-label", null, getMonthAndYear(this.locale, this.workingParts), h("ion-icon", { "aria-hidden": "true", icon: this.showMonthAndYear ? expandedIcon : collapsedIcon, lazy: false, flipRtl: true })))), h("div", { class: "calendar-next-prev" }, h("ion-buttons", null, h("ion-button", { "aria-label": "Previous month", disabled: prevMonthDisabled, onClick: () => this.prevMonth() }, h("ion-icon", { dir: hostDir, "aria-hidden": "true", slot: "icon-only", icon: chevronBack, lazy: false, flipRtl: true })), h("ion-button", { "aria-label": "Next month", disabled: nextMonthDisabled, onClick: () => this.nextMonth() }, h("ion-icon", { dir: hostDir, "aria-hidden": "true", slot: "icon-only", icon: chevronForward, lazy: false, flipRtl: true }))))), h("div", { class: "calendar-days-of-week", "aria-hidden": "true" }, getDaysOfWeek(this.locale, mode, this.firstDayOfWeek % 7).map((d) => {
      return h("div", { class: "day-of-week" }, d);
    }))));
  }
  renderMonth(month, year) {
    const yearAllowed = this.parsedYearValues === undefined || this.parsedYearValues.includes(year);
    const monthAllowed = this.parsedMonthValues === undefined || this.parsedMonthValues.includes(month);
    const isCalMonthDisabled = !yearAllowed || !monthAllowed;
    const swipeDisabled = isMonthDisabled({
      month,
      year,
      day: null,
    }, {
      // The day is not used when checking if a month is disabled.
      // Users should be able to access the min or max month, even if the
      // min/max date is out of bounds (e.g. min is set to Feb 15, Feb should not be disabled).
      minParts: Object.assign(Object.assign({}, this.minParts), { day: null }),
      maxParts: Object.assign(Object.assign({}, this.maxParts), { day: null }),
    });
    // The working month should never have swipe disabled.
    // Otherwise the CSS scroll snap will not work and the user
    // can free-scroll the calendar.
    const isWorkingMonth = this.workingParts.month === month && this.workingParts.year === year;
    const activePart = this.getActivePartsWithFallback();
    return (h("div", { "aria-hidden": !isWorkingMonth ? 'true' : null, class: {
        'calendar-month': true,
        // Prevents scroll snap swipe gestures for months outside of the min/max bounds
        'calendar-month-disabled': !isWorkingMonth && swipeDisabled,
      } }, h("div", { class: "calendar-month-grid" }, getDaysOfMonth(month, year, this.firstDayOfWeek % 7).map((dateObject, index) => {
      const { day, dayOfWeek } = dateObject;
      const { el, highlightedDates, isDateEnabled, multiple } = this;
      const referenceParts = { month, day, year };
      const isCalendarPadding = day === null;
      const { isActive, isToday, ariaLabel, ariaSelected, disabled, text } = getCalendarDayState(this.locale, referenceParts, this.activePartsClone, this.todayParts, this.minParts, this.maxParts, this.parsedDayValues);
      const dateIsoString = convertDataToISO(referenceParts);
      let isCalDayDisabled = isCalMonthDisabled || disabled;
      if (!isCalDayDisabled && isDateEnabled !== undefined) {
        try {
          /**
           * The `isDateEnabled` implementation is try-catch wrapped
           * to prevent exceptions in the user's function from
           * interrupting the calendar rendering.
           */
          isCalDayDisabled = !isDateEnabled(dateIsoString);
        }
        catch (e) {
          printIonError('Exception thrown from provided `isDateEnabled` function. Please check your function and try again.', el, e);
        }
      }
      let dateStyle = undefined;
      /**
       * Custom highlight styles should not override the style for selected dates,
       * nor apply to "filler days" at the start of the grid.
       */
      if (highlightedDates !== undefined && !isActive && day !== null) {
        dateStyle = getHighlightStyles(highlightedDates, dateIsoString, el);
      }
      return (h("button", { tabindex: "-1", "data-day": day, "data-month": month, "data-year": year, "data-index": index, "data-day-of-week": dayOfWeek, disabled: isCalDayDisabled, class: {
          'calendar-day-padding': isCalendarPadding,
          'calendar-day': true,
          'calendar-day-active': isActive,
          'calendar-day-today': isToday,
        }, style: dateStyle && {
          color: dateStyle.textColor,
        }, "aria-hidden": isCalendarPadding ? 'true' : null, "aria-selected": ariaSelected, "aria-label": ariaLabel, onClick: () => {
          if (isCalendarPadding) {
            return;
          }
          this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), { month,
            day,
            year }));
          // multiple only needs date info, so we can wipe out other fields like time
          if (multiple) {
            this.setActiveParts({
              month,
              day,
              year,
            }, isActive);
          }
          else {
            this.setActiveParts(Object.assign(Object.assign({}, activePart), { month,
              day,
              year }));
          }
        } }, h("div", { class: "calendar-day-highlight", style: {
          backgroundColor: dateStyle === null || dateStyle === void 0 ? void 0 : dateStyle.backgroundColor,
        } }), text));
    }))));
  }
  renderCalendarBody() {
    return (h("div", { class: "calendar-body ion-focusable", ref: (el) => (this.calendarBodyRef = el), tabindex: "0" }, generateMonths(this.workingParts).map(({ month, year }) => {
      return this.renderMonth(month, year);
    })));
  }
  renderCalendar(mode) {
    return (h("div", { class: "datetime-calendar", key: "datetime-calendar" }, this.renderCalendarHeader(mode), this.renderCalendarBody()));
  }
  renderTimeLabel() {
    const hasSlottedTimeLabel = this.el.querySelector('[slot="time-label"]') !== null;
    if (!hasSlottedTimeLabel && !this.showDefaultTimeLabel) {
      return;
    }
    return h("slot", { name: "time-label" }, "Time");
  }
  renderTimeOverlay() {
    const use24Hour = is24Hour(this.locale, this.hourCycle);
    const activePart = this.getActivePartsWithFallback();
    return [
      h("div", { class: "time-header" }, this.renderTimeLabel()),
      h("button", { class: {
          'time-body': true,
          'time-body-active': this.isTimePopoverOpen,
        }, "aria-expanded": "false", "aria-haspopup": "true", onClick: async (ev) => {
          const { popoverRef } = this;
          if (popoverRef) {
            this.isTimePopoverOpen = true;
            popoverRef.present(new CustomEvent('ionShadowTarget', {
              detail: {
                ionShadowTarget: ev.target,
              },
            }));
            await popoverRef.onWillDismiss();
            this.isTimePopoverOpen = false;
          }
        } }, getLocalizedTime(this.locale, activePart, use24Hour)),
      h("ion-popover", { alignment: "center", translucent: true, overlayIndex: 1, arrow: false, onWillPresent: (ev) => {
          /**
           * Intersection Observers do not consistently fire between Blink and Webkit
           * when toggling the visibility of the popover and trying to scroll the picker
           * column to the correct time value.
           *
           * This will correctly scroll the element position to the correct time value,
           * before the popover is fully presented.
           */
          const cols = ev.target.querySelectorAll('ion-picker-column-internal');
          // TODO (FW-615): Potentially remove this when intersection observers are fixed in picker column
          cols.forEach((col) => col.scrollActiveItemIntoView());
        }, style: {
          '--offset-y': '-10px',
          '--min-width': 'fit-content',
        },
        // Allow native browser keyboard events to support up/down/home/end key
        // navigation within the time picker.
        keyboardEvents: true, ref: (el) => (this.popoverRef = el) }, this.renderWheelPicker('time')),
    ];
  }
  getHeaderSelectedDateText() {
    const { activeParts, multiple, titleSelectedDatesFormatter } = this;
    const isArray = Array.isArray(activeParts);
    let headerText;
    if (multiple && isArray && activeParts.length !== 1) {
      headerText = `${activeParts.length} days`; // default/fallback for multiple selection
      if (titleSelectedDatesFormatter !== undefined) {
        try {
          headerText = titleSelectedDatesFormatter(convertDataToISO(activeParts));
        }
        catch (e) {
          printIonError('Exception in provided `titleSelectedDatesFormatter`: ', e);
        }
      }
    }
    else {
      // for exactly 1 day selected (multiple set or not), show a formatted version of that
      headerText = getMonthAndDay(this.locale, this.getActivePartsWithFallback());
    }
    return headerText;
  }
  renderHeader(showExpandedHeader = true) {
    const hasSlottedTitle = this.el.querySelector('[slot="title"]') !== null;
    if (!hasSlottedTitle && !this.showDefaultTitle) {
      return;
    }
    return (h("div", { class: "datetime-header" }, h("div", { class: "datetime-title" }, h("slot", { name: "title" }, "Select Date")), showExpandedHeader && h("div", { class: "datetime-selected-date" }, this.getHeaderSelectedDateText())));
  }
  /**
   * Render time picker inside of datetime.
   * Do not pass color prop to segment on
   * iOS mode. MD segment has been customized and
   * should take on the color prop, but iOS
   * should just be the default segment.
   */
  renderTime() {
    const { presentation } = this;
    const timeOnlyPresentation = presentation === 'time';
    return (h("div", { class: "datetime-time" }, timeOnlyPresentation ? this.renderWheelPicker() : this.renderTimeOverlay()));
  }
  /**
   * Renders the month/year picker that is
   * displayed on the calendar grid.
   * The .datetime-year class has additional
   * styles that let us show/hide the
   * picker when the user clicks on the
   * toggle in the calendar header.
   */
  renderCalendarViewMonthYearPicker() {
    return h("div", { class: "datetime-year" }, this.renderWheelView('month-year'));
  }
  /**
   * Render entry point
   * All presentation types are rendered from here.
   */
  renderDatetime(mode) {
    const { presentation, preferWheel } = this;
    /**
     * Certain presentation types have separate grid and wheel displays.
     * If preferWheel is true then we should show a wheel picker instead.
     */
    const hasWheelVariant = presentation === 'date' || presentation === 'date-time' || presentation === 'time-date';
    if (preferWheel && hasWheelVariant) {
      return [this.renderHeader(false), this.renderWheelView(), this.renderFooter()];
    }
    switch (presentation) {
      case 'date-time':
        return [
          this.renderHeader(),
          this.renderCalendar(mode),
          this.renderCalendarViewMonthYearPicker(),
          this.renderTime(),
          this.renderFooter(),
        ];
      case 'time-date':
        return [
          this.renderHeader(),
          this.renderTime(),
          this.renderCalendar(mode),
          this.renderCalendarViewMonthYearPicker(),
          this.renderFooter(),
        ];
      case 'time':
        return [this.renderHeader(false), this.renderTime(), this.renderFooter()];
      case 'month':
      case 'month-year':
      case 'year':
        return [this.renderHeader(false), this.renderWheelView(), this.renderFooter()];
      default:
        return [
          this.renderHeader(),
          this.renderCalendar(mode),
          this.renderCalendarViewMonthYearPicker(),
          this.renderFooter(),
        ];
    }
  }
  render() {
    const { name, value, disabled, el, color, isPresented, readonly, showMonthAndYear, preferWheel, presentation, size, } = this;
    const mode = getIonMode$1(this);
    const isMonthAndYearPresentation = presentation === 'year' || presentation === 'month' || presentation === 'month-year';
    const shouldShowMonthAndYear = showMonthAndYear || isMonthAndYearPresentation;
    const monthYearPickerOpen = showMonthAndYear && !isMonthAndYearPresentation;
    const hasDatePresentation = presentation === 'date' || presentation === 'date-time' || presentation === 'time-date';
    const hasWheelVariant = hasDatePresentation && preferWheel;
    const hasGrid = hasDatePresentation && !preferWheel;
    renderHiddenInput(true, el, name, formatValue(value), disabled);
    return (h(Host, { "aria-disabled": disabled ? 'true' : null, onFocus: this.onFocus, onBlur: this.onBlur, class: Object.assign({}, createColorClasses$1(color, {
        [mode]: true,
        ['datetime-presented']: isPresented,
        ['datetime-readonly']: readonly,
        ['datetime-disabled']: disabled,
        'show-month-and-year': shouldShowMonthAndYear,
        'month-year-picker-open': monthYearPickerOpen,
        [`datetime-presentation-${presentation}`]: true,
        [`datetime-size-${size}`]: true,
        [`datetime-prefer-wheel`]: hasWheelVariant,
        [`datetime-grid`]: hasGrid,
      })) }, this.renderDatetime(mode)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledChanged"],
    "min": ["minChanged"],
    "max": ["maxChanged"],
    "yearValues": ["yearValuesChanged"],
    "monthValues": ["monthValuesChanged"],
    "dayValues": ["dayValuesChanged"],
    "hourValues": ["hourValuesChanged"],
    "minuteValues": ["minuteValuesChanged"],
    "activeParts": ["activePartsChanged"],
    "value": ["valueChanged"]
  }; }
};
let datetimeIds = 0;
Datetime.style = {
  ios: datetimeIosCss,
  md: datetimeMdCss
};

let CACHED_MAP;
const getIconMap = () => {
  if (typeof window === 'undefined') {
    return new Map();
  }
  else {
    if (!CACHED_MAP) {
      const win = window;
      win.Ionicons = win.Ionicons || {};
      CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
    }
    return CACHED_MAP;
  }
};
const getUrl = (i) => {
  let url = getSrc(i.src);
  if (url) {
    return url;
  }
  url = getName(i.name, i.icon, i.mode, i.ios, i.md);
  if (url) {
    return getNamedUrl(url);
  }
  if (i.icon) {
    url = getSrc(i.icon);
    if (url) {
      return url;
    }
    url = getSrc(i.icon[i.mode]);
    if (url) {
      return url;
    }
  }
  return null;
};
const getNamedUrl = (iconName) => {
  const url = getIconMap().get(iconName);
  if (url) {
    return url;
  }
  return getAssetPath(`svg/${iconName}.svg`);
};
const getName = (iconName, icon, mode, ios, md) => {
  // default to "md" if somehow the mode wasn't set
  mode = (mode && toLower(mode)) === 'ios' ? 'ios' : 'md';
  // if an icon was passed in using the ios or md attributes
  // set the iconName to whatever was passed in
  if (ios && mode === 'ios') {
    iconName = toLower(ios);
  }
  else if (md && mode === 'md') {
    iconName = toLower(md);
  }
  else {
    if (!iconName && icon && !isSrc(icon)) {
      iconName = icon;
    }
    if (isStr(iconName)) {
      iconName = toLower(iconName);
    }
  }
  if (!isStr(iconName) || iconName.trim() === '') {
    return null;
  }
  // only allow alpha characters and dash
  const invalidChars = iconName.replace(/[a-z]|-|\d/gi, '');
  if (invalidChars !== '') {
    return null;
  }
  return iconName;
};
const getSrc = (src) => {
  if (isStr(src)) {
    src = src.trim();
    if (isSrc(src)) {
      return src;
    }
  }
  return null;
};
const isSrc = (str) => str.length > 0 && /(\/|\.)/.test(str);
const isStr = (val) => typeof val === 'string';
const toLower = (val) => val.toLowerCase();
/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `ion-input` should inherit
 * the `title` attribute that developers set directly on `ion-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
const inheritAttributes = (el, attributes = []) => {
  const attributeObject = {};
  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }
      el.removeAttribute(attr);
    }
  });
  return attributeObject;
};
/**
 * Returns `true` if the document or host element
 * has a `dir` set to `rtl`. The host value will always
 * take priority over the root document value.
 */
const isRTL = (hostEl) => {
  if (hostEl) {
    if (hostEl.dir !== '') {
      return hostEl.dir.toLowerCase() === 'rtl';
    }
  }
  return (document === null || document === void 0 ? void 0 : document.dir.toLowerCase()) === 'rtl';
};

const validateContent = (svgContent) => {
  const div = document.createElement('div');
  div.innerHTML = svgContent;
  // setup this way to ensure it works on our buddy IE
  for (let i = div.childNodes.length - 1; i >= 0; i--) {
    if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
      div.removeChild(div.childNodes[i]);
    }
  }
  // must only have 1 root element
  const svgElm = div.firstElementChild;
  if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
    const svgClass = svgElm.getAttribute('class') || '';
    svgElm.setAttribute('class', (svgClass + ' s-ion-icon').trim());
    // root element must be an svg
    // lets double check we've got valid elements
    // do not allow scripts
    if (isValid(svgElm)) {
      return div.innerHTML;
    }
  }
  return '';
};
const isValid = (elm) => {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === 'script') {
      return false;
    }
    for (let i = 0; i < elm.attributes.length; i++) {
      const name = elm.attributes[i].name;
      if (isStr(name) && name.toLowerCase().indexOf('on') === 0) {
        return false;
      }
    }
    for (let i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i])) {
        return false;
      }
    }
  }
  return true;
};
const isSvgDataUrl = (url) => url.startsWith('data:image/svg+xml');
const isEncodedDataUrl = (url) => url.indexOf(';utf8,') !== -1;

const ioniconContent = new Map();
const requests = new Map();
let parser;
const getSvgContent = (url, sanitize) => {
  // see if we already have a request for this url
  let req = requests.get(url);
  if (!req) {
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
      /**
       * If the url is a data url of an svg, then try to parse it
       * with the DOMParser. This works with content security policies enabled.
       */
      if (isSvgDataUrl(url) && isEncodedDataUrl(url)) {
        if (!parser) {
          /**
           * Create an instance of the DOM parser. This creates a single
           * parser instance for the entire app, which is more efficient.
           */
          parser = new DOMParser();
        }
        const doc = parser.parseFromString(url, 'text/html');
        const svg = doc.querySelector('svg');
        if (svg) {
          ioniconContent.set(url, svg.outerHTML);
        }
        return Promise.resolve();
      }
      else {
        // we don't already have a request
        req = fetch(url).then((rsp) => {
          if (rsp.ok) {
            return rsp.text().then((svgContent) => {
              if (svgContent && sanitize !== false) {
                svgContent = validateContent(svgContent);
              }
              ioniconContent.set(url, svgContent || '');
            });
          }
          ioniconContent.set(url, '');
        });
        // cache for the same requests
        requests.set(url, req);
      }
    }
    else {
      // set to empty for ssr scenarios and resolve promise
      ioniconContent.set(url, '');
      return Promise.resolve();
    }
  }
  return req;
};

const iconCss = ":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:32px;stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner,.ionicon,svg{display:block;height:100%;width:100%}@supports (background: -webkit-named-image(i)){:host(.icon-rtl) .icon-inner{transform:scaleX(-1)}}@supports not selector(:dir(rtl)) and selector(:host-context([dir='rtl'])){:host(.icon-rtl) .icon-inner{transform:scaleX(-1)}}:host(.flip-rtl):host-context([dir='rtl']) .icon-inner{transform:scaleX(-1)}@supports selector(:dir(rtl)){:host(.flip-rtl:dir(rtl)) .icon-inner{transform:scaleX(-1)}:host(.flip-rtl:dir(ltr)) .icon-inner{transform:scaleX(1)}}:host(.icon-small){font-size:18px !important}:host(.icon-large){font-size:32px !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}";

const Icon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconName = null;
    this.inheritedAttributes = {};
    this.isVisible = false;
    /**
     * The mode determines which platform styles to use.
     */
    this.mode = getIonMode();
    /**
     * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
     * Default, `false`.
     */
    this.lazy = false;
    /**
     * When set to `false`, SVG content that is HTTP fetched will not be checked
     * if the response SVG content has any `<script>` elements, or any attributes
     * that start with `on`, such as `onclick`.
     * @default true
     */
    this.sanitize = true;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  connectedCallback() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }
  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }
  waitUntilVisible(el, rootMargin, cb) {
    if (this.lazy && typeof window !== 'undefined' && window.IntersectionObserver) {
      const io = (this.io = new window.IntersectionObserver((data) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, { rootMargin }));
      io.observe(el);
    }
    else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
  loadIcon() {
    if (this.isVisible) {
      const url = getUrl(this);
      if (url) {
        if (ioniconContent.has(url)) {
          // sync if it's already loaded
          this.svgContent = ioniconContent.get(url);
        }
        else {
          // async if it hasn't been loaded
          getSvgContent(url, this.sanitize).then(() => (this.svgContent = ioniconContent.get(url)));
        }
      }
    }
    this.iconName = getName(this.name, this.icon, this.mode, this.ios, this.md);
  }
  render() {
    const { flipRtl, iconName, inheritedAttributes, el } = this;
    const mode = this.mode || 'md';
    // we have designated that arrows & chevrons should automatically flip (unless flip-rtl is set to false) because "back" is left in ltr and right in rtl, and "forward" is the opposite
    const shouldAutoFlip = iconName
      ? (iconName.includes('arrow') || iconName.includes('chevron')) && flipRtl !== false
      : false;
    // if shouldBeFlippable is true, the icon should change direction when `dir` changes
    const shouldBeFlippable = flipRtl || shouldAutoFlip;
    return (h(Host, Object.assign({ role: "img", class: Object.assign(Object.assign({ [mode]: true }, createColorClasses(this.color)), { [`icon-${this.size}`]: !!this.size, 'flip-rtl': shouldBeFlippable, 'icon-rtl': shouldBeFlippable && isRTL(el) }) }, inheritedAttributes), this.svgContent ? (h("div", { class: "icon-inner", innerHTML: this.svgContent })) : (h("div", { class: "icon-inner" }))));
  }
  static get assetsDirs() { return ["svg"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "name": ["loadIcon"],
    "src": ["loadIcon"],
    "icon": ["loadIcon"],
    "ios": ["loadIcon"],
    "md": ["loadIcon"]
  }; }
};
const getIonMode = () => (typeof document !== 'undefined' && document.documentElement.getAttribute('mode')) || 'md';
const createColorClasses = (color) => {
  return color
    ? {
      'ion-color': true,
      [`ion-color-${color}`]: true,
    }
    : null;
};
Icon.style = iconCss;

const itemIosCss = ":host{--border-radius:0px;--border-width:0px;--border-style:solid;--padding-top:0px;--padding-bottom:0px;--padding-end:0px;--padding-start:0px;--inner-border-width:0px;--inner-padding-top:0px;--inner-padding-bottom:0px;--inner-padding-start:0px;--inner-padding-end:0px;--inner-box-shadow:none;--show-full-highlight:0;--show-inset-highlight:0;--detail-icon-color:initial;--detail-icon-font-size:20px;--detail-icon-opacity:0.25;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;align-items:center;justify-content:space-between;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:initial;text-decoration:none;overflow:hidden;box-sizing:border-box}:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-native,:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-inner{border-color:var(--ion-color-shade)}:host(.ion-activated) .item-native{color:var(--color-activated)}:host(.ion-activated) .item-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.ion-color.ion-activated) .item-native{color:var(--ion-color-contrast)}:host(.ion-focused) .item-native{color:var(--color-focused)}:host(.ion-focused) .item-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(.ion-color.ion-focused) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-focused) .item-native::after{background:var(--ion-color-contrast)}@media (any-hover: hover){:host(.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--color-hover)}:host(.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--ion-color-contrast)}}:host(.item-interactive-disabled:not(.item-multiple-inputs)){cursor:default;pointer-events:none}:host(.item-disabled){cursor:default;opacity:0.3;pointer-events:none}.item-native{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-inline-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:flex;position:relative;align-items:inherit;justify-content:inherit;width:100%;min-height:var(--min-height);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);overflow:inherit;box-sizing:border-box;z-index:1}.item-native::-moz-focus-inner{border:0}.item-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0;transition:var(--transition);z-index:-1}button,a{cursor:pointer;user-select:none;-webkit-user-drag:none}.item-inner{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--inner-padding-start);padding-inline-start:var(--inner-padding-start);-webkit-padding-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-inline-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-top:var(--inner-padding-top);padding-bottom:var(--inner-padding-bottom);display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);box-shadow:var(--inner-box-shadow);overflow:inherit;box-sizing:border-box}.item-bottom{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-inline-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));-webkit-padding-end:var(--inner-padding-end);padding-inline-end:var(--inner-padding-end);padding-top:0;padding-bottom:0;display:flex;justify-content:space-between}.item-detail-icon{-webkit-margin-start:calc(var(--inner-padding-end) / 2);margin-inline-start:calc(var(--inner-padding-end) / 2);-webkit-margin-end:-6px;margin-inline-end:-6px;color:var(--detail-icon-color);font-size:var(--detail-icon-font-size);opacity:var(--detail-icon-opacity)}::slotted(ion-icon){font-size:1.6em}::slotted(ion-button){--margin-top:0;--margin-bottom:0;--margin-start:0;--margin-end:0;z-index:1}::slotted(ion-label:not([slot=end])){flex:1}:host(.item-input){align-items:center}.input-wrapper{display:flex;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;text-overflow:ellipsis;overflow:inherit;box-sizing:border-box}:host(.item-label-stacked),:host(.item-label-floating){align-items:start}:host(.item-label-stacked) .input-wrapper,:host(.item-label-floating) .input-wrapper{flex:1;flex-direction:column}.item-highlight,.item-inner-highlight{left:0;right:0;top:0;bottom:0;border-radius:inherit;position:absolute;width:100%;height:100%;transform:scaleX(0);transition:transform 200ms, border-bottom-width 200ms;z-index:2;box-sizing:border-box;pointer-events:none}:host(.item-interactive.ion-focused),:host(.item-interactive.item-has-focus),:host(.item-interactive.ion-touched.ion-invalid){--full-highlight-height:calc(var(--highlight-height) * var(--show-full-highlight));--inset-highlight-height:calc(var(--highlight-height) * var(--show-inset-highlight))}:host(.ion-focused) .item-highlight,:host(.ion-focused) .item-inner-highlight,:host(.item-has-focus) .item-highlight,:host(.item-has-focus) .item-inner-highlight{transform:scaleX(1);border-style:var(--border-style);border-color:var(--highlight-background)}:host(.ion-focused) .item-highlight,:host(.item-has-focus) .item-highlight{border-width:var(--full-highlight-height);opacity:var(--show-full-highlight)}:host(.ion-focused) .item-inner-highlight,:host(.item-has-focus) .item-inner-highlight{border-bottom-width:var(--inset-highlight-height);opacity:var(--show-inset-highlight)}:host(.ion-focused.item-fill-solid) .item-highlight,:host(.item-has-focus.item-fill-solid) .item-highlight{border-width:calc(var(--full-highlight-height) - 1px)}:host(.ion-focused) .item-inner-highlight,:host(.ion-focused:not(.item-fill-outline)) .item-highlight,:host(.item-has-focus) .item-inner-highlight,:host(.item-has-focus:not(.item-fill-outline)) .item-highlight{border-top:none;border-right:none;border-left:none}:host(.item-interactive.ion-focused),:host(.item-interactive.item-has-focus){--highlight-background:var(--highlight-color-focused)}:host(.item-interactive.ion-valid){--highlight-background:var(--highlight-color-valid)}:host(.item-interactive.ion-invalid){--highlight-background:var(--highlight-color-invalid)}:host(.item-interactive.ion-invalid) ::slotted([slot=helper]){display:none}::slotted([slot=error]){display:none;color:var(--highlight-color-invalid)}:host(.item-interactive.ion-invalid) ::slotted([slot=error]){display:block}:host(:not(.item-label)) ::slotted(ion-select.legacy-select){--padding-start:0;max-width:none}:host(.item-label-stacked) ::slotted(ion-select.legacy-select),:host(.item-label-floating) ::slotted(ion-select.legacy-select){--padding-top:8px;--padding-bottom:8px;--padding-start:0;align-self:stretch;width:100%;max-width:100%}:host(:not(.item-label)) ::slotted(ion-datetime){--padding-start:0}:host(.item-label-stacked) ::slotted(ion-datetime),:host(.item-label-floating) ::slotted(ion-datetime){--padding-start:0;width:100%}:host(.item-multiple-inputs) ::slotted(ion-checkbox),:host(.item-multiple-inputs) ::slotted(ion-datetime),:host(.item-multiple-inputs) ::slotted(ion-radio),:host(.item-multiple-inputs) ::slotted(ion-select.legacy-select){position:relative}:host(.item-textarea){align-items:stretch}::slotted(ion-reorder[slot]){margin-top:0;margin-bottom:0}ion-ripple-effect{color:var(--ripple-color)}:host(.item-fill-solid) ::slotted([slot=start]),:host(.item-fill-solid) ::slotted([slot=end]),:host(.item-fill-outline) ::slotted([slot=start]),:host(.item-fill-outline) ::slotted([slot=end]){align-self:center}::slotted([slot=helper]),::slotted([slot=error]),.item-counter{padding-top:5px;font-size:12px;z-index:1}.item-counter{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-550, #737373);white-space:nowrap;padding-inline-start:16px}@media (prefers-reduced-motion: reduce){.item-highlight,.item-inner-highlight{transition:none}}:host{--min-height:44px;--transition:background-color 200ms linear, opacity 200ms linear;--padding-start:16px;--inner-padding-end:16px;--inner-border-width:0px 0px 0.55px 0px;--background:var(--ion-item-background, var(--ion-background-color, #fff));--background-activated:var(--ion-text-color, #000);--background-focused:var(--ion-text-color, #000);--background-hover:currentColor;--background-activated-opacity:.12;--background-focused-opacity:.15;--background-hover-opacity:.04;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--color:var(--ion-item-color, var(--ion-text-color, #000));--highlight-height:0px;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--bottom-padding-start:0px;font-size:16px}:host(.ion-activated){--transition:none}:host(.ion-color.ion-focused) .item-native::after{background:#000;opacity:0.15}:host(.ion-color.ion-activated) .item-native::after{background:#000;opacity:0.12}:host(.item-interactive){--show-full-highlight:0;--show-inset-highlight:1}:host(.item-lines-full){--border-width:0px 0px 0.55px 0px;--show-full-highlight:1;--show-inset-highlight:0}:host(.item-lines-inset){--inner-border-width:0px 0px 0.55px 0px;--show-full-highlight:0;--show-inset-highlight:1}:host(.item-lines-inset),:host(.item-lines-none){--border-width:0px;--show-full-highlight:0}:host(.item-lines-full),:host(.item-lines-none){--inner-border-width:0px;--show-inset-highlight:0}.item-highlight,.item-inner-highlight{transition:none}:host(.item-has-focus) .item-inner-highlight,:host(.item-has-focus) .item-highlight{border-top:none;border-right:none;border-left:none}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:2px;margin-bottom:2px}::slotted(ion-icon[slot=start]),::slotted(ion-icon[slot=end]){margin-top:7px;margin-bottom:7px}::slotted(ion-toggle[slot=start]),::slotted(ion-toggle[slot=end]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}:host(.item-label-stacked) ::slotted([slot=end]),:host(.item-label-floating) ::slotted([slot=end]){margin-top:7px;margin-bottom:7px}::slotted(.button-small){--padding-top:0px;--padding-bottom:0px;--padding-start:.5em;--padding-end:.5em;height:24px;font-size:13px}::slotted(ion-avatar){width:36px;height:36px}::slotted(ion-thumbnail){--size:56px}::slotted(ion-avatar[slot=end]),::slotted(ion-thumbnail[slot=end]){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:8px;margin-bottom:8px}:host(.item-radio) ::slotted(ion-label),:host(.item-toggle) ::slotted(ion-label){-webkit-margin-start:0px;margin-inline-start:0px}::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:10px;margin-bottom:10px}:host(.item-label-floating),:host(.item-label-stacked){--min-height:68px}:host(.item-label-stacked) ::slotted(ion-select.legacy-select),:host(.item-label-floating) ::slotted(ion-select.legacy-select){--padding-top:8px;--padding-bottom:8px;--padding-start:0px}:host(.item-label-fixed) ::slotted(ion-select.legacy-select),:host(.item-label-fixed) ::slotted(ion-datetime){--padding-start:0}";

const itemMdCss = ":host{--border-radius:0px;--border-width:0px;--border-style:solid;--padding-top:0px;--padding-bottom:0px;--padding-end:0px;--padding-start:0px;--inner-border-width:0px;--inner-padding-top:0px;--inner-padding-bottom:0px;--inner-padding-start:0px;--inner-padding-end:0px;--inner-box-shadow:none;--show-full-highlight:0;--show-inset-highlight:0;--detail-icon-color:initial;--detail-icon-font-size:20px;--detail-icon-opacity:0.25;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;align-items:center;justify-content:space-between;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:initial;text-decoration:none;overflow:hidden;box-sizing:border-box}:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-native,:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-inner{border-color:var(--ion-color-shade)}:host(.ion-activated) .item-native{color:var(--color-activated)}:host(.ion-activated) .item-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.ion-color.ion-activated) .item-native{color:var(--ion-color-contrast)}:host(.ion-focused) .item-native{color:var(--color-focused)}:host(.ion-focused) .item-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(.ion-color.ion-focused) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-focused) .item-native::after{background:var(--ion-color-contrast)}@media (any-hover: hover){:host(.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--color-hover)}:host(.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--ion-color-contrast)}}:host(.item-interactive-disabled:not(.item-multiple-inputs)){cursor:default;pointer-events:none}:host(.item-disabled){cursor:default;opacity:0.3;pointer-events:none}.item-native{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-inline-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:flex;position:relative;align-items:inherit;justify-content:inherit;width:100%;min-height:var(--min-height);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);overflow:inherit;box-sizing:border-box;z-index:1}.item-native::-moz-focus-inner{border:0}.item-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0;transition:var(--transition);z-index:-1}button,a{cursor:pointer;user-select:none;-webkit-user-drag:none}.item-inner{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--inner-padding-start);padding-inline-start:var(--inner-padding-start);-webkit-padding-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-inline-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-top:var(--inner-padding-top);padding-bottom:var(--inner-padding-bottom);display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);box-shadow:var(--inner-box-shadow);overflow:inherit;box-sizing:border-box}.item-bottom{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-inline-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));-webkit-padding-end:var(--inner-padding-end);padding-inline-end:var(--inner-padding-end);padding-top:0;padding-bottom:0;display:flex;justify-content:space-between}.item-detail-icon{-webkit-margin-start:calc(var(--inner-padding-end) / 2);margin-inline-start:calc(var(--inner-padding-end) / 2);-webkit-margin-end:-6px;margin-inline-end:-6px;color:var(--detail-icon-color);font-size:var(--detail-icon-font-size);opacity:var(--detail-icon-opacity)}::slotted(ion-icon){font-size:1.6em}::slotted(ion-button){--margin-top:0;--margin-bottom:0;--margin-start:0;--margin-end:0;z-index:1}::slotted(ion-label:not([slot=end])){flex:1}:host(.item-input){align-items:center}.input-wrapper{display:flex;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;text-overflow:ellipsis;overflow:inherit;box-sizing:border-box}:host(.item-label-stacked),:host(.item-label-floating){align-items:start}:host(.item-label-stacked) .input-wrapper,:host(.item-label-floating) .input-wrapper{flex:1;flex-direction:column}.item-highlight,.item-inner-highlight{left:0;right:0;top:0;bottom:0;border-radius:inherit;position:absolute;width:100%;height:100%;transform:scaleX(0);transition:transform 200ms, border-bottom-width 200ms;z-index:2;box-sizing:border-box;pointer-events:none}:host(.item-interactive.ion-focused),:host(.item-interactive.item-has-focus),:host(.item-interactive.ion-touched.ion-invalid){--full-highlight-height:calc(var(--highlight-height) * var(--show-full-highlight));--inset-highlight-height:calc(var(--highlight-height) * var(--show-inset-highlight))}:host(.ion-focused) .item-highlight,:host(.ion-focused) .item-inner-highlight,:host(.item-has-focus) .item-highlight,:host(.item-has-focus) .item-inner-highlight{transform:scaleX(1);border-style:var(--border-style);border-color:var(--highlight-background)}:host(.ion-focused) .item-highlight,:host(.item-has-focus) .item-highlight{border-width:var(--full-highlight-height);opacity:var(--show-full-highlight)}:host(.ion-focused) .item-inner-highlight,:host(.item-has-focus) .item-inner-highlight{border-bottom-width:var(--inset-highlight-height);opacity:var(--show-inset-highlight)}:host(.ion-focused.item-fill-solid) .item-highlight,:host(.item-has-focus.item-fill-solid) .item-highlight{border-width:calc(var(--full-highlight-height) - 1px)}:host(.ion-focused) .item-inner-highlight,:host(.ion-focused:not(.item-fill-outline)) .item-highlight,:host(.item-has-focus) .item-inner-highlight,:host(.item-has-focus:not(.item-fill-outline)) .item-highlight{border-top:none;border-right:none;border-left:none}:host(.item-interactive.ion-focused),:host(.item-interactive.item-has-focus){--highlight-background:var(--highlight-color-focused)}:host(.item-interactive.ion-valid){--highlight-background:var(--highlight-color-valid)}:host(.item-interactive.ion-invalid){--highlight-background:var(--highlight-color-invalid)}:host(.item-interactive.ion-invalid) ::slotted([slot=helper]){display:none}::slotted([slot=error]){display:none;color:var(--highlight-color-invalid)}:host(.item-interactive.ion-invalid) ::slotted([slot=error]){display:block}:host(:not(.item-label)) ::slotted(ion-select.legacy-select){--padding-start:0;max-width:none}:host(.item-label-stacked) ::slotted(ion-select.legacy-select),:host(.item-label-floating) ::slotted(ion-select.legacy-select){--padding-top:8px;--padding-bottom:8px;--padding-start:0;align-self:stretch;width:100%;max-width:100%}:host(:not(.item-label)) ::slotted(ion-datetime){--padding-start:0}:host(.item-label-stacked) ::slotted(ion-datetime),:host(.item-label-floating) ::slotted(ion-datetime){--padding-start:0;width:100%}:host(.item-multiple-inputs) ::slotted(ion-checkbox),:host(.item-multiple-inputs) ::slotted(ion-datetime),:host(.item-multiple-inputs) ::slotted(ion-radio),:host(.item-multiple-inputs) ::slotted(ion-select.legacy-select){position:relative}:host(.item-textarea){align-items:stretch}::slotted(ion-reorder[slot]){margin-top:0;margin-bottom:0}ion-ripple-effect{color:var(--ripple-color)}:host(.item-fill-solid) ::slotted([slot=start]),:host(.item-fill-solid) ::slotted([slot=end]),:host(.item-fill-outline) ::slotted([slot=start]),:host(.item-fill-outline) ::slotted([slot=end]){align-self:center}::slotted([slot=helper]),::slotted([slot=error]),.item-counter{padding-top:5px;font-size:12px;z-index:1}.item-counter{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-550, #737373);white-space:nowrap;padding-inline-start:16px}@media (prefers-reduced-motion: reduce){.item-highlight,.item-inner-highlight{transition:none}}:host{--min-height:48px;--background:var(--ion-item-background, var(--ion-background-color, #fff));--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--color:var(--ion-item-color, var(--ion-text-color, #000));--transition:opacity 15ms linear, background-color 15ms linear;--padding-start:16px;--inner-padding-end:16px;--inner-border-width:0 0 1px 0;--highlight-height:1px;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);font-size:16px;font-weight:normal;text-transform:none}:host(.item-fill-outline){--highlight-height:2px}:host(.item-fill-none.item-interactive.ion-focus) .item-highlight,:host(.item-fill-none.item-interactive.item-has-focus) .item-highlight,:host(.item-fill-none.item-interactive.ion-touched.ion-invalid) .item-highlight{transform:scaleX(1);border-width:0 0 var(--full-highlight-height) 0;border-style:var(--border-style);border-color:var(--highlight-background)}:host(.item-fill-none.item-interactive.ion-focus) .item-native,:host(.item-fill-none.item-interactive.item-has-focus) .item-native,:host(.item-fill-none.item-interactive.ion-touched.ion-invalid) .item-native{border-bottom-color:var(--highlight-background)}:host(.item-fill-outline.item-interactive.ion-focus) .item-highlight,:host(.item-fill-outline.item-interactive.item-has-focus) .item-highlight{transform:scaleX(1)}:host(.item-fill-outline.item-interactive.ion-focus) .item-highlight,:host(.item-fill-outline.item-interactive.item-has-focus) .item-highlight,:host(.item-fill-outline.item-interactive.ion-touched.ion-invalid) .item-highlight{border-width:var(--full-highlight-height);border-style:var(--border-style);border-color:var(--highlight-background)}:host(.item-fill-outline.item-interactive.ion-touched.ion-invalid) .item-native{border-color:var(--highlight-background)}:host(.item-fill-solid.item-interactive.ion-focus) .item-highlight,:host(.item-fill-solid.item-interactive.item-has-focus) .item-highlight,:host(.item-fill-solid.item-interactive.ion-touched.ion-invalid) .item-highlight{transform:scaleX(1);border-width:0 0 var(--full-highlight-height) 0;border-style:var(--border-style);border-color:var(--highlight-background)}:host(.item-fill-solid.item-interactive.ion-focus) .item-native,:host(.item-fill-solid.item-interactive.item-has-focus) .item-native,:host(.item-fill-solid.item-interactive.ion-touched.ion-invalid) .item-native{border-bottom-color:var(--highlight-background)}:host(.ion-color.ion-activated) .item-native::after{background:transparent}:host(.item-has-focus) .item-native{caret-color:var(--highlight-background)}:host(.item-interactive){--border-width:0 0 1px 0;--inner-border-width:0;--show-full-highlight:1;--show-inset-highlight:0}:host(.item-lines-full){--border-width:0 0 1px 0;--show-full-highlight:1;--show-inset-highlight:0}:host(.item-lines-inset){--inner-border-width:0 0 1px 0;--show-full-highlight:0;--show-inset-highlight:1}:host(.item-lines-inset),:host(.item-lines-none){--border-width:0;--show-full-highlight:0}:host(.item-lines-full),:host(.item-lines-none){--inner-border-width:0;--show-inset-highlight:0}:host(.item-fill-outline) .item-highlight{--position-offset:calc(-1 * var(--border-width));top:var(--position-offset);width:calc(100% + 2 * var(--border-width));height:calc(100% + 2 * var(--border-width));transition:none}@supports (inset-inline-start: 0){:host(.item-fill-outline) .item-highlight{inset-inline-start:var(--position-offset)}}@supports not (inset-inline-start: 0){:host(.item-fill-outline) .item-highlight{left:var(--position-offset)}:host-context([dir=rtl]):host(.item-fill-outline) .item-highlight,:host-context([dir=rtl]).item-fill-outline .item-highlight{left:unset;right:unset;right:var(--position-offset)}@supports selector(:dir(rtl)){:host(.item-fill-outline) .item-highlight:dir(rtl){left:unset;right:unset;right:var(--position-offset)}}}:host(.item-fill-outline.ion-focused) .item-native,:host(.item-fill-outline.item-has-focus) .item-native{border-color:transparent}:host(.item-multi-line) ::slotted([slot=start]),:host(.item-multi-line) ::slotted([slot=end]){margin-top:16px;margin-bottom:16px;align-self:flex-start}::slotted([slot=start]){-webkit-margin-end:32px;margin-inline-end:32px}::slotted([slot=end]){-webkit-margin-start:32px;margin-inline-start:32px}:host(.item-fill-solid) ::slotted([slot=start]),:host(.item-fill-solid) ::slotted([slot=end]),:host(.item-fill-outline) ::slotted([slot=start]),:host(.item-fill-outline) ::slotted([slot=end]){align-self:center}::slotted(ion-icon){color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54);font-size:24px}:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) ::slotted(ion-icon){color:var(--ion-color-contrast)}::slotted(ion-icon[slot]){margin-top:12px;margin-bottom:12px}::slotted(ion-icon[slot=start]){-webkit-margin-end:32px;margin-inline-end:32px}::slotted(ion-icon[slot=end]){-webkit-margin-start:16px;margin-inline-start:16px}:host(.item-fill-solid) ::slotted(ion-icon[slot=start]),:host(.item-fill-outline) ::slotted(ion-icon[slot=start]){-webkit-margin-end:8px;margin-inline-end:8px}::slotted(ion-toggle[slot=start]),::slotted(ion-toggle[slot=end]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}::slotted(ion-note){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;align-self:flex-start;font-size:11px}::slotted(ion-note[slot]:not([slot=helper]):not([slot=error])){padding-left:0;padding-right:0;padding-top:18px;padding-bottom:10px}::slotted(ion-note[slot=start]){-webkit-padding-end:16px;padding-inline-end:16px}::slotted(ion-note[slot=end]){-webkit-padding-start:16px;padding-inline-start:16px}::slotted(ion-avatar){width:40px;height:40px}::slotted(ion-thumbnail){--size:56px}::slotted(ion-avatar),::slotted(ion-thumbnail){margin-top:8px;margin-bottom:8px}::slotted(ion-avatar[slot=start]),::slotted(ion-thumbnail[slot=start]){-webkit-margin-end:16px;margin-inline-end:16px}::slotted(ion-avatar[slot=end]),::slotted(ion-thumbnail[slot=end]){-webkit-margin-start:16px;margin-inline-start:16px}::slotted(ion-label){margin-left:0;margin-right:0;margin-top:10px;margin-bottom:10px}:host(.item-label-stacked) ::slotted([slot=end]),:host(.item-label-floating) ::slotted([slot=end]){margin-top:7px;margin-bottom:7px}:host(.item-label-fixed) ::slotted(ion-select.legacy-select),:host(.item-label-fixed) ::slotted(ion-datetime){--padding-start:8px}:host(.item-toggle) ::slotted(ion-label),:host(.item-radio) ::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0}::slotted(.button-small){--padding-top:0;--padding-bottom:0;--padding-start:.6em;--padding-end:.6em;height:25px;font-size:12px}:host(.item-label-floating),:host(.item-label-stacked){--min-height:55px}:host(.item-label-stacked) ::slotted(ion-select.legacy-select),:host(.item-label-floating) ::slotted(ion-select.legacy-select){--padding-top:8px;--padding-bottom:8px;--padding-start:0}:host(.ion-focused:not(.ion-color)) ::slotted(.label-stacked),:host(.ion-focused:not(.ion-color)) ::slotted(.label-floating),:host(.item-has-focus:not(.ion-color)) ::slotted(.label-stacked),:host(.item-has-focus:not(.ion-color)) ::slotted(.label-floating){color:var(--ion-color-primary, #3880ff)}:host(.ion-color){--highlight-color-focused:var(--ion-color-contrast)}:host(.item-label-color){--highlight-color-focused:var(--ion-color-base)}:host(.item-fill-solid.ion-color),:host(.item-fill-outline.ion-color){--highlight-color-focused:var(--ion-color-base)}:host(.item-fill-solid){--background:var(--ion-color-step-50, #f2f2f2);--background-hover:var(--ion-color-step-100, #e6e6e6);--background-focused:var(--ion-color-step-150, #d9d9d9);--border-width:0 0 1px 0;--inner-border-width:0;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.item-fill-solid),:host-context([dir=rtl]).item-fill-solid{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}@supports selector(:dir(rtl)){:host(.item-fill-solid):dir(rtl){border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}}:host(.item-fill-solid) .item-native{--border-color:var(--ion-color-step-500, gray)}:host(.item-fill-solid.ion-focused) .item-native,:host(.item-fill-solid.item-has-focus) .item-native{--background:var(--background-focused)}:host(.item-fill-solid.item-shape-round){border-top-left-radius:16px;border-top-right-radius:16px;border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.item-fill-solid.item-shape-round),:host-context([dir=rtl]).item-fill-solid.item-shape-round{border-top-left-radius:16px;border-top-right-radius:16px;border-bottom-right-radius:0;border-bottom-left-radius:0}@supports selector(:dir(rtl)){:host(.item-fill-solid.item-shape-round):dir(rtl){border-top-left-radius:16px;border-top-right-radius:16px;border-bottom-right-radius:0;border-bottom-left-radius:0}}@media (any-hover: hover){:host(.item-fill-solid:hover) .item-native{--background:var(--background-hover);--border-color:var(--ion-color-step-750, #404040)}}:host(.item-fill-outline){--ripple-color:transparent;--background-focused:transparent;--background-hover:transparent;--border-color:var(--ion-color-step-500, gray);--border-width:1px;border:none;overflow:visible}:host(.item-fill-outline) .item-native{--native-padding-left:16px;border-radius:4px}:host(.item-fill-outline.item-shape-round) .item-native{--inner-padding-start:16px;border-radius:28px}:host(.item-fill-outline.item-shape-round) .item-bottom{-webkit-padding-start:32px;padding-inline-start:32px}:host(.item-fill-outline.item-label-floating.ion-focused) .item-native ::slotted(ion-input:not(:first-child)),:host(.item-fill-outline.item-label-floating.ion-focused) .item-native ::slotted(ion-textarea:not(:first-child)),:host(.item-fill-outline.item-label-floating.item-has-focus) .item-native ::slotted(ion-input:not(:first-child)),:host(.item-fill-outline.item-label-floating.item-has-focus) .item-native ::slotted(ion-textarea:not(:first-child)),:host(.item-fill-outline.item-label-floating.item-has-value) .item-native ::slotted(ion-input:not(:first-child)),:host(.item-fill-outline.item-label-floating.item-has-value) .item-native ::slotted(ion-textarea:not(:first-child)){transform:translateY(-14px)}@media (any-hover: hover){:host(.item-fill-outline:hover) .item-native{--border-color:var(--ion-color-step-750, #404040)}}.item-counter{letter-spacing:0.0333333333em}";

const Item = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.labelColorStyles = {};
    this.itemStyles = new Map();
    this.inheritedAriaAttributes = {};
    this.multipleInputs = false;
    this.focusable = true;
    this.color = undefined;
    this.button = false;
    this.detail = undefined;
    this.detailIcon = chevronForward;
    this.disabled = false;
    this.download = undefined;
    this.fill = undefined;
    this.shape = undefined;
    this.href = undefined;
    this.rel = undefined;
    this.lines = undefined;
    this.counter = false;
    this.routerAnimation = undefined;
    this.routerDirection = 'forward';
    this.target = undefined;
    this.type = 'button';
    this.counterFormatter = undefined;
    this.counterString = undefined;
  }
  counterFormatterChanged() {
    this.updateCounterOutput(this.getFirstInput());
  }
  handleIonInput(ev) {
    if (this.counter && ev.target === this.getFirstInput()) {
      this.updateCounterOutput(ev.target);
    }
  }
  labelColorChanged(ev) {
    const { color } = this;
    // There will be a conflict with item color if
    // we apply the label color to item, so we ignore
    // the label color if the user sets a color on item
    if (color === undefined) {
      this.labelColorStyles = ev.detail;
    }
  }
  itemStyle(ev) {
    ev.stopPropagation();
    const tagName = ev.target.tagName;
    const updatedStyles = ev.detail;
    const newStyles = {};
    const childStyles = this.itemStyles.get(tagName) || {};
    let hasStyleChange = false;
    Object.keys(updatedStyles).forEach((key) => {
      if (updatedStyles[key]) {
        const itemKey = `item-${key}`;
        if (!childStyles[itemKey]) {
          hasStyleChange = true;
        }
        newStyles[itemKey] = true;
      }
    });
    if (!hasStyleChange && Object.keys(newStyles).length !== Object.keys(childStyles).length) {
      hasStyleChange = true;
    }
    if (hasStyleChange) {
      this.itemStyles.set(tagName, newStyles);
      forceUpdate(this);
    }
  }
  connectedCallback() {
    if (this.counter) {
      this.updateCounterOutput(this.getFirstInput());
    }
    this.hasStartEl();
  }
  componentWillLoad() {
    this.inheritedAriaAttributes = inheritAttributes$1(this.el, ['aria-label']);
  }
  componentDidLoad() {
    const { el, counter, counterFormatter, fill, shape } = this;
    const hasHelperSlot = el.querySelector('[slot="helper"]') !== null;
    if (hasHelperSlot) {
      printIonWarning('The "helper" slot has been deprecated in favor of using the "helperText" property on ion-input or ion-textarea.', el);
    }
    const hasErrorSlot = el.querySelector('[slot="error"]') !== null;
    if (hasErrorSlot) {
      printIonWarning('The "error" slot has been deprecated in favor of using the "errorText" property on ion-input or ion-textarea.', el);
    }
    if (counter === true) {
      printIonWarning('The "counter" property has been deprecated in favor of using the "counter" property on ion-input or ion-textarea.', el);
    }
    if (counterFormatter !== undefined) {
      printIonWarning('The "counterFormatter" property has been deprecated in favor of using the "counterFormatter" property on ion-input or ion-textarea.', el);
    }
    if (fill !== undefined) {
      printIonWarning('The "fill" property has been deprecated in favor of using the "fill" property on ion-input or ion-textarea.', el);
    }
    if (shape !== undefined) {
      printIonWarning('The "shape" property has been deprecated in favor of using the "shape" property on ion-input or ion-textarea.', el);
    }
    raf(() => {
      this.setMultipleInputs();
      this.focusable = this.isFocusable();
    });
  }
  // If the item contains multiple clickable elements and/or inputs, then the item
  // should not have a clickable input cover over the entire item to prevent
  // interfering with their individual click events
  setMultipleInputs() {
    // The following elements have a clickable cover that is relative to the entire item
    const covers = this.el.querySelectorAll('ion-checkbox, ion-datetime, ion-select, ion-radio');
    // The following elements can accept focus alongside the previous elements
    // therefore if these elements are also a child of item, we don't want the
    // input cover on top of those interfering with their clicks
    const inputs = this.el.querySelectorAll('ion-input, ion-range, ion-searchbar, ion-segment, ion-textarea, ion-toggle');
    // The following elements should also stay clickable when an input with cover is present
    const clickables = this.el.querySelectorAll('ion-anchor, ion-button, a, button');
    // Check for multiple inputs to change the position of the input cover to relative
    // for all of the covered inputs above
    this.multipleInputs =
      covers.length + inputs.length > 1 ||
        covers.length + clickables.length > 1 ||
        (covers.length > 0 && this.isClickable());
  }
  // If the item contains an input including a checkbox, datetime, select, or radio
  // then the item will have a clickable input cover that covers the item
  // that should get the hover, focused and activated states UNLESS it has multiple
  // inputs, then those need to individually get each click
  hasCover() {
    const inputs = this.el.querySelectorAll('ion-checkbox, ion-datetime, ion-select, ion-radio');
    return inputs.length === 1 && !this.multipleInputs;
  }
  // If the item has an href or button property it will render a native
  // anchor or button that is clickable
  isClickable() {
    return this.href !== undefined || this.button;
  }
  canActivate() {
    return this.isClickable() || this.hasCover();
  }
  isFocusable() {
    const focusableChild = this.el.querySelector('.ion-focusable');
    return this.canActivate() || focusableChild !== null;
  }
  getFirstInput() {
    const inputs = this.el.querySelectorAll('ion-input, ion-textarea');
    return inputs[0];
  }
  updateCounterOutput(inputEl) {
    var _a, _b;
    const { counter, counterFormatter, defaultCounterFormatter } = this;
    if (counter && !this.multipleInputs && (inputEl === null || inputEl === void 0 ? void 0 : inputEl.maxlength) !== undefined) {
      const length = (_b = (_a = inputEl === null || inputEl === void 0 ? void 0 : inputEl.value) === null || _a === void 0 ? void 0 : _a.toString().length) !== null && _b !== void 0 ? _b : 0;
      if (counterFormatter === undefined) {
        this.counterString = defaultCounterFormatter(length, inputEl.maxlength);
      }
      else {
        try {
          this.counterString = counterFormatter(length, inputEl.maxlength);
        }
        catch (e) {
          printIonError('Exception in provided `counterFormatter`.', e);
          // Fallback to the default counter formatter when an exception happens
          this.counterString = defaultCounterFormatter(length, inputEl.maxlength);
        }
      }
    }
  }
  defaultCounterFormatter(length, maxlength) {
    return `${length} / ${maxlength}`;
  }
  hasStartEl() {
    const startEl = this.el.querySelector('[slot="start"]');
    if (startEl !== null) {
      this.el.classList.add('item-has-start-slot');
    }
  }
  render() {
    const { counterString, detail, detailIcon, download, fill, labelColorStyles, lines, disabled, href, rel, shape, target, routerAnimation, routerDirection, inheritedAriaAttributes, } = this;
    const childStyles = {};
    const mode = getIonMode$1(this);
    const clickable = this.isClickable();
    const canActivate = this.canActivate();
    const TagType = clickable ? (href === undefined ? 'button' : 'a') : 'div';
    const attrs = TagType === 'button'
      ? { type: this.type }
      : {
        download,
        href,
        rel,
        target,
      };
    // Only set onClick if the item is clickable to prevent screen
    // readers from reading all items as clickable
    const clickFn = clickable
      ? {
        onClick: (ev) => {
          openURL(href, ev, routerDirection, routerAnimation);
        },
      }
      : {};
    const showDetail = detail !== undefined ? detail : mode === 'ios' && clickable;
    this.itemStyles.forEach((value) => {
      Object.assign(childStyles, value);
    });
    const ariaDisabled = disabled || childStyles['item-interactive-disabled'] ? 'true' : null;
    const fillValue = fill || 'none';
    const inList = hostContext('ion-list', this.el);
    return (h(Host, { "aria-disabled": ariaDisabled, class: Object.assign(Object.assign(Object.assign({}, childStyles), labelColorStyles), createColorClasses$1(this.color, {
        item: true,
        [mode]: true,
        'item-lines-default': lines === undefined,
        [`item-lines-${lines}`]: lines !== undefined,
        [`item-fill-${fillValue}`]: true,
        [`item-shape-${shape}`]: shape !== undefined,
        'item-disabled': disabled,
        'in-list': inList,
        'item-multiple-inputs': this.multipleInputs,
        'ion-activatable': canActivate,
        'ion-focusable': this.focusable,
        'item-rtl': document.dir === 'rtl',
      })), role: inList ? 'listitem' : null }, h(TagType, Object.assign({}, attrs, inheritedAriaAttributes, { class: "item-native", part: "native", disabled: disabled }, clickFn), h("slot", { name: "start" }), h("div", { class: "item-inner" }, h("div", { class: "input-wrapper" }, h("slot", null)), h("slot", { name: "end" }), showDetail && (h("ion-icon", { icon: detailIcon, lazy: false, class: "item-detail-icon", part: "detail-icon", "aria-hidden": "true", "flip-rtl": detailIcon === chevronForward })), h("div", { class: "item-inner-highlight" })), canActivate && mode === 'md' && h("ion-ripple-effect", null), h("div", { class: "item-highlight" })), h("div", { class: "item-bottom" }, h("slot", { name: "error" }), h("slot", { name: "helper" }), counterString && h("ion-note", { class: "item-counter" }, counterString))));
  }
  static get delegatesFocus() { return true; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "counterFormatter": ["counterFormatterChanged"]
  }; }
};
Item.style = {
  ios: itemIosCss,
  md: itemMdCss
};

const labelIosCss = ".item.sc-ion-label-ios-h,.item .sc-ion-label-ios-h{--color:initial;display:block;color:var(--color);font-family:var(--ion-font-family, inherit);font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;box-sizing:border-box}.ion-color.sc-ion-label-ios-h{color:var(--ion-color-base)}.ion-text-wrap.sc-ion-label-ios-h,[text-wrap].sc-ion-label-ios-h{white-space:normal}.item-interactive-disabled.sc-ion-label-ios-h:not(.item-multiple-inputs),.item-interactive-disabled:not(.item-multiple-inputs) .sc-ion-label-ios-h{cursor:default;opacity:0.3;pointer-events:none}.item-input.sc-ion-label-ios-h,.item-input .sc-ion-label-ios-h{flex:initial;max-width:200px;pointer-events:none}.item-textarea.sc-ion-label-ios-h,.item-textarea .sc-ion-label-ios-h{align-self:baseline}.label-fixed.sc-ion-label-ios-h{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.label-stacked.sc-ion-label-ios-h,.label-floating.sc-ion-label-ios-h{margin-bottom:0;align-self:stretch;width:auto;max-width:100%}.label-no-animate.label-floating.sc-ion-label-ios-h{transition:none}.sc-ion-label-ios-s h1,.sc-ion-label-ios-s h2,.sc-ion-label-ios-s h3,.sc-ion-label-ios-s h4,.sc-ion-label-ios-s h5,.sc-ion-label-ios-s h6{text-overflow:inherit;overflow:inherit}.ion-text-wrap.sc-ion-label-ios-h,[text-wrap].sc-ion-label-ios-h{font-size:14px;line-height:1.5}.label-stacked.sc-ion-label-ios-h{margin-bottom:4px;font-size:14px}.label-floating.sc-ion-label-ios-h{margin-bottom:0;transform:translate(0, 29px);transform-origin:left top;transition:transform 150ms ease-in-out}[dir=rtl].sc-ion-label-ios-h -no-combinator.label-floating.sc-ion-label-ios-h,[dir=rtl] .sc-ion-label-ios-h -no-combinator.label-floating.sc-ion-label-ios-h,[dir=rtl].label-floating.sc-ion-label-ios-h,[dir=rtl] .label-floating.sc-ion-label-ios-h{transform-origin:right top}@supports selector(:dir(rtl)){.label-floating.sc-ion-label-ios-h:dir(rtl){transform-origin:right top}}.item-textarea.label-floating.sc-ion-label-ios-h,.item-textarea .label-floating.sc-ion-label-ios-h{transform:translate(0, 28px)}.item-has-focus.label-floating.sc-ion-label-ios-h,.item-has-focus .label-floating.sc-ion-label-ios-h,.item-has-placeholder.sc-ion-label-ios-h:not(.item-input).label-floating,.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-ios-h,.item-has-value.label-floating.sc-ion-label-ios-h,.item-has-value .label-floating.sc-ion-label-ios-h{transform:scale(0.82)}.sc-ion-label-ios-s h1{margin-left:0;margin-right:0;margin-top:3px;margin-bottom:2px;font-size:22px;font-weight:normal}.sc-ion-label-ios-s h2{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:17px;font-weight:normal}.sc-ion-label-ios-s h3,.sc-ion-label-ios-s h4,.sc-ion-label-ios-s h5,.sc-ion-label-ios-s h6{margin-left:0;margin-right:0;margin-top:0;margin-bottom:3px;font-size:14px;font-weight:normal;line-height:normal}.sc-ion-label-ios-s p{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:14px;line-height:normal;text-overflow:inherit;overflow:inherit}.sc-ion-label-ios-s>p{color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.4)}.sc-ion-label-ios-h.in-item-color.sc-ion-label-ios-s>p{color:inherit}.sc-ion-label-ios-s h2:last-child,.sc-ion-label-ios-s h3:last-child,.sc-ion-label-ios-s h4:last-child,.sc-ion-label-ios-s h5:last-child,.sc-ion-label-ios-s h6:last-child,.sc-ion-label-ios-s p:last-child{margin-bottom:0}";

const labelMdCss = ".item.sc-ion-label-md-h,.item .sc-ion-label-md-h{--color:initial;display:block;color:var(--color);font-family:var(--ion-font-family, inherit);font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;box-sizing:border-box}.ion-color.sc-ion-label-md-h{color:var(--ion-color-base)}.ion-text-wrap.sc-ion-label-md-h,[text-wrap].sc-ion-label-md-h{white-space:normal}.item-interactive-disabled.sc-ion-label-md-h:not(.item-multiple-inputs),.item-interactive-disabled:not(.item-multiple-inputs) .sc-ion-label-md-h{cursor:default;opacity:0.3;pointer-events:none}.item-input.sc-ion-label-md-h,.item-input .sc-ion-label-md-h{flex:initial;max-width:200px;pointer-events:none}.item-textarea.sc-ion-label-md-h,.item-textarea .sc-ion-label-md-h{align-self:baseline}.label-fixed.sc-ion-label-md-h{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.label-stacked.sc-ion-label-md-h,.label-floating.sc-ion-label-md-h{margin-bottom:0;align-self:stretch;width:auto;max-width:100%}.label-no-animate.label-floating.sc-ion-label-md-h{transition:none}.sc-ion-label-md-s h1,.sc-ion-label-md-s h2,.sc-ion-label-md-s h3,.sc-ion-label-md-s h4,.sc-ion-label-md-s h5,.sc-ion-label-md-s h6{text-overflow:inherit;overflow:inherit}.ion-text-wrap.sc-ion-label-md-h,[text-wrap].sc-ion-label-md-h{line-height:1.5}.label-stacked.sc-ion-label-md-h,.label-floating.sc-ion-label-md-h{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;transform-origin:top left}.label-stacked.label-rtl.sc-ion-label-md-h,.label-floating.label-rtl.sc-ion-label-md-h{transform-origin:top right}.label-stacked.sc-ion-label-md-h{transform:translateY(50%) scale(0.75);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.label-floating.sc-ion-label-md-h{transform:translateY(96%);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)}.ion-focused.label-floating.sc-ion-label-md-h,.ion-focused .label-floating.sc-ion-label-md-h,.item-has-focus.label-floating.sc-ion-label-md-h,.item-has-focus .label-floating.sc-ion-label-md-h,.item-has-placeholder.sc-ion-label-md-h:not(.item-input).label-floating,.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-md-h,.item-has-value.label-floating.sc-ion-label-md-h,.item-has-value .label-floating.sc-ion-label-md-h{transform:translateY(50%) scale(0.75)}.item-fill-outline.ion-focused.label-floating.sc-ion-label-md-h,.item-fill-outline.ion-focused .label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-focus.label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).label-floating,.item-fill-outline.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-value.label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h{transform:translateY(-6px) scale(0.75);position:relative;max-width:min-content;background-color:var(--ion-item-background, var(--ion-background-color, #fff));overflow:visible;z-index:3}.item-fill-outline.ion-focused.label-floating.sc-ion-label-md-h::before,.item-fill-outline.ion-focused .label-floating.sc-ion-label-md-h::before,.item-fill-outline.ion-focused.label-floating.sc-ion-label-md-h::after,.item-fill-outline.ion-focused .label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-focus.label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-focus.label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).label-floating::before,.item-fill-outline.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).label-floating::after,.item-fill-outline.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-value.label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-value.label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h::after{position:absolute;width:4px;height:100%;background-color:var(--ion-item-background, var(--ion-background-color, #fff));content:\"\"}.item-fill-outline.ion-focused.label-floating.sc-ion-label-md-h::before,.item-fill-outline.ion-focused .label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-focus.label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).label-floating::before,.item-fill-outline.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-value.label-floating.sc-ion-label-md-h::before,.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h::before{left:calc(-1 * 4px)}.item-fill-outline.ion-focused.label-floating.sc-ion-label-md-h::after,.item-fill-outline.ion-focused .label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-focus.label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).label-floating::after,.item-fill-outline.item-has-placeholder:not(.item-input) .label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-value.label-floating.sc-ion-label-md-h::after,.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h::after{right:calc(-1 * 4px)}.item-fill-outline.ion-focused.item-has-start-slot.label-floating.sc-ion-label-md-h,.item-fill-outline.ion-focused.item-has-start-slot .label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-focus.item-has-start-slot.label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-focus.item-has-start-slot .label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).item-has-start-slot.label-floating,.item-fill-outline.item-has-placeholder:not(.item-input).item-has-start-slot .label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-value.item-has-start-slot.label-floating.sc-ion-label-md-h,.item-fill-outline.item-has-value.item-has-start-slot .label-floating.sc-ion-label-md-h{transform:translateX(-32px) translateY(-6px) scale(0.75)}.item-fill-outline.ion-focused.item-has-start-slot.label-floating.label-rtl.sc-ion-label-md-h,.item-fill-outline.ion-focused.item-has-start-slot .label-floating.label-rtl.sc-ion-label-md-h,.item-fill-outline.item-has-focus.item-has-start-slot.label-floating.label-rtl.sc-ion-label-md-h,.item-fill-outline.item-has-focus.item-has-start-slot .label-floating.label-rtl.sc-ion-label-md-h,.item-fill-outline.item-has-placeholder.sc-ion-label-md-h:not(.item-input).item-has-start-slot.label-floating.label-rtl,.item-fill-outline.item-has-placeholder:not(.item-input).item-has-start-slot .label-floating.label-rtl.sc-ion-label-md-h,.item-fill-outline.item-has-value.item-has-start-slot.label-floating.label-rtl.sc-ion-label-md-h,.item-fill-outline.item-has-value.item-has-start-slot .label-floating.label-rtl.sc-ion-label-md-h{transform:translateX(calc(-1 * -32px)) translateY(-6px) scale(0.75)}.ion-focused.label-stacked.sc-ion-label-md-h:not(.ion-color),.ion-focused .label-stacked.sc-ion-label-md-h:not(.ion-color),.ion-focused.label-floating.sc-ion-label-md-h:not(.ion-color),.ion-focused .label-floating.sc-ion-label-md-h:not(.ion-color),.item-has-focus.label-stacked.sc-ion-label-md-h:not(.ion-color),.item-has-focus .label-stacked.sc-ion-label-md-h:not(.ion-color),.item-has-focus.label-floating.sc-ion-label-md-h:not(.ion-color),.item-has-focus .label-floating.sc-ion-label-md-h:not(.ion-color){color:var(--ion-color-primary, #3880ff)}.ion-focused.ion-color.label-stacked.sc-ion-label-md-h:not(.ion-color),.ion-focused.ion-color .label-stacked.sc-ion-label-md-h:not(.ion-color),.ion-focused.ion-color.label-floating.sc-ion-label-md-h:not(.ion-color),.ion-focused.ion-color .label-floating.sc-ion-label-md-h:not(.ion-color),.item-has-focus.ion-color.label-stacked.sc-ion-label-md-h:not(.ion-color),.item-has-focus.ion-color .label-stacked.sc-ion-label-md-h:not(.ion-color),.item-has-focus.ion-color.label-floating.sc-ion-label-md-h:not(.ion-color),.item-has-focus.ion-color .label-floating.sc-ion-label-md-h:not(.ion-color){color:var(--ion-color-contrast)}.item-fill-solid.ion-focused.ion-color.label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.ion-focused.ion-color .label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.ion-focused.ion-color.label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.ion-focused.ion-color .label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.ion-focused.ion-color.label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.ion-focused.ion-color .label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.ion-focused.ion-color.label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.ion-focused.ion-color .label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.item-has-focus.ion-color.label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.item-has-focus.ion-color .label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.item-has-focus.ion-color.label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-solid.item-has-focus.ion-color .label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.item-has-focus.ion-color.label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.item-has-focus.ion-color .label-stacked.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.item-has-focus.ion-color.label-floating.sc-ion-label-md-h:not(.ion-color),.item-fill-outline.item-has-focus.ion-color .label-floating.sc-ion-label-md-h:not(.ion-color){color:var(--ion-color-base)}.ion-invalid.ion-touched.label-stacked.sc-ion-label-md-h:not(.ion-color),.ion-invalid.ion-touched .label-stacked.sc-ion-label-md-h:not(.ion-color),.ion-invalid.ion-touched.label-floating.sc-ion-label-md-h:not(.ion-color),.ion-invalid.ion-touched .label-floating.sc-ion-label-md-h:not(.ion-color){color:var(--highlight-color-invalid)}.sc-ion-label-md-s h1{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:24px;font-weight:normal}.sc-ion-label-md-s h2{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:16px;font-weight:normal}.sc-ion-label-md-s h3,.sc-ion-label-md-s h4,.sc-ion-label-md-s h5,.sc-ion-label-md-s h6{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:14px;font-weight:normal;line-height:normal}.sc-ion-label-md-s p{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:14px;line-height:20px;text-overflow:inherit;overflow:inherit}.sc-ion-label-md-s>p{color:var(--ion-color-step-600, #666666)}.sc-ion-label-md-h.in-item-color.sc-ion-label-md-s>p{color:inherit}";

const Label = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionColor = createEvent(this, "ionColor", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.inRange = false;
    this.color = undefined;
    this.position = undefined;
    this.noAnimate = false;
  }
  componentWillLoad() {
    this.inRange = !!this.el.closest('ion-range');
    this.noAnimate = this.position === 'floating';
    this.emitStyle();
    this.emitColor();
  }
  componentDidLoad() {
    if (this.noAnimate) {
      setTimeout(() => {
        this.noAnimate = false;
      }, 1000);
    }
  }
  colorChanged() {
    this.emitColor();
  }
  positionChanged() {
    this.emitStyle();
  }
  emitColor() {
    const { color } = this;
    this.ionColor.emit({
      'item-label-color': color !== undefined,
      [`ion-color-${color}`]: color !== undefined,
    });
  }
  emitStyle() {
    const { inRange, position } = this;
    // If the label is inside of a range we don't want
    // to override the classes added by the label that
    // is a direct child of the item
    if (!inRange) {
      this.ionStyle.emit({
        label: true,
        [`label-${position}`]: position !== undefined,
      });
    }
  }
  render() {
    const position = this.position;
    const mode = getIonMode$1(this);
    return (h(Host, { class: createColorClasses$1(this.color, {
        [mode]: true,
        'in-item-color': hostContext('ion-item.ion-color', this.el),
        [`label-${position}`]: position !== undefined,
        [`label-no-animate`]: this.noAnimate,
        'label-rtl': document.dir === 'rtl',
      }) }));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "color": ["colorChanged"],
    "position": ["positionChanged"]
  }; }
};
Label.style = {
  ios: labelIosCss,
  md: labelMdCss
};

const noteIosCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-350, #a6a6a6)}";

const noteMdCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600, #666666);font-size:14px}";

const Note = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.color = undefined;
  }
  render() {
    const mode = getIonMode$1(this);
    return (h(Host, { class: createColorClasses$1(this.color, {
        [mode]: true,
      }) }, h("slot", null)));
  }
};
Note.style = {
  ios: noteIosCss,
  md: noteMdCss
};

const pickerColumnInternalIosCss = ":host{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}";

const pickerColumnInternalMdCss = ":host{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}";

const PickerColumnInternal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.isScrolling = false;
    this.isColumnVisible = false;
    this.canExitInputMode = true;
    this.centerPickerItemInView = (target, smooth = true, canExitInputMode = true) => {
      const { el, isColumnVisible } = this;
      if (isColumnVisible) {
        // (Vertical offset from parent) - (three empty picker rows) + (half the height of the target to ensure the scroll triggers)
        const top = target.offsetTop - 3 * target.clientHeight + target.clientHeight / 2;
        if (el.scrollTop !== top) {
          /**
           * Setting this flag prevents input
           * mode from exiting in the picker column's
           * scroll callback. This is useful when the user manually
           * taps an item or types on the keyboard as both
           * of these can cause a scroll to occur.
           */
          this.canExitInputMode = canExitInputMode;
          el.scroll({
            top,
            left: 0,
            behavior: smooth ? 'smooth' : undefined,
          });
        }
      }
    };
    /**
     * When ionInputModeChange is emitted, each column
     * needs to check if it is the one being made available
     * for text entry.
     */
    this.inputModeChange = (ev) => {
      if (!this.numericInput) {
        return;
      }
      const { useInputMode, inputModeColumn } = ev.detail;
      /**
       * If inputModeColumn is undefined then this means
       * all numericInput columns are being selected.
       */
      const isColumnActive = inputModeColumn === undefined || inputModeColumn === this.el;
      if (!useInputMode || !isColumnActive) {
        this.setInputModeActive(false);
        return;
      }
      this.setInputModeActive(true);
    };
    /**
     * Setting isActive will cause a re-render.
     * As a result, we do not want to cause the
     * re-render mid scroll as this will cause
     * the picker column to jump back to
     * whatever value was selected at the
     * start of the scroll interaction.
     */
    this.setInputModeActive = (state) => {
      if (this.isScrolling) {
        this.scrollEndCallback = () => {
          this.isActive = state;
        };
        return;
      }
      this.isActive = state;
    };
    /**
     * When the column scrolls, the component
     * needs to determine which item is centered
     * in the view and will emit an ionChange with
     * the item object.
     */
    this.initializeScrollListener = () => {
      /**
       * The haptics for the wheel picker are
       * an iOS-only feature. As a result, they should
       * be disabled on Android.
       */
      const enableHaptics = isPlatform('ios');
      const { el } = this;
      let timeout;
      let activeEl = this.activeItem;
      const scrollCallback = () => {
        raf(() => {
          if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
          }
          if (!this.isScrolling) {
            enableHaptics && hapticSelectionStart();
            this.isScrolling = true;
          }
          /**
           * Select item in the center of the column
           * which is the month/year that we want to select
           */
          const bbox = el.getBoundingClientRect();
          const centerX = bbox.x + bbox.width / 2;
          const centerY = bbox.y + bbox.height / 2;
          const activeElement = el.shadowRoot.elementFromPoint(centerX, centerY);
          if (activeEl !== null) {
            activeEl.classList.remove(PICKER_COL_ACTIVE);
          }
          if (activeElement === null || activeElement.disabled) {
            return;
          }
          /**
           * If we are selecting a new value,
           * we need to run haptics again.
           */
          if (activeElement !== activeEl) {
            enableHaptics && hapticSelectionChanged();
            if (this.canExitInputMode) {
              /**
               * The native iOS wheel picker
               * only dismisses the keyboard
               * once the selected item has changed
               * as a result of a swipe
               * from the user. If `canExitInputMode` is
               * `false` then this means that the
               * scroll is happening as a result of
               * the `value` property programmatically changing
               * either by an application or by the user via the keyboard.
               */
              this.exitInputMode();
            }
          }
          activeEl = activeElement;
          activeElement.classList.add(PICKER_COL_ACTIVE);
          timeout = setTimeout(() => {
            this.isScrolling = false;
            enableHaptics && hapticSelectionEnd();
            /**
             * Certain tasks (such as those that
             * cause re-renders) should only be done
             * once scrolling has finished, otherwise
             * flickering may occur.
             */
            const { scrollEndCallback } = this;
            if (scrollEndCallback) {
              scrollEndCallback();
              this.scrollEndCallback = undefined;
            }
            /**
             * Reset this flag as the
             * next scroll interaction could
             * be a scroll from the user. In this
             * case, we should exit input mode.
             */
            this.canExitInputMode = true;
            const dataIndex = activeElement.getAttribute('data-index');
            /**
             * If no value it is
             * possible we hit one of the
             * empty padding columns.
             */
            if (dataIndex === null) {
              return;
            }
            const index = parseInt(dataIndex, 10);
            const selectedItem = this.items[index];
            if (selectedItem.value !== this.value) {
              this.setValue(selectedItem.value);
            }
          }, 250);
        });
      };
      /**
       * Wrap this in an raf so that the scroll callback
       * does not fire when component is initially shown.
       */
      raf(() => {
        el.addEventListener('scroll', scrollCallback);
        this.destroyScrollListener = () => {
          el.removeEventListener('scroll', scrollCallback);
        };
      });
    };
    /**
     * Tells the parent picker to
     * exit text entry mode. This is only called
     * when the selected item changes during scroll, so
     * we know that the user likely wants to scroll
     * instead of type.
     */
    this.exitInputMode = () => {
      const { parentEl } = this;
      if (parentEl == null)
        return;
      parentEl.exitInputMode();
      /**
       * setInputModeActive only takes
       * effect once scrolling stops to avoid
       * a component re-render while scrolling.
       * However, we want the visual active
       * indicator to go away immediately, so
       * we call classList.remove here.
       */
      this.el.classList.remove('picker-column-active');
    };
    this.isActive = false;
    this.items = [];
    this.value = undefined;
    this.color = 'primary';
    this.numericInput = false;
  }
  valueChange() {
    if (this.isColumnVisible) {
      /**
       * Only scroll the active item into view when the picker column
       * is actively visible to the user.
       */
      this.scrollActiveItemIntoView();
    }
  }
  /**
   * Only setup scroll listeners
   * when the picker is visible, otherwise
   * the container will have a scroll
   * height of 0px.
   */
  componentWillLoad() {
    const visibleCallback = (entries) => {
      var _a;
      const ev = entries[0];
      if (ev.isIntersecting) {
        this.isColumnVisible = true;
        /**
         * Because this initial call to scrollActiveItemIntoView has to fire before
         * the scroll listener is set up, we need to manage the active class manually.
         */
        const oldActive = getElementRoot(this.el).querySelector(`.${PICKER_COL_ACTIVE}`);
        oldActive === null || oldActive === void 0 ? void 0 : oldActive.classList.remove(PICKER_COL_ACTIVE);
        this.scrollActiveItemIntoView();
        (_a = this.activeItem) === null || _a === void 0 ? void 0 : _a.classList.add(PICKER_COL_ACTIVE);
        this.initializeScrollListener();
      }
      else {
        this.isColumnVisible = false;
        if (this.destroyScrollListener) {
          this.destroyScrollListener();
          this.destroyScrollListener = undefined;
        }
      }
    };
    new IntersectionObserver(visibleCallback, { threshold: 0.001 }).observe(this.el);
    const parentEl = (this.parentEl = this.el.closest('ion-picker-internal'));
    if (parentEl !== null) {
      // TODO(FW-2832): type
      parentEl.addEventListener('ionInputModeChange', (ev) => this.inputModeChange(ev));
    }
  }
  componentDidRender() {
    var _a;
    const { activeItem, items, isColumnVisible, value } = this;
    if (isColumnVisible) {
      if (activeItem) {
        this.scrollActiveItemIntoView();
      }
      else if (((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) !== value) {
        /**
         * If the picker column does not have an active item and the current value
         * does not match the first item in the picker column, that means
         * the value is out of bounds. In this case, we assign the value to the
         * first item to match the scroll position of the column.
         *
         */
        this.setValue(items[0].value);
      }
    }
  }
  /** @internal  */
  async scrollActiveItemIntoView() {
    const activeEl = this.activeItem;
    if (activeEl) {
      this.centerPickerItemInView(activeEl, false, false);
    }
  }
  /**
   * Sets the value prop and fires the ionChange event.
   * This is used when we need to fire ionChange from
   * user-generated events that cannot be caught with normal
   * input/change event listeners.
   * @internal
   */
  async setValue(value) {
    const { items } = this;
    this.value = value;
    const findItem = items.find((item) => item.value === value && item.disabled !== true);
    if (findItem) {
      this.ionChange.emit(findItem);
    }
  }
  get activeItem() {
    return getElementRoot(this.el).querySelector(`.picker-item[data-value="${this.value}"]:not([disabled])`);
  }
  render() {
    const { items, color, isActive, numericInput } = this;
    const mode = getIonMode$1(this);
    return (h(Host, { tabindex: 0, class: createColorClasses$1(color, {
        [mode]: true,
        ['picker-column-active']: isActive,
        ['picker-column-numeric-input']: numericInput,
      }) }, h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), items.map((item, index) => {
      return (h("button", { tabindex: "-1", class: {
          'picker-item': true,
          'picker-item-disabled': item.disabled || false,
        }, "data-value": item.value, "data-index": index, onClick: (ev) => {
          this.centerPickerItemInView(ev.target, true);
        }, disabled: item.disabled }, item.text));
    }), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0"), h("div", { class: "picker-item picker-item-empty", "aria-hidden": "true" }, "\u00A0")));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueChange"]
  }; }
};
const PICKER_COL_ACTIVE = 'picker-item-active';
PickerColumnInternal.style = {
  ios: pickerColumnInternalIosCss,
  md: pickerColumnInternalMdCss
};

const pickerInternalIosCss = ":host{display:flex;position:relative;align-items:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{top:0;height:83px}@supports (inset-inline-start: 0){:host .picker-before{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-before{left:0}:host-context([dir=rtl]) .picker-before{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-before:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-after{top:116px;height:84px}@supports (inset-inline-start: 0){:host .picker-after{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-after{left:0}:host-context([dir=rtl]) .picker-after{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-after:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;transform:translateY(-50%);z-index:-1}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host ::slotted(ion-picker-column-internal:only-child){text-align:center}:host .picker-before{background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-after{background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-highlight{background:var(--ion-color-step-150, #eeeeef)}";

const pickerInternalMdCss = ":host{display:flex;position:relative;align-items:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{top:0;height:83px}@supports (inset-inline-start: 0){:host .picker-before{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-before{left:0}:host-context([dir=rtl]) .picker-before{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-before:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-after{top:116px;height:84px}@supports (inset-inline-start: 0){:host .picker-after{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host .picker-after{left:0}:host-context([dir=rtl]) .picker-after{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host .picker-after:dir(rtl){left:unset;right:unset;right:0}}}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;transform:translateY(-50%);z-index:-1}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host ::slotted(ion-picker-column-internal:only-child){text-align:center}:host .picker-before{background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}:host .picker-after{background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 30%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}";

const PickerInternal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionInputModeChange = createEvent(this, "ionInputModeChange", 7);
    this.useInputMode = false;
    this.isInHighlightBounds = (ev) => {
      const { highlightEl } = this;
      if (!highlightEl) {
        return false;
      }
      const bbox = highlightEl.getBoundingClientRect();
      /**
       * Check to see if the user clicked
       * outside the bounds of the highlight.
       */
      const outsideX = ev.clientX < bbox.left || ev.clientX > bbox.right;
      const outsideY = ev.clientY < bbox.top || ev.clientY > bbox.bottom;
      if (outsideX || outsideY) {
        return false;
      }
      return true;
    };
    /**
     * If we are no longer focused
     * on a picker column, then we should
     * exit input mode. An exception is made
     * for the input in the picker since having
     * that focused means we are still in input mode.
     */
    this.onFocusOut = (ev) => {
      // TODO(FW-2832): type
      const { relatedTarget } = ev;
      if (!relatedTarget || (relatedTarget.tagName !== 'ION-PICKER-COLUMN-INTERNAL' && relatedTarget !== this.inputEl)) {
        this.exitInputMode();
      }
    };
    /**
     * When picker columns receive focus
     * the parent picker needs to determine
     * whether to enter/exit input mode.
     */
    this.onFocusIn = (ev) => {
      // TODO(FW-2832): type
      const { target } = ev;
      /**
       * Due to browser differences in how/when focus
       * is dispatched on certain elements, we need to
       * make sure that this function only ever runs when
       * focusing a picker column.
       */
      if (target.tagName !== 'ION-PICKER-COLUMN-INTERNAL') {
        return;
      }
      /**
       * If we have actionOnClick
       * then this means the user focused
       * a picker column via mouse or
       * touch (i.e. a PointerEvent). As a result,
       * we should not enter/exit input mode
       * until the click event has fired, which happens
       * after the `focusin` event.
       *
       * Otherwise, the user likely focused
       * the column using their keyboard and
       * we should enter/exit input mode automatically.
       */
      if (!this.actionOnClick) {
        const columnEl = target;
        const allowInput = columnEl.numericInput;
        if (allowInput) {
          this.enterInputMode(columnEl, false);
        }
        else {
          this.exitInputMode();
        }
      }
    };
    /**
     * On click we need to run an actionOnClick
     * function that has been set in onPointerDown
     * so that we enter/exit input mode correctly.
     */
    this.onClick = () => {
      const { actionOnClick } = this;
      if (actionOnClick) {
        actionOnClick();
        this.actionOnClick = undefined;
      }
    };
    /**
     * Clicking a column also focuses the column on
     * certain browsers, so we use onPointerDown
     * to tell the onFocusIn function that users
     * are trying to click the column rather than
     * focus the column using the keyboard. When the
     * user completes the click, the onClick function
     * runs and runs the actionOnClick callback.
     */
    this.onPointerDown = (ev) => {
      const { useInputMode, inputModeColumn, el } = this;
      if (this.isInHighlightBounds(ev)) {
        /**
         * If we were already in
         * input mode, then we should determine
         * if we tapped a particular column and
         * should switch to input mode for
         * that specific column.
         */
        if (useInputMode) {
          /**
           * If we tapped a picker column
           * then we should either switch to input
           * mode for that column or all columns.
           * Otherwise we should exit input mode
           * since we just tapped the highlight and
           * not a column.
           */
          if (ev.target.tagName === 'ION-PICKER-COLUMN-INTERNAL') {
            /**
             * If user taps 2 different columns
             * then we should just switch to input mode
             * for the new column rather than switching to
             * input mode for all columns.
             */
            if (inputModeColumn && inputModeColumn === ev.target) {
              this.actionOnClick = () => {
                this.enterInputMode();
              };
            }
            else {
              this.actionOnClick = () => {
                this.enterInputMode(ev.target);
              };
            }
          }
          else {
            this.actionOnClick = () => {
              this.exitInputMode();
            };
          }
          /**
           * If we were not already in
           * input mode, then we should
           * enter input mode for all columns.
           */
        }
        else {
          /**
           * If there is only 1 numeric input column
           * then we should skip multi column input.
           */
          const columns = el.querySelectorAll('ion-picker-column-internal.picker-column-numeric-input');
          const columnEl = columns.length === 1 ? ev.target : undefined;
          this.actionOnClick = () => {
            this.enterInputMode(columnEl);
          };
        }
        return;
      }
      this.actionOnClick = () => {
        this.exitInputMode();
      };
    };
    /**
     * Enters input mode to allow
     * for text entry of numeric values.
     * If on mobile, we focus a hidden input
     * field so that the on screen keyboard
     * is brought up. When tabbing using a
     * keyboard, picker columns receive an outline
     * to indicate they are focused. As a result,
     * we should not focus the hidden input as it
     * would cause the outline to go away, preventing
     * users from having any visual indication of which
     * column is focused.
     */
    this.enterInputMode = (columnEl, focusInput = true) => {
      const { inputEl, el } = this;
      if (!inputEl) {
        return;
      }
      /**
       * Only active input mode if there is at
       * least one column that accepts numeric input.
       */
      const hasInputColumn = el.querySelector('ion-picker-column-internal.picker-column-numeric-input');
      if (!hasInputColumn) {
        return;
      }
      /**
       * If columnEl is undefined then
       * it is assumed that all numeric pickers
       * are eligible for text entry.
       * (i.e. hour and minute columns)
       */
      this.useInputMode = true;
      this.inputModeColumn = columnEl;
      /**
       * Users with a keyboard and mouse can
       * activate input mode where the input is
       * focused as well as when it is not focused,
       * so we need to make sure we clean up any
       * old listeners.
       */
      if (focusInput) {
        if (this.destroyKeypressListener) {
          this.destroyKeypressListener();
          this.destroyKeypressListener = undefined;
        }
        inputEl.focus();
      }
      else {
        el.addEventListener('keypress', this.onKeyPress);
        this.destroyKeypressListener = () => {
          el.removeEventListener('keypress', this.onKeyPress);
        };
      }
      this.emitInputModeChange();
    };
    this.onKeyPress = (ev) => {
      const { inputEl } = this;
      if (!inputEl) {
        return;
      }
      const parsedValue = parseInt(ev.key, 10);
      /**
       * Only numbers should be allowed
       */
      if (!Number.isNaN(parsedValue)) {
        inputEl.value += ev.key;
        this.onInputChange();
      }
    };
    this.selectSingleColumn = () => {
      const { inputEl, inputModeColumn, singleColumnSearchTimeout } = this;
      if (!inputEl || !inputModeColumn) {
        return;
      }
      const values = inputModeColumn.items.filter((item) => item.disabled !== true);
      /**
       * If users pause for a bit, the search
       * value should be reset similar to how a
       * <select> behaves. So typing "34", waiting,
       * then typing "5" should select "05".
       */
      if (singleColumnSearchTimeout) {
        clearTimeout(singleColumnSearchTimeout);
      }
      this.singleColumnSearchTimeout = setTimeout(() => {
        inputEl.value = '';
        this.singleColumnSearchTimeout = undefined;
      }, 1000);
      /**
       * For values that are longer than 2 digits long
       * we should shift the value over 1 character
       * to the left. So typing "456" would result in "56".
       * TODO: If we want to support more than just
       * time entry, we should update this value to be
       * the max length of all of the picker items.
       */
      if (inputEl.value.length >= 3) {
        const startIndex = inputEl.value.length - 2;
        const newString = inputEl.value.substring(startIndex);
        inputEl.value = newString;
        this.selectSingleColumn();
        return;
      }
      /**
       * Checking the value of the input gets priority
       * first. For example, if the value of the input
       * is "1" and we entered "2", then the complete value
       * is "12" and we should select hour 12.
       *
       * Regex removes any leading zeros from values like "02",
       * but it keeps a single zero if there are only zeros in the string.
       * 0+(?=[1-9]) --> Match 1 or more zeros that are followed by 1-9
       * 0+(?=0$) --> Match 1 or more zeros that must be followed by one 0 and end.
       */
      const findItemFromCompleteValue = values.find(({ text }) => {
        const parsedText = text.replace(/^0+(?=[1-9])|0+(?=0$)/, '');
        return parsedText === inputEl.value;
      });
      if (findItemFromCompleteValue) {
        inputModeColumn.setValue(findItemFromCompleteValue.value);
        return;
      }
      /**
       * If we typed "56" to get minute 56, then typed "7",
       * we should select "07" as "567" is not a valid minute.
       */
      if (inputEl.value.length === 2) {
        const changedCharacter = inputEl.value.substring(inputEl.value.length - 1);
        inputEl.value = changedCharacter;
        this.selectSingleColumn();
      }
    };
    /**
     * Searches a list of column items for a particular
     * value. This is currently used for numeric values.
     * The zeroBehavior can be set to account for leading
     * or trailing zeros when looking at the item text.
     */
    this.searchColumn = (colEl, value, zeroBehavior = 'start') => {
      const behavior = zeroBehavior === 'start' ? /^0+/ : /0$/;
      const item = colEl.items.find(({ text, disabled }) => disabled !== true && text.replace(behavior, '') === value);
      if (item) {
        colEl.setValue(item.value);
      }
    };
    this.selectMultiColumn = () => {
      const { inputEl, el } = this;
      if (!inputEl) {
        return;
      }
      const numericPickers = Array.from(el.querySelectorAll('ion-picker-column-internal')).filter((col) => col.numericInput);
      const firstColumn = numericPickers[0];
      const lastColumn = numericPickers[1];
      let value = inputEl.value;
      let minuteValue;
      switch (value.length) {
        case 1:
          this.searchColumn(firstColumn, value);
          break;
        case 2:
          /**
           * If the first character is `0` or `1` it is
           * possible that users are trying to type `09`
           * or `11` into the hour field, so we should look
           * at that first.
           */
          const firstCharacter = inputEl.value.substring(0, 1);
          value = firstCharacter === '0' || firstCharacter === '1' ? inputEl.value : firstCharacter;
          this.searchColumn(firstColumn, value);
          /**
           * If only checked the first value,
           * we can check the second value
           * for a match in the minutes column
           */
          if (value.length === 1) {
            minuteValue = inputEl.value.substring(inputEl.value.length - 1);
            this.searchColumn(lastColumn, minuteValue, 'end');
          }
          break;
        case 3:
          /**
           * If the first character is `0` or `1` it is
           * possible that users are trying to type `09`
           * or `11` into the hour field, so we should look
           * at that first.
           */
          const firstCharacterAgain = inputEl.value.substring(0, 1);
          value =
            firstCharacterAgain === '0' || firstCharacterAgain === '1'
              ? inputEl.value.substring(0, 2)
              : firstCharacterAgain;
          this.searchColumn(firstColumn, value);
          /**
           * If only checked the first value,
           * we can check the second value
           * for a match in the minutes column
           */
          minuteValue = value.length === 1 ? inputEl.value.substring(1) : inputEl.value.substring(2);
          this.searchColumn(lastColumn, minuteValue, 'end');
          break;
        case 4:
          /**
           * If the first character is `0` or `1` it is
           * possible that users are trying to type `09`
           * or `11` into the hour field, so we should look
           * at that first.
           */
          const firstCharacterAgainAgain = inputEl.value.substring(0, 1);
          value =
            firstCharacterAgainAgain === '0' || firstCharacterAgainAgain === '1'
              ? inputEl.value.substring(0, 2)
              : firstCharacterAgainAgain;
          this.searchColumn(firstColumn, value);
          /**
           * If only checked the first value,
           * we can check the second value
           * for a match in the minutes column
           */
          const minuteValueAgain = value.length === 1
            ? inputEl.value.substring(1, inputEl.value.length)
            : inputEl.value.substring(2, inputEl.value.length);
          this.searchColumn(lastColumn, minuteValueAgain, 'end');
          break;
        default:
          const startIndex = inputEl.value.length - 4;
          const newString = inputEl.value.substring(startIndex);
          inputEl.value = newString;
          this.selectMultiColumn();
          break;
      }
    };
    /**
     * Searches the value of the active column
     * to determine which value users are trying
     * to select
     */
    this.onInputChange = () => {
      const { useInputMode, inputEl, inputModeColumn } = this;
      if (!useInputMode || !inputEl) {
        return;
      }
      if (inputModeColumn) {
        this.selectSingleColumn();
      }
      else {
        this.selectMultiColumn();
      }
    };
    /**
     * Emit ionInputModeChange. Picker columns
     * listen for this event to determine whether
     * or not their column is "active" for text input.
     */
    this.emitInputModeChange = () => {
      const { useInputMode, inputModeColumn } = this;
      this.ionInputModeChange.emit({
        useInputMode,
        inputModeColumn,
      });
    };
  }
  /**
   * When the picker is interacted with
   * we need to prevent touchstart so other
   * gestures do not fire. For example,
   * scrolling on the wheel picker
   * in ion-datetime should not cause
   * a card modal to swipe to close.
   */
  preventTouchStartPropagation(ev) {
    ev.stopPropagation();
  }
  componentWillLoad() {
    getElementRoot(this.el).addEventListener('focusin', this.onFocusIn);
    getElementRoot(this.el).addEventListener('focusout', this.onFocusOut);
  }
  /**
   * @internal
   * Exits text entry mode for the picker
   * This method blurs the hidden input
   * and cause the keyboard to dismiss.
   */
  async exitInputMode() {
    const { inputEl, useInputMode } = this;
    if (!useInputMode || !inputEl) {
      return;
    }
    this.useInputMode = false;
    this.inputModeColumn = undefined;
    inputEl.blur();
    inputEl.value = '';
    if (this.destroyKeypressListener) {
      this.destroyKeypressListener();
      this.destroyKeypressListener = undefined;
    }
    this.emitInputModeChange();
  }
  render() {
    return (h(Host, { onPointerDown: (ev) => this.onPointerDown(ev), onClick: () => this.onClick() }, h("input", { "aria-hidden": "true", tabindex: -1, inputmode: "numeric", type: "number", ref: (el) => (this.inputEl = el), onInput: () => this.onInputChange(), onBlur: () => this.exitInputMode() }), h("div", { class: "picker-before" }), h("div", { class: "picker-after" }), h("div", { class: "picker-highlight", ref: (el) => (this.highlightEl = el) }), h("slot", null)));
  }
  get el() { return getElement(this); }
};
PickerInternal.style = {
  ios: pickerInternalIosCss,
  md: pickerInternalMdCss
};

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
/**
 * Returns the dimensions of the popover
 * arrow on `ios` mode. If arrow is disabled
 * returns (0, 0).
 */
const getArrowDimensions = (arrowEl) => {
  if (!arrowEl) {
    return { arrowWidth: 0, arrowHeight: 0 };
  }
  const { width, height } = arrowEl.getBoundingClientRect();
  return { arrowWidth: width, arrowHeight: height };
};
/**
 * Returns the recommended dimensions of the popover
 * that takes into account whether or not the width
 * should match the trigger width.
 */
const getPopoverDimensions = (size, contentEl, triggerEl) => {
  const contentDimentions = contentEl.getBoundingClientRect();
  const contentHeight = contentDimentions.height;
  let contentWidth = contentDimentions.width;
  if (size === 'cover' && triggerEl) {
    const triggerDimensions = triggerEl.getBoundingClientRect();
    contentWidth = triggerDimensions.width;
  }
  return {
    contentWidth,
    contentHeight,
  };
};
const configureDismissInteraction = (triggerEl, triggerAction, popoverEl, parentPopoverEl) => {
  let dismissCallbacks = [];
  const root = getElementRoot(parentPopoverEl);
  const parentContentEl = root.querySelector('.popover-content');
  switch (triggerAction) {
    case 'hover':
      dismissCallbacks = [
        {
          /**
           * Do not use mouseover here
           * as this will causes the event to
           * be dispatched on each underlying
           * element rather than on the popover
           * content as a whole.
           */
          eventName: 'mouseenter',
          callback: (ev) => {
            /**
             * Do not dismiss the popover is we
             * are hovering over its trigger.
             * This would be easier if we used mouseover
             * but this would cause the event to be dispatched
             * more often than we would like, potentially
             * causing performance issues.
             */
            const element = document.elementFromPoint(ev.clientX, ev.clientY);
            if (element === triggerEl) {
              return;
            }
            popoverEl.dismiss(undefined, undefined, false);
          },
        },
      ];
      break;
    case 'context-menu':
    case 'click':
    default:
      dismissCallbacks = [
        {
          eventName: 'click',
          callback: (ev) => {
            /**
             * Do not dismiss the popover is we
             * are hovering over its trigger.
             */
            const target = ev.target;
            const closestTrigger = target.closest('[data-ion-popover-trigger]');
            if (closestTrigger === triggerEl) {
              /**
               * stopPropagation here so if the
               * popover has dismissOnSelect="true"
               * the popover does not dismiss since
               * we just clicked a trigger element.
               */
              ev.stopPropagation();
              return;
            }
            popoverEl.dismiss(undefined, undefined, false);
          },
        },
      ];
      break;
  }
  dismissCallbacks.forEach(({ eventName, callback }) => parentContentEl.addEventListener(eventName, callback));
  return () => {
    dismissCallbacks.forEach(({ eventName, callback }) => parentContentEl.removeEventListener(eventName, callback));
  };
};
/**
 * Configures the triggerEl to respond
 * to user interaction based upon the triggerAction
 * prop that devs have defined.
 */
const configureTriggerInteraction = (triggerEl, triggerAction, popoverEl) => {
  let triggerCallbacks = [];
  /**
   * Based upon the kind of trigger interaction
   * the user wants, we setup the correct event
   * listeners.
   */
  switch (triggerAction) {
    case 'hover':
      let hoverTimeout;
      triggerCallbacks = [
        {
          eventName: 'mouseenter',
          callback: async (ev) => {
            ev.stopPropagation();
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            /**
             * Hovering over a trigger should not
             * immediately open the next popover.
             */
            hoverTimeout = setTimeout(() => {
              raf(() => {
                popoverEl.presentFromTrigger(ev);
                hoverTimeout = undefined;
              });
            }, 100);
          },
        },
        {
          eventName: 'mouseleave',
          callback: (ev) => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            /**
             * If mouse is over another popover
             * that is not this popover then we should
             * close this popover.
             */
            const target = ev.relatedTarget;
            if (!target) {
              return;
            }
            if (target.closest('ion-popover') !== popoverEl) {
              popoverEl.dismiss(undefined, undefined, false);
            }
          },
        },
        {
          /**
           * stopPropagation here prevents the popover
           * from dismissing when dismiss-on-select="true".
           */
          eventName: 'click',
          callback: (ev) => ev.stopPropagation(),
        },
        {
          eventName: 'ionPopoverActivateTrigger',
          callback: (ev) => popoverEl.presentFromTrigger(ev, true),
        },
      ];
      break;
    case 'context-menu':
      triggerCallbacks = [
        {
          eventName: 'contextmenu',
          callback: (ev) => {
            /**
             * Prevents the platform context
             * menu from appearing.
             */
            ev.preventDefault();
            popoverEl.presentFromTrigger(ev);
          },
        },
        {
          eventName: 'click',
          callback: (ev) => ev.stopPropagation(),
        },
        {
          eventName: 'ionPopoverActivateTrigger',
          callback: (ev) => popoverEl.presentFromTrigger(ev, true),
        },
      ];
      break;
    case 'click':
    default:
      triggerCallbacks = [
        {
          /**
           * Do not do a stopPropagation() here
           * because if you had two click triggers
           * then clicking the first trigger and then
           * clicking the second trigger would not cause
           * the first popover to dismiss.
           */
          eventName: 'click',
          callback: (ev) => popoverEl.presentFromTrigger(ev),
        },
        {
          eventName: 'ionPopoverActivateTrigger',
          callback: (ev) => popoverEl.presentFromTrigger(ev, true),
        },
      ];
      break;
  }
  triggerCallbacks.forEach(({ eventName, callback }) => triggerEl.addEventListener(eventName, callback));
  triggerEl.setAttribute('data-ion-popover-trigger', 'true');
  return () => {
    triggerCallbacks.forEach(({ eventName, callback }) => triggerEl.removeEventListener(eventName, callback));
    triggerEl.removeAttribute('data-ion-popover-trigger');
  };
};
/**
 * Returns the index of an ion-item in an array of ion-items.
 */
const getIndexOfItem = (items, item) => {
  if (!item || item.tagName !== 'ION-ITEM') {
    return -1;
  }
  return items.findIndex((el) => el === item);
};
/**
 * Given an array of elements and a currently focused ion-item
 * returns the next ion-item relative to the focused one or
 * undefined.
 */
const getNextItem = (items, currentItem) => {
  const currentItemIndex = getIndexOfItem(items, currentItem);
  return items[currentItemIndex + 1];
};
/**
 * Given an array of elements and a currently focused ion-item
 * returns the previous ion-item relative to the focused one or
 * undefined.
 */
const getPrevItem = (items, currentItem) => {
  const currentItemIndex = getIndexOfItem(items, currentItem);
  return items[currentItemIndex - 1];
};
/** Focus the internal button of the ion-item */
const focusItem = (item) => {
  const root = getElementRoot(item);
  const button = root.querySelector('button');
  if (button) {
    raf(() => button.focus());
  }
};
/**
 * Returns `true` if `el` has been designated
 * as a trigger element for an ion-popover.
 */
const isTriggerElement = (el) => el.hasAttribute('data-ion-popover-trigger');
const configureKeyboardInteraction = (popoverEl) => {
  const callback = async (ev) => {
    var _a;
    const activeElement = document.activeElement;
    let items = [];
    const targetTagName = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.tagName;
    /**
     * Only handle custom keyboard interactions for the host popover element
     * and children ion-item elements.
     */
    if (targetTagName !== 'ION-POPOVER' && targetTagName !== 'ION-ITEM') {
      return;
    }
    /**
     * Complex selectors with :not() are :not supported
     * in older versions of Chromium so we need to do a
     * try/catch here so errors are not thrown.
     */
    try {
      /**
       * Select all ion-items that are not children of child popovers.
       * i.e. only select ion-item elements that are part of this popover
       */
      items = Array.from(popoverEl.querySelectorAll('ion-item:not(ion-popover ion-popover *):not([disabled])'));
      /* eslint-disable-next-line */
    }
    catch (_b) { }
    switch (ev.key) {
      /**
       * If we are in a child popover
       * then pressing the left arrow key
       * should close this popover and move
       * focus to the popover that presented
       * this one.
       */
      case 'ArrowLeft':
        const parentPopover = await popoverEl.getParentPopover();
        if (parentPopover) {
          popoverEl.dismiss(undefined, undefined, false);
        }
        break;
      /**
       * ArrowDown should move focus to the next focusable ion-item.
       */
      case 'ArrowDown':
        // Disable movement/scroll with keyboard
        ev.preventDefault();
        const nextItem = getNextItem(items, activeElement);
        if (nextItem !== undefined) {
          focusItem(nextItem);
        }
        break;
      /**
       * ArrowUp should move focus to the previous focusable ion-item.
       */
      case 'ArrowUp':
        // Disable movement/scroll with keyboard
        ev.preventDefault();
        const prevItem = getPrevItem(items, activeElement);
        if (prevItem !== undefined) {
          focusItem(prevItem);
        }
        break;
      /**
       * Home should move focus to the first focusable ion-item.
       */
      case 'Home':
        ev.preventDefault();
        const firstItem = items[0];
        if (firstItem !== undefined) {
          focusItem(firstItem);
        }
        break;
      /**
       * End should move focus to the last focusable ion-item.
       */
      case 'End':
        ev.preventDefault();
        const lastItem = items[items.length - 1];
        if (lastItem !== undefined) {
          focusItem(lastItem);
        }
        break;
      /**
       * ArrowRight, Spacebar, or Enter should activate
       * the currently focused trigger item to open a
       * popover if the element is a trigger item.
       */
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        if (activeElement && isTriggerElement(activeElement)) {
          const rightEvent = new CustomEvent('ionPopoverActivateTrigger');
          activeElement.dispatchEvent(rightEvent);
        }
        break;
    }
  };
  popoverEl.addEventListener('keydown', callback);
  return () => popoverEl.removeEventListener('keydown', callback);
};
/**
 * Positions a popover by taking into account
 * the reference point, preferred side, alignment
 * and viewport dimensions.
 */
const getPopoverPosition = (isRTL, contentWidth, contentHeight, arrowWidth, arrowHeight, reference, side, align, defaultPosition, triggerEl, event) => {
  var _a;
  let referenceCoordinates = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  /**
   * Calculate position relative to the
   * x-y coordinates in the event that
   * was passed in
   */
  switch (reference) {
    case 'event':
      if (!event) {
        return defaultPosition;
      }
      const mouseEv = event;
      referenceCoordinates = {
        top: mouseEv.clientY,
        left: mouseEv.clientX,
        width: 1,
        height: 1,
      };
      break;
    /**
     * Calculate position relative to the bounding
     * box on either the trigger element
     * specified via the `trigger` prop or
     * the target specified on the event
     * that was passed in.
     */
    case 'trigger':
    default:
      const customEv = event;
      /**
       * ionShadowTarget is used when we need to align the
       * popover with an element inside of the shadow root
       * of an Ionic component. Ex: Presenting a popover
       * by clicking on the collapsed indicator inside
       * of `ion-breadcrumb` and centering it relative
       * to the indicator rather than `ion-breadcrumb`
       * as a whole.
       */
      const actualTriggerEl = (triggerEl ||
        ((_a = customEv === null || customEv === void 0 ? void 0 : customEv.detail) === null || _a === void 0 ? void 0 : _a.ionShadowTarget) ||
        (customEv === null || customEv === void 0 ? void 0 : customEv.target));
      if (!actualTriggerEl) {
        return defaultPosition;
      }
      const triggerBoundingBox = actualTriggerEl.getBoundingClientRect();
      referenceCoordinates = {
        top: triggerBoundingBox.top,
        left: triggerBoundingBox.left,
        width: triggerBoundingBox.width,
        height: triggerBoundingBox.height,
      };
      break;
  }
  /**
   * Get top/left offset that would allow
   * popover to be positioned on the
   * preferred side of the reference.
   */
  const coordinates = calculatePopoverSide(side, referenceCoordinates, contentWidth, contentHeight, arrowWidth, arrowHeight, isRTL);
  /**
   * Get the top/left adjustments that
   * would allow the popover content
   * to have the correct alignment.
   */
  const alignedCoordinates = calculatePopoverAlign(align, side, referenceCoordinates, contentWidth, contentHeight);
  const top = coordinates.top + alignedCoordinates.top;
  const left = coordinates.left + alignedCoordinates.left;
  const { arrowTop, arrowLeft } = calculateArrowPosition(side, arrowWidth, arrowHeight, top, left, contentWidth, contentHeight, isRTL);
  const { originX, originY } = calculatePopoverOrigin(side, align, isRTL);
  return { top, left, referenceCoordinates, arrowTop, arrowLeft, originX, originY };
};
/**
 * Determines the transform-origin
 * of the popover animation so that it
 * is in line with what the side and alignment
 * prop values are. Currently only used
 * with the MD animation.
 */
const calculatePopoverOrigin = (side, align, isRTL) => {
  switch (side) {
    case 'top':
      return { originX: getOriginXAlignment(align), originY: 'bottom' };
    case 'bottom':
      return { originX: getOriginXAlignment(align), originY: 'top' };
    case 'left':
      return { originX: 'right', originY: getOriginYAlignment(align) };
    case 'right':
      return { originX: 'left', originY: getOriginYAlignment(align) };
    case 'start':
      return { originX: isRTL ? 'left' : 'right', originY: getOriginYAlignment(align) };
    case 'end':
      return { originX: isRTL ? 'right' : 'left', originY: getOriginYAlignment(align) };
  }
};
const getOriginXAlignment = (align) => {
  switch (align) {
    case 'start':
      return 'left';
    case 'center':
      return 'center';
    case 'end':
      return 'right';
  }
};
const getOriginYAlignment = (align) => {
  switch (align) {
    case 'start':
      return 'top';
    case 'center':
      return 'center';
    case 'end':
      return 'bottom';
  }
};
/**
 * Calculates where the arrow positioning
 * should be relative to the popover content.
 */
const calculateArrowPosition = (side, arrowWidth, arrowHeight, top, left, contentWidth, contentHeight, isRTL) => {
  /**
   * Note: When side is left, right, start, or end, the arrow is
   * been rotated using a `transform`, so to move the arrow up or down
   * by its dimension, you need to use `arrowWidth`.
   */
  const leftPosition = {
    arrowTop: top + contentHeight / 2 - arrowWidth / 2,
    arrowLeft: left + contentWidth - arrowWidth / 2,
  };
  /**
   * Move the arrow to the left by arrowWidth and then
   * again by half of its width because we have rotated
   * the arrow using a transform.
   */
  const rightPosition = { arrowTop: top + contentHeight / 2 - arrowWidth / 2, arrowLeft: left - arrowWidth * 1.5 };
  switch (side) {
    case 'top':
      return { arrowTop: top + contentHeight, arrowLeft: left + contentWidth / 2 - arrowWidth / 2 };
    case 'bottom':
      return { arrowTop: top - arrowHeight, arrowLeft: left + contentWidth / 2 - arrowWidth / 2 };
    case 'left':
      return leftPosition;
    case 'right':
      return rightPosition;
    case 'start':
      return isRTL ? rightPosition : leftPosition;
    case 'end':
      return isRTL ? leftPosition : rightPosition;
    default:
      return { arrowTop: 0, arrowLeft: 0 };
  }
};
/**
 * Calculates the required top/left
 * values needed to position the popover
 * content on the side specified in the
 * `side` prop.
 */
const calculatePopoverSide = (side, triggerBoundingBox, contentWidth, contentHeight, arrowWidth, arrowHeight, isRTL) => {
  const sideLeft = {
    top: triggerBoundingBox.top,
    left: triggerBoundingBox.left - contentWidth - arrowWidth,
  };
  const sideRight = {
    top: triggerBoundingBox.top,
    left: triggerBoundingBox.left + triggerBoundingBox.width + arrowWidth,
  };
  switch (side) {
    case 'top':
      return {
        top: triggerBoundingBox.top - contentHeight - arrowHeight,
        left: triggerBoundingBox.left,
      };
    case 'right':
      return sideRight;
    case 'bottom':
      return {
        top: triggerBoundingBox.top + triggerBoundingBox.height + arrowHeight,
        left: triggerBoundingBox.left,
      };
    case 'left':
      return sideLeft;
    case 'start':
      return isRTL ? sideRight : sideLeft;
    case 'end':
      return isRTL ? sideLeft : sideRight;
  }
};
/**
 * Calculates the required top/left
 * offset values needed to provide the
 * correct alignment regardless while taking
 * into account the side the popover is on.
 */
const calculatePopoverAlign = (align, side, triggerBoundingBox, contentWidth, contentHeight) => {
  switch (align) {
    case 'center':
      return calculatePopoverCenterAlign(side, triggerBoundingBox, contentWidth, contentHeight);
    case 'end':
      return calculatePopoverEndAlign(side, triggerBoundingBox, contentWidth, contentHeight);
    case 'start':
    default:
      return { top: 0, left: 0 };
  }
};
/**
 * Calculate the end alignment for
 * the popover. If side is on the x-axis
 * then the align values refer to the top
 * and bottom margins of the content.
 * If side is on the y-axis then the
 * align values refer to the left and right
 * margins of the content.
 */
const calculatePopoverEndAlign = (side, triggerBoundingBox, contentWidth, contentHeight) => {
  switch (side) {
    case 'start':
    case 'end':
    case 'left':
    case 'right':
      return {
        top: -(contentHeight - triggerBoundingBox.height),
        left: 0,
      };
    case 'top':
    case 'bottom':
    default:
      return {
        top: 0,
        left: -(contentWidth - triggerBoundingBox.width),
      };
  }
};
/**
 * Calculate the center alignment for
 * the popover. If side is on the x-axis
 * then the align values refer to the top
 * and bottom margins of the content.
 * If side is on the y-axis then the
 * align values refer to the left and right
 * margins of the content.
 */
const calculatePopoverCenterAlign = (side, triggerBoundingBox, contentWidth, contentHeight) => {
  switch (side) {
    case 'start':
    case 'end':
    case 'left':
    case 'right':
      return {
        top: -(contentHeight / 2 - triggerBoundingBox.height / 2),
        left: 0,
      };
    case 'top':
    case 'bottom':
    default:
      return {
        top: 0,
        left: -(contentWidth / 2 - triggerBoundingBox.width / 2),
      };
  }
};
/**
 * Adjusts popover positioning coordinates
 * such that popover does not appear offscreen
 * or overlapping safe area bounds.
 */
const calculateWindowAdjustment = (side, coordTop, coordLeft, bodyPadding, bodyWidth, bodyHeight, contentWidth, contentHeight, safeAreaMargin, contentOriginX, contentOriginY, triggerCoordinates, coordArrowTop = 0, coordArrowLeft = 0, arrowHeight = 0) => {
  let arrowTop = coordArrowTop;
  const arrowLeft = coordArrowLeft;
  let left = coordLeft;
  let top = coordTop;
  let bottom;
  let originX = contentOriginX;
  let originY = contentOriginY;
  let checkSafeAreaLeft = false;
  let checkSafeAreaRight = false;
  const triggerTop = triggerCoordinates
    ? triggerCoordinates.top + triggerCoordinates.height
    : bodyHeight / 2 - contentHeight / 2;
  const triggerHeight = triggerCoordinates ? triggerCoordinates.height : 0;
  let addPopoverBottomClass = false;
  /**
   * Adjust popover so it does not
   * go off the left of the screen.
   */
  if (left < bodyPadding + safeAreaMargin) {
    left = bodyPadding;
    checkSafeAreaLeft = true;
    originX = 'left';
    /**
     * Adjust popover so it does not
     * go off the right of the screen.
     */
  }
  else if (contentWidth + bodyPadding + left + safeAreaMargin > bodyWidth) {
    checkSafeAreaRight = true;
    left = bodyWidth - contentWidth - bodyPadding;
    originX = 'right';
  }
  /**
   * Adjust popover so it does not
   * go off the top of the screen.
   * If popover is on the left or the right of
   * the trigger, then we should not adjust top
   * margins.
   */
  if (triggerTop + triggerHeight + contentHeight > bodyHeight && (side === 'top' || side === 'bottom')) {
    if (triggerTop - contentHeight > 0) {
      /**
       * While we strive to align the popover with the trigger
       * on smaller screens this is not always possible. As a result,
       * we adjust the popover up so that it does not hang
       * off the bottom of the screen. However, we do not want to move
       * the popover up so much that it goes off the top of the screen.
       *
       * We chose 12 here so that the popover position looks a bit nicer as
       * it is not right up against the edge of the screen.
       */
      top = Math.max(12, triggerTop - contentHeight - triggerHeight - (arrowHeight - 1));
      arrowTop = top + contentHeight;
      originY = 'bottom';
      addPopoverBottomClass = true;
      /**
       * If not enough room for popover to appear
       * above trigger, then cut it off.
       */
    }
    else {
      bottom = bodyPadding;
    }
  }
  return {
    top,
    left,
    bottom,
    originX,
    originY,
    checkSafeAreaLeft,
    checkSafeAreaRight,
    arrowTop,
    arrowLeft,
    addPopoverBottomClass,
  };
};
const shouldShowArrow = (side, didAdjustBounds = false, ev, trigger) => {
  /**
   * If no event provided and
   * we do not have a trigger,
   * then this popover was likely
   * presented via the popoverController
   * or users called `present` manually.
   * In this case, the arrow should not be
   * shown as we do not have a reference.
   */
  if (!ev && !trigger) {
    return false;
  }
  /**
   * If popover is on the left or the right
   * of a trigger, but we needed to adjust the
   * popover due to screen bounds, then we should
   * hide the arrow as it will never be pointing
   * at the trigger.
   */
  if (side !== 'top' && side !== 'bottom' && didAdjustBounds) {
    return false;
  }
  return true;
};

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const POPOVER_IOS_BODY_PADDING = 5;
/**
 * iOS Popover Enter Animation
 */
// TODO(FW-2832): types
const iosEnterAnimation = (baseEl, opts) => {
  var _a;
  const { event: ev, size, trigger, reference, side, align } = opts;
  const doc = baseEl.ownerDocument;
  const isRTL = doc.dir === 'rtl';
  const bodyWidth = doc.defaultView.innerWidth;
  const bodyHeight = doc.defaultView.innerHeight;
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector('.popover-content');
  const arrowEl = root.querySelector('.popover-arrow');
  const referenceSizeEl = trigger || ((_a = ev === null || ev === void 0 ? void 0 : ev.detail) === null || _a === void 0 ? void 0 : _a.ionShadowTarget) || (ev === null || ev === void 0 ? void 0 : ev.target);
  const { contentWidth, contentHeight } = getPopoverDimensions(size, contentEl, referenceSizeEl);
  const { arrowWidth, arrowHeight } = getArrowDimensions(arrowEl);
  const defaultPosition = {
    top: bodyHeight / 2 - contentHeight / 2,
    left: bodyWidth / 2 - contentWidth / 2,
    originX: isRTL ? 'right' : 'left',
    originY: 'top',
  };
  const results = getPopoverPosition(isRTL, contentWidth, contentHeight, arrowWidth, arrowHeight, reference, side, align, defaultPosition, trigger, ev);
  const padding = size === 'cover' ? 0 : POPOVER_IOS_BODY_PADDING;
  const margin = size === 'cover' ? 0 : 25;
  const { originX, originY, top, left, bottom, checkSafeAreaLeft, checkSafeAreaRight, arrowTop, arrowLeft, addPopoverBottomClass, } = calculateWindowAdjustment(side, results.top, results.left, padding, bodyWidth, bodyHeight, contentWidth, contentHeight, margin, results.originX, results.originY, results.referenceCoordinates, results.arrowTop, results.arrowLeft, arrowHeight);
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const contentAnimation = createAnimation();
  backdropAnimation
    .addElement(root.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
    'pointer-events': 'none',
  })
    .afterClearStyles(['pointer-events']);
  // In Chromium, if the wrapper animates, the backdrop filter doesn't work.
  // The Chromium team stated that this behavior is expected and not a bug. The element animating opacity creates a backdrop root for the backdrop-filter.
  // To get around this, instead of animating the wrapper, animate both the arrow and content.
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1148826
  contentAnimation
    .addElement(root.querySelector('.popover-arrow'))
    .addElement(root.querySelector('.popover-content'))
    .fromTo('opacity', 0.01, 1);
  // TODO(FW-4376) Ensure that arrow also blurs when translucent
  return baseAnimation
    .easing('ease')
    .duration(100)
    .beforeAddWrite(() => {
    if (size === 'cover') {
      baseEl.style.setProperty('--width', `${contentWidth}px`);
    }
    if (addPopoverBottomClass) {
      baseEl.classList.add('popover-bottom');
    }
    if (bottom !== undefined) {
      contentEl.style.setProperty('bottom', `${bottom}px`);
    }
    const safeAreaLeft = ' + var(--ion-safe-area-left, 0)';
    const safeAreaRight = ' - var(--ion-safe-area-right, 0)';
    let leftValue = `${left}px`;
    if (checkSafeAreaLeft) {
      leftValue = `${left}px${safeAreaLeft}`;
    }
    if (checkSafeAreaRight) {
      leftValue = `${left}px${safeAreaRight}`;
    }
    contentEl.style.setProperty('top', `calc(${top}px + var(--offset-y, 0))`);
    contentEl.style.setProperty('left', `calc(${leftValue} + var(--offset-x, 0))`);
    contentEl.style.setProperty('transform-origin', `${originY} ${originX}`);
    if (arrowEl !== null) {
      const didAdjustBounds = results.top !== top || results.left !== left;
      const showArrow = shouldShowArrow(side, didAdjustBounds, ev, trigger);
      if (showArrow) {
        arrowEl.style.setProperty('top', `calc(${arrowTop}px + var(--offset-y, 0))`);
        arrowEl.style.setProperty('left', `calc(${arrowLeft}px + var(--offset-x, 0))`);
      }
      else {
        arrowEl.style.setProperty('display', 'none');
      }
    }
  })
    .addAnimation([backdropAnimation, contentAnimation]);
};

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
/**
 * iOS Popover Leave Animation
 */
const iosLeaveAnimation = (baseEl) => {
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector('.popover-content');
  const arrowEl = root.querySelector('.popover-arrow');
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const contentAnimation = createAnimation();
  backdropAnimation.addElement(root.querySelector('ion-backdrop')).fromTo('opacity', 'var(--backdrop-opacity)', 0);
  contentAnimation
    .addElement(root.querySelector('.popover-arrow'))
    .addElement(root.querySelector('.popover-content'))
    .fromTo('opacity', 0.99, 0);
  return baseAnimation
    .easing('ease')
    .afterAddWrite(() => {
    baseEl.style.removeProperty('--width');
    baseEl.classList.remove('popover-bottom');
    contentEl.style.removeProperty('top');
    contentEl.style.removeProperty('left');
    contentEl.style.removeProperty('bottom');
    contentEl.style.removeProperty('transform-origin');
    if (arrowEl) {
      arrowEl.style.removeProperty('top');
      arrowEl.style.removeProperty('left');
      arrowEl.style.removeProperty('display');
    }
  })
    .duration(300)
    .addAnimation([backdropAnimation, contentAnimation]);
};

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const POPOVER_MD_BODY_PADDING = 12;
/**
 * Md Popover Enter Animation
 */
// TODO(FW-2832): types
const mdEnterAnimation = (baseEl, opts) => {
  var _a;
  const { event: ev, size, trigger, reference, side, align } = opts;
  const doc = baseEl.ownerDocument;
  const isRTL = doc.dir === 'rtl';
  const bodyWidth = doc.defaultView.innerWidth;
  const bodyHeight = doc.defaultView.innerHeight;
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector('.popover-content');
  const referenceSizeEl = trigger || ((_a = ev === null || ev === void 0 ? void 0 : ev.detail) === null || _a === void 0 ? void 0 : _a.ionShadowTarget) || (ev === null || ev === void 0 ? void 0 : ev.target);
  const { contentWidth, contentHeight } = getPopoverDimensions(size, contentEl, referenceSizeEl);
  const defaultPosition = {
    top: bodyHeight / 2 - contentHeight / 2,
    left: bodyWidth / 2 - contentWidth / 2,
    originX: isRTL ? 'right' : 'left',
    originY: 'top',
  };
  const results = getPopoverPosition(isRTL, contentWidth, contentHeight, 0, 0, reference, side, align, defaultPosition, trigger, ev);
  const padding = size === 'cover' ? 0 : POPOVER_MD_BODY_PADDING;
  const { originX, originY, top, left, bottom } = calculateWindowAdjustment(side, results.top, results.left, padding, bodyWidth, bodyHeight, contentWidth, contentHeight, 0, results.originX, results.originY, results.referenceCoordinates);
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();
  const contentAnimation = createAnimation();
  const viewportAnimation = createAnimation();
  backdropAnimation
    .addElement(root.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
    'pointer-events': 'none',
  })
    .afterClearStyles(['pointer-events']);
  wrapperAnimation.addElement(root.querySelector('.popover-wrapper')).duration(150).fromTo('opacity', 0.01, 1);
  contentAnimation
    .addElement(contentEl)
    .beforeStyles({
    top: `calc(${top}px + var(--offset-y, 0px))`,
    left: `calc(${left}px + var(--offset-x, 0px))`,
    'transform-origin': `${originY} ${originX}`,
  })
    .beforeAddWrite(() => {
    if (bottom !== undefined) {
      contentEl.style.setProperty('bottom', `${bottom}px`);
    }
  })
    .fromTo('transform', 'scale(0.8)', 'scale(1)');
  viewportAnimation.addElement(root.querySelector('.popover-viewport')).fromTo('opacity', 0.01, 1);
  return baseAnimation
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(300)
    .beforeAddWrite(() => {
    if (size === 'cover') {
      baseEl.style.setProperty('--width', `${contentWidth}px`);
    }
    if (originY === 'bottom') {
      baseEl.classList.add('popover-bottom');
    }
  })
    .addAnimation([backdropAnimation, wrapperAnimation, contentAnimation, viewportAnimation]);
};

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
/**
 * Md Popover Leave Animation
 */
const mdLeaveAnimation = (baseEl) => {
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector('.popover-content');
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();
  backdropAnimation.addElement(root.querySelector('ion-backdrop')).fromTo('opacity', 'var(--backdrop-opacity)', 0);
  wrapperAnimation.addElement(root.querySelector('.popover-wrapper')).fromTo('opacity', 0.99, 0);
  return baseAnimation
    .easing('ease')
    .afterAddWrite(() => {
    baseEl.style.removeProperty('--width');
    baseEl.classList.remove('popover-bottom');
    contentEl.style.removeProperty('top');
    contentEl.style.removeProperty('left');
    contentEl.style.removeProperty('bottom');
    contentEl.style.removeProperty('transform-origin');
  })
    .duration(150)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

const popoverIosCss = ":host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:flex;position:fixed;align-items:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:flex;position:absolute;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:flex;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start):dir(rtl){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end):dir(rtl){--offset-x:5px}}:host{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}:host(.popover-desktop){--box-shadow:0px 4px 16px 0px rgba(0, 0, 0, 0.12)}.popover-content{border-radius:10px}:host(.popover-desktop) .popover-content{border:0.5px solid var(--ion-color-step-100, #e6e6e6)}.popover-arrow{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow::after{top:3px;border-radius:3px;position:absolute;width:14px;height:14px;transform:rotate(45deg);background:var(--background);content:\"\";z-index:10}@supports (inset-inline-start: 0){.popover-arrow::after{inset-inline-start:3px}}@supports not (inset-inline-start: 0){.popover-arrow::after{left:3px}:host-context([dir=rtl]) .popover-arrow::after{left:unset;right:unset;right:3px}[dir=rtl] .popover-arrow::after{left:unset;right:unset;right:3px}@supports selector(:dir(rtl)){.popover-arrow::after:dir(rtl){left:unset;right:unset;right:3px}}}:host(.popover-bottom) .popover-arrow{top:auto;bottom:-10px}:host(.popover-bottom) .popover-arrow::after{top:-6px}:host(.popover-side-left) .popover-arrow{transform:rotate(90deg)}:host(.popover-side-right) .popover-arrow{transform:rotate(-90deg)}:host(.popover-side-top) .popover-arrow{transform:rotate(180deg)}:host(.popover-side-start) .popover-arrow{transform:rotate(90deg)}:host-context([dir=rtl]):host(.popover-side-start) .popover-arrow,:host-context([dir=rtl]).popover-side-start .popover-arrow{transform:rotate(-90deg)}@supports selector(:dir(rtl)){:host(.popover-side-start) .popover-arrow:dir(rtl){transform:rotate(-90deg)}}:host(.popover-side-end) .popover-arrow{transform:rotate(-90deg)}:host-context([dir=rtl]):host(.popover-side-end) .popover-arrow,:host-context([dir=rtl]).popover-side-end .popover-arrow{transform:rotate(90deg)}@supports selector(:dir(rtl)){:host(.popover-side-end) .popover-arrow:dir(rtl){transform:rotate(90deg)}}.popover-arrow,.popover-content{opacity:0}@supports (backdrop-filter: blur(0)){:host(.popover-translucent) .popover-content,:host(.popover-translucent) .popover-arrow::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);backdrop-filter:saturate(180%) blur(20px)}}";

const popoverMdCss = ":host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:flex;position:fixed;align-items:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:flex;position:absolute;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:flex;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start):dir(rtl){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end):dir(rtl){--offset-x:5px}}:host{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content{border-radius:4px;transform-origin:left top}:host-context([dir=rtl]) .popover-content{transform-origin:right top}[dir=rtl] .popover-content{transform-origin:right top}@supports selector(:dir(rtl)){.popover-content:dir(rtl){transform-origin:right top}}.popover-viewport{transition-delay:100ms}.popover-wrapper{opacity:0}";

const Popover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.didPresent = createEvent(this, "ionPopoverDidPresent", 7);
    this.willPresent = createEvent(this, "ionPopoverWillPresent", 7);
    this.willDismiss = createEvent(this, "ionPopoverWillDismiss", 7);
    this.didDismiss = createEvent(this, "ionPopoverDidDismiss", 7);
    this.didPresentShorthand = createEvent(this, "didPresent", 7);
    this.willPresentShorthand = createEvent(this, "willPresent", 7);
    this.willDismissShorthand = createEvent(this, "willDismiss", 7);
    this.didDismissShorthand = createEvent(this, "didDismiss", 7);
    this.ionMount = createEvent(this, "ionMount", 7);
    this.parentPopover = null;
    this.coreDelegate = CoreDelegate();
    this.inline = false;
    this.focusDescendantOnPresent = false;
    this.onBackdropTap = () => {
      this.dismiss(undefined, BACKDROP);
    };
    this.onLifecycle = (modalEvent) => {
      const el = this.usersElement;
      const name = LIFECYCLE_MAP[modalEvent.type];
      if (el && name) {
        const event = new CustomEvent(name, {
          bubbles: false,
          cancelable: false,
          detail: modalEvent.detail,
        });
        el.dispatchEvent(event);
      }
    };
    this.configureTriggerInteraction = () => {
      const { trigger, triggerAction, el, destroyTriggerInteraction } = this;
      if (destroyTriggerInteraction) {
        destroyTriggerInteraction();
      }
      if (trigger === undefined) {
        return;
      }
      const triggerEl = (this.triggerEl = trigger !== undefined ? document.getElementById(trigger) : null);
      if (!triggerEl) {
        printIonWarning(`A trigger element with the ID "${trigger}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on ion-popover.`, this.el);
        return;
      }
      this.destroyTriggerInteraction = configureTriggerInteraction(triggerEl, triggerAction, el);
    };
    this.configureKeyboardInteraction = () => {
      const { destroyKeyboardInteraction, el } = this;
      if (destroyKeyboardInteraction) {
        destroyKeyboardInteraction();
      }
      this.destroyKeyboardInteraction = configureKeyboardInteraction(el);
    };
    this.configureDismissInteraction = () => {
      const { destroyDismissInteraction, parentPopover, triggerAction, triggerEl, el } = this;
      if (!parentPopover || !triggerEl) {
        return;
      }
      if (destroyDismissInteraction) {
        destroyDismissInteraction();
      }
      this.destroyDismissInteraction = configureDismissInteraction(triggerEl, triggerAction, el, parentPopover);
    };
    this.presented = false;
    this.hasController = false;
    this.delegate = undefined;
    this.overlayIndex = undefined;
    this.enterAnimation = undefined;
    this.leaveAnimation = undefined;
    this.component = undefined;
    this.componentProps = undefined;
    this.keyboardClose = true;
    this.cssClass = undefined;
    this.backdropDismiss = true;
    this.event = undefined;
    this.showBackdrop = true;
    this.translucent = false;
    this.animated = true;
    this.htmlAttributes = undefined;
    this.triggerAction = 'click';
    this.trigger = undefined;
    this.size = 'auto';
    this.dismissOnSelect = false;
    this.reference = 'trigger';
    this.side = 'bottom';
    this.alignment = undefined;
    this.arrow = true;
    this.isOpen = false;
    this.keyboardEvents = false;
    this.keepContentsMounted = false;
  }
  onTriggerChange() {
    this.configureTriggerInteraction();
  }
  onIsOpenChange(newValue, oldValue) {
    if (newValue === true && oldValue === false) {
      this.present();
    }
    else if (newValue === false && oldValue === true) {
      this.dismiss();
    }
  }
  connectedCallback() {
    const { configureTriggerInteraction, el } = this;
    prepareOverlay(el);
    configureTriggerInteraction();
  }
  disconnectedCallback() {
    const { destroyTriggerInteraction } = this;
    if (destroyTriggerInteraction) {
      destroyTriggerInteraction();
    }
  }
  componentWillLoad() {
    const { el } = this;
    const popoverId = setOverlayId(el);
    this.parentPopover = el.closest(`ion-popover:not(#${popoverId})`);
    if (this.alignment === undefined) {
      this.alignment = getIonMode$1(this) === 'ios' ? 'center' : 'start';
    }
  }
  componentDidLoad() {
    const { parentPopover, isOpen } = this;
    /**
     * If popover was rendered with isOpen="true"
     * then we should open popover immediately.
     */
    if (isOpen === true) {
      raf(() => this.present());
    }
    if (parentPopover) {
      addEventListener(parentPopover, 'ionPopoverWillDismiss', () => {
        this.dismiss(undefined, undefined, false);
      });
    }
  }
  /**
   * When opening a popover from a trigger, we should not be
   * modifying the `event` prop from inside the component.
   * Additionally, when pressing the "Right" arrow key, we need
   * to shift focus to the first descendant in the newly presented
   * popover.
   *
   * @internal
   */
  async presentFromTrigger(event, focusDescendant = false) {
    this.focusDescendantOnPresent = focusDescendant;
    await this.present(event);
    this.focusDescendantOnPresent = false;
  }
  /**
   * Determines whether or not an overlay
   * is being used inline or via a controller/JS
   * and returns the correct delegate.
   * By default, subsequent calls to getDelegate
   * will use a cached version of the delegate.
   * This is useful for calling dismiss after
   * present so that the correct delegate is given.
   */
  getDelegate(force = false) {
    if (this.workingDelegate && !force) {
      return {
        delegate: this.workingDelegate,
        inline: this.inline,
      };
    }
    /**
     * If using overlay inline
     * we potentially need to use the coreDelegate
     * so that this works in vanilla JS apps.
     * If a developer has presented this component
     * via a controller, then we can assume
     * the component is already in the
     * correct place.
     */
    const parentEl = this.el.parentNode;
    const inline = (this.inline = parentEl !== null && !this.hasController);
    const delegate = (this.workingDelegate = inline ? this.delegate || this.coreDelegate : this.delegate);
    return { inline, delegate };
  }
  /**
   * Present the popover overlay after it has been created.
   * Developers can pass a mouse, touch, or pointer event
   * to position the popover relative to where that event
   * was dispatched.
   */
  async present(event) {
    if (this.presented) {
      return;
    }
    /**
     * When using an inline popover
     * and dismissing a popover it is possible to
     * quickly present the popover while it is
     * dismissing. We need to await any current
     * transition to allow the dismiss to finish
     * before presenting again.
     */
    if (this.currentTransition !== undefined) {
      await this.currentTransition;
    }
    const { el } = this;
    const { inline, delegate } = this.getDelegate(true);
    this.usersElement = await attachComponent(delegate, el, this.component, ['popover-viewport'], this.componentProps, inline);
    if (!this.keyboardEvents) {
      this.configureKeyboardInteraction();
    }
    this.configureDismissInteraction();
    this.ionMount.emit();
    /**
     * When using the lazy loaded build of Stencil, we need to wait
     * for every Stencil component instance to be ready before presenting
     * otherwise there can be a flash of unstyled content. With the
     * custom elements bundle we need to wait for the JS framework
     * mount the inner contents of the overlay otherwise WebKit may
     * get the transition incorrect.
     */
    if (hasLazyBuild(el)) {
      await deepReady(this.usersElement);
      /**
       * If keepContentsMounted="true" then the
       * JS Framework has already mounted the inner
       * contents so there is no need to wait.
       * Otherwise, we need to wait for the JS
       * Framework to mount the inner contents
       * of this component.
       */
    }
    else if (!this.keepContentsMounted) {
      await waitForMount();
    }
    this.currentTransition = present(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, {
      event: event || this.event,
      size: this.size,
      trigger: this.triggerEl,
      reference: this.reference,
      side: this.side,
      align: this.alignment,
    });
    await this.currentTransition;
    this.currentTransition = undefined;
    /**
     * If popover is nested and was
     * presented using the "Right" arrow key,
     * we need to move focus to the first
     * descendant inside of the popover.
     */
    if (this.focusDescendantOnPresent) {
      focusFirstDescendant(this.el, this.el);
    }
  }
  /**
   * Dismiss the popover overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
   * @param dismissParentPopover If `true`, dismissing this popover will also dismiss
   * a parent popover if this popover is nested. Defaults to `true`.
   */
  async dismiss(data, role, dismissParentPopover = true) {
    /**
     * When using an inline popover
     * and presenting a popover it is possible to
     * quickly dismiss the popover while it is
     * presenting. We need to await any current
     * transition to allow the present to finish
     * before dismissing again.
     */
    if (this.currentTransition !== undefined) {
      await this.currentTransition;
    }
    const { destroyKeyboardInteraction, destroyDismissInteraction } = this;
    if (dismissParentPopover && this.parentPopover) {
      this.parentPopover.dismiss(data, role, dismissParentPopover);
    }
    this.currentTransition = dismiss(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.event);
    const shouldDismiss = await this.currentTransition;
    if (shouldDismiss) {
      if (destroyKeyboardInteraction) {
        destroyKeyboardInteraction();
        this.destroyKeyboardInteraction = undefined;
      }
      if (destroyDismissInteraction) {
        destroyDismissInteraction();
        this.destroyDismissInteraction = undefined;
      }
      /**
       * If using popover inline
       * we potentially need to use the coreDelegate
       * so that this works in vanilla JS apps
       */
      const { delegate } = this.getDelegate();
      await detachComponent(delegate, this.usersElement);
    }
    this.currentTransition = undefined;
    return shouldDismiss;
  }
  /**
   * @internal
   */
  async getParentPopover() {
    return this.parentPopover;
  }
  /**
   * Returns a promise that resolves when the popover did dismiss.
   */
  onDidDismiss() {
    return eventMethod(this.el, 'ionPopoverDidDismiss');
  }
  /**
   * Returns a promise that resolves when the popover will dismiss.
   */
  onWillDismiss() {
    return eventMethod(this.el, 'ionPopoverWillDismiss');
  }
  render() {
    const mode = getIonMode$1(this);
    const { onLifecycle, parentPopover, dismissOnSelect, side, arrow, htmlAttributes } = this;
    const desktop = isPlatform('desktop');
    const enableArrow = arrow && !parentPopover;
    return (h(Host, Object.assign({ "aria-modal": "true", "no-router": true, tabindex: "-1" }, htmlAttributes, { style: {
        zIndex: `${20000 + this.overlayIndex}`,
      }, class: Object.assign(Object.assign({}, getClassMap(this.cssClass)), { [mode]: true, 'popover-translucent': this.translucent, 'overlay-hidden': true, 'popover-desktop': desktop, [`popover-side-${side}`]: true, 'popover-nested': !!parentPopover }), onIonPopoverDidPresent: onLifecycle, onIonPopoverWillPresent: onLifecycle, onIonPopoverWillDismiss: onLifecycle, onIonPopoverDidDismiss: onLifecycle, onIonBackdropTap: this.onBackdropTap }), !parentPopover && h("ion-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop, part: "backdrop" }), h("div", { class: "popover-wrapper ion-overlay-wrapper", onClick: dismissOnSelect ? () => this.dismiss() : undefined }, enableArrow && h("div", { class: "popover-arrow", part: "arrow" }), h("div", { class: "popover-content", part: "content" }, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "trigger": ["onTriggerChange"],
    "triggerAction": ["onTriggerChange"],
    "isOpen": ["onIsOpenChange"]
  }; }
};
const LIFECYCLE_MAP = {
  ionPopoverDidPresent: 'ionViewDidEnter',
  ionPopoverWillPresent: 'ionViewWillEnter',
  ionPopoverWillDismiss: 'ionViewWillLeave',
  ionPopoverDidDismiss: 'ionViewDidLeave',
};
Popover.style = {
  ios: popoverIosCss,
  md: popoverMdCss
};

const rippleEffectCss = ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{transform:translate(var(--translate-end)) scale(var(--final-scale, 1));animation:150ms fadeOutAnimation forwards}@keyframes rippleAnimation{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:scale(1)}to{transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes fadeInAnimation{from{animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeOutAnimation{from{animation-timing-function:linear;opacity:0.16}to{opacity:0}}";

const RippleEffect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'bounded';
  }
  /**
   * Adds the ripple effect to the parent element.
   *
   * @param x The horizontal coordinate of where the ripple should start.
   * @param y The vertical coordinate of where the ripple should start.
   */
  async addRipple(x, y) {
    return new Promise((resolve) => {
      readTask(() => {
        const rect = this.el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const hypotenuse = Math.sqrt(width * width + height * height);
        const maxDim = Math.max(height, width);
        const maxRadius = this.unbounded ? maxDim : hypotenuse + PADDING;
        const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
        const finalScale = maxRadius / initialSize;
        let posX = x - rect.left;
        let posY = y - rect.top;
        if (this.unbounded) {
          posX = width * 0.5;
          posY = height * 0.5;
        }
        const styleX = posX - initialSize * 0.5;
        const styleY = posY - initialSize * 0.5;
        const moveX = width * 0.5 - posX;
        const moveY = height * 0.5 - posY;
        writeTask(() => {
          const div = document.createElement('div');
          div.classList.add('ripple-effect');
          const style = div.style;
          style.top = styleY + 'px';
          style.left = styleX + 'px';
          style.width = style.height = initialSize + 'px';
          style.setProperty('--final-scale', `${finalScale}`);
          style.setProperty('--translate-end', `${moveX}px, ${moveY}px`);
          const container = this.el.shadowRoot || this.el;
          container.appendChild(div);
          setTimeout(() => {
            resolve(() => {
              removeRipple(div);
            });
          }, 225 + 100);
        });
      });
    });
  }
  get unbounded() {
    return this.type === 'unbounded';
  }
  render() {
    const mode = getIonMode$1(this);
    return (h(Host, { role: "presentation", class: {
        [mode]: true,
        unbounded: this.unbounded,
      } }));
  }
  get el() { return getElement(this); }
};
const removeRipple = (ripple) => {
  ripple.classList.add('fade-out');
  setTimeout(() => {
    ripple.remove();
  }, 200);
};
const PADDING = 10;
const INITIAL_ORIGIN_SCALE = 0.5;
RippleEffect.style = rippleEffectCss;

const getIntlMessage = async (locale) => {
  let messages = {};
  if (locale === 'en') {
    const response = await import('./en.translation-9040786e.js');
    messages = response.default;
  }
  else if (locale === 'hu') {
    const response = await import('./hu.translation-6cbd0fba.js');
    messages = response.default;
  }
  return messages;
};

const resultComponentCss = ":host{display:block}.result-container{background:#e8f1f1;border:1px solid #2b7371;border-radius:2px;padding:0.5625em;display:flex;flex-direction:column;margin-bottom:1.25em}.result-with-tag{display:flex;justify-content:space-between;margin-top:0.625em}.fade-in.top{transition:0.5s all ease-in-out;transform:translate3d(0, -50px, 0);opacity:0}.fade-in.show{opacity:1;transform:translate3d(0, 0, 0)}";

const ResultComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tag = 'neutral';
    this.resultFailTags = ["nem jogosult", "not eligible", "negatív", "negative", "fail"];
    this.resultSuccessTags = ["jogosult", "eligible", "pozitív", "positive", "success"];
    this.messages = {};
    this.resultData = undefined;
    this.locale = 'hu';
    this.lastLocale = '';
    this.isDetailOpen = false;
    this.showContent = false;
  }
  async loadMessages() {
    if (this.locale !== this.lastLocale) {
      this.lastLocale = this.locale;
      this.messages = await getIntlMessage(this.locale);
    }
  }
  async componentWillLoad() {
    console.log("componentWillLoad-result");
    this.showContent = false;
    this.resultD = Object.assign({}, this.resultData);
    this.makeResultLabel('');
    this.setTag();
    this.makeResultLabel('layman');
    await this.loadMessages();
    setTimeout(() => {
      this.showContent = true;
      this.setFocus();
    }, 1000);
  }
  setFocus() {
    setTimeout(() => {
      console.log("setFocus result");
      const resultContainer = this.element.querySelector('div');
      resultContainer.focus();
    }, 1000);
  }
  makeResultLabel(type) {
    let tmp;
    switch (type) {
      case '':
        tmp = this.resultD.label.split('...');
        break;
      case 'expert':
        tmp = this.resultD.labelExpert.split('...');
        break;
      case 'layman':
        tmp = this.resultD.labelLayman.split('...');
        break;
    }
    this.result = tmp[0];
    this.details = tmp[1] !== undefined ? [tmp[1]] : null;
    if (this.details) {
      this.details = this.details[0].split('\n');
      this.details.shift();
      this.details.pop();
    }
  }
  setTag() {
    if (this.resultD.metadata) {
      if (this.resultD.metadata.tag.length === 0) {
        this.tag = 'neutral';
      }
      else {
        this.resultD.metadata.tag.forEach((tag) => {
          this.tag = this.resultFailTags.indexOf(tag) !== -1 ? 'negative' : '';
          if (this.tag === '') {
            this.tag = this.resultSuccessTags.indexOf(tag) !== -1 ? 'positive' : 'neutral';
          }
        });
      }
    }
  }
  handleResultValueChange() {
    this.showContent = false;
    console.log("handleResultValueChangeresult", this.resultData);
    this.resultD = Object.assign({}, this.resultData);
    this.makeResultLabel('');
    this.setTag();
    this.makeResultLabel('layman');
    setTimeout(() => {
      this.showContent = true;
      this.setFocus();
    }, 1000);
  }
  // @Watch('details')
  toggleDetails() {
    this.isDetailOpen = !this.isDetailOpen;
  }
  render() {
    const svgWidth = '1.5em'; // A szélesség beállítása
    const svgColor = "#2B7371"; // A szín beállítása
    const svgPathDown = "M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z";
    const svgPathUp = "M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z";
    const svgPathCheck = "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z";
    const svgPathBan = "M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z";
    const svgViewBox = "0 0 512 512";
    const svgTarget = "M36.8904 0.0493164L30.9054 5.2914L30.9467 8.92371L16.8302 21.224C16.4774 21.5422 16.496 22.1159 16.8715 22.5449C17.25 22.9773 17.8322 23.0671 18.1923 22.7513L32.1437 10.5748L36.0236 11.1526L42.0087 5.95182L36.9317 5.16757L36.8904 0.0493164ZM16.7064 6.61224C7.51058 6.61224 0.0720215 14.0921 0.0720215 23.2878C0.0720215 32.4836 7.51058 39.9222 16.7064 39.9222C25.9021 39.9222 33.382 32.4836 33.382 23.2878C33.382 20.1793 32.5161 17.2787 31.0292 14.7849L27.8922 17.5092C28.7739 19.2455 29.2543 21.2083 29.2543 23.2878C29.2543 30.3199 23.5733 36.0009 16.5412 36.0009C9.50919 36.0009 3.78688 30.3199 3.78688 23.2878C3.78688 16.2558 9.50919 10.5335 16.5412 10.5335C19.1249 10.5335 21.5128 11.3125 23.5169 12.6386L26.6539 9.91434C23.875 7.84239 20.4317 6.61224 16.7064 6.61224ZM16.5412 13.8356C11.363 13.9086 7.19918 18.1504 7.21281 23.3291C7.22656 28.5501 11.4853 32.7539 16.7064 32.7401C21.9274 32.7264 26.1311 28.5089 26.1173 23.2878C26.114 22.0152 25.8759 20.8059 25.4156 19.6968L24.0123 20.8526C24.258 21.6079 24.4228 22.4104 24.425 23.2466C24.4362 27.5305 20.9903 30.9952 16.7064 31.0065C12.4224 31.0177 8.9577 27.5718 8.94642 23.2878C8.93519 19.0386 12.3337 15.5466 16.5825 15.4866H16.6651C17.7036 15.4839 18.691 15.6945 19.5957 16.0645L20.9578 14.8675C19.6541 14.1947 18.1889 13.8315 16.6238 13.8356H16.5412ZM16.5 18.7475C16.2329 18.7624 15.9665 18.8159 15.7157 18.8713C14.8472 19.063 14.0843 19.4927 13.4868 20.1096C12.8893 20.7264 12.4629 21.5042 12.2898 22.3798C12.2315 22.6709 12.2064 22.9796 12.2072 23.2878C12.2081 23.5986 12.2294 23.9028 12.2898 24.1959C12.4113 24.7817 12.6666 25.3276 12.9915 25.8057C13.3147 26.2849 13.7104 26.6793 14.1885 27.0027C14.9057 27.4878 15.774 27.7894 16.7064 27.787C17.2628 27.7855 17.7826 27.686 18.2749 27.498C18.6073 27.3711 18.9344 27.201 19.2242 27.0027C19.4727 26.8326 19.6749 26.6398 19.8846 26.4248C20.0877 26.2206 20.2601 26.0043 20.4212 25.7644C20.7446 25.2814 21.004 24.7425 21.1229 24.1547C21.177 23.8872 21.2021 23.6106 21.2055 23.3291L19.637 24.6912C18.8341 25.3973 17.2442 24.865 16.0459 23.4942C14.8573 22.1346 14.5616 20.4953 15.3442 19.7794L16.5 18.7475Z";
    return (h("div", { class: `result-container fade-in top ${this.showContent ? 'show' : ''}` }, h("div", { style: { alignSelf: 'center' } }, h("svg", { width: "43", height: "40", viewBox: "0 0 43 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("g", { "clip-path": "url(#clip0_1531_83)" }, h("path", { d: svgTarget, fill: svgColor })), h("defs", null, h("clipPath", { id: "clip0_1531_83" }, h("rect", { width: "42.0638", height: "40", fill: "white" }))))), h("div", { class: "result-with-tag" }, h("div", { innerHTML: this.result }), this.tag === 'positive' && (h("div", null, h("svg", { viewBox: svgViewBox, width: svgWidth }, h("path", { d: svgPathCheck, fill: svgColor })))), this.tag === 'negative' && (h("div", null, h("svg", { viewBox: svgViewBox, width: svgWidth }, h("path", { d: svgPathBan, fill: "#FD1313" }))))), this.details && (h("div", { style: { marginTop: '0.625em' } }, h("span", { class: "clickable", style: { color: '#2B7371', fontWeight: '600', marginRight: '0.9375em' }, onClick: () => this.toggleDetails() }, this.messages['result-more']), !this.isDetailOpen ? (h("svg", { class: "clickable", width: svgWidth, viewBox: svgViewBox, onClick: () => this.toggleDetails() }, h("path", { d: svgPathDown, fill: svgColor }))) : (h("svg", { class: "clickable", width: svgWidth, viewBox: svgViewBox, onClick: () => this.toggleDetails() }, h("path", { d: svgPathUp, fill: svgColor }))))), this.isDetailOpen && (h("div", { style: { marginTop: '0.625em' } }, h("ul", { style: { marginBottom: '0' } }, this.details.map((d) => (h("li", { innerHTML: d }))))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "locale": ["loadMessages"],
    "resultData": ["handleResultValueChange"]
  }; }
};
ResultComponent.style = resultComponentCss;

const stepComponentCss = ":host{display:block}.answer{display:flex;align-items:center;justify-content:flex-end}.speech-bubble-triangle{display:flex;max-width:84%}.triangle-topright{border-top:7px solid #bfc1c7;border-right:7px solid transparent}.speech-bubble-answer{background:#e8f1f1;border:1px solid #bfc1c7;border-radius:10px 0px 10px 10px;padding:0.3125em}.speech-bubble-answer.date{display:flex}.answer-button{margin:0.3125em;border:1px solid #2b7371;background:#ffffff;border-radius:20px;color:#2b7371;padding:0.3125em 0.625em;font-weight:600}.answer-button.active,.answer-input.active{background:#2b7371;color:#ffffff}.options-container{display:flex;flex-direction:row;flex-wrap:wrap}.answer-input{margin:0.0625em !important;border:1px solid #2b7371;border-radius:2px;padding-left:0.625em;padding-right:0.625em;color:#2b7371;text-align:right;background-color:#ffffff}.answer-input:focus-visible{border-color:#2b7371}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=\"number\"]{-moz-appearance:textfield}.fade-in.left{transition:0.5s all ease-in-out;transform:translate3d(-50px, 0, 0);opacity:0}.fade-in.right{transition:0.5s all ease-in-out;transform:translate3d(50px, 0, 0);opacity:0}.fade-in.show{opacity:1;transform:translate3d(0, 0, 0)}.answer-input:disabled,.answer-button:disabled{opacity:.4}";

const StepComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.answer = createEvent(this, "answer", 7);
    this.revokeAnswer = createEvent(this, "revokeAnswer", 7);
    this.messages = {};
    this.options = [];
    this.localDateAnswerValue = undefined;
    this.fragment = undefined;
    this.answerValue = undefined;
    this.controlDisabled = undefined;
    this.locale = 'hu';
    this.lastLocale = '';
    this.isActive = false;
    this.isDateActive = false;
    this.showContent = false;
  }
  async loadMessages() {
    if (this.locale !== this.lastLocale) {
      this.lastLocale = this.locale;
      this.messages = await getIntlMessage(this.locale);
    }
  }
  handleAnswerValueChange(newValue) {
    console.log("answerValue");
    this.numberAnswerValue = newValue + '';
    this.localNumberAnswerValue = newValue + '';
    this.dateAnswerValue = newValue;
    this.stringAnswerValue = newValue;
    this.yesButtonClass();
    this.noButtonClass();
    this.isActive = true;
    this.isDateActive = true;
  }
  handleFragmentValueChange(newValue, oldValue) {
    console.log("old", oldValue);
    console.log("new", newValue);
    this.showContent = false;
    if (this.fragment.type === 'QuestionMenu') {
      this.options = [];
      for (let i = 0; i < this.fragment.optionsExpert.length; i++) {
        this.options.push(this.fragment.optionsLayman[i]);
      }
    }
    console.log("handleFragmentValueChange", this.options);
    setTimeout(() => {
      this.showContent = true;
      this.setFocus();
    }, 1000); // 200ms késleltetés*
    console.log("fragment");
  }
  async componentWillLoad() {
    this.showContent = false;
    if (this.answerValue) {
      this.numberAnswerValue = this.answerValue;
      this.localNumberAnswerValue = this.numberAnswerValue;
      this.dateAnswerValue = this.answerValue;
      this.stringAnswerValue = this.answerValue;
      this.yesButtonClass();
      this.noButtonClass();
    }
    if (this.fragment.type === 'QuestionMenu') {
      for (let i = 0; i < this.fragment.optionsExpert.length; i++) {
        this.options.push(this.fragment.optionsLayman[i]);
      }
    }
    setTimeout(() => {
      this.showContent = true;
      this.setFocus();
    }, 1000); // 200ms késleltetés
    console.log("componentWillLoad", this.options);
    await this.loadMessages();
  }
  componentDidLoad() {
    console.log("componentDidLoad");
    //this.setFocus();
  }
  setFocus() {
    setTimeout(() => {
      console.log("setFocus");
      const firstInput = this.element.querySelector('input');
      console.log("input", firstInput);
      if (!firstInput) {
        console.log(this.element);
      }
      if (!(this.answerValue !== null && this.answerValue !== undefined)) {
        console.log("focus", firstInput);
        if (firstInput) {
          firstInput.focus();
        }
        else {
          const firstButton = this.element.querySelector('button');
          if (firstButton) {
            firstButton.focus();
          }
        }
      }
    }, 1000);
  }
  render() {
    const svgWidth = '1.5em'; // A szélesség beállítása
    const svgColor = "#2B7371"; // A szín beállítása
    const svgViewBox = "0 0 512 512";
    const svgPathCalendar = "M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z";
    return (h("div", { class: "step" }, this.fragment.type != 'Goal' && (h("div", null, h("step-question", { fragment: this.fragment, isActiveQuestion: !(this.answerValue !== null && this.answerValue !== undefined) }), h("div", { class: `answer fade-in right ${this.showContent ? 'show' : ''}` }, this.fragment.type === 'QuestionMenu' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("div", { class: "options-container" }, this.options.map((op, index) => (h("button", { class: { "answer-button": true, "active": this.answerValue === index }, disabled: this.controlDisabled, onClick: () => this.menuAnswer(index) }, h("div", null, op)))))), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionYesNo' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("button", { class: { "answer-button": true, "active": this.yesButtonClass() }, disabled: this.controlDisabled, onClick: () => this.yesNoAnswer('true') }, this.messages['question-yes']), h("button", { class: { "answer-button": true, "active": this.noButtonClass() }, disabled: this.controlDisabled, onClick: () => this.yesNoAnswer('false') }, this.messages['question-no'])), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionInteger' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("form", { onSubmit: (event) => {
        event.preventDefault();
        const form = event.target;
        this.numberAnswerValue = form.getElementsByTagName('input')[0].value;
        this.numberAnswer();
      } }, h("input", { type: "number", inputMode: 'numeric', min: "0", step: "1", class: { "answer-input": true, "active": this.isActive }, value: this.localNumberAnswerValue, onInput: (event) => this.onNumberInput(event), disabled: this.controlDisabled, onKeyDown: () => this.setNumberActive(), style: { width: '8em' } }), h("input", { type: "submit", hidden: true }))), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionDecimal' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("input", { type: "number", inputMode: 'numeric', class: { "answer-input": true, "active": this.isActive }, value: this.localNumberAnswerValue, onInput: (event) => this.onNumberInput(event), disabled: this.controlDisabled, onKeyDown: (event) => this.checkNumberInput(event), style: { width: '8em' } })), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionString' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("input", { type: "text", class: { "answer-input": true, "active": this.answerValue === this.stringAnswerValue }, value: this.stringAnswerValue, onInput: (event) => (this.stringAnswerValue = event.target.value), disabled: this.controlDisabled, style: { width: '15.5em' } })), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionDate' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer date" }, h("form", { onSubmit: (event) => {
        event.preventDefault();
        console.log("submit");
        this.dateAnswerValue = this.localDateAnswerValue;
        this.setDateActive();
        this.dateAnswer();
      }, style: { marginRight: '0.625em' } }, h("input", { type: "text", pattern: "\\d{4}-\\d{2}-\\d{2}", required: true, placeholder: "YYYY-MM-DD", value: this.localDateAnswerValue, class: { "answer-input": true, "active": this.isDateActive }, disabled: this.controlDisabled, onInput: (event) => this.onDateInput(event), onKeyDown: () => this.setDateActive(), style: { width: '8em' } }), h("input", { type: "submit", hidden: true })), h("button", { id: "date", onClick: (ev) => this.presentPopover(ev) }, h("svg", { viewBox: svgViewBox, width: svgWidth }, h("path", { d: svgPathCalendar, fill: svgColor })))), h("div", { class: "triangle-topright" }))))))));
  }
  async presentPopover(ev) {
    const popover = await popoverController.create({
      component: 'ion-popover',
      event: ev,
    });
    //const popoverContent = document.createElement('div');
    //popoverContent.innerHTML = "Teszt"
    const popoverContent = document.createElement('ion-datetime');
    /*popoverContent.presentation = 'date';
    popoverContent.firstDayOfWeek = 1;
    popoverContent.showDefaultButtons = true;
    popoverContent.locale = this.locale;
    popoverContent.doneText = this.messages['confirmText'];
    popoverContent.cancelText = this.messages['cancelText'];
    popoverContent.addEventListener('ionChange', (event: CustomEvent) => {
      this.handleDateChange(event.detail.value);
    });*/
    popover.appendChild(popoverContent);
    await popover.present();
  }
  handleDateChange(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.localDateAnswerValue = `${year}-${this.padZero(month)}-${this.padZero(day)}`;
    this.dateAnswerValue = this.localDateAnswerValue;
    this.dateAnswer();
  }
  padZero(value) {
    return value.toString().padStart(2, '0');
  }
  onDateInput(event) {
    this.localDateAnswerValue = event.target.value;
    this.setDateActive();
  }
  setDateActive() {
    this.isDateActive = this.answerValue === this.dateAnswerValue && this.localDateAnswerValue === this.dateAnswerValue;
    console.log("isDateActive,", this.isDateActive);
  }
  onNumberInput(event) {
    this.localNumberAnswerValue = event.target.value;
    this.setNumberActive();
  }
  checkNumberInput(event) {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      this.numberAnswerValue = event.target.value;
      this.numberAnswer();
    }
    this.setNumberActive();
  }
  setNumberActive() {
    this.isActive = this.answerValue === (this.numberAnswerValue + '').replace(',', '.') && (this.localNumberAnswerValue + '').replace(',', '.') === this.numberAnswerValue;
    console.log("isActive,", this.isActive);
  }
  menuAnswer(index) {
    if (this.answerValue === undefined) {
      this.answerValue = index;
      this.fragment.answer = this.answerValue;
      this.answer.emit({ answer: this.answerValue, iri: this.fragment.iri });
    }
    else {
      this.answerValue = index;
      this.fragment.answer = this.answerValue;
      this.revokeAnswer.emit({ answer: this.answerValue, iri: this.fragment.iri });
    }
  }
  yesNoAnswer(value) {
    if (this.answerValue === undefined) {
      this.answerValue = value;
      this.fragment.answer = this.answerValue;
      this.answer.emit({ answer: this.answerValue, iri: this.fragment.iri });
    }
    else {
      this.answerValue = value;
      this.fragment.answer = this.answerValue;
      this.revokeAnswer.emit({ answer: this.answerValue, iri: this.fragment.iri });
    }
    this.yesButtonClass();
    this.noButtonClass();
  }
  numberAnswer() {
    if (!this.answerValue) {
      if (this.numberAnswerValue) {
        this.answerValue = this.numberAnswerValue.replace(',', '.');
        this.fragment.answer = this.answerValue;
        this.answer.emit({ answer: this.answerValue, iri: this.fragment.iri });
      }
    }
    else {
      if (this.numberAnswerValue) {
        this.answerValue = this.numberAnswerValue.replace(',', '.');
        this.fragment.answer = this.answerValue;
        this.revokeAnswer.emit({ answer: this.answerValue, iri: this.fragment.iri });
      }
    }
  }
  stringAnswer() {
    if (!this.answerValue) {
      if (this.stringAnswerValue) {
        this.answerValue = this.stringAnswerValue;
        this.fragment.answer = this.answerValue;
        this.answer.emit({ answer: this.answerValue, iri: this.fragment.iri });
      }
    }
    else {
      if (this.stringAnswerValue) {
        this.answerValue = this.stringAnswerValue;
        this.fragment.answer = this.answerValue;
        this.revokeAnswer.emit({ answer: this.answerValue, iri: this.fragment.iri });
      }
    }
  }
  dateAnswer() {
    if (!this.answerValue) {
      if (this.dateAnswerValue) {
        this.answerValue = this.dateAnswerValue;
        this.fragment.answer = this.answerValue;
        this.answer.emit({ answer: this.answerValue, iri: this.fragment.iri });
      }
    }
    else {
      if (this.dateAnswerValue) {
        this.answerValue = this.dateAnswerValue;
        this.fragment.answer = this.answerValue;
        this.revokeAnswer.emit({ answer: this.answerValue, iri: this.fragment.iri });
      }
    }
  }
  yesButtonClass() {
    let ans = this.answerValue + '';
    if (ans === 'undefined' || ans === 'null') {
      return false;
    }
    return ans === 'true';
  }
  noButtonClass() {
    let ans = this.answerValue + '';
    if (ans === 'undefined' || ans === 'null') {
      return false;
    }
    return ans === 'false';
  }
  okButtonClass() {
    let ans = this.answerValue + '';
    if (ans === 'undefined' || ans === 'null') {
      return 'unselected-btn';
    }
    return 'selected-btn';
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "locale": ["loadMessages"],
    "answerValue": ["handleAnswerValueChange"],
    "fragment": ["handleFragmentValueChange"]
  }; }
};
StepComponent.style = stepComponentCss;

const stepQuestionCss = ":host{display:block}.question{display:flex;align-items:center;margin-bottom:1.25em;margin-top:1.25em}.speech-bubble-triangle{display:flex;max-width:84%}.triangle-topleft{border-top:7px solid #bfc1c7;border-left:7px solid transparent}.speech-bubble-question{background:#ffffff;border:1px solid #bfc1c7;border-radius:0px 10px 10px 10px;padding:0.625em}.speech-bubble-question.active{background:#f5f4d8}.infoicon{margin-left:0.625em;color:#2b7371}.clickable{cursor:pointer}ion-popover.full-size{--width:calc(100vw - var(--page-margin) * 2);--box-shadow:0 5px 10px 0 rgba(0, 0, 0, 0.6);--border-radius:20px;--overflow:hidden;--width:calc(100%);--margin-left:auto;--margin-right:auto}ion-popover.full-size::part(content){margin:var(--page-margin);left:0;border-radius:10px}ion-popover.full-size::part(backdrop){background-color:var(--special-transparent)}ion-popover.full-size::part(arrow){display:none}ion-popover h1{margin:0 0 10px 0}ion-popover ion-content{--background:#ecebeb}ion-popover.warning ion-content{--background:var(--special-warning)}";

const StepQuestion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fragment = undefined;
    this.isActiveQuestion = undefined;
    this.showContent = false;
  }
  handleFragmentValueChange() {
    this.showContent = false;
    setTimeout(() => {
      this.showContent = true;
    }, 1000); // 200ms késleltetés
    console.log("q-fragment");
  }
  hasTooltip() {
    return !!this.fragment.descriptionLayman;
  }
  async componentWillLoad() {
    this.showContent = false;
    setTimeout(() => {
      this.showContent = true;
    }, 200); // 200ms késleltetés
    console.log("componentWillLoad-q");
  }
  async presentPopover(ev) {
    if (this.fragment.descriptionLayman.trim() !== '') {
      const buttonId = `button-${this.fragment.iri}`; // Az egyedi gomb ID-je
      const button = document.getElementById(buttonId); // A gomb elem lekérése
      console.log(button);
      if (!button) {
        return; // Kilépés, ha nem található a gomb elem
      }
      const popover = await popoverController.create({
        component: 'ion-popover',
        event: ev,
        alignment: "center",
        translucent: true,
        showBackdrop: false,
        cssClass: 'full-size',
        animated: true,
        componentProps: {}
      });
      const popoverContent = document.createElement('ion-content');
      popoverContent.classList.add("ion-padding");
      popoverContent.innerHTML = this.fragment.descriptionLayman;
      popover.appendChild(popoverContent);
      //const rect = button.getBoundingClientRect();
      //popover.style.top = rect.bottom + 'px';
      //popover.style.left = rect.left + 'px';
      await popover.present();
    }
  }
  render() {
    const svgWidth = '1.5em'; // A szélesség beállítása
    const svgColor = "#2B7371"; // A szín beállítása
    const svgPath = "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z";
    const svgViewBox = "0 0 512 512";
    if (!this.hasTooltip()) {
      return (h("div", { class: `question fade-in left ${this.showContent ? 'show' : ''}` }, h("div", { class: "speech-bubble-triangle" }, h("div", { class: "triangle-topleft" }), h("span", { class: { "speech-bubble-question": true, "active": this.isActiveQuestion }, innerHTML: this.fragment.labelLayman }))));
    }
    return (h("div", { class: `question fade-in left ${this.showContent ? 'show' : ''}` }, h("div", { class: "speech-bubble-triangle" }, h("div", { class: "triangle-topleft" }), h("span", { class: { "speech-bubble-question": true, "active": this.isActiveQuestion }, innerHTML: this.fragment.labelLayman })), h("svg", { id: `button-${this.fragment.iri}`, class: "infoicon clickable", width: svgWidth, viewBox: svgViewBox, onClick: (ev) => this.presentPopover(ev) }, h("path", { d: svgPath, fill: svgColor }))));
  }
  static get watchers() { return {
    "fragment": ["handleFragmentValueChange"]
  }; }
};
StepQuestion.style = stepQuestionCss;

export { DescriptionComponent as description_component, DialogComponent as dialog_component, Backdrop as ion_backdrop, Button as ion_button, Buttons as ion_buttons, Content as ion_content, Datetime as ion_datetime, Icon as ion_icon, Item as ion_item, Label as ion_label, Note as ion_note, PickerColumnInternal as ion_picker_column_internal, PickerInternal as ion_picker_internal, Popover as ion_popover, RippleEffect as ion_ripple_effect, ResultComponent as result_component, StepComponent as step_component, StepQuestion as step_question };

//# sourceMappingURL=description-component_18.entry.js.map