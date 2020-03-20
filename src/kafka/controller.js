import { emitTuNgv, emitETAStop } from "../socket/app";
import ETA from "../models/ETA";

export const handleProcessGpsTopic = value => emitTuNgv(value);

export const handleETATopic = value => {
  try {
    value = JSON.parse(value);
    if (!value || value.length !== 2) return;
    const [sid, eta] = value;
    ETA.setStopETA(sid, eta);
    emitETAStop(sid, eta);
  } catch (err) {
    console.log("ka/co:16");
  }
};
