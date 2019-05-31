import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TutenprovProvider } from '../../providers/tutenprov/tutenprov';
import { BookingsPage } from '../bookings/bookings';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public mail : string;
public pass: string;
  constructor(private providerTuten : TutenprovProvider, public navCtrl: NavController) {
  }

  Loginusertuten()
  {
    this.providerTuten.loginUser(this.mail,this.pass).subscribe(
      result => {
        localStorage.setItem("token_tuten",result.sessionTokenBck);
        localStorage.setItem("email",this.mail);
        this.navCtrl.setRoot(BookingsPage);
      },
      error => {
          console.log(<any>error);
      }
    );
  }
}
