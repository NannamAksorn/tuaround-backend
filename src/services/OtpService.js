import axios from "axios";

const tuApiAxios = axios.create({
  baseURL: "http://127.0.0.1:4436",
  headers: {
    "Content-Type": "application/json"
  }
});

export default class OtpService {
  static getRouters(fromPlace, toPlace) {
    console.log(fromPlace, toPlace);
    return tuApiAxios
      .get("/otp/routers/default/plan", {
        params: {
          fromPlace,
          toPlace,
          time: "7:30am",
          mode: "TRANSIT,WALK",
          maxWalkDistance: 9999,
          date: "01-01-2020"
        }
      })
      .then(_res => {
        if (_res.data && _res.data.plan) {
          const routes = _res.data.plan.itineraries.map(({ legs }) => {
            return legs.map(leg => {
              const {
                distance,
                mode,
                route,
                from,
                to,
                legGeometry,
                duration
              } = leg;
              // return legs.map(({ legGeometry }) => {
              //  return legGeometry.points;
              return {
                distance,
                mode,
                route,
                duration,
                from,
                to,
                points: legGeometry.points
              };
            });
          });
          return routes;
        }
        return _res.data;
      });
  }
}
