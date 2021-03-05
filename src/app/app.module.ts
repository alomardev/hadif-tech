import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageContentComponent } from './pages/page-content/page-content.component';
import { UiFooterComponent } from './ui-blocks/ui-footer/ui-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MasterLayoutComponent,
    IconComponent,
    PageLoginComponent,
    PageContentComponent,
    UiFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
