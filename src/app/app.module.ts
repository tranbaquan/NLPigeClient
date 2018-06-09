import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';


import { UserService } from '../service/user-service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { ProfilePage } from '../pages/profile/profile';
import { InforPage } from '../pages/infor/infor';
import { UserInforService } from '../service/userinfor-service';
import { PasswordValidation } from '../service/validation';
import { AvatarPage } from '../pages/avatar/avatar';
import { Camera } from '@ionic-native/camera';

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
    ProfilePage,
    InforPage,
    AvatarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(
      {
        name: 'egipln',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage,
    TabsPage,
    ContactPage,
    ProfilePage,
    InforPage,
    AvatarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    UserInforService,
    PasswordValidation,
    AngularFireDatabase,
    AngularFireStorage,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
