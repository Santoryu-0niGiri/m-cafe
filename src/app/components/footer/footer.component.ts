import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year = new Date().getFullYear();

  links = [
    { label: 'Home',       path: '/' },
    { label: 'About',      path: '/about' },
    { label: 'Menu',       path: '/menu' },
    { label: 'Gallery',    path: '/gallery' },
    { label: 'Promotions', path: '/promotions' },
    { label: 'Contact',    path: '/contact' },
  ];
}
