const pg = require('pg');
const client = new pg.Client("postgres://postgres:postgres@localhost:5432/shortest-path");
const pool = new pg.Pool({user: 'postgres',host: 'localhost',database: 'shortest-path',password: 'admin',port: 5432});
const Path = require('./dto/pathDTO');
const Resultado = require('./dto/resultadoDTO');

module.exports = {

  buscarTodosCaminhos: function (result) {
    pool.connect(function (err, client, done) {
      if (err) throw err
      client.query("select * from path", function (err, res) {
        done();
        if (err) throw err
        if (!Object.is(res.rows, null)) {
          let path = new Array();
          res.rows.forEach(temp => {
            path.push(new Path(temp.origem, temp.distancia, temp.destino));
          })
          return result(path);
        }
      });
    });
  },

  buscarConexoes: function (origem, result) {
    pool.connect(function (err, client, done) {
      if (err) throw err
      client.query("select * from path where path.origem like" + "'" + origem + "'", function (err, res) {
        done();
        if (err) throw err
        if (!Object.is(res.rows, null)) {
          let path = new Array();
          res.rows.forEach(temp => {
            path.push(new Path(temp.origem, temp.distancia, temp.destino));
          })
          console.log(path);
          return result(path);
        }
      });
    });
  },

  retornarCaminho: function (origem, destino, result) {
    console.log(`chegou service 1: ${origem}, ${destino}`);
    this.calcularCaminho(origem, destino, function (res) {
      return result(res);
    });
  },

  calcularCaminho: function (origem, destino, result) {
    console.log(`chegou service 2: ${origem}, ${destino}`);
    let distanciaTotal = 0;
    let conexoes = new Array();
    let final = '';
    result = new Array();
    this.buscarConexoes(origem, function (result) {
      conexoes = result;
    });

    while (final != destino) {
      console.log(`chegou while 1: ${final}`);
      let distTemp = Infinity;
      let pathTemp = conexoes[0];
      console.log(conexoes[0]);
      for (let p in conexoes) {
        if (distTemp > p.distanciaPath) {
          distTemp = p.distanciaPath;
          pathTemp = p;
        }
      }

      distanciaTotal += distTemp;
      console.log(`distancia total: ${distanciaTotal}`)
      final = pathTemp.origemPath;
      console.log(`final: ${final}`)
      result.push(pathTemp);
      console.log(`result: ${result}`)
      this.buscarConexoes(pathTemp.origemPath, function (result) {
        conexoes = result;
      });

      console.log(`conexoes: ${conexoes}`)
    }
    return result(new Resultado(result,distanciaTotal));
  }

}
