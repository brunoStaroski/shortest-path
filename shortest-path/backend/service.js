const pg = require('pg');
const client = new pg.Client("postgres://postgres:postgres@localhost:5432/shortest-path");

module.exports = {

  buscarTodosCaminhos:function (result) {
    client.connect(function (err) {
      if (err) throw err;
      client.query("select * from path", function (err, res){
        if (err) throw err;
        return result(res.rows);
      });
      client.end;
    });
  }



}
