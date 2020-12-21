import "./default.scss";
import { Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from "./pages/Homepage/Homepage";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
