import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { IGrade, IMaterial } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';

@Component({
  template: '',
})
export abstract class PageMaterialListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  sections: MaterialListSection[] = [];

  abstract title: string = '';

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const { data: dataObservable, params: paramsObservable } = this.activatedRoute;
    this.subscription = combineLatest([ dataObservable, paramsObservable ]).subscribe(([data, params]) => {
      this.dataService.getGrade(+params.grade).subscribe(result => {
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
