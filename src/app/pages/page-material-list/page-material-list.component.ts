import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingIndicatorComponent } from 'src/app/components/loading-indicator/loading-indicator.component';
import { IGrade, IMaterial } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';

@Component({
  template: '',
})
export abstract class PageMaterialListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  sections: MaterialListSection[] = [];
  @ViewChild('loadingIndicator', { static: true }) pageLoadingIndicator: LoadingIndicatorComponent;

  abstract title: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    const { data: dataObservable, params: paramsObservable } = this.activatedRoute;
    this.subscription = combineLatest([ dataObservable, paramsObservable ]).subscribe(([_, params]) => {
      this.dataService.getGrade(+params.grade).pipe(
        this.pageLoadingIndicator.pipe(),
      ).subscribe(result => {
        this.sections = this.getMaterialList(result);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  abstract getMaterialList(grade: IGrade): MaterialListSection[];
}

export interface MaterialListSection {
  title: string,
  cards: {
    title: string,
    items: (IMaterial & { icon?: string })[],
  }[]
}
