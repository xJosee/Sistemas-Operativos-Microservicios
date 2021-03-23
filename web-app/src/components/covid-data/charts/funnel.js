import React, { Component } from 'react';
import FunnelGraph from 'funnel-graph-js/src/js/main'
import 'funnel-graph-js/src/scss/main.scss';
import 'funnel-graph-js/src/scss/theme.scss';
import './graph.css'
import './style.css'
import ClipLoader from "react-spinners/ClipLoader";

export default class LineExample extends Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.state = { value: 1000, loading: true }
        this.graph = new FunnelGraph({
            container: '.funnel',
            gradientDirection: 'vertical',
            data: {
                labels: [''],
                colors: ['#222831', '#30475e', '#f05454'],
                values: [0]
            },
            displayPercent: false,
            direction: 'horizontal',
            width: 700,
            height: 300,
            subLabelValue: 'raw'
        });

    }

    componentDidMount() {
        this.graph.draw();
        setInterval(() => this.setState({ loading: false }), 1500);
        this.timer = setInterval(() => this.fetchValues(), 1200);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchValues = () => {
        this.setState({ ...this.state, updatable: false });
        fetch('http://34.67.69.50:7000/top  ')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let labels = []
                json.forEach(value => {
                    labels.push(value._id)
                });

                let count = []
                json.forEach(value => {
                    count.push(value.count)
                });

                this.graph.updateData({
                    labels: labels,
                    colors: ['#222831', '#30475e', '#f05454'],
                    values: count
                })
            })
            .catch((error) => console.error(error))


    };

    renderLoader = () => {
        return (
            <div className="wrapper">
                <h1 className="title">Covid App</h1>
                <ClipLoader color={"#000"} loading={this.state.loading} size={40} />
            </div>
        );
    }

    renderPage() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{ paddingTop: 25, paddingBottom: 5 }}>Top 5 departamentos con mayor cantidad de casos</h1>
                    </div>
                </div>
                <div>
                    <div className="flex rotate">
                        <div className="funnel">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.state.loading ? this.renderLoader() : null}
                {this.renderPage()}
            </>
        );
    }

};