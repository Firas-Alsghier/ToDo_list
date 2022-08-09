module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended", "prettier"
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-var": "error",
    // eslint-disable-next-line no-dupe-keys
    "no-console": "warn",
    "no-empty-function": "warn",
    "eqeqeq": "warn",
    "no-alert": "warn",
    "no-useless-concat": "warn",
    "no-unused-vars": "off"
  },
};
