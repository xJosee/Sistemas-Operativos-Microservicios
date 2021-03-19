import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Form } from 'react-bootstrap'


function BarGraph() {
    const [data, setData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
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

        <div className="row">
            <input type="range" class="form-range" min="0" max="100" step="10" id="customRange3"></input>
            <div className="col-md-12" style={{ padding: 15, maxHeight: 500, maxWidth: 500 }}>
                <Bar
                    data={data}
                    width={500}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
    );
}

export default BarGraph;
