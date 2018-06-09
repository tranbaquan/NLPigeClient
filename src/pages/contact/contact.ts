import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  items: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    private storage: Storage,
    private firebaseDb: AngularFireDatabase
  ) {
  }

  getItems(event: any) {
    const val = event.target.value;
    this.userService.findFriend(val).then(response => {
      this.items = response.json();
    });
  }
  requestFriend(item) {
    this.storage.get('user').then(data => {
      this.firebaseDb.list('/friends/' + data.idUser).push({
        id: item.idUser
      });
      this.firebaseDb.list('/friends/' + item.idUser).push({
        id: data.idUser
      });
    });
  }
}
