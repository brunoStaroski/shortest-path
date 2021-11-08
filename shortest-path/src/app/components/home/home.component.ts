import { Component, OnInit } from '@angular/core';
import {PathService} from "../../services/path.service";
import {ThemePalette} from "@angular/material/core";
import {ResultadoDTO} from "../../dto/resultadoDTO";
import {PathDTO} from "../../dto/pathDTO";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  origem: string;
  destino: string;
  distancia: string;
  resultado: ResultadoDTO;
  buttonColor: ThemePalette = 'primary';

  displayedColumns: string[] = ['origem', 'distancia', 'destino'];

  constructor(private PathService: PathService) { }

  ngOnInit(): void {
    this.inicializarObjetos();
  }

  private inicializarObjetos() {
    this.origem = '';
    this.destino = '';
    this.distancia = '';
    this.resultado = new ResultadoDTO(new Array(), 0);
  }

  obterRota(nomeAeroporto: string) {
    if (!Object.is(this.origem, '') && !Object.is(this.destino, '')) {
      this.inicializarObjetos();
      this.origem = nomeAeroporto;
    } else if (Object.is(this.origem, '')) {
      this.origem = nomeAeroporto;
    } else {
      this.destino = nomeAeroporto;
    }

    if (!Object.is(this.origem, '') && !Object.is(this.destino, '')) {
       this.PathService.calcularRota(this.origem, this.destino).subscribe((response : any) => {
         this.resultado = response.valueOf();
         this.resultado = new ResultadoDTO(response.valueOf().path, response.valueOf().distanciaTotal);
         console.log(this.resultado);
       });
    }
  }

}
