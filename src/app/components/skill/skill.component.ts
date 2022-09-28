import { Component, OnInit , Input , Output , EventEmitter  } from '@angular/core';
//
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
    console.log(skill);
    const option = window.confirm("Estas seguro de eliminar ?");
    if(option){
      this.skillService.deletedSkill(skill).subscribe(()=>{
        this.skills = this.skills.filter(el => el.id !== skill.id)
      }, err=>{
        console.log(err.error)
      });
      alert("eleminado con exito")
    }
  }



}
