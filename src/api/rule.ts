import { RuleDto, RuleQueryDto } from "@/type/rule";

export async function createRule(data: RuleDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}rule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateRule(data: RuleDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}rule/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteRule(data: RuleDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}rule/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getRule(params?: RuleQueryDto): Promise<RuleDto[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}rule?` +
      new URLSearchParams({
        isReminder: params?.isReminder === undefined ? "" : params.isReminder.toString(),
      }).toString(),
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const questions = await res.json();
  return questions;
}
