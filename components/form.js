import React, { useState } from 'react';
//import uuid from 'uuid/v4';
import '../css/form.css';
//import { addTodoAction } from '../redux';
import { useDispatch } from 'react-redux';
import { transferTrxnAction } from '../redux'

const Form = () => {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const [paymentMode, setPaymentMode] = useState('');
  //const addTodo = (todo) => dispatch(addTodoAction(todo));
  const transferTransaction = (trxn) => dispatch(transferTrxnAction(trxn));

  const onChangePaymentMode = (event) => {
    debugger;
    setAmount(event.target.value);
    setPaymentMode(event.target.value);
  };

  const onChangeAmount = (event) => {
    debugger;
    setAmount(event.target.value);
    setPaymentMode(event.target.value);
  };


  const onSubmit = (event) => {
    debugger;
    event.preventDefault();
    console.log(paymentMode);
    if (amount.trim() === '') return;

    const trxn = {
      paymentMode : paymentMode,
      amount: amount
  };

  /** Call transfer transaction action */
  transferTransaction(trxn);
  alert('Trxn transferred');
  };

  return (
    <div className="container jumbotron  paymentForm">
      <form onSubmit={onSubmit}>

      <div className="row">

      <div className="col-lg-3">
      <div className="btn-group-vertical">
      <button type="button" className="btn btn-secondary buttonGrp trxnButton">USER-A</button>
      <button type="button" className="btn btn-secondary buttonGrp trxnButton">USER-B</button>
      <button type="button" className="btn btn-secondary buttonGrp trxnButton">USER-C</button>
      </div>
      </div>

      <div className="col-lg-3">
      <div>
        <label>
          <input type='radio' name="paymentMode" value={paymentMode} onChange={onChangePaymentMode} required/>
          American Express
        </label>
      </div>

          <div>
            <label>
            <input type='radio' name="paymentMode" value={paymentMode} onChange={onChangePaymentMode} required/>
            VISA
          </label>
          </div>

          <div>
          <label>
          <input type='radio' name="paymentMode" value={paymentMode} onChange={onChangePaymentMode} required/>
          DBS PayLah
          </label>
          </div>
      </div>

          <div className='col-lg-2 padding'>
            <label>
            <input type='number' name="amount" value={amount} max='5000' onChange={onChangeAmount} required/>
            <br/>
            <p className='helpText'>***Maximum Allowed amount is 5000 INR</p>
            </label>
          </div>

          <div className="col-lg-3 padding">
            <input className="button btn btn-primary transferBtn" type='submit' value='Transfer' />
          </div>
      </div>

      <div>
      </div>
      </form>
      </div>


    // <form onSubmit={onSubmit}>
    //   <div className="form-div">
    //     <input
    //       type="text"
    //       name="todo"
    //       placeholder="Add a todo"
    //       value={amount}
    //       onChange={onChange}
    //     />
    //     <button type="submit">Add</button>
    //   </div>
    // </form>
  );
};

export default Form;
