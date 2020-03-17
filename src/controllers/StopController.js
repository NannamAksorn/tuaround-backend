import StopService from "../services/StopService";
import ETA from "../models/ETA";

export default class StopController {
  constructor() {
    this.postLogin = this.postLogin.bind(this);
  }

  static getStops(req, res, next) {
    return StopService.getStop()
      .then(_res => res.status(200).json(_res))
      .catch(err => next(err));
  }

  static postStops(req, res, next) {
    const { id, name_en, name_th, latlon } = req.body;
    return StopService.postStop(id, name_en, name_th, latlon)
      .then(() => res.status(200).json(true))
      .catch(err => next(err));
  }

  static getStopETA(req, res, next) {
    const sid = req.params.sid;
    const eta = ETA.getStopETA(sid);
    return res.status(200).json(eta);
  }
}
