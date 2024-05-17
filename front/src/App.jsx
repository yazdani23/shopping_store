// in App Component wird "RoutesMap" aufgerufen

import './App.css';
import {BrowserRouter} from "react-router-dom"
import {RoutesMap} from './routes/RoutesMap';
import {Provider} from 'react-redux'
import store from './redux/store';

function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <RoutesMap />
        </BrowserRouter>
      </Provider>
    );
}


export default App;

