import { TokenProvider } from './../providers/token/token';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NotesListPage } from './../pages/notes-list/notes-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string; component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
               private tokenProvider: TokenProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Notes', component: NotesListPage, icon: 'home' },
      { title: 'Logout', component: HomePage, icon: 'log-out' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=='Logout'){
        this.tokenProvider.removeToken();
        console.log(this.tokenProvider.token)
    }
    this.nav.push(page.component);
  }
}

