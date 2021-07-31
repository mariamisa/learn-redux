# redux
Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

Redux is more useful when:

* You have large amounts of application state that are needed in many places in the app
* The app state is updated frequently over time
* The logic to update that state may be complex
* The app has a medium or large-sized codebase, and might be worked on by many people

### Redux libraries and tool
1. React-Redux (to connect the redux wih component)
    let react component interact with redux store by reading pieces of state and dispatching action and update the state
2. React toolkit (create store and logic)
    when write redux logic 

-------------------------
state will display inside the view when state change by action it will be re-render and update the view (as sycle)

* State – the current data used in the app
* View – the user interface displayed to users
* Actions – events that a user can take to change the state

1. state 
    Each piece of information in this state—an array in this case—would inform some part of the user interface.

2. Action 
    * type=>evert action must have a type property with string value this describe the action
    * payload=>include any information related to the a action (for example todo input text)
    * When an action is generated and notifies other parts of the application, we say that the action is dispatched.

    example actions:
        1. remove all todoes
        ```javscript=
        const action = {
              type: 'todos/removeAll'
            }
        ```
        here we don't have to add payload because no additional information is needed
        2.  “Remove the ‘Pack snacks’ todo”:

        ```javascript=
            const action = {
                  type: 'todos/removeTodo',
                  payload: 'Pack snacks'
                }
            ```
    * Define an action object named addNewSong that represents adding a new song to the playlist.
    * Define an action named removeSong that represents removing a song from the playlist.
    * Define an action named removeAll that represents removing all songs from the playlist.
        * solution:
            ```javascript=
            const addNewSong={
                  type:'songs/addSong',
                  payload:'halo'
                }

            const removeSong={
                  type:'songs/removeSong',
                  payload:'Take Five'
                }
                const removeAll={
                  type:'songs/removeAll'
                }
            ```

3. Reducers
    1. is plain js function that defines how the current state and action are used in combination to create the new state.
    2. it define the applicaton next state given a current state and specific action
    3. it return a deafult initial state if no action is provoded.
    4. its return the current state if the action is not recognized

    ```javascript=
    const initialState=[ 'Print trail map', 'Pack snacks', 'Summit the mountain']
    
    const totoReducer=(state=initialState,action)=>{
        switch(state.type){
        case 'todos/addTodo':{
            return [...state,action.pyload]
            }
         case 'todos/removeAll':{
            return []
            }
         default: {
            return state;
            }
        }
    }
    ```
    * Let’s start building a reducer for our playlist application. For this first checkpoint, it should:
    * Add a case for the 'songs/addSong' action type.If the action.type is 'songs/AddSong', return a copy of the state object with the new song added.
    * Add a case for the 'songs/removeSong' action type.
        ```javascript=
        // Define reducer here
        const reducer=(state=initialState,action)=>{
          switch(action.type){
            case 'songs/addSong':{
              return [...state,action.payload]
            }
            case 'songs/removeSong':{
              return state.filter(el=>el!=action.payload)
            }
            default:{
              return state
            }
          }
        }

        ```
        
        example:
        .
* We have some reducers here that are breaking the rules! The reducer in app1.js violates the first rule of reducers: it calculates the new state based on something other than the current state and action arguments.Fix this by assuming that the song being added will be passed into the reducer as the payload of the action object.
* The reducer in app2.js violates the second rule of reducers: it modifies the existing state .Fix this by using the spread operator ... within a new array instead of using push() on the existing state.
* The reducer in app3.js violates the third rule of reducers: it has a side effect. The initial state will not be the same every time you call the reducer.Fix this by assuming that the random value will be provided as the payload of the action object.Note that this reducer is called with undefined. In this case, the default parameter will be used to set state.

```javascript=
// Reducer violates rule 1: 
// They should only calculate the new state value based on the state and action arguments.
 
const playlistReducer = (state = [], action) => {
 switch (action.type) {
   case 'songs/addGlobalSong': {
     return [...state, action.payload];
   }
   default:
     return state;
 }
}
 
// Example call to reducer
const state = [ 'Take Five', 'Claire de Lune', 'Respect' ];
const addAction = { type: 'songs/addGlobalSong', payload: 'We are the World' };
const newState = playlistReducer(state, addAction);
```

```javascript=
// Reducer violates rule 2: 
// They are not allowed to modify the existing state. 
// Instead, they must copy the existing state and make changes to the copied values.

const todoReducer = (state = [], action) => {
 switch (action.type) {
   case 'todos/addTodo': {
     return [...state,action.payload];
   }
   case 'todos/removeAll': {
     return [];
   }
   default: {
     return state;
   }
 }
}

// Example call to reducer
const state = [ 'Print trail map', 'Pack snacks', 'Summit the mountain' ];
const addTodoAction = { type: 'todos/addTodo', payload: 'Descend' };
const newState = todoReducer(state, addTodoAction);
```

```javascript=
 // Reducer violates rule 3:
 // They must not do any asynchronous logic or have other “side effects”.

const initialState = [0, 1, 2];

const reducer = (state = initialState, action) => {
 switch (action.type) {
   case 'numbers/addRandom': {
     return [...state, action.payload];
   }
   default: {
     return state;
   }
 }
}
 
// Example call to reducer
const randomAction = { type: 'numbers/addRandom', payload: Math.random() };
const newState = reducer(undefined, randomAction);
```

#### Reducers rule
1. should only calculate the new state value based on the state and action arguments.
```javascript=
const removeItemAtIndex = (list, index) => {
//  list.splice(index, 1);
 return [...list.slice(0,index),...list.slice((index+1))];
};

console.log(removeItemAtIndex(['a', 'b', 'c', 'd'], 1));
```
3. Reducers must not do any asynchronous logic or other “side effects”.

```javascript=
const fs = require('fs');
const file = './data.txt';

const capitalizeMessage = (message) => {
  return message.toUpperCase();
}
  const message = fs.readFileSync(file, 'utf8');
console.log(capitalizeMessage(message));
```

### how its works
store,action amd reducer how they participate in the one way data flow 

redux uses special object called the store , the store act as a container for state it provides a way dispatch actin and call the reducer when actions are dispatch , every redux application have one store

1. store initalize with deafult value
2. the view display the state
3. when user interact with the view like clicking a button an action is dispatched to the store
4. the dispatched action and the current state are combined in the store reducer to determine the next state
5. the viw is updated to display the new state

اول اشي اليوزر بتفاعل مع الفيو وبيضغط ع بتن الاضافة مثلا وقتها الهاندل ايفنت بتبعت الحدث الي صار مع الستيت الحالية للستور والستور في جواها الريديوسر فنكشن الي بتستلم الستيت مع الاكشن وبتعمل عملية معينة عشان تخدث الستور وبعدها بتقرر شو الستيت الجديدة وبناء على لتخديق الي صار بترجع الفيو تنعرض 

* Redux is a library for managing and updating application state based on the Flux architecture

* Redux makes code more predictable, testable, and maintainable by consolidating state in a single object. Components are just given data to render and can request changes using events called actions.

* In a Redux application, data flows in one direction: from state to view to action back to state and so on.

* State is the current information behind a web application.

* An action is an object describing an event in the application. It must have a type property and it typically has a payload property as well.

* A reducer is a function that determines the application’s next state given a current state and a specific action. It returns a default initial state if none is provided and returns the current state if the action is not recognized

* A reducer must make follow these three rules:

    1. They should only calculate the new state value based on the existing state and action.
    1. They are not allowed to modify the existing state. Instead, they must copy the existing state and make changes to the copied values.
    1. They must not do any asynchronous logic or other “side effects”.
* In other words, a reducer must be a pure function and it must update the state immutably.

* The store is a container for state, it provides a way to dispatch actions, and it calls the reducer when actions are dispatched. Typically there is only one store in a Redux application.


--------------
#### provider 
make redux store available to te rest of app
* We've seen that our components can use the useSelector and useDispatch hooks to talk to the Redux store. But, since we didn't import the store, how do those hooks know what Redux store to talk to?

```javascript=
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

#### use selector
read the value from the store state and subscribe updates 

### use dispatch
return dispatch method to let you dispatch action to store reducer

```javascript=
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      {/* omit additional rendering output here */}
    </div>
  )
}
```


# store
the current redux app state lives in an object called the store
to get the current value state ```store.getState()```
# dispatch

the only way to update the state by call ``` store.dispatch()``` and pass the action object 
the store will run the reducer function nd save the new state value inside 

    ```javascript=
    // dispatch this action to reducer and will update the value of state
    store.dispatch({type:'counter/increment}) 
    ```
### useDispatch
if we had access to store we could dispatch action using action creator like store.dispatch(increment()) 
* if we don't have access to store we need some way to have access to dispatch method , useDispatch hook does that for us 
``` const dispatch = useDispatch() ``` // the actual dispatch store method

# selector
function to get piece of information from the store state value / it help avoid repeating logic

### useSelector
Our components can't talk to the Redux store directly, because we're not allowed to import it into component files. But, useSelector takes care of talking to the Redux store behind the scenes for us. If we pass in a selector function, it calls someSelector(store.getState()) for us, and returns the result.
* So, we can get the current store counter value by doing:
```javascript=
const count = useSelector(selectCount)

```

* any time action has been dispatched ans redux store has been updated it make sure to re-run selector function , if the selector return different value that the last time it will make sure our component re-render with the new value

-------------------
* Redux allows store setup to be customized with different kinds of plugins ("middleware" and "enhancers"). configureStore automatically adds several middleware to the store setup by default to provide a good developer experience, and also sets up the store so that the Redux DevTools Extension can inspect its contents.

# Redux Slices
A "slice" is a collection of Redux reducer logic and actions for a single feature in your app
    , typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state
## combineReducers 
It accepts an object full of slice reducers as its argument, and returns a function that calls each slice reducer whenever an action is dispatched. The result from each slice reducer are all combined together into a single object as the final result.
```javascript=
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
})
```
```javascript=
const store = configureStore({
  reducer: rootReducer
})
```

### Creating Slice Reducers and Actions
* createSlice =>generating action type strings, action creator functions, and action objects. (automatically generates action creators with the same names as the reducer functions we wrote.)
* name => option is used as the first part of each action type, and the key name of each reducer function is used as the second part. ```name:'counter'``` the ```'increment'```reducer function generated an action type of {type:'counter/increment'}
* initialState => it represent the state for the first time
*it help to write immutable updates an easier way 
    * ses a library called Immer inside. Immer uses a special JS tool called a Proxy to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, Immer tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value, as if you'd written all the immutable update logic by hand.

## thunk
is specific kind of redux function that can contain async logic
    * An inside thunk function, which gets dispatch and getState as arguments
    * The outside creator function, which creates and returns the thunk function

## middleware
The Redux store can be extended with "middleware", which are a kind of add-on or plugin that can add extra abilities. The most common reason to use middleware is to let you write code that can have async logic, but still talk to the store at the same time. They can also modify the store so that we can call dispatch() and pass in values that are not plain action objects, like functions or Promises.
The Redux Thunk middleware modifies the store to let you pass functions into dispatch.


### component state and forms
* we don't have to store every thing inside the redux just we can useState for it (the global state inside the redux store but the local state inside the state component) 