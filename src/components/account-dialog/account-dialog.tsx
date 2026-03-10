"use client";

import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/ui/confirm-action";
import { CurrencyInput } from "@/components/ui/currency-input";
import { FormField } from "@/components/ui/form-field";
import { FormSelect } from "@/components/ui/form-select";
import { RadioList } from "@/components/ui/radio-list";
import { SectionCard } from "@/components/ui/section-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { graphql } from "@/__generated__/gql";
import { STATUS_DOT_COLORS, TYPE_DOT_COLORS } from "@/lib/account-colors";
import { accountFormDefaults, accountFormSchema, type AccountFormValues } from "@/lib/schemas/account-schema";
import { errorToast, successToast } from "@/lib/toast";
import { formatRelativeDate } from "@/lib/utils";
import { useTellerConnect } from "@/hooks/use-teller-connect";
import {
  ALL_ACCOUNT_TYPES,
  Account,
  AccountSubType,
  AccountType,
  CreateAccountPayload,
  CurrencyCode,
  SUB_TYPES_BY_TYPE,
  UpdateAccountPayload,
  formatBalance,
  getStatusLabel,
  getSubTypeLabel,
  getTypeLabel
} from "@/types/account";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Building2, Pencil, PenLine, RefreshCw, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const LINK_BANK_MUTATION = graphql(`
  mutation LinkBank($input: LinkBankInput!) {
    linkBank(input: $input) {
      id
      institutionName
      status
    }
  }
`);

const SYNC_TRANSACTIONS_MUTATION = graphql(`
  mutation SyncTransactionsAfterLink($bankConnectionId: ID!) {
    syncTransactions(bankConnectionId: $bankConnectionId) {
      transactionsAdded
      accountsSynced
    }
  }
`);

const CURRENCIES: CurrencyCode[] = ["USD"];

function getBalanceHelpText(type: AccountType): string | null {
  switch (type) {
    case "CREDIT":
    case "LOAN":
    case "OTHER_LIABILITY":
      return "For debt accounts, the balance represents how much is owed. A positive balance indicates debt, and a negative balance indicates a credit on the account.";
    case "REAL_ESTATE":
    case "VEHICLE":
    case "OTHER_ASSET":
      return "Enter the current estimated value of this asset. You can update this anytime.";
    case "INVESTMENT":
    case "EMPLOYEE_COMPENSATION":
      return "Enter the current value of your holdings. You can update this anytime.";
    default:
      return null;
  }
}


interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account | null;
  existingNames?: string[];
  onSave: (data: CreateAccountPayload | UpdateAccountPayload) => Promise<void>;
  onDelete?: () => Promise<void>;
  onConnect?: () => void;
  onSync?: () => Promise<void>;
}

export function AccountDialog({ open, onOpenChange, account, existingNames = [], onSave, onDelete, onConnect, onSync }: AccountDialogProps) {
  const isEdit = !!account;

  // RHF manages all form fields
  const { control, handleSubmit, reset, watch, setValue, formState: { isDirty } } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: accountFormDefaults,
  });

  // Create mode: top-level mode gate
  const [mode, setMode] = useState<"choose" | "manual">("choose");

  // Wizard flow state (create mode only)
  const [typeSelected, setTypeSelected] = useState(false);
  const [subTypeSelected, setSubTypeSelected] = useState(false);

  // UI interaction state
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [linking, setLinking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editingBalance, setEditingBalance] = useState(false);

  const teller = useTellerConnect();
  const [linkBank] = useMutation(LINK_BANK_MUTATION);
  const [syncTransactions] = useMutation(SYNC_TRANSACTIONS_MUTATION);

  // Watch form values for computed properties
  const name = watch("name");
  const type = watch("type");
  const subType = watch("subType");
  const startingBalance = watch("startingBalance");
  const balanceSign = watch("balanceSign");
  const status = watch("status");

  const signedBalanceValue = startingBalance ? balanceSign * parseFloat(startingBalance) : 0;
  const signedBalanceStr = startingBalance ? String(signedBalanceValue) : "";

  const nameTaken = name.trim().length > 0 && existingNames.some(
    (n) => n.toLowerCase() === name.trim().toLowerCase() && (!isEdit || n.toLowerCase() !== account!.name.toLowerCase())
  );

  // Reset form when panel opens
  useEffect(() => {
    if (open && account) {
      const sb = account.startingBalance ?? 0;
      reset({
        name: account.name,
        type: account.type,
        subType: account.subType,
        startingBalance: sb !== 0 ? String(Math.abs(sb)) : "",
        balanceSign: sb < 0 ? -1 : 1,
        currency: account.currency,
        institutionName: account.institutionName ?? "",
        status: account.status,
      });
      setEditingBalance(false);
      setConfirmingDelete(false);
    } else if (open && !account) {
      reset(accountFormDefaults);
      setMode("choose");
      setTypeSelected(false);
      setSubTypeSelected(false);
    }
  }, [open, account, reset]);

  // Reset sub-type when type changes
  useEffect(() => {
    const allowed = SUB_TYPES_BY_TYPE[type];
    if (!allowed.includes(subType)) {
      setValue("subType", allowed[0]);
    }
  }, [type, subType, setValue]);

  async function onSubmit(data: AccountFormValues) {
    setSaving(true);
    try {
      if (isEdit) {
        const payload: UpdateAccountPayload = {};
        if (data.name !== account!.name) payload.name = data.name;
        if (data.type !== account!.type) payload.type = data.type;
        if (data.subType !== account!.subType) payload.subType = data.subType;
        if (data.institutionName !== (account!.institutionName ?? "")) {
          payload.institutionName = data.institutionName || undefined;
        }
        const signed = data.startingBalance ? data.balanceSign * parseFloat(data.startingBalance) : 0;
        const signedStr = data.startingBalance ? String(signed) : "";
        if (signedStr !== (account!.startingBalance?.toString() ?? "")) {
          payload.startingBalance = signed;
        }
        await onSave(payload);
        successToast("Account updated");
      } else {
        const signed = data.startingBalance ? data.balanceSign * parseFloat(data.startingBalance) : 0;
        const payload: CreateAccountPayload = {
          name: data.name,
          type: data.type,
          subType: data.subType,
          currency: data.currency,
        };
        if (data.startingBalance) payload.startingBalance = signed;
        if (data.institutionName) payload.institutionName = data.institutionName;
        await onSave(payload);
        successToast("Account created");
      }
      onOpenChange(false);
    } catch {
      errorToast("Failed to save account");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    setDeleting(true);
    try {
      await onDelete();
      successToast("Account deleted");
      onOpenChange(false);
    } catch {
      errorToast("Failed to delete account");
    } finally {
      setDeleting(false);
    }
  }

  const allowedSubTypes = SUB_TYPES_BY_TYPE[type];

  // Edit mode → Sheet (side panel)
  if (isEdit) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="sm:max-w-[420px] flex flex-col overflow-hidden gap-0"
          showCloseButton={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="px-4 pt-4 pb-3">
            <SheetTitle className="text-base font-semibold">Edit Account</SheetTitle>
            <SheetDescription className="sr-only">
              Update your account details.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 pb-4 flex-1 overflow-y-auto">
            {/* ACCOUNT INFORMATION */}
            <SectionCard title="Account Information">
              <FormField
                control={control}
                name="name"
                id="account-name"
                label="Account Name"
                placeholder="e.g. Chase Checking"
                maxLength={120}
                error={nameTaken ? "An account with this name already exists." : undefined}
              />

              <FormField
                control={control}
                name="institutionName"
                id="institution-name"
                label="Institution Name"
                placeholder="e.g. Chase, Vanguard"
                maxLength={120}
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <FormSelect
                    control={control}
                    name="type"
                    label="Account Type"
                    options={ALL_ACCOUNT_TYPES.map((t) => ({ value: t, label: getTypeLabel(t) }))}
                    triggerClassName="w-full"
                    testId="type-select"
                  />
                </div>

                <div className="min-w-0">
                  <FormSelect
                    control={control}
                    name="subType"
                    label="Account Subtype"
                    options={allowedSubTypes.map((st) => ({ value: st, label: getSubTypeLabel(st) }))}
                    triggerClassName="w-full"
                    testId="subtype-select"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                  <p className={`font-medium flex items-center gap-1.5 ${STATUS_DOT_COLORS[status]}`}>
                    {getStatusLabel(status)}
                    {account!.source !== "MANUAL" && <Zap className="size-3.5" />}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Source</p>
                  <p className="font-medium">{account!.source === "MANUAL" ? "Manual" : "Automatic"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Created</p>
                  <p className="font-medium">
                    {new Date(account!.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* BALANCE */}
            <SectionCard
              title="Balance"
              headerAction={account!.source === "MANUAL" && !editingBalance ? (
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => setEditingBalance(true)}
                  title="Edit starting balance"
                >
                  <Pencil className="size-3.5" />
                </button>
              ) : account!.source !== "MANUAL" && onSync ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    setSyncing(true);
                    try {
                      await onSync();
                      successToast("Account synced");
                    } catch {
                      errorToast("Sync failed");
                    } finally {
                      setSyncing(false);
                    }
                  }}
                  disabled={syncing || saving}
                >
                  <RefreshCw className={`size-3.5 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Syncing…" : "Sync Now"}
                </Button>
              ) : undefined}
            >
              {account!.source === "MANUAL" && editingBalance && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting Balance</p>
                  <CurrencyInput
                    control={control}
                    name="startingBalance"
                    signName="balanceSign"
                    fixedCurrency={account!.currency}
                  />
                </div>
              )}

              <div className={editingBalance ? "animate-in fade-in slide-in-from-top-1 duration-200" : ""}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Balance</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold tabular-nums">
                    {formatBalance(account!.balance, account!.currency)}
                  </p>
                  {account!.source !== "MANUAL" && syncing && (
                    <RefreshCw className="text-primary animate-spin" size={18} strokeWidth={2.5} style={{ animationDuration: "3s" }} />
                  )}
                  {editingBalance && signedBalanceStr !== (account!.startingBalance?.toString() ?? "") && (
                    <span className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                      <ArrowRight className="size-4 text-muted-foreground" />
                      <span className="text-lg font-semibold tabular-nums text-primary">
                        {formatBalance(
                          account!.balance - (account!.startingBalance ?? 0) + signedBalanceValue,
                          account!.currency
                        )}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Balance Last Updated</p>
                <p className="text-sm">
                  {formatRelativeDate(account!.balanceLastUpdated)}
                </p>
              </div>
            </SectionCard>

            {/* ACTIONS */}
            <SectionCard title="Actions">
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-center" disabled>
                  View All Transactions
                </Button>
                {status !== "ARCHIVED" && (
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={async () => {
                      setSaving(true);
                      try {
                        await onSave({ status: "ARCHIVED" });
                        successToast("Account archived");
                        onOpenChange(false);
                      } catch {
                        errorToast("Failed to archive account");
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving || deleting}
                    data-testid="archive-account-btn"
                  >
                    Archive Account
                  </Button>
                )}
                {status !== "CLOSED" && (
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={async () => {
                      setSaving(true);
                      try {
                        await onSave({ status: "CLOSED" });
                        successToast("Account marked as closed");
                        onOpenChange(false);
                      } catch {
                        errorToast("Failed to close account");
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving || deleting}
                    data-testid="close-account-btn"
                  >
                    Mark as Closed
                  </Button>
                )}
                {status !== "ACTIVE" && (
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={async () => {
                      setSaving(true);
                      try {
                        await onSave({ status: "ACTIVE" });
                        successToast("Account reactivated");
                        onOpenChange(false);
                      } catch {
                        errorToast("Failed to reactivate account");
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving || deleting}
                    data-testid="reactivate-account-btn"
                  >
                    Reactivate Account
                  </Button>
                )}
                {onDelete && !confirmingDelete && (
                  <Button
                    variant="destructive"
                    className="w-full justify-center"
                    onClick={() => setConfirmingDelete(true)}
                    disabled={deleting || saving}
                    data-testid="delete-account-btn"
                  >
                    Remove This Account
                  </Button>
                )}
                {onDelete && confirmingDelete && (
                  <ConfirmAction
                    onConfirm={handleDelete}
                    onCancel={() => setConfirmingDelete(false)}
                    loading={deleting}
                  />
                )}
              </div>
            </SectionCard>
          </div>

          <SheetFooter className="px-4 py-3">
            <div className="flex w-full items-center justify-between">
              <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSubmit(onSubmit)} disabled={saving || !name.trim() || !isDirty || nameTaken}>
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Create mode → single-pane progressive flow
  const detailsReady = typeSelected && subTypeSelected;

  function handleConnectBank() {
    teller.open({
      onSuccess: async (enrollment) => {
        setLinking(true);
        try {
          const result = await linkBank({
            variables: { input: { accessToken: enrollment.accessToken } },
            errorPolicy: "all",
          });
          if (result.data?.linkBank) {
            await syncTransactions({ variables: { bankConnectionId: result.data.linkBank.id } });
            onConnect?.();
            successToast(`Connected to ${result.data.linkBank.institutionName ?? enrollment.institution.name}`);
            onOpenChange(false);
          } else {
            errorToast("Failed to link bank account");
          }
        } catch {
          errorToast("Failed to link bank account");
        } finally {
          setLinking(false);
        }
      },
      onExit: () => {},
      onFailure: () => {
        errorToast("Bank connection failed");
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-[420px] flex flex-col overflow-hidden gap-0"
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="px-4 pt-4 pb-3">
          <SheetTitle className="text-base font-semibold">Add Account</SheetTitle>
          <SheetDescription className="sr-only">
            Create a new account.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 pb-4 flex-1 overflow-y-auto">
          {/* Mode selection — choose between bank link or manual */}
          {mode === "choose" && (
            <div className="flex flex-col gap-3 animate-in fade-in duration-200">
              <button
                type="button"
                disabled={linking}
                onClick={handleConnectBank}
                className="rounded-lg border border-border px-4 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-3">
                  <Building2 className="size-5 text-muted-foreground shrink-0" />
                  <span className="flex flex-col">
                    <span className="font-medium text-sm">Connect a bank automatically</span>
                    <span className="text-xs text-muted-foreground">Sync balances &amp; transactions</span>
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground shrink-0" />
              </button>

              <div className="rounded-md bg-muted/40 border border-border px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                Connecting your bank imports all associated accounts — checking, savings, and credit cards — and keeps balances &amp; transactions in sync automatically.
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground">or add manually</span>
                <div className="flex-1 border-t border-border" />
              </div>

              <button
                type="button"
                onClick={() => setMode("manual")}
                className="rounded-lg border border-border px-4 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <PenLine className="size-5 text-muted-foreground shrink-0" />
                  <span className="flex flex-col">
                    <span className="font-medium text-sm">Add manually</span>
                    <span className="text-xs text-muted-foreground">Checking, savings, investment...</span>
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground shrink-0" />
              </button>

              <div className="rounded-md bg-muted/40 border border-border px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                Manually-managed accounts let you track any asset or liability. Enter a starting balance and add transactions yourself, or import them later via CSV.
              </div>
            </div>
          )}

          {/* Manual wizard */}
          {mode === "manual" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {detailsReady ? (
                <button
                  type="button"
                  className="rounded-lg border border-border px-4 py-3 flex items-center justify-between text-sm text-left cursor-pointer hover:bg-muted/50 transition-colors animate-in fade-in duration-300"
                  onClick={() => { setSubTypeSelected(false); setTypeSelected(false); }}
                >
                  <span className="flex items-center gap-2">
                    <span className={`size-2.5 rounded-full shrink-0 ${TYPE_DOT_COLORS[type]}`} />
                    <span className="font-medium">{getTypeLabel(type)}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{getSubTypeLabel(subType)}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">Change</span>
                </button>
              ) : (
                <>
                  <RadioList
                    title="What type of account is this?"
                    options={ALL_ACCOUNT_TYPES.map((t) => ({ value: t, label: getTypeLabel(t) }))}
                    value={typeSelected ? type : undefined}
                    onChange={(v) => { setValue("type", v as AccountType); setTypeSelected(true); setSubTypeSelected(false); setValue("subType", SUB_TYPES_BY_TYPE[v as AccountType][0]); }}
                  />

                  {typeSelected && (
                    <RadioList
                      title={`What type of ${getTypeLabel(type).toLowerCase()} is this?`}
                      options={allowedSubTypes.map((st) => ({ value: st, label: getSubTypeLabel(st) }))}
                      onChange={(v) => { setValue("subType", v as AccountSubType); setSubTypeSelected(true); }}
                      className="animate-in fade-in slide-in-from-top-2 duration-200"
                    />
                  )}
                </>
              )}

              {detailsReady && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <SectionCard>
                    <FormField
                      control={control}
                      name="name"
                      id="create-name"
                      label="Account Name"
                      placeholder="e.g. Chase Checking"
                      maxLength={120}
                      error={nameTaken ? "An account with this name already exists." : undefined}
                    />

                    <FormField
                      control={control}
                      name="institutionName"
                      id="create-institution"
                      label="Institution Name"
                      placeholder="e.g. Chase, Vanguard"
                      maxLength={120}
                      optional
                    />
                  </SectionCard>

                  <SectionCard>
                    <div>
                      <h3 className="text-sm font-medium mb-1">
                        Starting Balance
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        This will be used as the starting balance for your account. Future transactions will adjust it. If you&apos;re not sure, an estimation will suffice.
                      </p>
                    </div>

                    {getBalanceHelpText(type) && (
                      <div className="rounded-md bg-muted/40 border border-border p-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {getBalanceHelpText(type)}
                        </p>
                      </div>
                    )}

                    <CurrencyInput
                      control={control}
                      name="startingBalance"
                      signName="balanceSign"
                      currencyName="currency"
                      currencies={CURRENCIES}
                    />
                  </SectionCard>
                </div>
              )}
            </div>
          )}
        </div>

        <SheetFooter className="px-4 py-3">
          <div className="flex w-full items-center justify-between">
            {mode === "choose" ? (
              <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={linking}>
                Close
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setMode("choose")} disabled={saving}>
                  Back
                </Button>
                <Button onClick={handleSubmit(onSubmit)} disabled={saving || !detailsReady || !name.trim() || nameTaken}>
                  {saving ? "Saving…" : "Save & Close"}
                </Button>
              </>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
