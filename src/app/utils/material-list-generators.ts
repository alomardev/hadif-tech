import { IAssignment, IGrade } from "../models/entities";
import { SubjectType } from "../models/enums";
import { MaterialListGenerator, MaterialListSection } from "../pages/page-material-list/page-material-list.component";

export const AssignmentsMaterialListGenerator: MaterialListGenerator = (grade: IGrade) => {
  const result = [];
  const { subjects } = grade;
  subjects.forEach(chapter => {
    const cards = [];
    const section: MaterialListSection = {
      title: chapter.title,
      cards,
    };
    if (chapter.type === SubjectType.Chapter) {
      chapter.subjects?.forEach(unit => {
        const items: IAssignment[] = [];
        unit.assignments?.forEach(a => items.push(a));
        unit.subjects?.forEach(lesson => lesson.assignments?.forEach(a => items.push(a)));
        if (items.length) {
          cards.push({
            title: unit.title,
            items,
          });
        }
      });
      if (cards.length) {
        result.push(section);
      }
    }
  });
  return result;
};
