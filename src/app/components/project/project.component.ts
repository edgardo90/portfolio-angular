import { Component, Input, OnInit , ViewChild,ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'; // importo sweetalert
import { Router } from '@angular/router'; // esto seria como el navigate de react
//
import {Project} from "../../interfaces/interface-project";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  // lo aca abajo configuro para poder modificar el carousel
  encapsulation: ViewEncapsulation.None,
  styles:[`
  .carousel-item
  {
    /* display:block; */  /*esto lo comento porque sino me tirra como un error por su id  */
    opacity:0;
    transition: opacity 0.5s;
  }
  .carousel-item.active
  {
    display:block;
    opacity:1;
    transition: opacity 0.5s;
    
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


export class ProjectComponent implements OnInit {

  @Input() activate!: boolean;        
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  projects:Project[] = [];
  
  

  constructor(private projectService:ProjectService ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(value=>{
      this.projects = value;
      this.projects = this.projects.filter(el => el.userName === "edgardo90");
      console.log(this.projects);
    }, err =>{
      console.log(err.error)
    });
  }

  simpleNotification(){ // ejemplo de Swalallert simple
    Swal.fire('Hi', 'We have been informed!', 'success');
  }

  alertConfirmation(){ // ejemplo de como usar Swalallert  COMPLETO
    Swal.fire({
      // position: 'top-end',
      title: 'Confirmar elminacion',
      text: "¿Estás seguro que deseas eliminarlo?",
      icon: 'warning',
      showCancelButton: true, // muestro el button para cancel
      reverseButtons: true, // cambio el sentido que va a mostrar los botones de "cancelar" y de "ok"
      confirmButtonText: 'Si', // nombre del button ok
      confirmButtonColor: "red", // cambia el color del button confirm
      // color:"red",
      cancelButtonText: "Cancelar" // name del button de cancel
    }).then((result) => {
      if (result.value) { // si el confirmButton es true
        Swal.fire({
          title:"Proyecto eleminado",
          icon:"success",
          confirmButtonText:"Continuar"
        })
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Item is safe.)',
      //     'error'
      //   )
      }
    })
  }

  deletedProject(project:Project){ // funcion para eleminar one project
    console.log(project);
    // const option = window.confirm("Estas seguro de eliminar ?");
    Swal.fire({
      // position: 'top-end',
      title: 'Confirmar elminacion',
      text: "¿Estás seguro que deseas eliminarlo?",
      icon: 'warning',
      showCancelButton: true, // muestro el button para cancel
      reverseButtons: true, // cambio el sentido que va a mostrar los botones de "cancelar" y de "ok"
      confirmButtonText: 'Si', // nombre del button ok
      confirmButtonColor: "#04ec84", // cambia el color del button confirm
      // color:"red",
      cancelButtonText: "Cancelar" // name del button de cancel
    }).then((result) => {
      if(result.value){
        this.projectService.deletedProject(project).subscribe(()=>{
          this.projects = this.projects.filter(el => el.id !== project.id)
          return Swal.fire({
            title:"Proyecto eleminado",
            icon:"success",
            confirmButtonText:"Continuar"
          })
        },err=>{
          console.log(err.error)
          return Swal.fire({
            title: "Error",
            text: err.error.msg,
            icon:"error",
          })
        })
      }
    })
  }

}
