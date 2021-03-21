import React, { Component } from 'react';
import FunnelGraph from 'funnel-graph-js/src/js/main'
import 'funnel-graph-js/src/scss/main.scss';
import 'funnel-graph-js/src/scss/theme.scss';
import './style.css'

export default class LineExample extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var dataExample2 = {
            labels: ['Impressions 2', 'Add To Cart 2', 'Buy 2'],
            colors: ['#222831', '#30475e', '#f05454'],
            values: [12000, 5700, 360]
        };

        var graph = new FunnelGraph({
            container: '.funnel',
            gradientDirection: 'vertical',
            data: dataExample2,
            displayPercent: false,
            direction: 'horizontal',
            width: 700,
            height: 300,
            subLabelValue: 'raw'
        });

        graph.draw();
    }

    render() {
        return (
            <div class="flex">
                <div class="funnel">
                </div>
            </div>
        );
    }



};