import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AuthService } from '../../services/auth.service';


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

  constructor(private auth: AuthService,private toast:ToastController, public nav: NavController) {

  }

  ionViewDidLoad() {
    
    this.toast.create({
      message:'Logged out...',
      duration:2000
    }).present();

    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
