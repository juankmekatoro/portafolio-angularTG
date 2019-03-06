import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../interfaces/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  buscarProducto: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos2();
  }

  private getQuery(query: string) {
    const url = `https://angular-plantillahtml.firebaseio.com/${query}`;
    return this.http.get(url);
  }

  // private cargarProductos() {
  //   this.http.get('https://angular-plantillahtml.firebaseio.com/productos_idx.json')
  //     .subscribe((datos: Producto[]) => {
  //       this.cargando = false;
  //       console.log(datos);
  //       this.productos = datos;
  //     });
  // }

  private cargarProductos2() {
    return new Promise( ( resolve, reject ) => {

      return this.getQuery('productos_idx.json')
        .subscribe((datos: Producto[]) => {
          this.cargando = false;
          this.productos = datos;
          resolve();
        });

    });
  }

  getProducto(id: string) {
    return this.getQuery(`productos/${id}.json`);
  }

  buscarProductos(termino: string) {
    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos2().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtarProductos( termino );
      });
    } else {
      // Aplicar filtro
      this.filtarProductos( termino );
    }
  }

  private filtarProductos( termino: string ) {
    this.buscarProducto = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.buscarProducto.push( prod );
      }
    });
  }

}
