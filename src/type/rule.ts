export enum RuleType {
  DEFAULT = "default",
  TO_ALL = "to all",
  RULE_1 = "rule 1",
  RULE_2 = "rule 2",
  RULE_3 = "rule 3",
  RULE_4 = "rule 4",
  RULE_5 = "rule 5",
  RULE_6 = "rule 6",
  RULE_7 = "rule 7",
  RULE_8 = "rule 8",
  REMINDER = "reminder",
}

export const RuleOption = [
  {
    value: RuleType.DEFAULT,
    label: RuleType.DEFAULT,
  },
  {
    value: RuleType.TO_ALL,
    label: RuleType.TO_ALL,
  },
  {
    value: RuleType.RULE_1,
    label: RuleType.RULE_1,
  },
  {
    value: RuleType.RULE_2,
    label: RuleType.RULE_2,
  },
  {
    value: RuleType.RULE_3,
    label: RuleType.RULE_3,
  },
  {
    value: RuleType.RULE_4,
    label: RuleType.RULE_4,
  },
  {
    value: RuleType.RULE_5,
    label: RuleType.RULE_5,
  },
  {
    value: RuleType.RULE_6,
    label: RuleType.RULE_6,
  },
  {
    value: RuleType.RULE_7,
    label: RuleType.RULE_7,
  },
  {
    value: RuleType.RULE_8,
    label: RuleType.RULE_8,
  },
];

export type RuleDto = {
  id: number;

  text: string;

  rule: RuleType;

  isActive: boolean;
};

export type RuleQueryDto = {
  isReminder?: boolean;
};
