import kafka from "kafka-node";
import { PROCESSED_GPS_TOPIC, ETA_TOPIC } from "./type";
import { handleProcessGpsTopic, handleETATopic } from "./controller";

const kafkaHost = "127.0.0.1:9092";

const client = new kafka.KafkaClient({ kafkaHost });
const topicsToCreate = [
  {
    topic: PROCESSED_GPS_TOPIC,
    configEntries: [{ name: "retention.ms", value: '60000' }]
  },
  {
    topic: ETA_TOPIC,
    configEntries: [{ name: "retention.ms", value: '60000' }]
  }
];

client.createTopics(topicsToCreate, (err, res) => {
  if (err) return console.log(err);
  console.log(res);
});
const topics = [
  {
    topic: PROCESSED_GPS_TOPIC
  },
  {
    topic: ETA_TOPIC
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

consumer.on("error", error => {
  console.log(error);
});

export default consumer;
