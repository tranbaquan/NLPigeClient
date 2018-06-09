import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/Observable';
import { LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserService } from '../../service/user-service';
import { User } from '../../model/user';
import { TabsPage } from '../../pages/tabs/tabs';
import { ResponseCode } from '../../secret/response-code';
import { PasswordValidation } from '../../service/validation';
import { InforPage } from '../infor/infor';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private opt: string;
  private signinMessage: string;
  private signupMessage: string;
  private signinUser: any;
  private signupUser: any;
  private signinForm: FormGroup;
  private signupForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private userService: UserService,
    private loaddingControl: LoadingController,
    private storage: Storage,
    public validate: PasswordValidation
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
      signinEmail: ['', Validators.compose([Validators.required, Validators.email])],
      signinPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.signupForm = formBuilder.group({
      signupEmail: ['', Validators.compose([Validators.required, Validators.email])],
      signupPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      signupRepassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      signupChecked: ['', Validators.compose([Validators.requiredTrue])]
    }, {
        validator: validate.matchPassword
      });
  }

  ionViewWillEnter() {
    this.storage.get('user').then(data => {
      if (data != null) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }



  public doSignup() {
    let load: Loading = this.loaddingControl.create({
      content: 'Processing..',
      spinner: 'ios'
    });
    load.present();
    this.userService.createUser(this.signupUser.email, this.signupUser.password)
      .then(response => {
        load.dismissAll();
        switch (response.status) {
          case ResponseCode.CREATED: {
            this.storage.set('user', response.json()).then(() => {
              this.navCtrl.setRoot(InforPage);
            });
            break;
          }
        }
      })
      .catch(error => {
        load.dismissAll();
        switch (error.status) {
          case ResponseCode.CONFLICT: {
            this.signupMessage = 'Email has existed!';
            break;
          }
          case ResponseCode.NOT_ACCEPTABLE: {
            this.signupMessage = 'Invalid email!';
            break;
          }
          case ResponseCode.NOT_FOUND: {
            this.signupMessage = 'Invalid password!';
            break;
          }
          case ResponseCode.UNAUTHORIZED: {
            this.signupMessage = 'Sorry! Server has been broken! Please signup again!';
            break;
          }
          default: {
            this.signinMessage = 'Please check your network!';
            break;
          }
        }
      });
  }

  public doLogin() {
    let load: Loading = this.loaddingControl.create({
      content: 'Processing..',
      spinner: 'ios'
    });
    load.present();
    this.userService.login(this.signinUser.email, this.signinUser.password)
      .then((response) => {
        load.dismissAll();
        switch (response.status) {
          case ResponseCode.OK: {
            this.storage.set('user', response.json());
            this.navCtrl.push(TabsPage);
            break;
          }
        }
      })
      .catch(err => {
        load.dismissAll();
        switch (err.status) {
          case ResponseCode.NOT_ACCEPTABLE: {
            this.signinMessage = 'Email or password is invalid!';
            break;
          }
          default: {
            this.signinMessage = 'Please check your network!';
            break;
          }
        }
      });
  }
}
