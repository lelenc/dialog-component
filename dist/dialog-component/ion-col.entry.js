import { r as registerInstance, m as forceUpdate, h, i as Host } from './index-998b260f.js';
import { g as getIonMode } from './ionic-global-58d19ecb.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const SIZE_TO_MEDIA = {
  xs: '(min-width: 0px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
};
// Check if the window matches the media query
// at the breakpoint passed
// e.g. matchBreakpoint('sm') => true if screen width exceeds 576px
const matchBreakpoint = (breakpoint) => {
  if (breakpoint === undefined || breakpoint === '') {
    return true;
  }
  if (window.matchMedia) {
    const mediaQuery = SIZE_TO_MEDIA[breakpoint];
    return window.matchMedia(mediaQuery).matches;
  }
  return false;
};

const colCss = ":host{-webkit-padding-start:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;box-sizing:border-box;position:relative;flex-basis:0;flex-grow:1;width:100%;max-width:100%;min-height:1px}@media (min-width: 576px){:host{-webkit-padding-start:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px))}}@media (min-width: 768px){:host{-webkit-padding-start:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px))}}@media (min-width: 992px){:host{-webkit-padding-start:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px))}}@media (min-width: 1200px){:host{-webkit-padding-start:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px))}}";

const win = typeof window !== 'undefined' ? window : undefined;
// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
const SUPPORTS_VARS = win && !!(win.CSS && win.CSS.supports && win.CSS.supports('--a: 0'));
const BREAKPOINTS = ['', 'xs', 'sm', 'md', 'lg', 'xl'];
const Col = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.offset = undefined;
    this.offsetXs = undefined;
    this.offsetSm = undefined;
    this.offsetMd = undefined;
    this.offsetLg = undefined;
    this.offsetXl = undefined;
    this.pull = undefined;
    this.pullXs = undefined;
    this.pullSm = undefined;
    this.pullMd = undefined;
    this.pullLg = undefined;
    this.pullXl = undefined;
    this.push = undefined;
    this.pushXs = undefined;
    this.pushSm = undefined;
    this.pushMd = undefined;
    this.pushLg = undefined;
    this.pushXl = undefined;
    this.size = undefined;
    this.sizeXs = undefined;
    this.sizeSm = undefined;
    this.sizeMd = undefined;
    this.sizeLg = undefined;
    this.sizeXl = undefined;
  }
  onResize() {
    forceUpdate(this);
  }
  // Loop through all of the breakpoints to see if the media query
  // matches and grab the column value from the relevant prop if so
  getColumns(property) {
    let matched;
    for (const breakpoint of BREAKPOINTS) {
      const matches = matchBreakpoint(breakpoint);
      // Grab the value of the property, if it exists and our
      // media query matches we return the value
      const columns = this[property + breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)];
      if (matches && columns !== undefined) {
        matched = columns;
      }
    }
    // Return the last matched columns since the breakpoints
    // increase in size and we want to return the largest match
    return matched;
  }
  calculateSize() {
    const columns = this.getColumns('size');
    // If size wasn't set for any breakpoint
    // or if the user set the size without a value
    // it means we need to stick with the default and return
    // e.g. <ion-col size-md>
    if (!columns || columns === '') {
      return;
    }
    // If the size is set to auto then don't calculate a size
    const colSize = columns === 'auto'
      ? 'auto'
      : // If CSS supports variables we should use the grid columns var
        SUPPORTS_VARS
          ? `calc(calc(${columns} / var(--ion-grid-columns, 12)) * 100%)`
          : // Convert the columns to a percentage by dividing by the total number
            // of columns (12) and then multiplying by 100
            (columns / 12) * 100 + '%';
    return {
      flex: `0 0 ${colSize}`,
      width: `${colSize}`,
      'max-width': `${colSize}`,
    };
  }
  // Called by push, pull, and offset since they use the same calculations
  calculatePosition(property, modifier) {
    const columns = this.getColumns(property);
    if (!columns) {
      return;
    }
    // If the number of columns passed are greater than 0 and less than
    // 12 we can position the column, else default to auto
    const amount = SUPPORTS_VARS
      ? // If CSS supports variables we should use the grid columns var
        `calc(calc(${columns} / var(--ion-grid-columns, 12)) * 100%)`
      : // Convert the columns to a percentage by dividing by the total number
        // of columns (12) and then multiplying by 100
        columns > 0 && columns < 12
          ? (columns / 12) * 100 + '%'
          : 'auto';
    return {
      [modifier]: amount,
    };
  }
  calculateOffset(isRTL) {
    return this.calculatePosition('offset', isRTL ? 'margin-right' : 'margin-left');
  }
  calculatePull(isRTL) {
    return this.calculatePosition('pull', isRTL ? 'left' : 'right');
  }
  calculatePush(isRTL) {
    return this.calculatePosition('push', isRTL ? 'right' : 'left');
  }
  render() {
    const isRTL = document.dir === 'rtl';
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
      }, style: Object.assign(Object.assign(Object.assign(Object.assign({}, this.calculateOffset(isRTL)), this.calculatePull(isRTL)), this.calculatePush(isRTL)), this.calculateSize()) }, h("slot", null)));
  }
};
Col.style = colCss;

export { Col as ion_col };

//# sourceMappingURL=ion-col.entry.js.map