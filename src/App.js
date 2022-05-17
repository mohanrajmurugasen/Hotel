import "./App.css";
import { createStore } from "redux";
import stores from "./Redux/Reducer";
import { Provider } from "react-redux";
import Main from "./Main";

const store = createStore(stores);

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
