import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { ProductsComponent } from './products/products';
import { WishlistComponent } from './wishlist/wishlist';
import { CommentsComponent } from './comments/comments';
@NgModule({
	declarations: [MenuComponent,
    ProductsComponent,
    CommentsComponent],
	imports: [],
	exports: [MenuComponent,
    ProductsComponent,
    CommentsComponent]
})
export class ComponentsModule {}
