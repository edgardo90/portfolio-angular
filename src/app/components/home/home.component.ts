import { Component, OnInit } from '@angular/core';
//
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Banner} from "../../interfaces/interface-barr";
import {BannerService} from "../../service/banner.service";
import {Persona} from "../../interfaces/interface-persona";
import {PersonaService} from "../../service/persona.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner:Banner[]=[];
  persona:Persona[] = [];
  loading: string = "Cargando..." // esto me va servir para que aparezca el gif cargando... , si hay un string se va activar el gif caso contrarip el gif se va a descastivar
  activado: boolean = false // esto es un ejemplo de que mando el value de esta varible a persona.component y a otros componentes para mostrar los botones de editar y eleminar

  constructor( private bannerService: BannerService , private personaService:PersonaService ) { }

  ngOnInit(): void {
    this.bannerService.getAllBanners().subscribe(value =>{ // llamo el service para traer todas los banners
      this.banner = value;
      this.banner = this.banner.filter(el => el.userName === "bade86") // va traer solamente el el.userName = "edgardo90"
      console.log(this.banner);
    }, err=>{
      console.log(err.error);
    });

    this.personaService.getAllPersons().subscribe(value =>{ // llamo el service para traer todas las personas
      this.persona = value;
      this.persona = this.persona.filter(el => el.userName === "bade86")
      console.log(this.persona);
    } , err=>{
      console.log(err.error);
    })

    setTimeout(() => this.loading= ""  ,8000 ); // cuando pase ese tiempo setea a un string vacio 
  }


  deletedPersonakFront(persona:Persona){ // funcion para eleminar la persona
    const option = window.confirm("Estas seguro de eleminar  ?"); // una alerta que si es "si" option va ser true sino va ser false
    if(option){
      this.personaService.deletedPerson(persona).subscribe(() => {
        this.persona = this.persona.filter(el => el.id !== persona.id);
      },err =>{
        console.log(err.error)
      });
      alert("eleminado con exito")
    }
  }

  deletedBannerFront(bann: Banner){ // funcion para eleminar el banner
    const option = window.confirm("Estas seguro de eleminar  ?"); // una alerta que si es "si" option va ser true sino va ser false
    if(option){
      this.bannerService.deletedBanner(bann).subscribe(() => {
        this.banner = this.banner.filter(el => el.id !== bann.id);
      },err =>{
        console.log(err.error)
      });
      alert("eleminado con exito")
    }
  }



  cambio(){ //funcion para cambiar el estado de "cambio"
    if(this.activado){
      this.activado = false
    }else{
      this.activado= true
    }
    console.log(this.activado)
  }

}
