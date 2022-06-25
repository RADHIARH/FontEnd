import "./App.css";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import UserProfile from "./components/UserProfile";
import Singin from "./components/SingIn";
import EditPicture from "./components/EditPicture";
import Privateroute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import UpdateImageProfile from "./components/UpdateImageProfile";

function App() {
  const state = useSelector((state) => state.reducer);
  return (
    <div className="container">
      <Switch>
        {/*  */}
        {/* <Route path="/" component={Login}>
          
        </Route> */}
        <Route
          path="/listusers"
          component={ListUsers}
          auth={state.isAuthenticated}
        />

        <Route path="/login" component={Login} auth={state.isAuthenticated} />
        {localStorage.length === 0 ? (
          <Route path="/" component={Login} />
        ) : (
          <Route exact path="/" component={ListUsers} />
        )}
        <Route
          exact
          path="/profile/:idu"
          component={UserProfile}
          auth={state.isAuthenticated}
        />
        <Route path="/editpic" component={UpdateImageProfile} />
        <Route exact path="/signIn" component={Singin} />
      </Switch>
    </div>
  );
}

export default App;
