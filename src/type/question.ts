export type QuestionDto = {
  id: number;

  question: string;

  behavior: BehaviorType;

  isActive?: boolean;
};

export enum BehaviorType {
  SALES_LEAD_MANAGEMENT = "P1",
  CUSTOMER_LOGGING = "P2",
  STS_SALES_FUNNEL_MANAGEMENT = "P3",
  SALES_MEETING_OPTIMISATION = "P4",
  TIME_MANAGEMENT = "P5",
  SALES_PRESENTATION = "S1",
  CLOSING_TECHNIQUES = "S2",
  CUSTOMER_FOLLOW_UPS = "S3",
  OBJECTION_HANDLING = "S4",
  USING_SCRIPTS = "S5",
  CUSTOMERS_NAME_X5 = "B1",
  GESTURES = "B2",
  EYE_CONTACT = "B3",
  TONE_OF_VOICE = "B4",
  ACTIVE_MINDFUL_LISTENING = "B5",
  TESTING = "X",
}

export const BehaviorOption = [
  {
    value: BehaviorType.SALES_LEAD_MANAGEMENT,
    label: "Sales Lead Management",
  },
  {
    value: BehaviorType.CUSTOMER_LOGGING,
    label: "Customer Logging",
  },
  {
    value: BehaviorType.STS_SALES_FUNNEL_MANAGEMENT,
    label: "STS/Sales Funnel Management",
  },
  {
    value: BehaviorType.SALES_MEETING_OPTIMISATION,
    label: "Sales Meeting Optimisation",
  },
  {
    value: BehaviorType.TIME_MANAGEMENT,
    label: "Time Management",
  },
  {
    value: BehaviorType.SALES_PRESENTATION,
    label: "Sales Presentation",
  },
  {
    value: BehaviorType.CLOSING_TECHNIQUES,
    label: "Closing Techniques",
  },
  {
    value: BehaviorType.CUSTOMER_FOLLOW_UPS,
    label: "Customer Follow-Ups",
  },
  {
    value: BehaviorType.OBJECTION_HANDLING,
    label: "Objection Handling",
  },
  {
    value: BehaviorType.USING_SCRIPTS,
    label: "Using Scripts",
  },
  {
    value: BehaviorType.CUSTOMERS_NAME_X5,
    label: "Customer’s Name x5",
  },
  {
    value: BehaviorType.GESTURES,
    label: "Gestures",
  },
  {
    value: BehaviorType.EYE_CONTACT,
    label: "Eye Contact",
  },
  {
    value: BehaviorType.TONE_OF_VOICE,
    label: "Tone of Voice",
  },
  {
    value: BehaviorType.ACTIVE_MINDFUL_LISTENING,
    label: "Active/Mindful Listening",
  },
  {
    value: BehaviorType.TESTING,
    label: "Testing System",
  },
];
