import { Component, OnInit } from '@angular/core';
//
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import {Persona , Errores} from "../../../interfaces/interface-persona";
import {PersonaService} from "../../../service/persona.service"

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {
  person!:Persona;

  name:string = "" ;
  surname:string="";
  imagen:string="";
  phone:string="";
  email:string = "" ;
  country:string="";

  errores:Errores={} // esto sirve para controlar el formulario




  constructor(private router: Router ,private activatedRouter : ActivatedRoute,  private personaService: PersonaService ) { 
    
  }


  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params["id"]
    // console.log(id)

    this.personaService.getPersonaByid(id).subscribe(value=>{
      this.person = value;
      // console.log(this.person)
      const {name , surname , phone , imagen , email , country } = this.person
      this.name = name;
      this.surname = surname;
      this.phone = phone;
      this.imagen = imagen ;
      this.email = email ;
      this.country = country
    }, err =>{
      console.log(err.error);
      alert(err.error.msg);
      this.router.navigate([""]);
    });
  }

  chekErrores(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.name)
    // console.log(this.phone)
    const regexString = /[A-Z]+$/i;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPhone = /[0-9]+$/i; ;
    const regexImagen = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ ;
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
    }else if(!regexString.test(this.country)){
      this.errores.country = "solo tiene que ser letras";
    }else{
      this.errores.country= ""
    }


  }

  resetImagen(){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    this.imagen=""
  }


  modifyPerson():void{
    const id = this.activatedRouter.snapshot.params["id"];
    const {name, surname, phone , imagen , email , country } = this;
    this.person = {name , surname , phone , imagen ,email , country, id};
    // console.log(this.person);
    // console.log(Object.values(this.errores).filter(el => el !== "" ))
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return alert("Observa los errores que estan en color rojo!")
    }
    this.personaService.putPersona(this.person).subscribe(value=>{
      console.log(value);
      alert("se modifico el banner con exito")
      this.router.navigate([""]);
    },err=>{
      console.log(err.error)
    })
  }

}
