import { ConsultationResult } from "../interfaces/dialog-interfaces";
import { User } from "../interfaces/user";
export declare class HelperService {
  player_id: number;
  region: number;
  education: string;
  sex: number;
  age: number;
  email: string;
  host_domain: string;
  constructor(user: User);
  getBodyWithUsers(body: ConsultationResult): ConsultationResult;
}
