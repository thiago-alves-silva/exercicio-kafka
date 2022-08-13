const kafka = require("kafka-node");
const mongoose = require("mongoose");
const Message = require("./mongoose/models/Message");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });

const createKafkaTopic = (topic) =>
  new Promise((resolve, reject) => {
    client.topicExists([topic], (err) => {
      if (err) {
        client.createTopics(
          [{ topic: topic, partitions: 1, replicationFactor: 1 }],
          (err, result) => {
            if (err || result?.length)
              return reject(new Error(`Erro na criação do tópico:\n ${err}`));
            console.log(`Tópico '${topic}' foi criado!`);
            resolve();
          }
        );
      } else {
        console.log(`O tópico '${topic}' já existe!`);
        resolve();
      }
    });
  });

const initConsumer = async () => {
  try {
    await createKafkaTopic("testecv");
    await mongoose.connect("mongodb://root:root@mongo:27017/", {
      dbName: "testecv",
    });
    console.log("Conectado com o MongoDB");

    const consumer = new kafka.Consumer(client, [{ topic: "testecv" }]);
    consumer.on("message", (message) => {
      Message.insertMany(
        [{ message: message.value, createdAt: Date.now() }],
        (err) => {
          if (err)
            throw new Error(
              `Erro na inserção da mensagem no MongoDB:\n ${err}`
            );
          console.log(`Mensagem salva no MongoDB: ${message.value}`);
        }
      );
    });

    consumer.on("error", (err) => {
      throw new Error(`Erro no Consumer:\n ${err}`);
    });
  } catch (error) {
    console.error(error);
  }
};

initConsumer();
