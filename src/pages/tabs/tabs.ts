import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';                                                                                                                                                                                                                                                                                                                                                                                                               
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';

import { AngularFireAuth } from "angularfire2/auth";
import { LogoutPage } from '../logout/logout';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ProfilePage;
  //tab4Root = LogoutPage;

  constructor(private afAuth:AngularFireAuth, private toast:ToastController, private nav:NavController) {

  }

  ionViewWillLoad(){

    //this.afAuth.authState.subscribe(data => {console.log(data.email)});
    
    this.afAuth.authState.subscribe(data => {

      if(data && data.email && data.uid){

        this.toast.create({
          message: 'Welcome to SSGEC Alumni, '+data.email,
          duration:3000
        }).present();

      }
      else{

        this.toast.create({
          message: 'could not find authantication details...',
          duration:3000
        }).present();

      }
     
    });

  }

  logout(){
    
    this.toast.create({
      message:'you are logging out...',
      duration : 2000
    }).present();

    this.afAuth.auth.signOut();
    this.nav.setRoot(LoginPage);
  }
}
