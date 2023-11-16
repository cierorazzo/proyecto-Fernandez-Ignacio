import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import store from "./store";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        {/*Header */}
        <Header />

        {/*Body */}
        <Body />
      </Provider>
    </div>
  );
}

export default App;
