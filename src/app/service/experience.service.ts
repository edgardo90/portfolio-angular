import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";  // esto sirve para ser los get y post
import { Observable } from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {Experience} from "../interfaces/interface-experience"; // este el interface que cree

const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  // private urlExperience = "http://localhost:8080/experience" // la ruta del back local de Experience
  private urlExperience = "https://optimistic-hermine-edgardo90.koyeb.app/experience"


  constructor(private http:HttpClient ) { }


  getAllExperience():Observable<Experience[]>{ // get para traer los Experiences
    return this.http.get<Experience[]>(`${this.urlExperience}/all`);
  }

  postExperience(exp:Experience):Observable<Experience>{
    return this.http.post<Experience>(`${this.urlExperience}/create`, exp, httpOption );
  }

  deletedExperience(exp:Experience):Observable<Experience>{ // funcion para eleminar la Experince
    const urlExperienceDeleted = `${this.urlExperience}/deleted/${exp.id}`;
    return this.http.delete<Experience>(urlExperienceDeleted);
  }

  getExperienceByid(id:string):Observable<Experience>{ // get para traer una Experience por su id
    const urlExperienceById = `${this.urlExperience}/${id}` ;
    return this.http.get<Experience>(urlExperienceById);
  }

  putExperience(exp:Experience):Observable<Experience>{ //funcion para modificar la Experience
    const urlExperienceById = `${this.urlExperience}/edit/${exp.id}` ;
    return this.http.put<Experience>(urlExperienceById, exp , httpOption);
  }



}
