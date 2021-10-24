const pg = require('pg');
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

  buscarConexoes: async function (origem) {
    try {
      const client = await pool.connect();
      let result = await client.query("select * from path where path.origem like" + "'" + origem + "'");
      let path = [];
      result.rows.forEach(temp => {
        path.push(new Path(temp.origem, temp.distancia, temp.destino));
      })
      return path;
    } catch (err){
      console.log(err);
    }
  },



  // buscarConexoes: function (origem) {
  //   let path = new Array();
  //   pool.connect(async function (err, client, done) {
  //     if (err) throw err
  //     await client.query("select * from path where path.origem like" + "'" + origem + "'", function (err, res) {
  //       done();
  //       console.log(res.rows);
  //       if (err) throw err
  //       res.rows.forEach(temp => {
  //         path.push(new Path(temp.origem, temp.distancia, temp.destino));
  //       })
  //       console.log(path);
  //     });
  //   });
  //   return path;
  // },

  retornarCaminho: async function (origem, destino) {
    return await this.calcularCaminho(origem, destino);
  },

  calcularCaminho: async function (origem, destino) {
    let distanciaTotal = 0;
    let conexoes = [];
    let final = '';
    let result = [];
    let pathTemp;
    let distTemp = Infinity;
    conexoes = await this.buscarConexoes(origem);
    while (final != destino) {
      pathTemp = conexoes[0];
      for (let p in conexoes) {
        if (distTemp > p.distanciaPath) {
          distTemp = p.distanciaPath;
          pathTemp = p;
        }
      }
      distanciaTotal += distTemp;
      final = pathTemp.destinoPath;
      result.push(pathTemp);
      conexoes = await this.buscarConexoes(final);
    }
    return new Resultado(result,distanciaTotal);
  },

}
