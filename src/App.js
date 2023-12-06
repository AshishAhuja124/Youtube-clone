import Body from "./components/Body";
import Head from "./components/Head";
import { Provider } from "react-redux";
import appStore from "./store/appStore";


function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <Head />
        <Body />
      </div>
    </Provider>

  );
}

export default App;
