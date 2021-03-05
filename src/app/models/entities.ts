import { QuestionType, SubjectType } from "./enums";

export interface IGrade {
  id: string | number;
  grade: number;
  name: string;
  book: IBook;
  subjects: ISubject[];
  questions?: IQuestion[];
}

export interface IBook {
  id: string | number;
  name: string;
  file: string;
}

export interface ISubject {
  id: string | number;
  title: string;
  description?: string;
  pageReference?: number;
  type: SubjectType;
  subjects?: ISubject[];
  slides?: ISlide[];
  assignments?: IAssignment[];
  lectures?: ILecture[];
  quizzes?: IQuiz[];
}

export interface ISlide {
  id: string | number;
  name: string;
  file: string;
}

export interface IAssignment {
  id: string | number;
  name: string;
  file: string;
}

export interface ILecture {
  id: string | number;
  name: string;
  description?: string;
  file: string;
  questions?: {
    position: number;
    data: IQuestion;
  }[];
  length: number;
}

export interface IQuiz {
  id: string | number;
  questions: IQuestion[];
  length: number;
}

export interface IQuestion {
  id: string | number;
  label: string;
  type: QuestionType;
  options?: IMultiChoiceQuestionOptions | IMultiAnswersQuestionOptions;
}

export interface IMultiChoiceQuestionOptions {
  answers: [];
  correctAnswer: number;
}

export interface IMultiAnswersQuestionOptions {
  answers: [];
  correctAnswers: number[];
}
