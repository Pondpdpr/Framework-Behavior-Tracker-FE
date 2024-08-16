import { QuestionDto } from "@/type/question";

export async function createTemplateQuestion(data: QuestionDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/template-question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateTemplateQuestion(data: QuestionDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/template-question/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTemplateQuestion(data: QuestionDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/template-question/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getTemplateQuestion(): Promise<QuestionDto[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/template-question`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const questions = await res.json();

  return questions;
}
