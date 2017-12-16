import ReactDOM from 'react-dom';
import './scss/application.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './components/Routes/Routes.js';
import history from './services/HistoryService'

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

//history.replace('/home');
