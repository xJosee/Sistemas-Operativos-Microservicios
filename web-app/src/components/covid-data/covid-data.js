
import '../../App.css';
import FilterData from './filter-data'
import BarGraph from './charts/bar'
import PieGraph from './charts/pie'
import FunnelGraph from './charts/funnel';
import './graph.css'
import CakeGraph from './charts/cake';

function Covid() {
    return (
        <div>
            <ul class="nav nav-tabs ml-auto" style={{
                float: 'none',
                display: '-ms-inline-flexbox',
                zoom: 1
            }} id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#bar" role="tab" aria-controls="bar" aria-selected="true">Rango de edad de infectados</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#funnel" role="tab" aria-controls="funnel" aria-selected="false">Top 5 departamentos infectados</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#state" role="tab" aria-controls="state" aria-selected="false">Casos infectados por state</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#infected" role="tab" aria-controls="infected" aria-selected="false">Casos infectados por infectedType</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">

                <div class="tab-pane fade" id="funnel" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                        <div className="col-md-6 mt-5  mx-auto">
                            <div className="rotate">
                                <FunnelGraph />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show active" id="bar" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                        <div className="col-md-5 mt-5 mx-auto" >
                            <BarGraph />
                        </div>
                    </div>

                </div>
                <div class="tab-pane fade" id="state" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                        <div className="col-md-4 mt-5  mx-auto">
                            <PieGraph />
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="state" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                        <div className="col-md-4 mt-5  mx-auto">
                            <PieGraph />
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="infected" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                        <div className="col-md-4 mt-5  mx-auto">
                            <CakeGraph />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Covid;