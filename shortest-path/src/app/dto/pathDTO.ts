export class PathDTO {
  origem: string;
  distancia: number;
  destino: string;

  constructor(origem: string, distancia: number, destino: string) {
    {
      this.origem = origem;
      this.distancia = distancia;
      this.destino = destino;
    }
  }
  
}
