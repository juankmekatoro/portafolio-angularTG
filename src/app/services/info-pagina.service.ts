import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    // console.log('Servicio de infoPagina Listo!');
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe((data: InfoPagina) => {
        this.cargada = true;
        this.info = data;
      });
  }
  private cargarEquipo() {
    this.http.get('https://angular-plantillahtml.firebaseio.com/equipo.json')
      .subscribe((datos: any[]) => {
        this.cargada = true;
        this.equipo = datos;
      });
  }

}
