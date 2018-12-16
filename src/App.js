import React, { Component } from 'react';
import Main from './components/MainComponent';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
