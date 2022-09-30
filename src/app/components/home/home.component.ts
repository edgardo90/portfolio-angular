import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Banner} from "../../interfaces/interface-barr";
import {BannerService} from "../../service/banner.service";
import {Persona} from "../../interfaces/interface-persona";
import {PersonaService} from "../../service/persona.service";
import {About} from "../../interfaces/interface-about";//
import {AboutService} from "../../service/about.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner:Banner[]=[];
  persona:Persona[] = [];
  about:About[] = [];
  loading: string = "Cargando..." // esto me va servir para que aparezca el gif cargando... , si hay un string se va activar el gif caso contrarip el gif se va a descastivar
  activado: boolean = false // esto es un ejemplo de que mando el value de esta varible a persona.component y a otros componentes para mostrar los botones de editar y eleminar

  constructor( private bannerService: BannerService , private personaService:PersonaService , private aboutService:AboutService ) { }

  ngOnInit(): void {
    this.bannerService.getAllBanners().subscribe(value =>{ // llamo el service para traer todas los banners
      this.banner = value;
      this.banner = this.banner.filter(el => el.userName === "edgardo90") // va traer solamente el el.userName = "edgardo90"
      // console.log(this.banner);
    }, err=>{
      console.log(err.error);
    });

    this.personaService.getAllPersons().subscribe(value =>{ // llamo el service para traer todas las personas
      this.persona = value;
      this.persona = this.persona.filter(el => el.userName === "edgardo90");
      // console.log(this.persona);
    } , err=>{
      console.log(err.error);
    });

    this.aboutService.getAllAbout().subscribe(value =>{ // traigo todos los about
      this.about=value;
      this.about = this.about.filter(el => el.userName === "edgardo90");
      // console.log(this.about);
    }, err=>{
      console.log(err.error);
    });


    setTimeout(() => this.loading= ""  ,8000 ); // cuando pase ese tiempo setea a un string vacio 
  }


  deletedPersonakFront(persona:Persona){ // funcion para eleminar la persona
    // console.log(bann);
    Swal.fire({
      title: 'Confirmar elminacion de persona',
      text: "¿Estás seguro que deseas eliminarlo?",
      icon: 'warning',
      showCancelButton: true, // muestro el button para cancel
      reverseButtons: true, // cambio el sentido que va a mostrar los botones de "cancelar" y de "ok"
      confirmButtonText: 'Si', // nombre del button ok
      confirmButtonColor: "#04ec84", // cambia el color del button confirm
      // color:"red",
      cancelButtonText: "Cancelar" // name del button de cancel
    }).then((result)=>{
      if(result.value){
        this.personaService.deletedPerson(persona).subscribe(()=>{
          this.persona = this.persona.filter(el => el.id !== persona.id );
          return Swal.fire({
            title:"persona eleminado",
            icon:"success",
            confirmButtonText:"Continuar"
          })
        },err=>{
          console.log(err.error);
          return Swal.fire({
            title: "Error",
            text: "Ups hubo un error!",
            icon:"error",
          })
        })
      }
    })
  }

  deletedBannerFront(bann: Banner){ // funcion para eleminar el banner
    // console.log(bann);
    Swal.fire({
      title: 'Confirmar elminacion banner',
      text: "¿Estás seguro que deseas eliminarlo?",
      icon: 'warning',
      showCancelButton: true, // muestro el button para cancel
      reverseButtons: true, // cambio el sentido que va a mostrar los botones de "cancelar" y de "ok"
      confirmButtonText: 'Si', // nombre del button ok
      confirmButtonColor: "#04ec84", // cambia el color del button confirm
      // color:"red",
      cancelButtonText: "Cancelar" // name del button de cancel
    }).then((result)=>{
      if(result.value){
        this.bannerService.deletedBanner(bann).subscribe(()=>{
          this.banner = this.banner.filter(el => el.id !== bann.id );
          return Swal.fire({
            title:"Banner eleminado",
            icon:"success",
            confirmButtonText:"Continuar"
          })
        },err=>{
          console.log(err.error);
          return Swal.fire({
            title: "Error",
            text: "Ups hubo un error!",
            icon:"error",
          })
        })
      }
    })
  }

  deletedAboutFront(about: About){ // funcion para eleminar el About
    const option = window.confirm("Estas seguro de eleminar  ?"); // una alerta que si es "si" option va ser true sino va ser false
    if(option){
      this.aboutService.deletedAbout(about).subscribe(() => {
        this.about = this.about.filter(el => el.id !== about.id);
      },err =>{
        console.log(err.error)
      });
      alert("eleminado con exito")
    }
  }



  cambio(){ //funcion para cambiar el estado de la variable "activado"
    if(this.activado){
      this.activado = false
    }else{
      this.activado= true
    }
    console.log(this.activado)
  }

}
