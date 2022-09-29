import { Component, OnInit } from '@angular/core';
//
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import {BannerService } from "../../../service/banner.service";
import {Banner, Errores} from "../../../interfaces/interface-barr";

@Component({
  selector: 'app-new-banner',
  templateUrl: './new-banner.component.html',
  styleUrls: ['./new-banner.component.css']
})
export class NewBannerComponent implements OnInit {

  banner!:Banner;

  imagenLink:string = ""; // variable que voy a utilizar para el formulario
  userName:string="edgardo90";

  errores:Errores={} // esto sirve para controlar el formulario

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private banerService:BannerService) { }

  ngOnInit(): void {
  }

  chekErros(){ // funcion para controlar y mostrar errores en el formulario
    if(!this.imagenLink){
      this.errores.imagenLink="tienes que ingresar una url para la imagen";
    }else if(!this.imagenLink.includes("https://")){
      this.errores.imagenLink = "el link de la imagen no es valido";
    }else{
      this.errores.imagenLink="";
    };
  }

  resetImagen(){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    this.imagenLink=""
  }

  createBanner(){
    const{imagenLink , userName} = this; // traigo la variable que utilice en formulario
    this.banner = {imagenLink , userName}; // el objeto "this.banner.imagenLink " va tener el valor el valor de "imagenLink"
    // console.log(this.banner);
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      })
      return alert("Observa los errores que estan en color rojo!"); // esto lo dejo para que funcione el Swal.fire con el return
    }
    this.banerService.postBanner(this.banner).subscribe(value=>{
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Banner creado",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error)
    })
  }


}
