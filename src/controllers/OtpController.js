import OtpService from "../services/OtpService";

export default class OtpController {
  constructor() {
    this.postLogin = this.postLogin.bind(this);
  }

  static getRouters(req, res, next) {
    const { fromPlace, toPlace } = req.query;
    return OtpService.getRouters(fromPlace, toPlace)
      .then(_res => res.status(200).json(_res))
      .catch(err => next(err));
  }
}
