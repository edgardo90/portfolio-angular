import { Component, OnInit } from '@angular/core';
//
import { Router } from '@angular/router'; // esto seria como el navigate de react
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import{LoginUser , Errores} from "../../interfaces/interface-login";
import {AuthService} from "../../service/auth.service";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUser; // como no va estar inicializado le pongo un singo de admiracion

  userName: string =""
  password : string = ""
  roles: string[] = [];

  loading: string = ""

  errores:Errores={} // esto sirve para controlar el formulario

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,400 ); // cuando pase ese tiempo setea a un string vacio
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    } 
  }

  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    const regexString = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(this.userName.length > 0 && this.userName.split("").includes(" ")){
      this.errores.userName = "el nombre de usuario no tiene que tener espacio"
    }else{
      this.errores.userName = ""
    }

    if(this.password.split("").includes(" ")){
      this.errores.password = "la contraseña no tiene que tener espacio"
    }else if(this.password.length > 0 && this.password.length < 7 ){
      this.errores.password = "tiene que ser mayor de 7 caracteres"
    }else{
      this.errores.password = ""
    }
  }

  onLogin():any{
    const {userName , password} = this;
    const login = {userName , password} ;
    this.loginUsuario = login;
    // console.log(this.loginUsuario)
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
    this.authService.postLogin(this.loginUsuario).subscribe(data =>{
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate([''])// navego a la ruta "/tasks" que es el componente task2.componets
      // return alert("Ingreso con exito")
      return Swal.fire({
        title:"Ingreso con exito",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err =>{
      this.isLogged = false;
      this.isLogginFail = true;
      const errMsj = err.error.msg ; // err.error.msg es donde esta el string con el error
      console.log(err.error); // veo en formato de objeto los errores
      if(errMsj){
        return Swal.fire({
          title: "Error",
          text: err.error.msg,
          icon:"error",
        });
      }
      return Swal.fire({
        title: "Error",
        text: "Usuario o contraeña es incorrecto",
        icon:"error",
      });
      // return alert("Usuario o contraeña es incorrecto")
    });
  }
  

}
