import { CreateUserDto, UserDto } from "@/type/user";

export async function createUser(data: CreateUserDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateUser(data: UserDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(userIds: number[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userIds),
  });
}

export async function getUser(): Promise<UserDto[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const questions = await res.json();

  return questions;
}
