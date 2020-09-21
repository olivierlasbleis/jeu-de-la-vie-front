import { Injectable } from '@angular/core';
import Case from '../models/Case';
import Index from '../models/Index';
import TableauPost from '../models/TableauPost';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JeuDeLaVieService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public  http : HttpClient) { }
  test(){
    return this.http.get<string>(`${environment.backendUrl}/jeu`)
  }
  getNextSituation(listeCases: Case[][]) {
    return this.http.post<Case[][]>(`${environment.backendUrl}/jeu`, listeCases, this.httpOptions);

  }

  getNextSituationIndex(tableauPost: TableauPost) {
    return this.http.post<Index[]>(`${environment.backendUrl}/jeu/index`, tableauPost, this.httpOptions);

  }

  
}
