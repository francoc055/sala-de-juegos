import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { collection, addDoc, serverTimestamp, Firestore} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: Usuario = new Usuario();

  constructor(private userService: UsersService){ }

  onSubmit(){
    this.userService.login(this.usuario);
    this.userService.sendData(this.usuario.email);
  }

  completarCampos(){
    this.usuario.email = 'franco@gmail.com';
    this.usuario.password = 'franco123';
  }
}
