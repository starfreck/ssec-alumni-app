import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(private afAuth:AngularFireAuth, private toast:ToastController, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    
    this.toast.create({
      message:'you are logging out...',
      duration : 2000
    }).present();

    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
    //this.navCtrl.po
    //var nav = this.app.getRootNav();
    //nav.setRoot(LoginPage);

  }

}
