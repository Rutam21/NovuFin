const { Novu } = require("@novu/node");
const api = process.env.NOVU_API;
const flow = process.env.NOVU_Flow;
const flow2 = process.env.NOVU_Flow_2;

const novu = new Novu(api);

const triggerNotification = async (
  subscriberId,
  email,
  coin,
  price,
  firstname
) => {
  await novu.trigger(flow, {
    to: {
      subscriberId: subscriberId,
      email: email,
    },
    payload: {
      coin: coin,
      firstname: firstname,
      price: price,
    },
  });
};

const triggerTopicNotification = async (topicKey, data, coin, interval) => {
  setInterval(async () => {
    let price;
    if (coin in data.crypto) {
      price = data.crypto[coin].price;
    } else if (coin in data.stocks) {
      price = data.stocks[coin].price;
    } else {
      price = 0; // or any other default value
    }
    const upperCaseCoin = coin.toUpperCase();
    if (price) {
      await novu.trigger(interval === 2 ? flow2 : flow, {
        to: [{ type: "Topic", topicKey }],
        payload: {
          coin: upperCaseCoin,
          price,
        },
      });
    } else {
      logger.info(`Price not available for coin: ${upperCaseCoin}`);
    }
  }, interval * 60 * 1000); // Convert interval to milliseconds
};

const triggerEthereum2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "ethereum", 2);
};

const triggerEthereum1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "ethereum", 60);
};

const triggerEthereum6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "ethereum", 360);
};

const triggerEthereum24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "ethereum", 1440);
};

const triggerBitCoin2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "bitcoin", 2);
};

const triggerBitCoin1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "bitcoin", 60);
};

const triggerBitCoin6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "bitcoin", 360);
};

const triggerBitCoin24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "bitcoin", 1440);
};

const triggerDoge2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "dogecoin", 2);
};

const triggerDoge1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "dogecoin", 60);
};

const triggerDoge6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "dogecoin", 360);
};

const triggerDoge24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "dogecoin", 1440);
};

const triggerSolana2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "solana", 2);
};

const triggerSolana1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "solana", 60);
};

const triggerSolana6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "solana", 360);
};

const triggerSolana24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "solana", 1440);
};

const triggerBinance2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "binancecoin", 2);
};

const triggerBinance1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "binancecoin", 60);
};

const triggerBinance6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "binancecoin", 360);
};

const triggerBinance24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "binancecoin", 1440);
};

const triggerAave2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "aave", 2);
};

const triggerAave1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "aave", 60);
};

const triggerAave6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "aave", 360);
};

const triggerAave24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "aave", 1440);
};

const triggerMicrosoft2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "MSFT", 2);
};

const triggerMicrosoft1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "MSFT", 60);
};

const triggerMicrosoft6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "MSFT", 360);
};

const triggerMicrosoft24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "MSFT", 1440);
};

const triggerGoogle2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "GOOGL", 2);
};

const triggerGoogle1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "GOOGL", 60);
};

const triggerGoogle6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "GOOGL", 360);
};

const triggerGoogle24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "GOOGL", 1440);
};

const triggerTesla2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "TSLA", 2);
};

const triggerTesla1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "TSLA", 60);
};

const triggerTesla6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "TSLA", 360);
};

const triggerTesla24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "TSLA", 1440);
};

const triggerMeta2MINTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "META", 2);
};

const triggerMeta1HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "META", 60);
};

const triggerMeta6HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "META", 360);
};

const triggerMeta24HRTopicNotification = async (topicKey, data) => {
  triggerTopicNotification(topicKey, data, "META", 1440);
};

module.exports = {
  triggerNotification,
  triggerMicrosoft2MINTopicNotification,
  triggerMicrosoft1HRTopicNotification,
  triggerMicrosoft6HRTopicNotification,
  triggerMicrosoft24HRTopicNotification,
  triggerGoogle2MINTopicNotification,
  triggerGoogle1HRTopicNotification,
  triggerGoogle6HRTopicNotification,
  triggerGoogle24HRTopicNotification,
  triggerTesla2MINTopicNotification,
  triggerTesla1HRTopicNotification,
  triggerTesla6HRTopicNotification,
  triggerTesla24HRTopicNotification,
  triggerMeta2MINTopicNotification,
  triggerMeta1HRTopicNotification,
  triggerMeta6HRTopicNotification,
  triggerMeta24HRTopicNotification,
  triggerEthereum1HRTopicNotification,
  triggerEthereum2MINTopicNotification,
  triggerEthereum6HRTopicNotification,
  triggerEthereum24HRTopicNotification,
  triggerBitCoin2MINTopicNotification,
  triggerBitCoin1HRTopicNotification,
  triggerBitCoin6HRTopicNotification,
  triggerBitCoin24HRTopicNotification,
  triggerDoge2MINTopicNotification,
  triggerDoge1HRTopicNotification,
  triggerDoge6HRTopicNotification,
  triggerDoge24HRTopicNotification,
  triggerSolana2MINTopicNotification,
  triggerSolana1HRTopicNotification,
  triggerSolana6HRTopicNotification,
  triggerSolana24HRTopicNotification,
  triggerBinance2MINTopicNotification,
  triggerBinance1HRTopicNotification,
  triggerBinance6HRTopicNotification,
  triggerBinance24HRTopicNotification,
  triggerAave2MINTopicNotification,
  triggerAave1HRTopicNotification,
  triggerAave6HRTopicNotification,
  triggerAave24HRTopicNotification,
};
