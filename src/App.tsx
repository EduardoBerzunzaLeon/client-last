import PrimeReact from 'primereact/api';

import Router from './router/Router';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';

function App() {
  // active ripple effect
  PrimeReact.ripple = true;
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
