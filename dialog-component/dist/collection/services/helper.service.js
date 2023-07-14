import { host_domain } from "../../config.json";
export class HelperService {
  constructor(user) {
    this.host_domain = host_domain;
    //console.log("helperservice", user)
    this.player_id = user.player_id || 12;
    this.region = user.region || 0;
    this.age = new Date().getFullYear() - user.birthyear || 26;
    this.sex = user.sex || 1;
    this.education = user.education || 'higher';
    this.email = user.email || 'tesztelek@ml.hu';
  }
  getBodyWithUsers(body) {
    body.player_id = this.player_id;
    body.host_domain = this.host_domain;
    body.mail = this.email;
    var score;
    var scr = body.goal.expert.substring(body.goal.expert.lastIndexOf("Elért pontszám: ") + 15, body.goal.expert.lastIndexOf("Elért pontszám: ") + 25);
    if (scr.includes('.')) {
      score = parseInt(scr.substring(0, scr.indexOf('.')));
    }
    else {
      score = parseInt(scr);
    }
    body.score = score;
    body.region = this.region;
    body.sex = this.sex;
    body.age = this.age;
    body.education = this.education;
    //console.log("getBodyWithUsers", body);
    return body;
  }
}
//# sourceMappingURL=helper.service.js.map
