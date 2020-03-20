import sio from "socket.io";

let io;

export const channels = {
  // emit
  TU_NGV: "TU-NGV",
  WEATHER: "WEATHER"
};

export const connectSocketIo = server => {
  io = sio(server, {
    origins: ["127.0.0.1:*", "*:*"]
  });

  io.on("connection", socket => {
    // socket.on(channels.GET_ETA, sid => {
    //   const eta = ETA.getStopETA(sid);
    //   socket.emit(`ETA/${sid}`, eta);
    // });
  });
};

export const emitTuNgv = value => io.emit(channels.TU_NGV, value);
export const emitWeather = value => io.emit(channels.WEATHER, value);
export const emitETAStop = (sid, eta) => io.emit(`ETA/${sid}`, eta);
export default () => io;
