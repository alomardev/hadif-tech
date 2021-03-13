import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem, MenuItemKeys } from 'src/app/layout/layout';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-page-landing',
  templateUrl: './page-landing.component.html',
  styleUrls: ['./page-landing.component.scss']
})
export class PageLandingComponent {

  grades = [
    { label: 'الصف الأول المتوسط', number: '١', path: '/content/1' },
    { label: 'الصف الثاني المتوسط', number: '٢', path: '/content/2', disabled: true },
    { label: 'الصف الثالث المتوسط', number: '٣', path: '/content/3', disabled: true },
  ];

}
