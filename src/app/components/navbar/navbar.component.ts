import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() usuario: any;
  
  constructor(private usersService: UsersService){}

  cerrarSesion(){
    this.usersService.logOut();
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }
}
