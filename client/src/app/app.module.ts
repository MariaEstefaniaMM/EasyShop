import { NativeStorage } from '@ionic-native/native-storage';
import { MenuComponent } from './../components/menu/menu';
import { NotesListPage } from './../pages/notes-list/notes-list';
import { ProductsPage } from './../pages/products/products';
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
import { NoteProvider } from '../providers/note/note';
import { CameraProvider } from '../providers/camera/camera';
import { TokenProvider } from '../providers/token/token';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    NotesListPage,
    MenuComponent,
    ProductsPage
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
<<<<<<< HEAD:client/src/app/app.module.ts
    NotesListPage,
    MenuComponent
=======
    ProductsPage
>>>>>>> master:src/app/app.module.ts
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
    NoteProvider,
    CameraProvider,
    TokenProvider
  ]
})
export class AppModule {}
