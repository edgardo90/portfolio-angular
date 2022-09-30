import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Education , Errores} from "../../../interfaces/interface-education";
import {EducationService} from "../../../service/education.service";

@Component({
  selector: 'app-create-education',
  templateUrl: './create-education.component.html',
  styleUrls: ['./create-education.component.css']
})
export class CreateEducationComponent implements OnInit {

  loading: string = "Cargando"

  institution:string = "";
  titleName:string = "";
  startDate:string = "";
  endDate:string = "";
  description:string = "";
  institutionLogo:string = "";
  certificateLink:string = "";
  userName:string="edgardo90";

  education!:Education;

  errores:Errores={};// esto sirve para controlar el formulario

  constructor( private router: Router , private educationService: EducationService) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio
  }

  resetImagen(){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    this.institutionLogo="" ;
  }
  resetCertificate(){
    this.certificateLink = "";
  }

  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.title)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
   if(!regex.test(this.institution)){
      this.errores.institution = "tienes que ingresar nombre de la institucion"
    }else{
      this.errores.institution=""
    };

    if(!regex.test(this.titleName)){
      this.errores.titleName= "tienes que ingresar el nombre del titulo"
    }else{
      this.errores.titleName=""
    };

    if(!regex.test(this.startDate)){
      this.errores.startDate= "tienes que ingresar la fecha"
    }else{
      this.errores.startDate=""
    };

    if(!regex.test(this.description)){
      this.errores.description= "tienes que ingresar una descripcion del puesto"
    }else{
      this.errores.description=""
    };

    // if( this.institutionLogo.length > 0 && !this.institutionLogo.includes("https://") ){ // forma antigua de controlar el formulario
    if( this.institutionLogo.length > 0 && this.institutionLogo.split("//")[0] !== "https:" ){  
      this.errores.institutionLogo = "el link de la imagen no es valido";
    }else{
      this.errores.institutionLogo = "";
    };
    // console.log(this.institutionLogo.split("//")[0] === "https:")

    if( this.certificateLink.length > 0 && this.certificateLink.split("//")[0] !== "https:" ){  
      this.errores.certificateLink = "el link del certificado no es valido";
    }else{
      this.errores.certificateLink = "";
    };

  }

  createEducation():any{
    const {institution , titleName , startDate , endDate  , description , institutionLogo, certificateLink , userName} = this;
    this.education = {institution , titleName , startDate , endDate  , description , institutionLogo, certificateLink , userName};
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
    this.educationService.postEducation(this.education).subscribe(value =>{
      console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Nueva educacion creada",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error)
    })
  }

}
