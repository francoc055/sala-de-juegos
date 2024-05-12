import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MayorMenorService {
  id_new: any;
  private http = inject(HttpClient);
  constructor() { }

  newMazo(){
    return this.http.get<any[]>('https://www.deckofcardsapi.com/api/deck/new/');
  }

  getCartas(id: any){ 
    return  this.http.get<any[]>(`https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=52`);
  }

}
