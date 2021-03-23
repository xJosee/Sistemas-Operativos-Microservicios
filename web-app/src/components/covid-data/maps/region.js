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
                    this.setState({ poligono: polygons.peten, color: '#425895' })
                    break;
                case 'Metro':
                    this.setState({ poligono: polygons.metropolitana, color: '#429295' })
                    break;
                case 'Central':
                    this.setState({ poligono: polygons.central, color: '#E16706' })
                    break;

                case 'Norte':
                    this.setState({ poligono: polygons.norte, color: '#E0E00A' })
                    break;

                case 'Nororiente':
                    this.setState({ poligono: polygons.nororiente, color: '#E00A2E' })
                    break;
                case 'Suroriente':
                    this.setState({ poligono: polygons.suroriente, color: '#E877FE' })
                    break;


                case 'Suroccidente':
                    this.setState({ poligono: polygons.suroccidente, color: '#06D9E1' })
                    break;

                case 'Noroccidente':
                    this.setState({ poligono: polygons.noroccidente, color: '#0BE106' })
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
                this.setState({ region: 'Metro' })
                break;
            case 2:
                this.setState({ region: 'Central' })
                break;

            case 3:
                this.setState({ region: 'Norte' })
                break;

            case 4:
                this.setState({ region: 'Nororiente' })
                break;
            case 5:
                this.setState({ region: 'Suroriente' })
                break;
            case 6:
                this.setState({ region: 'Suroccidente' })
                break;
            case 7:
                this.setState({ region: 'Noroccidente' })
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

                            <div className="row" style={{}}>
                                <div className="col">
                                    <h1>{this.state.topName} | {this.state.topTotal} casos</h1>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <ButtonGroup style={{}}>
                                        <Button variant={(this.state.region === 'Peten') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(0) }}>Petén</Button>
                                        <Button variant={(this.state.region === 'Metro') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(1) }}>Metropolitana</Button>
                                        <Button variant={(this.state.region === 'Central') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(2) }}>Central</Button>
                                        <Button variant={(this.state.region === 'Noroccidente') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(7) }}>Noroccidente</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ButtonGroup style={{ paddingTop: 10, paddingBottom: 10 }}>
                                        <Button variant={(this.state.region === 'Nororiente') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(4) }}>Nororiente</Button>
                                        <Button variant={(this.state.region === 'Suroriente') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(5) }}>Suroriente</Button>
                                        <Button variant={(this.state.region === 'Suroccidente') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(6) }}>Suroccidente</Button>
                                        <Button variant={(this.state.region === 'Norte') ? "optionRAMActive" : "optionRAM"} onClick={() => { this.setRegion(3) }}>Norte</Button>
                                    </ButtonGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <BootstrapTable
                                        keyField="name"
                                        data={this.state.data}
                                        columns={this.columns}
                                        wrapperClasses={"table-responsive"}
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
