import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';

import { User } from '../../model/user';
import { RegisterPage } from '../../pages/register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private opt: string;
  private signinUser: any;
  private signupUser: any;
  private signupForm: FormGroup;
  private signinForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private oneSignal: OneSignal,
    private userService: UserService
  ) {
      this.opt = "signin";
      this.signinUser = {
        email: '',
        password: ''
      };
      this.signupUser = {
        email: '',
        password: '',
        repassword: '',
        checked: false
      };
      this.signinForm = formBuilder.group({
        signinEmail : ['', Validators.compose([Validators.required, Validators.email])],
        signinPassword : ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
      this.signupForm = formBuilder.group({
        signupEmail : ['', Validators.compose([Validators.required, Validators.email])],
        signupPassword : ['', Validators.compose([Validators.required])],
        signupRepassword : ['', Validators.compose([Validators.required])],
        signupChecked : ['', Validators.compose([Validators.requiredTrue])]
      });
  }

  // ionViewDidLoad() {
  //   this.oneSignal.startInit('a35e55c5-bfa6-4883-beb8-2aa85c1b530f', '944483627331');

  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

  //   this.oneSignal.handleNotificationReceived().subscribe(() => {
  //     // do something when notification is received
  //     console.log("do something when notification is received");
  //   });
    
  //   this.oneSignal.handleNotificationOpened().subscribe(() => {
  //     // do something when a notification is opened
  //     console.log("do something when a notification is opened");
  //   });

  //   this.oneSignal.endInit();
  // }

  public login() {
  }

  public doSignup() {
    this.userService.createUser(this.signupUser.email, this.signupUser.password)
    .then(response =>{
      console.log(response.json());
    })
    .catch(error => {
      console.log(error);
    });
  }

}
