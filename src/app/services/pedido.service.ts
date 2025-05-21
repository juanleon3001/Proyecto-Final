import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environment/environment";
import { PedidoGet } from "../models/pedidoGet.models";
import { PedidoPost } from "../models/pedidoPost.model";


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private postUrl = environment.apiUrl + 'pedido/';      
  private getUrl = environment.apiUrl + 'pedido/get';   

  constructor(private http: HttpClient) {}

  getPedido(): Observable<PedidoGet[]> {
    return this.http.get<PedidoGet[]>(this.getUrl);
  }

  getPedidoById(id: number): Observable<PedidoGet> {
    return this.http.get<PedidoGet>(`${this.getUrl}${id}`);
  }

  postPedido(pedido: PedidoPost): Observable<PedidoGet> {
    return this.http.post<PedidoGet>(this.postUrl, pedido);
  }

  putPedido(pedido: PedidoPost): Observable<PedidoGet> {
    return this.http.put<PedidoGet>(`${this.postUrl}${pedido.id_pedido}`, pedido);
  }

  deletePedido(id: number): Observable<PedidoGet> {
    return this.http.delete<PedidoGet>(`${this.postUrl}${id}`);
  }
}
