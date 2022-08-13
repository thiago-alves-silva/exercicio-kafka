const kafka = require("kafka-node");

exports.sendMessage = (req, res) => {
  const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
  const producer = new kafka.Producer(client);

  producer.on("ready", () => {
    const message = JSON.stringify(req.body);
    producer.send(
      [
        {
          topic: "testecv",
          messages: message,
        },
      ],
      (err, data) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Falha no envio da mensagem ao Kafka" });
          throw new Error(err);
        }
        console.log("Mensagem enviada ao Kafka:", message);
        res.status(200).send(data);
        producer.close();
        client.close();
      }
    );
  });

  producer.on("error", (err) => {
    res.status(500).json({ error: "Erro no Producer" });
    throw new Error(err);
  });
};
