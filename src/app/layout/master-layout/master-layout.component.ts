import { Component, HostBinding, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit {

  @HostBinding('class.master-layout') hostClassName = true;

  loginPopupIsShown = false;

  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
  }

}
