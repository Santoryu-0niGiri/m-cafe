import { Component, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MenuDataService } from '../../services/menu-data.service';

const MESSENGER = 'https://m.me/61580168354219';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  menuData = inject(MenuDataService);
  platformId = inject(PLATFORM_ID);
  messengerUrl = MESSENGER;

  featured = this.menuData.featured;

  features = [
    { icon: 'bi-award-fill',       title: 'Premium Coffee',    desc: `Sourced from the world's finest single-origin farms, roasted to perfection in small batches.` },
    { icon: 'bi-flower1',          title: 'Fresh Ingredients', desc: 'Every ingredient is locally sourced and freshly prepared daily. No shortcuts, ever.' },
    { icon: 'bi-house-heart-fill', title: 'Cozy Ambiance',     desc: 'A warm, inviting space designed to help you unwind, work, or connect over great coffee.' },
    { icon: 'bi-people-fill',      title: 'Friendly Staff',    desc: 'Our passionate baristas are here to make every visit memorable and every cup exceptional.' },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._initReveal();
    }
  }

  private _initReveal(): void {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    els.forEach(el => observer.observe(el));
  }
}
