import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() activate : string = "" // recibo lo que viene del home.html/home.component , esto es gracias al @Input()
  @Output() onChange : EventEmitter<string> =new EventEmitter() //  con esto  extraigo la funcion "cambio()" que cree hacia afuera para que lo maneje otro component;  esto la va recibir "home.component"/html"

  constructor() { }

  ngOnInit(): void {
  }

  cambio(){
    // console.log(this.activate)
    this.onChange.emit(this.activate)
  }

}
