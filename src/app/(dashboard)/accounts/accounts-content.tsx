"use client";

import { AccountDialog } from "@/components/account-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LabeledFilter } from "@/components/ui/labeled-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { STATUS_COLORS, TYPE_BADGE_COLORS, TYPE_DOT_COLORS } from "@/lib/account-colors";
import {
  Account,
  AccountSource,
  AccountType,
  ALL_ACCOUNT_TYPES,
  CreateAccountPayload,
  formatBalance,
  getStatusLabel,
  getSubTypeLabel,
  getTypeLabel,
  GroupBy,
  UpdateAccountPayload,
} from "@/types/account";
import { graphql } from "@/__generated__/gql";
import {
  CreateAccountInput,
  UpdateAccountInput,
} from "@/__generated__/graphql";
import { successToast } from "@/lib/toast";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { type ColumnDef } from "@tanstack/react-table";
import { Landmark, Plus, RefreshCw, Search, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const ACCOUNTS_QUERY = graphql(`
  query Accounts {
    accounts {
      id
      name
      type
      subType
      balance
      balanceLastUpdated
      currency
      institutionName
      source
      status
      startingBalance
      closedAt
      externalId
      bankConnectionId
      createdAt
      updatedAt
      workspaceId
    }
  }
`);

const CREATE_ACCOUNT_MUTATION = graphql(`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
      name
      type
      subType
      balance
      balanceLastUpdated
      currency
      institutionName
      source
      status
      startingBalance
      closedAt
      externalId
      createdAt
      updatedAt
      workspaceId
    }
  }
`);

const UPDATE_ACCOUNT_MUTATION = graphql(`
  mutation UpdateAccount($accountId: ID!, $input: UpdateAccountInput!) {
    updateAccount(accountId: $accountId, input: $input) {
      id
      name
      type
      subType
      balance
      balanceLastUpdated
      currency
      institutionName
      source
      status
      startingBalance
      closedAt
      externalId
      createdAt
      updatedAt
      workspaceId
    }
  }
`);

const DELETE_ACCOUNT_MUTATION = graphql(`
  mutation DeleteAccount($accountId: ID!) {
    deleteAccount(accountId: $accountId)
  }
`);

const BANK_CONNECTIONS_QUERY = graphql(`
  query BankConnections {
    bankConnections {
      id
      institutionName
      status
      lastSyncedAt
    }
  }
`);

const SYNC_TRANSACTIONS_MUTATION = graphql(`
  mutation SyncTransactions($bankConnectionId: ID!) {
    syncTransactions(bankConnectionId: $bankConnectionId) {
      transactionsAdded
      transactionsModified
      transactionsRemoved
      accountsSynced
    }
  }
`);

const GROUP_BY_OPTIONS: { value: GroupBy; label: string }[] = [
  { value: "type", label: "Type" },
  { value: "institution", label: "Institution" },
  { value: "source", label: "Source" },
  { value: "none", label: "None" },
];

function formatLastUpdated(dateStr: string | null): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const GROUPING_ACCESSORS: Record<Exclude<GroupBy, "none">, (a: Account) => string> = {
  type: (a) => getTypeLabel(a.type),
  institution: (a) => a.institutionName || "No Institution",
  source: (a) => (a.source === "MANUAL" ? "Manual" : "Automatic"),
};

const TYPE_LABEL_ORDER = new Map<string, number>(
  ALL_ACCOUNT_TYPES.map((type, index) => [getTypeLabel(type), index])
);

const columns: ColumnDef<Account, unknown>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Display Name",
    meta: { width: "40%", cellClassName: "pr-4" },
    cell: ({ row }) => (
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium">{row.original.name}</span>
        <Badge
          variant="secondary"
          className={`text-[11px] font-semibold border-0 shrink-0 ${TYPE_BADGE_COLORS[row.original.type]}`}
        >
          {getSubTypeLabel(row.original.subType)}
        </Badge>
      </div>
    ),
  },
  {
    id: "lastUpdated",
    accessorFn: (row) => (row.balanceLastUpdated ? new Date(row.balanceLastUpdated).getTime() : 0),
    header: "Last Updated",
    meta: { width: "20%", cellClassName: "text-muted-foreground" },
    cell: ({ row }) => formatLastUpdated(row.original.balanceLastUpdated),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    meta: { width: "138px" },
    cell: ({ row }) => (
      <span className={`inline-flex items-center gap-1.5 font-medium ${STATUS_COLORS[row.original.status] ?? "text-muted-foreground"}`}>
        {getStatusLabel(row.original.status)}
        {row.original.source !== "MANUAL" && <Zap className="size-3.5" />}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    meta: {
      width: "44px",
      headerClassName: "cursor-default hover:text-muted-foreground !p-0",
      cellClassName: "!p-0 h-px",
    },
    cell: ({ row }) => <ViewTransactionsButton accountId={row.original.id} />,
  },
];

function ViewTransactionsButton({ accountId }: { accountId: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex items-center justify-center w-full h-full min-h-[44px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/transactions?accountId=${accountId}`);
      }}
      aria-label="View transactions"
    >
      <Search className="size-4.5" />
    </button>
  );
}

export function AccountsContent() {
  const [groupBy, setGroupBy] = useState<GroupBy>("type");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [syncing, setSyncing] = useState(false);

  const { data, loading, refetch } = useQuery(ACCOUNTS_QUERY);
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT_MUTATION);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION);
  const [syncTransactions] = useMutation(SYNC_TRANSACTIONS_MUTATION);
  const [fetchBankConnections] = useLazyQuery(BANK_CONNECTIONS_QUERY, { fetchPolicy: "network-only" });

  const accounts = useMemo(() => (data?.accounts ?? []) as Account[], [data]);
  const accountNames = useMemo(() => accounts.map((a) => a.name), [accounts]);
  const hasAutoAccounts = useMemo(() => accounts.some((a) => a.source !== "MANUAL"), [accounts]);

  const balanceColumn = useMemo<ColumnDef<Account, unknown>>(() => ({
    id: "balance",
    accessorKey: "balance",
    header: "Balance",
    meta: {
      width: "20%",
      headerClassName: "text-right justify-end",
      cellClassName: "text-right font-mono tabular-nums",
    },
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5">
        {row.original.source !== "MANUAL" && (
          <RefreshCw
            className={`text-primary shrink-0 ${syncing ? "animate-spin" : "opacity-0"}`}
            size={14}
            strokeWidth={2.5}
            style={{ animationDuration: "1s" }}
          />
        )}
        {formatBalance(row.original.balance, row.original.currency)}
      </span>
    ),
  }), [syncing]);


  const groupByValue = useMemo<((row: Account) => string) | undefined>(() => {
    if (groupBy === "none") return undefined;
    return GROUPING_ACCESSORS[groupBy];
  }, [groupBy]);

  const groupSort = useCallback(
    (a: string, b: string) => {
      if (groupBy === "type") {
        return (TYPE_LABEL_ORDER.get(a) ?? Number.MAX_SAFE_INTEGER) - (TYPE_LABEL_ORDER.get(b) ?? Number.MAX_SAFE_INTEGER);
      }
      return a.localeCompare(b);
    },
    [groupBy]
  );

  const groupRowLabel = useCallback((groupKey: string, rows: Account[]) => {
    const total = rows.reduce((sum, row) => sum + row.balance, 0);
    return {
      label: groupKey,
      count: rows.length,
      balance: formatBalance(total, "USD"),
    };
  }, []);

  const handleRefresh = useCallback(async () => {
    setSyncing(true);
    try {
      const { data: connectionsData } = await fetchBankConnections();
      const connections = connectionsData?.bankConnections ?? [];
      if (connections.length === 0) {
        successToast("No connected banks to refresh");
        return;
      }
      const results = await Promise.all(
        connections.map((c) => syncTransactions({ variables: { bankConnectionId: c.id } }))
      );
      await refetch();
      const totalAdded = results.reduce((sum, r) => sum + (r.data?.syncTransactions?.transactionsAdded ?? 0), 0);
      const totalAccounts = results.reduce((sum, r) => sum + (r.data?.syncTransactions?.accountsSynced ?? 0), 0);
      successToast(`Synced ${totalAccounts} ${totalAccounts === 1 ? "account" : "accounts"} · ${totalAdded} new ${totalAdded === 1 ? "transaction" : "transactions"}`);
    } finally {
      setSyncing(false);
    }
  }, [fetchBankConnections, syncTransactions, refetch]);

  const handleCreate = useCallback(async (payload: CreateAccountPayload | UpdateAccountPayload) => {
    await createAccount({ variables: { input: payload as CreateAccountInput } });
    await refetch();
  }, [createAccount, refetch]);

  const handleUpdate = useCallback(async (payload: CreateAccountPayload | UpdateAccountPayload) => {
    if (!editAccount) return;
    await updateAccount({
      variables: {
        accountId: editAccount.id,
        input: payload as UpdateAccountInput,
      },
    });
    await refetch();
  }, [editAccount, updateAccount, refetch]);

  const handleSyncAccount = useCallback(async () => {
    if (!editAccount?.bankConnectionId) return;
    await syncTransactions({ variables: { bankConnectionId: editAccount.bankConnectionId } });
    await refetch();
  }, [editAccount, syncTransactions, refetch]);

  const handleDelete = useCallback(async () => {
    if (!editAccount) return;
    await deleteAccount({ variables: { accountId: editAccount.id } });
    await refetch();
  }, [editAccount, deleteAccount, refetch]);

  const handleEditDialogOpenChange = useCallback((open: boolean) => {
    if (!open) setEditAccount(null);
  }, []);

  const typeOverview = useMemo(() => {
    const map = new Map<AccountType, { count: number; total: number }>();

    for (const account of accounts) {
      if (account.status !== "ACTIVE") continue;
      const entry = map.get(account.type) ?? { count: 0, total: 0 };
      entry.count++;
      entry.total += account.balance;
      map.set(account.type, entry);
    }

    return ALL_ACCOUNT_TYPES
      .filter((t) => map.has(t))
      .map((t) => ({ type: t, ...map.get(t)! }));
  }, [accounts]);

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
      <div className="flex gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-2xl font-semibold">Accounts</h1>
            <div className="flex items-center gap-3">
              <LabeledFilter
                label="Group by"
                value={groupBy}
                onValueChange={(v) => setGroupBy(v as GroupBy)}
                options={GROUP_BY_OPTIONS}
                testId="group-by-select"
              />
              {hasAutoAccounts && (
                <Button size="lg" variant="outline" onClick={handleRefresh} disabled={syncing} aria-label="Refresh bank connections">
                  <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              )}
              <Button size="lg" onClick={() => setCreateDialogOpen(true)}>
                <Plus className="size-4" />
                Add Account
              </Button>
            </div>
          </div>

          <DataTable
            stickyHeader
            loading={loading}
            columns={[columns[0], balanceColumn, ...columns.slice(1)]}
            data={accounts}
            groupByValue={groupByValue}
            groupSort={groupSort}
            groupRowLabel={groupRowLabel}
            onRowClick={setEditAccount}
            className="animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100 fill-mode-backwards"
            emptyState={
              <Empty className="border-none p-0">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Landmark />
                  </EmptyMedia>
                  <EmptyTitle>No Accounts Yet</EmptyTitle>
                  <EmptyDescription>
                    Add your bank accounts, credit cards, investments, and more to start tracking your finances.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="size-4" />
                    Add Account
                  </Button>
                </EmptyContent>
              </Empty>
            }
          />
        </div>

        <div className="hidden lg:block w-64 shrink-0 mt-[52px] animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200 fill-mode-backwards">
          <div className="sticky top-4 rounded-lg border border-border p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Accounts Overview
            </h3>
            <div className="flex flex-col gap-3">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                </>
              ) : typeOverview.length === 0 ? (
                <p className="text-xs text-muted-foreground">No accounts yet.</p>
              ) : (
                <>
                  {typeOverview.map(({ type, count, total }) => (
                    <div key={type} className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className={`mt-1.5 size-2 rounded-full shrink-0 ${TYPE_DOT_COLORS[type]}`} />
                        <div>
                          <p className="text-sm font-medium">{getTypeLabel(type)}</p>
                          <p className="text-xs text-muted-foreground">
                            {count} active {count === 1 ? "account" : "accounts"}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        {formatBalance(total, "USD")}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Net Total</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatBalance(
                        typeOverview.reduce((sum, { total: t }) => sum + t, 0),
                        "USD"
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <AccountDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        existingNames={accountNames}
        onSave={handleCreate}
        onConnect={refetch}
      />

      <AccountDialog
        open={!!editAccount}
        onOpenChange={handleEditDialogOpenChange}
        account={editAccount}
        existingNames={accountNames}
        onSave={handleUpdate}
        onDelete={handleDelete}
        onSync={editAccount?.source !== "MANUAL" ? handleSyncAccount : undefined}
      />
    </div>
  );
}