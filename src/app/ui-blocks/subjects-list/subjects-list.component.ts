import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISubject } from 'src/app/models/entities';
import { SubjectType } from 'src/app/models/enums';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
})
export class SubjectsListComponent implements OnInit, OnChanges {

  readonly SubjectType = SubjectType;

  @Input() subjects: ISubject[];
  @Input() actions: SubjectsListAction[];

  flattenedSubjects: SubjectItem[];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.subjects) {
      this.populateSubjects();
    }
  }

  private populateSubjects() {
    this.flattenedSubjects = [];
    this.populate(this.subjects);
    for (let i = 0; i < this.flattenedSubjects.length - 1; i++) {
      const current = this.flattenedSubjects[i];
      const next = this.flattenedSubjects[i + 1];
      current.nextType = next?.type || null;
      current.actions = this.actions.filter(a => a.enable(current));
    }
  }

  private populate(subjects: ISubject[]) {
    subjects.forEach(s => {
      this.flattenedSubjects.push({...s});
      if (s.subjects) {
        this.populate(s.subjects);
      }
    });
  }

}

export interface SubjectsListAction {
  callback: (subject: ISubject) => void;
  enable: (subject: ISubject) => boolean;
  icon: string;
}

export interface SubjectItem  extends ISubject {
  nextType?: SubjectType;
  actions?: SubjectsListAction[];
}
