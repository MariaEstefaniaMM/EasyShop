import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { ProductsComponent } from './products/products';
import { WishlistComponent } from './wishlist/wishlist';
@NgModule({
	declarations: [MenuComponent,
    ProductsComponent,
    WishlistComponent],
	imports: [],
	exports: [MenuComponent,
    ProductsComponent,
    WishlistComponent]
})
export class ComponentsModule {}
