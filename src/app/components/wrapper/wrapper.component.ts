import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  private top: any;
  counter: any;
  leng: any;
  home: any;
  concerns: any;
  lang: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.route
      .data
      .subscribe(v => (this.lang = (v.lang)));

    // custom css
    if (this.lang == "ch") {
      $('.routes li a, .rig li a').css("font-size","15px");
      $('.ribbon a').css("font-size","15px");
    }

    this.dataService.changeLang(this.lang);
  }
}
