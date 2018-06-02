import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/Observable';
import { LoadingController, Loading } from 'ionic-angular';
import { AlertController, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserService } from '../../service/user-service';
import { User } from '../../model/user';
import { HomePage } from '../../pages/home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { ResponseCode } from '../../secret/response-code';
import { PasswordValidation } from '../../service/validation';

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
    private userService: UserService,
    private loaddingControl: LoadingController,
    private alertControl: AlertController,
    private storage: Storage
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
        validator: PasswordValidation.MatchPassword
      });
  }

  ionViewWillEnter() {
    let load: Loading = this.loaddingControl.create({
      content: 'Processing..',
      spinner: 'ios'
    });
    load.present();
    this.storage.ready().then(() => {
      this.storage.get('user').then(data => {
        if (data != null) {
          load.dismissAll();
          this.navCtrl.push(TabsPage);
        }
      })
        .catch(error => {
          load.dismissAll();
        });
      load.dismissAll();
    })
      .catch((error) => {
        console.log(error);
        load.dismissAll();
      }
      );
    load.dismissAll();
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
            this.storage.clear().then(() => {
              this.storage.set('user', response.json());
            });
            let alert = this.alertControl.create(
              {
                title: 'Signup Success!',
                buttons: ['OK']
              }
            );
            alert.present();
            this.navCtrl.push(TabsPage);
            break;
          }
          case ResponseCode.CONFLICT: {
            let alert = this.alertControl.create(
              {
                title: 'Signup Failed!',
                subTitle: 'Email has existed.',
                buttons: ['OK']
              }
            );
            alert.present();
            break;
          }
          case ResponseCode.NOT_ACCEPTABLE: {
            let alert = this.alertControl.create(
              {
                title: 'Signup Failed!',
                subTitle: 'Invalid email.',
                buttons: ['OK']
              }
            );
            alert.present();
            break;
          }
          case ResponseCode.UNAUTHORIZED: {
            let alert = this.alertControl.create(
              {
                title: 'Signup Failed!',
                subTitle: 'Sorry! Server has been broken! Please signup again.',
                buttons: ['OK']
              }
            );
            alert.present();
            break;
          }
        }
      })
      .catch(error => {
        let alert = this.alertControl.create(
          {
            title: 'Signup Failed!',
            subTitle: 'Please check your network',
            buttons: ['OK']
          }
        );
        alert.present();
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
          case ResponseCode.NOT_ACCEPTABLE: {
            let alert = this.alertControl.create(
              {
                title: 'Signin Failed!',
                subTitle: 'Email or password is invalid',
                buttons: ['OK']
              }
            );
            alert.present();
            break;
          }
        }
      })
      .catch(err => {
        load.dismissAll();
        let alert = this.alertControl.create(
          {
            title: 'Signup Failed!',
            subTitle: 'Please check your network',
            buttons: ['OK']
          }
        );
        alert.present();
      });
  }
}
