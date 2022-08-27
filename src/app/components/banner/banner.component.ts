import {Component, OnInit , Input , Output , EventEmitter  } from '@angular/core';
import {Banner ,BARRNERarr} from "../../interfaces/interface-barr";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() banner : Banner=BARRNERarr[0]

  constructor() { }

  ngOnInit(): void {
  }

}
