import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../services/data.service';
import {Title} from "@angular/platform-browser";

declare var jquery: any;
declare var $: any;

@Component({
  templateUrl: './concerns.component.html',
  styleUrls: ['./concerns.component.css']
})
export class ConcernsComponent implements OnInit {

  match: string;
  data: any = {};
  use: any = {};
  other: any = {};
  lang: string;

  constructor(
    private route: ActivatedRoute,
    private dataService:DataService,
    private location: Location,
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

    this.route.params.subscribe( params => (this.match = (params.name)) );
    this.dataService.getData().subscribe((data) => {
      this.data = data.concerns.filter(x => x.cLink === this.match);
      this.use = this.data[0];
      this.other = data.conc;
      if (this.use === undefined) {
        this.router.navigateByUrl('/404', { skipLocationChange: true });
        // end prematurely
        return;
      }

      // Set html title
      var pageTitle = 'Treatments';
      if (this.dataService.getLang() == 'ch') {
        pageTitle = '療程';
      }
      this.dataService.createHTMLTitle(
        this.use.name.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') +
        ' - ' + 
        pageTitle
      );

      // Set canonical
      this.dataService.createLinkForCanonicalURL(window.location.pathname);

      // Temp remove because I dont have a description
      this.dataService.removeHtmlDescriptionTag();

      if (this.use.description != '') {
        this.dataService.createHtmlDescriptionTag(this.use.description);
      }

      // remove no index (just in case)
      this.dataService.removeHTMLNoIndexTag();
    });
  }
}
