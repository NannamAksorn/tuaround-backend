import db, { helpers, format } from "../postgres/index";

export default class UserService {
  static getStop() {
    const query = "SELECT * FROM stop";
    return db.any(query);
  }
  static postStop(id, name_en, name_th, latlon) {
    const query = helpers.insert(
      { id, name_en, name_th, latlon: format.point(latlon) },
      null,
      "stop"
    );
    return db.none(query);
  }
}
