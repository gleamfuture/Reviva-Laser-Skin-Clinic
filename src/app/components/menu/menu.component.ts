import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  array1: any;
  array2: any;
  array3: any;
  array4: any;
  concerns:any;
  menu: any = {};
  lang: string;

  choice: boolean;
  name = 'List of Treatments';

  match: string;
  data: any;
  treatment: string[];

  constructor(
      private route: ActivatedRoute,
      private dataService:DataService,
      private location: Location,
      private router: Router) { }

  ngOnInit() {
    this.lang = this.dataService.getLang();
    
    this.array1 = []
    this.array2 = [];
    this.array3 = [];
    this.array4 = [];

    this.dataService.getData().subscribe((data) => {
      this.concerns = data.concerns;
      this.menu = data.menu;
      for (let i = 0; i < this.concerns.length; i++) {
        for (let j = 0; j < this.concerns[i].treatments.length; j++) {
          if (this.concerns[i].treatments[j].category === 1) {
            this.array1.push({name: this.concerns[i].treatments[j].name, link: this.concerns[i].treatments[j].link})
          }
          if (this.concerns[i].treatments[j].category === 2) {
            this.array2.push({name: this.concerns[i].treatments[j].name, link: this.concerns[i].treatments[j].link})
          }
          if (this.concerns[i].treatments[j].category === 3) {
            this.array3.push({name: this.concerns[i].treatments[j].name, link: this.concerns[i].treatments[j].link})
          }
          if (this.concerns[i].treatments[j].category === 4) {
            this.array4.push({name: this.concerns[i].treatments[j].name, link: this.concerns[i].treatments[j].link})
          }
        }
      }

    });
  }

  routePage(path) {
    this.router.navigateByUrl('/'+ this.lang +'/treatments/'+path);
    $('.menu-body').toggleClass('activated');
    $('body').toggleClass('togglebody');
    this.choice = !this.choice;
    if (this.choice === true) {
        this.name = 'Close Menu';
    } else {
      this.name = 'List of Treatments';
    }
    if (this.router.url.includes('treatments/')) {
      location.reload();
    }
  }


  crazy() {
    $('.menu-body').toggleClass('activated');
    $('body').toggleClass('togglebody');
    this.choice = !this.choice;
    if (this.choice === true) {
        this.name = 'Close Menu';
    } else {
      this.name = 'List of Treatments';
    }
  }

  ngOnDestroy() {

  }

}
