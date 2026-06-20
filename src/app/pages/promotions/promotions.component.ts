import { Component, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Promotion {
  id: number;
  title: string;
  description: string;
  details: string;
  validFrom: string;
  validUntil: string;
  image: string;
  badge?: string;
  limited?: boolean;
}

@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);

  promotions: Promotion[] = [
    {
      id: 1,
      title: 'Buy 1 Get 1 Free Coffee',
      description: 'Enjoy any two handcrafted coffees for the price of one every Tuesday morning.',
      details: 'Valid on all drip and espresso-based drinks. Dine-in only.',
      validFrom: 'June 1, 2025',
      validUntil: 'August 31, 2025',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop&q=80',
      badge: 'Limited Offer',
      limited: true,
    },
    {
      id: 2,
      title: 'Weekend Brunch Bundle',
      description: 'Get a full brunch set — a meal, a drink, and a dessert at a specially bundled price.',
      details: 'Available every Saturday & Sunday, 8:00 AM – 12:00 NN.',
      validFrom: 'Every Weekend',
      validUntil: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&auto=format&fit=crop&q=80',
      badge: 'Weekend Deal',
    },
    {
      id: 3,
      title: 'Student Discount — 15% Off',
      description: 'Present a valid student ID and enjoy 15% off your entire order, any day of the week.',
      details: 'Valid with any school ID. Cannot be combined with other promos.',
      validFrom: 'June 1, 2025',
      validUntil: 'December 31, 2025',
      image: 'https://images.unsplash.com/photo-1522327646852-4e28586a40dd?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      title: 'Birthday Free Drink',
      description: 'Celebrate your special day with a complimentary drink of your choice, on us!',
      details: 'Show a valid ID on your birthday. One drink per person.',
      validFrom: 'Your Birthday!',
      validUntil: 'All year round',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
      badge: 'Special Treat',
    },
    {
      id: 5,
      title: 'Loyalty Rewards — 10th Drink Free',
      description: `Collect stamps with every purchase. On your 10th drink, it's completely free.`,
      details: 'Ask our staff for a loyalty card on your first visit.',
      validFrom: 'Ongoing',
      validUntil: 'No expiry',
      image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      title: 'Happy Hour — 20% Off',
      description: 'Beat the afternoon slump with 20% off all beverages every weekday from 2–4 PM.',
      details: 'Valid Mon–Fri, 2:00 PM – 4:00 PM. Dine-in and takeout.',
      validFrom: 'Monday – Friday',
      validUntil: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&auto=format&fit=crop&q=80',
      badge: 'Daily Offer',
      limited: true,
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
