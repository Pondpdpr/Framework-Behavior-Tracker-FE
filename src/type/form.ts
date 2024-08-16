import { QuestionDto } from "./question";
import { UserDto } from "./user";

export type FormDto = {
  id: number;

  date: Date;

  questions: QuestionDto[];
};

export type ResponseDto = {
  answers?: {
    questionId: number;
    answer?: boolean;
  }[];
};

export type FormApiDto = {
  user: UserDto;

  form: FormDto;
};
