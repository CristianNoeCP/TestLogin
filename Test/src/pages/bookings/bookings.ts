import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TutenprovProvider } from '../../providers/tutenprov/tutenprov';
import { HomePage } from '../home/home';
import {Booking} from '../../models/booking'

/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  public Bookings : Array<Booking>;
  public Bookingsfiltrar : Array<Booking>;
  public filtroBooking : string;
  constructor(private providerTuten : TutenprovProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.Bookings = [];
  }

  ionViewDidLoad() {
    
    if (localStorage.getItem("token_tuten") != null) {
      this.providerTuten.consultarBookings().subscribe(
        result => {
          console.log(result);
          for (const prop in result) 
          {           
            let fecha = new Date(result[prop].bookingTime);
            let fechamostrar = fecha.toDateString() + " "+ fecha.toTimeString();
            this.Bookings.push (new Booking(result[prop].bookingId,result[prop].tutenUserClient.firstName+" "+result[prop].tutenUserClient.lastName ,fechamostrar,result[prop].locationId.streetAddress,result[prop].bookingPrice));    

          }
          console.log(this.Bookings);
          this.Bookingsfiltrar = this.Bookings;
        },
        error => {
          console.log(<any>error);
        }
      );
    }
    else {
      this.navCtrl.setRoot(HomePage);
    }
  }
  filtro() {
    let query = this.filtroBooking;
        this.Bookings=this.Bookingsfiltrar.filter(function(Bookingfil) {
           return (Bookingfil.Cliente.toLowerCase().indexOf(query.toLowerCase()) > -1) || (Bookingfil.Direccion.toLowerCase().indexOf(query.toLowerCase()) > -1) || (Bookingfil.Fecha_de_Creacion.toLowerCase().indexOf(query.toLowerCase()) > -1) || (Bookingfil.bookingId.toString().indexOf(query) > -1)|| (Bookingfil.Precio.toString().indexOf(query) > -1);
        })
      }
      Cerrarsesion()
      {
        localStorage.clear();
        this.navCtrl.setRoot(HomePage);
      }
}
