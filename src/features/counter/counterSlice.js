import { createSlice } from "@reduxjs/toolkit";

// require string name to identify the slice an initial state value and one or more reducer function to define how the state can update

// the slice contains the action ans store and reducer function

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    user: "",
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    userLoaded: (state, action) => {
      state.user = action.payload;
    },
  },
});
// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// to access specific data from the store
export const selectCount = state => state.counter


// Action creators are generated for each case reducer function

export const { increment, decrement, incrementByAmount, userLoaded } =
  counterSlice.actions;
export default counterSlice.reducer;
