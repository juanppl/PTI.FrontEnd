import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {


  constructor(private http: HttpClient) { }

  public createChatSession(): Observable<CreatedThread> {
    const url = `${environment.api}chatbot/create-thread/`;
    return this.http.post<CreatedThread>(url, {});
  }

  public sendMessageToChatbot(message: string): Observable<ApiResponse> {
    const url = `${environment.api}chatbot/send-message-to-thread/`;
    const thread_id = localStorage.getItem('chat-thread');
    return this.http.post<ApiResponse>(url, { message, thread_id });
  }

}

export interface ApiResponse {
  id: string;
  object: string;
  created: string;
  model: string;
  choices: Array<Choices>;
  response: ChatResponse;
}

export interface ChatResponse {
  message: string;
}

export interface Choices {
  index: number;
  message: Message
}

export interface Message {
  role: string;
  content: string;
}

export interface ChatMessage {
  text: string;
  user: boolean;
}

export interface CreatedThread {
  thread_id: string;
}