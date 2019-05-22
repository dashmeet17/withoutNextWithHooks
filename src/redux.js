import { createStore, applyMiddleware } from 'redux';
import uuid from 'uuid/v4';
import thunk from 'redux-thunk'
import axios from 'axios'

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const TRANSFER_TRANSACTION = 'TRANSFER_TRANSACTION'


const initialState = {
  todos: [
    {
      id: uuid(),
      name: 'Read a bit',
      complete: true
    },
    {
      id: uuid(),
      name: 'Do laundry',
      complete: false
    }
  ]
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    default:
      return state;
  }
}
// Actions
export const addTodoAction = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
});


// export const transferTrxnAction = (todo) => ({
//   type: 'TRANSFER_TRXN',
//   payload: todo
// });

export const transferTrxnAction = (trxnData) => dispatch => {
  debugger;
   console.log('transferring transaction : '+trxnData);
   //TODO - Call API to save the trxn in db and return the payload accordingly
   // dispatch({
   //   type : TRANSFER_TRANSACTION,
   //   payload : {status : success}  //dummy response
   // })
}

export const fetchTrxnAction = () => dispatch => {
   console.log('fetching transactions');
    axios.get(`http://localhost:8080/customer-transactions`)
        .then(res => {
          dispatch({
            type : FETCH_TRANSACTIONS,
            payload : res.data
          })

        }).catch(function (error) {
          console.log(error);
        });
}

export const toggleTodoComplete = (todoId) => ({
  type: 'TOGGLE_TODO',
  payload: todoId
});

export const deleteTodoAction = (todoId) => ({
  type: 'DELETE_TODO',
  payload: todoId
});
