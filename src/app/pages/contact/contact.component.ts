import { Component, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);

  messengerUrl = 'https://m.me/61580168354219';
  facebookUrl  = 'https://www.facebook.com/61580168354219';

  contactCards = [
    {
      icon: 'bi-geo-alt-fill',
      title: 'Location',
      lines: ['123 Café Street, Brewed District', 'Metro City, Philippines'],
    },
    {
      icon: 'bi-clock-fill',
      title: 'Business Hours',
      lines: ['Monday – Sunday', '7:00 AM – 10:00 PM'],
    },
    {
      icon: 'bi-telephone-fill',
      title: 'Phone',
      lines: ['+63 912 345 6789', 'Call or text anytime'],
    },
    {
      icon: 'bi-envelope-fill',
      title: 'Email',
      lines: ['hello@mcafe.ph', 'We reply within 24 hours'],
    },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const els = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        }),
        { threshold: 0.12 }
      );
      els.forEach(el => observer.observe(el));
    }
  }
}
