import { Component, OnInit ,   Input , Output , EventEmitter  } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Experience} from "../../interfaces/interface-experience";
import {ExperienceService} from "../../service/experience.service";


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  exper: Experience[]=[];
  @Input() activate!: boolean;


  constructor( private experienceService: ExperienceService) { }

  ngOnInit(): void {
    this.experienceService.getAllExperience().subscribe(value=>{ // voy a traer todas las experiencias
      this.exper = value;
      this.exper = this.exper.filter(el => el.userName === "edgardo90"); // traigo las experiencias solamente de "edgardo90"
      this.exper = this.exper.sort(function(a,b){ // ordeno las experiencias por su fecha
        if(new Date(a.dateStart) > new Date(b.dateStart) ){
          return -1
        }
        if(new Date(a.dateStart) < new Date(b.dateStart) ){
          return 1
        }
        return 0
      });
      this.exper = this.exper.map(el =>{ // hago un map para cambiar el orden que se va ver las fechas
        el.dateStart = el.dateStart.split("-").reverse().join("/"); 
        el.dateEnd = el.dateEnd.split("-").reverse().join("/");
        // console.log(new Date(el.dateStart))
        return el;
      });
      // console.log(this.exper)
    } , err=>{
      console.log(err.error);
    })
  }

  deletedExperience(exp:Experience):any{ // funcion para eleminar una experiencia
    // console.log(exp);
    Swal.fire({
      title: 'Confirmar elminacion de experiencia',
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
        this.experienceService.deletedExperience(exp).subscribe(()=>{
          this.exper = this.exper.filter(el => el.id !== exp.id );
          return Swal.fire({
            title:"Experiencia eleminado",
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


}
