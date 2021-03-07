import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { PageAboutComponent } from './pages/page-about/page-about.component';
import { PageAssignmentsComponent } from './pages/page-assignments/page-assignments.component';
import { PageBookComponent } from './pages/page-book/page-book.component';
import { PageContactUsComponent } from './pages/page-contact-us/page-contact-us.component';
import { PageContentComponent } from './pages/page-content/page-content.component';
import { PageLecturesComponent } from './pages/page-lectures/page-lectures.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageQuestionsVaultComponent } from './pages/page-questions-vault/page-questions-vault.component';
import { PageQuizzesComponent } from './pages/page-quizzes/page-quizzes.component';
import { PageResourcesComponent } from './pages/page-resources/page-resources.component';
import { PageSlidesComponent } from './pages/page-slides/page-slides.component';

export interface RoutingData {
  pageTitle?: string;
}

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent,
    data: {
      pageTitle: 'تسجيل الدخول',
    } as RoutingData,
  },
  {
    path: 'register',
    component: PageLoginComponent,
    data: {
      pageTitle: 'إنشاء حساب',
    } as RoutingData,
  },

  { path: '', redirectTo: 'content/1', pathMatch: 'full' }, // Utilize auth guard
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'resources',
        component: PageResourcesComponent,
        data: {
          pageTitle: 'مصادر علمية',
        } as RoutingData,
      },
      {
        path: 'about',
        component: PageAboutComponent,
        data: {
          pageTitle: 'عن الموقع',
        } as RoutingData,
      },
      {
        path: 'contact-us',
        component: PageContactUsComponent,
        data: {
          pageTitle: 'تواصل معنا',
        } as RoutingData,
      },

      {
        path: 'content/:grade',
        component: PageContentComponent,
      },
      {
        path: 'content/:grade/lectures',
        component: PageLecturesComponent,
        data: {
          pageTitle: '',
        } as RoutingData,
      },
      {
        path: 'content/:grade/assignments',
        component: PageAssignmentsComponent,
        data: {
          pageTitle: 'الأنشطة الورقية',
        } as RoutingData,
      },
      {
        path: 'content/:grade/quizzes',
        component: PageQuizzesComponent,
        data: {
          pageTitle: 'الاختبارات القصيرة',
        } as RoutingData
      },
      {
        path: 'content/:grade/book',
        component: PageBookComponent,
        data: {
          pageTitle: 'الكتاب',
        } as RoutingData,
      },
      {
        path: 'content/:grade/slides',
        component: PageSlidesComponent,
        data: {
          pageTitle: 'العروض التقديمية',
        } as RoutingData,
      },
      {
        path: 'content/:grade/questions',
        component: PageQuestionsVaultComponent,
        data: {
          pageTitle: 'خزينة الأسئلة',
        } as RoutingData,
      },
    ],
  },

  { path: '404', component: PageNotFoundComponent, data: { pageTitle: '404' } as RoutingData },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
