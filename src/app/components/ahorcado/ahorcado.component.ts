import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit{
  letra: string = '';
  palabra: string = 'angular';
  palabraDibujada: string[] = [];
  intentos: any = 6;
  letrasIntentadas: string = '';
  palabraArray: string[] = [];
  indiceLetra: any = 0;
  teclado: string[]= ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  pressedLetters: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dibujarPalabra();
  }

  intentarLetra(letra: any): void {
    this.palabraArray = this.palabra.split("");
    if (letra && this.palabraArray.includes(letra)) {
      this.agregarLetra(letra);
    }
    else{
      this.intentos--;
    }
  }

  dibujarPalabra(){
    for(let i = 0; i < this.palabra.length; i++){
      this.palabraDibujada.push('_ ');
    }
  }

  getPalabraDibujada(): string {
    return this.palabraDibujada.toString().replace(/,/g, '')
  }

  agregarLetra(letra: any){
    for(let i = 0; i < this.palabraArray.length; i++){
      if(this.palabraArray[i] == letra){
        this.palabraDibujada[i] = letra;
      }
    }
  }

  reiniciarJuego(): void {
    this.palabraDibujada = [];
    this.dibujarPalabra();
    this.intentos = 6;
    this.pressedLetters.length = 0;
  }


  presionarLetra(letra: any){
    if (!this.pressedLetters.includes(letra)) {
      this.pressedLetters.push(letra);
      this.intentarLetra(letra);
    }
  }
}
