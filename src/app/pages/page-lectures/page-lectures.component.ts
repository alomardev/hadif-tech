import { Location } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingIndicatorComponent } from 'src/app/components/loading-indicator/loading-indicator.component';
import { ISubject } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-lectures',
  templateUrl: './page-lectures.component.html',
  styleUrls: ['./page-lectures.component.scss']
})
export class PageLecturesComponent implements OnInit, OnDestroy {

  @HostBinding('class.master-detail-wrapper') masterDetailClassName = true;
  @ViewChild(LoadingIndicatorComponent, { static: true }) loadingIndicator: LoadingIndicatorComponent;

  private routerParamSubscription: Subscription;
  link: { label: string, path: string };

  currentSubject: ISubject;
  subjects: ISubject[];
  isClickable = (subject: ISubject) => {
    return !!subject.lecture;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.routerParamSubscription = this.activatedRoute.params.subscribe(params => {
      const gradeNumber = +params.grade;
      this.dataService.getGrade(gradeNumber).pipe(
        this.loadingIndicator.pipe(),
        ).subscribe(grade => {
          this.subjects = grade.subjects;
          if (grade.name) {
            this.link = { label: grade.name, path: `/content/${gradeNumber}` };
          }
          const lectureId = params.id === 'recent' || !params.id ? this.subjects[0].subjects[0].subjects[0].id : params.id;
          this.setCurrentSubjectById(lectureId);
      });
    });
  }

  ngOnDestroy(): void {
    this.routerParamSubscription.unsubscribe();
  }

  onItemClick(subject: ISubject) {
    this.currentSubject = subject;
    this.updateUrl();
  }

  private setCurrentSubjectById(id: string) {
    const find = (subjects: ISubject[]) => {
      for (const s of subjects) {
        if (s.id === id) {
          this.currentSubject = s;
          return;
        }
        if (s.subjects && s.subjects.length) find(s.subjects);
      }
    }
    find(this.subjects);
    this.updateUrl();
  }

  private updateUrl() {
    const newUrl = this.location.path().replace(/\/lectures\/?[^\/\?]*/, `/lectures/${this.currentSubject?.id || ''}`);
    this.location.replaceState(newUrl);
  }

}
