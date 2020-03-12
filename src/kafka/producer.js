import kafka from "kafka-node";

const kafkaHost = "127.0.0.1:9092";

const client = new kafka.KafkaClient({ kafkaHost });
const producer = new kafka.Producer(client);

producer.on("ready", function() {
  console.log("Kafka producer is ready");
});

producer.on("error", function(err) {
  console.log("Kafka Produser Error");
  console.log(err);
});

export default producer;

export function sendOne(topic, messages) {
  const payloads = [{ topic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    if (err) {
      console.log(err, data);
      return 1;
    }
  });
}
