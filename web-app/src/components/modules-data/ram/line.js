import React, { Component } from 'react';
import Chart from 'chart.js';


export default class LineExample extends Component {
    constructor(props) {
        super(props);
        this.chart = Chart;
        //this.timer = null;
        //this.state = { value: 2000000 }

        this.data = {
            type: 'line',
            data: {
                labels: ['7.5', '6.0', '4.5', '3.0', '1.5', '0'],
                datasets: [
                    {
                        label: 'RAM Usada',
                        data: [],
                        backgroundColor: 'rgba(240, 84, 84, 0.8)',
                        borderColor: 'rgba(48, 71, 94)',
                        borderWidth: 1,
                    },
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                labelString: 'RAM (' + ((this.props.size === 1) ? 'KB' : ((this.props.size === 1024) ? 'MB' : 'GB')) + ')',
                                display: true
                            }
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                labelString: 'Tiempo (Segundos)',
                                display: true
                            }
                        }
                    ]
                }
            }

        };

    }

    componentDidUpdate(prevProps, prevState) {
        //Change size
        if (prevProps.size !== this.props.size) {
            this.size = this.props.size;
            this.data.options.scales.yAxes[0].scaleLabel.labelString = 'RAM (' + ((this.props.size === 1) ? 'KB' : ((this.props.size === 1024) ? 'MB' : 'GB')) + ')';
            this.data.data.datasets[0].data = []
        }

        if (prevProps.libre !== this.props.libre) {
            this.data.data.datasets[0].data.push((this.props.size === 1) ? this.props.total - this.props.libre : (this.props.size === 1024) ? ((this.props.total - this.props.libre) / this.props.size).toFixed(2) : ((this.props.total - this.props.libre) / this.props.size).toFixed(5));
            if (this.data.data.datasets[0].data.length >= 7) {
                this.data.data.datasets[0].data.shift()
            }
            this.chart.update();
        }

    }

    render() {
        return (
            <div style={{ padding: 15 }}>
                <canvas id="graph" data={this.data} />
            </div>
        );
    }

    componentDidMount() {
        const ctx = document.getElementById('graph');
        this.chart = new Chart(ctx, this.data);
    }
};