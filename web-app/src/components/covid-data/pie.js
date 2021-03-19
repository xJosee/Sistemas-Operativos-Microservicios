import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Form } from 'react-bootstrap'


function PieGraph() {
    const [data, setData] = useState({
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    })


    /*useEffect(() => {
        const interval = setInterval(() => {

            fetchValues()

        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const fetchValues = () => {
        fetch('http://34.67.69.50:7000/modulos/getRam')
            .then((response) => response.json())
            .then((json) => {
                // console.log(parseInt(json.Total, 10) - parseInt(json.Libre, 10), json.Libre)
                const newData = {
                    labels: [
                        'Usada',
                        'Libre'
                    ],
                    datasets: [{
                        data: [json.Total - json.Libre, json.Libre],
                        backgroundColor: [
                            '#30475e',
                            '#f05454'
                        ],
                        hoverBackgroundColor: [
                            '#30475e',
                            '#f05454'
                        ]
                    }]
                }
                setData(newData)
            })
            .catch((error) => console.error(error))
    }
    */
    return (

        <div>
            <Pie data={data} width={400} height={400} />
        </div>
    );
}

export default PieGraph;
