import { createSlice } from "@reduxjs/toolkit";


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
const initialState = CATEGORIES.map((category) => ({
  category: category,
  amount: 0,
}));

// define a slice by calling createSlice 
// with a configuration object cotaining: 
// the required name, initial state and reducers properties.
const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: initialState,
  reducers: {
    // editBudget property
    // set equal to a case reducer that receives two arguments: state and action
    // action.payload will have a category and amount property
    // the function should update the state by finding the budget object
    // whose .category matches action.payload.category and 
    // changing with the .amount value to action.payload.amount. 
    editBudget: (state, action) => {
      // use Immer to mutate the state directly
      // loop through state array and finds the object matching category
      // and update amount property only if it does match
      for (let i = 0; i < state.length; i++) {
        if(state[i].category === action.payload.category){
          state[i] = {...state[i], amount: action.payload.amount}
        } else {
          return state; 
        }
      }
      }
    }
  }
)

export const editBudget = (budget) => {
  return {
    type: "budgets/editBudget",
    payload: budget,
  };
};

const budgetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "budgets/editBudget":
      const newBudgets = state.map((budget) => {
        if (budget.category === action.payload.category) {
          return action.payload;
        }
        return budget;
      });
      return newBudgets;
    default:
      return state;
  }
};

export const selectBudgets = (state) => state.budgets;
export default budgetsReducer;
