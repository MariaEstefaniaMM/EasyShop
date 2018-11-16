import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { UserAccountPage } from '../pages/user-account/user-account';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { MenuComponent } from '../components/menu/menu';
import { ChangepassPage } from '../pages/changepass/changepass';
import { ProductsPage } from '../pages/products/products';
import { EditaccountPage } from '../pages/editaccount/editaccount';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    ProductsPage,
    UserAccountPage,
    WishlistPage,
    MenuComponent,
    ChangepassPage,
    EditaccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    ProductsPage,
    UserAccountPage,
    WishlistPage,
    MenuComponent,
    ChangepassPage,
    EditaccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
