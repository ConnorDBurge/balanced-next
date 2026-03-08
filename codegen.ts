import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../balanced-api/src/main/resources/graphql/**/*.graphqls",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "src/__generated__/": {
      preset: "client",
    },
  },
};

export default config;
