const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
const sequelize = require("./Db/sequelize");

sequelize.initDataBase();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: `L'url demandé n'existe pas.` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
