import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpageComponent } from './components/userpage/userpage.component';
import { CartPageComponent, MainPageComponent } from './pages';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { AccountService } from './shared/account.service';
import { SensorDataPageComponent } from './pages/sensor-data-page/sensor-data-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  { path: 'cart', component: CartPageComponent },
  { path: 'user', component: UserpageComponent, canActivate: [AccountService] },
  { path: 'sensors', component: SensorDataPageComponent, canActivate: [AccountService] },
  { path: 'detail/:id', component: ProductDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
