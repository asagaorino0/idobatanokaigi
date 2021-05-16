import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import TopPage from './pages/TopPage'
// import SecondPage from './pages/SecondPage';
// import Header from './components/Header'
import Main from './pages/Main'
import Login from './pages/Login'
// import CreateUser from './pages/CreateUser'



function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        {/* <Route exact path='/' component={TopPage} />
        <Route exact path='/SecondPage/:name' component={SecondPage} /> */}
        <Route exact path='/Main/:namae' component={Main} />
        {/* <Route exact path='/Header/:nameH' component={Header} /> */}
        <Route exact path='/' component={Login} />
        {/* <Route exact path='/CreateUser/' component={CreateUser} /> */}
      </Switch>
    </Router>
  );
}
export default App
