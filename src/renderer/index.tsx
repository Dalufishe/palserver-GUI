import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/radix-ui/styles.css';
import Translation from './provider/Translation/Translation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Translation>
      <App />
    </Translation>
  </Provider>,
);
