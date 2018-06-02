import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private friends = [];
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseDb: AngularFireDatabase) {
    this.firebaseDb.list('/friends').valueChanges().subscribe(
      (data) => {
        if (data != null)
          this.friends = data;
      }
    )
  }

  addFriend() {
    this.firebaseDb.list('/friends').push({
      name: 'Trần Bá Quan',
      age: '21'
    });
  }
}
