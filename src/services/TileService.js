import axios from "axios";
import { ensureDirectoryWrite } from "../utils/index";

const TOKEN =
  "pk.eyJ1IjoidHVhcm91bmRkZXYiLCJhIjoiY2s4Mm1kbWQ5MG5leDNlcDR4aGU1dzNqZyJ9.0L673kn60pl3lU-q_sntuA";
const TILE_MODES = {
  street: "tuarounddev/ck82q9hh20a251iqmdf0652xy",
  satellite: "mapbox/satellite-streets-v11"
};
const mapBoxApiAxios = axios.create({
  baseURL: "https://api.mapbox.com"
  // headers: {
  // "Content-Type": "application/json"
  // }
});
export default class TileService {
  static getTile(mode, x, y, z) {
    return mapBoxApiAxios
      .get(`/styles/v1/${TILE_MODES[mode]}/tiles/${z}/${x}/${y}@2x`, {
        params: { access_token: TOKEN },
        responseType: "arraybuffer"
      })
      .then(_res => {
        ensureDirectoryWrite(
          `public/api/tiles/${mode}/${z}/${x}/${y}`,
          _res.data
        );
        return _res.data;
      })
      .catch(() => {
        return;
      });
  }
}
