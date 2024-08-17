import { z } from "zod";

export enum EmailActivityStatus {
  EMAIL_SENDING = "sending",
  EMAIL_DELIVERED = "delivered",
  EMAIL_FAILED = "failed",
  OPENED = "opened",
}

export const EmailActivityStatusOption = [
  {
    value: "all",
    label: "All",
  },
  {
    value: EmailActivityStatus.EMAIL_SENDING,
    label: "Sending",
  },
  {
    value: EmailActivityStatus.EMAIL_DELIVERED,
    label: "Delivered",
  },
  {
    value: EmailActivityStatus.EMAIL_FAILED,
    label: "Failed",
  },
  {
    value: EmailActivityStatus.OPENED,
    label: "Opened",
  },
];

export type UserDto = {
  id: number;

  firstName: string;

  lastName: string;

  thaiFirstName: string;

  thaiLastName: string;

  email: string;

  gender: string;

  group: string;

  position: string;

  directSuperior: string;

  location: string;

  dealership: string;

  phone: string;

  isActive: boolean;

  isSubmitted: boolean;

  dailyEmailActivityStatus: EmailActivityStatus;

  reminderEmailActivityStatus: EmailActivityStatus;
};

export type CreateUserDto = {
  firstName: string;

  lastName: string;

  thaiFirstName?: string;

  thaiLastName?: string;

  email: string;

  gender?: string;

  group?: string;

  position?: string;

  directSuperior?: string;

  location?: string;

  dealership?: string;

  phone: string;
};

export const UserSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  thaiFirstName: z.string(),
  thaiLastName: z.string(),
  email: z.string().min(1, { message: "Required" }),
  gender: z.string(),
  group: z.string(),
  position: z.string(),
  directSuperior: z.string(),
  location: z.string(),
  dealership: z.string(),
  phone: z.string().min(1, { message: "Required" }),
});

export const UserFields = [
  {
    label: "First Name",
    value: "firstName",
    required: true,
  },
  {
    label: "Last Name",
    value: "lastName",
    required: true,
  },
  {
    label: "Thai First Name",
    value: "thaiFirstName",
  },
  {
    label: "Thai Last Name",
    value: "thaiLastName",
  },
  {
    label: "Email",
    value: "email",
    required: true,
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Group",
    value: "group",
  },
  {
    label: "Position",
    value: "position",
  },
  {
    label: "Direct superior",
    value: "directSuperior",
  },
  {
    label: "Dealership",
    value: "dealership",
  },
  {
    label: "Location",
    value: "location",
  },
  {
    label: "Phone",
    value: "phone",
    required: true,
  },
];
