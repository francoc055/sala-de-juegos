import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  receivedData: any;
  private dataSubscription!: Subscription;

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
        localStorage.setItem('email', JSON.stringify(this.receivedData));
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
