import { devOnlyGuardedExpression } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LocalData from '../../local.data';
import { IGrade } from '../models/entities';
import { delayedError, delayedSuccess } from '../utils/common-functions';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getGrade(grade: number): Observable<IGrade> {
    const result = LocalData.getGrade(grade);
    if (result) {
      return delayedSuccess(result);
    } else {
      return delayedError('');
    }
  }

}
