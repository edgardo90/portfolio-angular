import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http"  // esto sirve para ser los get y post
import { Observable } from "rxjs" // libreria que nos permite controlar el async , "observable"
import {Persona} from "../interfaces/interface-persona" // este el interface de Persona que cree

const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlPersona = "http://localhost:8080/persona" // la ruta del back local de Persona

  constructor(private http:HttpClient) { }

  getAllPersons():Observable<Persona[]>{ // get para traer las personas
    return this.http.get<Persona[]>(`${this.urlPersona}/all`)
  }

  deletedPerson(person:Persona):Observable<Persona>{ // funcion para eleminar la persona
    const urlPerosnaDeleted = `${this.urlPersona}/deleted/${person.id}`;
    return this.http.delete<Persona>(urlPerosnaDeleted)
  }

}
