import ReactDOM from 'react-dom';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { HistoryRouter } from "./HistoryRouter"
import { myHistory } from './history';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';

console.log(store.getState());

ReactDOM.render(
  <HistoryRouter history={myHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </HistoryRouter>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
