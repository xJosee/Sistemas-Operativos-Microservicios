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

    componentDidMount() {
        const ctx = document.getElementById('graph');
        this.chart = new Chart(ctx, this.data);
    }
};