import { Injectable  } from "@angular/core";
import { Cliente } from "../models/cliente.models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    private apiUrl: string = environment.apiUrl + 'cliente/'

  constructor(private http: HttpClient) { }

getCliente(): Observable<Cliente[]>{
  return this.http.get<Cliente[]>(this.apiUrl);
}

postCliente(cliente: Cliente): Observable<Cliente>{
  return this.http.post<Cliente>(this.apiUrl, cliente);
}

putCliente(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(this.apiUrl + cliente.id_cliente, cliente);
}

deleteCliente(idCliente: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.apiUrl}${idCliente}`);
}
}
