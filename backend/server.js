const express = require("express");
const routes = require("./src/routes");
const app = express();

app.use(express.json());
app.use(routes);

//notFound / error aviso para a api
app.use((req, res, next) => {
  const error = new Error("not Found");
  error.status = 404;
  next(error);
});

//mostrar erros midleware | error 500 (O servidor encontrou uma situação com a qual não sabe lidar.)

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(3333, () => console.log("server esta rodando"));
