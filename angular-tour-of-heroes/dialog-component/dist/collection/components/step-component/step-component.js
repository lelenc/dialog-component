import { h } from '@stencil/core';
import flatpickr from 'flatpickr';
import { Hungarian } from 'flatpickr/dist/l10n/hu';
import { getIntlMessage } from '../../language/translation';
export class StepComponent {
  constructor() {
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
      this.localStringAnswerValue = this.stringAnswerValue;
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
    const dateInput = this.element.querySelector('#hiddenDateInput');
    const realDateInput = this.element.querySelector('#dateInput');
    if (dateInput) {
      const localeObject = Object.assign({}, (this.locale === 'hu' ? Hungarian : {}));
      this.datePicker = flatpickr(dateInput, {
        dateFormat: "Y-m-d",
        positionElement: realDateInput,
        clickOpens: false,
        disableMobile: true,
        allowInvalidPreload: true,
        locale: localeObject,
        onChange: (_selectedDates, dateStr) => {
          this.handleDateChange(dateStr);
        },
      });
    }
  }
  handleButtonClick() {
    console.log("isDateActive", this.isDateActive);
    this.datePicker.open();
  }
  setFocus() {
    setTimeout(() => {
      console.log("setFocus");
      const firstInput = this.element.querySelector('input:not([hidden]):not([type="submit"])');
      console.log("input", firstInput);
      if (!firstInput) {
        console.log(this.element);
      }
      if (!(this.answerValue !== null && this.answerValue !== undefined)) {
        console.log("focus", firstInput);
        const firstArea = this.element.querySelector('textarea');
        if (firstInput) {
          console.log("focus inputon");
          firstInput.focus();
        }
        else if (firstArea) {
          console.log("focus arean");
          firstArea.focus();
        }
        else {
          const firstButton = this.element.querySelector('button');
          console.log("firstButton", firstButton);
          if (firstButton) {
            console.log("focus gombon");
            firstButton.focus();
          }
        }
      }
    }, 1000);
  }
  render() {
    const svgWidth = '1.5em'; // A szélesség beállítása
    const svgColor = "#2B7371"; // A szín beállítása
    const svgPathSend = "M22.3402 10.6428L22.3327 10.6396L2.31328 2.33612C2.1449 2.26565 1.96167 2.23801 1.77999 2.25567C1.59831 2.27334 1.42384 2.33577 1.27219 2.43737C1.11197 2.54236 0.980359 2.68553 0.889207 2.85401C0.798055 3.02248 0.750218 3.21098 0.75 3.40253V8.713C0.750089 8.97486 0.841528 9.2285 1.00856 9.43018C1.17558 9.63186 1.40774 9.76896 1.665 9.81784L12.5836 11.8367C12.6265 11.8449 12.6652 11.8677 12.6931 11.9014C12.7209 11.935 12.7362 11.9773 12.7362 12.021C12.7362 12.0646 12.7209 12.1069 12.6931 12.1406C12.6652 12.1742 12.6265 12.1971 12.5836 12.2052L1.66547 14.2241C1.40828 14.2728 1.17614 14.4098 1.00903 14.6113C0.841932 14.8128 0.750328 15.0662 0.75 15.328V20.6394C0.749876 20.8223 0.795166 21.0024 0.881807 21.1635C0.968448 21.3246 1.09373 21.4616 1.24641 21.5624C1.43006 21.6844 1.6456 21.7496 1.86609 21.7499C2.01938 21.7497 2.1711 21.719 2.31234 21.6594L22.3312 13.4033L22.3402 13.3991C22.6096 13.2833 22.8392 13.091 23.0006 12.8461C23.1619 12.6011 23.2479 12.3143 23.2479 12.021C23.2479 11.7277 23.1619 11.4408 23.0006 11.1959C22.8392 10.9509 22.6096 10.7586 22.3402 10.6428Z";
    return (h("div", { class: "step" }, this.fragment.type != 'Goal' && (h("div", null, h("step-question", { fragment: this.fragment, isActiveQuestion: !(this.answerValue !== null && this.answerValue !== undefined) }), h("div", { class: `answer fade-in right ${this.showContent ? 'show' : ''}` }, this.fragment.type === 'QuestionMenu' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("div", { class: "options-container" }, this.options.map((op, index) => (h("button", { class: { "answer-button": true, "active": this.answerValue === index }, disabled: this.controlDisabled, onClick: () => this.menuAnswer(index) }, h("div", null, op)))))), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionYesNo' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("button", { class: { "answer-button": true, "active": this.yesButtonClass() }, disabled: this.controlDisabled, onClick: () => this.yesNoAnswer('true') }, this.messages['question-yes']), h("button", { class: { "answer-button": true, "active": this.noButtonClass() }, disabled: this.controlDisabled, onClick: () => this.yesNoAnswer('false') }, this.messages['question-no'])), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionInteger' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("form", { onSubmit: (event) => {
        event.preventDefault();
        const form = event.target;
        this.numberAnswerValue = form.getElementsByTagName('input')[0].value;
        this.numberAnswer();
      } }, h("input", { type: "number", required: true, inputMode: 'numeric', min: "0", step: "1", class: { "answer-input": true, "answered": this.isActive }, value: this.localNumberAnswerValue, onInput: (event) => {
        const dateInput = event.target;
        dateInput.setCustomValidity("");
        this.onNumberInput(event);
      }, disabled: this.controlDisabled, onKeyDown: () => this.setNumberActive(), onInvalid: (event) => {
        const dateInput = event.target;
        console.log("message", this.messages['validation-message']);
        dateInput.setCustomValidity(this.messages['validation-message']);
      }, style: { width: '8em' } }), h("input", { type: "submit", hidden: true }))), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionDecimal' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer" }, h("form", { onSubmit: (event) => {
        event.preventDefault();
        const form = event.target;
        this.numberAnswerValue = form.getElementsByTagName('input')[0].value;
        this.numberAnswer();
      } }, h("input", { type: "number", required: true, step: 'any', inputMode: 'numeric', class: { "answer-input": true, "answered": this.isActive }, value: this.localNumberAnswerValue, onInput: (event) => {
        const dateInput = event.target;
        dateInput.setCustomValidity("");
        this.onNumberInput(event);
      }, disabled: this.controlDisabled, onKeyDown: () => this.setNumberActive(), onInvalid: (event) => {
        const dateInput = event.target;
        console.log("message", this.messages['validation-message']);
        dateInput.setCustomValidity(this.messages['validation-message']);
      }, style: { width: '8em' } }), h("input", { type: "submit", hidden: true }))), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionString' && (h("div", { class: "speech-bubble-triangle", style: { flexGrow: '1' } }, h("span", { class: "speech-bubble-answer string" }, h("form", { id: "stringform", onSubmit: (event) => {
        event.preventDefault();
        this.stringAnswer();
      } }, h("textarea", { required: true, class: { "answer-input": true, "answered": this.isActive }, value: this.localStringAnswerValue, onInput: (event) => {
        const dateInput = event.target;
        dateInput.setCustomValidity("");
        this.onStringInput(event);
      }, disabled: this.controlDisabled, onKeyDown: () => this.setStringActive(), onInvalid: (event) => {
        const dateInput = event.target;
        console.log("message", this.messages['validation-message']);
        dateInput.setCustomValidity(this.messages['validation-message']);
      } }), h("input", { type: "submit", hidden: true })), h("button", { onClick: () => {
        const form = this.element.querySelector('#stringform');
        console.log("form", form);
        const hiddenSubmit = form.getElementsByTagName('input')[0];
        console.log("hiddenSubmit");
        hiddenSubmit.click();
      }, style: { alignSelf: 'flex-start', marginTop: '4px' } }, h("svg", { width: svgWidth, viewBox: "0 0 24 24", fill: "none" }, h("path", { d: svgPathSend, fill: svgColor })))), h("div", { class: "triangle-topright" }))), this.fragment.type === 'QuestionDate' && (h("div", { class: "speech-bubble-triangle" }, h("span", { class: "speech-bubble-answer date" }, h("form", { id: "dateform", onSubmit: (event) => {
        event.preventDefault();
        console.log("submit");
        const form = event.target;
        const dateInput = form.getElementsByTagName('input')[0];
        if (isNaN(Date.parse(this.localDateAnswerValue))) {
          this.datePicker.setDate(new Date().toISOString().slice(0, 10));
          console.log("parse nem");
          dateInput.setCustomValidity(this.messages['validation-message']);
          return;
        }
        else {
          this.datePicker.setDate(this.localDateAnswerValue);
        }
        this.dateAnswerValue = this.localDateAnswerValue;
        this.setDateActive();
        this.dateAnswer();
      }, style: { marginRight: '0.625em' } }, h("input", { type: "text", id: "dateInput", pattern: "\\d{4}-\\d{2}-\\d{2}", required: true, placeholder: "YYYY-MM-DD", value: this.localDateAnswerValue, class: { "answer-input": true, "answered": this.isDateActive }, disabled: this.controlDisabled, onInput: (event) => { event.target.setCustomValidity(''); this.onDateInput(event); }, onKeyDown: () => this.setDateActive(), onKeyUp: (event) => {
        const dateInput = event.target;
        if (isNaN(Date.parse(this.localDateAnswerValue))) {
          this.datePicker.setDate(new Date().toISOString().slice(0, 10));
          console.log("parse nem");
          dateInput.setCustomValidity(this.messages['validation-message']);
        }
        else {
          dateInput.setCustomValidity("");
        }
      }, onInvalid: (event) => {
        console.log(event);
        const dateInput = event.target;
        dateInput.setCustomValidity(this.messages['validation-message']);
      }, style: { width: '8em' } }), h("input", { type: "hidden", id: "hiddenDateInput", readonly: true, style: { display: 'none' } }), h("input", { type: "submit", hidden: true })), h("button", { id: "date", onClick: () => this.handleButtonClick() }, h("svg", { width: svgWidth, viewBox: "0 0 24 24", fill: "none" }, h("path", { d: "M19.5 3.75H4.5C3.25736 3.75 2.25 4.75736 2.25 6V19.5C2.25 20.7426 3.25736 21.75 4.5 21.75H19.5C20.7426 21.75 21.75 20.7426 21.75 19.5V6C21.75 4.75736 20.7426 3.75 19.5 3.75Z", stroke: "#2B7371", "stroke-width": "2", "stroke-linejoin": "round" }), h("path", { d: "M6 2.25V3.75M18 2.25V3.75M21.75 7.5H2.25M14.25 12.1875L16.2853 10.6875H16.5V18.5625M7.21781 11.3873C7.42078 11.0442 7.98891 10.5 8.99203 10.5C10.178 10.5 11.2369 11.1459 11.2369 12.3703C11.2396 12.6073 11.1948 12.8425 11.1052 13.062C11.0156 13.2814 10.883 13.4807 10.7152 13.6481C10.2028 14.1727 9.42094 14.3733 8.99391 14.3733C9.47672 14.3733 10.3622 14.6002 10.9416 15.1927C11.3128 15.5709 11.4844 16.1044 11.4844 16.6959C11.4844 18.0028 10.3814 18.75 9.04125 18.75C7.90828 18.75 7.21313 17.9264 6.98438 17.5388", stroke: "#2B7371", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("rect", { x: "0.5", y: "0.5", width: "23", height: "23", stroke: svgColor })))), h("div", { class: "triangle-topright" }))))))));
  }
  handleDateChange(dateString) {
    console.log("handleDateChange", dateString);
    this.setDateActive();
    if (isNaN(Date.parse(dateString))) {
      return;
    }
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
  onStringInput(event) {
    console.log("string input", event);
    let textarea = event.target;
    console.log("style", textarea.scrollHeight);
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + "px";
    this.localStringAnswerValue = event.target.value;
    this.setStringActive();
  }
  setNumberActive() {
    this.isActive = this.answerValue === (this.numberAnswerValue + '').replace(',', '.') && (this.localNumberAnswerValue + '').replace(',', '.') === this.numberAnswerValue;
    console.log("isActive,", this.isActive);
  }
  setStringActive() {
    this.isActive = this.answerValue === this.stringAnswerValue && this.localStringAnswerValue === this.stringAnswerValue;
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
    this.stringAnswerValue = this.localStringAnswerValue;
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
  static get is() { return "step-component"; }
  static get originalStyleUrls() {
    return {
      "$": ["step-component.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["step-component.css"]
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
      "answerValue": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "answer-value",
        "reflect": false
      },
      "controlDisabled": {
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
        "attribute": "control-disabled",
        "reflect": false
      },
      "locale": {
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
        "attribute": "locale",
        "reflect": false,
        "defaultValue": "'hu'"
      },
      "lastLocale": {
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
        "attribute": "last-locale",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "localDateAnswerValue": {},
      "isActive": {},
      "isDateActive": {},
      "showContent": {}
    };
  }
  static get events() {
    return [{
        "method": "answer",
        "name": "answer",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Answer",
          "resolved": "Answer",
          "references": {
            "Answer": {
              "location": "import",
              "path": "../../interfaces/dialog-interfaces"
            }
          }
        }
      }, {
        "method": "revokeAnswer",
        "name": "revokeAnswer",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Answer",
          "resolved": "Answer",
          "references": {
            "Answer": {
              "location": "import",
              "path": "../../interfaces/dialog-interfaces"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "locale",
        "methodName": "loadMessages"
      }, {
        "propName": "answerValue",
        "methodName": "handleAnswerValueChange"
      }, {
        "propName": "fragment",
        "methodName": "handleFragmentValueChange"
      }];
  }
}
//# sourceMappingURL=step-component.js.map
