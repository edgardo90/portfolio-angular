import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
//
import {Persona , PersonArray} from "../../interfaces/interface-persona"


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  @Input() person : Persona = PersonArray[0] // , de esta forma traigo con "input" lo que esta en "home.component"
  @Input() activate! : boolean; // recibo lo que viene del home.html/home.component
  @Output() onDeletedPerson : EventEmitter<Persona> = new EventEmitter(); // con esto  extraigo la funcion "onDelete()" que cree hacia afuera para que lo maneje ; "esto la va recibir "home.component"/html" " 

  constructor() { }

  ngOnInit(): void {
    console.log(this.activate)
  }

  onDelete(person: Persona){ // funcion que cuando haga lik en el button  va a borrar la persona , pongo un argumento que se llame "person" que vas ser de type interface "Persona"
    // console.log(person) // me va mostrar la persona que toque
    this.onDeletedPerson.emit(person) // traigo el onDeletedPerson y utilizo la funcion "emit" con el argumento, "esto la va recibir(emitir) "home.component"/html" " 
  }

}
