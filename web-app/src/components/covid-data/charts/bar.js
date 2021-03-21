import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


function BarGraph() {
    const [data, setData] = useState({
        labels: [''],
        datasets: [
            {
                label: 'Rango de edades',
                backgroundColor: 'rgba(240, 84, 84, 0.7)',
                borderColor: 'rgba(48, 71, 94)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [0],

            }
        ],
    })


    useEffect(() => {
        const interval = setInterval(() => {
            fetchValues()
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const fetchValues = () => {
        fetch('http://34.67.69.50:7000/agerange')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let labels = []
                for (let i in json) {
                    if (json[i][0]) {
                        labels.push(i)
                    }
                }
                let count = []
                for (let i in json) {
                    if (json[i][0]) {
                        count.push(json[i][0].count)
                    }
                }
                const newData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cantidad de casos',
                            backgroundColor: 'rgba(240, 84, 84, 0.7)',
                            borderColor: 'rgba(48, 71, 94)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: count,

                        }
                    ],
                }
                setData(newData)
            })
            .catch((error) => console.error(error))
    }
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-12" style={{ padding: 15, maxHeight: 500, maxWidth: 500 }}>
                    <Bar
                        data={data}
                        width={500}
                        height={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    scaleLabel: {
                                        labelString: 'Persons',
                                        display: true
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        labelString: 'Ages (Years)',
                                        display: true
                                    }
                                }]
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default BarGraph;
