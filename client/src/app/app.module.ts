import { NativeStorage } from '@ionic-native/native-storage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { AlertController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';
import { CameraProvider } from '../providers/camera/camera';
import { TokenProvider } from '../providers/token/token';
import { UserAccountPage } from '../pages/user-account/user-account';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { MenuComponent } from '../components/menu/menu';
import { ChangepassPage } from '../pages/changepass/changepass';
import { ProductsPage } from '../pages/products/products';
import { ProductProvider } from '../providers/product/product';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserProductsPage } from '../pages/user-products/user-products';
import { ProductsComponent } from '../components/products/products';
import { NewProductPage } from '../pages/new-product/new-product';
import { WishlistComponent } from '../components/wishlist/wishlist';
import { UserProductPage } from '../pages/user-product/user-product';
import { CommentsComponent } from '../components/comments/comments';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    MenuComponent,
    ProductsPage,
    UserAccountPage,
    WishlistPage,
    MenuComponent,
    ChangepassPage,
    UserProfilePage,
    UserProductsPage,
    ProductsComponent,
    NewProductPage, 
    WishlistComponent,
    UserProductPage,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    MenuComponent,
    ProductsPage,
    ProductsPage,
    UserAccountPage,
    WishlistPage,
    MenuComponent,
    ChangepassPage,
    UserProfilePage,
    UserProductsPage,
    ProductsComponent,
    NewProductPage,
    WishlistComponent,
    UserProductPage,
    CommentsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Camera, 
    AlertController,
    NativeStorage,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    CameraProvider,
    TokenProvider,
    ProductProvider
  ]
})
export class AppModule {}
