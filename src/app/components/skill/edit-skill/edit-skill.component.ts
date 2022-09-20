import { Component, OnInit } from '@angular/core';
//
import { Router, ActivatedRoute } from '@angular/router'; // esto seria como el navigate de react
import {Skill , Errores} from "../../../interfaces/interface-skill";
import {SkillService} from "../../../service/skill.service";

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  loading: string = "Cargando"

  name:string = ""
  percentage!: number;
  colorName:string = "";
  colorpercentage: string = "#175d9c";
  colorCircle: string = "#20a8d8";
  userName:string="edgardo90";

  skill!:Skill;

  errores:Errores={};

  constructor(private activatedRouter : ActivatedRoute , private router: Router, private skillService: SkillService) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio
    const id = this.activatedRouter.snapshot.params["id"];
    // console.log(id);

    this.skillService.getSkillByid(id).subscribe(value=>{
      this.skill = value;
      const{name , percentage , colorName , colorpercentage , colorCircle} = this.skill;
      this.name = name;
      this.percentage = percentage;
      this.colorName = colorName;
      this.colorpercentage = colorpercentage;
      this.colorCircle = colorCircle;
      // console.log(this.skill);
    }, err=>{
      console.log(err.error);
      alert(err.error.msg);
      this.router.navigate([""]);
    })
  }

  checkErrors(){
    // console.log(this.name)
    // console.log(this.percentage)
    // console.log(this.colorTitle)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
    if(regex.test(this.name)){
      this.errores.name = ""
    }else{
      this.errores.name = "Ingresa el titulo"
    }

    if(this.percentage <= 0 || this.percentage > 100 ){
      this.errores.percentage = "tiene que ser mayor a 0 y menor que 100"
    }else{
      this.errores.percentage = ""
    }

  }

  modifySkill(){
    const id = this.activatedRouter.snapshot.params["id"];
    const {name , percentage , colorName , colorCircle , colorpercentage} = this;
    this.skill = {name,percentage,colorName,colorCircle,colorpercentage,id};
    // console.log(this.skill);
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){
      alert("Observa los errores que estan en color rojo!");
    };
    this.skillService.putSkill(this.skill).subscribe(value=>{
      // console.log(value);
      alert("Se modifico skill");
      this.router.navigate([""]);
    }, err =>{
      console.log(err.error);
      alert(err.error.msg)
    })
  }

}
