import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { RoutesModule }     from './routes/routes.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { OurClinicComponent } from './components/our-clinic/our-clinic.component';
import { TreatmentsComponent } from './components/treatments/treatments.component';

import { DataService } from './services/data.service';
import { ConcernsComponent } from './components/concerns/concerns.component';
import { SingleComponent } from './components/single/single.component';
import { ContactComponent } from './components/contact/contact.component';

import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


         
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WrapperComponent,
    HomeComponent,
    FooterComponent,
    OurClinicComponent,
    TreatmentsComponent,
    ConcernsComponent,
    SingleComponent,
    ContactComponent,
    MenuComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutesModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUkBNadf_lQyCLnNbrgqB9PCLdFP-Agj8'
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
