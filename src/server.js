const express = require("express");
const routes = require("./routes");
const cors = require("cors");

require("./database/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static("public"));

app.listen(5000);
