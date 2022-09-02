import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { HomeComponent } from './components/home/home.component';
import {CreateBannerComponent} from "./components/create-banner/create-banner.component"
import { EditPersonaComponent } from './components/persona/edit-persona/edit-persona.component';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';

const routes: Routes = [
  {path:"" , component:HomeComponent},
  // {path:"banner/create" , component:CreateBannerComponent},
  {path:"banner/edit/:id" , component:CreateBannerComponent},
  {path:"persona/edit/:id" , component:EditPersonaComponent },
  {path:"about/edit/:id" , component:EditAboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
