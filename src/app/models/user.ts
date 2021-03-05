import { Gender } from "./enums";

export interface IUserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  grade: number;
  gender: Gender;
}
