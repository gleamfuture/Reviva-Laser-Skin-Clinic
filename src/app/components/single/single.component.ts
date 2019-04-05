import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../services/data.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit  {

  match: string;
  data: any = {};
  treatment: any = {};
  sin: any = {};
  leng: any;
  counter : number;
  top: any;
  lang: string;

  constructor(
    private route: ActivatedRoute,
    private dataService:DataService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    // Just in case
    if (this.dataService.getLang() == undefined) {
      this.lang = 'en';
      this.dataService.changeLang(this.lang);
    } else {
      this.lang = this.dataService.getLang();
    }

    // Try to look for treatment in json
    this.route.params.subscribe( params => (this.match = (params.treatment)) );
    this.dataService.getData().subscribe((data) => {
      for (let i = 0; i < data.concerns.length; i++) {
        for (let j = 0; j < data.concerns[i].treatments.length; j++) {
          if (data.concerns[i].treatments[j].link === this.match) {
            this.treatment = (data.concerns[i].treatments[j]);
            this.data = data.concerns[i];
          }
        }
      }

      // If cannot find treatment then get me out of here asap and return
      if (Object.keys(this.treatment).length === 0) {
        this.router.navigateByUrl('/404', { skipLocationChange: true });

        // end prematurely
        return;
      }

      // remove html tags from treatment's short descriptions
      for (let i = 0; i < this.data.treatments.length; i++) {
        this.data.treatments[i].shortDescription = this.data.treatments[i].shortDescription.replace(/<(?:.|\n)*?>/gm, '');
      }

      // Set html title
      this.dataService.createHTMLTitle(
        this.treatment.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
      );

      // Set canonical
      if (this.treatment.canonical !== undefined) {
        this.dataService.createLinkForCanonicalURL('/' + this.lang + '/treatments/' + this.treatment.canonical);
      } else {
        this.dataService.createLinkForCanonicalURL(window.location.pathname);
      }

      // Set description 
      this.dataService.createHtmlDescriptionTag(this.treatment.shortDescription.replace(/<(?:.|\n)*?>/gm, ''));

      // Slide show stuff
      this.sin = data.single;
      this.leng = this.treatment.slideimg.length;
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
            $('.circles>div:nth-child('+this.counter+')').addClass('aktiv');
        }
      }, 10000);
  
      if (this.leng == 1) {
        clearInterval(this.top);
      }
    });

    $('html, body').scrollTop(0);
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

  routeChange() {
    location.reload();
    $('html, body').scrollTop(0);
  }

  openQ(num) {
    $('.test'+num).toggle();
    $('#showme'+num).fadeToggle(500);
  }

  ngOnDestroy() {
    clearInterval(this.top);
  }
}
