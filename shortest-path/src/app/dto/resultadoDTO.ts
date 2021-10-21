import {PathDTO} from "./pathDTO";

export class ResultadoDTO {
  path: PathDTO;
  distanciaTotal: number;

  constructor(path: PathDTO, distanciaTotal: number) {
    {
      this.path = path;
      this.distanciaTotal = distanciaTotal;
    }
  }

}
