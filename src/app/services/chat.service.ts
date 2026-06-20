import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

const MESSENGER_URL = 'https://m.me/61580168354219';

const ORDER_TRIGGER_PHRASES = ['order', 'buy', 'purchase', 'how to get', 'can i order'];

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['hour', 'open', 'close', 'time', 'schedule'],
    answer: `M CAFE is open Monday to Sunday, 7:00 AM - 10:00 PM. We are here every day to serve your favourite brews! ☕`,
  },
  {
    keywords: ['location', 'address', 'where', 'find', 'map', 'directions'],
    answer: 'You can find us at our cafe. Check our Contact page for the exact address and Google Maps location! 📍',
  },
  {
    keywords: ['menu', 'food', 'drink', 'coffee', 'tea', 'meal', 'dessert', 'snack'],
    answer: 'We offer a wide selection of premium coffees, non-coffee drinks, teas, hearty meals, and indulgent desserts. Visit our Menu page to see the full list with prices! 🍽️',
  },
  {
    keywords: ['promo', 'promotion', 'offer', 'discount', 'deal', 'sale', 'limited'],
    answer: 'Check out our Promotions page for the latest deals and limited-time offers! We update them regularly so you never miss out. 🎉',
  },
  {
    keywords: ['price', 'cost', 'how much', 'rate', 'fee'],
    answer: 'Our drinks start at ₱95 and meals from ₱195. Full pricing is available on our Menu page. Affordable quality, every cup! 💰',
  },
  {
    keywords: ['wifi', 'wi-fi', 'internet', 'connection'],
    answer: 'Yes! M CAFE has free high-speed WiFi for all guests. Just ask our staff for the password when you visit. 📶',
  },
  {
    keywords: ['reservation', 'reserve', 'book', 'seat', 'table'],
    answer: 'We welcome walk-ins! For large groups or special occasions, please reach out via our Facebook Messenger to reserve a spot.',
  },
  {
    keywords: ['about', 'story', 'history', 'founder', 'who'],
    answer: 'M CAFE was born from a passion for quality coffee and a love for community. We craft every cup with care. Learn more on our About page! 🌿',
  },
  {
    keywords: ['contact', 'reach', 'phone', 'email', 'message', 'facebook'],
    answer: `You can reach us via our Contact page, or message us directly on Facebook Messenger. We'd love to hear from you! 💬`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: 'Hello! Welcome to M CAFE ☕ How can I help you today? Ask me about our menu, hours, location, or promotions!',
  },
];

const ORDER_RESPONSE = `Thank you for choosing M CAFE! Please click the Order Now button below to continue your order through our Facebook Messenger.`;

const FALLBACK_RESPONSE = `I'm here to help with M CAFE questions — menu, hours, location, promotions, and more. What would you like to know? ☕`;

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _messages = signal<ChatMessage[]>([
    {
      id: 0,
      role: 'bot',
      text: `Welcome to M CAFE! ☕ I'm your virtual barista. Ask me about our menu, hours, location, or promotions!`,
      timestamp: new Date(),
    },
  ]);

  private _typing = signal(false);
  private _idCounter = 1;

  readonly messages = this._messages.asReadonly();
  readonly isTyping = this._typing.asReadonly();
  readonly messengerUrl = MESSENGER_URL;

  readonly suggestedQuestions = [
    'What are your opening hours?',
    'Where are you located?',
    `What's on the menu?`,
    'Any promotions today?',
    'Do you have WiFi?',
  ];

  sendMessage(text: string): void {
    const userMsg: ChatMessage = {
      id: this._idCounter++,
      role: 'user',
      text,
      timestamp: new Date(),
    };
    this._messages.update(msgs => [...msgs, userMsg]);
    this._typing.set(true);

    setTimeout(() => {
      const answer = this._generateResponse(text);
      const botMsg: ChatMessage = {
        id: this._idCounter++,
        role: 'bot',
        text: answer,
        timestamp: new Date(),
      };
      this._messages.update(msgs => [...msgs, botMsg]);
      this._typing.set(false);
    }, 1000 + Math.random() * 500);
  }

  private _generateResponse(input: string): string {
    const lower = input.toLowerCase();

    if (ORDER_TRIGGER_PHRASES.some(p => lower.includes(p))) {
      return ORDER_RESPONSE;
    }

    for (const faq of FAQ) {
      if (faq.keywords.some(k => lower.includes(k))) {
        return faq.answer;
      }
    }

    return FALLBACK_RESPONSE;
  }

  isOrderResponse(text: string): boolean {
    return text === ORDER_RESPONSE;
  }
}
