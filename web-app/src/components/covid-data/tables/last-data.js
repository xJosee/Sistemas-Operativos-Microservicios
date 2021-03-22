import { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import './filter-data'

class LastData extends Component {
    constructor(props) {
        super(props)
        this.state = { patients: [] }
        this.columns = [
            { dataField: "name", text: "Nombre", sort: true },
            { dataField: "age", text: "Edad", sort: true },
            { dataField: "location", text: "Ubicación", sort: true },
            { dataField: "state", text: "Estado", sort: true },
            { dataField: "infectedtype", text: "Tipo", sort: true }
        ]
    }
    componentDidMount() {
        fetch('http://34.67.69.50:7000/last')
            .then((response) => response.json())
            .then((json) => this.setState({ patients: json }))
        this.timer = setInterval(() => this.fetchValues(), 1500);
    }



    fetchValues() {
        fetch('http://34.67.69.50:7000/last')
            .then((response) => response.json())
            .then((json) => this.setState({ patients: json }))
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h1 style={{ paddingTop: 25, paddingBottom: 25 }}>Últimos 5 casos registrados</h1>
                        <BootstrapTable
                            keyField="name"
                            data={this.state.patients}
                            columns={this.columns}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LastData;