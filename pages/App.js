import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux';
import Form from '../components/form';
import Table from '../components/table';

import '../css/table.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Provider store={store}>
    <div>
      <Form />
    
    </div>
  </Provider>
);

export default App;
