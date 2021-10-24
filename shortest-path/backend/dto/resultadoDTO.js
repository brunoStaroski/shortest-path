const Path = require('./pathDTO');

module.exports = class Resultado {

  constructor(path, distanciaTotal) {
    this.path = path;
    this.distanciaTotal = distanciaTotal;
  }

}
