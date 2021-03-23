import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ClipLoader from "react-spinners/ClipLoader";

function CakeGraph() {
    const [data, setData] = useState({
        labels: [
            '', '', ''
        ],
        datasets: [{
            data: [100, 100, 100],
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
    })

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1400);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {

            fetchValues()

        }, 1200);
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
                        <h1 style={{ paddingTop: 25, paddingBottom: 5 }}>Casos filtrados por tipo</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <Doughnut data={data} width={400} height={400} />
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

export default CakeGraph;
