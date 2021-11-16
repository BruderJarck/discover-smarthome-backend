import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent, MainPageComponent } from './pages';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  { path: 'cart', component: CartPageComponent },
  { path: 'detail/:id', component: ProductDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
