# Technical Interview Exercise: Next.js Dashboard with Authentication & Data Validation

This live coding exercise is designed to assess your problem-solving approach, communication skills, and technical understanding of building accessible web applications with Next.js and TypeScript. You'll have **1 hour** to work through this exercise while sharing your screen and explaining your thought process.

## Exercise Overview

You'll be working on a Next.js dashboard application that displays inventory items fetched from a JSON server. The exercise has three main challenges:

1. **Authentication**: Fix an authentication issue with the API
2. **Data Handling**: Process inconsistent data from the API
3. **Accessible UI**: Build a dashboard to display the data with accessibility in mind

## Project Structure

```
technical-interview-exercise/
├── app/                   # Next.js app directory
│   ├── page.tsx           # Main dashboard page (partially implemented)
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions and types
│   ├── api.ts             # API client with authentication issue
│   └── types.ts           # TypeScript type definitions
├── tests/                 # Test files
├── db.json                # Item database with intentional data issues
└── users.json             # User database for authentication
```

## Setup Instructions

1. **Install Dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start the JSON Server:**
   In a terminal window, run:

   ```bash
   npx json-server --watch server/db.json --port 3001 --middlewares ./server/auth.js
   ```

   The server will be running at `http://localhost:3001` with authentication required.

3. **Start the Next.js Application:**
   In another terminal window, run:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`.

4. **Run Tests:**
   ```bash
   npm test
   # or
   pnpm test
   ```

## Requirements

1. **Authentication Challenge**

   - The initial API call in `lib/api.ts` fails with a 401 Unauthorized error
   - Debug and fix the authentication issue to successfully fetch data
   - The authentication uses Basic Auth with a username and password

2. **Data Handling Challenge**

   - Once authenticated, you'll receive data with various inconsistencies:
     - Mixed data types (string vs number)
     - Missing required fields
     - Inconsistent enum values (e.g., "active" vs "ACTIVE")
     - Invalid values (negative prices)
   - Create a solution to normalize and validate this data before displaying it

3. **UI Implementation**

   - Build a dashboard to display the normalized inventory items
   - Implement a simple filtering mechanism (e.g., by status)
   - Ensure the UI is accessible, with particular attention to:
     - Color contrast (WCAG AA compliance)
     - Semantic HTML
     - Keyboard navigation
     - Screen reader compatibility

4. **Testing**
   - Add at least one unit test for your data normalization logic
   - Add a component test for one of your UI components

## Evaluation Criteria

You'll be evaluated on:

1. **Problem-solving approach**: How you tackle debugging and data issues
2. **Communication skills**: How clearly you explain your thought process
3. **Technical knowledge**: Your understanding of React, TypeScript, and Next.js
4. **Code quality**: Organization, readability, and best practices
5. **Accessibility awareness**: Implementation of accessible UI patterns

## Tips for Success

- Talk through your thought process as you work
- Ask clarifying questions if something is unclear
- Focus on solving the immediate problems rather than creating a perfect application
- Consider both the happy path and error states
- Prioritize code correctness over aesthetics, but don't ignore basic usability

Good luck with the exercise!
