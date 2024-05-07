import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {
  mostrar: boolean = false;
  numeroComparable: any;
  numeroCarta: Number = 1;
  cartas: any= [1,2,3,4,5,6,7,8,9,10,11,12,
                1,2,3,4,5,6,7,8,9,10,11,12,
                1,2,3,4,5,6,7,8,9,10,11,12,
                1,2,3,4,5,6,7,8,9,10,11,12]
  repeticionNumeros: number[] = [];
  puntos: any = 0;
  mostrarPuntos: boolean = false;
  preguntas: string[] = ['Es mayor?', 'Es menor?'];
  randomNum: any;
  nextCarta: any;

  mostrarCartaFrontal() {
      const indiceRand = this.numeroRandom(0, this.cartas.length - 1);
      this.numeroCarta = this.cartas[indiceRand];
      this.randomNum = this.numeroRandom(0, 1)
  }

  generarNextCarta(){
    if(this.cartas.length > 44){
      const indiceRand = this.numeroRandom(0, this.cartas.length - 1);
      this.nextCarta = this.cartas[indiceRand];
      this.cartas.splice(indiceRand, 1);
    }
    else{
      this.mostrarPuntos = true;
      console.log('Puntos ganados', this.puntos)
    }
  }

  respuestafirmativa(){
      this.generarNextCarta();
      if(this.randomNum === 0 && this.numeroCarta > this.nextCarta){
        this.puntos++;
      }
      else if(this.randomNum === 1 && this.numeroCarta < this.nextCarta){
        this.puntos++;
      }
    this.numeroCarta = this.nextCarta;
    this.randomNum = this.numeroRandom(0, 1)


  } 

  respuestaNegativa(){
    this.generarNextCarta();
      if(this.randomNum === 0 && this.numeroCarta < this.nextCarta){
        this.puntos++;
      }
      else if(this.randomNum === 1 && this.numeroCarta > this.nextCarta){
        this.puntos++;
      }
    this.numeroCarta = this.nextCarta;
    this.randomNum = this.numeroRandom(0, 1)


    
  }

  mayor(): boolean{
    if(this.numeroComparable < this.numeroCarta){
      return true;
    }
    return false
  }

  menor(): boolean{
    if(this.numeroComparable > this.numeroCarta){
      return true;
    }
    return false;
  }


  numeroRandom(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {
    // this.randomNum = this.numeroRandom(0, 1)
    this.mostrarCartaFrontal();
    // this.numeroComparable = this.numeroCarta;
  }

  reiniciarJuego(){
    this.puntos = 0;
    this.mostrarPuntos = false;
    this.cartas = [1,2,3,4,5,6,7,8,9,10,11,12,
                  1,2,3,4,5,6,7,8,9,10,11,12,
                  1,2,3,4,5,6,7,8,9,10,11,12,
                  1,2,3,4,5,6,7,8,9,10,11,12];

    this.mostrarCartaFrontal();
  }

}
