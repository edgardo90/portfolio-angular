import { Component, OnInit } from '@angular/core';
//
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

  errores:Errores={};// esto sirve para controlar el formulario

  constructor(private experienceService: ExperienceService , private router: Router , private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio 

    const id = this.activatedRouter.snapshot.params["id"];
    // console.log(id);

    this.experienceService.getExperienceByid(id).subscribe(value=>{
      this.exp = value;
      console.log(this.exp)
      const{title , companyName , dateStart , dateEnd , logoCompany , description} = this.exp
      this.title = title;
      this.companyName = companyName;
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.logoCompany = logoCompany;
      this.description = description;
    } , err=>{
      console.log(err.error);
      alert(err.error.msg);
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


  modifyExperience():void{ // funcion para modificar el about
    const id = this.activatedRouter.snapshot.params["id"];
    const {title , companyName , dateStart , dateEnd , logoCompany , description,} = this;
    this.exp = {title , companyName , dateStart , dateEnd , logoCompany , description, id};
    // console.log(this.exp);
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return alert("Observa los errores que estan en color rojo!")
    }
    this.experienceService.putExperience(this.exp).subscribe(value =>{ // utilizo el service que cree para modificar el about
      console.log(value);
      alert("Se modifco la experiencia");
      this.router.navigate([""]);
    }, err=>{
      console.log(err.error);
    })
  }



}
