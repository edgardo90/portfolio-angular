import { Component, OnInit } from '@angular/core';
//
import { Router } from '@angular/router'; // esto seria como el navigate de react
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import {AuthService} from "../../service/auth.service";
import {NewUser , Errores} from "../../interfaces/interface-newUser"

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  loading: string = "";

  newUser:NewUser = {
    name :"",
    userName:"",
    email:"",
    password:"",
  }

  errores:Errores={} // esto sirve para controlar el formulario



  constructor( private router:Router , private authService :AuthService ) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,500 ); // cuando pase ese tiempo setea a un string vacio
  }

  resetInput(value:any){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    // console.log(value);
    if(value === this.newUser.name){
      this.newUser.name = "";
    }
    if(value === this.newUser.userName){
      this.newUser.userName = "";
    }
    if(value === this.newUser.email){
      this.newUser.email = "";
    }
    if(value === this.newUser.password){
      this.newUser.password = "" ;
    }
  }

  checkErrors(){
    // console.log(this.newUser);
    // const regexString = /[A-Z]+$/i;
    const regexString = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(this.newUser.name.length >0 &&  !regexString.test(this.newUser.name) ){
      this.errores.name="solo tiene que ser letras y sin espacios";
    }else if(this.newUser.name.length > 17){
      this.errores.name="tiene que ser menor de 15 caracteres";
    }else{
      this.errores.name="";
    }

    if(this.newUser.userName.length > 0 && this.newUser.userName.split("").includes(" ")){
      this.errores.userName = "el nombre de usuario no tiene que tener espacio"
    }else if(this.newUser.userName.length > 11){
      this.errores.userName = "el nombre de usuario tiene ser menor de 11 caracteres"
    }else{
      this.errores.userName = ""
    }

    if(this.newUser.email.length > 0 &&  !regexEmail.test(this.newUser.email)){
      this.errores.email = "el email ingresado no es valido";
    }else{
      this.errores.email="";
    }
    
    if(this.newUser.password.split("").includes(" ")){
      this.errores.password = "la contraseña no tiene que tener espacio"
    }else if(this.newUser.password.length > 0 && this.newUser.password.length < 7 ){
      this.errores.password = "tiene que ser mayor de 7 caracteres"
    }else{
      this.errores.password = ""
    }
  }


  createUser():any{ // funcion para crear un nuevo usuario
    // console.log(this.newUser);
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      });
    }
    Swal.fire({
      title: "Espere",
      text: "Espere un momento por favor..." ,
      icon:"info",
      showConfirmButton: false ,
    });
    this.authService.postNewUser(this.newUser).subscribe(value =>{
      this.router.navigate([""]) // vuelvo a esta ruta cuando se crea el usuario
      return Swal.fire({
        title:"Usuario creado!",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    } , err =>{
      const errMsj = err.error.msg;
      console.log(err.error);
      if(errMsj){
        return Swal.fire({
          title: "Error",
          text: err.error.msg,
          icon:"error",
        });
      }
      return Swal.fire({
        title: "Error",
        text: "Ups hubo un error",
        icon:"error",
      });
    });
  }

}
