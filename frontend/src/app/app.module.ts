import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { Login, NavComponent } from './components/nav/nav.component';
import { ShopComponent } from './components/shop/shop.component';
import components from './pages';
import { SharedModule } from './shared/shared-module';
import { CategoriesComponent } from './components/categories/categories.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { SharedService } from './shared/shared.service';
import { UserpageComponent } from './components/userpage/userpage.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SensorDataPageComponent } from './pages/sensor-data-page/sensor-data-page.component';
import { SensorDataComponent } from './components/sensor-data/sensor-data.component';


//prime ng imports
import {ChartModule} from 'primeng/chart';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ShopComponent,
    CartComponent,
    NavComponent,
    Login,
    CategoriesComponent,
    SidebarComponent,
    ProductDetailComponent,
    ProductDetailPageComponent,
    UserpageComponent,
    UserPageComponent,
    SensorDataPageComponent,
    SensorDataComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    
    //primeng modules
    ChartModule,
    InputNumberModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
