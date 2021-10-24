const express = require('express');
const app = express(), bodyParser = require("body-parser");
const port = 3080;
const service = require('./service');
const Path = require('./dto/pathDTO');
const Resultado = require('./dto/resultadoDTO');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const r = await service.buscarConexoes('FLN');
  console.log(r);
  res.json(r);
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
