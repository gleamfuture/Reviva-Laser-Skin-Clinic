import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  concerns: any;
  treatments: any;
  data: any = {};

  item;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.concerns = [];
    this.treatments = [];
    this.dataService.getData().subscribe((data) => {
      this.data = data.search;
      for (let i = 0; i < data.concerns.length; i++) {
        this.concerns.push(data.concerns[i].name);
      }
      for (let i = 0; i < data.concerns.length; i++) {
        for (let j = 0; j < data.concerns[i].treatments.length; j++) {
          this.treatments.push({ 'name': data.concerns[i].treatments[j].name, 'link': data.concerns[i].treatments[j].link });
        }
      }
    });
  }

  exitModal() {
    $('.search-modal').fadeOut();
    $('body').removeClass('togglebody');
  }

  search() {
    var valThis = this.item;
    $('.navList>li').each(function() {
      var text = $(this).text().toLowerCase();
      (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
    });
    if (this.item === '') {
        $('.navList>li').hide();
    }
  }

  goConcern(path) {
    this.router.navigateByUrl('/concerns/'+path);
    $('.search-modal').fadeOut();
    $('body').removeClass('togglebody');
    if (this.router.url.includes('concerns/')) {
      location.reload();
    }
  }

  goTreatment(path) {
    this.router.navigateByUrl('/treatments/'+path);
    $('.search-modal').fadeOut();
    $('body').removeClass('togglebody');
    if (this.router.url.includes('treatments/')) {
      location.reload();
    }
  }

}
