import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Form from './components/form';
import Table from './components/table';

const App = () => (
  <Provider store={store}>
    <div>
      <Form />
      <Table />
    </div>
  </Provider>
);

export default App;
