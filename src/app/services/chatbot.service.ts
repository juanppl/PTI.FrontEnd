import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InterceptorSkipHeader } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  public sendMessageToChatbot(message: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.chatGptKey}`,
    }).set(InterceptorSkipHeader, '');;

    const body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    return this.http.post<ApiResponse>(this.apiUrl, body, {headers});
  }

}

export interface ApiResponse {
  id: string;
  object: string;
  created: string;
  model: string;
  choices: Array<Choices>;
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

