import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent implements OnInit{
  user!: string; 

  ngOnInit(): void {
    const storedData = localStorage.getItem('email');
    if (storedData) {
      this.user = JSON.parse(storedData);
    }
  }
}
