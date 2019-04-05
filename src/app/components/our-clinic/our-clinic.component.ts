import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import {Title} from "@angular/platform-browser";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-our-clinic',
  templateUrl: './our-clinic.component.html',
  styleUrls: ['./our-clinic.component.css']
})
export class OurClinicComponent implements OnInit {

  private top: any = true;
  counter: any;
  leng: any;
  clinic: any = {};
  lang: string;

  constructor(
    private dataService: DataService,
    private titleService: Title
  ) { }

  ngOnInit() {

    // Set Title
    var pageTitle = 'Our Clinic';
    if (this.dataService.getLang() == 'ch') {
      pageTitle = '關於我們';
    }
    this.dataService.createHTMLTitle(pageTitle);
    // Set canonical
    this.dataService.createLinkForCanonicalURL(window.location.pathname);

    // remove no index (just in case)
    this.dataService.removeHTMLNoIndexTag();

    $('html, body').scrollTop(0);

    this.dataService.getData().subscribe((data) => {
      this.clinic = data.clinic;
      this.leng = this.clinic.slides.length;

      // set html description meta
      this.dataService.createHtmlDescriptionTag(this.clinic.text1.replace(/<(?:.|\n)*?>/gm, ''));
    });

    this.lang = this.dataService.getLang();

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
    }, 100000);


    if (this.lang == "ch") {
      $('.routes li a, .rig li a').css("font-size","15px");
      $('.ribbon a').css("font-size","15px");
    }

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

  scrollView(place) {
    $('html, body').animate({
      scrollTop: $(place).offset().top
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.top);
  }

}
