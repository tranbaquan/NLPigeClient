import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';


import { UserService } from '../service/user-service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { ProfilePage } from '../pages/profile/profile';

var config = {
  apiKey: "AIzaSyDJPhTGNLMZtc0BgJX-kJI5iuGLkoMIaa0",
  authDomain: "nlpige-f047c.firebaseapp.com",
  databaseURL: "https://nlpige-f047c.firebaseio.com",
  projectId: "nlpige-f047c",
  storageBucket: "nlpige-f047c.appspot.com",
  messagingSenderId: "944483627331"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage,
    TabsPage,
    ContactPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
        name: 'egipln',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    ),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage,
    TabsPage,
    ContactPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
