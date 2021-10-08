const express = require('express');
const app = express(), bodyParser = require("body-parser");
const port = 3080;
const pg = require('pg');
const client = new pg.Client("postgres://postgres:postgres@localhost:5432/shortest-path");
const service = require('./service');

app.use(bodyParser.json());

app.post('/path/obter-caminho', (req, res) => {
  if (!Object.is(req.body, null)) {
    client.connect(function (err) {
      if (err) throw err;
      client.query("SELECT * FROM path WHERE path.origem LIKE " + "'" + req.body.origem + "'", function (err, result){
        if (err) throw err;
        res.json(result);
      });
    });
  };
});

app.get('/', (req, res) => {
  service.buscarTodosCaminhos(function (result) {
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server on na porta:${port}`);
});
