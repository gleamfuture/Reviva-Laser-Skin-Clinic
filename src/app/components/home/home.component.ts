import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private top: any;
  counter: any;
  leng: any = {};
  home: any = {};
  concerns: any = [];
  lang: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit() {

    $('html, body').scrollTop(0);

    // Just in case
    if (this.dataService.getLang() == undefined) {
      this.lang = 'en';
      this.dataService.changeLang(this.lang);
    } else {
      this.lang = this.dataService.getLang();
    } 

    // Set title
    var pageTitle = 'Home';
    if (this.dataService.getLang() == 'ch') {
      pageTitle = '主頁';
    }
    this.dataService.createHTMLTitle(pageTitle);

    // Set canonical
    if (this.dataService.getLang() == 'en') {
      this.dataService.createLinkForCanonicalURL('');
    } else {
      this.dataService.createLinkForCanonicalURL('/' + this.dataService.getLang());
    }

    // remove no index (just in case)
    this.dataService.removeHTMLNoIndexTag();

    // Grab data from json
    this.home.slides = [];
    this.dataService.getData().subscribe((data) => {
      this.home = data.home;
      this.concerns = data.concerns;
      this.leng = this.home.slides.length;
      
      // set meta description
      this.dataService.createHtmlDescriptionTag(this.home.text1.replace(/<(?:.|\n)*?>/gm, ''));
    });
    this.counter = 1;

    this.top = setInterval(() => {
      if (this.counter < this.leng) {
          this.counter++;
          $('.slide').fadeOut(1000);
          $('.circles>div').removeClass('aktiv');
          $('.slide:nth-child(' + this.counter + ')').fadeIn(1000);
          $('.circles>div:nth-child('+this.counter+')').addClass('aktiv');
      } else if (this.counter == this.leng) {
          this.counter = 1;
          $('.slide').fadeOut(1000);
          $('.circles>div').removeClass('aktiv');
          $('.slide:nth-child(' + 1 + ')').fadeIn(1000);
          $('.circles>div:nth-child('+1+')').addClass('aktiv');
      }
    }, 10000);
  }

  moveLeft() {
    if (this.counter == 1) {
        this.counter = this.leng;
        $('.slide').fadeOut(1000);
        $('.slide:nth-child(' + this.counter + ')').fadeIn(1000);

    } else {
        this.counter--;
        $('.slide').fadeOut(1000);
        $('.slide:nth-child(' + this.counter + ')').fadeIn(1000);
    }
  }

  moveRight() {
    if (this.counter < this.leng) {
        this.counter++;
        $('.slide').fadeOut(1000);
        $('.slide:nth-child(' + this.counter + ')').fadeIn(1000);
    } else {
        this.counter = 1;
        $('.slide').fadeOut(1000);
        $('.slide:nth-child(' + 1 + ')').fadeIn(1000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.top);
  }
}
