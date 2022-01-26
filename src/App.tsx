import PrimeReact from 'primereact/api';

import Router from './router/Router';

import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  // active ripple effect
  PrimeReact.ripple = true;
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
