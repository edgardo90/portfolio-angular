import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router, ActivatedRoute } from '@angular/router'; // esto seria como el navigate de react
import {Project , Errores} from "../../../interfaces/interface-project";
import {ProjectService} from "../../../service/project.service";

@Component({
  selector: 'app-edit-proyeject',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProyejectComponent implements OnInit {

  loading: string = "Cargando"

  project:Project = { title: "" , 
   image: "", 
   description:"" , 
   linkFront:"" , 
   linkBack:"", 
   linkProject:"", 
   userName:"edgardo90",  
  }

  errores:Errores={};// esto sirve para controlar el formulario

  constructor(private activatedRouter : ActivatedRoute,  private router: Router,  private projectService: ProjectService ) { }

  ngOnInit(): void {
    setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio
    const id = this.activatedRouter.snapshot.params["id"];
    console.log(id);
    this.projectService.getProjectByid(id).subscribe(value =>{
      console.log(value)
      this.project = value;
    },err=>{
      console.log(err.error);
      Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      })
      this.router.navigate([""]);
    })
  }

  resetInput(value:any){ // funcion que voy a utilizar para un button para borrar lo que esta en el input
    // console.log(value);
    // console.log(this.project);
    // console.log(this.description);
    if(value === this.project.image){
      this.project.image = "";
    }
    if(value === this.project.linkFront){
      this.project.linkFront = "";
    }
    if(value === this.project.linkBack){
      this.project.linkBack = "" ;
    }
    if(value === this.project.linkProject){
      this.project.linkProject = "" ;
    }
  }

  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.project)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
    const regexUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    // if(!regex.test(this.project.description)){
    //   this.errores.description= "tienes que ingresar una descripcion del puesto"
    // }else{
    //   this.errores.description=""
    // }
    
    if(this.project.title.length > 25){
      this.errores.title= "titulo demaciado largo"
    }else{
      this.errores.title=""
    }

    if(!this.project.image){
      this.errores.image="tienes que ingresar una url para la imagen";
    }else if(!regexUrl.test(this.project.image)  ){
      this.errores.image = "el link de la imagen no es valido";
    }else{
      this.errores.image="";
    }

    if(!this.project.linkFront){
      this.errores.linkFront = "";
    }else if(!regexUrl.test(this.project.linkFront)  ){
      this.errores.linkFront = "el link del front  no es valido";
    }else{
      this.errores.linkFront="";
    }

    if(!this.project.linkBack){
      this.errores.linkBack = ""
    }else if(!regexUrl.test(this.project.linkBack)  ){
      this.errores.linkBack = "el link del back no es valido";
    }else{
      this.errores.linkBack="";
    }
  }

  editProject(){
    this.project.description = this.project.description.split("\n").join("<br>")
    const id = this.activatedRouter.snapshot.params["id"];
    // console.log(this.project)
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      })
      return alert("Observa los errores que estan en color rojo!"); // esto lo dejo para que funcione el Swal.fire con el return
    }
    this.projectService.putProject(this.project).subscribe(value =>{
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Proyecto editado",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error)
      return Swal.fire({
        title: "Error",
        text: err.error.msg,
        icon:"error",
      })
    })
  }

}
