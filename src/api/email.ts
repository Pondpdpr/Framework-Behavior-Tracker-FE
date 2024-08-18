export async function sendRule(ruleId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}email/rule/${ruleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function sendDaily(data: { users?: number[] }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}email/daily-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function sendReminder(data: { users?: number[] }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}email/reminder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
