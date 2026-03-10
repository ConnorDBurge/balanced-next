import { z } from "zod";
import {
  ALL_ACCOUNT_TYPES,
  SUB_TYPES_BY_TYPE,
  type AccountType,
  type AccountSubType,
  type AccountStatus,
  type CurrencyCode,
} from "@/types/account";

const ALL_SUB_TYPES = Object.values(SUB_TYPES_BY_TYPE).flat() as [AccountSubType, ...AccountSubType[]];
const ALL_CURRENCIES: [CurrencyCode, ...CurrencyCode[]] = ["USD"];

export const accountFormSchema = z.object({
  name: z.string().trim().min(1, "Account name is required").max(120),
  type: z.enum(ALL_ACCOUNT_TYPES as [AccountType, ...AccountType[]]),
  subType: z.enum(ALL_SUB_TYPES),
  startingBalance: z.string(),
  balanceSign: z.union([z.literal(1), z.literal(-1)]),
  currency: z.enum(ALL_CURRENCIES),
  institutionName: z.string().max(120),
  status: z.enum(["ACTIVE", "ARCHIVED", "CLOSED"] as [AccountStatus, ...AccountStatus[]]),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

export const accountFormDefaults: AccountFormValues = {
  name: "",
  type: "CASH",
  subType: "CHECKING",
  startingBalance: "",
  balanceSign: 1,
  currency: "USD",
  institutionName: "",
  status: "ACTIVE",
};
