import { from } from "rxjs";
import { serverUrl } from "../../config.json";
export class ElasticService {
  constructor() {
    this.serviceUrl = `${serverUrl}/emerald/rest/api/v1/analytics/`;
  }
  sendConsultationData(consultationObj) {
    return from(fetch(`${this.serviceUrl}/consultation`, {
      method: 'POST',
      body: JSON.stringify(consultationObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));
  }
}
//# sourceMappingURL=elastic.service.js.map
