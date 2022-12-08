import { Injectable } from '@angular/core';
import {HttpClient , HttpHandler, HttpHeaders} from "@angular/common/http"  // esto sirve para ser los get y post
import { Observable ,of} from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {Contact} from "../interfaces/interface-contact"

const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = "https://quixotic-ong-edgardo90.koyeb.app/contacts/portfolio"; // ruta que sirve para enviar por email automatico 

  constructor(private http:HttpClient) { }

  postContact(contact: Contact):Observable<any> {
    return this.http.post<any>( this.contactUrl, contact , httpOption );
  }

}
