import {Component} from "@angular/core";
import {NavController,ToastController, LoadingController} from "ionic-angular";
import {LoginPage} from "../login/login";

import { AuthService } from '../../services/auth.service';
import { User } from "../../models/user";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user = {} as User;

  constructor(public loadingCtrl:LoadingController, private auth: AuthService,private toast:ToastController, public nav: NavController) {
  }

  // register and go to home page
  async signup(user : User) {

    let loading = this.loadingCtrl.create({
      content: 'Signing Up Please wait...'
    });

    if (!user.email) {
     
      this.toast.create({
        message: 'Enter E-mail address...',
        duration:2000
      }).present();
      return;
      
    }

    if (!user.password) {
     
      this.toast.create({
        message: 'Enter Password...',
        duration:2000
      }).present();
      return;
      
    }
		
    try{

      loading.present();

      let credentials = {
        email: user.email,
        password: user.password
      };

      const result = await this.auth.signUp(credentials);
      console.log(result);
      if(result){

        loading.dismiss();

        this.toast.create({
          message: 'Signup Successfully...',
          duration:3000
        }).present();
        this.nav.setRoot(LoginPage);
      }
      else{

        loading.dismiss();

        this.toast.create({
          message: 'Invalid Signup details please try again...',
          duration:3000
        }).present();
      }
    }
    catch(e){

      loading.dismiss();

      console.error(e);

      this.toast.create({
        message: e.message,
        duration:3000
      }).present();
    }

  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
