import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAssignment, ISubject } from 'src/app/models/entities';
import { SubjectType } from 'src/app/models/enums';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-assignments',
  templateUrl: './page-assignments.component.html',
  styleUrls: ['./page-assignments.component.scss']
})
export class PageAssignmentsComponent implements OnInit, OnDestroy {

  private routerParamSubscription: Subscription;
  sections: ContentCardSection[] = [];
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.routerParamSubscription = this.activatedRoute.params.subscribe(({ grade }) => {
      this.dataService.getGrade(+grade).subscribe(result => {
        this.enumerateSubjects(result.subjects);
      });
    });
  }

  ngOnDestroy(): void {
    this.routerParamSubscription.unsubscribe();
  }

  private enumerateSubjects(subjects: ISubject[]) {

    console.log(this.sections);
  }

}

interface ContentCardSection {
  title: string,
  cards: {
    title: string,
    items: IAssignment[],
  }[]
}
