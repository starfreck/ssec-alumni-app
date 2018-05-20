import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { TabsPage } from "../tabs/tabs";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public nav: NavController) {
  }

  // register and go to home page
  register() {
    this.nav.setRoot(TabsPage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
