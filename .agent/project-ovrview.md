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
- Minimal testing infrastructure

### Exercise Components

1. **Authentication Challenge (Entry Point)**

   - Provide a starter API call that fails with 401 Unauthorized
   - User must debug headers and fix authentication against a simple user JSON DB
   - This should be solvable within 5-10 minutes but tests critical problem-solving

   ```json:server/users.json
   [
     {
       "username": "test_user",
       "password": "correct_password"
     }
   ]
   ```

   ```typescript:lib/api.ts
   // Problem: Using wrong password
   export async function fetchItems() {
     const response = await fetch('http://localhost:3001/items', {
       headers: {
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
   - Candidate must normalize and validate this data

   ```json:server/db.json
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

   - Build a simple dashboard displaying the items
   - Implement basic filtering (by status)
   - Focus on accessibility (contrast, semantic HTML, ARIA)

4. **Testing**
   - Add at least one unit test for data normalization
   - Add a component test for the dashboard

## Project Structure

```
technical-interview-exercise/
├── app/
│   ├── page.tsx (starter dashboard - partially implemented)
│   ├── layout.tsx (root layout with basic structure)
│   └── globals.css (Tailwind setup)
├── components/
│   ├── ui/ (pre-built UI components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   └── skeleton.tsx
│   └── error-boundary.tsx
├── lib/
│   ├── api.ts (contains the problematic API call)
│   ├── types.ts (partial TypeScript types)
│   └── utils.ts (utility functions)
├── server/
│   ├── db.json (item data with issues)
│   ├── users.json (authentication database)
│   └── auth.js (authentication middleware)
├── tests/
│   ├── unit/
│   │   └── normalize-data.test.ts (starter test)
│   └── components/
│       └── ui.test.tsx (starter component test)
├── README.md (instructions)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── jest.config.js
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

## Complete File Implementation Details

### 1. Server Authentication Middleware

```javascript:server/auth.js
// Basic authentication middleware for json-server
module.exports = (req, res, next) => {
  // Skip authentication for OPTIONS requests (for CORS)
  if (req.method === 'OPTIONS') {
    return next();
  }

  // Get authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  // Extract credentials from Basic Auth header
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Load users from JSON file
  const fs = require('fs');
  const path = require('path');
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));

  // Check if credentials match any user
  const validUser = users.find(
    user => user.username === username && user.password === password
  );

  if (!validUser) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // User is authenticated, proceed
  next();
};
```

### 2. Initial App Page

```tsx:app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchItems } from '@/lib/api';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load items: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>

      <div className="mb-4">
        {/* Filter controls would go here */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <h2 className="text-lg font-semibold">{item.name || 'Unnamed Item'}</h2>
            <p>ID: {item.id}</p>
            <p>Status: {item.status || 'Unknown'}</p>
            <p>Price: ${item.price}</p>
            {item.inventory !== undefined && <p>Inventory: {item.inventory}</p>}
          </Card>
        ))}
      </div>
    </main>
  );
}
```

### 3. Types Definition

```typescript:lib/types.ts
// Incomplete type definitions that need to be improved by the candidate

// Current status is missing validation for different case formats and unknown values
export type ItemStatus = 'active' | 'inactive' | string;

// Basic item type that doesn't handle all the edge cases in the data
export interface Item {
  id: number | string;
  name: string;
  status?: ItemStatus;
  price?: number | string;
  inventory?: number | string;
  description?: string;
}

// Example of a more robust type the candidate might create
export interface NormalizedItem {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'unknown';
  price: number;
  inventory: number;
  description?: string;
}
```

### 4. Basic UI Components

```typescript:components/ui/button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100'
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
```

### 5. Example Test File

```typescript:tests/unit/normalize-data.test.ts
// Starter test file for data normalization
// The candidate will need to implement the normalizeItem function
import { describe, it, expect } from 'vitest';
import { normalizeItem } from '@/lib/utils'; // The candidate would implement this

describe('Data Normalization', () => {
  it('should convert string IDs to numbers', () => {
    const item = { id: "123", name: "Test Item", status: "active", price: 19.99 };
    const normalized = normalizeItem(item);
    expect(normalized.id).toBe(123);
    expect(typeof normalized.id).toBe('number');
  });

  // The candidate should add more tests like these
  it.todo('should handle missing names');
  it.todo('should normalize status values to lowercase');
  it.todo('should handle missing status');
  it.todo('should convert string prices to numbers');
  it.todo('should handle negative prices');
  it.todo('should handle missing prices');
});
```

## Example Solution Approach

### 1. Authentication Fix

The candidate should identify that the password in the API call doesn't match the one in the users.json file:

```typescript
// Original problematic code
export async function fetchItems() {
  const response = await fetch("http://localhost:3001/items", {
    headers: {
      Authorization: "Basic " + btoa("test_user:wrong_password"),
    },
  });

  // ...
}

// Fixed code
export async function fetchItems() {
  const response = await fetch("http://localhost:3001/items", {
    headers: {
      Authorization: "Basic " + btoa("test_user:correct_password"),
    },
  });

  // ...
}
```

### 2. Data Normalization Solution

A good candidate might implement something like this:

```typescript
import { z } from "zod";
import { Item, NormalizedItem } from "@/lib/types";

// Define a schema for validation
const itemSchema = z.object({
  id: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val)),
  name: z
    .string()
    .nullable()
    .transform((val) => val ?? "Unnamed Item"),
  status: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) return "unknown";
      const normalized = val.toLowerCase();
      return ["active", "inactive"].includes(normalized)
        ? normalized
        : "unknown";
    }),
  price: z.union([z.string(), z.number(), z.undefined()]).transform((val) => {
    if (val === undefined) return 0;
    const price = typeof val === "string" ? parseFloat(val) : val;
    return price > 0 ? price : 0;
  }),
  inventory: z
    .union([z.string(), z.number(), z.undefined()])
    .transform((val) => {
      if (val === undefined) return 0;
      const inventory = typeof val === "string" ? parseInt(val, 10) : val;
      return inventory >= 0 ? inventory : 0;
    }),
  description: z.string().optional(),
});

export function normalizeItem(item: unknown): NormalizedItem {
  try {
    return itemSchema.parse(item);
  } catch (error) {
    // In case of validation errors, return a default item
    // A better approach might include logging and more detailed error handling
    return {
      id:
        typeof item === "object" && item !== null && "id" in item
          ? Number(item.id) || 0
          : 0,
      name: "Error: Invalid Item",
      status: "unknown",
      price: 0,
      inventory: 0,
      description: "This item could not be properly validated",
    };
  }
}

export function normalizeItems(items: unknown[]): NormalizedItem[] {
  return items.map((item) => normalizeItem(item));
}
```

### 3. Accessible UI Component Example

A good solution for displaying items with accessibility features:

```tsx
import { NormalizedItem } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface ItemCardProps {
  item: NormalizedItem;
}

export function ItemCard({ item }: ItemCardProps) {
  // Calculate status color for better visual indication
  const statusColor = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    unknown: "bg-yellow-100 text-yellow-800",
  }[item.status];

  return (
    <Card>
      <div className="p-4">
        <h2 id={`item-${item.id}-name`} className="text-lg font-semibold">
          {item.name}
        </h2>

        <dl className="mt-2 space-y-1">
          <div className="flex justify-between">
            <dt className="sr-only">Status</dt>
            <dd>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                role="status"
                aria-label={`Status: ${item.status}`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Price</dt>
            <dd className="text-sm font-medium text-gray-900">
              ${item.price.toFixed(2)}
            </dd>
          </div>

          {item.inventory !== undefined && (
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Inventory</dt>
              <dd
                className={`text-sm font-medium ${
                  item.inventory > 0 ? "text-gray-900" : "text-red-600"
                }`}
              >
                {item.inventory} {item.inventory === 1 ? "unit" : "units"}
              </dd>
            </div>
          )}

          {item.description && (
            <div className="mt-2">
              <dt className="sr-only">Description</dt>
              <dd className="text-sm text-gray-500">{item.description}</dd>
            </div>
          )}
        </dl>
      </div>
    </Card>
  );
}
```

## Detailed Evaluation Rubric

### 1. Problem Solving (30%)

| Score                     | Authentication Issue                                    | Data Handling                                          | Error Handling                                     |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------- |
| **Excellent** (5)         | Quickly identifies auth issue and systematically debugs | Implements comprehensive validation with strong typing | Anticipates and handles all error cases gracefully |
| **Good** (4)              | Identifies auth issue with some exploration             | Validates most edge cases                              | Handles common errors appropriately                |
| **Satisfactory** (3)      | Solves auth issue with hints                            | Basic validation with some edge cases missed           | Basic error handling                               |
| **Needs Improvement** (2) | Struggles with auth debugging                           | Minimal validation, many edge cases missed             | Limited error handling                             |
| **Poor** (1)              | Unable to fix auth issue                                | No validation of incoming data                         | No error handling                                  |

### 2. Communication (30%)

| Score                     | Explanation of Process                         | Asking Questions                     | Code Documentation                            |
| ------------------------- | ---------------------------------------------- | ------------------------------------ | --------------------------------------------- |
| **Excellent** (5)         | Clear, concise explanations of thought process | Asks insightful clarifying questions | Self-documenting code with excellent comments |
| **Good** (4)              | Good explanation of most decisions             | Asks relevant questions              | Good documentation on complex parts           |
| **Satisfactory** (3)      | Some explanation of major decisions            | Asks basic questions                 | Basic documentation                           |
| **Needs Improvement** (2) | Limited explanation                            | Few questions asked                  | Minimal documentation                         |
| **Poor** (1)              | Unable to explain process                      | No questions asked                   | No documentation                              |

### 3. Technical Skills (20%)

| Score                     | TypeScript Usage                             | React Patterns                              | API Handling                  |
| ------------------------- | -------------------------------------------- | ------------------------------------------- | ----------------------------- |
| **Excellent** (5)         | Strong typing with no any types              | Clean component structure with hooks        | Robust API error handling     |
| **Good** (4)              | Good type definitions with occasional issues | Good component patterns                     | Proper API state management   |
| **Satisfactory** (3)      | Basic type usage with some any types         | Functional components but some antipatterns | Basic API fetching            |
| **Needs Improvement** (2) | Minimal typing                               | Poor component structure                    | Improper API state management |
| **Poor** (1)              | No typing / ignores TypeScript errors        | Major React antipatterns                    | No API error handling         |

### 4. Accessibility & Best Practices (20%)

| Score                     | WCAG Compliance                    | Semantic HTML                       | Testing Approach               |
| ------------------------- | ---------------------------------- | ----------------------------------- | ------------------------------ |
| **Excellent** (5)         | Implements ARIA and meets WCAG AA  | Proper semantic elements throughout | Comprehensive testing strategy |
| **Good** (4)              | Good accessibility practices       | Mostly semantic HTML                | Good test coverage             |
| **Satisfactory** (3)      | Basic accessibility considerations | Some semantic elements              | Basic tests                    |
| **Needs Improvement** (2) | Minimal accessibility              | Few semantic elements               | Minimal testing                |
| **Poor** (1)              | No accessibility considerations    | No semantic HTML                    | No testing                     |

## Interviewer Guide

### Prompts to Encourage Discussion

- "What approach are you considering for handling the data inconsistencies?"
- "How would you make this component more accessible?"
- "What tests would be most valuable here?"
- "What tradeoffs are you making with this implementation?"
- "How would you handle scaling this if there were hundreds of items?"
- "What would you change if you had more time?"

### Expected Challenges

- Authentication debugging (look for systematic approach)
- Data normalization (look for type safety and handling edge cases)
- Accessibility implementation (look for semantic HTML and ARIA usage)
- State management for filtering
- Test coverage decisions

### Solution Hints (if candidate gets stuck)

- First hint: "Check the authentication headers in the API call"
- Second hint: "Consider adding type validation before rendering the data"
- Third hint: "Look at how the statusses are represented in different items"
- For accessibility: "Consider how a screen reader would interpret this component"
- For testing: "What edge cases would be most important to test?"

### Common Pitfalls to Watch For

- Ignoring TypeScript errors
- Not handling all error states
- Hardcoding values that should be dynamic
- Not validating or normalizing data before use
- Poor accessibility (low contrast, missing labels, no keyboard navigation)
- Overcomplicating simple problems
- Focusing too much on styling instead of functionality
