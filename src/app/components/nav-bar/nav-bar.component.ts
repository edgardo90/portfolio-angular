import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
//
import { ActivatedRoute, Router } from '@angular/router'; // con en ActivatedRoute puedo traer por parms el "id" que viene
import { TokenService } from 'src/app/service/token.service'; // tragio el service que tiene mi token

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

  isLogged = false; // esto es para desloguearse, con esto puedo jugar con *ngIf para ver si se muestra el button o no

  user={userName:"" ,
   token:"" ,
   authorities:<any>""  // con any va poder null , undefined o un string
  } // esto me va servir lo que tiene el tokenService una vez que el user este logueado

  constructor(private router: Router ,
    private activatedRouter : ActivatedRoute ,
    private tokenService:TokenService,
    ) { }

  ngOnInit(): void {
    // console.log(this.tokenService.getUserName());
    // console.log(this.tokenService.getToken());
    // console.log(this.tokenService.getAuthorities());
    // todo lo que traiga el service token lo guardo en el object this.user
    this.user.userName = this.tokenService.getUserName();
    this.user.token = this.tokenService.getToken();
    this.user.authorities = this.tokenService.getAuthorities().find(el => el === "ROLE_ADMIN");
    // console.log(this.user);

    if(this.tokenService.getToken()){ // si hay token
      this.isLogged=true;  // cambia a "isLogged" a true
    }else{
      this.isLogged = false; // sino que siga en false
    }

    this.id = this.activatedRouter.snapshot.params["id"]
    // console.log(this.id);
    // console.log(this.activatedRouter.snapshot.url.length); // me va mostrar el largo de la ruta
    this.link = this.activatedRouter.snapshot.url.length
  }

  cambio(){ // funcion que va recibir el evento al componente  "home.component"/html"
    // console.log(this.activate)
    this.onChange.emit(this.activate)
  }

  logOut():void{ // funcion para desloguearse
    this.tokenService.logOut();
    window.location.reload();
    this.router.navigate([""]);
  }

}
