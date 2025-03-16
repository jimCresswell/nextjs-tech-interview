# Technical Interview Exercise: Next.js Dashboard with Authentication & Data Validation

This live coding exercise is designed to assess your problem-solving approach, communication skills, and technical understanding of building accessible web applications with Next.js and TypeScript. You'll have **1 hour** to work through this exercise while sharing your screen and explaining your thought process.

## Exercise Overview

You'll be working on a proof of concept Next.js dashboard application that displays inventory items fetched from a JSON server. A board consisting of **important people** will see the demo. A junior colleague has carried out the work so far, and assures you that everything is working fine.

The exercise has three main challenges:

1. **Authentication**: Fix an authentication issue with the API
2. **Data Handling**: Improve the data normalization function to handle inconsistent data
3. **Accessible UI**: Enhance the dashboard to display the data with accessibility in mind

## Project Structure

```
technical-interview-exercise/
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── page.tsx           # Landing page with intro and navigation
│   │   ├── items/             # Items routes
│   │   │   ├── page.tsx       # Items listing page with filtering
│   │   │   └── [id]/          # Dynamic item route
│   │   │       └── page.tsx   # Item detail page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/                # UI components
│   │   │   ├── button.tsx     # Button component with polymorphic "as" prop
│   │   │   ├── card.tsx       # Card component
│   │   │   └── skeleton.tsx   # Skeleton loading component
│   │   └── ItemList.tsx       # Item list component with data validation
│   ├── lib/                   # Utility functions and types
│   │   ├── api.ts             # API client with item fetching functions
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── utils.ts           # Data normalization utilities
├── server/                    # Server files
│   ├── db.json                # Item database with intentional data issues
│   ├── users.json             # User database for authentication
│   └── auth.js                # Authentication middleware
├── tests/                     # Test files
└── README.md                  # Instructions
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
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
   npm run serve:api
   ```

   The server will be running at `http://localhost:3001` with authentication required.

3. **Start the Next.js Application:**
   In **another terminal window**, run:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Useful Commands

- `npm run serve:api` - Start the JSON server
- `npm run dev` - Start the Next.js application in development mode
- `npm run build` - Build the Next.js application
- `npm run start` - Start the Next.js application in production mode (requires a build first)
- `npm run check-type` - Check the types
- `npm run lint` - Run the linter
- `npm run test` - Run the tests
- `npm run test:watch` - Run the tests in watch mode
- `npm run test:coverage` - Run the tests with coverage
- `npm run test:a11y` - Run the accessibility checks

## Requirements

1. **Authentication Challenge**

   - The initial API call in `lib/api.ts` fails with a 401 Unauthorized error
   - Debug and fix the authentication issue to successfully fetch data
   - The authentication uses Basic Auth with a username and password
   - Check `server/users.json` for the correct credentials

2. **Data Handling Challenge**

   - The `normalizeItem` function in `lib/utils.ts` needs improvement to handle various data issues:
     - String IDs that need conversion to numbers
     - Missing or null field values
     - Inconsistent status values (e.g., "active" vs "ACTIVE")
     - String prices that need conversion to numbers
     - Negative prices that should be sanitized
   - Tests are provided in `tests/unit/normalize-data.test.ts` to guide your implementation

3. **UI Implementation**

   - The application now features a multi-page structure:
     - A landing page (`/`) that introduces the application
     - An items listing page (`/items`) with filtering by status
     - A detailed item view page (`/items/[id]`) showing comprehensive item information
   - Each page should be accessible, paying attention to:
     - Color contrast (WCAG AA compliance)
     - Semantic HTML
     - Keyboard navigation
     - Screen reader compatibility
   - Appropriate loading states and error handling should be implemented

4. **Testing**
   - Add or improve tests for your data normalization logic
   - Ensure UI components pass accessibility tests

## Focus Areas

We're primarily interested in:

1. Your **problem-solving approach**: How you identify and fix issues
2. Your **communication skills**: How you explain your thought process
3. Your **accessibility awareness**: How you make the UI [accessible to all users.](https://developer.mozilla.org/en-US/docs/Web/Accessibility). [Web performance](https://web.dev/performance/) and metrics like the [Core Web Vitals](https://developer.chrome.com/docs/devtools/performance/overview) are also important for accessibility, but it's largely out of scope for this exercise.

Remember that there are multiple places that important information on the state of the running application might be seen; the terminal running the server, the terminal running the Next.js application, the browser console and developer tools, and of course the application UI itself.

## Tips for Success

- Explain your thought process as you work
- Consider both the happy path and error cases
- Make the UI accessible

Good luck with the exercise!
