import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController, Platform } from "ionic-angular";
import { SignupPage } from "../signup/signup";


import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private auth: AuthService, public loadingCtrl: LoadingController, public nav: NavController, public forgotCtrl: AlertController, public toast: ToastController) {
    
  }

  // login and go to home page
  async login(user : User) {

    let loading = this.loadingCtrl.create({
      content: 'Logging Please wait...'
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

      const result = await this.auth.signInWithEmail(credentials);
      console.log(result);

      if(result){
        loading.dismiss();
        this.nav.setRoot(ProfilePage);
      }
      else{
        loading.dismiss();
        this.toast.create({
          message: 'Invalid login details please try again...',
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

  // go to register page
  signup() {
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

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.nav.setRoot(TabsPage),
        error => console.log(error.message)
      );
  }

}
