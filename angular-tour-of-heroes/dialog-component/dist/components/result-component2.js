import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as getIntlMessage } from './translation.js';

const resultComponentCss = ":host{display:block}.result-container{background:var(--background-pastell-bg);border:1px solid var(--brand-main-brand);border-radius:2px;padding:0.5625rem;display:flex;flex-direction:column;margin-bottom:1.25rem}.result-with-tag{display:flex;justify-content:space-between;margin-top:0.625rem}.fade-in.top{transition:0.5s all ease-in-out;transform:translate3d(0, -50px, 0);opacity:0}.fade-in.show{opacity:1;transform:translate3d(0, 0, 0)}";

const ResultComponent = /*@__PURE__*/ proxyCustomElement(class ResultComponent extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
      console.log("result focus element", resultContainer);
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
  get element() { return this; }
  static get watchers() { return {
    "locale": ["loadMessages"],
    "resultData": ["handleResultValueChange"]
  }; }
  static get style() { return resultComponentCss; }
}, [0, "result-component", {
    "resultData": [1040],
    "locale": [1],
    "lastLocale": [1, "last-locale"],
    "isDetailOpen": [32],
    "showContent": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["result-component"];
  components.forEach(tagName => { switch (tagName) {
    case "result-component":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ResultComponent);
      }
      break;
  } });
}

export { ResultComponent as R, defineCustomElement as d };

//# sourceMappingURL=result-component2.js.map