export type MenuCategory = 'All' | 'Coffee' | 'Non-Coffee' | 'Tea' | 'Meals' | 'Desserts';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Exclude<MenuCategory, 'All'>;
  image: string;
  featured?: boolean;
  badge?: string;
}
