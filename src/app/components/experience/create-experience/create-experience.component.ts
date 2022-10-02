import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Experience , Errores} from "../../../interfaces/interface-experience";
import {ExperienceService } from "../../../service/experience.service";

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.css']
})
export class CreateExperienceComponent implements OnInit {

  loading: string = "Cargando..."

  title:string="";
  companyName:string="";
  dateStart:string="";
  dateEnd:string="";
  logoCompany:string="";
  description:string="";
  userName:string="edgardo90";

  exp!:Experience

  errores:Errores={};// esto sirve para controlar el formulario

  constructor(private experienceService: ExperienceService , private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio 
  }

  resetImagen(){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    this.logoCompany=""
  }

  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.title)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
   if(!regex.test(this.title)){
      this.errores.title = "tienes que ingresar el titulo"
    }else if(this.title.length > 80){
      this.errores.title= "titulo demaciado largo"
    }else{
      this.errores.title=""
    };

    if(!regex.test(this.companyName)){
      this.errores.companyName= "tienes que ingresar el nombre de la empresa"
    }else{
      this.errores.companyName=""
    };

    if(!regex.test(this.dateStart)){
      this.errores.dateStart= "tienes que ingresar la fecha"
    }else{
      this.errores.dateStart=""
    };

    if(!regex.test(this.description)){
      this.errores.description= "tienes que ingresar una descripcion del puesto"
    }else{
      this.errores.description=""
    }

  }

  createExperience():any{
    const { title , companyName ,dateStart , dateEnd , logoCompany , description , userName} = this;
    this.exp = {title, companyName, dateStart , dateEnd, logoCompany ,description, userName};
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      })
      // return alert("Observa los errores que estan en color rojo!")
    }
    Swal.fire({
      title: "Espere",
      text: "Espere un momento por favor..." ,
      icon:"info",
      showConfirmButton: false, // le saco el button de confirmar"ok"
    })
    this.experienceService.postExperience(this.exp).subscribe(value =>{
      console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Experiencia creada",
        icon:"success",
        confirmButtonText:"Continuar"
      })
      // alert("Nueva experiencia creada");
    }, err=>{
      console.log(err.error)
      return Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      });
    })
  }

}
