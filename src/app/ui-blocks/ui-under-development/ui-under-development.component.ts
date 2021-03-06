import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-under-development',
  templateUrl: './ui-under-development.component.html',
  styleUrls: ['./ui-under-development.component.scss']
})
export class UiUnderDevelopmentComponent implements OnInit {

  @Input() pageName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
