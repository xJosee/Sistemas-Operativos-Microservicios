import './App.css';
import Modules from './components/modules-data/modules-data';
import Home from './components/home';
import About from './components/About';
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import logo from './assets/covid-19.png'
import FunnelGraph from './components/covid-data/charts/funnel';
import CakeGraph from './components/covid-data/charts/cake';
import BarGraph from './components/covid-data/charts/bar'
import PieGraph from './components/covid-data/charts/pie'
import FilterData from './components/covid-data/tables/filter-data';
import LastData from './components/covid-data/tables/last-data';
import Region from './components/covid-data/maps/region';

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
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
          <img width="30" height="30" src={logo}></img>
          <Link className="navbar-brand ml-3" to="/">Covid App</Link>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <div className="navbar-nav ml-auto mr-3">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="covid" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Covid
                </a>
                <div class="dropdown-menu" aria-labelledby="covid">
                  <Link className="dropdown-item" to="/rango-edades">Rango de edades</Link>
                  <Link className="dropdown-item" to="/top5-departamentos">Top 5 departamentos</Link>
                  <Link className="dropdown-item" to="/filter-state">Filtrado por state</Link>
                  <Link className="dropdown-item" to="/filter-infected-type">Filtrado por infectedType</Link>
                  <Link className="dropdown-item" to="/filter-data">Filtraro por Middleware</Link>
                  <Link className="dropdown-item" to="/last-data">Ultimos 5 registrados</Link>
                  <Link className="dropdown-item" to="/region">Region</Link>
                </div>
              </li>
              <Link className="nav-item nav-link" to="/modules">Modules</Link>
              <Link className="nav-item nav-link" to="/about">About</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/modules" component={Modules} />
          <Route path="/about" component={About} />
          <Route path="/rango-edades" component={BarGraph} />
          <Route path="/top5-departamentos" component={FunnelGraph} />
          <Route path="/filter-state" component={PieGraph} />
          <Route path="/filter-infected-type" component={CakeGraph} />
          <Route exact path="/filter-data" component={FilterData} />
          <Route exact path="/last-data" component={LastData} />
          <Route exact path="/region" component={Region} />
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