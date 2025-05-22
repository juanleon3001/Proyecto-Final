import { Injectable  } from "@angular/core";
import { Producto } from "../models/producto.models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductoService{
    private apiUrl: string = environment.apiUrl + 'producto/'

  constructor(private http: HttpClient) { }

getProducto(): Observable<Producto[]>{
  return this.http.get<Producto[]>(this.apiUrl);
}

postProducto(producto: Producto): Observable<Producto>{
  return this.http.post<Producto>(this.apiUrl, producto);
}

putProducto(producto: Producto): Observable<Producto>{
  return this.http.put<Producto>(this.apiUrl + producto.id, producto);
}

deleteProducto(idProducto: number): Observable<Producto>{
  return this.http.delete<Producto>(`${this.apiUrl}${idProducto}`);
}
}
