import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages: any;
  user: any;
  friend: any;
  input:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseDb: AngularFireDatabase,
    private storage: Storage
  ) {
    this.friend = this.navParams.get('friend');
    this.storage.get('user').then(data => {
      this.user = data;
      this.getMessage();
    })
  }

  getMessage() {
    this.firebaseDb.list('/messages/groups/' + this.user.idUser + '/' + this.friend.idUser)
    .valueChanges()
    .subscribe(data => {
      this.messages = data;
    })
  }
  sendMessage(){
    this.firebaseDb.list('/messages/groups/' + this.user.idUser + '/' + this.friend.idUser).push({
      idUser: this.user.idUser,
      message: this.input
    });
    this.firebaseDb.list('/messages/groups/' + this.friend.idUser + '/' + this.user.idUser).push({
      idUser: this.user.idUser,
      message: this.input
    });
    this.input = '';
  }
}
