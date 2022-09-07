import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.css']
})
export class CreateExperienceComponent implements OnInit {

  title:string="";
  companyName:string="";
  dateStart:string="";
  dateEnd:string="";
  logoCompany:string="";
  description:string="";
  userName:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
