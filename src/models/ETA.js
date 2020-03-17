class ETA {
  constructor() {
    this.state = {};
  }
  setStopETA(sid, eta) {
    this.state[sid] = eta;
  }
  getStopETA(sid) {
    return this.state[sid] || {};
  }
}
const eta = new ETA();
export default eta;
