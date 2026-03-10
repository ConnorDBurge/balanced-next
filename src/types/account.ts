export type AccountType =
  | "CASH"
  | "CREDIT"
  | "INVESTMENT"
  | "LOAN"
  | "REAL_ESTATE"
  | "VEHICLE"
  | "EMPLOYEE_COMPENSATION"
  | "OTHER_LIABILITY"
  | "OTHER_ASSET";

export type AccountSubType =
  // Cash
  | "CHECKING"
  | "SAVINGS"
  | "DIGITAL_WALLET"
  | "GIFT_CARD"
  | "PHYSICAL_CASH"
  | "OTHER_CASH"
  // Credit
  | "CREDIT_CARD"
  | "CHARGE_CARD"
  | "LINE_OF_CREDIT"
  | "OTHER_CREDIT"
  // Investment
  | "RETIREMENT"
  | "EDUCATION_SAVINGS"
  | "BROKERAGE"
  | "HEALTH_SAVINGS"
  | "OTHER_INVESTMENT"
  // Loan
  | "MORTGAGE"
  | "AUTO_LOAN"
  | "STUDENT_LOAN"
  | "PERSONAL_LOAN"
  | "OTHER_LOAN"
  // Real Estate
  | "PRIMARY_RESIDENCE"
  | "INVESTMENT_PROPERTY"
  | "LAND"
  | "OTHER_REAL_ESTATE"
  // Vehicle
  | "CAR"
  | "TRUCK"
  | "MOTORCYCLE"
  | "BOAT"
  | "RV"
  | "OTHER_VEHICLE"
  // Employee Compensation
  | "STOCK_OPTIONS"
  | "RESTRICTED_STOCK"
  | "ESPP"
  | "BONUS"
  | "OTHER_COMPENSATION"
  // Other Liability
  | "TAXES_PAYABLE"
  | "MEDICAL_BILL"
  | "LEGAL_OBLIGATION"
  | "OTHER_LIABILITY"
  // Other Asset
  | "JEWELRY"
  | "COLLECTIBLE"
  | "LIFE_INSURANCE_CASH_VALUE"
  | "OTHER_ASSET";

export type AccountSource = "MANUAL" | "AUTOMATIC";

export type AccountStatus = "ACTIVE" | "ARCHIVED" | "CLOSED";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";

export interface Account {
  id: string;
  workspaceId: string;
  name: string;
  type: AccountType;
  subType: AccountSubType;
  startingBalance: number;
  balance: number;
  currency: CurrencyCode;
  institutionName: string | null;
  source: AccountSource;
  status: AccountStatus;
  balanceLastUpdated: string | null;
  closedAt: string | null;
  externalId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountPayload {
  name: string;
  type: AccountType;
  subType: AccountSubType;
  startingBalance?: number;
  currency?: CurrencyCode;
  institutionName?: string;
  source?: AccountSource;
}

export interface UpdateAccountPayload {
  name?: string;
  type?: AccountType;
  subType?: AccountSubType;
  startingBalance?: number;
  currency?: CurrencyCode;
  institutionName?: string;
  status?: AccountStatus;
}

// --- Display labels ---

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  CASH: "Cash",
  CREDIT: "Credit",
  INVESTMENT: "Investment",
  LOAN: "Loan",
  REAL_ESTATE: "Real Estate",
  VEHICLE: "Vehicle",
  EMPLOYEE_COMPENSATION: "Employee Compensation",
  OTHER_LIABILITY: "Other Liability",
  OTHER_ASSET: "Other Asset",
};

const ACCOUNT_SUB_TYPE_LABELS: Record<AccountSubType, string> = {
  CHECKING: "Checking",
  SAVINGS: "Savings",
  DIGITAL_WALLET: "Digital Wallet",
  GIFT_CARD: "Gift Card",
  PHYSICAL_CASH: "Physical Cash",
  OTHER_CASH: "Other Cash",
  CREDIT_CARD: "Credit Card",
  CHARGE_CARD: "Charge Card",
  LINE_OF_CREDIT: "Line of Credit",
  OTHER_CREDIT: "Other Credit",
  RETIREMENT: "Retirement",
  EDUCATION_SAVINGS: "Education Savings",
  BROKERAGE: "Brokerage",
  HEALTH_SAVINGS: "Health Savings",
  OTHER_INVESTMENT: "Other Investment",
  MORTGAGE: "Mortgage",
  AUTO_LOAN: "Auto Loan",
  STUDENT_LOAN: "Student Loan",
  PERSONAL_LOAN: "Personal Loan",
  OTHER_LOAN: "Other Loan",
  PRIMARY_RESIDENCE: "Primary Residence",
  INVESTMENT_PROPERTY: "Investment Property",
  LAND: "Land",
  OTHER_REAL_ESTATE: "Other Real Estate",
  CAR: "Car",
  TRUCK: "Truck",
  MOTORCYCLE: "Motorcycle",
  BOAT: "Boat",
  RV: "RV",
  OTHER_VEHICLE: "Other Vehicle",
  STOCK_OPTIONS: "Stock Options",
  RESTRICTED_STOCK: "Restricted Stock",
  ESPP: "ESPP",
  BONUS: "Bonus",
  OTHER_COMPENSATION: "Other Compensation",
  TAXES_PAYABLE: "Taxes Payable",
  MEDICAL_BILL: "Medical Bill",
  LEGAL_OBLIGATION: "Legal Obligation",
  OTHER_LIABILITY: "Other Liability",
  JEWELRY: "Jewelry",
  COLLECTIBLE: "Collectible",
  LIFE_INSURANCE_CASH_VALUE: "Life Insurance Cash Value",
  OTHER_ASSET: "Other Asset",
};

const SOURCE_LABELS: Record<AccountSource, string> = {
  MANUAL: "Manual",
  AUTOMATIC: "Automatic",
};

const STATUS_LABELS: Record<AccountStatus, string> = {
  ACTIVE: "Active",
  ARCHIVED: "Archived",
  CLOSED: "Closed",
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
  JPY: "¥",
};

export function getTypeLabel(type: AccountType): string {
  return ACCOUNT_TYPE_LABELS[type] ?? type;
}

export function getSubTypeLabel(subType: AccountSubType): string {
  return ACCOUNT_SUB_TYPE_LABELS[subType] ?? subType;
}

export function getSourceLabel(source: AccountSource): string {
  return SOURCE_LABELS[source] ?? source;
}

export function getStatusLabel(status: AccountStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return CURRENCY_SYMBOLS[currency] ?? currency;
}

export function formatBalance(balance: number, currency: CurrencyCode): string {
  const symbol = getCurrencySymbol(currency);
  const abs = Math.abs(balance);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return balance < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

// --- Type → SubType mapping ---

export const SUB_TYPES_BY_TYPE: Record<AccountType, AccountSubType[]> = {
  CASH: ["CHECKING", "SAVINGS", "DIGITAL_WALLET", "GIFT_CARD", "PHYSICAL_CASH", "OTHER_CASH"],
  CREDIT: ["CREDIT_CARD", "CHARGE_CARD", "LINE_OF_CREDIT", "OTHER_CREDIT"],
  INVESTMENT: ["RETIREMENT", "EDUCATION_SAVINGS", "BROKERAGE", "HEALTH_SAVINGS", "OTHER_INVESTMENT"],
  LOAN: ["MORTGAGE", "AUTO_LOAN", "STUDENT_LOAN", "PERSONAL_LOAN", "OTHER_LOAN"],
  REAL_ESTATE: ["PRIMARY_RESIDENCE", "INVESTMENT_PROPERTY", "LAND", "OTHER_REAL_ESTATE"],
  VEHICLE: ["CAR", "TRUCK", "MOTORCYCLE", "BOAT", "RV", "OTHER_VEHICLE"],
  EMPLOYEE_COMPENSATION: ["STOCK_OPTIONS", "RESTRICTED_STOCK", "ESPP", "BONUS", "OTHER_COMPENSATION"],
  OTHER_LIABILITY: ["TAXES_PAYABLE", "MEDICAL_BILL", "LEGAL_OBLIGATION", "OTHER_LIABILITY"],
  OTHER_ASSET: ["JEWELRY", "COLLECTIBLE", "LIFE_INSURANCE_CASH_VALUE", "OTHER_ASSET"],
};

export const ALL_ACCOUNT_TYPES: AccountType[] = [
  "CASH",
  "CREDIT",
  "INVESTMENT",
  "LOAN",
  "REAL_ESTATE",
  "VEHICLE",
  "EMPLOYEE_COMPENSATION",
  "OTHER_LIABILITY",
  "OTHER_ASSET",
];

// --- Grouping ---

export type GroupBy = "type" | "institution" | "source" | "none";

export interface AccountGroup {
  label: string;
  accounts: Account[];
}

export function groupAccounts(accounts: Account[], groupBy: GroupBy): AccountGroup[] {
  if (groupBy === "none") {
    return [
      {
        label: "All Accounts",
        accounts: [...accounts].sort((a, b) => a.name.localeCompare(b.name)),
      },
    ];
  }

  const groups = new Map<string, Account[]>();

  for (const account of accounts) {
    let key: string;
    switch (groupBy) {
      case "type":
        key = account.type;
        break;
      case "institution":
        key = account.institutionName || "No Institution";
        break;
      case "source":
        key = account.source;
        break;
    }
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(account);
  }

  const result: AccountGroup[] = [];
  for (const [key, accts] of groups) {
    let label: string;
    switch (groupBy) {
      case "type":
        label = getTypeLabel(key as AccountType);
        break;
      case "source":
        label = getSourceLabel(key as AccountSource);
        break;
      default:
        label = key;
    }
    result.push({
      label,
      accounts: accts.sort((a, b) => a.name.localeCompare(b.name)),
    });
  }

  // Sort groups: for type, use the enum order; otherwise alphabetical
  if (groupBy === "type") {
    result.sort(
      (a, b) =>
        ALL_ACCOUNT_TYPES.indexOf(
          accounts.find((acc) => getTypeLabel(acc.type) === a.label)?.type ?? "OTHER_ASSET"
        ) -
        ALL_ACCOUNT_TYPES.indexOf(
          accounts.find((acc) => getTypeLabel(acc.type) === b.label)?.type ?? "OTHER_ASSET"
        )
    );
  } else {
    result.sort((a, b) => a.label.localeCompare(b.label));
  }

  return result;
}
