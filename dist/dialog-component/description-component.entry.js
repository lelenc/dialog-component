import { r as registerInstance, h } from './index-998b260f.js';

const descriptionComponentCss = ":host{display:block}.description-container{background:var(--background-pastell-bg);border:1px solid var(--brand-main-brand);border-radius:2px;padding:0.5625rem;margin-top:1.25rem}.fade-in.top{transition:0.5s all ease-in-out;transform:translate3d(0, -50px, 0);opacity:0}";

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

export { DescriptionComponent as description_component };

//# sourceMappingURL=description-component.entry.js.map