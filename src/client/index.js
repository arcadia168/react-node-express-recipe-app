import ReactDOM from 'react-dom';
import './scss/application.scss';
// import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './components/routes.js';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);