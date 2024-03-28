import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Pusher from 'pusher-js';

interface MessageData {
  username: string;
  message: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Chat';
}