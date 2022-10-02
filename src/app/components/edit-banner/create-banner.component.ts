//component para modificar el banner
import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import {BannerService } from "../../service/banner.service";
import {Banner, Errores} from "../../interfaces/interface-barr";

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {

  loading: string = "Cargando...";
  
  banner!:Banner;
  imagenLink:string = ""; // variable que voy a utilizar para el formulario
  errores:Errores={} // esto sirve para controlar el formulario



  constructor(private router: Router, private activatedRouter : ActivatedRoute, private banerService:BannerService) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,1800 ); // cuando pase ese tiempo setea a un string vacio

    const id = this.activatedRouter.snapshot.params['id']; // traigo el id que viene por parms y lo guardo en una variable
    // console.log(id)

    this.banerService.getBarrnerByid(id).subscribe(value =>{ // traigo el banner por su id
      this.banner = value;
      this.imagenLink= this.banner.imagenLink;  // la variable "imagenLink" va tener el valor del objeto  "this.banner.imagenLink"
      // console.log(this.banner);
      // console.log(this.imagenLink);
    },err =>{
      console.log(err.error);
      Swal.fire({
        title: "Error",
        text: err.error.msg ,
        icon:"error",
      })
      this.router.navigate([""]); // si hay un error me va a redirigir al home.html
    });

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

  modifyBanner():any{ // funcion para modificar la imagen del banner
    const{imagenLink} = this; // traigo la variable que utilice en formulario
    this.banner.imagenLink = imagenLink; // el objeto "this.banner.imagenLink " va tener el valor el valor de "imagenLink"
    // console.log(this.banner);
    if(Object.values(this.errores).filter(el=>el !== "" ).length >0 ){
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      })
      // return alert("Observa los errores que estan en color rojo!");
    }
    Swal.fire({
      title: "Espere",
      text: "Espere un momento por favor..." ,
      icon:"info",
    })
    this.banerService.putBanner(this.banner).subscribe(value =>{ // utilizo el servicio para modificar el banner
      // console.log(value);
      this.router.navigate([""]) // me redirijo al "home.html" si se modifico el banner
      return Swal.fire({
        title:"Banner editado",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    },err=>{
      console.log(err.error)
      return Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      });
    })
  }



}
