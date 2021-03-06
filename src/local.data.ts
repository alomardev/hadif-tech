import { IGrade } from "./app/models/entities";
import { IUserProfile } from "./app/models/user";
import * as DATA from './local.data.json';

class DataContext {
  private grades: IGrade[] = [];
  constructor() {
    DATA.grades.forEach(grade => {
      this.grades.push(grade as IGrade);
    });
  }

  getGrade(grade: number): IGrade {
    return this.grades.find(g => g.grade === grade);
  }

  getUser(username: string, password: string): IUserProfile {
    const matcher = username?.trim().toLowerCase();
    return DATA.users.find(u => {
      return (u.username.trim().toLowerCase() === matcher || u.email.toLowerCase().trim() === matcher) &&
      password === u.username.toLowerCase().trim();
    }) as IUserProfile;
  }
}

const LocalData = new DataContext();
export default LocalData;
