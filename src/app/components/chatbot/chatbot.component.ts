import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  errorOccurred: boolean = false;
  formattedResponse: SafeHtml = '';
  customErrorMessage: string | null = null;
  userImagePath = 'assets/images/Jim.png';
  botImagePath = 'assets/images/botImage.png';

  private chatService = inject(ChatbotService);
  public displayChat: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
    this.createChatSession();
  }

  ngOnInit() {
    this.messages.push({ text: "Bienvenido, como te puedo ayudar el dia de hoy?", user: false });
  }

  private createChatSession(): void {
    this.chatService.createChatSession()
      .subscribe({
        next: (response) => {
          if (response.thread_id) {
            localStorage.setItem('chat-thread', response.thread_id);
          }
        }
      });
  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  private scrollToBottom(): void {
      try {
          const element = this.messagesContainer.nativeElement;
          element.scrollTop = element.scrollHeight;
      } catch (err) { /* Error handling is ignored for simplicity. */ }
  }

  autoGrow(event: any): void {
      const textArea = event.target;
      textArea.style.height = 'auto'; 
      textArea.style.height = textArea.scrollHeight + 'px'; 
  }

  public sendMessage(): void {
    if (this.userInput.trim() === '') return;
    this.messages.push({ text: this.userInput, user: true });
    const userMessage = this.userInput;

    this.isLoading = true;
    this.errorOccurred = false;
    this.customErrorMessage = '';

    this.chatService.sendMessageToChatbot(userMessage)
      .subscribe({
        next: (apiResponse) => {
          // const botResponse = apiResponse.choices[0].message.content.trim();
          this.messages.push({ text: apiResponse.response.message, user: false });
          this.userInput = '';
          this.isLoading = false;
        },
        error: _ => {
          this.handleError("Estoy experimentando dificultades tecnicas. Porfavor intente luego.");
          this.userInput = '';
          this.isLoading = false;
        }
      });
    
  }

  handleError(errorMessage: string): void {
    this.customErrorMessage = errorMessage;
    this.errorOccurred = true; // Set error flag to true
  }

  formatCodeBlock(code: string): SafeHtml {
    const formattedCode = this.sanitizer.bypassSecurityTrustHtml(`<pre><code>${code}</code></pre>`);
    return formattedCode;
  }

  toogleChat(): void {
    this.displayChat = !this.displayChat;
  }

}
