import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
function Proc() {
    const [data, setData] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {

            fetchValues()

        }, 1500);
        return () => clearInterval(interval);

    }, []);

    const fetchValues = () => {
        fetch('http://localhost:4000/getProcesos')
            .then((response) => response.json())
            .then((json) => {
                setData(json)
                //console.log(json.length)
            })
            .catch((error) => console.error(error))
    }

    return (
        <div style={{ padding: 15, overflow: 'auto', height: 225 }}>
            <Table striped bordered hover size="sm">

                <tbody>
                    <tr>
                        <th>No</th>
                        <th>PadrePID</th>
                        <th>PIDe</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                    </tr>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.PadrePID}</td>
                                <td>{item.PID}</td>
                                <td>{item.Nombre}</td>
                                <td>{item.Estado}</td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </div>
    );
}

export default Proc;
