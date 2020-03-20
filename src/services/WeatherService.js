import axios from "axios";
import mcache from "memory-cache";
import { emitWeather } from "../socket/app";
import { CronJob } from "cron";

const WEATHER_API = "56d11b10e025f7cd93cc31496fba4cb6";
const GET_WEATHER_MKEY = "getWeather";

const weatherApiAxios = axios.create({
  baseURL: "https://api.darksky.net",
  headers: {
    "Content-Type": "application/json"
  }
});

export default class WeatherService {
  constructor() {
    this.initWeatherCronJob();
  }

  static initWeatherCronJob() {
    this.job = new CronJob("*/5 * * * *", () => {
      weatherApiAxios
        .get(`/forecast/${WEATHER_API}/14.0717,%20100.60205?units=si`)
        .then(res => {
          const weather = res.data;
          emitWeather(weather);
          mcache.put(GET_WEATHER_MKEY, weather, 5 * 60 * 1000);
        });
    });
    this.job.start();
  }

  static getWeather() {
    let cachedBody = mcache.get(GET_WEATHER_MKEY);
    if (cachedBody) {
      return new Promise(resolve => {
        resolve(cachedBody);
      });
    }

    return weatherApiAxios
      .get(`/forecast/${WEATHER_API}/14.0717,%20100.60205?units=si`)
      .then(res => {
        const weather = res.data;
        mcache.put(GET_WEATHER_MKEY, weather, 5 * 60 * 1000);
        return weather;
      });
  }
}
