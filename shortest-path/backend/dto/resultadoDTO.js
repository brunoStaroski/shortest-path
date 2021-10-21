const Path = require('./pathDTO');

module.exports = class Path {

  constructor(path, distanciaTotal) {
    this.path = path;
    this.distanciaTotal = distanciaTotal;
  }

}
