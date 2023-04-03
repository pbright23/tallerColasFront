var text = "¡Envianos tu apoyo!";
document.getElementById("myText").innerHTML = text;

const { Kafka } = require('kafkajs');
//import { Kafka } from './node_modules/kafkajs/index.js';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'my-app',
});

// function to send a message to Kafka
function sendMessage(topic, message) {
  const producer = kafka.producer();

  producer.connect()
    .then(() => producer.send({
      topic: topic,
      messages: [{ value: message }]
    }))
    .then(() => console.log(`Message "${message}" sent to topic "${topic}"`))
    .catch((err) => console.error(`Error sending message: ${err}`))
    .finally(() => producer.disconnect());
}

// function to consume messages from Kafka
function consumeMessage(topic) {
  const consumer = kafka.consumer({ groupId: 'test-group' });

  consumer.connect()
    .then(() => consumer.subscribe({ topic: topic, fromBeginning: true }))
    .then(() => consumer.run({
      eachMessage: ({ topic, partition, message }) => {
        console.log(`Received message "${message.value}" from topic "${topic}"`);
        document.getElementById("myText").innerHTML = message.value.toString();
      },
    }))
    .catch((err) => console.error(`Error consuming message: ${err}`))
}


function boton() {

    document.getElementById("myText").innerHTML = "esperando respuesta...";


    sendMessage('test', 'mensaje del front');
    consumeMessage('dos');
}

// example usage: send a message to topic "my-topic" and wait for a message in topic "my-other-topic"
//sendMessage('test', 'buenas');
//consumeMessage('dos');