import { Component, OnInit } from '@angular/core';
//
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Skill , Errores} from "../../../interfaces/interface-skill";
import {SkillService} from "../../../service/skill.service";

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {

  loading: string = "Cargando"

  name:string = ""
  percentage!: number;
  colorName:string = "";
  colorpercentage: string = "#175d9c";
  colorCircle: string = "#20a8d8";
  userName:string="edgardo90";

  skill!:Skill;

  errores:Errores={};
  

  constructor(private router: Router , private skillService: SkillService ) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio
  }

  checkErrors(){
    // console.log(this.name)
    // console.log(this.percentage)
    // console.log(this.colorTitle)
  }

  createSkill(){
    const {name , percentage , colorName , colorpercentage , colorCircle , userName} = this;
    this.skill = {name,percentage,colorName , colorpercentage , colorCircle , userName};
    // console.log(this.skill)
    if(Object.values(this.errores).filter(el=>el !== "" ).length >0 ){
      return alert("Observa los errores que estan en color rojo!")
    }
    this.skillService.postSkill(this.skill).subscribe(value=>{ // utilizo el sercvicio que cree para crear el skill
      // console.log(value);
      alert("New skill created");
      this.router.navigate([""]);
    }, err=>{
      console.log(err.error);
      alert(err.error.msg); // voy a mostrar la alerta
    })
  }

}
