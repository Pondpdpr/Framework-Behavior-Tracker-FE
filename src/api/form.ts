import { FormApiDto, ResponseDto } from "@/type/form";

export async function createResponse(token: string, data: ResponseDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/response/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getForm(token: string): Promise<FormApiDto> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/form/${token}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      throw new Error(res.status as unknown as string);
    }

    return res.json();
  } catch (e) {
    throw e;
  }
}
