import { Component, OnInit , ViewChild, ViewEncapsulation , Input } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
//
import {Project} from "../../../interfaces/interface-project";
import {ProjectService} from "../../../service/project.service";
import {Contact , Errores} from "../../../interfaces/interface-contact";
import {ContactService} from "../../../service/contact.service"

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
  // lo aca abajo configuro para poder modificar el carousel
  encapsulation: ViewEncapsulation.None,
  styles:[`
  .carousel-item
  {
    /* display:block; */  /*esto lo comento porque sino me tirra como un error por su id  */
    /* opacity:0; */
    /* transition: opacity 0.5s; */
  }
  .carousel-item.active
  {
    display:block;
    /* opacity:1; */
    /* transition: opacity 0.5s; */
    
  }
  .carousel-control-prev{
    height: 55%;
    margin-top: 12%;
  }
  .carousel-control-next{
    height: 55%;
    margin-top: 12%;
  }
  .carousel-control-next-icon {
    /* margin-bottom: 160px; */
    /* background-color: rgba(49, 174, 116, 0.893); */
    position: absolute;
    border: none;
    border-radius:9999px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 24 24'%3e%3cpath d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z'/%3e%3c/svg%3e");
}  
.carousel-control-prev-icon {
    /* margin-bottom: 160px; */ 
    /* background-color: rgba(49, 174, 116, 0.893); */
    border: none;
    border-radius:9999px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 24 24'%3e%3cpath d='M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z'/%3e%3c/svg%3e");

}
`]
})

export class CreateContactComponent implements OnInit {

  projects:Project[] = [];

  contact:Contact = {
    email:"",
    message:"",
    name:"",
    phone:"",
  }

  constructor(private projectService:ProjectService , private contactService :ContactService ,private router: Router) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(value=>{ // service que va traer todos los proyectos
      this.projects = value;
      this.projects = this.projects.filter(el => el.userName === "edgardo90");
      console.log(this.projects);
    }, err =>{
      console.log(err.error)
    });
  }

  checkErrors(){
    // console.log(this.contact)
  }


  createContact():any{
    // if(Object.values(this.errores).filter(el => el !== "").length > 0 ){ // convierto en array el objeto this.errores  y hago un filter para que me traiga solamente los elemento que hay algo
    //   return Swal.fire({
    //     title: "Error",
    //     text: "Observa los errores que estan en color rojo!" ,
    //     icon:"error",
    //   })
    // }
    Swal.fire({
      title: "Espere",
      text: "Espere un momento por favor..." ,
      icon:"info",
      showConfirmButton: false, // le saco el button de confirmar"ok"
    })
    this.contactService.postContact(this.contact).subscribe(value =>{ // service que envia el email automatico
      // console.log(value);
      this.router.navigate([""]);
      return Swal.fire({
        title:"Contacto enviado",
        icon:"success",
        confirmButtonText:"Continuar",
      })
    }, err=>{
      console.log(err.error); // muestro el error que trae desde el back
      return Swal.fire({
        title: "Error",
        text: err.error.msg, // va mostrar el alerta con el error que trae por msg el back
        icon:"error",
      });
    });
  }

}
