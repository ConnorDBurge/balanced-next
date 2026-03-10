/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
};

export type AccountResponse = Base & {
  __typename?: 'AccountResponse';
  balance: Scalars['BigDecimal']['output'];
  balanceLastUpdated?: Maybe<Scalars['LocalDateTime']['output']>;
  bankConnectionId?: Maybe<Scalars['ID']['output']>;
  closedAt?: Maybe<Scalars['LocalDateTime']['output']>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  currency: CurrencyCode;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  institutionName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  source: AccountSource;
  startingBalance: Scalars['BigDecimal']['output'];
  status: Status;
  subType: AccountSubType;
  type: AccountType;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export enum AccountSource {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL'
}

export enum AccountSubType {
  AutoLoan = 'AUTO_LOAN',
  Boat = 'BOAT',
  Bonus = 'BONUS',
  Brokerage = 'BROKERAGE',
  Car = 'CAR',
  ChargeCard = 'CHARGE_CARD',
  Checking = 'CHECKING',
  Collectible = 'COLLECTIBLE',
  CreditCard = 'CREDIT_CARD',
  DigitalWallet = 'DIGITAL_WALLET',
  EducationSavings = 'EDUCATION_SAVINGS',
  Espp = 'ESPP',
  GiftCard = 'GIFT_CARD',
  HealthSavings = 'HEALTH_SAVINGS',
  InvestmentProperty = 'INVESTMENT_PROPERTY',
  Jewelry = 'JEWELRY',
  Land = 'LAND',
  LegalObligation = 'LEGAL_OBLIGATION',
  LifeInsuranceCashValue = 'LIFE_INSURANCE_CASH_VALUE',
  LineOfCredit = 'LINE_OF_CREDIT',
  MedicalBill = 'MEDICAL_BILL',
  Mortgage = 'MORTGAGE',
  Motorcycle = 'MOTORCYCLE',
  OtherAsset = 'OTHER_ASSET',
  OtherCash = 'OTHER_CASH',
  OtherCompensation = 'OTHER_COMPENSATION',
  OtherCredit = 'OTHER_CREDIT',
  OtherInvestment = 'OTHER_INVESTMENT',
  OtherLiability = 'OTHER_LIABILITY',
  OtherLoan = 'OTHER_LOAN',
  OtherRealEstate = 'OTHER_REAL_ESTATE',
  OtherVehicle = 'OTHER_VEHICLE',
  PersonalLoan = 'PERSONAL_LOAN',
  PhysicalCash = 'PHYSICAL_CASH',
  PrimaryResidence = 'PRIMARY_RESIDENCE',
  RestrictedStock = 'RESTRICTED_STOCK',
  Retirement = 'RETIREMENT',
  Rv = 'RV',
  Savings = 'SAVINGS',
  StockOptions = 'STOCK_OPTIONS',
  StudentLoan = 'STUDENT_LOAN',
  TaxesPayable = 'TAXES_PAYABLE',
  Truck = 'TRUCK'
}

export enum AccountType {
  Cash = 'CASH',
  Credit = 'CREDIT',
  EmployeeCompensation = 'EMPLOYEE_COMPENSATION',
  Investment = 'INVESTMENT',
  Loan = 'LOAN',
  OtherAsset = 'OTHER_ASSET',
  OtherLiability = 'OTHER_LIABILITY',
  RealEstate = 'REAL_ESTATE',
  Vehicle = 'VEHICLE'
}

export enum AggregationProvider {
  Plaid = 'PLAID',
  Teller = 'TELLER'
}

export type BankConnectionResponse = Base & {
  __typename?: 'BankConnectionResponse';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  enrollmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institutionId?: Maybe<Scalars['String']['output']>;
  institutionName?: Maybe<Scalars['String']['output']>;
  lastSyncedAt?: Maybe<Scalars['LocalDateTime']['output']>;
  provider: AggregationProvider;
  status: Status;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type Base = {
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type BudgetCategoryConfigResponse = {
  __typename?: 'BudgetCategoryConfigResponse';
  categoryId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  rolloverType: RolloverType;
};

export type BudgetCategoryViewResponse = {
  __typename?: 'BudgetCategoryViewResponse';
  activity: Scalars['BigDecimal']['output'];
  available: Scalars['BigDecimal']['output'];
  categoryId?: Maybe<Scalars['ID']['output']>;
  children: Array<BudgetCategoryViewResponse>;
  displayOrder: Scalars['Int']['output'];
  expected: Scalars['BigDecimal']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  recurringExpected: Scalars['BigDecimal']['output'];
  rolledOver: Scalars['BigDecimal']['output'];
  rolloverType: RolloverType;
};

export type BudgetPeriodViewResponse = {
  __typename?: 'BudgetPeriodViewResponse';
  availablePool: Scalars['BigDecimal']['output'];
  budgetable: Scalars['BigDecimal']['output'];
  inflow: BudgetSectionResponse;
  leftToBudget: Scalars['BigDecimal']['output'];
  netTotalAvailable: Scalars['BigDecimal']['output'];
  outflow: BudgetSectionResponse;
  periodEnd: Scalars['String']['output'];
  periodStart: Scalars['String']['output'];
  recurringExpected: Scalars['BigDecimal']['output'];
  totalBudgeted: Scalars['BigDecimal']['output'];
  totalRolledOver: Scalars['BigDecimal']['output'];
};

export type BudgetResponse = Base & {
  __typename?: 'BudgetResponse';
  accountIds: Array<Scalars['ID']['output']>;
  anchorDate?: Maybe<Scalars['String']['output']>;
  anchorDay1?: Maybe<Scalars['Int']['output']>;
  anchorDay2?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  currentPeriodEnd?: Maybe<Scalars['String']['output']>;
  currentPeriodStart?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intervalDays?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type BudgetSectionResponse = {
  __typename?: 'BudgetSectionResponse';
  activity: Scalars['BigDecimal']['output'];
  available: Scalars['BigDecimal']['output'];
  categories: Array<BudgetCategoryViewResponse>;
  expected: Scalars['BigDecimal']['output'];
};

export type CategoryResponse = Base & {
  __typename?: 'CategoryResponse';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  excludeFromBudget: Scalars['Boolean']['output'];
  excludeFromTotals: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  income: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  status: Status;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type CategoryTree = Base & {
  __typename?: 'CategoryTree';
  children: Array<CategoryTree>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  excludeFromBudget: Scalars['Boolean']['output'];
  excludeFromTotals: Scalars['Boolean']['output'];
  group: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  income: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  status: Status;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type CreateAccountInput = {
  currency?: InputMaybe<CurrencyCode>;
  institutionName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  source?: InputMaybe<AccountSource>;
  startingBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  subType: AccountSubType;
  type: AccountType;
};

export type CreateBudgetInput = {
  accountIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  anchorDate?: InputMaybe<Scalars['String']['input']>;
  anchorDay1?: InputMaybe<Scalars['Int']['input']>;
  anchorDay2?: InputMaybe<Scalars['Int']['input']>;
  intervalDays?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  excludeFromBudget?: InputMaybe<Scalars['Boolean']['input']>;
  excludeFromTotals?: InputMaybe<Scalars['Boolean']['input']>;
  income?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateMembershipInput = {
  roles: Array<Role>;
  userId: Scalars['ID']['input'];
};

export type CreateMerchantInput = {
  name: Scalars['String']['input'];
};

export type CreateRecurringItemInput = {
  accountId: Scalars['ID']['input'];
  amount: Scalars['BigDecimal']['input'];
  anchorDates: Array<Scalars['LocalDateTime']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['LocalDateTime']['input']>;
  frequencyGranularity: FrequencyGranularity;
  frequencyQuantity?: InputMaybe<Scalars['Int']['input']>;
  merchantName: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['LocalDateTime']['input'];
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateTransactionGroupInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  transactionIds: Array<Scalars['ID']['input']>;
};

export type CreateTransactionInput = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  date: Scalars['LocalDateTime']['input'];
  merchantName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  occurrenceDate?: InputMaybe<Scalars['String']['input']>;
  recurringItemId?: InputMaybe<Scalars['ID']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateTransactionSplitInput = {
  children: Array<SplitChildInput>;
  transactionId: Scalars['ID']['input'];
};

export type CreateWorkspaceInput = {
  name: Scalars['String']['input'];
};

export enum CurrencyCode {
  Aud = 'AUD',
  Cad = 'CAD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Usd = 'USD'
}

export type FieldChange = {
  __typename?: 'FieldChange';
  field: Scalars['String']['output'];
  newValue?: Maybe<Scalars['String']['output']>;
  oldValue?: Maybe<Scalars['String']['output']>;
};

export enum FrequencyGranularity {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type LinkBankInput = {
  accessToken: Scalars['String']['input'];
};

export enum MembershipStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED'
}

export type MerchantResponse = Base & {
  __typename?: 'MerchantResponse';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Status;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addWorkspaceMember?: Maybe<WorkspaceMembershipResponse>;
  createAccount?: Maybe<AccountResponse>;
  createBudget?: Maybe<BudgetResponse>;
  createCategory?: Maybe<CategoryResponse>;
  createMerchant?: Maybe<MerchantResponse>;
  createRecurringItem?: Maybe<RecurringItemResponse>;
  createRecurringItemOverride?: Maybe<RecurringItemOverrideResponse>;
  createTag?: Maybe<Tag>;
  createTransaction?: Maybe<TransactionResponse>;
  createTransactionGroup?: Maybe<TransactionGroup>;
  createTransactionSplit?: Maybe<TransactionSplit>;
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteBudget?: Maybe<Scalars['Boolean']['output']>;
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteMerchant?: Maybe<Scalars['Boolean']['output']>;
  deleteRecurringItem?: Maybe<Scalars['Boolean']['output']>;
  deleteRecurringItemOverride?: Maybe<Scalars['Boolean']['output']>;
  deleteSelf?: Maybe<Scalars['Boolean']['output']>;
  deleteTag?: Maybe<Scalars['Boolean']['output']>;
  deleteTransaction?: Maybe<Scalars['Boolean']['output']>;
  deleteTransactionGroup?: Maybe<Scalars['Boolean']['output']>;
  deleteTransactionSplit?: Maybe<Scalars['Boolean']['output']>;
  linkBank?: Maybe<BankConnectionResponse>;
  moveCategory?: Maybe<Scalars['Boolean']['output']>;
  provisionWorkspace?: Maybe<WorkspaceAuthResponse>;
  removeWorkspaceMember?: Maybe<Scalars['Boolean']['output']>;
  setBudgetExpectedAmount?: Maybe<Scalars['Boolean']['output']>;
  switchWorkspace?: Maybe<WorkspaceAuthResponse>;
  syncTransactions?: Maybe<SyncResult>;
  unlinkBank?: Maybe<Scalars['Boolean']['output']>;
  updateAccount?: Maybe<AccountResponse>;
  updateBudget?: Maybe<BudgetResponse>;
  updateBudgetCategoryConfig?: Maybe<BudgetCategoryConfigResponse>;
  updateCategory?: Maybe<CategoryResponse>;
  updateCurrentWorkspace?: Maybe<WorkspaceResponse>;
  updateMerchant?: Maybe<MerchantResponse>;
  updateRecurringItem?: Maybe<RecurringItemResponse>;
  updateRecurringItemOverride?: Maybe<RecurringItemOverrideResponse>;
  updateSelf?: Maybe<UserResponse>;
  updateTag?: Maybe<Tag>;
  updateTransaction?: Maybe<TransactionResponse>;
  updateTransactionGroup?: Maybe<TransactionGroup>;
  updateTransactionSplit?: Maybe<TransactionSplit>;
  updateWorkspaceMember?: Maybe<WorkspaceMembershipResponse>;
};


export type MutationAddWorkspaceMemberArgs = {
  input: CreateMembershipInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateBudgetArgs = {
  input: CreateBudgetInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateMerchantArgs = {
  input: CreateMerchantInput;
};


export type MutationCreateRecurringItemArgs = {
  input: CreateRecurringItemInput;
};


export type MutationCreateRecurringItemOverrideArgs = {
  input: SetOccurrenceOverrideInput;
  recurringItemId: Scalars['ID']['input'];
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


export type MutationCreateTransactionGroupArgs = {
  input: CreateTransactionGroupInput;
};


export type MutationCreateTransactionSplitArgs = {
  input: CreateTransactionSplitInput;
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['ID']['input'];
};


export type MutationDeleteBudgetArgs = {
  budgetId: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


export type MutationDeleteMerchantArgs = {
  merchantId: Scalars['ID']['input'];
};


export type MutationDeleteRecurringItemArgs = {
  recurringItemId: Scalars['ID']['input'];
};


export type MutationDeleteRecurringItemOverrideArgs = {
  overrideId: Scalars['ID']['input'];
  recurringItemId: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['ID']['input'];
};


export type MutationDeleteTransactionArgs = {
  transactionId: Scalars['ID']['input'];
};


export type MutationDeleteTransactionGroupArgs = {
  transactionGroupId: Scalars['ID']['input'];
};


export type MutationDeleteTransactionSplitArgs = {
  transactionSplitId: Scalars['ID']['input'];
};


export type MutationLinkBankArgs = {
  input: LinkBankInput;
};


export type MutationMoveCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  displayOrder: Scalars['Int']['input'];
};


export type MutationProvisionWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationRemoveWorkspaceMemberArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationSetBudgetExpectedAmountArgs = {
  budgetId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
  input: SetExpectedAmountInput;
  periodStart: Scalars['String']['input'];
};


export type MutationSwitchWorkspaceArgs = {
  input: SwitchWorkspaceInput;
};


export type MutationSyncTransactionsArgs = {
  bankConnectionId: Scalars['ID']['input'];
};


export type MutationUnlinkBankArgs = {
  bankConnectionId: Scalars['ID']['input'];
};


export type MutationUpdateAccountArgs = {
  accountId: Scalars['ID']['input'];
  input: UpdateAccountInput;
};


export type MutationUpdateBudgetArgs = {
  budgetId: Scalars['ID']['input'];
  input: UpdateBudgetInput;
};


export type MutationUpdateBudgetCategoryConfigArgs = {
  budgetId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
  input: UpdateBudgetCategoryConfigInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateCurrentWorkspaceArgs = {
  input: UpdateWorkspaceInput;
};


export type MutationUpdateMerchantArgs = {
  input: UpdateMerchantInput;
  merchantId: Scalars['ID']['input'];
};


export type MutationUpdateRecurringItemArgs = {
  input: UpdateRecurringItemInput;
  recurringItemId: Scalars['ID']['input'];
};


export type MutationUpdateRecurringItemOverrideArgs = {
  input: UpdateOccurrenceOverrideInput;
  overrideId: Scalars['ID']['input'];
  recurringItemId: Scalars['ID']['input'];
};


export type MutationUpdateSelfArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
  tagId: Scalars['ID']['input'];
};


export type MutationUpdateTransactionArgs = {
  input: UpdateTransactionInput;
  transactionId: Scalars['ID']['input'];
};


export type MutationUpdateTransactionGroupArgs = {
  input: UpdateTransactionGroupInput;
  transactionGroupId: Scalars['ID']['input'];
};


export type MutationUpdateTransactionSplitArgs = {
  input: UpdateTransactionSplitInput;
  transactionSplitId: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceMemberArgs = {
  input: UpdateMembershipInput;
  userId: Scalars['ID']['input'];
};

export type OccurrenceTransactionResponse = {
  __typename?: 'OccurrenceTransactionResponse';
  amount: Scalars['BigDecimal']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<AccountResponse>;
  accounts: Array<AccountResponse>;
  bankConnection?: Maybe<BankConnectionResponse>;
  bankConnections: Array<BankConnectionResponse>;
  budget?: Maybe<BudgetResponse>;
  budgetView?: Maybe<BudgetPeriodViewResponse>;
  budgets: Array<BudgetResponse>;
  categories: Array<CategoryResponse>;
  category?: Maybe<CategoryResponse>;
  categoryTree: Array<CategoryTree>;
  currentWorkspace?: Maybe<WorkspaceResponse>;
  merchant?: Maybe<MerchantResponse>;
  merchants: Array<MerchantResponse>;
  recurringItem?: Maybe<RecurringItemResponse>;
  recurringItemMonthView?: Maybe<RecurringItemMonthViewResponse>;
  recurringItems: Array<RecurringItemResponse>;
  self?: Maybe<UserResponse>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  transaction?: Maybe<TransactionResponse>;
  transactionEvents?: Maybe<Array<TransactionEvent>>;
  transactionGroup?: Maybe<TransactionGroup>;
  transactionGroups: Array<TransactionGroup>;
  transactionSplit?: Maybe<TransactionSplit>;
  transactionSplits: Array<TransactionSplit>;
  transactions?: Maybe<TransactionConnection>;
  workspaceMember?: Maybe<WorkspaceMembershipResponse>;
  workspaceMembers: Array<WorkspaceMembershipResponse>;
  workspaces: Array<WorkspaceResponse>;
};


export type QueryAccountArgs = {
  accountId: Scalars['ID']['input'];
};


export type QueryBankConnectionArgs = {
  bankConnectionId: Scalars['ID']['input'];
};


export type QueryBudgetArgs = {
  budgetId: Scalars['ID']['input'];
};


export type QueryBudgetViewArgs = {
  budgetId: Scalars['ID']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  periodOffset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoriesArgs = {
  income?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


export type QueryMerchantArgs = {
  merchantId: Scalars['ID']['input'];
};


export type QueryRecurringItemArgs = {
  recurringItemId: Scalars['ID']['input'];
};


export type QueryRecurringItemMonthViewArgs = {
  month?: InputMaybe<Scalars['String']['input']>;
  periodOffset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTagArgs = {
  tagId: Scalars['ID']['input'];
};


export type QueryTransactionArgs = {
  transactionId: Scalars['ID']['input'];
};


export type QueryTransactionEventsArgs = {
  transactionId: Scalars['ID']['input'];
};


export type QueryTransactionGroupArgs = {
  transactionGroupId: Scalars['ID']['input'];
};


export type QueryTransactionSplitArgs = {
  transactionSplitId: Scalars['ID']['input'];
};


export type QueryTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<TransactionSort>;
};


export type QueryWorkspaceMemberArgs = {
  userId: Scalars['ID']['input'];
};

export type RecurringItemMonthViewResponse = {
  __typename?: 'RecurringItemMonthViewResponse';
  expectedExpenses: Scalars['BigDecimal']['output'];
  expectedIncome: Scalars['BigDecimal']['output'];
  itemCount: Scalars['Int']['output'];
  items: Array<RecurringItemViewResponse>;
  monthEnd: Scalars['String']['output'];
  monthStart: Scalars['String']['output'];
  occurrenceCount: Scalars['Int']['output'];
};

export type RecurringItemOverrideResponse = Base & {
  __typename?: 'RecurringItemOverrideResponse';
  amount?: Maybe<Scalars['BigDecimal']['output']>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  occurrenceDate: Scalars['String']['output'];
  recurringItemId: Scalars['ID']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type RecurringItemResponse = Base & {
  __typename?: 'RecurringItemResponse';
  accountId: Scalars['ID']['output'];
  amount: Scalars['BigDecimal']['output'];
  anchorDates: Array<Scalars['LocalDateTime']['output']>;
  categoryId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  currencyCode: CurrencyCode;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['LocalDateTime']['output']>;
  frequencyGranularity: FrequencyGranularity;
  frequencyQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  merchantId?: Maybe<Scalars['ID']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['LocalDateTime']['output'];
  status: RecurringItemStatus;
  tagIds?: Maybe<Array<Scalars['ID']['output']>>;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export enum RecurringItemStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Paused = 'PAUSED'
}

export type RecurringItemViewResponse = {
  __typename?: 'RecurringItemViewResponse';
  accountId: Scalars['ID']['output'];
  amount: Scalars['BigDecimal']['output'];
  categoryId?: Maybe<Scalars['ID']['output']>;
  currencyCode: CurrencyCode;
  description?: Maybe<Scalars['String']['output']>;
  frequencyGranularity: FrequencyGranularity;
  frequencyQuantity: Scalars['Int']['output'];
  merchantId?: Maybe<Scalars['ID']['output']>;
  occurrences: Array<RecurringOccurrenceResponse>;
  recurringItemId: Scalars['ID']['output'];
  status: RecurringItemStatus;
  totalExpected: Scalars['BigDecimal']['output'];
};

export type RecurringOccurrenceResponse = {
  __typename?: 'RecurringOccurrenceResponse';
  date: Scalars['String']['output'];
  expectedAmount: Scalars['BigDecimal']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  overrideId?: Maybe<Scalars['ID']['output']>;
  transaction?: Maybe<OccurrenceTransactionResponse>;
};

export enum Role {
  Delete = 'DELETE',
  Owner = 'OWNER',
  Read = 'READ',
  Write = 'WRITE'
}

export enum RolloverType {
  AvailablePool = 'AVAILABLE_POOL',
  None = 'NONE',
  SameCategory = 'SAME_CATEGORY'
}

export type SetExpectedAmountInput = {
  expectedAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type SetOccurrenceOverrideInput = {
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  occurrenceDate: Scalars['String']['input'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SplitChildInput = {
  amount: Scalars['BigDecimal']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  merchantName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum Status {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Closed = 'CLOSED'
}

export type SwitchWorkspaceInput = {
  workspaceId: Scalars['ID']['input'];
};

export type SyncResult = {
  __typename?: 'SyncResult';
  accountsSynced: Scalars['Int']['output'];
  transactionsAdded: Scalars['Int']['output'];
  transactionsModified: Scalars['Int']['output'];
  transactionsRemoved: Scalars['Int']['output'];
};

export type Tag = Base & {
  __typename?: 'Tag';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Status;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  content: Array<TransactionResponse>;
  page: PageInfo;
};

export type TransactionEvent = {
  __typename?: 'TransactionEvent';
  changes: Array<FieldChange>;
  eventType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  performedAt: Scalars['LocalDateTime']['output'];
  performedBy: Scalars['String']['output'];
  transactionId: Scalars['ID']['output'];
};

export type TransactionFilter = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
  maxAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  merchantId?: InputMaybe<Scalars['ID']['input']>;
  minAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  recurringItemId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<TransactionSource>;
  splitId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TransactionStatus>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type TransactionGroup = Base & {
  __typename?: 'TransactionGroup';
  categoryId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Scalars['ID']['output']>>;
  totalAmount: Scalars['BigDecimal']['output'];
  transactionIds: Array<Scalars['ID']['output']>;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type TransactionResponse = Base & {
  __typename?: 'TransactionResponse';
  accountId: Scalars['ID']['output'];
  amount: Scalars['BigDecimal']['output'];
  categoryId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  currencyCode: CurrencyCode;
  date: Scalars['LocalDateTime']['output'];
  groupId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  merchantId?: Maybe<Scalars['ID']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  occurrenceDate?: Maybe<Scalars['String']['output']>;
  pendingAt?: Maybe<Scalars['LocalDateTime']['output']>;
  postedAt?: Maybe<Scalars['LocalDateTime']['output']>;
  recurringItemId?: Maybe<Scalars['ID']['output']>;
  source: TransactionSource;
  splitId?: Maybe<Scalars['ID']['output']>;
  status: TransactionStatus;
  tagIds?: Maybe<Array<Scalars['ID']['output']>>;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type TransactionSort = {
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};

export enum TransactionSource {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL'
}

export type TransactionSplit = Base & {
  __typename?: 'TransactionSplit';
  accountId: Scalars['ID']['output'];
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  currencyCode: CurrencyCode;
  date: Scalars['LocalDateTime']['output'];
  id: Scalars['ID']['output'];
  totalAmount: Scalars['BigDecimal']['output'];
  transactionIds: Array<Scalars['ID']['output']>;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export enum TransactionStatus {
  Archived = 'ARCHIVED',
  Pending = 'PENDING',
  Posted = 'POSTED'
}

export type UpdateAccountInput = {
  currency?: InputMaybe<CurrencyCode>;
  institutionName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startingBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  status?: InputMaybe<Status>;
  subType?: InputMaybe<AccountSubType>;
  type?: InputMaybe<AccountType>;
};

export type UpdateBudgetCategoryConfigInput = {
  rolloverType: RolloverType;
};

export type UpdateBudgetInput = {
  accountIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  anchorDate?: InputMaybe<Scalars['String']['input']>;
  anchorDay1?: InputMaybe<Scalars['Int']['input']>;
  anchorDay2?: InputMaybe<Scalars['Int']['input']>;
  intervalDays?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  excludeFromBudget?: InputMaybe<Scalars['Boolean']['input']>;
  excludeFromTotals?: InputMaybe<Scalars['Boolean']['input']>;
  income?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Status>;
};

export type UpdateMembershipInput = {
  roles: Array<Role>;
};

export type UpdateMerchantInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
};

export type UpdateOccurrenceOverrideInput = {
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRecurringItemInput = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  anchorDates?: InputMaybe<Array<Scalars['LocalDateTime']['input']>>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['LocalDateTime']['input']>;
  frequencyGranularity?: InputMaybe<FrequencyGranularity>;
  frequencyQuantity?: InputMaybe<Scalars['Int']['input']>;
  merchantName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['LocalDateTime']['input']>;
  status?: InputMaybe<RecurringItemStatus>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateSplitChildInput = {
  amount: Scalars['BigDecimal']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  merchantName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
};

export type UpdateTransactionGroupInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  transactionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateTransactionInput = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  date?: InputMaybe<Scalars['LocalDateTime']['input']>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
  merchantId?: InputMaybe<Scalars['ID']['input']>;
  merchantName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  occurrenceDate?: InputMaybe<Scalars['String']['input']>;
  recurringItemId?: InputMaybe<Scalars['ID']['input']>;
  splitId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TransactionStatus>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateTransactionSplitInput = {
  children: Array<UpdateSplitChildInput>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkspaceInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UserResponse = Base & {
  __typename?: 'UserResponse';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastWorkspaceId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type WorkspaceAuthResponse = {
  __typename?: 'WorkspaceAuthResponse';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type WorkspaceMembershipResponse = {
  __typename?: 'WorkspaceMembershipResponse';
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  joinedAt: Scalars['LocalDateTime']['output'];
  roles: Array<Role>;
  status: MembershipStatus;
  userId: Scalars['ID']['output'];
  workspaceId: Scalars['ID']['output'];
};

export type WorkspaceResponse = Base & {
  __typename?: 'WorkspaceResponse';
  createdAt: Scalars['LocalDateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type AccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'AccountResponse', id: string, name: string, type: AccountType, subType: AccountSubType, balance: any, balanceLastUpdated?: any | null, currency: CurrencyCode, institutionName?: string | null, source: AccountSource, status: Status, startingBalance: any, closedAt?: any | null, externalId?: string | null, createdAt: any, updatedAt: any, workspaceId: string }> };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'AccountResponse', id: string, name: string, type: AccountType, subType: AccountSubType, balance: any, balanceLastUpdated?: any | null, currency: CurrencyCode, institutionName?: string | null, source: AccountSource, status: Status, startingBalance: any, closedAt?: any | null, externalId?: string | null, createdAt: any, updatedAt: any, workspaceId: string } | null };

export type UpdateAccountMutationVariables = Exact<{
  accountId: Scalars['ID']['input'];
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount?: { __typename?: 'AccountResponse', id: string, name: string, type: AccountType, subType: AccountSubType, balance: any, balanceLastUpdated?: any | null, currency: CurrencyCode, institutionName?: string | null, source: AccountSource, status: Status, startingBalance: any, closedAt?: any | null, externalId?: string | null, createdAt: any, updatedAt: any, workspaceId: string } | null };

export type DeleteAccountMutationVariables = Exact<{
  accountId: Scalars['ID']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount?: boolean | null };

export type SelfQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfQuery = { __typename?: 'Query', self?: { __typename?: 'UserResponse', id: string, email: string, givenName: string, familyName: string } | null };

export type WorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkspacesQuery = { __typename?: 'Query', workspaces: Array<{ __typename?: 'WorkspaceResponse', id: string, name: string, status: string }> };

export type CurrentWorkspaceQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentWorkspaceQuery = { __typename?: 'Query', currentWorkspace?: { __typename?: 'WorkspaceResponse', id: string, name: string } | null };

export type WorkspaceMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkspaceMembersQuery = { __typename?: 'Query', workspaceMembers: Array<{ __typename?: 'WorkspaceMembershipResponse', userId: string, givenName: string, familyName: string, email: string, roles: Array<Role>, status: MembershipStatus, joinedAt: any }> };

export type UpdateCurrentWorkspaceMutationVariables = Exact<{
  input: UpdateWorkspaceInput;
}>;


export type UpdateCurrentWorkspaceMutation = { __typename?: 'Mutation', updateCurrentWorkspace?: { __typename?: 'WorkspaceResponse', id: string, name: string } | null };

export type UpdateWorkspaceMemberMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  input: UpdateMembershipInput;
}>;


export type UpdateWorkspaceMemberMutation = { __typename?: 'Mutation', updateWorkspaceMember?: { __typename?: 'WorkspaceMembershipResponse', userId: string, roles: Array<Role> } | null };

export type RemoveWorkspaceMemberMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type RemoveWorkspaceMemberMutation = { __typename?: 'Mutation', removeWorkspaceMember?: boolean | null };

export type PersonalSettingsSelfQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonalSettingsSelfQuery = { __typename?: 'Query', self?: { __typename?: 'UserResponse', id: string, givenName: string, familyName: string, email: string } | null };

export type UpdateSelfMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateSelfMutation = { __typename?: 'Mutation', updateSelf?: { __typename?: 'UserResponse', id: string, givenName: string, familyName: string, email: string } | null };

export type DeleteSelfMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteSelfMutation = { __typename?: 'Mutation', deleteSelf?: boolean | null };

export type ProvisionWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceInput;
}>;


export type ProvisionWorkspaceMutation = { __typename?: 'Mutation', provisionWorkspace?: { __typename?: 'WorkspaceAuthResponse', id: string, name: string, token: string } | null };

export type SwitchWorkspaceMutationVariables = Exact<{
  input: SwitchWorkspaceInput;
}>;


export type SwitchWorkspaceMutation = { __typename?: 'Mutation', switchWorkspace?: { __typename?: 'WorkspaceAuthResponse', id: string, name: string, token: string } | null };


export const AccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"subType"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceLastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"institutionName"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startingBalance"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workspaceId"}}]}}]}}]} as unknown as DocumentNode<AccountsQuery, AccountsQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"subType"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceLastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"institutionName"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startingBalance"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workspaceId"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"subType"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceLastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"institutionName"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startingBalance"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workspaceId"}}]}}]}}]} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}]}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const SelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Self"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"self"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}}]}}]}}]} as unknown as DocumentNode<SelfQuery, SelfQueryVariables>;
export const WorkspacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<WorkspacesQuery, WorkspacesQueryVariables>;
export const CurrentWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentWorkspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentWorkspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CurrentWorkspaceQuery, CurrentWorkspaceQueryVariables>;
export const WorkspaceMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkspaceMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspaceMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"joinedAt"}}]}}]}}]} as unknown as DocumentNode<WorkspaceMembersQuery, WorkspaceMembersQueryVariables>;
export const UpdateCurrentWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCurrentWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkspaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCurrentWorkspaceMutation, UpdateCurrentWorkspaceMutationVariables>;
export const UpdateWorkspaceMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkspaceMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMembershipInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkspaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkspaceMemberMutation, UpdateWorkspaceMemberMutationVariables>;
export const RemoveWorkspaceMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveWorkspaceMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeWorkspaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<RemoveWorkspaceMemberMutation, RemoveWorkspaceMemberMutationVariables>;
export const PersonalSettingsSelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PersonalSettingsSelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"self"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<PersonalSettingsSelfQuery, PersonalSettingsSelfQueryVariables>;
export const UpdateSelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateSelfMutation, UpdateSelfMutationVariables>;
export const DeleteSelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSelf"}}]}}]} as unknown as DocumentNode<DeleteSelfMutation, DeleteSelfMutationVariables>;
export const ProvisionWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProvisionWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkspaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provisionWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ProvisionWorkspaceMutation, ProvisionWorkspaceMutationVariables>;
export const SwitchWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SwitchWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SwitchWorkspaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"switchWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SwitchWorkspaceMutation, SwitchWorkspaceMutationVariables>;