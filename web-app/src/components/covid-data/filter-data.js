import { useEffect, useState } from 'react';


function FilterData() {
    const [data, setData] = useState({
        labels: [
            'Usada',
            'Libre'
        ],
        datasets: [{
            data: [50, 50],
            backgroundColor: [
                '#30475e',
                '#f05454'
            ],
            hoverBackgroundColor: [
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

    return (
        <></>
    );
}

export default FilterData;