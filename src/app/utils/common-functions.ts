import { Observable } from "rxjs";

export function delayedSuccess<T>(value: T, timeout: number = 600): Observable<T> {
  return new Observable(observer => {
    setTimeout(() => {
      observer.next(value);
      observer.complete();
    }, timeout);
  });
}

export function delayedError<T>(value?: any, timeout: number = 600): Observable<T> {
  return new Observable(observer => {
    setTimeout(() => {
      observer.error(value);
    }, timeout);
  });
}
