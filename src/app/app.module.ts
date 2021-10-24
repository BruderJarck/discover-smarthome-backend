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

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ShopComponent,
    CartComponent,
    NavComponent,
    Login,
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
