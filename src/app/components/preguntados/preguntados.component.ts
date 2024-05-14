import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit, OnDestroy{
  @ViewChild('form') form!: NgForm;
  preguntas: any[] = [];
  seleccion: any;
  indice: any = this.numeroRandom(0, this.preguntas.length -1);
 
  tiempoInicial: number = 10;
  tiempoRestante: number = this.tiempoInicial;
  intervalo: any;

  puntos: number = 0;
  mostrarPuntos: boolean = false;


  constructor(private preguntadosService: PreguntadosService){}

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.preguntadosService.getPreguntas()
    .subscribe((res: any) =>{
      this.preguntas = res.results;
    })

    this.intervalo = setInterval(() => {
      this.actualizarContador();
      if(this.tiempoRestante == 0){
        Swal.fire({
          text: "Se termino el tiempo!",
          icon: "error"
        });
        this.nextQuestion();
      }
      
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  onChange(){
    if(this.seleccion == this.preguntas[this.indice].correct_answer){
      Swal.fire({
        text: "Correcto!",
        icon: "success"
      });
      this.puntos++;
    }else{
      Swal.fire({
        text: "Fallaste!",
        icon: "error"
      });
    }
    this.form.reset();
    
    this.nextQuestion();
  }

  nextQuestion(){
    this.preguntas = this.preguntas.filter(p => p.question !== this.preguntas[this.indice].question)
    console.log(this.preguntas);
    if(this.preguntas.length == 0){
      this.mostrarPuntos = true;
      clearInterval(this.intervalo);
      return;
    }
    const indiceAnterior = this.indice;
    const newIndice = this.numeroRandom(0, this.preguntas.length - 1);
    this.indice = newIndice;
    this.tiempoRestante = 10;
  }

  numeroRandom(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  actualizarContador(): void {
    this.tiempoRestante--;
    if (this.tiempoRestante === 0) {
      clearInterval(this.intervalo);
    }
  }

  reiniciarJuego(){
    this.mostrarPuntos = false;
    this.puntos = 0;
    this.tiempoRestante = this.tiempoInicial;
    this.inicializar();
  }
}
