
import '../../App.css';
import FilterData from './filter-data'
import BarGraph from './bar'
import PieGraph from './pie'
import FunnelGraph from './funnel';

function Covid() {
    return (
        <div className="covid-data">
            <FunnelGraph />
        </div>
    );
}

export default Covid;