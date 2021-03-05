import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'showError'
})
export class ShowErrorPipe implements PipeTransform {

  transform(value: string, formControl: FormControl): unknown {
    return null;
  }

  private canShowError(formControl: FormControl) {
    return (formControl.invalid && (formControl.touched || formControl.dirty));
  }

}
