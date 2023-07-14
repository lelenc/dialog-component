import { h } from '@stencil/core';
export class DescriptionComponent {
  constructor() {
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
  static get is() { return "description-component"; }
  static get originalStyleUrls() {
    return {
      "$": ["description-component.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["description-component.css"]
    };
  }
  static get properties() {
    return {
      "data": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DialogMetadata",
          "resolved": "DialogMetadata",
          "references": {
            "DialogMetadata": {
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
      "sessionName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "session-name",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "showContent": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "data",
        "methodName": "setData"
      }];
  }
}
//# sourceMappingURL=description-component.js.map
