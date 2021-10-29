export class PathDTO {
  origemPath: string;
  distanciaPath: number;
  destinoPath: string;

  constructor(origem: string, distancia: number, destino: string) {
    {
      this.origemPath = origem;
      this.distanciaPath = distancia;
      this.destinoPath = destino;
    }
  }

}
