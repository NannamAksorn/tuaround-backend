import io from "../socket/app";

export const handleProcessGpsTopic = value => {
  io().emit("TU-NGV", value);
};

export const handleETATopic = value => {
  console.log(value);
  // io().emit('TU-NGV', value);
};
