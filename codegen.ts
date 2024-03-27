import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:54321/graphql/v1", // Using the local endpoint, update if needed
  documents: "src/**/*.graphql.ts",
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [
        {
          "add": {
            "content": "// @ts-nocheck"
          }
        }
      ],
      presetConfig: {
        fragmentMasking: false
      },
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
};

export default config;
