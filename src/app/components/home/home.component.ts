import { Component, OnInit } from '@angular/core';
//
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {Banner} from "../../interfaces/interface-barr";
import {BannerService} from "../../service/banner.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner:Banner[]=[];
  loading: string = "Cargando..." // esto me va servir para que aparezca el gif cargando... , si hay un string se va activar el gif caso contrarip el gif se va a descastivar


  constructor( private bannerService: BannerService) { }

  ngOnInit(): void {
    this.bannerService.getAllBanners().subscribe(value =>{
      this.banner = value;
      this.banner = this.banner.filter(el => el.userName === "edgardo90")
      console.log(this.banner);
    }, err=>{
      console.log(err.error);
    });

    setTimeout(() => this.loading= ""  ,8000 ); // cuando pase ese tiempo setea a un string vacio 
  }




}
