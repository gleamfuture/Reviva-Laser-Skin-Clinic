import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: any = {};

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getFooterData().subscribe((data) => {
      this.footer = data.footer;
    });
  }

  message() {
    window.location.href = "mailto:staff@revivamd.com?subject=Please Subscribe me to Reviva!&body=I would like to be subscribed.";
  }

}
