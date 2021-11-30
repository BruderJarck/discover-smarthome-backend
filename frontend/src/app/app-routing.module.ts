import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpageComponent } from './components/userpage/userpage.component';
import { AccountService } from './shared/account.service';
import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', 
    component: MainPageComponent, 
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'user', component: UserpageComponent },
      { path: 'sensors', component: SensorDataComponent },
      { path: 'detail/:id', component: ProductDetailComponent},
      // { path: 'user', component: UserpageComponent, canActivate: [AccountService] },
      // { path: 'sensors', component: SensorDataPageComponent, canActivate: [AccountService] },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
