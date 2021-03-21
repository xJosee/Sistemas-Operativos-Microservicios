import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import ClipLoader from "react-spinners/ClipLoader";


function PieGraph() {
    const [data, setData] = useState({
        labels: [
            'symptomatic',
            'asymptomatic'
        ],
        datasets: [{
            data: [50, 50],
            backgroundColor: [
                '#30475e',
                '#f05454',
                '#222831',
                '#dddddd'

            ],
            hoverBackgroundColor: [
                '#30475e',
                '#f05454',
                '#222831',
                '#dddddd'
            ]
        }]
    })

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            fetchValues()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchValues = () => {
        fetch('http://34.67.69.50:7000/state')
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
                            '#30475e',
                            '#f05454',
                            '#222831',
                            '#dddddd'
                        ],
                        hoverBackgroundColor: [
                            '#30475e',
                            '#f05454',
                            '#222831',
                            '#dddddd'
                        ]
                    }]
                }
                setData(newData)
            })
            .catch((error) => console.error(error))
    }

    const renderLoader = () => {
        return (
            <div className="wrapper">
                <h1 className="title">Covid App</h1>
                <ClipLoader color={"#000"} loading={loading} size={40} />
            </div>
        );
    }

    const renderPage = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Pie data={data} width={400} height={400} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {loading ? renderLoader() : null}
            {renderPage()}
        </>
    );
}

export default PieGraph;
