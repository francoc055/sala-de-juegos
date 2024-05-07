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
  letras: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  indiceLetra: any = 0;

  constructor() { }

  ngOnInit(): void {
    this.dibujarPalabra();
  }

  intentarLetra(): void {
    this.palabraArray = this.palabra.split("");
    if (this.letras[this.indiceLetra] && this.palabraArray.includes(this.letras[this.indiceLetra])) {
      this.agregarLetra();
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

  agregarLetra(){
    for(let i = 0; i < this.palabraArray.length; i++){
      if(this.palabraArray[i] == this.letras[this.indiceLetra]){
        this.palabraDibujada[i] = this.letras[this.indiceLetra];
      }
    }
  }

  reiniciarJuego(): void {
    this.palabraDibujada = [];
    this.dibujarPalabra();
    this.intentos = 6;
  }

  letraUp(){
    if(this.indiceLetra == this.letras.length - 1){
      this.indiceLetra = 0;
      return
    }
    this.indiceLetra++;
  }

  letraDown(){
    if(this.indiceLetra == 0){
      this.indiceLetra = this.letras.length - 1;
      return
    }
    this.indiceLetra--;
  }
}
