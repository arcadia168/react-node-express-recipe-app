import ReactDOM from 'react-dom';
import './scss/application.scss';
//import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './components/Routes/Routes.js';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);