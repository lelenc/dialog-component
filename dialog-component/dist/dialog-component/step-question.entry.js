import { r as registerInstance, h } from './index-998b260f.js';
import './utils-2f71ae8f.js';
import './animation-e301e38b.js';
import './ios.transition-f659ef79.js';
import './md.transition-6741388b.js';
import './cubic-bezier-1ddfda32.js';
import './index-20a27e5b.js';
import './ionic-global-58d19ecb.js';
import './helpers-2eaa1b44.js';
import './index-3d621f70.js';
import './index-7f50a8db.js';
import './index-683e05ac.js';
import { j as popoverController } from './overlays-b9d8b927.js';
import './index-6e17926c.js';
import './hardware-back-button-fa04d6e9.js';
import './framework-delegate-2bcb0129.js';
import './index-05b398c2.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const IonicSlides = (opts) => {
  const { swiper, extendParams } = opts;
  const slidesParams = {
    effect: undefined,
    direction: 'horizontal',
    initialSlide: 0,
    loop: false,
    parallax: false,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 300,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    touchEventsTarget: 'container',
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    autoHeight: false,
    setWrapperSize: false,
    zoom: {
      maxRatio: 3,
      minRatio: 1,
      toggle: false,
    },
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    touchStartPreventDefault: false,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchReleaseOnEdges: false,
    iOSEdgeSwipeDetection: false,
    iOSEdgeSwipeThreshold: 20,
    resistance: true,
    resistanceRatio: 0.85,
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    loopAdditionalSlides: 0,
    noSwiping: true,
    runCallbacksOnInit: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    fadeEffect: {
      crossFade: false,
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
    },
  };
  if (swiper.pagination) {
    slidesParams.pagination = {
      type: 'bullets',
      clickable: false,
      hideOnClick: false,
    };
  }
  if (swiper.scrollbar) {
    slidesParams.scrollbar = {
      hide: true,
    };
  }
  extendParams(slidesParams);
};

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */

const stepQuestionCss = ":host{display:block}.question{display:flex;align-items:center;margin-bottom:1.25rem;margin-top:1.25rem}.speech-bubble-triangle{display:flex;max-width:84%}.triangle-topleft{border-top:7px solid var(--special-inactive);border-left:7px solid transparent}.speech-bubble-question{background:var(--background-white-bg);border:1px solid var(--special-inactive);border-radius:0px 10px 10px 10px;padding:0.625rem}.speech-bubble-question.active{background:var(--background-warning-bg)}.infoicon{margin-left:0.625rem;color:var(--brand-main-brand)}.clickable{cursor:pointer}ion-popover.full-size{--width:calc(100vw - var(--page-margin) * 2);--box-shadow:0 5px 10px 0 rgba(0, 0, 0, 0.6);--border-radius:20px;--overflow:hidden;--width:calc(100%);--margin-left:auto;--margin-right:auto}ion-popover.full-size::part(content){margin:var(--page-margin);left:0;border-radius:10px}ion-popover.full-size::part(backdrop){background-color:var(--special-transparent)}ion-popover.full-size::part(arrow){display:none}ion-popover h1{margin:0 0 10px 0}ion-popover ion-content{--background:#ecebeb}ion-popover.warning ion-content{--background:var(--special-warning)}";

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

export { StepQuestion as step_question };

//# sourceMappingURL=step-question.entry.js.map