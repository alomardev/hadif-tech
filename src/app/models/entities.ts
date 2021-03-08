import { QuestionType, SubjectType } from "./enums";

export interface IGrade {
  id: string;
  grade: number;
  name: string;
  book: IBook;
  subjects: ISubject[];
  questions?: IQuestion[];
}

export interface IBook {
  id: string;
  name: string;
  file: string;
}

export interface ISubject {
  id: string;
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

export interface IMaterial {
  id: string;
  name: string;
  file: string;
}

export interface ISlide extends IMaterial { }

export interface IAssignment extends IMaterial { }

export interface ILecture {
  id: string;
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
  id: string;
  questions: IQuestion[];
  length: number;
}

export interface IQuestion {
  id: string;
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
