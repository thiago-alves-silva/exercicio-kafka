const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// routes
const send = require("./routes/send");
app.use("/send", send);

app.listen(3000, () => console.log("Produtor rodando na porta 3000..."));
