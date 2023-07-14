import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { p as popoverController } from './overlays.js';
import { g as getIntlMessage } from './translation.js';
import { d as defineCustomElement$6 } from './description-component2.js';
import { d as defineCustomElement$5 } from './content.js';
import { d as defineCustomElement$4 } from './result-component2.js';
import { d as defineCustomElement$3 } from './step-component2.js';
import { d as defineCustomElement$2 } from './step-question2.js';

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

const dialogComponentCss = ".dialog-body{background:var(--background-light-bg);min-height:100vh;padding-right:0.9375rem;padding-left:0.9375rem;color:var(--text-normal-text);display:flex}.dialog-root{display:flex;flex-direction:column;background:var(--background-light-bg)}.content{flex:1 1 auto;overflow-y:auto}.steps{margin-bottom:2.5rem;overflow:hidden}";

const DialogComponent$1 = /*@__PURE__*/ proxyCustomElement(class DialogComponent extends HTMLElement {
  async loadMessages() {
    if (this.locale !== this.lastLocale) {
      this.lastLocale = this.locale;
      this.messages = await getIntlMessage(this.locale);
    }
  }
  constructor() {
    super();
    this.__registerHost();
    this.answer$ = new Subject();
    this.revoke$ = new Subject();
    this.startDate = Date.now();
    this.messages = {};
    this.locale = 'hu';
    this.lastLocale = '';
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
  async componentWillLoad() {
    await this.loadMessages();
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
  async presentPopover() {
    const popover = await popoverController.create({
      component: 'ion-popover',
      alignment: "center",
      translucent: true,
      showBackdrop: true,
      cssClass: 'full-size error',
      animated: true,
      componentProps: {},
      dismissOnSelect: true
    });
    const popoverContent = document.createElement('ion-content');
    popoverContent.classList.add("ion-padding");
    const div = '<div style=\'display: flex\'> <div><svg style="background:red; margin-right: 5px;border-radius: 3px" width=\'24\' viewBox=\'0 0 24 24\' fill=\'none\'> <path d="M11.9999 3.75C11.594 3.75 11.2228 4.095 11.2499 4.5L11.6249 14.625C11.6249 14.7245 11.6644 14.8198 11.7348 14.8902C11.8051 14.9605 11.9005 15 11.9999 15C12.0994 15 12.1948 14.9605 12.2651 14.8902C12.3354 14.8198 12.3749 14.7245 12.3749 14.625L12.7499 4.5C12.7771 4.095 12.4059 3.75 11.9999 3.75Z" stroke="white" stroke-width="1.42319" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 20.25C12.4142 20.25 12.75 19.9142 12.75 19.5C12.75 19.0858 12.4142 18.75 12 18.75C11.5858 18.75 11.25 19.0858 11.25 19.5C11.25 19.9142 11.5858 20.25 12 20.25Z" stroke="white" stroke-width="1.42319" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' + this.messages['fatal-error'] + '</div>';
    popoverContent.innerHTML = div;
    popover.appendChild(popoverContent);
    popover.onDidDismiss().then(() => {
      this.reloadPage();
    });
    await popover.present();
  }
  reloadPage() {
    location.reload();
  }
  processNextQuestion(q) {
    if (q instanceof Response && !q.ok) {
      console.error(q);
      this.presentPopover();
      return;
    }
    if (q.fragments.length === 0) {
      console.error("tudott hiba", q);
      this.presentPopover();
      return;
    }
    if (q.fragments[q.fragments.length - 1].type === 'Goal') {
      this.result = q.fragments[q.fragments.length - 1];
      this.endDate = Date.now();
    }
    console.log("before", this.fragmentData);
    this.fragmentData = [...this.fragmentData, ...q.fragments];
    this.fragmentData = [...new Set(this.fragmentData)];
    console.log("after", this.fragmentData);
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
  static get watchers() { return {
    "locale": ["loadMessages"]
  }; }
  static get style() { return dialogComponentCss; }
}, [0, "dialog-component", {
    "locale": [1],
    "lastLocale": [1, "last-locale"],
    "caseId": [1, "case-id"],
    "iri": [1],
    "date": [1],
    "player_id": [2],
    "education": [1],
    "sex": [2],
    "birthyear": [2],
    "region": [2],
    "email": [1],
    "params": [16],
    "dialogData": [16],
    "dialogMetadata": [16],
    "fragmentData": [32],
    "result": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["dialog-component", "description-component", "ion-content", "result-component", "step-component", "step-question"];
  components.forEach(tagName => { switch (tagName) {
    case "dialog-component":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DialogComponent$1);
      }
      break;
    case "description-component":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ion-content":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "result-component":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "step-component":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "step-question":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const DialogComponent = DialogComponent$1;
const defineCustomElement = defineCustomElement$1;

export { DialogComponent, defineCustomElement };

//# sourceMappingURL=dialog-component.js.map