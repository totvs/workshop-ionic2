import { THFSyncService } from '@totvs/thf-mobile/app/services/thf-sync/thf-sync.service';
import { Util } from './../providers/util/util';
// import { SyncQueue } from './../providers/sync_queue/sync_queue';
import { EditPage } from './../pages/edit/edit';
import { HttpModule } from '@angular/http';
import { ApiClient } from './../providers/api-client/api-client';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { ConnectionBackend } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
// import { RequestProvider } from '../providers/request/request';
import { THFStorageService } from '@totvs/thf-mobile/app/services/thf-storage/thf-storage.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(
      // {
      //   name: '_thf_sync_db',
      //   driverOrder: ['sqlite', 'websql', 'indexeddb']
      // }
    ),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // SyncQueue,
    THFStorageService,
    Util,
    ApiClient,
    // RequestProvider,
    THFSyncService

  ]
})
export class AppModule { }
