import { AnyAction } from "redux";
import { createSlice } from "@reduxjs/toolkit";

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

// define a slice with createSlice function 
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {
    // addTransaction action creator/reducer pair 
    // add a new transaction object (action.payload) to the correct 
    // category's transaction list in the transactions state object 
    addTransaction: (state, action) => {
      // find category in 'state' that matches the category property of action payload
      let category = state[action.payload.category]
      // add the new transation to that category's transaction array 
      category.push(action.payload)
    },
    // deleteTransaction action creator/reducer pair 
    // two arguments: state and action 
    // it should delete the old transaction (action.payload) from 
    // the correct category's transaction list in the transactions state object 
    deleteTransaction: (state, action) => {
      // find category in 'state' that matches the category property of action payload
      let category = state[action.payload.category]
      // filter out the old transaction from that category's transaction array 
      // and reassign the filtered array directly to state[action.payload.category]
      state[action.payload.category] = category.filter(transaction => transaction.id != action.payload.id)
      
    }
  }
})

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
