import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  infor: any;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.infor = {
      firstName: '',
      lastName: '',
      phone: '',
      birthday: '',
      gender: '',
      avatar: ''
    }
    this.user = {
      email: ''
    }
    this.storage.get('user').then(user => {
      this.user = user;
    });
    this.storage.get('infor').then(infor => {
      this.infor = infor;
    });
  }
  signOut() {
    this.storage.clear().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }
}
