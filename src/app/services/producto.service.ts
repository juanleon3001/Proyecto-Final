import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environment/environment";
import { ProductoGet } from "../models/productoGet.models";
import { ProductoPost } from "../models/productoPost.models";




@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private postUrl = environment.apiUrl + 'producto/';      // POST, PUT, DELETE
  private getUrl = environment.apiUrl + 'producto/get';   // GET (all and by ID)

  constructor(private http: HttpClient) {}

  getProducto(): Observable<ProductoGet[]> {
    return this.http.get<ProductoGet[]>(this.getUrl);
  }

  getProductoById(id: number): Observable<ProductoGet> {
    return this.http.get<ProductoGet>(`${this.getUrl}${id}`);
  }

  postProducto(producto: ProductoPost): Observable<ProductoGet> {
    return this.http.post<ProductoGet>(this.postUrl, producto);
  }

  putProducto(producto: ProductoPost): Observable<ProductoGet> {
    return this.http.put<ProductoGet>(`${this.postUrl}${producto.id_producto}`, producto);
  }

  deleteProducto(id: number): Observable<ProductoGet> {
    return this.http.delete<ProductoGet>(`${this.postUrl}${id}`);
  }
}
