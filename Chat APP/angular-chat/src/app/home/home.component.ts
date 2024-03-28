import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Pusher from 'pusher-js';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from '../emitters/emitters';
interface MessageData {
  username: string;
  message: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = 'username';
  message = '';
  messages: MessageData[] = [];
  

  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `salut`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || '';
      console.log('Username:', this.username);
    });

    Pusher.logToConsole = true;

    const pusher = new Pusher('d6e50b21aa7afae770df', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: MessageData) => { // Spécification du type de 'data'
      this.messages.push(data);
    });
  }

  submit(): void {
    console.log('Submitting message:', this.messages); // This should log the message you expect

    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }
  messageChanged(event: Event): void {
    const target = event.target as HTMLInputElement | null; // Cast to HTMLInputElement and allow for null
    if (target) {
      this.message = target.value; // Now you can safely access the value property
    }
  }
}