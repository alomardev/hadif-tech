import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  section: LoginSection = 'login';

  constructor(private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.section = url[url.length - 1].path as LoginSection;
    });
  }

  setSection(section: LoginSection) {
    const newUrl = this.location.path().replace(new RegExp(`/${this.section}($|/$|/\\?.*$|\\?.*$)`), `/${section}$1`);
    this.section = section;
    this.location.replaceState(newUrl);
  }

}

type LoginSection = 'login' | 'register';
