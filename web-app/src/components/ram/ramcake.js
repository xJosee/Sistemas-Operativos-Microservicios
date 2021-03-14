import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';


function RamCake() {
    const [data, setData] = useState({
        labels: [
            'Usada',
            'Libre'
        ],
        datasets: [{
            data: [50, 50],
            backgroundColor: [
                '#332791',
                '#7666F3'
            ],
            hoverBackgroundColor: [
                '#332791',
                '#7666F3'
            ]
        }]
    })


    useEffect(() => {

        fetch('http://34.70.137.25:4000/getRam')
            .then((response) => response.json())
            .then((json) => {


                const newData = {
                    labels: [
                        'Usada',
                        'Libre'
                    ],
                    datasets: [{
                        data: [json.Total - json.Libre, json.Libre],
                        backgroundColor: [
                            '#332791',
                            '#7666F3'
                        ],
                        hoverBackgroundColor: [
                            '#332791',
                            '#7666F3'
                        ]
                    }]
                }
                setData(newData)
            })
            .catch((error) => console.error(error))


    }, []);

    return (
        <div>
            <div>
                <h2>RAM</h2>
                <Doughnut data={data} />
            </div>
        </div>
    );
}

export default RamCake;
