import React, { Component } from 'react';
import Chart from 'chart.js';


export default class LineExample extends Component {
    constructor(props) {
        super(props);
        this.chart = Chart;
        this.timer = null;
        this.state = { value: 2000000 }
        this.size = props.size;
        this.data = {
            type: 'line',
            data: {
                labels: ['7.5', '6.0', '4.5', '3.0', '1.5', '0'],
                datasets: [
                    {
                        label: 'RAM in time',
                        data: [],
                        backgroundColor: 'rgba(118, 102, 243, 0.7)',
                        borderColor: 'rgba(51, 39, 145)',
                        borderWidth: 1,
                    },
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                labelString: 'RAM (' + ( (this.props.size === 1) ? 'KB' : ((this.props.size === 1024) ? 'MB' : 'GB' ) ) + ')',
                                display: true
                            }
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                labelString: 'Time (Seconds)',
                                display: true
                            }
                        }
                    ]
                }
            }

        };
        
    }



    componentDidMount() {
        const ctx = document.getElementById('graph');
        this.chart = new Chart(ctx, this.data);
        this.timer = setInterval(() => this.fetchValues(), 1500);
    }

    render() {
        return (
            <div style={{ padding: 15 }}>
                <canvas id="graph" data={this.data} />
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    

    fetchValues = () => {
        this.setState({ ...this.state, updatable: false });
        fetch('http://34.67.69.50:7000/modulos/getRam  ')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ value: (this.props.size === 1) ? json.Total - json.Libre : (this.props.size === 1024) ? ((json.Total - json.Libre) / this.props.size).toFixed(2) : ((json.Total - json.Libre) / this.props.size).toFixed(5) });
                this.setValues()
                this.chart.update();
            })
            .catch((error) => console.error(error))
    };

    setValues() {
        
        if (this.props.size !== this.size) {
            //Change size
            this.size = this.props.size;
            this.data.options.scales.yAxes[0].scaleLabel.labelString = 'RAM (' + ( (this.props.size === 1) ? 'KB' : ((this.props.size === 1024) ? 'MB' : 'GB' ) ) + ')';
            this.data.data.datasets[0].data = []
        }

        this.data.data.datasets[0].data.push(this.state.value);
        if (this.data.data.datasets[0].data.length >= 7) {
            this.data.data.datasets[0].data.shift()
        }
    }

};