# Technical Interview Exercise Plan

## Overview

This exercise is designed as a 1-hour live coding session to evaluate a candidate's problem-solving approach, communication skills, and technical understanding of building accessible web applications with Next.js.

## Focus Areas for Evaluation

1. **Problem-solving approach** (30%)
2. **Communication skills** (30%)
3. **Technical abilities** (20%)
4. **Accessibility & best practices** (20%)

## Core Exercise Structure

### Initial Setup (Pre-configured)

- Next.js 13+ with App Router
- TypeScript setup
- Basic UI components with Tailwind CSS
- JSON Server with authentication middleware
- Minimal testing infrastructure with passing but incomplete tests

### Exercise Components

1. **Authentication Challenge (Entry Point)**

   - Provide a starter API call that fails with 401 Unauthorized
   - User must debug headers and fix authentication against a simple user JSON DB
   - This should be solvable within 5-10 minutes but tests critical problem-solving

   ```json:src/server/users.json
   [
     {
       "username": "test_user",
       "password": "correct_password"
     }
   ]
   ```

   ```typescript:src/lib/api.ts
   // Problem: Using wrong password with clear comment hint
   export async function fetchItems() {
     const response = await fetch('http://localhost:3001/items', {
       headers: {
         // ISSUE: This password is incorrect - the candidate should fix this
         'Authorization': 'Basic ' + btoa('test_user:wrong_password')
       }
     });

     if (!response.ok) {
       throw new Error(`API error: ${response.status}`);
     }

     return response.json();
   }
   ```

2. **Data Handling Challenge**

   - Once authenticated, API returns data with intentional issues:
     - Inconsistent types (string vs number IDs)
     - Missing fields
     - Inconsistent enum values (e.g., "active" vs "ACTIVE")
     - Negative prices or invalid data
   - Candidate must improve the provided stub normalization function

   ```json:src/server/db.json
   {
     "items": [
       { "id": 1, "name": "Widget A", "status": "active", "price": 29.99, "inventory": 10 },
       { "id": "2", "name": "Widget B", "status": "inactive", "price": "19.99" },
       { "id": 3, "name": null, "status": "ACTIVE", "price": 39.99, "inventory": "5" },
       { "id": 4, "name": "Widget D", "status": "unknown", "price": -10.00, "inventory": 0 },
       { "id": 5, "name": "Widget E", "description": "Missing status and price" }
     ]
   }
   ```

3. **UI Implementation**

   - Build or enhance a dashboard displaying the items
   - Implement basic filtering (by status)
   - Focus on accessibility (contrast, semantic HTML, ARIA)

4. **Testing**
   - Add or improve tests for data normalization
   - Test UI components for accessibility

## Project Structure

```
technical-interview-exercise/
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── page.tsx           # Main dashboard page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   └── ItemList.tsx       # Basic item list component
│   ├── lib/
│   │   ├── api.ts             # API client with authentication issue
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── utils.ts           # Normalization utilities (needs improvement)
│   └── server/
│       ├── db.json            # Item data with issues
│       ├── users.json         # Authentication database
│       └── auth.js            # Authentication middleware
├── tests/
│   ├── unit/                  # Unit tests
│   └── components/            # Component tests
├── README.md                  # Instructions
└── package.json
```

## Accessibility Requirements

Add Pa11y to package.json for accessibility testing:

```json:package.json
{
  "scripts": {
    "test:a11y": "pa11y http://localhost:3000"
  },
  "devDependencies": {
    "pa11y": "^6.0.0"
  }
}
```

## Implementation Details

### 1. Data Normalization Implementation

The utils.ts file provides a stub implementation that makes the tests pass but needs to be improved:

```typescript:src/lib/utils.ts
export function normalizeItem(item: unknown): NormalizedItem {
  // Simple stub implementation that passes tests
  if (!item || typeof item !== 'object') {
    throw new Error('Invalid item data');
  }

  const data = item as Record<string, any>;

  // Convert ID to number (for test to pass)
  const id = typeof data.id === 'string' ? parseInt(data.id, 10) : (data.id || 0);

  // Normalize status to one of the expected values
  let status: 'active' | 'inactive' | 'unknown' = 'unknown';
  if (typeof data.status === 'string') {
    const normalizedStatus = data.status.toLowerCase();
    if (normalizedStatus === 'active' || normalizedStatus === 'inactive') {
      status = normalizedStatus as 'active' | 'inactive';
    }
  }

  return {
    id,
    name: data.name || 'Unnamed Item',
    status,
    price: typeof data.price === 'string' ? parseFloat(data.price) : (data.price || 0),
    inventory: typeof data.inventory === 'string' ? parseInt(data.inventory, 10) : (data.inventory || 0)
  };
}
```

### 2. Detailed Evaluation Rubric

#### 1. Problem Solving (30%)

| Score                     | Authentication Issue                                    | Data Handling                                          | Error Handling                                     |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------- |
| **Excellent** (5)         | Quickly identifies auth issue and systematically debugs | Implements comprehensive validation with strong typing | Anticipates and handles all error cases gracefully |
| **Good** (4)              | Identifies auth issue with some exploration             | Validates most edge cases                              | Handles common errors appropriately                |
| **Satisfactory** (3)      | Solves auth issue with hints                            | Basic validation with some edge cases missed           | Basic error handling                               |
| **Needs Improvement** (2) | Struggles with auth debugging                           | Minimal validation, many edge cases missed             | Limited error handling                             |
| **Poor** (1)              | Unable to fix auth issue                                | No validation of incoming data                         | No error handling                                  |

#### 2. Communication (30%)

| Score                     | Explanation of Process                         | Asking Questions                     | Code Documentation                            |
| ------------------------- | ---------------------------------------------- | ------------------------------------ | --------------------------------------------- |
| **Excellent** (5)         | Clear, concise explanations of thought process | Asks insightful clarifying questions | Self-documenting code with excellent comments |
| **Good** (4)              | Good explanation of most decisions             | Asks relevant questions              | Good documentation on complex parts           |
| **Satisfactory** (3)      | Some explanation of major decisions            | Asks basic questions                 | Basic documentation                           |
| **Needs Improvement** (2) | Limited explanation                            | Few questions asked                  | Minimal documentation                         |
| **Poor** (1)              | Unable to explain process                      | No questions asked                   | No documentation                              |

#### 3. Technical Skills (20%)

| Score                     | TypeScript Usage                             | React Patterns                              | API Handling                  |
| ------------------------- | -------------------------------------------- | ------------------------------------------- | ----------------------------- |
| **Excellent** (5)         | Strong typing with no any types              | Clean component structure with hooks        | Robust API error handling     |
| **Good** (4)              | Good type definitions with occasional issues | Good component patterns                     | Proper API state management   |
| **Satisfactory** (3)      | Basic type usage with some any types         | Functional components but some antipatterns | Basic API fetching            |
| **Needs Improvement** (2) | Minimal typing                               | Poor component structure                    | Improper API state management |
| **Poor** (1)              | No typing / ignores TypeScript errors        | Major React antipatterns                    | No API error handling         |

#### 4. Accessibility & Best Practices (20%)

| Score                     | WCAG Compliance                    | Semantic HTML                       | Testing Approach               |
| ------------------------- | ---------------------------------- | ----------------------------------- | ------------------------------ |
| **Excellent** (5)         | Implements ARIA and meets WCAG AA  | Proper semantic elements throughout | Comprehensive testing strategy |
| **Good** (4)              | Good accessibility practices       | Mostly semantic HTML                | Good test coverage             |
| **Satisfactory** (3)      | Basic accessibility considerations | Some semantic elements              | Basic tests                    |
| **Needs Improvement** (2) | Minimal accessibility              | Few semantic elements               | Minimal testing                |
| **Poor** (1)              | No accessibility considerations    | No semantic HTML                    | No testing                     |

### 3. Interviewer Guide

#### Prompts to Encourage Discussion

- "What approach are you considering for handling the data inconsistencies?"
- "How would you make this component more accessible?"
- "What tests would be most valuable here?"
- "What tradeoffs are you making with this implementation?"
- "How would you handle scaling this if there were hundreds of items?"
- "What would you change if you had more time?"

#### Expected Challenges

- Authentication debugging (look for systematic approach)
- Data normalization (look for type safety and handling edge cases)
- Accessibility implementation (look for semantic HTML and ARIA usage)
- State management for filtering
- Test coverage decisions

#### Solution Hints (if candidate gets stuck)

- First hint: "Check the authentication headers in the API call"
- Second hint: "Consider improving the normalizeItem function to handle more edge cases"
- Third hint: "Look at how the statuses are represented in different items"
- For accessibility: "Consider how a screen reader would interpret this component"
- For testing: "What edge cases would be most important to test?"

### 4. Key Points for Interviewers

- **Focus on problem-solving approach**: Pay attention to how they identify and solve issues
- **Evaluate communication**: Look for clear explanations of their thought process
- **Assess tool utilization**: See how they leverage the tools provided
- **Check accessibility awareness**: Ensure they consider accessibility from the start
- **Don't penalize for syntax errors**: The exercise is about concepts, not syntax memorization
