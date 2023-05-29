require("dotenv").config();
const express = require("express");
const axios = require("axios");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const bodyParser = require("body-parser");
const logger = require("./logger");
const novuSubscriber = require("./handlers/subscriber");
const {
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
} = require("./handlers/trigger");
const addToNovuTopic = require("./handlers/topic");

const port = 3000;

// Object to store real-time data
let realTimeData = {};

app.use(express.static("public"));
app.use(bodyParser.json());

// Function to fetch real-time stock data from the Alpha Vantage API
async function fetchStockData() {
  const apiKey = process.env.ALPHA_VANTAGE_API; // Replace with your Alpha Vantage API key
  const symbols = ["MSFT", "TSLA", "META", "GOOGL"];

  try {
    const responses = await Promise.all(
      symbols.map((symbol) =>
        axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        )
      )
    );

    // Update the real-time data object with the fetched stock data
    realTimeData.stocks = {};

    responses.forEach((response) => {
      const symbol = response.data["Global Quote"]["01. symbol"];
      const price = parseFloat(response.data["Global Quote"]["05. price"]);
      const high = parseFloat(response.data["Global Quote"]["03. high"]);
      const low = parseFloat(response.data["Global Quote"]["04. low"]);
      const priceChange = parseFloat(
        response.data["Global Quote"]["09. change"]
      );

      realTimeData.stocks[symbol] = { price, high, low, priceChange };
    });

    // Send the updated stock data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ stocks: realTimeData.stocks }));
      }
    });
    logger.info("Updated Stocks Data");
    // Log the updated stock data
  } catch (error) {
    logger.error("Error fetching stock data:", error);
  }
}

async function fetchCryptoData() {
  const symbols = [
    "bitcoin",
    "ethereum",
    "dogecoin",
    "solana",
    "binancecoin",
    "aave",
  ];

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${symbols.join(
        ","
      )}&vs_currency=usd`
    );

    // Update the real-time data object with the fetched crypto data
    realTimeData.crypto = {};

    symbols.forEach((symbol) => {
      const coinData = response.data.find((coin) => coin.id === symbol);

      if (coinData) {
        realTimeData.crypto[symbol] = {
          price: coinData.current_price,
          high: coinData.high_24h,
          low: coinData.low_24h,
          priceChange: coinData.price_change_24h,
        };
      } else {
        logger.info(`Data not available for symbol: ${symbol}`);
      }
    });

    // Send the updated crypto data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ crypto: realTimeData.crypto }));
      }
    });

    // Log the updated crypto data
    logger.info("Updated crypto data:", realTimeData.crypto);
  } catch (error) {
    logger.error("Failed to fetch crypto data:", error);
  }
}

wss.on("connection", (ws) => {
  // Send the initial data to the client upon connection
  ws.send(JSON.stringify(realTimeData));
});

// Set up a route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname, "index.html");
});

// Set up WebSocket connection
wss.on("connection", (ws) => {
  // Send the initial data to the client upon connection
  ws.send(JSON.stringify(realTimeData));
});

// Function to fetch real-time data
function fetchRealTimeData() {
  // Call the fetchStockData function initially
  fetchStockData();
  fetchCryptoData();

  // Set up an interval to update the data every 3 minutes
  setInterval(() => {
    fetchStockData();
    fetchCryptoData();
  }, 180000); // Update data every 3 minutes (180000 milliseconds)
}

// Start fetching real-time data when the app starts
fetchRealTimeData();

const symbols = [
  "Ethereum",
  "BitCoin",
  "Doge",
  "Solana",
  "Binance",
  "Aave",
  "Meta",
  "Microsoft",
  "Google",
  "Tesla",
];

const intervals = ["2MIN", "1HR", "6HR", "24HR"];

for (const symbol of symbols) {
  for (const interval of intervals) {
    const functionName = `trigger${symbol}${interval}TopicNotification`;
    const functionToCall = eval(functionName); // Use eval to dynamically call the function

    if (typeof functionToCall === "function") {
      functionToCall(`${symbol}-${interval}-NOTIFIER`, realTimeData);
    }
  }
}

app.post("/api/subscribe", async (req, res) => {
  const { subscriberId, email, coin, price, firstname, topicKey } = req.body;

  try {
    // Create Novu Subscriber
    await novuSubscriber(subscriberId, email, firstname);

    // Add Subscriber to Novu Topic
    if (topicKey !== null) {
      await addToNovuTopic(subscriberId, topicKey);
    }
    // Trigger instant notification
    await triggerNotification(subscriberId, email, coin, price, firstname);

    // Send a response indicating success
    res.sendStatus(200);
  } catch (error) {
    // Handle error
    console.error("Subscription failed", error);
    res.sendStatus(500);
  }
});

// Start the Express server
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
