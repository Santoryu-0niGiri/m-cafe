import {
  Component, inject, signal, ViewChild, ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesEl!: ElementRef<HTMLDivElement>;

  chat = inject(ChatService);
  isOpen = signal(false);
  inputText = signal('');
  private shouldScroll = false;

  toggle(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen()) this.shouldScroll = true;
  }

  send(text?: string): void {
    const msg = (text ?? this.inputText()).trim();
    if (!msg) return;
    this.chat.sendMessage(msg);
    this.inputText.set('');
    this.shouldScroll = true;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.messagesEl) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    const el = this.messagesEl?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
