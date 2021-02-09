import { useEffect } from "react";
import "./default.scss";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";
import { useDispatch } from "react-redux";

// hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Homepage from "./pages/Homepage/Homepage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Recovery from "./pages/Recovery/Recovery";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import AdminToolbar from "./components/AdminToolbar/AdminToolbar";
import Search from "./pages/Search/Search";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/search/:filterType"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
