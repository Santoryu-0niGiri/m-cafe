import { Component, AfterViewInit, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);

  stats = [
    { label: 'Years of Excellence', target: 5,    suffix: '+', current: signal(0) },
    { label: 'Happy Customers',     target: 12000, suffix: '+', current: signal(0) },
    { label: 'Cups Served Daily',   target: 300,   suffix: '+', current: signal(0) },
    { label: 'Menu Items',          target: 50,    suffix: '+', current: signal(0) },
  ];

  values = [
    { icon: 'bi-heart-fill',       title: 'Passion',    desc: 'We pour our heart into every cup, every dish, every interaction.' },
    { icon: 'bi-gem',              title: 'Quality',    desc: 'Only the finest ingredients make it to our menu — no compromises.' },
    { icon: 'bi-people-fill',      title: 'Community',  desc: 'M CAFE is a gathering place that brings people and stories together.' },
    { icon: 'bi-leaf-fill',        title: 'Sustainability', desc: 'We source responsibly and care deeply about our environmental impact.' },
    { icon: 'bi-lightbulb-fill',   title: 'Innovation', desc: 'We continuously evolve our menu while honouring classic techniques.' },
    { icon: 'bi-star-fill',        title: 'Excellence', desc: 'Every detail matters — from the grind size to the garnish on your plate.' },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._initReveal();
      this._initStats();
    }
  }

  private _initReveal(): void {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    els.forEach(el => observer.observe(el));
  }

  private _initStats(): void {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.stats.forEach(stat => this._animateCount(stat));
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  private _animateCount(stat: { target: number; current: ReturnType<typeof signal<number>> }): void {
    const duration = 2000;
    const steps = 60;
    const increment = stat.target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, stat.target);
      stat.current.set(Math.floor(current));
      if (current >= stat.target) clearInterval(timer);
    }, duration / steps);
  }
}
