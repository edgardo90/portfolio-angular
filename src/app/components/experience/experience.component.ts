import { Component, OnInit ,   Input , Output , EventEmitter  } from '@angular/core';
//
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

  deletedExperience(exp:Experience){ // funcion para eleminar una experiencia
    // console.log(exp);
    const option = window.confirm("Estas seguro de eliminar ?");
    if(option){
      this.experienceService.deletedExperience(exp).subscribe(()=>{
        this.exper = this.exper.filter(el => el.id !== exp.id)
      }, err=>{
        console.log(err.error)
      });
      alert("eleminado con exito")
    }
  }


}
