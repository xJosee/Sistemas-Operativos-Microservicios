import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Covid from './components/covid-data/covid-data';
import Modules from './components/modules-data/modules-data';
import Home from './components/home';
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Link } from 'react-router-dom'


function App() {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand ml-3" to="/Home">Covid-App Cloud</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <div className="navbar-nav ml-auto mr-3">
              <Link className="nav-item nav-link" to="/covid">Covid</Link>
              <Link className="nav-item nav-link" to="/modules">Modules</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/covid" component={Covid} />
          <Route path="/modules" component={Modules} />
        </Switch>
      </Router>
    </>
  );
}

export default App;