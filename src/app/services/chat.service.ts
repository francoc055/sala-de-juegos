import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { }


  cargarMensaje(chatMessage: ChatMessage){
    const ref = collection(this.firestore, 'chat-messages');
    return addDoc(ref, chatMessage)
  }

  getMensajes(): Observable<ChatMessage[]>{
    const ref = collection(this.firestore, 'chat-messages');
    return collectionData(ref, {idField: 'id'}) as Observable<ChatMessage[]>;
  }

}
