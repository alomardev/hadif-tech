import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem, MenuItemKeys } from './layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private readonly menu: MenuItem[]  = [
    {
      key: MenuItemKeys.grades,
      label: 'الصفوف الدراسية',
      menu: [
        { label: 'الصف الأول المتوسط', url: '/content/1' },
        { label: 'الصف الثاني المتوسط', url: '/content/2', disabled: true },
        { label: 'الصف الثالث المتوسط', url: '/content/3', disabled: true },
      ],
    },
    {
      label: 'الشرح التفاعلي',
      menu: [
        { label: 'الصف الأول المتوسط', url: '/content/1/lectures' },
        { label: 'الصف الثاني المتوسط', url: '/content/2/lectures', disabled: true },
        { label: 'الصف الثالث المتوسط', url: '/content/3/lectures', disabled: true },
      ],
    },
    { label: 'مصادر علمية', url: '/resources' },
    { label: 'عن الموقع', url: '/about' },
    { label: 'تواصل معنا', url: '/contact-us' },
  ];

  private menu$ = new BehaviorSubject<MenuItem[]>(this.menu);

  constructor(private titleService: Title) {
  }

  getMenu(): Observable<MenuItem[]> {
    return this.menu$;
  }

  updateTitle(title: string) {
    this.titleService.setTitle('منصة هادف' + ' - ' + title);
  }

}
