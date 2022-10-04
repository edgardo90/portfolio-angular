import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http" // esto lo importo yo , es para que funcione el service
import {FormsModule} from "@angular/forms" // esto lo importo yo , para los formularios
import { NgCircleProgressModule } from 'ng-circle-progress'; // esto lo instalo con npm install ng-circle-progress --save
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // esto se instala , leer https://ng-bootstrap.github.io/#/getting-started para instalar
import { SwalComponent ,SweetAlert2Module ,SwalDirective } from '@sweetalert2/ngx-sweetalert2'; // esto se intala , es para mostrar de otrav forma las alertas , leer https://laratutorials.com/angular-12-sweetalert2-tutorial-example/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogosComponent } from './components/logos/logos.component';
import { BannerComponent } from './components/banner/banner.component';
import { PersonaComponent } from './components/persona/persona.component';
import { CreateBannerComponent } from './components/edit-banner/create-banner.component';
import { EditPersonaComponent } from './components/persona/edit-persona/edit-persona.component';
import { AboutComponent } from './components/about/about.component';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { CreateExperienceComponent } from './components/experience/create-experience/create-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { EducationComponent } from './components/education/education.component';
import { CreateEducationComponent } from './components/education/create-education/create-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { SkillComponent } from './components/skill/skill.component';
import { CreateSkillComponent } from './components/skill/create-skill/create-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { ProjectComponent } from './components/project/project.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { EditProyejectComponent } from './components/project/edit-project/edit-project.component';
import { NewBannerComponent } from './components/banner/new-banner/new-banner.component';
import { CretePersonaComponent } from './components/persona/create-persona/create-persona.component';
import { CreateAboutComponent } from './components/about/create-about/create-about.component';
import { interceptorProvider } from './service/interceptor-service';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { Pagina404Component } from './components/pagina404/pagina404.component'; // esto lo importo yo , para controlar el ADMIN or USER

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LogosComponent,
    BannerComponent,
    PersonaComponent,
    CreateBannerComponent,
    EditPersonaComponent,
    AboutComponent,
    EditAboutComponent,
    ExperienceComponent,
    CreateExperienceComponent,
    EditExperienceComponent,
    EducationComponent,
    CreateEducationComponent,
    EditEducationComponent,
    SkillComponent,
    CreateSkillComponent,
    EditSkillComponent,
    ProjectComponent,
    CreateProjectComponent,
    EditProyejectComponent,
    NewBannerComponent,
    CretePersonaComponent,
    CreateAboutComponent,
    LoginComponent,
    CreateUserComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // lo traigo aca
    FormsModule, // lo importo aca
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}), // el  circle-progress lo importo aca
    SweetAlert2Module,//lo importo
    NgbModule // lo importo
  ],
  providers: [interceptorProvider],// el "interceptorProvider"  que importe y que cree lo coloco aca+
  bootstrap: [AppComponent]
})
export class AppModule { }
