import io from "socket.io-client";
import { sendOne } from "../kafka/producer";
import { GPS_LOG_TOPIC } from "../kafka/type";

const socket = io("https://service.mappico.co.th");

let isConnected = false;
socket.on("connect", function() {
  isConnected = true;
  socket.emit("room", "THAMMATRANS");
});

socket.on("TU-NGV", function(data) {
  if (data.satellite < 3 || data.speed === 0) return;
  const d = new Date(data.timestamp);
  const data_compressed = [
    data.carno,
    d.getTime() / 1000,
    data.lat,
    data.lon,
    data.speed,
    data.direction
  ];
  sendOne(GPS_LOG_TOPIC, JSON.stringify(data_compressed));
});

socket.on("disconnect", function() {
  let interval = setInterval(() => {
    if (isConnected) {
      clearInterval(interval);
      interval = null;
      return;
    }
    socket.open();
  }, 5000);
});
