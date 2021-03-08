import { devOnlyGuardedExpression } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import LocalData from '../../local.data';
import { IGrade } from '../models/entities';
import { delayedError, delayedSuccess } from '../utils/common-functions';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private gradeNames: { [key: number]: string } = {};

  getGrade(grade: number): Observable<IGrade> {
    const result = LocalData.getGrade(grade);
    if (result) {
      return delayedSuccess(result).pipe(tap(g => {
        this.gradeNames[grade] = g.name
      }));
    } else {
      return delayedError('');
    }
  }

  getGradeName(grade: number): Observable<string> {
    if (this.gradeNames[grade]) {
      return of(this.gradeNames[grade]);
    }
    return delayedSuccess(LocalData.getGrade(grade)?.name);
  }

}
