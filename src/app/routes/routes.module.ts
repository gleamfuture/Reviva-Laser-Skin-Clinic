import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { HomeComponent } from '../components/home/home.component';
import { OurClinicComponent } from '../components/our-clinic/our-clinic.component';
import { TreatmentsComponent } from '../components/treatments/treatments.component';
import { ConcernsComponent } from '../components/concerns/concerns.component';
import { SingleComponent } from '../components/single/single.component';
import { ContactComponent } from '../components/contact/contact.component';
import { AppComponent } from '../app.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    data: {lang : 'en' },
    component: WrapperComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ],
    pathMatch: 'full'
  },
  {
    path: 'en',
    data: {lang : 'en' },
    component: WrapperComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'our-clinic', component: OurClinicComponent },
      { path: 'treatments', component: TreatmentsComponent },
      { path: 'concerns/:name', component: ConcernsComponent },
      { path: 'treatments/:treatment', component: SingleComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },
  {
    path: 'ch',
    component: WrapperComponent,
    data: {lang : 'ch' },
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'our-clinic', component: OurClinicComponent },
      { path: 'treatments', component: TreatmentsComponent },
      { path: 'concerns/:name', component: ConcernsComponent },
      { path: 'treatments/:treatment', component: SingleComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },
  {
    // everything else is going back to 404
    path: '404',
    data: {lang : 'en' },
    component: WrapperComponent,
    children: [
      { path: '', component: NotFoundComponent }
    ]
  },
  {
    // everything else is going back to 404
    path: '**',
    data: {lang : 'en' },
    component: WrapperComponent,
    children: [
      { path: '', component: NotFoundComponent }
    ]
  }


  // {
  //   path: ':lang',
  //   component: HomeComponent
  // },
  // {
  //   path: 'our-clinic',
  //   component: OurClinicComponent
  // },
  // {
  //   path: 'treatments',
  //   component: TreatmentsComponent
  // },
  // {
  //   path: 'concerns/:name',
  //   component: ConcernsComponent
  // },
  // {
  //   path: 'treatments/:treatment',
  //   component: SingleComponent
  // },
  // {
  //   path: 'contact',
  //   component: ContactComponent
  // }
  // },
  // {
  //   path: '**',
  //   component: HomeComponent
  // }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class RoutesModule { }
