import { createStore, applyMiddleware } from 'redux';
import uuid from 'uuid/v4';
import { FETCH_TRANSACTIONS, TRANSFER_TRANSACTION, SET_PROGRESS_BAR, SET_FORM_PROGRESS_BAR} from './types';
import axios from 'axios'
import config from "./app.config";
import thunk from 'redux-thunk';
import { toast } from "react-toastify";

const ENDPOINT = config['dev'].ENDPOINT;

const initialState = {
  transactions : [],
  formLoading : false,
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
  applyMiddleware(...middleware)
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Reducer
function reducer(state, action) {
  debugger;
  switch (action.type) {
     case TRANSFER_TRANSACTION :
     console.log('TRANSFER_TRANSACTION inside reducer called');
     return {
       ...state,
       item : action.payload
     };

     case SET_PROGRESS_BAR :
     console.log('SET_PROGRESS_BAR inside reducer called');
     return {
       ...state,
       loading : action.payload
     };

     case SET_FORM_PROGRESS_BAR :
       console.log('SET_FORM_PROGRESS_BAR inside reducer called');
       return {
         ...state,
         formLoading : action.payload
      };

     case 'FETCH_TRANSACTIONS':
       return {
         ...state,
         transactions : action.payload
       };

     default:
       return state;
  }
}

export const fetchTransactionsAction = () => dispatch => {
    console.log('fetching transactions');
    dispatch({type : SET_PROGRESS_BAR, payload : true});
    axios.get(ENDPOINT.CUSTOMER_TRANSACTIONS)
        .then(res => {
          debugger;
          dispatch({
            type : FETCH_TRANSACTIONS,
            payload : res.data
          });

          dispatch({type : SET_PROGRESS_BAR, payload : false});

        }).catch(function (error) {
          //toast.error("Internal server error, please try again");
          dispatch({type : SET_PROGRESS_BAR, payload : false});
          console.log(error);
        });
}

export const transferTransactionAction = (transaction) => dispatch => {
  console.log('transferring transaction');
dispatch({type : SET_FORM_PROGRESS_BAR, payload : true});
debugger;
axios.post(ENDPOINT.ADD_TRANSACTION, transaction)
     .then(function (response) {
            debugger;
           console.log(response);
           toast.success("Transaction success - Amount succesfully transferred!");
           dispatch({
             type : TRANSFER_TRANSACTION,
             payload : response.data
           });
           dispatch({type : SET_FORM_PROGRESS_BAR, payload : false});
           dispatch(fetchTransactionsAction());
       })
       .catch(function (error) {
         debugger;
           toast.error("Internal server error, please try again");
           dispatch({type : SET_FORM_PROGRESS_BAR, payload : false});
           console.log(error);
       });
}

//By DS add new action for fetching here and make response set in Todos so that shud be auto updated on ui
