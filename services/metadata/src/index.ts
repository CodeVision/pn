import { getMetadata } from "./lib/metadata";
import { MQTT, handleShutdown } from "phonenumbers-lib"

const { PUBLISH_TOPIC, SUBSCRIBE_TOPIC, BROKER_URL } = process.env;

const getEnvVars = () => {
  if (!PUBLISH_TOPIC  || !SUBSCRIBE_TOPIC || !BROKER_URL) {
    console.error(`Required values missing (SUBSCRIBE_TOPIC, PUBLISH_TOPIC):
                  ${SUBSCRIBE_TOPIC}, ${PUBLISH_TOPIC}, ${BROKER_URL}`);
    process.exit(1);
  }

  return {
    publish_topic: PUBLISH_TOPIC,
    subscribe_topic: SUBSCRIBE_TOPIC,
    broker_url: BROKER_URL
  }
}

(async (env) => {
  console.log(env)
  const inputClient = new MQTT(env.subscribe_topic, env.broker_url)
  inputClient.subscribe()

  const outputClient = new MQTT(env.publish_topic, env.broker_url)

  handleShutdown(async () => {
    await inputClient.disconnect()
    await outputClient.disconnect()
  });

  for await (const message of inputClient.receive()) {
    const data = JSON.parse(message);

    try {
      const metadata = getMetadata(data.number);

      outputClient.publish(metadata)
    } catch(error) {}
  }

})(getEnvVars())
