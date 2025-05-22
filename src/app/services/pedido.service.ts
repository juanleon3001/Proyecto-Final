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
  private baseUrl = environment.apiUrl + 'pedido/';      

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<PedidoGet[]> {
    return this.http.get<PedidoGet[]>(this.baseUrl);
  }

  getPedidosById(id: number): Observable<PedidoGet> {
    return this.http.get<PedidoGet>(`${this.baseUrl}${id}`);
  }

  getPedidosByCliente(idCliente: number): Observable<PedidoGet[]> {
    return this.http.get<PedidoGet[]>(`${this.baseUrl}cliente/${idCliente}`);
  }

  postPedido(pedido: PedidoPost): Observable<PedidoGet> {
    return this.http.post<PedidoGet>(this.baseUrl, pedido);
  }

  putPedido(pedido: PedidoPost): Observable<PedidoGet> {
    return this.http.put<PedidoGet>(`${this.baseUrl}${pedido.id}`, pedido);
  }

  deletePedido(id: number): Observable<PedidoGet> {
    return this.http.delete<PedidoGet>(`${this.baseUrl}${id}`);
  }
}