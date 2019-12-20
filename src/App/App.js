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
import Profile from '../Profile/Profile';

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
               
                const { user } = state;
                const isLogged = !!state.user;
                console.log(user);
                

            return user === undefined ? (
              <div>Loading...</div>
            ) : (
              <div className="App">
                  <Navigation  isLogged={isLogged}  />
                  <div className="container">
                    <Switch>
                      <Route path="/" exact>
                      {!!isLogged ? () =><Redirect to="/tasks"/> :() => <Redirect to="/"/>}
                      </Route>
                      <Route
                        path="/tasks"
                        render={!!isLogged ? render("Tasks", CreateTask, {state}) : () => <Redirect to="/" />}
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
                      {!!isLogged && (
                      <Route
                        path="/profile"
                        render={() => (<Profile user={user}></Profile>)}
                      />
                      )}
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
