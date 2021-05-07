import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta';
import { Clientes } from '../models/clientes';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {
  url: string = environment.baseUrl
  constructor(private _http: HttpClient) { }

  GetCliente():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url + 'Clientes')
  }

  addCliente(clientes: Clientes):Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url + 'Clientes', clientes, httpOption)
  }
  updateCliente(clientes: Clientes):Observable<Respuesta>{
    return this._http.put<Respuesta>(this.url + 'Clientes', clientes, httpOption)
  }
  desactivarCliente(id: any):Observable<Respuesta>{
    return this._http.delete<Respuesta>(this.url + 'Clientes/' + id)
  }

}

///CDS
