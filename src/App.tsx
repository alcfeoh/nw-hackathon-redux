import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {Form} from './Form';
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
