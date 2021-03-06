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
        { label: 'الصف الأول المتوسط', url: '/content/1' },
        { label: 'الصف الثاني المتوسط', url: '/content/2' },
        { label: 'الصف الثالث المتوسط', url: '/content/3' },
      ],
    },
    {
      label: 'الشرح التفاعلي',
      menu: [
        { label: 'الصف الأول المتوسط', url: '/content/1/lectures' },
        { label: 'الصف الثاني المتوسط', url: '/content/2/lectures' },
        { label: 'الصف الثالث المتوسط', url: '/content/3/lectures' },
      ],
    },
    { label: 'مصادر علمية', url: '/resources' },
    { label: 'عن الموقع', url: '/about' },
    { label: 'تواصل معنا', url: '/contact-us' },
  ];

  private menu$ = new BehaviorSubject<MenuItem[]>(this.menu);

  constructor() { }

  getMenu(): Observable<MenuItem[]> {
    return this.menu$;
  }

}
