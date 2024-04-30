import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, addDoc, serverTimestamp, Firestore} from '@angular/fire/firestore';
import { Usuario } from '../models/Usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) { }

  sendData(data: any): void {
    this.dataSubject.next(data);
  }
  
  addUser(usuario: Usuario){
    if (!usuario.email || !usuario.password) {
      console.log('Por favor ingrese un correo electrónico y una contraseña.');
      return;
    }

    if (usuario.password.length < 6) {
      console.log('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('El correo electrónico ya está en uso.');
        } else {
          console.log('Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo más tarde.');
        }
      });
  }

  login(usuario: Usuario){
    signInWithEmailAndPassword(this.auth, usuario.email, usuario.password)
    .then(() => {
      this.router.navigate(['/home']);
      this.addLog(usuario);
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        console.log('Correo electrónico o contraseña incorrectos.')
      } else {
        console.log('Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
      }
    });
  }

  logOut(){
    this.auth.signOut().then(() => {
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']); // Otra página a la que redirigir después de cerrar sesión
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  addLog(usuario: Usuario){
    const logData = {
      email: usuario.email,
      fecha: serverTimestamp()
    };
    const ref = collection(this.firestore, 'logs-usuarios');
    addDoc(ref, logData)
    .then(res => {
      console.log(res)
      // this.miObservable.next(usuario.email);
    })
    .catch(err => console.log(err));
  }
}
