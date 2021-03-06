
import './App.css';
import RamCake from './components/ram/ramcake'
import LineExample from './components/ram/line'
import 'bootstrap/dist/css/bootstrap.min.css';
import Proc from './components/proc';
function App() {
  return (
    <div>
      <div className="row">
        <div className="col-7" >
          <LineExample />
        </div>
        <div className="col-5">
          <RamCake />
        </div>
      </div>
      <div>
        <Proc />
      </div>
    </div>
  );
}

export default App;
