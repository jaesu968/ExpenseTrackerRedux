import { AnyAction } from "redux";

interface Transaction {
  category: string;
  description: string;
  amount: number;
  id: string;
}

interface TransactionsState {
  [key: string]: Transaction[];
}

interface RootState {
  transactions: TransactionsState;
}

export const CATEGORIES = [
  "housing",
  "food",
  "transportation",
  "utilities",
  "clothing",
  "healthcare",
  "personal",
  "education",
  "entertainment",
];
const initialState: TransactionsState = Object.fromEntries(
  CATEGORIES.map((category) => [category, []])
);

export const addTransaction = (transaction: Transaction) => {
  return {
    type: "transactions/addTransaction",
    payload: transaction,
  };
};

export const deleteTransaction = (transaction: Transaction) => {
  return {
    type: "transactions/deleteTransaction",
    payload: transaction,
  };
};

export const selectTransactions = (state: RootState) => state.transactions;
export const selectFlattenedTransactions = (state: RootState) =>
  Object.values(state.transactions).reduce((a, b) => [...a, ...b], []);

const transactionsReducer = (
  state: TransactionsState = initialState,
  action: AnyAction
) => {
  let newTransactionsForCategory;
  switch (action.type) {
    case "transactions/addTransaction":
      newTransactionsForCategory = [
        ...state[action.payload.category].slice(),
        action.payload,
      ];
      return {
        ...state,
        [action.payload.category]: newTransactionsForCategory,
      };
    case "transactions/deleteTransaction":
      const deletedIndex = state[action.payload.category].findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      newTransactionsForCategory = state[action.payload.category].filter(
        (item, index) => index !== deletedIndex
      );
      return {
        ...state,
        [action.payload.category]: newTransactionsForCategory,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
