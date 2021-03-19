
import '../../App.css';
import FilterData from './filter-data'
import BarGraph from './bar'
import PieGraph from './pie'

function Covid() {
    return (
        <div className="covid-data">
            <PieGraph />
        </div>
    );
}

export default Covid;