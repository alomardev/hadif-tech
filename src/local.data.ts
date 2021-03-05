import { IGrade } from "./app/models/entities";
import * as DATA from './local.data.json';

class DataContext {
  private grades: IGrade[] = [];
  constructor() {
    DATA.grades.forEach(grade => {
      this.grades.push(grade as IGrade);
    });
  }

  getGrade(grade: number) {
    return this.grades.find(g => g.grade === grade);
  }
}

const LocalData = new DataContext();
export default LocalData;
