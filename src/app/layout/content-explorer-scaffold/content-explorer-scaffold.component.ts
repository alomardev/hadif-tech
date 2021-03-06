import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-explorer-scaffold',
  templateUrl: './content-explorer-scaffold.component.html',
  styleUrls: ['./content-explorer-scaffold.component.scss']
})
export class ContentExplorerScaffoldComponent implements OnInit {

  @Input() title: string;
  @Input() link: { label: string, path: string };

  constructor() { }

  ngOnInit(): void {
  }

}
