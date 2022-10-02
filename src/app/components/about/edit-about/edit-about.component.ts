import { Component, OnInit } from '@angular/core';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import{AboutService} from "../../../service/about.service";
import {About ,Errores} from "../../../interfaces/interface-about"

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  loading: string = "Cargando..."

  about!:About;

  title:string="";
  summary:string="";

  errores:Errores={};// esto sirve para controlar el formulario

  aboutLoading:object[] = [] ;


  constructor(private router: Router, private activatedRouter : ActivatedRoute, private aboutService: AboutService) { }

  ngOnInit(): void {
    // setTimeout(() => this.loading= ""  ,600 ); // cuando pase ese tiempo setea a un string vacio

    const id = this.activatedRouter.snapshot.params["id"];
    // console.log(id);

    this.aboutService.getAboutByid(id).subscribe(value=>{
      this.about = value;
      // console.log(this.about)
      const{title ,summary} = this.about
      this.title = title;
      this.summary = summary;
      this.aboutLoading.push(this.about);
    } , err=>{
      console.log(err.error);
      Swal.fire({
        title: "Error",
        text: err.error.msg ,
        icon:"error",
      });
      this.router.navigate([""]);
    });
  }


  checkErrors(){ // funcion para controlar y mostrar errores en el formulario
    // console.log(this.title)
    const regex = /[A-Z0-9._%+-]+/i; // valida letras , numeros , simbolos , valida si no hay nada en el input
   if(!regex.test(this.title)){
      this.errores.title = "tienes que ingresar el titulo"
    }else if(this.title.length > 45){
      this.errores.title= "titulo demaciado largo"
    }else{
      this.errores.title=""
    };

    if(!regex.test(this.summary)){
      this.errores.summary= "tienes que ingresar el resumen"
    }else{
      this.errores.summary=""
    }
  }

  modifyAbout():any{ // funcion para modificar el about
    const id = this.activatedRouter.snapshot.params["id"];
    const {title ,summary} = this;
    this.about = {title , summary , id};
    // console.log(this.about);
    if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
      return Swal.fire({
        title: "Error",
        text: "Observa los errores que estan en color rojo!" ,
        icon:"error",
      })
      // return alert("Observa los errores que estan en color rojo!")
    }
    Swal.fire({
      title: "Espere",
      text: "Espere un momento por favor..." ,
      icon:"info",
    })
    this.aboutService.putAbout(this.about).subscribe(value =>{ // utilizo el service que cree para modificar el about
      console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Informacion acerca de ti editado",
        icon:"success",
        confirmButtonText:"Continuar"
      })
    }, err=>{
      console.log(err.error);
    })
  }



}
