import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private http: HttpClient) { }

  getPreguntas(){
    return this.http.get<any[]>('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy');
  }
}
