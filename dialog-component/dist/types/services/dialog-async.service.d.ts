import { Observable } from 'rxjs';
import { Answer, DialogData, DialogMetadata } from "../interfaces/dialog-interfaces";
export declare class DialogAsyncService {
  private serviceUrl;
  sessionId: string;
  dialogIri: string;
  endpointId: string;
  constructor();
  startWithIri(iri: string, lang: string, answers?: Answer[], stored?: boolean): Observable<{
    data: DialogData;
    metadata: DialogMetadata;
  }>;
  startWithCaseId(caseId: string, date: string, lang: string, answers?: Answer[], stored?: boolean): Observable<{
    data: DialogData;
    metadata: DialogMetadata;
  }>;
  getSession(): Observable<any>;
  answer(body: Answer): Observable<any>;
  revokeAnswer(body: Answer): Observable<any>;
  getDialogMetadata(iri: string, lang: string): Observable<any>;
}
