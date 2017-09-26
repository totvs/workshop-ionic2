import { ListPage } from './../pages/list/list';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public http: Http, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Clientes', component: ListPage }
    ];

  }

  // exec(that) {
  //   that.syncQueue.count()
  //     .then((count) => {
  //       if (count > 0) {
  //         console.log("Count: " + count);
  //         that.syncQueue.getFirst()
  //           .then((item) => {
  //             console.log("Sending ", item);
  //             that.http.post(AppConstants.API_URL + AppConstants.CUSTOMER_API, item.body)
  //               .subscribe(() => {
  //                 console.log("Sent ", item);
  //                 that.syncQueue.remove(item.id)
  //                   .then(() => {
  //                     if (count > 1)
  //                       that.exec(that);
  //                     else
  //                       setTimeout(that.exec, 5000, that);
  //                   })
  //               },
  //               (err) => {
  //                 console.log("Erro no item: ", item);
  //                 setTimeout(that.exec, 5000, that);
  //               });
  //           });
  //       } else {
  //         setTimeout(that.exec, 5000, that);
  //       }
  //     })
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // setTimeout(this.exec, 5000, this);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
