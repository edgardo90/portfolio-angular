import { Component, OnInit , Input , Output , EventEmitter  } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Skill} from "../../interfaces/interface-skill";
import {SkillService} from "../../service/skill.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() activate!: boolean;
  // msj:string = "hola"; // esto es una prueba
  skills: Skill[] = []

  constructor(private skillService: SkillService ) { }

  ngOnInit(): void {
    this.skillService.getAllSkill().subscribe(value=>{
      this.skills = value;
      this.skills = this.skills.filter(el => el.userName === "edgardo90");
      // console.log(this.skills);
    }, err =>{
      console.log(err.error)
    });
  }


  deletedSkill(skill:Skill){ // funcion para eleminar one skill
    // console.log(skill);
    Swal.fire({
      title: 'Confirmar elminacion de skill',
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
        this.skillService.deletedSkill(skill).subscribe(()=>{
          this.skills = this.skills.filter(el => el.id !== skill.id );
          return Swal.fire({
            title:"Skill eleminado",
            icon:"success",
            confirmButtonText:"Continuar",
          })
        },err=>{
          console.log(err.error);
          return Swal.fire({
            title: "Error",
            text: "Ups hubo un error!",
            icon:"error",
          });
        });
      }
    });
  }



}
