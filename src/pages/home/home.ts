import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { LoadingController, Loading } from 'ionic-angular';
import { AlertController, Alert } from 'ionic-angular';
import { UserService } from '../../service/user-service';
import { LoginPage } from '../login/login';
import { InforPage } from '../infor/infor';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private friends = [];
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseDb: AngularFireDatabase,
    private userService: UserService,
    private storage: Storage,
    private loaddingControl: LoadingController,
    private alertControl: AlertController,
  ) {
    this.storage.get('user').then(user => {
      this.firebaseDb.list('/friends/' + user.idUser).valueChanges().subscribe(
        (data) => {
          if (data != null)
            this.friends = this.userService.getInforFriends(data);
        }
      );
    });
  }

  // ionViewWillEnter() {
  //   this.storage.get('user').then(data => {
  //     this.storage.get('/user/' + data.idUser).then(data => {
  //       this.firebaseDb.list('').set('active', true);
  //     });
  //   });
  // }

  // addFriend() {
  //   this.storage.get('user').then(data => {
  //     for (let index = 8; index < 13; index++) {
  //       this.firebaseDb.list('/friends/' + data.idUser).push({
  //         value: index
  //       });
  //     }
  //   });
  // }
  goToChatRoom(friend) {
    this.navCtrl.push(ChatPage, { friend: friend });
  }
}
