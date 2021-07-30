import React, { useState } from "react";

// action to dispatch
import { decrement, increment } from "./counterSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Counter.module.css";

export function Counter() {
  //use selector to get data from store
  const count = useSelector((state) => state.counter.value);
  // dispatch to send action to the reducer store
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

// The corresponding Redux action will be dispatched to the store
// The counter slice reducer will see the actions and update its state
// The <Counter> component will see the new state value from the store and re-render itself with the new dat