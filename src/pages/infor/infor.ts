import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PasswordValidation } from '../../service/validation';
import { AvatarPage } from '../avatar/avatar';
import { UserInforService } from '../../service/userinfor-service';
import { ResponseCode } from '../../secret/response-code';
import { Link } from '../../secret/link';
/**
 * Generated class for the InforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-infor',
  templateUrl: 'infor.html',
})
export class InforPage {
  private infor: any;
  private inforForm: FormGroup;
  email: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public validate: PasswordValidation,
    public userInforService: UserInforService
  ) {
    this.email = '';
    this.storage.get('user').then(user => {
      this.email = user.email;
    })
    this.infor = {
      fname: '',
      lname: '',
      phone: '',
      gender: 'male',
      birthday: new Date(1990, 1, 1).toISOString(),
      avatar: Link.AVATAR
    };

    this.inforForm = formBuilder.group({
      formfname: ['', Validators.compose([Validators.required])],
      formlname: ['', Validators.compose([Validators.required])],
      formphone: ['', Validators.compose([Validators.required])],
      formgender: ['', Validators.compose([Validators.required])],
      formbirthday: ['', Validators.compose([Validators.required])]
    });
  }

  next() {
    this.storage.get('user').then(user => {
      let inforUser: any = {
        idUser: user.idUser,
        firstName: this.infor.fname,
        lastName: this.infor.lname,
        phone: this.infor.phone,
        birthday: new Date(this.infor.birthday),
        gender: this.infor.gender,
        timeUpdate: new Date(),
        avatar: this.infor.avatar
      }
      this.userInforService.createInfor(inforUser).then(infor => {
        console.log(infor);
        switch (infor.status) {
          case ResponseCode.CREATED: {
            this.infor = infor.json();
            this.storage.set('infor', this.infor);
            this.navCtrl.push(AvatarPage);
            break;
          }
        }

      })
        .catch(error => {
          switch (error.status) {
            case ResponseCode.CONFLICT: {
              break;
            }
            case ResponseCode.NOT_ACCEPTABLE: {
              break;
            }
          }
        });
    }
    );
  }

}
