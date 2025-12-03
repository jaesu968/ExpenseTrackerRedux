import { createSlice } from "@reduxjs/toolkit";

export interface Transaction {
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
      state[action.payload.category] = category.filter(transaction => transaction.id !== action.payload.id)
      
    }
  }
})


export const selectTransactions = (state: RootState) => state.transactions;
export const selectFlattenedTransactions = (state: RootState) =>
  Object.values(state.transactions).reduce((a, b) => [...a, ...b], []);

export const { addTransaction, deleteTransaction } = transactionsSlice.actions; 
export default transactionsSlice.reducer; 