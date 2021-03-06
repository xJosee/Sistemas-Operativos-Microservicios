
import '../../App.css';
import RamCake from './ram/ramcake'
import LineExample from './ram/line'
import 'bootstrap/dist/css/bootstrap.min.css';
import Proc from './proc';

function Modules() {
    return (
        <>
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
        </>
    );
}

export default Modules;