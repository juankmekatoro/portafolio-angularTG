import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private getQuery(query: string) {
    const url = `https://angular-plantillahtml.firebaseio.com/${query}`;
    return this.http.get(url);
  }

  private cargarProductos() {
    this.http.get('https://angular-plantillahtml.firebaseio.com/productos_idx.json')
      .subscribe((datos: Producto[]) => {
        this.cargando = false;
        console.log(datos);
        this.productos = datos;
      });

  }

  private cargarProductos2() {
    return this.getQuery('productos_idx.json')
      .subscribe((datos: Producto[]) => {
        this.cargando = false;
        this.productos = datos;
      });
  }

}
