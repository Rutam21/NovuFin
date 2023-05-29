const { Novu } = require("@novu/node");

const api = process.env.NOVU_API;

const novu = new Novu(api);

const addToNovuTopic = async (subscriberId, topicKey) => {
  await novu.topics.addSubscribers(topicKey, {
    subscribers: [subscriberId],
  });
};

module.exports = addToNovuTopic;
