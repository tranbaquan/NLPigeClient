import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../service/user-service'
import 'rxjs/add/operator/catch';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string
  password: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
    this.email = "tranbaquan.tbq@gmail.com";
    this.password = "1234";
  }

  ionViewDidLoad() {
  }

  public register() {
    this.userService.createUser(this.email, this.password)
      .then(response => {
        console.log(response.json);
      })
      .catch(error => {
        console.log(error);
      }
      );
  }

}
