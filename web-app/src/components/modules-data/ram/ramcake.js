import { Doughnut } from 'react-chartjs-2';


function RamCake(props) {
    return (
        <div style={{ padding: 15 }}>
            <Doughnut data={{
                labels: [
                    'RAM Usada %',
                    'RAM Libre %'
                ],
                datasets: [{
                    data: [(((props.total - props.libre) / props.total) * 100).toFixed(0), ((props.libre / props.total) * 100).toFixed(0)],
                    backgroundColor: [
                        '#30475e',
                        '#f05454'
                    ],
                    hoverBackgroundColor: [
                        '#30475e',
                        '#f05454'
                    ]
                }]
            }} />
        </div>
    );
}

export default RamCake;
//data: [props.total - props.libre, props.libre],