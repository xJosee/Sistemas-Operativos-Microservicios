import React, { Component } from 'react';
import Chart from 'chart.js';


export default class LineExample extends Component {
    constructor(props) {
        super(props);
        this.chart = Chart;
        this.timer = null;
        this.state = { value: 2000000 }
        this.data = {
            type: 'line',
            data: {
                labels: ['7.5', '6.0', '4.5', '3.0', '1.5', '0'],
                datasets: [
                    {
                        label: 'Ram in time',
                        data: [],
                        backgroundColor: 'rgba(118, 102, 243, 0.7)',
                        borderColor: 'rgba(51, 39, 145)',
                        borderWidth: 1,

                    },
                ],
            },

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
                this.setState({ value: json.Total - json.Libre });
                this.setValues()
                this.chart.update();
            })
            .catch((error) => console.error(error))
    };

    setValues() {
        this.data.data.datasets[0].data.push(this.state.value);
        if (this.data.data.datasets[0].data.length >= 7) {
            this.data.data.datasets[0].data.shift()
        }
    }

};