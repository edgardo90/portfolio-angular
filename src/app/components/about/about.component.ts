import { Component, OnInit ,  Input , Output , EventEmitter   } from '@angular/core';
//
import {About, AboutArray} from "../../interfaces/interface-about";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() about: About = AboutArray[0];
  @Input() activate!: boolean;
  @Output() onDeletedAbout : EventEmitter<About> = new EventEmitter(); // con esto  extraigo la funcion "onDelete()" que cree hacia afuera para que lo maneje ; "esto la va recibir "home.component"/html" " 


  constructor() { }

  ngOnInit(): void {
    // console.log(this.activate)
  }

  onDelete(about: About){ // funcion que cuando haga lik en el button  va a borrar la persona , pongo un argumento que se llame "about" que vas ser de type interface "About"
    console.log(about) // me va mostrar el about que toque
    this.onDeletedAbout.emit(about) // traigo el onDeletedAbout y utilizo la funcion "emit" con el argumento, "esto la va recibir(emitir) "home.component"/html" " 
  }

}
