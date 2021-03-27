import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() actions: SubjectsListAction[] = [];
  @Input() clickability: (subject: ISubject) => boolean = null;
  @Output() itemClick = new EventEmitter<ISubject>();
  @Input() selectedSubjectId: string;

  flattenedSubjects: SubjectItem[];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.subjects) {
      this.populateSubjects();
    }
    if (changes.selectedSubjectId) {
      this.flattenedSubjects.forEach(s => {
        s.selected = s.id === this.selectedSubjectId;
      });
    }
  }

  resolveClick(item: SubjectItem) {
    if (item.clickable) {
      this.itemClick.emit(item);
    }
  }

  private populateSubjects() {
    this.flattenedSubjects = [];
    this.populate(this.subjects);
    const hasSubscribers = this.itemClick.observers.length > 0;
    for (let i = 0; i < this.flattenedSubjects.length; i++) {
      const current = this.flattenedSubjects[i];
      const next = this.flattenedSubjects[i + 1];
      current.nextType = next?.type || null;
      current.actions = this.actions.filter(a => a.show(current));
      current.clickable = this.clickability !== null ? this.clickability(current) && hasSubscribers : hasSubscribers;
      current.selected = this.selectedSubjectId === current.id;
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
  callback?: (subject: ISubject) => void;
  selected?: (subject: ISubject) => boolean;
  show?: (subject: ISubject) => boolean;
  icon: string;
}

export interface SubjectItem extends ISubject {
  nextType?: SubjectType;
  actions?: SubjectsListAction[];
  clickable?: boolean;
  selected?: boolean;
}
