import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {Title} from "@angular/platform-browser";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

  concerns:any;
  private top: any = true;
  counter: any;
  leng: any;
  data: any = {};
  lang: string;

  constructor(
    private dataService:DataService,
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
    var pageTitle = 'Treatments';
    if (this.dataService.getLang() == 'ch') {
      pageTitle = '療程';
    }
    this.dataService.createHTMLTitle(pageTitle);

    // Set canonical
    this.dataService.createLinkForCanonicalURL(window.location.pathname);

    // Temp remove because I dont have a description
    this.dataService.removeHtmlDescriptionTag();

    this.data.slides = [];
    this.dataService.getData().subscribe((data) => {
      this.concerns = data.concerns;
      this.data = data.treat;
      this.leng = this.data.slides.length;
    });
    this.counter = 1;

    this.lang = this.dataService.getLang();

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
    }, 100000);
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
    this.concerns.unsubscribe;
  }

}
