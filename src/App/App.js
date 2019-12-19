import React from 'react';
import './App.css';
import Main from './Main/Main'
import Navigation from "../Navigation/Navigation"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logout from "../Logout/Logout";
import CreateTask from "../publications/CreateTask/CreateTask"
import Store, { StoreContext } from "../Store/Store";
import { loginSuccess } from "../Store/actions";

function render(title, Cmp) {
  
  return function(props) {
    return (
      <Main title={title}>
        <Cmp {...props} />
      </Main>
    );
  };
}

const Auth = ({ children }) => {
  const { dispatch } = React.useContext(StoreContext);
  React.useEffect(() => {
    fetch("http://localhost:9999/auth", { credentials: "include" })
      .then(res =>
        res.status === 200
          ? res.json()
          : res.text().then(text => Promise.reject(text))
      )
      .then(user => dispatch(loginSuccess(user)))
      .catch(() => {
        dispatch(loginSuccess(null));
      });
  }, []);

  return <>{children}</>;
};

function App() {
 
  
  return (
    <BrowserRouter>
      <Store>
        <Auth>
          <StoreContext.Consumer>
            {({ state }) => {
                console.log(state);
                const { user } = state;
                const isLogged = !!state.user;

            return user === undefined ? (
              <div>Loading...</div>
            ) : (
              <div className="App">
                  <Navigation  isLogged={isLogged} user={user} />
                  <div className="container">
                    <Switch>
                      <Route path="/" exact>
                          <Redirect to="/tasks" />
                      </Route>
                      <Route
                        path="/tasks"
                        render={render("Tasks", CreateTask, { isLogged })}
                      />
                      <Route
                        path="/login"
                        render={
                          !isLogged
                            ? render("Login", Login, { isLogged })
                            : () => <Redirect to="/" />
                        }
                      />
                      {!isLogged && (
                      <Route
                        path="/register"
                        render={render("Register", Register, { isLogged })}
                      />
                      )}
                      <Route
                        path="/logout"
                        render={
                          isLogged
                            ? render("", Logout, { isLogged })
                            : () => <Redirect to="/" />
                        }
                      />
                    </Switch>
                  </div> 
              </div>
              );
            }}
          </StoreContext.Consumer>
        </Auth>
      </Store>
    </BrowserRouter>
  );
}

export default App;
