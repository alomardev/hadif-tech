import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageContentComponent } from './pages/page-content/page-content.component';
import { UiFooterComponent } from './ui-blocks/ui-footer/ui-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentExplorerScaffoldComponent } from './layout/content-explorer-scaffold/content-explorer-scaffold.component';
import { SubjectsListComponent } from './ui-blocks/subjects-list/subjects-list.component';
import { UiUnderDevelopmentComponent } from './ui-blocks/ui-under-development/ui-under-development.component';
import { PageAssignmentsComponent } from './pages/page-assignments/page-assignments.component';
import { PageQuizzesComponent } from './pages/page-quizzes/page-quizzes.component';
import { PageLecturesComponent } from './pages/page-lectures/page-lectures.component';
import { PageSlidesComponent } from './pages/page-slides/page-slides.component';
import { PageQuestionsVaultComponent } from './pages/page-questions-vault/page-questions-vault.component';
import { PageBookComponent } from './pages/page-book/page-book.component';
import { PageResourcesComponent } from './pages/page-resources/page-resources.component';
import { PageAboutComponent } from './pages/page-about/page-about.component';
import { PageContactUsComponent } from './pages/page-contact-us/page-contact-us.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageMaterialListComponent } from './pages/page-material-list/page-material-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MasterLayoutComponent,
    IconComponent,
    PageLoginComponent,
    PageContentComponent,
    UiFooterComponent,
    ContentExplorerScaffoldComponent,
    SubjectsListComponent,
    UiUnderDevelopmentComponent,
    PageAssignmentsComponent,
    PageQuizzesComponent,
    PageLecturesComponent,
    PageSlidesComponent,
    PageQuestionsVaultComponent,
    PageBookComponent,
    PageResourcesComponent,
    PageAboutComponent,
    PageContactUsComponent,
    PageNotFoundComponent,
    PageMaterialListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
