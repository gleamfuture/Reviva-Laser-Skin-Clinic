import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lang: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => (this.lang = (params.lang)) );
    let lang2 = this.route.snapshot.queryParams['lang'];
  }
}
