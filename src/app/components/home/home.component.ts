import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  receivedData: any;
  private dataSubscription!: Subscription;
  sub!: Subscription;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.dataSubscription = this.usersService.data$.subscribe(data => {
      this.receivedData = data;
      if(this.receivedData === null)
      {
        const storedData = localStorage.getItem('email');
        if (storedData) {
          this.receivedData = JSON.parse(storedData);
        }
      }
      else{
        localStorage.setItem('email', this.receivedData);
      }
    });
}

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }


}
