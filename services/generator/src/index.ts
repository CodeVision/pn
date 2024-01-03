import { generate } from "./lib/generator";
import { MQTT, handleShutdown } from "phonenumbers-lib"


const { MIN, MAX, PUBLISH_TOPIC, DELAY, BROKER_URL } = process.env;

const getEnvVars = () => {
  if (!PUBLISH_TOPIC || !BROKER_URL) {
    console.error(`Required values missing (PUBLISH_TOPIC, BROKER_URL): ${PUBLISH_TOPIC} ${BROKER_URL}`);
    process.exit(1);
  }

  const min = MIN && parseInt(MIN) || 10_000_000_000
  const max = MAX && parseInt(MAX) || 999_999_999_999
  const delay = DELAY && parseInt(DELAY) || 100

  return { min, max, delay, publish_topic: PUBLISH_TOPIC, broker_url: BROKER_URL }
}

const wait = async (time: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, time))
}

(async (env) => {
  console.log(env)
  const client = new MQTT(env.publish_topic, env.broker_url)

  handleShutdown(async () => {
    await client.disconnect()
  });

  while (true) {
    let num = generate(env.min, env.max)

    await wait(env.delay)

    console.log(num)

    await client.publish({ number: String(num) })
  }
})(getEnvVars())
