import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = ProfilePage;

  constructor() {
  }

}
