import { Component, signal, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface GalleryImage {
  id: number;
  src: string;
  thumb: string;
  alt: string;
  span?: 'tall' | 'wide' | 'normal';
}

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);

  images: GalleryImage[] = [
    { id: 1,  alt: 'Latte Art',           span: 'tall',   src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=70' },
    { id: 2,  alt: 'Café Interior',        span: 'normal', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop&q=70' },
    { id: 3,  alt: 'Espresso Shot',        span: 'normal', src: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop&q=70' },
    { id: 4,  alt: 'Avocado Toast',        span: 'wide',   src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=1200&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&auto=format&fit=crop&q=70' },
    { id: 5,  alt: 'Cold Brew',            span: 'normal', src: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=400&auto=format&fit=crop&q=70' },
    { id: 6,  alt: 'Tiramisu',             span: 'normal', src: 'https://images.unsplash.com/photo-1542124292-7c1a6d00cd15?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1542124292-7c1a6d00cd15?w=400&auto=format&fit=crop&q=70' },
    { id: 7,  alt: 'Café Atmosphere',      span: 'tall',   src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&auto=format&fit=crop&q=70' },
    { id: 8,  alt: 'Matcha Latte',         span: 'normal', src: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&auto=format&fit=crop&q=70' },
    { id: 9,  alt: 'Barista at work',      span: 'wide',   src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=70' },
    { id: 10, alt: 'Waffles',              span: 'normal', src: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&auto=format&fit=crop&q=70' },
    { id: 11, alt: 'Coffee Beans',         span: 'normal', src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&auto=format&fit=crop&q=70' },
    { id: 12, alt: 'Cheesecake',           span: 'normal', src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=70' },
  ];

  lightboxImage = signal<GalleryImage | null>(null);
  lightboxIndex = signal(0);

  openLightbox(img: GalleryImage): void {
    this.lightboxIndex.set(this.images.findIndex(i => i.id === img.id));
    this.lightboxImage.set(img);
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
  }

  prev(): void {
    const i = (this.lightboxIndex() - 1 + this.images.length) % this.images.length;
    this.lightboxIndex.set(i);
    this.lightboxImage.set(this.images[i]);
  }

  next(): void {
    const i = (this.lightboxIndex() + 1) % this.images.length;
    this.lightboxIndex.set(i);
    this.lightboxImage.set(this.images[i]);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const els = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        }),
        { threshold: 0.1 }
      );
      els.forEach(el => observer.observe(el));
    }
  }
}
