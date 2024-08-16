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

  title: string;

  department: string;

  company: string;

  location: string;

  market: string;

  isActive: boolean;

  dailyEmailActivityStatus: EmailActivityStatus;

  reminderEmailActivityStatus: EmailActivityStatus;
};

export type CreateUserDto = {
  firstName: string;

  lastName: string;

  thaiFirstName: string;

  thaiLastName: string;

  email: string;

  title: string;

  department: string;

  company: string;

  location: string;

  market: string;
};
