import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/ChatMessage';
import { UsersService } from '../../services/users.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  chatMessages: any[] = [];
  message!: string;
  userId: any;
  user: any;
  constructor(private chatService: ChatService, private userService: UsersService) { }

  ngOnInit(): void {

    this.chatService.getMensajes().subscribe(chat => {
      this.chatMessages = chat;
      this.formatDates();
      this.chatMessages.sort((a, b) => {
        const timeA = a.created_at;
        const timeB = b.created_at;
        return timeA.localeCompare(timeB);
      });
      setTimeout(() => {
        this.scroll();
      }, 0);


      
    })

    this.userService.getUserId().subscribe(id => {
      this.userId = id;
      if(id){
        localStorage.setItem('userId', id);
      }
      else{
        this.userId = localStorage.getItem('userId');
      }
    })

    this.userService.data$.subscribe(data => {
      this.user = data;
      if(data == null)
      {
          this.user = localStorage.getItem('email');
      }
    });
  }



  sendMessage(){
    if(!this.message){
      return
    }
    const message: ChatMessage = {
      message: this.message,
      created_at: new Date(),
      userId: this.userId,
      email: this.user
    }
    this.chatService.cargarMensaje(message);
    this.message = '';
    // this.scroll();

  }

  formatDates(){
    this.chatMessages =  this.chatMessages.map(chat => {
      const fecha = chat.created_at.toDate();
      const horaMinutos = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second:'2-digit'});
      return {
        ...chat,
        created_at: horaMinutos,
      };
    });
  }

  scroll(): void {
    const container = document.getElementById('conteinerMessages');
    if(container){
      container.scrollTop = container.scrollHeight;
    }
  }



}
