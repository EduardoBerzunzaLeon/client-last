import { Provider } from 'react-redux';
import PrimeReact from 'primereact/api';

import { Router } from './router/Router';
import { store } from './redux/store';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';

import './app.scss';

function App() {
  PrimeReact.ripple = true;
  return (
    <Provider store={store}>
      <div>
        <Router />
      </div>
    </Provider>
  );
}

export default App;
