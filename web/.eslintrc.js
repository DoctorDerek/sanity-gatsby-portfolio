module.exports = {
  plugins: ["graphql"],
  extends: [
    "standard",
    "standard-react",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  rules: {
    "react/prop-types": 0,
    "object-curly-spacing": ["error", "never"],
    quotes: "double",
    rules: {
      "graphql/template-strings": [
        "error",
        {
          env: "relay",
          tagName: "graphql",
          schemaJsonFilepath: path.resolve(
            __dirname,
            "src/__generated__gatsby-introspection.json"
          ),
        },
      ],
    },
  },
  settings: {
    react: {
      pragma: "React",
      version: "16.8.4",
    },
  },
}
