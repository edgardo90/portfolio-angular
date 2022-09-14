import { Component, OnInit , Input , Output , EventEmitter  } from '@angular/core';
//
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Education} from "../../interfaces/interface-education";
import {EducationService} from "../../service/education.service";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educations: Education[] = [];
  @Input() activate!: boolean;

  constructor( private educationService: EducationService) { }

  ngOnInit(): void {
    this.educationService.getAllEducation().subscribe(value=>{
      this.educations = value;
      this.educations = this.educations.filter(el=> el.userName === "edgardo90");
      this.educations = this.educations.sort(function(a,b){ // ordeno las experiencias por su fecha
        if(new Date(a.startDate) > new Date(b.startDate) ){
          return -1
        }
        if(new Date(a.startDate) < new Date(b.startDate) ){
          return 1
        }
        return 0
      });
      this.educations = this.educations.map(el =>{ // hago un map para cambiar el orden que se va ver las fechas
        el.startDate = el.startDate.split("-").reverse().join("/"); 
        el.endDate = el.endDate.split("-").reverse().join("/");
        // console.log(new Date(el.startDate))
        return el;
      });
      console.log(this.educations)
    }, err=>{
      console.log(err.error)
    })
  }

  deletedEducation(education:Education){ // funcion para eleminar una education
    console.log(education);
    const option = window.confirm("Estas seguro de eliminar ?");
    if(option){
      this.educationService.deletedEducation(education).subscribe(()=>{
        this.educations = this.educations.filter(el => el.id !== education.id)
      }, err=>{
        console.log(err.error)
      });
      alert("eleminado con exito")
    }
  }



}
