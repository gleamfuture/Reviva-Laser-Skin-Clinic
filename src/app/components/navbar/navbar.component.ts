import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nav: any = {};
  lang: string;
  langDisplay: string;

  constructor(
    private dataService:DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.lang = this.dataService.getLang();
    if (this.lang == undefined) { 
      this.lang = 'en';
      this.dataService.changeLang(this.lang);
    }

    this.langDisplay = this.dataService.getLangDisplay();
    this.dataService.getHeaderData().subscribe(data => {
      this.nav = data.navbar;
    });

    if (this.lang == "ch") {
      $('.routes li a, .rig li a').css("font-size","15px");
      $('.ribbon a').css("font-size","15px");
    }
  }

  hereChange(lang) {
    this.dataService.changeLang(lang);
    // TODO:: make change language to go on the same page instead
    this.router.navigate(['/', lang]);
  }

  modalSearch() {
    $('.search-modal').fadeIn();
    $('body').addClass('togglebody');
    $('.search-input').focus();
  }

  navIn() {
    $('#myNavbar').fadeIn();
  }

  exitMenu() {
    if (window.innerWidth < 991) {
      $('#myNavbar').fadeOut();
    }
  }
}
