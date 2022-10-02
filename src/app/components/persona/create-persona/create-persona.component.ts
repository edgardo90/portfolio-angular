import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import {Persona , Errores} from "../../../interfaces/interface-persona";
import {PersonaService} from "../../../service/persona.service"

@Component({
  selector: 'app-crete-persona',
  templateUrl: './create-persona.component.html',
  styleUrls: ['./create-persona.component.css']
})
export class CretePersonaComponent implements OnInit {

  loading: string = "Cargando...";

  person!:Persona;

  name:string = "" ;
  surname:string="";
  imagen:string="";
  phone:string="";
  email:string = "" ;
  country:string="";
  userName:string="edgardo90";

  errores:Errores={} // esto sirve para controlar el formulario

  constructor(private router: Router ,private activatedRouter : ActivatedRoute,  private personaService: PersonaService ) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio 
  }

  chekErrores(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.name)
    // console.log(this.phone)
    const regexString = /[A-Z]+$/i;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPhone = /[0-9]+$/i; ;
    const regexImagen = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ ;
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
    if(!this.name){
      this.errores.name = "tienes que ingresa un nombre";
    }else if(!regexString.test(this.name) || this.name.split("").includes(" ")  ){
      this.errores.name="solo tiene que ser letras y sin espacios";
    }else{
      this.errores.name="";
    };

    if(!this.surname){
      this.errores.surname = "tienes que ingresa un apellido";
    }else if(!regexString.test(this.surname) || this.surname.split("").includes(" ")  ){
      this.errores.surname="solo tiene que ser letras y sin espacios";
    }else{
      this.errores.surname="";
    };

    if(!this.phone){
      this.errores.phone = "tienes que ingresar un numero de telefono";
    }else if(!regexPhone.test(this.phone)){
      this.errores.phone= "ingresa un numero telefono valido";
    }else{
      this.errores.phone = "";
    };

    if(!this.imagen){
      this.errores.imagen="tienes que ingresar una url para la imagen";
    }else if(!this.imagen.includes("https://")){
      this.errores.imagen = "el link de la imagen no es valido";
    }else{
      this.errores.imagen="";
    };

    if(!this.email){
      this.errores.email = "tienes que ingresar un email";
    }else if(!regexEmail.test(this.email)){
      this.errores.email = "el email ingresado no es valido";
    }else{
      this.errores.email="";
    };

    if(!this.country){
      this.errores.country= "tienes que ingresar un pais";
    }else if(!regex.test(this.country)){
      this.errores.country = "solo tiene que ser letras";
    }else{
      this.errores.country= ""
    }
  }

  resetImagen(){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    this.imagen=""
  }

  createPerson():any{
    const {name , surname , imagen , phone , email , country , userName} = this ;
    this.person = {name , surname , imagen , phone , email, country , userName};
    // console.log(this.person);
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
    this.personaService.postPersona(this.person).subscribe(value=>{
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Persona creada",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error);
      return Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      });
    });
  }


}
