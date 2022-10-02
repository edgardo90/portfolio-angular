import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router, ActivatedRoute } from '@angular/router'; // esto seria como el navigate de react
import {Experience , Errores} from "../../../interfaces/interface-experience";
import {ExperienceService } from "../../../service/experience.service";

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  loading: string = "Cargando..."

  title:string="";
  companyName:string="";
  dateStart:string="";
  dateEnd:string="";
  logoCompany:string="";
  description:string="";
  userName:string="edgardo90";

  exp!:Experience

  experienceLoading:object[] =[]

  errores:Errores={};// esto sirve para controlar el formulario

  constructor(private experienceService: ExperienceService , private router: Router , private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    // setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio 

    const id = this.activatedRouter.snapshot.params["id"];
    // console.log(id);

    this.experienceService.getExperienceByid(id).subscribe(value=>{
      this.exp = value;
      // console.log(this.exp)
      const{title , companyName , dateStart , dateEnd , logoCompany , description} = this.exp
      this.title = title;
      this.companyName = companyName;
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.logoCompany = logoCompany;
      this.description = description;
      this.experienceLoading.push(this.exp);
    } , err=>{
      console.log(err.error);
      Swal.fire({
        title: "Error",
        text: err.error.msg ,
        icon:"error",
      })
      this.router.navigate([""]);
    });
  }

  

  resetImagen(){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    this.logoCompany=""
  }


  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.title)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
   if(!regex.test(this.title)){
      this.errores.title = "tienes que ingresar el titulo"
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


  modifyExperience():any{ // funcion para modificar el about
    const id = this.activatedRouter.snapshot.params["id"];
    const {title , companyName , dateStart , dateEnd , logoCompany , description,} = this;
    this.exp = {title , companyName , dateStart , dateEnd , logoCompany , description, id};
    // console.log(this.exp);
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
      showConfirmButton: false ,
    })
    this.experienceService.putExperience(this.exp).subscribe(value =>{ // utilizo el service que cree para modificar el about
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Se modifco la experiencia",
        icon:"success",
        confirmButtonText:"Continuar"
      })
      // alert("Se modifco la experiencia");
    }, err=>{
      console.log(err.error);
      return Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      });
    })
  }



}
