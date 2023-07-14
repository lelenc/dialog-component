import { popoverController } from '@ionic/core';
import { h } from '@stencil/core';
export class StepQuestion {
  constructor() {
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
  static get is() { return "step-question"; }
  static get originalStyleUrls() {
    return {
      "$": ["step-question.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["step-question.css"]
    };
  }
  static get properties() {
    return {
      "fragment": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Fragment",
          "resolved": "Fragment",
          "references": {
            "Fragment": {
              "location": "import",
              "path": "../../interfaces/dialog-interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "isActiveQuestion": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-active-question",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "showContent": {},
      "isTooltipOpened": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "fragment",
        "methodName": "handleFragmentValueChange"
      }];
  }
}
//# sourceMappingURL=step-question.js.map
