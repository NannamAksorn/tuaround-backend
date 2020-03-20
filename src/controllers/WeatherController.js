import WeatherService from "../services/WeatherService";
WeatherService.initWeatherCronJob();

export default class WeatherController {
  constructor() {}

  static async getWeather(req, res, next) {
    return WeatherService.getWeather()
      .then(_res => res.status(200).json(_res))
      .catch(err => next(err));
  }
}
