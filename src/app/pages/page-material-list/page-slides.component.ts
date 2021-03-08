import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGrade } from 'src/app/models/entities';
import { DataService } from 'src/app/services/data.service';
import { mapGradeToMaterialList } from 'src/app/utils/grade-material-mapper';
import { PageMaterialListComponent } from './page-material-list.component';

@Component({
  selector: 'app-page-slides',
  templateUrl: './page-material-list.component.html',
  styleUrls: ['./page-material-list.component.scss']
})
export class PageSlidesComponent extends PageMaterialListComponent {

  title: string = 'العروض التقديمية';

  constructor(activatedRoute: ActivatedRoute, dataService: DataService) {
    super(activatedRoute, dataService);
  }

  getMaterialList(grade: IGrade) {
    return mapGradeToMaterialList(grade, 'slides', 'presentation');
  }

}
