import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { InforPage } from '../infor/infor';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserInforService } from '../../service/userinfor-service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = ProfilePage;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public userInforService: UserInforService
  ) {
  }

  ionViewWillEnter() {
    this.storage.get('user').then(data => {
      if (data == null) {
        this.navCtrl.setRoot(LoginPage);
      } else {
        if (data.userStatus == 4) {
          this.navCtrl.setRoot(InforPage);
        }
        if (data.userStatus == 1) {
          this.storage.set('infor', data.userInformation);
        }
      }
    });
  }
}