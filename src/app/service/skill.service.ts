import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";  // esto sirve para ser los get y post
import { Observable } from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {Skill} from "../interfaces/interface-skill";

const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private urlSkill = "http://localhost:8080/skill" // la ruta del back local de skill

  constructor(private http:HttpClient) { }

  getAllSkill():Observable<Skill[]>{ // get para traer los skills
    return this.http.get<Skill[]>(`${this.urlSkill}/all`);
  }

  postSkill(skill:Skill):Observable<Skill>{ // funcion para crear one skill
    return this.http.post<Skill>(`${this.urlSkill}/create`, skill, httpOption );
  }

  deletedSkill(skill:Skill):Observable<Skill>{ // funcion para eleminar el skill
    const urlSkillDeleted = `${this.urlSkill}/deleted/${skill.id}`;
    return this.http.delete<Skill>(urlSkillDeleted);
  }

  getSkillByid(id:string):Observable<Skill>{ // get para traer one skill por su id
    const urlSkillById = `${this.urlSkill}/${id}` ;
    return this.http.get<Skill>(urlSkillById);
  }

  putSkill(skill:Skill):Observable<Skill>{ //funcion para modificar skill
    const urlSkillById = `${this.urlSkill}/edit/${skill.id}` ;
    return this.http.put<Skill>(urlSkillById, skill , httpOption);
  }


}
