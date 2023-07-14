import { h } from '@stencil/core';
import { Subject } from 'rxjs';
import { User } from '../../interfaces/user';
import { DialogAsyncService } from '../../services/dialog-async.service';
import { ElasticService } from '../../services/elastic.service';
import { HelperService } from '../../services/helper.service';
import { popoverController } from '@ionic/core';
import { getIntlMessage } from '../../language/translation';
export class DialogComponent {
  async loadMessages() {
    if (this.locale !== this.lastLocale) {
      this.lastLocale = this.locale;
      this.messages = await getIntlMessage(this.locale);
    }
  }
  constructor() {
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
  static get is() { return "dialog-component"; }
  static get originalStyleUrls() {
    return {
      "$": ["dialog-component.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["dialog-component.css"]
    };
  }
  static get properties() {
    return {
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
      },
      "caseId": {
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
        "attribute": "case-id",
        "reflect": false,
        "defaultValue": "''"
      },
      "iri": {
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
        "attribute": "iri",
        "reflect": false,
        "defaultValue": "''"
      },
      "date": {
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
        "attribute": "date",
        "reflect": false,
        "defaultValue": "''"
      },
      "player_id": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "player_id",
        "reflect": false
      },
      "education": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "education",
        "reflect": false
      },
      "sex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "sex",
        "reflect": false
      },
      "birthyear": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "birthyear",
        "reflect": false
      },
      "region": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "region",
        "reflect": false
      },
      "email": {
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
        "attribute": "email",
        "reflect": false
      },
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Map<string, string>",
          "resolved": "Map<string, string>",
          "references": {
            "Map": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "new Map<string, string>()"
      },
      "dialogData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DialogData",
          "resolved": "DialogData",
          "references": {
            "DialogData": {
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
      "dialogMetadata": {
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
      }
    };
  }
  static get states() {
    return {
      "fragmentData": {},
      "result": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "locale",
        "methodName": "loadMessages"
      }];
  }
}
//# sourceMappingURL=dialog-component.js.map
