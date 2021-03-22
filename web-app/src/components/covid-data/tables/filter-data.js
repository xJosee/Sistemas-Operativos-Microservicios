import { Component, useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './filter-data'

class FilterData extends Component {
    constructor(props) {
        super(props)
        this.state = { patients: [], way: 'GRPC' }
        this.columns = [
            { dataField: "name", text: "Nombre", sort: true },
            { dataField: "age", text: "Edad", sort: true },
            { dataField: "location", text: "Ubicación", sort: true },
            { dataField: "state", text: "Estado", sort: true }, ,
            { dataField: "infectedtype", text: "Tipo", sort: true }
        ]
    }
    componentDidMount() {
        fetch('http://34.67.69.50:7000/way/' + this.state.way)
            .then((response) => response.json())
            .then((json) => this.setState({ patients: json }))
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevstate.way != this.state.way) {
            fetch('http://34.67.69.50:7000/way/' + this.state.way)
                .then((response) => response.json())
                .then((json) => this.setState({ patients: json }))
        }
    }

    setWay(index) {
        switch (index) {
            case 0:
                this.setState({ way: 'GRPC' })
                break;
            case 1:
                this.setState({ way: 'RabbitMQ' })
                break;
            case 2:
                this.setState({ way: 'Google PubSub' })
                break;

            case 3:
                this.setState({ way: 'NATS' })
                break;

            default:
                break;
        }
    }

    render() {
        const options = {
            // pageStartIndex: 0,
            sizePerPage: 8,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true
        };
        return (


            <div className="container">
                <style type="text/css">
                    {`
                        .btn-optionRAM {
                            background-color: #f05454;
                            color: white;
                        }

                        .btn-optionRAM:hover {
                            color: #30475e;
                        }

                        .btn-optionRAMActive {
                            background-color: #30475e;
                            color: #f05454;
                        }

                        .btn-optionRAMActive:hover {
                            color: white;
                        }

                        .btn:focus{
                            outline:none;
                            box-shadow: none
                        }
                    `}
                </style>
                <div className="row">
                    <div className="col mx-auto" align="center">
                        <ButtonGroup style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Button variant={(this.state.way === 'GRPC') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setWay(0) }}>GRPC</Button>
                            <Button variant={(this.state.way === 'RabbitMQ') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setWay(1) }}>RabbitMQ</Button>
                            <Button variant={(this.state.way === 'Google PubSub') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setWay(2) }}>Google PubSub</Button>
                            <Button variant={(this.state.way === 'NATS') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setWay(3) }}>NATS</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <BootstrapTable
                            keyField="name"
                            data={this.state.patients}
                            columns={this.columns}
                            pagination={paginationFactory(options)}

                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterData;