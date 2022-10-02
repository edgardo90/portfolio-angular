import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import{AboutService} from "../../../service/about.service";
import {About ,Errores} from "../../../interfaces/interface-about"

@Component({
  selector: 'app-create-about',
  templateUrl: './create-about.component.html',
  styleUrls: ['./create-about.component.css']
})
export class CreateAboutComponent implements OnInit {

  loading: string = "Cargando..."

  about!:About;

  title:string="";
  summary:string="";
  userName:string="edgardo90";

  errores:Errores={};// esto sirve para controlar el formulario

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private aboutService: AboutService) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio
  }

  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.title)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
   if(!regex.test(this.title)){
      this.errores.title = "tienes que ingresar el titulo"
    }else if(this.title.length > 45){
      this.errores.title= "titulo demaciado largo"
    }else{
      this.errores.title=""
    };

    if(!regex.test(this.summary)){
      this.errores.summary= "tienes que ingresar el resumen"
    }else{
      this.errores.summary=""
    }
  }

  createAbout():any{ // funcion para crear el about
    const{title ,summary ,userName} = this; // traigo la variable que utilice en formulario
    this.about = {title , summary,userName}; // 
    // console.log(this.about);
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      })
      // return alert("Observa los errores que estan en color rojo!"); // esto lo dejo para que funcione el Swal.fire con el return
    }
    Swal.fire({
      title: "Espere",
      text: "Espere un momento por favor..." ,
      icon:"info",
    })
    this.aboutService.postAbout(this.about).subscribe(value=>{
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"About creado",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error)
      return Swal.fire({
        title: "Error",
        text: err.error.msg ,
        icon:"error",
      });
    })
  }

}
