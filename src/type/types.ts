export type Reading = {
  id: string;
  date: string;
  kwh: number;
  cost: number;
  states: string;
};

export type GoalLimits = {
  energyLimit: number;
  budgetLimit: number;
  alertThreshold: number;
};
