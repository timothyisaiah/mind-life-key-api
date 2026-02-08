export const SUPPORTED_CURRENCIES = [
  { code: "UGX", symbol: "USh", rate: 1 },
  { code: "USD", symbol: "$", rate: 0.00027 },
  { code: "EUR", symbol: "€", rate: 0.00025 },
  { code: "GBP", symbol: "£", rate: 0.00021 },
  { code: "KES", symbol: "KSh", rate: 0.35 },
  { code: "TZS", symbol: "TSh", rate: 0.63 },
  { code: "RWF", symbol: "RF", rate: 0.98 }
];

export const DEFAULT_USER_SETTINGS = {
  currency: "UGX",
  startingBalance: "0.00",
  currentBalance: "0.00"
};

export const DEFAULT_NOTIFICATION_SETTINGS = {
  billReminders: true,
  budgetAlerts: true,
  savingsEncouragement: true,
  achievementNotifications: true,
  reminderDays: 3,
  budgetThreshold: "80.00",
  savingsThreshold: "10.00"
};

export const DEFAULT_AUTO_ALLOCATION_SETTINGS = {
  enabled: false,
  percentage: "0.00",
  priorityOrder: [] as string[]
};
