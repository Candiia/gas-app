import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GasListResponse } from '../models/gas-app.interface';

@Injectable({
  providedIn: 'root'
})
export class GasAppService {

  constructor(private http: HttpClient) {}

  getGasList(): Observable<GasListResponse> {
    return this.http.get<GasListResponse>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
  }
}
