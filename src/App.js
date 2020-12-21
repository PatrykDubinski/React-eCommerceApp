import "./default.scss";

import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
