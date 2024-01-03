import { connect, store } from "./lib/mongo";
import { MQTT, handleShutdown } from "phonenumbers-lib";

const { BROKER_URL, SUBSCRIBE_TOPIC, DB_URI } = process.env;

const getEnvVars = () => {
  if (!DB_URI  || !SUBSCRIBE_TOPIC || !BROKER_URL) {
    console.error(`Required values missing (DB_URI, SUBSCRIBE_TOPIC):
                  ${DB_URI}, ${SUBSCRIBE_TOPIC}, ${BROKER_URL}`);
    process.exit(1);
  }

  return {
    db_uri: DB_URI,
    broker_url: BROKER_URL,
    subscribe_topic: SUBSCRIBE_TOPIC,
  }
}

(async (env) => {
  const inputClient = new MQTT(env.subscribe_topic, env.broker_url)
  inputClient.subscribe()

  handleShutdown(async () => {
    await inputClient.disconnect()
  });

  await connect(env.db_uri);

  for await (const message of inputClient.receive()) {
    const data = JSON.parse(message);
    console.log(`Storing: ${JSON.stringify(data)}`)

    await store(data);
  }

})(getEnvVars())
