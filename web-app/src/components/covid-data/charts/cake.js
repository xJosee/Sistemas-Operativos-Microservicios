import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';


function CakeGraph() {
    const [data, setData] = useState({
        labels: [
            ''
        ],
        datasets: [{
            data: [0],
            backgroundColor: [
                '#222831',
                '#dddddd',
                '#30475e',
                '#f05454'
            ],
            hoverBackgroundColor: [
                '#222831',
                '#dddddd',
                '#30475e',
                '#f05454'
            ]
        }]
    })


    useEffect(() => {
        const interval = setInterval(() => {

            fetchValues()

        }, 1500);
        return () => clearInterval(interval);
    });

    const fetchValues = () => {
        fetch('http://34.67.69.50:7000/infectedtype')
            .then((response) => response.json())
            .then((json) => {
                let labels = []
                json.forEach(value => {
                    labels.push(value._id)
                });
                let count = []
                let total = 0
                json.forEach(value => {
                    total += value.count
                });
                json.forEach(value => {
                    count.push((value.count / total * 100).toFixed(2))
                });

                const newData = {
                    labels: labels,
                    datasets: [{
                        data: count,
                        backgroundColor: [
                            '#222831',
                            '#dddddd',
                            '#f05454',
                            '#30475e',
                        ],
                        hoverBackgroundColor: [
                            '#222831',
                            '#dddddd',
                            '#f05454',
                            '#30475e',
                        ]
                    }]
                }
                setData(newData)
            })
            .catch((error) => console.error(error))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Doughnut data={data} width={500} height={500} />
                </div>
            </div>
        </div>
    );
}

export default CakeGraph;
