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

  // private urlBanner ="http://localhost:8080/banner" // la ruta del back local del banner
  private urlBanner = "https://back-portofolio-java-v1-0.onrender.com/banner" // ruta del back deploy

  constructor(private http:HttpClient) { }

  getAllBanners():Observable<Banner[]>{ // get para traer los banners
    return this.http.get<Banner[]>(`${this.urlBanner}/all`)
  }

  postBanner(banner:Banner):Observable<Banner>{ // funcion para crear el banner
    return this.http.post<Banner>(`${this.urlBanner}/create`, banner, httpOption );
  }

  deletedBanner(banner:Banner):Observable<Banner>{ // funcion para eleminar el banner
    const urlPerosnaDeleted = `${this.urlBanner}/deleted/${banner.id}`;
    return this.http.delete<Banner>(urlPerosnaDeleted);
  }

  getBarrnerByid(id:string):Observable<Banner>{ // get para traer un banner por su id
    const urlBannerById = `${this.urlBanner}/${id}` ;
    return this.http.get<Banner>(urlBannerById);
  }

  putBanner(banner:Banner):Observable<Banner>{ //funcion para modificar el banner
    const urlBannerById = `${this.urlBanner}/edit/${banner.id}`
    return this.http.put<Banner>(urlBannerById, banner , httpOption);
  }

}
