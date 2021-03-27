import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGrade, IMaterial } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';
import { mapGradeToMaterialList } from 'src/app/utils/grade-material-mapper';
import { PageMaterialListComponent } from './page-material-list.component';

@Component({
  templateUrl: './page-material-list.component.html',
  styleUrls: ['./page-material-list.component.scss']
})
export class PageAssignmentsComponent extends PageMaterialListComponent {

  title: string = 'الأنشطة الورقية';

  constructor(activatedRoute: ActivatedRoute, dataService: DataService) {
    super(activatedRoute, dataService);
  }

  getMaterialList(grade: IGrade) {
    return mapGradeToMaterialList(grade, 'assignments', 'paper');
  }

}
