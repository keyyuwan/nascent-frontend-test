const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3001;

const btcOrderbook = require("./data/btc_orderbook.json");
const ethOrderbook = require("./data/eth_orderbook.json");
const btcTradeHistory = require("./data/btc_trade_history.json");
const ethTradeHistory = require("./data/eth_trade_history.json");

app.use(cors());
app.use(express.json());

/* Endpoint for simple hello world test */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* Orderbook Endpoint
Specifying the optional asset parameter will allow getting the orderbook for that asset. The default is always BTC.
Example: http://localhost:3001/orderbook/ETH
*/
app.get("/orderbook/:asset?", (req, res) => {
  const asset = req.params.asset?.toUpperCase() || "BTC";
  switch (asset) {
    case "BTC":
      res.json(btcOrderbook);
    case "ETH":
      res.json(ethOrderbook);
  }
});

/* Orderbook Endpoint
Specifying the optional asset parameter will allow getting the user's trade history for that asset. The default is always BTC.
Example: http://localhost:3001/trade-history/ETH
*/
app.get("/trade-history/:asset?", (req, res) => {
  const asset = req.params.asset?.toUpperCase() || "BTC";
  switch (asset) {
    case "BTC":
      res.json(btcTradeHistory);
    case "ETH":
      res.json(ethTradeHistory);
  }
});

/* Orderbook Endpoint
The trade requires: asset (string), side (BUY/SELL), type (optional: LIMIT/MARKET), quantity (number), price (number), notional (number)
This endpoint performs simple validation. Returns the submitted order, with a unique id and timestamp of submisison.
Example:
  curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"asset":"BTC","side":"BUY", "type": "LIMIT", "quantity": 2, "price": 61000, "notional": 122000}' \
    http://localhost:3001/trade
*/
app.post("/trade/", (req, res) => {
  const order = req.body;
  console.log(req.body);

  // Validations
  if (!order.asset) {
    res.status("422").send({ message: "Asset is missing" });
  }

  if (!order.side) {
    res.status("422").send({ message: "Side is missing" });
  }

  if (order.quantity <= 0) {
    res.status("422").send({ message: "Quantity is invalid" });
  }

  order.type = order.type || "LIMIT"; // default to LIMIT
  if (
    order.type?.toUpperCase() === "LIMIT" &&
    (!order.price || order.price <= 0)
  ) {
    res.status("422").send({ message: "Price is invalid for LIMIT order" });
  }
  if (order.type?.toUpperCase() === "MARKET" && order.price) {
    res
      .status("422")
      .send({ message: "Price shouldn't be provided for MARKET order" });
  }

  if (order.notional <= 0) {
    res.status("422").send({ message: "Notional is invalid" });
  }

  res.send({
    ...order,
    id: uuidv4(),
    timestamp: Date.now(),
  });
});

app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`);
});
