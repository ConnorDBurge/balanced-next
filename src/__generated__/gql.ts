/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Self {\n    self {\n      id\n      email\n      givenName\n      familyName\n    }\n  }\n": typeof types.SelfDocument,
    "\n  query Workspaces {\n    workspaces {\n      id\n      name\n      status\n    }\n  }\n": typeof types.WorkspacesDocument,
    "\n  query CurrentWorkspace {\n    currentWorkspace {\n      id\n      name\n    }\n  }\n": typeof types.CurrentWorkspaceDocument,
    "\n  query WorkspaceMembers {\n    workspaceMembers {\n      userId\n      givenName\n      familyName\n      email\n      roles\n      status\n      joinedAt\n    }\n  }\n": typeof types.WorkspaceMembersDocument,
    "\n  mutation UpdateCurrentWorkspace($input: UpdateWorkspaceInput!) {\n    updateCurrentWorkspace(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateCurrentWorkspaceDocument,
    "\n  mutation UpdateWorkspaceMember($userId: ID!, $input: UpdateMembershipInput!) {\n    updateWorkspaceMember(userId: $userId, input: $input) {\n      userId\n      roles\n    }\n  }\n": typeof types.UpdateWorkspaceMemberDocument,
    "\n  mutation RemoveWorkspaceMember($userId: ID!) {\n    removeWorkspaceMember(userId: $userId)\n  }\n": typeof types.RemoveWorkspaceMemberDocument,
    "\n  query PersonalSettingsSelf {\n    self {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n": typeof types.PersonalSettingsSelfDocument,
    "\n  mutation UpdateSelf($input: UpdateUserInput!) {\n    updateSelf(input: $input) {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n": typeof types.UpdateSelfDocument,
    "\n  mutation DeleteSelf {\n    deleteSelf\n  }\n": typeof types.DeleteSelfDocument,
    "\n  mutation ProvisionWorkspace($input: CreateWorkspaceInput!) {\n    provisionWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n": typeof types.ProvisionWorkspaceDocument,
    "\n  mutation SwitchWorkspace($input: SwitchWorkspaceInput!) {\n    switchWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n": typeof types.SwitchWorkspaceDocument,
};
const documents: Documents = {
    "\n  query Self {\n    self {\n      id\n      email\n      givenName\n      familyName\n    }\n  }\n": types.SelfDocument,
    "\n  query Workspaces {\n    workspaces {\n      id\n      name\n      status\n    }\n  }\n": types.WorkspacesDocument,
    "\n  query CurrentWorkspace {\n    currentWorkspace {\n      id\n      name\n    }\n  }\n": types.CurrentWorkspaceDocument,
    "\n  query WorkspaceMembers {\n    workspaceMembers {\n      userId\n      givenName\n      familyName\n      email\n      roles\n      status\n      joinedAt\n    }\n  }\n": types.WorkspaceMembersDocument,
    "\n  mutation UpdateCurrentWorkspace($input: UpdateWorkspaceInput!) {\n    updateCurrentWorkspace(input: $input) {\n      id\n      name\n    }\n  }\n": types.UpdateCurrentWorkspaceDocument,
    "\n  mutation UpdateWorkspaceMember($userId: ID!, $input: UpdateMembershipInput!) {\n    updateWorkspaceMember(userId: $userId, input: $input) {\n      userId\n      roles\n    }\n  }\n": types.UpdateWorkspaceMemberDocument,
    "\n  mutation RemoveWorkspaceMember($userId: ID!) {\n    removeWorkspaceMember(userId: $userId)\n  }\n": types.RemoveWorkspaceMemberDocument,
    "\n  query PersonalSettingsSelf {\n    self {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n": types.PersonalSettingsSelfDocument,
    "\n  mutation UpdateSelf($input: UpdateUserInput!) {\n    updateSelf(input: $input) {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n": types.UpdateSelfDocument,
    "\n  mutation DeleteSelf {\n    deleteSelf\n  }\n": types.DeleteSelfDocument,
    "\n  mutation ProvisionWorkspace($input: CreateWorkspaceInput!) {\n    provisionWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n": types.ProvisionWorkspaceDocument,
    "\n  mutation SwitchWorkspace($input: SwitchWorkspaceInput!) {\n    switchWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n": types.SwitchWorkspaceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Self {\n    self {\n      id\n      email\n      givenName\n      familyName\n    }\n  }\n"): (typeof documents)["\n  query Self {\n    self {\n      id\n      email\n      givenName\n      familyName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Workspaces {\n    workspaces {\n      id\n      name\n      status\n    }\n  }\n"): (typeof documents)["\n  query Workspaces {\n    workspaces {\n      id\n      name\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CurrentWorkspace {\n    currentWorkspace {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query CurrentWorkspace {\n    currentWorkspace {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkspaceMembers {\n    workspaceMembers {\n      userId\n      givenName\n      familyName\n      email\n      roles\n      status\n      joinedAt\n    }\n  }\n"): (typeof documents)["\n  query WorkspaceMembers {\n    workspaceMembers {\n      userId\n      givenName\n      familyName\n      email\n      roles\n      status\n      joinedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCurrentWorkspace($input: UpdateWorkspaceInput!) {\n    updateCurrentWorkspace(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCurrentWorkspace($input: UpdateWorkspaceInput!) {\n    updateCurrentWorkspace(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWorkspaceMember($userId: ID!, $input: UpdateMembershipInput!) {\n    updateWorkspaceMember(userId: $userId, input: $input) {\n      userId\n      roles\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWorkspaceMember($userId: ID!, $input: UpdateMembershipInput!) {\n    updateWorkspaceMember(userId: $userId, input: $input) {\n      userId\n      roles\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveWorkspaceMember($userId: ID!) {\n    removeWorkspaceMember(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation RemoveWorkspaceMember($userId: ID!) {\n    removeWorkspaceMember(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PersonalSettingsSelf {\n    self {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n"): (typeof documents)["\n  query PersonalSettingsSelf {\n    self {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSelf($input: UpdateUserInput!) {\n    updateSelf(input: $input) {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSelf($input: UpdateUserInput!) {\n    updateSelf(input: $input) {\n      id\n      givenName\n      familyName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSelf {\n    deleteSelf\n  }\n"): (typeof documents)["\n  mutation DeleteSelf {\n    deleteSelf\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ProvisionWorkspace($input: CreateWorkspaceInput!) {\n    provisionWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation ProvisionWorkspace($input: CreateWorkspaceInput!) {\n    provisionWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SwitchWorkspace($input: SwitchWorkspaceInput!) {\n    switchWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SwitchWorkspace($input: SwitchWorkspaceInput!) {\n    switchWorkspace(input: $input) {\n      id\n      name\n      token\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;