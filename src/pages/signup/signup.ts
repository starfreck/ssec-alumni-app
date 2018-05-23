import {Component} from "@angular/core";
import {NavController,ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { User } from "../../app/models/user";

import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,private toast:ToastController, public nav: NavController) {
  }

  // register and go to home page
  async register(user : User) {
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if(result){
        this.toast.create({
          message: 'Signup Successfully...',
          duration:3000
        }).present();
        this.nav.setRoot(LoginPage);
      }
    }
    catch(e){
      console.error(e);
    }
    
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
