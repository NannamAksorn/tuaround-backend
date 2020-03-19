import axios from "axios";
import mcache from "memory-cache";

const WEATHER_API = "56d11b10e025f7cd93cc31496fba4cb6";
const GET_WEATHER_MKEY = "getWeather";

const weatherApiAxios = axios.create({
  baseURL: "https://api.darksky.net",
  headers: {
    "Content-Type": "application/json"
  }
});

export default class WeatherService {
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
        mcache.put(GET_WEATHER_MKEY, weather, 2 * 60 * 1000);
        return weather;
      });
  }
}
