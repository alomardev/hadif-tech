import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingIndicatorComponent } from 'src/app/components/loading-indicator/loading-indicator.component';
import { IBook, IGrade, ISubject } from 'src/app/models/entities';
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
    { label: 'كتاب المنهج', icon: 'book', onclick: () => {
      let book: IBook;
      if (Array.isArray(this.grade.book)) {
        book = this.grade.book[0];
      } else {
        book = this.grade.book;
      }
      if (book.file) {
        window.open(`assets/materials/${book.file}`, '_blank');
      }
    } },
    { label: 'اختبارات قصيرة', icon: 'quiz', link: 'quizzes' },
    { label: 'الأنشطة الورقية', icon: 'paper', link: 'assignments' },
    { label: 'خزينة الأسئلة', icon: 'vault', link: 'questions' },
  ];

  readonly subjectsListActions: SubjectsListAction[] = [
    { icon: 'lecture', callback: (subject: ISubject) => {
      this.router.navigateByUrl(`/content/${this.gradeNumber}/lectures/${subject.id}`)
    }, show: s => !!s.lecture },
    { icon: 'presentation', callback: (subject: ISubject) => {
      const item = subject.slides[0];
      saveAs(`assets/materials/${item.file}`, `${item.name}.${item.file.match(/[^.]+$/g)[0]}`);
    }, show: s => !!s.slides?.length },
    { icon: 'paper', callback: (subject: ISubject) => {
      const item = subject.assignments[0];
      saveAs(`assets/materials/${item.file}`, `${item.name}.${item.file.match(/[^.]+$/g)[0]}`);
    }, show: s => !!s.assignments?.length },
    { icon: 'quiz', callback: (subject: ISubject) => {
    }, show: s => !!s.quizzes?.length },
  ];

  private routerParamSubscription: Subscription;

  gradeNumber: number;
  grade: IGrade;

  @ViewChild(LoadingIndicatorComponent, { static: true }) loadingIndicator: LoadingIndicatorComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.routerParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.grade = null;
      this.gradeNumber = +params.grade;
      this.dataService.getGrade(+params.grade).pipe(
        this.loadingIndicator.pipe(),
      ).subscribe(grade => {
        this.grade = grade;
      }, error => {});
    });
  }

  ngOnDestroy(): void {
    this.routerParamSubscription.unsubscribe();
  }

}
