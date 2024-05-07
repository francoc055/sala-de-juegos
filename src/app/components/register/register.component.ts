import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario: Usuario = new Usuario();


  constructor(private usersService: UsersService, private toaster: ToastrService){}

  onSubmit() {
    this.usersService.addUser(this.usuario)
    this.usersService.sendData(this.usuario.email);
  }

}
