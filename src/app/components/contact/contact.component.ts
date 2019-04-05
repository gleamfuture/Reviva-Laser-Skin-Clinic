import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {Title} from "@angular/platform-browser";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  concerns: any;
  array: any;
  data: any = {};
  lang: string;

  lat: number = 49.173845;
  lng: number = -123.133508;

  zoom: number = 15;
  center: number = 40;


   styles = [{
       "elementType": "geometry",
       "stylers": [{
         "color": "#f5f5f5"
       }]
     },
     {
       "elementType": "labels.icon",
       "stylers": [{
         "visibility": "off"
       }]
     },
     {
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#616161"
       }]
     },
     {
       "elementType": "labels.text.stroke",
       "stylers": [{
         "color": "#f5f5f5"
       }]
     },
     {
       "featureType": "administrative.land_parcel",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#bdbdbd"
       }]
     },
     {
       "featureType": "poi",
       "elementType": "geometry",
       "stylers": [{
         "color": "#eeeeee"
       }]
     },
     {
       "featureType": "poi",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#757575"
       }]
     },
     {
       "featureType": "poi.park",
       "elementType": "geometry",
       "stylers": [{
         "color": "#e5e5e5"
       }]
     },
     {
       "featureType": "poi.park",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#9e9e9e"
       }]
     },
     {
       "featureType": "road",
       "elementType": "geometry",
       "stylers": [{
         "color": "#ffffff"
       }]
     },
     {
       "featureType": "road.arterial",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#757575"
       }]
     },
     {
       "featureType": "road.highway",
       "elementType": "geometry",
       "stylers": [{
         "color": "#dadada"
       }]
     },
     {
       "featureType": "road.highway",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#616161"
       }]
     },
     {
       "featureType": "road.local",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#9e9e9e"
       }]
     },
     {
       "featureType": "transit.line",
       "elementType": "geometry",
       "stylers": [{
         "color": "#e5e5e5"
       }]
     },
     {
       "featureType": "transit.station",
       "elementType": "geometry",
       "stylers": [{
         "color": "#eeeeee"
       }]
     },
     {
       "featureType": "water",
       "elementType": "geometry",
       "stylers": [{
         "color": "#c9c9c9"
       }]
     },
     {
       "featureType": "water",
       "elementType": "labels.text.fill",
       "stylers": [{
         "color": "#9e9e9e"
       }]
     }
   ];


  constructor(
    private dataService:DataService,
    private titleService: Title
  ) { }

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
    var pageTitle = 'Contact Us';
    if (this.dataService.getLang() == 'ch') {
      pageTitle = '聯繫我們';
    }
    this.dataService.createHTMLTitle(pageTitle);
    // Set canonical
    this.dataService.createLinkForCanonicalURL(window.location.pathname);

    // Temp remove because I dont have a description
    this.dataService.removeHtmlDescriptionTag();

    // remove no index (just in case)
    this.dataService.removeHTMLNoIndexTag();

    this.array = [];
    this.dataService.getData().subscribe((data) => {
      this.concerns = data.concerns;
      this.data = data.contact;
      for (let i = 0; i < this.concerns.length; i++) {
        for (let j = 0; j < this.concerns[i].treatments.length; j++) {
            this.array.push(this.concerns[i].treatments[j].name);
        }
      }
    });
  }

  go(place) {
    $('html, body').animate({
      scrollTop: $(place).offset().top
    }, 1000);
  }

  message() {
    alert('Feature not completed yet, Please contact us directly. We are happy to serve you');
  }

  hideme() {
    $('.overmap').hide();
  }

}
