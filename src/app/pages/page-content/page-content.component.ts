import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGrade } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';
import { SubjectsListAction } from 'src/app/ui-blocks/subjects-list/subjects-list.component';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit, OnDestroy {

  readonly links = [
    { label: 'الشرح التفاعلي', icon: 'lecture', link: 'lectures' },
    { label: 'عروض تقديمية', icon: 'presentation', link: 'slides' },
    { label: 'كتاب المنهج', icon: 'book', link: 'book' },
    { label: 'اختبارات قصيرة', icon: 'quiz', link: 'quizzes' },
    { label: 'الأنشطة الورقية', icon: 'paper', link: 'assignments' },
    { label: 'خزينة الأسئلة', icon: 'vault', link: 'questions' },
  ];

  readonly subjectsListActions: SubjectsListAction[] = [
    { icon: 'lecture', callback: console.log, enable: s => !!s.lectures?.length },
    { icon: 'presentation', callback: console.log, enable: s => !!s.slides?.length },
    { icon: 'paper', callback: console.log, enable: s => !!s.assignments?.length },
    { icon: 'quiz', callback: console.log, enable: s => !!s.quizzes?.length },
  ];

  grade: IGrade;
  private routerParamSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.routerParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.dataService.getGrade(+params.grade).subscribe(grade => {
        this.grade = grade;
      });
    });
  }

  ngOnDestroy(): void {
    this.routerParamSubscription.unsubscribe();
  }

}
