import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { HomeComponent } from './components/home/home.component';
import {CreateBannerComponent} from "./components/create-banner/create-banner.component"
import { EditPersonaComponent } from './components/persona/edit-persona/edit-persona.component';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';
import { CreateExperienceComponent } from './components/experience/create-experience/create-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { CreateEducationComponent } from './components/education/create-education/create-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { CreateSkillComponent } from './components/skill/create-skill/create-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';

const routes: Routes = [
  {path:"" , component:HomeComponent},
  // {path:"banner/create" , component:CreateBannerComponent},
  {path:"banner/edit/:id" , component:CreateBannerComponent},
  {path:"persona/edit/:id" , component:EditPersonaComponent },
  {path:"about/edit/:id" , component:EditAboutComponent },
  {path:"experience/create" , component:CreateExperienceComponent},
  {path:"experience/edit/:id", component:EditExperienceComponent},
  {path:"education/create", component:CreateEducationComponent },
  {path:"education/edit/:id" , component:EditEducationComponent},
  {path:"skill/creat", component:CreateSkillComponent },
  {path:"skill/edit/:id" , component:EditSkillComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
