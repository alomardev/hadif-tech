import { IGrade, ISlide } from "../models/entities";
import { SubjectType } from "../models/enums";
import { MaterialListSection } from "../pages/page-material-list/page-material-list.component";

export function mapGradeToMaterialList(grade: IGrade, property: string, icon?: string) {
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
        const items = [];
        unit[property]?.forEach(a => items.push(a));
        unit.subjects?.forEach(lesson => lesson[property]?.forEach(a => items.push(a)));
        if (items.length) {
          cards.push({
            title: unit.title,
            items,
            icon,
          });
        }
      });
      if (cards.length) {
        result.push(section);
      }
    }
  });
  return result;
}
