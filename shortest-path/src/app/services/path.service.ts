import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResultadoDTO} from "../dto/resultadoDTO";
import {Observable} from "rxjs";

const urlBackend = 'http://localhost:3080/path';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  showMessage(message: string, tipo: string): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: tipo
    })
  }

  buscarTudo() {
    let url = 'http://localhost:3080/';
    return this.http.get<String>(url);
  }

  calcularRota(origem: string, destino: string): Observable<ResultadoDTO> {
    const url = `${urlBackend}/calcular-caminho`;
    return this.http.post<ResultadoDTO>(url,{origem: origem, destino: destino});
  }
}
