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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
