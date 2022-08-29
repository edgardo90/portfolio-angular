import {Component, OnInit , Input , Output , EventEmitter  } from '@angular/core';
import {Banner ,BARRNERarr} from "../../interfaces/interface-barr"; // traigo mi interface

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() banner : Banner=BARRNERarr[0]; // , de esta forma traigo con "input" lo que esta en "home.component"
  @Input() activate : string = "" // recibo lo que viene del home.html/home.component , esto es gracias al @Input()

  constructor() { }

  ngOnInit(): void {
  }

}
