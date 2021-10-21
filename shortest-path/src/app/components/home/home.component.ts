import { Component, OnInit } from '@angular/core';
import {PathService} from "../../services/path.service";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  origem: string;
  destino: string;
  distancia: string;
  buttonColor: ThemePalette = 'primary';

  constructor(private PathService: PathService) { }

  ngOnInit(): void {
    this.inicializarObjetos();
  }

  private inicializarObjetos() {
    this.origem = '';
    this.destino = '';
    this.distancia = '';
  }

  obterRota(nomeAeroporto: string) {
    if (Object.is(this.origem, '')) {
      this.origem = nomeAeroporto;
    } else {
      this.destino = nomeAeroporto;
    }

    if (!Object.is(this.origem, '') && !Object.is(this.destino, '')) {
       this.PathService.calcularRota(this.origem, this.destino).subscribe((response : any) => {
         console.log(response.valueOf());
         this.distancia = response.valueOf();
       });
    }
  }

}
