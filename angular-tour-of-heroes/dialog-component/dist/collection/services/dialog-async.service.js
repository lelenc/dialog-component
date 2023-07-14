import { combineLatest, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverUrl } from "../../config.json";
export class DialogAsyncService {
  constructor() {
    this.serviceUrl = `${serverUrl}/emerald/rest/api/v1/product-finder`;
  }
  startWithIri(iri, lang, answers, stored) {
    const data$ = fetch(`${this.serviceUrl}?stored=${stored}`, {
      method: 'POST',
      body: JSON.stringify({ iri, lang, answers }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
    const metadata$ = fetch(`${this.serviceUrl}/dialogByIri?iri=${iri}&lang=${lang}`)
      .then(response => response.json());
    return combineLatest([data$, metadata$]).pipe(map(([data, metadata]) => ({ data, metadata })));
  }
  startWithCaseId(caseId, date, lang, answers, stored) {
    const data$ = fetch(`${this.serviceUrl}?stored=${stored}`, {
      method: 'POST',
      body: JSON.stringify({ caseId, date, lang, answers }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
    const metadata$ = fetch(`${this.serviceUrl}/dialog?caseId=${caseId}&date=${date}`)
      .then(response => response.json());
    return combineLatest([data$, metadata$]).pipe(map(([data, metadata]) => ({ data, metadata })));
  }
  getSession() {
    return from(fetch(`${this.serviceUrl}/${this.sessionId}`).then(response => response.json()));
  }
  answer(body) {
    return from(fetch(`${this.serviceUrl}/${this.sessionId}/answers`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));
  }
  revokeAnswer(body) {
    return from(fetch(`${this.serviceUrl}/${this.sessionId}/answers`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));
  }
  getDialogMetadata(iri, lang) {
    return from(fetch(`${this.serviceUrl}/dialogByIri?iri=${iri}&lang=${lang}`).then(response => response.json()));
  }
}
//# sourceMappingURL=dialog-async.service.js.map
