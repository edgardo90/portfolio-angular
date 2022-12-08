//service para la creacion de nuevo usario y el login
import { Injectable } from '@angular/core';
import {HttpClient , HttpHandler, HttpHeaders} from "@angular/common/http"  // esto sirve para ser los get y post
import { Observable ,of} from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {NewUser , User} from "../interfaces/interface-newUser" ;// esta es la interface que cree de nuevo usuario
import {LoginUser} from "../interfaces/interface-login";//
import {Jwt} from "../interfaces/interface-jwt";


const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private urlAuth = "http://localhost:8080/auth" // la ruta del back local para el auth
  private urlAuth = "https://back-portofolio-java-v10-production.up.railway.app/auth" // la ruta del back local para el auth

  constructor(private http:HttpClient) { } // traigo aca el HttpClient que importe y la denomino "http"

  postNewUser(newUser: NewUser):Observable<any> {
    return this.http.post<any>(`${this.urlAuth}/create`, newUser , httpOption );
  }

  postLogin(loginUser:LoginUser):Observable<Jwt>{ // como va recibir un jwToken el Observable va lo que va a recibir
    return this.http.post<Jwt>(`${this.urlAuth}/login`, loginUser , httpOption );
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.urlAuth}/user/all`);
  }


}
