const { Novu } = require("@novu/node");
const api = process.env.NOVU_API;
const logger = require("../logger");

const novu = new Novu(api);

const novuSubscriber = async (subscriberId, email, firstname) => {
  // Trigger the necessary action using the received data
  await novu.subscribers.identify(subscriberId, {
    email: email,
    firstName: firstname,
  });
  logger.info("Subscriber Added");
};

module.exports = novuSubscriber;
