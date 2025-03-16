import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-rgb: 255, 255, 255;
  }

  body {
    color: rgb(var(--foreground-rgb));
    background: rgb(var(--background-rgb));
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* Focus styles for better accessibility */
  *:focus-visible {
    outline: 2px solid rgb(37, 99, 235);
    outline-offset: 2px;
  }

  /* Screen reader only utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
