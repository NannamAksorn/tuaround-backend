import io from "socket.io-client";
import { sendOne } from "../kafka/producer";

const socket = io("https://service.mappico.co.th");

socket.on("connect", function() {
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
  sendOne("gps-log-topic", JSON.stringify(data_compressed));
});

socket.on("disconnect", function() {
  socket.open();
});
