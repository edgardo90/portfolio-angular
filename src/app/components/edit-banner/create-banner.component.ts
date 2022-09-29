//component para modificar el banner
import { Component, OnInit } from '@angular/core';
//
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import {BannerService } from "../../service/banner.service";
import {Banner, Errores} from "../../interfaces/interface-barr";

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {
  
  banner!:Banner;
  imagenLink:string = ""; // variable que voy a utilizar para el formulario
  errores:Errores={} // esto sirve para controlar el formulario



  constructor(private router: Router, private activatedRouter : ActivatedRoute, private banerService:BannerService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id']; // traigo el id que viene por parms y lo guardo en una variable
    // console.log(id)

    this.banerService.getBarrnerByid(id).subscribe(value =>{ // traigo el banner por su id
      this.banner = value;
      this.imagenLink= this.banner.imagenLink;  // la variable "imagenLink" va tener el valor del objeto  "this.banner.imagenLink"
      // console.log(this.banner);
      // console.log(this.imagenLink);
    },err =>{
      console.log(err.error);
      alert(err.error.msg);
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

  modifyBanner():void{ // funcion para modificar la imagen del banner
    const{imagenLink} = this; // traigo la variable que utilice en formulario
    this.banner.imagenLink = imagenLink; // el objeto "this.banner.imagenLink " va tener el valor el valor de "imagenLink"
    // console.log(this.banner);
    if(Object.values(this.errores).filter(el=>el !== "" ).length >0 ){
      return alert("Observa los errores que estan en color rojo!")
    }
    this.banerService.putBanner(this.banner).subscribe(value =>{ // utilizo el servicio para modificar el banner
      // console.log(value);
      alert("se modifico el banner con exito");
      this.router.navigate([""]) // me redirijo al "home.html" si se modifico el banner
    },err=>{
      console.log(err.error)
    })
  }



}
