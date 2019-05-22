import React, { useState, useEffect } from 'react';
//import uuid from 'uuid/v4';
//import '../css/table.css';
import ReactTable from 'react-table'
//import { addTodoAction } from '../redux';
import { useDispatch } from 'react-redux';
import { transferTrxnAction } from '../redux'
import { fetchTrxnAction } from '../redux'

const columns = [
  {
    Header: 'Transaction ID',
    accessor: 'transactionID'
  },
  {
    Header: 'User Name',
    accessor: 'username'
  },
  {
    Header: 'Payment Mode',
    accessor: 'paymentMode'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  }
];

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();
  const fetchTransactions = (trxn) => dispatch(fetchTrxnAction());

  useEffect(() => {
      // Update the document title using the browser API
      fetchTransactions();
    });

  return (
      <ReactTable
        className="container jumbotron trxnTable table-bordered"
        data={transactions}
        columns={columns}
        defaultPageSize={10}
      />
  )
};

export default Table;
