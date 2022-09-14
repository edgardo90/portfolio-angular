import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";  // esto sirve para ser los get y post
import { Observable } from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {Education} from "../interfaces/interface-education"; // este el interface que cree


const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private urlEducation = "http://localhost:8080/education" // la ruta del back local de Education

  constructor( private http:HttpClient) { }

  getAllEducation():Observable<Education[]>{ // get para traer las educations
    return this.http.get<Education[]>(`${this.urlEducation}/all`);
  }

  postEducation(education:Education):Observable<Education>{ // post para crear  una new education
    return this.http.post<Education>(`${this.urlEducation}/create`, education, httpOption );
  }

  deletedEducation(education:Education):Observable<Education>{ // funcion para eleminar la Education
    const urlEducationDeleted = `${this.urlEducation}/deleted/${education.id}`;
    return this.http.delete<Education>(urlEducationDeleted);
  }

  getEducationByid(id:string):Observable<Education>{ // get para traer una Education por su id
    const urlEducationById = `${this.urlEducation}/${id}` ;
    return this.http.get<Education>(urlEducationById);
  }

  putEducation(education:Education):Observable<Education>{ // put funcion para modificar la Education
    const urlEducationById = `${this.urlEducation}/edit/${education.id}` ;
    return this.http.put<Education>(urlEducationById, education , httpOption);
  }


}
