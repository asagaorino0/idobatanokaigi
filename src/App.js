import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import TopPage from './pages/TopPage'
// import SecondPage from './pages/SecondPage';
// import Header from './components/Header'
import Main from './pages/Main'
import Login from './pages/Login'
// import UserProfile from './pages/UserProfile'
// import CreateUser from './pages/CreateUser'
// import logo from './logo.svg';




function App() {

  return (
    <Router>
      {/* <div className="App">
        <img src="../img/0522.jpg" alt="" />
hhhhhhh
        <img src={logo} className="App-logo" alt="logo" />
      </div>

 */}

      <Switch>
        {/* <Route exact path='/' component={TopPage} />
        <Route exact path='/SecondPage/:name' component={SecondPage} /> */}
        <Route exact path='/Main/:name' component={Main} />
        {/* <Route exact path='/UserProfile/:name' component={UserProfile} /> */}
        {/* <Route exact path='/Header/:nameH' component={Header} /> */}
        <Route exact path='/' component={Login} />
        {/* <Route exact path='/CreateUser/' component={CreateUser} /> */}
      </Switch>
    </Router>
  );


}
export default App;
