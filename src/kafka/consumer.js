import kafka from "kafka-node";
import { PROCESSED_GPS_TOPIC, ETA_TOPIC } from "./type";
import { handleProcessGpsTopic, handleETATopic } from "./controller";

const kafkaHost = "127.0.0.1:9092";

const client = new kafka.KafkaClient({ kafkaHost });
const topics = [
  {
    topic: PROCESSED_GPS_TOPIC
  }
];
const options = {};
const consumer = new kafka.Consumer(client, topics, options);
console.log("Kafka consumer is ready");

consumer.on("message", function(message) {
  const { topic, value } = message;

  switch (topic) {
    case PROCESSED_GPS_TOPIC:
      handleProcessGpsTopic(value);
      break;
    case ETA_TOPIC:
      handleETATopic(value);
      break;
    default:
      console.log("Invalid Topic" + topic);
  }
});

export default consumer;
