import io from "../socket/app";
import ETA from '../models/ETA';

export const handleProcessGpsTopic = value => {
  io().emit("TU-NGV", value);
};

export const handleETATopic = value => {
  try {
    value = JSON.parse(value);
    if (!value || value.length !== 2) return;
    const [sid, eta] = value;
    ETA.setStopETA(sid, eta);
    io().emit(`ETA/${sid}`, eta);
  } catch (err) {
    console.log("ka/co:16");
  }
};
