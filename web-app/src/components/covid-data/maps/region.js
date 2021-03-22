import { Component } from "react";
import credential from "./credential";
import Map from './maps'
import { Circle, LatLng } from 'react-google-maps';
import { Button, ButtonGroup } from "react-bootstrap";
import polygons from "./polygons";
import BootstrapTable from "react-bootstrap-table-next";
class Region extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: '',
            poligono: [],
            color: '',
            data: [
            ],
            topName: '',
            topTotal: 0
        }
        this.columns = [
            { dataField: "nombre", text: "Nombre" },
            { dataField: "total", text: "Total", sort: true }
        ]
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevstate.region != this.state.region) {
            switch (this.state.region) {
                case 'Peten':
                    this.setState({ poligono: polygons.peten, color: '#30475e' })
                    break;
                case 'Franja':
                    this.setState({ poligono: polygons.franja, color: '#f05454' })
                    break;
                case 'Oriente':
                    this.setState({ poligono: polygons.oriente, color: '#222831' })
                    break;

                case 'Litoral':
                    this.setState({ poligono: polygons.litoral, color: '#957842' })
                    break;

                case 'Sin Region':
                    this.setState({ poligono: polygons.sinregion, color: '#429566' })
                    break;

                default:
                    break;
            }
        }
    }

    componentDidMount() {
        fetch('http://34.67.69.50:7000/region')
            .then((response) => response.json())
            .then((json) => {
                let newdata = []
                for (let i in json) {
                    if (json[i][0]) {
                        newdata.push({ nombre: i, total: json[i][0].count })
                    } else {
                        newdata.push({ nombre: i, total: 0 })

                    }
                }


                this.setState({ data: newdata })

                newdata.sort(function (a, b) {
                    return b.total - a.total;
                });

                this.setState({ topName: newdata[0].nombre, topTotal: newdata[0].total })
            })
    }

    setRegion(index) {
        switch (index) {
            case 0:
                this.setState({ region: 'Peten' })
                break;
            case 1:
                this.setState({ region: 'Franja' })
                break;
            case 2:
                this.setState({ region: 'Oriente' })
                break;

            case 3:
                this.setState({ region: 'Litoral' })
                break;


            case 4:
                this.setState({ region: 'Sin Region' })
                break;

            default:
                break;
        }
    }
    render() {
        return (
            <div>
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
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-6">
                            <Map
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credential.mapsKey}`}
                                containerElement={<div style={{ height: '550px' }} />}
                                mapElement={<div style={{ height: '100%', width: '100%' }} />}
                                loadingElement={<p>Cargando</p>}
                                selectedRegion={this.state.poligono}
                                color={this.state.color}
                            />

                        </div>

                        <div className="col-md-6">

                            <div className="row" style={{ paddingTop: 25, paddingBottom: 30 }}>
                                <div className="col">
                                    <h1>{this.state.topName} | {this.state.topTotal} casos</h1>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <ButtonGroup style={{ paddingTop: 10, paddingBottom: 10 }}>
                                        <Button variant={(this.state.region === 'Peten') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(0) }}>Petén</Button>
                                        <Button variant={(this.state.region === 'Franja') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(1) }}>Franja Transversal del Norte</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ButtonGroup style={{ paddingTop: 10, paddingBottom: 40 }}>
                                        <Button variant={(this.state.region === 'Oriente') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(2) }}>Región Oriente</Button>
                                        <Button variant={(this.state.region === 'Litoral') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(3) }}>Litoral del Pacífico</Button>
                                        <Button variant={(this.state.region === 'Sin Region') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(4) }}>Sin Región</Button>
                                    </ButtonGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <BootstrapTable
                                        keyField="name"
                                        data={this.state.data}
                                        columns={this.columns}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Region;
