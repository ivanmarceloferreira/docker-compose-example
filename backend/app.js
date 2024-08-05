const express = require("express");
const app = express();
const cors = require('cors')
const port = 3000;

app.use(cors());

app.get("/", function (req, res) {
  res.send(`Ouvindo no backend na porta: ${port}`);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
