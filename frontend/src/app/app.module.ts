import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AccordionModule } from 'primeng/accordion';
//prime ng imports
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { Login, NavComponent } from './components/nav/nav.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import { ShopComponent } from './components/shop/shop.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
// import components from './pages';
import { SharedModule } from './shared/shared-module';
import { SharedService } from './shared/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    // ...components,
    ShopComponent,
    CartComponent,
    NavComponent,
    Login,
    CategoriesComponent,
    SidebarComponent,
    ProductDetailComponent,
    SensorDataComponent,
    ProductListComponent,
    MainPageComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    //primeng modules
    ChartModule,
    InputNumberModule,
    AccordionModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
