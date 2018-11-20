import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { ProductsComponent } from './products/products';
import { UserProductsComponent } from './user-products/user-products';
@NgModule({
	declarations: [MenuComponent,
    ProductsComponent,
    UserProductsComponent],
	imports: [],
	exports: [MenuComponent,
    ProductsComponent,
    UserProductsComponent]
})
export class ComponentsModule {}
