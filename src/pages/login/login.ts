import { Component } from '@angular/core';

import { NavController, AlertController, ToastController } from "ionic-angular";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
import { User } from '../../app/models/user';

import { AngularFireAuth  } from "angularfire2/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth:AngularFireAuth , public nav: NavController, public forgotCtrl: AlertController, public toast: ToastController) {
    
  }

  // login and go to home page
  async login(user : User) {
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if(result){
        this.nav.setRoot(TabsPage);
      }
      else{
        this.toast.create({
          message: 'Invalid login details please try again...',
          duration:3000
        }).present();
      }
    }
    catch(e){
      console.error(e);
      this.toast.create({
        message: 'Invalid login details please try again...',
        duration:3000
      }).present();
    }
    
  }

  // go to register page
  register() {
    this.nav.setRoot(SignupPage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toast.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
