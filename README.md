# Technical Interview Exercise: Next.js Dashboard with Authentication & Data Validation

This live coding exercise is designed to assess your problem-solving approach, communication skills, and technical understanding of building accessible web applications with Next.js and TypeScript. You'll have **1 hour** to work through this exercise while sharing your screen and explaining your thought process.

## Exercise Overview

You'll be working on a Next.js dashboard application that displays inventory items fetched from a JSON server. The exercise has three main challenges:

1. **Authentication**: Fix an authentication issue with the API
2. **Data Handling**: Improve the data normalization function to handle inconsistent data
3. **Accessible UI**: Enhance the dashboard to display the data with accessibility in mind

## Project Structure

```
technical-interview-exercise/
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── page.tsx           # Main dashboard page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   └── ItemList.tsx       # Basic item list component (needs enhancement)
│   ├── lib/                   # Utility functions and types
│   │   ├── api.ts             # API client with authentication issue
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── utils.ts           # Data normalization utilities (needs improvement)
│   └── server/                # Server files
│       ├── db.json            # Item database with intentional data issues
│       ├── users.json         # User database for authentication
│       └── auth.js            # Authentication middleware
├── tests/                     # Test files
└── README.md                  # Instructions
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

## Setup Instructions

**Prerequisites:**

- [Node.js v22 or higher](https://nodejs.org/en/download/)
- The npm or pnpm package managers - npm comes bundled with Node.

1. **Install Dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start the JSON Server:**
   In a terminal window, run:

   ```bash
   npm run server
   ```

   The server will be running at `http://localhost:3001` with authentication required.

3. **Start the Next.js Application:**
   In another terminal window, run:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

4. **Run Tests:**
   ```bash
   npm test
   ```

## Requirements

1. **Authentication Challenge**

   - The initial API call in `lib/api.ts` fails with a 401 Unauthorized error
   - Debug and fix the authentication issue to successfully fetch data
   - The authentication uses Basic Auth with a username and password
   - Check `src/server/users.json` for the correct credentials

2. **Data Handling Challenge**

   - The `normalizeItem` function in `lib/utils.ts` needs improvement to handle various data issues:
     - String IDs that need conversion to numbers
     - Missing or null field values
     - Inconsistent status values (e.g., "active" vs "ACTIVE")
     - String prices that need conversion to numbers
     - Negative prices that should be sanitized
   - Tests are provided in `tests/unit/normalize-data.test.ts` to guide your implementation

3. **UI Implementation**

   - Improve the dashboard in `app/page.tsx` to:
     - Display normalized data in a user-friendly way
     - Add a simple filtering mechanism (e.g., by status)
     - Make the UI accessible by paying attention to:
       - Color contrast (WCAG AA compliance)
       - Semantic HTML
       - Keyboard navigation
       - Screen reader compatibility

4. **Testing**
   - Add or improve tests for your data normalization logic

## Focus Areas

We're primarily interested in:

1. Your **problem-solving approach**: How you identify and fix issues
2. Your **communication skills**: How you explain your thought process
3. Your **accessibility awareness**: How you make the UI accessible to all users

## Tips for Success

- Explain your thought process as you work
- Consider both the happy path and error cases
- Make the UI accessible

Good luck with the exercise!
