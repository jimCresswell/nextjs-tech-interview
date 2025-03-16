import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

// Make React available in test files
global.React = React;

// Add any global test setup here, such as:
// - Custom matchers
// - Mock implementations
// - Global test data

// Mock fetch for API tests
global.fetch = vi.fn();
