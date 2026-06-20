import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuDataService } from '../../services/menu-data.service';
import { MenuCategory } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu',
  imports: [FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menuData = inject(MenuDataService);

  categories: MenuCategory[] = ['All', 'Coffee', 'Non-Coffee', 'Tea', 'Meals', 'Desserts'];
  activeCategory = signal<MenuCategory>('All');
  searchQuery = signal('');

  filteredItems = computed(() => {
    const cat = this.activeCategory();
    const q = this.searchQuery().toLowerCase().trim();

    return this.menuData.items.filter(item => {
      const matchCat = cat === 'All' || item.category === cat;
      const matchSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  });

  setCategory(cat: MenuCategory): void {
    this.activeCategory.set(cat);
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
