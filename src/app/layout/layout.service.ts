import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuItem } from './layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private readonly menu: MenuItem[]  = [
    {
      label: 'الصفوف الدراسية',
      menu: [
        { label: 'الصف الأول المتوسط', url: '/grades/1' },
        { label: 'الصف الثاني المتوسط', url: '/grades/2' },
        { label: 'الصف الثالث المتوسط', url: '/grades/3' },
      ],
    },
    {
      label: 'الشرح التفاعلي',
      menu: [
        { label: 'الصف الأول المتوسط', url: '/grades/1/lectures' },
        { label: 'الصف الثاني المتوسط', url: '/grades/2/lectures' },
        { label: 'الصف الثالث المتوسط', url: '/grades/3/lectures' },
      ],
    },
    { label: 'مصادر علمية', url: '/resources' },
    { label: 'عن الموقع', url: '/about' },
    { label: 'تواصل معنا', url: '/contact-us' },
  ];

  private $menu = new BehaviorSubject<MenuItem[]>(this.menu);

  constructor() { }

  getMenu(): Observable<MenuItem[]> {
    return this.$menu;
  }

}
