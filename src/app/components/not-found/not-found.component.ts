import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { DataService } from '../../services/data.service';
import { isPlatformBrowser } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(RESPONSE) private response: Response
  ) { }

  ngOnInit() {
    this.dataService.createHTMLTitle('404 Page Not Found!');
    this.dataService.removeHtmlDescriptionTag();
    this.dataService.removeLinkForCanonicalURL();

    this.dataService.createHTMLNoIndexTag();

    //this.response.status(404);
    
  }
  ngOnDestroy() {
    this.dataService.removeHTMLNoIndexTag();
  }
}
