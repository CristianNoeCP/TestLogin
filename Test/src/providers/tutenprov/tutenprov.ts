import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the TutenprovProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TutenprovProvider {
  public  url:String = "https://dev.tuten.cl/TutenREST/rest";
  public params = [];
  constructor(public http: HttpClient) {
  }
  loginUser(email: string, clave: string): Observable <any>{

    let headers = new HttpHeaders();

    headers = headers.set('Content-Type','application/json');
    headers = headers.set('password',clave);
    headers = headers.set('app','APP_BCK');
    this.params = [];

    return this.http.put(this.url+'/user/' + email, this.params, {headers: headers});
}
consultarBookings()
{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type','application/json');
  headers = headers.set('adminemail',"testapis@tuten.cl");
  headers = headers.set('app','APP_BCK');
  headers = headers.set('token',localStorage.getItem("token_tuten").toString() ); 

  return this.http.get(this.url+'/user/contacto@tuten.cl/bookings?current=true', {headers: headers});

}

}
