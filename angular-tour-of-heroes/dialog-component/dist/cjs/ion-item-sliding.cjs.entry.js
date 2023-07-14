'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1e422699.js');
const watchOptions = require('./watch-options-4294a886.js');
const ionicGlobal = require('./ionic-global-e2b98f89.js');
const index$1 = require('./index-a41d9007.js');
const helpers = require('./helpers-dd52ecee.js');
require('./index-e56e09b8.js');

const itemSlidingCss = "ion-item-sliding{display:block;position:relative;width:100%;overflow:hidden;user-select:none}ion-item-sliding .item{user-select:none}.item-sliding-active-slide .item{position:relative;transition:transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);opacity:1;z-index:2;pointer-events:none;will-change:transform}.item-sliding-active-swipe-end .item-options-end .item-option-expandable{padding-left:100%;order:1;transition-duration:0.6s;transition-property:padding-left}:host-context([dir=rtl]) .item-sliding-active-swipe-end .item-options-end .item-option-expandable{order:-1}[dir=rtl] .item-sliding-active-swipe-end .item-options-end .item-option-expandable{order:-1}@supports selector(:dir(rtl)){.item-sliding-active-swipe-end .item-options-end .item-option-expandable:dir(rtl){order:-1}}.item-sliding-active-swipe-start .item-options-start .item-option-expandable{padding-right:100%;order:-1;transition-duration:0.6s;transition-property:padding-right}:host-context([dir=rtl]) .item-sliding-active-swipe-start .item-options-start .item-option-expandable{order:1}[dir=rtl] .item-sliding-active-swipe-start .item-options-start .item-option-expandable{order:1}@supports selector(:dir(rtl)){.item-sliding-active-swipe-start .item-options-start .item-option-expandable:dir(rtl){order:1}}";

const SWIPE_MARGIN = 30;
const ELASTIC_FACTOR = 0.55;
let openSlidingItem;
const ItemSliding = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionDrag = index.createEvent(this, "ionDrag", 7);
    this.item = null;
    this.openAmount = 0;
    this.initialOpenAmount = 0;
    this.optsWidthRightSide = 0;
    this.optsWidthLeftSide = 0;
    this.sides = 0 /* ItemSide.None */;
    this.optsDirty = true;
    this.contentEl = null;
    this.initialContentScrollY = true;
    this.state = 2 /* SlidingState.Disabled */;
    this.disabled = false;
  }
  disabledChanged() {
    if (this.gesture) {
      this.gesture.enable(!this.disabled);
    }
  }
  async connectedCallback() {
    const { el } = this;
    this.item = el.querySelector('ion-item');
    this.contentEl = index$1.findClosestIonContent(el);
    await this.updateOptions();
    this.mutationObserver = watchOptions.watchForOptions(el, 'ion-item-option', async () => {
      await this.updateOptions();
    });
    this.gesture = (await Promise.resolve().then(function () { return require('./index-df535c72.js'); })).createGesture({
      el,
      gestureName: 'item-swipe',
      gesturePriority: 100,
      threshold: 5,
      canStart: (ev) => this.canStart(ev),
      onStart: () => this.onStart(),
      onMove: (ev) => this.onMove(ev),
      onEnd: (ev) => this.onEnd(ev),
    });
    this.disabledChanged();
  }
  disconnectedCallback() {
    if (this.gesture) {
      this.gesture.destroy();
      this.gesture = undefined;
    }
    this.item = null;
    this.leftOptions = this.rightOptions = undefined;
    if (openSlidingItem === this.el) {
      openSlidingItem = undefined;
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = undefined;
    }
  }
  /**
   * Get the amount the item is open in pixels.
   */
  getOpenAmount() {
    return Promise.resolve(this.openAmount);
  }
  /**
   * Get the ratio of the open amount of the item compared to the width of the options.
   * If the number returned is positive, then the options on the right side are open.
   * If the number returned is negative, then the options on the left side are open.
   * If the absolute value of the number is greater than 1, the item is open more than
   * the width of the options.
   */
  getSlidingRatio() {
    return Promise.resolve(this.getSlidingRatioSync());
  }
  /**
   * Open the sliding item.
   *
   * @param side The side of the options to open. If a side is not provided, it will open the first set of options it finds within the item.
   */
  async open(side) {
    var _a;
    /**
     * It is possible for the item to be added to the DOM
     * after the item-sliding component was created. As a result,
     * if this.item is null, then we should attempt to
     * query for the ion-item again.
     * However, if the item is already defined then
     * we do not query for it again.
     */
    const item = (this.item = (_a = this.item) !== null && _a !== void 0 ? _a : this.el.querySelector('ion-item'));
    if (item === null) {
      return;
    }
    const optionsToOpen = this.getOptions(side);
    if (!optionsToOpen) {
      return;
    }
    /**
     * If side is not set, we need to infer the side
     * so we know which direction to move the options
     */
    if (side === undefined) {
      side = optionsToOpen === this.leftOptions ? 'start' : 'end';
    }
    // In RTL we want to switch the sides
    side = helpers.isEndSide(side) ? 'end' : 'start';
    const isStartOpen = this.openAmount < 0;
    const isEndOpen = this.openAmount > 0;
    /**
     * If a side is open and a user tries to
     * re-open the same side, we should not do anything
     */
    if (isStartOpen && optionsToOpen === this.leftOptions) {
      return;
    }
    if (isEndOpen && optionsToOpen === this.rightOptions) {
      return;
    }
    this.closeOpened();
    this.state = 4 /* SlidingState.Enabled */;
    requestAnimationFrame(() => {
      this.calculateOptsWidth();
      const width = side === 'end' ? this.optsWidthRightSide : -this.optsWidthLeftSide;
      openSlidingItem = this.el;
      this.setOpenAmount(width, false);
      this.state = side === 'end' ? 8 /* SlidingState.End */ : 16 /* SlidingState.Start */;
    });
  }
  /**
   * Close the sliding item. Items can also be closed from the [List](./list).
   */
  async close() {
    this.setOpenAmount(0, true);
  }
  /**
   * Close all of the sliding items in the list. Items can also be closed from the [List](./list).
   */
  async closeOpened() {
    if (openSlidingItem !== undefined) {
      openSlidingItem.close();
      openSlidingItem = undefined;
      return true;
    }
    return false;
  }
  /**
   * Given an optional side, return the ion-item-options element.
   *
   * @param side This side of the options to get. If a side is not provided it will
   * return the first one available.
   */
  getOptions(side) {
    if (side === undefined) {
      return this.leftOptions || this.rightOptions;
    }
    else if (side === 'start') {
      return this.leftOptions;
    }
    else {
      return this.rightOptions;
    }
  }
  async updateOptions() {
    const options = this.el.querySelectorAll('ion-item-options');
    let sides = 0;
    // Reset left and right options in case they were removed
    this.leftOptions = this.rightOptions = undefined;
    for (let i = 0; i < options.length; i++) {
      const item = options.item(i);
      /**
       * We cannot use the componentOnReady helper
       * util here since we need to wait for all of these items
       * to be ready before we set `this.sides` and `this.optsDirty`.
       */
      // eslint-disable-next-line custom-rules/no-component-on-ready-method
      const option = item.componentOnReady !== undefined ? await item.componentOnReady() : item;
      const side = helpers.isEndSide(option.side) ? 'end' : 'start';
      if (side === 'start') {
        this.leftOptions = option;
        sides |= 1 /* ItemSide.Start */;
      }
      else {
        this.rightOptions = option;
        sides |= 2 /* ItemSide.End */;
      }
    }
    this.optsDirty = true;
    this.sides = sides;
  }
  canStart(gesture) {
    /**
     * If very close to start of the screen
     * do not open left side so swipe to go
     * back will still work.
     */
    const rtl = document.dir === 'rtl';
    const atEdge = rtl ? window.innerWidth - gesture.startX < 15 : gesture.startX < 15;
    if (atEdge) {
      return false;
    }
    const selected = openSlidingItem;
    if (selected && selected !== this.el) {
      this.closeOpened();
    }
    return !!(this.rightOptions || this.leftOptions);
  }
  onStart() {
    /**
     * We need to query for the ion-item
     * every time the gesture starts. Developers
     * may toggle ion-item elements via *ngIf.
     */
    this.item = this.el.querySelector('ion-item');
    const { contentEl } = this;
    if (contentEl) {
      this.initialContentScrollY = index$1.disableContentScrollY(contentEl);
    }
    openSlidingItem = this.el;
    if (this.tmr !== undefined) {
      clearTimeout(this.tmr);
      this.tmr = undefined;
    }
    if (this.openAmount === 0) {
      this.optsDirty = true;
      this.state = 4 /* SlidingState.Enabled */;
    }
    this.initialOpenAmount = this.openAmount;
    if (this.item) {
      this.item.style.transition = 'none';
    }
  }
  onMove(gesture) {
    if (this.optsDirty) {
      this.calculateOptsWidth();
    }
    let openAmount = this.initialOpenAmount - gesture.deltaX;
    switch (this.sides) {
      case 2 /* ItemSide.End */:
        openAmount = Math.max(0, openAmount);
        break;
      case 1 /* ItemSide.Start */:
        openAmount = Math.min(0, openAmount);
        break;
      case 3 /* ItemSide.Both */:
        break;
      case 0 /* ItemSide.None */:
        return;
      default:
        console.warn('invalid ItemSideFlags value', this.sides);
        break;
    }
    let optsWidth;
    if (openAmount > this.optsWidthRightSide) {
      optsWidth = this.optsWidthRightSide;
      openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
    }
    else if (openAmount < -this.optsWidthLeftSide) {
      optsWidth = -this.optsWidthLeftSide;
      openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
    }
    this.setOpenAmount(openAmount, false);
  }
  onEnd(gesture) {
    const { contentEl, initialContentScrollY } = this;
    if (contentEl) {
      index$1.resetContentScrollY(contentEl, initialContentScrollY);
    }
    const velocity = gesture.velocityX;
    let restingPoint = this.openAmount > 0 ? this.optsWidthRightSide : -this.optsWidthLeftSide;
    // Check if the drag didn't clear the buttons mid-point
    // and we aren't moving fast enough to swipe open
    const isResetDirection = this.openAmount > 0 === !(velocity < 0);
    const isMovingFast = Math.abs(velocity) > 0.3;
    const isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2);
    if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
      restingPoint = 0;
    }
    const state = this.state;
    this.setOpenAmount(restingPoint, true);
    if ((state & 32 /* SlidingState.SwipeEnd */) !== 0 && this.rightOptions) {
      this.rightOptions.fireSwipeEvent();
    }
    else if ((state & 64 /* SlidingState.SwipeStart */) !== 0 && this.leftOptions) {
      this.leftOptions.fireSwipeEvent();
    }
  }
  calculateOptsWidth() {
    this.optsWidthRightSide = 0;
    if (this.rightOptions) {
      this.rightOptions.style.display = 'flex';
      this.optsWidthRightSide = this.rightOptions.offsetWidth;
      this.rightOptions.style.display = '';
    }
    this.optsWidthLeftSide = 0;
    if (this.leftOptions) {
      this.leftOptions.style.display = 'flex';
      this.optsWidthLeftSide = this.leftOptions.offsetWidth;
      this.leftOptions.style.display = '';
    }
    this.optsDirty = false;
  }
  setOpenAmount(openAmount, isFinal) {
    if (this.tmr !== undefined) {
      clearTimeout(this.tmr);
      this.tmr = undefined;
    }
    if (!this.item) {
      return;
    }
    const style = this.item.style;
    this.openAmount = openAmount;
    if (isFinal) {
      style.transition = '';
    }
    if (openAmount > 0) {
      this.state =
        openAmount >= this.optsWidthRightSide + SWIPE_MARGIN
          ? 8 /* SlidingState.End */ | 32 /* SlidingState.SwipeEnd */
          : 8 /* SlidingState.End */;
    }
    else if (openAmount < 0) {
      this.state =
        openAmount <= -this.optsWidthLeftSide - SWIPE_MARGIN
          ? 16 /* SlidingState.Start */ | 64 /* SlidingState.SwipeStart */
          : 16 /* SlidingState.Start */;
    }
    else {
      /**
       * Item sliding cannot be interrupted
       * while closing the item. If it did,
       * it would allow the item to get into an
       * inconsistent state where multiple
       * items are then open at the same time.
       */
      if (this.gesture) {
        this.gesture.enable(false);
      }
      this.tmr = setTimeout(() => {
        this.state = 2 /* SlidingState.Disabled */;
        this.tmr = undefined;
        if (this.gesture) {
          this.gesture.enable(!this.disabled);
        }
      }, 600);
      openSlidingItem = undefined;
      style.transform = '';
      return;
    }
    style.transform = `translate3d(${-openAmount}px,0,0)`;
    this.ionDrag.emit({
      amount: openAmount,
      ratio: this.getSlidingRatioSync(),
    });
  }
  getSlidingRatioSync() {
    if (this.openAmount > 0) {
      return this.openAmount / this.optsWidthRightSide;
    }
    else if (this.openAmount < 0) {
      return this.openAmount / this.optsWidthLeftSide;
    }
    else {
      return 0;
    }
  }
  render() {
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { class: {
        [mode]: true,
        'item-sliding-active-slide': this.state !== 2 /* SlidingState.Disabled */,
        'item-sliding-active-options-end': (this.state & 8 /* SlidingState.End */) !== 0,
        'item-sliding-active-options-start': (this.state & 16 /* SlidingState.Start */) !== 0,
        'item-sliding-active-swipe-end': (this.state & 32 /* SlidingState.SwipeEnd */) !== 0,
        'item-sliding-active-swipe-start': (this.state & 64 /* SlidingState.SwipeStart */) !== 0,
      } }));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledChanged"]
  }; }
};
const swipeShouldReset = (isResetDirection, isMovingFast, isOnResetZone) => {
  // The logic required to know when the sliding item should close (openAmount=0)
  // depends on three booleans (isResetDirection, isMovingFast, isOnResetZone)
  // and it ended up being too complicated to be written manually without errors
  // so the truth table is attached below: (0=false, 1=true)
  // isResetDirection | isMovingFast | isOnResetZone || shouldClose
  //         0        |       0      |       0       ||    0
  //         0        |       0      |       1       ||    1
  //         0        |       1      |       0       ||    0
  //         0        |       1      |       1       ||    0
  //         1        |       0      |       0       ||    0
  //         1        |       0      |       1       ||    1
  //         1        |       1      |       0       ||    1
  //         1        |       1      |       1       ||    1
  // The resulting expression was generated by resolving the K-map (Karnaugh map):
  return (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
};
ItemSliding.style = itemSlidingCss;

exports.ion_item_sliding = ItemSliding;

//# sourceMappingURL=ion-item-sliding.cjs.entry.js.map