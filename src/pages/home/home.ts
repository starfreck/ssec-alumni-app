import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';


import { AngularFireAuth } from "angularfire2/auth";
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private afAuth:AngularFireAuth, public navCtrl: NavController, private toast:ToastController) {

  }

  about(){
    this.navCtrl.push(AboutPage);  
  } 
  
}
