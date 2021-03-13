import { Component, HostBinding, Input } from '@angular/core';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent {

  @HostBinding('class.loading-indicator') loadingIndicatorClassName = true;
  @Input() inline = false;
  @Input() size: 'default' | 'sm' | 'lg' = 'default'
  @Input() loading = false;

  pipe<T = any>(): MonoTypeOperatorFunction<T> {
    this.show();
    return pipe(
      finalize(() => {
        this.hide();
      })
    )
  }

  show() {
    this.loading = true;
  }

  hide() {
    this.loading = false;
  }

}
