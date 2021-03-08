import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() type: 'inline' | 'block' = 'inline';
  @Input() name: string = null;
  @Input() size: number = 24;
  @Input() stroke: number = 1.5;
  @Input() color: string = 'currentColor';

  constructor() { }

  ngOnInit(): void {
  }

}
