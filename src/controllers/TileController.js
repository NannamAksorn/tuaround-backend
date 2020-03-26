import TileService from "../services/TileService";

export default class TileController {
  constructor() {
    this.postLogin = this.postLogin.bind(this);
  }

  static getTile(req, res, next) {
    const { mode, x, y, z } = req.params;
    return TileService.getTile(mode, x, y, z)
      .then(_res => {
        if (!_res) return;
        res.set({
          "Content-Type": "image/png",
          "Content-Length": _res.length
        });
        return res.end(_res);
      })
      .catch(err => next(err));
  }
}
