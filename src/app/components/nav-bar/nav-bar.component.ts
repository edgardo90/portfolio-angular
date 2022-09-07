import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
//
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() activate!: boolean ; // recibo lo que viene del home.html/home.component , esto es gracias al @Input()
  @Output() onChange : EventEmitter<boolean> =new EventEmitter() //  con esto  extraigo la funcion "cambio()" que cree hacia afuera para que lo maneje otro component;  esto la va recibir "home.component"/html"
  id:string = ""; // esto lo voy a usar caundo estoy editando algo que no muestre la opcion "modificar portfolio"
  link: number = 0; // esto lo voy a usar caundo estoy haciendo un post  que no muestre la opcion "modificar portfolio"

  constructor(private router: Router ,private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params["id"]
    // console.log(this.id)
    // console.log(this.activatedRouter.snapshot.url.length)
    this.link = this.activatedRouter.snapshot.url.length
  }

  cambio(){ // funcion que va recibir el evento al componente  "home.component"/html"
    // console.log(this.activate)
    this.onChange.emit(this.activate)
  }

}
