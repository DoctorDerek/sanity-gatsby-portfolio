import type { PluginOptions as TypegenPluginOptions } from "gatsby-plugin-typegen/types"

type Plugin =
  | string
  | { resolve: string; options: object }
  | { resolve: `gatsby-plugin-typegen`; options: TypegenPluginOptions }

// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

const clientConfig = require("./client-config")
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === "production"

const plugins: Plugin[] = [
  "gatsby-plugin-postcss",
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-source-sanity",
    options: {
      ...clientConfig.sanity,
      token,
      watchMode: !isProd,
      overlayDrafts: !isProd && token,
    },
  },
  {
    resolve: "gatsby-plugin-typescript",
    options: {
      isTSX: true, // defaults to false
      // jsxPragma: `jsx`, // defaults to "React"
      allExtensions: true, // defaults to false
    },
  },
  {
    resolve: "gatsby-plugin-typegen",
    options: {
      emitSchema: {
        "src/__generated__/gatsby-introspection.json": true,
      },
      emitPluginDocuments: {
        "src/__generated__/gatsby-plugin-documents.graphql": true,
      },
    },
  },
]

module.exports = {
  plugins,
}
