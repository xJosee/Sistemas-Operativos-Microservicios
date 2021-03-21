import './App.css';
import Covid from './components/covid-data/covid-data';
import Modules from './components/modules-data/modules-data';
import Home from './components/home';
import About from './components/About';
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const renderPage = () => {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img width="30" height="30" src="https://www.flaticon.es/svg/vstatic/svg/2785/2785819.svg?token=exp=1616267993~hmac=c28c48c1d9ce396ff19c96d433fd337b"></img>
          <Link className="navbar-brand ml-3" to="/">Covid App</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <div className="navbar-nav ml-auto mr-3">
              <Link className="nav-item nav-link" to="/covid">Covid</Link>
              <Link className="nav-item nav-link" to="/modules">Modules</Link>
              <Link className="nav-item nav-link" to="/about">About</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/covid" component={Covid} />
          <Route path="/modules" component={Modules} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    );
  }

  const renderLoader = () => {
    return (
      <div className="wrapper">
        <h1 className="title">Covid App</h1>
        <ClipLoader color={"#000"} loading={loading} size={40} />
      </div>
    );
  }

  return (
    <>
      {loading ? renderLoader() : renderPage()}
    </>
  );


}

export default App;