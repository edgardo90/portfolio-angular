import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http"  // esto sirve para ser los get y post
import { Observable ,of} from "rxjs" // libreria que nos permite controlar el async , "observable"
import {Banner} from "../interfaces/interface-barr" //este el interface del banner que cree



const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private urlBanner ="http://localhost:8080/banner/" // la ruta del back local del banner

  constructor(private http:HttpClient) { }

  getAllBanners():Observable<Banner[]>{
    return this.http.get<Banner[]>(`${this.urlBanner}all`)
  }

}
