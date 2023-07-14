import { Observable } from "rxjs";
import { ConsultationResult } from "../interfaces/dialog-interfaces";
export declare class ElasticService {
  private serviceUrl;
  constructor();
  sendConsultationData(consultationObj: ConsultationResult): Observable<any>;
}
