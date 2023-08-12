const express = require("express");
const app = express();
const port = 3001;
app.set("port", port);

const tradeRouter = require('./routes/tradeController');
app.use('/trade',tradeRouter);
app.listen(port, () => console.log("Listening on", port));

module.exports = app;
