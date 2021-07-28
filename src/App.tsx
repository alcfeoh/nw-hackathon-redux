import React from 'react';
import './App.css';
import {Form} from './Form';
import {Provider} from 'react-redux';
import {store} from './state';

function App() {
  return (
      <Provider store={store}>
        <div>
          <Form />
        </div>
      </Provider>
  );
}

export default App;
