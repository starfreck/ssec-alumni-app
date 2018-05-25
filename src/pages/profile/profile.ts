import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { Profile } from '../../models/profile';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(private afAuth : AngularFireAuth, private afDB: AngularFireDatabase, public navCtrl: NavController) {

  }


  createProfile(){

    this.afAuth.authState.take(1).subscribe(auth => {
        this.afDB.object('profile/${auth.uid}').set(this.profile)
        .then(() => this.navCtrl.push(TabsPage))
    });

  }

  about(){
    this.navCtrl.push(AboutPage);  
  }

}
