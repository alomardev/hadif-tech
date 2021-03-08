import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { IAssignment, IGrade } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-material-list',
  templateUrl: './page-material-list.component.html',
  styleUrls: ['./page-material-list.component.scss']
})
export class PageMaterialListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  sections: MaterialListSection[] = [];
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const { data: dataObservable, params: paramsObservable } = this.activatedRoute;
    this.subscription = combineLatest([ dataObservable, paramsObservable ]).subscribe(([data, params]) => {
      const generator: MaterialListGenerator = data.generator;
      const grade = +params.grade;
      this.dataService.getGrade(grade).subscribe(result => {
        this.sections = generator(result);
      });
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

export type MaterialListGenerator = (grade: IGrade) => MaterialListSection[];
export interface MaterialListSection {
  title: string,
  cards: {
    title: string,
    items: IAssignment[],
  }[]
}
