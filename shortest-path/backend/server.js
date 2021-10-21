const express = require('express');
const app = express(), bodyParser = require("body-parser");
const port = 3080;
const service = require('./service');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  service.buscarTodosCaminhos(function (result) {
    res.json(result);
  });
});

app.post('/path/calcular-caminho', (req, res) => {
  if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
    service.retornarCaminho(req.body.origem, req.body.destino, function (result) {
      res.json(result);
    });
  }
});

app.listen(port, () => {
  console.log(`Server on na porta:${port}`);
});
