import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-content-explorer-scaffold',
  templateUrl: './content-explorer-scaffold.component.html',
  styleUrls: ['./content-explorer-scaffold.component.scss']
})
export class ContentExplorerScaffoldComponent implements OnInit {

  @Input() title: string;
  @Input() showGradeLink = false;

  link: { label: string, path: string };
  private routerParamSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.routerParamSubscription = this.activatedRoute.params.subscribe(({ grade }) => {
      this.dataService.getGradeName(+grade).subscribe(name => {
        if (name) {
          this.link = { label: name, path: `/content/${grade}` };
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routerParamSubscription.unsubscribe();
  }

}
