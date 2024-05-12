import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { MayorMenorService } from '../../services/mayor-menor.service';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {

  puntos: any = 0;
  mostrarPuntos: boolean = false;
  cartas: any[] = [];
  path: string = '';
  id_new: any;
  indice: any = this.numeroRandom(0, 51);
  intentos: any = 3;


  constructor(private mnService: MayorMenorService){}

  nextCard(){
    this.indice = this.numeroRandom(0, 51);
    this.path = this.cartas[this.indice].image;
    switch(this.cartas[this.indice].value){
      case 'KING':
      case 'QUEEN':
      case 'JACK':
        return 10;
      break;
      case 'ACE':
        return 11;
      break;
      default:
        return this.cartas[this.indice].value;
    }
  }

  mayor(){
    const numero =  this.cartas[this.indice].value;
    const nextNumber = this.nextCard();
    console.log(nextNumber);
    if(numero > nextNumber){
      this.puntos++;
      alert('acertaste!');
    }
    else
    {
      this.intentos--;
    }
  }

  menor(){
    const numero =  this.cartas[this.indice].value;
    console.log(numero);
    const nextNumber = this.nextCard();
    console.log(nextNumber);
    if(numero < nextNumber){
      this.puntos++;
      alert('acertaste!');
    }
    else
    {
      this.intentos--;
    }
  }


  numeroRandom(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {

    this.mnService.newMazo()
    .subscribe((response: any) => {
      this.id_new = response.deck_id;
    });

    setTimeout(() => {
      this.mnService.getCartas(this.id_new)
      .subscribe((response: any) => {
        this.cartas = response.cards;
        console.log(this.cartas);
        // console.log(this.indice);
        this.path = this.cartas[this.indice].image;
      });
    }, 1000);

  }

  reiniciarJuego(){
    this.puntos = 0;
    this.intentos = 3;
    this.nextCard();
  }

}
