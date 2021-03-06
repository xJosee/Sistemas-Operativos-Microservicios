
import './App.css';
import RamCake from './components/ram/ramcake'
import LineExample from './components/ram/line'
import 'bootstrap/dist/css/bootstrap.min.css';
import Proc from './components/proc';

function App() {
  return (
    <div className="wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Covid-App Cloud</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="navbar-nav ml-auto">
            <a className="nav-item nav-link" href="#">Covid</a>
            <a className="nav-item nav-link" href="#">Modules</a>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-6" >
          <LineExample />
        </div>
        <div className="col-md-6">
          <RamCake />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Proc />
        </div>
      </div>
    </div>
  );
}

export default App;
