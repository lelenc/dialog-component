import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { p as popoverController } from './overlays.js';
import { d as defineCustomElement$1 } from './content.js';

const stepQuestionCss = ":host{display:block}.question{display:flex;align-items:center;margin-bottom:1.25rem;margin-top:1.25rem}.speech-bubble-triangle{display:flex;max-width:84%}.triangle-topleft{border-top:7px solid var(--special-inactive);border-left:7px solid transparent}.speech-bubble-question{background:var(--background-white-bg);border:1px solid var(--special-inactive);border-radius:0px 10px 10px 10px;padding:0.625rem}.speech-bubble-question.active{background:var(--background-warning-bg)}.speech-bubble-question.opened{border-width:3px}.infoicon{margin-left:0.625rem;color:var(--brand-main-brand)}.clickable{cursor:pointer}ion-popover.full-size{--width:calc(100vw - var(--page-margin) * 2);--box-shadow:0 5px 10px 0 rgba(0, 0, 0, 0.6);--border-radius:20px;--overflow:hidden;--width:calc(100%);--margin-left:auto;--margin-right:auto}ion-popover.full-size::part(content){margin:var(--page-margin);left:0;border-radius:10px}ion-popover.full-size::part(backdrop){background-color:var(--special-transparent)}ion-popover.full-size.error::part(backdrop){background-color:var(--background-medium-light-bg)}ion-popover.full-size::part(arrow){display:none}ion-popover h1{margin:0 0 10px 0}ion-popover ion-content{--background:#ecebeb}ion-popover.error ion-content{--background:var(--background-white-bg)}ion-popover.warning ion-content{--background:var(--special-warning)}";

const StepQuestion = /*@__PURE__*/ proxyCustomElement(class StepQuestion extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.fragment = undefined;
    this.isActiveQuestion = undefined;
    this.showContent = false;
    this.isTooltipOpened = false;
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
      popover.onDidDismiss().then(() => {
        this.isTooltipOpened = false;
      });
      this.isTooltipOpened = true;
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
    return (h("div", { class: `question fade-in left ${this.showContent ? 'show' : ''}` }, h("div", { class: "speech-bubble-triangle" }, h("div", { class: "triangle-topleft" }), h("span", { class: { "speech-bubble-question": true, "active": this.isActiveQuestion, "opened": this.isTooltipOpened }, innerHTML: this.fragment.labelLayman })), h("svg", { id: `button-${this.fragment.iri}`, class: "infoicon clickable", width: svgWidth, viewBox: svgViewBox, onClick: (ev) => this.presentPopover(ev) }, h("path", { d: svgPath, fill: svgColor }))));
  }
  static get watchers() { return {
    "fragment": ["handleFragmentValueChange"]
  }; }
  static get style() { return stepQuestionCss; }
}, [0, "step-question", {
    "fragment": [16],
    "isActiveQuestion": [4, "is-active-question"],
    "showContent": [32],
    "isTooltipOpened": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["step-question", "ion-content"];
  components.forEach(tagName => { switch (tagName) {
    case "step-question":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StepQuestion);
      }
      break;
    case "ion-content":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { StepQuestion as S, defineCustomElement as d };

//# sourceMappingURL=step-question2.js.map