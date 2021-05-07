import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta';
import { Cds } from '../models/cds';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})


export class ApiCdsService {
    url: string = environment.baseUrl
    constructor(private _http: HttpClient) { }
  
    GetCds():Observable<Respuesta>{
      return this._http.get<Respuesta>(this.url + 'Cds')
    }
  
    addCds(cds: Cds):Observable<Respuesta>{
      return this._http.post<Respuesta>(this.url + 'Cds', cds, httpOption)
    }
    updateCds(cds: Cds):Observable<Respuesta>{
      return this._http.put<Respuesta>(this.url + 'Cds', cds, httpOption)
    }
    desactivarCds(id: any):Observable<Respuesta>{
      return this._http.delete<Respuesta>(this.url + 'Cds/' + id)
    }
  
  }