import WeatherService from "../services/WeatherService";

export default class WeatherController {
  constructor() {}

  static async getWeather(req, res, next) {
    return WeatherService.getWeather()
      .then(_res => res.status(200).json(_res))
      .catch(err => next(err));
  }
}
