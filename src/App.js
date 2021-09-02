import "./App.css";
import AccountProvider from "./Context/AccountProvider";
import Messenger from "./Messenger";

function App() {
  return (
    <AccountProvider>
      <Messenger />
    </AccountProvider>
  );
}

export default App;
