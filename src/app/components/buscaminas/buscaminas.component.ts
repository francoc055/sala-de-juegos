import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-buscaminas',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './buscaminas.component.html',
  styleUrl: './buscaminas.component.css'
})
export class BuscaminasComponent implements OnInit {
  tablero!: { mostrar: string, mina: boolean }[][];

  constructor() { }

  ngOnInit(): void {
    this.inicializarJuego();
  }

  inicializarJuego(): void {
    const filas = 5;
    const columnas = 5;
    const minas = 5;
    this.tablero = Array(filas).fill(0).map(() =>
      Array(columnas).fill(0).map(() => ({ mostrar: '', mina: false }))
    );

    let minasColocadas = 0;
    while (minasColocadas < minas) {
      const fila = Math.floor(Math.random() * filas);
      const columna = Math.floor(Math.random() * columnas);
      if (!this.tablero[fila][columna].mina) {
        this.tablero[fila][columna].mina = true;
        minasColocadas++;
      }
    }
  }

  destaparCasilla(fila: number, columna: number): void {
    const casilla = this.tablero[fila][columna];
    if (casilla.mina) {
      casilla.mostrar = 'X'; 
      Swal.fire({
        text: "Perdiste, habia una mina!",
        icon: "error"
      });
      setTimeout(() => {
        this.inicializarJuego();
      }, 1000);
    } else {
      const minasCercanas = this.contarMinasCercanas(fila, columna);
      casilla.mostrar = minasCercanas.toString();
      if (this.haGanado()) {
        Swal.fire({
          text: "¡Ganaste!",
          icon: "success"
        });
        setTimeout(() => {
          this.inicializarJuego();
        }, 1000);
      }

    }
  }

  contarMinasCercanas(fila: number, columna: number): number {
    let count = 0;
    for (let i = Math.max(0, fila - 1); i <= Math.min(fila + 1, this.tablero.length - 1); i++) {
      for (let j = Math.max(0, columna - 1); j <= Math.min(columna + 1, this.tablero[0].length - 1); j++) {
        if (this.tablero[i][j].mina) {
          count++;
        }
      }
    }
    return count;
  }

  haGanado(): boolean {
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < this.tablero[i].length; j++) {
        const casilla = this.tablero[i][j];
        if (!casilla.mina && casilla.mostrar === '') {
          return false;
        }
      }
    }
    return true;
  }
}
