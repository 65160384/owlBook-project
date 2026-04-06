import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "complexity": ["warn", 10] 
    }
  }
];