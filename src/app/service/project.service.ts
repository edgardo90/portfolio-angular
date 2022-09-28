import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";  // esto sirve para ser los get y post
import { Observable } from "rxjs"; // libreria que nos permite controlar el async , "observable"
import {Project} from "../interfaces/interface-project" ; // importo la interface que cree

const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private urlProject = "http://localhost:8080/project" // la ruta del back local de project

  constructor(private http:HttpClient) { }

  getAllProjects():Observable<Project[]>{ // get para traer los projects
    return this.http.get<Project[]>(`${this.urlProject}/all`);
  }

  postProject(project:Project):Observable<Project>{ // funcion para crear one project
    return this.http.post<Project>(`${this.urlProject}/create`, project, httpOption );
  }

  deletedProject(project:Project):Observable<Project>{ // funcion para eleminar el project
    const urlProjectDeleted = `${this.urlProject}/deleted/${project.id}`;
    return this.http.delete<Project>(urlProjectDeleted);
  }

  getProjectByid(id:string):Observable<Project>{ // get para traer one project por su id
    const urlProjectById = `${this.urlProject}/${id}` ;
    return this.http.get<Project>(urlProjectById);
  }

  putProject(project:Project):Observable<Project>{ //funcion para modificar project por su id
    const urlProjectById = `${this.urlProject}/edit/${project.id}` ;
    return this.http.put<Project>(urlProjectById, project , httpOption);
  }


}
