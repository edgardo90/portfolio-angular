import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
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
  percentage: number = 0;
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
    // console.log(this.name);
    // console.log(this.percentage);
    // console.log(this.colorTitle);
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
    if(regex.test(this.name)){
      this.errores.name = "";
    }else{
      this.errores.name = "Ingresa el titulo";
    }

    if(this.percentage <= 0 || this.percentage > 100 ){
      this.errores.percentage = "tiene que ser mayor a 0 y menor que 100";
    }else{
      this.errores.percentage = "";
    }
  }


  createSkill():any{
    const {name , percentage , colorName , colorpercentage , colorCircle , userName} = this;
    this.skill = {name,percentage,colorName , colorpercentage , colorCircle , userName};
    // console.log(this.skill)
    if(Object.values(this.errores).filter(el=>el !== "" ).length >0 ){
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
      showConfirmButton: false, // le saco el button de confirmar"ok"
    })
    this.skillService.postSkill(this.skill).subscribe(value=>{ // utilizo el sercvicio que cree para crear el skill
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"New skill created",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error);
      // alert(err.error.msg); // voy a mostrar la alerta
      return Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      });
    });
  }


}
