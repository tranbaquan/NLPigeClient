import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Link } from '../../secret/link';
import { UserInforService } from '../../service/userinfor-service';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../service/user-service';

/**
 * Generated class for the AvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})
export class AvatarPage {
  avatar: string;
  path: string;
  task: AngularFireUploadTask;
  progress: any;  // Observable 0 to 100
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    public angularStorage: AngularFireStorage,
    public userInforServive: UserInforService,
    public userService: UserService
  ) {
    this.avatar = Link.AVATAR;
  }

  ionViewDidLoad() {
  }
  
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Take picture',
      buttons: [
        {
          text: 'Choose from photo library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Take a picture',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }
  
  takePicture(sourceType:number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = 'avatar_' + new Date().getTime() + '.jpg';
      this.task = this.angularStorage.ref(this.path).putString(base64Image, 'data_url');
      this.progress = this.task.percentageChanges();
    }, (err) => {
      console.log('Upload error');
    });
  }

  complete() {
    this.angularStorage.storage.ref(this.path).getDownloadURL()
    .then(url => {
      this.avatar = url;
      console.log(url);
      this.storage.get('user').then(user =>{
        this.userInforServive.updateAvatar(this.avatar, user.idUser)
        .then(response => {
          user.userStatus = 1;
          this.userService.updateStatus(user).then(u => {
            user = u.json();
            user.userInformation = response.json();
            this.storage.set('user', user);
            this.navCtrl.setRoot(TabsPage);
          });
          this.storage.set('infor', response.json());
        });
      })
    });
  }
}
