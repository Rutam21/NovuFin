// Establish WebSocket connection
const socket = new WebSocket("wss://shark-app-nvoag.ondigitalocean.app");

// Function to update the stock data on the webpage
function updateStockData(stockData) {
  for (const symbol in stockData) {
    const stock = stockData[symbol];
    const stockContainer = document.getElementById(`stock-${symbol}`);

    if (stockContainer) {
      const priceElement = stockContainer.querySelector(".price");
      const highElement = stockContainer.querySelector(".high");
      const lowElement = stockContainer.querySelector(".low");
      const priceChangeElement = stockContainer.querySelector(".priceChange");

      if (priceElement) {
        priceElement.textContent = `$${stock.price.toFixed(2)}`;
      }

      if (highElement) {
        highElement.innerHTML = `<span class="home-text006 home-description">High:</span> $${stock.high.toFixed(
          2
        )}`;
      }
      if (lowElement) {
        lowElement.innerHTML = `<span class="home-text009 home-description01">Low:</span> $${stock.low.toFixed(
          2
        )}`;
      }
      if (priceChangeElement) {
        priceChangeElement.innerHTML = `<span class="home-text012 home-description02">Price Change:</span> $${stock.priceChange.toFixed(
          2
        )}`;
      }
    }
  }
}

// Function to update the crypto data on the webpage
function updateCryptoData(cryptoData) {
  for (const symbol in cryptoData) {
    const crypto = cryptoData[symbol];
    const cryptoContainer = document.getElementById(`crypto-${symbol}`);

    if (cryptoContainer) {
      const priceElement = cryptoContainer.querySelector(".price");
      const highElement = cryptoContainer.querySelector(".high");
      const lowElement = cryptoContainer.querySelector(".low");
      const priceChangeElement = cryptoContainer.querySelector(".priceChange");

      if (priceElement) {
        priceElement.textContent = `$${crypto.price.toFixed(2)}`;
      }

      if (highElement) {
        highElement.innerHTML = `<span class="home-text006 home-description">High:</span> $${crypto.high.toFixed(
          2
        )}`;
      }
      if (lowElement) {
        lowElement.innerHTML = `<span class="home-text009 home-description01">Low:</span> $${crypto.low.toFixed(
          2
        )}`;
      }
      if (priceChangeElement) {
        priceChangeElement.innerHTML = `<span class="home-text012 home-description02">Price Change:</span> $${crypto.priceChange.toFixed(
          2
        )}`;
      }
    }
  }
}

// Function to handle incoming WebSocket messages
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.stocks) {
    updateStockData(data.stocks);
  }

  if (data.crypto) {
    updateCryptoData(data.crypto);
  }
};
