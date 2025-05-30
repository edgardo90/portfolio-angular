import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";  // esto sirve para ser los get y post
import { Observable } from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {About} from "../interfaces/interface-about"; // este el interface que cree

const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})
export class AboutService {

  // private urlAbout = "http://localhost:8080/about" // la ruta del back local de About
  private urlAbout = "https://back-portofolio-java-v1-0.onrender.com/about" // ruta del back deploy

  constructor(private http:HttpClient ) { }

  getAllAbout():Observable<About[]>{ // get para traer los about
    return this.http.get<About[]>(`${this.urlAbout}/all`);
  }

  postAbout(about:About):Observable<About>{ // funcion para el post crear la About
    return this.http.post<About>(`${this.urlAbout}/create`, about, httpOption );
  }

  deletedAbout(about:About):Observable<About>{ // funcion para eleminar el About
    const urlAbautDeleted = `${this.urlAbout}/deleted/${about.id}`;
    return this.http.delete<About>(urlAbautDeleted)
  }

  getAboutByid(id:string):Observable<About>{ // get para traer un About por su id
    const urlAboutById = `${this.urlAbout}/${id}` ;
    return this.http.get<About>(urlAboutById);
  }

  putAbout(about:About):Observable<About>{ //funcion para modificar el About
    const urlAboutById = `${this.urlAbout}/edit/${about.id}`
    return this.http.put<About>(urlAboutById, about , httpOption);
  }


}
