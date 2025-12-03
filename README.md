# React & Redux Expense Tracker

This project is a budgeting and expense tracking application built with React and Redux Toolkit. It serves as a practical example for understanding modern state management in a React application. The app allows users to set budgets for various categories (like food and transportation), add transactions, and see how much money remains in each budget.

## Core Concepts & Technologies

This project demonstrates several key concepts essential for modern web development.

### 1. React: Component-Based UI

The user interface is built with [React](https://react.dev/), a library for building user interfaces. The app is broken down into small, reusable pieces called **components**.

-   **`App.tsx`**: The root component that assembles the main layout of the application.
-   **`Budgets.tsx`**: Displays a list of all budget categories.
-   **`Budget.tsx`**: A single budget item, showing the category name, the budgeted amount, and the remaining funds. It also allows the user to edit the budget amount.
-   **`Transactions.tsx`**: A feature component that displays the transaction list and the form for adding new transactions.
-   **`TransactionList.tsx`**: Renders a list of all transactions.
-   **`Transaction.tsx`**: Represents a single transaction item, showing its description, amount, and a button to delete it.
-   **`TransactionForm.tsx`**: A form for users to add new transactions, including selecting a category, adding a description, and specifying an amount.

### 2. Vite: Modern Build Tool

This project uses Vite as its build tool and development server. Vite offers a significantly faster development experience compared to older tools like Create React App, thanks to its native ES module support.

### 3. Redux Toolkit: State Management

The application's state (all budgets and transactions) is managed by Redux Toolkit, the recommended way to write Redux logic.

#### The Store: Single Source of Truth

All application state is held in a single object tree inside a single **store**. The only way to change the state is to dispatch an **action**, an object describing what happened.

-   **`app/store.ts`**: This is where the Redux store is configured using `configureStore`. It combines the different reducers from our "slices" into one main reducer for the app.

#### Slices (`createSlice`)

We use the "slice" pattern to organize our Redux logic. A slice represents a portion of the Redux state and contains the reducer logic and action creators for that piece of state.

-   **`features/budgets/budgetsSlice.tsx`**: Manages the `budgets` array in the state. It handles actions like `editBudget`.
-   **`features/transactions/transactionsSlice.tsx`**: Manages the `transactions` object. It handles adding (`addTransaction`) and removing (`deleteTransaction`) transactions. The `createSlice` function automatically generates action creators and action types, which greatly reduces boilerplate code.

#### Reading State with `useSelector`

React components can "read" data from the store using the `useSelector` hook from React-Redux.

-   In **`Budget.tsx`**, `useSelector(selectTransactions)` is used to get all transactions to calculate the expenses for a specific budget category.
-   In **`Transactions.tsx`**, `useSelector(selectFlattenedTransactions)` gets a flattened list of all transactions to display.

#### Dispatching Actions with `useDispatch`

When a user interacts with the app (like adding or deleting a transaction), components dispatch actions to the store using the `useDispatch` hook.

-   In **`TransactionForm.tsx`**, submitting the form dispatches the `addTransaction` action with the form data as its payload.
-   In **`Transaction.tsx`**, clicking the 'X' button dispatches the `deleteTransaction` action to remove that specific transaction.

### 4. TypeScript

The project is written in TypeScript, which adds static types to JavaScript. This helps catch errors during development and improves code quality and maintainability by providing clear definitions for the shape of our data, such as the `Transaction` and `Budget` types.

### 5. Testing

The project is set up for testing with Vitest and React Testing Library.

-   **`utils/test-utils.tsx`**: Contains a custom `renderWithProviders` function. This is a testing utility that wraps components with the Redux `<Provider>` so they can be tested in isolation while still being connected to a Redux store.

## How the Data Flows

1.  **Initial State**: The Redux store is initialized with a predefined structure for `budgets` and `transactions`.
2.  **Render**: React components render the UI based on the current state from the Redux store, which they access using `useSelector`.
3.  **User Interaction**: A user fills out the "New Transaction" form and clicks "Add Transaction".
4.  **Dispatch Action**: The `onSubmit` handler in `TransactionForm.tsx` calls `dispatch(addTransaction({ ... }))`.
5.  **Reducer Logic**: The `transactionsSlice` reducer receives the action and updates the state by adding the new transaction to the correct category.
6.  **Re-render**: Redux notifies the React components that the state has changed. Any component subscribed to that piece of state (like `Transactions.tsx` and `Budget.tsx`) re-renders to display the updated information.

## Available Scripts

-   **`npm run dev`**: Starts the development server.
-   **`npm run build`**: Creates a production-ready build of the app.
-   **`npm run test`**: Runs the test suite.
