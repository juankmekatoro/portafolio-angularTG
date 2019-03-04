import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  constructor(private http: HttpClient) {
    // console.log('Servicio de infoPagina Listo!');

    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe((data: InfoPagina) => {
        this.cargada = true;
        this.info = data;
        console.log(data);
      });
  }
}
