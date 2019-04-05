
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { DOCUMENT } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { Meta } from '@angular/platform-browser';

@Injectable()
export class DataService {

  lang: string = 'en';

  constructor(
    public http:Http,
    @Inject(DOCUMENT) private doc,
    private titleService: Title,
    private meta: Meta
  ) {
  }

  getHtmlTitle() {
    return 'Reviva Laser Skin Clinic';
  }

  getHeaderData() {
    this.lang = this.getLang();

    if (this.getLang() === 'ch') {
      return this.http.get('assets/json/ch/header.json').pipe(
          map(res => res.json()));
    } else {
      return this.http.get('assets/json/en/header.json').pipe(
          map(res => res.json()));
    }
  }

  getFooterData() {

    this.lang = this.getLang();

    if (this.getLang() === 'ch') {
      return this.http.get('assets/json/ch/footer.json').pipe(
          map(res => res.json()));
    } else {
      return this.http.get('assets/json/en/footer.json').pipe(
          map(res => res.json()));
    }
  }

  getData() {

    this.lang = this.getLang();

    if (this.getLang() === 'ch') {
      return this.http.get('assets/json/ch/content.json').pipe(
          map(res => res.json()));
    } else {
      return this.http.get('assets/json/en/content.json').pipe(
          map(res => res.json()));
    }
  }


  changeLang(lang) {
    if (!this.isValidLang(lang)) {
      lang = 'en';
    }
    this.lang = lang;
    localStorage.setItem('language', this.lang);
  }

  getLang() {
    // should be ensured in wrapper component that the correct lang is set via this.changeLang()
    if (localStorage.getItem('language') == 'undefined') {
      return undefined;
    }
    return localStorage.getItem('language');
  }

  getLangDisplay() {
    if (this.getLang() == 'ch') {
      return '中文';
    } else {
      return 'en'
    }
  }

  isValidLang(lang) {
    if (lang == 'ch' || lang == 'en') {
      return true
    }
    return false;
  }

  removeHtmlDescriptionTag() {
    this.meta.removeTag("name='description'");
  }

  createHtmlDescriptionTag(description) {
    this.meta.removeTag("name='description'");
    this.meta.addTag({ name: 'description', content: description });
  }

  createHTMLTitle(pageTitle) {
    this.titleService.setTitle(pageTitle + ' | ' + this.getHtmlTitle());
  }

  createHTMLNoIndexTag() {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }

  removeHTMLNoIndexTag() {
    this.meta.removeTag("name='robots'");
  }

  removeLinkForCanonicalURL() {
    let link = this.doc.querySelector("link[rel='canonical']");
    if (link != null) {
      link.parentNode.removeChild(link);
    }
  }

  createLinkForCanonicalURL(pathname) {
    let link = this.doc.querySelector("link[rel='canonical']");
    if (link == null) {
     link = this.doc.createElement('link');
     link.setAttribute('rel', 'canonical');
     this.doc.head.appendChild(link);
    }
    link.setAttribute('href', 'https://www.revivamd.com' + pathname);
 }
}
