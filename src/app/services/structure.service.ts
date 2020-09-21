import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Structure from '../models/Structure';
import Index from '../models/Index';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public  http : HttpClient) { }
  
  getStructures(typeStructure : string){
    return this.http.get<Structure[]>(`${environment.backendUrl}/structure/${typeStructure}`)
  }

  getAllTypeStructure(){
    return this.http.get<string[]>(`${environment.backendUrl}/structure/allType`)
  }

  postStructures(structure : Structure){
    return this.http.post<Structure>(`${environment.backendUrl}/structure/new`, structure, this.httpOptions);
  }
}
