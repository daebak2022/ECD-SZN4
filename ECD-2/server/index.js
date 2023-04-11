const express = require("express");
const cors = require("cors");
const crypto = require("./crypto");

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = new Map([
  // ["B751181881B238BC03AFF2F05238523E5153CE7C", 100], // bob
  // ["2691DFF0EEAE64F2BF99B775A5E8A6BD0C1D01A3", 50], // alice
  // ["859769B97161E02C983A49D6B3DCCBECE32431E8", 75], // charles

  ["6EB019BB31F5985FD52DDB2FE8C1E14E50B537DA", 100], // bob
  ["29DEB08566D7D6383E21C5291DF660A5EC9315F8", 50], // alice
  ["0285DC17695F3C654EFCEF6E88A03CF7F5586645", 75], // charles
]);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances.get(address) || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const pubKey = crypto.signatureToPubKey(message, signature);
  const sender = crypto.pubKeyToAddress(pubKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, balances.get(sender) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: balances.get(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
