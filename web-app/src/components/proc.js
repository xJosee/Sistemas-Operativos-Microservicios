import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
function Proc() {
    const [data, setData] = useState([])
    useEffect(() => {

        fetch('http://34.70.137.25:4000/getProcesos')
            .then((response) => response.json())
            .then((json) => {
                setData(json)
            })
            .catch((error) => console.error(error))


    }, []);

    return (
        <Table striped bordered hover size="sm">

            <tbody>
                <tr>
                    <th>PadrePID</th>
                    <th>PIDe</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                </tr>
                {
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.PadrePID}</td>
                            <td>{item.PID}</td>
                            <td>{item.Nombre}</td>
                            <td>{item.Estado}</td>
                        </tr>
                    ))
                }


            </tbody>
        </Table>
    );
}

export default Proc;
